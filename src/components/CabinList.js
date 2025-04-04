import { unstable_noStore as noStore } from 'next/cache';
import { getCabins } from '@/src/lib/data-service';
import CabinCard from './CabinCard';

async function CabinList({ filter }) {
  noStore();

  const cabins = await getCabins();

  let displayedCabins;
  if (filter === 'all') {
    displayedCabins = cabins;
  } else if (filter === 'small') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filter === 'medium') {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  } else if (filter === 'large') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <>
      {cabins.length > 0 && (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-14">
          {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default CabinList;
