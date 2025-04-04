import SideNavigation from '@/src/components/SideNavigation';

function Layout({ children }) {
  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-[16rem_1fr] sm:gap-12">
      <div>
        <SideNavigation />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Layout;
