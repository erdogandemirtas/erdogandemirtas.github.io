document.addEventListener('DOMContentLoaded', () => {
    // Menü açma/kapama
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('nav ul');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Sayfa kaydırma animasyonu
    const scrollLinks = document.querySelectorAll('nav ul li a');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Üst kısmındaki başlığı dinamik olarak güncelle
    const headerTitle = document.querySelector('header h1');
    const userName = 'Adınız'; // Kullanıcı adını buraya ekleyin
    if (headerTitle) {
        headerTitle.textContent = `Merhaba, Ben ${userName}`;
    }

    // Dinamik içerik örneği
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutContent = `
            <h2>Hakkında</h2>
            <p>Buraya kendinizden ve yaptığınız işlerden bahseden kısa bir yazı ekleyin.</p>
        `;
        aboutSection.innerHTML = aboutContent;
    }

    // Yavaşça görünen bir içerik efekti
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
    fetch('PRIVACY.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Markdown dosyası yüklenemedi.');
            }
            return response.text();
        })
        .then(text => {
            const html = marked(text);
            document.getElementById('privacy-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error);
        });
});
