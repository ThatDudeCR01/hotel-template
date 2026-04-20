import type { Handle } from '@sveltejs/kit';

/** Los navegadores piden /favicon.ico por defecto; servimos el SVG en static. */
export const handle: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'GET' && event.url.pathname === '/favicon.ico') {
		return Response.redirect(new URL('/favicon.svg', event.url), 302);
	}
	return resolve(event);
};
