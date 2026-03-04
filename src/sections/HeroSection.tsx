import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';

const HeroSection = () => {
  const [showPhoto, setShowPhoto] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Trigger photo reveal after title animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhoto(true);
      // Trigger confetti when photo appears
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ffb8d0', '#ff70a5', '#ff1493', '#ffd0e0', '#fff0f5'],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const titleLetters = 'HAPPY BIRTHDAY  ZARA'.split('');

  const floatingElements = [
    { icon: Heart, x: '10%', y: '20%', delay: 0, color: 'text-pink-dark' },
    { icon: Star, x: '85%', y: '15%', delay: 0.5, color: 'text-yellow-400' },
    { icon: Sparkles, x: '75%', y: '70%', delay: 1, color: 'text-pink-hot' },
    { icon: Gift, x: '15%', y: '75%', delay: 1.5, color: 'text-pink-dark' },
    { icon: Heart, x: '90%', y: '50%', delay: 0.3, color: 'text-pink-soft' },
    { icon: Star, x: '5%', y: '50%', delay: 0.8, color: 'text-yellow-300' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20"
    >
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-pink-pale via-pink-light/30 to-pink-pale"
      />

      {/* Floating Elements */}
      {floatingElements.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color}`}
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-8 h-8 md:w-12 md:h-12" />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: -100, 
                  rotateX: 90,
                  scale: 0.5 
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  scale: 1 
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  type: 'spring',
                  bounce: 0.5,
                }}
                className={`inline-block ${
                  letter === ' ' ? 'w-4 md:w-8' : ''
                } ${
                  index % 2 === 0 
                    ? 'text-gradient-pink' 
                    : 'text-pink-dark'
                }`}
                style={{
                  textShadow: '3px 3px 0px rgba(255, 112, 165, 0.3)',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-body text-xl md:text-2xl text-pink-dark/80 mb-8"
        >
          TODAY'S GONNA BE UR ONE FINE DAY! semoga hari ini kamu banyak senyum nya ya cantik ✨
        </motion.p>

        {/* Bubu & Mimi Characters */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
          className="flex justify-center items-center gap-4 mb-8"
        >
          <motion.img
            src="/images/bubu.png"
            alt="Bubu"
            className="w-20 h-20 md:w-28 md:h-28"
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-pink-hot fill-pink-hot" />
          </motion.div>
          <motion.img
            src="/images/mimi.png"
            alt="Mimi"
            className="w-20 h-20 md:w-28 md:h-28"
            animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>

        {/* Photo Reveal Section */}
        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="relative"
            >
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {/* Photo Frame */}
                <div className="relative bg-white p-4 rounded-3xl shadow-pink-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  {/* Placeholder for Zara's Photo */}
                  <div className="w-48 h-60 md:w-64 md:h-80 bg-gradient-to-br from-pink-pale to-pink-light rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-center p-4">
                      <motion.img
                        src="/images/birthday-celebration.png"
                        alt="Birthday Celebration"
                        className="w-32 h-32 mx-auto mb-2"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="font-body text-pink-dark text-sm">
                        Cantik banget pacarkuu 💕
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corners */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-pink-dark rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-hot rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                {/* Sparkles around photo */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-display text-2xl md:text-3xl text-pink-dark mt-6"
              >
                🎂 Selamat tanggal 5 Maret untuk ke-21 kalinya ya sayang! 🎂
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <p className="font-body text-sm text-pink-dark/60 mb-2">
              Scroll untuk lihat kejutan! 👇
            </p>
            <div className="w-6 h-10 border-2 border-pink-dark/40 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-pink-dark rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
