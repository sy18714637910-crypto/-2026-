import type { CSSProperties, Metadata } from 'next';

const DESIGN_WIDTH = 1921;
const DESIGN_HEIGHT = 15182;

export const metadata: Metadata = {
  title: '产品内容运营｜SU YUE',
  description: '苏越的产品内容运营项目案例。',
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
  return `/assets/product-content/资源 ${number}.png`;
}

function Layer({ number, x, y, width, className = '', alt = '' }: {
  number: number;
  x: number;
  y: number;
  width: number;
  className?: string;
  alt?: string;
}) {
  return <img className={`product-layer ${className}`} style={box(x, y, width)} src={image(number)} alt={alt} />;
}

export default function ProductContentOperationsPage() {
  return (
    <main className="product-detail-shell">
      <div className="product-detail-canvas">
        <header className="product-detail-header">
          <a className="product-brand" href="/" aria-label="返回主页">SUYUE</a>
          <div className="product-header-actions">
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>
        </header>

        <section className="product-detail-hero" aria-labelledby="product-content-title">
          <h1 id="product-content-title" className="sr-only">产品内容运营</h1>
          <Layer number={1036} x={540} y={240} width={762} className="product-title-top" alt="产品" />
          <Layer number={1013} x={327} y={147} width={1118} className="product-hero-object" alt="内容创作三维图标" />
          <Layer number={1012} x={160} y={655} width={1522} className="product-title-bottom" alt="内容运营" />
          <Layer number={1014} x={-345} y={800} width={2581} className="product-detail-tear" alt="撕纸分隔装饰" />
        </section>

        <section className="product-caseboards" aria-label="产品内容运营项目案例">
          <Layer number={984} x={300} y={2125} width={1286} alt="森愈品牌内容体系与短视频账号搭建" />
          <a className="product-case-button" style={box(785, 3790, 350, 96)} href="#senyu-account">观看账号</a>

          <Layer number={985} x={292} y={4028} width={1285} alt="森愈 AIGC 产品宣传片" />
          <a className="product-case-button" style={box(785, 4915, 350, 96)} href="#senyu-film">观看宣传片</a>

          <Layer number={986} x={294} y={5137} width={1281} alt="森愈负氧离子释放仪详情页设计" />
          <Layer number={979} x={331} y={6149} width={1282} alt="吉林大米商城项目设计" />
          <Layer number={978} x={341} y={11990} width={1288} alt="日语学习账号内容运营复盘" />
        </section>

        <footer id="contact" className="product-detail-footer">
          <Layer number={1033} x={50} y={13810} width={229} className="product-footer-wordmark" alt="SU YUE" />
          <div className="product-footer-actions" style={box(1640, 13815, 235, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>

          <Layer number={1034} x={-610} y={13860} width={1800} className="product-footer-face" alt="苏越肖像" />
          <Layer number={1031} x={320} y={14030} width={313} className="product-footer-bubble" />
          <Layer number={1030} x={355} y={14062} width={239} className="product-footer-bubble-copy" alt="这么快就走了？" />

          <nav className="product-footer-nav" style={box(710, 13960, 1080, 925)} aria-label="页尾导航">
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
