<script lang="ts">
  import { locale } from "$lib/locale.svelte";
  import copyEn from "$lib/locales/newsletter-confirmation.en.json";
  import copyEs from "$lib/locales/newsletter-confirmation.es.json";

  const t = $derived(locale.current === "es" ? copyEs : copyEn);

  const heroImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDm5ERSgx7lluJxQO3RBjDXrhuubVo4gI_gueFsJqfVO1vR7aQ2OdIk9xSmtz5BXDsBb50WKrtl7iIXmhXKtjd5WZjOy8Ak3epPLj4UgC7covbFIbRKneshrk8UxkSEoNSOxKAzHY30bAb2Vhldyaa3kixLVUt--ntii4xpAWNs82HnojKDiLyjpqZaOJVh5_YHgvmpqlCpdXNI06_akrFN1vPK0vFYT9sRedSs4bHIaJGOm8P0UP0eHQ3tYVDvdkmR9qeiZj42hg";
</script>

<!-- Contenido dentro del <main> del layout (header/footer ya en +layout) -->
<div class="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center pt-8 pb-16 md:pt-12">
  <!-- Background -->
  <div class="absolute inset-0 z-0">
    <div class="relative h-full min-h-[560px] w-full overflow-hidden md:min-h-screen">
      <img
        class="h-full min-h-[560px] w-full object-cover md:min-h-screen"
        alt={t.imageAlt}
        src={heroImage}
      />
      <div class="absolute inset-0 bg-primary/35 mix-blend-multiply"></div>
      <div
        class="absolute inset-0 bg-linear-to-b from-transparent via-primary/20 to-surface"
      ></div>
    </div>
  </div>

  <div
    class="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 px-8 text-center"
  >
    <div class="flex flex-col items-center gap-4">
      <span
        class="font-label mb-4 rounded-full bg-primary/20 px-4 py-1 text-[10px] tracking-[0.3em] text-on-primary/70 uppercase backdrop-blur-md"
        >{t.kicker}</span
      >
      <h1
        class="font-headline text-5xl leading-tight tracking-tight text-white md:text-8xl"
      >
        {t.titleBefore}
        <br />
        <span class="text-secondary-fixed italic">{t.titleAccent}</span>
      </h1>
    </div>

    <div
      class="max-w-2xl rounded-xl border border-white/10 bg-surface-container-lowest/10 p-8 backdrop-blur-sm md:p-12"
    >
      <p
        class="mb-8 text-xl leading-relaxed font-light text-white md:text-2xl"
      >
        {t.lead}
      </p>
      <p
        class="font-body text-base leading-loose tracking-wide text-white/80 md:text-lg"
      >
        {t.body}
      </p>
    </div>

    <div class="mt-4 flex flex-col items-center gap-8 md:flex-row">
      <a
        class="group bg-secondary text-on-secondary relative overflow-hidden rounded-full px-12 py-5 transition-all duration-700 hover:shadow-[0_20px_40px_rgba(119,90,25,0.2)]"
        href="/suites"
      >
        <span
          class="font-label relative z-10 text-xs font-bold tracking-widest uppercase"
          >{t.ctaVillas}</span
        >
      </a>
      <a
        class="group flex items-center gap-3 text-white/90 transition-colors duration-500 hover:text-white"
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="material-symbols-outlined text-lg" aria-hidden="true"
          >photo_camera</span
        >
        <span class="font-label text-[10px] tracking-[0.2em] uppercase"
          >{t.ctaInstagram}</span
        >
        <div
          class="h-px w-8 bg-white/30 transition-all duration-700 group-hover:w-12"
        ></div>
      </a>
    </div>
  </div>

  <section
    class="relative z-10 mt-24 w-full border-t border-outline-variant/10 bg-surface py-16 md:py-24"
  >
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-8 md:grid-cols-3">
      {#each t.columns as col}
        <div class="flex flex-col gap-6">
          <h3 class="font-headline text-2xl text-primary italic">{col.title}</h3>
          <p class="font-body text-sm leading-relaxed text-on-surface-variant">
            {col.body}
          </p>
        </div>
      {/each}
    </div>
  </section>
</div>
