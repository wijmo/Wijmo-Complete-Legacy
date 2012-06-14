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
 *
 *
 * * Wijmo LineChart widget.
 *
 * Depends:
 *	jquery.js
 *	jquery.ui.widget.js
 *	raphael.js
 *	globalize.js
 *	jquery.wijmo.raphael.js
 *	jquery.wijmo.wijchartcore.js
 *
 */

(function ($) {
	"use strict";

	if (!window.Raphael) {
		return;
	}

	$.widget("wijmo.wijlinechart", $.wijmo.wijchartcore, {
		// widget options    
		options: {
			/// <summary>
			/// A value that determines whether to show a stacked chart.
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			///  $("#linechart").wijlinechart({
			///      stacked: true
			///  });
			/// </summary>
			stacked: false,
			/// <summary>
			/// Gets or sets the data hole value.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			/// <remarks>
			/// Data holes are used as placeholders for data points 
			/// that indicate data is normally present but not in this case.
			/// </remarks>
			/// Code example:
			///  $("#linechart").wijlinechart({
			///      hole: 100
			///  });
			hole: null,
			/// <summary>
			/// A value that indicates the type of the linechart.
			/// Default: "line"
			/// Type: String.
			/// </summary>
			/// <remarks>
			/// Options are 'line' and 'area'.
			/// </remarks>
			/// Code example:
			///  $("#linechart").wijlinechart({
			///      type: "area"
			///  });
			type: "line",
			/// <summary>
			/// A value that indicates whether to show the animation
			/// and the duration for the animation.
			/// Default: {direction: "horizontal",enabled:true, 
			/// duration:2000, easing: ">"}.
			/// Type: Object.
			/// Code example:
			///  $("#linechart").wijlinechart({
			///      animation: {direction: "vertical"}
			///  });
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
				/// Default: horizontal.
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Options are 'horizontal' and 'vertical'.
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
			/// Fires when the user clicks a mouse button.
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
			/// Fires when the user releases a mouse button
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
			/// Fires when the user first places the pointer over the chart element.
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
			/// Fires when the user moves the pointer off of the chart element.
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
			/// Fires when the user moves the mouse pointer
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
			/// Fires when the user clicks the chart element. 
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
			var self = this,
				o = self.options;
			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijlinechart");
			if (o.type === "area") {
				self.chartElement.addClass("wijmo-wijareachart");
			}
		},

		destroy: function () {
			///Remove the functionality completely. 
			///This will return the element back to its pre-init state. 
			var self = this,
				o = self.options;
			self.chartElement.removeClass("wijmo-wijlinechart");
			if (o.type === "area") {
				self.chartElement.removeClass("wijmo-wijareachart");
			}

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

		getLinePath: function (lineIndex) {
			/// <summary>
			/// Returns reference to raphael's path object
			/// for the line data with given index
			/// </summary>
			/// <param name="lineIndex" type="Number">
			/// A value that indicates the index of line.
			/// </param>
			/// <returns type="Raphael element">
			/// Reference to raphael element object.
			/// </returns>
			var self = this,
				fields = self.chartElement.data("fields"),
				chartEles,
				und;
			if (fields && fields.chartElements) {
				chartEles = fields.chartElements;
				if (chartEles.paths && chartEles.paths.length) {
					return chartEles.paths[lineIndex];
				}
			}
			return und;
		},

		getLineMarkers: function (lineIndex) {
			/// <summary>
			/// Returns reference to set of the raphael's objects
			/// what represents markers for the line data with given index
			/// </summary>
			/// <param name="lineIndex" type="Number">
			/// A value that indicates the index of line.
			/// </param>
			/// <returns type="Raphael element">
			/// Reference to raphael element object.
			/// </returns>
			var self = this,
				o = self.options,
				fields = self.chartElement.data("fields"),
				chartEles,
				und;
			if (o.seriesList && o.seriesList[lineIndex].markers &&
					o.seriesList[lineIndex].markers.visible) {
				if (fields && fields.chartElements) {
					chartEles = fields.chartElements;
					if (chartEles.markersSet && chartEles.markersSet.length) {
						return chartEles.markersSet[lineIndex];
					}
				}
				//return this.markersSet[lineIndex];
			}
			return und;
		},

		/** Private methods */

		_showSerieEles: function (seriesEle) {
			var o = this.options, obj;
			if (seriesEle.markers) {
				$.each(seriesEle.markers, function (i, marker) {
					var dataObj = $(marker.node).data("wijchartDataObj");
					if (dataObj && dataObj.lineSeries && dataObj.lineSeries.markers) {
						if (!dataObj.lineSeries.markers.visible) {
							return true;
						}
					}
					marker.show();
				});
			}

			if (seriesEle.dcl) {
				$.each(seriesEle.dcl, function (i, dcl) {
					if (o.showChartLabels) {
						dcl.show();
					}
				});
			}

			if (seriesEle.path) {
				obj = $(seriesEle.path.node).data("wijchartDataObj");
				if (obj.visible) {
					seriesEle.path.show();
					if (seriesEle.path.shadow) {
						seriesEle.path.shadow.show();
					}
					if (seriesEle.path.area) {
						seriesEle.path.area.show();
					}
					if (seriesEle.path.tracker) {
						seriesEle.path.tracker.show();
					}
				}
			}
		},

		_hideSerieEles: function (seriesEle) {
			if (seriesEle.markers) {
				$.each(seriesEle.markers, function (i, marker) {
					marker.hide();
				});
			}

			if (seriesEle.dcl) {
				$.each(seriesEle.dcl, function (i, dcl) {
					dcl.hide();
				});
			}

			if (seriesEle.path) {
				seriesEle.path.hide();
				if (seriesEle.path.shadow) {
					seriesEle.path.shadow.hide();
				}
				if (seriesEle.path.area) {
					seriesEle.path.area.hide();
				}
				if (seriesEle.path.tracker) {
					seriesEle.path.tracker.hide();
				}
			}
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
						if (chartSeries.legendEntry &&
								chartSeries.display !== "exclude") {
							if (chartSeries.markers && chartSeries.markers.visible) {
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
								type = chartSeries.markers.type;
								if (!type) {
									type = "circle";
								}
								dot = self.canvas.paintMarker(type, x, y, 3);
								$.wijraphael.addClass($(dot.node), 
									"chart-legend-dot wijchart-legend");
								dot.attr(markerStyle);
								$(dot.node).data("index", i)
									.data("legendIndex", idx);
								self.legendDots.push(dot);
							}
							idx++;
						}
					}
				} else {
					for (i = chartsSeries.length - 1; i >= 0; i--) {
						chartSeries = chartsSeries[i];
						chartSeriesStyle = chartsSeriesStyles[i];
						if (chartSeries.legendEntry &&
								chartSeries.display !== "exclude") {
							if (chartSeries.markers && chartSeries.markers.visible) {
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
								type = chartSeries.markers.type;
								if (!type) {
									type = "circle";
								}
								dot = self.canvas.paintMarker(type, x, y, 3);
								$.wijraphael.addClass($(dot.node),
									"chart-legend-dot wijchart-canvas-object" + 
									" wijchart-legend");
								dot.attr(markerStyle);
								$(dot.node).data("index", i)
									.data("legendIndex", idx);
								self.legendDots.push(dot);
							}
							idx++;
						}
					}
				}
			}
		},

		_mouseDown: function (e, args) {
			$.wijmo.wijchartcore.prototype._mouseDown.apply(this, arguments);
		},

		_mouseUp: function (e, args) {
			$.wijmo.wijchartcore.prototype._mouseUp.apply(this, arguments);
		},

		_mouseOver: function (e, lineSeries) {
			var self = this;

			if (!lineSeries || lineSeries.type !== "line") {
				return;
			}

			$.wijmo.wijchartcore.prototype._mouseOver.apply(this, arguments);

			if (lineSeries.path.removed) {
				return;
			}
			if (self.hoverLine !== lineSeries) {
				self.isNewLine = true;
				if (self.hoverLine) {
					if (!self.hoverLine.path.removed) {
						self.hoverLine.path.wijAttr(self.hoverLine.lineStyle);
						if (self.hoverPoint && !self.hoverPoint.isSymbol) {
							self.hoverPoint.marker.wijAttr(self.hoverPoint.markerStyle);
							self.hoverPoint.marker.transform("s1");
						}
					}
				}

				if (lineSeries.lineHoverStyle) {
					lineSeries.path.wijAttr(lineSeries.lineHoverStyle);
				}

				self.hoverLine = lineSeries;
				self.hoverPoint = null;
				self.hoverVirtualPoint = null;
			}
		},

		_mouseOut: function (e, args) {
			$.wijmo.wijchartcore.prototype._mouseOut.apply(this, arguments);
		},

		_mouseMove: function (e, args) {
			$.wijmo.wijchartcore.prototype._mouseMove.apply(this, arguments);
		},

		_click: function (e, args) {
			$.wijmo.wijchartcore.prototype._click.apply(this, arguments);
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
				distance = 0;

			if (tooltip) {
				op = tooltip.getOptions();
			}
			if (self.hoverLine) {
				if (self.isNewLine) {
					if (hint.enable && tooltip) {
						tooltip.hide();
					}
					self.isNewLine = false;
				}
				markers = self.hoverLine.lineMarkers;
				virtualMarkers = self.hoverLine.virtualMarkers;
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
									lineIndex: self.hoverLine.index,
									x: valueX,
									y: valueY,
									//label: dataObj.lineSeries.label,
									label: self.hoverLine.label,
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
									lineIndex: self.hoverLine.index,
									x: valueX,
									y: valueY,
									//label: dataObj.lineSeries.label,
									label: self.hoverLine.label,
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

		_paintPlotArea: function () {
			var self = this,
				o = self.options,
				opt;

			if (!self.aniPathsAttr) {
				self.aniPathsAttr = [];
			}

			opt = {
				bounds: self.canvasBounds,
				widgetName: self.widgetName,
				canvas: self.canvas,
				tooltip: self.tooltip,
				stacked: o.stacked,
				hole: o.hole,
				type: o.type,
				axis: o.axis,
				animation: o.animation,
				seriesTransition: o.seriesTransition,
				seriesList: o.seriesList,
				seriesStyles: o.seriesStyles,
				seriesHoverStyles: o.seriesHoverStyles,
				showChartLabels: o.showChartLabels,
				chartLabelStyle: o.chartLabelStyle,
				chartLabelFormatString: o.chartLabelFormatString,
				isXTime: self.axisInfo.x.isTime,
				isYTime: self.axisInfo.y.isTime ||
					self.axisInfo.y[0].isTime,
				//isYTime: self.axisInfo.y.isTime,
				disabled: o.disabled,
				hint: o.hint,
				aniPathsAttr: self.aniPathsAttr,
				chartLabelEles: self.chartLabelEles,
				mouseDown: $.proxy(self._mouseDown, self),
				mouseUp: $.proxy(self._mouseUp, self),
				mouseOver: $.proxy(self._mouseOver, self),
				mouseOut: $.proxy(self._mouseOut, self),
				mouseMove: $.proxy(self._mouseMove, self),
				click: $.proxy(self._click, self)
			};

			self.chartElement.wijline(opt);
		}

	});

} (jQuery));

