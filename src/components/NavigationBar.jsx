import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Settings, KanbanSquare, BookOpen } from 'lucide-react';

const NavigationBar = ({ role, onNavigate }) => {
  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/semesters', label: 'Semesters', icon: FileText },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/kanban', label: 'Kanban Board', icon: KanbanSquare },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];
  const instructorLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/courses', label: 'My Courses', icon: BookOpen },
    { to: '/calendar', label: 'Calendar', icon: Calendar },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const links = role === 'student' ? studentLinks : instructorLinks;

  return (
    <nav className="Nav-container">
      {links.map((item) => (
        <NavLink
          className="link-container"
          to={item.to}
          key={item.to}
          end={item.to === '/dashboard'}
          onClick={onNavigate}
        >
          <item.icon />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationBar;
