<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { healingRitualScroll } from "$lib/healingRitualScroll";
  import { parseHighlightedText } from "$lib/highlightText";
  import CottageBentoGrid from "$lib/components/CottageBentoGrid.svelte";
  import { locale } from "$lib/locale.svelte";
  import homeEn from "$lib/locales/home.en.json";
  import homeEs from "$lib/locales/home.es.json";

  /** Local asset — served from /static */
  const villaParallax = "/view-luxurious-villa-parallax.jpg";

  const t = $derived(locale.current === "es" ? homeEs : homeEn);

  function replayHeroAnimations() {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    for (const className of ["hero-enter", "hero-scroll-enter"] as const) {
      document.querySelectorAll<HTMLElement>(`.${className}`).forEach((el) => {
        el.classList.remove(className);
        void el.offsetWidth;
        el.classList.add(className);
      });
    }
  }

  afterNavigate(({ to, from }) => {
    if (!to || to.url.pathname !== "/") return;
    if (to.url.hash !== "" && to.url.hash !== "#top") return;
    if (!from) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (from.url.pathname === "/") {
        replayHeroAnimations();
      }
    });
  });

  onMount(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const layers = () =>
      document.querySelectorAll<HTMLElement>("[data-parallax]");

    let rafId = 0;
    let parallaxReady = false;

    const tick = () => {
      if (!parallaxReady) return;

      const vh = window.innerHeight;
      const atTop = window.scrollY < 8;

      layers().forEach((el) => {
        const container = el.closest(".parallax-container");
        if (!container) return;

        if (atTop && container.id === "top") {
          el.style.transform = "";
          return;
        }

        const rect = container.getBoundingClientRect();
        const margin = 120;
        if (rect.bottom < -margin || rect.top > vh + margin) {
          el.style.transform = "";
          return;
        }

        const raw = el.dataset.parallax ?? "0.45";
        const speed = Number.parseFloat(raw);
        const y = -rect.top * speed;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    const schedule = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          tick();
        });
      }
    };

    tick();
    const parallaxTimer = window.setTimeout(() => {
      parallaxReady = true;
      tick();
    }, 1100);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.clearTimeout(parallaxTimer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafId);
      layers().forEach((el) => {
        el.style.transform = "";
      });
    };
  });
</script>

<!-- 1 · Hero — welcome -->
<section
  id="top"
  class="parallax-container relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden"
>
  <div class="parallax-bg absolute inset-0 z-0" data-parallax="0.52">
    <img
      class="h-full w-full object-cover object-[center_15%]"
      alt={t.hero.imageAlt}
      src={villaParallax}
    />
    <div class="absolute inset-0 bg-primary/55"></div>
  </div>
  <div class="hero-enter relative z-10 max-w-4xl px-6 text-center">
    <span
      class="label-md text-surface-container-lowest mb-6 block uppercase tracking-[0.3em]"
      >{t.hero.kicker}</span
    >
    <h1
      class="font-serif mb-8 text-5xl leading-tight text-surface-container-lowest md:text-8xl"
    >
      {t.hero.title}
    </h1>
    <p
      class="mx-auto max-w-2xl text-lg leading-relaxed font-light text-white md:text-xl"
    >
      {t.hero.lead}
    </p>
    <p
      class="mx-auto mt-8 max-w-2xl text-xs font-semibold tracking-[0.22em] text-secondary-fixed uppercase md:text-sm"
    >
      {t.hero.scrollCta}
    </p>
  </div>
  <a
    class="hero-scroll-enter absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-surface-container-lowest/80 transition-colors hover:text-secondary-fixed"
    href="#story"
    aria-label={t.hero.scrollAria}
  >
    <span
      class="material-symbols-outlined animate-bounce text-3xl"
      aria-hidden="true">keyboard_arrow_down</span
    >
  </a>
</section>

<!-- 2 · Hotel story — mismo tono que el hero, sin repetir la misma foto (evita “doble imagen”) -->
<section
  id="story"
  class="relative flex min-h-[620px] items-center overflow-hidden bg-primary/85 py-20 md:min-h-[620px] md:py-22"
