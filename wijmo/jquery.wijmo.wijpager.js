/*globals jQuery,$*/
/*jslint white: false */
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
 * * Wijmo Pager widget.
 *
 * Depends:
 *  jquery-1.4.2.js
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *
 */
(function ($) {
	"use strict";
	$.widget("wijmo.wijpager", {
		options: {
			/// <summary>
			/// The class of the first-page button.
			/// Default: ui-icon-seek-first.
			/// Type: String
			/// Code example: $("#element").wijpager( { firstButtonClass: "ui-icon-seek-first" } );
			/// </summary>
			firstPageClass: "ui-icon-seek-first",

			/// <summary>
			/// The text to display for the first-page button.
			/// Default: "First".
			/// Type: String
			/// Code example: $("#element").wijpager( { firstPageText: "First" } );
			/// </summary>
			firstPageText: "First",

			/// <summary>
			/// The class of the last-page button.
			/// Default: ui-icon-seek-end.
			/// Type: String
			/// Code example: $("#element").wijpager( { lastPageClass: "ui-icon-seek-end" } );
			/// </summary>
			lastPageClass: "ui-icon-seek-end",

			/// <summary>
			/// The text to display for the last-page button.
			/// Default: "Last".
			/// Type: String
			/// Code example: $("#element").wijpager( { lastPageText: "Last" } );
			/// </summary>
			lastPageText: "Last",

			/// <summary>
			/// Determines the pager mode. Possible values are: "nextPrevious", "nextPreviousFirstLast", "numeric", "numericFirstLast".
			/// 
			/// "nextPrevious" - a set of pagination controls consisting of Previous and Next buttons.
			/// "nextPreviousFirstLast" - a set of pagination controls consisting of Previous, Next, First, and Last buttons.
			/// "numeric" - a set of pagination controls consisting of numbered link buttons to access pages directly.
			/// "numericFirstLast" - a set of pagination controls consisting of numbered and First and Last link buttons.
			///
			/// Default: "numeric".
			/// Type: String
			/// Code example: $("#element").wijpager( { mode: "numeric" } );
			/// </summary>
			mode: "numeric",

			/// <summary>
			/// The class of the next-page button.
			/// Default: ui-icon-seek-next.
			/// Type: String
			/// Code example: $("#element").wijpager( { nextPageClass: "ui-icon-seek-next" } );
			/// </summary>
			nextPageClass: "ui-icon-seek-next",

			/// <summary>
			/// The text to display for the next-page button.
			/// Default: "Next".
			/// Type: String
			/// Code example: $("#element").wijpager( { nextPageText: "Next" } );
			/// </summary>
			nextPageText: "Next",

			/// <summary>
			/// The number of page buttons to display in the pager.
			/// Default: 10.
			/// Type: Number.
			/// Code example: $("#element").wijpager( { pageButtonCount: 10 } );
			/// </summary>
			pageButtonCount: 10,

			/// <summary>
			/// The class of the previous-page button.
			/// Default: ui-icon-seek-prev.
			/// Type: String
			/// Code example: $("#element").wijpager( { previousPageClass: "ui-icon-seek-prev" } );
			/// </summary>
			previousPageClass: "ui-icon-seek-prev",

			/// <summary>
			/// The text to display for the previous-page button.
			/// Default: "Previous".
			/// Type: String
			/// Code example: $("#element").wijpager( { previousPageText: "Previous" } );
			/// </summary>
			previousPageText: "Previous",

			/// <summary>
			/// Total number of pages.
			/// Default: 1.
			/// Type: Number.
			/// Code example: $("#element").wijpager( { pageCount: 1 } );
			/// </summary>
			pageCount: 1,

			/// <summary>
			/// The zero-based index of the current page.
			/// Default: 0.
			/// Type: Number.
			/// Code example: $("#element").wijpager( { pageIndex: 0 } );
			/// </summary>
			pageIndex: 0,

			/// <summary>
			/// pageIndexChanging event handler. A function called when page index is changing. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a callback function to handle the pageIndexChanging event:
			/// $("#element").wijpager({ pageIndexChanging: function (e, args) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijpagerpageindexchanging", function (e, args) { });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data whith this event.
			/// args.newPageIndex - new page index.
			/// </param>
			pageIndexChanging: null,

			/// <summary>
			/// pageIndexChanged event handler. A function called when the page index is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a callback function to handle the pageIndexChanged event:
			/// $("#element").wijpager({ pageIndexChanged: function (e) { } });
			/// Bind to the event by type:
			/// $("#element").bind("wijpagerpageindexchanged", function (e) { });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			pageIndexChanged: null
		},

		_create: function () {
			
			// enable touch support:
			if (window.wijmoApplyWijTouchUtilEvents) {
				$ = window.wijmoApplyWijTouchUtilEvents($);
			}
			
			this.element.addClass("ui-widget wijmo-wijpager ui-helper-clearfix");

			if (this.options.disabled) {
				this.disable();
			}

			this._refresh();
		},

		_init: function () {
		},

		destroy: function () {
			/// <summary>
			/// Destroys the wijpager widget and reset the DOM element.
			/// Code example: $("#element").wijpager("destroy");
			/// </summary>
			this.element.removeClass("ui-widget wijmo-wijpager ui-helper-clearfix");
			this.$ul.remove();
			$.Widget.prototype.destroy.apply(this, arguments);
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);
			this._refresh();
		},

		_refresh: function () {
			this._validate();

			if (this.$ul) {
				this.$ul.remove();
			}

			this.element.append(this.$ul = $("<ul class=\"ui-list ui-corner-all ui-widget-content ui-helper-clearfix\" role=\"tablist\"></ul>"));

			switch ((this.options.mode || "").toLowerCase()) {
				case "nextprevious":
					this._createNextPrev(false);
					break;

				case "nextpreviousfirstlast":
					this._createNextPrev(true);
					break;

				case "numeric":
					this._createNumeric(false);
					break;

				case "numericfirstlast":
					this._createNumeric(true);
					break;
			}
		},

		_validate: function () {
			var o = this.options;

			if (isNaN(o.pageCount) || o.pageCount < 1) {
				o.pageCount = 1;
			}

			if (isNaN(o.pageIndex) || o.pageIndex < 0) {
				o.pageIndex = 0;
			} else {
				 if (o.pageIndex >= o.pageCount) {
					o.pageIndex = o.pageCount - 1;
				}
			}

			if (isNaN(o.pageButtonCount) || o.pageButtonCount < 1) {
				o.pageButtonCount = 1;
			}
		},

		_createNextPrev: function (addFirstLast) {
			var o = this.options;

			// first button
			if (addFirstLast && o.pageIndex) {
				this.$ul.append(this._createPagerItem(false, o.firstPageText, 1, o.firstPageClass));
			}

			// previous button
			if (o.pageIndex) {
				this.$ul.append(this._createPagerItem(false, o.previousPageText, o.pageIndex, o.previousPageClass));
			}

			// next button
			if (o.pageIndex + 1 < o.pageCount) {
				this.$ul.append(this._createPagerItem(false, o.nextPageText, o.pageIndex + 2, o.nextPageClass));
			}

			// last button
			if (addFirstLast && (o.pageIndex + 1 < o.pageCount)) {
				this.$ul.append(this._createPagerItem(false, o.lastPageText, o.pageCount, o.lastPageClass));
			}
		},

		_createNumeric: function (addFirstLast) {
			var o = this.options,
				currentPage = o.pageIndex + 1,
				startPageNumber = 1,
				endPageNumber = Math.min(o.pageCount, o.pageButtonCount),
				i;

			if (currentPage > endPageNumber) {
				startPageNumber = (Math.floor(o.pageIndex/ o.pageButtonCount)) * o.pageButtonCount + 1;

				endPageNumber = startPageNumber + o.pageButtonCount - 1;
				endPageNumber = Math.min(endPageNumber, o.pageCount);

				if (endPageNumber - startPageNumber + 1 < o.pageButtonCount) {
					startPageNumber = Math.max(1, endPageNumber - o.pageButtonCount + 1);
				}
			}

			// first + "..." buttons
			if (startPageNumber !== 1) {
				// first button
				if (addFirstLast) {
					this.$ul.append(this._createPagerItem(false, o.firstPageText, 1, o.firstPageClass));
				}

				// "..." button
				this.$ul.append(this._createPagerItem(false, "...", startPageNumber - 1, ""));
			}

			// page numbers buttons
			for (i = startPageNumber; i <= endPageNumber; i++) {
				this.$ul.append(this._createPagerItem(i === currentPage, i.toString(), i, ""));
			}

			// "..." + last buttons
			if (o.pageCount > endPageNumber) {
				this.$ul.append(this._createPagerItem(false, "...", endPageNumber + 1, ""));

				// last button
				if (addFirstLast) {
					this.$ul.append(this._createPagerItem(false, o.lastPageText, o.pageCount, o.lastPageClass));
				}
			}
		},

		_createPagerItem: function (active, title, pageIndex, btnClass) {
			var btnContent,
				 self = this,
				 $li = $("<li />")
					.addClass("ui-page ui-corner-all")
					.attr({ "role": "tab", "aria-label": title, "title": title });

			if (active) {
				$li
					.addClass("ui-state-active")
					.attr("aria-selected", "true");
			} else {
				$li
					.addClass("ui-state-default")
					.hover(
						function () {
							if (!self.options.disabled) {
								$(this).removeClass("ui-state-default").addClass("ui-state-hover");
							}
						},
						function () {
							if (!self.options.disabled) {
								$(this).removeClass("ui-state-hover").addClass("ui-state-default");
							}
					})
					.bind("click." + this.widgetName, { newPageIndex: pageIndex - 1 }, $.proxy(this._onClick, this)); // pageIndex is 1-based.
			}

			if (active) {
				btnContent = $("<span />");
			} else {
				btnContent = btnClass
					? $("<span />").addClass("ui-icon " + btnClass)
					: $("<a/>").attr("href", "#");
			}

			btnContent
				.text(title);

			$li.append(btnContent);

			return $li;
		},

		_onClick: function (arg) {
			if (this.options.disabled) {
				return false;
			}

			var eventArg = { newPageIndex: arg.data.newPageIndex, handled: false };

			if (this._trigger("pageIndexChanging", null, eventArg) !== false) {
				if (this.options.pageIndex !== eventArg.newPageIndex) {
					this.options.pageIndex = eventArg.newPageIndex;
					if (!eventArg.handled) {
						this._refresh();
					}
					this._trigger("pageIndexChanged", null, { newPageIndex: eventArg.newPageIndex });
				}
			}

			return false;
		}
	});
})(jQuery);
