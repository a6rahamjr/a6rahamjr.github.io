const root = document.documentElement;
root.classList.add("js-enabled");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#siteNav");
const themeToggle = document.querySelector("#themeToggle");
const scrollMeter = document.querySelector("#scrollMeter");
const techCanvas = document.querySelector("#techCanvas");
const cursorScanner = document.querySelector("#cursorScanner");
const hero = document.querySelector(".hero");
const heroInterface = document.querySelector(".hero-interface");
const heroVault = document.querySelector(".hero-vault");
const heroContent = document.querySelector(".hero-content");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const depthPanels = document.querySelectorAll(
  ".button, .project-github, .filter-button, .skill-tab, .hero-copy-block, .hero-avatar, .avatar-frame, .kinetic-words span, .offer-list article, .project-card, .compact-projects article, .spotlight-panel, .spotlight-button, .skill-focus, .skill-proof, .timeline-card, .stack-item, .highlight-panel, .contact-link, .hero-facts div"
);
const ambientDepthPanels = document.querySelectorAll(
  ".button, .project-github, .filter-button, .skill-tab, .hero-copy-block, .hero-avatar, .avatar-frame, .kinetic-words span, .offer-list article, .spotlight-panel, .spotlight-button, .skill-focus, .skill-proof, .timeline-card, .stack-item, .highlight-panel, .contact-link, .hero-facts div"
);
const spotlightButtons = document.querySelectorAll(".spotlight-button");
const spotlightType = document.querySelector("#spotlightType");
const spotlightTitle = document.querySelector("#spotlightTitle");
const spotlightSummary = document.querySelector("#spotlightSummary");
const spotlightMetrics = document.querySelector("#spotlightMetrics");
const spotlightPoints = document.querySelector("#spotlightPoints");
const spotlightTags = document.querySelector("#spotlightTags");
const spotlightLink = document.querySelector("#spotlightLink");
const buildFlow = document.querySelector("#buildFlow");
const skillTabs = document.querySelectorAll(".skill-tab");
const skillCategory = document.querySelector("#skillCategory");
const skillTitle = document.querySelector("#skillTitle");
const skillSummary = document.querySelector("#skillSummary");
const skillChips = document.querySelector("#skillChips");
const skillEvidence = document.querySelector("#skillEvidence");
const telemetryMode = document.querySelector("#telemetryMode");
const telemetryPulse = document.querySelector("#telemetryPulse");
const telemetryActive = document.querySelector("#telemetryActive");
const themeStorageKey = "portfolio-theme-v2";
const navAnchorLinks = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Theme persistence is a small enhancement; the UI still works without storage.
  }
}

function setTelemetry(mode, pulse, active) {
  if (mode && telemetryMode) telemetryMode.textContent = `mode: ${mode}`;
  if (pulse && telemetryPulse) telemetryPulse.textContent = pulse;
  if (active && telemetryActive) telemetryActive.textContent = `active: ${active}`;
}

function flashReactiveHit(element) {
  if (!element) return;
  element.classList.remove("is-reactive-hit");
  void element.offsetWidth;
  element.classList.add("is-reactive-hit");
}

