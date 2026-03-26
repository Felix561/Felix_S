(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();

function toggleTheme(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const root = document.documentElement;
  const isLight = root.getAttribute("data-theme") === "light";
  root.setAttribute("data-theme", isLight ? "dark" : "light");
  localStorage.setItem("theme", isLight ? "dark" : "light");
}

function formatLastLogin() {
  const lang = document.documentElement.lang || "en";
  const locale = lang === "de" ? "de-DE" : "en-US";
  const now = new Date();

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);
}

function initializeLastLogin() {
  document.querySelectorAll(".js-last-login").forEach((node) => {
    node.textContent = formatLastLogin();
  });
}

function initializeEntries() {
  document.querySelectorAll("[data-entry]").forEach((entry, index) => {
    const toggle = entry.querySelector("[data-entry-toggle]");
    if (!toggle) {
      return;
    }

    const initiallyOpen = entry.getAttribute("data-open") === "true" || index === 0;
    entry.classList.toggle("open", initiallyOpen);
    toggle.setAttribute("aria-expanded", initiallyOpen ? "true" : "false");

    toggle.addEventListener("click", () => {
      const willOpen = !entry.classList.contains("open");
      entry.classList.toggle("open", willOpen);
      toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLastLogin();
  initializeEntries();
});
