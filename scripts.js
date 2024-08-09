document.addEventListener('DOMContentLoaded', () => {
    // Dil parametresini 'en' olarak ayarlayın
    const lang = 'en'; // Sayfanın sadece İngilizce olmasını sağla

    const translations = {
        en: {
            title: 'Nevmara',
            about: 'About',
            aboutText: 'Nevmara designs and develops a range of minimalist applications.',
            projects: 'Projects',
            projectsLink: 'Nevmara',
            contact: 'Contact',
            contactText: 'nevmara@outlook.com',
            privacyPolicy: 'Privacy Policy',
            showPrivacy: 'Show Privacy Policy',
            hidePrivacy: 'Hide Privacy Policy'
        },
        tr: {
            title: 'Nevmara',
            about: 'Hakkında',
            aboutText: 'Nevmara, bir dizi minimalist uygulama tasarlar ve geliştirir.',
            projects: 'Projeler',
            projectsLink: 'Nevmara',
            contact: 'İletişim',
            contactText: 'nevmara@outlook.com',
            privacyPolicy: 'Gizlilik Politikası',
            showPrivacy: 'Gizlilik Politikasını Göster',
            hidePrivacy: 'Gizlilik Politikasını Gizle'
        }
    };

    function applyTranslations() {
        document.getElementById('page-title').textContent = translations[lang].title;
        document.getElementById('header-title').textContent = translations[lang].title;
        document.getElementById('about-title').textContent = translations[lang].about;
        document.getElementById('about-text').textContent = translations[lang].aboutText;
        document.getElementById('projects-title').textContent = translations[lang].projects;
        document.getElementById('projects-link').textContent = translations[lang].projectsLink;
        document.getElementById('contact-title').textContent = translations[lang].contact;
        document.getElementById('contact-text').textContent = translations[lang].contactText;
        document.getElementById('privacy-policy-title').textContent = translations[lang].privacyPolicy;

        const togglePrivacyButton = document.getElementById('toggle-privacy');
        if (togglePrivacyButton) {
            togglePrivacyButton.textContent = translations[lang].showPrivacy;
        }
    }

    applyTranslations();

    // Yavaşça görünen bir içerik efekti
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(el => observer.observe(el));

    // Gizlilik politikasını Markdown'dan yükleme ve dönüştürme
    fetch('PRIVACY.md')
        .then(response => {
            if (!response.ok) throw new Error('Markdown dosyası yüklenemedi.');
            return response.text();
        })
        .then(text => {
            document.getElementById('privacy-content').innerHTML = marked.parse(text);
            privacyContent.style.display = 'none'; // Başlangıçta gizli yap
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error);
        });

    // Gizlilik Politikası Bölümünü Göster/Gizle
    const togglePrivacyButton = document.getElementById('toggle-privacy');
    const privacyContent = document.getElementById('privacy-content');
    if (togglePrivacyButton && privacyContent) {
        togglePrivacyButton.addEventListener('click', () => {
            const isHidden = privacyContent.style.display === 'none';
            privacyContent.style.display = isHidden ? 'block' : 'none';
            togglePrivacyButton.textContent = isHidden ? translations[lang].hidePrivacy : translations[lang].showPrivacy;
        });
    }

    // Footer'ın doğru konumda kalmasını sağla
    const footer = document.querySelector('footer');
    const adjustFooterPosition = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        if (bodyHeight < windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.width = '100%'; // Footer'ın genişliğini ayarla
        } else {
            footer.style.position = 'relative';
            footer.style.bottom = 'auto';
        }
    };
    window.addEventListener('resize', adjustFooterPosition);
    adjustFooterPosition();
});
