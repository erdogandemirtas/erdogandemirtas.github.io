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
    const userName = 'Nevmara'; // Kullanıcı adını buraya ekleyin
    if (headerTitle) {
        headerTitle.textContent = `Merhaba, Ben ${userName}`;
    }

    // Dinamik içerik örneği
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const aboutContent = `
            <h2>Hakkında</h2>
            <p>Nevmara, bir dizi minimalist uygulama tasarlar ve geliştirir.</p>
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
    const markdownUrl = 'https://erdogandemirtas.github.io/PRIVACY.md'; // Örneğin, doğrudan kök dizinden erişim

    fetch(markdownUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Markdown dosyası yüklenemedi.');
            }
            return response.text();
        })
        .then(text => {
            if (typeof marked === 'function') {
                const html = marked(text);
                document.getElementById('privacy-content').innerHTML = html;
            } else {
                throw new Error('Marked kütüphanesi işlev değil.');
            }
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error);
        });
});
