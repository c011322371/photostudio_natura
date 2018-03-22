/*---------------------------------------------------------------------
2017/09/17
#author HikaruSasaki
---------------------------------------------------------------------*/
var gulp = require("gulp");
/*---------------------------------------------------------------------
sass
---------------------------------------------------------------------*/
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
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
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});

gulp.task("sass", function() { //taskの登録
    gulp.src("sass/**/*scss") //ファイル指定
        .pipe(plumber())
        .pipe(sass()) //srcで取得したファイルに処理を施す
        .pipe(autoprefixer()) //ベンダープレフィックス付与を自動化
        .pipe(gulp.dest("./css")) //出力先に処理を施したファイルを出力
        .pipe(browser.reload({stream:true}))
});

//ファイルの監視
gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});