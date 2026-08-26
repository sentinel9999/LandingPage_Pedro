  'use client';

  import { motion } from 'framer-motion';
  import Image from 'next/image';

  interface TimelineItem {
    year: string;
    tag: string;
    title: string;
    description: string;
    image: string;
    views?: string;
    likes?: string;
  }

  const timelineData: TimelineItem[] = [
    { 
      year: '2026', 
      tag: 'Youtuber', 
      title: 'Trailer de Arcane Fist', 
      description: 'Video promocional hecho con Blender, After Effects y Premiere Pro.', 
      image: '/img/Arcane.png',
      views: '1.5K',
      likes: '148',
    },
    { 
      year: '2026', 
      tag: 'Fotografía', 
      title: 'Concurso de fotografia', 
      description: 'Fotgrafía ganadora en corcurso de fotografos a nivel estado.', 
      image: '/img/foto.png',
      views: '15k',
      likes: '20k',
    },
    { 
      year: '2025', 
      tag: 'Animación', 
      title: 'Diseño de personaje animado ', 
      description: 'Creación de personajes para animación 2D para empresa de tecnología.', 
      image: '/img/Logo.png',
      views: '2.3K',
      likes: '210',
    },
  ];

  export default function Timeline() {
    return (
      <section id="trayectoria" className="py-28 px-6 max-w-5xl mx-auto relative bg-neutral-950 text-white">
        
        {/* Encabezado */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-400 px-4 py-1.5 rounded-full bg-purple-900/20 border border-purple-800 mb-4">
            03 / Experiencia
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            Logros más <span className="text-purple-400">Relevantes</span>
          </h2>
        </div>

        <div className="relative md:ml-28">
          {/* Línea vertical de la línea de tiempo */}
          <div className="absolute left-0 md:left-[-40px] top-0 w-px h-full bg-neutral-800" />

          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 md:pl-0 group"
              >
                {/* Punto indicador de la línea de tiempo */}
                <div className="absolute left-[-5px] md:left-[-45px] top-6 w-3 h-3 rounded-full bg-neutral-950 border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                
                {/* Año */}
                <div className="md:absolute md:-left-[150px] md:top-5 text-purple-400 font-black text-[12px] uppercase tracking-[0.2em] mb-3 md:mb-0">
                  {item.year}
                </div>

                {/* Tarjeta con métricas a la derecha */}
                <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col lg:flex-row gap-5 lg:gap-6 items-start lg:items-center justify-between shadow-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  
                  {/* Lado Izquierdo: Imagen + Textos */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 flex-1">
                    <div className="w-full sm:w-32 h-24 rounded-xl relative overflow-hidden bg-neutral-950 flex-none border border-neutral-800">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        sizes="(max-width: 640px) 100vw, 128px"
                        className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      />
                    </div>

                    <div className="flex-1">
                      <span className="inline-block text-[9px] font-black uppercase tracking-widest text-neutral-400 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800 mb-2">
                        {item.tag}
                      </span>
                      <h3 className="text-lg font-black uppercase text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Lado Derecho: Métricas (Vistas y Likes) */}
                  {(item.views || item.likes) && (
                    <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0 pt-2 lg:pt-0 border-t border-white/5 lg:border-t-0 w-full lg:w-auto justify-end">
                      
                      {/* Contador de Vistas */}
                      {item.views && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-inner">
                          <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-[11px] font-black tracking-wide text-neutral-200">
                            {item.views}
                          </span>
                        </div>
                      )}

                      {/* Contador de Likes */}
                      {item.likes && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md shadow-inner">
                          <svg className="w-3.5 h-3.5 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="text-[11px] font-black tracking-wide text-neutral-200">
                            {item.likes}
                          </span>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }