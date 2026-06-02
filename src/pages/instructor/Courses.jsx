import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { matchId } from '../../components/dateUtils';
import InstructorCourseCard from '../../components/InstructorCourseCard';
import '../../css/Semesters.css';

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#6366F1', '#14B8A6'];

export default function Courses({ user, onNotify }) {
  const [courses, setCourses] = useState([]);
  const [enrollments] = useState([]);
  const [assignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const addCourse = (course) => {
    setCourses((prev) => [...prev, { ...course, id: Date.now(), instructorId: user?.id }]);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => !matchId(c.id, id)));
  };

  const myCourses = courses.filter((c) => matchId(c.instructorId, user?.id));

  const resetForm = () => { setName(''); setCode(''); setDescription(''); setColor(COLORS[0]); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courses.some((c) => c.code.toLowerCase() === code.toLowerCase())) {
      onNotify('Course code already exists');
      return;
    }
    addCourse({ name, code, description, color });
    setOpen(false);
    resetForm();
    onNotify('Course created successfully');
  };

  return (
    <div className="page">
      <div className="page-top">
        <div>
          <h1 className="page-title">My Courses</h1>
          <p className="page-subtitle">Create and manage your courses</p>
        </div>
        <Button variant="primary" onClick={() => setOpen(true)}>+ Create Course</Button>
      </div>

      <Modal show={open} onHide={() => { setOpen(false); resetForm(); }} centered size="lg">
        <Modal.Header closeButton><Modal.Title>Create New Course</Modal.Title></Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3"><Form.Label>Course Code</Form.Label><Form.Control placeholder="CS101" value={code} onChange={(e) => setCode(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Course Name</Form.Label><Form.Control value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></Form.Group>
            <Form.Label>Course Color</Form.Label>
            <div className="color-picker">
              {COLORS.map((c) => (
                <button key={c} type="button" className={`color-swatch${color === c ? ' selected' : ''}`} style={{ backgroundColor: c }} onClick={() => setColor(c)} />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer><Button type="submit" variant="primary" className="w-100">Create Course</Button></Modal.Footer>
        </Form>
      </Modal>

      {myCourses.length === 0 ? (
        <div className="page-card"><div className="page-card-body empty-state"><p>No courses yet.</p><Button variant="primary" onClick={() => setOpen(true)}>+ Create Course</Button></div></div>
      ) : (
        <div className="semester-course-grid">
          {myCourses.map((course) => {
            const students = enrollments.filter((e) => matchId(e.courseId, course.id)).length;
            const assignCount = assignments.filter((a) => matchId(a.courseId, course.id)).length;
            return (
              <InstructorCourseCard
                key={course.id}
                course={course}
                studentCount={students}
                assignmentCount={assignCount}
                onDelete={() => {
                  if (confirm('Delete course and all assignments?')) {
                    deleteCourse(course.id);
                    onNotify('Course deleted');
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
