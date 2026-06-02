import { useState } from 'react';
import { GraduationCap, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import '../css/Header.css';

const Header = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  if (!user) return null;
  const roleLabel = user.role === 'instructor' ? 'Instructor' : 'Student';

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
        <div className="header-top">
          <Link to="/dashboard" className="header-brand-link" onClick={closeMobile}>
            <div className="header-top-icon">
              <GraduationCap />
            </div>
            <div className="header-top-text">
              <h1 className="app-name">AssignTrack</h1>
              <h2 className="header-role">{roleLabel}</h2>
            </div>
          </Link>
        </div>

        <NavigationBar role={user.role} onNavigate={closeMobile} />

        <div className="header-bot">
          <Link to="/settings" className="header-user-info-container" onClick={closeMobile}>
            <div className="user-avatar-fallback">{user.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div className="header-user-details">
              <div className="header-user-name">{user.name}</div>
              <div className="header-user-email">{user.email}</div>
            </div>
          </Link>
          <button type="button" className="logout-container" onClick={onLogout}>
            <LogOut />
            <div className="Logout-text">Logout</div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Header;
