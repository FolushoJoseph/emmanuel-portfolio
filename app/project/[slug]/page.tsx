import { notFound } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediaGallery from '@/components/MediaGallery';
import { supabase } from '@/lib/supabase';
import { Project } from '@/lib/types';

async function getProject(slug: string): Promise<Project | null> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data as Project | null;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        projectTitle={project.title}
        projectCategories={project.categories}
        projectYear={project.year}
      />

      <main style={{ flex: 1 }}>
        {/* Hero cover */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16/8',
            background: 'var(--purple)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {project.cover_image && (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
          )}
        </div>

        {/* Info block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            padding: '48px var(--page-pad)',
          }}
        >
          {/* Description */}
          <div>
            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 20px)',
                fontWeight: 700,
                lineHeight: 1.55,
                whiteSpace: 'pre-wrap',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Project', value: project.title },
              { label: 'Client', value: project.client },
              { label: 'Role', value: project.role },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: '11px', fontWeight: 600, opacity: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {label}
                </p>
                <p style={{ fontSize: '16px', fontWeight: 800 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {project.sections.length > 0 && (
          <div style={{ padding: '0 var(--page-pad) 48px' }}>
            <MediaGallery sections={project.sections} />
          </div>
        )}

        {/* Credits */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: '24px var(--page-pad)',
            borderTop: '1px solid var(--lavender)',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Credits
          </span>
          <div style={{ display: 'flex', gap: '32px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>
              {project.credits || 'Emmanuel Folusho Joseph'}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 500, opacity: 0.6 }}>
              Creative Director & Brand Designer
            </span>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          main > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          main > div:nth-child(4) {
            flex-direction: column !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
