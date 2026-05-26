// script.js
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if(preloader) {
    gsap.to(preloader, { opacity: 0, duration: 0.6, delay: 0.5, onComplete: () => preloader.remove() });
  }
});

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if(window.scrollY > 50) nav.style.padding = '12px 0';
  else nav.style.padding = '20px 0';
});

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if(toggle && menu) {
  toggle.addEventListener('click', () => menu.classList.toggle('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => menu.classList.remove('active')));
}

// Hero animations
gsap.from('.hero-title', { duration: 1, y: 100, opacity: 0, ease: 'power3.out', delay: 0.3 });
gsap.from('.hero-text, .hero-tagline, .hero-buttons', { duration: 0.8, y: 40, opacity: 0, stagger: 0.2, delay: 0.5 });

// Scroll reveal all sections
gsap.utils.toArray('.feature-card, .program-card, .activity-item, .about-grid, .contact-info, .value-item').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    y: 50, opacity: 0, duration: 0.7, stagger: 0.1
  });
});

// Parallax hero background (gentle)
gsap.to('.hero-bg', {
  scrollTrigger: { scrub: true, start: 'top top', end: 'bottom top' },
  y: 200, opacity: 0.1
});

// 3D tilt effect on cards (vanilla)
document.querySelectorAll('.feature-card, .program-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
});

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if(href !== '#' && href !== '') {
      const target = document.querySelector(href);
      if(target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});
