// Where sign-up / login buttons lead — set the real platform URLs here
const LINKS = {
  signup: 'https://app.metra.ai/register',
  login:  'https://app.metra.ai/login',
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
const posts = {
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

const accent = (s, open, close) => s.replace(/\[\[(.+?)\]\]/g, `${open}$1${close}`);
const plain = s => accent(s, '', '');
const lowerFirst = s => s.charAt(0).toLowerCase() + s.slice(1);
const dashList = items => items.map(i => '— ' + i).join('<br>');

const styles = {
  // живой текст: мало переносов, курсив+жирный на отдельных словах, одна цитата не в конце
  amateur: { name: 'Любительский', render: p => `
    <p class="hook">${p.title}</p>
    <p>${accent(p.lead, '<b><i>', '</i></b>')} ${lowerFirst(p.note)}</p>
    <blockquote>${p.quote}</blockquote>
    <p>${lowerFirst(p.listTitle)}<br>${dashList(p.list)}<br>${p.outro}</p>` },
  // золотая середина: заголовок капсом, одно выделение в середине
  normal: { name: 'Обычный', render: p => `
    <p>${p.title.toUpperCase()}</p>
    <p>${accent(p.lead, '<b>', '</b>')} ${p.note}</p>
    <p>${p.listTitle}<br>${dashList(p.list)}</p>
    <p>${p.outro}</p>` },
  // проф: жирный заголовок, цитата + курсив по одному предложению, жирные подзаголовки списков и концовка
  pro: { name: 'Профессиональный', render: p => `
    <p><b>${p.title}</b></p>
    <p>${plain(p.lead)}</p>
    <blockquote>${p.quote}</blockquote>
    <p><i>${p.note}</i></p>
    <p><b>${p.listTitle}</b><br>${dashList(p.list)}</p>
    <p><b>${p.outro}</b></p>` }
};

const postText = document.getElementById('postText');
const postPhoto = document.getElementById('postPhoto');
const postStyleName = document.getElementById('postStyleName');
const postNotch = document.getElementById('postNotch');
let postType = 'story', postStyle = 'normal';

function renderPost() {
  // swap instantly, then a short fade-in (no overlap between old and new text)
  postText.innerHTML = styles[postStyle].render(posts[postType]);
  postText.scrollTop = 0;
  postText.classList.remove('swap');
  void postText.offsetWidth;
  postText.classList.add('swap');
  // свои фото кладутся в img/posts/<тип>.jpg; если файла нет — остаётся градиент
  postPhoto.style.backgroundImage = `url("img/posts/${postType}.jpg"), var(--ph)`;
  postStyleName.textContent = styles[postStyle].name;
}

// preload post photos so switching tabs doesn't flash
Object.keys(posts).forEach(t => { const i = new Image(); i.src = `img/posts/${t}.jpg`; });

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

