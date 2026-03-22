import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import Providers from '../components/Providers';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-headline',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Ghar Ka Zaika',
  description: 'Fresh, fiery, and built for the hungry. Order online for takeaway or delivery.',
};

export const viewport = {
  themeColor: '#0e0e0e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${plusJakarta.variable} ${manrope.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0e0e0e] text-white font-body antialiased select-none min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
