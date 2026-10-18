// Where sign-up / login buttons lead — set the real platform URLs here
const LINKS = {
  signup: 'register.html#signup',
  login:  'register.html#login',
};
document.querySelectorAll('[data-link]').forEach(a => { a.href = LINKS[a.dataset.link]; });

// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Post preview (section 6): 7 post types × 3 formatting styles
// [[...]] marks the accent phrase; each style decides how to format it.
const postsRu = {
  story: {
    title: 'Как я потерял половину депозита за один вечер',
    lead: 'Три года назад я сидел на кухне с последними 200$ на счёте и думал, что [[рынок мне что-то должен]].',
    quote: 'Самая дорогая сделка — та, которую открываешь на эмоциях.',
    note: 'Сегодня расскажу, что с тех пор изменилось.',
    listTitle: 'Что я понял после этого:',
    list: ['стоп ставится до входа, а не после', 'после двух минусов — пауза до завтра', 'депозит — это инструмент, а не лотерея'],
    outro: 'Завтра покажу, как выглядит мой торговый день сейчас.'
  },
  use: {
    title: '3 правила риск-менеджмента',
    lead: 'Большинство сливает депозит не из-за плохих входов, а из-за [[отсутствия правил]].',
    quote: 'Сохранить деньги важнее, чем заработать быстро.',
    note: 'Эти три правила спасли мой счёт.',
    listTitle: 'Правила:',
    list: ['не больше 2% депозита на сделку', 'стоп ставится до входа', 'после двух минусов — пауза до завтра'],
    outro: 'Сохрани пост, чтобы не потерять.'
  },
  offer: {
    title: 'Открываю доступ к сигналам',
    lead: 'Всю неделю даю подписчикам [[бесплатный доступ]] к своим сигналам.',
    quote: 'Лучшее время начать было вчера. Следующее лучшее — сегодня.',
    note: 'Группу закрою, как только наберётся поток.',
    listTitle: 'Что внутри:',
    list: ['3–5 сигналов в день', 'разбор каждой сделки', 'чат с ответами на вопросы'],
    outro: 'Жми кнопку под постом, пока доступ открыт.'
  },
  push: {
    title: 'Осталось 3 часа',
    lead: 'Вчера [[47 человек]] уже забрали доступ к сигналам.',
    quote: 'Пока ты думаешь, рынок уже движется.',
    note: 'Сегодня в полночь доступ закрывается.',
    listTitle: 'Успеваешь, если:',
    list: ['хочешь торговать по плану, а не наугад', 'готов уделять этому 15 минут в день'],
    outro: 'Ссылка под постом — после полуночи её не будет.'
  },
  engage: {
    title: 'Честный вопрос',
    lead: 'Какой у вас был [[самый большой минус]] за одну сделку?',
    quote: 'Ошибки не стыдно показывать — стыдно их повторять.',
    note: 'Лучшие истории разберу в завтрашнем посте.',
    listTitle: 'Пишите в комментариях:',
    list: ['сумму минуса', 'что пошло не так', 'какой вывод сделали'],
    outro: 'Самый честный ответ получит личный разбор.'
  },
  signal: {
    title: 'BTC/USDT — LONG',
    lead: 'Цена закрепилась над уровнем 67 000, [[объёмы растут]].',
    quote: 'Работаем только по плану.',
    note: 'Риск — не больше 2% депозита.',
    listTitle: 'Параметры сделки:',
    list: ['вход: 67 250', 'цель: 68 900', 'стоп: 66 600'],
    outro: 'Частично фиксирую на первой цели.'
  },
  proof: {
    title: 'Результаты подписчиков за неделю',
    lead: 'Скрины прилетают каждый день, и вот [[самые сильные]] из них.',
    quote: '«Впервые закрыл неделю в плюс» — пишет Дмитрий.',
    note: 'Цифры ниже — без монтажа.',
    listTitle: 'Итоги недели:',
    list: ['+38% у Дмитрия', '+21% у Марии', '+17% у Олега'],
    outro: 'Следующим в этом посте можешь быть ты.'
  }
};

