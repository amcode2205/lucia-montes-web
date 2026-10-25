(() => {
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

  const sections = [...document.querySelectorAll("main section[id]")];
  const setActiveLink = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revelar.forEach((el) => io.observe(el));
  } else {
    revelar.forEach((el) => el.classList.add("visible"));
  }

  const form = document.getElementById("formContacto");
  const feedback = document.getElementById("formFeedback");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (feedback) {
      feedback.hidden = false;
    }
    form.reset();
  });
})();
