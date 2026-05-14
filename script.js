const stickyHeader = document.getElementById("stickyHeader");
const firstFold = document.getElementById("firstFold");
let lastScrollY = window.scrollY;

function updateStickyHeader() {
  if (!stickyHeader || !firstFold) return;

  // Show sticky summary only after the first fold.
  const threshold = firstFold.offsetTop + Math.max(280, firstFold.clientHeight * 0.35);
  const currentY = window.scrollY;
  const scrollingDown = currentY > lastScrollY;

  if (currentY > threshold && scrollingDown) {
    stickyHeader.classList.add("visible");
    stickyHeader.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-sticky-header");
  } else {
    stickyHeader.classList.remove("visible");
    stickyHeader.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-sticky-header");
  }

  lastScrollY = currentY;
}

window.addEventListener("scroll", updateStickyHeader, { passive: true });
window.addEventListener("resize", updateStickyHeader);
updateStickyHeader();

const mainImage = document.getElementById("mainImage");
const zoomPreview = document.getElementById("zoomPreview");
const zoomLens = document.getElementById("zoomLens");
const thumbButtons = Array.from(document.querySelectorAll(".thumb-row .thumb"));
const prevBtn = document.querySelector(".gallery-main .gallery-nav.prev");
const nextBtn = document.querySelector(".gallery-main .gallery-nav.next");

const galleryImages = thumbButtons.map((button) => button.dataset.image);
let activeImageIndex = 0;

function initThumbPreviews() {
  thumbButtons.forEach((button) => {
    const imagePath = button.dataset.image;
    if (!imagePath) return;
    button.style.backgroundImage = `url("${imagePath}")`;
    button.style.backgroundSize = "cover";
    button.style.backgroundPosition = "center";
    button.style.backgroundRepeat = "no-repeat";
  });
}

function renderActiveImage(index) {
  if (!mainImage || !galleryImages.length) return;

  activeImageIndex = (index + galleryImages.length) % galleryImages.length;
  const imagePath = galleryImages[activeImageIndex];
  mainImage.src = imagePath;

  if (zoomPreview) {
    zoomPreview.style.backgroundImage = `url("${imagePath}")`;
  }

  thumbButtons.forEach((button, i) => {
    button.classList.toggle("active", i === activeImageIndex);
    button.setAttribute("aria-current", i === activeImageIndex ? "true" : "false");
  });
}

thumbButtons.forEach((button, index) => {
  button.addEventListener("click", () => renderActiveImage(index));
});

prevBtn?.addEventListener("click", () => renderActiveImage(activeImageIndex - 1));
nextBtn?.addEventListener("click", () => renderActiveImage(activeImageIndex + 1));

function enableZoom() {
  if (!mainImage || !zoomPreview || !zoomLens) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const lensSize = 86;
  const zoomFactor = 2.6;
  const viewportPadding = 8;

  function placeZoomPreview() {
    zoomPreview.classList.remove("flip-left");
    const rightOverflow = zoomPreview.getBoundingClientRect().right > window.innerWidth - viewportPadding;
    if (rightOverflow) {
      zoomPreview.classList.add("flip-left");
    }
  }

  function handleMouseMove(event) {
    const rect = mainImage.getBoundingClientRect();
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const boundedX = Math.max(lensSize / 2, Math.min(rect.width - lensSize / 2, rawX));
    const boundedY = Math.max(lensSize / 2, Math.min(rect.height - lensSize / 2, rawY));
    const previewWidth = zoomPreview.clientWidth;
    const previewHeight = zoomPreview.clientHeight;
    const bgWidth = rect.width * zoomFactor;
    const bgHeight = rect.height * zoomFactor;
    const bgX = -(boundedX * zoomFactor - previewWidth / 2);
    const bgY = -(boundedY * zoomFactor - previewHeight / 2);

    zoomLens.classList.add("active");
    zoomPreview.classList.add("active");
    zoomPreview.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
    zoomPreview.style.backgroundPosition = `${bgX}px ${bgY}px`;
    zoomLens.style.left = `${boundedX}px`;
    zoomLens.style.top = `${boundedY}px`;
  }

  function handleMouseLeave() {
    zoomLens.classList.remove("active");
    zoomPreview.classList.remove("active");
  }

  mainImage.addEventListener("mousemove", handleMouseMove);
  mainImage.addEventListener("mouseenter", (event) => {
    placeZoomPreview();
    handleMouseMove(event);
  });
  mainImage.addEventListener("mouseleave", handleMouseLeave);
  window.addEventListener("resize", placeZoomPreview);
}

