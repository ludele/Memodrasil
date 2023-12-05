// In fileHandler.js
const fs = require('fs').promises;
const path = require('path');

const staticFolder = 'static';

async function handleFileRequest(request, response) {
   function respondWithCode(code, content, contentType) {
      response.writeHead(code, { 'Content-Type': contentType });
      response.write(content);
      response.end();
   }

   try {
      const url = request.url;
      // Update how the filePath is constructed
      const filePath = path.join(process.cwd(), staticFolder, url.replace('/static/', ''));

      console.log('Requested URL:', url);
      console.log('Absolute File Path:', filePath);

      await fs.access(filePath);

      const fileContents = await fs.readFile(filePath);

      console.log('File Contents:', fileContents);

      const dotIndex = filePath.lastIndexOf('.');
      if (dotIndex === -1) {
         respondWithCode(400, '400 Bad Request', 'text/plain');
         return;
      }

      const ext = filePath.substring(dotIndex + 1).toLowerCase();
      const contentType = getContentType(ext);

      response.writeHead(200, { 'Content-Type': contentType });
      response.write(fileContents);
      response.end();
   } catch (error) {
      if (error.code === 'ENOENT') {
         respondWithCode(404, '404 Not Found', 'text/plain');
      } else {
         respondWithCode(500, '500 Internal Server Error', 'text/plain');
      }
   }
}

function getContentType(extension) {
   switch (extension) {
      case 'html':
         return 'text/html';
      case 'css':
         return 'text/css';
      case 'js':
         return 'text/javascript';
      case 'jpg':
      case 'jpeg':
         return 'image/jpeg';
      case 'png':
         return 'image/png';
      case 'svg':
         return 'image/svg+xml';
      case 'mp4':
         return 'video/mp4';
      case 'webp':
         return 'image/webp';
      case 'pdf':
         return 'application/pdf';
      default:
         return 'text/plain';
   }
}

module.exports = { handleFileRequest };
