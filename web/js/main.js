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
      iconImageOffset: [5, -90]
  });
  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom');
  if (window.screen.width <= 768) {
    myMap.behaviors.disable('drag');
  }
}