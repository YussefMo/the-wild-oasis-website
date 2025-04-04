'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest
} from './data-service';
import { redirect } from 'next/navigation';

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account'
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error('You must login to update your profile');

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData.get('nationality').split('%');

  if (!/^[a-zA-Z0-9]{6,15}$/.test(nationalID))
    throw new Error('please enter a valid national ID');

  const formattedData = {
    nationality,
    countryFlag,
    nationalID
  };

  await updateGuest(session.user.guestId, formattedData);
  revalidatePath('/account/profile');
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must login to update your profile');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error('You are not allowed to delete this reservation');

  await deleteBooking(bookingId);

  revalidatePath('/account/reservations');
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error('You must login to update your profile');

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  const reservationId = Number(formData.get('id'));

  if (!guestBookingsIds.includes(reservationId))
    throw new Error('You are not allowed to edit this reservation');

  const formattedData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000)
  };

  await updateBooking(reservationId, formattedData);

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error('You must login to update your profile');

  const formattedData = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations').slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.totalPrice,
    status: 'unconfirmed',
    hasBreakfast: false,
    isPaid: false
  };

  const cabinId = bookingData.cabinId;

  await createBooking(formattedData);

  revalidatePath(`/cabins/${cabinId}`);
  revalidatePath('/account/reservations');
  redirect('/cabins/thank-you');
}
