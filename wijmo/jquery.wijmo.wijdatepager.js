/*globals jQuery,$,window,alert,document,confirm,location,setTimeout, Globalize,
clearTimeout,amplify*/
/*jslint white: false */
/*jslint nomen: false*/
/*
*
* Wijmo Library 2.1.4
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Slider widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  globalize.js
*  jquery.wijmo.wijpopup.js
*  jquery.ui.wijutil.js
*  
*/

(function ($) {
	"use strict";
	$.widget("wijmo.wijdatepager", {
		options: {

			///	<summary>
			///	Culture name, e.g. "de-DE".
			///	</summary>
			culture: "",

			/// <summary>
			/// The first day of the week (from 0 to 6). 
			///	Sunday is 0, Monday is 1, and so on.
			/// Default: 0
			/// Type: Number.
			/// Code example: $("#eventscalendar").wijeventscalendar(
			///	{ firstDayOfWeek: 1 });
			/// </summary>
			firstDayOfWeek: 0,

			/// <summary>
			/// The selected date.
			/// Default: new Date()
			/// Type: Date.
			/// Code example: $("#datepager").wijdatepager(
			///						{ selectedDate: new Date(2015, 11, 21) });
			/// </summary>
			selectedDate: new Date(),

			/// <summary>
			/// The active view type. Possible values are: day, week, month.
			/// Default: day
			/// Type: String.
			/// Code example: $("#datepager").wijdatepager(
			///			{ viewType: "month" });
			/// </summary>
			viewType: "day"

			/*Available Events:
			/// <summary>
			/// Occurs when the selectedDate option has been changed.
			/// Type: Function
			/// Event type: wijdatepagerselecteddatechanged
			/// Code example:
			/// Supply a callback function to handle the selectedDateChanged event
			///	as an option.
			/// $("#wijdatepager").wijdatepager(
			///					{ selectedDateChanged: function (e, args) {
			///		alert("selected date:" + args.selectedDate);
			///    }
			///	});
			/// Bind to the event by type: wijdatepagerselecteddatechanged.
			/// $("#wijdatepager").bind( "wijdatepagerselecteddatechanged", 
			///	function(e, args) {
			///		alert("selected date:" + args.selectedDate);
			/// });
			/// </summary>
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			///	args.selectedDate - the new selectedDate option value.</param>
			selectedDateChanged(e, args)
			*/
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);
			switch (key) {
				case "selectedDate":
					this.options.selectedDate = value;
					this._initBackground();
					break;
				case "disabled":
					if (value) {
						this._disable();
					} else {
						this._enable();
					}
					break;
				case "viewType":
					this.options.viewType = value;
					this._initBackground();
					break;
			}
			return this;
		},
		_disable: function () {
			this.element.addClass("ui-state-disabled");

			this.element.find(".wijmo-wijdatepager-decrement").button("option",
							"disabled", true);
			this.element.find(".wijmo-wijdatepager-increment").button("option",
							"disabled", true);
		},
		_enable: function () {
			this.element.removeClass("ui-state-disabled");

			this.element.find(".wijmo-wijdatepager-decrement").button("option",
							"disabled", false);
			this.element.find(".wijmo-wijdatepager-increment").button("option",
							"disabled", false);
		},

		///	<summary>
		///	Creates date pager DOM elements and binds interactive events.
		///	</summary>
		_create: function () {
			var o = this.options, resizeHandler;
			if (!o.selectedDate) {
				o.selectedDate = new Date();
			}
			this._dtpagernamespacekey = "dtpager" + new Date().getTime();
			this.element.addClass("wijmo-wijdatepager ui-widget ui-helper-clearfix");
			resizeHandler = $.proxy(this.invalidate, this);
			$(window).bind("resize." + this._dtpagernamespacekey, resizeHandler);

			this.element.disableSelection();
			this.element
				.append($("<a class=\"wijmo-wijdatepager-decrement\"><span>left</span></a>"
		))
				.append("<div class=\"wijmo-wijdatepager-container ui-widget-content\">" +

						"<div class=\"wijmo-wijdatepager-pages\"></div>" +
						"</div>" +
"<a class=\"wijmo-wijdatepager-increment\"><span>right</span></a>"
);

			$.Widget.prototype._create.apply(this, arguments);

			this.element.find(".wijmo-wijdatepager-decrement").button({ icons: {
				primary: "ui-icon-triangle-1-w"
			}, text: false
			})
							.click($.proxy(this.goLeft, this));
			this.element.find(".wijmo-wijdatepager-increment").button({ icons: {
				primary: "ui-icon-triangle-1-e"
			}, text: false
			})
							.click($.proxy(this.goRight, this));
			this._initBackground();
			if (o.disabled) {
				this._disable();
			}
		},

		///	<summary>
		///	Destroys the widget and resets the DOM element.
		///	</summary>
		destroy: function () {
			this.element.removeClass("wijmo-wijdatepager");
			$(window).unbind("." + this._dtpagernamespacekey);
		},

		///	<summary>
		///	Refreshes the widget layout.
		///	</summary>
		refresh: function () {
			this.invalidate();
		},
		///	<summary>
		///	Refreshes the widget layout.
		///	</summary>
		invalidate: function () {
			var selectedPage = $(this.element
						.find(".wijmo-wijdatepager-pagelabel")[this._index]),
				container = this.element.find(".wijmo-wijdatepager-container"),
				decBtn = this.element.find(".wijmo-wijdatepager-decrement"),
				incBtn = this.element.find(".wijmo-wijdatepager-increment"),
				innerWidth = this.element.innerWidth(),
				decBtnW = decBtn.is(":visible") ? decBtn.outerWidth(true) : 0,
				incBtnW = incBtn.is(":visible") ? incBtn.outerWidth(true) : 0;

			this.element.find(".wijmo-wijdatepager-pagelabel.ui-state-active")
												.removeClass("ui-state-active");
			selectedPage.addClass("ui-state-active");
			container.css("left", decBtnW);
			this.element.removeClass("wijmo-wijdatepager-width-smallest" +
		" wijmo-wijdatepager-width-small wijmo-wijdatepager-width-medium" +
		" wijmo-wijdatepager-width-normal");
			if (innerWidth < 300) {
				this.element.addClass("wijmo-wijdatepager-width-smallest");
			} else if (innerWidth < 475) {
				this.element.addClass("wijmo-wijdatepager-width-small");
			} else if (innerWidth < 600) {
				this.element.addClass("wijmo-wijdatepager-width-medium");
			} else {
				this.element.addClass("wijmo-wijdatepager-width-normal");
			}
			container.outerWidth(innerWidth - decBtnW - incBtnW);
		},

		///	<summary>
		///	Selects the previous date.
		///	</summary>
		goLeft: function () {
			var o = this.options;
			if (o.disabled) {
				return;
			}
			this._setSelectedIndex(this._index - 1, true);
		},

		///	<summary>
		///	Selects the next date.
		///	</summary>
		goRight: function () {
			var o = this.options;
			if (o.disabled) {
				return;
			}
			this._setSelectedIndex(this._index + 1);
		},

		// culture:
		_getCulture: function (name) {
			return Globalize.findClosestCulture(name || this.options.culture);
		},

		_isRTL: function () {
			return !!this._getCulture().isRTL;
		},

		_initBackground: function (animate, isRightToLeft) {
			var s, i, oldBg, newBg, pageLabels, newPageIndPos,
				self = this;
			if (this._isInAnimate) {
				return;
			}
			this._index = 0;
			this._datesDef = this._getDatesDefinition();
			this._min = 0;
			this._max = this._datesDef.length - 1;


			s = "";
			for (i = 0; i < this._datesDef.length; i += 1) {
				s += "<div class=\"wijmo-wijdatepager-pagelabel" +
				(i === 0 ? " wijmo-wijdatepager-pagelabel-first" : "") +
					(this._datesDef[i].range ?
					" wijmo-wijdatepager-pagerange" : "") +
					(this._datesDef[i].header ?
					" wijmo-wijdatepager-pageheader ui-state-highlight" : "") +
					(i === this._datesDef.length - 1 ?
								" wijmo-wijdatepager-pagelabel-last" : "") +
					"\">" +
							this._datesDef[i].l + "</div>";
			}
			newBg = this.element.find(".wijmo-wijdatepager-pages");
			if (animate) {

				this._isInAnimate = true;

				oldBg = newBg.clone(true);
				newBg.html(s);

				pageLabels = newBg.find(".wijmo-wijdatepager-pagelabel");
				if (!isRightToLeft) {
					oldBg.insertBefore(newBg);
					newPageIndPos = $(pageLabels[this._index]).offset().left;

					newBg.css("opacity", 0).css("left", oldBg.outerWidth(true))
							.stop()
							.animate({ left: "0px", opacity: 100 });
					oldBg.stop()
						.animate({ left: "-" + oldBg.outerWidth(true) + "px",
							opacity: 0
						},
						function () {
							oldBg.remove();
							self._isInAnimate = false;
							self.invalidate();
						});
				} else {
					oldBg.insertAfter(newBg);
					newPageIndPos = $(pageLabels[this._index]).offset().left;


					newBg.css("opacity", 0).css("left", -oldBg.outerWidth(true))
								.stop().animate({ left: "0px", opacity: 100 });
					oldBg.css("left", 0).stop()
						.animate({ left: oldBg.outerWidth(true) + "px", opacity: 0 },
					function () {
						oldBg.remove();
						self._isInAnimate = false;
						self.invalidate();
					});
				}
			} else {
				newBg.html(s);
				this.invalidate();
			}
			//.stop().animate({ left: "0px" })

			newBg.find(".wijmo-wijdatepager-pagelabel").hover(
						$.proxy(this._pagelabelHover, this),
						$.proxy(this._pagelabelHout, this));

			newBg.find(".wijmo-wijdatepager-pagelabel")
						.bind("mousedown", $.proxy(this._pagelabelMouseDown, this));

			newBg.find(".wijmo-wijdatepager-pagelabel").click($.proxy(function (e) {
				var target = $(e.target), ind;
				ind = this.element
							.find(".wijmo-wijdatepager-pagelabel").index(target);
				this._setSelectedIndex(ind);
			}, this));




		},

		_addDays: function (dt, num) {
			return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + num);
		},

		_getDatesDefinition: function () {
			var o = this.options, viewType = o.viewType.toLowerCase(),
					i, dt, curDt, nextDt, endDt, datesDef = [],
					selectedDate = o.selectedDate;

			switch (viewType) {
				case "week":
					curDt = new Date(selectedDate.getFullYear(),
													selectedDate.getMonth(), -6);
					i = o.firstDayOfWeek - curDt.getDay();
					if (Math.abs(i) > 6) {
						i = curDt.getDay() - o.firstDayOfWeek;
					}
					curDt = this._addDays(curDt, i);
					endDt = new Date(selectedDate.getFullYear(),
													selectedDate.getMonth() + 1, 7);
					i = 0;
					while (curDt < endDt ||
							curDt.getMonth() === selectedDate.getMonth()) {

						nextDt = this._addDays(curDt, 7);
						datesDef.push({
							l: Globalize.format(curDt, "MMM", this._getCulture()) +
								" " + Globalize.format(curDt, "dd", this._getCulture()) +
								"-" + Globalize.format(this._addDays(curDt, 6),
															"dd", this._getCulture()),
							d: curDt,
							d2: this._addDays(curDt, 6)
						});
						if (selectedDate >= curDt && selectedDate <= nextDt) {
							this._index = i;
						}
						curDt = nextDt;
						i += 1;
					}
					break;
				case "month":
					dt = new Date(selectedDate.getFullYear() - 1, 0, 1);
					datesDef.push({ l: dt.getFullYear(), d: dt, range: true });
					dt = new Date(selectedDate.getFullYear(), 0, 1);
					datesDef.push({ l: dt.getFullYear(), d: dt, header: true });

					for (i = 0; i < 12; i += 1) {
						dt = new Date(selectedDate.getFullYear(), i, 1);
						datesDef.push({
							l: Globalize.format(dt, "MMM", this._getCulture()),
							d: dt
						});
						nextDt = new Date(selectedDate.getFullYear(), i + 1, 1);
						if (selectedDate >= dt &&
								selectedDate <= nextDt) {
							this._index = i + 2;
						}
					}
					dt = new Date(selectedDate.getFullYear() + 1, 0, 1);
					datesDef.push({ l: dt.getFullYear(), d: dt, range: true });
					break;
				default:
					//case "day":

					dt = new Date(selectedDate.getFullYear(),
													selectedDate.getMonth(), 0);
					datesDef.push({ l: Globalize.format(dt, "MMM", this._getCulture()), d: dt,
						range: true
					});
					dt = new Date(selectedDate.getFullYear(),
													selectedDate.getMonth(), 1);
					datesDef.push({ l: Globalize.format(dt, "MMM", this._getCulture()),
						d: dt, header: true
					});



					curDt = dt;
					i = 2;
					while (curDt.getMonth() === selectedDate.getMonth()) {
						nextDt = new Date(curDt.getFullYear(),
							curDt.getMonth(), curDt.getDate() + 1);
						datesDef.push({
							l: Globalize.format(curDt, "d ", this._getCulture()),
							d: curDt
						});
						if (selectedDate >= curDt && selectedDate <= nextDt) {
							this._index = i;
						}
						curDt = nextDt;
						i += 1;
					}

					dt = new Date(selectedDate.getFullYear(),
											selectedDate.getMonth() + 1, 1);
					datesDef.push({ l: Globalize.format(dt, "MMM", this._getCulture()),
						d: dt, range: true
					});
					break;

			}
			return datesDef;
		},

		_setSelectedIndex: function (ind, skipHeader) {
			var o = this.options;
			if (o.disabled) {
				return;
			}
			if (ind >= this._min && ind <= this._max) {

				if (this._dragActivated) {
					this._showTooltip(ind);
				}

				if (this._index !== ind) {
					if (this._datesDef[ind].header) {
						if (skipHeader) {
							ind = ind - 1;
						} else {
							return;
						}
					}
					this._index = ind;
					o.selectedDate = this._datesDef[ind].d;
					if (this._index === this._max) {
						if (o.viewType === "week") {
							o.selectedDate = new Date(o.selectedDate.getFullYear(),
								o.selectedDate.getMonth(), o.selectedDate.getDate() + 7);
						}

					}

					if (this._max > 2 && this._index === 0) {
						this._initBackground(true, true);
					}
					else if (this._index === this._max) {
						this._initBackground(true, false);
					} else {
						this.invalidate();
					}
					this._trigger("selectedDateChanged", null,
						{ selectedDate: o.selectedDate });
				}
			}
		},
		_pagelabelHover: function (e) {
			var target = $(e.target);
			if (target.hasClass("wijmo-wijdatepager-pageheader")) {
				return;
			}
			target.addClass("ui-state-hover");
		},
		_showTooltip: function (ind) {
			var o = this.options, dateDef = this._datesDef[ind],
				viewType = o.viewType, s,
				target = this.element
						.find(".wijmo-wijdatepager-pagelabel")[ind];
			if (!this._tooltip) {
				this._tooltip = $("<div class=\"wijmo-wijdatepager-tooltip\">" +
						"<div class=\"wijmo-wijdatepager-tooltip-inner\">" +
						"</div>" +
"<div class=\"wijmo-wijdatepager-triangle\"></div>" +
					"</div>");
				this.element.append(this._tooltip);
				this._tooltip.wijpopup();
			}

			s = "";
			switch (viewType) {
				case "day":
					s = Globalize.format(dateDef.d, "dddd, MMMM d, yyyy", this._getCulture());
					break;
				case "week":
					s = Globalize.format(dateDef.d, "MMMM d - ", this._getCulture()) +
						Globalize.format(dateDef.d2,
						(dateDef.d.getMonth() !==
							dateDef.d2.getMonth() ?
										"MMMM d, yyyy" : "d, yyyy"), this._getCulture());
					break;
				case "month":
					s = Globalize.format(dateDef.d, "MMMM yyyy", this._getCulture());
					break;
			}

			this._tooltip.wijpopup("show",
							{ of: target,
								my: "center bottom",
								at: "center top",
								offset: "-10 -10"
							});

			this._tooltip.find(".wijmo-wijdatepager-tooltip-inner")
								.html(s);
			//Monday, 31st, 2001
			//
		},
		_hideTooltip: function () {
			this._tooltip.wijpopup("hide");
		},
		_pagelabelHout: function (e) {
			$(e.target).removeClass("ui-state-hover");
		},
		_pagelabelMouseDown: function (e) {
			this._dragActivated = false;
			if (this.options.disabled) {
				return;
			}
			e.preventDefault();
			var target = $(e.target), ind;
			if (target.hasClass("wijmo-wijdatepager-pageheader")) {
				return;
			}
			ind = this.element
							.find(".wijmo-wijdatepager-pagelabel").index(target);

			this._dragActivated = true;
			this._setSelectedIndex(ind);
			this._mouseDownTimeFix20555 = new Date().getTime();
			this._startClientX = e.pageX;
			this._startInd = ind;

			$(document).bind("mousemove." + this._dtpagernamespacekey,
								$.proxy(this._pageindicatorMouseMove, this));
			$(document).bind("mouseup." + this._dtpagernamespacekey,
								$.proxy(this._pageindicatorMouseUp, this));
		},



		_pageindicatorMouseMove: function (e) {
			e.preventDefault();
			if (this._isInAnimate) {
				return;
			}

			var startPage = this.element
					.find(".wijmo-wijdatepager-pagelabel")[this._startInd], newPos, ind;
			if (!startPage) {
				return;
			}
			newPos = startPage.offsetLeft + Math.round(startPage.offsetWidth / 2) +
								(e.pageX - this._startClientX);
			ind = this._findClosesPageIndexByPos(newPos);


			if (this._prevMoveInd === ind) {
				// fix for [20534] case 1:
				return;
			}
			this._prevMoveInd = ind;
			if ((this._mouseDownTimeFix20555 + 150) > new Date().getTime()) {
				// fix for [20555]
				return;
			}
			if (ind !== -1 && ind !== this._index) {
				this._setSelectedIndex(ind);
			}
			//this.element.find(".wijmo-wijdatepager-pagelabel").css(left;
		},
		_pageindicatorMouseUp: function (e) {
			this._dragActivated = false;
			$(document).unbind("." + this._dtpagernamespacekey);
			this._hideTooltip();
		},
		_findClosesPageIndexByPos: function (pos) {
			var pagelabels = this.element.find(".wijmo-wijdatepager-pages")
					.find(".wijmo-wijdatepager-pagelabel"), i;

			for (i = 0; i < pagelabels.length; i += 1) {

				if ((pagelabels[i].offsetLeft) < pos &&
					(pagelabels[i].offsetLeft + pagelabels[i].offsetWidth) > pos) {
					return i;
				}
			}
			return -1;
		}


	});
} (jQuery));