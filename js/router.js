(function($) {
  const thanhTuu = $('#block-thanh-tuu')
  const baoChi = $('#block-bao-chi')
  const duHocSinh = $('#block-du-hoc-sinh')
  const cuuSinhVien = $('#block-cuu-sinh-vien')
  let currentRouteWhenLoaded = null

  function checkCurrentRoute() {
    if(location.hash === '' || location.hash === "#") {
      thanhTuu.show()
    } else if(location.hash === '#bao-chi') {
      baoChi.show()
    } else if (location.hash === '#du-hoc-sinh') {
      duHocSinh.show()
    } else if(location.hash === '#cuu-sinh-vien') {
      cuuSinhVien.show()
    } else {
      hiddenAll()
    }
  }

  function activeNav() {
    if(currentRouteWhenLoaded !== null) currentRouteWhenLoaded.removeClass('active')

    if(location.hash === '' || location.hash === "#") {
      currentRouteWhenLoaded = $('[href="#"]')
    } else if(location.hash === '#bao-chi') {
      currentRouteWhenLoaded = $('[href="#bao-chi"]')
    } else if (location.hash === '#du-hoc-sinh') {
      currentRouteWhenLoaded = $('[href="#du-hoc-sinh"]')
    } else if(location.hash === '#cuu-sinh-vien') {
      currentRouteWhenLoaded = $('[href="#cuu-sinh-vien"]')
    }

    currentRouteWhenLoaded.addClass('active')
  }

  function hiddenAll() {
    thanhTuu.hide()
    baoChi.hide()
    duHocSinh.hide()
    cuuSinhVien.hide()
  }

  window.addEventListener('hashchange', function() {
    $(window).scrollTop(0)
    activeNav()
    hiddenAll()
    checkCurrentRoute()
  })

  window.addEventListener('load', function() {
    hiddenAll()
    checkCurrentRoute()
    activeNav()
  })
  hiddenAll()
})(jQuery)

