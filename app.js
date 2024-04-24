const express = require('express');

const app = express();
const port = 3000;

app.listen(port);

app.get('/', (req, res) => {
  res.sendFile('./pages/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
  res.sendFile('./pages/about.html', { root: __dirname });
});
app.get('/contact-me', (req, res) => {
  res.sendFile('./pages/contact-me.html', { root: __dirname });
});
app.use((req, res) => {
  res.status(404).sendFile('./pages/404.html', { root: __dirname });
});
