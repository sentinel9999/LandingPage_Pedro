'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de cascada fluida para los textos (Reveal)
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], { opacity: 0, y: 30 });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.3 })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.9")
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
  }, []);

  return (
    // NOTA: Se agregó pt-32 (padding-top) para evitar el choque con el Navbar
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-[#030303] px-6 pt-32 pb-20">
      
      {/* DINAMISMO Y SOMBRAS: Luces volumétricas animadas en el fondo */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-600/15 rounded-full blur-[100px] md:blur-[150px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[120px] translate-y-20"
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* Badge */}
        <div ref={badgeRef} className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 px-5 py-2 bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
            <span className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-neutral-300">
              Desarrollo & Ingeniería AAA
            </span>
          </div>
        </div>

        {/* Título Principal */}
        <div className="relative mb-6 md:mb-10 w-full">
          <h1 ref={titleRef} className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl m-0">
            Pedro <br />
            <span className="bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              Lopez
            </span>
          </h1>
        </div>

        {/* Subtítulo */}
        <div ref={subtitleRef} className="max-w-xl md:max-w-2xl mb-12 flex flex-col gap-3">
          <p className="text-sm md:text-lg font-light text-neutral-400 leading-relaxed m-0">
            Un ecosistema interactivo impulsado por física de alta gama.
          </p>
          <p className="hidden md:block text-base font-light text-neutral-500 leading-relaxed m-0">
            Creamos interfaces cinemáticas, arquitecturas robustas y experiencias digitales que redefinen el estándar de la industria.
          </p>
        </div>

        {/* Botones de Acción */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <a href="#galeria" className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <span className="relative z-10">Explorar Escenas</span>
            {/* Flecha corregida a morado */}
            <span className="relative z-10 text-purple-600 text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
          
          <a href="#contacto" className="flex items-center justify-center px-8 py-4 bg-transparent text-white border border-white/20 text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 hover:border-white/40 transition-colors">
            Contactar Sistema
          </a>
        </div>

      </div>
    </section>
  );
}