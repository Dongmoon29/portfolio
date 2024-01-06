import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeWrapper from '@/context/ThemeWrapper';

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
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            <Header />
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
