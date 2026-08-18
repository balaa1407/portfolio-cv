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

    // Initialize particles.js
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ffcc" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ffcc",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize Chart.js Radar Chart
    const ctx = document.getElementById('skillsRadar');
    if (ctx && window.Chart) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'Java/C++', 'Cloud & AWS', 'AI / ML', 'Threat Modeling', 'Forensics'],
                datasets: [{
                    label: 'Skill Proficiency',
                    data: [90, 80, 85, 75, 95, 80],
                    backgroundColor: 'rgba(0, 255, 204, 0.2)',
                    borderColor: 'rgba(0, 255, 204, 1)',
                    pointBackgroundColor: 'rgba(0, 255, 204, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 255, 204, 1)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#a0a0b5', font: { family: 'Fira Code', size: 11 } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Terminal Input Handler
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    
    if (termInput) {
        termInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const val = termInput.value.trim().toLowerCase();
                const newLine = document.createElement('div');
                newLine.className = 'mt-2 text-muted';
                
                if (val === 'whoami') {
                    newLine.innerHTML = 'V Ramya Balaa - Cybersecurity Engineer & SOC Analyst.';
                } else if (val === 'skills') {
                    newLine.innerHTML = 'Executing skills scan... -> Found: Python, AI Security, IoT Security, Cloud.';
                } else if (val === 'clear') {
                    // Only remove dynamically added elements if you wanted a full clear
                    // We'll just clear the input here for simplicity
                } else if (val === '') {
                    // do nothing
                } else {
                    newLine.innerHTML = `bash: ${val}: command not found. Try 'whoami' or 'skills'`;
                }
                
                if (val !== 'clear' && val !== '') {
                    // Insert the executed command
                    const cmdLine = document.createElement('div');
                    cmdLine.innerHTML = `<span class="prompt-user">root@ramya-sec:~$</span> ${val}`;
                    termBody.insertBefore(cmdLine, termInput.parentNode);
                    termBody.insertBefore(newLine, termInput.parentNode);
                }
                
                termInput.value = '';
                // Keep input in view
                termInput.scrollIntoView();
            }
        });
        
        // Focus input if terminal is clicked
        document.querySelector('.terminal-container').addEventListener('click', () => {
            termInput.focus();
        });
    }
});
