'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null); // Referencia para la animación del orbe
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reflectorRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. LÍNEA DE TIEMPO CINEMÁTICA
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    gsap.set(characterRef.current, { opacity: 0 });
    gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, buttonsRef.current], { opacity: 0, y: 40 });
    gsap.set(reflectorRef.current, { x: '-200%' }); 

    tl.to(characterRef.current, { opacity: 1, duration: 1.5, delay: 0.8 }) 
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1") 
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }, "-=0.8") 
      .to(reflectorRef.current, { x: '300%', duration: 2, ease: 'power2.inOut' }, "-=0.5") 
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1 }, "-=1") 
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 1 }, "-=0.8"); 

    // 2. CAMINATA DEL PERSONAJE (De izquierda a derecha infinito)
    gsap.fromTo(
      characterRef.current,
      { x: '-30vw' }, 
      { x: '120vw', duration: 20, ease: 'none', repeat: -1, delay: 1 } 
    );

    // 3. ANIMACIÓN DE RESPIRACIÓN DEL ORBE (Para que parezca vivo)
    gsap.to(orbRef.current, {
      y: -30,
      scale: 1.05,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // 4. LOOP DEL REFLECTOR DE APPLE
    gsap.to(reflectorRef.current, {
      x: '300%',
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
      repeatDelay: 6, 
      delay: 4 
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a'
      }}
    >
      {/* CAPA 1: FONDO VIVO */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Luces Volumétricas forzadas con estilos en línea */}
        <div style={{
          position: 'absolute', top: '15%', left: '25%', width: '45vw', height: '45vw',
          backgroundColor: 'rgba(147, 51, 234, 0.15)', borderRadius: '50%', filter: 'blur(120px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '20%', width: '35vw', height: '35vw',
          backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%', filter: 'blur(100px)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #0a0a0a 90%)' }} />
      </div>

      {/* CAPA 2: EL PERSONAJE (Z-INDEX 10) - Pasa detrás de las letras */}
      <div 
        ref={characterRef} 
        style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-50%)'
        }}
      >
        {/* ========================================================
            ESTE ES EL PERSONAJE PROVISIONAL (ORBE 3D DE ENERGÍA)
            Cuando tengas tu video, borra este <div ref={orbRef}> 
            y pon tu etiqueta <video> aquí.
            ======================================================== */}
        <div 
          ref={orbRef}
          style={{
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #ffffff, #a855f7, #0a0a0a)',
            boxShadow: '0 0 80px rgba(168, 85, 247, 0.6), inset -20px -20px 40px rgba(0,0,0,0.8)'
          }}
        />
      </div>

      {/* CAPA 3: INTERFAZ Y TEXTO (Z-INDEX 20) */}
      <div style={{ relative: 'position', zIndex: 20, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
        
        {/* Badge */}
        <div ref={badgeRef} style={{ marginBottom: '40px', position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 24px',
            backgroundColor: 'rgba(23, 23, 23, 0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '9999px',
            boxShadow: '0 0 30px rgba(0,0,0,0.8)'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em', color: '#e5e5e5' }}>
              Desarrollo & Ingeniería AAA
            </span>
          </div>
        </div>

        {/* Título y Reflector */}
        <div ref={titleContainerRef} style={{ position: 'relative', marginBottom: '40px', overflow: 'hidden', padding: '10px 0' }}>
          <h1 
            ref={titleRef} 
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              color: '#ffffff',
              margin: 0
            }}
          >
            Pedro <br />
            {/* Texto degradado forzado con estilos en línea para evitar fallos de Tailwind */}
            <span style={{
              background: 'linear-gradient(to bottom right, #ffffff, #e9d5ff, #737373)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              Lopez
            </span>
          </h1>

          {/* El Reflector de luz */}
          <div 
            ref={reflectorRef} 
            style={{
              position: 'absolute', top: '-50%', bottom: '-50%', width: '120px',
              backgroundColor: '#ffffff', filter: 'blur(35px)', transform: 'rotate(25deg)',
              zIndex: 30, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.8
            }}
          />
        </div>

        {/* Subtítulo */}
        <div ref={subtitleRef} style={{ maxWidth: '600px', marginBottom: '56px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 300, color: '#a3a3a3' }}>Un ecosistema interactivo impulsado por física de alta gama.</p>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: 300, color: '#a3a3a3' }}>Creamos interfaces cinemáticas, arquitecturas robustas y experiencias digitales que redefinen el estándar de la industria.</p>
        </div>

        {/* Botones Premium */}
        <div ref={buttonsRef} style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <MagneticButton primary href="#galeria">
            Explorar Escenas
          </MagneticButton>
          <MagneticButton href="#contacto">
            Contactar Sistema
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// COMPONENTE: BOTÓN MAGNÉTICO AAA
// ==========================================
function MagneticButton({ children, href, primary }: { children: React.ReactNode, href: string, primary?: boolean }) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    gsap.to(btnRef.current, { x, y, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div style={{ display: 'inline-block', perspective: '1000px' }}>
      <a
        ref={btnRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '20px 48px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          textDecoration: 'none',
          willChange: 'transform',
          transition: 'all 0.3s ease',
          backgroundColor: primary ? '#ffffff' : 'rgba(23, 23, 23, 0.6)',
          color: primary ? '#000000' : '#ffffff',
          border: primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: primary ? 'none' : 'blur(10px)',
          WebkitBackdropFilter: primary ? 'none' : 'blur(10px)',
          boxShadow: primary ? '0 10px 30px rgba(255, 255, 255, 0.2)' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          if (!primary) e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          if (!primary) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        <span>{children}</span>
        {primary && <span style={{ color: '#9333ea', fontWeight: 'bold' }}>↗</span>}
      </a>
    </div>
  );
}