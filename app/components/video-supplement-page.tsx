import type { ReactNode } from 'react';

export type SupplementVideo = {
  title: string;
  meta: string;
  src: string;
};

export default function VideoSupplementPage({
  eyebrow,
  title,
  intro,
  videos,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  videos: SupplementVideo[];
  children?: ReactNode;
}) {
  return (
    <main className="supplement-page">
      <header className="supplement-header">
        <a href="/" className="supplement-brand">SUYUE</a>
        <a href="/contact" className="supplement-contact">联系我</a>
      </header>
      <section className="supplement-hero">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <div className="supplement-rule" />
        <span>{intro}</span>
      </section>
      <section className="supplement-grid" aria-label={`${title}视频列表`}>
        {videos.map((video, index) => (
          <article className="supplement-video-card" key={video.title}>
            <div className="supplement-video-frame">
              <video controls preload="metadata" playsInline src={video.src} aria-label={video.title} />
            </div>
            <div className="supplement-video-meta">
              <div><small>{String(index + 1).padStart(2, '0')}</small><h2>{video.title}</h2></div>
              <span>{video.meta}</span>
            </div>
          </article>
        ))}
      </section>
      {children}
      <footer className="supplement-footer">
        <a href="/brand-film-planning">品牌影片策划</a>
        <a href="/product-content-operations">品牌内容运营</a>
        <a href="/project-proposal-writing">项目方案撰写</a>
        <a href="/visual-imagery">视觉影像制作</a>
      </footer>
    </main>
  );
}
