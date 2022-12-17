// hamburger menu
(function() {

	let hamburger = {
		nav: document.querySelector('.menu-box'),
		navToggle: document.querySelector('.toogle-menu-btn-box'),
    body: document.querySelector('body'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.toggle('expanded');
			this.nav.classList.toggle('expanded');
      this.body.classList.toggle('page-mobile-open');
		},
	};

	hamburger.initialize();

}());

(function() {

	let closeHamburger = {
		nav: document.querySelector('.menu-box'),
		navToggle: document.querySelector('.mobile-open'),
    body: document.querySelector('body'),
    btnBox: document.querySelector('.toogle-menu-btn-box'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.remove('mobile-open');
			this.nav.classList.remove('expanded');
      this.body.classList.remove('page-mobile-open');
      this.btnBox.classList.remove('expanded');
		},
	};

	closeHamburger.initialize();

}());

//sub menu
(function() {

	let menuList = {
		navToggle: document.querySelector('.menu-item-has-children'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.toggle('open');
		},
	};

	menuList.initialize();

}());
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [59.880071, 30.309185],
        zoom: 15,
        controls: ['zoomControl', 'fullscreenControl']
    });
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'ООО «ОриентИС технолоджи»',
      balloonContent: '196128, г Санкт-Петербург, ул Варшавская, д. 5 к. 2 литера А, помещение 206А'
  }, {
      // Опции.
      iconLayout: 'default#image',
      iconImageHref: 'img/map.svg',
      iconImageSize: [46, 46],
      iconImageOffset: [0, -40]
  });
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
  if (window.screen.width <= 768) {
    myMap.behaviors.disable('drag');
  }
}
// скролл до якоря
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
// Соглашение на использование cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    function checkCookies() {
        let cookieNote = document.getElementById('cookie_note');
        let cookieBtnAccept = cookieNote.querySelector('.cookie_accept');

        // Если куки cookies_policy нет или она просрочена, то показываем уведомление
        if (!getCookie('cookies_policy')) {
            cookieNote.classList.add('show');
        }

        // При клике на кнопку устанавливаем куку cookies_policy на один год
        cookieBtnAccept.addEventListener('click', function () {
            setCookie('cookies_policy', 'true', 365);
            cookieNote.classList.remove('show');
        });
    }

    checkCookies();
// end Соглашение на использование cookie