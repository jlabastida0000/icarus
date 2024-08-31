const express = require('express');
const multer = require('multer');
const { Worker } = require('worker_threads');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from the client's build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// API Gateway
app.post('/api/upload', upload.array('files'), (req, res) => {
  const uploadedFiles = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    path: file.path
  }));

  // Start processing each file
  uploadedFiles.forEach(file => {
    worker.postMessage({ fileId: file.filename, filePath: file.path });
  });

  res.json({ message: 'Files uploaded successfully', files: uploadedFiles });
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
  });
  ws.send('Connected to WebSocket server');
});

// Worker for background processing
const worker = new Worker(path.join(__dirname, 'worker.js'));

worker.on('message', (result) => {
  console.log('Worker result:', result);
  // Here you could send a WebSocket message to the client with the processing result
});

// Serve the main app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});