import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {
  formatDate, isAfter, isBefore, addDays, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, addMonths, subMonths, isToday, matchId,
} from '../../components/dateUtils';

export default function Calendar({ user }) {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [assignmentProgress, setAssignmentProgress] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fetchData = async () => {
    const res = await fetch('/api/data', {
      headers: { 'X-User-Id': String(user.id) },
    });
    const data = await res.json();
    setAssignments(data.assignments);
    setCourses(data.courses);
    setEnrollments(data.enrollments);
    setAssignmentProgress(data.assignmentProgress);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const enrolled =
    user.role === 'student'
      ? enrollments.filter((e) => matchId(e.studentId, user.id)).map((e) => courses.find((c) => matchId(c.id, e.courseId))).filter(Boolean)
      : courses.filter((c) => matchId(c.instructorId, user.id));
  const courseIds = enrolled.map((c) => c.id);

  const assignmentsByDate = {};
  assignments.filter((a) => courseIds.includes(a.courseId)).forEach((a) => {
    const key = formatDate(new Date(a.dueDate), 'yyyy-MM-dd');
    if (!assignmentsByDate[key]) assignmentsByDate[key] = [];
    assignmentsByDate[key].push(a);
  });

  const calendarDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const getStatus = (a, date) => {
    const prog = assignmentProgress.find((p) => matchId(p.assignmentId, a.id) && matchId(p.studentId, user.id));
    const now = new Date();
    if (prog?.status === 'Completed') return 'completed';
    if (isBefore(date, now)) return 'overdue';
    if (isAfter(date, now) && isBefore(date, addDays(now, 3))) return 'dueSoon';
    return 'upcoming';
  };

  const statusColor = (s) => ({ completed: '#22c55e', overdue: '#ef4444', dueSoon: '#f59e0b', upcoming: '#3b82f6' }[s] || '#3b82f6');

  return (
    <div className="page">
      <div className="page-top">
        <div>
          <h1 className="page-title">Calendar</h1>
          <p className="page-subtitle">View all your assignment deadlines at a glance</p>
        </div>
        <Button variant="outline-primary" onClick={() => setCurrentMonth(new Date())}>Today</Button>
      </div>

      <div className="page-card">
        <div className="page-card-header d-flex justify-content-between align-items-center">
          <div className="page-card-title" style={{ fontSize: 20 }}>{formatDate(currentMonth, 'MMMM yyyy')}</div>
          <div className="d-flex gap-2">
            <Button size="sm" variant="outline-secondary" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>‹</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>›</Button>
          </div>
        </div>
        <div className="page-card-body">
          <div className="cal-legend">
            {[['#ef4444', 'Overdue'], ['#f59e0b', 'Due Soon'], ['#3b82f6', 'Upcoming'], ['#22c55e', 'Completed']].map(([color, label]) => (
              <span key={label} className="d-flex align-items-center gap-2">
                <span className="cal-legend-dot" style={{ background: color }} />{label}
              </span>
            ))}
          </div>
          <div className="cal-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="cal-head-cell">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              const key = formatDate(day, 'yyyy-MM-dd');
              const dayAssignments = assignmentsByDate[key] || [];
              return (
                <div key={idx} className={`cal-day${!isSameMonth(day, currentMonth) ? ' other-month' : ''}${isToday(day) ? ' today' : ''}`}>
                  <div className="cal-day-num">{day.getDate()}</div>
                  {dayAssignments.slice(0, 3).map((a) => (
                      <Link
                        key={a.id}
                        to={`/assignments/${a.id}`}
                        className="cal-event"
                        style={{ background: statusColor(getStatus(a, day)) }}
                        title={a.title}
                      >
                        {a.title}
                      </Link>
                  ))}
                  {dayAssignments.length > 3 && (
                    <div style={{ fontSize: 11, color: '#6b7280' }}>+{dayAssignments.length - 3} more</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
