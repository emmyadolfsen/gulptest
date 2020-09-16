// Variabler
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();


// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imagePath: "src/images/*",
    htmlmin: "src/*.html"
}

// Minifiera html-filer och kopiera
function htmlTask() {
    return src(files.htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('pub'));
}


// Minifiera med imagemin och kopiera
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

// Watcher och browsersync
function watchTask() {
    browserSync.init({
        server: {
            baseDir: './pub/'
        }
    });

    watch(files.htmlPath, htmlTask).on('change', browserSync.reload);
    watch(files.imagePath, imageTask).on('change', browserSync.reload);
    watch(files.jsPath, jsTask).on('change', browserSync.reload);
    watch(files.cssPath, cssTask).on('change', browserSync.reload);
};

// Kör globalt
exports.default = series(
    parallel(htmlTask, imageTask, jsTask),
    watchTask
)