/*
    Fredierick Chavez — Portfolio Website
    script.js

    This file controls:
    - Dark mode toggle with localStorage persistence
    - Mobile navigation menu
    - Scroll reveal animation with stagger
    - Active nav link on scroll
    - Navbar shrink on scroll
    - Demo contact form message
*/

// ─── Dark mode ─────────────────────────────────────────────────────────────
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
const htmlEl      = document.documentElement;

function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    if (themeIcon) {
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

// Load saved preference, or fall back to system preference
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
themeToggle.addEventListener("click", () => {
    const next = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
});
}

// ─── Mobile navigation menu ────────────────────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinks  = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("show");
        }
    });
});

// ─── Navbar shrink on scroll ───────────────────────────────────────────────
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    if (siteHeader) {
        siteHeader.classList.toggle("scrolled", window.scrollY > 40);
    }
}, { passive: true });

// ─── Active nav link highlight on scroll ──────────────────────────────────
const sections   = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    let current = "";
    sections.forEach((section) => {
        if (scrollY >= section.offsetTop) {
            current = section.getAttribute("id");
        }
    });

    navAnchors.forEach((a) => {
        a.classList.toggle("nav-active", a.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// ─── Scroll reveal with stagger ───────────────────────────────────────────
function applyStaggerDelays(containerSelector, childSelector) {
    document.querySelectorAll(containerSelector).forEach((grid) => {
        grid.querySelectorAll(childSelector).forEach((child, i) => {
            const delay = i % 5;
            if (delay > 0) {
                child.classList.add(`reveal-delay-${delay}`);
            }
        });
    });
}

applyStaggerDelays(".skills-grid",   ".skill-card");
applyStaggerDelays(".projects-grid", ".project-card");
applyStaggerDelays(".timeline-grid", ".timeline-card");
applyStaggerDelays(".leadership-grid", ".leadership-card");
applyStaggerDelays(".stories-list", ".story-card");

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealOnScroll.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.10 }
);

revealElements.forEach((el) => revealOnScroll.observe(el));

// ─── Demo contact form ─────────────────────────────────────────────────────
const contactForm = document.getElementById("contactForm");
const formNote    = document.getElementById("formNote");

if (contactForm && formNote) {
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formNote.textContent  = "Thanks! Your message has been captured in the demo form. Connect this form to a backend to receive real messages.";
    formNote.style.color      = "#065f46";
    formNote.style.fontWeight = "700";

    contactForm.reset();
});
}

// ─── Scroll progress bar ───────────────────────────────────────────────────
const scrollProgress = document.getElementById("scrollProgress");

if (scrollProgress) {
    const updateScrollProgress = () => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
        scrollProgress.style.width = pct + "%";
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();
}

// ─── Pointer-driven hero parallax (adds depth to the gradient orbs) ────────
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer         = window.matchMedia("(pointer: fine)").matches;
const heroBg              = document.querySelector(".hero-bg");
const heroSection         = document.querySelector(".hero");

if (heroBg && heroSection && finePointer && !prefersReducedMotion) {
    heroSection.addEventListener("mousemove", (event) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroBg.style.transform = `translate(${x * 22}px, ${y * 22}px)`;
    });

    heroSection.addEventListener("mouseleave", () => {
        heroBg.style.transform = "";
    });
}
