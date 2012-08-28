/*globals $, Raphael, jQuery, document, window*/
/*
 *
 * Wijmo Library 2.2.0
 * http://wijmo.com/
 *
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
 *
 *
 * * Wijmo gauge widget.
 *
 * Depends:
 *	raphael.js
 *	globalize.min.js
 *	jquery.ui.widget.js
 *	jquery.wijmo.raphael.js
 */
(function ($) {
	"use strict";
	// do nothing if raphael not loaded
	if (!window.Raphael) {
		return;
	}

	Raphael.fn.isoTri = function (x, y, width, height, compass) {
		var x1 = x,
			y1 = y + height / 2,
			x2 = x + width,
			y2 = y,
			x3 = x + width,
			y3 = y + height, arrPath;

		if (compass === "north") {
			x1 = x;
			y1 = y;
			x2 = x - width / 2;
			y2 = y + height;
			x3 = x + width / 2;
			y3 = y + height;
		}
		arrPath = ["M", x1, y1, "L", x2, y2, "L", x3, y3, "z"];
		return this.path(arrPath.concat(" "));
	};

	$.wijgauge = {
		math: {
			mod360: function (value) {
				var result = value % 360;
				if (value < 0) {
					result += 360;
				}
				return result;
			},
			getAngle: function (p1, pivot, p2) {
				var self = this,
					a = self.distance(pivot, p2),
					b = self.distance(pivot, p1),
					c = self.distance(p2, p1),
					a2 = a * a,
					b2 = b * b,
					c2 = c * c,
					angleRadians = Math.acos((c2 - b2 - a2) / (-2 * b * a));
				return Math.round(180 / Math.PI * angleRadians);

			},
			distance: function (a, b) {
				return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
			},
			log: function (number, base) {
				if (number <= 0) {
					return NaN;
				}
				if (base === 1 || base < 0) {
					return NaN;
				}
				return Math.log(number) / Math.log(base);
			}
		},
		decoratorUtils: {
			generateValues: function (from, to, interval) {
				var list = [], qty, i;
				if (to > from && interval > 0) {
					qty = parseInt((to - from) / interval + 1, 10);
					for (i = 0; i < qty; i++) {
						list.push(from + i * interval);
					}
				}
				else if (interval === 0) {
					list.push(from);
				}
				return list;
			},
			isInRange: function (value, min, max) {
				return (value >= min && value <= max) ||
					(value <= min && value >= max);
			}
		},
		paintMarker: function (canvas, marker, x, y, length, width, isHorizontal) {
			var ele;
			if (marker === "rect") {
				return canvas.rect(x - length / 2, y - width / 2, length, width);
			}
			else {
				if (isHorizontal) {
					ele = canvas.paintMarker(marker, x, y, width);
				}
				else {
					ele = canvas.paintMarker(marker, x, y, length);
				}
				return ele;
			}
		},
		formatString: function (str, format) {
			if ($.isFunction(format)) {
				return format.call(this, str);
			}
			else if (format !== "") {
				var reg = /\{0(?::((?:n|d|p|c)\d?))?\}/gi, match, formater;
				if (reg.test(format)) {
					match = format.match(reg);
					formater = RegExp.$1;
					return format.replace(/\{0(?::(?:(?:n|d|p|c)\d?))?\}/gi, 
						Globalize.format(str, formater));
				}
			}
			return str;
		}
	};


} (jQuery));

