import VideoSupplementPage from '../components/video-supplement-page';

const base = 'https://media.githubusercontent.com/media/sy18714637910-crypto/-2026-/main/视觉影像补充视频/';
const mediaUrl = (file: string) => base + file.split('/').map(encodeURIComponent).join('/');
const videos = [
  ['剪辑人生', '剪辑与叙事练习', '《剪辑人生》.mp4'],
  ['婚礼日', '情绪与现场记录', '《婚礼日》.mp4'],
  ['强风吹拂｜混剪', '节奏与动态影像', '《强风吹拂》混剪.mp4'],
  ['圆月', 'MG 动画与视觉表达', '《圆月》.mp4'],
].map(([title, meta, file]) => ({ title, meta, src: mediaUrl(file) }));

export default function VisualVideoPage() {
  return <VideoSupplementPage eyebrow="VISUAL IMAGERY / VIDEO ARCHIVE" title="视觉影像补充" intro="把想法剪成可以被看见的节奏。" videos={videos} />;
}
