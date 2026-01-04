/* ===============================
   Apple-style Smooth Navigation
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section[id]");

  /* ===============================
     Smooth Scroll
     =============================== */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const headerOffset = header.offsetHeight;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset + 10;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  /* ===============================
     Header Shadow on Scroll
     =============================== */
  const handleHeader = () => {
    header.style.boxShadow =
      window.scrollY > 20
        ? "0 1px 0 rgba(0,0,0,.08)"
        : "none";
  };

  window.addEventListener("scroll", handleHeader);

  /* ===============================
     Active Nav Highlight
     =============================== */
  const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ===============================
     Fade-in on Scroll (Apple Style)
     =============================== */
  const fadeElements = document.querySelectorAll(
    ".section, .release, .hero-content"
  );

  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeElements.forEach(el => {
    el.classList.add("fade");
    fadeObserver.observe(el);
  });

  /* ===============================
     Artwork Hover / Tap Support
     =============================== */
  const artworks = document.querySelectorAll(".artwork");

  artworks.forEach(artwork => {
    // Mobile tap
    artwork.addEventListener("touchstart", () => {
      artworks.forEach(a => a.classList.remove("active"));
      artwork.classList.add("active");
    });
  });

  /* ===============================
     Dynamic Background Blur (Music)
     =============================== */
  const musicSection = document.querySelector("#music");

  artworks.forEach(artwork => {
    const img = artwork.querySelector("img");

    artwork.addEventListener("mouseenter", () => {
      if (!musicSection || !img) return;
      musicSection.style.backgroundImage = `url('${img.src}')`;
    });
  });

});
