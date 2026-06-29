(function () {
  const BRAND = { r: 74, g: 98, b: 138 };

  function initHeroStars() {
    const canvas = document.getElementById("hero-stars");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, stars, animId;
    const COUNT = 140;

    function resize() {
      const dpr = devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 0.08
      }));
    }

    function draw() {
      const t = Date.now() * 0.001;
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const starRgb = isDark ? "168,188,212" : "74,98,138";
      const glowAlpha = isDark ? 0.1 : 0.06;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w * 0.7, h * 0.4, 0, w * 0.7, h * 0.4, w * 0.6);
      grad.addColorStop(0, `rgba(${starRgb},${glowAlpha})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      stars.forEach((s) => {
        s.y += s.drift;
        if (s.y < -5) s.y = h + 5;
        if (s.y > h + 5) s.y = -5;
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
        const alpha = (isDark ? 0.25 : 0.15) + twinkle * (isDark ? 0.65 : 0.55);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${starRgb},${alpha})`;
        ctx.arc(s.x, s.y, s.r * (0.7 + twinkle * 0.5), 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.2 && twinkle > 0.85) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${starRgb},${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(s.x - 4, s.y);
          ctx.lineTo(s.x + 4, s.y);
          ctx.moveTo(s.x, s.y - 4);
          ctx.lineTo(s.x, s.y + 4);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    });
  }

  function initPhilosophyCanvas() {
    const canvas = document.getElementById("philosophy-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, animId;
    const lines = [];

    function resize() {
      const dpr = devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines.length = 0;
      for (let i = 0; i < 12; i++) {
        lines.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 40 + Math.random() * 80,
          speed: 0.3 + Math.random() * 0.6,
          horiz: Math.random() > 0.5
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      lines.forEach((l) => {
        if (l.horiz) {
          l.x += l.speed;
          if (l.x > w + l.len) l.x = -l.len;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,255,255,0.06)";
          ctx.lineWidth = 1;
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(l.x + l.len, l.y);
          ctx.stroke();
        } else {
          l.y += l.speed;
          if (l.y > h + l.len) l.y = -l.len;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,255,255,0.06)";
          ctx.lineWidth = 1;
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(l.x, l.y + l.len);
          ctx.stroke();
        }
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(animId);
      resize();
      draw();
    });
  }

  function initSectionCanvases() {
    document.querySelectorAll(".section-canvas").forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      let w, h, dots, animId;
      const dark = canvas.classList.contains("section-canvas--dark");

      function resize() {
        const dpr = devicePixelRatio || 1;
        const parent = canvas.parentElement;
        w = parent.offsetWidth;
        h = parent.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dots = Array.from({ length: 20 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          phase: Math.random() * Math.PI * 2
        }));
      }

      function draw() {
        ctx.clearRect(0, 0, w, h);
        const t = Date.now() * 0.001;
        dots.forEach((d) => {
          const pulse = Math.sin(t + d.phase) * 0.5 + 0.5;
          const alpha = dark ? 0.08 + pulse * 0.12 : 0.04 + pulse * 0.08;
          const color = dark ? `rgba(255,255,255,${alpha})` : `rgba(${BRAND.r},${BRAND.g},${BRAND.b},${alpha})`;
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(d.x, d.y, 2 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        animId = requestAnimationFrame(draw);
      }

      resize();
      draw();
      window.addEventListener("resize", () => {
        cancelAnimationFrame(animId);
        resize();
        draw();
      });
    });
  }

  function initScrollAnimations() {
    const heroAnims = document.querySelectorAll(".hero .anim:not(.in-view)");
    heroAnims.forEach((el) => {
      const delay = (parseInt(el.dataset.delay, 10) || 0) * 60;
      setTimeout(() => el.classList.add("in-view"), 80 + delay);
    });

    if (!window._scrollObserver) {
      window._scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseInt(el.dataset.delay, 10) || 0;
            const stagger = el.dataset.stagger;
            if (stagger !== undefined && stagger !== "") {
              setTimeout(() => el.classList.add("in-view"), parseInt(stagger, 10) * 45);
            } else if (delay) {
              setTimeout(() => el.classList.add("in-view"), delay * 45);
            } else {
              el.classList.add("in-view");
            }
            window._scrollObserver.unobserve(el);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -16px 0px" }
      );
    }

    document.querySelectorAll(".anim:not(.in-view):not(.hero .anim)").forEach((el) => {
      window._scrollObserver.observe(el);
    });
  }

  function initParallax() {
    /* disabled — chip stays fixed in place */
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroStars();
    initPhilosophyCanvas();
    initSectionCanvases();
    initScrollAnimations();
    initParallax();
  });

  window.reinitAnimations = initScrollAnimations;
})();
