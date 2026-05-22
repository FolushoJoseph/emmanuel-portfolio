'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px var(--page-pad)',
        marginTop: 'auto',
        borderTop: '1px solid var(--lavender)',
      }}
    >
      <p style={{ fontSize: '13px', fontWeight: 500, opacity: 0.7 }}>
        © Emmanuel Folusho Joseph 2026
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { href: 'https://www.instagram.com/bezybeedesign/', label: 'Instagram' },
          { href: 'https://www.linkedin.com/in/folushojoseph/', label: 'Linkedin' },
          { href: 'https://x.com/FoluJoseph', label: 'Twitter' },
        ].map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--purple)',
              opacity: 0.7,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.7')}
          >
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
