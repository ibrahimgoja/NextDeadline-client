import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function SemesterCourseCard({ course, assignmentCount, onUnenroll }) {
  return (
    <article className="semester-course-card page-card">
      <div className="semester-course-card-top">
        <span className="color-dot semester-course-dot" style={{ background: course.color }} />
        <span className="semester-enrolled-badge">Enrolled</span>
      </div>

      <div className="semester-course-card-body">
        <h3 className="semester-course-code">{course.code}</h3>
        <p className="semester-course-name">{course.name}</p>
        {course.description && (
          <p className="semester-course-description">{course.description}</p>
        )}
        <div className="semester-course-assignments">
          <FileText size={16} />
          <span>{assignmentCount} assignment{assignmentCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="semester-course-card-footer">
        <Link to={`/courses/${course.id}`} className="semester-view-course-btn">
          View Course
        </Link>
        <button type="button" className="semester-unenroll-btn" onClick={onUnenroll}>
          Unenroll
        </button>
      </div>
    </article>
  );
}
