import { useState, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { Heart, Calendar, Camera, Plus, X } from 'lucide-react';

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
}

const TimelineSection = () => {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      date: 'awal kita kenal',
      title: 'ak kayak jamet yh?',
      description: 'Inget nda? ini awal-awal pas kita kenal, nama kamu bhkn mci Yezara xixixi',
      image: `${import.meta.env.BASE_URL}images/kenangan1.jpg`
    },
    {
      id: 2,
      date: 'RESPON KAMUU HUHU',
      title: 'detik2 stelah ijey confess',
      description: 'kalo kamu masih inget, ini adalah respon kamu pas aku abis confess ke kamu, hehe. lucu, sampe sekarang aku masih suka bacaa inii dan masi salting. ternyata kita waktu ith saling uring-uringan yh',
      image: `${import.meta.env.BASE_URL}images/kenangan2.jpg`
    },
    {
      id: 3,
      date: 'SPOTIFY',
      title: 'BDAY PERTAMA AKU SAMA KAMU',
      description: 'INI JUGA LUCU BANGET HIKS,, kamu niat baned ayang bikinin aku pl waktu itu. mmaci yhh,, ini adalah pl spotify pertama dari kamu buat aku hihihi',
      image: `${import.meta.env.BASE_URL}images/kenangan3.png`
    },
    {
      id: 4,
      date: 'Special Moment',
      title: 'Momen Spesial',
      description: 'ini pas aku nembak kamu hehe, website sederhana pertama aku yg aku bikin buat kamu. dan asal kamu tau, aku cuma bikin kayak gituan buat kamu tau sayangg. se special ith kamu buat aku, dari awal aku suka kamu aku bener2 suka pake hati bgt bhkn skrg ak msi kecintaan sama kamu dan bakal selalu kayak gitu 💖',
      image: `${import.meta.env.BASE_URL}images/kenangan4.jpg`
    },
    {
      id: 5,
      date: 'Special Moment',
      title: 'makasih udah selalu yakinin aku',
      description: 'i love the way u always comfort me sayang, makasih yaa dari dulu kamu selalu yakinin aku dan mau sabar banget sama aku. maaf aku malah suka bikin kamu capek dan bikin kamu jadi gengsian kayak sekarang :( ',
      image: `${import.meta.env.BASE_URL}images/kenangan5.jpg`
    },
    {
      id: 6,
      date: 'Special Moment',
      title: 'makasih udah jadi tempat pulang ternyaman aku',
      description: 'like i said before, i love the way u always comfort me sayang. entah gimana, dari dulu sampe sekarang kamu selalu bikin aku tenang, even kamu cuma diem. tapi dengan adanya kamu itu rasanya bikin semua capek dan ketakutan2 aku itu ilang. aku selalu ngerasa semuanya bakal baik-baik aja selagi ada kamu. makannya aku mau kamu ngerasa disayang juga sama aku, aku mau ngusahain semuanya buat kamu ayang',
      image: `${import.meta.env.BASE_URL}images/kenangan7.jpg`
    },
    {
      id: 8,
      date: 'Special Moment',
      title: 'LUCU HEHE MAAF AKU CEMBURUAN',
      description: 'KAMU JUGA LUCU BANGET KALO LG YAKININ AK PAS LG CEMBURU SADASHDSJHDASJ...makasih yaa sayang, maaf dulu ak suka kesetanan. padahal kamu selalu seterbuka itu dan selalu jelasin ke akuuu. makasii banyak sayang, aku beneran bersyukur dan happy banget punya kamu. ',
      image: `${import.meta.env.BASE_URL}images/kenangan8.jpg`
    },
    {
      id: 9,
      date: 'Special Moment',
      title: 'MOMENT KT DI ML PALING LUCU POKOKNYH',
      description: 'aku masih simpen ss an tiap kita lagi main ml dari dulu sampe sekarang cayang. kamu inget nd bhkan aku pernah keboboan di lobby saking pengennya ak sama kamu terus, cuma dulu aku gengsi c hehe ',
      image: `${import.meta.env.BASE_URL}images/kenangan9.jpg`
    },
    {
      id: 10,
      date: 'Special Moment',
      title: 'MOMENT KT DI ML PALING LUCU POKOKNYH',
      description: 'sekarang mawar kita bahkan udah mau level 11 dan kt jgk uda punya beberapa skin couple hehe, lucu kan cayang? semoga kita bisa langgeng terus sampe nanti tuaa jodoh dunia akhirat aamiin yaallah. maaf yaa aku suka bikin kamu kesel tiap main game, NEXT SEASON IJEY AKAN LEBIH JAGO DAN AKAN BIKIN KAMU IMMO POMICC. kalo kamu udah baca ini pasti kamu bakal keinget lylia lagi, iyh iyh cabal yh pokoknya besok atau lusa uda jemput lylia sayang',
      image: `${import.meta.env.BASE_URL}images/kenangan10.jpg`
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemory, setNewMemory] = useState({ date: '', title: '', description: '' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const handleAddMemory = () => {
    if (newMemory.date && newMemory.title) {
      setMemories([...memories, { ...newMemory, id: Date.now() }]);
      setNewMemory({ date: '', title: '', description: '' });
      setShowAddModal(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-pink-soft/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-pink-dark/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
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
            <Heart className="w-5 h-5 text-pink-dark fill-pink-dark" />
            <span className="font-body text-pink-dark font-medium">Our Journey</span>
            <Heart className="w-5 h-5 text-pink-dark fill-pink-dark" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl text-gradient-pink mb-4">
            Sedikit Timeline Kenangan Kita
          </h2>
          <p className="font-body text-lg text-pink-dark/70 max-w-xl mx-auto">
            Nostalgia karena ini adalah tahun kesekian aku nemenin kamu ultah, kita udah kenal dari tahun 2021 tau!! 💕
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-soft via-pink-dark to-pink-soft rounded-full transform md:-translate-x-1/2" />

          {/* Timeline Items */}
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              variants={itemVariants}
              className={`relative flex items-start mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-6 h-6 bg-white border-4 border-pink-dark rounded-full z-10 transform -translate-x-1/2 mt-2"
                whileHover={{ scale: 1.3 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <motion.div
                  className="w-full h-full bg-pink-dark rounded-full"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Content Card */}
              <div
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-pink-lg hover:shadow-pink-xl transition-all duration-300"
                >
                  {/* Date Badge */}
                  <div
                    className={`inline-flex items-center gap-2 bg-pink-pale px-4 py-2 rounded-full mb-3 ${
                      index % 2 === 0 ? 'md:ml-auto' : ''
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-pink-dark" />
                    <span className="font-body text-sm text-pink-dark font-medium">
                      {memory.date}
                    </span>
                  </div>

                  {/* Image Placeholder */}
                  <div className="relative mb-4 rounded-2xl overflow-hidden group cursor-pointer">
                    {memory.image ? (
  <img
    src={memory.image}
    alt={memory.title}
    className="w-full h-auto object-cover rounded-2xl"
  />
) : (
                      <div className="text-center">
                        <Camera className="w-10 h-10 text-pink-dark/50 mx-auto mb-2" />
                        <p className="font-body text-sm text-pink-dark/60">
                          Tambah foto di sini
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-pink-dark/0 group-hover:bg-pink-dark/10 transition-colors duration-300" />
                  </div>

                  {/* Text Content */}
                  <h3 className="font-display text-xl text-pink-dark mb-2">
                    {memory.title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">
                    {memory.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Memory Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display rounded-full shadow-pink-lg hover:shadow-glow-pink transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Tambah Kenangan
          </motion.button>
        </motion.div>

        {/* Bubu & Mimi Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-12 gap-4"
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}images/bubu-mimi-hug.png`}
            alt="Bubu & Mimi Hugging"
            className="w-32 h-32"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Add Memory Modal */}
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
                Tambah Kenangan Baru
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
                  Tanggal / Momen
                </label>
                <input
                  type="text"
                  value={newMemory.date}
                  onChange={(e) => setNewMemory({ ...newMemory, date: e.target.value })}
                  placeholder="Contoh: 1 Januari 2024"
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Judul
                </label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  placeholder="Judul kenangan..."
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Deskripsi
                </label>
                <textarea
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  placeholder="Ceritakan momennya..."
                  rows={3}
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddMemory}
                className="w-full py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display rounded-xl shadow-pink-lg hover:shadow-glow-pink transition-all duration-300"
              >
                Simpan Kenangan 💕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default TimelineSection;
