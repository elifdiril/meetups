import { useEffect, useState } from 'react';
import MainNavigation from './MainNavigation';
import Loader from '../ui/Loader';
import { useRouter } from 'next/router';
import Notification from '../ui/Notification';
import { useNotificationContext } from '@/context/NotificationContext';

function Layout(props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const notificationCtx = useNotificationContext();
  const activeNotification = notificationCtx.notification;

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router.events]);

  return (
    <div className='min-h-screen'>
      <MainNavigation />
      {loading && <Loader />}
      <main className="w-11/12">{props.children}</main>
      {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
    </div>
  );
}

export default Layout;