'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(_prev: unknown, formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies();
    jar.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
    redirect('/admin');
  }

  return { error: 'Incorrect password.' };
}
