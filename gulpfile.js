const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html",function(){
  return gulp
    .src("*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true,
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
});

//处理图片

gulp.task("images",function(){
  return gulp.src("./images/*.{jpg,png,svg,gif,ico}").pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());

});
gulp.task("php",function(){
  return gulp.src("./php/*.php").pipe(gulp.dest("dist/php"))
  .pipe(connect.reload());

});
//处理js代码，凡是第三方框架js 不要压缩
gulp.task("scripts",function(){
  return gulp.src(["./js/*.js","!gulpfile.js"]).pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());

});
//如果要压缩css代码一个scss一个
const scss =require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
//压缩css代码，一个scss一个任务

gulp.task("style-scss",function(){
  return gulp
    .src("stylesheet/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("normal-scss",function(){
  return gulp
    .src("stylesheet/normal.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("normal.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("login-scss",function(){
  return gulp
    .src("stylesheet/login.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("shoppingCart-scss",function(){
  return gulp
    .src("stylesheet/shoppingCart.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingCart.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//处理数据
gulp.task("data",function(){
  return gulp.src(["./data/*.json","!package.json"]).pipe(gulp.dest("dist/data"))
  .pipe(connect.reload());

});


//build任务

gulp.task("build",["copy-html","images","scripts","data","style-scss","normal-scss","login-scss","shoppingCart-scss","php"],function(){
  console.log("项目建立成功");
})

//建立服务器 添加监听

gulp.task("watch",function(){
  gulp.watch("*.html",["copy-html"]);
  gulp.watch("./images/*.{jpg,png,svg,gif,ico}",["images"]);
  gulp.watch(["./js/*.js","!gulpfile.js"],["scripts"]);
  gulp.watch(["./data/*json","!package.json"],["data"]);
  gulp.watch("stylesheet/style.scss",["style-scss"]);
  gulp.watch("stylesheet/normal.scss", ["normal-scss"]);
  gulp.watch("stylesheet/login.scss", ["login-scss"]);
  gulp.watch("stylesheet/shoppingCart.scss", ["shoppingCart-scss"])
  gulp.watch(["./php/*.php"],["php"]);
});

const connect = require("gulp-connect");
gulp.task("server",function(){
   connect.server({
     root:"dist",
     port:8888,
     livereload:true,
   })
})


//同时启动
 gulp.task("default",["watch","server"])