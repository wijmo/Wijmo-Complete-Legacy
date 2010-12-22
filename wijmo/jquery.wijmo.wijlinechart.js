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
 * * Wijmo LineChart widget.
 *
 * Depends:
 *	raphael.js
 *	jquery.glob.min.js
 *	jquery.ui.widget.js
 *	jquery.wijmo.wijchartcore.js
 *
 */
"use strict";
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


(function ($) {
	
	$.widget("wijmo.wijlinechart", $.wijmo.wijchartcore, {
		// widget options    
		options: {
			/// <summary>
			/// A value that indicates whether to show the animation
			/// and the duration for the animation.
			/// Default: {enabled:true, duration:2000}.
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
				/// A value that indicates the duration for the animation.
				/// Default: 2000.
				/// Type: Number.
				/// </summary>
				duration: 2000
			},
			/// <summary>
			/// A value that indicates whether to zoom in on the line and marker on hover.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			zoomOnHover: true
		},

		// widget creation:    
		_create: function () {
			$.wijmo.wijchartcore.prototype._create.apply(this, arguments);
			this.chartElement.addClass("wijmo-wijlinechart");
			this.paths = [];
			this.shadowPaths = [];
			this.markersSet = [];
			this.animationSet = this.canvas.set();
			this.symbols = [];
			this.hoverPoint = null;
			this.hoverLine = null;
			this.linesStyle = [];
			this.shadow = true;
		},

		destroy: function () {
			this.chartElement.removeClass("wijmo-wijlinechart");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);

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
			}
			else {
				return und;
			}
		},

		/** Private methods */
	
		_getAnchors: function (p1x, p1y, p2x, p2y, p3x, p3y) {
			var l1 = (p2x - p1x) / 2,
				l2 = (p3x - p2x) / 2,
				a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
				b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y)),
				alpha = 0, dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;
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
				i = 0, ii = 0, idx = 0,
				legendIcon = null,
				chartsSeries = o.seriesList,
				chartsSeriesStyles = o.seriesStyles,
				chartSeries = null, chartSeriesStyle = null, box = null,
				x = 0, y = 0,
				markerStyle = null, type = null, dot = null;
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
				}
				else {
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
			var i = 0, ii = 0, j = 0, jj = 0,
				markerSet = null;
			this.linesStyle = [];
			if (this.paths.length) {
				for (i = 0, ii = this.paths.length; i < ii; i++) {
					this.paths[i].remove();
				}
				this.paths = [];
			}
			if (this.shadowPaths.length) {
				for (i = 0, ii = this.shadowPaths.length; i < ii; i++) {
					this.shadowPaths[i].remove();
				}
				this.shadowPaths = [];
			}
			if (this.markersSet.length) {
				for (i = 0, ii = this.markersSet.length; i < ii; i++) {
					markerSet = this.markersSet[i];
					for (j = 0, jj = markerSet.length; j < jj; j++) {
						markerSet[j].remove();
					}
				}
				this.markersSet = [];
			}
			if (this.animationSet.length) {
				for (i = 0, ii = this.animationSet.length; i < ii; i++) {
					this.animationSet[i].remove();
				}
				this.animationSet = this.canvas.set();
			}
			if (this.symbols.length) {
				for (i = 0, ii = this.symbols.length; i < ii; i++) {
					this.symbols[i].remove();
				}
				this.symbols = [];
			}
			$.wijmo.wijchartcore.prototype._clearChartElement.apply(this, arguments);
		},
	
		_paintMarker: function (type, x, y, length) {
			var marker = null;
			switch (type) {
			case "circle":
				marker = this.canvas.circle(x, y, length);
				break;
			case "tri":
				marker = this.canvas.tri(x, y, length);
				break;
			case "invertedTri":
				marker = this.canvas.invertedTri(x, y, length);
				break;
			case "box":
				marker = this.canvas.box(x, y, length);
				break;
			case "diamond":
				marker = this.canvas.diamond(x, y, length);
				break;
			case "cross":
				marker = this.canvas.cross(x, y, length);
				break;
			}
			return marker;
		},

		_getPathArrByFitType: function (pathArr, fitType, j, jj, cBounds, valuesX,
				valuesY, X, Y, isXTime, isYTime, plotInfo, valX, valY) {
			var valY0 = null, valY2 = null,
				Y0 = 0, Y2 = 0, X0 = 0, X2 = 0,
				valX0 = null, valX2 = null, a = null,
				minY = plotInfo.minY, minX = plotInfo.minX,
				kx = plotInfo.kx, ky = plotInfo.ky;
			if (fitType === "line") {
				pathArr = pathArr.concat([j ? "L" : "M", X, Y]);
			}
			else if (fitType === "spline") {
				if (!j) {
					pathArr = ["M", X, Y, "C", X, Y];
				}
				else if (j && j < jj - 1) {
					valY0 = valuesY[j - 1];
					valY2 = valuesY[j + 1];
					if (isYTime) {
						valY0 = this._toOADate(valY0);
						valY2 = this._toOADate(valY2);
					}
					Y0 = cBounds.endY - (valY0 - minY) * ky;
					Y2 = cBounds.endY - (valY2 - minY) * ky;
					if (isNaN(valX)) {
						X0 = cBounds.startX + (j - 1 - minX) * kx;
						X2 = cBounds.startX + (j + 1 - minX) * kx;
					}
					else {
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
				}
				else {
					pathArr = pathArr.concat([X, Y, X, Y]);
				}
			}
			else if (fitType === "bezier") {
				if (!j) {
					pathArr = pathArr.concat(["M", X, Y]);
				}
				else if (j === jj - 1 && j % 2 === 1) {
					pathArr = pathArr.concat(["Q", X, Y, X, Y]);
				}
				else {
					if (j % 2 === 0) {
						pathArr = pathArr.concat([X, Y]);
					}
					else {
						pathArr = pathArr.concat(["Q", X, Y]);
					}
				}
			}
			return pathArr;
		},

		_paintPlotArea: function () {
			var self  = this,
				o = self.options,
				cBounds = self.canvasBounds,
				width = cBounds.endX - cBounds.startX,
				height = cBounds.endY - cBounds.startY,
				linesSeries = o.seriesList,
				linesSeriesStyles = o.seriesStyles,
				i, ii, j, jj, k, kk, x, xx, X, Y,
				lineSeries, lineSeriesStyle, lineData,
				lineStyle, lineMarkerStyle,
				minX = o.axis.x.min, minY = o.axis.y.min,
				maxX = o.axis.x.max, maxY = o.axis.y.max,
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
				valuesX, valuesY, markers, pathArr,
				fitType, paintSymbol, defaultChartLabels,
				valX, valY, defaultChartLabel, dclBox,
				dot, isSymbol, symbols, markerType, markerWidth,
				markerData, path, symbol;

			this.plotInfos = [];
			for (k = 0, kk = linesSeries.length; k < kk; k++) {
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
					"stroke-width": 2,
					"stroke-linejoin": "round",
					"stroke-linecap": "round"
				}, lineSeriesStyle);
				lineMarkerStyle = lineSeries.markerStyle;
				lineMarkerStyle = $.extend({
					fill: lineStyle.stroke,
					stroke: lineStyle.stroke,
					opacity: 1,
					width: 3
				}, lineMarkerStyle);

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
					if (isNaN(valX)) {
						X = cBounds.startX + (j - minX) * kx;
					}
					else {
						X = cBounds.startX + (valX - minX) * kx;
					}
					Y = cBounds.endY - (valY - minY) * ky;

					pathArr = self._getPathArrByFitType(pathArr, fitType, j, jj, cBounds,
						valuesX, valuesY, X, Y, isXTime, isYTime, plotInfo, valX, valY);

					if (o.showChartLabels) {
						defaultChartLabel = self.canvas.text(X, Y, valY);
						self.chartLabelEles.push(defaultChartLabel);
						dclBox = defaultChartLabel.wijGetBBox();
						defaultChartLabel.translate(0, -dclBox.height);
						defaultChartLabels.push(defaultChartLabel);
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
				
					self.animationSet.push(dot);
				}
				path = self.canvas.path(pathArr.join(" "));
			
				//shadow
				self._paintShadow(path);

				path.wijAttr(lineStyle);

				self.paths[k] = path;
				if (path.shadow) {
					self.shadowPaths[k] = path.shadow;
				}
				self.animationSet.push(path);
			
				self.linesStyle[k] = {
					lineStyle: lineStyle,
					markerStyle: lineMarkerStyle
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
					defaultChartLabels.attr(o.chartLabelStyle);
					defaultChartLabels.toFront();
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
			if (o.animation.enabled) {
				self.animationSet.wijAttr("clip-rect", cBounds.startX +
						" " + cBounds.startY + " 0 " + height);
				self.animationSet.wijAnimate({"clip-rect": cBounds.startX +
						" " + cBounds.startY + " " + width + " " + height},
						o.animation.duration, function () {
					if (Raphael.vml) {
						//delete clip-rect's div in vml
						for (i = 0, ii = self.animationSet.length; i < ii; i++) {
							var ele = self.animationSet[i],
								attrs = null, group = null, clipRect = null;
							if (ele.node.clipRect) {
								attrs = ele.attrs;
								delete attrs["clip-rect"];
								ele.node.clipRect = null;
								group = $(ele.node).parent();
								clipRect = group.parent();
								clipRect.before(group);
								clipRect.remove();
							
								ele.attr(attrs);
							}
						}
					}
				});
			}
		},

		_getChartLabelPointPosition: function (chartLabel) {
			var o = this.options,
				method = chartLabel.attachMethod,
				data = chartLabel.attachMethodData,
				point = { x: 0, y: 0 },
				seriesIndex = null, plotInfos = null,
				x = 0, y = 0, kx = 0, ky = 0,
				plotInfo = null, lineData = null, pointIndex = null;
			switch (method) {
			case "coordinate":
				point.x = data.x;
				point.y = data.y;
				break;
			case "dataCoordinate":
				seriesIndex = data.seriesIndex;
				if (seriesIndex > -1) {
					plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						x = data.x;
						y = data.y;
						if (this._isDate(x)) {
							x = this._toOADate(x);
						}
						if (this._isDate(y)) {
							y = this._toOADate(y);
						}
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - 
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
				if (this._isDate(x)) {
					x = this._toOADate(x);
				}
				if (this._isDate(y)) {
					y = this._toOADate(y);
				}
				if (seriesIndex > -1) {
					plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - 
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
				if (this._isDate(x)) {
					x = this._toOADate(x);
				}
				if (this._isDate(y)) {
					y = this._toOADate(y);
				}
				if (seriesIndex > -1) {
					plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						plotInfo = plotInfos[seriesIndex];
						kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx;
						ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - 
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
				proxyObj = {
					element: this.chartElement,
					mousedown: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mousedown", e, lineSeries);
							}
							else {
								self._trigger("mousedown", e, data);
							}
						}
						else {
							self._trigger("mousedown", e, data);
						}
					},
					mouseup: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseup", e, lineSeries);
							}
							else {
								self._trigger("mouseup", e, data);
							}
						}
						else {
							self._trigger("mouseup", e, data);
						}
					},
					mouseover: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							zoomOnHover = self.options.zoomOnHover,
							lineSeries = null, style = null,
							idx = 0;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseover", e, lineSeries);
							}
							else {
								self._trigger("mouseover", e, data);
							}
							//for tooltip 
							if (self.hoverLine !== lineSeries) {
								isNewLine = true;
								if (zoomOnHover) {
									if (self.hoverLine) {
										idx = self.hoverLine.index;
										style = self.linesStyle[idx];
										self.hoverLine.path.wijAttr({
											"stroke-width": parseInt(style
												.lineStyle["stroke-width"], 10)
										});
										if (self.hoverPoint && !self.hoverPoint.isSymbol) 
										{
											self.hoverPoint.marker.wijAttr({
												"stroke": style.markerStyle.stroke
											});
											self.hoverPoint.marker.scale(1, 1);
										}
									}
							
									idx = lineSeries.index;
									if (self.linesStyle[idx] &&
											self.linesStyle[idx].lineStyle) {
										style = self.linesStyle[idx].lineStyle;
										lineSeries.path.wijAttr({
											"stroke-width":
												parseInt(style["stroke-width"], 10) + 1
										});
									}
								}
						
								self.hoverLine = lineSeries;
								self.hoverPoint = null;
						
							}
						}
						else {
							self._trigger("mouseover", e, data);
							//for tooltip 
							if (data.type === "line") {
								if (self.hoverLine !== data) {
									isNewLine = true;
									if (zoomOnHover) {
										if (self.hoverLine) {
											idx = self.hoverLine.index;
											style = self.linesStyle[idx];
											self.hoverLine.path.wijAttr({
												"stroke-width": parseInt(style
													.lineStyle["stroke-width"], 10)
											});
											if (self.hoverPoint && 
											!self.hoverPoint.isSymbol) {
												self.hoverPoint.marker.wijAttr({
													"stroke": style.markerStyle.stroke
												});
												self.hoverPoint.marker.scale(1, 1);
											}
										}
								
										idx = data.index;
										if (self.linesStyle[idx] &&
												self.linesStyle[idx].lineStyle) {
											style = self.linesStyle[idx].lineStyle;
											data.path.wijAttr({
												"stroke-width": parseInt(
													style["stroke-width"], 10) + 1
											});
										}
									}
							
									self.hoverLine = data;
									self.hoverPoint = null;
								}
							}
						}
					},
					mouseout: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mouseout", e, lineSeries);
							}
							else {
								self._trigger("mouseout", e, data);
							}
						}
						else {
							self._trigger("mouseout", e, data);
						}
					},
					mousemove: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("mousemove", e, lineSeries);
							}
							else {
								self._trigger("mousemove", e, data);
							}
						}
						else {
							self._trigger("mousemove", e, data);
						}
					},
					click: function (e) {
						var tar = $(e.target),
							data = $(e.target).data("wijchartDataObj"),
							lineSeries = null;
						if (tar.hasClass("wijchart-canvas-marker")) {
							lineSeries = data.lineSeries;
							if (!lineSeries.markers.visible) {
								self._trigger("click", e, lineSeries);
							}
							else {
								self._trigger("click", e, data);
							}
						}
						else {
							self._trigger("click", e, data);
						}
					}
				},
				o = this.options,
				hint = o.hint,
				h = null,
				bounds = self.canvasBounds,
				elePos = self.chartElement.offset(),
				zoomOnHover = o.zoomOnHover;
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
					compass: "north"
				});
				if (!this.tooltip) {
					this.tooltip = this.canvas.tooltip(null, h);
				}
			}
		
			this.chartElement.bind("mousemove", function (e) {
				elePos = self.chartElement.offset();
				var mousePos = {
						left: e.pageX - elePos.left,
						top: e.pageY - elePos.top
					},
					markers = null,
					idx = 0, i = 0, ii = 0, distance = 0, index = 0,
					marker = null, box = null, pos = 0, dis = 0,
					point = null, p = null, style = null,
					valueX, valueY, seriesData = null, s = null,
					dataObj = null, op = null, 
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
						for (i = 0, ii = markers.length; i < ii; i++) {
							marker = markers[i];
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
						}
						if (self.hoverPoint && self.hoverPoint.index === idx) {
							return;
						}
						if (idx > -1) {
							point = $(markers[idx].node).data("wijchartDataObj");
							if (zoomOnHover && point) {
								if (self.hoverPoint && !self.hoverPoint.isSymbol) {
									index = self.hoverLine.index;
									style = self.linesStyle[index];
									self.hoverPoint.marker.wijAttr({
										"stroke": style.markerStyle.stroke
									});
									self.hoverPoint.marker.scale(1, 1);
								}
								if (!point.isSymbol) {
									point.marker.wijAttr({
										"stroke": "white"
									});
									point.marker.scale(1.5, 1.5);
								}
							}
							self.hoverPoint = point;
						}
						if (hint.enable && self.tooltip) {
							seriesData = self.hoverLine.data;
						
							if (seriesData.x) {
								valueX = seriesData.x[idx];
								valueY = seriesData.y[idx];
							}
							else {
								valueX = seriesData.xy[2 * idx];
								valueY = seriesData.xy[2 * idx + 1];
							}
							dataObj = self.hoverPoint;
							if (isTitleFunc || isContentFunc) {
								if (isTitleFunc) {
									op.title = function () {
										var obj = {
												x: valueX,
												y: valueY,
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
												x: valueX,
												y: valueY,
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
				}
				else {
					if (hint.enable && self.tooltip) {
						self.tooltip.hide();
					}
				
					if (zoomOnHover) {
						if (self.hoverLine) {
							idx = self.hoverLine.index;
							style = self.linesStyle[idx];
							self.hoverLine.path.wijAttr({
								"stroke-width": parseInt(style.lineStyle["stroke-width"],
									10)
							});
							if (self.hoverPoint && !self.hoverPoint.isSymbol) {
								self.hoverPoint.marker.wijAttr({
									"stroke": style.markerStyle.stroke
								});
								self.hoverPoint.marker.scale(1, 1);
							}
						}
					}
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
