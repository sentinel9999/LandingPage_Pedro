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
    gsap.to(target, { rotationY: x, rotationX: -y, transformPerspective: 1000, ease: "power2.out", duration: 0.5 });
  };
  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target, { rotationY: 0, rotationX: 0, ease: "power3.out", duration: 1 });
  };

  return (
    <section id="capacidades" className="py-24 px-6 max-w-5xl mx-auto relative bg-neutral-950 text-white">
      
      <div className="text-center max-w-xl mx-auto mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-block text-[9px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
        >
          02 / Capacidades Técnicas
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
        >
          Arquitectura & <span className="text-purple-400">Control</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1, type: "spring" }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)} onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="relative h-[200px] rounded-2xl overflow-hidden group border border-white/15 bg-neutral-900 will-change-transform shadow-lg cursor-pointer"
          >
            {/* Contenedor con altura y posición explícita para evitar altura 0 */}
            <div className="absolute inset-0 w-full h-full bg-neutral-950">
              <Image 
                src={skill.image} 
                alt={skill.name} 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" 
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent opacity-90 z-10 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none group-hover:ring-purple-400/80 transition-colors duration-500 z-30" />
            
            <div className="absolute inset-0 p-5 flex flex-col justify-between z-20">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-neutral-950/80 border border-white/15 flex items-center justify-center text-sm font-black text-purple-400 shadow-inner group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="text-[7px] font-bold uppercase tracking-widest text-neutral-400 px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md">
                  {skill.cat}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2.5 group-hover:text-purple-300 transition-colors">{skill.name}</h3>
                
                <div className="w-full h-1 bg-neutral-950/80 rounded-full overflow-hidden relative border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-300 rounded-full"
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[8px] font-black uppercase tracking-wider text-neutral-400">{skill.level}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}