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
    icon: [
      { url: '/ae-logo.png', type: 'image/png', sizes: '16x16' },
      { url: '/ae-logo.png', type: 'image/png', sizes: '32x32' }
    ],
    apple: { url: '/ae-logo.png', type: 'image/png', sizes: '180x180' },
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
        <link rel="icon" href="/ae-logo.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/ae-logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/ae-logo.png" sizes="180x180" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