const spotlightProjects = {
  veripresence: {
    accent: "#d6a84f",
    status: "vision identity pipeline online",
    type: "Computer Vision",
    title: "VeriPresence",
    summary: "Attendance and unknown-person detection pipeline using HOG, LBP, intensity features, class-balanced SVM, FastAPI inference, and SQLite persistence.",
    link: "https://github.com/a6rahamjr/VeriPresence",
    metrics: [
      ["Identity learning", "Multi-image"],
      ["API modes", "Webcam / video / upload"],
      ["Quality gate", "6 pytest checks"]
    ],
    flow: ["Image input", "Face features", "SVM rejector", "FastAPI", "Attendance logs"],
    points: [
      "Confidence-plus-class-margin rejection for uncertain identities.",
      "CLAHE normalization, orientation-aware preprocessing, dataset fingerprinting, and versioned Joblib artifacts.",
      "API-key protection, upload-size limits, daily CSV export, webhook alerts, Docker, CI, Ruff, and pytest."
    ],
    tags: ["Python", "OpenCV", "HOG", "LBP", "SVM", "FastAPI", "SQLite", "Docker"]
  },
  entailforge: {
    accent: "#f2d48a",
    status: "logical reasoning engine online",
    type: "NLP / Logical Reasoning",
    title: "EntailForge",
    summary: "Offline syllogistic entailment classifier built with a Transformer encoder trained from random initialization and served through FastAPI.",
    link: "https://github.com/a6rahamjr/entailforge",
    metrics: [
      ["Test accuracy", "100%"],
      ["Macro F1", "1.000"],
      ["ECE", "0.0011"]
    ],
    flow: ["JSONL data", "Tokenizer", "Transformer", "PT2 export", "API inference"],
    points: [
      "Token, position, and premise/hypothesis segment embeddings for controlled entailment classification.",
      "Label smoothing, gradient clipping, cosine decay scheduling, early stopping, and occlusion-style confidence explanations.",
      "Strict JSONL schemas, split isolation, train-only vocabulary construction, Docker, CI, and API inference tests."
    ],
    tags: ["Python", "PyTorch", "Transformer", "FastAPI", "Docker", "pytest", "JSONL"]
  },
  matchtrace: {
    accent: "#cda34a",
    status: "sports vision tracker online",
    type: "Sports Computer Vision",
    title: "MatchTrace CV",
    summary: "Football-video analysis system with compact CNN jersey-team classification, tracking, camera-motion compensation, and metric pitch projection.",
    link: "https://github.com/a6rahamjr/matchtrace-cv",
    metrics: [
      ["CPU demo", "69.3 FPS"],
      ["Held-out accuracy", "100%"],
      ["Test suite", "9 checks"]
    ],
    flow: ["Video frames", "CNN team ID", "Tracking", "Pitch projection", "API report"],
    points: [
      "Motion-and-IoU multi-object tracking with occlusion recovery and confidence-weighted team voting.",
      "Pixel coordinates converted to real-world measurements through camera-motion compensation and pitch projection.",
      "Saliency maps, TorchScript export, structured logs, artifact hashing, FastAPI path protection, and deterministic tests."
    ],
    tags: ["PyTorch CNN", "TorchScript", "FastAPI", "Tracking", "Saliency", "Computer Vision"]
  },
  rolescout: {
    accent: "#a98230",
    status: "role matching scout online",
    type: "Applied NLP",
    title: "RoleScout",
    summary: "AI-powered job matching and scouting system for parsing job descriptions, classifying role relevance, and aligning opportunities with candidate profiles.",
    link: "https://github.com/a6rahamjr/rolescout",
    metrics: [
      ["Pipeline", "Modular"],
      ["Signals", "Skills + relevance"],
      ["Delivery", "GitHub Actions"]
    ],
    flow: ["Job text", "NLP parsing", "Scoring", "Ranking", "CI checks"],
    points: [
      "Semantic text processing pipeline extracts job requirements and maps them against candidate experience.",
      "ML-based scoring ranks opportunities for relevance and supports reproducible experiments.",
      "Separated ingestion, scoring, and output stages make the system easier to extend to new sources."
    ],
    tags: ["Python", "NLP", "Classification", "Pipeline Design", "GitHub Actions"]
  },
  marketsignal: {
    accent: "#f0c66a",
    status: "market signal forecast online",
    type: "Forecasting / Data Science",
    title: "MarketSignal Forecast",
    summary: "Financial market signal forecasting project with time-series feature engineering, predictive signals, and model evaluation metrics.",
    link: "https://github.com/a6rahamjr/MarketSignal-Forecast",
    metrics: [
      ["Forecast focus", "Time series"],
      ["Evaluation", "MAE / RMSE"],
      ["Signal view", "Directional"]
    ],
    flow: ["Market data", "Feature signals", "Model training", "Forecasts", "Performance views"],
    points: [
      "Technical indicators, signal normalization, and temporal feature construction for market trend analysis.",
      "Evaluation through MAE, RMSE, and directional accuracy to compare forecast behavior.",
      "Visual outputs help explain predicted signals, model performance, and forecast interpretation."
    ],
    tags: ["Python", "Pandas", "Time Series", "Forecasting", "Visualization", "Evaluation"]
  }
};

