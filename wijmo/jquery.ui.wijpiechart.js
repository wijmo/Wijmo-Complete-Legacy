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
 * * Wijmo PieChart widget.
 *
 * Depends:
 *  raphael.js
 *  raphael-popup.js
 *  jquery.glob.min.js
 *  jquery.ui.widget.js
 *  jquery.ui.svgdom.js
 *  jquery.ui.wijchartcore.js
 *  
 */
(function($) {
	
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
		innerRadius:0
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
	        if (style.fill == null) {
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
		
		if (!o.radius){
			o.radius = Math.min(width, height)/2;
		}
		else{		
			if (width < 2 * o.radius) {
				o.radius = width/2;
			}
			if (height < 2 * o.radius) {
				o.radius = height/2;
			}
		}
		
		this.canvasBounds.startX += width/2 - o.radius;
		this.canvasBounds.endX = this.canvasBounds.startX + 2* o.radius;
		this.canvasBounds.startY += height/2 - o.radius;
		this.canvasBounds.endY = this.canvasBounds.startY + 2* o.radius;
		
		var seriesList = o.seriesList;
		var seriesStyles = o.seriesStyles;
		var total = 0;
		
		for (var idx = 0; idx < seriesList.length; idx++)	{
			if (seriesList[idx] != null && typeof(seriesList[idx].data) == "number"){
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
		
		$.each(seriesList, function(i, series){
			var seriesStyle = $.extend({
				opacity: 1,
				stroke: "gray",
				"stroke-width": 1
				}, seriesStyles[i]);
			var anglePlus = 360 * series.data/total;
			var cx = startX + r;
			var cy = startY + r;
			
			if (series.offset) {
				var center = paper.wij.getPositionByAngle(cx, cy, series.offset, angle + anglePlus/2);
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
			sector.angles = {start:angle, end:angle + anglePlus};
			sector.getOffset = function (offset){
				var pos = paper.wij.getPositionByAngle(cx, cy, offset, (sector.angles.start + sector.angles.end)/2);
				return {x:pos.x - cx, y:pos.y - cy};
			};
			sector.center = {x:cx, y:cy};
			sector.radius = r;
			//$(sector.node).addClass("wijchart-canvas-object");
			self._addClass($(sector.node), "wijchart-canvas-object");
			$(sector.node).data("wijchartDataObj", series);		
					
			if(o.showDefaultChartLabels) {
				var pos = paper.wij.getPositionByAngle(cx, cy, series.offset + r*2/3, angle + anglePlus/2);
				var textStyle = $.extend(true, {}, o.textStyle, o.chartLabelStyle);
				paper.text(pos.x, pos.y, series.label).attr(textStyle);
			}
			
			sectors.push(sector);
			series.style = seriesStyle;
			series.index = i;
			series.type = "pie";
			angle += anglePlus;	
		})
		
		this.sectors = sectors;
	},
	
	_paintChartLabels: function() {
		var o = this.options;
		var chartLabels = o.chartLabels;
		if(chartLabels && chartLabels.length) {
			var angle = 0;
			var r = o.radius;
			
			for(var i = 0, ii = chartLabels.length; i< ii; i++) {
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
				},chartLabels[i]);
				if(chartLabel.visible) {
					var method = chartLabel.attachMethod;
					var data = chartLabel.attachMethodData;
					var point = {x:0, y:0};
					var halfAngle = 0;
					var style = null;
					
					if (method == "dataIndex") {
						var seriesIndex = data.seriesIndex;
						if(seriesIndex > -1) {
							var series = o.seriesList[seriesIndex];
							var value = series.data;
							var anglePlus = 360 * value/this.total;
							var seriesStyle = o.seriesStyles[seriesIndex];
							style = {stroke:seriesStyle["stroke"] || seriesStyle["fill"]};
							halfAngle = angle + anglePlus/2;
							if (series.offset) {
								var center = this.canvas.wij.getPositionByAngle(cx, cy, series.offset, angle + anglePlus/2);
								cx = center.x;
								cy = center.y; 
							}
							point = this.canvas.wij.getPositionByAngle(cx, cy, r, halfAngle);
							angle = angle + anglePlus;
						}
					}
					
					if(isNaN(point.x) || isNaN(point.y)) {
						break;
					}
					
					this._setChartLabel(chartLabel, point, halfAngle, style);
				}
			}
		}
	},

	_bindLiveEvents: function () {
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
		var o = this.options;
		$(".wijchart-canvas-object", this.chartElement[0])
					.live("mousedown.wijpiechart", $.proxy(proxyObj.mousedown, this))
					.live("mouseup.wijpiechart", $.proxy(proxyObj.mouseup, this))
					.live("mouseover.wijpiechart", $.proxy(proxyObj.mouseover, this))
					.live("mouseout.wijpiechart", $.proxy(proxyObj.mouseout, this))
					.live("mousemove.wijpiechart", $.proxy(proxyObj.mousemove, this))
					.live("click.wijpiechart", $.proxy(proxyObj.click, this));
				
		if (o.hint.enable) {
			if (!this.tooltipEle) {
				this.tooltipEle = this.canvas.wij.tooltip(this);
			}
			
			var self = this;
			$(".wijchart-canvas-object", this.chartElement[0]).live("mousemove.wijpiechart", function(e){
				var dataObj = $(this).data("wijchartDataObj");
				var index = dataObj.index;
				var chartPos = self.chartElement.offset();
				var value = dataObj.data;
				var curPos = {
					x: e.pageX,
					y: e.pageY
				};
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
						if ($.isFunction(format)) {
							var obj = {
								value: value,
								total:self.total,
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
					var style = dataObj.style;
					
					self.tooltipEle.showDelay = data.showDelay;
					self.tooltipEle.hideDelay = data.hideDelay;
					self.tooltipEle.duration = data.duration;
					self.tooltipEle.easing = data.easing;
					self.tooltipEle.textAttr = $.extend(true, {}, o.textStyle, data.textStyle);
					self.tooltipEle.rectAttr = $.extend({
						stroke: style["stroke"] || style["fill"],"stroke-opacity":"0.9"
					}, data.style);
					self.tooltipEle.text = content;
					self.tooltipEle.offset = data.offset;
					self.tooltipEle.compass = data.compass;
					self.tooltipEle.showAt(point, 200);
					self._trigger("hintshown", null, data);
				}
			});
			$(".wijchart-canvas-object", this.chartElement[0]).live("mouseout.wijpiechart", function(){
				self.tooltipEle.hide();
			});
		}
	},
	
	_unbindLiveEvents: function () {
		$(".wijchart-canvas-object", this.chartElement[0]).die("wijpiechart");
	}
	/** end of private methods */
});
})(jQuery);
