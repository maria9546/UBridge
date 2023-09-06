import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const {userId, receiverId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [receiverName, setReceiverName] = useState('');


  const backToProfile = () => {
    window.history.go(-1); 
  };

  useEffect(() => {

    axios
      .get(`http://localhost:3001/user/${receiverId}`)
      .then(response => {
        setReceiverName(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching receiver name:', error);
      });

    axios.get(`http://localhost:3001/messages/${userId}/${receiverId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [userId, receiverId]);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSendMessage = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('message', newMessage);
    formData.append('senderId', userId);
    formData.append('receiverId', receiverId);
  
    axios
      .post('http://localhost:3001/messages/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        setMessages([...messages, response.data]); 
        setNewMessage(''); 
        setSelectedFile(null);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div>
    <div className='message_main'>
      <div className='header'>
      <h1>Message with {receiverName}</h1>
      <button className="go-back" onClick={backToProfile}>Back to Profile Page</button>
    </div><br/><br/>
    <div className='message-container'>
    <div className="message-list">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender_id === userId ? 'sender' : 'receiver'}`}
          >
            <p>{message.message}</p>
            
            {message.file_id && (
              <a
                href={`http://localhost:3001/files/${message.file_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            )}
            <p className="timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <label className='file-label'>
          <input type='file' onChange={handleFileUpload}/>
          Attach File
        </label><br/>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
    </div>
    <br/><br/>
    </div>
  );
};

export default Messages;
