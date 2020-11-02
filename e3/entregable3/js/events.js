( function( $ ) {

  "use strict";

  $(".tilt").tilt({
    maxTilt: 15,
    perspective: 100,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    speed: 1200,
    glare: true,
    maxGlare: 0.2,
    scale: 1.04
  });

}( jQuery ) );
