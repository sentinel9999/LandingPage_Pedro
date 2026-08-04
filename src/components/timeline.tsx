'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const timelineData = [
  {
    year: '2026', tag: 'Sistemas IoT & Full-Stack',
    title: 'MUSS & Sismedia RT Systems',
    description: 'Despliegue activo de infraestructura IoT para el registro y monitoreo de sensores ambientales y mecánicos.',
    image: '/img/Arcane.png'
  },
  {
    year: '2026', tag: 'Consultoría & Automatización',
    title: 'Deliverables Técnicos INEEL',
    description: 'Gestión de cronogramas de proyectos, protocolos de cálculo y ejecución de actualizaciones multiequipo.',
    image: '/img/foto.png'
  },
  {
    year: '2025', tag: 'Ingeniería Mecatrónica',
    title: 'Control y Automatización',
    description: 'Especialización en desarrollo de firmware para microcontroladores y protocolos industriales.',
    image: '/img/Logo.png'
  },
];

export default function Timeline() {
  return (
    <section id="trayectoria" className="py-24 px-6 max-w-4xl mx-auto relative bg-neutral-950 text-white">
      
      <div className="text-center max-w-xl mx-auto mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-block text-[9px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4"
        >
          03 / Trayectoria & Hitos
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-black uppercase tracking-tight"
        >
          Línea de <span className="text-purple-400">Tiempo</span>
        </motion.h2>
      </div>

      <div className="relative ml-4 md:ml-28">
        <motion.div 
          initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-purple-500 via-white/20 to-transparent"
        />

        <div className="space-y-12 pt-4">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
              className="relative pl-8 md:pl-12 group"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-neutral-950 border-2 border-purple-500 group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(168,85,247,1)] transition-all duration-300" />

              <div className="md:absolute md:-left-28 md:top-1.5 text-purple-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2 md:mb-0">
                {item.year}
              </div>

              <div className="relative p-5 rounded-2xl bg-neutral-900 border border-white/15 backdrop-blur-xl group-hover:border-purple-400/80 transition-all duration-500 overflow-hidden shadow-lg flex flex-col sm:flex-row gap-4 items-center">
                {/* Contenedor con dimensiones exactas para la miniatura */}
                <div className="w-full sm:w-28 h-20 rounded-xl relative overflow-hidden bg-neutral-950 shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    sizes="112px"
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="flex-1">
                  <span className="inline-block text-[7px] font-black uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5 mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-wide text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}