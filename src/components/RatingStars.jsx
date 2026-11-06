export default function RatingStars({ value, onChange, size = 18 }) {
  return (
    <div className="stars" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          role={onChange ? 'button' : undefined}
          className={`star ${n <= value ? 'filled' : ''} ${onChange ? 'clickable' : ''}`}
          onClick={onChange ? () => onChange(n) : undefined}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}