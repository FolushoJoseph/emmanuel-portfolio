'use client';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InputField from '@/components/InputField';
import Button from '@/components/Button';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function Contact() {
  const [fields, setFields] = useState({
    fullname: '',
    organization: '',
    subject: '',
    message: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function setField(key: keyof typeof fields) {
    return (val: string) => setFields((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fields.fullname,
          organization: fields.organization,
          subject: fields.subject,
          message: fields.message,
          from_email: fields.email,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('success');
      setFields({ fullname: '', organization: '', subject: '', message: '', email: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main
        style={{
          padding: '72px var(--page-pad) 80px',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="fade-up"
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <InputField
            label="Full name"
            name="fullname"
            required
            value={fields.fullname}
            onChange={setField('fullname')}
          />
          <InputField
            label="Associated organization"
            name="organization"
            value={fields.organization}
            onChange={setField('organization')}
          />
          <InputField
            label="Subject"
            name="subject"
            required
            value={fields.subject}
            onChange={setField('subject')}
          />
          <InputField
            label="Message"
            name="message"
            multiline
            required
            value={fields.message}
            onChange={setField('message')}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={setField('email')}
          />

          <div style={{ marginTop: '8px' }}>
            <Button type="submit" fullWidth disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit'}
            </Button>
          </div>

          {status === 'success' && (
            <p style={{ fontSize: '14px', fontWeight: 600, opacity: 0.7, textAlign: 'center' }}>
              Message sent — I&apos;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#c00', textAlign: 'center' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* Copy */}
        <div className="fade-up delay-1" style={{ paddingTop: '8px' }}>
          <p
            style={{
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              fontWeight: 800,
              lineHeight: 1.4,
              marginBottom: '24px',
            }}
          >
            I&apos;m open to working with businesses and teams looking to build strong,
            effective brands and marketing design, and always open to connecting with
            people doing interesting work.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.6, opacity: 0.7 }}>
            If you have a project in mind or just want to start a conversation, fill
            out the form and I&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          main {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
