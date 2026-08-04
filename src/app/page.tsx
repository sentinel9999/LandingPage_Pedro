import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ParallaxGallery from '@/components/ParallaxGallery';
import BentoCards from '@/components/BentoCards';
import Timeline from '@/components/timeline';

export default function Page() {
  return (
    <main className="relative bg-neutral-950 text-white min-h-screen">
      {/* Barra de navegación flotante */}
      <Navbar />
      
      {/* Secciones de la página */}
      <Hero />
      <ParallaxGallery />
      <BentoCards />
      <Timeline />
    </main>
  );
}