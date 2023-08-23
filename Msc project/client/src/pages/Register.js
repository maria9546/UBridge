import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const universitiesResponse = await axios.get('http://localhost:3001/universities');
        const coursesResponse = await axios.get('http://localhost:3001/courses');
        setUniversities(universitiesResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/register', {
        username,
        email,
        name,
        password,
        universityId: selectedUniversity,
        courseId: selectedCourse,
        universityName,
        courseName
      });
      setFeedback('Your Registration was success!');
      setUsername('');
      setEmail('');
      setName('');
      setUniversityName('');
      setCourseName('');
      window.location.href = '/login'; 
    } catch (error) {
      setFeedback('An error occurred.');
    }
  };

  return (
    <div class='auth-container'>
      <div class='auth-image'>
      </div>
      <div class='auth-form'>
      <h1>Register</h1>
      <p className='feedback'>{feedback}</p>
      <form onSubmit={handleRegister}>
        <input class="registerinput" required type='text' placeholder='username' name='username' value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <input class="registerinput" required type='email' placeholder='Email' name='email' value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <input class="registerinput" required type='text' placeholder='Name' name='name' value={name}
        onChange={(e) => setName(e.target.value)}/>
        <input class="registerinputpassword" required type='password' placeholder='password' name='password' value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <select required value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
          <option value='' disabled>Select University</option>
          {universities.map((university) => (
            <option key={university.id} value={university.id}>{university.name}</option>
          ))}
          <option value='Other'>Other</option>
        </select>
        {selectedUniversity === 'Other' && (
        <input
          type='text'
          placeholder='Enter University Name'
          value={universityName}
          onChange={(e) => setUniversityName(e.target.value)}
        />
        )}
        <select required value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value='' disabled>Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
          <option value='Other'>Other</option>
        </select>
        {selectedCourse === 'Other' && (
        <input
          type='text'
          placeholder='Enter Course Name'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        )}
        <button type='submit'>Register</button>
        <span>Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      </div>
      </div>
  );
};

export default Register;