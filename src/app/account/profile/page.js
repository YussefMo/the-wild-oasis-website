import SelectCountry from '@/src/components/SelectCountry';
import UpdateProfileForm from '@/src/components/UpdateProfileForm';
import { auth } from '@/src/lib/auth';
import { getGuest } from '@/src/lib/data-service';

export const metadata = {
  title: 'Update Profile'
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email);

  return (
    <div className="text-center sm:text-left">
      <h2 className="text-accent-400 mb-4 text-2xl font-semibold">
        Update your guest profile
      </h2>

      <p className="text-primary-200 mb-8 text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
