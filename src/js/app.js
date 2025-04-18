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

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Thiết lập scrolling mượt cho các liên kết
    const navLinks = document.querySelectorAll('.nav-links a, .start-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
        'Tree': 'https://api.dictionaryapi.dev/media/pronunciations/en/tree-us.mp3',
        'Bush': 'https://api.dictionaryapi.dev/media/pronunciations/en/rock-us.mp3',
        'Pond': 'https://api.dictionaryapi.dev/media/pronunciations/en/pond-us.mp3',
        'Cloud': 'https://api.dictionaryapi.dev/media/pronunciations/en/cloud-us.mp3'
    };

    // Đối tượng audio để phát âm
    const pronunciationAudio = new Audio();

    // Thiết lập sự kiện click cho các nút phát âm
    const soundButtons = document.querySelectorAll('.sound-button');

    soundButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            const word = this.closest('.object-popup').querySelector('.word').textContent;
            playPronunciation(word);
        });
    });

    // Thiết lập sự kiện click cho các đối tượng tương tác
    const interactiveObjects = document.querySelectorAll('.interactive-object');

    interactiveObjects.forEach(object => {
        // Hiển thị popup khi di chuột qua đối tượng
        object.addEventListener('mouseenter', function () {
            const popup = this.querySelector('.object-popup');
            popup.style.transform = 'translateX(-50%) scale(1)';
        });

        // Ẩn popup khi di chuột ra khỏi đối tượng
        object.addEventListener('mouseleave', function () {
            const popup = this.querySelector('.object-popup');
            popup.style.transform = 'translateX(-50%) scale(0)';
        });

        // Phát âm khi click vào đối tượng
        object.addEventListener('click', function () {
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
    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const submitButton = this.querySelector('.subscribe-button');
        const loadingText = this.querySelector('.loading-text');
        const email = emailInput.value;

        if (email) {
            // Show loading + disable inputs
            loadingText.style.display = 'block';
            emailInput.disabled = true;
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // URL Web App của Google Script bạn đã deploy
            const scriptURL = 'https://script.google.com/macros/s/AKfycby23AfBz6JkWimM5AGVxOojsUiuSHEZRvg0wPLYvX2ScxASL14qO--WmXWAGz1SDPy0sg/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email })
            })
                .then(() => {
                    alert(`🎉 Thank you for subscribing! We will send updates to ${email}.`);
                    emailInput.value = '';
                })
                .catch(err => {
                    console.error('Error!', err.message);
                    alert('Oops! Something went wrong. Please try again.');
                }).finally(() => {
                    // Hide loading + enable inputs
                    loadingText.style.display = 'none';
                    emailInput.disabled = false;
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                });
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
        gameScene.setAttribute('data-language', language);

        const tree = gameScene.querySelector('.tree img');
        const bush = gameScene.querySelector('.bush img');
        const pond = gameScene.querySelector('.pond img');
        const cloud = gameScene.querySelector('.cloud img');

        // Đổi background và hiệu ứng dựa vào ngôn ngữ
        switch (language) {
            case 'english':
                gameScene.style.backgroundImage = 'url("src/images/playable-eng-bg.jpg")';
                tree.src = 'src/images/playable-eng-tree.png';
                break;
            case 'chinese':
                gameScene.style.backgroundImage = 'url("src/images/playable-ch-bg.jpg")';
                tree.src = 'src/images/playable-ch-tree.png';
                break;
            case 'korean':
                gameScene.style.backgroundImage = 'url("src/images/playable-kr-bg.jpg")';
                tree.src = 'src/images/playable-kr-tree.png';
                break;
            case 'vietnamese':
                gameScene.style.backgroundImage = 'url("src/images/playable-vn-bg.jpg")';
                tree.src = 'src/images/playable-vn-tree.png';
                break;
            default:
                gameScene.style.backgroundImage = 'url("src/images/playable-ch-bg.jpg")';
                tree.src = 'src/images/playable-ch-tree.png';
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
        planet.addEventListener('mouseenter', function () {

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

            // Đổi background của scene dựa vào hành tinh được chọn
            customizePlayableScene(language);

            // Animate mèo bay đến đó
            gsap.to(character, {
                duration: 3,
                top: `${targetY}px`,
                left: `${targetX}px`,
                ease: 'power3.out',
                onComplete: () => {
                    // Cuộn đến phần tieeps theo
                    document.querySelector('#playable').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
}

function toggleGameInstruction() {
    const toggleBtn = document.querySelector('.toggle-instructions');
    const instructions = document.querySelector('.game-instructions');

    console.log(toggleBtn, instructions)
    if (toggleBtn && instructions) {
        toggleBtn.addEventListener('click', () => {
            instructions.classList.toggle('collapsed');
        });
    }
}

// Create twinkling stars effect
function starEffect() {
    const container = document.getElementById('stars-container');
    const numStars = 200; // Number of stars to create

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const size = Math.random() * 3;

        // Random animation duration
        const duration = 2 + Math.random() * 3;

        // Set star styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        container.appendChild(star);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    heroSection()
    introSection()
    planetSection()
    toggleGameInstruction()
    starEffect()

    // Create star effect
    createStars();

    // Set up navigation on scroll
    setupNavigation();

    // Set up pronunciation for interactive objects
    setupPronunciation();

});

