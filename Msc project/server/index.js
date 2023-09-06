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

// fetch university data from database

app.get('/universities', async (req, res) => {
  try {
    const universities = await db.promise().query('SELECT id, name FROM universities');
    res.json(universities[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching universities' });
  }
});

// fetch courses data from database

app.get('/courses', async (req, res) => {
  try {
    const courses = await db.promise().query('SELECT id, name FROM courses');
    res.json(courses[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// register route 

app.post('/register', async (req, res) => {

  const { username, email,name, password, universityId, courseId, universityName, courseName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let finalUniversityId = universityId;

    if (universityId === 'Other') {
      const universityInsertResult = await db.promise().query(
        'INSERT INTO universities (name) VALUES (?)',
        [universityName]
      );
      finalUniversityId = universityInsertResult[0].insertId;
    }

    let finalCourseId = courseId;

    if (courseId === 'Other') {
      const courseInsertResult = await db.promise().query(
        'INSERT INTO courses (name) VALUES (?)',
        [courseName]
      );
      finalCourseId = courseInsertResult[0].insertId;
    }

    await db.promise().query(
      'INSERT INTO users (username, email, name, password, university_id, course_id) VALUES (?, ?, ?, ?, ?, ?)',
      [username, email, name, hashedPassword, finalUniversityId, finalCourseId]
    );    
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});


// login route 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      res.status(401).json({ message: 'Email or password is incorrect' });
      return;
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'email or password is incorrect' });
      return;
    }

    res.json({ message: 'Login successful' , userId : user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'email or password is incorrect' });
  }
});

// User Profile

app.get('/profile/:userId', async (req, res) => {
  try {
    const [userData] = await db.promise().query(`
      SELECT u.id, u.username, u.email, u.name, univ.name AS university_name, course.name AS course_name
      FROM users u
      JOIN universities univ ON u.university_id = univ.id
      JOIN courses course ON u.course_id = course.id
    `);
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profiles' });
  }
});

// messages route 

app.get('/messages/:userId/:receiverId', async (req, res) => {
  const { userId, receiverId } = req.params;
  try {
    const messages = await db.promise().query(
      'SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp',
      [userId, receiverId, receiverId, userId]
    );
    res.json(messages[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});


app.post('/messages/send', upload.single('file'), async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const file = req.file; 

  try {
    let fileId = null;
    if (file) {
      const { originalname, mimetype, buffer } = file;

      
      const result = await db.promise().query(
        'INSERT INTO files (filename, mime_type, file_data) VALUES (?, ?, ?)',
        [originalname, mimetype, buffer]
      );
      fileId = result[0].insertId;
    }

    const result = await db.promise().query(
      'INSERT INTO messages (sender_id, receiver_id, message, file_id) VALUES (?, ?, ?, ?)',
      [senderId, receiverId, message, fileId]
    );

    const insertedMessageId = result[0].insertId;
    const insertedMessage = {
      id: insertedMessageId,
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      file_id: fileId,
      timestamp: new Date(),
    };

    res.json(insertedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});



// FILES ROUTE 

app.get('/files/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const fileData = await db.promise().query(
      'SELECT * FROM files WHERE id = ?',
      [fileId]
    );

    if (fileData[0].length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = fileData[0][0];
    const fileBuffer = Buffer.from(file.file_data, 'base64');

    res.set('Content-Type', file.mime_type);
    res.send(fileBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching file' });
  }
});

//get the receivername
app.get('/user/:receiverId', async (req, res) => {
  const receiverId = req.params.receiverId;

  try {

    const receiver = await db.promise().query(
      'SELECT username FROM users WHERE id = ?',
      [receiverId]
    );

    if (receiver[0].length === 0) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const receiverName = receiver[0][0].username;
    res.json({ username: receiverName });
  } catch (error) {
    console.error('Error fetching receiver name:', error);
    res.status(500).json({ message: 'Error fetching receiver name' });
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
