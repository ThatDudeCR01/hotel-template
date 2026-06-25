import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getCottageCopy, isValidCottageSlug } from '$lib/cottages';

export const load: PageLoad = ({ params }) => {
	if (!isValidCottageSlug(params.slug)) {
		throw error(404, 'Cottage not found');
	}

	return {
		cottageEn: getCottageCopy('en', params.slug),
		cottageEs: getCottageCopy('es', params.slug)
	};
};
