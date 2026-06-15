<script lang="ts">
  import { goto } from "$app/navigation";
  import { locale } from "$lib/locale.svelte";
  import suitesListEn from "$lib/locales/suites-list.en.json";
  import suitesListEs from "$lib/locales/suites-list.es.json";

  const t = $derived(locale.current === "es" ? suitesListEs : suitesListEn);

  const ctaLabel = $derived(locale.current === "es" ? "Ver detalles" : "View details");

  function newsletterSubmit(e: SubmitEvent) {
    e.preventDefault();
    goto("/newletter-confirmation");
  }
</script>

<div class="pt-12">
  <section class="mb-20 px-6 md:mb-28 md:px-12">
    <div class="mx-auto flex max-w-6xl flex-col items-end gap-12 lg:flex-row">
      <div class="w-full lg:w-1/2">
        <span
          class="label-md mb-6 block font-medium uppercase tracking-[0.3em] text-secondary"
          >{t.hero.kicker}</span
        >
        <h1 class="mb-8 text-6xl leading-tight font-light md:text-8xl">
          {t.hero.titleLine1} <br />
          <span class="font-serif italic">{t.hero.titleLine2}</span>
        </h1>
        <p
          class="max-w-md text-lg leading-relaxed font-light text-on-surface-variant"
        >
          {t.hero.lead}
        </p>
      </div>
      <div
        class="relative h-[480px] w-full overflow-hidden rounded-2xl shadow-2xl md:h-[560px] lg:w-1/2"
      >
        <img
          class="h-full w-full object-cover"
          alt={t.hero.imageAlt}
          src="/Hero-photo.jpg"
        />
        <div class="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
      </div>
    </div>
  </section>

  <section class="mb-24 px-6 md:mb-32 md:px-12">
    <div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
      {#each t.cottages as cottage}
        <a
          href="/suites/{cottage.slug}"
          class="group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition hover:shadow-[0_32px_64px_-12px_rgba(24,35,26,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <article class="flex h-full flex-col">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                alt={cottage.imageAlt}
                src={cottage.image}
              />
              {#if cottage.badge}
                <span
                  class="absolute top-4 left-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-widest text-secondary-fixed uppercase"
                >
                  {cottage.badge}
                </span>
              {/if}
            </div>
            <div class="flex flex-1 flex-col p-8">
              <div class="mb-3 flex items-baseline justify-between gap-4">
                <h2 class="font-serif text-2xl text-primary">{cottage.title}</h2>
                <span class="shrink-0 text-sm font-semibold tracking-wide text-secondary"
                  >{cottage.price}</span
                >
              </div>
              <p
                class="flex-1 text-sm leading-relaxed font-light text-on-surface-variant"
              >
                {cottage.description}
              </p>
              <p
                class="mt-6 text-[10px] font-bold tracking-widest text-secondary uppercase"
              >
                {ctaLabel}
              </p>
            </div>
          </article>
        </a>
      {/each}
    </div>
  </section>

  <section class="bg-surface-container-low px-8 py-32 text-center">
    <div class="mx-auto max-w-3xl">
      <span class="material-symbols-outlined mb-8 text-5xl text-secondary"
        >mail</span
      >
      <h2 class="mb-6 font-serif text-4xl font-light italic md:text-5xl">
        {t.newsletter.title}
      </h2>
      <p class="mb-12 font-light text-on-surface-variant">
        {t.newsletter.description}
      </p>
      <form
        class="mx-auto flex max-w-xl flex-col gap-4 md:flex-row"
        onsubmit={newsletterSubmit}
      >
        <input
          class="font-label flex-1 border-0 border-b border-outline bg-transparent px-6 py-4 text-sm uppercase tracking-wider placeholder:text-on-surface-variant/45 outline-none ring-0 hover:border-outline focus:border-outline focus:outline-none focus:ring-0 focus-visible:outline-none focus:placeholder:opacity-0"
          placeholder={t.newsletter.placeholder}
          type="email"
          autocomplete="email"
          aria-label={t.newsletter.emailAria}
        />
        <button
          class="font-label rounded-full bg-primary px-10 py-4 text-sm uppercase tracking-widest text-on-primary transition hover:bg-secondary"
          type="submit"
        >
          {t.newsletter.subscribe}
        </button>
      </form>
    </div>
  </section>
</div>
