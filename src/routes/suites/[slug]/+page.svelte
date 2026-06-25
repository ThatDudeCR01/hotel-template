<script lang="ts">
	import SuiteBooking from '$lib/components/SuiteBooking.svelte';
	import { locale } from '$lib/locale.svelte';
	import sharedEn from '$lib/locales/cottages/shared.en.json';
	import sharedEs from '$lib/locales/cottages/shared.es.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const c = $derived(locale.current === 'es' ? data.cottageEs : data.cottageEn);
	const shared = $derived(locale.current === 'es' ? sharedEs : sharedEn);
</script>

<section class="relative flex min-h-[70vh] items-end overflow-hidden md:min-h-[80vh]">
	<div class="absolute inset-0 z-0 bg-primary">
		<img
			class="h-full w-full object-cover object-center"
			alt={c.hero.imageAlt}
			src={c.hero.image}
		/>
	</div>
	<div class="absolute inset-0 z-10 bg-linear-to-t from-primary/70 via-primary/20 to-transparent"></div>
	<div class="relative z-20 max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
		<span class="font-label mb-4 block text-xs tracking-[0.35em] text-white/80 uppercase"
			>{c.hero.kicker}</span
		>
		<h1 class="font-headline text-5xl leading-tight font-light text-white md:text-7xl lg:text-8xl">
			{c.hero.title}
		</h1>
		{#if 'badge' in c.hero && c.hero.badge}
			<p class="mt-4 text-sm font-semibold tracking-[0.2em] text-secondary-fixed uppercase">
				{c.hero.badge}
			</p>
		{/if}
		<div class="mt-8 flex items-baseline gap-3">
			<span class="font-serif text-4xl text-secondary-fixed md:text-5xl">{c.price}</span>
			<span class="font-label text-xs tracking-widest text-white/80 uppercase">{shared.perNight}</span
			>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
	<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">
		<div>
			<span class="font-label mb-3 block text-xs tracking-widest text-secondary uppercase"
				>{shared.roomFeaturesTitle}</span
			>
			<p class="text-lg leading-relaxed text-on-surface-variant md:text-xl">
				{c.description}
			</p>
			{#if c.features.length > 0}
				<ul class="mt-8 space-y-4">
					{#each c.features as feature}
						<li class="flex items-start gap-3 text-sm font-medium text-on-surface">
							<span class="material-symbols-outlined mt-0.5 text-secondary">{feature.icon}</span>
							<span>{feature.text}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div>
			<span class="font-label mb-3 block text-xs tracking-widest text-secondary uppercase"
				>{shared.amenitiesTitle}</span
			>
			<ul class="grid gap-4 sm:grid-cols-2">
				{#each shared.amenities as amenity}
					<li class="flex items-start gap-3 text-sm leading-snug text-on-surface-variant">
						<span class="material-symbols-outlined mt-0.5 shrink-0 text-secondary"
							>{amenity.icon}</span
						>
						<span>{amenity.text}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div
		class="mt-16 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-8 md:p-10"
	>
		<div class="mb-6 flex flex-wrap items-end justify-between gap-6">
			<h2 class="font-serif text-2xl text-primary md:text-3xl">{shared.ratesTitle}</h2>
			<div class="flex items-baseline gap-2">
				<span class="font-serif text-3xl text-secondary">{c.price}</span>
				<span class="font-label text-[10px] tracking-widest text-on-surface-variant uppercase"
					>{shared.perNight}</span
				>
			</div>
		</div>
		<p class="max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
			{shared.ratesPolicy}
		</p>
	</div>
</section>

<SuiteBooking booking={c.booking} idPrefix={c.slug} />
