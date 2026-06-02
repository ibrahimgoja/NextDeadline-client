import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FileText } from 'lucide-react';
import { formatDate, matchId } from './dateUtils';
import CourseChip from './CourseChip';

export default function InstructorRecentAssignments({ courses, assignmentProgress, items }) {
  return (
    <section className="overall-progress-card">
      <h2 className="overall-progress-title">Recent Assignments</h2>
      {items.length === 0 ? (
        <div className="deadlines-empty py-4">
          <FileText size={40} color="#9CA3AF" />
          <p className="mb-3">No assignments created yet</p>
          <Link to="/courses">
            <Button className="nd-btn-primary" size="sm">
              Go to Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="assignments-list">
          {items.map((a) => {
            const course = courses.find((c) => matchId(c.id, a.courseId));
            const recs = assignmentProgress.filter((ap) => matchId(ap.assignmentId, a.id));
            const completedCount = recs.filter((r) => r.status === 'Completed').length;
            return (
              <Link key={a.id} to={`/assignments/${a.id}`} className="assignment-link">
                <article className="assignment-item">
                  <div className="assignment-item-left">
                    <div className="assignment-title">{a.title}</div>
                    <div className="assignment-meta">
                      <CourseChip course={course} />
                      <span className="assignment-dot">·</span>
                      <span className="assignment-due">
                        {completedCount} / {recs.length || 0} completed
                      </span>
                    </div>
                  </div>
                  <span className="assignment-date-badge">
                    {formatDate(a.createdAt, 'MMM d')}
                  </span>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
