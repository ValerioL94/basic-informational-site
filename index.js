const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log(req.url);
  const parsedURL = url.parse(req.url, true);
  // set correct path
  const path =
    parsedURL.pathname === '/'
      ? './pages/index.html'
      : `./pages/${parsedURL.pathname}.html`;

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
