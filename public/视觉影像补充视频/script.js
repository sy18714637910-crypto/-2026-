const modal = document.querySelector('.modal');
const modalVideo = document.querySelector('.modal-video');
const modalTitle = document.querySelector('#modal-title');
const triggers = document.querySelectorAll('.video-trigger');
let lastTrigger = null;

function openVideo(trigger) {
  lastTrigger = trigger;
  modalTitle.textContent = trigger.dataset.title || '视频';
  modalVideo.src = trigger.dataset.video;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalVideo.play().catch(() => {});
  document.querySelector('.modal-close').focus();
}

function closeVideo() {
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.hidden = true;
  document.body.style.overflow = '';
  if (lastTrigger) lastTrigger.focus();
}

triggers.forEach((trigger) => trigger.addEventListener('click', () => openVideo(trigger)));
document.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', closeVideo));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) closeVideo();
});
