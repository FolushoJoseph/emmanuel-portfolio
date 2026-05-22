'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Project } from '@/lib/types';
import { deleteProject, togglePublished } from './actions';

export default function AdminProjectList({ projects }: { projects: Project[] }) {
  const [list, setList] = useState(projects);

  async function handleToggle(id: string, current: boolean) {
    await togglePublished(id, !current);
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !current } : p)),
    );
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteProject(id);
    setList((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {list.map((project) => (
        <div
          key={project.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            borderBottom: '1px solid var(--lavender)',
            gap: '16px',
          }}
        >
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <span style={{ fontSize: '17px', fontWeight: 800 }}>{project.title}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-pill)',
                  background: project.published ? 'var(--purple)' : 'var(--lavender)',
                  color: project.published ? 'var(--white)' : 'var(--purple)',
                }}
              >
                {project.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.55 }}>
              {project.categories.join(', ')} · {project.year}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button
              onClick={() => handleToggle(project.id, project.published)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--purple)',
                background: 'transparent',
                color: 'var(--purple)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {project.published ? 'Unpublish' : 'Publish'}
            </button>

            <Link
              href={`/admin/edit/${project.id}`}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--lavender)',
                color: 'var(--purple)',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(project.id, project.title)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'transparent',
                border: '1.5px solid rgba(180,0,0,0.3)',
                color: '#c00',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
