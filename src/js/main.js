/* ═══════════════════════════════════════════
   MAIN.JS — Entry Point
   Preloader, Mobile Menu, Form, Back-to-top
   NO custom cursor
   ═══════════════════════════════════════════ */

import { AnimationController } from './animations.js';

class App {
  constructor() {
    this.animations = null;
    this.init();
  }

  init() {
    // Wait for DOM and then start
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    this.preloader();
    this.mobileMenu();
    this.contactForm();
    this.backToTop();
    this.smoothScrollLinks();
  }

  /* ─── Preloader ─────────────────────────── */
  preloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) {
      this.initAnimations();
      return;
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hide');
        this.initAnimations();
      }, 800);
    });

    // Fallback: hide preloader after 3s even if load doesn't fire
    setTimeout(() => {
      if (!preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
        this.initAnimations();
      }
    }, 3000);
  }

  initAnimations() {
    if (!this.animations) {
      this.animations = new AnimationController();
    }
  }

  /* ─── Mobile Menu ───────────────────────── */
  mobileMenu() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Contact Form ──────────────────────── */
  contactForm() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    const nextInput = form.querySelector('input[name="_next"]');
    if (nextInput) {
      const baseUrl = window.location.href.split('#')[0].split('?')[0];
      nextInput.value = `${baseUrl}?mail=sent#contact`;
    }

    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('.btn');
      if (!btn) return;

      const name = form.querySelector('#name')?.value?.trim();
      const email = form.querySelector('#email')?.value?.trim();
      const message = form.querySelector('#message')?.value?.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        btn.textContent = 'Fill All Fields';
        setTimeout(() => { btn.textContent = 'Send Message'; }, 1600);
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;
    });
  }

  /* ─── Back to Top ───────────────────────── */
  backToTop() {
    const btn = document.querySelector('.footer__back-top');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Smooth Scroll (Nav Links) ─────────── */
  smoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// Initialize
new App();
