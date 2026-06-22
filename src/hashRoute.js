export function navigateToHash(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }

  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
