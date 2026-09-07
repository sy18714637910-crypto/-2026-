 (async () => {
  "use strict";

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });

  if (!window.gsap) {
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js");
    } catch {
      // Keep the existing non-GSAP fallback if the optional library cannot load.
    }
  }

  const STAGE_WIDTH = 1920;
  const STAGE_HEIGHT = 1080;
  const FRAME_COUNT = 11;
  const START_TIMEOUT = 2000;
  const TIMELINE_END = 3600;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const FACE_TRACKING_ASSET_ROOT = "/assets/face-tracking/";
  const FACE_STATES = [
    ["direct", "半张脸 直视.png"],
    ["up", "半张脸 向上看.png"],
    ["down", "半张脸 向下看.png"],
    ["left", "半张脸 向左看.png"],
    ["right", "半张脸 向右看.png"],
    ["down-left", "半张脸 左下看.png"],
    ["down-right", "半张脸 右下看.png"],
  ];

  const prepareStructure = () => {
    const hero = document.querySelector(".hero-section");
    const wordmark = hero?.querySelector(".hero-wordmark");
    const objectContainer = hero?.querySelector(".hero-objects");
    const face = hero?.querySelector(".hero-face");
    const copy = hero?.querySelector(".hero-copy");
    const projects = hero?.querySelector(".hero-projects");
    const button = hero?.querySelector(".hero-button");

    if (!hero || !wordmark || !objectContainer || !face || !copy || !projects || !button) {
      return null;
    }

    const stage = document.createElement("div");
    stage.className = "hero-stage";
    stage.setAttribute("aria-hidden", "true");

    const canvas = document.createElement("canvas");
    canvas.className = "hero-sequence-canvas";
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    const finalLayers = document.createElement("div");
    finalLayers.className = "hero-final-layers";

    const faceTracker = document.createElement("div");
    faceTracker.className = "hero-stage__layer hero-stage__face hero-face-tracker";
    faceTracker.dataset.faceState = "direct";
    FACE_STATES.forEach(([state, fileName]) => {
      const image = document.createElement("img");
      image.className = `hero-face-state hero-face-state--${state}`;
      image.src = `${FACE_TRACKING_ASSET_ROOT}${fileName}`;
      image.alt = "";
      image.decoding = "async";
      image.draggable = false;
      image.dataset.faceState = state;
      if (state === "direct") image.classList.add("is-active");
      faceTracker.append(image);
    });


    const layerConfiguration = [
      [objectContainer.querySelector(".object-film"), "hero-stage__film"],
      [objectContainer.querySelector(".object-panel"), "hero-stage__panel"],
      [objectContainer.querySelector(".object-board"), "hero-stage__board"],
      [objectContainer.querySelector(".object-notebook"), "hero-stage__notebook"],
      [objectContainer.querySelector(".object-camera"), "hero-stage__camera"],
      [faceTracker, "hero-stage__face"],
    ];

    if (layerConfiguration.some(([image]) => !image)) return null;

    layerConfiguration.forEach(([image, positionClass]) => {
      image.removeAttribute("style");
      image.classList.remove("layer", "hero-face");
      image.classList.add("hero-stage__layer", positionClass);
      if (image.tagName === "IMG") image.alt = "";
      finalLayers.append(image);
    });

    stage.append(canvas, finalLayers);
    wordmark.after(stage);
    face.remove();
    objectContainer.remove();

    const copyLines = Array.from(copy.querySelectorAll("p"));
    const projectThumbs = Array.from(projects.querySelectorAll("img"));
    copyLines.forEach((line) => line.classList.add("hero-copy__line"));
    projectThumbs.forEach((image) => image.classList.add("hero-project-thumb"));

    return {
      stage,
      canvas,
      finalLayers,
      faceTracker,
      wordmark,
      copyLines,
      projectThumbs,
      button,
    };
  };

  const structure = prepareStructure();
  if (!structure) return;

  const {
    stage,
    canvas,
    finalLayers,
    faceTracker,
    wordmark,
    copyLines,
    projectThumbs,
    button,
  } = structure;
  const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
  // Gaze layers are created once, then kept mounted. Do not switch to a layer
  // until the browser has finished loading and decoding every face asset.
  let faceAssetsReady = false;
  const frameUrls = Array.from(
    { length: FRAME_COUNT },
    (_, index) => `/assets/hero-opening/hero-opening-${String(index).padStart(2, "0")}.webp`
  );

  const loadImage = (source) => new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        resolve(image);
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () => reject(new Error(`Failed to load ${source}`));
    image.src = source;
  });

  const loadFonts = async () => {
    if (!document.fonts) return;
    await Promise.all([
      document.fonts.load('500 16px "SUYUE Source Han"'),
      document.fonts.load('700 16px "SUYUE Source Han"'),
      document.fonts.ready,
    ]);
  };

  const decodeFinalLayers = () => Promise.all(
    Array.from(finalLayers.querySelectorAll("img")).map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return image.decode ? image.decode() : Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", reject, { once: true });
      });
    })
  );

  const drawFrame = (image, index) => {
    if (!context) return;
    context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    context.drawImage(image, 0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    canvas.dataset.frameIndex = String(index);
  };

  const showStaticFallback = () => {
    document.documentElement.classList.remove("hero-intro-running");
    stage.classList.remove("is-crossfading");
    canvas.classList.remove("is-rising");
    finalLayers.classList.add("is-settled");
    wordmark.classList.add("is-revealed");
    copyLines.forEach((line) => line.classList.add("is-revealed"));
    projectThumbs.forEach((thumb) => thumb.classList.add("is-revealed"));
    button.classList.add("is-revealed");
  };

  const setupFaceTracking = () => {
    const stateImages = new Map(
      Array.from(faceTracker.querySelectorAll(".hero-face-state"), (image) => [
        image.dataset.faceState,
        image,
      ])
    );
    const LERP = 0.08;
    const DEAD_ZONE = 0.18;
    const HYSTERESIS = (8 * Math.PI) / 180;
    const RESET_DELAY = 380;
    let currentState = "direct";
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let resetTimer = 0;

    const setState = (nextState) => {
      if (!faceAssetsReady || !stateImages.has(nextState) || nextState === currentState) return;
      stateImages.get(nextState)?.classList.add("is-active");
      stateImages.get(currentState)?.classList.remove("is-active");
      currentState = nextState;
      faceTracker.dataset.faceState = nextState;
    };

    const getOrigin = () => {
      const rect = faceTracker.getBoundingClientRect();
      return {
        rect,
        x: rect.left + rect.width * 0.5,
        // Eye line, not the geometric centre of the full sticker.
        y: rect.top + rect.height * 0.475,
      };
    };

    const origin = getOrigin();
    targetX = currentX = origin.x;
    targetY = currentY = origin.y;

    const scheduleReset = () => {
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        const nextOrigin = getOrigin();
        targetX = nextOrigin.x;
        targetY = nextOrigin.y;
      }, RESET_DELAY);
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      window.clearTimeout(resetTimer);
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const angleDistance = (a, b) => {
      const difference = Math.abs(a - b) % (Math.PI * 2);
      return difference > Math.PI ? Math.PI * 2 - difference : difference;
    };

    // Upper diagonals intentionally resolve to `up`; only lower diagonals have
    // dedicated assets, which keeps the gaze calm near the top boundaries.
    const sectors = [
      ["up", -Math.PI / 2, (Math.PI * 3) / 8],
      ["right", 0, Math.PI / 8],
      ["down-right", Math.PI / 4, Math.PI / 8],
      ["down", Math.PI / 2, Math.PI / 8],
      ["down-left", (Math.PI * 3) / 4, Math.PI / 8],
      ["left", Math.PI, Math.PI / 8],
    ];

    const directionFor = (angle, currentDirection) => {
      const currentSector = sectors.find(([name]) => name === currentDirection);
      if (
        currentSector &&
        angleDistance(angle, currentSector[1]) <= currentSector[2] + HYSTERESIS
      ) {
        return currentDirection;
      }

      return sectors.reduce((closest, sector) => {
        const distance = angleDistance(angle, sector[1]);
        return distance < closest.distance
          ? { name: sector[0], distance }
          : closest;
      }, { name: "direct", distance: Infinity }).name;
    };

    const tick = () => {
      const nextOrigin = getOrigin();

      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;

      const dx = currentX - nextOrigin.x;
      const dy = currentY - nextOrigin.y;
      const distance = Math.hypot(dx, dy);
      const normalizedDistance = nextOrigin.rect.width
        ? distance / nextOrigin.rect.width
        : 0;

      if (normalizedDistance <= DEAD_ZONE) {
        setState("direct");
      } else {
        setState(directionFor(Math.atan2(dy, dx), currentState));
      }

      window.requestAnimationFrame(tick);
    };

    if (reduceMotion.matches) {
      setState("direct");
      return;
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", scheduleReset, { passive: true });
    window.addEventListener("blur", scheduleReset, { passive: true });
    window.requestAnimationFrame(tick);

  };

  setupFaceTracking();

  const setupHeroMouseParallax = () => {
    if (reduceMotion.matches || !window.gsap || !window.matchMedia("(pointer: fine)").matches) return;
    const showcase = stage.closest(".hero-section");
    if (!showcase) return;

    const camera = showcase.querySelector(".hero-stage__camera");
    const film = showcase.querySelector(".hero-stage__film");
    const panel = showcase.querySelector(".hero-stage__panel");
    const notebook = showcase.querySelector(".hero-stage__notebook");
    const parallaxItems = [
      { element: camera, name: "相机", maxX: 18, maxY: 14, rotation: 1.2 },
      { element: projectThumbs[0], name: "绿色卡片", maxX: -10, maxY: -8, rotation: 0 },
      { element: film, name: "中央播放器", maxX: 5, maxY: 4, rotation: 0 },
      { element: panel, name: "黄色卡片", maxX: 14, maxY: 11, rotation: 1.2 },
      { element: projectThumbs[3], name: "蓝鲸名人堂", maxX: 7, maxY: 6, rotation: 0 },
      { element: projectThumbs[5], name: "BEACON TOWER", maxX: -16, maxY: -13, rotation: 0.6 },
      { element: projectThumbs[1], name: "手机素材", maxX: -5, maxY: -4, rotation: 0 },
      { element: notebook, name: "播放器装饰", maxX: 4, maxY: -3, rotation: 0 },
      { element: projectThumbs[4], name: "内容运营素材", maxX: 6, maxY: -5, rotation: 0 },
    ].filter(({ element }) => element);

    const quickSetters = parallaxItems.map((item) => ({
      x: gsap.quickTo(item.element, "x", { duration: 0.8, ease: "power3.out" }),
      y: gsap.quickTo(item.element, "y", { duration: 0.8, ease: "power3.out" }),
      rotation: gsap.quickTo(item.element, "rotation", { duration: 0.8, ease: "power3.out" }),
    }));
    let isInViewport = false;

    const reset = () => {
      quickSetters.forEach(({ x, y, rotation }) => {
        x(0);
        y(0);
        rotation(0);
      });
    };

    const onMouseMove = (event) => {
      if (!isInViewport) return;
      const rect = showcase.getBoundingClientRect();
      const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const normalizedY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      parallaxItems.forEach((item, index) => {
        quickSetters[index].x(normalizedX * item.maxX);
        quickSetters[index].y(normalizedY * item.maxY);
        quickSetters[index].rotation(normalizedX * item.rotation);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      if (!isInViewport) reset();
    }, { threshold: 0.15 });

    observer.observe(showcase);
    showcase.addEventListener("mousemove", onMouseMove, { passive: true });
    showcase.addEventListener("mouseleave", reset, { passive: true });
  };

  setupHeroMouseParallax();

  if (reduceMotion.matches) {
    showStaticFallback();
    return;
  }

  document.documentElement.classList.add("hero-intro-running");

  const playTimeline = (frames) => {
    let startTime;
    let renderedFrame = -1;
    let riseStarted = false;
    let wordmarkStarted = false;
    let crossfadeStarted = false;
    let finished = false;

    drawFrame(frames[0], 0);

    const tick = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (!riseStarted && elapsed >= 300) {
        riseStarted = true;
        canvas.classList.add("is-rising");
      }

      if (elapsed >= 1000 && elapsed <= 1900) {
        const sequenceProgress = Math.min(1, (elapsed - 1000) / 900);
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(sequenceProgress * FRAME_COUNT));
        if (frameIndex !== renderedFrame) {
          drawFrame(frames[frameIndex], frameIndex);
          renderedFrame = frameIndex;
        }
      } else if (elapsed > 1900 && renderedFrame !== FRAME_COUNT - 1) {
        drawFrame(frames[FRAME_COUNT - 1], FRAME_COUNT - 1);
        renderedFrame = FRAME_COUNT - 1;
      }

      if (!wordmarkStarted && elapsed >= 1600) {
        wordmarkStarted = true;
        wordmark.classList.add("is-revealed");
      }

      if (!crossfadeStarted && elapsed >= 1900) {
        crossfadeStarted = true;
        stage.classList.add("is-crossfading");
      }

      copyLines.forEach((line, index) => {
        if (elapsed >= 2200 + index * 120) line.classList.add("is-revealed");
      });

      projectThumbs.forEach((thumb, index) => {
        if (elapsed >= 2450 + index * 55) thumb.classList.add("is-revealed");
      });

      if (elapsed >= 2900) button.classList.add("is-revealed");

      if (!finished && elapsed >= TIMELINE_END) {
        finished = true;
        document.documentElement.classList.remove("hero-intro-running");
        stage.classList.remove("is-crossfading");
        canvas.classList.remove("is-rising");
        finalLayers.classList.add("is-settled");
        // Keep the final Canvas frame intact until the element is hidden. Clearing
        // here can expose a transparent paint between the crossfade and `hidden`.
        canvas.hidden = true;
        return;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const prepare = async () => {
    const readiness = Promise.all([
      Promise.all(frameUrls.map(loadImage)),
      loadFonts(),
      decodeFinalLayers(),
    ]);

    const result = await Promise.race([
      readiness.then(([frames]) => ({ ready: true, frames })).catch(() => ({ ready: false })),
      new Promise((resolve) => window.setTimeout(
        () => resolve({ ready: false, timedOut: true }),
        START_TIMEOUT
      )),
    ]);

    if (!result.ready) {
      showStaticFallback();
      return;
    }

    faceAssetsReady = true;
    playTimeline(result.frames);
  };

  prepare();
})();
