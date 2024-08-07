document.addEventListener('DOMContentLoaded', () => {
    // Menü açma/kapama
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('nav ul');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Sayfa kaydırma animasyonu
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(link.getAttribute('href'));

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Üst kısmındaki başlığı dinamik olarak güncelle
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.textContent = 'Nevmara';
    }

    // Dinamik içerik örneği
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.innerHTML = `
            <h2>Hakkında</h2>
            <p>Nevmara, bir dizi minimalist uygulama tasarlar ve geliştirir.</p>
        `;
    }

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
            togglePrivacyButton.textContent = isHidden ? 'Gizlilik Politikasını Gizle' : 'Gizlilik Politikasını Göster';
        });
    }

    // Footer'ın doğru konumda kalmasını sağla
    const footer = document.querySelector('footer');

    const adjustFooterPosition = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;

        if (bodyHeight < windowHeight) {
            // Sayfa içeriği pencereden kısa ise
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.width = '100%'; // Footer'ın genişliğini ayarla
        } else {
            // Sayfa içeriği pencereden uzun ise
            footer.style.position = 'relative';
            footer.style.bottom = 'auto';
        }
    };

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde footer konumunu güncelle
    window.addEventListener('resize', adjustFooterPosition);
    adjustFooterPosition();
});
