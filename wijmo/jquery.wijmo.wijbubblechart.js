/*globals jQuery Raphael Globalize*/
/*
*
* Wijmo Library 2.1.2
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
* licensing@wijmo.com
* http://wijmo.com/license
*
*
* * Wijmo bubblechart widget
*
* Depends:
*  raphael.js
*  globalize.min.js
*  jquery.ui.widget.js
*  jquery.wijmo.wijchartcore.js
*
*/
(function ($) {
	"use strict";

	var maxSize = 10000,
		bubMax = 0,
		bubMin = 0,
		bubDiff = 0;

	$.widget("wijmo.wijbubblechart", $.wijmo.wijchartcore, {
		options: {
			/// <summary>
			/// The minimum bubble size represents the percentage of the 
			/// diameter (or area) of the plot area.
			/// Default: 5
			/// Type: Number
			/// Code example: $("#bubblechart").wijbubblechart("option", "minimumSize", 5)
			/// </summary>
			minimumSize: 5,
			/// <summary>
			/// The maximum bubble size represents the percentage of the 
			/// diameter (or area) of the plot area.
			/// Default: 20
			/// Type: Number
			/// Code example: $("#bubblechart").wijbubblechart("option", "maximumSize", 5)
			/// </summary>
			maximumSize: 20,
			/// <summary>
			/// A value that indicates how to calculate the bubble size.
			/// Default: "diameter"
			/// Type: "string"
			/// Remarks: The value should be "area" or "diameter".
			/// Code example: $("#bubblechart").wijbubblechart("option", 
			/// "sizingMethod", "area")
			/// </summary>
			sizingMethod: "diameter",
			/// <summary>
			/// A value that indicates whether to show animation 
			///	and the duration for the animation.
			/// Default: {enabled:true, duration:1000, easing: "elastic"}.
			/// Type: Object.
			/// Code example:
			///  $("#bubblechart").wijbubblechart({
			///      animation: {
			///			enabled: true, duration: 1000, easing: "elastic"
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
				/// Default: 2000.
				/// Type: Number.
				/// </summary>
				duration: 1000,
				/// <summary>
				/// A value that indicates the easing for the series transition.
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
			///  $("#bubblechart").wijbubblechart({
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
			/// An array collection that contains the data to be charted.
			/// Default: [].
			/// Type: Array.
			/// Code example:
			/// $("#bubblechart").wijbubblechart({
			/// seriesList: [{
			/// label: "Q1",
			/// legendEntry: true,
			/// data: {
			/// x: [1, 2, 3, 4, 5],
			/// y: [12, 21, 9, 29, 30],
			/// y1:[3, 5, 1, 6, 2]
			/// },
			/// offset: 0
			/// }, {
			/// label: "Q2",
			/// legendEntry: true,
			/// data: {
			/// xy: [1, 21, 2, 10, 3, 19, 4, 31, 5, 20],
			/// y1:[3, 5, 1, 6, 2]
			/// },
			/// offset: 0
			/// }]
			/// OR
			/// seriesList: [{
			/// label: "Q1",
			/// legendEntry: true,
			/// data: {
			/// x: ["A", "B", "C", "D", "E"],
			/// y: [12, 21, 9, 29, 30],
			/// y1:[3, 5, 1, 6, 2]
			/// },
			/// offset: 0
			/// }]
			/// OR
			/// seriesList: [{
			/// label: "Q1",
			/// legendEntry: true,
			/// data: {
			/// x: [new Date(1978, 0, 1), new Date(1980, 0, 1),
			/// new Date(1981, 0, 1), new Date(1982, 0, 1),
			/// new Date(1983, 0, 1)],
			/// y: [12, 21, 9, 29, 30],
			/// y1:[3, 5, 1, 6, 2]
			/// },
			/// offset: 0
			/// }]
			/// });
			/// </summary>
			seriesList: [],

			/// <summary>
			/// An array collection that contains the style to 
			/// be charted when hovering the chart element.
			/// Default: [{opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}, {
			///				opacity: 1, "stroke-width": 5}].
			/// Type: Array.
			///	Code example: 
			///	$("#bubblechart").wijbubblechart("option", "seriesHoverStyles", {
			///				seriesHoverStyles: [
			///					{fill: "rgb(255,0,0)", stroke:"none"}, 
			///					{ fill: "rgb(255,125,0)", stroke: "none" }
			///				]});
			/// </summary>
			seriesHoverStyles: [{
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}, {
				opacity: 1,
				"stroke-width": 5
			}],

			/// <summary>
			/// The chart label's settings.
			/// Default: {position: "inside", compass: "north", visible: true, 
			/// style: {}, chartLabelFormatString:""}
			/// Type: Object.
			/// Code example: $("#bubblechart").wijbubblechart("option", 
			/// "chartLabel", { position: "outside" }).
			/// </summary>
			chartLabel: {
				/// <summary>
				/// A value that indicates the chart lable's position.
				/// Default: "inside"
				/// Type: String
				/// Remark: the value should be "inside" or "outside".
				/// </summary>
				position: "inside",
				/// <summary>
				/// A value that indicates the label's position.
				/// Default: "north"
				/// Type: String
				/// Remark: the value should be "north", "east", "west" or "south"
				/// </summary>
				compass: "north",
				/// <summary>
				/// A value that indicates whether show the label.
				/// Default: true
				/// Type: Boolean
				/// </summary>
				visible: true,
				/// <summary>
				/// A value that indicates the label's style.
				/// Default: {}.
				/// Type: Object.
				/// </summary>
				style: {},
				/// <summary>
				/// Use the value to format chart label's text content.
				/// Default: "".
				/// Type: String.
				/// </summary>
				chartLabelFormatString: ""
			},

			/// <summary>
			/// Fires when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({mouseDown: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartmousedown
			/// $("#bubblechart").bind("wijbubblechartmousedown", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousedown bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			mouseDown: null,
			/// <summary>
			/// Fires when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({mouseUp: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartmousedown
			/// $("#bubblechart").bind("wijbubblechartmouseup", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseup bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			mouseUp: null,
			/// <summary>
			/// Fires when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({mouseOver: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartmouseover
			/// $("#bubblechart").bind("wijbubblechartmouseover", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseover bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			mouseOver: null,
			/// <summary>
			/// Fires when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({mouseOut: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartmouseout
			/// $("#bubblechart").bind("wijbubblechartmouseout", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseout bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			mouseOut: null,
			/// <summary>
			/// Fires when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({mouseMove: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartmousemove
			/// $("#bubblechart").bind("wijbubblechartmousemove", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousemove bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			mouseMove: null,
			/// <summary>
			/// Fires when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#bubblechart").wijbubblechart({click: function(e, data) { } });
			/// Bind to the event by type: wijbubblechartclick
			/// $("#bubblechart").bind("wijbubblechartclick", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the clicked bubble.
			/// data.bubble: the Raphael object of the bubble.
			/// data.data: data of the series of the bubble.
			/// data.hoverStyle: hover style of series of the bubble.
			/// data.index: index of the bubble.
			/// data.label: label of the series of the bubble.
			/// data.legendEntry: legend entry of the series of the bubble.
			/// data.style: style of the series of the bubble.
			/// data.type: "bubble"
			/// data.x: the x value of the bubble.
			/// data.y: The y value of the bubble.
			/// data.y1: The y1 value of the bubble
			///	</param>
			click: null
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options;

			//self.bubbles = [];
			//self.bubbleInfos = [];
			if (key === "minimumSize" || key === "minimumSize") {
				if (isNaN(value) || value < 0) {
					value = 0;
				}
				else if (value > maxSize) {
					value = maxSize;
				}
				o[key] = value;
				self.redraw();
			}
			else if (key === "chartLabel") {
				$.extend(o.chartLabel, value);
				self.redraw();
			}
			else {
				$.wijmo.wijchartcore.prototype._setOption.apply(self, arguments);
			}
			if (key === "seriesList") {
				self.indexs = null;
				self.bubbleRadius = null;
			}
		},

		_create: function () {
			var self = this,
				o = self.options,
				defFill = self._getDefFill();


			$.each(o.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});

			self._setLabelOption();

			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijbubblechart");
		},

		_setLabelOption: function () {
			var o = this.options;
			if (o.showChartLabels !== true && o.chartLabel.visible === true) {
				o.chartLabel.visible = false;
			}
			if (!$.isPlainObject(o.chartLabel.style) &&
				$.isPlainObject(o.chartLabelStyle)) {
				o.chartLabel.style = o.chartLabelStyle;
			}
		},

		_clearChartElement: function () {
			var self = this,
				o = self.options,
				fields = self.chartElement.data("fields");

			$.wijmo.wijchartcore.prototype._clearChartElement.apply(self, arguments);

			if (fields && fields.bubbleInfos) {
				$.each(fields.bubbleInfos, function (i, n) {
					if (n.bubble) {
						n.bubble.wijRemove();
					}
					if (n.dcl) {
						n.dcl.wijRemove();
					}
					if (n.symbol) {
						n.symbol.wijRemove();
					}
				});
			}

			if (fields && fields.bubbles) {
				self._destroyRaphaelArray(fields.bubbles);
			}
			self.element.removeData("plotInfos");

			if (!o.seriesTransition.enabled) {
				if (fields && fields.bubblesAnimationInfos) {
					fields.bubblesAnimationInfos = null;
				}
			}
		},

		destroy: function () {
			/// <summary>
			/// Remove the functionality completely. This will return the 
			/// element back to its pre-init state.
			/// Code example:
			/// $("#bubblechart").wijbubblechart("destroy");
			/// </summary>
			var self = this;
			self.chartElement
			.removeClass("wijmo-wijbubblechart ui-helper-reset");
			self._destroyEles();
			$.wijmo.wijchartcore.prototype.destroy.apply(self, arguments);
		},

		_destroyEles: function () {
			var self = this,
				ele = self.element,
				fields = ele.data("fields");
			if (fields.bubbleInfos) {
				$.each(fields.bubbleInfos, function (i, n) {
					self._removeEle(n.bubble);
					self._removeEle(n.dcl);
					self._removeEle(n.symbol);
					n = null;
				});
				//self.bubbleInfos = [];
			}
			ele.removeData("fields");
			//self.bubbles = [];
			self.bubbleRadius = [];
			//self.seriesEles = [];
			//self.tooltipbubbles = [];
		},

		_removeEle: function (ele) {
			if (ele) {
				if (ele.node) {
					$(ele.node).removeData();
				}
				ele.wijRemove();
				ele = null;
			}
		},

		_paintPlotArea: function () {
			var self = this,
				element = this.element,
				o = self.options,
				seriesList = o.seriesList,
				nSeries = seriesList.length,
				seriesStyles = [].concat(o.seriesStyles.slice(0, nSeries)),
				seriesHoverStyles = [].concat(o.seriesHoverStyles.slice(0, nSeries)),
				canvasBounds = self.canvasBounds,
			//startLocation = { x: canvasBounds.startX, y: canvasBounds.startY },
			//width = canvasBounds.endX - startLocation.x,
			//height = canvasBounds.endY - startLocation.y,
				xaxis = self.axisInfo.x, //todo need add chartarea
				yaxis = self.axisInfo.y[0];

			if (nSeries === 0) {
				return;
			}
			//self._paintcircles(seriesList, seriesStyles, seriesHoverStyles,
			//	xaxis, yaxis, width, height, startLocation);

			self._prepBubbleData();

			element.wijbubble({
				seriesList: seriesList,
				seriesStyles: seriesStyles,
				seriesHoverStyles: seriesHoverStyles,
				canvas: self.canvas,
				bounds: canvasBounds,
				xAxisInfo: xaxis,
				yAxisInfo: yaxis,
				chartLabel: o.chartLabel,
				textStyle: o.textStyle,
				chartLabelStyle: o.chartLabelStyle,
				chartLabelFormatString: o.chartLabelFormatString,
				bubbleRadius: self.bubbleRadius,
				animation: o.animation,
				seriesTransition: o.seriesTransition,
				sizingMethod: o.sizingMethod,
				minimumSize: o.minimumSize,
				maximumSize: o.maximumSize,
				mouseDown: $.proxy(self._mouseDown, self),
				mouseUp: $.proxy(self._mouseUp, self),
				mouseOver: $.proxy(self._mouseOver, self),
				mouseOut: $.proxy(self._mouseOut, self),
				mouseMove: $.proxy(self._mouseMove, self),
				click: $.proxy(self._click, self),
				disabled: o.disabled,
				culture: self._getCulture()
			});

			self.tooltipbubbles = [];
			$.each(element.data("fields").bubbleInfos, function (idx, bubbleInfo) {
				self.tooltipbubbles.push(bubbleInfo.bubble);
				if (bubbleInfo.dcl) {
					self.tooltipbubbles.push(bubbleInfo.dcl);
				}
				if (bubbleInfo.symbol) {
					self.tooltipbubbles.push(bubbleInfo.symbol);
				}
			});

			if (self.tooltip) {
				self.tooltip.setTargets(self.tooltipbubbles);
			}
			//self._playAnimation(self.bubbleInfos);
		},

		_paintLegend: function () {
			var self = this,
				o = self.options,
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
				r = 0,
				markerStyle = null,
				type = null,
				dot = null;
			//			$.extend(true, o, {
			//				legend: {
			//					size: {
			//						width: 30,
			//						height: 3
			//					}
			//				}
			//			});

			$.wijmo.wijchartcore.prototype._paintLegend.apply(self, arguments);

			if (o.legend.visible) {
				//set fill attr to legendIcons
				if (self.legends.length && self.legendIcons.length) {
					for (i = 0, ii = self.legendIcons.length; i < ii; i++) {
						legendIcon = self.legendIcons[i];
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
							if (chartSeries.markers) {
								type = chartSeries.markers.type;
							}
							legendIcon = self.legendIcons[idx];
							box = legendIcon.wijGetBBox();
							x = box.x + box.width / 2;
							y = box.y + box.height / 2;
							r = Math.min(box.width, box.height);
							markerStyle = chartSeries.markerStyle;
							markerStyle = $.extend({
								fill: chartSeriesStyle.stroke,
								stroke: chartSeriesStyle.stroke,
								opacity: 1
							}, markerStyle);
							if (!type) {
								type = "circle";
							}
							dot = self.canvas.paintMarker(type, x, y, r / 2);
							$.wijraphael.addClass($(dot.node),
							"chart-legend-dot wijchart-canvas-object wijchart-legend");
							dot.attr(markerStyle);
							$(dot.node).data("index", i)
								.data("legendIndex", idx);
							legendIcon.remove();
							self.legendIcons[idx] = dot;
							if (!!chartSeries.visible) {
								if (o.legend.textWidth) {
									$(self.legends[idx][0].node)
										.data("dotOpacity", dot.attr("opacity") || 1);
								} else {
									$(self.legends[idx].node)
										.data("dotOpacity", dot.attr("opacity") || 1);
								}
								dot.attr("opacity", 0.3);
							}
							idx++;
						}
					}
				} else {
					for (i = chartsSeries.length - 1; i >= 0; i--) {
						chartSeries = chartsSeries[i];
						chartSeriesStyle =
							chartsSeriesStyles[chartsSeries.length - 1 - i];
						if (chartSeries.legendEntry) {
							if (chartSeries.markers) {
								type = chartSeries.markers.type;
							}
							legendIcon = self.legendIcons[idx];
							box = legendIcon.wijGetBBox();
							x = box.x + box.width / 2;
							y = box.y + box.height / 2;
							markerStyle = chartSeries.markerStyle;
							markerStyle = $.extend({
								fill: chartSeriesStyle.stroke,
								stroke: chartSeriesStyle.stroke,
								opacity: 1
							}, markerStyle);
							if (!type) {
								type = "circle";
							}
							dot = self.canvas.paintMarker(type, x, y, 7);
							$.wijraphael.addClass($(dot.node), "chart-legend-dot");
							dot.attr(markerStyle);
							legendIcon.remove();
							self.legendIcons[idx] = dot;
							if (!!chartSeries.visible) {
								if (o.legend.textWidth) {
									$(self.legends[idx][0].node)
										.data("dotOpacity", dot.attr("opacity") || 1);
								} else {
									$(self.legends[idx].node)
										.data("dotOpacity", dot.attr("opacity") || 1);
								}
								dot.attr("opacity", 0.3);
							}
							idx++;
						}
					}
				}
			}
		},

		_getbubbleIndexs: function (width, height) {
			var self = this,
				o = self.options,
				xmax = o.axis.x.max,
				xmin = o.axis.x.min,
				ymin = o.axis.y.min,
				ymax = o.axis.y.max,
			//width = self.element.width(),
			//height = self.element.height(),
				xsub = [],
				ysub = [],
				xadd = [],
				yadd = [],
				datax = [],
				datay = [],
				xminIndex = -1,
				yminIndex = -1,
				xmaxIndex = -1,
				ymaxIndex = -1;

			self.bubbleRadius = [];
			self._prepBubbleData();
			$.each(o.seriesList, function (idx, series) {
				var data = series.data,
					markers = series.markers || {},
					markerType = markers.type || "circle";

				if (data.y1 === undefined) {
					return true;
				}
				$.each(data.y1, function (i, yval) {
					var r = $.wijbubble.transform(yval, o.maximumSize, o.minimumSize,
						self.canvasBounds, bubMin, bubDiff,
						o.sizingMethod, markerType), x, y;

					if (self._isDate(data.x[i])) {
						x = $.toOADate(data.x[i]);
					}
					else if (isNaN(data.x[i])) {
						x = i;
					}
					else {
						x = data.x[i];
					}

					y = data.y[i];

					if (self._isDate(y)) {
						y = $.toOADate(y);
					}
					xsub.push(x - r * (xmax - xmin) / width);
					ysub.push(y - r * (ymax - ymin) / height);
					xadd.push(x + r * (xmax - xmin) / width);
					yadd.push(y + r * (ymax - ymin) / height);
					datax.push(x);
					datay.push(y);
					self.bubbleRadius.push(r);
				});
			});

			xminIndex = self._getMinIndex(xsub);
			yminIndex = self._getMinIndex(ysub);
			xmaxIndex = self._getMaxIndex(xadd);
			ymaxIndex = self._getMaxIndex(yadd);

			self.indexs = {
				xMin: {
					x: datax[xminIndex],
					y: datay[xminIndex],
					r: self.bubbleRadius[xminIndex]
				},
				xMax: {
					x: datax[xmaxIndex],
					y: datay[xmaxIndex],
					r: self.bubbleRadius[xmaxIndex]
				},
				yMin: {
					x: datax[yminIndex],
					y: datay[yminIndex],
					r: self.bubbleRadius[yminIndex]
				},
				yMax: {
					x: datax[ymaxIndex],
					y: datay[ymaxIndex],
					r: self.bubbleRadius[ymaxIndex]
				}
			};
		},

		_calculateParameters: function (axisInfo, options) {
			$.wijmo.wijchartcore.prototype._calculateParameters.apply(this, arguments);
			var self = this;
			if (!options.autoMax && !options.autoMin) {
				return;
			}
			self._adjust(options, axisInfo);
		},

		_adjust: function (options, axisInfo) {
			var unitMinor = options.unitMinor,
				self = this,
				autoMin = options.autoMin,
				autoMax = options.autoMax,
				canvasBounds = self.canvasBounds,
				startLocation = { x: canvasBounds.startX, y: canvasBounds.startY },
				width = canvasBounds.endX - startLocation.x,
				height = canvasBounds.endY - startLocation.y,
				omax = axisInfo.max,
				omin = axisInfo.min;

			if (!self.indexs) {
				self._getbubbleIndexs(width, height);
			}

			if (axisInfo.id === "x") {
				if (autoMin) {
					omin = self._getMinTick(self.indexs.xMin.x,
						self.indexs.xMin.r, omin, omax, width, unitMinor);
				}
				if (autoMax) {
					omax = self._getMaxTick(self.indexs.xMax.x,
						self.indexs.xMax.r, omin, omax, width, unitMinor);
				}
			}
			else {
				if (autoMin) {
					omin = self._getMinTick(self.indexs.yMin.y,
						self.indexs.yMin.r, omin, omax, height, unitMinor);
				}
				if (autoMax) {
					omax = self._getMaxTick(self.indexs.yMax.y,
						self.indexs.yMax.r, omin, omax, height, unitMinor);
				}
			}
			if (omax !== axisInfo.max || omin !== axisInfo.min) {
				axisInfo.min = omin;
				axisInfo.max = omax;
				this._calculateMajorMinor(options, axisInfo);
				self._adjust(options, axisInfo);
			}
		},

		_getMinTick: function (val, r, min, max, length, unitMinor) {
			if ((val - min) * length / (max - min) < r) {
				return min - unitMinor;
			}
			else {
				return min;
			}
		},

		_getMaxTick: function (val, r, min, max, length, unitMinor) {
			if ((val - min) * length / (max - min) + r > length) {
				return max + unitMinor;
			}
			else {
				return max;
			}
		},

		_getMinIndex: function (arr) {
			var index = -1, min = 0;
			$.each(arr, function (i, n) {
				if (i === 0) {
					min = n;
				}
				else {
					if (n < min) {
						min = n;
					}
				}
			});

			$.each(arr, function (i, n) {
				if (n === min) {
					index = i;
					return false;
				}
			});
			return index;
		},

		_getMaxIndex: function (arr) {
			var index = -1, max = 0;
			$.each(arr, function (i, n) {
				if (i === 0) {
					max = n;
				}
				else {
					if (n > max) {
						max = n;
					}
				}
			});

			$.each(arr, function (i, n) {
				if (n === max) {
					index = i;
					return false;
				}
			});
			return index;
		},

		_showSerieEles: function (seriesEle) {
			$.each(seriesEle, function (i, bubbleInfo) {
				if (bubbleInfo.bubble) {
					bubbleInfo.bubble.show();
					if (bubbleInfo.bubble.tracker) {
						bubbleInfo.bubble.tracker.show();
					}
				}
				if (bubbleInfo.dcl) {
					bubbleInfo.dcl.show();
				}
				if (bubbleInfo.symbol) {
					bubbleInfo.symbol.show();
				}
			});
		},

		_hideSerieEles: function (seriesEle) {
			$.each(seriesEle, function (i, bubbleInfo) {
				if (bubbleInfo.bubble) {
					bubbleInfo.bubble.hide();
					if (bubbleInfo.bubble.tracker) {
						bubbleInfo.bubble.tracker.hide();
					}
				}
				if (bubbleInfo.dcl) {
					bubbleInfo.dcl.hide();
				}
				if (bubbleInfo.symbol) {
					bubbleInfo.symbol.hide();
				}
			});
		},

		_parseTable: function () {
			if (!this.element.is("table")) {
				return;
			}
			var self = this,
				ele = self.element,
				o = self.options,
			//header & footer
				captions = $("caption", ele),
				theaders = $("thead th", ele),
				seriesList = [],
				sList = $("tbody tr", ele),
				label = null,
				series = null,
				xValues = [],
				yValues = [],
				y1Values = [],
				getValue = function (val) {
					var ret = $.trim(val);
					if (!isNaN(val)) {
						ret = parseFloat(val);
					}
					return ret;
				};

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

			label = $.trim(theaders.eq(1).text());

			//seriesList

			sList.each(function (i, tr) {
				var tds = $("td", tr);
				if (tds.length >= 3) {
					xValues.push(getValue(tds.eq(0).text()));
					yValues.push(getValue(tds.eq(1).text()));
					y1Values.push(getValue(tds.eq(2).text()));
				}
			});


			series = {
				label: label,
				legendEntry: true,
				data: {
					x: xValues,
					y: yValues,
					y1: y1Values
				}
			};
			seriesList.push(series);
			self.options.seriesList = seriesList;
		},

		_unbindLiveEvents: function () {
			var self = this;
			$(".wijbubblechart-bubble", self.chartElement[0])
			// for jQuery 1.7.1
			.die(".wijbubblechart")
			.die("wijbubblechart");
			if (self.tooltip) {
				self.tooltip.destroy();
				self.tooltip = null;
			}
		},

		_paintTooltip: function () {
			var self = this,
				fields = self.element.data("fields");

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
				y: dataObj.y,
				y1: dataObj.y1
			};
			return $.proxy(fmt, obj)();
		},

		_prepBubbleData: function () {
			var self = this,
			seriesList = self.options.seriesList,
			ymax = -999999999999,
			ymin = 9999999999999,
			data;
			$.each(seriesList, function (i, n) {
				data = n.data;
				if (data && data.y1) {
					$.each(data.y1, function (j, m) {
						ymax = Math.max(ymax, m);
						ymin = Math.min(ymin, m);
					});
				}
			});
			bubMax = ymax;
			bubMin = ymin;
			bubDiff = ymax - ymin;
		},

		getBubble: function (index) {
			/// <summary>
			/// Returns the bubble which has a Raphael's object 
			/// that represents bubbles for the series data with the given index.
			/// Code example:
			/// $("#bubblechart").wijbubblechart("getBubble", 2)
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the bubble.
			/// </param>
			/// <returns type="Raphael element">
			/// The bubble object.
			/// </returns>
			return this.element.data("fields").bubbles[index];
		}
	});
	$.fn.extend({
		wijbubble: function (options) {
			var element = this,
				o = options,
				fields = element.data("fields") || {},
				currentIndex = 0,
				bounds = o.bounds,
				canvas = o.canvas,
				seriesList = $.arrayClone(o.seriesList),
				seriesStyles = o.seriesStyles,
				seriesHoverStyles = o.seriesHoverStyles,
				xAxisInfo = o.xAxisInfo,
				yAxisInfo = o.yAxisInfo,
				startLocation = { x: bounds.startX, y: bounds.startY },
				width = bounds.endX - startLocation.x,
				height = bounds.endY - startLocation.y,
				chartLabel = o.chartLabel,
				seriesEles = [],
				bubbles = [],
				mouseDown = o.mouseDown,
				mouseUp = o.mouseUp,
				mouseOver = o.mouseOver,
				mouseOut = o.mouseOut,
				mouseMove = o.mouseMove,
				click = o.click,
				bubbleInfos = [],
				disabled = o.disabled,
				trackers = canvas.set(),
				culture = o.culture;

			function initAnimationState(bubbleInfo, bounds) {
				var bubble = bubbleInfo.bubble,
					symbol = bubbleInfo.symbol,
					bbox;

				if (bubble.type === "circle") {
					bubble.attr({
						r: 0.0001,
						cx: bounds.startX,
						cy: bounds.endY
					});
				}
				else {
					bubble.transform("s0.01");
					bbox = bubble.wijGetBBox();
					bubble.transform("t" + (bounds.startX - bbox.x) +
						"," + (bounds.endY - bbox.y) + "s0.001");
				}
				if (symbol) {
					symbol.hide();
				}
			}

			function playAnimation() {
				var animation = o.animation,
					bounds = o.bounds,
					bubblesAnimationInfos = fields.bubblesAnimationInfos,
					animationInfos = [],
					bubbleInfos = fields.bubbleInfos,
					seriesTransition = o.seriesTransition,
					duration, easing, rate;

				if (animation && animation.enabled) {
					duration = animation.duration || 400;
					easing = animation.easing;
					$.each(bubbleInfos, function (idx, bubbleInfo) {
						var bubble = bubbleInfo.bubble,
							params, bubblesAnimationInfo,
							bbox = bubble.wijGetBBox();

						if (bubble.type === "circle") {
							params = { r: bubble.attr("r"), cx: bubble.attr("cx"),
								cy: bubble.attr("cy")
							};
						}
						else {
							params = {
								transform: "S1T0,0",
								"stroke-width": bubble.attr("stroke-width"),
								width: bbox.width,
								x: bbox.x,
								y: bbox.y
							};
						}
						if (bubblesAnimationInfos && seriesTransition.enabled) {
							bubblesAnimationInfo = bubblesAnimationInfos[idx];
							if (bubblesAnimationInfo) {
								if (bubble.type === "circle") {
									bubble.attr({
										cx: bubblesAnimationInfo.cx,
										cy: bubblesAnimationInfo.cy,
										r: bubblesAnimationInfo.r
									});
								}
								else {
									bbox = bubble.wijGetBBox();
									rate = bubblesAnimationInfo.width / bbox.width;
									bubble.transform("s" + rate);
									bbox = bubble.wijGetBBox();
									bubble.transform("t" +
									(bubblesAnimationInfo.x - bbox.x) +
									"," + (bubblesAnimationInfo.y - bbox.y) + "");
								}
								duration = seriesTransition.duration;
								easing = seriesTransition.easing;
							}
							else {
								initAnimationState(bubbleInfo, bounds);
							}
						}
						else {
							initAnimationState(bubbleInfo, bounds);
						}
						animationInfos.push(params);
						bubble.wijAnimate(params, duration, easing, function () {
							if (bubbleInfo.dcl) {
								bubbleInfo.dcl.attr("opacity", 1);
							}
							if (bubbleInfo.symbol) {
								bubbleInfo.symbol.show();
							}
						});
					});
					fields.bubblesAnimationInfos = animationInfos;
				}
				else {
					$.each(bubbleInfos, function (idx, bubbleInfo) {
						if (bubbleInfo.dcl) {
							bubbleInfo.dcl.attr("opacity", 1);
						}
					});
				}
			}

			function getSymbol(symbols, index) {
				var symbol;
				$.each(symbols, function (i, n) {
					if (i === index) {
						symbol = n;
						return false;
					}
				});
				return symbol;
			}

			function getLabelVisible(visibles, index) {
				var visible = true;
				$.each(visibles, function (i, n) {
					if (index === i) {
						visible = false;
						return false;
					}
				});
				return visible;
			}

			function paintMarker(type, x, y, length) {
				var marker;
				if (canvas[type]) {
					marker = canvas[type](x, y, length);
				}
				return marker;
			}

			function getLabelBox(val) {
				var text = canvas.text(0, 0, val),
					bbox = text.wijGetBBox(), ret;

				ret = {
					width: bbox.width,
					height: bbox.height
				};
				text.remove();
				return ret;
			}

			function applyLabelCompass(rf, text) {
				var compass = options.chartLabel.compass || "north",
					labelBox = getLabelBox(text),
					r = rf.r;

				switch (compass) {
				case "north":
					rf.y -= (r + labelBox.height / 2);
					break;
				case "south":
					rf.y += (r + labelBox.height / 2);
					break;
				case "east":
					rf.x += (r + labelBox.width / 2);
					break;
				case "west":
					rf.x -= (r + labelBox.width / 2);
					break;
				}
			}

			function paintDefaultChartLabel(rf, val) {
				var textStyle = $.extend(true, {}, options.textStyle,
					options.chartLabelStyle, chartLabel.style),
					text = $.round(val, 2),
					chartLabelFormatString = chartLabel.chartLabelFormatString === "" ?
						options.chartLabelFormatString :
						chartLabel.chartLabelFormatString,
					dcl;
				if (chartLabelFormatString && chartLabelFormatString.length) {
					text = Globalize.format(text, chartLabelFormatString, culture);
				}
				dcl = canvas.text(rf.x, rf.y, text).attr(textStyle);
				return dcl;
			}

			function paintbubble(series, seriesStyle, seriesHoverStyle,
						xAxisInfo, yAxisInfo, width, height, startLocation) {
				var data = series.data,
					minX = xAxisInfo.min,
					minY = yAxisInfo.min,
					maxX = xAxisInfo.max,
					maxY = yAxisInfo.max,
					kx = width / (maxX - minX),
					ky = height / (maxY - minY),
					serieEles = [],
					bubbleRadius = options.bubbleRadius,
					dcl, imgWidth, imgHeight;

				if (data.y1 === undefined) {
					return;
				}

				$.each(data.y1, function (i, y1) {
					if (data.x === undefined || data.y === undefined) {
						return true;
					}

					var x = data.x[i],
						y = data.y[i],
						markers = series.markers || {},
						markerType = markers.type || "circle",
						symbols = markers.symbol,
						invisibleMarkLabels = series.invisibleMarkLabels || [],
						rf, bubbleInfo, wijchartDataObj, bubble, sX, sY,
						symbol, symbolEl, r, tracker;

					if (bubbleRadius) {
						r = bubbleRadius[currentIndex];
						currentIndex++;
					}
					else {
						r = $.wijbubble.transform(y1, options.maximumSize,
							options.minimumSize, options.bounds, bubMin,
							bubDiff, options.sizingMethod, markerType);
					}
					if (xAxisInfo.isTime) {
						x = $.toOADate(x);
					}
					else if (isNaN(x)) {
						x = i;
					}

					if (yAxisInfo.isTime) {
						y = $.toOADate(y);
					}

					sX = bounds.startX + (x - minX) * kx;
					sY = bounds.startY + (maxY - y) * ky;
					if (symbols) {
						symbol = getSymbol(symbols, i);
					}
					bubble = paintMarker(markerType, sX, sY, r);
					bubble.attr(seriesStyle);
					if (symbol) {
						imgWidth = symbol.width || (r * 2);
						imgHeight = symbol.height || (r * 2);
						symbolEl = canvas.image(symbol.url, sX - r, sY - r,
							imgWidth, imgHeight);
					}
					$.wijraphael.addClass($(bubble.node),
						"wijchart-canvas-object wijbubblechart-bubble");
					if (symbol) {
						bubble.attr("opacity", 0.1);
					}
					wijchartDataObj = $.extend(false, {
						index: i,
						bubble: bubble,
						style: seriesStyle,
						y1: y1,
						x: x,
						y: y,
						type: "bubble",
						hoverStyle: seriesHoverStyle
					}, series);
					if (symbol) {
						wijchartDataObj.symbol = true;
						wijchartDataObj.hoverStyle = $.extend({},
							seriesHoverStyle, {
								opacity: 0.1
							});
						$(symbolEl.node).data("wijchartDataObj", wijchartDataObj);
						$.wijraphael.addClass($(symbolEl.node), "wijbubblechart-symbol");
					}
					$(bubble.node).data("wijchartDataObj", wijchartDataObj);

					tracker = bubble.clone();
					//.attr({ opacity: 0.01, fill: "white", "fill-opacity": 0.01 });

					// in vml, if the tracker has a stroke, the boder is black.
					if ($.browser.msie && $.browser.version < 9) {
						tracker.attr({ opacity: 0.01, fill: "white", 
						"stroke-width": 0, "fill-opacity": 0.01 });
					}
					else {
						tracker.attr({ opacity: 0.01, fill: "white", 
						"fill-opacity": 0.01 });
					}

					$(tracker.node).data("owner", $(bubble.node));
					$.wijraphael.addClass($(tracker.node),
						"wijchart-canvas-object wijbubblechart-bubble bubbletracker");
					bubble.tracker = tracker;
					trackers.push(tracker);

					bubbles.push(bubble);
					fields.bubbles = bubbles;
					rf = {
						x: sX,
						y: sY,
						r: r
					};
					if (chartLabel.visible && getLabelVisible(invisibleMarkLabels, i)) {
						if (chartLabel.position === "outside") {
							applyLabelCompass(rf, y1);
						}
						dcl = paintDefaultChartLabel(rf, y1);
						dcl.attr("opacity", 0);
						$(dcl.node).data("wijchartDataObj", wijchartDataObj);
						$.wijraphael.addClass($(dcl.node), "wijbubblechart-label");
					}
					bubbleInfo = {
						bubble: bubble,
						dcl: dcl,
						symbol: symbolEl
					};
					bubbleInfos.push(bubbleInfo);
					serieEles.push(bubbleInfo);
					if (series.visible === false) {
						bubble.hide();
						if (dcl) {
							dcl.hide();
						}
						tracker.hide();
						if (symbolEl) {
							symbolEl.hide();
						}
					}
				});
				fields.bubbleInfos = bubbleInfos;
				seriesEles.push(serieEles);
			}

			function paintBubbles() {
				$.each(seriesList, function (i, series) {
					var seriesStyle = seriesStyles[i],
						seriesHoverStyle = seriesHoverStyles[i];

					paintbubble(series, seriesStyle, seriesHoverStyle,
						xAxisInfo, yAxisInfo, width, height, startLocation);
				});
			}

			function bindLiveEvents(element,
				mouseDown, mouseUp, mouseOver,
				mouseOut, mouseMove, click, disabled) {
				var proxyObj = {
					mousedown: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						mouseDown.call(element, e, dataObj);
					},
					mouseup: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						mouseUp.call(element, e, dataObj);
					},
					mouseover: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						mouseOver.call(element, e, dataObj);
					},
					mouseout: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj, bubble;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						bubble = dataObj.bubble;

						if (dataObj.symbol) {
							return;
						}

						if (!dataObj.hoverStyle) {
							if (bubble) {
								bubble.attr({ opacity: "1" });
							}
						}
						else {
							bubble.attr(dataObj.style);
							if (dataObj.style.opacity) {
								bubble.attr("opacity", dataObj.style.opacity);
							}
						}
						mouseOut.call(element, e, dataObj);
					},
					mousemove: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj, bubble;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						bubble = dataObj.bubble;
						if (!dataObj.hoverStyle) {
							if (bubble) {
								bubble.attr({ opacity: "0.8" });
							}
						}
						else {
							bubble.attr(dataObj.hoverStyle);
						}
						mouseMove.call(element, e, dataObj);
					},
					click: function (e) {
						if (disabled) {
							return;
						}
						var target = $(e.target),
								dataObj;
						if (target.data("owner")) {
							target = target.data("owner");
						}
						dataObj = target.data("wijchartDataObj");
						click.call(element, e, dataObj);
					}
				};

				$.each(["click", "mouseover", "mouseout", "mousemove",
				"mousedown", "mouseup"], function (i, n) {
					$(".bubbletracker", element)
					.bind(n + ".wijbubblechart", proxyObj[n]);
				});
			}

			paintBubbles();
			fields.seriesEles = seriesEles;
			playAnimation();
			trackers.toFront();
			fields.trackers = trackers;

			bindLiveEvents(element, mouseDown, mouseUp, mouseOver,
			mouseOut, mouseMove, click, disabled);
			element.data("fields", fields);
		}
	});

	$.wijbubble = {
		transform: function (yval, maxSize, minSize, bounds, bubMin,
			bubDiff, sizingMethod, markerType) {
			var yscale, val = yval,
				bubSizeDiff = maxSize - minSize,
				width = bounds.endX - bounds.startX,
				height = bounds.endY - bounds.startY;

			val -= bubMin;
			if (bubDiff === 0) {
				val = 1;
			}
			else {
				val /= bubDiff;
			}
			val = $.wijbubble.transformByArea(val, sizingMethod, markerType);

			val *= bubSizeDiff;
			val += minSize;
			yscale = Math.min(width, height);
			val *= yscale / 200.0;
			//val = $.wijbubble.transformByArea(val,sizingMethod, markerType)
			return val;
			//return Math.round(val);
		},

		transformByArea: function (yval, sizingMethod, markerType) {
			var val = yval;
			if (sizingMethod === "area") {
				switch (markerType) {
				case "circle":
					val = Math.sqrt(val / Math.PI);
					break;
				case "tri":
				case "invertedTri":
					val = Math.sqrt(val / (3 * Math.sin(Math.PI / 6) *
				Math.cos(Math.PI / 6)));
					break;
				case "box":
					val = Math.sqrt(val / 2);
					break;
				case "diamond":
				case "cross":
					val = Math.sqrt(val / 2);
					break;
				default:
					val = Math.sqrt(4 * val / Math.PI);
					break;
				}
			}
			return val;
		}
	};

} (jQuery));
