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
function rdnAngle() {
    const v = (Math.random() * (125 - 0) + 0) / 1000;
    if (Math.random() >= 0.5) {
        return (2 - v) * Math.PI;
    }
    else {
        return v * Math.PI;
    }
}
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
loadTextures(["mountain.png", "floor.png", "soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
    const [rMountain, lMountain, rightFloor, leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures;
    const bulletTexture = createBulletTexture();
    let currentDelta = 0.0;
    let currentTime = 0.0;
    let currentAction = null;
    const GRAVITY = 10;
    const JUMP_VEL = 30;
    const WALK_SPEED = 6;
    let startTime = 0;
    let id = 0;
    const [width, height] = [canvas.g.canvas.width, canvas.g.canvas.height];
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
    const SECOND_FLOOR = FLOOR * 0.7;
    const secondFloorBody = { position: { x: 0.0, y: SECOND_FLOOR }, width: 60, height: 20, dir: Dir.Left, velocity: { x: 0, y: 0 }, visible: true };
    const secondFloorBodySeg2 = { position: { x: 190.0, y: SECOND_FLOOR }, width: 100, height: 20, dir: Dir.Left, velocity: { x: 0, y: 0 }, visible: true };
    const floors = [secondFloorBody, secondFloorBodySeg2];
    window["state"] = currentState;
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
    /*   function isOverFloor(b: Body): boolean{
        return b.position.y + b.height == FLOOR || collideFloorBottom(b,secondFloorBody);
      }
     */
    function isOverFloor(b) {
        let floorBottoms = false;
        for (var i = 0; i < floors.length; i++) {
            floorBottoms = floorBottoms || collideFloorBottom(b, floors[i]);
        }
        return b.position.y + b.height == FLOOR || floorBottoms;
    }
    const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]]);
    const shootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]]);
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
                shootingAnim.reset();
                p.shooting = true;
                p.velocity.x = (p.dir == Dir.Left ? 1.5 : -1.5);
                for (var i = 0; i < m.bullets.length; i++) {
                    const b = m.bullets[i];
                    if (!b.visible && gunReady == 0) {
                        const angle = rdnAngle();
                        b.position.x = p.position.x + p.width + b.width;
                        b.position.y = p.position.y + (p.height / 2.4);
                        b.velocity.x = (p.dir == Dir.Right ? 35 : -35) * Math.cos(angle);
                        b.velocity.y = 5 * Math.sin(angle);
                        b.visible = true;
                        gunReady = 8;
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
    function renderMountain() {
        canvas.push();
        canvas.scale(6, 6);
        for (var x = 0; x < 100; x += 20) {
            canvas.img(lMountain.text, x, 5, lMountain.width, lMountain.height, 0, 0, 1, 1);
        }
        canvas.pop();
    }
    function renderFloor() {
        for (var x = secondFloorBodySeg2.position.x; x <= secondFloorBodySeg2.position.x + secondFloorBodySeg2.width; x += 20) {
            const text = x % 7 == 0 ? leftFloor : rightFloor;
            canvas.img(text.text, x, secondFloorBodySeg2.position.y - 10, text.width, text.height, 0, 0, 1, 1);
        }
        for (var x = secondFloorBody.position.x; x <= secondFloorBody.position.x + secondFloorBody.width; x += 20) {
            const text = x % 7 == 0 ? leftFloor : rightFloor;
            canvas.img(text.text, x, secondFloorBody.position.y - 10, text.width, text.height, 0, 0, 1, 1);
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
        b.position.y += b.velocity.y * currentDelta;
    }
    function collideFloorTop(b, f) {
        return collide(b, f) &&
            f.position.y + (f.height / 2) > b.position.y;
    }
    function collideFloorBottom(b, f) {
        return collide(b, f) &&
            b.position.y < f.position.y;
    }
    function collideFloorLeft(b, f) {
        return collide(b, f) &&
            b.position.x < f.position.x && b.position.x + b.width > f.position.x;
    }
    function collideFloorRight(b, f) {
        return collide(b, f) &&
            b.position.x + (b.width * 0.9) < f.position.x && b.velocity.x > 0;
    }
    function move(b) {
        b.position.y = Math.min(b.position.y + (b.velocity.y * currentDelta), FLOOR - b.height);
        b.position.x += b.velocity.x * currentDelta;
        applyGravity(b);
        for (var f = 0; f < floors.length; f++) {
            if (collideFloorTop(b, floors[f])) {
                if (b.velocity.y < 0) {
                    b.velocity.y = 0;
                }
            }
            if (collideFloorBottom(b, floors[f])) {
                if (b.velocity.y > 0) {
                    b.velocity.y = 0;
                }
            }
        }
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
            shootingAnim.update(p);
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
                canvas.img(bulletTexture, b.position.x, b.position.y, 4, 4, 0, 0, 1, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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QUNULENBQUMsRUFDRCxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFDakMsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO1NBQ0Q7UUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxlQUFlLENBQUMsS0FBSyxFQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUcsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVTtZQUNoRCxNQUFNLENBQUMsR0FBRyxDQUNSLElBQUksQ0FBQyxJQUFJLEVBQ1QsQ0FBQyxFQUNELGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFDN0IsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO1NBQ0Q7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVTtZQUVoRCxNQUFNLENBQUMsR0FBRyxDQUNSLElBQUksQ0FBQyxJQUFJLEVBQ1QsQ0FBQyxFQUNELEtBQUssR0FBQyxFQUFFLEVBQ1IsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxFQUNYLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO1NBRUg7SUFDSCxDQUFDO0lBRUQsc0JBQXNCLENBQU87UUFDM0IsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUs7SUFDeEMsQ0FBQztJQUVELHNCQUFzQixDQUFPO1FBQzNCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuSSxDQUFDO0lBRUQsdUJBQXVCLENBQVM7UUFDOUIsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSztJQUNqRCxDQUFDO0lBRUQsb0JBQW9CLENBQVM7UUFDM0IsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLO1lBQ2pCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDakI7UUFDRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxZQUFZO1FBQzNDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVk7SUFDN0MsQ0FBQztJQUVELHlCQUF5QixDQUFPLEVBQUUsQ0FBTztRQUN4QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELDRCQUE0QixDQUFPLEVBQUUsQ0FBTztRQUMxQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsMEJBQTBCLENBQU8sRUFBQyxDQUFPO1FBQ3hDLE9BQU8sT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNELDJCQUEyQixDQUFPLEVBQUMsQ0FBTztRQUN6QyxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzlELENBQUM7SUFFRixjQUFjLENBQU87UUFDbkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3ZGLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFlBQVk7UUFDM0MsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUVmLEtBQUksSUFBSSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBRWxDLElBQUcsZUFBZSxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDOUIsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7aUJBQ2pCO2FBQ0Y7WUFDRCxJQUFHLGtCQUFrQixDQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztnQkFDakMsSUFBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUM7b0JBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7aUJBQ2pCO2FBQ0Y7U0FDRjtJQUVILENBQUM7SUFFRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO1FBQzFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBRTtRQUM1RSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxjQUFjLEVBQUU7UUFFaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU07UUFDbEIsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUMsR0FBRyxFQUFDLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDaEMsV0FBVyxFQUFFO1FBRWIsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkI7YUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNuQjthQUFNO1lBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbEI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxHQUFHLENBQ1IsYUFBYSxFQUNiLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNaLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUNaLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxDQUNGLENBQUM7YUFDSDtTQUNGO1FBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksRUFBRTtJQUNiLENBQUM7SUFFRCxNQUFNLEtBQUksZ0VBQWdFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNwRyxNQUFNLElBQUksR0FBUSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFHRCxPQUFPLEVBQUU7QUFDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQ3pwQkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixrQkFBa0I7QUFDbEI7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLCtDQUErQztBQUMvQyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyohXG4gKiBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxM1xuICogaHR0cHM6Ly9naXRodWIuY29tL0RhcnNhaW4vZnBzbWV0ZXJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cbjsoZnVuY3Rpb24gKHcsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgRWxlbWVudCB0eXBlIG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBuZXdFbChuYW1lKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlbWUgQ1NTIHByb3BlcnRpZXMgdG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBET00gZWxlbWVudC5cblx0ICogQHBhcmFtICB7T2JqZWN0fSAgdGhlbWUgICBUaGVtZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBhcHBseVRoZW1lKGVsZW1lbnQsIHRoZW1lKSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGVtZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHRoZW1lW25hbWVdO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHR5cGUgb2YgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICpcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gdHlwZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpIHx8ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gYW4gYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcblx0ICpcblx0ICogQHJldHVybiB7SW50ZWdlcn0gQXJyYXkgaW5kZXggb3IgLTEgd2hlbiBub3QgZm91bmQuXG5cdCAqL1xuXHRmdW5jdGlvbiBpbkFycmF5KHZhbHVlLCBhcnJheSkge1xuXHRcdGlmICh0eXBlKGFycmF5KSAhPT0gJ2FycmF5Jykge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoYXJyYXkuaW5kZXhPZikge1xuXHRcdFx0cmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGFycmF5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBvb3IgbWFuJ3MgZGVlcCBvYmplY3QgZXh0ZW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKiAgIGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzWzFdKSB7XG5cdFx0XHRpZiAoYXJnc1sxXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZShhcmdzWzFdW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGV4dGVuZCh7fSwgYXJnc1swXVtrZXldLCBhcmdzWzFdW2tleV0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdhcnJheSc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV0uc2xpY2UoMCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3MubGVuZ3RoID4gMiA/XG5cdFx0XHRleHRlbmQuYXBwbHkobnVsbCwgW2FyZ3NbMF1dLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAyKSkpIDpcblx0XHRcdGFyZ3NbMF07XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBIU0wgY29sb3IgdG8gSEVYIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtICB7QXJyYXl9IGhzbCBBcnJheSB3aXRoIFtodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzc10uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0FycmF5fSBBcnJheSB3aXRoIFtyZWQsIGdyZWVuLCBibHVlXS5cblx0ICovXG5cdGZ1bmN0aW9uIGhzbFRvSGV4KGgsIHMsIGwpIHtcblx0XHR2YXIgciwgZywgYjtcblx0XHR2YXIgdiwgbWluLCBzdiwgc2V4dGFudCwgZnJhY3QsIHZzZjtcblxuXHRcdGlmIChsIDw9IDAuNSkge1xuXHRcdFx0diA9IGwgKiAoMSArIHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ID0gbCArIHMgLSBsICogcztcblx0XHR9XG5cblx0XHRpZiAodiA9PT0gMCkge1xuXHRcdFx0cmV0dXJuICcjMDAwJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluID0gMiAqIGwgLSB2O1xuXHRcdFx0c3YgPSAodiAtIG1pbikgLyB2O1xuXHRcdFx0aCA9IDYgKiBoO1xuXHRcdFx0c2V4dGFudCA9IE1hdGguZmxvb3IoaCk7XG5cdFx0XHRmcmFjdCA9IGggLSBzZXh0YW50O1xuXHRcdFx0dnNmID0gdiAqIHN2ICogZnJhY3Q7XG5cdFx0XHRpZiAoc2V4dGFudCA9PT0gMCB8fCBzZXh0YW50ID09PSA2KSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluICsgdnNmO1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAxKSB7XG5cdFx0XHRcdHIgPSB2IC0gdnNmO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMikge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbiArIHZzZjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMykge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdiAtIHZzZjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDQpIHtcblx0XHRcdFx0ciA9IG1pbiArIHZzZjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHYgLSB2c2Y7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJyMnICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGhzbFRvSGV4LlxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuXHRcdGMgPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcblx0XHRyZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogYztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2UgZWxlbWVudCBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV9ICAgICBlbGVtZW50XG5cdCAqIEBwYXJhbSAge0V2ZW50fSAgICBldmVudE5hbWVcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Qm9vbH0gICAgIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyLCByZW1vdmUpIHtcblx0XHRpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdhZGRFdmVudExpc3RlbmVyJ10oZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdkZXRhY2hFdmVudCcgOiAnYXR0YWNoRXZlbnQnXSgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0XHR9XG5cdH1cblxuXHQvLyBQcmVmZXJyZWQgdGltaW5nIGZ1bnRpb25cblx0dmFyIGdldFRpbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBlcmYgPSB3LnBlcmZvcm1hbmNlO1xuXHRcdGlmIChwZXJmICYmIChwZXJmLm5vdyB8fCBwZXJmLndlYmtpdE5vdykpIHtcblx0XHRcdHZhciBwZXJmTm93ID0gcGVyZi5ub3cgPyAnbm93JyA6ICd3ZWJraXROb3cnO1xuXHRcdFx0Z2V0VGltZSA9IHBlcmZbcGVyZk5vd10uYmluZChwZXJmKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuICtuZXcgRGF0ZSgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gTG9jYWwgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBwb2x5ZmlsbFxuXHR2YXIgY0FGID0gdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0dmFyIHJBRiA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0JywgJ28nXTtcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXG5cdFx0Ly8gRm9yIGEgbW9yZSBhY2N1cmF0ZSBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uLCBkaXRjaCB0aGUgbmF0aXZlXG5cdFx0Ly8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoZW4gY2FuY2VsQW5pbWF0aW9uRnJhbWUgaXMgbm90IHByZXNlbnQgKG9sZGVyIHZlcnNpb25zIG9mIEZpcmVmb3gpXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IGwgJiYgIWNBRjsgKytpKSB7XG5cdFx0XHRjQUYgPSB3W3ZlbmRvcnNbaV0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd1t2ZW5kb3JzW2ldKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHRcdHJBRiA9IGNBRiAmJiB3W3ZlbmRvcnNbaV0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdH1cblxuXHRcdGlmICghY0FGKSB7XG5cdFx0XHRyQUYgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGN1cnJUaW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcblx0XHRcdFx0bGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cdFx0XHRcdHJldHVybiB3LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcblx0XHRcdH07XG5cblx0XHRcdGNBRiA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gUHJvcGVydHkgbmFtZSBmb3IgYXNzaWduaW5nIGVsZW1lbnQgdGV4dCBjb250ZW50XG5cdHZhciB0ZXh0UHJvcCA9IHR5cGUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykudGV4dENvbnRlbnQpID09PSAnc3RyaW5nJyA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcblxuXHQvKipcblx0ICogRlBTTWV0ZXIgY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yICBFbGVtZW50IHRvIGFwcGVuZCB0aGUgbWV0ZXIgdG8uIERlZmF1bHQgaXMgZG9jdW1lbnQuYm9keS5cblx0ICogQHBhcmFtIHtPYmplY3R9ICBvcHRpb25zIE9iamVjdCB3aXRoIG9wdGlvbnMuXG5cdCAqL1xuXHRmdW5jdGlvbiBGUFNNZXRlcihhbmNob3IsIG9wdGlvbnMpIHtcblx0XHQvLyBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAodHlwZShhbmNob3IpID09PSAnb2JqZWN0JyAmJiBhbmNob3Iubm9kZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucyA9IGFuY2hvcjtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghYW5jaG9yKSB7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdC8vIFByaXZhdGUgcHJvcGVydGllc1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgbyA9IGV4dGVuZCh7fSwgRlBTTWV0ZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0dmFyIGVsID0ge307XG5cdFx0dmFyIGNvbHMgPSBbXTtcblx0XHR2YXIgdGhlbWUsIGhlYXRtYXBzO1xuXHRcdHZhciBoZWF0RGVwdGggPSAxMDA7XG5cdFx0dmFyIGhlYXRpbmcgPSBbXTtcblxuXHRcdHZhciB0aGlzRnJhbWVUaW1lID0gMDtcblx0XHR2YXIgZnJhbWVUaW1lID0gby50aHJlc2hvbGQ7XG5cdFx0dmFyIGZyYW1lU3RhcnQgPSAwO1xuXHRcdHZhciBsYXN0TG9vcCA9IGdldFRpbWUoKSAtIGZyYW1lVGltZTtcblx0XHR2YXIgdGltZTtcblxuXHRcdHZhciBmcHNIaXN0b3J5ID0gW107XG5cdFx0dmFyIGR1cmF0aW9uSGlzdG9yeSA9IFtdO1xuXG5cdFx0dmFyIGZyYW1lSUQsIHJlbmRlcklEO1xuXHRcdHZhciBzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblx0XHR2YXIgZ3JhcGhIZWlnaHQsIGNvdW50LCBpLCBqO1xuXG5cdFx0Ly8gRXhwb3NlZCBwcm9wZXJ0aWVzXG5cdFx0c2VsZi5vcHRpb25zID0gbztcblx0XHRzZWxmLmZwcyA9IDA7XG5cdFx0c2VsZi5kdXJhdGlvbiA9IDA7XG5cdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cblx0XHQvKipcblx0XHQgKiBUaWNrIHN0YXJ0IGZvciBtZWFzdXJpbmcgdGhlIGFjdHVhbCByZW5kZXJpbmcgZHVyYXRpb24uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnJhbWVTdGFydCA9IGdldFRpbWUoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRlBTIHRpY2suXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHR0aGlzRnJhbWVUaW1lID0gdGltZSAtIGxhc3RMb29wO1xuXHRcdFx0ZnJhbWVUaW1lICs9ICh0aGlzRnJhbWVUaW1lIC0gZnJhbWVUaW1lKSAvIG8uc21vb3RoaW5nO1xuXHRcdFx0c2VsZi5mcHMgPSAxMDAwIC8gZnJhbWVUaW1lO1xuXHRcdFx0c2VsZi5kdXJhdGlvbiA9IGZyYW1lU3RhcnQgPCBsYXN0TG9vcCA/IGZyYW1lVGltZSA6IHRpbWUgLSBmcmFtZVN0YXJ0O1xuXHRcdFx0bGFzdExvb3AgPSB0aW1lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBQYXVzZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAxO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKHJlbmRlcklEKTtcblx0XHRcdFx0ZnJhbWVJRCA9IHJlbmRlcklEID0gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXN1bWUgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXHRcdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgT3B0aW9uIG5hbWUuXG5cdFx0ICogQHBhcmFtIHtNaXhlZH0gIHZhbHVlIE5ldyB2YWx1ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdG9bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXG5cdFx0XHQvLyBSZWJ1aWxkIG9yIHJlcG9zaXRpb24gZWxlbWVudHMgd2hlbiBzcGVjaWZpYyBvcHRpb24gaGFzIGJlZW4gdXBkYXRlZFxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVidWlsZGVycykgIT09IC0xKSB7XG5cdFx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZXBvc2l0aW9uZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIHJlbmRlcmluZyBkdXJhdGlvbiBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ21zJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gRlBTIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0ZwcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZXMgYmV0d2VlbiBzaG93OiAnZnBzJyBhbmQgc2hvdzogJ2R1cmF0aW9uJy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsIHNob3dGcHMgPyAnbXMnIDogJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhpZGUgdGhlIEZQU01ldGVyLiBBbHNvIHBhdXNlcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG93IHRoZSBGUFNNZXRlci4gQWxzbyByZXN1bWVzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucmVzdW1lKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgdGhlIGN1cnJlbnQgRlBTIGFuZCBzYXZlIGl0IGluIGhpc3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhpc3RvcnlUaWNrKCkge1xuXHRcdFx0Zm9yIChpID0gby5oaXN0b3J5OyBpLS07KSB7XG5cdFx0XHRcdGZwc0hpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5mcHMgOiBmcHNIaXN0b3J5W2ktMV07XG5cdFx0XHRcdGR1cmF0aW9uSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmR1cmF0aW9uIDogZHVyYXRpb25IaXN0b3J5W2ktMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBoZWF0IGhleCBjb2xvciBiYXNlZCBvbiB2YWx1ZXMgcGFzc2VkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gaGVhdG1hcFxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbHVlXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWluXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWF4XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhlYXQoaGVhdG1hcCwgdmFsdWUsIG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gaGVhdG1hcHNbMHxoZWF0bWFwXVtNYXRoLnJvdW5kKE1hdGgubWluKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIGhlYXREZXB0aCwgaGVhdERlcHRoKSldO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBjb3VudGVyIG51bWJlciBhbmQgbGVnZW5kLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZCBvbmx5IHdoZW4gY2hhbmdlZFxuXHRcdFx0aWYgKGVsLmxlZ2VuZC5mcHMgIT09IHNob3dGcHMpIHtcblx0XHRcdFx0ZWwubGVnZW5kLmZwcyA9IHNob3dGcHM7XG5cdFx0XHRcdGVsLmxlZ2VuZFt0ZXh0UHJvcF0gPSBzaG93RnBzID8gJ0ZQUycgOiAnbXMnO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVXBkYXRlIGNvdW50ZXIgd2l0aCBhIG5pY2VseSBmb3JtYXRlZCAmIHJlYWRhYmxlIG51bWJlclxuXHRcdFx0Y291bnQgPSBzaG93RnBzID8gc2VsZi5mcHMgOiBzZWxmLmR1cmF0aW9uO1xuXHRcdFx0ZWwuY291bnRbdGV4dFByb3BdID0gY291bnQgPiA5OTkgPyAnOTk5KycgOiBjb3VudC50b0ZpeGVkKGNvdW50ID4gOTkgPyAwIDogby5kZWNpbWFscyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVuZGVyIGN1cnJlbnQgRlBTIHN0YXRlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0Ly8gSWYgcmVuZGVyZXIgc3RvcHBlZCByZXBvcnRpbmcsIGRvIGEgc2ltdWxhdGVkIGRyb3AgdG8gMCBmcHNcblx0XHRcdGlmIChsYXN0TG9vcCA8IHRpbWUgLSBvLnRocmVzaG9sZCkge1xuXHRcdFx0XHRzZWxmLmZwcyAtPSBzZWxmLmZwcyAvIE1hdGgubWF4KDEsIG8uc21vb3RoaW5nICogNjAgLyBvLmludGVydmFsKTtcblx0XHRcdFx0c2VsZi5kdXJhdGlvbiA9IDEwMDAgLyBzZWxmLmZwcztcblx0XHRcdH1cblxuXHRcdFx0aGlzdG9yeVRpY2soKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwbHkgaGVhdCB0byBlbGVtZW50c1xuXHRcdFx0aWYgKG8uaGVhdCkge1xuXHRcdFx0XHRpZiAoaGVhdGluZy5sZW5ndGgpIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBoZWF0aW5nLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0aGVhdGluZ1tpXS5lbC5zdHlsZVt0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZnBzLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5kdXJhdGlvbiwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbC5ncmFwaCAmJiB0aGVtZS5jb2x1bW4uaGVhdE9uKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gY29scy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGNvbHNbaV0uc3R5bGVbdGhlbWUuY29sdW1uLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZnBzSGlzdG9yeVtpXSwgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZHVyYXRpb25IaXN0b3J5W2ldLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBncmFwaCBjb2x1bW5zIGhlaWdodFxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvLmhpc3Rvcnk7IGorKykge1xuXHRcdFx0XHRcdGNvbHNbal0uc3R5bGUuaGVpZ2h0ID0gKHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0KGZwc0hpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby5tYXhGcHMgKiBNYXRoLm1pbihmcHNIaXN0b3J5W2pdLCBvLm1heEZwcykpIDogMCkgOlxuXHRcdFx0XHRcdFx0KGR1cmF0aW9uSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLnRocmVzaG9sZCAqIE1hdGgubWluKGR1cmF0aW9uSGlzdG9yeVtqXSwgby50aHJlc2hvbGQpKSA6IDApXG5cdFx0XHRcdFx0KSArICdweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXF1ZXN0IHJlbmRlcmluZyBsb29wLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50fSBBbmltYXRpb24gZnJhbWUgaW5kZXguXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVxdWVzdFJlbmRlcigpIHtcblx0XHRcdGlmIChvLmludGVydmFsIDwgMjApIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHJBRihyZXF1ZXN0UmVuZGVyKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmcmFtZUlEID0gc2V0VGltZW91dChyZXF1ZXN0UmVuZGVyLCBvLmludGVydmFsKTtcblx0XHRcdFx0cmVuZGVySUQgPSByQUYocmVuZGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBNZXRlciBldmVudHMgaGFuZGxlci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50KSB7XG5cdFx0XHRldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblx0XHRcdGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cdFx0XHRcdGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLnRvZ2dsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTdG9wIHJlbmRlcmluZ1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0Ly8gU3RvcCBsaXN0ZW5pbmdcblx0XHRcdHNlbGYudGljayA9IHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge307XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW1vdmVNZXRlcigpIHtcblx0XHRcdC8vIFVuYmluZCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyLCAxKTtcblx0XHRcdH1cblx0XHRcdC8vIERldGFjaCBlbGVtZW50XG5cdFx0XHRhbmNob3IucmVtb3ZlQ2hpbGQoZWwuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTZXRzIHRoZSB0aGVtZSwgYW5kIGdlbmVyYXRlcyBoZWF0bWFwcyB3aGVuIG5lZWRlZC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzZXRUaGVtZSgpIHtcblx0XHRcdHRoZW1lID0gRlBTTWV0ZXIudGhlbWVbby50aGVtZV07XG5cblx0XHRcdC8vIEdlbmVyYXRlIGhlYXRtYXBzXG5cdFx0XHRoZWF0bWFwcyA9IHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgfHwgW107XG5cdFx0XHRpZiAoIWhlYXRtYXBzLmxlbmd0aCAmJiB0aGVtZS5oZWF0bWFwcy5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHRoZW1lLmhlYXRtYXBzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0aGVhdG1hcHNbal0gPSBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IGhlYXREZXB0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRoZWF0bWFwc1tqXVtpXSA9IGhzbFRvSGV4KDAuMzMgLyBoZWF0RGVwdGggKiBpLCB0aGVtZS5oZWF0bWFwc1tqXS5zYXR1cmF0aW9uLCB0aGVtZS5oZWF0bWFwc1tqXS5saWdodG5lc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGVtZS5jb21waWxlZEhlYXRtYXBzID0gaGVhdG1hcHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhbmQgYXR0YWNoZXMgdGhlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGNyZWF0ZU1ldGVyKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIG9sZCBtZXRlciBpZiBwcmVzZW50XG5cdFx0XHRpZiAoZWwuY29udGFpbmVyKSB7XG5cdFx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGVtZVxuXHRcdFx0c2V0VGhlbWUoKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGVsZW1lbnRzXG5cdFx0XHRlbC5jb250YWluZXIgPSBhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29udGFpbmVyKTtcblx0XHRcdGVsLmNvdW50ID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb3VudCkpO1xuXHRcdFx0ZWwubGVnZW5kID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5sZWdlbmQpKTtcblx0XHRcdGVsLmdyYXBoID0gby5ncmFwaCA/IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuZ3JhcGgpKSA6IDA7XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byBoZWF0aW5nIGFycmF5XG5cdFx0XHRoZWF0aW5nLmxlbmd0aCA9IDA7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZWwpIHtcblx0XHRcdFx0aWYgKGVsW2tleV0gJiYgdGhlbWVba2V5XS5oZWF0T24pIHtcblx0XHRcdFx0XHRoZWF0aW5nLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRcdFx0ZWw6IGVsW2tleV1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHcmFwaFxuXHRcdFx0Y29scy5sZW5ndGggPSAwO1xuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBncmFwaFxuXHRcdFx0XHRlbC5ncmFwaC5zdHlsZS53aWR0aCA9IChvLmhpc3RvcnkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyAoby5oaXN0b3J5IC0gMSkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXG5cdFx0XHRcdC8vIEFkZCBjb2x1bW5zXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBvLmhpc3Rvcnk7IGkrKykge1xuXHRcdFx0XHRcdGNvbHNbaV0gPSBlbC5ncmFwaC5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29sdW1uKSk7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5ib3R0b20gPSAwO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucmlnaHQgPSAoaSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIGkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUud2lkdGggPSB0aGVtZS5jb2x1bW4ud2lkdGggKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG5cdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGVuZCBjb250YWluZXIgdG8gYW5jaG9yXG5cdFx0XHRhbmNob3IuYXBwZW5kQ2hpbGQoZWwuY29udGFpbmVyKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgZ3JhcGggaGVpZ2h0IGFmdGVyIGl0IHdhcyBhcHBlbmRlZCB0byBET01cblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRncmFwaEhlaWdodCA9IGVsLmdyYXBoLmNsaWVudEhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0aWYgKG8udG9nZ2xlT24gPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRlbC5jb250YWluZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBQb3NpdGlvbnMgdGhlIG1ldGVyIGJhc2VkIG9uIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHBvc2l0aW9uTWV0ZXIoKSB7XG5cdFx0XHRhcHBseVRoZW1lKGVsLmNvbnRhaW5lciwgbyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29uc3RydWN0LlxuXHRcdCAqL1xuXHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBDcmVhdGUgbWV0ZXIgZWxlbWVudFxuXHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdC8vIFN0YXJ0IHJlbmRlcmluZ1xuXHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdH0oKSk7XG5cdH1cblxuXHQvLyBFeHBvc2UgdGhlIGV4dGVuZCBmdW5jdGlvblxuXHRGUFNNZXRlci5leHRlbmQgPSBleHRlbmQ7XG5cblx0Ly8gRXhwb3NlIHRoZSBGUFNNZXRlciBjbGFzc1xuXHR3aW5kb3cuRlBTTWV0ZXIgPSBGUFNNZXRlcjtcblxuXHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0RlBTTWV0ZXIuZGVmYXVsdHMgPSB7XG5cdFx0aW50ZXJ2YWw6ICAxMDAsICAgICAvLyBVcGRhdGUgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHNtb290aGluZzogMTAsICAgICAgLy8gU3Bpa2Ugc21vb3RoaW5nIHN0cmVuZ3RoLiAxIG1lYW5zIG5vIHNtb290aGluZy5cblx0XHRzaG93OiAgICAgICdmcHMnLCAgIC8vIFdoZXRoZXIgdG8gc2hvdyAnZnBzJywgb3IgJ21zJyA9IGZyYW1lIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cblx0XHR0b2dnbGVPbjogICdjbGljaycsIC8vIFRvZ2dsZSBiZXR3ZWVuIHNob3cgJ2ZwcycgYW5kICdtcycgb24gdGhpcyBldmVudC5cblx0XHRkZWNpbWFsczogIDEsICAgICAgIC8vIE51bWJlciBvZiBkZWNpbWFscyBpbiBGUFMgbnVtYmVyLiAxID0gNTkuOSwgMiA9IDU5Ljk0LCAuLi5cblx0XHRtYXhGcHM6ICAgIDYwLCAgICAgIC8vIE1heCBleHBlY3RlZCBGUFMgdmFsdWUuXG5cdFx0dGhyZXNob2xkOiAxMDAsICAgICAvLyBNaW5pbWFsIHRpY2sgcmVwb3J0aW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblxuXHRcdC8vIE1ldGVyIHBvc2l0aW9uXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIE1ldGVyIHBvc2l0aW9uLlxuXHRcdHpJbmRleDogICAxMCwgICAgICAgICAvLyBNZXRlciBaIGluZGV4LlxuXHRcdGxlZnQ6ICAgICAnNXB4JywgICAgICAvLyBNZXRlciBsZWZ0IG9mZnNldC5cblx0XHR0b3A6ICAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgdG9wIG9mZnNldC5cblx0XHRyaWdodDogICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgcmlnaHQgb2Zmc2V0LlxuXHRcdGJvdHRvbTogICAnYXV0bycsICAgICAvLyBNZXRlciBib3R0b20gb2Zmc2V0LlxuXHRcdG1hcmdpbjogICAnMCAwIDAgMCcsICAvLyBNZXRlciBtYXJnaW4uIEhlbHBzIHdpdGggY2VudGVyaW5nIHRoZSBjb3VudGVyIHdoZW4gbGVmdDogNTAlO1xuXG5cdFx0Ly8gVGhlbWVcblx0XHR0aGVtZTogJ2RhcmsnLCAvLyBNZXRlciB0aGVtZS4gQnVpbGQgaW46ICdkYXJrJywgJ2xpZ2h0JywgJ3RyYW5zcGFyZW50JywgJ2NvbG9yZnVsJy5cblx0XHRoZWF0OiAgMCwgICAgICAvLyBBbGxvdyB0aGVtZXMgdG8gdXNlIGNvbG9yaW5nIGJ5IEZQUyBoZWF0LiAwIEZQUyA9IHJlZCwgbWF4RnBzID0gZ3JlZW4uXG5cblx0XHQvLyBHcmFwaFxuXHRcdGdyYXBoOiAgIDAsIC8vIFdoZXRoZXIgdG8gc2hvdyBoaXN0b3J5IGdyYXBoLlxuXHRcdGhpc3Rvcnk6IDIwIC8vIEhvdyBtYW55IGhpc3Rvcnkgc3RhdGVzIHRvIHNob3cgaW4gYSBncmFwaC5cblx0fTtcblxuXHQvLyBPcHRpb24gbmFtZXMgdGhhdCB0cmlnZ2VyIEZQU01ldGVyIHJlYnVpbGQgb3IgcmVwb3NpdGlvbiB3aGVuIG1vZGlmaWVkXG5cdHZhciByZWJ1aWxkZXJzID0gW1xuXHRcdCd0b2dnbGVPbicsXG5cdFx0J3RoZW1lJyxcblx0XHQnaGVhdCcsXG5cdFx0J2dyYXBoJyxcblx0XHQnaGlzdG9yeSdcblx0XTtcblx0dmFyIHJlcG9zaXRpb25lcnMgPSBbXG5cdFx0J3Bvc2l0aW9uJyxcblx0XHQnekluZGV4Jyxcblx0XHQnbGVmdCcsXG5cdFx0J3RvcCcsXG5cdFx0J3JpZ2h0Jyxcblx0XHQnYm90dG9tJyxcblx0XHQnbWFyZ2luJ1xuXHRdO1xufSh3aW5kb3cpKTtcbjsoZnVuY3Rpb24gKHcsIEZQU01ldGVyLCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIFRoZW1lcyBvYmplY3Rcblx0RlBTTWV0ZXIudGhlbWUgPSB7fTtcblxuXHQvLyBCYXNlIHRoZW1lIHdpdGggbGF5b3V0LCBubyBjb2xvcnNcblx0dmFyIGJhc2UgPSBGUFNNZXRlci50aGVtZS5iYXNlID0ge1xuXHRcdGhlYXRtYXBzOiBbXSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBhZGRpbmc6ICc1cHgnLFxuXHRcdFx0bWluV2lkdGg6ICc5NXB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMwcHgnLFxuXHRcdFx0dGV4dEFsaWduOiAncmlnaHQnLFxuXHRcdFx0dGV4dFNoYWRvdzogJ25vbmUnXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRyaWdodDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMjRweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnQ29uc29sYXMsIEFuZGFsZSBNb25vLCBtb25vc3BhY2UnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0bGVmdDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzJweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0Jyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0Ym94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0TW96Qm94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHR6SW5kZXg6IDFcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdHdpZHRoOiA0LFxuXHRcdFx0c3BhY2luZzogMSxcblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGxcblx0XHR9XG5cdH07XG5cblx0Ly8gRGFyayB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5kYXJrID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuOFxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMyMjInLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCAjMWExYTFhJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgIzIyMidcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMzZjNmM2YnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBMaWdodCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5saWdodCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGNvbG9yOiAnIzY2NicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpLCAtMXB4IC0xcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjZWFlYWVhJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gQ29sb3JmdWwgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuY29sb3JmdWwgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC42XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0YmFja2dyb3VuZDogJyM4ODgnLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuMiknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzc3NycsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yKSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRyYW5zcGFyZW50IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLnRyYW5zcGFyZW50ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0cGFkZGluZzogMCxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDJweCdcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHRoZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHR3aWR0aDogNSxcblx0XHRcdGJhY2tncm91bmQ6ICcjOTk5Jyxcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHR9XG5cdH0pO1xufSh3aW5kb3csIEZQU01ldGVyKSk7IiwiaW1wb3J0ICcuL2xpYi90aW55LWNhbnZhcy5qcyc7XG5pbXBvcnQgJy4vbGliL3NvdW5kcy5qcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHJlamVjdHMgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICdmcHNtZXRlcic7XG5cbmRlY2xhcmUgdmFyIGZpcmVTb3VuZDogYW55O1xuZGVjbGFyZSB2YXIganVtcFNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBoaXRTb3VuZDogYW55O1xuZGVjbGFyZSB2YXIgRlBTTWV0ZXI6IGFueTtcblxuY29uc3QgZnBzTSA9IG5ldyBGUFNNZXRlcigpO1xuXG5kZWNsYXJlIHZhciBUQzogYW55O1xuZGVjbGFyZSB2YXIgVENUZXg6IGFueTtcblxuaW50ZXJmYWNlIFZlY3RvciB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cbmludGVyZmFjZSBCdWxsZXQgZXh0ZW5kcyBCb2R5IHtcbn1cbmludGVyZmFjZSBCb2R5IHtcbiAgcG9zaXRpb246IFZlY3RvclxuICB2ZWxvY2l0eTogVmVjdG9yXG4gIGRpcjogRGlyXG4gIGhlaWdodDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgdmlzaWJsZTogYm9vbGVhblxufVxuaW50ZXJmYWNlIFBsYXllciBleHRlbmRzIEJvZHkge1xuICBzaG9vdGluZzogYm9vbGVhblxufVxuaW50ZXJmYWNlIEVuZW15IGV4dGVuZHMgQm9keSB7XG59XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIHBsYXllcjogUGxheWVyXG4gIGVuZW1pZXM6IEVuZW15W11cbiAgYnVsbGV0czogQnVsbGV0W11cbn1cblxuaW50ZXJmYWNlIEltZ1RleHR1cmUge1xuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIHRleHQ6IFdlYkdMVGV4dHVyZVxufVxuZW51bSBEaXIge1xuICBMZWZ0LFxuICBSaWdodFxufVxuXG5lbnVtIEV2ZW50VHlwZSB7XG4gIFJpZ2h0UHJlc3NlZCxcbiAgTGVmdFJlbGVhc2VkLFxuICBSaWdodFJlbGVhc2VkLFxuICBMZWZ0UHJlc3NlZCxcbiAgSnVtcFByZXNzZWQsXG4gIFVzZVByZXNzZWQsXG4gIEF0dGFja1ByZXNzZWQsXG4gIEF0dGFja1JlbGVhc2VkXG59XG5cbnR5cGUgQWN0aW9uID0gRXZlbnRUeXBlXG50eXBlIE1vZGVsID0gU3RhdGU7XG52YXIgY2FudmFzID0gVEMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MnKSlcbmludGVyZmFjZSBBQUJCIHtcbiAgbHQ6IFZlY3RvclxuICBydDogVmVjdG9yXG4gIHJiOiBWZWN0b3JcbiAgbGI6IFZlY3RvclxufVxuXG5mdW5jdGlvbiByZG5BbmdsZSgpOiBudW1iZXJ7XG4gIGNvbnN0IHYgPSAoTWF0aC5yYW5kb20oKSAqICgxMjUtMCkgKyAwKS8xMDAwXG4gIGlmKE1hdGgucmFuZG9tKCkgPj0gMC41KXtcbiAgICAgIHJldHVybiAoMi12KSAqIE1hdGguUEkgXG4gIH1lbHNle1xuICAgICAgcmV0dXJuIHYgKiBNYXRoLlBJXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QUFCQihiOiBCb2R5KTogQUFCQiB7XG4gIHJldHVybiB7XG4gICAgbHQ6IHsgeDogYi5wb3NpdGlvbi54LCB5OiBiLnBvc2l0aW9uLnkgfSxcbiAgICBydDogeyB4OiBiLnBvc2l0aW9uLnggKyBiLndpZHRoLCB5OiBiLnBvc2l0aW9uLnkgfSxcbiAgICByYjogeyB4OiBiLnBvc2l0aW9uLnggKyBiLndpZHRoLCB5OiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCB9LFxuICAgIGxiOiB7IHg6IGIucG9zaXRpb24ueCwgeTogYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRpbGVJbmRlY2VzKHY6IFZlY3Rvcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKHYueSAvIDIwIC8qIHRpbGVTaXplICovKSAqIDUwIC8qIHdvcmxkU2l6ZSAqLyArIE1hdGguZmxvb3Iodi54IC8gMjApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlkZShib2R5MTogQm9keSwgYm9keTI6IEJvZHkpOiBib29sZWFuIHtcbiAgY29uc3QgcmVzdWx0ID0gYm9keTEucG9zaXRpb24ueCA8IChib2R5Mi5wb3NpdGlvbi54ICsgYm9keTIud2lkdGgpICYmXG4gICAgYm9keTEucG9zaXRpb24ueCArIChib2R5MS53aWR0aCkgPiBib2R5Mi5wb3NpdGlvbi54ICYmXG4gICAgYm9keTEucG9zaXRpb24ueSA8IGJvZHkyLnBvc2l0aW9uLnkgKyBib2R5Mi5oZWlnaHQgJiZcbiAgICBib2R5MS5wb3NpdGlvbi55ICsgYm9keTEuaGVpZ2h0ID4gYm9keTIucG9zaXRpb24ueTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbG9hZFRleHR1cmVzKHVybHM6IHN0cmluZ1tdKTogUHJvbWlzZTxJbWdUZXh0dXJlW10+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlciwgcmVqZWN0cykgPT4ge1xuICAgIGxldCByZXN1bHQ6IEltZ1RleHR1cmVbXSA9IG5ldyBBcnJheTxJbWdUZXh0dXJlPigpO1xuXG4gICAgdXJscy5mb3JFYWNoKCh1cmwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2VcbiAgICAgIGltZy5zcmMgPSB1cmxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICBnLmNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0XG4gICAgICAgIGcuY2FudmFzLndpZHRoID0gaW1nLndpZHRoXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBjb25zdCB0ZXgxID0ge1xuICAgICAgICAgIHdpZHRoOiBpbWcud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBpbWcuaGVpZ2h0LFxuICAgICAgICAgIHRleHQ6IFRDVGV4KGNhbnZhcy5nLCBnLmNhbnZhcywgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KSBhcyBXZWJHTFRleHR1cmVcbiAgICAgICAgfVxuXG4gICAgICAgIGcuY2xlYXJSZWN0KDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5zYXZlKClcbiAgICAgICAgZy5zY2FsZSgtMSwgMSlcbiAgICAgICAgZy5kcmF3SW1hZ2UoaW1nLCBpbWcud2lkdGggKiAtMSwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBnLnJlc3RvcmUoKVxuICAgICAgICBjb25zdCB0ZXgyID0ge1xuICAgICAgICAgIHdpZHRoOiBpbWcud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBpbWcuaGVpZ2h0LFxuICAgICAgICAgIHRleHQ6IFRDVGV4KGNhbnZhcy5nLCBnLmNhbnZhcywgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KSBhcyBXZWJHTFRleHR1cmVcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGkgPSBpbmRleCoyO1xuICAgICAgICByZXN1bHRbaSsrXSA9IHRleDFcbiAgICAgICAgcmVzdWx0W2ldID0gdGV4MlxuICAgICAgICBpZiAoaW5kZXggPT0gdXJscy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlcihyZXN1bHQpXG4gICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1bGxldFRleHR1cmUoKXtcbiAgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpXG4gIGcuY2FudmFzLndpZHRoID0gNFxuICBnLmNhbnZhcy5oZWlnaHQgPSA0XG4gIGcuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gIGcuZmlsbFN0eWxlID0gJyNmZjYnO1xuICBnLmJlZ2luUGF0aCgpO1xuICBnLmFyYygyLCAyLCAyLCAwLCAyICogTWF0aC5QSSk7XG4gIGcuZmlsbCgpXG4gIHJldHVybiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIDQsIDQpIGFzIFdlYkdMVGV4dHVyZVxufVxuXG5sb2FkVGV4dHVyZXMoW1wibW91bnRhaW4ucG5nXCIsXCJmbG9vci5wbmdcIiwgXCJzb2xkaWVyX3J1bi5wbmdcIiwgXCJzb2xkaWVyX2lkbGUucG5nXCIsIFwic29sZGllcl9zaG9vdGluZy5wbmdcIiwgXCJib3QucG5nXCJdKS50aGVuKCh0ZXh0dXJlcykgPT4ge1xuICBjb25zdCBbck1vdW50YWluLGxNb3VudGFpbixyaWdodEZsb29yLGxlZnRGbG9vciwgcmlnaHRSdW4sIGxlZnRSdW4sIHJpZ2h0SWRsZSwgbGVmdElkbGUsIHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgcmlnaHRCb3QsIGxlZnRCb3RdID0gdGV4dHVyZXNcblxuICBjb25zdCBidWxsZXRUZXh0dXJlID0gY3JlYXRlQnVsbGV0VGV4dHVyZSgpXG5cbiAgbGV0IGN1cnJlbnREZWx0YSA9IDAuMFxuICBsZXQgY3VycmVudFRpbWUgPSAwLjBcbiAgbGV0IGN1cnJlbnRBY3Rpb246IEFjdGlvbiA9IG51bGxcbiAgY29uc3QgR1JBVklUWSA9IDEwXG5cbiAgY29uc3QgSlVNUF9WRUwgPSAzMFxuICBjb25zdCBXQUxLX1NQRUVEID0gNlxuICBsZXQgc3RhcnRUaW1lID0gMDtcbiAgbGV0IGlkID0gMDtcbiAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gW2NhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodF1cblxuICBmdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xuICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiAoZXZ0LmNsaWVudFggLSByZWN0LmxlZnQpKjAuMyxcbiAgICAgIHk6IChldnQuY2xpZW50WSAtIHJlY3QudG9wKSAqIDAuMTVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGluaXRCdWxsZXRzKG51bTogbnVtYmVyKTogQnVsbGV0W10ge1xuICAgIGNvbnN0IGJzOiBCdWxsZXRbXSA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgYnMucHVzaCh7IHBvc2l0aW9uOiB7IHg6IDUwLCB5OiA1MCB9LCB2ZWxvY2l0eTogeyB4OiAwLCB5OiAwIH0sIHZpc2libGU6IGZhbHNlLCBkaXI6IERpci5MZWZ0LCB3aWR0aDogNCwgaGVpZ2h0OiA0IH0pXG4gICAgfVxuICAgIHJldHVybiBic1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3RW5lbXkoeDogbnVtYmVyLCB5Om51bWJlciwgdmVsOiBudW1iZXIpOiBFbmVteSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uOiB7IHg6IHgsIHk6IHkgfSxcbiAgICAgIHZlbG9jaXR5OiB7IHg6IHZlbCwgeTogMC4wIH0sXG4gICAgICBkaXI6IERpci5MZWZ0LFxuICAgICAgd2lkdGg6IDIwLFxuICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgIHZpc2libGU6IHRydWVcbiAgICB9XG4gIH1cblxuICBjYW52YXMuZy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBvcyA9IGdldE1vdXNlUG9zKGNhbnZhcy5nLmNhbnZhcywgZXZlbnQpXG4gICAgY29uc29sZS5sb2cocG9zKVxuIC8vICAgY29uc3QgdmVsID0gV0FMS19TUEVFRCAqIChNYXRoLnJhbmRvbSgpICogKDMgLSAxKSArIDEpLzIgXG4gIC8vICB3aW5kb3dbXCJzdGF0ZVwiXS5lbmVtaWVzLnB1c2gobmV3RW5lbXkocG9zLngscG9zLnksIHZlbCkpXG4gIH0pXG5cbiAgbGV0IGN1cnJlbnRTdGF0ZTogTW9kZWwgPSB7XG4gICAgcGxheWVyOiB7XG4gICAgICBwb3NpdGlvbjogeyB4OiAxMjgsIHk6IDAuMCB9LFxuICAgICAgdmVsb2NpdHk6IHsgeDogMC4wLCB5OiAwLjAgfSxcbiAgICAgIGRpcjogRGlyLlJpZ2h0LFxuICAgICAgc2hvb3Rpbmc6IGZhbHNlLFxuICAgICAgd2lkdGg6IDIwLFxuICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgIHZpc2libGU6IHRydWVcbiAgICB9LFxuICAgIGVuZW1pZXM6IFtuZXdFbmVteSgzNCwyNCxXQUxLX1NQRUVEKV0sXG4gICAgYnVsbGV0czogaW5pdEJ1bGxldHMoMTApXG4gIH1cbiAgY29uc3QgRkxPT1IgPSBoZWlnaHQgLSAxMFxuICBjb25zdCBTRUNPTkRfRkxPT1IgPSBGTE9PUiAqIDAuN1xuXG4gIGNvbnN0IHNlY29uZEZsb29yQm9keTogQm9keSA9IHtwb3NpdGlvbjp7eDowLjAsIHk6IFNFQ09ORF9GTE9PUn0sd2lkdGg6IDYwLCBoZWlnaHQ6IDIwLGRpcjogRGlyLkxlZnQsdmVsb2NpdHk6e3g6MCx5OjB9LHZpc2libGU6IHRydWV9XG4gIGNvbnN0IHNlY29uZEZsb29yQm9keVNlZzI6IEJvZHkgPSB7cG9zaXRpb246e3g6MTkwLjAsIHk6IFNFQ09ORF9GTE9PUn0sd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCxkaXI6IERpci5MZWZ0LHZlbG9jaXR5Ont4OjAseTowfSx2aXNpYmxlOiB0cnVlfVxuICBjb25zdCBmbG9vcnMgPSBbc2Vjb25kRmxvb3JCb2R5LHNlY29uZEZsb29yQm9keVNlZzJdXG5cbiAgd2luZG93W1wic3RhdGVcIl0gPSBjdXJyZW50U3RhdGVcblxuICBjb25zdCBrZWVwQW5pbWF0aW9uID0gKHRpbWU6IG51bWJlcikgPT4ge1xuICAgIGN1cnJlbnREZWx0YSA9ICh0aW1lIC0gc3RhcnRUaW1lKSAvIDEwMDtcbiAgICBjdXJyZW50VGltZSA9IHRpbWVcbiAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgIFxuICAgIHJlbmRlcihjdXJyZW50U3RhdGUpXG4gICAgdXBkYXRlKGN1cnJlbnRBY3Rpb24sIGN1cnJlbnRTdGF0ZSlcbiAgICBjdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9XG5cblxuICBjb25zdCBoYW5kbGVyU3RhcnQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSnVtcFByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1ByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxlZnRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYW5kbGVyRW5kID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1JlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UmVsZWFzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicmVjdFwiKTtcbiAgY29uc3QgcHNPcCA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICBzdmdzLmZvckVhY2gocmVjID0+IHtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICB9KTtcblxuICBjb25zdCBoYW5kbGVyS0JEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5KdW1wUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTM6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuVXNlUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQXR0YWNrUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyS0JEb3duLCB0cnVlKTtcblxuICBjb25zdCBoYW5kbGVyS0JVcCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcktCVXAsIHRydWUpO1xuXG4gIGZ1bmN0aW9uIEJvZHlBbmltYXRpb24oXG4gICAgcmlnaHRUOiBJbWdUZXh0dXJlLFxuICAgIGxlZnRUOiBJbWdUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIHAucG9zaXRpb24ueCArIChwLndpZHRoIC8gMiksXG4gICAgICAgIHAucG9zaXRpb24ueSxcbiAgICAgICAgcC53aWR0aCxcbiAgICAgICAgcC5oZWlnaHQsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbi8qICAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLHNlY29uZEZsb29yQm9keSk7XG4gIH1cbiAqL1xuICBmdW5jdGlvbiBpc092ZXJGbG9vcihiOiBCb2R5KTogYm9vbGVhbntcbiAgICBsZXQgZmxvb3JCb3R0b21zOiBib29sZWFuID0gZmFsc2U7XG4gICAgZm9yKHZhciBpPTA7aTxmbG9vcnMubGVuZ3RoO2krKyl7XG4gICAgICBmbG9vckJvdHRvbXMgPSBmbG9vckJvdHRvbXMgfHwgY29sbGlkZUZsb29yQm90dG9tKGIsZmxvb3JzW2ldKVxuICAgIH1cbiAgICByZXR1cm4gYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgPT0gRkxPT1IgfHwgZmxvb3JCb3R0b21zO1xuICB9XG5cbiAgY29uc3QgYm90QW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0Qm90LCBsZWZ0Qm90LCA1LCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaWRsZUFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodElkbGUsIGxlZnRJZGxlLCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IHJ1bkFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFJ1biwgbGVmdFJ1biwgOCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjJdLCBbMCwgLjIsIDEsIDAuNF0sIFswLCAuNCwgMSwgMC42XSwgWzAsIC42LCAxLCAwLjhdLCBbMCwgLjgsIDEsIDEuMF1dKVxuICBjb25zdCBzaG9vdGluZ0FuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFNob290LCBsZWZ0U2hvb3QsIDMsIGZhbHNlLCBbWzAsIDAsIDEsIDAuMjVdLCBbMCwgLjI1LCAxLCAwLjVdLCBbMCwgLjUsIDEsIDAuNzVdLCBbMCwgLjc1LCAxLCAxLjBdXSlcblxuICBsZXQgZ3VuUmVhZHk6IG51bWJlciA9IDBcbiAgbGV0IGp1bXBUcmllczpudW1iZXIgPSAyXG4gIGZ1bmN0aW9uIHVwZGF0ZShhOiBBY3Rpb24sIG06IE1vZGVsKSB7XG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgaWYgKGlzT3ZlckZsb29yKHApKSB7XG4gICAgICBqdW1wVHJpZXMgPSAyXG4gICAgfVxuICAgIHN3aXRjaCAoYSkge1xuICAgICAgY2FzZSBFdmVudFR5cGUuSnVtcFByZXNzZWQ6XG4gICAgICAgIGlmKGp1bXBUcmllcyA+IDApe1xuICAgICAgICAgIGp1bXBUcmllcy0tXG4gICAgICAgICAgcC52ZWxvY2l0eS55ID0gLUpVTVBfVkVMXG4gICAgICAgICAganVtcFNvdW5kKClcbiAgICAgICAgfVxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MZWZ0UHJlc3NlZDpcbiAgICAgICAgcC5kaXIgPSBEaXIuTGVmdFxuICAgICAgICBwLnZlbG9jaXR5LnggPSAtV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SaWdodFByZXNzZWQ6XG4gICAgICAgIHAuZGlyID0gRGlyLlJpZ2h0XG4gICAgICAgIHAudmVsb2NpdHkueCA9IFdBTEtfU1BFRURcbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkOlxuICAgICAgICBwLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuUmlnaHRSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkF0dGFja1ByZXNzZWQ6XG4gICAgICAgIHNob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIHAuc2hvb3RpbmcgPSB0cnVlXG4gICAgICAgIHAudmVsb2NpdHkueCA9IChwLmRpciA9PSBEaXIuTGVmdCA/IDEuNSA6IC0xLjUpXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICAgICAgaWYgKCFiLnZpc2libGUgJiYgZ3VuUmVhZHkgPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgYW5nbGUgPSByZG5BbmdsZSgpXG4gICAgICAgICAgICBiLnBvc2l0aW9uLnggPSBwLnBvc2l0aW9uLnggKyBwLndpZHRoICsgYi53aWR0aFxuICAgICAgICAgICAgYi5wb3NpdGlvbi55ID0gcC5wb3NpdGlvbi55ICsgKHAuaGVpZ2h0IC8gMi40KVxuICAgICAgICAgICAgYi52ZWxvY2l0eS54ID0gKHAuZGlyID09IERpci5SaWdodCA/IDM1IDogLTM1KSAqIE1hdGguY29zKGFuZ2xlKVxuICAgICAgICAgICAgYi52ZWxvY2l0eS55ID0gNSAqIE1hdGguc2luKGFuZ2xlKVxuICAgICAgICAgICAgYi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICAgICAgZ3VuUmVhZHkgPSA4XG4gICAgICAgICAgICBmaXJlU291bmQoKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICAvL3Auc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICAvL1Nob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1vdmUobS5wbGF5ZXIpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIG1vdmUoZSlcbiAgICAgIGlmIChlLnBvc2l0aW9uLnggPCAwIHx8IChlLnBvc2l0aW9uLnggKyAyMCA+IHdpZHRoKSkge1xuICAgICAgICBlLnZlbG9jaXR5LnggPSBlLnZlbG9jaXR5LnggKiAtMVxuICAgICAgICBlLmRpciA9IGUudmVsb2NpdHkueCA+IDAgPyBEaXIuTGVmdCA6IERpci5SaWdodFxuICAgICAgfVxuICAgICAgbS5idWxsZXRzLmZpbHRlcihiID0+IGIudmlzaWJsZSkuZm9yRWFjaChiID0+IHtcbiAgICAgICAgaWYgKGNvbGxpZGUoYiwgZSkpIHtcbiAgICAgICAgICBoaXRTb3VuZCgpXG4gICAgICAgICAgZS52ZWxvY2l0eS54ID0gLVdBTEtfU1BFRURcbiAgICAgICAgICBlLnBvc2l0aW9uLnggPSB3aWR0aCAtIGUud2lkdGhcbiAgICAgICAgICBlLnBvc2l0aW9uLnkgPSAxMjBcbiAgICAgICAgICBlLmRpciA9IERpci5SaWdodFxuICAgICAgICAgIGIudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgICAgYi52ZWxvY2l0eS54ID0gMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgbW92ZUJ1bGxldChiKVxuICAgIH1cblxuICAgIGd1blJlYWR5ID0gTWF0aC5tYXgoMCwgZ3VuUmVhZHkgLSAxKTtcbiAgfVxuXG4gIC8vY2FudmFzLnNjYWxlKDQsIDQpXG4gIGxldCB0ZXhEYXRhRmxvb3IgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IDIwICogMjAgKiA0OyBpKyspIHtcbiAgICB0ZXhEYXRhRmxvb3JbaV0gPSAxLjBcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlck1vdW50YWluKCkge1xuICAgIGNhbnZhcy5wdXNoKClcbiAgICBjYW52YXMuc2NhbGUoNiw2KVxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgMTAwOyB4ICs9IDIwKSB7XG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICBsTW91bnRhaW4udGV4dCxcbiAgICAgICAgeCxcbiAgICAgICAgNSxcbiAgICAgICAgbE1vdW50YWluLndpZHRoLFxuICAgICAgICBsTW91bnRhaW4uaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cbiAgICAgIGNhbnZhcy5wb3AoKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRmxvb3IoKSB7XG4gICAgZm9yICh2YXIgeCA9IHNlY29uZEZsb29yQm9keVNlZzIucG9zaXRpb24ueDsgeCA8PSBzZWNvbmRGbG9vckJvZHlTZWcyLnBvc2l0aW9uLngrc2Vjb25kRmxvb3JCb2R5U2VnMi53aWR0aCA7IHggKz0gMjApIHtcbiAgICAgIGNvbnN0IHRleHQgPSB4ICUgNyA9PSAwID8gbGVmdEZsb29yIDogcmlnaHRGbG9vclxuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgdGV4dC50ZXh0LFxuICAgICAgICB4LFxuICAgICAgICBzZWNvbmRGbG9vckJvZHlTZWcyLnBvc2l0aW9uLnktMTAsXG4gICAgICAgIHRleHQud2lkdGgsXG4gICAgICAgIHRleHQuaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgICAgfVxuXG4gICAgZm9yICh2YXIgeCA9IHNlY29uZEZsb29yQm9keS5wb3NpdGlvbi54OyB4IDw9IHNlY29uZEZsb29yQm9keS5wb3NpdGlvbi54K3NlY29uZEZsb29yQm9keS53aWR0aCA7IHggKz0gMjApIHtcbiAgICBjb25zdCB0ZXh0ID0geCAlIDcgPT0gMCA/IGxlZnRGbG9vciA6IHJpZ2h0Rmxvb3JcbiAgICBjYW52YXMuaW1nKFxuICAgICAgdGV4dC50ZXh0LFxuICAgICAgeCxcbiAgICAgIHNlY29uZEZsb29yQm9keS5wb3NpdGlvbi55LTEwLFxuICAgICAgdGV4dC53aWR0aCxcbiAgICAgIHRleHQuaGVpZ2h0LFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMVxuICAgICk7XG4gICAgfVxuICAgIFxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgMzAwOyB4ICs9IDIwKSB7XG4gICAgICBjb25zdCB0ZXh0ID0geCAlIDcgPT0gMCA/IGxlZnRGbG9vciA6IHJpZ2h0Rmxvb3JcblxuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgdGV4dC50ZXh0LFxuICAgICAgICB4LFxuICAgICAgICBGTE9PUi0xMCxcbiAgICAgICAgdGV4dC53aWR0aCxcbiAgICAgICAgdGV4dC5oZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICAgICk7XG5cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc05vdE9uRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0IDwgRkxPT1JcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52ZWxvY2l0eS55ID0gaXNOb3RPbkZsb29yKGIpICYmICFjb2xsaWRlRmxvb3JCb3R0b20oYixzZWNvbmRGbG9vckJvZHkpID8gYi52ZWxvY2l0eS55ICsgKEdSQVZJVFkgKiBjdXJyZW50RGVsdGEpIDogYi52ZWxvY2l0eS55XG4gIH1cblxuICBmdW5jdGlvbiBvdXRzaWRlU2NyZWVuKGI6IEJ1bGxldCkge1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnggPCAwIHx8IGIucG9zaXRpb24ueCA+IHdpZHRoXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQnVsbGV0KGI6IEJ1bGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRzaWRlU2NyZWVuKGIpKSB7XG4gICAgICBiLnZpc2libGUgPSBmYWxzZVxuICAgICAgYi52ZWxvY2l0eS54ID0gMFxuICAgIH1cbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gICAgYi5wb3NpdGlvbi55ICs9IGIudmVsb2NpdHkueSAqIGN1cnJlbnREZWx0YVxuICB9XG5cbiAgZnVuY3Rpb24gY29sbGlkZUZsb29yVG9wKGI6IEJvZHksIGY6IEJvZHkpOiBib29sZWFuIHtcbiAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBmLnBvc2l0aW9uLnkrKGYuaGVpZ2h0LzIpID4gYi5wb3NpdGlvbi55XG4gIH1cbiAgZnVuY3Rpb24gY29sbGlkZUZsb29yQm90dG9tKGI6IEJvZHksIGY6IEJvZHkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgYi5wb3NpdGlvbi55IDwgZi5wb3NpdGlvbi55XG4gICB9XG5cbiAgIGZ1bmN0aW9uIGNvbGxpZGVGbG9vckxlZnQoYjogQm9keSxmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucG9zaXRpb24ueCA8IGYucG9zaXRpb24ueCAmJiBiLnBvc2l0aW9uLngrYi53aWR0aCA+IGYucG9zaXRpb24ueFxuICAgfVxuICAgZnVuY3Rpb24gY29sbGlkZUZsb29yUmlnaHQoYjogQm9keSxmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucG9zaXRpb24ueCsoYi53aWR0aCowLjkpIDwgZi5wb3NpdGlvbi54ICYmIGIudmVsb2NpdHkueCA+IDBcbiAgIH1cblxuICBmdW5jdGlvbiBtb3ZlKGI6IEJvZHkpOiB2b2lkIHtcbiAgICBiLnBvc2l0aW9uLnkgPSBNYXRoLm1pbihiLnBvc2l0aW9uLnkgKyAoYi52ZWxvY2l0eS55ICogY3VycmVudERlbHRhKSwgRkxPT1IgLSBiLmhlaWdodClcbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gICAgYXBwbHlHcmF2aXR5KGIpXG5cbiAgICBmb3IodmFyIGYgPTA7IGY8IGZsb29ycy5sZW5ndGg7IGYrKyl7XG5cbiAgICAgIGlmKGNvbGxpZGVGbG9vclRvcChiLGZsb29yc1tmXSkpe1xuICAgICAgICBpZihiLnZlbG9jaXR5LnkgPCAwKXtcbiAgICAgICAgICBiLnZlbG9jaXR5LnkgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGNvbGxpZGVGbG9vckJvdHRvbShiLGZsb29yc1tmXSkpe1xuICAgICAgICBpZihiLnZlbG9jaXR5LnkgPiAwKXtcbiAgICAgICAgICBiLnZlbG9jaXR5LnkgPSAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IHJlbmRlciA9IChtOiBNb2RlbCkgPT4ge1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAgTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQqMC45NSkgKyBcInB4XCIgO1xuICAgIGNhbnZhcy5nLnZpZXdwb3J0KDAsIDAsIGNhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodCk7XG4gICAgcmVuZGVyTW91bnRhaW4oKVxuXG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgY2FudmFzLmNscygpXG4gICAgY2FudmFzLmJrZyg1Ny8yNTUsNzMvMjU1LDgxLzI1NSlcbiAgICByZW5kZXJGbG9vcigpXG5cbiAgICBpZiAocC5zaG9vdGluZykge1xuICAgICAgc2hvb3RpbmdBbmltLnVwZGF0ZShwKVxuICAgIH0gZWxzZSBpZiAocC52ZWxvY2l0eS54ID09IDApIHtcbiAgICAgIGlkbGVBbmltLnVwZGF0ZShwKVxuICAgIH0gZWxzZSB7XG4gICAgICBydW5BbmltLnVwZGF0ZShwKVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlID0gbS5lbmVtaWVzW2ldXG4gICAgICBib3RBbmltLnVwZGF0ZShlKVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICBpZiAoYi52aXNpYmxlKSB7XG4gICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgYnVsbGV0VGV4dHVyZSxcbiAgICAgICAgICBiLnBvc2l0aW9uLngsXG4gICAgICAgICAgYi5wb3NpdGlvbi55LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzLmZsdXNoKCk7XG4gICAgZnBzTS50aWNrKClcbiAgfVxuXG4gIC8qICAqL2lmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3ZnXCIpXG4gICAgc3Zncy5mb3JFYWNoKHN2ZyA9PiB7XG4gICAgICBzdmcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcnVuR2FtZSgpXG59KVxuIiwiZnVuY3Rpb24gRShjKXtcbiAgICB0aGlzLm4gPSBjLmNyZWF0ZUdhaW4oKVxuICAgIHRoaXMubi5nYWluLnZhbHVlID0gMFxuICAgIHRoaXMuYWRkRXZlbnRUb1F1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgYy5jdXJyZW50VGltZSArIDAuMDAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMywgYy5jdXJyZW50VGltZSArIDAuMTAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUgKyAwLjUwMCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBXTkIoYyl7XG4gICAgdmFyIGJzID0gYy5zYW1wbGVSYXRlO1xuICAgIHZhciBiID0gYy5jcmVhdGVCdWZmZXIoMSwgYnMsIGMuc2FtcGxlUmF0ZSk7XG4gICAgdmFyIG8gPSBiLmdldENoYW5uZWxEYXRhKDApO1xuICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJzOyBpKyspIHtcbiAgICAgIG9baV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgfVxuICBcbiAgICB0aGlzLnMgPSBjLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHRoaXMucy5idWZmZXIgPSBiO1xuICAgIHRoaXMucy5sb29wID0gdHJ1ZVxuICB9O1xuICBcbiAgdmFyIGN0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG4gIHZhciBuID0gbmV3IFdOQihjdHgpXG4gIHZhciB2MSA9IG5ldyBFKGN0eClcbiAgdmFyIHYyID0gbmV3IEUoY3R4KVxuICB2YXIgdjMgPSBuZXcgRShjdHgpXG4gIHZhciB2NCA9IG5ldyBFKGN0eClcbiAgdmFyIGYgPSBjdHguY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgdmFyIGcgPSBjdHguY3JlYXRlR2FpbigpXG4gIHZhciB2cyA9IDBcbiAgdmFyIHN0ZCA9IGZhbHNlXG5cbiAgXG4gIG4ucy5jb25uZWN0KHYxLm4pXG4gIG4ucy5jb25uZWN0KHYyLm4pXG4gIG4ucy5jb25uZWN0KHYzLm4pXG4gIG4ucy5jb25uZWN0KHY0Lm4pXG4gIFxuICBmLnR5cGUgPSBcImxvd3Bhc3NcIlxuICBmLlEudmFsdWUgPSAxXG4gIGYuZnJlcXVlbmN5LnZhbHVlID0gODAwXG4gIHYxLm4uY29ubmVjdChmKVxuICB2Mi5uLmNvbm5lY3QoZilcbiAgdjMubi5jb25uZWN0KGYpXG4gIHY0Lm4uY29ubmVjdChmKVxuICBnLmdhaW4udmFsdWUgPSA1XG4gIGYuY29ubmVjdChnKVxuICBnLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKVxuICBcbiAgXG4gIFxuICBmdW5jdGlvbiBmaXJlU291bmQoKXtcbiAgICBcbiAgIGlmKCFzdGQpe1xuICAgICAgc3RkID0gdHJ1ZVxuICAgICAgbi5zLnN0YXJ0KDApXG4gICAgfVxuICAgIFxuICAgIFxuICAgICAgIHZzKytcbiAgICAgICAgaWYodnMgPiA0KXtcbiAgICAgICAgICB2cyA9IDFcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMSl7XG4gICAgICAgICAgdjEuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMil7XG4gICAgICAgICAgdjIuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMyl7XG4gICAgICAgICAgdjMuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gNCl7XG4gICAgICAgICAgdjQuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICB9XG5cbnZhciBvID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbm8udHlwZSA9ICdzcXVhcmUnXG52YXIgdiA9IGN0eC5jcmVhdGVHYWluKCk7XG5vLmNvbm5lY3QodilcbnYuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xudi5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lKVxudmFyIHN0ZDIgPSBmYWxzZVxuXG5mdW5jdGlvbiBqdW1wU291bmQoKXtcbiAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogKDMgLSAxKSArIDEpLzJcbiAgaWYoIXN0ZDIpe1xuICAgICAgby5zdGFydCgwKVxuICAgIHN0ZDIgPSB0cnVlXG4gIH1cbiAgby5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMjAwKnIsIGN0eC5jdXJyZW50VGltZSlcbiAgdi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMSxjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuNiwgY3R4LmN1cnJlbnRUaW1lICsgMC4xKTtcbiAgby5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgyODAqciwgY3R4LmN1cnJlbnRUaW1lICsgMC40KTtcbiAgdi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNClcbn1cblxuZnVuY3Rpb24gaGl0U291bmQoKXtcbiAgdmFyIG9oID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIHZhciB2aCA9IGN0eC5jcmVhdGVHYWluKCk7XG4gIG9oLmNvbm5lY3QodmgpXG4gIHZoLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbiAgb2gudHlwZSA9ICdzcXVhcmUnXG4gIG9oLmZyZXF1ZW5jeSA9IDg4MC42O1xuICBvaC5zdGFydCgwKVxuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDEsY3R4LmN1cnJlbnRUaW1lKVxuICBvaC5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICB2aC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSArIDAuNSlcbn1cblxuXG53aW5kb3dbJ2ZpcmVTb3VuZCddID0gZmlyZVNvdW5kO1xud2luZG93WydqdW1wU291bmQnXSA9IGp1bXBTb3VuZDtcbndpbmRvd1snaGl0U291bmQnXSA9IGhpdFNvdW5kO1xuXG5cblxuXG5cbiAgXG4gICIsIi8qXG4gKiBUaW55Q2FudmFzIG1vZHVsZSAoaHR0cHM6Ly9naXRodWIuY29tL2JpdG5lbmZlci90aW55LWNhbnZhcylcbiAqIERldmVsb3BlZCBieSBGZWxpcGUgQWxmb25zbyAtPiBodHRwczovL3R3aXR0ZXIuY29tL2JpdG5lbmZlci9cbiAqIFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFxuICogICAgICAgICAgICAgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTyBQVUJMSUMgTElDRU5TRVxuICogICAgICAgICAgICAgICAgICAgICBWZXJzaW9uIDIsIERlY2VtYmVyIDIwMDRcbiAqIFxuICogIENvcHlyaWdodCAoQykgMjAwNCBTYW0gSG9jZXZhciA8c2FtQGhvY2V2YXIubmV0PlxuICogXG4gKiAgRXZlcnlvbmUgaXMgcGVybWl0dGVkIHRvIGNvcHkgYW5kIGRpc3RyaWJ1dGUgdmVyYmF0aW0gb3IgbW9kaWZpZWRcbiAqICBjb3BpZXMgb2YgdGhpcyBsaWNlbnNlIGRvY3VtZW50LCBhbmQgY2hhbmdpbmcgaXQgaXMgYWxsb3dlZCBhcyBsb25nXG4gKiAgYXMgdGhlIG5hbWUgaXMgY2hhbmdlZC5cbiAqIFxuICogICAgICAgICAgICAgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTyBQVUJMSUMgTElDRU5TRVxuICogICAgVEVSTVMgQU5EIENPTkRJVElPTlMgRk9SIENPUFlJTkcsIERJU1RSSUJVVElPTiBBTkQgTU9ESUZJQ0FUSU9OXG4gKiBcbiAqICAgMC4gWW91IGp1c3QgRE8gV0hBVCBUSEUgRlVDSyBZT1UgV0FOVCBUTy5cbiAqIFxuICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFxuICovXG5cbmZ1bmN0aW9uIENvbXBpbGVTaGFkZXIoZ2wsIHNvdXJjZSwgdHlwZSkge1xuICAgIHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgcmV0dXJuIHNoYWRlcjtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlU2hhZGVyUHJvZ3JhbShnbCwgdnNTb3VyY2UsIGZzU291cmNlKSB7XG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCksXG4gICAgICAgIHZTaGFkZXIgPSBDb21waWxlU2hhZGVyKGdsLCB2c1NvdXJjZSwgMzU2MzMpLFxuICAgICAgICBmU2hhZGVyID0gQ29tcGlsZVNoYWRlcihnbCwgZnNTb3VyY2UsIDM1NjMyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdlNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIHJldHVybiBwcm9ncmFtO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVCdWZmZXIoZ2wsIGJ1ZmZlclR5cGUsIHNpemUsIHVzYWdlKSB7XG4gICAgdmFyIGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoYnVmZmVyVHlwZSwgYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGJ1ZmZlclR5cGUsIHNpemUsIHVzYWdlKTtcbiAgICByZXR1cm4gYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVUZXh0dXJlKGdsLCBpbWFnZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKDM1NTMsIHRleHR1cmUpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDIsIDMzMDcxKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQzLCAzMzA3MSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MCwgOTcyOCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MSwgOTcyOCk7XG4gICAgZ2wudGV4SW1hZ2UyRCgzNTUzLCAwLCA2NDA4LCA2NDA4LCA1MTIxLCBpbWFnZSk7XG4gICAgZ2wuYmluZFRleHR1cmUoMzU1MywgbnVsbCk7XG4gICAgdGV4dHVyZS53aWR0aCA9IHdpZHRoO1xuICAgIHRleHR1cmUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHJldHVybiB0ZXh0dXJlO1xufVxud2luZG93WydUQ1NoZCddID0gQ29tcGlsZVNoYWRlcjtcbndpbmRvd1snVENQcmcnXSA9IENyZWF0ZVNoYWRlclByb2dyYW07XG53aW5kb3dbJ1RDQnVmJ10gPSBDcmVhdGVCdWZmZXI7XG53aW5kb3dbJ1RDVGV4J10gPSBDcmVhdGVUZXh0dXJlO1xuXG5mdW5jdGlvbiBUaW55Q2FudmFzKGNhbnZhcykge1xuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpLFxuICAgICAgICBWRVJURVhfU0laRSA9ICg0ICogMikgKyAoNCAqIDIpICsgKDQpLFxuICAgICAgICBNQVhfQkFUQ0ggPSAxMDkyMiwgLy8gZmxvb3IoKDIgXiAxNikgLyA2KVxuICAgICAgICBNQVhfU1RBQ0sgPSAxMDAsXG4gICAgICAgIE1BVF9TSVpFID0gNixcbiAgICAgICAgVkVSVElDRVNfUEVSX1FVQUQgPSA2LFxuICAgICAgICBNQVRfU1RBQ0tfU0laRSA9IE1BWF9TVEFDSyAqIE1BVF9TSVpFLFxuICAgICAgICBWRVJURVhfREFUQV9TSVpFID0gVkVSVEVYX1NJWkUgKiBNQVhfQkFUQ0ggKiA0LFxuICAgICAgICBJTkRFWF9EQVRBX1NJWkUgPSBNQVhfQkFUQ0ggKiAoMiAqIFZFUlRJQ0VTX1BFUl9RVUFEKSxcbiAgICAgICAgd2lkdGggPSBjYW52YXMud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IGNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHNoYWRlciA9IENyZWF0ZVNoYWRlclByb2dyYW0oXG4gICAgICAgICAgICBnbCwgW1xuICAgICAgICAgICAgICAgICdwcmVjaXNpb24gbG93cCBmbG9hdDsnLFxuICAgICAgICAgICAgICAgIC8vIElOIFZlcnRleCBQb3NpdGlvbiBhbmRcbiAgICAgICAgICAgICAgICAvLyBJTiBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSB2ZWMyIGEsIGI7JyxcbiAgICAgICAgICAgICAgICAvLyBJTiBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlIHZlYzQgYzsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjMiBkOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzQgZTsnLFxuICAgICAgICAgICAgICAgIC8vIENPTlNUIFZpZXcgTWF0cml4XG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gbWF0NCBtOycsXG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gdmVjMiByOycsXG4gICAgICAgICAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG4gICAgICAgICAgICAgICAgJ2dsX1Bvc2l0aW9uPW0qdmVjNChhLDEuMCwxLjApOycsXG4gICAgICAgICAgICAgICAgJ2Q9YjsnLFxuICAgICAgICAgICAgICAgICdlPWM7JyxcbiAgICAgICAgICAgICAgICAnfSdcbiAgICAgICAgICAgIF0uam9pbignXFxuJyksIFtcbiAgICAgICAgICAgICAgICAncHJlY2lzaW9uIGxvd3AgZmxvYXQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzIgZDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWM0IGU7JyxcbiAgICAgICAgICAgICAgICAvLyBDT05TVCBTaW5nbGUgU2FtcGxlcjJEXG4gICAgICAgICAgICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIGY7JyxcbiAgICAgICAgICAgICAgICAndm9pZCBtYWluKCl7JyxcbiAgICAgICAgICAgICAgICAnZ2xfRnJhZ0NvbG9yPXRleHR1cmUyRChmLGQpKmU7JyxcbiAgICAgICAgICAgICAgICAnfSdcbiAgICAgICAgICAgIF0uam9pbignXFxuJylcbiAgICAgICAgKSxcbiAgICAgICAgZ2xCdWZmZXJTdWJEYXRhID0gZ2wuYnVmZmVyU3ViRGF0YS5iaW5kKGdsKSxcbiAgICAgICAgZ2xEcmF3RWxlbWVudHMgPSBnbC5kcmF3RWxlbWVudHMuYmluZChnbCksXG4gICAgICAgIGdsQmluZFRleHR1cmUgPSBnbC5iaW5kVGV4dHVyZS5iaW5kKGdsKSxcbiAgICAgICAgZ2xDbGVhciA9IGdsLmNsZWFyLmJpbmQoZ2wpLFxuICAgICAgICBnbENsZWFyQ29sb3IgPSBnbC5jbGVhckNvbG9yLmJpbmQoZ2wpLFxuICAgICAgICB2ZXJ0ZXhEYXRhID0gbmV3IEFycmF5QnVmZmVyKFZFUlRFWF9EQVRBX1NJWkUpLFxuICAgICAgICB2UG9zaXRpb25EYXRhID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhEYXRhKSxcbiAgICAgICAgdkNvbG9yRGF0YSA9IG5ldyBVaW50MzJBcnJheSh2ZXJ0ZXhEYXRhKSxcbiAgICAgICAgdkluZGV4RGF0YSA9IG5ldyBVaW50MTZBcnJheShJTkRFWF9EQVRBX1NJWkUpLFxuICAgICAgICBJQk8gPSBDcmVhdGVCdWZmZXIoZ2wsIDM0OTYzLCB2SW5kZXhEYXRhLmJ5dGVMZW5ndGgsIDM1MDQ0KSxcbiAgICAgICAgVkJPID0gQ3JlYXRlQnVmZmVyKGdsLCAzNDk2MiwgdmVydGV4RGF0YS5ieXRlTGVuZ3RoLCAzNTA0OCksXG4gICAgICAgIGNvdW50ID0gMCxcbiAgICAgICAgbWF0ID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMSwgMCwgMF0pLFxuICAgICAgICBzdGFjayA9IG5ldyBGbG9hdDMyQXJyYXkoMTAwKSxcbiAgICAgICAgc3RhY2twID0gMCxcbiAgICAgICAgY29zID0gTWF0aC5jb3MsXG4gICAgICAgIHNpbiA9IE1hdGguc2luLFxuICAgICAgICBjdXJyZW50VGV4dHVyZSA9IG51bGwsXG4gICAgICAgIHJlbmRlcmVyID0gbnVsbCxcbiAgICAgICAgbG9jQSwgbG9jQiwgbG9jQztcblxuICAgIGdsLmJsZW5kRnVuYyg3NzAsIDc3MSk7XG4gICAgZ2wuZW5hYmxlKDMwNDIpO1xuICAgIGdsLnVzZVByb2dyYW0oc2hhZGVyKTtcbiAgICBnbC5iaW5kQnVmZmVyKDM0OTYzLCBJQk8pO1xuICAgIGZvciAodmFyIGluZGV4QSA9IGluZGV4QiA9IDA7IGluZGV4QSA8IE1BWF9CQVRDSCAqIFZFUlRJQ0VTX1BFUl9RVUFEOyBpbmRleEEgKz0gVkVSVElDRVNfUEVSX1FVQUQsIGluZGV4QiArPSA0KVxuICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDBdID0gaW5kZXhCLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAxXSA9IGluZGV4QiArIDEsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDJdID0gaW5kZXhCICsgMixcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgM10gPSBpbmRleEIgKyAwLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyA0XSA9IGluZGV4QiArIDMsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDVdID0gaW5kZXhCICsgMTtcblxuICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MywgMCwgdkluZGV4RGF0YSk7XG4gICAgZ2wuYmluZEJ1ZmZlcigzNDk2MiwgVkJPKTtcbiAgICBsb2NBID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYScpO1xuICAgIGxvY0IgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdiJyk7XG4gICAgbG9jQyA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NBKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0EsIDIsIDUxMjYsIDAsIFZFUlRFWF9TSVpFLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NCKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0IsIDIsIDUxMjYsIDAsIFZFUlRFWF9TSVpFLCA4KTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NDKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY0MsIDQsIDUxMjEsIDEsIFZFUlRFWF9TSVpFLCAxNik7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyLCAnbScpLCAwLFxuICAgICAgICBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgIDIgLyB3aWR0aCwgMCwgMCwgMCxcbiAgICAgICAgICAgIDAsIC0yIC8gaGVpZ2h0LCAwLCAwLFxuICAgICAgICAgICAgMCwgMCwgMSwgMSwgLTEsIDEsIDAsIDBcbiAgICAgICAgXSlcbiAgICApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoMzM5ODQpO1xuICAgIHJlbmRlcmVyID0ge1xuICAgICAgICAnZyc6IGdsLFxuICAgICAgICAnYyc6IGNhbnZhcyxcbiAgICAgICAgJ2NvbCc6IDB4RkZGRkZGRkYsXG4gICAgICAgICdia2cnOiBmdW5jdGlvbiAociwgZywgYikge1xuICAgICAgICAgICAgZ2xDbGVhckNvbG9yKHIsIGcsIGIsIDEpO1xuICAgICAgICB9LFxuICAgICAgICAnY2xzJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2xDbGVhcigxNjM4NCk7XG4gICAgICAgIH0sXG4gICAgICAgICd0cmFucyc6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBtYXRbNF0gPSBtYXRbMF0gKiB4ICsgbWF0WzJdICogeSArIG1hdFs0XTtcbiAgICAgICAgICAgIG1hdFs1XSA9IG1hdFsxXSAqIHggKyBtYXRbM10gKiB5ICsgbWF0WzVdO1xuICAgICAgICB9LFxuICAgICAgICAnc2NhbGUnOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgbWF0WzBdID0gbWF0WzBdICogeDtcbiAgICAgICAgICAgIG1hdFsxXSA9IG1hdFsxXSAqIHg7XG4gICAgICAgICAgICBtYXRbMl0gPSBtYXRbMl0gKiB5O1xuICAgICAgICAgICAgbWF0WzNdID0gbWF0WzNdICogeTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3JvdCc6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICB2YXIgYSA9IG1hdFswXSxcbiAgICAgICAgICAgICAgICBiID0gbWF0WzFdLFxuICAgICAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgICAgICBzciA9IHNpbihyKSxcbiAgICAgICAgICAgICAgICBjciA9IGNvcyhyKTtcblxuICAgICAgICAgICAgbWF0WzBdID0gYSAqIGNyICsgYyAqIHNyO1xuICAgICAgICAgICAgbWF0WzFdID0gYiAqIGNyICsgZCAqIHNyO1xuICAgICAgICAgICAgbWF0WzJdID0gYSAqIC1zciArIGMgKiBjcjtcbiAgICAgICAgICAgIG1hdFszXSA9IGIgKiAtc3IgKyBkICogY3I7XG4gICAgICAgIH0sXG4gICAgICAgICdwdXNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMF0gPSBtYXRbMF07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAxXSA9IG1hdFsxXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDJdID0gbWF0WzJdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgM10gPSBtYXRbM107XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyA0XSA9IG1hdFs0XTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDVdID0gbWF0WzVdO1xuICAgICAgICAgICAgc3RhY2twICs9IDY7XG4gICAgICAgIH0sXG4gICAgICAgICdwb3AnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdGFja3AgLT0gNjtcbiAgICAgICAgICAgIG1hdFswXSA9IHN0YWNrW3N0YWNrcCArIDBdO1xuICAgICAgICAgICAgbWF0WzFdID0gc3RhY2tbc3RhY2twICsgMV07XG4gICAgICAgICAgICBtYXRbMl0gPSBzdGFja1tzdGFja3AgKyAyXTtcbiAgICAgICAgICAgIG1hdFszXSA9IHN0YWNrW3N0YWNrcCArIDNdO1xuICAgICAgICAgICAgbWF0WzRdID0gc3RhY2tbc3RhY2twICsgNF07XG4gICAgICAgICAgICBtYXRbNV0gPSBzdGFja1tzdGFja3AgKyA1XTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2ltZyc6IGZ1bmN0aW9uICh0ZXh0dXJlLCB4LCB5LCB3LCBoLCB1MCwgdjAsIHUxLCB2MSkge1xuICAgICAgICAgICAgdmFyIHgwID0geCxcbiAgICAgICAgICAgICAgICB5MCA9IHksXG4gICAgICAgICAgICAgICAgeDEgPSB4ICsgdyxcbiAgICAgICAgICAgICAgICB5MSA9IHkgKyBoLFxuICAgICAgICAgICAgICAgIHgyID0geCxcbiAgICAgICAgICAgICAgICB5MiA9IHkgKyBoLFxuICAgICAgICAgICAgICAgIHgzID0geCArIHcsXG4gICAgICAgICAgICAgICAgeTMgPSB5LFxuICAgICAgICAgICAgICAgIGEgPSBtYXRbMF0sXG4gICAgICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgICAgIGQgPSBtYXRbM10sXG4gICAgICAgICAgICAgICAgZSA9IG1hdFs0XSxcbiAgICAgICAgICAgICAgICBmID0gbWF0WzVdLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgICAgICAgICAgYXJnYiA9IHJlbmRlcmVyWydjb2wnXTtcblxuICAgICAgICAgICAgaWYgKHRleHR1cmUgIT0gY3VycmVudFRleHR1cmUgfHxcbiAgICAgICAgICAgICAgICBjb3VudCArIDEgPj0gTUFYX0JBVENIKSB7XG4gICAgICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2ZXJ0ZXhEYXRhKTtcbiAgICAgICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXh0dXJlICE9IHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgICAgICAgICBnbEJpbmRUZXh0dXJlKDM1NTMsIGN1cnJlbnRUZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9mZnNldCA9IGNvdW50ICogVkVSVEVYX1NJWkU7XG4gICAgICAgICAgICAvLyBWZXJ0ZXggT3JkZXJcbiAgICAgICAgICAgIC8vIFZlcnRleCBQb3NpdGlvbiB8IFVWIHwgQVJHQlxuICAgICAgICAgICAgLy8gVmVydGV4IDFcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDAgKiBhICsgeTAgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDAgKiBiICsgeTAgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTA7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYwO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggMlxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MSAqIGEgKyB5MSAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MSAqIGIgKyB5MSAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjE7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCAzXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgyICogYSArIHkyICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgyICogYiArIHkyICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUwO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MTtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDRcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDMgKiBhICsgeTMgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDMgKiBiICsgeTMgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTE7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYwO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICBpZiAoKytjb3VudCA+PSBNQVhfQkFUQ0gpIHtcbiAgICAgICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZlcnRleERhdGEpO1xuICAgICAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ2ZsdXNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHJldHVybjtcbiAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdlBvc2l0aW9uRGF0YS5zdWJhcnJheSgwLCBjb3VudCAqIFZFUlRFWF9TSVpFKSk7XG4gICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHJlbmRlcmVyO1xufVxud2luZG93WydUQyddID0gVGlueUNhbnZhczsiXSwic291cmNlUm9vdCI6IiJ9