const postsEn = {
  story: {
    title: 'How I lost half my deposit in one evening',
    lead: 'Three years ago I was sitting in my kitchen with my last $200 and thinking [[the market owed me something]].',
    quote: 'The most expensive trade is the one you open on emotion.',
    note: 'Today I will tell you what has changed since then.',
    listTitle: 'What I learned:',
    list: ['the stop goes in before entry, not after', 'two losses in a row — pause until tomorrow', 'a deposit is a tool, not a lottery ticket'],
    outro: 'Tomorrow I will show you what my trading day looks like now.'
  },
  use: {
    title: '3 risk management rules',
    lead: 'Most people blow their deposit not because of bad entries but because of [[having no rules]].',
    quote: 'Keeping money matters more than making it fast.',
    note: 'These three rules saved my account.',
    listTitle: 'The rules:',
    list: ['no more than 2% of the deposit per trade', 'set the stop before entry', 'two losses in a row — pause until tomorrow'],
    outro: 'Save this post so you do not lose it.'
  },
  offer: {
    title: 'Opening access to my signals',
    lead: 'All week long subscribers get [[free access]] to my signals.',
    quote: 'The best time to start was yesterday. The next best is today.',
    note: 'I will close the group as soon as it fills up.',
    listTitle: 'What you get:',
    list: ['3–5 signals a day', 'a breakdown of every trade', 'a chat for your questions'],
    outro: 'Tap the button below while access is open.'
  },
  push: {
    title: '3 hours left',
    lead: 'Yesterday [[47 people]] already grabbed access to the signals.',
    quote: 'While you are thinking, the market is already moving.',
    note: 'Access closes tonight at midnight.',
    listTitle: 'You are in time if you:',
    list: ['want to trade with a plan, not at random', 'can spare 15 minutes a day'],
    outro: 'The link is under this post — after midnight it is gone.'
  },
  engage: {
    title: 'An honest question',
    lead: 'What was [[your biggest loss]] on a single trade?',
    quote: 'Showing mistakes is not shameful — repeating them is.',
    note: 'I will break down the best stories in tomorrow’s post.',
    listTitle: 'Tell me in the comments:',
    list: ['the size of the loss', 'what went wrong', 'what you took from it'],
    outro: 'The most honest answer gets a personal review.'
  },
  signal: {
    title: 'BTC/USDT — LONG',
    lead: 'Price held above 67,000 and [[volume is growing]].',
    quote: 'We trade by the plan only.',
    note: 'Risk — no more than 2% of the deposit.',
    listTitle: 'Trade setup:',
    list: ['entry: 67,250', 'target: 68,900', 'stop: 66,600'],
    outro: 'Taking partial profit at the first target.'
  },
  proof: {
    title: 'Subscriber results this week',
    lead: 'Screenshots come in every day, and here are [[the strongest ones]].',
    quote: '“First week ever closed in profit,” writes Dmitry.',
    note: 'The numbers below are unedited.',
    listTitle: 'Week results:',
    list: ['+38% for Dmitry', '+21% for Maria', '+17% for Oleg'],
    outro: 'Next time, this post could be about you.'
  }
};
let lang = 'ru';
const posts = () => (lang === 'en' ? postsEn : postsRu);

const accent = (s, open, close) => s.replace(/\[\[(.+?)\]\]/g, `${open}$1${close}`);
const plain = s => accent(s, '', '');
const lowerFirst = s => s.charAt(0).toLowerCase() + s.slice(1);
const dashList = items => items.map(i => '— ' + i).join('<br>');

const styles = {
  // живой текст: мало переносов, курсив+жирный на отдельных словах, одна цитата не в конце
  amateur: { name: { ru: 'Любительский', en: 'Casual' }, render: p => `
    <p class="hook">${p.title}</p>
    <p>${accent(p.lead, '<b><i>', '</i></b>')} ${lowerFirst(p.note)}</p>
    <blockquote>${p.quote}</blockquote>
    <p>${lowerFirst(p.listTitle)}<br>${dashList(p.list)}<br>${p.outro}</p>` },
  // золотая середина: заголовок капсом, одно выделение в середине
  normal: { name: { ru: 'Обычный', en: 'Standard' }, render: p => `
    <p>${p.title.toUpperCase()}</p>
    <p>${accent(p.lead, '<b>', '</b>')} ${p.note}</p>
    <p>${p.listTitle}<br>${dashList(p.list)}</p>
    <p>${p.outro}</p>` },
  // проф: жирный заголовок, цитата + курсив по одному предложению, жирные подзаголовки списков и концовка
  pro: { name: { ru: 'Профессиональный', en: 'Professional' }, render: p => `
    <p><b>${p.title}</b></p>
    <p>${plain(p.lead)}</p>
    <blockquote>${p.quote}</blockquote>
    <p><i>${p.note}</i></p>
    <p><b>${p.listTitle}</b><br>${dashList(p.list)}</p>
    <p><b>${p.outro}</b></p>` }
};

const postText = document.getElementById('postText');
const postPhoto = document.getElementById('postPhoto');
const postMeta = document.getElementById('postMeta');
const postNotch = document.getElementById('postNotch');
let postType = 'story', postStyle = 'normal';

