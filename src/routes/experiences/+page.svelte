<script lang="ts">
	import ExperienceImageRotator from '$lib/components/ExperienceImageRotator.svelte';
	import { locale } from '$lib/locale.svelte';
	import experiencesEn from '$lib/locales/experiences.en.json';
	import experiencesEs from '$lib/locales/experiences.es.json';

	const t = $derived(locale.current === 'es' ? experiencesEs : experiencesEn);
</script>

<div class="-mt-16">
	<!-- Hero: editorial gallery -->
	<header
		class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-surface pt-32 pb-20"
	>
		<div class="mx-auto w-full max-w-7xl px-8">
			<div class="grid grid-cols-12 items-center gap-6">
				<div class="z-10 col-span-12 mb-16 lg:col-span-5 lg:mb-0">
					<div class="hero-enter">
						<span class="font-body mb-4 block text-xl text-secondary italic md:text-2xl"
							>{t.hero.kicker}</span
						>
						<h1
							class="font-headline mb-8 text-7xl leading-[0.9] tracking-tight text-primary md:text-8xl lg:text-9xl"
						>
							{t.hero.titleLine1}<br />{t.hero.titleLine2}
						</h1>
						<p
							class="font-body mb-10 max-w-sm text-lg leading-relaxed text-on-surface-variant"
						>
							{t.hero.lead}
						</p>
						<div class="h-px w-24 bg-secondary/40"></div>
					</div>
				</div>

				<div class="relative col-span-12 h-[600px] md:h-[800px] lg:col-span-7">
					<div
						class="editorial-shadow stagger-fade-up absolute top-0 right-0 z-0 aspect-[4/5] w-3/4 overflow-hidden rounded-xl md:w-2/3"
						style="animation-delay: 200ms"
					>
						<img
							class="h-full w-full object-cover"
							alt={t.hero.gallery.main.alt}
							src={t.hero.gallery.main.src}
						/>
					</div>
					<div
						class="editorial-shadow stagger-fade-up absolute bottom-[20%] left-0 z-20 aspect-square w-1/2 overflow-hidden rounded-xl border-12 border-surface md:w-5/12"
						style="animation-delay: 400ms"
					>
						<img
							class="h-full w-full object-cover"
							alt={t.hero.gallery.inset1.alt}
							src={t.hero.gallery.inset1.src}
						/>
					</div>
					<div
						class="editorial-shadow stagger-fade-up absolute -bottom-10 right-[10%] z-10 aspect-[3/4] w-2/5 overflow-hidden rounded-xl border-8 border-surface md:w-1/3"
						style="animation-delay: 600ms"
					>
						<img
							class="h-full w-full object-cover"
							alt={t.hero.gallery.inset2.alt}
							src={t.hero.gallery.inset2.src}
						/>
					</div>
				</div>
			</div>
		</div>
	</header>

	<main class="space-y-48 pb-48 pt-24">
		<!-- Volcanic Heart -->
		<section class="px-8">
			<div class="mx-auto max-w-7xl">
				<div class="mb-20">
					<h3 class="font-headline mb-4 text-5xl text-primary-container md:text-7xl">
						{t.volcanic.title}
					</h3>
					<div class="h-1 w-32 bg-secondary/30"></div>
				</div>

				<div class="grid grid-cols-1 items-start gap-16 md:grid-cols-12">
					<div class="md:col-span-7">
						<div class="group relative mb-8 aspect-[4/5] overflow-hidden rounded-xl">
							<ExperienceImageRotator images={t.volcanic.primary.images} />
							<div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset"></div>
						</div>
						<h4 class="font-headline mb-4 text-3xl">{t.volcanic.primary.title}</h4>
						<p class="font-body mb-6 text-lg text-on-surface-variant">
							{t.volcanic.primary.description}
						</p>
						<a
							class="inline-flex items-center gap-2 border-b border-primary/20 pb-1 font-label text-xs tracking-widest text-primary uppercase transition-all hover:border-primary"
							href="/#stillness"
						>
							{t.volcanic.primary.cta}
							<span class="material-symbols-outlined" aria-hidden="true">trending_flat</span>
						</a>
					</div>

					<div class="md:col-span-5 md:mt-32">
						<div class="group relative mb-8 aspect-square overflow-hidden rounded-xl">
							<img
								class="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
								alt={t.volcanic.secondary.imageAlt}
								src={t.volcanic.secondary.image}
							/>
						</div>
						<h4 class="font-headline mb-4 text-2xl">{t.volcanic.secondary.title}</h4>
						<p class="font-body mb-6 text-on-surface-variant">
							{t.volcanic.secondary.description}
						</p>
						<a
							class="inline-flex items-center gap-2 font-label text-xs tracking-widest text-secondary uppercase transition-opacity hover:opacity-70"
							href="/#stillness"
						>
							{t.volcanic.secondary.cta}
						</a>
					</div>
				</div>

				<div class="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2">
					{#each t.volcanic.cards as card}
						{#if card.variant === 'text'}
							<div
								class="flex flex-col justify-between rounded-xl bg-surface-container-low p-12"
							>
								<div>
									<span
										class="font-label mb-4 block text-xs tracking-widest text-secondary uppercase"
										>{card.kicker}</span
									>
									<h4 class="font-headline mb-6 text-2xl">{card.title}</h4>
									<p class="font-body mb-8 leading-relaxed text-on-surface-variant">
										{card.description}
									</p>
								</div>
								<a class="flex items-center gap-2 font-medium text-primary" href="/#stillness">
									{card.cta}
									<span class="material-symbols-outlined text-sm" aria-hidden="true"
										>open_in_new</span
									>
								</a>
							</div>
						{:else}
							<div class="relative min-h-[400px] overflow-hidden rounded-xl">
								<img
									class="absolute inset-0 h-full w-full object-cover"
									alt={card.imageAlt}
									src={card.image}
								/>
								<div
									class="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"
								></div>
								<div class="absolute right-12 bottom-12 left-12 text-white">
									<h4 class="font-headline mb-4 text-3xl">{card.title}</h4>
									<p class="font-body mb-6 opacity-90">{card.description}</p>
									<a
										class="inline-block rounded-full bg-white px-6 py-2 font-label text-xs tracking-widest text-primary uppercase"
										href="/#stillness"
									>
										{card.cta}
									</a>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</section>

		<!-- Wildlife & Water -->
		<section class="bg-primary py-40 text-on-primary">
			<div class="mx-auto max-w-7xl px-8">
				<div class="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
					<div>
						<h3 class="font-headline mb-8 text-5xl md:text-7xl">{t.wildlife.title}</h3>
						<p class="font-body mb-12 text-xl leading-relaxed text-on-primary-container">
							{t.wildlife.lead}
						</p>
						<div class="space-y-16">
							{#each t.wildlife.items as item}
								<div class="group cursor-pointer">
									<h4
										class="font-headline mb-4 text-3xl transition-colors group-hover:text-secondary"
									>
										{item.title}
									</h4>
									<p class="font-body text-on-primary-container">{item.description}</p>
								</div>
							{/each}
						</div>
					</div>
					<div class="relative">
						<div class="aspect-[3/4] overflow-hidden rounded-xl">
							<img
								class="h-full w-full object-cover"
								alt={t.wildlife.imageAlt}
								src={t.wildlife.image}
							/>
						</div>
						<div
							class="absolute -bottom-12 -left-12 hidden aspect-square w-64 overflow-hidden rounded-xl border-8 border-primary md:block"
						>
							<img
								class="h-full w-full object-cover"
								alt={t.wildlife.insetImageAlt}
								src={t.wildlife.insetImage}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- High Canopy & Adventure -->
		<section class="overflow-hidden px-8">
			<div class="mx-auto max-w-7xl">
				<div class="mb-24 flex flex-col items-end justify-between gap-6 md:flex-row">
					<h3 class="font-headline max-w-xl text-5xl text-primary md:text-7xl">
						{t.canopy.title}
					</h3>
					<p class="font-label text-xs tracking-[0.3em] text-secondary uppercase">
						{t.canopy.kicker}
					</p>
				</div>
				<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
					{#each t.canopy.items as item, i}
						<div class="group {i === 1 ? 'md:mt-24' : ''}">
							<div class="relative mb-8 h-[600px] overflow-hidden rounded-xl">
								<img
									class="h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-110"
									alt={item.imageAlt}
									src={item.image}
								/>
								<div
									class="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0"
								></div>
							</div>
							<div class="flex items-start justify-between">
								<div>
									<h4 class="font-headline mb-2 text-3xl">{item.title}</h4>
									<p class="font-body text-on-surface-variant">{item.description}</p>
								</div>
								<span class="material-symbols-outlined text-3xl text-secondary" aria-hidden="true"
									>{item.icon}</span
								>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Evening Ritual -->
		<section class="px-8">
			<div
				class="mx-auto flex max-w-7xl flex-col items-center gap-16 rounded-[3rem] bg-surface-container-high p-12 md:flex-row md:p-24"
			>
				<div class="w-full md:w-1/2">
					<img
						class="rounded-2xl shadow-2xl"
						alt={t.evening.imageAlt}
						src={t.evening.image}
					/>
				</div>
				<div class="w-full md:w-1/2">
					<span
						class="font-label mb-6 block text-xs tracking-widest text-secondary uppercase"
						>{t.evening.kicker}</span
					>
					<h3 class="font-headline mb-8 text-5xl leading-tight text-primary">
						{t.evening.title}
					</h3>
					<p class="font-body mb-10 text-lg leading-relaxed text-on-surface-variant">
						{t.evening.description}
					</p>
					<a
						class="inline-block rounded-full bg-primary px-10 py-4 font-label text-xs tracking-widest text-on-primary uppercase transition-colors hover:bg-secondary"
						href="/#stillness"
					>
						{t.evening.cta}
					</a>
				</div>
			</div>
		</section>
	</main>
</div>
