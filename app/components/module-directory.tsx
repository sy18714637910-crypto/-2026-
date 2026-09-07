import type { CSSProperties } from 'react';
import Link from 'next/link';

type ModuleDirectoryProps = { style: CSSProperties };

const DIRECTORY_WIDTH = 1801;
const DIRECTORY_HEIGHT = 1220;

function directoryBox(x: number, y: number, width: number, height?: number): CSSProperties {
  return {
    left: `${(x / DIRECTORY_WIDTH) * 100}%`,
    top: `${(y / DIRECTORY_HEIGHT) * 100}%`,
    width: `${(width / DIRECTORY_WIDTH) * 100}%`,
    ...(height ? { height: `${(height / DIRECTORY_HEIGHT) * 100}%` } : {}),
  };
}

const modules = [
  { title: '01 品牌影片策划', href: '/brand-film-planning', image: 1093, x: 143, y: 365, width: 518, layer: 19 },
  { title: '02 品牌内容运营', href: '/product-content-operations', image: 1092, x: 661, y: 283, width: 565, layer: 20 },
  { title: '03 项目方案撰写', href: '/project-proposal-writing', image: 1091, x: 1214, y: 365, width: 577, layer: 21 },
  { title: '04 视觉影像制作', href: '/visual-imagery', image: 1090, x: 538, y: 645, width: 771, layer: 22 },
];

export default function ModuleDirectory({ style }: ModuleDirectoryProps) {
  return (
    <section id="module-directory" className="module-directory" style={style} aria-labelledby="module-directory-title">
      <img
        className="module-directory-mark"
        style={directoryBox(15, 0, 261)}
        src="/assets/home/资源 1095.png"
        alt="我的作品 MY WORKS"
        id="module-directory-title"
      />
      <nav className="module-directory-cards" aria-label="切换作品模块">
        {modules.map((item) => (
          <Link
            key={item.href}
            className="work-card module-directory-card"
            style={{ ...directoryBox(item.x, item.y, item.width), '--card-layer': item.layer } as CSSProperties}
            href={item.href}
            aria-label={`查看${item.title.slice(3)}作品`}
          >
            <img src={`/assets/home/资源 ${item.image}.png`} alt={item.title} />
          </Link>
        ))}
      </nav>
      <Link
        className="pill module-directory-home"
        style={directoryBox(655, 1110, 494, 95)}
        href="/#site-footer"
      >
        点击了解项目作品
      </Link>
    </section>
  );
}