initThumbPreviews();
renderActiveImage(0);
enableZoom();

const faqItems = Array.from(document.querySelectorAll(".faq-item"));

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  if (!question) return;

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    faqItems.forEach((faq) => faq.classList.remove("open"));
    if (!isOpen) item.classList.add("open");

    faqItems.forEach((faq) => {
      const icon = faq.querySelector(".faq-question span");
      if (icon) icon.textContent = faq.classList.contains("open") ? "^" : "v";
    });
  });
});

const processTabContainer = document.querySelector(".process-tabs");
const processStep = document.getElementById("processStep");
const processTitle = document.querySelector(".process-content h3");
const processDescription = document.querySelector(".process-content p");
const processFeatures = document.querySelectorAll(".feature-list--process li");
const processImage = document.querySelector(".process-media img");
const processPrev = document.querySelector(".process-media .gallery-nav.prev");
const processNext = document.querySelector(".process-media .gallery-nav.next");
const processPrevMobile = document.getElementById("processPrevMobile");
const processNextMobile = document.getElementById("processNextMobile");

const processData = {
  "Raw Material": {
    title: "High-Grade Raw Material Selection",
    description:
      "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    image: "assets/images/product-1.jpg"
  },
  Extrusion: {
    title: "Precision Extrusion Control",
    description:
      "Material is processed through controlled heating and screw speed to deliver uniform pipe wall and high dimensional accuracy.",
    points: ["Servo-controlled output", "Consistent melt temperature"],
    image: "assets/images/product-2.webp"
  },
  Cooling: {
    title: "Calibrated Cooling Performance",
    description:
      "Multi-stage cooling stabilizes geometry and prevents ovality, preserving final pipe strength and visual quality.",
    points: ["Multi-bath cooling", "Controlled water temperature"],
    image: "assets/images/product-1.jpg"
  },
  Sizing: {
    title: "Exact Sizing and Tolerance Management",
    description:
      "Inline sizing systems monitor OD and wall thickness in real time, maintaining strict standards across production.",
    points: ["Laser dimension checks", "Auto correction loops"],
    image: "assets/images/product-2.webp"
  },
  "Quality Control": {
    title: "Rigorous Quality Assurance",
    description:
      "Each batch undergoes pressure and dimensional testing to ensure compliance with required international standards.",
    points: ["Hydrostatic testing", "Traceable QA records"],
    image: "assets/images/product-1.jpg"
  },
  Marking: {
    title: "Durable Product Identification",
    description:
      "Automated line marking prints standard details and traceability codes for field verification and logistics.",
    points: ["Batch-level traceability", "Weather-resistant marking"],
    image: "assets/images/product-2.webp"
  },
  Cutting: {
    title: "Automated Precision Cutting",
    description:
      "Pipe length is cut to exact specification with clean edges optimized for transport, installation, and joining.",
    points: ["Programmable cut lengths", "Low burr profile"],
    image: "assets/images/product-1.jpg"
  },
  Packaging: {
    title: "Secure Final Packaging",
    description:
      "Finished pipes are packed and protected to prevent handling damage and maintain product integrity in transit.",
    points: ["Impact-safe bundling", "Shipment-ready labeling"],
    image: "assets/images/product-2.webp"
  }
};

const processTabButtons = processTabContainer ? Array.from(processTabContainer.querySelectorAll("button")) : [];
const processKeys = processTabButtons.map((button) => button.textContent.trim());
let processIndex = Math.max(0, processTabButtons.findIndex((button) => button.classList.contains("active")));

function renderProcessStep(index) {
  if (!processKeys.length) return;
  processIndex = (index + processKeys.length) % processKeys.length;
  const key = processKeys[processIndex];
  const content = processData[key];
  if (!content || !processTitle || !processDescription || !processImage || processFeatures.length < 2) return;

  processTabButtons.forEach((tab) => tab.classList.remove("active"));
  processTabButtons[processIndex]?.classList.add("active");
  processTitle.textContent = content.title;
  processDescription.textContent = content.description;
  processFeatures[0].textContent = content.points[0];
  processFeatures[1].textContent = content.points[1];
  processImage.src = content.image;
  if (processStep) {
    processStep.textContent = `Step ${processIndex + 1}/${processKeys.length}: ${key}`;
  }
}

