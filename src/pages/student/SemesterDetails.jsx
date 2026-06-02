import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { matchId } from '../../components/dateUtils';
import SemesterCourseCard from '../../components/SemesterCourseCard';
import '../../css/Semesters.css';

export default function SemesterDetails({ user, onNotify }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { 'X-User-Id': String(user.id) },
    });
    const data = await res.json();
    setSemesters(data.semesters);
    setCourses(data.courses);
    setEnrollments(data.enrollments);
    setAssignments(data.assignments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrollInCourse = async (courseId, semesterId) => {
    await fetch('/api/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': String(user.id),
      },
      body: JSON.stringify({ courseId, semesterId }),
    });
    fetchData();
  };

  const unenrollFromCourse = async (courseId, semesterId) => {
    await fetch(`/api/enrollments/course/${courseId}/semester/${semesterId}`, {
      method: 'DELETE',
      headers: { 'X-User-Id': String(user.id) },
    });
    fetchData();
  };

  const semester = semesters.find((s) => matchId(s.id, id));
  const semesterEnrollments = enrollments.filter(
    (e) => matchId(e.studentId, user.id) && matchId(e.semesterId, id),
  );
  const enrolledIds = semesterEnrollments.map((e) => e.courseId);
  const availableCourses = courses.filter((c) => !enrolledIds.some((cid) => matchId(cid, c.id)));
  const myEnrolled = courses.filter((c) => enrolledIds.some((cid) => matchId(cid, c.id)));

  if (!semester) {
    return (
      <div className="page empty-state">
        <h2>Semester not found</h2>
        <Link to="/semesters"><Button className="nd-btn-primary">Back to Semesters</Button></Link>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!selectedCourse) return;
    await enrollInCourse(selectedCourse, id);
    setOpen(false);
    setSelectedCourse('');
    onNotify('Enrolled in course successfully');
  };

  return (
    <div className="page figma-page">
      <button type="button" className="back-btn" onClick={() => navigate('/semesters')}>← Back</button>
      <div className="page-top">
        <div>
          <h1 className="page-title">{semester.name}</h1>
          <p className="page-subtitle">{semester.season} {semester.year}</p>
        </div>
        {availableCourses.length > 0 && (
          <Button className="nd-btn-primary" onClick={() => setOpen(true)}>+ Enroll in Course</Button>
        )}
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton><Modal.Title>Enroll in a Course</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">Choose a course...</option>
            {availableCourses.map((c) => (
              <option key={c.id} value={c.id}>{c.code} – {c.name}</option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button className="nd-btn-primary" disabled={!selectedCourse} onClick={handleEnroll}>Enroll</Button>
        </Modal.Footer>
      </Modal>

      {myEnrolled.length === 0 ? (
        <div className="page-card">
          <div className="page-card-body empty-state">
            <div className="empty-icon">📚</div>
            <p>{availableCourses.length > 0 ? 'Enroll in a course to get started' : 'No courses in this semester yet'}</p>
            {availableCourses.length > 0 && (
              <Button className="nd-btn-primary" onClick={() => setOpen(true)}>+ Enroll in Course</Button>
            )}
          </div>
        </div>
      ) : (
        <div className="semester-course-grid">
          {myEnrolled.map((course) => {
            const count = assignments.filter((a) => matchId(a.courseId, course.id)).length;
            return (
              <SemesterCourseCard
                key={course.id}
                course={course}
                assignmentCount={count}
                onUnenroll={async () => {
                  if (confirm('Unenroll from this course?')) {
                    await unenrollFromCourse(course.id, id);
                    onNotify('Unenrolled');
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
