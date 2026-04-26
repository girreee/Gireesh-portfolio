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

    // Use the portrait as the image source
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'images/girree-portrait.jpg';

    const mouse = { x: -10, y: -10, active: false };
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
      uniform sampler2D u_image;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_strength;
      uniform float u_speed;
      uniform vec2 u_resolution;
      uniform float u_maskRadius;

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);

        // Liquid ripple from mouse
        if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0) {
          float dist = distance(uv * aspect, u_mouse * aspect);
          float ripple = sin(24.0 * dist - u_time * 6.0 * u_speed) * 0.03;
          float falloff = exp(-dist * 10.0);
          uv += normalize(uv - u_mouse) * ripple * u_strength * falloff;
        }

        // Ambient subtle wave
        uv.x += sin(uv.y * 12.0 + u_time * 0.8) * 0.002;
        uv.y += cos(uv.x * 10.0 + u_time * 0.6) * 0.002;

        uv = clamp(uv, 0.0, 1.0);
        vec4 color = texture2D(u_image, uv);

        // Grayscale base
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 grayColor = vec3(gray) * 0.3; // dark grayscale

        // Color reveal around cursor
        float mask = 0.0;
        if (u_mouse.x >= 0.0 && u_mouse.x <= 1.0 && u_maskRadius > 0.0) {
          float d = distance(uv * aspect, u_mouse * aspect);
          mask = smoothstep(u_maskRadius, u_maskRadius * 0.6, d);
        }

        vec3 finalColor = mix(grayColor, color.rgb * 0.6, mask);

        // Dark overlay for readability
        finalColor *= 0.35;

        gl_FragColor = vec4(finalColor, 1.0);
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
    const uStrength = gl.getUniformLocation(program, 'u_strength');
    const uSpeed = gl.getUniformLocation(program, 'u_speed');
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMaskRadius = gl.getUniformLocation(program, 'u_maskRadius');

    // Texture
    const tex = gl.createTexture();
    let loaded = false;

    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      // Draw to offscreen canvas with cover logic
      const offCanvas = document.createElement('canvas');
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const ctx = offCanvas.getContext('2d');
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      ctx.drawImage(img, (canvas.width - sw) / 2, (canvas.height - sh) / 2, sw, sh);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);

      loaded = true;
      render();
    };

    // Mask radius animation
    let animStart = null;
    let animFrom = 0;
    let animTo = 0;
    let lastHovered = false;

    const render = () => {
      if (!loaded) return;

      // Animate mask radius
      if (hovered !== lastHovered) {
        lastHovered = hovered;
        animStart = performance.now();
        animFrom = maskRadius.value;
        animTo = hovered ? 1.2 : 0;
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

      const mx = mouse.active ? mouse.x : -10;
      const my = mouse.active ? 1 - mouse.y : -10;
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uStrength, 0.12);
      gl.uniform1f(uSpeed, 0.15);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uMaskRadius, maskRadius.value);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };
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
