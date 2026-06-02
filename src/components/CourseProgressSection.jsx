import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function CourseProgressSection({ courseProgress }) {
  return (
    <section className="course-progress-section">
      <h2 className="section-title">Course Progress</h2>
      {courseProgress.length === 0 ? (
        <div className="assignments-empty">
          <p className="mb-3">You&apos;re not enrolled in any courses yet</p>
          <Link to="/semesters">
            <Button className="nd-btn-primary">Browse Semesters</Button>
          </Link>
        </div>
      ) : (
        <div className="course-progress-container">
          {courseProgress.map(({ course, completed, total, progress }) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="course-card-link">
              <article className="course-progress-card">
                <div className="course-progress-card-header">
                  <span className="course-dot" style={{ background: course.color }} />
                  <div>
                    <div className="course-code">{course.code}</div>
                    <div className="course-name">{course.name}</div>
                  </div>
                </div>
                <div className="course-progress-bar-row">
                  <span>Progress</span>
                  <span>{completed} / {total}</span>
                </div>
                <div className="course-progress-bar-bg">
                  <div className="course-progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="course-percentage">{progress}% Complete</div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
