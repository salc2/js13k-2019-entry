/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fpsmeter/dist/fpsmeter.js":
/*!************************************************!*\
  !*** ./node_modules/fpsmeter/dist/fpsmeter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * FPSMeter 0.3.1 - 9th May 2013
 * https://github.com/Darsain/fpsmeter
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 */
;(function (w, undefined) {
	'use strict';

	/**
	 * Create a new element.
	 *
	 * @param  {String} name Element type name.
	 *
	 * @return {Element}
	 */
	function newEl(name) {
		return document.createElement(name);
	}

	/**
	 * Apply theme CSS properties to element.
	 *
	 * @param  {Element} element DOM element.
	 * @param  {Object}  theme   Theme object.
	 *
	 * @return {Element}
	 */
	function applyTheme(element, theme) {
		for (var name in theme) {
			try {
				element.style[name] = theme[name];
			} catch (e) {}
		}
		return element;
	}

	/**
	 * Return type of the value.
	 *
	 * @param  {Mixed} value
	 *
	 * @return {String}
	 */
	function type(value) {
		if (value == null) {
			return String(value);
		}

		if (typeof value === 'object' || typeof value === 'function') {
			return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLowerCase() || 'object';
		}

		return typeof value;
	}

	/**
	 * Check whether the value is in an array.
	 *
	 * @param  {Mixed} value
	 * @param  {Array} array
	 *
	 * @return {Integer} Array index or -1 when not found.
	 */
	function inArray(value, array) {
		if (type(array) !== 'array') {
			return -1;
		}
		if (array.indexOf) {
			return array.indexOf(value);
		}
		for (var i = 0, l = array.length; i < l; i++) {
			if (array[i] === value) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Poor man's deep object extend.
	 *
	 * Example:
	 *   extend({}, defaults, options);
	 *
	 * @return {Void}
	 */
	function extend() {
		var args = arguments;
		for (var key in args[1]) {
			if (args[1].hasOwnProperty(key)) {
				switch (type(args[1][key])) {
					case 'object':
						args[0][key] = extend({}, args[0][key], args[1][key]);
						break;

					case 'array':
						args[0][key] = args[1][key].slice(0);
						break;

					default:
						args[0][key] = args[1][key];
				}
			}
		}
		return args.length > 2 ?
			extend.apply(null, [args[0]].concat(Array.prototype.slice.call(args, 2))) :
			args[0];
	}

	/**
	 * Convert HSL color to HEX string.
	 *
	 * @param  {Array} hsl Array with [hue, saturation, lightness].
	 *
	 * @return {Array} Array with [red, green, blue].
	 */
	function hslToHex(h, s, l) {
		var r, g, b;
		var v, min, sv, sextant, fract, vsf;

		if (l <= 0.5) {
			v = l * (1 + s);
		} else {
			v = l + s - l * s;
		}

		if (v === 0) {
			return '#000';
		} else {
			min = 2 * l - v;
			sv = (v - min) / v;
			h = 6 * h;
			sextant = Math.floor(h);
			fract = h - sextant;
			vsf = v * sv * fract;
			if (sextant === 0 || sextant === 6) {
				r = v;
				g = min + vsf;
				b = min;
			} else if (sextant === 1) {
				r = v - vsf;
				g = v;
				b = min;
			} else if (sextant === 2) {
				r = min;
				g = v;
				b = min + vsf;
			} else if (sextant === 3) {
				r = min;
				g = v - vsf;
				b = v;
			} else if (sextant === 4) {
				r = min + vsf;
				g = min;
				b = v;
			} else {
				r = v;
				g = min;
				b = v - vsf;
			}
			return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
	}

	/**
	 * Helper function for hslToHex.
	 */
	function componentToHex(c) {
		c = Math.round(c * 255).toString(16);
		return c.length === 1 ? '0' + c : c;
	}

	/**
	 * Manage element event listeners.
	 *
	 * @param  {Node}     element
	 * @param  {Event}    eventName
	 * @param  {Function} handler
	 * @param  {Bool}     remove
	 *
	 * @return {Void}
	 */
	function listener(element, eventName, handler, remove) {
		if (element.addEventListener) {
			element[remove ? 'removeEventListener' : 'addEventListener'](eventName, handler, false);
		} else if (element.attachEvent) {
			element[remove ? 'detachEvent' : 'attachEvent']('on' + eventName, handler);
		}
	}

	// Preferred timing funtion
	var getTime;
	(function () {
		var perf = w.performance;
		if (perf && (perf.now || perf.webkitNow)) {
			var perfNow = perf.now ? 'now' : 'webkitNow';
			getTime = perf[perfNow].bind(perf);
		} else {
			getTime = function () {
				return +new Date();
			};
		}
	}());

	// Local WindowAnimationTiming interface polyfill
	var cAF = w.cancelAnimationFrame || w.cancelRequestAnimationFrame;
	var rAF = w.requestAnimationFrame;
	(function () {
		var vendors = ['moz', 'webkit', 'o'];
		var lastTime = 0;

		// For a more accurate WindowAnimationTiming interface implementation, ditch the native
		// requestAnimationFrame when cancelAnimationFrame is not present (older versions of Firefox)
		for (var i = 0, l = vendors.length; i < l && !cAF; ++i) {
			cAF = w[vendors[i]+'CancelAnimationFrame'] || w[vendors[i]+'CancelRequestAnimationFrame'];
			rAF = cAF && w[vendors[i]+'RequestAnimationFrame'];
		}

		if (!cAF) {
			rAF = function (callback) {
				var currTime = getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				lastTime = currTime + timeToCall;
				return w.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
			};

			cAF = function (id) {
				clearTimeout(id);
			};
		}
	}());

	// Property name for assigning element text content
	var textProp = type(document.createElement('div').textContent) === 'string' ? 'textContent' : 'innerText';

	/**
	 * FPSMeter class.
	 *
	 * @param {Element} anchor  Element to append the meter to. Default is document.body.
	 * @param {Object}  options Object with options.
	 */
	function FPSMeter(anchor, options) {
		// Optional arguments
		if (type(anchor) === 'object' && anchor.nodeType === undefined) {
			options = anchor;
			anchor = document.body;
		}
		if (!anchor) {
			anchor = document.body;
		}

		// Private properties
		var self = this;
		var o = extend({}, FPSMeter.defaults, options || {});

		var el = {};
		var cols = [];
		var theme, heatmaps;
		var heatDepth = 100;
		var heating = [];

		var thisFrameTime = 0;
		var frameTime = o.threshold;
		var frameStart = 0;
		var lastLoop = getTime() - frameTime;
		var time;

		var fpsHistory = [];
		var durationHistory = [];

		var frameID, renderID;
		var showFps = o.show === 'fps';
		var graphHeight, count, i, j;

		// Exposed properties
		self.options = o;
		self.fps = 0;
		self.duration = 0;
		self.isPaused = 0;

		/**
		 * Tick start for measuring the actual rendering duration.
		 *
		 * @return {Void}
		 */
		self.tickStart = function () {
			frameStart = getTime();
		};

		/**
		 * FPS tick.
		 *
		 * @return {Void}
		 */
		self.tick = function () {
			time = getTime();
			thisFrameTime = time - lastLoop;
			frameTime += (thisFrameTime - frameTime) / o.smoothing;
			self.fps = 1000 / frameTime;
			self.duration = frameStart < lastLoop ? frameTime : time - frameStart;
			lastLoop = time;
		};

		/**
		 * Pause display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.pause = function () {
			if (frameID) {
				self.isPaused = 1;
				clearTimeout(frameID);
				cAF(frameID);
				cAF(renderID);
				frameID = renderID = 0;
			}
			return self;
		};

		/**
		 * Resume display rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.resume = function () {
			if (!frameID) {
				self.isPaused = 0;
				requestRender();
			}
			return self;
		};

		/**
		 * Update options.
		 *
		 * @param {String} name  Option name.
		 * @param {Mixed}  value New value.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.set = function (name, value) {
			o[name] = value;
			showFps = o.show === 'fps';

			// Rebuild or reposition elements when specific option has been updated
			if (inArray(name, rebuilders) !== -1) {
				createMeter();
			}
			if (inArray(name, repositioners) !== -1) {
				positionMeter();
			}
			return self;
		};

		/**
		 * Change meter into rendering duration mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.showDuration = function () {
			self.set('show', 'ms');
			return self;
		};

		/**
		 * Change meter into FPS mode.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.showFps = function () {
			self.set('show', 'fps');
			return self;
		};

		/**
		 * Toggles between show: 'fps' and show: 'duration'.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.toggle = function () {
			self.set('show', showFps ? 'ms' : 'fps');
			return self;
		};

		/**
		 * Hide the FPSMeter. Also pauses the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.hide = function () {
			self.pause();
			el.container.style.display = 'none';
			return self;
		};

		/**
		 * Show the FPSMeter. Also resumes the rendering.
		 *
		 * @return {Object} FPSMeter instance.
		 */
		self.show = function () {
			self.resume();
			el.container.style.display = 'block';
			return self;
		};

		/**
		 * Check the current FPS and save it in history.
		 *
		 * @return {Void}
		 */
		function historyTick() {
			for (i = o.history; i--;) {
				fpsHistory[i] = i === 0 ? self.fps : fpsHistory[i-1];
				durationHistory[i] = i === 0 ? self.duration : durationHistory[i-1];
			}
		}

		/**
		 * Returns heat hex color based on values passed.
		 *
		 * @param  {Integer} heatmap
		 * @param  {Integer} value
		 * @param  {Integer} min
		 * @param  {Integer} max
		 *
		 * @return {Integer}
		 */
		function getHeat(heatmap, value, min, max) {
			return heatmaps[0|heatmap][Math.round(Math.min((value - min) / (max - min) * heatDepth, heatDepth))];
		}

		/**
		 * Update counter number and legend.
		 *
		 * @return {Void}
		 */
		function updateCounter() {
			// Update legend only when changed
			if (el.legend.fps !== showFps) {
				el.legend.fps = showFps;
				el.legend[textProp] = showFps ? 'FPS' : 'ms';
			}
			// Update counter with a nicely formated & readable number
			count = showFps ? self.fps : self.duration;
			el.count[textProp] = count > 999 ? '999+' : count.toFixed(count > 99 ? 0 : o.decimals);
		}

		/**
		 * Render current FPS state.
		 *
		 * @return {Void}
		 */
		function render() {
			time = getTime();
			// If renderer stopped reporting, do a simulated drop to 0 fps
			if (lastLoop < time - o.threshold) {
				self.fps -= self.fps / Math.max(1, o.smoothing * 60 / o.interval);
				self.duration = 1000 / self.fps;
			}

			historyTick();
			updateCounter();

			// Apply heat to elements
			if (o.heat) {
				if (heating.length) {
					for (i = heating.length; i--;) {
						heating[i].el.style[theme[heating[i].name].heatOn] = showFps ?
							getHeat(theme[heating[i].name].heatmap, self.fps, 0, o.maxFps) :
							getHeat(theme[heating[i].name].heatmap, self.duration, o.threshold, 0);
					}
				}

				if (el.graph && theme.column.heatOn) {
					for (i = cols.length; i--;) {
						cols[i].style[theme.column.heatOn] = showFps ?
							getHeat(theme.column.heatmap, fpsHistory[i], 0, o.maxFps) :
							getHeat(theme.column.heatmap, durationHistory[i], o.threshold, 0);
					}
				}
			}

			// Update graph columns height
			if (el.graph) {
				for (j = 0; j < o.history; j++) {
					cols[j].style.height = (showFps ?
						(fpsHistory[j] ? Math.round(graphHeight / o.maxFps * Math.min(fpsHistory[j], o.maxFps)) : 0) :
						(durationHistory[j] ? Math.round(graphHeight / o.threshold * Math.min(durationHistory[j], o.threshold)) : 0)
					) + 'px';
				}
			}
		}

		/**
		 * Request rendering loop.
		 *
		 * @return {Int} Animation frame index.
		 */
		function requestRender() {
			if (o.interval < 20) {
				frameID = rAF(requestRender);
				render();
			} else {
				frameID = setTimeout(requestRender, o.interval);
				renderID = rAF(render);
			}
		}

		/**
		 * Meter events handler.
		 *
		 * @return {Void}
		 */
		function eventHandler(event) {
			event = event || window.event;
			if (event.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				event.returnValue = false;
				event.cancelBubble = true;
			}
			self.toggle();
		}

		/**
		 * Destroys the current FPSMeter instance.
		 *
		 * @return {Void}
		 */
		self.destroy = function () {
			// Stop rendering
			self.pause();
			// Remove elements
			removeMeter();
			// Stop listening
			self.tick = self.tickStart = function () {};
		};

		/**
		 * Remove meter element.
		 *
		 * @return {Void}
		 */
		function removeMeter() {
			// Unbind listeners
			if (o.toggleOn) {
				listener(el.container, o.toggleOn, eventHandler, 1);
			}
			// Detach element
			anchor.removeChild(el.container);
		}

		/**
		 * Sets the theme, and generates heatmaps when needed.
		 */
		function setTheme() {
			theme = FPSMeter.theme[o.theme];

			// Generate heatmaps
			heatmaps = theme.compiledHeatmaps || [];
			if (!heatmaps.length && theme.heatmaps.length) {
				for (j = 0; j < theme.heatmaps.length; j++) {
					heatmaps[j] = [];
					for (i = 0; i <= heatDepth; i++) {
						heatmaps[j][i] = hslToHex(0.33 / heatDepth * i, theme.heatmaps[j].saturation, theme.heatmaps[j].lightness);
					}
				}
				theme.compiledHeatmaps = heatmaps;
			}
		}

		/**
		 * Creates and attaches the meter element.
		 *
		 * @return {Void}
		 */
		function createMeter() {
			// Remove old meter if present
			if (el.container) {
				removeMeter();
			}

			// Set theme
			setTheme();

			// Create elements
			el.container = applyTheme(newEl('div'), theme.container);
			el.count = el.container.appendChild(applyTheme(newEl('div'), theme.count));
			el.legend = el.container.appendChild(applyTheme(newEl('div'), theme.legend));
			el.graph = o.graph ? el.container.appendChild(applyTheme(newEl('div'), theme.graph)) : 0;

			// Add elements to heating array
			heating.length = 0;
			for (var key in el) {
				if (el[key] && theme[key].heatOn) {
					heating.push({
						name: key,
						el: el[key]
					});
				}
			}

			// Graph
			cols.length = 0;
			if (el.graph) {
				// Create graph
				el.graph.style.width = (o.history * theme.column.width + (o.history - 1) * theme.column.spacing) + 'px';

				// Add columns
				for (i = 0; i < o.history; i++) {
					cols[i] = el.graph.appendChild(applyTheme(newEl('div'), theme.column));
					cols[i].style.position = 'absolute';
					cols[i].style.bottom = 0;
					cols[i].style.right = (i * theme.column.width + i * theme.column.spacing) + 'px';
					cols[i].style.width = theme.column.width + 'px';
					cols[i].style.height = '0px';
				}
			}

			// Set the initial state
			positionMeter();
			updateCounter();

			// Append container to anchor
			anchor.appendChild(el.container);

			// Retrieve graph height after it was appended to DOM
			if (el.graph) {
				graphHeight = el.graph.clientHeight;
			}

			// Add event listeners
			if (o.toggleOn) {
				if (o.toggleOn === 'click') {
					el.container.style.cursor = 'pointer';
				}
				listener(el.container, o.toggleOn, eventHandler);
			}
		}

		/**
		 * Positions the meter based on options.
		 *
		 * @return {Void}
		 */
		function positionMeter() {
			applyTheme(el.container, o);
		}

		/**
		 * Construct.
		 */
		(function () {
			// Create meter element
			createMeter();
			// Start rendering
			requestRender();
		}());
	}

	// Expose the extend function
	FPSMeter.extend = extend;

	// Expose the FPSMeter class
	window.FPSMeter = FPSMeter;

	// Default options
	FPSMeter.defaults = {
		interval:  100,     // Update interval in milliseconds.
		smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
		show:      'fps',   // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
		toggleOn:  'click', // Toggle between show 'fps' and 'ms' on this event.
		decimals:  1,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
		maxFps:    60,      // Max expected FPS value.
		threshold: 100,     // Minimal tick reporting interval in milliseconds.

		// Meter position
		position: 'absolute', // Meter position.
		zIndex:   10,         // Meter Z index.
		left:     '5px',      // Meter left offset.
		top:      '5px',      // Meter top offset.
		right:    'auto',     // Meter right offset.
		bottom:   'auto',     // Meter bottom offset.
		margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

		// Theme
		theme: 'dark', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
		heat:  0,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

		// Graph
		graph:   0, // Whether to show history graph.
		history: 20 // How many history states to show in a graph.
	};

	// Option names that trigger FPSMeter rebuild or reposition when modified
	var rebuilders = [
		'toggleOn',
		'theme',
		'heat',
		'graph',
		'history'
	];
	var repositioners = [
		'position',
		'zIndex',
		'left',
		'top',
		'right',
		'bottom',
		'margin'
	];
}(window));
;(function (w, FPSMeter, undefined) {
	'use strict';

	// Themes object
	FPSMeter.theme = {};

	// Base theme with layout, no colors
	var base = FPSMeter.theme.base = {
		heatmaps: [],
		container: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			padding: '5px',
			minWidth: '95px',
			height: '30px',
			lineHeight: '30px',
			textAlign: 'right',
			textShadow: 'none'
		},
		count: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'absolute',
			top: 0,
			right: 0,
			padding: '5px 10px',
			height: '30px',
			fontSize: '24px',
			fontFamily: 'Consolas, Andale Mono, monospace',
			zIndex: 2
		},
		legend: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'absolute',
			top: 0,
			left: 0,
			padding: '5px 10px',
			height: '30px',
			fontSize: '12px',
			lineHeight: '32px',
			fontFamily: 'sans-serif',
			textAlign: 'left',
			zIndex: 2
		},
		graph: {
			// Settings
			heatOn: null,
			heatmap: null,

			// Styles
			position: 'relative',
			boxSizing: 'padding-box',
			MozBoxSizing: 'padding-box',
			height: '100%',
			zIndex: 1
		},
		column: {
			// Settings
			width: 4,
			spacing: 1,
			heatOn: null,
			heatmap: null
		}
	};

	// Dark theme
	FPSMeter.theme.dark = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.8,
			lightness: 0.8
		}],
		container: {
			background: '#222',
			color: '#fff',
			border: '1px solid #1a1a1a',
			textShadow: '1px 1px 0 #222'
		},
		count: {
			heatOn: 'color'
		},
		column: {
			background: '#3f3f3f'
		}
	});

	// Light theme
	FPSMeter.theme.light = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.5,
			lightness: 0.5
		}],
		container: {
			color: '#666',
			background: '#fff',
			textShadow: '1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)',
			boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
		},
		count: {
			heatOn: 'color'
		},
		column: {
			background: '#eaeaea'
		}
	});

	// Colorful theme
	FPSMeter.theme.colorful = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.5,
			lightness: 0.6
		}],
		container: {
			heatOn: 'backgroundColor',
			background: '#888',
			color: '#fff',
			textShadow: '1px 1px 0 rgba(0,0,0,.2)',
			boxShadow: '0 0 0 1px rgba(0,0,0,.1)'
		},
		column: {
			background: '#777',
			backgroundColor: 'rgba(0,0,0,.2)'
		}
	});

	// Transparent theme
	FPSMeter.theme.transparent = FPSMeter.extend({}, base, {
		heatmaps: [{
			saturation: 0.8,
			lightness: 0.5
		}],
		container: {
			padding: 0,
			color: '#fff',
			textShadow: '1px 1px 0 rgba(0,0,0,.5)'
		},
		count: {
			padding: '0 5px',
			height: '40px',
			lineHeight: '40px'
		},
		legend: {
			padding: '0 5px',
			height: '40px',
			lineHeight: '42px'
		},
		graph: {
			height: '40px'
		},
		column: {
			width: 5,
			background: '#999',
			heatOn: 'backgroundColor',
			opacity: 0.5
		}
	});
}(window, FPSMeter));

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./lib/tiny-canvas.js */ "./src/lib/tiny-canvas.js");
__webpack_require__(/*! ./lib/sounds.js */ "./src/lib/sounds.js");
__webpack_require__(/*! fpsmeter */ "./node_modules/fpsmeter/dist/fpsmeter.js");
const fpsM = new FPSMeter();
let rnd = Math.random;
var S;
(function (S) {
    S[S["M"] = 0] = "M";
    S[S["G"] = 1] = "G";
    S[S["GO"] = 2] = "GO";
})(S || (S = {}));
var Dir;
(function (Dir) {
    Dir[Dir["L"] = 0] = "L";
    Dir[Dir["R"] = 1] = "R";
})(Dir || (Dir = {}));
var EventType;
(function (EventType) {
    EventType[EventType["RP"] = 0] = "RP";
    EventType[EventType["LR"] = 1] = "LR";
    EventType[EventType["RR"] = 2] = "RR";
    EventType[EventType["LP"] = 3] = "LP";
    EventType[EventType["JP"] = 4] = "JP";
    EventType[EventType["UP"] = 5] = "UP";
    EventType[EventType["AP"] = 6] = "AP";
    EventType[EventType["AR"] = 7] = "AR";
})(EventType || (EventType = {}));
var canvas = TC(document.getElementById('c'));
function rdnAngle() {
    const v = (rnd() * (125 - 0) + 0) / 1000;
    if (rnd() >= 0.5) {
        return (2 - v) * Math.PI;
    }
    else {
        return v * Math.PI;
    }
}
function getAABB(b) {
    return {
        lt: { x: b.p.x, y: b.p.y },
        rt: { x: b.p.x + b.w, y: b.p.y },
        rb: { x: b.p.x + b.w, y: b.p.y + b.h },
        lb: { x: b.p.x, y: b.p.y + b.h }
    };
}
function getTileIndeces(v) {
    return Math.floor(v.y / 20 /* tileSize */) * 50 /* worldSize */ + Math.floor(v.x / 20);
}
function collide(body1, body2) {
    const result = body1.p.x < (body2.p.x + body2.w) &&
        body1.p.x + (body1.w) > body2.p.x &&
        body1.p.y < body2.p.y + body2.h &&
        body1.p.y + body1.h > body2.p.y;
    return result;
}
exports.collide = collide;
function loadTextures(urls) {
    return new Promise((resolver, rejects) => {
        let result = new Array();
        urls.forEach((url, index) => {
            const img = new Image;
            img.src = url;
            img.onload = () => {
                const g = document.createElement("canvas").getContext("2d");
                g.canvas.height = img.height;
                g.canvas.width = img.width;
                g.drawImage(img, 0, 0, img.width, img.height);
                const tex1 = {
                    w: img.width,
                    h: img.height,
                    t: TCTex(canvas.g, g.canvas, img.width, img.height)
                };
                g.clearRect(0, 0, img.width, img.height);
                g.save();
                g.scale(-1, 1);
                g.drawImage(img, img.width * -1, 0, img.width, img.height);
                g.restore();
                const tex2 = {
                    w: img.width,
                    h: img.height,
                    t: TCTex(canvas.g, g.canvas, img.width, img.height)
                };
                var i = index * 2;
                result[i++] = tex1;
                result[i] = tex2;
                if (index == urls.length - 1) {
                    setTimeout(() => {
                        resolver(result);
                    }, 1000);
                }
            };
        });
    });
}
function createBulletTexture() {
    const g = document.createElement("canvas").getContext("2d");
    g.canvas.width = 4;
    g.canvas.height = 4;
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = '#ff6';
    g.beginPath();
    g.arc(2, 2, 2, 0, 2 * Math.PI);
    g.fill();
    return TCTex(canvas.g, g.canvas, 4, 4);
}
loadTextures(["sh.png", "h.png", "bh.png",
    "m.png", "f.png", "sr.png", "si.png",
    "ss.png", "b.png", "a.png"]).then((textures) => {
    const [rSolHost, lSolHost, rHost, lHost, rbotHit, lbotHit, , lMountain, rightFloor, leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot, abc, ,] = textures;
    const bulletTexture = createBulletTexture();
    let currentDelta = 0.0;
    let currentTime = 0.0;
    let currentAction = null;
    const GRAVITY = 10;
    let score = 0;
    let addScore = 0;
    let toNextScore = 10;
    const JUMP_VEL = 30;
    const WALK_SPEED = 6;
    let startTime = 0;
    let id = 0;
    const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height];
    let particles = [];
    let persistence = [];
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) * 0.3,
            y: (evt.clientY - rect.top) * 0.15
        };
    }
    function initBullets(num) {
        const bs = [];
        for (let i = 0; i < num; i++) {
            bs.push({ p: { x: 50, y: 50 }, v: { x: 0, y: 0 }, vi: false, d: Dir.L, w: 4, h: 4 });
        }
        return bs;
    }
    function initHosta(num) {
        const bs = [];
        for (let i = 0; i < num; i++) {
            bs.push({ p: { x: 250, y: 0 }, v: { x: 0, y: 0 }, vi: true, d: Dir.L, w: 16, h: 16 });
        }
        return bs;
    }
    function newEnemy(x, y, vel) {
        return {
            p: { x: x, y: y },
            v: { x: vel, y: 0.0 },
            d: Dir.L,
            w: 20,
            h: 20,
            vi: false,
            hi: false,
            l: 3
        };
    }
    function newEnemies(x, y, n) {
        const es = [];
        for (var i = 0; i < n; i++) {
            es.push(newEnemy(x, y, WALK_SPEED * rnd() * (3.9 - 1.7) + 1.7));
        }
        return es;
    }
    const cam = { p: { x: 0, y: 0 }, w: 300, h: 150 };
    window["cam"] = cam;
    let camCenter = cam.p;
    let radioToShake = 0;
    let shake = false;
    function shaking() {
        const x = 0, y = 0;
        const ang = rnd() % Math.PI * 2;
        const nx = Math.sin(ang) * radioToShake;
        const ny = Math.cos(ang) * radioToShake;
        cam.p.x = x + nx;
        cam.p.y = y + ny;
        radioToShake *= 0.9;
    }
    /*   canvas.g.canvas.addEventListener("click", (event) => {
        const pos = getMousePos(canvas.g.canvas, event)
        for(var i = 0; i < currentState.hostages.length; i++){
          const host = currentState.hostages[i]
            host.position.x = cam.position.x+pos.x
            host.position.y = cam.position.y+pos.y
            host.visible = true
        }
      }) */
    canvas.g.canvas.addEventListener("click", (event) => {
        let take = 1;
        const pos = getMousePos(canvas.g.canvas, event);
        for (var i = 0; i < currentState.es.length; i++) {
            const ene = currentState.es[i];
            if (!ene.vi && take > 0) {
                ene.p.x = cam.p.x + pos.x;
                ene.p.y = cam.p.y + pos.y;
                ene.vi = true;
                ene.vi = true;
                ene.l = 5;
                ene.v.x = rnd() * (3.9 - 1.7) + 1.7 * (currentState.p.p.x > ene.p.x ?
                    WALK_SPEED : -WALK_SPEED);
                ene.d = ene.v.x > 0 ? Dir.L : Dir.R;
                take--;
            }
        }
    });
    function explodeParticles(x, y) {
        var rnd = Math.random;
        const sp = WALK_SPEED * 2;
        const jp = JUMP_VEL * 3;
        for (var i = 0; i < 10; i++) {
            const vx = rnd() * (sp - (-sp)) + (-sp);
            const vy = rnd() * (jp - (-jp)) + (-jp);
            var angle = rnd() * Math.PI * 2;
            particles.push({ p: { x: x, y: y }, v: { x: vx * Math.cos(angle), y: vy * Math.sin(angle) }, d: Dir.L, h: 4, w: 4, vi: true });
        }
    }
    let currentState = {
        p: {
            p: { x: 128, y: 0.0 },
            v: { x: 0.0, y: 0.0 },
            d: Dir.R,
            s: false,
            w: 20,
            h: 20,
            vi: true,
            l: 3
        },
        es: newEnemies(34, 0, 50),
        bs: initBullets(60),
        hs: initHosta(1),
        s: S.M
    };
    const FLOOR = height - 10;
    const SECOND_FLOOR = FLOOR * 0.7;
    const zone = { p: { x: 50, y: FLOOR }, v: { x: 0, y: 0 }, vi: true, d: Dir.L, w: 150, h: 20 };
    function createFloor(x, y, width) {
        return { p: { x: x, y: y }, w: width, h: 20, d: Dir.L, v: { x: 0, y: 0 }, vi: true };
    }
    const floors = [createFloor(0.0, FLOOR, 900), createFloor(200.0, SECOND_FLOOR, 260), createFloor(300.0, SECOND_FLOOR, 360)];
    const keepAnimation = (time) => {
        currentDelta = (time - startTime) / 100;
        currentTime = time;
        startTime = time;
        render(currentState);
        update(currentAction, currentState);
        currentAction = null;
        id = requestAnimationFrame(keepAnimation);
    };
    function runGame() {
        requestAnimationFrame(keepAnimation);
    }
    const handlerStart = (ev) => {
        switch (ev.currentTarget['id']) {
            case "a":
                currentAction = EventType.JP;
                break;
            case "b":
                currentAction = EventType.AP;
                break;
            case "left":
                currentAction = EventType.LP;
                break;
            case "right":
                currentAction = EventType.RP;
                break;
            default:
                // code...
                break;
        }
    };
    const handlerEnd = (ev) => {
        switch (ev.currentTarget['id']) {
            case "b":
                currentAction = EventType.AR;
                break;
            case "left":
                currentAction = EventType.LR;
                break;
            case "right":
                currentAction = EventType.RR;
                break;
            default:
                // code...
                break;
        }
    };
    const svgs = document.querySelectorAll("rect");
    const psOp = { passive: true };
    svgs.forEach(rec => {
        rec.addEventListener("touchstart", handlerStart, psOp);
        rec.addEventListener("touchend", handlerEnd, psOp);
    });
    const handlerKBDown = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LP;
                break;
            case 39:
                currentAction = EventType.RP;
                break;
            case 38:
                currentAction = EventType.JP;
                break;
            case 13:
                currentAction = EventType.UP;
                break;
            case 32:
                currentAction = EventType.AP;
                break;
            default:
                break;
        }
    };
    window.addEventListener('keydown', handlerKBDown, true);
    const handlerKBUp = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LR;
                break;
            case 39:
                currentAction = EventType.RR;
                break;
            case 32:
                currentAction = EventType.AR;
                break;
            default:
                break;
        }
    };
    window.addEventListener('keyup', handlerKBUp, true);
    function BodyAnimation(rightT, leftT, ticksPerFrame, loop, frames) {
        const nFrames = frames.length;
        let frameIndex = 0, tickCount = 0;
        this.reset = function () {
            if (!(frameIndex < nFrames - 1)) {
                frameIndex = 0;
            }
        };
        this.update = function (p) {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                if (frameIndex < frames.length - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                }
                else if (loop) {
                    frameIndex = 0;
                }
            }
            const [v0, u0, v1, u1] = frames[frameIndex];
            let text = p.d == Dir.R ? rightT : leftT;
            canvas.img(text.t, -cam.p.x + (p.p.x + (p.w / 2)), -cam.p.y + p.p.y, p.w, p.h, v0, u0, v1, u1);
        };
    }
    /*   function isOverFloor(b: Body): boolean{
        return b.position.y + b.height == FLOOR || collideFloorBottom(b,secondFloorBody);
      }
     */
    function isOverFloor(b) {
        let floorBottoms = false;
        for (var i = 0; i < floors.length; i++) {
            floorBottoms = floorBottoms || collideFloorBottom(b, floors[i]);
        }
        return b.p.y + b.h == FLOOR || floorBottoms;
    }
    const botHittedAnim = new BodyAnimation(rbotHit, lbotHit, 2, true, [[0, 0, 1, 1]]);
    const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const ONETHIRD = 1 / 3;
    const soldierHostAni = new BodyAnimation(rSolHost, lSolHost, 14, false, [[0, 0, 1, ONETHIRD], [0, ONETHIRD, 1, ONETHIRD * 2], [0, ONETHIRD * 2, 1, 1]]);
    const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const hostAnim = new BodyAnimation(rHost, lHost, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]]);
    const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]]);
    let gunReady = 0;
    let jumpTries = 2;
    let ticksHitted = 0;
    function update(a, m) {
        if (m.s == S.G) {
            if (radioToShake > 0.0002) {
                shaking();
            }
            const p = m.p;
            if (isOverFloor(p)) {
                jumpTries = 2;
            }
            switch (a) {
                case EventType.JP:
                    if (jumpTries > 0) {
                        jumpTries--;
                        p.v.y = p.c ? -JUMP_VEL / 2 : -JUMP_VEL;
                        jumpSound();
                    }
                    p.s = false;
                    break;
                case EventType.LP:
                    p.d = Dir.L;
                    p.v.x = p.c ? -WALK_SPEED / 2 : -WALK_SPEED;
                    p.s = false;
                    break;
                case EventType.RP:
                    p.d = Dir.R;
                    p.v.x = p.c ? WALK_SPEED / 2 : WALK_SPEED;
                    p.s = false;
                    break;
                case EventType.LR:
                    p.v.x = 0;
                    break;
                case EventType.RR:
                    p.v.x = 0;
                    break;
                case EventType.AP:
                    if (!m.p.c) {
                        shootingAnim.reset();
                        p.s = true;
                        p.v.x = (p.d == Dir.L ? 1.5 : -1.5);
                        for (var i = 0; i < m.bs.length; i++) {
                            const b = m.bs[i];
                            if (!b.vi && gunReady == 0) {
                                const angle = rdnAngle();
                                b.p.x = p.p.x + p.w + b.w;
                                b.p.y = p.p.y + (p.h / 2.4);
                                b.v.x = (p.d == Dir.R ? 35 : -35) * Math.cos(angle);
                                b.v.y = 5 * Math.sin(angle);
                                b.vi = true;
                                gunReady = 3;
                                fireSound();
                                radioToShake = 2;
                                break;
                            }
                        }
                    }
                    else {
                        let host = m.p.c;
                        host.vi = true;
                        host.p.x = m.p.d == Dir.L ? m.p.p.x - 25 : m.p.p.x + 25;
                        host.p.y = m.p.p.y - 10;
                        m.p.c = null;
                    }
                    break;
                case EventType.AR:
                    p.v.x = 0;
                    //p.shooting = false
                    //ShootingAnim.reset()
                    break;
                default:
                    break;
            }
            move(m.p);
            for (var i = 0; i < m.hs.length; i++) {
                const h = m.hs[i];
                move(h);
                if (h.vi && collide(m.p, h) && !m.p.c) {
                    h.vi = false;
                    m.p.c = h;
                }
                if (h.vi && collide(h, zone)) {
                    addScore += 500;
                    h.vi = false;
                }
            }
            for (var i = 0; i < m.es.length; i++) {
                const e = m.es[i];
                ticksHitted = Math.max(ticksHitted - 1, 0);
                if (ticksHitted == 0) {
                    e.hi = false;
                }
                move(e);
                if (e.p.x < 0 || (e.p.x + 20 > 900)) {
                    e.v.x = e.v.x * -1;
                    e.d = e.v.x > 0 ? Dir.L : Dir.R;
                }
                for (var j = 0; j < m.bs.length; j++) {
                    const b = m.bs[j];
                    if (e.vi && b.vi && collide(b, e)) {
                        hitSound();
                        e.hi = true;
                        ticksHitted = 8;
                        e.p.x += (b.v.x > 0 ? +18 : -18);
                        if (e.l == 0) {
                            radioToShake = 4;
                            explodeParticles(e.p.x + (e.w / 2), e.p.y + (e.h / 2));
                            e.vi = false;
                            e.v.x = 0;
                            addScore += 100;
                        }
                        else {
                            e.l = Math.max(e.l - 1, 0);
                        }
                        b.vi = false;
                        b.v.x = 0;
                    }
                }
                if (e.vi && collide(e, m.p)) {
                    m.p.l--;
                }
            }
            for (var i = 0; i < m.bs.length; i++) {
                const b = m.bs[i];
                moveBullet(b);
            }
            for (var i = 0; i < particles.length; i++) {
                const p = particles[i];
                move(p);
                for (var f = 0; f < floors.length; f++) {
                    if (collideFloorBottom(p, floors[f])) {
                        particles.splice(i, 1);
                        persistence.push(p);
                    }
                }
            }
            gunReady = Math.max(0, gunReady - 1);
            moveCam(m.p);
            if (toNextScore <= 0 && addScore > 0) {
                score += 10;
                coinSound();
                toNextScore = 10;
                addScore = Math.max(addScore - 10, 0);
            }
            toNextScore--;
            zone.p.y += ((FLOOR - 10) - zone.p.y) * 0.1;
            zone.p.y = Math.floor(zone.p.y) == FLOOR - 10 ? FLOOR : zone.p.y;
        }
        else if (m.s == S.M) {
            if (a == EventType.AP) {
                m.s = S.G;
            }
        }
    }
    function moveCam(b) {
        cam.p.x = Math.max(b.p.x - (cam.w / 2), 0);
    }
    function renderMountain() {
        canvas.push();
        canvas.scale(6, 6);
        for (var x = 0; x < 100; x += 20) {
            canvas.img(lMountain.t, (-cam.p.x * 0.06) + x, (-cam.p.y * 0.06) + 5, lMountain.w, lMountain.h, 0, 0, 1, 1);
        }
        canvas.pop();
    }
    function renderFloor() {
        for (var f = 0; f < floors.length; f++) {
            const floor = floors[f];
            for (var x = floor.p.x; x <= floor.p.x + floor.w; x += 20) {
                const text = x % 7 == 0 ? leftFloor : rightFloor;
                canvas.img(text.t, -cam.p.x + x, -cam.p.y + (floor.p.y - 10), text.w, text.h, 0, 0, 1, 1);
            }
        }
    }
    function ifOnTheFloorgetY(b) {
        let bottomCollide = -1;
        for (var i = 0; i < floors.length; i++) {
            bottomCollide = collideFloorBottom(b, floors[i]) ? floors[i].p.y : -1;
        }
        return bottomCollide;
    }
    function applyGravity(b) {
        b.v.y = ifOnTheFloorgetY(b) < 0 ? b.v.y + (GRAVITY * currentDelta) : b.v.y;
    }
    function outsideScreen(b) {
        return b.p.x < 0 || b.p.x > 900;
    }
    function moveBullet(b) {
        if (outsideScreen(b)) {
            b.vi = false;
            b.v.x = 0;
        }
        b.p.x += b.v.x * currentDelta;
        b.p.y += b.v.y * currentDelta;
    }
    function collideFloorTop(b, f) {
        return collide(b, f) &&
            f.p.y + (f.h / 2) > b.p.y;
    }
    function collideFloorBottom(b, f) {
        return collide(b, f) &&
            b.p.y < f.p.y;
    }
    function collideFloorLeft(b, f) {
        return collide(b, f) &&
            b.p.x < f.p.x && b.p.x + b.w > f.p.x;
    }
    function collideFloorRight(b, f) {
        return collide(b, f) &&
            b.p.x + (b.w * 0.9) < f.p.x && b.v.x > 0;
    }
    function move(b) {
        const groundY = ifOnTheFloorgetY(b);
        b.p.y = groundY < 0 ? b.p.y + (b.v.y * currentDelta) : groundY - b.h;
        b.p.x += b.v.x * currentDelta;
        applyGravity(b);
        for (var f = 0; f < floors.length; f++) {
            if (collideFloorTop(b, floors[f])) {
                if (b.v.y < 0) {
                    b.v.y = 0;
                }
            }
            if (collideFloorBottom(b, floors[f])) {
                if (b.v.y > 0) {
                    b.v.y = 0;
                }
            }
        }
    }
    function renderText(w, x, y, s) {
        const coor = renderCoord(w);
        var newX = -((w.length * (4 * s)) / 2);
        for (var c = 0; c < coor.length; c++) {
            canvas.img(abc.t, newX + x, y, 4 * s, 4 * s, coor[c][0], coor[c][1], coor[c][2], coor[c][3]);
            newX += (4 * s) + 1;
        }
    }
    function renderCoord(w) {
        const letters = ['abcdefghijklm', 'nopqrstuvwxyz', '0123456789:!+'];
        let resp = new Array();
        for (var i = 0; i < w.length; i++) {
            const l = w.charAt(i);
            for (var r = 0; r < letters.length; r++) {
                const index = letters[r].indexOf(l);
                if (index > -1) {
                    resp.push([(index * 4) / 52, (r * 4) / 12, ((index * 4) + 4) / 52, ((r * 4) + 4) / 12]);
                }
            }
        }
        return resp;
    }
    const render = (m) => {
        canvas.g.canvas.style.width = "auto";
        canvas.g.canvas.style.height = Math.round(window.innerHeight * 0.95) + "px";
        canvas.g.viewport(0, 0, canvas.g.canvas.width, canvas.g.canvas.height);
        if (window.innerHeight > window.innerWidth) {
            canvas.cls();
            canvas.bkg(0, 0, 0);
            renderText("flip:phone", 40, 60, 1);
        }
        else {
            if (m.s == S.G) {
                canvas.cls();
                canvas.bkg(57 / 255, 73 / 255, 81 / 255);
                renderMountain();
                const p = m.p;
                renderFloor();
                renderText("extraction", -cam.p.x + zone.p.x + (zone.w / 2), zone.p.y - 15, 1);
                renderText("area", -cam.p.x + zone.p.x + (zone.w / 2), zone.p.y - 10, 1);
                if (p.s) {
                    shootingAnim.update(p);
                }
                else if (p.v.x == 0) {
                    if (p.c) {
                        soldierHostAni.update(p);
                    }
                    else {
                        idleAnim.update(p);
                    }
                }
                else {
                    if (p.c) {
                        soldierHostAni.reset();
                        soldierHostAni.update(p);
                    }
                    else {
                        runAnim.update(p);
                    }
                }
                for (var i = 0; i < m.es.length; i++) {
                    const e = m.es[i];
                    if (e.vi) {
                        if (e.hi) {
                            botHittedAnim.update(e);
                        }
                        else {
                            botAnim.update(e);
                        }
                    }
                }
                for (var i = 0; i < m.bs.length; i++) {
                    const b = m.bs[i];
                    if (b.vi) {
                        canvas.img(bulletTexture, -cam.p.x + b.p.x, -cam.p.y + b.p.y, 4, 4, 0, 0, 1, 1);
                    }
                }
                for (var i = 0; i < m.hs.length; i++) {
                    const b = m.hs[i];
                    if (b.vi) {
                        hostAnim.update(b);
                    }
                }
                for (var i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    if (p && p.vi) {
                        canvas.img(rbotHit.t, -cam.p.x + p.p.x, -cam.p.y + p.p.y, 8, 8, 0, 0, .7, 1);
                    }
                }
                for (var i = 0; i < persistence.length; i++) {
                    const p = persistence[i];
                    if (p && p.vi) {
                        canvas.img(rbotHit.t, -cam.p.x + p.p.x, -cam.p.y + p.p.y, 8, 8, 0, 0, .7, 1);
                    }
                }
                renderText("score: " + score, width / 2, 10, 2);
            }
            else if (m.s == S.M) {
                renderText("back", width / 2, height / 3, 4);
                renderText("to", width / 2, height / 3 + (4 * 4) + 4, 4);
                renderText("rescue", width / 2, height / 3 + (4 * 4 * 2) + 8, 4);
                renderText("press+attack+to+start", width / 2, height / 2 + (4 * 4 * 2) + 14, 1);
            }
        }
        canvas.flush();
        fpsM.tick();
    };
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const svgs = document.querySelectorAll("svg");
        svgs.forEach(svg => {
            svg.style.display = "block";
        });
    }
    runGame();
});


