export type AppEntryRoute = 'portfolio' | 'primatrie';

export function resolveAppEntryRoute(pathname = window.location.pathname): AppEntryRoute {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized === '/primatrie' ? 'primatrie' : 'portfolio';
}
