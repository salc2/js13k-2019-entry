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
    Dir[Dir["Left"] = 0] = "Left";
    Dir[Dir["Right"] = 1] = "Right";
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
loadTextures(["soldier_host.png", "hostage.png", "bothitted.png",
    "mountain.png", "floor.png", "soldier_run.png", "soldier_idle.png",
    "soldier_shooting.png", "bot.png", "abcnum.png"]).then((textures) => {
    const [rSolHost, lSolHost, rHost, lHost, rbotHit, lbotHit, , lMountain, rightFloor, leftFloor, rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot, abc, ,] = textures;
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
            bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: false, dir: Dir.Left, width: 4, height: 4 });
        }
        return bs;
    }
    function initHosta(num) {
        const bs = [];
        for (let i = 0; i < num; i++) {
            bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: true, dir: Dir.Left, width: 16, height: 16 });
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
            visible: false,
            hitted: false,
            life: 5
        };
    }
    function newEnemies(x, y, n) {
        const es = [];
        for (var i = 0; i < n; i++) {
            es.push(newEnemy(x, y, WALK_SPEED * rnd() * (3.9 - 1.7) + 1.7));
        }
        return es;
    }
    const cam = { position: { x: 0, y: 0 }, width: 300, height: 150, maxX: 0, maxY: 0 };
    window["cam"] = cam;
    let camCenter = cam.position;
    let radioToShake = 0;
    let shake = false;
    function shaking() {
        const x = 0, y = 0;
        const ang = rnd() % Math.PI * 2;
        const nx = Math.sin(ang) * radioToShake;
        const ny = Math.cos(ang) * radioToShake;
        cam.position.x = x + nx;
        cam.position.y = y + ny;
        radioToShake *= 0.9;
    }
    canvas.g.canvas.addEventListener("click", (event) => {
        const pos = getMousePos(canvas.g.canvas, event);
        for (var i = 0; i < currentState.hostages.length; i++) {
            const host = currentState.hostages[i];
            host.position.x = cam.position.x + pos.x;
            host.position.y = cam.position.y + pos.y;
            host.visible = true;
        }
    });
    /*   canvas.g.canvas.addEventListener("click", (event) => {
        let take = 1
        const pos = getMousePos(canvas.g.canvas, event)
        for(var i = 0; i < currentState.enemies.length; i++){
          const ene = currentState.enemies[i]
          if(!ene.visible && take > 0){
            ene.position.x = cam.position.x+pos.x
            ene.position.y = cam.position.y+pos.y
            ene.visible = true
            ene.visible = true
            ene.life = 5
            ene.velocity.x =  rnd() * (3.9-1.7) + 1.7  * ( currentState.player.position.x > ene.position.x ?
            WALK_SPEED : -WALK_SPEED)
            ene.dir = ene.velocity.x > 0 ? Dir.Left : Dir.Right
            take --
          }
        }
      }) */
    function explodeParticles(x, y) {
        var rnd = Math.random;
        const sp = WALK_SPEED * 2;
        const jp = JUMP_VEL * 3;
        for (var i = 0; i < 10; i++) {
            const vx = rnd() * (sp - (-sp)) + (-sp);
            const vy = rnd() * (jp - (-jp)) + (-jp);
            var angle = rnd() * Math.PI * 2;
            particles.push({ position: { x: x, y: y }, velocity: { x: vx * Math.cos(angle), y: vy * Math.sin(angle) }, dir: Dir.Left, height: 4, width: 4, visible: true });
        }
    }
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
        enemies: newEnemies(34, 0, 50),
        bullets: initBullets(60),
        hostages: initHosta(1)
    };
    const FLOOR = height - 10;
    const SECOND_FLOOR = FLOOR * 0.7;
    function createFloor(x, y, width) {
        return { position: { x: x, y: y }, width: width, height: 20, dir: Dir.Left, velocity: { x: 0, y: 0 }, visible: true };
    }
    const floors = [createFloor(0.0, FLOOR, 900), createFloor(40.0, SECOND_FLOOR, 100), createFloor(230.0, SECOND_FLOOR, 290)];
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
            let text = p.dir == Dir.Right ? rightT : leftT;
            canvas.img(text.text, -cam.position.x + (p.position.x + (p.width / 2)), -cam.position.y + p.position.y, p.width, p.height, v0, u0, v1, u1);
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
        const p = m.player;
        if (isOverFloor(p)) {
            jumpTries = 2;
        }
        switch (a) {
            case EventType.JP:
                if (jumpTries > 0) {
                    jumpTries--;
                    p.velocity.y = p.carring ? -JUMP_VEL / 2 : -JUMP_VEL;
                    jumpSound();
                }
                p.shooting = false;
                break;
            case EventType.LP:
                p.dir = Dir.Left;
                p.velocity.x = p.carring ? -WALK_SPEED / 2 : -WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.RP:
                p.dir = Dir.Right;
                p.velocity.x = p.carring ? WALK_SPEED / 2 : WALK_SPEED;
                p.shooting = false;
                break;
            case EventType.LR:
                p.velocity.x = 0;
                break;
            case EventType.RR:
                p.velocity.x = 0;
                break;
            case EventType.AP:
                if (!m.player.carring) {
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
                            gunReady = 3;
                            fireSound();
                            radioToShake = 2;
                            break;
                        }
                    }
                }
                else {
                    let host = m.player.carring;
                    host.visible = true;
                    host.position.x = m.player.dir == Dir.Left ? m.player.position.x - 25 : m.player.position.x + 25;
                    host.position.y = m.player.position.y - 10;
                    m.player.carring = null;
                }
                break;
            case EventType.AR:
                p.velocity.x = 0;
                //p.shooting = false
                //ShootingAnim.reset()
                break;
            default:
                break;
        }
        move(m.player);
        for (var i = 0; i < m.hostages.length; i++) {
            const h = m.hostages[i];
            move(h);
            if (h.visible && collide(m.player, h) && !m.player.carring) {
                h.visible = false;
                m.player.carring = h;
            }
        }
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            ticksHitted = Math.max(ticksHitted - 1, 0);
            if (ticksHitted == 0) {
                e.hitted = false;
            }
            move(e);
            if (e.position.x < 0 || (e.position.x + 20 > 900)) {
                e.velocity.x = e.velocity.x * -1;
                e.dir = e.velocity.x > 0 ? Dir.Left : Dir.Right;
            }
            for (var j = 0; j < m.bullets.length; j++) {
                const b = m.bullets[j];
                if (e.visible && b.visible && collide(b, e)) {
                    hitSound();
                    e.hitted = true;
                    ticksHitted = 8;
                    e.position.x += (b.velocity.x > 0 ? +18 : -18);
                    if (e.life == 0) {
                        radioToShake = 4;
                        explodeParticles(e.position.x + (e.width / 2), e.position.y + (e.height / 2));
                        e.visible = false;
                        e.velocity.x = 0;
                    }
                    else {
                        e.life = Math.max(e.life - 1, 0);
                    }
                    b.visible = false;
                    b.velocity.x = 0;
                }
            }
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            moveBullet(b);
        }
        for (var i = 0; i < particles.length; i++) {
            const p = particles[i];
            move(p);
            for (var f = 0; f < floors.length; f++) {
                if (collideFloorBottom(p, floors[f])) {
                    persistence.push(particles[i]);
                    particles.splice(i, 1);
                }
            }
        }
        gunReady = Math.max(0, gunReady - 1);
        moveCam(m.player);
    }
    function moveCam(b) {
        cam.position.x = Math.max(b.position.x - (cam.width / 2), 0);
    }
    function renderMountain() {
        canvas.push();
        canvas.scale(6, 6);
        for (var x = 0; x < 100; x += 20) {
            canvas.img(lMountain.text, (-cam.position.x * 0.06) + x, (-cam.position.y * 0.06) + 5, lMountain.width, lMountain.height, 0, 0, 1, 1);
        }
        canvas.pop();
    }
    function renderFloor() {
        for (var f = 0; f < floors.length; f++) {
            const floor = floors[f];
            for (var x = floor.position.x; x <= floor.position.x + floor.width; x += 20) {
                const text = x % 7 == 0 ? leftFloor : rightFloor;
                canvas.img(text.text, -cam.position.x + x, -cam.position.y + (floor.position.y - 10), text.width, text.height, 0, 0, 1, 1);
            }
        }
    }
    function ifOnTheFloorgetY(b) {
        let bottomCollide = -1;
        for (var i = 0; i < floors.length; i++) {
            bottomCollide = collideFloorBottom(b, floors[i]) ? floors[i].position.y : -1;
        }
        return bottomCollide;
    }
    function applyGravity(b) {
        b.velocity.y = ifOnTheFloorgetY(b) < 0 ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y;
    }
    function outsideScreen(b) {
        return b.position.x < 0 || b.position.x > 900;
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
        const groundY = ifOnTheFloorgetY(b);
        b.position.y = groundY < 0 ? b.position.y + (b.velocity.y * currentDelta) : groundY - b.height;
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
    function renderText(w, x, y, s) {
        const coor = renderCoord(w);
        var newX = -(w.length * (4 * s)) / 2;
        for (var c = 0; c < coor.length; c++) {
            canvas.img(abc.text, -cam.position.x + x + newX, -cam.position.y + y, 4 * s, 4 * s, coor[c][0], coor[c][1], coor[c][2], coor[c][3]);
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
        renderMountain();
        const p = m.player;
        canvas.cls();
        canvas.bkg(57 / 255, 73 / 255, 81 / 255);
        renderFloor();
        if (p.shooting) {
            shootingAnim.update(p);
        }
        else if (p.velocity.x == 0) {
            if (p.carring) {
                soldierHostAni.update(p);
            }
            else {
                idleAnim.update(p);
            }
        }
        else {
            if (p.carring) {
                soldierHostAni.reset();
                soldierHostAni.update(p);
            }
            else {
                runAnim.update(p);
            }
        }
        for (var i = 0; i < m.enemies.length; i++) {
            const e = m.enemies[i];
            if (e.visible) {
                if (e.hitted) {
                    botHittedAnim.update(e);
                }
                else {
                    botAnim.update(e);
                }
            }
        }
        for (var i = 0; i < m.bullets.length; i++) {
            const b = m.bullets[i];
            if (b.visible) {
                canvas.img(bulletTexture, -cam.position.x + b.position.x, -cam.position.y + b.position.y, 4, 4, 0, 0, 1, 1);
            }
        }
        for (var i = 0; i < m.hostages.length; i++) {
            const b = m.hostages[i];
            if (b.visible) {
                hostAnim.update(b);
            }
        }
        for (var i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.visible) {
                canvas.img(rbotHit.text, -cam.position.x + p.position.x, -cam.position.y + p.position.y, 8, 8, 0, 0, .7, 1);
            }
        }
        for (var i = 0; i < persistence.length; i++) {
            const p = persistence[i];
            if (p.visible) {
                canvas.img(rbotHit.text, -cam.position.x + p.position.x, -cam.position.y + p.position.y, 8, 8, 0, 0, .7, 1);
            }
        }
        renderText("record: 10000", width / 2, 10, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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QUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEosTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkcsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkosTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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Q0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUdELE9BQU8sRUFBRTtBQUNYLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcjNCRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLGtDQUFrQztBQUNsQztBQUNBLGdDQUFnQztBQUNoQztBQUNBLGdDQUFnQztBQUNoQztBQUNBLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsNkJBQTZCO0FBQzdCLCtDQUErQztBQUMvQyxxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQjtBQUNBLHNDQUFzQztBQUN0QztBQUNBLGdDQUFnQztBQUNoQztBQUNBLGdDQUFnQztBQUNoQztBQUNBLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0IsK0NBQStDO0FBQy9DLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyx3Q0FBd0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvKiFcbiAqIEZQU01ldGVyIDAuMy4xIC0gOXRoIE1heSAyMDEzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vRGFyc2Fpbi9mcHNtZXRlclxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuOyhmdW5jdGlvbiAodywgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQ3JlYXRlIGEgbmV3IGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBFbGVtZW50IHR5cGUgbmFtZS5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIG5ld0VsKG5hbWUpIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBcHBseSB0aGVtZSBDU1MgcHJvcGVydGllcyB0byBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IERPTSBlbGVtZW50LlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9ICB0aGVtZSAgIFRoZW1lIG9iamVjdC5cblx0ICpcblx0ICogQHJldHVybiB7RWxlbWVudH1cblx0ICovXG5cdGZ1bmN0aW9uIGFwcGx5VGhlbWUoZWxlbWVudCwgdGhlbWUpIHtcblx0XHRmb3IgKHZhciBuYW1lIGluIHRoZW1lKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtZW50LnN0eWxlW25hbWVdID0gdGhlbWVbbmFtZV07XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0XHRyZXR1cm4gZWxlbWVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gdHlwZSBvZiB0aGUgdmFsdWUuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiB0eXBlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRcdHJldHVybiBTdHJpbmcodmFsdWUpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkubWF0Y2goL1xccyhbYS16XSspL2kpWzFdLnRvTG93ZXJDYXNlKCkgfHwgJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHR5cGVvZiB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBpbiBhbiBhcnJheS5cblx0ICpcblx0ICogQHBhcmFtICB7TWl4ZWR9IHZhbHVlXG5cdCAqIEBwYXJhbSAge0FycmF5fSBhcnJheVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtJbnRlZ2VyfSBBcnJheSBpbmRleCBvciAtMSB3aGVuIG5vdCBmb3VuZC5cblx0ICovXG5cdGZ1bmN0aW9uIGluQXJyYXkodmFsdWUsIGFycmF5KSB7XG5cdFx0aWYgKHR5cGUoYXJyYXkpICE9PSAnYXJyYXknKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdGlmIChhcnJheS5pbmRleE9mKSB7XG5cdFx0XHRyZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRpZiAoYXJyYXlbaV0gPT09IHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHQvKipcblx0ICogUG9vciBtYW4ncyBkZWVwIG9iamVjdCBleHRlbmQuXG5cdCAqXG5cdCAqIEV4YW1wbGU6XG5cdCAqICAgZXh0ZW5kKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBleHRlbmQoKSB7XG5cdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZ3NbMV0pIHtcblx0XHRcdGlmIChhcmdzWzFdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlKGFyZ3NbMV1ba2V5XSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gZXh0ZW5kKHt9LCBhcmdzWzBdW2tleV0sIGFyZ3NbMV1ba2V5XSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ2FycmF5Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XS5zbGljZSgwKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGFyZ3NbMV1ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYXJncy5sZW5ndGggPiAyID9cblx0XHRcdGV4dGVuZC5hcHBseShudWxsLCBbYXJnc1swXV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDIpKSkgOlxuXHRcdFx0YXJnc1swXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0IEhTTCBjb2xvciB0byBIRVggc3RyaW5nLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtBcnJheX0gaHNsIEFycmF5IHdpdGggW2h1ZSwgc2F0dXJhdGlvbiwgbGlnaHRuZXNzXS5cblx0ICpcblx0ICogQHJldHVybiB7QXJyYXl9IEFycmF5IHdpdGggW3JlZCwgZ3JlZW4sIGJsdWVdLlxuXHQgKi9cblx0ZnVuY3Rpb24gaHNsVG9IZXgoaCwgcywgbCkge1xuXHRcdHZhciByLCBnLCBiO1xuXHRcdHZhciB2LCBtaW4sIHN2LCBzZXh0YW50LCBmcmFjdCwgdnNmO1xuXG5cdFx0aWYgKGwgPD0gMC41KSB7XG5cdFx0XHR2ID0gbCAqICgxICsgcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHYgPSBsICsgcyAtIGwgKiBzO1xuXHRcdH1cblxuXHRcdGlmICh2ID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gJyMwMDAnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtaW4gPSAyICogbCAtIHY7XG5cdFx0XHRzdiA9ICh2IC0gbWluKSAvIHY7XG5cdFx0XHRoID0gNiAqIGg7XG5cdFx0XHRzZXh0YW50ID0gTWF0aC5mbG9vcihoKTtcblx0XHRcdGZyYWN0ID0gaCAtIHNleHRhbnQ7XG5cdFx0XHR2c2YgPSB2ICogc3YgKiBmcmFjdDtcblx0XHRcdGlmIChzZXh0YW50ID09PSAwIHx8IHNleHRhbnQgPT09IDYpIHtcblx0XHRcdFx0ciA9IHY7XG5cdFx0XHRcdGcgPSBtaW4gKyB2c2Y7XG5cdFx0XHRcdGIgPSBtaW47XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDEpIHtcblx0XHRcdFx0ciA9IHYgLSB2c2Y7XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAyKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2O1xuXHRcdFx0XHRiID0gbWluICsgdnNmO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAzKSB7XG5cdFx0XHRcdHIgPSBtaW47XG5cdFx0XHRcdGcgPSB2IC0gdnNmO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gNCkge1xuXHRcdFx0XHRyID0gbWluICsgdnNmO1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluO1xuXHRcdFx0XHRiID0gdiAtIHZzZjtcblx0XHRcdH1cblx0XHRcdHJldHVybiAnIycgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEhlbHBlciBmdW5jdGlvbiBmb3IgaHNsVG9IZXguXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG5cdFx0YyA9IE1hdGgucm91bmQoYyAqIDI1NSkudG9TdHJpbmcoMTYpO1xuXHRcdHJldHVybiBjLmxlbmd0aCA9PT0gMSA/ICcwJyArIGMgOiBjO1xuXHR9XG5cblx0LyoqXG5cdCAqIE1hbmFnZSBlbGVtZW50IGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHBhcmFtICB7Tm9kZX0gICAgIGVsZW1lbnRcblx0ICogQHBhcmFtICB7RXZlbnR9ICAgIGV2ZW50TmFtZVxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtCb29sfSAgICAgcmVtb3ZlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBsaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIsIHJlbW92ZSkge1xuXHRcdGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2FkZEV2ZW50TGlzdGVuZXInXShldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHR9IGVsc2UgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdGVsZW1lbnRbcmVtb3ZlID8gJ2RldGFjaEV2ZW50JyA6ICdhdHRhY2hFdmVudCddKCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFByZWZlcnJlZCB0aW1pbmcgZnVudGlvblxuXHR2YXIgZ2V0VGltZTtcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcGVyZiA9IHcucGVyZm9ybWFuY2U7XG5cdFx0aWYgKHBlcmYgJiYgKHBlcmYubm93IHx8IHBlcmYud2Via2l0Tm93KSkge1xuXHRcdFx0dmFyIHBlcmZOb3cgPSBwZXJmLm5vdyA/ICdub3cnIDogJ3dlYmtpdE5vdyc7XG5cdFx0XHRnZXRUaW1lID0gcGVyZltwZXJmTm93XS5iaW5kKHBlcmYpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRnZXRUaW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gK25ldyBEYXRlKCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBMb2NhbCBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIHBvbHlmaWxsXG5cdHZhciBjQUYgPSB3LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHcuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHR2YXIgckFGID0gdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHZlbmRvcnMgPSBbJ21veicsICd3ZWJraXQnLCAnbyddO1xuXHRcdHZhciBsYXN0VGltZSA9IDA7XG5cblx0XHQvLyBGb3IgYSBtb3JlIGFjY3VyYXRlIFdpbmRvd0FuaW1hdGlvblRpbWluZyBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb24sIGRpdGNoIHRoZSBuYXRpdmVcblx0XHQvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2hlbiBjYW5jZWxBbmltYXRpb25GcmFtZSBpcyBub3QgcHJlc2VudCAob2xkZXIgdmVyc2lvbnMgb2YgRmlyZWZveClcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHZlbmRvcnMubGVuZ3RoOyBpIDwgbCAmJiAhY0FGOyArK2kpIHtcblx0XHRcdGNBRiA9IHdbdmVuZG9yc1tpXSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3W3ZlbmRvcnNbaV0rJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdFx0ckFGID0gY0FGICYmIHdbdmVuZG9yc1tpXSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0fVxuXG5cdFx0aWYgKCFjQUYpIHtcblx0XHRcdHJBRiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgY3VyclRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHRcdHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuXHRcdFx0XHRsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcblx0XHRcdFx0cmV0dXJuIHcuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xuXHRcdFx0fTtcblxuXHRcdFx0Y0FGID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dChpZCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSgpKTtcblxuXHQvLyBQcm9wZXJ0eSBuYW1lIGZvciBhc3NpZ25pbmcgZWxlbWVudCB0ZXh0IGNvbnRlbnRcblx0dmFyIHRleHRQcm9wID0gdHlwZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS50ZXh0Q29udGVudCkgPT09ICdzdHJpbmcnID8gJ3RleHRDb250ZW50JyA6ICdpbm5lclRleHQnO1xuXG5cdC8qKlxuXHQgKiBGUFNNZXRlciBjbGFzcy5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBhbmNob3IgIEVsZW1lbnQgdG8gYXBwZW5kIHRoZSBtZXRlciB0by4gRGVmYXVsdCBpcyBkb2N1bWVudC5ib2R5LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gIG9wdGlvbnMgT2JqZWN0IHdpdGggb3B0aW9ucy5cblx0ICovXG5cdGZ1bmN0aW9uIEZQU01ldGVyKGFuY2hvciwgb3B0aW9ucykge1xuXHRcdC8vIE9wdGlvbmFsIGFyZ3VtZW50c1xuXHRcdGlmICh0eXBlKGFuY2hvcikgPT09ICdvYmplY3QnICYmIGFuY2hvci5ub2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRvcHRpb25zID0gYW5jaG9yO1xuXHRcdFx0YW5jaG9yID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cdFx0aWYgKCFhbmNob3IpIHtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciBvID0gZXh0ZW5kKHt9LCBGUFNNZXRlci5kZWZhdWx0cywgb3B0aW9ucyB8fCB7fSk7XG5cblx0XHR2YXIgZWwgPSB7fTtcblx0XHR2YXIgY29scyA9IFtdO1xuXHRcdHZhciB0aGVtZSwgaGVhdG1hcHM7XG5cdFx0dmFyIGhlYXREZXB0aCA9IDEwMDtcblx0XHR2YXIgaGVhdGluZyA9IFtdO1xuXG5cdFx0dmFyIHRoaXNGcmFtZVRpbWUgPSAwO1xuXHRcdHZhciBmcmFtZVRpbWUgPSBvLnRocmVzaG9sZDtcblx0XHR2YXIgZnJhbWVTdGFydCA9IDA7XG5cdFx0dmFyIGxhc3RMb29wID0gZ2V0VGltZSgpIC0gZnJhbWVUaW1lO1xuXHRcdHZhciB0aW1lO1xuXG5cdFx0dmFyIGZwc0hpc3RvcnkgPSBbXTtcblx0XHR2YXIgZHVyYXRpb25IaXN0b3J5ID0gW107XG5cblx0XHR2YXIgZnJhbWVJRCwgcmVuZGVySUQ7XG5cdFx0dmFyIHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXHRcdHZhciBncmFwaEhlaWdodCwgY291bnQsIGksIGo7XG5cblx0XHQvLyBFeHBvc2VkIHByb3BlcnRpZXNcblx0XHRzZWxmLm9wdGlvbnMgPSBvO1xuXHRcdHNlbGYuZnBzID0gMDtcblx0XHRzZWxmLmR1cmF0aW9uID0gMDtcblx0XHRzZWxmLmlzUGF1c2VkID0gMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRpY2sgc3RhcnQgZm9yIG1lYXN1cmluZyB0aGUgYWN0dWFsIHJlbmRlcmluZyBkdXJhdGlvbi5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmcmFtZVN0YXJ0ID0gZ2V0VGltZSgpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBGUFMgdGljay5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi50aWNrID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGltZSA9IGdldFRpbWUoKTtcblx0XHRcdHRoaXNGcmFtZVRpbWUgPSB0aW1lIC0gbGFzdExvb3A7XG5cdFx0XHRmcmFtZVRpbWUgKz0gKHRoaXNGcmFtZVRpbWUgLSBmcmFtZVRpbWUpIC8gby5zbW9vdGhpbmc7XG5cdFx0XHRzZWxmLmZwcyA9IDEwMDAgLyBmcmFtZVRpbWU7XG5cdFx0XHRzZWxmLmR1cmF0aW9uID0gZnJhbWVTdGFydCA8IGxhc3RMb29wID8gZnJhbWVUaW1lIDogdGltZSAtIGZyYW1lU3RhcnQ7XG5cdFx0XHRsYXN0TG9vcCA9IHRpbWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFBhdXNlIGRpc3BsYXkgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDE7XG5cdFx0XHRcdGNsZWFyVGltZW91dChmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKGZyYW1lSUQpO1xuXHRcdFx0XHRjQUYocmVuZGVySUQpO1xuXHRcdFx0XHRmcmFtZUlEID0gcmVuZGVySUQgPSAwO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3VtZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIWZyYW1lSUQpIHtcblx0XHRcdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cdFx0XHRcdHJlcXVlc3RSZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICBPcHRpb24gbmFtZS5cblx0XHQgKiBAcGFyYW0ge01peGVkfSAgdmFsdWUgTmV3IHZhbHVlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNldCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0b1tuYW1lXSA9IHZhbHVlO1xuXHRcdFx0c2hvd0ZwcyA9IG8uc2hvdyA9PT0gJ2Zwcyc7XG5cblx0XHRcdC8vIFJlYnVpbGQgb3IgcmVwb3NpdGlvbiBlbGVtZW50cyB3aGVuIHNwZWNpZmljIG9wdGlvbiBoYXMgYmVlbiB1cGRhdGVkXG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZWJ1aWxkZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChpbkFycmF5KG5hbWUsIHJlcG9zaXRpb25lcnMpICE9PSAtMSkge1xuXHRcdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gcmVuZGVyaW5nIGR1cmF0aW9uIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0R1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnbXMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgbWV0ZXIgaW50byBGUFMgbW9kZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93RnBzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVG9nZ2xlcyBiZXR3ZWVuIHNob3c6ICdmcHMnIGFuZCBzaG93OiAnZHVyYXRpb24nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93Jywgc2hvd0ZwcyA/ICdtcycgOiAnZnBzJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSGlkZSB0aGUgRlBTTWV0ZXIuIEFsc28gcGF1c2VzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucGF1c2UoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNob3cgdGhlIEZQU01ldGVyLiBBbHNvIHJlc3VtZXMgdGhlIHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5yZXN1bWUoKTtcblx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGVjayB0aGUgY3VycmVudCBGUFMgYW5kIHNhdmUgaXQgaW4gaGlzdG9yeS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gaGlzdG9yeVRpY2soKSB7XG5cdFx0XHRmb3IgKGkgPSBvLmhpc3Rvcnk7IGktLTspIHtcblx0XHRcdFx0ZnBzSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmZwcyA6IGZwc0hpc3RvcnlbaS0xXTtcblx0XHRcdFx0ZHVyYXRpb25IaXN0b3J5W2ldID0gaSA9PT0gMCA/IHNlbGYuZHVyYXRpb24gOiBkdXJhdGlvbkhpc3RvcnlbaS0xXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIGhlYXQgaGV4IGNvbG9yIGJhc2VkIG9uIHZhbHVlcyBwYXNzZWQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBoZWF0bWFwXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gdmFsdWVcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtaW5cblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBtYXhcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0ludGVnZXJ9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZ2V0SGVhdChoZWF0bWFwLCB2YWx1ZSwgbWluLCBtYXgpIHtcblx0XHRcdHJldHVybiBoZWF0bWFwc1swfGhlYXRtYXBdW01hdGgucm91bmQoTWF0aC5taW4oKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pICogaGVhdERlcHRoLCBoZWF0RGVwdGgpKV07XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIGNvdW50ZXIgbnVtYmVyIGFuZCBsZWdlbmQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHVwZGF0ZUNvdW50ZXIoKSB7XG5cdFx0XHQvLyBVcGRhdGUgbGVnZW5kIG9ubHkgd2hlbiBjaGFuZ2VkXG5cdFx0XHRpZiAoZWwubGVnZW5kLmZwcyAhPT0gc2hvd0Zwcykge1xuXHRcdFx0XHRlbC5sZWdlbmQuZnBzID0gc2hvd0Zwcztcblx0XHRcdFx0ZWwubGVnZW5kW3RleHRQcm9wXSA9IHNob3dGcHMgPyAnRlBTJyA6ICdtcyc7XG5cdFx0XHR9XG5cdFx0XHQvLyBVcGRhdGUgY291bnRlciB3aXRoIGEgbmljZWx5IGZvcm1hdGVkICYgcmVhZGFibGUgbnVtYmVyXG5cdFx0XHRjb3VudCA9IHNob3dGcHMgPyBzZWxmLmZwcyA6IHNlbGYuZHVyYXRpb247XG5cdFx0XHRlbC5jb3VudFt0ZXh0UHJvcF0gPSBjb3VudCA+IDk5OSA/ICc5OTkrJyA6IGNvdW50LnRvRml4ZWQoY291bnQgPiA5OSA/IDAgOiBvLmRlY2ltYWxzKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZW5kZXIgY3VycmVudCBGUFMgc3RhdGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHQvLyBJZiByZW5kZXJlciBzdG9wcGVkIHJlcG9ydGluZywgZG8gYSBzaW11bGF0ZWQgZHJvcCB0byAwIGZwc1xuXHRcdFx0aWYgKGxhc3RMb29wIDwgdGltZSAtIG8udGhyZXNob2xkKSB7XG5cdFx0XHRcdHNlbGYuZnBzIC09IHNlbGYuZnBzIC8gTWF0aC5tYXgoMSwgby5zbW9vdGhpbmcgKiA2MCAvIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRzZWxmLmR1cmF0aW9uID0gMTAwMCAvIHNlbGYuZnBzO1xuXHRcdFx0fVxuXG5cdFx0XHRoaXN0b3J5VGljaygpO1xuXHRcdFx0dXBkYXRlQ291bnRlcigpO1xuXG5cdFx0XHQvLyBBcHBseSBoZWF0IHRvIGVsZW1lbnRzXG5cdFx0XHRpZiAoby5oZWF0KSB7XG5cdFx0XHRcdGlmIChoZWF0aW5nLmxlbmd0aCkge1xuXHRcdFx0XHRcdGZvciAoaSA9IGhlYXRpbmcubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdFx0XHRoZWF0aW5nW2ldLmVsLnN0eWxlW3RoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5mcHMsIDAsIG8ubWF4RnBzKSA6XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0bWFwLCBzZWxmLmR1cmF0aW9uLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGVsLmdyYXBoICYmIHRoZW1lLmNvbHVtbi5oZWF0T24pIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBjb2xzLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0Y29sc1tpXS5zdHlsZVt0aGVtZS5jb2x1bW4uaGVhdE9uXSA9IHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBmcHNIaXN0b3J5W2ldLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lLmNvbHVtbi5oZWF0bWFwLCBkdXJhdGlvbkhpc3RvcnlbaV0sIG8udGhyZXNob2xkLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIGdyYXBoIGNvbHVtbnMgaGVpZ2h0XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG8uaGlzdG9yeTsgaisrKSB7XG5cdFx0XHRcdFx0Y29sc1tqXS5zdHlsZS5oZWlnaHQgPSAoc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHQoZnBzSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLm1heEZwcyAqIE1hdGgubWluKGZwc0hpc3Rvcnlbal0sIG8ubWF4RnBzKSkgOiAwKSA6XG5cdFx0XHRcdFx0XHQoZHVyYXRpb25IaXN0b3J5W2pdID8gTWF0aC5yb3VuZChncmFwaEhlaWdodCAvIG8udGhyZXNob2xkICogTWF0aC5taW4oZHVyYXRpb25IaXN0b3J5W2pdLCBvLnRocmVzaG9sZCkpIDogMClcblx0XHRcdFx0XHQpICsgJ3B4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlcXVlc3QgcmVuZGVyaW5nIGxvb3AuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnR9IEFuaW1hdGlvbiBmcmFtZSBpbmRleC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZXF1ZXN0UmVuZGVyKCkge1xuXHRcdFx0aWYgKG8uaW50ZXJ2YWwgPCAyMCkge1xuXHRcdFx0XHRmcmFtZUlEID0gckFGKHJlcXVlc3RSZW5kZXIpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZyYW1lSUQgPSBzZXRUaW1lb3V0KHJlcXVlc3RSZW5kZXIsIG8uaW50ZXJ2YWwpO1xuXHRcdFx0XHRyZW5kZXJJRCA9IHJBRihyZW5kZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIE1ldGVyIGV2ZW50cyBoYW5kbGVyLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBldmVudEhhbmRsZXIoZXZlbnQpIHtcblx0XHRcdGV2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuXHRcdFx0aWYgKGV2ZW50LnByZXZlbnREZWZhdWx0KSB7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHRcdFx0ZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHNlbGYudG9nZ2xlKCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogRGVzdHJveXMgdGhlIGN1cnJlbnQgRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFN0b3AgcmVuZGVyaW5nXG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHQvLyBSZW1vdmUgZWxlbWVudHNcblx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHQvLyBTdG9wIGxpc3RlbmluZ1xuXHRcdFx0c2VsZi50aWNrID0gc2VsZi50aWNrU3RhcnQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlbW92ZU1ldGVyKCkge1xuXHRcdFx0Ly8gVW5iaW5kIGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIsIDEpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gRGV0YWNoIGVsZW1lbnRcblx0XHRcdGFuY2hvci5yZW1vdmVDaGlsZChlbC5jb250YWluZXIpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNldHMgdGhlIHRoZW1lLCBhbmQgZ2VuZXJhdGVzIGhlYXRtYXBzIHdoZW4gbmVlZGVkLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHNldFRoZW1lKCkge1xuXHRcdFx0dGhlbWUgPSBGUFNNZXRlci50aGVtZVtvLnRoZW1lXTtcblxuXHRcdFx0Ly8gR2VuZXJhdGUgaGVhdG1hcHNcblx0XHRcdGhlYXRtYXBzID0gdGhlbWUuY29tcGlsZWRIZWF0bWFwcyB8fCBbXTtcblx0XHRcdGlmICghaGVhdG1hcHMubGVuZ3RoICYmIHRoZW1lLmhlYXRtYXBzLmxlbmd0aCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhlbWUuaGVhdG1hcHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRoZWF0bWFwc1tqXSA9IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gaGVhdERlcHRoOyBpKyspIHtcblx0XHRcdFx0XHRcdGhlYXRtYXBzW2pdW2ldID0gaHNsVG9IZXgoMC4zMyAvIGhlYXREZXB0aCAqIGksIHRoZW1lLmhlYXRtYXBzW2pdLnNhdHVyYXRpb24sIHRoZW1lLmhlYXRtYXBzW2pdLmxpZ2h0bmVzcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgPSBoZWF0bWFwcztcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0aGUgbWV0ZXIgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gY3JlYXRlTWV0ZXIoKSB7XG5cdFx0XHQvLyBSZW1vdmUgb2xkIG1ldGVyIGlmIHByZXNlbnRcblx0XHRcdGlmIChlbC5jb250YWluZXIpIHtcblx0XHRcdFx0cmVtb3ZlTWV0ZXIoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZW1lXG5cdFx0XHRzZXRUaGVtZSgpO1xuXG5cdFx0XHQvLyBDcmVhdGUgZWxlbWVudHNcblx0XHRcdGVsLmNvbnRhaW5lciA9IGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb250YWluZXIpO1xuXHRcdFx0ZWwuY291bnQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvdW50KSk7XG5cdFx0XHRlbC5sZWdlbmQgPSBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmxlZ2VuZCkpO1xuXHRcdFx0ZWwuZ3JhcGggPSBvLmdyYXBoID8gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5ncmFwaCkpIDogMDtcblxuXHRcdFx0Ly8gQWRkIGVsZW1lbnRzIHRvIGhlYXRpbmcgYXJyYXlcblx0XHRcdGhlYXRpbmcubGVuZ3RoID0gMDtcblx0XHRcdGZvciAodmFyIGtleSBpbiBlbCkge1xuXHRcdFx0XHRpZiAoZWxba2V5XSAmJiB0aGVtZVtrZXldLmhlYXRPbikge1xuXHRcdFx0XHRcdGhlYXRpbmcucHVzaCh7XG5cdFx0XHRcdFx0XHRuYW1lOiBrZXksXG5cdFx0XHRcdFx0XHRlbDogZWxba2V5XVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdyYXBoXG5cdFx0XHRjb2xzLmxlbmd0aCA9IDA7XG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGdyYXBoXG5cdFx0XHRcdGVsLmdyYXBoLnN0eWxlLndpZHRoID0gKG8uaGlzdG9yeSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIChvLmhpc3RvcnkgLSAxKSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cblx0XHRcdFx0Ly8gQWRkIGNvbHVtbnNcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG8uaGlzdG9yeTsgaSsrKSB7XG5cdFx0XHRcdFx0Y29sc1tpXSA9IGVsLmdyYXBoLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb2x1bW4pKTtcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLmJvdHRvbSA9IDA7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5yaWdodCA9IChpICogdGhlbWUuY29sdW1uLndpZHRoICsgaSAqIHRoZW1lLmNvbHVtbi5zcGFjaW5nKSArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS53aWR0aCA9IHRoZW1lLmNvbHVtbi53aWR0aCArICdweCc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5oZWlnaHQgPSAnMHB4Jztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlIGluaXRpYWwgc3RhdGVcblx0XHRcdHBvc2l0aW9uTWV0ZXIoKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwZW5kIGNvbnRhaW5lciB0byBhbmNob3Jcblx0XHRcdGFuY2hvci5hcHBlbmRDaGlsZChlbC5jb250YWluZXIpO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSBncmFwaCBoZWlnaHQgYWZ0ZXIgaXQgd2FzIGFwcGVuZGVkIHRvIERPTVxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGdyYXBoSGVpZ2h0ID0gZWwuZ3JhcGguY2xpZW50SGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXG5cdFx0XHRpZiAoby50b2dnbGVPbikge1xuXHRcdFx0XHRpZiAoby50b2dnbGVPbiA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGVsLmNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdGVuZXIoZWwuY29udGFpbmVyLCBvLnRvZ2dsZU9uLCBldmVudEhhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFBvc2l0aW9ucyB0aGUgbWV0ZXIgYmFzZWQgb24gb3B0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcG9zaXRpb25NZXRlcigpIHtcblx0XHRcdGFwcGx5VGhlbWUoZWwuY29udGFpbmVyLCBvKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBDb25zdHJ1Y3QuXG5cdFx0ICovXG5cdFx0KGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIENyZWF0ZSBtZXRlciBlbGVtZW50XG5cdFx0XHRjcmVhdGVNZXRlcigpO1xuXHRcdFx0Ly8gU3RhcnQgcmVuZGVyaW5nXG5cdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0fSgpKTtcblx0fVxuXG5cdC8vIEV4cG9zZSB0aGUgZXh0ZW5kIGZ1bmN0aW9uXG5cdEZQU01ldGVyLmV4dGVuZCA9IGV4dGVuZDtcblxuXHQvLyBFeHBvc2UgdGhlIEZQU01ldGVyIGNsYXNzXG5cdHdpbmRvdy5GUFNNZXRlciA9IEZQU01ldGVyO1xuXG5cdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRGUFNNZXRlci5kZWZhdWx0cyA9IHtcblx0XHRpbnRlcnZhbDogIDEwMCwgICAgIC8vIFVwZGF0ZSBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG5cdFx0c21vb3RoaW5nOiAxMCwgICAgICAvLyBTcGlrZSBzbW9vdGhpbmcgc3RyZW5ndGguIDEgbWVhbnMgbm8gc21vb3RoaW5nLlxuXHRcdHNob3c6ICAgICAgJ2ZwcycsICAgLy8gV2hldGhlciB0byBzaG93ICdmcHMnLCBvciAnbXMnID0gZnJhbWUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHRvZ2dsZU9uOiAgJ2NsaWNrJywgLy8gVG9nZ2xlIGJldHdlZW4gc2hvdyAnZnBzJyBhbmQgJ21zJyBvbiB0aGlzIGV2ZW50LlxuXHRcdGRlY2ltYWxzOiAgMSwgICAgICAgLy8gTnVtYmVyIG9mIGRlY2ltYWxzIGluIEZQUyBudW1iZXIuIDEgPSA1OS45LCAyID0gNTkuOTQsIC4uLlxuXHRcdG1heEZwczogICAgNjAsICAgICAgLy8gTWF4IGV4cGVjdGVkIEZQUyB2YWx1ZS5cblx0XHR0aHJlc2hvbGQ6IDEwMCwgICAgIC8vIE1pbmltYWwgdGljayByZXBvcnRpbmcgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXG5cdFx0Ly8gTWV0ZXIgcG9zaXRpb25cblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJywgLy8gTWV0ZXIgcG9zaXRpb24uXG5cdFx0ekluZGV4OiAgIDEwLCAgICAgICAgIC8vIE1ldGVyIFogaW5kZXguXG5cdFx0bGVmdDogICAgICc1cHgnLCAgICAgIC8vIE1ldGVyIGxlZnQgb2Zmc2V0LlxuXHRcdHRvcDogICAgICAnNXB4JywgICAgICAvLyBNZXRlciB0b3Agb2Zmc2V0LlxuXHRcdHJpZ2h0OiAgICAnYXV0bycsICAgICAvLyBNZXRlciByaWdodCBvZmZzZXQuXG5cdFx0Ym90dG9tOiAgICdhdXRvJywgICAgIC8vIE1ldGVyIGJvdHRvbSBvZmZzZXQuXG5cdFx0bWFyZ2luOiAgICcwIDAgMCAwJywgIC8vIE1ldGVyIG1hcmdpbi4gSGVscHMgd2l0aCBjZW50ZXJpbmcgdGhlIGNvdW50ZXIgd2hlbiBsZWZ0OiA1MCU7XG5cblx0XHQvLyBUaGVtZVxuXHRcdHRoZW1lOiAnZGFyaycsIC8vIE1ldGVyIHRoZW1lLiBCdWlsZCBpbjogJ2RhcmsnLCAnbGlnaHQnLCAndHJhbnNwYXJlbnQnLCAnY29sb3JmdWwnLlxuXHRcdGhlYXQ6ICAwLCAgICAgIC8vIEFsbG93IHRoZW1lcyB0byB1c2UgY29sb3JpbmcgYnkgRlBTIGhlYXQuIDAgRlBTID0gcmVkLCBtYXhGcHMgPSBncmVlbi5cblxuXHRcdC8vIEdyYXBoXG5cdFx0Z3JhcGg6ICAgMCwgLy8gV2hldGhlciB0byBzaG93IGhpc3RvcnkgZ3JhcGguXG5cdFx0aGlzdG9yeTogMjAgLy8gSG93IG1hbnkgaGlzdG9yeSBzdGF0ZXMgdG8gc2hvdyBpbiBhIGdyYXBoLlxuXHR9O1xuXG5cdC8vIE9wdGlvbiBuYW1lcyB0aGF0IHRyaWdnZXIgRlBTTWV0ZXIgcmVidWlsZCBvciByZXBvc2l0aW9uIHdoZW4gbW9kaWZpZWRcblx0dmFyIHJlYnVpbGRlcnMgPSBbXG5cdFx0J3RvZ2dsZU9uJyxcblx0XHQndGhlbWUnLFxuXHRcdCdoZWF0Jyxcblx0XHQnZ3JhcGgnLFxuXHRcdCdoaXN0b3J5J1xuXHRdO1xuXHR2YXIgcmVwb3NpdGlvbmVycyA9IFtcblx0XHQncG9zaXRpb24nLFxuXHRcdCd6SW5kZXgnLFxuXHRcdCdsZWZ0Jyxcblx0XHQndG9wJyxcblx0XHQncmlnaHQnLFxuXHRcdCdib3R0b20nLFxuXHRcdCdtYXJnaW4nXG5cdF07XG59KHdpbmRvdykpO1xuOyhmdW5jdGlvbiAodywgRlBTTWV0ZXIsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gVGhlbWVzIG9iamVjdFxuXHRGUFNNZXRlci50aGVtZSA9IHt9O1xuXG5cdC8vIEJhc2UgdGhlbWUgd2l0aCBsYXlvdXQsIG5vIGNvbG9yc1xuXHR2YXIgYmFzZSA9IEZQU01ldGVyLnRoZW1lLmJhc2UgPSB7XG5cdFx0aGVhdG1hcHM6IFtdLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cGFkZGluZzogJzVweCcsXG5cdFx0XHRtaW5XaWR0aDogJzk1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzBweCcsXG5cdFx0XHR0ZXh0QWxpZ246ICdyaWdodCcsXG5cdFx0XHR0ZXh0U2hhZG93OiAnbm9uZSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdHRvcDogMCxcblx0XHRcdHJpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcyNHB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdDb25zb2xhcywgQW5kYWxlIE1vbm8sIG1vbm9zcGFjZScsXG5cdFx0XHR6SW5kZXg6IDJcblx0XHR9LFxuXHRcdGxlZ2VuZDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRsZWZ0OiAwLFxuXHRcdFx0cGFkZGluZzogJzVweCAxMHB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0Zm9udFNpemU6ICcxMnB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICczMnB4Jyxcblx0XHRcdGZvbnRGYW1pbHk6ICdzYW5zLXNlcmlmJyxcblx0XHRcdHRleHRBbGlnbjogJ2xlZnQnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRncmFwaDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0XHRib3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRNb3pCb3hTaXppbmc6ICdwYWRkaW5nLWJveCcsXG5cdFx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRcdHpJbmRleDogMVxuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0d2lkdGg6IDQsXG5cdFx0XHRzcGFjaW5nOiAxLFxuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbFxuXHRcdH1cblx0fTtcblxuXHQvLyBEYXJrIHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmRhcmsgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC44XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzIyMicsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0Ym9yZGVyOiAnMXB4IHNvbGlkICMxYTFhMWEnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCAjMjIyJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdGhlYXRPbjogJ2NvbG9yJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzNmM2YzZidcblx0XHR9XG5cdH0pO1xuXG5cdC8vIExpZ2h0IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmxpZ2h0ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjUsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0Y29sb3I6ICcjNjY2Jyxcblx0XHRcdGJhY2tncm91bmQ6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSksIC0xcHggLTFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpJyxcblx0XHRcdGJveFNoYWRvdzogJzAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyNlYWVhZWEnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBDb2xvcmZ1bCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5jb2xvcmZ1bCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjZcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzg4OCcsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDAsMCwwLC4yKScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjNzc3Jyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsLjIpJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gVHJhbnNwYXJlbnQgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUudHJhbnNwYXJlbnQgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuOCxcblx0XHRcdGxpZ2h0bmVzczogMC41XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRwYWRkaW5nOiAwLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuNSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0cGFkZGluZzogJzAgNXB4Jyxcblx0XHRcdGhlaWdodDogJzQwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MnB4J1xuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdGhlaWdodDogJzQwcHgnXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdHdpZHRoOiA1LFxuXHRcdFx0YmFja2dyb3VuZDogJyM5OTknLFxuXHRcdFx0aGVhdE9uOiAnYmFja2dyb3VuZENvbG9yJyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdH1cblx0fSk7XG59KHdpbmRvdywgRlBTTWV0ZXIpKTsiLCJpbXBvcnQgJy4vbGliL3RpbnktY2FudmFzLmpzJztcbmltcG9ydCAnLi9saWIvc291bmRzLmpzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgcmVqZWN0cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgJ2Zwc21ldGVyJztcblxuZGVjbGFyZSB2YXIgZmlyZVNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBqdW1wU291bmQ6IGFueTtcbmRlY2xhcmUgdmFyIGhpdFNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBGUFNNZXRlcjogYW55O1xuXG5jb25zdCBmcHNNID0gbmV3IEZQU01ldGVyKCk7XG5cbmRlY2xhcmUgdmFyIFRDOiBhbnk7XG5kZWNsYXJlIHZhciBUQ1RleDogYW55O1xubGV0IHJuZDogKCkgPT4gbnVtYmVyID0gTWF0aC5yYW5kb21cblxuaW50ZXJmYWNlIFZlY3RvciB7XG4gIHg6IG51bWJlclxuICB5OiBudW1iZXJcbn1cbmludGVyZmFjZSBDYW1lcmF7XG4gIHBvc2l0aW9uOiBWZWN0b3JcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICBtYXhYOiBudW1iZXJcbiAgbWF4WTogbnVtYmVyXG59XG5cbmludGVyZmFjZSBQYXJ0aWNsZSBleHRlbmRzIEJvZHl7XG59XG5cbmludGVyZmFjZSBCdWxsZXQgZXh0ZW5kcyBCb2R5IHtcbn1cbmludGVyZmFjZSBCb2R5IHtcbiAgcG9zaXRpb246IFZlY3RvclxuICB2ZWxvY2l0eTogVmVjdG9yXG4gIGRpcjogRGlyXG4gIGhlaWdodDogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgdmlzaWJsZTogYm9vbGVhblxufVxuaW50ZXJmYWNlIFBsYXllciBleHRlbmRzIEJvZHkge1xuICBzaG9vdGluZzogYm9vbGVhblxuICBjYXJyaW5nPzogQm9keVxufVxuaW50ZXJmYWNlIEVuZW15IGV4dGVuZHMgQm9keSB7XG4gIGxpZmU6IG51bWJlclxuICBoaXR0ZWQ6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcGxheWVyOiBQbGF5ZXJcbiAgZW5lbWllczogRW5lbXlbXVxuICBidWxsZXRzOiBCdWxsZXRbXSxcbiAgaG9zdGFnZXM6IEJvZHlbXVxufVxuXG5pbnRlcmZhY2UgSW1nVGV4dHVyZSB7XG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgdGV4dDogV2ViR0xUZXh0dXJlXG59XG5lbnVtIERpciB7XG4gIExlZnQsXG4gIFJpZ2h0XG59XG5cbmVudW0gRXZlbnRUeXBlIHtcbiAgUlAsXG4gIExSLFxuICBSUixcbiAgTFAsXG4gIEpQLFxuICBVUCxcbiAgQVAsXG4gIEFSXG59XG5cbnR5cGUgQWN0aW9uID0gRXZlbnRUeXBlXG50eXBlIE1vZGVsID0gU3RhdGU7XG52YXIgY2FudmFzID0gVEMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MnKSlcbmludGVyZmFjZSBBQUJCIHtcbiAgbHQ6IFZlY3RvclxuICBydDogVmVjdG9yXG4gIHJiOiBWZWN0b3JcbiAgbGI6IFZlY3RvclxufVxuXG5mdW5jdGlvbiByZG5BbmdsZSgpOiBudW1iZXJ7XG4gIGNvbnN0IHYgPSAocm5kKCkgKiAoMTI1LTApICsgMCkvMTAwMFxuICBpZihybmQoKSA+PSAwLjUpe1xuICAgICAgcmV0dXJuICgyLXYpICogTWF0aC5QSSBcbiAgfWVsc2V7XG4gICAgICByZXR1cm4gdiAqIE1hdGguUElcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBQUJCKGI6IEJvZHkpOiBBQUJCIHtcbiAgcmV0dXJuIHtcbiAgICBsdDogeyB4OiBiLnBvc2l0aW9uLngsIHk6IGIucG9zaXRpb24ueSB9LFxuICAgIHJ0OiB7IHg6IGIucG9zaXRpb24ueCArIGIud2lkdGgsIHk6IGIucG9zaXRpb24ueSB9LFxuICAgIHJiOiB7IHg6IGIucG9zaXRpb24ueCArIGIud2lkdGgsIHk6IGIucG9zaXRpb24ueSArIGIuaGVpZ2h0IH0sXG4gICAgbGI6IHsgeDogYi5wb3NpdGlvbi54LCB5OiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGlsZUluZGVjZXModjogVmVjdG9yKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3Iodi55IC8gMjAgLyogdGlsZVNpemUgKi8pICogNTAgLyogd29ybGRTaXplICovICsgTWF0aC5mbG9vcih2LnggLyAyMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaWRlKGJvZHkxOiBCb2R5LCBib2R5MjogQm9keSk6IGJvb2xlYW4ge1xuICBjb25zdCByZXN1bHQgPSBib2R5MS5wb3NpdGlvbi54IDwgKGJvZHkyLnBvc2l0aW9uLnggKyBib2R5Mi53aWR0aCkgJiZcbiAgICBib2R5MS5wb3NpdGlvbi54ICsgKGJvZHkxLndpZHRoKSA+IGJvZHkyLnBvc2l0aW9uLnggJiZcbiAgICBib2R5MS5wb3NpdGlvbi55IDwgYm9keTIucG9zaXRpb24ueSArIGJvZHkyLmhlaWdodCAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnkgKyBib2R5MS5oZWlnaHQgPiBib2R5Mi5wb3NpdGlvbi55O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBsb2FkVGV4dHVyZXModXJsczogc3RyaW5nW10pOiBQcm9taXNlPEltZ1RleHR1cmVbXT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmVyLCByZWplY3RzKSA9PiB7XG4gICAgbGV0IHJlc3VsdDogSW1nVGV4dHVyZVtdID0gbmV3IEFycmF5PEltZ1RleHR1cmU+KCk7XG5cbiAgICB1cmxzLmZvckVhY2goKHVybCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZVxuICAgICAgaW1nLnNyYyA9IHVybFxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgIGcuY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHRcbiAgICAgICAgZy5jYW52YXMud2lkdGggPSBpbWcud2lkdGhcbiAgICAgICAgZy5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGNvbnN0IHRleDEgPSB7XG4gICAgICAgICAgd2lkdGg6IGltZy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHQsXG4gICAgICAgICAgdGV4dDogVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpIGFzIFdlYkdMVGV4dHVyZVxuICAgICAgICB9XG5cbiAgICAgICAgZy5jbGVhclJlY3QoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBnLnNhdmUoKVxuICAgICAgICBnLnNjYWxlKC0xLCAxKVxuICAgICAgICBnLmRyYXdJbWFnZShpbWcsIGltZy53aWR0aCAqIC0xLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcucmVzdG9yZSgpXG4gICAgICAgIGNvbnN0IHRleDIgPSB7XG4gICAgICAgICAgd2lkdGg6IGltZy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHQsXG4gICAgICAgICAgdGV4dDogVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpIGFzIFdlYkdMVGV4dHVyZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgaSA9IGluZGV4KjI7XG4gICAgICAgIHJlc3VsdFtpKytdID0gdGV4MVxuICAgICAgICByZXN1bHRbaV0gPSB0ZXgyXG4gICAgICAgIGlmIChpbmRleCA9PSB1cmxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmVyKHJlc3VsdClcbiAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVsbGV0VGV4dHVyZSgpe1xuICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIilcbiAgZy5jYW52YXMud2lkdGggPSA0XG4gIGcuY2FudmFzLmhlaWdodCA9IDRcbiAgZy5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgZy5maWxsU3R5bGUgPSAnI2ZmNic7XG4gIGcuYmVnaW5QYXRoKCk7XG4gIGcuYXJjKDIsIDIsIDIsIDAsIDIgKiBNYXRoLlBJKTtcbiAgZy5maWxsKClcbiAgcmV0dXJuIFRDVGV4KGNhbnZhcy5nLCBnLmNhbnZhcywgNCwgNCkgYXMgV2ViR0xUZXh0dXJlXG59XG5cbmxvYWRUZXh0dXJlcyhbXCJzb2xkaWVyX2hvc3QucG5nXCIsXCJob3N0YWdlLnBuZ1wiLFwiYm90aGl0dGVkLnBuZ1wiXG4sXCJtb3VudGFpbi5wbmdcIixcImZsb29yLnBuZ1wiLCBcInNvbGRpZXJfcnVuLnBuZ1wiLCBcInNvbGRpZXJfaWRsZS5wbmdcIiwgXG5cInNvbGRpZXJfc2hvb3RpbmcucG5nXCIsIFwiYm90LnBuZ1wiLCBcImFiY251bS5wbmdcIl0pLnRoZW4oKHRleHR1cmVzKSA9PiB7XG4gIGNvbnN0IFtyU29sSG9zdCxsU29sSG9zdCxySG9zdCxsSG9zdCxyYm90SGl0LGxib3RIaXQsXG4gICAgLGxNb3VudGFpbixyaWdodEZsb29yLGxlZnRGbG9vciwgcmlnaHRSdW4sIGxlZnRSdW4sIHJpZ2h0SWRsZVxuICAgICwgbGVmdElkbGUsIHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgcmlnaHRCb3QsIGxlZnRCb3QsIGFiYywsXSA9IHRleHR1cmVzXG5cbiAgY29uc3QgYnVsbGV0VGV4dHVyZSA9IGNyZWF0ZUJ1bGxldFRleHR1cmUoKVxuXG4gIGxldCBjdXJyZW50RGVsdGEgPSAwLjBcbiAgbGV0IGN1cnJlbnRUaW1lID0gMC4wXG4gIGxldCBjdXJyZW50QWN0aW9uOiBBY3Rpb24gPSBudWxsXG4gIGNvbnN0IEdSQVZJVFkgPSAxMFxuXG4gIGNvbnN0IEpVTVBfVkVMID0gMzBcbiAgY29uc3QgV0FMS19TUEVFRCA9IDZcbiAgbGV0IHN0YXJ0VGltZSA9IDA7XG4gIGxldCBpZCA9IDA7XG4gIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IFtjYW52YXMuZy5jYW52YXMud2lkdGgsIGNhbnZhcy5nLmNhbnZhcy5oZWlnaHRdXG5cblxuICBsZXQgcGFydGljbGVzOiBQYXJ0aWNsZVtdID0gW11cbiAgbGV0IHBlcnNpc3RlbmNlOiBQYXJ0aWNsZVtdID0gW11cblxuICBmdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xuICAgIHZhciByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiAoZXZ0LmNsaWVudFggLSByZWN0LmxlZnQpKjAuMyxcbiAgICAgIHk6IChldnQuY2xpZW50WSAtIHJlY3QudG9wKSAqIDAuMTVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGluaXRCdWxsZXRzKG51bTogbnVtYmVyKTogQnVsbGV0W10ge1xuICAgIGNvbnN0IGJzOiBCdWxsZXRbXSA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgYnMucHVzaCh7IHBvc2l0aW9uOiB7IHg6IDUwLCB5OiA1MCB9LCB2ZWxvY2l0eTogeyB4OiAwLCB5OiAwIH0sIHZpc2libGU6IGZhbHNlLCBkaXI6IERpci5MZWZ0LCB3aWR0aDogNCwgaGVpZ2h0OiA0IH0pXG4gICAgfVxuICAgIHJldHVybiBic1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEhvc3RhKG51bTogbnVtYmVyKTogQm9keVtdIHtcbiAgICBjb25zdCBiczogQm9keVtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICBicy5wdXNoKHsgcG9zaXRpb246IHsgeDogNTAsIHk6IDUwIH0sIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSwgdmlzaWJsZTogdHJ1ZSwgZGlyOiBEaXIuTGVmdCwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2IH0pXG4gICAgfVxuICAgIHJldHVybiBic1xuICB9XG5cblxuICBmdW5jdGlvbiBuZXdFbmVteSh4OiBudW1iZXIsIHk6bnVtYmVyLCB2ZWw6IG51bWJlcik6IEVuZW15IHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246IHsgeDogeCwgeTogeSB9LFxuICAgICAgdmVsb2NpdHk6IHsgeDogdmVsLCB5OiAwLjAgfSxcbiAgICAgIGRpcjogRGlyLkxlZnQsXG4gICAgICB3aWR0aDogMjAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICBoaXR0ZWQ6IGZhbHNlLFxuICAgICAgbGlmZTogNVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBuZXdFbmVtaWVzKHg6IG51bWJlciwgeTpudW1iZXIsIG46IG51bWJlcik6IEVuZW15IFtde1xuICAgIGNvbnN0IGVzID0gW11cbiAgICBmb3IodmFyIGk9MDsgIGk8IG47IGkrKyl7XG4gICAgICBlcy5wdXNoKG5ld0VuZW15KHgseSxXQUxLX1NQRUVEKiBybmQoKSAqICgzLjktMS43KSArIDEuNykpXG4gICAgfVxuICAgIHJldHVybiAgZXNcbiAgfVxuXG4gIGNvbnN0IGNhbTogQ2FtZXJhID0ge3Bvc2l0aW9uOnt4OjAseTowfSx3aWR0aDozMDAsaGVpZ2h0OiAxNTAsIG1heFg6MCxtYXhZOjB9XG4gIHdpbmRvd1tcImNhbVwiXSA9IGNhbVxuXG4gIGxldCBjYW1DZW50ZXIgPSBjYW0ucG9zaXRpb25cbiAgbGV0IHJhZGlvVG9TaGFrZSA9IDBcbiAgbGV0IHNoYWtlID0gZmFsc2VcblxuICBmdW5jdGlvbiBzaGFraW5nKCl7XG4gICAgY29uc3QgeCA9IDAsIHkgPSAwXG4gICAgY29uc3QgYW5nID0gcm5kKCkgJSBNYXRoLlBJICogMlxuICAgIGNvbnN0IG54ID0gTWF0aC5zaW4oYW5nKSAqIHJhZGlvVG9TaGFrZVxuICAgIGNvbnN0IG55ID0gTWF0aC5jb3MoYW5nKSAqIHJhZGlvVG9TaGFrZVxuICAgIGNhbS5wb3NpdGlvbi54ID0geCArIG54XG4gICAgY2FtLnBvc2l0aW9uLnkgPSB5ICsgbnlcbiAgICByYWRpb1RvU2hha2UgKj0gMC45XG4gIH1cbiAgY2FudmFzLmcuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBwb3MgPSBnZXRNb3VzZVBvcyhjYW52YXMuZy5jYW52YXMsIGV2ZW50KVxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3RhdGUuaG9zdGFnZXMubGVuZ3RoOyBpKyspe1xuICAgICAgY29uc3QgaG9zdCA9IGN1cnJlbnRTdGF0ZS5ob3N0YWdlc1tpXVxuICAgICAgICBob3N0LnBvc2l0aW9uLnggPSBjYW0ucG9zaXRpb24ueCtwb3MueFxuICAgICAgICBob3N0LnBvc2l0aW9uLnkgPSBjYW0ucG9zaXRpb24ueStwb3MueVxuICAgICAgICBob3N0LnZpc2libGUgPSB0cnVlXG4gICAgfVxuICB9KVxuXG4vKiAgIGNhbnZhcy5nLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgbGV0IHRha2UgPSAxXG4gICAgY29uc3QgcG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLmcuY2FudmFzLCBldmVudClcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3VycmVudFN0YXRlLmVuZW1pZXMubGVuZ3RoOyBpKyspe1xuICAgICAgY29uc3QgZW5lID0gY3VycmVudFN0YXRlLmVuZW1pZXNbaV1cbiAgICAgIGlmKCFlbmUudmlzaWJsZSAmJiB0YWtlID4gMCl7XG4gICAgICAgIGVuZS5wb3NpdGlvbi54ID0gY2FtLnBvc2l0aW9uLngrcG9zLnhcbiAgICAgICAgZW5lLnBvc2l0aW9uLnkgPSBjYW0ucG9zaXRpb24ueStwb3MueVxuICAgICAgICBlbmUudmlzaWJsZSA9IHRydWVcbiAgICAgICAgZW5lLnZpc2libGUgPSB0cnVlXG4gICAgICAgIGVuZS5saWZlID0gNVxuICAgICAgICBlbmUudmVsb2NpdHkueCA9ICBybmQoKSAqICgzLjktMS43KSArIDEuNyAgKiAoIGN1cnJlbnRTdGF0ZS5wbGF5ZXIucG9zaXRpb24ueCA+IGVuZS5wb3NpdGlvbi54ID9cbiAgICAgICAgV0FMS19TUEVFRCA6IC1XQUxLX1NQRUVEKVxuICAgICAgICBlbmUuZGlyID0gZW5lLnZlbG9jaXR5LnggPiAwID8gRGlyLkxlZnQgOiBEaXIuUmlnaHRcbiAgICAgICAgdGFrZSAtLVxuICAgICAgfVxuICAgIH1cbiAgfSkgKi9cblxuICBmdW5jdGlvbiBleHBsb2RlUGFydGljbGVzKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZHtcbiAgICB2YXIgcm5kID0gTWF0aC5yYW5kb21cbiAgICBjb25zdCBzcCA9IFdBTEtfU1BFRUQqMlxuICAgIGNvbnN0IGpwID0gSlVNUF9WRUwqM1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0Y29uc3QgdnggPSBybmQoKSAqIChzcCAtICgtc3ApKSArICgtc3ApXG5cdFx0XHRjb25zdCB2eSA9IHJuZCgpICogKGpwIC0gKC1qcCkpICsgKC1qcClcblx0XHRcdHZhciBhbmdsZSA9IHJuZCgpICogTWF0aC5QSSAqIDI7XG5cdFx0XHRwYXJ0aWNsZXMucHVzaCh7cG9zaXRpb246IHt4OiB4LHk6eX0sdmVsb2NpdHk6e3g6IHZ4ICogTWF0aC5jb3MoYW5nbGUpLCB5OnZ5ICogTWF0aC5zaW4oYW5nbGUpfSxkaXI6RGlyLkxlZnQsaGVpZ2h0OjQsd2lkdGg6NCx2aXNpYmxlOnRydWV9KVxuXHRcdH1cbiAgfVxuXG4gIGxldCBjdXJyZW50U3RhdGU6IE1vZGVsID0ge1xuICAgIHBsYXllcjoge1xuICAgICAgcG9zaXRpb246IHsgeDogMTI4LCB5OiAwLjAgfSxcbiAgICAgIHZlbG9jaXR5OiB7IHg6IDAuMCwgeTogMC4wIH0sXG4gICAgICBkaXI6IERpci5SaWdodCxcbiAgICAgIHNob290aW5nOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAyMCxcbiAgICAgIGhlaWdodDogMjAsXG4gICAgICB2aXNpYmxlOiB0cnVlXG4gICAgfSxcbiAgICBlbmVtaWVzOiBuZXdFbmVtaWVzKDM0LDAsNTApLFxuICAgIGJ1bGxldHM6IGluaXRCdWxsZXRzKDYwKSxcbiAgICBob3N0YWdlczogaW5pdEhvc3RhKDEpXG4gIH1cblxuICBjb25zdCBGTE9PUiA9IGhlaWdodCAtIDEwXG4gIGNvbnN0IFNFQ09ORF9GTE9PUiA9IEZMT09SICogMC43XG5cblxuICBmdW5jdGlvbiBjcmVhdGVGbG9vcih4Om51bWJlciwgeTpudW1iZXIsIHdpZHRoOiBudW1iZXIpOiBCb2R5IHtcbiAgICByZXR1cm4ge3Bvc2l0aW9uOnt4OngsIHk6IHl9LHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiAyMCxkaXI6IERpci5MZWZ0LHZlbG9jaXR5Ont4OjAseTowfSx2aXNpYmxlOiB0cnVlfVxuICB9XG5cbiAgY29uc3QgZmxvb3JzID0gW2NyZWF0ZUZsb29yKDAuMCxGTE9PUiw5MDApLCBjcmVhdGVGbG9vcig0MC4wLFNFQ09ORF9GTE9PUiwxMDApLGNyZWF0ZUZsb29yKDIzMC4wLFNFQ09ORF9GTE9PUiwyOTApXVxuXG4gIGNvbnN0IGtlZXBBbmltYXRpb24gPSAodGltZTogbnVtYmVyKSA9PiB7XG4gICAgY3VycmVudERlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpIC8gMTAwO1xuICAgIGN1cnJlbnRUaW1lID0gdGltZVxuICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgXG4gICAgcmVuZGVyKGN1cnJlbnRTdGF0ZSlcbiAgICB1cGRhdGUoY3VycmVudEFjdGlvbiwgY3VycmVudFN0YXRlKVxuICAgIGN1cnJlbnRBY3Rpb24gPSBudWxsXG4gICAgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa2VlcEFuaW1hdGlvbik7XG4gIH07XG5cbiAgZnVuY3Rpb24gcnVuR2FtZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa2VlcEFuaW1hdGlvbik7XG4gIH1cblxuXG4gIGNvbnN0IGhhbmRsZXJTdGFydCA9IChldjogVG91Y2hFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXYuY3VycmVudFRhcmdldFsnaWQnXSkge1xuICAgICAgY2FzZSBcImFcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5KUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGNvZGUuLi5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGNvbnN0IGhhbmRsZXJFbmQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJiXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQVJcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUlJcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN2Z3M6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJyZWN0XCIpO1xuICBjb25zdCBwc09wID0geyBwYXNzaXZlOiB0cnVlIH07XG4gIHN2Z3MuZm9yRWFjaChyZWMgPT4ge1xuICAgIHJlYy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyU3RhcnQsIHBzT3ApO1xuICAgIHJlYy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlckVuZCwgcHNPcCk7XG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZXJLQkRvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SUFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSlBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDEzOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlVQXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BUFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyS0JEb3duLCB0cnVlKTtcblxuICBjb25zdCBoYW5kbGVyS0JVcCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTFJcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJSXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BUlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcktCVXAsIHRydWUpO1xuXG4gIGZ1bmN0aW9uIEJvZHlBbmltYXRpb24oXG4gICAgcmlnaHRUOiBJbWdUZXh0dXJlLFxuICAgIGxlZnRUOiBJbWdUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIC1jYW0ucG9zaXRpb24ueCsocC5wb3NpdGlvbi54ICsgKHAud2lkdGggLyAyKSksXG4gICAgICAgIC1jYW0ucG9zaXRpb24ueStwLnBvc2l0aW9uLnksXG4gICAgICAgIHAud2lkdGgsXG4gICAgICAgIHAuaGVpZ2h0LFxuICAgICAgICB2MCxcbiAgICAgICAgdTAsXG4gICAgICAgIHYxLFxuICAgICAgICB1MVxuICAgICAgKTtcbiAgICB9XG5cbiAgfVxuXG4vKiAgIGZ1bmN0aW9uIGlzT3ZlckZsb29yKGI6IEJvZHkpOiBib29sZWFue1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCA9PSBGTE9PUiB8fCBjb2xsaWRlRmxvb3JCb3R0b20oYixzZWNvbmRGbG9vckJvZHkpO1xuICB9XG4gKi9cbiAgZnVuY3Rpb24gaXNPdmVyRmxvb3IoYjogQm9keSk6IGJvb2xlYW57XG4gICAgbGV0IGZsb29yQm90dG9tczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZvcih2YXIgaT0wO2k8Zmxvb3JzLmxlbmd0aDtpKyspe1xuICAgICAgZmxvb3JCb3R0b21zID0gZmxvb3JCb3R0b21zIHx8IGNvbGxpZGVGbG9vckJvdHRvbShiLGZsb29yc1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGIucG9zaXRpb24ueSArIGIuaGVpZ2h0ID09IEZMT09SIHx8IGZsb29yQm90dG9tcztcbiAgfVxuICBcbiAgY29uc3QgYm90SGl0dGVkQW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJib3RIaXQsIGxib3RIaXQsIDIsIHRydWUsIFtbMCwgMCwgMSwgMV1dKVxuICBjb25zdCBib3RBbmltID0gbmV3IEJvZHlBbmltYXRpb24ocmlnaHRCb3QsIGxlZnRCb3QsIDUsIHRydWUsIFtbMCwgMCwgMSwgMC41XSwgWzAsIDAuNSwgMSwgMV1dKVxuICBjb25zdCBPTkVUSElSRCA9IDEvMyBcbiAgY29uc3Qgc29sZGllckhvc3RBbmkgPSBuZXcgQm9keUFuaW1hdGlvbihyU29sSG9zdCwgbFNvbEhvc3QsIDE0LCBmYWxzZSwgW1swLCAwLCAxLCBPTkVUSElSRF0sIFswLCBPTkVUSElSRCwgMSwgT05FVEhJUkQqMl0sWzAsIE9ORVRISVJEKjIsIDEsIDFdXSlcbiAgY29uc3QgaWRsZUFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodElkbGUsIGxlZnRJZGxlLCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IGhvc3RBbmltID0gbmV3IEJvZHlBbmltYXRpb24ockhvc3QsIGxIb3N0LCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IHJ1bkFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFJ1biwgbGVmdFJ1biwgOCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjJdLCBbMCwgLjIsIDEsIDAuNF0sIFswLCAuNCwgMSwgMC42XSwgWzAsIC42LCAxLCAwLjhdLCBbMCwgLjgsIDEsIDEuMF1dKVxuICBjb25zdCBzaG9vdGluZ0FuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFNob290LCBsZWZ0U2hvb3QsIDMsIGZhbHNlLCBbWzAsIDAsIDEsIDAuMjVdLCBbMCwgLjI1LCAxLCAwLjVdLCBbMCwgLjUsIDEsIDAuNzVdLCBbMCwgLjc1LCAxLCAxLjBdXSlcblxuICBsZXQgZ3VuUmVhZHk6IG51bWJlciA9IDBcbiAgbGV0IGp1bXBUcmllczpudW1iZXIgPSAyXG4gIGxldCB0aWNrc0hpdHRlZDogbnVtYmVyID0gMFxuICBmdW5jdGlvbiB1cGRhdGUoYTogQWN0aW9uLCBtOiBNb2RlbCkge1xuICAgIGlmKHJhZGlvVG9TaGFrZSA+IDAuMDAwMil7XG4gICAgICBzaGFraW5nKClcbiAgICB9XG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgaWYgKGlzT3ZlckZsb29yKHApKSB7XG4gICAgICBqdW1wVHJpZXMgPSAyXG4gICAgfVxuICAgIHN3aXRjaCAoYSkge1xuICAgICAgY2FzZSBFdmVudFR5cGUuSlA6XG4gICAgICAgIGlmKGp1bXBUcmllcyA+IDApe1xuICAgICAgICAgIGp1bXBUcmllcy0tXG4gICAgICAgICAgXG4gICAgICAgICAgcC52ZWxvY2l0eS55ID0gcC5jYXJyaW5nID8gLUpVTVBfVkVMLzIgOiAtSlVNUF9WRUxcbiAgICAgICAgICBqdW1wU291bmQoKVxuICAgICAgICB9XG4gICAgICAgIHAuc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkxQOlxuICAgICAgICBwLmRpciA9IERpci5MZWZ0XG4gICAgICAgIHAudmVsb2NpdHkueCA9IHAuY2FycmluZyA/IC1XQUxLX1NQRUVELzIgOiAtV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SUDpcbiAgICAgICAgcC5kaXIgPSBEaXIuUmlnaHRcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gcC5jYXJyaW5nID8gV0FMS19TUEVFRC8yIDogV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MUjpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJSOlxuICAgICAgICBwLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuQVA6XG4gICAgICAgIGlmKCFtLnBsYXllci5jYXJyaW5nKXtcbiAgICAgICAgc2hvb3RpbmdBbmltLnJlc2V0KClcbiAgICAgICAgcC5zaG9vdGluZyA9IHRydWVcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gKHAuZGlyID09IERpci5MZWZ0ID8gMS41IDogLTEuNSlcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGIgPSBtLmJ1bGxldHNbaV1cbiAgICAgICAgICBpZiAoIWIudmlzaWJsZSAmJiBndW5SZWFkeSA9PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBhbmdsZSA9IHJkbkFuZ2xlKClcbiAgICAgICAgICAgIGIucG9zaXRpb24ueCA9IHAucG9zaXRpb24ueCArIHAud2lkdGggKyBiLndpZHRoXG4gICAgICAgICAgICBiLnBvc2l0aW9uLnkgPSBwLnBvc2l0aW9uLnkgKyAocC5oZWlnaHQgLyAyLjQpXG4gICAgICAgICAgICBiLnZlbG9jaXR5LnggPSAocC5kaXIgPT0gRGlyLlJpZ2h0ID8gMzUgOiAtMzUpICogTWF0aC5jb3MoYW5nbGUpXG4gICAgICAgICAgICBiLnZlbG9jaXR5LnkgPSA1ICogTWF0aC5zaW4oYW5nbGUpXG4gICAgICAgICAgICBiLnZpc2libGUgPSB0cnVlXG4gICAgICAgICAgICBndW5SZWFkeSA9IDNcbiAgICAgICAgICAgIGZpcmVTb3VuZCgpXG4gICAgICAgICAgICByYWRpb1RvU2hha2UgPSAyXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICBsZXQgaG9zdCA9IG0ucGxheWVyLmNhcnJpbmdcbiAgICAgICAgaG9zdC52aXNpYmxlID0gdHJ1ZVxuICAgICAgICBob3N0LnBvc2l0aW9uLnggPSBtLnBsYXllci5kaXIgPT0gRGlyLkxlZnQgPyBtLnBsYXllci5wb3NpdGlvbi54IC0gMjUgOiBtLnBsYXllci5wb3NpdGlvbi54ICsgMjVcbiAgICAgICAgaG9zdC5wb3NpdGlvbi55ID0gbS5wbGF5ZXIucG9zaXRpb24ueSAtIDEwXG4gICAgICAgIG0ucGxheWVyLmNhcnJpbmcgPSBudWxsXG4gICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BUjpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICAvL3Auc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICAvL1Nob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuXG4gICAgIG1vdmUobS5wbGF5ZXIpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uaG9zdGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGggPSBtLmhvc3RhZ2VzW2ldXG4gICAgICBtb3ZlKGgpXG4gICAgICBpZihoLnZpc2libGUgJiYgY29sbGlkZShtLnBsYXllcixoKSAmJiAhbS5wbGF5ZXIuY2FycmluZyl7XG4gICAgICAgIGgudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIG0ucGxheWVyLmNhcnJpbmcgPSBoXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5lbmVtaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlID0gbS5lbmVtaWVzW2ldXG4gICAgICB0aWNrc0hpdHRlZCA9IE1hdGgubWF4KHRpY2tzSGl0dGVkLTEsMClcbiAgICAgIGlmKHRpY2tzSGl0dGVkID09IDApe1xuICAgICAgICBlLmhpdHRlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBtb3ZlKGUpXG4gICAgICBpZiAoZS5wb3NpdGlvbi54IDwgMCB8fCAoZS5wb3NpdGlvbi54ICsgMjAgPiA5MDApKSB7XG4gICAgICAgIGUudmVsb2NpdHkueCA9IGUudmVsb2NpdHkueCAqIC0xXG4gICAgICAgIGUuZGlyID0gZS52ZWxvY2l0eS54ID4gMCA/IERpci5MZWZ0IDogRGlyLlJpZ2h0XG4gICAgICB9XG4gICAgICBmb3IodmFyIGogPSAwO2o8IG0uYnVsbGV0cy5sZW5ndGg7aisrKXtcbiAgICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tqXVxuICAgICAgICBpZiAoZS52aXNpYmxlICYmIGIudmlzaWJsZSAmJiBjb2xsaWRlKGIsIGUpKSB7XG4gICAgICAgICAgaGl0U291bmQoKVxuICAgICAgICAgIGUuaGl0dGVkID0gdHJ1ZVxuICAgICAgICAgIHRpY2tzSGl0dGVkID0gOFxuICAgICAgICAgIGUucG9zaXRpb24ueCArPSAoYi52ZWxvY2l0eS54ID4gMCA/ICsgMTggOiAtMTgpXG4gICAgICAgICAgaWYoZS5saWZlID09IDApe1xuICAgICAgICAgICAgcmFkaW9Ub1NoYWtlID0gNFxuICAgICAgICAgICAgZXhwbG9kZVBhcnRpY2xlcyhlLnBvc2l0aW9uLngrKGUud2lkdGgvMiksZS5wb3NpdGlvbi55KyhlLmhlaWdodC8yKSlcbiAgICAgICAgICAgIGUudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgICAgICBlLnZlbG9jaXR5LnggPSAwXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBlLmxpZmUgPSBNYXRoLm1heChlLmxpZmUtMSwwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBiLnZpc2libGUgPSBmYWxzZVxuICAgICAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICBtb3ZlQnVsbGV0KGIpXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICBtb3ZlKHApXG5cblxuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20ocCxmbG9vcnNbZl0pKXtcbiAgICAgICAgICBwZXJzaXN0ZW5jZS5wdXNoKHBhcnRpY2xlc1tpXSkgICAgICAgIFxuICAgICAgICAgIHBhcnRpY2xlcy5zcGxpY2UoaSwgMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGd1blJlYWR5ID0gTWF0aC5tYXgoMCwgZ3VuUmVhZHkgLSAxKTtcbiAgICBtb3ZlQ2FtKG0ucGxheWVyKVxuICB9XG4gIGZ1bmN0aW9uIG1vdmVDYW0oYjogQm9keSk6IHZvaWR7XG4gICAgY2FtLnBvc2l0aW9uLnggPSBNYXRoLm1heChiLnBvc2l0aW9uLnggLSAoY2FtLndpZHRoLzIpLDApXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNb3VudGFpbigpIHtcbiAgICBjYW52YXMucHVzaCgpXG4gICAgY2FudmFzLnNjYWxlKDYsNilcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDEwMDsgeCArPSAyMCkge1xuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgbE1vdW50YWluLnRleHQsXG4gICAgICAgKC1jYW0ucG9zaXRpb24ueCowLjA2KSArIHgsXG4gICAgICAgKC1jYW0ucG9zaXRpb24ueSowLjA2KSArIDUsXG4gICAgICAgIGxNb3VudGFpbi53aWR0aCxcbiAgICAgICAgbE1vdW50YWluLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9XG4gICAgICBjYW52YXMucG9wKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZsb29yKCkge1xuICAgICAgZm9yKHZhciBmPTA7IGY8Zmxvb3JzLmxlbmd0aDtmKyspe1xuICAgICAgICBjb25zdCBmbG9vciA9IGZsb29yc1tmXVxuICAgICAgICBmb3IgKHZhciB4ID0gZmxvb3IucG9zaXRpb24ueDsgeCA8PSBmbG9vci5wb3NpdGlvbi54K2Zsb29yLndpZHRoIDsgeCArPSAyMCkge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSB4ICUgNyA9PSAwID8gbGVmdEZsb29yIDogcmlnaHRGbG9vclxuICAgICAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgICAgICAtY2FtLnBvc2l0aW9uLngreCxcbiAgICAgICAgICAgIC1jYW0ucG9zaXRpb24ueSsoZmxvb3IucG9zaXRpb24ueS0xMCksXG4gICAgICAgICAgICB0ZXh0LndpZHRoLFxuICAgICAgICAgICAgdGV4dC5oZWlnaHQsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpZk9uVGhlRmxvb3JnZXRZKGI6IEJvZHkpOiBudW1iZXJ7XG4gICAgbGV0IGJvdHRvbUNvbGxpZGU6IG51bWJlciA9IC0xXG4gICAgZm9yKHZhciBpID0gMDtpPCBmbG9vcnMubGVuZ3RoO2krKyl7XG4gICAgICAgYm90dG9tQ29sbGlkZSA9IGNvbGxpZGVGbG9vckJvdHRvbShiLGZsb29yc1tpXSkgPyBmbG9vcnNbaV0ucG9zaXRpb24ueSA6IC0xIFxuICAgIH1cbiAgICByZXR1cm4gYm90dG9tQ29sbGlkZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52ZWxvY2l0eS55ID0gIGlmT25UaGVGbG9vcmdldFkoYikgPCAwID8gYi52ZWxvY2l0eS55ICsgKEdSQVZJVFkgKiBjdXJyZW50RGVsdGEpIDogYi52ZWxvY2l0eS55XG4gIH1cblxuICBmdW5jdGlvbiBvdXRzaWRlU2NyZWVuKGI6IEJ1bGxldCkge1xuICAgIHJldHVybiBiLnBvc2l0aW9uLnggPCAwIHx8IGIucG9zaXRpb24ueCA+IDkwMFxuICB9XG5cbiAgZnVuY3Rpb24gbW92ZUJ1bGxldChiOiBCdWxsZXQpOiB2b2lkIHtcbiAgICBpZiAob3V0c2lkZVNjcmVlbihiKSkge1xuICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgIGIudmVsb2NpdHkueCA9IDBcbiAgICB9XG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICAgIGIucG9zaXRpb24ueSArPSBiLnZlbG9jaXR5LnkgKiBjdXJyZW50RGVsdGFcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vclRvcChiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICByZXR1cm4gY29sbGlkZShiLGYpICYmXG4gICAgZi5wb3NpdGlvbi55KyhmLmhlaWdodC8yKSA+IGIucG9zaXRpb24ueVxuICB9XG4gIGZ1bmN0aW9uIGNvbGxpZGVGbG9vckJvdHRvbShiOiBCb2R5LCBmOiBCb2R5KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxpZGUoYixmKSAmJlxuICAgIGIucG9zaXRpb24ueSA8IGYucG9zaXRpb24ueVxuICAgfVxuXG4gICBmdW5jdGlvbiBjb2xsaWRlRmxvb3JMZWZ0KGI6IEJvZHksZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnBvc2l0aW9uLnggPCBmLnBvc2l0aW9uLnggJiYgYi5wb3NpdGlvbi54K2Iud2lkdGggPiBmLnBvc2l0aW9uLnhcbiAgIH1cbiAgIGZ1bmN0aW9uIGNvbGxpZGVGbG9vclJpZ2h0KGI6IEJvZHksZjogQm9keSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb2xsaWRlKGIsZikgJiZcbiAgICBiLnBvc2l0aW9uLngrKGIud2lkdGgqMC45KSA8IGYucG9zaXRpb24ueCAmJiBiLnZlbG9jaXR5LnggPiAwXG4gICB9XG5cbiAgZnVuY3Rpb24gbW92ZShiOiBCb2R5KTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdW5kWSA9IGlmT25UaGVGbG9vcmdldFkoYilcbiAgICBiLnBvc2l0aW9uLnkgPSBncm91bmRZIDwgMCA/IGIucG9zaXRpb24ueSArIChiLnZlbG9jaXR5LnkgKiBjdXJyZW50RGVsdGEpIDogZ3JvdW5kWSAtIGIuaGVpZ2h0XG4gICAgYi5wb3NpdGlvbi54ICs9IGIudmVsb2NpdHkueCAqIGN1cnJlbnREZWx0YVxuICAgIGFwcGx5R3Jhdml0eShiKVxuXG4gICAgZm9yKHZhciBmID0wOyBmPCBmbG9vcnMubGVuZ3RoOyBmKyspe1xuXG4gICAgICBpZihjb2xsaWRlRmxvb3JUb3AoYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52ZWxvY2l0eS55IDwgMCl7XG4gICAgICAgICAgYi52ZWxvY2l0eS55ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihjb2xsaWRlRmxvb3JCb3R0b20oYixmbG9vcnNbZl0pKXtcbiAgICAgICAgaWYoYi52ZWxvY2l0eS55ID4gMCl7XG4gICAgICAgICAgYi52ZWxvY2l0eS55ID0gMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG5mdW5jdGlvbiByZW5kZXJUZXh0KHc6IHN0cmluZyx4OiBudW1iZXIseTpudW1iZXIsczpudW1iZXIpe1xuICBjb25zdCBjb29yID0gcmVuZGVyQ29vcmQodylcbiAgdmFyIG5ld1ggPSAtKHcubGVuZ3RoKiAoNCpzKSkvMjtcbiAgZm9yKHZhciBjID0gMDsgYzxjb29yLmxlbmd0aDtjKyspe1xuICAgIGNhbnZhcy5pbWcoXG4gICAgICBhYmMudGV4dCxcbiAgICAgIC1jYW0ucG9zaXRpb24ueCt4K25ld1gsXG4gICAgICAtY2FtLnBvc2l0aW9uLnkreSxcbiAgICAgIDQqcyxcbiAgICAgIDQqcyxcbiAgICAgIGNvb3JbY11bMF0sXG4gICAgICBjb29yW2NdWzFdLFxuICAgICAgY29vcltjXVsyXSxcbiAgICAgIGNvb3JbY11bM11cbiAgICApO1xuXG4gICAgbmV3WCs9NVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvb3JkKHc6IHN0cmluZyk6IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdW117XG4gIGNvbnN0IGxldHRlcnM6IHN0cmluZ1tdID0gWydhYmNkZWZnaGlqa2xtJywnbm9wcXJzdHV2d3h5eicsICcwMTIzNDU2Nzg5OiErJ11cbiAgbGV0IHJlc3A6W251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl1bXSA9IG5ldyBBcnJheTxbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXT4oKVxuXG4gIGZvcih2YXIgaSA9IDA7aTx3Lmxlbmd0aDtpKyspe1xuICAgIGNvbnN0IGwgPSB3LmNoYXJBdChpKVxuICAgIGZvcih2YXIgciA9IDA7IHI8bGV0dGVycy5sZW5ndGg7cisrKXtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGV0dGVyc1tyXS5pbmRleE9mKGwpXG4gICAgICBpZihpbmRleCA+IC0xKXtcbiAgICAgICAgcmVzcC5wdXNoKFsoaW5kZXgqNCkvNTIsIChyKjQpIC8xMiwgKChpbmRleCo0KSs0KS81MiAsICgocio0KSs0KS8xMl0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3Bcbn1cblxuXG4gIGNvbnN0IHJlbmRlciA9IChtOiBNb2RlbCkgPT4ge1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS53aWR0aCA9IFwiYXV0b1wiO1xuICAgIGNhbnZhcy5nLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAgTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQqMC45NSkgKyBcInB4XCIgO1xuICAgIGNhbnZhcy5nLnZpZXdwb3J0KDAsIDAsIGNhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodCk7XG4gICAgcmVuZGVyTW91bnRhaW4oKVxuXG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgY2FudmFzLmNscygpXG4gICAgY2FudmFzLmJrZyg1Ny8yNTUsNzMvMjU1LDgxLzI1NSlcbiAgICByZW5kZXJGbG9vcigpXG5cbiAgICBpZiAocC5zaG9vdGluZykge1xuICAgICAgc2hvb3RpbmdBbmltLnVwZGF0ZShwKVxuICAgIH0gZWxzZSBpZiAocC52ZWxvY2l0eS54ID09IDApIHtcbiAgICAgIGlmKHAuY2FycmluZyl7XG4gICAgICAgc29sZGllckhvc3RBbmkudXBkYXRlKHApXG4gICAgICB9ZWxzZXtcbiAgICAgIGlkbGVBbmltLnVwZGF0ZShwKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihwLmNhcnJpbmcpe1xuICAgICAgICBzb2xkaWVySG9zdEFuaS5yZXNldCgpXG4gICAgICAgIHNvbGRpZXJIb3N0QW5pLnVwZGF0ZShwKVxuICAgICAgIH1lbHNle1xuICAgICAgICBydW5BbmltLnVwZGF0ZShwKVxuICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZSA9IG0uZW5lbWllc1tpXVxuICAgICAgaWYoZS52aXNpYmxlKXtcbiAgICAgICAgaWYoZS5oaXR0ZWQpe1xuICAgICAgICAgIGJvdEhpdHRlZEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGJvdEFuaW0udXBkYXRlKGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgaWYgKGIudmlzaWJsZSkge1xuICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgIGJ1bGxldFRleHR1cmUsXG4gICAgICAgICAgLWNhbS5wb3NpdGlvbi54K2IucG9zaXRpb24ueCxcbiAgICAgICAgICAtY2FtLnBvc2l0aW9uLnkrYi5wb3NpdGlvbi55LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmhvc3RhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBiID0gbS5ob3N0YWdlc1tpXVxuICAgICAgaWYgKGIudmlzaWJsZSkge1xuICAgICAgICBob3N0QW5pbS51cGRhdGUoYilcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGFydGljbGVzW2ldXG4gICAgICAgIGlmKHAudmlzaWJsZSl7XG4gICAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICAgIHJib3RIaXQudGV4dCxcbiAgICAgICAgICAgIC1jYW0ucG9zaXRpb24ueCtwLnBvc2l0aW9uLngsXG4gICAgICAgICAgICAtY2FtLnBvc2l0aW9uLnkrcC5wb3NpdGlvbi55LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDgsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIC43LFxuICAgICAgICAgICAgMVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBlcnNpc3RlbmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwID0gcGVyc2lzdGVuY2VbaV1cbiAgICAgICAgaWYocC52aXNpYmxlKXtcbiAgICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgICAgcmJvdEhpdC50ZXh0LFxuICAgICAgICAgICAgLWNhbS5wb3NpdGlvbi54K3AucG9zaXRpb24ueCxcbiAgICAgICAgICAgIC1jYW0ucG9zaXRpb24ueStwLnBvc2l0aW9uLnksXG4gICAgICAgICAgICA4LFxuICAgICAgICAgICAgOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgLjcsXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlclRleHQoXCJyZWNvcmQ6IDEwMDAwXCIsd2lkdGgvMiwxMCwxKVxuICAgIGNhbnZhcy5mbHVzaCgpO1xuICAgIGZwc00udGljaygpXG4gIH1cblxuICAvKiAgKi9pZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgY29uc3Qgc3ZnczogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKVxuICAgIHN2Z3MuZm9yRWFjaChzdmcgPT4ge1xuICAgICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG4gIH1cblxuXG4gIHJ1bkdhbWUoKVxufSlcbiIsImZ1bmN0aW9uIEUoYyl7XG4gICAgdGhpcy5uID0gYy5jcmVhdGVHYWluKClcbiAgICB0aGlzLm4uZ2Fpbi52YWx1ZSA9IDBcbiAgICB0aGlzLmFkZEV2ZW50VG9RdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBjLmN1cnJlbnRUaW1lKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDEsIGMuY3VycmVudFRpbWUgKyAwLjAwMSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjMsIGMuY3VycmVudFRpbWUgKyAwLjEwMSk7XG4gICAgICB0aGlzLm4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLCBjLmN1cnJlbnRUaW1lICsgMC41MDApO1xuICAgIH1cbiAgfVxuICBcbiAgZnVuY3Rpb24gV05CKGMpe1xuICAgIHZhciBicyA9IGMuc2FtcGxlUmF0ZTtcbiAgICB2YXIgYiA9IGMuY3JlYXRlQnVmZmVyKDEsIGJzLCBjLnNhbXBsZVJhdGUpO1xuICAgIHZhciBvID0gYi5nZXRDaGFubmVsRGF0YSgwKTtcbiAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiczsgaSsrKSB7XG4gICAgICBvW2ldID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xuICAgIH1cbiAgXG4gICAgdGhpcy5zID0gYy5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICB0aGlzLnMuYnVmZmVyID0gYjtcbiAgICB0aGlzLnMubG9vcCA9IHRydWVcbiAgfTtcbiAgXG4gIHZhciBjdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKVxuICB2YXIgbiA9IG5ldyBXTkIoY3R4KVxuICB2YXIgdjEgPSBuZXcgRShjdHgpXG4gIHZhciB2MiA9IG5ldyBFKGN0eClcbiAgdmFyIHYzID0gbmV3IEUoY3R4KVxuICB2YXIgdjQgPSBuZXcgRShjdHgpXG4gIHZhciBmID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG4gIHZhciBnID0gY3R4LmNyZWF0ZUdhaW4oKVxuICB2YXIgdnMgPSAwXG4gIHZhciBzdGQgPSBmYWxzZVxuXG4gIFxuICBuLnMuY29ubmVjdCh2MS5uKVxuICBuLnMuY29ubmVjdCh2Mi5uKVxuICBuLnMuY29ubmVjdCh2My5uKVxuICBuLnMuY29ubmVjdCh2NC5uKVxuICBcbiAgZi50eXBlID0gXCJsb3dwYXNzXCJcbiAgZi5RLnZhbHVlID0gMVxuICBmLmZyZXF1ZW5jeS52YWx1ZSA9IDgwMFxuICB2MS5uLmNvbm5lY3QoZilcbiAgdjIubi5jb25uZWN0KGYpXG4gIHYzLm4uY29ubmVjdChmKVxuICB2NC5uLmNvbm5lY3QoZilcbiAgZy5nYWluLnZhbHVlID0gNVxuICBmLmNvbm5lY3QoZylcbiAgZy5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbilcbiAgXG4gIFxuICBcbiAgZnVuY3Rpb24gZmlyZVNvdW5kKCl7XG4gICAgXG4gICBpZighc3RkKXtcbiAgICAgIHN0ZCA9IHRydWVcbiAgICAgIG4ucy5zdGFydCgwKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICAgICB2cysrXG4gICAgICAgIGlmKHZzID4gNCl7XG4gICAgICAgICAgdnMgPSAxXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDEpe1xuICAgICAgICAgIHYxLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDIpe1xuICAgICAgICAgIHYyLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDMpe1xuICAgICAgICAgIHYzLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZzID09IDQpe1xuICAgICAgICAgIHY0LmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgfVxuXG52YXIgbyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG5vLnR5cGUgPSAnc3F1YXJlJ1xudmFyIHYgPSBjdHguY3JlYXRlR2FpbigpO1xuby5jb25uZWN0KHYpXG52LmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbnYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLGN0eC5jdXJyZW50VGltZSlcbnZhciBzdGQyID0gZmFsc2VcblxuZnVuY3Rpb24ganVtcFNvdW5kKCl7XG4gIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqICgzIC0gMSkgKyAxKS8yXG4gIGlmKCFzdGQyKXtcbiAgICAgIG8uc3RhcnQoMClcbiAgICBzdGQyID0gdHJ1ZVxuICB9XG4gIG8uZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDIwMCpyLCBjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEsY3R4LmN1cnJlbnRUaW1lKVxuICB2LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjYsIGN0eC5jdXJyZW50VGltZSArIDAuMSk7XG4gIG8uZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjgwKnIsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gIHYuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xuICB2LmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUgKyAwLjQpXG59XG5cbmZ1bmN0aW9uIGhpdFNvdW5kKCl7XG4gIHZhciBvaCA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gIG9oLnR5cGUgPSAnc3F1YXJlJ1xuICB2YXIgdmggPSBjdHguY3JlYXRlR2FpbigpO1xuICBvaC5jb25uZWN0KHZoKVxuICB2aC5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gIHZoLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUpXG4gIG9oLnR5cGUgPSAnc3F1YXJlJ1xuICBvaC5mcmVxdWVuY3kgPSA4ODAuNjtcbiAgb2guc3RhcnQoMClcbiAgdmguZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxLGN0eC5jdXJyZW50VGltZSlcbiAgb2guZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgdmguZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNSk7XG4gIHZoLmdhaW4uc2V0VmFsdWVBdFRpbWUoMCxjdHguY3VycmVudFRpbWUgKyAwLjUpXG59XG5cblxud2luZG93WydmaXJlU291bmQnXSA9IGZpcmVTb3VuZDtcbndpbmRvd1snanVtcFNvdW5kJ10gPSBqdW1wU291bmQ7XG53aW5kb3dbJ2hpdFNvdW5kJ10gPSBoaXRTb3VuZDtcblxuXG5cblxuXG4gIFxuICAiLCIvKlxuICogVGlueUNhbnZhcyBtb2R1bGUgKGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRuZW5mZXIvdGlueS1jYW52YXMpXG4gKiBEZXZlbG9wZWQgYnkgRmVsaXBlIEFsZm9uc28gLT4gaHR0cHM6Ly90d2l0dGVyLmNvbS9iaXRuZW5mZXIvXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgICAgICAgICAgICAgICAgICAgVmVyc2lvbiAyLCBEZWNlbWJlciAyMDA0XG4gKiBcbiAqICBDb3B5cmlnaHQgKEMpIDIwMDQgU2FtIEhvY2V2YXIgPHNhbUBob2NldmFyLm5ldD5cbiAqIFxuICogIEV2ZXJ5b25lIGlzIHBlcm1pdHRlZCB0byBjb3B5IGFuZCBkaXN0cmlidXRlIHZlcmJhdGltIG9yIG1vZGlmaWVkXG4gKiAgY29waWVzIG9mIHRoaXMgbGljZW5zZSBkb2N1bWVudCwgYW5kIGNoYW5naW5nIGl0IGlzIGFsbG93ZWQgYXMgbG9uZ1xuICogIGFzIHRoZSBuYW1lIGlzIGNoYW5nZWQuXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgIFRFUk1TIEFORCBDT05ESVRJT05TIEZPUiBDT1BZSU5HLCBESVNUUklCVVRJT04gQU5EIE1PRElGSUNBVElPTlxuICogXG4gKiAgIDAuIFlvdSBqdXN0IERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8uXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBDb21waWxlU2hhZGVyKGdsLCBzb3VyY2UsIHR5cGUpIHtcbiAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBzaGFkZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVNoYWRlclByb2dyYW0oZ2wsIHZzU291cmNlLCBmc1NvdXJjZSkge1xuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpLFxuICAgICAgICB2U2hhZGVyID0gQ29tcGlsZVNoYWRlcihnbCwgdnNTb3VyY2UsIDM1NjMzKSxcbiAgICAgICAgZlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIGZzU291cmNlLCAzNTYzMik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmU2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlQnVmZmVyKGdsLCBidWZmZXJUeXBlLCBzaXplLCB1c2FnZSkge1xuICAgIHZhciBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGJ1ZmZlclR5cGUsIGJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShidWZmZXJUeXBlLCBzaXplLCB1c2FnZSk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlVGV4dHVyZShnbCwgaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQyLCAzMzA3MSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MywgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDAsIDk3MjgpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDEsIDk3MjgpO1xuICAgIGdsLnRleEltYWdlMkQoMzU1MywgMCwgNjQwOCwgNjQwOCwgNTEyMSwgaW1hZ2UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKDM1NTMsIG51bGwpO1xuICAgIHRleHR1cmUud2lkdGggPSB3aWR0aDtcbiAgICB0ZXh0dXJlLmhlaWdodCA9IGhlaWdodDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cbndpbmRvd1snVENTaGQnXSA9IENvbXBpbGVTaGFkZXI7XG53aW5kb3dbJ1RDUHJnJ10gPSBDcmVhdGVTaGFkZXJQcm9ncmFtO1xud2luZG93WydUQ0J1ZiddID0gQ3JlYXRlQnVmZmVyO1xud2luZG93WydUQ1RleCddID0gQ3JlYXRlVGV4dHVyZTtcblxuZnVuY3Rpb24gVGlueUNhbnZhcyhjYW52YXMpIHtcbiAgICB2YXIgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSxcbiAgICAgICAgVkVSVEVYX1NJWkUgPSAoNCAqIDIpICsgKDQgKiAyKSArICg0KSxcbiAgICAgICAgTUFYX0JBVENIID0gMTA5MjIsIC8vIGZsb29yKCgyIF4gMTYpIC8gNilcbiAgICAgICAgTUFYX1NUQUNLID0gMTAwLFxuICAgICAgICBNQVRfU0laRSA9IDYsXG4gICAgICAgIFZFUlRJQ0VTX1BFUl9RVUFEID0gNixcbiAgICAgICAgTUFUX1NUQUNLX1NJWkUgPSBNQVhfU1RBQ0sgKiBNQVRfU0laRSxcbiAgICAgICAgVkVSVEVYX0RBVEFfU0laRSA9IFZFUlRFWF9TSVpFICogTUFYX0JBVENIICogNCxcbiAgICAgICAgSU5ERVhfREFUQV9TSVpFID0gTUFYX0JBVENIICogKDIgKiBWRVJUSUNFU19QRVJfUVVBRCksXG4gICAgICAgIHdpZHRoID0gY2FudmFzLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0LFxuICAgICAgICBzaGFkZXIgPSBDcmVhdGVTaGFkZXJQcm9ncmFtKFxuICAgICAgICAgICAgZ2wsIFtcbiAgICAgICAgICAgICAgICAncHJlY2lzaW9uIGxvd3AgZmxvYXQ7JyxcbiAgICAgICAgICAgICAgICAvLyBJTiBWZXJ0ZXggUG9zaXRpb24gYW5kXG4gICAgICAgICAgICAgICAgLy8gSU4gVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjMiBhLCBiOycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGM7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzIgZDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWM0IGU7JyxcbiAgICAgICAgICAgICAgICAvLyBDT05TVCBWaWV3IE1hdHJpeFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIG1hdDQgbTsnLFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHZlYzIgcjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9Qb3NpdGlvbj1tKnZlYzQoYSwxLjAsMS4wKTsnLFxuICAgICAgICAgICAgICAgICdkPWI7JyxcbiAgICAgICAgICAgICAgICAnZT1jOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgU2luZ2xlIFNhbXBsZXIyRFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCBmOycsXG4gICAgICAgICAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG4gICAgICAgICAgICAgICAgJ2dsX0ZyYWdDb2xvcj10ZXh0dXJlMkQoZixkKSplOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpXG4gICAgICAgICksXG4gICAgICAgIGdsQnVmZmVyU3ViRGF0YSA9IGdsLmJ1ZmZlclN1YkRhdGEuYmluZChnbCksXG4gICAgICAgIGdsRHJhd0VsZW1lbnRzID0gZ2wuZHJhd0VsZW1lbnRzLmJpbmQoZ2wpLFxuICAgICAgICBnbEJpbmRUZXh0dXJlID0gZ2wuYmluZFRleHR1cmUuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXIgPSBnbC5jbGVhci5iaW5kKGdsKSxcbiAgICAgICAgZ2xDbGVhckNvbG9yID0gZ2wuY2xlYXJDb2xvci5iaW5kKGdsKSxcbiAgICAgICAgdmVydGV4RGF0YSA9IG5ldyBBcnJheUJ1ZmZlcihWRVJURVhfREFUQV9TSVpFKSxcbiAgICAgICAgdlBvc2l0aW9uRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZDb2xvckRhdGEgPSBuZXcgVWludDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZJbmRleERhdGEgPSBuZXcgVWludDE2QXJyYXkoSU5ERVhfREFUQV9TSVpFKSxcbiAgICAgICAgSUJPID0gQ3JlYXRlQnVmZmVyKGdsLCAzNDk2MywgdkluZGV4RGF0YS5ieXRlTGVuZ3RoLCAzNTA0NCksXG4gICAgICAgIFZCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjIsIHZlcnRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDgpLFxuICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgIG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDEsIDAsIDBdKSxcbiAgICAgICAgc3RhY2sgPSBuZXcgRmxvYXQzMkFycmF5KDEwMCksXG4gICAgICAgIHN0YWNrcCA9IDAsXG4gICAgICAgIGNvcyA9IE1hdGguY29zLFxuICAgICAgICBzaW4gPSBNYXRoLnNpbixcbiAgICAgICAgY3VycmVudFRleHR1cmUgPSBudWxsLFxuICAgICAgICByZW5kZXJlciA9IG51bGwsXG4gICAgICAgIGxvY0EsIGxvY0IsIGxvY0M7XG5cbiAgICBnbC5ibGVuZEZ1bmMoNzcwLCA3NzEpO1xuICAgIGdsLmVuYWJsZSgzMDQyKTtcbiAgICBnbC51c2VQcm9ncmFtKHNoYWRlcik7XG4gICAgZ2wuYmluZEJ1ZmZlcigzNDk2MywgSUJPKTtcbiAgICBmb3IgKHZhciBpbmRleEEgPSBpbmRleEIgPSAwOyBpbmRleEEgPCBNQVhfQkFUQ0ggKiBWRVJUSUNFU19QRVJfUVVBRDsgaW5kZXhBICs9IFZFUlRJQ0VTX1BFUl9RVUFELCBpbmRleEIgKz0gNClcbiAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAwXSA9IGluZGV4QixcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMV0gPSBpbmRleEIgKyAxLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAyXSA9IGluZGV4QiArIDIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDNdID0gaW5kZXhCICsgMCxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNF0gPSBpbmRleEIgKyAzLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyA1XSA9IGluZGV4QiArIDE7XG5cbiAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjMsIDAsIHZJbmRleERhdGEpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjIsIFZCTyk7XG4gICAgbG9jQSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2EnKTtcbiAgICBsb2NCID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYicpO1xuICAgIGxvY0MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdjJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQSk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NBLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NCLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgOCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NDLCA0LCA1MTIxLCAxLCBWRVJURVhfU0laRSwgMTYpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlciwgJ20nKSwgMCxcbiAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAyIC8gd2lkdGgsIDAsIDAsIDAsXG4gICAgICAgICAgICAwLCAtMiAvIGhlaWdodCwgMCwgMCxcbiAgICAgICAgICAgIDAsIDAsIDEsIDEsIC0xLCAxLCAwLCAwXG4gICAgICAgIF0pXG4gICAgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKDMzOTg0KTtcbiAgICByZW5kZXJlciA9IHtcbiAgICAgICAgJ2cnOiBnbCxcbiAgICAgICAgJ2MnOiBjYW52YXMsXG4gICAgICAgICdjb2wnOiAweEZGRkZGRkZGLFxuICAgICAgICAnYmtnJzogZnVuY3Rpb24gKHIsIGcsIGIpIHtcbiAgICAgICAgICAgIGdsQ2xlYXJDb2xvcihyLCBnLCBiLCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Nscyc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGdsQ2xlYXIoMTYzODQpO1xuICAgICAgICB9LFxuICAgICAgICAndHJhbnMnOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgbWF0WzRdID0gbWF0WzBdICogeCArIG1hdFsyXSAqIHkgKyBtYXRbNF07XG4gICAgICAgICAgICBtYXRbNV0gPSBtYXRbMV0gKiB4ICsgbWF0WzNdICogeSArIG1hdFs1XTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3NjYWxlJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFswXSA9IG1hdFswXSAqIHg7XG4gICAgICAgICAgICBtYXRbMV0gPSBtYXRbMV0gKiB4O1xuICAgICAgICAgICAgbWF0WzJdID0gbWF0WzJdICogeTtcbiAgICAgICAgICAgIG1hdFszXSA9IG1hdFszXSAqIHk7XG4gICAgICAgIH0sXG4gICAgICAgICdyb3QnOiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgdmFyIGEgPSBtYXRbMF0sXG4gICAgICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgICAgIGQgPSBtYXRbM10sXG4gICAgICAgICAgICAgICAgc3IgPSBzaW4ociksXG4gICAgICAgICAgICAgICAgY3IgPSBjb3Mocik7XG5cbiAgICAgICAgICAgIG1hdFswXSA9IGEgKiBjciArIGMgKiBzcjtcbiAgICAgICAgICAgIG1hdFsxXSA9IGIgKiBjciArIGQgKiBzcjtcbiAgICAgICAgICAgIG1hdFsyXSA9IGEgKiAtc3IgKyBjICogY3I7XG4gICAgICAgICAgICBtYXRbM10gPSBiICogLXNyICsgZCAqIGNyO1xuICAgICAgICB9LFxuICAgICAgICAncHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDBdID0gbWF0WzBdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMV0gPSBtYXRbMV07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAyXSA9IG1hdFsyXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDNdID0gbWF0WzNdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNF0gPSBtYXRbNF07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyA1XSA9IG1hdFs1XTtcbiAgICAgICAgICAgIHN0YWNrcCArPSA2O1xuICAgICAgICB9LFxuICAgICAgICAncG9wJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhY2twIC09IDY7XG4gICAgICAgICAgICBtYXRbMF0gPSBzdGFja1tzdGFja3AgKyAwXTtcbiAgICAgICAgICAgIG1hdFsxXSA9IHN0YWNrW3N0YWNrcCArIDFdO1xuICAgICAgICAgICAgbWF0WzJdID0gc3RhY2tbc3RhY2twICsgMl07XG4gICAgICAgICAgICBtYXRbM10gPSBzdGFja1tzdGFja3AgKyAzXTtcbiAgICAgICAgICAgIG1hdFs0XSA9IHN0YWNrW3N0YWNrcCArIDRdO1xuICAgICAgICAgICAgbWF0WzVdID0gc3RhY2tbc3RhY2twICsgNV07XG4gICAgICAgIH0sXG4gICAgICAgICdpbWcnOiBmdW5jdGlvbiAodGV4dHVyZSwgeCwgeSwgdywgaCwgdTAsIHYwLCB1MSwgdjEpIHtcbiAgICAgICAgICAgIHZhciB4MCA9IHgsXG4gICAgICAgICAgICAgICAgeTAgPSB5LFxuICAgICAgICAgICAgICAgIHgxID0geCArIHcsXG4gICAgICAgICAgICAgICAgeTEgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MiA9IHgsXG4gICAgICAgICAgICAgICAgeTIgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MyA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkzID0geSxcbiAgICAgICAgICAgICAgICBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIGUgPSBtYXRbNF0sXG4gICAgICAgICAgICAgICAgZiA9IG1hdFs1XSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAwLFxuICAgICAgICAgICAgICAgIGFyZ2IgPSByZW5kZXJlclsnY29sJ107XG5cbiAgICAgICAgICAgIGlmICh0ZXh0dXJlICE9IGN1cnJlbnRUZXh0dXJlIHx8XG4gICAgICAgICAgICAgICAgY291bnQgKyAxID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV4dHVyZSAhPSB0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgICAgICAgICAgICAgZ2xCaW5kVGV4dHVyZSgzNTUzLCBjdXJyZW50VGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBjb3VudCAqIFZFUlRFWF9TSVpFO1xuICAgICAgICAgICAgLy8gVmVydGV4IE9yZGVyXG4gICAgICAgICAgICAvLyBWZXJ0ZXggUG9zaXRpb24gfCBVViB8IEFSR0JcbiAgICAgICAgICAgIC8vIFZlcnRleCAxXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYSArIHkwICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYiArIHkwICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUwO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDJcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBhICsgeTEgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBiICsgeTEgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTE7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggM1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGEgKyB5MiAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGIgKyB5MiAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjE7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCA0XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYSArIHkzICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYiArIHkzICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgaWYgKCsrY291bnQgPj0gTUFYX0JBVENIKSB7XG4gICAgICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2ZXJ0ZXhEYXRhKTtcbiAgICAgICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdmbHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSByZXR1cm47XG4gICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZQb3NpdGlvbkRhdGEuc3ViYXJyYXkoMCwgY291bnQgKiBWRVJURVhfU0laRSkpO1xuICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZW5kZXJlcjtcbn1cbndpbmRvd1snVEMnXSA9IFRpbnlDYW52YXM7Il0sInNvdXJjZVJvb3QiOiIifQ==