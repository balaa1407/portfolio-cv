document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Sidebar active state switching based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Typewriter effect for subtitle
    const textElement = document.querySelector('.typewriter');
    if (textElement) {
        const text = textElement.innerHTML;
        textElement.innerHTML = '';
        let i = 0;
        
        // Wait a bit before starting typewriter
        setTimeout(() => {
            function typeWriter() {
                if (i < text.length) {
                    textElement.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            typeWriter();
        }, 1000);
    }
});
