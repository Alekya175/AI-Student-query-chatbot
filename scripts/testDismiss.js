const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const queueService = require('../services/queueService');

async function testDismiss() {
  await mongoose.connect('mongodb://127.0.0.1:27017/aditya_chatbot');
  const targetId = 'T-1785341534246-3';
  
  const queryCond = [{ ticketId: targetId }];
  if (mongoose.Types.ObjectId.isValid(targetId)) {
    queryCond.push({ _id: targetId });
  }

  const res = await Ticket.updateMany({ $or: queryCond }, { $set: { isRead: true } });
  console.log('Update Result:', res);

  const unreadCount = await Ticket.countDocuments({ isRead: { $ne: true } });
  console.log('Remaining Unread Tickets in DB:', unreadCount);

  process.exit(0);
}

testDismiss();
