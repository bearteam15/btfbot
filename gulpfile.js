var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var runSequence = require("run-sequence");
var webpack = require("gulp-webpack");

var folder = {
  src: "landing-page/src/",
  build: "landing-page/dist/"
};

gulp.task("images", function() {
  var out = folder.build + "images/";
  return gulp
    .src(folder.src + "images/**/*")
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

gulp.task("html", ["images"], function() {
  return gulp.src(folder.src + "html/**/*")
    .pipe(gulp.dest(folder.build + "/"));
});

gulp.task("js", function() {
  return gulp
    .src(folder.src + "js/app.js")
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest(folder.build + "js"));
});

gulp.task("css", ["images", "fonts"], function() {
  return gulp
      .src(folder.src + "styles/main.scss")
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(
        sass({
          outputStyle: "nested",
          imagePath: "images/",
          precision: 3,
          errLogToConsole: true
        })
      )
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(folder.build + "css"));
});

gulp.task("clean:dist", function() {
  return del.sync(folder.build);
});

gulp.task("fonts", function() {
  return gulp
    .src(folder.src + "fonts/**/*")
    .pipe(gulp.dest(folder.build + "fonts"));
});

gulp.task("static", function() {
  return gulp.src(folder.src + "static/**/*").pipe(gulp.dest(folder.build));
});

gulp.task("run", ["html", "css", "js", "fonts", "static"]);

gulp.task("default", function() {
  runSequence("clean:dist", ["run"]);
});
