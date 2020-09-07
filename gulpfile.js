const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleanCSS = require('gulp-clean-css');


// Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js"
}

// Kopiera html-filer
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}
/*
// Kopiera CSS-filer
function copyCSS() {
    return src(files.cssPath)
        .pipe(dest('pub'));
}
*/
// Sammanslå
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'));
}

function cssTask() {
    return src(files.cssPath)
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCSS())
        .pipe(dest('pub/css'));
}

// Watcher
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.cssPath],
        parallel(copyHTML, cssTask, jsTask)
    );
}

exports.default = series(
    parallel(copyHTML, cssTask, jsTask),
    watchTask
);