const skillGroups = {
  ai: {
    category: "Ai- Ml / Deep Learning",
    title: "Model development for vision, NLP, and forecasting",
    summary: "Python-first machine learning across classical ML, deep learning, computer vision, NLP, and time-series workflows.",
    chips: ["Python", "PyTorch", "Scikit-learn", "OpenCV", "SVM", "CNN", "Transformer Encoder", "HOG", "LBP", "CLAHE", "TF-IDF", "Time-series ML"],
    evidence: ["VeriPresence: face recognition and unknown-person detection.", "EntailForge: Transformer entailment classifier.", "MatchTrace CV: sports video classification and tracking.", "MarketSignal-Forecast: financial signal prediction."]
  },
  mlops: {
    category: "MLOps & DevOps",
    title: "Reproducible ML delivery from tests to containers",
    summary: "Project packaging, API serving, CI checks, model artifact versioning, and deterministic testing for ML systems.",
    chips: ["Docker", "GitHub Actions", "pytest", "Ruff", "FastAPI", "Uvicorn", "Joblib", "TorchScript", "PT2 export", "SQLite", "JSON logging"],
    evidence: ["VeriPresence: Docker, CI, pytest, model reload endpoint.", "EntailForge: export and API inference paths covered by tests.", "MatchTrace CV: artifact hashing and deterministic test suite."]
  },
  software: {
    category: "Software Engineering",
    title: "Full-stack and API engineering for usable systems",
    summary: "Web, mobile, backend, REST APIs, database-backed applications, and internship delivery across multiple stacks.",
    chips: ["FastAPI", "Django", "Angular", "Flutter", "Node.js", "HTML5", "CSS3", "JavaScript", "REST APIs", "WordPress", "Android Java"],
    evidence: ["GAO TEK: responsive WordPress, Angular, and Flutter projects.", "Varcons: full-stack e-commerce using Django and MySQL.", "Library Management System: CRUD, authentication, and role-based access."]
  },
  data: {
    category: "Data & Databases",
    title: "Analysis pipelines, storage, and evaluation",
    summary: "Data cleaning, exploratory analysis, feature construction, metrics, relational storage, and interpretable reporting.",
    chips: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "MySQL", "SQLite", "Jupyter Notebook", "EDA", "MAE", "RMSE", "Directional accuracy"],
    evidence: ["Retail EDA: cleaning, summaries, trends, and visual reporting.", "MarketSignal-Forecast: time-series features and forecasting metrics.", "VeriPresence: SQLite attendance persistence and CSV export."]
  },
  it: {
    category: "IT Tools & Systems",
    title: "Practical tooling across development, cloud basics, and embedded systems",
    summary: "Hands-on development environments, version control, Linux/Git foundations, Android tooling, Arduino, and graphics/embedded work.",
    chips: ["Git", "Linux", "Arduino IDE", "Android Studio", "C++", "Java", "Dart", "SQL", "OpenGL", "AWS Fundamentals", "Cybersecurity basics"],
    evidence: ["IoT Home Automation: Arduino C++ with sensors and device control.", "Smart Alarm Android App: Java and Android Studio.", "OpenGL train simulation: real-time rendering and particle rain.", "Coursera foundations: Linux/Git, AWS, cybersecurity, Google IT support."]
  }
};

const storedTheme = readStorage(themeStorageKey);
if (storedTheme) {
  root.dataset.theme = storedTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollMeter.style.width = `${progress}%`;
}

function closeMenu() {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  writeStorage(themeStorageKey, nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectCards.forEach((card) => {
      const showCard = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !showCard);
    });
    setTelemetry("project filter", `${filter} systems selected`, "project index");
    flashReactiveHit(document.querySelector(".project-grid"));
  });
});

