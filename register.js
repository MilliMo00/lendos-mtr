// Sign-up / login page. Where the form and the Telegram button send people — set the real platform URLs here.
const AUTH = {
  signupUrl: 'https://app.metra.ai/register',
  loginUrl: 'https://app.metra.ai/login',
  googleUrl: 'https://app.metra.ai/auth/google',
};

const T = {
  ru: {
    tabSignup: 'Регистрация', tabLogin: 'Вход',
    titleSignup: 'Создайте аккаунт', titleLogin: 'С возвращением',
    hintSignup: 'Заполните данные ниже — займёт меньше минуты.',
    hintLogin: 'Введите почту и пароль от своего аккаунта.',
    google: 'Продолжить с Google', or: 'или по почте', email: 'Email', password: 'Пароль', password2: 'Повторите пароль', nick: 'Никнейм',
    roleQ: 'Кто создаёт аккаунт?', roleOwner: 'Владелец', roleEmployee: 'Сотрудник',
    nickPh: 'Ваше имя', passPh: '8–72 символа: A-z, 0-9', passPhLogin: 'Ваш пароль', pass2Ph: 'Повторите пароль',
    errNick: 'Введите никнейм', errPass2: 'Пароли не совпадают',
    errEmail: 'Введите корректный email', errPass: '8–72 символа: только латиница и цифры', errTerms: 'Нужно принять условия',
    terms: 'Принимаю <a href="#">условия использования</a> и <a href="#">политику конфиденциальности</a>',
    forgot: 'Забыли пароль?', remember: 'Запомнить меня', submitSignup: 'Создать аккаунт', submitLogin: 'Войти',
    switchToLoginQ: 'Уже есть аккаунт?', switchToLogin: 'Войти', switchToSignupQ: 'Нет аккаунта?', switchToSignup: 'Зарегистрироваться',
    plaque: 'Триал бесплатно', bubble: 'Мы ждём<br><span class="hl-y">именно тебя</span>', artTitle: 'Канал и лиды<br><span class="accent">на автопилоте</span>',
    p1: 'AI пишет посты и публикует по расписанию', p2: 'Готовый контент-план под вертикаль', p3: 'AI ведёт диалоги с лидами голосом и текстом',
    showPass: 'Показать пароль', hidePass: 'Скрыть пароль', docSignup: 'Регистрация — METRA AI', docLogin: 'Вход — METRA AI',
  },
  en: {
    tabSignup: 'Sign up', tabLogin: 'Log in',
    titleSignup: 'Create your account', titleLogin: 'Welcome back',
    hintSignup: 'Fill in the details below — it takes under a minute.',
    hintLogin: 'Enter the email and password for your account.',
    google: 'Continue with Google', or: 'or with email', email: 'Email', password: 'Password', password2: 'Repeat password', nick: 'Nickname',
    roleQ: 'Who is creating the account?', roleOwner: 'Owner', roleEmployee: 'Employee',
    nickPh: 'Your name', passPh: '8–72 characters: A-z, 0-9', passPhLogin: 'Your password', pass2Ph: 'Repeat password',
    errNick: 'Enter a nickname', errPass2: 'Passwords do not match',
    errEmail: 'Enter a valid email', errPass: '8–72 characters: Latin letters and digits only', errTerms: 'Please accept the terms',
    terms: 'I accept the <a href="#">terms of use</a> and <a href="#">privacy policy</a>',
    forgot: 'Forgot password?', remember: 'Remember me', submitSignup: 'Create account', submitLogin: 'Log in',
    switchToLoginQ: 'Already have an account?', switchToLogin: 'Log in', switchToSignupQ: 'No account yet?', switchToSignup: 'Sign up',
    plaque: 'Free trial', bubble: 'We’re waiting<br><span class="hl-y">for you</span>', artTitle: 'Channels and leads<br><span class="accent">on autopilot</span>',
    p1: 'AI writes posts and publishes on schedule', p2: 'A ready content plan for your vertical', p3: 'AI talks to leads by voice and text',
    showPass: 'Show password', hidePass: 'Hide password', docSignup: 'Sign up — METRA AI', docLogin: 'Log in — METRA AI',
  },
};

let lang = 'ru';
let mode = location.hash === '#login' ? 'login' : 'signup';
const $ = s => document.querySelector(s);
const form = $('#authForm');
const pill = $('.auth-tabs__pill');

// keys that depend on the current tab
const MODE_KEYS = {
  title: ['titleSignup', 'titleLogin'], hint: ['hintSignup', 'hintLogin'], submit: ['submitSignup', 'submitLogin'],
  q: ['switchToLoginQ', 'switchToSignupQ'], sw: ['switchToLogin', 'switchToSignup'],
};
const modeEls = {
  title: $('.auth-title .chrome'), hint: $('.auth-hint'), submit: $('.auth-submit'),
  q: $('.auth-switch span'), sw: $('.auth-switch__btn'),
};

