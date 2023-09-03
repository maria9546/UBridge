import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
  
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });
      
  
      if (response.data.message === 'Login successful') {
        const userId = response.data.userId;
        window.location.href = `/profile/${userId}`
      } else {
        setMessage('email or password is incorrect');
      }
    } catch (error) {
      setMessage('email or password is incorrect');
    }
  };

  
  return (
    <div>
    <div class='auth-container'>
      <div class='auth-image'>
      </div>
      <div class='auth-form'>
      <h1>Login</h1>
      <form>
        <input
          class="registerinput"
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="registerinputpassword"
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p style={{ color: 'red' }}>{message}</p>
        <span>
          Don't have an account? <Link to='/register'>Register</Link>
        </span>
      </form>
    </div>
    </div>
    <br/><br/>
    </div>
  );
}

export default Login;
