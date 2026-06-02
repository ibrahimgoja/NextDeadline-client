import { Link } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';

export default function InstructorCourseCard({ course, assignmentCount, studentCount, onDelete }) {
  return (
    <article className="semester-course-card page-card">
      <div className="semester-course-card-top">
        <span className="color-dot semester-course-dot" style={{ background: course.color }} />
        <span className="semester-enrolled-badge">Active</span>
      </div>

      <div className="semester-course-card-body">
        <h3 className="semester-course-code">{course.code}</h3>
        <p className="semester-course-name">{course.name}</p>
        {course.description && (
          <p className="semester-course-description">{course.description}</p>
        )}
        <div className="semester-course-assignments">
          <Users size={16} />
          <span>{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="semester-course-assignments">
          <FileText size={16} />
          <span>{assignmentCount} assignment{assignmentCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="semester-course-card-footer">
        <Link to={`/courses/${course.id}`} className="semester-view-course-btn">
          Manage Course
        </Link>
        <button type="button" className="semester-unenroll-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
