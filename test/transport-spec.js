var fs = require("fs");

var chai = require("chai");

var expect = chai.expect;

var gutil = require("gulp-util");

var File = gutil.File;

var transport = require("../index");

var path = require("path");

var fs = require("fs")

describe("gulp的seajs插件,用于transport化seajs模块", function () {

	it("transport化后的seajs模块拥有id和依赖", function (done) {

		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: new Buffer('define(function (require, exports, module) {\
\
            var a=require("./a");\
        var b=require("../dir/b");\
        a.hello();\
\
    })')
		});

		var stream = transport();

		stream.once("data", function (file) {

			var contents = file.contents.toString();

			expect(file.isBuffer()).to.be.true;

			expect(contents).to.contain("helloworld")

				.and.to.contain('["./a","../dir/b"]')

		})

		stream.on("end", done);

		stream.write(fakeFile);

		stream.end();

	})

	it("如果传入的是文件流,抛出stream不支持的异常", function (done) {

		var streamPath = path.join(__dirname, "../testfiles/fake-seajs-module.js");

		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: fs.createReadStream(streamPath)
		});

		var stream = transport();

		stream.on("error", function (error) {
			expect(error).to.be.an.instanceOf(gutil.PluginError);
			expect(error.message).to.include("streaming not supported");
			done();
		})


		stream.write(fakeFile);

	})

	it("如果传入的是空,抛出文件为空的异常", function (done) {

		var stream = transport();

		stream.on("error", function (error) {
			expect(error).to.be.an.instanceOf(gutil.PluginError);
			expect(error.message).to.include("files can not be empty");
			done();
		})


		stream.write();

	})

	it("设置base路径后的transport", function (done) {

		var fakeFile = new File({
			cwd: "/",
			base: "/test/",
			path: "/test/demo/fuck/helloworld.js",
			contents: new Buffer('define(function (require, exports, module) {\
\
            var a=require("./a");\
        var b=require("../dir/b");\
        a.hello();\
\
    })')
		});

		var stream = transport({base: "./test/demo"});

		stream.once("data", function (file) {

			var contents = file.contents.toString();

			expect(file.isBuffer()).to.be.true;

			expect(contents).to.contain("demo/fuck/helloworld")

				.and.to.contain('["./a","../dir/b"]')

		})

		stream.on("end", done);

		stream.write(fakeFile);

		stream.end();

	})

	it("如果file的contents为null,不做任何事情", function (done) {
		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: null
		});

		var stream = transport();

		stream.once("data", function (file) {

			var contents = file.contents;

			expect(contents).to.be.null;

		})

		stream.on("end", done);

		stream.write(fakeFile);

		stream.end();

	})

	it("如果file的content为针对cmd兼容的写法,则只替换旧的部分", function (done) {


		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: fs.readFileSync(path.resolve(__dirname, "../testfiles/fake-seajs-file-with-cmd-wrapper.js"))
		});

		var stream = transport();

		stream.once("data", function (file) {

			var contents = file.contents.toString();

			expect(file.isBuffer()).to.be.true;

			expect(contents)
				.to.contain("function Animal(a,b)")
				.and.to.contain("helloworld")
				.and.to.contain("[]")
			;


		});

		stream.on("end", done);

		stream.write(fakeFile);

		stream.end();
	})

	it("内容里面含有正则表达式", function (done) {
		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: fs.readFileSync(path.resolve(__dirname, "../testfiles/fake-seajs-file-with-regexp.js"))
		})

		var stream = transport();

		stream.once("data", function (file) {

			var contents = file.contents.toString();

			expect(file.isBuffer()).to.be.true;

			expect(contents)
				.to.contain("supportedTransforms")
				.and.to.contain("/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i")
				.and.to.contain('str.replace(/([a-z])([A-Z])/,"$1-$2"');


		});

		stream.on("end", done);

		stream.write(fakeFile);

		stream.end();
	})

	it("如果传入js文件内容不是有效的cmd格式,给出警告", function (done) {


		var fakeFile = new File({
			base: "/test/",
			path: "/test/helloworld.js",
			contents: new Buffer("")
		})

		var stream = transport();

		stream.on("data", function (file) {
			expect(file.contents.toString()).to.be.empty
		})

		stream.on("end",done)
		stream.write(fakeFile);

		stream.end()
	})
})
