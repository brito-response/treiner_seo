import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeInitializer } from '@/components/ThemeInitializer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev News',
  description: 'Informação com credibilidade',
};

function getThemeFromCookie(cookie?: string): 'light' | 'dark' {
  if (!cookie) return 'light';
  const match = cookie.match(/theme=(dark|light)/);
  return match ? (match[1] as 'light' | 'dark') : 'light';
}
interface RootLayoutProps { children: React.ReactNode; cookies?: string; };
export default function RootLayout({ children, cookies }: Readonly<RootLayoutProps>) {
  const theme = getThemeFromCookie(cookies);
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full`}>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
