<script lang="ts">
  import SuiteBooking from "$lib/components/SuiteBooking.svelte";
  import { locale } from "$lib/locale.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const s = $derived(locale.current === "es" ? data.suiteEs : data.suiteEn);
</script>

<!-- Hero (altura alineada con canopy-suite: viewport completo) -->
<header
  class="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <img
      class="absolute inset-0 h-full w-full object-cover object-center"
      alt={s.hero.imageAlt}
      src={s.hero.image}
    />
    <div class="absolute inset-0 z-1 bg-black/25 backdrop-opacity-55"></div>
    <div class="pointer-events-none absolute inset-0 z-1"></div>
  </div>
  <div class="relative z-10 max-w-5xl px-6 text-center">
    <span
      class="font-label mb-6 inline-block text-sm tracking-[0.4em] text-white/90 uppercase"
      >{s.hero.kicker}</span
    >
    <h1
      class="font-headline mb-8 text-5xl leading-[1.1] text-primary-fixed md:text-8xl"
    >
      {s.hero.titleMain}
      <br />
      <span class="font-light italic">{s.hero.titleItalic}</span>
    </h1>
    <p
      class="mx-auto max-w-2xl text-lg leading-relaxed font-light text-white/80 md:text-xl"
    >
      {s.hero.lead}
    </p>
  </div>
  <div
    class="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
  >
    <span
      class="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface/60"
      >{s.hero.scrollHint}</span
    >
    <div
      class="h-12 w-px bg-linear-to-b from-on-surface/40 to-transparent"
    ></div>
  </div>
</header>

<!-- The Architecture of Air -->
<section class="bg-surface px-6 py-32 md:px-12">
  <div
    class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-12"
  >
    <div class="order-2 lg:order-1 lg:col-span-5">
      <div class="relative">
        <img
          class="h-[600px] w-full rounded-xl object-cover shadow-2xl"
          alt={s.architecture.image.alt}
          src={s.architecture.image.src}
        />
        <div
          class="absolute -right-8 -bottom-8 -z-10 h-48 w-48 rounded-full bg-secondary/10 backdrop-blur-3xl"
        ></div>
      </div>
    </div>
    <div class="order-1 lg:order-2 lg:col-span-7 lg:pl-16">
      <h2 class="mb-10 text-4xl font-serif leading-tight md:text-6xl">
        {s.architecture.headingLine1}
        <br />
        <span class="italic">{s.architecture.headingLine2}</span>
      </h2>
      <div class="space-y-8 text-lg leading-loose text-on-surface-variant">
        {#each s.architecture.paragraphs as p}
          <p>{p}</p>
        {/each}
        <div class="grid grid-cols-2 gap-8 pt-6">
          {#each s.architecture.stats as stat}
            <div>
              <span class="mb-1 block text-3xl font-bold text-secondary"
                >{stat.value}</span
              >
              <span
                class="font-label text-[10px] uppercase tracking-widest opacity-60"
                >{stat.label}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Elevated Amenities — bento -->
<section class="bg-surface-container-low px-6 py-24 md:px-12">
  <div class="mx-auto max-w-7xl">
    <div class="mb-20 text-center">
      <h2 class="mb-4 text-4xl md:text-5xl">{s.amenitiesBento.title}</h2>
      <div class="mx-auto h-px w-24 bg-secondary"></div>
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      {#each s.amenitiesBento.cards as card, i}
        <div
          class="relative overflow-hidden rounded-xl bg-surface-container-lowest {card.span ===
          2
            ? 'md:col-span-2'
            : ''} {card.height === 500 ? 'h-[500px]' : 'h-[400px]'}"
        >
          <img
            class="absolute inset-0 h-full w-full object-cover"
            alt={card.imageAlt}
            src={card.image}
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent"
          ></div>
          <div
            class="absolute bottom-0 left-0 {card.span === 2 ? 'p-12' : 'p-10'}"
          >
            <h3
              class="mb-4 text-white {card.span === 2
                ? 'text-3xl'
                : 'text-2xl'}"
            >
              {card.title}
            </h3>
            <p
              class="text-white/80 {i === 1 || i === 2
                ? 'text-sm'
                : 'max-w-md'}"
            >
              {card.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Visual Narrative -->
<section class="relative overflow-hidden bg-surface py-32">
  <div
    class="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-headline text-[15vw] whitespace-nowrap text-surface-container-high/40"
  >
    {s.immersive.watermark}
  </div>
  <div class="relative z-10 mx-auto max-w-[1400px] px-6">
    <div class="flex flex-col items-center gap-12 md:flex-row">
      <div class="flex w-full flex-col gap-12 md:w-1/2">
        <div class="relative">
          <img
            class="h-[700px] w-full rounded-xl object-cover shadow-xl"
            alt={s.immersive.left.primary.alt}
            src={s.immersive.left.primary.src}
          />
        </div>
        <div class="md:pl-24">
          <img
            class="aspect-4/5 w-3/4 rounded-xl object-cover shadow-xl"
            alt={s.immersive.left.secondary.alt}
            src={s.immersive.left.secondary.src}
          />
        </div>
      </div>
      <div class="flex w-full flex-col gap-12 md:w-1/2 md:pt-32">
        <div class="max-w-md">
          <h2 class="mb-6 text-4xl">{s.immersive.right.heading}</h2>
          <p class="mb-8 leading-relaxed text-on-surface-variant">
            {s.immersive.right.body}
          </p>
        </div>
        <img
          class="aspect-3/2 w-full rounded-xl object-cover shadow-xl"
          alt={s.immersive.right.images[0].alt}
          src={s.immersive.right.images[0].src}
        />
        <div class="flex justify-end pr-12">
          <img
            class="aspect-square w-2/3 rounded-xl object-cover shadow-xl"
            alt={s.immersive.right.images[1].alt}
            src={s.immersive.right.images[1].src}
          />
        </div>
      </div>
    </div>
  </div>
</section>

<SuiteBooking booking={s.booking} idPrefix="treehouse" />
