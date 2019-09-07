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
var Dir;
(function (Dir) {
    Dir[Dir["Left"] = 0] = "Left";
    Dir[Dir["Right"] = 1] = "Right";
})(Dir || (Dir = {}));
var EventType;
(function (EventType) {
    EventType[EventType["RightPressed"] = 0] = "RightPressed";
    EventType[EventType["LeftReleased"] = 1] = "LeftReleased";
    EventType[EventType["RightReleased"] = 2] = "RightReleased";
    EventType[EventType["LeftPressed"] = 3] = "LeftPressed";
    EventType[EventType["JumpPressed"] = 4] = "JumpPressed";
    EventType[EventType["UsePressed"] = 5] = "UsePressed";
    EventType[EventType["AttackPressed"] = 6] = "AttackPressed";
    EventType[EventType["AttackReleased"] = 7] = "AttackReleased";
})(EventType || (EventType = {}));
var canvas = TC(document.getElementById('c'));
function getAABB(b) {
    return {
        lt: { x: b.position.x, y: b.position.y },
        rt: { x: b.position.x + b.width, y: b.position.y },
        rb: { x: b.position.x + b.width, y: b.position.y + b.height },
        lb: { x: b.position.x, y: b.position.y + b.height }
    };
}
function getTileIndeces(v) {
    return Math.floor(v.y / 20 /* tileSize */) * 50 /* worldSize */ + Math.floor(v.x / 20);
}
function collide(body1, body2) {
    const result = body1.position.x < (body2.position.x + body2.width) &&
        body1.position.x + (body1.width) > body2.position.x &&
        body1.position.y < body2.position.y + body2.height &&
        body1.position.y + body1.height > body2.position.y;
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
                    width: img.width,
                    height: img.height,
                    text: TCTex(canvas.g, g.canvas, img.width, img.height)
                };
                g.clearRect(0, 0, img.width, img.height);
                g.save();
                g.scale(-1, 1);
                g.drawImage(img, img.width * -1, 0, img.width, img.height);
                g.restore();
                const tex2 = {
                    width: img.width,
                    height: img.height,
                    text: TCTex(canvas.g, g.canvas, img.width, img.height)
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
loadTextures(["mountain.png", "floor.png", "soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
    const [rMountain, lMountain, rightFloor, leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures;
    let currentDelta = 0.0;
    let currentTime = 0.0;
    let currentAction = null;
    const GRAVITY = 10;
    const JUMP_VEL = 30;
    const WALK_SPEED = 6;
    let startTime = 0;
    let id = 0;
    const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height];
    function textureFromPixelArray(gl, dataArray, type, width, height) {
        var dataTypedArray = new Uint8Array(dataArray); // Don't need to do this if the data is already in a typed array
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, type, width, height, 0, type, gl.UNSIGNED_BYTE, dataTypedArray);
        // Other texture setup here, like filter modes and mipmap generation
        return texture;
    }
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
            bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: false, dir: Dir.Left, width: 4, height: 4 });
        }
        return bs;
    }
    function newEnemy(x, y, vel) {
        return {
            position: { x: x, y: y },
            velocity: { x: vel, y: 0.0 },
            dir: Dir.Left,
            width: 20,
            height: 20,
            visible: true
        };
    }
    canvas.g.canvas.addEventListener("click", (event) => {
        const pos = getMousePos(canvas.g.canvas, event);
        console.log(pos);
        //   const vel = WALK_SPEED * (Math.random() * (3 - 1) + 1)/2 
        //  window["state"].enemies.push(newEnemy(pos.x,pos.y, vel))
    });
    let currentState = {
        player: {
            position: { x: 128, y: 0.0 },
            velocity: { x: 0.0, y: 0.0 },
            dir: Dir.Right,
            shooting: false,
            width: 20,
            height: 20,
            visible: true
        },
        enemies: [newEnemy(34, 24, WALK_SPEED)],
        bullets: initBullets(10)
    };
    const FLOOR = height - 10;
    const SECOND_FLOOR = FLOOR / 2;
    const secondFloorBody = { position: { x: 0.0, y: SECOND_FLOOR }, width: 60, height: 20, dir: Dir.Left, velocity: { x: 0, y: 0 }, visible: true };
    window["state"] = currentState;
    const keepAnimation = (time) => {
        currentDelta = (time - startTime) / 100;
        currentTime = time;
        startTime = time;
        update(currentAction, currentState);
        render(currentState);
        currentAction = null;
        id = requestAnimationFrame(keepAnimation);
    };
    function runGame() {
        requestAnimationFrame(keepAnimation);
    }
    const handlerStart = (ev) => {
        switch (ev.currentTarget['id']) {
            case "a":
                currentAction = EventType.JumpPressed;
                break;
            case "b":
                currentAction = EventType.AttackPressed;
                break;
            case "left":
                currentAction = EventType.LeftPressed;
                break;
            case "right":
                currentAction = EventType.RightPressed;
                break;
            default:
                // code...
                break;
        }
    };
    const handlerEnd = (ev) => {
        switch (ev.currentTarget['id']) {
            case "b":
                currentAction = EventType.AttackReleased;
                break;
            case "left":
                currentAction = EventType.LeftReleased;
                break;
            case "right":
                currentAction = EventType.RightReleased;
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
    /*   svgs.forEach(rec => {
        rec.removeEventListener("touchstart", handlerStart, psOp);
        rec.removeEventListener("touchend", handlerEnd, psOp);
      }) */
    const handlerKBDown = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LeftPressed;
                break;
            case 39:
                currentAction = EventType.RightPressed;
                break;
            case 38:
                currentAction = EventType.JumpPressed;
                break;
            case 13:
                currentAction = EventType.UsePressed;
                break;
            case 32:
                currentAction = EventType.AttackPressed;
                break;
            default:
                break;
        }
    };
    window.addEventListener('keydown', handlerKBDown, true);
    const handlerKBUp = (e) => {
        switch (e.keyCode) {
            case 37:
                currentAction = EventType.LeftReleased;
                break;
            case 39:
                currentAction = EventType.RightReleased;
                break;
            case 32:
                currentAction = EventType.AttackReleased;
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
            let text = p.dir == Dir.Right ? rightT : leftT;
            canvas.img(text.text, p.position.x + (p.width / 2), p.position.y, p.width, p.height, v0, u0, v1, u1);
        };
    }
    function isOverFloor(b) {
        return b.position.y + b.height == FLOOR || collideFloorBottom(b, secondFloorBody);
    }
    const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]]);
    const ShootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]]);
    let gunReady = 0;
    let jumpTries = 2;
    function update(a, m) {
        const p = m.player;
        if (isOverFloor(p)) {
            jumpTries = 2;
        }
        switch (a) {
            case EventType.JumpPressed:
                if (jumpTries > 0) {
                    jumpTries--;
                    p.velocity.y = -JUMP_VEL;
                    jumpSound();
                }
                p.shooting = false;
                break;
            case EventType.LeftPressed:
                p.dir = Dir.Left;
                p.velocity.x = -WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.RightPressed:
                p.dir = Dir.Right;
                p.velocity.x = WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.LeftReleased:
                p.velocity.x = 0;
                break;
            case EventType.RightReleased:
                p.velocity.x = 0;
                break;
            case EventType.AttackPressed:
                ShootingAnim.reset();
                p.shooting = true;
                p.velocity.x = (p.dir == Dir.Left ? 1.5 : -1.5);
                for (var i = 0; i < m.bullets.length; i++) {
                    const b = m.bullets[i];
                    if (!b.visible && gunReady == 0) {
                        b.position.x = p.position.x + p.width + b.width;
                        b.position.y = p.position.y + (p.height / 2.4);
                        b.velocity.x = p.dir == Dir.Right ? 35 : -35;
                        b.visible = true;
                        gunReady = 12;
                        fireSound();
                        break;
                    }
                }
                break;
            case EventType.AttackReleased:
                p.velocity.x = 0;
                //p.shooting = false
                //ShootingAnim.reset()
                break;
            default:
                break;
        }
        move(m.player);
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            move(e);
            if (e.position.x < 0 || (e.position.x + 20 > width)) {
                e.velocity.x = e.velocity.x * -1;
                e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right;
            }
            m.bullets.filter(b => b.visible).forEach(b => {
                if (collide(b, e)) {
                    hitSound();
                    e.velocity.x = -WALK_SPEED;
                    e.position.x = width - e.width;
                    e.position.y = 120;
                    e.dir = Dir.Right;
                    b.visible = false;
                    b.velocity.x = 0;
                }
            });
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            moveBullet(b);
        }
        gunReady = Math.max(0, gunReady - 1);
    }
    //canvas.scale(4, 4)
    let texDataFloor = [];
    for (var i = 0; i < 20 * 20 * 4; i++) {
        texDataFloor[i] = 1.0;
    }
    const floorTex = textureFromPixelArray(canvas.g, texDataFloor, canvas.g.RGBA, 20, 20);
    function renderMountain() {
        canvas.push();
        canvas.scale(6, 6);
        for (var x = 0; x < 100; x += 20) {
            canvas.img(lMountain.text, x, 5, lMountain.width, lMountain.height, 0, 0, 1, 1);
        }
        canvas.pop();
    }
    function renderFloor() {
        for (var x = secondFloorBody.position.x; x <= secondFloorBody.position.x + secondFloorBody.width; x += 20) {
            const text = x % 7 == 0 ? leftFloor : rightFloor;
            canvas.img(text.text, x, secondFloorBody.position.y, text.width, text.height, 0, 0, 1, 1);
        }
        for (var x = 0; x < 300; x += 20) {
            const text = x % 7 == 0 ? leftFloor : rightFloor;
            canvas.img(text.text, x, FLOOR - 10, text.width, text.height, 0, 0, 1, 1);
        }
    }
    function isNotOnFloor(b) {
        return b.position.y + b.height < FLOOR;
    }
    function applyGravity(b) {
        b.velocity.y = isNotOnFloor(b) && !collideFloorBottom(b, secondFloorBody) ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y;
    }
    function outsideScreen(b) {
        return b.position.x < 0 || b.position.x > width;
    }
    function moveBullet(b) {
        if (outsideScreen(b)) {
            b.visible = false;
            b.velocity.x = 0;
        }
        b.position.x += b.velocity.x * currentDelta;
    }
    function collideFloorTop(b, f) {
        return collide(b, f) &&
            f.position.y + f.height > b.position.y;
    }
    function collideFloorBottom(b, f) {
        return collide(b, f) &&
            b.position.y < f.position.y;
    }
    function playerCollideLeft(b) {
        return collide(b, secondFloorBody) &&
            b.position.x < secondFloorBody.position.x + secondFloorBody.width;
    }
    function playerCollideRight(b) {
        return collide(b, secondFloorBody) &&
            b.position.x + b.width > secondFloorBody.position.x;
    }
    function move(b) {
        b.position.y = Math.min(b.position.y + (b.velocity.y * currentDelta), FLOOR - b.height);
        b.position.x += b.velocity.x * currentDelta;
        applyGravity(b);
        if (collideFloorTop(b, secondFloorBody)) {
            if (b.velocity.y < 0) {
                b.velocity.y = 0;
            }
        }
        if (collideFloorBottom(b, secondFloorBody)) {
            if (b.velocity.y > 0) {
                b.velocity.y = 0;
            }
        }
        /*     if(playerCollideLeft(b)){
              if(b.velocity.x < 0){
                b.velocity.x = 0
              }
            }
            if(playerCollideRight(b)){
              if(b.velocity.x > 0){
                b.velocity.x = 0
              }
            } */
    }
    const render = (m) => {
        canvas.g.canvas.style.width = "auto";
        canvas.g.canvas.style.height = Math.round(window.innerHeight * 0.95) + "px";
        canvas.g.viewport(0, 0, canvas.g.canvas.width, canvas.g.canvas.height);
        renderMountain();
        const p = m.player;
        canvas.cls();
        canvas.bkg(57 / 255, 73 / 255, 81 / 255);
        renderFloor();
        if (p.shooting) {
            ShootingAnim.update(p);
        }
        else if (p.velocity.x == 0) {
            idleAnim.update(p);
        }
        else {
            runAnim.update(p);
        }
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            botAnim.update(e);
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            if (b.visible) {
                canvas.img(floorTex, b.position.x, b.position.y, 4, 4, 0, 0, 1, 1);
            }
        }
        canvas.flush();
        fpsM.tick();
    };
    /*  */ if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const svgs = document.querySelectorAll("svg");
        svgs.forEach(svg => {
            svg.style.display = "block";
        });
        /*  */
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
  v.gain.setValueAtTime(0.1,ctx.currentTime)
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


