/*globals jQuery, Globalize*/
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
			/// A value that indicates the percentage of the plot area 
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
			///	and the duration for the animation when reloading data.
			/// Default: {enabled:true, duration:400, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#barchart").wijbarchart({
			///      seriesTransition: {enabled: true, duration: 1000, easing: "<"}
			///  });
			/// </summary>
			seriesTransition: {
				/// <summary>
				/// A value that determines whether to show animation when reloading data.
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
			/// Fires when the user clicks a mouse button.
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
			/// An object that contains all the series info of the mouse down bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			mouseDown: null,
			/// <summary>BarChartSeries
			/// Fires when the user releases a mouse button
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
			/// An object that contains all the series info of the mouse up bar.
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the bar.
			/// data.hoverStyle: hover style of series of the bar.
			/// data.index: index of the bar.
			/// data.label: label of the series of the bar.
			/// data.legendEntry: legend entry of the series of the bar.
			/// data.style: style of the series of the bar.
			/// data.type: "bar"
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			mouseUp: null,
			/// <summary>
			/// Fires when the user first places the pointer over the chart element.
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
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			mouseOver: null,
			/// <summary>
			/// Fires when the user moves the pointer off of the chart element.
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
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			mouseOut: null,
			/// <summary>
			/// Fires when the user moves the mouse pointer
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
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			mouseMove: null,
			/// <summary>
			/// Fires when the user clicks the chart element. 
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
			/// data.x: The x value of the bar.
			/// data.y: the y valuue of the bar.
			///	</param>
			click: null
		},

		_create: function () {
			var self = this,
				o = self.options,
				defFill = self._getDefFill(),
				compass;
			//			if (o.horizontal) {
			//				$.extend(true, o.axis, {
			//					x: {
			//						compass: "west"
			//					},
			//					y: {
			//						compass: "south"
			//					}
			//				});
			//			}

			if (o.horizontal) {
				compass = o.axis.y.compass || "south";
				o.axis.y.compass = o.axis.x.compass || "west";
				o.axis.x.compass = compass;
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
			defFill = null;

			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijbarchart");
		},

		_setOption: function (key, value) {
			if (key === "horizontal") {
				$.extend(true, this.options.axis, {
					x: {
						compass: value? "west" : "south"
					},
					y: {
						compass: value? "south" : "west"
					}
				});
			}

			$.wijmo.wijchartcore.prototype._setOption.apply(this, arguments);
		},

		destroy: function () {
			/// <summary>
			/// Remove the functionality completely. This will return the 
			/// element back to its pre-init state.
			/// Code example:
			/// $("#barchart").wijbarchart("destroy");
			/// </summary>
			var self = this,
				element = self.chartElement,
				fields = element.data("fields"),
				aniBarsAttr = fields && fields.bars;

			element.removeClass("wijmo-wijbarchart");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);

			if (aniBarsAttr && aniBarsAttr.length) {
				$.each(aniBarsAttr, function (idx, barAttr) {
					barAttr = null;
				});
			}

			element.data("fields", null);
		},

		_clearChartElement: function () {
			var self = this,
				o = self.options,
				fields = self.chartElement.data("fields");

			$.wijmo.wijchartcore.prototype._clearChartElement.apply(self, arguments);
			self.element.removeData("plotInfos");

			if (!o.seriesTransition.enabled) {
				if (fields && fields.aniBarsAttr) {
					fields.aniBarsAttr = null;
				}
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
			/// Code example:
			/// $("#barchart").wijbarchart("getBar", 2);
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the bar.
			/// </param>
			/// <returns type="Raphael element">
			/// The bar object.
			/// </returns>
			var element = this.chartElement,
				fields = element.data("fields");

			return fields.chartElements.bars[index];
		},
		/** end of public methods */


		_paintTooltip: function () {
			var self = this,
				element = self.chartElement,
				fields = element.data("fields");

			$.wijmo.wijchartcore.prototype._paintTooltip.apply(this, arguments);

			if (self.tooltip) {
				if (fields && fields.trackers && fields.trackers.length) {
					self.tooltip.setTargets(fields.trackers);
					self.tooltip.setOptions({ relatedElement: fields.trackers[0] });
				}
			}
		},

		_getTooltipText: function (fmt, target) {
			var tar = $(target.node),
				dataObj,
			//value = dataObj.data,
				obj;
			if (tar.data("owner")) {
				tar = tar.data("owner");
			}
			dataObj = tar.data("wijchartDataObj");
			obj = {
				data: dataObj,
				value: dataObj.value,
				label: dataObj.label,
				total: dataObj.total,
				target: target,
				fmt: fmt,
				x: dataObj.x,
				y: dataObj.y
			};
			return $.proxy(fmt, obj)();
		},

		_paintPlotArea: function () {
			var self = this,
				o = self.options;

			self.chartElement.wijbar({
				canvas: self.canvas,
				bounds: self.canvasBounds,
				tooltip: self.tooltip,
				widgetName: self.widgetName,
				horizontal: o.horizontal,
				stacked: o.stacked,
				axis: o.axis,
				seriesList: o.seriesList,
				seriesStyles: o.seriesStyles,
				seriesHoverStyles: o.seriesHoverStyles,
				seriesTransition: o.seriesTransition,
				showChartLabels: o.showChartLabels,
				textStyle: o.textStyle,
				chartLabelStyle: o.chartLabelStyle,
				chartLabelFormatString: o.chartLabelFormatString,
				shadow: o.shadow,
				disabled: o.disabled,
				clusterOverlap: o.clusterOverlap,
				clusterWidth: o.clusterWidth,
				clusterSpacing: o.clusterSpacing,
				is100Percent: o.is100Percent,
				clusterRadius: o.clusterRadius,
				animation: o.animation,
				culture: self._getCulture(),
				isYTime: self.axisInfo.y[0].isTime,
				isXTime: self.axisInfo.x.isTime,
				mouseDown: $.proxy(self._mouseDown, self),
				mouseUp: $.proxy(self._mouseUp, self),
				mouseOver: $.proxy(self._mouseOver, self),
				mouseOut: $.proxy(self._mouseOut, self),
				mouseMove: $.proxy(self._mouseMove, self),
				click: $.proxy(self._click, self)
			});
		},

		_showSerieEles: function (seriesEle) {
			$.each(seriesEle, function (i, bar) {
				if (bar && bar.bar) {
					bar.bar.show();
					if (bar.bar.shadow) {
						bar.bar.shadow.show();
					}
					if (bar.bar.tracker) {
						bar.bar.tracker.show();
					}
				}
				if (bar && bar.dcl) {
					bar.dcl.show();
				}

				if (bar && bar.animatedBar && !bar.animatedBar.removed) {
					bar.animatedBar.show();
				}
			});
		},

		_hideSerieEles: function (seriesEle) {
			$.each(seriesEle, function (i, bar) {
				if (bar && bar.bar) {
					bar.bar.hide();
					if (bar.bar.shadow) {
						bar.bar.shadow.hide();
					}
					if (bar.bar.tracker) {
						bar.bar.tracker.hide();
					}
				}
				if (bar && bar.dcl) {
					bar.dcl.hide();
				}

				if (bar && bar.animatedBar && !bar.animatedBar.removed) {
					bar.animatedBar.hide();
				}
			});
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

			for (i = 0; i < seriesList.length && seriesList[i].data.x; i++) {
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

	function XSpec(nx) {
		var self = this;

		self.x = nx;
		self.paSpec = [];

		self.stackValues = function () {
			var len = self.paSpec.length,
							ps0;

			if (len > 1) {
				ps0 = self.paSpec[0];
				$.each(self.paSpec, function (idx, ps) {
					if (idx === 0) {
						return true;
					}

					ps.y += ps0.y;
					ps0 = ps;
				});
			}
		};
	}

	$.fn.extend({
		wijbar: function (options) {
			var paintShadow = function (element, offset, stroke) {
				if (options.shadow) {
					$.wijchart.paintShadow(element, offset, stroke);
				}
			},
				addClass = $.wijraphael.addClass,
				getScaling = $.wijchart.getScaling,
				getTranslation = $.wijchart.getTranslation,
				element = this,
				canvas = options.canvas,
				widgetName = options.widgetName,
				inverted = options.horizontal,
				stacked = options.stacked,
				seriesList = $.arrayClone(options.seriesList),
				nSeries = seriesList.length,
				seriesStyles = [].concat(options.seriesStyles.slice(0, nSeries)),
				seriesHoverStyles = [].concat(
					options.seriesHoverStyles.slice(0, nSeries)),
				bounds = options.bounds,
				animation = options.animation,
				animated = animation && animation.enabled,
				startLocation = { x: bounds.startX, y: bounds.startY },
				width = bounds.endX - startLocation.x,
				height = bounds.endY - startLocation.y,
				xaxis = options.axis.x,
				yaxis = options.axis.y,
				disabled = options.disabled,
				mouseDown = options.mouseDown,
				mouseUp = options.mouseUp,
				mouseOver = options.mouseOver,
				mouseOut = options.mouseOut,
				mouseMove = options.mouseMove,
				click = options.click,
							xscale = getScaling(inverted, xaxis.max,
										xaxis.min, inverted ? height : width),
			//				yscale = getScaling(!inverted, yaxis.max,
			//							yaxis.min, inverted ? width : height),
							xlate = getTranslation(inverted, startLocation,
										xaxis.max, xaxis.min, xscale),
			//				ylate = getTranslation(!inverted, startLocation,
			//							yaxis.max, yaxis.min, yscale),
				yscale, ylate,
			fields = element.data("fields") || {},
				chartElements = fields.chartElements || {},
				aniBarsAttr = fields.aniBarsAttr,
			//bars = chartElements.bars,
			//animatedBars = chartElements.animatedBars,
			//chartLabels = chartElements.chartLabels,
				clusterInfos,
				isYTime = options.isYTime,
				isXTime = options.isXTime,
				culture = options.culture;



			function getMinDX(x) {
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
			}

			function stackValues(x) {
				$.each(x, function (idx, xSpec) {
					xSpec.stackValues();
				});

				return x;
			}



			function barPointList(seriesList) {
				var x = [],
					getXSortedPoints = $.wijchart.getXSortedPoints;

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

					if (points === undefined) {
						return;
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
			}

			function adjustToLimits(val, min, max) {
				if (val < min) {
					return min;
				}

				if (val > max) {
					return max;
				}

				return val;
			}

			function transformPoints(inverted, xscale, yscale, xlate, ylate, points) {
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
			}

			function paintDefaultChartLabel(rf, y, isTime, seriesTextStyle) {
				var textStyle = $.extend(true, {},
						options.textStyle, options.chartLabelStyle),
					pos = inverted ? { x: rf.x + rf.width, y: rf.y + rf.height / 2} :
									{ x: rf.x + rf.width / 2, y: rf.y },
					chartLabelFormatString = options.chartLabelFormatString,
					dclBox,
					defaultChartLabel,
					text = y;

				if (seriesTextStyle) {
					textStyle = $.extend(true, textStyle, seriesTextStyle);
				}

				/*if (isTime) {
				text = $.wijchart.fromOADate(y);
				} else {
				text = $.wijchart.round(y, 2);
				}*/
				if (isTime) {
					text = $.fromOADate(y);
				}

				if (chartLabelFormatString && chartLabelFormatString.length) {
					//text = $.format(text, o.chartLabelFormatString);
					text = Globalize.format(text, options.chartLabelFormatString, culture);
				} else if (!isTime) {
					text = $.round(text, 2);
				}

				defaultChartLabel = canvas.text(pos.x, pos.y, text)
					.attr(textStyle);
				addClass($(defaultChartLabel.node), "wijbarchart-label");
				dclBox = defaultChartLabel.getBBox();
				if (inverted) {
					defaultChartLabel.attr({ x: pos.x + dclBox.width / 2 });
				} else {
					defaultChartLabel.attr({ y: pos.y - dclBox.height / 2 });
				}

				return defaultChartLabel;
			}

			function paintBar(rp, y, height, xAxisInfo, yAxisInfo, seriesStyle,
					animated, shadowOffset, startLocation,
					clusterOverlap, preY, lastY, isYTime, seriesTextStyle, yaxis) {
				var is100Percent = options.is100Percent,
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
					barWidth,
					barHeight,
					animatedBar,
					start = -1;

				if (yaxis.origin !== null) {
					start = yscale * yaxis.origin + ylate;
				}

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

				x[0].x = adjustToLimits(x[0].x, xmin, xmax);
				x[0].y = adjustToLimits(x[0].y, ymin, ymax);
				x[1].x = adjustToLimits(x[1].x, xmin, xmax);
				x[1].y = adjustToLimits(x[1].y, ymin, ymax);

				x = transformPoints(inverted, xscale, yscale, xlate, ylate, x);

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

				if (options.showChartLabels) {
					defaultChartLabel = paintDefaultChartLabel(rf, y,
						isYTime, seriesTextStyle);
				}

				r = seriesStyle.r ? seriesStyle.r : options.clusterRadius;

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

				barWidth = rf.width - strokeWidth;
				barHeight = rf.height - strokeWidth;

				if (barWidth < 0) {
					barWidth = 0;
				}
				if (barHeight < 0) {
					barHeight = 0;
				}

				if (animated) {
					if (start === -1) {
						if (inverted) {
							start = startLocation.x;
						} else {
							start = startLocation.y + height - strokeWidth;
						}
					}

					if (r) {
						if (inverted) {
							if (y > yaxis.origin) {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, 0, 0, r, r).hide();
							}
							else {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, r, r, 0, 0).hide();
							}
							animatedBar = canvas.rect(start, rf.y, 0,
											barHeight);
						} else {
							if (y > yaxis.origin) {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, r, 0, 0, r).hide();
							}
							else {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, 0, r, r, 0).hide();
							}

							animatedBar = canvas.rect(rf.x, start,
											rf.width, 0);
						}

						paintShadow(animatedBar, shadowOffset);
						animatedBar.wijAttr(style);
						animatedBar.bar = bar;
					} else {
						if (inverted) {
							bar = canvas.rect(start, rf.y,
										0, barHeight);
						} else {
							bar = canvas.rect(rf.x, start,
										rf.width, 0);
						}
						animatedBar = bar;
					}

					if (defaultChartLabel) {
						defaultChartLabel.attr({ opacity: 0 });
						animatedBar.chartLabel = defaultChartLabel;
					}

					animatedBar.left = rf.x;
					animatedBar.top = rf.y;
					animatedBar.width = barWidth;
					animatedBar.height = barHeight;
					animatedBar.r = r;
				} else {
					if (r) {
						if (inverted) {
							if (y > yaxis.origin) {
								bar = canvas.roundRect(rf.x, rf.y,
							barWidth, barHeight, 0, 0, r, r);
							}
							else {
								bar = canvas.roundRect(rf.x, rf.y,
							barWidth, barHeight, r, r, 0, 0);
							}
						}
						else {
							if (y > yaxis.origin) {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, r, 0, 0, r);
							}
							else {
								bar = canvas.roundRect(rf.x, rf.y, barWidth,
											barHeight, 0, r, r, 0);
							}
						}

					} else {
						bar = canvas.rect(rf.x, rf.y,
							barWidth, barHeight);
					}
				}

				paintShadow(bar, shadowOffset);
				if (animated && r) {
					if (bar.shadow) {
						bar.shadow.hide();
					}
				}
				bar.wijAttr(seriesStyle);

				return {
					rect: rf,
					dcl: defaultChartLabel,
					animatedBar: animatedBar,
					bar: bar
				};
			}

			function paintClusters(seriesList, seriesStyles, seriesHoverStyles,
					xAxisInfo, yAxisInfo, width, height, startLocation,
					isYTime, isXTime) {
				var clusterOverlap = options.clusterOverlap / 100,
					clusterWidth = options.clusterWidth / 100,
					shadowOffset = 1,
					clusterSpacing = options.clusterSpacing + shadowOffset,
					nSeries = seriesList.length,
					bpl,
					bw,
					chartLabels = [],
					bars = [],
					animatedBars = [],
					rects = [],
				//isYTime = yAxisInfo.isTime,
					sList = [],
					seriesEles = [],
					trackers = canvas.set();

				if (isYTime || isXTime) {
					$.each(seriesList, function (i, s) {
						var se = $.extend(true, {}, s);
						if (se.data && se.data.y && se.data.y.length && isYTime) {
							$.each(se.data.y, function (idx, data) {
								se.data.y[idx] = $.toOADate(data);
							});
						}
						if (se.data && se.data.x && se.data.x.length && isXTime) {
							$.each(se.data.x, function (idx, data) {
								se.data.x[idx] = $.toOADate(data);
							});
						}
						sList.push(se);
					});
					bpl = barPointList(sList);
				} else {
					bpl = barPointList(seriesList);
				}


				if (stacked) {
					bpl = stackValues(bpl);
				}

				bw = getMinDX(bpl) * clusterWidth;

				// adjust the bar width (bw) to account for overlap
				if (nSeries > 1 && !stacked) {
					clusterOverlap -= (bpl.length * (nSeries - 1) * clusterSpacing) /
						(inverted ? height : width);
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

					$.each(ps, function (sIdx, points) {
						if (!rects[sIdx]) {
							rects[sIdx] = [];
						}

						if (!seriesEles[sIdx]) {
							seriesEles[sIdx] = [];
						}

						// if the array data.x's length is more than the data.y's, 
						// the rp.height is undefined. it will cause wrong.
						if (rp.height === undefined) {
							return true;
						}

						var idx = points.sIdx,
							seriesStyle = seriesStyles[idx],
							series = seriesList[idx],
							tracker,
							yAxisIndex = series.yAxis || 0,
							axisY = yaxis[yAxisIndex] || yaxis,
							axisInfoY = yAxisInfo[yAxisIndex] || yAxisInfo;

						yscale = getScaling(!inverted, axisY.max,
										axisY.min, inverted ? width : height);
						ylate = getTranslation(!inverted, startLocation,
										axisY.max, axisY.min, yscale);

						axisInfoY.late = ylate;
						axisInfoY.scale = yscale;

						barInfo = paintBar(rp, points.y, height, xAxisInfo, axisInfoY,
									seriesStyle, animated, shadowOffset, startLocation,
									clusterOverlap, sIdx > 0 ? ps[sIdx - 1].y : null,
									ps[ps.length - 1].y, isYTime,
									series.textStyle, axisY);

						bar = barInfo.bar;
						tracker = bar.clone()
						// In IE, if the tracker has an stroke width, 
						// the bar will show an black border.
						.attr({ opacity: 0.01, fill: "white", "stroke-width": 0,
							"fill-opacity": 0.01
						});
						if (series.visible === false) {
							bar.hide();
							if (barInfo.dcl) {
								barInfo.dcl.hide();
							}
							tracker.hide();
							if (bar.shadow) {
								bar.shadow.hide();
							}
						}
						addClass($(bar.node), "wijchart-canvas-object wijbarchart");
						$(bar.node).data("wijchartDataObj", $.extend(false, {
							index: pIdx,
							bar: bar,
							type: "bar",
							style: seriesStyle,
							hoverStyle: seriesHoverStyles[idx],
							x: series.data.x[pIdx],
							y: series.data.y[pIdx]
						}, series));
						$(tracker.node).data("owner", $(bar.node));
						addClass($(tracker.node), "wijbarchart bartracker");
						barInfo.bar.tracker = tracker;
						trackers.push(tracker);
						bars.push(bar);

						if (barInfo.animatedBar) {
							animatedBars.push(barInfo.animatedBar);
						}

						if (barInfo.dcl) {
							chartLabels.push(barInfo.dcl);
						}
						rects[sIdx][pIdx] = barInfo.rect;
						seriesEles[sIdx][pIdx] = barInfo;
						bar = null;
						tracker = null;
					});
				});

				//set default chart label to front.
				$.each(chartLabels, function (idx, chartLabel) {
					chartLabel.toFront();
				});

				trackers.toFront();

				return { bars: bars, animatedBars: animatedBars,
					rects: rects, chartLabels: chartLabels,
					seriesEles: seriesEles,
					trackers: trackers
				};
			}

			function playAnimation(animatedBars) {
				var seriesTransition = options.seriesTransition,
					duration,
					easing,
					barsAttr = [],
					diffAttr;

				if (animated) {
					duration = animation.duration || 2000;
					easing = animation.easing || "linear";
					$.each(animatedBars, function (idx, animatedBar) {
						var params = inverted ?
							{ width: animatedBar.width, x: animatedBar.left} :
							{ height: animatedBar.height, y: animatedBar.top };

						if (aniBarsAttr && seriesTransition.enabled) {
							if (aniBarsAttr.length > idx) {
								diffAttr = $.wijchart.getDiffAttrs(aniBarsAttr[idx],
									animatedBar.attr());

								if (inverted) {
									diffAttr.x = aniBarsAttr[idx].x;
									diffAttr.width = aniBarsAttr[idx].width;
								} else {
									diffAttr.y = aniBarsAttr[idx].y;
									diffAttr.height = aniBarsAttr[idx].height;
								}

								if (diffAttr.path) {
									delete diffAttr.path;
								}
								animatedBar.attr(diffAttr);
								duration = seriesTransition.duration;
								easing = seriesTransition.easing;
							}
						}
						barsAttr.push($.extend(true, {}, animatedBar.attr(), params));
						if (animatedBar.tracker) {
							animatedBar.tracker.hide();
						}
						animatedBar.stop().wijAnimate(params, duration, easing,
						function () {
							var b = this,
								r = b.r,
								bar = b;

							if (b.chartLabel) {
								b.chartLabel.wijAnimate({ opacity: 1 }, 250);
							}

							if (b.tracker) {
								b.tracker.show();
								b.tracker.attr({
									width: b.width,
									height: b.height,
									x: b.attr("x"),
									y: b.attr("y")
								});
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
								//bar.animatedBar = null;
								b = null;
							}
						});
					});
					fields.aniBarsAttr = barsAttr;
				}
			}

			//			function getTooltipText(fmt, target) {
			//				var dataObj = $(target.node).data("wijchartDataObj"),
			//					index = dataObj.index,
			//					data = dataObj.data,
			//					valueX,
			//					valueY,
			//					obj;

			//				if (data.x) {
			//					valueX = data.x[index];
			//					valueY = data.y[index];
			//				} else {
			//					valueX = data.xy[2 * index];
			//					valueY = data.xy[2 * index + 1];
			//				}

			//				obj = {
			//					x: valueX,
			//					y: valueY,
			//					data: dataObj,
			//					target: target,
			//					fmt: fmt
			//				};

			//				return $.proxy(fmt, obj)();
			//			}

			function bindLiveEvents() {
				var //hintEnable = options.hint.enable,
				//hint,
				//title,
				//content,
					isFunction = $.isFunction;

				//				if (hintEnable && !tooltip) {
				//					hint = $.extend(true, {}, options.hint);
				//					hint.offsetY = hint.offsetY || -2;
				//					title = hint.title;
				//					content = hint.content;

				//					if ($.isFunction(title)) {
				//						hint.title = function () {
				//							return getTooltipText(title, this.target);
				//						};
				//					}

				//					if ($.isFunction(content)) {
				//						hint.content = function () {
				//							return getTooltipText(content, this.target);
				//						};
				//					}
				//					hint.beforeShowing = function () {
				//						if (this.target) {
				//						this.options.style.stroke = 
				//							this.target.attrs.stroke ||
				//								this.target.attrs.fill;
				//						}
				//					};
				//					tooltip = canvas.tooltip(bars, hint);
				//				}


				$(".wijbarchart", element[0])
					.live("mousedown." + widgetName, function (e) {
						if (disabled) {
							return;
						}

						if (isFunction(mouseDown)) {
							var target = $(e.target),
								dataObj;
							if (target.data("owner")) {
								target = target.data("owner");
							}
							dataObj = target.data("wijchartDataObj");
							mouseDown.call(element, e, dataObj);
							dataObj = null;
						}
					})
					.live("mouseup." + widgetName, function (e) {
						if (disabled) {
							return;
						}
						if (isFunction(mouseUp)) {
							var target = $(e.target),
								dataObj;
							if (target.data("owner")) {
								target = target.data("owner");
							}
							dataObj = target.data("wijchartDataObj");
							mouseUp.call(element, e, dataObj);
							dataObj = null;
						}
					})
					.live("mouseover." + widgetName, function (e) {
						if (disabled) {
							return;
						}
						if (isFunction(mouseOver)) {
							var target = $(e.target),
								dataObj;
							if (target.data("owner")) {
								target = target.data("owner");
							}
							dataObj = target.data("wijchartDataObj");
							mouseOver.call(element, e, dataObj);
							dataObj = null;
						}
					})
					.live("mouseout." + widgetName, function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
							dataObj, bar;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						bar = dataObj.bar;

						if (!dataObj.hoverStyle) {
							if (bar) {
								bar.attr({ opacity: "1" });
							}
						} else {
							bar.attr(dataObj.style);
						}

						if (isFunction(mouseOut)) {
							mouseOut.call(element, e, dataObj);
						}
						dataObj = null;
						//if (tooltip) {
						//	tooltip.hide();
						//}
					})
					.live("mousemove." + widgetName, function (e) {
						if (disabled) {
							return;
						}

						var target = $(e.target),
							dataObj, bar;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						bar = dataObj.bar;

						if (!dataObj.hoverStyle) {
							if (bar) {
								bar.attr({ opacity: "0.8" });
							}
						} else {
							bar.attr(dataObj.hoverStyle);
						}

						if (isFunction(mouseMove)) {
							mouseMove.call(element, e, dataObj);
						}
						dataObj = null;
						//end of code for adding hover state effect.
					})
					.live("click." + widgetName, function (e) {
						if (disabled) {
							return;
						}

						if (isFunction(click)) {
							var target = $(e.target),
								dataObj;
							if (target.data("owner")) {
								target = target.data("owner");
							}
							dataObj = target.data("wijchartDataObj");
							click.call(element, e, dataObj);
						}
					});
			}

			function unbindLiveEvents() {
				$(".wijbarchart", element[0]).die(widgetName)
				// for jQuery 1.7.1
				.die("." + widgetName);
			}

			//			function clearChartElement() {
			//				if (bars && bars.length) {
			//					$.each(bars, function (idx, bar) {
			//						if (bar.shadow) {
			//							bar.shadow.wijRemove();
			//							bar.shadow = null;
			//						}

			//						if (bar) {
			//							bar.wijRemove();
			//							bar = null;
			//						}
			//					});
			//					fields.bars = [];
			//				}

			//				if (animatedBars && animatedBars.length) {
			//					$.each(animatedBars, function (idx, animatedBar) {
			//						if (animatedBar) {
			//							animatedBar.stop();
			//							animatedBar.wijRemove();
			//							animatedBar = null;
			//						}
			//					});
			//					fields.animatedBars = [];
			//				}

			//				if (chartLabels && chartLabels.length) {
			//					$.each(chartLabels, function (idx, chartLabel) {
			//						if (chartLabel) {
			//							chartLabel.wijRemove();
			//							chartLabel = null;
			//						}
			//					});
			//					fields.chartLabels = [];
			//				}
			//			}

			unbindLiveEvents();
			//			clearChartElement();

			if (inverted && !stacked) {
				seriesList.reverse();
				seriesStyles.reverse();
				seriesHoverStyles.reverse();
			}

			if (nSeries === 0) {
				return;
			}

			// plot a bar group for each datapoint
			clusterInfos = paintClusters(seriesList,
				seriesStyles,
				seriesHoverStyles, {
					min: xaxis.min,
					max: xaxis.max,
					late: xlate,
					scale: xscale
				}, yaxis, width, height, startLocation, isYTime, isXTime);

			element.data("plotInfos", {
				xscale: xscale,
				xlate: xlate,
				yscale: yscale,
				ylate: ylate,
				rects: clusterInfos.rects
			});
			playAnimation(clusterInfos.animatedBars);
			//bars = clusterInfos.bars;
			chartElements.bars = clusterInfos.bars;
			chartElements.animatedBars = clusterInfos.animatedBars;
			chartElements.chartLabels = clusterInfos.chartLabels;
			fields.seriesEles = clusterInfos.seriesEles;
			fields.trackers = clusterInfos.trackers;

			//fields.chartElements = chartElements;
			if (!fields.chartElements) {
				fields.chartElements = {};
			}

			if (inverted && !stacked) {
				fields.seriesEles.reverse();
			}

			$.extend(true, fields.chartElements, chartElements);
			element.data("fields", fields);
			bindLiveEvents();
		}
	});
} (jQuery));
