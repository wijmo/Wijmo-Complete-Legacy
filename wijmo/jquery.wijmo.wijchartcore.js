 /*globals $, Raphael, jQuery, document, window*/
/*
 *
 * Wijmo Library 1.0.0
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
 *  jquery.glob.min.js
 *  jquery.svgdom.js
 *  jquery.ui.widget.js
 *
 */
 "use strict";
(function () {

	/*
	Raphael.el.wijGetBBox = function () {
	var box = this.getBBox();
	if (Raphael.vml && this.type === 'text') {
	this.shape.style.display = "inline";
	box.width = this.shape.scrollWidth;
	box.height = this.shape.scrollHeight;
	}
	return box;
	};
	*/

	Raphael.prototype.htmlText = function (x, y, text, attrs, wordSpace, lineSpace) {
		function applyStyle(txt, sp, attrs) {
			var strongRegx = /<(b|strong)>/,
				italicRegx = /<(i|em)>/,
				hrefRegex = /href=[\"\']([^\"\']+)[\"\']/,
				aRegex = /<a/;
			if (attrs) {
				txt.attr(attrs);
			}
			if (strongRegx.test(sp)) {
				txt.attr("font-weight", "bold");
			}
			if (italicRegx.test(sp)) {
				txt.attr("font-style", "italic");
			}
			if (aRegex.test(sp)) {
				if (sp.match(hrefRegex)[1]) {
					txt.attr("href", sp.match(hrefRegex)[1]);
				}
			}
		}

		var texts = text.toString().split(/<br\s?\/>|\\r/i),
			self = this,
			st = self.set(),
			totalX = 0, totalY = 0;
		//set default value of word spacing and line spacing
		wordSpace = wordSpace || 3;
		lineSpace = lineSpace || 5;

		$.each(texts, function (ridx, item) {
			var maxHeight = 0,
				spans = item.split('|||');
			item = item.replace(/<([A-Za-z]+(.|\n)*?)>/g, '|||<$1>')
				.replace(/<\/([A-Za-z]*)>/g, '</$1>|||');

			$.each(spans, function (cidx, span) {
				var temp = null, box = null,
					offsetX = 0, offsetY = 0;
				if (span !== '') {
					temp = span;
					temp = $.trim(temp.replace(/<(.|\n)*?>/g, ''));
					text = self.text(0, 0, temp);
					applyStyle(text, span, attrs);

					box = text.wijGetBBox();
					offsetX = box.width / 2 + totalX;
					offsetY = -box.height / 2 + totalY;
					totalX = totalX + box.width + wordSpace;
					text.translate(offsetX, offsetY);

					st.push(text);
					if (maxHeight < box.height) {
						maxHeight = box.height;
					}
				}
			});
			totalY += maxHeight + lineSpace;
			totalX = maxHeight = 0;
		});
		totalY = 0;
		st.translate(x - st.getBBox().x, y - st.getBBox().y);

		return st;
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

	Raphael.fn.tooltip = function (selector, options) {
		var o = $.extend(true, {}, defaultOptions, options),
			self = this,
			/*
			position = $(self.canvas.parentNode).offset(),
			offsetX = position.left,
			offsetY = position.top,
			*/
			position = null, offsetX = 0, offsetY = 0,
			content, title, container, closeBtn, callout,
			intentShowTimer = null, intentHideTimer = null,
			lastPoint = null,
			closeBtnLength = 5,
			elements = null,
			animations = self.tooltip.animations,
			calloutOffset = o.calloutOffset,
			width = o.width, height = o.height,
			gapLength = o.calloutLength / 2, offsetLength = 0,
			//oX,oY is the default offset of the tooltip
			oX = 0, oY = 0,

		_getShowPoint = function (raphaelObj, compass) {
			var box = raphaelObj.getBBox(),
				point = {
					x: 0,
					y: 0
				};
			switch (compass) {
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
				var animated, d, op;
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
					if (content) {
						content.remove();
						content = null;
					}
					if (title) {
						title.remove();
						title = null;
					}
					if (container) {
						container.remove();
						container = null;
					}
					if (closeBtn) {
						for (var i = 0, ii = closeBtn.length; i < ii; i++) {
							closeBtn[i].unclick();
						}
						closeBtn.remove();
						closeBtn = null;
					}
					if (callout) {
						callout.remove();
						callout = null;
					}
					lastPoint = null;
					elements = null;
				}, d);
			}
		},

		_hide = function () {
			if (intentShowTimer) {
				_clearIntentTimer(intentShowTimer);
			}
			if (intentHideTimer) {
				_clearIntentTimer(intentHideTimer);
			}
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
			switch (compass) {
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
				position = "top-east";
				oX = -2;
				oY = -2;
				break;
			case "south":
				position = "bottom-middle";
				oX = 0;
				oY = 2;
				break;
			case "southeast":
				position = "bottom-left";
				oX = 2;
				oY = 2;
				break;
			case "southwest":
				position = "bottom-right";
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
			switch (compass) {
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
				var fmt = null,
					obj = {
						target: null,
						fmt: text
					};
				if (e && e.target) {
					obj.target = $(e.target).data("raphaelObj");
				}
				fmt = $.proxy(obj.fmt, obj);
				return fmt() + "";
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
							"translation": (-width / 2 + offset + calloutOffset) + ",0" 
						}, duration);
					} else {
						callout.translate(-width / 2 + offset + calloutOffset, 0);
					}
					break;
				case "east":
				case "west":
					if (duration) {
						callout.animate({ 
							"translation": "0," + (-height / 2 + offset + calloutOffset) 
						}, duration);
					}
					else {
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
					if (name in res) {
						res = res[name];
					}
					//typeof res === "function" && isFunc && (res = res());
					if (typeof res === "function" && isFunc) {
						res = res();
					}
				}
			});
			res = (res === null || res === obj ? all : res) + "";
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
				gap = 0, off = 0, dx = 0, dy = 0,
				shapes = null, mask = null, out = null;
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
				right: 0,
				left: w - gap * 2 - off * 2,
				bottom: 0,
				top: h - gap * 2 - off * 2,
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
				left: 0,
				right: w - gap * 2 - off * 2,
				top: 0,
				bottom: h - gap * 2 - off * 2,
				r: r,
				h: h,
				gap: gap,
				offset: off * 2
			}][pos[1] === "middle" ? 1 : (pos[1] === "top" || pos[1] === "left") * 2];
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

		_createTooltip = function (point, e) {
			var titleBox, contentBox, position,
				set = self.set(),
				tit = o.title,
				cont = o.content,
				arrPath = null,
				animated = null,
				op = null, fmt = null, obj = null,
				ox = 0, oy = 0, duration = 250,
				idx = 0, len = 0;
			if ($.isFunction(o.beforeShowing)) {
				fmt = null;
				obj = {
					target: null,
					options: o,
					fmt: o.beforeShowing
				};
				if (e && e.target) {
					obj.target = $(e.target).data("raphaelObj");
				}
				fmt = $.proxy(obj.fmt, obj);
				fmt();
			}
			position = _convertCompassToPosition(o.compass);
			point.x += o.offsetX + oX;
			point.y += o.offsetY + oY;
			elements = self.set();
			if (title) {
				title.remove();
			}
			tit = _getFuncText(tit, e);
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
				content.remove();
			}
			cont = _getFuncText(cont, e);
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
				closeBtn.remove();
			}
			if (content) {
				content.translate(0, titleBox.height / 2 + contentBox.height / 2);
			}
			if (o.closeBehavior === "sticky") {
				closeBtn = self.closeBtn(-1000, -1000, closeBtnLength);
				elements.push(closeBtn);
				if (o.width && o.width > titleBox.width + closeBtnLength * 2 && 
					o.width > contentBox.width + closeBtnLength * 2) {
					closeBtn.translate(o.width - closeBtnLength, closeBtnLength);
				} else if (titleBox.width >= contentBox.width - closeBtnLength * 2) {
					closeBtn.translate(titleBox.width + closeBtnLength, closeBtnLength);
				} else {
					closeBtn.translate(contentBox.width - closeBtnLength, closeBtnLength);
				}

				//bind click event.
				$.each(closeBtn, function () {
					this.click(function (e) {
						_hide(e);
					});
				});
				/*
				for (idx = 0, len = closeBtn.length; idx < len; idx++) {
					closeBtn[idx].click(function (e) {
						_hide(e);
					});
				}
				*/
			}
			if (title) {
				set.push(title);
			}
			if (content) {
				set.push(content);
			}
			if (closeBtn) {
				set.push(closeBtn);
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
			}
			if (callout) {
				callout.remove();
			}
			if (container) {
				container.remove();
			}
			if (lastPoint) {
				if (o.calloutSide || o.calloutFilled) {
					arrPath = _getCalloutArr(lastPoint, offsetLength);

					callout = self.path(arrPath.concat(" "));
					if (o.calloutFilled) {
						callout.attr(o.calloutFilledStyle);
					}
					if (o.calloutSide) {
						_translateCallout(0);
					}
				}
				container = _createPath(lastPoint, position, 
					set, gapLength, offsetLength);
				elements.push(callout);
				elements.push(container);
				ox = point.x - lastPoint.x;
				oy = point.y - lastPoint.y;
				if (title) {
					title.animate({ "translation": ox + "," + oy }, duration);
				}
				if (content) {
					content.animate({ "translation": ox + "," + oy }, duration);
				}
				if (closeBtn) {
					closeBtn.animate({ "translation": ox + "," + oy }, duration);
				}
				if (callout) {
					callout.animate({ "translation": ox + "," + oy }, duration);
				}
				if (container) {
					container.animate({ "translation": ox + "," + oy }, duration);
				}
			} else {
				if (o.calloutSide || o.calloutFilled) {
					arrPath = _getCalloutArr(point, offsetLength);
					callout = self.path(arrPath.concat(" "));
					if (o.calloutFilled) {
						callout.attr(o.calloutFilledStyle);
					}
					if (o.calloutSide) {
						_translateCallout(0);
					}
				}
				container = _createPath(point, position, set, gapLength, offsetLength);
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
			lastPoint = point;
			container.attr(o.style);
			container.toFront();
			set.toFront();
		},

		_showAt = function (point, e) {
			if (intentShowTimer) {
				_clearIntentTimer(intentShowTimer);
			}
			if (intentHideTimer) {
				_clearIntentTimer(intentHideTimer);
			}
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
				raphaelObj = null;
			switch (relativeTo) {
			case "mouse":
				point.x = e.pageX - offsetX;
				point.y = e.pageY - offsetY;
				break;
			case "element":
				raphaelObj = $(e.target).data("raphaelObj");
				point = _getShowPoint(raphaelObj, o.compass);
				break;
			}
			_showAt(point, e);
		},

		_bindEvent = function (selector) {
			$(selector.node).data("raphaelObj", selector);
			switch (o.triggers) {
			case "hover":
				$(selector.node).bind("mouseover.Rtooltip", function (e) {
					_show(e);
				}).bind("mouseout.Rtooltip", function (e) {
					if (o.closeBehavior === "auto") {
						_hide(e);
					}
				});
				if (o.mouseTrailing && o.relativeTo === "mouse") {
					$(selector.node).bind("mousemove.Rtooltip", function (e) {
						_show(e);
					});
				}
				break;
			case "click":
				$(selector.node).bind("click.Rtooltip", function (e) {
					_show(e);
				});
				break;
			case "custom":
				break;
			/*
			case "rightClick":
			$(selector.node).bind("contextmenu.Rtooltip", function (e) {
			_show(e);
			});
			break;
			*/ 
			}
		},

		_bindLiveEvent = function () {
			if (selector) {
				if (selector.length) {
					for (var i = 0, ii = selector.length; i < ii; i++) {
						_bindEvent(selector[i]);
					}
				} else {
					_bindEvent(selector);
				}
			}
		},

		_unbindLiveEvent = function () {
			if (selector) {
				if (selector.length) {
					for (var i = 0, ii = selector.length; i < ii; i++) {
						$(selector[i].node).unbind(".Rtooltip");
					}
				} else {
					$(selector.node).unbind(".Rtooltip");
				}
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

			//this.show = function () {
			//};

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
					}
					else if (side === "east" || side === "west") {
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
		};


		//bind event.
		if (selector) {
			_bindLiveEvent();
		}

		return new Tooltip();

	};


	Raphael.fn.tooltip.animations = {
		fade: function (options) {
			var eles = options.context;
			if (options.show) {
				eles.attr({ "opacity": 0 });
				eles.animate({ "opacity": 1 }, options.duration, options.easing);
			}
			else {
				eles.animate({ "opacity": 0 }, options.duration, options.easing);
			}
		}
	};

}());

