import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function AppLayout({ user, onLogout }) {
  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