/***/ }),

/***/ "./src/lib/sounds.js":
/*!***************************!*\
  !*** ./src/lib/sounds.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function E(c){
    this.n = c.createGain()
    this.n.gain.value = 0
    this.addEventToQueue = function(){
      this.n.gain.linearRampToValueAtTime(0, c.currentTime);
      this.n.gain.linearRampToValueAtTime(1, c.currentTime + 0.001);
      this.n.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.101);
      this.n.gain.linearRampToValueAtTime(0, c.currentTime + 0.500);
    }
  }
  
  function WNB(c){
    var bs = c.sampleRate;
    var b = c.createBuffer(1, bs, c.sampleRate);
    var o = b.getChannelData(0);
  
    for (var i = 0; i < bs; i++) {
      o[i] = Math.random() * 2 - 1;
    }
  
    this.s = c.createBufferSource();
    this.s.buffer = b;
    this.s.loop = true
  };
  
  var ctx = new (window.AudioContext || window.webkitAudioContext)()
  var n = new WNB(ctx)
  var v1 = new E(ctx)
  var v2 = new E(ctx)
  var v3 = new E(ctx)
  var v4 = new E(ctx)
  var f = ctx.createBiquadFilter()
  var g = ctx.createGain()
  var vs = 0
  var std = false

  
  n.s.connect(v1.n)
  n.s.connect(v2.n)
  n.s.connect(v3.n)
  n.s.connect(v4.n)
  
  f.type = "lowpass"
  f.Q.value = 1
  f.frequency.value = 800
  v1.n.connect(f)
  v2.n.connect(f)
  v3.n.connect(f)
  v4.n.connect(f)
  g.gain.value = 5
  f.connect(g)
  g.connect(ctx.destination)
  
  
  
  function fireSound(){
    
   if(!std){
      std = true
      n.s.start(0)
    }
    
    
       vs++
        if(vs > 4){
          vs = 1
        }
        if (vs == 1){
          v1.addEventToQueue()
        }
        if (vs == 2){
          v2.addEventToQueue()
        }
        if (vs == 3){
          v3.addEventToQueue()
        }
        if (vs == 4){
          v4.addEventToQueue()
        }
  }

var o = ctx.createOscillator();
o.type = 'square'
var v = ctx.createGain();
o.connect(v)
v.connect(ctx.destination);
v.gain.setValueAtTime(0,ctx.currentTime)
var std2 = false

function jumpSound(){
  const r = (Math.random() * (3 - 1) + 1)/2
  if(!std2){
      o.start(0)
    std2 = true
  }
  o.frequency.setValueAtTime(200*r, ctx.currentTime)
  v.gain.setValueAtTime(0.05,ctx.currentTime)
  v.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.1);
  o.frequency.exponentialRampToValueAtTime(280*r, ctx.currentTime + 0.4);
  v.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  v.gain.setValueAtTime(0,ctx.currentTime + 0.4)
}

function hitSound(){
  var oh = ctx.createOscillator();
  oh.type = 'square'
  var vh = ctx.createGain();
  oh.connect(vh)
  vh.connect(ctx.destination);
  vh.gain.setValueAtTime(0,ctx.currentTime)
  oh.type = 'square'
  oh.frequency = 880.6;
  oh.start(0)
  vh.gain.setValueAtTime(1,ctx.currentTime)
  oh.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  vh.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  vh.gain.setValueAtTime(0,ctx.currentTime + 0.5)
}


var oC = ctx.createOscillator();
oC.type = 'square'
var vC = ctx.createGain();
oC.connect(vC)
vC.connect(ctx.destination);
vC.gain.setValueAtTime(0,ctx.currentTime)
var stdC = false

function coinSound(){
  if(!stdC){
      oC.start(0)
    stdC = true
  }
  oC.frequency.setValueAtTime(1800, ctx.currentTime)
vC.gain.setValueAtTime(0.005,ctx.currentTime)
vC.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.1);
oC.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.4);
vC.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
vC.gain.setValueAtTime(0,ctx.currentTime + 0.4)
}

window['fireSound'] = fireSound;
window['jumpSound'] = jumpSound;
window['hitSound'] = hitSound;
window['coinSound'] = coinSound;





  
  

/***/ }),

