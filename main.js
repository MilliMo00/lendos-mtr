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

// Post type tabs (section 6)
const postSamples = {
  story:  'Три года назад я сидел на кухне с последними 200$ на счёте. Сегодня расскажу, что изменилось и какую ошибку я больше никогда не повторю 👇',
  use:    '3 правила риск-менеджмента, которые спасли мой депозит:\n1. Не больше 2% на сделку\n2. Стоп ставится до входа\n3. После двух минусов — пауза до завтра',
  offer:  'Открыл для подписчиков бесплатный доступ к своим сигналам на неделю. Места ограничены — жми кнопку ниже, пока не закрыл 🔥',
  push:   'Осталось 3 часа до закрытия доступа. Вчера 47 человек уже забрали сигналы — ты всё ещё думаешь?',
  engage: 'Честно: какой у вас был самый большой минус за одну сделку? Пишите в комментах, разберу лучшие ошибки в завтрашнем посте 👇',
  signal: '📈 BTC/USDT — LONG\nВход: 67 250\nЦель: 68 900\nСтоп: 66 600\nРиск — не больше 2% депозита.',
  proof:  'Скрины от подписчиков за неделю: +38% у Дмитрия, +21% у Марии. Пишут, что впервые закрыли неделю в плюс 💪'
};
const postText = document.getElementById('postText');
document.querySelectorAll('#postTabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#postTabs button').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    postText.style.opacity = 0;
    setTimeout(() => {
      postText.innerText = postSamples[btn.dataset.type];
      postText.style.opacity = 1;
    }, 150);
  });
});

// Interface tabs (section 9)
document.querySelectorAll('#ifaceTabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#ifaceTabs button').forEach(b => b.classList.remove('on'));
    document.querySelectorAll('.iface .pane').forEach(p => p.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById(btn.dataset.pane).classList.add('on');
  });
});
