import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'home/diplomas/:id', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
