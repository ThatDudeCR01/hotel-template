import colibriEn from '$lib/locales/cottages/colibri-cottage.en.json';
import colibriEs from '$lib/locales/cottages/colibri-cottage.es.json';
import mariposaEn from '$lib/locales/cottages/mariposa-cottage.en.json';
import mariposaEs from '$lib/locales/cottages/mariposa-cottage.es.json';
import morphoEn from '$lib/locales/cottages/morpho-cottage.en.json';
import morphoEs from '$lib/locales/cottages/morpho-cottage.es.json';
import poasEn from '$lib/locales/cottages/poas-cottage.en.json';
import poasEs from '$lib/locales/cottages/poas-cottage.es.json';

export const COTTAGE_SLUGS = [
	'mariposa-cottage',
	'colibri-cottage',
	'poas-cottage',
	'morpho-cottage'
] as const;

export type CottageSlug = (typeof COTTAGE_SLUGS)[number];

export type CottageCopy = typeof mariposaEn;

const bundles = {
	en: {
		'mariposa-cottage': mariposaEn,
		'colibri-cottage': colibriEn,
		'poas-cottage': poasEn,
		'morpho-cottage': morphoEn
	},
	es: {
		'mariposa-cottage': mariposaEs,
		'colibri-cottage': colibriEs,
		'poas-cottage': poasEs,
		'morpho-cottage': morphoEs
	}
} as const;

export function isValidCottageSlug(slug: string): slug is CottageSlug {
	return (COTTAGE_SLUGS as readonly string[]).includes(slug);
}

export function getCottageCopy(locale: 'en' | 'es', slug: CottageSlug): CottageCopy {
	return bundles[locale][slug];
}
