import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, X, Sparkles } from 'lucide-react';

interface EnvelopePageProps {
  onOpen: () => void;
  onClose: () => void;
  showSadMessage: boolean;
  showPasswordModal: boolean;
  setShowPasswordModal: (show: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  onPasswordSubmit: () => void;
}

const EnvelopePage = ({
  onOpen,
  onClose,
  showSadMessage,
  showPasswordModal,
  setShowPasswordModal,
  password,
  setPassword,
  onPasswordSubmit,
}: EnvelopePageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating hearts
    const hearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onPasswordSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{ left: `${heart.x}%`, bottom: '-50px' }}
            animate={{
              y: [-100, -window.innerHeight - 100],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Heart
              className="text-pink-soft fill-pink-soft"
              size={20 + Math.random() * 20}
            />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          >
            <Sparkles
              className="text-yellow-400"
              size={10 + Math.random() * 15}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        className="text-center z-10 px-4"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-6xl text-gradient-pink mb-4"
        >
          Hai Zara! 💕
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body text-lg md:text-xl text-pink-dark mb-8"
        >
          Ada surat spesial buat kamu nih~ ✨
        </motion.p>

        {/* Envelope */}
        <motion.div
          className="relative mx-auto mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? [0, -2, 2, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/images/envelope.png"
            alt="Special Envelope"
            className="w-64 h-64 md:w-80 md:h-80 mx-auto drop-shadow-pink-lg cursor-pointer"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            onClick={onOpen}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-soft opacity-30 blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="px-8 py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display text-lg rounded-full shadow-pink-lg hover:shadow-glow-pink transition-all duration-300 flex items-center gap-2"
          >
            <Heart className="w-5 h-5 fill-white" />
            Buka Suratnya
            <Heart className="w-5 h-5 fill-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-4 bg-white/80 text-pink-dark font-display text-lg rounded-full shadow-pink hover:shadow-pink-lg transition-all duration-300 border-2 border-pink-soft"
          >
            Tutup Aja 😢
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-pink-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-pink-dark hover:text-pink-hot transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 bg-pink-pale rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Lock className="w-10 h-10 text-pink-dark" />
                </motion.div>

                <h2 className="font-display text-2xl text-pink-dark mb-2">
                  Masukin Password Dulu! 🔐
                </h2>
                <p className="font-body text-gray-600 mb-6">
                  Hint: Nama kamu sendiri~ 💕
                </p>

                <div className="relative">
                  <input
                    id="password-input"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ketik password..."
                    className="w-full px-6 py-4 bg-pink-pale border-2 border-pink-soft rounded-full text-center font-body text-lg text-pink-dark placeholder-pink-soft focus:outline-none focus:border-pink-dark focus:ring-2 focus:ring-pink-dark/20 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onPasswordSubmit}
                  className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display text-lg rounded-full shadow-pink-lg hover:shadow-glow-pink transition-all duration-300"
                >
                  Masuk 🎀
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sad Message */}
      <AnimatePresence>
        {showSadMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-3xl p-6 shadow-pink-xl z-40 max-w-sm mx-4"
          >
            <div className="text-center">
              <motion.img
                src="/images/bubu-sad.png"
                alt="Sad Bubu"
                className="w-32 h-32 mx-auto mb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <p className="font-display text-xl text-pink-dark mb-2">
                Yahh... Kamu nggak mau buka? 😢
              </p>
              <p className="font-body text-gray-600">
                Aku sedih nih... Tapi gapapa, aku tunggu kamu bukanya ya~ 💔
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnvelopePage;
