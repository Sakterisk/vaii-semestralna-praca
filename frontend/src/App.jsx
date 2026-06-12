import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';
import AboutMe from './components/AboutMe';
import MyWork from './components/MyWork';
import MessageMe from './components/MessageMe';
import Login from './components/Login';
import './App.css';
import AdminPanel from './components/AdminPanel';

const DEFAULT_ROUTE = 'home';

const readRouteFromHash = () => {
  const hash = window.location.hash.replace('#/', '').trim();
  return hash || DEFAULT_ROUTE;
};

const App = () => {
  const [route, setRoute] = useState(readRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(readRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((nextRoute) => {
    const normalized = (nextRoute || DEFAULT_ROUTE).replace(/^#?\//, '');
    window.location.hash = `/${normalized}`;
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      navigate(DEFAULT_ROUTE);
    }
  }, [navigate]);

  const page = useMemo(() => {
    if (route === 'home') {
      return (
        <>
          <AboutMe />
          <MyWork />
          <MessageMe />
        </>
      );
    }

    if (route === 'projects') {
      return <MyWork />;
    }

    if (route === 'contact') {
      return <MessageMe />;
    }

    if (route === 'admin') {
      return <AdminPanel />;
    }

    if (route === 'login') {
      return <Login navigate={navigate} />;
    }

    return <AboutMe />;
  }, [route, navigate]);

  return (
    <div className='app-container'>
      <Header navigate={navigate} route={route} />
      <main className='content'>{page}</main>
      <Footer />
    </div>
  );
};

export default App;
