import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import DefaultLayout from '@/layout/defaultLayout';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Product Management',
  description: '',
  icons: '/favicon.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DefaultLayout>{children}</DefaultLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
