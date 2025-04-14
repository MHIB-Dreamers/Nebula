const App = {
    init() {
        this.initSlider()
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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    App.init()
})