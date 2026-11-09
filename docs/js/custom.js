document.addEventListener('DOMContentLoaded', function () {

    // ---- Получаем элементы по id (getElementById) ----
    const heroTitle = document.getElementById('heroTitle');       // заголовок Grayscale
    const progress = document.getElementById('scrollProgress');   // полоса прогресса
    const percent = document.getElementById('scrollPercent');     // процент в подвале
    const toTop = document.getElementById('toTop');               // кнопка «наверх»
    const themeBtn = document.getElementById('themeBtn');         // кнопка ночного режима
    const form = document.getElementById('contactForm');          // форма подписки
    const emailInput = document.getElementById('emailAddress');   // поле email
    const emailError = document.getElementById('emailError');     // текст ошибки
    const successMsg = document.getElementById('submitSuccessMessage'); // сообщение об успехе
    const submitBtn = document.getElementById('submitButton');    // кнопка отправки

    // 1. СОБЫТИЕ ПРОКРУТКИ (scroll)
    // Вызывается при каждой прокрутке страницы пользователем.
    window.addEventListener('scroll', function () {
        const y = window.scrollY; // сколько пикселей прокручено от верха

        // Максимально возможная прокрутка = высота страницы минус высота окна.
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const value = max > 0 ? Math.round((y / max) * 100) : 0;

        progress.style.width = value + '%'; // меняем стиль полосы через DOM
        percent.textContent = value;        // меняем текст счётчика через DOM

        // Кнопка «наверх» видна только после 400px прокрутки.
        toTop.style.display = y > 400 ? 'block' : 'none';
    });

    // 2. КНОПКА «НАВЕРХ» — метод window.scroll()
    toTop.addEventListener('click', function () {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });

    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ
    // IntersectionObserver сообщает, когда элемент входит в видимую область.
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            // Добавляем .visible, CSS-transition делает плавное появление.
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });

    // 4. ИЗМЕНЕНИЕ СТИЛЕЙ ПО КЛИКУ НА ЗАГОЛОВОК
    // Каждый клик берёт следующий цвет из списка.
    const colors = ['#ffffff', '#64a19d', '#f4b942', '#e66a6a'];
    let colorIndex = 0;
    heroTitle.addEventListener('click', function () {
        colorIndex = (colorIndex + 1) % colors.length; 
        heroTitle.style.color = colors[colorIndex];
    });

    // 5. НОЧНОЙ РЕЖИМ
    // Применяет или снимает режим и обновляет текст кнопки.
    function applyTheme(night) {
        document.body.classList.toggle('night', night);
        themeBtn.textContent = night ? 'Day mode' : 'Night mode';
    }
    // При загрузке читаем сохранённый выбор из localStorage.
    applyTheme(localStorage.getItem('theme') === 'night');
    themeBtn.addEventListener('click', function () {
        const night = !document.body.classList.contains('night');
        applyTheme(night);
        localStorage.setItem('theme', night ? 'night' : 'day');
    });

    // 6. ФОРМА ПОДПИСКИ: проверка email
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // не даём странице перезагрузиться
        const value = emailInput.value.trim();

        // Сбрасываем прошлые сообщения.
        emailError.classList.add('d-none');
        successMsg.classList.add('d-none');
        emailInput.classList.remove('is-error');

        if (value === '') {
            showError('An email is required.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError('Email is not valid.');
        } else {
            successMsg.classList.remove('d-none');
            submitBtn.textContent = 'Subscribed!';
            form.reset();
        }
    });

    // Показывает текст ошибки и подсвечивает поле красной рамкой.
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