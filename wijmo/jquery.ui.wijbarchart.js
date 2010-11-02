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
 * * Wijmo BarChart widget
 *
 * Depends:
 *  raphael.js
 *  raphael-popup.js
 *  jquery.glob.js
 *  jquery.ui.widget.js
 *  jquery.ui.svgdom.js
 *  jquery.ui.wijchartcore.js
 *
 */
(function ($) {

	$.widget("ui.wijbarchart", $.ui.wijchartcore, {
		options: {
			/// <summary>
			/// A value that determines whether the bar chart renders horizontal or vertical.
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
	        ///  $("#barchart").wijbarchart({
		    ///      horizontal: false
	        ///  });
			/// </summary>
			horizontal: true,
			/// <summary>
			/// A value that determines whether to show a stacked chart.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      stacked: true
			///  });
			/// </summary>
			stacked: false,
			/// <summary>
			/// A value that determines whether to show a stacked and percentage chart.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      is100Percent: true
			///  });
			/// </summary>
			is100Percent: false,
			/// <summary>
			/// A value that indicates the percentage of bar elements in the same cluster overlap.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      clusterOverlap: 10
			///  });
			/// </summary>
			clusterOverlap: 0,
			/// <summary>
			/// A value that indicates the percentage of the plotarea that each bar cluster occupies.
			/// Default: 50.
			/// Type: Number.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      clusterWidth: 75
			///  });
			/// </summary>
			clusterWidth: 85,
			/// <summary>
			/// A value that indicates the corner-radius for the bar.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      clusterRadius: 5
			///  });
			/// </summary>
			clusterRadius: 0,
			/// <summary>
			/// A value that indicates the spacing between the adjacent bars.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      clusterSpacing: 3
			///  });
			/// </summary>
			clusterSpacing: 0,
			/// <summary>
			/// A value that indicates whether to show animation and the duration for the animation.
			/// Default: {enabled:true, duration:2000}.
			/// Type: Object.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      stacked: true
			///  });
			/// </summary>
			animation: {
				/// <summary>
				/// A value that determines whether to show animation.
				/// Default: true.
				/// Type: Boolean.
				/// </summary>
				enabled: true,
				/// <summary>
				/// A value that indicates the duration for the animation.
				/// Default: 2000.
				/// Type: Number.
				/// </summary>
				duration: 400,
				/// <summary>
				/// A value that indicates the easing for the animation.
				/// Default: "linear".
				/// Type: string.
				/// </summary>
				easing: "easeOutExpo"
			}
		},

		_create: function () {
			var defFill = [
				"0-#8ac4c0-#77b3af",
				"0-#73a19e-#67908e",
				"0-#4f687b-#465d6e",
				"0-#69475b-#5d3f51",
				"0-#7a3b3f-#682e32",
				"0-#9d5b5b-#8c5151",
				"0-#e5a36d-#ce9262",
				"0-#e6cc70-#ceb664",
				"0-#8ec858-#7fb34f",
				"0-#3a9073-#2a7b5f",
				"0-#6c88e3-#6079cb",
				"0-#6cb4e3-#60a0cb"
			];
			var o = this.options;
			if (o.horizontal) {			
				$.extend(true, o.axis, {
					x:{
						compass:"west"
					},
					y:{
						compass:"south"
					}
				})
			}

			$.ui.wijchartcore.prototype._create.apply(this, arguments);

			this.chartElement.addClass("ui-wijbarchart");
			$.extend(true, {
				compass: "east"
			}, this.options.hint);
			// default some fills
			$.each(this.options.seriesStyles, function (idx, style) {
				if (style.fill == null) {
					style.fill = defFill[idx];
				}
			});
		},

		/*_setOption: function (key, value) {
		switch (key) {
		default:
		break;
		}
		$.ui.wijchartcore.prototype._setOption.apply(this, arguments);
		},*/

		destroy: function () {
			this.chartElement
			.removeClass("ui-wijbarchart ui-helper-reset");
			$.ui.wijchartcore.prototype.destroy.apply(this, arguments);
		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */
		getBar: function (index) {
			/// <summary>
			/// Returns the bar which has a set of the Raphael's objects(rects) that represents bars for the series data with the given index.
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the bar.
			/// </param>
			/// <returns type="Raphael element">
			/// The bar object.
			/// </returns>
			return this.bars[index];
		},
		/** end of public methods */

		/** private methods */
		_get_clusterOverlap: function (clusterOverlap) {
			return clusterOverlap / 100;
		},

		_get_clusterWidth: function (clusterWidth) {
			return clusterWidth / 100;
		},

		_adjustToLimits: function (val, min, max) {
			if (val < min) {
				return min;
			}

			if (val > max) {
				return max;
			}

			return val;
		},

		_transformPoints: function (inverted, xscale, yscale, xlate, ylate, points) {
			$.each(points, function (idx, point) {
				var x = point.x;
				var y = point.y;
				point.x = xscale * x + xlate;
				point.y = yscale * y + ylate;
				
				if (inverted){
					var temp = point.x;
					point.x = point.y;
					point.y = temp;
				}
			})

			return points;
		},

		_paintPlotArea: function () {
			var o = this.options;
			var plotArea = $.extend(true, {
				visible: true
			}, o.plotArea);

			if (!plotArea || !plotArea.visible) {
				return;
			}

            var inverted = o.horizontal;
			var stacked = o.stacked;
			var is100Percent = stacked && o.is100Percent;
			var seriesList = o.seriesList;
			var nSeries = seriesList.length;
			var seriesStyles = o.seriesStyles.slice(0, nSeries);
			var seriesHoverStyles = o.seriesHoverStyles.slice(0, nSeries);
			var xaxis = o.axis.x; //todo need add chartarea
			var yaxis = o.axis.y;
			var clusterOverlap = this._get_clusterOverlap(o.clusterOverlap);
			var clusterWidth = this._get_clusterWidth(o.clusterWidth);
			var startLocation = { x: this.canvasBounds.startX, y: this.canvasBounds.startY };
			var width = this.canvasBounds.endX - startLocation.x;
			var height = this.canvasBounds.endY - startLocation.y;
			var plotInfos = {};
			var bars = [];
			var animatedBars = [];
			var shadowOffset = 1;
			var clusterSpacing = o.clusterSpacing + shadowOffset;
			var animatedBar = null;

			if (inverted && !stacked){
				seriesList.reverse();
				seriesStyles.reverse();
				seriesHoverStyles.reverse();
			}
			
			if (nSeries > 0) {
				var bpl = this._barPointList(seriesList);
				if (stacked) {
					bpl = this._stackValues(bpl);
				}

				var nPoints = bpl.length;
				var minDX = this._getMinDX(bpl);
				var dx = minDX * clusterWidth;
				var bw = dx;
				var chartLabels = this.canvas.set();
				var animation = o.animation;
				var animated = animation && animation.enabled;
				var xscale = this._getScaling(inverted, xaxis.max, xaxis.min, inverted ? height : width);
				var yscale = this._getScaling(!inverted, yaxis.max, yaxis.min, inverted ? width : height);
				var xlate = this._getTranslation(inverted, startLocation, xaxis.max, xaxis.min, xscale);
				var ylate = this._getTranslation(!inverted, startLocation, yaxis.max, yaxis.min, yscale);
				plotInfos.xscale = xscale;
				plotInfos.yscale = yscale;
				plotInfos.xlate = xlate;
				plotInfos.ylate = ylate;

				// adjust the bar width (bw) to account for overlap
				if (nSeries > 1 && !stacked) {
				clusterOverlap -= (nPoints*(nSeries - 1)*clusterSpacing)/(inverted?height:width);
					bw /= (nSeries * (1 - clusterOverlap) + clusterOverlap);
				}

				// plot a bar group for each datapoint
				for (var p = 0; p < nPoints; p++) {
					var xs = bpl[p];
					var ps = xs.paSpec;
					var ns = ps.length;
					var sx;
					if (stacked) {
						sx = bw;
					}
					else {
						sx = (bw * (ns * (1 - clusterOverlap) + clusterOverlap));
					}

					// calculate the first series rectangle
					var rp = { x: xs.x - sx / 2, y: 0, width: bw, height: ps[0].y };

					for (var s = 0; s < ps.length; s++) {
						var series = seriesList[ps[s].sIdx];
						var seriesStyle = seriesStyles[ps[s].sIdx];
						var seriesHoverStyle = seriesHoverStyles[ps[s].sIdx];

						// adjust the rectangle for this point
						if (stacked) {
							if (is100Percent) {
								var full = ps[ps.length - 1].y;

								if (full > 0) {
									rp.height = ps[s].y / full;
								}

								if (s > 0) {
									rp.height -= ps[s - 1].y / full;
									rp.y = ps[s - 1].y / full;
								}
							}
							else {
								rp.height = ps[s].y;

								if (s > 0) {
									rp.height -= ps[s - 1].y;
									rp.y = ps[s - 1].y;
								}
							}
						}
						else {
							if (s > 0) {
								// 1 bar over less overlap and 1 pixel
								rp.x += rp.width * (1 - clusterOverlap);
								rp.height = ps[s].y;
							}
						}

						var x = [{ x: rp.x, y: rp.y }, { x: rp.x + rp.width, y: rp.y + rp.height}]
						var inPlotArea = ((xaxis.min <= x[0].x && x[0].x <= xaxis.max)
										|| (xaxis.min <= x[1].x && x[1].x <= xaxis.max))
									   && ((yaxis.min <= x[0].y && x[0].y <= yaxis.max)
										|| (yaxis.min <= x[1].y && x[1].y <= yaxis.max));

						x[0].x = this._adjustToLimits(x[0].x, xaxis.min, xaxis.max);
						x[0].y = this._adjustToLimits(x[0].y, yaxis.min, yaxis.max);
						x[1].x = this._adjustToLimits(x[1].x, xaxis.min, xaxis.mMax);
						x[1].y = this._adjustToLimits(x[1].y, yaxis.min, yaxis.max);

						x = this._transformPoints(inverted, xscale, yscale, xlate, ylate, x);

						var hold = 0;

						if (x[0].x > x[1].x) {
							hold = x[0].x;
							x[0].x = x[1].x;
							x[1].x = hold;
						}

						if (x[0].y > x[1].y) {
							hold = x[0].y;
							x[0].y = x[1].y;
							x[1].y = hold;
						}

						var rf = { x: x[0].x, y: x[0].y, width: x[1].x - x[0].x, height: x[1].y - x[0].y };

						if (inPlotArea) {
							if (rf.width == 0) {
								rf.width = 0.5;
							}

							if (rf.height == 0) {
								rf.height = 0.5;
							}
						}

						if (plotInfos.rects == null) {
							plotInfos.rects = [];
						}

						if (plotInfos.rects[s] == null) {
							plotInfos.rects[s] = [];
						}

						plotInfos.rects[s][p] = rf;
						var defaultChartLabel = null;

						if (o.showChartLabels) {
							var textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
							var pos = inverted? {x:rf.x + rf.width, y:rf.y + rf.height / 2} : {x:rf.x + rf.width/2, y:rf.y};
							defaultChartLabel = this._text(pos.x, pos.y, ps[s].y).attr(textStyle);
							var dclBox = defaultChartLabel.getBBox();
							if (inverted){
								defaultChartLabel.translate(dclBox.width / 2, 0);
							}
							else{
								defaultChartLabel.translate(0, -dclBox.height/2);
							}
							chartLabels.push(defaultChartLabel);
						}

						var bar = null;
						var r = seriesStyle.r ? seriesStyle.r : o.clusterRadius;
						//var r = series.style.r ? series.style.r : o.clusterRadius;
						//var style = series.style;
						var style = seriesStyle = $.extend(true, {
							fill: "#fff",
							"fill-opacity": 1,
							stroke: "#000",
							"stroke-dasharray": "",
							"stroke-opacity": 1,
							"stroke-width": 1
						}, seriesStyle);

						if (r) {
							style = $.extend(true, {}, seriesStyle, {
								r: 0
							});
						}

						//var strokeWidth = series.style["stroke-width"];
						//var stroke = series.style["stroke"];
						var strokeWidth = seriesStyle["stroke-width"];
						var stroke = seriesStyle["stroke"];

						if (stroke != "none" && strokeWidth) {
							strokeWidth = parseInt(strokeWidth);
						}

						if (!strokeWidth || isNaN(strokeWidth)) {
							strokeWidth = 0;
						}

						if (animated) {
							if (r) {
								if (inverted){
									bar = this.canvas.wij.roundRect(rf.x, rf.y, rf.width - strokeWidth, rf.height - strokeWidth, 0, 0, r, r).hide();
									animatedBar = this.canvas.rect(startLocation.x, rf.y, 0, rf.height - strokeWidth);
								}
								else{
									bar = this.canvas.wij.roundRect(rf.x, rf.y, rf.width - strokeWidth, rf.height - strokeWidth, r, 0, 0, r).hide();
									animatedBar = this.canvas.rect(rf.x, startLocation.y + height - strokeWidth, rf.width, 0);
								}
								
								this._paintShadow(animatedBar, shadowOffset);
								animatedBar.wijAttr(style);
								animatedBar.bar = bar;
							}
							else {
								if (inverted){
									bar = this.canvas.rect(startLocation.x, rf.y, 0, rf.height - strokeWidth);
								}
								else{
									bar = this.canvas.rect(rf.x, startLocation.y + height - strokeWidth, rf.width, 0);
								}
								animatedBar = bar;
							}

							if (defaultChartLabel) {
								defaultChartLabel.attr({ opacity: 0 });
								animatedBar.chartLabel = defaultChartLabel;
							}

							animatedBar.left = rf.x;
							animatedBar.top = rf.y;
							animatedBar.width = rf.width - strokeWidth;
							animatedBar.height = rf.height - strokeWidth;
							animatedBar.r = r;
						}
						else {
							if (r) {
								bar = this.canvas.wij.roundRect(rf.x, rf.y, rf.width - strokeWidth, rf.height - strokeWidth, 0, 0, r, r);
							}
							else {
								bar = this.canvas.rect(rf.x, rf.y, rf.width - strokeWidth, rf.height - strokeWidth);
							}
						}

						this._paintShadow(bar, shadowOffset);
						//bar.wijAttr(series.style);
						bar.wijAttr(seriesStyle);

						series.type = "bar";
						series.style = seriesStyle;
						series.hoverStyle = seriesHoverStyle;
						//$(bar.node).addClass("wijchart-canvas-object");
						this._addClass($(bar.node), "wijchart-canvas-object");
						$(bar.node).data("wijchartDataObj", $.extend(true, { index: p, bar: bar }, series));
						bars.push(bar);
						animatedBars.push(animatedBar);
					}
				}

				this.chartElement.data("plotInfos", plotInfos);
				$.each(chartLabels, function (idx, chartLabel) {
					chartLabel.toFront();
				})
			}

			if (animated) {
				var duration = animation.duration ? animation.duration : 2000;
				var easing = animation.easing ? animation.easing : "linear";
				for (var idx = 0; idx < animatedBars.length; idx++) {
					animatedBar = animatedBars[idx];
					var params = inverted? {width: animatedBar.width, x: animatedBar.left} : {height:animatedBar.height, y:animatedBar.top};
					animatedBar.wijAnimate(params, duration, easing, function () {
						var b = this;
						var r = b.r;
						var bar = b;

						if (b.chartLabel) {
							b.chartLabel.animate({ opacity: 1 }, 250);
						}

						if (r) {
							bar = b.bar;
							bar.show();

							if (b.shadow) {
								b.shadow.remove();
								b.shadow = null;
							};
							b.remove();
							b = null;
						}
					});
				}
			}

			this.bars = bars;
		},

		_getChartLabelPointPosition: function (chartLabel) {
			var o = this.options;
			var method = chartLabel.attachMethod;
			var data = chartLabel.attachMethodData;
			var point = { x: 0, y: 0 };
			var pi = null;
			var seriesIndex = null;
			var pointIndex = null;
			var x = null;
			var y = null;

			switch (method) {
				case "coordinate":
					point.x = data.x;
					point.y = data.y;
					break;
				case "dataCoordinate":
					pi = this.chartElement.data("plotInfos");
					x = data.x;
					y = data.y;
					if (this._isDate(x)) {
						x = this._toOADate(x);
					}
					if (this._isDate(y)) {
						y = this._toOADate(y);
					}
					point = this._transformPoints(pi.xscale, pi.yscale, pi.xlate, pi.ylate, { x: x, y: y });
					break;
				case "dataIndex":
					seriesIndex = data.seriesIndex;
					pointIndex = data.pointIndex;
					pi = this.chartElement.data("plotInfos");
					if (seriesIndex > -1) {
						var rects = pi.rects;
						if (rects.length > seriesIndex) {
							var rs = rects[seriesIndex];
							var rect = rs[pointIndex];
							point.x = rect.x + rect.width;
							point.y = rect.y + rect.height / 2;
						}
					}
					break;
				case "dataIndexY":
					seriesIndex = data.seriesIndex;
					pointIndex = data.pointIndex;
					if (seriesIndex > -1) {
						var barData = o.seriesList[seriesIndex].data;
						x = barData.x[pointIndex];
						y = data.y;
						pi = this.chartElement.data("plotInfos");
						if (this._isDate(x)) {
							x = this._toOADate(x);
						}
						if (this._isDate(y)) {
							y = this._toOADate(y);
						}
						point = this._transformPoints(pi.xscale, pi.yscale, pi.xlate, pi.ylate, { x: x, y: y });
					}
					break;
			}
			return point;
		},

		_bindLiveEvents: function () {
			var o = this.options;
			var self = this;
			var proxyObj = {
				mousedown: function (e) {
					this._trigger("mousedown", e, $(e.target).data("wijchartDataObj"));
				},
				mouseup: function (e) {
					this._trigger("mouseup", e, $(e.target).data("wijchartDataObj"));
				},
				mouseover: function (e) {
					this._trigger("mouseover", e, $(e.target).data("wijchartDataObj"));
				},
				mouseout: function (e) {
					this._trigger("mouseout", e, $(e.target).data("wijchartDataObj"));
				},
				mousemove: function (e) {
					this._trigger("mousemove", e, $(e.target).data("wijchartDataObj"));
				},
				click: function (e) {
					this._trigger("click", e, $(e.target).data("wijchartDataObj"));
				}
			};
			$(".wijchart-canvas-object", this.chartElement[0])
					.live("mousedown.wijbarchart", $.proxy(proxyObj.mousedown, this))
					.live("mouseup.wijbarchart", $.proxy(proxyObj.mouseup, this))
					.live("mouseover.wijbarchart", $.proxy(proxyObj.mouseover, this))
					.live("mouseout.wijbarchart", $.proxy(proxyObj.mouseout, this))
					.live("mousemove.wijbarchart", $.proxy(proxyObj.mousemove, this))
					.live("click.wijbarchart", $.proxy(proxyObj.click, this));

			$(".wijchart-canvas-object", this.chartElement[0])
					.live("mouseout.wijbarchart", function () {
						var dataObj = $(this).data("wijchartDataObj");
						var bar = dataObj.bar;

						if (!dataObj.hoverStyle) {
							if (bar) {
								bar.attr({ opacity: "1" });
							}
						}
						else {
							bar.attr(dataObj.style);
						}

						if (self.tooltipEle) {
							self.tooltipEle.hide();
						}
					});

			$(".wijchart-canvas-object", this.chartElement[0])
				.live("mousemove.wijbarchart", function (e) {
					var dataObj = $(this).data("wijchartDataObj");

					//code for adding hover state effect.
					var bar = dataObj.bar;

					if (!dataObj.hoverStyle) {
						if (bar) {
							bar.attr({ opacity: "0.8" });
						}
					}
					else {
						bar.attr(dataObj.hoverStyle);
					}
					//end of code for adding hover state effect.

					if (o.hint.enable) {
						if (!self.tooltipEle) {
							self.tooltipEle = self.canvas.wij.tooltip(self);
						}

						var index = dataObj.index;
						var data = dataObj.data;
						var chartPos = self.chartElement.offset();
						var curPos = {
							x: e.pageX,
							y: e.pageY
						};
						var valueX, valueY;
						if (data.x) {
							valueX = data.x[index];
							valueY = data.y[index];
						}
						else {
							valueX = data.xy[2 * index];
							valueY = data.xy[2 * index + 1];
						}
						data = {
							data: dataObj,
							content: "",
							cancel: false,
							offset: o.hint.offset || 3,
							compass: o.hint.compass,
							showDelay: o.hint.showDelay,
							hideDelay: o.hint.hideDelay,
							textStyle: o.hint.textStyle,
							duration: o.hint.duration,
							easing: o.hint.easing,
							style: o.hint.style,
							x: valueX,
							y: valueY,
							index: index
						};
						var point = {
							x: curPos.x - chartPos.left + data.offset,
							y: curPos.y - chartPos.top - data.offset
						};
						self.element.trigger("hintShowing", data);

						if (!data.cancel) {
							var content = data.content;
							var format = o.hint.formatter;

							if (!content) {
								if (format === null) {
								    content = valueY;
								}
								else if ($.isFunction(format)) {
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
								//content = "x: " + valueX + "<br />y: " + valueY;
							}
							var style = dataObj.style;

							self.tooltipEle.showDelay = data.showDelay;
							self.tooltipEle.hideDelay = data.hideDelay;
							self.tooltipEle.duration = data.duration;
							self.tooltipEle.easing = data.easing;
							self.tooltipEle.textAttr = $.extend(true, {}, o.textStyle, data.textStyle);
							self.tooltipEle.rectAttr = $.extend({
								stroke: style["stroke"] || style["fill"], "stroke-opacity": "0.9"
							}, data.style);
							self.tooltipEle.text = content;
							self.tooltipEle.offset = data.offset;
							self.tooltipEle.compass = data.compass;
							self.tooltipEle.showAt(point, 200);
							self._trigger("hintshown", null, data);
						}
					}
				});
		},

		_unbindLiveEvents: function () {
			$(".wijchart-canvas-object", this.chartElement[0]).die("wijbarchart");
		},

		_calculateParameters: function (axisInfo, options) {
			$.ui.wijchartcore.prototype._calculateParameters.apply(this, arguments);

			// check for bar chart and x axis expansion
			if (axisInfo.id == "x") {
				var minor = options.unitMinor;
				var autoMin = options.autoMin;
				var autoMax = options.autoMax;
				var adj = this._getBarAdjustment(axisInfo);

				if (adj == 0) {
					adj = minor;
				}
				else {
					if (minor < adj && minor != 0) {
						adj = Math.floor(adj / minor) * minor;
					}
				}

				if (autoMin) {
					axisInfo.min -= adj;
				}

				if (autoMax) {
					axisInfo.max += adj;
				}

				this._calculateMajorMinor(options, axisInfo);
			}
		},

		_getBarAdjustment: function (axisInfo) {
			var len = 0;
			var o = this.options;
			var max = axisInfo.max;
			var min = axisInfo.min;
			var seriesList = o.seriesList;

			for (var i = 0; i < seriesList.length; i++) {
				var xLen = seriesList[i].data.x.length;

				if (len < xLen) {
					len = xLen;
				}
			}

			if (len > 1) {
				return (max - min) / len * o.clusterWidth * 0.0125;
			}
			else if (len == 1) {
				if (min == 0.0 && max == 1.0) {
					min = -1.0;
					axisInfo.min = min;
				}

				return (max - min) * 0.0125;
			}
			else {
				return 0;
			}
		}
	});

	$.extend($.ui.wijbarchart.prototype, {
		_barPointList: function (seriesList) {
			var x = [];
			var getXSortedPoints = this._getXSortedPoints;

			function xSpec(nx) {
				this.x = nx;
				this.paSpec = [];

				this.stackValues = function () {
					var len = this.paSpec.length;

					if (len > 1) {
						var ps0 = this.paSpec[0];
						for (var i = 1; i < len; i++) {
							var ps = this.paSpec[i];
							ps.y += ps0.y;
							ps0 = ps;
						}
					}
				}
			};

			function addSeriesData(idx, series) {
				var points = getXSortedPoints(series);
				var nSeries = series.length;
				var xs = null;
				var lim = 0;
				if (points != null) {
					lim = points.length;
				}

				var j = 0;
				var jlim = 0;

				if (x != null) {
					jlim = x.length;
				}

				var first_point = true;
				var xprev = 0;
				var dupl = false;

				for (var p = 0; p < lim; p++) {
					if (first_point) {
						first_point = false;
						xprev = points[p].x;
					}
					else {
						if (xprev == points[p].x) {
							dupl = true;
						}
						else {
							dupl = false;
						}
						xprev = points[p].x;
					}

					while (j < jlim && x[j].x < points[p].x) {
						j++;
					}

					if (j < jlim) {
						// use or insert before the existing item
						if (x[j].x != points[p].x) {
							xs = new xSpec(points[p].x, nSeries);
							x.splice(j, 0, xs);
							jlim = x.length;
						}
						else {
							xs = x[j];
						}
					}
					else {
						// add a new item
						xs = new xSpec(points[p].x, nSeries);
						x.push(xs);
						jlim = x.length;
					}

					xs.paSpec.push({ y: points[p].y, sIdx: idx, pIdx: p, dupl: dupl });
				}
			};
			
			$.each(seriesList, function (idx, series) {
				addSeriesData(idx, series);
			});

			return x;
		},

		_getSpecWithValue: function (x) {
			var len = x.length;

			for (var idx = 0; idx < len; idx++) {
				var xs = x[idx];

				if (xs.x >= x) {
					if (xs.x == x) {
						return xs;
					}

					return null;
				}
			}
			return null;
		},

		_getMinDX: function (x) {
			var minDx = Number.MAX_VALUE;
			var len = x.length;

			for (var idx = 1; idx < len; idx++) {
				var dx = x[idx].x - x[idx - 1].x;

				if (dx < minDx && dx > 0) {
					minDx = dx;
				}
			}

			if (minDx == Number.MAX_VALUE) {
				return 2;
			}

			return minDx;
		},

		_stackValues: function (x) {
			$.each(x, function (idx, xSpec) {
				xSpec.stackValues();
			})

			return x;
		}
	})

})(jQuery);
