'use client';

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
    if (lenis?.scrollTo) {
      lenis.scrollTo(targetId, {
        offset: -40,
        duration: 1.4,
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
      className="fixed top-3 sm:top-5 left-0 w-full z-50 flex justify-center px-2 sm:px-4 pointer-events-none will-change-[transform,opacity]"
    >
      <nav 
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-4xl px-3 py-2 sm:px-6 sm:py-3 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Reflejos superiores */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-full" />

        {/* Logotipo */}
        <MagneticItem>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as any).lenis;
              if (lenis?.scrollTo) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10 text-[9px] sm:text-[11px] md:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white no-underline shrink-0"
          >
            Portafolio<span className="text-purple-400">.</span>
          </a>
        </MagneticItem>

        {/* Enlaces centrales: Visibles siempre con padding y texto responsivo */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 md:gap-3 relative z-10 shrink-0">
          <MagneticLink href="#galeria" active={active} onClick={(e) => handleSmoothScroll(e, '#galeria')}>
            Galería
          </MagneticLink>
          <MagneticLink href="#capacidades" active={active} onClick={(e) => handleSmoothScroll(e, '#capacidades')}>
            Capacidades
          </MagneticLink>
          <MagneticLink href="#trayectoria" active={active} onClick={(e) => handleSmoothScroll(e, '#trayectoria')}>
            Trayectoria
          </MagneticLink>
        </div>

        {/* Botón de Contacto */}
        <MagneticItem>
          <a 
            href="#contacto" 
            onClick={(e) => handleSmoothScroll(e, '#contacto')}
            className="group/btn relative overflow-hidden inline-flex items-center justify-center px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:brightness-110 transition-all shrink-0 no-underline whitespace-nowrap"
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
        className="group/link relative inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-[8px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider no-underline rounded-full shrink-0 whitespace-nowrap transition-colors duration-300"
        style={{ color: isActive ? '#ffffff' : '#a3a3a3' }}
      >
        <div className="absolute inset-0 bg-white/0 group-hover/link:bg-white/5 rounded-full transition-colors duration-300 pointer-events-none" />

        {isActive && (
          <div className="absolute inset-0 bg-purple-500/15 rounded-full border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)] pointer-events-none" />
        )}

        <span className="relative z-10 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
          {isActive && <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,1)] shrink-0" />}
          {children}
        </span>
      </a>
    </MagneticItem>
  );
}

function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.25;
    const y = (e.clientY - top - height / 2) * 0.25;
    gsap.to(ref.current, { x, y, duration: 0.8, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex shrink-0 items-center justify-center will-change-transform"
    >
      {children}
    </div>
  );
}