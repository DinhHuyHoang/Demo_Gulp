document.addEventListener("DOMContentLoaded", function() {
  let lazyImagesLoadFirst = [].slice.call(document.querySelectorAll("div.lazy.first"));

  const lazyLoad = function(lazyImages) {
    let active = false;
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            let newImg = document.createElement('img');
            newImg.src = lazyImage.dataset.src;
            newImg.alt = lazyImage.dataset.alt;

            console.log(lazyImage.style)

            lazyImage.classList.forEach(itemClass => {
              if(itemClass !== 'lazy') {
                newImg.classList.add(itemClass)
              }
            })

            lazyImages = lazyImages.filter(image => image !== lazyImage);
            lazyImage.replaceWith(newImg);
          }
        });

        active = false;
      }, 300);
    }
  };

  document.addEventListener("scroll", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("div.lazy"));
    lazyLoad(lazyImages)
  });
  window.addEventListener("resize", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("div.lazy"));
    lazyLoad(lazyImages)
  });
  window.addEventListener("orientationchange", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("div.lazy"));
    lazyLoad(lazyImages)
  });
  lazyLoad(lazyImagesLoadFirst)
});

document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("lazy-background");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
