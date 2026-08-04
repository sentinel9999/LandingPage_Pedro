'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const galleryData = [
  {
    id: '1',
    title: 'Arcane System',
    category: 'IoT',
    tech: ['Next.js', 'ESP32', 'Python'],
    image: '/img/Arcane.png',
    description: 'Sistema IoT de monitoreo ambiental y telemetría mecánica con base de datos en tiempo real.',
    client: 'INEEL', status: 'Producción'
  },
  {
    id: '2',
    title: 'Automatización Industrial',
    category: 'Industrial',
    tech: ['Modbus', 'SCADA', 'Python'],
    image: '/img/foto.png',
    description: 'Gestión de protocolos de cálculo y actualización multiequipo tras visita de ingeniería especializada.',
    client: 'Privado', status: 'Completado'
  },
  {
    id: '3',
    title: 'Dashboard Next.js 15',
    category: 'Frontend',
    tech: ['TypeScript', 'Tailwind', 'Motion'],
    image: '/img/image4.png',
    description: 'Interfaz de usuario avanzada con diseño modular de alto rendimiento y control por inercia.',
    client: 'Startup', status: 'Activo'
  },
  {
    id: '4',
    title: 'Firmware Core',
    category: 'Electrónica',
    tech: ['C++', 'MicroPython', 'SPI'],
    image: '/img/Logo.png',
    description: 'Desarrollo de scripts de comunicación serial de alta velocidad para hardware embebido.',
    client: 'Open Source', status: 'Desarrollo'
  }
];

const categories = ['Todos', 'IoT', 'Industrial', 'Frontend', 'Electrónica'];

export default function ParallaxGallery() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === 'Todos' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  // Funciones de navegación del carrusel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -800, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 800, behavior: 'smooth' });
    }
  };

  return (
    <section id="galeria" className="py-32 relative bg-neutral-950 text-white min-h-screen overflow-hidden">
      
      {/* Contenedor del Encabezado */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
          >
            01 / Escenas & Proyectos
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight"
          >
            Galería de <span className="text-purple-400">Ingeniería</span>
          </motion.h2>
        </div>

        {/* Controles de Navegación del Carrusel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-white/10 bg-neutral-900/50 hover:bg-white/10 flex items-center justify-center backdrop-blur-md transition-colors group">
            <span className="text-white group-hover:-translate-x-1 transition-transform">←</span>
          </button>
          <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-white/10 bg-neutral-900/50 hover:bg-white/10 flex items-center justify-center backdrop-blur-md transition-colors group">
            <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
                  : 'bg-neutral-900/80 text-neutral-400 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Carrusel Scroll Horizontal Nativo y Fluido (Estilo Apple) */}
      <motion.div 
        layout 
        ref={carouselRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-[calc((100vw-80rem)/2)] pb-16 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
      >
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, x: 50 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", delay: index * 0.1 }}
              key={item.id}
              onClick={() => setSelectedImage(item)}
              // Tarjeta de gran formato
              className="snap-center shrink-0 w-[85vw] max-w-[900px] h-[450px] md:h-[480px] flex flex-col md:flex-row rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 bg-neutral-900 shadow-2xl hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-700 relative"
            >
              {/* Mitad Imagen */}
              <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-neutral-950 overflow-hidden shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900/90 via-neutral-900/40 to-transparent pointer-events-none" />
              </div>

              {/* Mitad Texto */}
              <div className="relative w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-10 flex flex-col justify-center bg-neutral-900/50 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/0 via-transparent to-purple-500/0 group-hover:to-purple-500/10 transition-colors duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-black/60 backdrop-blur-md rounded-full text-purple-300 border border-white/10 mb-5">
                    {item.category}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-neutral-300 bg-white/5 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Pantalla Completa AAA */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={selectedImage.id}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-neutral-900 border border-white/15 rounded-[2rem] overflow-hidden shadow-[0_0_150px_rgba(168,85,247,0.2)] flex flex-col md:flex-row"
            >
              <div className="w-full md:w-3/5 h-1/2 md:h-full relative bg-neutral-950">
                <Image 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900/80 to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 sm:p-12 flex flex-col justify-between overflow-y-auto bg-neutral-900">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-purple-400">{selectedImage.category}</span>
                    <button onClick={() => setSelectedImage(null)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg">✕</button>
                  </div>
                  
                  <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-none">{selectedImage.title}</h3>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 font-light">{selectedImage.description}</p>
                  
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-white mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-purple-300 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex justify-between pt-6 border-t border-white/10 text-sm">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Estado</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white">{selectedImage.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Cliente</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white">{selectedImage.client}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}