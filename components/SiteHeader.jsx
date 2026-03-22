import Link from 'next/link';

export default function SiteHeader({ eyebrow, title, note, actionLabel, actionTo }) {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="header-note">{note}</p>
      </div>
      <Link className="header-chip" href={actionTo}>
        {actionLabel}
      </Link>
    </header>
  );
}
