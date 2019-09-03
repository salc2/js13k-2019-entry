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
__webpack_require__(/*! ./lib/gunsound.js */ "./src/lib/gunsound.js");
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
                const i = index * 2;
                result[i] = tex1;
                result[i + 1] = tex2;
                if (index == urls.length - 1) {
                    setTimeout(() => {
                        resolver(result);
                    }, 400);
                }
            };
        });
    });
}
loadTextures(["soldier_run.png", "soldier_idle.png", "soldier_shooting.png", "bot.png"]).then((textures) => {
    const [rightRun, leftRun, rightIdle, leftIdle, rightShoot, leftShoot, rightBot, leftBot] = textures;
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
                p.shooting = false;
                ShootingAnim.reset();
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
    function renderFloor() {
        for (var x = 0; x < 256; x += 20) {
            canvas.img(floorTex, x, FLOOR, 20, 20, 0, 0, 1, 1);
        }
    }
    function applyGravity(b) {
        b.velocity.y = b.position.y + b.height < FLOOR ? b.velocity.y + (GRAVITY * currentDelta) : b.velocity.y;
    }
    function outsideScreen(b) {
        return b.position.x < 0 || b.position.x > width;
    }
    const FLOOR = height - 40;
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
        const p = m.player;
        canvas.cls();
        canvas.bkg(0.2, 0.2, 0.2);
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

/***/ "./src/lib/gunsound.js":
/*!*****************************!*\
  !*** ./src/lib/gunsound.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Envelope(context){
    this.node = context.createGain()
    this.node.gain.value = 0
    this.addEventToQueue = function(){
      this.node.gain.linearRampToValueAtTime(0, context.currentTime);
      this.node.gain.linearRampToValueAtTime(1, context.currentTime + 0.001);
      this.node.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.101);
      this.node.gain.linearRampToValueAtTime(0, context.currentTime + 0.500);
    }
  }
  
  function WhiteNoiseBuffer(context){
    var bufferSize = context.sampleRate;
    var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    var output = buffer.getChannelData(0);
  
    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  
    this.source = context.createBufferSource();
    this.source.buffer = buffer;
    this.source.loop = true
  };
  
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  
  var noise = new WhiteNoiseBuffer(audioCtx)
  var voice1 = new Envelope(audioCtx)
  var voice2 = new Envelope(audioCtx)
  var voice3 = new Envelope(audioCtx)
  var voice4 = new Envelope(audioCtx)
  
  noise.source.connect(voice1.node)
  noise.source.connect(voice2.node)
  noise.source.connect(voice3.node)
  noise.source.connect(voice4.node)
  
  var filter = audioCtx.createBiquadFilter()
  filter.type = "lowpass"
  filter.Q.value = 1
  filter.frequency.value = 800
  voice1.node.connect(filter)
  voice2.node.connect(filter)
  voice3.node.connect(filter)
  voice4.node.connect(filter)
  var gainMaster = audioCtx.createGain()
  gainMaster.gain.value = 5
  filter.connect(gainMaster)
  gainMaster.connect(audioCtx.destination)
  
  var voiceSelect = 0
  var started = false
  
  function fireSound(){
    
   if(!started){
      started = true
      noise.source.start(0)
    }
    
    
       voiceSelect++
        if(voiceSelect > 4){
          voiceSelect = 1
        }
        if (voiceSelect == 1){
          voice1.addEventToQueue()
        }
        if (voiceSelect == 2){
          voice2.addEventToQueue()
        }
        if (voiceSelect == 3){
          voice3.addEventToQueue()
        }
        if (voiceSelect == 4){
          voice4.addEventToQueue()
        }
  }

  window['fireSound'] = fireSound;
  
  

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Zwc21ldGVyL2Rpc3QvZnBzbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvZ3Vuc291bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi90aW55LWNhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLE9BQU87QUFDcEI7QUFDQSxh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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLElBQUk7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyQkFBMkI7QUFDMUM7QUFDQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIi8qIVxuICogRlBTTWV0ZXIgMC4zLjEgLSA5dGggTWF5IDIwMTNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXJzYWluL2Zwc21ldGVyXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG47KGZ1bmN0aW9uICh3LCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYSBuZXcgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIEVsZW1lbnQgdHlwZSBuYW1lLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fVxuXHQgKi9cblx0ZnVuY3Rpb24gbmV3RWwobmFtZSkge1xuXHRcdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFwcGx5IHRoZW1lIENTUyBwcm9wZXJ0aWVzIHRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgRE9NIGVsZW1lbnQuXG5cdCAqIEBwYXJhbSAge09iamVjdH0gIHRoZW1lICAgVGhlbWUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtFbGVtZW50fVxuXHQgKi9cblx0ZnVuY3Rpb24gYXBwbHlUaGVtZShlbGVtZW50LCB0aGVtZSkge1xuXHRcdGZvciAodmFyIG5hbWUgaW4gdGhlbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB0aGVtZVtuYW1lXTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiB0eXBlIG9mIHRoZSB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtICB7TWl4ZWR9IHZhbHVlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIHR5cGUodmFsdWUpIHtcblx0XHRpZiAodmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIFN0cmluZyh2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKSB8fCAnb2JqZWN0Jztcblx0XHR9XG5cblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGluIGFuIGFycmF5LlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNaXhlZH0gdmFsdWVcblx0ICogQHBhcmFtICB7QXJyYXl9IGFycmF5XG5cdCAqXG5cdCAqIEByZXR1cm4ge0ludGVnZXJ9IEFycmF5IGluZGV4IG9yIC0xIHdoZW4gbm90IGZvdW5kLlxuXHQgKi9cblx0ZnVuY3Rpb24gaW5BcnJheSh2YWx1ZSwgYXJyYXkpIHtcblx0XHRpZiAodHlwZShhcnJheSkgIT09ICdhcnJheScpIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0aWYgKGFycmF5LmluZGV4T2YpIHtcblx0XHRcdHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcblx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQb29yIG1hbidzIGRlZXAgb2JqZWN0IGV4dGVuZC5cblx0ICpcblx0ICogRXhhbXBsZTpcblx0ICogICBleHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblx0ICpcblx0ICogQHJldHVybiB7Vm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGV4dGVuZCgpIHtcblx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnc1sxXSkge1xuXHRcdFx0aWYgKGFyZ3NbMV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGUoYXJnc1sxXVtrZXldKSkge1xuXHRcdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0XHRhcmdzWzBdW2tleV0gPSBleHRlbmQoe30sIGFyZ3NbMF1ba2V5XSwgYXJnc1sxXVtrZXldKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnYXJyYXknOlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gYXJnc1sxXVtrZXldLnNsaWNlKDApO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0YXJnc1swXVtrZXldID0gYXJnc1sxXVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBhcmdzLmxlbmd0aCA+IDIgP1xuXHRcdFx0ZXh0ZW5kLmFwcGx5KG51bGwsIFthcmdzWzBdXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMikpKSA6XG5cdFx0XHRhcmdzWzBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnQgSFNMIGNvbG9yIHRvIEhFWCBzdHJpbmcuXG5cdCAqXG5cdCAqIEBwYXJhbSAge0FycmF5fSBoc2wgQXJyYXkgd2l0aCBbaHVlLCBzYXR1cmF0aW9uLCBsaWdodG5lc3NdLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgd2l0aCBbcmVkLCBncmVlbiwgYmx1ZV0uXG5cdCAqL1xuXHRmdW5jdGlvbiBoc2xUb0hleChoLCBzLCBsKSB7XG5cdFx0dmFyIHIsIGcsIGI7XG5cdFx0dmFyIHYsIG1pbiwgc3YsIHNleHRhbnQsIGZyYWN0LCB2c2Y7XG5cblx0XHRpZiAobCA8PSAwLjUpIHtcblx0XHRcdHYgPSBsICogKDEgKyBzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0diA9IGwgKyBzIC0gbCAqIHM7XG5cdFx0fVxuXG5cdFx0aWYgKHYgPT09IDApIHtcblx0XHRcdHJldHVybiAnIzAwMCc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1pbiA9IDIgKiBsIC0gdjtcblx0XHRcdHN2ID0gKHYgLSBtaW4pIC8gdjtcblx0XHRcdGggPSA2ICogaDtcblx0XHRcdHNleHRhbnQgPSBNYXRoLmZsb29yKGgpO1xuXHRcdFx0ZnJhY3QgPSBoIC0gc2V4dGFudDtcblx0XHRcdHZzZiA9IHYgKiBzdiAqIGZyYWN0O1xuXHRcdFx0aWYgKHNleHRhbnQgPT09IDAgfHwgc2V4dGFudCA9PT0gNikge1xuXHRcdFx0XHRyID0gdjtcblx0XHRcdFx0ZyA9IG1pbiArIHZzZjtcblx0XHRcdFx0YiA9IG1pbjtcblx0XHRcdH0gZWxzZSBpZiAoc2V4dGFudCA9PT0gMSkge1xuXHRcdFx0XHRyID0gdiAtIHZzZjtcblx0XHRcdFx0ZyA9IHY7XG5cdFx0XHRcdGIgPSBtaW47XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDIpIHtcblx0XHRcdFx0ciA9IG1pbjtcblx0XHRcdFx0ZyA9IHY7XG5cdFx0XHRcdGIgPSBtaW4gKyB2c2Y7XG5cdFx0XHR9IGVsc2UgaWYgKHNleHRhbnQgPT09IDMpIHtcblx0XHRcdFx0ciA9IG1pbjtcblx0XHRcdFx0ZyA9IHYgLSB2c2Y7XG5cdFx0XHRcdGIgPSB2O1xuXHRcdFx0fSBlbHNlIGlmIChzZXh0YW50ID09PSA0KSB7XG5cdFx0XHRcdHIgPSBtaW4gKyB2c2Y7XG5cdFx0XHRcdGcgPSBtaW47XG5cdFx0XHRcdGIgPSB2O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ciA9IHY7XG5cdFx0XHRcdGcgPSBtaW47XG5cdFx0XHRcdGIgPSB2IC0gdnNmO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICcjJyArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSGVscGVyIGZ1bmN0aW9uIGZvciBoc2xUb0hleC5cblx0ICovXG5cdGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcblx0XHRjID0gTWF0aC5yb3VuZChjICogMjU1KS50b1N0cmluZygxNik7XG5cdFx0cmV0dXJuIGMubGVuZ3RoID09PSAxID8gJzAnICsgYyA6IGM7XG5cdH1cblxuXHQvKipcblx0ICogTWFuYWdlIGVsZW1lbnQgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtOb2RlfSAgICAgZWxlbWVudFxuXHQgKiBAcGFyYW0gIHtFdmVudH0gICAgZXZlbnROYW1lXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge0Jvb2x9ICAgICByZW1vdmVcblx0ICpcblx0ICogQHJldHVybiB7Vm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcmVtb3ZlKSB7XG5cdFx0aWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdFx0ZWxlbWVudFtyZW1vdmUgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnYWRkRXZlbnRMaXN0ZW5lciddKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuXHRcdH0gZWxzZSBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuXHRcdFx0ZWxlbWVudFtyZW1vdmUgPyAnZGV0YWNoRXZlbnQnIDogJ2F0dGFjaEV2ZW50J10oJ29uJyArIGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUHJlZmVycmVkIHRpbWluZyBmdW50aW9uXG5cdHZhciBnZXRUaW1lO1xuXHQoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBwZXJmID0gdy5wZXJmb3JtYW5jZTtcblx0XHRpZiAocGVyZiAmJiAocGVyZi5ub3cgfHwgcGVyZi53ZWJraXROb3cpKSB7XG5cdFx0XHR2YXIgcGVyZk5vdyA9IHBlcmYubm93ID8gJ25vdycgOiAnd2Via2l0Tm93Jztcblx0XHRcdGdldFRpbWUgPSBwZXJmW3BlcmZOb3ddLmJpbmQocGVyZik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdldFRpbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiArbmV3IERhdGUoKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KCkpO1xuXG5cdC8vIExvY2FsIFdpbmRvd0FuaW1hdGlvblRpbWluZyBpbnRlcmZhY2UgcG9seWZpbGxcblx0dmFyIGNBRiA9IHcuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgdy5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cdHZhciByQUYgPSB3LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcblx0KGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdmVuZG9ycyA9IFsnbW96JywgJ3dlYmtpdCcsICdvJ107XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblxuXHRcdC8vIEZvciBhIG1vcmUgYWNjdXJhdGUgV2luZG93QW5pbWF0aW9uVGltaW5nIGludGVyZmFjZSBpbXBsZW1lbnRhdGlvbiwgZGl0Y2ggdGhlIG5hdGl2ZVxuXHRcdC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSB3aGVuIGNhbmNlbEFuaW1hdGlvbkZyYW1lIGlzIG5vdCBwcmVzZW50IChvbGRlciB2ZXJzaW9ucyBvZiBGaXJlZm94KVxuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gdmVuZG9ycy5sZW5ndGg7IGkgPCBsICYmICFjQUY7ICsraSkge1xuXHRcdFx0Y0FGID0gd1t2ZW5kb3JzW2ldKydDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8IHdbdmVuZG9yc1tpXSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG5cdFx0XHRyQUYgPSBjQUYgJiYgd1t2ZW5kb3JzW2ldKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcblx0XHR9XG5cblx0XHRpZiAoIWNBRikge1xuXHRcdFx0ckFGID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBjdXJyVGltZSA9IGdldFRpbWUoKTtcblx0XHRcdFx0dmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG5cdFx0XHRcdGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuXHRcdFx0XHRyZXR1cm4gdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTsgfSwgdGltZVRvQ2FsbCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRjQUYgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGlkKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KCkpO1xuXG5cdC8vIFByb3BlcnR5IG5hbWUgZm9yIGFzc2lnbmluZyBlbGVtZW50IHRleHQgY29udGVudFxuXHR2YXIgdGV4dFByb3AgPSB0eXBlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnRleHRDb250ZW50KSA9PT0gJ3N0cmluZycgPyAndGV4dENvbnRlbnQnIDogJ2lubmVyVGV4dCc7XG5cblx0LyoqXG5cdCAqIEZQU01ldGVyIGNsYXNzLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGFuY2hvciAgRWxlbWVudCB0byBhcHBlbmQgdGhlIG1ldGVyIHRvLiBEZWZhdWx0IGlzIGRvY3VtZW50LmJvZHkuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSAgb3B0aW9ucyBPYmplY3Qgd2l0aCBvcHRpb25zLlxuXHQgKi9cblx0ZnVuY3Rpb24gRlBTTWV0ZXIoYW5jaG9yLCBvcHRpb25zKSB7XG5cdFx0Ly8gT3B0aW9uYWwgYXJndW1lbnRzXG5cdFx0aWYgKHR5cGUoYW5jaG9yKSA9PT0gJ29iamVjdCcgJiYgYW5jaG9yLm5vZGVUeXBlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdG9wdGlvbnMgPSBhbmNob3I7XG5cdFx0XHRhbmNob3IgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH1cblx0XHRpZiAoIWFuY2hvcikge1xuXHRcdFx0YW5jaG9yID0gZG9jdW1lbnQuYm9keTtcblx0XHR9XG5cblx0XHQvLyBQcml2YXRlIHByb3BlcnRpZXNcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyIG8gPSBleHRlbmQoe30sIEZQU01ldGVyLmRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcblxuXHRcdHZhciBlbCA9IHt9O1xuXHRcdHZhciBjb2xzID0gW107XG5cdFx0dmFyIHRoZW1lLCBoZWF0bWFwcztcblx0XHR2YXIgaGVhdERlcHRoID0gMTAwO1xuXHRcdHZhciBoZWF0aW5nID0gW107XG5cblx0XHR2YXIgdGhpc0ZyYW1lVGltZSA9IDA7XG5cdFx0dmFyIGZyYW1lVGltZSA9IG8udGhyZXNob2xkO1xuXHRcdHZhciBmcmFtZVN0YXJ0ID0gMDtcblx0XHR2YXIgbGFzdExvb3AgPSBnZXRUaW1lKCkgLSBmcmFtZVRpbWU7XG5cdFx0dmFyIHRpbWU7XG5cblx0XHR2YXIgZnBzSGlzdG9yeSA9IFtdO1xuXHRcdHZhciBkdXJhdGlvbkhpc3RvcnkgPSBbXTtcblxuXHRcdHZhciBmcmFtZUlELCByZW5kZXJJRDtcblx0XHR2YXIgc2hvd0ZwcyA9IG8uc2hvdyA9PT0gJ2Zwcyc7XG5cdFx0dmFyIGdyYXBoSGVpZ2h0LCBjb3VudCwgaSwgajtcblxuXHRcdC8vIEV4cG9zZWQgcHJvcGVydGllc1xuXHRcdHNlbGYub3B0aW9ucyA9IG87XG5cdFx0c2VsZi5mcHMgPSAwO1xuXHRcdHNlbGYuZHVyYXRpb24gPSAwO1xuXHRcdHNlbGYuaXNQYXVzZWQgPSAwO1xuXG5cdFx0LyoqXG5cdFx0ICogVGljayBzdGFydCBmb3IgbWVhc3VyaW5nIHRoZSBhY3R1YWwgcmVuZGVyaW5nIGR1cmF0aW9uLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLnRpY2tTdGFydCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZyYW1lU3RhcnQgPSBnZXRUaW1lKCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEZQUyB0aWNrLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRzZWxmLnRpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aW1lID0gZ2V0VGltZSgpO1xuXHRcdFx0dGhpc0ZyYW1lVGltZSA9IHRpbWUgLSBsYXN0TG9vcDtcblx0XHRcdGZyYW1lVGltZSArPSAodGhpc0ZyYW1lVGltZSAtIGZyYW1lVGltZSkgLyBvLnNtb290aGluZztcblx0XHRcdHNlbGYuZnBzID0gMTAwMCAvIGZyYW1lVGltZTtcblx0XHRcdHNlbGYuZHVyYXRpb24gPSBmcmFtZVN0YXJ0IDwgbGFzdExvb3AgPyBmcmFtZVRpbWUgOiB0aW1lIC0gZnJhbWVTdGFydDtcblx0XHRcdGxhc3RMb29wID0gdGltZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUGF1c2UgZGlzcGxheSByZW5kZXJpbmcuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoZnJhbWVJRCkge1xuXHRcdFx0XHRzZWxmLmlzUGF1c2VkID0gMTtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KGZyYW1lSUQpO1xuXHRcdFx0XHRjQUYoZnJhbWVJRCk7XG5cdFx0XHRcdGNBRihyZW5kZXJJRCk7XG5cdFx0XHRcdGZyYW1lSUQgPSByZW5kZXJJRCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVzdW1lIGRpc3BsYXkgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICghZnJhbWVJRCkge1xuXHRcdFx0XHRzZWxmLmlzUGF1c2VkID0gMDtcblx0XHRcdFx0cmVxdWVzdFJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFVwZGF0ZSBvcHRpb25zLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgIE9wdGlvbiBuYW1lLlxuXHRcdCAqIEBwYXJhbSB7TWl4ZWR9ICB2YWx1ZSBOZXcgdmFsdWUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYuc2V0ID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRvW25hbWVdID0gdmFsdWU7XG5cdFx0XHRzaG93RnBzID0gby5zaG93ID09PSAnZnBzJztcblxuXHRcdFx0Ly8gUmVidWlsZCBvciByZXBvc2l0aW9uIGVsZW1lbnRzIHdoZW4gc3BlY2lmaWMgb3B0aW9uIGhhcyBiZWVuIHVwZGF0ZWRcblx0XHRcdGlmIChpbkFycmF5KG5hbWUsIHJlYnVpbGRlcnMpICE9PSAtMSkge1xuXHRcdFx0XHRjcmVhdGVNZXRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGluQXJyYXkobmFtZSwgcmVwb3NpdGlvbmVycykgIT09IC0xKSB7XG5cdFx0XHRcdHBvc2l0aW9uTWV0ZXIoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGFuZ2UgbWV0ZXIgaW50byByZW5kZXJpbmcgZHVyYXRpb24gbW9kZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5zaG93RHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsICdtcycpO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZSBtZXRlciBpbnRvIEZQUyBtb2RlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3dGcHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnNldCgnc2hvdycsICdmcHMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBUb2dnbGVzIGJldHdlZW4gc2hvdzogJ2ZwcycgYW5kIHNob3c6ICdkdXJhdGlvbicuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IEZQU01ldGVyIGluc3RhbmNlLlxuXHRcdCAqL1xuXHRcdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5zZXQoJ3Nob3cnLCBzaG93RnBzID8gJ21zJyA6ICdmcHMnKTtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBIaWRlIHRoZSBGUFNNZXRlci4gQWxzbyBwYXVzZXMgdGhlIHJlbmRlcmluZy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge09iamVjdH0gRlBTTWV0ZXIgaW5zdGFuY2UuXG5cdFx0ICovXG5cdFx0c2VsZi5oaWRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0c2VsZi5wYXVzZSgpO1xuXHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2hvdyB0aGUgRlBTTWV0ZXIuIEFsc28gcmVzdW1lcyB0aGUgcmVuZGVyaW5nLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKi9cblx0XHRzZWxmLnNob3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZWxmLnJlc3VtZSgpO1xuXHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoZWNrIHRoZSBjdXJyZW50IEZQUyBhbmQgc2F2ZSBpdCBpbiBoaXN0b3J5LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBoaXN0b3J5VGljaygpIHtcblx0XHRcdGZvciAoaSA9IG8uaGlzdG9yeTsgaS0tOykge1xuXHRcdFx0XHRmcHNIaXN0b3J5W2ldID0gaSA9PT0gMCA/IHNlbGYuZnBzIDogZnBzSGlzdG9yeVtpLTFdO1xuXHRcdFx0XHRkdXJhdGlvbkhpc3RvcnlbaV0gPSBpID09PSAwID8gc2VsZi5kdXJhdGlvbiA6IGR1cmF0aW9uSGlzdG9yeVtpLTFdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJldHVybnMgaGVhdCBoZXggY29sb3IgYmFzZWQgb24gdmFsdWVzIHBhc3NlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IGhlYXRtYXBcblx0XHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSB2YWx1ZVxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IG1pblxuXHRcdCAqIEBwYXJhbSAge0ludGVnZXJ9IG1heFxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SW50ZWdlcn1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBnZXRIZWF0KGhlYXRtYXAsIHZhbHVlLCBtaW4sIG1heCkge1xuXHRcdFx0cmV0dXJuIGhlYXRtYXBzWzB8aGVhdG1hcF1bTWF0aC5yb3VuZChNYXRoLm1pbigodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbikgKiBoZWF0RGVwdGgsIGhlYXREZXB0aCkpXTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBVcGRhdGUgY291bnRlciBudW1iZXIgYW5kIGxlZ2VuZC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQ291bnRlcigpIHtcblx0XHRcdC8vIFVwZGF0ZSBsZWdlbmQgb25seSB3aGVuIGNoYW5nZWRcblx0XHRcdGlmIChlbC5sZWdlbmQuZnBzICE9PSBzaG93RnBzKSB7XG5cdFx0XHRcdGVsLmxlZ2VuZC5mcHMgPSBzaG93RnBzO1xuXHRcdFx0XHRlbC5sZWdlbmRbdGV4dFByb3BdID0gc2hvd0ZwcyA/ICdGUFMnIDogJ21zJztcblx0XHRcdH1cblx0XHRcdC8vIFVwZGF0ZSBjb3VudGVyIHdpdGggYSBuaWNlbHkgZm9ybWF0ZWQgJiByZWFkYWJsZSBudW1iZXJcblx0XHRcdGNvdW50ID0gc2hvd0ZwcyA/IHNlbGYuZnBzIDogc2VsZi5kdXJhdGlvbjtcblx0XHRcdGVsLmNvdW50W3RleHRQcm9wXSA9IGNvdW50ID4gOTk5ID8gJzk5OSsnIDogY291bnQudG9GaXhlZChjb3VudCA+IDk5ID8gMCA6IG8uZGVjaW1hbHMpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFJlbmRlciBjdXJyZW50IEZQUyBzdGF0ZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dGltZSA9IGdldFRpbWUoKTtcblx0XHRcdC8vIElmIHJlbmRlcmVyIHN0b3BwZWQgcmVwb3J0aW5nLCBkbyBhIHNpbXVsYXRlZCBkcm9wIHRvIDAgZnBzXG5cdFx0XHRpZiAobGFzdExvb3AgPCB0aW1lIC0gby50aHJlc2hvbGQpIHtcblx0XHRcdFx0c2VsZi5mcHMgLT0gc2VsZi5mcHMgLyBNYXRoLm1heCgxLCBvLnNtb290aGluZyAqIDYwIC8gby5pbnRlcnZhbCk7XG5cdFx0XHRcdHNlbGYuZHVyYXRpb24gPSAxMDAwIC8gc2VsZi5mcHM7XG5cdFx0XHR9XG5cblx0XHRcdGhpc3RvcnlUaWNrKCk7XG5cdFx0XHR1cGRhdGVDb3VudGVyKCk7XG5cblx0XHRcdC8vIEFwcGx5IGhlYXQgdG8gZWxlbWVudHNcblx0XHRcdGlmIChvLmhlYXQpIHtcblx0XHRcdFx0aWYgKGhlYXRpbmcubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Zm9yIChpID0gaGVhdGluZy5sZW5ndGg7IGktLTspIHtcblx0XHRcdFx0XHRcdGhlYXRpbmdbaV0uZWwuc3R5bGVbdGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0T25dID0gc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWVbaGVhdGluZ1tpXS5uYW1lXS5oZWF0bWFwLCBzZWxmLmZwcywgMCwgby5tYXhGcHMpIDpcblx0XHRcdFx0XHRcdFx0Z2V0SGVhdCh0aGVtZVtoZWF0aW5nW2ldLm5hbWVdLmhlYXRtYXAsIHNlbGYuZHVyYXRpb24sIG8udGhyZXNob2xkLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZWwuZ3JhcGggJiYgdGhlbWUuY29sdW1uLmhlYXRPbikge1xuXHRcdFx0XHRcdGZvciAoaSA9IGNvbHMubGVuZ3RoOyBpLS07KSB7XG5cdFx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlW3RoZW1lLmNvbHVtbi5oZWF0T25dID0gc2hvd0ZwcyA/XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWUuY29sdW1uLmhlYXRtYXAsIGZwc0hpc3RvcnlbaV0sIDAsIG8ubWF4RnBzKSA6XG5cdFx0XHRcdFx0XHRcdGdldEhlYXQodGhlbWUuY29sdW1uLmhlYXRtYXAsIGR1cmF0aW9uSGlzdG9yeVtpXSwgby50aHJlc2hvbGQsIDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgZ3JhcGggY29sdW1ucyBoZWlnaHRcblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgby5oaXN0b3J5OyBqKyspIHtcblx0XHRcdFx0XHRjb2xzW2pdLnN0eWxlLmhlaWdodCA9IChzaG93RnBzID9cblx0XHRcdFx0XHRcdChmcHNIaXN0b3J5W2pdID8gTWF0aC5yb3VuZChncmFwaEhlaWdodCAvIG8ubWF4RnBzICogTWF0aC5taW4oZnBzSGlzdG9yeVtqXSwgby5tYXhGcHMpKSA6IDApIDpcblx0XHRcdFx0XHRcdChkdXJhdGlvbkhpc3Rvcnlbal0gPyBNYXRoLnJvdW5kKGdyYXBoSGVpZ2h0IC8gby50aHJlc2hvbGQgKiBNYXRoLm1pbihkdXJhdGlvbkhpc3Rvcnlbal0sIG8udGhyZXNob2xkKSkgOiAwKVxuXHRcdFx0XHRcdCkgKyAncHgnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUmVxdWVzdCByZW5kZXJpbmcgbG9vcC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0ludH0gQW5pbWF0aW9uIGZyYW1lIGluZGV4LlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHJlcXVlc3RSZW5kZXIoKSB7XG5cdFx0XHRpZiAoby5pbnRlcnZhbCA8IDIwKSB7XG5cdFx0XHRcdGZyYW1lSUQgPSByQUYocmVxdWVzdFJlbmRlcik7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnJhbWVJRCA9IHNldFRpbWVvdXQocmVxdWVzdFJlbmRlciwgby5pbnRlcnZhbCk7XG5cdFx0XHRcdHJlbmRlcklEID0gckFGKHJlbmRlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogTWV0ZXIgZXZlbnRzIGhhbmRsZXIuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtWb2lkfVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGV2ZW50SGFuZGxlcihldmVudCkge1xuXHRcdFx0ZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG5cdFx0XHRpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdFx0XHRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0c2VsZi50b2dnbGUoKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBEZXN0cm95cyB0aGUgY3VycmVudCBGUFNNZXRlciBpbnN0YW5jZS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0c2VsZi5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU3RvcCByZW5kZXJpbmdcblx0XHRcdHNlbGYucGF1c2UoKTtcblx0XHRcdC8vIFJlbW92ZSBlbGVtZW50c1xuXHRcdFx0cmVtb3ZlTWV0ZXIoKTtcblx0XHRcdC8vIFN0b3AgbGlzdGVuaW5nXG5cdFx0XHRzZWxmLnRpY2sgPSBzZWxmLnRpY2tTdGFydCA9IGZ1bmN0aW9uICgpIHt9O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmUgbWV0ZXIgZWxlbWVudC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1ZvaWR9XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlTWV0ZXIoKSB7XG5cdFx0XHQvLyBVbmJpbmQgbGlzdGVuZXJzXG5cdFx0XHRpZiAoby50b2dnbGVPbikge1xuXHRcdFx0XHRsaXN0ZW5lcihlbC5jb250YWluZXIsIG8udG9nZ2xlT24sIGV2ZW50SGFuZGxlciwgMSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBEZXRhY2ggZWxlbWVudFxuXHRcdFx0YW5jaG9yLnJlbW92ZUNoaWxkKGVsLmNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2V0cyB0aGUgdGhlbWUsIGFuZCBnZW5lcmF0ZXMgaGVhdG1hcHMgd2hlbiBuZWVkZWQuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gc2V0VGhlbWUoKSB7XG5cdFx0XHR0aGVtZSA9IEZQU01ldGVyLnRoZW1lW28udGhlbWVdO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBoZWF0bWFwc1xuXHRcdFx0aGVhdG1hcHMgPSB0aGVtZS5jb21waWxlZEhlYXRtYXBzIHx8IFtdO1xuXHRcdFx0aWYgKCFoZWF0bWFwcy5sZW5ndGggJiYgdGhlbWUuaGVhdG1hcHMubGVuZ3RoKSB7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCB0aGVtZS5oZWF0bWFwcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGhlYXRtYXBzW2pdID0gW107XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSBoZWF0RGVwdGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aGVhdG1hcHNbal1baV0gPSBoc2xUb0hleCgwLjMzIC8gaGVhdERlcHRoICogaSwgdGhlbWUuaGVhdG1hcHNbal0uc2F0dXJhdGlvbiwgdGhlbWUuaGVhdG1hcHNbal0ubGlnaHRuZXNzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhlbWUuY29tcGlsZWRIZWF0bWFwcyA9IGhlYXRtYXBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENyZWF0ZXMgYW5kIGF0dGFjaGVzIHRoZSBtZXRlciBlbGVtZW50LlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBjcmVhdGVNZXRlcigpIHtcblx0XHRcdC8vIFJlbW92ZSBvbGQgbWV0ZXIgaWYgcHJlc2VudFxuXHRcdFx0aWYgKGVsLmNvbnRhaW5lcikge1xuXHRcdFx0XHRyZW1vdmVNZXRlcigpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgdGhlbWVcblx0XHRcdHNldFRoZW1lKCk7XG5cblx0XHRcdC8vIENyZWF0ZSBlbGVtZW50c1xuXHRcdFx0ZWwuY29udGFpbmVyID0gYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvbnRhaW5lcik7XG5cdFx0XHRlbC5jb3VudCA9IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUuY291bnQpKTtcblx0XHRcdGVsLmxlZ2VuZCA9IGVsLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhcHBseVRoZW1lKG5ld0VsKCdkaXYnKSwgdGhlbWUubGVnZW5kKSk7XG5cdFx0XHRlbC5ncmFwaCA9IG8uZ3JhcGggPyBlbC5jb250YWluZXIuYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmdyYXBoKSkgOiAwO1xuXG5cdFx0XHQvLyBBZGQgZWxlbWVudHMgdG8gaGVhdGluZyBhcnJheVxuXHRcdFx0aGVhdGluZy5sZW5ndGggPSAwO1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGVsKSB7XG5cdFx0XHRcdGlmIChlbFtrZXldICYmIHRoZW1lW2tleV0uaGVhdE9uKSB7XG5cdFx0XHRcdFx0aGVhdGluZy5wdXNoKHtcblx0XHRcdFx0XHRcdG5hbWU6IGtleSxcblx0XHRcdFx0XHRcdGVsOiBlbFtrZXldXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gR3JhcGhcblx0XHRcdGNvbHMubGVuZ3RoID0gMDtcblx0XHRcdGlmIChlbC5ncmFwaCkge1xuXHRcdFx0XHQvLyBDcmVhdGUgZ3JhcGhcblx0XHRcdFx0ZWwuZ3JhcGguc3R5bGUud2lkdGggPSAoby5oaXN0b3J5ICogdGhlbWUuY29sdW1uLndpZHRoICsgKG8uaGlzdG9yeSAtIDEpICogdGhlbWUuY29sdW1uLnNwYWNpbmcpICsgJ3B4JztcblxuXHRcdFx0XHQvLyBBZGQgY29sdW1uc1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgby5oaXN0b3J5OyBpKyspIHtcblx0XHRcdFx0XHRjb2xzW2ldID0gZWwuZ3JhcGguYXBwZW5kQ2hpbGQoYXBwbHlUaGVtZShuZXdFbCgnZGl2JyksIHRoZW1lLmNvbHVtbikpO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0XHRcdGNvbHNbaV0uc3R5bGUuYm90dG9tID0gMDtcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLnJpZ2h0ID0gKGkgKiB0aGVtZS5jb2x1bW4ud2lkdGggKyBpICogdGhlbWUuY29sdW1uLnNwYWNpbmcpICsgJ3B4Jztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLndpZHRoID0gdGhlbWUuY29sdW1uLndpZHRoICsgJ3B4Jztcblx0XHRcdFx0XHRjb2xzW2ldLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNldCB0aGUgaW5pdGlhbCBzdGF0ZVxuXHRcdFx0cG9zaXRpb25NZXRlcigpO1xuXHRcdFx0dXBkYXRlQ291bnRlcigpO1xuXG5cdFx0XHQvLyBBcHBlbmQgY29udGFpbmVyIHRvIGFuY2hvclxuXHRcdFx0YW5jaG9yLmFwcGVuZENoaWxkKGVsLmNvbnRhaW5lcik7XG5cblx0XHRcdC8vIFJldHJpZXZlIGdyYXBoIGhlaWdodCBhZnRlciBpdCB3YXMgYXBwZW5kZWQgdG8gRE9NXG5cdFx0XHRpZiAoZWwuZ3JhcGgpIHtcblx0XHRcdFx0Z3JhcGhIZWlnaHQgPSBlbC5ncmFwaC5jbGllbnRIZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcblx0XHRcdGlmIChvLnRvZ2dsZU9uKSB7XG5cdFx0XHRcdGlmIChvLnRvZ2dsZU9uID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0ZWwuY29udGFpbmVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0ZW5lcihlbC5jb250YWluZXIsIG8udG9nZ2xlT24sIGV2ZW50SGFuZGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogUG9zaXRpb25zIHRoZSBtZXRlciBiYXNlZCBvbiBvcHRpb25zLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Vm9pZH1cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBwb3NpdGlvbk1ldGVyKCkge1xuXHRcdFx0YXBwbHlUaGVtZShlbC5jb250YWluZXIsIG8pO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIENvbnN0cnVjdC5cblx0XHQgKi9cblx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gQ3JlYXRlIG1ldGVyIGVsZW1lbnRcblx0XHRcdGNyZWF0ZU1ldGVyKCk7XG5cdFx0XHQvLyBTdGFydCByZW5kZXJpbmdcblx0XHRcdHJlcXVlc3RSZW5kZXIoKTtcblx0XHR9KCkpO1xuXHR9XG5cblx0Ly8gRXhwb3NlIHRoZSBleHRlbmQgZnVuY3Rpb25cblx0RlBTTWV0ZXIuZXh0ZW5kID0gZXh0ZW5kO1xuXG5cdC8vIEV4cG9zZSB0aGUgRlBTTWV0ZXIgY2xhc3Ncblx0d2luZG93LkZQU01ldGVyID0gRlBTTWV0ZXI7XG5cblx0Ly8gRGVmYXVsdCBvcHRpb25zXG5cdEZQU01ldGVyLmRlZmF1bHRzID0ge1xuXHRcdGludGVydmFsOiAgMTAwLCAgICAgLy8gVXBkYXRlIGludGVydmFsIGluIG1pbGxpc2Vjb25kcy5cblx0XHRzbW9vdGhpbmc6IDEwLCAgICAgIC8vIFNwaWtlIHNtb290aGluZyBzdHJlbmd0aC4gMSBtZWFucyBubyBzbW9vdGhpbmcuXG5cdFx0c2hvdzogICAgICAnZnBzJywgICAvLyBXaGV0aGVyIHRvIHNob3cgJ2ZwcycsIG9yICdtcycgPSBmcmFtZSBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG5cdFx0dG9nZ2xlT246ICAnY2xpY2snLCAvLyBUb2dnbGUgYmV0d2VlbiBzaG93ICdmcHMnIGFuZCAnbXMnIG9uIHRoaXMgZXZlbnQuXG5cdFx0ZGVjaW1hbHM6ICAxLCAgICAgICAvLyBOdW1iZXIgb2YgZGVjaW1hbHMgaW4gRlBTIG51bWJlci4gMSA9IDU5LjksIDIgPSA1OS45NCwgLi4uXG5cdFx0bWF4RnBzOiAgICA2MCwgICAgICAvLyBNYXggZXhwZWN0ZWQgRlBTIHZhbHVlLlxuXHRcdHRocmVzaG9sZDogMTAwLCAgICAgLy8gTWluaW1hbCB0aWNrIHJlcG9ydGluZyBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMuXG5cblx0XHQvLyBNZXRlciBwb3NpdGlvblxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAvLyBNZXRlciBwb3NpdGlvbi5cblx0XHR6SW5kZXg6ICAgMTAsICAgICAgICAgLy8gTWV0ZXIgWiBpbmRleC5cblx0XHRsZWZ0OiAgICAgJzVweCcsICAgICAgLy8gTWV0ZXIgbGVmdCBvZmZzZXQuXG5cdFx0dG9wOiAgICAgICc1cHgnLCAgICAgIC8vIE1ldGVyIHRvcCBvZmZzZXQuXG5cdFx0cmlnaHQ6ICAgICdhdXRvJywgICAgIC8vIE1ldGVyIHJpZ2h0IG9mZnNldC5cblx0XHRib3R0b206ICAgJ2F1dG8nLCAgICAgLy8gTWV0ZXIgYm90dG9tIG9mZnNldC5cblx0XHRtYXJnaW46ICAgJzAgMCAwIDAnLCAgLy8gTWV0ZXIgbWFyZ2luLiBIZWxwcyB3aXRoIGNlbnRlcmluZyB0aGUgY291bnRlciB3aGVuIGxlZnQ6IDUwJTtcblxuXHRcdC8vIFRoZW1lXG5cdFx0dGhlbWU6ICdkYXJrJywgLy8gTWV0ZXIgdGhlbWUuIEJ1aWxkIGluOiAnZGFyaycsICdsaWdodCcsICd0cmFuc3BhcmVudCcsICdjb2xvcmZ1bCcuXG5cdFx0aGVhdDogIDAsICAgICAgLy8gQWxsb3cgdGhlbWVzIHRvIHVzZSBjb2xvcmluZyBieSBGUFMgaGVhdC4gMCBGUFMgPSByZWQsIG1heEZwcyA9IGdyZWVuLlxuXG5cdFx0Ly8gR3JhcGhcblx0XHRncmFwaDogICAwLCAvLyBXaGV0aGVyIHRvIHNob3cgaGlzdG9yeSBncmFwaC5cblx0XHRoaXN0b3J5OiAyMCAvLyBIb3cgbWFueSBoaXN0b3J5IHN0YXRlcyB0byBzaG93IGluIGEgZ3JhcGguXG5cdH07XG5cblx0Ly8gT3B0aW9uIG5hbWVzIHRoYXQgdHJpZ2dlciBGUFNNZXRlciByZWJ1aWxkIG9yIHJlcG9zaXRpb24gd2hlbiBtb2RpZmllZFxuXHR2YXIgcmVidWlsZGVycyA9IFtcblx0XHQndG9nZ2xlT24nLFxuXHRcdCd0aGVtZScsXG5cdFx0J2hlYXQnLFxuXHRcdCdncmFwaCcsXG5cdFx0J2hpc3RvcnknXG5cdF07XG5cdHZhciByZXBvc2l0aW9uZXJzID0gW1xuXHRcdCdwb3NpdGlvbicsXG5cdFx0J3pJbmRleCcsXG5cdFx0J2xlZnQnLFxuXHRcdCd0b3AnLFxuXHRcdCdyaWdodCcsXG5cdFx0J2JvdHRvbScsXG5cdFx0J21hcmdpbidcblx0XTtcbn0od2luZG93KSk7XG47KGZ1bmN0aW9uICh3LCBGUFNNZXRlciwgdW5kZWZpbmVkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvLyBUaGVtZXMgb2JqZWN0XG5cdEZQU01ldGVyLnRoZW1lID0ge307XG5cblx0Ly8gQmFzZSB0aGVtZSB3aXRoIGxheW91dCwgbm8gY29sb3JzXG5cdHZhciBiYXNlID0gRlBTTWV0ZXIudGhlbWUuYmFzZSA9IHtcblx0XHRoZWF0bWFwczogW10sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwYWRkaW5nOiAnNXB4Jyxcblx0XHRcdG1pbldpZHRoOiAnOTVweCcsXG5cdFx0XHRoZWlnaHQ6ICczMHB4Jyxcblx0XHRcdGxpbmVIZWlnaHQ6ICczMHB4Jyxcblx0XHRcdHRleHRBbGlnbjogJ3JpZ2h0Jyxcblx0XHRcdHRleHRTaGFkb3c6ICdub25lJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsLFxuXG5cdFx0XHQvLyBTdHlsZXNcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdFx0dG9wOiAwLFxuXHRcdFx0cmlnaHQ6IDAsXG5cdFx0XHRwYWRkaW5nOiAnNXB4IDEwcHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRmb250U2l6ZTogJzI0cHgnLFxuXHRcdFx0Zm9udEZhbWlseTogJ0NvbnNvbGFzLCBBbmRhbGUgTW9ubywgbW9ub3NwYWNlJyxcblx0XHRcdHpJbmRleDogMlxuXHRcdH0sXG5cdFx0bGVnZW5kOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRcdHRvcDogMCxcblx0XHRcdGxlZnQ6IDAsXG5cdFx0XHRwYWRkaW5nOiAnNXB4IDEwcHgnLFxuXHRcdFx0aGVpZ2h0OiAnMzBweCcsXG5cdFx0XHRmb250U2l6ZTogJzEycHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzMycHgnLFxuXHRcdFx0Zm9udEZhbWlseTogJ3NhbnMtc2VyaWYnLFxuXHRcdFx0dGV4dEFsaWduOiAnbGVmdCcsXG5cdFx0XHR6SW5kZXg6IDJcblx0XHR9LFxuXHRcdGdyYXBoOiB7XG5cdFx0XHQvLyBTZXR0aW5nc1xuXHRcdFx0aGVhdE9uOiBudWxsLFxuXHRcdFx0aGVhdG1hcDogbnVsbCxcblxuXHRcdFx0Ly8gU3R5bGVzXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdGJveFNpemluZzogJ3BhZGRpbmctYm94Jyxcblx0XHRcdE1vekJveFNpemluZzogJ3BhZGRpbmctYm94Jyxcblx0XHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdFx0ekluZGV4OiAxXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdC8vIFNldHRpbmdzXG5cdFx0XHR3aWR0aDogNCxcblx0XHRcdHNwYWNpbmc6IDEsXG5cdFx0XHRoZWF0T246IG51bGwsXG5cdFx0XHRoZWF0bWFwOiBudWxsXG5cdFx0fVxuXHR9O1xuXG5cdC8vIERhcmsgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUuZGFyayA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC44LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjhcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjMjIyJyxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHRib3JkZXI6ICcxcHggc29saWQgIzFhMWExYScsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwICMyMjInXG5cdFx0fSxcblx0XHRjb3VudDoge1xuXHRcdFx0aGVhdE9uOiAnY29sb3InXG5cdFx0fSxcblx0XHRjb2x1bW46IHtcblx0XHRcdGJhY2tncm91bmQ6ICcjM2YzZjNmJ1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTGlnaHQgdGhlbWVcblx0RlBTTWV0ZXIudGhlbWUubGlnaHQgPSBGUFNNZXRlci5leHRlbmQoe30sIGJhc2UsIHtcblx0XHRoZWF0bWFwczogW3tcblx0XHRcdHNhdHVyYXRpb246IDAuNSxcblx0XHRcdGxpZ2h0bmVzczogMC41XG5cdFx0fV0sXG5cdFx0Y29udGFpbmVyOiB7XG5cdFx0XHRjb2xvcjogJyM2NjYnLFxuXHRcdFx0YmFja2dyb3VuZDogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KSwgLTFweCAtMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSknLFxuXHRcdFx0Ym94U2hhZG93OiAnMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpJ1xuXHRcdH0sXG5cdFx0Y291bnQ6IHtcblx0XHRcdGhlYXRPbjogJ2NvbG9yJ1xuXHRcdH0sXG5cdFx0Y29sdW1uOiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiAnI2VhZWFlYSdcblx0XHR9XG5cdH0pO1xuXG5cdC8vIENvbG9yZnVsIHRoZW1lXG5cdEZQU01ldGVyLnRoZW1lLmNvbG9yZnVsID0gRlBTTWV0ZXIuZXh0ZW5kKHt9LCBiYXNlLCB7XG5cdFx0aGVhdG1hcHM6IFt7XG5cdFx0XHRzYXR1cmF0aW9uOiAwLjUsXG5cdFx0XHRsaWdodG5lc3M6IDAuNlxuXHRcdH1dLFxuXHRcdGNvbnRhaW5lcjoge1xuXHRcdFx0aGVhdE9uOiAnYmFja2dyb3VuZENvbG9yJyxcblx0XHRcdGJhY2tncm91bmQ6ICcjODg4Jyxcblx0XHRcdGNvbG9yOiAnI2ZmZicsXG5cdFx0XHR0ZXh0U2hhZG93OiAnMXB4IDFweCAwIHJnYmEoMCwwLDAsLjIpJyxcblx0XHRcdGJveFNoYWRvdzogJzAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKSdcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0YmFja2dyb3VuZDogJyM3NzcnLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwuMiknXG5cdFx0fVxuXHR9KTtcblxuXHQvLyBUcmFuc3BhcmVudCB0aGVtZVxuXHRGUFNNZXRlci50aGVtZS50cmFuc3BhcmVudCA9IEZQU01ldGVyLmV4dGVuZCh7fSwgYmFzZSwge1xuXHRcdGhlYXRtYXBzOiBbe1xuXHRcdFx0c2F0dXJhdGlvbjogMC44LFxuXHRcdFx0bGlnaHRuZXNzOiAwLjVcblx0XHR9XSxcblx0XHRjb250YWluZXI6IHtcblx0XHRcdHBhZGRpbmc6IDAsXG5cdFx0XHRjb2xvcjogJyNmZmYnLFxuXHRcdFx0dGV4dFNoYWRvdzogJzFweCAxcHggMCByZ2JhKDAsMCwwLC41KSdcblx0XHR9LFxuXHRcdGNvdW50OiB7XG5cdFx0XHRwYWRkaW5nOiAnMCA1cHgnLFxuXHRcdFx0aGVpZ2h0OiAnNDBweCcsXG5cdFx0XHRsaW5lSGVpZ2h0OiAnNDBweCdcblx0XHR9LFxuXHRcdGxlZ2VuZDoge1xuXHRcdFx0cGFkZGluZzogJzAgNXB4Jyxcblx0XHRcdGhlaWdodDogJzQwcHgnLFxuXHRcdFx0bGluZUhlaWdodDogJzQycHgnXG5cdFx0fSxcblx0XHRncmFwaDoge1xuXHRcdFx0aGVpZ2h0OiAnNDBweCdcblx0XHR9LFxuXHRcdGNvbHVtbjoge1xuXHRcdFx0d2lkdGg6IDUsXG5cdFx0XHRiYWNrZ3JvdW5kOiAnIzk5OScsXG5cdFx0XHRoZWF0T246ICdiYWNrZ3JvdW5kQ29sb3InLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0fVxuXHR9KTtcbn0od2luZG93LCBGUFNNZXRlcikpOyIsImltcG9ydCAnLi9saWIvdGlueS1jYW52YXMuanMnO1xuaW1wb3J0ICcuL2xpYi9ndW5zb3VuZC5qcyc7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IHJlamVjdHMgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICdmcHNtZXRlcic7XG5cbmRlY2xhcmUgdmFyIGZpcmVTb3VuZDogYW55O1xuXG5kZWNsYXJlIHZhciBGUFNNZXRlcjogYW55O1xuXG5jb25zdCBmcHNNID0gbmV3IEZQU01ldGVyKCk7XG5cbmRlY2xhcmUgdmFyIFRDOiBhbnk7XG5kZWNsYXJlIHZhciBUQ1RleDogYW55O1xuXG5pbnRlcmZhY2UgVmVjdG9yIHtcbiAgeDogbnVtYmVyXG4gIHk6IG51bWJlclxufVxuaW50ZXJmYWNlIEJ1bGxldCBleHRlbmRzIEJvZHkge1xufVxuaW50ZXJmYWNlIEJvZHkge1xuICBwb3NpdGlvbjogVmVjdG9yXG4gIHZlbG9jaXR5OiBWZWN0b3JcbiAgZGlyOiBEaXJcbiAgaGVpZ2h0OiBudW1iZXJcbiAgd2lkdGg6IG51bWJlclxuICB2aXNpYmxlOiBib29sZWFuXG59XG5pbnRlcmZhY2UgUGxheWVyIGV4dGVuZHMgQm9keSB7XG4gIHNob290aW5nOiBib29sZWFuXG59XG5pbnRlcmZhY2UgRW5lbXkgZXh0ZW5kcyBCb2R5IHtcbn1cblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgcGxheWVyOiBQbGF5ZXJcbiAgZW5lbWllczogRW5lbXlbXVxuICBidWxsZXRzOiBCdWxsZXRbXVxufVxuXG5pbnRlcmZhY2UgQm9keVRleHR1cmUge1xuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIHRleHQ6IFdlYkdMVGV4dHVyZVxufVxuZW51bSBEaXIge1xuICBMZWZ0LFxuICBSaWdodFxufVxuXG5lbnVtIEV2ZW50VHlwZSB7XG4gIFJpZ2h0UHJlc3NlZCxcbiAgTGVmdFJlbGVhc2VkLFxuICBSaWdodFJlbGVhc2VkLFxuICBMZWZ0UHJlc3NlZCxcbiAgSnVtcFByZXNzZWQsXG4gIFVzZVByZXNzZWQsXG4gIEF0dGFja1ByZXNzZWQsXG4gIEF0dGFja1JlbGVhc2VkXG59XG5cbnR5cGUgQWN0aW9uID0gRXZlbnRUeXBlXG50eXBlIE1vZGVsID0gU3RhdGU7XG52YXIgY2FudmFzID0gVEMoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2MnKSlcbmludGVyZmFjZSBBQUJCIHtcbiAgbHQ6IFZlY3RvclxuICBydDogVmVjdG9yXG4gIHJiOiBWZWN0b3JcbiAgbGI6IFZlY3RvclxufVxuZnVuY3Rpb24gZ2V0QUFCQihiOiBCb2R5KTogQUFCQiB7XG4gIHJldHVybiB7XG4gICAgbHQ6IHsgeDogYi5wb3NpdGlvbi54LCB5OiBiLnBvc2l0aW9uLnkgfSxcbiAgICBydDogeyB4OiBiLnBvc2l0aW9uLnggKyBiLndpZHRoLCB5OiBiLnBvc2l0aW9uLnkgfSxcbiAgICByYjogeyB4OiBiLnBvc2l0aW9uLnggKyBiLndpZHRoLCB5OiBiLnBvc2l0aW9uLnkgKyBiLmhlaWdodCB9LFxuICAgIGxiOiB7IHg6IGIucG9zaXRpb24ueCwgeTogYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRpbGVJbmRlY2VzKHY6IFZlY3Rvcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKHYueSAvIDIwIC8qIHRpbGVTaXplICovKSAqIDUwIC8qIHdvcmxkU2l6ZSAqLyArIE1hdGguZmxvb3Iodi54IC8gMjApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlkZShib2R5MTogQm9keSwgYm9keTI6IEJvZHkpOiBib29sZWFuIHtcbiAgY29uc3QgcmVzdWx0ID0gYm9keTEucG9zaXRpb24ueCA8IChib2R5Mi5wb3NpdGlvbi54ICsgYm9keTIud2lkdGgpICYmXG4gICAgYm9keTEucG9zaXRpb24ueCArIChib2R5MS53aWR0aCkgPiBib2R5Mi5wb3NpdGlvbi54ICYmXG4gICAgYm9keTEucG9zaXRpb24ueSA8IGJvZHkyLnBvc2l0aW9uLnkgKyBib2R5Mi5oZWlnaHQgJiZcbiAgICBib2R5MS5wb3NpdGlvbi55ICsgYm9keTEuaGVpZ2h0ID4gYm9keTIucG9zaXRpb24ueTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbiAgdmFyIHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgeDogZXZ0LmNsaWVudFggLSByZWN0LmxlZnQsXG4gICAgeTogZXZ0LmNsaWVudFkgLSByZWN0LnRvcFxuICB9O1xufVxuY2FudmFzLmcuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgY29uc29sZS5sb2coZ2V0TW91c2VQb3MoY2FudmFzLmcuY2FudmFzLCBldmVudCkpXG59KVxuXG5mdW5jdGlvbiBsb2FkVGV4dHVyZXModXJsczogc3RyaW5nW10pOiBQcm9taXNlPEJvZHlUZXh0dXJlW10+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlciwgcmVqZWN0cykgPT4ge1xuICAgIGxldCByZXN1bHQ6IEJvZHlUZXh0dXJlW10gPSBuZXcgQXJyYXk8Qm9keVRleHR1cmU+KCk7XG5cbiAgICB1cmxzLmZvckVhY2goKHVybCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZVxuICAgICAgaW1nLnNyYyA9IHVybFxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgIGcuY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHRcbiAgICAgICAgZy5jYW52YXMud2lkdGggPSBpbWcud2lkdGhcbiAgICAgICAgZy5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGNvbnN0IHRleDEgPSB7XG4gICAgICAgICAgd2lkdGg6IGltZy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHQsXG4gICAgICAgICAgdGV4dDogVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpIGFzIFdlYkdMVGV4dHVyZVxuICAgICAgICB9XG5cbiAgICAgICAgZy5jbGVhclJlY3QoMCwgMCwgaW1nLndpZHRoLCBpbWcuaGVpZ2h0KVxuICAgICAgICBnLnNhdmUoKVxuICAgICAgICBnLnNjYWxlKC0xLCAxKVxuICAgICAgICBnLmRyYXdJbWFnZShpbWcsIGltZy53aWR0aCAqIC0xLCAwLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgICAgIGcucmVzdG9yZSgpXG4gICAgICAgIGNvbnN0IHRleDIgPSB7XG4gICAgICAgICAgd2lkdGg6IGltZy53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHQsXG4gICAgICAgICAgdGV4dDogVENUZXgoY2FudmFzLmcsIGcuY2FudmFzLCBpbWcud2lkdGgsIGltZy5oZWlnaHQpIGFzIFdlYkdMVGV4dHVyZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGkgPSBpbmRleCAqIDJcbiAgICAgICAgcmVzdWx0W2ldID0gdGV4MVxuICAgICAgICByZXN1bHRbaSArIDFdID0gdGV4MlxuXG4gICAgICAgIGlmIChpbmRleCA9PSB1cmxzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmVyKHJlc3VsdClcbiAgICAgICAgICB9LCA0MDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9KVxufVxuXG5sb2FkVGV4dHVyZXMoW1wic29sZGllcl9ydW4ucG5nXCIsIFwic29sZGllcl9pZGxlLnBuZ1wiLCBcInNvbGRpZXJfc2hvb3RpbmcucG5nXCIsIFwiYm90LnBuZ1wiXSkudGhlbigodGV4dHVyZXMpID0+IHtcbiAgY29uc3QgW3JpZ2h0UnVuLCBsZWZ0UnVuLCByaWdodElkbGUsIGxlZnRJZGxlLCByaWdodFNob290LCBsZWZ0U2hvb3QsIHJpZ2h0Qm90LCBsZWZ0Qm90XSA9IHRleHR1cmVzXG5cbiAgbGV0IGN1cnJlbnREZWx0YSA9IDAuMFxuICBsZXQgY3VycmVudFRpbWUgPSAwLjBcbiAgbGV0IGN1cnJlbnRBY3Rpb246IEFjdGlvbiA9IG51bGxcbiAgY29uc3QgR1JBVklUWSA9IDEwXG5cbiAgY29uc3QgSlVNUF9WRUwgPSAzMFxuICBjb25zdCBXQUxLX1NQRUVEID0gNlxuICBsZXQgc3RhcnRUaW1lID0gMDtcbiAgbGV0IGlkID0gMDtcbiAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gW2NhbnZhcy5nLmNhbnZhcy53aWR0aCwgY2FudmFzLmcuY2FudmFzLmhlaWdodF1cblxuICBmdW5jdGlvbiB0ZXh0dXJlRnJvbVBpeGVsQXJyYXkoZ2wsIGRhdGFBcnJheSwgdHlwZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBkYXRhVHlwZWRBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGFBcnJheSk7IC8vIERvbid0IG5lZWQgdG8gZG8gdGhpcyBpZiB0aGUgZGF0YSBpcyBhbHJlYWR5IGluIGEgdHlwZWQgYXJyYXlcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIHR5cGUsIHdpZHRoLCBoZWlnaHQsIDAsIHR5cGUsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGFUeXBlZEFycmF5KTtcbiAgICAvLyBPdGhlciB0ZXh0dXJlIHNldHVwIGhlcmUsIGxpa2UgZmlsdGVyIG1vZGVzIGFuZCBtaXBtYXAgZ2VuZXJhdGlvblxuICAgIHJldHVybiB0ZXh0dXJlO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEJ1bGxldHMobnVtOiBudW1iZXIpOiBCdWxsZXRbXSB7XG4gICAgY29uc3QgYnM6IEJ1bGxldFtdID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICBicy5wdXNoKHsgcG9zaXRpb246IHsgeDogNTAsIHk6IDUwIH0sIHZlbG9jaXR5OiB7IHg6IDAsIHk6IDAgfSwgdmlzaWJsZTogZmFsc2UsIGRpcjogRGlyLkxlZnQsIHdpZHRoOiA0LCBoZWlnaHQ6IDQgfSlcbiAgICB9XG4gICAgcmV0dXJuIGJzXG4gIH1cblxuICBsZXQgY3VycmVudFN0YXRlOiBNb2RlbCA9IHtcbiAgICBwbGF5ZXI6IHtcbiAgICAgIHBvc2l0aW9uOiB7IHg6IDEyOCwgeTogMC4wIH0sXG4gICAgICB2ZWxvY2l0eTogeyB4OiAwLjAsIHk6IDAuMCB9LFxuICAgICAgZGlyOiBEaXIuUmlnaHQsXG4gICAgICBzaG9vdGluZzogZmFsc2UsXG4gICAgICB3aWR0aDogMjAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgZW5lbWllczogW1xuICAgICAge1xuICAgICAgICBwb3NpdGlvbjogeyB4OiAxMjgsIHk6IDAuMCB9LFxuICAgICAgICB2ZWxvY2l0eTogeyB4OiBXQUxLX1NQRUVELCB5OiAwLjAgfSxcbiAgICAgICAgZGlyOiBEaXIuTGVmdCxcbiAgICAgICAgd2lkdGg6IDIwLFxuICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICB9XG4gICAgXSxcbiAgICBidWxsZXRzOiBpbml0QnVsbGV0cygxMClcbiAgfVxuICB3aW5kb3dbXCJzdGF0ZVwiXSA9IGN1cnJlbnRTdGF0ZVxuXG4gIGNvbnN0IGtlZXBBbmltYXRpb24gPSAodGltZTogbnVtYmVyKSA9PiB7XG4gICAgY3VycmVudERlbHRhID0gKHRpbWUgLSBzdGFydFRpbWUpIC8gMTAwO1xuICAgIGN1cnJlbnRUaW1lID0gdGltZVxuICAgIHN0YXJ0VGltZSA9IHRpbWU7XG5cbiAgICB1cGRhdGUoY3VycmVudEFjdGlvbiwgY3VycmVudFN0YXRlKVxuICAgIHJlbmRlcihjdXJyZW50U3RhdGUpXG4gICAgY3VycmVudEFjdGlvbiA9IG51bGxcbiAgICBpZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShrZWVwQW5pbWF0aW9uKTtcbiAgfTtcblxuICBmdW5jdGlvbiBydW5HYW1lKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShrZWVwQW5pbWF0aW9uKTtcbiAgfVxuXG5cbiAgY29uc3QgaGFuZGxlclN0YXJ0ID0gKGV2OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldi5jdXJyZW50VGFyZ2V0WydpZCddKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkp1bXBQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BdHRhY2tQcmVzc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5MZWZ0UHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJpZ2h0UHJlc3NlZFxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gY29kZS4uLlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgY29uc3QgaGFuZGxlckVuZCA9IChldjogVG91Y2hFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXYuY3VycmVudFRhcmdldFsnaWQnXSkge1xuICAgICAgY2FzZSBcImJcIjpcbiAgICAgICAgY3VycmVudEFjdGlvbiA9IEV2ZW50VHlwZS5BdHRhY2tSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTGVmdFJlbGVhc2VkXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGNvZGUuLi5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3ZnczogYW55ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInJlY3RcIik7XG4gIGNvbnN0IHBzT3AgPSB7IHBhc3NpdmU6IHRydWUgfTtcbiAgc3Zncy5mb3JFYWNoKHJlYyA9PiB7XG4gICAgcmVjLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXJTdGFydCwgcHNPcCk7XG4gICAgcmVjLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBoYW5kbGVyRW5kLCBwc09wKTtcbiAgfSk7XG5cblxuICAvKiAgIHN2Z3MuZm9yRWFjaChyZWMgPT4ge1xuICAgICAgcmVjLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXJTdGFydCwgcHNPcCk7XG4gICAgICByZWMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGhhbmRsZXJFbmQsIHBzT3ApO1xuICAgIH0pICovXG5cbiAgY29uc3QgaGFuZGxlcktCRG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuTGVmdFByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlJpZ2h0UHJlc3NlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuSnVtcFByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDEzOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLlVzZVByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMyOlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkF0dGFja1ByZXNzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcktCRG93biwgdHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlcktCVXAgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgICBjdXJyZW50QWN0aW9uID0gRXZlbnRUeXBlLkxlZnRSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzk6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuUmlnaHRSZWxlYXNlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzI6XG4gICAgICAgIGN1cnJlbnRBY3Rpb24gPSBFdmVudFR5cGUuQXR0YWNrUmVsZWFzZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXJLQlVwLCB0cnVlKTtcblxuICBmdW5jdGlvbiBCb2R5QW5pbWF0aW9uKFxuICAgIHJpZ2h0VDogQm9keVRleHR1cmUsXG4gICAgbGVmdFQ6IEJvZHlUZXh0dXJlLFxuICAgIHRpY2tzUGVyRnJhbWU6IG51bWJlcixcbiAgICBsb29wOiBib29sZWFuLFxuICAgIGZyYW1lczogbnVtYmVyW11bXSkge1xuICAgIGNvbnN0IG5GcmFtZXMgPSBmcmFtZXMubGVuZ3RoO1xuICAgIGxldCBmcmFtZUluZGV4ID0gMCxcbiAgICAgIHRpY2tDb3VudCA9IDBcblxuICAgIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIShmcmFtZUluZGV4IDwgbkZyYW1lcyAtIDEpKSB7XG4gICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uIChwOiBCb2R5KSB7XG4gICAgICB0aWNrQ291bnQgKz0gMVxuICAgICAgaWYgKHRpY2tDb3VudCA+IHRpY2tzUGVyRnJhbWUpIHtcbiAgICAgICAgdGlja0NvdW50ID0gMFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IGZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgLy8gR28gdG8gdGhlIG5leHQgZnJhbWVcbiAgICAgICAgICBmcmFtZUluZGV4ICs9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobG9vcCkge1xuICAgICAgICAgIGZyYW1lSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBbdjAsIHUwLCB2MSwgdTFdID0gZnJhbWVzW2ZyYW1lSW5kZXhdXG4gICAgICBsZXQgdGV4dCA9IHAuZGlyID09IERpci5SaWdodCA/IHJpZ2h0VCA6IGxlZnRUXG4gICAgICBjYW52YXMuaW1nKFxuICAgICAgICB0ZXh0LnRleHQsXG4gICAgICAgIHAucG9zaXRpb24ueCArIChwLndpZHRoIC8gMiksXG4gICAgICAgIHAucG9zaXRpb24ueSxcbiAgICAgICAgcC53aWR0aCxcbiAgICAgICAgcC5oZWlnaHQsXG4gICAgICAgIHYwLFxuICAgICAgICB1MCxcbiAgICAgICAgdjEsXG4gICAgICAgIHUxXG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgYm90QW5pbSA9IG5ldyBCb2R5QW5pbWF0aW9uKHJpZ2h0Qm90LCBsZWZ0Qm90LCA1LCB0cnVlLCBbWzAsIDAsIDEsIDAuNV0sIFswLCAwLjUsIDEsIDFdXSlcbiAgY29uc3QgaWRsZUFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodElkbGUsIGxlZnRJZGxlLCAyMCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjVdLCBbMCwgMC41LCAxLCAxXV0pXG4gIGNvbnN0IHJ1bkFuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFJ1biwgbGVmdFJ1biwgOCwgdHJ1ZSwgW1swLCAwLCAxLCAwLjJdLCBbMCwgLjIsIDEsIDAuNF0sIFswLCAuNCwgMSwgMC42XSwgWzAsIC42LCAxLCAwLjhdLCBbMCwgLjgsIDEsIDEuMF1dKVxuICBjb25zdCBTaG9vdGluZ0FuaW0gPSBuZXcgQm9keUFuaW1hdGlvbihyaWdodFNob290LCBsZWZ0U2hvb3QsIDMsIGZhbHNlLCBbWzAsIDAsIDEsIDAuMjVdLCBbMCwgLjI1LCAxLCAwLjVdLCBbMCwgLjUsIDEsIDAuNzVdLCBbMCwgLjc1LCAxLCAxLjBdXSlcblxuXG4gIGxldCBndW5SZWFkeTogbnVtYmVyID0gMFxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShhOiBBY3Rpb24sIG06IE1vZGVsKSB7XG4gICAgY29uc3QgcCA9IG0ucGxheWVyXG4gICAgc3dpdGNoIChhKSB7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5KdW1wUHJlc3NlZDpcbiAgICAgICAgaWYgKHAucG9zaXRpb24ueSA9PSBGTE9PUiAtIHAuaGVpZ2h0KSB7XG4gICAgICAgICAgcC52ZWxvY2l0eS55ID0gLUpVTVBfVkVMXG4gICAgICAgIH1cbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuTGVmdFByZXNzZWQ6XG4gICAgICAgIHAuZGlyID0gRGlyLkxlZnRcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gLVdBTEtfU1BFRURcbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuUmlnaHRQcmVzc2VkOlxuICAgICAgICBwLmRpciA9IERpci5SaWdodFxuICAgICAgICBwLnZlbG9jaXR5LnggPSBXQUxLX1NQRUVEXG4gICAgICAgIHAuc2hvb3RpbmcgPSBmYWxzZVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLkxlZnRSZWxlYXNlZDpcbiAgICAgICAgcC52ZWxvY2l0eS54ID0gMFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRXZlbnRUeXBlLlJpZ2h0UmVsZWFzZWQ6XG4gICAgICAgIHAudmVsb2NpdHkueCA9IDBcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEV2ZW50VHlwZS5BdHRhY2tQcmVzc2VkOlxuICAgICAgICBTaG9vdGluZ0FuaW0ucmVzZXQoKVxuICAgICAgICBwLnNob290aW5nID0gdHJ1ZVxuICAgICAgICBwLnZlbG9jaXR5LnggPSAocC5kaXIgPT0gRGlyLkxlZnQgPyAxLjUgOiAtMS41KVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgICAgIGlmICghYi52aXNpYmxlICYmIGd1blJlYWR5ID09IDApIHtcbiAgICAgICAgICAgIGIucG9zaXRpb24ueCA9IHAucG9zaXRpb24ueCArIHAud2lkdGggKyBiLndpZHRoXG4gICAgICAgICAgICBiLnBvc2l0aW9uLnkgPSBwLnBvc2l0aW9uLnkgKyAocC5oZWlnaHQgLyAyLjQpXG4gICAgICAgICAgICBiLnZlbG9jaXR5LnggPSBwLmRpciA9PSBEaXIuUmlnaHQgPyAzNSA6IC0zNVxuICAgICAgICAgICAgYi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICAgICAgZ3VuUmVhZHkgPSAxMlxuICAgICAgICAgICAgZmlyZVNvdW5kKClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFdmVudFR5cGUuQXR0YWNrUmVsZWFzZWQ6XG4gICAgICAgIHAudmVsb2NpdHkueCA9IDBcbiAgICAgICAgcC5zaG9vdGluZyA9IGZhbHNlXG4gICAgICAgIFNob290aW5nQW5pbS5yZXNldCgpXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG1vdmUobS5wbGF5ZXIpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmVuZW1pZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGUgPSBtLmVuZW1pZXNbaV1cbiAgICAgIG1vdmUoZSlcbiAgICAgIGlmIChlLnBvc2l0aW9uLnggPCAwIHx8IChlLnBvc2l0aW9uLnggKyAyMCA+IHdpZHRoKSkge1xuICAgICAgICBlLnZlbG9jaXR5LnggPSBlLnZlbG9jaXR5LnggKiAtMVxuICAgICAgICBlLmRpciA9IGUudmVsb2NpdHkueCA+IDAgPyBEaXIuTGVmdCA6IERpci5SaWdodFxuICAgICAgfVxuICAgICAgbS5idWxsZXRzLmZpbHRlcihiID0+IGIudmlzaWJsZSkuZm9yRWFjaChiID0+IHtcbiAgICAgICAgaWYgKGNvbGxpZGUoYiwgZSkpIHtcbiAgICAgICAgICBlLnZlbG9jaXR5LnggPSAtV0FMS19TUEVFRFxuICAgICAgICAgIGUucG9zaXRpb24ueCA9IHdpZHRoIC0gZS53aWR0aFxuICAgICAgICAgIGUuZGlyID0gRGlyLlJpZ2h0XG4gICAgICAgICAgYi52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgICBiLnZlbG9jaXR5LnggPSAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5idWxsZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBiID0gbS5idWxsZXRzW2ldXG4gICAgICBtb3ZlQnVsbGV0KGIpXG4gICAgfVxuXG4gICAgZ3VuUmVhZHkgPSBNYXRoLm1heCgwLCBndW5SZWFkeSAtIDEpO1xuICB9XG5cbiAgLy9jYW52YXMuc2NhbGUoNCwgNClcbiAgbGV0IHRleERhdGFGbG9vciA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjAgKiAyMCAqIDQ7IGkrKykge1xuICAgIHRleERhdGFGbG9vcltpXSA9IDEuMFxuICB9XG5cbiAgY29uc3QgZmxvb3JUZXggPSB0ZXh0dXJlRnJvbVBpeGVsQXJyYXkoY2FudmFzLmcsIHRleERhdGFGbG9vciwgY2FudmFzLmcuUkdCQSwgMjAsIDIwKTtcbiAgZnVuY3Rpb24gcmVuZGVyRmxvb3IoKSB7XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCAyNTY7IHggKz0gMjApIHtcbiAgICAgIGNhbnZhcy5pbWcoXG4gICAgICAgIGZsb29yVGV4LFxuICAgICAgICB4LFxuICAgICAgICBGTE9PUixcbiAgICAgICAgMjAsXG4gICAgICAgIDIwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5R3Jhdml0eShiOiBCb2R5KSB7XG4gICAgYi52ZWxvY2l0eS55ID0gYi5wb3NpdGlvbi55ICsgYi5oZWlnaHQgPCBGTE9PUiA/IGIudmVsb2NpdHkueSArIChHUkFWSVRZICogY3VycmVudERlbHRhKSA6IGIudmVsb2NpdHkueVxuICB9XG5cbiAgZnVuY3Rpb24gb3V0c2lkZVNjcmVlbihiOiBCdWxsZXQpIHtcbiAgICByZXR1cm4gYi5wb3NpdGlvbi54IDwgMCB8fCBiLnBvc2l0aW9uLnggPiB3aWR0aFxuICB9XG4gIGNvbnN0IEZMT09SID0gaGVpZ2h0IC0gNDBcblxuICBmdW5jdGlvbiBtb3ZlQnVsbGV0KGI6IEJ1bGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRzaWRlU2NyZWVuKGIpKSB7XG4gICAgICBiLnZpc2libGUgPSBmYWxzZVxuICAgICAgYi52ZWxvY2l0eS54ID0gMFxuICAgIH1cbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlKGI6IEJvZHkpOiB2b2lkIHtcbiAgICBhcHBseUdyYXZpdHkoYilcbiAgICBiLnBvc2l0aW9uLnkgPSBNYXRoLm1pbihiLnBvc2l0aW9uLnkgKyAoYi52ZWxvY2l0eS55ICogY3VycmVudERlbHRhKSwgRkxPT1IgLSBiLmhlaWdodClcbiAgICBiLnBvc2l0aW9uLnggKz0gYi52ZWxvY2l0eS54ICogY3VycmVudERlbHRhXG4gIH1cblxuICBjb25zdCByZW5kZXIgPSAobTogTW9kZWwpID0+IHtcbiAgICBjb25zdCBwID0gbS5wbGF5ZXJcbiAgICBjYW52YXMuY2xzKClcbiAgICBjYW52YXMuYmtnKDAuMiwgMC4yLCAwLjIpXG4gICAgcmVuZGVyRmxvb3IoKVxuXG4gICAgaWYgKHAuc2hvb3RpbmcpIHtcbiAgICAgIFNob290aW5nQW5pbS51cGRhdGUocClcbiAgICB9IGVsc2UgaWYgKHAudmVsb2NpdHkueCA9PSAwKSB7XG4gICAgICBpZGxlQW5pbS51cGRhdGUocClcbiAgICB9IGVsc2Uge1xuICAgICAgcnVuQW5pbS51cGRhdGUocClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uZW5lbWllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZSA9IG0uZW5lbWllc1tpXVxuICAgICAgYm90QW5pbS51cGRhdGUoZSlcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0uYnVsbGV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYiA9IG0uYnVsbGV0c1tpXVxuICAgICAgaWYgKGIudmlzaWJsZSkge1xuICAgICAgICBjYW52YXMuaW1nKFxuICAgICAgICAgIGZsb29yVGV4LFxuICAgICAgICAgIGIucG9zaXRpb24ueCxcbiAgICAgICAgICBiLnBvc2l0aW9uLnksXG4gICAgICAgICAgNCxcbiAgICAgICAgICA0LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAxLFxuICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYW52YXMuZmx1c2goKTtcbiAgICBmcHNNLnRpY2soKVxuICB9XG5cbiAgLyogICovaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgIGNvbnN0IHN2Z3M6IGFueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdmdcIilcbiAgICBzdmdzLmZvckVhY2goc3ZnID0+IHtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH0pO1xuICAgIC8qICAqL1xuICB9XG5cblxuICBydW5HYW1lKClcbn0pXG4iLCJmdW5jdGlvbiBFbnZlbG9wZShjb250ZXh0KXtcbiAgICB0aGlzLm5vZGUgPSBjb250ZXh0LmNyZWF0ZUdhaW4oKVxuICAgIHRoaXMubm9kZS5nYWluLnZhbHVlID0gMFxuICAgIHRoaXMuYWRkRXZlbnRUb1F1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMubm9kZS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGNvbnRleHQuY3VycmVudFRpbWUpO1xuICAgICAgdGhpcy5ub2RlLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgY29udGV4dC5jdXJyZW50VGltZSArIDAuMDAxKTtcbiAgICAgIHRoaXMubm9kZS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMywgY29udGV4dC5jdXJyZW50VGltZSArIDAuMTAxKTtcbiAgICAgIHRoaXMubm9kZS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAsIGNvbnRleHQuY3VycmVudFRpbWUgKyAwLjUwMCk7XG4gICAgfVxuICB9XG4gIFxuICBmdW5jdGlvbiBXaGl0ZU5vaXNlQnVmZmVyKGNvbnRleHQpe1xuICAgIHZhciBidWZmZXJTaXplID0gY29udGV4dC5zYW1wbGVSYXRlO1xuICAgIHZhciBidWZmZXIgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlcigxLCBidWZmZXJTaXplLCBjb250ZXh0LnNhbXBsZVJhdGUpO1xuICAgIHZhciBvdXRwdXQgPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSsrKSB7XG4gICAgICBvdXRwdXRbaV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgfVxuICBcbiAgICB0aGlzLnNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgdGhpcy5zb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMuc291cmNlLmxvb3AgPSB0cnVlXG4gIH07XG4gIFxuICB2YXIgYXVkaW9DdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKVxuICBcbiAgdmFyIG5vaXNlID0gbmV3IFdoaXRlTm9pc2VCdWZmZXIoYXVkaW9DdHgpXG4gIHZhciB2b2ljZTEgPSBuZXcgRW52ZWxvcGUoYXVkaW9DdHgpXG4gIHZhciB2b2ljZTIgPSBuZXcgRW52ZWxvcGUoYXVkaW9DdHgpXG4gIHZhciB2b2ljZTMgPSBuZXcgRW52ZWxvcGUoYXVkaW9DdHgpXG4gIHZhciB2b2ljZTQgPSBuZXcgRW52ZWxvcGUoYXVkaW9DdHgpXG4gIFxuICBub2lzZS5zb3VyY2UuY29ubmVjdCh2b2ljZTEubm9kZSlcbiAgbm9pc2Uuc291cmNlLmNvbm5lY3Qodm9pY2UyLm5vZGUpXG4gIG5vaXNlLnNvdXJjZS5jb25uZWN0KHZvaWNlMy5ub2RlKVxuICBub2lzZS5zb3VyY2UuY29ubmVjdCh2b2ljZTQubm9kZSlcbiAgXG4gIHZhciBmaWx0ZXIgPSBhdWRpb0N0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuICBmaWx0ZXIudHlwZSA9IFwibG93cGFzc1wiXG4gIGZpbHRlci5RLnZhbHVlID0gMVxuICBmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gODAwXG4gIHZvaWNlMS5ub2RlLmNvbm5lY3QoZmlsdGVyKVxuICB2b2ljZTIubm9kZS5jb25uZWN0KGZpbHRlcilcbiAgdm9pY2UzLm5vZGUuY29ubmVjdChmaWx0ZXIpXG4gIHZvaWNlNC5ub2RlLmNvbm5lY3QoZmlsdGVyKVxuICB2YXIgZ2Fpbk1hc3RlciA9IGF1ZGlvQ3R4LmNyZWF0ZUdhaW4oKVxuICBnYWluTWFzdGVyLmdhaW4udmFsdWUgPSA1XG4gIGZpbHRlci5jb25uZWN0KGdhaW5NYXN0ZXIpXG4gIGdhaW5NYXN0ZXIuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbilcbiAgXG4gIHZhciB2b2ljZVNlbGVjdCA9IDBcbiAgdmFyIHN0YXJ0ZWQgPSBmYWxzZVxuICBcbiAgZnVuY3Rpb24gZmlyZVNvdW5kKCl7XG4gICAgXG4gICBpZighc3RhcnRlZCl7XG4gICAgICBzdGFydGVkID0gdHJ1ZVxuICAgICAgbm9pc2Uuc291cmNlLnN0YXJ0KDApXG4gICAgfVxuICAgIFxuICAgIFxuICAgICAgIHZvaWNlU2VsZWN0KytcbiAgICAgICAgaWYodm9pY2VTZWxlY3QgPiA0KXtcbiAgICAgICAgICB2b2ljZVNlbGVjdCA9IDFcbiAgICAgICAgfVxuICAgICAgICBpZiAodm9pY2VTZWxlY3QgPT0gMSl7XG4gICAgICAgICAgdm9pY2UxLmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZvaWNlU2VsZWN0ID09IDIpe1xuICAgICAgICAgIHZvaWNlMi5hZGRFdmVudFRvUXVldWUoKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2b2ljZVNlbGVjdCA9PSAzKXtcbiAgICAgICAgICB2b2ljZTMuYWRkRXZlbnRUb1F1ZXVlKClcbiAgICAgICAgfVxuICAgICAgICBpZiAodm9pY2VTZWxlY3QgPT0gNCl7XG4gICAgICAgICAgdm9pY2U0LmFkZEV2ZW50VG9RdWV1ZSgpXG4gICAgICAgIH1cbiAgfVxuXG4gIHdpbmRvd1snZmlyZVNvdW5kJ10gPSBmaXJlU291bmQ7XG4gIFxuICAiLCIvKlxuICogVGlueUNhbnZhcyBtb2R1bGUgKGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRuZW5mZXIvdGlueS1jYW52YXMpXG4gKiBEZXZlbG9wZWQgYnkgRmVsaXBlIEFsZm9uc28gLT4gaHR0cHM6Ly90d2l0dGVyLmNvbS9iaXRuZW5mZXIvXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgICAgICAgICAgICAgICAgICAgVmVyc2lvbiAyLCBEZWNlbWJlciAyMDA0XG4gKiBcbiAqICBDb3B5cmlnaHQgKEMpIDIwMDQgU2FtIEhvY2V2YXIgPHNhbUBob2NldmFyLm5ldD5cbiAqIFxuICogIEV2ZXJ5b25lIGlzIHBlcm1pdHRlZCB0byBjb3B5IGFuZCBkaXN0cmlidXRlIHZlcmJhdGltIG9yIG1vZGlmaWVkXG4gKiAgY29waWVzIG9mIHRoaXMgbGljZW5zZSBkb2N1bWVudCwgYW5kIGNoYW5naW5nIGl0IGlzIGFsbG93ZWQgYXMgbG9uZ1xuICogIGFzIHRoZSBuYW1lIGlzIGNoYW5nZWQuXG4gKiBcbiAqICAgICAgICAgICAgIERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8gUFVCTElDIExJQ0VOU0VcbiAqICAgIFRFUk1TIEFORCBDT05ESVRJT05TIEZPUiBDT1BZSU5HLCBESVNUUklCVVRJT04gQU5EIE1PRElGSUNBVElPTlxuICogXG4gKiAgIDAuIFlvdSBqdXN0IERPIFdIQVQgVEhFIEZVQ0sgWU9VIFdBTlQgVE8uXG4gKiBcbiAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBDb21waWxlU2hhZGVyKGdsLCBzb3VyY2UsIHR5cGUpIHtcbiAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuICAgIHJldHVybiBzaGFkZXI7XG59XG5cbmZ1bmN0aW9uIENyZWF0ZVNoYWRlclByb2dyYW0oZ2wsIHZzU291cmNlLCBmc1NvdXJjZSkge1xuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpLFxuICAgICAgICB2U2hhZGVyID0gQ29tcGlsZVNoYWRlcihnbCwgdnNTb3VyY2UsIDM1NjMzKSxcbiAgICAgICAgZlNoYWRlciA9IENvbXBpbGVTaGFkZXIoZ2wsIGZzU291cmNlLCAzNTYzMik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmU2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlQnVmZmVyKGdsLCBidWZmZXJUeXBlLCBzaXplLCB1c2FnZSkge1xuICAgIHZhciBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGJ1ZmZlclR5cGUsIGJ1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShidWZmZXJUeXBlLCBzaXplLCB1c2FnZSk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gQ3JlYXRlVGV4dHVyZShnbCwgaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZSgzNTUzLCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKDM1NTMsIDEwMjQyLCAzMzA3MSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaSgzNTUzLCAxMDI0MywgMzMwNzEpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDAsIDk3MjgpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoMzU1MywgMTAyNDEsIDk3MjgpO1xuICAgIGdsLnRleEltYWdlMkQoMzU1MywgMCwgNjQwOCwgNjQwOCwgNTEyMSwgaW1hZ2UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKDM1NTMsIG51bGwpO1xuICAgIHRleHR1cmUud2lkdGggPSB3aWR0aDtcbiAgICB0ZXh0dXJlLmhlaWdodCA9IGhlaWdodDtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cbndpbmRvd1snVENTaGQnXSA9IENvbXBpbGVTaGFkZXI7XG53aW5kb3dbJ1RDUHJnJ10gPSBDcmVhdGVTaGFkZXJQcm9ncmFtO1xud2luZG93WydUQ0J1ZiddID0gQ3JlYXRlQnVmZmVyO1xud2luZG93WydUQ1RleCddID0gQ3JlYXRlVGV4dHVyZTtcblxuZnVuY3Rpb24gVGlueUNhbnZhcyhjYW52YXMpIHtcbiAgICB2YXIgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSxcbiAgICAgICAgVkVSVEVYX1NJWkUgPSAoNCAqIDIpICsgKDQgKiAyKSArICg0KSxcbiAgICAgICAgTUFYX0JBVENIID0gMTA5MjIsIC8vIGZsb29yKCgyIF4gMTYpIC8gNilcbiAgICAgICAgTUFYX1NUQUNLID0gMTAwLFxuICAgICAgICBNQVRfU0laRSA9IDYsXG4gICAgICAgIFZFUlRJQ0VTX1BFUl9RVUFEID0gNixcbiAgICAgICAgTUFUX1NUQUNLX1NJWkUgPSBNQVhfU1RBQ0sgKiBNQVRfU0laRSxcbiAgICAgICAgVkVSVEVYX0RBVEFfU0laRSA9IFZFUlRFWF9TSVpFICogTUFYX0JBVENIICogNCxcbiAgICAgICAgSU5ERVhfREFUQV9TSVpFID0gTUFYX0JBVENIICogKDIgKiBWRVJUSUNFU19QRVJfUVVBRCksXG4gICAgICAgIHdpZHRoID0gY2FudmFzLndpZHRoLFxuICAgICAgICBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0LFxuICAgICAgICBzaGFkZXIgPSBDcmVhdGVTaGFkZXJQcm9ncmFtKFxuICAgICAgICAgICAgZ2wsIFtcbiAgICAgICAgICAgICAgICAncHJlY2lzaW9uIGxvd3AgZmxvYXQ7JyxcbiAgICAgICAgICAgICAgICAvLyBJTiBWZXJ0ZXggUG9zaXRpb24gYW5kXG4gICAgICAgICAgICAgICAgLy8gSU4gVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICdhdHRyaWJ1dGUgdmVjMiBhLCBiOycsXG4gICAgICAgICAgICAgICAgLy8gSU4gVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IGM7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVGV4dHVyZSBDb29yZGluYXRlc1xuICAgICAgICAgICAgICAgICd2YXJ5aW5nIHZlYzIgZDsnLFxuICAgICAgICAgICAgICAgIC8vIE9VVCBWZXJ0ZXggQ29sb3JcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWM0IGU7JyxcbiAgICAgICAgICAgICAgICAvLyBDT05TVCBWaWV3IE1hdHJpeFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIG1hdDQgbTsnLFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHZlYzIgcjsnLFxuICAgICAgICAgICAgICAgICd2b2lkIG1haW4oKXsnLFxuICAgICAgICAgICAgICAgICdnbF9Qb3NpdGlvbj1tKnZlYzQoYSwxLjAsMS4wKTsnLFxuICAgICAgICAgICAgICAgICdkPWI7JyxcbiAgICAgICAgICAgICAgICAnZT1jOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpLCBbXG4gICAgICAgICAgICAgICAgJ3ByZWNpc2lvbiBsb3dwIGZsb2F0OycsXG4gICAgICAgICAgICAgICAgLy8gT1VUIFRleHR1cmUgQ29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICAndmFyeWluZyB2ZWMyIGQ7JyxcbiAgICAgICAgICAgICAgICAvLyBPVVQgVmVydGV4IENvbG9yXG4gICAgICAgICAgICAgICAgJ3ZhcnlpbmcgdmVjNCBlOycsXG4gICAgICAgICAgICAgICAgLy8gQ09OU1QgU2luZ2xlIFNhbXBsZXIyRFxuICAgICAgICAgICAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCBmOycsXG4gICAgICAgICAgICAgICAgJ3ZvaWQgbWFpbigpeycsXG4gICAgICAgICAgICAgICAgJ2dsX0ZyYWdDb2xvcj10ZXh0dXJlMkQoZixkKSplOycsXG4gICAgICAgICAgICAgICAgJ30nXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpXG4gICAgICAgICksXG4gICAgICAgIGdsQnVmZmVyU3ViRGF0YSA9IGdsLmJ1ZmZlclN1YkRhdGEuYmluZChnbCksXG4gICAgICAgIGdsRHJhd0VsZW1lbnRzID0gZ2wuZHJhd0VsZW1lbnRzLmJpbmQoZ2wpLFxuICAgICAgICBnbEJpbmRUZXh0dXJlID0gZ2wuYmluZFRleHR1cmUuYmluZChnbCksXG4gICAgICAgIGdsQ2xlYXIgPSBnbC5jbGVhci5iaW5kKGdsKSxcbiAgICAgICAgZ2xDbGVhckNvbG9yID0gZ2wuY2xlYXJDb2xvci5iaW5kKGdsKSxcbiAgICAgICAgdmVydGV4RGF0YSA9IG5ldyBBcnJheUJ1ZmZlcihWRVJURVhfREFUQV9TSVpFKSxcbiAgICAgICAgdlBvc2l0aW9uRGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZDb2xvckRhdGEgPSBuZXcgVWludDMyQXJyYXkodmVydGV4RGF0YSksXG4gICAgICAgIHZJbmRleERhdGEgPSBuZXcgVWludDE2QXJyYXkoSU5ERVhfREFUQV9TSVpFKSxcbiAgICAgICAgSUJPID0gQ3JlYXRlQnVmZmVyKGdsLCAzNDk2MywgdkluZGV4RGF0YS5ieXRlTGVuZ3RoLCAzNTA0NCksXG4gICAgICAgIFZCTyA9IENyZWF0ZUJ1ZmZlcihnbCwgMzQ5NjIsIHZlcnRleERhdGEuYnl0ZUxlbmd0aCwgMzUwNDgpLFxuICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgIG1hdCA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDEsIDAsIDBdKSxcbiAgICAgICAgc3RhY2sgPSBuZXcgRmxvYXQzMkFycmF5KDEwMCksXG4gICAgICAgIHN0YWNrcCA9IDAsXG4gICAgICAgIGNvcyA9IE1hdGguY29zLFxuICAgICAgICBzaW4gPSBNYXRoLnNpbixcbiAgICAgICAgY3VycmVudFRleHR1cmUgPSBudWxsLFxuICAgICAgICByZW5kZXJlciA9IG51bGwsXG4gICAgICAgIGxvY0EsIGxvY0IsIGxvY0M7XG5cbiAgICBnbC5ibGVuZEZ1bmMoNzcwLCA3NzEpO1xuICAgIGdsLmVuYWJsZSgzMDQyKTtcbiAgICBnbC51c2VQcm9ncmFtKHNoYWRlcik7XG4gICAgZ2wuYmluZEJ1ZmZlcigzNDk2MywgSUJPKTtcbiAgICBmb3IgKHZhciBpbmRleEEgPSBpbmRleEIgPSAwOyBpbmRleEEgPCBNQVhfQkFUQ0ggKiBWRVJUSUNFU19QRVJfUVVBRDsgaW5kZXhBICs9IFZFUlRJQ0VTX1BFUl9RVUFELCBpbmRleEIgKz0gNClcbiAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAwXSA9IGluZGV4QixcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgMV0gPSBpbmRleEIgKyAxLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyAyXSA9IGluZGV4QiArIDIsXG4gICAgICAgICAgICB2SW5kZXhEYXRhW2luZGV4QSArIDNdID0gaW5kZXhCICsgMCxcbiAgICAgICAgICAgIHZJbmRleERhdGFbaW5kZXhBICsgNF0gPSBpbmRleEIgKyAzLFxuICAgICAgICAgICAgdkluZGV4RGF0YVtpbmRleEEgKyA1XSA9IGluZGV4QiArIDE7XG5cbiAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjMsIDAsIHZJbmRleERhdGEpO1xuICAgIGdsLmJpbmRCdWZmZXIoMzQ5NjIsIFZCTyk7XG4gICAgbG9jQSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlciwgJ2EnKTtcbiAgICBsb2NCID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyLCAnYicpO1xuICAgIGxvY0MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXIsICdjJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQSk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NBLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NCLCAyLCA1MTI2LCAwLCBWRVJURVhfU0laRSwgOCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jQyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihsb2NDLCA0LCA1MTIxLCAxLCBWRVJURVhfU0laRSwgMTYpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHNoYWRlciwgJ20nKSwgMCxcbiAgICAgICAgbmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAyIC8gd2lkdGgsIDAsIDAsIDAsXG4gICAgICAgICAgICAwLCAtMiAvIGhlaWdodCwgMCwgMCxcbiAgICAgICAgICAgIDAsIDAsIDEsIDEsIC0xLCAxLCAwLCAwXG4gICAgICAgIF0pXG4gICAgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKDMzOTg0KTtcbiAgICByZW5kZXJlciA9IHtcbiAgICAgICAgJ2cnOiBnbCxcbiAgICAgICAgJ2MnOiBjYW52YXMsXG4gICAgICAgICdjb2wnOiAweEZGRkZGRkZGLFxuICAgICAgICAnYmtnJzogZnVuY3Rpb24gKHIsIGcsIGIpIHtcbiAgICAgICAgICAgIGdsQ2xlYXJDb2xvcihyLCBnLCBiLCAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Nscyc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGdsQ2xlYXIoMTYzODQpO1xuICAgICAgICB9LFxuICAgICAgICAndHJhbnMnOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgbWF0WzRdID0gbWF0WzBdICogeCArIG1hdFsyXSAqIHkgKyBtYXRbNF07XG4gICAgICAgICAgICBtYXRbNV0gPSBtYXRbMV0gKiB4ICsgbWF0WzNdICogeSArIG1hdFs1XTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3NjYWxlJzogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgICAgIG1hdFswXSA9IG1hdFswXSAqIHg7XG4gICAgICAgICAgICBtYXRbMV0gPSBtYXRbMV0gKiB4O1xuICAgICAgICAgICAgbWF0WzJdID0gbWF0WzJdICogeTtcbiAgICAgICAgICAgIG1hdFszXSA9IG1hdFszXSAqIHk7XG4gICAgICAgIH0sXG4gICAgICAgICdyb3QnOiBmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgdmFyIGEgPSBtYXRbMF0sXG4gICAgICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgICAgIGQgPSBtYXRbM10sXG4gICAgICAgICAgICAgICAgc3IgPSBzaW4ociksXG4gICAgICAgICAgICAgICAgY3IgPSBjb3Mocik7XG5cbiAgICAgICAgICAgIG1hdFswXSA9IGEgKiBjciArIGMgKiBzcjtcbiAgICAgICAgICAgIG1hdFsxXSA9IGIgKiBjciArIGQgKiBzcjtcbiAgICAgICAgICAgIG1hdFsyXSA9IGEgKiAtc3IgKyBjICogY3I7XG4gICAgICAgICAgICBtYXRbM10gPSBiICogLXNyICsgZCAqIGNyO1xuICAgICAgICB9LFxuICAgICAgICAncHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDBdID0gbWF0WzBdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgMV0gPSBtYXRbMV07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyAyXSA9IG1hdFsyXTtcbiAgICAgICAgICAgIHN0YWNrW3N0YWNrcCArIDNdID0gbWF0WzNdO1xuICAgICAgICAgICAgc3RhY2tbc3RhY2twICsgNF0gPSBtYXRbNF07XG4gICAgICAgICAgICBzdGFja1tzdGFja3AgKyA1XSA9IG1hdFs1XTtcbiAgICAgICAgICAgIHN0YWNrcCArPSA2O1xuICAgICAgICB9LFxuICAgICAgICAncG9wJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3RhY2twIC09IDY7XG4gICAgICAgICAgICBtYXRbMF0gPSBzdGFja1tzdGFja3AgKyAwXTtcbiAgICAgICAgICAgIG1hdFsxXSA9IHN0YWNrW3N0YWNrcCArIDFdO1xuICAgICAgICAgICAgbWF0WzJdID0gc3RhY2tbc3RhY2twICsgMl07XG4gICAgICAgICAgICBtYXRbM10gPSBzdGFja1tzdGFja3AgKyAzXTtcbiAgICAgICAgICAgIG1hdFs0XSA9IHN0YWNrW3N0YWNrcCArIDRdO1xuICAgICAgICAgICAgbWF0WzVdID0gc3RhY2tbc3RhY2twICsgNV07XG4gICAgICAgIH0sXG4gICAgICAgICdpbWcnOiBmdW5jdGlvbiAodGV4dHVyZSwgeCwgeSwgdywgaCwgdTAsIHYwLCB1MSwgdjEpIHtcbiAgICAgICAgICAgIHZhciB4MCA9IHgsXG4gICAgICAgICAgICAgICAgeTAgPSB5LFxuICAgICAgICAgICAgICAgIHgxID0geCArIHcsXG4gICAgICAgICAgICAgICAgeTEgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MiA9IHgsXG4gICAgICAgICAgICAgICAgeTIgPSB5ICsgaCxcbiAgICAgICAgICAgICAgICB4MyA9IHggKyB3LFxuICAgICAgICAgICAgICAgIHkzID0geSxcbiAgICAgICAgICAgICAgICBhID0gbWF0WzBdLFxuICAgICAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICAgICAgYyA9IG1hdFsyXSxcbiAgICAgICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgICAgIGUgPSBtYXRbNF0sXG4gICAgICAgICAgICAgICAgZiA9IG1hdFs1XSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSAwLFxuICAgICAgICAgICAgICAgIGFyZ2IgPSByZW5kZXJlclsnY29sJ107XG5cbiAgICAgICAgICAgIGlmICh0ZXh0dXJlICE9IGN1cnJlbnRUZXh0dXJlIHx8XG4gICAgICAgICAgICAgICAgY291bnQgKyAxID49IE1BWF9CQVRDSCkge1xuICAgICAgICAgICAgICAgIGdsQnVmZmVyU3ViRGF0YSgzNDk2MiwgMCwgdmVydGV4RGF0YSk7XG4gICAgICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICAgICAgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV4dHVyZSAhPSB0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgICAgICAgICAgICAgICAgZ2xCaW5kVGV4dHVyZSgzNTUzLCBjdXJyZW50VGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvZmZzZXQgPSBjb3VudCAqIFZFUlRFWF9TSVpFO1xuICAgICAgICAgICAgLy8gVmVydGV4IE9yZGVyXG4gICAgICAgICAgICAvLyBWZXJ0ZXggUG9zaXRpb24gfCBVViB8IEFSR0JcbiAgICAgICAgICAgIC8vIFZlcnRleCAxXG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYSArIHkwICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgwICogYiArIHkwICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUwO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgLy8gVmVydGV4IDJcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBhICsgeTEgKiBjICsgZTtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0geDEgKiBiICsgeTEgKiBkICsgZjtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdTE7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHYxO1xuICAgICAgICAgICAgdkNvbG9yRGF0YVtvZmZzZXQrK10gPSBhcmdiO1xuXG4gICAgICAgICAgICAvLyBWZXJ0ZXggM1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGEgKyB5MiAqIGMgKyBlO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB4MiAqIGIgKyB5MiAqIGQgKyBmO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB1MDtcbiAgICAgICAgICAgIHZQb3NpdGlvbkRhdGFbb2Zmc2V0KytdID0gdjE7XG4gICAgICAgICAgICB2Q29sb3JEYXRhW29mZnNldCsrXSA9IGFyZ2I7XG5cbiAgICAgICAgICAgIC8vIFZlcnRleCA0XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYSArIHkzICogYyArIGU7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHgzICogYiArIHkzICogZCArIGY7XG4gICAgICAgICAgICB2UG9zaXRpb25EYXRhW29mZnNldCsrXSA9IHUxO1xuICAgICAgICAgICAgdlBvc2l0aW9uRGF0YVtvZmZzZXQrK10gPSB2MDtcbiAgICAgICAgICAgIHZDb2xvckRhdGFbb2Zmc2V0KytdID0gYXJnYjtcblxuICAgICAgICAgICAgaWYgKCsrY291bnQgPj0gTUFYX0JBVENIKSB7XG4gICAgICAgICAgICAgICAgZ2xCdWZmZXJTdWJEYXRhKDM0OTYyLCAwLCB2ZXJ0ZXhEYXRhKTtcbiAgICAgICAgICAgICAgICBnbERyYXdFbGVtZW50cyg0LCBjb3VudCAqIFZFUlRJQ0VTX1BFUl9RVUFELCA1MTIzLCAwKTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdmbHVzaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSByZXR1cm47XG4gICAgICAgICAgICBnbEJ1ZmZlclN1YkRhdGEoMzQ5NjIsIDAsIHZQb3NpdGlvbkRhdGEuc3ViYXJyYXkoMCwgY291bnQgKiBWRVJURVhfU0laRSkpO1xuICAgICAgICAgICAgZ2xEcmF3RWxlbWVudHMoNCwgY291bnQgKiBWRVJUSUNFU19QRVJfUVVBRCwgNTEyMywgMCk7XG4gICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiByZW5kZXJlcjtcbn1cbndpbmRvd1snVEMnXSA9IFRpbnlDYW52YXM7Il0sInNvdXJjZVJvb3QiOiIifQ==