<script lang="ts">
	import type { SuiteBookingCopy } from '$lib/types/suite-booking';

	let { booking, idPrefix = 'suite' }: { booking: SuiteBookingCopy; idPrefix?: string } = $props();

	const checkInId = $derived(`${idPrefix}-check-in`);
	const guestsId = $derived(`${idPrefix}-guests`);

	function bookingSubmit(e: SubmitEvent) {
		e.preventDefault();
	}
</script>

<section class="px-6 py-24 md:py-32">
	<div
		class="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-primary shadow-2xl"
	>
		<div
			class="absolute inset-0 opacity-20"
			style="background-image: url('{booking.bgImage}'); background-size: cover; background-position: center;"
		></div>
		<div class="relative z-10 flex flex-col items-center p-12 text-center md:p-24">
			<span
				class="font-label mb-6 text-sm uppercase tracking-[0.5em] text-secondary-container"
				>{booking.kicker}</span
			>
			<h2 class="font-headline mb-6 text-5xl text-on-primary md:text-7xl">{booking.title}</h2>
			<p class="font-headline mb-10 text-2xl text-secondary-fixed italic md:text-3xl">
				{booking.priceNote}
			</p>
			<p class="font-body mb-12 max-w-2xl text-xl leading-relaxed font-light text-primary-fixed">
				{booking.description}
			</p>
			<form
				class="mb-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
				onsubmit={bookingSubmit}
			>
				<div
					class="rounded-xl border-b border-outline-variant/30 bg-primary-container p-4 text-left"
				>
					<label
						class="font-label mb-1 block text-[10px] uppercase tracking-widest text-on-primary-container"
						for={checkInId}>{booking.checkInLabel}</label
					>
					<input
						id={checkInId}
						class="w-full border-none bg-transparent p-0 text-lg text-white placeholder-white/30 outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none"
						placeholder={booking.checkInPlaceholder}
						type="text"
					/>
				</div>
				<div
					class="rounded-xl border-b border-outline-variant/30 bg-primary-container p-4 text-left"
				>
					<label
						class="font-label mb-1 block text-[10px] uppercase tracking-widest text-on-primary-container"
						for={guestsId}>{booking.guestsLabel}</label
					>
					<select
						id={guestsId}
						class="w-full appearance-none border-none bg-transparent p-0 text-lg text-white outline-none ring-0 focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none"
					>
						{#each booking.guestOptions as opt}
							<option class="text-primary" value={opt}>{opt}</option>
						{/each}
					</select>
				</div>
				<button
					class="font-label rounded-xl bg-secondary py-4 text-sm uppercase tracking-widest text-on-secondary transition-transform duration-500 hover:scale-[1.02] md:py-0"
					type="submit"
				>
					{booking.cta}
				</button>
			</form>
		</div>
	</div>
</section>
