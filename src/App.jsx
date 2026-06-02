import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import AppLayout from './components/AppLayout';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Semesters from './pages/student/Semesters';
import Calendar from './pages/student/Calendar';
import KanbanBoard from './pages/student/KanbanBoard';
import StudentSettings from './pages/student/StudentSettings';
import Courses from './pages/instructor/Courses';

import './css/Reset.css';
import './App.css';

function App() {
  const user = null;
  const onLogout = () => {};
  const onNotify = () => {};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => {}} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <Register onLogin={() => {}} />}
        />
        <Route
          element={
            user ? (
              <AppLayout user={user} onLogout={onLogout} />
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
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
