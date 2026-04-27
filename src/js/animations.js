/* ═══════════════════════════════════════════
   ANIMATIONS.JS — All Interactive Animations
   Rolling Text, Typewriter, Reveal Scroll,
   Card Stack, Reel Carousel, Infinite Carousel,
   Dock Magnification, Stat Counter, Scroll Reveals
   ═══════════════════════════════════════════ */

export class AnimationController {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.initScrollReveal();
    this.initRevealText();
    this.initStatCounter();
    this.initInfiniteCarousel();
    this.initDock();
    this.initParallax();
    this.initDesignMarquee();
    this.initEyes();
    this.initLiquidImage();
    this.initWorksCards();
    this.initResumeFab();
    this.initIphoneMockup();
    this.initTiltCards();
  }

  /* ─── Scroll Reveal ─────────────────────── */
  initScrollReveal() {
    const items = document.querySelectorAll('[data-animate]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    items.forEach(item => observer.observe(item));
    this.observers.push(observer);
  }

  /* ─── Typewriter Effect (Hero Subtitle) ─── */
  initTypewriter() {
    const el = document.getElementById('heroTypewriter');
    if (!el) return;

    const phrases = [
      'Creative Developer',
      'Technology Enthusiast',
      'Problem Solver',
      'UI/UX Thinker',
      'Code Artisan'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const type = () => {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // pause before typing next
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);

    // Stat typewriters
    this.initStatTypewriters();
  }

  /* ─── Stat Typewriter Labels ────────────── */
  initStatTypewriters() {
    const statsSection = document.getElementById('statsSection');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const typewriters = statsSection.querySelectorAll('.stat-typewriter');
          typewriters.forEach((tw, i) => {
            const text = tw.getAttribute('data-text');
            if (!text) return;
            setTimeout(() => {
              this.typeText(tw, text);
            }, i * 600);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
    this.observers.push(observer);
  }

  typeText(el, text) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = text.substring(0, i + 1);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
  }

  /* ─── Reveal Text Scroll ────────────────── */
  initRevealText() {
    const words = document.querySelectorAll('.reveal-word');
    if (!words.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * 300);
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -80px 0px' });

    words.forEach(word => observer.observe(word));
    this.observers.push(observer);
  }

  /* ─── Stat Counter ──────────────────────── */
  initStatCounter() {
    const numbers = document.querySelectorAll('.about__stat-number[data-count]');
    if (!numbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          this.countUp(entry.target, target, 1500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    numbers.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  countUp(el, target, duration) {
    const start = 0;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  /* ─── Infinite Carousel ─────────────────── */
  initInfiniteCarousel() {
    const track = document.querySelector('.infinite-carousel__track');
    if (!track) return;

    // Clone items multiple times for truly seamless infinite loop
    const items = [...track.querySelectorAll('.infinite-carousel__item')];
    // Clone set twice to guarantee no gap on any screen size
    for (let i = 0; i < 2; i++) {
      items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

  /* ─── Dock Magnification (vertical) ──────── */
  initDock() {
    const dock = document.querySelector('.dock__container');
    if (!dock) return;

    const items = dock.querySelectorAll('.dock__item');
    const baseSize = 38;
    const baseImg = 24;

    dock.addEventListener('mousemove', (e) => {
      items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(e.clientY - itemCenter);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const scale = 1 + 0.45 * (1 - distance / maxDistance);
          const imgScale = 1 + 0.35 * (1 - distance / maxDistance);
          item.style.width = `${baseSize * scale}px`;
          item.style.height = `${baseSize * scale}px`;
          const img = item.querySelector('img');
          if (img) {
            img.style.width = `${baseImg * imgScale}px`;
            img.style.height = `${baseImg * imgScale}px`;
          }
        } else {
          item.style.width = '';
          item.style.height = '';
          const img = item.querySelector('img');
          if (img) {
            img.style.width = '';
            img.style.height = '';
          }
        }
      });
    });

    dock.addEventListener('mouseleave', () => {
      items.forEach(item => {
        item.style.width = '';
        item.style.height = '';
        const img = item.querySelector('img');
        if (img) {
          img.style.width = '';
          img.style.height = '';
        }
      });
    });
  }


  /* ─── Parallax (subtle hero) ────────────── */
  initParallax() {
    const heroPhoto = document.querySelector('.hero__photo img');
    if (!heroPhoto) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.15;
          heroPhoto.style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Parallax Marquee (scroll-speed boost) ── */
  initDesignMarquee() {
    // Pure CSS animation handles infinite scroll — no JS transform override
    // This ensures the marquee never stops or stutters
  }

  /* ─── Eyes Follow Cursor ─────────────────── */
  initEyes() {
    const widget = document.getElementById('eyesWidget');
    if (!widget) return;

    const pupils = widget.querySelectorAll('.eyes__pupil');
    const maxMove = 10; // px radius

    const handleMove = (e) => {
      pupils.forEach(pupil => {
        const track = pupil.parentElement;
        const rect = track.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.min(maxMove, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      }
    }, { passive: true });
  }

  /* ─── Liquid Image (WebGL footer) ────────── */
  initLiquidImage() {
    const canvas = document.getElementById('liquidCanvas');
    if (!canvas) return;

    const footer = canvas.closest('.footer');
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const mouse = { x: 0.5, y: 0.5, active: false };
    const maskRadius = { value: 0 };
    let hovered = false;
    let startTime = Date.now();

    // Resize canvas to fill footer
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = footer.offsetWidth;
      const h = footer.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const container = canvas.parentElement;
    container.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
      hovered = true;
    });
    container.addEventListener('mouseleave', () => {
      mouse.active = false;
      hovered = false;
    });
    container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.touches[0].clientX - rect.left) / rect.width;
        mouse.y = (e.touches[0].clientY - rect.top) / rect.height;
        mouse.active = true;
        hovered = true;
      }
    }, { passive: true });
    container.addEventListener('touchend', () => {
      mouse.active = false;
      hovered = false;
    });

    // Shaders
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_maskRadius;

      // Classic random hash
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      // Smooth noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      // Fractal Brownian Motion
      float fbm(vec2 p) {
        float f = 0.0;
        f += 0.5000 * noise(p); p = p * 2.02;
        f += 0.2500 * noise(p); p = p * 2.03;
        f += 0.1250 * noise(p); p = p * 2.01;
        f += 0.0625 * noise(p);
        return f / 0.9375;
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 p = uv * aspect * 4.0; // scale

        // Domain warping for fluid look
        vec2 q = vec2(fbm(p + u_time * 0.15), fbm(p + vec2(5.2, 1.3) + u_time * 0.12));
        vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + u_time * 0.1),
                      fbm(p + 3.0 * q + vec2(8.3, 2.8) + u_time * 0.08));
        float f = fbm(p + 4.0 * r);

        // Premium dark colors
        vec3 colorBase = vec3(0.02, 0.03, 0.05); // deep dark blue/gray
        vec3 colorMid = vec3(0.06, 0.08, 0.12);
        vec3 colorHighlight = vec3(0.1, 0.15, 0.2);
        
        vec3 color = mix(colorBase, colorMid, clamp(f * 1.5, 0.0, 1.0));
        color = mix(color, colorHighlight, clamp(length(q), 0.0, 1.0));
        color *= f * 1.1 + 0.2; // Add some brightness

        // Glow around cursor
        float mask = 0.0;
        if (u_maskRadius > 0.0) {
          float d = distance(v_uv * aspect, u_mouse * aspect);
          mask = smoothstep(u_maskRadius, 0.0, d);
        }
        
        vec3 glowColor = vec3(0.15, 0.25, 0.4) * 0.6; // Interactive blue glow
        color += glowColor * mask;

        // Subtle film grain
        color -= hash(uv + u_time) * 0.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad geometry
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMaskRadius = gl.getUniformLocation(program, 'u_maskRadius');

    // Mask radius animation
    let animStart = null;
    let animFrom = 0;
    let animTo = 0;
    let lastHovered = false;

    const render = () => {
      // Animate mask radius
      if (hovered !== lastHovered) {
        lastHovered = hovered;
        animStart = performance.now();
        animFrom = maskRadius.value;
        animTo = hovered ? 1.0 : 0;
      }
      if (animStart !== null) {
        const t = Math.min((performance.now() - animStart) / 600, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        maskRadius.value = animFrom + (animTo - animFrom) * ease;
        if (t >= 1) animStart = null;
      }

      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const now = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTime, now);

      const mx = mouse.x;
      const my = 1.0 - mouse.y;
      gl.uniform2f(uMouse, mx, my);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uMaskRadius, maskRadius.value);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    render(); // Start rendering loop
  }

  /* ─── Works Cards — Mouse tracking + hover ─── */
  initWorksCards() {
    const cards = document.querySelectorAll('.works__card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* ─── Contact Bar — Entrance animation ─────── */
  initContactBar() {
    const bar = document.getElementById('contactBar');
    if (!bar) return;

    // Fade in after a short delay
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(-50%) translateX(20px)';
    bar.style.transition = 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)';

    setTimeout(() => {
      bar.style.opacity = '1';
      bar.style.transform = 'translateY(-50%) translateX(0)';
    }, 1200);
  }

  /* ─── Resume FAB — Scroll visibility ─────── */
  initResumeFab() {
    const fab = document.getElementById('resumeFab');
    if (!fab) return;

    // Show after scrolling 300px
    fab.style.opacity = '0';
    fab.style.pointerEvents = 'none';
    fab.style.transition = 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.6s ease, background 0.6s ease';

    let visible = false;

    const onScroll = () => {
      const scrolled = window.scrollY > 300;
      if (scrolled && !visible) {
        visible = true;
        fab.style.opacity = '1';
        fab.style.pointerEvents = 'all';
      } else if (!scrolled && visible) {
        visible = false;
        fab.style.opacity = '0';
        fab.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── iPhone Reels — Scroll-snap + auto-play ── */
  initIphoneMockup() {
    const scrollContainer = document.getElementById('reelScroll');
    const mockup = document.getElementById('iphoneMockup');
    const dots = document.querySelectorAll('.reel-dot');
    const hint = document.getElementById('reelSwipeHint');
    if (!scrollContainer || !mockup) return;

    const reelItems = scrollContainer.querySelectorAll('.reel-scroll__item');
    const videos = scrollContainer.querySelectorAll('.iphone-mockup__video');
    let currentReel = 0;

    // Play only the active reel, pause others
    const activateReel = (index) => {
      currentReel = index;
      videos.forEach((v, i) => {
        if (i === index) {
          v.currentTime = 0;
          v.loop = true;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
      // Update dots
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      // Hide swipe hint after first swipe
      if (index > 0 && hint) {
        hint.classList.add('hidden');
      }
    };

    // Detect which reel is in view via IntersectionObserver on each item
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-reel'));
          if (!isNaN(idx)) activateReel(idx);
        }
      });
    }, {
      root: scrollContainer,
      threshold: 0.6
    });

    reelItems.forEach(item => itemObserver.observe(item));
    this.observers.push(itemObserver);

    // Play/pause based on section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateReel(currentReel);
        } else {
          videos.forEach(v => v.pause());
        }
      });
    }, { threshold: 0.2 });

    sectionObserver.observe(mockup);
    this.observers.push(sectionObserver);

    // Subtle 3D tilt on the reels side
    const reelsContainer = document.querySelector('.showcase__reels');
    if (reelsContainer) {
      reelsContainer.addEventListener('mousemove', (e) => {
        const rect = reelsContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mockup.style.transition = 'none';
        mockup.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg)`;
      });

      reelsContainer.addEventListener('mouseleave', () => {
        mockup.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        mockup.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      });
    }

    // Start first reel
    activateReel(0);
  }

  /* ── 3D Tilt Cards (Skills section) ── */
  initTiltCards() {
    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length) return;

    const MAX_ROTATION = 12; // degrees
    const TRANSITION_MS = 400;

    cards.forEach(card => {
      let rect;
      let raf;

      const onEnter = () => {
        rect = card.getBoundingClientRect();
        card.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.03,.98,.52,.99), box-shadow ${TRANSITION_MS}ms ease`;
      };

      const onMove = (e) => {
        if (!rect) return;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const midX = rect.width / 2;
          const midY = rect.height / 2;

          const rotateY = ((x - midX) / midX) * MAX_ROTATION;
          const rotateX = ((midY - y) / midY) * MAX_ROTATION;

          // Update glare position via custom properties
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;

          card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
          card.style.setProperty('--glare-x', `${glareX}%`);
          card.style.setProperty('--glare-y', `${glareY}%`);
        });
      };

      const onLeave = () => {
        cancelAnimationFrame(raf);
        card.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(.03,.98,.52,.99), box-shadow ${TRANSITION_MS}ms ease`;
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.setProperty('--glare-x', '50%');
        card.style.setProperty('--glare-y', '50%');
      };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  destroy() {
    this.observers.forEach(obs => obs.disconnect());
    this.observers = [];
  }
}
