/* eslint-env node */
"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var webpack = require("webpack-stream");
var jade = require("gulp-jade");
var eslint = require("gulp-eslint");
var gulpGalen = require("gulp-galen");
var gls = require("gulp-live-server");

const sassDir = "src/*.sass";
const jadeDir = "./**/[^_]*.jade";
const distDir = "./dist";
const webpackConfig = require("./webpack.config.js");

gulp.task("sass", function() {
  return gulp.src(sassDir)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist"));
});

gulp.task("sass:watch", function() {
  gulp.watch(sassDir, ["sass"]);
});

gulp.task("webpack", function() {
  return gulp.src("src/entry.js")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(distDir));
});

gulp.task("webpack:watch", function() {
  gulp.watch("src/**/*.js", ["webpack"]);
});

gulp.task("lint", function() {
  return gulp.src(["**/*.js", "!node_modules/**", "!dist/**", "!test/galen/reports/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("jade", function() {
  const LOCALS = {
    bootstrapCss: "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css",
    customElementsPolyfill: "//cdnjs.cloudflare.com/ajax/libs/document-register-element/0.5.3/document-register-element.js"
  };

  gulp.src(jadeDir)
    .pipe(jade({
      locals: LOCALS
    }))
    .pipe(gulp.dest(distDir));
});

gulp.task("jade:watch", function() {
  gulp.watch("./**/*.jade", ["jade"]);
});

gulp.task("serve", function() {
  var server = gls.static(distDir, 3123);
  server.start();

  gulp.watch([distDir + "/**/*.*"], function(file) {
    server.notify([file]);
  });
});

gulp.task("test:galen", ["serve"], function() {
  gulp.src(["test/galen/**/*.test", "!test/galen/reports/**"]).pipe(gulpGalen.test({
    htmlreport: "reports/{relative}",
    cwd: "test/galen/"
  }));
});

gulp.task("test", ["lint", "test:galen"]);

gulp.task("watch", ["sass:watch", "jade:watch", "webpack:watch"]);

gulp.task("default", ["sass", "webpack", "jade"]);
