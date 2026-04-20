<script lang="ts">
  import { goto } from "$app/navigation";
  import { locale } from "$lib/locale.svelte";
  import suitesListEn from "$lib/locales/suites-list.en.json";
  import suitesListEs from "$lib/locales/suites-list.es.json";

  const t = $derived(locale.current === "es" ? suitesListEs : suitesListEn);

  function newsletterSubmit(e: SubmitEvent) {
    e.preventDefault();
    goto("/newletter-confirmation");
  }
</script>

<!-- offset: layout main ya aporta pt-20; sumamos pt-12 ≈ pt-32 visual bajo el header fijo -->
<div class="pt-12">
  <!-- Hero -->
  <section class="mb-32 px-8 md:px-24">
    <div class="mx-auto flex max-w-6xl flex-col items-end gap-12 md:flex-row">
      <div class="w-full md:w-1/2">
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
        class="relative h-[600px] w-full overflow-hidden rounded-xl shadow-2xl md:w-1/2"
      >
        <img
          class="h-full w-full object-cover"
          alt={t.hero.imageAlt}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9ia3MsszRMS-HOlSJh5CUqJ6Uwl4SQP7BIPbkzGSCp1x_wC0GK1U3wbc5m-EZrOR2q1xEFgBqVR7sKskE2xu-IDVCw9mfVvAIdffEQV8HBj8cRF7FC_Tkuank28c6JUjvr2zL3kyxQ22lOEYofnTaDWGQB2fTN70U-5GtU7YTx-T55M9sshcadCH0mLUO9QlnCKOzn5rWGAo-wGT0b6wj3YgZLo7WuRXER-CrLid-NLXtwyPvfQYTaFvJdpq9GpxeQLyvF-5jHg"
        />
        <div class="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
      </div>
    </div>
  </section>

  <!-- Canopy Master Suite -->
  <section class="relative mb-48">
    <div class="flex min-h-[800px] flex-col items-stretch lg:flex-row">
      <div
        class="relative min-h-[500px] w-full overflow-hidden lg:min-h-0 lg:w-7/12"
      >
        <img
          class="h-full min-h-[500px] w-full object-cover lg:absolute lg:inset-0 lg:min-h-full"
          alt={t.canopy.imageAlt}
          src={t.canopy.image}
        />
      </div>
      <div
        class="flex w-full flex-col justify-center bg-surface-container-low p-12 md:p-24 lg:w-5/12"
      >
        <div class="max-w-md">
          <div class="mb-4 flex items-baseline justify-between">
            <h2 class="font-serif text-4xl font-light italic">
              {t.canopy.title}
            </h2>
            <span
              class="font-sans text-sm font-semibold tracking-wider text-secondary"
              >{t.canopy.price}</span
            >
          </div>
          <div
            class="font-label mb-8 flex gap-4 text-xs uppercase tracking-widest text-on-surface-variant"
          >
            <span>{t.canopy.specLeft}</span>
            <span>•</span>
            <span>{t.canopy.specRight}</span>
          </div>
          <p class="mb-10 leading-loose font-light text-on-surface-variant">
            {t.canopy.description}
          </p>
          <ul class="mb-12 space-y-4">
            {#each t.canopy.features as f}
              <li
                class="flex items-center gap-3 text-sm font-medium tracking-tight uppercase"
              >
                <span class="material-symbols-outlined text-secondary"
                  >{f.icon}</span
                >
                {f.text}
              </li>
            {/each}
          </ul>
          <button
            class="font-label w-full rounded-full border border-outline-variant py-4 text-sm uppercase tracking-widest text-primary transition-all duration-500 hover:bg-primary hover:text-on-primary"
            type="button"
            onclick={() => {
              window.location.href = "/suites/canopy-suite";
            }}
          >
            {t.canopy.cta}
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Garden Villa -->
  <section class="mb-48 px-8 md:px-24">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center gap-24 md:flex-row-reverse"
    >
      <div class="relative w-full md:w-1/2">
        <div
          class="aspect-[4/5] overflow-hidden rounded-xl bg-surface-container-high"
        >
          <img
            class="h-full w-full object-cover"
            alt={t.garden.imageAlt}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX5uMHacQqWQY4h85YnrvuxoeoKNx7wkKNM3WYREUGS_Nq6_eqAf2l-Bz9QremBPbwdVYWPSbeSQO28EM7UwNjuFnPRq_PGEgVEk8RgEY3B7-8kqwawUqBYiaXO-h8n-dHmTlO4zcIiSQRttakFQXuITmDboPYsLzmR8WrIw0gIP7v727_0UFqx9GgrqlNSU9SfLtpftZZYlSmuUJyvD7cywfIp5sZjn5N3OlL7d3guSO2auvFrXmUEjn6wH957ZRb55awMrOJGA"
          />
        </div>
        <div
          class="absolute -bottom-12 -left-12 hidden w-64 rounded-xl bg-white p-8 shadow-xl lg:block dark:bg-stone-900"
        >
          <p class="font-serif mb-2 text-xl italic text-secondary">
            {t.garden.badgeTitle}
          </p>
          <p
            class="text-xs font-medium uppercase tracking-widest text-on-surface-variant"
          >
            {t.garden.badgeSubtitle}
          </p>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="mb-6 font-serif text-5xl font-light">{t.garden.title}</h2>
        <div
          class="font-label mb-8 flex gap-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary"
        >
          <span>{t.garden.specLeft}</span>
          <span>•</span>
          <span>{t.garden.specRight}</span>
        </div>
        <p
          class="mb-10 text-lg leading-loose font-light text-on-surface-variant"
        >
          {t.garden.description}
        </p>
        <div class="mb-12 grid grid-cols-2 gap-8">
          {#each t.garden.stats as stat}
            <div class="rounded-xl bg-surface-container-lowest p-6">
              <span class="mb-2 block text-3xl font-light text-secondary"
                >{stat.value}</span
              >
              <span
                class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
                >{stat.label}</span
              >
            </div>
          {/each}
        </div>
        <p class="font-serif mb-8 text-2xl italic text-on-surface">
          {t.garden.priceLine}
        </p>
        <button
          class="font-label rounded-full bg-secondary px-12 py-4 text-sm uppercase tracking-widest text-on-secondary transition hover:opacity-90"
          type="button"
          onclick={() => {
            window.location.href = "/suites/garden-villa";
          }}
        >
          {t.garden.cta}
        </button>
      </div>
    </div>
  </section>

  <!-- Treehouse Retreat -->
  <section class="mb-24">
    <div
      class="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-[3rem] bg-primary text-on-primary lg:flex-row"
    >
      <div class="w-full p-16 md:p-24 lg:w-1/2">
        <span
          class="mb-8 block text-xs font-bold uppercase tracking-[0.4em] text-secondary"
          >{t.treehouse.kicker}</span
        >
        <h2
          class="mb-8 font-serif text-5xl leading-tight font-light md:text-6xl"
        >
          {t.treehouse.titleLine1} <br />{t.treehouse.titleLine2}
        </h2>
        <p
          class="mb-12 max-w-lg text-lg leading-relaxed font-light text-white/80"
        >
          {t.treehouse.description}
        </p>
        <div class="mb-16 space-y-8">
          {#each t.treehouse.highlights as h}
            <div class="flex items-start gap-6 border-b border-white/10 pb-8">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5"
              >
                <span class="material-symbols-outlined text-secondary"
                  >{h.icon}</span
                >
              </div>
              <div>
                <h4 class="font-serif mb-1 text-xl">{h.title}</h4>
                <p class="text-sm text-white/75">
                  {h.description}
                </p>
              </div>
            </div>
          {/each}
        </div>
        <div class="flex flex-col items-center gap-8 sm:flex-row">
          <div class="text-center sm:text-left">
            <span class="font-serif block text-2xl text-secondary"
              >{t.treehouse.price}</span
            >
            <span class="text-[10px] uppercase tracking-widest opacity-50"
              >{t.treehouse.perNight}</span
            >
          </div>
          <button
            class="font-label rounded-full bg-white px-10 py-4 text-sm uppercase tracking-widest text-primary transition-colors duration-500 hover:bg-secondary hover:text-white"
            type="button"
            onclick={() => {
              window.location.href = "/suites/treehouse-retreat";
            }}
          >
            {t.treehouse.cta}
          </button>
        </div>
      </div>
      <div class="relative min-h-[600px] w-full lg:w-1/2">
        <img
          class="h-full w-full object-cover"
          alt={t.treehouse.imageAlt}
          src={t.treehouse.image}
        />
        <div
          class="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-primary via-transparent to-transparent lg:block"
        ></div>
      </div>
    </div>
  </section>

  <!-- Newsletter -->
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
