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
        hs: initHosta(1)
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
        var newX = -(w.length * (4 * s)) / 2;
        for (var c = 0; c < coor.length; c++) {
            canvas.img(abc.t, x + newX, y, 4 * s, 4 * s, coor[c][0], coor[c][1], coor[c][2], coor[c][3]);
            newX += 5;
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
            renderText("score: " + score, width / 2, 10, 1);
            // renderText("a",width/2,10,2)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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RUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25HLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVGLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25KLE1BQU0sWUFBWSxHQUFHLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHdDQUF3QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQiIsImZpbGUiOiJiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKiFcbiAqIEZQU01ldGVyIDAuMy4xIC0gOXRoIE1heSAyMDEzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vRGFyc2Fpbi9mcHNtZXRlclxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuOyhmdW5jdGlvbiAodywgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBFbGVtZW50IHR5cGUgbmFtZS5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIG5ld0VsKG5hbWUpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGVtZSBDU1MgcHJvcGVydGllcyB0byBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IERPTSBlbGVtZW50LlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9ICB0aGVtZSAgIFRoZW1lIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIGFwcGx5VGhlbWUoZWxlbWVudCwgdGhlbWUpIHtcblx0XHRmb3IgKHZhciBuYW1lIGluIHRoZW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdGhlbWVbbmFtZV07XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0XHRyZXR1cm4gZWxlbWVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdHlwZSBvZiB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiB0eXBlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRcdHJldHVybiBTdHJpbmcodmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCkgfHwgJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiBhbiBhcnJheS5cblx0ICpcblx0ICogQHBhcmFtICB7TWl4ZWR9IHZhbHVlXG5cdCAqIEBwYXJhbSAge0FycmF5fSBhcnJheVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtJbnRlZ2VyfSBBcnJheSBpbmRleCBvciAtMSB3aGVuIG5vdCBmb3VuZC5cblx0ICovXG5cdGZ1bmN0aW9uIGluQXJyYXkodmFsdWUsIGFycmF5KSB7XG5cdFx0aWYgKHR5cGUoYXJyYXkpICE9PSAnYXJyYXknKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdGlmIChhcnJheS5pbmRleE9mKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogUG9vciBtYW4ncyBkZWVwIG9iamVjdCBleHRlbmQuXG5cdCAqXG5cdCAqIEV4YW1wbGU6XG5cdCAqICAgZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBleHRlbmQoKSB7XG5cdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZ3NbMV0pIHtcblx0XHRcdGlmIChhcmdzWzFdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlKGFyZ3NbMV1ba2V5XSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gZXh0ZW5kKHt9LCBhcmdzWzBdW2tleV0sIGFyZ3NbMV1ba2V5XSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2FycmF5Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XS5zbGljZSgwKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXJncy5sZW5ndGggPiAyID9cblx0XHRcdGV4dGVuZC5hcHBseShudWxsLCBbYXJnc1swXV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDIpKSkgOlxuXHRcdFx0YXJnc1swXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IEhTTCBjb2xvciB0byBIRVggc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtBcnJheX0gaHNsIEFycmF5IHdpdGggW2h1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzXS5cblx0ICpcblx0ICogQHJldHVybiB7QXJyYXl9IEFycmF5IHdpdGggW3JlZCwgZ3JlZW4sIGJsdWVdLlxuXHQgKi9cblx0ZnVuY3Rpb24gaHNsVG9IZXgoaCwgcywgbCkge1xuXHRcdHZhciByLCBnLCBiO1xuXHRcdHZhciB2LCBtaW4sIHN2LCBzZXh0YW50LCBmcmFjdCwgdnNmO1xuXG5cdFx0aWYgKGwgPD0gMC41KSB7XG5cdFx0XHR2ID0gbCAqICgxICsgcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYgPSBsICsgcyAtIGwgKiBzO1xuXHRcdH1cblxuXHRcdGlmICh2ID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gJyMwMDAnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtaW4gPSAyICogbCAtIHY7XG5cdFx0XHRzdiA9ICh2IC0gbWluKSAvIHY7XG5cdFx0XHRoID0gNiAqIGg7XG5cdFx0XHRzZXh0YW50ID0gTWF0aC5mbG9vcihoKTtcblx0XHRcdGZyYWN0ID0gaCAtIHNleHRhbnQ7XG5cdFx0XHR2c2YgPSB2ICogc3YgKiBmcmFjdDtcblx0XHRcdGlmIChzZXh0YW50ID09PSAwIHx8IHNleHRhbnQgPT09IDYpIHtcblx0XHRcdFx0ciA9IHY7XG5cdFx0XHRcdGcgPSBtaW4gKyB2c2Y7XG5cdFx0XHRcdGIgPSBtaW47XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDEpIHtcblx0XHRcdFx0ciA9IHYgLSB2c2Y7XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAyKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluICsgdnNmO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAzKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2IC0gdnNmO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gNCkge1xuXHRcdFx0XHRyID0gbWluICsgdnNmO1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdiAtIHZzZjtcblx0XHRcdH1cblx0XHRcdHJldHVybiAnIycgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiBmb3IgaHNsVG9IZXguXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG5cdFx0YyA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xuXHRcdHJldHVybiBjLmxlbmd0aCA9PT0gMSA/ICcwJyArIGMgOiBjO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hbmFnZSBlbGVtZW50IGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHBhcmFtICB7Tm9kZX0gICAgIGVsZW1lbnRcblx0ICogQHBhcmFtICB7RXZlbnR9ICAgIGV2ZW50TmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtCb29sfSAgICAgcmVtb3ZlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIsIHJlbW92ZSkge1xuXHRcdGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2FkZEV2ZW50TGlzdGVuZXInXShldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHR9IGVsc2UgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ2RldGFjaEV2ZW50JyA6ICdhdHRhY2hFdmVudCddKCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFByZWZlcnJlZCB0aW1pbmcgZnVudGlvblxuXHR2YXIgZ2V0VGltZTtcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGVyZiA9IHcucGVyZm9ybWFuY2U7XG5cdFx0aWYgKHBlcmYgJiYgKHBlcmYubm93IHx8IHBlcmYud2Via2l0Tm93KSkge1xuXHRcdFx0dmFyIHBlcmZOb3cgPSBwZXJmLm5vdyA/ICdub3cnIDogJ3dlYmtpdE5vdyc7XG5cdFx0XHRnZXRUaW1lID0gcGVyZltwZXJmTm93XS5iaW5kKHBlcmYpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRnZXRUaW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gK25ldyBEYXRlKCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBMb2NhbCBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIHBvbHlmaWxsXG5cdHZhciBjQUYgPSB3LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHcuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHR2YXIgckFGID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnLCAnbyddO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cblx0XHQvLyBGb3IgYSBtb3JlIGFjY3VyYXRlIFdpbmRvd0FuaW1hdGlvblRpbWluZyBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb24sIGRpdGNoIHRoZSBuYXRpdmVcblx0XHQvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hlbiBjYW5jZWxBbmltYXRpb25GcmFtZSBpcyBub3QgcHJlc2VudCAob2xkZXIgdmVyc2lvbnMgb2YgRmlyZWZveClcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHZlbmRvcnMubGVuZ3RoOyBpIDwgbCAmJiAhY0FGOyArK2kpIHtcblx0XHRcdGNBRiA9IHdbdmVuZG9yc1tpXSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3W3ZlbmRvcnNbaV0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdFx0ckFGID0gY0FGICYmIHdbdmVuZG9yc1tpXSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0fVxuXG5cdFx0aWYgKCFjQUYpIHtcblx0XHRcdHJBRiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgY3VyclRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHRcdHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuXHRcdFx0XHRsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcblx0XHRcdFx0cmV0dXJuIHcuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xuXHRcdFx0fTtcblxuXHRcdFx0Y0FGID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChpZCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBQcm9wZXJ0eSBuYW1lIGZvciBhc3NpZ25pbmcgZWxlbWVudCB0ZXh0IGNvbnRlbnRcblx0dmFyIHRleHRQcm9wID0gdHlwZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS50ZXh0Q29udGVudCkgPT09ICdzdHJpbmcnID8gJ3RleHRDb250ZW50JyA6ICdpbm5lclRleHQnO1xuXG5cdC8qKlxuXHQgKiBGUFNNZXRlciBjbGFzcy5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBhbmNob3IgIEVsZW1lbnQgdG8gYXBwZW5kIHRoZSBtZXRlciB0by4gRGVmYXVsdCBpcyBkb2N1bWVudC5ib2R5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gIG9wdGlvbnMgT2JqZWN0IHdpdGggb3B0aW9ucy5cblx0ICovXG5cdGZ1bmN0aW9uIEZQU01ldGVyKGFuY2hvciwgb3B0aW9ucykge1xuXHRcdC8vIE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdGlmICh0eXBlKGFuY2hvcikgPT09ICdvYmplY3QnICYmIGFuY2hvci5ub2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRvcHRpb25zID0gYW5jaG9yO1xuXHRcdFx0YW5jaG9yID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCFhbmNob3IpIHtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBvID0gZXh0ZW5kKHt9LCBGUFNNZXRlci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHR2YXIgZWwgPSB7fTtcblx0XHR2YXIgY29scyA9IFtdO1xuXHRcdHZhciB0aGVtZSwgaGVhdG1hcHM7XG5cdFx0dmFyIGhlYXREZXB0aCA9IDEwMDtcblx0XHR2YXIgaGVhdGluZyA9IFtdO1xuXG5cdFx0dmFyIHRoaXNGcmFtZVRpbWUgPSAwO1xuXHRcdHZhciBmcmFtZVRpbWUgPSBvLnRocmVzaG9sZDtcblx0XHR2YXIgZnJhbWVTdGFydCA9IDA7XG5cdFx0dmFyIGxhc3RMb29wID0gZ2V0VGltZSgpIC0gZnJhbWVUaW1lO1xuXHRcdHZhciB0aW1lO1xuXG5cdFx0dmFyIGZwc0hpc3RvcnkgPSBbXTtcblx0XHR2YXIgZHVyYXRpb25IaXN0b3J5ID0gW107XG5cblx0XHR2YXIgZnJhbWVJRCwgcmVuZGVySUQ7XG5cdFx0dmFyIHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXHRcdHZhciBncmFwaEhlaWdodCwgY291bnQsIGksIGo7XG5cblx0XHQvLyBFeHBvc2VkIHByb3BlcnRpZXNcblx0XHRzZWxmLm9wdGlvbnMgPSBvO1xuXHRcdHNlbGYuZnBzID0gMDtcblx0XHRzZWxmLmR1cmF0aW9uID0gMDtcblx0XHRzZWxmLmlzUGF1c2VkID0gMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRpY2sgc3RhcnQgZm9yIG1lYXN1cmluZyB0aGUgYWN0dWFsIHJlbmRlcmluZyBkdXJhdGlvbi5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmcmFtZVN0YXJ0ID0gZ2V0VGltZSgpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBGUFMgdGljay5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGltZSA9IGdldFRpbWUoKTtcblx0XHRcdHRoaXNGcmFtZVRpbWUgPSB0aW1lIC0gbGFzdExvb3A7XG5cdFx0XHRmcmFtZVRpbWUgKz0gKHRoaXNGcmFtZVRpbWUgLSBmcmFtZVRpbWUpIC8gby5zbW9vdGhpbmc7XG5cdFx0XHRzZWxmLmZwcyA9IDEwMDAgLyBmcmFtZVRpbWU7XG5cdFx0XHRzZWxmLmR1cmF0aW9uID0gZnJhbWVTdGFydCA8IGxhc3RMb29wID8gZnJhbWVUaW1lIDogdGltZSAtIGZyYW1lU3RhcnQ7XG5cdFx0XHRsYXN0TG9vcCA9IHRpbWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFBhdXNlIGRpc3BsYXkgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDE7XG5cdFx0XHRcdGNsZWFyVGltZW91dChmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKGZyYW1lSUQpO1xuXHRcdFx0XHRjQUYocmVuZGVySUQpO1xuXHRcdFx0XHRmcmFtZUlEID0gcmVuZGVySUQgPSAwO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3VtZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIWZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cdFx0XHRcdHJlcXVlc3RSZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBPcHRpb24gbmFtZS5cblx0XHQgKiBAcGFyYW0ge01peGVkfSAgdmFsdWUgTmV3IHZhbHVlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0b1tuYW1lXSA9IHZhbHVlO1xuXHRcdFx0c2hvd0ZwcyA9IG8uc2hvdyA9PT0gJ2Zwcyc7XG5cblx0XHRcdC8vIFJlYnVpbGQgb3IgcmVwb3NpdGlvbiBlbGVtZW50cyB3aGVuIHNwZWNpZmljIG9wdGlvbiBoYXMgYmVlbiB1cGRhdGVkXG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZWJ1aWxkZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbkFycmF5KG5hbWUsIHJlcG9zaXRpb25lcnMpICE9PSAtMSkge1xuXHRcdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gcmVuZGVyaW5nIGR1cmF0aW9uIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0R1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnbXMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgbWV0ZXIgaW50byBGUFMgbW9kZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93RnBzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVG9nZ2xlcyBiZXR3ZWVuIHNob3c6ICdmcHMnIGFuZCBzaG93OiAnZHVyYXRpb24nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93Jywgc2hvd0ZwcyA/ICdtcycgOiAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGlkZSB0aGUgRlBTTWV0ZXIuIEFsc28gcGF1c2VzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucGF1c2UoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNob3cgdGhlIEZQU01ldGVyLiBBbHNvIHJlc3VtZXMgdGhlIHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5yZXN1bWUoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGVjayB0aGUgY3VycmVudCBGUFMgYW5kIHNhdmUgaXQgaW4gaGlzdG9yeS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gaGlzdG9yeVRpY2soKSB7XG5cdFx0XHRmb3IgKGkgPSBvLmhpc3Rvcnk7IGktLTspIHtcblx0XHRcdFx0ZnBzSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmZwcyA6IGZwc0hpc3RvcnlbaS0xXTtcblx0XHRcdFx0ZHVyYXRpb25IaXN0b3J5W2ldID0gaSA9PT0gMCA/IHNlbGYuZHVyYXRpb24gOiBkdXJhdGlvbkhpc3RvcnlbaS0xXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGhlYXQgaGV4IGNvbG9yIGJhc2VkIG9uIHZhbHVlcyBwYXNzZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWF0bWFwXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gdmFsdWVcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtaW5cblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtYXhcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0SGVhdChoZWF0bWFwLCB2YWx1ZSwgbWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBoZWF0bWFwc1swfGhlYXRtYXBdW01hdGgucm91bmQoTWF0aC5taW4oKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pICogaGVhdERlcHRoLCBoZWF0RGVwdGgpKV07XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIGNvdW50ZXIgbnVtYmVyIGFuZCBsZWdlbmQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXIoKSB7XG5cdFx0XHQvLyBVcGRhdGUgbGVnZW5kIG9ubHkgd2hlbiBjaGFuZ2VkXG5cdFx0XHRpZiAoZWwubGVnZW5kLmZwcyAhPT0gc2hvd0Zwcykge1xuXHRcdFx0XHRlbC5sZWdlbmQuZnBzID0gc2hvd0Zwcztcblx0XHRcdFx0ZWwubGVnZW5kW3RleHRQcm9wXSA9IHNob3dGcHMgPyAnRlBTJyA6ICdtcyc7XG5cdFx0XHR9XG5cdFx0XHQvLyBVcGRhdGUgY291bnRlciB3aXRoIGEgbmljZWx5IGZvcm1hdGVkICYgcmVhZGFibGUgbnVtYmVyXG5cdFx0XHRjb3VudCA9IHNob3dGcHMgPyBzZWxmLmZwcyA6IHNlbGYuZHVyYXRpb247XG5cdFx0XHRlbC5jb3VudFt0ZXh0UHJvcF0gPSBjb3VudCA+IDk5OSA/ICc5OTkrJyA6IGNvdW50LnRvRml4ZWQoY291bnQgPiA5OSA/IDAgOiBvLmRlY2ltYWxzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZW5kZXIgY3VycmVudCBGUFMgc3RhdGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHQvLyBJZiByZW5kZXJlciBzdG9wcGVkIHJlcG9ydGluZywgZG8gYSBzaW11bGF0ZWQgZHJvcCB0byAwIGZwc1xuXHRcdFx0aWYgKGxhc3RMb29wIDwgdGltZSAtIG8udGhyZXNob2xkKSB7XG5cdFx0XHRcdHNlbGYuZnBzIC09IHNlbGYuZnBzIC8gTWF0aC5tYXgoMSwgby5zbW9vdGhpbmcgKiA2MCAvIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRzZWxmLmR1cmF0aW9uID0gMTAwMCAvIHNlbGYuZnBzO1xuXHRcdFx0fVxuXG5cdFx0XHRoaXN0b3J5VGljaygpO1xuXHRcdFx0dXBkYXRlQ291bnRlcigpO1xuXG5cdFx0XHQvLyBBcHBseSBoZWF0IHRvIGVsZW1lbnRzXG5cdFx0XHRpZiAoby5oZWF0KSB7XG5cdFx0XHRcdGlmIChoZWF0aW5nLmxlbmd0aCkge1xuXHRcdFx0XHRcdGZvciAoaSA9IGhlYXRpbmcubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdFx0XHRoZWF0aW5nW2ldLmVsLnN0eWxlW3RoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5mcHMsIDAsIG8ubWF4RnBzKSA6XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0bWFwLCBzZWxmLmR1cmF0aW9uLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGVsLmdyYXBoICYmIHRoZW1lLmNvbHVtbi5oZWF0T24pIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBjb2xzLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0Y29sc1tpXS5zdHlsZVt0aGVtZS5jb2x1bW4uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBmcHNIaXN0b3J5W2ldLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBkdXJhdGlvbkhpc3RvcnlbaV0sIG8udGhyZXNob2xkLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIGdyYXBoIGNvbHVtbnMgaGVpZ2h0XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG8uaGlzdG9yeTsgaisrKSB7XG5cdFx0XHRcdFx0Y29sc1tqXS5zdHlsZS5oZWlnaHQgPSAoc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHQoZnBzSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLm1heEZwcyAqIE1hdGgubWluKGZwc0hpc3Rvcnlbal0sIG8ubWF4RnBzKSkgOiAwKSA6XG5cdFx0XHRcdFx0XHQoZHVyYXRpb25IaXN0b3J5W2pdID8gTWF0aC5yb3VuZChncmFwaEhlaWdodCAvIG8udGhyZXNob2xkICogTWF0aC5taW4oZHVyYXRpb25IaXN0b3J5W2pdLCBvLnRocmVzaG9sZCkpIDogMClcblx0XHRcdFx0XHQpICsgJ3B4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlcXVlc3QgcmVuZGVyaW5nIGxvb3AuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnR9IEFuaW1hdGlvbiBmcmFtZSBpbmRleC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZXF1ZXN0UmVuZGVyKCkge1xuXHRcdFx0aWYgKG8uaW50ZXJ2YWwgPCAyMCkge1xuXHRcdFx0XHRmcmFtZUlEID0gckFGKHJlcXVlc3RSZW5kZXIpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZyYW1lSUQgPSBzZXRUaW1lb3V0KHJlcXVlc3RSZW5kZXIsIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRyZW5kZXJJRCA9IHJBRihyZW5kZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIE1ldGVyIGV2ZW50cyBoYW5kbGVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBldmVudEhhbmRsZXIoZXZlbnQpIHtcblx0XHRcdGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuXHRcdFx0aWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0ZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHNlbGYudG9nZ2xlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFN0b3AgcmVuZGVyaW5nXG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHQvLyBSZW1vdmUgZWxlbWVudHNcblx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHQvLyBTdG9wIGxpc3RlbmluZ1xuXHRcdFx0c2VsZi50aWNrID0gc2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbW92ZU1ldGVyKCkge1xuXHRcdFx0Ly8gVW5iaW5kIGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIsIDEpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGV0YWNoIGVsZW1lbnRcblx0XHRcdGFuY2hvci5yZW1vdmVDaGlsZChlbC5jb250YWluZXIpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNldHMgdGhlIHRoZW1lLCBhbmQgZ2VuZXJhdGVzIGhlYXRtYXBzIHdoZW4gbmVlZGVkLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHNldFRoZW1lKCkge1xuXHRcdFx0dGhlbWUgPSBGUFNNZXRlci50aGVtZVtvLnRoZW1lXTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgaGVhdG1hcHNcblx0XHRcdGhlYXRtYXBzID0gdGhlbWUuY29tcGlsZWRIZWF0bWFwcyB8fCBbXTtcblx0XHRcdGlmICghaGVhdG1hcHMubGVuZ3RoICYmIHRoZW1lLmhlYXRtYXBzLmxlbmd0aCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhlbWUuaGVhdG1hcHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRoZWF0bWFwc1tqXSA9IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gaGVhdERlcHRoOyBpKyspIHtcblx0XHRcdFx0XHRcdGhlYXRtYXBzW2pdW2ldID0gaHNsVG9IZXgoMC4zMyAvIGhlYXREZXB0aCAqIGksIHRoZW1lLmhlYXRtYXBzW2pdLnNhdHVyYXRpb24sIHRoZW1lLmhlYXRtYXBzW2pdLmxpZ2h0bmVzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgPSBoZWF0bWFwcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0aGUgbWV0ZXIgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gY3JlYXRlTWV0ZXIoKSB7XG5cdFx0XHQvLyBSZW1vdmUgb2xkIG1ldGVyIGlmIHByZXNlbnRcblx0XHRcdGlmIChlbC5jb250YWluZXIpIHtcblx0XHRcdFx0cmVtb3ZlTWV0ZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZW1lXG5cdFx0XHRzZXRUaGVtZSgpO1xuXG5cdFx0XHQvLyBDcmVhdGUgZWxlbWVudHNcblx0XHRcdGVsLmNvbnRhaW5lciA9IGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb250YWluZXIpO1xuXHRcdFx0ZWwuY291bnQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvdW50KSk7XG5cdFx0XHRlbC5sZWdlbmQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmxlZ2VuZCkpO1xuXHRcdFx0ZWwuZ3JhcGggPSBvLmdyYXBoID8gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5ncmFwaCkpIDogMDtcblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIGhlYXRpbmcgYXJyYXlcblx0XHRcdGhlYXRpbmcubGVuZ3RoID0gMDtcblx0XHRcdGZvciAodmFyIGtleSBpbiBlbCkge1xuXHRcdFx0XHRpZiAoZWxba2V5XSAmJiB0aGVtZVtrZXldLmhlYXRPbikge1xuXHRcdFx0XHRcdGhlYXRpbmcucHVzaCh7XG5cdFx0XHRcdFx0XHRuYW1lOiBrZXksXG5cdFx0XHRcdFx0XHRlbDogZWxba2V5XVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdyYXBoXG5cdFx0XHRjb2xzLmxlbmd0aCA9IDA7XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGdyYXBoXG5cdFx0XHRcdGVsLmdyYXBoLnN0eWxlLndpZHRoID0gKG8uaGlzdG9yeSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIChvLmhpc3RvcnkgLSAxKSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cblx0XHRcdFx0Ly8gQWRkIGNvbHVtbnNcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG8uaGlzdG9yeTsgaSsrKSB7XG5cdFx0XHRcdFx0Y29sc1tpXSA9IGVsLmdyYXBoLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb2x1bW4pKTtcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLmJvdHRvbSA9IDA7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5yaWdodCA9IChpICogdGhlbWUuY29sdW1uLndpZHRoICsgaSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS53aWR0aCA9IHRoZW1lLmNvbHVtbi53aWR0aCArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5oZWlnaHQgPSAnMHB4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGVcblx0XHRcdHBvc2l0aW9uTWV0ZXIoKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwZW5kIGNvbnRhaW5lciB0byBhbmNob3Jcblx0XHRcdGFuY2hvci5hcHBlbmRDaGlsZChlbC5jb250YWluZXIpO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSBncmFwaCBoZWlnaHQgYWZ0ZXIgaXQgd2FzIGFwcGVuZGVkIHRvIERPTVxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGdyYXBoSGVpZ2h0ID0gZWwuZ3JhcGguY2xpZW50SGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0XHRpZiAoby50b2dnbGVPbikge1xuXHRcdFx0XHRpZiAoby50b2dnbGVPbiA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFBvc2l0aW9ucyB0aGUgbWV0ZXIgYmFzZWQgb24gb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcG9zaXRpb25NZXRlcigpIHtcblx0XHRcdGFwcGx5VGhlbWUoZWwuY29udGFpbmVyLCBvKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDb25zdHJ1Y3QuXG5cdFx0ICovXG5cdFx0KGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIENyZWF0ZSBtZXRlciBlbGVtZW50XG5cdFx0XHRjcmVhdGVNZXRlcigpO1xuXHRcdFx0Ly8gU3RhcnQgcmVuZGVyaW5nXG5cdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0fSgpKTtcblx0fVxuXG5cdC8vIEV4cG9zZSB0aGUgZXh0ZW5kIGZ1bmN0aW9uXG5cdEZQU01ldGVyLmV4dGVuZCA9IGV4dGVuZDtcblxuXHQvLyBFeHBvc2UgdGhlIEZQU01ldGVyIGNsYXNzXG5cdHdpbmRvdy5GUFNNZXRlciA9IEZQU01ldGVyO1xuXG5cdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRGUFNNZXRlci5kZWZhdWx0cyA9IHtcblx0XHRpbnRlcnZhbDogIDEwMCwgICAgIC8vIFVwZGF0ZSBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG5cdFx0c21vb3RoaW5nOiAxMCwgICAgICAvLyBTcGlrZSBzbW9vdGhpbmcgc3RyZW5ndGguIDEgbWVhbnMgbm8gc21vb3RoaW5nLlxuXHRcdHNob3c6ICAgICAgJ2ZwcycsICAgLy8gV2hldGhlciB0byBzaG93ICdmcHMnLCBvciAnbXMnID0gZnJhbWUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHRvZ2dsZU9uOiAgJ2NsaWNrJywgLy8gVG9nZ2xlIGJldHdlZW4gc2hvdyAnZnBzJyBhbmQgJ21zJyBvbiB0aGlzIGV2ZW50LlxuXHRcdGRlY2ltYWxzOiAgMSwgICAgICAgLy8gTnVtYmVyIG9mIGRlY2ltYWxzIGluIEZQUyBudW1iZXIuIDEgPSA1OS45LCAyID0gNTkuOTQsIC4uLlxuXHRcdG1heEZwczogICAgNjAsICAgICAgLy8gTWF4IGV4cGVjdGVkIEZQUyB2YWx1ZS5cblx0XHR0aHJlc2hvbGQ6IDEwMCwgICAgIC8vIE1pbmltYWwgdGljayByZXBvcnRpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXG5cdFx0Ly8gTWV0ZXIgcG9zaXRpb25cblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJywgLy8gTWV0ZXIgcG9zaXRpb24uXG5cdFx0ekluZGV4OiAgIDEwLCAgICAgICAgIC8vIE1ldGVyIFogaW5kZXguXG5cdFx0bGVmdDogICAgICc1cHgnLCAgICAgIC8vIE1ldGVyIGxlZnQgb2Zmc2V0LlxuXHRcdHRvcDogICAgICAnNXB4JywgICAgICAvLyBNZXRlciB0b3Agb2Zmc2V0LlxuXHRcdHJpZ2h0OiAgICAnYXV0bycsICAgICAvLyBNZXRlciByaWdodCBvZmZzZXQuXG5cdFx0Ym90dG9tOiAgICdhdXRvJywgICAgIC8vIE1ldGVyIGJvdHRvbSBvZmZzZXQuXG5cdFx0bWFyZ2luOiAgICcwIDAgMCAwJywgIC8vIE1ldGVyIG1hcmdpbi4gSGVscHMgd2l0aCBjZW50ZXJpbmcgdGhlIGNvdW50ZXIgd2hlbiBsZWZ0OiA1MCU7XG5cblx0XHQvLyBUaGVtZVxuXHRcdHRoZW1lOiAnZGFyaycsIC8vIE1ldGVyIHRoZW1lLiBCdWlsZCBpbjogJ2RhcmsnLCAnbGlnaHQnLCAndHJhbnNwYXJlbnQnLCAnY29sb3JmdWwnLlxuXHRcdGhlYXQ6ICAwLCAgICAgIC8vIEFsbG93IHRoZW1lcyB0byB1c2UgY29sb3JpbmcgYnkgRlBTIGhlYXQuIDAgRlBTID0gcmVkLCBtYXhGcHMgPSBncmVlbi5cblxuXHRcdC8vIEdyYXBoXG5cdFx0Z3JhcGg6ICAgMCwgLy8gV2hldGhlciB0byBzaG93IGhpc3RvcnkgZ3JhcGguXG5cdFx0aGlzdG9yeTogMjAgLy8gSG93IG1hbnkgaGlzdG9yeSBzdGF0ZXMgdG8gc2hvdyBpbiBhIGdyYXBoLlxuXHR9O1xuXG5cdC8vIE9wdGlvbiBuYW1lcyB0aGF0IHRyaWdnZXIgRlBTTWV0ZXIgcmVidWlsZCBvciByZXBvc2l0aW9uIHdoZW4gbW9kaWZpZWRcblx0dmFyIHJlYnVpbGRlcnMgPSBbXG5cdFx0J3RvZ2dsZU9uJyxcblx0XHQndGhlbWUnLFxuXHRcdCdoZWF0Jyxcblx0XHQnZ3JhcGgnLFxuXHRcdCdoaXN0b3J5J1xuXHRdO1xuXHR2YXIgcmVwb3NpdGlvbmVycyA9IFtcblx0XHQncG9zaXRpb24nLFxuXHRcdCd6SW5kZXgnLFxuXHRcdCdsZWZ0Jyxcblx0XHQndG9wJyxcblx0XHQncmlnaHQnLFxuXHRcdCdib3R0b20nLFxuXHRcdCdtYXJnaW4nXG5cdF07XG59KHdpbmRvdykpO1xuOyhmdW5jdGlvbiAodywgRlBTTWV0ZXIsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gVGhlbWVzIG9iamVjdFxuXHRGUFNNZXRlci50aGVtZSA9IHt9O1xuXG5cdC8vIEJhc2UgdGhlbWUgd2l0aCBsYXlvdXQsIG5vIGNvbG9yc1xuXHR2YXIgYmFzZSA9IEZQU01ldGVyLnRoZW1lLmJhc2UgPSB7XG5cdFx0aGVhdG1hcHM6IFtdLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cGFkZGluZzogJzVweCcsXG5cdFx0XHRtaW5XaWR0aDogJzk1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzBweCcsXG5cdFx0XHR0ZXh0QWxpZ246ICdyaWdodCcsXG5cdFx0XHR0ZXh0U2hhZG93OiAnbm9uZSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdHRvcDogMCxcblx0XHRcdHJpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcyNHB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdDb25zb2xhcywgQW5kYWxlIE1vbm8sIG1vbm9zcGFjZScsXG5cdFx0XHR6SW5kZXg6IDJcblx0XHR9LFxuXHRcdGxlZ2VuZDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRsZWZ0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcxMnB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICczMnB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRncmFwaDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0XHRib3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRNb3pCb3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRcdHpJbmRleDogMVxuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0d2lkdGg6IDQsXG5cdFx0XHRzcGFjaW5nOiAxLFxuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbFxuXHRcdH1cblx0fTtcblxuXHQvLyBEYXJrIHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmRhcmsgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC44XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzIyMicsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0Ym9yZGVyOiAnMXB4IHNvbGlkICMxYTFhMWEnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCAjMjIyJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdGhlYXRPbjogJ2NvbG9yJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzNmM2YzZidcblx0XHR9XG5cdH0pO1xuXG5cdC8vIExpZ2h0IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmxpZ2h0ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjUsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Y29sb3I6ICcjNjY2Jyxcblx0XHRcdGJhY2tncm91bmQ6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSksIC0xcHggLTFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpJyxcblx0XHRcdGJveFNoYWRvdzogJzAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyNlYWVhZWEnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBDb2xvcmZ1bCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5jb2xvcmZ1bCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjZcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzg4OCcsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDAsMCwwLC4yKScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjNzc3Jyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjIpJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gVHJhbnNwYXJlbnQgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUudHJhbnNwYXJlbnQgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC41XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRwYWRkaW5nOiAwLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuNSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0cGFkZGluZzogJzAgNXB4Jyxcblx0XHRcdGhlaWdodDogJzQwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MnB4J1xuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdGhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdHdpZHRoOiA1LFxuXHRcdFx0YmFja2dyb3VuZDogJyM5OTknLFxuXHRcdFx0aGVhdE9uOiAnYmFja2dyb3VuZENvbG9yJyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdH1cblx0fSk7XG59KHdpbmRvdywgRlBTTWV0ZXIpKTsiLCJpbXBvcnQgJy4vbGliL3RpbnktY2FudmFzLmpzJztcbmltcG9ydCAnLi9saWIvc291bmRzLmpzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgcmVqZWN0cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgJ2Zwc21ldGVyJztcblxuZGVjbGFyZSB2YXIgZmlyZVNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBqdW1wU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGhpdFNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBjb2luU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIEZQU01ldGVyOiBhbnk7XG5cbmNvbnN0IGZwc00gPSBuZXcgRlBTTWV0ZXIoKTtcblxuZGVjbGFyZSB2YXIgVEM6IGFueTtcbmRlY2xhcmUgdmFyIFRDVGV4OiBhbnk7XG5sZXQgcm5kOiAoKSA9PiBudW1iZXIgPSBNYXRoLnJhbmRvbVxuXG5pbnRlcmZhY2UgVmVjdG9yIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuaW50ZXJmYWNlIENhbWVyYXtcbiAgcDogVmVjdG9yXG4gIHc6IG51bWJlclxuICBoOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFBhcnRpY2xlIGV4dGVuZHMgQm9keXtcbn1cblxuaW50ZXJmYWNlIEJ1bGxldCBleHRlbmRzIEJvZHkge1xufVxuaW50ZXJmYWNlIEJvZHkge1xuICBwOiBWZWN0b3JcbiAgdjogVmVjdG9yXG4gIGQ6IERpclxuICBoOiBudW1iZXJcbiAgdzogbnVtYmVyXG4gIHZpOiBib29sZWFuXG59XG5pbnRlcmZhY2UgUGxheWVyIGV4dGVuZHMgQm9keSB7XG4gIHM6IGJvb2xlYW5cbiAgYz86IEJvZHlcbiAgbDpudW1iZXJcbn1cbmludGVyZmFjZSBFbmVteSBleHRlbmRzIEJvZHkge1xuICBsOiBudW1iZXJcbiAgaGk6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcDogUGxheWVyXG4gIGVzOiBFbmVteVtdXG4gIGJzOiBCdWxsZXRbXSxcbiAgaHM6IEJvZHlbXVxufVxuXG5pbnRlcmZhY2UgSW1nVGV4dHVyZSB7XG4gIHc6IG51bWJlclxuICBoOiBudW1iZXJcbiAgdDogV2ViR0xUZXh0dXJlXG59XG5lbnVtIERpciB7XG4gIEwsXG4gIFJcbn1cblxuZW51bSBFdmVudFR5cGUge1xuICBSUCxcbiAgTFIsXG4gIFJSLFxuICBMUCxcbiAgSlAsXG4gIFVQLFxuICBBUCxcbiAgQVJcbn1cblxudHlwZSBBY3Rpb24gPSBFdmVudFR5cGVcbnR5cGUgTW9kZWwgPSBTdGF0ZTtcbnZhciBjYW52YXMgPSBUQyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYycpKVxuaW50ZXJmYWNlIEFBQkIge1xuICBsdDogVmVjdG9yXG4gIHJ0OiBWZWN0b3JcbiAgcmI6IFZlY3RvclxuICBsYjogVmVjdG9yXG59XG5cbmZ1bmN0aW9uIHJkbkFuZ2xlKCk6IG51bWJlcntcbiAgY29uc3QgdiA9IChybmQoKSAqICgxMjUtMCkgKyAwKS8xMDAwXG4gIGlmKHJuZCgpID49IDAuNSl7XG4gICAgICByZXR1cm4gKDItdikgKiBNYXRoLlBJIFxuICB9ZWxzZXtcbiAgICAgIHJldHVybiB2ICogTWF0aC5QSVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFBQkIoYjogQm9keSk6IEFBQkIge1xuICByZXR1cm4ge1xuICAgIGx0OiB7IHg6IGIucC54LCB5OiBiLnAueSB9LFxuICAgIHJ0OiB7IHg6IGIucC54ICsgYi53LCB5OiBiLnAueSB9LFxuICAgIHJiOiB7IHg6IGIucC54ICsgYi53LCB5OiBiLnAueSArIGIuaCB9LFxuICAgIGxiOiB7IHg6IGIucC54LCB5OiBiLnAueSArIGIuaCB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGlsZUluZGVjZXModjogVmVjdG9yKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3Iodi55IC8gMjAgLyogdGlsZVNpemUgKi8pICogNTAgLyogd29ybGRTaXplICovICsgTWF0aC5mbG9vcih2LnggLyAyMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaWRlKGJvZHkxOiBCb2R5LCBib2R5MjogQm9keSk6IGJvb2xlYW4ge1xuICBjb25zdCByZXN1bHQgPSBib2R5MS5wLnggPCAoYm9keTIucC54ICsgYm9keTIudykgJiZcbiAgICBib2R5MS5wLnggKyAoYm9keTEudykgPiBib2R5Mi5wLnggJiZcbiAgICBib2R5MS5wLnkgPCBib2R5Mi5wLnkgKyBib2R5Mi5oICYmXG4gICAgYm9keTEucC55ICsgYm9keTEuaCA+IGJvZHkyLnAueTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbG9hZFRleHR1cmVzKHVybHM6IHN0cmluZ1tdKTogUHJvbWlzZTxJbWdUZXh0dXJlW10+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlciwgcmVqZWN0cykgPT4ge1xuICAgIGxldCByZXN1bHQ6IEltZ1RleHR1cmVbXSA9IG5ldyBBcnJheTxJbWdUZXh0dXJlPigpO1xuXG4gICAgdXJscy5mb3JFYWNoKCh1cmwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2VcbiAgICAgIGltZy5zcmMgPSB1cmxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICBnLmNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0XG4gICAgICAgIGcuY2FudmFzLndpZHRoID0gaW1nLndpZHRoXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBjb25zdCB0ZXgxOiBJbWdUZXh0dXJlICA9IHtcbiAgICAgICAgICB3OiBpbWcud2lkdGgsXG4gICAgICAgICAgaDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cblxuICAgICAgICBnLmNsZWFyUmVjdCgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcuc2F2ZSgpXG4gICAgICAgIGcuc2NhbGUoLTEsIDEpXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgaW1nLndpZHRoICogLTEsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5yZXN0b3JlKClcbiAgICAgICAgY29uc3QgdGV4MjogSW1nVGV4dHVyZSA9IHtcbiAgICAgICAgICB3OiBpbWcud2lkdGgsXG4gICAgICAgICAgaDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBpID0gaW5kZXgqMjtcbiAgICAgICAgcmVzdWx0W2krK10gPSB0ZXgxXG4gICAgICAgIHJlc3VsdFtpXSA9IHRleDJcbiAgICAgICAgaWYgKGluZGV4ID09IHVybHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZXIocmVzdWx0KVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWxsZXRUZXh0dXJlKCl7XG4gIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKVxuICBnLmNhbnZhcy53aWR0aCA9IDRcbiAgZy5jYW52YXMuaGVpZ2h0ID0gNFxuICBnLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICBnLmZpbGxTdHlsZSA9ICcjZmY2JztcbiAgZy5iZWdpblBhdGgoKTtcbiAgZy5hcmMoMiwgMiwgMiwgMCwgMiAqIE1hdGguUEkpO1xuICBnLmZpbGwoKVxuICByZXR1cm4gVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCA0LCA0KSBhcyBXZWJHTFRleHR1cmVcbn1cblxubG9hZFRleHR1cmVzKFtcInNoLnBuZ1wiLFwiaC5wbmdcIixcImJoLnBuZ1wiXG4sXCJtLnBuZ1wiLFwiZi5wbmdcIiwgXCJzci5wbmdcIiwgXCJzaS5wbmdcIiwgXG5cInNzLnBuZ1wiLCBcImIucG5nXCIsIFwiYS5wbmdcIl0pLnRoZW4oKHRleHR1cmVzKSA9PiB7XG4gIGNvbnN0IFtyU29sSG9zdCxsU29sSG9zdCxySG9zdCxsSG9zdCxyYm90SGl0LGxib3RIaXQsXG4gICAgLGxNb3VudGFpbixyaWdodEZsb29yLGxlZnRGbG9vciwgcmlnaHRSdW4sIGxlZnRSdW4sIHJpZ2h0SWRsZVxuICAgICwgbGVmdElkbGUsIHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgcmlnaHRCb3QsIGxlZnRCb3QsIGFiYywsXSA9IHRleHR1cmVzXG5cbiAgY29uc3QgYnVsbGV0VGV4dHVyZSA9IGNyZWF0ZUJ1bGxldFRleHR1cmUoKVxuXG4gIGxldCBjdXJyZW50RGVsdGEgPSAwLjBcbiAgbGV0IGN1cnJlbnRUaW1lID0gMC4wXG4gIGxldCBjdXJyZW50QWN0aW9uOiBBY3Rpb24gPSBudWxsXG4gIGNvbnN0IEdSQVZJVFkgPSAxMFxuXG4gIGxldCBzY29yZSA9IDBcbiAgbGV0IGFkZFNjb3JlID0gMFxuICBsZXQgdG9OZXh0U2NvcmUgPSAxMFxuXG4gIGNvbnN0IEpVTVBfVkVMID0gMzBcbiAgY29uc3QgV0FMS19TUEVFRCA9IDZcbiAgbGV0IHN0YXJ0VGltZSA9IDA7XG4gIGxldCBpZCA9IDA7XG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IFtjYW52YXMuZy5jYW52YXMud2lkdGgsIGNhbnZhcy5nLmNhbnZhcy5oZWlnaHRdXG5cbiAgbGV0IHBhcnRpY2xlczogUGFydGljbGVbXSA9IFtdXG4gIGxldCBwZXJzaXN0ZW5jZTogUGFydGljbGVbXSA9IFtdXG5cbiAgZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogKGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0KSowLjMsXG4gICAgICB5OiAoZXZ0LmNsaWVudFkgLSByZWN0LnRvcCkgKiAwLjE1XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBpbml0QnVsbGV0cyhudW06IG51bWJlcik6IEJ1bGxldFtdIHtcbiAgICBjb25zdCBiczogQnVsbGV0W10gPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGJzLnB1c2goeyBwOiB7IHg6IDUwLCB5OiA1MCB9LCB2OiB7IHg6IDAsIHk6IDAgfSwgdmk6IGZhbHNlLCBkOiBEaXIuTCwgdzogNCwgaDogNCB9KVxuICAgIH1cbiAgICByZXR1cm4gYnNcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRIb3N0YShudW06IG51bWJlcik6IEJvZHlbXSB7XG4gICAgY29uc3QgYnM6IEJvZHlbXSA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgYnMucHVzaCh7IHA6IHsgeDogMjUwLCB5OiAwIH0sIHY6IHsgeDogMCwgeTogMCB9LCB2aTogdHJ1ZSwgZDogRGlyLkwsIHc6IDE2LCBoOiAxNiB9KVxuICAgIH1cbiAgICByZXR1cm4gYnNcbiAgfVxuXG5cbiAgZnVuY3Rpb24gbmV3RW5lbXkoeDogbnVtYmVyLCB5Om51bWJlciwgdmVsOiBudW1iZXIpOiBFbmVteSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHA6IHsgeDogeCwgeTogeSB9LFxuICAgICAgdjogeyB4OiB2ZWwsIHk6IDAuMCB9LFxuICAgICAgZDogRGlyLkwsXG4gICAgICB3OiAyMCxcbiAgICAgIGg6IDIwLFxuICAgICAgdmk6IGZhbHNlLFxuICAgICAgaGk6IGZhbHNlLFxuICAgICAgbDogM1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBuZXdFbmVtaWVzKHg6IG51bWJlciwgeTpudW1iZXIsIG46IG51bWJlcik6IEVuZW15IFtde1xuICAgIGNvbnN0IGVzID0gW11cbiAgICBmb3IodmFyIGk9MDsgIGk8IG47IGkrKyl7XG4gICAgICBlcy5wdXNoKG5ld0VuZW15KHgseSxXQUxLX1NQRUVEKiBybmQoKSAqICgzLjktMS43KSArIDEuNykpXG4gICAgfVxuICAgIHJldHVybiAgZXNcbiAgfVxuXG4gIGNvbnN0IGNhbTogQ2FtZXJhID0ge3A6e3g6MCx5OjB9LHc6MzAwLGg6IDE1MH1cbiAgd2luZG93W1wiY2FtXCJdID0gY2FtXG5cbiAgbGV0IGNhbUNlbnRlciA9IGNhbS5wXG4gIGxldCByYWRpb1RvU2hha2UgPSAwXG4gIGxldCBzaGFrZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gc2hha2luZygpe1xuICAgIGNvbnN0IHggPSAwLCB5ID0gMFxuICAgIGNvbnN0IGFuZyA9IHJuZCgpICUgTWF0aC5QSSAqIDJcbiAgICBjb25zdCBueCA9IE1hdGguc2luKGFuZykgKiByYWRpb1RvU2hha2VcbiAgICBjb25zdCBueSA9IE1hdGguY29zKGFuZykgKiByYWRpb1RvU2hha2VcbiAgICBjYW0ucC54ID0geCArIG54XG4gICAgY2FtLnAueSA9IHkgKyBueVxuICAgIHJhZGlvVG9TaGFrZSAqPSAwLjlcbiAgfVxuLyogICBjYW52YXMuZy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcy5nLmNhbnZhcywgZXZlbnQpXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGN1cnJlbnRTdGF0ZS5ob3N0YWdlcy5sZW5ndGg7IGkrKyl7XG4gICAgICBjb25zdCBob3N0ID0gY3VycmVudFN0YXRlLmhvc3RhZ2VzW2ldXG4gICAgICAgIGhvc3QucG9zaXRpb24ueCA9IGNhbS5wb3NpdGlvbi54K3Bvcy54XG4gICAgICAgIGhvc3QucG9zaXRpb24ueSA9IGNhbS5wb3NpdGlvbi55K3Bvcy55XG4gICAgICAgIGhvc3QudmlzaWJsZSA9IHRydWVcbiAgICB9XG4gIH0pICovXG5cbiAgY2FudmFzLmcuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBsZXQgdGFrZSA9IDFcbiAgICBjb25zdCBwb3MgPSBnZXRNb3VzZVBvcyhjYW52YXMuZy5jYW52YXMsIGV2ZW50KVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3RhdGUuZXMubGVuZ3RoOyBpKyspe1xuICAgICAgY29uc3QgZW5lID0gY3VycmVudFN0YXRlLmVzW2ldXG4gICAgICBpZighZW5lLnZpICYmIHRha2UgPiAwKXtcbiAgICAgICAgZW5lLnAueCA9IGNhbS5wLngrcG9zLnhcbiAgICAgICAgZW5lLnAueSA9IGNhbS5wLnkrcG9zLnlcbiAgICAgICAgZW5lLnZpID0gdHJ1ZVxuICAgICAgICBlbmUudmkgPSB0cnVlXG4gICAgICAgIGVuZS5sID0gNVxuICAgICAgICBlbmUudi54ID0gIHJuZCgpICogKDMuOS0xLjcpICsgMS43ICAqICggY3VycmVudFN0YXRlLnAucC54ID4gZW5lLnAueCA/XG4gICAgICAgIFdBTEtfU1BFRUQgOiAtV0FMS19TUEVFRClcbiAgICAgICAgZW5lLmQgPSBlbmUudi54ID4gMCA/IERpci5MIDogRGlyLlJcbiAgICAgICAgdGFrZSAtLVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBleHBsb2RlUGFydGljbGVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZHtcbiAgICB2YXIgcm5kID0gTWF0aC5yYW5kb21cbiAgICBjb25zdCBzcCA9IFdBTEtfU1BFRUQqMlxuICAgIGNvbnN0IGpwID0gSlVNUF9WRUwqM1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0Y29uc3QgdnggPSBybmQoKSAqIChzcCAtICgtc3ApKSArICgtc3ApXG5cdFx0XHRjb25zdCB2eSA9IHJuZCgpICogKGpwIC0gKC1qcCkpICsgKC1qcClcblx0XHRcdHZhciBhbmdsZSA9IHJuZCgpICogTWF0aC5QSSAqIDI7XG5cdFx0XHRwYXJ0aWNsZXMucHVzaCh7cDoge3g6IHgseTp5fSx2Ont4OiB2eCAqIE1hdGguY29zKGFuZ2xlKSwgeTp2eSAqIE1hdGguc2luKGFuZ2xlKX0sZDpEaXIuTCxoOjQsdzo0LHZpOnRydWV9KVxuXHRcdH1cbiAgfVxuXG4gIGxldCBjdXJyZW50U3RhdGU6IE1vZGVsID0ge1xuICAgIHA6IHtcbiAgICAgIHA6IHsgeDogMTI4LCB5OiAwLjAgfSxcbiAgICAgIHY6IHsgeDogMC4wLCB5OiAwLjAgfSxcbiAgICAgIGQ6IERpci5SLFxuICAgICAgczogZmFsc2UsXG4gICAgICB3OiAyMCxcbiAgICAgIGg6IDIwLFxuICAgICAgdmk6IHRydWUsXG4gICAgICBsOiAzXG4gICAgfSxcbiAgICBlczogbmV3RW5lbWllcygzNCwwLDUwKSxcbiAgICBiczogaW5pdEJ1bGxldHMoNjApLFxuICAgIGhzOiBpbml0SG9zdGEoMSlcbiAgfVxuXG4gIGNvbnN0IEZMT09SID0gaGVpZ2h0IC0gMTBcbiAgY29uc3QgU0VDT05EX0ZMT09SID0gRkxPT1IgKiAwLjdcbiAgY29uc3Qgem9uZTogQm9keSA9IHsgcDogeyB4OiA1MCwgeTogRkxPT1IgfSwgdjogeyB4OiAwLCB5OiAwIH0sIHZpOiB0cnVlLCBkOiBEaXIuTCwgdzogMTUwLCBoOiAyMCB9XG5cblxuICBmdW5jdGlvbiBjcmVhdGVGbG9vcih4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBCb2R5IHtcbiAgICByZXR1cm4ge3A6e3g6eCwgeTogeX0sdzogd2lkdGgsIGg6IDIwLGQ6IERpci5MLHY6e3g6MCx5OjB9LHZpOiB0cnVlfVxuICB9XG5cbiAgY29uc3QgZmxvb3JzID0gW2NyZWF0ZUZsb29yKDAuMCxGTE9PUiw5MDApLCBjcmVhdGVGbG9vcigyMDAuMCxTRUNPTkRfRkxPT1IsMjYwKSxjcmVhdGVGbG9vcigzMDAuMCxTRUNPTkRfRkxPT1IsMzYwKV1cblxuICBjb25zdCBrZWVwQW5pbWF0aW9uID0gKHRpbWU6IG51bWJlcikgPT4ge1xuICAgIGN1cnJlbnREZWx0YSA9ICh0aW1lIC0gc3RhcnRUaW1lKSAvIDEwMDtcbiAgICBjdXJyZW50VGltZSA9IHRpbWVcbiAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgIFxuICAgIHJlbmRlcihjdXJyZW50U3RhdGUpXG4gICAgdXBkYXRlKGN1cnJlbnRBY3Rpb24sIGN1cnJlbnRTdGF0ZSlcbiAgICBjdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9XG5cblxuICBjb25zdCBoYW5kbGVyU3RhcnQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkFQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJQXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYW5kbGVyRW5kID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkFSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJSXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicmVjdFwiKTtcbiAgY29uc3QgcHNPcCA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICBzdmdzLmZvckVhY2gocmVjID0+IHtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICB9KTtcblxuICBjb25zdCBoYW5kbGVyS0JEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkpQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5VUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVBcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcktCRG93biwgdHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlcktCVXAgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SUlxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVJcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXJLQlVwLCB0cnVlKTtcblxuICBmdW5jdGlvbiBCb2R5QW5pbWF0aW9uKFxuICAgIHJpZ2h0VDogSW1nVGV4dHVyZSxcbiAgICBsZWZ0VDogSW1nVGV4dHVyZSxcbiAgICB0aWNrc1BlckZyYW1lOiBudW1iZXIsXG4gICAgbG9vcDogYm9vbGVhbixcbiAgICBmcmFtZXM6IG51bWJlcltdW10pIHtcbiAgICBjb25zdCBuRnJhbWVzID0gZnJhbWVzLmxlbmd0aDtcbiAgICBsZXQgZnJhbWVJbmRleCA9IDAsXG4gICAgICB0aWNrQ291bnQgPSAwXG5cbiAgICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEoZnJhbWVJbmRleCA8IG5GcmFtZXMgLSAxKSkge1xuICAgICAgICBmcmFtZUluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbiAocDogQm9keSkge1xuICAgICAgdGlja0NvdW50ICs9IDFcbiAgICAgIGlmICh0aWNrQ291bnQgPiB0aWNrc1BlckZyYW1lKSB7XG4gICAgICAgIHRpY2tDb3VudCA9IDBcbiAgICAgICAgaWYgKGZyYW1lSW5kZXggPCBmcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIC8vIEdvIHRvIHRoZSBuZXh0IGZyYW1lXG4gICAgICAgICAgZnJhbWVJbmRleCArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGxvb3ApIHtcbiAgICAgICAgICBmcmFtZUluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgW3YwLCB1MCwgdjEsIHUxXSA9IGZyYW1lc1tmcmFtZUluZGV4XVxuICAgICAgbGV0IHRleHQgPSBwLmQgPT0gRGlyLlIgPyByaWdodFQgOiBsZWZ0VFxuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgdGV4dC50LFxuICAgICAgICAtY2FtLnAueCsocC5wLnggKyAocC53IC8gMikpLFxuICAgICAgICAtY2FtLnAueStwLnAueSxcbiAgICAgICAgcC53LFxuICAgICAgICBwLmgsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbi8qICAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLHNlY29uZEZsb29yQm9keSk7XG4gIH1cbiAqL1xuICBmdW5jdGlvbiBpc092ZXJGbG9vcihiOiBCb2R5KTogYm9vbGVhbntcbiAgICBsZXQgZmxvb3JCb3R0b21zOiBib29sZWFuID0gZmFsc2U7XG4gICAgZm9yKHZhciBpPTA7aTxmbG9vcnMubGVuZ3RoO2krKyl7XG4gICAgICBmbG9vckJvdHRvbXMgPSBmbG9vckJvdHRvbXMgfHwgY29sbGlkZUZsb29yQm90dG9tKGIsZmxvb3JzW2ldKVxuICAgIH1cbiAgICByZXR1cm4gYi5wLnkgKyBiLmggPT0gRkxPT1IgfHwgZmxvb3JCb3R0b21zO1xuICB9XG4gIFxuICBjb25zdCBib3RIaXR0ZWRBbmltID0gbmV3IEJvZHlBbmltYXRpb24ocmJvdEhpdCwgbGJvdEhpdCwgMiwgdHJ1ZSwgW1swLCAwLCAxLCAxXV0pXG4gIGNvbnN0IGJvdEFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodEJvdCwgbGVmdEJvdCwgNSwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IE9ORVRISVJEID0gMS8zIFxuICBjb25zdCBzb2xkaWVySG9zdEFuaSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJTb2xIb3N0LCBsU29sSG9zdCwgMTQsIGZhbHNlLCBbWzAsIDAsIDEsIE9ORVRISVJEXSwgWzAsIE9ORVRISVJELCAxLCBPTkVUSElSRCoyXSxbMCwgT05FVEhJUkQqMiwgMSwgMV1dKVxuICBjb25zdCBpZGxlQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0SWRsZSwgbGVmdElkbGUsIDIwLCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaG9zdEFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihySG9zdCwgbEhvc3QsIDIwLCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgcnVuQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0UnVuLCBsZWZ0UnVuLCA4LCB0cnVlLCBbWzAsIDAsIDEsIDAuMl0sIFswLCAuMiwgMSwgMC40XSwgWzAsIC40LCAxLCAwLjZdLCBbMCwgLjYsIDEsIDAuOF0sIFswLCAuOCwgMSwgMS4wXV0pXG4gIGNvbnN0IHNob290aW5nQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgMywgZmFsc2UsIFtbMCwgMCwgMSwgMC4yNV0sIFswLCAuMjUsIDEsIDAuNV0sIFswLCAuNSwgMSwgMC43NV0sIFswLCAuNzUsIDEsIDEuMF1dKVxuXG4gIGxldCBndW5SZWFkeTogbnVtYmVyID0gMFxuICBsZXQganVtcFRyaWVzOm51bWJlciA9IDJcbiAgbGV0IHRpY2tzSGl0dGVkOiBudW1iZXIgPSAwXG4gIGZ1bmN0aW9uIHVwZGF0ZShhOiBBY3Rpb24sIG06IE1vZGVsKSB7XG4gICAgaWYocmFkaW9Ub1NoYWtlID4gMC4wMDAyKXtcbiAgICAgIHNoYWtpbmcoKVxuICAgIH1cbiAgICBjb25zdCBwID0gbS5wXG4gICAgaWYgKGlzT3ZlckZsb29yKHApKSB7XG4gICAgICBqdW1wVHJpZXMgPSAyXG4gICAgfVxuICAgIHN3aXRjaCAoYSkge1xuICAgICAgY2FzZSBFdmVudFR5cGUuSlA6XG4gICAgICAgIGlmKGp1bXBUcmllcyA+IDApe1xuICAgICAgICAgIGp1bXBUcmllcy0tXG4gICAgICAgICAgXG4gICAgICAgICAgcC52LnkgPSBwLmMgPyAtSlVNUF9WRUwvMiA6IC1KVU1QX1ZFTFxuICAgICAgICAgIGp1bXBTb3VuZCgpXG4gICAgICAgIH1cbiAgICAgICAgcC5zID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MUDpcbiAgICAgICAgcC5kID0gRGlyLkxcbiAgICAgICAgcC52LnggPSBwLmMgPyAtV0FMS19TUEVFRC8yIDogLVdBTEtfU1BFRURcbiAgICAgICAgcC5zID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SUDpcbiAgICAgICAgcC5kID0gRGlyLlJcbiAgICAgICAgcC52LnggPSBwLmMgPyBXQUxLX1NQRUVELzIgOiBXQUxLX1NQRUVEXG4gICAgICAgIHAucyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTFI6XG4gICAgICAgIHAudi54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJSOlxuICAgICAgICBwLnYueCA9IDBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BUDpcbiAgICAgICAgaWYoIW0ucC5jKXtcbiAgICAgICAgc2hvb3RpbmdBbmltLnJlc2V0KClcbiAgICAgICAgcC5zID0gdHJ1ZVxuICAgICAgICBwLnYueCA9IChwLmQgPT0gRGlyLkwgPyAxLjUgOiAtMS41KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5icy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGIgPSBtLmJzW2ldXG4gICAgICAgICAgaWYgKCFiLnZpICYmIGd1blJlYWR5ID09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFuZ2xlID0gcmRuQW5nbGUoKVxuICAgICAgICAgICAgYi5wLnggPSBwLnAueCArIHAudyArIGIud1xuICAgICAgICAgICAgYi5wLnkgPSBwLnAueSArIChwLmggLyAyLjQpXG4gICAgICAgICAgICBiLnYueCA9IChwLmQgPT0gRGlyLlIgPyAzNSA6IC0zNSkgKiBNYXRoLmNvcyhhbmdsZSlcbiAgICAgICAgICAgIGIudi55ID0gNSAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgICAgICAgYi52aSA9IHRydWVcbiAgICAgICAgICAgIGd1blJlYWR5ID0gM1xuICAgICAgICAgICAgZmlyZVNvdW5kKClcbiAgICAgICAgICAgIHJhZGlvVG9TaGFrZSA9IDJcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBob3N0ID0gbS5wLmNcbiAgICAgICAgaG9zdC52aSA9IHRydWVcbiAgICAgICAgaG9zdC5wLnggPSBtLnAuZCA9PSBEaXIuTCA/IG0ucC5wLnggLSAyNSA6IG0ucC5wLnggKyAyNVxuICAgICAgICBob3N0LnAueSA9IG0ucC5wLnkgLSAxMFxuICAgICAgICBtLnAuYyA9IG51bGxcbiAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkFSOlxuICAgICAgICBwLnYueCA9IDBcbiAgICAgICAgLy9wLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgLy9TaG9vdGluZ0FuaW0ucmVzZXQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcblxuICAgICBtb3ZlKG0ucClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5ocy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaCA9IG0uaHNbaV1cbiAgICAgIG1vdmUoaClcbiAgICAgIGlmKGgudmkgJiYgY29sbGlkZShtLnAsaCkgJiYgIW0ucC5jKXtcbiAgICAgICAgaC52aSA9IGZhbHNlXG4gICAgICAgIG0ucC5jID0gaFxuICAgICAgfVxuICAgICAgaWYoaC52aSAmJiBjb2xsaWRlKGgsem9uZSkpe1xuICAgICAgICBhZGRTY29yZSArPSA1MDBcbiAgICAgICAgaC52aSA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZSA9IG0uZXNbaV1cbiAgICAgIHRpY2tzSGl0dGVkID0gTWF0aC5tYXgodGlja3NIaXR0ZWQtMSwwKVxuICAgICAgaWYodGlja3NIaXR0ZWQgPT0gMCl7XG4gICAgICAgIGUuaGkgPSBmYWxzZVxuICAgICAgfVxuICAgICAgbW92ZShlKVxuICAgICAgaWYgKGUucC54IDwgMCB8fCAoZS5wLnggKyAyMCA+IDkwMCkpIHtcbiAgICAgICAgZS52LnggPSBlLnYueCAqIC0xXG4gICAgICAgIGUuZCA9IGUudi54ID4gMCA/IERpci5MIDogRGlyLlJcbiAgICAgIH1cbiAgICAgIGZvcih2YXIgaiA9IDA7ajwgbS5icy5sZW5ndGg7aisrKXtcbiAgICAgICAgY29uc3QgYiA9IG0uYnNbal1cbiAgICAgICAgaWYgKGUudmkgJiYgYi52aSAmJiBjb2xsaWRlKGIsIGUpKSB7XG4gICAgICAgICAgaGl0U291bmQoKVxuICAgICAgICAgIGUuaGkgPSB0cnVlXG4gICAgICAgICAgdGlja3NIaXR0ZWQgPSA4XG4gICAgICAgICAgZS5wLnggKz0gKGIudi54ID4gMCA/ICsgMTggOiAtMTgpXG4gICAgICAgICAgaWYoZS5sID09IDApe1xuICAgICAgICAgICAgcmFkaW9Ub1NoYWtlID0gNFxuICAgICAgICAgICAgZXhwbG9kZVBhcnRpY2xlcyhlLnAueCsoZS53LzIpLGUucC55KyhlLmgvMikpXG4gICAgICAgICAgICBlLnZpID0gZmFsc2VcbiAgICAgICAgICAgIGUudi54ID0gMFxuICAgICAgICAgICAgYWRkU2NvcmUgKz0gMTAwXG5cbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGUubCA9IE1hdGgubWF4KGUubC0xLDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGIudmkgPSBmYWxzZVxuICAgICAgICAgIGIudi54ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihlLnZpICYmIGNvbGxpZGUoZSxtLnApKXtcbiAgICAgICAgbS5wLmwtLVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJzW2ldXG4gICAgICBtb3ZlQnVsbGV0KGIpXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICBtb3ZlKHApXG5cblxuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20ocCxmbG9vcnNbZl0pKXtcbiAgICAgICAgICBwYXJ0aWNsZXMuc3BsaWNlKGksIDEpXG4gICAgICAgICAgcGVyc2lzdGVuY2UucHVzaChwKSAgICAgICAgIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ3VuUmVhZHkgPSBNYXRoLm1heCgwLCBndW5SZWFkeSAtIDEpO1xuICAgIG1vdmVDYW0obS5wKVxuXG4gICAgaWYodG9OZXh0U2NvcmUgPD0gMCAmJiBhZGRTY29yZT4wKXtcbiAgICAgIHNjb3JlKz0xMFxuICAgICAgY29pblNvdW5kKClcbiAgICAgIHRvTmV4dFNjb3JlID0gMTBcbiAgICAgIGFkZFNjb3JlID0gTWF0aC5tYXgoYWRkU2NvcmUtMTAsMClcblxuICAgIH1cbiAgICB0b05leHRTY29yZS0tXG4gICAgem9uZS5wLnkgKz0gKChGTE9PUi0xMCkgLSB6b25lLnAueSkgKiAwLjEgXG4gICAgem9uZS5wLnkgPSBNYXRoLmZsb29yKHpvbmUucC55KSA9PSBGTE9PUi0xMCA/IEZMT09SIDogem9uZS5wLnlcbiAgfVxuICBmdW5jdGlvbiBtb3ZlQ2FtKGI6IEJvZHkpOiB2b2lke1xuICAgIGNhbS5wLnggPSBNYXRoLm1heChiLnAueCAtIChjYW0udy8yKSwwKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyTW91bnRhaW4oKSB7XG4gICAgY2FudmFzLnB1c2goKVxuICAgIGNhbnZhcy5zY2FsZSg2LDYpXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCAxMDA7IHggKz0gMjApIHtcbiAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgIGxNb3VudGFpbi50LFxuICAgICAgICgtY2FtLnAueCowLjA2KSArIHgsXG4gICAgICAgKC1jYW0ucC55KjAuMDYpICsgNSxcbiAgICAgICAgbE1vdW50YWluLncsXG4gICAgICAgIGxNb3VudGFpbi5oLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cbiAgICAgIGNhbnZhcy5wb3AoKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRmxvb3IoKSB7XG4gICAgICBmb3IodmFyIGY9MDsgZjxmbG9vcnMubGVuZ3RoO2YrKyl7XG4gICAgICAgIGNvbnN0IGZsb29yID0gZmxvb3JzW2ZdXG4gICAgICAgIGZvciAodmFyIHggPSBmbG9vci5wLng7IHggPD0gZmxvb3IucC54K2Zsb29yLncgOyB4ICs9IDIwKSB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IHggJSA3ID09IDAgPyBsZWZ0Rmxvb3IgOiByaWdodEZsb29yXG4gICAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICAgIHRleHQudCxcbiAgICAgICAgICAgIC1jYW0ucC54K3gsXG4gICAgICAgICAgICAtY2FtLnAueSsoZmxvb3IucC55LTEwKSxcbiAgICAgICAgICAgIHRleHQudyxcbiAgICAgICAgICAgIHRleHQuaCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlmT25UaGVGbG9vcmdldFkoYjogQm9keSk6IG51bWJlcntcbiAgICBsZXQgYm90dG9tQ29sbGlkZTogbnVtYmVyID0gLTFcbiAgICBmb3IodmFyIGkgPSAwO2k8IGZsb29ycy5sZW5ndGg7aSsrKXtcbiAgICAgICBib3R0b21Db2xsaWRlID0gY29sbGlkZUZsb29yQm90dG9tKGIsZmxvb3JzW2ldKSA/IGZsb29yc1tpXS5wLnkgOiAtMSBcbiAgICB9XG4gICAgcmV0dXJuIGJvdHRvbUNvbGxpZGU7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUdyYXZpdHkoYjogQm9keSkge1xuICAgIGIudi55ID0gIGlmT25UaGVGbG9vcmdldFkoYikgPCAwID8gYi52LnkgKyAoR1JBVklUWSAqIGN1cnJlbnREZWx0YSkgOiBiLnYueVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0c2lkZVNjcmVlbihiOiBCdWxsZXQpIHtcbiAgICByZXR1cm4gYi5wLnggPCAwIHx8IGIucC54ID4gOTAwXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQnVsbGV0KGI6IEJ1bGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRzaWRlU2NyZWVuKGIpKSB7XG4gICAgICBiLnZpID0gZmFsc2VcbiAgICAgIGIudi54ID0gMFxuICAgIH1cbiAgICBiLnAueCArPSBiLnYueCAqIGN1cnJlbnREZWx0YVxuICAgIGIucC55ICs9IGIudi55ICogY3VycmVudERlbHRhXG4gIH1cblxuICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JUb3AoYjogQm9keSwgZjogQm9keSk6IGJvb2xlYW4ge1xuICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGYucC55KyhmLmgvMikgPiBiLnAueVxuICB9XG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vckJvdHRvbShiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucC55IDwgZi5wLnlcbiAgIH1cblxuICAgZnVuY3Rpb24gY29sbGlkZUZsb29yTGVmdChiOiBCb2R5LGY6IEJvZHkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgYi5wLnggPCBmLnAueCAmJiBiLnAueCtiLncgPiBmLnAueFxuICAgfVxuICAgZnVuY3Rpb24gY29sbGlkZUZsb29yUmlnaHQoYjogQm9keSxmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucC54KyhiLncqMC45KSA8IGYucC54ICYmIGIudi54ID4gMFxuICAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoYjogQm9keSk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VuZFkgPSBpZk9uVGhlRmxvb3JnZXRZKGIpXG4gICAgYi5wLnkgPSBncm91bmRZIDwgMCA/IGIucC55ICsgKGIudi55ICogY3VycmVudERlbHRhKSA6IGdyb3VuZFkgLSBiLmhcbiAgICBiLnAueCArPSBiLnYueCAqIGN1cnJlbnREZWx0YVxuICAgIGFwcGx5R3Jhdml0eShiKVxuXG4gICAgZm9yKHZhciBmID0wOyBmPCBmbG9vcnMubGVuZ3RoOyBmKyspe1xuXG4gICAgICBpZihjb2xsaWRlRmxvb3JUb3AoYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52LnkgPCAwKXtcbiAgICAgICAgICBiLnYueSA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoY29sbGlkZUZsb29yQm90dG9tKGIsZmxvb3JzW2ZdKSl7XG4gICAgICAgIGlmKGIudi55ID4gMCl7XG4gICAgICAgICAgYi52LnkgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cbmZ1bmN0aW9uIHJlbmRlclRleHQodzogc3RyaW5nLHg6IG51bWJlcix5Om51bWJlcixzOm51bWJlcil7XG4gIGNvbnN0IGNvb3IgPSByZW5kZXJDb29yZCh3KVxuICB2YXIgbmV3WCA9IC0ody5sZW5ndGgqICg0KnMpKS8yO1xuICBmb3IodmFyIGMgPSAwOyBjPGNvb3IubGVuZ3RoO2MrKyl7XG4gICAgY2FudmFzLmltZyhcbiAgICAgIGFiYy50LFxuICAgICAgeCtuZXdYLFxuICAgICAgeSxcbiAgICAgIDQqcyxcbiAgICAgIDQqcyxcbiAgICAgIGNvb3JbY11bMF0sXG4gICAgICBjb29yW2NdWzFdLFxuICAgICAgY29vcltjXVsyXSxcbiAgICAgIGNvb3JbY11bM11cbiAgICApO1xuXG4gICAgbmV3WCs9NVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvb3JkKHc6IHN0cmluZyk6IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdW117XG4gIGNvbnN0IGxldHRlcnM6IHN0cmluZ1tdID0gWydhYmNkZWZnaGlqa2xtJywnbm9wcXJzdHV2d3h5eicsICcwMTIzNDU2Nzg5OiErJ11cbiAgbGV0IHJlc3A6W251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl1bXSA9IG5ldyBBcnJheTxbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXT4oKVxuXG4gIGZvcih2YXIgaSA9IDA7aTx3Lmxlbmd0aDtpKyspe1xuICAgIGNvbnN0IGwgPSB3LmNoYXJBdChpKVxuICAgIGZvcih2YXIgciA9IDA7IHI8bGV0dGVycy5sZW5ndGg7cisrKXtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGV0dGVyc1tyXS5pbmRleE9mKGwpXG4gICAgICBpZihpbmRleCA+IC0xKXtcbiAgICAgICAgcmVzcC5wdXNoKFsoaW5kZXgqNCkvNTIsIChyKjQpIC8xMiwgKChpbmRleCo0KSs0KS81MiAsICgocio0KSs0KS8xMl0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3Bcbn1cblxuXG4gIGNvbnN0IHJlbmRlciA9IChtOiBNb2RlbCkgPT4ge1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAgTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQqMC45NSkgKyBcInB4XCIgO1xuICAgIGNhbnZhcy5nLnZpZXdwb3J0KDAsIDAsIGNhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodCk7XG5cbiAgICBpZih3aW5kb3cuaW5uZXJIZWlnaHQ+d2luZG93LmlubmVyV2lkdGgpe1xuICAgICAgY2FudmFzLmNscygpXG4gICAgICBjYW52YXMuYmtnKDAsMCwwKVxuICAgICAgcmVuZGVyVGV4dChcImZsaXA6cGhvbmVcIiw0MCw2MCwxKVxuICAgIH1lbHNle1xuXG4gICAgY2FudmFzLmNscygpXG4gICAgY2FudmFzLmJrZyg1Ny8yNTUsNzMvMjU1LDgxLzI1NSlcbiAgICByZW5kZXJNb3VudGFpbigpXG5cbiAgICBjb25zdCBwID0gbS5wXG5cbiAgICByZW5kZXJGbG9vcigpXG5cbiAgICByZW5kZXJUZXh0KFwiZXh0cmFjdGlvblwiLC1jYW0ucC54KyB6b25lLnAueCsoem9uZS53LzIpICx6b25lLnAueS0xNSwxKVxuICAgIHJlbmRlclRleHQoXCJhcmVhXCIsLWNhbS5wLngrIHpvbmUucC54Kyh6b25lLncvMiksem9uZS5wLnktMTAsMSlcblxuICAgIGlmIChwLnMpIHtcbiAgICAgIHNob290aW5nQW5pbS51cGRhdGUocClcbiAgICB9IGVsc2UgaWYgKHAudi54ID09IDApIHtcbiAgICAgIGlmKHAuYyl7XG4gICAgICAgc29sZGllckhvc3RBbmkudXBkYXRlKHApXG4gICAgICB9ZWxzZXtcbiAgICAgIGlkbGVBbmltLnVwZGF0ZShwKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihwLmMpe1xuICAgICAgICBzb2xkaWVySG9zdEFuaS5yZXNldCgpXG4gICAgICAgIHNvbGRpZXJIb3N0QW5pLnVwZGF0ZShwKVxuICAgICAgIH1lbHNle1xuICAgICAgICBydW5BbmltLnVwZGF0ZShwKVxuICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVzW2ldXG4gICAgICBpZihlLnZpKXtcbiAgICAgICAgaWYoZS5oaSl7XG4gICAgICAgICAgYm90SGl0dGVkQW5pbS51cGRhdGUoZSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgYm90QW5pbS51cGRhdGUoZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5icy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnNbaV1cbiAgICAgIGlmIChiLnZpKSB7XG4gICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgYnVsbGV0VGV4dHVyZSxcbiAgICAgICAgICAtY2FtLnAueCtiLnAueCxcbiAgICAgICAgICAtY2FtLnAueStiLnAueSxcbiAgICAgICAgICA0LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDEsXG4gICAgICAgICAgMVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5ocy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uaHNbaV1cbiAgICAgIGlmIChiLnZpKSB7XG4gICAgICAgIGhvc3RBbmltLnVwZGF0ZShiKVxuICAgICAgfVxuICAgIH1cblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0aWNsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHAgPSBwYXJ0aWNsZXNbaV1cbiAgICAgICAgaWYocCAmJiBwLnZpKXtcbiAgICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgICAgcmJvdEhpdC50LFxuICAgICAgICAgICAgLWNhbS5wLngrcC5wLngsXG4gICAgICAgICAgICAtY2FtLnAueStwLnAueSxcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAuNyxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJzaXN0ZW5jZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcCA9IHBlcnNpc3RlbmNlW2ldXG4gICAgICAgIGlmKHAgJiYgcC52aSl7XG4gICAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICAgIHJib3RIaXQudCxcbiAgICAgICAgICAgIC1jYW0ucC54K3AucC54LFxuICAgICAgICAgICAgLWNhbS5wLnkrcC5wLnksXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLjcsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJUZXh0KFwic2NvcmU6IFwiK3Njb3JlLHdpZHRoLzIsMTAsMSlcbiAgLy8gcmVuZGVyVGV4dChcImFcIix3aWR0aC8yLDEwLDIpXG4gIH1cbiAgICBjYW52YXMuZmx1c2goKTtcbiAgICBmcHNNLnRpY2soKVxuICB9XG5cbiAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgIGNvbnN0IHN2Z3M6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdmdcIilcbiAgICBzdmdzLmZvckVhY2goc3ZnID0+IHtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICB9XG5cblxuICBydW5HYW1lKClcbn0pXG4iLCJmdW5jdGlvbiBFKGMpe1xuICAgIHRoaXMubiA9IGMuY3JlYXRlR2FpbigpXG4gICAgdGhpcy5uLmdhaW4udmFsdWUgPSAwXG4gICAgdGhpcy5hZGRFdmVudFRvUXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgYy5jdXJyZW50VGltZSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgxLCBjLmN1cnJlbnRUaW1lICsgMC4wMDEpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4zLCBjLmN1cnJlbnRUaW1lICsgMC4xMDEpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgYy5jdXJyZW50VGltZSArIDAuNTAwKTtcbiAgICB9XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIFdOQihjKXtcbiAgICB2YXIgYnMgPSBjLnNhbXBsZVJhdGU7XG4gICAgdmFyIGIgPSBjLmNyZWF0ZUJ1ZmZlcigxLCBicywgYy5zYW1wbGVSYXRlKTtcbiAgICB2YXIgbyA9IGIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnM7IGkrKykge1xuICAgICAgb1tpXSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICB9XG4gIFxuICAgIHRoaXMucyA9IGMuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgdGhpcy5zLmJ1ZmZlciA9IGI7XG4gICAgdGhpcy5zLmxvb3AgPSB0cnVlXG4gIH07XG4gIFxuICB2YXIgY3R4ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKClcbiAgdmFyIG4gPSBuZXcgV05CKGN0eClcbiAgdmFyIHYxID0gbmV3IEUoY3R4KVxuICB2YXIgdjIgPSBuZXcgRShjdHgpXG4gIHZhciB2MyA9IG5ldyBFKGN0eClcbiAgdmFyIHY0ID0gbmV3IEUoY3R4KVxuICB2YXIgZiA9IGN0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICB2YXIgZyA9IGN0eC5jcmVhdGVHYWluKClcbiAgdmFyIHZzID0gMFxuICB2YXIgc3RkID0gZmFsc2VcblxuICBcbiAgbi5zLmNvbm5lY3QodjEubilcbiAgbi5zLmNvbm5lY3QodjIubilcbiAgbi5zLmNvbm5lY3QodjMubilcbiAgbi5zLmNvbm5lY3QodjQubilcbiAgXG4gIGYudHlwZSA9IFwibG93cGFzc1wiXG4gIGYuUS52YWx1ZSA9IDFcbiAgZi5mcmVxdWVuY3kudmFsdWUgPSA4MDBcbiAgdjEubi5jb25uZWN0KGYpXG4gIHYyLm4uY29ubmVjdChmKVxuICB2My5uLmNvbm5lY3QoZilcbiAgdjQubi5jb25uZWN0KGYpXG4gIGcuZ2Fpbi52YWx1ZSA9IDVcbiAgZi5jb25uZWN0KGcpXG4gIGcuY29ubmVjdChjdHguZGVzdGluYXRpb24pXG4gIFxuICBcbiAgXG4gIGZ1bmN0aW9uIGZpcmVTb3VuZCgpe1xuICAgIFxuICAgaWYoIXN0ZCl7XG4gICAgICBzdGQgPSB0cnVlXG4gICAgICBuLnMuc3RhcnQoMClcbiAgICB9XG4gICAgXG4gICAgXG4gICAgICAgdnMrK1xuICAgICAgICBpZih2cyA+IDQpe1xuICAgICAgICAgIHZzID0gMVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAxKXtcbiAgICAgICAgICB2MS5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAyKXtcbiAgICAgICAgICB2Mi5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSAzKXtcbiAgICAgICAgICB2My5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2cyA9PSA0KXtcbiAgICAgICAgICB2NC5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gIH1cblxudmFyIG8gPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuby50eXBlID0gJ3NxdWFyZSdcbnZhciB2ID0gY3R4LmNyZWF0ZUdhaW4oKTtcbm8uY29ubmVjdCh2KVxudi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG52LmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG52YXIgc3RkMiA9IGZhbHNlXG5cbmZ1bmN0aW9uIGp1bXBTb3VuZCgpe1xuICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiAoMyAtIDEpICsgMSkvMlxuICBpZighc3RkMil7XG4gICAgICBvLnN0YXJ0KDApXG4gICAgc3RkMiA9IHRydWVcbiAgfVxuICBvLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgyMDAqciwgY3R4LmN1cnJlbnRUaW1lKVxuICB2LmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wNSxjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuNiwgY3R4LmN1cnJlbnRUaW1lICsgMC4xKTtcbiAgby5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgyODAqciwgY3R4LmN1cnJlbnRUaW1lICsgMC40KTtcbiAgdi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxuZnVuY3Rpb24gaGl0U291bmQoKXtcbiAgdmFyIG9oID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIHZhciB2aCA9IGN0eC5jcmVhdGVHYWluKCk7XG4gIG9oLmNvbm5lY3QodmgpXG4gIHZoLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIG9oLmZyZXF1ZW5jeSA9IDg4MC42O1xuICBvaC5zdGFydCgwKVxuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDEsY3R4LmN1cnJlbnRUaW1lKVxuICBvaC5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICB2aC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNSlcbn1cblxuXG52YXIgb0MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xub0MudHlwZSA9ICdzcXVhcmUnXG52YXIgdkMgPSBjdHguY3JlYXRlR2FpbigpO1xub0MuY29ubmVjdCh2QylcbnZDLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbnZDLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG52YXIgc3RkQyA9IGZhbHNlXG5cbmZ1bmN0aW9uIGNvaW5Tb3VuZCgpe1xuICBpZighc3RkQyl7XG4gICAgICBvQy5zdGFydCgwKVxuICAgIHN0ZEMgPSB0cnVlXG4gIH1cbiAgb0MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDE4MDAsIGN0eC5jdXJyZW50VGltZSlcbnZDLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDUsY3R4LmN1cnJlbnRUaW1lKVxudkMuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDUsIGN0eC5jdXJyZW50VGltZSArIDAuMSk7XG5vQy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxODAwLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xudkMuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xudkMuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxud2luZG93WydmaXJlU291bmQnXSA9IGZpcmVTb3VuZDtcbndpbmRvd1snanVtcFNvdW5kJ10gPSBqdW1wU291bmQ7XG53aW5kb3dbJ2hpdFNvdW5kJ10gPSBoaXRTb3VuZDtcbndpbmRvd1snY29pblNvdW5kJ10gPSBjb2luU291bmQ7XG5cblxuXG5cblxuICBcbiAgIiwiLypcbiAqIFRpbnlDYW52YXMgbW9kdWxlIChodHRwczovL2dpdGh1Yi5jb20vYml0bmVuZmVyL3RpbnktY2FudmFzKVxuICogRGV2ZWxvcGVkIGJ5IEZlbGlwZSBBbGZvbnNvIC0+IGh0dHBzOi8vdHdpdHRlci5jb20vYml0bmVuZmVyL1xuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICAgICAgICAgICAgICAgICAgIFZlcnNpb24gMiwgRGVjZW1iZXIgMjAwNFxuICogXG4gKiAgQ29weXJpZ2h0IChDKSAyMDA0IFNhbSBIb2NldmFyIDxzYW1AaG9jZXZhci5uZXQ+XG4gKiBcbiAqICBFdmVyeW9uZSBpcyBwZXJtaXR0ZWQgdG8gY29weSBhbmQgZGlzdHJpYnV0ZSB2ZXJiYXRpbSBvciBtb2RpZmllZFxuICogIGNvcGllcyBvZiB0aGlzIGxpY2Vuc2UgZG9jdW1lbnQsIGFuZCBjaGFuZ2luZyBpdCBpcyBhbGxvd2VkIGFzIGxvbmdcbiAqICBhcyB0aGUgbmFtZSBpcyBjaGFuZ2VkLlxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICBURVJNUyBBTkQgQ09ORElUSU9OUyBGT1IgQ09QWUlORywgRElTVFJJQlVUSU9OIEFORCBNT0RJRklDQVRJT05cbiAqIFxuICogICAwLiBZb3UganVzdCBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPLlxuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKi9cblxuZnVuY3Rpb24gQ29tcGlsZVNoYWRlcihnbCwgc291cmNlLCB0eXBlKSB7XG4gICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICByZXR1cm4gc2hhZGVyO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVTaGFkZXJQcm9ncmFtKGdsLCB2c1NvdXJjZSwgZnNTb3VyY2UpIHtcbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKSxcbiAgICAgICAgdlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIHZzU291cmNlLCAzNTYzMyksXG4gICAgICAgIGZTaGFkZXIgPSBDb21waWxlU2hhZGVyKGdsLCBmc1NvdXJjZSwgMzU2MzIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZlNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgcmV0dXJuIHByb2dyYW07XG59XG5cbmZ1bmN0aW9uIENyZWF0ZUJ1ZmZlcihnbCwgYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpIHtcbiAgICB2YXIgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihidWZmZXJUeXBlLCBidWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVRleHR1cmUoZ2wsIGltYWdlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoMzU1MywgdGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MiwgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDMsIDMzMDcxKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQwLCA5NzI4KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQxLCA5NzI4KTtcbiAgICBnbC50ZXhJbWFnZTJEKDM1NTMsIDAsIDY0MDgsIDY0MDgsIDUxMjEsIGltYWdlKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCBudWxsKTtcbiAgICB0ZXh0dXJlLndpZHRoID0gd2lkdGg7XG4gICAgdGV4dHVyZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgcmV0dXJuIHRleHR1cmU7XG59XG53aW5kb3dbJ1RDU2hkJ10gPSBDb21waWxlU2hhZGVyO1xud2luZG93WydUQ1ByZyddID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbTtcbndpbmRvd1snVENCdWYnXSA9IENyZWF0ZUJ1ZmZlcjtcbndpbmRvd1snVENUZXgnXSA9IENyZWF0ZVRleHR1cmU7XG5cbmZ1bmN0aW9uIFRpbnlDYW52YXMoY2FudmFzKSB7XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyksXG4gICAgICAgIFZFUlRFWF9TSVpFID0gKDQgKiAyKSArICg0ICogMikgKyAoNCksXG4gICAgICAgIE1BWF9CQVRDSCA9IDEwOTIyLCAvLyBmbG9vcigoMiBeIDE2KSAvIDYpXG4gICAgICAgIE1BWF9TVEFDSyA9IDEwMCxcbiAgICAgICAgTUFUX1NJWkUgPSA2LFxuICAgICAgICBWRVJUSUNFU19QRVJfUVVBRCA9IDYsXG4gICAgICAgIE1BVF9TVEFDS19TSVpFID0gTUFYX1NUQUNLICogTUFUX1NJWkUsXG4gICAgICAgIFZFUlRFWF9EQVRBX1NJWkUgPSBWRVJURVhfU0laRSAqIE1BWF9CQVRDSCAqIDQsXG4gICAgICAgIElOREVYX0RBVEFfU0laRSA9IE1BWF9CQVRDSCAqICgyICogVkVSVElDRVNfUEVSX1FVQUQpLFxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodCxcbiAgICAgICAgc2hhZGVyID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbShcbiAgICAgICAgICAgIGdsLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IFBvc2l0aW9uIGFuZFxuICAgICAgICAgICAgICAgIC8vIElOIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlIHZlYzIgYSwgYjsnLFxuICAgICAgICAgICAgICAgIC8vIElOIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjNCBjOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgVmlldyBNYXRyaXhcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBtYXQ0IG07JyxcbiAgICAgICAgICAgICAgICAndW5pZm9ybSB2ZWMyIHI7JyxcbiAgICAgICAgICAgICAgICAndm9pZCBtYWluKCl7JyxcbiAgICAgICAgICAgICAgICAnZ2xfUG9zaXRpb249bSp2ZWM0KGEsMS4wLDEuMCk7JyxcbiAgICAgICAgICAgICAgICAnZD1iOycsXG4gICAgICAgICAgICAgICAgJ2U9YzsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKSwgW1xuICAgICAgICAgICAgICAgICdwcmVjaXNpb24gbG93cCBmbG9hdDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjMiBkOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzQgZTsnLFxuICAgICAgICAgICAgICAgIC8vIENPTlNUIFNpbmdsZSBTYW1wbGVyMkRcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgZjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9GcmFnQ29sb3I9dGV4dHVyZTJEKGYsZCkqZTsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKVxuICAgICAgICApLFxuICAgICAgICBnbEJ1ZmZlclN1YkRhdGEgPSBnbC5idWZmZXJTdWJEYXRhLmJpbmQoZ2wpLFxuICAgICAgICBnbERyYXdFbGVtZW50cyA9IGdsLmRyYXdFbGVtZW50cy5iaW5kKGdsKSxcbiAgICAgICAgZ2xCaW5kVGV4dHVyZSA9IGdsLmJpbmRUZXh0dXJlLmJpbmQoZ2wpLFxuICAgICAgICBnbENsZWFyID0gZ2wuY2xlYXIuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXJDb2xvciA9IGdsLmNsZWFyQ29sb3IuYmluZChnbCksXG4gICAgICAgIHZlcnRleERhdGEgPSBuZXcgQXJyYXlCdWZmZXIoVkVSVEVYX0RBVEFfU0laRSksXG4gICAgICAgIHZQb3NpdGlvbkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2Q29sb3JEYXRhID0gbmV3IFVpbnQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2SW5kZXhEYXRhID0gbmV3IFVpbnQxNkFycmF5KElOREVYX0RBVEFfU0laRSksXG4gICAgICAgIElCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjMsIHZJbmRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDQpLFxuICAgICAgICBWQk8gPSBDcmVhdGVCdWZmZXIoZ2wsIDM0OTYyLCB2ZXJ0ZXhEYXRhLmJ5dGVMZW5ndGgsIDM1MDQ4KSxcbiAgICAgICAgY291bnQgPSAwLFxuICAgICAgICBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAxLCAwLCAwXSksXG4gICAgICAgIHN0YWNrID0gbmV3IEZsb2F0MzJBcnJheSgxMDApLFxuICAgICAgICBzdGFja3AgPSAwLFxuICAgICAgICBjb3MgPSBNYXRoLmNvcyxcbiAgICAgICAgc2luID0gTWF0aC5zaW4sXG4gICAgICAgIGN1cnJlbnRUZXh0dXJlID0gbnVsbCxcbiAgICAgICAgcmVuZGVyZXIgPSBudWxsLFxuICAgICAgICBsb2NBLCBsb2NCLCBsb2NDO1xuXG4gICAgZ2wuYmxlbmRGdW5jKDc3MCwgNzcxKTtcbiAgICBnbC5lbmFibGUoMzA0Mik7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXIpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjMsIElCTyk7XG4gICAgZm9yICh2YXIgaW5kZXhBID0gaW5kZXhCID0gMDsgaW5kZXhBIDwgTUFYX0JBVENIICogVkVSVElDRVNfUEVSX1FVQUQ7IGluZGV4QSArPSBWRVJUSUNFU19QRVJfUVVBRCwgaW5kZXhCICs9IDQpXG4gICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMF0gPSBpbmRleEIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDFdID0gaW5kZXhCICsgMSxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMl0gPSBpbmRleEIgKyAyLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAzXSA9IGluZGV4QiArIDAsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDRdID0gaW5kZXhCICsgMyxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNV0gPSBpbmRleEIgKyAxO1xuXG4gICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYzLCAwLCB2SW5kZXhEYXRhKTtcbiAgICBnbC5iaW5kQnVmZmVyKDM0OTYyLCBWQk8pO1xuICAgIGxvY0EgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdhJyk7XG4gICAgbG9jQiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2InKTtcbiAgICBsb2NDID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0EpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQSwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0IpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQiwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDgpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0MpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQywgNCwgNTEyMSwgMSwgVkVSVEVYX1NJWkUsIDE2KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXIsICdtJyksIDAsXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgMiAvIHdpZHRoLCAwLCAwLCAwLFxuICAgICAgICAgICAgMCwgLTIgLyBoZWlnaHQsIDAsIDAsXG4gICAgICAgICAgICAwLCAwLCAxLCAxLCAtMSwgMSwgMCwgMFxuICAgICAgICBdKVxuICAgICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSgzMzk4NCk7XG4gICAgcmVuZGVyZXIgPSB7XG4gICAgICAgICdnJzogZ2wsXG4gICAgICAgICdjJzogY2FudmFzLFxuICAgICAgICAnY29sJzogMHhGRkZGRkZGRixcbiAgICAgICAgJ2JrZyc6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XG4gICAgICAgICAgICBnbENsZWFyQ29sb3IociwgZywgYiwgMSk7XG4gICAgICAgIH0sXG4gICAgICAgICdjbHMnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbENsZWFyKDE2Mzg0KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3RyYW5zJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFs0XSA9IG1hdFswXSAqIHggKyBtYXRbMl0gKiB5ICsgbWF0WzRdO1xuICAgICAgICAgICAgbWF0WzVdID0gbWF0WzFdICogeCArIG1hdFszXSAqIHkgKyBtYXRbNV07XG4gICAgICAgIH0sXG4gICAgICAgICdzY2FsZSc6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBtYXRbMF0gPSBtYXRbMF0gKiB4O1xuICAgICAgICAgICAgbWF0WzFdID0gbWF0WzFdICogeDtcbiAgICAgICAgICAgIG1hdFsyXSA9IG1hdFsyXSAqIHk7XG4gICAgICAgICAgICBtYXRbM10gPSBtYXRbM10gKiB5O1xuICAgICAgICB9LFxuICAgICAgICAncm90JzogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHZhciBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIHNyID0gc2luKHIpLFxuICAgICAgICAgICAgICAgIGNyID0gY29zKHIpO1xuXG4gICAgICAgICAgICBtYXRbMF0gPSBhICogY3IgKyBjICogc3I7XG4gICAgICAgICAgICBtYXRbMV0gPSBiICogY3IgKyBkICogc3I7XG4gICAgICAgICAgICBtYXRbMl0gPSBhICogLXNyICsgYyAqIGNyO1xuICAgICAgICAgICAgbWF0WzNdID0gYiAqIC1zciArIGQgKiBjcjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAwXSA9IG1hdFswXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDFdID0gbWF0WzFdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMl0gPSBtYXRbMl07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAzXSA9IG1hdFszXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDRdID0gbWF0WzRdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNV0gPSBtYXRbNV07XG4gICAgICAgICAgICBzdGFja3AgKz0gNjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3BvcCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrcCAtPSA2O1xuICAgICAgICAgICAgbWF0WzBdID0gc3RhY2tbc3RhY2twICsgMF07XG4gICAgICAgICAgICBtYXRbMV0gPSBzdGFja1tzdGFja3AgKyAxXTtcbiAgICAgICAgICAgIG1hdFsyXSA9IHN0YWNrW3N0YWNrcCArIDJdO1xuICAgICAgICAgICAgbWF0WzNdID0gc3RhY2tbc3RhY2twICsgM107XG4gICAgICAgICAgICBtYXRbNF0gPSBzdGFja1tzdGFja3AgKyA0XTtcbiAgICAgICAgICAgIG1hdFs1XSA9IHN0YWNrW3N0YWNrcCArIDVdO1xuICAgICAgICB9LFxuICAgICAgICAnaW1nJzogZnVuY3Rpb24gKHRleHR1cmUsIHgsIHksIHcsIGgsIHUwLCB2MCwgdTEsIHYxKSB7XG4gICAgICAgICAgICB2YXIgeDAgPSB4LFxuICAgICAgICAgICAgICAgIHkwID0geSxcbiAgICAgICAgICAgICAgICB4MSA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkxID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDIgPSB4LFxuICAgICAgICAgICAgICAgIHkyID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDMgPSB4ICsgdyxcbiAgICAgICAgICAgICAgICB5MyA9IHksXG4gICAgICAgICAgICAgICAgYSA9IG1hdFswXSxcbiAgICAgICAgICAgICAgICBiID0gbWF0WzFdLFxuICAgICAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgICAgICBlID0gbWF0WzRdLFxuICAgICAgICAgICAgICAgIGYgPSBtYXRbNV0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgICAgICAgICBhcmdiID0gcmVuZGVyZXJbJ2NvbCddO1xuXG4gICAgICAgICAgICBpZiAodGV4dHVyZSAhPSBjdXJyZW50VGV4dHVyZSB8fFxuICAgICAgICAgICAgICAgIGNvdW50ICsgMSA+PSBNQVhfQkFUQ0gpIHtcbiAgICAgICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZlcnRleERhdGEpO1xuICAgICAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRleHR1cmUgIT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgICAgIGdsQmluZFRleHR1cmUoMzU1MywgY3VycmVudFRleHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2Zmc2V0ID0gY291bnQgKiBWRVJURVhfU0laRTtcbiAgICAgICAgICAgIC8vIFZlcnRleCBPcmRlclxuICAgICAgICAgICAgLy8gVmVydGV4IFBvc2l0aW9uIHwgVVYgfCBBUkdCXG4gICAgICAgICAgICAvLyBWZXJ0ZXggMVxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGEgKyB5MCAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGIgKyB5MCAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCAyXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYSArIHkxICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYiArIHkxICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MTtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDNcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBhICsgeTIgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBiICsgeTIgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTA7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggNFxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGEgKyB5MyAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGIgKyB5MyAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIGlmICgrK2NvdW50ID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnZmx1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2UG9zaXRpb25EYXRhLnN1YmFycmF5KDAsIGNvdW50ICogVkVSVEVYX1NJWkUpKTtcbiAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG59XG53aW5kb3dbJ1RDJ10gPSBUaW55Q2FudmFzOyJdLCJzb3VyY2VSb290IjoiIn0=