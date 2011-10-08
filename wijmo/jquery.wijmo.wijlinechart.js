/*globals $, Raphael, jQuery, document, window*/
/*
 *
 * Wijmo Library 1.5.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
 *
 *
 * * Wijmo LineChart widget.
 *
 * Depends:
 *	raphael.js
 *	globalize.js
 *	jquery.ui.widget.js
 *	jquery.wijmo.wijchartcore.js
 *
 */
 
(function () {
	"use strict";
	if (!window.Raphael) {
		return;
	}

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

}());

(function ($) {
	"use strict";
	$.widget("wijmo.wijlinechart", $.wijmo.wijchartcore, {
		// widget options    
		options: {
			/// <summary>
			/// A value that indicates whether to show the animation
			/// and the duration for the animation.
			/// Default: {direction: "horizontal",enabled:true, 
			/// duration:2000, easing: ">"}.
			/// Type: Object.
			/// </summary>
			animation: {
				/// <summary>
				/// A value that determines whether to show the animation.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				enabled: true,
				/// <summary>
				/// A value that determines the effect for the animation.
				/// Default: true.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'horizontal', 'vertical'.
				/// </remarks>
				direction: "horizontal",
				/// <summary>
				/// A value that indicates the duration for the animation.
				/// Default: 2000.
				/// Type: Number.
				/// </summary>
				duration: 2000,
				/// <summary>
				/// A value that indicates the easing for the animation.
				/// Default: ">".
				/// Type: string.
				/// </summary>
				easing: ">"
			},
			/// <summary>
			/// A value that indicates whether to show animation 
			///	and the duration for the animation when reload data.
			/// Default: {enabled:true, duration:2000, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#linechart").wijlinechart({
			///      animation: {enabled: true, duration: 1000, easing: "<"}
			///  });
			/// </summary>
			seriesTransition: {
				/// <summary>
				/// A value that determines whether to show animation when reload.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				enabled: true,
				/// <summary>
				/// A value that indicates the duration for the series transition.
				/// Default: 2000.
				/// Type: Number.
				/// </summary>
				duration: 2000,
				/// <summary>
				/// A value that indicates the easing for the series transition.
				/// Default: ">".
				/// Type: string.
				/// </summary>
				easing: ">"
			},
			/// <summary>
			/// A value that indicates whether to zoom in on the line and marker on hover.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			zoomOnHover: true,
			/// <summary>
			/// Occurs when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({mouseDown: function(e, data) { } });
			/// Bind to the event by type: wijlinechartmousedown
			/// $("#linechart").bind("wijlinechartmousedown", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the mousedown line or marker. 
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			mouseDown: null,
			/// <summary>
			/// Occurs when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({mouseUp: function(e, data) { } });
			/// Bind to the event by type: wijlinechartmouseup
			/// $("#linechart").bind("wijlinechartmouseup", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the mouseup line or marker.  
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			mouseUp: null,
			/// <summary>
			/// Occurs when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({mouseOver: function(e, data) { } });
			/// Bind to the event by type: wijlinechartmouseover
			/// $("#linechart").bind("wijlinechartmouseover", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the mouseover line or marker.  
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			mouseOver: null,
			/// <summary>
			/// Occurs when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({mouseOut: function(e, data) { } });
			/// Bind to the event by type: wijlinechartmouseout
			/// $("#linechart").bind("wijlinechartmouseout", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the mouseout line or marker. 
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			mouseOut: null,
			/// <summary>
			/// Occurs when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({mouseMove: function(e, data) { } });
			/// Bind to the event by type: wijlinechartmousemove
			/// $("#linechart").bind("wijlinechartmousemove", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the mousemove line or marker. 
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			mouseMove: null,
			/// <summary>
			/// Occurs when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#linechart").wijlinechart({click: function(e, data) { } });
			/// Bind to the event by type: wijlinechartclick
			/// $("#linechart").bind("wijlinechartclick", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos
			/// of the clicked line or marker.  
			/// data.type: type of the target. Its value is "line" or "marker".
			/// If data.type is "marker", the data's params are below:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// If data.type is "line", the data's params are below:
			/// data.data: data of the series of the line.
			/// data.fitType: fit type of the line.
			/// data.index: index of the line.
			/// data.label: label of the line.
			/// data.legendEntry: legend entry of the line.
			/// data.lineMarkers: collection of the markers of the line.
			/// data.lineStyle: style of the line.
			/// data.markers: marker type and visibility of the line.
			/// data.path: the Raphael object of the line.
			/// data.visible: visibility of the line.
			///	</param>
			click: null
		},

		// widget creation:    
		_create: function () {
			var self = this;
			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijlinechart");
			self.paths = [];
			self.shadowPaths = [];
			self.markersSet = [];
			self.animationSet = self.canvas.set();
			self.symbols = [];
			self.hoverPoint = null;
			self.hoverLine = null;
			self.linesStyle = [];
			self.shadow = true;
		},

		destroy: function () {
			var self = this;
			self.chartElement.removeClass("wijmo-wijlinechart");
			$.wijmo.wijchartcore.prototype.destroy.apply(self, arguments);

			if (self.aniPathsAttr && self.aniPathsAttr.length) {
				$.each(self.aniPathsAttr, function (idx, pathAttr) {
					pathAttr = null;
				});
				self.aniPathsAttr = null;
			}
		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */

		/* returns reference to raphael's path object
			for the line data with given index */
		getLinePath: function (lineIndex) {
			return this.paths[lineIndex];
		},

		/* returns reference to set of the raphael's objects(circles)
			what represents markers for the line data with given index */
		getLineMarkers: function (lineIndex) {
			var o = this.options,
				und;
			if (o.seriesList && o.seriesList[lineIndex].markers && 
					o.seriesList[lineIndex].markers.visible) {
				return this.markersSet[lineIndex];
			} else {
				return und;
			}
		},

		/** Private methods */
	
		_getAnchors: function (p1x, p1y, p2x, p2y, p3x, p3y) {
			var l1 = (p2x - p1x) / 2,
				l2 = (p3x - p2x) / 2,
				a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
				b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y)),
				alpha = 0, 
				dx1 = 0, 
				dy1 = 0, 
				dx2 = 0, 
				dy2 = 0;
			a = p1y < p2y ? Math.PI - a : a;
			b = p3y < p2y ? Math.PI - b : b;
			alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2;
			dx1 = l1 * Math.sin(alpha + a);
			dy1 = l1 * Math.cos(alpha + a);
			dx2 = l2 * Math.sin(alpha + b);
			dy2 = l2 * Math.cos(alpha + b);
			return {
				x1: p2x - dx1,
				y1: p2y + dy1,
				x2: p2x + dx2,
				y2: p2y + dy2
			};
		},

		_paintLegend: function () {
			var o = this.options,
				i = 0, 
				ii = 0, 
				idx = 0,
				legendIcon = null,
				chartsSeries = o.seriesList,
				chartsSeriesStyles = o.seriesStyles,
				chartSeries = null, 
				chartSeriesStyle = null, 
				box = null,
				x = 0, 
				y = 0,
				markerStyle = null, 
				type = null, 
				dot = null;
			$.extend(true, o, {
				legend: {
					size: {
						width: 30,
						height: 3
					}
				}
			});

			$.wijmo.wijchartcore.prototype._paintLegend.apply(this, arguments);

			if (o.legend.visible) {
				//set fill attr to legendIcons
				if (this.legends.length && this.legendIcons.length) {
					for (i = 0, ii = this.legendIcons.length; i < ii; i++) {
						legendIcon = this.legendIcons[i];
						legendIcon.attr({
							fill: legendIcon.attr("stroke")
						});
					}
				}
				//add marker to legendIcons
				if (!o.legend.reversed) {
					for (i = 0, ii = chartsSeries.length; i < ii; i++) {
						chartSeries = chartsSeries[i];
						chartSeriesStyle = chartsSeriesStyles[i];
						if (chartSeries.legendEntry) {
							if (chartSeries.markers && chartSeries.markers.visible) {
								legendIcon = this.legendIcons[i];
								box = legendIcon.wijGetBBox();
								x = box.x + box.width / 2;
								y = box.y + box.height / 2;
								markerStyle = chartSeries.markerStyle;
								markerStyle = $.extend({
									fill: chartSeriesStyle.stroke,
									stroke: chartSeriesStyle.stroke,
									opacity: 1
								}, markerStyle);
								type = chartSeries.markers.type;
								if (!type) {
									type = "circle";
								}
								dot = this._paintMarker(type, x, y, 3);
								dot.attr(markerStyle);
								this.legendEles.push(dot);
							}
							idx++;
						}
					}
				} else {
					for (i = chartsSeries.length - 1; i >= 0; i--) {
						chartSeries = chartsSeries[i];
						chartSeriesStyle = chartsSeriesStyles[i];
						if (chartSeries.legendEntry && chartSeries.markers.visible) {
							if (chartSeries.markers.visible) {
								legendIcon = this.legendIcons[i];
								box = legendIcon.wijGetBBox();
								x = box.x + box.width / 2;
								y = box.y + box.height / 2;
								markerStyle = chartSeries.markerStyle;
								markerStyle = $.extend({
									fill: chartSeriesStyle.stroke,
									stroke: chartSeriesStyle.stroke,
									opacity: 1
								}, markerStyle);
								type = chartSeries.markers.type;
								if (!type) {
									type = "circle";
								}
								dot = this._paintMarker(type, x, y, 3);
								dot.attr(markerStyle);
							}
							idx++;
						}
					}
				}
			}
		},
	
		_clearChartElement: function () {
			var self = this;
			self.linesStyle = [];
			if (self.paths.length) {
				$.each(self.paths, function (idx, path) {
					path.wijRemove();
					path = null;
				});
				self.paths = [];
			}
			if (self.shadowPaths.length) {
				$.each(self.shadowPaths, function (idx, shadowPath) {
					shadowPath.wijRemove();
					shadowPath = null;
				});
				self.shadowPaths = [];
			}
			if (self.markersSet.length) {
				$.each(self.markersSet, function (idx, markerSet) {
					$.each(markerSet, function (idx, set) {
						set.wijRemove();
						set = null;
					});
					markerSet = null;
				});
				self.markersSet = [];
			}
			if (self.animationSet.length) {
				$.each(self.animationSet, function (idx, animationSet) {
					animationSet.wijRemove();
					animationSet = null;
				});
				self.animationSet = self.canvas.set();
			}
			if (self.symbols.length) {
				$.each(self.symbols, function (idx, symbol) {
					symbol.wijRemove();
					symbol = null;
				});
				self.symbols = [];
			}
			$.wijmo.wijchartcore.prototype._clearChartElement.apply(self, arguments);
		},
	
		_paintMarker: function (type, x, y, length) {
			var self = this,
				marker = null;
			switch (type) {
			case "circle":
				marker = self.canvas.circle(x, y, length);
				break;
			case "tri":
				marker = self.canvas.tri(x, y, length);
				break;
			case "invertedTri":
				marker = self.canvas.invertedTri(x, y, length);
				break;
			case "box":
				marker = self.canvas.box(x, y, length);
				break;
			case "diamond":
				marker = self.canvas.diamond(x, y, length);
				break;
			case "cross":
				marker = self.canvas.cross(x, y, length);
				break;
			}
			return marker;
		},

		_getPathArrByFitType: function (pathArr, fitType, j, jj, cBounds, valuesX,
				valuesY, X, Y, isXTime, isYTime, plotInfo, valX, valY) {
			var valY0 = null, 
				valY2 = null,
				Y0 = 0, 
				Y2 = 0, 
				X0 = 0, 
				X2 = 0,
				valX0 = null, 
				valX2 = null, 
				a = null,
				minY = plotInfo.minY, 
				minX = plotInfo.minX,
				kx = plotInfo.kx, 
				ky = plotInfo.ky;
			if (fitType === "line") {
				pathArr = pathArr.concat([j ? "L" : "M", X, Y]);
			} else if (fitType === "spline") {
				if (!j) {
					pathArr = ["M", X, Y, "C", X, Y];
				} else if (j && j < jj - 1) {
					valY0 = valuesY[j - 1];
					valY2 = valuesY[j + 1];
					if (isYTime) {
						valY0 = this._toOADate(valY0);
						valY2 = this._toOADate(valY2);
					}
					Y0 = cBounds.endY - (valY0 - minY) * ky;
					Y2 = cBounds.endY - (valY2 - minY) * ky;
					if (isNaN(valX) || typeof valX ===  "string") {
						X0 = cBounds.startX + (j - 1 - minX) * kx;
						X2 = cBounds.startX + (j + 1 - minX) * kx;
					} else {
						valX0 = valuesX[j - 1];
						valX2 = valuesX[j + 1];
						if (isXTime) {
							valX0 = this._toOADate(valX0);
							valX2 = this._toOADate(valX2);
						}
						X0 = cBounds.startX + (valX0 - minX) * kx;
						X2 = cBounds.startX + (valX2 - minX) * kx;
					}
					a = this._getAnchors(X0, Y0, X, Y, X2, Y2);
					pathArr = pathArr.concat([a.x1, a.y1, X, Y, a.x2, a.y2]);
				} else {
					pathArr = pathArr.concat([X, Y, X, Y]);
				}
			} else if (fitType === "bezier") {
				if (!j) {
					pathArr = pathArr.concat(["M", X, Y]);
				} else if (j === jj - 1 && j % 2 === 1) {
					pathArr = pathArr.concat(["Q", X, Y, X, Y]);
				} else {
					if (j % 2 === 0) {
						pathArr = pathArr.concat([X, Y]);
					} else {
						pathArr = pathArr.concat(["Q", X, Y]);
					}
				}
			}
			return pathArr;
		},

		_paintPlotArea: function () {
			var self  = this,
				o = self.options,
				ani = o.animation,
				duration = ani.duration,
				easing = ani.easing,
				seTrans = o.seriesTransition,
				cBounds = self.canvasBounds,
				width = cBounds.endX - cBounds.startX,
				height = cBounds.endY - cBounds.startY,
				linesSeries = o.seriesList,
				linesSeriesStyles = o.seriesStyles,
				i, 
				ii, 
				j, 
				jj, 
				k, 
				kk, 
				x, 
				xx, 
				X, 
				Y,
				lineSeries, 
				lineSeriesStyle, 
				lineData,
				lineStyle, 
				lineHoverStyle,
				lineMarkerStyle,
				lineMarkerHoverStyle,
				minX = o.axis.x.min, 
				minY = o.axis.y.min,
				maxX = o.axis.x.max, 
				maxY = o.axis.y.max,
				kx = width / (maxX - minX),
				ky = height / (maxY - minY),
				plotInfo = {
					minX: minX,
					minY: minY,
					maxX: maxX,
					maxY: maxY,
					width: width,
					height: height,
					kx: kx,
					ky: ky
				},
				isXTime = self.axisInfo.x.isTime,
				isYTime = self.axisInfo.y.isTime,
				valuesX, 
				valuesY, 
				markers, 
				pathArr,
				fitType, 
				paintSymbol, 
				defaultChartLabels,
				valX, 
				valY, 
				labelText, 
				defaultChartLabel, 
				dclBox,
				dot, 
				isSymbol, 
				symbols, 
				markerType, 
				markerWidth,
				markerData, 
				path, 
				symbol,
				aniPathsAttr = [],
				aniMarkersAttr,
				aniLabelsAttr,
				initAniY,
				firstYPoint,
				lastYPoint,
				initAniPath,
				val,
				labelStyle;

			self.plotInfos = [];
			for (k = 0, kk = linesSeries.length; k < kk; k++) {
				aniMarkersAttr = [];
				aniLabelsAttr = [];
				initAniPath = [];
				lineSeries = linesSeries[k];
				lineSeriesStyle = linesSeriesStyles[k];
				//set default value of line series
				lineSeries = $.extend(true, {
					fitType: "line",
					markers: {
						visible: false,
						type: "circle"
					},
					visible: true
				}, lineSeries);
				lineData = lineSeries.data;
				lineStyle = $.extend({
					stroke: "black",
					opacity: 1,
					fill: "none",
					//stroke: lineStyle.color,
					//"stroke-width": 2,
					"stroke-linejoin": "round",
					"stroke-linecap": "round"
				}, lineSeriesStyle);
				lineMarkerStyle = lineSeries.markerStyle;
				lineMarkerStyle = $.extend({
					fill: lineStyle.stroke,
					stroke: lineStyle.stroke,
					//Add comments by RyanWu@20110706.
					//I can't add scale: "1 1" here, because if so,
					//The marker will be disapperaed after animation played
					//in browsers which support vml(ie6/7/8).  I don't know
					//why.  So I use the scale(1, 1) method to recover the 
					//original state of the marker after mouse out.
					//scale: "1 1",
					//end by RyanWu@20110706.
					opacity: 1,
					width: 3
				}, lineMarkerStyle);
				lineHoverStyle = o.seriesHoverStyles[k];
				lineMarkerHoverStyle = $.extend(true, {},
					lineHoverStyle, {
						scale: "1.5 1.5",
						"stroke-width": 1
					}, linesSeries.markerHoverStyle);
				valuesX = lineData.x;
				valuesY = lineData.y;

				self.plotInfos.push(plotInfo);

				// Lines and markers:
				markers = self.canvas.set();
				pathArr = [];
				fitType = lineSeries.fitType;
				paintSymbol = false;
				if (lineSeries.markers.symbol && lineSeries.markers.symbol.length) {
					paintSymbol = true;
				}
				defaultChartLabels = self.canvas.set();
				
				if (!self.aniPathsAttr || (ani.enabled && !seTrans.enabled)) {
					if (valuesY.length > 0) {
						firstYPoint = valuesY[0];
						if (isYTime) {
							firstYPoint = self._toOADate(firstYPoint);
						}
						lastYPoint = valuesY[valuesY.length - 1];
						if (isYTime) {
							lastYPoint = self._toOADate(lastYPoint);
						}
					}
				}
				for (j = 0, jj = valuesY.length; j < jj; j++) {
					valX = valuesX[j];
					if (isXTime) {
						valX = self._toOADate(valX);
					}
					valY = valuesY[j];
					if (isYTime) {
						valY = self._toOADate(valY);
					}
					if (valX === undefined) {
						break;
					}
					X = 0;
					if (isNaN(valX) || typeof valX ===  "string") {
						val = j;
					} else {
						val = valX;
					}
					X = cBounds.startX + (val - minX) * kx;
					Y = cBounds.endY - (valY - minY) * ky;
					
					if (!self.aniPathsAttr || (ani.enabled && !seTrans.enabled)) {
						initAniY = firstYPoint + (lastYPoint - firstYPoint) / 
							(maxX - minX) * (val - minX);
						initAniY = cBounds.endY - (initAniY - minY) * ky;
						
						if (j === 0) {
							initAniPath.push("M");
						} else {
							initAniPath.push("L");
						}
						initAniPath.push(X);
						initAniPath.push(initAniY);
					}

					pathArr = self._getPathArrByFitType(pathArr, fitType, j, jj, cBounds,
						valuesX, valuesY, X, Y, isXTime, isYTime, plotInfo, valX, valY);

					if (o.showChartLabels) {
						//Add comments by RyanWu@20110707.
						//For supporting date time value on y axi.
						//labelText = valY;
						labelText = isYTime ? self._fromOADate(valY) : valY;
						//end by RyanWu@20110707.

						if (o.chartLabelFormatString && o.chartLabelFormatString.length) {
							//labelText = $.format(labelText, o.chartLabelFormatString);
							labelText = Globalize.format(labelText, o.chartLabelFormatString);
						}
						defaultChartLabel = self.canvas.text(X, Y, labelText);
						self.chartLabelEles.push(defaultChartLabel);
						dclBox = defaultChartLabel.wijGetBBox();
						defaultChartLabel.translate(0, -dclBox.height);
						defaultChartLabels.push(defaultChartLabel);
						aniLabelsAttr.push($.extend(true, {}, defaultChartLabel.attr()));
					}
				
					dot = null;
					isSymbol = false;
					if (paintSymbol) {
						symbols = lineSeries.markers.symbol;
						for (x = 0, xx = symbols.length; x < xx; x++) {
							symbol = symbols[x];
							if (symbol.index === j) {
								dot = self.canvas.image(symbol.url, X - symbol.width / 2,
									Y - symbol.height / 2, symbol.width, symbol.height);
								self.symbols.push(dot);
								isSymbol = true;
								if (!self.aniPathsAttr || 
										(ani.enabled && !seTrans.enabled)) {
									dot.straight = initAniY;
								}
								break;
							}
						}
					
					}
					if (dot === null) {
						markerType = lineSeries.markers.type;
						markerWidth = lineMarkerStyle.width;
						dot = self._paintMarker(markerType, X, Y, markerWidth);
						if (lineSeries.markers.visible) {
							dot.attr(lineMarkerStyle);
						}
						if (!self.aniPathsAttr || (ani.enabled && !seTrans.enabled)) {
							dot.straight = initAniY;
						}
					}
				
					self._addClass($(dot.node), 
						"wijchart-canvas-object wijchart-canvas-marker");
					markerData = {};
					markerData.marker = dot;
					markerData.index = j;
					markerData.type = "marker";
					markerData.lineSeries = lineSeries;
					markerData.x = X;
					markerData.y = Y;
					markerData.isSymbol = isSymbol;
					$(dot.node).data("wijchartDataObj", markerData);
					markers.push(dot);
				
					aniMarkersAttr.push($.extend(true, {}, dot.attr()));
					self.animationSet.push(dot);
				}
				path = self.canvas.path(pathArr.join(" "));
				path.straight = initAniPath.join(" ");
				//shadow
				self._paintShadow(path);

				path.wijAttr(lineStyle);

				aniPathsAttr.push({
					path: $.extend(true, {}, path.attr()),
					markers: aniMarkersAttr,
					labels: aniLabelsAttr
				});
				path.markers = markers;
				
				self.paths[k] = path;
				if (path.shadow) {
					self.shadowPaths[k] = path.shadow;
				}
				self.animationSet.push(path);
			
				self.linesStyle[k] = {
					lineStyle: lineStyle,
					lineHoverStyle: lineHoverStyle,
					markerStyle: lineMarkerStyle,
					markerHoverStyle: lineMarkerHoverStyle
				};

				if (!lineSeries.markers.visible) {
					markers.hide();
				}
				if (!lineSeries.visible) {
					path.hide();
				
					if (path.shadow) {
						path.shadow.hide();
					}
				}

				if (lineSeries.markers.style) {
					markers.attr(lineSeries.markers.style);
				}
				markers.toFront();
				if (defaultChartLabels.length) {
					labelStyle = $.extend(true, {}, o.chartLabelStyle);
					if (lineSeries.textStyle) {
						labelStyle = $.extend(true, labelStyle, 
							lineSeries.textStyle);
					}
					defaultChartLabels.attr(labelStyle);
					defaultChartLabels.toFront();
					path.labels = defaultChartLabels;
				}
				self.markersSet[k] = markers;
				lineSeries.index = k;
				lineSeries.type = "line";
				lineSeries.path = path;
				lineSeries.lineMarkers = markers;
				lineSeries.lineStyle = lineStyle;
				self._addClass($(path.node), "wijchart-canvas-object");
				$(path.node).data("wijchartDataObj", lineSeries);
			}
			
			if (ani.enabled || (seTrans.enabled && self.seriesTransition)) {
				if (ani.direction === "horizontal") {
					if (seTrans.enabled && self.seriesTransition) {
						duration = seTrans.duration;
						easing = seTrans.easing;
					}
					self.animationSet.wijAttr("clip-rect", cBounds.startX +
							" " + cBounds.startY + " 0 " + height);
					self.animationSet.wijAnimate({"clip-rect": cBounds.startX +
							" " + cBounds.startY + " " + width + " " + height},
							duration, easing, function () {
							if (Raphael.vml) {
								//delete clip-rect's div in vml
								for (i = 0, ii = self.animationSet.length; i < ii; i++) {
									var ele = self.animationSet[i],
										attrs = null, 
										group = null, 
										clipRect = null;
									if (ele.node.clipRect) {
										attrs = ele.attrs;
										delete attrs["clip-rect"];
										ele.node.clipRect = null;
										group = $(ele.node).parent();
										clipRect = group.parent();
										clipRect.before(group);
										//clipRect.wijRemove();
										clipRect.remove();
									
										ele.attr(attrs);
									}
								}
							}
						});
				} else {
					$.each(self.paths, function (idx, path) {
						var aniPathAttr,
							diffAttr,
							diffPath;
						if (self.aniPathsAttr && seTrans.enabled) {
							duration = seTrans.duration;
							easing = seTrans.easing;
							if (path.shadow) {
								path.shadow.hide();
							}
							aniPathAttr = self.aniPathsAttr[idx];
							diffAttr = self._getDiffAttrs(aniPathAttr.path, path.attr());
							path.attr(aniPathAttr.path);
							path.wijAnimate(diffAttr, duration, easing, function () {
								if (path.shadow) {
									path.shadow.show();
								}
							});
							$.each(path.markers, function (i, marker) {
								var diffMarkerAttr = 
									self._getDiffAttrs(aniPathAttr.markers[i], 
										marker.attr());
								marker.attr(aniPathAttr.markers[i]);
								marker.wijAnimate(diffMarkerAttr, duration, easing);
							});
							if (path.labels) {
								$.each(path.labels, function (i, label) {
									var diffLabelAttr = 
										self._getDiffAttrs(aniPathAttr.labels[i], 
											label.attr()),
										labelAttr = aniPathAttr.labels[i];
									if (labelAttr && labelAttr.text) {
										delete labelAttr.text;
									}
									label.attr(labelAttr);
									label.wijAnimate(diffLabelAttr, duration, easing);
								});
							}
						} else {
							if (path.straight) {
								if (path.shadow) {
									path.shadow.hide();
								}
								aniPathAttr = path.straight;
								diffPath = path.attr().path;
								path.attr({path: aniPathAttr});
								path.wijAnimate({path: diffPath}, duration, easing, 
									function () {
										if (path.shadow) {
											path.shadow.show();
										}
									});
								$.each(path.markers, function (i, marker) {
									if (marker.straight) {
										var cy = marker.attr().cy;
										marker.attr({cy: marker.straight});
										marker.wijAnimate({cy: cy}, duration, easing);
									}
								});
							}
						}
					});
				}
			}
			self.aniPathsAttr = aniPathsAttr;
		},

		_getChartLabelPointPosition: function (chartLabel) {
			var self = this,
				o = self.options,
				method = chartLabel.attachMethod,
				data = chartLabel.attachMethodData,
				point = { x: 0, y: 0 },
				seriesIndex = null, 
				plotInfos = null,
				x = 0, 
				y = 0, 
				kx = 0, 
				ky = 0,
				plotInfo = null, 
				lineData = null, 
				pointIndex = null;
			switch (method) {
			case "coordinate":
				point.x = data.x;
				point.y = data.y;
				break;
			case "dataCoordinate":
				seriesIndex = data.seriesIndex;
				if (seriesIndex > -1) {
					plotInfos = self.plotInfos;
					if (plotInfos.length > seriesIndex) {
						x = data.x;
						y = data.y;
						if (self._isDate(x)) {
							x = self._toOADate(x);
						}
						if (this._isDate(y)) {
							y = self._toOADate(y);
						}
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = self.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = self.canvasBounds.startY + plotInfo.height - 
							(y - plotInfo.minY) * ky;
					}
				}
				break;
			case "dataIndex":
				seriesIndex = data.seriesIndex;
				pointIndex = data.pointIndex;
				lineData = o.seriesList[seriesIndex].data;
				x = lineData.x[pointIndex];
				y = lineData.y[pointIndex];
				if (self._isDate(x)) {
					x = self._toOADate(x);
				}
				if (this._isDate(y)) {
					y = self._toOADate(y);
				}
				if (seriesIndex > -1) {
					plotInfos = self.plotInfos;
					if (plotInfos.length > seriesIndex) {
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = self.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = self.canvasBounds.startY + plotInfo.height - 
							(y - plotInfo.minY) * ky;
					}
				}
				break;
			case "dataIndexY":
				seriesIndex = data.seriesIndex;
				pointIndex = data.pointIndex;
				lineData = o.seriesList[seriesIndex].data;
				x = lineData.x[pointIndex];
				y = data.y;
				if (self._isDate(x)) {
					x = self._toOADate(x);
				}
				if (self._isDate(y)) {
					y = self._toOADate(y);
				}
				if (seriesIndex > -1) {
					plotInfos = self.plotInfos;
					if (plotInfos.length > seriesIndex) {
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = self.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = self.canvasBounds.startY + plotInfo.height - 
							(y - plotInfo.minY) * ky;
					}
				}
				break;
			}
			return point;
		},

		_bindLiveEvents: function () {
			var self = this,
				isNewLine = false,
				o = this.options,
				proxyObj = {
					element: this.chartElement,
					mousedown: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseDown", e, lineSeries);
							} else {
								self._trigger("mouseDown", e, data);
							}
						} else {
							self._trigger("mouseDown", e, data);
						}
					},
					mouseup: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseUp", e, lineSeries);
							} else {
								self._trigger("mouseUp", e, data);
							}
						} else {
							self._trigger("mouseUp", e, data);
						}
					},
					mouseover: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							//zoomOnHover = self.options.zoomOnHover,
							lineSeries = null, 
							style = null,
							idx = 0;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseOver", e, lineSeries);
							} else {
								self._trigger("mouseOver", e, data);
							}
							//for tooltip 
							if (self.hoverLine !== lineSeries) {
								isNewLine = true;
								//if (zoomOnHover) {
								if (self.hoverLine) {
									idx = self.hoverLine.index;
									style = self.linesStyle[idx];
//Add comments by RyanWu@20110705.
//For adding the seriesHoverStyle and markerHoverStyle support.
//										self.hoverLine.path.wijAttr({
//											"stroke-width": parseInt(style
//												.lineStyle["stroke-width"], 10)
//										});
//										if (self.hoverPoint && 
//												!self.hoverPoint.isSymbol) {
//											self.hoverPoint.marker.wijAttr({
//												"stroke": style.markerStyle.stroke
//											});
//											self.hoverPoint.marker.scale(1, 1);
//										}
									self.hoverLine.path.wijAttr(style.lineStyle);
									if (self.hoverPoint && 
										!self.hoverPoint.isSymbol) {
										self.hoverPoint.marker.wijAttr(style.markerStyle);
										self.hoverPoint.marker.scale(1, 1);
									}
									//end by RyanWu@20110705.
								}
							
								idx = lineSeries.index;
//Add comments by RyanWu@20110705.
//For adding the seriesHoverStyle and markerHoverStyle support.
//									if (self.linesStyle[idx] &&
//											self.linesStyle[idx].lineStyle) {
//										style = self.linesStyle[idx].lineStyle;
//										lineSeries.path.wijAttr({
//											"stroke-width":
//												parseInt(style["stroke-width"], 10) + 1
//										});
//									}
								style = self.linesStyle[idx];

								if (style && style.lineHoverStyle) {
									lineSeries.path.wijAttr(style.lineHoverStyle);
								}
								//end by RyanWu@20110705.
								//}
						
								self.hoverLine = lineSeries;
								self.hoverPoint = null;
						
							}
						} else {
							self._trigger("mouseOver", e, data);
							//for tooltip 
							if (data.type !== "line") {
								return;
							}
							if (self.hoverLine !== data) {
								isNewLine = true;
								//if (zoomOnHover) {
								if (self.hoverLine) {
									idx = self.hoverLine.index;
									style = self.linesStyle[idx];
//Add comments by RyanWu@20110705.
//For adding the seriesHoverStyle and markerHoverStyle support.
//										self.hoverLine.path.wijAttr({
//											"stroke-width": parseInt(style
//												.lineStyle["stroke-width"], 10)
//										});
//										if (self.hoverPoint && 
//												!self.hoverPoint.isSymbol) {
//											self.hoverPoint.marker.wijAttr({
//												"stroke": style.markerStyle.stroke
//											});
//											self.hoverPoint.marker.scale(1, 1);
//										}
									self.hoverLine.path.wijAttr(style.lineStyle);
									if (self.hoverPoint && 
										!self.hoverPoint.isSymbol) {
										self.hoverPoint.marker.wijAttr(style.markerStyle);
										self.hoverPoint.marker.scale(1, 1);
									}
									//end by RyanWu@20110705.
								}
							
								idx = data.index;
//Add comments by RyanWu@20110705.
//For adding the seriesHoverStyle and markerHoverStyle support.
//									if (self.linesStyle[idx] &&
//											self.linesStyle[idx].lineStyle) {
//										style = self.linesStyle[idx].lineStyle;
//										data.path.wijAttr({
//											"stroke-width": 
//												parseInt(style["stroke-width"], 10) + 1
//										});
//									}
								style = self.linesStyle[idx];

								if (style && style.lineHoverStyle) {
									data.path.wijAttr(style.lineHoverStyle);
								}
								//end by RyanWu@20110705.
								//}
						
								self.hoverLine = data;
								self.hoverPoint = null;
							}
						}
					},
					mouseout: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseOut", e, lineSeries);
							} else {
								self._trigger("mouseOut", e, data);
							}
						} else {
							self._trigger("mouseOut", e, data);
						}
					},
					mousemove: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseMove", e, lineSeries);
							} else {
								self._trigger("mouseMove", e, data);
							}
						} else {
							self._trigger("mouseMove", e, data);
						}
					},
					click: function (e) {
						if (o.disabled) {
							return;
						}
			
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("click", e, lineSeries);
							} else {
								self._trigger("click", e, data);
							}
						} else {
							self._trigger("click", e, data);
						}
					}
				},
				hint = o.hint,
				h = null,
				bounds = self.canvasBounds,
				elePos = self.chartElement.offset();
				//zoomOnHover = o.zoomOnHover;
			$(".wijchart-canvas-object", this.chartElement[0])
				.live("mousedown.wijlinechart", 
					$.proxy(proxyObj.mousedown, proxyObj))
				.live("mouseup.wijlinechart", 
					$.proxy(proxyObj.mouseup, proxyObj))
				.live("mouseover.wijlinechart", 
					$.proxy(proxyObj.mouseover, proxyObj))
				.live("mouseout.wijlinechart", 
					$.proxy(proxyObj.mouseout, proxyObj))
				.live("mousemove.wijlinechart", 
					$.proxy(proxyObj.mousemove, proxyObj))
				.live("click.wijlinechart", 
					$.proxy(proxyObj.click, proxyObj));

			if (hint.enable) {
				h = $.extend(true, hint, {
					closeBehavior: "none",
					mouseTrailing: false,
					triggers: "custom",
					compass: hint.compass
				});
				if (!this.tooltip) {
					this.tooltip = this.canvas.tooltip(null, h);
				}
			}
		
			this.chartElement.bind("mousemove", function (e) {
				if (o.disabled) {
					return;
				}
			
				elePos = self.chartElement.offset();
				var mousePos = {
						left: e.pageX - elePos.left,
						top: e.pageY - elePos.top
					},
					markers = null,
					idx = 0, 
					distance = 0, 
					index = 0,
					box = null, 
					pos = 0, 
					dis = 0,
					point = null, 
					p = null, 
					style = null,
					valueX, 
					valueY, 
					seriesData = null, 
					s = null,
					dataObj = null, 
					op = null, 
					title = hint.title,
					content = hint.content,
					isTitleFunc = $.isFunction(title),
					isContentFunc = $.isFunction(content);
				
				if (self.tooltip) {
					op = self.tooltip.getOptions();
				}

				if (mousePos.left >= bounds.startX && mousePos.left <= bounds.endX && 
						mousePos.top >= bounds.startY && mousePos.top <= bounds.endY) {
					if (self.hoverLine) {
						if (isNewLine) {
							if (hint.enable && self.tooltip) {
								self.tooltip.hide();
							}
							isNewLine = false;
						}
						markers = self.hoverLine.lineMarkers;
						idx = -1;
						p = {x: 0, y: 0};
						$.each(markers, function (i, marker) {
							box = marker.wijGetBBox();
							pos = box.x + box.width / 2;
							dis = Math.abs(pos - mousePos.left);
							if (i === 0) {
								distance = dis;
								idx = i;
								p = {
									x: pos,
									y: box.y + box.height / 2
								};
							} else if (dis < distance) {
								distance = dis;
								idx = i;
								p = {
									x: pos,
									y: box.y + box.height / 2
								};
							}
						});
						if (self.hoverPoint && self.hoverPoint.index === idx) {
							return;
						}
						if (idx > -1) {
							point = $(markers[idx].node).data("wijchartDataObj");
							//Add comments by RyanWu@20110705.
							//For adding seriesHoverStyles and markerHoverStyles.
//							if (zoomOnHover && point) {
//								if (self.hoverPoint && !self.hoverPoint.isSymbol) {
//									index = self.hoverLine.index;
//									style = self.linesStyle[index];
//									self.hoverPoint.marker.wijAttr({
//										"stroke": style.markerStyle.stroke
//									});
//									self.hoverPoint.marker.scale(1, 1);
//								}
//								if (!point.isSymbol) {
//									point.marker.wijAttr({
//										"stroke": "white"
//									});
//									point.marker.scale(1.5, 1.5);
//								}
//							}
							if (point) {
								index = self.hoverLine.index;
								style = self.linesStyle[index];
								if (self.hoverPoint && !self.hoverPoint.isSymbol) {
									self.hoverPoint.marker.wijAttr(style.markerStyle);
									self.hoverPoint.marker.scale(1, 1);
								}
								if (!point.isSymbol) {
									point.marker.wijAttr(style.markerHoverStyle);
								}
							}
							//end by RyanWu@20110705.
							self.hoverPoint = point;
						}
						if (hint.enable && self.tooltip) {
							seriesData = self.hoverLine.data;
						
							if (seriesData.x) {
								valueX = seriesData.x[idx];
								valueY = seriesData.y[idx];
							} else {
								valueX = seriesData.xy[2 * idx];
								valueY = seriesData.xy[2 * idx + 1];
							}
							dataObj = self.hoverPoint;
							if (isTitleFunc || isContentFunc) {
								if (isTitleFunc) {
									op.title = function () {
										var obj = {
												pointIndex: idx,
												lineIndex: dataObj.lineSeries.index,
												x: valueX,
												y: valueY,
												label: dataObj.lineSeries.label,
												data: dataObj,
												fmt: title
											},
											fmt = $.proxy(obj.fmt, obj),
											tit = fmt();
										return tit;
									};
								}
								if (isContentFunc) {
									op.content = function () {
										var obj = {
												pointIndex: idx,
												lineIndex: dataObj.lineSeries.index,
												x: valueX,
												y: valueY,
												label: dataObj.lineSeries.label,
												data: dataObj,
												fmt: content
											},
											fmt = $.proxy(obj.fmt, obj),
											con = fmt();
										return con;
									};
								}
							}
							s = $.extend({
								stroke: self.hoverLine.path.attr("stroke")
							}, hint.style);
							op.style.stroke = s.stroke;
							self.tooltip.showAt(p);
						}
					}
				} else {
					if (hint.enable && self.tooltip) {
						self.tooltip.hide();
					}
				
					//Add comments by RyanWu@20110705.
					//For adding seriesHoverStyles and markerHoverStyles.
//					if (zoomOnHover) {
//						if (self.hoverLine) {
//							idx = self.hoverLine.index;
//							style = self.linesStyle[idx];
//							self.hoverLine.path.wijAttr({
//							"stroke-width": parseInt(style.lineStyle["stroke-width"],
//									10)
//							});
//							if (self.hoverPoint && !self.hoverPoint.isSymbol) {
//								self.hoverPoint.marker.wijAttr({
//									"stroke": style.markerStyle.stroke
//								});
//								self.hoverPoint.marker.scale(1, 1);
//							}
//						}
//					}
					if (self.hoverLine) {
						idx = self.hoverLine.index;
						style = self.linesStyle[idx];
						self.hoverLine.path.wijAttr(style.lineStyle);
						if (self.hoverPoint && !self.hoverPoint.isSymbol) {
							self.hoverPoint.marker.wijAttr(style.markerStyle);
							self.hoverPoint.marker.scale(1, 1);
						}
					}
					//end by RyanWu@20110705.
					self.hoverLine = null;
					self.hoverPoint = null;
				}
			});
		},

		_unbindLiveEvents: function () {
			$(".wijchart-canvas-object", this.chartElement[0]).die("wijlinechart");
		}

	});

}(jQuery));
