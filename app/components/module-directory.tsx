import type { CSSProperties } from 'react';
import Link from 'next/link';

type ModuleDirectoryProps = {
  style: CSSProperties;
};

const modules = [
  { no: '01', title: '品牌影片策划', href: '/brand-film-planning', image: 1093, className: 'module-directory-film' },
  { no: '02', title: '品牌内容运营', href: '/product-content-operations', image: 1092, className: 'module-directory-content' },
  { no: '03', title: '项目方案撰写', href: '/project-proposal-writing', image: 1091, className: 'module-directory-proposal' },
  { no: '04', title: '视觉影像制作', href: '/visual-imagery', image: 1090, className: 'module-directory-visual' },
];

export default function ModuleDirectory({ style }: ModuleDirectoryProps) {
  return (
    <section className="module-directory" style={style} aria-labelledby="module-directory-title">
      <div className="module-directory-heading">
        <p>我的作品</p>
        <span id="module-directory-title">MY WORKS</span>
      </div>
      <div className="module-directory-stage">
        {modules.map((item) => (
          <img
            key={item.href}
            className={`module-directory-layer ${item.className}`}
            src={`/assets/home/资源 ${item.image}.png`}
            alt=""
            aria-hidden="true"
          />
        ))}
        <nav className="module-directory-links" aria-label="切换作品模块">
          {modules.map((item) => (
            <a key={item.href} className={`module-directory-link ${item.className}`} href={item.href}>
              <span>{item.no}</span>
              <strong>{item.title}</strong>
              <em>查看作品</em>
            </a>
          ))}
        </nav>
      </div>
      <Link className="module-directory-home" href="/">回到主页作品目录</Link>
    </section>
  );
}
