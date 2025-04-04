import Reservation from '@/src/components/Reservation';
import Spinner from '@/src/components/Spinner';
import TextExpander from '@/src/components/TextExpander';
import { getCabin, getCabins } from '@/src/lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id)
  }));
  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  // eslint-disable-next-line no-unused-vars
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="mx-auto mt-8 max-w-6xl text-center sm:text-left">
      <div className="border-primary-800 mb-24 grid gap-20 border px-10 py-3 sm:grid-cols-[3fr_4fr]">
        <div className="min-w[100%] relative ml-5 min-h-[250px] flex-1 -translate-x-3 scale-[1.15] sm:ml-0">
          <Image
            className="object-cover"
            src={image}
            sizes="(min-hight: 250px), (min-width: 100%)"
            fill
            alt={`Cabin ${name}`}
            priority
          />
        </div>

        <div>
          <h3 className="text-accent-100 bg-primary-950 mb-5 p-6 pb-1 text-7xl font-black sm:w-[150%] sm:translate-x-[-254px]">
            Cabin {name}
          </h3>

          <p className="text-primary-300 mb-10 text-lg">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <UsersIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                Located in the heart of the{' '}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="text-primary-600 h-5 w-5" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner from='Some' />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
