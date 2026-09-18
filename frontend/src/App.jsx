import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import TechStack from './components/TechStack.jsx';
import Experience from './components/Experience.jsx';
import Portfolio from './components/Portfolio.jsx';
import Education from './components/Education.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import ChatBot from './components/chatbot/ChatBot.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((enabled) => !enabled)} />
      <Home />
      <About />
      <TechStack />
      <Experience />
      <Portfolio />
      <Education />
      <ContactForm />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
