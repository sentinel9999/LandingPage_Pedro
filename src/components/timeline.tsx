'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const timelineData = [
  { year: '2026', tag: 'Sistemas IoT', title: 'Telemetría y Control', description: 'Despliegue activo de infraestructura IoT.', image: '/img/Arcane.png' },
  { year: '2026', tag: 'Consultoría', title: 'Deliverables Técnicos', description: 'Gestión de cronogramas y actualizaciones.', image: '/img/foto.png' },
  { year: '2025', tag: 'Ingeniería', title: 'Control y Automatización', description: 'Desarrollo de firmware para microcontroladores.', image: '/img/Logo.png' },
];

export default function Timeline() {
  return (
    <section id="trayectoria" className="py-24 px-6 max-w-4xl mx-auto relative bg-neutral-950 text-white">
      
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Línea de <span className="text-purple-400">Tiempo</span></h2>
      </div>

      <div className="relative md:ml-28">
        <div className="absolute left-0 md:left-[-40px] top-0 w-px h-full bg-neutral-800" />

        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative pl-6 md:pl-0 group">
              <div className="absolute left-[-5px] md:left-[-45px] top-4 w-3 h-3 rounded-full bg-neutral-950 border-2 border-purple-500" />
              
              <div className="md:absolute md:-left-[150px] md:top-3 text-purple-400 font-black text-[12px] uppercase tracking-[0.2em] mb-4 md:mb-0">
                {item.year}
              </div>

              {/* Borde nativo seguro (neutral-800) */}
              <div className="relative p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row gap-6 items-center flex-none">
                <div className="w-full sm:w-32 h-24 rounded-xl relative overflow-hidden bg-neutral-950 flex-none border border-neutral-800">
                  <Image src={item.image} alt={item.title} fill className="object-cover opacity-80" />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800 mb-3 flex-none">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-black uppercase text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-400 text-sm font-light">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}