/*globals jQuery*/
/*
 *
 * Wijmo Library 0.8.1
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
 *  raphael-popup.js
 *  jquery.glob.min.js
 *  jquery.ui.widget.js
 *  jquery.ui.wijchartcore.js
 *  
 */
(function ($) {
	$.widget("ui.wijpiechart", $.ui.wijchartcore, {
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
			/// If the value is null, then the radius will be calculated by the width/height value of the pie chart.
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
			/// A value that indicates whether to show animation and the duration for the animation.
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
			$.ui.wijchartcore.prototype._create.apply(this, arguments);
			this.chartElement.addClass("ui-wijpiechart");
			// default some fills
			$.each(this.options.seriesStyles, function (idx, style) {
				if (!style.fill) {
					style.fill = defFill[idx];
				}
			});

		},

		destroy: function () {
			this.chartElement
				.removeClass("ui-wijpiechart ui-helper-reset");
			$.ui.wijchartcore.prototype.destroy.apply(this, arguments);
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
			var o = this.options;
			var width = this.canvasBounds.endX - this.canvasBounds.startX;
			var height = this.canvasBounds.endY - this.canvasBounds.startY;

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

			this.canvasBounds.startX += width / 2 - o.radius;
			this.canvasBounds.endX = this.canvasBounds.startX + 2 * o.radius;
			this.canvasBounds.startY += height / 2 - o.radius;
			this.canvasBounds.endY = this.canvasBounds.startY + 2 * o.radius;

			var seriesList = o.seriesList;
			var seriesStyles = o.seriesStyles;
			var total = 0;

			for (var idx = 0; idx < seriesList.length; idx++) {
				if (seriesList[idx] && typeof (seriesList[idx].data) === "number") {
					total += seriesList[idx].data;
				}
			}

			var sectors = [];
			var angle = 0;
			var paper = this.canvas;
			var r = o.radius;
			var startX = this.canvasBounds.startX;
			var startY = this.canvasBounds.startY;
			this.total = total;
			var self = this;

			$.each(seriesList, function (i, series) {
				var seriesStyle = $.extend({
					opacity: 1,
					stroke: "gray",
					"stroke-width": 1
				},
					seriesStyles[i]);
				var anglePlus = 360 * series.data / total;
				var cx = startX + r;
				var cy = startY + r;

				if (series.offset) {
					var center = paper.wij.getPositionByAngle(cx, cy, series.offset, angle + anglePlus / 2);
					cx = center.x;
					cy = center.y;
				}

				var sector = null;

				if (o.innerRadius) {
					sector = paper.wij.donut(cx, cy, r, o.innerRadius, angle, angle + anglePlus);
					sector.innerRadius = o.innerRadius;
				}
				else {
					sector = paper.wij.sector(cx, cy, r, angle, angle + anglePlus);
				}

				self._paintShadow(sector);
				sector.wijAttr(seriesStyle);
				sector.angles = { start: angle, end: angle + anglePlus };
				sector.getOffset = function (offset) {
					var pos = paper.wij.getPositionByAngle(cx, cy, offset, (sector.angles.start + sector.angles.end) / 2);
					return { x: pos.x - cx, y: pos.y - cy };
				};
				sector.center = { x: cx, y: cy };
				sector.radius = r;
				//$(sector.node).addClass("wijchart-canvas-object");
				self._addClass($(sector.node), "wijchart-canvas-object");
				$(sector.node).data("wijchartDataObj", series);

				if (o.showChartLabels) {
					var pos = paper.wij.getPositionByAngle(cx, cy, series.offset + r * 2 / 3, angle + anglePlus / 2);
					var textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
					paper.text(pos.x, pos.y, series.label).attr(textStyle);
				}

				sectors.push(sector);
				series.style = seriesStyle;
				series.index = i;
				series.type = "pie";
				angle += anglePlus;
			});

			this.sectors = sectors;
		},

		_paintChartLabels: function () {
			var o = this.options,
				chartLabels = o.chartLabels;
			if (chartLabels && chartLabels.length) {
				var angle = 0,
					r = o.radius;

				for (var i = 0, ii = chartLabels.length; i < ii; i++) {
					var cx = this.canvasBounds.startX + r;
					var cy = this.canvasBounds.startY + r;
					var chartLabel = $.extend(true, {
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
					}, chartLabels[i]);
					if (chartLabel.visible) {
						var method = chartLabel.attachMethod;
						var data = chartLabel.attachMethodData;
						var point = { x: 0, y: 0 };
						var halfAngle = 0;
						var style = null;

						if (method === "dataIndex") {
							var seriesIndex = data.seriesIndex;
							if (seriesIndex > -1) {
								var series = o.seriesList[seriesIndex];
								var value = series.data;
								var anglePlus = 360 * value / this.total;
								var seriesStyle = o.seriesStyles[seriesIndex];
								style = { stroke: seriesStyle.stroke || seriesStyle.fill };
								halfAngle = angle + anglePlus / 2;
								if (series.offset) {
									var center = this.canvas.wij.getPositionByAngle(cx, cy, series.offset, angle + anglePlus / 2);
									cx = center.x;
									cy = center.y;
								}
								point = this.canvas.wij.getPositionByAngle(cx, cy, r, halfAngle);
								angle = angle + anglePlus;
							}
						}

						if (isNaN(point.x) || isNaN(point.y)) {
							break;
						}

						this._setChartLabel(chartLabel, point, halfAngle, style);
					}
				}
			}
		},

		_bindLiveEvents: function () {
			var self = this,
				o = this.options,
				hintEnable = o.hint.enable,
				toolTipEle = self.toolTipEle,
				offset = {x: 0, y: 0};
																
			if (hintEnable && !toolTipEle) {
				toolTipEle = self.canvas.wij.tooltip(self);
			}
								
			$(".wijchart-canvas-object", this.chartElement[0])
				.live("mousedown.wijpiechart", function (e) {
					self._trigger("mousedown", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseup.wijpiechart", function (e) {
					self._trigger("mouseup", e, $(e.target).data("wijchartDataObj"));
				})
				.live("mouseover.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj");
					self._trigger("mouseover", e, dataObj);
					
					var animation = o.animation,
						animated = animation && animation.enabled;
					
					if (animated){
						var sector = self.getSector(dataObj.index),
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
					}
				})
				.live("mouseout.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj");
					self._trigger("mouseout", e, dataObj);
					
					if (toolTipEle){
						toolTipEle.hide();
					}
					
					var animation = o.animation,
						animated = animation && animation.enabled;
					
					if (animated){
						var sector = self.getSector(dataObj.index),
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
						offset = {x:0, y:0};
					}
				})
				.live("mousemove.wijpiechart", function (e) {
					var dataObj = $(e.target).data("wijchartDataObj");
					self._trigger("mousemove", e, dataObj);
					
					if (hintEnable){
						index = dataObj.index,
						chartPos = self.chartElement.offset(),
						value = dataObj.data,
						curPos = {
							x: e.pageX,
							y: e.pageY
						},
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
							value: value,
							index: index
						},
						point = {
							x: curPos.x - chartPos.left + data.offset,
							y: curPos.y - chartPos.top - data.offset
						};
						self.element.trigger("hintShowing", data);
	
						if (!data.cancel) {
							var content = data.content,
								format = o.hint.formatter,
								style = dataObj.style;
	
							if (!content) {
								if ($.isFunction(format)) {
									var obj = {
											value: value,
											total: self.total,
											data: dataObj,
											fmt: format
										},
										fmt = $.proxy(obj.fmt, obj);
									content = fmt();
								}
								else {
									content = format;
								}
							}
	
							toolTipEle.showDelay = data.showDelay;
							toolTipEle.hideDelay = data.hideDelay;
							toolTipEle.duration = data.duration;
							toolTipEle.easing = data.easing;
							toolTipEle.textAttr = $.extend(true, {}, o.textStyle, data.textStyle);
							toolTipEle.rectAttr = $.extend({
								stroke: style.stroke || style.fill, 
								"stroke-opacity": "0.9"
							}, data.style);
							toolTipEle.text = content;
							toolTipEle.offset = data.offset;
							toolTipEle.compass = data.compass;
							toolTipEle.showAt(point, 200);
							self._trigger("hintshown", null, data);
						}
					}
				})
				.live("click.wijpiechart", function (e) {
					self._trigger("click", e, $(e.target).data("wijchartDataObj"));
				});
		},

		_unbindLiveEvents: function () {
			$(".wijchart-canvas-object", this.chartElement[0]).die("wijpiechart");
		}
		/** end of private methods */
	});
})(jQuery);
