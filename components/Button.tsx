import { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'solid' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'solid',
  type = 'button',
  onClick,
  disabled,
  fullWidth,
  icon,
}: ButtonProps) {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 24px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'opacity 0.15s, transform 0.15s',
    width: fullWidth ? '100%' : undefined,
    justifyContent: fullWidth ? 'center' : undefined,
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    fontFamily: 'inherit',
  };

  const solidStyle: CSSProperties = {
    ...base,
    background: 'var(--purple)',
    color: 'var(--white)',
  };

  const outlinedStyle: CSSProperties = {
    ...base,
    background: 'transparent',
    color: 'var(--purple)',
    border: '1.5px solid var(--purple)',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={variant === 'solid' ? solidStyle : outlinedStyle}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '1';
      }}
    >
      {children}
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
}
