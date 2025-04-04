'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  // set the search query url to communicate with the server
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function filterHandler(filter) {
    const params = new URLSearchParams();
    params.set('capacity', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-primary-800 flex border">
      <Button
        filter="all"
        activeFilter={activeFilter}
        filterHandler={filterHandler}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        filterHandler={filterHandler}
      >
        1&mdash;3 guest
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        filterHandler={filterHandler}
      >
        4&mdash;7 guest
      </Button>
      <Button
        filter="large"
        activeFilter={activeFilter}
        filterHandler={filterHandler}
      >
        8&mdash;12 guest
      </Button>
    </div>
  );
}

function Button({ filter, children, activeFilter, filterHandler }) {
  return (
    <button
      onClick={() => filterHandler(filter)}
      className={`hover:bg-primary-700 cursor-pointer px-5 py-2 ${filter === activeFilter && 'bg-primary-700 text-primary-50'}`}
    >
      {children}
    </button>
  );
}

export default Filter;
