import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageManager({ back })
{
    const [data, setData] = useState({
        subject: '',
        content: '',
        email: ''
    });
    const [messages, setMessages] = useState([]);
    const [action, setAction] = useState('messages');
    
    const getMessages = async () => {
        try {
            const response = await axios.get('/api/messages');
            setMessages(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMessages();
    }, []);

    const deleteMessage = async (id) => {
        try {
            await axios.delete(`/api/messages/${id}`);
            setAction('messages');
            getMessages();
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteButton = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;
        setAction('messages');
        deleteMessage(id);
    }

    const messagesButton = () => {
        setData({ subject: '', content: '', email: '' });
        setAction('messages');
    }

    const showButton = (id) => {
        const message = messages.find(message => message.id === id);
        setData({ subject: message.subject, content: message.content, email: message.email });
        setAction('show');
    }

  return (
    <>
        <div className="admin-menu">
            <button onClick={() => messagesButton()}>Show messages</button>
            <button onClick={() => back()}>Back</button>
        </div>
        {(action === 'show') ? 
        <div className="sm-message">
            <h1>{data.subject}</h1>
            <p>{data.content}</p>
            <p>{data.email}</p>
        </div>
        : 
        <div className="sm-sections">
            {messages.map((message, index) => (
                <div key={index} className="sm-section">
                    <h1>{message.subject}</h1>
                    <div className="sm-buttons">
                        <button onClick={() => showButton(message.id)}>Show details</button>
                        <button onClick={() => deleteButton(message.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
        }

    </>
  );
};

export default MessageManager;