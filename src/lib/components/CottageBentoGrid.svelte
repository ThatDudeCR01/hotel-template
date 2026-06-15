<script lang="ts">
  export type CottageBentoCard = {
    href: string;
    title: string;
    description: string;
    price: string;
    image: string;
    imageAlt: string;
    badge?: string;
    slug?: string;
  };

  let {
    cards,
    ctaLabel = "View details",
  }: {
    cards: CottageBentoCard[];
    ctaLabel?: string;
  } = $props();

  const BENTO_ORDER = [
    "poas-cottage",
    "mariposa-cottage",
    "colibri-cottage",
    "morpho-cottage",
  ] as const;

  function slugFor(card: CottageBentoCard): string {
    return card.slug ?? card.href.split("/").filter(Boolean).pop() ?? "";
  }

  const orderedCards = $derived(
    [...cards].sort(
      (a, b) =>
        BENTO_ORDER.indexOf(slugFor(a) as (typeof BENTO_ORDER)[number]) -
        BENTO_ORDER.indexOf(slugFor(b) as (typeof BENTO_ORDER)[number]),
    ),
  );
</script>

<div class="cottages-bento">
  {#each orderedCards as card (slugFor(card))}
    <a
      class="bento-cottage bento-cottage--{slugFor(
        card,
      )} group block min-h-[16rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      href={card.href}
    >
      <article
        class="relative h-full min-h-[inherit] overflow-hidden rounded-2xl bg-primary shadow-sm transition duration-500 group-hover:shadow-[0_32px_64px_-12px_rgba(24,35,26,0.14)]"
      >
        <img
          class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          alt={card.imageAlt}
          src={card.image}
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-primary from-25% via-primary/50 to-primary/25"
        ></div>

        <div
          class="relative flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-8"
        >
          {#if card.badge}
            <span
              class="mb-3 w-fit rounded-full bg-secondary px-3 py-1 text-[10px] font-bold tracking-widest text-on-secondary uppercase"
            >
              {card.badge}
            </span>
          {/if}
          <div class="flex items-end justify-between gap-4">
            <div>
              <h3
                class="font-serif text-2xl font-medium text-surface-container-lowest md:text-3xl [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"
              >
                {card.title}
              </h3>
              <p
                class="mt-2 line-clamp-2 text-sm leading-relaxed font-normal text-surface-container-lowest/95 md:line-clamp-3 [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]"
              >
                {card.description}
              </p>
            </div>
            <span
              class="shrink-0 text-right text-sm font-bold tracking-wide text-secondary-fixed [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]"
            >
              {card.price}
            </span>
          </div>
          <p
            class="mt-4 text-[10px] font-bold tracking-widest text-secondary-fixed uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {ctaLabel}
          </p>
        </div>
      </article>
    </a>
  {/each}
</div>
