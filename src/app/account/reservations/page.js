import ReservationList from '@/src/components/ReservationList';
import { auth } from '@/src/lib/auth';
import { getBookings } from '@/src/lib/data-service';
import Link from 'next/link';

export const metadata = {
  title: 'Reservations'
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div className="text-center sm:text-left">
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
