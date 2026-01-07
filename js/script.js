document.addEventListener("DOMContentLoaded", () => {
  const artworks = document.querySelectorAll(".artwork");

  // Tutup semua artwork
  function closeAll() {
    artworks.forEach(a => a.classList.remove("active"));
  }

  artworks.forEach(artwork => {
    artwork.addEventListener("click", (e) => {
      // Jika klik pada icon platform → JANGAN toggle
      if (e.target.closest(".platforms a")) return;

      const isActive = artwork.classList.contains("active");

      closeAll();

      if (!isActive) {
        artwork.classList.add("active");
      }
    });
  });

  // Klik di luar artwork → tutup semua
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".artwork")) {
      closeAll();
    }
  });
});
