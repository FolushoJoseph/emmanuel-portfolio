'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Section, Category } from '@/lib/types';

async function requireAdmin() {
  const jar = await cookies();
  if (jar.get('admin_auth')?.value !== 'true') {
    throw new Error('Unauthorized');
  }
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = formData.get('title') as string;
  const slug = slugify(title);
  const description = formData.get('description') as string;
  const client = formData.get('client') as string;
  const role = formData.get('role') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const categories = formData.getAll('categories') as Category[];
  const credits = formData.get('credits') as string;
  const sectionsJson = formData.get('sections') as string;
  const sections: Section[] = JSON.parse(sectionsJson || '[]');

  /* Cover image upload */
  const coverFile = formData.get('cover_image') as File | null;
  let cover_image = '';
  if (coverFile && coverFile.size > 0) {
    cover_image = await uploadFile(coverFile, 'covers');
  }

  const { error } = await supabaseAdmin.from('projects').insert({
    slug,
    title,
    description,
    client,
    role,
    year,
    categories,
    cover_image,
    published: false,
    sections,
    credits: credits || 'Emmanuel Folusho Joseph',
  });

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/index');
  redirect('/admin');
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const client = formData.get('client') as string;
  const role = formData.get('role') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const categories = formData.getAll('categories') as Category[];
  const credits = formData.get('credits') as string;
  const sectionsJson = formData.get('sections') as string;
  const sections: Section[] = JSON.parse(sectionsJson || '[]');

  const coverFile = formData.get('cover_image') as File | null;
  const updates: Record<string, unknown> = {
    title,
    slug: slugify(title),
    description,
    client,
    role,
    year,
    categories,
    sections,
    credits: credits || 'Emmanuel Folusho Joseph',
    updated_at: new Date().toISOString(),
  };

  if (coverFile && coverFile.size > 0) {
    updates.cover_image = await uploadFile(coverFile, 'covers');
  }

  const { error } = await supabaseAdmin.from('projects').update(updates).eq('id', id);
  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/index');
  revalidatePath(`/project/${updates.slug}`);
  redirect('/admin');
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/index');
}

export async function togglePublished(id: string, published: boolean) {
  await requireAdmin();
  const { error } = await supabaseAdmin
    .from('projects')
    .update({ published, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/index');
}

export async function uploadMediaFile(formData: FormData): Promise<string> {
  await requireAdmin();
  const file = formData.get('file') as File;
  return uploadFile(file, 'media');
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabaseAdmin.storage
    .from('portfolio-media')
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) throw new Error(error.message);

  const { data } = supabaseAdmin.storage
    .from('portfolio-media')
    .getPublicUrl(filename);

  return data.publicUrl;
}
