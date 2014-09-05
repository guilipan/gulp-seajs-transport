gulp-seajs-transport
====================

transport seajs module gulp plugin
用于对seajs模块进行transport化

## Usage

```
var transport = require("gulp-seajs-transport");
var gulp = require("gulp");

gulp.task("default",function(){
  gulp.src("./testfiles/**/*.js")
        .pipe(transport())
        .pipe(gulp.dest("./dist"));
})
    

```

## API

**options.base**

transport时可以指定一个基准路径,使生成的模块ID都是相对于这个基准路径的

Type: `String`
Default: `file.base`
