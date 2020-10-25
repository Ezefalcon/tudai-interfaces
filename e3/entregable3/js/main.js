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

console.log($('#layer-1').height())