/***/ "./src/lib/tiny-canvas.js":
/*!********************************!*\
  !*** ./src/lib/tiny-canvas.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * TinyCanvas module (https://github.com/bitnenfer/tiny-canvas)
 * Developed by Felipe Alfonso -> https://twitter.com/bitnenfer/
 * 
 *  ----------------------------------------------------------------------
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 * 
 *  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 * 
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 * 
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 * 
 *  ----------------------------------------------------------------------
 * 
 */

function CompileShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function CreateShaderProgram(gl, vsSource, fsSource) {
    var program = gl.createProgram(),
        vShader = CompileShader(gl, vsSource, 35633),
        fShader = CompileShader(gl, fsSource, 35632);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    return program;
}

function CreateBuffer(gl, bufferType, size, usage) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, size, usage);
    return buffer;
}

function CreateTexture(gl, image, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(3553, texture);
    gl.texParameteri(3553, 10242, 33071);
    gl.texParameteri(3553, 10243, 33071);
    gl.texParameteri(3553, 10240, 9728);
    gl.texParameteri(3553, 10241, 9728);
    gl.texImage2D(3553, 0, 6408, 6408, 5121, image);
    gl.bindTexture(3553, null);
    texture.width = width;
    texture.height = height;
    return texture;
}
window['TCShd'] = CompileShader;
window['TCPrg'] = CreateShaderProgram;
window['TCBuf'] = CreateBuffer;
window['TCTex'] = CreateTexture;

