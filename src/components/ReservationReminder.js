'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from '../context/ReservationContext';

function ReservationReminder() {
  // CHANGE
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="bg-accent-500 text-primary-800 text fixed bottom-6 left-1/2 flex min-w-[300px] -translate-x-1/2 items-center gap-8 rounded-full px-3 py-2 font-semibold shadow-xl shadow-slate-900 sm:px-8 sm:py-5">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{' '}
        {format(new Date(range.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(range.to), 'MMM dd yyyy')}
      </p>
      <button
        onClick={resetRange}
        className="hover:bg-accent-600 cursor-pointer rounded-full p-1 transition-all"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