function render() {
  const t = T[lang], i = mode === 'login' ? 1 : 0;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.dataset.t;
    if (Object.values(MODE_KEYS).some(k => k.includes(key))) return;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  Object.entries(modeEls).forEach(([k, el]) => { el.innerHTML = t[MODE_KEYS[k][i]]; });
  document.querySelectorAll('.field-x__eye').forEach(b => b.setAttribute('aria-label', b.classList.contains('on') ? t.hidePass : t.showPass));
  document.querySelectorAll('[data-ph]').forEach(el => { el.placeholder = t[el.dataset.ph]; });
  form.password.placeholder = mode === 'login' ? t.passPhLogin : t.passPh;
  document.title = mode === 'login' ? t.docLogin : t.docSignup;

  document.querySelectorAll('[data-only]').forEach(el => { el.hidden = el.dataset.only !== mode; });
  $('.auth-card').classList.toggle('is-login', mode === 'login');
  form.password.autocomplete = mode === 'login' ? 'current-password' : 'new-password';
  form.terms.required = mode === 'signup';
  document.querySelectorAll('.auth-tabs button').forEach(b => {
    const on = b.dataset.tab === mode;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on);
    if (on) { pill.style.left = b.offsetLeft + 'px'; pill.style.width = b.offsetWidth + 'px'; }
  });
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  $('#googleLogin').href = AUTH.googleUrl;
}

// the card always keeps the height of the (taller) sign-up form, so switching tabs never resizes it
const card = $('.auth-card');
function lockCardHeight() {
  const real = mode;
  card.style.minHeight = '';
  if (matchMedia('(max-width: 960px)').matches) return; // phones scroll, no fixed card height
  if (real !== 'signup') { mode = 'signup'; render(); }
  const h = card.offsetHeight;
  if (real !== 'signup') { mode = real; render(); }
  card.style.minHeight = h + 'px';
  // brand panel on the right takes exactly the card's height
  document.querySelector('.auth').style.setProperty('--card-h', h + 'px');
}

function setMode(next) {
  mode = next;
  history.replaceState(null, '', next === 'login' ? '#login' : '#signup');
  form.querySelectorAll('.field-x, .check-x').forEach(f => f.classList.remove('invalid'));
  render();
}

document.querySelectorAll('.auth-tabs button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.tab)));
$('.auth-switch__btn').addEventListener('click', () => setMode(mode === 'login' ? 'signup' : 'login'));
document.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  try { localStorage.setItem('metra-lang', lang); } catch (e) {}
  render();
  lockCardHeight();
}));

// show / hide password
document.querySelectorAll('.field-x__eye').forEach(btn => btn.addEventListener('click', e => {
  const input = btn.closest('.field-x__box').querySelector('input');
  const shown = input.type === 'password';
  input.type = shown ? 'text' : 'password';
  btn.classList.toggle('on', shown);
  // open eye = password hidden (tap to show); crossed eye = password visible (tap to hide)
  btn.querySelector('use').setAttribute('href', shown ? '#i-eye-off' : '#i-eye');
  btn.setAttribute('aria-label', shown ? T[lang].hidePass : T[lang].showPass);
}));

// validation; on success the form is sent to the platform
form.addEventListener('submit', e => {
  e.preventDefault();
  const signup = mode === 'signup';
  const checks = [
    [form.nickname, !signup || form.nickname.value.trim() !== ''],
    [form.email, form.email.validity.valid && form.email.value.trim() !== ''],
    // signup enforces the platform's rule; login only needs something typed
    [form.password, signup ? /^[A-Za-z0-9]{8,72}$/.test(form.password.value) : form.password.value !== ''],
    [form.password2, !signup || form.password2.value === form.password.value],
    [form.terms, !signup || form.terms.checked],
  ];
  checks.forEach(([el, ok]) => el.closest('.field-x, .check-x').classList.toggle('invalid', !ok));
  if (checks.some(([, ok]) => !ok)) return;
  form.action = mode === 'login' ? AUTH.loginUrl : AUTH.signupUrl;
  form.method = 'post';
  form.submit();
});
form.addEventListener('input', e => e.target.closest('.field-x, .check-x')?.classList.remove('invalid'));

let saved = null;
try { saved = localStorage.getItem('metra-lang'); } catch (e) {}
lang = saved || ((navigator.language || 'ru').toLowerCase().startsWith('ru') ? 'ru' : 'en');
render();
lockCardHeight();
let resizeTimer;
window.addEventListener('resize', () => { render(); clearTimeout(resizeTimer); resizeTimer = setTimeout(lockCardHeight, 120); });
document.fonts?.ready.then(() => { render(); lockCardHeight(); });
