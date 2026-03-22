export default function BillRow({ label, value, emphasize = false }) {
  return (
    <div className={emphasize ? 'bill-row total' : 'bill-row'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
