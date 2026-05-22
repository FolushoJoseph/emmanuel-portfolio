'use client';
import { useState, useRef, FormEvent } from 'react';
import { Section, SectionType, Category, Project } from '@/lib/types';
import { uploadMediaFile } from './actions';

const CATEGORIES: Category[] = ['Brand', 'Marketing', 'Product'];
const CURRENT_YEAR = new Date().getFullYear();

interface ProjectFormProps {
  project?: Project;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

function Field({
  label,
  name,
  defaultValue = '',
  required,
  multiline,
  labelTop,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  multiline?: boolean;
  labelTop?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState(defaultValue);
  const isFloating = focused || val.length > 0;
  const alwaysTop = labelTop || multiline;

  const wrap = {
    position: 'relative' as const,
    background: 'var(--lavender)',
    borderRadius: '6px',
    border: focused ? '1.5px solid var(--purple)' : '1.5px solid transparent',
    padding: alwaysTop ? '22px 16px 8px' : isFloating ? '22px 16px 8px' : '0',
    minHeight: multiline ? '120px' : '56px',
    cursor: 'text',
    transition: 'border-color 0.18s',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: alwaysTop ? 'flex-start' : 'center',
  };
  const lbl = {
    position: 'absolute' as const,
    left: '16px',
    top: '8px',
    transform: 'none',
    fontSize: alwaysTop ? (isFloating ? '11px' : '15px') : isFloating ? '11px' : '15px',
    fontWeight: 700,
    color: 'var(--purple)',
    opacity: isFloating ? 0.7 : 0.9,
    transition: 'font-size 0.18s, opacity 0.18s',
    pointerEvents: 'none' as const,
    lineHeight: 1,
    ...(alwaysTop ? {} : {
      top: isFloating ? '8px' : '50%',
      transform: isFloating ? 'none' : 'translateY(-50%)',
    }),
  };
  const input = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--purple)',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: 'inherit',
    width: '100%',
    resize: 'none' as const,
    padding: 0,
    minHeight: multiline ? '80px' : undefined,
  };

  return (
    <div style={wrap}>
      <label style={lbl} htmlFor={name}>{label}</label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={input}
        />
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={input}
        />
      )}
    </div>
  );
}

