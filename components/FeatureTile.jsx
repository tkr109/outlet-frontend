export default function FeatureTile({ label, value }) {
  return (
    <div className="feature-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
