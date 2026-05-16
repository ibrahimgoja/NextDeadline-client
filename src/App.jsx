import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'

import StudentDashboard from "./pages/student/StudentDashboard"
import Semesters from "./pages/student/Semesters"
import Calendar from "./pages/student/Calendar"
import KanbanBoard from "./pages/student/KanbanBoard"
import StudentSettings from "./pages/student/StudentSettings"

import InstructorDashBoard from "./pages/instructor/InstructorDashboard"
import Courses from "./pages/instructor/Courses"
import Students from "./pages/instructor/Students"
import Grades from "./pages/instructor/Grades"
import InstructorSettings from "./pages/instructor/InstructorSettings"
import "./css/Reset.css"
import "./App.css"

function App() {

  const Role = "Student";

  return (
    <>
      <Router>
        <Header Role={Role} />
        <main className='main-content'>
          <Routes>
            {Role == "Student" ? (
              <>
                <Route path='/Student/Dashboard' element={<StudentDashboard />} />
                <Route path='/Student/Semesters' element={<Semesters />} />
                <Route path='/Student/Calendar' element={<Calendar />} />
                <Route path='/Student/KanbanBoard' element={<KanbanBoard />} />
                <Route path='/Student/Settings' element={<StudentSettings />} />
              </>
            ) : (
              <>
                <Route path='/Instructor/Dashboard' element={<InstructorDashBoard />} />
                <Route path="/Instructor/Courses" element={<Courses />} />
                <Route path="/Instructor/Students" element={<Students />} />
                <Route path="/Instructor/Grades" element={<Grades />} />
                <Route path="/Instructor/Settings" element={<InstructorSettings />} />
              </>
            )}
          </Routes>
        </main>
      </Router>


    </>
  )
}


export default App
