import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import ModuleDirectory from '../components/module-directory';

const DESIGN_WIDTH = 1921;
const DESIGN_HEIGHT = 14750;

export const metadata: Metadata = {
  title: '品牌影片策划｜SU YUE',
  description: '苏越的品牌影片策划项目案例。',
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
  return `/assets/brand-film/资源 ${number}.png`;
}

function Layer({ number, x, y, width, className = '', alt = '', id }: {
  number: number;
  x: number;
  y: number;
  width: number;
  className?: string;
  alt?: string;
  id?: string;
}) {
  return <img id={id} className={`brand-film-layer ${className}`} style={box(x, y, width)} src={image(number)} alt={alt} />;
}

export default function BrandFilmPlanningPage() {
  return (
    <main className="brand-film-shell">
      <link rel="stylesheet" href="/animations/footer-directory.css" />
      <script src="/animations/footer-sticker.js" defer />
      <div className="brand-film-canvas">
        <header className="brand-film-header">
          <a className="brand-film-brand" href="/" aria-label="返回主页">SUYUE</a>
          <div className="brand-film-header-actions">
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="/contact">联系我</a>
          </div>
        </header>

        <section className="brand-film-hero" aria-labelledby="brand-film-title">
          <h1 id="brand-film-title" className="sr-only">品牌影片策划</h1>
          <Layer number={1065} x={582} y={225} width={761} className="brand-film-title-top" alt="品牌" />
          <Layer number={1064} x={339} y={3} width={1284} className="brand-film-hero-object" alt="品牌内容网页三维图标" />
          <Layer number={1063} x={199} y={642} width={1523} className="brand-film-title-bottom" alt="影片策划" />
          <Layer number={1035} x={-345} y={800} width={2581} className="brand-film-tear" alt="撕纸分隔装饰" />
        </section>

        <section className="brand-film-caseboards" aria-label="品牌影片策划项目案例">
          <Layer id="blue-whale" number={1062} x={268} y={2110} width={1363} alt="蓝鲸名人堂品牌影片策划案" />
          <a className="brand-film-case-button" style={box(785, 8030, 350, 96)} href="/brand-film-video">观看视频</a>

          <Layer id="civil-defense" number={1061} x={317} y={8417} width={1265} alt="上海民防战地救护系列科普视频策划案" />
          <a className="brand-film-case-button" style={box(785, 11733, 350, 96)} href="/maisheng-video">观看视频</a>
        </section>

        <ModuleDirectory style={box(60, 12000, 1801, 1220)} />

        <footer id="contact" className="brand-film-footer footer-sticker" data-footer-sticker>
          <Layer number={1033} x={50} y={13600} width={229} className="brand-film-footer-wordmark" alt="SU YUE" />
          <div className="brand-film-footer-actions" style={box(1640, 13605, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="/contact">联系我</a>
          </div>

          <div className="footer-sticker__reveal" style={{ '--sticker-clip-start': 5.4 } as CSSProperties} aria-hidden="true">
            <Layer number={1034} x={-610} y={13650} width={1800} className="brand-film-footer-face" alt="苏越肖像" />
            <Layer number={1031} x={320} y={13820} width={313} className="brand-film-footer-bubble" />
            <Layer number={1030} x={355} y={13852} width={239} className="brand-film-footer-bubble-copy" alt="这么快就走了？" />
          </div>

          <nav className="brand-film-footer-nav footer-directory" style={box(710, 13750, 1080, 925)} aria-label="页尾导航">
            <a className="footer-directory__item" style={{ '--asset-left': '38%', '--asset-top': '-90%', '--asset-width': '42%', '--asset-from-x': '0px', '--asset-from-y': '-28px', '--asset-rotation': '-2deg', '--asset-duration': '320ms', '--float-duration': '2.4s' } as CSSProperties} href="/"><img className="footer-directory__background" src="/assets/footer-directory/资源 42.png" alt="" /><span className="footer-directory__number">01</span><span className="footer-directory__label">主页</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 40.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '40%', '--asset-top': '-70%', '--asset-width': '48%', '--asset-from-x': '36px', '--asset-from-y': '0px', '--asset-rotation': '2deg', '--asset-duration': '380ms', '--float-duration': '2.8s' } as CSSProperties} href="/#about-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 43.png" alt="" /><span className="footer-directory__number">02</span><span className="footer-directory__label">关于我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 34.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '43%', '--asset-top': '-55%', '--asset-width': '42%', '--asset-from-x': '28px', '--asset-from-y': '18px', '--asset-rotation': '-2deg', '--asset-duration': '340ms', '--float-duration': '2.3s' } as CSSProperties} href="/#experience-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 44.png" alt="" /><span className="footer-directory__number">03</span><span className="footer-directory__label">经历</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 33.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '46%', '--asset-top': '-60%', '--asset-width': '34%', '--asset-from-x': '0px', '--asset-from-y': '30px', '--asset-rotation': '2deg', '--asset-duration': '370ms', '--float-duration': '2.7s' } as CSSProperties} href="/#works-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 45.png" alt="" /><span className="footer-directory__number">04</span><span className="footer-directory__label">作品集</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 32.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '44%', '--asset-top': '-65%', '--asset-width': '34%', '--asset-from-x': '24px', '--asset-from-y': '-18px', '--asset-rotation': '-2deg', '--asset-duration': '350ms', '--float-duration': '2.5s' } as CSSProperties} href="/contact"><img className="footer-directory__background" src="/assets/footer-directory/资源 46.png" alt="" /><span className="footer-directory__number">05</span><span className="footer-directory__label">联系我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 31.png" alt="" /></span></a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
