import type { CSSProperties, Metadata } from 'next';
import ModuleDirectory from '../components/module-directory';

const DESIGN_WIDTH = 1921;
const DESIGN_HEIGHT = 6500;

export const metadata: Metadata = {
  title: '项目方案撰写｜SU YUE',
  description: '苏越的项目方案撰写案例。',
  openGraph: { images: [] },
  twitter: { images: [] },
};

function box(x: number, y: number, width: number, height?: number): CSSProperties {
  return {
    left: `${(x / DESIGN_WIDTH) * 100}%`,
    top: `${(y / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    ...(height ? { height: `${(height / DESIGN_HEIGHT) * 100}%` } : {}),
  };
}

function image(number: number) {
  return `/assets/project-proposal/资源 ${number}.png`;
}

function Layer({ number, x, y, width, className = '', alt = '' }: {
  number: number;
  x: number;
  y: number;
  width: number;
  className?: string;
  alt?: string;
}) {
  return <img className={`proposal-layer ${className}`} style={box(x, y, width)} src={image(number)} alt={alt} />;
}

export default function ProjectProposalWritingPage() {
  return (
    <main className="proposal-shell">
      <div className="proposal-canvas">
        <header className="proposal-header">
          <a className="proposal-brand" href="/" aria-label="返回主页">SUYUE</a>
          <div className="proposal-header-actions">
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>
        </header>

        <section className="proposal-hero" aria-labelledby="proposal-title">
          <h1 id="proposal-title" className="sr-only">项目方案撰写</h1>
          <Layer number={1009} x={543} y={311} width={761} className="proposal-title-top" alt="项目" />
          <Layer number={977} x={451} y={271} width={970} className="proposal-hero-object" alt="项目方案笔记本三维图标" />
          <Layer number={976} x={163} y={726} width={1523} className="proposal-title-bottom" alt="方案撰写" />
          <Layer number={988} x={-345} y={800} width={2581} className="proposal-tear" alt="撕纸分隔装饰" />
        </section>

        <section className="proposal-caseboards" aria-label="项目方案撰写案例">
          <Layer number={970} x={320} y={2125} width={1281} alt="上海糖酒集团政务宣传片策划案" />

          <Layer number={969} x={320} y={3000} width={1281} className="proposal-second-board" alt="" />
          <Layer number={968} x={745} y={3048} width={431} className="proposal-second-title" alt="闵联40周年访谈纪录片" />
          <Layer number={967} x={884} y={3135} width={153} className="proposal-second-label" alt="政务宣传片，策划案撰写" />
          <Layer number={966} x={400} y={3195} width={1125} className="proposal-second-content" alt="闵联40周年访谈纪录片策划展板" />
        </section>

        <ModuleDirectory style={box(60, 3820, 1801, 1220)} />

        <footer id="contact" className="proposal-footer">
          <Layer number={1007} x={81} y={5270} width={229} className="proposal-footer-wordmark" alt="SU YUE" />
          <div className="proposal-footer-actions" style={box(1640, 5272, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>

          <Layer number={1008} x={-610} y={5140} width={1800} className="proposal-footer-face" alt="苏越肖像" />
          <Layer number={1005} x={320} y={5360} width={313} className="proposal-footer-bubble" />
          <Layer number={1004} x={355} y={5392} width={239} className="proposal-footer-bubble-copy" alt="这么快就走了？" />

          <nav className="proposal-footer-nav" style={box(710, 5350, 1080, 925)} aria-label="页尾导航">
            <a href="/"><span>01</span>主页</a>
            <a href="/#about-section"><span>02</span>关于我</a>
            <a href="/#experience-section"><span>03</span>经历</a>
            <a href="/#works-section"><span>04</span>作品集</a>
            <a href="/#home-top"><span>05</span>联系我</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
