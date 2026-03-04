import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX, Heart } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentSong] = useState({
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Note: The user will need to add their own audio file
  // For now, we'll create a placeholder that shows how it works

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    
    // User should replace this with their own audio file
    // audioRef.current.src = '/audio/thinking-out-loud.mp3';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Uncomment when audio file is added
        // audioRef.current.play().catch(() => {
        //   console.log('Audio playback failed - please add audio file');
        // });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-pink-dark to-pink-hot rounded-full shadow-pink-lg hover:shadow-glow-pink flex items-center justify-center text-white transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {isPlaying ? <Music className="w-6 h-6" /> : <Music className="w-6 h-6" />}
        </motion.div>
        
        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-dark"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Music Player Modal */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white/95 backdrop-blur-lg rounded-3xl shadow-pink-xl p-6"
          >
            {/* Vinyl Record Animation */}
            <div className="flex justify-center mb-4">
              <motion.div
                className="relative w-32 h-32"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-dark to-pink-hot flex items-center justify-center shadow-pink-lg">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-dark fill-pink-dark" />
                  </div>
                </div>
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border-2 border-white/20" />
                <div className="absolute inset-4 rounded-full border-2 border-white/20" />
                <div className="absolute inset-6 rounded-full border-2 border-white/20" />
              </motion.div>
            </div>

            {/* Song Info */}
            <div className="text-center mb-4">
              <h3 className="font-display text-lg text-pink-dark font-bold">
                {currentSong.title}
              </h3>
              <p className="font-body text-sm text-gray-500">
                {currentSong.artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-pink-pale flex items-center justify-center text-pink-dark"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-dark to-pink-hot flex items-center justify-center text-white shadow-pink-lg"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </motion.button>
            </div>

            {/* Note for user */}
            <p className="text-xs text-center text-gray-400 mt-4 font-body">
              💡 Tambahkan file audio di /public/audio/
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
