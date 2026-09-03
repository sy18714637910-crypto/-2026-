'use client';

import { useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const DESIGN_WIDTH = 1925;
const DESIGN_HEIGHT = 10755;

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
    if (!hero || !face || !sequence || !titleMotion) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frameUrls = Array.from({ length: 12 }, (_, index) =>
      `/assets/hero-peel/frame-${String(index + 25).padStart(5, '0')}.png`,
    );
    let framesReady = false;
    let currentFrame = -1;
    let raf = 0;
    let pointerRaf = 0;
    let pointerTarget = { x: 0, y: 0 };
    let pointer = { x: 0, y: 0 };

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
      const animationDistance = window.innerWidth <= 767 ? 520 : 680;
      const progress = clamp(window.scrollY / animationDistance);
      const peeling = framesReady && progress > 0;
      hero.dataset.peelState = peeling ? (progress >= 1 ? 'scrolled' : 'peeling') : 'idle';
      titleMotion.style.setProperty('--hero-title-scroll-y', `${reduceMotion.matches ? 0 : -70 * progress}px`);
      hero.style.setProperty('--hero-character-scroll-y', `${reduceMotion.matches ? 0 : -28 * progress}px`);
      sequence.style.opacity = peeling ? '1' : '0';
      face.style.opacity = peeling ? '0' : '1';
      if (peeling) {
        const frameIndex = Math.round(progress * (frameUrls.length - 1));
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          sequence.src = frameUrls[frameIndex];
          sequence.dataset.frameIndex = String(frameIndex);
        }
      } else {
        currentFrame = -1;
      }
      face.style.setProperty('--pointer-x', `${pointer.x}px`);
      face.style.setProperty('--pointer-y', `${pointer.y}px`);
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

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate, { passive: true });
    hero.addEventListener('pointermove', onPointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetPointer, { passive: true });
    if (!reduceMotion.matches) preload();
    else { framesReady = false; updateScroll(); }
    updateScroll();
    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
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

          <div className="hero-projects" aria-label="项目缩略图拼贴">
            <Layer number={1113} x={606} y={2165} width={341} alt="摄影项目" />
            <Layer number={1117} x={656} y={2383} width={145} alt="产品界面项目" />
            <Layer number={1112} x={742} y={2227} width={600} alt="影片项目" />
            <Layer number={1115} x={742} y={2547} width={232} alt="蓝鲸名人堂项目" />
            <Layer number={1116} x={1125} y={2341} width={274} alt="内容运营项目" />
            <Layer number={1114} x={1041} y={2547} width={300} alt="Beacon Tower 项目" />
          </div>

          <a className="pill hero-button" style={box(787, 3060, 350, 95)} href="#about">了解我</a>
        </section>

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
