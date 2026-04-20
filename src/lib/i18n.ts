import en from './locales/en.json';
import es from './locales/es.json';

export type Locale = 'en' | 'es';

const bundles = { en, es } as const;

export type SuiteCopy = (typeof en)['suites'][keyof (typeof en)['suites']];

export function getSuiteCopy<L extends Locale, K extends keyof typeof en.suites>(
	locale: L,
	id: K
): (typeof bundles)[L]['suites'][K] | undefined {
	const pack = bundles[locale];
	return pack.suites[id];
}

export function isValidSuiteId(id: string): id is keyof (typeof en)['suites'] {
	return id in en.suites;
}
