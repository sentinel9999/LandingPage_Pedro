'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('#galeria');
  const isVisibleRef = useRef(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    gsap.fromTo(
      navContainerRef.current,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );

    const showNavbar = () => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to(navContainerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    };

    const hideNavbar = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to(navContainerRef.current, {
          y: -120,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 90) {
        showNavbar();
      } else if (window.scrollY > 100 && isVisibleRef.current) {
        hideNavbar();
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        showNavbar();
      } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        hideNavbar();
      } else if (currentScrollY < lastScrollYRef.current) {
        showNavbar();
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActive(targetId);

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetId, {
        offset: -40,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.querySelector(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={navContainerRef}
      onMouseEnter={() => {
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          gsap.to(navContainerRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' });
        }
      }}
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
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />

        {/* Logotipo: Scroll al inicio */}
        <MagneticItem>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as any).lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.6 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ position: 'relative', zIndex: 10, fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#ffffff', textDecoration: 'none' }}
          >
            Portafolio<span style={{ color: '#a855f7' }}>.</span>
          </a>
        </MagneticItem>

        {/* Enlaces con navegación suave */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 10 }}>
          <MagneticLink href="#galeria" active={active} onClick={(e) => handleSmoothScroll(e, '#galeria')}>Galería</MagneticLink>
          <MagneticLink href="#capacidades" active={active} onClick={(e) => handleSmoothScroll(e, '#capacidades')}>Capacidades</MagneticLink>
          <MagneticLink href="#trayectoria" active={active} onClick={(e) => handleSmoothScroll(e, '#trayectoria')}>Trayectoria</MagneticLink>
        </div>

        {/* Botón de Contacto */}
        <MagneticItem>
          <a 
            href="#contacto" 
            onClick={(e) => handleSmoothScroll(e, '#contacto')}
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
              backgroundColor: '#a855f7',
              textDecoration: 'none',
              position: 'relative',
              zIndex: 10,
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
            }}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="relative z-10">Contacto</span>
          </a>
        </MagneticItem>
      </nav>
    </div>
  );
}

function MagneticLink({ children, href, active, onClick }: { children: React.ReactNode, href: string, active: string, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const isActive = active === href;

  return (
    <MagneticItem>
      <a 
        href={href} 
        onClick={onClick}
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
        <div className="absolute inset-0 bg-white/0 group-hover/link:bg-white/5 rounded-full transition-colors duration-500" />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent group-hover/link:w-[60%] transition-all duration-500 opacity-0 group-hover/link:opacity-100" />

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

function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
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