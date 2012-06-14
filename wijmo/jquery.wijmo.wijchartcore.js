/*globals $, Raphael, jQuery, document, window, Globalize, wijmoASPNetParseOptions*/
/*
*
* Wijmo Library 2.1.0
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
* licensing@wijmo.com
* http://wijmo.com/license
*
*
* * Wijmo Chart Core Widget.
*
* Depends:
*  raphael.js
*  globalize.js
*  jquery.svgdom.js
*  jquery.ui.widget.js
*
*/

(function ($) {
	"use strict";
	if (!window.Raphael) {
		return;
	}

	$.wijchart = {

		getDiffAttrs: function (attrs, newAttrs) {
			var result = {};

			$.each(newAttrs, function (key, attr) {
				if (typeof (attrs) === "undefined") {
					return true;
				} else if (typeof (attrs[key]) === "undefined") {
					result[key] = newAttrs[key];
				} else if (attrs[key] !== newAttrs[key]) {
					result[key] = newAttrs[key];
				}
			});

			return result;
		},

		paintShadow: function (element, offset, stroke) {
			if (element.removed || $(element).parent().length === 0) {
				return;
			}
			var shadow = element.clone(),
				newOffset = offset || 1,
				newStroke = stroke || "#cccccc";

			shadow.insertBefore(element);
			shadow.attr({
				// translation: newOffset + " " + newOffset,
				transform: Raphael.format("...T{0},{1}", newOffset, newOffset),
				stroke: newStroke,
				"stroke-width": newOffset
			});
			shadow.toBack();
			shadow.offset = newOffset;
			element.shadow = shadow;
		},

		getScaling: function (isVertical, max, min, length) {
			var dx = max - min;

			if (dx === 0) {
				dx = 1;
			}

			if (isVertical) {
				dx = -dx;
			}

			return length / dx;
		},

		getTranslation: function (isVertical, location, max, min, scaling) {
			var translation = 0;

			if (isVertical) {
				translation = location.y;
				translation -= scaling * max;
			} else {
				translation = location.x;
				translation -= scaling * min;
			}

			return translation;
		},

		getXSortedPoints: function (series) {
			var seriesX = series.data.x,
				tempX = [].concat(seriesX),
				tempY = [].concat(series.data.y),
				points = [],
				sortedX = seriesX;

			if (seriesX === undefined || seriesX.length === 0) {
				return;
			}

			function sortNumber(a, b) {
				return a - b;
			}

			if (typeof (seriesX[0]) === "number") {
				sortedX = [].concat(seriesX).sort(sortNumber);
			}

			$.each(sortedX, function (i, nSortedX) {
				$.each(tempX, function (j, nx) {
					if (nSortedX === nx) {
						if (typeof (nx) !== "number") {
							nx = i;
						}
						points.push({ x: nx, y: tempY[j] });
						tempX.splice(j, 1);
						tempY.splice(j, 1);
						return false;
					}
				});
			});

			return points;
		},

		sector: function (cx, cy, r, startAngle, endAngle) {
			var start = $.wijraphael.getPositionByAngle(cx, cy, r, startAngle),
				end = $.wijraphael.getPositionByAngle(cx, cy, r, endAngle);

			return ["M", cx, cy, "L", start.x, start.y, "A", r, r, 0,
					+(endAngle - startAngle > 180), 0, end.x, end.y, "z"];
		},

		donut: function (cx, cy, outerR, innerR, startAngle, endAngle) {
			var outerS = $.wijraphael.getPositionByAngle(cx, cy, outerR, startAngle),
				outerE = $.wijraphael.getPositionByAngle(cx, cy, outerR, endAngle),
				innerS = $.wijraphael.getPositionByAngle(cx, cy, innerR, startAngle),
				innerE = $.wijraphael.getPositionByAngle(cx, cy, innerR, endAngle),
				largeAngle = endAngle - startAngle > 180;

			return ["M", outerS.x, outerS.y,
				"A", outerR, outerR, 0, +largeAngle, 0, outerE.x, outerE.y,
				"L", innerE.x, innerE.y,
				"A", innerR, innerR, 0, +largeAngle, 1, innerS.x, innerS.y,
				"L", outerS.x, outerS.y, "z"];
		},

		getFirstValidListValue: function (values) {
			var val;
			$.each(values, function (idx, value) {
				if (value === null) {
					return true;
				} else if (typeof value === "undefined") {
					return true;
				} else if (typeof value === "number" && isNaN(value)) {
					return true;
				}
				val = value;
				return false;
			});
			return val;
		},

		getLastValidListValue: function (values) {
			var vals = [].concat(values).reverse();
			return $.wijchart.getFirstValidListValue(vals);
		},

		isHole: function (val, hole) {
			if (val === null) {
				return true;
			} else if (typeof val === "undefined") {
				return true;
			} else if (typeof val === "number" && isNaN(val)) {
				return true;
			}
			if (hole === null) {
				return false;
			}
			if (typeof val !== "undefined") {
				// for datetime, if use val === hole it returns false.
				if (val - hole === 0) {
					return true;
				}
				return false;
			}
			return false;
		}
	};

	var defaultOptions = {
		content: "",
		contentStyle: {},
		title: "",
		titleStyle: {},
		style: {
			fill: "white",
			"fill-opacity": 0.5
		},
		closeBehavior: "auto",
		mouseTrailing: true,
		triggers: "hover",
		animated: "fade",
		showAnimated: null,
		hideAnimated: null,
		duration: 500,
		showDuration: 500,
		hideDuration: 500,
		easing: null,
		showEasing: null,
		hideEasing: null,
		showDelay: 150,
		hideDelay: 150,
		relativeTo: "mouse",
		compass: "east",
		offsetX: 0,
		offsetY: 0,
		showCallout: true,
		calloutFilled: false,
		calloutFilledStyle: {
			fill: "black"
		},
		calloutLength: 12,
		calloutOffset: 0,
		calloutAnimation: {
			easing: null,
			duration: 500
		},
		windowCollisionDetection: true,
		calloutSide: null,
		width: null,
		height: null,
		beforeShowing: null
	};

	Raphael.fn.closeBtn = function (x, y, length) {
		var offset = Math.cos(45 * Math.PI / 180) * length,
			set = this.set(),
			arrPath = ["M", x - offset, y - offset, "L", x + offset, y + offset,
				"M", x - offset, y + offset, "L", x + offset, y - offset],
			path = this.path(arrPath.concat(" ")),
			rect = null;
		path.attr({ cursor: "pointer" });
		set.push(path);

		rect = this.rect(x - length, y - length, length * 2, length * 2);
		rect.attr({
			fill: "white",
			"fill-opacity": 0,
			cursor: "pointer",
			stroke: "none"
		});
		set.push(rect);
		return set;
	};

	Raphael.fn.tooltip = function (targets, options) {
		var o = $.extend(true, {}, defaultOptions, options),
			self = this,
			position = null,
			offsetX = 0,
			offsetY = 0,
			content,
			title,
			container,
			closeBtn,
			callout,
			intentShowTimer = null,
			intentHideTimer = null,
			lastPoint = null,
			closeBtnLength = 5,
			elements = null,
			animations = self.tooltip.animations,
			calloutOffset = o.calloutOffset,
			width = o.width,
			height = o.height,
			gapLength = o.calloutLength / 2,
			offsetLength = 0,
		// oX,oY is the default offset of the tooltip
			oX = 0,
			oY = 0,
			selector,

			_getShowPoint = function (raphaelObj, compass) {
				var box = raphaelObj.getBBox(),
					point = {
						x: 0,
						y: 0
					};
				switch (compass.toLowerCase()) {
				case "east":
					point.x = box.x + box.width;
					point.y = box.y + box.height / 2;
					break;
				case "eastnorth":
					point.x = box.x + box.width;
					point.y = box.y;
					break;
				case "eastsouth":
					point.x = box.x + box.width;
					point.y = box.y + box.height;
					break;
				case "west":
					point.x = box.x;
					point.y = box.y + box.height / 2;
					break;
				case "westnorth":
					point.x = box.x;
					point.y = box.y;
					break;
				case "westsouth":
					point.x = box.x;
					point.y = box.y + box.height;
					break;
				case "north":
					point.x = box.x + box.width / 2;
					point.y = box.y;
					break;
				case "northeast":
					point.x = box.x + box.width;
					point.y = box.y;
					break;
				case "northwest":
					point.x = box.x;
					point.y = box.y;
					break;
				case "south":
					point.x = box.x + box.width / 2;
					point.y = box.y + box.height;
					break;
				case "southeast":
					point.x = box.x + box.width;
					point.y = box.y + box.height;
					break;
				case "southwest":
					point.x = box.x;
					point.y = box.y + box.height;
					break;
				}
				return point;
			},

			_clearIntentTimer = function (timer) {
				if (timer) {
					window.clearTimeout(timer);
					timer = null;
				}
			},

			_removeTooltip = function (duration) {
				if (elements) {
					var animated,
						d,
						op;
					if (o.hideAnimated || o.animated) {
						animated = o.hideAnimated;
						if (!animated) {
							animated = o.animated;
						}
						if (animated && animations[animated]) {
							op = {
								animated: animated,
								duration: o.hideDuration || o.duration,
								easing: o.hideEasing || o.easing,
								context: elements,
								show: false
							};
							animations[animated](op);
						}
					}
					d = o.hideDuration;
					if (duration) {
						d = duration;
					}
					window.setTimeout(function () {
						var i,
							ii;
						if (content) {
							content.wijRemove();
							content = null;
						}
						if (title) {
							title.wijRemove();
							title = null;
						}
						if (container) {
							container.wijRemove();
							container = null;
						}
						if (closeBtn) {
							for (i = 0, ii = closeBtn.length; i < ii; i++) {
								closeBtn[i].unclick();
							}
							closeBtn.wijRemove();
							closeBtn = null;
						}
						if (callout) {
							callout.wijRemove();
							callout = null;
						}
						lastPoint = null;
						elements = null;
					}, d);
				}
			},

			_clearTimers = function () {
				if (intentShowTimer) {
					_clearIntentTimer(intentShowTimer);
				}
				if (intentHideTimer) {
					_clearIntentTimer(intentHideTimer);
				}
			},

			_hide = function () {
				_clearTimers();
				if (o.hideDelay) {
					intentHideTimer = window.setTimeout(function () {
						_removeTooltip();
					}, o.hideDelay);
				} else {
					_removeTooltip();
				}
			},

			_convertCompassToPosition = function (compass) {
				var position = "";
				switch (compass.toLowerCase()) {
				case "east":
					position = "right-middle";
					oX = 2;
					oY = 0;
					break;
				case "eastnorth":
					position = "right-top";
					oX = 2;
					oY = -2;
					break;
				case "eastsouth":
					position = "right-bottom";
					oX = 2;
					oY = 2;
					break;
				case "west":
					position = "left-middle";
					oX = -2;
					oY = 0;
					break;
				case "westnorth":
					position = "left-top";
					oX = -2;
					oY = -2;
					break;
				case "westsouth":
					position = "left-bottom";
					oX = -2;
					oY = 2;
					break;
				case "north":
					position = "top-middle";
					oX = 0;
					oY = -2;
					break;
				case "northeast":
					position = "top-right";
					oX = 2;
					oY = -2;
					break;
				case "northwest":
					position = "top-left";
					oX = -2;
					oY = -2;
					break;
				case "south":
					position = "bottom-middle";
					oX = 0;
					oY = 2;
					break;
				case "southeast":
					position = "bottom-right";
					oX = 2;
					oY = 2;
					break;
				case "southwest":
					position = "bottom-left";
					oX = -2;
					oY = 2;
					break;
				}
				return position;
			},

			_getCalloutArr = function (p, offset) {
				var arr = [],
					compass = o.compass;
				if (o.calloutSide) {
					compass = o.calloutSide;
				}
				switch (compass.toLowerCase()) {
				case "east":
				case "eastsouth":
				case "eastnorth":
					arr = ["M", p.x + offset, p.y + offset, "l",
					-offset, -offset, "l", offset, -offset, "Z"];
					break;
				case "west":
				case "westsouth":
				case "westnorth":
					arr = ["M", p.x - offset, p.y - offset, "l",
					offset, offset, "l", -offset, offset, "Z"];
					break;
				case "north":
				case "northeast":
				case "northwest":
					arr = ["M", p.x - offset, p.y - offset, "l",
					offset, offset, "l", offset, -offset, "Z"];
					break;
				case "south":
				case "southeast":
				case "southwest":
					arr = ["M", p.x - offset, p.y + offset, "l",
					offset, -offset, "l", offset, offset, "Z"];
					break;
				}
				return arr;
			},

			_getFuncText = function (text, e) {
				if ($.isFunction(text)) {
					var fmt = null, objTar,
						obj = {
							target: null,
							fmt: text
						},
						t;
					if (e && e.target) {
						// obj.target = $(e.target).data("raphaelObj");
						// objTar = $(e.target).data("raphaelObj");
						// if (!objTar) {
						// objTar = $(e.target.parentNode).data("raphaelObj");
						// }
						// obj.target = objTar;
						t = e.target;
						if (!t.raphael || !t.raphaelid) {
							t = t.parentNode;
						}
						if (t.raphael && t.raphaelid) {
							objTar = self.getById(t.raphaelid);
							obj.target = objTar;
						}
						else {
							obj.target = e.target;
						}
					}
					fmt = $.proxy(obj.fmt, obj);
					return fmt().toString();
				}
				return text;
			},

			_translateCallout = function (duration) {
				if (o.calloutSide) {
					var offset = gapLength || offsetLength;
					switch (o.calloutSide) {
					case "south":
					case "north":
						if (duration) {
							callout.animate({
								"translation": (-width / 2 + offset + calloutOffset) +
								",0"
							}, duration);
						} else {
							callout.translate(-width / 2 + offset + calloutOffset, 0);
						}
						break;
					case "east":
					case "west":
						if (duration) {
							callout.animate({
								"translation": "0," + (-height / 2 +
							offset + calloutOffset)
							}, duration);
						} else {
							callout.translate(0, -height / 2 + offset + calloutOffset);
						}
						break;
					}
				}
			},

			tokenRegex = /\{([^\}]+)\}/g,
		// matches .xxxxx or ["xxxxx"] to run over object properties
			objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
			replacer = function (all, key, obj) {
				var res = obj;
				key.replace(objNotationRegex,
					function (all, name, quote, quotedName, isFunc) {
						name = name || quotedName;
						if (res) {
							if (res[name] !== typeof ('undefined')) {
								res = res[name];
							}
							if (typeof res === "function" && isFunc) {
								res = res();
							}
						}
					});
				res = (res === null || res === obj ? all : res).toString();
				return res;
			},
			fill = function (str, obj) {
				return String(str).replace(tokenRegex, function (all, key) {
					return replacer(all, key, obj);
				});
			},
			_createPath = function (point, position, set, gapLength, offsetLength) {
				var pos = position.split("-"),
					r = 5,
					bb = set.getBBox(),
					w = Math.round(bb.width),
					h = Math.round(bb.height),
					x = Math.round(bb.x) - r,
					y = Math.round(bb.y) - r,
					gap = 0,
					off = 0,
					dx = 0,
					dy = 0,
					shapes = null,
					mask = null,
					out = null;
				if (o.width) {
					w = w > o.width ? w : o.width;
				}
				if (o.height) {
					h = h > o.height ? h : o.height;
				}
				width = w;
				height = h;
				gap = Math.min(h / 4, w / 4, gapLength);
				if (offsetLength) {
					offsetLength = Math.min(h / 4, w / 4, offsetLength);
				}
				if (offsetLength) {
					off = offsetLength;
					shapes = {
						top: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}l-{right}," +
							"0-{offset},0,-{left},0a{r},{r},0,0,1-{r}-{r}" +
							"v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
						bottom: "M{x},{y}l{left},0,{offset},0,{right},0a{r},{r}," +
							"0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r}," +
							"{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}" +
							"v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
						right: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}" +
							"h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}" +
							"l0-{bottom},0-{offset},0-{top}a{r},{r},0,0,1,{r}-{r}z",
						left: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"l0,{top},0,{offset},0,{bottom}a{r},{r},0,0,1,-{r}," +
							"{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}" +
							"v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z"
					};
				} else {
					shapes = {
						top: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}" +
							"l-{right},0-{gap},{gap}-{gap}-{gap}-{left},0a{r},{r},0,0,1" +
							"-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
						bottom: "M{x},{y}l{left},0,{gap}-{gap},{gap},{gap},{right},0" +
							"a{r},{r},0,0,1,{r},{r}v{h4},{h4},{h4},{h4}a{r},{r},0,0,1," +
							"-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0," +
							"1-{r}-{r}v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z",
						right: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"v{h4},{h4},{h4},{h4}a{r},{r},0,0,1,-{r},{r}h-{w4}-{w4}" +
							"-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}l0-{bottom}-{gap}-{gap}," +
							"{gap}-{gap},0-{top}a{r},{r},0,0,1,{r}-{r}z",
						left: "M{x},{y}h{w4},{w4},{w4},{w4}a{r},{r},0,0,1,{r},{r}" +
							"l0,{top},{gap},{gap}-{gap},{gap},0,{bottom}a{r},{r},0,0,1," +
							"-{r},{r}h-{w4}-{w4}-{w4}-{w4}a{r},{r},0,0,1-{r}-{r}" +
							"v-{h4}-{h4}-{h4}-{h4}a{r},{r},0,0,1,{r}-{r}z"
					};
				}
				mask = [{
					x: x + r,
					y: y,
					w: w,
					w4: w / 4,
					h4: h / 4,
					left: 0,
					right: w - gap * 2 - off * 2,
					top: 0,
					bottom: h - gap * 2 - off * 2,
					r: r,
					h: h,
					gap: gap,
					offset: off * 2
				}, {
					x: x + r,
					y: y,
					w: w,
					w4: w / 4,
					h4: h / 4,
					left: w / 2 - gap - off,
					right: w / 2 - gap - off,
					top: h / 2 - gap - off,
					bottom: h / 2 - gap - off,
					r: r,
					h: h,
					gap: gap,
					offset: off * 2
				}, {
					x: x + r,
					y: y,
					w: w,
					w4: w / 4,
					h4: h / 4,
					right: 0,
					left: w - gap * 2 - off * 2,
					bottom: 0,
					top: h - gap * 2 - off * 2,
					r: r,
					h: h,
					gap: gap,
					offset: off * 2
				}][pos[1] === "middle" ? 1 : (pos[1] === "left" || pos[1] === "top") * 2];
				out = self.path(fill(shapes[pos[0]], mask));
				switch (pos[0]) {
				case "top":
					dx = point.x - (x + r + mask.left + gap + offsetLength);
					dy = point.y - (y + r + h + r + gap + offsetLength);
					break;
				case "bottom":
					dx = point.x - (x + r + mask.left + gap + offsetLength);
					dy = point.y - (y - gap - offsetLength);
					break;
				case "left":
					dx = point.x - (x + r + w + r + gap + offsetLength);
					dy = point.y - (y + r + mask.top + gap + offsetLength);
					break;
				case "right":
					dx = point.x - (x - gap - off);
					dy = point.y - (y + r + mask.top + gap + off);
					break;
				}
				out.translate(dx, dy);
				set.translate(dx, dy);
				return out;
			},

			_isWindowCollision = function (container, compass, offsetX, offsetY, ox, oy) {
				var box = container.getBBox(),
					counter = 0,
					cps = compass,
					x = box.x + ox,
					y = box.y + oy,
					w = self.width,
					h = self.height,
					offX = offsetX,
					offY = offsetY;
				if (self.raphael.vml) {
					w = $(self.canvas).width();
					h = $(self.canvas).height();
				}
				if (x + offsetX < 0) {
					// counter++;
					if (cps.toLowerCase().indexOf("west") === -1) {
						// check if window collision after change compass.
						if (x + box.width / 2 + box.width - offsetX <= w) {
							counter++;
							cps = cps.toLowerCase() + "east";
							offX = 0 - offsetX;
						}
					} else {
						if (x + box.width + box.width - offsetX <= w) {
							counter++;
							cps = cps.toLowerCase().replace("west", "east");
							offX = 0 - offsetX;
						}
					}
				}
				if (y + offsetY < 0) {
					// counter++;
					if (cps.toLowerCase().indexOf("north") === -1) {
						// check if window collision after change compass.
						if (y + box.height / 2 + box.height - offsetY <= h) {
							counter++;
							cps = cps.toLowerCase() + "south";
							offY = 0 - offsetY;
						}
					} else {
						if (y + box.height + box.height - offsetY <= h) {
							counter++;
							cps = cps.toLowerCase().replace("north", "south");
							offY = 0 - offsetY;
						}
					}
				}
				if (x + box.width + offsetX > w) {
					// counter++;
					if (cps.toLowerCase().indexOf("east") === -1) {
						// check if window collision after change compass.
						if (x - box.width / 2 - offsetX >= 0) {
							counter++;
							cps = cps.toLowerCase() + "west";
							offX = 0 - offsetX;
						}
					} else {
						if (x - box.width - offsetX >= 0) {
							counter++;
							cps = cps.toLowerCase().replace("east", "west");
							offX = 0 - offsetX;
						}
					}
				}
				if (y + box.height + offsetY > h) {
					// counter++;
					if (cps.toLowerCase().indexOf("south") === -1) {
						// check if window collision after change compass.
						if (y - box.height / 2 - offsetY >= 0) {
							counter++;
							cps = cps.toLowerCase() + "north";
							offY = 0 - offsetY;
						}
					} else {
						if (y - box.height - offsetY >= 0) {
							counter++;
							cps = cps.toLowerCase().replace("south", "north");
							offY = 0 - offsetY;
						}
					}
				}
				if (counter) {
					return {
						compass: cps,
						offsetX: offX,
						offsetY: offY
					};
				}
				return false;
			},

			_createTooltipEles = function (point, tit, cont, windowCollisionDetection,
					compass, offsetX, offsetY) {
				var titleBox,
					contentBox,
					position,
					set = self.set(),
					arrPath = null,
					animated = null,
					op = null,
					ox = 0,
					oy = 0,
					duration = 250,
					idx = 0,
					len = 0,
					isWindowCollision,
					newPoint = {
						x: point.x,
						y: point.y
					},
					anim = null;

				$.wijraphael.clearRaphaelCache();
				position = _convertCompassToPosition(compass);
				newPoint.x += offsetX + oX;
				newPoint.y += offsetY + oY;
				elements = self.set();
				if (title) {
					$.each(title, function (i, t) {
						$(t.node).unbind(".Rtooltip");
					});
					title.wijRemove();
				}
				if (tit && tit.length > 0) {
					title = self.htmlText(-1000, -1000, tit, o.titleStyle);
					elements.push(title);
					titleBox = title.getBBox();
				} else {
					titleBox = {
						left: -1000,
						top: -1000,
						width: 0,
						height: 0
					};
				}
				if (content) {
					$.each(content, function (i, c) {
						$(c.node).unbind(".Rtooltip");
					});
					content.wijRemove();
				}
				if (cont && cont.length > 0) {
					content = self.htmlText(-1000, -1000, cont, o.contentStyle);
					elements.push(content);
					contentBox = content.getBBox();
				} else {
					contentBox = {
						left: -1000,
						top: -1000,
						width: 0,
						height: 0
					};
				}
				if (closeBtn) {
					for (idx = 0, len = closeBtn.length; idx < len; idx++) {
						closeBtn[idx].unclick();
					}
					closeBtn.wijRemove();
				}
				if (content) {
					// content.translate(0, titleBox.height / 2 +
					// contentBox.height / 2);
					content.transform(Raphael.format("T0,{0}",
					titleBox.height / 2 + contentBox.height / 2));
				}
				if (o.closeBehavior === "sticky") {
					closeBtn = self.closeBtn(-1000, -1000, closeBtnLength);
					elements.push(closeBtn);
					if (o.width && o.width > titleBox.width + closeBtnLength * 2 &&
							o.width > contentBox.width + closeBtnLength * 2) {
						// closeBtn.translate(o.width - closeBtnLength,
						// closeBtnLength);
						closeBtn.transform(Raphael.format("T{0},{1}",
						o.width - closeBtnLength, closeBtnLength));
					} else if (titleBox.width >= contentBox.width - closeBtnLength * 2) {
						// closeBtn.translate(titleBox.width +
						// closeBtnLength, closeBtnLength);
						closeBtn.transform(Raphael.format("T{0},{1}",
						titleBox.width + closeBtnLength, closeBtnLength));
					} else {
						// closeBtn.translate(contentBox.width -
						// closeBtnLength, closeBtnLength);
						closeBtn.transform(Raphael.format("T{0},{1}",
						contentBox.width - closeBtnLength, closeBtnLength));
					}

					// bind click event.
					$.each(closeBtn, function () {
						this.click(function (e) {
							_hide(e);
						});
					});
				}
				if (title) {
					set.push(title);
					if (o.relatedElement) {
						title.insertBefore(o.relatedElement);
					}
				}
				if (content) {
					set.push(content);
					if (o.relatedElement) {
						content.insertBefore(o.relatedElement);
					}
				}
				if (closeBtn) {
					set.push(closeBtn);
					if (o.relatedElement) {
						closeBtn.insertBefore(o.relatedElement);
					}
				}
				if (!o.showCallout) {
					gapLength = 0;
				}
				if (o.calloutSide || o.calloutFilled) {
					gapLength = 0;
					offsetLength = o.calloutLength / 2;
					if (o.calloutSide) {
						position = _convertCompassToPosition(o.calloutSide);
					}
				}
				if (o.calloutSide && set.length === 0) {
					content = self.htmlText(-1000, -1000, " ");
					set.push(content);
					if (o.relatedElement) {
						content.insertBefore(o.relatedElement);
					}
				}
				if (callout) {
					$(callout.node).unbind(".Rtooltip");
					callout.wijRemove();
				}
				if (container) {
					$(container.node).unbind(".Rtooltip");
					container.wijRemove();
				}
				// container = self.path();
				if (lastPoint) {
					if (o.showCallout && (o.calloutSide || o.calloutFilled)) {
						arrPath = _getCalloutArr(lastPoint, offsetLength);

						callout = self.path(arrPath.concat(" "));
						if (o.relatedElement) {
							callout.insertBefore(o.relatedElement);
						}
						if (o.calloutFilled) {
							callout.attr(o.calloutFilledStyle);
						}
						if (o.calloutSide) {
							_translateCallout(0);
						}
					}
					container = _createPath(lastPoint, position,
						set, gapLength, offsetLength);
					if (o.relatedElement) {
						container.insertBefore(o.relatedElement);
					}
					if (windowCollisionDetection) {
						isWindowCollision = _isWindowCollision(container,
							compass, offsetX, offsetY, newPoint.x - lastPoint.x,
							newPoint.y - lastPoint.y);
						// TODO: window collision
						if (isWindowCollision) {
							_createTooltipEles(point, tit, cont, false,
								isWindowCollision.compass, isWindowCollision.offsetX,
								isWindowCollision.offsetY);
							return;
						}
					}
					elements.push(callout);
					elements.push(container);
					ox = newPoint.x - lastPoint.x;
					oy = newPoint.y - lastPoint.y;
					anim = Raphael.animation({ transform: Raphael
					.format("...T{0},{1}", ox, oy)
					}, duration);
					if (container) {
						// container.animate({ "translation": ox + "," + oy },
						// duration);
						container.animate(anim);
					}
					if (title) {
						// title.animate({ "translation": ox + "," + oy },
						// duration);
						title.animate(anim);
					}
					if (content) {
						// content.animate({ "translation": ox + "," + oy },
						// duration);
						content.animate(anim);
					}
					if (closeBtn) {
						// closeBtn.animate({ "translation": ox + "," + oy },
						// duration);
						closeBtn.animate(anim);
					}
					if (callout) {
						// callout.animate({ "translation": ox + "," + oy },
						// duration);
						callout.animate(anim);
					}
				} else {
					if (o.showCallout && (o.calloutSide || o.calloutFilled)) {
						arrPath = _getCalloutArr(newPoint, offsetLength);
						callout = self.path(arrPath.concat(" "));
						if (o.relatedElement) {
							callout.insertBefore(o.relatedElement);
						}
						if (o.calloutFilled) {
							callout.attr(o.calloutFilledStyle);
						}
						if (o.calloutSide) {
							_translateCallout(0);
						}
					}
					container = _createPath(newPoint, position,
						set, gapLength, offsetLength);
					if (o.relatedElement) {
						container.insertBefore(o.relatedElement);
					}
					if (windowCollisionDetection) {
						isWindowCollision = _isWindowCollision(container,
							compass, offsetX, offsetY, 0, 0);
						// TODO: window collision
						if (isWindowCollision) {
							_createTooltipEles(point, tit, cont, false,
								isWindowCollision.compass, isWindowCollision.offsetX,
								isWindowCollision.offsetY);
							return;
						}
					}
					elements.push(callout);
					elements.push(container);
					if (o.showAnimated || o.animated) {
						animated = o.showAnimated;
						if (!animated) {
							animated = o.animated;
						}
						if (animated && animations[animated]) {
							op = {
								animated: animated,
								duration: o.showDuration || o.duration,
								easing: o.showEasing || o.easing,
								context: elements,
								show: true
							};
							animations[animated](op);
						}
					}
				}
				lastPoint = newPoint;
				container.attr(o.style);
				// container.toFront();
				if (o.relatedElement) {
					if (title) {
						title.insertBefore(o.relatedElement);
					}
					if (content) {
						content.insertBefore(o.relatedElement);
					}
					if (closeBtn) {
						closeBtn.insertBefore(o.relatedElement);
					}
				} else {
					set.toFront();
				}
				// set.toFront();
				/*
				* if (o.closeBehavior === "auto") {
				* $(container.node).bind("mouseover.Rtooltip", function (e) {
				* _clearTimers(); }).bind("mouseout.Rtooltip", function (e) {
				* _hide(e); }); if (title) { $.each(title, function (i, t) {
				* $(t.node).bind("mouseover.Rtooltip", function (e) {
				* _clearTimers(); }).bind("mouseout.Rtooltip", function (e) {
				* _hide(e); }); }); } if (content) { $.each(content, function
				* (i, c) { $(c.node).bind("mouseover.Rtooltip", function (e) {
				* _clearTimers(); }).bind("mouseout.Rtooltip", function (e) {
				* _hide(e); }); }); } if (callout) {
				* $(callout.node).bind("mouseover.Rtooltip", function (e) {
				* _clearTimers(); }).bind("mouseout.Rtooltip", function (e) {
				* _hide(e); }); } }
				*/
			},

			_createTooltip = function (point, e) {
				var tit = null,
					cont = null,
					fmt = null,
					obj = null,
					objTar, t;
				if ($.isFunction(o.beforeShowing)) {
					fmt = null;
					obj = {
						target: null,
						options: o,
						fmt: o.beforeShowing
					};
					if (e && e.target) {
						// objTar = $(e.target).data("raphaelObj");
						// if (!objTar) {
						// objTar = $(e.target.parentNode).data("raphaelObj");
						// }
						// obj.target = objTar;
						t = e.target;
						if (!t.raphael || !t.raphaelid) {
							t = t.parentNode;
						}
						if (t.raphael && t.raphaelid) {
							objTar = self.getById(t.raphaelid);
							obj.target = objTar;
						} else {
							objTar = e.target;
							obj.target = objTar;
						}
					}
					fmt = $.proxy(obj.fmt, obj);
					fmt();
				}
				tit = o.title;
				cont = o.content;
				tit = _getFuncText(tit, e);
				cont = _getFuncText(cont, e);
				if (!tit && !cont) {
					return;
				}

				_createTooltipEles(point, tit, cont, o.windowCollisionDetection,
					o.compass, o.offsetX, o.offsetY);
			},

			_showAt = function (point, e) {
				_clearTimers();
				if (o.showDelay) {
					intentShowTimer = window.setTimeout(function () {
						_createTooltip(point, e);
					}, o.showDelay);
				} else {
					_createTooltip(point, e);
				}
			},

			_show = function (e) {
				position = $(self.canvas.parentNode).offset();
				offsetX = position.left;
				offsetY = position.top;
				var relativeTo = o.relativeTo,
					point = {
						x: 0,
						y: 0
					},
					raphaelObj = null,
					t = e.target;
				switch (relativeTo) {
				case "mouse":
					point.x = e.pageX - offsetX;
					point.y = e.pageY - offsetY;
					break;
				case "element":
					if (!t.raphael || !t.raphaelid) {
						t = t.parentNode;
					}
					if (t.raphael && t.raphaelid) {
						raphaelObj = self.getById(t.raphaelid);
						point = _getShowPoint(raphaelObj, o.compass);
					}
					// raphaelObj = $(e.target).data("raphaelObj");
					// if (!raphaelObj) {
					// raphaelObj = $(e.target.parentNode).data("raphaelObj");
					// }
					// point = _getShowPoint(raphaelObj, o.compass);
					break;
				}
				_showAt(point, e);
			},

			_bindEvent = function (tar) {
				switch (o.triggers) {
				case "hover":
					$(tar.node).bind("mouseover.Rtooltip", function (e) {
						_show(e);
					}).bind("mouseout.Rtooltip", function (e) {
						if (o.closeBehavior === "auto") {
							_hide(e);
						}
					});
					if (o.mouseTrailing && o.relativeTo === "mouse") {
						$(tar.node).bind("mousemove.Rtooltip", function (e) {
							_show(e);
						});
					}
					break;
				case "click":
					$(tar.node).bind("click.Rtooltip", function (e) {
						_show(e);
					});
					break;
				case "custom":
					break;
					/*
					* case "rightClick": $(tar.node).bind("contextmenu.Rtooltip",
					* function (e) { _show(e); }); break;
					*/ 
				}
			},

			_bindLiveEvent = function (tars) {
				var i,
					ii;
				if (tars) {
					if (tars.length) {
						for (i = 0, ii = tars.length; i < ii; i++) {
							_bindEvent(tars[i]);
						}
					} else {
						_bindEvent(tars);
					}
				}
			},

			_bindLiveEventBySelector = function () {
				if (selector) {
					switch (o.triggers) {
					case "hover":
						selector.live("mouseover.Rtooltip", function (e) {
							_show(e);
						}).live("mouseout.Rtooltip", function (e) {
							if (o.closeBehavior === "auto") {
								_hide(e);
							}
						});
						if (o.mouseTrailing && o.relativeTo === "mouse") {
							selector.live("mousemove.Rtooltip", function (e) {
								_show(e);
							});
						}
						break;
					case "click":
						selector.live("click.Rtooltip", function (e) {
							_show(e);
						});
						break;
					case "custom":
						break;
						/*
						* case "rightClick":
						* $(tar.node).bind("contextmenu.Rtooltip", function (e) {
						* _show(e); }); break;
						*/ 
					}
				}
			},

			_unbindLiveEvent = function () {
				var i,
					ii;
				if (targets) {
					if (targets.length) {
						for (i = 0, ii = targets.length; i < ii; i++) {
							$(targets[i].node).unbind(".Rtooltip");
						}
					} else {
						$(targets.node).unbind(".Rtooltip");
					}
				}
				if (selector) {
					selector.die("Rtooltip")
					// for jQuery 1.7.1
					.die(".Rtooltip");
				}
			},

			_destroy = function () {
				_unbindLiveEvent();
				_removeTooltip(0);
			},

			Tooltip = function () {

				this.hide = function () {
					_hide();
				};

				// this.show = function () {
				// };

				this.showAt = function (point) {
					_showAt(point);
				};

				this.resetCalloutOffset = function (offset) {
					var currentOffset = o.calloutOffset,
						side = o.calloutSide,
						ani = o.calloutAnimation;
					if (callout) {
						if (side === "south" || side === "north") {
							callout.animate({
								"translation": (offset - currentOffset) + ",0"
							}, ani.duration, ani.easing);
						} else if (side === "east" || side === "west") {
							callout.animate({
								"translation": "0," + (offset - currentOffset)
							}, ani.duration, ani.easing);
						}
					}
					o.calloutOffset = offset;
				};

				this.destroy = function () {
					_destroy();
				};

				this.getOptions = function () {
					return o;
				};

				this.setTargets = function (targets) {
					_bindLiveEvent(targets);
				};

				this.setSelector = function (sel) {
					selector = sel;
					_bindLiveEventBySelector();
				};

				this.setOptions = function (options) {
					o = $.extend(true, o, options);
				};
			};


		// bind event.
		if (targets) {
			_bindLiveEvent(targets);
		}
		if (selector) {
			_bindLiveEventBySelector(selector);
		}

		return new Tooltip();
	};

	Raphael.fn.tooltip.animations = {
		fade: function (options) {
			var eles = options.context;
			if (options.show) {
				eles.attr({ "opacity": 0 });
				eles.animate({ "opacity": 1 }, options.duration, options.easing);
			} else {
				eles.animate({ "opacity": 0 }, options.duration, options.easing);
			}
		}
	};
} (jQuery));

