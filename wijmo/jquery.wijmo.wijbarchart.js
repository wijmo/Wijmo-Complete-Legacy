/*globals jQuery*/
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
 * * Wijmo BarChart widget
 *
 * Depends:
 *  raphael.js
 *  globalize.js
 *  jquery.ui.widget.js
 *  jquery.wijmo.wijchartcore.js
 *
 */

(function ($) {
	"use strict";

	$.widget("wijmo.wijbarchart", $.wijmo.wijchartcore, {
		options: {
			/// <summary>
			/// A value that determines whether the bar chart 
			///	renders horizontal or vertical.
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
			/// A value that indicates the percentage of bar elements 
			///	in the same cluster overlap.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      clusterOverlap: 10
			///  });
			/// </summary>
			clusterOverlap: 0,
			/// <summary>
			/// A value that indicates the percentage of the plotarea 
			///	that each bar cluster occupies.
			/// Default: 85.
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
			/// A value that indicates whether to show animation 
			///	and the duration for the animation.
			/// Default: {enabled:true, duration:400, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      animation: {
			///			enabled: true, duration: 1000, easing: "<"
			///		}
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
				/// Default: 400.
				/// Type: Number.
				/// </summary>
				duration: 400,
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
			/// Default: {enabled:true, duration:400, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#barchart").wijbarchart({
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
				/// Default: 400.
				/// Type: Number.
				/// </summary>
				duration: 400,
				/// <summary>
				/// A value that indicates the easing for the series transition.
				/// Default: ">".
				/// Type: string.
				/// </summary>
				easing: ">"
			},
			/// <summary>
			/// Occurs when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({mouseDown: function(e, data) { } });
			/// Bind to the event by type: wijbarchartmousedown
			/// $("#barchart").bind("wijbarchartmousedown", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousedown bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			mouseDown: null,
			/// <summary>
			/// Occurs when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({mouseUp: function(e, data) { } });
			/// Bind to the event by type: wijbarchartmouseup
			/// $("#barchart").bind("wijbarchartmouseup", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseup bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			mouseUp: null,
			/// <summary>
			/// Occurs when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({mouseOver: function(e, data) { } });
			/// Bind to the event by type: wijbarchartmouseover
			/// $("#barchart").bind("wijbarchartmouseover", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseover bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			mouseOver: null,
			/// <summary>
			/// Occurs when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({mouseOut: function(e, data) { } });
			/// Bind to the event by type: wijbarchartmouseout
			/// $("#barchart").bind("wijbarchartmouseout", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseout bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			mouseOut: null,
			/// <summary>
			/// Occurs when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({mouseMove: function(e, data) { } });
			/// Bind to the event by type: wijbarchartmousemove
			/// $("#barchart").bind("wijbarchartmousemove", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousemove bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			mouseMove: null,
			/// <summary>
			/// Occurs when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#barchart").wijbarchart({click: function(e, data) { } });
			/// Bind to the event by type: wijbarchartclick
			/// $("#barchart").bind("wijbarchartclick", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the clicked bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			///	</param>
			click: null
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
				],
				self = this,
				o = self.options;

			if (o.horizontal) {
				$.extend(true, o.axis, {
					x: {
						compass: "west"
					},
					y: {
						compass: "south"
					}
				});
			}

			$.extend(true, {
				compass: "east"
			}, o.hint);

			// default some fills
			$.each(o.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});

			self.bars = [];
			self.animatedBars = [];
			self.chartLabels = [];

			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijbarchart");
		},

		_setOption: function (key, value) {
			if (key === "horizontal" && !value) {
				$.extend(true, this.options.axis, {
					x: {
						compass: "south"
					},
					y: {
						compass: "west"
					}
				});
			}

			$.wijmo.wijchartcore.prototype._setOption.apply(this, arguments);
		},

		destroy: function () {
			var self = this;
			self.chartElement
				.removeClass("wijmo-wijbarchart ui-helper-reset");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);
			
			if (self.aniBarsAttr && self.aniBarsAttr.length) {
				$.each(self.aniBarsAttr, function (idx, barAttr) {
					barAttr = null;
				});
				self.aniBarsAttr = null;
			}
		},

		_isBarChart: function () {
			return true;
		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */
		getBar: function (index) {
			/// <summary>
			/// Returns the bar which has a set of the Raphael's objects(rects) 
			/// that represents bars for the series data with the given index.
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
		
		_paint: function () {
			var self = this,
				o = self.options,
				sl = o.seriesList,
				isChangeSL = false,
				xVal,
				newSL;
			if (sl.length && sl[0].data && sl[0].data.x && sl[0].data.x.length) {
				xVal = sl[0].data.x[0];
				if (self._isDate(xVal)) {
					isChangeSL = true;
				} 
			}
			if (isChangeSL) {
				self.seriesList = sl;
				newSL = self._cloneSeriesList(sl, o.axis.x.annoFormatString);
				o.seriesList = newSL;
			}
			
			$.wijmo.wijchartcore.prototype._paint.apply(self, arguments);
			if (isChangeSL) {
				o.seriesList = self.seriesList;
			}
		},
		
		_cloneSeriesList: function (seriesList, annoFormatString) {
			var sList = [];
			$.each(seriesList, function (idx, series) {
				var s = $.extend(true, {}, series);
				if (s.data && s.data.x && s.data.x.length) {
					$.each(s.data.x, function (i, x) {
						var val;
						if (annoFormatString && annoFormatString.length) {
							//val = $.format(x, annoFormatString);
							val = Globalize.format(x, annoFormatString);
						} else {
							val = x.toString();
						}
						s.data.x[i] = val;
					});
				}
				sList.push(s);
			});
			return sList;
		},
		
		_clearChartElement: function () {
			var self = this;

			if (self.bars && self.bars.length) {
				$.each(self.bars, function (idx, bar) {
					if (bar.shadow) {
						bar.shadow.wijRemove();
						bar.shadow = null;
					}

					if (bar) {
						bar.wijRemove();
						bar = null;
					}
				});
				self.bars = [];
			}

			if (self.animatedBars && self.animatedBars.length) {
				$.each(self.animatedBars, function (idx, animatedBar) {
					if (animatedBar) {
						animatedBar.stop();
						animatedBar.wijRemove();
						animatedBar = null;
					}
				});
				self.animatedBars = [];
			}

			if (self.chartLabels && self.chartLabels.length) {
				$.each(self.chartLabels, function (idx, chartLabel) {
					if (chartLabel) {
						chartLabel.wijRemove();
						chartLabel = null;
					}
				});
				self.chartLabels = [];
			}

			$.wijmo.wijchartcore.prototype._clearChartElement.apply(self, arguments);
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
				var x = point.x,
					y = point.y,
					temp = 0;
				point.x = xscale * x + xlate;
				point.y = yscale * y + ylate;

				if (inverted) {
					temp = point.x;
					point.x = point.y;
					point.y = temp;
				}
			});

			return points;
		},

		_paintPlotArea: function () {
			var self = this,
				o = self.options,
				inverted = o.horizontal,
				stacked = o.stacked,
				seriesList = [].concat(o.seriesList),
				nSeries = seriesList.length,
				seriesStyles = [].concat(o.seriesStyles.slice(0, nSeries)),
				seriesHoverStyles = [].concat(o.seriesHoverStyles.slice(0, nSeries)),
				canvasBounds = self.canvasBounds,
				startLocation = { x: canvasBounds.startX, y: canvasBounds.startY },
				width = canvasBounds.endX - startLocation.x,
				height = canvasBounds.endY - startLocation.y,
				xaxis = o.axis.x, //todo need add chartarea
				yaxis = o.axis.y,
				clusterInfos,
				xscale = self._getScaling(inverted, xaxis.max,
							xaxis.min, inverted ? height : width),
				yscale = self._getScaling(!inverted, yaxis.max,
							yaxis.min, inverted ? width : height),
				xlate = self._getTranslation(inverted, startLocation,
							xaxis.max, xaxis.min, xscale),
				ylate = self._getTranslation(!inverted, startLocation,
							yaxis.max, yaxis.min, yscale);

			if (inverted && !stacked) {
				seriesList.reverse();
				seriesStyles.reverse();
				seriesHoverStyles.reverse();
			}

			if (nSeries === 0) {
				return;
			}

			// plot a bar group for each datapoint
			clusterInfos = self._paintClusters(seriesList,
				seriesStyles,
				seriesHoverStyles, {
					min: xaxis.min,
					max: xaxis.max,
					late: xlate,
					scale: xscale
				}, {
					min: yaxis.min,
					max: yaxis.max,
					late: ylate,
					scale: yscale
				}, width, height, startLocation);

			self.chartElement.data("plotInfos", {
				xscale: xscale,
				xlate: xlate,
				yscale: yscale,
				ylate: ylate,
				rects: clusterInfos.rects
			});

			self._playAnimation(clusterInfos.animatedBars);
			self.bars = clusterInfos.bars;
			self.animatedBars = clusterInfos.animatedBars;
			self.chartLabels = clusterInfos.chartLabels;
		},

		_paintClusters: function (seriesList, seriesStyles, seriesHoverStyles,
								xAxisInfo, yAxisInfo, width, height, startLocation) {
			var self = this,
				o = self.options,
				stacked = o.stacked,
				clusterOverlap = o.clusterOverlap / 100,
				clusterWidth = o.clusterWidth / 100,
				shadowOffset = 1,
				clusterSpacing = o.clusterSpacing + shadowOffset,
				animation = o.animation,
				animated = animation && animation.enabled,
				nSeries = seriesList.length,
				bpl, 
				bw,
				chartLabels = [],
				bars = [],
				animatedBars = [],
				rects = [],
				isYTime = self.axisInfo.y.isTime,
				sList = [];

			if (isYTime) {
				$.each(seriesList, function (i, s) {
					var se = $.extend(true, {}, s);
					if (se.data && se.data.y && se.data.y.length) {
						$.each(se.data.y, function (idx, data) {
							se.data.y[idx] = self._toOADate(data);
						});
					}
					sList.push(se);
				});
				bpl = self._barPointList(sList);
			} else {
				bpl = self._barPointList(seriesList);
			}

			if (stacked) {
				bpl = self._stackValues(bpl);
			}

			bw = self._getMinDX(bpl) * clusterWidth;

			// adjust the bar width (bw) to account for overlap
			if (nSeries > 1 && !stacked) {
				clusterOverlap -= (bpl.length * (nSeries - 1) * clusterSpacing) /
					(o.horizontal ? height : width);
				bw /= (nSeries * (1 - clusterOverlap) + clusterOverlap);
			}

			$.each(bpl, function (pIdx, xs) {
				var ps = xs.paSpec,
					ns = ps.length,
					sx, 
					rp,
					bar, 
					barInfo;

				if (stacked) {
					sx = bw;
				} else {
					sx = (bw * (ns * (1 - clusterOverlap) + clusterOverlap));
				}

				// calculate the first series rectangle
				rp = { x: xs.x - sx / 2, y: 0, width: bw, height: ps[0].y };

				$.each(ps, function (sIdx, series) {
					if (!rects[sIdx]) {
						rects[sIdx] = [];
					}

					var idx = series.sIdx,
						seriesStyle = seriesStyles[idx];

					barInfo = self._paintBar(rp, series.y, height, xAxisInfo, yAxisInfo,
								seriesStyle, animated, shadowOffset, startLocation,
								clusterOverlap,
								sIdx > 0 ? ps[sIdx - 1].y : null, ps[ps.length - 1].y,
								isYTime, seriesList[idx].textStyle);

					bar = barInfo.bar;
					self._addClass($(bar.node), "wijchart-canvas-object");
					$(bar.node).data("wijchartDataObj", $.extend(true, {
						index: pIdx,
						bar: bar,
						type: "bar",
						style: seriesStyle,
						hoverStyle: seriesHoverStyles[idx]
					}, seriesList[idx]));

					bars.push(bar);

					if (barInfo.animatedBar) {
						animatedBars.push(barInfo.animatedBar);
					}

					if (barInfo.dcl) {
						chartLabels.push(barInfo.dcl);
					}
					rects[sIdx][pIdx] = barInfo.rect;
				});
			});

			//set default chart label to front.
			$.each(chartLabels, function (idx, chartLabel) {
				chartLabel.toFront();
			});

			return { bars: bars, animatedBars: animatedBars,
				rects: rects, chartLabels: chartLabels };
		},

		_paintBar: function (rp, y, height, xAxisInfo, yAxisInfo, seriesStyle,
				animated, shadowOffset, startLocation, clusterOverlap, preY, lastY,
				isYTime, seriesTextStyle) {
			var self = this,
				o = self.options,
				stacked = o.stacked,
				is100Percent = o.is100Percent,
				inverted = o.horizontal,
				xmin = xAxisInfo.min,
				xmax = xAxisInfo.max,
				ymin = yAxisInfo.min,
				ymax = yAxisInfo.max,
				xscale = xAxisInfo.scale,
				xlate = xAxisInfo.late,
				yscale = yAxisInfo.scale,
				ylate = yAxisInfo.late,
				hold, 
				x, 
				inPlotArea, 
				rf,
				defaultChartLabel = null,
				r,
				style = seriesStyle,
				strokeWidth = seriesStyle["stroke-width"],
				stroke = seriesStyle.stroke,
				bar, 
				animatedBar,
				canvas = self.canvas,
				start = yscale * o.axis.y.origin + ylate;

			if (stacked) {
				if (is100Percent) {
					if (lastY > 0) {
						rp.height = y / lastY;
					}

					if (preY || preY === 0) {
						rp.y = preY / lastY;
						rp.height -= rp.y;
					}
				} else {
					rp.height = y;

					if (preY || preY === 0) {
						rp.height -= preY;
						rp.y = preY;
					}
				}
			} else {
				if (preY || preY === 0) {
					// 1 bar over less overlap and 1 pixel
					rp.x += rp.width * (1 - clusterOverlap);
					rp.height = y;
				}
			}

			x = [{ x: rp.x, y: rp.y }, { x: rp.x + rp.width, y: rp.y + rp.height}];
			inPlotArea = ((xmin <= x[0].x && x[0].x <= xmax) ||
				(xmin <= x[1].x && x[1].x <= xmax)) &&
				((ymin <= x[0].y && x[0].y <= ymax) ||
				(ymin <= x[1].y && x[1].y <= ymax));

			x[0].x = self._adjustToLimits(x[0].x, xmin, xmax);
			x[0].y = self._adjustToLimits(x[0].y, ymin, ymax);
			x[1].x = self._adjustToLimits(x[1].x, xmin, xmax);
			x[1].y = self._adjustToLimits(x[1].y, ymin, ymax);

			x = self._transformPoints(inverted, xscale, yscale, xlate, ylate, x);

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

			rf = { 
				x: x[0].x, 
				y: x[0].y,
				width: x[1].x - x[0].x, 
				height: x[1].y - x[0].y
			};

			if (inPlotArea) {
				if (rf.width === 0) {
					rf.width = 0.5;
				}

				if (rf.height === 0) {
					rf.height = 0.5;
				}
			}

			if (o.showChartLabels) {
				defaultChartLabel = self._paintDefaultChartLabel(rf, y, 
					isYTime, seriesTextStyle);
			}

			r = seriesStyle.r ? seriesStyle.r : o.clusterRadius;

			if (r) {
				style = $.extend(true, {}, seriesStyle, {
					r: 0
				});
			}

			if (stroke !== "none" && strokeWidth) {
				strokeWidth = parseInt(strokeWidth, 10);
			}

			if (!strokeWidth || isNaN(strokeWidth)) {
				strokeWidth = 0;
			}

			if (animated) {
				if (r) {
					if (inverted) {
						bar = canvas.wij.roundRect(rf.x, rf.y, rf.width - strokeWidth,
										rf.height - strokeWidth, 0, 0, r, r).hide();
						animatedBar = canvas.rect(start, rf.y, 0,
										rf.height - strokeWidth);
					} else {
						bar = canvas.wij.roundRect(rf.x, rf.y, rf.width - strokeWidth,
										rf.height - strokeWidth, r, 0, 0, r).hide();
						animatedBar = canvas.rect(rf.x, start, rf.width, 0);
					}

					self._paintShadow(animatedBar, shadowOffset);
					animatedBar.wijAttr(style);
					animatedBar.bar = bar;
				} else {
					if (inverted) {
						bar = canvas.rect(start, rf.y,
									0, rf.height - strokeWidth);
					} else {
						bar = canvas.rect(rf.x, start, rf.width, 0);
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
			} else {
				if (r) {
					bar = canvas.wij.roundRect(rf.x, rf.y,
						rf.width - strokeWidth, rf.height - strokeWidth, 0, 0, r, r);
				} else {
					bar = canvas.rect(rf.x, rf.y,
						rf.width - strokeWidth, rf.height - strokeWidth);
				}
			}

			self._paintShadow(bar, shadowOffset);
			if (animated && r) {
				bar.shadow.hide();
			}
			bar.wijAttr(seriesStyle);

			return { 
				rect: rf, 
				dcl: defaultChartLabel,
				animatedBar: animatedBar, 
				bar: bar
			};
		},

		_playAnimation: function (animatedBars) {
			var self = this,
				o = self.options,
				animation = o.animation,
				seriesTransition = o.seriesTransition,
				duration, 
				easing,
				aniBarsAttr = [],
				diffAttr;

			if (animation && animation.enabled) {
				duration = animation.duration || 2000;
				easing = animation.easing || "linear";
				$.each(animatedBars, function (idx, animatedBar) {
					var params = o.horizontal ?
							{ width: animatedBar.width, x: animatedBar.left} :
							{ height: animatedBar.height, y: animatedBar.top };

					if (self.aniBarsAttr && seriesTransition.enabled) {
						diffAttr = self._getDiffAttrs(self.aniBarsAttr[idx],
							animatedBar.attr());

						if (o.horizontal) {
							diffAttr.left = self.aniBarsAttr[idx].left;
							diffAttr.width = self.aniBarsAttr[idx].width;
						} else {
							diffAttr.top = self.aniBarsAttr[idx].top;
							diffAttr.height = self.aniBarsAttr[idx].height;
						}

						if (diffAttr.path) {
							delete diffAttr.path;
						}
						animatedBar.attr(diffAttr);
						duration = seriesTransition.duration;
						easing = seriesTransition.easing;
					}
					aniBarsAttr.push($.extend(true, {}, animatedBar.attr(), params));
					
					animatedBar.stop().wijAnimate(params, duration, easing, function () {
						var b = this,
							r = b.r,
							bar = b;
						
						if (b.chartLabel) {
							b.chartLabel.wijAnimate({ opacity: 1 }, 250);
						}

						if (r) {
							bar = b.bar;
							bar.show();
							if (bar.shadow) {
								bar.shadow.show();
							}

							if (b.shadow) {
								b.shadow.wijRemove();
								b.shadow = null;
							}
							b.wijRemove();
							b = null;
						}
					});
				});
				self.aniBarsAttr = aniBarsAttr;
			}
		},

		_paintDefaultChartLabel: function (rf, y, isTime, seriesTextStyle) {
			var self = this,
				o = self.options,
				inverted = o.horizontal,
				textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle),
				pos = inverted ? { x: rf.x + rf.width, y: rf.y + rf.height / 2} :
								{ x: rf.x + rf.width / 2, y: rf.y },
				dclBox, 
				defaultChartLabel,
				text;
			if (seriesTextStyle) {
				textStyle = $.extend(true, textStyle, seriesTextStyle);
			}
			if (isTime) {
				text = self._fromOADate(y);
			} else { 
				text = self.round(y, 2);
			}

			if (o.chartLabelFormatString && o.chartLabelFormatString.length) {
				//text = $.format(text, o.chartLabelFormatString);
				text = Globalize.format(text, o.chartLabelFormatString);
			}
			defaultChartLabel = self._text(pos.x, pos.y, text)
				.attr(textStyle);
			dclBox = defaultChartLabel.getBBox();
			if (inverted) {
				defaultChartLabel.attr({x: pos.x + dclBox.width / 2});
			} else {
				defaultChartLabel.attr({y: pos.y - dclBox.height / 2});
			}

			return defaultChartLabel;
		},

		_getChartLabelPointPosition: function (chartLabel) {
			var self = this,
				method = chartLabel.attachMethod,
				data = chartLabel.attachMethodData,
				point = { x: 0, y: 0 },
				pi, 
				seriesIndex, 
				pointIndex,
				x, 
				y, 
				rects, 
				rs, 
				rect, 
				barData;

			switch (method) {
			case "coordinate":
				point.x = data.x;
				point.y = data.y;
				break;
			case "dataCoordinate":
				pi = self.chartElement.data("plotInfos");
				x = data.x;
				y = data.y;
				if (self._isDate(x)) {
					x = self._toOADate(x);
				}
				if (self._isDate(y)) {
					y = self._toOADate(y);
				}
				point = self._transformPoints(pi.xscale, pi.yscale,
										pi.xlate, pi.ylate, { x: x, y: y });
				break;
			case "dataIndex":
				seriesIndex = data.seriesIndex;
				pointIndex = data.pointIndex;
				pi = self.chartElement.data("plotInfos");
				if (seriesIndex > -1) {
					rects = pi.rects;
					if (rects.length > seriesIndex) {
						rs = rects[seriesIndex];
						rect = rs[pointIndex];
						point.x = rect.x + rect.width;
						point.y = rect.y + rect.height / 2;
					}
				}
				break;
			case "dataIndexY":
				seriesIndex = data.seriesIndex;
				pointIndex = data.pointIndex;
				if (seriesIndex > -1) {
					barData = self.options.seriesList[seriesIndex].data;
					x = barData.x[pointIndex];
					y = data.y;
					pi = self.chartElement.data("plotInfos");
					if (self._isDate(x)) {
						x = self._toOADate(x);
					}
					if (self._isDate(y)) {
						y = self._toOADate(y);
					}
					point = self._transformPoints(pi.xscale, pi.yscale,
											pi.xlate, pi.ylate, { x: x, y: y });
				}
				break;
			}
			return point;
		},

		_getTooltipText: function (fmt, target) {
			var dataObj = $(target.node).data("wijchartDataObj"),
				index = dataObj.index,
				data = dataObj.data,
				valueX, 
				valueY, 
				obj;

			if (data.x) {
				valueX = data.x[index];
				valueY = data.y[index];
			} else {
				valueX = data.xy[2 * index];
				valueY = data.xy[2 * index + 1];
			}

			obj = {
				x: valueX,
				y: valueY,
				data: dataObj,
				target: target,
				fmt: fmt
			};

			return $.proxy(fmt, obj)();
		},

		_bindLiveEvents: function () {
			var self = this,
				o = self.options,
				hintEnable = o.hint.enable,
				tooltip = self.tooltip,
				hint, 
				title, 
				content;

			if (hintEnable && !tooltip) {
				hint = $.extend(true, {}, o.hint);
				hint.offsetY = hint.offsetY || -2;
				title = hint.title;
				content = hint.content;

				if ($.isFunction(title)) {
					hint.title = function () {
						return self._getTooltipText(title, this.target);
					};
				}

				if ($.isFunction(content)) {
					hint.content = function () {
						return self._getTooltipText(content, this.target);
					};
				}
				hint.beforeShowing = function () {
					if (this.target) {
						this.options.style.stroke = this.target.attrs.stroke ||
							this.target.attrs.fill;
					}
				};
				tooltip = self.canvas.tooltip(self.bars, hint);
				self.tooltip = tooltip;
			}

			$(".wijchart-canvas-object", self.chartElement[0])
				.live("mousedown.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					self._trigger("mouseDown", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseup.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					self._trigger("mouseUp", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseover.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					self._trigger("mouseOver", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseout.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj"),
						bar = dataObj.bar;
					self._trigger("mouseOut", e, dataObj);

					if (!dataObj.hoverStyle) {
						if (bar) {
							bar.attr({ opacity: "1" });
						}
					} else {
						bar.attr(dataObj.style);
					}

					if (tooltip) {
						tooltip.hide();
					}
				})
				.live("mousemove.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj"),
						bar = dataObj.bar;
					self._trigger("mouseMove", e, dataObj);

					if (!dataObj.hoverStyle) {
						if (bar) {
							bar.attr({ opacity: "0.8" });
						}
					} else {
						bar.attr(dataObj.hoverStyle);
					}
					//end of code for adding hover state effect.
				})
				.live("click.wijbarchart", function (e) {
					if (o.disabled) {
						return;
					}

					self._trigger("click", e, $(e.target).data("wijchartDataObj"));
				});
		},

		_unbindLiveEvents: function () {
			var self = this;
			$(".wijchart-canvas-object", self.chartElement[0]).die("wijbarchart");
			if (self.tooltip) {
				self.tooltip.destroy();
				self.tooltip = null;
			}
		},

		_calculateParameters: function (axisInfo, options) {
			$.wijmo.wijchartcore.prototype._calculateParameters.apply(this, arguments);

			// check for bar chart and x axis expansion
			if (axisInfo.id === "x") {
				var minor = options.unitMinor,
				//autoMin = options.autoMin,
				//autoMax = options.autoMax,
					adj = this._getBarAdjustment(axisInfo);

				if (adj === 0) {
					adj = minor;
				} else {
					if (minor < adj && minor !== 0) {
						adj = Math.floor(adj / minor) * minor;
					}
				}

				/*if (autoMin) {
				axisInfo.min -= adj;
				}

				if (autoMax) {
				axisInfo.max += adj;
				}*/

				axisInfo.min -= adj;
				axisInfo.max += adj;

				this._calculateMajorMinor(options, axisInfo);
			}
		},

		_getBarAdjustment: function (axisInfo) {
			var len = 0,
				o = this.options,
				max = axisInfo.max,
				min = axisInfo.min,
				seriesList = o.seriesList,
				i = 0,
				xLen = 0;

			for (i = 0; i < seriesList.length; i++) {
				xLen = seriesList[i].data.x.length;

				if (len < xLen) {
					len = xLen;
				}
			}

			if (len > 1) {
				return (max - min) / len * o.clusterWidth * 0.0125;
			} else if (len === 1) {
				if (min === 0.0 && max === 1.0) {
					min = -1.0;
					axisInfo.min = min;
				}

				return (max - min) * 0.0125;
			} else {
				return 0;
			}
		}
	});

	$.extend($.wijmo.wijbarchart.prototype, {
		_barPointList: function (seriesList) {
			var x = [],
				getXSortedPoints = this._getXSortedPoints;

			function XSpec(nx) {
				this.x = nx;
				this.paSpec = [];

				this.stackValues = function () {
					var len = this.paSpec.length,
						ps0;

					if (len > 1) {
						ps0 = this.paSpec[0];
						$.each(this.paSpec, function (idx, ps) {
							if (idx === 0) {
								return true;
							}

							ps.y += ps0.y;
							ps0 = ps;
						});
					}
				};
			}

			function addSeriesData(idx, series) {
				var points = getXSortedPoints(series),
					nSeries = series.length,
					xs = null,
					lim = 0,
					j = 0,
					jlim = 0,
					first_point = true,
					xprev = 0,
					dupl = false;

				if (points) {
					lim = points.length;
				}

				if (x) {
					jlim = x.length;
				}

				$.each(points, function (p, point) {
					if (first_point) {
						first_point = false;
						xprev = point.x;
					} else {
						if (xprev === point.x) {
							dupl = true;
						} else {
							dupl = false;
						}
						xprev = point.x;
					}

					while (j < jlim && x[j].x < point.x) {
						j++;
					}

					if (j < jlim) {
						// use or insert before the existing item
						if (x[j].x !== point.x) {
							xs = new XSpec(point.x, nSeries);
							x.splice(j, 0, xs);
							jlim = x.length;
						} else {
							xs = x[j];
						}
					} else {
						// add a new item
						xs = new XSpec(point.x, nSeries);
						x.push(xs);
						jlim = x.length;
					}

					xs.paSpec.push({ y: point.y, sIdx: idx, pIdx: p, dupl: dupl });
				});
			}

			$.each(seriesList, function (idx, series) {
				addSeriesData(idx, series);
			});

			return x;
		},

		_getSpecWithValue: function (x) {
			var ret = null;

			$.each(x, function (idx, xs) {
				if (xs.x >= x) {
					if (xs.x === x) {
						ret = xs;
					}

					return false;
				}
			});

			return ret;
		},

		_getMinDX: function (x) {
			var minDx = Number.MAX_VALUE,
				len = x.length,
				idx, 
				dx;

			for (idx = 1; idx < len; idx++) {
				dx = x[idx].x - x[idx - 1].x;

				if (dx < minDx && dx > 0) {
					minDx = dx;
				}
			}

			if (minDx === Number.MAX_VALUE) {
				return 2;
			}

			return minDx;
		},

		_stackValues: function (x) {
			$.each(x, function (idx, xSpec) {
				xSpec.stackValues();
			});

			return x;
		}
	});
} (jQuery));
