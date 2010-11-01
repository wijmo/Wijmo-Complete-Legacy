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
 * * Wijmo LineChart widget.
 *
 * Depends:
 *	raphael.js
 *	raphael-popup.js
 *	jquery.glob.min.js
 *	jquery.ui.widget.js
 *	jquery.ui.svgdom.js
 *	jquery.ui.wijchartcore.js
 *
 */
Raphael.fn.tri = function (x, y, length) {
	var x1 = x;
	var y1 = y - length;
	var offsetX = Math.cos(30 * Math.PI / 180) * length;
	var offsetY = Math.tan(60 * Math.PI / 180) * offsetX;
	var x2 = x + offsetX;
	var y2 = y + offsetY;
	var x3 = x - offsetX;
	var y3 = y + offsetY;
	var arrPath = ["M", x1, y1, "L", x2, y2, "L", x3, y3, "z"];
	return this.path(arrPath.concat(" "));
};

Raphael.fn.invertedTri = function(x, y, length) {
	var x1 = x;
	var y1 = y + length;
	var offsetX = Math.cos(30 * Math.PI / 180) * length;
	var offsetY = Math.tan(60 * Math.PI / 180) * offsetX;
	var x2 = x + offsetX;
	var y2 = y - offsetY;
	var x3 = x - offsetX;
	var y3 = y - offsetY;
	var arrPath = ["M", x1, y1, "L", x2, y2, "L", x3, y3, "z"];
	return this.path(arrPath.concat(" "));
};

Raphael.fn.box = function(x, y, length) {
	var offset = Math.cos(45 * Math.PI / 180) * length;
	var arrPath = ["M", x - offset, y - offset, "L", x + offset, y - offset, "L", x + offset, y + offset, "L", x - offset, y + offset, "z"];
	return this.path(arrPath.concat(" "));
};

Raphael.fn.diamond = function(x, y, length) {
	var arrPath = ["M", x, y - length, "L", x + length, y, "L", x, y + length, "L", x - length, y, "z"];
	return this.path(arrPath.concat(" "));
};

Raphael.fn.cross = function(x, y, length) {
	var offset = Math.cos(45 * Math.PI / 180) * length;
	var arrPath = ["M", x - offset, y - offset, "L", x + offset, y + offset, "M", x - offset, y + offset, "L", x + offset, y - offset];
	return this.path(arrPath.concat(" "));
};


