// ============================================
// READERBEARS LANDING PAGE — script.js
// ============================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  hamburger.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
});

// Close mobile menu when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// --- Scroll reveal animation ---
const revealEls = document.querySelectorAll(
  '.feature-card, .step, .screen-card, .about-card, .about-text, .trust-item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Animate letter boxes cycling in app preview ---
const letterBoxes = document.querySelectorAll('.letter-box');
if (letterBoxes.length > 0) {
  let current = 2; // start at 'T' (index 2)
  setInterval(() => {
    letterBoxes.forEach((box, i) => {
      box.classList.remove('done', 'active');
      if (i < current) box.classList.add('done');
      if (i === current) box.classList.add('active');
    });
    current = (current + 1) % letterBoxes.length;
    if (current === 0) {
      // Reset all to empty
      letterBoxes.forEach(box => box.classList.remove('done', 'active'));
    }
  }, 1500);
}

// --- Google Play button click tracking (placeholder) ---
document.querySelectorAll('.btn-play, .btn-primary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (btn.getAttribute('href') === 'https://play.google.com/store') {
      // Replace with your actual Google Play URL when published
      console.log('Google Play redirect');
    }
  });
});
