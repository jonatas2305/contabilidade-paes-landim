// ============================================
// CONTABILIDADE PAES LANDIM - SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Header scroll effect ----
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        lastScroll = currentScroll;
    });

    // ---- Mobile menu toggle ----
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Scroll reveal animations ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    // Animate groups: elements within the same section stagger together
    const sectionGroups = [
        { selector: '.sobre__header, .sobre__content', stagger: 0.15 },
        { selector: '.stat', stagger: 0.1 },
        { selector: '.servicos__header', stagger: 0 },
        { selector: '.servico-card', stagger: 0.08 },
        { selector: '.diferenciais__left', stagger: 0 },
        { selector: '.diferencial', stagger: 0.1 },
        { selector: '.contato__left, .contato__right', stagger: 0.15 },
    ];

    sectionGroups.forEach(group => {
        document.querySelectorAll(group.selector).forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i * group.stagger}s`;
            observer.observe(el);
        });
    });

    // ---- Smooth scroll for anchors ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.header__link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ---- Form handling → envia para WhatsApp ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = form.querySelector('input[type="text"]').value.trim();
            const email = form.querySelector('input[type="email"]').value.trim();
            const telefone = form.querySelector('input[type="tel"]').value.trim();
            const servico = form.querySelector('select').value;
            const mensagem = form.querySelector('textarea').value.trim();

            let texto = `Olá! Meu nome é *${nome}*.%0A`;
            texto += `E-mail: ${email}%0A`;
            if (telefone) texto += `Telefone: ${telefone}%0A`;
            if (servico) texto += `Serviço de interesse: ${servico}%0A`;
            if (mensagem) texto += `%0AMensagem: ${mensagem}`;

            const url = `https://wa.me/5511921071680?text=${texto}`;
            window.open(url, '_blank');

            form.reset();
        });
    }

    // ---- Counter animation ----
    const counters = document.querySelectorAll('.stat__number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const num = parseInt(text);

                let current = 0;
                const increment = num / 50;
                const duration = 2000;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        current = num;
                        clearInterval(timer);
                    }
                    let display = Math.floor(current);
                    if (hasPlus) display += '+';
                    if (hasPercent) display += '%';
                    el.textContent = display;
                }, stepTime);

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

});
