import { Link } from 'react-router-dom';
import NdProgress from './NdProgress';

export default function OverallProgress({ completionRate, completed, total, completedTasks, allTasksCount }) {
  const taskPercent = allTasksCount > 0 ? (completedTasks / allTasksCount) * 100 : 0;

  return (
    <section className="overall-progress-card">
      <h2 className="overall-progress-title">Overall Progress</h2>
      <div className="overall-progress-percentage">{completionRate}%</div>
      <div className="overall-progress-label">Completion Rate</div>
      <div className="progress-row">
        <div className="progress-row-header">
          <span>Completed</span>
          <span>{completed} / {total}</span>
        </div>
        <NdProgress now={completionRate} />
      </div>
      <div className="progress-row mt-3">
        <div className="progress-row-header">
          <span>Tasks Completed</span>
          <span>{completedTasks} / {allTasksCount}</span>
        </div>
        <NdProgress now={taskPercent} />
      </div>
      <Link to="/kanban" className="view-kanban-btn">
        View Kanban Board
      </Link>
    </section>
  );
}
