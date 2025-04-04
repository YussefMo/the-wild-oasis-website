import { auth } from '@/src/lib/auth';

export const metadata = {
  title: 'Guest Area'
};

async function AccountPage() {
  const session = await auth();

  return (
    <div>
      <h2 className="text-accent-400 mt-8 mb-7 text-center text-2xl font-semibold sm:text-left">
        Welcome, {session.user.name}
      </h2>
    </div>
  );
}

export default AccountPage;