function fillTextList(parent, items, itemTag = "li") {
  parent.replaceChildren();
  items.forEach((item) => {
    const child = document.createElement(itemTag);
    child.textContent = item;
    parent.appendChild(child);
  });
}

function metricLevel(value) {
  const match = String(value).match(/[\d.]+/);
  if (!match) return "58%";
  const numeric = Number.parseFloat(match[0]);
  if (!Number.isFinite(numeric)) return "58%";
  if (String(value).includes("FPS")) return `${Math.min(96, Math.max(42, numeric))}%`;
  if (String(value).includes("%")) return `${Math.min(100, Math.max(35, numeric))}%`;
  if (numeric <= 1) return `${Math.min(96, Math.max(45, numeric * 90))}%`;
  return `${Math.min(94, Math.max(42, numeric * 8))}%`;
}

function animateMetricValue(element, finalValue) {
  const text = String(finalValue);
  const match = text.match(/(\d+(?:\.\d+)?)/);
  if (!match || reducedMotionQuery.matches) {
    element.textContent = text;
    return;
  }

  const target = Number.parseFloat(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const prefix = text.slice(0, match.index);
  const suffix = text.slice(match.index + match[1].length);
  const duration = 620;
  const startedAt = performance.now();
  element.classList.add("is-counting");

  function tick(now) {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = text;
      element.classList.remove("is-counting");
    }
  }

  requestAnimationFrame(tick);
}

function renderSpotlight(projectId) {
  const project = spotlightProjects[projectId];
  if (!project) return;

  const panel = document.querySelector(".spotlight-panel");
  panel.classList.remove("is-switching");
  void panel.offsetWidth;
  panel.classList.add("is-switching");
  root.style.setProperty("--reactive-accent", project.accent);
  setTelemetry("project hall", project.status, project.title);
  flashReactiveHit(panel);

  spotlightType.textContent = project.type;
  spotlightTitle.textContent = project.title;
  spotlightSummary.textContent = project.summary;
  spotlightLink.href = project.link;
  spotlightLink.setAttribute("aria-label", `${project.title} repository`);

  spotlightMetrics.replaceChildren();
  project.metrics.forEach(([label, value]) => {
    const metric = document.createElement("div");
    const metricLabel = document.createElement("span");
    const metricValue = document.createElement("strong");
    metricLabel.textContent = label;
    metric.style.setProperty("--metric-level", metricLevel(value));
    metric.append(metricLabel, metricValue);
    spotlightMetrics.appendChild(metric);
    animateMetricValue(metricValue, value);
  });

  fillTextList(spotlightPoints, project.points);
  fillTextList(spotlightTags, project.tags, "span");

  buildFlow.replaceChildren();
  project.flow.forEach((step, index) => {
    const item = document.createElement("span");
    item.textContent = step;
    item.style.setProperty("--flow-index", index);
    buildFlow.appendChild(item);
  });
}

spotlightButtons.forEach((button) => {
  button.addEventListener("click", () => {
    spotlightButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    renderSpotlight(button.dataset.project);
  });
});

function renderSkillGroup(groupId) {
  const group = skillGroups[groupId];
  if (!group) return;

  const panels = [document.querySelector(".skill-focus"), document.querySelector(".skill-proof")];
  panels.forEach((panel) => {
    panel.classList.remove("is-switching");
    void panel.offsetWidth;
    panel.classList.add("is-switching");
    flashReactiveHit(panel);
  });

  skillCategory.textContent = group.category;
  skillTitle.textContent = group.title;
  skillSummary.textContent = group.summary;
  fillTextList(skillChips, group.chips, "span");
  fillTextList(skillEvidence, group.evidence);
  setTelemetry("skills explorer", "skill matrix recalibrated", group.category);
}

skillTabs.forEach((button) => {
  button.addEventListener("click", () => {
    skillTabs.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    renderSkillGroup(button.dataset.skill);
  });
});