Raphael.fn.wij = {
	moveTo: function (x, y) {
		return this.path("M " + x + " " + y);
	},

	lineTo: function (x, y) {
		return this.path("M " + this.wij.lastX + " " +
				this.wij.lastY + "L " + x + " " + y);
	},

	line: function (startX, startY, endX, endY) {
		return this.path(["M", startX, startY, "L", endX, endY]);
	},

	sector: function (cx, cy, r, startAngle, endAngle) {
		var start = this.wij.getPositionByAngle(cx, cy, r, startAngle),
			end = this.wij.getPositionByAngle(cx, cy, r, endAngle);
		return this.path(["M", cx, cy, "L", start.x, start.y, "A", r, r, 0,
						+(endAngle - startAngle > 180), 0, end.x, end.y, "z"]);
	},

	donut: function (cx, cy, outerR, innerR, startAngle, endAngle) {
		var outerS = this.wij.getPositionByAngle(cx, cy, outerR, startAngle),
			outerE = this.wij.getPositionByAngle(cx, cy, outerR, endAngle),
			innerS = this.wij.getPositionByAngle(cx, cy, innerR, startAngle),
			innerE = this.wij.getPositionByAngle(cx, cy, innerR, endAngle),
			largeAngle = endAngle - startAngle > 180;

		return this.path(["M", outerS.x, outerS.y,
				"A", outerR, outerR, 0, +largeAngle, 0, outerE.x, outerE.y,
				"L", innerE.x, innerE.y,
				"A", innerR, innerR, 0, +largeAngle, 1, innerS.x, innerS.y,
				"L", outerS.x, outerS.y, "z"]);
	},

	roundRect: function (x, y, width, height, tlCorner, lbCorner, brCorner, rtCorner) {
		var rs = [],
			posFactors = [-1, 1, 1, 1, 1, -1, -1, -1],
			orientations = ["v", "h", "v", "h"],
			pathData = null,
			lens = null;

		//["M", x + tlx, y, 
		//"a", tlx, tly, 0, 0, 0, -tlx, tly, "v", height - tly - lby, 
		//"a", lbx, lby, 0, 0, 0, lbx, lby, "h", width - lbx - brx,
		//"a", brx, bry, 0, 0, 0, brx, -bry, "v", bry + rty - height,
		//"a", rtx, rty, 0, 0, 0, -rtx, -rty, "h", rtx + tlx - width, "z"]
		$.each([tlCorner, lbCorner, brCorner, rtCorner], function (idx, corner) {
			if (typeof (corner) === "number") {
				rs = rs.concat({ x: corner, y: corner });
			}
			else if (typeof (corner) === "object") {
				rs = rs.concat(corner);
			}
			else {
				rs = rs.concat({ x: 0, y: 0 });
			}
		});

		pathData = ["M", x + rs[0].x, y];
		lens = [height - rs[0].y - rs[1].y, width - rs[1].x - rs[2].x,
				rs[2].y + rs[3].y - height, rs[3].x + rs[0].x - width];

		$.each(rs, function (idx, r) {
			if (r.x && r.y) {
				pathData = pathData.concat("a", r.x, r.y, 0, 0, 0,
						posFactors[2 * idx] * r.x, posFactors[2 * idx + 1] * r.y);
			}

			pathData = pathData.concat(orientations[idx], lens[idx]);
		});

		pathData.push("z");

		return this.path(pathData);
	},

	wrapText: function (x, y, text, width, textAlign, textStyle) {
		var self = this,
			rotation = textStyle.rotation,
			style = rotation ? $.extend(true, {}, textStyle, { rotation: 0 }) : textStyle,
			top = y,
			texts = self.set(),
			bounds = null, center = null,
			textBounds = [];

		function splitString(text, width, textStyle) {
			var tempText = null,
				bounds = null,
				words = text.split(' '),
				lines = [],
				line = [],
				tempTxt = "";
			while (words.length) {
				tempTxt += ' ' + words[0];
				tempText = self.text(-1000, -1000, tempTxt);
				tempText.attr(textStyle);
				bounds = tempText.wijGetBBox();

				if (bounds.width > width) {
					if (line.length) {
						lines.push(line);
						tempTxt = words[0];
					}
					line = [words.shift()];
				}
				else {
					line.push(words.shift());
				}

				if (words.length === 0) {
					lines.push(line);
				}

				tempText.remove();
				tempText = null;
			}

			return lines;
		}

		$.each(splitString(text, width, style), function (idx, line) {
			var lineText = line.join(' '),
				align = textAlign || "near",
				txt = self.text(x, top, lineText),
				offsetX = 0,
				offsetY = 0;

			txt.attr(style);
			bounds = txt.wijGetBBox();

			switch (align) {
			case "near":
				offsetX = width - bounds.width / 2;
				offsetY += bounds.height / 2;
				top += bounds.height;
				break;
			case "center":
				offsetX += width / 2;
				offsetY += bounds.height / 2;
				top += bounds.height;
				break;
			case "far":
				offsetX += bounds.width / 2;
				offsetY += bounds.height / 2;
				top += bounds.height;
				break;
			}
			bounds.x += offsetX;
			bounds.y += offsetY;
			txt.translate(offsetX, offsetY);
			texts.push(txt);
			textBounds.push(bounds);
		});

		if (rotation) {
			if (texts.length > 1) {
				bounds = texts.wijGetBBox();
				center = {
					x: bounds.x + bounds.width / 2,
					y: bounds.y + bounds.height / 2
				};

				$.each(texts, function (idx, txt) {
					var math = Math,
						tb = textBounds[idx],
						txtCenter = { x: tb.x + tb.width / 2, y: tb.y + tb.height / 2 },
						len = math.sqrt(math.pow(txtCenter.x - center.x, 2) +
							math.pow(txtCenter.y - center.y, 2)),
						theta = 0, rotatedTB = null, newTxtCenter = null;

					txt.attr({ rotation: rotation });

					if (len === 0) {
						return true;
					}

					theta = Raphael.deg(math.asin(
						math.abs(txtCenter.y - center.y) / len));

					if (txtCenter.y > center.y) {
						if (txtCenter.x > center.x) {
							theta -= 360;
						}
						else {
							theta = -1 * (theta + 180);
						}
					}
					else {
						if (txtCenter.x > center.x) {
							theta *= -1;
						}
						else {
							theta = -1 * (180 - theta);
						}
					}
					newTxtCenter = self.wij.getPositionByAngle(center.x, center.y, len,
											-1 * (rotation + theta));

					rotatedTB = txt.wijGetBBox();

					txt.translate(newTxtCenter.x - rotatedTB.x - rotatedTB.width / 2,
							newTxtCenter.y - rotatedTB.y - rotatedTB.height / 2);
				});
			}
			else {
				texts[0].attr({ rotation: rotation });
			}
		}

		return texts;
	},

	getPositionByAngle: function (cx, cy, r, angle) {
		var point = {},
			rad = Raphael.rad(angle);
		point.x = cx + r * Math.cos(-1 * rad);
		point.y = cy + r * Math.sin(-1 * rad);

		return point;
	},

	getSVG: function () {
		function createSVGElement(type, options) {
			var element = '<' + type + ' ',
				val = null,
				styleExist = false;

			$.each(options, function (name, val) {
				if (name === "text" || name === "opacity" ||
					name === "transform" || name === "path" ||
					name === "w" || name === "h" || name === "translation") {
					return true;
				}

				if (val !== null) {
					if (name === "stroke" && val === 0) {
						val = "none";
					}

					element += name + "='" + val + "' ";
				}
			});
			/*
			for (name in options) {
			if (name === "text" || name === "opacity" ||
			name === "transform" || name === "path" ||
			name === "w" || name === "h" || name === "translation") {
			continue;
			}

			if ((val = options[name]) !== null) {
			if (name === "stroke" && val === 0) {
			val = "none";
			}

			element += name + "='" + val + "' ";
			}
			}
			*/

			if ((val = options.opacity) !== null) {
				element += "opacity='" + val + "' style='opacity:" + val + ";";
				styleExist = true;
			}

			if ((val = options.transform) !== null && val.length > 0) {
				if (styleExist) {
					element += "transform:" + val;
				}
				else {
					element += "style='transform:" + val;
					styleExist = true;
				}
			}

			if (styleExist) {
				element += "'";
			}

			if ((val = options.text) !== null) {
				element += "><tspan>" + val + "</tspan>";
			}
			else {
				element += ">";
			}

			element += "</" + type + ">";

			return element;
		}

		var paper = this,
			svg = '<svg xmlns="http://www.w3.org/2000/svg" ' +
				'xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' +
				paper.canvas.offsetWidth + '" height="' + paper.canvas.offsetHeight +
				'"><desc>Created with Raphael</desc><defs></defs>',
			node, path = "", trans, group, value,
			idx = 0,
			len1 = 0,
			index = 0,
			len2 = 0;

		for (node = paper.bottom; node; node = node.next) {
			if (node && node.type) {
				switch (node.type) {
				case "path":
					for (idx = 0, len1 = node.attrs.path.length; idx < len1; idx++) {
						group = node.attrs.path[idx];

						for (index = 0, len2 = group.length; index < len2; index++) {
							value = group[index];

							if (index < 1) {
								path += value;
							}
							else {
								if (index === (len2 - 1)) {
									path += value;
								}
								else {
									path += value + ',';
								}
							}
						}
					}

					if (path && path.length > 0) {
						node.attrs.d = path.replace(/,/g, ' ');
					}
					break;
				case "text":
					if (!node.attrs["text-anchor"]) {
						node.attrs["text-anchor"] = "middle";
					}
					break;
				case "image":
					trans = node.transformations;
					node.attrs.transform = trans ? trans.join(' ') : '';
					break;
				case "ellipse":
				case "rect":
					svg += createSVGElement(node.type, node.attrs);
					break;
				}
			}
		}

		svg += '</svg>';

		return svg;
	}
};

Raphael.el.wijGetBBox = function () {
	var box = this.getBBox(),
		degreesAsRadians = null,
		points = [],
		newX, newY, newWidth, newHeight, p,
		bb = { left: 0, right: 0, top: 0, bottom: 0 },
		_px = 0;
	if (this.attrs && this.attrs.rotation) {
		degreesAsRadians = this._.rt.deg * Math.PI / 180;
		points.push({ x: 0, y: 0 });
		points.push({ x: box.width, y: 0 });
		points.push({ x: 0, y: box.height });
		points.push({ x: box.width, y: box.height });
		for (_px = 0; _px < points.length; _px++) {
			p = points[_px];
			newX = parseInt((p.x * Math.cos(degreesAsRadians)) +
				(p.y * Math.sin(degreesAsRadians)), 10);
			newY = parseInt((p.x * Math.sin(degreesAsRadians)) +
				(p.y * Math.cos(degreesAsRadians)), 10);
			bb.left = Math.min(bb.left, newX);
			bb.right = Math.max(bb.right, newX);
			bb.top = Math.min(bb.top, newY);
			bb.bottom = Math.max(bb.bottom, newY);
		}
		newWidth = parseInt(Math.abs(bb.right - bb.left), 10);
		newHeight = parseInt(Math.abs(bb.bottom - bb.top), 10);
		newX = (box.x + (box.width) / 2) - newWidth / 2;
		newY = (box.y + (box.height) / 2) - newHeight / 2;

		return { x: newX, y: newY, width: newWidth, height: newHeight };
	}

	box = this.getBBox();
	if (Raphael.vml && this.type === 'text') {
		this.shape.style.display = "inline";
		box.width = this.shape.scrollWidth;
		box.height = this.shape.scrollHeight;
	}
	return box;
};

Raphael.el.wijAnimate = function (params, ms, easing, callback) {
	this.animate(params, ms, easing, callback);
	var shadow = this.shadow,
		offset = 0;

	if (shadow) {
		offset = shadow.offset;
		if (params.x) {
			params.x += offset;
		}
		if (params.y) {
			params.y += offset;
		}
		this.shadow.animate(params, ms, easing, callback);
	}
};

Raphael.el.wijAttr = function (name, value) {
	this.attr(name, value);

	if (this.shadow) {
		if (typeof (name) === "object") {
			var newName = $.extend(true, {}, name);
			if (newName.fill) {
				delete newName.fill;
			}
			if (newName.stroke) {
				delete newName.stroke;
			}
			if (newName["stroke-width"]) {
				delete newName["stroke-width"];
			}
			this.shadow.attr(newName, value);
		}
		else if (typeof (name) === "string") {
			switch (name) {
			case "clip-rect":
			case "cx":
			case "cy":
			case "fill-opacity":
			case "font":
			case "font-family":
			case "font-size":
			case "font-weight":
			case "height":
			case "opacity":
			case "path":
			case "r":
			case "rotation":
			case "rx":
			case "ry":
			case "scale":
			case "stroke-dasharray":
			case "stroke-linecap":
			case "stroke-linejoin":
			case "stroke-miterlimit":
			case "stroke-opacity":
			case "stroke-width":
			case "translation":
			case "width":
				this.shadow.attr(name, value);
				break;
			case "x":
				this.shadow.attr(name, value);
				this.shadow.attr("translation", "1 0");
				break;
			case "y":
				this.shadow.attr(name, value);
				this.shadow.attr("translation", "0 1");
				break;
			default:
				break;
			}
		}
	}
};

Raphael.st.wijAttr = function (name, value) {
	for (var i = 0, ii = this.items.length; i < ii; i++) {
		this.items[i].wijAttr(name, value);
	}
	return this;
};

Raphael.st.wijAnimate = function (params, ms, easing, callback) {
	var i = 0, ii = 0,
		item = null;
	for (i = 0, ii = this.items.length; i < ii; i++) {
		item = this.items[i];
		item.animate(params, ms, easing, callback);
		if (item.shadow) {
			item.shadow.animate(params, ms, easing, callback);
		}
	}
	return this;
};

Raphael.st.wijGetBBox = function () {
	var x = [],
		y = [],
		w = [],
		h = [],
		mmax = Math.max,
		mmin = Math.min,
		push = "push",
		apply = "apply",
		box = null,
		i = 0;
	for (i = this.items.length - 1; i >= 0; i--) {
		box = this.items[i].wijGetBBox();
		x[push](box.x);
		y[push](box.y);
		w[push](box.x + box.width);
		h[push](box.y + box.height);
	}
	x = mmin[apply](0, x);
	y = mmin[apply](0, y);
	return {
		x: x,
		y: y,
		width: mmax[apply](0, w) - x,
		height: mmax[apply](0, h) - y
	};
};

function isSVGElem(node) {
	var svgNS = "http://www.w3.org/2000/svg";
	return (node.nodeType === 1 && node.namespaceURI === svgNS);
}

$.expr.filter.CLASS = function (elem, match) {
	var className = (!isSVGElem(elem) ? elem.className :
		(elem.className ? elem.className.baseVal : elem.getAttribute('class')));
	return (' ' + className + ' ').indexOf(match) > -1;
};

