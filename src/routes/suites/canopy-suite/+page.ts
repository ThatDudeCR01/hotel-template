import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSuiteCopy } from '$lib/i18n';

const SUITE_ID = 'canopy-suite';

export const load: PageLoad = () => {
	const suiteEn = getSuiteCopy('en', SUITE_ID);
	const suiteEs = getSuiteCopy('es', SUITE_ID);
	if (!suiteEn || !suiteEs) throw error(404, 'Suite not found');
	return { suiteEn, suiteEs };
};
