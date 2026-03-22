export default function TimingBlock({ title, value }) {
  return (
    <div className="timing-block">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}
