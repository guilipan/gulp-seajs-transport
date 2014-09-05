gulp-seajs-transport
====================

[![Build Status](https://travis-ci.org/guilipan/gulp-seajs-transport.svg?branch=master)](https://travis-ci.org/guilipan/gulp-seajs-transport)

transport seajs module gulp plugin
用于对seajs模块进行transport化

## Note

与[gulp-transport](https://github.com/popomore/gulp-transport)的区别是本插件不需要每个模块拥有package.json

## Install

```
$ npm install --save-dev gulp-seajs-transport

```

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

Type: `String`

Default: `file.base`

transport时可以指定一个基准路径,使生成的模块ID都是相对于这个基准路径的

如某个文件为`/root/ab/c/d.js`

设置base为`/root/ab`

最后的结果为=>`c/d`

## Licence

MIT