(function ($) {
	"use strict";
	if (!window.Raphael) {
		return;
	}
	
	$.wijchart._line = function (element, options) {
		var self = this,
			cBounds = options.bounds,
			widgetName = options.widgetName,
			canvas = options.canvas,
			ani = options.animation,
			seTrans = options.seriesTransition,
			hint = options.hint,
			tooltip = options.tooltip,
			mouseDown = options.mouseDown,
			mouseUp = options.mouseUp,
			mouseOver = options.mouseOver,
			mouseOut = options.mouseOut,
			mouseMove = options.mouseMove,
			click = options.click,
			markersSet = [],
			symbols = [],
			linesStyle = [],
			paths = [],
			shadowPaths = [],
			disabled = options.disabled,
			animationSet = canvas.set(),
			fieldsAniPathAttr = options.aniPathsAttr,
			aniPathsAttr = [],
			chartEles,
			fields = element.data("fields") || {},
			seriesEles = [];
			
		self.render(options, aniPathsAttr, fieldsAniPathAttr, paths, 
			shadowPaths, markersSet, animationSet, symbols, linesStyle, seriesEles);
			
		if (ani.enabled || seTrans.enabled) {
			self.playAnimation(ani, seTrans, animationSet, cBounds, 
				paths, fieldsAniPathAttr);
		}
		fieldsAniPathAttr.length = 0;
		$.each(aniPathsAttr, function (idx, aniPathAttr) {
			fieldsAniPathAttr.push(aniPathAttr);
		});

		self.unbindLiveEvents(element, widgetName);
		self.bindLiveEvents(element, canvas, cBounds, widgetName, mouseDown, 
			mouseUp, mouseOver, mouseOut, mouseMove, click, 
			disabled, hint, linesStyle, tooltip);
		chartEles = {
			paths: paths,
			shadowPaths: shadowPaths,
			markersSet: markersSet,
			animationSet: animationSet,
			symbols: symbols
		};
		//element.data("fields", {chartElements: chartEles});
		if (!fields.chartElements) {
			fields.chartElements = {};
		}

		fields.seriesEles = seriesEles;

		$.extend(true, fields.chartElements, chartEles);
		element.data("fields", fields);
	};
	
	$.wijchart._line.prototype.playAnimation = function (ani, seTrans, 
			animationSet, cBounds, paths, fieldsAniPathAttr) {
		var self = this,
			duration = ani.duration,
			easing = ani.easing;
		if (ani.direction === "horizontal") {
			if (fieldsAniPathAttr && fieldsAniPathAttr.length && 
					seTrans.enabled) {
				duration = seTrans.duration;
				easing = seTrans.easing;
			}
			self.playHAnimation(duration, easing, animationSet, cBounds);
		} else {
			$.each(paths, function (idx, path) {
				if (typeof path === "undefined" || path === null) {
					return true;
				}
				if (fieldsAniPathAttr && fieldsAniPathAttr.length && 
						seTrans.enabled) {
					duration = seTrans.duration;
					easing = seTrans.easing;
					self.playVAnimation(path, fieldsAniPathAttr, idx, 
						duration, easing);
				} else {
					if (path.straight) {
						self.playVStraightAnimation(path, duration, easing);
					}
				}
			});
		}
	};
	
	$.wijchart._line.prototype.playVAnimation = function (path, 
			fieldsAniPathAttr, idx, duration, easing) {
		var aniPathAttr,
			diffAttr;
			//visible = path.attr("visible");
		if (path.shadow) {
			path.shadow.hide();
		}
		if (path.tracker) {
			path.tracker.hide();
		}
		aniPathAttr = fieldsAniPathAttr[idx];
		diffAttr = $.wijchart.getDiffAttrs(aniPathAttr.path, 
			path.attr());
		if (!$.isEmptyObject(diffAttr)) {
			path.attr(aniPathAttr.path);
			path.wijAnimate(diffAttr, duration, easing, function () {
				if (path.shadow && path.visible !== false) {
					path.shadow.show();
				}
				if (path.tracker) {
					path.tracker.show();
				}
			});
		}
		$.each(path.markers, function (i, marker) {
			var diffMarkerAttr = 
				$.wijchart.getDiffAttrs(aniPathAttr.markers[i], 
					marker.attr());
			if (!$.isEmptyObject(diffMarkerAttr)) {
				marker.attr(aniPathAttr.markers[i]);
				marker.wijAnimate(diffMarkerAttr, duration, easing);
			}
		});
		if (path.labels) {
			$.each(path.labels, function (i, label) {
				var diffLabelAttr = 
					$.wijchart.getDiffAttrs(aniPathAttr.labels[i], 
						label.attr()),
					labelAttr = aniPathAttr.labels[i];
				if (labelAttr && labelAttr.text) {
					delete labelAttr.text;
				}
				if (!$.isEmptyObject(diffLabelAttr)) {
					label.attr(labelAttr);
					label.wijAnimate(diffLabelAttr, duration, easing);
				}
			});
		}
		if (path.area) {
			diffAttr = $.wijchart.getDiffAttrs(aniPathAttr.area, 
				path.area.attr());
			if (!$.isEmptyObject(diffAttr)) {
				path.area.attr(aniPathAttr.area);
				path.area.wijAnimate(diffAttr, duration, easing);
			}
		}
	};
	
	$.wijchart._line.prototype.playVStraightAnimation = function (path, 
			duration, easing) {
		var aniPathAttr,
			diffPath,
			area;
		if (path.shadow) {
			path.shadow.hide();
		}
		if (path.tracker) {
			path.tracker.hide();
		}
		
		aniPathAttr = path.straight;
		diffPath = path.attr().path;
		path.attr({path: aniPathAttr});
		path.wijAnimate({path: diffPath}, duration, easing, function () {
			if (path.shadow && path.visible !== false) {
				path.shadow.show();
			}
			if (path.tracker) {
				path.tracker.show();
			}
		});
		$.each(path.markers, function (i, marker) {
			if (marker.straight) {
				var cy = marker.attr().cy;
				marker.attr({cy: marker.straight});
				marker.wijAnimate({cy: cy}, duration, easing);
			}
		});
		if (path.area) {
			area = path.area;
			aniPathAttr = area.straight;
			diffPath = area.attr().path;
			area.attr({
				path: aniPathAttr
			});
			area.wijAnimate({
				path: diffPath
			}, duration, easing);
		}
	};
	
	$.wijchart._line.prototype.playHAnimation = function (duration, easing, 
			animationSet, cBounds) {
		var width = cBounds.endX - cBounds.startX + 20,
			height = cBounds.endY - cBounds.startY + 20;
		animationSet.wijAttr("clip-rect", (cBounds.startX - 10) +
				" " + (cBounds.startY - 10) + " 0 " + height);
		animationSet.wijAnimate({"clip-rect": (cBounds.startX - 10) +
				" " + (cBounds.startY - 10) + " " + width + " " + height},
				duration, easing, function () {
				if (Raphael.vml) {
					//delete clip-rect's div in vml
					var attrs = null, 
						//group = null, 
						clipRect = null,
						node = this.node;
					if (node && node.clipRect) {
						attrs = this.attrs;
						delete attrs["clip-rect"];
						//if (!attrs.src || !attrs.src.length) {
						//}
						node.clipRect = null;
						//group = $(node).parent();
						//clipRect = group.parent();
						clipRect = $(node).parent();
						clipRect.before(node);
						clipRect.remove();
						this.attr(attrs);
						//Add comments to fix tfs issue 19385
						if (attrs.src && attrs.src.length) {
							this.attr({"src": attrs.src});
						}
						//end comments.
					}
				}
			});
	};
	
	$.wijchart._line.prototype.render = function (options, aniPathsAttr, 
			fieldsAniPathAttr, paths, shadowPaths, markersSet, animationSet, 
			symbols, linesStyle, seriesEles) {
		var self = this,
			cBounds = options.bounds,
			canvas = options.canvas,
			stacked = options.stacked,
			hole = options.hole,
			type = options.type,
			axis = options.axis,
			ani = options.animation,
			seTrans = options.seriesTransition,
			needAnimated = false,
			linesSeries = options.seriesList,
			linesSeriesStyles = options.seriesStyles,
			linesHoverStyles = options.seriesHoverStyles,
			showChartLabels = options.showChartLabels,
			chartLabelStyle = options.chartLabelStyle,
			chartLabelFormatString = options.chartLabelFormatString,
			isXTime = options.isXTime,
			isYTime = options.isYTime,
			chartLabelEles = options.chartLabelEles,
			defaultChartLabels,
			firstYPoint,
			lastYPoint,
			fitType,
			valuesX,
			valuesY,
			lastValuesY = [],
			lastPathAttr = [],
			valX,
			pathArr,
			markers,
			paintSymbol,
			valsY;
			
		$.each(linesSeries, function (k, lineSeries) {
			var aniMarkersAttr = [],
				aniLabelsAttr = [],
				initAniPath = [],
				lineData,
				lineStyle,
				lineHoverStyle,
				lineMarkerStyle,
				lineMarkerHoverStyle,
				lineSeriesStyle,
				virtualMarkers = [];

			if (lineSeries.display === "exclude") {
				return true;
			}
			lineSeriesStyle = linesSeriesStyles[k];
			//set default value of line series
			lineSeries = $.extend(true, {
				display: "show",
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
				"stroke-linejoin": "round",
				"stroke-linecap": "round"
			}, lineSeriesStyle);
			lineMarkerStyle = lineSeries.markerStyle;
			lineMarkerStyle = $.extend({
				fill: lineStyle.stroke,
				stroke: lineStyle.stroke,
				//Add comments by RyanWu@20110706.
				//I can't add transform: "s1" here, because if so,
				//The marker will be disapperaed after animation played
				//in browsers which support vml(ie6/7/8).  I don't know
				//why.  So I use the transform("s1") method to recover the 
				//original state of the marker after mouse out.
				//transform: "s1",
				//end by RyanWu@20110706.
				opacity: 1,
				width: 3
			}, lineMarkerStyle);
			lineHoverStyle = linesHoverStyles[k];
			lineMarkerHoverStyle = $.extend(true, {},
				lineHoverStyle, {
					//scale: "1.5 1.5",
					transform: "s1.5",
					"stroke-width": 1
				}, linesSeries.markerHoverStyle);

			valuesX = [].concat(lineData.x);
			valuesY = [].concat(lineData.y);

			// Lines and markers:
			markers = canvas.set();
			pathArr = [];
			fitType = lineSeries.fitType;
			paintSymbol = false;
			if (lineSeries.markers.symbol && lineSeries.markers.symbol.length) {
				paintSymbol = true;
			}
			defaultChartLabels = canvas.set();
			
			if (!fieldsAniPathAttr || fieldsAniPathAttr.length === 0 || 
					(ani.enabled && !seTrans.enabled)) {
				needAnimated = true;
			}
			if (needAnimated) {
				if (valuesY.length > 0) {
					firstYPoint = $.wijchart.getFirstValidListValue(valuesY);
					if (isYTime) {
						firstYPoint = $.toOADate(firstYPoint);
					}
					lastYPoint = $.wijchart.getLastValidListValue(valuesY);
					if (isYTime) {
						lastYPoint = $.toOADate(lastYPoint);
					}
				}
			}

			valsY = self.processYValues(valuesY, lineSeries.display, hole, 
				stacked, lastValuesY);
			$.each(valuesY, function (j, valY) {
				valX = valuesX[j];
				if (isXTime) {
					valX = $.toOADate(valX);
				}
				valY = valuesY[j];
				if (valsY[j].isHole) {
					if (lineSeries.display === "excludeHole") {
						return true;
					}
					if (!valsY[j].isValue) {
						return true;
					}
				}
				if (isYTime) {
					valY = $.toOADate(valY);
				}
				if (valX === undefined) {
					return false;
				}
				pathArr = self.renderPoint(cBounds, canvas, 
					initAniPath, pathArr, markers, aniMarkersAttr, animationSet, 
					defaultChartLabels, aniLabelsAttr, chartLabelEles,
					chartLabelFormatString, needAnimated, firstYPoint, 
					lastYPoint, valX, valY, lineData.y[j], axis, fitType, isXTime, 
					isYTime, j, lineMarkerStyle, lineMarkerHoverStyle, lineSeries, 
					paintSymbol, showChartLabels, symbols, valuesX, valuesY, valsY, 
					lineSeries.display, stacked, virtualMarkers);
			});
			
			self.renderPath(canvas, cBounds, lineSeries, paths, shadowPaths, linesStyle, 
				lineHoverStyle, lineMarkerStyle, lineMarkerHoverStyle, markers, 
				markersSet, animationSet, pathArr, aniPathsAttr, initAniPath, 
				lineStyle, chartLabelStyle, aniMarkersAttr, aniLabelsAttr, 
				defaultChartLabels, k, type, lastPathAttr, stacked, virtualMarkers);

			seriesEles.push({markers: markers, path: paths[paths.length - 1],
				shadowPath: shadowPaths[shadowPaths.length - 1],
				dcl: defaultChartLabels});
		});
		$.each(paths, function (idx, path) {
			if (path.tracker) {
				path.tracker.toFront();
			}
		});
	};
	
	$.wijchart._line.prototype.renderPath = function (canvas, bounds, lineSeries, paths, 
			shadowPaths, linesStyle, lineHoverStyle, lineMarkerStyle, 
			lineMarkerHoverStyle, markers, markersSet, animationSet, pathArr, 
			aniPathsAttr, initAniPath, lineStyle, chartLabelStyle, aniMarkersAttr, 
			aniLabelsAttr, defaultChartLabels, pathIdx, type, lastPathAttr, stacked,
			virtualMarkers) {
		var path,
			fill,
			opacity,
			area,
			startX,
			endX,
			tracker,
			trackerWidth,
			labelStyle,
			prevPathArr,
			prevPath,
			currentPathArr,
			idx;
		path = canvas.path(pathArr.join(" "));
		path.straight = initAniPath.join(" ");
		//shadow
		$.wijchart.paintShadow(path);
		if (pathIdx === 0) {
			lastPathAttr.length = 0;
			if (pathArr.length > 1) {
				startX = pathArr[1];
				endX = pathArr[pathArr.length - 2];
			} else {
				startX = bounds.startX;
				endX = bounds.endX;
			}
			$.merge(lastPathAttr, ["L", startX, bounds.endY, "L", endX, bounds.endY]);
		}

		tracker = canvas.path(pathArr.join(" "));
		path.tracker = tracker;
		if (lineStyle["stroke-width"]) {
			trackerWidth = 10 + parseFloat(lineStyle["stroke-width"]);
		} else {
			trackerWidth = 10;
		}
		tracker.attr({
			"stroke-width": trackerWidth,
			stroke: "#C0C0C0",
			opacity: 0.01
		});
		$.wijraphael.addClass($(tracker.node), 
			"wijchart-canvas-object wijlinechart linetracker");
		$(tracker.node).data("owner", $(path.node));
		
		if (type === "area") {
			if (lineStyle.fill && lineStyle.fill !== "none") {
				fill = lineStyle.fill;
				delete lineStyle.fill;
			} else {
				fill = lineStyle.stroke;
			}
			
			opacity = 0.5;
			/*
			if (lineStyle.opacity) {
				opacity = lineStyle.opacity;
				delete lineStyle.opacity;
			} else {
				opacity = 0.5;
			}
			*/
			path.wijAttr(lineStyle);
			
			if (pathArr.length > 1) {
				startX = pathArr[1];
			} else {
				startX = bounds.startX;
			}
			if (stacked) {
				if (pathIdx > 0) {
					prevPathArr = Raphael.parsePathString(
						paths[pathIdx - 1].attr("path"));
					if (prevPathArr.length > 0) {
						for (idx = prevPathArr.length - 1; idx >= 0; idx--) {
							prevPath = prevPathArr[idx];
							if (prevPath.length === 3) {
								pathArr.push("L");
								pathArr.push(prevPath[1]);
								pathArr.push(prevPath[2]);
							}
						}
						pathArr.push("Z");
					}
				}
				else {
					pathArr.push("V");
					pathArr.push(bounds.endY);
					pathArr.push("H");
					pathArr.push(startX);
					pathArr.push("Z");
				}
			} else {
				currentPathArr = Raphael.parsePathString(path.attr("path"));
				if (currentPathArr.length > 0) {
					pathArr = [];
					$.each(currentPathArr, function (i, currentPath) {
						$.each(currentPath, function (j, val) {
							pathArr.push(val);
						});
						if (currentPath[0] === "M") {
							startX = currentPath[1];
						}
						if (i < currentPathArr.length - 1 && 
								currentPathArr[i + 1][0] === "M") {
							pathArr.push("V");
							pathArr.push(bounds.endY);
							pathArr.push("H");
							pathArr.push(startX);
							pathArr.push("Z");
						}
						if (i === currentPathArr.length - 1) {
							pathArr.push("V");
							pathArr.push(bounds.endY);
							pathArr.push("H");
							pathArr.push(startX);
							pathArr.push("Z");
						}
					});
				}
			}
			area = canvas.path(pathArr.join(" "));
			$.wijraphael.addClass($(area.node), "wijlinechart-area");
			area.wijAttr({
				fill: fill,
				opacity: opacity,
				stroke: "none"
			});
			
			initAniPath.push("V");
			initAniPath.push(bounds.endY);
			initAniPath.push("H");
			initAniPath.push(startX);
			initAniPath.push("Z");
			area.straight = initAniPath.join(" ");
			//area.toBack();
			
			path.area = area;
			animationSet.push(area);

			aniPathsAttr.push({
				path: $.extend(true, {}, path.attr()),
				area: $.extend(true, {}, area.attr()),
				markers: aniMarkersAttr,
				labels: aniLabelsAttr
			});
		} else {
			path.wijAttr(lineStyle);

			aniPathsAttr.push({
				path: $.extend(true, {}, path.attr()),
				markers: aniMarkersAttr,
				labels: aniLabelsAttr
			});
		}
		
		path.markers = markers;
		
		paths.push(path);
		if (path.shadow) {
			shadowPaths[pathIdx] = path.shadow;
		}

		animationSet.push(path);
	
		linesStyle[pathIdx] = {
			lineStyle: lineStyle,
			lineHoverStyle: lineHoverStyle,
			markerStyle: lineMarkerStyle,
			markerHoverStyle: lineMarkerHoverStyle
		};

		if (!lineSeries.markers.visible || lineSeries.display === "hide") {
			markers.hide();
		}
		if (!lineSeries.visible || lineSeries.display === "hide") {
			path.hide();
		
			if (path.shadow) {
				path.shadow.hide();
			}
			if (path.area) {
				path.area.hide();
			}
			path.visible = false;
		}

		if (lineSeries.markers.style) {
			markers.attr(lineSeries.markers.style);
		}
		markers.toFront();
		if (defaultChartLabels.length) {
			labelStyle = $.extend(true, {}, chartLabelStyle);
			if (lineSeries.textStyle) {
				labelStyle = $.extend(true, labelStyle, 
					lineSeries.textStyle);
			}
			defaultChartLabels.attr(labelStyle);
			//defaultChartLabels.attr(chartLabelStyle);
			defaultChartLabels.toFront();
			path.labels = defaultChartLabels;
		}
		markersSet[pathIdx] = markers;
		lineSeries.index = pathIdx;
		lineSeries.type = "line";
		lineSeries.path = path;
		lineSeries.lineMarkers = markers;
		lineSeries.lineStyle = lineStyle;
		lineSeries.lineHoverStyle = lineHoverStyle;
		lineSeries.virtualMarkers = virtualMarkers;
		$.wijraphael.addClass($(path.node), "wijchart-canvas-object wijlinechart");
		$(path.node).data("wijchartDataObj", lineSeries);
	};
	
	$.wijchart._line.prototype.renderPoint = function (cBounds, canvas, 
			initAniPath, pathArr, markers, 
			aniMarkersAttr, animationSet, defaultChartLabels, aniLabelsAttr, 
			chartLabelEles, chartLabelFormatString, needAnimated, 
			firstYPoint, lastYPoint, valX, valY, dataY, axis, fitType,
			isXTime, isYTime, pointIdx, lineMarkerStyle, lineMarkerHoverStyle,
			lineSeries, paintSymbol, showChartLabels, symbols, valuesX, valuesY,
			valsY, display, stacked, virtualMarkers) {
		var self = this,
			width = cBounds.endX - cBounds.startX,
			height = cBounds.endY - cBounds.startY,
			minX = axis.x.min,
			minY = axis.y.min,
			maxX = axis.x.max,
			maxY = axis.y.max,
			kx = width / (maxX - minX),
			ky = height / (maxY - minY),
			marker,
			dot,
			val,
			X = 0,
			Y,
			initAniY,
			markerData,
			defaultChartLabel,
			markerVisible = lineSeries.markers.visible;
		if (isNaN(valX) || typeof valX === "string") {
			val = pointIdx;
		} else {
			val = valX;
		}
		X = cBounds.startX + (val - minX) * kx;
		Y = cBounds.endY - (valY - minY) * ky;
		valsY[pointIdx].x = X;
		valsY[pointIdx].y = Y;
		
		if (needAnimated) {
			initAniY = firstYPoint + (lastYPoint - firstYPoint) / 
				(maxX - minX) * (val - minX);
			initAniY = cBounds.endY - (initAniY - minY) * ky;
			
			/*
			if (pointIdx === 0) {
				initAniPath.push("M");
			} else {
				initAniPath.push("L");
			}
			*/
			initAniPath.push(valsY[pointIdx].idx ? "L" : "M");
			initAniPath.push(X);
			initAniPath.push(initAniY);
		}
		
		if (!valsY[pointIdx].isHole) {
			pathArr = self.getPathArrByFitType(pathArr, fitType, pointIdx, 
				valuesY.length, cBounds, valuesX, valuesY, X, Y,  isXTime, isYTime, 
				valX, valY, kx, ky, minX, minY, valsY, display, stacked);
		}
		//pathArr = self.getPathArrByFitType(pathArr, fitType, pointIdx, valuesY.length, 
		//	cBounds, valuesX, valuesY, X, Y,  isXTime, isYTime, 
		//	valX, valY, kx, ky, minX, minY);

		if (showChartLabels) {
			defaultChartLabel = self.renderChartLabel(canvas, isYTime, valY, 
				chartLabelFormatString, X, Y);
			chartLabelEles.push(defaultChartLabel);
			defaultChartLabels.push(defaultChartLabel);
			aniLabelsAttr.push($.extend(true, {}, defaultChartLabel.attr()));
		}
	
		if (markerVisible) {
			marker = self.renderMarker(canvas, symbols, paintSymbol, lineSeries.markers, 
					pointIdx, X, Y, lineMarkerStyle);
			dot = marker.dot;
			
			if (needAnimated) {
				dot.straight = initAniY;
			}
		}
		
		markerData = {};
		markerData.valX = valuesX[pointIdx];
		markerData.valY = dataY;
		markerData.index = pointIdx;
		markerData.type = "marker";
		markerData.lineSeries = lineSeries;
		markerData.x = X;
		markerData.y = Y;
		markerData.markerStyle = lineMarkerStyle;
		markerData.markerHoverStyle = lineMarkerHoverStyle;

		if (markerVisible) {
			markerData.marker = dot;
			markerData.isSymbol = marker.isSymbol;
			$(dot.node).data("wijchartDataObj", markerData);
			markers.push(dot);
		
			aniMarkersAttr.push($.extend(true, {}, dot.attr()));
			animationSet.push(dot);
		}
		
		virtualMarkers.push(markerData);
		
		return pathArr;
	};
	
	$.wijchart._line.prototype.processYValues = function (values, 
			display, hole, stacked, lastValues) {
		var vals = [],
			idx = 0,
			firstYIdx = 0;
		$.each(values, function (i, value) {
			if (!idx) {
				firstYIdx = i;
			}
			var val = {
					isHole: false,
					isValue: true,
					idx: idx,
					firstYIdx: firstYIdx,
					x: 0,
					y: 0
				};
			idx++;
			
			if ($.wijchart.isHole(value, hole)) {
				if (stacked) {
					values[i] = 0;
				} else {
					val.isHole = true;
					if (display === "excludeHole") {
						idx--;
						val.idx = 0;
					} else {
						idx = 0;
						val.idx = 0;
					}
					if (!$.wijchart.isHole(hole) && value === hole) {
						val.isValue = true;
					} else {
						val.isValue = false;
					}
				}
			}
			vals.push(val);
			if (stacked && i < lastValues.length) {
				values[i] += lastValues[i];
			}
		});
		lastValues.length = 0;
		$.merge(lastValues, values);
		return vals;
	};
	
	$.wijchart._line.prototype.renderMarker = function (canvas, symbols, paintSymbol, 
			markers, markerIdx, X, Y, lineMarkerStyle) {
		var symbs,
			dot = null,
			isSymbol = false,
			markerType,
			markerWidth;
		if (paintSymbol) {
			symbs = markers.symbol;
			$.each(symbs, function (idx, symbol) {
				if (symbol.index === markerIdx) {
					dot = canvas.image(symbol.url, X - symbol.width / 2,
						Y - symbol.height / 2, symbol.width, symbol.height);
					symbols.push(dot);
					isSymbol = true;
					return false;
				}
			});
		
		}
		if (dot === null) {
			markerType = markers.type;
			markerWidth = lineMarkerStyle.width;
			dot = canvas.paintMarker(markerType, X, Y, markerWidth);
			if (markers.visible) {
				dot.attr(lineMarkerStyle);
			}
		}
	
		$.wijraphael.addClass($(dot.node), 
			"wijchart-canvas-object wijlinechart wijchart-canvas-marker");
		return {
			dot: dot,
			isSymbol: isSymbol
		};
	};
	
	$.wijchart._line.prototype.renderChartLabel = function (canvas, isYTime, valY, 
			chartLabelFormatString, X, Y) {
		var labelText,
			defaultChartLabel,
			dclBox;
		//Add comments by RyanWu@20110707.
		//For supporting date time value on y axi.
		//labelText = valY;
		labelText = isYTime ? $.fromOADate(valY) : valY;
		//end by RyanWu@20110707.

		if (chartLabelFormatString && chartLabelFormatString.length) {
			//labelText = $.format(labelText, o.chartLabelFormatString);
			labelText = Globalize.format(labelText, chartLabelFormatString);
		}
		defaultChartLabel = canvas.text(X, Y, labelText);
		$.wijraphael.addClass($(defaultChartLabel.node), "wijlinechart-label");
		dclBox = defaultChartLabel.wijGetBBox();
		//defaultChartLabel.translate(0, -dclBox.height);
		defaultChartLabel.transform(Raphael.format("...T{0},{1}", 0, -dclBox.height));
		return defaultChartLabel;
	};
	
	$.wijchart._line.prototype.getAnchors = function (p1x, p1y, p2x, p2y, p3x, p3y) {
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
	};
	
	$.wijchart._line.prototype.getPathArrByFitType = function (pathArr, 
			fitType, idx, len, cBounds, valuesX, valuesY, X, Y, 
			isXTime, isYTime, valX, valY, kx, ky, minX, minY, valsY, display,
			stacked) {
		var self = this,
			valY2 = null,
			Y0 = 0, 
			Y2 = 0, 
			X0 = 0, 
			X2 = 0,
			valX2 = null, 
			a = null,
			valueY = valsY[idx],
			isNextPointHole = false,
			index = valueY.idx,
			i,
			prevIdx = idx - 1,
			nextIdx = idx + 1;
		if (display === "excludeHole" && !stacked) {
			if (idx > 0 && idx < len - 1) {
				nextIdx = -1;
				prevIdx = -1;
				for (i = idx + 1; i < len; i++) {
					isNextPointHole = true;
					if (valsY[i].isHole) {
						continue;
					}
					nextIdx = i;
					isNextPointHole = false;
					break;
				}
				for (i = idx - 1; i >= 0; i--) {
					if (valsY[i].isHole) {
						continue;
					}
					prevIdx = i;
					break;
				}
				if (prevIdx > -1) {
					X0 = valsY[prevIdx].x;
					Y0 = valsY[prevIdx].y;
				}
			}
		} else {
			if (idx < len - 1) {
				isNextPointHole = valsY[nextIdx].isHole;
			}
			if (idx > 0 && idx < len - 1) {
				X0 = valsY[prevIdx].x;
				Y0 = valsY[prevIdx].y;
			}
		}
		if (stacked) {
			fitType = "line";
		}
		if (fitType === "line") {
			//pathArr = pathArr.concat([idx ? "L" : "M", X, Y]);
			pathArr = pathArr.concat([index ? "L" : "M", X, Y]);
		} else if (fitType === "spline") {
			//if (!idx) {
			if (!index) {
				if (idx === len - 1) {
					pathArr = pathArr.concat(["M", X, Y]);
				} else if (isNextPointHole) {
					pathArr = pathArr.concat(["M", X, Y]);
				} else {
					pathArr = pathArr.concat(["M", X, Y, "C", X, Y]);
				}
				//pathArr = ["M", X, Y, "C", X, Y];
			//} else if (idx && idx < len - 1) {
			} else if (index && idx < len - 1 && !isNextPointHole) {
				valY2 = valuesY[nextIdx];
				if (isYTime) {
					valY2 = $.toOADate(valY2);
				}
				Y2 = cBounds.endY - (valY2 - minY) * ky;
				if (isNaN(valX) || typeof valX ===  "string") {
					X2 = cBounds.startX + (nextIdx - minX) * kx;
				} else {
					valX2 = valuesX[nextIdx];
					if (isXTime) {
						valX2 = $.toOADate(valX2);
					}
					X2 = cBounds.startX + (valX2 - minX) * kx;
				}
				a = self.getAnchors(X0, Y0, X, Y, X2, Y2);
				pathArr = pathArr.concat([a.x1, a.y1, X, Y, a.x2, a.y2]);
				/*
				valY0 = valuesY[idx - 1];
				valY2 = valuesY[idx + 1];
				if (isYTime) {
					valY0 = $.toOADate(valY0);
					valY2 = $.toOADate(valY2);
				}
				Y0 = cBounds.endY - (valY0 - minY) * ky;
				Y2 = cBounds.endY - (valY2 - minY) * ky;
				if (isNaN(valX) || typeof valX === "string") {
					X0 = cBounds.startX + (idx - 1 - minX) * kx;
					X2 = cBounds.startX + (idx + 1 - minX) * kx;
				} else {
					valX0 = valuesX[idx - 1];
					valX2 = valuesX[idx + 1];
					if (isXTime) {
						valX0 = $.toOADate(valX0);
						valX2 = $.toOADate(valX2);
					}
					X0 = cBounds.startX + (valX0 - minX) * kx;
					X2 = cBounds.startX + (valX2 - minX) * kx;
				}
				a = self.getAnchors(X0, Y0, X, Y, X2, Y2);
				pathArr = pathArr.concat([a.x1, a.y1, X, Y, a.x2, a.y2]);
				*/
			} else {
				pathArr = pathArr.concat([X, Y, X, Y]);
			}
		} else if (fitType === "bezier") {
			//if (!idx) {
			if (!index) {
				pathArr = pathArr.concat(["M", X, Y]);
			//} else if (idx === len - 1 && idx % 2 === 1) {
			} else if ((idx < len - 1 && valsY[idx + 1].isHole && index % 2 === 1) ||
					(idx === len - 1 && index % 2 === 1)) {
				pathArr = pathArr.concat(["Q", X, Y, X, Y]);
			} else {
				//if (idx % 2 === 0) {
				if (index % 2 === 0) {
					pathArr = pathArr.concat([X, Y]);
				} else {
					pathArr = pathArr.concat(["Q", X, Y]);
				}
			}
		}
		return pathArr;
	};
	
	$.wijchart._line.prototype.bindLiveEvents = function (element, canvas, 
			cBounds, widgetName, mouseDown, mouseUp, mouseOver,
			mouseOut, mouseMove, click, disabled, hint, linesStyle, tooltip) {
		var //tip = tooltip,
			//isNewLine = false,
			//hoverLine,
			//hoverPoint,
			proxyObj = {
				element: element,
				mousedown: function (e) {
					if (disabled) {
						return;
					}
				
					var tar = $(e.target),
						data,
						lineSeries = null;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							mouseDown.call(element, e, lineSeries);
						} else {
							mouseDown.call(element, e, data);
						}
					} else {
						mouseDown.call(element, e, data);
					}
				},
				mouseup: function (e) {
					if (disabled) {
						return;
					}

					var tar = $(e.target),
						data,
						lineSeries = null;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							mouseUp.call(element, e, lineSeries);
						} else {
							mouseUp.call(element, e, data);
						}
					} else {
						mouseUp.call(element, e, data);
					}
				},
				mouseover: function (e) {
					if (disabled) {
						return;
					}

					var tar = $(e.target),
						data,
						lineSeries = null; 
						//style = null,
						//idx = 0;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							mouseOver.call(element, e, lineSeries);
						} else {
							mouseOver.call(element, e, data);
						}
						/*
						//for tooltip 
						if (hoverLine !== lineSeries) {
							isNewLine = true;
							if (hoverLine) {
								idx = hoverLine.index;
								style = linesStyle[idx];
								
								hoverLine.path.wijAttr(style.lineStyle);
								if (hoverPoint && !hoverPoint.isSymbol) {
									hoverPoint.marker.wijAttr(style.markerStyle);
									//hoverPoint.marker.scale(1, 1);
									hoverPoint.marker.transform("s1");
								}
							}
						
							idx = lineSeries.index;
							style = linesStyle[idx];

							if (style && style.lineHoverStyle) {
								lineSeries.path.wijAttr(style.lineHoverStyle);
							}
					
							hoverLine = lineSeries;
							hoverPoint = null;
						}
						*/
					} else {
						mouseOver.call(element, e, data);
						/*
						//for tooltip 
						if (!data || data.type !== "line") {
							return;
						}
						if (hoverLine !== data) {
							isNewLine = true;
							if (hoverLine) {
								idx = hoverLine.index;
								style = linesStyle[idx];
								
								hoverLine.path.wijAttr(style.lineStyle);
								if (hoverPoint && !hoverPoint.isSymbol) {
									hoverPoint.marker.wijAttr(style.markerStyle);
									//hoverPoint.marker.scale(1, 1);
									hoverPoint.marker.transform("s1");
								}
							}
						
							idx = data.index;

							style = linesStyle[idx];

							if (style && style.lineHoverStyle) {
								data.path.wijAttr(style.lineHoverStyle);
							}
							hoverLine = data;
							hoverPoint = null;
						}
						*/
					}
				},
				mouseout: function (e) {
					if (disabled) {
						return;
					}

					var tar = $(e.target),
						data,
						lineSeries = null;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							mouseOut.call(element, e, lineSeries);
						} else {
							mouseOut.call(element, e, data);
						}
					} else {
						mouseOut.call(element, e, data);
					}
				},
				mousemove: function (e) {
					if (disabled) {
						return;
					}

					var tar = $(e.target),
						data,
						lineSeries = null;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							mouseMove.call(element, e, lineSeries);
						} else {
							mouseMove.call(element, e, data);
						}
					} else {
						mouseMove.call(element, e, data);
					}
				},
				click: function (e) {
					if (disabled) {
						return;
					}

					var tar = $(e.target),
						data,
						lineSeries = null;
					if (tar.data("owner")) {
						tar = tar.data("owner");
					}
					data = tar.data("wijchartDataObj");
					
					if (tar.hasClass("wijchart-canvas-marker")) {
						lineSeries = data.lineSeries;
						if (!lineSeries.markers.visible) {
							click.call(element, e, lineSeries);
						} else {
							click.call(element, e, data);
						}
					} else {
						click.call(element, e, data);
					}
				}
			};
			//h = null,
			//elePos = element.offset();
		$(".wijlinechart", element[0])
			.live("mousedown." + widgetName,
				$.proxy(proxyObj.mousedown, proxyObj))
			.live("mouseup." + widgetName,
				$.proxy(proxyObj.mouseup, proxyObj))
			.live("mouseover." + widgetName,
				$.proxy(proxyObj.mouseover, proxyObj))
			.live("mouseout." + widgetName,
				$.proxy(proxyObj.mouseout, proxyObj))
			.live("mousemove." + widgetName,
				$.proxy(proxyObj.mousemove, proxyObj))
			.live("click." + widgetName,
				$.proxy(proxyObj.click, proxyObj));

		/*
		if (hint.enable) {
			h = $.extend(true, hint, {
				closeBehavior: "none",
				mouseTrailing: false,
				triggers: "custom",
				compass: hint.compass
			});
			if (!tip) {
				tip = canvas.tooltip(null, h);
			}
		}
		if (tip) {
			tip.setOptions($.extend(true, hint, {
				closeBehavior: "none",
				mouseTrailing: false,
				triggers: "custom"
			}));
		}
	
		element.bind("mousemove", function (e) {
			if (disabled) {
				return;
			}

			elePos = element.offset();
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
				//seriesData = null, 
				s = null,
				dataObj = null, 
				op = null, 
				title = hint.title,
				content = hint.content,
				isTitleFunc = $.isFunction(title),
				isContentFunc = $.isFunction(content);
			
			if (tooltip) {
				op = tooltip.getOptions();
			}

			if (mousePos.left >= cBounds.startX && 
					mousePos.left <= cBounds.endX && 
					mousePos.top >= cBounds.startY && 
					mousePos.top <= cBounds.endY) {
				if (hoverLine) {
					if (isNewLine) {
						if (hint.enable && tooltip) {
							tooltip.hide();
						}
						isNewLine = false;
					}
					markers = hoverLine.lineMarkers;
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
					if (hoverPoint && hoverPoint.index === idx) {
						return;
					}
					if (idx > -1) {
						point = $(markers[idx].node).data("wijchartDataObj");
						
						if (point) {
							index = hoverLine.index;
							style = linesStyle[index];
							if (hoverPoint && !hoverPoint.isSymbol) {
								hoverPoint.marker.wijAttr(style.markerStyle);
								//hoverPoint.marker.scale(1, 1);
								hoverPoint.marker.transform("s1");
							}
							if (!point.isSymbol) {
								point.marker.wijAttr(style.markerHoverStyle);
							}
						}

						hoverPoint = point;
					}
					//if (hint.enable && tooltip) {
					if (tooltip) {
						//seriesData = hoverLine.data;
					
						//if (seriesData.x) {
						//	valueX = seriesData.x[idx];
						//	valueY = seriesData.y[idx];
						//} else {
						//	valueX = seriesData.xy[2 * idx];
						//	valueY = seriesData.xy[2 * idx + 1];
						//}
						dataObj = hoverPoint;
						valueX = dataObj.valX;
						valueY = dataObj.valY;
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
							stroke: hoverLine.path.attr("stroke")
						}, hint.style);
						op.style.stroke = s.stroke;
						tooltip.showAt(p);
					}
				}
			} else {
				if (hint.enable && tooltip) {
					tooltip.hide();
				}
				
				if (hoverLine) {
					idx = hoverLine.index;
					style = linesStyle[idx];
					hoverLine.path.wijAttr(style.lineStyle);
					if (hoverPoint && !hoverPoint.isSymbol) {
						hoverPoint.marker.wijAttr(style.markerStyle);
						//hoverPoint.marker.scale(1, 1);
						hoverPoint.marker.transform("s1");
					}
				}

				hoverLine = null;
				hoverPoint = null;
			}
		});
*/
	};
			
	$.wijchart._line.prototype.unbindLiveEvents = function (element, widgetName) {
		$(".wijlinechart", element[0]).die(widgetName)
		// for jQuery 1.7.1
		.die("." + widgetName);
	};
	
	$.fn.extend({
		wijline: function (options) {
			new $.wijchart._line(this, options);
		}
	});
}(jQuery));
