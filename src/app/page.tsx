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
      <Hero /> {/* Seccion de inicio /logo/imagen/barra */}
      <ParallaxGallery /> {/* Contiene las tarjetas de iamgen de galeria */}
      <BentoCards /> {/* Seccion de cartas con porcentaje */}
      <Timeline /> {/* Linea del tiempo */}
    </main>
  );
}
