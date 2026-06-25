<script lang="ts">
	import { browser } from '$app/environment';

	type Slide = { src: string; alt: string };

	let {
		images,
		intervalMs = 5500
	}: {
		images: Slide[];
		intervalMs?: number;
	} = $props();

	let active = $state(0);

	$effect(() => {
		if (!browser || images.length <= 1) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const id = window.setInterval(() => {
			active = (active + 1) % images.length;
		}, intervalMs);

		return () => window.clearInterval(id);
	});

	function goTo(index: number) {
		active = index;
	}
</script>

<div class="relative h-full w-full">
	{#each images as image, i}
		<img
			class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2s] ease-in-out {i === active
				? 'opacity-100'
				: 'opacity-0'}"
			alt={image.alt}
			src={image.src}
			loading={i === 0 ? 'eager' : 'lazy'}
		/>
	{/each}

	{#if images.length > 1}
		<div
			class="absolute right-4 bottom-4 z-10 flex gap-2"
			role="tablist"
			aria-label="Experience photos"
		>
			{#each images as _, i}
				<button
					type="button"
					class="h-2 w-2 rounded-full transition-all duration-500 {i === active
						? 'scale-125 bg-white'
						: 'bg-white/45 hover:bg-white/70'}"
					role="tab"
					aria-selected={i === active}
					aria-label="Photo {i + 1} of {images.length}"
					onclick={() => goTo(i)}
				></button>
			{/each}
		</div>
	{/if}
</div>
