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
 *  Wijmo LinearGauge widget.
 *
 * Depends:
 *  jQuery.1.5.1.js
 *  jQuery.ui.core.js
 *  jQuery.ui.widget.js
 *	raphael.js
 *  jQuery.wijmo.rahpael.js
 *  jquery.wijmo.wijgauge.js
 */
(function ($) {
	"use strict";
	$.widget("wijmo.wijlineargauge", $.wijmo.wijgauge, {
		options: {
			/// <summary>
			/// A value that indicates the lineargauge shows as horizontal/vertical.
			/// Default: "horizontal".
			/// Type: String.
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "orientation", "vertical").
			/// </summary>
			orientation: "horizontal",
			/// <summary>
			/// A value that indicates the start location of the x axis.
			/// Default: 0.1
			/// Type: Number
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "xAxisLocation", 0.05).
			/// </summary>
			xAxisLocation: 0.1,
			/// <summary>
			/// A value that indicates the length of the x axis.
			/// Default: 0.8
			/// Type: Number
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "xAxisLocation", 0.85).
			/// </summary>
			xAxisLength: 0.8,
			/// <summary>
			/// A value that indicates the start location of the y axis.
			/// Default: 0.5
			/// Type: Number.
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "yAxisLocation", 0.5).
			/// </summary>
			yAxisLocation: 0.5,
			/// <summary>
			/// The width of the gauge.
			/// Default: "auto".
			/// Type: Number.
			/// Code example: $("#selector").wijlineargauge("option", "width", 500)
			/// </summary>
			width: "auto",
			/// <summary>
			/// The height of the gauge.
			/// Default: "auto".
			/// Type: Number.
			/// Code example: $("#selector").wijlineargauge("option", "height", 350)
			/// </summary>
			height: "auto",
			/// <summary>
			/// A value that includes all settings of the gauge pointer.
			/// Default: {length: 0.5, style: { fill: "#1E395B", stroke: "#1E395B"},
			/// width: 4, offset: 0, shape: "tri", visible: true, template: null}.
			/// Type: Object
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "pointer", {length: 0.85}).
			/// </summary>
			pointer: {
				/// <summary>
				/// An percent of the gauge's width / height.
				/// Default: 0.5.
				/// Type：Number.
				/// </summary>
				length: 0.5,
				/// <summary>
				/// The width of the pointer.
				/// Default: 4.
				/// Type: Number.
				/// </summary>
				width: 4,
				/// <summary>
				/// A value that indicates the distance the pointer moved.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0,
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
			/// A value that indicates the left margin of the gauge area.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#selector").wijlineargauge("option", "marginLeft", 200}).
			/// </summary>
			marginLeft: 5,
			/// <summary>
			/// A value that indicates the top margin of the gauge area.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#selector").wijlineargauge("option", "marginTop", 200}).
			/// </summary>
			marginTop: 5,
			/// <summary>
			/// A value that indicates the right margin of the gauge area.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "marginRight", 200}).
			/// </summary>
			marginRight: 5,
			/// <summary>
			/// A value that indicates the bottom margin of the gauge area.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#selector")
			/// .wijlineargauge("option", "marginBottom", 200}).
			/// </summary>
			marginBottom: 5
		},

		_setDefaultWidth: function () {
			var o = this.options;
			o.width = o.orientation === "horizontal" ? 310 : 70;
		},

		_setDefaultHeight: function () {
			var o = this.options;
			o.height = o.orientation === "horizontal" ? 70 : 310;
		},

		_set_orientation: function () {
			var self = this;
			self._setDefaultWidth();
			self._setDefaultHeight();
			self.markBbox = null;
			self.redraw();
		},

		_set_xAxisLocation: function () {
			this.redraw();
		},

		_set_xAxisLength: function () {
			this.redraw();
		},

		_set_yAxisLocation: function () {
			this.redraw();
		},

		_create: function () {
			$.wijmo.wijgauge.prototype._create.apply(this, arguments);
			this.element.addClass("wijmo-wijlineargauge");
		},

		_paintLabel: function (value, labelInfo) {
			var self = this,
				o = self.options,
				format = labelInfo.format,
				style = labelInfo.style,
				offset = labelInfo.offset,
				text = value,
				markOption = self.options.tickMajor,
				position = markOption.position || "inside",
				point, textEle, markBbox, labelBBox;

			if (format !== "") {
				text = $.wijgauge.formatString(value, format);
			}
			markBbox = self._getMarkerBbox();
			labelBBox = self._getLabelBBox(text);
			point = self._valueToPoint(value, 0);

			if (o.orientation === "horizontal") {
				if (position === "inside") {
					point.y = markBbox.y - labelBBox.height;
				}
				else {
					point.y = markBbox.y + markBbox.width;
				}

				point.y += offset;
			}
			else {
				if (position === "inside") {
					point.x = markBbox.x - labelBBox.width / 2;
				}
				else {
					point.x = markBbox.x + markBbox.width + labelBBox.width / 2;
				}

				point.x += offset;
			}
			textEle = self.canvas.text(point.x, point.y, text);
			textEle.attr(style);
			$.wijraphael.addClass($(textEle.node), "wijmo-wijlineargauge-label");
			return textEle;
		},

		_getLabelBBox: function (value) {
			var self = this,
				o = self.options,
				text, bbox;

			text = self.canvas.text(0, 0, value);
			text.attr(o.gaugeLableStyle);
			bbox = text.wijGetBBox();
			text.remove();
			return bbox;
		},

		_getMarkerBbox: function () {
			var self = this,
				o = self.options,
				markOption = o.tickMajor, markEle;

			if (!self.markBbox) {
				markEle = self._paintMark(0, markOption);
				self.markBbox = markEle.wijGetBBox();
				markEle.remove();
			}
			return self.markBbox;
		},

		_paintMark: function (value, opt, isMajor) {
			var self = this,
				o = self.options,
				marker = opt.marker || "rect",
				baseLength = marker === "rect" ? 5 : 2,
				point = self._valueToPoint(value, 0),
				position = opt.position || "inside",
				offset = opt.offset || 0,
				width = isMajor ? 2 : 1, length, markEle,
				style = $.extend({}, opt.style);

			length = baseLength * opt.factor;
			if ($.isFunction(marker)) {
				return marker.call(self, self.canvas, point, o);
			}
			else {
				if (marker === "cross") {
					style.stroke = style.fill;
				}
				if (o.orientation === "horizontal") {
					markEle = $.wijgauge.paintMarker(self.canvas, marker,
						point.x, point.y, width, length, true);
				}
				else {
					markEle = $.wijgauge.paintMarker(self.canvas, marker,
						point.x, point.y, length, width);
				}
			}
			markEle.attr(style);
			$.wijraphael.addClass($(markEle.node), "wijmo-wijlineargauge-mark");
			self._applyPosition(markEle, position, offset, value);
			return markEle;
		},

		_applyPosition: function (ele, position, offset, value) {
			var left = 0,
				top = 0,
				self = this,
				isHorizontal = self.options.orientation === "horizontal",
				bbox = ele.wijGetBBox();
			switch (position) {
				case "inside":
					if (isHorizontal) {
						top -= bbox.width / 2 + offset;
					}
					else {
						left -= bbox.width / 2 + offset;
					}
					break;
				case "outside":
					if (isHorizontal) {
						top += bbox.width / 2 + offset;
					}
					else {
						left += bbox.width / 2 + offset;
					}
					break;
				case "center":
					if (isHorizontal) {
						top -= offset;
					}
					else {
						left -= offset;
					}
					break;
				default:
					break;
			}

			ele.attr("transform", "t" + left + "," + top);
		},

		_paintFace: function () {
			var self = this, face,
				o = self.options,
				width = self._innerBbox.width,
				height = self._innerBbox.height,
				left = self._innerBbox.left,
				top = self._innerBbox.top,
				ui = {
					width: width,
					height: height,
					x: left,
					y: top,
					canvas: self.canvas
				};
			if (o.face && o.face.template &&
			$.isFunction(o.face.template)) {
				return o.face.template.call(self, ui);
			}
			face = self.canvas.rect(left, top, width, height, 5);
			if (o.face && o.face.style) {
				face.attr(o.face.style);
			}
			$.wijraphael.addClass($(face.node), "wijmo-wijlineargauge-face");
			return face;
		},

		_paintPointer: function () {
			var self = this,
				o = self.options,
				point = self._valueToPoint(0, 0),
				width = self._innerBbox.width,
				height = self._innerBbox.height,
				left = self._innerBbox.left,
				top = self._innerBbox.top,
				pointerInfo = o.pointer, pointer, length, offset, base;

			if (!pointerInfo.visible) {
				return;
			}

			base = o.orientation === "horizontal" ? height : width;
			offset = base * pointerInfo.offset;
			length = base * pointerInfo.length;

			if (pointerInfo.template && $.isFunction(pointerInfo.template)) {
				pointer = pointerInfo.template.call(self.canvas, point,
					$.extend({}, o.pointer, {
						offset: offset,
						length: length,
						gaugeBBox: self._innerBbox
					}));
			}
			else {
				if (o.orientation === "horizontal") {
					if (pointerInfo.shape === "rect") {
						pointer = self.canvas.rect(point.x - pointerInfo.width / 2,
							height - length - offset + top, pointerInfo.width, length);
					}
					else {
						pointer = self.canvas.isoTri(point.x,
							height - length - offset + top, pointerInfo.width,
							length, "north");
					}
				}
				else {
					if (pointerInfo.shape === "rect") {
						pointer = self.canvas.rect(width - length - offset + left,
							point.y - pointerInfo.width / 2, length, pointerInfo.width);
					}
					else {
						pointer = self.canvas.isoTri(width - length - offset + left,
							point.y - pointerInfo.width / 2, length, pointerInfo.width);
					}
				}
				pointer.attr(pointerInfo.style);
			}
			$.wijraphael.addClass($(pointer.node), "wijmo-wijlineargauge-pointer");
			self.pointer = pointer;
		},

		_setPointer: function () {
			var self = this,
				o = self.options;
			//				orientation = o.orientation,
			//				fromValue = orientation === "horizontal" ?
			//					self._minScreenPoint(0).x : self._minScreenPoint(0).y,
			//				endValue = orientation === "horizontal" ?
			//					self._maxScreenPoint(0).x : self._maxScreenPoint(0).y;

			if (!self.pointer) {
				return;
			}
			$.wijmo.wijgauge.prototype._setPointer.apply(this, arguments);
			self._setLinearPointer(o.value);
		},

		_setLinearPointer: function (value) {
			var self = this,
				o = self.options,
				startPoint = self._valueToPoint(0, 0),
				endPoint = self._valueToPoint(value, 0),
			//				fromBbox = self.pointer.wijGetBBox(),
				animation = o.animation,
				translation = { x: 0, y: 0 };

			// if use the transform("..."), the memeroy may leak. 
			// Using the absolute path instead of it.
			if (o.orientation === "horizontal") {
				//translation.x = endPoint.x - fromBbox.x - fromBbox.width / 2;
				translation.x = endPoint.x - startPoint.x;
			}
			else {
				//translation.y = endPoint.y - fromBbox.y - fromBbox.height / 2;
				translation.y = endPoint.y - startPoint.y;
			}
			if (animation.enabled) {
				self.pointer.stop()
					.wijAnimate({ transform: "t" + translation.x +
						"," + translation.y
					},
					animation.duration, animation.easing);
			}
			else {
				self.pointer.attr("transform", "t" +
					translation.x + "," + translation.y);
			}
		},

		_minScreenPoint: function (yOffset) {
			var self = this,
				o = self.options,
				width = self._innerBbox.width,
				height = self._innerBbox.height,
				left = self._innerBbox.left,
				top = self._innerBbox.top,
				totalOffset = o.yAxisLocation + yOffset;
			if (o.orientation === "horizontal") {
				return { x: width * o.xAxisLocation + left,
					y: height * totalOffset + top
				};
			}
			else {
				return { x: width * totalOffset + left,
					y: height * (1 - o.xAxisLocation) + top
				};
			}
		},

		_maxScreenPoint: function (yOffset) {
			var self = this,
				o = self.options,
				width = self._innerBbox.width,
				height = self._innerBbox.height,
				left = self._innerBbox.left,
				top = self._innerBbox.top,
				totalOffset = o.yAxisLocation + yOffset,
				end = o.xAxisLocation + o.xAxisLength;
			if (o.orientation === "horizontal") {
				return { x: width * end + left, y: height * totalOffset + top };
			}
			else {
				return { x: width * totalOffset + left, y: height * (1 - end) + top };
			}
		},

		_paintRange: function (range) {
			var self = this,
				o = self.options,
				calculateFrom = isNaN(range.startValue) ? 0 : range.startValue,
				calculateTo = isNaN(range.endValue) ? 0 : range.endValue,
				calculateStartWidth = isNaN(range.startWidth) ?
					(isNaN(range.width) ? 0 : range.width) : range.startWidth,
				calculateEndWidth = isNaN(range.endWidth) ?
					(isNaN(range.width) ? 0 : range.width) : range.endWidth,
				startDistance = range.startDistance || 0,
				endDistance = range.endDistance || 0,
				coercedFrom, coercedTo;

			if (calculateFrom !== calculateTo) {
				if (calculateTo > calculateFrom) {
					coercedFrom = Math.max(calculateFrom, o.min);
					coercedTo = Math.min(o.max, calculateTo);
				}
				else {
					coercedFrom = Math.max(o.min, calculateTo);
					coercedTo = Math.min(o.max, calculateFrom);
				}
				self._drawRange(coercedFrom, coercedTo, startDistance, endDistance,
					calculateStartWidth, calculateEndWidth, range);
			}

		},

		_drawRange: function (coercedFrom, coercedTo, startDistance, endDistance,
			calculateStartWidth, calculateEndWidth, range) {
			var self = this,
				o = self.options,
				orientation = o.orientation,
				width = self._innerBbox.width,
				height = self._innerBbox.height,
				left = self._innerBbox.left,
				top = self._innerBbox.top,
				p1 = self._valueToPoint(coercedFrom, 0),
				p2 = self._valueToPoint(coercedTo, 0), p3, p4, arrPath,
				rangeEl, startWidth, endWidth;

			if (orientation === "horizontal") {
				startWidth = calculateStartWidth * height;
				endWidth = calculateEndWidth * height;

				if (startDistance !== 0) {
					p1.y = startDistance * height + top;
				}
				if (endDistance !== 0) {
					p2.y = endDistance * height + top;
				}

				p3 = { x: p1.x, y: p1.y - startWidth };
				p4 = { x: p2.x, y: p2.y - endWidth };
			}
			else {
				startWidth = calculateStartWidth * width;
				endWidth = calculateEndWidth * width;
				if (startDistance !== 0) {
					p1.x = startDistance * width + left;
				}
				if (endDistance !== 0) {
					p2.x = endDistance * width + left;
				}
				p3 = { x: p1.x - startWidth, y: p1.y };
				p4 = { x: p2.x - endWidth, y: p2.y };
			}

			arrPath = ["M", p1.x, p1.y, "L", p2.x, p2.y,
				"L", p4.x, p4.y, "L", p3.x, p3.y, "Z"];
			rangeEl = self.canvas.path(arrPath.concat(" "));
			rangeEl.attr(range.style);
			$.wijraphael.addClass($(rangeEl.node), "wijmo-wijlineargauge-range");
			self.ranges.push(rangeEl);
		},

		_valueToPoint: function (value, offset) {
			var self = this,
				o = self.options, alpha, minPoint, maxPoint;

			if (o.max === o.min) {
				return { x: 0, y: 0 };
			}

			alpha = self._valueToLogical(value);
			minPoint = self._minScreenPoint(offset);
			maxPoint = self._maxScreenPoint(offset);

			return {
				x: minPoint.x * (1 - alpha) + maxPoint.x * alpha,
				y: minPoint.y * (1 - alpha) + maxPoint.y * alpha
			};
		}

	});
} (jQuery));