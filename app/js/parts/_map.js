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
