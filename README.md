gulp-seajs-transport
====================

[![Build Status](https://travis-ci.org/guilipan/gulp-seajs-transport.svg?branch=master)](https://travis-ci.org/guilipan/gulp-seajs-transport)
[![Coverage Status](https://coveralls.io/repos/guilipan/gulp-seajs-transport/badge.png?branch=master)](https://coveralls.io/r/guilipan/gulp-seajs-transport?branch=master)

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
如果要生成一个相对路径的模块

```
var transport = require("gulp-seajs-transport");
var gulp = require("gulp");

gulp.task("default",function(){
  gulp.src("./testfiles/abc/def/ggg.js",{base:"./testfiles/abc"})
        .pipe(transport()) //此时seajs模块id为=>def/ggg
        .pipe(gulp.dest("./dist"));
}) 
   

```

## API (0.1.0版本废弃,使用gulp自带的options设置base来)

**options.base**

Type: `String`

Default: `file.base`

transport时可以指定一个基准路径,使生成的模块ID都是相对于这个基准路径的

如某个文件为`/root/ab/c/d.js`

设置base为`/root/ab`

最后的结果为=>`c/d`


## Change List

0.0.3 => 修复如果输入的是文件夹，整个task会被意外退出的问题

[0.0.4](https://github.com/guilipan/gulp-seajs-transport/issues/2) => 将功能修复为替换define函数部分,而不是重新覆盖整个文件,防止有文件写的是兼容方式
如
```
if (typeof define === "function" && define.cmd) {
  // 有 Sea.js 等 CMD 模块加载器存在
}
```
0.0.5 => 修复待匹配的文件中有$占位符的bug

0.0.6 => 去掉传入目录而不是文件的时候的提示

0.0.7 => 将transport的实现方法替换为cmd-util的抽象语法树方式

0.0.10 => 修复当传入的js文件不属于合法的cmd格式的判断

0.1.0 => 去掉本插件的base路径配置,使用gulp的file自带的
## Licence

MIT