window['fireSound'] = fireSound;
window['jumpSound'] = jumpSound;
window['hitSound'] = hitSound;





  
  

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKiFcbiAqIEZQU01ldGVyIDAuMy4xIC0gOXRoIE1heSAyMDEzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vRGFyc2Fpbi9mcHNtZXRlclxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuOyhmdW5jdGlvbiAodywgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBFbGVtZW50IHR5cGUgbmFtZS5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIG5ld0VsKG5hbWUpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGVtZSBDU1MgcHJvcGVydGllcyB0byBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IERPTSBlbGVtZW50LlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9ICB0aGVtZSAgIFRoZW1lIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIGFwcGx5VGhlbWUoZWxlbWVudCwgdGhlbWUpIHtcblx0XHRmb3IgKHZhciBuYW1lIGluIHRoZW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdGhlbWVbbmFtZV07XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0XHRyZXR1cm4gZWxlbWVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdHlwZSBvZiB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiB0eXBlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRcdHJldHVybiBTdHJpbmcodmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCkgfHwgJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiBhbiBhcnJheS5cblx0ICpcblx0ICogQHBhcmFtICB7TWl4ZWR9IHZhbHVlXG5cdCAqIEBwYXJhbSAge0FycmF5fSBhcnJheVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtJbnRlZ2VyfSBBcnJheSBpbmRleCBvciAtMSB3aGVuIG5vdCBmb3VuZC5cblx0ICovXG5cdGZ1bmN0aW9uIGluQXJyYXkodmFsdWUsIGFycmF5KSB7XG5cdFx0aWYgKHR5cGUoYXJyYXkpICE9PSAnYXJyYXknKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdGlmIChhcnJheS5pbmRleE9mKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogUG9vciBtYW4ncyBkZWVwIG9iamVjdCBleHRlbmQuXG5cdCAqXG5cdCAqIEV4YW1wbGU6XG5cdCAqICAgZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBleHRlbmQoKSB7XG5cdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZ3NbMV0pIHtcblx0XHRcdGlmIChhcmdzWzFdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlKGFyZ3NbMV1ba2V5XSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gZXh0ZW5kKHt9LCBhcmdzWzBdW2tleV0sIGFyZ3NbMV1ba2V5XSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2FycmF5Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XS5zbGljZSgwKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXJncy5sZW5ndGggPiAyID9cblx0XHRcdGV4dGVuZC5hcHBseShudWxsLCBbYXJnc1swXV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDIpKSkgOlxuXHRcdFx0YXJnc1swXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IEhTTCBjb2xvciB0byBIRVggc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtBcnJheX0gaHNsIEFycmF5IHdpdGggW2h1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzXS5cblx0ICpcblx0ICogQHJldHVybiB7QXJyYXl9IEFycmF5IHdpdGggW3JlZCwgZ3JlZW4sIGJsdWVdLlxuXHQgKi9cblx0ZnVuY3Rpb24gaHNsVG9IZXgoaCwgcywgbCkge1xuXHRcdHZhciByLCBnLCBiO1xuXHRcdHZhciB2LCBtaW4sIHN2LCBzZXh0YW50LCBmcmFjdCwgdnNmO1xuXG5cdFx0aWYgKGwgPD0gMC41KSB7XG5cdFx0XHR2ID0gbCAqICgxICsgcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYgPSBsICsgcyAtIGwgKiBzO1xuXHRcdH1cblxuXHRcdGlmICh2ID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gJyMwMDAnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtaW4gPSAyICogbCAtIHY7XG5cdFx0XHRzdiA9ICh2IC0gbWluKSAvIHY7XG5cdFx0XHRoID0gNiAqIGg7XG5cdFx0XHRzZXh0YW50ID0gTWF0aC5mbG9vcihoKTtcblx0XHRcdGZyYWN0ID0gaCAtIHNleHRhbnQ7XG5cdFx0XHR2c2YgPSB2ICogc3YgKiBmcmFjdDtcblx0XHRcdGlmIChzZXh0YW50ID09PSAwIHx8IHNleHRhbnQgPT09IDYpIHtcblx0XHRcdFx0ciA9IHY7XG5cdFx0XHRcdGcgPSBtaW4gKyB2c2Y7XG5cdFx0XHRcdGIgPSBtaW47XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDEpIHtcblx0XHRcdFx0ciA9IHYgLSB2c2Y7XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAyKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluICsgdnNmO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAzKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2IC0gdnNmO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gNCkge1xuXHRcdFx0XHRyID0gbWluICsgdnNmO1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdiAtIHZzZjtcblx0XHRcdH1cblx0XHRcdHJldHVybiAnIycgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiBmb3IgaHNsVG9IZXguXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG5cdFx0YyA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xuXHRcdHJldHVybiBjLmxlbmd0aCA9PT0gMSA/ICcwJyArIGMgOiBjO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hbmFnZSBlbGVtZW50IGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHBhcmFtICB7Tm9kZX0gICAgIGVsZW1lbnRcblx0ICogQHBhcmFtICB7RXZlbnR9ICAgIGV2ZW50TmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtCb29sfSAgICAgcmVtb3ZlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIsIHJlbW92ZSkge1xuXHRcdGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2FkZEV2ZW50TGlzdGVuZXInXShldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHR9IGVsc2UgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ2RldGFjaEV2ZW50JyA6ICdhdHRhY2hFdmVudCddKCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFByZWZlcnJlZCB0aW1pbmcgZnVudGlvblxuXHR2YXIgZ2V0VGltZTtcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGVyZiA9IHcucGVyZm9ybWFuY2U7XG5cdFx0aWYgKHBlcmYgJiYgKHBlcmYubm93IHx8IHBlcmYud2Via2l0Tm93KSkge1xuXHRcdFx0dmFyIHBlcmZOb3cgPSBwZXJmLm5vdyA/ICdub3cnIDogJ3dlYmtpdE5vdyc7XG5cdFx0XHRnZXRUaW1lID0gcGVyZltwZXJmTm93XS5iaW5kKHBlcmYpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRnZXRUaW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gK25ldyBEYXRlKCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBMb2NhbCBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIHBvbHlmaWxsXG5cdHZhciBjQUYgPSB3LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHcuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHR2YXIgckFGID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnLCAnbyddO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cblx0XHQvLyBGb3IgYSBtb3JlIGFjY3VyYXRlIFdpbmRvd0FuaW1hdGlvblRpbWluZyBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb24sIGRpdGNoIHRoZSBuYXRpdmVcblx0XHQvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hlbiBjYW5jZWxBbmltYXRpb25GcmFtZSBpcyBub3QgcHJlc2VudCAob2xkZXIgdmVyc2lvbnMgb2YgRmlyZWZveClcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHZlbmRvcnMubGVuZ3RoOyBpIDwgbCAmJiAhY0FGOyArK2kpIHtcblx0XHRcdGNBRiA9IHdbdmVuZG9yc1tpXSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3W3ZlbmRvcnNbaV0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdFx0ckFGID0gY0FGICYmIHdbdmVuZG9yc1tpXSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0fVxuXG5cdFx0aWYgKCFjQUYpIHtcblx0XHRcdHJBRiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgY3VyclRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHRcdHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuXHRcdFx0XHRsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcblx0XHRcdFx0cmV0dXJuIHcuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xuXHRcdFx0fTtcblxuXHRcdFx0Y0FGID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChpZCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBQcm9wZXJ0eSBuYW1lIGZvciBhc3NpZ25pbmcgZWxlbWVudCB0ZXh0IGNvbnRlbnRcblx0dmFyIHRleHRQcm9wID0gdHlwZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS50ZXh0Q29udGVudCkgPT09ICdzdHJpbmcnID8gJ3RleHRDb250ZW50JyA6ICdpbm5lclRleHQnO1xuXG5cdC8qKlxuXHQgKiBGUFNNZXRlciBjbGFzcy5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBhbmNob3IgIEVsZW1lbnQgdG8gYXBwZW5kIHRoZSBtZXRlciB0by4gRGVmYXVsdCBpcyBkb2N1bWVudC5ib2R5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gIG9wdGlvbnMgT2JqZWN0IHdpdGggb3B0aW9ucy5cblx0ICovXG5cdGZ1bmN0aW9uIEZQU01ldGVyKGFuY2hvciwgb3B0aW9ucykge1xuXHRcdC8vIE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdGlmICh0eXBlKGFuY2hvcikgPT09ICdvYmplY3QnICYmIGFuY2hvci5ub2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRvcHRpb25zID0gYW5jaG9yO1xuXHRcdFx0YW5jaG9yID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCFhbmNob3IpIHtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBvID0gZXh0ZW5kKHt9LCBGUFNNZXRlci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHR2YXIgZWwgPSB7fTtcblx0XHR2YXIgY29scyA9IFtdO1xuXHRcdHZhciB0aGVtZSwgaGVhdG1hcHM7XG5cdFx0dmFyIGhlYXREZXB0aCA9IDEwMDtcblx0XHR2YXIgaGVhdGluZyA9IFtdO1xuXG5cdFx0dmFyIHRoaXNGcmFtZVRpbWUgPSAwO1xuXHRcdHZhciBmcmFtZVRpbWUgPSBvLnRocmVzaG9sZDtcblx0XHR2YXIgZnJhbWVTdGFydCA9IDA7XG5cdFx0dmFyIGxhc3RMb29wID0gZ2V0VGltZSgpIC0gZnJhbWVUaW1lO1xuXHRcdHZhciB0aW1lO1xuXG5cdFx0dmFyIGZwc0hpc3RvcnkgPSBbXTtcblx0XHR2YXIgZHVyYXRpb25IaXN0b3J5ID0gW107XG5cblx0XHR2YXIgZnJhbWVJRCwgcmVuZGVySUQ7XG5cdFx0dmFyIHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXHRcdHZhciBncmFwaEhlaWdodCwgY291bnQsIGksIGo7XG5cblx0XHQvLyBFeHBvc2VkIHByb3BlcnRpZXNcblx0XHRzZWxmLm9wdGlvbnMgPSBvO1xuXHRcdHNlbGYuZnBzID0gMDtcblx0XHRzZWxmLmR1cmF0aW9uID0gMDtcblx0XHRzZWxmLmlzUGF1c2VkID0gMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRpY2sgc3RhcnQgZm9yIG1lYXN1cmluZyB0aGUgYWN0dWFsIHJlbmRlcmluZyBkdXJhdGlvbi5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmcmFtZVN0YXJ0ID0gZ2V0VGltZSgpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBGUFMgdGljay5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGltZSA9IGdldFRpbWUoKTtcblx0XHRcdHRoaXNGcmFtZVRpbWUgPSB0aW1lIC0gbGFzdExvb3A7XG5cdFx0XHRmcmFtZVRpbWUgKz0gKHRoaXNGcmFtZVRpbWUgLSBmcmFtZVRpbWUpIC8gby5zbW9vdGhpbmc7XG5cdFx0XHRzZWxmLmZwcyA9IDEwMDAgLyBmcmFtZVRpbWU7XG5cdFx0XHRzZWxmLmR1cmF0aW9uID0gZnJhbWVTdGFydCA8IGxhc3RMb29wID8gZnJhbWVUaW1lIDogdGltZSAtIGZyYW1lU3RhcnQ7XG5cdFx0XHRsYXN0TG9vcCA9IHRpbWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFBhdXNlIGRpc3BsYXkgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDE7XG5cdFx0XHRcdGNsZWFyVGltZW91dChmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKGZyYW1lSUQpO1xuXHRcdFx0XHRjQUYocmVuZGVySUQpO1xuXHRcdFx0XHRmcmFtZUlEID0gcmVuZGVySUQgPSAwO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3VtZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIWZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cdFx0XHRcdHJlcXVlc3RSZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBPcHRpb24gbmFtZS5cblx0XHQgKiBAcGFyYW0ge01peGVkfSAgdmFsdWUgTmV3IHZhbHVlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0b1tuYW1lXSA9IHZhbHVlO1xuXHRcdFx0c2hvd0ZwcyA9IG8uc2hvdyA9PT0gJ2Zwcyc7XG5cblx0XHRcdC8vIFJlYnVpbGQgb3IgcmVwb3NpdGlvbiBlbGVtZW50cyB3aGVuIHNwZWNpZmljIG9wdGlvbiBoYXMgYmVlbiB1cGRhdGVkXG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZWJ1aWxkZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbkFycmF5KG5hbWUsIHJlcG9zaXRpb25lcnMpICE9PSAtMSkge1xuXHRcdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gcmVuZGVyaW5nIGR1cmF0aW9uIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0R1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnbXMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgbWV0ZXIgaW50byBGUFMgbW9kZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93RnBzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVG9nZ2xlcyBiZXR3ZWVuIHNob3c6ICdmcHMnIGFuZCBzaG93OiAnZHVyYXRpb24nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93Jywgc2hvd0ZwcyA/ICdtcycgOiAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGlkZSB0aGUgRlBTTWV0ZXIuIEFsc28gcGF1c2VzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucGF1c2UoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNob3cgdGhlIEZQU01ldGVyLiBBbHNvIHJlc3VtZXMgdGhlIHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5yZXN1bWUoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGVjayB0aGUgY3VycmVudCBGUFMgYW5kIHNhdmUgaXQgaW4gaGlzdG9yeS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gaGlzdG9yeVRpY2soKSB7XG5cdFx0XHRmb3IgKGkgPSBvLmhpc3Rvcnk7IGktLTspIHtcblx0XHRcdFx0ZnBzSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmZwcyA6IGZwc0hpc3RvcnlbaS0xXTtcblx0XHRcdFx0ZHVyYXRpb25IaXN0b3J5W2ldID0gaSA9PT0gMCA/IHNlbGYuZHVyYXRpb24gOiBkdXJhdGlvbkhpc3RvcnlbaS0xXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGhlYXQgaGV4IGNvbG9yIGJhc2VkIG9uIHZhbHVlcyBwYXNzZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWF0bWFwXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gdmFsdWVcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtaW5cblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtYXhcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0SGVhdChoZWF0bWFwLCB2YWx1ZSwgbWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBoZWF0bWFwc1swfGhlYXRtYXBdW01hdGgucm91bmQoTWF0aC5taW4oKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pICogaGVhdERlcHRoLCBoZWF0RGVwdGgpKV07XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIGNvdW50ZXIgbnVtYmVyIGFuZCBsZWdlbmQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXIoKSB7XG5cdFx0XHQvLyBVcGRhdGUgbGVnZW5kIG9ubHkgd2hlbiBjaGFuZ2VkXG5cdFx0XHRpZiAoZWwubGVnZW5kLmZwcyAhPT0gc2hvd0Zwcykge1xuXHRcdFx0XHRlbC5sZWdlbmQuZnBzID0gc2hvd0Zwcztcblx0XHRcdFx0ZWwubGVnZW5kW3RleHRQcm9wXSA9IHNob3dGcHMgPyAnRlBTJyA6ICdtcyc7XG5cdFx0XHR9XG5cdFx0XHQvLyBVcGRhdGUgY291bnRlciB3aXRoIGEgbmljZWx5IGZvcm1hdGVkICYgcmVhZGFibGUgbnVtYmVyXG5cdFx0XHRjb3VudCA9IHNob3dGcHMgPyBzZWxmLmZwcyA6IHNlbGYuZHVyYXRpb247XG5cdFx0XHRlbC5jb3VudFt0ZXh0UHJvcF0gPSBjb3VudCA+IDk5OSA/ICc5OTkrJyA6IGNvdW50LnRvRml4ZWQoY291bnQgPiA5OSA/IDAgOiBvLmRlY2ltYWxzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZW5kZXIgY3VycmVudCBGUFMgc3RhdGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHQvLyBJZiByZW5kZXJlciBzdG9wcGVkIHJlcG9ydGluZywgZG8gYSBzaW11bGF0ZWQgZHJvcCB0byAwIGZwc1xuXHRcdFx0aWYgKGxhc3RMb29wIDwgdGltZSAtIG8udGhyZXNob2xkKSB7XG5cdFx0XHRcdHNlbGYuZnBzIC09IHNlbGYuZnBzIC8gTWF0aC5tYXgoMSwgby5zbW9vdGhpbmcgKiA2MCAvIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRzZWxmLmR1cmF0aW9uID0gMTAwMCAvIHNlbGYuZnBzO1xuXHRcdFx0fVxuXG5cdFx0XHRoaXN0b3J5VGljaygpO1xuXHRcdFx0dXBkYXRlQ291bnRlcigpO1xuXG5cdFx0XHQvLyBBcHBseSBoZWF0IHRvIGVsZW1lbnRzXG5cdFx0XHRpZiAoby5oZWF0KSB7XG5cdFx0XHRcdGlmIChoZWF0aW5nLmxlbmd0aCkge1xuXHRcdFx0XHRcdGZvciAoaSA9IGhlYXRpbmcubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdFx0XHRoZWF0aW5nW2ldLmVsLnN0eWxlW3RoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5mcHMsIDAsIG8ubWF4RnBzKSA6XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0bWFwLCBzZWxmLmR1cmF0aW9uLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGVsLmdyYXBoICYmIHRoZW1lLmNvbHVtbi5oZWF0T24pIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBjb2xzLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0Y29sc1tpXS5zdHlsZVt0aGVtZS5jb2x1bW4uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBmcHNIaXN0b3J5W2ldLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBkdXJhdGlvbkhpc3RvcnlbaV0sIG8udGhyZXNob2xkLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIGdyYXBoIGNvbHVtbnMgaGVpZ2h0XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG8uaGlzdG9yeTsgaisrKSB7XG5cdFx0XHRcdFx0Y29sc1tqXS5zdHlsZS5oZWlnaHQgPSAoc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHQoZnBzSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLm1heEZwcyAqIE1hdGgubWluKGZwc0hpc3Rvcnlbal0sIG8ubWF4RnBzKSkgOiAwKSA6XG5cdFx0XHRcdFx0XHQoZHVyYXRpb25IaXN0b3J5W2pdID8gTWF0aC5yb3VuZChncmFwaEhlaWdodCAvIG8udGhyZXNob2xkICogTWF0aC5taW4oZHVyYXRpb25IaXN0b3J5W2pdLCBvLnRocmVzaG9sZCkpIDogMClcblx0XHRcdFx0XHQpICsgJ3B4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlcXVlc3QgcmVuZGVyaW5nIGxvb3AuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnR9IEFuaW1hdGlvbiBmcmFtZSBpbmRleC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZXF1ZXN0UmVuZGVyKCkge1xuXHRcdFx0aWYgKG8uaW50ZXJ2YWwgPCAyMCkge1xuXHRcdFx0XHRmcmFtZUlEID0gckFGKHJlcXVlc3RSZW5kZXIpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZyYW1lSUQgPSBzZXRUaW1lb3V0KHJlcXVlc3RSZW5kZXIsIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRyZW5kZXJJRCA9IHJBRihyZW5kZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIE1ldGVyIGV2ZW50cyBoYW5kbGVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBldmVudEhhbmRsZXIoZXZlbnQpIHtcblx0XHRcdGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuXHRcdFx0aWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0ZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHNlbGYudG9nZ2xlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFN0b3AgcmVuZGVyaW5nXG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHQvLyBSZW1vdmUgZWxlbWVudHNcblx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHQvLyBTdG9wIGxpc3RlbmluZ1xuXHRcdFx0c2VsZi50aWNrID0gc2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbW92ZU1ldGVyKCkge1xuXHRcdFx0Ly8gVW5iaW5kIGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIsIDEpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGV0YWNoIGVsZW1lbnRcblx0XHRcdGFuY2hvci5yZW1vdmVDaGlsZChlbC5jb250YWluZXIpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNldHMgdGhlIHRoZW1lLCBhbmQgZ2VuZXJhdGVzIGhlYXRtYXBzIHdoZW4gbmVlZGVkLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHNldFRoZW1lKCkge1xuXHRcdFx0dGhlbWUgPSBGUFNNZXRlci50aGVtZVtvLnRoZW1lXTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgaGVhdG1hcHNcblx0XHRcdGhlYXRtYXBzID0gdGhlbWUuY29tcGlsZWRIZWF0bWFwcyB8fCBbXTtcblx0XHRcdGlmICghaGVhdG1hcHMubGVuZ3RoICYmIHRoZW1lLmhlYXRtYXBzLmxlbmd0aCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhlbWUuaGVhdG1hcHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRoZWF0bWFwc1tqXSA9IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gaGVhdERlcHRoOyBpKyspIHtcblx0XHRcdFx0XHRcdGhlYXRtYXBzW2pdW2ldID0gaHNsVG9IZXgoMC4zMyAvIGhlYXREZXB0aCAqIGksIHRoZW1lLmhlYXRtYXBzW2pdLnNhdHVyYXRpb24sIHRoZW1lLmhlYXRtYXBzW2pdLmxpZ2h0bmVzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgPSBoZWF0bWFwcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0aGUgbWV0ZXIgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gY3JlYXRlTWV0ZXIoKSB7XG5cdFx0XHQvLyBSZW1vdmUgb2xkIG1ldGVyIGlmIHByZXNlbnRcblx0XHRcdGlmIChlbC5jb250YWluZXIpIHtcblx0XHRcdFx0cmVtb3ZlTWV0ZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZW1lXG5cdFx0XHRzZXRUaGVtZSgpO1xuXG5cdFx0XHQvLyBDcmVhdGUgZWxlbWVudHNcblx0XHRcdGVsLmNvbnRhaW5lciA9IGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb250YWluZXIpO1xuXHRcdFx0ZWwuY291bnQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvdW50KSk7XG5cdFx0XHRlbC5sZWdlbmQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmxlZ2VuZCkpO1xuXHRcdFx0ZWwuZ3JhcGggPSBvLmdyYXBoID8gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5ncmFwaCkpIDogMDtcblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIGhlYXRpbmcgYXJyYXlcblx0XHRcdGhlYXRpbmcubGVuZ3RoID0gMDtcblx0XHRcdGZvciAodmFyIGtleSBpbiBlbCkge1xuXHRcdFx0XHRpZiAoZWxba2V5XSAmJiB0aGVtZVtrZXldLmhlYXRPbikge1xuXHRcdFx0XHRcdGhlYXRpbmcucHVzaCh7XG5cdFx0XHRcdFx0XHRuYW1lOiBrZXksXG5cdFx0XHRcdFx0XHRlbDogZWxba2V5XVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdyYXBoXG5cdFx0XHRjb2xzLmxlbmd0aCA9IDA7XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGdyYXBoXG5cdFx0XHRcdGVsLmdyYXBoLnN0eWxlLndpZHRoID0gKG8uaGlzdG9yeSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIChvLmhpc3RvcnkgLSAxKSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cblx0XHRcdFx0Ly8gQWRkIGNvbHVtbnNcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG8uaGlzdG9yeTsgaSsrKSB7XG5cdFx0XHRcdFx0Y29sc1tpXSA9IGVsLmdyYXBoLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb2x1bW4pKTtcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLmJvdHRvbSA9IDA7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5yaWdodCA9IChpICogdGhlbWUuY29sdW1uLndpZHRoICsgaSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS53aWR0aCA9IHRoZW1lLmNvbHVtbi53aWR0aCArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5oZWlnaHQgPSAnMHB4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGVcblx0XHRcdHBvc2l0aW9uTWV0ZXIoKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwZW5kIGNvbnRhaW5lciB0byBhbmNob3Jcblx0XHRcdGFuY2hvci5hcHBlbmRDaGlsZChlbC5jb250YWluZXIpO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSBncmFwaCBoZWlnaHQgYWZ0ZXIgaXQgd2FzIGFwcGVuZGVkIHRvIERPTVxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGdyYXBoSGVpZ2h0ID0gZWwuZ3JhcGguY2xpZW50SGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0XHRpZiAoby50b2dnbGVPbikge1xuXHRcdFx0XHRpZiAoby50b2dnbGVPbiA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFBvc2l0aW9ucyB0aGUgbWV0ZXIgYmFzZWQgb24gb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcG9zaXRpb25NZXRlcigpIHtcblx0XHRcdGFwcGx5VGhlbWUoZWwuY29udGFpbmVyLCBvKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDb25zdHJ1Y3QuXG5cdFx0ICovXG5cdFx0KGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIENyZWF0ZSBtZXRlciBlbGVtZW50XG5cdFx0XHRjcmVhdGVNZXRlcigpO1xuXHRcdFx0Ly8gU3RhcnQgcmVuZGVyaW5nXG5cdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0fSgpKTtcblx0fVxuXG5cdC8vIEV4cG9zZSB0aGUgZXh0ZW5kIGZ1bmN0aW9uXG5cdEZQU01ldGVyLmV4dGVuZCA9IGV4dGVuZDtcblxuXHQvLyBFeHBvc2UgdGhlIEZQU01ldGVyIGNsYXNzXG5cdHdpbmRvdy5GUFNNZXRlciA9IEZQU01ldGVyO1xuXG5cdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRGUFNNZXRlci5kZWZhdWx0cyA9IHtcblx0XHRpbnRlcnZhbDogIDEwMCwgICAgIC8vIFVwZGF0ZSBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG5cdFx0c21vb3RoaW5nOiAxMCwgICAgICAvLyBTcGlrZSBzbW9vdGhpbmcgc3RyZW5ndGguIDEgbWVhbnMgbm8gc21vb3RoaW5nLlxuXHRcdHNob3c6ICAgICAgJ2ZwcycsICAgLy8gV2hldGhlciB0byBzaG93ICdmcHMnLCBvciAnbXMnID0gZnJhbWUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHRvZ2dsZU9uOiAgJ2NsaWNrJywgLy8gVG9nZ2xlIGJldHdlZW4gc2hvdyAnZnBzJyBhbmQgJ21zJyBvbiB0aGlzIGV2ZW50LlxuXHRcdGRlY2ltYWxzOiAgMSwgICAgICAgLy8gTnVtYmVyIG9mIGRlY2ltYWxzIGluIEZQUyBudW1iZXIuIDEgPSA1OS45LCAyID0gNTkuOTQsIC4uLlxuXHRcdG1heEZwczogICAgNjAsICAgICAgLy8gTWF4IGV4cGVjdGVkIEZQUyB2YWx1ZS5cblx0XHR0aHJlc2hvbGQ6IDEwMCwgICAgIC8vIE1pbmltYWwgdGljayByZXBvcnRpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXG5cdFx0Ly8gTWV0ZXIgcG9zaXRpb25cblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJywgLy8gTWV0ZXIgcG9zaXRpb24uXG5cdFx0ekluZGV4OiAgIDEwLCAgICAgICAgIC8vIE1ldGVyIFogaW5kZXguXG5cdFx0bGVmdDogICAgICc1cHgnLCAgICAgIC8vIE1ldGVyIGxlZnQgb2Zmc2V0LlxuXHRcdHRvcDogICAgICAnNXB4JywgICAgICAvLyBNZXRlciB0b3Agb2Zmc2V0LlxuXHRcdHJpZ2h0OiAgICAnYXV0bycsICAgICAvLyBNZXRlciByaWdodCBvZmZzZXQuXG5cdFx0Ym90dG9tOiAgICdhdXRvJywgICAgIC8vIE1ldGVyIGJvdHRvbSBvZmZzZXQuXG5cdFx0bWFyZ2luOiAgICcwIDAgMCAwJywgIC8vIE1ldGVyIG1hcmdpbi4gSGVscHMgd2l0aCBjZW50ZXJpbmcgdGhlIGNvdW50ZXIgd2hlbiBsZWZ0OiA1MCU7XG5cblx0XHQvLyBUaGVtZVxuXHRcdHRoZW1lOiAnZGFyaycsIC8vIE1ldGVyIHRoZW1lLiBCdWlsZCBpbjogJ2RhcmsnLCAnbGlnaHQnLCAndHJhbnNwYXJlbnQnLCAnY29sb3JmdWwnLlxuXHRcdGhlYXQ6ICAwLCAgICAgIC8vIEFsbG93IHRoZW1lcyB0byB1c2UgY29sb3JpbmcgYnkgRlBTIGhlYXQuIDAgRlBTID0gcmVkLCBtYXhGcHMgPSBncmVlbi5cblxuXHRcdC8vIEdyYXBoXG5cdFx0Z3JhcGg6ICAgMCwgLy8gV2hldGhlciB0byBzaG93IGhpc3RvcnkgZ3JhcGguXG5cdFx0aGlzdG9yeTogMjAgLy8gSG93IG1hbnkgaGlzdG9yeSBzdGF0ZXMgdG8gc2hvdyBpbiBhIGdyYXBoLlxuXHR9O1xuXG5cdC8vIE9wdGlvbiBuYW1lcyB0aGF0IHRyaWdnZXIgRlBTTWV0ZXIgcmVidWlsZCBvciByZXBvc2l0aW9uIHdoZW4gbW9kaWZpZWRcblx0dmFyIHJlYnVpbGRlcnMgPSBbXG5cdFx0J3RvZ2dsZU9uJyxcblx0XHQndGhlbWUnLFxuXHRcdCdoZWF0Jyxcblx0XHQnZ3JhcGgnLFxuXHRcdCdoaXN0b3J5J1xuXHRdO1xuXHR2YXIgcmVwb3NpdGlvbmVycyA9IFtcblx0XHQncG9zaXRpb24nLFxuXHRcdCd6SW5kZXgnLFxuXHRcdCdsZWZ0Jyxcblx0XHQndG9wJyxcblx0XHQncmlnaHQnLFxuXHRcdCdib3R0b20nLFxuXHRcdCdtYXJnaW4nXG5cdF07XG59KHdpbmRvdykpO1xuOyhmdW5jdGlvbiAodywgRlBTTWV0ZXIsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gVGhlbWVzIG9iamVjdFxuXHRGUFNNZXRlci50aGVtZSA9IHt9O1xuXG5cdC8vIEJhc2UgdGhlbWUgd2l0aCBsYXlvdXQsIG5vIGNvbG9yc1xuXHR2YXIgYmFzZSA9IEZQU01ldGVyLnRoZW1lLmJhc2UgPSB7XG5cdFx0aGVhdG1hcHM6IFtdLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cGFkZGluZzogJzVweCcsXG5cdFx0XHRtaW5XaWR0aDogJzk1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzBweCcsXG5cdFx0XHR0ZXh0QWxpZ246ICdyaWdodCcsXG5cdFx0XHR0ZXh0U2hhZG93OiAnbm9uZSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdHRvcDogMCxcblx0XHRcdHJpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcyNHB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdDb25zb2xhcywgQW5kYWxlIE1vbm8sIG1vbm9zcGFjZScsXG5cdFx0XHR6SW5kZXg6IDJcblx0XHR9LFxuXHRcdGxlZ2VuZDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRsZWZ0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcxMnB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICczMnB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRncmFwaDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0XHRib3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRNb3pCb3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRcdHpJbmRleDogMVxuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0d2lkdGg6IDQsXG5cdFx0XHRzcGFjaW5nOiAxLFxuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbFxuXHRcdH1cblx0fTtcblxuXHQvLyBEYXJrIHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmRhcmsgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC44XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzIyMicsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0Ym9yZGVyOiAnMXB4IHNvbGlkICMxYTFhMWEnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCAjMjIyJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdGhlYXRPbjogJ2NvbG9yJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzNmM2YzZidcblx0XHR9XG5cdH0pO1xuXG5cdC8vIExpZ2h0IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmxpZ2h0ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjUsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Y29sb3I6ICcjNjY2Jyxcblx0XHRcdGJhY2tncm91bmQ6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSksIC0xcHggLTFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpJyxcblx0XHRcdGJveFNoYWRvdzogJzAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyNlYWVhZWEnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBDb2xvcmZ1bCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5jb2xvcmZ1bCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjZcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzg4OCcsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDAsMCwwLC4yKScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjNzc3Jyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjIpJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gVHJhbnNwYXJlbnQgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUudHJhbnNwYXJlbnQgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC41XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRwYWRkaW5nOiAwLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuNSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0cGFkZGluZzogJzAgNXB4Jyxcblx0XHRcdGhlaWdodDogJzQwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MnB4J1xuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdGhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdHdpZHRoOiA1LFxuXHRcdFx0YmFja2dyb3VuZDogJyM5OTknLFxuXHRcdFx0aGVhdE9uOiAnYmFja2dyb3VuZENvbG9yJyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdH1cblx0fSk7XG59KHdpbmRvdywgRlBTTWV0ZXIpKTsiLCJpbXBvcnQgJy4vbGliL3RpbnktY2FudmFzLmpzJztcbmltcG9ydCAnLi9saWIvc291bmRzLmpzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgcmVqZWN0cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgJ2Zwc21ldGVyJztcblxuZGVjbGFyZSB2YXIgZmlyZVNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBqdW1wU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGhpdFNvdW5kOiBhbnk7XG5cbmRlY2xhcmUgdmFyIEZQU01ldGVyOiBhbnk7XG5cbmNvbnN0IGZwc00gPSBuZXcgRlBTTWV0ZXIoKTtcblxuZGVjbGFyZSB2YXIgVEM6IGFueTtcbmRlY2xhcmUgdmFyIFRDVGV4OiBhbnk7XG5cbmludGVyZmFjZSBWZWN0b3Ige1xuICB4OiBudW1iZXJcbiAgeTogbnVtYmVyXG59XG5pbnRlcmZhY2UgQnVsbGV0IGV4dGVuZHMgQm9keSB7XG59XG5pbnRlcmZhY2UgQm9keSB7XG4gIHBvc2l0aW9uOiBWZWN0b3JcbiAgdmVsb2NpdHk6IFZlY3RvclxuICBkaXI6IERpclxuICBoZWlnaHQ6IG51bWJlclxuICB3aWR0aDogbnVtYmVyXG4gIHZpc2libGU6IGJvb2xlYW5cbn1cbmludGVyZmFjZSBQbGF5ZXIgZXh0ZW5kcyBCb2R5IHtcbiAgc2hvb3Rpbmc6IGJvb2xlYW5cbn1cbmludGVyZmFjZSBFbmVteSBleHRlbmRzIEJvZHkge1xufVxuXG5pbnRlcmZhY2UgU3RhdGUge1xuICBwbGF5ZXI6IFBsYXllclxuICBlbmVtaWVzOiBFbmVteVtdXG4gIGJ1bGxldHM6IEJ1bGxldFtdXG59XG5cbmludGVyZmFjZSBJbWdUZXh0dXJlIHtcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICB0ZXh0OiBXZWJHTFRleHR1cmVcbn1cbmVudW0gRGlyIHtcbiAgTGVmdCxcbiAgUmlnaHRcbn1cblxuZW51bSBFdmVudFR5cGUge1xuICBSaWdodFByZXNzZWQsXG4gIExlZnRSZWxlYXNlZCxcbiAgUmlnaHRSZWxlYXNlZCxcbiAgTGVmdFByZXNzZWQsXG4gIEp1bXBQcmVzc2VkLFxuICBVc2VQcmVzc2VkLFxuICBBdHRhY2tQcmVzc2VkLFxuICBBdHRhY2tSZWxlYXNlZFxufVxuXG50eXBlIEFjdGlvbiA9IEV2ZW50VHlwZVxudHlwZSBNb2RlbCA9IFN0YXRlO1xudmFyIGNhbnZhcyA9IFRDKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjJykpXG5pbnRlcmZhY2UgQUFCQiB7XG4gIGx0OiBWZWN0b3JcbiAgcnQ6IFZlY3RvclxuICByYjogVmVjdG9yXG4gIGxiOiBWZWN0b3Jcbn1cbmZ1bmN0aW9uIGdldEFBQkIoYjogQm9keSk6IEFBQkIge1xuICByZXR1cm4ge1xuICAgIGx0OiB7IHg6IGIucG9zaXRpb24ueCwgeTogYi5wb3NpdGlvbi55IH0sXG4gICAgcnQ6IHsgeDogYi5wb3NpdGlvbi54ICsgYi53aWR0aCwgeTogYi5wb3NpdGlvbi55IH0sXG4gICAgcmI6IHsgeDogYi5wb3NpdGlvbi54ICsgYi53aWR0aCwgeTogYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgfSxcbiAgICBsYjogeyB4OiBiLnBvc2l0aW9uLngsIHk6IGIucG9zaXRpb24ueSArIGIuaGVpZ2h0IH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUaWxlSW5kZWNlcyh2OiBWZWN0b3IpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcih2LnkgLyAyMCAvKiB0aWxlU2l6ZSAqLykgKiA1MCAvKiB3b3JsZFNpemUgKi8gKyBNYXRoLmZsb29yKHYueCAvIDIwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpZGUoYm9keTE6IEJvZHksIGJvZHkyOiBCb2R5KTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc3VsdCA9IGJvZHkxLnBvc2l0aW9uLnggPCAoYm9keTIucG9zaXRpb24ueCArIGJvZHkyLndpZHRoKSAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnggKyAoYm9keTEud2lkdGgpID4gYm9keTIucG9zaXRpb24ueCAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnkgPCBib2R5Mi5wb3NpdGlvbi55ICsgYm9keTIuaGVpZ2h0ICYmXG4gICAgYm9keTEucG9zaXRpb24ueSArIGJvZHkxLmhlaWdodCA+IGJvZHkyLnBvc2l0aW9uLnk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGxvYWRUZXh0dXJlcyh1cmxzOiBzdHJpbmdbXSk6IFByb21pc2U8SW1nVGV4dHVyZVtdPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZXIsIHJlamVjdHMpID0+IHtcbiAgICBsZXQgcmVzdWx0OiBJbWdUZXh0dXJlW10gPSBuZXcgQXJyYXk8SW1nVGV4dHVyZT4oKTtcblxuICAgIHVybHMuZm9yRWFjaCgodXJsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlXG4gICAgICBpbWcuc3JjID0gdXJsXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgZy5jYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodFxuICAgICAgICBnLmNhbnZhcy53aWR0aCA9IGltZy53aWR0aFxuICAgICAgICBnLmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgY29uc3QgdGV4MSA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cblxuICAgICAgICBnLmNsZWFyUmVjdCgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcuc2F2ZSgpXG4gICAgICAgIGcuc2NhbGUoLTEsIDEpXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgaW1nLndpZHRoICogLTEsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5yZXN0b3JlKClcbiAgICAgICAgY29uc3QgdGV4MiA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBpID0gaW5kZXgqMjtcbiAgICAgICAgcmVzdWx0W2krK10gPSB0ZXgxXG4gICAgICAgIHJlc3VsdFtpXSA9IHRleDJcbiAgICAgICAgaWYgKGluZGV4ID09IHVybHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZXIocmVzdWx0KVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5sb2FkVGV4dHVyZXMoW1wibW91bnRhaW4ucG5nXCIsXCJmbG9vci5wbmdcIiwgXCJzb2xkaWVyX3J1bi5wbmdcIiwgXCJzb2xkaWVyX2lkbGUucG5nXCIsIFwic29sZGllcl9zaG9vdGluZy5wbmdcIiwgXCJib3QucG5nXCJdKS50aGVuKCh0ZXh0dXJlcykgPT4ge1xuICBjb25zdCBbck1vdW50YWluLGxNb3VudGFpbixyaWdodEZsb29yLGxlZnRGbG9vciwgcmlnaHRSdW4sIGxlZnRSdW4sIHJpZ2h0SWRsZSwgbGVmdElkbGUsIHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgcmlnaHRCb3QsIGxlZnRCb3RdID0gdGV4dHVyZXNcblxuICBsZXQgY3VycmVudERlbHRhID0gMC4wXG4gIGxldCBjdXJyZW50VGltZSA9IDAuMFxuICBsZXQgY3VycmVudEFjdGlvbjogQWN0aW9uID0gbnVsbFxuICBjb25zdCBHUkFWSVRZID0gMTBcblxuICBjb25zdCBKVU1QX1ZFTCA9IDMwXG4gIGNvbnN0IFdBTEtfU1BFRUQgPSA2XG4gIGxldCBzdGFydFRpbWUgPSAwO1xuICBsZXQgaWQgPSAwO1xuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbY2FudmFzLmcuY2FudmFzLndpZHRoLCBjYW52YXMuZy5jYW52YXMuaGVpZ2h0XVxuXG4gIGZ1bmN0aW9uIHRleHR1cmVGcm9tUGl4ZWxBcnJheShnbCwgZGF0YUFycmF5LCB0eXBlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGRhdGFUeXBlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YUFycmF5KTsgLy8gRG9uJ3QgbmVlZCB0byBkbyB0aGlzIGlmIHRoZSBkYXRhIGlzIGFscmVhZHkgaW4gYSB0eXBlZCBhcnJheVxuICAgIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgdHlwZSwgd2lkdGgsIGhlaWdodCwgMCwgdHlwZSwgZ2wuVU5TSUdORURfQllURSwgZGF0YVR5cGVkQXJyYXkpO1xuICAgIC8vIE90aGVyIHRleHR1cmUgc2V0dXAgaGVyZSwgbGlrZSBmaWx0ZXIgbW9kZXMgYW5kIG1pcG1hcCBnZW5lcmF0aW9uXG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldE1vdXNlUG9zKGNhbnZhcywgZXZ0KSB7XG4gICAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IChldnQuY2xpZW50WCAtIHJlY3QubGVmdCkqMC4zLFxuICAgICAgeTogKGV2dC5jbGllbnRZIC0gcmVjdC50b3ApICogMC4xNVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaW5pdEJ1bGxldHMobnVtOiBudW1iZXIpOiBCdWxsZXRbXSB7XG4gICAgY29uc3QgYnM6IEJ1bGxldFtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICBicy5wdXNoKHsgcG9zaXRpb246IHsgeDogNTAsIHk6IDUwIH0sIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSwgdmlzaWJsZTogZmFsc2UsIGRpcjogRGlyLkxlZnQsIHdpZHRoOiA0LCBoZWlnaHQ6IDQgfSlcbiAgICB9XG4gICAgcmV0dXJuIGJzXG4gIH1cblxuICBmdW5jdGlvbiBuZXdFbmVteSh4OiBudW1iZXIsIHk6bnVtYmVyLCB2ZWw6IG51bWJlcik6IEVuZW15IHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9LFxuICAgICAgdmVsb2NpdHk6IHsgeDogdmVsLCB5OiAwLjAgfSxcbiAgICAgIGRpcjogRGlyLkxlZnQsXG4gICAgICB3aWR0aDogMjAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGNhbnZhcy5nLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLmcuY2FudmFzLCBldmVudClcbiAgICBjb25zb2xlLmxvZyhwb3MpXG4gLy8gICBjb25zdCB2ZWwgPSBXQUxLX1NQRUVEICogKE1hdGgucmFuZG9tKCkgKiAoMyAtIDEpICsgMSkvMiBcbiAgLy8gIHdpbmRvd1tcInN0YXRlXCJdLmVuZW1pZXMucHVzaChuZXdFbmVteShwb3MueCxwb3MueSwgdmVsKSlcbiAgfSlcblxuICBsZXQgY3VycmVudFN0YXRlOiBNb2RlbCA9IHtcbiAgICBwbGF5ZXI6IHtcbiAgICAgIHBvc2l0aW9uOiB7IHg6IDEyOCwgeTogMC4wIH0sXG4gICAgICB2ZWxvY2l0eTogeyB4OiAwLjAsIHk6IDAuMCB9LFxuICAgICAgZGlyOiBEaXIuUmlnaHQsXG4gICAgICBzaG9vdGluZzogZmFsc2UsXG4gICAgICB3aWR0aDogMjAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZW5lbWllczogW25ld0VuZW15KDM0LDI0LFdBTEtfU1BFRUQpXSxcbiAgICBidWxsZXRzOiBpbml0QnVsbGV0cygxMClcbiAgfVxuICBjb25zdCBGTE9PUiA9IGhlaWdodCAtIDEwXG4gIGNvbnN0IFNFQ09ORF9GTE9PUiA9IEZMT09SLzJcblxuICBjb25zdCBzZWNvbmRGbG9vckJvZHk6IEJvZHkgPSB7cG9zaXRpb246e3g6MC4wLCB5OiBTRUNPTkRfRkxPT1J9LHdpZHRoOiA2MCwgaGVpZ2h0OiAyMCxkaXI6IERpci5MZWZ0LHZlbG9jaXR5Ont4OjAseTowfSx2aXNpYmxlOiB0cnVlfVxuXG4gIHdpbmRvd1tcInN0YXRlXCJdID0gY3VycmVudFN0YXRlXG5cbiAgY29uc3Qga2VlcEFuaW1hdGlvbiA9ICh0aW1lOiBudW1iZXIpID0+IHtcbiAgICBjdXJyZW50RGVsdGEgPSAodGltZSAtIHN0YXJ0VGltZSkgLyAxMDA7XG4gICAgY3VycmVudFRpbWUgPSB0aW1lXG4gICAgc3RhcnRUaW1lID0gdGltZTtcblxuICAgIHVwZGF0ZShjdXJyZW50QWN0aW9uLCBjdXJyZW50U3RhdGUpXG4gICAgcmVuZGVyKGN1cnJlbnRTdGF0ZSlcbiAgICBjdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9XG5cblxuICBjb25zdCBoYW5kbGVyU3RhcnQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSnVtcFByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1ByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxlZnRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYW5kbGVyRW5kID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1JlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UmVsZWFzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicmVjdFwiKTtcbiAgY29uc3QgcHNPcCA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICBzdmdzLmZvckVhY2gocmVjID0+IHtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICB9KTtcblxuXG4gIC8qICAgc3Zncy5mb3JFYWNoKHJlYyA9PiB7XG4gICAgICByZWMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICAgIHJlYy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlckVuZCwgcHNPcCk7XG4gICAgfSkgKi9cblxuICBjb25zdCBoYW5kbGVyS0JEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5KdW1wUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTM6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuVXNlUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQXR0YWNrUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyS0JEb3duLCB0cnVlKTtcblxuICBjb25zdCBoYW5kbGVyS0JVcCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcktCVXAsIHRydWUpO1xuXG4gIGZ1bmN0aW9uIEJvZHlBbmltYXRpb24oXG4gICAgcmlnaHRUOiBJbWdUZXh0dXJlLFxuICAgIGxlZnRUOiBJbWdUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIHAucG9zaXRpb24ueCArIChwLndpZHRoIC8gMiksXG4gICAgICAgIHAucG9zaXRpb24ueSxcbiAgICAgICAgcC53aWR0aCxcbiAgICAgICAgcC5oZWlnaHQsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLHNlY29uZEZsb29yQm9keSk7XG4gIH1cblxuICBjb25zdCBib3RBbmltID0gbmV3IEJvZHlBbmltYXRpb24ocmlnaHRCb3QsIGxlZnRCb3QsIDUsIHRydWUsIFtbMCwgMCwgMSwgMC41XSwgWzAsIDAuNSwgMSwgMV1dKVxuICBjb25zdCBpZGxlQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0SWRsZSwgbGVmdElkbGUsIDIwLCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgcnVuQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0UnVuLCBsZWZ0UnVuLCA4LCB0cnVlLCBbWzAsIDAsIDEsIDAuMl0sIFswLCAuMiwgMSwgMC40XSwgWzAsIC40LCAxLCAwLjZdLCBbMCwgLjYsIDEsIDAuOF0sIFswLCAuOCwgMSwgMS4wXV0pXG4gIGNvbnN0IFNob290aW5nQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgMywgZmFsc2UsIFtbMCwgMCwgMSwgMC4yNV0sIFswLCAuMjUsIDEsIDAuNV0sIFswLCAuNSwgMSwgMC43NV0sIFswLCAuNzUsIDEsIDEuMF1dKVxuXG5cbiAgbGV0IGd1blJlYWR5OiBudW1iZXIgPSAwXG4gIGxldCBqdW1wVHJpZXM6bnVtYmVyID0gMlxuICBmdW5jdGlvbiB1cGRhdGUoYTogQWN0aW9uLCBtOiBNb2RlbCkge1xuICAgIGNvbnN0IHAgPSBtLnBsYXllclxuICAgIGlmIChpc092ZXJGbG9vcihwKSkge1xuICAgICAganVtcFRyaWVzID0gMlxuICAgIH1cbiAgICBzd2l0Y2ggKGEpIHtcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkp1bXBQcmVzc2VkOlxuICAgICAgICBpZihqdW1wVHJpZXMgPiAwKXtcbiAgICAgICAgICBqdW1wVHJpZXMtLVxuICAgICAgICAgIHAudmVsb2NpdHkueSA9IC1KVU1QX1ZFTFxuICAgICAgICAgIGp1bXBTb3VuZCgpXG4gICAgICAgIH1cbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTGVmdFByZXNzZWQ6XG4gICAgICAgIHAuZGlyID0gRGlyLkxlZnRcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gLVdBTEtfU1BFRURcbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkOlxuICAgICAgICBwLmRpciA9IERpci5SaWdodFxuICAgICAgICBwLnZlbG9jaXR5LnggPSBXQUxLX1NQRUVEXG4gICAgICAgIHAuc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkxlZnRSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJpZ2h0UmVsZWFzZWQ6XG4gICAgICAgIHAudmVsb2NpdHkueCA9IDBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BdHRhY2tQcmVzc2VkOlxuICAgICAgICBTaG9vdGluZ0FuaW0ucmVzZXQoKVxuICAgICAgICBwLnNob290aW5nID0gdHJ1ZVxuICAgICAgICBwLnZlbG9jaXR5LnggPSAocC5kaXIgPT0gRGlyLkxlZnQgPyAxLjUgOiAtMS41KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgICAgIGlmICghYi52aXNpYmxlICYmIGd1blJlYWR5ID09IDApIHtcbiAgICAgICAgICAgIGIucG9zaXRpb24ueCA9IHAucG9zaXRpb24ueCArIHAud2lkdGggKyBiLndpZHRoXG4gICAgICAgICAgICBiLnBvc2l0aW9uLnkgPSBwLnBvc2l0aW9uLnkgKyAocC5oZWlnaHQgLyAyLjQpXG4gICAgICAgICAgICBiLnZlbG9jaXR5LnggPSBwLmRpciA9PSBEaXIuUmlnaHQgPyAzNSA6IC0zNVxuICAgICAgICAgICAgYi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICAgICAgZ3VuUmVhZHkgPSAxMlxuICAgICAgICAgICAgZmlyZVNvdW5kKClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuQXR0YWNrUmVsZWFzZWQ6XG4gICAgICAgIHAudmVsb2NpdHkueCA9IDBcbiAgICAgICAgLy9wLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgLy9TaG9vdGluZ0FuaW0ucmVzZXQoKVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBtb3ZlKG0ucGxheWVyKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlID0gbS5lbmVtaWVzW2ldXG4gICAgICBtb3ZlKGUpXG4gICAgICBpZiAoZS5wb3NpdGlvbi54IDwgMCB8fCAoZS5wb3NpdGlvbi54ICsgMjAgPiB3aWR0aCkpIHtcbiAgICAgICAgZS52ZWxvY2l0eS54ID0gZS52ZWxvY2l0eS54ICogLTFcbiAgICAgICAgZS5kaXIgPSBlLnZlbG9jaXR5LnggPiAwID8gRGlyLkxlZnQgOiBEaXIuUmlnaHRcbiAgICAgIH1cbiAgICAgIG0uYnVsbGV0cy5maWx0ZXIoYiA9PiBiLnZpc2libGUpLmZvckVhY2goYiA9PiB7XG4gICAgICAgIGlmIChjb2xsaWRlKGIsIGUpKSB7XG4gICAgICAgICAgaGl0U291bmQoKVxuICAgICAgICAgIGUudmVsb2NpdHkueCA9IC1XQUxLX1NQRUVEXG4gICAgICAgICAgZS5wb3NpdGlvbi54ID0gd2lkdGggLSBlLndpZHRoXG4gICAgICAgICAgZS5wb3NpdGlvbi55ID0gMTIwXG4gICAgICAgICAgZS5kaXIgPSBEaXIuUmlnaHRcbiAgICAgICAgICBiLnZpc2libGUgPSBmYWxzZVxuICAgICAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJ1bGxldHNbaV1cbiAgICAgIG1vdmVCdWxsZXQoYilcbiAgICB9XG5cbiAgICBndW5SZWFkeSA9IE1hdGgubWF4KDAsIGd1blJlYWR5IC0gMSk7XG4gIH1cblxuICAvL2NhbnZhcy5zY2FsZSg0LCA0KVxuICBsZXQgdGV4RGF0YUZsb29yID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCAyMCAqIDIwICogNDsgaSsrKSB7XG4gICAgdGV4RGF0YUZsb29yW2ldID0gMS4wXG4gIH1cblxuICBjb25zdCBmbG9vclRleCA9IHRleHR1cmVGcm9tUGl4ZWxBcnJheShjYW52YXMuZywgdGV4RGF0YUZsb29yLCBjYW52YXMuZy5SR0JBLCAyMCwgMjApO1xuXG5cbiAgZnVuY3Rpb24gcmVuZGVyTW91bnRhaW4oKSB7XG4gICAgY2FudmFzLnB1c2goKVxuICAgIGNhbnZhcy5zY2FsZSg2LDYpXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCAxMDA7IHggKz0gMjApIHtcbiAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgIGxNb3VudGFpbi50ZXh0LFxuICAgICAgICB4LFxuICAgICAgICA1LFxuICAgICAgICBsTW91bnRhaW4ud2lkdGgsXG4gICAgICAgIGxNb3VudGFpbi5oZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfVxuICAgICAgY2FudmFzLnBvcCgpXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGbG9vcigpIHtcblxuICAgIGZvciAodmFyIHggPSBzZWNvbmRGbG9vckJvZHkucG9zaXRpb24ueDsgeCA8PSBzZWNvbmRGbG9vckJvZHkucG9zaXRpb24ueCtzZWNvbmRGbG9vckJvZHkud2lkdGggOyB4ICs9IDIwKSB7XG4gICAgY29uc3QgdGV4dCA9IHggJSA3ID09IDAgPyBsZWZ0Rmxvb3IgOiByaWdodEZsb29yXG4gICAgY2FudmFzLmltZyhcbiAgICAgIHRleHQudGV4dCxcbiAgICAgIHgsXG4gICAgICBzZWNvbmRGbG9vckJvZHkucG9zaXRpb24ueSxcbiAgICAgIHRleHQud2lkdGgsXG4gICAgICB0ZXh0LmhlaWdodCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDFcbiAgICApO1xuICAgIH1cbiAgICBcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDMwMDsgeCArPSAyMCkge1xuICAgICAgY29uc3QgdGV4dCA9IHggJSA3ID09IDAgPyBsZWZ0Rmxvb3IgOiByaWdodEZsb29yXG5cbiAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgIHRleHQudGV4dCxcbiAgICAgICAgeCxcbiAgICAgICAgRkxPT1ItMTAsXG4gICAgICAgIHRleHQud2lkdGgsXG4gICAgICAgIHRleHQuaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNOb3RPbkZsb29yKGI6IEJvZHkpOiBib29sZWFue1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCA8IEZMT09SXG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUdyYXZpdHkoYjogQm9keSkge1xuICAgIGIudmVsb2NpdHkueSA9IGlzTm90T25GbG9vcihiKSAmJiAhY29sbGlkZUZsb29yQm90dG9tKGIsc2Vjb25kRmxvb3JCb2R5KSA/IGIudmVsb2NpdHkueSArIChHUkFWSVRZICogY3VycmVudERlbHRhKSA6IGIudmVsb2NpdHkueVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0c2lkZVNjcmVlbihiOiBCdWxsZXQpIHtcbiAgICByZXR1cm4gYi5wb3NpdGlvbi54IDwgMCB8fCBiLnBvc2l0aW9uLnggPiB3aWR0aFxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUJ1bGxldChiOiBCdWxsZXQpOiB2b2lkIHtcbiAgICBpZiAob3V0c2lkZVNjcmVlbihiKSkge1xuICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICB9XG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICB9XG5cbiAgZnVuY3Rpb24gY29sbGlkZUZsb29yVG9wKGI6IEJvZHksIGY6IEJvZHkpOiBib29sZWFuIHtcbiAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBmLnBvc2l0aW9uLnkrZi5oZWlnaHQgPiBiLnBvc2l0aW9uLnlcbiAgfVxuICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JCb3R0b20oYjogQm9keSwgZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnBvc2l0aW9uLnkgPCBmLnBvc2l0aW9uLnlcbiAgIH1cblxuICAgZnVuY3Rpb24gcGxheWVyQ29sbGlkZUxlZnQoYjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsc2Vjb25kRmxvb3JCb2R5KSAmJlxuICAgIGIucG9zaXRpb24ueCA8IHNlY29uZEZsb29yQm9keS5wb3NpdGlvbi54K3NlY29uZEZsb29yQm9keS53aWR0aFxuICAgfVxuICAgZnVuY3Rpb24gcGxheWVyQ29sbGlkZVJpZ2h0KGI6IEJvZHkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29sbGlkZShiLHNlY29uZEZsb29yQm9keSkgJiZcbiAgICBiLnBvc2l0aW9uLngrYi53aWR0aCA+IHNlY29uZEZsb29yQm9keS5wb3NpdGlvbi54XG4gICB9XG5cbiAgZnVuY3Rpb24gbW92ZShiOiBCb2R5KTogdm9pZCB7XG4gICAgYi5wb3NpdGlvbi55ID0gTWF0aC5taW4oYi5wb3NpdGlvbi55ICsgKGIudmVsb2NpdHkueSAqIGN1cnJlbnREZWx0YSksIEZMT09SIC0gYi5oZWlnaHQpXG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICAgIGFwcGx5R3Jhdml0eShiKVxuXG4gICAgaWYoY29sbGlkZUZsb29yVG9wKGIsc2Vjb25kRmxvb3JCb2R5KSl7XG4gICAgICBpZihiLnZlbG9jaXR5LnkgPCAwKXtcbiAgICAgICAgYi52ZWxvY2l0eS55ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGNvbGxpZGVGbG9vckJvdHRvbShiLHNlY29uZEZsb29yQm9keSkpe1xuICAgICAgaWYoYi52ZWxvY2l0eS55ID4gMCl7XG4gICAgICAgIGIudmVsb2NpdHkueSA9IDBcbiAgICAgIH1cbiAgICB9XG4vKiAgICAgaWYocGxheWVyQ29sbGlkZUxlZnQoYikpe1xuICAgICAgaWYoYi52ZWxvY2l0eS54IDwgMCl7XG4gICAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocGxheWVyQ29sbGlkZVJpZ2h0KGIpKXtcbiAgICAgIGlmKGIudmVsb2NpdHkueCA+IDApe1xuICAgICAgICBiLnZlbG9jaXR5LnggPSAwXG4gICAgICB9XG4gICAgfSAqL1xuICB9XG5cbiAgY29uc3QgcmVuZGVyID0gKG06IE1vZGVsKSA9PiB7XG4gICAgY2FudmFzLmcuY2FudmFzLnN0eWxlLndpZHRoID0gXCJhdXRvXCI7XG4gICAgY2FudmFzLmcuY2FudmFzLnN0eWxlLmhlaWdodCA9ICBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lckhlaWdodCowLjk1KSArIFwicHhcIiA7XG4gICAgY2FudmFzLmcudmlld3BvcnQoMCwgMCwgY2FudmFzLmcuY2FudmFzLndpZHRoLCBjYW52YXMuZy5jYW52YXMuaGVpZ2h0KTtcbiAgICByZW5kZXJNb3VudGFpbigpXG5cbiAgICBjb25zdCBwID0gbS5wbGF5ZXJcbiAgICBjYW52YXMuY2xzKClcbiAgICBjYW52YXMuYmtnKDU3LzI1NSw3My8yNTUsODEvMjU1KVxuICAgIHJlbmRlckZsb29yKClcblxuICAgIGlmIChwLnNob290aW5nKSB7XG4gICAgICBTaG9vdGluZ0FuaW0udXBkYXRlKHApXG4gICAgfSBlbHNlIGlmIChwLnZlbG9jaXR5LnggPT0gMCkge1xuICAgICAgaWRsZUFuaW0udXBkYXRlKHApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJ1bkFuaW0udXBkYXRlKHApXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIGJvdEFuaW0udXBkYXRlKGUpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJ1bGxldHNbaV1cbiAgICAgIGlmIChiLnZpc2libGUpIHtcbiAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICBmbG9vclRleCxcbiAgICAgICAgICBiLnBvc2l0aW9uLngsXG4gICAgICAgICAgYi5wb3NpdGlvbi55LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzLmZsdXNoKCk7XG4gICAgZnBzTS50aWNrKClcbiAgfVxuXG4gIC8qICAqL2lmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3ZnXCIpXG4gICAgc3Zncy5mb3JFYWNoKHN2ZyA9PiB7XG4gICAgICBzdmcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICAvKiAgKi9cbiAgfVxuXG5cbiAgcnVuR2FtZSgpXG59KVxuIiwiZnVuY3Rpb24gRShjKXtcbiAgICB0aGlzLm4gPSBjLmNyZWF0ZUdhaW4oKVxuICAgIHRoaXMubi5nYWluLnZhbHVlID0gMFxuICAgIHRoaXMuYWRkRXZlbnRUb1F1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgYy5jdXJyZW50VGltZSArIDAuMDAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMywgYy5jdXJyZW50VGltZSArIDAuMTAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUgKyAwLjUwMCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBXTkIoYyl7XG4gICAgdmFyIGJzID0gYy5zYW1wbGVSYXRlO1xuICAgIHZhciBiID0gYy5jcmVhdGVCdWZmZXIoMSwgYnMsIGMuc2FtcGxlUmF0ZSk7XG4gICAgdmFyIG8gPSBiLmdldENoYW5uZWxEYXRhKDApO1xuICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJzOyBpKyspIHtcbiAgICAgIG9baV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgfVxuICBcbiAgICB0aGlzLnMgPSBjLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHRoaXMucy5idWZmZXIgPSBiO1xuICAgIHRoaXMucy5sb29wID0gdHJ1ZVxuICB9O1xuICBcbiAgdmFyIGN0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG4gIHZhciBuID0gbmV3IFdOQihjdHgpXG4gIHZhciB2MSA9IG5ldyBFKGN0eClcbiAgdmFyIHYyID0gbmV3IEUoY3R4KVxuICB2YXIgdjMgPSBuZXcgRShjdHgpXG4gIHZhciB2NCA9IG5ldyBFKGN0eClcbiAgdmFyIGYgPSBjdHguY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgdmFyIGcgPSBjdHguY3JlYXRlR2FpbigpXG4gIHZhciB2cyA9IDBcbiAgdmFyIHN0ZCA9IGZhbHNlXG5cbiAgXG4gIG4ucy5jb25uZWN0KHYxLm4pXG4gIG4ucy5jb25uZWN0KHYyLm4pXG4gIG4ucy5jb25uZWN0KHYzLm4pXG4gIG4ucy5jb25uZWN0KHY0Lm4pXG4gIFxuICBmLnR5cGUgPSBcImxvd3Bhc3NcIlxuICBmLlEudmFsdWUgPSAxXG4gIGYuZnJlcXVlbmN5LnZhbHVlID0gODAwXG4gIHYxLm4uY29ubmVjdChmKVxuICB2Mi5uLmNvbm5lY3QoZilcbiAgdjMubi5jb25uZWN0KGYpXG4gIHY0Lm4uY29ubmVjdChmKVxuICBnLmdhaW4udmFsdWUgPSA1XG4gIGYuY29ubmVjdChnKVxuICBnLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKVxuICBcbiAgXG4gIFxuICBmdW5jdGlvbiBmaXJlU291bmQoKXtcbiAgICBcbiAgIGlmKCFzdGQpe1xuICAgICAgc3RkID0gdHJ1ZVxuICAgICAgbi5zLnN0YXJ0KDApXG4gICAgfVxuICAgIFxuICAgIFxuICAgICAgIHZzKytcbiAgICAgICAgaWYodnMgPiA0KXtcbiAgICAgICAgICB2cyA9IDFcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMSl7XG4gICAgICAgICAgdjEuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMil7XG4gICAgICAgICAgdjIuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMyl7XG4gICAgICAgICAgdjMuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gNCl7XG4gICAgICAgICAgdjQuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICB9XG5cbnZhciBvID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbm8udHlwZSA9ICdzcXVhcmUnXG52YXIgdiA9IGN0eC5jcmVhdGVHYWluKCk7XG5vLmNvbm5lY3QodilcbnYuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xudi5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lKVxudmFyIHN0ZDIgPSBmYWxzZVxuXG5mdW5jdGlvbiBqdW1wU291bmQoKXtcbiAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogKDMgLSAxKSArIDEpLzJcbiAgaWYoIXN0ZDIpe1xuICAgICAgby5zdGFydCgwKVxuICAgIHN0ZDIgPSB0cnVlXG4gIH1cbiAgby5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMjAwKnIsIGN0eC5jdXJyZW50VGltZSlcbiAgdi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMSxjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuNiwgY3R4LmN1cnJlbnRUaW1lICsgMC4xKTtcbiAgby5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgyODAqciwgY3R4LmN1cnJlbnRUaW1lICsgMC40KTtcbiAgdi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxuZnVuY3Rpb24gaGl0U291bmQoKXtcbiAgdmFyIG9oID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIHZhciB2aCA9IGN0eC5jcmVhdGVHYWluKCk7XG4gIG9oLmNvbm5lY3QodmgpXG4gIHZoLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIG9oLmZyZXF1ZW5jeSA9IDg4MC42O1xuICBvaC5zdGFydCgwKVxuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDEsY3R4LmN1cnJlbnRUaW1lKVxuICBvaC5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICB2aC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNSlcbn1cblxuXG53aW5kb3dbJ2ZpcmVTb3VuZCddID0gZmlyZVNvdW5kO1xud2luZG93WydqdW1wU291bmQnXSA9IGp1bXBTb3VuZDtcbndpbmRvd1snaGl0U291bmQnXSA9IGhpdFNvdW5kO1xuXG5cblxuXG5cbiAgXG4gICIsIi8qXG4gKiBUaW55Q2FudmFzIG1vZHVsZSAoaHR0cHM6Ly9naXRodWIuY29tL2JpdG5lbmZlci90aW55LWNhbnZhcylcbiAqIERldmVsb3BlZCBieSBGZWxpcGUgQWxmb25zbyAtPiBodHRwczovL3R3aXR0ZXIuY29tL2JpdG5lbmZlci9cbiAqIFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFxuICogICAgICAgICAgICAgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTyBQVUJMSUMgTElDRU5TRVxuICogICAgICAgICAgICAgICAgICAgICBWZXJzaW9uIDIsIERlY2VtYmVyIDIwMDRcbiAqIFxuICogIENvcHlyaWdodCAoQykgMjAwNCBTYW0gSG9jZXZhciA8c2FtQGhvY2V2YXIubmV0PlxuICogXG4gKiAgRXZlcnlvbmUgaXMgcGVybWl0dGVkIHRvIGNvcHkgYW5kIGRpc3RyaWJ1dGUgdmVyYmF0aW0gb3IgbW9kaWZpZWRcbiAqICBjb3BpZXMgb2YgdGhpcyBsaWNlbnNlIGRvY3VtZW50LCBhbmQgY2hhbmdpbmcgaXQgaXMgYWxsb3dlZCBhcyBsb25nXG4gKiAgYXMgdGhlIG5hbWUgaXMgY2hhbmdlZC5cbiAqIFxuICogICAgICAgICAgICAgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTyBQVUJMSUMgTElDRU5TRVxuICogICAgVEVSTVMgQU5EIENPTkRJVElPTlMgRk9SIENPUFlJTkcsIERJU1RSSUJVVElPTiBBTkQgTU9ESUZJQ0FUSU9OXG4gKiBcbiAqICAgMC4gWW91IGp1c3QgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTy5cbiAqIFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFxuICovXG5cbmZ1bmN0aW9uIENvbXBpbGVTaGFkZXIoZ2wsIHNvdXJjZSwgdHlwZSkge1xuICAgIHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgcmV0dXJuIHNoYWRlcjtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlU2hhZGVyUHJvZ3JhbShnbCwgdnNTb3VyY2UsIGZzU291cmNlKSB7XG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCksXG4gICAgICAgIHZTaGFkZXIgPSBDb21waWxlU2hhZGVyKGdsLCB2c1NvdXJjZSwgMzU2MzMpLFxuICAgICAgICBmU2hhZGVyID0gQ29tcGlsZVNoYWRlcihnbCwgZnNTb3VyY2UsIDM1NjMyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdlNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBwcm9ncmFtO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVCdWZmZXIoZ2wsIGJ1ZmZlclR5cGUsIHNpemUsIHVzYWdlKSB7XG4gICAgdmFyIGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoYnVmZmVyVHlwZSwgYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGJ1ZmZlclR5cGUsIHNpemUsIHVzYWdlKTtcbiAgICByZXR1cm4gYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVUZXh0dXJlKGdsLCBpbWFnZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKDM1NTMsIHRleHR1cmUpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDIsIDMzMDcxKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQzLCAzMzA3MSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MCwgOTcyOCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MSwgOTcyOCk7XG4gICAgZ2wudGV4SW1hZ2UyRCgzNTUzLCAwLCA2NDA4LCA2NDA4LCA1MTIxLCBpbWFnZSk7XG4gICAgZ2wuYmluZFRleHR1cmUoMzU1MywgbnVsbCk7XG4gICAgdGV4dHVyZS53aWR0aCA9IHdpZHRoO1xuICAgIHRleHR1cmUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHJldHVybiB0ZXh0dXJlO1xufVxud2luZG93WydUQ1NoZCddID0gQ29tcGlsZVNoYWRlcjtcbndpbmRvd1snVENQcmcnXSA9IENyZWF0ZVNoYWRlclByb2dyYW07XG53aW5kb3dbJ1RDQnVmJ10gPSBDcmVhdGVCdWZmZXI7XG53aW5kb3dbJ1RDVGV4J10gPSBDcmVhdGVUZXh0dXJlO1xuXG5mdW5jdGlvbiBUaW55Q2FudmFzKGNhbnZhcykge1xuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpLFxuICAgICAgICBWRVJURVhfU0laRSA9ICg0ICogMikgKyAoNCAqIDIpICsgKDQpLFxuICAgICAgICBNQVhfQkFUQ0ggPSAxMDkyMiwgLy8gZmxvb3IoKDIgXiAxNikgLyA2KVxuICAgICAgICBNQVhfU1RBQ0sgPSAxMDAsXG4gICAgICAgIE1BVF9TSVpFID0gNixcbiAgICAgICAgVkVSVElDRVNfUEVSX1FVQUQgPSA2LFxuICAgICAgICBNQVRfU1RBQ0tfU0laRSA9IE1BWF9TVEFDSyAqIE1BVF9TSVpFLFxuICAgICAgICBWRVJURVhfREFUQV9TSVpFID0gVkVSVEVYX1NJWkUgKiBNQVhfQkFUQ0ggKiA0LFxuICAgICAgICBJTkRFWF9EQVRBX1NJWkUgPSBNQVhfQkFUQ0ggKiAoMiAqIFZFUlRJQ0VTX1BFUl9RVUFEKSxcbiAgICAgICAgd2lkdGggPSBjYW52YXMud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IGNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHNoYWRlciA9IENyZWF0ZVNoYWRlclByb2dyYW0oXG4gICAgICAgICAgICBnbCwgW1xuICAgICAgICAgICAgICAgICdwcmVjaXNpb24gbG93cCBmbG9hdDsnLFxuICAgICAgICAgICAgICAgIC8vIElOIFZlcnRleCBQb3NpdGlvbiBhbmRcbiAgICAgICAgICAgICAgICAvLyBJTiBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIGEsIGI7JyxcbiAgICAgICAgICAgICAgICAvLyBJTiBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlIHZlYzQgYzsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjMiBkOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzQgZTsnLFxuICAgICAgICAgICAgICAgIC8vIENPTlNUIFZpZXcgTWF0cml4XG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gbWF0NCBtOycsXG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gdmVjMiByOycsXG4gICAgICAgICAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG4gICAgICAgICAgICAgICAgJ2dsX1Bvc2l0aW9uPW0qdmVjNChhLDEuMCwxLjApOycsXG4gICAgICAgICAgICAgICAgJ2Q9YjsnLFxuICAgICAgICAgICAgICAgICdlPWM7JyxcbiAgICAgICAgICAgICAgICAnfSdcbiAgICAgICAgICAgIF0uam9pbignXFxuJyksIFtcbiAgICAgICAgICAgICAgICAncHJlY2lzaW9uIGxvd3AgZmxvYXQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzIgZDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWM0IGU7JyxcbiAgICAgICAgICAgICAgICAvLyBDT05TVCBTaW5nbGUgU2FtcGxlcjJEXG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIGY7JyxcbiAgICAgICAgICAgICAgICAndm9pZCBtYWluKCl7JyxcbiAgICAgICAgICAgICAgICAnZ2xfRnJhZ0NvbG9yPXRleHR1cmUyRChmLGQpKmU7JyxcbiAgICAgICAgICAgICAgICAnfSdcbiAgICAgICAgICAgIF0uam9pbignXFxuJylcbiAgICAgICAgKSxcbiAgICAgICAgZ2xCdWZmZXJTdWJEYXRhID0gZ2wuYnVmZmVyU3ViRGF0YS5iaW5kKGdsKSxcbiAgICAgICAgZ2xEcmF3RWxlbWVudHMgPSBnbC5kcmF3RWxlbWVudHMuYmluZChnbCksXG4gICAgICAgIGdsQmluZFRleHR1cmUgPSBnbC5iaW5kVGV4dHVyZS5iaW5kKGdsKSxcbiAgICAgICAgZ2xDbGVhciA9IGdsLmNsZWFyLmJpbmQoZ2wpLFxuICAgICAgICBnbENsZWFyQ29sb3IgPSBnbC5jbGVhckNvbG9yLmJpbmQoZ2wpLFxuICAgICAgICB2ZXJ0ZXhEYXRhID0gbmV3IEFycmF5QnVmZmVyKFZFUlRFWF9EQVRBX1NJWkUpLFxuICAgICAgICB2UG9zaXRpb25EYXRhID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhEYXRhKSxcbiAgICAgICAgdkNvbG9yRGF0YSA9IG5ldyBVaW50MzJBcnJheSh2ZXJ0ZXhEYXRhKSxcbiAgICAgICAgdkluZGV4RGF0YSA9IG5ldyBVaW50MTZBcnJheShJTkRFWF9EQVRBX1NJWkUpLFxuICAgICAgICBJQk8gPSBDcmVhdGVCdWZmZXIoZ2wsIDM0OTYzLCB2SW5kZXhEYXRhLmJ5dGVMZW5ndGgsIDM1MDQ0KSxcbiAgICAgICAgVkJPID0gQ3JlYXRlQnVmZmVyKGdsLCAzNDk2MiwgdmVydGV4RGF0YS5ieXRlTGVuZ3RoLCAzNTA0OCksXG4gICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgbWF0ID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMSwgMCwgMF0pLFxuICAgICAgICBzdGFjayA9IG5ldyBGbG9hdDMyQXJyYXkoMTAwKSxcbiAgICAgICAgc3RhY2twID0gMCxcbiAgICAgICAgY29zID0gTWF0aC5jb3MsXG4gICAgICAgIHNpbiA9IE1hdGguc2luLFxuICAgICAgICBjdXJyZW50VGV4dHVyZSA9IG51bGwsXG4gICAgICAgIHJlbmRlcmVyID0gbnVsbCxcbiAgICAgICAgbG9jQSwgbG9jQiwgbG9jQztcblxuICAgIGdsLmJsZW5kRnVuYyg3NzAsIDc3MSk7XG4gICAgZ2wuZW5hYmxlKDMwNDIpO1xuICAgIGdsLnVzZVByb2dyYW0oc2hhZGVyKTtcbiAgICBnbC5iaW5kQnVmZmVyKDM0OTYzLCBJQk8pO1xuICAgIGZvciAodmFyIGluZGV4QSA9IGluZGV4QiA9IDA7IGluZGV4QSA8IE1BWF9CQVRDSCAqIFZFUlRJQ0VTX1BFUl9RVUFEOyBpbmRleEEgKz0gVkVSVElDRVNfUEVSX1FVQUQsIGluZGV4QiArPSA0KVxuICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDBdID0gaW5kZXhCLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAxXSA9IGluZGV4QiArIDEsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDJdID0gaW5kZXhCICsgMixcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgM10gPSBpbmRleEIgKyAwLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyA0XSA9IGluZGV4QiArIDMsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDVdID0gaW5kZXhCICsgMTtcblxuICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MywgMCwgdkluZGV4RGF0YSk7XG4gICAgZ2wuYmluZEJ1ZmZlcigzNDk2MiwgVkJPKTtcbiAgICBsb2NBID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYScpO1xuICAgIGxvY0IgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdiJyk7XG4gICAgbG9jQyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NBKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0EsIDIsIDUxMjYsIDAsIFZFUlRFWF9TSVpFLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NCKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0IsIDIsIDUxMjYsIDAsIFZFUlRFWF9TSVpFLCA4KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NDKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0MsIDQsIDUxMjEsIDEsIFZFUlRFWF9TSVpFLCAxNik7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLCAnbScpLCAwLFxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgIDIgLyB3aWR0aCwgMCwgMCwgMCxcbiAgICAgICAgICAgIDAsIC0yIC8gaGVpZ2h0LCAwLCAwLFxuICAgICAgICAgICAgMCwgMCwgMSwgMSwgLTEsIDEsIDAsIDBcbiAgICAgICAgXSlcbiAgICApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoMzM5ODQpO1xuICAgIHJlbmRlcmVyID0ge1xuICAgICAgICAnZyc6IGdsLFxuICAgICAgICAnYyc6IGNhbnZhcyxcbiAgICAgICAgJ2NvbCc6IDB4RkZGRkZGRkYsXG4gICAgICAgICdia2cnOiBmdW5jdGlvbiAociwgZywgYikge1xuICAgICAgICAgICAgZ2xDbGVhckNvbG9yKHIsIGcsIGIsIDEpO1xuICAgICAgICB9LFxuICAgICAgICAnY2xzJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2xDbGVhcigxNjM4NCk7XG4gICAgICAgIH0sXG4gICAgICAgICd0cmFucyc6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBtYXRbNF0gPSBtYXRbMF0gKiB4ICsgbWF0WzJdICogeSArIG1hdFs0XTtcbiAgICAgICAgICAgIG1hdFs1XSA9IG1hdFsxXSAqIHggKyBtYXRbM10gKiB5ICsgbWF0WzVdO1xuICAgICAgICB9LFxuICAgICAgICAnc2NhbGUnOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgbWF0WzBdID0gbWF0WzBdICogeDtcbiAgICAgICAgICAgIG1hdFsxXSA9IG1hdFsxXSAqIHg7XG4gICAgICAgICAgICBtYXRbMl0gPSBtYXRbMl0gKiB5O1xuICAgICAgICAgICAgbWF0WzNdID0gbWF0WzNdICogeTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3JvdCc6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICB2YXIgYSA9IG1hdFswXSxcbiAgICAgICAgICAgICAgICBiID0gbWF0WzFdLFxuICAgICAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgICAgICBzciA9IHNpbihyKSxcbiAgICAgICAgICAgICAgICBjciA9IGNvcyhyKTtcblxuICAgICAgICAgICAgbWF0WzBdID0gYSAqIGNyICsgYyAqIHNyO1xuICAgICAgICAgICAgbWF0WzFdID0gYiAqIGNyICsgZCAqIHNyO1xuICAgICAgICAgICAgbWF0WzJdID0gYSAqIC1zciArIGMgKiBjcjtcbiAgICAgICAgICAgIG1hdFszXSA9IGIgKiAtc3IgKyBkICogY3I7XG4gICAgICAgIH0sXG4gICAgICAgICdwdXNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMF0gPSBtYXRbMF07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAxXSA9IG1hdFsxXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDJdID0gbWF0WzJdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgM10gPSBtYXRbM107XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyA0XSA9IG1hdFs0XTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDVdID0gbWF0WzVdO1xuICAgICAgICAgICAgc3RhY2twICs9IDY7XG4gICAgICAgIH0sXG4gICAgICAgICdwb3AnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdGFja3AgLT0gNjtcbiAgICAgICAgICAgIG1hdFswXSA9IHN0YWNrW3N0YWNrcCArIDBdO1xuICAgICAgICAgICAgbWF0WzFdID0gc3RhY2tbc3RhY2twICsgMV07XG4gICAgICAgICAgICBtYXRbMl0gPSBzdGFja1tzdGFja3AgKyAyXTtcbiAgICAgICAgICAgIG1hdFszXSA9IHN0YWNrW3N0YWNrcCArIDNdO1xuICAgICAgICAgICAgbWF0WzRdID0gc3RhY2tbc3RhY2twICsgNF07XG4gICAgICAgICAgICBtYXRbNV0gPSBzdGFja1tzdGFja3AgKyA1XTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2ltZyc6IGZ1bmN0aW9uICh0ZXh0dXJlLCB4LCB5LCB3LCBoLCB1MCwgdjAsIHUxLCB2MSkge1xuICAgICAgICAgICAgdmFyIHgwID0geCxcbiAgICAgICAgICAgICAgICB5MCA9IHksXG4gICAgICAgICAgICAgICAgeDEgPSB4ICsgdyxcbiAgICAgICAgICAgICAgICB5MSA9IHkgKyBoLFxuICAgICAgICAgICAgICAgIHgyID0geCxcbiAgICAgICAgICAgICAgICB5MiA9IHkgKyBoLFxuICAgICAgICAgICAgICAgIHgzID0geCArIHcsXG4gICAgICAgICAgICAgICAgeTMgPSB5LFxuICAgICAgICAgICAgICAgIGEgPSBtYXRbMF0sXG4gICAgICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgICAgIGQgPSBtYXRbM10sXG4gICAgICAgICAgICAgICAgZSA9IG1hdFs0XSxcbiAgICAgICAgICAgICAgICBmID0gbWF0WzVdLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgICAgICAgICAgYXJnYiA9IHJlbmRlcmVyWydjb2wnXTtcblxuICAgICAgICAgICAgaWYgKHRleHR1cmUgIT0gY3VycmVudFRleHR1cmUgfHxcbiAgICAgICAgICAgICAgICBjb3VudCArIDEgPj0gTUFYX0JBVENIKSB7XG4gICAgICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2ZXJ0ZXhEYXRhKTtcbiAgICAgICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXh0dXJlICE9IHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgICAgICAgICBnbEJpbmRUZXh0dXJlKDM1NTMsIGN1cnJlbnRUZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9mZnNldCA9IGNvdW50ICogVkVSVEVYX1NJWkU7XG4gICAgICAgICAgICAvLyBWZXJ0ZXggT3JkZXJcbiAgICAgICAgICAgIC8vIFZlcnRleCBQb3NpdGlvbiB8IFVWIHwgQVJHQlxuICAgICAgICAgICAgLy8gVmVydGV4IDFcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDAgKiBhICsgeTAgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDAgKiBiICsgeTAgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTA7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYwO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggMlxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MSAqIGEgKyB5MSAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MSAqIGIgKyB5MSAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjE7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCAzXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgyICogYSArIHkyICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgyICogYiArIHkyICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUwO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MTtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDRcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDMgKiBhICsgeTMgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDMgKiBiICsgeTMgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTE7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYwO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICBpZiAoKytjb3VudCA+PSBNQVhfQkFUQ0gpIHtcbiAgICAgICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZlcnRleERhdGEpO1xuICAgICAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2ZsdXNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHJldHVybjtcbiAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdlBvc2l0aW9uRGF0YS5zdWJhcnJheSgwLCBjb3VudCAqIFZFUlRFWF9TSVpFKSk7XG4gICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJlbmRlcmVyO1xufVxud2luZG93WydUQyddID0gVGlueUNhbnZhczsiXSwic291cmNlUm9vdCI6IiJ9