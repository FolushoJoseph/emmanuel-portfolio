'use client';
import { useState, useRef, CSSProperties } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

export default function InputField({
  label,
  name,
  type = 'text',
  multiline = false,
  required,
  value: controlledValue,
  onChange,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isFloating = focused || value.length > 0;

  const wrapStyle: CSSProperties = {
    position: 'relative',
    background: 'var(--lavender)',
    borderRadius: 'var(--radius-pill)',
    border: focused ? '1.5px solid var(--purple)' : '1.5px solid transparent',
    padding: multiline ? '22px 16px 8px' : isFloating ? '22px 16px 8px' : '0',
    minHeight: multiline ? '120px' : '56px',
    cursor: 'text',
    transition: 'border-color 0.18s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: multiline ? 'flex-start' : 'center',
  };

  const labelStyle: CSSProperties = multiline
    ? {
        position: 'absolute',
        left: '16px',
        top: '8px',
        fontSize: isFloating ? '11px' : '15px',
        fontWeight: 700,
        color: 'var(--purple)',
        opacity: isFloating ? 0.7 : 0.9,
        transition: 'font-size 0.18s, opacity 0.18s',
        pointerEvents: 'none',
        lineHeight: 1,
      }
    : {
        position: 'absolute',
        left: '16px',
        top: isFloating ? '8px' : '50%',
        transform: isFloating ? 'none' : 'translateY(-50%)',
        fontSize: isFloating ? '11px' : '15px',
        fontWeight: 700,
        color: 'var(--purple)',
        opacity: isFloating ? 0.7 : 0.9,
        transition: 'all 0.18s',
        pointerEvents: 'none',
        lineHeight: 1,
      };

  const inputStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--purple)',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: 'inherit',
    width: '100%',
    resize: 'none',
    padding: 0,
    opacity: value.length > 0 ? 1 : 0.5,
    minHeight: multiline ? '80px' : undefined,
  };

  const handleChange = (val: string) => {
    if (onChange) onChange(val);
    else setInternalValue(val);
  };

  return (
    <div style={wrapStyle} onClick={() => ref.current?.focus()}>
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
      {multiline ? (
        <textarea
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      ) : (
        <input
          ref={ref as React.RefObject<HTMLInputElement>}
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      )}
    </div>
  );
}
