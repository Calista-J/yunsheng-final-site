const revealElements = document.querySelectorAll(".reveal");
const siteLinks = window.SITE_LINKS || {};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => observer.observe(element));

document.querySelectorAll("[data-link-key]").forEach((element) => {
  const key = element.getAttribute("data-link-key");
  const href = siteLinks[key];

  if (href && href !== "#") {
    element.setAttribute("href", href);
    if (/^https?:/i.test(href)) {
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noreferrer");
    }
    return;
  }

  element.classList.add("is-disabled");
  element.setAttribute("aria-disabled", "true");
  element.addEventListener("click", (event) => {
    event.preventDefault();
    window.alert("这个入口还没有填入正式的线上链接，请先在 assets/site-config.js 里补上对应 URL。");
  });
});
