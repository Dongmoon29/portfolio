import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeWrapper from '@/context/ThemeWrapper';
import { OsProvider } from '@/context/OsContext';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "DM's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang={'en'}>
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            <OsProvider>{children}</OsProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
