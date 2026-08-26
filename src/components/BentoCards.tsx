'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

const skills = [
  { name: 'Animation', level: 95, cat: 'Design', icon: '⚛', image: '/img/image4.png' },
  { name: 'Cartoon', level: 80, cat: 'Design', icon: 'TS', image: '/img/Logo.png' },
  { name: 'Static image', level: 85, cat: 'Social media', icon: '✨', image: '/img/Arcane.png' },
  { name: 'Photos', level: 70, cat: 'Photos', icon: '⚡', image: '/img/foto.png' },
];

export default function BentoCards() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLElement) => {
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    gsap.to(target.querySelector('.card-3d-target'), { 
      rotationY: x, 
      rotationX: -y, 
      ease: "power2.out", 
      duration: 0.5 
    });
  };
  
  const handleMouseLeave = (target: HTMLElement) => {
    gsap.to(target.querySelector('.card-3d-target'), { 
      rotationY: 0, 
      rotationX: 0, 
      ease: "power3.out", 
      duration: 1 
    });
  };

  return (
    <section id="capacidades" className="py-32 px-6 max-w-7xl mx-auto relative bg-[#030303] text-white">
      
      {/* Encabezado */}
      <div className="text-center max-w-xl mx-auto mb-20">
        <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-4 py-1.5 rounded-full bg-purple-900/20 border border-purple-800 mb-4">
          02 / Skills & Mastery
        </span>
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
          Habilidades & <span className="text-purple-400">Técnicas</span>
        </h2>
      </div>

      {/* Grid con mayor separación (gap-10 en móvil, gap-12 en desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)} 
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="relative h-[320px] sm:h-[350px] w-full [perspective:1000px] cursor-pointer group flex-none"
          >
            {/* Contenedor 3D */}
            <div className="card-3d-target w-full h-full relative [transform-style:preserve-3d] will-change-transform">
              
              {/* Contenedor de recorte */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl [transform:translateZ(0)] transition-colors duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
                
                {/* Imagen nítida con zoom */}
                <Image 
                  src={skill.image} 
                  alt={skill.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" 
                />
                
                {/* Sombra suave solo en la base para proteger el texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                
                {/* Contenido */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 pointer-events-none">
                  
                  {/* Fila Superior */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-black/80 border border-white/20 backdrop-blur-md flex items-center justify-center text-lg shadow-lg group-hover:border-purple-500/60 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white px-4 py-1.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-md flex-none shadow-md">
                      {skill.cat}
                    </span>
                  </div>
                  
                  {/* Fila Inferior: Título y Progreso */}
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h3>
                    
                    <div className="w-full h-2 bg-black/60 border border-white/10 rounded-full overflow-hidden relative backdrop-blur-md">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_14px_rgba(168,85,247,0.9)]" 
                      />
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <span className="text-[11px] font-black tracking-widest text-neutral-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {skill.level}%
                      </span>
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