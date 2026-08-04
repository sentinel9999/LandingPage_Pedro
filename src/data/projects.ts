export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl?: string;
  thumbnail: string;
  tags: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'tapani-edits',
    title: 'Tapani Content Stream',
    category: 'YouTube Editing & FX',
    description: 'Edición dinámica con transiciones de ritmo acelerado y efectos visuales personalizados.',
    videoUrl: 'https://www.youtube.com/embed/ih94K_1Dk60',
    thumbnail: '/IMG/Pedro/logotapani.png',
    tags: ['Premiere Pro', 'After Effects']
  },
  {
    id: 'goosebumps-radio',
    title: 'Goosebumps Radio',
    category: 'Podcast & Visualizer',
    description: 'Creación de atmósferas visuales inmersivas y edición multicámara.',
    videoUrl: 'https://www.youtube.com/embed/jxhDgvDFDsY',
    thumbnail: '/IMG/Pedro/logogoose.png',
    tags: ['Motion Graphics', 'Editing']
  },
  {
    id: 'arcane-first',
    title: 'Arcane First Studio',
    category: 'Game Dev Socials',
    description: 'Diseño de personajes animados y piezas promocionales en formato vertical.',
    thumbnail: '@/IMG/Arcane.png',
    tags: ['Animation', 'Social Media']
  }
];