(function ($) {
	"use strict";

	$.widget("wijmo.wijchartcore", {
		options: {
			// / <summary>
			// / A value that indicates the width of wijchart.
			// / Default: null.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / width: 600
			// / });
			// / <remarks>
			// / If the value is null, then the width will be calculated
			// / by dom element which is used to put the canvas.
			// / </remarks>
			// / </summary>
			width: null,
			// / <summary>
			// / A value that indicates the height of wijchart.
			// / Default: null.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / height: 400
			// / });
			// / <remarks>
			// / If the value is null, then the height will be calculated
			// / by dom element which is used to put the canvas.
			// / </remarks>
			// / </summary>
			height: null,
			/// <summary>
			/// a value that determines the culture ID name.
			/// Default: "",
			/// Type: String
			/// Code example:
			/// $("#chartcore").wijchartcore({culture: "zh"})
			/// </summary>
			culture: "",
			// / <summary>
			// / An array collection that contains the data to be charted.
			// / Default: [].
			// / Type: Array.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / seriesList: [{
			// / label: "Q1",
			// / legendEntry: true,
			// / data: {
			// / x: [1, 2, 3, 4, 5],
			// / y: [12, 21, 9, 29, 30]
			// / },
			// / offset: 0
			// / }, {
			// / label: "Q2",
			// / legendEntry: true,
			// / data: {
			// / xy: [1, 21, 2, 10, 3, 19, 4, 31, 5, 20]
			// / },
			// / offset: 0
			// / }]
			// / OR
			// / seriesList: [{
			// / label: "Q1",
			// / legendEntry: true,
			// / data: {
			// / x: ["A", "B", "C", "D", "E"],
			// / y: [12, 21, 9, 29, 30]
			// / },
			// / offset: 0
			// / }]
			// / OR
			// / seriesList: [{
			// / label: "Q1",
			// / legendEntry: true,
			// / data: {
			// / x: [new Date(1978, 0, 1), new Date(1980, 0, 1),
			// / new Date(1981, 0, 1), new Date(1982, 0, 1),
			// / new Date(1983, 0, 1)],
			// / y: [12, 21, 9, 29, 30]
			// / },
			// / offset: 0
			// / }]
			// / });
			// / </summary>
			seriesList: [],
			// / <summary>
			// / An array collection that contains the style to be charted.
			// / Default: [{stroke: "#00cc00", opacity: 0.9, "stroke-width": 1},
			// {
			// / stroke: "#0099cc", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#0055cc", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#2200cc", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#8800cc", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#d9007e", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ff0000", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ff6600", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ff9900", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ffcc00", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ffff00", opacity: 0.9, "stroke-width": 1}, {
			// / stroke: "#ace600", opacity: 0.9, "stroke-width": 1}].
			// / Type: Array.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / seriesStyles: [
			// / {fill: "rgb(255,0,0)", stroke:"none"},
			// / { fill: "rgb(255,125,0)", stroke: "none" }
			// / ]});
			// / </summary>
			seriesStyles: [{
				stroke: "#00cc00",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#0099cc",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#0055cc",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#2200cc",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#8800cc",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#d9007e",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ff0000",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ff6600",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ff9900",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ffcc00",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ffff00",
				opacity: 0.9,
				"stroke-width": 1
			}, {
				stroke: "#ace600",
				opacity: 0.9,
				"stroke-width": 1
			}],
			// / <summary>
			// / An array collection that contains the style to
			// / be charted when hovering the chart element.
			// / Default: [{opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}, {
			// / opacity: 1, "stroke-width": 1.5}].
			// / Type: Array.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / seriesHoverStyles: [
			// / {fill: "rgb(255,0,0)", stroke:"none"},
			// / { fill: "rgb(255,125,0)", stroke: "none" }
			// / ]});
			// / </summary>
			seriesHoverStyles: [{
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}, {
				opacity: 1,
				"stroke-width": 1.5
			}],
			// / <summary>
			// / A value that indicates the top margin of the chart area.
			// / Default: 25.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / marginTop: 20
			// / });
			// / </summary>
			marginTop: 25,
			// / <summary>
			// / A value that indicates the right margin of the chart area.
			// / Default: 25.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / marginRight: 20
			// / });
			// / </summary>
			marginRight: 25,
			// / <summary>
			// / A value that indicates the bottom margin of the chart area.
			// / Default: 25.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / marginBottom: 20
			// / });
			// / </summary>
			marginBottom: 25,
			// / <summary>
			// / A value that indicates the left margin of the chart area.
			// / Default: 25.
			// / Type: Number.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / marginLeft: 20
			// / });
			// / </summary>
			marginLeft: 25,
			// / <summary>
			// / A value that indicates the style of the chart text.
			// / Default: {fill:"#888", "font-size": 10, stroke:"none"}.
			// / Type: Object.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / textStyle: {fill: "red"}
			// / });
			// / </summary>
			textStyle: {
				fill: "#888",
				"font-size": 10,
				stroke: "none"
			},
			// / <summary>
			// / An object that value indicates the header of the chart element.
			// / Type: Object.
			// / Default: { text:"",visible:true, style:{fill:"none", stroke:"none"},
			// / textStyle:{"font-size": 18, fill:"#666", stroke:"none"},
			// / compass:"north", orientation:"horizontal"}
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / header: {
			// / text:"header",
			// / style:{
			// / fill:"#f1f1f1",
			// / stroke:"#010101"
			// / }}
			// / });
			// / </summary>
			header: {
				// / <summary>
				// / A value that indicates the text of the header.
				// / Default: "".
				// / Type: String.
				// / </summary>
				text: "",
				// / <summary>
				// / A value that indicates the style of the header.
				// / Default: {fill:"none", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the style of the header text.
				// / Default: {"font-size": 18, fill:"#666", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				textStyle: {
					"font-size": 18,
					fill: "#666",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the compass of the header.
				// / Default: "north".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'north', 'south', 'east' and 'west'.
				// / </remarks>
				compass: "north",
				// / <summary>
				// / A value that indicates the orientation of the header.
				// / Default: "horizontal".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'horizontal' and 'vertical'.
				// / </remarks>
				orientation: "horizontal",
				// / <summary>
				// / A value that indicates the visibility of the header.
				// / Default: true.
				// / Type: Boolean.
				// / </summary>
				visible: true
			},
			// / <summary>
			// / An object value that indicates the footer of the chart element.
			// / Type: Object.
			// / Default: {text:"",visible:false, style:{fill:"#fff", stroke:"none"},
			// / textStyle:{fille:"#000", stroke:"none"}, compass:"south",
			// / orientation:"horizontal"}
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / footer: {
			// / text:"footer",
			// / style:{
			// / fill:"#f1f1f1",
			// / stroke:"#010101"
			// / }}
			// / });
			// / </summary>
			footer: {
				// / <summary>
				// / A value that indicates the text of the footer.
				// / Default: "".
				// / Type: String.
				// / </summary>
				text: "",
				// / <summary>
				// / A value that indicates the style of the footer.
				// / Default: {fill:"#fff", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				style: {
					fill: "#fff",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the style of the footer text.
				// / Default: {fill:"#000", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				textStyle: {
					fill: "#000",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the compass of the footer.
				// / Default: "south".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'north', 'south', 'east' and 'west'.
				// / </remarks>
				compass: "south",
				// / <summary>
				// / A value that indicates the orientation of the footer.
				// / Default: "horizontal".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'horizontal' and 'vertical'.
				// / </remarks>
				orientation: "horizontal",
				// / <summary>
				// / A value that indicates the visibility of the footer.
				// / Default: false.
				// / Type: Boolean.
				// / </summary>
				visible: false
			},
			// / <summary>
			// / An object value indicates the legend of the chart element.
			// / Type: Object.
			// / Default: {text:"", textMargin:{left:2,top:2,right:2,bottom:2},
			// / titleStyle:{"font-weight":"bold",fill:"#000",stroke:"none},
			// / visible:true, style:{fill:"#none", stroke:"none"},
			// / textStyle:{fille:"#333", stroke:"none"}, compass:"east",
			// / orientation:"vertical"}
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / legend: {
			// / text:"legend",
			// / style:{
			// / fill:"#f1f1f1",
			// / stroke:"#010101"
			// / }}
			// / });
			// / </summary>
			legend: {
				// / <summary>
				// / A value that indicates the text of the legend.
				// / Default: "".
				// / Type: String.
				// / </summary>
				text: "",
				// / <summary>
				// / A value that indicates the text margin of the legend item.
				// / Default: {left:2, top:2, right:2, bottom:2}.
				// / Type: Object.
				// / </summary>
				textMargin: { left: 2, top: 2, right: 2, bottom: 2 },
				// / <summary>
				// / A value that indicates the style of the legend.
				// / Default: {fill:"#none", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the style of the legend text.
				// / Default: {fill:"#333", stroke:"none"}.
				// / Type: Object.
				// / </summary>
				textStyle: {
					fill: "#333",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the style of the legend title.
				// / Default: {"font-weight": "bold", fill:"#000",
				// stroke:"none"}.
				// / Type: Object.
				// / </summary>
				titleStyle: {
					"font-weight": "bold",
					fill: "#000",
					stroke: "none"
				},
				// / <summary>
				// / A value that indicates the compass of the legend.
				// / Default: "east".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'north', 'south', 'east' and 'west'.
				// / </remarks>
				compass: "east",
				// / <summary>
				// / A value that indicates the orientation of the legend.
				// / Default: "vertical".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'horizontal' and 'vertical'.
				// / </remarks>
				orientation: "vertical",
				// / <summary>
				// / A value that indicates the visibility of the legend.
				// / Default: true.
				// / Type: Boolean.
				// / </summary>
				visible: true
			},
			// / <summary>
			// / A value that provides information about the axes.
			// / Default: {x:{alignment:"center",
			// / style:{stroke:"#999999","stroke-width":0.5}, visible:true,
			// / textVisible:true, text:"", textStyle:{fill: "#888", "font-size": 15,
			// / "font-weight": "bold"},labels: {style: {fill: "#333",
			// / "font-size": 11},textAlign: "near", width: null},
			// / compass:"south",
			// / autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
			// / gridMajor:{visible:false,style:{stroke:"#CACACA",
			// / "stroke-dasharray":"- "}}},gridMinor:{visible:false,
			// / style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			// / tickMajor:{position:"none",style:{fill:"black"},factor:1},
			// / tickMinor:{position:"none",style:{fill:"black"},factor:1},
			// / annoMethod:"values", annoFormatString:"",valueLabels:[]},
			// / y:{alignment:"center",style:{stroke: "#999999",
			// / "stroke-width": 0.5},visible:false, text:"", textVisible:true,
			// / textStyle: {fill: "#888","font-size": 15,
			// / "font-weight": "bold"},labels: {style: {fill: "#333",
			// / "font-size": 11},textAlign: "center", width: null},
			// / compass:"west",
			// / autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
			// / gridMajor:{visible:true, style:{stroke:"#999999",
			// / "stroke-width": 0.5,"stroke-dasharray":"none"}}},
			// / gridMinor:{visible:false, style:{stroke:"#CACACA",
			// / "stroke-dasharray":"- "}}},tickMajor:{position:"none",
			// / style:{fill:"black"},factor:1},tickMinor:{position:"none",
			// /
			/// style:{fill:"black"},factor:1},annoMethod:"values", 
			/// annoFormatString:"",valueLabels:[]}.
			// / Type: Object.
			// / Code example:
			// / $("#chartcore").wijchartcore({axis:{
			// /	x: { text:"x" }, y: { text: "y" }
			// / }}) 
			// / </summary>
			axis: {
				// / <summary>
				// / A value that provides information for the X axis.
				// / Default: {alignment:"center",style:{stroke:"#999999",
				// / "stroke-width":0.5}, visible:true, text:"", textVisible:true,
				// / textStyle:{fill: "#888", "font-size": 15,
				// / "font-weight": "bold"}, labels: {style: {fill: "#333",
				// / "font-size": 11},textAlign: "near", width: null},
				// / compass:"south",
				// / autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				// / gridMajor:{visible:false, style:{stroke:"#CACACA",
				// / "stroke-dasharray":"- "}}},gridMinor:{visible:false,
				// / style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
				// / tickMajor:{position:"none",style:{fill:"black"},factor:1},
				// / tickMinor:{position:"none",style:{fill:"black"},factor:1},
				// / annoMethod:"values", annoFormatString:"",valueLabels:[]}.
				// / Type: Object.
				// / </summary>
				x: {
					// / <summary>
					// / A value that indicates the alignment of the X axis
					// text.
					// / Default: "center".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / Options are 'center', 'near', 'far'.
					// / </remarks>
					alignment: "center",
					// / <summary>
					// / A value that indicates the style of the X axis.
					// / Default: {stroke: "#999999", "stroke-width": 0.5}.
					// / Type: Object.
					// / </summary>
					style: {
						stroke: "#999999",
						"stroke-width": 0.5
					},
					// / <summary>
					// / A value that indicates the visibility of the X axis.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					visible: true,
					// / <summary>
					// / A value that indicates the visibility of the X axis
					// text.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					textVisible: true,
					// / <summary>
					// / A value that indicates the text of the X axis text.
					// / Default: "".
					// / Type: String.
					// / </summary>
					text: "",
					// / <summary>
					// / A value that indicates the style of text of the X axis.
					// / Default: {fill: "#888","font-size": 15,"font-weight":
					// "bold"}.
					// / Type: Object.
					// / </summary>
					textStyle: {
						fill: "#888",
						"font-size": 15,
						"font-weight": "bold"
					},
					// / <summary>
					// / A value that provides information for the labels.
					// / Default: {style: {fill: "#333","font-size": 11},
					// / textAlign: "near", width: null}.
					// / Type: Object.
					// / </summary>
					labels: {
						// / <summary>
						// / A value that indicates the style of major text of
						// the X axis.
						// / Default: {fill: "#333","font-size": 11}.
						// / Type: Object.
						// / </summary>
						style: {
							fill: "#333",
							"font-size": 11
						},
						// / <summary>
						// / A value that indicates the alignment
						// / of major text of the X axis.
						// / Default: "near".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'near', 'center' and 'far'.
						// / </remarks>
						textAlign: "near",
						// / <summary>
						// / A value that indicates the width of major text of
						// the X axis.
						// / Default: null.
						// / Type: Number.
						// / <remarks>
						// / If the value is null, then the width
						// / will be calculated automatically.
						// / </remarks>
						// / </summary>
						width: null
					},
					// / <summary>
					// / A value that indicates the compass of the X axis.
					// / Default: "south".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / Options are 'north', 'south', 'east' and 'west'.
					// / </remarks>
					compass: "south",
					// / <summary>
					// / A value that indicates whether the minimum axis
					// / value is calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMin: true,
					// / <summary>
					// / A value that indicates whether the maximum axis
					// / value is calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMax: true,
					// / <summary>
					// / A value that indicates the minimum value of the X axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					min: null,
					// / <summary>
					// / A value that indicates the maximum value of the X axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					max: null,
					// / <summary>
					// / A value that indicates the origin value of the X axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					origin: null,
					// / <summary>
					// / A value that indicates whether the major tick mark
					// / values are calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMajor: true,
					// / <summary>
					// / A value that indicates whether the minor tick mark
					// / values are calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMinor: true,
					// / <summary>
					// / A value that indicates the units between major tick
					// marks.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					unitMajor: null,
					// / <summary>
					// / A value that indicates the units between minor tick
					// marks.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					unitMinor: null,
					// / <summary>
					// / A value that provides information for the major grid
					// line.
					// / Default: {visible:false,
					// / style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
					// / Type: Object.
					// / </summary>
					gridMajor: {
						// / <summary>
						// / A value that indicates the visibility of the major
						// grid line.
						// / Default: false.
						// / Type: Boolean.
						// / </summary>
						visible: false,
						// / <summary>
						// / A value that indicates the style of the major grid
						// line.
						// / Default: {stroke:"#CACACA", "stroke-dasharray": "-
						// "}.
						// / Type: Object.
						// / </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					// / <summary>
					// / A value that provides information for the minor grid
					// line.
					// / Default: {visible:false,
					// / style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
					// / Type: Object.
					// / </summary>
					gridMinor: {
						// / <summary>
						// / A value that indicates the visibility of the minor
						// grid line.
						// / Default: false.
						// / Type: Boolean.
						// / </summary>
						visible: false,
						// / <summary>
						// / A value that indicates the style of the minor grid
						// line.
						// / Default: {stroke:"#CACACA", "stroke-dasharray": "-
						// "}.
						// / Type: Object.
						// / </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					// / <summary>
					// / A value that provides information for the major tick.
					// / Default: {position:"none", style:{fill:"black"},
					// factor:1}.
					// / Type: Object.
					// / </summary>
					tickMajor: {
						// / <summary>
						// / A value that indicates the type of major tick mark.
						// / Default: "none".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'none', 'inside', 'outside' and
						// 'cross'.
						// / </remarks>
						position: "none",
						// / <summary>
						// / A value that indicates the style of major tick
						// mark.
						// / Default: {fill: "black"}.
						// / Type: Object.
						// / </summary>
						style: { fill: "black" },
						// / <summary>
						// / A value that indicates an integral
						// / factor for major tick mark length.
						// / Default: 1.
						// / Type: Number.
						// / </summary>
						factor: 1
					},
					// / <summary>
					// / A value that provides information for the minor tick.
					// / Default: {position:"none", style:{fill:"black"},
					// factor:1}.
					// / Type: Object.
					// / </summary>
					tickMinor: {
						// / <summary>
						// / A value that indicates the type of minor tick mark.
						// / Default: "none".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'none', 'inside', 'outside' and
						// 'cross'.
						// / </remarks>
						position: "none",
						// / <summary>
						// / A value that indicates the style of minor tick
						// mark.
						// / Default: {fill: "black"}.
						// / Type: Object.
						// / </summary>
						style: { fill: "black" },
						// / <summary>
						// / A value that indicates an integral
						// / factor for minor tick mark length.
						// / Default: 1.
						// / Type: Number.
						// / </summary>
						factor: 1
					},
					// / <summary>
					// / A value that indicates the method of annotation.
					// / Default: "values".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / Options are 'values', 'valueLabels'.
					// / </remarks>
					annoMethod: "values",
					// / <summary>
					// / A value that indicates the format string of annotation.
					// / Default: "".
					// / Type: String.
					// / </summary>
					annoFormatString: "",
					// / <summary>
					// / A value that shows a collection of valueLabels for the
					// X axis.
					// / Default: [].
					// / Type: Array.
					// / </summary>
					valueLabels: []
					// todo.
					// autoOrigin: true,
					// origin: null,
					// tickLabel: "nextToAxis",
				},
				// / <summary>
				// / A value that provides infomation for the Y axis.
				// / Default: {alignment:"center",style:{stroke: "#999999",
				// / "stroke-width": 0.5},visible:false, textVisible:true,
				// / text:"", textStyle: {fill: "#888","font-size": 15,
				// / "font-weight": "bold"}, labels: {style: {fill: "#333",
				// / "font-size": 11},textAlign: "center", width: null},
				// / compass:"west",
				// / autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				// / gridMajor:{visible:true, style:{stroke:"#999999",
				// / "stroke-width": 0.5, "stroke-dasharray":"none"}}},
				// / gridMinor:{visible:false, style:{stroke:"#CACACA",
				// / "stroke-dasharray":"- "}}},tickMajor:{position:"none",
				// / style:{fill:"black"},factor:1},tickMinor:{position:"none",
				// / style:{fill:"black"},factor:1},annoMethod:"values",
				// / annoFormatString:"", valueLabels:[]}
				// / Type: Object.
				// / </summary>
				y: {
					// / <summary>
					// / A value that indicates the alignment of the Y axis
					// text.
					// / Default: "center".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / Options are 'center', 'near', 'far'.
					// / </remarks>
					alignment: "center",
					// / <summary>
					// / A value that indicates the style of the Y axis.
					// / Default: {stroke:"#999999", "stroke-width": 0.5}.
					// / Type: Object.
					// / </summary>
					style: {
						stroke: "#999999",
						"stroke-width": 0.5
					},
					// / <summary>
					// / A value that indicates the visibility of the Y axis.
					// / Default: false.
					// / Type: Boolean.
					// / </summary>
					visible: false,
					// / <summary>
					// / A value that indicates the visibility of the Y axis
					// text.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					textVisible: true,
					// / <summary>
					// / A value that indicates the text of the Y axis text.
					// / Default: "".
					// / Type: String.
					// / </summary>
					text: "",
					// / <summary>
					// / A value that indicates the style of text of the Y axis.
					// / Default: {fill: "#888", "font-size": 15,
					// / "font-weight": "bold"}.
					// / Type: Object.
					// / </summary>
					textStyle: {
						fill: "#888",
						"font-size": 15,
						"font-weight": "bold"
					},
					// / <summary>
					// / A value that provides information for the labels.
					// / Default: {style: {fill: "#333","font-size": 11},
					// / textAlign: "center", width: null}.
					// / Type: Object.
					// / </summary>
					labels: {
						// / <summary>
						// / A value that indicates the style of major text of
						// the Y axis.
						// / Default: {fill: "#333","font-size": 11}.
						// / Type: Object.
						// / </summary>
						style: {
							fill: "#333",
							"font-size": 11
						},
						// / <summary>
						// / A value that indicates the
						// / of major text of the Y axis.
						// / Default: "center".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'near', 'center' and 'far'.
						// / </remarks>
						textAlign: "center",
						// / <summary>
						// / A value that indicates the width major text of the
						// Y axis.
						// / Default: null.
						// / Type: Number.
						// / <remarks>
						// / If the value is null, then the width
						// / will be calculated automatically.
						// / </remarks>
						// / </summary>
						width: null
					},
					// / <summary>
					// / A value that indicates the compass of the Y axis.
					// / Default: "west".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / Options are 'north', 'south', 'east' and 'west'.
					// / </remarks>
					compass: "west",
					// / <summary>
					// / A value that indicates whether the minimum axis
					// / value is calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMin: true,
					// / <summary>
					// / A value that indicates whether the maximum axis
					// / value is calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMax: true,
					// / <summary>
					// / A value that indicates the minimum value of the Y axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					min: null,
					// / <summary>
					// / A value that indicates the maximum value of the Y axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					max: null,
					// / <summary>
					// / A value that indicates the origin value of the Y axis.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					origin: null,
					// / <summary>
					// / A value that indicates whether the major tick mark
					// / values are calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMajor: true,
					// / <summary>
					// / A value that indicates whether the minor tick mark
					// / values are calculated automatically.
					// / Default: true.
					// / Type: Boolean.
					// / </summary>
					autoMinor: true,
					// / <summary>
					// / A value that indicates the units between major tick
					// marks.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					unitMajor: null,
					// / <summary>
					// / A value that indicates the units between minor tick
					// marks.
					// / Default: null.
					// / Type: Number.
					// / </summary>
					unitMinor: null,
					// / <summary>
					// / A value that provides information for the major grid
					// line.
					// / Default: {visible:true, style:{stroke:"#999999",
					// / "stroke-width": 0.5,"stroke-dasharray":"none"}}.
					// / Type: Object.
					// / </summary>
					gridMajor: {
						// / <summary>
						// / A value that indicates the visibility of the major
						// grid line.
						// / Default: true.
						// / Type: Boolean.
						// / </summary>
						visible: true,
						// / <summary>
						// / A value that indicates the style of the major grid
						// line.
						// / Default: {stroke:"#999999", "stroke-width": 0.5,
						// / "stroke-dasharray": "none"}.
						// / Type: Object.
						// / </summary>
						style: {
							stroke: "#999999",
							"stroke-width": 0.5,
							"stroke-dasharray": "none"
						}
					},
					// / <summary>
					// / A value that provides information for the minor grid
					// line.
					// / Default: {visible:false, style:{stroke:"#CACACA",
					// / "stroke-dasharray":"- "}}.
					// / Type: Object.
					// / </summary>
					gridMinor: {
						// / <summary>
						// / A value that indicates the visibility of the minor
						// grid line.
						// / Default: false.
						// / Type: Boolean.
						// / </summary>
						visible: false,
						// / <summary>
						// / A value that indicates the style of the minor grid
						// line.
						// / Default: {stroke:"#CACACA", "stroke-dasharray": "-
						// "}.
						// / Type: Object.
						// / </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					// / <summary>
					// / A value that provides information for the major tick.
					// / Default: {position:"none", style:{fill:"black"},
					// factor:1}.
					// / Type: Object.
					// / </summary>
					tickMajor: {
						// / <summary>
						// / A value that indicates the type of major tick mark.
						// / Default: "none".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'none', 'inside', 'outside' and
						// 'cross'.
						// / </remarks>
						position: "none",
						// / <summary>
						// / A value that indicates the style of major tick
						// mark.
						// / Default: {fill: "black"}.
						// / Type: Object.
						// / </summary>
						style: { fill: "black" },
						// / <summary>
						// / A value that indicates an integral factor
						// / for major tick mark length.
						// / Default: 1.
						// / Type: Number.
						// / </summary>
						factor: 1
					},
					// / <summary>
					// / A value that provides information for the minor tick.
					// / Default: {position:"none", style:{fill:"black"},
					// factor:1}.
					// / Type: Object.
					// / </summary>
					tickMinor: {
						// / <summary>
						// / A value that indicates the type of minor tick mark.
						// / Default: "none".
						// / Type: String.
						// / </summary>
						// / <remarks>
						// / Options are 'none', 'inside', 'outside' and
						// 'cross'.
						// / </remarks>
						position: "none",
						// / <summary>
						// / A value that indicates the style of minor tick
						// mark.
						// / Default: {fill: "black"}.
						// / Type: Object.
						// / </summary>
						style: { fill: "black" },
						// / <summary>
						// / A value that indicates an integral
						// / factor for minor tick mark length.
						// / Default: 1.
						// / Type: Number.
						// / </summary>
						factor: 1
					},
					// / <summary>
					// / A value that indicates the method of annotation.
					// / Default: "values".
					// / Type: String.
					// / </summary>
					// / <remarks>
					// / options are 'values', 'valueLabels'.
					// / </remarks>
					annoMethod: "values",
					// / <summary>
					// / A value that indicates the format string of annotation.
					// / Default: "".
					// / Type: String.
					// / </summary>
					annoFormatString: "",
					// / <summary>
					// / A value that shows a collection of valueLabels for the
					// y axis.
					// / Default: [].
					// / Type: Array.
					// / </summary>
					valueLabels: []
					// todo.
					// autoOrigin: true,
					// origin: null,
					// tickLabel: "nextToAxis",
				}
			},
			// / <summary>
			// / A value that is used to indicate whether to show
			// / and what to show on the open tooltip.
			// / Default: {enable:true, content:null,
			// / contentStyle: {fill: "#d1d1d1","font-size": 16},
			// / title:null,
			// / titleStyle: {fill: "#d1d1d1","font-size": 16},
			// / style: {fill: "#000000", "stroke-width": "2"},
			// / animated: "fade", showAnimated: "fade", hideAnimated: "fade",
			// / duration: 120, showDuration: 120, hideDuration: 120,
			// / showDelay: 0, hideDelay: 150, easing: "",
			// / showEasing: "", hideEasing: "",
			// / compass:"north", offsetX: 0, offsetY: 0,
			// / showCallout: true, calloutFilled: false,
			// / calloutFilledStyle: {fill: "#000"}}.
			// / Type: Object.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / hint: {
			// / enable:true,
			// / content:function(){
			// / return this.data.label + " : " +
			// / this.value/this.total*100 + "%";
			// / }});
			// / </summary>
			hint: {
				// / <summary>
				// / A value that indicates whether to show the tooltip.
				// / Default: true.
				// / Type: Boolean.
				// / </summary>
				enable: true,
				// / <summary>
				// / A value that will be shown in the content part of the
				// tooltip
				// / or a function which is used to get a value for the tooltip
				// shown.
				// / Default: null.
				// / Type: String or Function.
				// / </summary>
				content: null,
				// / <summary>
				// / A value that indicates the style of content text.
				// / Default: {fill: "#d1d1d1","font-size": 16}.
				// / Type: Object.
				// / </summary>
				contentStyle: {
					fill: "#d1d1d1",
					"font-size": 16
				},
				// / <summary>
				// / A value that will be shown in the title part of the tooltip
				// / or a function which is used to get a value for the tooltip
				// shown.
				// / Default: null.
				// / Type: String or Function.
				// / </summary>
				title: null,
				// / <summary>
				// / A value that indicates the style of title text.
				// / Default: {fill: "#d1d1d1","font-size": 16}.
				// / Type: Object.
				// / </summary>
				titleStyle: {
					fill: "#d1d1d1",
					"font-size": 16
				},
				// / <summary>
				// / A value that indicates the style of container.
				// / Default: {fill: "#000000", "stroke-width":
				// 2}.
				// / Type: Object.
				// / </summary>
				style: {
					fill: "#000000",
					"stroke-width": 2
				},
				// / <summary>
				// / A value that indicates the effect during show or hide
				// / when showAnimated or hideAnimated isn't specified.
				// / Default:"fade".
				// / Type:String.
				// / </summary>
				animated: "fade",
				// / <summary>
				// / A value that indicates the effect during show.
				// / Default:"fade".
				// / Type:String.
				// / </summary>
				showAnimated: "fade",
				// / <summary>
				// / A value that indicates the effect during hide.
				// / Default:"fade".
				// / Type:String.
				// / </summary>
				hideAnimated: "fade",
				// / <summary>
				// / A value that indicates the millisecond to show or hide the
				// tooltip
				// / when showDuration or hideDuration isn't specified.
				// / Default:120.
				// / Type:Number.
				// / </summary>
				duration: 120,
				// / <summary>
				// / A value that indicates the millisecond to show the tooltip.
				// / Default:120.
				// / Type:Number.
				// / </summary>
				showDuration: 120,
				// / <summary>
				// / A value that indicates the millisecond to hide the tooltip.
				// / Default:120.
				// / Type:Number.
				// / </summary>
				hideDuration: 120,
				// / <summary>
				// / A value that indicates the easing during show or hide when
				// / showEasing or hideEasing isn't specified.
				// / Default: "".
				// / Type: String.
				// / </summary>
				easing: "",
				// / <summary>
				// / A value that indicates the easing during show.
				// / Default: "".
				// / Type: String.
				// / </summary>
				showEasing: "",
				// / <summary>
				// / A value that indicates the easing during hide.
				// / Default: "".
				// / Type: String.
				// / </summary>
				hideEasing: "",
				/// <summary>
				/// A value that indicates the millisecond delay to show the tooltip.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				showDelay: 0,
				// / <summary>
				// / A value that indicates the millisecond delay to hide the
				// tooltip.
				// / Default: 150.
				// / Type: Number.
				// / </summary>
				hideDelay: 150,
				// / <summary>
				// / A value that indicates the compass of the tooltip.
				// / Default: "north".
				// / Type: String.
				// / </summary>
				// / <remarks>
				// / Options are 'west', 'east', 'south', 'north',
				// / 'southeast', 'southwest', 'northeast', 'northwest'.
				// / </remarks>
				compass: "north",
				// / <summary>
				// / A value that indicates the horizontal offset
				// / of the point to show the tooltip.
				// / Default: 0.
				// / Type: Number.
				// / </summary>
				offsetX: 0,
				// / <summary>
				// / A value that indicates the vertical offset
				// / of the point to show the tooltip.
				// / Default: 0.
				// / Type: Number.
				// / </summary>
				offsetY: 0,
				// / <summary>
				// / Determines whether to show the callout element.
				// / Default:true.
				// / Type:Boolean.
				// / </summary>
				showCallout: true,
				// / <summary>
				// / Determines whether to fill the callout.
				// / If true, then the callout triangle will be filled.
				// / Default:false.
				// / Type:Boolean.
				// / </summary>
				calloutFilled: false,
				// / <summary>
				// / A value that indicates the style of the callout filled.
				// / Default: {fill: "#000"}.
				// / Type: Object.
				// / </summary>
				calloutFilledStyle: {
					fill: "#000"
				}
			},
			// / <summary>
			// / A value that indicates whether to show default chart labels.
			// / Default: true.
			// / Type: Boolean.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / showChartLabels:false
			// / });
			// / </summary>
			showChartLabels: true,
			// / <summary>
			// / A value that indicates style of the chart labels.
			// / Default: {}.
			// / Type: Object.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / chartLabelStyle: {fill: "red"}
			// / });
			// / </summary>
			chartLabelStyle: {},
			// / <summary>
			// / A value that indicates the format string of the chart labels.
			// / Default: "".
			// / Type: String.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / chartLabelFormatString: "n0"
			// / });
			// / </summary>
			chartLabelFormatString: "",
			// / <summary>
			// / A value that indicates whether to disable the default text
			// style.
			// / Default: false.
			// / Type: Boolean.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / disableDefaultTextStyle:true
			// / });
			// / </summary>
			disableDefaultTextStyle: false,
			// / <summary>
			// / A value that indicates whether to show shadow for the chart.
			// / Default: false.
			// / Type: Boolean.
			// / Code example:
			// / $("#chartcore").wijchartcore({
			// / shadow: false
			// / });
			// / </summary>
			shadow: true,
			/// <summary>
			/// A dataview object to bind data to chart seriesLists
			/// Default: null
			/// Type: Object
			/// Code example:
			/// $("#chartcore").wijchartcore({
			/// dataSource: dv
			/// })
			/// </summary>
			dataSource: null,
			/// <summary>
			/// bind a field to each series's data x array
			/// Type: object
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		x:{ bind: "fieldA"}
			/// })
			/// </summary>
			data: null,
			// / <summary>
			// / Fires before the series changes. This event can be cancelled.
			// / "return false;" to cancel the event.
			// / Default: null.
			// / Type: Function.
			// / </summary>
			// / <param name="e" type="eventObj">
			// / jQuery.Event object.
			// / </param>
			// / <param name="data" type="Object">
			// / An object that contains old and new series values.
			// / data.oldSeriesList: old series list before change.
			// / data.newSeriesList: new series list that will replace old one.
			// / </param>
			beforeSeriesChange: null,
			// / <summary>
			// / Fires when the series changes.
			// / Default: null.
			// / Type: Function.
			// / </summary>
			// / <param name="e" type="eventObj">
			// / jQuery.Event object.
			// / </param>
			// / <param name="data" type="Object">
			// / An object that contains new series values.
			// / </param>
			seriesChanged: null,
			// / <summary>
			// / Fires before the canvas is painted. This event can be
			// cancelled.
			// / "return false;" to cancel the event.
			// / Default: null.
			// / Type: Function.
			// / </summary>
			// / <param name="e" type="eventObj">
			// / jQuery.Event object.
			// / </param>
			beforePaint: null,
			// / <summary>
			// / Fires after the canvas is painted.
			// / Default: null.
			// / Type: Function.
			// / </summary>
			// / <param name="e" type="eventObj">
			// / jQuery.Event object.
			// / </param>
			painted: null
		},

		innerState: {},

		// handle option changes:
		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				ev = null,
				len = 0,
				idx = 0,
				oldXMajorFactor = o.axis.x.tickMajor.factor,
				oldXMinorFactor = o.axis.x.tickMinor.factor,
				oldYMajorFactor = o.axis.y.tickMajor.factor,
				oldYMinorFactor = o.axis.y.tickMinor.factor,
				styleLen,
				hoverStyleLen;


			if (key === "seriesList") {
				if (!value) {
					value = [];
				}
				
				ev = $.Event("beforeserieschange");
				if (self._trigger("beforeSeriesChange", ev, {
					oldSeriesList: o.seriesList,
					newSeriesList: value
				}) === false) {
					return false;
				}
				o.seriesList = value;
				self._trigger("seriesChanged", null, value);
				self.seriesTransition = true;
				self._init();
			} else {
				if ($.isPlainObject(o[key])) {
					$.extend(true, o[key], value);
					if (key === "axis") {
						if (o.axis.x.tickMajor.factor < 0) {
							o.axis.x.tickMajor.factor = oldXMajorFactor;
						}
						if (o.axis.x.tickMinor.factor < 0) {
							o.axis.x.tickMinor.factor = oldXMinorFactor;
						}
						if (o.axis.y.tickMajor.factor < 0) {
							o.axis.y.tickMajor.factor = oldYMajorFactor;
						}
						if (o.axis.y.tickMinor.factor < 0) {
							o.axis.y.tickMinor.factor = oldYMinorFactor;
						}
					}
				} else {
					$.Widget.prototype._setOption.apply(self, arguments);
					// o[key] = value;
				}
			}

			// Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.chartElement);
			}
			// end for disabled option

			// fixed a issue that when set the disabled option, 
			// because the chart is paint by
			// wij***chart plugin, and the disabled set to the plugin 
			// as a value, not a refrence,
			// so the plugin's disabled value can't change 
			// when set the disabled to charts.
			// now, we just repaint the chart.

			if (key === "seriesTransition" || key === "animation") {
			//||
			//	key === "disabled") {
				return;
			}

			len = o.seriesList.length;

			if (key === "seriesList" || key === "seriesStyles") {
				for (styleLen = o.seriesStyles.length, idx = styleLen; idx < len; idx++) {
					o.seriesStyles[idx] = o.seriesStyles[idx % styleLen];
				}
			}

			if (key === "seriesList" || key === "seriesStyles" ||
				key === "seriesHoverStyles") {
				//backup the styles. when drawed the charts, restore the styles.
				self.styles = {
					style: [].concat(o.seriesStyles.slice(0, o.seriesStyles.length)),
					hoverStyles: [].concat(o.seriesHoverStyles.slice(0, 
						o.seriesHoverStyles.length))
				};
				self._initStyles();
			}

			if (key === "seriesList" || key === "seriesHoverStyles") {
				hoverStyleLen = o.seriesHoverStyles.length;
				for (idx = hoverStyleLen; idx < len; idx++) {
					o.seriesHoverStyles[idx] = o.seriesHoverStyles[idx % hoverStyleLen];
				}
			}

			self.redraw();
		},

		// if the series's lenth is more than the styles's length, extend the styles.
		_initStyles: function () {
			var o = this.options,
				styles = o.seriesStyles,
				hoverStyles = o.seriesHoverStyles,
				stylesLen, seriesLen, hoverStylesLen, i;

			if (o.seriesList) {
				seriesLen = o.seriesList.length || 0;
			}

			if (o.seriesStyles) {
				stylesLen = o.seriesStyles.length || 0;
			}

			if (o.seriesHoverStyles) {
				hoverStylesLen = o.seriesHoverStyles.length || 0;
			}

			if (seriesLen > stylesLen && stylesLen) {
				for (i = stylesLen; i < seriesLen; i++) {
					styles[i] = styles[i % stylesLen];
				}
			}

			if (seriesLen > hoverStylesLen && hoverStylesLen) {
				for (i = hoverStylesLen; i < seriesLen; i++) {
					hoverStyles[i] = hoverStyles[i % hoverStylesLen];
				}
			}
		},

		// widget creation:
		_create: function () {
			var self = this,
				o = self.options,
				width = o.width || self.element.width(),
				height = o.height || self.element.height(),
				newEle = null,
				canvas;

			self.updating = 0;
			self.innerState = {};

			// Add for parse date options for jUICE. D.H
			if ($.isFunction(window["wijmoASPNetParseOptions"])) {
				wijmoASPNetParseOptions(o);
			}

			// backup the styles. when drawed the charts, restore the styles.
			// when postback the styles, if doesn't clone the styles, 
			// the serverside will get the extended styles. when the add a series data,
			// the extend style will wrong.
			self.styles = {
				style: [].concat(o.seriesStyles.slice(0, o.seriesStyles.length)),
				hoverStyles: [].concat(o.seriesHoverStyles.slice(0, 
					o.seriesHoverStyles.length))
			};

			// Extend seriesStyle
			self._initStyles();

			if (o.hint && typeof o.hint.content === "string" && window[o.hint.content]) {
				o.hint.content = window[o.hint.content];
			}
			if (o.hint && typeof o.hint.title === "string" && window[o.hint.title]) {
				o.hint.title = window[o.hint.title];
			}

			self.headerEles = [];
			self.footerEles = [];
			self.legendEles = [];
			self.axisEles = [];
			self.legends = [];
			self.legendIcons = [];
			self.legendDots = [];
			self.chartLabelEles = [];
			self.seriesEles = [];

			if (self.element.length > 0) {
				if (self.element.is("table")) {
					self._parseTable();
					newEle = $("<div></div>");

					if (width) {
						newEle.css("width", width);
					}

					if (height) {
						newEle.css("height", height);
					}

					self.element.after(newEle);
					self.chartElement = newEle;
				} else {
					self.chartElement = self.element;
				}

			
				// end for bug 16039

				self.chartElement.addClass("ui-widget");
				canvas = new Raphael(self.chartElement[0], width, height);
				self.canvas = canvas;

				// add for fixing bug 16039 by wuhao 2011/7/7
				if (o.disabled) {
					self.disable();
				}
				
				// add custom attribute to canvas
				// fixed the issue 20422 by dail on 2012-3-12, If user set 
				// rotation and scale. the transform will only effect on scale.
				canvas.customAttributes.rotation = function (num) {
				    //return {transform: "...R" + num};
					this.transform("...R" + num);
				};
				canvas.customAttributes.scale = function (num) {
					//return {transform: "...S" + num};
					this.transform("...S" + num);
				};
				canvas.customAttributes.translation = function (x, y) {
					//return {transform: Raphael.format("...T{0},{1}", x, y)};
					this.transform(Raphael.format("...T{0},{1}", x, y));
				};
				// end

				self._bindLiveEvents();
			}

			
		},
		
		_getDefFill: function () {
			var defFill = [
					"#00cc00",
					"#0099cc",
					"#0055cc",
					"#2200cc",
					"#8800cc",
					"#d9007e",
					"#ff0000",
					"#ff6600",
					"#ff9900",
					"#ffcc00",
					"#ffff00",
					"#ace600"
				];
			return defFill;
		},

		_getCulture: function (name) {
            return Globalize.findClosestCulture(name || this.options.culture);
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
				// Change your outerelement here
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
		},

		_bindData: function () {
			var self = this,
				o = self.options,
				dataSource = o.dataSource,
				seriesList = o.seriesList,
				shareData = o.data, sharedXList;

			
			$.each(seriesList, function (i, series) {
				var data = series.data, dataX, dataY, dataY1,
					ds = series.dataSource || dataSource;

				if (ds && data) {
					dataX = data.x;
					dataY = data.y;
					dataY1 = data.y1;
					if (dataX && dataX.bind) {
						data.x = self._getBindData(ds, dataX.bind);	
					}
					else if (shareData && shareData.x && shareData.x.bind) {
						if (sharedXList === undefined) {
							sharedXList = self._getBindData(ds, shareData.x.bind);
						}
						data.x = sharedXList;
					}

					if (dataY && dataY.bind) {
						data.y = self._getBindData(ds, dataY.bind);
					}
					if (dataY1 && dataY1.bind) {
						data.y1 = self._getBindData(ds, dataY1.bind);
					}
				}
			});
			
		},

		_getBindData: function (dataSource, bind) {
			if ($.isArray(dataSource)) {
				var arr = [];
				$.each(dataSource, function (i, data) {
					if (data && data[bind] !== undefined) {
						arr.push(data[bind]);
					}
				});
				return arr;
			}
			return null;
		},

		_hanldSharedXData: function () {
			var self = this,
				o = self.options,
				seriesList = o.seriesList,
				data = o.data;

			if (data) {
				$.each(seriesList, function (i, series) {
					var d = series.data;
					if (d.x === undefined || d.x === null && $.isArray(data.x)) {
						d.x = data.x;
					}
				});
			}
		},

		_init: function () {
			var self = this,
				o = self.options;
			
			// bind dataSource
			self._bindData();
			self._hanldSharedXData();

			$.each(o.seriesList, function (i, series) {
				var data = series.data,
					idx;
				if (typeof data === 'undefined' || data === null) {
					idx = $.inArray(series, o.seriesList);
					o.seriesList.splice(idx, 1);
				}
			});
			/*
			 * o.seriesList = $.grep(o.seriesList, function(series, i) { var
			 * data = series.data; if (typeof data === 'undefined' || data ===
			 * null) { return false; } return true; });
			 */

			if (!self.rendered) {
				self._paint();
			}
			$.Widget.prototype._init.apply(self, arguments);
		},

		destroy: function () {
			///Remove the functionality completely. 
			///This will return the element back to its pre-init state. 
			var self = this;
			self._unbindLiveEvents();
			self._clearChartElement();
			self.chartElement.removeClass("ui-widget");

			$(".wijchart-canvas-object", self.chartElement[0])
				.die(self.widgetName)
				// for jQuery 1.7.1
				.die("." + self.widgetName);

			if (self.element !== self.chartElement) {
				self.chartElement.remove();
			}

			self.element.empty();

			if (self.styles) {
				self.styles = null;
			}

			// Add for fixing bug 16039
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			// end for bug 16039

			$.Widget.prototype.destroy.apply(self, arguments);
		},

		/***********************************************************************
		 * Widget specific implementation
		 **********************************************************************/
		/** public methods */
		getCanvas: function () {
			// / <summary>
			// / Returns a reference to the Raphael canvas object.
			// / </summary>
			// / <returns type="Raphael">
			// / Reference to raphael canvas object.
			// / </returns>
			return this.canvas;
		},

		addSeriesPoint: function (seriesIndex, point, shift) {
			// / <summary>
			// / Add series point to the series list.
			// / </summary>
			// / <param name="seriesIndex" type="Number">
			// / The index of the series that the point will be inserted to.
			// / </param>
			// / <param name="point" type="Object">
			// / The point that will be inserted to.
			// / </param>
			// / <param name="shift" type="Boolean">
			// / A value that indicates whether to shift the first point.
			// / </param>
			var seriesList = this.options.seriesList,
				series = null,
				data = null;

			if (seriesIndex >= seriesList.length) {
				return;
			}

			series = seriesList[seriesIndex];
			data = series.data || [];
			data.x.push(point.x);
			data.y.push(point.y);

			if (shift) {
				data.x.shift();
				data.y.shift();
			}

			this._setOption("seriesList", seriesList);
		},

		beginUpdate: function () {
			///Suspend automatic updates to the chart while reseting the options.
			var self = this;
			self.updating++;
		},

		endUpdate: function () {
			///Restore automatic updates to the chart after 
			///the options has been reset.
			var self = this;
			self.updating--;
			self.redraw();
		},

		redraw: function (drawIfNeeded) {
			// / <summary>
			// / Redraw the chart.
			// / </summary>
			// / <param name="drawIfNeeded" type="Boolean">
			// / A value that indicates whether to redraw the chart
			// / no matter whether the chart is painted.
			// / If true, then only when the chart is not created before,
			// / it will be redrawn. Otherwise, the chart will be forced to
			// redraw.
			// / The default value is false.
			// / </param>
			var self = this,
				o = self.options,
				width = 0,
				height = 0;

			if (self.updating > 0) {
				return;
			}

			if (drawIfNeeded && self.rendered) {
				return;
			}

			width = o.width || self.element.width();
			height = o.height || self.element.height();

			if (width < 1 || height < 1) {
				return;
			}

			self.canvas.setSize(width, height);

			self._paint();
		},

		/*
		getSVG: function () {
			if (Raphael.type === "SVG") {
				return this.chartElement.html();
			}

			return this.canvas.wij.getSVG();
		},

		exportChart: function () {
			var form = document.createElement("form"),
				svg = this.getSVG();

			form.action = "http://export.highcharts.com/";
			form.method = "post";
			form.style.display = "none";
			document.body.appendChild(form);

			$.each(['filename', 'type', 'width', 'svg'], function (idx, name) {
				var input = document.createElement("input");

				$(input).attr("name", name).attr("type", "hidden").attr("value", {
					filename: 'chart',
					type: "image/png",
					width: 600,
					svg: svg
				}[name]);

				form.appendChild(input);
			});

			form.submit();
			document.body.removeChild(form);
		},
		*/

		/** Private methods */
		_parseTable: function () {
			if (!this.element.is("table")) {
				return;
			}
			var self = this,
				ele = self.element,
				o = self.options,
				// header & footer
				captions = $("caption", ele),
				theaders = $("thead th", ele),
				seriesList = [],
				sList = $("tbody tr", ele);

			if (captions.length) {
				o.header = $.extend({
					visible: true,
					text: $.trim($(captions[0]).text())
				}, o.header);
				if (captions.length > 1) {
					o.footer = $.extend({
						visibel: true,
						text: $.trim($(captions[1]).text())
					}, o.footer);
				}
			}
			// legend
			o.legend = $.extend({
				visible: true
			}, o.legend);

			self._getSeriesFromTR(theaders, sList, seriesList);

			self.options.seriesList = seriesList;
		},

		_getSeriesFromTR: function (theaders, sList, seriesList) {
			var valuesX = [],
				val = null,
				series = null;
			// seriesList
			if (theaders.length) {
				theaders.each(function () {
					val = $.trim($(this).text());
					valuesX.push(val);
				});
			}
			if (sList.length) {
				sList.each(function () {
					var th = $("th", $(this)),
						label = $.trim(th.text()),
						valuesY = [],
						tds = $("td", $(this));
					
					if (tds.length) {
						tds.each(function () {
							var td = $(this);
							valuesY.push(parseFloat($.trim(td.text())));
						});
					}
					series = {
						label: label,
						legendEntry: true,
						data: {
							x: valuesX,
							y: valuesY
						}
					};
					seriesList.push(series);
				});
			}
		},

		_destroyRaphaelArray: function (objs) {
			if (!objs) {
				return;
			}
			var len = objs.length, 
				i = 0, ele, obj;

			for (; len && i < len; i++) {
				ele = objs[i];
				if (ele && ele[0]) {
					obj = $(ele.node);
					obj.unbind().removeData();
					ele.wijRemove();
					obj.remove();
					obj = null;
				}
				objs[i] = null;
			}
		},

		_clearChartElement: function () {
			var self = this,
				fields = self.chartElement.data("fields");				

			self._destroyRaphaelArray(self.headerEles);
			self._destroyRaphaelArray(self.footerEles);
			self._destroyRaphaelArray(self.legendEles);
			self._destroyRaphaelArray(self.legends);
			self._destroyRaphaelArray(self.legendIcons);
			self._destroyRaphaelArray(self.legendDots);
			self._destroyRaphaelArray(self.axisEles);
			self._destroyRaphaelArray(self.chartLabelEles);

			if (self.tooltip) {
				self.tooltip.destroy();
				self.tooltip = null;
			}

			if (fields && fields.trackers) {
				self._destroyRaphaelArray(fields.trackers);
				fields.trackers = null;
			}
			self.headerEles = [];
			self.footerEles = [];
			self.legendEles = [];
			self.legends = [];
			self.legendIcons = [];
			self.legendDots = [];
			self.axisEles = [];
			self.chartLabelEles = [];		

			if (fields && fields.chartElements) {
				$.each(fields.chartElements, function (key, eles) {
					self._destroyRaphaelArray(eles);
				});
				fields.chartElements = null;
			}

			if (fields && fields.seriesEles) {
				fields.seriesEles = null;
			}
			
			if (self.seriesEles) {
				self.seriesEles = [];
			}

			self.canvas.clear();
			self.innerState = null;			
			self.axisInfo = null;
			self.seriesGroup = null;
			self.lastAxisOffset = null;			
			self.innerState = {};
		},

		_text: function (x, y, text) {
			var textElement = this.canvas.text(x, y, text);

			if (this.options.disableDefaultTextStyle) {
				textElement.node.style.cssText = "";
			}

			return textElement;
		},

		_paint: function () {
			var self = this,
				o = self.options,
				element = self.element,
				hidden = element.css("display") === "none" ||
						element.css("visibility") === "hidden",
				oldLeft = {},
				oldPosition = null;
			// ev = $.Event("beforepaint");

			if (hidden) {
				oldLeft = element.css("left");
				oldPosition = element.css("position");
				element.css("left", "-10000px");
				element.css("position", "absolute");
				element.show();
			}

			if (element.is(":hidden")) {
				if (hidden) {
					element.css("left", oldLeft);
					element.css("position", oldPosition);
					element.hide();
				}
				return;
			}

			self._clearChartElement();
			if (self._trigger("beforePaint") === false) {
				return;
			}
			// self._trigger("beforepaint", ev);

			self.canvasBounds = {
				startX: 0,
				endX: o.width || element.width(),
				startY: 0,
				endY: o.height || element.height()
			};
			self._paintHeader();
			self._paintFooter();
			self._paintLegend();
			self._paintChartArea();
			self._paintChartLabels();
			self._paintTooltip();
			self._trigger("painted");

			self.rendered = true;

			// restore the backup options.
			if (self.styles) {
				o.seriesStyles = self.styles.style;
				o.seriesHoverStyles = self.styles.hoverStyles;
			}

			//$.wijraphael.clearRaphaelCache();
			if (hidden) {
				element.css("left", oldLeft);
				element.css("position", oldPosition);
				element.hide();
			}
		},

		_calculatePosition: function (compass, width, height) {
			var point = { x: 0, y: 0 },
				marginX = 5,
				marginY = 5,
				canvasBounds = this.canvasBounds;
			switch (compass) {
			case "north":
				point.x = (canvasBounds.endX - canvasBounds.startX) / 2;
				point.y = canvasBounds.startY + height / 2 + marginY;
				canvasBounds.startY = canvasBounds.startY + marginY * 2 + height;
				break;
			case "south":
				point.x = (canvasBounds.endX - canvasBounds.startX) / 2;
				point.y = canvasBounds.endY - height / 2 - marginY;
				canvasBounds.endY = canvasBounds.endY - marginY * 2 - height;
				break;
			case "east":
				point.x = canvasBounds.endX - width / 2 - marginX;
				point.y = (canvasBounds.endY - canvasBounds.startY) / 2;
				canvasBounds.endX = canvasBounds.endX - marginX * 2 - width;
				break;
			case "west":
				point.x = canvasBounds.startX + width / 2 + marginX;
				point.y = (canvasBounds.endY - canvasBounds.startY) / 2;
				canvasBounds.startX = canvasBounds.startX + marginX * 2 + width;
				break;
			}
			return point;
		},

		_paintHeader: function () {
			var headerMargin = 2,
				self = this,
				o = self.options,
				header = o.header,
				compass = null,
				headerText = null,
				textStyle = null,
				bBox = null,
				point = null,
				box = null,
				rotation = 0, 
				headerContainer = null;

			if (header.text && header.text.length > 0 && header.visible) {
				compass = header.compass;
				headerText = self._text(0, 0, header.text);
				$.wijraphael.addClass($(headerText.node), "wijchart-header-text");
				// update for fixing bug 15884 at 2011/7/5
				// textStyle = $.extend(true, {}, o.textStyle,
				// header.textStyle);
				rotation = self._getRotationByCompass(compass);
				textStyle = $.extend(true, {}, o.textStyle,  header.textStyle);
				// end for fixing bug 15884.
				headerText.attr(textStyle);
				headerText.transform("...R" + rotation);
				bBox = headerText.wijGetBBox();
				point = self._calculatePosition(compass, bBox.width, bBox.height);

				// headerText.translate(point.x, point.y);
				headerText.transform(Raphael.format("...T{0},{1}", point.x, point.y));
				box = headerText.wijGetBBox();
				headerContainer = self.canvas.rect(
					box.x - headerMargin,
					box.y - headerMargin,
					box.width + 2 * headerMargin,
					box.height + 2 * headerMargin
				);
				$.wijraphael.addClass($(headerContainer.node), 
				"wijchart-header-container");
				headerContainer.attr(header.style);
				headerContainer.toBack();

				self.headerEles.push(headerText);
				self.headerEles.push(headerContainer);
			}
		},

		_paintFooter: function () {
			var footerMargin = 2,
				self = this,
				o = self.options,
				footer = o.footer,
				compass = null,
				footerText = null,
				textStyle = null,
				bBox = null,
				point = null,
				box = null,
				rotation = 0,
				footerContainer = null;

			if (footer.text && footer.text.length > 0 && footer.visible) {
				compass = footer.compass;
				footerText = self._text(0, 0, footer.text);
				$.wijraphael.addClass($(footerText.node), "wijchart-footer-text");
				// update for fixing bug 15884 at 2011/7/5
				// textStyle = $.extend(true, {}, o.textStyle,
				// footer.textStyle);
				rotation = self._getRotationByCompass(compass);
				textStyle = $.extend(true, {}, o.textStyle, footer.textStyle);
				// end for fixing bug 15884

				footerText.attr(textStyle);
				footerText.transform("...R" + rotation);
				bBox = footerText.wijGetBBox();
				point = self._calculatePosition(compass, bBox.width, bBox.height);

				// footerText.translate(point.x, point.y);
				footerText.transform(Raphael.format("...T{0},{1}", point.x, point.y));
				box = footerText.wijGetBBox();
				footerContainer = self.canvas.rect(
					box.x - footerMargin,
					box.y - footerMargin,
					box.width + 2 * footerMargin,
					box.height + 2 * footerMargin
				);
				$.wijraphael.addClass($(footerContainer.node), 
				"wijchart-footer-container");

				footerContainer.attr(footer.style);
				footerContainer.toBack();

				self.footerEles.push(footerText);
				self.footerEles.push(footerContainer);
			}
		},

		_getRotationByCompass : function (compass) {
			var rotation = 0;

			if (compass === "east") {
				rotation = 90;
			} else if (compass === "west") {
				rotation = -90;
			}

			return rotation;
		},

		_paintLegend: function () {
			if (!this.options.legend.visible) {
				return;
			}
			
			var self = this,
				o = self.options,
				legend = $.extend(true, {size: {
					width: 22,
					height: 10
				}}, o.legend),
				legendMargin = 2,
				seriesStyles = o.seriesStyles,
				tempSeriesList = [].concat(o.seriesList),
				compass = legend.compass,
				orientation = legend.orientation,
				legendTitle,
				textStyle,
				legendLen,
				textMargin,
				canvasBounds = self.canvasBounds,
				canvasWidth = canvasBounds.endX - canvasBounds.startX,
				canvasHeight = canvasBounds.endY - canvasBounds.startY,
				iconWidth = legend.size.width,
				iconHeight = legend.size.height,
				titleBox,
				titleHeight = 0,
				titleWidth = 0,
				maxWidth = 0,
				maxHeight = 0,
				totalWidth = 0,
				totalHeight = 0,
				columnNum = 1,
				rowNum = 0,
				width = 0,
				height = 0,
				offsetY = 0,
				index = 0,
				point,
				left,
				top,
				legendContainer,
				legendIconStyles = [],
				idx = 0,
				legendIndex = 0;

			if (legend.text && legend.text.length) {
				legendTitle = self._text(0, 0, legend.text);
				$.wijraphael.addClass($(legendTitle.node), "wijchart-legend-title");
				textStyle = $.extend(true, {}, o.textStyle,
					legend.textStyle, legend.titleStyle);
				legendTitle.attr(textStyle);
				self.legendEles.push(legendTitle);
			}

			if (legend.reversed) {
				tempSeriesList = tempSeriesList.reverse();
			}

			$.each(tempSeriesList, function (i, series) {
				// support hole.
				series = $.extend(true, { legendEntry: true, display: "show" }, series);
				// series = $.extend(true, { legendEntry: true }, series);
				// end comments.

				function drawSeriesLegend(series) {
					var index = legend.reversed ? tempSeriesList.length - 1 - idx : idx,
						seriesStyle = seriesStyles[index],
						chartStyle = $.extend(true, {
							fill: "none",
							opacity: 1,
							stroke: "black"
						}, seriesStyle),
						text,
						textStyle,
						chtStyle,
						isline = false,
						seriesType = series.type,
						icon;
						
						
					// if (series.legendEntry) {
					if (series.legendEntry && 
						series.display !== "exclude") {						
						text = self._text(0, 0, series.label);
						$.wijraphael.addClass($(text.node), 
						"wijchart-legend-text wijchart-legend");
						textStyle = $.extend(true, {}, o.textStyle, legend.textStyle);
						text.attr(textStyle);
						self.legends.push(text);
						chtStyle = $.extend(chartStyle, { "stroke-width": 1 });
						icon = self.canvas.rect(0, 0, iconWidth, iconHeight);
						$.wijraphael.addClass($(icon.node), 
						"wijchart-legend-icon wijchart-legend");
						icon.attr(chtStyle);
						self.legendIcons.push(icon);
						legendIconStyles.push(chtStyle);
						if (self.widgetName === "wijcompositechart") {
							isline = seriesType === "line" ||
								seriesType === "spline" ||
								seriesType === "bezier" ||
								seriesType === "area";
						}
						else {
							isline = self.widgetName === "wijlinechart";
						}
						if (series.visible === false && !isline) {
							$(text.node).data("hidden", true)
							.data("textOpacity", 
								text.attr("opacity") || 1);							
							text.attr("opacity", 0.3);
						}
						$(text.node).data("legendIndex", legendIndex)
							.data("index", idx);
						//$(icon.node).data("legendIndex", legendIndex)
						//	.data("index", idx);

						legendIndex++;
					}
					idx++;
				}

				if (series.type === "pie" && series.legendEntry) {
					$.each(series.data, function (j, data) {
						data = $.extend({ legendEntry: series.legendEntry }, data);	
						drawSeriesLegend(data);						
					});
				} else if (self._isPieChart()) {
					//fix tfs issue 20705
					drawSeriesLegend(series);
				} else {
					if ((series.data.x === undefined && series.data.xy === undefined) ||
						(series.data.xy === undefined && series.data.y === undefined)
					) {
						return true;
					}					
					drawSeriesLegend(series);
				}
			});

			legendLen = self.legends.length;
			textMargin = legend.textMargin;

			if (legendTitle) {
				titleBox = legendTitle.wijGetBBox();
				titleHeight = titleBox.height;
				titleWidth = titleBox.width;
			}

			$.each(self.legends, function (idx, legend) {
				var bBox = legend.wijGetBBox();

				if (bBox.width > maxWidth) {
					maxWidth = bBox.width;
				}

				if (bBox.height > maxHeight) {
					maxHeight = bBox.height;
				}
			});

			if (compass === "east" || compass === "west") {
				if (orientation === "horizontal") {
					totalWidth = legendLen * (maxWidth + iconWidth + legendMargin) +
						legendLen * (textMargin.left + textMargin.right);
					if (totalWidth > canvasWidth / 2) {
						columnNum = Math.floor(canvasWidth / 2 / maxWidth);
						if (columnNum < 1) {
							columnNum = 1;
						}
					} else {
						columnNum = legendLen;
					}
				} else if (orientation === "vertical") {
					totalHeight = maxHeight * legendLen + titleHeight + legendLen *
						(textMargin.top + textMargin.bottom);
					if (totalHeight > canvasHeight) {
						columnNum = Math.ceil(totalHeight / canvasHeight);
					} else {
						columnNum = 1;
					}
				}
			} else if (compass === "south" || compass === "north") {
				if (orientation === "horizontal") {
					totalWidth = (maxWidth + iconWidth + legendMargin) * legendLen +
						legendLen * (textMargin.left + textMargin.right);
					if (totalWidth > canvasWidth) {
						columnNum = Math.floor(legendLen / totalWidth * canvasWidth);
						if (columnNum < 1) {
							columnNum = 1;
						}
					} else {
						columnNum = legendLen;
					}
				} else if (orientation === "vertical") {
					totalHeight = maxHeight * legendLen + titleHeight +
						legendLen * (textMargin.top + textMargin.bottom);
					if (totalHeight > canvasHeight / 2) {
						rowNum = Math.floor(canvasHeight - titleHeight) /
							2 / maxHeight;
						columnNum = Math.ceil(legendLen / rowNum);
					} else {
						columnNum = 1;
					}
				}
			}

			// Fixed issue 20405 by dail. If all series 's legendEntry set to false.
			// and the compass set to south or north, the columnNum is zero.
			if (columnNum === 0) {
				columnNum = 1;
			}

			width = columnNum * (maxWidth + iconWidth + legendMargin) +
				columnNum * (textMargin.left + textMargin.right);
			height = maxHeight * Math.ceil(legendLen / columnNum) +
				titleHeight + Math.ceil(legendLen / columnNum) *
				(textMargin.top + textMargin.bottom);
			
			//fix tfs 20705
			width = width > titleWidth ? width : titleWidth;
			//end comments

			point = self._calculatePosition(compass, width, height);
			left = point.x - width / 2;
			top = point.y - height / 2;
			legendContainer = self.canvas.rect(left - legendMargin, top - legendMargin,
					width + 2 * legendMargin, height + 2 * legendMargin);
			$.wijraphael.addClass($(legendContainer.node), "wijchart-legend-container");
			legendContainer.attr(legend.style);
			legendContainer.toBack();
			self.legendEles.push(legendContainer);

			if (legendTitle) {
				// legendTitle.translate(left + width / 2, top + titleHeight /
				// 2);
				legendTitle.transform(Raphael.format("...T{0},{1}", left + width / 2, 
					top + titleHeight / 2));
			}

			offsetY = titleHeight;

			$.each(self.legends, function (idx, leg) {
				var bBox = leg.wijGetBBox(),
					icon = self.legendIcons[idx],
					x = left + index * (iconWidth + maxWidth + legendMargin) +
						(index + 1) * textMargin.left + index * textMargin.right,
					y = top + offsetY + bBox.height / 2 + textMargin.top,
					iconY = y - icon.wijGetBBox().height / 2, chtStyle, legCover;

				// icon.translate(x, y - icon.wijGetBBox().height / 2);
				// icon.transform(Raphael.format("...T{0},{1}", x, y -
				// icon.wijGetBBox().height / 2));
				icon.wijRemove();
				icon = null;
				icon = self.canvas.rect(x, iconY, iconWidth, iconHeight);

				$(icon.node).data("legendIndex", $(leg.node).data("legendIndex"))
					.data("index", $(leg.node).data("index"));
				//$(icon.node).data("index", seriesIdx);
				$.wijraphael.addClass($(icon.node), 
				"wijchart-legend-icon wijchart-legend");
				self.legendIcons[idx] = icon;
				chtStyle = legendIconStyles[idx];
				if (chtStyle) {
					icon.attr(chtStyle);
					if ($(leg.node).data("hidden") === true) {
						$(leg.node).data("iconOpacity", icon.attr("opacity") || 1);
						icon.attr("opacity", 0.3);
					}
				}

				// leg.translate(x + iconWidth + legendMargin + bBox.width / 2,
				// y);
				leg.transform(Raphael.format("...T{0},{1}", 
				x + iconWidth + legendMargin + bBox.width / 2, y));
				//It's hard to click the text in vml, so add a rect to cover it for clicking.
				if (Raphael.vml) {
					legCover = self.canvas.rect(x + iconWidth + legendMargin, 
						y - bBox.height / 2, bBox.width, bBox.height).attr({
							stroke: "none",
							fill: "#000000",
							opacity: 0.01
						});
					$.wijraphael.addClass($(legCover.node), 
					"wijchart-legend-textCover wijchart-legend");
					$(legCover.node).data("legendIndex", $(leg.node).data("legendIndex"));
					$(legCover.node).data("index", $(leg.node).data("index"));
					self.legendEles.push(legCover);
				}
				//end
				leg.toFront();
				//$(leg.node).data("index", seriesIdx);

				index++;

				if (index === columnNum) {
					index = 0;
					offsetY += maxHeight + textMargin.top + textMargin.bottom;
				}
			});
		},

		_hasAxes: function () {
			if (this.widgetName === "wijpiechart") {
				return false;
			}
			return true;
		},

		_applyAxisText: function (axisOptions, axisInfo) {
			var self = this,
				text = axisOptions.text,
				textBounds = null,
				tempText = null,
				textStyle = null,
				textMarginVer = 0,
				textMarginHor = 0,
				canvasBounds = self.canvasBounds;

			if (text !== null && text !== undefined && text.length > 0) {
				tempText = self._text(-100, -100, text);
				textStyle = $.extend(true, {},
					self.options.textStyle, axisOptions.textStyle);
				tempText.attr(textStyle);
				textBounds = tempText.wijGetBBox();
				if (textStyle["margin-left"]) {
					textMarginHor += parseFloat(textStyle["margin-left"]);
				}
				if (textStyle["margin-top"]) {
					textMarginVer += parseFloat(textStyle["margin-top"]);
				}
				if (textStyle["margin-right"]) {
					textMarginHor += parseFloat(textStyle["margin-right"]);
				}
				if (textStyle["margin-bottom"]) {
					textMarginVer += parseFloat(textStyle["margin-bottom"]);
				}

				switch (axisOptions.compass) {
				case "north":
					canvasBounds.startY += (textBounds.height + textMarginVer);
					break;
				case "south":
					canvasBounds.endY -= (textBounds.height + textMarginVer);
					break;
				case "east":
					canvasBounds.endX -= (textBounds.height + textMarginHor);
					break;
				case "west":
					canvasBounds.startX += (textBounds.height + textMarginHor);
					break;
				}
				tempText.wijRemove();
				tempText = null;
			}

			return textBounds;
		},

		_isSeriesDataEmpty: function () {
			var self = this,
				sl = self.options.seriesList;

			if (!sl || sl.length === 0) {
				return true;
			}

			$.each(sl, function (idx, s) {
				if (!s.data || ((!s.data.x || !s.data.y) && !s.data.xy)) {
					return true;
				}
			});

			return false;
		},

		_paintTooltip: function () {
			var self = this,
				o = self.options,
				hint = o.hint,
				hintEnable = !o.disabled && hint.enable,
				hintEx = hint,
				title,
				content,
				isFunction = $.isFunction;

			if (hintEnable && !self.tooltip) {
				hintEx = $.extend(true, {}, hint, {
					// closeBehavior: "none",
					// triggers: "custom"
				});
				title = hint.title;
				content = hint.content;

				if (isFunction(title)) {
					hintEx.title = function () {
						return self._getTooltipText(title, this.target);
					};
				}

				if (isFunction(content)) {
					hintEx.content = function () {
						return self._getTooltipText(content, this.target);
					};
				}

				hintEx.beforeShowing = function () {
					self._onBeforeTooltipShowing(this);
				};

				self.tooltip = self.canvas.tooltip(null, hintEx);
			}
		},

		_getTooltipText: function (fmt, target) {
			var dataObj = $(target.node).data("wijchartDataObj"),
				obj = {
					data: dataObj,
					label: dataObj.label,
					x: dataObj.x,
					y: dataObj.y,
					target: target,
					fmt: fmt
				};
			return $.proxy(fmt, obj)();
		},

		_onBeforeTooltipShowing: function (tooltip) {
			var target = tooltip.target,
				hintStyle = this.options.hint.style;

			if (target) {
				tooltip.options.style.stroke = hintStyle.stroke ||
					target.attrs.stroke ||
					target.attrs.fill;
			}
		},

		_paintChartArea: function () {
			var self = this,
				o = self.options,
				axisOption = o.axis,
			// The value is used to offset the tick major
			// text from the tick rect.
				axisTextOffset = 2,
				xTextBounds = null,
				yTextBounds = null,
				extremeValue = {},
				maxtries = 5,
				offsetX = 0,
				offsetY = 0,
				isMultiYAxis = $.isArray(axisOption.y),
				yAxisCount = 0, yIdx, yaxisOpt, key;

			self._applyMargins();

			self.isMultiYAxis = isMultiYAxis;
			
			if (self._isSeriesDataEmpty()) {
				return;
			}

			if (isMultiYAxis) {
				$.each(axisOption.y, function (i, yaxis) {
					axisOption.y[i] = $.extend(true, {
						alignment: "center",
						style: {
							stroke: "#999999",
							"stroke-width": 0.5
						},
						visible: false,
						textVisible: true,
						text: "",
						textStyle: {
							fill: "#888",
							"font-size": 15,
							"font-weight": "bold"
						},
						labels: {
							style: {
								fill: "#333",
								"font-size": 11
							},
							textAlign: "center",
							width: null
						},
						compass: "west",
						autoMin: true,
						autoMax: true,
						min: null,
						max: null,
						origin: null,
						autoMajor: true,
						autoMinor: true,
						unitMajor: null,
						unitMinor: null,
						gridMajor: {
							visible: true,
							style: {
								stroke: "#999999",
								"stroke-width": "0.5",
								"stroke-dasharray": "none"
							}
						},
						gridMinor: {
							visible: false,
							style: {
								stroke: "#CACACA",
								"stroke-dasharray": "- "
							}
						},
						tickMajor: {
							position: "none",
							style: { fill: "black" },
							factor: 1
						},
						tickMinor: {
							position: "none",
							style: { fill: "black" },
							factor: 1
						},
						annoMethod: "values",
						annoFormatString: "",
						valueLabels: []
					}, yaxis);
				});
			}

			if (self._hasAxes()) {
				// Restore from cache.
				if (self.innerState.axisInfo) {
					self.axisInfo = self.innerState.axisInfo;
					self.canvasBounds = self.innerState.canvasBounds;
				} else {
					xTextBounds = self._applyAxisText(axisOption.x, {});
					self.axisInfo = {
						x: {
							id: "x",
							tprec: 0,
							isTime: false,
							offset: 0,
							vOffset: 0,
							max: 0,
							min: 0,
							majorTickRect: null,
							minorTickRect: null,
							annoFormatString: null,
							textBounds: xTextBounds,
							axisTextOffset: axisTextOffset,
							autoMax: true,
							autoMin: true,
							autoMajor: true,
							autoMinor: true
						},
						y: {}
					};

					if (isMultiYAxis) {
						$.each(axisOption.y, function (i, axisY) {
							yTextBounds = self._applyAxisText(axisY, {});
							self.axisInfo.y[i.toString()] = {
								id: "y" + i,
								tprec: 0,
								isTime: false,
								offset: 0,
								vOffset: 0,
								max: 0,
								min: 0,
								majorTickRect: null,
								minorTickRect: null,
								annoFormatString: null,
								textBounds: yTextBounds,
								axisTextOffset: axisTextOffset,
								autoMax: true,
								autoMin: true,
								autoMajor: true,
								autoMinor: true
							};
						});				
					} else
					{
						yTextBounds = self._applyAxisText(axisOption.y, {});
						self.axisInfo.y["0"] = {
							id: "y",
							tprec: 0,
							isTime: false,
							offset: 0,
							vOffset: 0,
							max: 0,
							min: 0,
							majorTickRect: null,
							minorTickRect: null,
							annoFormatString: null,
							textBounds: yTextBounds,
							axisTextOffset: axisTextOffset,
							autoMax: true,
							autoMin: true,
							autoMajor: true,
							autoMinor: true
						};
					}

					self._getSeriesGroup();
					extremeValue = self._getDataExtreme(isMultiYAxis);

					// handle x axis.
					if (axisOption.x.autoMin && self.axisInfo.x.autoMin) {
						axisOption.x.min = extremeValue.txn;
					} else if (axisOption.x.min && self._isDate(axisOption.x.min)) {
						// if is date time, convert to number.
						axisOption.x.min = $.toOADate(axisOption.x.min);
					}
					if (axisOption.x.autoMax && self.axisInfo.x.autoMax) {
						axisOption.x.max = extremeValue.txx;
					} else if (axisOption.x.max && self._isDate(axisOption.x.max)) {
						// if is date time, convert to number.
						axisOption.x.max = $.toOADate(axisOption.x.max);
					}


					$.each(extremeValue.y, function (key, exval) {
						yAxisCount++;
					});


					for (yIdx = 0; yIdx < yAxisCount; yIdx++) {
						yaxisOpt = axisOption.y[yIdx] || axisOption.y;
						key = yIdx.toString();
						if (yaxisOpt.autoMin && self.axisInfo.y[key].autoMin) {
							yaxisOpt.min = extremeValue.y[key].tyn;
						} else if (yaxisOpt.min && self._isDate(yaxisOpt.min)) {
							// if is date time, convert to number.
							yaxisOpt.min = $.toOADate(yaxisOpt.min);
						}

						if (yaxisOpt.autoMax && self.axisInfo.y[key].autoMax) {
							yaxisOpt.max = extremeValue.y[key].tyx;
						} else if (yaxisOpt.max && self._isDate(yaxisOpt.max)) {
							// if is date time, convert to number.
							yaxisOpt.max = $.toOADate(yaxisOpt.max);
						}

						do {
							offsetY = self._autoPosition(self.axisInfo, 
							axisOption, "y", key);
							offsetX = self._autoPosition(self.axisInfo, 
							axisOption, "x", key);

							if (offsetY === self.axisInfo.y[key].offset &&
									offsetX === self.axisInfo.x.offset) {
								maxtries = 0;
								break;
							}
							if (!isNaN(offsetX) && !isNaN(offsetY)) {
								if (offsetY !== self.axisInfo.y[key].offset && 
									offsetY !== 0) {
									self.axisInfo.y[key].offset = offsetY;
									self.axisInfo.y[key].vOffset = offsetX;
								}
								if (offsetX !== self.axisInfo.x.offset && 
									offsetX !== 0) {
									self.axisInfo.x.offset = offsetX;
									self.axisInfo.x.vOffset = offsetY;
								}
							}
							maxtries--;
						} while (maxtries > 0);
					}

					self._adjustPlotArea(axisOption.x, self.axisInfo.x);
					self._adjustPlotArea(axisOption.y, self.axisInfo.y, true);

					self.innerState.axisInfo = self.axisInfo;
					self.innerState.canvasBounds = self.canvasBounds;
				}
				self._paintAxes();
				self._paintPlotArea();
			} else {
				self._paintPlotArea();
			}
		},


		_getSeriesGroup: function () {
			var self = this,
				o = self.options, 
				group = {};

			$.each(o.seriesList, function (i, serie) {
				if (serie.yAxis) {
					if (group[serie.yAxis.toString()]) {
						group[serie.yAxis.toString()].push(serie);
					}
					else {
						group[serie.yAxis.toString()] = [serie];
					}
				}
				else {
					if (group["0"]) {
						group["0"].push(serie);
					}
					else {
						group["0"] = [serie];
					}
				}
			});
			self.seriesGroup = group;
		},

		_adjustPlotArea: function (axisOptions, axisInfo, isYAxis) {
			var canvasBounds = this.canvasBounds, maxKey, maxOffsets = {
				east: Number.MIN_VALUE,
				west: Number.MIN_VALUE,
				south: Number.MIN_VALUE,
				north: Number.MIN_VALUE
			};

			if (isYAxis) {
				$.each(axisInfo, function (key, axisInf) {
					maxKey = key;
				});
				$.each(axisInfo, function (key, axisInf) {
					var opt = axisOptions[key] || axisOptions,
						compass = opt.compass;
					opt.max = axisInf.max;
					opt.min = axisInf.min;

					switch (compass) {
					case "north":
						maxOffsets.north = Math.max(axisInf.offset, maxOffsets.north);
						break;
					case "south":
						maxOffsets.south = Math.max(axisInf.offset, maxOffsets.south);
						break;
					case "east":
						maxOffsets.east = Math.max(axisInf.offset, maxOffsets.east);
						break;
					case "west":
						maxOffsets.west = Math.max(axisInf.offset, maxOffsets.west);
						
						break;
					}
				});
				
				if (maxOffsets.north !== Number.MIN_VALUE) {
					canvasBounds.startY += maxOffsets.north;
				}

				if (maxOffsets.south !== Number.MIN_VALUE) {
					canvasBounds.endY -= maxOffsets.south;
				}

				if (maxOffsets.east !== Number.MIN_VALUE) {
					canvasBounds.endX -= maxOffsets.east;
				}
				
				if (maxOffsets.west !== Number.MIN_VALUE) {
					canvasBounds.startX += maxOffsets.west;
				}			
			}
			else {
				axisOptions.max = axisInfo.max;
				axisOptions.min = axisInfo.min;

				switch (axisOptions.compass) {
				case "north":
					canvasBounds.startY += axisInfo.offset;
					break;
				case "south":
					canvasBounds.endY -= axisInfo.offset;
					break;
				case "east":
					canvasBounds.endX -= axisInfo.offset;
					break;
				case "west":
					canvasBounds.startX += axisInfo.offset;
					break;
				}
			}
		},

		_autoPosition: function (axisInfo, axisOptions, dir, key) {
			// this._adjustCartesianCompass();
			// base._autoPosition();
			return this._autoPositionCartesianAxis(axisInfo, axisOptions, dir, key);
		},

		_autoPositionCartesianAxis: function (axisInfo, axisOptions, dir, key) {
			var self = this,
				extent = null,
				innerAxisInfo, innerAxisOptions,
				oppositeAxisInfo, oppositeAxisOptions,
				//bounds = self.canvasBounds,
				compass, origin, max, min,				
				//oppositeDir = dir === "x" ? "y" : "x",

				lastAxisOffset = self.lastAxisOffset || {},

				//origin = axisOptions[oppositeDir].origin,
				//max = axisInfo[oppositeDir].max,
				//min = axisInfo[oppositeDir].min,
				//d = 0, 
				offset, lastOffset;

			if (dir === "y") {
				innerAxisInfo = axisInfo.y[key];
				innerAxisOptions = axisOptions.y[key] || axisOptions.y;
				oppositeAxisOptions = axisOptions.x;
				oppositeAxisInfo = axisInfo.x;
			}
			else {
				innerAxisInfo = axisInfo.x;
				innerAxisOptions = axisOptions.x;
				oppositeAxisInfo = axisInfo.y[key];
				oppositeAxisOptions = axisOptions.y[key] || axisOptions.y;
			}
			compass = innerAxisOptions.compass;
			origin = oppositeAxisOptions.origin;
			max = oppositeAxisInfo.max;
			min = oppositeAxisInfo.min;

			if (origin !== null && self._isDate(origin)) {
				origin = $.toOADate(origin);
			}

			self._calculateParameters(innerAxisInfo, innerAxisOptions);
			extent = self._getMaxExtents(innerAxisInfo, innerAxisOptions);
			switch (compass) {
			case "north":
			case "south":
				offset = extent.height;
				innerAxisInfo.maxExtent = offset;
			
//				
//			if (origin !== null && origin >= min && origin <= max) {
//				if (compass === "south") {
//					d = (origin - min) / (max - min) * (bounds.endY - bounds.startY);
//				} else {
//					d = (max - origin) / (max - min) * (bounds.endY - bounds.startY);
//				}

//				offset -= d;

//				if (offset < 0) {
//					offset = 0;
//				}
//			}
				break;				
			case "east":
			case "west":
				offset = extent.width;
				innerAxisInfo.maxExtent = offset;				
//			if (origin !== null && origin >= min && origin <= max) {
//				if (compass === "west") {
//				d = (origin - min) / (max - min) * (bounds.endX - bounds.startX);

//				} else {
//					d = (max - origin) / (max - min) * (bounds.endX - bounds.startX);
//				}				

//				offset -= d;

//				if (offset < 0) {
//					offset = 0;
//				}
//			}
				break;
			}
			if (dir === "y" && lastAxisOffset[compass]) {
				$.each(lastAxisOffset[compass], function (k, offsetObj) {
					if (k !== key) {
						lastOffset = offsetObj;
					}
				});
				if (lastOffset) {
					innerAxisInfo.preStartOffset = lastOffset;
					offset += (lastOffset);
				}				
			}
			if (dir === "y") {
				if (lastAxisOffset[compass] === undefined) {
					lastAxisOffset[compass] = {};
				}

				lastAxisOffset[compass][key] = offset + 
				self._getAxisLabelBox(innerAxisOptions).width;
				self.lastAxisOffset = lastAxisOffset;
			}
			
			return offset;
						
		},


		_getAxisLabelBox: function (axisOption) {
			var self = this,
				o = self.options,
				text = axisOption.text,
				marginTop = 0,
				marginRight = 0,
				marginLeft = 0,
				marginBottom = 0,
				textElement, bbox,
				isVertical = self._isVertical(axisOption.compass),
				textStyle = $.extend(true, {}, o.textStyle, axisOption.textStyle);

			if (textStyle["margin-top"]) {
				marginTop = parseFloat(textStyle["margin-top"]);
			}
			if (textStyle["margin-left"]) {
				marginLeft = parseFloat(textStyle["margin-left"]);
			}
			if (textStyle["margin-right"]) {
				marginRight = parseFloat(textStyle["margin-right"]);
			}
			if (textStyle["margin-bottom"]) {
				marginBottom = parseFloat(textStyle["margin-bottom"]);
			}
			textElement = self._text(0, 0, text);
			textElement.attr(textStyle);
			if (isVertical) {
				textElement.transform("...R-90");
			}
			bbox = textElement.wijGetBBox();
			textElement.wijRemove();
			textElement = null;
			return {
				width: bbox.width + marginLeft + marginRight,
				height: bbox.height + marginBottom + marginTop
			};
		},

		_getMaxExtents: function (axisInfo, axisOptions, axisRect) {
			var self = this,
				o = self.options,
				majorTickValues = null,
				maxExtent = {
					width: 0,
					height: 0
				},
				min = axisInfo.min,
				max = axisInfo.max,
				isTime = axisInfo.isTime,
				formatString = axisOptions.annoFormatString,
				is100pc = o.is100Percent,
				index = 0,
				compass = axisOptions.compass,
				labels = axisOptions.labels,
				textStyle,
				hasDefaultRotation = false,
				canvasBounds = self.canvasBounds,
				width,
				transform;

			axisInfo.majorTickRect = self._getTickRect(axisInfo, axisOptions,
														true, true, axisRect);
			axisInfo.minorTickRect = self._getTickRect(axisInfo, axisOptions,
														false, true, axisRect);
			majorTickValues = self._getMajorTickValues(axisInfo, axisOptions);
			
			if (!axisOptions.textVisible) {
				return maxExtent;
			}
			if (!formatString || formatString.length === 0) {
				formatString = axisInfo.annoFormatString;
			}

			textStyle = $.extend(true, {}, o.textStyle,
				axisOptions.textStyle, labels.style);
			transform = textStyle.transform;
			if (transform && transform.length) {
				$.each(transform, function (i, t) {
					if (t[0].toLowerCase() === "r") {
						hasDefaultRotation = true;
						return false;
					}
				});
			}
			// hasDefaultRotation = typeof (textStyle.rotation) !== "undefined";
			textStyle = $.extend(true, textStyle, axisInfo.textStyle);
			width = canvasBounds.endX - canvasBounds.startX -
				axisInfo.vOffset - axisInfo.axisTextOffset;
			if (majorTickValues && majorTickValues.length) {
				width = width / (majorTickValues.length - 1);
				$.each(majorTickValues, function (idx, mtv) {
					var txt,
						size,
						txtClone;

					if (mtv < min || mtv > max) {
						return true;
					}

					if (axisOptions.annoMethod === "valueLabels") {
						if (mtv < 0) {
							return true;
						}

						if (index >= axisOptions.valueLabels.length) {
							return false;
						}

						// mtv = axisOptions.valueLabels[index].text;
						mtv = axisOptions.valueLabels[index];
						if (mtv.text) {
							mtv = mtv.text;
						} else if (typeof mtv.value !== "undefined") {
							mtv = mtv.value;
							if (formatString && formatString.length) {
								// mtv = $.format(mtv, formatString);
								mtv = Globalize.format(mtv, formatString, 
									self._getCulture());
							}
						}
					} else if (axisOptions.annoMethod === "values") {
						if (formatString && formatString.length) {
							if (isTime) {
								mtv = $.fromOADate(mtv);
							}

							// mtv = $.format(mtv, formatString);
							mtv = Globalize.format(mtv, formatString, self._getCulture());
						} else if (is100pc && axisInfo.id === "y") {
							// mtv = $.format(mtv, "p0");
							mtv = Globalize.format(mtv, "p0", 
								self._getCulture());
						}
					}

					if (labels.width) {
						txt = self.canvas.wrapText(-100, -100, mtv,
								labels.width, labels.textAlign, textStyle);
					} else {
						txt = self._text(-100, -100, mtv).attr(textStyle);
					}

					size = txt.wijGetBBox();

					if (!self._isVertical(compass) && !hasDefaultRotation &&
							axisOptions.annoMethod === "valueLabels") {
						if (size.width > width) {
							txt.attr({transform: "r-45"});
							size = txt.wijGetBBox();
							/*
							 * if (!txt.attr().rotation) { txt.attr({ rotation:
							 * -45 }); textStyle.rotation = -45;
							 * axisInfo.textStyle = { rotation: -45 }; size =
							 * txt.wijGetBBox(); }
							 */
							if (idx === 0) {
								textStyle.transform = "r-45";
								axisInfo.textStyle = {
									transform: "r-45"	
								};
								txtClone = txt.clone();
								txtClone.attr({ transform: "r0" });
								size = txtClone.wijGetBBox();
								if (Math.sqrt(2) * size.height > width) {
									txt.attr({transform: "r-90"});
									// textStyle.transform.push(["r", -90]);
									textStyle.transform = "r-90";
									axisInfo.textStyle = {
											transform: "r-90"	
										};
								}
								txtClone.wijRemove();
								txtClone = null;
								size = txt.wijGetBBox();
							}
						}
						/*
						 * if (idx === 0 && txt.attr().rotation &&
						 * txt.attr().rotation === -45) { txtClone =
						 * txt.clone(); txtClone.attr({ rotation: 0 }); size =
						 * txtClone.wijGetBBox(); if (Math.sqrt(2) * size.height >
						 * width) { txt.attr({ rotation: -90 });
						 * textStyle.rotation = -90; axisInfo.textStyle = {
						 * rotation: -90 }; } txtClone.wijRemove(); size =
						 * txt.wijGetBBox(); }
						 */
					}
					txt.wijRemove();
					txt = null;
					if (size.width > maxExtent.width) {
						maxExtent.width = size.width;
					}

					if (size.height > maxExtent.height) {
						maxExtent.height = size.height;
					}

					index++;
				});
			}
			if (maxExtent.width < labels.width) {
				maxExtent.width = labels.width;
			}

			axisInfo.labelWidth = maxExtent.width;
			return maxExtent;
		},

		_getMajorTickValues: function (axisInfo, axisOptions) {
			var rc = [],
				valueLabels = axisOptions.valueLabels;
			if (valueLabels && valueLabels.length > 0) {
				$.each(valueLabels, function (idx, valueLabel) {
					if (typeof valueLabel.text !== "undefined" ||
							 typeof valueLabel.value !== "undefined") {
						return false;
					}
					if (typeof valueLabel === "string") {
						valueLabels[idx] = {
							text: valueLabel,
							gridLine: false
						};
					} else {
						valueLabels[idx] = {
							value: valueLabel,
							gridLine: false
						};
					}
				});
			}
			if (axisOptions.annoMethod === "valueLabels" && 
					valueLabels && valueLabels.length > 0 && 
					typeof valueLabels[0].value !== "undefined") {
				rc = this._getSortedDataValues(axisInfo, axisOptions);
				return rc;
			}
			// rc = this._getTickValues(axisInfo.max, axisInfo.min,
			// axisOptions.unitMajor, axisInfo.tprec, !axisInfo.isTime);
			rc = this._getTickValues(axisInfo.max, axisInfo.min,
				axisOptions.unitMajor, axisInfo.tprec, !axisInfo.isTime,
				axisOptions.autoMajor);
			return rc;
		},
		
		_getSortedDataValues: function (axisInfo, axisOptions) {
			var self = this,
				rc = [],
				// isXAxis = (axisInfo.id === "x"),
				valueLabels = axisOptions.valueLabels;
			$.each(valueLabels, function (idx, label) {
				var val = label.value;
				if (self._isDate(val)) {
					rc.push($.toOADate(val));
				} else if (typeof val === 'number') {
					rc.push(val);
				} else {
					rc.push(idx);
				}
				// if (self._isDate(label)) {
				// rc.push($.toOADate(label));
				// } else if (typeof label === 'number') {
				// rc.push(label);
				// } else {
				// rc.push(idx);
				// }
			});
			// TODO: ignore blank labels.
			
			return rc;
		},

		_getMinorTickValues: function (axisInfo, axisOptions) {
			var rc = [];
			// rc = this._getTickValues(axisInfo.max, axisInfo.min,
			// axisOptions.unitMinor, axisInfo.tprec, !axisInfo.isTime);
			rc = this._getTickValues(axisInfo.max, axisInfo.min,
				axisOptions.unitMinor, axisInfo.tprec, !axisInfo.isTime,
				axisOptions.autoMinor);
			return rc;
		},

		// _getTickValues: function (smax, smin, unit, tickprec, round) {
		_getTickValues: function (smax, smin, unit, tickprec, round, autoTick) {
			var self = this,
				vals = [],
				sminOriginal = smin,
				i = 0,
				xs = 0,
				imax = 0,
				imin = 0,
				n = 0,
				smin2 = 0;

			try {
				if (unit === 0) {
					vals = [smax, smin];
				} else {
					if (autoTick) {
						if (tickprec + 1 < 0) {
							tickprec = -1;
						} else if (tickprec + 1 > 15) {
							tickprec = 14;
						}
						smin2 = $.round(self._signedCeiling(smin / unit) * unit,
											tickprec + 1);
						if (smin2 < smax) {
							smin = smin2;
						}
						imax = parseInt($.round(smax / unit, 5), 10);
						imin = parseInt($.round(smin / unit, 5), 10);
						n = parseInt(imax - imin + 1, 10);
						if (n > 1) {
							xs = imin * unit;
							if (xs < smin) {
								n--;
								smin += unit;
							}
							xs = smin + (n - 1) * unit;
							if (xs > smax) {
								n--;
							}
						}
						if (n < 1) {
							n = 2;
							smin = sminOriginal;
							unit = smax - smin;
						}
					} else {
						n = parseInt((smax - smin) / unit + 1, 10);
						if (n > 1) {
							xs = smin + (n - 1) * unit;
							if (xs > smax) {
								n--;
							}
						}
						if (n < 1) {
							n = 2;
							unit = smax - smin;
						}
					}

					for (i = 0; i < n; i++) {
						if (round) {
							// vals[i] = $.round(smin + i * unit, tickprec + 1);
							if (autoTick) {
								vals[i] = $.round(smin + i * unit, tickprec + 1);
							} else {
								vals[i] = smin + i * unit;
							}
						} else {
							vals[i] = smin + i * unit;
						}
					}
				}
			} catch (error) { }

			return vals;
		},

		_getTickRect: function (axisInfo, axisOptions, isMajor, inAxisRect) {
			var compass = axisOptions.compass,
				sizeFactor = 0,
				tick = null,
				majorSizeFactor = 3,
				minorSizeFactor = 2,
				thickness = 2,
				majorFactor = axisOptions.tickMajor.factor,
				minorFactor = axisOptions.tickMinor.factor,
				r = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
			if (isMajor) {
				tick = axisOptions.tickMajor.position;
				majorFactor = majorFactor > 0 ? majorFactor : 1;
				sizeFactor = (majorSizeFactor * majorFactor);
			} else {
				tick = axisOptions.tickMinor.position;
				minorFactor = minorFactor > 0 ? minorFactor : 1;
				sizeFactor = (minorSizeFactor * minorFactor);
			}
			if (tick === "none" || (tick === "inside" && inAxisRect)) {
				sizeFactor = 0;
			}
			// if(isVertical) {
			if (compass === "east" || compass === "west") {
				r = {
					x: 0,
					y: -1,
					width: sizeFactor * thickness,
					height: thickness
				};
				if ((compass === "east" && (tick === "outside" ||
						(tick === "cross" && inAxisRect))) ||
						(compass === "west" && tick === "inside")) {
					// r.x = axisRect.x;
					// if(inAxisRect) {
					// r.x += axisRect.width;
					// }
					// else {
					// r.width += axisRect.width;
					// }
					r.width += 2; // default value of axisRect is 2.
				} else {
					// r.x = axisRect.x - sizeFactor * thickness;
					if (!inAxisRect) {
						if (tick === "cross") {
							r.width <<= 1;
						}
						// r.width += axisRect.width;
						r.width += 2;
					}
				}
			} else {
				r = {
					x: -1,
					y: 0,
					width: thickness,
					height: sizeFactor * thickness
				};
				if ((compass === "south" && (tick === "outside" ||
						(tick === "corss" && inAxisRect))) ||
						(compass === "north" && tick === "inside")) {
					// r.y = axisRect.y;
					// if(inAxisRect) {
					// r.y += axisRect.height;
					// }
					// else {
					// r.height += axisRect.height;
					// }
					r.height += 2;
				} else {
					// r.y = axisRect.y - sizeFactor * thickness;
					if (!inAxisRect) {
						if (tick === "cross") {
							r.height <<= 1;
						}
						// r.height += axisRect.height;
						r.height += 2;
					}
				}
			}
			return r;
		},

		_applyMargins: function () {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds;

			canvasBounds.startX += o.marginLeft;
			canvasBounds.endX -= o.marginRight;
			canvasBounds.startY += o.marginTop;
			canvasBounds.endY -= o.marginBottom;
		},

		_paintAxes: function () {
			// paint x axis
			var self = this,
				axis = self.options.axis,
				axisInfo = self.axisInfo,
				ox = axis.x,
				oy = axis.y,
				x = axisInfo.x,
				y = axisInfo.y,
				axisElements;
			axisElements = self._paintAxis(ox, x);

			$.each(y, function (key, yaxis) {
				var opt = oy[key] || oy;
				if (opt.origin !== null) {
					self._translateAxisIfNeeded(axisElements, ox.compass, 
						opt.origin, opt.compass, yaxis.max, yaxis.min);
				}
			});

//			if (oy.origin !== null) {
//				self._translateAxisIfNeeded(axisElements, ox.compass, 
//					oy.origin, oy.compass, y.max, y.min);
//			}

			$.each(y, function (key, yaxis) {
				var opt = oy[key] || oy;
				axisElements = self._paintAxis(opt, yaxis);			
				if (ox.origin !== null) {
					self._translateAxisIfNeeded(axisElements, opt.compass, 
						ox.origin, ox.compass, x.max, x.min);
				}					
			});
		},

		_translateAxisIfNeeded: function (xAxisElements, 
			xCompass, yOrigin, yCompass, yMax, yMin) {
			var self = this,
				isVertical = yCompass === "west" || yCompass === "east",
				bounds = self.canvasBounds,
				origin = yOrigin,
				offset;
			
			if (self._isDate(origin)) {
				origin = $.toOADate(origin);
			}

			if (!isVertical) {
				if (xCompass === "west") {
					offset = (origin - yMin) / (yMax - yMin) *
						(bounds.endX - bounds.startX);
				} else {
					offset = (origin - yMax) / (yMax - yMin) *
						(bounds.endX - bounds.startX);
				}

				$.each(xAxisElements, function (idx, element) {
					// element.translate(offset, 0);
					element.transform(Raphael.format("...T{0},{1}", offset, 0));
				});
			} else {
				if (xCompass === "south") {
					offset = (yMin - origin) / (yMax - yMin) *
						(bounds.endY - bounds.startY);
				} else {
					offset = (yMax - origin) / (yMax - yMin) *
						(bounds.endY - bounds.startY);
				}

				$.each(xAxisElements, function (idx, element) {
					// element.translate(0, offset);
					element.transform(Raphael.format("...T{0},{1}", 0, offset));
				});
			}
		},

		_paintAxis: function (axisOptions, axisInfo) {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds,
				startPoint = {
					x: 0,
					y: 0
				},
				endPoint = {
					x: 0,
					y: 0
				},
				compass = axisOptions.compass,
				thickness = 2,
				isVertical = true,
				ax = null,
			// paint tick & ticklabel
				majorTickValues = [],
				tempMinorTickValues = [],
				minorTickValues = [],
				max = axisInfo.max,
				min = axisInfo.min,
				unitMajor = axisOptions.unitMajor,
				unitMinor = axisOptions.unitMinor,
				tickMajor = axisOptions.tickMajor.position,
				tickMinor = axisOptions.tickMinor.position,
				axisSize = axisInfo.maxExtent,// axisInfo.offset,
				tickMajorStyle = axisOptions.tickMajor.style,
				tickMinorStyle = axisOptions.tickMinor.style,
				tickRectMajor = axisInfo.majorTickRect,
				tickRectMinor = axisInfo.minorTickRect,
				axisTextOffset = axisInfo.axisTextOffset,
				gridMajor = axisOptions.gridMajor,
				gridMinor = axisOptions.gridMinor,
				labels = axisOptions.labels,
				maxLen = 0,
				textInfos = [],
				index = 0, 
				formatString = axisOptions.annoFormatString,
				textStyle = null,
				axisElements = [];
			
			tickRectMajor = self._getTickRect(axisInfo, axisOptions, true, false);
			tickRectMinor = self._getTickRect(axisInfo, axisOptions, false, false);

			if (!formatString || formatString.length === 0) {
				formatString = axisInfo.annoFormatString;
			}
			majorTickValues = self._getMajorTickValues(axisInfo, axisOptions);

			//if (tickMinor !== "none") {
			tempMinorTickValues = self._getMinorTickValues(axisInfo, axisOptions);
			minorTickValues = self._resetMinorTickValues(tempMinorTickValues,
						majorTickValues);
			//}

			//add comments here to fix tfs issue 20415,paint the axis inside the plotarea.
			switch (compass) {
			case "south":
				startPoint.x = canvasBounds.startX;
				startPoint.y = canvasBounds.endY;
				endPoint.x = canvasBounds.endX;
				endPoint.y = canvasBounds.endY;
				isVertical = false;
				break;
			case "north":
				startPoint.x = canvasBounds.startX;
				startPoint.y = canvasBounds.startY - thickness;
				endPoint.x = canvasBounds.endX;
				endPoint.y = canvasBounds.startY - thickness;
				isVertical = false;
				break;
			case "east":
				//startPoint.x = canvasBounds.endX;
				startPoint.x = canvasBounds.endX - thickness;
				if (axisInfo.preStartOffset) {
					startPoint.x += axisInfo.preStartOffset;
				}
				startPoint.y = canvasBounds.endY;
				//endPoint.x = canvasBounds.endX;
				endPoint.x = canvasBounds.endX - thickness;
				endPoint.y = canvasBounds.startY;
				break;
			case "west":				
				//startPoint.x = canvasBounds.startX - thickness;
				startPoint.x = canvasBounds.startX;
				if (axisInfo.preStartOffset) {
					startPoint.x -= axisInfo.preStartOffset;
				}
				startPoint.y = canvasBounds.endY;
				//endPoint.x = canvasBounds.startX - thickness;
				endPoint.x = canvasBounds.startX;
				endPoint.y = canvasBounds.startY;
				break;
			}

			if (axisOptions.visible) {
				ax = self.canvas
					.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
					.attr(axisOptions.style);
				$.wijraphael.addClass($(ax.node), "wijchart-axis");

				self.axisEles.push(ax);
				axisElements.push(ax);
			}

			$.each(majorTickValues, function (idx, val) {
				var text = val,
					isTime = axisInfo.isTime,
					is100Percent = o.is100Percent,
					retInfo, textInfo,
					vlGridLine = false,
					vlGridLineStyle = {};

				if (val < min || val > max) {
					index++;
					return true;
				}

				if (axisOptions.annoMethod === "valueLabels") {
					// if (val < 0) {
					// return true;
					// }

					if (index >= axisOptions.valueLabels.length) {
						return false;
					}

					// text = axisOptions.valueLabels[index].text;
					text = axisOptions.valueLabels[index];
					vlGridLine = text.gridLine;
					vlGridLineStyle = text.gridLineStyle;
					if (text.text) {
						text = text.text;
					} else if (typeof text.value !== "undefined") {
						text = text.value;
						if (formatString && formatString.length) {
							// text = $.format(text, formatString);
							text = Globalize.format(text, formatString, 
								self._getCulture());
						}
					}
				} else if (axisOptions.annoMethod === "values") {
					if (formatString && formatString.length) {
						if (isTime) {
							text = $.fromOADate(val);
						}
						// text = $.format(text, formatString);
						text = Globalize.format(text, formatString, self._getCulture());
					} else if (is100Percent && axisInfo.id === "y") {
						// text = $.format(val, "p0");
						text = Globalize.format(val, "p0", self._getCulture());
					}
				}
				/*
				 * //TODO: mixed else { }
				 */

				textStyle = $.extend(true, {}, o.textStyle,
						axisOptions.textStyle, labels.style, axisInfo.textStyle);

				retInfo = self._paintMajorMinor(max, min, val, tickMajor, 
						unitMajor, tickRectMajor, compass, startPoint,
						endPoint, axisSize, axisTextOffset, tickMajorStyle,
						text, gridMajor, axisOptions.textVisible, textStyle,
						labels.textAlign, labels.width ? axisInfo.labelWidth : null,
						vlGridLine, vlGridLineStyle);

				if (retInfo) {
					if (retInfo.elements) {
						axisElements = axisElements.concat(retInfo.elements);
					}

					textInfo = retInfo.textInfo;
				}

				if (textInfo) {
					textInfos.push(textInfo);
					if (maxLen < textInfo.len) {
						maxLen = textInfo.len;
					}
				}

				index++;
			});

			
			if (!labels.width) { 
				$.each(textInfos, function (idx, textInfo) {
					var textElement = textInfo.text, offset = (textInfo.len - maxLen) / 2;
					offset = labels.textAlign === "near" ? offset * -1 : offset;
			  
					if (isVertical) { 
						//textElement.translate(offset, 0);
						textElement.transform(Raphael.format("...T{0},{1}", offset, 0)); 
					}
					else { 
						//textElement.translate(0, offset);
						textElement.transform(Raphael.format("...T{0},{1}", 0, offset)); 
					}
				}); 
			}
			 

			$.each(minorTickValues, function (idx, val) {
				var retInfo;

				if (val > min && val < max) {
					retInfo = self._paintMajorMinor(max, min, val, tickMinor, 
						unitMinor, tickRectMinor, compass, startPoint, 
						endPoint, axisSize, axisTextOffset, tickMinorStyle, 
						null, gridMinor, axisOptions.textVisible, textStyle, 
						labels.textAlign, labels.width ? axisInfo.labelWidth : null);

					if (retInfo && retInfo.elements) {
						axisElements = axisElements.concat(retInfo.elements);
					}
				}
			});

			if (axisOptions.text && axisOptions.text.length > 0) {
				axisElements.push(self._paintAxisText(axisOptions, axisInfo));
			}

			return axisElements;
		},

		_paintAxisText: function (axisOptions, axisInfo) {
			if (!axisOptions.text || axisOptions.text.length === 0) {
				return;
			}
			var self = this,
				text = axisOptions.text,
				compass = axisOptions.compass,
				align = axisOptions.alignment,
				canvasBounds = self.canvasBounds,
				startX = canvasBounds.startX,
				startY = canvasBounds.startY,
				endX = canvasBounds.endX,
				endY = canvasBounds.endY,
				x = startX,
				y = startY,
				textBounds = axisInfo.textBounds,
				isVertical = self._isVertical(compass),
				axisTextOffset = axisInfo.axisTextOffset,
				tickRectMajor = axisInfo.majorTickRect,
				tick = axisOptions.tickMajor.position,
				tickLength = isVertical ? tickRectMajor.width : tickRectMajor.height,
				textStyle = null,
				textElement = null,
				marginTop = 0,
				marginLeft = 0,
				marginRight = 0,
				marginBottom = 0;

			textStyle = $.extend(true, {},
				self.options.textStyle, axisOptions.textStyle);
			if (textStyle["margin-top"]) {
				marginTop = parseFloat(textStyle["margin-top"]);
			}
			if (textStyle["margin-left"]) {
				marginLeft = parseFloat(textStyle["margin-left"]);
			}
			if (textStyle["margin-right"]) {
				marginRight = parseFloat(textStyle["margin-right"]);
			}
			if (textStyle["margin-bottom"]) {
				marginBottom = parseFloat(textStyle["margin-bottom"]);
			}
			if (tick === "cross") {
				tickLength = tickLength / 2;
			} else if (tick === "inside") {
				tickLength = 0;
			}

			if (isVertical) {
				switch (align) {
				case "near":
					y = endY - textBounds.width / 2;
					break;
				case "center":
					y = (startY + endY) / 2;
					break;
				case "far":
					y = startY + textBounds.width / 2;
					break;
				}

				if (compass === "west") {
					x = startX - (axisInfo.offset + axisTextOffset +
						tickLength + textBounds.height / 2 + marginRight);
				} else {
					x = endX + axisInfo.offset + axisTextOffset +
						tickLength + textBounds.height / 2 + marginLeft;
				}
			} else {
				switch (align) {
				case "near":
					x = startX + textBounds.width / 2;
					break;
				case "center":
					x = (startX + endX) / 2;
					break;
				case "far":
					x = endX - textBounds.width / 2;
					break;
				}

				if (compass === "north") {
					y = startY - (axisInfo.offset + axisTextOffset +
						tickLength + textBounds.height / 2 + marginBottom);
				} else {
					y = endY + axisInfo.offset + axisTextOffset +
						tickLength + textBounds.height / 2 + marginTop;
				}
			}

			textElement = self._text(x, y, text);
			$.wijraphael.addClass($(textElement.node), "wijchart-axis-text");
			self.axisEles.push(textElement);
			textElement.attr(textStyle);

			if (isVertical) {
				// textElement.rotate(-90);
				textElement.transform("...R-90");
			}

			return textElement;
		},

		_resetMinorTickValues: function (minorTickValues, majorTickValues) {
			var i = 0,
				j = 0,
				minorTickValue = null,
				majorTickValue = null;
			for (i = minorTickValues.length - 1; i >= 0; i--) {
				minorTickValue = minorTickValues[i];
				for (j = majorTickValues.length - 1; j >= 0; j--) {
					majorTickValue = majorTickValues[j];
					if (minorTickValue === majorTickValue) {
						minorTickValues.splice(i, 1);
					}
				}
			}

			return minorTickValues;
		},

		_paintMajorMinor: function (max, min, val, tick, unit, tickRect, compass,
						startPoint, endPoint, axisSize, axisTextOffset, tickStyle,
						text, grid, textVisible, textStyle, textAlign, labelWidth,
						vlGridLine, vlGridLineStyle) {
			var self = this,
				x = startPoint.x,
				y = startPoint.y,
				tickX = -1,
				tickY = -1,
				isVertical = true,
				bs = self.canvasBounds,
				textInfo = null,
				tickElement = null,
				pathArr = [],
				arrPath = [],
				p = null,
				style = { "stroke-width": 2 },
				txt = { text: null, len: 0 },
				textBounds = null,
				retInfo = {},
				majorMinorElements = [];
				
			switch (compass) {
			case "south":
				if (tick === "inside") {
					y -= tickRect.height;
				} else if (tick === "cross") {
					y -= tickRect.height / 2;
				}

				if (labelWidth) {
					tickY = y + axisTextOffset + tickRect.height;
				} else {
					tickY = y + axisTextOffset + tickRect.height + axisSize / 2;
				}

				isVertical = false;
				break;
			case "west":
				if (tick === "outside") {
					x -= tickRect.width;
				} else if (tick === "cross") {
					x -= tickRect.width / 2;
				}

				if (labelWidth) {
					tickX = x - (axisTextOffset + axisSize);
				} else {
					tickX = x - (axisTextOffset + axisSize / 2);
				}
				break;
			case "north":
				if (tick === "outside") {
					y -= tickRect.height;
				} else if (tick === "cross") {
					y -= tickRect.height / 2;
				}

				if (labelWidth) {
					tickY = y - (axisTextOffset + axisSize);
				} else {
					tickY = y - (axisTextOffset + axisSize / 2);
				}
				isVertical = false;
				break;
			case "east":
				if (tick === "inside") {
					x -= tickRect.width;
				} else if (tick === "cross") {
					x -= tickRect.width / 2;
				}

				if (labelWidth) {
					tickX = x + axisTextOffset + tickRect.width;
				} else {
					tickX = x + axisTextOffset + tickRect.width + axisSize / 2;
				}
				break;
			}

			if (isVertical) {
				y += (val - min) / (max - min) * (endPoint.y - startPoint.y);
				arrPath = ["M", bs.startX, y, "H", bs.endX];
				if (grid.visible) {
					if ((y !== bs.startY && compass === "east") ||
							(y !== bs.endY && compass === "west")) {
						p = self.canvas.path(arrPath.concat(" "));
						$.wijraphael.addClass($(p.node), "wijchart-axis-gridline");
						p.attr(grid.style);
						self.axisEles.push(p);
					}
				}
				if (vlGridLine) {
					if ((y !== bs.startY && compass === "east") || 
							(y !== bs.endY && compass === "west")) {
						p = self.canvas.path(arrPath.concat(" "));
						$.wijraphael.addClass($(p.node), "wijchart-axis-gridline");
						p.attr($.extend(true, grid.style, vlGridLineStyle));
						self.axisEles.push(p);
					}
				}

				tickY = y;

				if (tick !== "none") {
					pathArr = ["M", x, y, "h", tickRect.width];
					tickStyle["stroke-width"] = tickRect.height;
				}
			} else {
				x += (val - min) / (max - min) * (endPoint.x - startPoint.x);
				arrPath = ["M", x, bs.startY, "V", bs.endY];
				if (grid.visible) {
					if ((x !== bs.startX && compass === "south") ||
							(x !== bs.endX && compass === "north")) {
						p = self.canvas.path(arrPath.concat(" "));
						$.wijraphael.addClass($(p.node), "wijchart-axis-gridline");
						p.attr(grid.style);
						self.axisEles.push(p);
					}
				}
				if (vlGridLine) {
					if ((y !== bs.startY && compass === "south") || 
							(y !== bs.endY && compass === "north")) {
						p = self.canvas.path(arrPath.concat(" "));
						$.wijraphael.addClass($(p.node), "wijchart-axis-gridline");
						p.attr($.extend(true, {}, grid.style, vlGridLineStyle));
						self.axisEles.push(p);
					}
				}

				if (labelWidth) {
					tickX = x - labelWidth / 2;
				} else {
					tickX = x;
				}

				if (tick !== "none") {
					pathArr = ["M", x, y, "v", tickRect.height];
					tickStyle["stroke-width"] = tickRect.width;
				}
			}

			if (tick !== "none") {
				tickElement = self.canvas.path(pathArr.concat(" "));
				$.wijraphael.addClass($(tickElement.node), "wijchart-axis-tick");
				style = $.extend(style, tickStyle);
				tickElement.attr(style);
				self.axisEles.push(tickElement);
				majorMinorElements.push(tickElement);
			}

			if (text !== null && textVisible) {
				if (labelWidth) {
					txt = self.canvas.wrapText(tickX,
						tickY, text.toString(), labelWidth, textAlign, textStyle);
					$.wijraphael.addClass($(txt.node), "wijchart-axis-label");

					//if (isVertical) {
						// txt.translate(0, -txt.getBBox().height / 2);
						//txt.transform(Raphael.format("...T{0},{1}", 0, 
						//-txt.getBBox().height / 2));
					//}
				} else {
					txt = self._text(tickX, tickY, text.toString());
					$.wijraphael.addClass($(txt.node), "wijchart-axis-label");
					txt.attr(textStyle);
				}

				self.axisEles.push(txt);
				majorMinorElements.push(txt);
				if (!textVisible) {
					txt.hide();
				}
				if (textAlign !== "center") {
					textBounds = txt.getBBox();
					textInfo = {
						text: txt,
						len: isVertical ? textBounds.width : textBounds.height
					};
				}
			}

			retInfo = {textInfo: textInfo, elements: majorMinorElements};

			return retInfo;
		},

		_paintPlotArea: function () {
		},

		_paintChartLabels: function () {
			var self = this,
				chartLabels = self.options.chartLabels;

			if (chartLabels && chartLabels.length) {
				$.each(chartLabels, function (idx, chartLabel) {
					var point;

					chartLabel = $.extend(true, {
						compass: "east",
						attachMethod: "coordinate",
						attachMethodData: {
							seriesIndex: -1,
							pointIndex: -1,
							x: -1,
							y: -1
						},
						offset: 0,
						visible: false,
						text: "",
						connected: false
					}, chartLabel);

					if (chartLabel.visible) {
						point = self._getChartLabelPointPosition(chartLabel);
						if (typeof (point.x) !== "number" ||
								typeof (point.y) !== "number") {
							return false;
						}
						self._setChartLabel(chartLabel, point);
					}
				});
			}
		},

		_getChartLabelPointPosition: function (chartLabel) {
		},

		_setChartLabel: function (chartLabel, point, angle, calloutStyle) {
			var self = this,
				compass = chartLabel.compass,
				o = self.options,
				textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle),
				text = self._text(0, 0, chartLabel.text).attr(textStyle),
				offset = chartLabel.offset,
				transX = 0,
				transY = 0,
				position = null,
				p = null;

			$.wijraphael.addClass($(text.node), "wijchart-label-text");
			self.chartLabelEles.push(text);

			position = self._getCompassTextPosition(compass,
							text.wijGetBBox(), offset, point, angle);

			if (offset && chartLabel.connected) {
				p = self.canvas.path("M" + point.x + " " + point.y + "L" +
							position.endPoint.x + " " + position.endPoint.y);
				$.wijraphael.addClass($(p.node), "wijchart-label-connect");
				p.attr(calloutStyle);
				self.chartLabelEles.push(p);
			}

			transX = position.endPoint.x + position.offsetX;
			transY = position.endPoint.y + position.offsetY;

			// text.translate(transX, transY)
			// .toFront();
			text.transform(Raphael.format("...T{0},{1}", transX, transY)).toFront();
		},

		_getCompassTextPosition: function (compass, box, offset, point, angle) {
			var offsetX = 0, offsetY = 0,
				endPoint = { x: 0, y: 0 };

			switch (compass.toLowerCase()) {
			case "east":
				angle = 0;
				break;
			case "west":
				angle = 180;
				break;
			case "north":
				angle = 90;
				break;
			case "south":
				angle = 270;
				break;
			case "northeast":
				angle = 45;
				break;
			case "northwest":
				angle = 135;
				break;
			case "southeast":
				angle = 315;
				break;
			case "southwest":
				angle = 225;
				break;
			}

			if ((angle >= 0 && angle < 45 / 2) || (angle > 675 / 2 && angle < 360)) {
				offsetX = box.width / 2;
			} else if (angle >= 45 / 2 && angle < 135 / 2) {
				offsetX = box.width / 2;
				offsetY = -1 * box.height / 2;
			} else if (angle >= 135 / 2 && angle < 225 / 2) {
				offsetY = -1 * box.height / 2;
			} else if (angle >= 225 / 2 && angle < 315 / 2) {
				offsetX = -1 * box.width / 2;
				offsetY = -1 * box.height / 2;
			} else if (angle >= 315 / 2 && angle < 405 / 2) {
				offsetX = -1 * box.width / 2;
			} else if (angle >= 405 / 2 && angle < 495 / 2) {
				offsetX = -1 * box.width / 2;
				offsetY = box.height / 2;
			} else if (angle >= 495 / 2 && angle < 585 / 2) {
				offsetY = box.height / 2;
			} else {
				offsetX = box.width / 2;
				offsetY = box.height / 2;
			}

			endPoint = $.wijraphael.getPositionByAngle(point.x, point.y, offset, angle);

			return {
				endPoint: endPoint,
				offsetX: offsetX,
				offsetY: offsetY
			};
		},
		
		_mouseDown: function (e, args) {
			this._trigger("mouseDown", e, args);
		},
		
		_mouseUp: function (e, args) {
			this._trigger("mouseUp", e, args);
		},
		
		_mouseOver: function (e, args) {
			this._trigger("mouseOver", e, args);
		},
		
		_mouseOut: function (e, args) {
			this._trigger("mouseOut", e, args);
		},
		
		_mouseMove: function (e, args) {
			this._trigger("mouseMove", e, args);
		},
		
		_click: function (e, args) {
			this._trigger("click", e, args);
		},
		
		_mouseMoveInsidePlotArea: function (e, mousePos) {
		},
		
		_mouseMoveOutsidePlotArea: function (e, mousePos) {
		},

		_bindLiveEvents: function () {
			this._bindLegendEvents();
			this._bindCanvasEvents();
		},
		
		_bindCanvasEvents: function () {
			var self = this,
				element = self.chartElement;
			
			element
				.bind("mousemove", function (e) {
					var elePos = element.offset(),
						cBounds = self.canvasBounds,
						mousePos = {
							left: e.pageX - elePos.left,
							top: e.pageY - elePos.top
						},
						disabled = self.options.disabled;
					if (disabled) {
						return;
					}
	
					if (mousePos.left >= cBounds.startX && 
							mousePos.left <= cBounds.endX && 
							mousePos.top >= cBounds.startY && 
							mousePos.top <= cBounds.endY) {
						self._mouseMoveInsidePlotArea(e, mousePos);
					} else {
						self._mouseMoveOutsidePlotArea(e, mousePos);
					}
				});
		},
		
		_bindLegendEvents: function () {
			var self = this,
				element = self.chartElement,
				widgetName = self.widgetName;
			$(".wijchart-legend", element[0])
				.live("click." + widgetName, function (e) {
					if (self.options.disabled) {
						return;
					}
					var tar = $(e.target);
					if (tar[0].tagName && tar[0].tagName === "tspan") {
						tar = tar.parent();
					}
					self._legendClick(tar);
				});
		},
		
		_legendClick: function (obj) {
			if (typeof obj.data("index") === "undefined") {
				return;
			}
			var self = this,
				l = self.options.legend,
				i = obj.data("index"),
				legendIndex = obj.data("legendIndex"),
				fields = self.chartElement.data("fields"),
				seriesEles = self.seriesEles, seriesEle,
				legendIcon = self.legendIcons[legendIndex], 
				legend = self.legends[legendIndex], 
				legendNode = $(legend.node),
				idx = i, legendDot;
	
			if (fields && fields.seriesEles) {
				seriesEles = fields.seriesEles;
			}
			
			if (self.legendDots && self.legendDots.length > i) {
				legendDot = self.legendDots[i];
			}
	
			if (l.reversed) {
				idx = self.legends.length - 1 - i;
			}
			seriesEle = seriesEles[idx];
	
			if (seriesEle) {
				if (!legendNode.data("hidden")) {
					self._hideSerieEles(seriesEle);
					if (!legendNode.data("textOpacity")) {
						legendNode.data("textOpacity", legend.attr("opacity") || 1);
					}
	
					if (!legendNode.data("iconOpacity")) {
						legendNode.data("iconOpacity", 
						legendIcon.attr("opacity") || 1);
					}
					
					if (legendDot && !legendNode.data("dotOpacity")) {
						legendNode.data("dotOpacity", 
								legendIcon.attr("opacity") || 1);
					}
	
					legend.attr("opacity", "0.3");
					legendIcon.attr("opacity", "0.3");
					if (legendDot) {
						legendDot.attr("opacity", "0.3");
					}
					legendNode.data("hidden", true);
				}
				else {
					self._showSerieEles(seriesEle);
					legend.attr("opacity", legendNode.data("textOpacity"));
					legendIcon.attr("opacity", legendNode.data("iconOpacity"));
					if (legendDot) {
						legendDot.attr("opacity", legendNode.data("dotOpacity"));
					}
					legendNode.data("hidden", false);
				}
			}
		},

		_showSerieEles: function (seriesEle) {
			
		},

		_hideSerieEles: function (seriesEle) {
			
		},

		_unbindLiveEvents: function () {
			var self = this,
				element = this.chartElement,
				widgetName = self.widgetName;
			$(".wijchart-legend", element[0]).die(widgetName)
			// for jQuery 1.7.1
			.die("." + widgetName);
			element.unbind("mousemove");
		},

		_isBarChart: function () {
			return false;
		},

		_isPieChart: function () {
			return false;
		},

		// methods for Axis
		_calculateParameters: function (axisInfo, axisOptions) {
			var self = this,
				maxData = axisOptions.max,
				minData = axisOptions.min,
				autoMax = axisOptions.autoMax && axisInfo.autoMax,
				autoMin = axisOptions.autoMin && axisInfo.autoMin,
				autoMajor = axisOptions.autoMajor && axisInfo.autoMajor,
				autoMinor = axisOptions.autoMinor && axisInfo.autoMinor,
				axisAnno = null,
				prec = null,
				isVL = axisOptions.annoMethod === "valueLabels",
				major = 0,
				newmax = 0,
				newmin = 0,
				dx = 0,
				tinc = 0,
				isTime = axisInfo.isTime,
				adjustMinValue = self.options.adjustMinValue;

			if (autoMax && maxData !== Number.MIN_VALUE) {
				if (axisInfo.id !== "x" && self._isBarChart()) {
					if (maxData < 0.0 && (0.5 * (maxData - minData) > -maxData)) {
						maxData = 0.0;
					}
				}
			}

			if (autoMin && minData !== Number.MAX_VALUE) {
				if (axisInfo.id !== "x" && self._isBarChart()) {
					if (minData > 0.0 && (0.5 * (maxData - minData) > minData)) {
						minData = 0.0;
					}
				}
			}

			if (maxData === minData) {
				if (minData !== 0) {
					minData -= 1;
				}
				maxData += 1;
			}
			dx = maxData - minData;

			if (isTime) {
				axisAnno = axisOptions.annoFormatString;
				if (!axisAnno || axisAnno.length === 0) {
					axisAnno = self._getTimeDefaultFormat(maxData, minData);
					axisInfo.annoFormatString = axisAnno;
				}
				tinc = self._niceTimeUnit(0.0, axisAnno);
			}
			prec = self._nicePrecision(dx);
			axisInfo.tprec = prec;
			if (autoMax) {
				if (isTime) {
					newmax = self._roundTime(maxData, tinc, true);
					if (newmax < maxData) {
						maxData = newmax + tinc;
					} else {
						maxData = newmax;
					}
				} else {
					newmax = self._precCeil(-prec, maxData);
					if (typeof (newmax) === "number") {
						maxData = newmax;
					}
				}
			}
			if (autoMin) {
				if (isTime) {
					newmin = self._roundTime(minData, tinc, false);
					if (newmin > minData) {
						minData = newmin - tinc;
					} else {
						minData = newmin;
					}
				} else {
					newmin = self._precFloor(-prec, minData);
					if (typeof (newmin) === "number") {
						minData = newmin;
					}
				}
			}

			axisInfo.max = maxData;
			axisInfo.min = minData;
			axisInfo.annoFormatString = axisAnno;
			axisInfo.tinc = tinc;

			if (autoMajor || autoMinor) {
				dx = maxData - minData;
				self._calculateMajorMinor(axisOptions, axisInfo);
				// var minor = axisOptions.unitMinor;
				major = axisOptions.unitMajor;
				if (autoMax && major !== 0 && !isTime && !isVL) {
					dx = maxData - parseInt(maxData / major, 10) * major;

					if (dx !== 0) {
						maxData += (major - dx);
						maxData = self._precCeil(-prec, maxData);
					}
				}

				if (autoMin && major !== 0 && !isTime && !isVL) {
					dx = minData - parseInt(minData / major, 10) * major;

					if (dx !== 0) {
						if (dx < 0) {
							dx += major;
						}

						minData -= Math.abs(dx); // should always be less.
						minData = self._precFloor(-prec, minData);
					}
				}
				
				if (autoMin && major !== 0 && !isVL &&
						(typeof adjustMinValue === "undefined" || 
						adjustMinValue === false) && 
						autoMin && minData === axisOptions.min &&
						minData - major >= 0 && axisInfo.id === "y") {
					minData -= major;
				}
			}

			/*
			 * //TODO: if (!autoMajor || !autoMinor) { }
			 */

			axisInfo.max = maxData;
			axisInfo.min = minData;
		},

		_roundTime: function (timevalue, unit, roundup) {
			var self = this,
			// tunit = unit * self._tmInc.day,
				tunit = unit,
				tv = $.fromOADate(timevalue),
				th,
				td,
				tx,
				tz;

			if (tunit > 0) {
				th = {
					year: tv.getFullYear(),
					month: tv.getMonth(),
					day: tv.getDate(),
					hour: tv.getHours(),
					minute: tv.getMinutes(),
					second: tv.getSeconds()
				};
				if (tunit < self._tmInc.minute) {
					th.second = self._tround(th.second, tunit, roundup);
					return self._getTimeAsDouble(th);
				}

				th.second = 0;
				if (tunit < self._tmInc.hour) {
					tunit /= self._tmInc.minute;
					th.minute = self._tround(th.minute, tunit, roundup);
					return self._getTimeAsDouble(th);
				}

				th.minute = 0;
				if (tunit < self._tmInc.day) {
					tunit /= self._tmInc.hour;
					th.hour = self._tround(th.hour, tunit, roundup);
					return self._getTimeAsDouble(th);
				}

				th.hour = 0;
				if (tunit < self._tmInc.month) {
					tunit /= self._tmInc.day;
					th.day = self._tround(th.day, tunit, roundup);
					return self._getTimeAsDouble(th);
				}

				th.day = 1;
				if (tunit < self._tmInc.year) {
					tunit /= self._tmInc.month;
					th.month = self._tround(th.month, tunit, roundup);
					return self._getTimeAsDouble(th);
				}

				// th.month = 1;
				th.month = 0; // the month start from 0 in javascript.
				tunit /= self._tmInc.year;
				th.year = self._tround(th.year, tunit, roundup);
				return self._getTimeAsDouble(th);
			} else {
				td = tv;
				tx = td - tunit;
				tz = parseInt(tx / unit, 10) * unit;
				if (roundup && tz !== tx) {
					tz += unit;
				}
				td = tunit + tz;
				return td;
			}
		},

		_tround: function (tval, tunit, roundup) {
			var test = parseInt((tval / tunit) * tunit, 10);
			if (roundup && test !== tval) {
				test += parseInt(tunit, 10);
			}
			return test;
		},

		_getTimeAsDouble: function (th) {
			var smon = 0,
				sday = 0,
				newDate = null;
			if (th.day < 1) {
				sday = -1 - th.day;
				th.day = 1;
			} else if (th.day > 28) {
				sday = th.day - 28;
				th.day = 28;
			}

			/*
			 * if (th.month < 1) { smon = -1 - th.day; th.month = 1; } else if
			 * (th.month > 12) { smon = th.month - 12; th.month = 12; }
			 */
			// the month start from 0 & end with 11 in javascript.
			if (th.month < 0) {
				smon = -1 - th.day;
				th.month = 0;
			} else if (th.month > 11) {
				smon = th.month - 11;
				th.month = 11;
			}
			newDate = new Date(th.year, th.month, th.day,
				th.hour, th.minute, th.second);
			newDate.setDate(newDate.getDate() + sday);
			newDate.setMonth(newDate.getMonth() + smon);
			return $.toOADate(newDate);
		},

		_getTimeDefaultFormat: function (max, min) {
			var self = this,
			// range = (max - min) * self._tmInc.day,
				range = max - min,
				format = "d";
				// format = "s";
			if (range > 2 * self._tmInc.year) {
				format = "yyyy";
			} else if (range > self._tmInc.year) {
				format = "MMM yy";
			} else if (range > 3 * self._tmInc.month) {
				format = "MMM";
			} else if (range > 2 * self._tmInc.week) {
				format = "MMM d";
			} else if (range > 2 * self._tmInc.day) {
				format = "ddd d";
			} else if (range > self._tmInc.day) {
				format = "ddd H:mm";
			} else if (range > self._tmInc.hour) {
				format = "H:mm";
			} else if (range >= 1000) {
				format = "H:mm:ss";
			}
			/*
			 * else if (range > 0) { //TODO: return millisecond }
			 */
			return format;
		},

		_niceTimeUnit: function (timeinc, manualFormat) {
			var self = this,
			// tsRange = timeinc * self._tmInc.day;
				tsRange = timeinc;

			tsRange = self._niceTimeSpan(tsRange, manualFormat);

			// return tsRange / self._tmInc.day;
			return tsRange;
		},

		_niceTimeSpan: function (range, manualFormat) {
			var self = this,
				minSpan = self._manualTimeInc(manualFormat),
				tsinc = 0,
				tinc = 0;
			/*
			 * if (minSpan < this._tmInc.second) { //TODO: calculate when
			 * millisecond }
			 */
			tsinc = Math.ceil(range);
			if (tsinc === 0) {
				return self._timeSpanFromTmInc(minSpan);
			}
			tinc = 1;
			if (minSpan < self._tmInc.minute) {
				if (tsinc < self._tmInc.minute) {
					tinc = self._getNiceInc([1, 2, 5, 10, 15, 30], tsinc, minSpan);
					if (tinc !== 0) {
						return tinc;
					}
				}
				minSpan = self._tmInc.minute;
			}
			if (minSpan < self._tmInc.hour) {
				if (tsinc < self._tmInc.hour) {
					tinc = self._getNiceInc([1, 2, 5, 10, 15, 30], tsinc, minSpan);
					if (tinc !== 0) {
						return tinc;
					}
				}
				minSpan = self._tmInc.hour;
			}
			if (minSpan < self._tmInc.day) {
				if (tsinc < self._tmInc.day) {
					tinc = self._getNiceInc([1, 3, 6, 12], tsinc, minSpan);
					if (tinc !== 0) {
						return tinc;
					}
				}
				minSpan = self._tmInc.day;
			}
			if (minSpan < self._tmInc.month) {
				if (tsinc < self._tmInc.month) {
					tinc = self._getNiceInc([1, 2, 7, 14], tsinc, minSpan);
					if (tinc !== 0) {
						return tinc;
					}
				}
				minSpan = self._tmInc.month;
			}
			if (minSpan < self._tmInc.year) {
				if (tsinc < self._tmInc.year) {
					tinc = self._getNiceInc([1, 2, 3, 4, 6], tsinc, minSpan);
					if (tinc !== 0) {
						return tinc;
					}
				}
				minSpan = self._tmInc.year;
			}
			tinc = 100 * self._tmInc.year;
			if (tsinc < tinc) {
				tinc = self._getNiceInc([1, 2, 5, 10, 20, 50], tsinc, minSpan);
				if (tinc === 0) {
					tinc = 100 * self._tmInc.year;
				}
			}
			return tinc;
		},

		_getNiceInc: function (tik, ts, mult) {
			var i = 0,
				tikm = 0,
				ii = tik.length;

			for (i = 0; i < ii; i++) {
				tikm = tik[i] * mult;
				if (ts <= tikm) {
					return tikm;
				}
			}

			return 0;
		},

		_timeSpanFromTmInc: function (ti) {
			var rv = 1000,
				rti = ti,
				ticks = 1;

			if (ti !== this._tmInc.maxtime) {
				if (ti > this._tmInc.tickf1) {
					rv = ti;
				} else {
					ti += 7;
					while (rti > 0) {
						ticks *= 10;
						rti--;
					}
					rv = ticks;
				}
			}
			return rv;
		},

		_manualTimeInc: function (manualFormat) {
			var self = this,
				minSpan = self._tmInc.second;
			if (!manualFormat || manualFormat.length === 0) {
				return minSpan;
			}
			// var f = manualFormat.indexOf("f");
			// if (f > 0) {
			// //TODO: when _getTimeDefaultFormat return millisecond
			// }
			// else if (manualFormat.indexOf("s") >= 0) {
			if (manualFormat.indexOf("s") >= 0) {
				minSpan = self._tmInc.second;
			} else if (manualFormat.indexOf("m") >= 0) {
				minSpan = self._tmInc.minute;
			} else if (manualFormat.indexOf("h") >= 0 || manualFormat.indexOf("H") >= 0) {
				minSpan = self._tmInc.hour;
			} else if (manualFormat.indexOf("d") >= 0) {
				minSpan = self._tmInc.day;
			} else if (manualFormat.indexOf("M") >= 0) {
				minSpan = self._tmInc.month;
			} else if (manualFormat.indexOf("y") >= 0) {
				minSpan = self._tmInc.year;
			}
			return minSpan;
		},

		_tmInc: {
			tickf7: -7000,
			tickf6: -6000,
			tickf5: -5000,
			tickf4: -4000,
			tickf3: -3000,
			tickf2: -2000,
			tickf1: -1,
			second: 1000,
			minute: 60 * 1000,
			hour: 60 * 60 * 1000,
			day: 24 * 60 * 60 * 1000,
			week: 7 * 24 * 60 * 60 * 1000,
			month: 31 * 24 * 60 * 60 * 1000,
			year: 365 * 24 * 60 * 60 * 1000,
			maxtime: 2147483647	// int.max
		},

		_niceTickNumber: function (x) {
			if (parseFloat(x) === 0.0) {
				return x;
			} else if (x < 0) {
				x = -x;
			}
			var log10 = Math.log(x) / Math.log(10),
				exp = parseInt(this._signedFloor(log10), 10),
				f = x / Math.pow(10.0, exp),
				nf = 10.0;
			if (f <= 1.0) {
				nf = 1.0;
			} else if (f <= 2.0) {
				nf = 2.0;
			} else if (f <= 5.0) {
				nf = 5.0;
			}
			return (nf * Math.pow(10.0, exp));
		},

		_niceNumber: function (x, exp, round) {
			if (parseFloat(x) === 0.0) {
				return x;
			} else if (x < 0) {
				x = -x;
			}

			var f = x / Math.pow(10.0, exp),
				nf = 10.0;

			if (round) {
				if (f < 1.5) {
					nf = 1.0;
				} else if (f < 3.0) {
					nf = 2.0;
				} else if (f < 7.0) {
					nf = 5.0;
				}
			} else {
				if (f <= 1.0) {
					nf = 1.0;
				} else if (f <= 2.0) {
					nf = 2.0;
				} else if (f <= 5.0) {
					nf = 5.0;
				}
			}

			return (nf * Math.pow(10.0, exp));
		},

		_nicePrecision: function (range) {
			if (range <= 0 || typeof (range) !== "number") {
				return 0;
			}

			var log10 = Math.log(range) / Math.log(10),
				exp = parseInt(this._signedFloor(log10), 10),
				f = range / Math.pow(10.0, exp);

			if (f < 3.0) {
				exp = -exp + 1;
			}

			return exp;
		},

		_precCeil: function (prec, value) {
			var f = Math.pow(10.0, prec),
				x = value / f;

			x = Math.ceil(x);

			return x * f;
		},

		_precFloor: function (prec, value) {
			var f = Math.pow(10.0, prec),
				x = value / f;

			x = Math.floor(x);

			return x * f;
		},

		_signedCeiling: function (val) {
			if (val < 0.0) {
				return Math.floor(val);
			}

			return Math.ceil(val);
		},

		_signedFloor: function (val) {
			if (val < 0.0) {
				return Math.ceil(val);
			}

			return Math.floor(val);
		},

		_getDataExtreme: function (isMultiYAxis) {
			var val = {
				txx: 0,
				txn: 0,
				tyx: 0,
				tyn: 0
			}, valGroup;

			valGroup = this._getDataExtremes(val, isMultiYAxis);
			if (valGroup) {
				if (valGroup.txn > valGroup.txx) {
					valGroup.txn = 0;
					valGroup.txx = 1;
				}
				return valGroup;
			}
			else {
				if (val.txn > val.txx) {
					val.txn = 0;
					val.txx = 1;
				}
				return val;
			}
		},

		_getDataExtremes: function (val, isMultiYAxis) {
			var self = this,
				o = self.options,
				seriesList = o.seriesList,
				stacked = o.stacked,
				is100Percent = o.is100Percent,
				axis = o.axis,
				axisInfo = self.axisInfo,
				valuesX = [],				
				lastValuesY = [],
				valueLabels = [],
				validValue,
				valGroup = { y: {} };

			if (!seriesList || seriesList.length === 0) {
				return val;
			}
			
			if (self.seriesGroup) {
				$.each(self.seriesGroup, function (key, seriesL) {
					var valuesY = [];
					$.each(seriesL, function (i, series) {
						if (series.type === "pie") {
							return true;
						}
						// support hole.
						series = $.extend(true, {display: "show"}, series);
						// end comments

						var data = series.data,
							index = 0,
							k = 0,
							valuesXY = [].concat(data.xy),
							len = valuesXY.length,
							xMinMax, 
							yMinMax;
				
						// support hole.
						if (series.display === "exclude") {
							return true;
						}
						// end comments

						valuesX = [].concat(data.x);
						valuesY = [].concat(data.y);

						if (data.xy && len) {
							valuesX = [];
							valuesY = [];

							while (k < len) {
								valuesX[index] = valuesXY[k];
								valuesY[index] = valuesXY[k + 1];
								k += 2;
								index++;
								data.x = valuesX;
								data.y = valuesY;
							}
						} else if (!data.x) {
							valuesX = [];

							$.each(valuesY, function (i) {
								valuesX.push(i);
							});

							data.x = valuesX;
						}

						if (stacked && i > 0) {
							$.each(valuesY, function (j) {
								// if (j === 0) {
								// return true;
								// }

								// valuesY[j] += valuesY[j - 1];
								valuesY[j] += lastValuesY[j];
							});
						}
						lastValuesY = valuesY;

						xMinMax = self._getMinMaxValue(valuesX);
						yMinMax = self._getMinMaxValue(valuesY);

						if (i === 0) {
							val.txx = xMinMax.max;
							val.txn = xMinMax.min;
							val.tyx = yMinMax.max;
							val.tyn = yMinMax.min;
						} else {
							if (val.txx < xMinMax.max) {
								val.txx = xMinMax.max;
							}
							if (val.txn > xMinMax.min) {
								val.txn = xMinMax.min;
							}
							if (val.tyx < yMinMax.max) {
								val.tyx = yMinMax.max;
							}
							if (val.tyn > yMinMax.min) {
								val.tyn = yMinMax.min;
							}
						}
						i++;									
					});

					if (is100Percent) {
						val.tyx = 1;
						val.tyn = 0;
					}

					valGroup.y[key] = {tyx: val.tyx, tyn: val.tyn};
					valGroup.txx = val.txx;
					valGroup.txn = val.txn;
					val.tyx = 0;
					val.tyn = 0;
					//val = {txx: val.txx, txn: val.txn, tyx: 0, tyn: 0 };

					if (valuesY.length) {
						validValue = $.wijchart.getFirstValidListValue(valuesY);
						if (self._isDate(validValue)) {
							axisInfo.y[key].isTime = true;
						} else if (typeof (validValue) === "undefined") {
							return true;
						} else if (typeof (validValue) !== "number") {
							$.each(valuesY, function (idx, valueY) {
								// valueLabels.push({
								// text: valueY,
								// value: idx
								// });
								// Add comments by RyanWu@20110707.
								// For fixing the issue#15881.
								// valueLabels.push(valueY);
								var formatString = axis.y.annoFormatString,
									value = valueY;

								if (formatString && formatString.length > 0) {
									// value = $.format(value, formatString);
									value = Globalize.format(value, formatString, 
										self._getCulture());
								} else {
									value = value.toString();
								}

								// valueLabels.push(value);
								valueLabels.push({
									text: value,
									value: valueY,
									gridLine: false
								});
								// end by RyanWu@20110707.
							});

							axis.y[parseInt(key, 10)].annoMethod = "valueLabels";
							axis.y[parseInt(key, 10)].valueLabels = valueLabels;
							axis.x.max = valuesY.length - 1;
							axis.x.min = 0;
							axis.y[parseInt(key, 10)].unitMajor = 1;
							axis.x.unitMinor = 0.5;
							axisInfo.y[key].autoMax = false;
							axisInfo.y[key].autoMin = false;
							axisInfo.y[key].autoMajor = false;
							axisInfo.y[key].autoMinor = false;
						}
					}
				});
			}
			
			
			if (valuesX.length) {
				validValue = $.wijchart.getFirstValidListValue(valuesX);
				if (self._isDate(validValue)) {
					axisInfo.x.isTime = true;
				} else if (typeof (validValue) !== "number") {
					$.each(valuesX, function (idx, valueX) {
						valueLabels.push({
							text: valueX,
							value: idx,
							gridLine: false
						});
						// valueLabels.push(valueX);
					});

					axis.x.annoMethod = "valueLabels";
					axis.x.valueLabels = valueLabels;
					axis.x.max = valuesX.length - 1;
					axis.x.min = 0;
					axis.x.unitMajor = 1;
					axis.x.unitMinor = 0.5;
					axisInfo.x.autoMax = false;
					axisInfo.x.autoMin = false;
					axisInfo.x.autoMajor = false;
					axisInfo.x.autoMinor = false;
				}
			}

			return valGroup;
			//return val;
		},

		_isDate: function (obj) {
			if (!obj) {
				return false;
			}
			return (typeof obj === 'object') && obj.constructor === Date;
		},

		_getMinMaxValue: function (array) {
			var self = this,
				val = {
					min: 0,
					max: 0
				},
				i = 0,
				validValue;

			if (!array.length) {
				return val;
			}

			validValue = $.wijchart.getFirstValidListValue(array);
			if (typeof (validValue) !== "number") {
				if (self._isDate(validValue)) {
					val.min = validValue;
					val.max = validValue;
				} else {
					val.min = 0;
					val.max = array.length - 1;
					return val;
				}
			} else {
				val.min = validValue;
				val.max = validValue;
			}

			for (i = 0; i < array.length; i++) {
				if (array[i] === null || typeof array[i] === "undefined") {
					continue;
				}
				if(typeof array[i] === "number" && isNaN(array[i])) {
					continue;
				}
				if (array[i] < val.min) {
					val.min = array[i];
				} else if (array[i] > val.max) {
					val.max = array[i];
				}
			}

			if (self._isDate(val.min)) {
				val.min = $.toOADate(val.min);
				val.max = $.toOADate(val.max);
			}

			return val;
		},

		_isVertical: function (compass) {
			return compass === "west" || compass === "east";
		},

		_calculateMajorMinor: function (axisOptions, axisInfo) {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds,
				autoMajor = axisOptions.autoMajor,
				autoMinor = axisOptions.autoMinor,
				maxData = axisInfo.max,
				minData = axisInfo.min,
				isTime = axisInfo.isTime,
				tinc = axisInfo.tinc,
				formatString = axisInfo.annoFormatString,
				maxText = null,
				minText = null,
				sizeMax = null,
				sizeMin = null,
				mx = null,
				mn = null,
				prec = null,
				_prec = null,
				textStyle = null,
				dx = maxData - minData,
				width = 0,
				height = 0,
				nticks = 0,
				major = 0;

			if (autoMajor) {
				textStyle = $.extend(true, {}, o.textStyle,
					axisOptions.textStyle, axisOptions.labels.style);

				if (isTime) {
					// maxText = $.format($.fromOADate(maxData), formatString);
					maxText = 
					Globalize.format($.fromOADate(maxData), formatString, 
						self._getCulture());
					// minText = $.format($.fromOADate(minData), formatString);
					minText = 
					Globalize.format($.fromOADate(minData), formatString, 
						self._getCulture());

					mx = self._text(-1000, -1000, maxText).attr(textStyle);
					mn = self._text(-1000, -1000, minText).attr(textStyle);

					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();

					mx.wijRemove();
					mx = null;
					mn.wijRemove();
					mn = null;
				} else {
					prec = self._nicePrecision(dx);
					_prec = prec + 1;

					if (_prec < 0 || _prec > 15) {
						_prec = 0;
					}

					mx = self._text(-1000, -1000,
						$.round(maxData, _prec)).attr(textStyle);
					mn = self._text(-1000, -1000,
						$.round(minData, _prec)).attr(textStyle);

					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();

					mx.wijRemove();
					mx = null;
					mn.wijRemove();
					mn = null;
				}

				if (sizeMax.width < sizeMin.width) {
					sizeMax.width = sizeMin.width;
				}

				if (sizeMax.height < sizeMin.height) {
					sizeMax.height = sizeMin.height;
				}

				if (!self._isVertical(axisOptions.compass)) {
					// Add comments by RyanWu@20100907.
					// Subtract axisTextOffset because we must left
					// the space between major text and major rect.
					width = canvasBounds.endX - canvasBounds.startX -
						axisInfo.vOffset - axisInfo.axisTextOffset;
					major = width / sizeMax.width;

					if (Number.POSITIVE_INFINITY === major) {
						nticks = 0;
					} else {
						nticks = parseInt(major, 10);
					}
				} else {
					height = canvasBounds.endY - canvasBounds.startY -
						axisInfo.vOffset - axisInfo.axisTextOffset;
					major = height / sizeMax.height;

					if (Number.POSITIVE_INFINITY === major) {
						nticks = 0;
					} else {
						nticks = parseInt(major, 10);
					}
				}

				major = dx;
				if (nticks > 0) {
					dx /= nticks;
					if (isTime) {
						if (dx < tinc) {
							major = tinc;
						} else {
							major = self._niceTimeUnit(dx, axisInfo.annoFormatString);
						}
					} else {
						axisInfo.tprec = self._nicePrecision(dx);
						major = self._niceNumber(2 * dx, -prec, true);

						if (major < dx) {
							major = self._niceNumber(dx, -prec + 1, false);
						}

						if (major < dx) {
							major = self._niceTickNumber(dx);
						}
					}
				}

				axisOptions.unitMajor = major;
			}

			if (autoMinor && axisOptions.unitMajor && !isNaN(axisOptions.unitMajor)) {
				axisOptions.unitMinor = axisOptions.unitMajor / 2;
			}
		}
		// end of methods for Axis
		// end of methods
	});
} (jQuery));
