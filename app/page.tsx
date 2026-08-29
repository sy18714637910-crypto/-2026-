export default function Home() {
  return (
    <main className="effect-page">
      <div className="effect-canvas">
        <img className="effect-image" src="/effects/home.webp" alt="苏越品牌内容策划与视觉传播个人作品集首页" />

        <a className="hotspot about-link" href="#about" aria-label="了解苏越" />
        <a className="hotspot more-link" href="#experience" aria-label="了解苏越更多" />
        <a className="hotspot works-link" href="#works" aria-label="查看项目作品" />

        <span className="page-anchor anchor-about" id="about" />
        <span className="page-anchor anchor-experience" id="experience" />
        <span className="page-anchor anchor-works" id="works" />
        <span className="page-anchor anchor-contact" id="contact" />

        <nav className="footer-hotspots" aria-label="页脚导航">
          <a className="nav-home" href="#top" aria-label="主页" />
          <a className="nav-about" href="#about" aria-label="关于我" />
          <a className="nav-experience" href="#experience" aria-label="经历" />
          <a className="nav-works" href="#works" aria-label="作品集" />
          <a className="nav-contact" href="#contact" aria-label="联系我" />
        </nav>
        <span id="top" className="page-anchor anchor-top" />
      </div>
    </main>
  );
}
