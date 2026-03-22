export default function Card({ title, children }) {
  return (
    <article className="panel">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">{title}</p>
        </div>
      </div>
      {children}
    </article>
  );
}
