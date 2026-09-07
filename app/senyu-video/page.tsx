import VideoSupplementPage from '../components/video-supplement-page';

const base = 'https://media.githubusercontent.com/media/sy18714637910-crypto/-2026-/main/森愈植物生态负氧离子/视频号抖音账号运营/';
const videos = [
  ['AIGC 产品宣传片', '品牌想象与产品表达', '宣传片/产品宣传片.mp4'],
  ['负氧离子释放仪到底有害吗', '把专业问题讲清楚', '负氧离子释放仪到底有害吗/负氧离子释放仪到底有害吗.mp4'],
  ['如何选择负氧离子机', '从需求出发，而不是从参数开始', '如何选择负氧离子机/如何选择负氧离子机.mp4'],
  ['无烟森林', '把自然感带回室内', '无烟森林/无烟森林.mp4'],
  ['产品测试', '实验验证与专业内容表达', '产品测试/产品测试.mp4'],
  ['产品展示 / 细节补充', '从开箱到细节，看见产品本身', '产品展示/产品展示.mp4'],
  ['2025酒店寒冬如何破局', 'B端行业内容与解决方案', '2025酒店寒冬如何破局/2025酒店寒冬如何破局.mp4'],
  ['康熙养生', '文化内容与视觉包装延展', '康熙养生/康熙养生.mp4'],
].map(([title, meta, file]) => ({ title, meta, src: base + encodeURIComponent(file) }));

export default function SenyuVideoPage() {
  return <VideoSupplementPage eyebrow="SENYU / VIDEO CONTENT OPERATIONS" title="森愈视频补充" intro="从账号搭建、产品宣传到持续内容运营的影像记录。" videos={videos} />;
}
