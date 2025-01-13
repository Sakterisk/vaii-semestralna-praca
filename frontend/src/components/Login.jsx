import React, { useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';

function Login({ setPageContent }) {

    const { setAuth } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const [message, setMessage] = useState('');

    const registerUser = async () => {
        try {
            await axios.post('/api/register', formData);
            setMessage('User registered successfull! Please login.');
            setRegister(false);
        }
        catch (error) {
            setMessage(error.response.data.message);
        }
    }

    const loginUser = async () => {
      try {
        const response = await axios.post('/api/login', { email: formData.email, password: formData.password });
        setMessage(response.data.message);
        const user = await axios.get('/api/user');
        setAuth({ isLoggedIn: true, role: (user.data.id === 1) ? 'admin' : 'user' });
        setPageContent("aboutme");
      }
      catch (error) {
        setMessage(error.response.data.message);
      }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (register) {
          await registerUser();
        } else {
          await loginUser();
        }
        setFormData({
            name: formData.name,
            email: formData.email,
            password: '',
            password_confirmation: ''
        });
    }

    const [register, setRegister] = useState(false);

    const formChange = () => {
        setRegister(!register);
        setFormData({
            name: '',
            email: formData.email,
            password: '',
            password_confirmation: ''
        });
        setMessage('');
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {register ? <h1>Register</h1> : <h1>Login</h1>}
        {register ? 
        <div className="form-group">
          <label htmlFor="register-name">Name</label>
          <input type="text" id="register-name" name='name' placeholder="Name..." className="form-control" value={formData.name} onChange={handleChange} required/>
        </div> : null}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" name='email' placeholder="Email..." className="form-control" value={formData.email} onChange={handleChange} required/>
        </div>
        <div className='form-group'>
            <label htmlFor="login-password">Password</label>
            <input type='password' id='login-password' name='password' placeholder='Password...' className='form-control'  value={formData.password} onChange={handleChange} required/>
        </div>
        {register ?
        <div className='form-group'>
            <label htmlFor="register-password-confirmation">Password</label>
            <input type='password' id='register-password-confirmation' name='password_confirmation' placeholder='Password confirmation...' className='form-control'  value={formData.password_confirmation} onChange={handleChange} required/>
        </div> : null}
        {message ? <p>{message}</p> : null}
        <div className="form-group button-container">
          <button type="submit" className="form-button">Send</button>
        </div>
        {register ? 
        <p>Already have an account? <span className='clickable-text' onClick={() => formChange()}>Login</span></p> : 
        <p>Don't have an account yet? <span className='clickable-text' onClick={() => formChange()}>Register</span></p> }
      </form>
    </>
  );
}

export default Login;