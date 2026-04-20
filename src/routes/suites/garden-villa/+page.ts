import type { PageLoad } from './$types';
import suiteEn from '$lib/locales/garden-villa.en.json';
import suiteEs from '$lib/locales/garden-villa.es.json';

export const load: PageLoad = () => ({
	suiteEn,
	suiteEs
});
