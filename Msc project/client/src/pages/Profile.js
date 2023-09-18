import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [courseOptions, setCourseOptions] = useState([]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const [LoggedUserId, setLoggedUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/courses')
      .then(response => {
        setCourseOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });

    axios.get('http://localhost:3001/universities')
      .then(response => {
        setUniversityOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching universities:', error);
      });

    axios.get(`http://localhost:3001/profile/${userId}`)
      .then(response => {
        setUserDetails(response.data);
        setLoggedUserId(response.data.id);
      })
      .catch(error => {
        console.error('Error fetching user profiles:', error);
      });
  }, [userId]);

  // Filtering logic
  const filteredUserDetails = userDetails.filter(user => {
    const lowerSearchInput = searchInput ? searchInput.toLowerCase() : '';
    const lowerUsername = user.username ? user.username.toLowerCase() : '';
    const lowerEmail = user.email ? user.email.toLowerCase() : '';
    const lowerName = user.name ? user.name.toLowerCase() : '';

    if (selectedCourse && user.course_name !== selectedCourse) {
      return false;
    }
    if (selectedUniversity && user.university_name !== selectedUniversity) {
      return false;
    }
    if (
      lowerSearchInput &&
      !(
        lowerUsername.includes(lowerSearchInput) ||
        lowerEmail.includes(lowerSearchInput) ||
        lowerName.includes(lowerSearchInput)
      )
    ) {
      return false;
    }
    return true;
  });

  const loggedInUserName = userDetails.find(user => user.id === Number(userId))?.name;

  return (
    <div>
      <br /><br /><br /><br /><br />
      <h1>Welcome {loggedInUserName && ` ${loggedInUserName}`}</h1>
      <div className="filter-controls">
        <div className="filter-row">
          <select
            className='select-box'
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedUniversity('');
            }}
          >
            <option value="">Select Course</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          <select
            className='select-box'
            value={selectedUniversity}
            onChange={(e) => {
              setSelectedUniversity(e.target.value);
              setSelectedCourse('');
            }}
          >
            <option value="">Select University</option>
            {universityOptions.map((university) => (
              <option key={university.id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by name or email"
            className="input-form"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="user-list">
        {filteredUserDetails.length === 0 ? (
          <div className='no-result'>Sorry, No results found. <br/><br/><br/></div>
        ) : (
          filteredUserDetails.map(user => (
            <div key={user.id} className="user">
              <div className="user-details">
                <p><b>{user.name}</b></p>
                <p>{user.email}</p>
                <p>{user.university_name}</p>
                <p>{user.course_name}</p>
                {user.id !== LoggedUserId && user.id !== Number(userId) && (
                  <Link to={`/messages/${userId}/${user.id}`} className="message_button">
                    Send Message
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