(function($) {
	
$.widget("ui.wijlinechart", $.ui.wijchartcore, {
	// widget options    
	options: {
		/// <summary>
		/// A value that indicates whether to show the animation and the duration for the animation.
		/// Default: {enabled:true, duration:2000}.
		/// Type: Object.
		/// </summary>
		animation:{
			/// <summary>
			/// A value that determines whether to show the animation.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			enabled:true,
			/// <summary>
			/// A value that indicates the duration for the animation.
			/// Default: 2000.
			/// Type: Number.
			/// </summary>
			duration:2000
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
		$.ui.wijchartcore.prototype._create.apply(this, arguments);
		this.chartElement.addClass("ui-wijlinechart");
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
		this.chartElement.removeClass("ui-wijlinechart");
		$.ui.wijchartcore.prototype.destroy.apply(this, arguments);

	},

	/*****************************
	Widget specific implementation
	******************************/
	/** public methods */

	/* returns reference to raphael's path object for the line data with given index */
	getLinePath: function (lineIndex) {
		return this.paths[lineIndex];
	},

	/* returns reference to set of the raphael's objects(circles) what represents markers for the line data with given index */
	getLineMarkers: function (lineIndex) {
		var o = this.options;
		if (o.seriesList && o.seriesList[lineIndex].markers && o.seriesList[lineIndex].markers.visible) {
			return this.markersSet[lineIndex];
		}
		else {
			var und;
			return und;
		}
		//return this.markersSet[lineIndex];
	},

	/** Private methods */
	
	 _getAnchors: function(p1x, p1y, p2x, p2y, p3x, p3y) {
		var l1 = (p2x - p1x) / 2,
		l2 = (p3x - p2x) / 2,
		a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
		b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
		a = p1y < p2y ? Math.PI - a : a;
		b = p3y < p2y ? Math.PI - b : b;
		var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
		dx1 = l1 * Math.sin(alpha + a),
		dy1 = l1 * Math.cos(alpha + a),
		dx2 = l2 * Math.sin(alpha + b),
		dy2 = l2 * Math.cos(alpha + b);
		return {
			x1: p2x - dx1,
			y1: p2y + dy1,
			x2: p2x + dx2,
			y2: p2y + dy2
		};
	},

	_paintLegend: function () {
		var o = this.options;
		$.extend(true, o, {
			legend: {
				size: {
					width: 30,
					height: 3
				}
			}
		});

		$.ui.wijchartcore.prototype._paintLegend.apply(this, arguments);

		if (o.legend.visible) {
			//set fill attr to legendIcons
			if (this.legends.length && this.legendIcons.length) {
				for (var i = 0, ii = this.legendIcons.length; i < ii; i++) {
					var legendIcon = this.legendIcons[i];
					legendIcon.attr({
						fill: legendIcon.attr("stroke")
					});
				}
			}
			//add marker to legendIcons
			var chartsSeries = o.seriesList;
			var chartsSeriesStyles = o.seriesStyles;
			var idx = 0;
			if (!o.legend.reversed) {
				for (var i = 0, ii = chartsSeries.length; i < ii; i++) {
					var chartSeries = chartsSeries[i];
					var chartSeriesStyle = chartsSeriesStyles[i];
					if (chartSeries.legendEntry) {
						if (chartSeries.markers && chartSeries.markers.visible) {
							var legendIcon = this.legendIcons[i];
							var box = legendIcon.wijGetBBox();
							var x = box.x + box.width / 2;
							var y = box.y + box.height / 2;
							var markerStyle = chartSeries.markerStyle;
							markerStyle = $.extend({
								fill: chartSeriesStyle.stroke,
								stroke: chartSeriesStyle.stroke,
								opacity: 1
							}, markerStyle);
							var type = chartSeries.markers.type;
							if (!type) {
								type = "circle";
							}
							var dot = this._paintMarker(type, x, y, 3);
							dot.attr(markerStyle);
							this.legendEles.push(dot);
						}
						idx++;
					}
				}
			}
			else {
				for (var i = chartsSeries.length - 1; i >= 0; i--) {
					var chartSeries = chartsSeries[i];
					var chartSeriesStyle = chartsSeriesStyles[i];
					if (chartSeries.legendEntry && chartSeries.markers.visible) {
						if (chartSeries.markers.visible) {
							var legendIcon = this.legendIcons[i];
							var box = legendIcon.wijGetBBox();
							var x = box.x + box.width / 2;
							var y = box.y + box.height / 2;
							var markerStyle = chartSeries.markerStyle;
							markerStyle = $.extend({
								fill: chartSeriesStyle.stroke,
								stroke: chartSeriesStyle.stroke,
								opacity: 1
							}, markerStyle);
							var type = chartSeries.markers.type;
							if (!type) {
								type = "circle";
							}
							var dot = this._paintMarker(type, x, y, 3);
							dot.attr(markerStyle);
						}
						idx++;
					}
				}
			}
		}
	},
	
	_clearChartElement: function() {
		this.linesStyle = [];
		if(this.paths.length) {
			for (var i = 0, ii = this.paths.length; i < ii; i++) {
				this.paths[i].remove();
			}
			this.paths = [];
		}
		if(this.shadowPaths.length) {
			for (var i = 0, ii = this.shadowPaths.length; i < ii; i++) {
				this.shadowPaths[i].remove();
			}
			this.shadowPaths = [];
		}
		if(this.markersSet.length) {
			for (var i = 0, ii = this.markersSet.length; i < ii; i++) {
				var markerSet = this.markersSet[i];
				for (var j = 0, jj = markerSet.length; j < jj; j++) {
					markerSet[j].remove();
				}
			}
			this.markersSet = [];
		}
		if(this.animationSet.length) {
			for (var i = 0, ii = this.animationSet.length; i < ii; i++) {
				this.animationSet[i].remove();
			}
			this.animationSet = this.canvas.set();
		}
		if(this.symbols.length) {
			for (var i = 0, ii = this.symbols.length; i < ii; i++) {
				this.symbols[i].remove();
			}
			this.symbols = [];
		}
		$.ui.wijchartcore.prototype._clearChartElement.apply(this, arguments);
	},
	
	_paintMarker: function(type, x, y, length) {
		var marker = null;
		switch(type) {
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
	
	_paintPlotArea: function () {
		var self  = this;
		var o = self.options;
		var cBounds = self.canvasBounds;
		var width = cBounds.endX - cBounds.startX;
		var height = cBounds.endY - cBounds.startY;

		var linesSeries = o.seriesList;
		var linesSeriesStyles = o.seriesStyles;

		this.plotInfos = [];
		for (var k = 0, kk = linesSeries.length; k < kk; k++) {
			var lineSeries = linesSeries[k];
			var lineSeriesStyle = linesSeriesStyles[k];
			//set default value of line series
			lineSeries = $.extend(true, {
				//showMarkers: false,
				fitType: "line",
				markers: {
					visible: false,
					type: "circle"
				},
				visible: true
			}, lineSeries);
			var lineData = lineSeries.data;
			var lineStyle = $.extend({
				stroke: "black",
				opacity: 1,
				fill: "none",
				//stroke: lineStyle.color,
				"stroke-width": 2,
				"stroke-linejoin": "round",
				"stroke-linecap": "round"
			}, lineSeriesStyle);
			var lineMarkerStyle = lineSeries.markerStyle;
			lineMarkerStyle = $.extend({
				fill: lineStyle.stroke,
				stroke: lineStyle.stroke,
				opacity: 1,
				width: 3
			}, lineMarkerStyle);

			var valuesX = lineData.x;
			var valuesY = lineData.y;

			var minX = o.axis.x.min;
			var minY = o.axis.y.min;
			var maxX = o.axis.x.max;
			var maxY = o.axis.y.max;

			var kx = width / (maxX - minX);
			var ky = height / (maxY - minY);

			var plotInfo = {
				minX: minX,
				minY: minY,
				maxX: maxX,
				maxY: maxY,
				width: width,
				height: height
			};
			this.plotInfos.push(plotInfo);

			// Lines and markers:
			var markers = this.canvas.set();
			var pathArr = [];
			var fitType = lineSeries.fitType;
			var paintSymbol = false;	
			if(lineSeries.markers.symbol && lineSeries.markers.symbol.length) {
				paintSymbol = true;
			}
			var isXTime = this.axisInfo.x.isTime;
			var isYTime = this.axisInfo.y.isTime;
			var defaultChartLabels = this.canvas.set();
			for (var j = 0, jj = valuesY.length; j < jj; j++) {
				var valX = valuesX[j];
				if (isXTime) {
					valX = this._toOADate(valX);
				}
				var valY = valuesY[j];
				if(isYTime) {
					valY = this._toOADate(valY);
				}
				if (valX == undefined) {
					break;
				}
				var X = 0;
				if (isNaN(valX)) {
					X = cBounds.startX + (j - minX) * kx;
				}
				else {
					X = cBounds.startX + (valX - minX) * kx;
				}
				var Y = cBounds.endY - (valY - minY) * ky;
				
				if (fitType == "line") {
					pathArr = pathArr.concat([j ? "L" : "M", X, Y]);
				////pathArr = pathArr.concat(["C", pX, pY, cX, cY, nX, nY]);//pX, pY, cX, cY, nX, nY
				}
				else if (fitType == "spline") {
					if (!j) {
						pathArr = ["M", X, Y, "C", X, Y];
					}
					else if (j && j < jj - 1) {
						var valY0 = valuesY[j - 1];
						var valY2 = valuesY[j + 1];
						if (isYTime) {
							valY0 = this._toOADate(valY0);
							valY2 = this._toOADate(valY2);
						}
						var Y0 = cBounds.endY - (valY0 - minY) * ky, X0 = 0;
						var Y2 = cBounds.endY - (valY2 - minY) * ky, X2 = 0;
						if (isNaN(valX)) {
							X0 = cBounds.startX + (j - 1 - minX) * kx;
							X2 = cBounds.startX + (j + 1 - minX) * kx;
						}
						else {
							var valX0 = valuesX[j - 1];
							var valX2 = valuesX[j + 1];
							if (isXTime) {
								valX0 = this._toOADate(valX0);
								valX2 = this._toOADate(valX2);
							}
							X0 = cBounds.startX + (valX0 - minX) * kx;
							X2 = cBounds.startX + (valX2 - minX) * kx;
						}
						var a = this._getAnchors(X0, Y0, X, Y, X2, Y2);
						pathArr = pathArr.concat([a.x1, a.y1, X, Y, a.x2, a.y2]);
					}
					else {
						pathArr = pathArr.concat([X, Y, X, Y]);
					}
				}
				else if(fitType == "bezier") {
					if(!j) {
						pathArr = pathArr.concat(["M", X, Y]);
					}
					else if (j == jj - 1 && j % 2 == 1){
						pathArr = pathArr.concat(["Q", X, Y, X, Y]);
					}
					else {
						if(j % 2 == 0) {
							pathArr = pathArr.concat([X, Y]);
						}
						else {
							pathArr = pathArr.concat(["Q", X, Y]);
						}
					}
				}
				if(o.showDefaultChartLabels) {
					var defaultChartLabel = this.canvas.text(X, Y, valY);
					this.chartLabelEles.push(defaultChartLabel);
					var dclBox = defaultChartLabel.wijGetBBox();
					defaultChartLabel.translate(0, -dclBox.height);
					defaultChartLabels.push(defaultChartLabel);
				}
				
				var dot = null;
				var isSymbol = false;
				if(paintSymbol) {
					var symbols = lineSeries.markers.symbol;
					for(var x = 0, xx = symbols.length; x < xx; x++) {
						var symbol = symbols[x];
						if(symbol.index == j) {
							//dot = this.canvas.image(symbol.url, X - symbol.width / 2, Y - symbol.height / 2, symbol.width, symbol.height);
							dot = this.canvas.image(symbol.url, X - symbol.width / 2, Y - symbol.height / 2, symbol.width, symbol.height);
							this.symbols.push(dot);
							isSymbol = true;
							break;
						}
					}
					
				}
				if (dot == null) {
					var markerType = lineSeries.markers.type;
					var markerWidth = lineMarkerStyle.width;
					dot = this._paintMarker(markerType, X, Y, markerWidth);
					//dot = this.canvas.circle(X, Y, lineMarkerStyle.width);
					if(lineSeries.markers.visible) {
						dot.attr(lineMarkerStyle);
					}
				}
				
				//$(dot.node).addClass("wijchart-canvas-object wijchart-canvas-marker");
				this._addClass($(dot.node), "wijchart-canvas-object wijchart-canvas-marker");
				var markerData = {};
				markerData.marker = dot;
				markerData.index = j;
				markerData.type = "marker";
				markerData.lineSeries = lineSeries;
				markerData.x = X;
				markerData.y = Y;
				markerData.isSymbol = isSymbol;
				$(dot.node).data("wijchartDataObj", markerData);
				markers.push(dot);
				
				this.animationSet.push(dot);
				
				//always add markers,if markers.visible is false,
				//these markers are added for hint.
				//if (lineSeries.markers.visible) {
				//	var dot = this.canvas.circle(X, Y, lineMarkerStyle.width);
				//	$(dot.node).addClass("wijchart-canvas-object");
				//	markers.push(dot);
				//}
			}
			//var lines = this.canvas.set();
			var path = this.canvas.path(pathArr.join(" "));
			
			//shadow
			this._paintShadow(path);

			//path.attr(lineStyle);
			path.wijAttr(lineStyle);

			this.paths[k] = path;
			if (path.shadow){
				this.shadowPaths[k] = path.shadow;
			}
			this.animationSet.push(path);
			
			this.linesStyle[k] = {
				lineStyle: lineStyle,
				markerStyle: lineMarkerStyle
			};

			if(!lineSeries.markers.visible) {
				markers.hide();
			}
			if(!lineSeries.visible) {
				path.hide();
				
				if (path.shadow){
					path.shadow.hide();
				}
			}

			if(lineSeries.markers.style) {
				markers.attr(lineSeries.markers.style);
			}
			markers.toFront();
			if(defaultChartLabels.length) {
				defaultChartLabels.attr(o.chartLabelStyle);
				defaultChartLabels.toFront();
			}
			this.markersSet[k] = markers;
			lineSeries.index = k;
			lineSeries.type = "line";
			lineSeries.path = path;
			lineSeries.lineMarkers = markers;
			lineSeries.lineStyle = lineStyle;
			this._addClass($(path.node), "wijchart-canvas-object");
			//$(path.node).addClass("wijchart-canvas-object");
			$(path.node).data("wijchartDataObj", lineSeries);
		}
		if(o.animation.enabled) {
			this.animationSet.wijAttr("clip-rect", cBounds.startX + " " + cBounds.startY + " 0 " + height);
			this.animationSet.wijAnimate({"clip-rect": cBounds.startX + " " + cBounds.startY + " " + width + " " + height}, o.animation.duration, function() {
				if (Raphael.vml) {
					//delete clip-rect's div in vml
					for(var i = 0, ii = self.animationSet.length; i < ii; i++) {
						var ele = self.animationSet[i];
						if(ele.node.clipRect) {
							var attrs = ele.attrs;
							//attrs["clip-rect"] = null;
							delete attrs["clip-rect"];
							ele.node.clipRect = null;
							var group = $(ele.node).parent();
							var clipRect = group.parent();
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
		var o = this.options;
		var method = chartLabel.attachMethod;
		var data = chartLabel.attachMethodData;
		var point = { x: 0, y: 0 };
		switch (method) {
			case "coordinate":
				point.x = data.x;
				point.y = data.y;
				break;
			case "dataCoordinate":
				var seriesIndex = data.seriesIndex;
				if (seriesIndex > -1) {
					var plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						var x = data.x;
						var y = data.y;
						if (this._isDate(x)) {
							x = this._toOADate(x);
						}
						if (this._isDate(y)) {
							y = this._toOADate(y);
						}
						var plotInfo = plotInfos[seriesIndex];
						var kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx;
						var ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - (y - plotInfo.minY) * ky;
					}
				}
				break;
			case "dataIndex":
				var seriesIndex = data.seriesIndex;
				var pointIndex = data.pointIndex;
				var lineData = o.seriesList[seriesIndex].data;
				var x = lineData.x[pointIndex];
				var y = lineData.y[pointIndex];
				if (this._isDate(x)) {
					x = this._toOADate(x);
				}
				if (this._isDate(y)) {
					y = this._toOADate(y);
				}
				if (seriesIndex > -1) {
					var plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						var plotInfo = plotInfos[seriesIndex];
						var kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx;
						var ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - (y - plotInfo.minY) * ky;
					}
				}
				break;
			case "dataIndexY":
				var seriesIndex = data.seriesIndex;
				var pointIndex = data.pointIndex;
				var lineData = o.seriesList[seriesIndex].data;
				var x = lineData.x[pointIndex];
				var y = data.y;
				if (this._isDate(x)) {
					x = this._toOADate(x);
				}
				if (this._isDate(y)) {
					y = this._toOADate(y);
				}
				if (seriesIndex > -1) {
					var plotInfos = this.plotInfos;
					if (plotInfos.length > seriesIndex) {
						var plotInfo = plotInfos[seriesIndex];
						var kx = plotInfo.width / (plotInfo.maxX - plotInfo.minX);
						point.x = this.canvasBounds.startX + (x - plotInfo.minX) * kx ;
						var ky = plotInfo.height / (plotInfo.maxY - plotInfo.minY);
						point.y = this.canvasBounds.startY + plotInfo.height - (y - plotInfo.minY) * ky;
					}
				}
				break;
		}
		return point;
	},

	_bindLiveEvents: function () {
		var self = this;
		var isNewLine = false;
		var proxyObj = {
			//element: this.element,
			element: this.chartElement,
			mousedown: function (e) {
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
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
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
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
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				var zoomOnHover = self.options.zoomOnHover;
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
						self._trigger("mouseover", e, lineSeries);
					}
					else {
						self._trigger("mouseover", e, data);
					}
					//for tooltip 
					if(!(self.hoverLine == lineSeries)) {
						isNewLine = true;
						if (zoomOnHover) {
							if (self.hoverLine != null) {
								var idx = self.hoverLine.index;
								var style = self.linesStyle[idx];
								self.hoverLine.path.wijAttr({
									"stroke-width": parseInt(style.lineStyle["stroke-width"])
								});
								if((self.hoverPoint != null) && !self.hoverPoint.isSymbol) {
									self.hoverPoint.marker.wijAttr({
										"stroke": style.markerStyle["stroke"]
									});
									self.hoverPoint.marker.scale(1, 1);
								}
							}
							
							var idx = lineSeries.index;
							//var style = lineSeries.style;
							//self.linesStyle[idx].lineStyle = style;
							var style = self.linesStyle[idx].lineStyle;
							lineSeries.path.wijAttr({
								"stroke-width": parseInt(style["stroke-width"]) + 1
							});
						}
						
						self.hoverLine = lineSeries;
						self.hoverPoint = null;
						
					}
				}
				else {
					self._trigger("mouseover", e, data);
					//for tooltip 
					if(data.type == "line") {
						if(!(self.hoverLine == data)) {
							isNewLine = true;
							if (zoomOnHover) {
								if (self.hoverLine != null) {
									var idx = self.hoverLine.index;
									var style = self.linesStyle[idx];
									self.hoverLine.path.wijAttr({
										"stroke-width": parseInt(style.lineStyle["stroke-width"])
									});
									if((self.hoverPoint != null) && !self.hoverPoint.isSymbol) {
										self.hoverPoint.marker.wijAttr({
											"stroke": style.markerStyle["stroke"]
										});
										self.hoverPoint.marker.scale(1, 1);
									}
								}
								
								var idx = data.index;
								//var style = data.style;
								//self.linesStyle[idx].lineStyle = style;
								var style = self.linesStyle[idx].lineStyle;
								data.path.wijAttr({
									"stroke-width": parseInt(style["stroke-width"]) + 1
								});
							}
							
							self.hoverLine = data;
							self.hoverPoint = null;
						}
					}
				}
			},
			mouseout: function (e) {
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
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
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
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
				var tar = $(e.target);
				var data = $(e.target).data("wijchartDataObj");
				if (tar.hasClass("wijchart-canvas-marker")) {
					var lineSeries = data.lineSeries;
					//if (!lineSeries.showMarkers) {
					if(!lineSeries.markers.visible) {
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
		};
		var o = this.options;
		var hint = o.hint;
		$(".wijchart-canvas-object", this.chartElement[0])
					.live("mousedown.wijliechart", $.proxy(proxyObj.mousedown, proxyObj))
					.live("mouseup.wijliechart", $.proxy(proxyObj.mouseup, proxyObj))
					.live("mouseover.wijliechart", $.proxy(proxyObj.mouseover, proxyObj))
					.live("mouseout.wijliechart", $.proxy(proxyObj.mouseout, proxyObj))
					.live("mousemove.wijliechart", $.proxy(proxyObj.mousemove, proxyObj))
					.live("click.wijliechart", $.proxy(proxyObj.click, proxyObj));

		if (hint.enable) {
			if (!this.tooltipEle) {
				this.tooltipEle = this.canvas.wij.tooltip(this);
			}
		}
		var bounds = self.canvasBounds;
		var elePos = self.chartElement.offset();
		var zoomOnHover = o.zoomOnHover;
		
		this.chartElement.bind("mousemove", function(e) {
			var mousePos = {
				left: e.pageX - elePos.left,
				top: e.pageY - elePos.top
			}
			if (mousePos.left >= bounds.startX && mousePos.left <= bounds.endX
				&& mousePos.top >= bounds.startY && mousePos.top <= bounds.endY) {
				if(self.hoverLine != null) {
					if(isNewLine) {
						if (hint.enable) {
							self.tooltipEle.hide(0);
						}
						isNewLine = false;
					}
					var markers = self.hoverLine.lineMarkers;
					var idx = -1, distance = 0, point = {x: 0, y: 0};
					for (var i = 0, ii = markers.length; i < ii; i++) {
						var marker = markers[i];
						var box = marker.wijGetBBox();
						var pos = box.x + box.width / 2;
						var dis = Math.abs(pos - mousePos.left);
						if (i == 0) {
							distance = dis;
							idx = i;
							point = {
								x: pos,
								y: box.y + box.height / 2
							};
						} else if (dis < distance) {
							distance = dis;
							idx = i;
							point = {
								x: pos,
								y: box.y + box.height / 2
							};
						}
					}
					if(self.hoverPoint != null && self.hoverPoint.index == idx) {
						return;
					}
					if (idx > -1) {
						var point = $(markers[idx].node).data("wijchartDataObj");
						if(zoomOnHover) {
							if((self.hoverPoint != null) && !self.hoverPoint.isSymbol) {
								var index = self.hoverLine.index;
								var style = self.linesStyle[index];
								self.hoverPoint.marker.wijAttr({
									"stroke": style.markerStyle["stroke"]
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
					if (hint.enable) {
						var valueX, valueY;
						var seriesData = self.hoverLine.data;
						
						if (seriesData.x) {
							valueX = seriesData.x[idx];
							valueY = seriesData.y[idx];
						}
						else {
							valueX = seriesData.xy[2 * idx];
							valueY = seriesData.xy[2 * idx + 1];
						}
						var dataObj = self.hoverPoint;
						var data = {
							data: dataObj,
							content: "",
							cancel: false,
							offset: hint.offset,
							compass: hint.compass,
							showDelay: hint.showDelay,
							hideDelay: hint.hideDelay,
							textStyle: hint.textStyle,
							duration: hint.duration,
							easing: hint.easing,
							style: hint.style,
							x: valueX,
							y: valueY,
							index: idx
						};
						self._trigger("hintshowing", null, data);
						
						if (!data.cancel) {
							var content = data.content;
							var format = hint.formatter;
							//if (!content && format.length) {
							if (!content) {
								if ($.isFunction(format)) {
									var obj = {
										x: valueX,
										y: valueY,
										data: dataObj,
										fmt: format
									};
									var fmt = $.proxy(obj.fmt, obj);
									content = fmt();
								}
								else {
									content = format;
								}
							}
							self.tooltipEle.showDelay = data.showDelay;
							self.tooltipEle.hideDelay = data.hideDelay;
							self.tooltipEle.duration = data.duration;
							self.tooltipEle.easing = data.easing;
							self.tooltipEle.textAttr = data.textStyle;
							self.tooltipEle.rectAttr = $.extend({
								stroke: self.hoverLine.path.attr("stroke")
							}, data.style);
							self.tooltipEle.text = content;
							self.tooltipEle.offset = data.offset;
							self.tooltipEle.compass = data.compass;
							self.tooltipEle.showAt(point);
							self._trigger("hintshown", null, data);
						}
					}
				}
			}
			else {
				if (hint.enable) {
					self.tooltipEle.hide();
				}
				
				if(zoomOnHover) {
					if (self.hoverLine != null) {
						var idx = self.hoverLine.index;
						var style = self.linesStyle[idx];
						self.hoverLine.path.wijAttr({
							"stroke-width": parseInt(style.lineStyle["stroke-width"])
						});
						if((self.hoverPoint != null) && !self.hoverPoint.isSymbol) {
							self.hoverPoint.marker.wijAttr({
								"stroke": style.markerStyle["stroke"]
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

})(jQuery);
