'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { id: '#galeria', label: 'Galería' },
  { id: '#capacidades', label: 'Capacidades' },
  { id: '#trayectoria', label: 'Trayectoria' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para mejorar el contraste del Glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-0 w-full z-[100] flex justify-center px-4 md:px-8 pointer-events-none"
    >
      {/* BARRA PRINCIPAL (PIÍLDORA) */}
      <nav 
        className={`pointer-events-auto relative flex items-center justify-between w-full max-w-4xl px-6 py-3 md:py-3.5 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'bg-neutral-900/40 backdrop-blur-md border border-white/5 shadow-2xl'
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="relative z-20 text-white text-xs md:text-sm font-black uppercase tracking-[0.3em]">
          Portafolio<span className="text-purple-500">.</span>
        </Link>

        {/* ENLACES - ESCRITORIO */}
        <div className="hidden md:flex items-center gap-8 relative z-20">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.id} 
              href={link.id} 
              className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* BOTÓN CONTACTO - ESCRITORIO */}
        <div className="hidden md:block relative z-20">
          <a 
            href="#contacto" 
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
          >
            Contacto
          </a>
        </div>

        {/* BOTÓN HAMBURGUESA - MÓVIL */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-20 flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none"
        >
          <span className={`block w-6 h-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-full transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-full transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE - MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[110%] left-4 right-4 bg-neutral-900/95 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl md:hidden pointer-events-auto flex flex-col gap-4 shadow-2xl origin-top"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={link.id} 
                onClick={() => setIsOpen(false)} 
                className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/5 pb-4 transition-colors hover:text-purple-400"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contacto" 
              onClick={() => setIsOpen(false)} 
              className="text-center w-full mt-2 py-3 bg-purple-600 hover:bg-purple-500 transition-colors text-white text-xs font-bold uppercase tracking-widest rounded-xl"
            >
              Contactar Sistema
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}