const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
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
// Kopiera CSS-filer
function copyCSS() {
    return src(files.cssPath)
        .pipe(dest('pub'));
}

// sammanslå
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'));
}

// Watcher
function watchTask() {
    watch([files.htmlPath, files.jsPath],
        parallel(copyHTML, jsTask)
    );
}


exports.default = series(
    parallel(copyHTML, copyCSS, jsTask),
    watchTask
);