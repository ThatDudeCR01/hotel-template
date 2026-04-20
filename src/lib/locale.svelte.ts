import { browser } from '$app/environment';
import type { Locale } from '$lib/i18n';

const STORAGE_KEY = 'sanctuary-locale';

function readStoredLocale(): Locale {
	if (!browser) return 'en';
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		return v === 'es' ? 'es' : 'en';
	} catch {
		return 'en';
	}
}

/** Estado global de idioma. Solo se muta `.current` (requisito de Svelte al exportar `$state`). */
export const locale = $state<{ current: Locale }>({
	current: readStoredLocale()
});

export function setLocale(next: Locale): void {
	locale.current = next;
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.lang = next === 'es' ? 'es' : 'en';
	} catch {
		/* ignore */
	}
}
