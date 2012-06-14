/*globals $, Raphael, jQuery, document, window, Globalize*/
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
*/

(function () {
	"use strict";
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
	if (!window.Raphael) {
		return;
	}

	$.extend({
		round: function (val, digits) {
			/// Errors occur when using Math.round and toFixed() 
			/// because JavaScript's method of storing numbers is not perfect. 
			/// JavaScript uses a floating-point number format which cannot 
			/// store certain numbers "exactly". 
			/// In other words, some numbers are approximations.
			/// So if need accuracy, a workaround is required for rounding numbers.
			if (!val) {
				return 0;
			}
			//var value = Globalize.format(val, "N" + digits);
			//return Globalize.parseFloat(value);
			return Globalize.parseFloat(val.toFixed(digits), 10, Globalize.culture("en"));
		},
		toOADate: function (time) {
			var day = 24 * 60 * 60 * 1000,
				oaDate = time - new Date(1900, 0, 1) + 2 * day;

			return oaDate;
		},

		fromOADate: function (oaDate) {
			var day = 24 * 60 * 60 * 1000,
				time = new Date(oaDate - 2 * day +
					new Date(1900, 0, 1).getTime());

			return time;
		},
		arrayClone: function (arr) {
			var result = [];
			$.each(arr, function (i, n) {
				result.push($.extend(true, {}, n));
			});
			return result;
		}
	});

	$.wijraphael = {

		isSVGElem: function (node) {
			var svgNS = "http://www.w3.org/2000/svg";
			return (node.nodeType === 1 && node.namespaceURI === svgNS);
		},

		//methods for jQuery extention
		addClass: function (ele, classNames) {
			classNames = classNames || '';

			$.each(ele, function () {
				if ($.wijraphael.isSVGElem(this)) {
					var node = this;
					$.each(classNames.split(/\s+/), function (i, className) {
						var classes = (node.className ?
							node.className.baseVal : node.getAttribute('class'));
						if ($.inArray(className, classes.split(/\s+/)) === -1) {
							classes += (classes ? ' ' : '') + className;

							if (node.className) {
								node.className.baseVal = classes;
							} else {
								node.setAttribute('class', classes);
							}
						}
					});
				} else {
					$(this).addClass(classNames);
				}
			});
		},

		clearRaphaelCache: function () {
			Raphael.path2curve.cache = null;
			Raphael.path2curve.count = null;
			Raphael.parseTransformString.cache = null;
			Raphael.parseTransformString.count = null;
			Raphael.parsePathString.cache = null;
			Raphael.parsePathString.count = null;
			Raphael._pathToAbsolute.cache = null;
			Raphael._pathToAbsolute.count = null;
		},

		getPositionByAngle: function (cx, cy, r, angle) {
			var point = {},
				rad = Raphael.rad(angle);

			point.x = cx + r * Math.cos(-1 * rad);
			point.y = cy + r * Math.sin(-1 * rad);

			return point;
		},

		hasClass: function (ele, className) {
			if (!className || className.length === 0) {
				return false;
			}
			if ($.wijraphael.isSVGElem(ele)) {
				var cName = ele.className ?
						ele.className.baseVal : ele.getAttribute('class'),
					hasClass = false;

				$.each(cName.split(/\s+/), function (i, c) {
					if (c === className) {
						hasClass = true;
						return false;
					}
				});
				return hasClass;
				//return !!cName.match(new RegExp(className));
			} else {
				return $(ele).hasClass(className);
			}
		},
		sector: function (cx, cy, r, startAngle, endAngle) {
			var start = $.wijraphael.getPositionByAngle(cx, cy, r, startAngle),
				end = $.wijraphael.getPositionByAngle(cx, cy, r, endAngle);

			return ["M", cx, cy, "L", start.x, start.y, "A", r, r, 0,
					+(endAngle - startAngle > 180), 0, end.x, end.y, "z"];
		}
	};

	$.expr.filter.CLASS = function (elem, match) {
		var className = (!$.wijraphael.isSVGElem(elem) ? elem.className :
			(elem.className ? elem.className.baseVal : elem.getAttribute('class')));
		return (' ' + className + ' ').indexOf(match) > -1;
	};

	$.expr.preFilter.CLASS = function (match, curLoop, inplace, result, not, isXML) {
		var i = 0,
			elem = null,
			className = null;
		match = ' ' + match[1].replace(/\\/g, '') + ' ';
		if (isXML) {
			return match;
		}
		for (i = 0, elem = {}; elem; i++) {
			elem = curLoop[i];
			if (!elem) {
				try {
					elem = curLoop.item(i);
				} catch (e) { }
			}
			if (elem) {
				className = (!$.wijraphael.isSVGElem(elem) ? elem.className :
					(elem.className ? elem.className.baseVal : '') ||
					elem.getAttribute('class'));
				if (not ^ (className && (' ' + className + ' ').indexOf(match) > -1)) {
					if (!inplace) {
						result.push(elem);
					}
				} else if (inplace) {
					curLoop[i] = false;
				}
			}
		}
		return false;
	};

	Raphael.fn.tri = function (x, y, length) {
		var x1 = x,
			y1 = y - length,
			offsetX = Math.cos(30 * Math.PI / 180) * length,
			offsetY = Math.tan(60 * Math.PI / 180) * offsetX,
			x2 = x + offsetX,
			y2 = y + offsetY,
			x3 = x - offsetX,
			y3 = y + offsetY,
			arrPath = ["M", x1, y1, "L", x2, y2, "L", x3, y3, "z"];
		return this.path(arrPath.concat(" "));
	};

	Raphael.fn.invertedTri = function (x, y, length) {
		var x1 = x,
			y1 = y + length,
			offsetX = Math.cos(30 * Math.PI / 180) * length,
			offsetY = Math.tan(60 * Math.PI / 180) * offsetX,
			x2 = x + offsetX,
			y2 = y - offsetY,
			x3 = x - offsetX,
			y3 = y - offsetY,
			arrPath = ["M", x1, y1, "L", x2, y2, "L", x3, y3, "z"];
		return this.path(arrPath.concat(" "));
	};

	Raphael.fn.box = function (x, y, length) {
		var offset = Math.cos(45 * Math.PI / 180) * length,
			arrPath = ["M", x - offset, y - offset, "L", x + offset, y - offset,
				"L", x + offset, y + offset, "L", x - offset, y + offset, "z"];
		return this.path(arrPath.concat(" "));
	};

	Raphael.fn.diamond = function (x, y, length) {
		var arrPath = ["M", x, y - length, "L", x + length, y, "L", x, y + length,
			"L", x - length, y, "z"];
		return this.path(arrPath.concat(" "));
	};

	Raphael.fn.cross = function (x, y, length) {
		var offset = Math.cos(45 * Math.PI / 180) * length,
			arrPath = ["M", x - offset, y - offset, "L", x + offset, y + offset,
				"M", x - offset, y + offset, "L", x + offset, y - offset];
		return this.path(arrPath.concat(" "));
	};

	Raphael.fn.paintMarker = function (type, x, y, length) {
		var self = this,
			marker = null;
		if (!type) {
			type = "circle";
		}
		switch (type) {
			case "circle":
				marker = self.circle(x, y, length);
				break;
			case "tri":
				marker = self.tri(x, y, length);
				break;
			case "invertedTri":
				marker = self.invertedTri(x, y, length);
				break;
			case "box":
				marker = self.box(x, y, length);
				break;
			case "diamond":
				marker = self.diamond(x, y, length);
				break;
			case "cross":
				marker = self.cross(x, y, length);
				break;
		}
		return marker;
	};

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
			totalX = 0,
			totalY = 0;
		//set default value of word spacing and line spacing
		wordSpace = wordSpace || 3;
		lineSpace = lineSpace || 5;

		$.each(texts, function (ridx, item) {
			var maxHeight = 0,
				spans = item.split('|||');
			item = item.replace(/<([A-Za-z]+(.|\n)*?)>/g, '|||<$1>')
				.replace(/<\/([A-Za-z]*)>/g, '</$1>|||');

			$.each(spans, function (cidx, span) {
				var temp = null,
					box = null,
					offsetX = 0,
					offsetY = 0;
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
		//st.translate(x - st.getBBox().x, y - st.getBBox().y);
		st.transform(Raphael.format("...t{0},{1}",
			x - st.getBBox().x, y - st.getBBox().y));

		return st;
	};
	Raphael.fn.line = function (startX, startY, endX, endY) {
		return this.path(["M", startX, startY, "L", endX, endY]);
	};

	Raphael.fn.roundRect = function (x, y, width, height, tlCorner,
			lbCorner, brCorner, rtCorner) {
		var rs = [],
			posFactors = [-1, 1, 1, 1, 1, -1, -1, -1],
			orientations = ["v", "h", "v", "h"],
			pathData = null,
			lens = null;
		$.each([tlCorner, lbCorner, brCorner, rtCorner], function (idx, corner) {
			if (typeof (corner) === "number") {
				rs = rs.concat({ x: corner, y: corner });
			} else if (typeof (corner) === "object") {
				rs = rs.concat(corner);
			} else {
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
	};

	Raphael.fn.wrapText = function (x, y, text, width, textAlign, textStyle) {
		var self = this,
			rotation = textStyle.rotation,
			style = rotation ? $.extend(true, {}, textStyle, { rotation: 0 })
				: textStyle,
			top = y,
			texts = self.set(),
			bounds = null,
			center = null,
			textBounds = [];

		function splitString(text, width, textStyle) {
			var tempText = null,
				bounds = null,
				words = text.toString().split(' '),
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
				} else {
					line.push(words.shift());
				}

				if (words.length === 0) {
					lines.push(line);
				}

				tempText.wijRemove();
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
					//offsetY += bounds.height / 2;
					//top += bounds.height;
					break;
				case "center":
					offsetX += width / 2;
					//offsetY += bounds.height / 2;
					//top += bounds.height;
					break;
				case "far":
					offsetX += bounds.width / 2;
					//offsetY += bounds.height / 2;
					//top += bounds.height;
					break;
			}
			//add comments to fix tfs issue 19384
			if (rotation) {
				offsetY += bounds.height / 2 / Math.abs(Math.sin(rotation));
				top += bounds.height / Math.abs(Math.sin(rotation));
			} else {
				offsetY += bounds.height / 2;
				top += bounds.height;
			}
			//end comments
			bounds.x += offsetX;
			bounds.y += offsetY;
			if (rotation) {
				txt.attr({
					x: txt.attr("x") + offsetX,
					y: txt.attr("y") + offsetY
				});
			} else {
				txt.transform(Raphael.format("...T{0},{1}", offsetX, offsetY));
			}
			texts.push(txt);
			textBounds.push(bounds);
		});

		if (rotation) {
			bounds = texts.wijGetBBox();
			if (texts.length > 1) {
				$.each(texts, function (idx, txt) {
					txt.attr({ y: txt.attr("y") - bounds.height / 2 });
					textBounds[idx].y -= bounds.height / 2;
				});
				center = {
					x: bounds.x + bounds.width / 2,
					y: bounds.y + bounds.height / 2
				};


				$.each(texts, function (idx, txt) {
					var math = Math,
						tb = textBounds[idx],
						txtCenter = {
							x: tb.x + tb.width / 2,
							y: tb.y + tb.height / 2
						},
						len = math.sqrt(math.pow(txtCenter.x - center.x, 2) +
							math.pow(txtCenter.y - center.y, 2)),
						theta = 0,
						rotatedTB = null,
						newTxtCenter = null;

					txt.attr({ rotation: rotation });

					if (len === 0) {
						return true;
					}
					rotatedTB = txt.wijGetBBox();

					theta = Raphael.deg(math.asin(
						math.abs(txtCenter.y - center.y) / len
					));

					if (txtCenter.y > center.y) {
						if (txtCenter.x > center.x) {
							theta -= 360;
						} else {
							theta = -1 * (theta + 180);
						}
					} else {
						if (txtCenter.x > center.x) {
							theta *= -1;
						} else {
							theta = -1 * (180 - theta);
						}
					}
					newTxtCenter = $.wijraphael.getPositionByAngle(center.x,
						center.y, len, -1 * (rotation + theta));


					txt.attr({
						y: txt.attr("y") + newTxtCenter.y -
							rotatedTB.y - rotatedTB.height / 2
					});
				});
			} else {
				texts[0].transform(Raphael.format("...R{0}", rotation));
			}
		}

		return texts;
	};

	Raphael.fn.getSVG = function () {
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

				if (val) {
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
			if (options.opacity) {
				val = options.opacity;
				element += "opacity='" + val + "' style='opacity:" + val + ";";
				styleExist = true;
			}

			if (options.transform && options.transform.length > 0) {
				val = options.transform;
				if (styleExist) {
					element += "transform:" + val;
				} else {
					element += "style='transform:" + val;
					styleExist = true;
				}
			}

			if (styleExist) {
				element += "'";
			}

			if (options.text) {
				val = options.text;
				element += "><tspan>" + val + "</tspan>";
			} else {
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
			node,
			path = "",
			trans,
			group,
			value,
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
								} else {
									if (index === (len2 - 1)) {
										path += value;
									} else {
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
	};

	Raphael.el.wijRemove = function () {
		var self = this,
			jqobj;
		if (self.removed) {
			return;
		}
		if (self.node.parentNode) {
			jqobj = $(self.node);
			self.stop().remove();
			jqobj.remove();
		}
	};

	Raphael.st.wijRemove = function () {
		$.each(this, function (idx, obj) {
			if (obj.wijRemove) {
				obj.wijRemove();
			}
		});
	};

	Raphael.el.wijGetBBox = function () {
		//Add comments to fix tfs issue 19384
		//getBBox issue is fixed in raphael2, so return getBBox() directly.
		return this.getBBox();
		/*
		var self = this,
		box = self.getBBox();
		if (Raphael.vml && self.type === 'text') {
		self.shape.style.display = "inline";
		box.width = self.shape.scrollWidth;
		box.height = self.shape.scrollHeight;
		}
		return box;
		*/
		//end comments
		/*
		var self = this,
		box = self.getBBox(),
		degreesAsRadians = null,
		points = [],
		newX,
		newY,
		newWidth,
		newHeight,
		p,
		bb = { left: 0, right: 0, top: 0, bottom: 0 },
		_px = 0,
		transform = self.transform().toString();
		//if (this.attrs && this.attrs.rotation) {
		if (/r[^0]/i.test(transform)) {
		//degreesAsRadians = self._.deg * Math.PI / 180;
		degreesAsRadians = self._.deg;
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

		box = self.getBBox();
		if (Raphael.vml && self.type === 'text') {
		self.shape.style.display = "inline";
		box.width = self.shape.scrollWidth;
		box.height = self.shape.scrollHeight;
		}
		return box;
		*/
	};

	Raphael.el.wijAnimate = function (params, ms, easing, callback) {
		if (!params || $.isEmptyObject(params)) {
			return;
		}

		var shadow = this.shadow,
			offset = 0,
			jQEasing = {
				easeInCubic: ">",
				easeOutCubic: "<",
				easeInOutCubic: "<>",
				easeInBack: "backIn",
				easeOutBack: "backOut",
				easeOutElastic: "elastic",
				easeOutBounce: "bounce"
			};

		if (jQEasing[easing]) {
			easing = jQEasing[easing];
		}
		this.animate(params, ms, easing, callback);
		jQEasing = null;
		if (shadow && shadow.offset) {
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
			} else if (typeof (name) === "string") {
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
						//this.shadow.attr("translation", "1 0");
						this.shadow.attr("transform", "...t1,0");
						break;
					case "y":
						this.shadow.attr(name, value);
						//this.shadow.attr("translation", "0 1");
						this.shadow.attr("transform", "...t0,1");
						break;
					default:
						break;
				}
			}
		}
	};

	Raphael.st.wijAttr = function (name, value) {
		$.each(this.items, function (idx, item) {
			item.wijAttr(name, value);
		});
		return this;
	};

	Raphael.st.wijAnimate = function (params, ms, easing, callback) {
		var i = 0,
			ii = 0,
			item = null;
		for (i = 0, ii = this.items.length; i < ii; i++) {
			item = this.items[i];
			item.wijAnimate(params, ms, easing, callback);
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
} ());