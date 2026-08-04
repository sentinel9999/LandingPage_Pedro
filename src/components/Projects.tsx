'use client';

import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '@/data/projects';

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.4em] text-neutral-400 block mb-3">
          Portafolio Seleccionado
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
          ANIMACIONES & <span className="text-gradient">PROYECTOS</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="glass-card rounded-2xl overflow-hidden group border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Contenedor Multimedia / Thumbnail */}
            <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden flex items-center justify-center p-6">
              {project.videoUrl ? (
                <iframe
                  src={`${project.videoUrl}?autoplay=0&mute=1`}
                  title={project.title}
                  className="w-full h-full rounded-lg object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="max-h-24 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              )}
            </div>

            {/* Información del Proyecto */}
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tecnologías / Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}