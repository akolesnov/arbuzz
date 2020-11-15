'use strict';

const {series, src, dest, watch} = require('gulp'),
  del = require('delete'),
  rigger = require('gulp-rigger'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-minify-css');

function clean(cb) {
  del(['./build/files'], cb);
}

function cleanAll(cb) {
  del(['./build/**/*'], cb);
}

function files() {
  return src('./src/files/**/*')
    .pipe(dest('./build/files'))
}

function html() {
  return src('./src/*.html')
    .pipe(rigger())
    .pipe(dest('./build/'))
    .pipe(reload({stream: true}))
}

function styles() {
  return src('./src/style.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer({
      cascade: false
    }))
    // .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(dest('./build'))
    .pipe(reload({stream: true}))
}

function wpScss(cb) {
  return src('./src/style.scss')
    .pipe(sass())
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(dest('./build/wp/'))
    .pipe(reload({stream: true}))
    // .pipe(cb())
}

function wpJs() {
  return src('./src/main.js')
    .pipe(rigger())
    .pipe(dest('./build/wp'))
    .pipe(reload({stream: true}))
}

function js() {
  return src('./src/main.js')
    .pipe(rigger())
    // .pipe(sourcemaps.init())
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(dest('./build'))
    .pipe(reload({stream: true}))
}

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "dan"
};

function webServer(cb) {
  browserSync(config);
  cb();
}

function watchFiles(cb) {
  watch('./src/*.html', html);
  watch('./src/blocks/*.html', html);
  watch('./src/**/*.scss', styles);
  watch('./src/main.js', js);
  watch('./src/files/**/*', files);
  cb();
}

exports.default = series(webServer, watchFiles);
exports.build = series(files, html, styles, js);
exports.wpJs = wpJs;
exports.wpScss = wpScss;