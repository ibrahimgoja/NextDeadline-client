import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { BookOpen } from 'lucide-react';

export default function InstructorMyCourses({ courseStats }) {
  return (
    <Card className="course-progress-section border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title mb-0">My Courses</div>
          <Link to="/courses">
            <Button size="sm" variant="outline-primary" className="rounded-3">
              View All
            </Button>
          </Link>
        </div>
        {courseStats.length === 0 ? (
          <div className="assignments-empty text-muted text-center py-4">
            <BookOpen size={48} color="#9CA3AF" className="mb-2" />
            <p className="mb-3">You haven&apos;t created any courses yet</p>
            <Link to="/courses">
              <Button className="nd-btn-primary">Go to Courses</Button>
            </Link>
          </div>
        ) : (
          <div className="course-progress-container">
            {courseStats.map(({ course, assignmentCount, studentCount, avgCompletion }) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="course-card-link text-decoration-none text-dark">
                <div className="course-progress-card p-3 border rounded-3 h-100">
                  <div className="d-flex gap-2 mb-3">
                    <span className="color-dot" style={{ background: course.color }} />
                    <div>
                      <div className="course-code">{course.code}</div>
                      <div className="text-muted small">{course.name}</div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Students</span>
                    <span>{studentCount}</span>
                  </div>
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Assignments</span>
                    <span>{assignmentCount}</span>
                  </div>
                  <div className="d-flex justify-content-between small text-muted">
                    <span>Avg Completion</span>
                    <span>{avgCompletion}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
