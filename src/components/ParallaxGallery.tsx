'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const galleryData = [
  { id: '1', title: 'Arcane System', category: 'IoT', tech: ['Next.js', 'ESP32', 'Python'], image: '/img/Arcane.png', description: 'Sistema IoT de monitoreo ambiental y telemetría mecánica con base de datos en tiempo real.', client: 'INEEL', status: 'Producción' },
  { id: '2', title: 'Automatización Industrial', category: 'Industrial', tech: ['Modbus', 'SCADA', 'Python'], image: '/img/foto.png', description: 'Gestión de protocolos de cálculo y actualización multiequipo tras visita de ingeniería especializada.', client: 'Privado', status: 'Completado' },
  { id: '3', title: 'Dashboard Next.js 15', category: 'Frontend', tech: ['TypeScript', 'Tailwind', 'Motion'], image: '/img/image4.png', description: 'Interfaz de usuario avanzada con diseño modular de alto rendimiento y control por inercia.', client: 'Startup', status: 'Activo' },
  { id: '4', title: 'Firmware Core', category: 'Electrónica', tech: ['C++', 'MicroPython', 'SPI'], image: '/img/Logo.png', description: 'Desarrollo de scripts de comunicación serial de alta velocidad para hardware embebido.', client: 'Open Source', status: 'Desarrollo' }
];

const categories = ['Todos', 'IoT', 'Industrial', 'Frontend', 'Electrónica'];

export default function ParallaxGallery() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const carouselRef = useRef<HTMLDivElement>(null);
  const filteredItems = activeCategory === 'Todos' ? galleryData : galleryData.filter(item => item.category === activeCategory);

  return (
    <section id="galeria" className="py-24 md:py-32 relative bg-neutral-950 text-white min-h-screen overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-4 py-1.5 rounded-full bg-purple-900 bg-opacity-20 border border-purple-800 mb-6">
            01 / Escenas & Proyectos
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Galería de <span className="text-purple-400">Ingeniería</span>
          </h2>
        </div>
      </div>

      {/* Filtros Protegidos */}
      <div className="max-w-7xl mx-auto px-6 mb-12 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-none px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white border border-purple-500 shadow-lg'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Carrusel Rígido (flex-none y anchos % estrictos) */}
      <div ref={carouselRef} className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-[10vw] pb-16 pt-4 [&::-webkit-scrollbar]:hidden scroll-smooth">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.div
              layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              key={item.id}
              // TARJETA PRINCIPAL: flex-none previene aplastamiento
              className="snap-center flex-none w-[90vw] md:w-[850px] h-[550px] md:h-[450px] flex flex-col md:flex-row rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative"
            >
              {/* IMAGEN: Ancho estricto 100% en móvil, 60% en Desktop */}
              <div className="relative w-full md:w-[60%] h-[50%] md:h-full flex-none overflow-hidden bg-neutral-950">
                <Image src={item.image} alt={item.title} fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-transparent to-transparent" />
              </div>

              {/* TEXTO: Ancho estricto 100% en móvil, 40% en Desktop */}
              <div className="relative w-full md:w-[40%] h-[50%] md:h-full flex-none p-6 md:p-8 flex flex-col justify-center bg-neutral-900">
                <div className="flex-1 flex flex-col justify-center">
                  <span className="self-start px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-black rounded-full text-purple-400 border border-neutral-800 mb-4">
                    {item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tech.slice(0, 3).map(t => (
                      <span key={t} className="flex-none text-[9px] font-bold uppercase tracking-widest text-neutral-300 bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}