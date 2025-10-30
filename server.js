const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'farmer-site')));

mongoose.connect('mongodb://localhost:27017/farmer_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/message', async (req, res) => {
  try {
    const { name, email, msg } = req.body;
    
    const newContact = new Contact({
      name: name,
      email: email,
      message: msg
    });
    
    await newContact.save();
    
    console.log('Message received:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', msg);
    
    res.json({ success: true, message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Error saving message' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'farmer-site', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
