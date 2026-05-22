'use client';
import Link from 'next/link';
import { Project } from '@/lib/types';

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/project/${project.slug}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr auto',
        gap: '16px',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid var(--lavender)',
        textDecoration: 'none',
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
    >
      <span style={{ fontSize: '18px', fontWeight: 800 }}>{project.title}</span>
      <span style={{ fontSize: '15px', fontWeight: 500, opacity: 0.7 }}>
        {project.categories.join(', ')}
      </span>
      <span style={{ fontSize: '15px', fontWeight: 700, textAlign: 'right' }}>
        {project.year}
      </span>
    </Link>
  );
}
