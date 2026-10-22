(() => {
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hoverCapable = window.matchMedia("(hover: hover)").matches;
  const desktopFx = !reduceMotion && finePointer && hoverCapable;

  /* —— Split hero title into chars —— */
  const title = document.querySelector(".hero-title");
  if (title) {
    title.querySelectorAll("[data-split]").forEach((line) => {
      const text = line.getAttribute("data-split") || "";
      line.textContent = "";
      [...text].forEach((ch, i) => {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch;
        span.style.transitionDelay = `${80 + i * 55}ms`;
        line.appendChild(span);
      });
    });
  }

  /* —— Sticky nav + scroll progress + rail —— */
  const nav = document.getElementById("topnav");
  const progress = document.getElementById("scroll-progress");
  const railLinks = document.querySelectorAll(".section-rail a");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [
    { id: "top", el: document.getElementById("top") },
    { id: "featured", el: document.getElementById("featured") },
    { id: "more", el: document.getElementById("more") },
    { id: "contact", el: document.getElementById("contact") },
  ].filter((s) => s.el);

  const setActiveSection = (id) => {
    railLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.rail === id));
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("is-active", href === `#${id}`);
    });
  };

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    let current = "top";
    const marker = y + window.innerHeight * 0.35;
    sections.forEach(({ id, el }) => {
      if (el.offsetTop <= marker) current = id;
    });
    setActiveSection(current);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* —— Staggered reveal —— */
  const reveals = document.querySelectorAll("[data-reveal]");
  reveals.forEach((el) => {
    const delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const revealHeroTitle = () => {
    if (title) {
      requestAnimationFrame(() => title.classList.add("is-in"));
    }
  };

  if (reduceMotion) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    if (title) title.classList.add("is-in");
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("hero-copy")) revealHeroTitle();
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
    // Kick hero immediately on load
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) {
      setTimeout(() => {
        heroCopy.classList.add("is-visible");
        revealHeroTitle();
      }, 60);
    }
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
    revealHeroTitle();
  }

  /* —— Soft parallax on orbs —— */
  const orbs = document.querySelectorAll(".orb");
  if (!reduceMotion && orbs.length) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          orbs.forEach((orb, i) => {
            const factor = (i + 1) * 0.045;
            orb.style.transform = `translate3d(0, ${y * factor}px, 0)`;
          });
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* —— Hero panel 3D tilt (desktop) —— */
  const heroPanel = document.querySelector("[data-tilt]");
  if (desktopFx && heroPanel) {
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      heroPanel.style.transform = `perspective(1100px) rotateX(${curY}deg) rotateY(${curX}deg)`;
      raf = requestAnimationFrame(tick);
    };

    heroPanel.addEventListener("mousemove", (e) => {
      const rect = heroPanel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 6;
      targetY = -py * 4;
      heroPanel.classList.add("is-tilting");
      if (!raf) raf = requestAnimationFrame(tick);
    });

    heroPanel.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      heroPanel.classList.remove("is-tilting");
      const settle = () => {
        curX += (0 - curX) * 0.1;
        curY += (0 - curY) * 0.1;
        heroPanel.style.transform = `perspective(1100px) rotateX(${curY}deg) rotateY(${curX}deg)`;
        if (Math.abs(curX) > 0.05 || Math.abs(curY) > 0.05) {
          requestAnimationFrame(settle);
        } else {
          heroPanel.style.transform = "";
          cancelAnimationFrame(raf);
          raf = 0;
        }
      };
      requestAnimationFrame(settle);
    });
  }

  /* —— Card / mini tilt —— */
  if (desktopFx) {
    document.querySelectorAll("[data-card-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const lift = card.classList.contains("mini") ? 4 : 8;
        card.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 6}deg) translateY(-${lift}px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* —— Custom cursor + magnetic buttons —— */
  if (desktopFx) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (dot && ring) {
      document.body.classList.add("has-custom-cursor");
      let mx = 0;
      let my = 0;
      let rx = 0;
      let ry = 0;

      window.addEventListener(
        "mousemove",
        (e) => {
          mx = e.clientX;
          my = e.clientY;
          dot.style.left = `${mx}px`;
          dot.style.top = `${my}px`;
        },
        { passive: true }
      );

      const animateRing = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        requestAnimationFrame(animateRing);
      };
      animateRing();

      const hoverTargets = document.querySelectorAll("a, button, [data-magnetic]");
      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
      });

      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "";
        });
      });
    }
  }

  /* —— Ambient ink-dot field —— */
  const canvas = document.getElementById("dot-field");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dots = [];
    let mouse = { x: -9999, y: -9999 };
    let running = true;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(48, Math.floor((w * h) / 38000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        a: 0.12 + Math.random() * 0.22,
      }));
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (desktopFx) {
      window.addEventListener(
        "mousemove",
        (e) => {
          mouse.x = e.clientX;
          mouse.y = e.clientY;
        },
        { passive: true }
      );
    }

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          d.x += dx * 0.008;
          d.y += dy * 0.008;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 90, 60, ${d.a})`;
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const ddx = d.x - o.x;
          const ddy = d.y - o.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 110) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(196, 165, 116, ${0.12 * (1 - dd / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
})();
