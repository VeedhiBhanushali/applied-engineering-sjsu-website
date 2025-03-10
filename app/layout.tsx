import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Applied Engineering SJSU',
  description: 'Engineering the Future — One Project at a Time | San Jose State University\'s Engineering Consulting Club',
  icons: {
    icon: '/images/ae-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/ae-logo.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="cursor"></div>
        <div id="cursor-blur"></div>
        
        {children}
      </body>
    </html>
  );
}
