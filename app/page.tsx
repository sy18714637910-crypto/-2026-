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

function WorkCard({ number, x, y, width, href, label, layer }: {
  number: number;
  x: number;
  y: number;
  width: number;
  href: string;
  label: string;
  layer: number;
}) {
  return (
    <a className="work-card" style={{ ...box(x, y, width), '--card-layer': layer } as CSSProperties} href={href} aria-label={`查看${label}作品`}>
      <img src={asset(number)} alt={label} />
    </a>
  );
}

const experience = [
  {
    years: '2025-2026',
    role: '产品运营',
    company: '上海心图云医疗科技发展有限公司',
    copy: '围绕“森愈负氧离子仪”完成抖音、视频号内容规划与宣传短视频制作，独立交付京东详情页和“禾育记”大米商城小程序 UI，并建立标准化宣传物料库支持账号冷启动。',
  },
  {
    years: '2024-2025',
    role: '影片策划',
    company: '上海挪移塔文化传播有限公司',
    copy: '参与太平洋保险、中国农业银行、上海民防等项目，完成创意方案、提案 PPT、执行方案、影片文案及分镜设计，并用 AI 生成场景概念图辅助提案沟通。',
  },
  {
    years: '2021-2023',
    role: '内容运营 / 视频制作',
    company: '网易 · 字节跳动 · 花猫影像',
    copy: '参与商业婚礼视频拍摄与后期剪辑，并在西瓜视频、网易青年声浪计划中累计发评 2000+、弹幕 3000+、覆盖作者 300+、获回复 400+，2 个月跟帖 360+、单条热点评论获赞 1800+，评论区活动获第一名。',
  },
];

