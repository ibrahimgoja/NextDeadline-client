import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import { formatDate, isPast, isValid, matchId } from '../../components/dateUtils';

const STATUSES = ['To Do', 'In Progress', 'Completed'];

export default function KanbanBoard({ user, onNotify }) {
  const [assignments, setAssignments] = useState([]);
  const [assignmentProgress, setAssignmentProgress] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { 'X-User-Id': String(user.id) },
    });
    const data = await res.json();
    setAssignments(data.assignments);
    setAssignmentProgress(data.assignmentProgress);
    setCourses(data.courses);
    setEnrollments(data.enrollments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAssignmentProgress = async (assignmentId, status) => {
    await fetch(`/api/progress/${assignmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': String(user.id),
      },
      body: JSON.stringify({ status }),
    });
    fetchData();
    onNotify('Status updated');
  };

  const enrolledCourses = enrollments
    .filter((e) => matchId(e.studentId, user.id))
    .map((e) => courses.find((c) => matchId(c.id, e.courseId)))
    .filter(Boolean);
  const courseIds = enrolledCourses.map((c) => c.id);
  const myAssignments = assignments.filter((a) => courseIds.includes(a.courseId));

  const grouped = { 'To Do': [], 'In Progress': [], 'Completed': [] };
  myAssignments.forEach((a) => {
    const status = assignmentProgress.find((ap) => matchId(ap.assignmentId, a.id) && matchId(ap.studentId, user.id))?.status || 'To Do';
    grouped[status].push(a);
  });

  const getStatus = (aId) =>
    assignmentProgress.find((ap) => matchId(ap.assignmentId, aId) && matchId(ap.studentId, user.id))?.status || 'To Do';

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const aId = e.dataTransfer.getData('text/plain');
    if (aId && getStatus(aId) !== newStatus) updateAssignmentProgress(aId, newStatus);
    setDraggedId(null);
    setDragOverStatus(null);
  };

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Kanban Board</h1>
        <p className="page-subtitle">Drag assignments between columns to update their status</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="page-card">
          <div className="page-card-body empty-state">
            <p>Enroll in courses to see assignments here.</p>
            <Link to="/semesters"><Button className="nd-btn-primary">Browse Semesters</Button></Link>
          </div>
        </div>
      ) : (
        <div className="kanban-board">
          {STATUSES.map((status) => {
            const items = grouped[status];
            const isDropTarget = dragOverStatus === status;
            return (
              <div
                key={status}
                className="kanban-col"
                onDragOver={(e) => { e.preventDefault(); setDragOverStatus(status); }}
                onDragLeave={() => setDragOverStatus((s) => (s === status ? null : s))}
                onDrop={(e) => handleDrop(e, status)}
              >
                <div className="page-card">
                  <div className="page-card-header d-flex justify-content-between">
                    <span className="page-card-title">{status}</span>
                    <Badge bg="secondary">{items.length}</Badge>
                  </div>
                  <div className={`page-card-body kanban-drop-area${isDropTarget ? ' kanban-empty drop-active' : ''}`}>
                    {items.length === 0 ? (
                      <div className={`kanban-empty${isDropTarget ? ' drop-active' : ''}`}>
                        {isDropTarget ? 'Drop here' : 'No assignments'}
                      </div>
                    ) : (
                      items.map((a) => {
                        const course = courses.find((c) => matchId(c.id, a.courseId));
                        const dueDate = a.dueDate ? new Date(a.dueDate) : null;
                        const overdue = dueDate && isValid(dueDate) && isPast(dueDate) && status !== 'Completed';
                        const dragging = draggedId === a.id;
                        return (
                          <div
                            key={a.id}
                            draggable
                            onDragStart={(e) => { setDraggedId(a.id); e.dataTransfer.setData('text/plain', String(a.id)); }}
                            onDragEnd={() => { setDraggedId(null); setDragOverStatus(null); }}
                            className={`kanban-card-item${dragging ? ' dragging' : ''}`}
                            style={{ borderLeftColor: course?.color || '#ccc' }}
                          >
                            <div className="d-flex gap-2">
                              <span className="drag-handle">⠿</span>
                              <div className="flex-grow-1">
                                <Link to={`/assignments/${a.id}`} className="text-decoration-none list-item-title" style={{ fontSize: 14 }}>{a.title}</Link>
                                <div>
                                  <span className="course-chip" style={{ background: `${course?.color}20`, color: course?.color }}>{course?.code}</span>
                                </div>
                                {dueDate && isValid(dueDate) && (
                                  <div style={{ fontSize: 12, color: overdue ? '#dc2626' : '#6b7280', marginTop: 6 }}>
                                    {overdue ? 'Overdue · ' : 'Due '}{formatDate(dueDate, 'MMM d, h:mm a')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