processTabContainer?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const clickedIndex = processTabButtons.indexOf(button);
  if (clickedIndex >= 0) renderProcessStep(clickedIndex);
});

processPrev?.addEventListener("click", () => renderProcessStep(processIndex - 1));
processNext?.addEventListener("click", () => renderProcessStep(processIndex + 1));
processPrevMobile?.addEventListener("click", () => renderProcessStep(processIndex - 1));
processNextMobile?.addEventListener("click", () => renderProcessStep(processIndex + 1));
renderProcessStep(processIndex);

const appTrack = document.getElementById("applicationTrack");
const appPrev = document.getElementById("appPrev");
const appNext = document.getElementById("appNext");
const appCards = appTrack ? Array.from(appTrack.querySelectorAll(".image-card")) : [];
let appIndex = 0;

function getVisibleApplicationCards() {
  if (window.matchMedia("(max-width: 860px)").matches) return 1;
  if (window.matchMedia("(max-width: 1200px)").matches) return 2;
  return 4;
}

function updateApplicationNavState(maxIndex) {
  if (appPrev) appPrev.disabled = appIndex <= 0;
  if (appNext) appNext.disabled = appIndex >= maxIndex;
}

function scrollToApplication(index, smooth = true) {
  if (!appTrack || !appCards.length) return;

  const visibleCards = getVisibleApplicationCards();
  const maxIndex = Math.max(0, appCards.length - visibleCards);

  appIndex = Math.min(maxIndex, Math.max(0, index));

  const firstCard = appCards[0];
  const cardWidth = firstCard.getBoundingClientRect().width;
  const trackStyles = window.getComputedStyle(appTrack);
  const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "16");
  const left = appIndex * (cardWidth + gap);

  appTrack.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  updateApplicationNavState(maxIndex);
}

function scrollApplications(direction) {
  scrollToApplication(appIndex + direction);
}

appPrev?.addEventListener("click", () => scrollApplications(-1));
appNext?.addEventListener("click", () => scrollApplications(1));
window.addEventListener("resize", () => scrollToApplication(appIndex, false));

scrollToApplication(0, false);

const testimonialTrack = document.getElementById("testimonialTrack");

function initTestimonialChain() {
  if (!testimonialTrack || testimonialTrack.dataset.chainReady === "true") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const baseCards = Array.from(testimonialTrack.children);
  if (!baseCards.length) return;

  testimonialTrack.dataset.chainReady = "true";
  baseCards.forEach((card) => testimonialTrack.appendChild(card.cloneNode(true)));

  let loopWidth = 0;
  let offset = 0;
  let rafId = 0;
  let paused = false;

  function measureLoopWidth() {
    const gap = parseFloat(window.getComputedStyle(testimonialTrack).gap || "0");
    loopWidth = baseCards.reduce((total, card) => total + card.getBoundingClientRect().width, 0);
    if (baseCards.length > 1) {
      loopWidth += gap * (baseCards.length - 1);
    }
    offset = 0;
    testimonialTrack.style.transform = "translateX(0)";
  }

  function step() {
    if (!paused) {
      const speed = window.matchMedia("(max-width: 860px)").matches ? 0.3 : 0.45;
      offset += speed;
      if (offset >= loopWidth) offset = 0;
      testimonialTrack.style.transform = `translateX(${-offset}px)`;
    }
    rafId = window.requestAnimationFrame(step);
  }

  function pause() {
    paused = true;
  }

  function resume() {
    paused = false;
  }

  testimonialTrack.addEventListener("mouseenter", pause);
  testimonialTrack.addEventListener("mouseleave", resume);
  testimonialTrack.addEventListener("focusin", pause);
  testimonialTrack.addEventListener("focusout", resume);
  window.addEventListener("resize", measureLoopWidth);

  measureLoopWidth();
  rafId = window.requestAnimationFrame(step);

  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(rafId));
}

initTestimonialChain();

const logoTrack = document.getElementById("logoTrack");

