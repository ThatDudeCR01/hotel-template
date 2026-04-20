<script lang="ts">
  import { onMount } from "svelte";
  import { healingRitualScroll } from "$lib/healingRitualScroll";
  import { locale } from "$lib/locale.svelte";
  import homeEn from "$lib/locales/home.en.json";
  import homeEs from "$lib/locales/home.es.json";

  /** Local asset — served from /static */
  const villaParallax =
    "/view-luxurious-villa-with-modern-architectural-design.jpg";

  const t = $derived(locale.current === "es" ? homeEs : homeEn);

  onMount(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const layers = () =>
      document.querySelectorAll<HTMLElement>("[data-parallax]");

    let rafId = 0;

    const tick = () => {
      const vh = window.innerHeight;

      layers().forEach((el) => {
        const container = el.closest(".parallax-container");
        if (!container) return;

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
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
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
  class="parallax-container relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden md:h-[961px]"
>
  <div class="parallax-bg absolute inset-0 z-0" data-parallax="0.52">
    <img
      class="h-full w-full object-cover object-[center_15%]"
      alt={t.hero.imageAlt}
      src={villaParallax}
    />
    <div class="absolute inset-0 bg-primary/55"></div>
  </div>
  <div class="relative z-10 max-w-4xl px-6 text-center" data-parallax="0.1">
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
      class="mx-auto max-w-2xl text-light text-lg leading-relaxed text-white md:text-xl"
    >
      {t.hero.lead}
    </p>
  </div>
</section>

<!-- 2 · Hotel story — mismo tono que el hero, sin repetir la misma foto (evita “doble imagen”) -->
<section
  id="story"
  class="relative flex min-h-[620px] items-center overflow-hidden bg-primary/85 py-20 md:min-h-[620px] md:py-22"
>
  <div
    class="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-primary via-primary/15 to-[#23529]/95 opacity-95"
  ></div>
  <div class="relative z-10 mx-auto w-full max-w-3xl px-6 md:px-8">
    <span
      class="label-md mb-6 block text-surface-container-lowest uppercase tracking-[0.25em]"
      >{t.story.kicker}</span
    >
    <h2
      class="font-serif mb-8 text-4xl leading-tight text-surface-container-lowest md:text-5xl"
    >
      {t.story.title}
    </h2>
    <div
      class="space-y-6 text-lg leading-relaxed font-light text-surface-variant"
    >
      {#each t.story.paragraphs as p}
        <p>{p}</p>
      {/each}
    </div>
  </div>
</section>

<!-- 3 · Suites — parallax banner + cards -->
<section id="suites" class="bg-surface-container-low py-24 md:py-32">
  <div class="mx-auto mb-16 max-w-7xl px-6">
    <div
      class="parallax-container relative mb-16 h-[min(420px,70vh)] overflow-hidden rounded-2xl shadow-[0_32px_64px_-12px_rgba(24,35,26,0.08)] md:h-[660px]"
    >
      <div class="parallax-bg absolute inset-0 z-0" data-parallax="0.30">
        <img
          class="h-full w-full object-cover object-[center_45%]"
          alt={t.suitesBanner.imageAlt}
          src={villaParallax}
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/35 to-transparent"
        ></div>
      </div>
      <div
        class="relative z-10 flex h-full flex-col justify-end p-8 md:p-12"
        data-parallax="0.07"
      >
        <span
          class="mb-3 text-[10px] font-bold tracking-[0.25em] text-secondary uppercase"
          >{t.suitesBanner.kicker}</span
        >
        <h2
          class="font-serif text-4xl text-surface-container-lowest md:text-6xl"
        >
          {t.suitesBanner.title}
        </h2>
        <p class="mt-4 max-w-xl text-surface-variant">
          {t.suitesBanner.description}
        </p>
      </div>
    </div>

    <div class="grid gap-8 md:grid-cols-3">
      {#each t.suitesCards as card}
        <a
          href={card.href}
          class="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm transition hover:shadow-[0_32px_64px_-12px_rgba(24,35,26,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <article class="flex flex-1 flex-col">
            <div class="aspect-4/3 overflow-hidden">
              <img
                class="h-full w-full object-cover"
                alt={card.imageAlt}
                src={card.image}
              />
            </div>
            <div class="flex flex-1 flex-col p-8">
              <h3 class="font-serif text-2xl text-primary">{card.title}</h3>
              <p
                class="mt-3 flex-1 text-sm leading-relaxed font-light text-on-surface-variant"
              >
                {card.description}
              </p>
              <p
                class="mt-6 text-[10px] font-bold tracking-widest text-secondary uppercase"
              >
                {card.price}
              </p>
            </div>
          </article>
        </a>
      {/each}
    </div>
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
  <!-- Rainforest Yoga -->
  <div class="overflow-hidden bg-surface-container-low py-24">
    <div class="relative mx-auto max-w-7xl px-6">
      <div
        class="pointer-events-none absolute top-0 right-10 translate-x-1/2 -translate-y-1/4 transform opacity-10"
      >
        <span
          class="font-serif text-[10rem] leading-none text-primary uppercase select-none"
          >{t.yoga.watermark}</span
        >
      </div>
      <div class="relative z-10 flex flex-col items-center gap-16 md:flex-row">
        <div class="order-2 w-full md:order-1 md:w-1/2">
          <div class="relative">
            <img
              class="aspect-3/4 w-full rounded-xl object-cover shadow-2xl"
              alt={t.yoga.mainImageAlt}
              src={t.yoga.mainImage}
            />
            <div
              class="absolute -top-12 -right-12 h-64 w-64 overflow-hidden rounded-xl border-12 border-surface shadow-xl"
            >
              <img
                class="h-full w-full object-cover"
                alt={t.yoga.insetImageAlt}
                src={t.yoga.insetImage}
              />
            </div>
          </div>
        </div>
        <div class="order-1 space-y-8 md:order-2 md:w-1/2">
          <span
            class="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase"
            >{t.yoga.kicker}</span
          >
          <h3
            class="font-serif text-4xl leading-tight text-primary md:text-6xl"
          >
            {t.yoga.title}
          </h3>
          <p class="text-lg leading-relaxed font-light text-on-surface-variant">
            {t.yoga.description}
          </p>
          <div
            class="grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8"
          >
            {#each t.yoga.schedule as row}
              <div>
                <p
                  class="mb-2 text-sm font-bold tracking-widest text-primary uppercase"
                >
                  {row.label}
                </p>
                <p class="text-xs text-on-surface-variant">{row.detail}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Healing rituals -->
  <div class="mx-auto max-w-4xl space-y-24 px-6 pt-24 pb-24">
    <div class="text-center">
      <span
        class="mb-4 block text-xs font-bold tracking-[0.3em] text-secondary uppercase"
        >{t.healing.kicker}</span
      >
      <h3 class="font-serif text-3xl text-primary md:text-4xl">
        {t.healing.title}
      </h3>
      <div class="mx-auto mt-8 h-px w-24 bg-secondary/30"></div>
    </div>

    {#each t.healing.items as item, i}
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
          <p class="mb-6 leading-relaxed font-light text-on-surface-variant">
            {item.description}
          </p>
          <button
            class="border-b border-transparent pb-1 text-xs font-bold tracking-widest text-secondary uppercase transition-all hover:border-secondary"
            type="button">{t.healing.viewDetails}</button
          >
        </div>
      </article>
    {/each}
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
