var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var through = require("through2");
var path = require("path");
var util = require("util");
var ast = require('cmd-util').ast;

module.exports = function (options) {

	options = options || {};

	var stream = through.obj(function (file, enc, cb) {


		if (!file) {

			this.emit("error", new PluginError("gulp-seajs-transport", "files can not be empty"));

			return cb();

		}

		else if (file.isNull()) {

			return cb();

		}

		else if (file.isStream()) {

			this.emit("error", new PluginError("gulp-seajs-transport", "streaming not supported"));

			return cb();

		}

		else if (file.isBuffer()) {

			var contents = file.contents.toString();


			transport(file)

			this.push(file);

			cb();
		}

		else {

			gutil.log(gutil.colors.cyan('warning:'), "there's something wrong with the file");

			return cb();
		}
	})

	return stream;

	/*
	 得到模块ID,相对于某个base路径的
	 filepath:/root/ab/c/d.js
	 transportBase:/root/ab

	 =>c/d
	 */
	function parseId(fileRelativePath) {

		var id = fileRelativePath
			.replace(/\\/g, "/")//将windows下的反斜线转成斜线
			.replace(/^\/|\.\w+$/g, "");//去掉路径最前面的斜杠和和后缀

		return id;
	}

	function transport(file) {

		var oldAstSeaModule = ast.parseFirst(file.contents.toString())//{id: 'id', dependencies: ['a'], factory: factoryNode}

		if (!oldAstSeaModule) {

			gutil.log(gutil.colors.cyan('warning:'), "the seajs file " + file.path + " is not valid cmd format")

			return;
		}

		var newId = parseId(file.relative)

		var newAstSeaModule = {id: oldAstSeaModule.id || newId, dependencies: oldAstSeaModule.dependencies, factory: oldAstSeaModule.factory}

		var newContent = ast.modify(file.contents.toString(), newAstSeaModule)

		file.contents = new Buffer(newContent.print_to_string({beautify:true}))

	}
}