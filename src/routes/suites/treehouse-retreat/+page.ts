import type { PageLoad } from './$types';
import treehouseEn from '$lib/locales/treehouse-retreat.en.json';
import treehouseEs from '$lib/locales/treehouse-retreat.es.json';

export const load: PageLoad = () => ({
	suiteEn: treehouseEn,
	suiteEs: treehouseEs
});