function renderPost() {
  // swap instantly, then a short fade-in (no overlap between old and new text)
  postText.innerHTML = styles[postStyle].render(posts()[postType]);
  postText.scrollTop = 0;
  postText.classList.remove('swap');
  void postText.offsetWidth;
  postText.classList.add('swap');
  // свои фото кладутся в img/posts/<тип>.jpg; если файла нет — остаётся градиент
  postPhoto.style.backgroundImage = `url("img/posts/${postType}.jpg"), var(--ph)`;
  postMeta.textContent = lang === 'en' ? `Channel · EN · ${styles[postStyle].name.en} style` : `Канал · RU · ${styles[postStyle].name.ru} стиль`;
}

// preload post photos so switching tabs doesn't flash
Object.keys(postsRu).forEach(t => { const i = new Image(); i.src = `img/posts/${t}.jpg`; });

function moveNotch() {
  const active = document.querySelector('#postTabs button.on');
  postNotch.style.left = active.offsetLeft + 'px';
  postNotch.style.width = active.offsetWidth + 'px';
}

document.querySelectorAll('#postTabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#postTabs button').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    postType = btn.dataset.type;
    moveNotch();
    renderPost();
  });
});
document.querySelectorAll('#postFmt button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#postFmt button').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    postStyle = btn.dataset.style;
    renderPost();
  });
});
window.addEventListener('resize', moveNotch);

// mobile/tablet: reserve the height of the longest post so the card never jumps
// (desktop has its own fixed-height card, so this only runs below 1025px)
const mobilePost = matchMedia('(max-width: 1024px)');
function lockPostHeight() {
  postText.style.minHeight = '';
  if (!mobilePost.matches) return;
  const probe = postText.cloneNode(false);
  probe.removeAttribute('id');
  Object.assign(probe.style, { position: 'absolute', visibility: 'hidden', left: '0', top: '0', width: postText.clientWidth + 'px' });
  postText.parentNode.appendChild(probe);
  let max = 0;
  for (const t of Object.keys(postsRu)) for (const s of Object.keys(styles)) {
    probe.innerHTML = styles[s].render(posts()[t]);
    max = Math.max(max, probe.offsetHeight);
  }
  probe.remove();
  postText.style.minHeight = max + 'px';
}
let lockTimer;
window.addEventListener('resize', () => { clearTimeout(lockTimer); lockTimer = setTimeout(lockPostHeight, 150); });
mobilePost.addEventListener('change', lockPostHeight);
document.fonts?.ready.then(lockPostHeight);
document.fonts?.ready.then(moveNotch);
moveNotch();
renderPost();

// Interface tabs (section 9)
document.querySelectorAll('#ifaceTabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#ifaceTabs button').forEach(b => b.classList.remove('on'));
    document.querySelectorAll('.iface .pane').forEach(p => p.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById(btn.dataset.pane).classList.add('on');
  });
});

// Clickable feature cards → scroll to their detail section
document.querySelectorAll('.card--link[data-href]').forEach(card => {
  const go = () => document.querySelector(card.dataset.href)?.scrollIntoView({ behavior: 'smooth' });
  card.addEventListener('click', go);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
});


// ===== Language switch (RU / EN) =====
const i18nEls = [...document.querySelectorAll('[data-i18n]')].filter(el => !el.parentElement.closest('[data-i18n]'));
i18nEls.forEach(el => { el.dataset.ru = el.innerHTML; });
const i18nAttrs = ['alt', 'aria-label'].flatMap(attr =>
  [...document.querySelectorAll(`[data-i18n-${attr}]`)].map(el => ({ el, attr, key: el.getAttribute(`data-i18n-${attr}`), ru: el.getAttribute(attr) })));
const metaDesc = document.querySelector('meta[name="description"]');
const ruMeta = { title: document.title, description: metaDesc.content };

function setLang(next) {
  lang = next === 'en' ? 'en' : 'ru';
  document.documentElement.lang = lang;
  i18nEls.forEach(el => { el.innerHTML = lang === 'en' ? I18N_EN[el.dataset.i18n] : el.dataset.ru; });
  i18nAttrs.forEach(({ el, attr, key, ru }) => el.setAttribute(attr, lang === 'en' ? I18N_EN_ATTR[key] : ru));
  document.title = lang === 'en' ? I18N_EN_META.title : ruMeta.title;
  metaDesc.content = lang === 'en' ? I18N_EN_META.description : ruMeta.description;
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  try { localStorage.setItem('metra-lang', lang); } catch (e) {}
  renderPost();
  moveNotch();
  lockPostHeight();
}
document.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

let savedLang = null;
try { savedLang = localStorage.getItem('metra-lang'); } catch (e) {}
// first visit: Russian for Russian-language browsers, English for everyone else
setLang(savedLang || ((navigator.language || 'ru').toLowerCase().startsWith('ru') ? 'ru' : 'en'));
