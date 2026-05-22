import { notFound } from 'next/navigation';
import Link from 'next/link';
import FJMonogram from '@/components/FJMonogram';
import ProjectForm from '../../ProjectForm';
import { updateProject } from '../../actions';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Project } from '@/lib/types';

async function getProject(id: string): Promise<Project | null> {
  const { data } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  return data as Project | null;
}

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateProject(id, formData);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
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
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FJMonogram size={40} />
          <span style={{ fontSize: '15px', fontWeight: 700 }}>← Back</span>
        </Link>
        <span style={{ fontSize: '15px', fontWeight: 700, opacity: 0.5 }}>Edit Project</span>
      </nav>

      <main style={{ padding: '40px var(--page-pad) 80px', maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '32px' }}>
          Edit — {project.title}
        </h1>
        <ProjectForm
          project={project}
          onSubmit={handleUpdate}
          submitLabel="Update Project"
        />
      </main>
    </div>
  );
}
