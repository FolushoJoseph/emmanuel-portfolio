import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EXPERIENCE = [
  { company: 'Dillali', period: 'Jan 2022 — Oct 2022' },
  { company: 'Lykdat', period: 'Jan 2023 — Mar 2025' },
  { company: 'JAN3', period: 'May 2025 — Sep 2025' },
];

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ padding: '0 var(--page-pad)', flex: 1 }}>
        {/* Bio */}
        <section
          style={{
            paddingTop: '72px',
            paddingBottom: '64px',
          }}
        >
          <p
            className="fade-up"
            style={{
              fontSize: 'clamp(42px, 4vw, 52px)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            Emmanuel Joseph is a brand and marketing designer with a strong focus on building
            distinctive visual identities and high-performing campaigns.
          </p>
          <p
            className="fade-up delay-1"
            style={{
              fontSize: 'clamp(42px, 4vw, 52px)',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              opacity: 0.75,
            }}
          >
            Drawing on his experience across digital products and startups, he combines
            strategic thinking with creative execution to help brands connect with their
            target audience and grow with clarity and impact.
          </p>
        </section>

        {/* Images */}
        <section
          className="fade-up delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '72px',
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                background: 'var(--purple)',
                borderRadius: 'var(--radius-md)',
                aspectRatio: '5/4',
              }}
            />
          ))}
        </section>

        {/* Experience */}
        <section
          className="fade-up delay-3"
          style={{ paddingBottom: '80px', maxWidth: '700px' }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              opacity: 0.5,
              marginBottom: '24px',
            }}
          >
            Experience
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {EXPERIENCE.map(({ company, period }) => (
              <div
                key={company}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '18px 0',
                  borderBottom: '1px solid var(--lavender)',
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 800 }}>{company}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, opacity: 0.6 }}>{period}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
