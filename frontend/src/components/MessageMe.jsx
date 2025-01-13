import React, { useState } from 'react';
import axios from 'axios';

function MessageMe() {

  const [formData, setFormData] = useState({
    subject: '',
    content: ''
  });

  const [message, setMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/messages', JSON.stringify(formData));
      setMessage(response.data);
    } catch (error) {
      setMessage('Message failed to send!');
    }
    setFormData({
      subject: '',
      content: ''
    });
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Message me</h1>
        <div className="form-group">
          <label htmlFor="input-subject">Subject</label>
          <input type="text" id="input-subject" name='subject' placeholder="Subject..." className="form-control" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="input-content">Content</label>
          <textarea id="input-content" name='content' rows="3" className="form-control" value={formData.content} onChange={handleChange} required />
        </div>
        {message ? <p>{message}</p> : null}
        <div className="form-group button-container">
          <button type="submit" className="form-button">Send</button>
        </div>
      </form>
    </>
  );
}

export default MessageMe;