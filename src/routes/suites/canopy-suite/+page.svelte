<script lang="ts">
  import { locale } from "$lib/locale.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const s = $derived(locale.current === "es" ? data.suiteEs : data.suiteEn);

  const gallery = $derived(s.gallery.images);
  const g0 = $derived(gallery[0]);
  const g1 = $derived(gallery[1]);
  const g2 = $derived(gallery[2]);
  const g3 = $derived(gallery[3]);

  function bookingSubmit(e: SubmitEvent) {
    e.preventDefault();
  }
</script>

<!-- Hero (sin parallax: cover estable en viewport) -->
<section
  class="relative flex min-h-screen items-end justify-start overflow-hidden"
>
  <div class="absolute inset-0 z-0 bg-primary">
    <img
      class="h-full w-full object-cover object-[52%_40%] md:object-[54%_38%]"
      alt={s.hero.imageAlt}
      src={s.hero.image}
    />
  </div>
  <div
    class="absolute inset-0 z-10 bg-linear-to-t from-primary/60 via-transparent to-transparent"
  ></div>
  <div class="relative z-20 max-w-5xl px-6 pb-16 md:px-12 md:pb-24">
    <span
      class="font-label mb-4 block text-xs tracking-[0.4em] text-white/80 uppercase"
      >{s.hero.kicker}</span
    >
    <h1
      class="font-headline text-5xl leading-tight font-light text-white md:text-7xl lg:text-9xl"
    >
      {s.hero.titleLine1}<br />
      <span class="pl-8 italic md:pl-12 lg:pl-24">{s.hero.titleLine2}</span>
    </h1>
  </div>
</section>

<!-- Narrative -->
<section
  class="grid grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-12 md:px-24 md:py-32"
>
  <div class="md:col-span-7">
    <h2
      class="font-headline mb-12 text-4xl leading-tight text-primary md:text-6xl"
    >
      {s.narrative.heading}
    </h2>
    <div class="max-w-2xl space-y-8">
      {#each s.narrative.paragraphs as p}
        <p
          class="text-lg leading-relaxed font-light text-on-surface-variant md:text-xl"
        >
          {p}
        </p>
      {/each}
    </div>
  </div>
  <div class="relative md:col-span-5">
    <div
      class="editorial-inset aspect-4/5 overflow-hidden rounded-xl bg-surface-container-high"
    >
      <img
        class="h-full w-full object-cover"
        alt={s.narrative.sideImage.alt}
        src={s.narrative.sideImage.src}
      />
    </div>
    <div
      class="absolute -bottom-12 -left-12 hidden max-w-xs rounded-xl bg-surface-container-lowest p-8 shadow-xl lg:block dark:bg-stone-900"
    >
      <p class="font-headline text-xl italic text-secondary">
        {s.narrative.quote.text}
      </p>
      <p
        class="font-label mt-4 text-[10px] uppercase tracking-widest text-outline"
      >
        {s.narrative.quote.source}
      </p>
    </div>
  </div>
</section>

<!-- Amenities -->
<section class="bg-surface-container-low py-24">
  <div class="px-6 md:px-24">
    <div class="mb-20 flex items-end justify-between">
      <div>
        <span
          class="font-label mb-2 block text-xs uppercase tracking-[0.3em] text-secondary"
          >{s.amenities.kicker}</span
        >
        <h3 class="font-headline text-4xl text-primary">{s.amenities.title}</h3>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      {#each s.amenities.items as item}
        <div
          class="group rounded-xl bg-surface-container-lowest p-10 transition-colors duration-700 hover:bg-primary"
        >
          <span
            class="material-symbols-outlined mb-6 text-4xl text-secondary transition-colors group-hover:text-on-primary"
            >{item.icon}</span
          >
          <h4
            class="font-headline mb-4 text-2xl text-primary group-hover:text-on-primary"
          >
            {item.title}
          </h4>
          <p
            class="font-light text-on-surface-variant group-hover:text-white/70 dark:group-hover:text-white/80"
          >
            {item.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Gallery -->
<section class="overflow-hidden py-24 md:py-32">
  <div class="mb-16 px-6 md:px-24">
    <h3 class="font-headline text-center text-4xl text-primary">
      {s.gallery.title}
    </h3>
  </div>
  {#if g0 && g1 && g2 && g3}
    <div
      class="flex h-auto flex-col gap-8 px-6 md:h-[819px] md:flex-row md:px-12"
    >
      <div
        class="editorial-inset aspect-3/4 w-full overflow-hidden rounded-xl md:aspect-auto md:w-1/2 md:min-h-0"
      >
        <img class="h-full w-full object-cover" alt={g0.alt} src={g0.src} />
      </div>
      <div class="flex w-full flex-col gap-8 md:w-1/4">
        <div
          class="editorial-inset aspect-square max-h-[48%] overflow-hidden rounded-xl"
        >
          <img class="h-full w-full object-cover" alt={g1.alt} src={g1.src} />
        </div>
        <div
          class="editorial-inset aspect-square max-h-[48%] overflow-hidden rounded-xl"
        >
          <img class="h-full w-full object-cover" alt={g2.alt} src={g2.src} />
        </div>
      </div>
      <div
        class="editorial-inset mt-12 aspect-3/4 w-full overflow-hidden rounded-xl md:mt-0 md:w-1/4 md:aspect-auto"
      >
        <img class="h-full w-full object-cover" alt={g3.alt} src={g3.src} />
      </div>
    </div>
  {/if}
</section>

<!-- Booking -->
<section class="px-6 py-24 md:py-32">
  <div
    class="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-primary shadow-2xl"
  >
    <div
      class="absolute inset-0 opacity-20"
      style="background-image: url('{s.booking
        .bgImage}'); background-size: cover; background-position: center;"
    ></div>
    <div
      class="relative z-10 flex flex-col items-center p-12 text-center md:p-24"
    >
      <span
        class="font-label mb-6 text-sm uppercase tracking-[0.5em] text-secondary-container"
        >{s.booking.kicker}</span
      >
      <h2 class="font-headline mb-10 text-5xl text-on-primary md:text-7xl">
        {s.booking.title}
      </h2>
      <p
        class="font-body mb-12 max-w-2xl text-xl leading-relaxed font-light text-primary-fixed"
      >
        {s.booking.description}
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
            for="check-in-canopy">{s.booking.checkInLabel}</label
          >
          <input
            id="check-in-canopy"
            class="w-full border-none bg-transparent p-0 text-lg text-white placeholder-white/30 focus:ring-0"
            placeholder={s.booking.checkInPlaceholder}
            type="text"
          />
        </div>
        <div
          class="rounded-xl border-b border-outline-variant/30 bg-primary-container p-4 text-left"
        >
          <label
            class="font-label mb-1 block text-[10px] uppercase tracking-widest text-on-primary-container"
            for="guests-canopy">{s.booking.guestsLabel}</label
          >
          <select
            id="guests-canopy"
            class="w-full appearance-none border-none bg-transparent p-0 text-lg text-white focus:ring-0"
          >
            {#each s.booking.guestOptions as opt}
              <option class="text-primary" value={opt}>{opt}</option>
            {/each}
          </select>
        </div>
        <button
          class="font-label rounded-xl bg-secondary py-4 text-sm uppercase tracking-widest text-on-secondary transition-transform duration-500 hover:scale-[1.02] md:py-0"
          type="submit"
        >
          {s.booking.cta}
        </button>
      </form>
      <p class="font-headline text-sm italic text-on-primary-container">
        {s.booking.priceNote}
      </p>
    </div>
  </div>
</section>
