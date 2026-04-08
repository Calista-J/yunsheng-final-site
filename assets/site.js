const revealElements = document.querySelectorAll(".reveal");
const siteLinks = window.SITE_LINKS || {};
const backgroundMusic = document.querySelector("[data-background-music]");
const musicToggle = document.querySelector("[data-music-toggle]");

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

document.querySelectorAll("[data-video-key]").forEach((video) => {
  const key = video.getAttribute("data-video-key");
  const src = siteLinks[key];

  if (src && src !== "#") {
    video.src = src;
    video.setAttribute("crossorigin", "anonymous");
    return;
  }

  video.outerHTML = '<div class="is-disabled">该视频链接尚未配置</div>';
});

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

if (backgroundMusic && musicToggle) {
  const musicSrc = siteLinks.backgroundMusic;

  if (musicSrc && musicSrc !== "#") {
    backgroundMusic.src = musicSrc;
    backgroundMusic.setAttribute("crossorigin", "anonymous");

    musicToggle.addEventListener("click", async () => {
      try {
        if (backgroundMusic.paused) {
          await backgroundMusic.play();
          musicToggle.textContent = "暂停背景音乐";
        } else {
          backgroundMusic.pause();
          musicToggle.textContent = "播放背景音乐";
        }
      } catch (error) {
        window.alert("背景音乐暂时无法播放，请检查音乐链接是否可访问。");
      }
    });
  } else {
    musicToggle.classList.add("is-disabled");
    musicToggle.disabled = true;
    musicToggle.textContent = "暂未配置背景音乐";
  }
}
