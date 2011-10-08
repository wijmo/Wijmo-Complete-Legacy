/*globals Raphael,jQuery, window*/
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
 * * Wijmo PieChart widget.
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

	$.widget("wijmo.wijpiechart", $.wijmo.wijchartcore, {
		options: {
			/// <summary>
			/// A value indicates the radius used for a pie chart.
			/// Default: null.
			/// Type: Number.
			/// Code example:
			///  $("#piechart").wijpiechart({
			///      radius: 100
			///  });
			/// </summary>
			/// <remarks>
			/// If the value is null, then the radius will be calculated 
			///	by the width/height value of the pie chart.
			/// </remarks>
			radius: null,
			/// <summary>
			/// A value indicates the inner radius used for doughnut charts.
			/// Default: 0.
			/// Type: Number.
			/// Code example:
			///  $("#piechart").wijpiechart({
			///      innerRadius: 20
			///  });
			/// </summary>
			innerRadius: 0,
			/// <summary>
			/// A value that indicates whether to show animation 
			///	and the duration for the animation.
			/// Default: {enabled:true, duration:400, easing: ">", offset: 10}.
			/// Type: Object.
			/// Code example:
			///  $("#piechart").wijpiechart({
			///      animation: {enabled: true, duration: 1000, offset: 20}
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
				easing: ">",
				/// <summary>
				/// A value that indicates the offset for explode animation.
				/// Default: 10.
				/// Type: Number.
				/// </summary>
				offset: 10
			},
			/// <summary>
			/// A value that indicates whether to show animation 
			///	and the duration for the animation when reload data.
			/// Default: {enabled:true, duration:1000, easing: "bounce"}.
			/// Type: Object.
			/// Code example:
			///  $("#piechart").wijpiechart({
			///      animation: {enabled: true, duration: 2000, easing: ">"}
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
				/// Default: 1000.
				/// Type: Number.
				/// </summary>
				duration: 1000,
				/// <summary>
				/// A value that indicates the easing for the series transition.
				/// Default: "bounce".
				/// Type: string.
				/// </summary>
				easing: "bounce"
			},
			/// <summary>
			/// Occurs when the user clicks a mouse button.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({mouseDown: function(e, data) { } });
			/// Bind to the event by type: wijpiechartmousedown
			/// $("#piechart").bind("wijpiechartmousedown", function(e, data) {} );
			/// <param name="e" type="eventObj">
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains  the series infos of the mousedown sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			mouseDown: null,
			/// <summary>
			/// Occurs when the user releases a mouse button
			/// while the pointer is over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({mouseUp: function(e, data) { } });
			/// Bind to the event by type: wijpiechartmouseup
			/// $("#piechart").bind("wijpiechartmouseup", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseup sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			mouseUp: null,
			/// <summary>
			/// Occurs when the user first places the pointer over the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({mouseOver: function(e, data) { } });
			/// Bind to the event by type: wijpiechartmouseover
			/// $("#piechart").bind("wijpiechartmouseover", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseover sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			mouseOver: null,
			/// <summary>
			/// Occurs when the user moves the pointer off of the chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({mouseOut: function(e, data) { } });
			/// Bind to the event by type: wijpiechartmouseout
			/// $("#piechart").bind("wijpiechartmouseout", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mouseout sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			mouseOut: null,
			/// <summary>
			/// Occurs when the user moves the mouse pointer
			/// while it is over a chart element.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({mouseMove: function(e, data) { } });
			/// Bind to the event by type: wijpiechartmousemove
			/// $("#piechart").bind("wijpiechartmousemove", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the mousemove sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			mouseMove: null,
			/// <summary>
			/// Occurs when the user clicks the chart element. 
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			///  $("#piechart").wijpiechart({click: function(e, data) { } });
			/// Bind to the event by type: wijpiechartclick
			/// $("#piechart").bind("wijpiechartclick", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains all the series infos of the clicked sector. 
			/// data.data: value of the sector.
			/// data.index: index of the sector.
			/// data.label: label of the sector.
			/// data.legendEntry: legend entry of the sector.
			/// data.offset: offset of the sector.
			/// data.style: style of the sector.
			/// type: "pie"
			///	</param>
			click: null
		},

		// widget creation:    
		_create: function () {
			var self = this,
				defFill = [
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
			$.wijmo.wijchartcore.prototype._create.apply(self, arguments);
			self.chartElement.addClass("wijmo-wijpiechart");
			// default some fills
			$.each(this.options.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});
			self.canvas.customAttributes.segment =
				function (x, y, a1, a2, outerR, innerR) {
					var path = null,
						offset = 0.01;
					if (a2 - a1 > 360 - offset) {
						a2 -= offset;
					} else if (a2 - a1 < offset) {
						a2 += offset;
					}
					if (innerR) {
						path = self._donut(x, y, outerR, innerR, a1, a2);
					} else {
						path = self._sector(x, y, outerR, a1, a2);
					}
					return {
						"path": path
					};
				};
		},

		destroy: function () {
			var self = this;
			self.chartElement
				.removeClass("wijmo-wijpiechart ui-helper-reset");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);
			if (self.aniSectors && self.aniSectors.length) {
				$.each(self.aniSectors, function (idx, sector) {
					sector = null;
				});
				self.aniSectors = null;
			}
			if (self.aniLabels && self.aniLabels.length) {
				$.each(self.aniLabels, function (idx, label) {
					label = null;
				});
				self.aniLabels = null;
			}
		},

		_isPieChart: function () {
			return true;
		},

		/*****************************
		Widget specific implementation
		******************************/
		/** public methods */
		getSector: function (index) {
			/// <summary>
			/// Returns the sector of the pie chart with the given index.
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the sector.
			/// </param>
			/// <returns type="Raphael element">
			/// Reference to raphael element object.
			/// </returns>
			return this.sectors[index];
		},
		/** end of public methods */

		/** private methods */
		_getSeriesFromTR: function (theaders, sList, seriesList) {
			var label = null, th = null, tds = null,
				data = null, series = null;
			if (sList.length) {
				sList.each(function () {
					th = $("th", $(this));
					label = $.trim(th.text());
					tds = $("td", $(this));
					if (tds.length) {
						data = parseFloat($.trim($(tds[0]).text()));
					}
					series = {
						label: label,
						legendEntry: true,
						data: data
					};
					seriesList.push(series);
				});
			}
		},

		_paintPlotArea: function () {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds,
				width = canvasBounds.endX - canvasBounds.startX,
				height = canvasBounds.endY - canvasBounds.startY,
				seriesList = o.seriesList,
				seriesStyles = o.seriesStyles,
				seriesHoverStyles = o.seriesHoverStyles,
				total = 0,
				sectors = [],
				tooltipTars = [],
				labels = [],
				angle = 0,
				paper = self.canvas,
				getPositionByAngle = paper.wij.getPositionByAngle,
				r,
				startX,
				startY,
				path,
				attr;

			if (!o.radius) {
				o.radius = Math.min(width, height) / 2;
			} else {
				if (width < 2 * o.radius) {
					o.radius = width / 2;
				}
				if (height < 2 * o.radius) {
					o.radius = height / 2;
				}
			}

			canvasBounds.startX += width / 2 - o.radius;
			canvasBounds.endX = canvasBounds.startX + 2 * o.radius;
			canvasBounds.startY += height / 2 - o.radius;
			canvasBounds.endY = canvasBounds.startY + 2 * o.radius;

			$.each(seriesList, function (idx, series) {
				if (series && typeof (series.data) === "number") {
					total += series.data;
				}
			});

			startX = canvasBounds.startX;
			startY = canvasBounds.startY;
			self.total = total;
			r = o.radius;

			$.each(seriesList, function (idx, series) {
				var seriesStyle = $.extend({
					opacity: 1,
					stroke: "gray",
					"stroke-width": 1
				}, seriesStyles[idx]),
					anglePlus = 360 * series.data / total,
					cx = startX + r,
					cy = startY + r,
					center, sector, label,
					pos, textStyle;

				series = $.extend(true, { offset: 0 }, series);
				if (series.offset) {
					center = getPositionByAngle(cx, cy,
									series.offset, angle + anglePlus / 2);
					cx = center.x;
					cy = center.y;
				}

				path = [cx, cy, angle, angle + anglePlus, r, o.innerRadius].concat(" ");
				if (self.aniSectors && o.seriesTransition.enabled) {
					seriesStyle.segment = path;
					if (idx < self.aniSectors.length) {
						attr = self.aniSectors[idx].attr();
						self.aniSectors[idx].stop();
					} else {
						attr = $.extend(true, {}, seriesStyle);
						attr.segment = [cx, cy, 0, 360, r, o.innerRadius].concat(" ");
					}
					sector = self.canvas.path().attr(attr);
					seriesStyle = self._getDiffAttrs(attr, seriesStyle);
					sector.wijAnimate(seriesStyle, o.seriesTransition.duration,
						o.seriesTransition.easing, function () {
							self._paintShadow(sector);
							delete seriesStyle.segment;
						});
				} else {
					sector = self.canvas.path().attr({ segment: path });
					self._paintShadow(sector);
					sector.wijAttr(seriesStyle);
				}
				sector.angles = { start: angle, end: angle + anglePlus };
				sector.getOffset = function (offset) {
					var pos = getPositionByAngle(cx, cy, offset,
									(sector.angles.start + sector.angles.end) / 2);
					return { x: pos.x - cx, y: pos.y - cy };
				};
				sector.center = { x: cx, y: cy };
				sector.radius = r;
				if (o.innerRadius) {
					sector.innerRadius = o.innerRadius;
				}
				self._addClass($(sector.node), "wijchart-canvas-object");
				$(sector.node).data("wijchartDataObj", series);

				if (o.showChartLabels) {
					pos = getPositionByAngle(cx, cy,
							series.offset + r * 2 / 3, angle + anglePlus / 2);
					textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
					if (series.textStyle) {
						textStyle = $.extend(true, textStyle, series.textStyle);
					}

					if (self.aniLabels && o.seriesTransition.enabled) {
						if (idx < self.aniLabels.length) {
							attr = self.aniLabels[idx].attr();
							self.aniLabels[idx].stop();
							attr.text = series.label;
							label = self.canvas.text(0, 0, "").attr(attr);
							textStyle = self._getDiffAttrs(attr, textStyle);
							textStyle.x = pos.x;
							textStyle.y = pos.y;
							label.wijAnimate(textStyle, o.seriesTransition.duration,
								o.seriesTransition.easing);
						} else {
							label = paper.text(pos.x, pos.y, series.label)
								.attr(textStyle);
						}
					} else {
						label = paper.text(pos.x, pos.y, series.label).attr(textStyle);
					}
					self._addClass($(label.node), "wijchart-canvas-object");
					$(label.node).data("wijchartDataObj", series);
					tooltipTars.push(label);
					labels.push(label);
				}

				sectors.push(sector);
				tooltipTars.push(sector);
				series.style = seriesStyle;
				series.hoverStyle = seriesHoverStyles[idx];
				series.index = idx;
				series.type = "pie";
				angle += anglePlus;
			});

			self.aniSectors = sectors;
			self.aniLabels = labels;

			self.sectors = sectors;
			self.tooltipTars = tooltipTars;
		},

		_paintChartLabels: function () {
			var self = this,
				o = self.options,
				chartLabels = o.chartLabels,
				angle = 0,
				r = o.radius;

			if (!chartLabels || !chartLabels.length) {
				return;
			}

			$.each(chartLabels, function (idx, chartlabel) {
				var cx = self.canvasBounds.startX + r,
					cy = self.canvasBounds.startY + r,
					chartLabel = $.extend(true, {
						compass: "east",
						attachMethod: "coordinate",
						attachMethodData: {
							seriesIndex: -1,
							x: -1,
							y: -1
						},
						offset: 0,
						visible: false,
						text: "",
						connected: false
					}, chartlabel),
					method,
					data,
					point,
					halfAngle,
					style,
					seriesIndex,
					series,
					value,
					anglePlus,
					seriesStyle,
					center,
					getPositionByAngle = self.canvas.wij.getPositionByAngle;

				if (!chartLabel.visible) {
					return true;
				}

				method = chartLabel.attachMethod;
				data = chartLabel.attachMethodData;
				point = { x: 0, y: 0 };
				halfAngle = 0;
				style = null;

				if (method === "dataIndex") {
					seriesIndex = data.seriesIndex;
					if (seriesIndex > -1) {
						series = o.seriesList[seriesIndex];
						value = series.data;
						anglePlus = 360 * value / self.total;
						seriesStyle = o.seriesStyles[seriesIndex];
						style = { stroke: seriesStyle.stroke || seriesStyle.fill };
						halfAngle = angle + anglePlus / 2;
						if (series.offset) {
							center = getPositionByAngle(cx, cy, series.offset, halfAngle);
							cx = center.x;
							cy = center.y;
						}
						point = getPositionByAngle(cx, cy, r, halfAngle);
						angle = angle + anglePlus;
					}
				}

				if (isNaN(point.x) || isNaN(point.y)) {
					return false;
				}

				self._setChartLabel(chartLabel, point, halfAngle, style);
			});
		},

		_getTooltipText: function (fmt, target) {
			var dataObj = $(target.node).data("wijchartDataObj"),
				value = dataObj.data,
				obj;

			obj = {
				value: value,
				total: this.total,
				data: dataObj,
				target: target,
				fmt: fmt
			};

			return $.proxy(fmt, obj)();
		},

		_bindLiveEvents: function () {
			var self = this,
				o = this.options,
				hintEnable = o.hint.enable,
				tooltip = self.tooltip,
				offset = { x: 0, y: 0 },
				hint,
				title,
				content,
				showAnimationTimers = [],
				hideAnimationTimers = [],
				explodeAnimationShowings = [];

			if (hintEnable && !tooltip) {
				hint = $.extend(true, {}, o.hint);
				hint.offsetY = hint.offsetY || -2;
				title = o.hint.title;
				content = o.hint.content;

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
				//tooltip = self.canvas.tooltip(self.sectors, hint);
				tooltip = self.canvas.tooltip(self.tooltipTars, hint);
				self.tooltip = tooltip;
			}

			$(".wijchart-canvas-object", this.chartElement[0])
				.live("mousedown.wijpiechart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj");
					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					self._trigger("mouseDown", e, dataObj);
				})
				.live("mouseup.wijpiechart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj");
					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					self._trigger("mouseUp", e, dataObj);
				})
				.live("mouseover.wijpiechart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj"),
						animation = o.animation,
						animated = animation && animation.enabled,
						index,
						sector,
						showAnimationTimer,
						hideAnimationTimer,
						explodeAnimationShowing;

					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					index = dataObj.index;
					sector = self.getSector(index);
					showAnimationTimer = showAnimationTimers[index];
					hideAnimationTimer = hideAnimationTimers[index];
					explodeAnimationShowing = explodeAnimationShowings[index];
					sector.wijAttr(dataObj.hoverStyle);
					self._trigger("mouseOver", e, dataObj);

					if (animated) {
						if (hideAnimationTimer) {
							window.clearTimeout(hideAnimationTimer);
							hideAnimationTimer = null;
							hideAnimationTimers[index] = null;
						}

						if (showAnimationTimer) {
							window.clearTimeout(showAnimationTimer);
							showAnimationTimer = null;
							showAnimationTimers[index] = null;
						}

						if (explodeAnimationShowing) {
							return;
						}

						showAnimationTimer = window.setTimeout(function () {
							var duration = animation.duration,
								easing = animation.easing;

							if (sector.removed) {
								return;
							}
							offset = sector.getOffset(animation.offset);

							sector.wijAnimate({
								translation: offset.x + " " + offset.y
							}, duration, easing);

							explodeAnimationShowing = true;
							explodeAnimationShowings[index] = explodeAnimationShowing;
						}, 150);
						showAnimationTimers[index] = showAnimationTimer;
					}
				})
				.live("mouseout.wijpiechart", function (e) {
							//debugger;
					if (o.disabled) {
						return;
					}
					var dataObj = $(e.target).data("wijchartDataObj"),
						animation = o.animation,
						animated = animation && animation.enabled,
						index,
						sector,
						showAnimationTimer,
						hideAnimationTimer,
						explodeAnimationShowing;

					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					index = dataObj.index;
					sector = self.getSector(index);
					showAnimationTimer = showAnimationTimers[index];
					hideAnimationTimer = hideAnimationTimers[index];
					explodeAnimationShowing = explodeAnimationShowings[index];
					self._trigger("mouseOut", e, dataObj);
					if (dataObj.style.segment) {
						delete dataObj.style.segment;
					}
					sector.wijAttr(dataObj.style);
					if (tooltip) {
						tooltip.hide();
					}

					if (animated) {
						if (hideAnimationTimer) {
							window.clearTimeout(hideAnimationTimer);
							hideAnimationTimer = null;
							hideAnimationTimers[index] = null;
						}

						if (showAnimationTimer) {
							window.clearTimeout(showAnimationTimer);
							showAnimationTimer = null;
							showAnimationTimers[index] = null;
						}

						if (!explodeAnimationShowing) {
							return;
						}

						hideAnimationTimer = window.setTimeout(function () {
							var duration = animation.duration,
								easing = animation.easing;

							sector.wijAnimate({
								translation: -offset.x + " " + -offset.y
							}, duration, easing);

							offset = { x: 0, y: 0 };
							explodeAnimationShowing = false;
							explodeAnimationShowings[index] = explodeAnimationShowing;
						}, 150);
						hideAnimationTimers[index] = hideAnimationTimer;
					}
				})
				.live("mousemove.wijpiechart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj");
					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					self._trigger("mouseMove", e, dataObj);
				})
				.live("click.wijpiechart", function (e) {
					if (o.disabled) {
						return;
					}

					var dataObj = $(e.target).data("wijchartDataObj");
					if (!dataObj) {
						dataObj = $(e.target.parentNode).data("wijchartDataObj");
					}
					self._trigger("click", e, dataObj);
				});
		},

		_unbindLiveEvents: function () {
			var self = this;
			$(".wijchart-canvas-object", self.chartElement[0]).die("wijpiechart");
			if (self.tooltip) {
				self.tooltip.destroy();
				self.tooltip = null;
			}
		},

		_sector: function (cx, cy, r, startAngle, endAngle) {
			var self = this,
				start = self._getPositionByAngle(cx, cy, r, startAngle),
				end = self._getPositionByAngle(cx, cy, r, endAngle);
			return ["M", cx, cy, "L", start.x, start.y, "A", r, r, 0,
					+(endAngle - startAngle > 180), 0, end.x, end.y, "z"];
		},

		_donut: function (cx, cy, outerR, innerR, startAngle, endAngle) {
			var self = this,
				outerS = self._getPositionByAngle(cx, cy, outerR, startAngle),
				outerE = self._getPositionByAngle(cx, cy, outerR, endAngle),
				innerS = self._getPositionByAngle(cx, cy, innerR, startAngle),
				innerE = self._getPositionByAngle(cx, cy, innerR, endAngle),
				largeAngle = endAngle - startAngle > 180;

			return ["M", outerS.x, outerS.y,
					"A", outerR, outerR, 0, +largeAngle, 0, outerE.x, outerE.y,
					"L", innerE.x, innerE.y,
					"A", innerR, innerR, 0, +largeAngle, 1, innerS.x, innerS.y,
					"L", outerS.x, outerS.y, "z"];
		},

		_getPositionByAngle: function (cx, cy, r, angle) {
			var point = {},
				rad = Raphael.rad(angle);
			point.x = cx + r * Math.cos(-1 * rad);
			point.y = cy + r * Math.sin(-1 * rad);

			return point;
		}
		/** end of private methods */
	});
} (jQuery));
