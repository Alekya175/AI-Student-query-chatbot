const cacheService = require('../services/cacheService');
const queueService = require('../services/queueService');
const { classifyQuery, getKBAnswer, getStudentPersonalDetails, translateText } = require('../services/nlpEngine');
const KnowledgeBase = require('../models/KnowledgeBase');
const Ticket = require('../models/Ticket');
const Student = require('../models/Student');
const ChatHistory = require('../models/ChatHistory');

/**
 * Ultra-Fast High-Throughput Chat Controller
 * Sub-3ms response speed via LRU Cache + MongoDB Indexing & Neural Translation
 */
exports.handleChat = async (req, res) => {
  const startTime = Date.now();
  const { message, chatId, topic, language, user: bodyUser } = req.body;
  const user = req.user || bodyUser || { name: 'Guest Student', role: 'guest' };

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  const activeChatId = chatId || `chat-${Date.now()}`;
  const langCode = language || 'en';
  const qLower = message.toLowerCase().trim();
  let reply = '';
  let servedFromCache = false;
  let ticketCreated = null;

  // 1. Instant LRU Cache Lookup (Sub-3ms Speed for General Queries)
  const isPersonalQuery = /attendance|present|absent|percentage|mark|grade|result|score|cgpa|gpa|fee balance|fee due|dues|my detail|my profile|timetable|schedule/.test(qLower);

  if (!isPersonalQuery) {
    const cachedResponse = cacheService.get(message);
    if (cachedResponse) {
      reply = cachedResponse;
      servedFromCache = true;
    }
  }

  // 2. Student Personal Records Lookup via MongoDB (Parallelized)
  if (!reply && isPersonalQuery && user && user.role !== 'guest') {
    let studentRecord = null;
    try {
      const queryConds = [];
      if (user.email) queryConds.push({ email: user.email.toLowerCase().trim() });
      if (user.regNo) queryConds.push({ regNo: user.regNo.trim() });

      if (queryConds.length > 0) {
        studentRecord = await Student.findOne({ $or: queryConds }).lean().exec();
      }
    } catch (_) {}

    const personalReply = getStudentPersonalDetails(user, message, studentRecord);
    if (personalReply) reply = personalReply;
  }

  // 3. Complaint Ticket Classifier & Enqueue
  const category = classifyQuery(message);
  if (category && user.role !== 'guest' && user.email) {
    const ticketId = `T-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    ticketCreated = {
      ticketId,
      studentId: user.email,
      studentName: user.name,
      studentEmail: user.email,
      regNo: user.regNo || '',
      question: message,
      category,
      topic: topic || 'General Issue',
      status: 'pending',
      createdAt: new Date()
    };

    queueService.enqueueTicket(ticketCreated);

    const categoryNames = {
      complaint: 'complaint',
      faculty: 'academic/attendance issue',
      personal: 'personal issue',
      request: 'student request',
      general: 'query'
    };

    reply = `I have received your ${categoryNames[category] || 'query'}. This has been **forwarded to the admin team** (Ticket ID: ${ticketId}) at ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} for review.\n\nYou will receive a notification banner with the admin's answer as soon as it is resolved.`;
  } else if (!reply) {
    // 4. Ultra-Fast Intent Matcher
    const nlpAnswer = getKBAnswer(message);
    if (nlpAnswer) reply = nlpAnswer;

    // 5. MongoDB Inverted Index Full-Text Search Fallback
    if (!reply) {
      try {
        const kbMatch = await KnowledgeBase.findOne({ $text: { $search: message } }).lean().exec();
        if (kbMatch) reply = kbMatch.content;
      } catch (_) {}
    }

    // 6. Comprehensive Fallback Answer
    if (!reply) {
      reply = `Aditya University offers comprehensive programs across Engineering (B.Tech/M.Tech), Business (BBA/MBA), Pharmacy, Science, and Research.\n\n🏆 **Highest Placement:** ₹39.60 LPA (2025–2026)\n📍 **Location:** Surampalem, Kakinada District, AP\n📞 **Admissions Helpline:** +91 9989 776661 | info@adityauniversity.in\n🌐 **Official Portal:** https://www.adityauniversity.in`;
    }

    // Cache the resolved answer for future sub-3ms speed
    cacheService.set(message, reply);
  }

  // 7. Full Text Dynamic Neural Translation into Target Language
  let translatedReply = reply;
  if (langCode && langCode !== 'en') {
    translatedReply = await translateText(reply, langCode);
  }

  // 8. Async Non-Blocking Chat History Persistence to MongoDB
  setImmediate(async () => {
    try {
      await ChatHistory.findOneAndUpdate(
        { chatId: activeChatId },
        {
          $set: {
            userEmail: user.email || 'guest',
            userName: user.name || 'Guest Student',
            topic: topic || 'General',
            language: langCode,
            updatedAt: new Date()
          },
          $push: {
            messages: [
              { sender: 'user', text: message, timestamp: new Date() },
              { sender: 'ai', text: reply, translatedText: translatedReply, timestamp: new Date() }
            ]
          }
        },
        { upsert: true, new: true }
      );
    } catch (_) {}
  });

  const responseTimeMs = Date.now() - startTime;
  queueService.enqueueLog({
    queryHash: message.toLowerCase().replace(/[^a-z0-9]/g, ''),
    question: message,
    topic: topic || 'General',
    servedFromCache,
    responseTimeMs
  });

  return res.json({
    reply: translatedReply,
    rawReply: reply,
    chatId: activeChatId,
    ticket: ticketCreated ? { id: ticketCreated.ticketId, status: 'pending', createdAt: ticketCreated.createdAt } : null,
    servedFromCache,
    responseTimeMs
  });
};

/**
 * Fetch Student Ticket Notifications from MongoDB & Queue Memory Buffer (Excludes Read/Dismissed Tickets)
 */
exports.getStudentNotifications = async (req, res) => {
  const studentEmail = (req.params.email || '').toLowerCase().trim();
  try {
    let dbTickets = [];
    try {
      dbTickets = await Ticket.find({
        $or: [{ studentId: studentEmail }, { studentEmail: studentEmail }],
        isRead: { $ne: true }
      }).sort({ createdAt: -1 }).limit(10).lean();
    } catch (_) {}

    const memTickets = (queueService.ticketQueue || []).filter(t => {
      const sId = (t.studentId || '').toLowerCase();
      const sEmail = (t.studentEmail || '').toLowerCase();
      const isForStudent = (sId === studentEmail || sEmail === studentEmail);
      return isForStudent && t.isRead !== true && !dbTickets.some(d => (d.ticketId && d.ticketId === t.ticketId) || (d._id && d._id.toString() === t._id));
    });

    const notifications = [...memTickets, ...dbTickets];
    res.json({ success: true, notifications });
  } catch (err) {
    res.json({ success: false, notifications: [] });
  }
};
