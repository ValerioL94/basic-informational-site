const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // set header content type
  res.setHeader('Content-Type', 'text/html');

  let path = './pages/';
  // switch pages path
  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/contact-me':
      path += 'contact-me.html';
      res.statusCode = 200;
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send the correct html file
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    else {
      res.end(data);
    }
  });
});

server.listen(8080, 'localhost', () => {
  console.log('http://localhost:8080');
});
