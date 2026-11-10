document.addEventListener('DOMContentLoaded', function () {

    const heroTitle = document.getElementById('heroTitle');
    const progress = document.getElementById('scrollProgress');
    const percent = document.getElementById('scrollPercent');
    const toTop = document.getElementById('toTop');
    const themeBtn = document.getElementById('themeBtn');
    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('emailAddress');
    const emailError = document.getElementById('emailError');
    const successMsg = document.getElementById('submitSuccessMessage');
    const submitBtn = document.getElementById('submitButton');

    // 1. Событие прокрутки: полоса, процент, кнопка «наверх»
    window.addEventListener('scroll', function () {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const value = max > 0 ? Math.round((y / max) * 100) : 0;

        progress.style.width = value + '%';
        percent.textContent = value;
        toTop.style.display = y > 400 ? 'block' : 'none';
    });

    // 2. Кнопка «наверх» через window.scroll()
    toTop.addEventListener('click', function () {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });

    // 3. Анимация появления секций
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    // 4. Смена цвета заголовка по клику
    const palettes = [
        { top: '#ffffff', bottom: '#9a9a9a' },
        { top: '#8fd3cf', bottom: '#64a19d' },
        { top: '#ffd98a', bottom: '#f4b942' },
        { top: '#ff9d9d', bottom: '#e66a6a' }
    ];
    let paletteIndex = 0;
    heroTitle.addEventListener('click', function () {
        paletteIndex = (paletteIndex + 1) % palettes.length;
        heroTitle.style.setProperty('--hero-top', palettes[paletteIndex].top);
        heroTitle.style.setProperty('--hero-bottom', palettes[paletteIndex].bottom);
    });

    // 5. Ночной режим
    function applyTheme(night) {
        document.body.classList.toggle('night', night);
        themeBtn.textContent = night ? 'Дневной режим' : 'Ночной режим';
    }
    applyTheme(localStorage.getItem('theme') === 'night');
    themeBtn.addEventListener('click', function () {
        const night = !document.body.classList.contains('night');
        applyTheme(night);
        localStorage.setItem('theme', night ? 'night' : 'day');
    });

    // 6. Форма подписки: проверка email
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const value = emailInput.value.trim();

        emailError.classList.add('d-none');
        successMsg.classList.add('d-none');
        emailInput.classList.remove('is-error');

        if (value === '') {
            showError('Введите email.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError('Email указан неверно.');
        } else {
            successMsg.classList.remove('d-none');
            submitBtn.textContent = 'Вы подписаны!';
            form.reset();
        }
    });

    function showError(text) {
        emailError.textContent = text;
        emailError.classList.remove('d-none');
        emailInput.classList.add('is-error');
    }

    emailInput.addEventListener('input', function () {
        emailInput.classList.remove('is-error');
        emailError.classList.add('d-none');
    });
});