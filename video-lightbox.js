document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll("[data-video]");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const videoUrl = this.getAttribute("data-video");
      openVideoLightbox(videoUrl);
    });
  });

  function openVideoLightbox(videoUrl) {
    const overlay = document.createElement("div");
    overlay.classList.add("video-lightbox-overlay");

    const lightbox = document.createElement("div");
    lightbox.classList.add("video-lightbox");

    const wrapper = document.createElement("div");
    wrapper.classList.add("video-wrapper");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("video-lightbox-close");
    closeBtn.innerHTML = "&times;";

    const embedUrl = detectVideoType(videoUrl);
    let content;

    if (embedUrl.endsWith(".mp4")) {
      content = document.createElement("video");
      content.src = embedUrl;
      content.controls = true;
      content.autoplay = true;
      content.addEventListener("loadedmetadata", function () {
        adjustLightboxSize(lightbox, this.videoWidth, this.videoHeight);
      });
    } else {
      content = document.createElement("iframe");
      content.src = embedUrl;
      content.allow = "autoplay; fullscreen; picture-in-picture";
      content.allowFullscreen = true;

      // Estimación de proporción 16:9
      adjustLightboxSize(lightbox, 16, 9);
    }

    wrapper.appendChild(content);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(wrapper);
    overlay.appendChild(lightbox);
    document.body.appendChild(overlay);

    overlay.style.display = "flex";

    // Cerrar
    closeBtn.addEventListener("click", () => closeVideoLightbox(overlay));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeVideoLightbox(overlay);
    });
  }

  function closeVideoLightbox(overlay) {
    overlay.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => overlay.remove(), 300);
  }

  function detectVideoType(url) {
    const ytRegex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^?&]+)/;
    const vimeoRegex = /vimeo\.com\/(\d+)/;

    if (ytRegex.test(url)) {
      const id = url.match(ytRegex)[1];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    } else if (vimeoRegex.test(url)) {
      const id = url.match(vimeoRegex)[1];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    } else {
      return url;
    }
  }

  function adjustLightboxSize(lightbox, width, height) {
    const maxW = window.innerWidth * 0.9;
    const maxH = window.innerHeight * 0.85;
    const ratio = width / height;

    let finalW = maxW;
    let finalH = finalW / ratio;

    if (finalH > maxH) {
      finalH = maxH;
      finalW = finalH * ratio;
    }

    lightbox.style.width = `${finalW}px`;
    lightbox.style.height = `${finalH}px`;
  }
});
