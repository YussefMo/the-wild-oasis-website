'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function deleteHandler() {
    if (confirm('Are you sure you want to delete this reservation'))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={deleteHandler}
      className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex flex-grow cursor-pointer items-center gap-2 px-4 py-3 text-xs font-bold uppercase transition-colors md:px-3"
    >
      {!isPending ? (
        <>
          <TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
