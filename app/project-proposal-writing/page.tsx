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
      <link rel="stylesheet" href="/animations/footer-directory.css" />
      <script src="/animations/footer-sticker.js" defer />
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

        <footer id="contact" className="proposal-footer footer-sticker" data-footer-sticker>
          <Layer number={1007} x={81} y={5270} width={229} className="proposal-footer-wordmark" alt="SU YUE" />
          <div className="proposal-footer-actions" style={box(1640, 5272, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>

          <div className="footer-sticker__reveal" style={{ '--sticker-clip-start': 5.4 } as CSSProperties} aria-hidden="true">
            <Layer number={1008} x={-610} y={5140} width={1800} className="proposal-footer-face" alt="苏越肖像" />
            <Layer number={1005} x={320} y={5360} width={313} className="proposal-footer-bubble" />
            <Layer number={1004} x={355} y={5392} width={239} className="proposal-footer-bubble-copy" alt="这么快就走了？" />
          </div>

          <nav className="proposal-footer-nav footer-directory" style={box(710, 5350, 1080, 925)} aria-label="页尾导航">
            <a className="footer-directory__item" style={{ '--asset-left': '38%', '--asset-top': '-90%', '--asset-width': '42%', '--asset-from-x': '0px', '--asset-from-y': '-28px', '--asset-rotation': '-2deg', '--asset-duration': '320ms', '--float-duration': '2.4s' } as CSSProperties} href="/"><img className="footer-directory__background" src="/assets/footer-directory/资源 42.png" alt="" /><span className="footer-directory__number">01</span><span className="footer-directory__label">主页</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 40.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '40%', '--asset-top': '-70%', '--asset-width': '48%', '--asset-from-x': '36px', '--asset-from-y': '0px', '--asset-rotation': '2deg', '--asset-duration': '380ms', '--float-duration': '2.8s' } as CSSProperties} href="/#about-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 43.png" alt="" /><span className="footer-directory__number">02</span><span className="footer-directory__label">关于我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 34.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '43%', '--asset-top': '-55%', '--asset-width': '42%', '--asset-from-x': '28px', '--asset-from-y': '18px', '--asset-rotation': '-2deg', '--asset-duration': '340ms', '--float-duration': '2.3s' } as CSSProperties} href="/#experience-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 44.png" alt="" /><span className="footer-directory__number">03</span><span className="footer-directory__label">经历</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 33.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '46%', '--asset-top': '-60%', '--asset-width': '34%', '--asset-from-x': '0px', '--asset-from-y': '30px', '--asset-rotation': '2deg', '--asset-duration': '370ms', '--float-duration': '2.7s' } as CSSProperties} href="/#works-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 45.png" alt="" /><span className="footer-directory__number">04</span><span className="footer-directory__label">作品集</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 32.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '44%', '--asset-top': '-65%', '--asset-width': '34%', '--asset-from-x': '24px', '--asset-from-y': '-18px', '--asset-rotation': '-2deg', '--asset-duration': '350ms', '--float-duration': '2.5s' } as CSSProperties} href="/#home-top"><img className="footer-directory__background" src="/assets/footer-directory/资源 46.png" alt="" /><span className="footer-directory__number">05</span><span className="footer-directory__label">联系我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 31.png" alt="" /></span></a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
