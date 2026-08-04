'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('#galeria');

  useEffect(() => {
    // Animación cinemática de entrada sincronizada
    gsap.fromTo(
      navContainerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  return (
    <div 
      ref={navContainerRef}
      style={{
        position: 'fixed',
        top: '24px',
        left: '0',
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
        willChange: 'transform, opacity'
      }}
    >
      <nav 
        className="group/nav relative overflow-hidden"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '850px',
          padding: '12px 32px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(23, 23, 23, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Reflejo superior Glassmorphism AAA */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />

        {/* Logotipo con física magnética */}
        <MagneticItem>
          <Link href="/" style={{ position: 'relative', zIndex: 10, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#ffffff', textDecoration: 'none' }}>
            Portafolio<span style={{ color: '#a855f7' }}>.</span>
          </Link>
        </MagneticItem>

        {/* Enlaces centrales */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 10 }}>
          <MagneticLink href="#galeria" active={active} setActive={setActive}>Galería</MagneticLink>
          <MagneticLink href="#capacidades" active={active} setActive={setActive}>Capacidades</MagneticLink>
          <MagneticLink href="#trayectoria" active={active} setActive={setActive}>Trayectoria</MagneticLink>
        </div>

        {/* Botón de Contacto Premium */}
        <MagneticItem>
          <a 
            href="#contacto" 
            className="group/btn relative overflow-hidden transition-all duration-500"
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              textDecoration: 'none',
              position: 'relative',
              zIndex: 10
            }}
          >
            {/* Glow interno al hacer hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="relative z-10">Contacto</span>
          </a>
        </MagneticItem>
      </nav>
    </div>
  );
}

// ==========================================
// COMPONENTES DE MICROINTERACCIONES AAA
// ==========================================

function MagneticLink({ children, href, active, setActive }: { children: React.ReactNode, href: string, active: string, setActive: (v: string) => void }) {
  const isActive = active === href;

  return (
    <MagneticItem>
      <a 
        href={href} 
        onClick={() => setActive(href)}
        className="group/link relative flex items-center justify-center transition-colors duration-500"
        style={{ 
          padding: '8px 16px',
          fontSize: '11px', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          color: isActive ? '#ffffff' : '#d4d4d4',
          textDecoration: 'none',
          borderRadius: '9999px'
        }}
      >
        {/* Fondo sutil al hover */}
        <div className="absolute inset-0 bg-white/0 group-hover/link:bg-white/5 rounded-full transition-colors duration-500" />
        
        {/* Línea animada inferior con luz viajando (Hover) */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent group-hover/link:w-[60%] transition-all duration-500 opacity-0 group-hover/link:opacity-100" />

        {/* Indicador Permanente Activo */}
        {isActive && (
          <div className="absolute inset-0 bg-purple-500/10 rounded-full border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] pointer-events-none" />
        )}

        <span className="relative z-10 flex items-center gap-2">
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,1)]" />}
          {children}
        </span>
      </a>
    </MagneticItem>
  );
}

// Wrapper para aplicar la física elástica de GSAP a cualquier elemento
function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3; // Factor magnético X
    const y = (e.clientY - top - height / 2) * 0.3; // Factor magnético Y
    gsap.to(ref.current, { x, y, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}