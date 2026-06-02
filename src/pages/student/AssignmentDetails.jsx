import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { matchId, formatDate, isPast, isValid } from '../../components/dateUtils';
import StatusBadge from '../../components/StatusBadge';
import '../../css/AssignmentDetails.css';

const STATUSES = ['To Do', 'In Progress', 'Completed'];

export default function AssignmentDetails({ user, onNotify }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [assignmentProgress, setAssignmentProgress] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [aTitle, setATitle] = useState('');
  const [aDesc, setADesc] = useState('');
  const [aDue, setADue] = useState('');
  const [aPoints, setAPoints] = useState('');

  const updateAssignmentProgress = (assignmentId, status) => {
    setAssignmentProgress((prev) => {
      const existing = prev.find(
        (ap) => matchId(ap.assignmentId, assignmentId) && matchId(ap.studentId, user?.id),
      );
      if (existing) {
        return prev.map((ap) =>
          matchId(ap.assignmentId, assignmentId) && matchId(ap.studentId, user?.id)
            ? { ...ap, status }
            : ap,
        );
      }
      return [...prev, { assignmentId, studentId: user?.id, status }];
    });
  };

  const updateAssignment = (assignmentId, updates) => {
    setAssignments((prev) => prev.map((a) => (matchId(a.id, assignmentId) ? { ...a, ...updates } : a)));
  };

  const deleteAssignment = (assignmentId) => {
    setAssignments((prev) => prev.filter((a) => !matchId(a.id, assignmentId)));
  };

  const assignment = assignments.find((a) => matchId(a.id, id));
  const course = assignment ? courses.find((c) => matchId(c.id, assignment.courseId)) : null;
  const isInstructor = user?.role === 'instructor' && course && matchId(course.instructorId, user?.id);

  const progress = assignmentProgress.find(
    (ap) => matchId(ap.assignmentId, assignment?.id) && matchId(ap.studentId, user?.id),
  );
  const status = progress?.status || 'To Do';

  const dueDate = assignment?.dueDate ? new Date(assignment.dueDate) : null;
  const isOverdue = dueDate && isValid(dueDate) && isPast(dueDate) && status !== 'Completed';

  if (!assignment || !course) {
    return (
      <div className="page empty-state">
        <h2>Assignment not found</h2>
        <Button className="nd-btn-primary" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const openEdit = () => {
    setATitle(assignment.title);
    setADesc(assignment.description || '');
    setADue(formatDate(new Date(assignment.dueDate), "yyyy-MM-dd'T'HH:mm"));
    setAPoints(assignment.points ? String(assignment.points) : '');
    setEditOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateAssignment(assignment.id, {
      title: aTitle,
      description: aDesc,
      dueDate: new Date(aDue).toISOString(),
      points: aPoints ? parseInt(aPoints, 10) : 0,
      courseId: course.id,
    });
    setEditOpen(false);
    onNotify('Assignment updated');
  };

  const handleStatusChange = (nextStatus) => {
    if (nextStatus === status) return;
    updateAssignmentProgress(assignment.id, nextStatus);
    onNotify('Status updated');
  };

  const handleDelete = () => {
    if (!confirm('Delete this assignment?')) return;
    deleteAssignment(assignment.id);
    onNotify('Assignment deleted');
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="page assignment-details-page">
      <button type="button" className="assignment-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      <header className="assignment-details-header">
        <div className="assignment-title-row">
          <div className="assignment-title-main">
            <span className="color-dot assignment-title-dot" style={{ background: course.color }} />
            <h1 className="assignment-details-title">{assignment.title}</h1>
          </div>
          {!isInstructor && (
            <div className="assignment-header-badges">
              <StatusBadge status={status} />
              {isOverdue && <span className="assignment-overdue-badge">Overdue</span>}
            </div>
          )}
        </div>
        <p className="assignment-details-subtitle">
          {course.code} – {course.name}
        </p>
      </header>

      <div className="assignment-details-layout">
        <section className="page-card assignment-description-card">
          <h2 className="assignment-section-title">Description</h2>
          <p className="assignment-description-text">
            {assignment.description || 'No description provided for this assignment.'}
          </p>
        </section>

        <aside className="assignment-details-sidebar">
          {!isInstructor && (
            <section className="page-card assignment-status-card">
              <h2 className="assignment-section-title">Update Status</h2>
              <div className="assignment-status-stack">
                {STATUSES.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`assignment-status-btn${status === option ? ' active' : ''}`}
                    onClick={() => handleStatusChange(option)}
                  >
                    {option === 'Completed' && <CheckCircle2 size={18} />}
                    {option}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="page-card assignment-details-info-card">
            <h2 className="assignment-section-title">Details</h2>
            <div className="assignment-detail-rows">
              <div className="assignment-detail-row">
                <Calendar size={18} className="assignment-detail-icon" />
                <div>
                  <div className="assignment-detail-label">Due Date</div>
                  <div className="assignment-detail-value">
                    {formatDate(assignment.dueDate, 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </div>
              <div className="assignment-detail-row">
                <Clock size={18} className="assignment-detail-icon" />
                <div>
                  <div className="assignment-detail-label">Created</div>
                  <div className="assignment-detail-value">
                    {formatDate(assignment.createdAt, 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
            </div>
            <div className="assignment-points-block">
              <div className="assignment-detail-label">Points</div>
              <div className="assignment-points-value">{assignment.points ?? 0}</div>
            </div>
          </section>

          {isInstructor && (
            <section className="page-card assignment-actions-card">
              <h2 className="assignment-section-title">Manage</h2>
              <div className="assignment-instructor-actions">
                <Button className="nd-btn-primary w-100" onClick={openEdit}>Edit Assignment</Button>
                <Button variant="outline-danger" className="w-100" onClick={handleDelete}>Delete Assignment</Button>
              </div>
            </section>
          )}
        </aside>
      </div>

      <Modal show={editOpen} onHide={() => setEditOpen(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Assignment</Modal.Title></Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control value={aTitle} onChange={(e) => setATitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={aDesc} onChange={(e) => setADesc(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="datetime-local" value={aDue} onChange={(e) => setADue(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" value={aPoints} onChange={(e) => setAPoints(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" className="w-100">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
