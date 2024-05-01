import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <div className='min-h-screen'>
      <MainNavigation />
      <main className="w-11/12">{props.children}</main>
    </div>
  );
}

export default Layout;