function TinyCanvas(canvas) {
    var gl = canvas.getContext('webgl'),
        VERTEX_SIZE = (4 * 2) + (4 * 2) + (4),
        MAX_BATCH = 10922, // floor((2 ^ 16) / 6)
        MAX_STACK = 100,
        MAT_SIZE = 6,
        VERTICES_PER_QUAD = 6,
        MAT_STACK_SIZE = MAX_STACK * MAT_SIZE,
        VERTEX_DATA_SIZE = VERTEX_SIZE * MAX_BATCH * 4,
        INDEX_DATA_SIZE = MAX_BATCH * (2 * VERTICES_PER_QUAD),
        width = canvas.width,
        height = canvas.height,
        shader = CreateShaderProgram(
            gl, [
                'precision lowp float;',
                // IN Vertex Position and
                // IN Texture Coordinates
                'attribute vec2 a, b;',
                // IN Vertex Color
                'attribute vec4 c;',
                // OUT Texture Coordinates
                'varying vec2 d;',
                // OUT Vertex Color
                'varying vec4 e;',
                // CONST View Matrix
                'uniform mat4 m;',
                'uniform vec2 r;',
                'void main(){',
                'gl_Position=m*vec4(a,1.0,1.0);',
                'd=b;',
                'e=c;',
                '}'
            ].join('\n'), [
                'precision lowp float;',
                // OUT Texture Coordinates
                'varying vec2 d;',
                // OUT Vertex Color
                'varying vec4 e;',
                // CONST Single Sampler2D
                'uniform sampler2D f;',
                'void main(){',
                'gl_FragColor=texture2D(f,d)*e;',
                '}'
            ].join('\n')
        ),
        glBufferSubData = gl.bufferSubData.bind(gl),
        glDrawElements = gl.drawElements.bind(gl),
        glBindTexture = gl.bindTexture.bind(gl),
        glClear = gl.clear.bind(gl),
        glClearColor = gl.clearColor.bind(gl),
        vertexData = new ArrayBuffer(VERTEX_DATA_SIZE),
        vPositionData = new Float32Array(vertexData),
        vColorData = new Uint32Array(vertexData),
        vIndexData = new Uint16Array(INDEX_DATA_SIZE),
        IBO = CreateBuffer(gl, 34963, vIndexData.byteLength, 35044),
        VBO = CreateBuffer(gl, 34962, vertexData.byteLength, 35048),
        count = 0,
        mat = new Float32Array([1, 0, 0, 1, 0, 0]),
        stack = new Float32Array(100),
        stackp = 0,
        cos = Math.cos,
        sin = Math.sin,
        currentTexture = null,
        renderer = null,
        locA, locB, locC;

    gl.blendFunc(770, 771);
    gl.enable(3042);
    gl.useProgram(shader);
    gl.bindBuffer(34963, IBO);
    for (var indexA = indexB = 0; indexA < MAX_BATCH * VERTICES_PER_QUAD; indexA += VERTICES_PER_QUAD, indexB += 4)
        vIndexData[indexA + 0] = indexB,
            vIndexData[indexA + 1] = indexB + 1,
            vIndexData[indexA + 2] = indexB + 2,
            vIndexData[indexA + 3] = indexB + 0,
            vIndexData[indexA + 4] = indexB + 3,
            vIndexData[indexA + 5] = indexB + 1;

    glBufferSubData(34963, 0, vIndexData);
    gl.bindBuffer(34962, VBO);
    locA = gl.getAttribLocation(shader, 'a');
    locB = gl.getAttribLocation(shader, 'b');
    locC = gl.getAttribLocation(shader, 'c');
    gl.enableVertexAttribArray(locA);
    gl.vertexAttribPointer(locA, 2, 5126, 0, VERTEX_SIZE, 0);
    gl.enableVertexAttribArray(locB);
    gl.vertexAttribPointer(locB, 2, 5126, 0, VERTEX_SIZE, 8);
    gl.enableVertexAttribArray(locC);
    gl.vertexAttribPointer(locC, 4, 5121, 1, VERTEX_SIZE, 16);
    gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'm'), 0,
        new Float32Array([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 1, -1, 1, 0, 0
        ])
    );
    gl.activeTexture(33984);
    renderer = {
        'g': gl,
        'c': canvas,
        'col': 0xFFFFFFFF,
        'bkg': function (r, g, b) {
            glClearColor(r, g, b, 1);
        },
        'cls': function () {
            glClear(16384);
        },
        'trans': function (x, y) {
            mat[4] = mat[0] * x + mat[2] * y + mat[4];
            mat[5] = mat[1] * x + mat[3] * y + mat[5];
        },
        'scale': function (x, y) {
            mat[0] = mat[0] * x;
            mat[1] = mat[1] * x;
            mat[2] = mat[2] * y;
            mat[3] = mat[3] * y;
        },
        'rot': function (r) {
            var a = mat[0],
                b = mat[1],
                c = mat[2],
                d = mat[3],
                sr = sin(r),
                cr = cos(r);

            mat[0] = a * cr + c * sr;
            mat[1] = b * cr + d * sr;
            mat[2] = a * -sr + c * cr;
            mat[3] = b * -sr + d * cr;
        },
        'push': function () {
            stack[stackp + 0] = mat[0];
            stack[stackp + 1] = mat[1];
            stack[stackp + 2] = mat[2];
            stack[stackp + 3] = mat[3];
            stack[stackp + 4] = mat[4];
            stack[stackp + 5] = mat[5];
            stackp += 6;
        },
        'pop': function () {
            stackp -= 6;
            mat[0] = stack[stackp + 0];
            mat[1] = stack[stackp + 1];
            mat[2] = stack[stackp + 2];
            mat[3] = stack[stackp + 3];
            mat[4] = stack[stackp + 4];
            mat[5] = stack[stackp + 5];
        },
        'img': function (texture, x, y, w, h, u0, v0, u1, v1) {
            var x0 = x,
                y0 = y,
                x1 = x + w,
                y1 = y + h,
                x2 = x,
                y2 = y + h,
                x3 = x + w,
                y3 = y,
                a = mat[0],
                b = mat[1],
                c = mat[2],
                d = mat[3],
                e = mat[4],
                f = mat[5],
                offset = 0,
                argb = renderer['col'];

            if (texture != currentTexture ||
                count + 1 >= MAX_BATCH) {
                glBufferSubData(34962, 0, vertexData);
                glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;
                if (currentTexture != texture) {
                    currentTexture = texture;
                    glBindTexture(3553, currentTexture);
                }
            }

            offset = count * VERTEX_SIZE;
            // Vertex Order
            // Vertex Position | UV | ARGB
            // Vertex 1
            vPositionData[offset++] = x0 * a + y0 * c + e;
            vPositionData[offset++] = x0 * b + y0 * d + f;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            // Vertex 2
            vPositionData[offset++] = x1 * a + y1 * c + e;
            vPositionData[offset++] = x1 * b + y1 * d + f;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 3
            vPositionData[offset++] = x2 * a + y2 * c + e;
            vPositionData[offset++] = x2 * b + y2 * d + f;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 4
            vPositionData[offset++] = x3 * a + y3 * c + e;
            vPositionData[offset++] = x3 * b + y3 * d + f;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            if (++count >= MAX_BATCH) {
                glBufferSubData(34962, 0, vertexData);
                glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;
            }
        },
        'flush': function () {
            if (count == 0) return;
            glBufferSubData(34962, 0, vPositionData.subarray(0, count * VERTEX_SIZE));
            glDrawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
            count = 0;
        }
    };
    return renderer;
}
window['TC'] = TinyCanvas;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE1BQU07QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsZUFBZTtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUMsRUFBRTtBQUN4RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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USxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEosTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkcsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkosTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFF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QUErQztBQUMvQyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCIiwiZmlsZSI6ImIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8qIVxuICogRlBTTWV0ZXIgMC4zLjEgLSA5dGggTWF5IDIwMTNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXJzYWluL2Zwc21ldGVyXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG47KGZ1bmN0aW9uICh3LCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEVsZW1lbnQgdHlwZSBuYW1lLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fVxuXHQgKi9cblx0ZnVuY3Rpb24gbmV3RWwobmFtZSkge1xuXHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZW1lIENTUyBwcm9wZXJ0aWVzIHRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgRE9NIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gIHRoZW1lICAgVGhlbWUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fVxuXHQgKi9cblx0ZnVuY3Rpb24gYXBwbHlUaGVtZShlbGVtZW50LCB0aGVtZSkge1xuXHRcdGZvciAodmFyIG5hbWUgaW4gdGhlbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB0aGVtZVtuYW1lXTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0eXBlIG9mIHRoZSB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtICB7TWl4ZWR9IHZhbHVlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHR5cGUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIFN0cmluZyh2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKSB8fCAnb2JqZWN0Jztcblx0XHR9XG5cblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGluIGFuIGFycmF5LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICogQHBhcmFtICB7QXJyYXl9IGFycmF5XG5cdCAqXG5cdCAqIEByZXR1cm4ge0ludGVnZXJ9IEFycmF5IGluZGV4IG9yIC0xIHdoZW4gbm90IGZvdW5kLlxuXHQgKi9cblx0ZnVuY3Rpb24gaW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcblx0XHRpZiAodHlwZShhcnJheSkgIT09ICdhcnJheScpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0aWYgKGFycmF5LmluZGV4T2YpIHtcblx0XHRcdHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQb29yIG1hbidzIGRlZXAgb2JqZWN0IGV4dGVuZC5cblx0ICpcblx0ICogRXhhbXBsZTpcblx0ICogICBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblx0ICpcblx0ICogQHJldHVybiB7Vm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnc1sxXSkge1xuXHRcdFx0aWYgKGFyZ3NbMV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGUoYXJnc1sxXVtrZXldKSkge1xuXHRcdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBleHRlbmQoe30sIGFyZ3NbMF1ba2V5XSwgYXJnc1sxXVtrZXldKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnYXJyYXknOlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gYXJnc1sxXVtrZXldLnNsaWNlKDApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gYXJnc1sxXVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcmdzLmxlbmd0aCA+IDIgP1xuXHRcdFx0ZXh0ZW5kLmFwcGx5KG51bGwsIFthcmdzWzBdXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMikpKSA6XG5cdFx0XHRhcmdzWzBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgSFNMIGNvbG9yIHRvIEhFWCBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSAge0FycmF5fSBoc2wgQXJyYXkgd2l0aCBbaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3NdLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgd2l0aCBbcmVkLCBncmVlbiwgYmx1ZV0uXG5cdCAqL1xuXHRmdW5jdGlvbiBoc2xUb0hleChoLCBzLCBsKSB7XG5cdFx0dmFyIHIsIGcsIGI7XG5cdFx0dmFyIHYsIG1pbiwgc3YsIHNleHRhbnQsIGZyYWN0LCB2c2Y7XG5cblx0XHRpZiAobCA8PSAwLjUpIHtcblx0XHRcdHYgPSBsICogKDEgKyBzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0diA9IGwgKyBzIC0gbCAqIHM7XG5cdFx0fVxuXG5cdFx0aWYgKHYgPT09IDApIHtcblx0XHRcdHJldHVybiAnIzAwMCc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1pbiA9IDIgKiBsIC0gdjtcblx0XHRcdHN2ID0gKHYgLSBtaW4pIC8gdjtcblx0XHRcdGggPSA2ICogaDtcblx0XHRcdHNleHRhbnQgPSBNYXRoLmZsb29yKGgpO1xuXHRcdFx0ZnJhY3QgPSBoIC0gc2V4dGFudDtcblx0XHRcdHZzZiA9IHYgKiBzdiAqIGZyYWN0O1xuXHRcdFx0aWYgKHNleHRhbnQgPT09IDAgfHwgc2V4dGFudCA9PT0gNikge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbiArIHZzZjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMSkge1xuXHRcdFx0XHRyID0gdiAtIHZzZjtcblx0XHRcdFx0ZyA9IHY7XG5cdFx0XHRcdGIgPSBtaW47XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDIpIHtcblx0XHRcdFx0ciA9IG1pbjtcblx0XHRcdFx0ZyA9IHY7XG5cdFx0XHRcdGIgPSBtaW4gKyB2c2Y7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDMpIHtcblx0XHRcdFx0ciA9IG1pbjtcblx0XHRcdFx0ZyA9IHYgLSB2c2Y7XG5cdFx0XHRcdGIgPSB2O1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSA0KSB7XG5cdFx0XHRcdHIgPSBtaW4gKyB2c2Y7XG5cdFx0XHRcdGcgPSBtaW47XG5cdFx0XHRcdGIgPSB2O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ciA9IHY7XG5cdFx0XHRcdGcgPSBtaW47XG5cdFx0XHRcdGIgPSB2IC0gdnNmO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICcjJyArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIGZvciBoc2xUb0hleC5cblx0ICovXG5cdGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcblx0XHRjID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XG5cdFx0cmV0dXJuIGMubGVuZ3RoID09PSAxID8gJzAnICsgYyA6IGM7XG5cdH1cblxuXHQvKipcblx0ICogTWFuYWdlIGVsZW1lbnQgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtOb2RlfSAgICAgZWxlbWVudFxuXHQgKiBAcGFyYW0gIHtFdmVudH0gICAgZXZlbnROYW1lXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge0Jvb2x9ICAgICByZW1vdmVcblx0ICpcblx0ICogQHJldHVybiB7Vm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcmVtb3ZlKSB7XG5cdFx0aWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0ZWxlbWVudFtyZW1vdmUgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnYWRkRXZlbnRMaXN0ZW5lciddKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuXHRcdH0gZWxzZSBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuXHRcdFx0ZWxlbWVudFtyZW1vdmUgPyAnZGV0YWNoRXZlbnQnIDogJ2F0dGFjaEV2ZW50J10oJ29uJyArIGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUHJlZmVycmVkIHRpbWluZyBmdW50aW9uXG5cdHZhciBnZXRUaW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBwZXJmID0gdy5wZXJmb3JtYW5jZTtcblx0XHRpZiAocGVyZiAmJiAocGVyZi5ub3cgfHwgcGVyZi53ZWJraXROb3cpKSB7XG5cdFx0XHR2YXIgcGVyZk5vdyA9IHBlcmYubm93ID8gJ25vdycgOiAnd2Via2l0Tm93Jztcblx0XHRcdGdldFRpbWUgPSBwZXJmW3BlcmZOb3ddLmJpbmQocGVyZik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldFRpbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiArbmV3IERhdGUoKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KCkpO1xuXG5cdC8vIExvY2FsIFdpbmRvd0FuaW1hdGlvblRpbWluZyBpbnRlcmZhY2UgcG9seWZpbGxcblx0dmFyIGNBRiA9IHcuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgdy5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdHZhciByQUYgPSB3LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblxuXHRcdC8vIEZvciBhIG1vcmUgYWNjdXJhdGUgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvbiwgZGl0Y2ggdGhlIG5hdGl2ZVxuXHRcdC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGVuIGNhbmNlbEFuaW1hdGlvbkZyYW1lIGlzIG5vdCBwcmVzZW50IChvbGRlciB2ZXJzaW9ucyBvZiBGaXJlZm94KVxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gdmVuZG9ycy5sZW5ndGg7IGkgPCBsICYmICFjQUY7ICsraSkge1xuXHRcdFx0Y0FGID0gd1t2ZW5kb3JzW2ldKydDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdbdmVuZG9yc1tpXSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0XHRyQUYgPSBjQUYgJiYgd1t2ZW5kb3JzW2ldKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHR9XG5cblx0XHRpZiAoIWNBRikge1xuXHRcdFx0ckFGID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBjdXJyVGltZSA9IGdldFRpbWUoKTtcblx0XHRcdFx0dmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG5cdFx0XHRcdGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXHRcdFx0XHRyZXR1cm4gdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTsgfSwgdGltZVRvQ2FsbCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRjQUYgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGlkKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KCkpO1xuXG5cdC8vIFByb3BlcnR5IG5hbWUgZm9yIGFzc2lnbmluZyBlbGVtZW50IHRleHQgY29udGVudFxuXHR2YXIgdGV4dFByb3AgPSB0eXBlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnRleHRDb250ZW50KSA9PT0gJ3N0cmluZycgPyAndGV4dENvbnRlbnQnIDogJ2lubmVyVGV4dCc7XG5cblx0LyoqXG5cdCAqIEZQU01ldGVyIGNsYXNzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGFuY2hvciAgRWxlbWVudCB0byBhcHBlbmQgdGhlIG1ldGVyIHRvLiBEZWZhdWx0IGlzIGRvY3VtZW50LmJvZHkuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgb3B0aW9ucyBPYmplY3Qgd2l0aCBvcHRpb25zLlxuXHQgKi9cblx0ZnVuY3Rpb24gRlBTTWV0ZXIoYW5jaG9yLCBvcHRpb25zKSB7XG5cdFx0Ly8gT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0aWYgKHR5cGUoYW5jaG9yKSA9PT0gJ29iamVjdCcgJiYgYW5jaG9yLm5vZGVUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdG9wdGlvbnMgPSBhbmNob3I7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIWFuY2hvcikge1xuXHRcdFx0YW5jaG9yID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHQvLyBQcml2YXRlIHByb3BlcnRpZXNcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIG8gPSBleHRlbmQoe30sIEZQU01ldGVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdHZhciBlbCA9IHt9O1xuXHRcdHZhciBjb2xzID0gW107XG5cdFx0dmFyIHRoZW1lLCBoZWF0bWFwcztcblx0XHR2YXIgaGVhdERlcHRoID0gMTAwO1xuXHRcdHZhciBoZWF0aW5nID0gW107XG5cblx0XHR2YXIgdGhpc0ZyYW1lVGltZSA9IDA7XG5cdFx0dmFyIGZyYW1lVGltZSA9IG8udGhyZXNob2xkO1xuXHRcdHZhciBmcmFtZVN0YXJ0ID0gMDtcblx0XHR2YXIgbGFzdExvb3AgPSBnZXRUaW1lKCkgLSBmcmFtZVRpbWU7XG5cdFx0dmFyIHRpbWU7XG5cblx0XHR2YXIgZnBzSGlzdG9yeSA9IFtdO1xuXHRcdHZhciBkdXJhdGlvbkhpc3RvcnkgPSBbXTtcblxuXHRcdHZhciBmcmFtZUlELCByZW5kZXJJRDtcblx0XHR2YXIgc2hvd0ZwcyA9IG8uc2hvdyA9PT0gJ2Zwcyc7XG5cdFx0dmFyIGdyYXBoSGVpZ2h0LCBjb3VudCwgaSwgajtcblxuXHRcdC8vIEV4cG9zZWQgcHJvcGVydGllc1xuXHRcdHNlbGYub3B0aW9ucyA9IG87XG5cdFx0c2VsZi5mcHMgPSAwO1xuXHRcdHNlbGYuZHVyYXRpb24gPSAwO1xuXHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXG5cdFx0LyoqXG5cdFx0ICogVGljayBzdGFydCBmb3IgbWVhc3VyaW5nIHRoZSBhY3R1YWwgcmVuZGVyaW5nIGR1cmF0aW9uLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLnRpY2tTdGFydCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZyYW1lU3RhcnQgPSBnZXRUaW1lKCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEZQUyB0aWNrLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLnRpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0dGhpc0ZyYW1lVGltZSA9IHRpbWUgLSBsYXN0TG9vcDtcblx0XHRcdGZyYW1lVGltZSArPSAodGhpc0ZyYW1lVGltZSAtIGZyYW1lVGltZSkgLyBvLnNtb290aGluZztcblx0XHRcdHNlbGYuZnBzID0gMTAwMCAvIGZyYW1lVGltZTtcblx0XHRcdHNlbGYuZHVyYXRpb24gPSBmcmFtZVN0YXJ0IDwgbGFzdExvb3AgPyBmcmFtZVRpbWUgOiB0aW1lIC0gZnJhbWVTdGFydDtcblx0XHRcdGxhc3RMb29wID0gdGltZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF1c2UgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoZnJhbWVJRCkge1xuXHRcdFx0XHRzZWxmLmlzUGF1c2VkID0gMTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGZyYW1lSUQpO1xuXHRcdFx0XHRjQUYoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihyZW5kZXJJRCk7XG5cdFx0XHRcdGZyYW1lSUQgPSByZW5kZXJJRCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVzdW1lIGRpc3BsYXkgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghZnJhbWVJRCkge1xuXHRcdFx0XHRzZWxmLmlzUGF1c2VkID0gMDtcblx0XHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBvcHRpb25zLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIE9wdGlvbiBuYW1lLlxuXHRcdCAqIEBwYXJhbSB7TWl4ZWR9ICB2YWx1ZSBOZXcgdmFsdWUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2V0ID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRvW25hbWVdID0gdmFsdWU7XG5cdFx0XHRzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblxuXHRcdFx0Ly8gUmVidWlsZCBvciByZXBvc2l0aW9uIGVsZW1lbnRzIHdoZW4gc3BlY2lmaWMgb3B0aW9uIGhhcyBiZWVuIHVwZGF0ZWRcblx0XHRcdGlmIChpbkFycmF5KG5hbWUsIHJlYnVpbGRlcnMpICE9PSAtMSkge1xuXHRcdFx0XHRjcmVhdGVNZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVwb3NpdGlvbmVycykgIT09IC0xKSB7XG5cdFx0XHRcdHBvc2l0aW9uTWV0ZXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgbWV0ZXIgaW50byByZW5kZXJpbmcgZHVyYXRpb24gbW9kZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93RHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsICdtcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIEZQUyBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dGcHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsICdmcHMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBUb2dnbGVzIGJldHdlZW4gc2hvdzogJ2ZwcycgYW5kIHNob3c6ICdkdXJhdGlvbicuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCBzaG93RnBzID8gJ21zJyA6ICdmcHMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIaWRlIHRoZSBGUFNNZXRlci4gQWxzbyBwYXVzZXMgdGhlIHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5oaWRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2hvdyB0aGUgRlBTTWV0ZXIuIEFsc28gcmVzdW1lcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnJlc3VtZSgpO1xuXHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoZWNrIHRoZSBjdXJyZW50IEZQUyBhbmQgc2F2ZSBpdCBpbiBoaXN0b3J5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBoaXN0b3J5VGljaygpIHtcblx0XHRcdGZvciAoaSA9IG8uaGlzdG9yeTsgaS0tOykge1xuXHRcdFx0XHRmcHNIaXN0b3J5W2ldID0gaSA9PT0gMCA/IHNlbGYuZnBzIDogZnBzSGlzdG9yeVtpLTFdO1xuXHRcdFx0XHRkdXJhdGlvbkhpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5kdXJhdGlvbiA6IGR1cmF0aW9uSGlzdG9yeVtpLTFdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgaGVhdCBoZXggY29sb3IgYmFzZWQgb24gdmFsdWVzIHBhc3NlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IGhlYXRtYXBcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IG1pblxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IG1heFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50ZWdlcn1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBnZXRIZWF0KGhlYXRtYXAsIHZhbHVlLCBtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIGhlYXRtYXBzWzB8aGVhdG1hcF1bTWF0aC5yb3VuZChNYXRoLm1pbigodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbikgKiBoZWF0RGVwdGgsIGhlYXREZXB0aCkpXTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgY291bnRlciBudW1iZXIgYW5kIGxlZ2VuZC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQ291bnRlcigpIHtcblx0XHRcdC8vIFVwZGF0ZSBsZWdlbmQgb25seSB3aGVuIGNoYW5nZWRcblx0XHRcdGlmIChlbC5sZWdlbmQuZnBzICE9PSBzaG93RnBzKSB7XG5cdFx0XHRcdGVsLmxlZ2VuZC5mcHMgPSBzaG93RnBzO1xuXHRcdFx0XHRlbC5sZWdlbmRbdGV4dFByb3BdID0gc2hvd0ZwcyA/ICdGUFMnIDogJ21zJztcblx0XHRcdH1cblx0XHRcdC8vIFVwZGF0ZSBjb3VudGVyIHdpdGggYSBuaWNlbHkgZm9ybWF0ZWQgJiByZWFkYWJsZSBudW1iZXJcblx0XHRcdGNvdW50ID0gc2hvd0ZwcyA/IHNlbGYuZnBzIDogc2VsZi5kdXJhdGlvbjtcblx0XHRcdGVsLmNvdW50W3RleHRQcm9wXSA9IGNvdW50ID4gOTk5ID8gJzk5OSsnIDogY291bnQudG9GaXhlZChjb3VudCA+IDk5ID8gMCA6IG8uZGVjaW1hbHMpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlbmRlciBjdXJyZW50IEZQUyBzdGF0ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dGltZSA9IGdldFRpbWUoKTtcblx0XHRcdC8vIElmIHJlbmRlcmVyIHN0b3BwZWQgcmVwb3J0aW5nLCBkbyBhIHNpbXVsYXRlZCBkcm9wIHRvIDAgZnBzXG5cdFx0XHRpZiAobGFzdExvb3AgPCB0aW1lIC0gby50aHJlc2hvbGQpIHtcblx0XHRcdFx0c2VsZi5mcHMgLT0gc2VsZi5mcHMgLyBNYXRoLm1heCgxLCBvLnNtb290aGluZyAqIDYwIC8gby5pbnRlcnZhbCk7XG5cdFx0XHRcdHNlbGYuZHVyYXRpb24gPSAxMDAwIC8gc2VsZi5mcHM7XG5cdFx0XHR9XG5cblx0XHRcdGhpc3RvcnlUaWNrKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGx5IGhlYXQgdG8gZWxlbWVudHNcblx0XHRcdGlmIChvLmhlYXQpIHtcblx0XHRcdFx0aWYgKGhlYXRpbmcubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gaGVhdGluZy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGhlYXRpbmdbaV0uZWwuc3R5bGVbdGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0T25dID0gc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0bWFwLCBzZWxmLmZwcywgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZHVyYXRpb24sIG8udGhyZXNob2xkLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZWwuZ3JhcGggJiYgdGhlbWUuY29sdW1uLmhlYXRPbikge1xuXHRcdFx0XHRcdGZvciAoaSA9IGNvbHMubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlW3RoZW1lLmNvbHVtbi5oZWF0T25dID0gc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWUuY29sdW1uLmhlYXRtYXAsIGZwc0hpc3RvcnlbaV0sIDAsIG8ubWF4RnBzKSA6XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWUuY29sdW1uLmhlYXRtYXAsIGR1cmF0aW9uSGlzdG9yeVtpXSwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgZ3JhcGggY29sdW1ucyBoZWlnaHRcblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgby5oaXN0b3J5OyBqKyspIHtcblx0XHRcdFx0XHRjb2xzW2pdLnN0eWxlLmhlaWdodCA9IChzaG93RnBzID9cblx0XHRcdFx0XHRcdChmcHNIaXN0b3J5W2pdID8gTWF0aC5yb3VuZChncmFwaEhlaWdodCAvIG8ubWF4RnBzICogTWF0aC5taW4oZnBzSGlzdG9yeVtqXSwgby5tYXhGcHMpKSA6IDApIDpcblx0XHRcdFx0XHRcdChkdXJhdGlvbkhpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby50aHJlc2hvbGQgKiBNYXRoLm1pbihkdXJhdGlvbkhpc3Rvcnlbal0sIG8udGhyZXNob2xkKSkgOiAwKVxuXHRcdFx0XHRcdCkgKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVxdWVzdCByZW5kZXJpbmcgbG9vcC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0ludH0gQW5pbWF0aW9uIGZyYW1lIGluZGV4LlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlcXVlc3RSZW5kZXIoKSB7XG5cdFx0XHRpZiAoby5pbnRlcnZhbCA8IDIwKSB7XG5cdFx0XHRcdGZyYW1lSUQgPSByQUYocmVxdWVzdFJlbmRlcik7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHNldFRpbWVvdXQocmVxdWVzdFJlbmRlciwgby5pbnRlcnZhbCk7XG5cdFx0XHRcdHJlbmRlcklEID0gckFGKHJlbmRlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogTWV0ZXIgZXZlbnRzIGhhbmRsZXIuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGV2ZW50SGFuZGxlcihldmVudCkge1xuXHRcdFx0ZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG5cdFx0XHRpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi50b2dnbGUoKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBEZXN0cm95cyB0aGUgY3VycmVudCBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU3RvcCByZW5kZXJpbmdcblx0XHRcdHNlbGYucGF1c2UoKTtcblx0XHRcdC8vIFJlbW92ZSBlbGVtZW50c1xuXHRcdFx0cmVtb3ZlTWV0ZXIoKTtcblx0XHRcdC8vIFN0b3AgbGlzdGVuaW5nXG5cdFx0XHRzZWxmLnRpY2sgPSBzZWxmLnRpY2tTdGFydCA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgbWV0ZXIgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlTWV0ZXIoKSB7XG5cdFx0XHQvLyBVbmJpbmQgbGlzdGVuZXJzXG5cdFx0XHRpZiAoby50b2dnbGVPbikge1xuXHRcdFx0XHRsaXN0ZW5lcihlbC5jb250YWluZXIsIG8udG9nZ2xlT24sIGV2ZW50SGFuZGxlciwgMSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBEZXRhY2ggZWxlbWVudFxuXHRcdFx0YW5jaG9yLnJlbW92ZUNoaWxkKGVsLmNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2V0cyB0aGUgdGhlbWUsIGFuZCBnZW5lcmF0ZXMgaGVhdG1hcHMgd2hlbiBuZWVkZWQuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gc2V0VGhlbWUoKSB7XG5cdFx0XHR0aGVtZSA9IEZQU01ldGVyLnRoZW1lW28udGhlbWVdO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBoZWF0bWFwc1xuXHRcdFx0aGVhdG1hcHMgPSB0aGVtZS5jb21waWxlZEhlYXRtYXBzIHx8IFtdO1xuXHRcdFx0aWYgKCFoZWF0bWFwcy5sZW5ndGggJiYgdGhlbWUuaGVhdG1hcHMubGVuZ3RoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCB0aGVtZS5oZWF0bWFwcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGhlYXRtYXBzW2pdID0gW107XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSBoZWF0RGVwdGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aGVhdG1hcHNbal1baV0gPSBoc2xUb0hleCgwLjMzIC8gaGVhdERlcHRoICogaSwgdGhlbWUuaGVhdG1hcHNbal0uc2F0dXJhdGlvbiwgdGhlbWUuaGVhdG1hcHNbal0ubGlnaHRuZXNzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhlbWUuY29tcGlsZWRIZWF0bWFwcyA9IGhlYXRtYXBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYW5kIGF0dGFjaGVzIHRoZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBjcmVhdGVNZXRlcigpIHtcblx0XHRcdC8vIFJlbW92ZSBvbGQgbWV0ZXIgaWYgcHJlc2VudFxuXHRcdFx0aWYgKGVsLmNvbnRhaW5lcikge1xuXHRcdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlbWVcblx0XHRcdHNldFRoZW1lKCk7XG5cblx0XHRcdC8vIENyZWF0ZSBlbGVtZW50c1xuXHRcdFx0ZWwuY29udGFpbmVyID0gYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvbnRhaW5lcik7XG5cdFx0XHRlbC5jb3VudCA9IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY291bnQpKTtcblx0XHRcdGVsLmxlZ2VuZCA9IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUubGVnZW5kKSk7XG5cdFx0XHRlbC5ncmFwaCA9IG8uZ3JhcGggPyBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmdyYXBoKSkgOiAwO1xuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgdG8gaGVhdGluZyBhcnJheVxuXHRcdFx0aGVhdGluZy5sZW5ndGggPSAwO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGVsKSB7XG5cdFx0XHRcdGlmIChlbFtrZXldICYmIHRoZW1lW2tleV0uaGVhdE9uKSB7XG5cdFx0XHRcdFx0aGVhdGluZy5wdXNoKHtcblx0XHRcdFx0XHRcdG5hbWU6IGtleSxcblx0XHRcdFx0XHRcdGVsOiBlbFtrZXldXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR3JhcGhcblx0XHRcdGNvbHMubGVuZ3RoID0gMDtcblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHQvLyBDcmVhdGUgZ3JhcGhcblx0XHRcdFx0ZWwuZ3JhcGguc3R5bGUud2lkdGggPSAoby5oaXN0b3J5ICogdGhlbWUuY29sdW1uLndpZHRoICsgKG8uaGlzdG9yeSAtIDEpICogdGhlbWUuY29sdW1uLnNwYWNpbmcpICsgJ3B4JztcblxuXHRcdFx0XHQvLyBBZGQgY29sdW1uc1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgby5oaXN0b3J5OyBpKyspIHtcblx0XHRcdFx0XHRjb2xzW2ldID0gZWwuZ3JhcGguYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvbHVtbikpO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuYm90dG9tID0gMDtcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLnJpZ2h0ID0gKGkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyBpICogdGhlbWUuY29sdW1uLnNwYWNpbmcpICsgJ3B4Jztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLndpZHRoID0gdGhlbWUuY29sdW1uLndpZHRoICsgJ3B4Jztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgaW5pdGlhbCBzdGF0ZVxuXHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0dXBkYXRlQ291bnRlcigpO1xuXG5cdFx0XHQvLyBBcHBlbmQgY29udGFpbmVyIHRvIGFuY2hvclxuXHRcdFx0YW5jaG9yLmFwcGVuZENoaWxkKGVsLmNvbnRhaW5lcik7XG5cblx0XHRcdC8vIFJldHJpZXZlIGdyYXBoIGhlaWdodCBhZnRlciBpdCB3YXMgYXBwZW5kZWQgdG8gRE9NXG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Z3JhcGhIZWlnaHQgPSBlbC5ncmFwaC5jbGllbnRIZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGlmIChvLnRvZ2dsZU9uID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0ZW5lcihlbC5jb250YWluZXIsIG8udG9nZ2xlT24sIGV2ZW50SGFuZGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUG9zaXRpb25zIHRoZSBtZXRlciBiYXNlZCBvbiBvcHRpb25zLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBwb3NpdGlvbk1ldGVyKCkge1xuXHRcdFx0YXBwbHlUaGVtZShlbC5jb250YWluZXIsIG8pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENvbnN0cnVjdC5cblx0XHQgKi9cblx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gQ3JlYXRlIG1ldGVyIGVsZW1lbnRcblx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHQvLyBTdGFydCByZW5kZXJpbmdcblx0XHRcdHJlcXVlc3RSZW5kZXIoKTtcblx0XHR9KCkpO1xuXHR9XG5cblx0Ly8gRXhwb3NlIHRoZSBleHRlbmQgZnVuY3Rpb25cblx0RlBTTWV0ZXIuZXh0ZW5kID0gZXh0ZW5kO1xuXG5cdC8vIEV4cG9zZSB0aGUgRlBTTWV0ZXIgY2xhc3Ncblx0d2luZG93LkZQU01ldGVyID0gRlBTTWV0ZXI7XG5cblx0Ly8gRGVmYXVsdCBvcHRpb25zXG5cdEZQU01ldGVyLmRlZmF1bHRzID0ge1xuXHRcdGludGVydmFsOiAgMTAwLCAgICAgLy8gVXBkYXRlIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblx0XHRzbW9vdGhpbmc6IDEwLCAgICAgIC8vIFNwaWtlIHNtb290aGluZyBzdHJlbmd0aC4gMSBtZWFucyBubyBzbW9vdGhpbmcuXG5cdFx0c2hvdzogICAgICAnZnBzJywgICAvLyBXaGV0aGVyIHRvIHNob3cgJ2ZwcycsIG9yICdtcycgPSBmcmFtZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG5cdFx0dG9nZ2xlT246ICAnY2xpY2snLCAvLyBUb2dnbGUgYmV0d2VlbiBzaG93ICdmcHMnIGFuZCAnbXMnIG9uIHRoaXMgZXZlbnQuXG5cdFx0ZGVjaW1hbHM6ICAxLCAgICAgICAvLyBOdW1iZXIgb2YgZGVjaW1hbHMgaW4gRlBTIG51bWJlci4gMSA9IDU5LjksIDIgPSA1OS45NCwgLi4uXG5cdFx0bWF4RnBzOiAgICA2MCwgICAgICAvLyBNYXggZXhwZWN0ZWQgRlBTIHZhbHVlLlxuXHRcdHRocmVzaG9sZDogMTAwLCAgICAgLy8gTWluaW1hbCB0aWNrIHJlcG9ydGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG5cblx0XHQvLyBNZXRlciBwb3NpdGlvblxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAvLyBNZXRlciBwb3NpdGlvbi5cblx0XHR6SW5kZXg6ICAgMTAsICAgICAgICAgLy8gTWV0ZXIgWiBpbmRleC5cblx0XHRsZWZ0OiAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgbGVmdCBvZmZzZXQuXG5cdFx0dG9wOiAgICAgICc1cHgnLCAgICAgIC8vIE1ldGVyIHRvcCBvZmZzZXQuXG5cdFx0cmlnaHQ6ICAgICdhdXRvJywgICAgIC8vIE1ldGVyIHJpZ2h0IG9mZnNldC5cblx0XHRib3R0b206ICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgYm90dG9tIG9mZnNldC5cblx0XHRtYXJnaW46ICAgJzAgMCAwIDAnLCAgLy8gTWV0ZXIgbWFyZ2luLiBIZWxwcyB3aXRoIGNlbnRlcmluZyB0aGUgY291bnRlciB3aGVuIGxlZnQ6IDUwJTtcblxuXHRcdC8vIFRoZW1lXG5cdFx0dGhlbWU6ICdkYXJrJywgLy8gTWV0ZXIgdGhlbWUuIEJ1aWxkIGluOiAnZGFyaycsICdsaWdodCcsICd0cmFuc3BhcmVudCcsICdjb2xvcmZ1bCcuXG5cdFx0aGVhdDogIDAsICAgICAgLy8gQWxsb3cgdGhlbWVzIHRvIHVzZSBjb2xvcmluZyBieSBGUFMgaGVhdC4gMCBGUFMgPSByZWQsIG1heEZwcyA9IGdyZWVuLlxuXG5cdFx0Ly8gR3JhcGhcblx0XHRncmFwaDogICAwLCAvLyBXaGV0aGVyIHRvIHNob3cgaGlzdG9yeSBncmFwaC5cblx0XHRoaXN0b3J5OiAyMCAvLyBIb3cgbWFueSBoaXN0b3J5IHN0YXRlcyB0byBzaG93IGluIGEgZ3JhcGguXG5cdH07XG5cblx0Ly8gT3B0aW9uIG5hbWVzIHRoYXQgdHJpZ2dlciBGUFNNZXRlciByZWJ1aWxkIG9yIHJlcG9zaXRpb24gd2hlbiBtb2RpZmllZFxuXHR2YXIgcmVidWlsZGVycyA9IFtcblx0XHQndG9nZ2xlT24nLFxuXHRcdCd0aGVtZScsXG5cdFx0J2hlYXQnLFxuXHRcdCdncmFwaCcsXG5cdFx0J2hpc3RvcnknXG5cdF07XG5cdHZhciByZXBvc2l0aW9uZXJzID0gW1xuXHRcdCdwb3NpdGlvbicsXG5cdFx0J3pJbmRleCcsXG5cdFx0J2xlZnQnLFxuXHRcdCd0b3AnLFxuXHRcdCdyaWdodCcsXG5cdFx0J2JvdHRvbScsXG5cdFx0J21hcmdpbidcblx0XTtcbn0od2luZG93KSk7XG47KGZ1bmN0aW9uICh3LCBGUFNNZXRlciwgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyBUaGVtZXMgb2JqZWN0XG5cdEZQU01ldGVyLnRoZW1lID0ge307XG5cblx0Ly8gQmFzZSB0aGVtZSB3aXRoIGxheW91dCwgbm8gY29sb3JzXG5cdHZhciBiYXNlID0gRlBTTWV0ZXIudGhlbWUuYmFzZSA9IHtcblx0XHRoZWF0bWFwczogW10sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwYWRkaW5nOiAnNXB4Jyxcblx0XHRcdG1pbldpZHRoOiAnOTVweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICczMHB4Jyxcblx0XHRcdHRleHRBbGlnbjogJ3JpZ2h0Jyxcblx0XHRcdHRleHRTaGFkb3c6ICdub25lJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0cmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nOiAnNXB4IDEwcHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRmb250U2l6ZTogJzI0cHgnLFxuXHRcdFx0Zm9udEZhbWlseTogJ0NvbnNvbGFzLCBBbmRhbGUgTW9ubywgbW9ub3NwYWNlJyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdHRvcDogMCxcblx0XHRcdGxlZnQ6IDAsXG5cdFx0XHRwYWRkaW5nOiAnNXB4IDEwcHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRmb250U2l6ZTogJzEycHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMycHgnLFxuXHRcdFx0Zm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCcsXG5cdFx0XHR6SW5kZXg6IDJcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdGJveFNpemluZzogJ3BhZGRpbmctYm94Jyxcblx0XHRcdE1vekJveFNpemluZzogJ3BhZGRpbmctYm94Jyxcblx0XHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdFx0ekluZGV4OiAxXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHR3aWR0aDogNCxcblx0XHRcdHNwYWNpbmc6IDEsXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsXG5cdFx0fVxuXHR9O1xuXG5cdC8vIERhcmsgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuZGFyayA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC44LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjhcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjMjIyJyxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHRib3JkZXI6ICcxcHggc29saWQgIzFhMWExYScsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwICMyMjInXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjM2YzZjNmJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTGlnaHQgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUubGlnaHQgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC41XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRjb2xvcjogJyM2NjYnLFxuXHRcdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KSwgLTFweCAtMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdGhlYXRPbjogJ2NvbG9yJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2VhZWFlYSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIENvbG9yZnVsIHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmNvbG9yZnVsID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjUsXG5cdFx0XHRsaWdodG5lc3M6IDAuNlxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0aGVhdE9uOiAnYmFja2dyb3VuZENvbG9yJyxcblx0XHRcdGJhY2tncm91bmQ6ICcjODg4Jyxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjIpJyxcblx0XHRcdGJveFNoYWRvdzogJzAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKSdcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyM3NzcnLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMiknXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBUcmFuc3BhcmVudCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS50cmFuc3BhcmVudCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC44LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdHBhZGRpbmc6IDAsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDAsMCwwLC41KSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDBweCdcblx0XHR9LFxuXHRcdGxlZ2VuZDoge1xuXHRcdFx0cGFkZGluZzogJzAgNXB4Jyxcblx0XHRcdGhlaWdodDogJzQwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzQycHgnXG5cdFx0fSxcblx0XHRncmFwaDoge1xuXHRcdFx0aGVpZ2h0OiAnNDBweCdcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0d2lkdGg6IDUsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzk5OScsXG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0fVxuXHR9KTtcbn0od2luZG93LCBGUFNNZXRlcikpOyIsImltcG9ydCAnLi9saWIvdGlueS1jYW52YXMuanMnO1xuaW1wb3J0ICcuL2xpYi9zb3VuZHMuanMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3VybCc7XG5pbXBvcnQgeyByZWplY3RzIH0gZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAnZnBzbWV0ZXInO1xuXG5kZWNsYXJlIHZhciBmaXJlU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGp1bXBTb3VuZDogYW55O1xuZGVjbGFyZSB2YXIgaGl0U291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGNvaW5Tb3VuZDogYW55O1xuZGVjbGFyZSB2YXIgRlBTTWV0ZXI6IGFueTtcblxuY29uc3QgZnBzTSA9IG5ldyBGUFNNZXRlcigpO1xuXG5kZWNsYXJlIHZhciBUQzogYW55O1xuZGVjbGFyZSB2YXIgVENUZXg6IGFueTtcbmxldCBybmQ6ICgpID0+IG51bWJlciA9IE1hdGgucmFuZG9tXG5cbmludGVyZmFjZSBWZWN0b3Ige1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5pbnRlcmZhY2UgQ2FtZXJhe1xuICBwOiBWZWN0b3JcbiAgdzogbnVtYmVyXG4gIGg6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgUGFydGljbGUgZXh0ZW5kcyBCb2R5e1xufVxuXG5pbnRlcmZhY2UgQnVsbGV0IGV4dGVuZHMgQm9keSB7XG59XG5pbnRlcmZhY2UgQm9keSB7XG4gIHA6IFZlY3RvclxuICB2OiBWZWN0b3JcbiAgZDogRGlyXG4gIGg6IG51bWJlclxuICB3OiBudW1iZXJcbiAgdmk6IGJvb2xlYW5cbn1cbmludGVyZmFjZSBQbGF5ZXIgZXh0ZW5kcyBCb2R5IHtcbiAgczogYm9vbGVhblxuICBjPzogQm9keVxuICBsOm51bWJlclxufVxuaW50ZXJmYWNlIEVuZW15IGV4dGVuZHMgQm9keSB7XG4gIGw6IG51bWJlclxuICBoaTogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgU3RhdGUge1xuICBwOiBQbGF5ZXJcbiAgZXM6IEVuZW15W11cbiAgYnM6IEJ1bGxldFtdLFxuICBoczogQm9keVtdXG4gIHM6IFNcbn1cbmVudW0gU3tcbiAgTSxHLEdPXG59XG5cbmludGVyZmFjZSBJbWdUZXh0dXJlIHtcbiAgdzogbnVtYmVyXG4gIGg6IG51bWJlclxuICB0OiBXZWJHTFRleHR1cmVcbn1cbmVudW0gRGlyIHtcbiAgTCxcbiAgUlxufVxuXG5lbnVtIEV2ZW50VHlwZSB7XG4gIFJQLFxuICBMUixcbiAgUlIsXG4gIExQLFxuICBKUCxcbiAgVVAsXG4gIEFQLFxuICBBUlxufVxuXG50eXBlIEFjdGlvbiA9IEV2ZW50VHlwZVxudHlwZSBNb2RlbCA9IFN0YXRlO1xudmFyIGNhbnZhcyA9IFRDKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjJykpXG5pbnRlcmZhY2UgQUFCQiB7XG4gIGx0OiBWZWN0b3JcbiAgcnQ6IFZlY3RvclxuICByYjogVmVjdG9yXG4gIGxiOiBWZWN0b3Jcbn1cblxuZnVuY3Rpb24gcmRuQW5nbGUoKTogbnVtYmVye1xuICBjb25zdCB2ID0gKHJuZCgpICogKDEyNS0wKSArIDApLzEwMDBcbiAgaWYocm5kKCkgPj0gMC41KXtcbiAgICAgIHJldHVybiAoMi12KSAqIE1hdGguUEkgXG4gIH1lbHNle1xuICAgICAgcmV0dXJuIHYgKiBNYXRoLlBJXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QUFCQihiOiBCb2R5KTogQUFCQiB7XG4gIHJldHVybiB7XG4gICAgbHQ6IHsgeDogYi5wLngsIHk6IGIucC55IH0sXG4gICAgcnQ6IHsgeDogYi5wLnggKyBiLncsIHk6IGIucC55IH0sXG4gICAgcmI6IHsgeDogYi5wLnggKyBiLncsIHk6IGIucC55ICsgYi5oIH0sXG4gICAgbGI6IHsgeDogYi5wLngsIHk6IGIucC55ICsgYi5oIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUaWxlSW5kZWNlcyh2OiBWZWN0b3IpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcih2LnkgLyAyMCAvKiB0aWxlU2l6ZSAqLykgKiA1MCAvKiB3b3JsZFNpemUgKi8gKyBNYXRoLmZsb29yKHYueCAvIDIwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpZGUoYm9keTE6IEJvZHksIGJvZHkyOiBCb2R5KTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc3VsdCA9IGJvZHkxLnAueCA8IChib2R5Mi5wLnggKyBib2R5Mi53KSAmJlxuICAgIGJvZHkxLnAueCArIChib2R5MS53KSA+IGJvZHkyLnAueCAmJlxuICAgIGJvZHkxLnAueSA8IGJvZHkyLnAueSArIGJvZHkyLmggJiZcbiAgICBib2R5MS5wLnkgKyBib2R5MS5oID4gYm9keTIucC55O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBsb2FkVGV4dHVyZXModXJsczogc3RyaW5nW10pOiBQcm9taXNlPEltZ1RleHR1cmVbXT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmVyLCByZWplY3RzKSA9PiB7XG4gICAgbGV0IHJlc3VsdDogSW1nVGV4dHVyZVtdID0gbmV3IEFycmF5PEltZ1RleHR1cmU+KCk7XG5cbiAgICB1cmxzLmZvckVhY2goKHVybCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZVxuICAgICAgaW1nLnNyYyA9IHVybFxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgIGcuY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHRcbiAgICAgICAgZy5jYW52YXMud2lkdGggPSBpbWcud2lkdGhcbiAgICAgICAgZy5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGNvbnN0IHRleDE6IEltZ1RleHR1cmUgID0ge1xuICAgICAgICAgIHc6IGltZy53aWR0aCxcbiAgICAgICAgICBoOiBpbWcuaGVpZ2h0LFxuICAgICAgICAgIHQ6IFRDVGV4KGNhbnZhcy5nLCBnLmNhbnZhcywgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KSBhcyBXZWJHTFRleHR1cmVcbiAgICAgICAgfVxuXG4gICAgICAgIGcuY2xlYXJSZWN0KDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5zYXZlKClcbiAgICAgICAgZy5zY2FsZSgtMSwgMSlcbiAgICAgICAgZy5kcmF3SW1hZ2UoaW1nLCBpbWcud2lkdGggKiAtMSwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBnLnJlc3RvcmUoKVxuICAgICAgICBjb25zdCB0ZXgyOiBJbWdUZXh0dXJlID0ge1xuICAgICAgICAgIHc6IGltZy53aWR0aCxcbiAgICAgICAgICBoOiBpbWcuaGVpZ2h0LFxuICAgICAgICAgIHQ6IFRDVGV4KGNhbnZhcy5nLCBnLmNhbnZhcywgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KSBhcyBXZWJHTFRleHR1cmVcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGkgPSBpbmRleCoyO1xuICAgICAgICByZXN1bHRbaSsrXSA9IHRleDFcbiAgICAgICAgcmVzdWx0W2ldID0gdGV4MlxuICAgICAgICBpZiAoaW5kZXggPT0gdXJscy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlcihyZXN1bHQpXG4gICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1bGxldFRleHR1cmUoKXtcbiAgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpXG4gIGcuY2FudmFzLndpZHRoID0gNFxuICBnLmNhbnZhcy5oZWlnaHQgPSA0XG4gIGcuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGcuZmlsbFN0eWxlID0gJyNmZjYnO1xuICBnLmJlZ2luUGF0aCgpO1xuICBnLmFyYygyLCAyLCAyLCAwLCAyICogTWF0aC5QSSk7XG4gIGcuZmlsbCgpXG4gIHJldHVybiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIDQsIDQpIGFzIFdlYkdMVGV4dHVyZVxufVxuXG5sb2FkVGV4dHVyZXMoW1wic2gucG5nXCIsXCJoLnBuZ1wiLFwiYmgucG5nXCJcbixcIm0ucG5nXCIsXCJmLnBuZ1wiLCBcInNyLnBuZ1wiLCBcInNpLnBuZ1wiLCBcblwic3MucG5nXCIsIFwiYi5wbmdcIiwgXCJhLnBuZ1wiXSkudGhlbigodGV4dHVyZXMpID0+IHtcbiAgY29uc3QgW3JTb2xIb3N0LGxTb2xIb3N0LHJIb3N0LGxIb3N0LHJib3RIaXQsbGJvdEhpdCxcbiAgICAsbE1vdW50YWluLHJpZ2h0Rmxvb3IsbGVmdEZsb29yLCByaWdodFJ1biwgbGVmdFJ1biwgcmlnaHRJZGxlXG4gICAgLCBsZWZ0SWRsZSwgcmlnaHRTaG9vdCwgbGVmdFNob290LCByaWdodEJvdCwgbGVmdEJvdCwgYWJjLCxdID0gdGV4dHVyZXNcblxuICBjb25zdCBidWxsZXRUZXh0dXJlID0gY3JlYXRlQnVsbGV0VGV4dHVyZSgpXG5cbiAgbGV0IGN1cnJlbnREZWx0YSA9IDAuMFxuICBsZXQgY3VycmVudFRpbWUgPSAwLjBcbiAgbGV0IGN1cnJlbnRBY3Rpb246IEFjdGlvbiA9IG51bGxcbiAgY29uc3QgR1JBVklUWSA9IDEwXG5cbiAgbGV0IHNjb3JlID0gMFxuICBsZXQgYWRkU2NvcmUgPSAwXG4gIGxldCB0b05leHRTY29yZSA9IDEwXG5cbiAgY29uc3QgSlVNUF9WRUwgPSAzMFxuICBjb25zdCBXQUxLX1NQRUVEID0gNlxuICBsZXQgc3RhcnRUaW1lID0gMDtcbiAgbGV0IGlkID0gMDtcbiAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gW2NhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodF1cblxuICBsZXQgcGFydGljbGVzOiBQYXJ0aWNsZVtdID0gW11cbiAgbGV0IHBlcnNpc3RlbmNlOiBQYXJ0aWNsZVtdID0gW11cblxuICBmdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xuICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiAoZXZ0LmNsaWVudFggLSByZWN0LmxlZnQpKjAuMyxcbiAgICAgIHk6IChldnQuY2xpZW50WSAtIHJlY3QudG9wKSAqIDAuMTVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGluaXRCdWxsZXRzKG51bTogbnVtYmVyKTogQnVsbGV0W10ge1xuICAgIGNvbnN0IGJzOiBCdWxsZXRbXSA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgYnMucHVzaCh7IHA6IHsgeDogNTAsIHk6IDUwIH0sIHY6IHsgeDogMCwgeTogMCB9LCB2aTogZmFsc2UsIGQ6IERpci5MLCB3OiA0LCBoOiA0IH0pXG4gICAgfVxuICAgIHJldHVybiBic1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEhvc3RhKG51bTogbnVtYmVyKTogQm9keVtdIHtcbiAgICBjb25zdCBiczogQm9keVtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICBicy5wdXNoKHsgcDogeyB4OiAyNTAsIHk6IDAgfSwgdjogeyB4OiAwLCB5OiAwIH0sIHZpOiB0cnVlLCBkOiBEaXIuTCwgdzogMTYsIGg6IDE2IH0pXG4gICAgfVxuICAgIHJldHVybiBic1xuICB9XG5cblxuICBmdW5jdGlvbiBuZXdFbmVteSh4OiBudW1iZXIsIHk6bnVtYmVyLCB2ZWw6IG51bWJlcik6IEVuZW15IHtcbiAgICByZXR1cm4ge1xuICAgICAgcDogeyB4OiB4LCB5OiB5IH0sXG4gICAgICB2OiB7IHg6IHZlbCwgeTogMC4wIH0sXG4gICAgICBkOiBEaXIuTCxcbiAgICAgIHc6IDIwLFxuICAgICAgaDogMjAsXG4gICAgICB2aTogZmFsc2UsXG4gICAgICBoaTogZmFsc2UsXG4gICAgICBsOiAzXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG5ld0VuZW1pZXMoeDogbnVtYmVyLCB5Om51bWJlciwgbjogbnVtYmVyKTogRW5lbXkgW117XG4gICAgY29uc3QgZXMgPSBbXVxuICAgIGZvcih2YXIgaT0wOyAgaTwgbjsgaSsrKXtcbiAgICAgIGVzLnB1c2gobmV3RW5lbXkoeCx5LFdBTEtfU1BFRUQqIHJuZCgpICogKDMuOS0xLjcpICsgMS43KSlcbiAgICB9XG4gICAgcmV0dXJuICBlc1xuICB9XG5cbiAgY29uc3QgY2FtOiBDYW1lcmEgPSB7cDp7eDowLHk6MH0sdzozMDAsaDogMTUwfVxuICB3aW5kb3dbXCJjYW1cIl0gPSBjYW1cblxuICBsZXQgY2FtQ2VudGVyID0gY2FtLnBcbiAgbGV0IHJhZGlvVG9TaGFrZSA9IDBcbiAgbGV0IHNoYWtlID0gZmFsc2VcblxuICBmdW5jdGlvbiBzaGFraW5nKCl7XG4gICAgY29uc3QgeCA9IDAsIHkgPSAwXG4gICAgY29uc3QgYW5nID0gcm5kKCkgJSBNYXRoLlBJICogMlxuICAgIGNvbnN0IG54ID0gTWF0aC5zaW4oYW5nKSAqIHJhZGlvVG9TaGFrZVxuICAgIGNvbnN0IG55ID0gTWF0aC5jb3MoYW5nKSAqIHJhZGlvVG9TaGFrZVxuICAgIGNhbS5wLnggPSB4ICsgbnhcbiAgICBjYW0ucC55ID0geSArIG55XG4gICAgcmFkaW9Ub1NoYWtlICo9IDAuOVxuICB9XG4vKiAgIGNhbnZhcy5nLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLmcuY2FudmFzLCBldmVudClcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3VycmVudFN0YXRlLmhvc3RhZ2VzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGNvbnN0IGhvc3QgPSBjdXJyZW50U3RhdGUuaG9zdGFnZXNbaV1cbiAgICAgICAgaG9zdC5wb3NpdGlvbi54ID0gY2FtLnBvc2l0aW9uLngrcG9zLnhcbiAgICAgICAgaG9zdC5wb3NpdGlvbi55ID0gY2FtLnBvc2l0aW9uLnkrcG9zLnlcbiAgICAgICAgaG9zdC52aXNpYmxlID0gdHJ1ZVxuICAgIH1cbiAgfSkgKi9cblxuICBjYW52YXMuZy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGxldCB0YWtlID0gMVxuICAgIGNvbnN0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcy5nLmNhbnZhcywgZXZlbnQpXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdGF0ZS5lcy5sZW5ndGg7IGkrKyl7XG4gICAgICBjb25zdCBlbmUgPSBjdXJyZW50U3RhdGUuZXNbaV1cbiAgICAgIGlmKCFlbmUudmkgJiYgdGFrZSA+IDApe1xuICAgICAgICBlbmUucC54ID0gY2FtLnAueCtwb3MueFxuICAgICAgICBlbmUucC55ID0gY2FtLnAueStwb3MueVxuICAgICAgICBlbmUudmkgPSB0cnVlXG4gICAgICAgIGVuZS52aSA9IHRydWVcbiAgICAgICAgZW5lLmwgPSA1XG4gICAgICAgIGVuZS52LnggPSAgcm5kKCkgKiAoMy45LTEuNykgKyAxLjcgICogKCBjdXJyZW50U3RhdGUucC5wLnggPiBlbmUucC54ID9cbiAgICAgICAgV0FMS19TUEVFRCA6IC1XQUxLX1NQRUVEKVxuICAgICAgICBlbmUuZCA9IGVuZS52LnggPiAwID8gRGlyLkwgOiBEaXIuUlxuICAgICAgICB0YWtlIC0tXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIGV4cGxvZGVQYXJ0aWNsZXMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lke1xuICAgIHZhciBybmQgPSBNYXRoLnJhbmRvbVxuICAgIGNvbnN0IHNwID0gV0FMS19TUEVFRCoyXG4gICAgY29uc3QganAgPSBKVU1QX1ZFTCozXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHRjb25zdCB2eCA9IHJuZCgpICogKHNwIC0gKC1zcCkpICsgKC1zcClcblx0XHRcdGNvbnN0IHZ5ID0gcm5kKCkgKiAoanAgLSAoLWpwKSkgKyAoLWpwKVxuXHRcdFx0dmFyIGFuZ2xlID0gcm5kKCkgKiBNYXRoLlBJICogMjtcblx0XHRcdHBhcnRpY2xlcy5wdXNoKHtwOiB7eDogeCx5Onl9LHY6e3g6IHZ4ICogTWF0aC5jb3MoYW5nbGUpLCB5OnZ5ICogTWF0aC5zaW4oYW5nbGUpfSxkOkRpci5MLGg6NCx3OjQsdmk6dHJ1ZX0pXG5cdFx0fVxuICB9XG5cbiAgbGV0IGN1cnJlbnRTdGF0ZTogTW9kZWwgPSB7XG4gICAgcDoge1xuICAgICAgcDogeyB4OiAxMjgsIHk6IDAuMCB9LFxuICAgICAgdjogeyB4OiAwLjAsIHk6IDAuMCB9LFxuICAgICAgZDogRGlyLlIsXG4gICAgICBzOiBmYWxzZSxcbiAgICAgIHc6IDIwLFxuICAgICAgaDogMjAsXG4gICAgICB2aTogdHJ1ZSxcbiAgICAgIGw6IDNcbiAgICB9LFxuICAgIGVzOiBuZXdFbmVtaWVzKDM0LDAsNTApLFxuICAgIGJzOiBpbml0QnVsbGV0cyg2MCksXG4gICAgaHM6IGluaXRIb3N0YSgxKSxcbiAgICBzOiBTLk1cbiAgfVxuXG4gIGNvbnN0IEZMT09SID0gaGVpZ2h0IC0gMTBcbiAgY29uc3QgU0VDT05EX0ZMT09SID0gRkxPT1IgKiAwLjdcbiAgY29uc3Qgem9uZTogQm9keSA9IHsgcDogeyB4OiA1MCwgeTogRkxPT1IgfSwgdjogeyB4OiAwLCB5OiAwIH0sIHZpOiB0cnVlLCBkOiBEaXIuTCwgdzogMTUwLCBoOiAyMCB9XG5cblxuICBmdW5jdGlvbiBjcmVhdGVGbG9vcih4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBCb2R5IHtcbiAgICByZXR1cm4ge3A6e3g6eCwgeTogeX0sdzogd2lkdGgsIGg6IDIwLGQ6IERpci5MLHY6e3g6MCx5OjB9LHZpOiB0cnVlfVxuICB9XG5cbiAgY29uc3QgZmxvb3JzID0gW2NyZWF0ZUZsb29yKDAuMCxGTE9PUiw5MDApLCBjcmVhdGVGbG9vcigyMDAuMCxTRUNPTkRfRkxPT1IsMjYwKSxjcmVhdGVGbG9vcigzMDAuMCxTRUNPTkRfRkxPT1IsMzYwKV1cblxuICBjb25zdCBrZWVwQW5pbWF0aW9uID0gKHRpbWU6IG51bWJlcikgPT4ge1xuICAgIGN1cnJlbnREZWx0YSA9ICh0aW1lIC0gc3RhcnRUaW1lKSAvIDEwMDtcbiAgICBjdXJyZW50VGltZSA9IHRpbWVcbiAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgIFxuICAgIHJlbmRlcihjdXJyZW50U3RhdGUpXG4gICAgdXBkYXRlKGN1cnJlbnRBY3Rpb24sIGN1cnJlbnRTdGF0ZSlcbiAgICBjdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9XG5cblxuICBjb25zdCBoYW5kbGVyU3RhcnQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkFQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJQXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYW5kbGVyRW5kID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkFSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJSXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicmVjdFwiKTtcbiAgY29uc3QgcHNPcCA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICBzdmdzLmZvckVhY2gocmVjID0+IHtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICB9KTtcblxuICBjb25zdCBoYW5kbGVyS0JEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkpQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5VUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVBcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcktCRG93biwgdHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlcktCVXAgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SUlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVJcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXJLQlVwLCB0cnVlKTtcblxuICBmdW5jdGlvbiBCb2R5QW5pbWF0aW9uKFxuICAgIHJpZ2h0VDogSW1nVGV4dHVyZSxcbiAgICBsZWZ0VDogSW1nVGV4dHVyZSxcbiAgICB0aWNrc1BlckZyYW1lOiBudW1iZXIsXG4gICAgbG9vcDogYm9vbGVhbixcbiAgICBmcmFtZXM6IG51bWJlcltdW10pIHtcbiAgICBjb25zdCBuRnJhbWVzID0gZnJhbWVzLmxlbmd0aDtcbiAgICBsZXQgZnJhbWVJbmRleCA9IDAsXG4gICAgICB0aWNrQ291bnQgPSAwXG5cbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEoZnJhbWVJbmRleCA8IG5GcmFtZXMgLSAxKSkge1xuICAgICAgICBmcmFtZUluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAocDogQm9keSkge1xuICAgICAgdGlja0NvdW50ICs9IDFcbiAgICAgIGlmICh0aWNrQ291bnQgPiB0aWNrc1BlckZyYW1lKSB7XG4gICAgICAgIHRpY2tDb3VudCA9IDBcbiAgICAgICAgaWYgKGZyYW1lSW5kZXggPCBmcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIC8vIEdvIHRvIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgICAgZnJhbWVJbmRleCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGxvb3ApIHtcbiAgICAgICAgICBmcmFtZUluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgW3YwLCB1MCwgdjEsIHUxXSA9IGZyYW1lc1tmcmFtZUluZGV4XVxuICAgICAgbGV0IHRleHQgPSBwLmQgPT0gRGlyLlIgPyByaWdodFQgOiBsZWZ0VFxuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgdGV4dC50LFxuICAgICAgICAtY2FtLnAueCsocC5wLnggKyAocC53IC8gMikpLFxuICAgICAgICAtY2FtLnAueStwLnAueSxcbiAgICAgICAgcC53LFxuICAgICAgICBwLmgsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbi8qICAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLHNlY29uZEZsb29yQm9keSk7XG4gIH1cbiAqL1xuICBmdW5jdGlvbiBpc092ZXJGbG9vcihiOiBCb2R5KTogYm9vbGVhbntcbiAgICBsZXQgZmxvb3JCb3R0b21zOiBib29sZWFuID0gZmFsc2U7XG4gICAgZm9yKHZhciBpPTA7aTxmbG9vcnMubGVuZ3RoO2krKyl7XG4gICAgICBmbG9vckJvdHRvbXMgPSBmbG9vckJvdHRvbXMgfHwgY29sbGlkZUZsb29yQm90dG9tKGIsZmxvb3JzW2ldKVxuICAgIH1cbiAgICByZXR1cm4gYi5wLnkgKyBiLmggPT0gRkxPT1IgfHwgZmxvb3JCb3R0b21zO1xuICB9XG4gIFxuICBjb25zdCBib3RIaXR0ZWRBbmltID0gbmV3IEJvZHlBbmltYXRpb24ocmJvdEhpdCwgbGJvdEhpdCwgMiwgdHJ1ZSwgW1swLCAwLCAxLCAxXV0pXG4gIGNvbnN0IGJvdEFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodEJvdCwgbGVmdEJvdCwgNSwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IE9ORVRISVJEID0gMS8zIFxuICBjb25zdCBzb2xkaWVySG9zdEFuaSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJTb2xIb3N0LCBsU29sSG9zdCwgMTQsIGZhbHNlLCBbWzAsIDAsIDEsIE9ORVRISVJEXSwgWzAsIE9ORVRISVJELCAxLCBPTkVUSElSRCoyXSxbMCwgT05FVEhJUkQqMiwgMSwgMV1dKVxuICBjb25zdCBpZGxlQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0SWRsZSwgbGVmdElkbGUsIDIwLCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaG9zdEFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihySG9zdCwgbEhvc3QsIDIwLCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgcnVuQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0UnVuLCBsZWZ0UnVuLCA4LCB0cnVlLCBbWzAsIDAsIDEsIDAuMl0sIFswLCAuMiwgMSwgMC40XSwgWzAsIC40LCAxLCAwLjZdLCBbMCwgLjYsIDEsIDAuOF0sIFswLCAuOCwgMSwgMS4wXV0pXG4gIGNvbnN0IHNob290aW5nQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgMywgZmFsc2UsIFtbMCwgMCwgMSwgMC4yNV0sIFswLCAuMjUsIDEsIDAuNV0sIFswLCAuNSwgMSwgMC43NV0sIFswLCAuNzUsIDEsIDEuMF1dKVxuXG4gIGxldCBndW5SZWFkeTogbnVtYmVyID0gMFxuICBsZXQganVtcFRyaWVzOm51bWJlciA9IDJcbiAgbGV0IHRpY2tzSGl0dGVkOiBudW1iZXIgPSAwXG4gIGZ1bmN0aW9uIHVwZGF0ZShhOiBBY3Rpb24sIG06IE1vZGVsKSB7XG4gICAgaWYobS5zID09IFMuRyl7XG4gICAgaWYocmFkaW9Ub1NoYWtlID4gMC4wMDAyKXtcbiAgICAgIHNoYWtpbmcoKVxuICAgIH1cbiAgICBjb25zdCBwID0gbS5wXG4gICAgaWYgKGlzT3ZlckZsb29yKHApKSB7XG4gICAgICBqdW1wVHJpZXMgPSAyXG4gICAgfVxuICAgIHN3aXRjaCAoYSkge1xuICAgICAgY2FzZSBFdmVudFR5cGUuSlA6XG4gICAgICAgIGlmKGp1bXBUcmllcyA+IDApe1xuICAgICAgICAgIGp1bXBUcmllcy0tXG4gICAgICAgICAgXG4gICAgICAgICAgcC52LnkgPSBwLmMgPyAtSlVNUF9WRUwvMiA6IC1KVU1QX1ZFTFxuICAgICAgICAgIGp1bXBTb3VuZCgpXG4gICAgICAgIH1cbiAgICAgICAgcC5zID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MUDpcbiAgICAgICAgcC5kID0gRGlyLkxcbiAgICAgICAgcC52LnggPSBwLmMgPyAtV0FMS19TUEVFRC8yIDogLVdBTEtfU1BFRURcbiAgICAgICAgcC5zID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SUDpcbiAgICAgICAgcC5kID0gRGlyLlJcbiAgICAgICAgcC52LnggPSBwLmMgPyBXQUxLX1NQRUVELzIgOiBXQUxLX1NQRUVEXG4gICAgICAgIHAucyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTFI6XG4gICAgICAgIHAudi54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJSOlxuICAgICAgICBwLnYueCA9IDBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BUDpcbiAgICAgICAgaWYoIW0ucC5jKXtcbiAgICAgICAgc2hvb3RpbmdBbmltLnJlc2V0KClcbiAgICAgICAgcC5zID0gdHJ1ZVxuICAgICAgICBwLnYueCA9IChwLmQgPT0gRGlyLkwgPyAxLjUgOiAtMS41KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGIgPSBtLmJzW2ldXG4gICAgICAgICAgaWYgKCFiLnZpICYmIGd1blJlYWR5ID09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gcmRuQW5nbGUoKVxuICAgICAgICAgICAgYi5wLnggPSBwLnAueCArIHAudyArIGIud1xuICAgICAgICAgICAgYi5wLnkgPSBwLnAueSArIChwLmggLyAyLjQpXG4gICAgICAgICAgICBiLnYueCA9IChwLmQgPT0gRGlyLlIgPyAzNSA6IC0zNSkgKiBNYXRoLmNvcyhhbmdsZSlcbiAgICAgICAgICAgIGIudi55ID0gNSAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgICAgICAgYi52aSA9IHRydWVcbiAgICAgICAgICAgIGd1blJlYWR5ID0gM1xuICAgICAgICAgICAgZmlyZVNvdW5kKClcbiAgICAgICAgICAgIHJhZGlvVG9TaGFrZSA9IDJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBob3N0ID0gbS5wLmNcbiAgICAgICAgaG9zdC52aSA9IHRydWVcbiAgICAgICAgaG9zdC5wLnggPSBtLnAuZCA9PSBEaXIuTCA/IG0ucC5wLnggLSAyNSA6IG0ucC5wLnggKyAyNVxuICAgICAgICBob3N0LnAueSA9IG0ucC5wLnkgLSAxMFxuICAgICAgICBtLnAuYyA9IG51bGxcbiAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkFSOlxuICAgICAgICBwLnYueCA9IDBcbiAgICAgICAgLy9wLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgLy9TaG9vdGluZ0FuaW0ucmVzZXQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcblxuICAgICBtb3ZlKG0ucClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5ocy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaCA9IG0uaHNbaV1cbiAgICAgIG1vdmUoaClcbiAgICAgIGlmKGgudmkgJiYgY29sbGlkZShtLnAsaCkgJiYgIW0ucC5jKXtcbiAgICAgICAgaC52aSA9IGZhbHNlXG4gICAgICAgIG0ucC5jID0gaFxuICAgICAgfVxuICAgICAgaWYoaC52aSAmJiBjb2xsaWRlKGgsem9uZSkpe1xuICAgICAgICBhZGRTY29yZSArPSA1MDBcbiAgICAgICAgaC52aSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZSA9IG0uZXNbaV1cbiAgICAgIHRpY2tzSGl0dGVkID0gTWF0aC5tYXgodGlja3NIaXR0ZWQtMSwwKVxuICAgICAgaWYodGlja3NIaXR0ZWQgPT0gMCl7XG4gICAgICAgIGUuaGkgPSBmYWxzZVxuICAgICAgfVxuICAgICAgbW92ZShlKVxuICAgICAgaWYgKGUucC54IDwgMCB8fCAoZS5wLnggKyAyMCA+IDkwMCkpIHtcbiAgICAgICAgZS52LnggPSBlLnYueCAqIC0xXG4gICAgICAgIGUuZCA9IGUudi54ID4gMCA/IERpci5MIDogRGlyLlJcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaiA9IDA7ajwgbS5icy5sZW5ndGg7aisrKXtcbiAgICAgICAgY29uc3QgYiA9IG0uYnNbal1cbiAgICAgICAgaWYgKGUudmkgJiYgYi52aSAmJiBjb2xsaWRlKGIsIGUpKSB7XG4gICAgICAgICAgaGl0U291bmQoKVxuICAgICAgICAgIGUuaGkgPSB0cnVlXG4gICAgICAgICAgdGlja3NIaXR0ZWQgPSA4XG4gICAgICAgICAgZS5wLnggKz0gKGIudi54ID4gMCA/ICsgMTggOiAtMTgpXG4gICAgICAgICAgaWYoZS5sID09IDApe1xuICAgICAgICAgICAgcmFkaW9Ub1NoYWtlID0gNFxuICAgICAgICAgICAgZXhwbG9kZVBhcnRpY2xlcyhlLnAueCsoZS53LzIpLGUucC55KyhlLmgvMikpXG4gICAgICAgICAgICBlLnZpID0gZmFsc2VcbiAgICAgICAgICAgIGUudi54ID0gMFxuICAgICAgICAgICAgYWRkU2NvcmUgKz0gMTAwXG5cbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGUubCA9IE1hdGgubWF4KGUubC0xLDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGIudmkgPSBmYWxzZVxuICAgICAgICAgIGIudi54ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihlLnZpICYmIGNvbGxpZGUoZSxtLnApKXtcbiAgICAgICAgbS5wLmwtLVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJzW2ldXG4gICAgICBtb3ZlQnVsbGV0KGIpXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICBtb3ZlKHApXG5cblxuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20ocCxmbG9vcnNbZl0pKXtcbiAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgcGVyc2lzdGVuY2UucHVzaChwKSAgICAgICAgIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ3VuUmVhZHkgPSBNYXRoLm1heCgwLCBndW5SZWFkeSAtIDEpO1xuICAgIG1vdmVDYW0obS5wKVxuXG4gICAgaWYodG9OZXh0U2NvcmUgPD0gMCAmJiBhZGRTY29yZT4wKXtcbiAgICAgIHNjb3JlKz0xMFxuICAgICAgY29pblNvdW5kKClcbiAgICAgIHRvTmV4dFNjb3JlID0gMTBcbiAgICAgIGFkZFNjb3JlID0gTWF0aC5tYXgoYWRkU2NvcmUtMTAsMClcblxuICAgIH1cbiAgICB0b05leHRTY29yZS0tXG4gICAgem9uZS5wLnkgKz0gKChGTE9PUi0xMCkgLSB6b25lLnAueSkgKiAwLjEgXG4gICAgem9uZS5wLnkgPSBNYXRoLmZsb29yKHpvbmUucC55KSA9PSBGTE9PUi0xMCA/IEZMT09SIDogem9uZS5wLnlcbiAgXG4gIH1lbHNlIGlmKG0ucyA9PSBTLk0pe1xuICAgIGlmKGEgPT0gRXZlbnRUeXBlLkFQKXtcbiAgICAgIG0ucyA9IFMuR1xuICAgIH1cbiAgfVxuICB9XG4gIGZ1bmN0aW9uIG1vdmVDYW0oYjogQm9keSk6IHZvaWR7XG4gICAgY2FtLnAueCA9IE1hdGgubWF4KGIucC54IC0gKGNhbS53LzIpLDApXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNb3VudGFpbigpIHtcbiAgICBjYW52YXMucHVzaCgpXG4gICAgY2FudmFzLnNjYWxlKDYsNilcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDEwMDsgeCArPSAyMCkge1xuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgbE1vdW50YWluLnQsXG4gICAgICAgKC1jYW0ucC54KjAuMDYpICsgeCxcbiAgICAgICAoLWNhbS5wLnkqMC4wNikgKyA1LFxuICAgICAgICBsTW91bnRhaW4udyxcbiAgICAgICAgbE1vdW50YWluLmgsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfVxuICAgICAgY2FudmFzLnBvcCgpXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGbG9vcigpIHtcbiAgICAgIGZvcih2YXIgZj0wOyBmPGZsb29ycy5sZW5ndGg7ZisrKXtcbiAgICAgICAgY29uc3QgZmxvb3IgPSBmbG9vcnNbZl1cbiAgICAgICAgZm9yICh2YXIgeCA9IGZsb29yLnAueDsgeCA8PSBmbG9vci5wLngrZmxvb3IudyA7IHggKz0gMjApIHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0geCAlIDcgPT0gMCA/IGxlZnRGbG9vciA6IHJpZ2h0Rmxvb3JcbiAgICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgICAgdGV4dC50LFxuICAgICAgICAgICAgLWNhbS5wLngreCxcbiAgICAgICAgICAgIC1jYW0ucC55KyhmbG9vci5wLnktMTApLFxuICAgICAgICAgICAgdGV4dC53LFxuICAgICAgICAgICAgdGV4dC5oLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaWZPblRoZUZsb29yZ2V0WShiOiBCb2R5KTogbnVtYmVye1xuICAgIGxldCBib3R0b21Db2xsaWRlOiBudW1iZXIgPSAtMVxuICAgIGZvcih2YXIgaSA9IDA7aTwgZmxvb3JzLmxlbmd0aDtpKyspe1xuICAgICAgIGJvdHRvbUNvbGxpZGUgPSBjb2xsaWRlRmxvb3JCb3R0b20oYixmbG9vcnNbaV0pID8gZmxvb3JzW2ldLnAueSA6IC0xIFxuICAgIH1cbiAgICByZXR1cm4gYm90dG9tQ29sbGlkZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52LnkgPSAgaWZPblRoZUZsb29yZ2V0WShiKSA8IDAgPyBiLnYueSArIChHUkFWSVRZICogY3VycmVudERlbHRhKSA6IGIudi55XG4gIH1cblxuICBmdW5jdGlvbiBvdXRzaWRlU2NyZWVuKGI6IEJ1bGxldCkge1xuICAgIHJldHVybiBiLnAueCA8IDAgfHwgYi5wLnggPiA5MDBcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVCdWxsZXQoYjogQnVsbGV0KTogdm9pZCB7XG4gICAgaWYgKG91dHNpZGVTY3JlZW4oYikpIHtcbiAgICAgIGIudmkgPSBmYWxzZVxuICAgICAgYi52LnggPSAwXG4gICAgfVxuICAgIGIucC54ICs9IGIudi54ICogY3VycmVudERlbHRhXG4gICAgYi5wLnkgKz0gYi52LnkgKiBjdXJyZW50RGVsdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vclRvcChiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgZi5wLnkrKGYuaC8yKSA+IGIucC55XG4gIH1cbiAgZnVuY3Rpb24gY29sbGlkZUZsb29yQm90dG9tKGI6IEJvZHksIGY6IEJvZHkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgYi5wLnkgPCBmLnAueVxuICAgfVxuXG4gICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JMZWZ0KGI6IEJvZHksZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnAueCA8IGYucC54ICYmIGIucC54K2IudyA+IGYucC54XG4gICB9XG4gICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JSaWdodChiOiBCb2R5LGY6IEJvZHkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgYi5wLngrKGIudyowLjkpIDwgZi5wLnggJiYgYi52LnggPiAwXG4gICB9XG5cbiAgZnVuY3Rpb24gbW92ZShiOiBCb2R5KTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdW5kWSA9IGlmT25UaGVGbG9vcmdldFkoYilcbiAgICBiLnAueSA9IGdyb3VuZFkgPCAwID8gYi5wLnkgKyAoYi52LnkgKiBjdXJyZW50RGVsdGEpIDogZ3JvdW5kWSAtIGIuaFxuICAgIGIucC54ICs9IGIudi54ICogY3VycmVudERlbHRhXG4gICAgYXBwbHlHcmF2aXR5KGIpXG5cbiAgICBmb3IodmFyIGYgPTA7IGY8IGZsb29ycy5sZW5ndGg7IGYrKyl7XG5cbiAgICAgIGlmKGNvbGxpZGVGbG9vclRvcChiLGZsb29yc1tmXSkpe1xuICAgICAgICBpZihiLnYueSA8IDApe1xuICAgICAgICAgIGIudi55ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20oYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52LnkgPiAwKXtcbiAgICAgICAgICBiLnYueSA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuZnVuY3Rpb24gcmVuZGVyVGV4dCh3OiBzdHJpbmcseDogbnVtYmVyLHk6bnVtYmVyLHM6bnVtYmVyKXtcbiAgY29uc3QgY29vciA9IHJlbmRlckNvb3JkKHcpXG4gIHZhciBuZXdYID0gLSgody5sZW5ndGgqICg0KnMpICkgLzIpIDtcbiAgZm9yKHZhciBjID0gMDsgYzxjb29yLmxlbmd0aDtjKyspe1xuICAgIGNhbnZhcy5pbWcoXG4gICAgICBhYmMudCxcbiAgICAgIG5ld1greCxcbiAgICAgIHksXG4gICAgICA0KnMsXG4gICAgICA0KnMsXG4gICAgICBjb29yW2NdWzBdLFxuICAgICAgY29vcltjXVsxXSxcbiAgICAgIGNvb3JbY11bMl0sXG4gICAgICBjb29yW2NdWzNdXG4gICAgKTtcblxuICAgIG5ld1grPSAoNCpzKSsxXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29vcmQodzogc3RyaW5nKTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl1bXXtcbiAgY29uc3QgbGV0dGVyczogc3RyaW5nW10gPSBbJ2FiY2RlZmdoaWprbG0nLCdub3BxcnN0dXZ3eHl6JywgJzAxMjM0NTY3ODk6ISsnXVxuICBsZXQgcmVzcDpbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXVtdID0gbmV3IEFycmF5PFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdPigpXG5cbiAgZm9yKHZhciBpID0gMDtpPHcubGVuZ3RoO2krKyl7XG4gICAgY29uc3QgbCA9IHcuY2hhckF0KGkpXG4gICAgZm9yKHZhciByID0gMDsgcjxsZXR0ZXJzLmxlbmd0aDtyKyspe1xuICAgICAgY29uc3QgaW5kZXggPSBsZXR0ZXJzW3JdLmluZGV4T2YobClcbiAgICAgIGlmKGluZGV4ID4gLTEpe1xuICAgICAgICByZXNwLnB1c2goWyhpbmRleCo0KS81MiwgKHIqNCkgLzEyLCAoKGluZGV4KjQpKzQpLzUyICwgKChyKjQpKzQpLzEyXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzcFxufVxuXG5cbiAgY29uc3QgcmVuZGVyID0gKG06IE1vZGVsKSA9PiB7XG4gICAgY2FudmFzLmcuY2FudmFzLnN0eWxlLndpZHRoID0gXCJhdXRvXCI7XG4gICAgY2FudmFzLmcuY2FudmFzLnN0eWxlLmhlaWdodCA9ICBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lckhlaWdodCowLjk1KSArIFwicHhcIiA7XG4gICAgY2FudmFzLmcudmlld3BvcnQoMCwgMCwgY2FudmFzLmcuY2FudmFzLndpZHRoLCBjYW52YXMuZy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIGlmKHdpbmRvdy5pbm5lckhlaWdodD53aW5kb3cuaW5uZXJXaWR0aCl7XG4gICAgICBjYW52YXMuY2xzKClcbiAgICAgIGNhbnZhcy5ia2coMCwwLDApXG4gICAgICByZW5kZXJUZXh0KFwiZmxpcDpwaG9uZVwiLDQwLDYwLDEpXG4gICAgfWVsc2V7XG4gICAgaWYobS5zID09IFMuRyApe1xuICAgIGNhbnZhcy5jbHMoKVxuICAgIGNhbnZhcy5ia2coNTcvMjU1LDczLzI1NSw4MS8yNTUpXG4gICAgcmVuZGVyTW91bnRhaW4oKVxuXG4gICAgY29uc3QgcCA9IG0ucFxuXG4gICAgcmVuZGVyRmxvb3IoKVxuXG4gICAgcmVuZGVyVGV4dChcImV4dHJhY3Rpb25cIiwtY2FtLnAueCsgem9uZS5wLngrKHpvbmUudy8yKSAsem9uZS5wLnktMTUsMSlcbiAgICByZW5kZXJUZXh0KFwiYXJlYVwiLC1jYW0ucC54KyB6b25lLnAueCsoem9uZS53LzIpLHpvbmUucC55LTEwLDEpXG5cbiAgICBpZiAocC5zKSB7XG4gICAgICBzaG9vdGluZ0FuaW0udXBkYXRlKHApXG4gICAgfSBlbHNlIGlmIChwLnYueCA9PSAwKSB7XG4gICAgICBpZihwLmMpe1xuICAgICAgIHNvbGRpZXJIb3N0QW5pLnVwZGF0ZShwKVxuICAgICAgfWVsc2V7XG4gICAgICBpZGxlQW5pbS51cGRhdGUocClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYocC5jKXtcbiAgICAgICAgc29sZGllckhvc3RBbmkucmVzZXQoKVxuICAgICAgICBzb2xkaWVySG9zdEFuaS51cGRhdGUocClcbiAgICAgICB9ZWxzZXtcbiAgICAgICAgcnVuQW5pbS51cGRhdGUocClcbiAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlID0gbS5lc1tpXVxuICAgICAgaWYoZS52aSl7XG4gICAgICAgIGlmKGUuaGkpe1xuICAgICAgICAgIGJvdEhpdHRlZEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJvdEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJzW2ldXG4gICAgICBpZiAoYi52aSkge1xuICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgIGJ1bGxldFRleHR1cmUsXG4gICAgICAgICAgLWNhbS5wLngrYi5wLngsXG4gICAgICAgICAgLWNhbS5wLnkrYi5wLnksXG4gICAgICAgICAgNCxcbiAgICAgICAgICA0LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAxLFxuICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uaHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmhzW2ldXG4gICAgICBpZiAoYi52aSkge1xuICAgICAgICBob3N0QW5pbS51cGRhdGUoYilcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICAgIGlmKHAgJiYgcC52aSl7XG4gICAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICAgIHJib3RIaXQudCxcbiAgICAgICAgICAgIC1jYW0ucC54K3AucC54LFxuICAgICAgICAgICAgLWNhbS5wLnkrcC5wLnksXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLjcsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGVyc2lzdGVuY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHAgPSBwZXJzaXN0ZW5jZVtpXVxuICAgICAgICBpZihwICYmIHAudmkpe1xuICAgICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgICByYm90SGl0LnQsXG4gICAgICAgICAgICAtY2FtLnAueCtwLnAueCxcbiAgICAgICAgICAgIC1jYW0ucC55K3AucC55LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC43LFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyVGV4dChcInNjb3JlOiBcIitzY29yZSx3aWR0aC8yLDEwLDIpXG4gICAgfWVsc2UgaWYobS5zID09IFMuTSl7XG4gICAgICByZW5kZXJUZXh0KFwiYmFja1wiLHdpZHRoLzIsaGVpZ2h0LzMsNClcbiAgICAgIHJlbmRlclRleHQoXCJ0b1wiLHdpZHRoLzIsaGVpZ2h0LzMgKyAoNCo0KSs0ICw0KVxuICAgICAgcmVuZGVyVGV4dChcInJlc2N1ZVwiLHdpZHRoLzIsaGVpZ2h0LzMrICg0KjQqMikrOCw0KVxuICAgICAgcmVuZGVyVGV4dChcInByZXNzK2F0dGFjayt0bytzdGFydFwiLHdpZHRoLzIsaGVpZ2h0LzIrICg0KjQqMikrMTQsMSlcbiAgICB9XG4gIH1cbiAgICBjYW52YXMuZmx1c2goKTtcbiAgICBmcHNNLnRpY2soKVxuICB9XG5cbiAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgIGNvbnN0IHN2Z3M6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdmdcIilcbiAgICBzdmdzLmZvckVhY2goc3ZnID0+IHtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICB9XG5cblxuICBydW5HYW1lKClcbn0pXG4iLCJmdW5jdGlvbiBFKGMpe1xuICAgIHRoaXMubiA9IGMuY3JlYXRlR2FpbigpXG4gICAgdGhpcy5uLmdhaW4udmFsdWUgPSAwXG4gICAgdGhpcy5hZGRFdmVudFRvUXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgYy5jdXJyZW50VGltZSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCBjLmN1cnJlbnRUaW1lICsgMC4wMDEpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4zLCBjLmN1cnJlbnRUaW1lICsgMC4xMDEpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgYy5jdXJyZW50VGltZSArIDAuNTAwKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIFdOQihjKXtcbiAgICB2YXIgYnMgPSBjLnNhbXBsZVJhdGU7XG4gICAgdmFyIGIgPSBjLmNyZWF0ZUJ1ZmZlcigxLCBicywgYy5zYW1wbGVSYXRlKTtcbiAgICB2YXIgbyA9IGIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnM7IGkrKykge1xuICAgICAgb1tpXSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICB9XG4gIFxuICAgIHRoaXMucyA9IGMuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgdGhpcy5zLmJ1ZmZlciA9IGI7XG4gICAgdGhpcy5zLmxvb3AgPSB0cnVlXG4gIH07XG4gIFxuICB2YXIgY3R4ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbiAgdmFyIG4gPSBuZXcgV05CKGN0eClcbiAgdmFyIHYxID0gbmV3IEUoY3R4KVxuICB2YXIgdjIgPSBuZXcgRShjdHgpXG4gIHZhciB2MyA9IG5ldyBFKGN0eClcbiAgdmFyIHY0ID0gbmV3IEUoY3R4KVxuICB2YXIgZiA9IGN0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICB2YXIgZyA9IGN0eC5jcmVhdGVHYWluKClcbiAgdmFyIHZzID0gMFxuICB2YXIgc3RkID0gZmFsc2VcblxuICBcbiAgbi5zLmNvbm5lY3QodjEubilcbiAgbi5zLmNvbm5lY3QodjIubilcbiAgbi5zLmNvbm5lY3QodjMubilcbiAgbi5zLmNvbm5lY3QodjQubilcbiAgXG4gIGYudHlwZSA9IFwibG93cGFzc1wiXG4gIGYuUS52YWx1ZSA9IDFcbiAgZi5mcmVxdWVuY3kudmFsdWUgPSA4MDBcbiAgdjEubi5jb25uZWN0KGYpXG4gIHYyLm4uY29ubmVjdChmKVxuICB2My5uLmNvbm5lY3QoZilcbiAgdjQubi5jb25uZWN0KGYpXG4gIGcuZ2Fpbi52YWx1ZSA9IDVcbiAgZi5jb25uZWN0KGcpXG4gIGcuY29ubmVjdChjdHguZGVzdGluYXRpb24pXG4gIFxuICBcbiAgXG4gIGZ1bmN0aW9uIGZpcmVTb3VuZCgpe1xuICAgIFxuICAgaWYoIXN0ZCl7XG4gICAgICBzdGQgPSB0cnVlXG4gICAgICBuLnMuc3RhcnQoMClcbiAgICB9XG4gICAgXG4gICAgXG4gICAgICAgdnMrK1xuICAgICAgICBpZih2cyA+IDQpe1xuICAgICAgICAgIHZzID0gMVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAxKXtcbiAgICAgICAgICB2MS5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAyKXtcbiAgICAgICAgICB2Mi5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAzKXtcbiAgICAgICAgICB2My5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSA0KXtcbiAgICAgICAgICB2NC5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gIH1cblxudmFyIG8gPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuby50eXBlID0gJ3NxdWFyZSdcbnZhciB2ID0gY3R4LmNyZWF0ZUdhaW4oKTtcbm8uY29ubmVjdCh2KVxudi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG52LmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG52YXIgc3RkMiA9IGZhbHNlXG5cbmZ1bmN0aW9uIGp1bXBTb3VuZCgpe1xuICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiAoMyAtIDEpICsgMSkvMlxuICBpZighc3RkMil7XG4gICAgICBvLnN0YXJ0KDApXG4gICAgc3RkMiA9IHRydWVcbiAgfVxuICBvLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgyMDAqciwgY3R4LmN1cnJlbnRUaW1lKVxuICB2LmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wNSxjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuNiwgY3R4LmN1cnJlbnRUaW1lICsgMC4xKTtcbiAgby5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgyODAqciwgY3R4LmN1cnJlbnRUaW1lICsgMC40KTtcbiAgdi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxuZnVuY3Rpb24gaGl0U291bmQoKXtcbiAgdmFyIG9oID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIHZhciB2aCA9IGN0eC5jcmVhdGVHYWluKCk7XG4gIG9oLmNvbm5lY3QodmgpXG4gIHZoLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIG9oLmZyZXF1ZW5jeSA9IDg4MC42O1xuICBvaC5zdGFydCgwKVxuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDEsY3R4LmN1cnJlbnRUaW1lKVxuICBvaC5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICB2aC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNSlcbn1cblxuXG52YXIgb0MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xub0MudHlwZSA9ICdzcXVhcmUnXG52YXIgdkMgPSBjdHguY3JlYXRlR2FpbigpO1xub0MuY29ubmVjdCh2QylcbnZDLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbnZDLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG52YXIgc3RkQyA9IGZhbHNlXG5cbmZ1bmN0aW9uIGNvaW5Tb3VuZCgpe1xuICBpZighc3RkQyl7XG4gICAgICBvQy5zdGFydCgwKVxuICAgIHN0ZEMgPSB0cnVlXG4gIH1cbiAgb0MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDE4MDAsIGN0eC5jdXJyZW50VGltZSlcbnZDLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDUsY3R4LmN1cnJlbnRUaW1lKVxudkMuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDUsIGN0eC5jdXJyZW50VGltZSArIDAuMSk7XG5vQy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxODAwLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xudkMuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xudkMuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxud2luZG93WydmaXJlU291bmQnXSA9IGZpcmVTb3VuZDtcbndpbmRvd1snanVtcFNvdW5kJ10gPSBqdW1wU291bmQ7XG53aW5kb3dbJ2hpdFNvdW5kJ10gPSBoaXRTb3VuZDtcbndpbmRvd1snY29pblNvdW5kJ10gPSBjb2luU291bmQ7XG5cblxuXG5cblxuICBcbiAgIiwiLypcbiAqIFRpbnlDYW52YXMgbW9kdWxlIChodHRwczovL2dpdGh1Yi5jb20vYml0bmVuZmVyL3RpbnktY2FudmFzKVxuICogRGV2ZWxvcGVkIGJ5IEZlbGlwZSBBbGZvbnNvIC0+IGh0dHBzOi8vdHdpdHRlci5jb20vYml0bmVuZmVyL1xuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICAgICAgICAgICAgICAgICAgIFZlcnNpb24gMiwgRGVjZW1iZXIgMjAwNFxuICogXG4gKiAgQ29weXJpZ2h0IChDKSAyMDA0IFNhbSBIb2NldmFyIDxzYW1AaG9jZXZhci5uZXQ+XG4gKiBcbiAqICBFdmVyeW9uZSBpcyBwZXJtaXR0ZWQgdG8gY29weSBhbmQgZGlzdHJpYnV0ZSB2ZXJiYXRpbSBvciBtb2RpZmllZFxuICogIGNvcGllcyBvZiB0aGlzIGxpY2Vuc2UgZG9jdW1lbnQsIGFuZCBjaGFuZ2luZyBpdCBpcyBhbGxvd2VkIGFzIGxvbmdcbiAqICBhcyB0aGUgbmFtZSBpcyBjaGFuZ2VkLlxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICBURVJNUyBBTkQgQ09ORElUSU9OUyBGT1IgQ09QWUlORywgRElTVFJJQlVUSU9OIEFORCBNT0RJRklDQVRJT05cbiAqIFxuICogICAwLiBZb3UganVzdCBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPLlxuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKi9cblxuZnVuY3Rpb24gQ29tcGlsZVNoYWRlcihnbCwgc291cmNlLCB0eXBlKSB7XG4gICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICByZXR1cm4gc2hhZGVyO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVTaGFkZXJQcm9ncmFtKGdsLCB2c1NvdXJjZSwgZnNTb3VyY2UpIHtcbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKSxcbiAgICAgICAgdlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIHZzU291cmNlLCAzNTYzMyksXG4gICAgICAgIGZTaGFkZXIgPSBDb21waWxlU2hhZGVyKGdsLCBmc1NvdXJjZSwgMzU2MzIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZlNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgcmV0dXJuIHByb2dyYW07XG59XG5cbmZ1bmN0aW9uIENyZWF0ZUJ1ZmZlcihnbCwgYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpIHtcbiAgICB2YXIgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihidWZmZXJUeXBlLCBidWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVRleHR1cmUoZ2wsIGltYWdlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoMzU1MywgdGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MiwgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDMsIDMzMDcxKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQwLCA5NzI4KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQxLCA5NzI4KTtcbiAgICBnbC50ZXhJbWFnZTJEKDM1NTMsIDAsIDY0MDgsIDY0MDgsIDUxMjEsIGltYWdlKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCBudWxsKTtcbiAgICB0ZXh0dXJlLndpZHRoID0gd2lkdGg7XG4gICAgdGV4dHVyZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgcmV0dXJuIHRleHR1cmU7XG59XG53aW5kb3dbJ1RDU2hkJ10gPSBDb21waWxlU2hhZGVyO1xud2luZG93WydUQ1ByZyddID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbTtcbndpbmRvd1snVENCdWYnXSA9IENyZWF0ZUJ1ZmZlcjtcbndpbmRvd1snVENUZXgnXSA9IENyZWF0ZVRleHR1cmU7XG5cbmZ1bmN0aW9uIFRpbnlDYW52YXMoY2FudmFzKSB7XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyksXG4gICAgICAgIFZFUlRFWF9TSVpFID0gKDQgKiAyKSArICg0ICogMikgKyAoNCksXG4gICAgICAgIE1BWF9CQVRDSCA9IDEwOTIyLCAvLyBmbG9vcigoMiBeIDE2KSAvIDYpXG4gICAgICAgIE1BWF9TVEFDSyA9IDEwMCxcbiAgICAgICAgTUFUX1NJWkUgPSA2LFxuICAgICAgICBWRVJUSUNFU19QRVJfUVVBRCA9IDYsXG4gICAgICAgIE1BVF9TVEFDS19TSVpFID0gTUFYX1NUQUNLICogTUFUX1NJWkUsXG4gICAgICAgIFZFUlRFWF9EQVRBX1NJWkUgPSBWRVJURVhfU0laRSAqIE1BWF9CQVRDSCAqIDQsXG4gICAgICAgIElOREVYX0RBVEFfU0laRSA9IE1BWF9CQVRDSCAqICgyICogVkVSVElDRVNfUEVSX1FVQUQpLFxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodCxcbiAgICAgICAgc2hhZGVyID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbShcbiAgICAgICAgICAgIGdsLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IFBvc2l0aW9uIGFuZFxuICAgICAgICAgICAgICAgIC8vIElOIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlIHZlYzIgYSwgYjsnLFxuICAgICAgICAgICAgICAgIC8vIElOIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjNCBjOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgVmlldyBNYXRyaXhcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBtYXQ0IG07JyxcbiAgICAgICAgICAgICAgICAndW5pZm9ybSB2ZWMyIHI7JyxcbiAgICAgICAgICAgICAgICAndm9pZCBtYWluKCl7JyxcbiAgICAgICAgICAgICAgICAnZ2xfUG9zaXRpb249bSp2ZWM0KGEsMS4wLDEuMCk7JyxcbiAgICAgICAgICAgICAgICAnZD1iOycsXG4gICAgICAgICAgICAgICAgJ2U9YzsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKSwgW1xuICAgICAgICAgICAgICAgICdwcmVjaXNpb24gbG93cCBmbG9hdDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjMiBkOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzQgZTsnLFxuICAgICAgICAgICAgICAgIC8vIENPTlNUIFNpbmdsZSBTYW1wbGVyMkRcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgZjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9GcmFnQ29sb3I9dGV4dHVyZTJEKGYsZCkqZTsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKVxuICAgICAgICApLFxuICAgICAgICBnbEJ1ZmZlclN1YkRhdGEgPSBnbC5idWZmZXJTdWJEYXRhLmJpbmQoZ2wpLFxuICAgICAgICBnbERyYXdFbGVtZW50cyA9IGdsLmRyYXdFbGVtZW50cy5iaW5kKGdsKSxcbiAgICAgICAgZ2xCaW5kVGV4dHVyZSA9IGdsLmJpbmRUZXh0dXJlLmJpbmQoZ2wpLFxuICAgICAgICBnbENsZWFyID0gZ2wuY2xlYXIuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXJDb2xvciA9IGdsLmNsZWFyQ29sb3IuYmluZChnbCksXG4gICAgICAgIHZlcnRleERhdGEgPSBuZXcgQXJyYXlCdWZmZXIoVkVSVEVYX0RBVEFfU0laRSksXG4gICAgICAgIHZQb3NpdGlvbkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2Q29sb3JEYXRhID0gbmV3IFVpbnQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2SW5kZXhEYXRhID0gbmV3IFVpbnQxNkFycmF5KElOREVYX0RBVEFfU0laRSksXG4gICAgICAgIElCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjMsIHZJbmRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDQpLFxuICAgICAgICBWQk8gPSBDcmVhdGVCdWZmZXIoZ2wsIDM0OTYyLCB2ZXJ0ZXhEYXRhLmJ5dGVMZW5ndGgsIDM1MDQ4KSxcbiAgICAgICAgY291bnQgPSAwLFxuICAgICAgICBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAxLCAwLCAwXSksXG4gICAgICAgIHN0YWNrID0gbmV3IEZsb2F0MzJBcnJheSgxMDApLFxuICAgICAgICBzdGFja3AgPSAwLFxuICAgICAgICBjb3MgPSBNYXRoLmNvcyxcbiAgICAgICAgc2luID0gTWF0aC5zaW4sXG4gICAgICAgIGN1cnJlbnRUZXh0dXJlID0gbnVsbCxcbiAgICAgICAgcmVuZGVyZXIgPSBudWxsLFxuICAgICAgICBsb2NBLCBsb2NCLCBsb2NDO1xuXG4gICAgZ2wuYmxlbmRGdW5jKDc3MCwgNzcxKTtcbiAgICBnbC5lbmFibGUoMzA0Mik7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXIpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjMsIElCTyk7XG4gICAgZm9yICh2YXIgaW5kZXhBID0gaW5kZXhCID0gMDsgaW5kZXhBIDwgTUFYX0JBVENIICogVkVSVElDRVNfUEVSX1FVQUQ7IGluZGV4QSArPSBWRVJUSUNFU19QRVJfUVVBRCwgaW5kZXhCICs9IDQpXG4gICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMF0gPSBpbmRleEIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDFdID0gaW5kZXhCICsgMSxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMl0gPSBpbmRleEIgKyAyLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAzXSA9IGluZGV4QiArIDAsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDRdID0gaW5kZXhCICsgMyxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNV0gPSBpbmRleEIgKyAxO1xuXG4gICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYzLCAwLCB2SW5kZXhEYXRhKTtcbiAgICBnbC5iaW5kQnVmZmVyKDM0OTYyLCBWQk8pO1xuICAgIGxvY0EgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdhJyk7XG4gICAgbG9jQiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2InKTtcbiAgICBsb2NDID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0EpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQSwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0IpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQiwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDgpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0MpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQywgNCwgNTEyMSwgMSwgVkVSVEVYX1NJWkUsIDE2KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXIsICdtJyksIDAsXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgMiAvIHdpZHRoLCAwLCAwLCAwLFxuICAgICAgICAgICAgMCwgLTIgLyBoZWlnaHQsIDAsIDAsXG4gICAgICAgICAgICAwLCAwLCAxLCAxLCAtMSwgMSwgMCwgMFxuICAgICAgICBdKVxuICAgICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSgzMzk4NCk7XG4gICAgcmVuZGVyZXIgPSB7XG4gICAgICAgICdnJzogZ2wsXG4gICAgICAgICdjJzogY2FudmFzLFxuICAgICAgICAnY29sJzogMHhGRkZGRkZGRixcbiAgICAgICAgJ2JrZyc6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XG4gICAgICAgICAgICBnbENsZWFyQ29sb3IociwgZywgYiwgMSk7XG4gICAgICAgIH0sXG4gICAgICAgICdjbHMnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbENsZWFyKDE2Mzg0KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3RyYW5zJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFs0XSA9IG1hdFswXSAqIHggKyBtYXRbMl0gKiB5ICsgbWF0WzRdO1xuICAgICAgICAgICAgbWF0WzVdID0gbWF0WzFdICogeCArIG1hdFszXSAqIHkgKyBtYXRbNV07XG4gICAgICAgIH0sXG4gICAgICAgICdzY2FsZSc6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBtYXRbMF0gPSBtYXRbMF0gKiB4O1xuICAgICAgICAgICAgbWF0WzFdID0gbWF0WzFdICogeDtcbiAgICAgICAgICAgIG1hdFsyXSA9IG1hdFsyXSAqIHk7XG4gICAgICAgICAgICBtYXRbM10gPSBtYXRbM10gKiB5O1xuICAgICAgICB9LFxuICAgICAgICAncm90JzogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHZhciBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIHNyID0gc2luKHIpLFxuICAgICAgICAgICAgICAgIGNyID0gY29zKHIpO1xuXG4gICAgICAgICAgICBtYXRbMF0gPSBhICogY3IgKyBjICogc3I7XG4gICAgICAgICAgICBtYXRbMV0gPSBiICogY3IgKyBkICogc3I7XG4gICAgICAgICAgICBtYXRbMl0gPSBhICogLXNyICsgYyAqIGNyO1xuICAgICAgICAgICAgbWF0WzNdID0gYiAqIC1zciArIGQgKiBjcjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAwXSA9IG1hdFswXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDFdID0gbWF0WzFdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMl0gPSBtYXRbMl07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAzXSA9IG1hdFszXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDRdID0gbWF0WzRdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNV0gPSBtYXRbNV07XG4gICAgICAgICAgICBzdGFja3AgKz0gNjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3BvcCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrcCAtPSA2O1xuICAgICAgICAgICAgbWF0WzBdID0gc3RhY2tbc3RhY2twICsgMF07XG4gICAgICAgICAgICBtYXRbMV0gPSBzdGFja1tzdGFja3AgKyAxXTtcbiAgICAgICAgICAgIG1hdFsyXSA9IHN0YWNrW3N0YWNrcCArIDJdO1xuICAgICAgICAgICAgbWF0WzNdID0gc3RhY2tbc3RhY2twICsgM107XG4gICAgICAgICAgICBtYXRbNF0gPSBzdGFja1tzdGFja3AgKyA0XTtcbiAgICAgICAgICAgIG1hdFs1XSA9IHN0YWNrW3N0YWNrcCArIDVdO1xuICAgICAgICB9LFxuICAgICAgICAnaW1nJzogZnVuY3Rpb24gKHRleHR1cmUsIHgsIHksIHcsIGgsIHUwLCB2MCwgdTEsIHYxKSB7XG4gICAgICAgICAgICB2YXIgeDAgPSB4LFxuICAgICAgICAgICAgICAgIHkwID0geSxcbiAgICAgICAgICAgICAgICB4MSA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkxID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDIgPSB4LFxuICAgICAgICAgICAgICAgIHkyID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDMgPSB4ICsgdyxcbiAgICAgICAgICAgICAgICB5MyA9IHksXG4gICAgICAgICAgICAgICAgYSA9IG1hdFswXSxcbiAgICAgICAgICAgICAgICBiID0gbWF0WzFdLFxuICAgICAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgICAgICBlID0gbWF0WzRdLFxuICAgICAgICAgICAgICAgIGYgPSBtYXRbNV0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgICAgICAgICBhcmdiID0gcmVuZGVyZXJbJ2NvbCddO1xuXG4gICAgICAgICAgICBpZiAodGV4dHVyZSAhPSBjdXJyZW50VGV4dHVyZSB8fFxuICAgICAgICAgICAgICAgIGNvdW50ICsgMSA+PSBNQVhfQkFUQ0gpIHtcbiAgICAgICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZlcnRleERhdGEpO1xuICAgICAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRleHR1cmUgIT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgICAgIGdsQmluZFRleHR1cmUoMzU1MywgY3VycmVudFRleHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2Zmc2V0ID0gY291bnQgKiBWRVJURVhfU0laRTtcbiAgICAgICAgICAgIC8vIFZlcnRleCBPcmRlclxuICAgICAgICAgICAgLy8gVmVydGV4IFBvc2l0aW9uIHwgVVYgfCBBUkdCXG4gICAgICAgICAgICAvLyBWZXJ0ZXggMVxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGEgKyB5MCAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGIgKyB5MCAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCAyXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYSArIHkxICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYiArIHkxICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MTtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDNcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBhICsgeTIgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBiICsgeTIgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTA7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggNFxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGEgKyB5MyAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGIgKyB5MyAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIGlmICgrK2NvdW50ID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnZmx1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2UG9zaXRpb25EYXRhLnN1YmFycmF5KDAsIGNvdW50ICogVkVSVEVYX1NJWkUpKTtcbiAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG59XG53aW5kb3dbJ1RDJ10gPSBUaW55Q2FudmFzOyJdLCJzb3VyY2VSb290IjoiIn0=