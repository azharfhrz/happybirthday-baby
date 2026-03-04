import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music, Play, Pause, Heart, Plus, X, Disc, Volume2 } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audio: string;   // 👈 tambahin ini
  isPlaying?: boolean;
}


const PlaylistSection = () => {
const [songs, setSongs] = useState<Song[]>([
  { id: 1, title: 'Thinking Out Loud', artist: 'Ijey Sheeran', duration: '4:41', audio: `${import.meta.env.BASE_URL}music/thinking.mp3` },
  { id: 2, title: 'could not save you tonight', artist: 'Ijey kul', duration: '4:23', audio: `${import.meta.env.BASE_URL}music/couldnt.mp3` },
  { id: 3, title: 'Get u', artist: 'Ijey Caesar', duration: '4:18', audio: `${import.meta.env.BASE_URL}music/get-you.mp3` },
  { id: 4, title: 'Ijey NGERAP LESGOO', artist: 'XXXIJEY', duration: '3:53', audio: `${import.meta.env.BASE_URL}music/shape.mp3` },
  { id: 5, title: 'Champagne Supernova', artist: 'Ijey Oasis', duration: '3:53', audio: `${import.meta.env.BASE_URL}music/oasis.mp3` },
]);

  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSong, setNewSong] = useState({
  title: '',
  artist: '',
  duration: '',
  audio: ''   // 🔥 tambahin ini
});
  const [likedSongs, setLikedSongs] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const audioRef = useRef<HTMLAudioElement | null>(null);
const handlePlay = (songId: number) => {
  const selected = songs.find((s) => s.id === songId);
  if (!selected) return;

  if (currentSong === songId && isPlaying) {
    audioRef.current?.pause();
    setIsPlaying(false);
  } else {
    if (audioRef.current) {
      audioRef.current.src = selected.audio;  // 👈 pakai path manual
      audioRef.current.play();
    }

    setCurrentSong(songId);
    setIsPlaying(true);
  }
};

  const handleLike = (songId: number) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId));
    } else {
      setLikedSongs([...likedSongs, songId]);
    }
  };

  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      setSongs([...songs, { ...newSong, id: Date.now() }]);
     setNewSong({
  title: '',
  artist: '',
  duration: '',
  audio: ''
});
      setShowAddModal(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-40 h-40 bg-pink-soft/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-pink-dark/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-pink mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Music className="w-5 h-5 text-pink-dark" />
            <span className="font-body text-pink-dark font-medium">Our Playlist</span>
            <Music className="w-5 h-5 text-pink-dark" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl text-gradient-pink mb-4">
            Playlist Cinta Kita
          </h2>
          <p className="font-body text-lg text-pink-dark/70 max-w-xl mx-auto">
            sebenernya ini hampir sama aja kayak yang aku buat waktu itu, tapi disini aku nyanyi lagi buat kamu hehe. OIYAA ADA 1 LAGU YG AKU BIKINNYA SPECIAL dan lumayan ngeditnya hehe, kalo udah nemu lagu mana semoga kamu suka yaa🎵💕
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Vinyl Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Vinyl Record */}
            <div className="relative mb-8">
              <motion.div
                className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-900 to-black shadow-2xl flex items-center justify-center relative overflow-hidden"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                {/* Vinyl Grooves */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-gray-800"
                    style={{
                      width: `${100 - i * 10}%`,
                      height: `${100 - i * 10}%`,
                    }}
                  />
                ))}

                {/* Label */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-dark to-pink-hot flex items-center justify-center relative">
                  <motion.img
                    src={`${import.meta.env.BASE_URL}images/bubu-mimi-music.png`}
                    alt="Music"
                    className="w-24 h-24 rounded-full object-cover"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute w-4 h-4 bg-white rounded-full" />
                </div>
              </motion.div>

              {/* Tone Arm */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-4 bg-gray-700 rounded-full origin-left"
                animate={isPlaying ? { rotate: 25 } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: '0% 50%' }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-600 rounded-full" />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-dark/20 blur-3xl -z-10"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Now Playing */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-pink-lg w-full max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-pink-pale rounded-2xl flex items-center justify-center">
                  <Disc className={`w-8 h-8 text-pink-dark ${isPlaying ? 'animate-spin' : ''}`} />
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs text-pink-dark/60 uppercase tracking-wider">
                    Now Playing
                  </p>
                  <p className="font-display text-lg text-pink-dark truncate">
                    {currentSong
                      ? songs.find((s) => s.id === currentSong)?.title
                      : 'Pilih lagu untuk diputar'}
                  </p>
                  <p className="font-body text-sm text-gray-500">
                    {currentSong
                      ? songs.find((s) => s.id === currentSong)?.artist
                      : '-'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-pink-pale rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-dark to-pink-hot"
                    animate={isPlaying ? { width: ['0%', '100%'] } : {}}
                    transition={{ duration: 30, repeat: Infinity }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="font-body text-xs text-gray-400">0:00</span>
                  <span className="font-body text-xs text-gray-400">
                    {currentSong
                      ? songs.find((s) => s.id === currentSong)?.duration
                      : '0:00'}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Song List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-pink-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl text-pink-dark">
                Daftar Lagu
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="p-2 bg-pink-pale rounded-full text-pink-dark hover:bg-pink-soft transition-colors"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    currentSong === song.id
                      ? 'bg-gradient-to-r from-pink-pale to-pink-light'
                      : 'hover:bg-pink-pale/50'
                  }`}
                >
                  {/* Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePlay(song.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentSong === song.id && isPlaying
                        ? 'bg-pink-dark text-white'
                        : 'bg-pink-pale text-pink-dark'
                    }`}
                  >
                    {currentSong === song.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </motion.button>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-display text-base truncate ${
                        currentSong === song.id
                          ? 'text-pink-dark'
                          : 'text-gray-700'
                      }`}
                    >
                      {song.title}
                    </p>
                    <p className="font-body text-sm text-gray-500">
                      {song.artist}
                    </p>
                  </div>

                  {/* Duration & Like */}
                  <div className="flex items-center gap-3">
                    <span className="font-body text-sm text-gray-400">
                      {song.duration}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(song.id)}
                      className="text-pink-dark"
                    >
                      <Heart
                        className={`w-5 h-5 transition-all ${
                          likedSongs.includes(song.id)
                            ? 'fill-pink-dark'
                            : ''
                        }`}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Volume Control */}
            <div className="mt-6 pt-6 border-t border-pink-soft/30">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-pink-dark" />
                <div className="flex-1 h-2 bg-pink-pale rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-pink-dark to-pink-hot rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bubu & Mimi Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}images/bubu-mimi-music.png`}
            alt="Bubu & Mimi Music"
            className="w-40 h-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Add Song Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-pink-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl text-pink-dark">
                Tambah Lagu
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-pink-dark hover:text-pink-hot transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Judul Lagu
                </label>
                <input
                  type="text"
                  value={newSong.title}
                  onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                  placeholder="Nama lagu..."
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Artis
                </label>
                <input
                  type="text"
                  value={newSong.artist}
                  onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                  placeholder="Nama artis..."
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Durasi
                </label>
                <input
                  type="text"
                  value={newSong.duration}
                  onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
                  placeholder="Contoh: 3:45"
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddSong}
                className="w-full py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display rounded-xl shadow-pink-lg hover:shadow-glow-pink transition-all duration-300"
              >
                Tambah ke Playlist 🎵
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <audio ref={audioRef} />
    </section>
  );
};

export default PlaylistSection;
