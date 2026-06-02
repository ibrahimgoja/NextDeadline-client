import { Card } from 'react-bootstrap';

export default function StatCards({ statCards }) {
  return (
    <div className="stat-cards-container">
      {statCards.map(({ label, value, icon: Icon, bg }) => (
        <Card key={label} className="stat-card border-0 text-white" style={{ background: bg }}>
          <Card.Body className="d-flex justify-content-between align-items-center py-4">
            <div>
              <div className="stat-card-title">{label}</div>
              <div className="stat-card-value">{value}</div>
            </div>
            <div className="stat-card-icon">
              <Icon />
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
