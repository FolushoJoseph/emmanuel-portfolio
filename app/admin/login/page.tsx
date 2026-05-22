'use client';
import { useActionState } from 'react';
import { adminLogin } from './actions';
import FJMonogram from '@/components/FJMonogram';

export default function AdminLogin() {
  const [state, formAction, pending] = useActionState(adminLogin, null);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--white)',
        padding: '32px',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <FJMonogram size={56} />
      </div>

      <h1
        style={{
          fontSize: '24px',
          fontWeight: 900,
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        Admin Access
      </h1>

      <form
        action={formAction}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          style={{
            background: 'var(--lavender)',
            border: '1.5px solid transparent',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--purple)',
            fontFamily: 'inherit',
            outline: 'none',
            width: '100%',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--purple)')}
          onBlur={(e) => (e.target.style.borderColor = 'transparent')}
        />

        {state?.error && (
          <p style={{ fontSize: '13px', color: '#c00', fontWeight: 600, textAlign: 'center' }}>
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          style={{
            background: 'var(--purple)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.6 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          {pending ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
