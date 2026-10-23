(() => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  const updateTopbarSize = () => {
    topbar.classList.toggle("is-compact", window.scrollY > 12);
  };

  window.addEventListener("scroll", updateTopbarSize, { passive: true });
  updateTopbarSize();
})();
