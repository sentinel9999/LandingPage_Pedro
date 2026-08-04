import type { Metadata } from 'main';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Experiencia Inmersiva AAA',
  description: 'Plataforma interactiva con Next.js 15, GSAP y Lenis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#030303] text-white selection:bg-purple-600 selection:text-white">
        <div className="film-grain" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}