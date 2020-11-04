$('.nav-link').get().forEach(x => {
  x.addEventListener('click', () => {
    $('.loader').css({
      visibility: 'initial'
    });
    $('body').css({
        overflow: 'hidden'
    })
  });
});

$('body').css({
  overflow: 'hidden'
});

setTimeout(() => {
  $('.loader').css({
    visibility: 'hidden'
  });
  $('body').css({
    overflow: 'auto'
  })
}, 3000);


