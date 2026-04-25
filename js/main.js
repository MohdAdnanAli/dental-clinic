// TRIDENT Enhanced JS - Mobile-First Interactions, Vanilla, Optimized
// Features: Hamburger nav, smooth-scroll, form validation, gallery lightbox, review slider, fade-ins, parallax toggle

// ============================================
// CLINIC CONFIG - Update all client details here
// ============================================
const clinicConfig = {
  // Basic Info
  name: "TRIDENT",
  fullName: "TRIDENT Oral & Dental Care",
  hindiName: "ट्रिडेंट ओरल एंड डेंटल केयर क्लीनिक",
  tagline: "Oral & Dental Care",

  // Doctor Details
  doctorName: "Dr. Aniket Anup Sinha",
  doctorTitle: "BDS & Specialist",
  doctorBadge: "Top-Rated Dentist",

  // Location
  city: "Ghazipur",
  area: "Lanka Chungi",
  address: "Behind PNB Bank",
  pincode: "233001",
  fullAddress: () => `${clinicConfig.area}, ${clinicConfig.address}<br>${clinicConfig.city} – ${clinicConfig.pincode}`,

  // Contact
  phone: "+919415606091",
  phoneDisplay: () => clinicConfig.phone.replace("+91", ""),
  whatsappLink: () => `https://wa.me/${clinicConfig.phone}?text=Hello%20Dr.%20Aniket%2C%20I'd%20like%20to%20book%20an%20appointment.`,

  // Ratings & Reviews
  rating: "5.0",
  reviewCount: 75,
  reviewCountText: () => `${clinicConfig.reviewCount} Google Reviews`,

  // Hours
  todayHours: "Open Today · Closes 7 PM",

  // Services info
  servicesCount: 6,

  // Stats
  yearsExperience: 10,
};

document.addEventListener("DOMContentLoaded", initSite);

function initSite() {

  try {
    initDynamicContent();
    initNav();
    initSmoothScroll();
    initForms();
    initGallery();
    initReviewsSlider();
    initAnimations();
    initParallax();
  } catch (e) {
    console.error(e);
  }
}

// Inject clinic config values into HTML (Dynamic Content)
function initDynamicContent() {
  const config = clinicConfig;

  // Nav brand
  const navBrand = document.querySelector(".nav-brand");
  if (navBrand) {
    navBrand.innerHTML = `
      <div>
        <div class="nav-text-main">${config.name}</div>
        <div class="nav-text-sub">${config.tagline}</div>
      </div>
      <img src="images/avatar.png" class="nav-avatar" alt="${config.doctorName}" loading="lazy">
    `;
  }

  // Nav CTA phone
  const navCta = document.querySelector(".nav-cta");
  if (navCta) {
    navCta.setAttribute("href", `tel:${config.phone}`);
    navCta.textContent = "📞 Call Now";
  }

  // Hero content
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.innerHTML = `<span>${config.name}</span><br>${config.tagline}<br>Care Clinic`;
  }

  const heroHindi = document.querySelector(".hero-hindi");
  if (heroHindi) heroHindi.textContent = config.hindiName;

  const heroBadge = document.querySelector(".hero-badge");
  if (heroBadge) heroBadge.textContent = `${config.city}'s Premier Dental Care`;

  const heroDoctor = document.querySelector(".hero-doctor");
  if (heroDoctor) heroDoctor.textContent = `${config.doctorName} · ${config.doctorTitle}`;

  const heroRating = document.querySelector(".hero-rating");
  if (heroRating) heroRating.textContent = config.rating;

  const heroReviewCount = document.querySelector(".hero-review-count");
  if (heroReviewCount) heroReviewCount.textContent = `/ ${config.reviewCountText()}`;

  // Doctor card
  const doctorName = document.querySelector(".hero-doctor-name");
  if (doctorName) doctorName.textContent = config.doctorName;

  const doctorSubtitle = document.querySelector(".hero-doctor-subtitle");
  if (doctorSubtitle) doctorSubtitle.textContent = `🏆 ${config.doctorBadge} · ${config.city}`;

  const locationRows = document.querySelectorAll(".location-row");
  if (locationRows[0]) locationRows[0].querySelector("span:last-child").innerHTML = config.fullAddress();
  if (locationRows[1]) locationRows[1].querySelector("span:last-child").textContent = config.todayHours;

  // Rating badge
  const badgeNum = document.querySelector(".badge-num");
  if (badgeNum) badgeNum.textContent = config.rating;

  // Stats bar
  const statNums = document.querySelectorAll(".stat-num");
  if (statNums[0]) statNums[0].textContent = config.rating;
  if (statNums[1]) statNums[1].textContent = `${config.reviewCount}+`;
  if (statNums[2]) statNums[2].textContent = `${config.yearsExperience}+`;
  if (statNums[3]) statNums[3].textContent = "0%";

  // Footer
  const footerBrand = document.querySelector(".footer-brand-name");
  if (footerBrand) footerBrand.textContent = config.fullName;

  const footerTagline = document.querySelector(".footer-tagline");
  if (footerTagline) footerTagline.textContent = config.city;

  const footerCopy = document.querySelector(".footer-copy");
  if (footerCopy) footerCopy.textContent = `© 2026 ${config.fullName} · ${config.doctorName}. All rights reserved.`;

  const footerRating = document.querySelector(".footer-rating");
  if (footerRating) footerRating.innerHTML = `<span class="stars">★★★★★</span><span>${config.rating} · ${config.reviewCount} Reviews</span>`;

  // WhatsApp float
  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (whatsappFloat) {
    whatsappFloat.setAttribute("href", config.whatsappLink());
  }

  // Page title
  document.title = `${config.fullName} Clinic – ${config.doctorName}`;
}

