/**
 * Created by shaynegui on 2015/2/11.
 */
define(function (require, exports) {
	var U = require('./util');
	var s = require("s")
	var prefix = '', eventPrefix, endEventName, endAnimationName,
		vendors = {Webkit: 'webkit', Moz: '', O: 'o'},
		document = window.document, testEl = document.createElement('div'),
		supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
		transitionProperty, transitionDuration, transitionTiming, transitionDelay,
		animationName, animationDuration, animationTiming, animationDelay,
		cssReset = {}

	function dasherize(str) {
		return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase()
	}

	function normalizeEvent(name) {
		return eventPrefix ? eventPrefix + name : name.toLowerCase()
	}

	U.fn.each(vendors, function (event, vendor) {
		if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
			prefix = '-' + vendor.toLowerCase() + '-'
			eventPrefix = event
			return false
		}
	})
})
