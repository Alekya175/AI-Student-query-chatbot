const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Student = require('../models/Student');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aditya_chatbot';

async function importTsv() {
  const fullPath = 'C:\\Users\\aleky\\.gemini\\antigravity\\brain\\7266d604-b855-4781-bd22-a198cb585f02\\.system_generated\\logs\\transcript_full.jsonl';
  const transcriptPath = fs.existsSync(fullPath) ? fullPath : 'C:\\Users\\aleky\\.gemini\\antigravity\\brain\\7266d604-b855-4781-bd22-a198cb585f02\\.system_generated\\logs\\transcript.jsonl';
  
  if (!fs.existsSync(transcriptPath)) {
    console.error('Transcript file not found at:', transcriptPath);
    process.exit(1);
  }

  const rawLines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n');
  const userMsgs = rawLines.map(l => JSON.parse(l)).filter(x => x.type === 'USER_INPUT');
  const lastMsg = userMsgs[userMsgs.length - 1];

  if (!lastMsg || !lastMsg.content.includes('Roll.No')) {
    console.error('No TSV table found in the last user message.');
    process.exit(1);
  }

  // Extract TSV content starting from header line
  const lines = lastMsg.content.split('\n');
  const headerIdx = lines.findIndex(line => line.includes('Roll.No') && line.includes('Student Name'));

  if (headerIdx === -1) {
    console.error('Header row missing in user request.');
    process.exit(1);
  }

  const header = lines[headerIdx].split('\t').map(h => h.trim());
  console.log(`Found header with ${header.length} columns.`);

  const rollNoCol = header.findIndex(h => /roll\.?no/i.test(h));
  const nameCol = header.findIndex(h => /student\s*name/i.test(h));
  const branchCol = header.findIndex(h => /branch/i.test(h));
  const semCol = header.findIndex(h => /semester/i.test(h));
  const secCol = header.findIndex(h => /section/i.test(h));
  const dobCol = header.findIndex(h => /date\s*of\s*birth/i.test(h));
  const mobileCol = header.findIndex(h => /mobile\.?no/i.test(h));
  const emailCol = header.findIndex(h => /^e-?mail$/i.test(h));
  const entranceCol = header.findIndex(h => /entrance\s*type/i.test(h));
  const rankCol = header.findIndex(h => /^rank$/i.test(h));
  const htCol = header.findIndex(h => /hallticket\.?no/i.test(h));
  const fatherEmailCol = header.findIndex(h => /father\s*e-?mail/i.test(h));
  const permAddrCol = header.findIndex(h => /permanent\s*address/i.test(h));

  console.log({ rollNoCol, nameCol, branchCol, secCol, emailCol, mobileCol, rankCol, htCol });

  const parsedStudents = [];
  const existingEmails = new Set();
  const existingRegNos = new Set();

  // Load current students.json to avoid duplicate emails/regNos
  const jsonPath = path.join(__dirname, '../data/students.json');
  let currentJson = [];
  if (fs.existsSync(jsonPath)) {
    currentJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    currentJson.forEach(s => {
      if (s.email) existingEmails.add(s.email.toLowerCase().trim());
      if (s.regNo) existingRegNos.add(s.regNo.toUpperCase().trim());
    });
  }
  console.log(`Loaded ${currentJson.length} existing records from students.json.`);

  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('<') || line.startsWith('NOTE:')) continue;
    
    const parts = line.split('\t');
    if (parts.length < 3) continue;

    const rawRegNo = parts[rollNoCol] ? parts[rollNoCol].trim().toUpperCase() : '';
    const rawName = parts[nameCol] ? parts[nameCol].trim().toUpperCase() : '';

    if (!rawRegNo || !rawName) continue;

    let branchStr = parts[branchCol] ? parts[branchCol].trim() : 'CSE';
    if (branchStr === 'AIML' || branchStr === 'AIML-MS' || branchStr === 'AIML-GC') branchStr = 'Artificial Intelligence and Machine Learning (AI & ML)';
    else if (branchStr === 'CSE') branchStr = 'Computer Science and Engineering (CSE)';
    else if (branchStr === 'DS') branchStr = 'Data Science (DS)';
    else if (branchStr === 'ECE') branchStr = 'Electronics and Communication Engineering (ECE)';
    else if (branchStr === 'EEE') branchStr = 'Electrical and Electronics Engineering (EEE)';
    else if (branchStr === 'ME') branchStr = 'Mechanical Engineering (ME)';
    else if (branchStr === 'CE') branchStr = 'Civil Engineering (CE)';

    const sectionStr = parts[secCol] ? `Section ${parts[secCol].trim()}` : 'Section 1';
    const yearStr = parts[semCol] ? parts[semCol].trim() : '1st Year';
    const mobileStr = parts[mobileCol] ? parts[mobileCol].trim() : '';
    let rankNum = parts[rankCol] ? parseInt(parts[rankCol].trim(), 10) : 0;
    if (isNaN(rankNum)) rankNum = 0;
    const htStr = parts[htCol] ? parts[htCol].trim() : '';
    const entranceStr = parts[entranceCol] && parts[entranceCol].trim() ? parts[entranceCol].trim() : 'EAMCET';

    // Formulate clean unique email
    let rawEmail = parts[emailCol] ? parts[emailCol].trim().toLowerCase() : '';
    if (!rawEmail || rawEmail === 'father@gmail.com' || rawEmail.includes('@adityauniversity.in')) {
      if (parts[fatherEmailCol] && parts[fatherEmailCol].trim() && !parts[fatherEmailCol].includes('father@gmail.com')) {
        rawEmail = parts[fatherEmailCol].trim().toLowerCase();
      } else {
        const cleanReg = rawRegNo.replace(/[^A-Z0-9]/gi, '').toLowerCase();
        rawEmail = `${cleanReg}@aditya.ac.in`;
      }
    }

    // Resolve email conflicts if duplicate
    let finalEmail = rawEmail;
    let count = 1;
    while (existingEmails.has(finalEmail)) {
      const partsEmail = rawEmail.split('@');
      finalEmail = `${partsEmail[0]}_${count}@${partsEmail[1] || 'aditya.ac.in'}`;
      count++;
    }
    existingEmails.add(finalEmail);
    existingRegNos.add(rawRegNo);

    // Dynamic random attendance/CGPA for fresh record
    const cgpaVal = parseFloat((7.5 + Math.random() * 2.2).toFixed(2));
    const attVal = parseFloat((78 + Math.random() * 19).toFixed(1));

    const studentRecord = {
      email: finalEmail,
      name: rawName,
      regNo: rawRegNo,
      branch: branchStr,
      section: sectionStr,
      year: yearStr,
      entranceType: entranceStr,
      rank: rankNum,
      hallTicketNo: htStr,
      mobile: mobileStr,
      cgpa: cgpaVal,
      attendance: {
        overallPercentage: attVal,
        totalClasses: 300,
        classesAttended: Math.round(300 * (attVal / 100)),
        classesAbsent: 300 - Math.round(300 * (attVal / 100))
      },
      marks: [
        { subject: 'Data Structures', score: 85, maxScore: 100, grade: 'A+' },
        { subject: 'Python Programming', score: 88, maxScore: 100, grade: 'A+' },
        { subject: 'Database Management Systems', score: 79, maxScore: 100, grade: 'A' },
        { subject: 'Discrete Mathematics', score: 82, maxScore: 100, grade: 'A' }
      ],
      feeDetails: {
        totalTuitionFee: 115000,
        scholarshipAmount: rankNum > 0 && rankNum < 20000 ? 35000 : 0,
        feePaid: 80000,
        pendingDues: 0
      },
      timetable: [
        { time: '09:30 AM - 10:30 AM', subject: 'Data Structures', venue: 'Bhaskar Bhavan 101' },
        { time: '10:30 AM - 11:30 AM', subject: 'Python Lab', venue: 'Bhaskar Bhavan Computer Lab 2' },
        { time: '11:30 AM - 12:30 PM', subject: 'Mathematics', venue: 'Bhaskar Bhavan 102' },
        { time: '01:30 PM - 02:30 PM', subject: 'Database Systems', venue: 'Bhaskar Bhavan 201' }
      ]
    };

    parsedStudents.push(studentRecord);
  }

  console.log(`Parsed ${parsedStudents.length} new student records from TSV!`);

  if (parsedStudents.length === 0) {
    console.log('No new students to import.');
    process.exit(0);
  }

  // Merge into currentJson (replace matching regNo, or append)
  const jsonMap = new Map();
  currentJson.forEach(s => jsonMap.set(s.regNo, s));
  parsedStudents.forEach(s => jsonMap.set(s.regNo, s));

  const mergedList = Array.from(jsonMap.values());
  fs.writeFileSync(jsonPath, JSON.stringify(mergedList, null, 2));
  console.log(`✅ Updated ${jsonPath} with ${mergedList.length} total student records.`);

  // Sync to MongoDB
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB. Resetting & Upserting Student collection...');

  await Student.deleteMany({});
  await Student.insertMany(mergedList);
  console.log(`✅ MongoDB Student collection updated with ${mergedList.length} records!`);

  await mongoose.disconnect();
  console.log('All done!');
}

importTsv().catch(err => {
  console.error('Error during TSV import:', err);
  process.exit(1);
});
