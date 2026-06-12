import React, { useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';

function Login({ navigate }) {
  const { setAuth, checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const registerUser = async () => {
    await axios.post('/api/register', formData);
    setMessage('Account created successfully.');
    setRegister(false);
  };

  const loginUser = async () => {
    await axios.post('/api/login', { email: formData.email, password: formData.password });
    await checkAuth();
    const user = await axios.get('/api/user');
    setAuth({ isLoggedIn: true, role: user.data.role || 'user' });
    setMessage('Logged in successfully.');
    navigate('home');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (register) {
        await registerUser();
      } else {
        await loginUser();
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Authentication failed.');
    } finally {
      setLoading(false);
      setFormData((prev) => ({
        ...prev,
        password: '',
        password_confirmation: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='card'>
      <h2>{register ? 'Create Account' : 'Login'}</h2>
      {register && (
        <div className='form-group'>
          <label htmlFor='register-name'>Name</label>
          <input type='text' id='register-name' name='name' className='form-control' value={formData.name} onChange={handleChange} required />
        </div>
      )}
      <div className='form-group'>
        <label htmlFor='login-email'>Email</label>
        <input type='email' id='login-email' name='email' className='form-control' value={formData.email} onChange={handleChange} required />
      </div>
      <div className='form-group'>
        <label htmlFor='login-password'>Password</label>
        <input type='password' id='login-password' name='password' className='form-control' value={formData.password} onChange={handleChange} required />
      </div>
      {register && (
        <div className='form-group'>
          <label htmlFor='register-password-confirmation'>Password confirmation</label>
          <input type='password' id='register-password-confirmation' name='password_confirmation' className='form-control' value={formData.password_confirmation} onChange={handleChange} required />
        </div>
      )}
      {message && <p>{message}</p>}
      <button type='submit' disabled={loading}>{loading ? 'Please wait...' : (register ? 'Register' : 'Login')}</button>
      <p>
        {register ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span className='clickable-text' onClick={() => setRegister((prev) => !prev)}>
          {register ? 'Login' : 'Register'}
        </span>
      </p>
    </form>
  );
}

export default Login;
