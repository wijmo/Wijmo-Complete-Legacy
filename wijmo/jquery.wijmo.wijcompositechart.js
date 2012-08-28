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
 *  globalize.min.js
 *  jquery.ui.widget.js
 *  jquery.wijmo.wijchartcore.js
 *  jquery.wijmo.wijbarchart.js
 *  jquery.wijmo.wijlinechart.js
 *  jquery.wijmo.wijpiechart.js
 *  jquery.wijmo.wijscatterchart.js
 *
 */

(function ($) {
	"use strict";

	$.widget("wijmo.wijcompositechart", $.wijmo.wijchartcore, {
		options: {
			/// <summary>
			/// A value that determines whether to show a stacked chart.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
			///      stacked: true
			///  });
			/// </summary>
			stacked: false,
			/// <summary>
			/// A value that indicates the percentage of bar elements 
			///	in the same cluster overlap.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
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
			///  $("#compositechart").wijcompositechart({
			///      clusterWidth: 75
			///  });
			/// </summary>
			clusterWidth: 85,
			/// <summary>
			/// A value that indicates the corner-radius for the bar.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
			///      clusterRadius: 5
			///  });
			/// </summary>
			clusterRadius: 0,
			/// <summary>
			/// A value that indicates the spacing between the adjacent bars.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
			///      clusterSpacing: 3
			///  });
			/// </summary>
			clusterSpacing: 0,
			/// <summary>
			/// An array collection that contains the data to be charted.
			/// Default: [].
			/// Type: Array.
			///	Code example: 
			///	$("#compositechart").wijcompositechart({
			///				seriesList: [{
			///					type: "bar",
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: [1, 2, 3, 4, 5],
			///						y: [12, 21, 9, 29, 30]
			///					}}, {
			///					type: "bar",
			///					label: "Q2",
			///					legendEntry: true,
			///					data: {
			///						xy: [1, 21, 2, 10, 3, 19, 4, 31, 5, 20]
			///					}}, {
			///					type: "line",
			///					label: "Q3",
			///					legendEntry: true,
			///					data: {
			///						x: [1, 2, 3, 4, 5],
			///						y: [12, 21, 9, 29, 30]
			///					}}, {
			///					type: "pie",
			///					label: "title for pie chart",
			///					legendEntry: false,
			///					data: [{
			///						label: "Q4",
			///						data: 12,
			///						offset: 15
			///					}, {
			///						label: "Q5",
			///						data: 21,
			///						offset: 0
			///					}, {
			///						label: "Q5",
			///						data: 21,
			///						offset: 0
			///					}],
			///					center: {
			///						x: 150,
			///						y: 150
			///					},
			///					radius: 100
			///					}
			///				}]
			///				OR
			///				seriesList: [{
			///					type: "bar"
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: ["A", "B", "C", "D", "E"],
			///						y: [12, 21, 9, 29, 30]
			///					}
			///				}, {
			///					type: "line"
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: ["A", "B", "C", "D", "E"],
			///						y: [12, 21, 9, 29, 30]
			///					}
			///				}
			///				]
			///				OR
			///				seriesList: [{
			///					type: "bar",
			///					label: "Q1",
			///					legendEntry: true,
			///					data: {
			///						x: [new Date(1978, 0, 1), new Date(1980, 0, 1), 
			///							new Date(1981, 0, 1), new Date(1982, 0, 1), 
			///							new Date(1983, 0, 1)],
			///						y: [12, 21, 9, 29, 30]
			///					}
			///				}, {
			///					type: "bar",
			///					label: "Q2",
			///					legendEntry: true,
			///					data: {
			///						x: [new Date(1978, 0, 1), new Date(1980, 0, 1), 
			///							new Date(1981, 0, 1), new Date(1982, 0, 1), 
			///							new Date(1983, 0, 1)],
			///						y: [10, 25, 5, 25, 35]
			///					}
			///				}]
			///  });
			/// </summary>
			seriesList: [],
			/// <summary>
			/// A value that indicates whether to show animation 
			///	and the duration for the animation.
			/// Default: {enabled:true, duration:400, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
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
			/// and the duration for the animation when reloading data.
			/// Default: {enabled:true, duration:400, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#compositechart").wijcompositechart({
			///      animation: {enabled: true, duration: 1000, easing: "<"}
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
			/// Occurs when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({
			///  mouseDown: function(e, data) { } 
			/// });
			/// Bind to the event by type: wijcompositechartmousedown
			/// $("#compositechart").bind("wijcompositechartmousedown", 
			/// function(e, data) {} );*-
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousedown element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			mouseDown: null,
			/// <summary>
			/// Occurs when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({
			/// mouseUp: function(e, data) { } });
			/// Bind to the event by type: wijcompositechartmouseup
			/// $("#compositechart").bind("wijcompositechartmouseup", 
			/// function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseup element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			mouseUp: null,
			/// <summary>
			/// Occurs when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({
			/// mouseOver: function(e, data) { } });
			/// Bind to the event by type: wijcompositechartmouseover
			/// $("#compositechart").bind("wijcompositechartmouseover",
			/// function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseover element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			mouseOver: null,
			/// <summary>
			/// Occurs when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({
			/// mouseOut: function(e, data) { } });
			/// Bind to the event by type: wijcompositechartmouseout
			/// $("#compositechart").bind("wijcompositechartmouseout",
			/// function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseout element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			mouseOut: null,
			/// <summary>
			/// Occurs when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({
			/// mouseMove: function(e, data) { } });
			/// Bind to the event by type: wijcompositechartmousemove
			/// $("#compositechart").bind("wijcompositechartmousemove", 
			/// function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousemove element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			mouseMove: null,
			/// <summary>
			/// Occurs when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#compositechart").wijcompositechart({click: function(e, data) { } });
			/// Bind to the event by type: wijcompositechartclick
			/// $("#compositechart").bind("wijcompositechartclick", 
			/// function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the click element.
			/// data.type: "bar"/"line"/"marker"/"pie"/"scatter"
			/// 1. If data.type is "bar", the options of data is as following:
			/// data.bar: the Raphael object of the bar.
			/// data.data: data of the series of the element.
			/// data.hoverStyle: hover style of series of the element.
			/// data.index: index of the element.
			/// data.style: style of the series of the element.
			/// data.label: label of the series of the element.
			/// data.legendEntry: legend entry of the series of the element.
			/// 2. If data.type is "line", the options of data is as following:
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
			/// 3. If data.type is "marker", the options of data is as following:
			/// data.index: index of the marker.
			/// data.isSymbol: indicates whether the marker is symbol.
			/// data.lineSeries: the line infos of the marker.
			/// data.marker: the Raphael object of the marker.
			/// 4. If data.type is "pie", the options of data is as following:
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// 5. If data.type is "scatter", the options of data is as following:
			/// data.index: index of the marker.
			/// data.x: value x of the marker.
			/// data.y: value y of the marker.
			/// </param>
			click: null
		},

		_create: function () {
			var self = this,
				o = self.options,
				defFill = self._getDefFill();

			$.each(o.seriesList, function (idx, series) {
				if (series.type === "bar") {
					$.extend(true, o.axis, {
						x: {
							compass: "west"
						},
						y: {
							compass: "south"
						}
					});
					return true;
				} else if (series.type === "pie" && series.pieSeriesList) {
					series.data = series.pieSeriesList;
				}
			});

			$.extend(true, {
				compass: "east"
			}, o.hint);

			// set the is100percent to default value.
			if (o.is100Percent) {
				o.is100Percent = false;
			}

			// default some fills
			$.each(o.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});

			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijcompositechart");
		},

		_setOption: function (key, value) {
			// ignore the is100Percent option.
			if (key !== "is100Percent") {
				$.wijmo.wijchartcore.prototype._setOption.apply(this, arguments);
			}
		},

		destroy: function () {
			var self = this,
				element = self.chartElement,
				fields = element.data("fields"),
				aniBarsAttr = fields && fields.aniBarsAttr;

			element.removeClass("wijmo-wijcompositechart");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);

			self._destroyRaphaelArray(aniBarsAttr);

			element.data("fields", null);
		},

		_isBarChart: function () {
			return true;
		},

		_clearChartElement: function () {
			var self = this,
				o = self.options,
				element = self.chartElement,
				fields = element.data("fields");

			if (fields && fields.allElements) {
				$.each(fields.allElements, function (key, eles) {
					if (key === "scatters") {
						if (eles.length) {
							$.each(eles, function (i, ele) {
								if (ele.length) {
									$.each(ele, function (j, n) {
										if (n && n.remove) {
											n.remove();
										}
										ele[j] = null;
									})
									eles[i] = null;
								}
							});
						}
					}
					self._destroyRaphaelArray(eles);
				});
				fields.allElements = null;
			}

			$.wijmo.wijchartcore.prototype._clearChartElement.apply(self, arguments);
			if (fields && fields.ctracers) {
				fields.ctracers = null;
			}

			self.element.removeData("plotInfos");

			if (!o.seriesTransition.enabled) {
				if (fields && fields.aniBarsAttr) {
					fields.aniBarsAttr = null;
				}
			}

		},

		_bindData: function () {
			var self = this,
				o = self.options,
				dataSource = o.dataSource,
				seriesList = o.seriesList,
				shareData = o.data, sharedXList;


			$.each(seriesList, function (i, series) {
				var data = series.data, dataX, dataY, dataY1,
					ds = series.dataSource || dataSource,
					type = series.type, dataLabel, dataValue, dataOffset,
					pieData = [];

				if (ds && data) {
					if (type === "pie") {
						dataLabel = data.label;
						dataValue = data.value;
						dataOffset = data.offset;
						if (dataLabel && dataLabel.bind) {
							dataLabel = self._getBindData(ds, dataLabel.bind);
						}
						if (dataValue && dataValue.bind) {
							dataValue = self._getBindData(ds, dataValue.bind);
						}
						if (dataOffset && dataOffset.bind) {
							dataOffset = self._getBindData(ds, dataOffset.bind);
						}
						if (dataLabel && $.isArray(dataLabel) && dataLabel.length &&
						dataValue && $.isArray(dataValue) && dataValue.length) {
							$.each(dataValue, function (idx, val) {
								var label,
							offset = 0;
								if (idx >= 0 && idx < dataLabel.length) {
									label = dataLabel[idx];
								}
								if (dataOffset && $.isArray(dataValue) &&
								dataOffset.length &&
								idx >= 0 && idx < dataOffset.length) {
									offset = typeof dataOffset[idx] ===
									'undefined' ? 0 : dataOffset[idx];
								}
								pieData.push({
									data: val,
									label: label,
									offset: offset,
									legendEntry: true
								});
							});
							series.data = pieData;
						}
					}
					else {
						dataX = data.x;
						dataY = data.y;
						dataY1 = data.y1;
						if (dataX && dataX.bind) {
							data.x = self._getBindData(ds, dataX.bind);
						}
						else if (shareData && shareData.x && shareData.x.bind) {
							if (sharedXList === undefined) {
								sharedXList = self._getBindData(ds, shareData.x.bind);
							}
							data.x = sharedXList;
						}

						if (dataY && dataY.bind) {
							data.y = self._getBindData(ds, dataY.bind);
						}
						if (dataY1 && dataY1.bind) {
							data.y1 = self._getBindData(ds, dataY1.bind);
						}
					}
				}
			});

		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */
		getElement: function (type, index, seriesIndex) {
			/// <summary>
			/// Returns the raphael element with the given type and index.
			/// </summary>
			/// <param name="type" type="String">
			/// The type of the raphael element.
			/// </param>
			/// <param name="index" type="Number">
			/// The index of the element.
			/// </param>
			/// <param name="seriesIndex" type="Number">
			/// The index of the series.
			/// </param>
			/// <returns type="Raphael element">
			/// Returns the specified raphael object.
			/// </returns>
			var element = this.chartElement,
				fields = element.data("fields"),
				chartElements = fields.chartElements;

			switch (type) {
				case "bar":
				case "column":
					return chartElements.bars[index];
				case "line":
				case "area":
					return chartElements.paths[index];
				case "linemarkers":
					return chartElements.markersSet[index];
				case "pie":
					//return chartElements.sectors[index];
					return this._getPie(chartElements, index, seriesIndex);
			}

			return null;
		},

		_getPie: function (chartElements, index, seriesIndex) {
			if (seriesIndex !== undefined) {
				if (chartElements["sectors" + seriesIndex]) {
					return chartElements["sectors" + seriesIndex][index];
				}
				return null;
			}
			else {
				var sectors = [];
				$.each(chartElements, function (key, val) {
					if (/sectors/.test(key) && key !== "sectors") {
						$.each(val, function (i, n) {
							sectors.push(n);
						});
					}
				});
				if (sectors.length === 0) {
					sectors = chartElements.sectors;
				}
				return sectors[index];
			}
		},

		/** end of public methods */

		_isSeriesDataEmpty: function () {
			var self = this,
				sl = self.options.seriesList;

			if (!sl || sl.length === 0) {
				return true;
			}

			$.each(sl, function (idx, s) {
				if (s.type === "pie" &&
						(!s.data || !s.label || s.label.length === 0)) {
					return true;
				} else if (!s.data || ((!s.data.x || !s.data.y) && !s.data.xy)) {
					return true;
				}
			});

			return false;
		},

		_showSerieEles: function (seriesEle) {
			var type = seriesEle.type,
				eles = seriesEle.eles,
				showLabels = this.options.showChartLabels, dataObj;

			switch (type) {
				case "pie":
					if (eles.sector) {
						eles.sector.show();
						if (eles.sector.shadow) {
							eles.sector.shadow.show();
						}
						if (eles.sector.tracker) {
							eles.sector.tracker.show();
						}
					}
					if (eles.label) {
						eles.label.show();
					}
					break;
				case "line":
				case "spline":
				case "bezier":
				case "area":
					if (eles.markers) {
						$.each(eles.markers, function (i, marker) {
							dataObj = $(marker.node).data("wijchartDataObj");
							if (dataObj && dataObj.lineSeries && dataObj.lineSeries.markers) {
								if (!dataObj.lineSeries.markers.visible) {
									return true;
								}
							}
							marker.show();
						});
					}

					if (eles.dcl) {
						$.each(eles.dcl, function (i, dcl) {
							if (showLabels) {
								dcl.show();
							}
						});
					}

					if (eles.path) {
						dataObj = $(eles.path.node).data("wijchartDataObj");
						if (dataObj.visible) {
							eles.path.show();
							if (eles.path.shadow) {
								eles.path.shadow.show();
							}
							if (eles.path.area) {
								eles.path.area.show();
							}
							if (eles.path.tracker) {
								eles.path.tracker.show();
							}
						}
					}
					break;
				case "bar":
				case "column":
					$.each(eles, function (i, bar) {
						if (bar.bar) {
							bar.bar.show();
							if (bar.bar.shadow) {
								bar.bar.shadow.show();
							}
							if (bar.bar.tracker) {
								bar.bar.tracker.show();
							}
						}
						if (bar.dcl) {
							bar.dcl.show();
						}
						if (bar.animatedBar && !bar.animatedBar.removed) {
							bar.animatedBar.show();
						}
					});
					break;
				case "scatter":
					$.each(eles, function (i, dot) {
						dot.show();
					});
					break;
			}
		},

		_hideSerieEles: function (seriesEle) {
			var type = seriesEle.type,
				eles = seriesEle.eles;

			switch (type) {
				case "pie":
					if (eles.sector) {
						eles.sector.hide();
						if (eles.sector.shadow) {
							eles.sector.shadow.hide();
						}
						if (eles.sector.tracker) {
							eles.sector.tracker.hide();
						}
					}
					if (eles.label) {
						eles.label.hide();
					}
					break;
				case "line":
				case "spline":
				case "bezier":
				case "area":
					if (eles.markers) {
						$.each(eles.markers, function (i, marker) {
							marker.hide();
						});
					}

					if (eles.dcl) {
						$.each(eles.dcl, function (i, dcl) {
							dcl.hide();
						});
					}

					if (eles.path) {
						eles.path.hide();
						if (eles.path.shadow) {
							eles.path.shadow.hide();
						}
						if (eles.path.area) {
							eles.path.area.hide();
						}
						if (eles.path.tracker) {
							eles.path.tracker.hide();
						}
					}
					break;
				case "bar":
				case "column":
					$.each(eles, function (i, bar) {
						if (bar.bar) {
							bar.bar.hide();
							if (bar.bar.shadow) {
								bar.bar.shadow.hide();
							}
							if (bar.bar.tracker) {
								bar.bar.tracker.hide();
							}
						}
						if (bar.dcl) {
							bar.dcl.hide();
						}
						if (bar.animatedBar && !bar.animatedBar.removed) {
							bar.animatedBar.hide();
						}
					});
					break;
				case "scatter":
					$.each(eles, function (i, dot) {
						dot.hide();
					});
					break;
			}
		},

		_paintTooltip: function () {
			var self = this,
				element = self.chartElement,
				fields = element.data("fields") || {},
				ctracers = fields.ctracers || [];

			$.wijmo.wijchartcore.prototype._paintTooltip.apply(this, arguments);

			if (self.tooltip) {
				$.each(ctracers, function (idx, ctracer) {
					if (ctracer.trackers && ctracer.trackers.length) {
						if (idx === 0) {
							self.tooltip
							.setOptions({ relatedElement: ctracer.trackers[0] });
						}
					}
				});
			}
		},

		_paintPlotArea: function () {
			var self = this,
				o = self.options,
				seriesList = "seriesList",
				seriesStyles = "seriesStyles",
				seriesHoverStyles = "seriesHoverStyles",
				styles = o[seriesStyles],
				hoverStyles = o[seriesHoverStyles],
				bounds = self.canvasBounds,
				charts = {},
				index = 0,
				isMulityYAxis = $.isArray(o.axis.y),
				options = {
					canvas: self.canvas,
					tooltip: self.tooltip,
					bounds: bounds,
					widgetName: self.widgetName,
					seriesTransition: o.seriesTransition,
					showChartLabels: o.showChartLabels,
					textStyle: o.textStyle,
					chartLabelStyle: o.chartLabelStyle,
					chartLabelFormatString: o.chartLabelFormatString,
					shadow: o.shadow,
					hint: o.hint,
					animation: o.animation,
					disabled: o.disabled,
					culture: self._getCulture(),
					mouseDown: function (e, args) {
						self._trigger("mouseDown", e, args);
					},
					mouseUp: function (e, args) {
						self._trigger("mouseUp", e, args);
					},
					mouseOver: function (e, args) {
						self._trigger("mouseOver", e, args);
					},
					mouseOut: function (e, args) {
						self._trigger("mouseOut", e, args);
					},
					mouseMove: function (e, args) {
						self._trigger("mouseMove", e, args);
					},
					click: function (e, args) {
						self._trigger("click", e, args);
					}
				},
				fields = self.chartElement.data("fields"),
				tmpOptions, chartgroup;

			if (fields) {
				fields.ctracers = [];
			}
			$.each(o[seriesList], function (i, series) {
				var type = series.type,
					chart = {},
					chartType = type,
					pie = {},
					style = $.extend({}, styles[index]),
					hoverStyle = $.extend({}, hoverStyles[index]),
					yAxis = series.yAxis;

				if (!type || type.length === 0) {
					return true;
				}

				if (chartType === "spline" || chartType === "bezier") {
					chartType = "line";
				}

				chart = charts[chartType];

				if (!chart) {
					if (type === "pie") {
						chart = [];
					} else {
						chart = {};
					}

					charts[chartType] = chart;

					if (series.hint) {
						chart.hint = series.hint;

						if (!o.hint.content) {
							o.hint.content = series.hint.content;
						}

						if (!o.hint.title) {
							o.hint.title = series.hint.title;
						}
					}
				}

				if (type === "pie") {
					$.each(series.data, function (j, data) {
						style = $.extend({}, styles[index]);
						hoverStyle = $.extend({}, hoverStyles[index]);

						if (!pie[seriesList]) {
							pie[seriesList] = [];
						}

						if (!pie[seriesStyles]) {
							pie[seriesStyles] = [];
						}

						if (!pie[seriesHoverStyles]) {
							pie[seriesHoverStyles] = [];
						}
						data.pieID = i + 1;
						pie[seriesList].push(data);
						pie[seriesStyles].push(style);
						pie[seriesHoverStyles].push(hoverStyle);
						index++;
					});
					pie.radius = series.radius;
					pie.center = series.center;
					pie.label = series.label;
					chart.push(pie);
					return true;
				} else if (type === "column") {
					chart.horizontal = false;
				} else if (type === "bar") {
					chart.horizontal = true;
				} else if (type === "spline") {
					series.fitType = "spline";
				} else if (type === "bezier") {
					series.fitType = "bezier";
				}

				if (isMulityYAxis) {
					chart.yAxis = yAxis || 0;
				}

				if (type === "line" || type === "spline" ||
						type === "bezier") {
					delete style.fill;
					delete hoverStyle.fill;
				}

				if (!chart[seriesList]) {
					chart[seriesList] = [];
				}

				if (!chart[seriesStyles]) {
					chart[seriesStyles] = [];
				}

				if (!chart[seriesHoverStyles]) {
					chart[seriesHoverStyles] = [];
				}

				chart[seriesList].push(series);
				chart[seriesStyles].push(style);
				chart[seriesHoverStyles].push(hoverStyle);
				index++;
			});

			$.each(charts, function (type, chart) {
				var yAxisIndex = chart.yAxis;
				switch (type) {
					case "pie":
						$.each(chart, function (idx, pie) {
							var center = pie.center,
						r = pie.radius || 50,
						pieBounds = center ? {
							startX: center.x - r,
							startY: center.y - r,
							endX: center.x + r,
							endY: center.y + r
						} : {
							startX: bounds.startX + 10,
							startY: bounds.startY + 10,
							endX: bounds.startX + 10 + 2 * r,
							endY: bounds.startY + 10 + 2 * r
						};

							tmpOptions = $.extend(true, {}, options, {
								bounds: pieBounds,
								radius: r
							}, pie);

							self.chartElement.wijpie(tmpOptions);
							self.chartElement.data("fields").aniSectorAttrs = null;
							self.chartElement.data("fields").aniLabelAttrs = null;
							self._savechartData(type);
						});

						break;
					case "bar":
					case "column":

						tmpOptions = $.extend(true, {}, options, {
							stacked: o.stacked,
							axis: o.axis,
							clusterOverlap: o.clusterOverlap,
							clusterWidth: o.clusterWidth,
							clusterSpacing: o.clusterSpacing,
							is100Percent: o.is100Percent,
							clusterRadius: o.clusterRadius,
							isYTime: self.axisInfo.y[0].isTime,
							isXTime: self.axisInfo.x.isTime,
							yAxisInfo: self.axisInfo.y,
							yAxisIndex: yAxisIndex
						}, chart);

						self.chartElement.wijbar(tmpOptions);

						self._savechartData(type);
						break;
					case "line":
					case "spline":
					case "bezier":
					case "area":
						chartgroup = self._getyAxisGroup(chart);
						$.each(chartgroup, function (ykey, subchart) {
							if (!self.aniPathsAttr) {
								self.aniPathsAttr = [];
							}
							tmpOptions = $.extend(true, {}, options, {
								axis: o.axis,
								isXTime: self.axisInfo.x.isTime,
								isYTime: self.axisInfo.y[0].isTime,
								aniPathsAttr: self.aniPathsAttr,
								chartLabelEles: self.chartLabelEles,
								type: type === "area" ? "area" : "line",
								hole: o.hole
							}, subchart);
							tmpOptions.axis.y = o.axis.y[ykey] || o.axis.y;
							self.chartElement.wijline(tmpOptions);

							self._savechartData(type, true);
						});
						break;
					case "scatter":
						chartgroup = self._getyAxisGroup(chart);
						$.each(chartgroup, function (ykey, subchart) {
							tmpOptions = $.extend(true, {}, options, {
								axis: o.axis,
								isXTime: self.axisInfo.x.isTime,
								isYTime: self.axisInfo.y[0].isTime,
								zoomOnHover: o.zoomOnHover
							}, subchart);
							tmpOptions.axis.y = o.axis.y[ykey] || o.axis.y;
							self.chartElement.wijscatter(tmpOptions);

							self._savechartData(type);
						});
						break;
				}
			});
			self.chartElement.data("fields").seriesEles = null;

			self._bindtooltip();
		},

		_savechartData: function (type, notrackers) {
			var self = this,
				fields = self.chartElement.data("fields"),
				seriesEles = fields.seriesEles,
				allElements = fields.allElements || {},
				ctracers;
			$.each(seriesEles, function (i, ele) {
				self.seriesEles.push({ eles: ele, type: type });
			});
			if (notrackers) {
				fields.ctracers = [];
			}
			else {
				ctracers = fields.ctracers || [];
				ctracers.push({
					trackers: fields.trackers,
					type: type
				});
				fields.ctracers = ctracers;
			}

			if (fields && fields.chartElements) {
				$.each(fields.chartElements, function (key, eles) {
					self._copyElements(allElements, key, eles);
				});
			}
			fields.allElements = allElements;

		},

		_copyElements: function (target, key, source) {
			var tar;
			if (source && $.isArray(source)) {
				tar = target[key] || [];
				target[key] = tar.concat(source);
			}
			else if (source) {
				tar = target[key] || [];
				tar.concat([source]);
			}
		},

		_getyAxisGroup: function (chart) {
			var group = {};
			$.each(chart.seriesList, function (idx, series) {
				var yAxis = series.yAxis || 0;
				if (!group[yAxis]) {
					group[yAxis] = {
						seriesList: [],
						seriesStyles: [],
						seriesHoverStyles: []
					};
				}
				group[yAxis].seriesList.push(series);
				group[yAxis].seriesStyles.push(chart.seriesStyles[idx]);
				group[yAxis].seriesHoverStyles.push(chart.seriesHoverStyles[idx]);
			});
			return group;
		},

		_bindtooltip: function () {
			var self = this,
			namespace = self.widgetName,
			fields = self.chartElement.data("fields");
			if (fields) {
				$.each(fields.ctracers, function (index, ctracer) {
					if (ctracer.trackers) {
						ctracer.trackers.toFront();
					}
				});
			}

			self.chartElement
			.delegate(".linetracker, .bartracker, .pietracker, .wijscatterchart",
			"mouseover." + namespace, $.proxy(self._tooltipMouseOver, self));
			self.chartElement
			.delegate(".linetracker, .bartracker, .pietracker, .wijscatterchart",
			 "mouseout." + namespace, $.proxy(self._tooltipMouseOut, self));
			self.chartElement
			.delegate(".linetracker, .bartracker, .pietracker, .wijscatterchart",
			 "mousemove." + namespace, $.proxy(self._tooltipMouseMove, self));
		},

		_tooltipMouseOver: function (e) {
			var target = e.target,
				self = this,
				tooltip = self.tooltip,
				hint = self.options.hint,
				op = null,
				title = hint.title,
				content = hint.content,
				hintStyle = hint.style,
				isTitleFunc = $.isFunction(title),
				isContentFunc = $.isFunction(content),
				data, bbox, position;

			position = $(self.canvas.canvas.parentNode).offset();

			if ($(target).data("owner")) {
				target = $(target).data("owner");
			}
			target = $(target);
			data = target.data("wijchartDataObj");
			if (self.tooltip) {
				op = tooltip.getOptions();
				if (isTitleFunc || isContentFunc) {
					if (isTitleFunc) {
						op.title = $.proxy(title, data);
					}
					if (isContentFunc) {
						op.content = $.proxy(content, data);
					}
				}
				if (data.type === "line") {
					if (data.path.removed) {
						return;
					}
					if (self.hoverLine !== data) {
						self.isNewLine = true;
						if (self.hoverLine) {
							if (!self.hoverLine.path.removed) {
								self.hoverLine.path.wijAttr(self.hoverLine.lineStyle);
								if (self.hoverPoint && !self.hoverPoint.isSymbol) {
									self.hoverPoint.marker
									.wijAttr(self.hoverPoint.markerStyle);
									self.hoverPoint.marker.transform("s1");
								}
							}
						}
						if (data.lineHoverStyle) {
							data.path.wijAttr(data.lineHoverStyle);
						}
						self.hoverLine = data;
						self.hoverPoint = null;
						self.hoverVirtualPoint = null;
					}
				}
				else if (data.type === "scatter") {
					self._clearHoverState();
					bbox = data.dot.getBBox();
					op.style.stroke = hintStyle.stroke || target.attr("stroke");
					self.tooltip.showAt({
						x: bbox.x + bbox.width / 2,
						y: bbox.y
					}, e);
				}
				else {
					self._clearHoverState();
					op.style.stroke = hintStyle.stroke || target.attr("stroke");
					self.tooltip.showAt({
						x: e.pageX - position.left,
						y: e.pageY - position.top
					}, e);
				}
			}
		},

		_tooltipMouseMove: function (e) {
			var self = this,
				target = e.target, data,
				position = $(self.canvas.canvas.parentNode).offset();

			if ($(target).data("owner")) {
				target = $(target).data("owner");
			}
			target = $(target);
			data = target.data("wijchartDataObj");

			if (self.tooltip) {
				if (data.type !== "line" && data.type !== "scatter") {
					self.tooltip.showAt({
						x: e.pageX - position.left,
						y: e.pageY - position.top
					}, e);
				}
			}
		},

		_tooltipMouseOut: function (e) {
			var self = this,
				target = e.target, data;

			if ($(target).data("owner")) {
				target = $(target).data("owner");
			}
			target = $(target);
			data = target.data("wijchartDataObj");
			if (data.type !== "line") {
				if (self.tooltip) {
					self.tooltip.hide();
				}
			}
		},

		_mouseMoveInsidePlotArea: function (e, mousePos) {
			var self = this,
				tooltip = self.tooltip,
				hint = self.options.hint,
				markers,
				virtualMarkers,
				idx = 0,
				p, point, valueX, valueY,
				s = null,
				dataObj = null,
				op = null,
				title = hint.title,
				content = hint.content,
				isTitleFunc = $.isFunction(title),
				isContentFunc = $.isFunction(content),
				distance = 0,
				hoverLine;

			if (tooltip) {
				op = tooltip.getOptions();
			}

			if (self.hoverLine) {
				hoverLine = self.hoverLine;
				if (self.isNewLine) {
					if (hint.enable && tooltip) {
						tooltip.hide();
					}
					self.isNewLine = false;
				}
				markers = hoverLine.lineMarkers;
				virtualMarkers = hoverLine.virtualMarkers;
				idx = -1;
				p = { x: 0, y: 0 };
				if (markers && markers.length) {
					$.each(markers, function (i, marker) {
						if (marker.removed) {
							return true;
						}
						var box = marker.wijGetBBox(),
							pos = box.x + box.width / 2,
							dis = Math.abs(pos - mousePos.left);
						if (i === 0 || dis < distance) {
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
						if (markers[idx].removed) {
							return;
						}
						point = $(markers[idx].node).data("wijchartDataObj");

						if (point) {
							if (self.hoverPoint && !self.hoverPoint.isSymbol) {
								if (!self.hoverPoint.removed) {
									self.hoverPoint.marker
									.wijAttr(self.hoverPoint.markerStyle);
									self.hoverPoint.marker.transform("s1");
								}
							}
							if (!point.isSymbol) {
								if (!point.marker.removed) {
									point.marker.wijAttr(point.markerHoverStyle);
								}
							}
						}

						self.hoverPoint = point;
						self.hoverVirtualPoint = virtualMarkers[idx];
					}
				} else {
					$.each(virtualMarkers, function (i, marker) {
						var dis = Math.abs(marker.x - mousePos.left);
						if (i === 0 || dis < distance) {
							distance = dis;
							idx = i;
							p = {
								x: marker.x,
								y: marker.y
							};
						}
					});
					if (self.hoverVirtualPoint && self.hoverVirtualPoint.index === idx) {
						return;
					}
					if (idx > -1) {
						self.hoverPoint = null;
						self.hoverVirtualPoint = virtualMarkers[idx];
					}
				}
				if (tooltip) {
					dataObj = self.hoverVirtualPoint;
					valueX = dataObj.valX;
					valueY = dataObj.valY;
					//dataObj = self.hoverPoint;
					//valueX = dataObj.valX;
					//valueY = dataObj.valY;
					if (isTitleFunc || isContentFunc) {
						if (isTitleFunc) {
							op.title = function () {
								var obj = {
									pointIndex: idx,
									//lineIndex: dataObj.lineSeries.index,
									lineIndex: hoverLine.index,
									x: valueX,
									y: valueY,
									//label: dataObj.lineSeries.label,
									label: hoverLine.label,
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
									//lineIndex: dataObj.lineSeries.index,
									lineIndex: hoverLine.index,
									x: valueX,
									y: valueY,
									//label: dataObj.lineSeries.label,
									label: hoverLine.label,
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
						stroke: hoverLine.path.attr("stroke")
					}, hint.style);
					op.style.stroke = s.stroke;
					tooltip.showAt(p);
				}
			}

			$.wijmo.wijchartcore.prototype
			._mouseMoveInsidePlotArea.apply(self, arguments);
		},

		_mouseMoveOutsidePlotArea: function (e, mousePos) {
			var self = this;
			self._clearHoverState();
			$.wijmo.wijchartcore.prototype
			._mouseMoveOutsidePlotArea.apply(self, arguments);
		},

		_clearHoverState: function () {
			var self = this,
			tooltip = self.tooltip,
			hint = self.options.hint;

			if (hint.enable && tooltip) {
				tooltip.hide();
			}

			if (self.hoverLine) {
				if (!self.hoverLine.path.removed) {
					self.hoverLine.path.wijAttr(self.hoverLine.lineStyle);
					if (self.hoverPoint && !self.hoverPoint.isSymbol) {
						self.hoverPoint.marker.wijAttr(self.hoverPoint.markerStyle);
						//hoverPoint.marker.scale(1, 1);
						self.hoverPoint.marker.transform("s1");
					}
				}
			}
			self.hoverLine = null;
			self.hoverPoint = null;
			self.hoverVirtualPoint = null;
		},

		_getTooltipText: function (fmt, target) {
			return "";
		},

		//		_onBeforeTooltipShowing: function (tooltip) {
		//			var self = this,
		//				hint = self.options.hint,
		//				target = tooltip.target,
		//				type = "",
		//				chartElement = null,
		//				title = hint.title,
		//				content = hint.content;

		//			if (!target) {
		//				return;
		//			}
		//			if (target.data("owner")) {
		//				target = target.data("owner");
		//			}
		//			if (target.node) {
		//				chartElement = $(target.node).data("wijchartDataObj");
		//				type = chartElement && chartElement.type;
		//			}

		//			if (type === "line" || type === "spline" ||
		//				type === "bezier") {
		//				$.extend(true, tooltip.options, {
		//					closeBehavior: "none",
		//					mouseTrailing: false,
		//					triggers: "custom"
		//				});
		//			} else {
		//				$.extend(true, tooltip.options, {
		//					closeBehavior: "auto",
		//					mouseTrailing: true,
		//					triggers: "hover"
		//				});

		//				if ($.isFunction(title)) {
		//					tooltip.options.title = function () {
		//						return self._getTooltipText(title, target);
		//					};
		//				}

		//				if ($.isFunction(content)) {
		//					tooltip.options.content = function () {
		//						return self._getTooltipText(content, target);
		//					};
		//				}

		//				$.wijmo.wijchartcore.prototype._onBeforeTooltipShowing
		//				.apply(self, arguments);
		//			}
		//		},

		_calculateParameters: function (axisInfo, options) {
			var self = this,
				hasBarType = false,
				minor,
				adj;

			$.wijmo.wijchartcore.prototype._calculateParameters.apply(self, arguments);

			$.each(self.options.seriesList, function (idx, series) {
				if (series.type === "column" || series.type === "bar") {
					hasBarType = true;
					return false;
				}
			});

			if (!hasBarType) {
				return;
			}

			// check for bar chart and x axis expansion
			if (axisInfo.id === "x") {
				minor = options.unitMinor;
				adj = self._getBarAdjustment(axisInfo);

				if (adj === 0) {
					adj = minor;
				} else {
					if (minor < adj && minor !== 0) {
						adj = Math.floor(adj / minor) * minor;
					}
				}

				axisInfo.min -= adj;
				axisInfo.max += adj;

				self._calculateMajorMinor(options, axisInfo);
			}
		},

		_getBarAdjustment: function (axisInfo) {
			var len = 0,
				o = this.options,
				max = axisInfo.max,
				min = axisInfo.min,
				xLen = 0;

			$.each(o.seriesList, function (idx, series) {
				if (series.type === "pie") {
					return true;
				}
				if (series.data.x === undefined || series.data.y === undefined) {
					return true;
				}
				xLen = series.data.x.length;

				if (len < xLen) {
					len = xLen;
				}
			});

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
} (jQuery));
