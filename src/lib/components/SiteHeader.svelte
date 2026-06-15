<script lang="ts">
	import { page } from '$app/state';
	import { locale, setLocale } from '$lib/locale.svelte';
	import layoutEn from '$lib/locales/layout.en.json';
	import layoutEs from '$lib/locales/layout.es.json';

	const l = $derived(locale.current === 'es' ? layoutEs : layoutEn);

	let mobileMenuOpen = $state(false);
	let menuContainerEl = $state<HTMLDivElement | null>(null);

	function navLinkClass(active: boolean): string {
		return [
			'pb-1 text-[10px] font-bold tracking-widest uppercase transition-all duration-700 ease-in-out',
			active
				? 'border-b border-stone-900/20 text-stone-900 dark:border-stone-50/30 dark:text-stone-50'
				: 'border-b border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50'
		].join(' ');
	}

	function mobileNavLinkClass(active: boolean): string {
		return [
			'block w-full px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase transition-colors',
			active
				? 'bg-stone-200/80 text-stone-900 dark:bg-stone-800 dark:text-stone-50'
				: 'text-stone-600 hover:bg-stone-100/90 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800/60 dark:hover:text-stone-50'
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

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	$effect(() => {
		void pathname;
		void hash;
		mobileMenuOpen = false;
	});

	$effect(() => {
		if (!mobileMenuOpen) return;
		const onDoc = (e: MouseEvent) => {
			const el = menuContainerEl;
			if (!el) return;
			const t = e.target;
			if (t instanceof Node && !el.contains(t)) closeMobileMenu();
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMobileMenu();
		};
		document.addEventListener('click', onDoc, true);
		window.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onDoc, true);
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<header
	class="site-header-enter fixed top-0 z-50 w-full bg-stone-50 shadow-[0_32px_64px_-12px_rgba(24,35,26,0.06)] dark:bg-stone-900"
>
	<div
		class="flex w-full items-center justify-between gap-4 px-6 py-6 md:px-12"
	>
		<a
			href="/"
			class="min-w-0 shrink font-serif text-xl tracking-[0.2em] text-stone-900 uppercase sm:text-2xl dark:text-stone-50"
			>{l.header.brand}</a
		>
		<nav class="hidden flex-1 items-center justify-center gap-10 md:flex">
			<a class={navLinkClass(active.story)} href="/#story">{l.header.nav.story}</a>
			<a class={navLinkClass(active.suites)} href="/suites">{l.header.nav.suites}</a>
			<a class={navLinkClass(active.experiences)} href="/#experiences">{l.header.nav.experiences}</a>
			<a class={navLinkClass(active.sanctuary)} href="/#stillness">{l.header.nav.sanctuary}</a>
		</nav>
		<div class="flex shrink-0 items-center gap-3 md:gap-4">
			<div class="relative md:hidden" bind:this={menuContainerEl}>
				<button
					type="button"
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200/80 bg-stone-100/90 text-stone-900 transition-colors hover:bg-stone-200/80 dark:border-stone-700 dark:bg-stone-800/90 dark:text-stone-50 dark:hover:bg-stone-700/80"
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-nav-dropdown"
					aria-haspopup="true"
					aria-label={l.header.menuAria}
					onclick={toggleMobileMenu}
				>
					{#if mobileMenuOpen}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<line x1="6" y1="6" x2="18" y2="18" />
							<line x1="18" y1="6" x2="6" y2="18" />
						</svg>
					{:else}
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					{/if}
				</button>
				{#if mobileMenuOpen}
					<nav
						id="mobile-nav-dropdown"
						class="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[min(100vw-3rem,16rem)] rounded-xl border border-stone-200/90 bg-stone-50/98 py-2 shadow-xl backdrop-blur-xl dark:border-stone-700 dark:bg-stone-900/98"
						aria-label={l.header.menuNavAria}
					>
						<ul class="flex flex-col">
							<li>
								<a
									class={mobileNavLinkClass(active.story)}
									href="/#story"
									onclick={closeMobileMenu}>{l.header.nav.story}</a
								>
							</li>
							<li>
								<a
									class={mobileNavLinkClass(active.suites)}
									href="/suites"
									onclick={closeMobileMenu}>{l.header.nav.suites}</a
								>
							</li>
							<li>
								<a
									class={mobileNavLinkClass(active.experiences)}
									href="/#experiences"
									onclick={closeMobileMenu}>{l.header.nav.experiences}</a
								>
							</li>
							<li>
								<a
									class={mobileNavLinkClass(active.sanctuary)}
									href="/#stillness"
									onclick={closeMobileMenu}>{l.header.nav.sanctuary}</a
								>
							</li>
						</ul>
						<div
							class="mt-2 border-t border-stone-200/80 px-4 pt-3 pb-3 dark:border-stone-700"
						>
							<div
								class="flex w-full justify-stretch gap-1 rounded-full border border-stone-200/80 bg-stone-100/90 p-1 dark:border-stone-700 dark:bg-stone-800/90"
								role="group"
								aria-label={l.header.languageAria}
							>
								<button
									class="min-h-11 flex-1 rounded-full px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors {locale.current === 'en'
										? 'bg-primary text-on-primary'
										: 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'}"
									type="button"
									aria-pressed={locale.current === 'en'}
									onclick={() => {
										setLocale('en');
										closeMobileMenu();
									}}
								>
									EN
								</button>
								<button
									class="min-h-11 flex-1 rounded-full px-3 py-2 text-xs font-bold tracking-widest uppercase transition-colors {locale.current === 'es'
										? 'bg-primary text-on-primary'
										: 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'}"
									type="button"
									aria-pressed={locale.current === 'es'}
									onclick={() => {
										setLocale('es');
										closeMobileMenu();
									}}
								>
									ES
								</button>
							</div>
						</div>
					</nav>
				{/if}
			</div>
			<div class="hidden items-center gap-3 md:flex md:gap-4">
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
	</div>
</header>
