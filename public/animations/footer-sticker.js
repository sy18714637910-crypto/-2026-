(() => {
  "use strict";

  const FRAME_COUNT = 21;
  const LAST_FRAME = FRAME_COUNT - 1;
  const FRAME_WIDTH = 900;
  const FRAME_HEIGHT = 866;
  const START_VIEWPORT_RATIO = 0.9;
  const END_VIEWPORT_RATIO = 0.5;
  const FACE_SELECTOR = [
    ".footer-face",
    ".product-footer-face",
    ".brand-film-footer-face",
    ".proposal-footer-face",
    ".visual-footer-face",
  ].join(", ");

  const scriptElement = document.currentScript || Array.from(document.scripts)
    .find((script) => script.src.endsWith("/footer-sticker.js"));
  if (!scriptElement) return;

  const frameBaseUrl = new URL("/assets/sticker-sequence/", window.location.origin);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (value, minimum, maximum) =>
    Math.min(maximum, Math.max(minimum, value));

  const frames = Array.from({ length: FRAME_COUNT }, (_, index) => ({
    index,
    image: null,
    status: "idle",
    promise: null,
  }));

  let animationFrame = 0;
  let preloadStarted = false;

  const frameUrl = (index) =>
    new URL(`sticker-${String(index).padStart(3, "0")}.webp`, frameBaseUrl).href;

  const controllers = Array.from(
    document.querySelectorAll("[data-footer-sticker]")
  ).map((sticker) => {
    const reveal = sticker.querySelector(".footer-sticker__reveal");
    const directory = sticker.querySelector(".footer-directory");
    const originalImage = reveal ? reveal.querySelector(FACE_SELECTOR) : null;
    if (!reveal || !directory || !originalImage) return null;

    const sequence = document.createElement("div");
    sequence.className = "footer-sticker-sequence";
    sequence.setAttribute("aria-hidden", "true");
    sequence.setAttribute("style", originalImage.getAttribute("style") || "");

    const canvas = document.createElement("canvas");
    canvas.className = "footer-sticker-sequence__canvas";
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    canvas.setAttribute("role", "presentation");
    canvas.dataset.frameIndex = "-1";

    originalImage.before(sequence);
    originalImage.removeAttribute("style");
    originalImage.classList.add("footer-sticker-sequence__fallback");
    originalImage.alt = "";
    originalImage.setAttribute("aria-hidden", "true");
    sequence.append(originalImage, canvas);

    return {
      sticker,
      reveal,
      directory,
      sequence,
      canvas,
      context: canvas.getContext("2d", { alpha: true }),
      clipStart: Number.parseFloat(
        reveal.style.getPropertyValue("--sticker-clip-start") || "0"
      ),
      targetFrame: 0,
      renderedFrame: -1,
      canvasDpr: 0,
      needsRedraw: true,
    };
  }).filter(Boolean);

  if (!controllers.length) return;

  const nearestLoadedFrame = (targetIndex) => {
    if (frames[targetIndex].status === "loaded") return targetIndex;
    for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
      const before = targetIndex - distance;
      const after = targetIndex + distance;
      if (before >= 0 && frames[before].status === "loaded") return before;
      if (after < FRAME_COUNT && frames[after].status === "loaded") return after;
    }
    return -1;
  };

  const drawController = (controller) => {
    const selectedFrame = nearestLoadedFrame(controller.targetFrame);
    if (selectedFrame < 0 || !controller.context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sizeChanged = controller.canvasDpr !== dpr;
    if (!controller.needsRedraw && !sizeChanged && controller.renderedFrame === selectedFrame) {
      return;
    }

    if (sizeChanged) {
      controller.canvas.width = Math.round(FRAME_WIDTH * dpr);
      controller.canvas.height = Math.round(FRAME_HEIGHT * dpr);
      controller.canvasDpr = dpr;
    }

    const context = controller.context;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.drawImage(frames[selectedFrame].image, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

    controller.renderedFrame = selectedFrame;
    controller.needsRedraw = false;
    controller.canvas.dataset.frameIndex = String(selectedFrame);
    controller.sequence.classList.add("is-ready");
  };

  const requestUpdate = (force = false) => {
    if (reduceMotion.matches && !force) return;
    if (!animationFrame) animationFrame = requestAnimationFrame(update);
  };

  const loadFrame = (index) => {
    const frame = frames[index];
    if (frame.promise) return frame.promise;

    frame.status = "loading";
    frame.image = new Image();
    frame.image.decoding = "async";
    frame.promise = new Promise((resolve) => {
      frame.image.onload = () => {
        frame.status = "loaded";
        controllers.forEach((controller) => {
          controller.needsRedraw = true;
        });
        requestUpdate(index === 0);
        resolve(true);
      };
      frame.image.onerror = () => {
        frame.status = "error";
        resolve(false);
      };
      frame.image.src = frameUrl(index);
    });
    return frame.promise;
  };

  const preloadRemainingFrames = () => {
    if (preloadStarted || reduceMotion.matches) return;
    preloadStarted = true;
    for (let index = 1; index < FRAME_COUNT; index += 1) loadFrame(index);
  };

  const applyEntrance = (controller, progress, motionFactor) => {
    const hiddenProgress = 1 - progress;
    const translateX = -window.innerWidth * 0.022 * motionFactor * hiddenProgress;
    const translateY = window.innerHeight * 0.15 * motionFactor * hiddenProgress;
    const rotation = -4 * motionFactor * hiddenProgress;
    const scale = 1 - 0.035 * motionFactor * hiddenProgress;
    const clip = controller.clipStart * hiddenProgress;

    controller.sticker.style.setProperty("--sticker-progress", progress.toFixed(4));
    controller.reveal.style.setProperty("--sticker-translate-x", `${translateX.toFixed(2)}px`);
    controller.reveal.style.setProperty("--sticker-translate-y", `${translateY.toFixed(2)}px`);
    controller.reveal.style.setProperty("--sticker-rotation", `${rotation.toFixed(3)}deg`);
    controller.reveal.style.setProperty("--sticker-scale", scale.toFixed(4));
    controller.reveal.style.setProperty("--sticker-clip", `${clip.toFixed(3)}%`);
  };

  function update() {
    animationFrame = 0;

    if (reduceMotion.matches) {
      controllers.forEach((controller) => {
        controller.targetFrame = 0;
        applyEntrance(controller, 1, 0);
        drawController(controller);
      });
      return;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const startLine = viewportHeight * START_VIEWPORT_RATIO;
    const preferredEndLine = viewportHeight * END_VIEWPORT_RATIO;
    const maximumScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    const remainingScroll = Math.max(0, maximumScroll - window.scrollY);
    const motionFactor = window.innerWidth <= 480
      ? 0.62
      : window.innerWidth <= 900
        ? 0.8
        : 1;

    controllers.forEach((controller) => {
      const directoryTop = controller.directory.getBoundingClientRect().top;
      const directoryTopAtPageEnd = directoryTop - remainingScroll;
      const endLine = Math.max(preferredEndLine, directoryTopAtPageEnd);
      const range = Math.max(1, startLine - endLine);
      const progress = clamp((startLine - directoryTop) / range, 0, 1);
      const frameIndex = Math.round(progress * LAST_FRAME);

      controller.targetFrame = frameIndex;
      controller.canvas.dataset.targetFrame = String(frameIndex);
      applyEntrance(controller, progress, motionFactor);
      drawController(controller);
    });
  }

  const forceResizeUpdate = () => {
    controllers.forEach((controller) => {
      controller.needsRedraw = true;
    });
    requestUpdate(true);
  };

  const updateAfterNavigation = () => {
    requestAnimationFrame(() => requestAnimationFrame(forceResizeUpdate));
  };

  const handleMotionPreference = (event) => {
    if (reduceMotion.matches) {
      controllers.forEach((controller) => {
        controller.targetFrame = 0;
        controller.needsRedraw = true;
      });
      loadFrame(0);
    } else if (event) {
      preloadRemainingFrames();
    }
    requestUpdate(true);
  };

  loadFrame(0);

  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    const preloadObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      if (reduceMotion.matches) return;
      preloadRemainingFrames();
      observer.disconnect();
    }, { rootMargin: "100% 0px", threshold: 0 });
    controllers.forEach((controller) => preloadObserver.observe(controller.directory));
  } else if (!reduceMotion.matches) {
    preloadRemainingFrames();
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", forceResizeUpdate, { passive: true });
  window.addEventListener("orientationchange", forceResizeUpdate, { passive: true });
  window.addEventListener("hashchange", updateAfterNavigation);
  window.addEventListener("popstate", updateAfterNavigation);
  window.addEventListener("pageshow", updateAfterNavigation);
  window.addEventListener("load", updateAfterNavigation, { once: true });
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", handleMotionPreference);
  } else {
    reduceMotion.addListener(handleMotionPreference);
  }

  handleMotionPreference();
})();
