document.addEventListener('DOMContentLoaded', () => {
    // Fade-in efekti için IntersectionObserver
    // Sayfa yüklendiğinde fade-in sınıfına sahip öğeleri gözlemlemeye başlar
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Öğenin görünür olduğu durumda 'visible' sınıfını ekler
                entry.target.classList.add('visible');
            } else {
                // Öğenin görünür olmadığı durumda 'visible' sınıfını kaldırır
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Görünürlük eşiği: %10
    fadeInElements.forEach(el => observer.observe(el));

    // Gizlilik politikasını Markdown'dan yükleme ve dönüştürme
    fetch('PRIVACY.md') // PRIVACY.md dosyasını yükler
        .then(response => {
            if (!response.ok) throw new Error('Markdown dosyası yüklenemedi.'); // Yükleme hatası kontrolü
            return response.text(); // Yanıtı metin olarak döndürür
        })
        .then(text => {
            const privacyContent = document.getElementById('privacy-content');
            privacyContent.innerHTML = marked.parse(text); // Markdown içeriğini HTML'ye dönüştürür
            privacyContent.style.display = 'none'; // Başlangıçta gizli yap
        })
        .catch(error => {
            console.error('Markdown dosyası yüklenirken bir hata oluştu:', error); // Hata durumunda konsola yazdırır
        });

    // Gizlilik Politikası Bölümünü Göster/Gizle
    const togglePrivacyButton = document.getElementById('toggle-privacy');
    const privacyContent = document.getElementById('privacy-content');
    if (togglePrivacyButton && privacyContent) {
        togglePrivacyButton.addEventListener('click', () => {
            const isHidden = privacyContent.style.display === 'none';
            privacyContent.style.display = isHidden ? 'block' : 'none'; // Gizliliği gösterir veya gizler
            togglePrivacyButton.textContent = isHidden ? 'Hide Privacy Policy' : 'Show Privacy Policy'; // Buton metnini günceller
            
            // Fade-in efektini yeniden uygulama
            if (isHidden) {
                privacyContent.classList.add('fade-in');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        } else {
                            entry.target.classList.remove('visible');
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(privacyContent); // Gözlemciyi yeniden başlatır
            }
        });
    }

    // Footer'ın doğru konumda kalmasını sağla
    const footer = document.querySelector('footer');
    const adjustFooterPosition = () => {
        const bodyHeight = document.body.scrollHeight; // Sayfanın toplam yüksekliği
        const windowHeight = window.innerHeight; // Görüntüleme penceresinin yüksekliği
        if (bodyHeight < windowHeight) {
            footer.style.position = 'fixed'; // Footer'ı ekranın altında sabitler
            footer.style.bottom = '0';
            footer.style.width = '100%'; // Footer'ın genişliğini ayarlar
        } else {
            footer.style.position = 'relative'; // Sayfa içeriğine göre footer'ın konumunu değiştirir
            footer.style.bottom = 'auto';
        }
    };
    window.addEventListener('resize', adjustFooterPosition); // Pencere boyutu değiştiğinde pozisyonu ayarlar
    adjustFooterPosition(); // Sayfa yüklendiğinde pozisyonu ayarlar
});
