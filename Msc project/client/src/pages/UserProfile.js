import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [setMessage] = useState('');


  useEffect(() => {
    axios.get(`http://localhost:3001/userprofile/${userId}`)
      .then(response => {
        const firstKey = Object.keys(response.data)[0];
        const userData = response.data[firstKey];
        setUserDetails(userData);
        setSelectedUniversity(userData.university_name);
        setSelectedCourse(userData.course_name);
        setNewUsername(userData.username);
        setNewEmail(userData.email);
        setNewName(userData.name);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });

    axios.get('http://localhost:3001/universities')
      .then(response => {
        setUniversities(response.data);
      })
      .catch(error => {
        console.error('Error fetching universities:', error);
      });

    axios.get('http://localhost:3001/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [userId]);

  const handleSaveEdit = () => {
    axios.put(`http://localhost:3001/userprofile/${userId}`, {
      university_name: selectedUniversity,
      course_name: selectedCourse,
      username: newUsername,
      email: newEmail,
      password: newPassword,
      name: newName,
    })
      .then(response => {
        setIsEditing(false);
        setMessage('Succesfully changed the details..');
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };

  return (
    <div>
    <div className='editprofile'>
      <h1>User : {userDetails.name}</h1>
      <p>User Name: {isEditing ? (
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      ) : (
        userDetails.username
      )}</p>

      <p>Name: {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        userDetails.name
      )}</p>

      <p>Email: {isEditing ? (
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      ) : (
        userDetails.email
      )}</p>

      {isEditing ? (
        <div>
          <label>Select University:</label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            {universities.map((university) => (
              <option key={university.id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>University Name: {userDetails.university_name}</p>
      )}

      {isEditing ? (
        <div>
          <label>Select Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Course Name: {userDetails.course_name}</p>
      )}

      {isEditing ? (
        <div className='password'>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      ) : null}

      {isEditing ? (
        <button onClick={handleSaveEdit}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
    <br/><br/><br/><br/>
    </div>
  );
};

export default UserProfile;
