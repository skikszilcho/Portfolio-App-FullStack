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

const PING_TIMEOUT_MS = 8000;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // 'unknown' = ping in flight or not yet started
  // 'online'  = health check succeeded
  // 'error'   = health check failed or timed out
  const [backendStatus, setBackendStatus] = useState('unknown');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);
  
  const pingBackend = useCallback(async () => {
    setBackendStatus('unknown');
    try {
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

      const response = await fetch('/api/health', { signal: controller.signal });
      clearTimeout(timeoutId);

      setBackendStatus(response.ok ? 'online' : 'error');
    } catch {
      // AbortError (timeout) or network failure — both treated as 'error'
      setBackendStatus('error');
    }
  }, []);

  // Fire health-ping once on mount (fire-and-forget — does not block rendering)
  useEffect(() => {
    pingBackend();
  }, [pingBackend]);

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
      <ChatBot backendStatus={backendStatus} onRetry={pingBackend} />
    </>
  );
}

export default App;