/* ── Upload zone ── */
function UploadZone({
  label,
  accept,
  onUploaded,
  current,
}: {
  label: string;
  accept: string;
  onUploaded: (url: string) => void;
  current?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(current || '');

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const url = await uploadMediaFile(fd);
      setPreview(url);
      onUploaded(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      }}
      style={{
        border: '2px dashed var(--lavender-mid)',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        cursor: 'pointer',
        background: 'var(--lavender)',
        transition: 'border-color 0.15s',
        minHeight: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {preview ? (
        accept.includes('video') ? (
          <video src={preview} style={{ maxHeight: '100px', maxWidth: '100%' }} />
        ) : (
          <img src={preview} alt="" style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
        )
      ) : (
        <p style={{ fontSize: '13px', fontWeight: 600, opacity: 0.6, textAlign: 'center' }}>
          {uploading ? 'Uploading…' : label}
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

/* ── Section row ── */
function SectionBlock({
  section,
  index,
  total,
  onChange,
  onRemove,
  onMove,
}: {
  section: Section;
  index: number;
  total: number;
  onChange: (s: Section) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  function setAsset(i: number, url: string) {
    const assets = [...section.assets];
    assets[i] = url;
    onChange({ ...section, assets });
  }

  return (
    <div
      style={{
        border: '1px solid var(--lavender-mid)',
        borderRadius: '6px',
        padding: '16px',
        background: '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {section.type.replace('-', ' ')}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {index > 0 && (
            <button type="button" onClick={() => onMove(-1)} style={btnSm}>↑</button>
          )}
          {index < total - 1 && (
            <button type="button" onClick={() => onMove(1)} style={btnSm}>↓</button>
          )}
          <button type="button" onClick={onRemove} style={{ ...btnSm, color: '#c00', borderColor: '#c0000040' }}>
            ✕
          </button>
        </div>
      </div>

      {section.type === 'full-image' && (
        <UploadZone
          label="Upload Image (1420 × auto)"
          accept="image/*"
          current={section.assets[0]}
          onUploaded={(url) => setAsset(0, url)}
        />
      )}

      {section.type === 'double-image' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[0, 1].map((i) => (
            <UploadZone
              key={i}
              label="Upload Image (1080 × 1080)"
              accept="image/*"
              current={section.assets[i]}
              onUploaded={(url) => setAsset(i, url)}
            />
          ))}
        </div>
      )}

      {section.type === 'video' && (
        <UploadZone
          label="Upload Video (1920 × 1080)"
          accept="video/*"
          current={section.assets[0]}
          onUploaded={(url) => setAsset(0, url)}
        />
      )}
    </div>
  );
}

const btnSm = {
  padding: '4px 10px',
  borderRadius: '6px',
  border: '1px solid var(--lavender-mid)',
  background: 'transparent',
  color: 'var(--purple)',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
};

/* ── Main form ── */
export default function ProjectForm({ project, onSubmit, submitLabel = 'Save Project' }: ProjectFormProps) {
  const [selectedCats, setSelectedCats] = useState<Category[]>(project?.categories ?? []);
  const [sections, setSections] = useState<Section[]>(project?.sections ?? []);
  const [coverUrl, setCoverUrl] = useState(project?.cover_image ?? '');
  const [submitting, setSubmitting] = useState(false);

  function addSection(type: SectionType) {
    setSections((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type, assets: [], order: prev.length },
    ]);
  }

  function updateSection(i: number, s: Section) {
    setSections((prev) => prev.map((x, idx) => (idx === i ? s : x)));
  }

  function removeSection(i: number) {
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  }

  function moveSection(i: number, dir: -1 | 1) {
    const next = [...sections];
    const swap = i + dir;
    [next[i], next[swap]] = [next[swap], next[i]];
    setSections(next.map((s, idx) => ({ ...s, order: idx })));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    fd.set('sections', JSON.stringify(sections.map((s, i) => ({ ...s, order: i }))));
    fd.delete('cover_image');
    await onSubmit(fd);
    setSubmitting(false);
  }

  const sectionLabel = {
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    opacity: 0.5,
    marginBottom: '12px',
    display: 'block',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Metadata grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Field label="Project name" name="title" defaultValue={project?.title} required labelTop />
        <Field label="Project description" name="description" defaultValue={project?.description} multiline labelTop />
        <Field label="Client" name="client" defaultValue={project?.client} />
        <Field label="Role" name="role" defaultValue={project?.role} />
        <Field label="Year" name="year" defaultValue={project?.year ? String(project.year) : String(CURRENT_YEAR)} required />
        <Field label="Credits" name="credits" defaultValue={project?.credits ?? 'Emmanuel Folusho Joseph'} />
      </div>

      {/* Categories */}
      <div>
        <span style={sectionLabel}>Categories</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          {CATEGORIES.map((cat) => {
            const checked = selectedCats.includes(cat);
            return (
              <label
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: checked ? 'var(--purple)' : 'var(--lavender)',
                  color: checked ? 'var(--white)' : 'var(--purple)',
                  fontSize: '14px',
                  fontWeight: 700,
                  transition: 'background 0.15s',
                }}
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={checked}
                  onChange={(e) =>
                    setSelectedCats((prev) =>
                      e.target.checked ? [...prev, cat] : prev.filter((c) => c !== cat),
                    )
                  }
                  style={{ display: 'none' }}
                />
                {cat}
              </label>
            );
          })}
        </div>
      </div>

      {/* Cover image */}
      <div>
        <span style={sectionLabel}>Cover Image</span>
        <UploadZone
          label="Upload Cover Image"
          accept="image/*"
          current={coverUrl}
          onUploaded={(url) => setCoverUrl(url)}
        />
        <input type="hidden" name="cover_image" value={coverUrl} />
      </div>

      {/* Section builder */}
      <div>
        <span style={sectionLabel}>Content Sections</span>
        {sections.length === 0 && (
          <p style={{ opacity: 0.4, fontSize: '14px', marginBottom: '16px' }}>
            No sections yet. Add one below.
          </p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {sections.map((s, i) => (
            <SectionBlock
              key={s.id}
              section={s}
              index={i}
              total={sections.length}
              onChange={(updated) => updateSection(i, updated)}
              onRemove={() => removeSection(i)}
              onMove={(dir) => moveSection(i, dir)}
            />
          ))}
        </div>

        {/* Add section buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button type="button" onClick={() => addSection('full-image')} style={addBtn}>
            + Full image
          </button>
          <button type="button" onClick={() => addSection('double-image')} style={addBtn}>
            + Double image
          </button>
          <button type="button" onClick={() => addSection('video')} style={{ ...addBtn, gridColumn: '1 / -1' }}>
            + Video
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          background: 'var(--purple)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          padding: '16px',
          fontSize: '15px',
          fontWeight: 700,
          fontFamily: 'inherit',
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.6 : 1,
          transition: 'opacity 0.15s',
        }}
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}

const addBtn: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--purple)',
  border: '1.5px solid var(--purple)',
  borderRadius: 'var(--radius-pill)',
  padding: '12px',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: 'inherit',
  cursor: 'pointer',
};