function initNav() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", navLinks.classList.contains("active"));
  });

  // Close on overlay click / escape
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) navLinks.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") navLinks.classList.remove("active");
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
  });

  // Navigation active state - current page highlight
  setActiveNavLink();

  // On external link click (pages), update for SPA feel
  document.querySelectorAll(".nav-links a[href]").forEach(link => {
    link.addEventListener("click", setActiveNavLink);
  });
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href) {
      const linkPath = href.split("/").pop();
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initForms() {
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm(form)) {
        showSuccess(form);
      }
    });

    // Real-time validation
    form.querySelectorAll("input, select, textarea").forEach(field => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => clearFieldError(field));
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll("[required]").forEach(field => {
    if (!field.value.trim()) {
      setFieldError(field, "This field is required");
      valid = false;
    } else if (field.type === "email" && !/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value)) {
      setFieldError(field, "Please enter a valid email");
      valid = false;
    }
  });
  return valid;
}

function validateField(field) {
  if (!field.value.trim()) {
    setFieldError(field, "This field is required");
  }
}

function setFieldError(field, message) {
  field.style.borderColor = "#ff6b6b";
  field.style.boxShadow = "0 0 0 3px rgba(255,107,107,0.2)";
}

function clearFieldError(field) {
  field.style.borderColor = "";
  field.style.boxShadow = "";
}

function showSuccess(form) {
  alert("✅ Appointment booked successfully! We'll call you to confirm.\n(Demo - integrate with backend/WhatsApp API)");
  form.reset();
}

function initGallery() {
  // No gallery items on this page, skip lightbox
  if (document.querySelectorAll(".gallery-item").length === 0) return;
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox") || createLightbox();

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(item.querySelector("img, video"), index));
  });

  lightbox.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

function createLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-labelledby", "lightbox-title");
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">×</button>
    <div class="lightbox-content">
      <h3 id="lightbox-title" class="sr-only">Gallery image</h3>
      <img class="lightbox-img" alt="" aria-describedby="lightbox-title">
      <button class="lightbox-prev" aria-label="Previous image">❮</button>
      <button class="lightbox-next" aria-label="Next image">❯</button>
    </div>
  `;
  document.body.appendChild(lightbox);
  return lightbox;
}

let currentLightboxIndex = 0;
let lightboxVideo = null;
let focusableElements = [];

function openLightbox(media, index) {
  const lightbox = document.querySelector(".gallery-lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  lightbox.classList.add("active");
  currentLightboxIndex = index;
  document.body.style.overflow = "hidden";

  // Handle video
  if (media.tagName === "VIDEO") {
    lightboxImg.style.display = "none";
    lightboxVideo = media.cloneNode(true);
    lightboxVideo.classList.add("lightbox-active");
    lightboxVideo.muted = false;
    lightboxVideo.controls = true;
    lightbox.querySelector(".lightbox-content").appendChild(lightboxVideo);
    lightboxVideo.play().catch(() => {});
  } else {
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.remove();
      lightboxVideo = null;
    }
    lightboxImg.src = media.src;
    lightboxImg.alt = media.alt || "Gallery image";
    lightboxImg.style.display = "block";
  }

  // Focus management
  focusableElements = Array.from(lightbox.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"));
  const firstFocusable = focusableElements[0];
  firstFocusable?.focus();

  // Keyboard nav
  document.addEventListener("keydown", lightboxKeyHandler);
}

function closeLightbox() {
  const lightbox = document.querySelector(".gallery-lightbox");
  lightbox?.classList.remove("active");
  document.body.style.overflow = "";
  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.remove();
    lightboxVideo = null;
  }
  document.removeEventListener("keydown", lightboxKeyHandler);
}

function initReviewsSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");
  let current = 0;
  let autoInterval;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[n].classList.add("active");
    dots[n].classList.add("active");
    current = n;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoInterval);
      showSlide(index);
      startAuto();
    });
  });

  function startAuto() {
    autoInterval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }

  startAuto();
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("fade-in");
        el.style.setProperty("--i", el.dataset.stagger || 0);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in, .service-card, .review-card").forEach(el => {
    el.dataset.stagger = Math.floor(Math.random() * 4);
    observer.observe(el);
  });
}

function initParallax() {

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Single global RAF parallax - Mobile optimized
  let ticking = false;
  const raf = () => {
    const hero = document.querySelector(".hero");
    const bgPattern = hero?.querySelector(".hero-bg-pattern");
    if (bgPattern && hero) {
      const rect = hero.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const parallaxSpeed = isMobile ? 0.3 : 0.5;
      const scrolled = window.pageYOffset * (isMobile ? 0.4 : 0.6);
      let yPos = -(rect.top * parallaxSpeed);
      // Clamp for mobile performance
      yPos = Math.max(-50, Math.min(50, yPos));
      bgPattern.style.transform = `translateY(${yPos}px) scale(${isMobile ? 1.05 : 1.1})`;
      bgPattern.style.objectPosition = `50% ${50 + (yPos * 0.1)}%`;
    }
    ticking = false;
  };
  const scrollHandler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(raf);
    }
  };
  window.removeEventListener("scroll", scrollHandler);
  window.addEventListener("scroll", scrollHandler);

  // Reviews video: volume toggle + seek to 12s
  document.querySelectorAll(".hero-bg-video video").forEach(video => {
    video.currentTime = 12;
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {});
    video.addEventListener("ended", () => {
      video.currentTime = 12;
      video.play();
    });
    const toggle = video.parentElement.querySelector(".video-volume-toggle");
    if (toggle) {
      toggle.textContent = "🔇";
      toggle.addEventListener("click", () => {
        video.muted = !video.muted;
        toggle.textContent = video.muted ? "🔇" : "🔊";
      });
    }
  });

  // Re-init on resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initParallax, 250);
  });
}

// Nav glass mode on scroll
let navScrollTicking = false;
const navRaf = () => {
  const scrolled = window.pageYOffset;
  const nav = document.querySelector("nav");
  if (nav) {
    if (scrolled > 100) {
      nav.classList.add("glass");
    } else {
      nav.classList.remove("glass");
    }
  }
  navScrollTicking = false;
};
const navScrollHandler = () => {
  if (!navScrollTicking) {
    navScrollTicking = true;
    requestAnimationFrame(navRaf);
  }
};
window.addEventListener("scroll", navScrollHandler);

function lightboxKeyHandler(e) {
  const lightbox = document.querySelector(".gallery-lightbox");
  if (!lightbox?.classList.contains("active")) return;

  const galleryItems = document.querySelectorAll(".gallery-item");

  switch(e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      e.preventDefault();
      const prevIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
      const prevMedia = galleryItems[prevIndex].querySelector("img, video");
      openLightbox(prevMedia, prevIndex);
      break;
    case "ArrowRight":
      e.preventDefault();
      const nextIndex = (currentLightboxIndex + 1) % galleryItems.length;
      const nextMedia = galleryItems[nextIndex].querySelector("img, video");
      openLightbox(nextMedia, nextIndex);
      break;
  }
}

// Trap focus in lightbox
document.addEventListener("keydown", (e) => {
  if (!document.querySelector(".gallery-lightbox.active")) return;
  if (e.key !== "Tab") return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Existing keyboard nav (nav + lightbox escape)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".nav-links")?.classList.remove("active");
    closeLightbox();
  }
});