import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingView from './components/LandingView';
import LoadingView from './components/LoadingView';
import ChatView from './components/ChatView';
import Prism from './prism';

const API_BASE = "http://localhost:8000";

export default function App() {
  const [view, setView] = useState('landing');
  const [repoUrl, setRepoUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Greetings. I have established a connection to the repository. Dont hesitate to ask any questions.' }
  ]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const isValidGithubUrl = (url) => {
    const githubPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/;
    return githubPattern.test(url.trim());
  };

  const handleReset = () => {
    setView('landing');
    setRepoUrl('');
    setIsUrlValid(false);
    setUrlError('');
    setMessages([
      { role: 'ai', text: 'Greetings. I have established a connection to the repository. Dont hesitate to ask any questions.' }
    ]);
    setCurrentQuery('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setRepoUrl(url);
    
    if (url.trim() === '') {
      setIsUrlValid(false);
      setUrlError('');
    } else if (isValidGithubUrl(url)) {
      setIsUrlValid(true);
      setUrlError('');
    } else {
      setIsUrlValid(false);
      setUrlError('Invalid GitHub URL. Use: https://github.com/username/repo');
    }
  };

  const handleIngest = async () => {
    if (!isUrlValid) return;
    setView('loading');
    try {
      const response = await fetch(`${API_BASE}/api/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      });
      setTimeout(() => setView('chat'), 13000);
    } catch (error) {
      console.error("Ingest failed", error);
      setView('landing');
    }
  };

  const handleSend = async () => {
    if (!currentQuery.trim()) return;
    const userMsg = { role: 'user', text: currentQuery };
    setMessages(prev => [...prev, userMsg]);
    setCurrentQuery('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repo_url: repoUrl,
          query: userMsg.text
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I encountered an anomaly in the data stream." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-indigo-500/30 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 w-full h-full bg-black">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      </div>

      <div className="z-20 w-full max-w-4xl px-4 relative">
        <AnimatePresence mode="wait">
          {view === 'landing' && ( <LandingView repoUrl={repoUrl} isUrlValid={isUrlValid} urlError={urlError} onUrlChange={handleUrlChange} onIngest={handleIngest} />)}
          {view === 'loading' && <LoadingView />}
          {view === 'chat' && ( <ChatView messages={messages} isTyping={isTyping} currentQuery={currentQuery} repoUrl={repoUrl} messagesEndRef={messagesEndRef} onQueryChange={setCurrentQuery} onSend={handleSend} onReset={handleReset} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}