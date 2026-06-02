export default function DashboardGreeting({ name }) {
  return (
    <div className="dashboard-greeting-container">
      <h1>Welcome back, {name}! 👋</h1>
      <div className="greeting-subText">Here&apos;s your academic overview</div>
    </div>
  );
}