export default function Home() {
  return (
    <main id="home-top" className="page-shell">
      <link rel="stylesheet" href="/animations/hero-intro.css" />
      <link rel="stylesheet" href="/animations/footer-directory.css" />
      <script src="/animations/hero-intro.js" defer />
      <script src="/animations/footer-sticker.js" defer />
      <div className="design-canvas">
        <Layer number={1129} x={0} y={3525} width={1925} className="about-background" />
        <section className="hero-section" aria-labelledby="page-title">
          <h1 id="page-title" className="sr-only">苏越个人作品集</h1>
          <Layer number={1127} x={30} y={-6} width={1864} className="hero-wordmark" alt="SU YUE" />
          <div className="hero-objects" aria-hidden="true">
            <Layer number={1126} x={510} y={285} width={542} className="object-film" />
            <Layer number={1123} x={675} y={362} width={440} className="object-board" />
            <Layer number={1125} x={897} y={263} width={584} className="object-panel" />
            <Layer number={1122} x={882} y={472} width={342} className="object-notebook" />
            <Layer number={1124} x={730} y={192} width={514} className="object-camera" />
          </div>
          <Layer number={1121} x={212} y={284} width={1502} className="hero-face" alt="苏越正面肖像" />
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
          <a className="pill hero-button" style={box(787, 3060, 350, 95)} href="#about-title">了解我</a>
        </section>

        <Layer number={1108} x={-295} y={2956} width={2514} className="tear tear-one" />
        <section className="about-section" aria-labelledby="about-title">
          <TextBox x={660} y={4000} width={605} className="about-heading">
            <h2 id="about-title">关于我<br />一个女孩</h2>
          </TextBox>
          <Layer number={1106} x={516} y={4370} width={892} className="about-head" alt="苏越侧看头像" />
          <TextBox x={650} y={4780} width={625} className="curiosity-copy">
            <p>一个对世界</p><p><span>保持好奇</span>的人</p>
          </TextBox>
          <Layer number={1105} x={940} y={4973} width={469} className="hand" alt="手部剪纸贴图" />
          <TextBox x={425} y={5485} width={1100} className="bio-row">
            <h3>苏越</h3><div className="bio-divider" aria-hidden="true" />
            <p>网络与新媒体专业背景。作为内容策划、视觉传播执行者，我从需求梳理、人物研究与创意文案出发，继续推进到脚本、分镜、视频和页面交付。</p>
          </TextBox>
          <a className="pill about-button" style={box(787, 5880, 350, 112)} href="#experience-section">了解我更多</a>
          <TextBox x={610} y={6125} width={705} className="experience-heading">
            <h2 id="experience-section">这些年<br /><span>我都做了什么？</span></h2>
          </TextBox>
          <div className="experience-list" style={box(205, 6500, 1515, 710)}>
            {experience.map((item) => <article className="experience-item" key={item.years}>
              <p className="experience-years">{item.years}</p>
              <div className="experience-role"><h3>{item.role}</h3><p>{item.company}</p></div>
              <p className="experience-copy">{item.copy}</p>
            </article>)}
          </div>
        </section>

        <Layer number={1109} x={-277} y={6589} width={2479} className="tear tear-two" />
        <section id="works-section" className="works-section" aria-labelledby="works-title">
          <TextBox x={380} y={7640} width={1165} className="works-intro">
            <h2 id="works-title">从内容到产品，从想法到画面。<br />每一件事都在回答同一个问题：<br /><span>用户在想什么？</span></h2>
          </TextBox>
          <TextBox x={680} y={8130} width={565} className="works-lead"><p>我认真对待过的一些事<br />想让你也看看</p></TextBox>
          <Layer number={1095} x={75} y={8390} width={261} className="works-mark" alt="我的作品 MY WORKS" />
          <div className="works-cards" aria-label="作品类型">
            <WorkCard number={1093} x={203} y={8685} width={518} layer={19} href="/brand-film-planning" label="品牌影片策划" />
            <WorkCard number={1092} x={721} y={8603} width={565} layer={20} href="/product-content-operations" label="品牌内容运营" />
            <WorkCard number={1091} x={1274} y={8685} width={577} layer={21} href="/project-proposal-writing" label="项目方案撰写" />
            <WorkCard number={1090} x={598} y={8965} width={771} layer={22} href="/visual-imagery" label="视觉影像制作" />
          </div>
          <span className="pill works-button" style={box(715, 9500, 494, 95)} aria-label="点击了解项目作品">点击了解项目作品</span>
        </section>

        <footer id="site-footer" className="site-footer footer-sticker" data-footer-sticker>
          <Layer number={1088} x={51} y={9657} width={229} className="footer-wordmark" alt="SU YUE" />
          <div className="footer-actions" style={box(1640, 9785, 235, 65)}><button type="button" aria-label="打开导航菜单">≡</button><a href="/contact">联系我</a></div>
          <div className="footer-sticker__reveal" style={{ '--sticker-clip-start': 7 } as CSSProperties} aria-hidden="true">
            <Layer number={1089} x={-610} y={9530} width={1800} className="footer-face" alt="苏越倾斜肖像" />
            <div className="footer-bubble" style={box(390, 9880, 313, 164)}><Layer number={1084} x={390} y={9880} width={313} /><span>这么快就走了？</span></div>
          </div>
          <nav className="footer-nav footer-directory" style={box(890, 9870, 900, 710)} aria-label="页尾导航">
            <a className="footer-directory__item" style={{ '--asset-left': '38%', '--asset-top': '-90%', '--asset-width': '42%', '--asset-from-x': '0px', '--asset-from-y': '-28px', '--asset-rotation': '-2deg', '--asset-duration': '320ms', '--float-duration': '2.4s' } as CSSProperties} href="#home-top"><img className="footer-directory__background" src="/assets/footer-directory/资源 42.png" alt="" /><span className="footer-directory__number">01</span><span className="footer-directory__label">主页</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 40.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '40%', '--asset-top': '-70%', '--asset-width': '48%', '--asset-from-x': '36px', '--asset-from-y': '0px', '--asset-rotation': '2deg', '--asset-duration': '380ms', '--float-duration': '2.8s' } as CSSProperties} href="#about-title"><img className="footer-directory__background" src="/assets/footer-directory/资源 43.png" alt="" /><span className="footer-directory__number">02</span><span className="footer-directory__label">关于我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 34.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '43%', '--asset-top': '-55%', '--asset-width': '42%', '--asset-from-x': '28px', '--asset-from-y': '18px', '--asset-rotation': '-2deg', '--asset-duration': '340ms', '--float-duration': '2.3s' } as CSSProperties} href="#experience-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 44.png" alt="" /><span className="footer-directory__number">03</span><span className="footer-directory__label">经历</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 33.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '46%', '--asset-top': '-60%', '--asset-width': '34%', '--asset-from-x': '0px', '--asset-from-y': '30px', '--asset-rotation': '2deg', '--asset-duration': '370ms', '--float-duration': '2.7s' } as CSSProperties} href="#works-section"><img className="footer-directory__background" src="/assets/footer-directory/资源 45.png" alt="" /><span className="footer-directory__number">04</span><span className="footer-directory__label">作品集</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 32.png" alt="" /></span></a>
            <a className="footer-directory__item" style={{ '--asset-left': '44%', '--asset-top': '-65%', '--asset-width': '34%', '--asset-from-x': '24px', '--asset-from-y': '-18px', '--asset-rotation': '-2deg', '--asset-duration': '350ms', '--float-duration': '2.5s' } as CSSProperties} href="/contact"><img className="footer-directory__background" src="/assets/footer-directory/资源 46.png" alt="" /><span className="footer-directory__number">05</span><span className="footer-directory__label">联系我</span><span className="footer-directory__asset-entry"><img className="footer-directory__asset-float" src="/assets/footer-directory/资源 31.png" alt="" /></span></a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
