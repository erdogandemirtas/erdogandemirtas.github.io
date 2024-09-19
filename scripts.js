document.addEventListener('DOMContentLoaded', () => {
    // Fade-in efekti için IntersectionObserver
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => observer.observe(el));

    // Gizlilik politikasını Markdown'dan yükleme ve dönüştürme
    const loadPrivacyPolicy = async () => {
        try {
            const response = await fetch('PRIVACY.md');
            if (!response.ok) throw new Error('Markdown dosyası yüklenemedi.');
            const text = await response.text();
            const privacyContent = document.getElementById('privacy-content');
            privacyContent.innerHTML = marked.parse(text);
        } catch (error) {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error);
        }
    };
    loadPrivacyPolicy();

    // Modal için değişkenler
    const modal = document.getElementById("privacy-modal");
    const openModalButton = document.getElementById("open-modal");
    const closeModalButton = document.getElementById("close-modal");

    // Modalı açma
    openModalButton.onclick = function() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    };

    // Modalı kapatma
    closeModalButton.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    };

    // Modal dışına tıklandığında kapatma
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    };

    // Footer'ın doğru konumda kalmasını sağla
    const adjustFooterPosition = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const footer = document.querySelector('footer');
        if (bodyHeight < windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.width = '100%';
        } else {
            footer.style.position = 'relative';
            footer.style.bottom = 'auto';
        }
    };
    window.addEventListener('resize', adjustFooterPosition);
    adjustFooterPosition();
});
