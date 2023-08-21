const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const storage = multer.memoryStorage(); 
const upload = multer({ storage });


//  db details 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'ubridge'
});


// contact
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.body)

  try {
    await db.promise().query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'An error occurred while saving the message.' });
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
