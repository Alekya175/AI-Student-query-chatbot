require('dotenv').config();
const express = require('express');
const cluster = require('cluster');
const os = require('os');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

// Multi-Core Node.js Clustering for 100,000+ Concurrent Students
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  console.log(`[Master Cluster] Primary PID ${process.pid} is spawning ${numCPUs} worker processes...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[Worker Died] Worker PID ${worker.process.pid} exited. Respawning replacement...`);
    cluster.fork();
  });
} else {
  const app = express();

  // Connect to Scalable MongoDB Pool
  connectDB();

  // Security & Performance Middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(compression());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // High Concurrency Rate Limiter (Allows burst traffic up to 500 QPS per IP)
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 500,               // 500 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Traffic surge detected. Rate limit exceeded. Please wait a few seconds.' }
  });
  app.use('/api/', limiter);

  // Serve Frontend Static Files
  app.use(express.static(path.join(__dirname, 'public')));

  // API Routes
  app.use('/api', apiRoutes);

  // Serve Admin Dashboard page
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  });

  // Catch-all route to serve main Chatbot application
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`🚀 [Aditya Chatbot Worker PID ${process.pid}] Server running on http://localhost:${PORT}`);
  });
}
