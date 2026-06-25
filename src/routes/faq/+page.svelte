<script lang="ts">
	import { locale } from '$lib/locale.svelte';
	import faqEn from '$lib/locales/faq.en.json';
	import faqEs from '$lib/locales/faq.es.json';

	const t = $derived(locale.current === 'es' ? faqEs : faqEn);
</script>

<div class="pt-12">
	<!-- Hero -->
	<section class="mb-24 px-8 md:px-24">
		<div class="mx-auto max-w-4xl">
			<span
				class="label-md mb-6 block font-medium uppercase tracking-[0.3em] text-secondary"
				>{t.hero.kicker}</span
			>
			<h1 class="mb-8 text-5xl leading-tight font-light md:text-7xl">
				{t.hero.titleLine1}
				<span class="font-serif italic"> {t.hero.titleLine2}</span>
			</h1>
			<p class="max-w-2xl text-lg leading-relaxed font-light text-on-surface-variant">
				{t.hero.lead}
			</p>
		</div>
	</section>

	<!-- Location -->
	<section class="mb-24 px-8 md:px-24">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8 flex items-center gap-4">
				<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
					>{t.location.icon}</span
				>
				<h2 class="font-serif text-3xl font-light md:text-4xl">{t.location.title}</h2>
			</div>
			<div class="space-y-6">
				{#each t.location.paragraphs as paragraph}
					<p class="text-lg leading-loose font-light text-on-surface-variant">{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- Taxi -->
	<section class="mb-24 bg-surface-container-low px-8 py-16 md:px-24 md:py-20">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8 flex items-center gap-4">
				<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
					>{t.taxi.icon}</span
				>
				<h2 class="font-serif text-3xl font-light md:text-4xl">{t.taxi.title}</h2>
			</div>
			<p
				class="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 font-serif text-xl leading-relaxed italic text-on-surface md:text-2xl"
			>
				{t.taxi.text}
			</p>
		</div>
	</section>

	<!-- Driving directions -->
	<section class="mb-24 px-8 md:px-24">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8 flex items-center gap-4">
				<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
					>{t.driving.icon}</span
				>
				<h2 class="font-serif text-3xl font-light md:text-4xl">{t.driving.title}</h2>
			</div>
			<p class="mb-10 text-lg leading-loose font-light text-on-surface-variant">
				{t.driving.intro}
			</p>
			<h3 class="mb-8 font-serif text-2xl italic text-primary md:text-3xl">
				{t.driving.subtitle}
			</h3>
			<ol class="space-y-6">
				{#each t.driving.steps as step, i}
					<li class="flex gap-5">
						<span
							class="font-label mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-bold text-secondary"
							>{i + 1}</span
						>
						<p class="leading-loose font-light text-on-surface-variant">{step}</p>
					</li>
				{/each}
			</ol>
			<p class="mt-10 border-t border-outline-variant/20 pt-10 text-lg leading-loose font-light text-on-surface-variant">
				{t.driving.footer}
			</p>
		</div>
	</section>

	<!-- Driving times -->
	<section class="mb-24 bg-surface-container-low px-8 py-16 md:px-24 md:py-20">
		<div class="mx-auto max-w-5xl">
			<div class="mb-8 flex items-center gap-4">
				<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
					>{t.attractions.icon}</span
				>
				<h2 class="font-serif text-3xl font-light md:text-4xl">{t.attractions.title}</h2>
			</div>
			<p class="mb-12 max-w-3xl text-lg leading-loose font-light text-on-surface-variant">
				{t.attractions.note}
			</p>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each t.attractions.items as item}
					<div
						class="flex items-center justify-between rounded-xl bg-surface-container-lowest px-6 py-5"
					>
						<span class="text-sm font-medium text-on-surface">{item.name}</span>
						<span
							class="font-label shrink-0 text-[10px] font-bold tracking-widest text-secondary uppercase"
							>{item.time}</span
						>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Weather -->
	<section class="mb-24 px-8 md:px-24">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8 flex items-center gap-4">
				<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
					>{t.weather.icon}</span
				>
				<h2 class="font-serif text-3xl font-light md:text-4xl">{t.weather.title}</h2>
			</div>
			<div class="space-y-6">
				{#each t.weather.paragraphs as paragraph}
					<p class="text-lg leading-loose font-light text-on-surface-variant">{paragraph}</p>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact CTA -->
	<section class="mb-32 px-8 md:px-24">
		<div
			class="mx-auto max-w-4xl rounded-[2rem] bg-primary px-8 py-16 text-center text-on-primary md:px-16"
		>
			<h2 class="mb-4 font-serif text-3xl font-light italic md:text-4xl">{t.contactCta.title}</h2>
			<p class="mb-10 font-light text-white/80">{t.contactCta.body}</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
				<a
					class="font-label rounded-full border border-white/20 px-8 py-4 text-xs tracking-widest uppercase transition hover:bg-white/10"
					href="tel:+50624448833"
				>
					{t.contactCta.phone1}
				</a>
				<a
					class="font-label rounded-full bg-white px-8 py-4 text-xs tracking-widest text-primary uppercase transition hover:bg-secondary hover:text-white"
					href="tel:+50686562467"
				>
					{t.contactCta.phone2}
				</a>
			</div>
		</div>
	</section>
</div>
