/*
 *
 * Wijmo Library 0.8.0
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
 *  raphael-popup.js
 *  jquery.glob.min.js
 *  jquery.svgdom.js
 *  jquery.ui.widget.js
 *
 */
Raphael.fn.wij = {
	moveTo: function (x, y) {
		return this.path("M " + x + " " + y);
	},

	lineTo: function (x, y) {
		return this.path("M " + this.wij.lastX + " " + this.wij.lastY + "L " + x + " " + y);
	},

	line: function (startX, startY, endX, endY) {
		return this.path(["M", startX, startY, "L", endX, endY]);
	},

	sector: function (cx, cy, r, startAngle, endAngle) {
		var start = this.wij.getPositionByAngle(cx, cy, r, startAngle);
		var end = this.wij.getPositionByAngle(cx, cy, r, endAngle);
		return this.path(["M", cx, cy, "L", start.x, start.y, "A", r, r, 0, +(endAngle - startAngle > 180), 0, end.x, end.y, "z"]);
	},

	donut: function (cx, cy, outerR, innerR, startAngle, endAngle) {
		var outerS = this.wij.getPositionByAngle(cx, cy, outerR, startAngle);
		var outerE = this.wij.getPositionByAngle(cx, cy, outerR, endAngle);
		var innerS = this.wij.getPositionByAngle(cx, cy, innerR, startAngle);
		var innerE = this.wij.getPositionByAngle(cx, cy, innerR, endAngle);

		return this.path(["M", outerS.x, outerS.y,
					"A", outerR, outerR, 0, +(endAngle - startAngle > 180), 0, outerE.x, outerE.y,
					"L", innerE.x, innerE.y,
					"A", innerR, innerR, 0, +(endAngle - startAngle > 180), 1, innerS.x, innerS.y,
					"L", outerS.x, outerS.y, "z"]);
	},

	roundRect: function (x, y, width, height, tlCorner, lbCorner, brCorner, rtCorner) {
		var rs = [];
		var posFactors = [-1, 1, 1, 1, 1, -1, -1, -1];
		var orientations = ["v", "h", "v", "h"];

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

		var pathData = ["M", x + rs[0].x, y];
		var lens = [height - rs[0].y - rs[1].y, width - rs[1].x - rs[2].x,
					rs[2].y + rs[3].y - height, rs[3].x + rs[0].x - width];

		$.each(rs, function (idx, r) {
			if (r.x && r.y) {
				pathData = pathData.concat("a", r.x, r.y, 0, 0, 0, posFactors[2 * idx] * r.x, posFactors[2 * idx + 1] * r.y);
			}

			pathData = pathData.concat(orientations[idx], lens[idx]);
		});

		pathData.push("z");

		return this.path(pathData);
	},

	getPositionByAngle: function (cx, cy, r, angle) {
		var point = {};
		var rad = Raphael.rad(angle);
		point.x = cx + r * Math.cos(-1 * rad);
		point.y = cy + r * Math.sin(-1 * rad);

		return point;
	},

	round: function (val, digits) {
		var factor = Math.pow(10, digits);
		var tempVal = val * factor;
		tempVal = Math.round(tempVal);

		return tempVal / factor;
	},

	getSVG: function () {
		function createSVGElement(type, options) {
			var element = '<' + type + ' ';
			var val = null;
			var styleExist = false;

			for (var name in options) {
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

			if ((val = options["opacity"]) !== null) {
				element += "opacity='" + val + "' style='opacity:" + val + ";";
				styleExist = true;
			}

			if ((val = options["transform"]) !== null && val.length > 0) {
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

			if ((val = options["text"]) !== null) {
				element += "><tspan>" + val + "</tspan>";
			}
			else {
				element += ">";
			}

			element += "</" + type + ">";

			return element;
		}

		var paper = this;
		var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="' +
				paper.canvas.offsetWidth + '" height="' + paper.canvas.offsetHeight + '"><desc>Created with Raphael</desc><defs></defs>';

		for (var node = paper.bottom; node !== null; node = node.next) {
			if (node && node.type) {
				switch (node.type) {
				case "path":
					var path = "";

					$.each(node.attrs['path'], function (i, group) {
						$.each(group, function (index, value) {
							if (index < 1) {
								path += value;
							}
							else {
								if (index == (group.length - 1)) {
									path += value;
								}
								else {
									path += value + ',';
								}
							}
						});
					});

					if (path && path.length > 0) {
						node.attrs["d"] = path.replace(/,/g, ' ');
					}
					break;
				case "text":
					if (!node.attrs["text-anchor"]) {
						node.attrs["text-anchor"] = "middle";
					}
					break;
				case "image":
					node.attrs["transform"] = node.transformations ? node.transformations.join(' ') : '';
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
	},

	tooltip: function (parent) {
		var canvas = this;

		function tooltip() {
			var defaultTextAttr = {}, defaultRectAttr = { "fill-opacity": 0.9, fill: "white" };
			var textEle = null, rectEle = null, isShowing = false;
			var lastPoint = {
				x: 0,
				y: 0
			};
			var intentHoverShowTimer = null;
			var intentHoverHideTimer = null;
			this.showDelay = 250;
			this.hideDelay = 250;
			this.duration = 250;
			this.easing = "";
			this.compass = "west";
			this.offset = 0;
			this.text = "";
			this.textAttr = {};
			this.rectAttr = {};
			this.rectRadius = 5;

			var _clearIntentHoverTimer = function (timer) {
				if (timer) {
					window.clearTimeout(timer);
					timer = null;
				}
			};

			this.hide = function (speed) {
				if (intentHoverShowTimer) {
					_clearIntentHoverTimer(intentHoverShowTimer);
				}

				if (intentHoverHideTimer) {
					_clearIntentHoverTimer(intentHoverHideTimer);
				}

				if (speed !== null) {
					this.hideDelay = speed;
				}

				var self = this;
				if (this.hideDelay > 0) {
					intentHoverHideTimer = window.setTimeout(function () {
						self._hide();
					}, this.hideDelay);
				} else {
					self._hide();
				}
			};

			this.showAt = function (p, speed) {
				if (intentHoverShowTimer) {
					_clearIntentHoverTimer(intentHoverShowTimer);
				}

				if (intentHoverHideTimer) {
					_clearIntentHoverTimer(intentHoverHideTimer);
				}

				if (speed !== null) {
					this.showDelay = speed;
				}

				var self = this;
				/*
				if(isShowing) {
				self._show(p);
				} else {
				intentHoverShowTimer = window.setTimeout(function() {
				self._show(p);
				}, showDelay);
				}
				*/
				//self._show(p);
				if (this.showDelay > 0) {
					intentHoverShowTimer = window.setTimeout(function () {
						self._show(p);
					}, this.showDelay);
				} else {
					self._show(p);
				}
			};

			this._hide = function () {
				if (textEle) {
					textEle.stop();
					textEle.remove();
					textEle = null;
				}

				if (rectEle) {
					rectEle.stop();
					rectEle.remove();
					rectEle = null;
				}
				isShowing = false;
			};

			this._show = function (position) {
				//this._hide();
				if (!textEle) {
					textEle = canvas.text(0, 0, this.text);
				}
				var txtAttr = $.extend(defaultTextAttr, this.textAttr);
				textEle.attr({
					text: this.text
				});
				textEle.attr(txtAttr);
				var txtBox = textEle.wijGetBBox();
				txtBox.width = txtBox.width + 10;
				txtBox.height = txtBox.height > 30 ? txtBox.height : 30;
				var pos = parent._getCompassTextPosition(this.compass, txtBox, this.offset, position, 0);
				if (!rectEle) {
					textEle.attr({ x: pos.endPoint.x + pos.offsetX, y: pos.endPoint.y + pos.offsetY });
					//textEle.translate(pos.endPoint.x + pos.offsetX, pos.endPoint.y + pos.offsetY);
				} else {
					textEle.attr({ x: lastPoint.x + lastPoint.offsetX, y: lastPoint.y + lastPoint.offsetY });
					//textEle.translate(lastPoint.x + lastPoint.offsetX, lastPoint.y + lastPoint.offsetY);
				}

				var rAttr = $.extend(defaultRectAttr, this.rectAttr);
				var p = this._convertCompassToPos(this.compass);
				if (!rectEle) {
					rectEle = canvas.popup(pos.endPoint.x, pos.endPoint.y, textEle, p);
				} else {
					rectEle.remove();
					rectEle = canvas.popup(lastPoint.x, lastPoint.y, textEle, p);
					var offset = (pos.endPoint.x - lastPoint.x) + "," + (pos.endPoint.y - lastPoint.y);
					rectEle.stop().animate({
						"translation": offset
					}, this.duration, this.easing);
					textEle.stop().animate({
						"translation": offset
					}, this.duration, this.easing);
				}
				lastPoint.x = pos.endPoint.x;
				lastPoint.y = pos.endPoint.y;
				lastPoint.offsetX = pos.offsetX;
				lastPoint.offsetY = pos.offsetY;
				rectEle.attr(rAttr);
				textEle.toFront();
				isShowing = true;
			};

			this._convertCompassToPos = function (compass) {
				var pos = "";
				switch (compass) {
				case "northeast":
					pos = "top-left";
					break;
				case "northwest":
					pos = "top-right";
					break;
				case "southeast":
					pos = "bottom-left";
					break;
				case "southwest":
					pos = "bottom-right";
					break;
				case "south":
					pos = "bottom";
					break;
				case "north":
					pos = "top";
					break;
				case "east":
					pos = "right";
					break;
				case "west":
				default:
					pos = "left";
					break;
				}
				return pos;
			};

		}

		return new tooltip();
	}

};

Raphael.el.wijGetBBox = function () {
	var box = this.getBBox();
	if (Raphael.vml) {
		if (this.type === 'text') {
			this.shape.style.display = "inline";
			//box.w = this.shape.scrollWidth;
			//box.h = this.shape.scrollHeight;
			box.width = this.shape.scrollWidth;
			box.height = this.shape.scrollHeight;
		}
		else {
			//box.w = this.W;
			//box.h = this.H;
			box.width = this.W;
			box.height = this.H;
		}
	}
	return box;
};

Raphael.el.getBBoxRotated = function () {
	if (this.attrs.rotation) {
		var degreesAsRadians = this._.rt.deg * Math.PI / 180;
		var points = [];
		var box = this.getBBox();
		points.push({ x: 0, y: 0 });
		points.push({ x: box.width, y: 0 });
		points.push({ x: 0, y: box.height });
		points.push({ x: box.width, y: box.height });
		var bb = [];
		bb['left'] = 0;
		bb['right'] = 0;
		bb['top'] = 0;
		bb['bottom'] = 0;
		for (_px = 0; _px < points.length; _px++) {
			var p = points[_px];
			var newX = parseInt((p.x * Math.cos(degreesAsRadians)) + (p.y * Math.sin(degreesAsRadians)));
			var newY = parseInt((p.x * Math.sin(degreesAsRadians)) + (p.y * Math.cos(degreesAsRadians)));
			bb['left'] = Math.min(bb['left'], newX);
			bb['right'] = Math.max(bb['right'], newX);
			bb['top'] = Math.min(bb['top'], newY);
			bb['bottom'] = Math.max(bb['bottom'], newY);
		}
		var newWidth = parseInt(Math.abs(bb['right'] - bb['left']));
		var newHeight = parseInt(Math.abs(bb['bottom'] - bb['top']));
		var newX = (box.x + (box.width) / 2) - newWidth / 2;
		var newY = (box.y + (box.height) / 2) - newHeight / 2;
		return { x: newX, y: newY, width: newWidth, height: newHeight };
	} else {
		return this.getBBox();
	}
};


Raphael.el.wijAnimate = function (params, ms, easing, callback) {
	this.animate(params, ms, easing, callback);
	var shadow = this.shadow;

	if (shadow) {
		var offset = shadow.offset;

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
			if (newName["fill"]) {
				delete newName["fill"];
			}
			if (newName["stroke"]) {
				delete newName["stroke"];
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
	for (var i = 0, ii = this.items["length"]; i < ii; i++) {
		this.items[i].wijAttr(name, value);
	}
	return this;
};

Raphael.st.wijAnimate = function (params, ms, easing, callback) {
	for (var i = 0, ii = this.items["length"]; i < ii; i++) {
		var item = this.items[i];
		item.animate(params, ms, easing, callback);
		if (item.shadow) {
			item.shadow.animate(params, ms, easing, callback);
		}
	}
	return this;
};

function isSVGElem(node) {
	var svgNS = "http://www.w3.org/2000/svg";
	return (node.nodeType == 1 && node.namespaceURI == svgNS);
}
$.expr.filter.CLASS = function (elem, match) {
	var className = (!isSVGElem(elem) ? elem.className :
		(elem.className ? elem.className.baseVal : elem.getAttribute('class')));
	return (' ' + className + ' ').indexOf(match) > -1;
};
$.expr.preFilter.CLASS = function (match, curLoop, inplace, result, not, isXML) {
	match = ' ' + match[1].replace(/\\/g, '') + ' ';
	if (isXML) {
		return match;
	}
	for (var i = 0, elem = {}; elem; i++) {
		elem = curLoop[i];
		if (!elem) {
			try {
				elem = curLoop.item(i);
			}
			catch (e) {
			}
		}
		if (elem) {
			var className = (!isSVGElem(elem) ? elem.className :
				(elem.className ? elem.className.baseVal : '') || elem.getAttribute('class'));
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

	$.widget("ui.wijchartcore", {
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
			/// If the value is null, then the width will be calculated by dom element which is used to put the canvas.
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
			/// If the value is null, then the height will be calculated by dom element which is used to put the canvas.
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
			///         		label: "Q2",
			///            		legendEntry: true,
			///            		data: {
			///						xy: [1, 21, 2, 10, 3, 19, 4, 31, 5, 20]
			///					},
			///            		offset: 0
			///        		}]
			///				OR
			///				seriesList: [{
			///         		label: "Q1",
			///            		legendEntry: true,
			///            		data: {
			///						x: ["A", "B", "C", "D", "E"],
			///						y: [12, 21, 9, 29, 30]
			///					},
			///            		offset: 0
			///        		}]
			///				OR
			///				seriesList: [{
			///         		label: "Q1",
			///            		legendEntry: true,
			///            		data: {
			///						x: [new Date(1978, 0, 1), new Date(1980, 0, 1), new Date(1981, 0, 1), new Date(1982, 0, 1), new Date(1983, 0, 1)],
			///						y: [12, 21, 9, 29, 30]
			///					},
			///            		offset: 0
			///        		}]
			///  });
			/// </summary>
			seriesList: [],
			/// <summary>
			/// An array collection that contains the style to be charted.
			/// Default: [].
			/// Type: Array.
			///	Code example: 
			///	$("#chartcore").wijchartcore({
			///				seriesStyles: [
			///					{fill: "rgb(255,0,0)", stroke:"none"}, 
			///         		{ fill: "rgb(255,125,0)", stroke: "none" }
			///        		]});
			/// </summary>
			seriesStyles: [{
				stroke: "#77b3af", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#67908e", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#465d6e", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#5d3f51", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#682e32", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#8c5151", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#ce9262", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#ceb664", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#7fb34f", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#2a7b5f", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#6079cb", opacity: 0.9, "stroke-width": "1"
			}, {
				stroke: "#60a0cb", opacity: 0.9, "stroke-width": "1"
			}
		],
			/// <summary>
			/// An array collection that contains the style to be charted when hovering the chart element.
			/// Default: [].
			/// Type: Array.
			///	Code example: 
			///	$("#chartcore").wijchartcore({
			///				seriesHoverStyles: [
			///					{fill: "rgb(255,0,0)", stroke:"none"}, 
			///         		{ fill: "rgb(255,125,0)", stroke: "none" }
			///        		]});
			/// </summary>
			seriesHoverStyles: [{
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
			}, {
				opacity: 1, "stroke-width": "1.5"
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
			/// Default: {fill:"#000", stroke:"none"}.
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
			/// Default: {visible:true, style:{fill:"#fff", stroke:"none"}, textStyle:{fille:"#000", stroke:"none"}, compass:"north", orientation:"horizontal"}		
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
				/// Default: {fill:"#fff", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the header text.
				/// Default: {fill:"#000", stroke:"none"}.
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
			/// Default: {visible:false, style:{fill:"#fff", stroke:"none"}, textStyle:{fille:"#000", stroke:"none"}, compass:"south", orientation:"horizontal"}
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
			/// Default: {visible:true, style:{fill:"#fff", stroke:"none"}, textStyle:{fille:"#000", stroke:"none"}, compass:"east", orientation:"vertical"}
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
				textSpacing: 50,
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
				/// Default: {fill:"#fff", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "none",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the legend text.
				/// Default: {fill:"#000", stroke:"none"}.
				/// Type: Object.
				/// </summary>
				textStyle: {
					fill: "#333",
					stroke: "none"
				},
				/// <summary>
				/// A value that indicates the style of the legend title.
				/// Default: {fill:"#000", stroke:"none"}.
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
			/// Default: {x:{style:{"stroke-width":2}, visible:true, textVisible:true, textStyle:{}, textMajorStyle:{},
			///				compass:"south",autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
			///				gridMajor:{visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			///				gridMinor:{visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			///			  	tickMajor:{position:"outside",style:{fill:"black"},factor:1},tickMinor:{position:"none",style:{fill:"black"},factor:1},
			///				annoMethod:"values",valueLabels:[]},
			///			  y:{style:{"stroke-width":2}, visible:true, textVisible:true, textStyle:{}, textMajorStyle:{},
			///				compass:"west",autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
			///			  	gridMajor:{visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			///				gridMinor:{visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
			///			  	tickMajor:{position:"outside",style:{fill:"black"},factor:1},tickMinor:{position:"none",style:{fill:"black"},factor:1},
			///				annoMethod:"values",valueLabels:[]}.
			/// Type: Object.
			/// </summary>
			axis: {
				/// <summary>
				/// A value that provides information for the X axis.
				/// Default: {style:{"stroke-width":2}, visible:true, textVisible:true, textStyle:{}, textMajorStyle:{},
				///			compass:"south",autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				///			gridMajor:{visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
				///			gridMinor:{visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
				///			tickMajor:{position:"outside",style:{fill:"black"},factor:1},tickMinor:{position:"none",style:{fill:"black"},factor:1},
				///			annoMethod:"values",valueLabels:[]}.
				/// Type: Object.
				/// </summary>
				x: {
					alignment: "center",
					/// <summary>
					/// A value that indicates the style of the X axis.
					/// Default: {"stroke-width": 2}.
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
					/// Default: {}.
					/// Type: Object.
					/// </summary>
					textStyle: {
						fill: "#888",
						"font-size": "15pt",
						"font-weight": "bold"
					},
					/// <summary>
					/// A value that provides information for the labels.
					/// Default: {}.
					/// Type: Object.
					/// </summary>
					labels: {
						/// <summary>
						/// A value that indicates the style of major text of the X axis.
						/// Default: {}.
						/// Type: Object.
						/// </summary>
						style: {
							fill: "#333",
							"font-size": "11pt"
						},
						/// <summary>
						/// A value that indicates the alignment of major text of the X axis.
						/// Default: "center".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'near', 'center' and 'far'.
						/// </remarks>
						textAlign: "near"
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
					/// A value that indicates whether the minimum axis value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMin: true,
					/// <summary>
					/// A value that indicates whether the maximum axis value is calculated automatically.
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
					/// A value that indicates whether the major tick mark values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMajor: true,
					/// <summary>
					/// A value that indicates whether the minor tick mark values are calculated automatically.
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
					/// Default: {visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
					/// Type: Object.
					/// </summary>
					gridMajor: {
						/// <summary>
						/// A value that indicates the visibility of the major grid line.
						/// Default: true.
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
					/// Default: {visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
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
					/// Default: {position:"outside", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMajor: {
						/// <summary>
						/// A value that indicates the type of major tick mark.
						/// Default: "outside".
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
						/// A value that indicates an integral factor for major tick mark length.
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
						/// A value that indicates an integral factor for minor tick mark length.
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
				/// Default: {style:{"stroke-width":2}, visible:true, textVisible:true, textStyle:{}, textMajorStyle:{},
				///			compass:"west",autoMin:true,autoMax:true,autoMajor:true,autoMinor:true,
				///			gridMajor:{visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}},
				///			gridMinor:{visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}}
				///			tickMajor:{position:"outside",style:{fill:"black"},factor:1},tickMinor:{position:"none",style:{fill:"black"},factor:1},
				///			annoMethod:"values",valueLabels:[]}
				/// Type: Object.
				/// </summary>
				y: {
					alignment: "center",
					/// <summary>
					/// A value that indicates the style of the Y axis.
					/// Default: {"stroke-width": 2}.
					/// Type: Object.
					/// </summary>
					style: {
						stroke: "#999999",
						"stroke-width": 0.5
					},
					/// <summary>
					/// A value that indicates the visibility of the Y axis.
					/// Default: true.
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
					/// Default: {}.
					/// Type: Object.
					/// </summary>
					textStyle: {
						fill: "#888",
						"font-size": "15pt",
						"font-weight": "bold"
					},
					/// <summary>
					/// A value that provides information for the labels.
					/// Default: {}.
					/// Type: Object.
					/// </summary>
					labels: {
						/// <summary>
						/// A value that indicates the style of major text of the Y axis.
						/// Default: {}.
						/// Type: Object.
						/// </summary>
						style: {
							fill: "#333",
							"font-size": "11pt"
						},
						/// <summary>
						/// A value that indicates the alignment of major text of the Y axis.
						/// Default: "center".
						/// Type: String.
						/// </summary>
						/// <remarks>
						/// Options are 'near', 'center' and 'far'.
						/// </remarks>
						textAlign: "center"
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
					/// A value that indicates whether the minimum axis value is calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMin: true,
					/// <summary>
					/// A value that indicates whether the maximum axis value is calculated automatically.
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
					/// A value that indicates whether the major tick mark values are calculated automatically.
					/// Default: true.
					/// Type: Boolean.
					/// </summary>
					autoMajor: true,
					/// <summary>
					/// A value that indicates whether the minor tick mark values are calculated automatically.
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
					/// Default: {visible:true, style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
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
						/// Default: {stroke:"#CACACA", "stroke-dasharray": "- "}.
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
					/// Default: {visible:false, style:{stroke:"#CACACA","stroke-dasharray":"- "}}.
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
					/// Default: {position:"outside", style:{fill:"black"}, factor:1}.
					/// Type: Object.
					/// </summary>
					tickMajor: {
						/// <summary>
						/// A value that indicates the type of major tick mark.
						/// Default: "outside".
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
						/// A value that indicates an integral factor for major tick mark length.
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
						/// A value that indicates an integral factor for minor tick mark length.
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
			/// A value that is used to indicate whether to show and what to show on the open tooltip.
			/// Default: {enable:false, formatter:null, offset:0, compass:"west", showDelay:250, hideDelay:250, textStyle:{}, style:{}, duration:250, easing:""}.
			/// Type: Function.
			/// Code example:
			/// $("#chartcore").wijchartcore({
			///		hint: {
			///			enable:true,
			///			formatter:function(){
			///				return this.data.label + " : " + this.value/this.total*100 + "%";
			///			}});
			/// </summary>		
			hint: {
				/// <summary>
				/// A value that indicates whether to show the tooltip.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				enable: true,
				/// <summary>
				/// A value that will be shown in the tooltip or a function which is used to get a value for the tooltip shown.
				/// Default: null.
				/// Type: String or Function.
				/// </summary>
				formatter: null,
				/// <summary>
				/// A value that indicates the offset of the point to show the tooltip.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				offset: 0,
				/// <summary>
				/// A value that indicates the compass of the tooltip.
				/// Default: "west".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'west', 'east', 'south', 'north', 'southeast', 'southwest', 'northeast', 'northwest'.
				/// </remarks>
				compass: "north",
				/// <summary>
				/// A value that indicates the millisecond delay to show the tooltip.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				showDelay: 0,
				/// <summary>
				/// A value that indicates the millisecond delay to hide the tooltip.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				hideDelay: 0,
				/// <summary>
				/// A value that indicates the style of text.
				/// Default: {}.
				/// Type: Object.
				/// </summary>
				textStyle: {
					fill: "#d1d1d1",
					"font-size": "16pt"
				},
				/// <summary>
				/// A value that indicates the style of container.
				/// Default: {}.
				/// Type: Object.
				/// </summary>
				style: {
					fill: "270-#333333-#000000",
					"stroke-width": "2"
				},
				/// <summary>
				/// A value that indicates the millisecond duration.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				duration: 120,
				/// <summary>
				/// A value that indicates the easing of tooltip animation.
				/// Default: "".
				/// Type: string.
				/// </summary>
				easing: "easeOutExpo"
			},
			/// <summary>
			/// A value that indicates whether to show default chart labels.
			/// Default: false.
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
			/// Occurs when the user releases a mouse button while the pointer is over the chart element.
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
			/// Occurs when the user moves the mouse pointer while it is over a chart element.
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
			switch (key) {
				case "seriesList":
					if (value == null) {
						value = [];
					}
					var ev = $.Event("beforeserieschange");
					this._trigger("beforeserieschange", ev, {
						oldSeriesList: this.options.seriesList,
						newSeriesList: value
					});
					if (ev.isImmediatePropagationStopped()) {
						return false;
					}
					this.options.seriesList = value;
					this.innerState = {};
					this._paint();
					this._trigger("serieschanged", null, value);
					break;
				default:
					if ($.isPlainObject(this.options[key])) {
						$.extend(true, this.options[key], value);
					}
					else {
						this.options[key] = value;
					}
					this._unbindLiveEvents();
					this._paint();
					this._bindLiveEvents();
					break;
			}

			$.Widget.prototype._setOption.apply(this, arguments);
		},

		// widget creation:    
		_create: function () {
			var width = this.options.width;
			var height = this.options.height;
			this.innerState = {};
			if (this.element.length > 0) {
				var ele = this.element[0];
				if (this.element.is("table")) {
					this._parseTable();
					var newEle = $("<div></div>");
					if (width) {
						newEle.css("width", width);
					}
					else {
						newEle.css("width", this.element.width());
					}
					if (height) {
						newEle.css("height", height);
					}
					else {
						newEle.css("height", this.element.height());
					}
					this.element.after(newEle);
					ele = newEle[0];
					this.chartElement = newEle;
				}
				else {
					this.chartElement = this.element;
				}
				this.chartElement.addClass("ui-widget");

				if (!width) {
					width = $(ele).width();
				}
				if (!height) {
					height = $(ele).height();
				}

				this.canvas = Raphael(ele, width, height);
				this.width = width;
				this.height = height;
			}

			this.headerEles = [];
			this.footerEles = [];
			this.legendEles = [];
			this.axisEles = [];
			this.legends = [];
			this.legendIcons = [];
			this.chartLabelEles = [];
		},

		_parseTable: function () {
			var ele = this.element;
			var o = this.options;
			if (!ele.is("table")) {
				return;
			}
			//header & footer
			var captions = $("caption", ele);
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
			var valuesX = [];
			var theaders = $("thead th", ele);
			if (theaders.length) {
				theaders.each(function () {
					var val = $.trim($(this).text());
					valuesX.push(val);
				});
			}
			var seriesList = [];
			var sList = $("tbody tr", ele);
			if (sList.length) {
				sList.each(function () {
					var th = $("th", $(this));
					var label = $.trim(th.text());
					var valuesY = [];
					var tds = $("td", $(this));
					if (tds.length) {
						tds.each(function () {
							var td = $(this);
							valuesY.push(parseFloat($.trim(td.text())));
						});
					}
					var series = {
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

		// widget initializtion:
		_init: function () {
			var self = this;
			//__wijReadOptionEvents(["beforeserieschange", "serieschanged", "beforepaint", "painted", "click", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout"], this);
			if (!self._rendered) {
				self._paint();
				self._bindLiveEvents();
				self._rendered = true;
				//add browser resize event.
				if (self.options.width === null || self.options.height === null) {
					var resizeTimer;
					$(window).resize(function () {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function () {
							self._unbindLiveEvents();
							var width = self.element.width();
							var height = self.element.height();
							//self.canvas.width = width;
							self.canvas.setSize(width, height);
							self.width = width;
							self.height = height;
							self._paint();
							self._bindLiveEvents();
						}, 250);
					});
				}

			}
		},

		destroy: function () {
			this._unbindLiveEvents();
			this._clearChartElement();
			this.chartElement.removeClass("ui-widget");
			if (this.element != this.chartElement) {
				this.chartElement.remove();
			}
			//this.element
			//	.removeClass("ui-widget");
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

		getSVG: function () {
			if (Raphael.type == "SVG") {
				return this.chartElement.html();
			}

			return this.canvas.wij.getSVG();
		},

		exportChart: function () {
			var form = document.createElement("form");
			form.action = "http://export.highcharts.com/";
			form.method = "post";
			form.style.display = "none";
			document.body.appendChild(form);

			var svg = this.getSVG();

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

		addSeriesPoint: function (seriesIndex, point, shift) {
			var seriesList = this.options.seriesList;

			if (seriesIndex >= seriesList.length) {
				return;
			}

			var series = seriesList[seriesIndex];
			var data = series.data || [];
			data.x.push(point.x);
			data.y.push(point.y);

			if (shift) {
				data.x.shift();
				data.y.shift();
			}

			this._setOption("seriesList", seriesList);
		},

		/** Private methods */
		_clearChartElement: function () {
			if (this.headerEles.length) {
				for (var i = 0, ii = this.headerEles.length; i < ii; i++) {
					this.headerEles[i].remove();
				}
				this.headerEles = [];
			}
			if (this.footerEles.length) {
				for (var i = 0, ii = this.footerEles.length; i < ii; i++) {
					this.footerEles[i].remove();
				}
				this.footerEles = [];
			}
			if (this.legendEles.length) {
				for (var i = 0, ii = this.legendEles.length; i < ii; i++) {
					this.legendEles[i].remove();
				}
				this.legendEles = [];
			}
			if (this.legends.length) {
				for (var i = 0, ii = this.legends.length; i < ii; i++) {
					this.legends[i].remove();
				}
				this.legends = [];
			}
			if (this.legendIcons.length) {
				for (var i = 0, ii = this.legendIcons.length; i < ii; i++) {
					this.legendIcons[i].remove();
				}
				this.legendIcons = [];
			}
			if (this.axisEles.length) {
				for (var i = 0, ii = this.axisEles.length; i < ii; i++) {
					this.axisEles[i].remove();
				}
				this.axisEles = [];
			}
			if (this.chartLabelEles.length) {
				for (var i = 0, ii = this.chartLabelEles.length; i < ii; i++) {
					this.chartLabelEles[i].remove();
				}
				this.chartLabelEles = [];
			}

			this.canvas.clear();
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
			this._clearChartElement();

			var ev = $.Event("beforepaint");
			this._trigger("beforepaint", ev);
			if (ev.isImmediatePropagationStopped()) {
				return false;
			}
			var o = this.options;
			this.canvasBounds = {
				startX: 0,
				endX: this.width,
				//endX: o.width || this.element.width(),
				startY: 0,
				endY: this.height
				//endY: o.height || this.element.height()
			};
			this._paintHeader();
			this._paintFooter();
			this._paintLegend();
			//this._paintPlotArea();
			this._paintChartArea();
			this._paintChartLabels();
			this._trigger("painted");

			/*if (this.options.disableDefaultTextStyle){
			if (Raphael.vml){				
			this.canvas.span.style.fontFamily = "";
			this.canvas.span.style.fontSize = "";
			$(this.canvas.span).css("font", "");

			this.canvas.span.parentNode.removeChild(this.canvas.span);
			}
			}*/
		},

		_calculatePosition: function (compass, width, height) {
			var point = { x: 0, y: 0 };
			var marginX = 5;
			var marginY = 5;
			switch (compass) {
				case "north":
					point.x = (this.canvasBounds.endX - this.canvasBounds.startX) / 2;
					point.y = this.canvasBounds.startY + height / 2 + marginY;
					this.canvasBounds.startY = this.canvasBounds.startY + marginY * 2 + height;
					break;
				case "south":
					point.x = (this.canvasBounds.endX - this.canvasBounds.startX) / 2;
					point.y = this.canvasBounds.endY - height / 2 - marginY;
					this.canvasBounds.endY = this.canvasBounds.endY - marginY * 2 - height;
					break;
				case "east":
					point.x = this.canvasBounds.endX - width / 2 - marginX;
					point.y = (this.canvasBounds.endY - this.canvasBounds.startY) / 2;
					this.canvasBounds.endX = this.canvasBounds.endX - marginX * 2 - width;
					break;
				case "west":
					point.x = this.canvasBounds.startX + width / 2 + marginX;
					point.y = (this.canvasBounds.endY - this.canvasBounds.startY) / 2;
					this.canvasBounds.startX = this.canvasBounds.startX + marginX * 2 + width;
					break;
			}
			return point;
		},

		_paintHeader: function () {
			var headerMargin = 2;
			var o = this.options;
			var header = o.header;
			if (header.text && header.text.length > 0
			&& header.visible) {
				var compass = header.compass;
				var headerText = this._text(0, 0, header.text);
				var textStyle = $.extend(true, {}, o.textStyle, header.textStyle);
				headerText.attr(textStyle);
				var bBox = headerText.wijGetBBox();
				var point = this._calculatePosition(compass, bBox.width, bBox.height);
				headerText.translate(point.x, point.y);
				var box = headerText.wijGetBBox();
				var headerContainer = this.canvas.rect(box.x - headerMargin, box.y - headerMargin, box.width + 2 * headerMargin, box.height + 2 * headerMargin);
				headerContainer.attr(header.style);
				headerContainer.toBack();

				this.headerEles.push(headerText);
				this.headerEles.push(headerContainer);
			}
			//return canvasBounds;
		},

		_paintFooter: function () {
			var footerMargin = 2;
			var o = this.options;
			var footer = o.footer;
			if (footer.text && footer.text.length > 0
			&& footer.visible) {
				var compass = footer.compass;
				var footerText = this._text(0, 0, footer.text);
				var textStyle = $.extend(true, {}, o.textStyle, footer.textStyle);
				footerText.attr(textStyle);
				var bBox = footerText.wijGetBBox();
				var point = this._calculatePosition(compass, bBox.width, bBox.height);
				footerText.translate(point.x, point.y);
				var box = footerText.wijGetBBox();
				var footerContainer = this.canvas.rect(box.x - footerMargin, box.y - footerMargin, box.width + 2 * footerMargin, box.height + 2 * footerMargin);
				footerContainer.attr(footer.style);
				footerContainer.toBack();

				this.footerEles.push(footerText);
				this.footerEles.push(footerContainer);
			}
			//return canvasBounds;
		},

		_paintLegend: function () {
			var o = this.options;
			var legendMargin = 2;
			var legend = {
				size: {
					width: 22,
					height: 10
				}
			};
			$.extend(true, legend, o.legend);
			if (legend.visible) {
				var compass = legend.compass;
				var orientation = legend.orientation;
				var legendTitle;
				if (legend.text && legend.text.length) {
					legendTitle = this._text(0, 0, legend.text);
					var textStyle = $.extend(true, {}, o.textStyle, legend.textStyle, legend.titleStyle);
					legendTitle.attr(textStyle);
					this.legendEles.push(legendTitle);
				}
				var chartsSeries = o.seriesList;
				var chartsSeriesStyles = o.seriesStyles;
				var iconWidth = legend.size.width;
				var iconHeight = legend.size.height;
				if (!legend.reversed) {
					for (var i = 0, ii = chartsSeries.length; i < ii; i++) {
						var chartSeries = chartsSeries[i];
						chartSeries = $.extend({ legendEntry: true }, chartSeries);
						var chartSeriesStyle = chartsSeriesStyles[i];
						var chartStyle = $.extend(true, {
							fill: "none",
							opacity: 1,
							stroke: "black"
						}, chartSeriesStyle);
						if (chartSeries.legendEntry) {
							var text = this._text(0, 0, chartSeries.label);
							var textStyle = $.extend(true, {}, o.textStyle, legend.textStyle);
							text.attr(textStyle);
							this.legends.push(text);
							var chtStyle = $.extend(chartStyle, { "stroke-width": 1 });
							var icon = this.canvas.rect(0, 0, iconWidth, iconHeight);
							icon.attr(chtStyle);
							this.legendIcons.push(icon);
						}
					}
				}
				else {
					for (var i = chartsSeries.length - 1; i >= 0; i--) {
						var chartSeries = chartsSeries[i];
						chartSeries = $.extend({ legendEntry: true }, chartSeries);
						var chartSeriesStyle = chartsSeriesStyles[i];
						var chartStyle = $.extend(true, {
							fill: "none",
							opacity: 1,
							stroke: "black"
						}, chartSeriesStyle);
						if (chartSeries.legendEntry) {
							var text = this._text(0, 0, chartSeries.label);
							var textStyle = $.extend(true, {}, o.textStyle, legend.textStyle);
							text.attr(textStyle);
							this.legends.push(text);
							var chtStyle = $.extend(chartStyle, { "stroke-width": 1 });
							var icon = this.canvas.rect(0, 0, iconWidth, iconHeight);
							icon.attr(chtStyle);
							this.legendIcons.push(icon);
						}
					}
				}
				var width = 0, titleWidth = 0, maxWidth = 0;
				if (legendTitle) {
					titleWidth = legendTitle.wijGetBBox().width;
				}
				var height = 0, titleHeight = 0, maxHeight = 0;
				if (legendTitle) {
					titleHeight = legendTitle.wijGetBBox().height;
				}
				var legendLen = this.legends.length;
				if (legendLen) {
					for (i = 0, ii = legendLen; i < ii; i++) {
						var legendText = this.legends[i];
						var bBox = legendText.wijGetBBox();
						if (bBox.width > maxWidth) {
							maxWidth = bBox.width;
						}
						if (bBox.height > maxHeight) {
							maxHeight = bBox.height;
						}
					}
				}
				var canvasWidth = this.canvasBounds.endX - this.canvasBounds.startX;
				var canvasHeight = this.canvasBounds.endY - this.canvasBounds.startY;
				var columnNum = 1;
				var textMargin = legend.textMargin;
				if (compass == "east" || compass == "west") {
					if (orientation == "horizontal") {
						var totalWidth = legendLen * (maxWidth + iconWidth + legendMargin) + legendLen * (textMargin.left + textMargin.right);
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
					else if (orientation == "vertical") {
						var totalHeight = maxHeight * legendLen + titleHeight + legendLen * (textMargin.top + textMargin.bottom);
						if (totalHeight > canvasHeight) {
							columnNum = Math.ceil(totalHeight / canvasHeight);
						}
						else {
							columnNum = 1;
						}
					}
				}
				else if (compass == "south" || compass == "north") {
					if (orientation == "horizontal") {
						var totalWidth = (maxWidth + iconWidth + legendMargin) * legendLen + legendLen * (textMargin.left + textMargin.right);
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
					else if (orientation == "vertical") {
						var totalHeight = maxHeight * legendLen + titleHeight + legendLen * (textMargin.top + textMargin.bottom);
						if (totalHeight > canvasHeight / 2) {
							var rowNum = Math.floor(canvasHeight - titleHeight) / 2 / maxHeight;
							columnNum = Math.ceil(legendLen / rowNum);
						}
						else {
							columnNum = 1;
						}
					}
				}
				width = columnNum * (maxWidth + iconWidth + legendMargin) + columnNum * (textMargin.left + textMargin.right);
				height = maxHeight * Math.ceil(legendLen / columnNum) + titleHeight + columnNum * (textMargin.top + textMargin.bottom);

				var point = this._calculatePosition(compass, width, height);
				var xx = point.x - width / 2;
				var yy = point.y - height / 2;
				var legendContainer = this.canvas.rect(xx - legendMargin, yy - legendMargin, width + 2 * legendMargin, height + 2 * legendMargin);
				legendContainer.attr(legend.style);
				legendContainer.toBack();
				this.legendEles.push(legendContainer);
				var len = 0;
				if (legendTitle) {
					legendTitle.translate(xx + width / 2, yy + len + titleHeight / 2);
					if (orientation == "vertical") {
						len = titleHeight;
					}
				}
				var idx = 0, offsetY = titleHeight;
				for (var i = 0, ii = legendLen; i < ii; i++) {
					var l = this.legends[i];
					var icon = this.legendIcons[i];
					var b = l.wijGetBBox();

					var x = xx + idx * (iconWidth + maxWidth + legendMargin) + (idx + 1) * textMargin.left + idx * textMargin.right;
					var y = yy + offsetY + b.height / 2 + textMargin.top;
					icon.translate(x, y - icon.wijGetBBox().height / 2);
					l.translate(x + iconWidth + legendMargin + b.width / 2, y);
					l.toFront();

					idx++;
					if (idx == columnNum) {
						idx = 0;
						offsetY += maxHeight + textMargin.top + textMargin.bottom;
					}
				}
			}
		},

		_hasAxes: function () {
			if (this.widgetName == "wijpiechart") {
				return false;
			}
			return true;
		},

		_applyAxisText: function (axisOptions) {
			var text = axisOptions.text;
			var textBounds = null;

			if (text != null && text.length > 0) {
				var tempText = this._text(-100, -100, text);

				var textStyle = $.extend(true, {}, this.options.textStyle, axisOptions.textStyle);
				tempText.attr(textStyle);
				textBounds = tempText.wijGetBBox();

				switch (axisOptions.compass) {
					case "north":
						this.canvasBounds.startY += textBounds.height;
						break;
					case "south":
						this.canvasBounds.endY -= textBounds.height;
						break;
					case "east":
						this.canvasBounds.endX -= textBounds.height;
						break;
					case "west":
						this.canvasBounds.startX += textBounds.height;
						break;
				}
				tempText.remove();
			}

			return textBounds;
		},

		_paintChartArea: function () {
			this._applyMargins();
			if (this.options.seriesList == null || this.options.seriesList.length == 0) {
				return;
			}
			if (this._hasAxes()) {
				//Restore from cache.
				if (this.innerState.axisInfo) {
					this.axisInfo = this.innerState.axisInfo;
					this.canvasBounds = this.innerState.canvasBounds;
				}
				else {
					var axisOption = this.options.axis;
					var axisTextOffset = 2; //The value is used to offset the tick major text from the tick rect.
					var xTextBounds = this._applyAxisText(axisOption.x);
					var yTextBounds = this._applyAxisText(axisOption.y);

					this.axisInfo = {
						x: {
							id: "x",
							tprec: 0,
							isTime: false,
							offset: 0,
							max: 0,
							min: 0,
							majorTickRect: null,
							minorTickRect: null,
							annoFormatString: null,
							textBounds: xTextBounds,
							axisTextOffset: axisTextOffset
						},
						y: {
							id: "y",
							tprec: 0,
							isTime: false,
							offset: 0,
							max: 0,
							min: 0,
							majorTickRect: null,
							minorTickRect: null,
							annoFormatString: null,
							textBounds: yTextBounds,
							axisTextOffset: axisTextOffset
						}
					}
					var extremeValue = this._getDataExtreme();
					if (axisOption.x.autoMin) {
						axisOption.x.min = extremeValue.txn;
					}
					if (axisOption.x.autoMax) {
						axisOption.x.max = extremeValue.txx;
					}
					if (axisOption.y.autoMin) {
						axisOption.y.min = extremeValue.tyn;
					}
					if (axisOption.y.autoMax) {
						axisOption.y.max = extremeValue.tyx;
					}

					var maxtries = 5;
					var axis = this.options.axis;
					do {
						var offsetY = this._autoPosition(this.axisInfo.y, axis.y);
						var offsetX = this._autoPosition(this.axisInfo.x, axis.x);

						if (offsetY == this.axisInfo.y.offset && offsetX == this.axisInfo.x.offset) {
							maxtries = 0;
							break;
						}
						if (offsetY != this.axisInfo.y) {
							this.axisInfo.y.offset = offsetY;
						}
						if (offsetX != this.axisInfo.x) {
							this.axisInfo.x.offset = offsetX;
						}
						maxtries--;
					} while (maxtries > 0);

					this._adjustPlotArea(axis.x, this.axisInfo.x);
					this._adjustPlotArea(axis.y, this.axisInfo.y);

					this.innerState.axisInfo = this.axisInfo;
					this.innerState.canvasBounds = this.canvasBounds;
				}

				this._paintAxes();
				this._paintPlotArea();
			}
			else {
				this._paintPlotArea();
			}
		},

		_adjustPlotArea: function (axisOptions, axisInfo) {
			axisOptions.max = axisInfo.max;
			axisOptions.min = axisInfo.min;
			switch (axisOptions.compass) {
				case "north":
					{
						this.canvasBounds.startY += axisInfo.offset;
						break;
					}
				case "south":
					{
						this.canvasBounds.endY -= axisInfo.offset;
						break;
					}
				case "east":
					{
						this.canvasBounds.endX -= axisInfo.offset;
						break;
					}
				case "west":
					{
						this.canvasBounds.startX += axisInfo.offset;
						break;
					}
			}
		},

		_autoPosition: function (axisInfo, axisOptions) {
			//this._adjustCartesianCompass();
			//base._autoPosition();
			return this._autoPositionCartesianAxis(axisInfo, axisOptions);
		},

		_autoPositionCartesianAxis: function (axisInfo, axisOptions) {

			switch (axisOptions.compass) {
				case "north":
				case "south":
					{

						this._calculateParameters(axisInfo, axisOptions);
						var extent = this._getMaxExtents(axisInfo, axisOptions);
						return extent.height;
					}
				case "east":
				case "west":
					{

						this._calculateParameters(axisInfo, axisOptions);
						var extent = this._getMaxExtents(axisInfo, axisOptions);
						return extent.width;
					}
			}
		},

		_getMaxExtents: function (axisInfo, axisOptions, axisRect) {
			var rMajor = this._getTickRect(axisInfo, axisOptions, true, true, axisRect);
			var rMinor = this._getTickRect(axisInfo, axisOptions, false, true, axisRect);

			axisInfo.majorTickRect = rMajor;
			axisInfo.minorTickRect = rMinor;

			var majorTickValues = this._getMajorTickValues(axisInfo, axisOptions);

			//var valueX = !this._isVertical(axisOptions.compass);
			var maxExtent = {
				width: 0,
				height: 0
			};
			var o = this.options;
			var min = axisInfo.min;
			var max = axisInfo.max;
			var isTime = axisInfo.isTime;
			var formatString = axisOptions.annoFormatString;
			if (!formatString) {
				formatString = axisInfo.annoFormatString;
			}
			if (majorTickValues != null && majorTickValues.length) {
				var is100pc = o.is100Percent;
				for (var i = 0, idx = 0; i < majorTickValues.length; i++, idx++) {
					var mtv = majorTickValues[i];
					if (mtv >= min && mtv <= max) {
						if (axisOptions.annoMethod == "valueLabels") {
							mtv = axisOptions.valueLabels[idx].text;
						}
						else if (axisOptions.annoMethod == "values") {
							if (formatString && formatString.length) {
								if (isTime) {
									mtv = this._fromOADate(mtv);
								}

								mtv = $.format(mtv, formatString);
							}
							else if (is100pc && axisInfo.id == "y") {
								mtv = $.format(mtv, "p0");
							}
						}

						var textStyle = $.extend(true, {}, o.textStyle, axisOptions.textStyle, axisOptions.labels.style);
						var txt = this._text(-100, -100, mtv).attr(textStyle);
						var width, height;
						if (textStyle["rotation"]) {
							var size = txt.getBBoxRotated();
							width = size.width;
							height = size.height;
						}
						else {
							var size = txt.wijGetBBox();
							width = size.width;
							height = size.height;
						}
						txt.remove();
						if (size.width > maxExtent.width) {
							maxExtent.width = width;
						}
						if (size.height > maxExtent.height) {
							maxExtent.height = height;
						}
					}
					else {
						idx--;
					}
				}
			}
			return maxExtent;
		},

		_getMajorTickValues: function (axisInfo, axisOptions) {
			var rc = [];
			//var isTime = isTimeFormat;
			// annoMethod will always be values right now.
			//if(axisOptions.annoMethod == "valueLabels") {
			//	rc = this._getSortedDataValues(axisOptions);
			//}
			rc = this._getTickValues(axisInfo.max, axisInfo.min, axisOptions.unitMajor, axisInfo.tprec, !axisInfo.isTime);
			return rc;
		},

		_getMinorTickValues: function (axisInfo, axisOptions) {
			var rc = [];
			rc = this._getTickValues(axisInfo.max, axisInfo.min, axisOptions.unitMinor, axisInfo.tprec, !axisInfo.isTime);
			return rc;
		},

		_getTickValues: function (smax, smin, unit, tickprec, round) {
			var vals = [];
			var sminOriginal = smin;
			try {
				if (unit == 0) {
					vals = [smax, smin];
				}
				else {
					if (tickprec + 1 < 0) {
						tickprec = -1;
					}
					else if (tickprec + 1 > 15) {
						tickprec = 14;
					}
					var smin2 = this.canvas.wij.round(this._signedCeiling(smin / unit) * unit, tickprec + 1);
					if (smin2 < smax) {
						smin = smin2;
					}
					var imax = parseInt(this.canvas.wij.round(smax / unit, 5));
					var imin = parseInt(this.canvas.wij.round(smin / unit, 5));
					var n = parseInt(imax - imin + 1);
					if (n > 1) {
						var xs = imin * unit;
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
					for (var i = 0; i < n; i++) {
						if (round) {
							vals[i] = this.canvas.wij.round(smin + i * unit, tickprec + 1);
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

		//_getTickRect: function(axisInfo, axisOptions, isMajor, inAxisRect, axisRect) {
		_getTickRect: function (axisInfo, axisOptions, isMajor, inAxisRect) {
			var compass = axisOptions.compass;
			var sizeFactor = 0;
			var tick = null;
			var majorSizeFactor = 3;
			var minorSizeFactor = 2;
			var thickness = 2;
			if (isMajor) {
				tick = axisOptions.tickMajor.position;
				sizeFactor = (majorSizeFactor * axisOptions.tickMajor.factor);
			}
			else {
				tick = axisOptions.tickMinor.position;
				sizeFactor = (minorSizeFactor * axisOptions.tickMinor.factor);
			}
			if (tick == "none" || (tick == "inside" && inAxisRect)) {
				sizeFactor = 0;
			}

			var r = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
			//if(isVertical) {
			if (compass == "east" || compass == "west") {
				r = {
					x: 0,
					y: -1,
					width: sizeFactor * thickness,
					height: thickness
				}
				if ((compass == "east" && (tick == "outside" || (tick == "cross" && inAxisRect))) ||
				(compass == "west" && tick == "inside")) {
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
						if (tick == "corss") {
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
				if ((compass == "south" && (tick == "outside" || (tick == "corss" && inAxisRect))) ||
				(compass == "north" && tick == "inside")) {
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
						if (tick == "cross") {
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
			var o = this.options;
			this.canvasBounds.startX += o.marginLeft;
			this.canvasBounds.endX -= o.marginRight;
			this.canvasBounds.startY += o.marginTop;
			this.canvasBounds.endY -= o.marginBottom;
		},

		_paintAxes: function () {
			//paint x axis
			this._paintAxis(this.options.axis.x, this.axisInfo.x);
			//paint y axis
			this._paintAxis(this.options.axis.y, this.axisInfo.y);
		},

		_paintAxis: function (axisOptions, axisInfo) {
			var plotBounds = this.canvasBounds;
			var startPoint = {
				x: 0,
				y: 0,
				ox: 0,
				oy: 0
			}
			var endPoint = {
				x: 0,
				y: 0,
				ox: 0,
				oy: 0
			}
			var compass = axisOptions.compass;
			var thickness = 2;
			var isVertical = true;
			switch (compass) {
				case "south":
					{
						startPoint.x = plotBounds.startX;
						startPoint.ox = plotBounds.startX;
						startPoint.y = plotBounds.endY;
						startPoint.oy = plotBounds.startY;
						endPoint.x = plotBounds.endX;
						endPoint.ox = plotBounds.endX;
						endPoint.y = plotBounds.endY;
						endPoint.oy = plotBounds.startY;
						isVertical = false;
						break;
					}
				case "north":
					{
						startPoint.x = plotBounds.startX;
						startPoint.ox = plotBounds.startX;
						startPoint.y = plotBounds.startY - thickness;
						startPoint.oy = plotBounds.endY - thickness;
						endPoint.x = plotBounds.endX;
						endPoint.ox = plotBounds.endX;
						endPoint.y = plotBounds.startY - thickness;
						endPoint.oy = plotBounds.endY - thickness;
						isVertical = false;
						break;
					}
				case "east":
					{
						startPoint.x = plotBounds.endX;
						startPoint.ox = plotBounds.startX;
						startPoint.y = plotBounds.endY;
						startPoint.oy = plotBounds.endY;
						endPoint.x = plotBounds.endX;
						endPoint.ox = plotBounds.startX;
						endPoint.y = plotBounds.startY;
						endPoint.oy = plotBounds.startY;
						break;
					}
				case "west":
					{
						startPoint.x = plotBounds.startX - thickness;
						startPoint.ox = plotBounds.endX;
						startPoint.y = plotBounds.endY;
						startPoint.oy = plotBounds.endY;
						endPoint.x = plotBounds.startX - thickness;
						endPoint.ox = plotBounds.endX;
						endPoint.y = plotBounds.startY;
						endPoint.oy = plotBounds.startY;
						break;
					}
			}
			var ax = this.canvas.wij.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
			ax.attr(axisOptions.style);
			if (!axisOptions.visible) {
				ax.hide();
			}
			this.axisEles.push(ax);

			//paint tick & ticklabel
			var majorTickValues = this._getMajorTickValues(axisInfo, axisOptions);
			var minorTickValues = this._getMinorTickValues(axisInfo, axisOptions);
			minorTickValues = this._resetMinorTickValues(minorTickValues, majorTickValues);
			var lenMajor = majorTickValues.length;
			var lenMinor = minorTickValues.length;
			var min = axisInfo.min;
			var max = axisInfo.max;
			//var len = max - min;
			var unitMajor = axisOptions.unitMajor;
			var unitMinor = axisOptions.unitMinor;
			var tickMajor = axisOptions.tickMajor.position;
			var tickMinor = axisOptions.tickMinor.position;
			var axisSize = axisInfo.offset;
			var tickMajorStyle = axisOptions.tickMajor.style;
			var tickMinorStyle = axisOptions.tickMinor.style;
			var tickRectMajor = axisInfo.majorTickRect;
			var tickRectMinor = axisInfo.minorTickRect;
			var axisTextOffset = axisInfo.axisTextOffset;

			var isTime = axisInfo.isTime;
			var formatString = axisOptions.annoFormatString;
			if (!formatString) {
				formatString = axisInfo.annoFormatString;
			}

			var is100Percent = this.options.is100Percent;
			var gridMajor = axisOptions.gridMajor;
			var gridMinor = axisOptions.gridMinor;
			var labels = axisOptions.labels;
			var maxLen = 0;
			var textInfos = [];

			for (var idx = 0, i = 0; i < lenMajor; idx++, i++) {
				var val = majorTickValues[i];
				var text = val;

				if (val >= min && val <= max) {
					if (axisOptions.annoMethod == "valueLabels") {
						text = axisOptions.valueLabels[idx].text;
					}
					else if (axisOptions.annoMethod == "values") {
						if (formatString && formatString.length) {
							if (isTime) {
								text = this._fromOADate(val);
							}
							text = $.format(text, formatString);
						}
						else if (is100Percent && axisInfo.id == "y") {
							text = $.format(val, "p0");
						}
					}
					else {
						//TODO: mixed
					}

					var textStyle = $.extend(true, {}, this.options.textStyle, axisOptions.textStyle, labels.style);
					var textInfo = this._paintMajorMinor(max, min, val, tickMajor, unitMajor, tickRectMajor, compass, startPoint, endPoint, axisSize, axisTextOffset, tickMajorStyle, text, gridMajor, axisOptions.textVisible, textStyle, labels.textAlign);

					if (textInfo) {
						textInfos.push(textInfo);
						if (maxLen < textInfo.len) {
							maxLen = textInfo.len;
						}
					}
				}
				else {
					idx--;
				}
			}

			$.each(textInfos, function (idx, textInfo) {
				var textElement = textInfo.text;
				var offset = (textInfo.len - maxLen) / 2;
				offset = labels.textAlign == "near" ? offset * -1 : offset;

				if (isVertical) {
					textElement.translate(offset, 0);
				}
				else {
					textElement.translate(0, offset);
				}
			})

			for (var idx = 0; idx < lenMinor; idx++) {
				var val = minorTickValues[idx];
				if (val > min && val < max) {
					this._paintMajorMinor(max, min, val, tickMinor, unitMinor, tickRectMinor, compass, startPoint, endPoint, axisSize, axisTextOffset, tickMinorStyle, null, gridMinor, axisOptions.textVisible);
				}
			}

			this._paintAxisText(axisOptions, axisInfo);
		},

		_paintAxisText: function (axisOptions, axisInfo) {
			var text = axisOptions.text;

			if (text == null || text.length == 0) {
				return;
			}

			var compass = axisOptions.compass;
			var align = axisOptions.alignment;
			var startX = this.canvasBounds.startX;
			var startY = this.canvasBounds.startY;
			var endX = this.canvasBounds.endX;
			var endY = this.canvasBounds.endY;
			var x = startX;
			var y = startY;
			var textBounds = axisInfo.textBounds;
			var isVertical = this._isVertical(compass);
			var axisTextOffset = axisInfo.axisTextOffset;
			var tickRectMajor = axisInfo.majorTickRect;
			var tick = axisOptions.tickMajor.position;
			var tickLength = isVertical ? tickRectMajor.width : tickRectMajor.height;

			if (tick == "cross") {
				tickLength = tickLength / 2;
			}
			else if (tick == "inside") {
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

				if (compass == "west") {
					x = startX - (axisInfo.offset + axisTextOffset + tickLength + textBounds.height / 2);
				}
				else {
					x = endX + axisInfo.offset + axisTextOffset + tickLength + textBounds.height / 2;
				}
			}
			else {
				switch (align) {
					case "near":
						x = startX + textBounds.width / 2
						break;
					case "center":
						x = (startX + endX) / 2;
						break;
					case "far":
						x = endX - textBounds.width / 2;
						break;
				}

				if (compass == "north") {
					y = startY - (axisInfo.offset + axisTextOffset + tickLength + textBounds.height / 2);
				}
				else {
					y = endY + axisInfo.offset + axisTextOffset + tickLength + textBounds.height / 2;
				}
			}

			var textElement = this._text(x, y, text);
			this.axisEles.push(textElement);
			var textStyle = $.extend(true, {}, this.options.textStyle, axisOptions.textStyle);
			textElement.attr(textStyle);

			if (isVertical) {
				textElement.rotate(-90);
			}
		},

		_resetMinorTickValues: function (minorTickValues, majorTickValues) {
			for (var i = minorTickValues.length - 1; i >= 0; i--) {
				var minorTickValue = minorTickValues[i];
				for (var j = majorTickValues.length - 1; j >= 0; j--) {
					var majorTickValue = majorTickValues[j];
					if (minorTickValue == majorTickValue) {
						minorTickValues.splice(i, 1);
					}
				}
			}
			return minorTickValues;
		},

		_paintMajorMinor: function (max, min, val, tick, unit, tickRect, compass, startPoint, endPoint, axisSize, axisTextOffset, tickStyle, text, grid, textVisible, textStyle, textAlign) {
			var x = startPoint.x;
			var y = startPoint.y;
			var tickX = -1;
			var tickY = -1;
			var isVertical = true;
			var bs = this.canvasBounds;
			var textInfo = null;
			switch (compass) {
				case "south":
					if (tick == "inside") {
						y -= tickRect.height;
					}
					else if (tick == "cross") {
						y -= tickRect.height / 2;
					}
					tickY = y + axisTextOffset + tickRect.height + axisSize / 2;
					isVertical = false;
					break;
				case "west":
					if (tick == "outside") {
						x -= tickRect.width;
					}
					else if (tick == "cross") {
						x -= tickRect.width / 2;
					}
					tickX = x - (axisTextOffset + axisSize / 2);
					break;
				case "north":
					if (tick == "outside") {
						y -= tickRect.height;
					}
					else if (tick == "cross") {
						y -= tickRect.height / 2;
					}
					tickY = y - (axisTextOffset + axisSize / 2);
					isVertical = false;
					break;
				case "east":
					if (tick == "inside") {
						x -= tickRect.width;
					}
					else if (tick == "cross") {
						x -= tickRect.width / 2;
					}
					tickX = x + axisTextOffset + tickRect.width + axisSize / 2;
					break;
			}
			var tickElement = null;
			var pathArr = [];
			var style = {
				"stroke-width": 2
			};
			if (isVertical) {
				y += (val - min) / (max - min) * (endPoint.y - startPoint.y);
				if (grid.visible) {
					if ((y != bs.startY && compass == "east") || (y != bs.endY && compass == "west")) {
						var arrPath = ["M", bs.startX, y, "H", bs.endX];
						var p = this.canvas.path(arrPath.concat(" "));
						p.attr(grid.style);
						this.axisEles.push(p);
					}
				}
				//y -= tickRect.height / 2
				tickY = y;

				var pathArr = ["M", x, y, "h", tickRect.width];
				tickStyle["stroke-width"] = tickRect.height;
			}
			else {
				x += (val - min) / (max - min) * (endPoint.x - startPoint.x);
				if (grid.visible) {
					if ((x != bs.startX && compass == "south") || (x != bs.endX && compass == "north")) {
						var arrPath = ["M", x, bs.startY, "V", bs.endY];
						var p = this.canvas.path(arrPath.concat(" "));
						p.attr(grid.style);
						this.axisEles.push(p);
					}
				}
				//x -=  tickRect.width / 2;
				tickX = x;

				var pathArr = ["M", x, y, "v", tickRect.height];
				tickStyle["stroke-width"] = tickRect.width;
			}

			tickElement = this.canvas.path(pathArr.concat(" "));
			style = $.extend(style, tickStyle);
			tickElement.attr(style);
			this.axisEles.push(tickElement);

			//var rect = this.canvas.rect(x, y , tickRect.width, tickRect.height);
			//if (autoFormat) {
			//	rect.attr(tickStyle);
			//}
			//this.axisEles.push(rect);
			if (text != null) {
				var txt = this._text(tickX, tickY, text.toString());
				txt.attr(textStyle);
				this.axisEles.push(txt);
				if (!textVisible) {
					txt.hide();
				}

				if (textAlign != "center") {
					var textBounds = txt.wijGetBBox();
					textInfo = { text: txt, len: isVertical ? textBounds.width : textBounds.height };
				}
			}

			return textInfo;
		},

		_paintPlotArea: function () {
		},

		_paintChartLabels: function () {
			var chartLabels = this.options.chartLabels;
			if (chartLabels && chartLabels.length) {
				for (var i = 0, ii = chartLabels.length; i < ii; i++) {
					var chartLabel = $.extend(true, {
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
					}, chartLabels[i]);
					if (chartLabel.visible) {
						var point = this._getChartLabelPointPosition(chartLabel);
						if (isNaN(point.x) || isNaN(point.y)) {
							break;
						}
						this._setChartLabel(chartLabel, point);
					}
				}
			}
		},

		_getChartLabelPointPosition: function (chartLabel) {
		},

		_setChartLabel: function (chartLabel, point, angle, calloutStyle) {
			var compass = chartLabel.compass;
			var o = this.options;
			var textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
			var text = this._text(0, 0, chartLabel.text).attr(textStyle);
			this.chartLabelEles.push(text);
			var offset = chartLabel.offset;

			var position = this._getCompassTextPosition(compass, text.wijGetBBox(), offset, point, angle);
			if (offset && chartLabel.connected) {
				var p = this.canvas.path("M" + point.x + " " + point.y + "L" + position.endPoint.x + " " + position.endPoint.y);
				p.attr(calloutStyle);
				this.chartLabelEles.push(p);
			}

			text.translate(position.endPoint.x + position.offsetX, position.endPoint.y + position.offsetY);
			text.toFront();
		},

		_getCompassTextPosition: function (compass, box, offset, point, angle) {
			var offsetX = 0;
			var offsetY = 0;
			var endPoint = { x: 0, y: 0 };

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

			endPoint = this.canvas.wij.getPositionByAngle(point.x, point.y, offset, angle);
			return {
				endPoint: endPoint,
				offsetX: offsetX,
				offsetY: offsetY
			};
		},

		_getXSortedPoints: function (series) {
			var seriesX = series.data.x;
			var tempX = [].concat(seriesX);
			var tempY = [].concat(series.data.y);
			var points = [];
			var sortedX = seriesX;

			if (seriesX.length == 0) {
				return;
			}

			function sortNumber(a, b) {
				return a - b;
			};

			if (typeof (seriesX[0]) == "number") {
				sortedX = [].concat(seriesX).sort(sortNumber);
			}

			$.each(sortedX, function (i, nSortedX) {
				$.each(tempX, function (j, nx) {
					if (nSortedX == nx) {
						if (isNaN(nx)) {
							nx = i;
						}
						points.push({ x: nx, y: tempY[j] });
						tempX.splice(j, 1);
						tempY.splice(j, 1);
						return false;
					}
				})
			})

			return points;
		},

		_bindLiveEvents: function () {
		},

		_unbindLiveEvents: function () {
		},

		_isBarChart: function () {
			return this.widgetName == "wijbarchart";
		},

		//methods for Axis
		_calculateParameters: function (axisInfo, axisOptions) {
			//var maxData = this._getDataMax();
			//var minData = this._getDataMin();
			var maxData = axisOptions.max;
			var minData = axisOptions.min;
			var autoMax = axisOptions.autoMax;
			var autoMin = axisOptions.autoMin;
			var autoMajor = axisOptions.autoMajor;
			var autoMinor = axisOptions.autoMinor;
			var axisAnno = null;
			var isVL = axisOptions.annoMethod == "valueLabels";

			if (autoMax && maxData != Number.MIN_VALUE) {
				if (axisInfo.id != "x" && this._isBarChart()) {
					if (maxData < 0.0 && (0.5 * (maxData - minData) > -maxData)) {
						maxData = 0.0;
					}
				}
			}

			if (autoMin && minData != Number.MAX_VALUE) {
				if (axisInfo.id != "x" && this._isBarChart()) {
					if (minData > 0.0 && (0.5 * (maxData - minData) > minData)) {
						minData = 0.0;
					}
				}
			}

			if (maxData == minData) {
				if (minData != 0) {
					minData -= 1;
				}
				maxData += 1;
			}
			var dx = maxData - minData;
			var tinc = 0;
			var isTime = axisInfo.isTime;

			if (isTime) {
				axisAnno = axisOptions.annoFormatString;
				if (axisAnno == null || axisAnno.length == 0) {
					axisAnno = this._getTimeDefaultFormat(maxData, minData);
					axisInfo.annoFormatString = axisAnno;
				}
				tinc = this._niceTimeUnit(0.0, axisAnno);
			}
			var prec = this._nicePrecision(dx);
			axisInfo.tprec = prec;
			if (autoMax) {
				if (isTime) {
					var newmax = this._roundTime(maxData, tinc, true);
					if (newmax < maxData) {
						maxData = newmax + tinc;
					}
					else {
						maxData = newmax;
					}
				}
				else {
					var newmax = this._precCeil(-prec, maxData);
					if (!isNaN(newmax)) {
						maxData = newmax;
					}
				}
			}
			if (autoMin) {
				if (isTime) {
					var newmin = this._roundTime(minData, tinc, false);
					if (newmin > minData) {
						minData = newmin - tinc;
					}
					else {
						minData = newmin;
					}
				}
				else {
					var newmin = this._precFloor(-prec, minData);
					if (!isNaN(newmin)) {
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
				this._calculateMajorMinor(axisOptions, axisInfo);
				//this._calculateMajorMinor(isTime, axisAnno, tinc);
				var major = axisOptions.unitMajor;
				//var minor = axisOptions.unitMinor;
				if (autoMax && major != 0 && !isTime && !isVL) {
					dx = maxData - parseInt(maxData / major) * major;

					if (dx != 0) {
						maxData += (major - dx);
						maxData = this._precCeil(-prec, maxData);
					}
				}

				if (autoMin && major != 0 && !isTime && !isVL) {
					dx = minData - parseInt(minData / major) * major;

					if (dx != 0) {
						if (dx < 0) {
							dx += major;
						}

						minData -= Math.abs(dx); 	// should always be less.
						minData = this._precFloor(-prec, minData);
					}
				}
			}

			if (!autoMajor || !autoMinor) {
				//TODO:
			}

			axisInfo.max = maxData;
			axisInfo.min = minData;
		},

		_roundTime: function (timevalue, unit, roundup) {
			var tunit = unit * this._tmInc.day;
			var tv = this._fromOADate(timevalue);
			if (tunit > 0) {
				var th = {
					year: tv.getFullYear(),
					month: tv.getMonth(),
					day: tv.getDate(),
					hour: tv.getHours(),
					minute: tv.getMinutes(),
					second: tv.getSeconds()
				}
				if (tunit < this._tmInc.minute) {
					th.second = this._tround(th.second, tunit, roundup);
					return this._getTimeAsDouble(th);
				}

				th.second = 0;
				if (tunit < this._tmInc.hour) {
					tunit /= this._tmInc.minute;
					th.minute = this._tround(th.minute, tunit, roundup);
					return this._getTimeAsDouble(th);
				}

				th.minute = 0;
				if (tunit < this._tmInc.day) {
					tunit /= this._tmInc.hour;
					th.hour = this._tround(th.hour, tunit, roundup);
					return this._getTimeAsDouble(th);
				}

				th.hour = 0;
				if (tunit < this._tmInc.month) {
					tunit /= this._tmInc.day;
					th.day = this._tround(th.day, tunit, roundup);
					return this._getTimeAsDouble(th);
				}

				th.day = 1;
				if (tunit < this._tmInc.year) {
					tunit /= this._tmInc.month;
					th.month = this._tround(th.month, tunit, roundup);
					return this._getTimeAsDouble(th);
				}

				//th.month = 1;
				th.month = 0; // the month start from 0 in javascript.
				tunit /= this._tmInc.year;
				th.year = this._tround(th.year, tunit, roundup);
				return this._getTimeAsDouble(th);
			}
			else {
				var td = tv;
				var tx = td - tunit;
				var tz = parseInt(tx / unit) * unit;
				if (roundup && tz != tx) {
					tz += unit;
				}
				td = tunit + tz;
				return td;
			}
		},

		_tround: function (tval, tunit, roundup) {
			var test = parseInt((tval / tunit) * tunit);
			if (roundup && test != tval) {
				test += parseInt(tunit);
			}
			return test;
		},

		_getTimeAsDouble: function (th) {
			var smon = 0, sday = 0;
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
			var newDate = new Date(th.year, th.month, th.day, th.hour, th.minute, th.second);
			newDate.setDate(newDate.getDate() + sday);
			newDate.setMonth(newDate.getMonth() + smon);
			return this._toOADate(newDate);
		},

		_getTimeDefaultFormat: function (max, min) {
			var range = (max - min) * this._tmInc.day;
			var format = "s";
			if (range > 2 * this._tmInc.year) {
				format = "yyyy";
			}
			else if (range > this._tmInc.year) {
				format = "MMM yy";
			}
			else if (range > 3 * this._tmInc.month) {
				format = "MMM";
			}
			else if (range > 2 * this._tmInc.week) {
				format = "MMM d";
			}
			else if (range > 2 * this._tmInc.day) {
				format = "ddd d";
			}
			else if (range > this._tmInc.day) {
				format = "ddd H:mm";
			}
			else if (range > this._tmInc.hour) {
				format = "H:mm";
			}
			else if (range >= 1000) {
				format = "H:mm:ss";
			}
			else if (range > 0) {
				//TODO: return millisecond
			}
			return format;
		},

		_niceTimeUnit: function (timeinc, manualFormat) {
			var tsRange = timeinc * this._tmInc.day;
			tsRange = this._niceTimeSpan(tsRange, manualFormat);
			return tsRange / this._tmInc.day;
		},

		_niceTimeSpan: function (range, manualFormat) {
			var minSpan = this._manualTimeInc(manualFormat);
			var tsinc = 0, tinc = 0;
			if (minSpan < this._tmInc.second) {
				//TODO: calculate when millisecond
			}
			tsinc = Math.ceil(range);
			if (tsinc == 0) {
				return this._timeSpanFromTmInc(minSpan);
			}
			tinc = 1;
			if (minSpan < this._tmInc.minute) {
				if (tsinc < this._tmInc.minute) {
					tinc = this._getNiceInc([1, 2, 5, 10, 15, 30], tsinc, minSpan);
					if (tinc != 0) {
						return tinc;
					}
				}
				minSpan = this._tmInc.minute;
			}
			if (minSpan < this._tmInc.hour) {
				if (tsinc < this._tmInc.hour) {
					tinc = this._getNiceInc([1, 2, 5, 10, 15, 30], tsinc, minSpan)
					if (tinc != 0) {
						return tinc;
					}
				}
				minSpan = this._tmInc.hour;
			}
			if (minSpan < this._tmInc.day) {
				if (tsinc < this._tmInc.day) {
					tinc = this._getNiceInc([1, 3, 6, 12], tsinc, minSpan);
					if (tinc != 0) {
						return tinc;
					}
				}
				minSpan = this._tmInc.day;
			}
			if (minSpan < this._tmInc.month) {
				if (tsinc < this._tmInc.month) {
					tinc = this._getNiceInc([1, 2, 7, 14], tsinc, minSpan);
					if (tinc != 0) {
						return tinc;
					}
				}
				minSpan = this._tmInc.month;
			}
			if (minSpan < this._tmInc.year) {
				if (tsinc < this._tmInc.year) {
					tinc = this._getNiceInc([1, 2, 3, 4, 6], tsinc, minSpan);
					if (tinc != 0) {
						return tinc;
					}
				}
				minSpan = this._tmInc.year;
			}
			tinc = 100 * this._tmInc.year;
			if (tsinc < tinc) {
				tinc = this._getNiceInc([1, 2, 5, 10, 20, 50], tsinc, minSpan);
				if (tinc == 0) {
					tinc = 100 * this._tmInc.year;
				}
			}
			return tinc;
		},

		_getNiceInc: function (tik, ts, mult) {
			for (var i = 0, ii = tik.length; i < ii; i++) {
				var tikm = tik[i] * mult;
				if (ts <= tikm) {
					return tikm;
				}
			}
			return 0;
		},

		_timeSpanFromTmInc: function (ti) {
			var rv = 1000;
			if (ti != this._tmInc.maxtime) {
				if (ti > this._tmInc.tickf1) {
					rv = ti;
				}
				else {
					var rti = ti;
					var ticks = 1;
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
			if (manualFormat == null || manualFormat.length == 0) {
				return minSpan;
			}
			var f = manualFormat.indexOf("f");
			if (f > 0) {
				//TODO: when _getTimeDefaultFormat return millisecond
			}
			else if (manualFormat.indexOf("s") >= 0) {
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
			if (x == 0 || x == 0.0) {
				return x;
			}
			else if (x < 0) {
				x = -x;
			}
			var log10 = Math.log(x) / Math.log(10);
			var exp = parseInt(this._signedFloor(log10));
			var f = x / Math.pow(10.0, exp);
			var nf = 10.0;
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
			if (x == 0 || x == 0.0) {
				return x;
			}
			else if (x < 0) {
				x = -x;
			}
			var f = x / Math.pow(10.0, exp);
			var nf = 10.0;
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
			if (range <= 0 || isNaN(range)) {
				return 0;
			}
			var log10 = Math.log(range) / Math.log(10);
			var exp = parseInt(this._signedFloor(log10));
			var f = range / Math.pow(10.0, exp);
			if (f < 3.0) {
				exp = -exp + 1;
			}
			return exp;
		},

		_precCeil: function (prec, value) {
			var f = Math.pow(10.0, prec);
			var x = value / f;
			x = Math.ceil(x);
			return x * f;
		},

		_precFloor: function (prec, value) {
			var f = Math.pow(10.0, prec);
			var x = value / f;
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
			var o = this.options;
			var seriesList = o.seriesList;
			var stacked = o.stacked;
			var is100Percent = o.is100Percent;
			var axis = o.axis;

			if (!seriesList || seriesList.length == 0) {
				return val;
			}
			var valuesY0 = [];
			for (var i = 0, ii = seriesList.length; i < ii; i++) {
				var data = seriesList[i].data;
				var valuesX = [].concat(data.x);
				var valuesY = [].concat(data.y);
				var valuesXY = [].concat(data.xy);
				if (data.xy) {
					valuesX = [], valuesY = [];
					var j = 0, idx = 0, jj = valuesXY.length;
					while (j < jj) {
						valuesX[idx] = valuesXY[j];
						valuesY[idx] = valuesXY[j + 1];
						j += 2;
						idx++;
						data.x = valuesX;
						data.y = valuesY;
					}
				}
				else if (!data.x) {
					valuesX = [];
					for (var j = 0, jj = valuesY.length; j < jj; j++) {
						valuesX[j] = j;
					}
					data.x = valuesX;
				}

				if (stacked) {

					if (i > 0) {
						for (var idx = 0; idx < valuesY.length; idx++) {
							valuesY[idx] += valuesY0[idx];
						}
					}

					valuesY0 = [].concat(valuesY);
				}

				var xMinMax = this._getMinMaxValue(valuesX);
				var yMinMax = this._getMinMaxValue(valuesY);
				if (i == 0) {
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
			}

			if (is100Percent) {
				val.tyx = 1;
				val.tyn = 0;
			}

			if (valuesX.length) {
				if (isNaN(valuesX[0])) {
					//var valueX = valuesX[0];
					var valueLabels = [];
					for (var i = 0, ii = valuesX.length; i < ii; i++) {
						var valueLabel = {
							text: valuesX[i],
							value: i
						}
						valueLabels.push(valueLabel);
					}
					axis.x.annoMethod = "valueLabels";
					axis.x.valueLabels = valueLabels;
					axis.x.autoMajor = false;
					axis.x.autoMinor = false;
					axis.x.unitMajor = 1;
					axis.x.unitMinor = 0.5;
				}
				else if (this._isDate(valuesX[0])) {
					this.axisInfo.x.isTime = true;
				}
			}
			if (valuesY.length) {
				if (isNaN(valuesY[0])) {
					//var valueY = valuesY[0];
					var valueLabels = [];
					for (var i = 0, ii = valuesY.length; i < ii; i++) {
						var valueLabel = {
							text: valuesY[i],
							value: i
						}
						valueLabels.push(valueLabel);
					}
					axis.y.annoMethod = "valueLabels";
					axis.y.valueLabels = valueLabels;
					axis.y.autoMajor = false;
					axis.y.autoMinor = false;
					axis.y.unitMajor = 1;
					axis.x.unitMinor = 0.5;
				}
				else if (this._isDate(valuesY[0])) {
					//this.axisInfo.y.isTime = true;
				}
			}
			return val;
		},

		_isDate: function (obj) {
			return (typeof obj == 'object') && obj.constructor == Date;
		},

		_getMinMaxValue: function (array) {
			var val = {
				min: 0,
				max: 0
			}
			if (!array.length) {
				return;
			}
			if (isNaN(array[0])) {
				if (this._isDate(array[0])) {
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
			for (var i = 0; i < array.length; i++) {
				if (array[i] < val.min) {
					val.min = array[i];
				}
				else if (array[i] > val.max) {
					val.max = array[i];
				}
			}
			if (this._isDate(val.min)) {
				val.min = this._toOADate(val.min);
				val.max = this._toOADate(val.max);
			}
			return val;

		},

		_toOADate: function (time) {
			var oaDate = (time - new Date(1900, 0, 1)) / this._tmInc.day + 2;
			return oaDate;
		},

		_fromOADate: function (oaDate) {
			var time = new Date((oaDate - 2) * this._tmInc.day + new Date(1900, 0, 1).getTime());
			return time;
		},

		_isVertical: function (compass) {
			return compass == "west" || compass == "east";
		},

		_calculateMajorMinor: function (axisOptions, axisInfo) {
			var autoMajor = axisOptions.autoMajor;
			var autoMinor = axisOptions.autoMinor;
			var maxData = axisInfo.max;
			var minData = axisInfo.min;
			var isTime = axisInfo.isTime;
			//var axisAnno = axisInfo.axisAnno;
			var tinc = axisInfo.tinc;

			if (autoMajor || autoMinor) {
				var dx = maxData - minData;
				var sizeMax = null, sizeMin = null;
				var textStyle = $.extend(true, {}, this.options.textStyle, axisOptions.textStyle, axisOptions.labels.style);
				if (isTime) {
					var formatString = axisInfo.annoFormatString;
					var maxText = $.format(this._fromOADate(maxData), formatString);
					var minText = $.format(this._fromOADate(minData), formatString);
					var mx = this._text(-100, -100, maxText).attr(textStyle);
					var mn = this._text(-100, -100, minText).attr(textStyle);
					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();
					mx.remove();
					mn.remove();
				}
				else {
					var prec = this._nicePrecision(dx);
					var _prec = prec + 1;
					if (_prec < 0 || _prec > 15) {
						_prec = 0;
					}
					var mx = this._text(-100, -100, this.canvas.wij.round(maxData, _prec)).attr(textStyle);
					var mn = this._text(-100, -100, this.canvas.wij.round(minData, _prec)).attr(textStyle);
					sizeMax = mx.wijGetBBox();
					sizeMin = mn.wijGetBBox();
					mx.remove();
					mn.remove();
				}
				var nticks = 0;
				var major = 0;

				if (sizeMax.width < sizeMin.width) {
					sizeMax.width = sizeMin.width;
				}
				if (sizeMax.height < sizeMin.height) {
					sizeMax.height = sizeMin.height;
				}

				if (!this._isVertical(axisOptions.compass)) {
					//Add comments by RyanWu@20100907.
					//Subtract axisTextOffset because we must left the space between major text and major rect.
					var width = this.canvasBounds.endX - this.canvasBounds.startX - axisInfo.offset - axisInfo.axisTextOffset;
					major = width / sizeMax.width;
					if (Number.POSITIVE_INFINITY == major) {
						nticks = 0;
					}
					else {
						nticks = parseInt(major);
					}
				}
				else {
					var height = this.canvasBounds.endY - this.canvasBounds.startY - axisInfo.offset - axisInfo.axisTextOffset;
					major = height / sizeMax.height;
					if (Number.POSITIVE_INFINITY == major) {
						nticks = 0;
					}
					else {
						nticks = parseInt(major);
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
							major = this._niceTimeUnit(dx, axisInfo.annoFormatString);
						}
					}
					else {
						axisInfo.tprec = this._nicePrecision(dx);
						major = this._niceNumber(2 * dx, -prec, true);
						if (major < dx) {
							major = this._niceNumber(dx, -prec + 1, false);
						}
						if (major < dx) {
							major = this._niceTickNumber(dx);
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

			if (dx == 0) {
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
						var classes = (node.className ? node.className.baseVal : node.getAttribute('class'));
						if ($.inArray(className, classes.split(/\s+/)) == -1) {
							classes += (classes ? ' ' : '') + className;
							(node.className ? node.className.baseVal = classes :
							node.setAttribute('class', classes));
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
					var classes = (node.className ? node.className.baseVal : node.getAttribute('class'));
					classes = $.grep(classes.split(/\s+/), function(n, i) { return n != className; }).
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
})(jQuery);
