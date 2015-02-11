/**
 * Created by shaynegui on 2015/2/11.
 */
(function () {

	function Animal(a, b) {
		this.a = a;
		this.b = b;
	}

	if (typeof define === "function" && define.cmd) {
		// 有 Sea.js 等 CMD 模块加载器存在
		define(function (require, exports, module) {
			module.exports = Animal;
		})
	}

})()

