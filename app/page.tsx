'use client';

import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const DESIGN_WIDTH = 1925;
const DESIGN_HEIGHT = 10755;
const HERO_SCROLL_DISTANCE = 700;
const PROJECT_STAGE_TOP = 1980;

const projectMotion = [
  { id: 'camera', entry: [-150, -110, -7, 0.72], scatter: [-72, -58], core: false },
  { id: 'phone', entry: [145, -105, 3, 0.76], scatter: [82, -76], core: false },
  { id: 'film', entry: [12, 92, -2, 0.86], scatter: [0, 0], core: true },
  { id: 'whale', entry: [-138, 112, -4, 0.74], scatter: [-88, 76], core: false },
  { id: 'yellow', entry: [154, -38, 5, 0.78], scatter: [92, -20], core: false },
  { id: 'beacon', entry: [142, 106, 6, 0.75], scatter: [96, 72], core: false },
] as const;

function box(x: number, y: number, width: number, height?: number): CSSProperties {
  return {
    left: `${(x / DESIGN_WIDTH) * 100}%`,
    top: `${(y / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    ...(height ? { height: `${(height / DESIGN_HEIGHT) * 100}%` } : {}),
  };
}

function asset(number: number) {
  return `/assets/home/资源 ${number}.png`;
}

function Layer({ number, x, y, width, className = '', alt = '' }: {
  number: number;
  x: number;
  y: number;
  width: number;
  className?: string;
  alt?: string;
}) {
  return <img className={`layer ${className}`} style={box(x, y, width)} src={asset(number)} alt={alt} />;
}

function TextBox({ x, y, width, height, className = '', children }: {
  x: number;
  y: number;
  width: number;
  height?: number;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`text-box ${className}`} style={box(x, y, width, height)}>{children}</div>;
}

const experience = [
  {
    years: '2025-2026',
    role: '产品运营',
    company: '上海心图云医疗科技发展有限公司',
    copy: '从零搭建健康产品的短视频内容体系，独立完成小程序与电商详情页的 UI 设计，让技术参数变成用户看得懂的场景。',
  },
  {
    years: '2024-2025',
    role: '影片策划',
    company: '上海挪移塔文化传播有限公司',
    copy: '为太平洋保险、中国农业银行等品牌写方案、做分镜、用 AI 提效——做的其实是同一件事：在客户“想说什么”和观众“能听懂什么”之间，找到最短的路。',
  },
  {
    years: '2021-2023',
    role: '内容运营 / 视频制作',
    company: '网易 · 字节跳动 · 花猫影像',
    copy: '在社区互动中练习观察：什么样的内容让人停下来，什么样的互动让人留下声音。婚礼视频的拍摄与剪辑，是这段观察的另一种起点——在现场捕捉不可重来的瞬间，在剪辑台上反复体会“什么节奏能留住情绪”。',
  },
];

export default function Home() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero-section');
    const face = document.querySelector<HTMLElement>('.hero-face-normal');
    const sequence = document.querySelector<HTMLImageElement>('.hero-peel-frame');
    const titleMotion = document.querySelector<HTMLElement>('.hero-title-motion');
    const characterMotion = document.querySelector<HTMLElement>('.hero-character-motion');
    const debug = document.querySelector<HTMLElement>('.hero-motion-debug');
    const projectStage = document.querySelector<HTMLElement>('.hero-projects-scroll-stage');
    const projectCollage = document.querySelector<HTMLElement>('.hero-projects-collage');
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>('.hero-project-card'));
    if (!hero || !face || !sequence || !titleMotion || !characterMotion) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frameUrls = Array.from({ length: 12 }, (_, index) =>
      `/assets/hero-peel/frame-${String(index + 25).padStart(5, '0')}.png`,
    );
    let framesReady = false;
    let currentFrame = -1;
    let raf = 0;
    let pointerRaf = 0;
    let pointerTarget = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const projectPointerTarget = new Map<string, { x: number; y: number; scale: number; rotate: number; z: number }>();
    const projectPointer = new Map<string, { x: number; y: number; scale: number; rotate: number }>();

    const preload = async () => {
      try {
        await Promise.all(frameUrls.map(async (url) => {
          const image = new Image();
          image.src = url;
          if (image.decode) await image.decode();
          else await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(`Unable to load ${url}`));
          });
        }));
        framesReady = true;
        updateScroll();
      } catch {
        // Keep the current portrait visible if the optional sequence cannot load.
      }
    };

    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const updateScroll = () => {
      raf = 0;
      const heroStart = 0;
      const heroProgress = clamp((window.scrollY - heroStart) / HERO_SCROLL_DISTANCE);
      const progress = heroProgress;
      const titleY = reduceMotion.matches ? 0 : -160 * progress;
      const characterY = reduceMotion.matches ? 0 : -300 * progress;
      const peeling = framesReady && progress > 0;
      hero.dataset.peelState = peeling ? (progress >= 1 ? 'scrolled' : 'peeling') : 'idle';
      titleMotion.style.setProperty('--hero-title-scroll-y', `${titleY}px`);
      characterMotion.style.setProperty('--hero-character-scroll-y', `${characterY}px`);
      sequence.style.opacity = peeling ? '1' : '0';
      face.style.opacity = peeling ? '0' : '1';
      if (peeling) {
        const frameIndex = Math.round(progress * (frameUrls.length - 1));
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          sequence.src = frameUrls[frameIndex];
          sequence.dataset.frameIndex = String(frameIndex);
          console.log({ frameIndex, frame: frameUrls[frameIndex] });
        }
      } else {
        currentFrame = -1;
      }
      if (debug) {
        debug.querySelector<HTMLElement>('[data-debug="progress"]')!.textContent = heroProgress.toFixed(2);
        debug.querySelector<HTMLElement>('[data-debug="frame"]')!.textContent = `${Math.max(0, currentFrame)} / 11`;
        debug.querySelector<HTMLElement>('[data-debug="title-y"]')!.textContent = `${Math.round(titleY)}px`;
        debug.querySelector<HTMLElement>('[data-debug="character-y"]')!.textContent = `${Math.round(characterY)}px`;
        debug.querySelector<HTMLElement>('[data-debug="state"]')!.textContent = hero.dataset.peelState?.toUpperCase() ?? 'IDLE';
      }
      console.log({ scrollY: window.scrollY, heroStart, heroProgress, frameIndex: Math.max(0, currentFrame), titleY, characterY });
      face.style.setProperty('--pointer-x', `${pointer.x}px`);
      face.style.setProperty('--pointer-y', `${pointer.y}px`);

      if (projectStage && projectCollage && projectCards.length) {
        const stageRect = projectStage.getBoundingClientRect();
        const stageRange = Math.max(1, projectStage.offsetHeight - window.innerHeight);
        const projectProgress = reduceMotion.matches
          ? 0.45
          : clamp((window.scrollY - (stageRect.top + window.scrollY)) / stageRange);
        projectStage.dataset.progress = projectProgress.toFixed(3);
        projectCards.forEach((card, index) => {
          const motion = projectMotion[index];
          const entryT = ease(projectProgress / 0.45);
          const scatterT = ease((projectProgress - 0.65) / 0.2);
          const entryX = motion.entry[0] * (1 - entryT);
          const entryY = motion.entry[1] * (1 - entryT);
          const entryRotate = motion.entry[2] * (1 - entryT);
          const entryScale = motion.entry[3] + (1 - motion.entry[3]) * entryT;
          const scatterX = motion.scatter[0] * scatterT;
          const scatterY = motion.scatter[1] * scatterT;
          const coreScale = motion.core ? 0.16 * ease((projectProgress - 0.85) / 0.15) : 0;
          card.style.setProperty('--scroll-x', `${entryX + scatterX}px`);
          card.style.setProperty('--scroll-y', `${entryY + scatterY - coreScale * 18}px`);
          card.style.setProperty('--scroll-rotate', `${entryRotate}deg`);
          card.style.setProperty('--scroll-scale', String(entryScale + coreScale));
        });
      }
    };
    const ease = (value: number) => {
      const t = clamp(value);
      return t * t * t * (t * (t * 6 - 15) + 10);
    };
    const requestScrollUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(updateScroll);
    };
    const updatePointer = () => {
      pointerRaf = 0;
      pointer.x += (pointerTarget.x - pointer.x) * 0.09;
      pointer.y += (pointerTarget.y - pointer.y) * 0.09;
      if (hero.dataset.peelState === 'idle') {
        face.style.setProperty('--pointer-x', `${pointer.x}px`);
        face.style.setProperty('--pointer-y', `${pointer.y}px`);
      }
      if (Math.abs(pointerTarget.x - pointer.x) > 0.1 || Math.abs(pointerTarget.y - pointer.y) > 0.1) {
        pointerRaf = window.requestAnimationFrame(updatePointer);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || hero.dataset.peelState !== 'idle') return;
      const rect = face.getBoundingClientRect();
      pointerTarget = {
        x: clamp((event.clientX - (rect.left + rect.width / 2)) / rect.width, -1, 1) * 12,
        y: clamp((event.clientY - (rect.top + rect.height * 0.47)) / rect.height, -1, 1) * 10,
      };
      if (!pointerRaf) pointerRaf = window.requestAnimationFrame(updatePointer);
    };
    const resetPointer = () => { pointerTarget = { x: 0, y: 0 }; if (!pointerRaf) pointerRaf = window.requestAnimationFrame(updatePointer); };

    const updateProjectPointer = () => {
      pointerRaf = 0;
      projectCards.forEach((card) => {
        const id = card.dataset.projectId ?? '';
        const target = projectPointerTarget.get(id) ?? { x: 0, y: 0, scale: 1, rotate: 0, z: 1 };
        const current = projectPointer.get(id) ?? { x: 0, y: 0, scale: 1, rotate: 0 };
        current.x += (target.x - current.x) * 0.11;
        current.y += (target.y - current.y) * 0.11;
        current.scale += (target.scale - current.scale) * 0.11;
        current.rotate += (target.rotate - current.rotate) * 0.11;
        projectPointer.set(id, current);
        card.style.setProperty('--mag-x', `${current.x}px`);
        card.style.setProperty('--mag-y', `${current.y}px`);
        card.style.setProperty('--mag-scale', String(current.scale));
        card.style.setProperty('--mag-rotate', `${current.rotate}deg`);
        card.style.zIndex = String(target.z);
      });
      if (projectCards.some((card) => {
        const id = card.dataset.projectId ?? '';
        const target = projectPointerTarget.get(id) ?? { x: 0, y: 0, scale: 1, rotate: 0, z: 1 };
        const current = projectPointer.get(id)!;
        return Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1 || Math.abs(target.scale - current.scale) > 0.002;
      })) pointerRaf = window.requestAnimationFrame(updateProjectPointer);
    };
    const onProjectPointerMove = (event: PointerEvent) => {
      if (reduceMotion.matches || !projectStage || !projectCollage || event.pointerType === 'touch') return;
      const progress = Number(projectStage.dataset.progress ?? 0);
      if (progress < 0.45 || progress > 0.65) return;
      const pointerX = event.clientX;
      const pointerY = event.clientY;
      const active = projectCards.map((card) => {
        const rect = card.getBoundingClientRect();
        const dx = pointerX - (rect.left + rect.width / 2);
        const dy = pointerY - (rect.top + rect.height / 2);
        return { card, distance: Math.hypot(dx, dy), dx, dy };
      });
      const nearest = Math.min(...active.map((item) => item.distance));
      active.forEach(({ card, distance, dx, dy }) => {
        const id = card.dataset.projectId ?? '';
        const influence = Math.max(0, 1 - distance / 260);
        const outward = nearest < 230 && distance > nearest ? Math.min(1, (distance - nearest) / 260) : 0;
        projectPointerTarget.set(id, {
          x: Math.max(-16, Math.min(16, dx * 0.08 * influence)) + (dx > 0 ? outward * 3 : -outward * 3),
          y: Math.max(-16, Math.min(16, dy * 0.08 * influence)) + (dy > 0 ? outward * 3 : -outward * 3),
          scale: 1 + influence * 0.05,
          rotate: -((card.dataset.projectId === 'film' ? 0 : 1) * influence * 1.4),
          z: 20 + Math.round(influence * 20),
        });
      });
      if (!pointerRaf) pointerRaf = window.requestAnimationFrame(updateProjectPointer);
    };
    const resetProjectPointer = () => {
      projectCards.forEach((card) => projectPointerTarget.set(card.dataset.projectId ?? '', { x: 0, y: 0, scale: 1, rotate: 0, z: 1 }));
      if (!pointerRaf) pointerRaf = window.requestAnimationFrame(updateProjectPointer);
    };

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetPointer, { passive: true });
    projectCollage?.addEventListener('pointermove', onProjectPointerMove, { passive: true });
    projectCollage?.addEventListener('pointerleave', resetProjectPointer, { passive: true });
    if (!reduceMotion.matches) preload();
    else { framesReady = false; updateScroll(); }
    updateScroll();
    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
      projectCollage?.removeEventListener('pointermove', onProjectPointerMove);
      projectCollage?.removeEventListener('pointerleave', resetProjectPointer);
      if (raf) window.cancelAnimationFrame(raf);
      if (pointerRaf) window.cancelAnimationFrame(pointerRaf);
    };
  }, []);

  return (
    <main className="page-shell">
      <div className="design-canvas">
        <Layer number={1129} x={0} y={3525} width={1925} className="about-background" />

        <section className="hero-section" aria-labelledby="page-title">
          <h1 id="page-title" className="sr-only">苏越个人作品集</h1>
          <div className="hero-title-motion" style={box(30, -6, 1864)}>
            <Layer number={1127} x={0} y={0} width={1864} className="hero-wordmark" alt="SU YUE" />
          </div>

          <div className="hero-objects" aria-hidden="true">
            <Layer number={1126} x={510} y={285} width={542} className="object-film" />
            <Layer number={1123} x={675} y={362} width={440} className="object-board" />
            <Layer number={1125} x={897} y={263} width={584} className="object-panel" />
            <Layer number={1122} x={882} y={472} width={342} className="object-notebook" />
            <Layer number={1124} x={730} y={192} width={514} className="object-camera" />
          </div>
          <div className="hero-character-motion" aria-hidden="true">
            <img className="hero-face-normal" src="/assets/hero-face.png" alt="" />
            <img className="hero-peel-frame" src="/assets/hero-peel/frame-00025.png" alt="" decoding="async" />
          </div>
          <TextBox x={500} y={1565} width={925} className="hero-copy">
            <p><span>洞察</span>藏在褶皱里</p>
            <p><span>韧劲</span>磨在时间里</p>
            <p>保持敏感，保持追问</p>
          </TextBox>

          <div className="hero-projects-scroll-stage" style={{ top: `${(PROJECT_STAGE_TOP / DESIGN_HEIGHT) * 100}%` }} aria-label="项目缩略图拼贴滚动舞台">
            <div className="hero-projects-sticky">
              <div className="hero-projects-collage" aria-label="项目缩略图拼贴">
                <div className="hero-project-card hero-project-card--camera" data-project-id="camera"><img src={asset(1113)} alt="摄影项目" /></div>
                <div className="hero-project-card hero-project-card--phone" data-project-id="phone"><img src={asset(1117)} alt="产品界面项目" /></div>
                <div className="hero-project-card hero-project-card--film" data-project-id="film"><img src={asset(1112)} alt="影片项目" /></div>
                <div className="hero-project-card hero-project-card--whale" data-project-id="whale"><img src={asset(1115)} alt="蓝鲸名人堂项目" /></div>
                <div className="hero-project-card hero-project-card--yellow" data-project-id="yellow"><img src={asset(1116)} alt="内容运营项目" /></div>
                <div className="hero-project-card hero-project-card--beacon" data-project-id="beacon"><img src={asset(1114)} alt="Beacon Tower 项目" /></div>
              </div>
            </div>
          </div>

          <a className="pill hero-button" style={box(787, 3060, 350, 95)} href="#about">了解我</a>
        </section>

        <aside className="hero-motion-debug" aria-hidden="true">
          <div>Hero Progress: <strong data-debug="progress">0.00</strong></div>
          <div>Frame: <strong data-debug="frame">0 / 11</strong></div>
          <div>Title Y: <strong data-debug="title-y">0px</strong></div>
          <div>Character Y: <strong data-debug="character-y">0px</strong></div>
          <div>State: <strong data-debug="state">IDLE</strong></div>
        </aside>

        <Layer number={1108} x={-295} y={2956} width={2514} className="tear tear-one" />

        <section id="about" className="about-section" aria-labelledby="about-title">
          <TextBox x={660} y={4000} width={605} className="about-heading">
            <h2 id="about-title">关于我<br />一个女孩</h2>
          </TextBox>

          <Layer number={1106} x={516} y={4370} width={892} className="about-head" alt="苏越侧看头像" />
          <TextBox x={650} y={4780} width={625} className="curiosity-copy">
            <p>一个对世界</p>
            <p><span>保持好奇</span>的人</p>
          </TextBox>
          <Layer number={1105} x={940} y={4973} width={469} className="hand" alt="手部剪纸贴图" />

          <TextBox x={425} y={5485} width={1100} className="bio-row">
            <h3>苏越</h3>
            <div className="bio-divider" aria-hidden="true" />
            <p>网络与新媒体专业背景。作为内容策划、视觉传播执行者，我从需求梳理、人物研究与创意文案出发，继续推进到脚本、分镜、视频和页面交付。</p>
          </TextBox>

          <a className="pill about-button" style={box(787, 5880, 350, 112)} href="#experience">了解我更多</a>

          <TextBox x={610} y={6125} width={705} className="experience-heading">
            <h2 id="experience">这些年<br /><span>我都做了什么？</span></h2>
          </TextBox>

          <div className="experience-list" style={box(205, 6500, 1515, 710)}>
            {experience.map((item) => (
              <article className="experience-item" key={item.years}>
                <p className="experience-years">{item.years}</p>
                <div className="experience-role">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <p className="experience-copy">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <Layer number={1109} x={-277} y={6589} width={2479} className="tear tear-two" />

        <section id="works" className="works-section" aria-labelledby="works-title">
          <TextBox x={380} y={7640} width={1165} className="works-intro">
            <h2 id="works-title">从内容到产品，从想法到画面。<br />每一件事都在回答同一个问题：<br /><span>用户在想什么？</span></h2>
          </TextBox>
          <TextBox x={680} y={8130} width={565} className="works-lead">
            <p>我认真对待过的一些事<br />想让你也看看</p>
          </TextBox>

          <Layer number={1095} x={75} y={8390} width={261} className="works-mark" alt="我的作品 MY WORKS" />
          <div className="works-cards" aria-label="作品类型">
            <Layer number={1093} x={104} y={8455} width={1801} alt="01 品牌影片策划" />
            <Layer number={1092} x={104} y={8455} width={1801} alt="02 品牌内容运营" />
            <Layer number={1091} x={104} y={8455} width={1801} alt="03 项目方案撰写" />
            <Layer number={1090} x={104} y={8455} width={1801} alt="04 视觉影像制作" />
          </div>
          <a className="pill works-button" style={box(715, 9500, 494, 95)} href="#site-footer">点击了解项目作品</a>
        </section>

        <footer id="site-footer" className="site-footer">
          <Layer number={1088} x={51} y={9657} width={229} className="footer-wordmark" alt="SU YUE" />
          <div className="footer-actions" style={box(1640, 9785, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#site-footer">联系我</a>
          </div>

          <Layer number={1089} x={-610} y={9530} width={1800} className="footer-face" alt="苏越倾斜肖像" />
          <div className="footer-bubble" style={box(390, 9880, 313, 164)} aria-hidden="true">
            <Layer number={1084} x={390} y={9880} width={313} />
            <span>这么快就走了？</span>
          </div>

          <nav className="footer-nav" style={box(890, 9870, 900, 710)} aria-label="页尾导航">
            <a href="#page-title"><span>01</span>主页</a>
            <a href="#about"><span>02</span>关于我</a>
            <a href="#experience"><span>03</span>经历</a>
            <a href="#works"><span>04</span>作品集</a>
            <a href="#site-footer"><span>05</span>联系我</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
