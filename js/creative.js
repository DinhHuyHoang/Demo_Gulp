(function($) {
  const configMagnificPopup = {
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  }

  for(let item = 1; item <= 15; item++) {
    $(`#section-${item}`).magnificPopup(configMagnificPopup);
  }

  $('#block-bao-chi .paper-image').magnificPopup(configMagnificPopup);

  const btnLoadMores = document.querySelectorAll('.load-more')
  btnLoadMores.forEach(btnLoadMore => {
    btnLoadMore.addEventListener('click', function(event) {
      const section = event.target.dataset.section
      const blockImages = document.querySelectorAll(`${section} .images a`)
      blockImages.forEach(el => {
        el.classList.remove('d-none')
        el.classList.add('d-block')
      })
      event.target.classList.add('d-none')
    })
  })

  window.addEventListener('load', function() {
    let wow1 = new WOW(
      {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
      }
    );
    let wow2 = new WOW(
      {
        boxClass:     'wow-lazy',      // animated element css class (default is wow)
        animateClass: 'lazy', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
      }
    );
    wow1.init();
    wow2.init();
  })

  $('.navbar-collapse').click(function(){
    $(".navbar-collapse").collapse('hide');
  });

})(jQuery)
