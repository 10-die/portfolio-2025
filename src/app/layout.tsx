import type { Metadata } from 'next';
import DebugConsole from '@/components/DebugConsole';
import './globals.css';

export const metadata: Metadata = {
  title: 'Developer Portfolio - Smooth Motion & Systems Design',
  description: 'A portfolio showcasing fluid motion, captivating interactions, and systems design from first principles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] transition-colors">
        {children}
        <DebugConsole />
      </body>
    </html>
  );
}
