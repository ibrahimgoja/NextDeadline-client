import { Link } from 'react-router-dom';
import { formatDate } from './dateUtils';
import CourseChip from './CourseChip';
import StatusBadge from './StatusBadge';

export default function RecentAssignments({ items }) {
  return (
    <section className="recent-assignments-section">
      <h2 className="section-title">Recent Assignments</h2>
      {items.length === 0 ? (
        <div className="assignments-empty">
          <p>No assignments yet</p>
        </div>
      ) : (
        <div className="assignments-list">
          {items.map(({ assignment, status, course }) => (
            <Link
              key={assignment.id}
              to={`/assignments/${assignment.id}`}
              className="assignment-link"
            >
              <article className="assignment-item">
                <div className="assignment-item-left">
                  <div className="assignment-title">{assignment.title}</div>
                  <div className="assignment-meta">
                    <CourseChip course={course} />
                    <span className="assignment-dot">·</span>
                    <span className="assignment-due">Due {formatDate(assignment.dueDate, 'MMM d')}</span>
                  </div>
                </div>
                <StatusBadge status={status} />
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
