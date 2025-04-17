function createStars() {
    const starsContainer = document.getElementById('stars-container');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random();

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        starsContainer.appendChild(star);
    }

    // Tạo 200 ngôi sao
    for (let i = 0; i < 200; i++) {
        createStar();
    }
}

function setupNavigation() {
    // Thay đổi style của navigation khi scroll
    const nav = document.querySelector('.cosmic-nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Thiết lập scrolling mượt cho các liên kết
    const navLinks = document.querySelectorAll('.nav-links a, .start-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupPronunciation() {
    // Audio file cho phát âm
    const audioFiles = {
        'Tree': 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/tree--_gb_1.mp3',
        'Bush': 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/bush--_gb_1.mp3',
        'Pond': 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/pond--_gb_1.mp3',
        'Cloud': 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/cloud--_gb_1.mp3'
    };

    // Đối tượng audio để phát âm
    const pronunciationAudio = new Audio();

    // Thiết lập sự kiện click cho các nút phát âm
    const soundButtons = document.querySelectorAll('.sound-button');

    soundButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            const word = this.closest('.object-popup').querySelector('.word').textContent;
            playPronunciation(word);
        });
    });

    // Thiết lập sự kiện click cho các đối tượng tương tác
    const interactiveObjects = document.querySelectorAll('.interactive-object');

    interactiveObjects.forEach(object => {
        // Hiển thị popup khi di chuột qua đối tượng
        object.addEventListener('mouseenter', function() {
            const popup = this.querySelector('.object-popup');
            popup.style.transform = 'translateX(-50%) scale(1)';
        });

        // Ẩn popup khi di chuột ra khỏi đối tượng
        object.addEventListener('mouseleave', function() {
            const popup = this.querySelector('.object-popup');
            popup.style.transform = 'translateX(-50%) scale(0)';
        });

        // Phát âm khi click vào đối tượng
        object.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            playPronunciation(word);
        });
    });

    // Hàm phát âm
    function playPronunciation(word) {
        if (audioFiles[word]) {
            pronunciationAudio.src = audioFiles[word];
            pronunciationAudio.play();
        }
    }
}

// Rest of the script remains the same, but I'll update the subscribe form alert
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            alert(`Thank you for subscribing! We will send updates to ${email}.`);
            emailInput.value = '';
        }
    });
}

