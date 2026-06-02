import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { matchId, formatDate } from '../../components/dateUtils';
import StatusBadge from '../../components/StatusBadge';
import '../../css/AssignmentDetails.css';

export default function CourseDetails({ user, onNotify }) {
  const { courseKey } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [slides, setSlides] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [assignmentProgress, setAssignmentProgress] = useState([]);
  const [taskProgress, setTaskProgress] = useState([]);
  const [tab, setTab] = useState('assignments');
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [slideOpen, setSlideOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [aTitle, setATitle] = useState('');
  const [aDesc, setADesc] = useState('');
  const [aDue, setADue] = useState('');
  const [aPoints, setAPoints] = useState('');
  const [sTitle, setSTitle] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sFile, setSFile] = useState('');
  const [tAssignId, setTAssignId] = useState('');
  const [tTitle, setTTitle] = useState('');
  const [tDesc, setTDesc] = useState('');

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { 'X-User-Id': String(user.id) },
    });
    const data = await res.json();
    setCourses(data.courses);
    setAssignments(data.assignments);
    setSlides(data.slides);
    setTasks(data.tasks);
    setAssignmentProgress(data.assignmentProgress);
    setTaskProgress(data.taskProgress);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAssignment = async (assignment) => {
    await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': String(user.id) },
      body: JSON.stringify(assignment),
    });
    fetchData();
  };

  const updateAssignment = async (id, updates) => {
    await fetch(`/api/assignments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': String(user.id) },
      body: JSON.stringify(updates),
    });
    fetchData();
  };

  const addSlide = async (slide) => {
    await fetch('/api/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': String(user.id) },
      body: JSON.stringify(slide),
    });
    fetchData();
  };

  const deleteSlide = async (id) => {
    await fetch(`/api/materials/${id}`, {
      method: 'DELETE',
      headers: { 'X-User-Id': String(user.id) },
    });
    fetchData();
  };

  const addTask = async (task) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-User-Id': String(user.id) },
      body: JSON.stringify(task),
    });
    fetchData();
  };

  const toggleTaskCompletion = async (taskId) => {
    await fetch(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
      headers: { 'X-User-Id': String(user.id) },
    });
    fetchData();
  };

  const course = courses.find((c) => c.code === courseKey || matchId(c.id, courseKey));

  if (!course) {
    return (
      <div className="page empty-state">
        <h2>Course not found</h2>
        <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const isInstructor = user.role === 'instructor' && matchId(course.instructorId, user.id);
  const courseAssignments = assignments
    .filter((a) => matchId(a.courseId, course.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const courseSlides = slides.filter((s) => matchId(s.courseId, course.id));
  const courseTasks = tasks.filter((t) => courseAssignments.some((a) => matchId(a.id, t.assignmentId)));

  const resetAssignmentForm = () => { setATitle(''); setADesc(''); setADue(''); setAPoints(''); setEditingId(null); };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const payload = {
      title: aTitle,
      description: aDesc,
      dueDate: new Date(aDue).toISOString(),
      points: aPoints ? parseInt(aPoints, 10) : undefined,
      courseId: course.id,
    };
    if (editingId) {
      updateAssignment(editingId, payload);
      onNotify('Assignment updated');
    } else {
      addAssignment(payload);
      onNotify('Assignment created');
    }
    setAssignmentOpen(false);
    resetAssignmentForm();
  };

  return (
    <div className="page">
      <button type="button" className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span className="color-dot" style={{ background: course.color, marginTop: 6, width: 14, height: 14 }} />
        <div>
          <h1 className="page-title">{course.code}</h1>
          <p className="page-subtitle">{course.name}</p>
          {course.description && <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>{course.description}</p>}
        </div>
      </div>

      <div className="tab-list">
        <button type="button" className={`tab-btn${tab === 'assignments' ? ' active' : ''}`} onClick={() => setTab('assignments')}>Assignments</button>
        <button type="button" className={`tab-btn${tab === 'slides' ? ' active' : ''}`} onClick={() => setTab('slides')}>Slides & Materials</button>
        {!isInstructor && (
          <button type="button" className={`tab-btn${tab === 'tasks' ? ' active' : ''}`} onClick={() => setTab('tasks')}>Tasks</button>
        )}
      </div>

      <Modal show={assignmentOpen} onHide={() => { setAssignmentOpen(false); resetAssignmentForm(); }} centered>
        <Modal.Header closeButton><Modal.Title>{editingId ? 'Edit Assignment' : 'Create Assignment'}</Modal.Title></Modal.Header>
        <Form onSubmit={handleSubmitAssignment}>
          <Modal.Body>
            <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control value={aTitle} onChange={(e) => setATitle(e.target.value)} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={aDesc} onChange={(e) => setADesc(e.target.value)} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Due Date</Form.Label><Form.Control type="datetime-local" value={aDue} onChange={(e) => setADue(e.target.value)} required /></Form.Group>
            <Form.Group><Form.Label>Points (optional)</Form.Label><Form.Control type="number" value={aPoints} onChange={(e) => setAPoints(e.target.value)} /></Form.Group>
          </Modal.Body>
          <Modal.Footer><Button type="submit" variant="primary" className="w-100">{editingId ? 'Save' : 'Create'}</Button></Modal.Footer>
        </Form>
      </Modal>

      {tab === 'assignments' && (
        <>
          <div className="page-top" style={{ marginBottom: 0 }}>
            <h3 className="page-card-title">Assignments</h3>
            {isInstructor && <Button variant="primary" size="sm" onClick={() => { resetAssignmentForm(); setAssignmentOpen(true); }}>+ Add</Button>}
          </div>
          {courseAssignments.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📄</div><p>No assignments yet</p></div>
          ) : (
            courseAssignments.map((a) => {
              const progress = assignmentProgress.find((ap) => matchId(ap.assignmentId, a.id) && matchId(ap.studentId, user.id));
              const status = progress?.status || 'To Do';
              return (
                <Link key={a.id} to={`/assignments/${a.id}`} className="assignment-list-link">
                  <div className="page-card assignment-list-card">
                    <div className="page-card-body d-flex justify-content-between gap-3 flex-wrap">
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className="list-item-title">{a.title}</span>
                          {!isInstructor && <StatusBadge status={status} />}
                        </div>
                        {a.description && <p style={{ fontSize: 13, color: '#6b7280' }}>{a.description}</p>}
                        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 6 }}>Due {formatDate(a.dueDate, 'MMM d, yyyy • h:mm a')}</p>
                      </div>
                      <span className="view-details-link">View details →</span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </>
      )}

      {tab === 'slides' && (
        <>
          <div className="page-top" style={{ marginBottom: 0 }}>
            <h3 className="page-card-title">Slides & Materials</h3>
            {isInstructor && <Button size="sm" variant="primary" onClick={() => setSlideOpen(true)}>+ Add</Button>}
          </div>
          <Modal show={slideOpen} onHide={() => setSlideOpen(false)} centered>
            <Modal.Header closeButton><Modal.Title>Add Material</Modal.Title></Modal.Header>
            <Form onSubmit={(e) => {
              e.preventDefault();
              addSlide({ title: sTitle, description: sDesc, courseId: course.id, fileName: sFile || undefined });
              setSlideOpen(false); setSTitle(''); setSDesc(''); setSFile('');
              onNotify('Material added');
            }}>
              <Modal.Body>
                <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control value={sTitle} onChange={(e) => setSTitle(e.target.value)} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} value={sDesc} onChange={(e) => setSDesc(e.target.value)} /></Form.Group>
                <Form.Group><Form.Label>File name (optional)</Form.Label><Form.Control value={sFile} onChange={(e) => setSFile(e.target.value)} /></Form.Group>
              </Modal.Body>
              <Modal.Footer><Button type="submit" variant="primary" className="w-100">Add</Button></Modal.Footer>
            </Form>
          </Modal>
          {courseSlides.length === 0 ? (
            <div className="empty-state"><p>No materials yet</p></div>
          ) : (
            <div className="grid-auto">
              {courseSlides.map((slide) => (
                <div className="page-card" key={slide.id}>
                  <div className="page-card-body">
                    <span className="list-item-title">{slide.title}</span>
                    {slide.fileName && <p style={{ fontSize: 12, color: '#9ca3af' }}>{slide.fileName}</p>}
                    {slide.description && <p style={{ fontSize: 13, color: '#6b7280' }}>{slide.description}</p>}
                    {isInstructor && (
                      <Button size="sm" variant="link" className="text-danger p-0 mt-2" onClick={() => {
                        if (confirm('Delete?')) { deleteSlide(slide.id); onNotify('Deleted'); }
                      }}>Delete</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'tasks' && !isInstructor && (
        <>
          <div className="page-top" style={{ marginBottom: 0 }}>
            <h3 className="page-card-title">My Tasks</h3>
            {courseAssignments.length > 0 && <Button size="sm" variant="primary" onClick={() => setTaskOpen(true)}>+ Add Task</Button>}
          </div>
          <Modal show={taskOpen} onHide={() => setTaskOpen(false)} centered>
            <Modal.Header closeButton><Modal.Title>Create Task</Modal.Title></Modal.Header>
            <Form onSubmit={(e) => {
              e.preventDefault();
              addTask({ title: tTitle, description: tDesc, assignmentId: Number(tAssignId) });
              setTaskOpen(false); setTTitle(''); setTDesc(''); setTAssignId('');
              onNotify('Task added');
            }}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Assignment</Form.Label>
                  <Form.Select value={tAssignId} onChange={(e) => setTAssignId(e.target.value)} required>
                    <option value="">Select...</option>
                    {courseAssignments.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control value={tTitle} onChange={(e) => setTTitle(e.target.value)} required /></Form.Group>
                <Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} value={tDesc} onChange={(e) => setTDesc(e.target.value)} /></Form.Group>
              </Modal.Body>
              <Modal.Footer><Button type="submit" variant="primary" className="w-100">Create</Button></Modal.Footer>
            </Form>
          </Modal>
          {courseTasks.length === 0 ? (
            <div className="empty-state"><p>No tasks yet</p></div>
          ) : (
            courseTasks.map((task) => {
              const assignment = assignments.find((a) => matchId(a.id, task.assignmentId));
              const done = taskProgress.find((tp) => matchId(tp.taskId, task.id) && matchId(tp.studentId, user.id))?.completed;
              return (
                <div className="task-row" key={task.id}>
                  <Form.Check type="checkbox" checked={!!done} onChange={() => toggleTaskCompletion(task.id)} />
                  <div>
                    <div className="task-title" style={{ textDecoration: done ? 'line-through' : 'none', color: done ? '#9ca3af' : 'inherit' }}>{task.title}</div>
                    {task.description && <p style={{ fontSize: 13, color: '#6b7280' }}>{task.description}</p>}
                    <p style={{ fontSize: 12, color: '#9ca3af' }}>Part of: {assignment?.title}</p>
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}
