/* eslint-disable @next/next/no-img-element */
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import { auth } from '../lib/auth';

function Header() {
  return (
    <header className="border-primary-900 fixed z-998 w-full border-b bg-black/0 px-8 py-5 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <NavBar avatar={<Avatar />} />
      </div>
    </header>
  );
}

export default Header;

export async function Avatar() {
  const session = await auth();
  return (
    session?.user && (
      <img
        className="h-8 w-8 rounded-full"
        src={session.user.image}
        alt={session.user.name}
        referrerPolicy="no-referrer"
      />
    )
  );
}
