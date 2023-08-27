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


app.listen(3001, () => {
  console.log('Server started on port 3001');
});
