import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: "DM' portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-sky-200 to-sky-500 dark:from-sky-950 dark:to-orange-900 scroll-smooth">
        <Header />
        {children}
      </body>
    </html>
  );
}
