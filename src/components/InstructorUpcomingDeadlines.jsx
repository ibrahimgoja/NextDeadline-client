import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { formatDate, matchId } from './dateUtils';
import CourseChip from './CourseChip';

export default function InstructorUpcomingDeadlines({ courses, items }) {
  return (
    <section className="deadlines-card">
      <div className="deadlines-card-header">
        <span className="deadlines-title">Upcoming Deadlines</span>
        <Link to="/calendar" className="view-calendar-btn">
          <Calendar size={16} /> Calendar
        </Link>
      </div>
      {items.length === 0 ? (
        <div className="deadlines-empty">
          <Calendar size={40} color="#9CA3AF" />
          <p>No upcoming deadlines in the next 7 days</p>
        </div>
      ) : (
        <div className="deadlines-list">
          {items.map((a) => {
            const course = courses.find((c) => matchId(c.id, a.courseId));
            return (
              <Link key={a.id} to={`/assignments/${a.id}`} className="deadline-link">
                <article className="deadline-item">
                  <div className="deadline-item-left">
                    <div className="deadline-item-title">{a.title}</div>
                    <div className="deadline-item-meta">
                      <CourseChip course={course} />
                      <span className="assignment-dot">·</span>
                      <span>Due {formatDate(a.dueDate, 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
