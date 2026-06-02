import { Card } from 'react-bootstrap';
import { BookOpen, FileText, Users, TrendingUp } from 'lucide-react';

const INSTRUCTOR_STAT_META = [
  { key: 'activeCourses', label: 'Active Courses', icon: BookOpen, iconBg: '#dbeafe', iconColor: '#2563eb' },
  { key: 'totalAssignments', label: 'Total Assignments', icon: FileText, iconBg: '#ede9fe', iconColor: '#7c3aed' },
  { key: 'totalStudents', label: 'Total Students', icon: Users, iconBg: '#dcfce7', iconColor: '#16a34a' },
  { key: 'avgCompletion', label: 'Avg Completion', icon: TrendingUp, iconBg: '#fef9c3', iconColor: '#ca8a04', suffix: '%' },
];

export default function InstructorStatCards({ stats }) {
  return (
    <div className="stat-cards-container instructor-stat-cards">
      {INSTRUCTOR_STAT_META.map(({ key, label, icon: Icon, iconBg, iconColor, suffix }) => (
        <Card key={key} className="instructor-stat-card border-0">
          <Card.Body className="d-flex justify-content-between align-items-center py-4">
            <div>
              <div className="stat-card-title text-muted">{label}</div>
              <div className="stat-card-value text-dark">
                {stats[key]}
                {suffix || ''}
              </div>
            </div>
            <div className="instructor-stat-icon" style={{ background: iconBg, color: iconColor }}>
              <Icon />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
