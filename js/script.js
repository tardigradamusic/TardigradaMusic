document.addEventListener("DOMContentLoaded", () => {
  const artworks = document.querySelectorAll(".artwork");

  // Helper: tutup semua artwork
  function closeAllArtworks() {
    artworks.forEach(a => a.classList.remove("is-active"));
  }

  artworks.forEach(artwork => {
    artwork.addEventListener("click", (e) => {
      // Jika klik pada link platform, biarkan normal
      if (e.target.closest("a")) return;

      // Toggle artwork yang diklik
      const isActive = artwork.classList.contains("is-active");

      closeAllArtworks();

      if (!isActive) {
        artwork.classList.add("is-active");
      }
    });
  });

  // Klik di luar artwork → tutup semua
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".artwork")) {
      closeAllArtworks();
    }
  });
});
