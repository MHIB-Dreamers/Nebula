const App = {
    init() {
        this.customCursor()
        this.initWOW()
        this.autoplayTrailer()
        this.playable()
    },

    playable() {
        const diamond = document.getElementById('diamond');
        const letterContainer = document.getElementById('letter-container');
        const letterCount = document.getElementById('letter-count');
        let count = 0;

        // Load count from session storage
        if (sessionStorage.getItem('letterCount')) {
            count = parseInt(sessionStorage.getItem('letterCount'));
            letterCount.textContent = count;
        }

        // Function to generate a random letter
        function getRandomLetter() {
            const languages = ['english', 'chinese', 'korean'];
            const selectedLanguage = languages[Math.floor(Math.random() * languages.length)];
            let char;
            switch (selectedLanguage) {
                case 'chinese': {
                    const chineseCharacters = '的一是不了人我在有他这为之大来以个中上们';
                    char = chineseCharacters[Math.floor(Math.random() * chineseCharacters.length)];
                    break;
                }
                case 'korean': {
                    const koreanCharacters = '가나다라마바사아자차카타파하';
                    char = koreanCharacters[Math.floor(Math.random() * koreanCharacters.length)];
                    break;
                }
                case 'english':
                default: {
                    char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    break;
                }

            }
            return { char, language: selectedLanguage };
        }

        // Function to create a letter element
        function createLetterElement(letterData) {
            const letter = document.createElement('div');
            letter.classList.add('letter');
            letter.classList.add(letterData.language);
            letter.textContent = letterData.char;

            return letter;
        }

        // Function to get a random animation class
        function getRandomAnimationClass() {
            const animationClasses = ['fadeOutUp', 'fadeOutTopLeft', 'fadeOutTopRight'];
            const randomIndex = Math.floor(Math.random() * animationClasses.length);
            return animationClasses[randomIndex];
        }

        // Event listener for the diamond click
        diamond.addEventListener('click', () => {
            const { char, language } = getRandomLetter();
            const letter = createLetterElement({ char, language });

            // Position the letter near the diamond
            const diamondRect = diamond.getBoundingClientRect();
            letter.style.zIndex = '1022';

            letterContainer.appendChild(letter);

            // Apply animate.css classes
            letter.classList.add('animated', getRandomAnimationClass(), 'slow'); // Apply animation

            // Remove the letter after the animation
            letter.addEventListener('animationend', () => {
                letter.remove();
            });

            count++;
            letterCount.textContent = count;

            // Save count to session storage
            sessionStorage.setItem('letterCount', count);
        });
    },

    customCursor() {
        // Create the custom cursor element
        const customCursor = document.getElementById('custom-cursor');

        // Function to move the custom cursor
        function moveCustomCursor(event) {
            customCursor.style.setProperty('--x', event.clientX + 'px');
            customCursor.style.setProperty('--y', event.clientY + 'px');
        }

        // Add event listener for mouse movement
        document.addEventListener('mousemove', moveCustomCursor);
    },

    initWOW() {
        // add animate css for every element with class `wow`
        new WOW().init();
    },

    autoplayTrailer() {
        // Get the iframe element
        const iframe = document.getElementById('youtube-iframe');
        // add a flag to check if the video is playing or not
        let isPlaying = false;

        // Create a new Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If the iframe is in view, add autoplay=1
                    if (!isPlaying) {
                        // Create a new iframe element
                        const newIframe = document.createElement('iframe');
                        newIframe.id = 'youtube-iframe';
                        newIframe.src = iframe.src + "&autoplay=1";
                        newIframe.frameborder = '0';
                        newIframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay';
                        newIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                        newIframe.setAttribute('allowfullscreen', '');

                        // Replace the old iframe with the new one
                        iframe.parentNode.replaceChild(newIframe, iframe);
                        // reassign iframe
                        iframe = newIframe;
                        isPlaying = true;
                    }
                } else {
                    // If the iframe is out of view, remove autoplay=1
                    if (isPlaying) {
                        // Create a new iframe element
                        const newIframe = document.createElement('iframe');
                        newIframe.id = 'youtube-iframe';
                        newIframe.src = iframe.src.replace("&autoplay=1", "");
                        newIframe.frameborder = '0';
                        newIframe.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay';
                        newIframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                        newIframe.setAttribute('allowfullscreen', '');

                        // Replace the old iframe with the new one
                        iframe.parentNode.replaceChild(newIframe, iframe);
                        // reassign iframe
                        iframe = newIframe;
                        isPlaying = false;
                    }
                }
            });
        }, {
            threshold: 0.5 // Adjust the threshold as needed (0.5 means 50% visible)
        });

        // Start observing the iframe
        observer.observe(iframe);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    App.init()
});