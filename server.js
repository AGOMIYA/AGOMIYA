const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = require('./app');

// CORS Configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_LOCAL,
    process.env.FRONTEND_NETWORK
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 8500;
// bind to all network interfaces
const HOST = '0.0.0.0';  

// Start server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
  console.log(`🌐 Try accessing it from another device at: http://${getLocalIp()}:${PORT}`);
});

// helper to log your LAN IP
function getLocalIp() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