$.expr.preFilter.CLASS = function (match, curLoop, inplace, result, not, isXML) {
	var i = 0, elem = null, className = null;
	match = ' ' + match[1].replace(/\\/g, '') + ' ';
	if (isXML) {
		return match;
	}
	for (i = 0, elem = {}; elem; i++) {
		elem = curLoop[i];
		if (!elem) {
			try {
				elem = curLoop.item(i);
			}
			catch (e) {
			}
		}
		if (elem) {
			className = (!isSVGElem(elem) ? elem.className :
				(elem.className ? elem.className.baseVal : '') ||
				elem.getAttribute('class'));
			if (not ^ (className && (' ' + className + ' ').indexOf(match) > -1)) {
				if (!inplace) {
					result.push(elem);
				}
			}
			else if (inplace) {
				curLoop[i] = false;
			}
		}
	}
	return false;
};

(function ($) {

	$.widget("wijmo.wijchartcore", {
		options: {
			/// <summary>
			/// A value that indicates the width of wijchart.
			/// Default: null.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      width: 600
			///  });
			/// <remarks>
			/// If the value is null, then the width will be calculated
			/// by dom element which is used to put the canvas.
			/// </remarks>
			/// </summary>
			width: null,
			/// <summary>
			/// A value that indicates the height of wijchart.
			/// Default: null.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      height: 400
			///  });
			/// <remarks>
			/// If the value is null, then the height will be calculated
			/// by dom element which is used to put the canvas.
			/// </remarks>
			/// </summary>
			height: null,
			/// <summary>
			/// An array collection that contains the data to be charted.
			/// Default: [].
			/// Type: Array.
			///	Code example: 
			///	$("#chartcore").wijchartcore({
			///				seriesList: [{
			///                 label: "Q1",
			///                 legendEntry: true,
			///                 data: {
			///						x: [1, 2, 3, 4, 5],
			///						y: [12, 21, 9, 29, 30]
			///					},
			///				offset: 0
			///             }, {
			///					label: "Q2",
			///					legendEntry: true,
			///					data: {
			///						xy: [1, 21, 2, 10, 3, 19, 4, 31, 5, 20]
			///					},
			///					offset: 0
			///				}]
			///				OR
			///				seriesList: [{
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: ["A", "B", "C", "D", "E"],
			///						y: [12, 21, 9, 29, 30]
			///					},
			///					offset: 0
			///				}]
			///				OR
			///				seriesList: [{
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: [new Date(1978, 0, 1), new Date(1980, 0, 1), 
			///							new Date(1981, 0, 1), new Date(1982, 0, 1), 
			///							new Date(1983, 0, 1)],
			///						y: [12, 21, 9, 29, 30]
			///					},
			///					offset: 0
			///				}]
			///  });
			/// </summary>
			seriesList: [],
			/// <summary>
			/// An array collection that contains the style to be charted.
			/// Default: [{stroke: "#77b3af", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#67908e", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#465d6e", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#5d3f51", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#682e32", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#8c5151", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#ce9262", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#ceb664", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#7fb34f", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#2a7b5f", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#6079cb", opacity: 0.9, "stroke-width": "1"}, {
			///				stroke: "#60a0cb", opacity: 0.9, "stroke-width": "1"}].
			/// Type: Array.
			///	Code example: 
			///	$("#chartcore").wijchartcore({
			///				seriesStyles: [
			///					{fill: "rgb(255,0,0)", stroke:"none"}, 
			///					{ fill: "rgb(255,125,0)", stroke: "none" }
			///				]});
			/// </summary>
			seriesStyles: [{
				stroke: "#77b3af", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#67908e", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#465d6e", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#5d3f51", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#682e32", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#8c5151", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#ce9262", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#ceb664", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#7fb34f", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#2a7b5f", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#6079cb", 
				opacity: 0.9, 
				"stroke-width": "1"
			}, {
				stroke: "#60a0cb", 
				opacity: 0.9, 
				"stroke-width": "1"
			}],
			/// <summary>
			/// An array collection that contains the style to 
			/// be charted when hovering the chart element.
			/// Default: [{opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}, {
			///				opacity: 1, "stroke-width": "1.5"}].
			/// Type: Array.
			///	Code example: 
			///	$("#chartcore").wijchartcore({
			///				seriesHoverStyles: [
			///					{fill: "rgb(255,0,0)", stroke:"none"}, 
			///					{ fill: "rgb(255,125,0)", stroke: "none" }
			///				]});
			/// </summary>
			seriesHoverStyles: [{
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}, {
				opacity: 1, 
				"stroke-width": "1.5"
			}],
			/// <summary>
			/// A value that indicates the top margin of the chart area.
			/// Default: 25.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      marginTop: 25
			///  });
			/// </summary>
			marginTop: 25,
			/// <summary>
			/// A value that indicates the right margin of the chart area.
			/// Default: 25.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      marginRight: 25
			///  });
			/// </summary>
			marginRight: 25,
			/// <summary>
			/// A value that indicates the bottom margin of the chart area.
			/// Default: 25.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      marginBottom: 25
			///  });
			/// </summary>
			marginBottom: 25,
			/// <summary>
			/// A value that indicates the left margin of the chart area.
			/// Default: 25.
			/// Type: Number.
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      marginLeft: 25
			///  });
			/// </summary>
			marginLeft: 25,
			/// <summary>
			/// A value that indicates the style of the chart text.
			/// Default: {fill:"#888", "font-size": "10pt", stroke:"none"}.
			/// Type: Object.
			/// </summary>
			textStyle: {
				fill: "#888",
				"font-size": "10pt",
				stroke: "none"
			},
			/// <summary>
			/// An object that value indicates the header of the chart element.
			/// Type: Object.
			/// Default: {visible:true, style:{fill:"none", stroke:"none"},
			///			textStyle:{"font-size": "18pt", fill:"#666", stroke:"none"}, 
			///			compass:"north", orientation:"horizontal"}		
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      header: {
			///			text:"header",
			///			style:{
			///				fill:"#f1f1f1",
			///				stroke:"#010101"
			///				}}
			///  });
			/// </summary>
			header: {
				/// <summary>
				/// A value that indicates the text of the header.
				/// Default: "".
				/// Type: String.
				/// </summary>
				text: "",
				/// <summary>
				/// A value that indicates the style of the header.
				/// Default: {fill:"none", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the header text.
				/// Default: {"font-size": "18pt", fill:"#666", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				textStyle: {
					"font-size": "18pt",
					fill: "#666",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the compass of the header.
				/// Default: "north".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'north', 'south', 'east' and 'west'.
				/// </remarks>
				compass: "north",
				/// <summary>
				/// A value that indicates the orientation of the header.
				/// Default: "horizontal".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'horizontal' and 'vertical'.
				/// </remarks>
				orientation: "horizontal",
				/// <summary>
				/// A value that indicates the visibility of the header.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				visible: true
			},
			/// <summary>
			/// An object value that indicates the footer of the chart element.
			/// Type: Object.
			/// Default: {visible:false, style:{fill:"#fff", stroke:"none"}, 
			///			textStyle:{fille:"#000", stroke:"none"}, compass:"south", 
			///			orientation:"horizontal"}
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      footer: {
			///			text:"footer",
			///			style:{
			///				fill:"#f1f1f1",
			///				stroke:"#010101"
			///				}}
			///  });
			/// </summary>
			footer: {
				/// <summary>
				/// A value that indicates the text of the footer.
				/// Default: "".
				/// Type: String.
				/// </summary>
				text: "",
				/// <summary>
				/// A value that indicates the style of the footer.
				/// Default: {fill:"#fff", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "#fff",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the footer text.
				/// Default: {fill:"#000", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				textStyle: {
					fill: "#000",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the compass of the footer.
				/// Default: "south".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'north', 'south', 'east' and 'west'.
				/// </remarks>
				compass: "south",
				/// <summary>
				/// A value that indicates the orientation of the footer.
				/// Default: "horizontal".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'horizontal' and 'vertical'.
				/// </remarks>
				orientation: "horizontal",
				/// <summary>
				/// A value that indicates the visibility of the footer.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				visible: false
			},
			/// <summary>
			/// An object value indicates the legend of the chart element.
			/// Type: Object.
			/// Default: {text:"", textMargin:{left:2,top:2,right:2,bottom:2},
			///			titleStyle:{"font-weight":"bold",fill:"#000",stroke:"none},
			///			visible:true, style:{fill:"#none", stroke:"none"}, 
			///			textStyle:{fille:"#333", stroke:"none"}, compass:"east", 
			///			orientation:"vertical"}
			/// Code example:
			///  $("#chartcore").wijchartcore({
			///      legend: {
			///			text:"legend",
			///			style:{
			///				fill:"#f1f1f1",
			///				stroke:"#010101"
			///				}}
			///  });
			/// </summary>
			legend: {
				/// <summary>
				/// A value that indicates the text of the legend.
				/// Default: "".
				/// Type: String.
				/// </summary>
				text: "",
				/// <summary>
				/// A value that indicates the text margin of the legend item.
				/// Default: {left:2, top:2, right:2, bottom:2}.
				/// Type: Number.
				/// </summary>
				textMargin: { left: 2, top: 2, right: 2, bottom: 2 },
				/// <summary>
				/// A value that indicates the style of the legend.
				/// Default: {fill:"#none", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the legend text.
				/// Default: {fill:"#333", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				textStyle: {
					fill: "#333",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the legend title.
				/// Default: {"font-weight": "bold", fill:"#000", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				titleStyle: {
					"font-weight": "bold",
					fill: "#000",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the compass of the legend.
				/// Default: "east".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'north', 'south', 'east' and 'west'.
				/// </remarks>
				compass: "east",
				/// <summary>
				/// A value that indicates the orientation of the legend.
				/// Default: "vertical".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'horizontal' and 'vertical'.
				/// </remarks>
				orientation: "vertical",
				/// <summary>
				/// A value that indicates the visibility of the legend.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				visible: true
			},
			/// <summary>
			/// A value that provides information about the axes.
			/// Default: {x:{alignment:"center",
			///		style:{stroke:"#999999","stroke-width":0.5}, visible:true, 
			///		textVisible:true, textStyle:{fill: "#888", "font-size": "15pt",
			///		"font-weight": "bold"},labels: {style: {fill: "#333", 
			///		"font-size": "11pt"},textAlign: "near", width: null},
			///		compass:"south",
			///		autoMin:true,autoMax:true,autoMajor:true,autoMinor:true, 
			///		gridMajor:{visible:false,style:{stroke:"#CACACA",
			///		"stroke-dasharray":"- "}}},gridMinor:{visible:false, 
			///		style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			///		tickMajor:{position:"none",style:{fill:"black"},factor:1},
			///		tickMinor:{position:"none",style:{fill:"black"},factor:1},
			///		annoMethod:"values",valueLabels:[]},
			///		y:{alignment:"center",style:{stroke: "#999999",
			///		"stroke-width": 0.5},visible:false, textVisible:true, 
			///		textStyle: {fill: "#888","font-size": "15pt",
			///		"font-weight": "bold"},labels: {style: {fill: "#333",
			///		"font-size": "11pt"},textAlign: "center", width: null},
			///		compass:"west",
			///		autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
			///		gridMajor:{visible:true, style:{stroke:"#999999", 
			///		"stroke-width": "0.5","stroke-dasharray":"none"}}},
			///		gridMinor:{visible:false, style:{stroke:"#CACACA",
			///		"stroke-dasharray":"- "}}},tickMajor:{position:"none",
			///		style:{fill:"black"},factor:1},tickMinor:{position:"none",
			///		style:{fill:"black"},factor:1},annoMethod:"values",valueLabels:[]}.
			/// Type: Object.
			/// </summary>
			axis: {
				/// <summary>
				/// A value that provides information for the X axis.
				/// Default: {alignment:"center",style:{stroke:"#999999",
				///		"stroke-width":0.5}, visible:true, textVisible:true, 
				///		textStyle:{fill: "#888", "font-size": "15pt", 
				///		"font-weight": "bold"}, labels: {style: {fill: "#333", 
				///		"font-size": "11pt"},textAlign: "near", width: null},
				///		compass:"south",
				///		autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				///		gridMajor:{visible:false, style:{stroke:"#CACACA",
				///		"stroke-dasharray":"- "}}},gridMinor:{visible:false, 
				///		style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
				///		tickMajor:{position:"none",style:{fill:"black"},factor:1},
				///		tickMinor:{position:"none",style:{fill:"black"},factor:1},
				///		annoMethod:"values",valueLabels:[]}.
				/// Type: Object.
				/// </summary>
				x: {
					/// <summary>
					/// A value that indicates the alignment of the X axis text.
					/// Default: "center".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// Options are 'center', 'near', 'far'.
					/// </remarks>
					alignment: "center",
					/// <summary>
					/// A value that indicates the style of the X axis.
					/// Default: {stroke: "#999999", "stroke-width": 0.5}.
					/// Type: Object.
					/// </summary>
					style: {
						stroke: "#999999",
						"stroke-width": 0.5
					},
					/// <summary>
					/// A value that indicates the visibility of the X axis.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					visible: true,
					/// <summary>
					/// A value that indicates the visibility of the X axis text.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					textVisible: true,
					/// <summary>
					/// A value that indicates the style of text of the X axis.
					/// Default: {fill: "#888","font-size": "15pt","font-weight": "bold"}.
					/// Type: Object.
					/// </summary>
					textStyle: {
						fill: "#888",
						"font-size": "15pt",
						"font-weight": "bold"
					},
					/// <summary>
					/// A value that provides information for the labels.
					/// Default: {style: {fill: "#333","font-size": "11pt"},
					///			textAlign: "near", width: null}.
					/// Type: Object.
					/// </summary>
					labels: {
						/// <summary>
						/// A value that indicates the style of major text of the X axis.
						/// Default: {fill: "#333","font-size": "11pt"}.
						/// Type: Object.
						/// </summary>
						style: {
							fill: "#333",
							"font-size": "11pt"
						},
						/// <summary>
						/// A value that indicates the alignment
						/// of major text of the X axis.
						/// Default: "near".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'near', 'center' and 'far'.
						/// </remarks>
						textAlign: "near",
						/// <summary>
						/// A value that indicates the width of major text of the X axis.
						/// Default: null.
						/// Type: Number.
						/// <remarks>
						/// If the value is null, then the width 
						/// will be calculated automatically.
						/// </remarks>
						/// </summary>
						width: null
					},
					/// <summary>
					/// A value that indicates the compass of the X axis.
					/// Default: "south".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// Options are 'north', 'south', 'east' and 'west'.
					/// </remarks>
					compass: "south",
					/// <summary>
					/// A value that indicates whether the minimum axis
					/// value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMin: true,
					/// <summary>
					/// A value that indicates whether the maximum axis
					/// value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMax: true,
					/// <summary>
					/// A value that indicates the minimum value of the axis.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					min: null,
					/// <summary>
					/// A value that indicates the maximum value of the axis.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					max: null,
					/// <summary>
					/// A value that indicates whether the major tick mark
					/// values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMajor: true,
					/// <summary>
					/// A value that indicates whether the minor tick mark
					/// values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMinor: true,
					/// <summary>
					/// A value that indicates the units between major tick marks.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					unitMajor: null,
					/// <summary>
					/// A value that indicates the units between minor tick marks.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					unitMinor: null,
					/// <summary>
					/// A value that provides information for the major grid line.
					/// Default: {visible:false,
					///		 style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
					/// Type: Object.
					/// </summary>
					gridMajor: {
						/// <summary>
						/// A value that indicates the visibility of the major grid line.
						/// Default: false.
						/// Type: Boolean.
						/// </summary>
						visible: false,
						/// <summary>
						/// A value that indicates the style of the major grid line.
						/// Default: {stroke:"#CACACA", "stroke-dasharray": "- "}.
						/// Type: Object.
						/// </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					/// <summary>
					/// A value that provides information for the minor grid line.
					/// Default: {visible:false, 
					///			style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
					/// Type: Object.
					/// </summary>
					gridMinor: {
						/// <summary>
						/// A value that indicates the visibility of the minor grid line.
						/// Default: false.
						/// Type: Boolean.
						/// </summary>
						visible: false,
						/// <summary>
						/// A value that indicates the style of the minor grid line.
						/// Default: {stroke:"#CACACA", "stroke-dasharray": "- "}.
						/// Type: Object.
						/// </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					/// <summary>
					/// A value that provides information for the major tick.
					/// Default: {position:"none", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMajor: {
						/// <summary>
						/// A value that indicates the type of major tick mark.
						/// Default: "none".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'none', 'inside', 'outside' and 'cross'.
						/// </remarks>
						position: "none",
						/// <summary>
						/// A value that indicates the style of major tick mark.
						/// Default: {fill: "black"}.
						/// Type: Object.
						/// </summary>
						style: { fill: "black" },
						/// <summary>
						/// A value that indicates an integral
						/// factor for major tick mark length.
						/// Default: 1.
						/// Type: Number.
						/// </summary>
						factor: 1
					},
					/// <summary>
					/// A value that provides information for the minor tick.
					/// Default: {position:"none", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMinor: {
						/// <summary>
						/// A value that indicates the type of minor tick mark.
						/// Default: "none".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'none', 'inside', 'outside' and 'cross'.
						/// </remarks>
						position: "none",
						/// <summary>
						/// A value that indicates the style of minor tick mark.
						/// Default: {fill: "black"}.
						/// Type: Object.
						/// </summary>
						style: { fill: "black" },
						/// <summary>
						/// A value that indicates an integral
						/// factor for minor tick mark length.
						/// Default: 1.
						/// Type: Number.
						/// </summary>
						factor: 1
					},
					/// <summary>
					/// A value that indicates the method of annotation.
					/// Default: "values".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// Options are 'values', 'valueLabels'.
					/// </remarks>
					annoMethod: "values",
					/// <summary>
					/// A value that shows a collection of valueLabels for the X axis.
					/// Default: [].
					/// Type: Array.
					/// </summary>
					valueLabels: []
					//todo.
					//autoOrigin: true,
					//origin: null,
					//tickLabel: "nextToAxis",
				},
				/// <summary>
				/// A value that provides infomation for the Y axis.
				/// Default: {alignment:"center",style:{stroke: "#999999",
				///		"stroke-width": 0.5},visible:false, textVisible:true, 
				///		textStyle: {fill: "#888","font-size": "15pt",
				///		"font-weight": "bold"}, labels: {style: {fill: "#333",
				///		"font-size": "11pt"},textAlign: "center", width: null},
				///		compass:"west",
				///		autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				///		gridMajor:{visible:true, style:{stroke:"#999999", 
				///		"stroke-width": "0.5", "stroke-dasharray":"none"}}},
				///		gridMinor:{visible:false, style:{stroke:"#CACACA",
				///		"stroke-dasharray":"- "}}},tickMajor:{position:"none",
				///		style:{fill:"black"},factor:1},tickMinor:{position:"none",
				///		style:{fill:"black"},factor:1},annoMethod:"values",
				///		valueLabels:[]}
				/// Type: Object.
				/// </summary>
				y: {
					/// <summary>
					/// A value that indicates the alignment of the Y axis text.
					/// Default: "center".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// Options are 'center', 'near', 'far'.
					/// </remarks>
					alignment: "center",
					/// <summary>
					/// A value that indicates the style of the Y axis.
					/// Default: {stroke:"#999999", "stroke-width": 0.5}.
					/// Type: Object.
					/// </summary>
					style: {
						stroke: "#999999",
						"stroke-width": 0.5
					},
					/// <summary>
					/// A value that indicates the visibility of the Y axis.
					/// Default: false.
					/// Type: Boolean.
					/// </summary>
					visible: false,
					/// <summary>
					/// A value that indicates the visibility of the Y axis text.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					textVisible: true,
					/// <summary>
					/// A value that indicates the style of text of the Y axis.
					/// Default: {fill: "#888", "font-size": "15pt", 
					///			"font-weight": "bold"}.
					/// Type: Object.
					/// </summary>
					textStyle: {
						fill: "#888",
						"font-size": "15pt",
						"font-weight": "bold"
					},
					/// <summary>
					/// A value that provides information for the labels.
					/// Default: {style: {fill: "#333","font-size": "11pt"},
					///			textAlign: "center", width: null}.
					/// Type: Object.
					/// </summary>
					labels: {
						/// <summary>
						/// A value that indicates the style of major text of the Y axis.
						/// Default: {fill: "#333","font-size": "11pt"}.
						/// Type: Object.
						/// </summary>
						style: {
							fill: "#333",
							"font-size": "11pt"
						},
						/// <summary>
						/// A value that indicates the 
						/// of major text of the Y axis.
						/// Default: "center".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'near', 'center' and 'far'.
						/// </remarks>
						textAlign: "center",
						/// <summary>
						/// A value that indicates the width major text of the Y axis.
						/// Default: null.
						/// Type: Number.
						/// <remarks>
						/// If the value is null, then the width
						/// will be calculated automatically.
						/// </remarks>
						/// </summary>
						width: null
					},
					/// <summary>
					/// A value that indicates the compass of the Y axis.
					/// Default: "west".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// Options are 'north', 'south', 'east' and 'west'.
					/// </remarks>
					compass: "west",
					/// <summary>
					/// A value that indicates whether the minimum axis
					/// value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMin: true,
					/// <summary>
					/// A value that indicates whether the maximum axis
					/// value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMax: true,
					/// <summary>
					/// A value that indicates the minimum value of the Y axis.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					min: null,
					/// <summary>
					/// A value that indicates the maximum value of the Y axis.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					max: null,
					/// <summary>
					/// A value that indicates whether the major tick mark
					/// values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMajor: true,
					/// <summary>
					/// A value that indicates whether the minor tick mark
					/// values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMinor: true,
					/// <summary>
					/// A value that indicates the units between major tick marks.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					unitMajor: null,
					/// <summary>
					/// A value that indicates the units between minor tick marks.
					/// Default: null.
					/// Type: Number.
					/// </summary>
					unitMinor: null,
					/// <summary>
					/// A value that provides information for the major grid line.
					/// Default: {visible:true, style:{stroke:"#999999", 
					///			"stroke-width": "0.5","stroke-dasharray":"none"}}.
					/// Type: Object.
					/// </summary>
					gridMajor: {
						/// <summary>
						/// A value that indicates the visibility of the major grid line.
						/// Default: true.
						/// Type: Boolean.
						/// </summary>
						visible: true,
						/// <summary>
						/// A value that indicates the style of the major grid line.
						/// Default: {stroke:"#999999", "stroke-width": "0.5", 
						///			"stroke-dasharray": "none"}.
						/// Type: Object.
						/// </summary>
						style: {
							stroke: "#999999",
							"stroke-width": "0.5",
							"stroke-dasharray": "none"
						}
					},
					/// <summary>
					/// A value that provides information for the minor grid line.
					/// Default: {visible:false, style:{stroke:"#CACACA",
					///			"stroke-dasharray":"- "}}.
					/// Type: Object.
					/// </summary>
					gridMinor: {
						/// <summary>
						/// A value that indicates the visibility of the minor grid line.
						/// Default: false.
						/// Type: Boolean.
						/// </summary>
						visible: false,
						/// <summary>
						/// A value that indicates the style of the minor grid line.
						/// Default: {stroke:"#CACACA", "stroke-dasharray": "- "}.
						/// Type: Object.
						/// </summary>
						style: {
							stroke: "#CACACA",
							"stroke-dasharray": "- "
						}
					},
					/// <summary>
					/// A value that provides information for the major tick.
					/// Default: {position:"none", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMajor: {
						/// <summary>
						/// A value that indicates the type of major tick mark.
						/// Default: "none".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'none', 'inside', 'outside' and 'cross'.
						/// </remarks>
						position: "none",
						/// <summary>
						/// A value that indicates the style of major tick mark.
						/// Default: {fill: "black"}.
						/// Type: Object.
						/// </summary>
						style: { fill: "black" },
						/// <summary>
						/// A value that indicates an integral factor
						/// for major tick mark length.
						/// Default: 1.
						/// Type: Number.
						/// </summary>
						factor: 1
					},
					/// <summary>
					/// A value that provides information for the minor tick.
					/// Default: {position:"none", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMinor: {
						/// <summary>
						/// A value that indicates the type of minor tick mark.
						/// Default: "none".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'none', 'inside', 'outside' and 'cross'.
						/// </remarks>
						position: "none",
						/// <summary>
						/// A value that indicates the style of minor tick mark.
						/// Default: {fill: "black"}.
						/// Type: Object.
						/// </summary>
						style: { fill: "black" },
						/// <summary>
						/// A value that indicates an integral
						/// factor for minor tick mark length.
						/// Default: 1.
						/// Type: Number.
						/// </summary>
						factor: 1
					},
					/// <summary>
					/// A value that indicates the method of annotation.
					/// Default: "values".
					/// Type: String.
					/// </summary>
					/// <remarks>
					/// options are 'values', 'valueLabels'.
					/// </remarks>
					annoMethod: "values",
					/// <summary>
					/// A value that shows a collection of valueLabels for the y axis.
					/// Default: [].
					/// Type: Array.
					/// </summary>
					valueLabels: []
					//todo.
					//autoOrigin: true,
					//origin: null,
					//tickLabel: "nextToAxis",
				}
			},
			/// <summary>
			/// A value that is used to indicate whether to show
			/// and what to show on the open tooltip.
			/// Default: {enable:true, content:null, 
			///			contentStyle: {fill: "#d1d1d1","font-size": "16pt"},
			///			title:null, 
			///			titleStyle: {fill: "#d1d1d1","font-size": "16pt"},
			///			style: {fill: "270-#333333-#000000", "stroke-width": "2"},
			///			animated: "fade", showAnimated: "fade", hideAnimated: "fade",
			///			duration: 120, showDuration: 120, hideDuration: 120,
			///			showDelay: 150, hideDelay: 150, easing: "easeOutExpo", 
			///			showEasing: "easeOutExpo", hideEasing: "easeOutExpo",
			///			compass:"north", offsetX: 0, offsetY: 0,  
			///			showCallout: true, calloutFilled: false, 
			///			calloutFilledStyle: {fill: "#000"}}.
			/// Type: Function.
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		hint: {
			///			enable:true,
			///			content:function(){
			///				return this.data.label + " : " + 
			///					this.value/this.total*100 + "%";
			///			}});
			/// </summary>
			hint: {
				/// <summary>
				/// A value that indicates whether to show the tooltip.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				enable: true,
				/// <summary>
				/// A value that will be shown in the content part of the tooltip 
				///	or a function which is used to get a value for the tooltip shown.
				/// Default: null.
				/// Type: String or Function.
				/// </summary>
				content: null,
				/// <summary>
				/// A value that indicates the style of content text.
				/// Default: {fill: "#d1d1d1","font-size": "16pt"}.
				/// Type: Object.
				/// </summary>
				contentStyle: {
					fill: "#d1d1d1",
					"font-size": "16pt"
				},
				/// <summary>
				/// A value that will be shown in the title part of the tooltip 
				///	or a function which is used to get a value for the tooltip shown.
				/// Default: null.
				/// Type: String or Function.
				/// </summary>
				title: null,
				/// <summary>
				/// A value that indicates the style of title text.
				/// Default: {fill: "#d1d1d1","font-size": "16pt"}.
				/// Type: Object.
				/// </summary>
				titleStyle: {
					fill: "#d1d1d1",
					"font-size": "16pt"
				},
				/// <summary>
				/// A value that indicates the style of container.
				/// Default: {fill: "270-#333333-#000000", "stroke-width": "2"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "270-#333333-#000000",
					"stroke-width": "2"
				},
				/// <summary>
				/// A value that indicates the effect during show or hide 
				///	when showAnimated or hideAnimated isn't specified.
				/// Default:"fade".
				/// Type:String.
				/// </summary>
				animated: "fade",
				/// <summary>
				/// A value that indicates the effect during show.
				/// Default:"fade".
				/// Type:String.
				/// </summary>
				showAnimated: "fade",
				/// <summary>
				/// A value that indicates the effect during hide.
				/// Default:"fade".
				/// Type:String.
				/// </summary>
				hideAnimated: "fade",
				/// <summary>
				/// A value that indicates the millisecond to show or hide the tooltip
				///	when showDuration or hideDuration isn't specified.
				/// Default:120.
				/// Type:Number.
				/// </summary>
				duration: 120,
				/// <summary>
				/// A value that indicates the millisecond to show the tooltip.
				/// Default:120.
				/// Type:Number.
				/// </summary>
				showDuration: 120,
				/// <summary>
				/// A value that indicates the millisecond to hide the tooltip.
				/// Default:120.
				/// Type:Number.
				/// </summary>
				hideDuration: 120,
				/// <summary>
				/// A value that indicates the easing during show or hide when
				///	showEasing or hideEasing isn't specified. 
				/// Default: "easeOutExpo".
				/// Type: String.
				/// </summary>
				easing: "easeOutExpo", 
				/// <summary>
				/// A value that indicates the easing during show. 
				/// Default: "easeOutExpo".
				/// Type: String.
				/// </summary>
				showEasing: "easeOutExpo", 
				/// <summary>
				/// A value that indicates the easing during hide. 
				/// Default: "easeOutExpo".
				/// Type: String.
				/// </summary>
				hideEasing: "easeOutExpo",
				/// <summary>
				/// A value that indicates the millisecond delay to show the tooltip.
				/// Default: 150.
				/// Type: Number.
				/// </summary>
				showDelay: 150,
				/// <summary>
				/// A value that indicates the millisecond delay to hide the tooltip.
				/// Default: 150.
				/// Type: Number.
				/// </summary>
				hideDelay: 150,				
				/// <summary>
				/// A value that indicates the compass of the tooltip.
				/// Default: "north".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'west', 'east', 'south', 'north', 
				///	'southeast', 'southwest', 'northeast', 'northwest'.
				/// </remarks>
				compass: "north",
				/// <summary>
				/// A value that indicates the horizontal offset 
				///	of the point to show the tooltip.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offsetX: 0,
				/// <summary>
				/// A value that indicates the vertical offset 
				///	of the point to show the tooltip.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offsetY: 0,
				/// <summary>
				/// Determines whether to show the callout element.
				/// Default:true.
				/// Type:Boolean.
				/// </summary>
				showCallout: true,
				/// <summary>
				/// Determines whether to fill the callout.  
				///	If true, then the callout triangle will be filled.
				/// Default:false.
				/// Type:Boolean.
				/// </summary>
				calloutFilled: false,
				/// <summary>
				/// A value that indicates the style of the callout filled.
				/// Default: {fill: "#000"}.
				/// Type: Object.
				/// </summary>
				calloutFilledStyle: {
					fill: "#000"
				}
			},
			/// <summary>
			/// A value that indicates whether to show default chart labels.
			/// Default: true.
			/// Type: Boolean.		
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		showChartLabels:true
			///		});
			/// </summary>
			showChartLabels: true,
			/// <summary>
			/// A value that indicates style of the chart labels.
			/// Default: {}.
			/// Type: Object.
			/// </summary>
			chartLabelStyle: {},
			/// <summary>
			/// A value that indicates whether to disable the default text style.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		disableDefaultTextStyle:true
			///		});
			/// </summary>
			disableDefaultTextStyle: false,
			/// <summary>
			/// A value that indicates whether to show shadow for the chart.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		shadow:true
			///		});
			/// </summary>
			shadow: true,
			/// <summary>
			/// Occurs when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			mousedown: null,
			/// <summary>
			/// Occurs when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			mouseup: null,
			/// <summary>
			/// Occurs when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			mouseover: null,
			/// <summary>
			/// Occurs when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			mouseout: null,
			/// <summary>
			/// Occurs when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			mousemove: null,
			/// <summary>
			/// Occurs when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos. 
			///	</param>
			click: null,
			/// <summary>
			/// Occurs before the series changes.  This event can be cancelled. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains old and new series values.
			/// data.oldSeriesList: old series list before change.
			///	data.newSeriesList: new series list that will replace old one.  
			///	</param>
			beforeserieschange: null,
			/// <summary>
			/// Occurs when the series changes. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains new series values.  
			///	</param>
			serieschanged: null,
			/// <summary>
			/// Occurs before the canvas is painted.  This event can be cancelled.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			beforepaint: null,
			/// <summary>
			/// Occurs after the canvas is painted. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			painted: null
		},

		innerState: {},

		// handle option changes:
		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				ev = null;

			if (key === "seriesList") {
				if (!value) {
					value = [];
				}
				ev = $.Event("beforeserieschange");
				self._trigger("beforeserieschange", ev, {
					oldSeriesList: o.seriesList,
					newSeriesList: value
				});
				if (ev.isImmediatePropagationStopped()) {
					return false;
				}
				o.seriesList = value;
				self._trigger("serieschanged", null, value);
			}
			else {
				if ($.isPlainObject(o[key])) {
					value = $.extend(true, o[key], value);
				}
				else {
					o[key] = value;
				}
			}

			self.redraw();

			$.Widget.prototype._setOption.apply(self, arguments);
		},

		// widget creation:    
		_create: function () {
			var self = this,
				o = self.options,
				width = o.width || self.element.width(),
				height = o.height || self.element.height(),
				len = o.seriesList.length,
				idx = 0, styleLen = 0, hoverStyleLen = 0,
				newEle = null;

			self.updating = 0;
			self.innerState = {};

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
				}
				else {
					self.chartElement = self.element;
				}

				self.chartElement.addClass("ui-widget");
				self.canvas = new Raphael(self.chartElement[0], width, height);
			}

			self.headerEles = [];
			self.footerEles = [];
			self.legendEles = [];
			self.axisEles = [];
			self.legends = [];
			self.legendIcons = [];
			self.chartLabelEles = [];

			for (styleLen = o.seriesStyles.length, idx = styleLen; idx < len; idx++) {
				o.seriesStyles[idx] = o.seriesStyles[idx % styleLen];
			}

			hoverStyleLen = o.seriesHoverStyles.length;
			for (idx = hoverStyleLen; idx < len; idx++) {
				o.seriesHoverStyles[idx] = o.seriesHoverStyles[idx % hoverStyleLen];
			}
		},

		_init: function () {
			var self = this;

			if (!self.rendered) {
				self._paint();

				if (self.rendered) {
					self._bindLiveEvents();
				}
			}
		},

		destroy: function () {
			this._unbindLiveEvents();
			this._clearChartElement();
			this.chartElement.removeClass("ui-widget");
			if (this.element !== this.chartElement) {
				this.chartElement.remove();
			}

			$.Widget.prototype.destroy.apply(this, arguments);
		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */
		getCanvas: function () {
			/// <summary>
			/// Returns a reference to the Raphael canvas object.
			/// </summary>
			/// <returns type="Raphael">
			/// Reference to raphael canvas object.
			/// </returns>
			return this.canvas;
		},

		addSeriesPoint: function (seriesIndex, point, shift) {
			/// <summary>
			/// Add series point to the series list.
			/// </summary>
			/// <param name="seriesIndex" type="Number">
			/// The index of the series that the point will be inserted to.
			/// </param>
			/// <param name="point" type="Object">
			/// The point that will be inserted to.
			/// </param>
			/// <param name="shift" type="Boolean">
			/// A value that indicates whether to shift the first point.
			/// </param>
			var seriesList = this.options.seriesList,
				series = null, data = null;

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
			var self = this;
			self.updating++;
		},

		endUpdate: function () {
			var self = this;
			self.updating--;
			self.redraw();
		},

		redraw: function (drawIfNeeded) {
			/// <summary>
			/// Redraw the chart.
			/// </summary>
			/// <param name="drawIfNeeded" type="Boolean">
			/// A value that indicates whether to redraw the chart 
			///	no matter whether the chart is painted.
			/// If true, then only when the chart is not created before, 
			/// it will be redrawn.  Otherwise, the chart will be forced to redraw.  
			///	The default value is false.
			/// </param>
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

			self._unbindLiveEvents();
			self._paint();
			self._bindLiveEvents();
		},

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
		
		round: function (val, digits) {
			var factor = Math.pow(10, digits),
				tempVal = val * factor;
			tempVal = Math.round(tempVal);

			return tempVal / factor;
		},

		/** Private methods */
		_parseTable: function () {
			if (!this.element.is("table")) {
				return;
			}
			var ele = this.element,
				o = this.options,
				//header & footer
				captions = $("caption", ele),
				valuesX = [],
				theaders = $("thead th", ele),
				seriesList = [],
				sList = $("tbody tr", ele),
				val = null, th = null,
				label = null, valuesY = null,
				tds = null, td = null,
				series = null;

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
			//legend
			o.legend = $.extend({
				visible: true
			}, o.legend);

			//seriesList
			if (theaders.length) {
				theaders.each(function () {
					val = $.trim($(this).text());
					valuesX.push(val);
				});
			}
			if (sList.length) {
				sList.each(function () {
					th = $("th", $(this));
					label = $.trim(th.text());
					valuesY = [];
					tds = $("td", $(this));
					if (tds.length) {
						tds.each(function () {
							td = $(this);
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
			this.options.seriesList = seriesList;
		},

		_clearChartElement: function () {
			var self = this;

			if (self.headerEles.length) {
				$.each(self.headerEles, function (idx, headerEle) {
					headerEle.remove();
				});
				self.headerEles = [];
			}
			if (self.footerEles.length) {
				$.each(self.footerEles, function (idx, footerEle) {
					footerEle.remove();
				});
				self.footerEles = [];
			}
			if (self.legendEles.length) {
				$.each(self.legendEles, function (idx, legendEle) {
					legendEle.remove();
				});
				self.legendEles = [];
			}
			if (self.legends.length) {
				$.each(self.legends, function (idx, legend) {
					legend.remove();
				});
				self.legends = [];
			}
			if (self.legendIcons.length) {
				$.each(self.legendIcons, function (idx, legendIcon) {
					legendIcon.remove();
				});
				self.legendIcons = [];
			}
			if (self.axisEles.length) {
				$.each(self.axisEles, function (idx, axisEle) {
					axisEle.remove();
				});
				self.axisEles = [];
			}
			if (self.chartLabelEles.length) {
				$.each(self.chartLabelEles, function (idx, chartLabelEle) {
					chartLabelEle.remove();
				});
				self.chartLabelEles = [];
			}

			self.canvas.clear();
			self.innerState = {};
		},

		_text: function (x, y, text) {
			var textElement = this.canvas.text(x, y, text);

			if (this.options.disableDefaultTextStyle) {
				textElement.node.style.cssText = "";
			}

			return textElement;
		},

		_paintShadow: function (element, offset, stroke) {
			if (this.options.shadow) {
				offset = offset || 1;
				stroke = stroke || "#CCCCCC";
				var shadow = element.clone();
				shadow.insertBefore(element);
				shadow.attr({
					translation: offset + " " + offset,
					stroke: stroke,
					"stroke-width": offset
				});
				shadow.toBack();
				shadow.offset = offset;
				element.shadow = shadow;
			}
		},

		_paint: function () {
			var self = this,
				o = self.options,
				element = self.element,
				hidden = element.css("display") === "none" || 
						element.css("visibility") === "hidden",
				oldLeft = {},
				oldPosition = null,
				ev = $.Event("beforepaint");

			if (hidden) {
				oldLeft = element.css("left");
				oldPosition = element.css("position");
				element.css("left", "-10000px");
				element.css("position", "absolute");
				element.show();
			}

			if (element.is(":hidden")) {
				return;
			}

			self._clearChartElement();						
			self._trigger("beforepaint", ev);

			if (ev.isImmediatePropagationStopped()) {
				return false;
			}

			self.canvasBounds = {
				startX: 0,
				endX: o.width || element.width(),
				startY: 0,
				endY: o.height || element.height()
			};
			self._paintHeader();
			self._paintFooter();
			self._paintLegend();
			//this._paintPlotArea();
			self._paintChartArea();
			self._paintChartLabels();
			self._trigger("painted");
			
			self.rendered = true;

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
				compass = null, headerText = null, textStyle = null,
				bBox = null, point = null, box = null, headerContainer = null;

			if (header.text && header.text.length > 0 && header.visible) {
				compass = header.compass;
				headerText = self._text(0, 0, header.text);
				textStyle = $.extend(true, {}, o.textStyle, header.textStyle);

				headerText.attr(textStyle);
				bBox = headerText.wijGetBBox();
				point = self._calculatePosition(compass, bBox.width, bBox.height);

				headerText.translate(point.x, point.y);
				box = headerText.wijGetBBox();
				headerContainer = self.canvas.rect(
						box.x - headerMargin, box.y - headerMargin, 
						box.width + 2 * headerMargin, box.height + 2 * headerMargin);
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
				compass = null, footerText = null, textStyle = null,
				bBox = null, point = null, box = null, footerContainer = null;

			if (footer.text && footer.text.length > 0 && footer.visible) {
				compass = footer.compass;
				footerText = self._text(0, 0, footer.text);
				textStyle = $.extend(true, {}, o.textStyle, footer.textStyle);

				footerText.attr(textStyle);
				bBox = footerText.wijGetBBox();
				point = self._calculatePosition(compass, bBox.width, bBox.height);

				footerText.translate(point.x, point.y);
				box = footerText.wijGetBBox();
				footerContainer = self.canvas.rect(
						box.x - footerMargin, box.y - footerMargin, 
						box.width + 2 * footerMargin, box.height + 2 * footerMargin);

				footerContainer.attr(footer.style);
				footerContainer.toBack();

				self.footerEles.push(footerText);
				self.footerEles.push(footerContainer);
			}
		},

		_paintLegend: function () {
			var self = this,
				o = self.options,
				legend = {
					size: {
						width: 22,
						height: 10
					}
				},
				legendMargin = 2,
				seriesList = o.seriesList,
				seriesStyles = o.seriesStyles,
				tempSeriesList = seriesList,
				compass, orientation, legendTitle, textStyle,
				legendLen, textMargin,
				canvasBounds = self.canvasBounds,
				canvasWidth = canvasBounds.endX - canvasBounds.startX,
				canvasHeight = canvasBounds.endY - canvasBounds.startY,
				iconWidth = 0, 
				iconHeight = 0,
				titleHeight = 0, 
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
				point, left, top, legendContainer;

			$.extend(true, legend, o.legend);
			if (!legend.visible) {
				return;
			}

			compass = legend.compass;
			orientation = legend.orientation;
			iconWidth = legend.size.width;
			iconHeight = legend.size.height;

			if (legend.text && legend.text.length) {
				legendTitle = self._text(0, 0, legend.text);
				textStyle = $.extend(true, {}, o.textStyle, 
					legend.textStyle, legend.titleStyle);
				legendTitle.attr(textStyle);
				self.legendEles.push(legendTitle);
			}

			if (legend.reversed) {
				tempSeriesList = [].concat(seriesList).reverse();
			}
			
			$.each(tempSeriesList, function (idx, series) {
				series = $.extend({ legendEntry: true }, series);
						
				var seriesStyle = seriesStyles[idx],
					chartStyle = $.extend(true, {
						fill: "none",
						opacity: 1,
						stroke: "black"
					}, seriesStyle),
					text, textStyle, chtStyle, icon;

				if (series.legendEntry) {
					text = self._text(0, 0, series.label);
					textStyle = $.extend(true, {}, o.textStyle, legend.textStyle);
					text.attr(textStyle);
					self.legends.push(text);
					chtStyle = $.extend(chartStyle, { "stroke-width": 1 });
					icon = self.canvas.rect(0, 0, iconWidth, iconHeight);
					icon.attr(chtStyle);
					self.legendIcons.push(icon);
				}
			});

			legendLen = self.legends.length;
			textMargin = legend.textMargin;

			if (legendTitle) {
				titleHeight = legendTitle.wijGetBBox().height;
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
					}
					else {
						columnNum = legendLen;
					}
				}
				else if (orientation === "vertical") {
					totalHeight = maxHeight * legendLen + titleHeight + legendLen * 
						(textMargin.top + textMargin.bottom);
					if (totalHeight > canvasHeight) {
						columnNum = Math.ceil(totalHeight / canvasHeight);
					}
					else {
						columnNum = 1;
					}
				}
			}
			else if (compass === "south" || compass === "north") {
				if (orientation === "horizontal") {
					totalWidth = (maxWidth + iconWidth + legendMargin) * legendLen + 
						legendLen * (textMargin.left + textMargin.right);
					if (totalWidth > canvasWidth) {
						columnNum = Math.floor(legendLen / totalWidth * canvasWidth);
						if (columnNum < 1) {
							columnNum = 1;
						}
					}
					else {
						columnNum = legendLen;
					}
				}
				else if (orientation === "vertical") {
					totalHeight = maxHeight * legendLen + titleHeight + 
						legendLen * (textMargin.top + textMargin.bottom);
					if (totalHeight > canvasHeight / 2) {
						rowNum = Math.floor(canvasHeight - titleHeight) / 
							2 / maxHeight;
						columnNum = Math.ceil(legendLen / rowNum);
					}
					else {
						columnNum = 1;
					}
				}
			}

			width = columnNum * (maxWidth + iconWidth + legendMargin) + 
				columnNum * (textMargin.left + textMargin.right);
			height = maxHeight * Math.ceil(legendLen / columnNum) + 
				titleHeight + columnNum * (textMargin.top + textMargin.bottom);

			point = self._calculatePosition(compass, width, height);
			left = point.x - width / 2;
			top = point.y - height / 2;
			legendContainer = self.canvas.rect(left - legendMargin, top - legendMargin,
					width + 2 * legendMargin, height + 2 * legendMargin);
			legendContainer.attr(legend.style);
			legendContainer.toBack();
			self.legendEles.push(legendContainer);

			if (legendTitle) {
				legendTitle.translate(left + width / 2, top + titleHeight / 2);
			}
			
			offsetY = titleHeight;

			$.each(self.legends, function (idx, legend) {
				var bBox = legend.wijGetBBox(),
					icon = self.legendIcons[idx],
					x = left + index * (iconWidth + maxWidth + legendMargin) + 
						(index + 1) * textMargin.left + index * textMargin.right,
					y = top + offsetY + bBox.height / 2 + textMargin.top;

				icon.translate(x, y - icon.wijGetBBox().height / 2);
				legend.translate(x + iconWidth + legendMargin + bBox.width / 2, y);
				legend.toFront();

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

		_applyAxisText: function (axisOptions) {
			var	self = this, 
				text = axisOptions.text,
				textBounds = null,
				tempText = null,
				textStyle = null,
				canvasBounds = self.canvasBounds;

			if (text && text.length > 0) {
				tempText = self._text(-100, -100, text);
				textStyle = $.extend(true, {}, 
					self.options.textStyle, axisOptions.textStyle);
				tempText.attr(textStyle);
				textBounds = tempText.wijGetBBox();

				switch (axisOptions.compass) {
				case "north":
					canvasBounds.startY += textBounds.height;
					break;
				case "south":
					canvasBounds.endY -= textBounds.height;
					break;
				case "east":
					canvasBounds.endX -= textBounds.height;
					break;
				case "west":
					canvasBounds.startX += textBounds.height;
					break;
				}
				tempText.remove();
			}

			return textBounds;
		},

		_paintChartArea: function () {
			var self = this,
				o = self.options,
				axisOption = o.axis,
				//The value is used to offset the tick major
				// text from the tick rect.
				axisTextOffset = 2,
				xTextBounds = null, yTextBounds = null,
				extremeValue = null,
				maxtries = 1,
				offsetX = 0, offsetY = 0;

			self._applyMargins();
			if (!o.seriesList || o.seriesList.length === 0) {
				return;
			}

			if (self._hasAxes()) {
				//Restore from cache.
				if (self.innerState.axisInfo) {
					self.axisInfo = self.innerState.axisInfo;
					self.canvasBounds = self.innerState.canvasBounds;
				}
				else {
					xTextBounds = self._applyAxisText(axisOption.x);
					yTextBounds = self._applyAxisText(axisOption.y);

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
						y: {
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
						}
					};
					extremeValue = self._getDataExtreme();
					if (axisOption.x.autoMin && self.axisInfo.x.autoMin) {
						axisOption.x.min = extremeValue.txn;
					}
					if (axisOption.x.autoMax && self.axisInfo.x.autoMax) {
						axisOption.x.max = extremeValue.txx;
					}
					if (axisOption.y.autoMin && self.axisInfo.y.autoMin) {
						axisOption.y.min = extremeValue.tyn;
					}
					if (axisOption.y.autoMax && self.axisInfo.y.autoMax) {
						axisOption.y.max = extremeValue.tyx;
					}

					do {
						offsetY = self._autoPosition(self.axisInfo.y, axisOption.y);
						offsetX = self._autoPosition(self.axisInfo.x, axisOption.x);

						if (offsetY === self.axisInfo.y.offset && 
						offsetX === self.axisInfo.x.offset) {
							maxtries = 0;
							break;
						}
						if (offsetY !== self.axisInfo.y.offset) {
							self.axisInfo.y.offset = offsetY;
							self.axisInfo.y.vOffset = offsetX;
						}
						if (offsetX !== self.axisInfo.x.offset) {
							self.axisInfo.x.offset = offsetX;
							self.axisInfo.x.vOffset = offsetY;
						}
						maxtries--;
					} while (maxtries > 0);

					self._adjustPlotArea(axisOption.x, self.axisInfo.x);
					self._adjustPlotArea(axisOption.y, self.axisInfo.y);

					self.innerState.axisInfo = self.axisInfo;
					self.innerState.canvasBounds = self.canvasBounds;
				}
				self._paintAxes();
				self._paintPlotArea();
			}
			else {
				self._paintPlotArea();
			}
		},

		_adjustPlotArea: function (axisOptions, axisInfo) {
			var canvasBounds = this.canvasBounds;
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
		},

		_autoPosition: function (axisInfo, axisOptions) {
			//this._adjustCartesianCompass();
			//base._autoPosition();
			return this._autoPositionCartesianAxis(axisInfo, axisOptions);
		},

		_autoPositionCartesianAxis: function (axisInfo, axisOptions) {
			var extent = null,
				self = this;

			switch (axisOptions.compass) {
			case "north":
			case "south":
				self._calculateParameters(axisInfo, axisOptions);
				extent = self._getMaxExtents(axisInfo, axisOptions);
				return extent.height;
			case "east":
			case "west":
				self._calculateParameters(axisInfo, axisOptions);
				extent = self._getMaxExtents(axisInfo, axisOptions);
				return extent.width;
			}
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
				labels = axisOptions.labels;

			axisInfo.majorTickRect = self._getTickRect(axisInfo, axisOptions, 
														true, true, axisRect);
			axisInfo.minorTickRect = self._getTickRect(axisInfo, axisOptions, 
														false, true, axisRect);
			majorTickValues = self._getMajorTickValues(axisInfo, axisOptions);

			if (!formatString) {
				formatString = axisInfo.annoFormatString;
			}

			if (majorTickValues && majorTickValues.length) {
				$.each(majorTickValues, function (idx, mtv) {
					var textStyle, txt, size;

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

						mtv = axisOptions.valueLabels[index].text;
					}
					else if (axisOptions.annoMethod === "values") {
						if (formatString && formatString.length) {
							if (isTime) {
								mtv = self._fromOADate(mtv);
							}

							mtv = $.format(mtv, formatString);
						}
						else if (is100pc && axisInfo.id === "y") {
							mtv = $.format(mtv, "p0");
						}
					}

					textStyle = $.extend(true, {}, o.textStyle, 
							axisOptions.textStyle, labels.style);

					if (labels.width) {
						txt = self.canvas.wij.wrapText(-100, -100, mtv, 
								labels.width, labels.textAlign, textStyle);
					}
					else {
						txt = self._text(-100, -100, mtv).attr(textStyle);
					}
						
					size = txt.wijGetBBox();
					txt.remove();

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
			var rc = [];
			//var isTime = isTimeFormat;
			// annoMethod will always be values right now.
			//if(axisOptions.annoMethod == "valueLabels") {
			//	rc = this._getSortedDataValues(axisOptions);
			//}
			rc = this._getTickValues(axisInfo.max, axisInfo.min, 
				axisOptions.unitMajor, axisInfo.tprec, !axisInfo.isTime);
			return rc;
		},

		_getMinorTickValues: function (axisInfo, axisOptions) {
			var rc = [];
			rc = this._getTickValues(axisInfo.max, axisInfo.min, 
				axisOptions.unitMinor, axisInfo.tprec, !axisInfo.isTime);
			return rc;
		},

		_getTickValues: function (smax, smin, unit, tickprec, round) {
			var self = this,
				vals = [],
				sminOriginal = smin,
				i = 0, xs = 0, imax = 0, imin = 0, n = 0, smin2 = 0;

			try {
				if (unit === 0) {
					vals = [smax, smin];
				}
				else {
					if (tickprec + 1 < 0) {
						tickprec = -1;
					}
					else if (tickprec + 1 > 15) {
						tickprec = 14;
					}
					smin2 = self.round(self._signedCeiling(smin / unit) * unit, 
										tickprec + 1);
					if (smin2 < smax) {
						smin = smin2;
					}
					imax = parseInt(self.round(smax / unit, 5), 10);
					imin = parseInt(self.round(smin / unit, 5), 10);
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
					for (i = 0; i < n; i++) {
						if (round) {
							vals[i] = self.round(smin + i * unit, tickprec + 1);
						}
						else {
							vals[i] = smin + i * unit;
						}
					}
				}
			}
			catch (error) {
			}

			return vals;
		},

		_getTickRect: function (axisInfo, axisOptions, isMajor, inAxisRect) {
			var compass = axisOptions.compass,
				sizeFactor = 0,
				tick = null,
				majorSizeFactor = 3,
				minorSizeFactor = 2,
				thickness = 2,
				r = {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
			if (isMajor) {
				tick = axisOptions.tickMajor.position;
				sizeFactor = (majorSizeFactor * axisOptions.tickMajor.factor);
			}
			else {
				tick = axisOptions.tickMinor.position;
				sizeFactor = (minorSizeFactor * axisOptions.tickMinor.factor);
			}
			if (tick === "none" || (tick === "inside" && inAxisRect)) {
				sizeFactor = 0;
			}
			//if(isVertical) {
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
					//r.x = axisRect.x;
					//if(inAxisRect) {
					//	r.x += axisRect.width;
					//}
					//else {
					//	r.width += axisRect.width;
					//}
					r.width += 2; //default value of axisRect is 2.
				}
				else {
					//r.x = axisRect.x - sizeFactor * thickness;
					if (!inAxisRect) {
						if (tick === "corss") {
							r.width <<= 1;
						}
						//r.width += axisRect.width;
						r.width += 2;
					}
				}
			}
			else {
				r = {
					x: -1,
					y: 0,
					width: thickness,
					height: sizeFactor * thickness
				};
				if ((compass === "south" && (tick === "outside" || 
					(tick === "corss" && inAxisRect))) ||
					(compass === "north" && tick === "inside")) {
					//r.y = axisRect.y;
					//if(inAxisRect) {
					//	r.y += axisRect.height;
					//}
					//else {
					//	r.height += axisRect.height;
					//}
					r.height += 2;
				}
				else {
					//r.y = axisRect.y - sizeFactor * thickness;
					if (!inAxisRect) {
						if (tick === "cross") {
							r.height <<= 1;
						}
						//r.height += axisRect.height;
						r.height += 2;
					}
				}
			}
			return r;
		},

		_applyMargins: function () {
			var o = this.options,
				canvasBounds = this.canvasBounds;

			canvasBounds.startX += o.marginLeft;
			canvasBounds.endX -= o.marginRight;
			canvasBounds.startY += o.marginTop;
			canvasBounds.endY -= o.marginBottom;
		},

		_paintAxes: function () {
			//paint x axis
			this._paintAxis(this.options.axis.x, this.axisInfo.x);
			//paint y axis
			this._paintAxis(this.options.axis.y, this.axisInfo.y);
		},

		_paintAxis: function (axisOptions, axisInfo) {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds,
				startPoint = {
					x: 0,
					y: 0,
					ox: 0,
					oy: 0
				},
				endPoint = {
					x: 0,
					y: 0,
					ox: 0,
					oy: 0
				},
				compass = axisOptions.compass,
				thickness = 2,
				isVertical = true,
				ax = null,
				//paint tick & ticklabel
				majorTickValues = [],
				tempMinorTickValues = [],
				minorTickValues = [],
				max = axisInfo.max,
				min = axisInfo.min,
				unitMajor = axisOptions.unitMajor,
				unitMinor = axisOptions.unitMinor,
				tickMajor = axisOptions.tickMajor.position,
				tickMinor = axisOptions.tickMinor.position,
				axisSize = axisInfo.offset,
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
				formatString = axisOptions.annoFormatString || 
								axisInfo.annoFormatString,
				textStyle = null;

			majorTickValues = self._getMajorTickValues(axisInfo, axisOptions);
			
			if (tickMinor !== "none") {
				tempMinorTickValues = self._getMinorTickValues(axisInfo, axisOptions);
				minorTickValues = self._resetMinorTickValues(tempMinorTickValues, 
						majorTickValues);
			}

			switch (compass) {
			case "south":
				startPoint.x = canvasBounds.startX;
				startPoint.ox = canvasBounds.startX;
				startPoint.y = canvasBounds.endY;
				startPoint.oy = canvasBounds.startY;
				endPoint.x = canvasBounds.endX;
				endPoint.ox = canvasBounds.endX;
				endPoint.y = canvasBounds.endY;
				endPoint.oy = canvasBounds.startY;
				isVertical = false;
				break;
			case "north":
				startPoint.x = canvasBounds.startX;
				startPoint.ox = canvasBounds.startX;
				startPoint.y = canvasBounds.startY - thickness;
				startPoint.oy = canvasBounds.endY - thickness;
				endPoint.x = canvasBounds.endX;
				endPoint.ox = canvasBounds.endX;
				endPoint.y = canvasBounds.startY - thickness;
				endPoint.oy = canvasBounds.endY - thickness;
				isVertical = false;
				break;
			case "east":
				startPoint.x = canvasBounds.endX;
				startPoint.ox = canvasBounds.startX;
				startPoint.y = canvasBounds.endY;
				startPoint.oy = canvasBounds.endY;
				endPoint.x = canvasBounds.endX;
				endPoint.ox = canvasBounds.startX;
				endPoint.y = canvasBounds.startY;
				endPoint.oy = canvasBounds.startY;
				break;
			case "west":
				startPoint.x = canvasBounds.startX - thickness;
				startPoint.ox = canvasBounds.endX;
				startPoint.y = canvasBounds.endY;
				startPoint.oy = canvasBounds.endY;
				endPoint.x = canvasBounds.startX - thickness;
				endPoint.ox = canvasBounds.endX;
				endPoint.y = canvasBounds.startY;
				endPoint.oy = canvasBounds.startY;
				break;
			}

			if (axisOptions.visible) {
				ax = self.canvas.wij
					.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
					.attr(axisOptions.style);

				self.axisEles.push(ax);
			}

			$.each(majorTickValues, function (idx, val) {
				var text = val,
					isTime = axisInfo.isTime,
					is100Percent = o.is100Percent,
					textInfo;

				if (val < min || val > max) {
					return true;
				}

				if (axisOptions.annoMethod === "valueLabels") {
					if (val < 0) {
						return true;
					}

					if (index >= axisOptions.valueLabels.length) {
						return false;
					}

					text = axisOptions.valueLabels[index].text;
				}
				else if (axisOptions.annoMethod === "values") {
					if (formatString && formatString.length) {
						if (isTime) {
							text = self._fromOADate(val);
						}
						text = $.format(text, formatString);
					}
					else if (is100Percent && axisInfo.id === "y") {
						text = $.format(val, "p0");
					}
				}
				/*//TODO: mixed
				else {
				}*/

				textStyle = $.extend(true, {}, o.textStyle, 
						axisOptions.textStyle, labels.style);

				textInfo = self._paintMajorMinor(max, min, val, tickMajor, 
						unitMajor, tickRectMajor,  compass, startPoint, 
						endPoint, axisSize, axisTextOffset, tickMajorStyle, 
						text, gridMajor, axisOptions.textVisible, textStyle, 
						labels.textAlign, labels.width ? axisInfo.labelWidth : null);

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
					var textElement = textInfo.text,
						offset = (textInfo.len - maxLen) / 2;
					offset = labels.textAlign === "near" ? offset * -1 : offset;

					if (isVertical) {
						textElement.translate(offset, 0);
					}
					else {
						textElement.translate(0, offset);
					}
				});
			}

			$.each(minorTickValues, function (idx, val) {
				if (val > min && val < max) {
					self._paintMajorMinor(max, min, val, tickMinor, 
						unitMinor, tickRectMinor, compass, startPoint, 
						endPoint, axisSize, axisTextOffset, tickMinorStyle, 
						null, gridMinor, axisOptions.textVisible, textStyle, 
						labels.textAlign, labels.width ? axisInfo.labelWidth : null);
				}
			});

			self._paintAxisText(axisOptions, axisInfo);
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
				textStyle = null, textElement = null;

			if (tick === "cross") {
				tickLength = tickLength / 2;
			}
			else if (tick === "inside") {
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
						tickLength + textBounds.height / 2);
				}
				else {
					x = endX + axisInfo.offset + axisTextOffset + 
						tickLength + textBounds.height / 2;
				}
			}
			else {
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
						tickLength + textBounds.height / 2);
				}
				else {
					y = endY + axisInfo.offset + axisTextOffset + 
						tickLength + textBounds.height / 2;
				}
			}

			textElement = self._text(x, y, text);
			self.axisEles.push(textElement);
			textStyle = $.extend(true, {}, 
				self.options.textStyle, axisOptions.textStyle);
			textElement.attr(textStyle);

			if (isVertical) {
				textElement.rotate(-90);
			}
		},

		_resetMinorTickValues: function (minorTickValues, majorTickValues) {
			var i = 0, j = 0,
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
						text, grid, textVisible, textStyle, textAlign, labelWidth) {
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
				style = {"stroke-width": 2},
				txt = null, textBounds = null;
				
			switch (compass) {
			case "south":
				if (tick === "inside") {
					y -= tickRect.height;
				}
				else if (tick === "cross") {
					y -= tickRect.height / 2;
				}

				if (labelWidth) {
					tickY = y + axisTextOffset + tickRect.height;
				}
				else {
					tickY = y + axisTextOffset + tickRect.height + axisSize / 2;
				}
								
				isVertical = false;
				break;
			case "west":
				if (tick === "outside") {
					x -= tickRect.width;
				}
				else if (tick === "cross") {
					x -= tickRect.width / 2;
				}

				if (labelWidth) {
					tickX = x - (axisTextOffset + axisSize);
				}
				else {
					tickX = x - (axisTextOffset + axisSize / 2);
				}
				break;
			case "north":
				if (tick === "outside") {
					y -= tickRect.height;
				}
				else if (tick === "cross") {
					y -= tickRect.height / 2;
				}

				if (labelWidth) {
					tickY = y - (axisTextOffset + axisSize);
				}
				else {
					tickY = y - (axisTextOffset + axisSize / 2);
				}
				isVertical = false;
				break;
			case "east":
				if (tick === "inside") {
					x -= tickRect.width;
				}
				else if (tick === "cross") {
					x -= tickRect.width / 2;
				}
				
				if (labelWidth)	{
					tickX = x + axisTextOffset + tickRect.width;
				}
				else {
					tickX = x + axisTextOffset + tickRect.width + axisSize / 2;
				}
				break;
			}

			if (isVertical) {
				y += (val - min) / (max - min) * (endPoint.y - startPoint.y);
				if (grid.visible) {
					if ((y !== bs.startY && compass === "east") || 
						(y !== bs.endY && compass === "west")) {
						arrPath = ["M", bs.startX, y, "H", bs.endX];
						p = self.canvas.path(arrPath.concat(" "));
						p.attr(grid.style);
						self.axisEles.push(p);
					}
				}

				tickY = y;

				if (tick !== "none") {
					pathArr = ["M", x, y, "h", tickRect.width];
					tickStyle["stroke-width"] = tickRect.height;
				}
			}
			else {
				x += (val - min) / (max - min) * (endPoint.x - startPoint.x);
				if (grid.visible) {
					if ((x !== bs.startX && compass === "south") || 
						(x !== bs.endX && compass === "north")) {
						arrPath = ["M", x, bs.startY, "V", bs.endY];
						p = self.canvas.path(arrPath.concat(" "));
						p.attr(grid.style);
						self.axisEles.push(p);
					}
				}

				if (labelWidth) {
					tickX = x - labelWidth / 2;
				}
				else {
					tickX = x;
				}
				
				if (tick !== "none") {
					pathArr = ["M", x, y, "v", tickRect.height];
					tickStyle["stroke-width"] = tickRect.width;
				}
			}

			if (tick !== "none") {
				tickElement = self.canvas.path(pathArr.concat(" "));
				style = $.extend(style, tickStyle);
				tickElement.attr(style);
				self.axisEles.push(tickElement);
			}

			if (text) {
				if (labelWidth) {
					txt = self.canvas.wij.wrapText(tickX, 
						tickY, text.toString(), labelWidth, textAlign, textStyle);
				
					if (isVertical) {
						txt.translate(0, -txt.getBBox().height / 2);
					}
				}
				else {
					txt = self._text(tickX, tickY, text.toString());
					txt.attr(textStyle);
				}

				self.axisEles.push(txt);
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

			return textInfo;
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
				transX = 0, transY = 0,
				position = null,
				p = null;

			self.chartLabelEles.push(text);

			position = self._getCompassTextPosition(compass, 
							text.wijGetBBox(), offset, point, angle);

			if (offset && chartLabel.connected) {
				p = self.canvas.path("M" + point.x + " " + point.y + "L" + 
							position.endPoint.x + " " + position.endPoint.y);
				p.attr(calloutStyle);
				self.chartLabelEles.push(p);
			}

			transX = position.endPoint.x + position.offsetX;
			transY = position.endPoint.y + position.offsetY;

			text.translate(transX, transY)
				.toFront();
		},

		_getCompassTextPosition: function (compass, box, offset, point, angle) {
			var offsetX = 0, offsetY = 0,
				endPoint = { x: 0, y: 0 };

			switch (compass) {
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
			}
			else if (angle >= 45 / 2 && angle < 135 / 2) {
				offsetX = box.width / 2;
				offsetY = -1 * box.height / 2;
			}
			else if (angle >= 135 / 2 && angle < 225 / 2) {
				offsetY = -1 * box.height / 2;
			}
			else if (angle >= 225 / 2 && angle < 315 / 2) {
				offsetX = -1 * box.width / 2;
				offsetY = -1 * box.height / 2;
			}
			else if (angle >= 315 / 2 && angle < 405 / 2) {
				offsetX = -1 * box.width / 2;
			}
			else if (angle >= 405 / 2 && angle < 495 / 2) {
				offsetX = -1 * box.width / 2;
				offsetY = box.height / 2;
			}
			else if (angle >= 495 / 2 && angle < 585 / 2) {
				offsetY = box.height / 2;
			}
			else {
				offsetX = box.width / 2;
				offsetY = box.height / 2;
			}

			endPoint = this.canvas.wij
				.getPositionByAngle(point.x, point.y, offset, angle);

			return {
				endPoint: endPoint,
				offsetX: offsetX,
				offsetY: offsetY
			};
		},

		_getXSortedPoints: function (series) {
			var seriesX = series.data.x,
				tempX = [].concat(seriesX),
				tempY = [].concat(series.data.y),
				points = [],
				sortedX = seriesX;

			if (seriesX.length === 0) {
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

		_bindLiveEvents: function () {
		},

		_unbindLiveEvents: function () {
		},

		_isBarChart: function () {
			return this.widgetName === "wijbarchart";
		},

		//methods for Axis
		_calculateParameters: function (axisInfo, axisOptions) {
			var self = this,
				maxData = axisOptions.max,
				minData = axisOptions.min,
				autoMax = axisOptions.autoMax && axisInfo.autoMax,
				autoMin = axisOptions.autoMin && axisInfo.autoMin,
				autoMajor = axisOptions.autoMajor && axisInfo.autoMajor,
				autoMinor = axisOptions.autoMinor && axisInfo.autoMinor,
				axisAnno = null, prec = null,
				isVL = axisOptions.annoMethod === "valueLabels",
				major = 0,
				newmax = 0, newmin = 0,
				dx = 0, tinc = 0,
				isTime = axisInfo.isTime;

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
					}
					else {
						maxData = newmax;
					}
				}
				else {
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
					}
					else {
						minData = newmin;
					}
				}
				else {
					newmin = self._precFloor(-prec, minData);
					if (typeof (newmin) === "number") {
						minData = newmin;
					}
				}
			}

			axisInfo.max = maxData;
			axisInfo.min = minData;
			axisInfo.axisAnno = axisAnno;
			axisInfo.tinc = tinc;

			if (autoMajor || autoMinor) {
				dx = maxData - minData;
				self._calculateMajorMinor(axisOptions, axisInfo);
				//this._calculateMajorMinor(isTime, axisAnno, tinc);
				//var minor = axisOptions.unitMinor;
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

						minData -= Math.abs(dx);// should always be less.
						minData = self._precFloor(-prec, minData);
					}
				}
			}

			/*//TODO:
			if (!autoMajor || !autoMinor) {				
			}*/

			axisInfo.max = maxData;
			axisInfo.min = minData;
		},

		_roundTime: function (timevalue, unit, roundup) {
			var self = this,
				tunit = unit * self._tmInc.day,
				tv = self._fromOADate(timevalue),
				th, td, tx, tz;

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

				//th.month = 1;
				th.month = 0; // the month start from 0 in javascript.
				tunit /= self._tmInc.year;
				th.year = self._tround(th.year, tunit, roundup);
				return self._getTimeAsDouble(th);
			}
			else {
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
			var smon = 0, sday = 0,
				newDate = null;
			if (th.day < 1) {
				sday = -1 - th.day;
				th.day = 1;
			}
			else if (th.day > 28) {
				sday = th.day - 28;
				th.day = 28;
			}

			/*
			if (th.month < 1) {
			smon = -1 - th.day;
			th.month = 1;
			}
			else if (th.month > 12) {
			smon = th.month - 12;
			th.month = 12;
			}
			*/
			//the month start from 0 & end with 11 in javascript.
			if (th.month < 0) {
				smon = -1 - th.day;
				th.month = 0;
			}
			else if (th.month > 11) {
				smon = th.month - 11;
				th.month = 11;
			}
			newDate = new Date(th.year, th.month, th.day, 
				th.hour, th.minute, th.second);
			newDate.setDate(newDate.getDate() + sday);
			newDate.setMonth(newDate.getMonth() + smon);
			return this._toOADate(newDate);
		},

		_getTimeDefaultFormat: function (max, min) {
			var self = this,
				range = (max - min) * self._tmInc.day,
				format = "s";
			if (range > 2 * self._tmInc.year) {
				format = "yyyy";
			}
			else if (range > self._tmInc.year) {
				format = "MMM yy";
			}
			else if (range > 3 * self._tmInc.month) {
				format = "MMM";
			}
			else if (range > 2 * self._tmInc.week) {
				format = "MMM d";
			}
			else if (range > 2 * self._tmInc.day) {
				format = "ddd d";
			}
			else if (range > self._tmInc.day) {
				format = "ddd H:mm";
			}
			else if (range > self._tmInc.hour) {
				format = "H:mm";
			}
			else if (range >= 1000) {
				format = "H:mm:ss";
			}
			/*else if (range > 0) {
				//TODO: return millisecond
			}*/
			return format;
		},

		_niceTimeUnit: function (timeinc, manualFormat) {
			var self = this,
				tsRange = timeinc * self._tmInc.day;

			tsRange = self._niceTimeSpan(tsRange, manualFormat);

			return tsRange / self._tmInc.day;
		},

		_niceTimeSpan: function (range, manualFormat) {
			var self = this,
				minSpan = self._manualTimeInc(manualFormat),
				tsinc = 0, tinc = 0;
			/*if (minSpan < this._tmInc.second) {
				//TODO: calculate when millisecond
			}*/
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
			var i = 0, tikm = 0, ii = tik.length;

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
				}
				else {
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
			var minSpan = this._tmInc.second;
			if (!manualFormat || manualFormat.length === 0) {
				return minSpan;
			}
			//var f = manualFormat.indexOf("f");
			//if (f > 0) {
			//	//TODO: when _getTimeDefaultFormat return millisecond
			//}
			//else if (manualFormat.indexOf("s") >= 0) {
			if (manualFormat.indexOf("s") >= 0) {
				minSpan = this._tmInc.second;
			}
			else if (manualFormat.indexOf("m") >= 0) {
				minSpan = this._tmInc.minute;
			}
			else if (manualFormat.indexOf("h") >= 0 || manualFormat.indexOf("H") >= 0) {
				minSpan = this._tmInc.hour;
			}
			else if (manualFormat.indexOf("d") >= 0) {
				minSpan = this._tmInc.day;
			}
			else if (manualFormat.indexOf("M") >= 0) {
				minSpan = this._tmInc.month;
			}
			else if (manualFormat.indexOf("y") >= 0) {
				minSpan = this._tmInc.year;
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
			maxtime: 2147483647	//int.max
		},

		_niceTickNumber: function (x) {
			if (x === 0 || x === 0.0) {
				return x;
			}
			else if (x < 0) {
				x = -x;
			}
			var log10 = Math.log(x) / Math.log(10),
				exp = parseInt(this._signedFloor(log10), 10),
				f = x / Math.pow(10.0, exp),
				nf = 10.0;
			if (f <= 1.0) {
				nf = 1.0;
			}
			else if (f <= 2.0) {
				nf = 2.0;
			}
			else if (f <= 5.0) {
				nf = 5.0;
			}
			return (nf * Math.pow(10.0, exp));
		},

		_niceNumber: function (x, exp, round) {
			if (x === 0 || x === 0.0) {
				return x;
			}
			else if (x < 0) {
				x = -x;
			}

			var f = x / Math.pow(10.0, exp),
				nf = 10.0;

			if (round) {
				if (f < 1.5) {
					nf = 1.0;
				}
				else if (f < 3.0) {
					nf = 2.0;
				}
				else if (f < 7.0) {
					nf = 5.0;
				}
			}
			else {
				if (f <= 1.0) {
					nf = 1.0;
				}
				else if (f <= 2.0) {
					nf = 2.0;
				}
				else if (f <= 5.0) {
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

		_getDataExtreme: function () {
			var val = {
				txx: 0,
				txn: 0,
				tyx: 0,
				tyn: 0
			};

			this._getDataExtremes(val);
			
			if (val.txn > val.txx) {
				val.txn = 0;
				val.txx = 1;
			}
			//this.extremeValue = val;
			return val;
		},

		_getDataExtremes: function (val) {
			var self = this,
				o = self.options,
				seriesList = o.seriesList,
				stacked = o.stacked,
				is100Percent = o.is100Percent,
				axis = o.axis,
				axisInfo = self.axisInfo,
				valuesX = [],
				valuesY = [],
				valueLabels = [];

			if (!seriesList || seriesList.length === 0) {
				return val;
			}
			
			$.each(seriesList, function (idx, series) {
				var data = series.data,
					index = 0,
					k = 0,
					valuesXY = [].concat(data.xy),
					len = valuesXY.length,
					xMinMax, yMinMax;

				valuesX = [].concat(data.x);
				valuesY = [].concat(data.y);
				
				if (data.xy) {
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
				}
				else if (!data.x) {
					valuesX = [];
					
					$.each(valuesY, function (i) {
						valuesX.push(i);
					});
					
					data.x = valuesX;
				}

				if (stacked && idx > 0) {
					$.each(valuesY, function (j) {
						if (j === 0) {
							return true;
						}

						valuesY[j] += valuesY[j - 1];
					});
				}

				xMinMax = self._getMinMaxValue(valuesX);
				yMinMax = self._getMinMaxValue(valuesY);
				
				if (idx === 0) {
					val.txx = xMinMax.max;
					val.txn = xMinMax.min;
					val.tyx = yMinMax.max;
					val.tyn = yMinMax.min;
				}
				else {
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
			});

			if (is100Percent) {
				val.tyx = 1;
				val.tyn = 0;
			}

			if (valuesX.length) {
				if (self._isDate(valuesX[0])) {
					axisInfo.x.isTime = true;
				}
				else if (typeof (valuesX[0]) !== "number") {
					$.each(valuesX, function (idx, valueX) {
						valueLabels.push({
							text: valueX,
							value: idx
						});
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

			if (valuesY.length) {
				if (typeof (valuesY[0]) !== "number") {
					$.each(valuesY, function (idx, valueY) {
						valueLabels.push({
							text: valueY,
							value: idx
						});
					});

					axis.y.annoMethod = "valueLabels";
					axis.y.valueLabels = valueLabels;
					axis.x.max = valuesY.length - 1;
					axis.x.min = 0;
					axis.y.unitMajor = 1;
					axis.x.unitMinor = 0.5;
					axisInfo.y.autoMax = false;
					axisInfo.y.autoMin = false;
					axisInfo.y.autoMajor = false;
					axisInfo.y.autoMinor = false;
				}
				/*else if (this._isDate(valuesY[0])) {
					//this.axisInfo.y.isTime = true;
				}*/
			}
			return val;
		},

		_isDate: function (obj) {
			return (typeof obj === 'object') && obj.constructor === Date;
		},

		_getMinMaxValue: function (array) {
			var self = this,
				val = {
					min: 0,
					max: 0
				},
				i = 0;

			if (!array.length) {
				return;
			}

			if (typeof (array[0]) !== "number") {
				if (self._isDate(array[0])) {
					val.min = array[0];
					val.max = array[0];
				}
				else {
					val.min = 0;
					val.max = array.length - 1;
					return val;
				}
			}
			else {
				val.min = array[0];
				val.max = array[0];
			}

			for (i = 0; i < array.length; i++) {
				if (array[i] < val.min) {
					val.min = array[i];
				}
				else if (array[i] > val.max) {
					val.max = array[i];
				}
			}

			if (self._isDate(val.min)) {
				val.min = self._toOADate(val.min);
				val.max = self._toOADate(val.max);
			}

			return val;
		},

		_toOADate: function (time) {
			var oaDate = (time - new Date(1900, 0, 1)) / this._tmInc.day + 2;

			return oaDate;
		},

		_fromOADate: function (oaDate) {
			var time = new Date((oaDate - 2) * this._tmInc.day + 
				new Date(1900, 0, 1).getTime());

			return time;
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
				maxText = null, minText = null,
				sizeMax = null, sizeMin = null,
				mx = null, mn = null, prec = null,
				_prec = null, textStyle = null,
				dx = maxData - minData,
				width = 0, height = 0,
				nticks = 0, major = 0;

			if (autoMajor || autoMinor) {
				textStyle = $.extend(true, {}, o.textStyle, 
					axisOptions.textStyle, axisOptions.labels.style);

				if (isTime) {
					maxText = $.format(self._fromOADate(maxData), formatString);
					minText = $.format(self._fromOADate(minData), formatString);

					mx = self._text(-100, -100, maxText).attr(textStyle);
					mn = self._text(-100, -100, minText).attr(textStyle);

					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();

					mx.remove();
					mn.remove();
				}
				else {
					prec = self._nicePrecision(dx);
					_prec = prec + 1;

					if (_prec < 0 || _prec > 15) {
						_prec = 0;
					}

					mx = self._text(-100, -100, 
						self.round(maxData, _prec)).attr(textStyle);
					mn = self._text(-100, -100, 
						self.round(minData, _prec)).attr(textStyle);

					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();

					mx.remove();
					mn.remove();
				}

				if (sizeMax.width < sizeMin.width) {
					sizeMax.width = sizeMin.width;
				}

				if (sizeMax.height < sizeMin.height) {
					sizeMax.height = sizeMin.height;
				}

				if (!self._isVertical(axisOptions.compass)) {
					//Add comments by RyanWu@20100907.
					//Subtract axisTextOffset because we must left
					// the space between major text and major rect.
					width = canvasBounds.endX - canvasBounds.startX - 
						axisInfo.vOffset - axisInfo.axisTextOffset;
					major = width / sizeMax.width;

					if (Number.POSITIVE_INFINITY === major) {
						nticks = 0;
					}
					else {
						nticks = parseInt(major, 10);
					}
				}
				else {
					height = canvasBounds.endY - canvasBounds.startY - 
						axisInfo.vOffset - axisInfo.axisTextOffset;
					major = height / sizeMax.height;

					if (Number.POSITIVE_INFINITY === major) {
						nticks = 0;
					}
					else {
						nticks = parseInt(major, 10);
					}
				}

				major = dx;
				if (nticks > 0) {
					dx /= nticks;
					if (isTime) {
						if (dx < tinc) {
							major = tinc;
						}
						else {
							major = self._niceTimeUnit(dx, axisInfo.annoFormatString);
						}
					}
					else {
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

				if (autoMinor) {
					axisOptions.unitMinor = axisOptions.unitMajor / 2;
				}
			}
		},

		_getScaling: function (isVertical, max, min, length) {
			var dx = max - min;

			if (dx === 0) {
				dx = 1;
			}

			if (isVertical) {
				dx = -dx;
			}

			return length / dx;
		},

		_getTranslation: function (isVertical, location, max, min, scaling) {
			var translation = 0;

			if (isVertical) {
				translation = location.y;
				translation -= scaling * max;
			}
			else {
				translation = location.x;
				translation -= scaling * min;
			}

			return translation;
		},
		//end of methods for Axis	

		//methods for jQuery extention

		_addClass: function (ele, classNames) {
			//var self = this;
			classNames = classNames || '';
			$.each(ele, function () {
				if (isSVGElem(this)) {
					var node = this;
					$.each(classNames.split(/\s+/), function (i, className) {
						var classes = (node.className ? 
							node.className.baseVal : node.getAttribute('class'));
						if ($.inArray(className, classes.split(/\s+/)) === -1) {
							classes += (classes ? ' ' : '') + className;
							
							if (node.className) {
								node.className.baseVal = classes;
							}
							else {
								node.setAttribute('class', classes);
							}
						}
					});
				}
				else {
					$(this).addClass(classNames);
				}
			});
		} /*,
	
	_removeClass: function(ele, classNames) {
		var self = this;
		classNames = classNames || '';
		$.each(ele, function() {
			if (isSVGElem(this)) {
				var node = this;
				$.each(classNames.split(/\s+/), function(i, className) {
					var classes = (node.className ? 
						node.className.baseVal : node.getAttribute('class'));
					classes = $.grep(classes.split(/\s+/), 
						function(n, i) { return n != className; }).
						join(' ');
					(node.className ? node.className.baseVal = classes :
						node.setAttribute('class', classes));
				});
			}
			else {
				$(this).removeClass(classNames);
			}
		});
	},

	_hasClass: function(ele, className) {
		var self = this;
		className = className || '';
		var found = false;
		$.each(ele, function() {
			if(isSVGElem(this)) {
				var classes = (this.className ? this.className.baseVal :
					this.getAttribute('class')).split(/\s+/);
				found = ($.inArray(className, classes) > -1);
			}
			else {
				found = $(this).hasClass(className);
			}
			return !found;
		});
		return found;
	}
	*/

		//end of methods
	});
}(jQuery));
