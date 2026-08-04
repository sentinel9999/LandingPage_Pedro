'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-[120px] pointer-events-none z-50"
      animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
    />
  );
}