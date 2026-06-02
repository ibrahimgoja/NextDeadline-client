import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';

import AppLayout from './components/AppLayout';

import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/StudentDashboard';
import Semesters from './pages/student/Semesters';
import Calendar from './pages/student/Calendar';
import KanbanBoard from './pages/student/KanbanBoard';
import StudentSettings from './pages/student/StudentSettings';

import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Courses from './pages/instructor/Courses';

import './css/Reset.css';
import './App.css';

function App() {
  const user = null;
  const onLogout = () => {};

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
                <InstructorDashboard />
              ) : (
                <StudentDashboard UserName={user?.name} />
              )
            }
          />
          <Route
            path="semesters"
            element={
              user?.role === 'student' ? <Semesters /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route path="calendar" element={<Calendar />} />
          <Route
            path="kanban"
            element={
              user?.role === 'student' ? <KanbanBoard /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route path="settings" element={<StudentSettings />} />
          <Route
            path="courses"
            element={
              user?.role === 'instructor' ? <Courses /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
