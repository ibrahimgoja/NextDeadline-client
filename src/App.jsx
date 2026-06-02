import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import AppLayout from './components/AppLayout';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Semesters from './pages/student/Semesters';
import SemesterDetails from './pages/student/SemesterDetails';
import Calendar from './pages/student/Calendar';
import KanbanBoard from './pages/student/KanbanBoard';
import StudentSettings from './pages/student/StudentSettings';
import CourseDetails from './pages/student/CourseDetails';
import AssignmentDetails from './pages/student/AssignmentDetails';
import Courses from './pages/instructor/Courses';

import './css/Reset.css';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [notice, setNotice] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const onNotify = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <Router>
      {notice && (
        <div className="app-toast app-toast-success" role="status">
          {notice}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={handleLogin} />}
        />
        <Route
          element={
            user ? (
              <AppLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="dashboard"
            element={
              user?.role === 'instructor' ? (
                <InstructorDashboard user={user} />
              ) : (
                <StudentDashboard user={user} />
              )
            }
          />
          <Route
            path="semesters"
            element={
              user?.role === 'student' ? (
                <Semesters user={user} onNotify={onNotify} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="semesters/:id"
            element={
              user?.role === 'student' ? (
                <SemesterDetails user={user} onNotify={onNotify} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="courses"
            element={
              user?.role === 'instructor' ? (
                <Courses user={user} onNotify={onNotify} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path="courses/:courseKey" element={<CourseDetails user={user} onNotify={onNotify} />} />
          <Route path="assignments/:id" element={<AssignmentDetails user={user} onNotify={onNotify} />} />
          <Route path="calendar" element={<Calendar user={user} />} />
          <Route
            path="kanban"
            element={
              user?.role === 'student' ? (
                <KanbanBoard user={user} onNotify={onNotify} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route path="settings" element={<StudentSettings user={user} onNotify={onNotify} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
