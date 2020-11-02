import { Countdown } from './countdown.js';

const startDateOfMovie = new Date("Jan 5, 2021 15:37:25");

document.onload = addScrollListenerParallax();

Countdown.startCountdown(startDateOfMovie, $('#countdown'));

function addScrollListenerParallax() {
  window.addEventListener("scroll", function(event){
    let top = this.pageYOffset;

    let layers = $('.parallax');
    let layer, speed;
    for (let i = 0; i < layers.length; i++) {
      layer = layers[i];
      speed = layer.getAttribute('scroll-speed');
      let yPos = - (top * speed / 100);
      layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
    }
  });
}

let cards = $(".cards");

let observer = new IntersectionObserver(function(entries) {
  // isIntersecting is true when element and viewport are overlapping
  // isIntersecting is false when element and viewport don't overlap
  if(entries[0].isIntersecting === true)
    cards.addClass("cards-translate");
}, { threshold: [0] });
observer.observe(cards.get(0));

$(window).on('beforeunload', function(){
  $(window).scrollTop(0);
});

Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
  console.log('images finished loading');
});
