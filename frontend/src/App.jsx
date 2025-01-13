import React from 'react';
import { useState } from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';
import AboutMe from './components/AboutMe';
import MyWork from './components/MyWork';
import MessageMe from './components/MessageMe';
import Login from './components/Login';
import './App.css';
import AdminPanel from './components/AdminPanel';

const App = () => {

  const [pageContent, setPageContent] = useState('aboutme');

  const renderPage = () => {
    if (pageContent === 'aboutme') {
      return <AboutMe />;
    } else if (pageContent === 'mywork') {
      return <MyWork />;
    } else if (pageContent === 'contact') {
      return <MessageMe />;
    } else if (pageContent === 'adminpanel') {
      return <AdminPanel />;
    } else if (pageContent === 'login') {
      return <Login setPageContent={setPageContent}/>;
    }
  }

  return (
    <div className='app-container'>
      <Header setPageContent={setPageContent} />
      <main className='content'>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
