// Page wording lives in content.js. Keep icons and layout in index.html.
function applyPageText() {
  const lookup = key => key.split('.').reduce((value, part) => value?.[part], window.PRESTIGE_TEXT);
  document.querySelectorAll('[data-copy], [data-copy-content]').forEach(element => {
    const key = element.dataset.copy ?? element.dataset.copyContent;
    const value = lookup(key);
    // Leave the HTML fallback intact if a field is missing or accidentally invalid.
    if (typeof value !== 'string') {
      console.warn(`Missing website text: ${key}`);
      return;
    }
    if (element.hasAttribute('data-copy-content')) {
      element.setAttribute('content', value);
      return;
    }
    const fragment = document.createDocumentFragment();
    value.split('\n').forEach((line, index) => {
      if (index) fragment.append(document.createElement('br'));
      fragment.append(document.createTextNode(line));
    });
    element.replaceChildren(fragment);
  });
}
applyPageText();

const navigationLinks = [...document.querySelectorAll('.site-nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
function updateNavigation() {
  const activeSection = sections.filter(section => section.getBoundingClientRect().top <= 170).at(-1) || sections[0];
  navigationLinks.forEach(link => {
    const active = link.hash === `#${activeSection.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let framePending = false;
window.addEventListener('scroll', () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => { updateNavigation(); framePending = false; });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

const siteMenu = document.querySelector('#site-menu');
const menuToggle = document.querySelector('.menu-toggle');
if (siteMenu && menuToggle) {
  const closeMenu = () => siteMenu.close();
  menuToggle.addEventListener('click', () => {
    siteMenu.showModal();
    document.body.classList.add('menu-open');
  });
  siteMenu.querySelector('.menu-close').addEventListener('click', closeMenu);
  siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  siteMenu.addEventListener('close', () => document.body.classList.remove('menu-open'));
  siteMenu.addEventListener('click', event => {
    if (event.target !== siteMenu) return;
    const bounds = siteMenu.getBoundingClientRect();
    if (event.clientX > bounds.right || event.clientY > bounds.bottom) closeMenu();
  });
}
