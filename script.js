/* ========================================
   CONSCIOUS FAMILY CENTRE - CINEMATIC SCRIPT
   ======================================== */

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========== PRELOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => preloader.remove()
      });
    }
  }, 800);
});

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0,
      ease: 'power2.out'
    });
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out'
    });
  });

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .philosophy-card, .program-card, .featured-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.width = '60px';
      cursorFollower.style.height = '60px';
      cursorFollower.style.borderColor = '#4CAF50';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderColor = '#1F6B3A';
    });
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MOBILE MENU TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ========== THREE.JS HERO SCENE ==========
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Floating particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 800;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 20;
    posArray[i+1] = (Math.random() - 0.5) * 10;
    posArray[i+2] = (Math.random() - 0.5) * 15 - 5;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x4CAF50,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Leaf particles (larger)
  const leafGeometry = new THREE.BufferGeometry();
  const leafCount = 150;
  const leafPosArray = new Float32Array(leafCount * 3);

  for (let i = 0; i < leafCount * 3; i += 3) {
    leafPosArray[i] = (Math.random() - 0.5) * 25;
    leafPosArray[i+1] = (Math.random() - 0.5) * 12;
    leafPosArray[i+2] = (Math.random() - 0.5) * 20 - 10;
  }

  leafGeometry.setAttribute('position', new THREE.BufferAttribute(leafPosArray, 3));

  const leafMaterial = new THREE.PointsMaterial({
    color: 0x1F6B3A,
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
  });

  const leafMesh = new THREE.Points(leafGeometry, leafMaterial);
  scene.add(leafMesh);

  camera.position.z = 8;

  // Animation
  let time = 0;
  function animateHero() {
    requestAnimationFrame(animateHero);
    time += 0.005;

    particlesMesh.rotation.y = time * 0.2;
    particlesMesh.rotation.x = Math.sin(time * 0.1) * 0.1;
    leafMesh.rotation.y = -time * 0.15;
    leafMesh.rotation.x = Math.cos(time * 0.08) * 0.1;

    renderer.render(scene, camera);
  }

  animateHero();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ========== PRELOADER CANVAS (Simple particle effect) ==========
const preloaderCanvas = document.getElementById('preloader-canvas');
if (preloaderCanvas) {
  const ctx = preloaderCanvas.getContext('2d');
  preloaderCanvas.width = window.innerWidth;
  preloaderCanvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * preloaderCanvas.width,
      y: Math.random() * preloaderCanvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: `rgba(76, 175, 80, ${Math.random() * 0.5 + 0.2})`
    });
  }

  function animatePreloader() {
    if (!ctx) return;
    ctx.clearRect(0, 0, preloaderCanvas.width, preloaderCanvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > preloaderCanvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > preloaderCanvas.height) p.speedY *= -1;
    }
    requestAnimationFrame(animatePreloader);
  }

  animatePreloader();
}

// ========== GSAP SCROLL REVEAL ANIMATIONS ==========
// Philosophy cards
gsap.utils.toArray('.philosophy-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.1,
    ease: 'power3.out'
  });
});

// Featured items
gsap.utils.toArray('.featured-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    delay: i * 0.15,
    ease: 'power3.out'
  });
});

// About page elements
gsap.utils.toArray('.about-grid, .value-item, .program-card, .activity-item, .contact-info, .contact-note').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    delay: i * 0.1,
    ease: 'power3.out'
  });
});

// ========== 3D TILT EFFECT ON CARDS ==========
const tiltCards = document.querySelectorAll('.philosophy-card, .program-card, .featured-item');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
});

// ========== PARALLAX SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ========== SMOOTH ANCHOR SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '' && href !== '/') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ========== CTA PARTICLE EFFECT (Optional enhancement) ==========
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  const ctaParticles = document.createElement('canvas');
  ctaParticles.classList.add('cta-particles-canvas');
  ctaSection.appendChild(ctaParticles);
  // Simple floating circles for CTA section
  const ctaCtx = ctaParticles.getContext('2d');
  ctaParticles.width = ctaSection.offsetWidth;
  ctaParticles.height = ctaSection.offsetHeight;

  const ctaParticlesArray = [];
  for (let i = 0; i < 30; i++) {
    ctaParticlesArray.push({
      x: Math.random() * ctaParticles.width,
      y: Math.random() * ctaParticles.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3
    });
  }

  function animateCTAParticles() {
    if (!ctaCtx) return;
    ctaCtx.clearRect(0, 0, ctaParticles.width, ctaParticles.height);
    for (let p of ctaParticlesArray) {
      ctaCtx.beginPath();
      ctaCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctaCtx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctaCtx.fill();
      p.y -= p.speed;
      if (p.y < 0) p.y = ctaParticles.height;
    }
    requestAnimationFrame(animateCTAParticles);
  }

  animateCTAParticles();

  window.addEventListener('resize', () => {
    ctaParticles.width = ctaSection.offsetWidth;
    ctaParticles.height = ctaSection.offsetHeight;
  });
}

// ========== FLOATING ANIMATION FOR ICONS ==========
gsap.utils.toArray('.philosophy-icon i, .value-item i').forEach(icon => {
  gsap.to(icon, {
    y: -5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
});

console.log('Conscious Family Centre — Cinematic Experience Loaded');
