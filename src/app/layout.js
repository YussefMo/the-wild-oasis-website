import { Josefin_Sans } from 'next/font/google';

import Header from '../components/Header';
import '../styles/globals.css';
import ReservationProvider from '../context/ReservationContext';

const Josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis'
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Josefin.className} bg-primary-950 text-primary-100 flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <div className="grid flex-1 px-4 py-6 sm:px-8 sm:py-12">
          <main className="mx-auto mt-25 w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
