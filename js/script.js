/* ===============================
   Apple-style Smooth Navigation
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section[id]");

  /* ===============================
     Smooth Scroll (fallback support)
     =============================== */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      const headerOffset = header.offsetHeight;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset + 10;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
  });

  /* ===============================
     Header Blur on Scroll
     =============================== */
  const handleHeader = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 1px 0 rgba(0,0,0,.08)";
    } else {
      header.style.boxShadow = "none";
    }
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
        const id = entry.target.getAttribute("id");

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

});
