<script lang="ts">
	import { page } from '$app/state';
	import { locale, setLocale } from '$lib/locale.svelte';
	import layoutEn from '$lib/locales/layout.en.json';
	import layoutEs from '$lib/locales/layout.es.json';

	const l = $derived(locale.current === 'es' ? layoutEs : layoutEn);

	function navLinkClass(active: boolean): string {
		return [
			'pb-1 text-[10px] font-bold tracking-widest uppercase transition-all duration-700 ease-in-out',
			active
				? 'border-b border-stone-900/20 text-stone-900 dark:border-stone-50/30 dark:text-stone-50'
				: 'border-b border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50'
		].join(' ');
	}

	const pathname = $derived(page.url.pathname);
	const hash = $derived(page.url.hash);

	const active = $derived({
		story: pathname === '/' && hash === '#story',
		suites: pathname === '/suites' || pathname.startsWith('/suites/'),
		experiences: pathname === '/' && hash === '#experiences',
		sanctuary: pathname === '/' && hash === '#stillness'
	});
</script>

<header
	class="fixed top-0 z-50 w-full bg-stone-50/80 shadow-[0_32px_64px_-12px_rgba(24,35,26,0.06)] backdrop-blur-xl dark:bg-stone-900/80"
>
	<div class="flex w-full items-center justify-between px-6 py-6 md:px-12">
		<a
			href="/"
			class="shrink-0 font-serif text-2xl tracking-[0.2em] text-stone-900 uppercase dark:text-stone-50"
			>{l.header.brand}</a
		>
		<nav class="hidden flex-1 items-center justify-center gap-10 md:flex">
			<a class={navLinkClass(active.story)} href="/#story">{l.header.nav.story}</a>
			<a class={navLinkClass(active.suites)} href="/suites">{l.header.nav.suites}</a>
			<a class={navLinkClass(active.experiences)} href="/#experiences">{l.header.nav.experiences}</a>
			<a class={navLinkClass(active.sanctuary)} href="/#stillness">{l.header.nav.sanctuary}</a>
		</nav>
		<div class="flex shrink-0 items-center gap-3 md:gap-4">
			<div
				class="flex gap-1 rounded-full border border-stone-200/80 bg-stone-100/90 p-1 dark:border-stone-700 dark:bg-stone-800/90"
				role="group"
				aria-label={l.header.languageAria}
			>
				<button
					class="rounded-full px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors {locale.current === 'en'
						? 'bg-primary text-on-primary'
						: 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'}"
					type="button"
					aria-pressed={locale.current === 'en'}
					onclick={() => setLocale('en')}
				>
					EN
				</button>
				<button
					class="rounded-full px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors {locale.current === 'es'
						? 'bg-primary text-on-primary'
						: 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'}"
					type="button"
					aria-pressed={locale.current === 'es'}
					onclick={() => setLocale('es')}
				>
					ES
				</button>
			</div>
			<a
				href="/#stillness"
				class="scale-100 rounded-full bg-primary px-6 py-3 text-xs font-bold tracking-widest text-on-primary uppercase transition duration-500 ease-in-out active:scale-95 md:px-8"
			>
				{l.header.reserveCta}
			</a>
		</div>
	</div>
</header>