(function ($) {
	"use strict";
	$.widget("wijmo.wijgauge", {
		options: {
			/// <summary>
			/// The value of the gauge.
			/// Default: 5.
			/// Type: Number
			/// Code example: $("#selector")
			/// .wijlineargauge/wijradialgauge("option", value, 20)
			/// </summary>
			value: 0,
			/// <summary>
			/// The max value of the gauge.
			/// Default: 100.
			/// Type: Number
			/// Code example: $("#selector")
			/// .wijlineargauge/wijradialgauge("option", max, 150)
			/// </summary>
			max: 100,
			/// <summary>
			/// The min value of the gauge.
			/// Default: 0.
			/// Type: Number
			/// Code example: $("#selector")
			/// .wijlineargauge/wijradialgauge("option", min, 10)
			/// </summary>
			min: 0,
			/// <summary>
			/// The width of the gauge.
			/// Default: 600.
			/// Type: Number.
			/// Code example: $("#selector")
			/// .wijlineargauge/wijradialgauge("option", width, 500)
			/// </summary>
			width: 600,
			/// <summary>
			/// The height of the gauge.
			/// Default: 600.
			/// Type: Number.
			/// Code example: $("#selector")
			/// .wijlineargauge/wijradialgauge("option", height, 350)
			/// </summary>
			height: 400,
			/// <summary>
			/// A value that provides information for the major tick.
			/// Default: {position: "inside", style: { fill: "#1E395B", stroke:"none"
			/// }, factor: 2, visible: true, marker: "rect", offset: 0, interval: 10}
			/// Type: Object.
			/// Code example:
			/// $("#selector").wijgauge({
			///		interval: 20, offset: 20
			/// })
			/// </summary>
			tickMajor: {
				/// <summary>
				/// A value that indicates the type of major tick mark.
				/// Default: "inside".
				/// Type: "String"
				/// </summary>
				/// <remarks>
				/// Options are 'inside', 'outside' and 'cross'.
				/// </remarks>
				position: "inside",
				/// <summary>
				/// A value that indicates the style of major tick mark.
				/// Default: {fill: "#1E395B", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: { 
					fill: "#1E395B",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates an integral factor
				/// for major tick mark length.
				/// Default: 2.
				/// Type: Number.
				/// </summary>
				factor: 2,
				/// <summary>
				/// A value that indicates whether show the major tick.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				visible: true,
				/// <summary>
				/// A value that indicates which marker shape the tick is painted.
				/// Default: "rect".
				/// Type: "String"
				/// </summary>
				/// <remarks>
				/// Options are 'rect', 'tri', 'circle', 'invertedTri', 
				/// 'box', 'cross', 'diamond'.
				/// </remarks>
				marker: "rect",
				/// <summary>
				/// A value that indicates where to paint the tick on the gauge.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0,
				/// <summary>
				/// A value that indicates how much value between two nearest major ticks.
				/// Default: 10.
				/// Type: Number
				/// </summary>
				interval: 10
			},
			/// <summary>
			/// A value that provides information for the minor tick.
			/// Default: {position: "inside", style: { fill: "#1E395B", stroke:"none"
			/// }, factor: 1, visible: false, marker: "rect", offset: 0, interval: 5}
			/// Type: Object.
			/// Code example:
			/// $("#selector").wijgauge({
			///		tickMinor: { interval:10, offset:10 }
			///	});
			/// </summary>
			tickMinor: {
				/// <summary>
				/// A value that indicates the type of minor tick mark.
				/// Default: "inside".
				/// Type: "String"
				/// </summary>
				/// <remarks>
				/// Options are 'inside', 'outside' and 'cross'.
				/// </remarks>
				position: "inside",
				/// <summary>
				/// A value that indicates the style of minor tick mark.
				/// Default: {fill: "#1E395B", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: { fill: "#1E395B", "stroke": "none" },
				/// <summary>
				/// A value that indicates an integral factor
				/// for minor tick mark length.
				/// Default: 1.
				/// Type: Number.
				/// </summary>
				factor: 1,
				/// <summary>
				/// A value that indicates whether show the minor tick.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				visible: false,
				/// <summary>
				/// A value that indicates which marker shape the tick is painted.
				/// Default: "rect".
				/// Type: "String"
				/// </summary>
				/// <remarks>
				/// Options are 'rect', 'tri', 'circle', 'invertedTri', 
				/// 'box', 'cross', 'diamond'.
				/// </remarks>
				marker: "rect",
				/// <summary>
				/// A value that indicates where to paint the tick on the gauge.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0, 
				/// <summary>
				/// A value that indicates how much value between two nearest minor ticks.
				/// Default: 5.
				/// Type: Number
				/// </summary>
				interval: 5
			},
			/// <summary>
			/// A value that includes all settings of the gauge pointer.
			/// Default: {length: 1, style: { fill: "#1E395B", stroke: "#1E395B"},
			///	width: 8, offset: 0, shape: "tri", visible: true, template: null}.
			/// Type: object.
			/// Code example: $("#element").wijgauge( { pointer: {} } );
			/// </summary>
			pointer: {
				/// <summary>
				/// An percent of the gauge's width / height.
				/// Default: 1,
				/// Type：Number
				/// </summary>
				length: 1,
				/// <summary>
				/// The style of the pointer.
				/// Default: {fill: "#1E395B", stroke: "#1E395B"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "#1E395B",
					stroke: "#1E395B"
				},
				/// <summary>
				/// The width of the pointer.
				/// Default: 8.
				/// Type: Number.
				/// </summary>
				width: 8,
				/// <summary>
				/// A value that indicates the distance the pointer moved.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0,
				/// <summary>
				/// A value that indicates which shape the pointer shown.
				/// Default: 'tri'.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'rect', 'tri'.
				/// </remarks>
				shape: "tri",
				/// <summary>
				/// A value that indicates whether show the pointer.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				visible: true,
				/// <summary>
				/// A funtion that indicates how to draw the pointer.
				/// Default: null.
				/// Type: Funtion.
				/// </summary>
				template: null
			},
			/// <summary>
			/// A value that indicates whether it uses a logarithmic scale.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			islogarithmic: false,
			/// <summary>
			/// A value that indicates the logarithmic base if the 
			/// islogarithmic option is set to true.
			/// Default: 10.
			/// Type: Number.
			/// </summary>
			logarithmicBase: 10,
			/// <summary>
			/// A value that includes all settings of the gauge label.
			/// Default: {format: "", style: {fill: "#1E395B", "font-size": 12,
			/// "font-weight": "800"}, visible: true, offset: 0}.
			/// Type: Object.
			/// </summary>
			labels: {
				/// <summary>
				/// A value that indicates he format of the label text.
				/// Default: "".
				/// Type: String.
				/// </summary>
				format: "",
				/// <summary>
				/// A value that indicates the style of the gauge label.
				/// Default: {fill: "#1E395B", "font-size": 12, "font-weight": "800"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "#1E395B",
					"font-size": 12,
					"font-weight": "800"
				},
				/// <summary>
				/// A value that indicates whether to show the gauge label.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				visible: true,
				/// <summary>
				/// A value that indicates the position of the gauge label.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0
			},
			/// <summary>
			/// A value that indicates whether to show animation , 
			/// the easing of the animation
			///	and the duration for the animation.
			/// Default: {enabled: true, duration: 2000, easing: ">"}.
			/// Type: Object.
			/// </summary>	
			animation: {
				enabled: true,
				duration: 2000,
				easing: ">"
			},
			/// <summary>
			/// A value that includes all settings of the gauge face.
			/// Default: {style: { fill: "270-#FFFFFF-#D9E3F0", stroke: "#7BA0CC", 
			/// "stroke-width": "4"}, template: null}.
			/// Type: Object.
			/// </summary>
			face: {
				/// <summary>
				/// A value that indicates the style of the gauge face.
				/// Default: {fill: "270-#FFFFFF-#D9E3F0", stroke: "#7BA0CC", 
				/// "stroke-width": 4}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "270-#FFFFFF-#D9E3F0",
					stroke: "#7BA0CC",
					"stroke-width": 4
				},
				/// <summary>
				/// A value that indicates how to draw the gauge face.
				/// Default: null.
				/// Type: Function.
				/// </summary>
				template: null
			},
			/// <summary>
			/// A value that indicates the top margin of the gauge area.
			/// Default: 25.
			/// Type: Number.
			/// </summary>
			marginTop: 0,
			/// <summary>
			/// A value that indicates the right margin of the gauge area.
			/// Default: 25.
			/// Type: Number.
			/// </summary>
			marginRight: 0,
			/// <summary>
			/// A value that indicates the bottom margin of the gauge area.
			/// Default: 25.
			/// Type: Number.
			/// </summary>
			marginBottom: 0,
			/// <summary>
			/// A value that indicates the left margin of the gauge area.
			/// Default: 25.
			/// Type: Number.
			/// </summary>
			marginLeft: 0,
			/// <summary>
			/// An array that includes all settings which indicates 
			/// how to draw the range in the gauge.
			/// Default: [].
			/// Type :Array.
			/// </summary>
			ranges: [],
			/// <summary>
			/// Fires before the value changs, this event can be called.
			/// Default: null
			/// Type: Function
			/// Code example:
			/// Supply a function as an option.
			/// $("#gauge").wijgauge({
			///		beforeValueChanged: function(e, arg){}
			/// })
			/// Bind to the event by type: wijgaugebeforevaluechanged
			/// $("#gauge").bind("wijgaugebeforevaluechanged", function (e, arg) {});
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object
			/// </param>
			/// <param name="arg" type="Object">
			/// arg.oldValue: the gauge's old value.
			/// arg.newValue: the value to be seted.
			/// </param>
			beforeValueChanged: null,
			/// <summary>
			/// Fires when the value has changed.
			/// Default: null
			/// Type: Function
			/// Code example:
			/// Supply a function as an option.
			/// $("#gauge").wijgauge({
			///		valueChanged: function(e, arg){}
			/// })
			/// Bind to the event by type: wijgaugevaluechanged
			/// $("#gauge").bind("wijgaugevaluechanged", function (e, arg) {});
			// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object
			/// </param>
			/// <param name="arg" type="Object">
			/// arg.oldValue: the gauge's old value.
			/// arg.newValue: the value to be seted.
			/// </param>
			valueChanged: null,
			/// <summary>
			/// Fires before the canvas is painted. This event can be cancelled.
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#gauge").wijgauge({
			/// painted: function(e){}
			/// });
			/// Bind to the event by type: wijgaugepainted
			/// $("#gauge").bind("wijgaugepainted", function(e){});
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// </summary>
			painted: null
		},

		_create: function () {
			var self = this,
				o = self.options;
			
			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}
			
			if (self.element.is(":hidden") && self.element.wijAddVisibilityObserver) {
				self.element.wijAddVisibilityObserver(function () {
					self.redraw();
					if (self.element.wijRemoveVisibilityObserver) {
						self.element.wijRemoveVisibilityObserver();
					}
				}, "wijgauge");
			}
			
			if (isNaN(o.width)) {
				self._setDefaultWidth();
			}

			if (isNaN(o.height)) {
				self._setDefaultHeight();
			}

			self._setDefaultWidthHeight();
			if (o.disabled) {
				self.disable();
			}

			// handle the juice's function type
			if (o.face && o.face.template && 
				typeof o.face.template === "string" && window[o.face.template]) {
				o.face.template = window[o.face.template];
			}

			if (o.pointer && o.pointer.template && 
				typeof o.pointer.template === "string" && 
					window[o.pointer.template]) {
				o.pointer.template = window[o.pointer.template];
			}

			if (o.cap && o.cap.template &&
				typeof o.cap.template === "string" && window[o.cap.template]) {
				o.cap.template = window[o.cap.template];
			}

			self.element.addClass("ui-widget")
			.toggleClass("ui-state-disabled", o.disabled);

			self.canvas = new Raphael(self.element[0], o.width, o.height);
			self._autoCalculate();			
			self._draw();
		},

		_autoCalculate: function () {
			
		},

		_setDefaultWidth: function () {
			
		},

		_setDefaultHeight: function () {
		
		},

		_setDefaultWidthHeight: function () {
			var self = this,
				ele = self.element,
				o = self.options,
				style = ele.get(0).style,
				width = style.width,
				height = style.height;

			if (width !== "") {
				o.width = ele.width();
			}
				
			if (height !== "") {
				o.height = ele.height();
			}
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				oldValue = o[key];

			if (key === "disabled") {
				self._handleDisabledOption(value, self.element);
			}
			else if (key === "value") {
				if (o.disabled) { 
					return;
				}
				if (self._trigger("beforeValueChanged", null, 
					{ newValue: value, oldValue: oldValue })) {
					$.Widget.prototype._setOption.apply(self, arguments);
					self._set_value(value, oldValue);
				}
				self._trigger("valueChanged", null, 
					{ newValue: value, oldValue: oldValue });
			}			
			else {
				if (o.disabled) { 
					return;
				}		
				$.Widget.prototype._setOption.apply(self, arguments);
				if ($.isPlainObject(value)) {
					o[key] = $.extend({}, oldValue, value);
				}

				if (o.radius === "auto") {
					self._autoCalculate();
					self.redraw();
					return;
				}

				if (self["_set_" + key]) {
					self["_set_" + key](value, oldValue);
				}
			}
		},

		_set_value: function () {
			this._setPointer();
		},

		_set_max: function () {
			this._redrawMarksAndLabels();
			this._set_ranges();
			this._setPointer();
		},

		_set_min: function () {
			this._redrawMarksAndLabels();
			this._set_ranges();
			this._setPointer();
		},

		_set_width: function () {
			this.redraw();
		},

		_set_height: function () {
			this.redraw();
		},

		_set_tickMajor: function () {
			this._redrawMarksAndLabels();
		},

		_set_tickMinor: function () {
			this._redrawMarksAndLabels();
		},

		_set_pointer: function () {
			var self = this;
			if (self.pointer) {
				self.pointer.wijRemove();
			}
			self._paintPointer();
			self._setPointer();
		},

		_set_islogarithmic: function () {
			var self = this;
			self._redrawMarksAndLabels();
			self._setPointer();
		},

		_set_logarithmicBase: function () {
			var self = this;
			self._redrawMarksAndLabels();
			self._setPointer();
		},

		_set_labels: function () {
			this._redrawMarksAndLabels();
		},

		_set_margin: function (value, oldValue) {
			if (value !== oldValue) {
				this.redraw();
			}
		},

		_set_marginTop: function (value, oldValue) {
			this._set_margin(value, oldValue);
		},

		_set_marginBottom: function (value, oldValue) {
			this._set_margin(value, oldValue);
		},

		_set_marginLeft: function (value, oldValue) {
			this._set_margin(value, oldValue);
		},

		_set_marginRight: function (value, oldValue) {
			this._set_margin(value, oldValue);
		},

		_set_ranges: function () {
			var self = this;
			self._removeRanges();
			self._paintRanges();
		},

		_redrawMarksAndLabels: function () {
			var self = this;
			self._removeMarksAndLabels();
			self._drawMarksAndLabels();
		},

		_removeMarksAndLabels: function () {
			var self = this;
			$.each(self.labels, function (i, n) {
				n.wijRemove();
				self.labels[i] = null;
			});

			$.each(self.majorMarks, function (i, n) {
				n.wijRemove();
				self.majorMarks[i] = null;
			});

			$.each(self.minorMarks, function (i, n) {
				n.wijRemove();
				self.minorMarks[i] = null;
			});
		},

		_drawMarksAndLabels: function () {
			var self = this;
			self.labels = [];
			self.majorMarks = [];
			self.minorMarks = [];
			self._paintMarks();
		},

		_triggerPainted: function () {
			return this._trigger("painted");
		},

		_draw: function () {
			var self = this,
				o = self.options;
			
			self.pointer = null;

			self._innerBbox = {
				width: o.width - o.marginLeft - o.marginRight,
				height: o.height - o.marginTop - o.marginBottom,
				left: o.marginLeft,
				top: o.marginTop
			};

			self._paintFace();
			if (self.ranges) {
				self._removeRanges();
			}
			self._paintRanges();
			self._drawMarksAndLabels();
			self._paintPointer();
			if (self.pointer) {
				self._setOffPointerValue();
				self._setPointer();
			}
			$.wijraphael.clearRaphaelCache();
			self._triggerPainted();
		},

		redraw: function () {
			/// <summary>
			/// Redraw the gauge.
			/// </summary>
			var self = this,
				o = self.options;
			self.element.empty();
			self.canvas = new Raphael(self.element[0], o.width, o.height);
			self._draw();
		},

		destroy: function () {
			/// <summary>
			/// Remove the functionality completely. This will return the 
			/// element back to its pre-init state.
			/// Code example:
			/// $("#gauge").wijgauge("destroy");
			/// </summary>
			var self = this;
			
			self._unbindEvents(self.majorMarks);
			self._unbindEvents(self.minorMarks);
			self._unbindEvents(self.labels);

			self.element.removeClass("ui-widget").empty();
			//Add for fixing bug 16039
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for bug 16039
			$.Widget.prototype.destroy.apply(self, arguments);
		},

		getCanvas: function () {
			/// <summary>
			/// Returns a reference to the Raphael canvas object.
			/// Code example:
			/// $("gauge").wijgauge("getCanvas");
			/// </summary>
			/// <returns type="Raphael">
			/// Reference to raphael canvas object.
			/// </returns>
			return this.canvas;
		},

		_percentage: function () {
			var self = this,
				o = self.options,
				max = o.max,
				min = o.min,
				value = o.value;

			if (isNaN(value)) {
				return 0;
			}
			if (max === min) {
				return 1;
			}
			return (value - min) / (max - min);
		},

		_valueToLogical: function (value) {
			var self = this,
				o = self.options,
				min = o.min,
				max = o.max,
				logarithmicBase = o.logarithmicBase,
				linerValue, alpha;

			if (value < min) {
				return 0;
			}
			if (max < value) {
				return 1;
			}
			linerValue = (value - min) / (max - min);
			if (!o.islogarithmic) {
				alpha = linerValue;
			}
			else {
				alpha = $.wijgauge.math.log(1 + (logarithmicBase - 1) * 
					linerValue, o.logarithmicBase);
			}

			return alpha;
		},

		_logicalToValue: function (alpha) {
			var self = this,
				o = self.options,
				max = o.max,
				min = o.min,
				linearValue;

			if (alpha < 0) {
				return min;
			}
			if (1 <= alpha) {
				return max;
			}
			if (!o.islogarithmic) {
				linearValue = alpha;
			}
			else {
				if (o.logarithmicBase <= 1) {
					return o.min;
				}
				linearValue = (Math.pow(o.logarithmicBase, alpha) - 1) / 
					(o.logarithmicBase - 1);
				//linearValue = Math.pow(alpha, o.logarithmicBase);
			}
			return min + (max - min) * linearValue;
		},



		// paintFace
		_paintFace: function () {

		},

		_paintRanges: function () {
			var self = this,
				o = self.options,
				ranges = o.ranges || [];

			self.ranges = [];
			$.each(ranges, function (i, n) {
				self._paintRange(n);
			});
		},

		_removeRanges: function () {
			var self = this;
			$.each(self.ranges, function (i, n) {
				n.wijRemove();
				self.ranges[i] = null;
			});
		},

		// paint marks
		_paintMarks: function () {
			var self = this,
				o = self.options,
				generateValues = $.wijgauge.decoratorUtils.generateValues,
				majorMarks = generateValues(o.min, o.max, o.tickMajor.interval),
				minorMarks = generateValues(o.min, o.max, o.tickMinor.interval),
				labelInfo = o.labels,
				showLabels = labelInfo.visible;

			if (o.tickMajor.visible) {
				$.each(majorMarks, function (i, n) {
					self.majorMarks.push(self._paintMark(n, o.tickMajor, true));
					if (showLabels) {
						self.labels.push(self._paintLabel(n, labelInfo));
					}
				});
			}

			if (o.tickMinor.visible) {
				$.each(minorMarks, function (i, n) {
					var IsInMajor = false;
					$.each(majorMarks, function (k, m) {
						if (n === m) {
							IsInMajor = true;
							return false;
						}
					});
					if (!IsInMajor) {
						self.minorMarks.push(self._paintMark(n, o.tickMinor, false));
					}
				});
			}

			self._bindClickEvents(self.majorMarks);
			self._bindClickEvents(self.minorMarks);
			self._bindClickEvents(self.labels);			
		},

		_bindClickEvents: function (objs) {
			var self = this;
			$.each(objs, function (i, n) {
				$(n.node).bind("click." + self.widgetName, function (e) {
					self._trigger("click", e, {ele: n});
				});
			});
		},

		_unbindEvents: function (objs) {
			var self = this;
			$.each(objs, function (i, n) {
				$(n.node).unbind("." + self.widgetName);
			});
		},

		//paint a label
		_paintLabel: function () {

		},

		//paint a mark
		_paintMark: function () { },

		//paint a pointer
		_paintPointer: function () { },

		_setPointer: function (value) {
			$.wijraphael.clearRaphaelCache();
		},

		_setOffPointerValue: function () {
		 
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
				o = self.options,
				//Change your outerelement here
				ele = outerEle || self.element,
				eleOffset = ele.offset(),
				disabledWidth = o.width || ele.outerWidth(),
				disabledHeight = o.height || ele.outerHeight();

			return $("<div></div>")
					.addClass("ui-disabled")
					.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
		}

	});

} (jQuery));
