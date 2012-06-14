(function ($) {
	"use strict";
	$.widget("wijmo.wijgridfilter", $.wijmo.wijgrid, {
		options: {
			filterOperatorsSortMode: "none"
		},

		_displayNames: {
			nofilter: "Choose One", contains: "Contains", notcontain: "Does Not Contain", beginswith: "Begins With",
			endswith: "Ends With", equals: "Equals", notequal: "Does Not Equal", greater: "Greater", less: "Less",
			greaterorequal: "Greater Or Equal", lessorequal: "Less Or Equal", isempty: "Is Empty", notisempty: "Does Not Empty",
			isnull: "Is Null", notisnull: "Does Not Null"
		},

		_create: function () {
			$.wijmo.wijgrid.prototype._create.apply(this, arguments);

			this.element.bind("wijgridfilterloaded", $.proxy(this._onLoaded, this));
		},

		_onLoaded: function (e, args) {
			var self = this;

			$.each(this.columns(), function (i, colObj) {
				if (colObj instanceof $.wijmo.c1field) {
					colObj._hasFilter = self._hasFilter(colObj.options);

					colObj._dialogButton =
						$("<a href=\"#\"/>")
							.addClass("filterDialog-dialogButton")
							.addClass(colObj._hasFilter ? "ui-state-active" : "")
							.button({
								icons: {
									primary: "ui-icon-search"
								}
							})
							.click($.proxy(function (e) { self._showDialog(colObj); return false; }, self))
							.mouseout(function () {
								if (colObj._hasFilter) {
									colObj._dialogButton.addClass("ui-state-active");
								}
							})
							.appendTo(this.element.find(".wijmo-wijgrid-headertext"));
				}
			});
		},

		_closeDialog: function (colObj, flag) {
			try {
				if (colObj._dialogButton) {
					colObj._dialogButton.removeClass("ui-state-focus"); // fix focus state issue
				}

				if (!flag && this._dialog) {
					this._dialog.dialog("close");
				}

				if (this._dialog) {
					this._dialog.remove();
				}
			}
			finally {
				this._dialog = null;
			}
		},

		_showDialog: function (colObj) {
			var self = this,
				col = colObj.options;

			if (this._dialog) {
				this._closeDialog(colObj);
			}

			if (!this._dialog) {
				this._dialog = $("<div></div")
					.addClass("ui-helper-hidden-accessible filterDialog-dialogContainer ui-widget-content ui-corner-all ui-helper-clearfix")
					.appendTo(document.body)
					.wijfilter({
						data: this.data(),
						dataKey: col.dataKey,
						title: col.headerText || col.dataKey,
						enableSortButtons: this.options.allowSorting && col.allowSort,
						sortDirection: col.sortDirection || "none",
						availableOperators: this._getAvailableFilterOperators(col.dataType || "string"),
						filterValue: col.filterValue,
						filterOperator: col.filterOperator,
						showHeader: false,

						close: function (e, args) {
							self._closeDialog(colObj);

							if (args && !$.isEmptyObject(args)) {
								col.sortDirection = args.sortDirection;
								col.filterValue = args.filterValue;
								col.filterOperator = args.filterOperator;

								self.options.pageIndex = 0;

								self.ensureControl(true);
							}
						}
					})
					.removeClass("ui-helper-hidden-accessible")
					.dialog({
						resizable: false,
						modal: true,
						closeText: "",
						title: col.headerText || col.dataKey,
						width: "auto",
						height: "auto",
						position: {
							of: colObj._dialogButton,
							my: "left top",
							at: "left bottom",
							collision: "flip none"
						},
						close: function () {
							self._closeDialog(colObj, true);
						}
					});
			}
		},

		_getAvailableFilterOperators: function (dataType) {
			var self = this,
				result = $.map(this.getFilterOperatorsByDataType(dataType), function (fop) {
					return {
						name: fop.name,
						displayName: fop.displayName || self._displayNames[fop.name.toLowerCase()]
					};
				});

			return result;
		},

		_hasFilter: function (col) {
			var fv = col.filterOperator,
				i, len, foo,
				flag = false;

			if (!$.isArray(fv)) {
				fv = [fv];
			}

			for (i = 0, len = fv.length; (i < len) && !flag; i++) {
				foo = fv[i];
				flag = (foo && (foo = (foo.name || foo)) && ((foo || "").toLowerCase() !== "nofilter"));
			}

			return flag;
		}
	});
})(jQuery);
