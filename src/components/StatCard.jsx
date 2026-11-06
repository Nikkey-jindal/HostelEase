export default function StatCard({ icon, label, value, accent = 'primary' }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <span className="stat-icon">{icon}</span>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}