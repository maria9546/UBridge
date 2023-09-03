import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/contact', { name, email, message });
      setFeedback('Your feedback was sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setFeedback('An error occurred while sending your feedback.');
    }
  };

  return (
    <div>
    <div className='contact-form-container'>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          required
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /><br/><br/><br/>
        <button type='submit'>Send Message</button>
        <p className='feedback'>{feedback}</p>
      </form>
    </div>
    <br/><br/><br/>
    </div>
  );
};

export default ContactForm;
