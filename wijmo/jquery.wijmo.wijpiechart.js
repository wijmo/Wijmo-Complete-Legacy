/*globals jQuery, window*/
/*
 *
 * Wijmo Library 0.9.0
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
 *  jquery.glob.min.js
 *  jquery.ui.widget.js
 *  jquery.wijmo.wijchartcore.js
 *  
 */
"use strict";
(function ($) {
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
			/// Default: {enabled:true, duration:400, easing: "easeOutExpo"}.
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
				/// Default: 400.
				/// Type: Number.
				/// </summary>
				duration: 400,
				/// <summary>
				/// A value that indicates the easing for the animation.
				/// Default: "elastic".
				/// Type: string.
				/// </summary>
				easing: "elastic",
				/// <summary>
				/// A value that indicates the offset for explode animation.
				/// Default: 10.
				/// Type: Number.
				/// </summary>
				offset: 10
			}
		},

		// widget creation:    
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
			$.wijmo.wijchartcore.prototype._create.apply(this, arguments);
			this.chartElement.addClass("wijmo-wijpiechart");
			// default some fills
			$.each(this.options.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});
		},

		destroy: function () {
			this.chartElement
				.removeClass("wijmo-wijpiechart ui-helper-reset");
			$.wijmo.wijchartcore.prototype.destroy.apply(this, arguments);
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
		_paintPlotArea: function () {
			var self = this,
				o = self.options,
				canvasBounds = self.canvasBounds,
				width = canvasBounds.endX - canvasBounds.startX,
				height = canvasBounds.endY - canvasBounds.startY,
				seriesList = o.seriesList,
				seriesStyles = o.seriesStyles,
				total = 0,
				sectors = [],
				angle = 0,
				paper = self.canvas,
				getPositionByAngle = paper.wij.getPositionByAngle,
				r, startX, startY;

			if (!o.radius) {
				o.radius = Math.min(width, height) / 2;
			}
			else {
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
					center, sector,
					pos, textStyle;

				if (series.offset) {
					center = getPositionByAngle(cx, cy,
									series.offset, angle + anglePlus / 2);
					cx = center.x;
					cy = center.y;
				}

				if (o.innerRadius) {
					sector = paper.wij.donut(cx, cy, r, o.innerRadius,
										angle, angle + anglePlus);
					sector.innerRadius = o.innerRadius;
				}
				else {
					sector = paper.wij.sector(cx, cy, r, angle, angle + anglePlus);
				}

				self._paintShadow(sector);
				sector.wijAttr(seriesStyle);
				sector.angles = { start: angle, end: angle + anglePlus };
				sector.getOffset = function (offset) {
					var pos = getPositionByAngle(cx, cy, offset,
									(sector.angles.start + sector.angles.end) / 2);
					return { x: pos.x - cx, y: pos.y - cy };
				};
				sector.center = { x: cx, y: cy };
				sector.radius = r;
				//$(sector.node).addClass("wijchart-canvas-object");
				self._addClass($(sector.node), "wijchart-canvas-object");
				$(sector.node).data("wijchartDataObj", series);

				if (o.showChartLabels) {
					pos = getPositionByAngle(cx, cy,
							series.offset + r * 2 / 3, angle + anglePlus / 2);
					textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
					paper.text(pos.x, pos.y, series.label).attr(textStyle);
				}

				sectors.push(sector);
				series.style = seriesStyle;
				series.index = idx;
				series.type = "pie";
				angle += anglePlus;
			});

			self.sectors = sectors;
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
					}, chartLabel),
					method, data, point, halfAngle, style,
					seriesIndex, series, value, anglePlus,
					seriesStyle, center,
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
				offset = {x: 0, y: 0},
				hint, title, content,
				showAnimationTimers = [],
				hideAnimationTimers = [],
				explodeAnimationShowing = false;
																
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
				tooltip = self.canvas.tooltip(self.sectors, hint);
				self.tooltip = tooltip;
			}

			$(".wijchart-canvas-object", this.chartElement[0])
				.live("mousedown.wijpiechart", function (e) {
					self._trigger("mousedown", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseup.wijpiechart", function (e) {
					self._trigger("mouseup", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseover.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj"),
						animation = o.animation,
						animated = animation && animation.enabled,
						index = dataObj.index,
						showAnimationTimer = showAnimationTimers[index],
						hideAnimationTimer = hideAnimationTimers[index];

					self._trigger("mouseover", e, dataObj);

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
												
						showAnimationTimer = window.setTimeout(function () {
							if (explodeAnimationShowing) {
								return;
							}

							var sector = self.getSector(index),
								shadow = sector.shadow,
								duration = animation.duration,
								easing = animation.easing;

							offset = sector.getOffset(animation.offset);

							sector.animate({
								translation: offset.x + " " + offset.y
							}, duration, easing);

							if (shadow) {
								shadow.animate({
									translation: offset.x + " " + offset.y
								}, duration, easing);
							}

							explodeAnimationShowing = true;
						}, 150);
						showAnimationTimers[index] = showAnimationTimer;
					}
				})
				.live("mouseout.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj"),
						animation = o.animation,
						animated = animation && animation.enabled,
						index = dataObj.index,
						showAnimationTimer = showAnimationTimers[index],
						hideAnimationTimer = hideAnimationTimers[index];

					self._trigger("mouseout", e, dataObj);
					
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
												
						hideAnimationTimer = window.setTimeout(function () {
							var sector = self.getSector(index),
								shadow = sector.shadow,
								duration = animation.duration,
								easing = animation.easing;

							sector.animate({
								translation: -offset.x + " " + -offset.y
							}, duration, easing);

							if (shadow) {
								shadow.animate({
									translation: -offset.x + " " + -offset.y
								}, duration, easing);
							}
													
							offset = { x: 0, y: 0 };							
							explodeAnimationShowing = false;
						}, 150);
						hideAnimationTimers[index] = hideAnimationTimer;
					}
				})
				.live("mousemove.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj");
					self._trigger("mousemove", e, dataObj);
				})
				.live("click.wijpiechart", function (e) {
					self._trigger("click", e, $(e.target).data("wijchartDataObj"));
				});
		},

		_unbindLiveEvents: function () {
			var self = this;
			$(".wijchart-canvas-object", self.chartElement[0]).die("wijpiechart");
			if (self.tooltip) {
				self.tooltip.destroy();
				self.tooltip = null;
			}
		}
		/** end of private methods */
	});
}(jQuery));
