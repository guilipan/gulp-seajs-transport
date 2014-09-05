var fs = require("fs");

var chai = require("chai");

var expect = chai.expect;

var gutil = require("gulp-util");

var File = gutil.File;

var transport = require("../index");

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
        var fakeFile = new File({
            base: "/test/",
            path: "/test/helloworld.js",
            contents: fs.createReadStream("../testfiles/fake-seajs-module.js")
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
})
