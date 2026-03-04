import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import HeroSection from './HeroSection';
import TimelineSection from './TimelineSection';
import PlaylistSection from './PlaylistSection';
import MessageGiftSection from './MessageGiftSection';
import GallerySection from './GallerySection';
import CuteNavbar from '../components/CuteNavbar';
import MusicPlayer from '../components/MusicPlayer';

const MainWebsite = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const mainRef = useRef<HTMLDivElement>(null);

  // Trigger initial confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.3 },
        colors: ['#ffb8d0', '#ff70a5', '#ff1493', '#ffd0e0', '#fff0f5', '#ffc0cb'],
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
    }
  };

  // Intersection Observer for section detection
  useEffect(() => {
    const sections = ['hero', 'timeline', 'gallery', 'playlist', 'messages'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-pink relative"
    >
      {/* Cute Navbar */}
      <CuteNavbar currentSection={currentSection} onNavigate={scrollToSection} />

      {/* Music Player */}
      <MusicPlayer />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Timeline/Memories Section */}
        <section id="timeline">
          <TimelineSection />
        </section>

        {/* Gallery Section */}
        <section id="gallery">
          <GallerySection />
        </section>

        {/* Playlist Section */}
        <section id="playlist">
          <PlaylistSection />
        </section>

        {/* Messages & Gifts Section */}
        <section id="messages">
          <MessageGiftSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-t from-pink-dark/20 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}images/bubu-mimi-heart.png`}
              alt="Bubu & Mimi"
              className="w-24 h-24 mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="font-display text-2xl text-gradient-pink mb-2">
              Made with 💕 for Zara
            </p>
            <p className="font-body text-pink-dark/70">
              Happy Birthday Sayangku! 🎂✨
            </p>
            
            {/* Floating hearts */}
            <div className="flex gap-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-pink-dark">💕</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
};

export default MainWebsite;
