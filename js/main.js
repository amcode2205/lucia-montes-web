(() => {
  // ===== Preloader (Serenity) =====
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const minLoadTime = 1100;
    const startTime = Date.now();
    let done = false;

    const hidePreloader = () => {
      if (done) return;
      done = true;
      const remaining = Math.max(0, minLoadTime - (Date.now() - startTime));
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => preloader.remove(), 750);
      }, remaining);
    };

    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 4500);
  }

  // ===== Carrusel =====
  const carrusel = document.querySelector("[data-carrusel]");
  if (carrusel) {
    const slides = [...carrusel.querySelectorAll(".carrusel-slide")];
    const dots = [...carrusel.querySelectorAll("[data-carrusel-dot]")];
    const prev = carrusel.querySelector("[data-carrusel-prev]");
    const next = carrusel.querySelector("[data-carrusel-next]");
    let index = 0;
    let timer;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
      dots.forEach((dot, n) => dot.classList.toggle("is-active", n === index));
    };

    const play = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(index + 1), 6500);
    };

    prev?.addEventListener("click", () => {
      goTo(index - 1);
      play();
    });
    next?.addEventListener("click", () => {
      goTo(index + 1);
      play();
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(Number(dot.dataset.carruselDot));
        play();
      });
    });

    carrusel.addEventListener("mouseenter", () => clearInterval(timer));
    carrusel.addEventListener("mouseleave", play);
    play();
  }

  // ===== Nav móvil =====
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? [...navMenu.querySelectorAll("a")] : [];

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ===== Header scrolled + scroll top + active link =====
  const siteHeader = document.getElementById("siteHeader");
  const scrollTopBtn = document.getElementById("scrollTop");
  const sections = [...document.querySelectorAll("main section[id]")];

  const onScroll = () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;

    if (siteHeader) {
      siteHeader.classList.toggle("scrolled", y > 60);
    }

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("show", y > 500);
    }

    let current = sections[0]?.id;
    const marker = y + 120;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== Smooth scroll anclas =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ===== Testimonios =====
  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".testimonio-track");
    const slides = [...slider.querySelectorAll(".testimonio")];
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    let index = 0;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    prev?.addEventListener("click", () => goTo(index - 1));
    next?.addEventListener("click", () => goTo(index + 1));

    let timer = setInterval(() => goTo(index + 1), 7000);
    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", () => {
      timer = setInterval(() => goTo(index + 1), 7000);
    });
  }

  // ===== FAQ accordion =====
  const faqItems = [...document.querySelectorAll(".faq-item")];
  faqItems.forEach((item) => {
    const head = item.querySelector(".faq-head");
    head?.addEventListener("click", () => {
      const willOpen = !item.classList.contains("open");
      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-head")?.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ===== Reveal on scroll =====
  const revelar = [...document.querySelectorAll(".revelar")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revelar.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      io.observe(el);
    });
  } else {
    revelar.forEach((el) => el.classList.add("visible"));
  }

  // ===== Form demo =====
  const form = document.getElementById("formContacto");
  const feedback = document.getElementById("formFeedback");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) feedback.hidden = false;
    form.reset();
  });
})();
