import type { CSSProperties, Metadata } from 'next';
import ModuleDirectory from '../components/module-directory';

const DESIGN_WIDTH = 1921;
const PART_ONE_HEIGHT = 15951;
const PART_TWO_HEIGHT = 6200;

export const metadata: Metadata = {
  title: '视觉影像｜SU YUE',
  description: '苏越的视觉影像与视频制作项目案例。',
  openGraph: { images: [] },
  twitter: { images: [] },
};

function box(x: number, y: number, width: number, canvasHeight: number, height?: number): CSSProperties {
  return {
    left: `${(x / DESIGN_WIDTH) * 100}%`,
    top: `${(y / canvasHeight) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    ...(height ? { height: `${(height / canvasHeight) * 100}%` } : {}),
  };
}

function image(number: number) {
  return `/assets/visual-imagery/资源 ${number}.png`;
}

function Layer({ number, x, y, width, canvasHeight, className = '', alt = '' }: {
  number: number;
  x: number;
  y: number;
  width: number;
  canvasHeight: number;
  className?: string;
  alt?: string;
}) {
  return <img className={`visual-layer ${className}`} style={box(x, y, width, canvasHeight)} src={image(number)} alt={alt} />;
}

function WatchButton({ y, canvasHeight, href }: { y: number; canvasHeight: number; href: string }) {
  return <a className="visual-watch-button" style={box(785, y, 350, canvasHeight, 96)} href={href}>观看视频</a>;
}

export default function VisualImageryPage() {
  return (
    <main className="visual-shell">
      <section className="visual-canvas visual-part-one" aria-labelledby="visual-imagery-title">
        <header className="visual-header">
          <a className="visual-brand" href="/" aria-label="返回主页">SUYUE</a>
          <div className="visual-header-actions">
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>
        </header>

        <h1 id="visual-imagery-title" className="sr-only">视觉影像</h1>
        <Layer number={973} x={713} y={292} width={762} canvasHeight={PART_ONE_HEIGHT} className="visual-title-top" alt="视觉" />
        <Layer number={971} x={271} y={706} width={761} canvasHeight={PART_ONE_HEIGHT} className="visual-title-bottom" alt="影像" />
        <Layer number={965} x={650} y={316} width={1190} canvasHeight={PART_ONE_HEIGHT} className="visual-hero-object" alt="视频胶片三维图标" />
        <Layer number={972} x={-345} y={800} width={2581} canvasHeight={PART_ONE_HEIGHT} className="visual-tear" alt="撕纸分隔装饰" />

        <section className="visual-caseboards" aria-label="视觉影像项目案例第一部分">
          <Layer number={1131} x={320} y={2260} width={1284} canvasHeight={PART_ONE_HEIGHT} alt="烽火台 AIGC 视觉影像策划" />
          <Layer number={962} x={301} y={9375} width={1313} canvasHeight={PART_ONE_HEIGHT} alt="火药东方传奇 AIGC 项目" />
          <Layer number={960} x={320} y={10300} width={1281} canvasHeight={PART_ONE_HEIGHT} alt="海报与展板视觉设计" />
          <Layer number={961} x={54} y={11290} width={1788} canvasHeight={PART_ONE_HEIGHT} alt="黎族姑娘海南文创设计" />
          <Layer number={957} x={320} y={13593} width={1281} canvasHeight={PART_ONE_HEIGHT} alt="剪辑人生视觉影像项目" />
          <WatchButton y={14510} canvasHeight={PART_ONE_HEIGHT} href="https://www.suyueportfolio.me/视觉影像补充视频/index.html#editing-life" />
          <Layer number={956} x={320} y={14693} width={1281} canvasHeight={PART_ONE_HEIGHT} alt="婚礼日视觉影像项目" />
          <WatchButton y={15571} canvasHeight={PART_ONE_HEIGHT} href="https://www.suyueportfolio.me/视觉影像补充视频/index.html#wedding-day" />
        </section>
      </section>

      <section className="visual-canvas visual-part-two" aria-label="视觉影像项目案例第二部分">
        <section className="visual-caseboards" aria-label="视觉影像项目案例第二部分内容">
          <Layer number={955} x={320} y={80} width={1281} canvasHeight={PART_TWO_HEIGHT} alt="强风吹拂混剪作品" />
          <WatchButton y={1044} canvasHeight={PART_TWO_HEIGHT} href="https://www.suyueportfolio.me/视觉影像补充视频/index.html#strong-wind" />
          <Layer number={950} x={320} y={1312} width={1287} canvasHeight={PART_TWO_HEIGHT} alt="圆月 MG 动画作品" />
          <WatchButton y={2242} canvasHeight={PART_TWO_HEIGHT} href="https://www.suyueportfolio.me/视觉影像补充视频/index.html#full-moon" />
          <Layer number={958} x={320} y={2527} width={1281} canvasHeight={PART_TWO_HEIGHT} alt="移动端页面视觉设计" />
        </section>

        <ModuleDirectory style={box(60, 3450, 1801, PART_TWO_HEIGHT, 1220)} />

        <footer id="contact" className="visual-footer">
          <Layer number={948} x={48} y={5025} width={226} canvasHeight={PART_TWO_HEIGHT} className="visual-footer-wordmark" alt="SU YUE" />
          <div className="visual-footer-actions" style={box(1640, 5027, 235, PART_TWO_HEIGHT, 65)}>
            <button type="button" aria-label="打开导航菜单">≡</button>
            <a href="#contact">联系我</a>
          </div>

          <Layer number={949} x={-610} y={4890} width={1801} canvasHeight={PART_TWO_HEIGHT} className="visual-footer-face" alt="苏越肖像" />
          <Layer number={946} x={320} y={5110} width={313} canvasHeight={PART_TWO_HEIGHT} className="visual-footer-bubble" />
          <Layer number={945} x={355} y={5142} width={239} canvasHeight={PART_TWO_HEIGHT} className="visual-footer-bubble-copy" alt="这么快就走了？" />

          <nav className="visual-footer-nav" style={box(710, 5100, 1080, PART_TWO_HEIGHT, 925)} aria-label="页尾导航">
            <a href="/"><span>01</span>主页</a>
            <a href="/#about-section"><span>02</span>关于我</a>
            <a href="/#experience-section"><span>03</span>经历</a>
            <a href="/#works-section"><span>04</span>作品集</a>
            <a href="/#home-top"><span>05</span>联系我</a>
          </nav>
        </footer>
      </section>
    </main>
  );
}
