// Определяем переменную "preprocessor"
let preprocessor = 'sass'; 

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');

// Подключаем Browsersync
const browserSync = require('browser-sync').create();

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем gulp-inject-in-html. Подключает фрагменты html в другие html файлы
const rigger = require('gulp-rigger');

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');

// Подключаем модуль gulp-clean (вместо del)
const clean = require('gulp-clean');

// Определяем логику работы Browsersync
function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'web/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function scripts() {
	return src('app/js/*.js')
	//.pipe(concat('main.min.js')) // Конкатенируем в один файл
	//.pipe(uglify()) // Сжимаем JavaScript
  .pipe(rigger())
	.pipe(dest('web/js/')) // Выгружаем готовый файл в папку назначения
	.pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

function libs() {
	return src('app/js/libs/**/*.*')
	.pipe(dest('web/js/libs/')) // Выгружаем готовый файл в папку назначения
}

function styles() {
	return src('app/' + preprocessor + '/*.scss' + '') // Выбираем источник: "app/sass/*.scss"
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat('style.css')) // Конкатенируем в файл app.min.js
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	//.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('web/css/')) // Выгрузим результат в папку "web/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function html() {
  return src('app/*.html') //выбираем источник html файлов
      .pipe(rigger())
      .pipe(dest('web/')) // Выгрузим результат в папку "web/"
	    .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function fonts() {
  return src('app/fonts/**/*.*') //выбираем источник шрифтов
      .pipe(dest('web/fonts/')) // Выгрузим результат в папку "web/fonts/"
}

async function images() {
	imagecomp(
		"app/img/**/*", // Берём все изображения из папки источника
		"web/img/", // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function cleanimg() {
	return src('web/img/', {allowEmpty: true}).pipe(clean()) // Удаляем всё содержимое папки "web/img/"
}
 
function cleandist() {
	return src('web/', {allowEmpty: true}).pipe(clean()) // Удаляем всё содержимое папки "web/"
}

function startwatch() {
 
	// Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
	watch(['app/**/*.js', '!app/**/*.min.js'], scripts);

	// Мониторим файлы препроцессора на изменения
	watch('app/**/' + preprocessor + '/**/*', styles);
 
	// Мониторим файлы HTML на изменения
	watch('app/**/*.html', html).on('change', browserSync.reload);
 
	// Мониторим папку-источник изображений и выполняем images(), если есть изменения
	watch('app/img/**/*', images);

  // Мониторим папку со шрифтами на изменения
  watch('app/fonts/**/*.*', fonts);
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
 
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию libs() в таск libs
exports.libs = libs;

// Экспортируем функцию fonts() в таск fonts
exports.fonts = fonts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспортируем функцию html() в таск html
exports.html = html;

// Экспорт функции images() в таск images
exports.images = images;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

// Создаём новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, html, scripts, libs, images, fonts);

// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, html, scripts, browsersync, startwatch);