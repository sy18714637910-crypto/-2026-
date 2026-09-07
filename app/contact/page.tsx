import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我｜SU YUE',
  description: '联系苏越：电话、微信与邮箱。',
};

const contacts = [
  { label: '电话号', value: '18714637910', href: 'tel:18714637910', note: '欢迎直接联系' },
  { label: '微信', value: 'sy017610', href: '#wechat', note: '添加时请备注来意' },
  { label: '邮箱', value: 'sy18714637910@163.com', href: 'mailto:sy18714637910@163.com', note: '适合项目与合作沟通' },
];

export default function ContactPage() {
  return (
    <main className="contact-page-shell">
      <header className="contact-page-header">
        <a className="contact-page-logo" href="/#home-top" aria-label="返回主页">SUYUE</a>
        <div className="contact-page-actions">
          <a className="contact-menu-button" href="/#home-top" aria-label="返回主页">≡</a>
          <span className="contact-page-pill">联系我</span>
        </div>
      </header>

      <section className="contact-page-hero" aria-labelledby="contact-page-title">
        <p className="contact-page-index">05 / CONTACT</p>
        <h1 id="contact-page-title">联系我</h1>
        <p className="contact-page-subtitle">如果你也在寻找一个<br />把想法变成画面的人。</p>
      </section>

      <section className="contact-page-list" aria-label="联系方式">
        {contacts.map((contact, index) => (
          <a className="contact-page-card" key={contact.label} href={contact.href}>
            <span className="contact-page-number">0{index + 1}</span>
            <span className="contact-page-label">{contact.label}</span>
            <span className="contact-page-value">{contact.value}</span>
            <span className="contact-page-note">{contact.note}</span>
          </a>
        ))}
      </section>

      <footer className="contact-page-footer">
        <a href="/#home-top">返回主页</a>
        <span>SU YUE · BRAND PLANNING &amp; CONTENT CREATION</span>
      </footer>
    </main>
  );
}