function setupTiltCards() {
  if (reducedMotionQuery.matches) return;

  ambientDepthPanels.forEach((panel) => panel.classList.add("depth-reactive"));

  depthPanels.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -11;
      const tiltY = x * 11;
      const lift = card.classList.contains("project-card") ? -12 : -8;
      const depth = card.classList.contains("project-card") ? 42 : 30;
      card.style.setProperty("--tilt-x", `${tiltY}deg`);
      card.style.setProperty("--tilt-y", `${tiltX}deg`);
      card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
      card.style.transform = `perspective(1250px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0, ${lift}px, ${depth}px)`;
    });

    card.addEventListener("pointerenter", () => {
      const title = card.querySelector("h3")?.textContent?.trim();
      if (title) setTelemetry("project gallery", "github link ready", title);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
      card.style.removeProperty("transform");
    });
  });
}

function setupHeroParallax() {
  if (!hero || !heroInterface || reducedMotionQuery.matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
    const y = (event.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
    const shiftX = x * 48;
    const shiftY = y * 30;
    hero.style.setProperty("--hero-pointer-x", `${(x + 0.5) * 100}%`);
    hero.style.setProperty("--hero-pointer-y", `${(y + 0.5) * 100}%`);
    heroInterface.style.setProperty("--hero-tilt-x", `${x * 18}deg`);
    heroInterface.style.setProperty("--hero-tilt-y", `${y * -12}deg`);
    heroInterface.style.setProperty("--hero-shift-x", `${shiftX}px`);
    heroInterface.style.setProperty("--hero-shift-y", `${shiftY}px`);
    heroInterface.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 60px) rotateX(${y * -12}deg) rotateY(${x * 18}deg)`;
    if (heroContent) {
      heroContent.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 44px) rotateX(${y * -2.4}deg) rotateY(${x * 3.4}deg)`;
    }
    if (heroVault) {
      heroVault.style.setProperty("--hero-vault-x", `${shiftX}px`);
      heroVault.style.setProperty("--hero-vault-y", `${shiftY}px`);
    }
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    hero.style.removeProperty("--hero-pointer-x");
    hero.style.removeProperty("--hero-pointer-y");
    heroInterface.style.removeProperty("--hero-tilt-x");
    heroInterface.style.removeProperty("--hero-tilt-y");
    heroInterface.style.removeProperty("--hero-shift-x");
    heroInterface.style.removeProperty("--hero-shift-y");
    heroInterface.style.removeProperty("transform");
    if (heroContent) {
      heroContent.style.removeProperty("transform");
    }
    if (heroVault) {
      heroVault.style.removeProperty("--hero-vault-x");
      heroVault.style.removeProperty("--hero-vault-y");
    }
  }, { passive: true });
}

