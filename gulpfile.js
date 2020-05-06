"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const uncss = require('gulp-uncss');
const fileinclude = require('gulp-file-include');
// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
  ' * Đại học Lạc Hồng - <%= pkg.title %> v<%= pkg.version %>\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %>\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./dist/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap JS
  let bootstrap = gulp.src('./node_modules/bootstrap/dist/js/**/*')
    .pipe(gulp.dest('./dist/vendor/bootstrap/js'));
  // Font Awesome CSS
  let fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*')
    .pipe(gulp.dest('./dist/vendor/fontawesome-free/css'));
  // Font Awesome Webfonts
  let fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
    .pipe(gulp.dest('./dist/vendor/fontawesome-free/webfonts'));
  // jQuery Easing
  let jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));
  // Magnific Popup
  let magnificPopupJs = gulp.src('./node_modules/magnific-popup/dist/*.js')
    .pipe(gulp.dest('./dist/vendor/magnific-popup'));

  let magnificPopupCss = gulp.src('./node_modules/magnific-popup/dist/*.css')
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest('./dist/vendor/magnific-popup'))

  let animateCss = gulp.src([
    './node_modules/animate.css/*.css',
    '!./node_modules/animate.css/*min.css'
  ])
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest('./dist/vendor/animate'))

  let wowjs = gulp.src([
    './node_modules/wow.js/dist/*min.js'
  ])
    .pipe(gulp.dest('./dist/vendor/wow'))

  // jQuery
  let jquery = gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
  .pipe(gulp.dest('./dist/vendor/jquery'));

  return merge(bootstrap, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing, magnificPopupJs, magnificPopupCss, animateCss, wowjs);
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    // .pipe(header(banner, {
    //   pkg: pkg
    // }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

function reduceCSS() {
  return gulp
  .src("./css/**/*.css")
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(uncss({
    html: ['index.html']
  }))
  // .pipe(header(banner, {
  //   pkg: pkg
  // }))
  .pipe(gulp.dest("./dist/css"))
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
  .pipe(gulp.dest("./dist/css"))
  .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browsersync.stream());
}

// HTML task
function html() {
  return gulp.src('./index.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(htmlmin({ collapseWhitespace: true, removeComments: true}))
  .pipe(gulp.dest('./dist'))
  .pipe(browsersync.stream());
}

// Image task
function images() {
  return gulp.src('./images/**/*')
  .pipe(image())
  .pipe(gulp.dest('./dist/images'))
  .pipe(browsersync.stream());
}

function favicon() {
  return gulp.src('./*.ico')
  .pipe(gulp.dest('./dist'))
  .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./index.html", "./partial/*.html"], html);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(favicon, css, js, html));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.reduceCSS = reduceCSS;
exports.css = css;
exports.js = js;
exports.html = html;
exports.images = images;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
