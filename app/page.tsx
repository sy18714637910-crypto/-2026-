'use client';

import { useEffect, useRef, useState } from 'react';

const workItems = [
  { title: '品牌影片策划', detail: '人物研究 · 创意概念 · 文案脚本 · 分镜策划', className: 'project-brand' },
  { title: '产品内容运营', detail: '内容体系 · 账号运营 · 图文与短视频', className: 'project-content' },
  { title: '项目方案撰写', detail: '需求拆解 · 策略结构 · 完整提案', className: 'project-plan' },
  { title: '视觉影像制作', detail: 'AIGC · 页面视觉 · 视频拍摄与剪辑', className: 'project-visual' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeWork, setActiveWork] = useState<(typeof workItems)[number] | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(false), 1250);
    const root = document.documentElement;
    let ticking = false;

    const updateScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      root.style.setProperty('--scroll-progress', String(progress));
      root.style.setProperty('--parallax-shift', `${Math.min(window.scrollY * .035, 110)}px`);
      setHeaderVisible(window.scrollY > window.innerHeight * .45);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-revealed');
      });
    }, { threshold: .12, rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));

    const onPointerMove = (event: PointerEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursorRef.current?.classList.toggle('is-active', Boolean(target.closest('a,button')));
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    return () => {
      window.clearTimeout(introTimer);
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', introVisible || menuOpen);
    return () => document.body.classList.remove('is-locked');
  }, [introVisible, menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="effect-page">
      <div className={`intro-screen ${introVisible ? '' : 'is-finished'}`} aria-hidden={!introVisible}>
        <div className="intro-word" aria-label="SU YUE"><span>SU</span><span>YUE</span></div>
        <div className="intro-line"><i /></div>
        <p>保持敏感，保持追问</p>
      </div>

      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true" />
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />

      <header className={`floating-header ${headerVisible || menuOpen ? 'is-visible' : ''}`}>
        <a className="floating-brand" href="#top">SU YUE</a>
        <div className="floating-actions">
          <button className="round-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '关闭菜单' : '打开菜单'} aria-expanded={menuOpen}>
            <span /><span />
          </button>
          <a className="contact-button" href="#contact">联系我</a>
        </div>
      </header>

      <div className={`full-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-number">MENU / 2026</div>
        <nav>
          <a href="#top" onClick={closeMenu}><small>01</small><span>主页</span></a>
          <a href="#about" onClick={closeMenu}><small>02</small><span>关于我</span></a>
          <a href="#experience" onClick={closeMenu}><small>03</small><span>经历</span></a>
          <a href="#works" onClick={closeMenu}><small>04</small><span>作品集</span></a>
          <a href="#contact" onClick={closeMenu}><small>05</small><span>联系我</span></a>
        </nav>
      </div>

      <div className="effect-canvas">
        <img className="effect-image" src="/effects/home.webp" alt="苏越品牌内容策划与视觉传播个人作品集首页" />
        <div className="hero-light" aria-hidden="true" />

        <a className="hotspot about-link magnetic" href="#about" aria-label="了解苏越" />
        <a className="hotspot more-link magnetic" href="#experience" aria-label="了解苏越更多" />
        <a className="hotspot works-link magnetic" href="#works" aria-label="查看项目作品" />

        <div className="reveal-curtain curtain-about" data-reveal aria-hidden="true" />
        <div className="reveal-curtain curtain-statement" data-reveal aria-hidden="true" />
        <div className="reveal-curtain curtain-footer" data-reveal aria-hidden="true" />

        <span className="page-anchor anchor-about" id="about" />
        <span className="page-anchor anchor-experience" id="experience" />
        <span className="page-anchor anchor-works" id="works" />
        <span className="page-anchor anchor-contact" id="contact" />

        <div className="project-hotspots" aria-label="作品分类">
          {workItems.map((work) => (
            <button key={work.title} className={`project-hit ${work.className}`} onClick={() => setActiveWork(work)} aria-label={`查看${work.title}`}>
              <span>{work.title}<b>↗</b></span>
            </button>
          ))}
        </div>

        <nav className="footer-hotspots" aria-label="页脚导航">
          <a className="nav-home" href="#top" aria-label="主页" />
          <a className="nav-about" href="#about" aria-label="关于我" />
          <a className="nav-experience" href="#experience" aria-label="经历" />
          <a className="nav-works" href="#works" aria-label="作品集" />
          <a className="nav-contact" href="#contact" aria-label="联系我" />
        </nav>
        <span id="top" className="page-anchor anchor-top" />
      </div>

      <aside className={`work-drawer ${activeWork ? 'is-open' : ''}`} aria-live="polite">
        {activeWork && <><small>SELECTED WORK</small><strong>{activeWork.title}</strong><p>{activeWork.detail}</p><button onClick={() => setActiveWork(null)} aria-label="关闭作品信息">×</button></>}
      </aside>
    </main>
  );
}
