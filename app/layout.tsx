import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'SU YUE｜品牌策划与内容创作作品集', description:'苏越的品牌影片策划、内容运营、项目方案与视觉影像作品集。' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN"><body>{children}</body></html>}
