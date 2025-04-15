const App = {
    init() {
        // this.snapScroll()
        this.initSlider()
        this.initJourney()
    },

    snapScroll() {
        new fullpage('#fullpage', {
            autoScrolling: true,
            scrollHorizontally: false,
            navigation: true, // dot navigation
            navigationPosition: 'right',
            anchors: ['hero-section', 'intro-section', 'language-section', 'journey-section', 'journey-visual-section', 'landing-section', 'team-section', 'cta-section'],
            afterLoad: function(origin, destination, direction){

            }
        });
    },

    initSlider() {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            speed: 400,
            spaceBetween: 20,


            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },

        });
    },

    initJourney() {
        const player = document.getElementById('player');
        const planets = document.querySelectorAll('.planet');
        const section = document.getElementById('journey-section');

        const moveSound = new Howl({ src: ['https://cdn.pixabay.com/audio/2025/03/28/audio_ad0e8bfd45.mp3'], volume: 0.7 });

        planets.forEach(planet => {
            planet.addEventListener('click', () => {
                const planetRect = planet.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();

                const targetX = planetRect.left - sectionRect.left + (planetRect.width / 2) - 40;
                const targetY = planetRect.top - sectionRect.top + (planetRect.height / 2) - 40;

                const fromX = parseFloat(player.style.left); // vị trí cũ
                if (targetX > fromX) {
                    player.classList.add('flip');
                } else {
                    player.classList.remove('flip');
                }

                moveSound.play();

                gsap.to(player, {
                    duration: 3,
                    top: `${targetY}px`,
                    left: `${targetX}px`,
                    ease: 'power3.out',
                    onComplete: () => {

                    }
                });
            });
        });

        const canvas = document.getElementById('star-canvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Space dust particles
        let particles = [];
        for (let i = 0; i < 250; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 1.2 + 0.5,
                alpha: Math.random() * 0.6 + 0.2
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init()
})