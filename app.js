const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3001;

// MongoDB Connection
mongoose.connect("mongodb+srv://sumukeshmopuram1:q47rfTFHMkmrHy16@messages.2nguodb.mongodb.net/?retryWrites=true&w=majority&appName=Messages", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected for Messages'))
  .catch(err => console.error('MongoDB Error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Model
const Message = require('./models/message');

// Routes
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.render('messages', { messages, error: null });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.render('messages', { messages: [], error: 'Failed to load messages' });
  }
});

app.listen(port, () => 
  console.log(`Messages server running on http://localhost:${port}`)
);