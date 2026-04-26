/* ============================================
   SMOOTH SCROLL — Lenis-inspired inertia
   ============================================ */

class SmoothScroll {
  constructor() {
    this.current = 0;
    this.target = 0;
    this.ease = 0.08;
    this.rafId = null;
    this.isEnabled = true;
    this.scrollHeight = 0;
    this.windowHeight = 0;

    this.wrapper = document.querySelector('.page-wrapper');
    
    if (!this.wrapper) return;

    this.init();
  }

  init() {
    this.updateDimensions();
    this.addEventListeners();
    this.animate();
  }

  updateDimensions() {
    this.scrollHeight = this.wrapper.scrollHeight;
    this.windowHeight = window.innerHeight;
    document.body.style.height = `${this.scrollHeight}px`;
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.updateDimensions();
    });

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') {
          this.target = 0;
          return;
        }
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          this.target = this.current + rect.top;
          this.target = Math.max(0, Math.min(this.target, this.scrollHeight - this.windowHeight));
        }
      });
    });
  }

  animate() {
    this.target = window.scrollY;
    this.current += (this.target - this.current) * this.ease;

    // Round to prevent sub-pixel rendering
    const roundedCurrent = Math.round(this.current * 100) / 100;

    if (this.wrapper) {
      this.wrapper.style.transform = `translate3d(0, ${-roundedCurrent}px, 0)`;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  scrollTo(target) {
    this.target = target;
    window.scrollTo(0, target);
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    document.body.style.height = '';
    if (this.wrapper) {
      this.wrapper.style.transform = '';
    }
  }
}

// Use native smooth scroll for better compatibility  
// The smooth scroll class is available but we use CSS scroll-behavior for simplicity
document.documentElement.style.scrollBehavior = 'smooth';

// Smooth anchor scrolling
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = 80; // nav height
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});

export { SmoothScroll };