function setupCursorScanner() {
  if (!cursorScanner || reducedMotionQuery.matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let isVisible = false;

  window.addEventListener("pointermove", (event) => {
    if (!isVisible) {
      cursorScanner.classList.add("is-active");
      isVisible = true;
    }
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
    cursorScanner.style.transform = `translate3d(${event.clientX - 21}px, ${event.clientY - 21}px, 0)`;
  }, { passive: true });

  window.addEventListener("pointerdown", () => {
    cursorScanner.classList.remove("is-pulsing");
    void cursorScanner.offsetWidth;
    cursorScanner.classList.add("is-pulsing");
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    cursorScanner.classList.remove("is-active");
    isVisible = false;
  }, { passive: true });
}

function setupReactiveClicks() {
  const targetSelector = ".button, .filter-button, .spotlight-button, .skill-tab, .project-card, .compact-projects article, .project-github, .depth-reactive, .hero-avatar, .avatar-frame, .kinetic-words span, .offer-list article, .contact-link";

  document.addEventListener("pointerdown", (event) => {
    const target = event.target.closest(targetSelector);
    if (!target || !document.body.contains(target)) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "click-ripple";
    ripple.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
    ripple.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
    target.appendChild(ripple);
    flashReactiveHit(target);
    window.setTimeout(() => ripple.remove(), 620);
  });
}

function setupSkillChipFeedback() {
  skillChips.addEventListener("pointerover", (event) => {
    const chip = event.target.closest("span");
    if (!chip) return;
    skillChips.querySelectorAll("span").forEach((item) => item.classList.toggle("is-chip-focus", item === chip));
    setTelemetry("skill probe", "tool signal locked", chip.textContent);
  });

  skillChips.addEventListener("pointerleave", () => {
    skillChips.querySelectorAll("span").forEach((item) => item.classList.remove("is-chip-focus"));
  });

  spotlightButtons.forEach((button) => {
    button.addEventListener("pointerenter", () => {
      const project = spotlightProjects[button.dataset.project];
      if (project) setTelemetry("project preview", project.status, project.title);
    });
  });
}

function setupActiveNavigation() {
  const sectionMap = new Map();
  navAnchorLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sectionMap.set(section, link);
  });

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      const activeLink = sectionMap.get(visible.target);
      navAnchorLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
    },
    { rootMargin: "-35% 0px -48% 0px", threshold: [0.08, 0.2, 0.35, 0.5] }
  );

  sectionMap.forEach((_, section) => observer.observe(section));
}

function setupRevealMotion() {
  const revealItems = document.querySelectorAll(
    ".mission-stage, .intro-band, .offer-stage, .section, .contact-section, .timeline-item, .spotlight-shell, .skill-console"
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupTechCanvas() {
  if (!techCanvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = techCanvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.5 };
  const segments = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    techCanvas.width = Math.floor(width * pixelRatio);
    techCanvas.height = Math.floor(height * pixelRatio);
    techCanvas.style.width = `${width}px`;
    techCanvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    segments.length = 0;
    const columns = Math.max(6, Math.ceil(width / 150));
    const rows = Math.max(4, Math.ceil(height / 150));

    for (let y = 0; y <= rows; y += 1) {
      for (let x = 0; x <= columns; x += 1) {
        if ((x + y) % 2 === 0) {
          segments.push({
            x1: (x / columns) * width,
            y1: (y / rows) * height,
            x2: ((x + 0.72) / columns) * width,
            y2: (y / rows) * height,
            phase: Math.random() * Math.PI * 2
          });
        } else {
          segments.push({
            x1: (x / columns) * width,
            y1: (y / rows) * height,
            x2: (x / columns) * width,
            y2: ((y + 0.72) / rows) * height,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    segments.forEach((segment, index) => {
      const pulse = (Math.sin(time * 0.0012 + segment.phase) + 1) / 2;
      const cursorPull = Math.max(0, 1 - Math.hypot(pointer.x * width - segment.x1, pointer.y * height - segment.y1) / 360);
      ctx.strokeStyle = `rgba(214, 168, 79, ${0.05 + pulse * 0.1 + cursorPull * 0.16})`;
      ctx.beginPath();
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(segment.x2, segment.y2);
      ctx.stroke();

      if (index % 3 === 0) {
        const progress = (time * 0.00018 + pulse) % 1;
        const x = segment.x1 + (segment.x2 - segment.x1) * progress;
        const y = segment.y1 + (segment.y2 - segment.y1) * progress;
        ctx.fillStyle = `rgba(242, 212, 138, ${0.12 + cursorPull * 0.24})`;
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    });

    animationFrame = requestAnimationFrame(draw);
  }

  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX / Math.max(1, width);
    pointer.y = event.clientY / Math.max(1, height);
  }, { passive: true });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animationFrame = requestAnimationFrame(draw);

  window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame), { once: true });
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

spotlightButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
});
skillTabs.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
});
renderSkillGroup("ai");
renderSpotlight("veripresence");
setupTiltCards();
setupHeroParallax();
setupCursorScanner();
setupReactiveClicks();
setupSkillChipFeedback();
setupActiveNavigation();
setupRevealMotion();
setupTechCanvas();
updateHeaderState();
