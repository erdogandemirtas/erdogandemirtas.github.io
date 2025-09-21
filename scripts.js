// Theme toggle with system preference as default
let preferred = localStorage.getItem('theme');
if (!preferred) {
  preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
const themeToggle = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', preferred);
themeToggle.textContent = preferred === 'dark' ? 'Dark' : 'Light';

themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? 'Dark' : 'Light';
});

// Privacy modal
const modal = document.getElementById('privacy-modal');
const openBtn = document.getElementById('open-privacy');
const closeBtn = document.getElementById('close-privacy');
const privacyContent = document.getElementById('privacy-content');

openBtn.addEventListener('click', e => {
  e.preventDefault();
  modal.classList.add('open');
  loadPrivacy();
});
closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

// Load PRIVACY.md dynamically
async function loadPrivacy() {
  try {
    const res = await fetch('PRIVACY.md');
    if (!res.ok) throw new Error('not found');
    const md = await res.text();
    const html = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n\n/g, '<p></p>');
    privacyContent.innerHTML = html;
  } catch (e) {
    privacyContent.innerHTML = '<p>Privacy file not found. Please add PRIVACY.md to your root folder.</p>';
  }
}
