/* eslint-disable no-unused-vars */
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true
  }).replace('about ', '');

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image }
  } = booking;

  return (
    <div className="border-primary-800 flex flex-col border md:flex-row">
      {/* Image Section */}
      <div className="relative aspect-square w-full md:w-40">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 160px), (max-height: 160px)"
          priority
          className="border-primary-800 object-cover md:border-r"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-grow flex-col p-4 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold md:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-6 items-center rounded-sm bg-yellow-800 px-2 text-xs font-bold text-yellow-200 uppercase md:h-7 md:px-3">
              past
            </span>
          ) : (
            <span className="flex h-6 items-center rounded-sm bg-green-800 px-2 text-xs font-bold text-green-200 uppercase md:h-7 md:px-3">
              upcoming
            </span>
          )}
        </div>

        <p className="text-primary-300 mt-2 text-sm md:mt-1 md:text-lg">
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-3 md:gap-5">
          <p className="text-accent-400 mt-2 text-lg font-semibold md:mt-1 md:text-xl">
            ${totalPrice}
          </p>
          <p className="text-primary-300 hidden md:block">&bull;</p>
          <p className="text-primary-300 text-sm md:text-lg">
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className="text-primary-400 ml-auto text-xs md:text-sm">
            Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="border-primary-800 flex w-full flex-col border-t md:w-[120px] md:border-l">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group text-primary-300 border-primary-800 hover:bg-accent-600 hover:text-primary-900 flex flex-grow items-center gap-2 border-b px-4 py-3 text-xs font-bold uppercase transition-colors md:px-3 md:py-1"
            >
              <PencilSquareIcon className="text-primary-600 group-hover:text-primary-800 h-4 w-4 transition-colors md:h-5 md:w-5" />
              <span className="mt-0.5 md:mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
