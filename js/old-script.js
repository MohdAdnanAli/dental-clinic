// TRIDENT Old Script - Scroll animations + nav effects
// Intersection Observer for fade-in
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
faders.forEach(el => observer.observe(el));

// Nav background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(11,31,58,0.99)';
  } else {
    nav.style.background = 'rgba(11,31,58,0.96)';
  }
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^=\"#\"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  }
  );
});

// Video toggle (from old inline)
function toggleVolume() {
  const video = document.getElementById('clinic-video');
  if (video) {
    video.muted = !video.muted;
    const toggle = document.querySelector('.volume-toggle');
    toggle.textContent = video.muted ? '🔇' : '🔊';
  }
}

// Merge with new main.js capabilities if needed

