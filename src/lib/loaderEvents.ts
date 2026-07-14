export const HERO_IMAGE_LOADED_EVENT = "hero_image_loaded";

// Dispatches the same event the preloader listens for.
// `once=true` prevents repeated dispatches.
let dispatched = false;

export function dispatchHeroImageLoadedOnce() {
  if (typeof window === "undefined") return;
  if (dispatched) return;
  dispatched = true;

  window.dispatchEvent(new Event(HERO_IMAGE_LOADED_EVENT));
}

