export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Project } from '@/lib/types';
import AdminProjectList from './AdminProjectList';
import FJMonogram from '@/components/FJMonogram';

async function getAllProjects(): Promise<Project[]> {
  const { data } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return (data as Project[]) ?? [];
}

export default async function AdminPage() {
  const projects = await getAllProjects();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      {/* Admin Nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--page-pad)',
          height: 'var(--nav-height)',
          borderBottom: '1px solid var(--lavender)',
          position: 'sticky',
          top: 0,
          background: 'var(--white)',
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FJMonogram size={40} />
          <span style={{ fontSize: '15px', fontWeight: 700 }}>CMS</span>
        </Link>
        <Link
          href="/admin/new"
          style={{
            background: 'var(--purple)',
            color: 'var(--white)',
            padding: '10px 20px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '14px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'opacity 0.15s',
          }}
        >
          + Add Project
        </Link>
      </nav>

      <main style={{ padding: '40px var(--page-pad)', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '32px' }}>
          Projects ({projects.length})
        </h1>
        {projects.length === 0 ? (
          <p style={{ opacity: 0.5 }}>No projects yet. Add your first one.</p>
        ) : (
          <AdminProjectList projects={projects} />
        )}
      </main>
    </div>
  );
}
