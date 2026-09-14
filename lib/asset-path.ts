export function assetPath(source: string): string {
  return source.startsWith('/') ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${source}` : source;
}
