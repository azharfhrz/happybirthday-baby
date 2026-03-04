import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Link, Image, MessageCircle, Send, X, Sparkles, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftItem {
  id: number;
  type: 'link' | 'image' | 'message';
  content: string;
  title?: string;
}

const MessageGiftSection = () => {
  const [gifts, setGifts] = useState<GiftItem[]>([
    {
      id: 1,
      type: 'message',
      title: 'semoga kamu suka',
      content: 'sayangku, sebenernya mungkin playlist dan timeline nostalgia ga terlalu penting ya? tapi aku cuma mau bikin aja karena ini juga tahun kedua aku nemenin kamu ultah dan uda hampir 5 tahun kita kenal sayang, mau sedikit nostalgia cjh hehe. ',
    },
    {
      id: 2,
      type: 'message',
      title: 'Ucapan Spesial',
      content: 'sayang, be happy selalu yaa dimanapun dan kapanpun itu, aku bakal selalu ada di belakang kamu buat nemenin kamu. mungkin dengan seiring bertambahnya usia kamu ada banyak hal juga yang kamu takutin, tapi selagi ada aku jangan hadepin itu sendirian ya cantik? aku temenin kamu selalu. makasih yaa kamu udah jadi anak hebat, anak kuat, anak keren dan anak baikk selama ini sayangg, semoga kedepannya juga bakal selalu ada lebih banyak hal baik yang datang di kehidupan kamu. semoga di hari ultah tahun berikutnya juga kt cdah lamaran yh, tolong di doakan rezeki aku yaa cantikkk',
    },
    {
      id: 3,
      type: 'link',
      title: 'Hadiah buat kamu',
      content: 'https://padlet.com/azharfhrez/breakout-room/kQlGq5JozQaxvYW5-aW0BzolQaZOqXwl6',
    },
    {
      id: 4,
      type: 'message',
      title: 'Hadiah buat kamu',
      content: 'DAN SESUATU YANG LAINNYA YG MAU AKU KASIH KE KAMU ADA BESOK, SOO JUST WAIT YAAA BABYYY. dan semoga kamu suka dan happy',
    },
    {
      id: 5,
      type: 'message',
      title: 'Hadiah buat kamu',
      content: 'AND THE LAST ONE PASTINYA AK INGETT GIFT BUAT KAMU DI ULTAH KAMU ADALAH JENG JENG JENG,,, YAPP PACALKUU MAU IPADDDD. aku inget sayangg, nanti ipadnya nyusul yaa sayangg. tolong kamu kasih tau aku aja jadinya detail nya kamu mau yang series apaa, warna apaa, dan kapasitas storagenya berapa ',
    },
    
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGiftType, setNewGiftType] = useState<'link' | 'image' | 'message'>('message');
  const [newGift, setNewGift] = useState({ title: '', content: '' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleAddGift = () => {
    if (newGift.content) {
      setGifts([...gifts, { ...newGift, type: newGiftType, id: Date.now() }]);
      setNewGift({ title: '', content: '' });
      setShowAddModal(false);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb8d0', '#ff70a5', '#ff1493', '#ffd0e0'],
      });
    }
  };

  const triggerHeartExplosion = () => {
    // Create heart explosion effect
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        heart.style.transform = `translate(-50%, -50%)`;
        document.body.appendChild(heart);

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 200 + Math.random() * 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        let x = 0;
        let y = 0;
        let opacity = 1;

        const animate = () => {
          x += vx * 0.02;
          y += vy * 0.02 + 5;
          opacity -= 0.02;

          heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
          heart.style.opacity = String(opacity);

          if (opacity > 0) {
            requestAnimationFrame(animate);
          } else {
            heart.remove();
          }
        };

        requestAnimationFrame(animate);
      }, i * 50);
    }
  };

  const getGiftIcon = (type: string) => {
    switch (type) {
      case 'link':
        return <Link className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-b from-pink-pale/30 to-pink-light/30"
    >
      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
            }}
          >
            <Sparkles className="w-4 h-4 text-pink-soft" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
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
            <Gift className="w-5 h-5 text-pink-dark" />
            <span className="font-body text-pink-dark font-medium">Special Gifts</span>
            <Gift className="w-5 h-5 text-pink-dark" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl text-gradient-pink mb-4">
            Pesan & Hadiah Spesial
          </h2>
          <p className="font-body text-lg text-pink-dark/70 max-w-xl mx-auto">
            Untukmu yang paling spesial dalam hidupku. Semoga suka ya! 🎁💕
          </p>
        </motion.div>

        {/* Gift Box Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={triggerHeartExplosion}
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}images/gift-box.png`}
              alt="Gift Box"
              className="w-48 h-48 md:w-64 md:h-64"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-pink-dark/20 rounded-full blur-3xl -z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="font-body text-sm text-pink-dark/60 mt-2 text-center">
              Klik untuk kejutan! 🎀
            </p>
          </motion.button>
        </motion.div>

        {/* Gifts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-pink-lg hover:shadow-pink-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-pale rounded-2xl flex items-center justify-center text-pink-dark shrink-0">
                  {getGiftIcon(gift.type)}
                </div>
                <div className="flex-1 min-w-0">
                  {gift.title && (
                    <h3 className="font-display text-lg text-pink-dark mb-2">
                      {gift.title}
                    </h3>
                  )}
                  
                  {gift.type === 'message' && (
                    <p className="font-body text-gray-600 leading-relaxed">
                      {gift.content}
                    </p>
                  )}
                  
{gift.type === 'link' && (
  <a
    href={gift.content}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-pink-dark hover:text-pink-hot font-body transition-colors w-full overflow-hidden"
  >
    <Link className="w-4 h-4 shrink-0" />
<span className="truncate block w-full">
  Buka Hadiah 🎁
</span>
  </a>
)}
                  
                  {gift.type === 'image' && (
                    <div className="aspect-video bg-pink-pale rounded-xl flex items-center justify-center">
                      <Image className="w-8 h-8 text-pink-dark/50" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Gift Card */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowAddModal(true)}
            className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 border-2 border-dashed border-pink-dark/30 hover:border-pink-dark hover:bg-pink-pale/30 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[150px]"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 bg-pink-pale rounded-2xl flex items-center justify-center"
            >
              <Plus className="w-7 h-7 text-pink-dark" />
            </motion.div>
            <span className="font-body text-pink-dark/70">
              Tambah Pesan atau Hadiah
            </span>
          </motion.button>
        </motion.div>

        {/* Love Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.div
            className="inline-block bg-gradient-to-r from-pink-dark to-pink-hot text-white px-8 py-4 rounded-3xl shadow-pink-xl"
            whileHover={{ scale: 1.05 }}
          >
            <p className="font-display text-xl md:text-2xl flex items-center gap-2">
              <Heart className="w-6 h-6 fill-white animate-pulse" />
              Aku Sayang Kamu, Zara!
              <Heart className="w-6 h-6 fill-white animate-pulse" />
            </p>
          </motion.div>
        </motion.div>

        {/* Bubu & Mimi Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}images/bubu-mimi-heart.png`}
            alt="Bubu & Mimi"
            className="w-40 h-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Add Gift Modal */}
      <AnimatePresence>
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
                  Tambah Kejutan
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-pink-dark hover:text-pink-hot transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Type Selection */}
              <div className="flex gap-2 mb-6">
                {(['message', 'link', 'image'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setNewGiftType(type)}
                    className={`flex-1 py-3 px-4 rounded-xl font-body text-sm capitalize transition-all ${
                      newGiftType === type
                        ? 'bg-gradient-to-r from-pink-dark to-pink-hot text-white shadow-pink'
                        : 'bg-pink-pale text-pink-dark hover:bg-pink-soft'
                    }`}
                  >
                    {type === 'message' && '💌 Pesan'}
                    {type === 'link' && '🔗 Link'}
                    {type === 'image' && '📸 Foto'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-sm text-gray-600 mb-1 block">
                    Judul (Opsional)
                  </label>
                  <input
                    type="text"
                    value={newGift.title}
                    onChange={(e) => setNewGift({ ...newGift, title: e.target.value })}
                    placeholder="Berikan judul..."
                    className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-gray-600 mb-1 block">
                    {newGiftType === 'message' && 'Pesanmu'}
                    {newGiftType === 'link' && 'URL Link'}
                    {newGiftType === 'image' && 'Upload Foto'}
                  </label>
                  
                  {newGiftType === 'message' && (
                    <textarea
                      value={newGift.content}
                      onChange={(e) => setNewGift({ ...newGift, content: e.target.value })}
                      placeholder="Tulis pesan manis untuk Zara..."
                      rows={4}
                      className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors resize-none"
                    />
                  )}
                  
                  {newGiftType === 'link' && (
                    <input
                      type="url"
                      value={newGift.content}
                      onChange={(e) => setNewGift({ ...newGift, content: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                    />
                  )}
                  
                  {newGiftType === 'image' && (
                    <div className="aspect-video bg-pink-pale rounded-xl border-2 border-dashed border-pink-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-pink-dark hover:bg-pink-light/30 transition-all">
                      <Image className="w-10 h-10 text-pink-dark/50" />
                      <span className="font-body text-sm text-pink-dark/60">
                        Klik untuk upload foto
                      </span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddGift}
                  className="w-full py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display rounded-xl shadow-pink-lg hover:shadow-glow-pink transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Kirim Kejutan 🎁
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageGiftSection;
