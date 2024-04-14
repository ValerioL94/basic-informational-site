const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);

  // set correct path
  const path =
    myURL.pathname === '/'
      ? './pages/index.html'
      : `./pages${myURL.pathname}.html`;

  // send the correct html file
  fs.readFile(path, (err, data) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // page not found
        fs.readFile('./pages/404.html', (err, data) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(data, 'utf8');
        });
      } else {
        // some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // success
      res.writeHead(200, { Content_type: 'text/html' });
      res.end(data, 'utf8');
    }
  });
});

server.listen(8080);
