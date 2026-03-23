export type AppEntryRoute = 'portfolio' | 'primaterie';

export function resolveAppEntryRoute(pathname = window.location.pathname): AppEntryRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized === '/primaterie' ? 'primaterie' : 'portfolio';
}
