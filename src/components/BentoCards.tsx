'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

const skills = [
  { name: 'React & Next.js 15', level: 95, cat: 'Frontend', icon: '⚛', image: '/img/image4.png' },
  { name: 'TypeScript', level: 90, cat: 'Core', icon: 'TS', image: '/img/Logo.png' },
  { name: 'Motion & GSAP', level: 85, cat: 'UI/UX', icon: '✨', image: '/img/Arcane.png' },
  { name: 'C++ & MicroPython', level: 80, cat: 'Firmware', icon: '⚡', image: '/img/foto.png' },
];

export default function BentoCards() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLElement) => {
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    gsap.to(target.querySelector('.card-3d-target'), { 
      rotationY: x, rotationX: -y, ease: "power2.out", duration: 0.5 
    });
  };
  
  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target.querySelector('.card-3d-target'), { 
      rotationY: 0, rotationX: 0, ease: "power3.out", duration: 1 
    });
  };

  return (
    <section id="capacidades" className="py-24 px-6 max-w-5xl mx-auto relative bg-neutral-950 text-white">
      
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="inline-block text-[9px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-4 py-1.5 rounded-full bg-purple-900 bg-opacity-20 border border-purple-800 mb-4">
          02 / Capacidades Técnicas
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          Arquitectura & <span className="text-purple-400">Control</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)} 
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            // 1. EL PADRE: Altura estricta y perspectiva fija. No tiene overflow hidden.
            className="relative h-[280px] w-full [perspective:1000px] cursor-pointer group flex-none"
          >
            {/* 2. EL HIJO ANIMADO: Rota pero NO recorta. */}
            <div className="card-3d-target w-full h-full relative [transform-style:preserve-3d] will-change-transform">
              
              {/* 3. EL CONTENEDOR DE RECORTE SEGURO: Aísla la imagen para que nunca se desborde */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl [transform:translateZ(0)]">
                <Image 
                  src={skill.image} alt={skill.name} fill sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-transform duration-700" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent pointer-events-none" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-lg shadow-inner">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300 px-3 py-1 rounded-full border border-neutral-800 bg-black bg-opacity-60 flex-none">
                      {skill.cat}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wide text-white mb-3">{skill.name}</h3>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden relative">
                      <div style={{ width: `${skill.level}%` }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000" />
                    </div>
                    <div className="flex justify-end mt-2">
                      <span className="text-[10px] font-black text-neutral-400">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}