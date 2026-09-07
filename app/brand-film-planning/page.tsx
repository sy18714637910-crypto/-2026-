import type { CSSProperties, Metadata } from 'next';
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
      <div className="brand-film-canvas">
        <header className="brand-film-header">
          <a className="brand-film-brand" href="/" aria-label="返回主页">SUYUE</a>
          <div className="brand-film-header-actions">
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
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
          <a className="brand-film-case-button" style={box(785, 8030, 350, 96)} href="#blue-whale">观看视频</a>

          <Layer id="civil-defense" number={1061} x={317} y={8417} width={1265} alt="上海民防战地救护系列科普视频策划案" />
          <a className="brand-film-case-button" style={box(785, 11733, 350, 96)} href="#civil-defense">观看视频</a>
        </section>

        <ModuleDirectory style={box(60, 12000, 1801, 1220)} />

        <footer id="contact" className="brand-film-footer">
          <Layer number={1033} x={50} y={13600} width={229} className="brand-film-footer-wordmark" alt="SU YUE" />
          <div className="brand-film-footer-actions" style={box(1640, 13605, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>

          <Layer number={1034} x={-610} y={13650} width={1800} className="brand-film-footer-face" alt="苏越肖像" />
          <Layer number={1031} x={320} y={13820} width={313} className="brand-film-footer-bubble" />
          <Layer number={1030} x={355} y={13852} width={239} className="brand-film-footer-bubble-copy" alt="这么快就走了？" />

          <nav className="brand-film-footer-nav" style={box(710, 13750, 1080, 925)} aria-label="页尾导航">
            <a href="/"><span>01</span>主页</a>
            <a href="/#about"><span>02</span>关于我</a>
            <a href="/#experience"><span>03</span>经历</a>
            <a href="/#works"><span>04</span>作品集</a>
            <a href="#contact"><span>05</span>联系我</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
