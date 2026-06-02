import { Link } from 'react-router-dom';
import { Trash2, BookOpen, ArrowRight } from 'lucide-react';

export default function SemesterCard({ semester, courses, onDelete }) {
  return (
    <article className="semester-card page-card">
      <div className="semester-card-header">
        <div className="semester-card-heading">
          <h3 className="semester-card-title">{semester.name}</h3>
          <span className="semester-season-badge">
            {semester.season} {semester.year}
          </span>
        </div>
        <button
          type="button"
          className="semester-delete-btn"
          aria-label="Delete semester"
          onClick={onDelete}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="semester-card-body">
        <div className="semester-stat">
          <span className="semester-stat-icon">
            <BookOpen size={16} />
          </span>
          <span className="semester-stat-text">
            {courses.length} enrolled course{courses.length !== 1 ? 's' : ''}
          </span>
        </div>

        {courses.length > 0 && (
          <ul className="semester-course-list">
            {courses.slice(0, 3).map((c) => (
              <li key={c.id} className="semester-course-item">
                <span className="color-dot" style={{ background: c.color }} />
                <span className="semester-course-code">{c.code}</span>
                <span className="semester-course-name">{c.name}</span>
              </li>
            ))}
            {courses.length > 3 && (
              <li className="semester-course-more">+{courses.length - 3} more</li>
            )}
          </ul>
        )}

        <Link to={`/semesters/${semester.id}`} className="semester-view-details">
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
