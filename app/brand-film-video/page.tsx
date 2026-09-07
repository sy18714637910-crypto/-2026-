import VideoSupplementPage from '../components/video-supplement-page';

const base = 'https://media.githubusercontent.com/media/sy18714637910-crypto/-2026-/main/太保视频/';
const videos = [
  ['李玉顺', '吉林省分公司 · 志在千里', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：吉林省分公司 李玉顺。志在千里，让温暖永不停息。_xWT111.mp4'],
  ['卢小美', '江苏分公司 · 不负热爱', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：江苏分公司 卢小美。不负热爱，努力终将美好。_xWT111.mp4'],
  ['祁霞', '苏州分公司 · 厚积薄发', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：苏州分公司 祁霞。厚积薄发，才能光芒万丈。_xWT111.mp4'],
  ['瞿凤根', '苏州分公司 · 向寒而生', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：苏州分公司 瞿凤根。向寒而生，才能创造属于自己的风景。_xWT111.mp4'],
  ['余水梅', '云南分公司 · 慎独自律', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：云南分公司 余水梅。慎独自律，终有一日水滴石穿。_xWT111.mp4'],
  ['方信范', '浙江分公司 · 不断打磨', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：浙江分公司 方信范。不断打磨自己，才能泼墨成诗。_xWT111.mp4'],
  ['徐培玲', '浙江分公司 · 内核稳定', '中国太保寿险蓝鲸协会顶级荣耀——蓝鲸名人堂：浙江分公司 徐培玲。内核稳定，方能向上生长。_xWT111.mp4'],
].map(([title, meta, file]) => ({ title, meta, src: base + encodeURIComponent(file) }));

export default function BrandFilmVideoPage() {
  return <VideoSupplementPage eyebrow="BRAND FILM / PACIFIC INSURANCE" title="蓝鲸名人堂" intro="太平洋保险品牌影片策划与人物故事影像。" videos={videos} />;
}
