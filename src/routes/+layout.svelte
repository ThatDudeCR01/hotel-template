<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { locale } from '$lib/locale.svelte';

	let { children } = $props();

	$effect(() => {
		if (!browser) return;
		document.documentElement.lang = locale.current === 'es' ? 'es' : 'en';
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
		rel="stylesheet"
	/>
</svelte:head>

<SiteHeader />
<main class="pt-20">
	{@render children()}
</main>
<SiteFooter />
