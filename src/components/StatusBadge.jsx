const STATUS_CLASS = {
  Completed: 'completed',
  'In Progress': 'progress',
  'To Do': 'todo',
};

export default function StatusBadge({ status }) {
  const variant = STATUS_CLASS[status] || 'todo';
  return (
    <span className={`status-badge status-${variant}`}>
      {status}
    </span>
  );
}
