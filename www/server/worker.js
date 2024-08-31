const { parentPort } = require('worker_threads');
const fs = require('fs');

parentPort.on('message', (message) => {
  console.log('Processing file:', message.fileId);
  
  // Read the file
  fs.readFile(message.filePath, (err, data) => {
    if (err) {
      parentPort.postMessage({ fileId: message.fileId, status: 'error', error: err.message });
      return;
    }

    // Simulate some processing work
    setTimeout(() => {
      // Here you would typically do some actual processing
      const processedSize = data.length;

      parentPort.postMessage({ 
        fileId: message.fileId, 
        status: 'processed', 
        result: `File processed. Size: ${processedSize} bytes` 
      });
    }, 2000);
  });
});