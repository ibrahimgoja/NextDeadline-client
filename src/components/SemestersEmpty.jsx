import { Button } from 'react-bootstrap';

export default function SemestersEmpty({ onAdd }) {
  return (
    <div className="page-card">
      <div className="page-card-body empty-state">
        <div className="empty-icon">📅</div>
        <p>No semesters yet.</p>
        <Button className="nd-btn-primary" onClick={onAdd}>
          + Add Your First Semester
        </Button>
      </div>
    </div>
  );
}
