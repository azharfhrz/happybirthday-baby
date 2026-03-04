import { useState, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { ImagePlus, Heart, X, Camera, Sparkles } from 'lucide-react';

interface GalleryImage {
  id: number;
  src?: string;
  caption: string;
}

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    { id: 1, src: '/images/galeri1.jpg', caption: 'ini lucu bgt hehe jujur salting pas kamu bikin sg ini',  },
    { id: 2, src: '/images/galeri2.jpg', caption: 'lucu banget ini duyungnya ak xixi' },
    { id: 3, src: '/images/galeri3.jpg', caption: 'INI KYK MOMMY, YESSS MY MOMMYY ' },
    { id: 4, src: '/images/galeri4.jpg', caption: 'inii lucuu bgt kamu gemes banget kayak bocil sayang, ak berasa jadi kakak kakak' },
    { id: 5, src: '/images/galeri5.jpg', caption: 'ini juga lucu bangett heheeh akuu sukaaa, foto2 kamu yg ini aku jadiin walpaper aku sayang' },
    { id: 6, src: '/images/galeri6.jpg', caption: 'INI WUCHU KYK BIKIN SALTING GT GEMES JSDBSJHDSH' },
    { id: 7, src: '/images/galeri7.jpg', caption: 'INI LUCU BGT PLS VIBES NYA KAYAK HARRY POTTER AYANG' },
    { id: 7, src: '/images/galeri8.jpg', caption: 'ini mah kayak lagi simulasi di pelaminan nanti sm ak xixixix ble apkh km redi' },
    { id: 7, src: '/images/galeri9.jpg', caption: 'bocilnyaa aku hehehe, selalu jadi bocilnya aku ya sayang? kamu boleh jadi anak kecil terus sama aku sampe kapanpun itu sayang' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

const handleAddImage = () => {
  if (newCaption && selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);

    setImages([
      ...images,
      {
        id: Date.now(),
        src: imageUrl,
        caption: newCaption,
      },
    ]);

    setNewCaption('');
    setSelectedFile(null);
    setShowAddModal(false);
  }
};

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
      },
    },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);
  }
};

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-b from-pink-pale/50 to-transparent"
    >
      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
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

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <Camera className="w-5 h-5 text-pink-dark" />
            <span className="font-body text-pink-dark font-medium">Gallery</span>
            <Camera className="w-5 h-5 text-pink-dark" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl text-gradient-pink mb-4">
            FOTO ZARA FAVORIT IJEY
          </h2>
          <p className="font-body text-lg text-pink-dark/70 max-w-xl mx-auto">
            Sebenernya semua foto kamu itu fav aku c, gaada yang jelek WOE KAMU GAPERNAH JELEK HERAN BANED AK KOK AD MNUSIA SECANTIK INI. tp dicini aku bakal taro lagi foto-foto kamu yang aku suka hehe 📸💕
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`relative group ${
                index % 3 === 1 ? 'md:mt-8' : ''
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-pink-lg hover:shadow-pink-xl transition-all duration-300">
                {/* Image Placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-pale via-pink-light to-pink-soft flex items-center justify-center relative overflow-hidden">
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart className="w-12 h-12 text-pink-dark/30 mx-auto mb-3" />
                      </motion.div>
                      <p className="font-body text-sm text-pink-dark/60">
                        Foto Zara
                      </p>
                      <p className="font-body text-xs text-pink-dark/40 mt-1">
                        #{index + 1}
                      </p>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-pink-dark/80 via-pink-dark/40 to-transparent flex items-end justify-center p-4"
                  >
                    <p className="font-body text-white text-sm text-center">
                      {image.caption}
                    </p>
                  </motion.div>

                  {/* Decorative Corner */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-pink-dark fill-pink-dark" />
                  </div>
                </div>

                {/* Caption below image */}
                <div className="p-3 bg-white">
                  <p className="font-body text-sm text-pink-dark text-center break-words leading-relaxed">
                    {image.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Image Card */}
          <motion.div
            variants={itemVariants}
            className={`relative group ${images.length % 3 === 1 ? 'md:mt-8' : ''}`}
            whileHover={{ scale: 1.02 }}
          >
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full aspect-[3/4] bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-pink-dark/30 flex flex-col items-center justify-center gap-4 hover:border-pink-dark hover:bg-pink-pale/30 transition-all duration-300"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-pink-pale rounded-full flex items-center justify-center"
              >
                <ImagePlus className="w-8 h-8 text-pink-dark" />
              </motion.div>
              <span className="font-body text-pink-dark/70">
                Tambah Foto
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Bubu & Mimi Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12"
        >
          <motion.img
            src="/images/bubu-mimi-flowers.png"
            alt="Bubu & Mimi with Flowers"
            className="w-40 h-40"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Add Image Modal */}
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
                Tambah Foto Baru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-pink-dark hover:text-pink-hot transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image Upload Placeholder */}
              <div className="aspect-video bg-pink-pale rounded-2xl border-2 border-dashed border-pink-soft flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-pink-dark hover:bg-pink-light/30 transition-all">
                <ImagePlus className="w-10 h-10 text-pink-dark/50" />
                <span className="font-body text-sm text-pink-dark/60">
                  Klik untuk upload foto
                </span>
              </div>

              <div>
                <label className="font-body text-sm text-gray-600 mb-1 block">
                  Caption
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tulis caption lucu..."
                  className="w-full px-4 py-3 bg-pink-pale border-2 border-pink-soft rounded-xl font-body text-pink-dark placeholder-pink-soft/70 focus:outline-none focus:border-pink-dark transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddImage}
                className="w-full py-4 bg-gradient-to-r from-pink-dark to-pink-hot text-white font-display rounded-xl shadow-pink-lg hover:shadow-glow-pink transition-all duration-300"
              >
                Tambah ke Gallery 📸
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;
