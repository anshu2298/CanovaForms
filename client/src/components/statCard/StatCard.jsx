import "./StatCard.css";

const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
}) => {
  return (
    <div className='stat-card'>
      <div className='stat-title'>{title}</div>
      <div className='stat-value'>{value}</div>
      <div
        className={`stat-change ${
          isPositive ? "positive" : "negative"
        }`}
      >
        <span className='change-icon'>
          {isPositive ? "↗" : "↘"}
        </span>
        <span className='change-value'>{change}</span>
      </div>
    </div>
  );
};

export default StatCard;
