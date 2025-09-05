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
      { url: '/ae-favicon-4.svg', type: 'image/svg+xml' },
      { url: '/ae-favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/ae-favicon-16.png', type: 'image/png', sizes: '16x16' }
    ],
    apple: { url: '/ae-favicon-180.png', sizes: '180x180', type: 'image/png' },
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
        <link rel="icon" href="/ae-favicon-4.svg?v=4" type="image/svg+xml" />
        <link rel="icon" href="/ae-favicon-32.png?v=4" type="image/png" sizes="32x32" />
        <link rel="icon" href="/ae-favicon-16.png?v=4" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/ae-favicon-180.png?v=4" sizes="180x180" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
