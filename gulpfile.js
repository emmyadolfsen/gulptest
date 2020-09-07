// Variabler
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');


// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imagePath: "src/images/*"
}

// Kopiera html-filer
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

// minifiera med imagemin
function imageTask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('pub/images'));
}

// Sammanslå js-filer och minifiera med uglify
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'));
}

// Sammanslå css-filer och minifiera med cleanCSS
function cssTask() {
    return src(files.cssPath)
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCSS())
        .pipe(dest('pub/css'));
}

// Watcher, håller koll på om någon av filerna ändras
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.cssPath],
        parallel(copyHTML, imageTask, cssTask, jsTask)
    );
}

// Kör globalt
exports.default = series(
    parallel(copyHTML, imageTask, cssTask, jsTask),
    watchTask
);