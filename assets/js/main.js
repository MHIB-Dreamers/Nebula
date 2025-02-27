const App = {
    init() {
        this.customCursor()
        this.initWOW()
        this.autoplayTrailer()
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