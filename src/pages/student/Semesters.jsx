import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { matchId } from '../../components/dateUtils';
import CreateSemesterModal from '../../components/CreateSemesterModal';
import SemesterCard from '../../components/SemesterCard';
import SemestersEmpty from '../../components/SemestersEmpty';
import '../../css/Semesters.css';

export default function Semesters({ user, onNotify }) {
  const [semesters, setSemesters] = useState([]);
  const [courses] = useState([]);
  const [enrollments] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [season, setSeason] = useState('Fall');
  const [year, setYear] = useState(new Date().getFullYear());

  const addSemester = (semester) => {
    setSemesters((prev) => [...prev, { ...semester, id: Date.now() }]);
  };

  const deleteSemester = (id) => {
    setSemesters((prev) => prev.filter((s) => !matchId(s.id, id)));
  };

  const mySemesters = semesters
    .filter((s) => matchId(s.userId, user?.id))
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const order = { Spring: 1, Summer: 2, Fall: 3, Winter: 4 };
      return order[b.season] - order[a.season];
    });

  const getSemesterCourses = (semesterId) => {
    const enrolledCourseIds = enrollments
      .filter((e) => matchId(e.studentId, user?.id) && matchId(e.semesterId, semesterId))
      .map((e) => e.courseId);
    return courses.filter((c) => enrolledCourseIds.some((cid) => matchId(cid, c.id)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSemester({ name: name || `${season} ${year}`, season, year, userId: user?.id });
    setOpen(false);
    setName('');
    onNotify('Semester created successfully');
  };

  return (
    <div className="page figma-page">
      <div className="page-top">
        <div>
          <h1 className="page-title">My Semesters 📚</h1>
          <p className="page-subtitle">Organize your courses by semester</p>
        </div>
        <Button className="nd-btn-primary" onClick={() => setOpen(true)}>
          <Plus size={18} className="me-1" /> Add Semester
        </Button>
      </div>

      <CreateSemesterModal
        show={open}
        onHide={() => setOpen(false)}
        season={season}
        setSeason={setSeason}
        year={year}
        setYear={setYear}
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />

      {mySemesters.length === 0 ? (
        <SemestersEmpty onAdd={() => setOpen(true)} />
      ) : (
        <div className="grid-auto">
          {mySemesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              courses={getSemesterCourses(semester.id)}
              onDelete={() => {
                if (confirm('Delete this semester?')) {
                  deleteSemester(semester.id);
                  onNotify('Semester deleted');
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
