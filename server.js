const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'farmer-site')));

app.post('/message', (req, res) => {
  const { name, email, msg } = req.body;
  
  console.log('Message received:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', msg);
  
  res.json({ success: true, message: 'Message received successfully!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'farmer-site', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
