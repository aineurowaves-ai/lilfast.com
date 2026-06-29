(function () {
  const LANG_KEY = "lilfast-lang";
  const supported = ["en", "pl", "de", "fr"];
  let currentLang = localStorage.getItem(LANG_KEY) || detectLang();

  const SERVICE_ICONS = [
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20h20M5 20V8l7-5 7 5v12"/><rect x="9" y="12" width="6" height="8"/></svg>`
  ];

  function detectLang() {
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return supported.includes(browser) ? browser : "en";
  }

  function t(path) {
    const keys = path.split(".");
    let val = translations[currentLang];
    for (const k of keys) val = val?.[k];
    return val ?? path;
  }

  function setLang(lang) {
    if (!supported.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateLangButtons();
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = t(el.getAttribute("data-i18n"));
      if (typeof val === "string") el.textContent = val;
    });
    renderServices();
    renderWhy();
    renderProcess();
    renderIndustries();
    if (window.reinitAnimations) window.reinitAnimations();
  }

  function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid) return;
    const keys = ["s1", "s2", "s3", "s4", "s5", "s6"];
    grid.innerHTML = keys
      .map((key, i) => {
        const svc = t(`services.${key}`);
        const items = svc.items.map((item) => `<li>${item}</li>`).join("");
        return `
          <article class="svc-card anim" data-anim="fade-up" data-stagger="${i}">
            <div class="svc-head">
              <div class="svc-icon">${SERVICE_ICONS[i]}</div>
              <h3>${svc.title}</h3>
            </div>
            <p class="svc-desc">${svc.desc}</p>
            <ul class="svc-list">${items}</ul>
          </article>`;
      })
      .join("");
  }

  function renderWhy() {
    const list = document.getElementById("why-list");
    if (!list) return;
    const items = t("why.items");
    list.innerHTML = items
      .map(
        (item, i) => `
        <div class="why-item anim" data-anim="fade-left" data-stagger="${i}">
          <div class="why-marker" aria-hidden="true"></div>
          <div class="why-content">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </div>`
      )
      .join("");
  }

  function renderProcess() {
    const track = document.getElementById("process-track");
    if (!track) return;
    const steps = t("process.steps");
    track.innerHTML = steps
      .map(
        (step, i) => `
        <article class="process-card anim" data-anim="fade-up" data-stagger="${i}">
          <div class="process-card-top">
            <span class="process-step-badge">${String(i + 1).padStart(2, "0")}</span>
            ${i < steps.length - 1 ? '<span class="process-arrow" aria-hidden="true">→</span>' : ""}
          </div>
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </article>`
      )
      .join("");
  }

  function renderIndustries() {
    const grid = document.getElementById("industries-grid");
    if (!grid) return;
    const items = t("industries.items");
    grid.innerHTML = items
      .map(
        (item, i) => `
        <div class="ind-card anim" data-anim="scale-in" data-stagger="${i}">
          <strong>${item}</strong>
        </div>`
      )
      .join("");
  }

  function updateLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
  }

  function initNav() {
    const header = document.getElementById("header");
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("nav-links");

    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    });

    toggle?.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });

    nav?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle?.classList.remove("open");
      });
    });
  }

  function initLangSwitcher() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
  }

  function initTheme() {
    const THEME_KEY = "lilfast-theme";
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    function applyTheme(theme) {
      if (theme === "dark") {
        root.setAttribute("data-theme", "dark");
      } else {
        root.removeAttribute("data-theme");
      }
      localStorage.setItem(THEME_KEY, theme);
    }

    toggle?.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setLang(currentLang);
    initNav();
    initLangSwitcher();
    initTheme();
  });
})();