function initLogoChain() {
  if (!logoTrack || logoTrack.dataset.chainReady === "true") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const baseLogos = Array.from(logoTrack.children);
  if (!baseLogos.length) return;

  logoTrack.dataset.chainReady = "true";
  baseLogos.forEach((logo) => logoTrack.appendChild(logo.cloneNode(true)));

  let loopWidth = 0;
  let offset = 0;
  let rafId = 0;
  let paused = false;

  function measureLoopWidth() {
    const gap = parseFloat(window.getComputedStyle(logoTrack).gap || "0");
    loopWidth = baseLogos.reduce((total, logo) => total + logo.getBoundingClientRect().width, 0);
    if (baseLogos.length > 1) {
      loopWidth += gap * (baseLogos.length - 1);
    }
    offset = 0;
    logoTrack.style.transform = "translateX(0)";
  }

  function step() {
    if (!paused) {
      const speed = window.matchMedia("(max-width: 860px)").matches ? 0.45 : 0.7;
      offset += speed;
      if (offset >= loopWidth) offset = 0;
      logoTrack.style.transform = `translateX(${-offset}px)`;
    }
    rafId = window.requestAnimationFrame(step);
  }

  function pause() {
    paused = true;
  }

  function resume() {
    paused = false;
  }

  logoTrack.addEventListener("mouseenter", pause);
  logoTrack.addEventListener("mouseleave", resume);
  logoTrack.addEventListener("focusin", pause);
  logoTrack.addEventListener("focusout", resume);
  window.addEventListener("resize", measureLoopWidth);

  measureLoopWidth();
  rafId = window.requestAnimationFrame(step);

  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(rafId));
}

initLogoChain();

const quoteModal = document.getElementById("quoteModal");
const quoteDialog = quoteModal?.querySelector(".quote-modal__dialog");
const quoteForm = quoteModal?.querySelector(".quote-modal__form");
const quoteEmailInput = document.getElementById("quoteEmail");
const quoteSubmit = quoteModal?.querySelector(".quote-modal__submit");
const quoteTriggers = Array.from(document.querySelectorAll("[data-quote-trigger]"));
const quoteCloseControls = quoteModal ? Array.from(quoteModal.querySelectorAll("[data-quote-close]")) : [];
const expertModal = document.getElementById("expertModal");
const expertDialog = expertModal?.querySelector(".expert-modal__dialog");
const expertTriggers = Array.from(document.querySelectorAll("[data-expert-trigger]"));
const expertCloseControls = expertModal ? Array.from(expertModal.querySelectorAll("[data-expert-close]")) : [];

let quoteLastFocus = null;

function openQuoteModal() {
  if (!quoteModal) return;
  quoteLastFocus = document.activeElement;
  quoteModal.classList.add("is-open");
  quoteModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (quoteSubmit) quoteSubmit.disabled = true;
  quoteEmailInput?.focus();
}

function closeQuoteModal() {
  if (!quoteModal) return;
  quoteModal.classList.remove("is-open");
  quoteModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (quoteLastFocus instanceof HTMLElement) {
    quoteLastFocus.focus();
  }
}

quoteTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openQuoteModal);
});

quoteCloseControls.forEach((control) => {
  control.addEventListener("click", closeQuoteModal);
});

quoteModal?.addEventListener("click", (event) => {
  if (!quoteDialog) return;
  if (!quoteDialog.contains(event.target)) closeQuoteModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (expertModal?.classList.contains("is-open")) {
    closeExpertModal();
    return;
  }
  if (quoteModal?.classList.contains("is-open")) closeQuoteModal();
});

function updateQuoteSubmitState() {
  if (!quoteEmailInput || !quoteSubmit) return;
  quoteSubmit.disabled = !quoteEmailInput.checkValidity();
}

quoteEmailInput?.addEventListener("input", updateQuoteSubmitState);
quoteForm?.addEventListener("submit", (event) => {
  if (!quoteEmailInput?.checkValidity()) {
    event.preventDefault();
  }
});
updateQuoteSubmitState();

function openExpertModal() {
  if (!expertModal) return;
  quoteLastFocus = document.activeElement;
  expertModal.classList.add("is-open");
  expertModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeExpertModal() {
  if (!expertModal) return;
  expertModal.classList.remove("is-open");
  expertModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (quoteLastFocus instanceof HTMLElement) {
    quoteLastFocus.focus();
  }
}

expertTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openExpertModal);
});

expertCloseControls.forEach((control) => {
  control.addEventListener("click", closeExpertModal);
});

expertModal?.addEventListener("click", (event) => {
  if (!expertDialog) return;
  if (!expertDialog.contains(event.target)) closeExpertModal();
});
