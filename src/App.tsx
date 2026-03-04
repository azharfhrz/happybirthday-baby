import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

// Import sections
import EnvelopePage from './sections/EnvelopePage';
import MainWebsite from './sections/MainWebsite';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showSadMessage, setShowSadMessage] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Check if user has already opened (for demo, we'll reset on refresh)
  useEffect(() => {
    const hasOpened = localStorage.getItem('zaraBirthdayOpened');
    if (hasOpened === 'true') {
      setIsOpened(true);
    }
  }, []);

  const handleOpenEnvelope = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    // Password is "zara" (lowercase)
    if (password.toLowerCase() === 'zara') {
      setShowPasswordModal(false);
      setIsOpened(true);
      localStorage.setItem('zaraBirthdayOpened', 'true');
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffb8d0', '#ff70a5', '#ff1493', '#ffd0e0', '#fff0f5'],
      });
    } else {
      // Shake animation for wrong password
      const input = document.getElementById('password-input');
      if (input) {
        input.classList.add('animate-shake');
        setTimeout(() => input.classList.remove('animate-shake'), 500);
      }
    }
  };

  const handleCloseEnvelope = () => {
    setShowSadMessage(true);
    setTimeout(() => setShowSadMessage(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-pink overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <EnvelopePage
            key="envelope"
            onOpen={handleOpenEnvelope}
            onClose={handleCloseEnvelope}
            showSadMessage={showSadMessage}
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
            password={password}
            setPassword={setPassword}
            onPasswordSubmit={handlePasswordSubmit}
          />
        ) : (
          <MainWebsite key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
