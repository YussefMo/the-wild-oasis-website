import Image from 'next/image';
import Link from 'next/link';
import bg from '../../public/bg.png';

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        className="object-cover object-top"
        src={bg}
        placeholder="blur"
        quality={80}
        fill
        alt="Mountains and forests with two cabins"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-primary-50 mb-10 text-6xl font-normal tracking-tight sm:text-8xl">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-6 text-lg font-semibold transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
