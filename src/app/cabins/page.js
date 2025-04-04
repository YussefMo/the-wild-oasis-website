import { Suspense } from 'react';
import CabinList from '@/src/components/CabinList';
import Spinner from '@/src/components/Spinner';
import Filter from '@/src/components/Filter';
import ReservationReminder from '@/src/components/ReservationReminder';

// export const revalidate = 3600;

export const metadata = {
  title: 'Cabins'
};

export default async function Page({ searchParams }) {
  const { capacity } = await searchParams;
  const filter = capacity ?? 'all';

  return (
    <div className="text-center sm:text-left">
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <Suspense key={filter} fallback={<Spinner from="Cabins"  />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
