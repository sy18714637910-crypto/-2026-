import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '苏越｜品牌内容策划与视觉传播',
  description: '从内容到产品，从想法到画面。苏越的品牌内容策划与视觉传播作品集。',
  openGraph: {
    title: '苏越｜品牌内容策划与视觉传播',
    description: '保持敏感，保持追问。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