>
  <div
    class="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-primary via-primary/15 to-[#23529]/95 opacity-95"
  ></div>
  <div class="relative z-10 mx-auto w-full max-w-5xl px-6 md:max-w-6xl md:px-12">
    <span
      class="label-md mb-6 block text-surface-container-lowest uppercase tracking-[0.25em]"
      >{t.story.kicker}</span
    >
    <h2
      class="font-serif mb-8 text-4xl leading-tight text-surface-container-lowest md:text-5xl"
    >
      {#each parseHighlightedText(t.story.title) as part}
        {#if part.highlight}
          <span class="text-secondary-fixed">{part.text}</span>
        {:else}
          {part.text}
        {/if}
      {/each}
    </h2>
    <div
      class="space-y-6 text-lg leading-relaxed font-light text-surface-variant"
    >
      {#each t.story.paragraphs as p}
        <p>
          {#each parseHighlightedText(p) as part}
            {#if part.highlight}
              <span class="font-medium text-secondary-fixed">{part.text}</span>
            {:else}
              {part.text}
            {/if}
          {/each}
        </p>
      {/each}
    </div>
  </div>
</section>

<!-- 3 · Suites — intro + bento grid -->
<section id="suites" class="bg-surface-container-low py-24 md:py-32">
  <div class="mx-auto max-w-7xl px-6">
    <header class="mb-12 text-center md:mb-16">
      <span
        class="label-md mb-4 block uppercase tracking-[0.25em] text-secondary"
        >{t.suitesBanner.kicker}</span
      >
      <h2
        class="font-serif mx-auto max-w-3xl text-4xl leading-tight text-primary md:text-5xl lg:text-6xl"
      >
        {t.suitesBanner.title}
      </h2>
      <p
        class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed font-light text-on-surface-variant"
      >
        {t.suitesBanner.description}
      </p>
    </header>

    <CottageBentoGrid cards={t.suitesCards} />
  </div>
</section>

<!-- Bridge parallax between suites and experiences -->
<section
  class="parallax-container relative flex min-h-[380px] items-center justify-center overflow-hidden md:min-h-[480px]"
>
  <div class="parallax-bg absolute inset-0 z-0" data-parallax="0.31">
    <img
      class="h-full w-full object-cover object-[center_55%]"
      alt={t.bridge.imageAlt}
      src={villaParallax}
    />
    <div class="absolute inset-0 bg-primary/55"></div>
  </div>
  <p
    class="relative z-10 max-w-2xl px-8 text-center font-serif text-2xl text-surface-container-lowest italic md:text-3xl"
    data-parallax="0.06"
  >
    {t.bridge.quote}
  </p>
</section>

<!-- 4 · Experiences & activities -->
<section id="experiences" class="bg-transparent">
  <!-- Ideal guest -->
  <div class="mx-auto max-w-4xl space-y-24 px-6 py-24">
    <div class="text-center">
      <span
        class="mb-4 block text-xs font-bold tracking-[0.3em] text-secondary uppercase"
        >{t.idealGuest.kicker}</span
      >
      <h3 class="font-serif text-3xl text-primary md:text-4xl">
        {t.idealGuest.title}
      </h3>
      {#if t.idealGuest.lead}
        <p
          class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed font-light text-on-surface-variant"
        >
          {t.idealGuest.lead}
        </p>
      {/if}
      <div class="mx-auto mt-8 h-px w-24 bg-secondary/30"></div>
    </div>

    {#each t.idealGuest.items as item, i}
      <article
        class="healing-ritual healing-ritual--scroll flex flex-col items-center gap-12 overflow-x-clip {i ===
        1
          ? 'md:flex-row-reverse'
          : 'md:flex-row'}"
        use:healingRitualScroll={i === 1
          ? { direction: "from-left" }
          : undefined}
      >
        <div
          class="healing-ritual__figure order-2 aspect-square w-full overflow-hidden rounded-xl shadow-lg md:order-1 md:w-1/3"
        >
          <img
            class="h-full w-full object-cover"
            alt={item.imageAlt}
            src={item.image}
          />
        </div>
        <div
          class="healing-ritual__text order-1 w-full md:order-2 md:w-2/3 {i ===
          1
            ? 'text-left md:text-right'
            : ''}"
        >
          <h4 class="font-serif mb-4 text-3xl text-primary">
            {item.title}
          </h4>
          <p class="leading-relaxed font-light text-on-surface-variant">
            {item.description}
          </p>
        </div>
      </article>
    {/each}

    {#if t.idealGuest.cta}
      <div class="pt-4 text-center">
        <a
          class="inline-block rounded-full border border-outline-variant/40 px-10 py-4 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-500 hover:border-secondary hover:bg-secondary hover:text-on-secondary"
          href={t.idealGuest.ctaHref}
        >
          {t.idealGuest.cta}
        </a>
      </div>
    {/if}
  </div>
</section>

<!-- 5 · CTA — unchanged headline -->
<section
  id="stillness"
  class="parallax-container relative overflow-hidden bg-primary py-48"
>
  <div class="parallax-bg absolute inset-0 z-0" data-parallax="0.38">
    <div
      class="absolute inset-0 from-primary via-primary-container/80 to-secondary/20"
    ></div>
    <div class="absolute inset-0 opacity-30">
      <img
        class="h-full w-full object-cover object-[center_65%]"
        alt={t.stillness.imageAlt}
        src={villaParallax}
      />
    </div>
  </div>
  <div
    class="relative z-10 mx-auto max-w-4xl px-6 text-center"
    data-parallax="0.08"
  >
    <h2
      class="font-serif mb-12 text-4xl text-surface-container-lowest md:text-6xl"
    >
      {t.stillness.title}
    </h2>
    <div class="flex flex-col justify-center gap-6 md:flex-row">
      <button
        class="rounded-full bg-secondary px-12 py-5 text-sm font-bold tracking-widest text-on-secondary uppercase transition-all duration-500 hover:brightness-110 active:scale-95"
        type="button"
      >
        {t.stillness.bookTreatment}
      </button>
      <button
        class="rounded-full border border-surface-variant/30 bg-transparent px-12 py-5 text-sm font-bold tracking-widest text-surface-container-lowest uppercase transition-all duration-500 hover:bg-surface-container-lowest/10"
        type="button"
      >
        {t.stillness.spaMenu}
      </button>
    </div>
  </div>
</section>
