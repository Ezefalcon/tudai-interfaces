const banner = $('#banner');
let topOfParallax;
let previousScrollValue;
let bannerHeight;
let bannerDecimalSize = 99;
let minBannerScaleValue;

document.addEventListener('DOMContentLoaded', function () {
  topOfParallax = banner.position().top;
  bannerHeight = banner.height();
  let innerBannerHeight = bannerHeight * 0.304;
  minBannerScaleValue = $('nav').height() * 100 / innerBannerHeight;
  $(window).on('scroll', function(){

    let s = $(this).scrollTop(),
      d = $(document).height(),
      c = $(this).height();

    if(!previousScrollValue) {
      previousScrollValue = s;
    }
    const scrolled = $(window).scrollTop() + window.innerHeight;

    console.log(scrolled)

    const scrollPercent = s
    let topPosition = (topOfParallax - s);
    let spaceUntilBanner = banner.height() * -0.57;
    if(topOfParallax + topPosition > spaceUntilBanner) {
      $('.layer').css({
        'top': topPosition
      });
      if(topPosition < banner.height() * 0.42) {
        $('.layer-banner').css({
          'top': topPosition
        });
      }
    } else {
      // Start scaling down the banner
      let scale;
      if(isScrollingDown(s)) {
        bannerDecimalSize -= 0.5;
      } else {
        bannerDecimalSize += 0.5;
      }
      previousScrollValue = s;

      // scale = '0.'+bannerDecimalSize
      let navHeight = $('nav').height();
      scale = navHeight * 100 / innerBannerHeight;
      console.log(scale)
      $('.layer').css({
        'top': topPosition
      });
      banner.css({
        'transform': 'scale('+scale/100+')',
        'transform-origin': 'center'
      })
    }
  });
});

const isScrollingDown = (currentScollPosition) => {
  return previousScrollValue < currentScollPosition;
}
