(() => {
  const loader = document.getElementById("site-loader");
  if (!loader) return;

  const sessionKey = "gtechnology-loader-seen";
  let alreadySeen = false;
  try {
    alreadySeen = window.sessionStorage.getItem(sessionKey) === "1";
    if (!alreadySeen) window.sessionStorage.setItem(sessionKey, "1");
  } catch (_error) {
    // Keep the loader usable in browsers that block session storage.
  }

  const isHomePage = document.documentElement.classList.contains("site-home-page");
  if (alreadySeen && !isHomePage) {
    loader.remove();
    return;
  }

  const startedAt = performance.now();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumDuration = reducedMotion ? 450 : 1000;
  let hideQueued = false;

  const hideLoader = () => {
    if (hideQueued) return;
    hideQueued = true;
    const wait = Math.max(0, minimumDuration - (performance.now() - startedAt));

    window.setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.removeAttribute("aria-busy");
      window.setTimeout(() => loader.remove(), 650);
    }, wait);
  };

  document.body.setAttribute("aria-busy", "true");
  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 8000);
})();
