import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectRow from '@/components/ProjectRow';
import { getProjects } from '@/lib/projects';

export default async function WorkIndexPage() {
  const projects = await getProjects();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ padding: '64px var(--page-pad) 80px', flex: 1 }}>
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: '16px',
            padding: '0 0 16px',
            borderBottom: '1px solid var(--purple)',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.5 }}>
            Project
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.5 }}>
            Category
          </span>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.5, textAlign: 'right' }}>
            Year
          </span>
        </div>

        {projects.length === 0 ? (
          <p style={{ paddingTop: '32px', opacity: 0.4, fontSize: '16px' }}>No projects yet.</p>
        ) : (
          <div className="fade-up">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
