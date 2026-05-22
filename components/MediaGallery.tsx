import { Section } from '@/lib/types';

export default function MediaGallery({ sections }: { sections: Section[] }) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {sorted.map((section) => (
        <div key={section.id}>
          {section.type === 'full-image' && (
            <div
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--lavender)',
              }}
            >
              {section.assets[0] ? (
                <img
                  src={section.assets[0]}
                  alt=""
                  style={{ width: '100%', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '16/7', background: 'var(--purple)' }} />
              )}
            </div>
          )}

          {section.type === 'double-image' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--lavender)',
                  }}
                >
                  {section.assets[i] ? (
                    <img
                      src={section.assets[i]}
                      alt=""
                      style={{ width: '100%', display: 'block' }}
                    />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--purple)' }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {section.type === 'video' && (
            <div
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#000',
              }}
            >
              {section.assets[0] ? (
                <video
                  src={section.assets[0]}
                  controls
                  style={{ width: '100%', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--purple)' }} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
