/*---------------------------------------------------------------------
2017/09/17
#author h.sasaki
---------------------------------------------------------------------*/
var gulp = require("gulp");
/*---------------------------------------------------------------------
sass
---------------------------------------------------------------------*/
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var assetsPath = "./src/";
var destPath = "./dist/";

var path = require('path');
// javascript minify
var uglify = require('gulp-uglify');
// file rename
var rename = require('gulp-rename');
// error handling
var plumber = require('gulp-plumber');
/*---------------------------------------------------------------------
js
---------------------------------------------------------------------*/

var uglify = require("gulp-uglify");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

// jsの自動圧縮
gulp.task('js', function() {
    gulp.src([path.join(assetsPath, 'js/*.js'),path.join('!', assetsPath, 'js/*.min.js')])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(path.join(destPath, 'js/min/')));
});

gulp.task("sass", function() { //taskの登録
    gulp.src("./src/sass/**/*scss") //ファイル指定
        .pipe(plumber())
        .pipe(sass()) //srcで取得したファイルに処理を施す
        .pipe(autoprefixer()) //ベンダープレフィックス付与を自動化
        .pipe(gulp.dest("./dist/css")) //出力先に処理を施したファイルを出力
        .pipe(browser.reload({stream:true}))
});

//ファイルの監視
gulp.task("default",['server'], function() {
    gulp.watch("./src/sass/**/*.scss",["sass"]);
    gulp.watch([path.join(assetsPath, 'js/*.js'),path.join('!', assetsPath, 'js/*.min.js')],['js']);
});