function animateCatInSpace() {
    const cat = document.querySelector('.hero-image');
    const stars = document.querySelector('.hero-section');

    // Animate mèo trôi tới phía trước
    gsap.to(cat, {
        y: -30,
        scale: 1.2,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // // Animate nền sao bay ngược lại => tạo cảm giác tiến lên
    // gsap.to(stars, {
    //     backgroundPosition: "0px 1000px",
    //     duration: 30,
    //     repeat: -1,
    //     ease: "linear"
    // });
}

function heroSection() {
    particlesJS("stars-container", {
        "particles": {
            "number": { "value": 20 },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.6,
                "random": true
            },
            "size": {
                "value": 2,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 0.3,
                "direction": "none",
                "out_mode": "out"
            }
        },
        "interactivity": {
            "events": {
                "onhover": { "enable": false },
                "onclick": { "enable": false }
            }
        },
        "retina_detect": true
    });
    animateCatInSpace()
}

function createIntroParticles() {
    const container = document.getElementById('intro-particles');
    if (!container) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('intro-star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function setupFadeUpOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.feature').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}
function introSection() {
    window.addEventListener('scroll', function () {
        const intro = document.querySelector('.intro-section');
        const scrollY = window.scrollY;
        if (intro) {
            intro.style.backgroundPosition = `center ${-scrollY * 0.3}px`;
        }
    });

    createIntroParticles();

    setupFadeUpOnScroll();
}

function planetSection() {

    // Hàm tùy chỉnh giao diện section playable dựa vào hành tinh
    function customizePlayableScene(language) {
        const gameScene = document.querySelector('.scene-background');

        // Đổi background và hiệu ứng dựa vào ngôn ngữ
        switch(language) {
            case 'english':
                gameScene.style.backgroundImage = 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
                gameScene.style.filter = 'hue-rotate(0deg)';
                break;
            case 'chinese':
                gameScene.style.backgroundImage = 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
                gameScene.style.filter = 'hue-rotate(30deg) saturate(1.2)';
                break;
            case 'korean':
                gameScene.style.backgroundImage = 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
                gameScene.style.filter = 'hue-rotate(300deg)';
                break;
            case 'vietnamese':
                gameScene.style.backgroundImage = 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
                gameScene.style.filter = 'hue-rotate(100deg)';
                break;
            default:
                gameScene.style.backgroundImage = 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
                gameScene.style.filter = 'none';
        }
    }

    function createStarTrail(x1, y1, x2, y2) {
        const star = document.createElement('div');
        star.className = 'star-shoot';
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const distance = Math.hypot(x2 - x1, y2 - y1);

        star.style.left = `${x1 + 30}px`;
        star.style.top = `${y1 + 30}px`;
        star.style.transform = `rotate(${angle}rad)`;
        star.style.width = `${distance}px`;

        document.querySelector('.space-background').appendChild(star);

        setTimeout(() => star.remove(), 1000);
    }


    const planets = document.querySelectorAll('.planets-section .planet');
    const character = document.querySelector('.planets-section .character');
    const trail = character.querySelector('.character-trail');

    // Âm thanh khi di chuột qua hành tinh
    const planetSound = new Howl({ src: ['https://cdn.pixabay.com/audio/2025/03/28/audio_ad0e8bfd45.mp3'], volume: 0.7 });

    planets.forEach(planet => {
        // Phát âm thanh khi di chuột qua hành tinh
        planet.addEventListener('mouseenter', function() {

        });

        // Xử lý sự kiện click vào hành tinh
        planet.addEventListener('click', () => {
            planetSound.play();

            const planetRect = planet.getBoundingClientRect();
            const spaceRect = document.querySelector('.planets-section .space-background').getBoundingClientRect();

            // Tính vị trí mục tiêu tương đối trong space-background
            const targetX = planetRect.left - spaceRect.left + (planetRect.width / 2) - 30;
            const targetY = planetRect.top - spaceRect.top + (planetRect.height / 2) - 30;

            // Flip
            const fromX = parseFloat(character.style.left); // vị trí cũ
            if (targetX > fromX) {
                character.classList.add('flip');
            } else {
                character.classList.remove('flip');
            }

            // Bật đuôi sáng
            character.classList.add('moving');

            // Tạo sao bắn
            createStarTrail(character.offsetLeft, character.offsetTop, targetX, targetY);

            const language = planet.getAttribute('data-language');
            const planetName = planet.querySelector('.planet-info h3').textContent;

            // Animate mèo bay đến đó
            gsap.to(character, {
                duration: 3,
                top: `${targetY}px`,
                left: `${targetX}px`,
                ease: 'power3.out',
                onComplete: () => {
                    // Cuộn đến phần tieeps theo
                    document.querySelector('#playable').scrollIntoView({ behavior: 'smooth' });
                    // Đổi background của scene dựa vào hành tinh được chọn
                    customizePlayableScene(language);
                }
            });
        });
    });
}

function toggleGameInstruction() {
    const toggleBtn = document.querySelector('.toggle-instructions');
    const instructions = document.querySelector('.game-instructions');

    console.log(toggleBtn , instructions)
    if (toggleBtn && instructions) {
        toggleBtn.addEventListener('click', () => {
            instructions.classList.toggle('collapsed');
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    heroSection()
    introSection()
    planetSection()
    toggleGameInstruction()

    // Create star effect
    createStars();

    // Set up navigation on scroll
    setupNavigation();

    // Set up pronunciation for interactive objects
    setupPronunciation();

});

