import React from 'react';
import { useState } from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';
import AboutMe from './components/AboutMe';
import MyWork from './components/MyWork';
import Contact from './components/Contact';
import SectionManager from './components/SectionManager';
import './App.css';

const App = () => {

  const [pageContent, setPageContent] = useState('aboutme');

  const renderPage = () => {
    if (pageContent === 'aboutme') {
      return <AboutMe />;
    } else if (pageContent === 'mywork') {
      return <MyWork />;
    } else if (pageContent === 'contact') {
      return <Contact />;
    } else if (pageContent === 'secmanager') {
      return <SectionManager />;
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
