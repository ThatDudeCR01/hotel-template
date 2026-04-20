<script lang="ts">
  import SuiteBooking from "$lib/components/SuiteBooking.svelte";
  import { locale } from "$lib/locale.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const s = $derived(locale.current === "es" ? data.suiteEs : data.suiteEn);
</script>

<!-- Hero -->
<section
  class="relative flex h-screen w-full items-center justify-center overflow-hidden"
>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <img
      class="absolute inset-0 h-full w-full object-cover object-center"
      alt={s.hero.imageAlt}
      src={s.hero.image}
    />
  </div>
  <div class="absolute inset-0 z-10 bg-primary/20"></div>
  <div class="relative z-20 px-4 text-center">
    <span
      class="font-label mb-6 inline-block text-sm tracking-[0.4em] text-white/90 uppercase"
      >{s.hero.kicker}</span
    >
    <h1
      class="font-headline text-7xl leading-none font-medium tracking-tighter text-white md:text-9xl"
    >
      {s.hero.title}
    </h1>
  </div>
  <div class="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 animate-bounce">
    <span class="material-symbols-outlined text-3xl text-white"
      >keyboard_double_arrow_down</span
    >
  </div>
</section>

<!-- Introduction -->
<section
  class="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-8 px-10 py-24 md:grid-cols-12 md:gap-10 md:px-12 md:py-20 lg:px-14"
>
  <div class="md:col-span-6 md:pr-8 lg:col-span-5">
    <span
      class="font-label mb-3 block text-xs tracking-widest text-secondary uppercase"
      >{s.intro.kicker}</span
    >
    <h2 class="font-headline mb-8 text-5xl leading-tight text-primary">
      {s.intro.heading}
    </h2>
    {#each s.intro.paragraphs as paragraph, i}
      <p
        class="text-base leading-relaxed text-on-surface-variant md:text-lg {i ===
        s.intro.paragraphs.length - 1
          ? ''
          : 'mb-8'}"
      >
        {paragraph}
      </p>
    {/each}
  </div>
  <div class="relative md:col-span-6 lg:col-span-7">
    <div
      class="relative aspect-3/4 max-h-[min(90vh,700px)] w-full overflow-hidden rounded-xl shadow-2xl"
    >
      <img
        class="absolute inset-0 h-full w-full object-cover object-bottom"
        alt={s.intro.sideImage.alt}
        src={s.intro.sideImage.src}
      />
    </div>
    <div
      class="bg-surface-container-high absolute -bottom-8 -left-8 hidden h-80 w-60 rounded-xl p-7 shadow-xl lg:block"
    >
      <span
        class="font-label mb-3 block text-[10px] tracking-widest text-primary/40 uppercase"
        >{s.intro.quoteCard.label}</span
      >
      <p
        class="font-headline text-lg leading-snug text-primary italic md:text-xl"
      >
        "{s.intro.quoteCard.quote}"
      </p>
    </div>
  </div>
</section>

<!-- Immersive Amenities -->
<section class="bg-surface-container-low py-32">
  <div class="mx-auto max-w-screen-2xl px-8">
    <div class="mb-24 text-center">
      <span
        class="font-label mb-4 block text-xs tracking-widest text-secondary uppercase"
        >{s.amenities.kicker}</span
      >
      <h2 class="font-headline text-5xl text-primary">{s.amenities.title}</h2>
    </div>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      {#each s.amenities.items as item}
        <div
          class="bg-surface-container-lowest relative overflow-hidden rounded-xl p-2 shadow-sm transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(24,35,26,0.06)] {item.stagger
            ? 'mt-0 md:mt-12'
            : ''}"
        >
          <div class="aspect-3/4 mb-8 overflow-hidden rounded-xl">
            <img
              class="h-full w-full object-cover"
              alt={item.imageAlt}
              src={item.image}
            />
          </div>
          <div class="px-6 pb-8">
            <h3 class="font-headline mb-3 text-2xl text-primary">
              {item.title}
            </h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Visual Narrative Gallery -->
<section class="bg-background overflow-hidden py-32">
  <div class="relative mx-auto max-w-screen-2xl px-8">
    <div
      class="pointer-events-none absolute top-0 right-0 hidden -translate-y-1/2 opacity-5 lg:block"
    >
      <span class="font-headline text-primary text-[20rem] italic"
        >{s.visualGallery.watermark}</span
      >
    </div>
    <div class="grid grid-cols-12 items-end gap-6">
      <div class="col-span-12 md:col-span-7">
        <img
          class="aspect-video w-full rounded-xl object-cover shadow-lg"
          alt={s.visualGallery.wide.alt}
          src={s.visualGallery.wide.src}
        />
      </div>
      <div class="col-span-12 mb-12 md:col-span-5">
        <img
          class="aspect-4/5 w-full rounded-xl object-cover shadow-lg"
          alt={s.visualGallery.tall.alt}
          src={s.visualGallery.tall.src}
        />
      </div>
      <div class="z-10 -mt-24 col-span-12 md:col-start-2 md:col-span-4">
        <img
          class="border-background aspect-square w-full rounded-xl border-12 object-cover shadow-2xl"
          alt={s.visualGallery.accent.alt}
          src={s.visualGallery.accent.src}
        />
      </div>
      <div
        class="col-span-12 flex flex-col justify-center px-12 pb-24 md:col-span-6"
      >
        <h3 class="font-headline mb-6 text-3xl text-primary italic">
          {s.visualGallery.materialsHeading}
        </h3>
        <p class="text-on-surface-variant leading-relaxed">
          {s.visualGallery.materialsBody}
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Botanical Details -->
<section class="bg-surface-container-high px-8 py-32">
  <div class="mx-auto flex max-w-7xl flex-col items-center gap-20 md:flex-row">
    <div class="w-full md:w-1/2">
      <div class="aspect-square w-full overflow-hidden rounded-xl shadow-xl">
        <img
          class="h-full w-full object-cover"
          alt={s.botanical.imageAlt}
          src={s.botanical.image}
        />
      </div>
    </div>
    <div class="w-full md:w-1/2">
      <span
        class="font-label mb-6 block text-xs tracking-widest text-secondary uppercase"
        >{s.botanical.kicker}</span
      >
      <h2 class="font-headline mb-10 text-5xl text-primary">
        {s.botanical.title}
      </h2>
      <ul class="space-y-12">
        {#each s.botanical.items as item}
          <li class="flex gap-6">
            <span
              class="material-symbols-outlined text-secondary shrink-0 text-3xl"
              >{item.icon}</span
            >
            <div>
              <h4
                class="font-label mb-2 text-lg font-bold tracking-wide text-primary uppercase"
              >
                {item.title}
              </h4>
              <p class="text-on-surface-variant leading-relaxed">
                {@html item.descriptionHtml}
              </p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<SuiteBooking booking={s.booking} idPrefix="garden" />
