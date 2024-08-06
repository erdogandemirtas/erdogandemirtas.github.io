// Dinamik İçerik Yönetimi
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');
    const projectsSection = document.querySelector('#projects');
    const contactSection = document.querySelector('#contact');

    // İçeriklerin Dinamik Olarak Yüklenmesi
    function loadContent(section, content) {
        section.innerHTML = content;
    }

    const aboutContent = `
        <h2>Hakkında</h2>
        <p>Yazılım geliştirme konusunda 5 yıllık deneyime sahibim. Çeşitli projelerde çalıştım ve güçlü bir teknik bilgiye sahibim.</p>
    `;
    const projectsContent = `
        <h2>Projeler</h2>
        <ul>
            <li><a href="#">Projelerimden Bir Tanesi</a></li>
            <li><a href="#">Projelerimden Diğer Bir Tanesi</a></li>
        </ul>
    `;
    const contactContent = `
        <h2>İletişim</h2>
        <p>Beni e-posta ile iletişime geçebilirsiniz: <a href="mailto:nevmara@outlook.com">nevmara@outlook.com</a></p>
    `;

    loadContent(aboutSection, aboutContent);
    loadContent(projectsSection, projectsContent);
    loadContent(contactSection, contactContent);

    // Form Doğrulama
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const message = form.querySelector('textarea[name="message"]').value;
            let isValid = true;

            if (name === '' || email === '' || message === '') {
                alert('Lütfen tüm alanları doldurun.');
                isValid = false;
            }

            if (isValid && !validateEmail(email)) {
                alert('Geçerli bir e-posta adresi girin.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Formun gönderilmesini engeller
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // Basit Animasyonlar
    const animateButton = document.querySelector('button');
    if (animateButton) {
        animateButton.addEventListener('mouseover', () => {
            animateButton.style.transform = 'scale(1.1)';
            animateButton.style.transition = 'transform 0.3s';
        });

        animateButton.addEventListener('mouseout', () => {
            animateButton.style.transform = 'scale(1)';
        });
    }
});
