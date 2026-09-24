// Central asset map for Sirocco — Luxury Desert Retreat.
//
// The Supabase-hosted assets whose full UUIDs were supplied in the ASSET MAP
// are referenced directly. Five entries (Dune / Oasis / Riad suites and the
// Caravan / Stargazing excursions) arrived with truncated UUIDs, so they are
// backed by bespoke, on-theme desert imagery generated into /img.
const BASE =
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets'

export const assets = {
  hero: `${BASE}/7b9a060d-112b-4bb3-aa79-79572cda559f_1600w.webp`,
  philosophy: `${BASE}/73bce808-f5c2-4189-ae6a-f18a1da1c369_1600w.webp`,
  wellness: `${BASE}/5456b531-01fe-4da5-8be1-a0deca8b6f75_1600w.webp`,
  dining: `${BASE}/9f24c8ed-3c97-4161-8026-45c10fe6d2d0_1600w.webp`,
  sandboarding: `${BASE}/0d8211a4-26b5-4807-a318-341fc553887f/800w.png`,
  reserve: `${BASE}/2129efee-d6e5-40da-82f5-72efea83e763_1600w.jpg`,

  // Truncated in the supplied ASSET MAP (partial UUIDs only) — bespoke stand-ins.
  suiteDune: '/img/suite-dune.jpg', //  original ref: ...11adc7f8...
  suiteOasis: '/img/suite-oasis.jpg', // original ref: ...a525c23d...
  suiteRiad: '/img/suite-riad.jpg', //   original ref: ...be54afda...
  caravan: '/img/excursion-caravan.jpg', //     original ref: ...16395f98...
  stargazing: '/img/excursion-stargazing.jpg', //original ref: ...2ee2b945...
}

export default assets
