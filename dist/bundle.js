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
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas.g.canvas.addEventListener("click", (event) => {
    console.log(getMousePos(canvas.g.canvas, event));
});
function loadTextures(urls) {
    return new Promise((resolver, rejects) => {
        let result = new Array();
        var i = 0;
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
                result[i++] = tex1;
                result[i++] = tex2;
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
    function initBullets(num) {
        const bs = [];
        for (let i = 0; i < num; i++) {
            bs.push({ position: { x: 50, y: 50 }, velocity: { x: 0, y: 0 }, visible: false, dir: Dir.Left, width: 4, height: 4 });
        }
        return bs;
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
        enemies: [
            {
                position: { x: 128, y: 0.0 },
                velocity: { x: WALK_SPEED, y: 0.0 },
                dir: Dir.Left,
                width: 20,
                height: 20,
                visible: true
            }
        ],
        bullets: initBullets(10)
    };
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
    const botAnim = new BodyAnimation(rightBot, leftBot, 5, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const idleAnim = new BodyAnimation(rightIdle, leftIdle, 20, true, [[0, 0, 1, 0.5], [0, 0.5, 1, 1]]);
    const runAnim = new BodyAnimation(rightRun, leftRun, 8, true, [[0, 0, 1, 0.2], [0, .2, 1, 0.4], [0, .4, 1, 0.6], [0, .6, 1, 0.8], [0, .8, 1, 1.0]]);
    const ShootingAnim = new BodyAnimation(rightShoot, leftShoot, 3, false, [[0, 0, 1, 0.25], [0, .25, 1, 0.5], [0, .5, 1, 0.75], [0, .75, 1, 1.0]]);
    let gunReady = 0;
    function update(a, m) {
        const p = m.player;
        switch (a) {
            case EventType.JumpPressed:
                if (p.position.y == FLOOR - p.height) {
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
                    e.velocity.x = -WALK_SPEED;
                    e.position.x = width - e.width;
                    e.position.y = 120;
                    e.dir = Dir.Right;
                    b.visible = false;
                    b.velocity.x = 0;
                    hitSound();
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
        for (var x = 0; x < 300; x += 20) {
            const text = x % 7 == 0 ? leftFloor : rightFloor;
            canvas.img(text.text, x, FLOOR - 10, text.width, text.height, 0, 0, 1, 1);
        }
    }
    function applyGravity(b) {
        b.velocity.y = b.position.y + b.height < FLOOR ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y;
    }
    function outsideScreen(b) {
        return b.position.x < 0 || b.position.x > width;
    }
    const FLOOR = height - 10;
    function moveBullet(b) {
        if (outsideScreen(b)) {
            b.visible = false;
            b.velocity.x = 0;
        }
        b.position.x += b.velocity.x * currentDelta;
    }
    function move(b) {
        applyGravity(b);
        b.position.y = Math.min(b.position.y + (b.velocity.y * currentDelta), FLOOR - b.height);
        b.position.x += b.velocity.x * currentDelta;
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
  if(!std2){
      o.start(0)
    std2 = true
  }
  o.frequency.setValueAtTime(200, ctx.currentTime)
  v.gain.setValueAtTime(0.1,ctx.currentTime)
  v.gain.exponentialRampToValueAtTime(1.0, ctx.currentTime + 0.1);
  o.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc291bmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvdGlueS1jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE1BQU07QUFDbkI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQ0FBcUMsZUFBZTtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpQ0FBaUMsRUFBRTtBQUN4RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsa0NBQWtDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxzQkFBc0IsS0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0EsZ0JBQWdCLGdCQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsQ0FBQztBQUNEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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UUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdkYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsWUFBWTtJQUM3QyxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFRLEVBQUUsRUFBRTtRQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUU7UUFDNUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsY0FBYyxFQUFFO1FBSWhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNO1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLEVBQUMsRUFBRSxHQUFDLEdBQUcsRUFBQyxFQUFFLEdBQUMsR0FBRyxDQUFDO1FBQ2hDLFdBQVcsRUFBRTtRQUViLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNkLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDYixNQUFNLENBQUMsR0FBRyxDQUNSLFFBQVEsRUFDUixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDWixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDWixDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsQ0FDRixDQUFDO2FBQ0g7U0FDRjtRQUVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEVBQUU7SUFDYixDQUFDO0lBRUQsTUFBTSxLQUFJLGdFQUFnRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDcEcsTUFBTSxJQUFJLEdBQVEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU07S0FDUDtJQUdELE9BQU8sRUFBRTtBQUNYLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdGpCRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsUUFBUTtBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixrQkFBa0I7QUFDbEI7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLCtDQUErQztBQUMvQyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsd0NBQXdDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyohXG4gKiBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxM1xuICogaHR0cHM6Ly9naXRodWIuY29tL0RhcnNhaW4vZnBzbWV0ZXJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cbjsoZnVuY3Rpb24gKHcsIHVuZGVmaW5lZCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgRWxlbWVudCB0eXBlIG5hbWUuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBuZXdFbChuYW1lKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG5cdH1cblxuXHQvKipcblx0ICogQXBwbHkgdGhlbWUgQ1NTIHByb3BlcnRpZXMgdG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBET00gZWxlbWVudC5cblx0ICogQHBhcmFtICB7T2JqZWN0fSAgdGhlbWUgICBUaGVtZSBvYmplY3QuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0VsZW1lbnR9XG5cdCAqL1xuXHRmdW5jdGlvbiBhcHBseVRoZW1lKGVsZW1lbnQsIHRoZW1lKSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiB0aGVtZSkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZWxlbWVudC5zdHlsZVtuYW1lXSA9IHRoZW1lW25hbWVdO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHR5cGUgb2YgdGhlIHZhbHVlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICpcblx0ICogQHJldHVybiB7U3RyaW5nfVxuXHQgKi9cblx0ZnVuY3Rpb24gdHlwZSh2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gU3RyaW5nKHZhbHVlKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpIHx8ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHJldHVybiB0eXBlb2YgdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgdmFsdWUgaXMgaW4gYW4gYXJyYXkuXG5cdCAqXG5cdCAqIEBwYXJhbSAge01peGVkfSB2YWx1ZVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gYXJyYXlcblx0ICpcblx0ICogQHJldHVybiB7SW50ZWdlcn0gQXJyYXkgaW5kZXggb3IgLTEgd2hlbiBub3QgZm91bmQuXG5cdCAqL1xuXHRmdW5jdGlvbiBpbkFycmF5KHZhbHVlLCBhcnJheSkge1xuXHRcdGlmICh0eXBlKGFycmF5KSAhPT0gJ2FycmF5Jykge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRpZiAoYXJyYXkuaW5kZXhPZikge1xuXHRcdFx0cmV0dXJuIGFycmF5LmluZGV4T2YodmFsdWUpO1xuXHRcdH1cblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGFycmF5Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0aWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cblx0LyoqXG5cdCAqIFBvb3IgbWFuJ3MgZGVlcCBvYmplY3QgZXh0ZW5kLlxuXHQgKlxuXHQgKiBFeGFtcGxlOlxuXHQgKiAgIGV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGZvciAodmFyIGtleSBpbiBhcmdzWzFdKSB7XG5cdFx0XHRpZiAoYXJnc1sxXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZShhcmdzWzFdW2tleV0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHRcdGFyZ3NbMF1ba2V5XSA9IGV4dGVuZCh7fSwgYXJnc1swXVtrZXldLCBhcmdzWzFdW2tleV0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdhcnJheSc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV0uc2xpY2UoMCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBhcmdzWzFdW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGFyZ3MubGVuZ3RoID4gMiA/XG5cdFx0XHRleHRlbmQuYXBwbHkobnVsbCwgW2FyZ3NbMF1dLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAyKSkpIDpcblx0XHRcdGFyZ3NbMF07XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydCBIU0wgY29sb3IgdG8gSEVYIHN0cmluZy5cblx0ICpcblx0ICogQHBhcmFtICB7QXJyYXl9IGhzbCBBcnJheSB3aXRoIFtodWUsIHNhdHVyYXRpb24sIGxpZ2h0bmVzc10uXG5cdCAqXG5cdCAqIEByZXR1cm4ge0FycmF5fSBBcnJheSB3aXRoIFtyZWQsIGdyZWVuLCBibHVlXS5cblx0ICovXG5cdGZ1bmN0aW9uIGhzbFRvSGV4KGgsIHMsIGwpIHtcblx0XHR2YXIgciwgZywgYjtcblx0XHR2YXIgdiwgbWluLCBzdiwgc2V4dGFudCwgZnJhY3QsIHZzZjtcblxuXHRcdGlmIChsIDw9IDAuNSkge1xuXHRcdFx0diA9IGwgKiAoMSArIHMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2ID0gbCArIHMgLSBsICogcztcblx0XHR9XG5cblx0XHRpZiAodiA9PT0gMCkge1xuXHRcdFx0cmV0dXJuICcjMDAwJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWluID0gMiAqIGwgLSB2O1xuXHRcdFx0c3YgPSAodiAtIG1pbikgLyB2O1xuXHRcdFx0aCA9IDYgKiBoO1xuXHRcdFx0c2V4dGFudCA9IE1hdGguZmxvb3IoaCk7XG5cdFx0XHRmcmFjdCA9IGggLSBzZXh0YW50O1xuXHRcdFx0dnNmID0gdiAqIHN2ICogZnJhY3Q7XG5cdFx0XHRpZiAoc2V4dGFudCA9PT0gMCB8fCBzZXh0YW50ID09PSA2KSB7XG5cdFx0XHRcdHIgPSB2O1xuXHRcdFx0XHRnID0gbWluICsgdnNmO1xuXHRcdFx0XHRiID0gbWluO1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSAxKSB7XG5cdFx0XHRcdHIgPSB2IC0gdnNmO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMikge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdjtcblx0XHRcdFx0YiA9IG1pbiArIHZzZjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMykge1xuXHRcdFx0XHRyID0gbWluO1xuXHRcdFx0XHRnID0gdiAtIHZzZjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDQpIHtcblx0XHRcdFx0ciA9IG1pbiArIHZzZjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHY7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbjtcblx0XHRcdFx0YiA9IHYgLSB2c2Y7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJyMnICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGhzbFRvSGV4LlxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuXHRcdGMgPSBNYXRoLnJvdW5kKGMgKiAyNTUpLnRvU3RyaW5nKDE2KTtcblx0XHRyZXR1cm4gYy5sZW5ndGggPT09IDEgPyAnMCcgKyBjIDogYztcblx0fVxuXG5cdC8qKlxuXHQgKiBNYW5hZ2UgZWxlbWVudCBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV9ICAgICBlbGVtZW50XG5cdCAqIEBwYXJhbSAge0V2ZW50fSAgICBldmVudE5hbWVcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Qm9vbH0gICAgIHJlbW92ZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtWb2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gbGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyLCByZW1vdmUpIHtcblx0XHRpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdhZGRFdmVudExpc3RlbmVyJ10oZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0fSBlbHNlIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRlbGVtZW50W3JlbW92ZSA/ICdkZXRhY2hFdmVudCcgOiAnYXR0YWNoRXZlbnQnXSgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0XHR9XG5cdH1cblxuXHQvLyBQcmVmZXJyZWQgdGltaW5nIGZ1bnRpb25cblx0dmFyIGdldFRpbWU7XG5cdChmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHBlcmYgPSB3LnBlcmZvcm1hbmNlO1xuXHRcdGlmIChwZXJmICYmIChwZXJmLm5vdyB8fCBwZXJmLndlYmtpdE5vdykpIHtcblx0XHRcdHZhciBwZXJmTm93ID0gcGVyZi5ub3cgPyAnbm93JyA6ICd3ZWJraXROb3cnO1xuXHRcdFx0Z2V0VGltZSA9IHBlcmZbcGVyZk5vd10uYmluZChwZXJmKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2V0VGltZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuICtuZXcgRGF0ZSgpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gTG9jYWwgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBwb2x5ZmlsbFxuXHR2YXIgY0FGID0gdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3LmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0dmFyIHJBRiA9IHcucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0JywgJ28nXTtcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXG5cdFx0Ly8gRm9yIGEgbW9yZSBhY2N1cmF0ZSBXaW5kb3dBbmltYXRpb25UaW1pbmcgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uLCBkaXRjaCB0aGUgbmF0aXZlXG5cdFx0Ly8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdoZW4gY2FuY2VsQW5pbWF0aW9uRnJhbWUgaXMgbm90IHByZXNlbnQgKG9sZGVyIHZlcnNpb25zIG9mIEZpcmVmb3gpXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSB2ZW5kb3JzLmxlbmd0aDsgaSA8IGwgJiYgIWNBRjsgKytpKSB7XG5cdFx0XHRjQUYgPSB3W3ZlbmRvcnNbaV0rJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJ10gfHwgd1t2ZW5kb3JzW2ldKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHRcdHJBRiA9IGNBRiAmJiB3W3ZlbmRvcnNbaV0rJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuXHRcdH1cblxuXHRcdGlmICghY0FGKSB7XG5cdFx0XHRyQUYgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGN1cnJUaW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0XHR2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcblx0XHRcdFx0bGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG5cdFx0XHRcdHJldHVybiB3LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcblx0XHRcdH07XG5cblx0XHRcdGNBRiA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoaWQpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0oKSk7XG5cblx0Ly8gUHJvcGVydHkgbmFtZSBmb3IgYXNzaWduaW5nIGVsZW1lbnQgdGV4dCBjb250ZW50XG5cdHZhciB0ZXh0UHJvcCA9IHR5cGUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykudGV4dENvbnRlbnQpID09PSAnc3RyaW5nJyA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcblxuXHQvKipcblx0ICogRlBTTWV0ZXIgY2xhc3MuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gYW5jaG9yICBFbGVtZW50IHRvIGFwcGVuZCB0aGUgbWV0ZXIgdG8uIERlZmF1bHQgaXMgZG9jdW1lbnQuYm9keS5cblx0ICogQHBhcmFtIHtPYmplY3R9ICBvcHRpb25zIE9iamVjdCB3aXRoIG9wdGlvbnMuXG5cdCAqL1xuXHRmdW5jdGlvbiBGUFNNZXRlcihhbmNob3IsIG9wdGlvbnMpIHtcblx0XHQvLyBPcHRpb25hbCBhcmd1bWVudHNcblx0XHRpZiAodHlwZShhbmNob3IpID09PSAnb2JqZWN0JyAmJiBhbmNob3Iubm9kZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b3B0aW9ucyA9IGFuY2hvcjtcblx0XHRcdGFuY2hvciA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fVxuXHRcdGlmICghYW5jaG9yKSB7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblxuXHRcdC8vIFByaXZhdGUgcHJvcGVydGllc1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgbyA9IGV4dGVuZCh7fSwgRlBTTWV0ZXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG5cdFx0dmFyIGVsID0ge307XG5cdFx0dmFyIGNvbHMgPSBbXTtcblx0XHR2YXIgdGhlbWUsIGhlYXRtYXBzO1xuXHRcdHZhciBoZWF0RGVwdGggPSAxMDA7XG5cdFx0dmFyIGhlYXRpbmcgPSBbXTtcblxuXHRcdHZhciB0aGlzRnJhbWVUaW1lID0gMDtcblx0XHR2YXIgZnJhbWVUaW1lID0gby50aHJlc2hvbGQ7XG5cdFx0dmFyIGZyYW1lU3RhcnQgPSAwO1xuXHRcdHZhciBsYXN0TG9vcCA9IGdldFRpbWUoKSAtIGZyYW1lVGltZTtcblx0XHR2YXIgdGltZTtcblxuXHRcdHZhciBmcHNIaXN0b3J5ID0gW107XG5cdFx0dmFyIGR1cmF0aW9uSGlzdG9yeSA9IFtdO1xuXG5cdFx0dmFyIGZyYW1lSUQsIHJlbmRlcklEO1xuXHRcdHZhciBzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblx0XHR2YXIgZ3JhcGhIZWlnaHQsIGNvdW50LCBpLCBqO1xuXG5cdFx0Ly8gRXhwb3NlZCBwcm9wZXJ0aWVzXG5cdFx0c2VsZi5vcHRpb25zID0gbztcblx0XHRzZWxmLmZwcyA9IDA7XG5cdFx0c2VsZi5kdXJhdGlvbiA9IDA7XG5cdFx0c2VsZi5pc1BhdXNlZCA9IDA7XG5cblx0XHQvKipcblx0XHQgKiBUaWNrIHN0YXJ0IGZvciBtZWFzdXJpbmcgdGhlIGFjdHVhbCByZW5kZXJpbmcgZHVyYXRpb24uXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZnJhbWVTdGFydCA9IGdldFRpbWUoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogRlBTIHRpY2suXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdHNlbGYudGljayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWUgPSBnZXRUaW1lKCk7XG5cdFx0XHR0aGlzRnJhbWVUaW1lID0gdGltZSAtIGxhc3RMb29wO1xuXHRcdFx0ZnJhbWVUaW1lICs9ICh0aGlzRnJhbWVUaW1lIC0gZnJhbWVUaW1lKSAvIG8uc21vb3RoaW5nO1xuXHRcdFx0c2VsZi5mcHMgPSAxMDAwIC8gZnJhbWVUaW1lO1xuXHRcdFx0c2VsZi5kdXJhdGlvbiA9IGZyYW1lU3RhcnQgPCBsYXN0TG9vcCA/IGZyYW1lVGltZSA6IHRpbWUgLSBmcmFtZVN0YXJ0O1xuXHRcdFx0bGFzdExvb3AgPSB0aW1lO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBQYXVzZSBkaXNwbGF5IHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAxO1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihmcmFtZUlEKTtcblx0XHRcdFx0Y0FGKHJlbmRlcklEKTtcblx0XHRcdFx0ZnJhbWVJRCA9IHJlbmRlcklEID0gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXN1bWUgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFmcmFtZUlEKSB7XG5cdFx0XHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXHRcdFx0XHRyZXF1ZXN0UmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVXBkYXRlIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAgT3B0aW9uIG5hbWUuXG5cdFx0ICogQHBhcmFtIHtNaXhlZH0gIHZhbHVlIE5ldyB2YWx1ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zZXQgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdG9bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdHNob3dGcHMgPSBvLnNob3cgPT09ICdmcHMnO1xuXG5cdFx0XHQvLyBSZWJ1aWxkIG9yIHJlcG9zaXRpb24gZWxlbWVudHMgd2hlbiBzcGVjaWZpYyBvcHRpb24gaGFzIGJlZW4gdXBkYXRlZFxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVidWlsZGVycykgIT09IC0xKSB7XG5cdFx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaW5BcnJheShuYW1lLCByZXBvc2l0aW9uZXJzKSAhPT0gLTEpIHtcblx0XHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIHJlbmRlcmluZyBkdXJhdGlvbiBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dEdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ21zJyk7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlIG1ldGVyIGludG8gRlBTIG1vZGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvd0ZwcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYuc2V0KCdzaG93JywgJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZXMgYmV0d2VlbiBzaG93OiAnZnBzJyBhbmQgc2hvdzogJ2R1cmF0aW9uJy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsIHNob3dGcHMgPyAnbXMnIDogJ2ZwcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEhpZGUgdGhlIEZQU01ldGVyLiBBbHNvIHBhdXNlcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnBhdXNlKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTaG93IHRoZSBGUFNNZXRlci4gQWxzbyByZXN1bWVzIHRoZSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2hvdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHNlbGYucmVzdW1lKCk7XG5cdFx0XHRlbC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2sgdGhlIGN1cnJlbnQgRlBTIGFuZCBzYXZlIGl0IGluIGhpc3RvcnkuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhpc3RvcnlUaWNrKCkge1xuXHRcdFx0Zm9yIChpID0gby5oaXN0b3J5OyBpLS07KSB7XG5cdFx0XHRcdGZwc0hpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5mcHMgOiBmcHNIaXN0b3J5W2ktMV07XG5cdFx0XHRcdGR1cmF0aW9uSGlzdG9yeVtpXSA9IGkgPT09IDAgPyBzZWxmLmR1cmF0aW9uIDogZHVyYXRpb25IaXN0b3J5W2ktMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyBoZWF0IGhleCBjb2xvciBiYXNlZCBvbiB2YWx1ZXMgcGFzc2VkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gaGVhdG1hcFxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IHZhbHVlXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWluXG5cdFx0ICogQHBhcmFtICB7SW50ZWdlcn0gbWF4XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtJbnRlZ2VyfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGdldEhlYXQoaGVhdG1hcCwgdmFsdWUsIG1pbiwgbWF4KSB7XG5cdFx0XHRyZXR1cm4gaGVhdG1hcHNbMHxoZWF0bWFwXVtNYXRoLnJvdW5kKE1hdGgubWluKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIGhlYXREZXB0aCwgaGVhdERlcHRoKSldO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBjb3VudGVyIG51bWJlciBhbmQgbGVnZW5kLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuXHRcdFx0Ly8gVXBkYXRlIGxlZ2VuZCBvbmx5IHdoZW4gY2hhbmdlZFxuXHRcdFx0aWYgKGVsLmxlZ2VuZC5mcHMgIT09IHNob3dGcHMpIHtcblx0XHRcdFx0ZWwubGVnZW5kLmZwcyA9IHNob3dGcHM7XG5cdFx0XHRcdGVsLmxlZ2VuZFt0ZXh0UHJvcF0gPSBzaG93RnBzID8gJ0ZQUycgOiAnbXMnO1xuXHRcdFx0fVxuXHRcdFx0Ly8gVXBkYXRlIGNvdW50ZXIgd2l0aCBhIG5pY2VseSBmb3JtYXRlZCAmIHJlYWRhYmxlIG51bWJlclxuXHRcdFx0Y291bnQgPSBzaG93RnBzID8gc2VsZi5mcHMgOiBzZWxmLmR1cmF0aW9uO1xuXHRcdFx0ZWwuY291bnRbdGV4dFByb3BdID0gY291bnQgPiA5OTkgPyAnOTk5KycgOiBjb3VudC50b0ZpeGVkKGNvdW50ID4gOTkgPyAwIDogby5kZWNpbWFscyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVuZGVyIGN1cnJlbnQgRlBTIHN0YXRlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0Ly8gSWYgcmVuZGVyZXIgc3RvcHBlZCByZXBvcnRpbmcsIGRvIGEgc2ltdWxhdGVkIGRyb3AgdG8gMCBmcHNcblx0XHRcdGlmIChsYXN0TG9vcCA8IHRpbWUgLSBvLnRocmVzaG9sZCkge1xuXHRcdFx0XHRzZWxmLmZwcyAtPSBzZWxmLmZwcyAvIE1hdGgubWF4KDEsIG8uc21vb3RoaW5nICogNjAgLyBvLmludGVydmFsKTtcblx0XHRcdFx0c2VsZi5kdXJhdGlvbiA9IDEwMDAgLyBzZWxmLmZwcztcblx0XHRcdH1cblxuXHRcdFx0aGlzdG9yeVRpY2soKTtcblx0XHRcdHVwZGF0ZUNvdW50ZXIoKTtcblxuXHRcdFx0Ly8gQXBwbHkgaGVhdCB0byBlbGVtZW50c1xuXHRcdFx0aWYgKG8uaGVhdCkge1xuXHRcdFx0XHRpZiAoaGVhdGluZy5sZW5ndGgpIHtcblx0XHRcdFx0XHRmb3IgKGkgPSBoZWF0aW5nLmxlbmd0aDsgaS0tOykge1xuXHRcdFx0XHRcdFx0aGVhdGluZ1tpXS5lbC5zdHlsZVt0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZnBzLCAwLCBvLm1heEZwcykgOlxuXHRcdFx0XHRcdFx0XHRnZXRIZWF0KHRoZW1lW2hlYXRpbmdbaV0ubmFtZV0uaGVhdG1hcCwgc2VsZi5kdXJhdGlvbiwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChlbC5ncmFwaCAmJiB0aGVtZS5jb2x1bW4uaGVhdE9uKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gY29scy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGNvbHNbaV0uc3R5bGVbdGhlbWUuY29sdW1uLmhlYXRPbl0gPSBzaG93RnBzID9cblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZnBzSGlzdG9yeVtpXSwgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZS5jb2x1bW4uaGVhdG1hcCwgZHVyYXRpb25IaXN0b3J5W2ldLCBvLnRocmVzaG9sZCwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBncmFwaCBjb2x1bW5zIGhlaWdodFxuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBvLmhpc3Rvcnk7IGorKykge1xuXHRcdFx0XHRcdGNvbHNbal0uc3R5bGUuaGVpZ2h0ID0gKHNob3dGcHMgP1xuXHRcdFx0XHRcdFx0KGZwc0hpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby5tYXhGcHMgKiBNYXRoLm1pbihmcHNIaXN0b3J5W2pdLCBvLm1heEZwcykpIDogMCkgOlxuXHRcdFx0XHRcdFx0KGR1cmF0aW9uSGlzdG9yeVtqXSA/IE1hdGgucm91bmQoZ3JhcGhIZWlnaHQgLyBvLnRocmVzaG9sZCAqIE1hdGgubWluKGR1cmF0aW9uSGlzdG9yeVtqXSwgby50aHJlc2hvbGQpKSA6IDApXG5cdFx0XHRcdFx0KSArICdweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBSZXF1ZXN0IHJlbmRlcmluZyBsb29wLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50fSBBbmltYXRpb24gZnJhbWUgaW5kZXguXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVxdWVzdFJlbmRlcigpIHtcblx0XHRcdGlmIChvLmludGVydmFsIDwgMjApIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHJBRihyZXF1ZXN0UmVuZGVyKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmcmFtZUlEID0gc2V0VGltZW91dChyZXF1ZXN0UmVuZGVyLCBvLmludGVydmFsKTtcblx0XHRcdFx0cmVuZGVySUQgPSByQUYocmVuZGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBNZXRlciBldmVudHMgaGFuZGxlci5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50KSB7XG5cdFx0XHRldmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblx0XHRcdGlmIChldmVudC5wcmV2ZW50RGVmYXVsdCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG5cdFx0XHRcdGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRzZWxmLnRvZ2dsZSgpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIERlc3Ryb3lzIHRoZSBjdXJyZW50IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBTdG9wIHJlbmRlcmluZ1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnRzXG5cdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0Ly8gU3RvcCBsaXN0ZW5pbmdcblx0XHRcdHNlbGYudGljayA9IHNlbGYudGlja1N0YXJ0ID0gZnVuY3Rpb24gKCkge307XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiByZW1vdmVNZXRlcigpIHtcblx0XHRcdC8vIFVuYmluZCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyLCAxKTtcblx0XHRcdH1cblx0XHRcdC8vIERldGFjaCBlbGVtZW50XG5cdFx0XHRhbmNob3IucmVtb3ZlQ2hpbGQoZWwuY29udGFpbmVyKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBTZXRzIHRoZSB0aGVtZSwgYW5kIGdlbmVyYXRlcyBoZWF0bWFwcyB3aGVuIG5lZWRlZC5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBzZXRUaGVtZSgpIHtcblx0XHRcdHRoZW1lID0gRlBTTWV0ZXIudGhlbWVbby50aGVtZV07XG5cblx0XHRcdC8vIEdlbmVyYXRlIGhlYXRtYXBzXG5cdFx0XHRoZWF0bWFwcyA9IHRoZW1lLmNvbXBpbGVkSGVhdG1hcHMgfHwgW107XG5cdFx0XHRpZiAoIWhlYXRtYXBzLmxlbmd0aCAmJiB0aGVtZS5oZWF0bWFwcy5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IHRoZW1lLmhlYXRtYXBzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0aGVhdG1hcHNbal0gPSBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IGhlYXREZXB0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRoZWF0bWFwc1tqXVtpXSA9IGhzbFRvSGV4KDAuMzMgLyBoZWF0RGVwdGggKiBpLCB0aGVtZS5oZWF0bWFwc1tqXS5zYXR1cmF0aW9uLCB0aGVtZS5oZWF0bWFwc1tqXS5saWdodG5lc3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGVtZS5jb21waWxlZEhlYXRtYXBzID0gaGVhdG1hcHM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhbmQgYXR0YWNoZXMgdGhlIG1ldGVyIGVsZW1lbnQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGNyZWF0ZU1ldGVyKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIG9sZCBtZXRlciBpZiBwcmVzZW50XG5cdFx0XHRpZiAoZWwuY29udGFpbmVyKSB7XG5cdFx0XHRcdHJlbW92ZU1ldGVyKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGVtZVxuXHRcdFx0c2V0VGhlbWUoKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGVsZW1lbnRzXG5cdFx0XHRlbC5jb250YWluZXIgPSBhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29udGFpbmVyKTtcblx0XHRcdGVsLmNvdW50ID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5jb3VudCkpO1xuXHRcdFx0ZWwubGVnZW5kID0gZWwuY29udGFpbmVyLmFwcGVuZENoaWxkKGFwcGx5VGhlbWUobmV3RWwoJ2RpdicpLCB0aGVtZS5sZWdlbmQpKTtcblx0XHRcdGVsLmdyYXBoID0gby5ncmFwaCA/IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuZ3JhcGgpKSA6IDA7XG5cblx0XHRcdC8vIEFkZCBlbGVtZW50cyB0byBoZWF0aW5nIGFycmF5XG5cdFx0XHRoZWF0aW5nLmxlbmd0aCA9IDA7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZWwpIHtcblx0XHRcdFx0aWYgKGVsW2tleV0gJiYgdGhlbWVba2V5XS5oZWF0T24pIHtcblx0XHRcdFx0XHRoZWF0aW5nLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZToga2V5LFxuXHRcdFx0XHRcdFx0ZWw6IGVsW2tleV1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHcmFwaFxuXHRcdFx0Y29scy5sZW5ndGggPSAwO1xuXHRcdFx0aWYgKGVsLmdyYXBoKSB7XG5cdFx0XHRcdC8vIENyZWF0ZSBncmFwaFxuXHRcdFx0XHRlbC5ncmFwaC5zdHlsZS53aWR0aCA9IChvLmhpc3RvcnkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyAoby5oaXN0b3J5IC0gMSkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXG5cdFx0XHRcdC8vIEFkZCBjb2x1bW5zXG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBvLmhpc3Rvcnk7IGkrKykge1xuXHRcdFx0XHRcdGNvbHNbaV0gPSBlbC5ncmFwaC5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY29sdW1uKSk7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG5cdFx0XHRcdFx0Y29sc1tpXS5zdHlsZS5ib3R0b20gPSAwO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucmlnaHQgPSAoaSAqIHRoZW1lLmNvbHVtbi53aWR0aCArIGkgKiB0aGVtZS5jb2x1bW4uc3BhY2luZykgKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUud2lkdGggPSB0aGVtZS5jb2x1bW4ud2lkdGggKyAncHgnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuaGVpZ2h0ID0gJzBweCc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBpbml0aWFsIHN0YXRlXG5cdFx0XHRwb3NpdGlvbk1ldGVyKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGVuZCBjb250YWluZXIgdG8gYW5jaG9yXG5cdFx0XHRhbmNob3IuYXBwZW5kQ2hpbGQoZWwuY29udGFpbmVyKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgZ3JhcGggaGVpZ2h0IGFmdGVyIGl0IHdhcyBhcHBlbmRlZCB0byBET01cblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRncmFwaEhlaWdodCA9IGVsLmdyYXBoLmNsaWVudEhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdFx0aWYgKG8udG9nZ2xlT24pIHtcblx0XHRcdFx0aWYgKG8udG9nZ2xlT24gPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRlbC5jb250YWluZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RlbmVyKGVsLmNvbnRhaW5lciwgby50b2dnbGVPbiwgZXZlbnRIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBQb3NpdGlvbnMgdGhlIG1ldGVyIGJhc2VkIG9uIG9wdGlvbnMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHBvc2l0aW9uTWV0ZXIoKSB7XG5cdFx0XHRhcHBseVRoZW1lKGVsLmNvbnRhaW5lciwgbyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29uc3RydWN0LlxuXHRcdCAqL1xuXHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBDcmVhdGUgbWV0ZXIgZWxlbWVudFxuXHRcdFx0Y3JlYXRlTWV0ZXIoKTtcblx0XHRcdC8vIFN0YXJ0IHJlbmRlcmluZ1xuXHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdH0oKSk7XG5cdH1cblxuXHQvLyBFeHBvc2UgdGhlIGV4dGVuZCBmdW5jdGlvblxuXHRGUFNNZXRlci5leHRlbmQgPSBleHRlbmQ7XG5cblx0Ly8gRXhwb3NlIHRoZSBGUFNNZXRlciBjbGFzc1xuXHR3aW5kb3cuRlBTTWV0ZXIgPSBGUFNNZXRlcjtcblxuXHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0RlBTTWV0ZXIuZGVmYXVsdHMgPSB7XG5cdFx0aW50ZXJ2YWw6ICAxMDAsICAgICAvLyBVcGRhdGUgaW50ZXJ2YWwgaW4gbWlsbGlzZWNvbmRzLlxuXHRcdHNtb290aGluZzogMTAsICAgICAgLy8gU3Bpa2Ugc21vb3RoaW5nIHN0cmVuZ3RoLiAxIG1lYW5zIG5vIHNtb290aGluZy5cblx0XHRzaG93OiAgICAgICdmcHMnLCAgIC8vIFdoZXRoZXIgdG8gc2hvdyAnZnBzJywgb3IgJ21zJyA9IGZyYW1lIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy5cblx0XHR0b2dnbGVPbjogICdjbGljaycsIC8vIFRvZ2dsZSBiZXR3ZWVuIHNob3cgJ2ZwcycgYW5kICdtcycgb24gdGhpcyBldmVudC5cblx0XHRkZWNpbWFsczogIDEsICAgICAgIC8vIE51bWJlciBvZiBkZWNpbWFscyBpbiBGUFMgbnVtYmVyLiAxID0gNTkuOSwgMiA9IDU5Ljk0LCAuLi5cblx0XHRtYXhGcHM6ICAgIDYwLCAgICAgIC8vIE1heCBleHBlY3RlZCBGUFMgdmFsdWUuXG5cdFx0dGhyZXNob2xkOiAxMDAsICAgICAvLyBNaW5pbWFsIHRpY2sgcmVwb3J0aW5nIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblxuXHRcdC8vIE1ldGVyIHBvc2l0aW9uXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIE1ldGVyIHBvc2l0aW9uLlxuXHRcdHpJbmRleDogICAxMCwgICAgICAgICAvLyBNZXRlciBaIGluZGV4LlxuXHRcdGxlZnQ6ICAgICAnNXB4JywgICAgICAvLyBNZXRlciBsZWZ0IG9mZnNldC5cblx0XHR0b3A6ICAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgdG9wIG9mZnNldC5cblx0XHRyaWdodDogICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgcmlnaHQgb2Zmc2V0LlxuXHRcdGJvdHRvbTogICAnYXV0bycsICAgICAvLyBNZXRlciBib3R0b20gb2Zmc2V0LlxuXHRcdG1hcmdpbjogICAnMCAwIDAgMCcsICAvLyBNZXRlciBtYXJnaW4uIEhlbHBzIHdpdGggY2VudGVyaW5nIHRoZSBjb3VudGVyIHdoZW4gbGVmdDogNTAlO1xuXG5cdFx0Ly8gVGhlbWVcblx0XHR0aGVtZTogJ2RhcmsnLCAvLyBNZXRlciB0aGVtZS4gQnVpbGQgaW46ICdkYXJrJywgJ2xpZ2h0JywgJ3RyYW5zcGFyZW50JywgJ2NvbG9yZnVsJy5cblx0XHRoZWF0OiAgMCwgICAgICAvLyBBbGxvdyB0aGVtZXMgdG8gdXNlIGNvbG9yaW5nIGJ5IEZQUyBoZWF0LiAwIEZQUyA9IHJlZCwgbWF4RnBzID0gZ3JlZW4uXG5cblx0XHQvLyBHcmFwaFxuXHRcdGdyYXBoOiAgIDAsIC8vIFdoZXRoZXIgdG8gc2hvdyBoaXN0b3J5IGdyYXBoLlxuXHRcdGhpc3Rvcnk6IDIwIC8vIEhvdyBtYW55IGhpc3Rvcnkgc3RhdGVzIHRvIHNob3cgaW4gYSBncmFwaC5cblx0fTtcblxuXHQvLyBPcHRpb24gbmFtZXMgdGhhdCB0cmlnZ2VyIEZQU01ldGVyIHJlYnVpbGQgb3IgcmVwb3NpdGlvbiB3aGVuIG1vZGlmaWVkXG5cdHZhciByZWJ1aWxkZXJzID0gW1xuXHRcdCd0b2dnbGVPbicsXG5cdFx0J3RoZW1lJyxcblx0XHQnaGVhdCcsXG5cdFx0J2dyYXBoJyxcblx0XHQnaGlzdG9yeSdcblx0XTtcblx0dmFyIHJlcG9zaXRpb25lcnMgPSBbXG5cdFx0J3Bvc2l0aW9uJyxcblx0XHQnekluZGV4Jyxcblx0XHQnbGVmdCcsXG5cdFx0J3RvcCcsXG5cdFx0J3JpZ2h0Jyxcblx0XHQnYm90dG9tJyxcblx0XHQnbWFyZ2luJ1xuXHRdO1xufSh3aW5kb3cpKTtcbjsoZnVuY3Rpb24gKHcsIEZQU01ldGVyLCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8vIFRoZW1lcyBvYmplY3Rcblx0RlBTTWV0ZXIudGhlbWUgPSB7fTtcblxuXHQvLyBCYXNlIHRoZW1lIHdpdGggbGF5b3V0LCBubyBjb2xvcnNcblx0dmFyIGJhc2UgPSBGUFNNZXRlci50aGVtZS5iYXNlID0ge1xuXHRcdGhlYXRtYXBzOiBbXSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBhZGRpbmc6ICc1cHgnLFxuXHRcdFx0bWluV2lkdGg6ICc5NXB4Jyxcblx0XHRcdGhlaWdodDogJzMwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMwcHgnLFxuXHRcdFx0dGV4dEFsaWduOiAncmlnaHQnLFxuXHRcdFx0dGV4dFNoYWRvdzogJ25vbmUnXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGwsXG5cblx0XHRcdC8vIFN0eWxlc1xuXHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0XHR0b3A6IDAsXG5cdFx0XHRyaWdodDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMjRweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnQ29uc29sYXMsIEFuZGFsZSBNb25vLCBtb25vc3BhY2UnLFxuXHRcdFx0ekluZGV4OiAyXG5cdFx0fSxcblx0XHRsZWdlbmQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0bGVmdDogMCxcblx0XHRcdHBhZGRpbmc6ICc1cHggMTBweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGZvbnRTaXplOiAnMTJweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnMzJweCcsXG5cdFx0XHRmb250RmFtaWx5OiAnc2Fucy1zZXJpZicsXG5cdFx0XHR0ZXh0QWxpZ246ICdsZWZ0Jyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0Z3JhcGg6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHRcdFx0Ym94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0TW96Qm94U2l6aW5nOiAncGFkZGluZy1ib3gnLFxuXHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHR6SW5kZXg6IDFcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0Ly8gU2V0dGluZ3Ncblx0XHRcdHdpZHRoOiA0LFxuXHRcdFx0c3BhY2luZzogMSxcblx0XHRcdGhlYXRPbjogbnVsbCxcblx0XHRcdGhlYXRtYXA6IG51bGxcblx0XHR9XG5cdH07XG5cblx0Ly8gRGFyayB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5kYXJrID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuOFxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMyMjInLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdGJvcmRlcjogJzFweCBzb2xpZCAjMWExYTFhJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgIzIyMidcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRoZWF0T246ICdjb2xvcidcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyMzZjNmM2YnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBMaWdodCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS5saWdodCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC41LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGNvbG9yOiAnIzY2NicsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpLCAtMXB4IC0xcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KScsXG5cdFx0XHRib3hTaGFkb3c6ICcwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSknXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjZWFlYWVhJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gQ29sb3JmdWwgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuY29sb3JmdWwgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC42XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0YmFja2dyb3VuZDogJyM4ODgnLFxuXHRcdFx0Y29sb3I6ICcjZmZmJyxcblx0XHRcdHRleHRTaGFkb3c6ICcxcHggMXB4IDAgcmdiYSgwLDAsMCwuMiknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzc3NycsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC4yKSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFRyYW5zcGFyZW50IHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLnRyYW5zcGFyZW50ID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjgsXG5cdFx0XHRsaWdodG5lc3M6IDAuNVxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0cGFkZGluZzogMCxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdHBhZGRpbmc6ICcwIDVweCcsXG5cdFx0XHRoZWlnaHQ6ICc0MHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDJweCdcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHRoZWlnaHQ6ICc0MHB4J1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHR3aWR0aDogNSxcblx0XHRcdGJhY2tncm91bmQ6ICcjOTk5Jyxcblx0XHRcdGhlYXRPbjogJ2JhY2tncm91bmRDb2xvcicsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHR9XG5cdH0pO1xufSh3aW5kb3csIEZQU01ldGVyKSk7IiwiaW1wb3J0ICcuL2xpYi90aW55LWNhbnZhcy5qcyc7XG5pbXBvcnQgJy4vbGliL3NvdW5kcy5qcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHJlamVjdHMgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICdmcHNtZXRlcic7XG5cbmRlY2xhcmUgdmFyIGZpcmVTb3VuZDogYW55O1xuZGVjbGFyZSB2YXIganVtcFNvdW5kOiBhbnk7XG5kZWNsYXJlIHZhciBoaXRTb3VuZDogYW55O1xuXG5kZWNsYXJlIHZhciBGUFNNZXRlcjogYW55O1xuXG5jb25zdCBmcHNNID0gbmV3IEZQU01ldGVyKCk7XG5cbmRlY2xhcmUgdmFyIFRDOiBhbnk7XG5kZWNsYXJlIHZhciBUQ1RleDogYW55O1xuXG5pbnRlcmZhY2UgVmVjdG9yIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuaW50ZXJmYWNlIEJ1bGxldCBleHRlbmRzIEJvZHkge1xufVxuaW50ZXJmYWNlIEJvZHkge1xuICBwb3NpdGlvbjogVmVjdG9yXG4gIHZlbG9jaXR5OiBWZWN0b3JcbiAgZGlyOiBEaXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICB2aXNpYmxlOiBib29sZWFuXG59XG5pbnRlcmZhY2UgUGxheWVyIGV4dGVuZHMgQm9keSB7XG4gIHNob290aW5nOiBib29sZWFuXG59XG5pbnRlcmZhY2UgRW5lbXkgZXh0ZW5kcyBCb2R5IHtcbn1cblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcGxheWVyOiBQbGF5ZXJcbiAgZW5lbWllczogRW5lbXlbXVxuICBidWxsZXRzOiBCdWxsZXRbXVxufVxuXG5pbnRlcmZhY2UgSW1nVGV4dHVyZSB7XG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgdGV4dDogV2ViR0xUZXh0dXJlXG59XG5lbnVtIERpciB7XG4gIExlZnQsXG4gIFJpZ2h0XG59XG5cbmVudW0gRXZlbnRUeXBlIHtcbiAgUmlnaHRQcmVzc2VkLFxuICBMZWZ0UmVsZWFzZWQsXG4gIFJpZ2h0UmVsZWFzZWQsXG4gIExlZnRQcmVzc2VkLFxuICBKdW1wUHJlc3NlZCxcbiAgVXNlUHJlc3NlZCxcbiAgQXR0YWNrUHJlc3NlZCxcbiAgQXR0YWNrUmVsZWFzZWRcbn1cblxudHlwZSBBY3Rpb24gPSBFdmVudFR5cGVcbnR5cGUgTW9kZWwgPSBTdGF0ZTtcbnZhciBjYW52YXMgPSBUQyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYycpKVxuaW50ZXJmYWNlIEFBQkIge1xuICBsdDogVmVjdG9yXG4gIHJ0OiBWZWN0b3JcbiAgcmI6IFZlY3RvclxuICBsYjogVmVjdG9yXG59XG5mdW5jdGlvbiBnZXRBQUJCKGI6IEJvZHkpOiBBQUJCIHtcbiAgcmV0dXJuIHtcbiAgICBsdDogeyB4OiBiLnBvc2l0aW9uLngsIHk6IGIucG9zaXRpb24ueSB9LFxuICAgIHJ0OiB7IHg6IGIucG9zaXRpb24ueCArIGIud2lkdGgsIHk6IGIucG9zaXRpb24ueSB9LFxuICAgIHJiOiB7IHg6IGIucG9zaXRpb24ueCArIGIud2lkdGgsIHk6IGIucG9zaXRpb24ueSArIGIuaGVpZ2h0IH0sXG4gICAgbGI6IHsgeDogYi5wb3NpdGlvbi54LCB5OiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGlsZUluZGVjZXModjogVmVjdG9yKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3Iodi55IC8gMjAgLyogdGlsZVNpemUgKi8pICogNTAgLyogd29ybGRTaXplICovICsgTWF0aC5mbG9vcih2LnggLyAyMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaWRlKGJvZHkxOiBCb2R5LCBib2R5MjogQm9keSk6IGJvb2xlYW4ge1xuICBjb25zdCByZXN1bHQgPSBib2R5MS5wb3NpdGlvbi54IDwgKGJvZHkyLnBvc2l0aW9uLnggKyBib2R5Mi53aWR0aCkgJiZcbiAgICBib2R5MS5wb3NpdGlvbi54ICsgKGJvZHkxLndpZHRoKSA+IGJvZHkyLnBvc2l0aW9uLnggJiZcbiAgICBib2R5MS5wb3NpdGlvbi55IDwgYm9keTIucG9zaXRpb24ueSArIGJvZHkyLmhlaWdodCAmJlxuICAgIGJvZHkxLnBvc2l0aW9uLnkgKyBib2R5MS5oZWlnaHQgPiBib2R5Mi5wb3NpdGlvbi55O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZXRNb3VzZVBvcyhjYW52YXMsIGV2dCkge1xuICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHtcbiAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXG4gIH07XG59XG5jYW52YXMuZy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBjb25zb2xlLmxvZyhnZXRNb3VzZVBvcyhjYW52YXMuZy5jYW52YXMsIGV2ZW50KSlcbn0pXG5cbmZ1bmN0aW9uIGxvYWRUZXh0dXJlcyh1cmxzOiBzdHJpbmdbXSk6IFByb21pc2U8SW1nVGV4dHVyZVtdPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZXIsIHJlamVjdHMpID0+IHtcbiAgICBsZXQgcmVzdWx0OiBJbWdUZXh0dXJlW10gPSBuZXcgQXJyYXk8SW1nVGV4dHVyZT4oKTtcblxuICAgIHZhciBpID0gMFxuICAgIHVybHMuZm9yRWFjaCgodXJsLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlXG4gICAgICBpbWcuc3JjID0gdXJsXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIilcbiAgICAgICAgZy5jYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodFxuICAgICAgICBnLmNhbnZhcy53aWR0aCA9IGltZy53aWR0aFxuICAgICAgICBnLmRyYXdJbWFnZShpbWcsIDAsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgY29uc3QgdGV4MSA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cblxuICAgICAgICBnLmNsZWFyUmVjdCgwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcuc2F2ZSgpXG4gICAgICAgIGcuc2NhbGUoLTEsIDEpXG4gICAgICAgIGcuZHJhd0ltYWdlKGltZywgaW1nLndpZHRoICogLTEsIDAsIGltZy53aWR0aCwgaW1nLmhlaWdodClcbiAgICAgICAgZy5yZXN0b3JlKClcbiAgICAgICAgY29uc3QgdGV4MiA9IHtcbiAgICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1nLmhlaWdodCxcbiAgICAgICAgICB0ZXh0OiBUQ1RleChjYW52YXMuZywgZy5jYW52YXMsIGltZy53aWR0aCwgaW1nLmhlaWdodCkgYXMgV2ViR0xUZXh0dXJlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlc3VsdFtpKytdID0gdGV4MVxuICAgICAgICByZXN1bHRbaSsrXSA9IHRleDJcbiAgICAgICAgaWYgKGluZGV4ID09IHVybHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZXIocmVzdWx0KVxuICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5sb2FkVGV4dHVyZXMoW1wibW91bnRhaW4ucG5nXCIsXCJmbG9vci5wbmdcIiwgXCJzb2xkaWVyX3J1bi5wbmdcIiwgXCJzb2xkaWVyX2lkbGUucG5nXCIsIFwic29sZGllcl9zaG9vdGluZy5wbmdcIiwgXCJib3QucG5nXCJdKS50aGVuKCh0ZXh0dXJlcykgPT4ge1xuICBjb25zdCBbck1vdW50YWluLGxNb3VudGFpbixyaWdodEZsb29yLGxlZnRGbG9vciwgcmlnaHRSdW4sIGxlZnRSdW4sIHJpZ2h0SWRsZSwgbGVmdElkbGUsIHJpZ2h0U2hvb3QsIGxlZnRTaG9vdCwgcmlnaHRCb3QsIGxlZnRCb3RdID0gdGV4dHVyZXNcblxuICBsZXQgY3VycmVudERlbHRhID0gMC4wXG4gIGxldCBjdXJyZW50VGltZSA9IDAuMFxuICBsZXQgY3VycmVudEFjdGlvbjogQWN0aW9uID0gbnVsbFxuICBjb25zdCBHUkFWSVRZID0gMTBcblxuICBjb25zdCBKVU1QX1ZFTCA9IDMwXG4gIGNvbnN0IFdBTEtfU1BFRUQgPSA2XG4gIGxldCBzdGFydFRpbWUgPSAwO1xuICBsZXQgaWQgPSAwO1xuICBjb25zdCBbd2lkdGgsIGhlaWdodF0gPSBbY2FudmFzLmcuY2FudmFzLndpZHRoLCBjYW52YXMuZy5jYW52YXMuaGVpZ2h0XVxuXG4gIGZ1bmN0aW9uIHRleHR1cmVGcm9tUGl4ZWxBcnJheShnbCwgZGF0YUFycmF5LCB0eXBlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGRhdGFUeXBlZEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YUFycmF5KTsgLy8gRG9uJ3QgbmVlZCB0byBkbyB0aGlzIGlmIHRoZSBkYXRhIGlzIGFscmVhZHkgaW4gYSB0eXBlZCBhcnJheVxuICAgIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgdHlwZSwgd2lkdGgsIGhlaWdodCwgMCwgdHlwZSwgZ2wuVU5TSUdORURfQllURSwgZGF0YVR5cGVkQXJyYXkpO1xuICAgIC8vIE90aGVyIHRleHR1cmUgc2V0dXAgaGVyZSwgbGlrZSBmaWx0ZXIgbW9kZXMgYW5kIG1pcG1hcCBnZW5lcmF0aW9uXG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0QnVsbGV0cyhudW06IG51bWJlcik6IEJ1bGxldFtdIHtcbiAgICBjb25zdCBiczogQnVsbGV0W10gPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgIGJzLnB1c2goeyBwb3NpdGlvbjogeyB4OiA1MCwgeTogNTAgfSwgdmVsb2NpdHk6IHsgeDogMCwgeTogMCB9LCB2aXNpYmxlOiBmYWxzZSwgZGlyOiBEaXIuTGVmdCwgd2lkdGg6IDQsIGhlaWdodDogNCB9KVxuICAgIH1cbiAgICByZXR1cm4gYnNcbiAgfVxuXG4gIGxldCBjdXJyZW50U3RhdGU6IE1vZGVsID0ge1xuICAgIHBsYXllcjoge1xuICAgICAgcG9zaXRpb246IHsgeDogMTI4LCB5OiAwLjAgfSxcbiAgICAgIHZlbG9jaXR5OiB7IHg6IDAuMCwgeTogMC4wIH0sXG4gICAgICBkaXI6IERpci5SaWdodCxcbiAgICAgIHNob290aW5nOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAyMCxcbiAgICAgIGhlaWdodDogMjAsXG4gICAgICB2aXNpYmxlOiB0cnVlXG4gICAgfSxcbiAgICBlbmVtaWVzOiBbXG4gICAgICB7XG4gICAgICAgIHBvc2l0aW9uOiB7IHg6IDEyOCwgeTogMC4wIH0sXG4gICAgICAgIHZlbG9jaXR5OiB7IHg6IFdBTEtfU1BFRUQsIHk6IDAuMCB9LFxuICAgICAgICBkaXI6IERpci5MZWZ0LFxuICAgICAgICB3aWR0aDogMjAsXG4gICAgICAgIGhlaWdodDogMjAsXG4gICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgIH1cbiAgICBdLFxuICAgIGJ1bGxldHM6IGluaXRCdWxsZXRzKDEwKVxuICB9XG4gIHdpbmRvd1tcInN0YXRlXCJdID0gY3VycmVudFN0YXRlXG5cbiAgY29uc3Qga2VlcEFuaW1hdGlvbiA9ICh0aW1lOiBudW1iZXIpID0+IHtcbiAgICBjdXJyZW50RGVsdGEgPSAodGltZSAtIHN0YXJ0VGltZSkgLyAxMDA7XG4gICAgY3VycmVudFRpbWUgPSB0aW1lXG4gICAgc3RhcnRUaW1lID0gdGltZTtcblxuICAgIHVwZGF0ZShjdXJyZW50QWN0aW9uLCBjdXJyZW50U3RhdGUpXG4gICAgcmVuZGVyKGN1cnJlbnRTdGF0ZSlcbiAgICBjdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJ1bkdhbWUoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGtlZXBBbmltYXRpb24pO1xuICB9XG5cblxuICBjb25zdCBoYW5kbGVyU3RhcnQgPSAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2LmN1cnJlbnRUYXJnZXRbJ2lkJ10pIHtcbiAgICAgIGNhc2UgXCJhXCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSnVtcFByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1ByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxlZnRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBjb2RlLi4uXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYW5kbGVyRW5kID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1JlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UmVsZWFzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicmVjdFwiKTtcbiAgY29uc3QgcHNPcCA9IHsgcGFzc2l2ZTogdHJ1ZSB9O1xuICBzdmdzLmZvckVhY2gocmVjID0+IHtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICByZWMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICB9KTtcblxuXG4gIC8qICAgc3Zncy5mb3JFYWNoKHJlYyA9PiB7XG4gICAgICByZWMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlclN0YXJ0LCBwc09wKTtcbiAgICAgIHJlYy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgaGFuZGxlckVuZCwgcHNPcCk7XG4gICAgfSkgKi9cblxuICBjb25zdCBoYW5kbGVyS0JEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzNzpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5KdW1wUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTM6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuVXNlUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQXR0YWNrUHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyS0JEb3duLCB0cnVlKTtcblxuICBjb25zdCBoYW5kbGVyS0JVcCA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5SaWdodFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcktCVXAsIHRydWUpO1xuXG4gIGZ1bmN0aW9uIEJvZHlBbmltYXRpb24oXG4gICAgcmlnaHRUOiBJbWdUZXh0dXJlLFxuICAgIGxlZnRUOiBJbWdUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIHAucG9zaXRpb24ueCArIChwLndpZHRoIC8gMiksXG4gICAgICAgIHAucG9zaXRpb24ueSxcbiAgICAgICAgcC53aWR0aCxcbiAgICAgICAgcC5oZWlnaHQsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgYm90QW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0Qm90LCBsZWZ0Qm90LCA1LCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaWRsZUFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodElkbGUsIGxlZnRJZGxlLCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IHJ1bkFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFJ1biwgbGVmdFJ1biwgOCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjJdLCBbMCwgLjIsIDEsIDAuNF0sIFswLCAuNCwgMSwgMC42XSwgWzAsIC42LCAxLCAwLjhdLCBbMCwgLjgsIDEsIDEuMF1dKVxuICBjb25zdCBTaG9vdGluZ0FuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFNob290LCBsZWZ0U2hvb3QsIDMsIGZhbHNlLCBbWzAsIDAsIDEsIDAuMjVdLCBbMCwgLjI1LCAxLCAwLjVdLCBbMCwgLjUsIDEsIDAuNzVdLCBbMCwgLjc1LCAxLCAxLjBdXSlcblxuXG4gIGxldCBndW5SZWFkeTogbnVtYmVyID0gMFxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShhOiBBY3Rpb24sIG06IE1vZGVsKSB7XG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgc3dpdGNoIChhKSB7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5KdW1wUHJlc3NlZDpcbiAgICAgICAgaWYgKHAucG9zaXRpb24ueSA9PSBGTE9PUiAtIHAuaGVpZ2h0KSB7XG4gICAgICAgICAgcC52ZWxvY2l0eS55ID0gLUpVTVBfVkVMXG4gICAgICAgICAganVtcFNvdW5kKClcbiAgICAgICAgfVxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5MZWZ0UHJlc3NlZDpcbiAgICAgICAgcC5kaXIgPSBEaXIuTGVmdFxuICAgICAgICBwLnZlbG9jaXR5LnggPSAtV0FMS19TUEVFRFxuICAgICAgICBwLnNob290aW5nID0gZmFsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5SaWdodFByZXNzZWQ6XG4gICAgICAgIHAuZGlyID0gRGlyLlJpZ2h0XG4gICAgICAgIHAudmVsb2NpdHkueCA9IFdBTEtfU1BFRURcbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkOlxuICAgICAgICBwLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuUmlnaHRSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkF0dGFja1ByZXNzZWQ6XG4gICAgICAgIFNob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIHAuc2hvb3RpbmcgPSB0cnVlXG4gICAgICAgIHAudmVsb2NpdHkueCA9IChwLmRpciA9PSBEaXIuTGVmdCA/IDEuNSA6IC0xLjUpXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICAgICAgaWYgKCFiLnZpc2libGUgJiYgZ3VuUmVhZHkgPT0gMCkge1xuICAgICAgICAgICAgYi5wb3NpdGlvbi54ID0gcC5wb3NpdGlvbi54ICsgcC53aWR0aCArIGIud2lkdGhcbiAgICAgICAgICAgIGIucG9zaXRpb24ueSA9IHAucG9zaXRpb24ueSArIChwLmhlaWdodCAvIDIuNClcbiAgICAgICAgICAgIGIudmVsb2NpdHkueCA9IHAuZGlyID09IERpci5SaWdodCA/IDM1IDogLTM1XG4gICAgICAgICAgICBiLnZpc2libGUgPSB0cnVlXG4gICAgICAgICAgICBndW5SZWFkeSA9IDEyXG4gICAgICAgICAgICBmaXJlU291bmQoKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICAvL3Auc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICAvL1Nob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1vdmUobS5wbGF5ZXIpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIG1vdmUoZSlcbiAgICAgIGlmIChlLnBvc2l0aW9uLnggPCAwIHx8IChlLnBvc2l0aW9uLnggKyAyMCA+IHdpZHRoKSkge1xuICAgICAgICBlLnZlbG9jaXR5LnggPSBlLnZlbG9jaXR5LnggKiAtMVxuICAgICAgICBlLmRpciA9IGUudmVsb2NpdHkueCA+IDAgPyBEaXIuTGVmdCA6IERpci5SaWdodFxuICAgICAgfVxuICAgICAgbS5idWxsZXRzLmZpbHRlcihiID0+IGIudmlzaWJsZSkuZm9yRWFjaChiID0+IHtcbiAgICAgICAgaWYgKGNvbGxpZGUoYiwgZSkpIHtcbiAgICAgICAgICBlLnZlbG9jaXR5LnggPSAtV0FMS19TUEVFRFxuICAgICAgICAgIGUucG9zaXRpb24ueCA9IHdpZHRoIC0gZS53aWR0aFxuICAgICAgICAgIGUucG9zaXRpb24ueSA9IDEyMFxuICAgICAgICAgIGUuZGlyID0gRGlyLlJpZ2h0XG4gICAgICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICBiLnZlbG9jaXR5LnggPSAwXG4gICAgICAgICAgaGl0U291bmQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgbW92ZUJ1bGxldChiKVxuICAgIH1cblxuICAgIGd1blJlYWR5ID0gTWF0aC5tYXgoMCwgZ3VuUmVhZHkgLSAxKTtcbiAgfVxuXG4gIC8vY2FudmFzLnNjYWxlKDQsIDQpXG4gIGxldCB0ZXhEYXRhRmxvb3IgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IDIwICogMjAgKiA0OyBpKyspIHtcbiAgICB0ZXhEYXRhRmxvb3JbaV0gPSAxLjBcbiAgfVxuXG4gIGNvbnN0IGZsb29yVGV4ID0gdGV4dHVyZUZyb21QaXhlbEFycmF5KGNhbnZhcy5nLCB0ZXhEYXRhRmxvb3IsIGNhbnZhcy5nLlJHQkEsIDIwLCAyMCk7XG5cblxuICBmdW5jdGlvbiByZW5kZXJNb3VudGFpbigpIHtcbiAgICBjYW52YXMucHVzaCgpXG4gICAgY2FudmFzLnNjYWxlKDYsNilcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IDEwMDsgeCArPSAyMCkge1xuICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgbE1vdW50YWluLnRleHQsXG4gICAgICAgIHgsXG4gICAgICAgIDUsXG4gICAgICAgIGxNb3VudGFpbi53aWR0aCxcbiAgICAgICAgbE1vdW50YWluLmhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgICAgKTtcbiAgICB9XG4gICAgICBjYW52YXMucG9wKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZsb29yKCkge1xuICAgIFxuICAgIGZvciAodmFyIHggPSAwOyB4IDwgMzAwOyB4ICs9IDIwKSB7XG4gICAgICBjb25zdCB0ZXh0ID0geCAlIDcgPT0gMCA/IGxlZnRGbG9vciA6IHJpZ2h0Rmxvb3JcbiAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgIHRleHQudGV4dCxcbiAgICAgICAgeCxcbiAgICAgICAgRkxPT1ItMTAsXG4gICAgICAgIHRleHQud2lkdGgsXG4gICAgICAgIHRleHQuaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52ZWxvY2l0eS55ID0gYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgPCBGTE9PUiA/IGIudmVsb2NpdHkueSArIChHUkFWSVRZICogY3VycmVudERlbHRhKSA6IGIudmVsb2NpdHkueVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0c2lkZVNjcmVlbihiOiBCdWxsZXQpIHtcbiAgICByZXR1cm4gYi5wb3NpdGlvbi54IDwgMCB8fCBiLnBvc2l0aW9uLnggPiB3aWR0aFxuICB9XG4gIGNvbnN0IEZMT09SID0gaGVpZ2h0IC0gMTBcblxuICBmdW5jdGlvbiBtb3ZlQnVsbGV0KGI6IEJ1bGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRzaWRlU2NyZWVuKGIpKSB7XG4gICAgICBiLnZpc2libGUgPSBmYWxzZVxuICAgICAgYi52ZWxvY2l0eS54ID0gMFxuICAgIH1cbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGI6IEJvZHkpOiB2b2lkIHtcbiAgICBhcHBseUdyYXZpdHkoYilcbiAgICBiLnBvc2l0aW9uLnkgPSBNYXRoLm1pbihiLnBvc2l0aW9uLnkgKyAoYi52ZWxvY2l0eS55ICogY3VycmVudERlbHRhKSwgRkxPT1IgLSBiLmhlaWdodClcbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAobTogTW9kZWwpID0+IHtcbiAgICBjYW52YXMuZy5jYW52YXMuc3R5bGUud2lkdGggPSBcImF1dG9cIjtcbiAgICBjYW52YXMuZy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gIE1hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0KjAuOTUpICsgXCJweFwiIDtcbiAgICBjYW52YXMuZy52aWV3cG9ydCgwLCAwLCBjYW52YXMuZy5jYW52YXMud2lkdGgsIGNhbnZhcy5nLmNhbnZhcy5oZWlnaHQpO1xuICAgIHJlbmRlck1vdW50YWluKClcblxuXG5cbiAgICBjb25zdCBwID0gbS5wbGF5ZXJcbiAgICBjYW52YXMuY2xzKClcbiAgICBjYW52YXMuYmtnKDU3LzI1NSw3My8yNTUsODEvMjU1KVxuICAgIHJlbmRlckZsb29yKClcblxuICAgIGlmIChwLnNob290aW5nKSB7XG4gICAgICBTaG9vdGluZ0FuaW0udXBkYXRlKHApXG4gICAgfSBlbHNlIGlmIChwLnZlbG9jaXR5LnggPT0gMCkge1xuICAgICAgaWRsZUFuaW0udXBkYXRlKHApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJ1bkFuaW0udXBkYXRlKHApXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIGJvdEFuaW0udXBkYXRlKGUpXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmJ1bGxldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGIgPSBtLmJ1bGxldHNbaV1cbiAgICAgIGlmIChiLnZpc2libGUpIHtcbiAgICAgICAgY2FudmFzLmltZyhcbiAgICAgICAgICBmbG9vclRleCxcbiAgICAgICAgICBiLnBvc2l0aW9uLngsXG4gICAgICAgICAgYi5wb3NpdGlvbi55LFxuICAgICAgICAgIDQsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMSxcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzLmZsdXNoKCk7XG4gICAgZnBzTS50aWNrKClcbiAgfVxuXG4gIC8qICAqL2lmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICBjb25zdCBzdmdzOiBhbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwic3ZnXCIpXG4gICAgc3Zncy5mb3JFYWNoKHN2ZyA9PiB7XG4gICAgICBzdmcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9KTtcbiAgICAvKiAgKi9cbiAgfVxuXG5cbiAgcnVuR2FtZSgpXG59KVxuIiwiZnVuY3Rpb24gRShjKXtcbiAgICB0aGlzLm4gPSBjLmNyZWF0ZUdhaW4oKVxuICAgIHRoaXMubi5nYWluLnZhbHVlID0gMFxuICAgIHRoaXMuYWRkRXZlbnRUb1F1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUpO1xuICAgICAgdGhpcy5uLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgYy5jdXJyZW50VGltZSArIDAuMDAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMywgYy5jdXJyZW50VGltZSArIDAuMTAxKTtcbiAgICAgIHRoaXMubi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGMuY3VycmVudFRpbWUgKyAwLjUwMCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBXTkIoYyl7XG4gICAgdmFyIGJzID0gYy5zYW1wbGVSYXRlO1xuICAgIHZhciBiID0gYy5jcmVhdGVCdWZmZXIoMSwgYnMsIGMuc2FtcGxlUmF0ZSk7XG4gICAgdmFyIG8gPSBiLmdldENoYW5uZWxEYXRhKDApO1xuICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJzOyBpKyspIHtcbiAgICAgIG9baV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgfVxuICBcbiAgICB0aGlzLnMgPSBjLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgIHRoaXMucy5idWZmZXIgPSBiO1xuICAgIHRoaXMucy5sb29wID0gdHJ1ZVxuICB9O1xuICBcbiAgdmFyIGN0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpXG4gIHZhciBuID0gbmV3IFdOQihjdHgpXG4gIHZhciB2MSA9IG5ldyBFKGN0eClcbiAgdmFyIHYyID0gbmV3IEUoY3R4KVxuICB2YXIgdjMgPSBuZXcgRShjdHgpXG4gIHZhciB2NCA9IG5ldyBFKGN0eClcbiAgdmFyIGYgPSBjdHguY3JlYXRlQmlxdWFkRmlsdGVyKClcbiAgdmFyIGcgPSBjdHguY3JlYXRlR2FpbigpXG4gIHZhciB2cyA9IDBcbiAgdmFyIHN0ZCA9IGZhbHNlXG5cbiAgXG4gIG4ucy5jb25uZWN0KHYxLm4pXG4gIG4ucy5jb25uZWN0KHYyLm4pXG4gIG4ucy5jb25uZWN0KHYzLm4pXG4gIG4ucy5jb25uZWN0KHY0Lm4pXG4gIFxuICBmLnR5cGUgPSBcImxvd3Bhc3NcIlxuICBmLlEudmFsdWUgPSAxXG4gIGYuZnJlcXVlbmN5LnZhbHVlID0gODAwXG4gIHYxLm4uY29ubmVjdChmKVxuICB2Mi5uLmNvbm5lY3QoZilcbiAgdjMubi5jb25uZWN0KGYpXG4gIHY0Lm4uY29ubmVjdChmKVxuICBnLmdhaW4udmFsdWUgPSA1XG4gIGYuY29ubmVjdChnKVxuICBnLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKVxuICBcbiAgXG4gIFxuICBmdW5jdGlvbiBmaXJlU291bmQoKXtcbiAgICBcbiAgIGlmKCFzdGQpe1xuICAgICAgc3RkID0gdHJ1ZVxuICAgICAgbi5zLnN0YXJ0KDApXG4gICAgfVxuICAgIFxuICAgIFxuICAgICAgIHZzKytcbiAgICAgICAgaWYodnMgPiA0KXtcbiAgICAgICAgICB2cyA9IDFcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMSl7XG4gICAgICAgICAgdjEuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMil7XG4gICAgICAgICAgdjIuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gMyl7XG4gICAgICAgICAgdjMuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodnMgPT0gNCl7XG4gICAgICAgICAgdjQuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICB9XG5cbnZhciBvID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbm8udHlwZSA9ICdzcXVhcmUnXG52YXIgdiA9IGN0eC5jcmVhdGVHYWluKCk7XG5vLmNvbm5lY3QodilcbnYuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xudi5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lKVxudmFyIHN0ZDIgPSBmYWxzZVxuXG5mdW5jdGlvbiBqdW1wU291bmQoKXtcbiAgaWYoIXN0ZDIpe1xuICAgICAgby5zdGFydCgwKVxuICAgIHN0ZDIgPSB0cnVlXG4gIH1cbiAgby5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMjAwLCBjdHguY3VycmVudFRpbWUpXG4gIHYuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEsY3R4LmN1cnJlbnRUaW1lKVxuICB2LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxLjAsIGN0eC5jdXJyZW50VGltZSArIDAuMSk7XG4gIG8uZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjgwLCBjdHguY3VycmVudFRpbWUgKyAwLjQpO1xuICB2LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC40KTtcbiAgdi5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lICsgMC40KVxufVxuXG5mdW5jdGlvbiBoaXRTb3VuZCgpe1xuICB2YXIgb2ggPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICBvaC50eXBlID0gJ3NxdWFyZSdcbiAgdmFyIHZoID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgb2guY29ubmVjdCh2aClcbiAgdmguY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lKVxuICBvaC50eXBlID0gJ3NxdWFyZSdcbiAgb2guZnJlcXVlbmN5ID0gODgwLjY7XG4gIG9oLnN0YXJ0KDApXG4gIHZoLmdhaW4uc2V0VmFsdWVBdFRpbWUoMSxjdHguY3VycmVudFRpbWUpXG4gIG9oLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNSk7XG4gIHZoLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICB2aC5nYWluLnNldFZhbHVlQXRUaW1lKDAsY3R4LmN1cnJlbnRUaW1lICsgMC41KVxufVxuXG5cbndpbmRvd1snZmlyZVNvdW5kJ10gPSBmaXJlU291bmQ7XG53aW5kb3dbJ2p1bXBTb3VuZCddID0ganVtcFNvdW5kO1xud2luZG93WydoaXRTb3VuZCddID0gaGl0U291bmQ7XG5cblxuXG5cblxuICBcbiAgIiwiLypcbiAqIFRpbnlDYW52YXMgbW9kdWxlIChodHRwczovL2dpdGh1Yi5jb20vYml0bmVuZmVyL3RpbnktY2FudmFzKVxuICogRGV2ZWxvcGVkIGJ5IEZlbGlwZSBBbGZvbnNvIC0+IGh0dHBzOi8vdHdpdHRlci5jb20vYml0bmVuZmVyL1xuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICAgICAgICAgICAgICAgICAgIFZlcnNpb24gMiwgRGVjZW1iZXIgMjAwNFxuICogXG4gKiAgQ29weXJpZ2h0IChDKSAyMDA0IFNhbSBIb2NldmFyIDxzYW1AaG9jZXZhci5uZXQ+XG4gKiBcbiAqICBFdmVyeW9uZSBpcyBwZXJtaXR0ZWQgdG8gY29weSBhbmQgZGlzdHJpYnV0ZSB2ZXJiYXRpbSBvciBtb2RpZmllZFxuICogIGNvcGllcyBvZiB0aGlzIGxpY2Vuc2UgZG9jdW1lbnQsIGFuZCBjaGFuZ2luZyBpdCBpcyBhbGxvd2VkIGFzIGxvbmdcbiAqICBhcyB0aGUgbmFtZSBpcyBjaGFuZ2VkLlxuICogXG4gKiAgICAgICAgICAgICBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPIFBVQkxJQyBMSUNFTlNFXG4gKiAgICBURVJNUyBBTkQgQ09ORElUSU9OUyBGT1IgQ09QWUlORywgRElTVFJJQlVUSU9OIEFORCBNT0RJRklDQVRJT05cbiAqIFxuICogICAwLiBZb3UganVzdCBETyBXSEFUIFRIRSBGVUNLIFlPVSBXQU5UIFRPLlxuICogXG4gKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogXG4gKi9cblxuZnVuY3Rpb24gQ29tcGlsZVNoYWRlcihnbCwgc291cmNlLCB0eXBlKSB7XG4gICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICByZXR1cm4gc2hhZGVyO1xufVxuXG5mdW5jdGlvbiBDcmVhdGVTaGFkZXJQcm9ncmFtKGdsLCB2c1NvdXJjZSwgZnNTb3VyY2UpIHtcbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKSxcbiAgICAgICAgdlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIHZzU291cmNlLCAzNTYzMyksXG4gICAgICAgIGZTaGFkZXIgPSBDb21waWxlU2hhZGVyKGdsLCBmc1NvdXJjZSwgMzU2MzIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZlNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgcmV0dXJuIHByb2dyYW07XG59XG5cbmZ1bmN0aW9uIENyZWF0ZUJ1ZmZlcihnbCwgYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpIHtcbiAgICB2YXIgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihidWZmZXJUeXBlLCBidWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoYnVmZmVyVHlwZSwgc2l6ZSwgdXNhZ2UpO1xuICAgIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVRleHR1cmUoZ2wsIGltYWdlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoMzU1MywgdGV4dHVyZSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MiwgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDMsIDMzMDcxKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQwLCA5NzI4KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQxLCA5NzI4KTtcbiAgICBnbC50ZXhJbWFnZTJEKDM1NTMsIDAsIDY0MDgsIDY0MDgsIDUxMjEsIGltYWdlKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCBudWxsKTtcbiAgICB0ZXh0dXJlLndpZHRoID0gd2lkdGg7XG4gICAgdGV4dHVyZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgcmV0dXJuIHRleHR1cmU7XG59XG53aW5kb3dbJ1RDU2hkJ10gPSBDb21waWxlU2hhZGVyO1xud2luZG93WydUQ1ByZyddID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbTtcbndpbmRvd1snVENCdWYnXSA9IENyZWF0ZUJ1ZmZlcjtcbndpbmRvd1snVENUZXgnXSA9IENyZWF0ZVRleHR1cmU7XG5cbmZ1bmN0aW9uIFRpbnlDYW52YXMoY2FudmFzKSB7XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyksXG4gICAgICAgIFZFUlRFWF9TSVpFID0gKDQgKiAyKSArICg0ICogMikgKyAoNCksXG4gICAgICAgIE1BWF9CQVRDSCA9IDEwOTIyLCAvLyBmbG9vcigoMiBeIDE2KSAvIDYpXG4gICAgICAgIE1BWF9TVEFDSyA9IDEwMCxcbiAgICAgICAgTUFUX1NJWkUgPSA2LFxuICAgICAgICBWRVJUSUNFU19QRVJfUVVBRCA9IDYsXG4gICAgICAgIE1BVF9TVEFDS19TSVpFID0gTUFYX1NUQUNLICogTUFUX1NJWkUsXG4gICAgICAgIFZFUlRFWF9EQVRBX1NJWkUgPSBWRVJURVhfU0laRSAqIE1BWF9CQVRDSCAqIDQsXG4gICAgICAgIElOREVYX0RBVEFfU0laRSA9IE1BWF9CQVRDSCAqICgyICogVkVSVElDRVNfUEVSX1FVQUQpLFxuICAgICAgICB3aWR0aCA9IGNhbnZhcy53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmhlaWdodCxcbiAgICAgICAgc2hhZGVyID0gQ3JlYXRlU2hhZGVyUHJvZ3JhbShcbiAgICAgICAgICAgIGdsLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IFBvc2l0aW9uIGFuZFxuICAgICAgICAgICAgICAgIC8vIElOIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAnYXR0cmlidXRlIHZlYzIgYSwgYjsnLFxuICAgICAgICAgICAgICAgIC8vIElOIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjNCBjOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgVmlldyBNYXRyaXhcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBtYXQ0IG07JyxcbiAgICAgICAgICAgICAgICAndW5pZm9ybSB2ZWMyIHI7JyxcbiAgICAgICAgICAgICAgICAndm9pZCBtYWluKCl7JyxcbiAgICAgICAgICAgICAgICAnZ2xfUG9zaXRpb249bSp2ZWM0KGEsMS4wLDEuMCk7JyxcbiAgICAgICAgICAgICAgICAnZD1iOycsXG4gICAgICAgICAgICAgICAgJ2U9YzsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKSwgW1xuICAgICAgICAgICAgICAgICdwcmVjaXNpb24gbG93cCBmbG9hdDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBUZXh0dXJlIENvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjMiBkOycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFZlcnRleCBDb2xvclxuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzQgZTsnLFxuICAgICAgICAgICAgICAgIC8vIENPTlNUIFNpbmdsZSBTYW1wbGVyMkRcbiAgICAgICAgICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgZjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9GcmFnQ29sb3I9dGV4dHVyZTJEKGYsZCkqZTsnLFxuICAgICAgICAgICAgICAgICd9J1xuICAgICAgICAgICAgXS5qb2luKCdcXG4nKVxuICAgICAgICApLFxuICAgICAgICBnbEJ1ZmZlclN1YkRhdGEgPSBnbC5idWZmZXJTdWJEYXRhLmJpbmQoZ2wpLFxuICAgICAgICBnbERyYXdFbGVtZW50cyA9IGdsLmRyYXdFbGVtZW50cy5iaW5kKGdsKSxcbiAgICAgICAgZ2xCaW5kVGV4dHVyZSA9IGdsLmJpbmRUZXh0dXJlLmJpbmQoZ2wpLFxuICAgICAgICBnbENsZWFyID0gZ2wuY2xlYXIuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXJDb2xvciA9IGdsLmNsZWFyQ29sb3IuYmluZChnbCksXG4gICAgICAgIHZlcnRleERhdGEgPSBuZXcgQXJyYXlCdWZmZXIoVkVSVEVYX0RBVEFfU0laRSksXG4gICAgICAgIHZQb3NpdGlvbkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2Q29sb3JEYXRhID0gbmV3IFVpbnQzMkFycmF5KHZlcnRleERhdGEpLFxuICAgICAgICB2SW5kZXhEYXRhID0gbmV3IFVpbnQxNkFycmF5KElOREVYX0RBVEFfU0laRSksXG4gICAgICAgIElCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjMsIHZJbmRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDQpLFxuICAgICAgICBWQk8gPSBDcmVhdGVCdWZmZXIoZ2wsIDM0OTYyLCB2ZXJ0ZXhEYXRhLmJ5dGVMZW5ndGgsIDM1MDQ4KSxcbiAgICAgICAgY291bnQgPSAwLFxuICAgICAgICBtYXQgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAxLCAwLCAwXSksXG4gICAgICAgIHN0YWNrID0gbmV3IEZsb2F0MzJBcnJheSgxMDApLFxuICAgICAgICBzdGFja3AgPSAwLFxuICAgICAgICBjb3MgPSBNYXRoLmNvcyxcbiAgICAgICAgc2luID0gTWF0aC5zaW4sXG4gICAgICAgIGN1cnJlbnRUZXh0dXJlID0gbnVsbCxcbiAgICAgICAgcmVuZGVyZXIgPSBudWxsLFxuICAgICAgICBsb2NBLCBsb2NCLCBsb2NDO1xuXG4gICAgZ2wuYmxlbmRGdW5jKDc3MCwgNzcxKTtcbiAgICBnbC5lbmFibGUoMzA0Mik7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXIpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjMsIElCTyk7XG4gICAgZm9yICh2YXIgaW5kZXhBID0gaW5kZXhCID0gMDsgaW5kZXhBIDwgTUFYX0JBVENIICogVkVSVElDRVNfUEVSX1FVQUQ7IGluZGV4QSArPSBWRVJUSUNFU19QRVJfUVVBRCwgaW5kZXhCICs9IDQpXG4gICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMF0gPSBpbmRleEIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDFdID0gaW5kZXhCICsgMSxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMl0gPSBpbmRleEIgKyAyLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAzXSA9IGluZGV4QiArIDAsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDRdID0gaW5kZXhCICsgMyxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNV0gPSBpbmRleEIgKyAxO1xuXG4gICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYzLCAwLCB2SW5kZXhEYXRhKTtcbiAgICBnbC5iaW5kQnVmZmVyKDM0OTYyLCBWQk8pO1xuICAgIGxvY0EgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdhJyk7XG4gICAgbG9jQiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2InKTtcbiAgICBsb2NDID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0EpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQSwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0IpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQiwgMiwgNTEyNiwgMCwgVkVSVEVYX1NJWkUsIDgpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY0MpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jQywgNCwgNTEyMSwgMSwgVkVSVEVYX1NJWkUsIDE2KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXIsICdtJyksIDAsXG4gICAgICAgIG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgMiAvIHdpZHRoLCAwLCAwLCAwLFxuICAgICAgICAgICAgMCwgLTIgLyBoZWlnaHQsIDAsIDAsXG4gICAgICAgICAgICAwLCAwLCAxLCAxLCAtMSwgMSwgMCwgMFxuICAgICAgICBdKVxuICAgICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSgzMzk4NCk7XG4gICAgcmVuZGVyZXIgPSB7XG4gICAgICAgICdnJzogZ2wsXG4gICAgICAgICdjJzogY2FudmFzLFxuICAgICAgICAnY29sJzogMHhGRkZGRkZGRixcbiAgICAgICAgJ2JrZyc6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XG4gICAgICAgICAgICBnbENsZWFyQ29sb3IociwgZywgYiwgMSk7XG4gICAgICAgIH0sXG4gICAgICAgICdjbHMnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbENsZWFyKDE2Mzg0KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3RyYW5zJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFs0XSA9IG1hdFswXSAqIHggKyBtYXRbMl0gKiB5ICsgbWF0WzRdO1xuICAgICAgICAgICAgbWF0WzVdID0gbWF0WzFdICogeCArIG1hdFszXSAqIHkgKyBtYXRbNV07XG4gICAgICAgIH0sXG4gICAgICAgICdzY2FsZSc6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICBtYXRbMF0gPSBtYXRbMF0gKiB4O1xuICAgICAgICAgICAgbWF0WzFdID0gbWF0WzFdICogeDtcbiAgICAgICAgICAgIG1hdFsyXSA9IG1hdFsyXSAqIHk7XG4gICAgICAgICAgICBtYXRbM10gPSBtYXRbM10gKiB5O1xuICAgICAgICB9LFxuICAgICAgICAncm90JzogZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIHZhciBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIHNyID0gc2luKHIpLFxuICAgICAgICAgICAgICAgIGNyID0gY29zKHIpO1xuXG4gICAgICAgICAgICBtYXRbMF0gPSBhICogY3IgKyBjICogc3I7XG4gICAgICAgICAgICBtYXRbMV0gPSBiICogY3IgKyBkICogc3I7XG4gICAgICAgICAgICBtYXRbMl0gPSBhICogLXNyICsgYyAqIGNyO1xuICAgICAgICAgICAgbWF0WzNdID0gYiAqIC1zciArIGQgKiBjcjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3B1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAwXSA9IG1hdFswXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDFdID0gbWF0WzFdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMl0gPSBtYXRbMl07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAzXSA9IG1hdFszXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDRdID0gbWF0WzRdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNV0gPSBtYXRbNV07XG4gICAgICAgICAgICBzdGFja3AgKz0gNjtcbiAgICAgICAgfSxcbiAgICAgICAgJ3BvcCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrcCAtPSA2O1xuICAgICAgICAgICAgbWF0WzBdID0gc3RhY2tbc3RhY2twICsgMF07XG4gICAgICAgICAgICBtYXRbMV0gPSBzdGFja1tzdGFja3AgKyAxXTtcbiAgICAgICAgICAgIG1hdFsyXSA9IHN0YWNrW3N0YWNrcCArIDJdO1xuICAgICAgICAgICAgbWF0WzNdID0gc3RhY2tbc3RhY2twICsgM107XG4gICAgICAgICAgICBtYXRbNF0gPSBzdGFja1tzdGFja3AgKyA0XTtcbiAgICAgICAgICAgIG1hdFs1XSA9IHN0YWNrW3N0YWNrcCArIDVdO1xuICAgICAgICB9LFxuICAgICAgICAnaW1nJzogZnVuY3Rpb24gKHRleHR1cmUsIHgsIHksIHcsIGgsIHUwLCB2MCwgdTEsIHYxKSB7XG4gICAgICAgICAgICB2YXIgeDAgPSB4LFxuICAgICAgICAgICAgICAgIHkwID0geSxcbiAgICAgICAgICAgICAgICB4MSA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkxID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDIgPSB4LFxuICAgICAgICAgICAgICAgIHkyID0geSArIGgsXG4gICAgICAgICAgICAgICAgeDMgPSB4ICsgdyxcbiAgICAgICAgICAgICAgICB5MyA9IHksXG4gICAgICAgICAgICAgICAgYSA9IG1hdFswXSxcbiAgICAgICAgICAgICAgICBiID0gbWF0WzFdLFxuICAgICAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgICAgICBlID0gbWF0WzRdLFxuICAgICAgICAgICAgICAgIGYgPSBtYXRbNV0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgICAgICAgICBhcmdiID0gcmVuZGVyZXJbJ2NvbCddO1xuXG4gICAgICAgICAgICBpZiAodGV4dHVyZSAhPSBjdXJyZW50VGV4dHVyZSB8fFxuICAgICAgICAgICAgICAgIGNvdW50ICsgMSA+PSBNQVhfQkFUQ0gpIHtcbiAgICAgICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZlcnRleERhdGEpO1xuICAgICAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRleHR1cmUgIT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgICAgIGdsQmluZFRleHR1cmUoMzU1MywgY3VycmVudFRleHR1cmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2Zmc2V0ID0gY291bnQgKiBWRVJURVhfU0laRTtcbiAgICAgICAgICAgIC8vIFZlcnRleCBPcmRlclxuICAgICAgICAgICAgLy8gVmVydGV4IFBvc2l0aW9uIHwgVVYgfCBBUkdCXG4gICAgICAgICAgICAvLyBWZXJ0ZXggMVxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGEgKyB5MCAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MCAqIGIgKyB5MCAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCAyXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYSArIHkxICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgxICogYiArIHkxICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MTtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDNcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBhICsgeTIgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDIgKiBiICsgeTIgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTA7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggNFxuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGEgKyB5MyAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MyAqIGIgKyB5MyAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjA7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIGlmICgrK2NvdW50ID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnZmx1c2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2UG9zaXRpb25EYXRhLnN1YmFycmF5KDAsIGNvdW50ICogVkVSVEVYX1NJWkUpKTtcbiAgICAgICAgICAgIGdsRHJhd0VsZW1lbnRzKDQsIGNvdW50ICogVkVSVElDRVNfUEVSX1FVQUQsIDUxMjMsIDApO1xuICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG59XG53aW5kb3dbJ1RDJ10gPSBUaW55Q2FudmFzOyJdLCJzb3VyY2VSb290IjoiIn0=