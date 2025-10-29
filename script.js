// Optional JavaScript for smooth scrolling or dynamic effects
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});
