import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Heart, Music, Gift, Image, Menu, X } from 'lucide-react';

interface CuteNavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

const CuteNavbar = ({ currentSection, onNavigate }: CuteNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'timeline', label: 'Memories', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'playlist', label: 'Playlist', icon: Music },
    { id: 'messages', label: 'Gifts', icon: Gift },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-pink-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => onNavigate('hero')}
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}images/bubu.png`}
                alt="Bubu"
                className="w-10 h-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className={`font-display text-xl font-bold transition-colors ${
                isScrolled ? 'text-pink-dark' : 'text-pink-dark'
              }`}>
                Zara's Day
              </span>
              <motion.img
                src={`${import.meta.env.BASE_URL}images/mimi.png`}
                alt="Mimi"
                className="w-10 h-10"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-dark to-pink-hot text-white shadow-pink'
                        : 'text-pink-dark hover:bg-pink-pale'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-pink-dark to-pink-hot rounded-full -z-10"
                        transition={{ type: 'spring', bounce: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-pink-pale text-pink-dark"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg shadow-pink-lg md:hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl font-body text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-dark to-pink-hot text-white shadow-pink'
                        : 'text-pink-dark hover:bg-pink-pale'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CuteNavbar;
