// hamburger menu
(function() {

	let hamburger = {
		nav: document.querySelector('.menu-box'),
		navToggle: document.querySelector('.toogle-menu-btn-box'),

		initialize() {
			this.navToggle.addEventListener('click',
        () => { this.toggle(); });
		},

		toggle() {
			this.navToggle.classList.toggle('expanded');
			this.nav.classList.toggle('expanded');
		},
	};

	hamburger.initialize();

}());
// (function($) {
//   $(".toogle-menu-btn-box").click(function() {
//     $(this).toggleClass("toogle-menu--active");
//     $(this).closest("body").toggleClass("page-mobile-open");
//     $(this).closest("header").toggleClass("header-mobile-open");
//     $(this).closest(".grid-header").find(".menu-box--mobile").toggleClass("menu-box--mobile-open");
//   });
// })(jQuery);