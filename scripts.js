document.addEventListener('DOMContentLoaded', () => {
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
            togglePrivacyButton.textContent = isHidden ? 'Hide Privacy Policy' : 'Show Privacy Policy';
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
