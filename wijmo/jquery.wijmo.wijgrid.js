/*globals jQuery,$,document*/
/*jslint white: false*/

/*
 *
 * Wijmo Library 1.0.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
 *
 *
 * * Wijmo Grid Widget.
 *
 * Depends:
 * jquery-1.4.2.js
 * jquery.ui.core.js
 * jquery.ui.widget.js
 * jquery.glob.js
 * jquery.wijmo.wijutil.js
 * jquery.wijmo.wijdatasource.js
 *
 * Optional dependencies for paging feature:
 * jquery.wijmo.wijpager.js
 *
 * Optional dependencies for scrolling feature:
 * jquery.wijmo.wijsuperpanel.js
 *
 * Optional dependencies for filtering feature:
 * jquery.wijmo.wijinputdate.js
 * jquery.wijmo.wijinputmask.js
 * jquery.wijmo.wijinputnumber.js
 * jquery.wijmo.wijlist.js
 *
 */

(function ($) {
	$.widget("wijmo.wijgrid", {
		options: {
			/// <summary>
			/// A value indicating whether columns can be sized.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ allowColSizing: false });
			/// </summary>
			allowColSizing: false,

			/// <summary>
			/// A value indicating whether keyboard navigation is allowed.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ allowKeyboardNavigation: false });
			/// </summary>
			allowKeyboardNavigation: false,

			/// <summary>
			/// A value indicating whether the widget can be paged.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ allowPaging: false });
			/// </summary>
			allowPaging: false,

			/// <summary>
			/// A value indicating whether the widget can be sorted.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ allowSorting: false });
			/// </summary>
			allowSorting: false,

			/// <summary>
			/// A value indicating whether editing is enabled.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ allowEditing: false });
			/// </summary>
			allowEditing: false,

			/// <summary>
			/// An array of column options.
			/// Default: [].
			/// Type: Array.
			/// Code example: $("#element").wijgrid({ columns: [ { headerText: "column0", allowSorting: false }, { headerText: "column1", dataType: "number" } ] });
			/// </summary>
			columns: [],

			/// <summary>
			/// Determines the culture ID.
			/// Default: "".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ culture: "en" });
			/// </summary>
			culture: "",

			/// <summary>
			/// An array of custom user filters.
			///
			/// Custom user filter is an object which contains the following properties:
			///   name - operator name.
			///   arity - the number of filter operands. Can be either 1 or 2.
			///   css - the name of the CSS-class determining filter icon. If no value is set, then "filter-<name.toLowerCase()>" class is used.
			///   applicableTo - an array of datatypes to which the filter can be applied. Possible values for elements of the array are "string", "number", "datetime", "currency" and "boolean".
			///   operator - Comparsion operator, the number of accepted parameters depends upon the arity. The first parameter is a data value, the second parameter is a filter value.
			///
			/// Default: [].
			/// Type: Array.
			/// Code example:
			///
			///   var oddFilterOp = {
			///     name: "customOperator-Odd",
			///     arity: 1,
			///     applicableTo: ["number"],
			///     operator: function(dataVal) { return (dataVal % 2 !== 0); }
			///  }
			///
			///  $("#element").wijgrid({ customFilterOperators: [oddFilterOp] });
			/// </summary>
			customFilterOperators: [],

			/// <summary>
			/// Determines the datasource.
			/// Possible datasources include:
			///
			///   1. A DOM table. This is the default datasource, used if the data option is null.
			///     Table must be contained in a DOM element to which wijgrid is attached, must have no cells with rowSpan and colSpan attributes.
			///   2. A two-dimensional array, such as [[0, "a"], [1, "b"]]
			///   3. An array of hashes, such as [{field0: 0, field1: "a"}, {field0: 1, field1: "b'}]
			///   4. A wijdatasource
			///
			/// Type: Object.
			/// Default: null
			/// Code example:
			/// /* DOM table */
			/// $("#element").wijgrid();
			///
			/// /* two-dimensional array */
			/// $("#element").wijgrid({ data: [[0, "a"], [1, "b"]] });
			/// <summary>
			data: null,

			/// <summary>
			/// Determines the order of items in the filter dropdown list.
			/// Possible values are: "none", "alphabetical", "alphabeticalCustomFirst" and "alphabeticalEmbeddedFirst"
			///
			/// "none" - operators follow the order of addition, built-in operators goes before custom ones.
			/// "alphabetical" - operators are sorted alphabetically.
			/// "alphabeticalCustomFirst" - operators are sorted alphabetically with custom operators going before built-in ones.
			/// "alphabeticalEmbeddedFirst" - operators are sorted alphabetically with built-in operators going before custom operators.
			///
			/// Note: "NoFilter" operator is always first.
			///
			/// Type: String.
			/// Default: "alphabeticalCustomFirst"
			/// Code example: $("#element").wijgrid({ filterOperatorsSortMode: "alphabeticalCustomFirst" });
			/// </summary>
			filterOperatorsSortMode: "alphabeticalCustomFirst",

			/// <summary>
			/// Determines the indentation of the groups.
			/// Default: 10.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ groupIndent: 10 });
			/// </summary>
			groupIndent: 10,

			/// <summary>
			/// Cell values equal to this property value are considered as null value.
			/// Case-sensitive for built-in parsers.
			/// Default: undefined.
			/// Type: String.
			/// Code example: $("#element").wijgrid({ nullString: "" });
			/// </summary>
			nullString: undefined,

			/// <summary>
			/// Determines the zero-based index of the current page.
			/// The default value is 0.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ pageIndex: 0 });
			/// </summary>
			pageIndex: 0,

			/// <summary>
			/// Number of rows to place on a single page.
			/// The default value is 10.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ pageSize: 10 });
			/// </summary>
			pageSize: 10,

			/// <summary>
			/// Pager settings.
			/// Note: See jquery.wijmo.wijpager.js for more information.
			/// Type: Object.
			/// Default: { mode: "numeric", pageButtonCount: 10, position: "bottom" }.
			/// Code example: $("#element").wijgrid({ pagerSettings: { position: "bottom" } });
			/// </summary>
			pagerSettings: {
				mode: "numeric",
				pageButtonCount: 10,
				position: "bottom"
			},

			/// <summary>
			/// Function used for formatting rows in wijgrid.
			/// Default: undefined,
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ rowFormatter: function(rowObj, rowType, dataRow) { } });
			/// </summary>
			/// <param name="rowObj" type="Array" elementType="Object" elementDomElement="true">One-dimensional array of two elements containing HTMLTableRowElement representing wijgrid row.</param>
			/// <param name="rowType" type="$.wijmo.wijgrid.rowType">Type of the row.</param>
			/// <param name="dataRow" type="Object">Associated data.</param>
			rowFormatter: undefined,

			/// <summary>
			/// Determines the scrolling mode.
			///
			/// Possible values are:
			/// "none": scrolling is not used, staticRowIndex value is ignored.
			/// "auto": scrollbars appear automatically depending upon content size.
			/// "horizontal": horizontal scrollbar is active.
			/// "vertical": vertical scrollbar is active.
			/// "both": both horizontal and vertical scrollbars are active.
			///
			/// Default: "none".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ scrollMode: "none" });
			/// </summary>
			scrollMode: "none",

			/// <summary>
			/// Represents selection behavior.
			/// Possible values are: "none", "singleCell", "singleColumn", "singleRow", "singleRange", "multiColumn", "multiRow" and "multiRange".
			///
			/// "none": selection is turned off.
			/// "singleCell": only a single cell can be selected at the same time.
			/// "singleColumn": only a single column can be selected at the same time.
			/// "singleRow": only a single row can be selected at the same time.
			/// "singleRange": only a single range of cells can be selected at the same time.
			/// "multiColumn": it is possible to select more than one row at the same time using the mouse and the CTRL or SHIFT keys.
			/// "multiRow": it is possible to select more than one row at the same time using the mouse and the CTRL or SHIFT keys.
			/// "multiRange": it is possible to select more than one cells range at the same time using the mouse and the CTRL or SHIFT keys.
			///
			/// Default: "singleRow".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ selectionMode: "singleRow" });
			/// </summary>
			selectionMode: "singleRow",

			/// <summary>
			/// A value indicating whether filter row is visible.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ showFilter: false });
			/// </summary>
			showFilter: false,

			/// <summary>
			/// A value indicating whether the row header is visible.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ showRowHeader: false });
			/// </summary>
			showRowHeader: false,

			/*dma> Commented by YK for removing unsupported options.
			/// <summary>
			/// A value indicating whether the grid view should split content into several views with the ability to resize and scroll each view independently.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ splits: false });
			/// </summary>
			splits: false,

			/// <summary>
			/// Determines the distance in pixels for the vertical splitter. Applicable when the splits option is true.
			/// Default: 50.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ splitDistanceX: 50 });
			/// </summary>
			splitDistanceX: 50,

			/// <summary>
			/// Determines the distance in pixels for the horizontal splitter. Applicable when the splits option is true.
			/// Default: 50.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ splitDistanceY: 50 });
			/// </summary>
			splitDistanceY: 50,

			/// <summary>
			/// Indicates the zero-based  index  of  the column that will be shown on the
			/// left when the grid view scrolled horizontally. Note, that all columns
			/// before the static column will be automatically marked as static, too. Set
			/// this option to false or to any negative value if you want to turn
			/// off the static columns feature.
			///
			/// Default: -1.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ staticColumnIndex: -1 });
			/// </summary>
			staticColumnIndex: -1,*/

			/// <summary>
			/// Indicates whether header is static or not. Static header is always
			/// shown on the top when the wijgrid is scrolled vertically.
			/// Set this option to 0 to turn on the static header feature or to -1 to turn it off.
			///
			/// Default: -1.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ staticRowIndex: -1 });
			/// <summary>
			staticRowIndex: -1,
			/*<dma*/

			key_reverse: false, // infrastructure
			key_pageSize: 10, // infrastructure

			/* --- events --- */

			/// <summary>
			/// The aftercelledit event handler. A function called after editing is completed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ aftercelledit: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cell: gets the edited cell's information.
			/// args.event: event that initiated the cell updating.
			/// args.handled: gets or sets value determining whether the developer finalizes editing of the cell manually.
			///   The default value is false which means that the widget will try to finalize editing of the cell automatically.
			///   If the developer provides a custom editing front end then this property must be set to true.
			/// </param>
			aftercelledit: null,

			/// <summary>
			/// The aftercellupdate event handler. A function called after a cell has been updated.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ aftercellupdate: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cell: gets the edited cell's information.
			/// </param>
			aftercellupdate: null,

			/// <summary>
			/// The beforecelledit event handler. A function called before a cell enters edit mode. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ beforecelledit: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cell: information about the cell to be edited.
			/// args.event: event initiated cell editing.
			/// args.handled: gets or sets a value determining whether developer initiates cell editor(s) manually.
			///   The default value is false which means that widget will trying to provide editing control automatically.
			///   If cells contain custom controls or if developer wants to provide a custom editing front end then he
			///   must set this property to true.
			///</param>
			beforecelledit: null,

			/// <summary>
			/// The beforecellupdate event handler. A function called before a cell is updated.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ beforecellupdate: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cell: gets information of the edited cell.
			/// args.value: returns the new cell value. If the property value is not changed the widget will try to
			///   extract the new cell value automatically. If the developer provides custom editing front end then
			///   the new cell value must be returned within this property.
			/// </param>
			beforecellupdate: null,

			/// <summary>
			/// The currentcellchanging event handler. A function called before the current cell is changed. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ currentcellchanging: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cellIndex: new cell index.
			/// args.rowIndex: new row index.
			/// args.oldCellIndex: old cell index.
			/// args.oldRowIndex: old row index.
			/// </param>
			currentcellchanging: null,

			/// <summary>
			/// The currentcellchanged event handler. A function called after the current cell is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ currentcellchanged: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj relates to this event.</param>
			currentcellchanged: null,

			/// <summary>
			/// The filteroperatorslistshowing event handler. A function called before the filter drop-down list is shown.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ filteroperatorslistshowing: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.operators: An array of filter operators.
			/// </param>
			filteroperatorslistshowing: null,

			/// <summary>
			/// The groupaggregate event handler. A function called when groups are being created and the "aggregate" option of the column object has been set to "custom".
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ groupaggregate: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.data: data object.
			/// args.column: column that is being grouped.
			/// args.groupByColumn: column initiated grouping.
			/// args.groupText: text that is being grouped.
			/// args.text: text that will be displayed in the group header or group footer.
			/// args.groupingStart: first index for the data being grouped.
			/// args.groupingEnd: last index for the data being grouped.
			/// args.isGroupHeader: indicates whether row that is being grouped is a group header or not.
			/// </param>
			groupaggregate: null,

			/// <summary>
			/// The grouptext event handler. A function called when groups are being created and the groupInfo.headerText or groupInfo.FooterText of the groupInfo option has been set to "custom".
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ grouptext: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.data: data object.
			/// args.column: column that is being grouped.
			/// args.groupByColumn: column initiated grouping.
			/// args.groupText: text that is being grouped.
			/// args.text: text that will be displayed in the group header or group footer.
			/// args.groupingStart: first index for the data being grouped.
			/// args.groupingEnd: last index for the data being grouped.
			/// args.isGroupHeader: indicates whether the row that is being grouped is a group header or not.
			/// args.aggregate: aggregate value.
			/// </param>
			grouptext: null,

			/// <summary>
			/// The invalidcellvalue event handler. A function called when a cell needs to start updating but the cell value is invalid.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ invalidcellvalue: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.cell: gets the information of edited cell.
			/// args.value: current value.
			/// </param>
			invalidcellvalue: null,

			/// <summary>
			/// The pageindexchanging event handler. A function called before page index is changed. Cancellable.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ pageindexchanging: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.newPageIndex: new page index.
			/// </param>
			pageindexchanging: null,

			/// <summary>
			/// The pageindexchanged event handler. A function called after page index is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ pageindexchanged: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			pageindexchanged: null,

			/// <summary>
			/// The selectionchanged event handler. A function called after the selection is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ selectionchanged: function (e, args) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.addedCells: cells added to the selection.
			/// args.removedCells: cells removed from the selection.
			/// </param>
			selectionchanged: null,

			/// <summary>
			/// The sorting event handler. A function called before the sorting operation is started. Cancellable.
			/// Type: Function.
			/// Default: null.
			/// Code example: $("#element").wijgrid({ sorting: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>
			sorting: null,

			/// <summary>
			/// The sorted event handler. A function called after the widget is sorted.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ sorted: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="EventObj">EventObj that relates to this event.</param>            
			sorted: null
		},

		/*getOptionsCopy: function () {
		this._ownerise(false);
		this._widgetsToOptions();
		this._ownerise(true);
		return this.options;
		},*/

		_staticColumnIndex: -1,

		_ajaxError: function (xhttpr, textStatus, error) {
			this.outerDiv.removeClass("wijmo-wijgrid-loading");
		},

		_dataLoading: function (userData) {
			this.outerDiv.addClass("wijmo-wijgrid-loading");
		},

		_dataLoaded: function (userData) {
			this.outerDiv.removeClass("wijmo-wijgrid-loading");
			this._requiresDataBinding = false;
			this.doRefresh(userData);
		},

		// 
		_ensureControl: function (userData) {
			userData = {
				data: null,
				callback: $.isFunction(userData) ? userData : null
			};

			if (this._initialized) {
				this._ownerise(false);
				this._widgetsToOptions();
			} else {
				this._prepareColumnsOptions(); // prepare static columns
			}

			this._ownerise(true);

			if (this._requiresDataBinding) {
				this._dataStore.load(userData);
			} else {
				this.doRefresh(userData);
			}
		},

		doRefresh: function (userData) {
			/// <summary>
			/// Re-renders wijgrid.
			/// Code example: $("#element").wijgrid("doRefresh");
			/// </summary>

			if (!this._initialized) {
				try {
					this._prepareColumnsOptions(); // // prepare static and dynamic columns
				}
				catch (e) {
					throw e;
				}
				finally {
					this._initialized = true;
				}
			}

			this._rebuildLeaves(); //  build leaves, visible leaves, set dataIndex etc

			var dataSlice = this._dataStore.getDataSlice(),
				table = dataSlice.data,
				pageCount, leaves, ri, rowsLen, dataItem, newItem, i, len, leaf, dataVal;

			if (this.options.allowPaging) {
				pageCount = Math.ceil(dataSlice.totalRows / this.options.pageSize) || 1;
				this._field("pageCount", pageCount);
			}

			leaves = this._field("leaves");
			this.dataTable = [];
			for (ri = 0, rowsLen = table.length; ri < rowsLen; ri++) {
				dataItem = table[ri];
				newItem = [];

				for (i = 0, len = leaves.length; i < len; i++) {
					leaf = leaves[i];

					if ($.wijmo.wijgrid.validDataKey(leaf.dataKey)) {
						dataVal = dataItem[leaf.dataKey];

						newItem.push({
							value: dataVal.value,
							originalRowIndex: dataVal.originalRowIndex
						});
					}
				}

				newItem.rowType = $.wijmo.wijgrid.rowType.data;
				if (ri % 2 !== 0) {
					newItem.rowType |= $.wijmo.wijgrid.rowType.dataAlt;
				}

				newItem.__style = {};
				newItem.__attr = {};

				this.dataTable.push(newItem);
			}

			this._refresh();

			if (userData && userData.callback) {
				userData.callback();
			}
		},

		_prepareColumnsOptions: function () {
			$.wijmo.wijgrid.traverse(this.options.columns, function (column) {
				column.isBand = ($.isArray(column.columns) || (column.clientType === "c1band"));
			});

			// set .isLeaf
			new $.wijmo.wijgrid.bandProcessor()._getVisibleHeight(this.options.columns, true);

			// prepare leaves
			var leaves = $.wijmo.wijgrid.getAllLeaves(this.options.columns),
				fieldsCount, boundedToDOM,
				headerRow = null,
				delta, i, defOptions, availableFieldKeys, leavesWithEmptyDataKey, len,
				leaf, dataKey, key, flag, thIndex;

			if (this._dataStore.isLoaded()) {
				fieldsCount = this._dataStore.getFieldsCount();
				boundedToDOM = this._dataStore.dataMode() === $.wijmo.wijgrid.dataMode.dom;

				if (boundedToDOM) {
					if (this._field("thead") && this._field("thead").length) {
						headerRow = this._field("thead")[0];
					}
					fieldsCount = Math.max(headerRow ? headerRow.length : 0, fieldsCount);
				}

				// create autogenerated columns
				delta = fieldsCount - leaves.length;
				for (i = 0; i < delta; i++) {
					defOptions = $.extend(true, {}, $.wijmo.c1basefield.prototype.options, $.wijmo.c1field.prototype.options);
					defOptions = $.extend({ dynamic: true, isLeaf: true }, defOptions);
					this.options.columns.push(defOptions);
				}

				this._extendColumnOptions(); // attach dataParsers, merge with defaults etc.
			} // if (this._dataStore.isLoaded())

			$.wijmo.wijgrid.setTraverseIndex(this.options.columns);

			// * build "pure" leaves list
			leaves = [];
			$.wijmo.wijgrid.traverse(this.options.columns, $.proxy(function (column) {
				if (column.isLeaf && !column.isBand) {
					leaves.push(column);
				}
			}, this));

			if (this._dataStore.isLoaded()) {
				// * assume dataKey *
				availableFieldKeys = this._dataStore.getFieldsNames();

				leavesWithEmptyDataKey = [];
				for (i = 0, len = leaves.length; i < len; i++) {
					leaf = leaves[i];
					dataKey = leaf.dataKey;

					if ($.wijmo.wijgrid.validDataKey(dataKey)) {
						if (typeof (dataKey) === "string") {
							dataKey = dataKey.toLowerCase();
						}

						if (availableFieldKeys[dataKey]) {
							delete availableFieldKeys[dataKey];
						}
					} else {
						leavesWithEmptyDataKey.push(leaf);
					}
				}

				i = 0;
				for (key in availableFieldKeys) {
					if (availableFieldKeys.hasOwnProperty(key)) {
						dataKey = availableFieldKeys[key];
						if (!isNaN(dataKey)) {
							dataKey = parseInt(dataKey, 10);
						}

						leaf = leavesWithEmptyDataKey[i++];
						if (leaf) {
							leaf.dataKey = dataKey;
						}
					}
				}

				// assume headerText
				for (i = 0, len = leaves.length; i < len; i++) {
					leaf = leaves[i];
					if (leaf.headerText === undefined) {
						flag = false;

						if (boundedToDOM) {
							thIndex = (typeof (leaf.dataKey) === "number")
							  ? leaf.dataKey
							  : i;

							if (headerRow && thIndex < headerRow.length) {
								leaf.headerText = headerRow[thIndex]; // copy th value
								flag = true;
							}
						}

						if (!flag) {
							if ($.wijmo.wijgrid.validDataKey(leaf.dataKey)) {
								leaf.headerText = "" + leaf.dataKey; // copy data key value
							}
						}
					}
				} // for i
			} // if (this._dataStore.isLoaded())

			this._field("leaves", leaves);
		},

		_rebuildLeaves: function () {
			var tmpColumns = [],
				leaves = [],
				visLeavesIdx = 0,
				dataIndex = 0;

			if (this.options.showRowHeader) {  // append rowHeader
				tmpColumns.push($.extend({ dynamic: true, clientType: "c1basefield", dataIndex: -1, travIdx: -1,
					parentVis: true, visible: true, isLeaf: true, isBand: false, owner: this
				}, $.wijmo.c1basefield.prototype.options, { allowSizing: false }));
			}

			$.each(this.options.columns, function (index, item) {
				tmpColumns.push(item); // append columns
			});

			// generate span table and build leaves
			this._field("spanTable", new $.wijmo.wijgrid.bandProcessor().generateSpanTable(tmpColumns, leaves));
			this._field("leaves", leaves);

			// build visible leaves list and set dataIndex
			this._field("visibleLeaves", $.grep(leaves, function (leaf, index) {
				leaf.leavesIdx = index;

				if ($.wijmo.wijgrid.validDataKey(leaf.dataKey)) {
					leaf.dataIndex = dataIndex++;
				} else {
					leaf.dataIndex = -1;
				}

				if (leaf.parentVis) {
					leaf.visLeavesIdx = visLeavesIdx++;
					return true;
				}

				return false;
			}));
		},

		_create: function () {
			this.rendered = false;

			// initialize data
			this._requiresDataBinding = true;
			this._dataStore = new $.wijmo.wijgrid.dataStore(this);

			if (!this.element.is("table")) {
				throw "invalid markup";
			}

			//this.element.addClass("ui-widget wijmo-wijgrid ui-widget-content ui-corner-all");
			this.element.addClass("wijmo-wijgrid-root");
			this.element.wrap("<div class=\"ui-widget wijmo-wijgrid ui-widget-content ui-corner-all\"></div>");
			this.outerDiv = this.element.parent();

			// -
			//this.outerDiv.css({ "height": this.element.css("height"), "width": this.element.css("width") });
			if (this.element[0].style.height) {
				this.outerDiv.css("height", this.element[0].style.height);
			}

			if (this.element[0].style.width) {
				this.outerDiv.css("width", this.element[0].style.width);
			}

			this.element.css({ "height": "", "width": "" });
			// -

			this.filterOperatorsCache = new $.wijmo.wijgrid.filterOperatorsCache();

			// process build-in filtering operators
			this._registerFilterOperator($.wijmo.wijgrid.embeddedFilters);

			if (this.options.disabled) {
				this.disable();
			}

			// cell formatter
			this.cellFormatter = new $.wijmo.wijgrid.cellFormatterHelper();
		},

		_init: function () {
			__wijReadOptionEvents(["currentcellchanging", "currentcellchanged", "filteroperatorslistshowing",
				 "groupaggregate", "grouptext",
				 "pageindexchanging", "pageindexchanged", "selectionchanged", "sorting", "sorted",
				 "beforecelledit", "beforecellupdate", "aftercellupdate", "aftercelledit", "invalidcellvalue"], this);

			this.$topPagerDiv = null;
			this.$bottomPagerDiv = null;

			// processing custom filtering operators
			this.filterOperatorsCache.removeCustom();
			$.each(this.options.customFilterOperators, function (index, value) {
				value.custom = true;
			});
			this._registerFilterOperator(this.options.customFilterOperators);

			// culture
			this._field("closestCulture", $.findClosestCulture(this.options.culture));

			// read tHead section

			if (this.options.data === null && // dataSource is a domTable
				!this._field("thead")) {
				this._field("thead", new $.wijmo.wijgrid.htmlTableDataReader(this).readTHead());
			}

			this._initialized = false;
			this._ensureControl();
		},

		_setOption: function (key, value) {
			var presetFunc = this["_preset_" + key],
				oldValue = this.options[key],
				optionChanged, postsetFunc;

			if (presetFunc !== undefined) {
				value = presetFunc.apply(this, [value, oldValue]);
			}

			optionChanged = (value !== oldValue);

			$.Widget.prototype._setOption.apply(this, arguments); // update this.options

			if (optionChanged) {
				postsetFunc = this["_postset_" + key];
				if (postsetFunc !== undefined) {
					postsetFunc.apply(this, [value, oldValue]);
				}
			}
		},

		destroy: function () {
			///	<summary>
			///	Destroy wijgrid widget and reset the DOM element.
			/// Code example: $("#element").wijgrid("destroy");
			///	</summary>

			this._detachEvents();

			var tmp;

			if (tmp = this._field("resizer")) {
				tmp.dispose();
			}

			$.wijmo.wijgrid.iterateChildrenWidgets(this.outerDiv, function (index, widget) {
				// todo
				widget.destroy();
			});

			// YK: destroy outer div after restoring element.
			this.element.insertBefore(this.outerDiv);
			this.outerDiv.remove();

			if (tmp = this._field("selectionui")) {
				tmp.dispose();
			}

			this.element
				.removeData("closestCulture")
				.removeData("columns")
				.removeData("currentCell")
				.removeData("headerRowsAccessor")
				.removeData("leaves")
				.removeData("resizer")
				.removeData("selection")
				.removeData("selectionui")
				.removeData("spanTable")
				.removeData("view")
				.removeData("visibleLeaves");

			$.Widget.prototype.destroy.apply(this, arguments);
		},

		// * public
		columns: function () {
			/// <summary>
			/// Returns a one-dimensional array of widgets bound to visible column headers.
			/// Code example: var colWidgets = $("#element").wijgrid("columns");
			/// </summary>
			/// <returns type="Array" elementType="$.wijmo.c1basefield">A one-dimensional array of widgets bound to visible column headers.</returns>
			return this._field("columns") || [];
		},

		currentCell: function (cellInfo /* cellIndex */, rowIndex /* opt */) {
			/// <summary>
			/// Gets or sets the current cell for the grid.
			/// Note: Use (-1, -1) value to hide the current cell.
			/// Code example:
			/// -) Getter:
			///   var current = $("#element).wijgrid("currentCell");
			/// -) Setter:
			///   $("#element).wijgrid("currentCell", new $.wijmo.wijgrid.cellInfo(0, 0));
			///   or
			///   $("#element).wijgrid("currentCell", 0, 0);
			/// </summary>
			/// <param name="cellInfo" type="$.wijmo.wijgrid.cellInfo">Object that represents a single cell.</param>
			/// <param name="cellIndex" type="Number" integer="true" optional="true">Zero-based index of the required cell inside the corresponding row.</param>
			/// <param name="rowIndex" type="Number" integer="true" optional="true">Zero-based index of the row that contains required cell.</param>
			/// <returns type="$.wijmo.wijgrid.cellInfo">Object that represents current cell of the grid</returns>

			var currentCell;

			if (arguments.length === 0) { // getter
				currentCell = this._field("currentCell");
				if (!currentCell) {
					this._field("currentCell", currentCell = $.wijmo.wijgrid.cellInfo.prototype.outsideValue);
				}
				return currentCell;
			} else { // setter

				currentCell = (arguments.length === 1)
					? cellInfo._clone()
					: new $.wijmo.wijgrid.cellInfo(cellInfo, rowIndex);

				if (!currentCell.isEqual($.wijmo.wijgrid.cellInfo.prototype.outsideValue)) {
					if (!currentCell._isValid()) {
						throw "invalid arguments";
					}

					currentCell._clip(this._getDataCellsRange());
				}

				currentCell._setGridView(this);

				this._changeCurrentCell(currentCell);

				return this._field("currentCell");
			}
		},

		data: function () {
			/// <summary>
			/// Gets a array of the underlying data.
			/// Code example: var data = $("#element").wijgrid("data");
			/// </summary>
			/// <returns type="Array"></returns>
			return this._dataStore.dataSource().items;
		},

		selection: function () {
			/// <summary>
			/// Gets an object that manages selection in the grid.
			/// Code example:
			///   var selection = $("#element").wijgrid("selection");
			/// </summary>
			/// <returns type="$.wijmo.wijgrid.selection">Object that manages selection in the grid.</returns>
			var selection = this._field("selection");
			if (!selection) {
				this._field("selection", selection = new $.wijmo.wijgrid.selection(this));
			}
			return selection;
		},

		beginEdit: function () {
			/// <summary>
			/// Puts the current cell in editing mode.
			/// Note: works only if the allowEditing option is set to true.
			/// Code example: $("#element").wijgrid("beginEdit");
			/// </summary>
			/// <returns type="Boolean">True if the cell is successfully put in edit mode, otherwise false.</returns>
			return this._beginEditInternal(null);
		},

		endEdit: function () {
			/// <summary>
			/// Finishes editing the current cell.
			/// Code example: $("#element").wijgrid("endEdit");
			/// </summary>
			return this._endEditInternal(null);
		},

		pageCount: function () {
			/// <summary>
			/// Gets the number of pages.
			/// Code example:
			/// var pageCount = $("#element").wijgrid("pageCount");
			/// </summary>
			/// <returns type="Number" integer="true">True if the cell is successfully put in edit mode, otherwise false.</returns>
			return this._field("pageCount") || 1;
		},

		// * public

		_headerRows: function () {
			var accessor = this._field("headerRowsAccessor"),
				bottomOffset;

			if (!accessor) {
				bottomOffset = this.options.showFilter ? 1 : 0;
				this._field("headerRowsAccessor", accessor = new $.wijmo.wijgrid.rowAccessor(this._field("view"), 1 /* thead */, 0, bottomOffset));
			}

			return accessor;
		},

		_filterRow: function () {
			if (this.options.showFilter) {
				var tHeadAccessor = new $.wijmo.wijgrid.rowAccessor(this._field("view"), 1 /* thead */, 0, 0);
				return tHeadAccessor.item(tHeadAccessor.length() - 1); // filter is the last row in the tHead section
			}

			return null;
		},

		_rows: function () {
			var accessor = this._field("rowsAccessor");
			if (!accessor) {
				this._field("rowsAccessor", accessor = new $.wijmo.wijgrid.rowAccessor(this._field("view"), 2 /* tbody */, 0, 0));
			}

			return accessor;
		},

		_selectionui: function () {
			var selectionui = this._field("selectionui");
			if (!selectionui) {
				this._field("selectionui", selectionui = new $.wijmo.wijgrid.selectionui(this));
			}

			return selectionui;
		},

		_registerFilterOperator: function (value) {
			var i, len;

			if (value && $.isArray(value)) {
				for (i = 0, len = value.length; i < len; i++) {
					this.filterOperatorsCache.add(value[i]);
				}
			}
			else {
				for (i = 0, len = arguments.length; i < len; i++) {
					this.filterOperatorsCache.add(arguments[i]);
				}
			}
		},

		//

		// * propeties (pre-\ post-)
		_postset_allowSorting: function (value, oldValue) {
			this._ensureControl();
		},

		_postset_columns: function (value, oldValue) {
			throw "read-only";
		},

		_postset_allowPaging: function (value, oldValue) {
			this._requiresDataBinding = true;
			this._ensureControl();
		},

		_postset_culture: function (value, oldValue) {
			//this._field("closestCulture", $.findClosestCulture(this.options.culture));
			throw "read-only";
		},

		_postset_customFilterOperators: function (value, oldValue) {
			this.filterOperatorsCache.removeCustom();
			$.each(this.options.customFilterOperators, function (index, value) {
				value.custom = true;
			});
			this._registerFilterOperator(value);
		},

		_postset_data: function (value, oldValue) {
			throw "read-only";
		},

		_postset_disabled: function (value, oldValue) {
			// update children widgets
			$.wijmo.wijgrid.iterateChildrenWidgets(this.outerDiv, function (index, widget) {
				widget.option("disabled", value);
			});
		},

		_postset_groupIndent: function (value, oldValue) {
			this._ensureControl();
		},

		_preset_pageIndex: function (value, oldValue) {
			if (isNaN(value)) {
				throw "out of range";
			}

			var pageCount = this.pageCount();
			if (value > pageCount - 1) {
				value = pageCount - 1;
			}

			if (value < 0) {
				value = 0;
			}

			if (this.options.allowPaging && value !== oldValue) {
				if (!this._trigger("pageindexchanging", null, { newPageIndex: value })) {
					value = oldValue;
				}
			}

			return value;
		},

		_postset_pageIndex: function (value, oldValue) {
			if (this.options.allowPaging) {

				this._requiresDataBinding = true;
				this._ensureControl($.proxy(function () {
					this._trigger("pageindexchanged", null);
				}, this)
				);
			}
		},

		_preset_pageSize: function (value, oldValue) {
			if (isNaN(value)) {
				throw "out of range";
			}

			if (value <= 0) {
				value = 1;
			}

			return value;
		},

		_postset_pageSize: function (value, oldValue) {
			this.options.pageIndex = 0;

			if (this.options.allowPaging) {
				this._requiresDataBinding = true;
				this._ensureControl();
			}
		},

		_postset_pagerSettings: function (value, oldValue) {
			this._ensureControl();
		},

		_postset_scrollMode: function (value, oldValue) {
			if (value === "none" || oldValue === "none") { // wijsuperpanel is enabled or disabled.
				this._ensureControl();
			} else { // wijsuperpanel is used, updating it.
				// refresh panel.
				this._field("view").refreshPanel();
			}
		},

		_postset_selectionMode: function (value, oldValue) {
			var selection = this.selection(),
				currentCell = this.currentCell();

			selection.beginUpdate();

			selection.clear();

			if (currentCell && currentCell._isValid()) {
				selection._selectRange(new $.wijmo.wijgrid.cellInfoRange(currentCell, currentCell), false, false, 0 /* none */, null);
			}

			selection.endUpdate();
		},

		_postset_showFilter: function (value, oldValue) {
			this._ensureControl();
		},

		_postset_showRowHeader: function (value, oldValue) {
			this._ensureControl();
		},

		_postset_staticRowIndex: function () {
			if (this.options.scrollMode !== "none") { // staticRowIndex is ignored when scrolling is turned off.
				this._ensureControl();
			}
		},
		/*_postset_staticColumnIndex: function() {
		//this._refresh(0);
		this._ensureControl(0);
		},*/

		// * propeties (pre-\ post-)

		// * private
		_columnWidgetsFactory: function ($node, columnOpt) {
			var columnWidget,
				clientType = columnOpt.clientType;

			if (!clientType && columnOpt.isBand) {
				clientType = "c1band";
			}

			//columnOpt.owner = this;
			columnOpt = $.extend({ owner: this }, columnOpt, { disabled: this.options.disabled });

			switch (clientType) {
				case "c1basefield":
					columnWidget = $node.c1basefield(columnOpt);
					break;

				case "c1boundfield":
					columnWidget = $node.c1boundfield(columnOpt);
					break;

				case "c1band":
					columnWidget = $node.c1band(columnOpt);
					break;

				default:
					columnWidget = $node.c1field(columnOpt);
			}

			//columnWidget.data("owner", this);

			return columnWidget;
		},

		_field: function (name, value) {
			if (arguments.length === 1) {
				return this.element.data(name);
			}

			return this.element.data(name, value);
		},

		_extendColumnOptions: function () {
			$.wijmo.wijgrid.traverse(this.options.columns, $.proxy(function (column) {
				column.isBand = ($.isArray(column.columns) || (column.clientType === "c1band"));

				$.wijmo.wijgrid.shallowMerge(column, $.wijmo.c1basefield.prototype.options); // merge with the c1basefield default options

				if (!column.isBand) {
					$.wijmo.wijgrid.shallowMerge(column, $.wijmo.c1field.prototype.options); // merge with the c1field default options
					if (!column.clientType) {
						column.clientType = "c1field";
					}

					// attach data parser
					switch (column.dataType) {
						case undefined: // default parser
						case "string":
							if (!column.dataParser) {
								column.dataParser = wijgridStringParser;
							}
							break;

						case "boolean":
							if (!column.dataParser) {
								column.dataParser = wijgridBoolParser;
							}
							break;

						case "number":
							if (!column.dataParser) {
								column.dataParser = wijgridNumberParser;
							}
							break;

						case "currency":
							if (!column.dataParser) {
								column.dataParser = wijgridCurrencyParser;
							}
							break;

						case "datetime":
							if (!column.dataParser) {
								column.dataParser = wijgridDateTimeParser;
							}
							break;

						default:
							throw $.wijmo.wijgrid.stringFormat("Unsupported dataType value: \"{0}\"", column.dataType);
					}

					if ($.isFunction(column.dataParser)) {
						column.dataParser = new column.dataParser();
					}
				} else {
					column.clientType = "c1band";
				}
			}, this));
		},

		_buildFilterInfo: function (isLocal) {
			var leaves = this._field("leaves"),
				result;

			if (!leaves) {
				return [];
			}

			result = $.map(leaves, $.proxy(function (element, index) {
				if (!element.isBand && ($.wijmo.wijgrid.validDataKey(element.dataKey)/*element.dataIndex >= 0*/) && element.filterOperator) {
					var opName = element.filterOperator.toLowerCase(),
						operator;

					// check operator name
					if (opName !== "nofilter" && (operator = this.filterOperatorsCache.getByName(opName))) {

						// check dataType
						if ($.inArray(element.dataType || "string", operator.applicableTo) >= 0) {

							// check arity + filterValue
							if (operator.arity === 1 || (operator.arity > 1 && element.filterValue !== undefined)) {
								if (isLocal) {
									return [{ column: element, operator: operator}];
								} else {
									return [{ dataKey: element.dataKey, filterOperator: element.filterOperator, filterValue: element.filterValue}];
								}
							}
						}
					}
				}

				return null;
			}, this));

			return result;
		},

		_buildSortInfo: function (isLocal) {
			var leaves = this._field("leaves"),
				result;

			if (!leaves) {
				return [];
			}

			result = $.map(leaves, function (element, index) {
				var value = null;

				if ((element.visible || element.visible === undefined) && !element.isBand && ($.wijmo.wijgrid.validDataKey(element.dataKey)/*element.dataIndex >= 0*/)) {
					value = (element.sortDirection === "ascending" || element.sortDirection === "descending" || element.sortFlag)
						? [{ dataKey: element.dataKey, sortDirection: element.sortDirection}]
						: null;
				}

				delete element.sortFlag;

				return value;
			});

			return result;
		},

		_widgetsToOptions: function () {
			var colOptionsList = $.wijmo.wijgrid.flatten(this.options.columns);
			$.wijmo.wijgrid.traverse(this.columns(), function (colWidget) {
				var congruentColOption = colOptionsList[colWidget.options.travIdx];
				$.extend(true, congruentColOption, colWidget.options);
			});
		},

		_recreateColumnWidgets: function () {
			$.each(this.columns(), function (index, item) {
				item.destroy();
			});

			var columns = [],
			// tHead = this.$table.find("> thead"),
				headerRows = this._headerRows(),
				visibleColumns, i, len, column, headerRowObj, th, columnWidget;


			if (/* tHead.length*/headerRows && headerRows.length()) {
				visibleColumns = []; // visible bands and leaves

				$.wijmo.wijgrid.traverse(this.options.columns, function (column) {
					if (column.parentVis) {
						visibleColumns.push(column);
					}
				});

				for (i = 0, len = visibleColumns.length; i < len; i++) {
					column = visibleColumns[i];
					//var th = tHead[0].rows[column.thY].cells[column.thX];
					headerRowObj = headerRows.item(column.thY);
					th = new $.wijmo.wijgrid.rowAccessor().getCell(headerRowObj, column.thX);

					columnWidget = this._columnWidgetsFactory($(th), column);
					columns.push(columnWidget.data(columnWidget.data("widgetName"))); // store actual widget instance
				}
			}

			this._field("columns", columns);
		},

		_ownerise: function (flag) {
			if (flag) {
				var self = this;

				$.wijmo.wijgrid.traverse(this.options.columns, function (column) {
					column.owner = self;

					var tmp, i, len;

					if ((tmp = column.groupInfo)) {
						tmp.owner = column;

						if (tmp.expandInfo) {
							for (i = 0, len = tmp.expandInfo.length; i < len; i++) {
								tmp.expandInfo[i].owner = tmp;
							}
						}
					}
				});
			} else {

				$.wijmo.wijgrid.traverse(this.options.columns, function (column) {
					delete column.owner;

					var tmp, i, len;

					if ((tmp = column.groupInfo)) {
						delete tmp.owner;

						if (tmp.expandInfo) {
							for (i = 0, len = tmp.expandInfo.length; i < len; i++) {
								delete tmp.expandInfo[i].owner;
							}
						}
					}
				});
			}
		},

		_updateSplits: function () {
			if (this._field("view").updateSplits !== null) {
				this._field("view").updateSplits();
			}
		},

		/*_updateSplitters: function() {
		if (this._field("view").updateSplittersLocation != null) {
		this._field("view").updateSplittersLocation();
		}

		if (this._field("view").updateSplitAreaBounds != null) {
		this._field("view").updateSplitAreaBounds();
		}
		},*/

		_refresh: function () {
			//$.wijmo.wijgrid.timerOn("refresh");

			this.element.detach();
			this.element.empty();
			this.outerDiv.empty();
			this.outerDiv.append(this.element);

			if (this._field("selectionui")) {
				this._field("selectionui").dispose();
				this._field("selectionui", null);
			}

			if (this._field("headerRowsAccessor")) {
				this._field("headerRowsAccessor", null);
			}

			if (this._field("rowsAccessor")) {
				this._field("rowsAccessor", null);
			}

			if (this._field("resizer")) {
				this._field("resizer").dispose();
			}

			// apply grouping
			new $.wijmo.wijgrid.grouper().group(this, this.dataTable, this._field("leaves"));

			// apply merging
			new $.wijmo.wijgrid.merger().merge(this.dataTable, this._field("visibleLeaves"));

			var view, currentCell, resizer,
				filterEditorsInfo = [];

			// view
			//if (!this.options.splits && (this.options.staticRowIndex >= 0 || this.options.staticColumnIndex >= 0)) {
			// only support fixing row feature in this version.
			if (this.options.scrollMode !== "none" && (this._staticColumnIndex >= 0 || this.options.staticRowIndex >= 0)) {
				this._field("view", view = new $.wijmo.wijgrid.fixedView(this));
			} else {
				this._field("view", view = new $.wijmo.wijgrid.flatView(this));
			}
			view.initialize();

			this._render();

			// (re)create iternal widgets
			this._ownerise(false);
			this._recreateColumnWidgets();
			this._ownerise(true);

			// pager
			if (this.options.allowPaging) {
				// top pager
				if (this.$topPagerDiv) {
					this.$topPagerDiv.wijpager(this._pagerSettings2PagerWidgetSettings());
				}

				// bottom pager
				if (this.$bottomPagerDiv) {
					this.$bottomPagerDiv.wijpager(this._pagerSettings2PagerWidgetSettings());
				}
			}

			// (re)create iternal widgets

			// update css
			//this._updateCss();

			// attach events
			this._attachEvents();

			// currentCell
			$(view.focusableElement()).attr("tabIndex", 0); // to handle keyboard\ focus events

			if (this.currentCell()._isValid()) {
				this.currentCell(this.currentCell());
			} else {
				this.currentCell(new $.wijmo.wijgrid.cellInfo(0, 0));
			}

			// selection
			this._field("selection", null); // always recreate selection object
			currentCell = this.currentCell();
			if (currentCell._isValid()) {
				this.selection()._startNewTransaction(currentCell);
				this.selection()._selectRange(new $.wijmo.wijgrid.cellInfoRange(currentCell, currentCell), false, false, 0 /* none */, null);
			}

			// selection ui
			this._selectionui();

			// initialize resizer
			resizer = new $.wijmo.wijgrid.resizer(this);
			$.wijmo.wijgrid.traverse(this.columns(), function (column) {
				var o = column.options;
				if (o.visible && o.parentVis && o.isLeaf) {
					resizer.addElement(column);
				}
			});
			this._field("resizer", resizer);

			this.rendered = true;

			this._updateSplits(); /*dma*/

			// update filter editors widths
			$.wijmo.wijgrid.traverse(this.columns(), function (colWidget) {
				if (colWidget instanceof $.wijmo.c1field) {
					var width = colWidget._getFilterEditorWidth();
					if (width !== undefined) {
						filterEditorsInfo.push({
							widget: colWidget,
							width: width
						});
					}
				}
			});

			$.each(filterEditorsInfo, function (index, item) {
				item.widget._setFilterEditorWidth(item.width);
			});

			//window.defaultStatus = $.wijmo.wijgrid.timerOff("refresh");            
		},

		_render: function () {
			var view = this._field("view"),
				content;

			view.render(0xFF);

			// YK: for fixing pager is not align to top and bottom when header is fixed.
			content = this.outerDiv;
			if (this.options.scrollMode !== "none") {
				// fixed header content
				if (this.options.staticRowIndex >= 0) {
					content = this.outerDiv.find("div.wijmo-wijgrid-scroller:first");
				}
				else {
					content = this.outerDiv.find(".wijmo-wijgrid-content-area");
				}
			}

			// top pager (top div)
			if (this.$topPagerDiv) {
				if (this.$topPagerDiv.data("wijpager")) {
					this.$topPagerDiv.wijpager("destroy");
				}

				this.$topPagerDiv.remove();
			}

			this.$topPagerDiv = null;

			if (this.options.allowPaging && ((this.options.pagerSettings.position === "top") || (this.options.pagerSettings.position === "topAndBottom"))) {
				if (!this.$topPagerDiv) {
					content.prepend(this.$topPagerDiv = $("<div class=\"wijmo-wijgrid-header wijmo-wijsuperpanel-header ui-widget-header ui-corner-top\"></div>"));
				}
			}

			// bottom pager (bottom div)
			if (this.$bottomPagerDiv) {
				if (this.$bottomPagerDiv.data("wijpager")) {
					this.$bottomPagerDiv.wijpager("destroy");
				}

				this.$bottomPagerDiv.remove();
			}

			this.$bottomPagerDiv = null;

			if (this.options.allowPaging && ((this.options.pagerSettings.position === "bottom") || (this.options.pagerSettings.position === "topAndBottom"))) {
				if (!this.$bottomPagerDiv) {
					content.append(this.$bottomPagerDiv = $("<div class=\"wijmo-wijgrid-footer wijmo-wijsuperpanel-footer ui-state-default ui-corner-bottom\"></div>"));
				}
			}
		},

		/*
		_updateCss: function() {
		var view = this._field("view");

		$.each(view.subTables(), function(index, item) {
		var domTable = item.element();
		$(domTable).addClass("wijmo-wijgrid-table");

		if (domTable.tBodies) {
		var tBody = domTable.tBodies[0];
		if (tBody) {
		$(tBody).addClass("ui-widget-content wijmo-wijgrid-data");
		}
		}
		});

		view.updateCss();
		},*/

		_attachEvents: function () {
			var view = this._field("view"),
				$fe = $(view.focusableElement());

			$fe.bind("keydown." + this.widgetName, $.proxy(this._onKeyDown, this));
			$fe.bind("keypress." + this.widgetName, $.proxy(this._onKeyPress, this));

			$.each(view.subTables(), $.proxy(function (index, element) {
				var domTable = element.element();
				if (domTable) {
					if (domTable.tHead) {
						$(domTable.tHead).bind("click." + this.widgetName, $.proxy(this._onClick, this));
					}

					if (domTable.tBodies.length) {
						$(domTable.tBodies[0])
							.bind("click." + this.widgetName, $.proxy(this._onClick, this))
							.bind("dblclick." + this.widgetName, $.proxy(this._onDblClick, this))
							.bind("mousemove." + this.widgetName, $.proxy(this._onMouseMove, this))
							.bind("mouseout." + this.widgetName, $.proxy(this._onMouseOut, this));
					}
				}
			}, this));

			// attach "onGroupExpandCollapseIconClick" event
			$.each(view.getJoinedTables(true, 0), $.proxy(function (index, item) {
				if (item && typeof (item) !== "number") {
					var domTable = item.element(); // item is a htmlTableAccessor instance

					$(domTable)
						.find("> tbody")
						.find("> tr.wijmo-wijgrid-groupheaderrow > td .wijmo-wijgrid-grouptogglebtn")
						.bind("click." + this.widgetName, $.proxy(this._onGroupBtnClick, this));
				}
			}, this));

			view.attachEvents();
		},

		_detachEvents: function () {
			var view = this._field("view"),
				$fe = $(view.focusableElement()),
				self = this;

			$fe.unbind("." + this.widgetName);

			$.each(view.subTables(), function () {
				var domTable = this.element(); // item (this) is a htmlTableAccessor instance 
				if (domTable) {
					if (domTable.tHead) {
						$(domTable.tHead).unbind("." + self.widgetName);
					}

					if (domTable.tBodies.length) {
						$(domTable.tBodies[0]).unbind("." + self.widgetName);
					}
				}
			});

			// detach "onGroupExpandCollapseIconClick" event
			$.each(view.getJoinedTables(true, 0), function (index, item) {
				if (item && typeof (item) !== "number") {
					$(item.element()) // item (this) is a htmlTableAccessor instance 
						.find("> tbody")
						.find("> tr.wijmo-wijgrid-groupheaderrow > td .wijmo-wijgrid-grouptogglebtn")
						.unbind("." + self.widgetName);
				}
			});

			//view.detachEvents();
		},

		_sortBy: function (columnWidget) {
			if (this.options.allowSorting) {
				columnWidget.options.sortFlag = true; // to use "none" as sort direction if needed.        

				var columns = this.columns(),
					idx = $.inArray(columnWidget, columns);

				if (idx >= 0) {
					$.each(columns, function (index, item) {
						if (item !== columnWidget) {
							item.options.sortDirection = "none";
						}
					});

					//columnWidget.options.sortFlag = false;

					this._requiresDataBinding = true;
					this._ensureControl($.proxy(function () {
						columnWidget.options.sortFlag = false;
					}, this)
					);
				}
			}
		},

		_pagerSettings2PagerWidgetSettings: function () {
			return $.extend({}, this.options.pagerSettings,
				{
					disabled: this.options.disabled,
					pageCount: this.pageCount(),
					pageIndex: this.options.pageIndex,
					pageindexchanging: $.proxy(this._onPagerWidgetPageIndexChanging, this),
					pageindexchanged: $.proxy(this._onPagerWidgetPageIndexChanged, this)
				});
		},

		// * event handlers
		_onPagerWidgetPageIndexChanging: function (sender, args) {
			//return window.confirm("onPageIndexChanging: continue ?");
			args.handled = true;
		},

		_onPagerWidgetPageIndexChanged: function (sender, args) {
			this._setOption("pageIndex", args.newPageIndex);
		},

		_onClick: function (args) {

			if (!this._canInteract() || !args.target) {
				return;
			}

			// info[0] - clicked cell
			// info[1] - wijmo-wijgrid-table
			var info = this._getParentSubTable(args.target, ["td", "th"], this._field("view").subTables()),
				view, clickedCell, $row, clickedCellInfo,
				extendMode = 0, // none
				currentCell, selection;

			if (info) {
				view = this._field("view");
				clickedCell = info[0];

				$row = $(clickedCell).closest("tr");

				if (!($row.is(".wijmo-wijgrid-datarow") || $row.is(".wijmo-wijgrid-headerrow"))) {
					return;
				}

				if (!$row.length) {
					return;
				}

				clickedCellInfo = view.getAbsCellInfo(clickedCell)._dataToAbs(this._getDataToAbsOffset());

				if (clickedCellInfo.cellIndex() < 0 || clickedCellInfo.rowIndex() < 0) { // header cell, rowheader cell or filter cell

					if (clickedCellInfo.rowIndex() >= 0) { // rowheader cell
						// move current cell to the first cell of the clicked row
						clickedCellInfo = new $.wijmo.wijgrid.cellInfo(0, clickedCellInfo.rowIndex());
						extendMode = 2; // extend to row
					} else { // header cell
						// move current cell to the first cell of the clicked column
						clickedCellInfo = new $.wijmo.wijgrid.cellInfo(clickedCellInfo.cellIndex(), 0);
						extendMode = 1; // extend to column
					}
				}

				this._changeCurrentCell(clickedCellInfo);

				currentCell = this.currentCell();
				selection = this.selection();

				if (!args.shiftKey || (!selection._multipleRangesAllowed() && this.options.selectionMode.toLowerCase() !== "singlerange")) {
					selection._startNewTransaction(currentCell);
				}

				selection.beginUpdate();

				if (args.shiftKey && args.ctrlKey) {
					selection._clearRange(new $.wijmo.wijgrid.cellInfoRange(currentCell, currentCell), extendMode);
				} else {
					selection._selectRange(new $.wijmo.wijgrid.cellInfoRange(selection._anchorCell(), currentCell), args.ctrlKey, args.shiftKey, extendMode, null);
				}

				selection.endUpdate();
			}
		},

		_onDblClick: function (args) {
			this._beginEditInternal(args);
		},

		_onGroupBtnClick: function (args) {
			var $row = $(args.target).closest("tr"),
				gh = new $.wijmo.wijgrid.groupHelper(),
				groupInfo = gh.getGroupInfo($row[0]),
				column, group;

			if (groupInfo) {
				column = gh.getColumnByGroupLevel(this._field("leaves"), groupInfo.level);
				if (column) {
					group = column.groupInfo.expandInfo[groupInfo.index];

					if (group.isExpanded) {
						group.collapse(args.shiftKey);
					} else {
						group.expand(args.shiftKey);
					}
					this._field("view").ensureWidth(); /*dma*/
				}
			}
		},

		_onKeyDown: function (args) {
			if (!this._canInteract) {
				return true;
			}

			var tag = args.target.tagName.toLowerCase(),
				canChangePos = false,
				curPos, cell, currentCell, selection;

			if ((tag === "input" || tag === "option" || tag === "select" || tag === "textarea") &&
				 ($(args.target).closest("tr.wijmo-wijgrid-datarow").length === 0)) { // not a datarow ?
				return true;
			}

			if (this.options.allowEditing) {
				if (args.which === 113) { // F2: start editing
					this._beginEditInternal(args);
					return false;
				} else
				// ESC: cancel editing
					if ((args.which === $.ui.keyCode.ESCAPE) && (this.currentCell()._isValid() && this.currentCell()._isEdit())) {
						this._endEditInternal(args);
						return false;
					}
			}

			if (!this.options.allowKeyboardNavigation) {
				return true;
			}

			//switch (args.keyCode) {
			switch (args.which) {
				case $.ui.keyCode.LEFT:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.PAGE_DOWN:
				case $.ui.keyCode.PAGE_UP:
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.TAB:

					curPos = this._getNextCurrencyPos(this._getDataCellsRange(), this.currentCell(), args.keyCode, args.shiftKey);
					canChangePos = this._canMoveToAnotherCell(args.target, args.which); // TODO: add tab navigation

					break;
			}

			if (canChangePos) {
				cell = this._changeCurrentCell(new $.wijmo.wijgrid.cellInfo(curPos.cellIndex, curPos.rowIndex));

				currentCell = this.currentCell();
				selection = this.selection();

				if (!args.shiftKey || (!selection._multipleRangesAllowed() && this.options.selectionMode.toLowerCase() !== "singlerange")) {
					selection._startNewTransaction(currentCell);
				}

				selection.beginUpdate();
				selection._selectRange(new $.wijmo.wijgrid.cellInfoRange(selection._anchorCell(), currentCell), false, args.shiftKey, 0 /* none */, null);
				selection.endUpdate();

				// TODO: tab navigation

				return false; // stop bubbling
			}

			return true;
		},

		_onKeyPress: function (args) {
			if (this._canInteract() && this.options.allowEditing) {
				var charCode = args.which,
					currentCell = this.currentCell(),
					tag, table, domSubTables;

				if (charCode && currentCell._isValid() && !currentCell._isEdit()) {
					tag = args.target.tagName.toLowerCase();

					if (tag !== "input" && tag !== "option" && tag !== "select" && tag !== "textarea") {
						table = $(args.target).closest(".wijmo-wijgrid-table");
						//if (table.length &&  (table[0] === this.$table[0])) {
						if (table.length) {

							domSubTables = $.map(this._field("view").subTables(), function (item, index) {
								return item.element();
							});

							if ($.inArray(table[0], domSubTables) >= 0) {
								if ($.wij.charValidator.isPrintableChar(String.fromCharCode(charCode))) {
									//new $.wijmo.wijgrid.cellEditorHelper().currentCellEditStart(this, args);
									this._beginEditInternal(args);
									return false;
								}
							}
						}
					}
				}
			}
		},

		_onMouseMove: function (args) {
			if (!this._canInteract()) {
				return;
			}

			var view = this._field("view"),
				info = this._getParentSubTable(args.target, ["td", "th"], view.subTables()),
				hoveredCell, $hoveredRow, hoveredCellInfo, rowIndex, rowObj;

			if (info) {
				hoveredCell = info[0];
				$hoveredRow = $(hoveredCell).closest("tr");

				if (!$hoveredRow.length || $hoveredRow.is(".wijmo-wijgrid-foorow") || !($hoveredRow.is(".wijmo-wijgrid-datarow") || $hoveredRow.is(".wijmo-wijgrid-headerrow"))) {
					return;
				}

				hoveredCellInfo = view.getAbsCellInfo(hoveredCell)._dataToAbs(this._getDataToAbsOffset());

				rowIndex = this._field("hoveredRow"); // previous row index
				if (hoveredCellInfo.rowIndex() !== rowIndex) {
					rowObj = this._rows().item(rowIndex);
					if (rowObj) {
						if (rowObj[0]) {
							$(rowObj[0]).removeClass("ui-state-hover");
						}

						if (rowObj[1]) {
							$(rowObj[1]).removeClass("ui-state-hover");
						}
					}
				}

				rowIndex = hoveredCellInfo.rowIndex();
				this._field("hoveredRow", rowIndex);
				//if (rowIndex >= 1) { // yk to inclue the first row.
				if (rowIndex >= 0) {
					rowObj = this._rows().item(rowIndex);
					if (rowObj) {
						if (rowObj[0]) {
							$(rowObj[0]).addClass("ui-state-hover");
						}

						if (rowObj[1]) {
							$(rowObj[1]).addClass("ui-state-hover");
						}
					}
				}
			}
		},

		_onMouseOut: function (args) {
			if ($(args.relatedTarget).closest(".wijmo-wijgrid-data").length === 0) { // remove hovering
				var hovRowIndex = this._field("hoveredRow");
				if (hovRowIndex >= 0) {
					$.each(this._rows().item(hovRowIndex), function (index, item) {
						$(item).removeClass("ui-state-hover");
					});
				}
			}
		},
		// * event handlers


		// * resizing
		_fieldResized: function (fieldWidget, newWidth) {
			if (newWidth <= 0) {
				newWidth = 1;
			}

			fieldWidget.option("width", newWidth);
		},
		// * resizing

		// * currentCell
		_changeCurrentCell: function (cellInfo) {
			var result = null,
				currentCell = this.currentCell(),
				dataRange = this._getDataCellsRange(),
				args, cellEditCompleted;

			// if cellInfo has a valid value
			if ((dataRange._isValid() && dataRange._containsCellInfo(cellInfo)) || (cellInfo.isEqual(cellInfo.outsideValue))) {

				// other cell than current cell
				if (currentCell.cellIndex() !== cellInfo.cellIndex() || currentCell.rowIndex() !== cellInfo.rowIndex()) {
					args = {
						cellIndex: cellInfo.cellIndex(),
						rowIndex: cellInfo.rowIndex(),
						oldCellIndex: currentCell.cellIndex(),
						oldRowIndex: currentCell.rowIndex()
					};

					if (this._trigger("currentcellchanging", null, args)) {

						cellEditCompleted = false;
						if (!this.options.allowEditing || !currentCell._isEdit() || (cellEditCompleted = this._endEditInternal(null))) {
							if (dataRange._containsCellInfo(currentCell)) {
								this._changeCurrentCellUI(currentCell, false); // remove the current one
							}

							currentCell = cellInfo._clone();
							currentCell._setGridView(this);

							result = this._changeCurrentCellUI(currentCell, true);

							this._field("currentCell", currentCell); // set currentCell

							this._trigger("currentcellchanged");
						}
					}
				} else { // the same cell
					result = this._changeCurrentCellUI(currentCell, true); // ensure
				}
			} else { // cellInfo is invalid
				// do nothing

				// this._changeCurrentCellUI(currentCell, false);
				// this._field("currentCell", currentCell.outsideValue); // set currentCell
			}

			return result;
		},

		_changeCurrentCellUI: function (cellInfo, add) {
			if (cellInfo && !cellInfo.isEqual(cellInfo.outsideValue)) {
				var view = this._field("view"),
					leaves = this._field("visibleLeaves"),
					dataOffset = this._getDataToAbsOffset(),
					x = cellInfo.cellIndex() + dataOffset.x,
					y = cellInfo.rowIndex() + dataOffset.y,
					rowObj, cell;

				if (y >= 0) {
					rowObj = view.getJoinedRows(y, 0);
					if (rowObj && rowObj[0] && this.options.showRowHeader) { // activate rowHeader cell
						if (add) {
							$(rowObj[0].cells[0]).addClass("ui-state-active wijmo-wijgrid-currency-rowheadercell");
						} else {
							$(rowObj[0].cells[0]).removeClass("ui-state-active wijmo-wijgrid-currency-rowheadercell");
						}
					}

					if (x >= 0 && x < leaves.length) {
						cell = view.getHeaderCell(x);
						if (cell) { // activate header cell
							if (add) {
								$(cell).addClass("ui-state-active wijmo-wijgrid-currency-headercell");
							} else {
								$(cell).removeClass("ui-state-active wijmo-wijgrid-currency-headercell");
							}
						}

						cell = view.getCell(x, y);
						if (cell) { // activate data cell
							if (add) {
								$(cell).addClass("ui-state-active wijmo-wijgrid-currency-cell");
							} else {
								$(cell).removeClass("ui-state-active wijmo-wijgrid-currency-cell");
							}
						}
					}

					return view.getCell(x, y);
				} // if y >= 0
			}

			return null;
		},
		// * currentCell


		// * editing
		_beginEditInternal: function (e) {
			if (this._canInteract() && this.options.allowEditing) {
				var column = this.currentCell().column(),
					res;

				if (column && !column.readOnly) {
					res = new $.wijmo.wijgrid.cellEditorHelper().currentCellEditStart(this, e);
					if (res) {
						//this._field("view").ensureWidth(undefined, column.visLeavesIdx);
					}
					return res;
				}
			}

			return false;
		},

		_endEditInternal: function (e) {
			if (this._canInteract() && this.options.allowEditing) {
				var column = this.currentCell().column(),
					res = new $.wijmo.wijgrid.cellEditorHelper().currentCellEditEnd(this, e);

				if (res) {
					//this._field("view").ensureWidth(undefined, column.visLeavesIdx);
				}
				return res;
			}

			return false;
		},
		// * editing

		// misc

		_rowCreated: function (row0, row1, rowType, dataRow) {
			if (!row0) {
				row0 = row1;
			}

			if ($.isFunction(this.options.rowFormatter)) {
				this.options.rowFormatter([row0, row1], rowType, dataRow);
			}
		},

		_parseDOM: function (column, value) {
			return column.dataParser.parseDOM(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
		},

		_parse: function (column, value) {
			return column.dataParser.parse(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
		},

		_toStr: function (column, value) {
			return column.dataParser.toStr(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
		},

		_canInteract: function () {
			return !this.options.disabled;
		},

		_canMoveToAnotherCell: function (domElement, keyCode) {
			var tag = domElement.tagName.toLowerCase(),
				len, selectionRange, kc, res;

			switch (tag) {
				case "input":
					if ($(domElement).hasClass("wijgridinput")) {

						if (domElement.type === "text") {
							len = domElement.value.length;
							selectionRange = new $.wijmo.wijgrid.domSelection(domElement).getSelection();

							kc = $.ui.keyCode;

							res = ((keyCode === kc.UP || keyCode === kc.DOWN || keyCode === kc.PAGE_DOWN || keyCode === kc.PAGE_UP) ||
								(selectionRange.length === 0 &&
									(
										(selectionRange.start === 0 && (keyCode === kc.LEFT || keyCode === kc.HOME)) ||
										(selectionRange.end >= len && (keyCode === kc.RIGHT || keyCode === kc.END))
									)
								));

							return res;
						}

						return true;
					}

					return false;

				case "textarea":
				case "select":
					return false;
			}

			return true;
		},

		_getDataToAbsOffset: function () {
			var x = 0,
				y = 0,
				headerRows = this._headerRows();


			if (this.options.showRowHeader) {
				x++;
			}

			if (headerRows) {
				y += headerRows.length();
			}

			if (this._filterRow()) {
				y++;
			}

			//y += this.$table.find("> thead > tr").length;

			return { x: x, y: y };
		},

		_getDataCellsRange: function () {
			var minCol = 0,
				minRow = 0,
				maxCol = this._field("visibleLeaves").length - 1, // = this._field("dataCache").<maxWidth>
				maxRow = this.dataTable.length - 1;

			if (this.options.showRowHeader) {
				maxCol--;
			}

			if (maxCol < 0 || maxRow < 0) {
				minCol = minRow = maxCol = maxRow = -1;
			}

			return new $.wijmo.wijgrid.cellInfoRange(new $.wijmo.wijgrid.cellInfo(minCol, minRow),
				new $.wijmo.wijgrid.cellInfo(maxCol, maxRow));
		},

		_getNextCurrencyPos: function (dataRange, cellInfo, keyCode, shiftKeyPressed) {
			var cellIndex = cellInfo.cellIndex(),
				rowIndex = cellInfo.rowIndex(),
				tmp;

			switch (keyCode) {
				case $.ui.keyCode.PAGE_UP:
					if (this.options.key_reverse && rowIndex === dataRange.topLeft().rowIndex()) {
						rowIndex = dataRange.bottomRight().rowIndex();
					} else {
						rowIndex -= this.options.key_pageSize;

						if (rowIndex < (tmp = dataRange.topLeft().rowIndex())) {
							rowIndex = tmp;
						}
					}
					break;

				case $.ui.keyCode.PAGE_DOWN:
					if (this.options.key_reverse && rowIndex === dataRange.bottomRight().rowIndex()) {
						rowIndex = dataRange.TopLeft().RowIndex();
					}
					else {
						rowIndex += this.options.key_pageSize;

						if (rowIndex > (tmp = dataRange.bottomRight().rowIndex())) {
							rowIndex = tmp;
						}
					}

					break;

				case $.ui.keyCode.END:
					cellIndex = (this.options.key_reverse && cellIndex === dataRange.bottomRight().cellIndex())
						? dataRange.topLeft().cellIndex()
						: dataRange.bottomRight().cellIndex();

					break;

				case $.ui.keyCode.HOME:
					cellIndex = (this.options.key_reverse && cellIndex === dataRange.topLeft().cellIndex())
						? dataRange.bottomRight().cellIndex()
						: dataRange.topLeft().cellIndex();

					break;

				case $.ui.keyCode.LEFT:
					if (cellIndex > dataRange.topLeft().cellIndex()) {
						cellIndex--;
					} else
						if (this.options.key_reverse) {
							cellIndex = dataRange.bottomRight().cellIndex();
						}

					break;

				case $.ui.keyCode.UP:
					if (rowIndex > dataRange.topLeft().rowIndex()) {
						rowIndex--;
					}
					else
						if (this.options.key_reverse) {
							rowIndex = dataRange.bottomRight().rowIndex();
						}

					break;

				case $.ui.keyCode.RIGHT:
					if (cellIndex < dataRange.bottomRight().cellIndex()) {
						cellIndex++;
					}
					else
						if (this.options.key_reverse) {
							cellIndex = dataRange.topLeft().cellIndex();
						}

					break;

				case $.ui.keyCode.ENTER:
				case $.ui.keyCode.DOWN:
					if (rowIndex < dataRange.bottomRight().rowIndex()) {
						rowIndex++;
					}
					else
						if (this.options.key_reverse) {
							rowIndex = dataRange.topLeft().rowIndex();
						}

					break;

				case $.ui.keyCode.TAB:
					if (false /* TODO - tab navigation */) {
						if (shiftKeyPressed) {
							cellIndex--;

							if (cellIndex < dataRange.topLeft().cellIndex()) {

								cellIndex = dataRange.bottomRight().cellIndex();
								rowIndex--;

								if (rowIndex < dataRange.topLeft().rowIndex()) {
									rowIndex = dataRange.bottomRight().rowIndex();
								}
							}
						}
						else {
							cellIndex++;

							if (cellIndex > dataRange.bottomRight().cellIndex()) {
								cellIndex = dataRange.topLeft().cellIndex();
								rowIndex++;

								if (rowIndex > dataRange.bottomRight().rowIndex()) {
									rowIndex = dataRange.topLeft().rowIndex();
								}
							}
						}

					}

					break;
			}

			return { cellIndex: cellIndex, rowIndex: rowIndex };
		},

		_getParentSubTable: function (root, tagsToFind, subTables) {
			var domSubTables = $.map(subTables, function (item, index) {
				return item.element();
			}),
				subTable = null,
				lastCoincidentEl = null,
				tag;

			for (; root !== null && subTable === null; root = root.parentNode) {
				tag = (root.tagName)
					? root.tagName.toLowerCase()
					: undefined;

				if ($.inArray(tag, tagsToFind) >= 0) {
					lastCoincidentEl = root;
				} else {
					//if ($(root).hasClass("wijmo-wijgrid-table")) {
					if ($.inArray(root, domSubTables) >= 0) {
						subTable = root;
					}
				}
			}

			return (lastCoincidentEl && subTable)
				? [lastCoincidentEl, subTable]
				: null;
		},

		_getRealStaticRowIndex: function () {
			//return this.options.staticRowIndex;
			if (this.options.staticRowIndex >= 0) {
				var index = this._field("spanTable").length - 1; //the whole header is fixed in case of staticRowIndex >= 0.
				if (this.options.showFilter) {
					index++; // filter row is placed inside the header, so it is fixed too.
				}

				return index;
			} else {
				return this.options.staticRowIndex;
			}
		}

		// * misc
	});
})(jQuery);
/*
 Provides the base widget for columns in the wijgrid.
*/

(function ($) {
	$.widget("wijmo.c1basefield", {
		options: {
			/// <summary>
			/// A value indicating whether the column can be sized.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [ { allowSizing: true } ] });
			/// </summary>
			allowSizing: true,

			/// <summary>
			/// A value indicating the key of the data field associated with a column.
			/// If an array of hashes is used as a datasource for wijgrid, this should be string value,
			/// otherwise this should be an integer determining an index of the field in the datasource.
			/// Default: undefined
			/// Type: String or Number.
			/// Code example: $("#element").wijgrid({ columns: [ { dataKey: "ProductID" } ] });
			/// <summary>
			dataKey: undefined,

			/// <summary>
			/// Function used for changing content, style and attributes of the column cells.
			/// Default: undefined.
			/// Type: Function.
			/// Code example: $("#element").wijgrid({ columns: [ { cellFormatter: function(container, column, formattedValue, rowType, dataRow) { } } ] });
			/// </summary>
			/// <remarks>
			/// Important: cellFormatter should not alter content of header and filter row cells container.
			/// </remarks>
			/// <param name="container" type="jQuery">jQuery object that represents cell container to format.</param>
			/// <param name="column" type="Object">Options of the formatted column.</param>
			/// <param name="formattedValue" type="String">Formatted value of the cell.</param>
			/// <param name="rowType" type="$.wijmo.wijgrid.rowType">Type of the row associated with the cell.</param>
			/// <param name="dataRow" type="Object">Associated data.</param>
			/// <returns type="Boolean">True if container content has been changed and wijgrid should not apply the default formatting to the cell.</returns>
			cellFormatter: undefined,

			/// <summary>
			/// Gets or sets the header text.
			/// Default: undefined.
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [ { headerText: "column0" } ] });
			/// </summary>
			/// <remarks>
			/// If the value is undefined the header text will be determined automatically depending on the type of the datasource:
			///  DOM table - text in the header cell.
			///  Array of hashes - dataKey (name of the field associated with column).
			///  Two-dimensional array - dataKey (index of the field associated with column).
			/// </remarks>
			headerText: undefined,

			/// <summary>
			/// A value indicating whether column is visible.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [ { visible: true } ] });
			/// </summary>
			visible: true,

			/// <summary>
			/// Determines the width of the column.
			/// Default: undefined.
			/// Type: Number.
			/// Code example: $("#element").wijgrid({ columns: [ { width: 150 } ] });
			/// </summary>
			width: undefined
		},

		_create: function () {
			//$(this.element).data("widgetName", this.widgetName);
			this.element.addClass("ui-widget wijmo-c1basefield ui-state-default");
			this._field("owner", this.options.owner);
			delete this.options.owner;
			this._field("widgetName", this.widgetName);

			if (this.options.disabled) {
				this.disable();
			}
		},

		_init: function () {
			/*if (this.options.headerText === undefined) {
			this.options.headerText = this.element.text();
			}*/

			this.element.text(this.options.headerText);
			this.element.wrapInner("<div class='wijmo-wijgrid-innercell'><span class=\"wijmo-wijgrid-headertext\" /></div>");
		},

		_field: function (name, value) {
			if (arguments.length === 1) {
				return this.element.data(name);
			}

			return this.element.data(name, value);
		},

		_setOption: function (key, value) {
			var presetFunc = this["_preset_" + key],
				oldValue = this.options[key],
				optionChanged, postsetFunc;

			if (presetFunc !== undefined) {
				value = presetFunc.apply(this, [value, oldValue]);
			}

			optionChanged = (value !== oldValue);

			$.Widget.prototype._setOption.apply(this, arguments);

			if (optionChanged) {
				postsetFunc = this["_postset_" + key];
				if (postsetFunc !== undefined) {
					postsetFunc.apply(this, [value, oldValue]);
				}
			}
		},

		_preset_clientType: function (value, oldValue) {
			throw "read-only";
		},

		_postset_headerText: function (value, oldValue) {
			//this._headerTextDOM(value);
		},

		_postset_visible: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_width: function (value, oldValue) {
			var grid = this._field("owner"),
				view = grid._field("view");

			// change width of column.
			view.ensureWidth(value, this.options.visLeavesIdx);
		},

		_canSize: function () {
			return this.options.allowSizing && this._field("owner").options.allowColSizing;
		}
	});
})(jQuery);

/*
provides the base widget for columns in the wijgrid.
*/

(function ($) {
	$.widget("wijmo.c1field", $.wijmo.c1basefield, {
		options: {
			/// <summary>
			/// Causes the grid to calculate aggregate values on the column and place them in the group header and footer rows.
			/// If the grid does not contain any groups, setting the "aggregate" property has no effect.
			/// 
			/// Possible values are: "none", "count", "sum", "average", "min", "max", "std", "stdPop", "var", "varPop" and "custom".
			///
			/// "none": no aggregate is calculated or displayed.
			/// "count": count of non-empty values.
			/// "sum": sum of numerical values.
			/// "average": average of the numerical values.
			/// "min": minimum value (numerical, string, or date).
			/// "max": maximum value (numerical, string, or date).
			/// "std": standard deviation (using formula for Sample, n-1).
			/// "stdPop": standard deviation (using formula for Population, n).
			/// "var": variance (using formula for Sample, n-1).
			/// "varPop": variance (using formula for Population, n).
			/// "custom": custom value (causing grid to throw "groupaggregate" event).
			///
			/// Default: "none".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [{ aggregate: "none" }] });
			/// </summary>
			aggregate: "none",

			/// <summary>
			/// A value indicating whether column can be sorted.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [{ allowSort: true }] });
			/// </summary>
			allowSort: true,

			/// <summary>
			/// Column data type. Used to determine the rules for sorting, grouping, aggregate calculation, and so on.
			/// Possible values are: "string", "number", "datetime", "currency" and "boolean".
			///
			/// "string": if using built-in parser any values are acceptable; "&nbsp;" considered as an empty string, nullString as null.
			/// "number": if using built-in parser only numeric values are acceptable, also "&nbsp;", "" and nullString which are considered as null. Any other value throws an exception.
			/// "datetime": if using built-in parser only date-time values are acceptable, also "&nbsp;", "" and nullString which are considered as null. Any other value throws an exception.
			/// "currency": if using built-in parser only numeric and currency values are acceptable, also "&nbsp;", "" and nullString which are considered as null. Any other value throws an exception.
			/// "boolean": if using built-in parser only "true" and "false" (case-insensitive) values are acceptable, also "&nbsp;", "" and nullString which are considered as null. Any other value throws an exception.
			/// 
			/// Default: "string".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [{ dataType: "string" }] });
			/// </summary>
			dataType: "string",

			/// <summary>
			/// Data converter that is able to translate values from a string representation to column data type and back.
			/// 
			/// The dataParser is an object which must contains the following methods:
			///   parseDOM(value, culture, format): converts given DOM element into the typed value.
			///   parse(value, culture, format): converts the value into typed value.
			///   toStr(value, culture, format): converts the value into its string representation.
			///
			/// Default: undefined (widget built-in parser for supported datatypes will be used).
			/// Type: Object.
			///
			/// Code example:
			///   var myBoolParser = {
			///     parseDOM: function (value, culture, format, nullString) {
			///       return this.parse(value.innerHTML, culture, format, nullString);
			///     },
			///
			///     parse: function (value, culture, format, nullString) {
			///       if (typeof (value) === "boolean")  return value;
			///
			///       if (!value || (value === "&nbsp;") || (value === nullString)) {
			///         return null;
			///       }
			///
			///       switch (value.toLowerCase()) {
			///         case "on": return true;
			///         case "off": return false;
			///       }
			///
			///       return NaN;
			///     },
			///
			///     toStr: function (value, culture, format, nullString) {
			///       if (value === null)  return nullString;
			///       return (value) ? "on" : "off";
			///     }
			///   }
			///
			///   $("#element").wijgrid({ columns: [ { dataType: "boolean", dataParser: myBoolParser } ] });
			/// </summary>
			dataParser: undefined,

			/// <summary>
			/// A pattern used for formatting and parsing column values. See jquery.glob.js for possible values.
			/// The default value is undefined ("n" pattern will be used for "number" dataType, "d" for "datetime", "c" for "currency").
			/// Default: undefined.
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [ { dataType: "number", dataFormatString: "n" } ] });
			/// </summary>
			dataFormatString: undefined,

			/// <summary>
			/// An operation set for filtering. Must be either one of the embedded operators or custom filter operator.
			/// Case insensitive.
			///
			// Embedded filter operators include:
			///   "NoFilter": no filter.
			///   "Contains": applicable to "string" data type.
			///   "NotContain": applicable to "string" data type.
			///   "BeginsWith": applicable to "string" data type.
			///   "EndsWith": applicable to "string" data type.
			///   "Equals": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "NotEqual": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "Greater": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "Less": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "GreaterOrEqual": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "LessOrEqual": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "IsEmpty": applicable to "string".
			///   "NotIsEmpty": applicable to "string".
			///   "IsNull": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///   "NotIsNull": applicable to "string", "number", "datetime", "currency" and "boolean" data types.
			///
			/// Default: "nofilter".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [ { filterOperator: "nofilter" } ] });
			/// </summary>
			filterOperator: "nofilter",

			/// <summary>
			/// A value set for filtering.
			/// Default: undefined.
			/// Type: Depends on column data type.
			/// Code example: $("#element").wijgrid({ columns: [ { filterValue: "abc" } ] });
			/// </summary>
			filterValue: undefined,

			/// <summary>
			/// Using to customize the appearance and position of groups.
			/// Default: {
			///   groupSingleRow: true,
			///   collapsedImageClass: "ui-icon-plus",
			///   expandedImageClass: "ui-icon-minus",
			///   position: "none",
			///   outlineMode: "startExpanded",
			///   headerText: undefined,
			///   footerText: undefined
			/// }
			/// Type: Object.
			/// Code example: $("#element").wijgrid({ columns: [{ groupInfo: { position: "header" }}] });
			/// </summary>
			groupInfo: {
				expandInfo: [], // infrastructure

				/// <summary>
				/// A value indicating whether groupings containing a single row are grouped.
				/// The default value is true.
				/// Type: Boolean.
				/// </summary>
				groupSingleRow: true,

				/// <summary>
				/// Determines the css used to show collapsed nodes on the grid.
				/// The default value is "ui-icon-plus".
				/// Type: String.
				/// </summary>
				collapsedImageClass: "ui-icon-plus",

				/// <summary>
				/// Determines the css used to show expanded nodes on the grid.
				/// The default value is "ui-icon-minus".
				/// Type: String.
				/// </summary>
				expandedImageClass: "ui-icon-minus",

				/// <summary>
				/// Determines whether the grid should insert group header and/or group footer rows for this column.
				///
				/// Possible values are: "none", "header", "footer", "headerAndFooter".
				///  "none" -  disables grouping for the column.
				///  "header" - inserts header rows.
				///  "footer" - inserts footer rows.
				///  "headerAndFooter" - inserts header and footer rows.
				///
				/// The default value is "none".
				/// Type: String.
				/// </summary>
				position: "none",

				/// <summary>
				/// Determines whether the user will be able to collapse and expand the groups by clicking on the group headers,
				/// and also determines whether groups will be initially collapsed or expanded.
				///
				/// Possible values are: "none", "startCollapsed", "startExpanded".
				///  "none" -  disables collapsing and expanding.
				///  "startCollapsed" - groups are initially collapsed.
				///  "startExpanded" - groups are initially expanded.
				///
				/// The default value is "startExpanded".
				/// Type: String.
				/// </summary>
				outlineMode: "startExpanded",

				/// <summary>
				/// Determines the text that is displayed in the group header rows.
				///
				/// The text may include up to three placeholders:
				/// "{0}" is replaced with the value being grouped on.
				/// "{1}" is replaced with the group's column header.
				/// "{2}" is replaced with the aggregate
				///
				/// The text may be set to "custom". Doing so causes the grid grouptext event to be raised when
				/// processing a grouped header.
				///
				/// The default value is undefined.
				/// Type: String.
				/// </summary>
				headerText: undefined,

				/// <summary>
				/// Determines the text that is displayed in the group footer rows.
				///
				/// The text may include up to three placeholders:
				/// "{0}" is replaced with the value being grouped on.
				/// "{1}" is replaced with the group's column header.
				/// "{2}" is replaced with the aggregate
				///
				/// The text may be set to "custom". Doing so causes the grid grouptext event to be raised when
				/// processing a grouped footer.
				///
				/// The default value is undefined.
				/// Type: String.
				/// </summary>
				footerText: undefined
			},

			/// <summary>
			/// A value indicating whether the cells in the column can be edited.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [ { readOnly: false } ] });
			/// </summary>
			readOnly: false,

			/// <summary>
			/// Determines whether rows are merged.
			/// Possible values are: "none", "free" and "restricted".
			///
			/// "none": no row merging.
			/// "free": allows row with identical text to merge.
			/// "restricted": keeps rows with identical text from merging if rows in the previous column are merged.
			/// 
			/// Default: "none".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [{ rowMerge: "none" }] });
			/// </summary>
			rowMerge: "none",

			/// <summary>
			/// A value indicating whether filter editor will be shown in the filter row.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [ { showFilter: true } ] });
			/// </summary>
			showFilter: true,

			/// <summary>
			/// Determines the sort direction.
			/// Possible values are: "none", "ascending" and "descending".
			///
			/// "none": no sorting.
			/// "ascending": sort from smallest to largest.
			/// "descending": sort from largest to smallest.
			/// 
			/// Default: "none".
			/// Type: String.
			/// Code example: $("#element").wijgrid({ columns: [{ sortDirection: "none" }] });
			/// </summary>
			sortDirection: "none",

			/// <summary>
			/// A value indicating whether null value is allowed during editing.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgrid({ columns: [ { valueRequired: false } ] });
			/// </summary>
			valueRequired: false
		},

		_create: function () {
			//$(this.element).data("widgetName", this.widgetName);
			$.wijmo.c1basefield.prototype._create.apply(this, arguments);

			this.element.addClass("ui-widget wijmo-c1field");
		},

		destroy: function () {
			$.wijmo.c1basefield.prototype.destroy.apply(this, arguments);

			if (this.$filterEditor) {
				switch (this.options.dataType) {
					case "number":
					case "currency":
						this.$filterEditor.wijinputnumber("destroy");
						break;

					case "datetime":
						this.$filterEditor.wijinputdate("destroy");
						break;

					default:
						this.$filterEditor.wijinputmask("destroy");
						break;
				}

				this.$filterEditor = null;
			}

			this._removeDropDownFilterList();
		},

		_init: function () {
			$.wijmo.c1basefield.prototype._init.apply(this, arguments);

			this.$filterEditor = null;

			this._refreshHeaderCell();

			var gridView = this._field("owner");

			this.filterRow = gridView._filterRow();
			if (gridView.options.showFilter && this.options.showFilter && (this.options.dataIndex >= 0)) {
				this._prepareFilterCell();
			}
		},

		_setOption: function (key, value) {
			$.wijmo.c1basefield.prototype._setOption.apply(this, arguments);
		},

		_postset_aggregate: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_allowSort: function (value, oldValue) {
			this.element.find("#contentCell").empty();
			//this._headerTextDOM(this.options.headerText);
			this._refreshHeaderCell();
		},

		_postset_dataType: function (value, oldValue) {
			throw "read-only";
		},

		_postset_dataParser: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_dataFormatString: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_filterOperator: function (value, oldValue) {
			this._field("owner")._requiresDataBinding = true;
			this._field("owner")._ensureControl();
		},

		_postset_filterValue: function (value, oldValue) {
			this._field("owner")._requiresDataBinding = true;
			this._field("owner")._ensureControl();
		},

		_postset_groupInfo: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_rowMerge: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		_postset_showFilter: function (value, oldValue) {
			this._field("owner")._ensureControl();
		},

		// + sort direction +
		_preset_sortDirection: function (value, oldValue) {
			var grid = this._field("owner");
			if (!grid._trigger("sorting", null, this)) {
				value = oldValue;
			}

			return value;
		},

		_postset_sortDirection: function (value, oldValue) {
			var grid = this._field("owner");
			grid._sortBy(this);
			grid._trigger("sorted", null, this);
		},

		// - sort direction -

		_postset_width: function (value, oldValue) {
			this._setFilterEditorWidth(1);
			$.wijmo.c1basefield.prototype._postset_width.apply(this, arguments);
			this._setFilterEditorWidth(this._getFilterEditorWidth());
		},

		_canSort: function () {
			var gridView = this._field("owner");
			return (gridView && gridView.options.allowSorting && this.options.allowSort && (this.options.dataIndex >= 0));
		},

		_refreshHeaderCell: function () {
			var $container = this.element.children(".wijmo-wijgrid-innercell").empty(),
				$anchor;

			$container.text(this.options.headerText);

			if (this._canSort()) {
				$container.wrapInner("<a class=\"wijmo-wijgrid-headertext\" href=\"#\" role=\"button\" />");

				$anchor = $container.children("a").bind("click." + this.widgetName, this, this._onHrefClick);

				switch (this.options.sortDirection) { // sorting icon
					case "ascending":
						$anchor.append($("<span class=\"ui-icon ui-icon-triangle-1-n\">ascending</span>"));
						break;

					case "descending":
						$anchor.append($("<span class=\"ui-icon ui-icon-triangle-1-s\">descending</span>"));
						break;
				}
			} else {
				$container.wrapInner("<span class=\"wijmo-wijgrid-headertext\" />");
			}
		},

		_prepareFilterCell: function () {
			var filterCellIndex = this.options.visLeavesIdx,
				gridView = null, filterCell = null, dataValue;

			if (filterCellIndex >= 0) {
				gridView = this._field("owner");

				if (this.filterRow) {
					filterCell = $(new $.wijmo.wijgrid.rowAccessor().getCell(this.filterRow, filterCellIndex));
				} else {
					throw "exception";
				}

				filterCell.find(".wijmo-wijgrid-filtericon").attr("class", this._getFilterOpIconCss(gridView, this.options.filterOperator));
				this.$filterEditor = filterCell.find("input");

				//var editorWidth = this._getFilterEditorWidth();
				//this.$filterEditor.setOutWidth(editorWidth);

				dataValue = gridView._parse(this.options, this.options.filterValue);

				// create editor
				switch (this.options.dataType) {
					case undefined:
						if (dataValue === null) {
							dataValue = "";
						}
						// fall through
					case "boolean":
						if (dataValue === null) {
							dataValue = false;
						}
						// fall through
					case "string": // simple input element
						if (dataValue === null) {
							dataValue = "";
						}

						this.$filterEditor.wijinputmask({ disabled: gridView.options.disabled, text: dataValue });
						break;

					case "number":
						if (dataValue !== null) {
							this.$filterEditor.wijinputnumber({ disabled: gridView.options.disabled, value: dataValue });
						} else {
							this.$filterEditor.wijinputnumber({ disabled: gridView.options.disabled });
						}
						break;

					case "datetime":
						if (dataValue !== null) {
							this.$filterEditor.wijinputdate({ disabled: gridView.options.disabled, date: dataValue });
						} else {
							this.$filterEditor.wijinputdate({ disabled: gridView.options.disabled });
						}
						break;

					case "currency":
						if (dataValue !== null) {
							this.$filterEditor.wijinputnumber({ disabled: gridView.options.disabled, type: "currency", value: dataValue });
						} else {
							this.$filterEditor.wijinputnumber({ disabled: gridView.options.disabled, type: "currency" });
						}
						break;
				}

				// create button
				//var filterButton = filterCell.find(".filterBtn");
				filterCell.find(".wijmo-wijgrid-filter-trigger") // filter button
					.attr({ "role": "button", "aria-haspopup": "true" })
					.bind("mouseenter", function (e) {
						$(this).addClass("ui-state-hover");
					}).bind("mouseleave", function (e) {
						$(this).removeClass("ui-state-hover ui-state-active");
					}).bind("mouseup", this, function (e) {
						$(this).removeClass("ui-state-active");
					}).bind("mousedown", { column: this }, this._onFilterBtnClick)
					.bind("click", function (e) { e.preventDefault() }); // prevent # being added to url.
			}
		},

		_onFilterBtnClick: function (e) {
			var column = e.data.column,
				wijgrid, filterOpLC, applicableFilters, args, items, key, operator, eventGuid;

			if (column.$dropDownFilterList) { // close the dropdown list
				column._removeDropDownFilterList();
				return false;
			}

			wijgrid = column._field("owner");
			filterOpLC = e.data.column.options.filterOperator.toLowerCase();
			applicableFilters = wijgrid.filterOperatorsCache.getByDataType(column.options.dataType);

			wijgrid.filterOperatorsCache.sort(applicableFilters, wijgrid.options.filterOperatorsSortMode);

			args = $.extend(true, {}, { operators: applicableFilters });
			wijgrid._trigger("filteroperatorslistshowing", null, args);

			items = [];
			if (args.operators) {
				for (key in args.operators) {
					if (args.operators.hasOwnProperty(key)) {
						operator = args.operators[key];
						items.push({ label: operator.name, value: operator.name, selected: operator.name.toLowerCase() === filterOpLC });
					}
				}
			}

			column.$dropDownFilterList = $("<div class=\"wijmo-wijgrid-filterlist\"></div").appendTo(document.body).wijlist(
			{
				autoSize: true,
				maxItemsCount: 8,
				selected: function (data, arg) {
					var filterOp = wijgrid.filterOperatorsCache.getByName(arg.item.value),
						doFiltering = false,
						value;

					column._removeDropDownFilterList();

					if (filterOp) {
						if (filterOp.arity > 1) {
							// check value
							value = wijgrid._parse(column.options, column.$filterEditor.val());
							if (value !== null && (column.options.dataType === "string" || !isNaN(value))) {
								column.options.filterValue = value;
								doFiltering = true;
							}
						} else {
							doFiltering = true;
						}
					}
					if (doFiltering) {
						column.options.filterOperator = filterOp.name;
						wijgrid.options.pageIndex = 0;
						wijgrid._requiresDataBinding = true;
						wijgrid._ensureControl();
					}
				}
			});

			column.$dropDownFilterList
				.wijlist("setItems", items)
				.wijlist("renderList");

			if (items.length > 8) {
				column.$dropDownFilterList.width(column.$dropDownFilterList.width() + 20);
			}

			column.$dropDownFilterList.$button = $(this);

			column.$dropDownFilterList
				.wijlist("refreshSuperPanel")
				.position({
					of: $(this),
					my: "left top",
					at: "left bottom"
				});

			eventGuid = column.$dropDownFilterList.eventGuid = new Date().getTime();
			$(document).bind("mousedown." + column.widgetName + "." + eventGuid, { column: column }, column._onDocMouseDown);
		},

		_getFilterOpIconCss: function (gridView, filterOpName) {
			var css = "filter-nofilter",
				filterOp = gridView.filterOperatorsCache.getByName(filterOpName.toLowerCase());

			if (filterOp) {
				if (filterOp.css) {
					css = filterOp.css;
				} else {
					css = "filter-" + filterOp.name.toLowerCase();
				}
			}

			return "wijmo-wijgrid-filtericon " + css;
		},

		_onDocMouseDown: function (e) {
			var $target = $(e.target),
				$filterList = $target.parents(".wijmo-wijgrid-filterlist:first"),
				$filterButton = $target.is(".wijmo-wijgrid-filter-trigger")
					? $target
					: $target.parents(".wijmo-wijgrid-filter-trigger:first");

			if (($filterButton.length && ($filterButton[0] === e.data.column.$dropDownFilterList.$button[0])) ||
			 ($filterList.length && ($filterList[0] === e.data.column.$dropDownFilterList[0]))) {
				// do nothing
			} else {
				e.data.column._removeDropDownFilterList();
			}
		},

		_onHrefClick: function (args) {
			if (args.data.options.disabled) {
				return false;
			}

			if (args.data.options.allowSort) {
				var sortDir = args.data.options.sortDirection;
				sortDir = ((sortDir === "none")
					? "ascending"
					: ((sortDir === "ascending") ? "descending" : "ascending"));

				args.data.option("sortDirection", sortDir);
			}

			return false;
		},

		_removeDropDownFilterList: function () {
			if (this.$dropDownFilterList) {
				var eventGuid = this.$dropDownFilterList.eventGuid;

				this.$dropDownFilterList.remove();

				this.$dropDownFilterList = null;

				$(document).unbind("mousedown." + this.widgetName + "." + eventGuid, this._onDocMouseDown);
			}
		},

		_getFilterEditorWidth: function () {
			if (this.$filterEditor) {
				var $fd = this.$filterEditor.closest(".wijmo-wijgrid-filter"),
					value = $fd.width() - $fd.find(".wijmo-wijgrid-filtericon").outerWidth();

				if (!value || value < 0) {
					value = 0;
				}

				return value;
			}

			return undefined;
		},

		_setFilterEditorWidth: function (width) {
			if (this.$filterEditor) {
				width -= this.$filterEditor.leftBorderWidth() + this.$filterEditor.rightBorderWidth();

				if (width < 0) {
					width = 0;
				}

				switch (this.options.dataType) {
					case "number":
					case "currency":
						this.$filterEditor.wijinputnumber("widget").width(width);
						break;
					case "datetime":
						this.$filterEditor.wijinputdate("widget").width(width);
						break;
					default:
						this.$filterEditor.wijinputmask("widget").width(width);
						break;
				}

				this.$filterEditor.setOutWidth(width);
			}
		},

		_somemethod: function () {
			//            $.wijmo.c1basefield.prototype._somemethod.apply(this, arguments);
		}
	});
})(jQuery);


/*(function($) {
    $.widget("wijmo.c1boundfield", $.wijmo.c1field, {
        options: {
            dataField: null
        },

        _create: function() {
            //$(this.element).data("widgetName", this.widgetName);
            $.wijmo.c1field.prototype._create.apply(this, arguments);
        }
    })
})(jQuery);*/



(function ($) {
	$.widget("wijmo.c1band", $.wijmo.c1basefield, {
		options: {
			/// <summary>
			/// Gets a array of objects representing the columns of the band.
			/// The default value is an empty array.
			/// Type: Array.
			/// </summary>
			columns: []
		},

		_create: function () {
			//$(this.element).data("widgetName", this.widgetName);
			$.wijmo.c1basefield.prototype._create.apply(this, arguments);
			this.element.addClass("ui-widget wijmo-c1band");
		}
	});
})(jQuery);

// traversing, band processing
$.extend($.wijmo.wijgrid, {
	bandProcessor: function () {
		var height, width, table, traverseList, shift, inc, savedXPos;

		this.generateSpanTable = function (root, leaves) {
			height = width = inc = shift = 0;
			table = [];
			traverseList = [];
			savedXPos = [];

			var spanTable = this._generateSpanTable(root, leaves, true);
			return spanTable;
		};

		this._generateSpanTable = function (root, leaves, parentVisibility) {
			var i, j;
			height = this._getVisibleHeight(root, parentVisibility);

			leaves = leaves || [];

			//var foo = function(self) {
			$.wijmo.wijgrid.traverse(root, function (column) {
				if (column.isLeaf) {
					leaves.push(column);
				}
				traverseList.push(column);
				//self.traverseList.push(column);
			});
			//} (this); // make closure

			width = leaves.length;

			for (i = 0; i < height; i++) {
				table[i] = [];
				for (j = 0; j < width; j++) {
					table[i][j] = { column: null, colSpan: 0, rowSpan: 0 };
				}
			}

			this._setTableValues(root, 0, 0);

			return table;
		};

		this._getVisibleHeight = function (root, parentVisibility) {
			var i, len, colVis, tmp, result = 0;

			if ($.isArray(root)) { // columns
				for (i = 0, len = root.length; i < len; i++) {
					tmp = this._getVisibleHeight(root[i], parentVisibility);
					result = Math.max(result, tmp);
				}
			} else { // column
				colVis = (root.visible === undefined) ? true : root.visible;
				root.parentVis = colVis && parentVisibility;

				if (root.isBand) { // band
					for (i = 0, len = root.columns.length; i < len; i++) {
						tmp = this._getVisibleHeight(root.columns[i], root.parentVis);
						result = Math.max(result, tmp);
					}

					if (!root.parentVis) {
						return result;
					}

					root.isLeaf = (result === 0);
					result++;
				} else { // general column
					root.isLeaf = true;
					if (root.parentVis) {
						result = 1;
					}
				}
			}

			return result;
		};

		this._getVisibleParent = function (column) {

			while (column) {
				column = traverseList[column.parentIdx];
				if (column && (column.parentVis || column.parentVis === undefined)) {
					return column;
				}
			}

			return null;
		};

		this._setTableValues = function (root, y, x) {
			var i, len, tx, posX, parentIsLeaf, visibleParent;

			if ($.isArray(root)) { //
				for (i = 0, len = root.length; i < len; i++) {
					this._setTableValues(root[i], y, x);
				}
			} else { // column
				if (root.travIdx === undefined) {
					throw "undefined travIdx";
				}

				tx = x + shift;

				if (root.parentVis) {
					posX = tx + inc;
					table[y][posX].column = root;
					savedXPos[root.travIdx] = posX;
				}

				if (root.isBand) { // band
					for (i = 0, len = root.columns.length; i < len; i++) {
						this._setTableValues(root.columns[i], y + 1, x);
					}
				}

				if (root.parentVis) {
					if (shift - tx === 0) { //root is column or band without visible nodes
						table[y][savedXPos[root.travIdx]].rowSpan = height - y;
						shift++;
					} else { // band with visible nodes
						table[y][savedXPos[root.travIdx]].colSpan = shift - tx;
					}
				} else {
					if (!root.isBand && height > 0) {
						visibleParent = this._getVisibleParent(root);

						parentIsLeaf = (visibleParent)
							? visibleParent.isLeaf
							: false;

						if (parentIsLeaf) {
							inc++;
						}

						if (y >= height) {
							y = height - 1;
						}

						posX = x + shift + inc;

						table[y][posX].column = root;

						if (!parentIsLeaf) {
							if (visibleParent && (savedXPos[visibleParent.travIdx] === posX)) {
								this._shiftTableElements(posX, y);
							}

							inc++;
						}
					}
				}
			}
		};

		this._shiftTableElements = function (x, untilY) {
			for (var i = 0; i < untilY; i++) {
				table[i][x + 1] = table[i][x];
				table[i][x] = { column: null, colSpan: 0, rowSpan: 0 };

				if (table[i][x + 1].column) {
					savedXPos[table[i][x + 1].column.travIdx]++;
				}
			}
		};
	},

	// returns both visible and invisible leaves.
	getAllLeaves: function (columns) {
		var leaves = [];
		this._getAllLeaves(columns, leaves);
		return leaves;
	},

	_getAllLeaves: function (columns, leaves) {
		var i, len, column, subColumns;
		if (columns) {
			for (i = 0, len = columns.length; i < len; i++) {
				column = columns[i];

				if (column.options) { // widget
					if ($.isFunction(column.columns)) {
						subColumns = column.columns();
					}
				}
				else { // column options object
					subColumns = column.columns;
				}

				if (subColumns && subColumns.length) {
					this._getAllLeaves(subColumns, leaves);
				}
				else {
					leaves.push(column);
				}
			}
		}
	},

	getColumnByTravIdx: function (columns, travIdx) {
		var i, len, column, subColumns, result = null;

		if (columns) {
			for (i = 0, len = columns.length; i < len && !result; i++) {
				column = columns[i];

				if (column.options) { // widget
					if (column._field("travIdx") === travIdx) {
						return column;
					}

					if ($.isFunction(column.columns)) {
						subColumns = column.columns();
					}

				} else { // column options object
					if (column.travIdx === travIdx) {
						return column;
					}

					subColumns = column.columns;
				}

				if (subColumns) {
					result = this.getColumnByTravIdx(subColumns, travIdx);
				}
			}
		}

		return result;
	},

	getLeaves: function (columns) {
		var leaves = [];
		this._getLeaves(columns, leaves);
		return leaves;
	},

	_getLeaves: function (columns, leaves) {
		var i, len, column;

		if (columns) {
			for (i = 0, len = columns.length; i < len; i++) {
				column = columns[i];

				if (column.isLeaf) {
					leaves.push(column);
				}

				this._getLeaves(column.columns, leaves);
			}
		}
	},

	setTraverseIndex: function (columns) {
		return this._setTraverseIndex(columns, 0, -1); // -> columns length
	},

	_setTraverseIndex: function (columns, idx, parentIdx) {
		var i, len, column, subColumns;

		if (columns) {
			for (i = 0, len = columns.length; i < len; i++) {
				column = columns[i];

				if (column.options) { // widget
					column._field("travIdx", idx++);
					column._field("parentIdx", parentIdx);
					if ($.isFunction(column.columns)) {
						subColumns = column.columns();
					}
				}
				else { // column options object
					column.travIdx = idx++;
					column.parentIdx = parentIdx;
					subColumns = column.columns;
				}

				if (subColumns) {
					idx = this._setTraverseIndex(subColumns, idx, idx - 1);
				}
			}
		}

		return idx;
	},

	flatten: function (columns) {
		var result = [];

		this.traverse(columns, function (column) {
			result.push(column);
		});

		return result;
	},

	traverse: function (columns, callback) {
		var i, len, column, subColumns;

		if (columns && ($.isFunction(callback))) {
			for (i = 0, len = columns.length; i < len; i++) {
				column = columns[i];

				callback(column);

				subColumns = ($.isFunction(column.columns))
					? column.columns() // widget
					: column.columns; // column options object

				if (subColumns) {
					this.traverse(subColumns, callback);
				}
			}
		}
	},

	getAriaHeaders: function (visibleLeaves, traverseList) {
		var i, len, leaf, value, result = [];

		for (i = 0, len = visibleLeaves.length; i < len; i++) {
			leaf = visibleLeaves[i];
			value = "";

			do {
				value += escape(leaf.headerText) + " ";
			} while ((leaf = traverseList[leaf.parentIdx])/*&& leaf.parentVis*/);

			result[i] = $.trim(value);
		}

		return result;
	}
});
$.extend($.wijmo.wijgrid, {
	htmlTableDataReader: function (gridView) {
		this.readTHead = function () {
			var $table = gridView.element,
				dataH, tHead, ri, rowLen, row, rowData, ci, cellLen;

			if (!$table.length) {
				throw "table not found";
			}

			dataH = [];
			tHead = $table[0].tHead;

			if (tHead) {
				for (ri = 0, rowLen = 1/*tHead[0].rows.length*/; ri < rowLen; ri++) {
					row = tHead.rows[ri];
					rowData = [];

					for (ci = 0, cellLen = row.cells.length; ci < cellLen; ci++) {
						rowData.push(row.cells[ci].innerHTML);
					}

					dataH.push(rowData);
				}
			}

			return dataH;
		};

		this.readTBody = function () {
			var $table = gridView.element.find(" > table"),
				dataB, tBody, ri, rowLen, row, rowData, ci, cellLen;

			if (!$table.length) {
				throw "table not found";
			}

			// read tbody
			dataB = [];
			tBody = $table.find("> tbody");

			if (tBody.length) {
				for (ri = 0, rowLen = tBody[0].rows.length; ri < rowLen; ri++) {
					row = tBody[0].rows[ri];
					rowData = [];
					for (ci = 0, cellLen = row.cells.length; ci < cellLen; ci++) {

						rowData[ci] = {
							value: row.cells[ci].innerHTML, // for sorting, merging and grouping
							originalRowIndex: ri
						};

					} // for ci

					dataB.push(rowData);
				} // for ri
			} // if tbody.length

			return dataB;
		};
	}
});

$.extend($.wijmo.wijgrid, {
	dataMode: {
		dom: 1,
		statical: 2,
		remoteStatical: 4,
		dynamical: 8
	},

	dataStore: function (wijgrid) {
		var _dataSource = null,
			_self = this,
			_isLoaded = false,
			_clonedItems = null,
			_transformedData, // { data: array, totalRows: int }
			_parsed = false,
			_transformed = false;

		this.dataMode = function () {
			return _dataMode();
		};

		this.dataSource = function () {
			return _dataSource;
		};

		this.getFieldsCount = function () {
			if (!_isLoaded) {
				throw "data is not loaded yet";
			}

			return _dataSource.items && _dataSource.items.length
				? _dataRowLength(_dataSource.items[0])
				: 0;
		};

		this.getFieldsNames = function () {
			if (!_isLoaded) {
				throw "data is not loaded yet";
			}

			var result = [],
				key, fooKey, dataSourceItem;

			if (_dataSource.items && _dataSource.items.length) {
				dataSourceItem = _dataSource.items[0];
				for (key in dataSourceItem) {
					if (dataSourceItem.hasOwnProperty(key)) {
						fooKey = key;
						if (typeof (fooKey) === "string") {
							fooKey = key.toLowerCase();
						}

						result[fooKey] = key;
					}
				}
			}

			return result;
		};

		// { data: array, totalRows: int }
		this.getDataSlice = function () {
			if (!_isLoaded) {
				throw "data is not loaded yet";
			}

			if (!_parsed) {
				_parsed = true; // todo try/ finally
				_parseData(); // parse _clonedItems;
			}

			if (!_transformed) {
				_transformed = true; // todo try/ finally

				if (_dataMode() !== $.wijmo.wijgrid.dataMode.dynamical) {
					_transformedData = _transform();
				} else {
					_transformedData = {
						data: $.extend(true, [], _clonedItems),
						totalRows: _dataSource.data.totalRows
					};
				}
			}

			return _transformedData;
		};

		this.load = function (userData) {
			if (!_dataSource) {
				_dataSource = $.proxy(_createDataSource, this)(wijgrid);
			}

			if (_dataMode() === $.wijmo.wijgrid.dataMode.dynamical) { // always load data
				userData.data = _prepareRequest();
				if (_dataSource.proxy) { // remote 
					_dataSource.proxy.options.data = $.extend(_dataSource.proxy.options.data, userData.data);
				}

				_dataSource.load(userData, true);
			} else { // local
				if (!_isLoaded) { // first time ?
					_dataSource.load(userData);
				} else {
					_dataLoading(_dataSource, userData);
					_dataLoaded(_dataSource, userData);
				}
			}

			/*if (_dataMode() === $.wijmo.wijgrid.dataMode.remoteDynamical) { // always load data
			var request = _prepareRequest();
			_dataSource.proxy.options.data = request;
			_dataSource.load(userData);
			} else { // local 
			if (!_isLoaded) { // first time ?
			_dataSource.load(userData);
			} else {
			_dataLoading(_dataSource, userData);
			_dataLoaded(_dataSource, userData);
			}
			}*/
		};

		this.isLoaded = function () {
			return _isLoaded;
		};

		this.updateValue = function (originalRowIndex, dataKey, newValue) {
			if (!_isLoaded) {
				throw "data is not loaded yet";
			}

			_dataSource.items[originalRowIndex][dataKey] = newValue;
			_clonedItems[originalRowIndex][dataKey] = newValue;
		};

		// private

		function _createDataSource(grid) {
			var dataSource = null,
				gridData = grid.options.data,
				oldError;

			if (gridData === null) { // DOMTable
				dataSource = new wijdatasource({
					data: grid.element,
					reader: new _dataReaderWrapper(new _domTableDataReader()),
					loading: $.proxy(_dataLoading, this),
					loaded: $.proxy(_dataLoaded, this)
				});
			} else
				if ($.isArray(gridData)) { // Array
					dataSource = new wijdatasource({
						data: gridData,
						reader: new _dataReaderWrapper(new wijarrayreader()),
						loading: $.proxy(_dataLoading, this),
						loaded: $.proxy(_dataLoaded, this)
					});
				} else { // wijdatasource
					dataSource = new wijdatasource(gridData);

					dataSource.reader = new _dataReaderWrapper(gridData.reader);

					dataSource.loading = $.proxy(function (ds, data) {
						if ($.isFunction(gridData.loading)) {
							gridData.loading(ds, data);
						}

						$.proxy(_dataLoading, this)(ds, data);
					}, this);

					dataSource.loaded = $.proxy(function (ds, data) {
						if ($.isFunction(gridData.loaded)) {
							gridData.loaded(ds, data);
						}

						$.proxy(_dataLoaded, this)(ds, data);
					}, this);


					/*dataSource = new wijdatasource({
					data: gridData.data,
					reader: new _dataReaderWrapper(gridData.reader),
					proxy: gridData.proxy,
					loading: $.proxy(function (dataSource, data) {
					if ($.isFunction(gridData.loading)) {
					gridData.loading(dataSource, data);
					}

					$.proxy(_dataLoading, this)(dataSource, data);
					}, this),
					loaded: $.proxy(function (dataSource, data) {
					if ($.isFunction(gridData.loaded)) {
					gridData.loaded(dataSource, data);
					}

					$.proxy(_dataLoaded, this)(dataSource, data);
					}, this)
					});*/

					if (dataSource.proxy && dataSource.proxy.options) {
						oldError = dataSource.proxy.options.error;
						dataSource.proxy.options.error = function () {
							_error.apply(this, arguments);

							if ($.isFunction(oldError)) {
								oldError.apply(this, arguments);
							}
						};
					}
				}

			return dataSource;
		}

		function _dataLoading(wijDataSource, userData) {
			_parsed = false;
			_transformed = false;
			_transformedData = null;
			_clonedItems = null;
			wijgrid._dataLoading(userData);
		}

		function _dataLoaded(wijDataSource, userData) {
			_isLoaded = true;

			if (_self.dataMode() === $.wijmo.wijgrid.dataMode.dynamical) { // remote
				_parsed = false;
				_transformed = false; // true;
			} else { // local
				_parsed = false;
				_transformed = false;
			}

			// clone original items and extend them to a { value, originalRowIndex } pair
			var foo = [],
				i, len, key, item, newItem;

			for (i = 0, len = wijDataSource.items.length; i < len; i++) {
				item = wijDataSource.items[i];
				newItem = $.isArray(item)
					? []
					: {};

				for (key in item) {
					if (item.hasOwnProperty(key)) {
						newItem[key] = {
							value: item[key],
							originalRowIndex: i
						};
					}
				}

				foo.push(newItem);
			}

			_clonedItems = foo;

			wijgrid._dataLoaded(userData);
		}

		function _error() {
			wijgrid._ajaxError.apply(wijgrid, arguments);
		}

		function _dataMode() {
			if (!_dataSource.data) { // dataSource.data == domTable
				return $.wijmo.wijgrid.dataMode.dom;
			}

			if (_dataSource.dynamic === true) {
				return $.wijmo.wijgrid.dataMode.dynamical;
			}

			/*if (_dataSource.proxy) {
			return _dataSource.proxy.options.dynamic === true
			? $.wijmo.wijgrid.dataMode.remoteDynamical
			: $.wijmo.wijgrid.dataMode.remoteStatical;
			}*/

			return $.wijmo.wijgrid.dataMode.statical;
		}

		function _dataRowLength(dataRow) {
			if ($.isArray(dataRow)) {
				return dataRow.length;
			} else {
				var i = 0, key;

				for (key in dataRow) {
					if (dataRow.hasOwnProperty(key)) {
						i++;
					}
				}

				return i;
			}
		}

		function _parseData() {
			if (_clonedItems && _clonedItems.length) {

				var dataLeaves = [],
					dataLen, ri, len, dataRow, di, value, dataLeaf;

				$.wijmo.wijgrid.traverse(wijgrid.options.columns, function (column) {
					if ($.wijmo.wijgrid.validDataKey(column.dataKey)) {
						dataLeaves.push(column);
					}
				});

				dataLen = Math.min(dataLeaves.length, _self.getFieldsCount());
				for (ri = 0, len = _clonedItems.length; ri < len; ri++) {
					dataRow = _clonedItems[ri];

					for (di = 0; di < dataLen; di++) {
						value = null;
						dataLeaf = dataLeaves[di];

						if (dataLeaf && dataLeaf.dataParser) {
							value = wijgrid._parse(dataLeaf, dataRow[dataLeaf.dataKey].value);

							switch (dataLeaf.dataType) {
								case "datetime":
									if (value !== null && !(value instanceof Date)) {
										throw "invalid value.";
									}
									break;

								case "number":
								case "currency":
									if (value !== null && (typeof (value) !== "number" || isNaN(value))) {
										throw "invalid value.";
									}

									break;

								case "boolean":
									if (value !== null && (typeof (value) !== "boolean" || isNaN(value))) {
										throw "invalid value.";
									}

									break;
							}

							dataRow[dataLeaf.dataKey].value = value;
						}

					} // for di
				} // for ri
			}
		}

		// { data: array, totalRows: int }
		function _transform() {
			if (_clonedItems && _clonedItems.length) {
				var filterInfo = wijgrid._buildFilterInfo(true),
					sortInfo = null,
					result;

				sortInfo = null;
				if (wijgrid.options.allowSorting) {
					sortInfo = wijgrid._buildSortInfo(true);
				}

				result = new $.wijmo.wijgrid.dataHelper().getDataSlice(wijgrid, $.extend(true, [], _clonedItems), filterInfo, sortInfo);
				return result;
			}

			//return [];
			return {
				data: [],
				totalRows: 0
			};
		}

		function _prepareRequest() {
			var result = {
				filtering: wijgrid._buildFilterInfo(false),
				paging: (wijgrid.options.allowPaging
					? { pageIndex: wijgrid.options.pageIndex,
						pageSize: wijgrid.options.pageSize
					}
					: null),
				sorting: wijgrid._buildSortInfo(false)
			};

			return result;
		}

		// * data readers *
		function _dataReaderWrapper(dataReader) {

			this.read = function (dataSource) {
				dataSource.items = null;

				if (dataReader && $.isFunction(dataReader.read)) {
					dataReader.read(dataSource);
				}

				if (!$.isArray(dataSource.items)) {
					dataSource.items = [];

					if ($.isArray(dataSource.data)) {
						dataSource.items = dataSource.data;
					} else {
						if (dataSource.data && $.isArray(dataSource.data.rows)) {
							dataSource.items = dataSource.data.rows; // remoteDynamical
						}
					}
				}

				if (_dataMode() === $.wijmo.wijgrid.dataMode.dynamical) {
					if (!dataSource.data || isNaN(dataSource.data.totalRows)) {
						throw "totalRows value is missing";
					}
				}

				if (!dataSource.items || !$.isArray(dataSource.items)) {
					dataSource.items = [];
				}
			};
		}

		function _domTableDataReader() {
			this.read = function (wijDataSource) {
				wijDataSource.items = [];

				if (wijDataSource && wijDataSource.data && wijDataSource.data.length) {
					wijDataSource.items = _readTBodySection(wijDataSource.data);
					wijDataSource.data = null;
				} else {
					throw "invalid data source";
				}
			};

			function _readTBodySection($table) {
				var result = [],
					$tBodies = $table.find("> tbody:first"),
					tBody, ri, rowsLen, row, rowData, ci, cellsLen;

				if ($tBodies.length) {
					tBody = $tBodies[0];

					for (ri = 0, rowsLen = tBody.rows.length; ri < rowsLen; ri++) {
						row = tBody.rows[ri];
						rowData = [];

						for (ci = 0, cellsLen = row.cells.length; ci < cellsLen; ci++) {
							rowData[ci] = row.cells[ci].innerHTML;
						}

						result[ri] = rowData;
					}
				}

				return result;
			}
		}
	},

	dataHelper: function () {

		this.getDataSlice = function (gridView, dataCache, filterInfo, sortInfo) {
			// apply filtering
			dataCache = _applyFiltering(dataCache, filterInfo, gridView);

			// apply sorting
			if (gridView.options.allowSorting) {
				$.proxy(_applySort, this)(dataCache, sortInfo);
			}

			var totalRows = dataCache.length, // number of rows in the data source (before paging will be applied)
				start, end, pagedData, i, j, len;

			// apply paging
			if (gridView.options.allowPaging) {
				start = Math.min(dataCache.length - 1, gridView.options.pageIndex * gridView.options.pageSize);

				if (start < 0) {
					start = 0;
				}

				end = Math.min(dataCache.length, start + gridView.options.pageSize);

				pagedData = [];
				for (i = start, len = 0, j = 0; i < end; i++, j++) {
					pagedData[j] = dataCache[i];
				}

				dataCache = pagedData;
			}

			return {
				data: dataCache,
				totalRows: totalRows
			};

			//return dataCache;
		};

		// filterInfo: [ {column, filterOperator} ]
		function _applyFiltering(data, filterInfo, gridView) {
			var dataLength, filterLength,
				filterValues = {},
				i, fi, operator, column,
				dataRes = [],
				dataRow, flag, j, dataVal;

			if (!data || (dataLength = data.length) === 0 ||
				!filterInfo || (filterLength = filterInfo.length) === 0) {

				return data;
			}

			// preformat filterValues
			for (i = 0; i < filterLength; i++) {
				fi = filterInfo[i];
				operator = fi.operator;
				column = fi.column;

				if (operator.arity > 1) {
					filterValues[i] = gridView._parse(column, column.filterValue);
				}
			}

			for (i = 0; i < dataLength; i++) {
				dataRow = data[i];
				flag = true;

				for (j = 0; j < filterLength && flag; j++) {
					fi = filterInfo[j];
					dataVal = dataRow[fi.column.dataKey].value;

					flag &= fi.operator.operator(dataVal, filterValues[j]);
				}

				if (flag) {
					dataRes.push($.extend(true, [], dataRow));
				}
			}

			return dataRes;
		}

		// sortinfo: array of { dataKey, sortDirection } 
		function _applySort(data, sortInfo) {
			if (sortInfo.length) {
				var builder = [],
				i, len, arg, si, dataKey, idx;

				builder.push("var _wijgriddatahelper = this;");
				builder.push("var _wijgridSortFunc = function(a, b)\n{\n");

				for (i = 0, len = sortInfo.length; i < len; i++) {
					arg = "arg" + i;
					si = sortInfo[i];

					dataKey = (typeof (si.dataKey) === "string")
						? "\"" + si.dataKey + "\""
						: si.dataKey;

					if (si.sortDirection === "ascending" || si.sortDirection === "descending") {
						if (si.sortDirection === "ascending") {
							builder.push("var ", arg, " = _wijgriddatahelper._sortAsc", "(a[", dataKey, "].value, b[", dataKey, "].value);\n");
						}
						else {
							builder.push("var ", arg, " = _wijgriddatahelper._sortDesc", "(a[", dataKey, "].value, b[", dataKey, "].value);\n");
						}
					} else { // sortDirection === none: restore original order
						builder.push("var ", arg, " = _wijgriddatahelper._sortDigitAsc", "(a[", dataKey, "].originalRowIndex, b[", dataKey, "].originalRowIndex);\n");
					}

					builder.push("if (", arg, " == 0)\n");
					builder.push("{\n");
				}

				idx = sortInfo.length - 1;
				if (idx >= 0) { // sort identical values using originalRowIndex
					arg = "arg" + idx;
					si = sortInfo[idx];

					dataKey = (typeof (si.dataKey) === "string")
						? "\"" + si.dataKey + "\""
						: si.dataKey;

					if ((si.sortDirection === "ascending") || (si.sortDirection === "descending")) {
						if (si.sortDirection === "ascending") {
							builder.push("var ", arg, " = _wijgriddatahelper._sortDigitAsc", "(a[", dataKey, "].originalRowIndex, b[", dataKey, "].originalRowIndex);\n");
						}
						else {
							builder.push("var ", arg, " = _wijgriddatahelper._sortDigitDesc", "(a[", dataKey, "].originalRowIndex, b[", dataKey, "].originalRowIndex);\n");
						}
					}
				}

				for (i = sortInfo.length - 1; i >= 0; i--) {
					builder.push("}\n");
					arg = "arg" + i;
					builder.push("return ", arg, ";\n");
				}

				builder.push("}"); // _wijgridSortFunc

				eval(builder.join(""));

				data.sort(_wijgridSortFunc);
			}
		}

		this._sortAsc = function (a, b) {
			if (a instanceof Date) {
				a = a.getTime();
			}

			if (b instanceof Date) {
				b = b.getTime();
			}

			if (a === b) {
				return 0;
			}

			if (a === null) {
				return -1;
			}

			if (b === null) {
				return 1;
			}

			return (a < b) ? -1 : 1;
		};

		this._sortDesc = function (a, b) {
			if (a instanceof Date) {
				a = a.getTime();
			}

			if (b instanceof Date) {
				b = b.getTime();
			}

			if (a === b) {
				return 0;
			}

			if (a === null) {
				return 1;
			}

			if (b === null) {
				return -1;
			}

			return (a < b) ? 1 : -1;
		};

		this._sortDigitAsc = function (a, b) {
			return a - b;
		};

		this._sortDigitDesc = function (a, b) {
			return b - a;
		};
	}
});
$.extend($.wijmo.wijgrid, {
	groupRange: function (expanded, range, sum, position) {
		this.value = -1;

		switch (arguments.length) {
			case 4:
				this.isExpanded = expanded;
				this.cr = range;
				this.sum = sum;
				this.position = position;
				break;

			case 1:
				this.isExpanded = expanded;
				this.cr = new $.wijmo.wijgrid.cellRange(-1, -1);
				this.sum = -1;
				this.position = "none";
				break;

			default:
				this.isExpanded = false;
				this.cr = new $.wijmo.wijgrid.cellRange(-1, -1);
				this.sum = -1;
				this.position = "none";
		}

		this.isSubRange = function (groupRange) {
			return ((this.cr.r1 >= groupRange.cr.r1) && (this.cr.r2 <= groupRange.cr.r2));
		};

		this.toString = function () {
			return this.cr.r1 + "-" + this.cr.r2;
		};

		this._getHeaderImageClass = function (expanded) {

			var groupInfo = this.owner;
			if (groupInfo) {
				return expanded
					? groupInfo.expandedImageClass || "ui-icon-minus"
					: groupInfo.collapsedImageClass || "ui-icon-plus";
			}

			return null;
		};

		this.collapse = function () {
			var groupInfo, column, grid, groupHelper, leaves, groupedColumnsCnt;


			if ((groupInfo = this.owner) && (column = groupInfo.owner) && (grid = column.owner)) {
				groupHelper = new $.wijmo.wijgrid.groupHelper();
				leaves = grid._field("leaves");

				if (groupHelper.isParentExpanded(leaves, this.cr, groupInfo.level)) {
					if ((groupInfo.position !== "footer") && (groupInfo.outlineMode !== "none")) { // do not collapse groups with .position == "footer"
						groupedColumnsCnt = groupHelper.getGroupedColumnsCount(leaves);
						/*var tbody = grid.$table.find("> tbody")[0];*/

						_collapse(groupHelper, grid._rows() /*tbody*/, leaves, this, groupedColumnsCnt);
					}
				}
			}
		};

		this.expand = function (expandChildren) {
			var groupInfo, column, grid, groupHelper, leaves, groupedColumnsCnt;

			if ((groupInfo = this.owner) && (column = groupInfo.owner) && (grid = column.owner)) {
				groupHelper = new $.wijmo.wijgrid.groupHelper();
				leaves = grid._field("leaves");

				if (groupHelper.isParentExpanded(leaves, this.cr, groupInfo.level)) {
					groupedColumnsCnt = groupHelper.getGroupedColumnsCount(leaves);
					/*var tbody = grid.$table.find("> tbody")[0];*/

					_expand(groupHelper, grid._rows(), leaves, this, groupedColumnsCnt, expandChildren, true);
				}
			}
		};

		// private members

		function _collapse(groupHelper, /*tbody*/rowAccessor, leaves, groupRange, groupedColumnsCnt) {
			var groupInfo = groupRange.owner,
				dataStart = groupRange.cr.r1,
				dataEnd = groupRange.cr.r2,
				rowObj, i, len,
				childRanges, childRange, j;

			switch (groupInfo.position) {
				case "header":
				case "headerAndFooter":
					rowObj = rowAccessor.item(groupRange.cr.r1);

					if (rowObj) {
						if (rowObj[0]) {
							rowObj[0]["aria-expanded"] = "false";
						}

						if (rowObj[1]) {
							rowObj[1]["aria-expanded"] = "false";
						}
					}

					dataStart++;
					break;
			}

			// hide child rows
			for (i = dataStart; i <= dataEnd; i++) {
				rowObj = rowAccessor.item(i);
				if (rowObj) {
					if (rowObj[0]) {
						rowObj[0].style.display = "none";
						rowObj[0]["aria-hidden"] = "true";
					}

					if (rowObj[1]) {
						rowObj[1].style.display = "none";
						rowObj[1]["aria-hidden"] = "true";
					}
				}

				//tbody.rows[i].style.display = "none";
			}

			// update isExpanded property
			groupRange.isExpanded = false;
			_updateHeaderIcon(/*tbody*/rowAccessor, groupRange);

			for (i = groupInfo.level + 1; i <= groupedColumnsCnt; i++) {
				childRanges = groupHelper.getChildGroupRanges(leaves, groupRange.cr, groupRange.owner.level);
				for (j = 0, len = childRanges.length; j < len; j++) {
					childRange = childRanges[j];
					childRange.isExpanded = false;

					switch (childRange.owner.position) {
						case "header":
						case "headerAndFooter":
							rowObj = rowAccessor.item(childRange.cr.r1);

							if (rowObj) {
								if (rowObj[0]) {
									rowObj[0]["aria-expanded"] = "false";
								}

								if (rowObj[1]) {
									rowObj[1]["aria-expanded"] = "false";
								}
							}
					}

					_updateHeaderIcon(/*tbody*/rowAccessor, childRange);
				}
			}
		}

		function _expand(groupHelper, /*tbody*/rowAccessor, leaves, groupRange, groupedColumnsCnt,
			expandChildren, isRoot) {

			var groupInfo = groupRange.owner,
				dataStart = groupRange.cr.r1,
				dataEnd = groupRange.cr.r2,
				rowObj, i, len,
				childRanges, childRange, childIsRoot;

			switch (groupInfo.position) {
				case "header":
					/*tbody.rows[dataStart].style.display = "";*/
					rowObj = rowAccessor.item(dataStart);
					if (rowObj) {
						if (rowObj[0]) {
							rowObj[0].style.display = "";
							rowObj[0]["aria-hidden"] = "false";

							if (isRoot || expandChildren) {
								rowObj[0]["aria-expanded"] = "true";
							}
						}

						if (rowObj[1]) {
							rowObj[1].style.display = "";
							rowObj[1]["aria-hidden"] = "false";

							if (isRoot || expandChildren) {
								rowObj[1]["aria-expanded"] = "true";
							}
						}
					}
					dataStart++;
					break;
				case "footer":
					/*tbody.rows[dataEnd].style.display = "";*/
					rowObj = rowAccessor.item(dataEnd);
					if (rowObj) {
						if (rowObj[0]) {
							rowObj[0].style.display = "";
							rowObj[0]["aria-hidden"] = "false";
						}

						if (rowObj[1]) {
							rowObj[1].style.display = "";
							rowObj[1]["aria-hidden"] = "false";
						}
					}
					dataEnd--;
					break;
				case "headerAndFooter":
					/*tbody.rows[dataStart].style.display = "";*/
					rowObj = rowAccessor.item(dataStart);
					if (rowObj) {
						if (rowObj[0]) {
							rowObj[0].style.display = "";
							rowObj[0]["aria-hidden"] = "false";

							if (isRoot || expandChildren) {
								rowObj[0]["aria-expanded"] = "true";
							}
						}

						if (rowObj[1]) {
							rowObj[1].style.display = "";
							rowObj[1]["aria-hidden"] = "false";

							if (isRoot || expandChildren) {
								rowObj[1]["aria-expanded"] = "true";
							}
						}
					}
					if (isRoot) {
						/*tbody.rows[dataEnd].style.display = "";*/
						rowObj = rowAccessor.item(dataEnd);
						if (rowObj) {
							if (rowObj[0]) {
								rowObj[0].style.display = "";
								rowObj[0]["aria-hidden"] = "false";
							}

							if (rowObj[1]) {
								rowObj[1].style.display = "";
								rowObj[1]["aria-hidden"] = "false";
							}
						}
					}
					dataStart++;
					dataEnd--;
					break;
			}

			if (isRoot) {
				groupRange.isExpanded = true;
				_updateHeaderIcon(/*tbody*/rowAccessor, groupRange);
			} else {
				return;
			}

			if (groupRange.owner.level === groupedColumnsCnt) { // show data rows
				for (i = dataStart; i <= dataEnd; i++) {
					/*tbody.rows[i].style.display = "";*/
					rowObj = rowAccessor.item(i);
					if (rowObj) {
						if (rowObj[0]) {
							rowObj[0].style.display = "";
							rowObj[0]["aria-hidden"] = "false";
						}

						if (rowObj[1]) {
							rowObj[1].style.display = "";
							rowObj[1]["aria-hidden"] = "false";
						}
					}

				}
			} else {
				childRanges = groupHelper.getChildGroupRanges(leaves, groupRange.cr, groupRange.owner.level);

				if (expandChildren) { // throw action deeper
					for (i = 0, len = childRanges.length; i < len; i++) {
						childRange = childRanges[i];
						_expand(groupHelper, /*tbody*/rowAccessor, leaves, childRange, groupedColumnsCnt, expandChildren, true);
					}
				} else { // show only headers of the child groups or fully expand child groups with .position == "footer"\ .outlineMode == "none"
					for (i = 0, len = childRanges.length; i < len; i++) {
						childRange = childRanges[i];

						childIsRoot = (childRange.owner.position === "footer" || childRange.owner.outlineMode === "none")
							? true
							: false;

						_expand(groupHelper, /*tbody*/rowAccessor, leaves, childRange, groupedColumnsCnt, false, childIsRoot);
					}
				}
			}
		}

		function _updateHeaderIcon(/*tbody*/rowAccessor, groupRange) {

			if (groupRange.owner.position !== "footer") {
				/*var imageDiv = $(tbody.rows[groupRange.cr.r1]).find("div.wijmo-wijgrid-grouptogglebtn:first-child");*/
				var imageDiv = null,
					rowObj = rowAccessor.item(groupRange.cr.r1);

				if (rowObj) {
					if (rowObj[0]) {
						imageDiv = $(rowObj[0]).find("div.wijmo-wijgrid-grouptogglebtn:first-child");
					}
				}

				if (imageDiv && imageDiv.length) {
					imageDiv.toggleClass(groupRange._getHeaderImageClass(!groupRange.isExpanded), false);
					imageDiv.toggleClass(groupRange._getHeaderImageClass(groupRange.isExpanded), true);
				}
			}
		}
	},

	grouper: function () {

		this.group = function (grid, data, leaves) {
			this._grid = grid;
			this._data = data;
			this._leaves = leaves;
			this._visibleLeaves = grid._field("visibleLeaves");
			this._groupRowIdx = 0;
			this._groupHelper = new $.wijmo.wijgrid.groupHelper();

			var level = 1,
				i, len, leaf;

			for (i = 0, len = leaves.length; i < len; i++) {
				leaf = leaves[i];
				this._groupRowIdx = 0;

				if ((leaf.dynamic !== true) && leaf.groupInfo && (leaf.groupInfo.position && (leaf.groupInfo.position !== "none")) &&
				  (leaf.dataIndex >= 0)) {
					leaf.groupInfo.level = level;
					leaf.groupInfo.expandInfo = [];
					this._processRowGroup(leaf, level++);
				}
			}

			delete this._grid;
			delete this._data;
			delete this._leaves;
			delete this._visibleLeaves;
		};

		this._processRowGroup = function (leaf, level) {
			var row, cellRange, isExpanded, startCollapsed, indentRow,
				groupRange, isParentCollapsed, header, footer, i;

			for (row = 0; row < this._data.length; row++) {
				// if (this._data[row].rowType  !== "data") {
				if (!(this._data[row].rowType & $.wijmo.wijgrid.rowType.data)) {
					continue;
				}

				cellRange = this._getGroupCellRange(row, leaf, level);
				isExpanded = true;
				startCollapsed = (leaf.groupInfo.outlineMode === "startCollapsed");

				if (startCollapsed || this._groupHelper.isParentCollapsed(this._leaves, cellRange, level)) {
					if ((leaf.groupInfo.groupSingleRow === false) && (cellRange.r1 === cellRange.r2)) {
						continue;
					}
					isExpanded = false;
				}

				// indent
				if (level && this._grid.options.groupIndent) {
					for (indentRow = cellRange.r1; indentRow <= cellRange.r2; indentRow++) {
						this._addIndent(this._data[indentRow][0], level);
					}
				}

				// insert group header/ group footer
				switch (leaf.groupInfo.position) {
					case "header":
						groupRange = this._addGroupRange(leaf.groupInfo, cellRange, isExpanded);
						this._updateByGroupRange(groupRange, level);

						isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);
						header = this._buildGroupRow(groupRange, cellRange, true, isParentCollapsed);

						for (i = cellRange.r1; i <= cellRange.r2; i++) {
							this._data[i].__attr["aria-level"] = level + 1;
							if (!isExpanded) {
								this._data[i].__style.display = "none";
								this._data[i].__attr["aria-hidden"] = true;

							}
						}

						this._data.splice(cellRange.r1, 0, header); // insert group header

						header.__attr["arial-level"] = level;
						header.__attr["aria-expanded"] = isExpanded;
						if (isParentCollapsed) {
							header.__style.display = "none";
							header.__attr["aria-hidden"] = true;
						}

						row = cellRange.r2 + 1;
						break;

					case "footer":
						groupRange = this._addGroupRange(leaf.groupInfo, cellRange, true);
						this._updateByGroupRange(groupRange, level);

						footer = this._buildGroupRow(groupRange, cellRange, false, false);
						footer.__attr["aria-level"] = level;

						this._data.splice(cellRange.r2 + 1, 0, footer);
						row = cellRange.r2 + 1;

						isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);
						if (isParentCollapsed) {
							footer.__style.display = "none";
							footer.__attr["aria-hidden"] = true;
						}

						break;

					case "headerAndFooter":
						groupRange = this._addGroupRange(leaf.groupInfo, cellRange, isExpanded);
						this._updateByGroupRange(groupRange, level);

						isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);
						header = this._buildGroupRow(groupRange, cellRange, true, isParentCollapsed);
						footer = this._buildGroupRow(groupRange, cellRange, false, false);

						for (i = cellRange.r1; i <= cellRange.r2; i++) {
							this._data[i].__attr["aria-level"] = level + 1;
							if (!isExpanded) {
								this._data[i].__style.display = "none";
								this._data[i].__attr["aria-hidden"] = true;
							}
						}

						this._data.splice(cellRange.r2 + 1, 0, footer);
						footer.__attr["aria-level"] = level;
						if (isParentCollapsed || !isExpanded) {
							footer.__style.display = "none";
							footer.__attr["aria-hidden"] = true;
						}

						this._data.splice(cellRange.r1, 0, header);
						header.__attr["aria-level"] = level;
						header.__attr["aria-expanded"] = isExpanded;
						if (isParentCollapsed) {
							header.__style.display = "none";
							header.__attr["aria-hidden"] = true;
						}

						row = cellRange.r2 + 2;
						break;

					default:
						throw $.wijmo.wijgrid.stringFormat("Unknown Position value: \"{0}\"", leaf.groupInfo.position);
				}

				this._groupRowIdx++;
			}
		};

		this._buildGroupRow = function (groupRange, cellRange, isHeader, isParentCollapsed) {
			var groupInfo = groupRange.owner,
				leaf = groupInfo.owner,
				gridView = leaf.owner,
				row = [],
				groupByText = "",
				tmp, cell,
				headerOffset = 0,
				aggregate = "",
				caption, args, span, col, agg;

			row.__style = {};
			row.__attr = {};

			row.__attr.id = ((isHeader) ? "GH" : "GF") + this._groupRowIdx + "-" + groupInfo.level;

			row.rowType = (isHeader)
				? $.wijmo.wijgrid.rowType.groupHeader //"groupHeader"
				: $.wijmo.wijgrid.rowType.groupFooter; // "groupFooter";

			//if (cellRange.c1 > -1 && ((tmp = this._data[cellRange.r1][cellRange.c1].value) !== null)) {
			if ((leaf.dataIndex >= 0) && ((tmp = this._data[cellRange.r1][leaf.dataIndex].value) !== null)) {
				groupByText = gridView._toStr(leaf, tmp);
			}

			if (this._grid.options.showRowHeader) {
				row.push({ html: "&nbsp;" });
			}

			// create the summary cell
			cell = { html: "" };
			if (isHeader && groupInfo.outlineMode !== "none") {
				if (groupRange.isExpanded) {
					cell.html = "<div class=\"ui-icon " + groupRange._getHeaderImageClass(true) +
						" wijmo-wijgrid-grouptogglebtn\">&nbsp;</div>";
				}
				else {
					cell.html = "<div class=\"ui-icon " + groupRange._getHeaderImageClass(false) +
						" wijmo-wijgrid-grouptogglebtn\">&nbsp;</div>";
				}
			}

			row.push(cell);

			// add group header text
			/*var leaf = (cellRange.c1 >= 0)
			? this._leaves[cellRange.c1]
			: null;*/
			if (leaf.aggregate && (leaf.aggregate !== "none")) {
				//aggregate = this._getAggregate(cellRange, leaf, groupInfo.owner, isHeader, groupByText);
				aggregate = this._getAggregate(cellRange, leaf, leaf, isHeader, groupByText);

				if (leaf.parentVis) {
					headerOffset = 1;
				}
			}

			caption = (isHeader)
				? groupInfo.headerText
				: groupInfo.footerText;

			// format caption

			// The text may include up to three placeholders:
			// "{0}" is replaced with the value being grouped on and
			// "{1}" is replaced with the group's column header            
			// "{2}" is replaced with the aggregate
			if (caption === "custom") {
				args = {
					data: this._data, // data object.
					column: leaf, //  column that is being grouped.
					groupByColumn: groupInfo.owner, // column initiated grouping.
					groupText: groupByText, // text that is being grouped.
					text: "", // text that will be displayed in the groupHeader or Footer.
					groupingStart: cellRange.r1, // first index for the data being grouped.
					groupingEnd: cellRange.r2, // last index for the data being grouped.
					isGroupHeader: isHeader,
					aggregate: aggregate
				};

				if (this._grid._trigger("grouptext", null, args)) {
					caption = args.text;
				}
			} else {
				if ((caption === undefined) || (caption === null)) { // use default formatting
					if (isHeader) {
						caption = "{1}: {0}";
					}

					if (aggregate || (aggregate === 0)) {
						caption = caption
							? caption + " {2}"
							: "{2}";
					}
				}

				caption = $.wijmo.wijgrid.stringFormat(caption, groupByText,
					leaf && leaf.headerText ? leaf.headerText : "",
					aggregate.toString());
			}

			if (!caption) {
				caption = "&nbsp;";
			}

			cell.html += "<span>" + caption + "</span>";
			this._addIndent(cell, groupInfo.level - 1);

			// summary cells span until the end of the row or the first aggregate
			span = headerOffset;
			col = (this._grid.options.showRowHeader)
				? 1
				: 0;

			for (; col < cellRange.c1; col++) { // c1 is an index of the leaf inside the this._leaves
				if (this._leaves[col].parentVis) {
					span++;
				}
			}

			col = cellRange.c1 + headerOffset;
			for (; col < this._leaves.length; col++) {
				leaf = this._leaves[col];
				if ((leaf.dynamic !== true) && leaf.aggregate && (leaf.aggregate !== "none")) {
					break;
				}

				if (leaf.parentVis) {
					span++;
				}
			}

			// add aggregates (or blanks) until the end of the row
			for (; col < this._leaves.length; col++) {
				leaf = this._leaves[col];
				if (leaf.parentVis) {
					agg = this._getAggregate(cellRange, leaf, groupInfo.owner, isHeader, groupByText);
					if (!agg && (agg !== 0)) {
						agg = "&nbsp;";
					}
					row.push({ html: agg.toString() });
				}
			}

			cell.colSpan = span;

			return row;
		};

		this._getAggregate = function (cellRange, column, groupByColumn, isGroupHeader, groupByText) {
			var aggregate = "",
				args, tally, row;

			if (!column.parentVis || !column.aggregate || (column.aggregate === "none")) {
				return aggregate;
			}

			if (column.aggregate === "custom") {
				args = {
					data: this._data, // data object
					column: column, //  column that is being grouped.
					groupByColumn: groupByColumn, // column initiated grouping.
					groupText: groupByText, // text that is being grouped.
					text: "", // text that will be displayed in the groupHeader or groupFooter.
					groupingStart: cellRange.r1, // first index for the data being grouped.
					groupingEnd: cellRange.r2, // last index for the data being grouped.
					isGroupHeader: isGroupHeader
				};

				if (this._grid._trigger("groupaggregate", null, args)) {
					aggregate = args.text;
				}
			} else {
				tally = new this._tally();

				for (row = cellRange.r1; row <= cellRange.r2; row++) {
					tally.add(this._data[row][column.dataIndex].value);
				}

				aggregate = tally.getValueString(column);
			}

			return aggregate;
		};

		this._getGroupCellRange = function (row, leaf, level) {
			//var range = new $.wijmo.wijgrid.cellRange(row, leaf.dataIndex);
			var idx = leaf.leavesIdx, // $.inArray(leaf, this._leaves);
				range = new $.wijmo.wijgrid.cellRange(row, idx),
				parentRange = this._groupHelper.getParentGroupRange(this._leaves, range, level),
				str, count;

			//if (this._data[row].rowType === "data") {
			if (this._data[row].rowType & $.wijmo.wijgrid.rowType.data) {
				str = this._data[row][leaf.dataIndex].value;

				for (range.r2 = row, count = this._data.length - 1; range.r2 < count; range.r2++) {
					//if ((this._data[range.r2 + 1].rowType !== "data") || (parentRange && (range.r2 + 1 > parentRange.r2))) {
					if (!(this._data[range.r2 + 1].rowType & $.wijmo.wijgrid.rowType.data) || (parentRange && (range.r2 + 1 > parentRange.r2))) {
						break;
					}

					if (this._data[range.r2 + 1][leaf.dataIndex].value !== str) {
						break;
					}
				}
			}

			return range;
		};

		this._addGroupRange = function (groupInfo, cellRange, isExpanded) {
			var result = null,
				idx = this._groupHelper.getChildGroupIndex(cellRange, groupInfo.expandInfo),
				range, expandState, r1, r2;

			if (idx >= 0 && idx < groupInfo.expandInfo.length) {
				result = groupInfo.expandInfo[idx];
			} else {
				range = new $.wijmo.wijgrid.cellRange(cellRange.r1, cellRange.r1, cellRange.r2, cellRange.r2); // clone
				expandState = (groupInfo.position === "footer")
					? true
					: isExpanded && (groupInfo.outlineMode !== "startCollapsed");

				result = new $.wijmo.wijgrid.groupRange(expandState, range, -1, groupInfo.position);

				result.owner = groupInfo;

				groupInfo.expandInfo.push(result);
			}

			if (result) {
				r1 = cellRange.r1;
				r2 = cellRange.r2;

				if (groupInfo.position === "headerAndFooter") {
					r2 += 2;
				}

				if (groupInfo.position !== "headerAndFooter") {
					r2++;
				}

				result.cr.r2 = r2;
			}

			return result;
		};

		this._updateByGroupRange = function (groupRange, level) {
			var i, len, groupInfo, len2, j, cur, delta;

			for (i = 0, len = this._leaves.length; i < len; i++) {
				groupInfo = this._leaves[i].groupInfo;

				//
				// if (groupInfo) {
				//

				if (groupInfo && (groupInfo.level < level)) {

					len2 = (groupInfo.expandInfo)
						? groupInfo.expandInfo.length
						: 0;

					for (j = 0; j < len2; j++) {
						cur = groupInfo.expandInfo[j];
						//
						//if (cur.cr.r1 !== groupRange.cr.r1) {
						//
						delta = (groupRange.position === "headerAndFooter") ? 2 : 1;

						if (cur.cr.r1 >= groupRange.cr.r1 && !((cur.cr.r1 === groupRange.cr.r1) && (cur.position === "footer"))) {
							cur.cr.r1 += delta;
						}

						if (cur.cr.r2 >= groupRange.cr.r1) {
							cur.cr.r2 += delta;
						}
						//
						//}
						//
					}
				}
			}
		};

		this._addIndent = function (cellObj, level) {
			var indent;
			if (level > 0 && (indent = this._grid.options.groupIndent)) {
				cellObj.paddingLeft = (indent * level) + "px";
			}
		};

		this._tally = function () {
			this._sum = 0;
			this._sum2 = 0;
			this._cntNumbers = 0;
			this._cntStrings = 0;
			this._max = 0;
			this._min = 0;
			this._minString = undefined;
			this._maxString = undefined;

			this.add = function (value) {
				if (value === null || value === "") {
					return;
				}

				this._cntStrings++;

				if (typeof (value) === "string") {

					if ((this._minString === undefined) || (value < this._minString)) {
						this._minString = value;
					}

					if ((this._maxString === undefined) || (value > this._maxString)) {
						this._maxString = value;
					}

					value = this._parseValue(value);
				}

				if (!isNaN(value)) { // number
					if (this._cntNumbers === 0) {
						this._min = value;
						this._max = value;
					}

					this._cntNumbers++;
					this._sum += value;
					this._sum2 += value * value;

					if (value < this._min) {
						this._min = value;
					}

					if (value > this._max) {
						this._max = value;
					}
				}
			};

			this.getValueString = function (column) {
				if (this._cntNumbers) {
					var value = this._getValue(column.aggregate),
						gridView = column.owner;

					return gridView._toStr(column, value);
				}

				if (this._cntStrings) {
					// we only support max/min and count for strings
					switch (column.aggregate) {
						case "max":
							return this._maxString;

						case "min":
							return this._minString;

						case "count":
							return this._cntStrings.toString();
					}
				}

				return "";
			};

			this._getValue = function (aggregate) {
				switch (aggregate) {
					case "average":
						return (this._cntNumbers === 0)
							? 0
							: this._sum / this._cntNumbers;

					case "count":
						return this._cntStrings;

					case "max":
						return this._max;

					case "min":
						return this._min;

					case "sum":
						return this._sum;

					case "std":
						if (this._cntNumbers <= 1) {
							return 0;
						}

						return Math.sqrt(this._getValue("var"));

					case "stdPop":
						if (this._cntNumbers <= 1) {
							return 0;
						}

						return Math.sqrt(this._getValue("varPop"));

					case "var":
						if (this._cntNumbers <= 1) {
							return 0;
						}

						return this._getValue("varPop") * this._cntNumbers / (this._cntNumbers - 1);

					case "vapPop":
						if (this._cntNumbers <= 1) {
							return 0;
						}

						var tmp = this._sum / this._cntNumbers;
						return this._sum2 / this._cntNumbers - tmp * tmp;
				}

				return 0;
			};

			// strings only
			this._parseValue = function (value) {
				var percent = false,
					len = value.length,
					val;

				if ((len > 0) && (value.indexOf("%") === len - 1)) {
					percent = true;
					value = value.substr(0, len - 1);
				}

				val = parseFloat(value);
				if (isNaN(val)) {
					return NaN;
				}

				return (percent)
						? val / 100 // "12%" -> 0.12f
						: val;
			};
		};
	}
});

$.extend($.wijmo.wijgrid, {
	groupHelper: function () {

		this.getGroupInfo = function (domRow) {

			if (domRow) {
				if (!$.wijmo.wijgrid._getGroupInfoRegExp) {
					$.wijmo.wijgrid._getGroupInfoRegExp = new RegExp(".*G([HF]){1}(\\d+)-(\\d+)$");
				}

				var info = $.wijmo.wijgrid._getGroupInfoRegExp.exec(domRow.id),
					level, index, isHeader;

				if (info) {
					level = parseInt(info[3], 10);
					index = parseInt(info[2], 10);
					isHeader = (info[1] === "H");

					return {
						level: level,
						index: index,
						isHeader: isHeader,
						toString: function () {
							return (this.isHeader ? "GH" : "GF") + this.index + "-" + this.level;
						}
					};
				}
			}

			return null;
		};

		this.getColumnByGroupLevel = function (leaves, level) {
			var i, len, leaf;

			for (i = 0, len = leaves.length; i < len; i++) {
				leaf = leaves[i];
				if (leaf.groupInfo && (leaf.groupInfo.level === level)) {
					return leaf;
				}
			}

			return null;
		};

		this.getGroupedColumnsCount = function (leaves) {
			var result = 0,
				i, len, groupInfo;

			for (i = 0, len = leaves.length; i < len; i++) {
				groupInfo = leaves[i].groupInfo;
				if (groupInfo && (groupInfo.position !== "none")) {
					result++;
				}
			}

			return result;
		};

		// cellRange cellRange
		// groupRange[] childExpandInfo
		this.getChildGroupIndex = function (cellRange, childExpandInfo) {

			var left = 0,
				right = childExpandInfo.length - 1,
				median, cmp;

			while (left <= right) {
				median = ((right - left) >> 1) + left;
				cmp = childExpandInfo[median].cr.r1 - cellRange.r1;

				if (cmp === 0) {
					return median;
				}

				if (cmp < 0) {
					left = median + 1;
				} else {
					right = median - 1;
				}
			}

			return left;
			//return ~left;
		};

		// cellRange childRange
		// groupRange[] parentExpandInfo
		this.getParentGroupIndex = function (cellRange, parentExpandInfo) {

			var idx = this.getChildGroupIndex(cellRange, parentExpandInfo);
			if (idx > 0) {
				idx--;
			}

			return (idx < parentExpandInfo.length)
				? idx
				: -1;
		};

		// level: 1-based level of the cellRange;
		this.getChildGroupRanges = function (leaves, cellRange, level) {
			var result = [],
				childRanges, childRange, i, len, firstChildIdx,
				childGroupedColumn = this.getColumnByGroupLevel(leaves, level + 1);

			if (childGroupedColumn) {
				childRanges = childGroupedColumn.groupInfo.expandInfo;

				firstChildIdx = this.getChildGroupIndex(cellRange, childRanges);
				for (i = firstChildIdx, len = childRanges.length; i < len; i++) {
					childRange = childRanges[i];
					if (childRange.cr.r2 <= cellRange.r2) {
						result.push(childRange);
					} else {
						break;
					}
				}

				/*for (var i = 0, len = childRanges.length; i < len; i++) {
				if (childRange.cr.r1 >= cellRange.r1 && childRange.r2 <= cellRange.r2) {
				result.push(childRange);
				}
				}*/
			}

			return result;
		};

		// level: 1-based level of the cellRange; optional.
		this.getParentGroupRange = function (leaves, cellRange, level) {
			var i, groupInfo, idx;

			if (level === undefined) {
				level = 0xFFFF;
			}


			if (level - 2 >= 0) {
				for (i = leaves.length - 1; i >= 0; i--) {
					groupInfo = leaves[i].groupInfo;
					if (!groupInfo || !groupInfo.expandInfo || (groupInfo.level < 0) || (groupInfo.level >= level)) {
						continue;
					}

					idx = this.getParentGroupIndex(cellRange, groupInfo.expandInfo);
					if (idx >= 0) {
						return groupInfo.expandInfo[idx];
					}
				}
			}

			return null;
		};

		// level: 1-based level of the cellRange.
		this.isParentCollapsed = function (leaves, cellRange, level) {
			var i, parentGroupRange;

			if (level === 1) {
				return false;
			}

			for (i = level; i > 1; i--) {
				parentGroupRange = this.getParentGroupRange(leaves, cellRange, i);

				if (parentGroupRange && !parentGroupRange.isExpanded) {
					return true;
				}

				cellRange = parentGroupRange.cr;
			}

			return false;
		};

		// level: 1-based level of the cellRange.
		this.isParentExpanded = function (leaves, cellRange, level) {
			var i, parentGroupRange;

			if (level === 1) {
				return true;
			}

			for (i = level; i > 1; i--) {
				parentGroupRange = this.getParentGroupRange(leaves, cellRange, i);

				if (parentGroupRange && parentGroupRange.isExpanded) {
					return true;
				}

				cellRange = parentGroupRange.cr;
			}

			return false;
		};
	}
});
$.extend($.wijmo.wijgrid, {
	cellRange: function (row1, col1, row2, col2) {
		switch (arguments.length) {
			case 2:
				this.r1 = this.r2 = row1;
				this.c1 = this.c2 = col1;
				break;
			case 4:
				this.r1 = row1;
				this.r2 = row2;
				this.c1 = col1;
				this.c2 = col2;
				break;
			default:
				this.r1 = 0;
				this.r2 = 0;
				this.c1 = 0;
				this.c2 = 0;
		}

		this.isSingleCell = function () {
			return ((this.r1 === this.r2) && (this.c1 === this.c2));
		};
	},

	merger: function () {
		this.merge = function (data, visibleLeaves) {
			this.leaves = visibleLeaves;
			this.data = data;

			var i, len, leaf;

			for (i = 0, len = visibleLeaves.length; i < len; i++) {
				leaf = visibleLeaves[i];

				if ((leaf.dataIndex >= 0) && !leaf.isBand && (leaf.rowMerge === "free" || leaf.rowMerge === "restricted")) {
					this.mergeColumn(leaf);
				}
			}
			delete this.data;
			delete this.leaves;
		};

		this.mergeColumn = function (column) {
			var dataIdx = column.dataIndex,
				i, len, range, span, spannedRow;

			for (i = 0, len = this.data.length; i < len; i++) {
				//if (this.data[i].rowType !== "data") {
				if (!(this.data[i].rowType & $.wijmo.wijgrid.rowType.data)) {
					continue;
				}

				range = this.getCellRange(i, column);

				if (range.r1 !== range.r2) {
					span = range.r2 - range.r1 + 1;
					this.data[range.r1][dataIdx].rowSpan = span;

					for (spannedRow = range.r1 + 1; spannedRow <= range.r2; spannedRow++) {
						//this.data[spannedRow][dataIdx] = null;
						this.data[spannedRow][dataIdx].visible = false;
					}
				}

				i = range.r2;
			}
		};

		this.getCellRange = function (rowIdx, column) {
			var columnIdx = column.dataIndex,
				range = new $.wijmo.wijgrid.cellRange(rowIdx, columnIdx),
				str = this.data[rowIdx][columnIdx].value,
				dataLen = this.data.length,
				dataItem, leafIdx, prevLeaf, range2;

			for (range.r2 = rowIdx; range.r2 < dataLen - 1; range.r2++) {
				dataItem = this.data[range.r2 + 1];

				//if ((dataItem.rowType !== "data") || (dataItem[columnIdx].value !== str)) {
				if (!(dataItem.rowType & $.wijmo.wijgrid.rowType.data) || (dataItem[columnIdx].value !== str)) {
					break;
				}
			}

			leafIdx = column.leavesIdx; // $.inArray(column, this.leaves);
			if (leafIdx > 0 && column.rowMerge === "restricted") {
				prevLeaf = this.leaves[leafIdx - 1];
				if (prevLeaf.dataIndex >= 0) {
					range2 = this.getCellRange(rowIdx, prevLeaf);
					range.r1 = Math.max(range.r1, range2.r1);
					range.r2 = Math.min(range.r2, range2.r2);
				}
			}

			return range;
		};
	}
});


$.extend($.wijmo.wijgrid, {
	/// <summary>
	/// Row type.
	/// </summary>
	rowType: {
		/// <summary>
		/// Header row.
		/// </summary>
		header: 1,

		/// <summary>
		/// Data row.
		/// </summary>
		data: 2,

		/// <summary>
		/// Data alternating row (used only as modifier of the rowType.data, not as independent value).
		/// </summary>
		dataAlt: 4,

		/// <summary>
		/// Filter row.
		/// </summary>
		filter: 8,

		/// <summary>
		/// Group header row.
		/// </summary>
		groupHeader: 16,

		/// <summary>
		/// Group footer row.
		/// </summary>
		groupFooter: 32
	},

	stringFormat: function (value, params) {
		if (!value) {
			return "";
		}

		for (var i = 1, len = arguments.length; i < len; i++) {
			value = value.replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
		}

		return value;
	},

	validDataKey: function (dataKey) {
		return (dataKey && !(dataKey < 0)) || (dataKey === 0);
	},

	iterateChildrenWidgets: function (item, callback) {
		if (item && callback) {
			if (item.nodeType) {
				item = $(item);
			}

			item.find(".ui-widget").each(function (domIndex, domValue) {
				$.each($(domValue).data(), function (dataKey, dataValue) {
					if (dataValue.widgetName && dataKey !== "owner") {
						callback(domIndex, dataValue);
					}
				});
			});
		}
	},

	domSelection: function (input) {
		this.getSelection = function () {
			var start = 0,
				end = 0,
				textRange;

			if (input.selectionStart) { // DOM3
				start = input.selectionStart;
				end = input.selectionEnd;
			} else {
				if (document.selection) { // IE
					textRange = document.selection.createRange().duplicate();
					end = textRange.text.length; // selection length
					start = Math.abs(textRange.moveStart("character", -input.value.length)); // move selection to the beginning
					end += start;
				}
			}

			return { start: start, end: end, length: end - start };
		};

		this.setSelection = function (range) {
			if (input.selectionStart) { // DOM3
				input.setSelectionRange(range.start, range.end);
			} else { // IE
				var textRange = input.createTextRange();
				textRange.collapse(true);
				textRange.moveStart("character", range.start);
				textRange.moveEnd("character", range.end);
				textRange.select();
			}
		};
	},

	bounds: function (element, client) {
		if (element) {
			var $dom = element.nodeType ? $(element) : element,
				offset = $dom.offset();

			if (offset) {
				if (client) {
					return { top: offset.top, left: offset.left, width: $dom[0].clientWidth || 0, height: $dom[0].clientHeight || 0 };
				}

				return { top: offset.top, left: offset.left, width: $dom.outerWidth(), height: $dom.outerHeight() };
			}
		}

		return null;
	},

	_getDOMText: function (domElement, controlDepth, depth) {
		if (depth === undefined) {
			depth = 0;
		}

		if (domElement && (!controlDepth || (controlDepth && depth < 2))) {
			if (domElement.nodeType === 3) { // text node
				return domElement.nodeValue;
			}
			else
				if (domElement.nodeType === 1) { // element node

					switch (domElement.type) {
						case "button":
						case "text":
						case "textarea":
						case "select-one":
							return domElement.value;
						case "checkbox":
							return domElement.checked.toString();
					}

					var result = "", i;

					for (i = 0; domElement.childNodes[i]; i++) {
						result += this._getDOMText(domElement.childNodes[i], controlDepth, depth + 1);
					}
					return result;
				}
		}

		return "";
	},

	ensureTBody: function (domTable) {
		if (domTable) {
			return (domTable.tBodies && domTable.tBodies.length > 0)
				? domTable.tBodies[0]
				: domTable.appendChild(document.createElement("tbody"));
		}

		return null;
	}

});

$.extend($.wijmo.wijgrid, {
	measurments: [],

	timerOn: function (cat) {
		this.measurments[cat] = new Date().getTime();
	},

	timerOff: function (cat) {
		var result = (new Date().getTime() - this.measurments[cat]) / 1000;
		delete this.measurments[cat];
		return result;
	},

	shallowMerge: function (target, src) {
		if (src && target) {
			var name, value, typeOf;

			for (name in src) {
				if (src.hasOwnProperty(name)) {
					value = src[name];
					typeOf = typeof (value);

					if ((typeOf === "string" || typeOf === "boolean" || typeOf === "number") && (target[name] === undefined)) {
						target[name] = value;
					}
				}
			}
		}
	}
});
var wijgridStringParser = {
	// DOM -> string
	parseDOM: function (value, culture, format, nullString) {
		return this.parse($.wijmo.wijgrid._getDOMText(value, true), culture, format, nullString);
	},

	// string -> string
	parse: function (value, culture, format, nullString) {
		if (value === null || value === nullString) {
			return null;
		}

		if (value === undefined || value === "&nbsp;") {
			return "";
		}

		return "" + value;
	},

	// string -> string
	toStr: function (value, culture, format, nullString) {
		if (value === null) {
			return nullString;
		}
		return value;
	}
};

var wijgridNumberParser = {
	// DOM -> number
	parseDOM: function (value, culture, format, nullString) {
		return this.parse($.wijmo.wijgrid._getDOMText(value, true), culture, format, nullString);
	},

	// string\ number -> number
	parse: function (value, culture, format, nullString) {
		if (typeof (value) === "number" && isNaN(value)) {
			return NaN;
		}

		if ((!value && value !== 0) || (value === "&nbsp;") || (value === nullString)) {
			return null;
		}

		return $.parseFloat(value, 10, culture.name);
	},

	// number -> string
	toStr: function (value, culture, format, nullString) {
		if (value === null) {
			return nullString;
		}

		return $.format(value, format ? format : "n", culture.name);
	}
};

var wijgridCurrencyParser = {
	// DOM -> number
	parseDOM: function (value, culture, format, nullString) {
		return this.parse($.wijmo.wijgrid._getDOMText(value, true), culture, format, nullString);
	},

	// string\ number -> number
	parse: function (value, culture, format, nullString) {
		if (typeof (value) === "number" && isNaN(value)) {
			return NaN;
		}

		if ((!value && value !== 0) || (value === "&nbsp;") || (value === nullString)) {
			return null;
		}

		if (typeof (value) === "string") {
			value = value.replace(culture.numberFormat.currency.symbol, "");
		}

		return $.parseFloat(value, 10, culture.name);
	},

	// number -> string (currency)
	toStr: function (value, culture, format, nullString) {
		if (value === null) {
			return nullString;
		}

		return $.format(value, format ? format : "c", culture.name);
	}
};

var wijgridDateTimeParser = {
	// DOM -> datetime
	parseDOM: function (value, culture, format, nullString) {
		return this.parse($.wijmo.wijgrid._getDOMText(value, true), culture, format, nullString);
	},

	// string/ datetime -> datetime
	parse: function (value, culture, format, nullString) {
		if (value instanceof Date) {
			return value;
		}

		if (!value || (value === "&nbsp;") || (value === nullString)) {
			return null;
		}

		var date = $.parseDate(value, format, culture.name);
		return date;
	},

	// datetime -> string
	toStr: function (value, culture, format, nullString) {
		if (value === null) {
			return nullString;
		}

		return $.format(value, format ? format : "d", culture.name);
	}
};

var wijgridBoolParser = {
	// DOM -> bool
	parseDOM: function (value, culture, format, nullString) {
		return this.parse($.wijmo.wijgrid._getDOMText(value, true), culture, format, nullString);
	},

	// string\ bool -> bool
	parse: function (value, culture, format, nullString) {
		var valType = typeof (value);

		if (valType === "boolean") {
			return value;
		}

		if (valType === "string") {
			value = $.trim(value);
		}

		if (!value || (value === "&nbsp;") || (value === nullString)) {
			return null;
		}

		switch (value.toLowerCase()) {
			case "true":
				return true;

			case "false":
				return false;
		}

		return NaN;
	},

	// bool -> string
	toStr: function (value, culture, format, nullString) {
		if (value === null) {
			return nullString;
		}

		return (value) ? "true" : "false";
	}
};
$.extend($.wijmo.wijgrid, {
	filterOperatorsCache: function () {
		var _cache = {};

		this.add = function (operator) {
			if (operator && operator.name && operator.operator) {
				var name = operator.name.toLowerCase();
				if (!_cache[name]) {
					_cache[name] = operator;
				}
			}
		};

		this.clear = function () {
			_cache.length = 0;
		};

		this.getByName = function (name) {
			return _cache[name.toLowerCase()];
		};

		this.getByDataType = function (dataType) {
			var result = [],
				name, operator;

			for (name in _cache) {
				if (_cache.hasOwnProperty(name)) {
					operator = _cache[name];

					if ($.inArray(dataType, operator.applicableTo) >= 0) {
						result.push(operator);
					}
				}
			}

			return result;
		};

		this.removeCustom = function () {
			for (var name in _cache) {
				if (_cache[name].custom) {
					delete _cache[name];
				}
			}
		};

		this.sort = function (filtersArray, mode) {
			switch (mode.toLowerCase()) {
				case "alphabetical":
					filtersArray.sort(sortAlpha);
					break;
				case "alphabeticalcustomfirst":
					filtersArray.sort(sortAlphaCustomFirst);
					break;

				case "alphabeticalembeddedFirst":
					filtersArray.sort(sortAlphaEmbeddedFirst);
					break;

				case "none": // do nothing
					break;

				default:
					break;
			}

			return filtersArray;
		};

		function sortAlpha(a, b) {
			var n1 = a.name.toLowerCase(),
				n2 = b.name.toLowerCase();

			if (n1 !== n2) {
				if (n1 === "nofilter") {
					return -1;
				}

				if (n2 === "nofilter") {
					return 1;
				}
			}

			if (n1 === n2) {
				return 0;
			}

			return (n1 < n2)
				? -1
				: 1;
		}

		function sortAlphaEmbeddedFirst(a, b) {
			var n1 = a.name.toLowerCase(),
				n2 = b.name.toLowerCase();

			if (n1 !== n2) {
				if (n1 === "nofilter") {
					return -1;
				}

				if (n2 === "nofilter") {
					return 1;
				}
			}

			if (a.custom !== b.custom) {
				if (a.custom) {
					return 1;
				}

				if (b.custom) {
					return -1;
				}
			}

			if (n1 === n2) {
				return 0;
			}

			return (n1 < n2)
				? -1
				: 1;
		}

		function sortAlphaCustomFirst(a, b) {
			var n1 = a.name.toLowerCase(),
				n2 = b.name.toLowerCase();

			if (n1 !== n2) {
				if (n1 === "nofilter") {
					return -1;
				}

				if (n2 === "nofilter") {
					return 1;
				}
			}

			if (a.custom !== b.custom) {
				if (a.custom) {
					return -1;
				}

				if (b.custom) {
					return 1;
				}
			}

			if (n1 === n2) {
				return 0;
			}

			return (n1 < n2)
				? -1
				: 1;
		}
	}
});

$.wijmo.wijgrid.embeddedFilters = [
  {
	name: "NoFilter",
	arity: 1,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal) {
		return true;
	}
  },
  {
	name: "Contains",
	arity: 2,
	applicableTo: ["string"],
	operator: function (dataVal, filterVal) {
		if (dataVal === filterVal) { // handle null and undefined
			return true;
		}

		return (dataVal)
			  ? dataVal.indexOf(filterVal) >= 0
			  : false;
	}
  },
  {
	name: "NotContain",
	arity: 2,
	applicableTo: ["string"],
	operator: function (dataVal, filterVal) {
		if (dataVal === filterVal) { // handle null and undefined
			return false;
		}

		return (dataVal)
			  ? dataVal.indexOf(filterVal) < 0
			  : true;
	}
  },
  {
	name: "BeginsWith",
	arity: 2,
	applicableTo: ["string"],
	operator: function (dataVal, filterVal) {
		if (dataVal === filterVal) { // handle null and undefined
			return true;
		}

		return (dataVal)
			  ? dataVal.indexOf(filterVal) === 0
			  : false;
	}
  },
  {
	name: "EndsWith",
	arity: 2,
	applicableTo: ["string"],
	operator: function (dataVal, filterVal) {
		if (dataVal === filterVal) { // handle null and undefined
			return true;
		}

		if (dataVal) {
			var idx = dataVal.lastIndexOf(filterVal);
			return (idx >= 0)
				  ? (dataVal.length - idx) === filterVal.length
				  : false;
		}

		return false;
	}
  },
  {
	name: "Equals",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal === filterVal;
	}
  },
  {
	name: "NotEqual",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal !== filterVal;
	}
  },
  {
	name: "Greater",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal > filterVal;
	}
  },
  {
	name: "Less",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal < filterVal;
	}
  },
  {
	name: "GreaterOrEqual",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal >= filterVal;
	}
  },
  {
	name: "LessOrEqual",
	arity: 2,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal, filterVal) {
		if (dataVal instanceof Date) {
			dataVal = dataVal.getTime();
		}

		if (filterVal instanceof Date) {
			filterVal = filterVal.getTime();
		}

		return dataVal <= filterVal;
	}
  },
  {
	name: "IsEmpty",
	arity: 1,
	applicableTo: ["string"],
	operator: function (dataVal) {
		return !dataVal && dataVal !== 0 && dataVal !== false;
	}
  },
  {
	name: "NotIsEmpty",
	arity: 1,
	applicableTo: ["string"],
	operator: function (dataVal) {
		return !!dataVal || dataVal === 0 || dataVal === false;
	}
  },
  {
	name: "IsNull",
	arity: 1,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal) {
		return dataVal === null;
	}
  },
  {
	name: "NotIsNull",
	arity: 1,
	applicableTo: ["string", "number", "datetime", "currency", "boolean"],
	operator: function (dataVal) {
		return dataVal !== null;
	}
  }
];
$.extend($.wijmo.wijgrid, {
	htmlTableAccessor: function (domTable) {
		var offsets = [],
			width = 0,
			table = domTable;

		_buildOffsets();

		function _buildOffsets() {
			var rowSpan = [],
				rowOffsets, i, rowLen, row, j, jOffset, celLen, cell, cs, rowSpanLen;

			for (i = 0, rowLen = table.rows.length; i < rowLen; i++) {
				rowOffsets = [];
				offsets[i] = rowOffsets;

				row = table.rows[i];
				for (j = 0, jOffset = 0, celLen = row.cells.length; j < celLen; j++, jOffset++) {
					cell = row.cells[j];

					// process rowspan
					for (; rowSpan[jOffset] > 1; jOffset++) {
						rowSpan[jOffset]--;
						rowOffsets[jOffset] = { cellIdx: -1, colIdx: -1 };
					}

					if (!(rowSpan[jOffset] > 1)) {
						rowSpan[jOffset] = cell.rowSpan;
					}

					rowOffsets[jOffset] = { cellIdx: j, colIdx: -1 };
					rowOffsets[j].colIdx = jOffset;

					// process colspan
					cs = cell.colSpan;
					for (; cs > 1; cs--) {
						rowOffsets[++jOffset] = { cellIdx: -1, colIdx: -1 };
					}
				}

				rowSpanLen = rowSpan.length;
				for (; jOffset < rowSpanLen; jOffset++) {
					rowSpan[jOffset]--;
					rowOffsets[jOffset] = { cellIdx: -1, colIdx: -1 };
				}

				width = Math.max(width, rowSpanLen);
			}
		}

		this.element = function () {
			return domTable;
		};

		this.getCellIdx = function (colIdx, rowIdx) {
			return (colIdx < width)
				? offsets[rowIdx][colIdx].cellIdx
				: -1;
		};

		// arguments:
		// (cellIdex, rowIdx)
		// or
		// (domCell)
		this.getColumnIdx = function (cellIdx, rowIdx) {
			if (typeof (cellIdx) !== "number") { // domCell
				var domCell = cellIdx;
				cellIdx = domCell.cellIndex;
				rowIdx = domCell.parentNode.rowIndex;
			}

			return (cellIdx < width)
				? offsets[rowIdx][cellIdx].colIdx
				: -1;
		};

		// scope:
		// 1 - tHead
		// 2 - tBody
		// 3 - tFoot
		// otherwise - table
		this.getSectionLength = function (scope) {
			var tableSection = table,
				tBodies;

			switch (scope) {
				case 1:
					tableSection = table.tHead;
					break;

				case 2:
					if ((tBodies = table.tBodies) && tBodies.length) {
						tableSection = tBodies[0];
					}
					break;

				case 3:
					tableSection = table.tFoot;
					break;
			}

			return (tableSection)
				? tableSection.rows.length
				: 0;
		};

		// scope:
		// 1 - tHead
		// 2 - tBody
		// 3 - tFoot
		// otherwise - table
		this.getSectionRow = function (rowIndex, scope) {
			var tableSection = table,
				tBodies;

			switch (scope) {
				case 1:
					tableSection = table.tHead;
					break;

				case 2:
					if ((tBodies = table.tBodies) && tBodies.length) {
						tableSection = tBodies[0];
					}
					break;

				case 3:
					tableSection = table.tFoot;
					break;
			}

			return tableSection ?
				tableSection.rows[rowIndex]
				: undefined;
		};

		// iterates through the table rows using natural cells order
		this.forEachColumnCellNatural = function (columnIdx, callback, param) {
			var i, rowLen, row, result;

			for (i = 0, rowLen = table.rows.length; i < rowLen; i++) {
				row = table.rows[i];

				if (columnIdx < row.cells.length) {
					result = callback(row.cells[columnIdx], columnIdx, param);
					if (result !== true) {
						return result;
					}
				}
			}

			return true;
		};

		// iterates through the table rows using colSpan\rowSpan offsets
		this.forEachColumnCell = function (columnIdx, callback, param) {
			var i, rowLen, row, offsetCellIdx, result;

			for (i = 0, rowLen = offsets.length; i < rowLen; i++) {
				row = table.rows[i];

				offsetCellIdx = this.getCellIdx(columnIdx, i);
				if (offsetCellIdx >= 0) {
					result = callback(row.cells[offsetCellIdx], i, param);
					if (result !== true) {
						return result;
					}
				}
			}

			return true;
		};

		// iterates throw the cells of a table row
		this.forEachRowCell = function (rowIndex, callback, param) {
			var row = table.rows[rowIndex],
				i, celLen, result;

			for (i = 0, celLen = row.cells.length; i < celLen; i++) {
				result = callback(row.cells[i], i, param);
				if (result !== true) {
					return result;
				}
			}

			return true;
		};

		/*dma>*/
		this.colGroupTag = function () {
			var cgs = table.getElementsByTagName("colgroup");
			return (cgs !== null && cgs.length > 0) ? cgs[0] : null;
		};

		this.colTags = function () {
			var colGroup = this.colGroupTag();
			return (colGroup !== null) ? colGroup.getElementsByTagName("col") : [];
		};
		/*<dma*/
	}
});
$.wijmo.wijgrid.cellInfo = function (cellIndex, rowIndex) {
	/// <summary>
	/// Object that represents a single cell.
	/// Code example: var cell = new $.wijmo.wijgrid.cellInfo(0, 0);
	/// </summary>
	/// <param name="cellIndex">Zero-based index of the required cell inside the corresponding row.</param>
	/// <param name="rowIndex">Zero-based index of the row that contains required cell.</param>
	/// <returns type="$.wijmo.wijgrid.cellInfo">Object that represents a single cell.</returns>

	var _isEdit = false,
		_gridView = null;

	// public
	this.cellIndex = function (value) {
		/// <summary>
		/// Gets the zero-based index of the cell in the row which it corresponds to.
		/// Code example: var index = cellInfoObj.cellIndex();
		/// </summary>
		/// <returns type="Number" integer="true"></returns>

		if (value === undefined) {
			return cellIndex;
		}

		cellIndex = value;
	};

	this.column = function () {
		/// <summary>
		/// Gets the associated column object.
		/// Code example: var index = cellInfoObj.column();
		/// <summary>
		/// <returns type="Object"></returns>

		if (_gridView && this._isValid()) {
			var offset = _gridView._getDataToAbsOffset();
			return _gridView._field("visibleLeaves")[cellIndex + offset.x];
		}

		return null;
	};


	this.rowIndex = function (value) {
		/// <summary>
		/// Gets the zero-based index of the row containing the cell.
		/// Code example: var index = cellInfoObj.rowIndex();
		/// </summary>
		/// <returns type="Number" integer="true"></returns>

		if (value === undefined) {
			return rowIndex;
		}

		rowIndex = value;
	};

	this.isEqual = function (value) {
		/// <summary>
		/// Compares the current object with a specified one and indicates whether they are identical.
		/// Code example: var isEqual = cellInfoObj1.isEqual(cellInfoObj2);
		/// </summary>
		/// <param name="value" type="$.wijmo.wijgrid.cellInfo">Object to compare</param>
		/// <returns type="Boolean">True if the objects are identical, otherwise false.</returns>
		return (value && (value.rowIndex() === rowIndex) && (value.cellIndex() === cellIndex));
	};

	this.tableCell = function () {
		/// <summary>
		/// Returns the table cell element corresponding to this object.
		/// Code example: var domCell = cellInfoObj.tableCell();
		/// </summary>
		/// <returns type="Object" domElement="true" />
		if (_gridView && this._isValid()) {
			var offset = _gridView._getDataToAbsOffset();
			return _gridView._field("view").getCell(cellIndex + offset.x, rowIndex + offset.y);
		}

		return null;
	};

	this.container = function () {
		/// <summary>
		/// Returns the jQuery object containing a cell content.
		/// Code example: var $container = cellInfoObj.container();
		/// </summary>
		/// <returns type="jQuery" />
		var tableCell = this.tableCell(),
			$innerDiv;

		if (tableCell) {
			$innerDiv = $(tableCell).children("div.wijmo-wijgrid-innercell");
			if ($innerDiv) {
				return $innerDiv;
			}
		}

		return null;
	};

	this.value = function (value/*opt*/) {
		/// <summary>
		/// Gets or sets underlying cell data.
		/// Code example:
		/// -) Getter:
		///   var value = cellInfoObj.value();
		/// -) Setter:
		///   cellInfoObj.value("value");
		/// <summary>
		/// <param name="value" type="Object">Value to set.</param>
		/// <returns type="Object" />
		/// <remarks>
		/// "invalid value" exception will be thrown by the setter if the value does not correspond to associated column.
		/// <remarks>
		var column, dataTableRow, dataTableCell;

		if (_gridView && this._isValid()) {
			dataTableRow = _gridView.dataTable[rowIndex];
			if (dataTableRow.rowType & $.wijmo.wijgrid.rowType.data) {
				column = this.column();

				if (arguments.length === 0) { // getter
					return dataTableRow[/*cellIndex*/column.dataIndex].value;
				} else { // setter
					// validation
					value = _gridView._parse(column, value);

					if ((value === null && column.valueRequired) ||
						(column.dataType && column.dataType !== "string" && isNaN(value))) {
						throw "invalid value";
					} 

					dataTableCell = dataTableRow[/*cellIndex*/column.dataIndex];
					dataTableCell.value = value;

					_gridView._dataStore.updateValue(dataTableCell.originalRowIndex, column.dataKey, value);
				}
			}
		}
	};

	this.toString = function () {
		return cellIndex + ":" + rowIndex;
	};

	// * public


	// internal

	this._dataToAbs = function (offset) {
		cellIndex -= offset.x;
		rowIndex -= offset.y;

		return this;
	};

	this._clip = function (range) {
		var flag = false,
			val;

		if (cellIndex < (val = range.topLeft().cellIndex())) {
			flag = true;
			cellIndex = val;
		}

		if (cellIndex > (val = range.bottomRight().cellIndex())) {
			flag = true;
			cellIndex = val;
		}

		if (rowIndex < (val = range.topLeft().rowIndex())) {
			flag = true;
			rowIndex = val;
		}

		if (rowIndex > (val = range.bottomRight().rowIndex())) {
			flag = true;
			rowIndex = val;
		}

		return flag;
	};

	this._clone = function () {
		return new $.wijmo.wijgrid.cellInfo(cellIndex, rowIndex);
	};

	this._row = function () {
		if (_gridView && this._isValid()) {
			return _gridView._rows().item(rowIndex);
		}

		return null;
	};

	this._isValid = function () {
		return cellIndex >= 0 && rowIndex >= 0;
	};

	this._isEdit = function (value) {
		if (!arguments.length) {
			return _isEdit;
		}

		_isEdit = value;
	};

	this._setGridView = function (value) {
		_gridView = value;
	};

	// internal *
};

$.wijmo.wijgrid.cellInfo.prototype.outsideValue = new $.wijmo.wijgrid.cellInfo(-1, -1);

$.wijmo.wijgrid.cellInfoRange = function (topLeft, bottomRight) {
	/// <summary>
	/// Specifies a range of cells determined by two cells.
	/// Code example: var range = $.wijmo.wijgrid.cellInfoRange(new $.wijmo.wijgrid.cellInfo(0, 0), new $.wijmo.wijgrid.cellInfo(0, 0));
	/// </summary>
	/// <param name="topLeft" type="$.wijmo.wijgrid.cellInfo">Object that represents the top left cell of the range.</param>
	/// <param name="bottomRight" type="$.wijmo.wijgrid.cellInfo">Object that represents the bottom right cell of the range.</param>
	/// <returns type="$.wijmo.wijgrid.cellInfoRange"></returns>

	if (!topLeft || !bottomRight) {
		throw "invalid arguments";
	}

	var _topLeft = topLeft._clone(),
		_bottomRight = bottomRight._clone();

	// public 

	this.bottomRight = function () {
		/// <summary>
		/// Gets the object that represents the bottom right cell of the range.
		/// Code example: var cellInfoObj = range.bottomRight();
		/// <summary>
		/// <returns type="$.wijmo.wijgrid.cellInfo" />
		return _bottomRight;
	};

	this.isEqual = function (range) {
		/// <summary>
		/// Compares the current range with a specified range and indicates whether they are identical.
		/// Code example: var isEqual = range1.isEqual(range2);
		/// <summary>
		/// <param name="range" type="$.wijmo.wijgrid.cellInfoRange">Range to compare.</param>
		/// <returns type="Boolean">True if the ranges are identical, otherwise false.</returns>
		return (range && _topLeft.isEqual(range.topLeft()) && _bottomRight.isEqual(range.bottomRight()));
	};

	this.topLeft = function () {
		/// <summary>
		/// Gets the object that represents the top left cell of the range.
		/// Code example: var cellInfoObj = range.topLeft();
		/// <summary>
		/// <returns type="$.wijmo.wijgrid.cellInfo" />
		return _topLeft;
	};

	this.toString = function () {
		return _topLeft.toString() + " - " + _bottomRight.toString();
	};

	// public *

	// internal
	this._isIntersect = function (range) {
		var rangeH, thisH, rangeW, thisW;
		if (range) {
			rangeH = range.bottomRight().rowIndex() - range.topLeft().rowIndex() + 1;
			thisH = _bottomRight.rowIndex() - _topLeft.rowIndex() + 1;

			if ((range.topLeft().rowIndex() + rangeH) - _topLeft.rowIndex() < rangeH + thisH) {
				rangeW = range.bottomRight().cellIndex() - range.topLeft().cellIndex() + 1;
				thisW = _bottomRight.cellIndex() - _topLeft.cellIndex() + 1;

				return ((range.topLeft().cellIndex() + rangeW) - _topLeft.cellIndex() < rangeW + thisW);
			}
		}

		return false;
	};

	this._isValid = function () {
		return _topLeft._isValid() && _bottomRight._isValid();
	};

	this._clip = function (clipBy) {
		return _topLeft._clip(clipBy) | _bottomRight._clip(clipBy);
	};

	this._clone = function () {
		return new $.wijmo.wijgrid.cellInfoRange(_topLeft._clone(), _bottomRight._clone());
	};

	this._containsCellInfo = function (info) {
		return (info && info.cellIndex() >= _topLeft.cellIndex() && info.cellIndex() <= _bottomRight.cellIndex() &&
				info.rowIndex() >= _topLeft.rowIndex() && info.rowIndex() <= _bottomRight.rowIndex());
	};

	this._containsCellRange = function (range) {
		return (range && this._containsCellInfo(range.topLeft()) && this._containsCellInfo(range.bottomRight()));
	};

	// mode:
	//  0: none
	//  1: extendToColumn
	//  2: extendToRow
	//
	// borders - cellInfoRange
	this._extend = function (mode, borders) {
		if (mode === 1) {
			_topLeft.rowIndex(borders.topLeft().rowIndex());
			_bottomRight.rowIndex(borders.bottomRight().rowIndex());
		} else {
			if (mode === 2) {
				_topLeft.cellIndex(borders.topLeft().cellIndex());
				_bottomRight.cellIndex(borders.bottomRight().cellIndex());
			}
		}

		return this;
	};

	this._normalize = function () {
		var x0 = _topLeft.cellIndex(),
			y0 = _topLeft.rowIndex(),
			x1 = _bottomRight.cellIndex(),
			y1 = _bottomRight.rowIndex();

		_topLeft.cellIndex(Math.min(x0, x1));
		_topLeft.rowIndex(Math.min(y0, y1));

		_bottomRight.cellIndex(Math.max(x0, x1));
		_bottomRight.rowIndex(Math.max(y0, y1));
	};

	// internal *
};
$.extend($.wijmo.wijgrid, {
	flatView: function (gridView) {
		var _dataTable = null,
			_contentArea = null,
			verScrollBarSize = 18;

		this.initialize = function () {
			_dataTable = null;
			_contentArea = null;
			this._createLayout();
		};

		this._createLayout = function () {
			if (gridView.options.scrollMode !== "none") {
				gridView.outerDiv.wrapInner("<div class=\"wijmo-wijgrid-fixedview\"><div class=\"wijmo-wijgrid-split-area wijmo-wijgrid-split-area-se wijmo-wijgrid-content-area\"></div></div>");
			}
		};

		this._testNeedVBar = function (outerDiv, gridEle, mode) {
			var excludeVbarWidth, gridWidth, gridHeight, outerWidth, outerHeight;

			gridWidth = gridEle.width();
			gridHeight = gridEle.height();
			outerWidth = outerDiv.width();
			outerHeight = outerDiv.height();
			// remove auto width to make width 100%  take effect. 
			if (gridEle[0].style.width === "auto") {
				gridEle.css("width", "");
			}
			if (mode === "both" || mode === "vertical") {
				excludeVbarWidth = true;
			}
			else if (mode === "auto") {
				if (gridHeight > outerHeight) {
					excludeVbarWidth = true;
				}
				else if (gridWidth > outerWidth && gridHeight > outerHeight - verScrollBarSize) {
					excludeVbarWidth = true;
				}
			}
			return excludeVbarWidth;
		};

		this.updateSplits = function () {
			var self = this,
				hasWidth = false,
				gridEle = gridView.element,
				widthArray = [],
				visibleLeaves, colTags, splitSE, mode, outerDiv, beforeWidth, after, o, colIndex, diff, len;

			o = gridView.options;
			visibleLeaves = gridView._field("visibleLeaves");
			colTags = _dataTable.colTags();

			// if any column has width option, we will set the width for inner cells.
			$.each(visibleLeaves, function (index, leaf) {
				if (leaf.width) {
					hasWidth = true;
					colTags[index].width = leaf.width;
				}
			});

			mode = gridView.options.scrollMode;
			outerDiv = gridView.outerDiv;

			if (o.scrollMode !== "none" || hasWidth || o.allowColSizing || o.allowEditing || o.autoExpandColumnIndex) {
				splitSE = (o.scrollMode === "none") ? outerDiv : outerDiv.find(".wijmo-wijgrid-content-area");
				if (self._testNeedVBar(gridView.outerDiv, gridEle, mode)) {
					splitSE.width(splitSE.width() - verScrollBarSize);
				}
				if (splitSE.innerWidth() > gridEle[0].offsetWidth) {
					// whether to expand grid with 100% width, if autoExpandColumnIndex is set, the addtional space will be added to the specified column.
					if (o.autoExpandColumnIndex) {
						gridEle.css("width", "auto");
						beforeWidth = splitSE.innerWidth();
					}
					else {
						gridEle.css("width", "100%");
						beforeWidth = gridEle[0].offsetWidth;
					}
				}
				// read column widths.
				$.each(visibleLeaves, function (index, leaf) {
					self.setColumnWidth(index, null, widthArray);
				});
				// set column width
				$.each(widthArray, function (index, width) {
					self.setColumnWidth(index, width);
					// remove col width
					if (hasWidth) {
						$(colTags[index]).removeAttr("width");
					}
				});
				gridEle.css("width", "auto");
				if (!isNaN(beforeWidth) && visibleLeaves.length > 0) {
					after = gridEle[0].offsetWidth;
					diff = beforeWidth - after;
					if (diff !== 0) {
						len = widthArray.length - 1;
						colIndex = o.autoExpandColumnIndex || len;
						if (colIndex > len) {
							colIndex = len;
						}
						if (diff) {
							self.setColumnWidth(colIndex, widthArray[colIndex] + diff);
						}
					}
				}
			}
			else if (outerDiv.innerWidth() > gridEle[0].offsetWidth) {
				gridEle.css("width", "100%");
			}
			// refresh super panel after width is set.
			self.refreshPanel();
		};

		this.setColumnWidth = function (index, px, widthArray) {
			/// <summary>
			/// Set column width.
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the column. Start with 0.
			/// </param>
			/// <param name="px" type="Number">
			/// The width of each column.
			/// </param>

			// var tableEle = $(_dataTable.element());
			var th = this.getHeaderCell(index);
			if (th) {
				px = px ? px : th.clientWidth;
				if (widthArray) {
					widthArray.push(px);
					return;
				}
				if (px) {
					// set width on inner div of th and table td in each column.
					$(th).children("div.wijmo-wijgrid-innercell").setOutWidth(px);

					this.forEachColumnCell(index, function (cell, index) {
						var $row = $(cell.parentNode);

						if ($row.parent().is("tbody") && !$row.is(".wijmo-wijgrid-groupheaderrow", ".wijmo-wijgrid-groupfooterrow")) {
							$(cell).children("div.wijmo-wijgrid-innercell").setOutWidth(px);
						}

						return true;
					});

					// tableEle.find("tbody > tr:not(.wijmo-wijgrid-groupheaderrow, .wijmo-wijgrid-groupfooterrow) > td:nth-child(" + (index + 1) + ") > div.wijmo-wijgrid-innercell").setOutWidth(px);
				}
			}
		};

		this._getMappedScrollMode = function () {
			var scrollMode = gridView.options.scrollMode,
				vScrollBarVisibility = "auto",
				hScrollBarVisibility = "auto";

			switch (scrollMode) {
				case "horizontal":
					vScrollBarVisibility = "hidden";
					hScrollBarVisibility = "visible";
					break;
				case "vertical":
					vScrollBarVisibility = "visible";
					hScrollBarVisibility = "hidden";
					break;
				case "both":
					vScrollBarVisibility = "visible";
					hScrollBarVisibility = "visible";
			}

			return { vScrollBarVisibility: vScrollBarVisibility, hScrollBarVisibility: hScrollBarVisibility };
		};

		this.refreshPanel = function () {
			var mode = gridView.options.scrollMode,
				outerDiv = gridView.outerDiv,
				splitSE, panelModes;

			if (mode !== "none") {
				splitSE = outerDiv.find(".wijmo-wijgrid-content-area");
				panelModes = this._getMappedScrollMode();

				splitSE.width(this._getGridWidth(mode));
				splitSE.height(outerDiv.innerHeight());

				if (!splitSE.data("wijsuperpanel")) {
					splitSE.wijsuperpanel({ vScroller: { scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility} });
				}
				else {
					splitSE.wijsuperpanel("paintPanel");
				}
			}
		};

		this._getGridWidth = function (mode) {
			var tableWidth = gridView.element.width(), outWidth = gridView.outerDiv.innerWidth();
			if (this._testNeedVBar(gridView.outerDiv, gridView.element, mode)) {
				tableWidth += verScrollBarSize;
			}
			if (tableWidth > outWidth) {
				tableWidth = outWidth;
			}
			return tableWidth;
		};

		this.render = function () {
			var visibleLeaves = gridView._field("visibleLeaves"),
				table = gridView.element[0],
				tHead = null,
				spanTable, span, width, ri, height, domRow, thX, ci,
				$domCell, $container,
				i, len, leaf,
				colGroup, col,
				data, sourceData, tBody, domRowDataIndex, ariaHeaders, rowLen,
				dataRow, dataRowLen, className,
				dict, key,
				cellLen, dataIndex, cellIndex, doBreak,
				cellValue, sourceDataRow, dataValue;

			// create header
			spanTable = gridView._field("spanTable");
			if (spanTable && spanTable.length) {
				tHead = table.createTHead();
				width = spanTable[0].length;

				for (ri = 0, height = spanTable.length; ri < height; ri++) {
					domRow = tHead.insertRow(-1);

					domRow.className = "wijmo-wijgrid-headerrow";
					domRow.role = "row";
					thX = 0;

					for (ci = 0; ci < width; ci++) {
						span = spanTable[ri][ci];

						if (span.column && (span.column.visible || span.column.visible === undefined)) {
							span.column.thX = thX++;
							span.column.thY = ri;

							$domCell = $(document.createElement("th"));

							if (ci === 0 && gridView.options.showRowHeader) {
								$domCell.addClass("ui-state-default wijmo-wijgrid-rowheader");
								$domCell.attr({ "role": "rowheader", "scope": "row" });
							} else {
								$domCell.attr({ "role": "columnheader", "scope": "col" });
							}

							if (span.colSpan > 1) {
								$domCell.attr("colSpan", span.colSpan);
							}

							if (span.rowSpan > 1) {
								$domCell.attr("rowSpan", span.rowSpan);
							}

							$container = $("<div class=\"wijmo-wijgrid-innercell\"></div>");
							$domCell.append($container);

							domRow.appendChild($domCell[0]);

							gridView.cellFormatter.format($container, span.column, span.column.headerText,
								$.wijmo.wijgrid.rowType.header, null);
						} // end if
					} // for ci

					gridView._rowCreated(domRow, null, $.wijmo.wijgrid.rowType.header, null);

				} // for ri
			} // end if
			// create header end

			// create filter
			if (gridView.options.showFilter) {
				if (!tHead) {
					tHead = table.createTHead();
				}

				domRow = tHead.insertRow(-1); // filterRow
				domRow.className = "wijmo-wijgrid-filterrow";
				domRow.role = "row";

				for (i = 0, len = visibleLeaves.length; i < len; i++) {
					leaf = visibleLeaves[i];
					$domCell = $(domRow.insertCell(-1)).attr("role", "gridcell");
					gridView.cellFormatter.format($domCell, leaf, leaf.filterValue, $.wijmo.wijgrid.rowType.filter, null);
				}

				gridView._rowCreated(domRow, null, $.wijmo.wijgrid.rowType.filter, null);
			}
			// create filter end

			// colgroup
			colGroup = document.createElement("colgroup");
			for (i = 0, len = visibleLeaves.length; i < len; i++) {
				col = document.createElement("col");

				/*
				var leaf = visibleLeaves[i];
				if (leaf.width) {
				col.width = leaf.width; // set column width
				}
				*/

				colGroup.appendChild(col);
			}
			table.appendChild(colGroup);
			// end colgroup


			// create body
			data = gridView.dataTable;
			sourceData = gridView.data();

			tBody = $.wijmo.wijgrid.ensureTBody(table);
			domRowDataIndex = 0;

			// build ARIA "headers" attribute for each leaf.
			ariaHeaders = $.wijmo.wijgrid.getAriaHeaders(visibleLeaves, $.wijmo.wijgrid.flatten(gridView.options.columns));

			// render rows
			for (ri = 0, rowLen = data.length; ri < rowLen; ri++) {
				dataRow = data[ri];

				sourceDataRow = (dataRow.rowType & $.wijmo.wijgrid.rowType.data)
					? sourceData[dataRow[0].originalRowIndex]
					: null;

				dataRowLen = dataRow.length;
				domRow = tBody.insertRow(-1);

				domRow.role = "row";

				className = "wijmo-wijgrid-row ui-widget-content";

				switch (dataRow.rowType) {
					case $.wijmo.wijgrid.rowType.data:
					case $.wijmo.wijgrid.rowType.data | $.wijmo.wijgrid.rowType.dataAlt:
						className += " wijmo-wijgrid-datarow";

						domRow.setAttribute("dataRowIndex", domRowDataIndex);

						if (dataRow.rowType & $.wijmo.wijgrid.rowType.dataAlt) {
							className += " wijmo-wijgrid-alternatingrow";
						}

						domRowDataIndex++;

						break;

					case $.wijmo.wijgrid.rowType.groupHeader:
						className += " wijmo-wijgrid-groupheaderrow";
						break;

					case $.wijmo.wijgrid.rowType.groupFooter:
						className += " wijmo-wijgrid-groupfooterrow";
						break;
				}

				if (className) {
					domRow.className = className;
				}

				// copy style properties
				dict = dataRow.__style;
				for (key in dict) {
					if (dict.hasOwnProperty(key)) {
						domRow.style[key] = dict[key];
					}
				}

				// copy attributes
				dict = dataRow.__attr;
				for (key in dict) {
					if (dict.hasOwnProperty(key)) {
						domRow[key] = dict[key];
					}
				}

				// render cells
				for (ci = 0, cellLen = visibleLeaves.length; ci < cellLen; ci++) {
					leaf = visibleLeaves[ci];
					dataIndex = leaf.dataIndex;

					cellIndex = 0;
					doBreak = false;

					switch (dataRow.rowType) {
						case $.wijmo.wijgrid.rowType.data:
						case $.wijmo.wijgrid.rowType.data | $.wijmo.wijgrid.rowType.dataAlt:
							cellIndex = dataIndex; // use [leaf -> data] mapping

							if (cellIndex >= 0 && (!dataRow[cellIndex] || (dataRow[cellIndex].visible === false))) {
								continue;  // spanned cell ?
							}
							break;

						case $.wijmo.wijgrid.rowType.groupHeader:
						case $.wijmo.wijgrid.rowType.groupFooter:
							cellIndex = ci; // just iterate through all dataRow cells.

							if (cellIndex >= dataRowLen) {
								doBreak = true;  // don't extend group headers\ footers with additional cells
							}
					}

					if (doBreak) {
						break;
					}

					$domCell = $(document.createElement("td"));

					if (ci === 0 && gridView.options.showRowHeader) {
						$domCell.addClass("wijmo-wijgrid-rowheader");
						$domCell.attr({ "role": "rowheader", "scope": "row" });
					} else {
						$domCell.attr("role", "gridcell");
					}

					$domCell.addClass("wijgridtd");

					$container = $("<div class=\"wijmo-wijgrid-innercell\"></div>");
					$domCell.append($container);

					if (cellIndex >= 0) {
						if (dataRow[cellIndex].rowSpan > 1) {
							$domCell.attr("rowSpan", dataRow[cellIndex].rowSpan);
						}

						if (dataRow[cellIndex].colSpan > 1) {
							$domCell.attr("colSpan", dataRow[cellIndex].colSpan);
						}

						if (dataRow[cellIndex].paddingLeft) {
							$container.css("padding-left", dataRow[cellIndex].paddingLeft);
						}
					}

					domRow.appendChild($domCell[0]);

					if ((dataRow.rowType & $.wijmo.wijgrid.rowType.data) && leaf.dataParser) {
						$domCell.attr("headers", ariaHeaders[ci/*cellIndex*/]);
						if (leaf.readOnly) {
							$domCell.attr("aria-readonly", "true");
						}

						cellValue = null;
						//sourceDataRow = sourceData[dataRow[0].originalRowIndex];

						if (cellIndex >= 0) { // cellIndex is equal to leaf.dataIndex here
							$domCell.addClass("wijdata-type-" + (leaf.dataType || "string"));
							dataValue = dataRow[cellIndex].value;
							cellValue = gridView._toStr(leaf, dataValue);

						} else { // unbound column
						}

						gridView.cellFormatter.format($container, leaf, cellValue, dataRow.rowType, sourceDataRow);
					} else {
						if (cellIndex >= 0) {
							$container.html(dataRow[cellIndex].html); // use original html
						}
					}
				} // for ci

				if (!domRow.cells.length) {
					tBody.removeChild(domRow);
				} else {
					gridView._rowCreated(domRow, null, dataRow.rowType, sourceDataRow);
				}
			} // for ri
			// create body end

			postRender();
		};

		this.attachEvents = function () {
		};

		//this.updateCss = function () {
		//};

		// array of a htmlTableAccessor instances
		this.subTables = function () {
			return [_dataTable];
		};

		this.focusableElement = function () {
			return _dataTable.element();
		};

		this.forEachRowCell = function (rowIndex, callback, param) {
			return _dataTable.forEachRowCell(rowIndex, callback, param);
		};

		this.forEachColumnCell = function (colIndex, callback, param) {
			return _dataTable.forEachColumnCell(colIndex, callback, param);
		};

		this.ensureWidth = function (delta, index) {
			if (arguments.length > 0) {
				this.setColumnWidth(index, delta);
			}
			this.refreshPanel();
		};

		this.getCell = function (absColIdx, absRowIdx) {
			var cellIdx = _dataTable.getCellIdx(absColIdx, absRowIdx),
				rowObj;

			if (cellIdx >= 0) {
				rowObj = this.getJoinedRows(absRowIdx, 0);
				if (rowObj[0]) {
					return rowObj[0].cells[cellIdx];
				}
			}

			return null;
		};

		this.getAbsoluteRowIndex = function (domRow) {
			return domRow.rowIndex;
		};

		this.getJoinedCols = function (columnIndex) {
			var $colGroup = $(_dataTable.element()).find("> colgroup");
			if ($colGroup.length) {
				if (columnIndex < $colGroup[0].childNodes.length) {
					return [$colGroup[0].childNodes[columnIndex], null];
				}
			}

			return [null, null];
		};

		this.getJoinedRows = function (rowIndex, rowScope) {
			return [_dataTable.getSectionRow(rowIndex, rowScope), null];
		};

		this.getJoinedTables = function (byColumn, index) {
			return [_dataTable, null, index];
		};

		this.getHeaderCell = function (absColIdx) {
			var leaf = gridView._field("visibleLeaves")[absColIdx],
				headerRow = gridView._headerRows();

			if (headerRow) {
				return new $.wijmo.wijgrid.rowAccessor().getCell(headerRow.item(leaf.thY), leaf.thX);
			}

			return null;
		};

		this.getAbsCellInfo = function (cell) {
			return new $.wijmo.wijgrid.cellInfo(_dataTable.getColumnIdx(cell), cell.parentNode.rowIndex);
		};

		this.getVisibleAreaBounds = function () {
			var dataTableBounds = $.wijmo.wijgrid.bounds(_dataTable.element()),
				splitSEBounds;

			if (gridView.options.scrollMode === "none") {
				return dataTableBounds;
			} else {
				splitSEBounds = $.wijmo.wijgrid.bounds(gridView.outerDiv.find(".wijmo-wijgrid-split-area-se:first")[0]);

				return {
					top: dataTableBounds.top,
					left: dataTableBounds.left,
					width: Math.min(splitSEBounds.width, dataTableBounds.width),
					height: Math.min(splitSEBounds.height, dataTableBounds.height)
				};
			}
		};

		// private
		function postRender() {
			gridView.element
			  .addClass("wijmo-wijgrid-table")
			  .find("> tbody").addClass("ui-widget-content wijmo-wijgrid-data");

			_dataTable = new $.wijmo.wijgrid.htmlTableAccessor(gridView.element[0]);

			// set width on td inner div of each column after all styles are applied to grid.
			gridView.element
				.attr({ "role": "grid", "cellpadding": "0", "border": "0", "cellspacing": "0" })
				.css("border-collapse", "separate");
		}
		// private
	}
});
$.wijmo.wijgrid.selection = function (gridView) {
	/// <summary>
	/// Object that represents selection in the grid.
	/// Code example: var selection = new $.wijmo.wijgrid.selection(gridView);
	/// </summary>
	/// <param name="gridview" type="$.wijmo.wijgrid" mayBeNull="false">gridView</param>
	/// <returns type="$.wijmo.wijgrid.selection">Object that represents selection in the grid</returns>
	var _updates = 0,
		_anchorCell,
		_addedCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView),
		_removedCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView),
		_selectedCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView),
		_addedDuringCurTransactionCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView),
		_selectedColumns = null, // ?
		_selectedRows = null; // ?

	this.selectedCells = function () {
		/// <summary>
		/// Gets a read-only collection of the selected cells.
		/// Code example: var selectedCells = selectionObj.selectedCells();
		/// </summary>
		/// <returns type="$.wijmo.wijgrid.cellInfoOrderedCollection"/>
		return _selectedCells;
	};

	/*this.selectedColumns = function () {
	return _selectedColumns; // TODO ?
	};

	this.selectedRows = function () {
	return _selectedRows; // TODO ?
	};*/

	this.addRange = function (cellRange /* x0 */, y0 /* opt */, x1 /* opt */, y1 /* opt */) {
		/// <summary>
		/// Adds a cell range to the current selection.
		///
		/// Usage:
		/// 1. addRange(cellRange)
		/// 2. addRange(x0, y0, x1, y1)
		/// 
		/// The result depends upon the chosen selection mode in the grid. For example, if current selection mode
		/// does not allow multiple selection the previous selection will be removed.
		///
		/// Code example: selectionObj.addRange(0, 0, 1, 1);
		/// </summary>
		/// <param name="cellRange" type="$.wijmo.wijgrid.cellInfoRange">Cell range to select.</param>
		/// <param name="x0" type="Number" integer="true">The x-coordinate that represents the top left cell of the range.</number>
		/// <param name="y0" type="Number" integer="true">The y-coordinate that represents the top left cell of the range.</number>
		/// <param name="x1" type="Number" integer="true">The x-coordinate that represents the bottom right cell of the range.</number>
		/// <param name="y1" type="Number" integer="true">The y-coordinate that represents the bottom right cell of the range.</number>

		if (!cellRange && (arguments.length === 1)) {
			throw "invalid argument";
		}

		var range = (arguments.length === 4)
				? new $.wijmo.wijgrid.cellInfoRange(new $.wijmo.wijgrid.cellInfo(cellRange, y0), new $.wijmo.wijgrid.cellInfo(x1, y1))
				: cellRange._clone();

		range._normalize();

		if (!range._isValid()) {
			throw "invalid argument";
		}

		this.beginUpdate();

		this._startNewTransaction(gridView._field("currentCell"));
		this._selectRange(range, false, true, 0 /* none*/, null);

		this.endUpdate();
	};

	this.clear = function () {
		/// <summary>
		/// Clears the selection.
		/// Code example: selectionObj.clear();
		/// </summary>
		this.beginUpdate();

		_removedCells._clear();
		_removedCells._addFrom(_selectedCells);

		this.endUpdate();
	};

	this.selectAll = function () {
		/// <summary>
		/// Selects all the cells in a grid.
		///
		/// The result depends upon the chosen selection mode in the grid.
		/// For example, if the selection mode is "singleCell", only the top left cell will be selected.
		///    
		/// Code example: selectionObj.selectAll();
		/// </summary>
		this.beginUpdate();

		this._selectRange(gridView._getDataCellsRange(), false, false, 0 /* none */, null);

		this.endUpdate();
	};

	this.beginUpdate = function () {
		/// <summary>
		/// Begins the update.
		/// The changes won't have effect until endUpdate() is called.
		/// Code example: selectionObj.beginUpdate();
		/// </summary>
		_updates++;
	};

	this.endUpdate = function () {
		/// <summary>
		/// Ends the update.
		/// The pending changes are executed and the corresponding events are raised.
		/// Code example: selectionObj.endUpdate();
		/// </summary>
		if (_updates > 0) {
			_updates--;

			if (_updates === 0) {
				doSelection(); // values must be clipped before this step

				if (_addedCells.length() || _removedCells.length()) {

					if (_selectedColumns !== null) {
						_selectedColumns.UnderlyingDataChanged(); // notify
					}

					if (_selectedRows !== null) {
						_selectedRows.UnderlyingDataChanged(); // notify
					}

					gridView._trigger("selectionchanged", null, { addedCells: _addedCells, removedCells: _removedCells });
				}

				_addedCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView);
				_removedCells._clear();
			}
		}
	};

	// * internal

	this._multipleRangesAllowed = function () {
		var mode = gridView.options.selectionMode;

		return (mode && ((mode = mode.toLowerCase()) === "multicolumn" || mode === "multirow" || mode === "multirange"));
	};

	this._anchorCell = function () {
		return _anchorCell;
	};

	this._startNewTransaction = function (dataCellInfo) {
		if (dataCellInfo) {
			_anchorCell = dataCellInfo._clone();
			_addedDuringCurTransactionCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView);
		}
	};

	this._clearRange = function (range, extendMode) {
		var selectionMode = gridView.options.selectionMode.toLowerCase(),
			rangeToClear, rowsLen, cellsLen, flag, row, cell,
			i, len, cellInfo;

		if (range._isValid() && (selectionMode !== "none") && (_selectedCells.length() > 0)) {
			rangeToClear = range._clone();

			rangeToClear._normalize();
			rangeToClear._clip(gridView._getDataCellsRange());

			if (!range._isValid()) {
				return;
			}

			rangeToClear = extendRangeBySelectionMode(rangeToClear, selectionMode, extendMode, null);

			this.beginUpdate();

			switch (selectionMode) {
				case "singlecell":
					if (rangeToClear._containsCellInfo(_selectedCells.item(0))) {
						this.clear();
					}
					break;

				case "singlecolumn":
				case "singlerow":
				case "singlerange":
					rowsLen = rangeToClear.bottomRight().rowIndex();
					cellsLen = rangeToClear.bottomRight().cellIndex();

					flag = false;
					for (row = rangeToClear.topLeft().rowIndex(); !flag && row <= rowsLen; row++) {
						for (cell = rangeToClear.topLeft().cellIndex(); !flag && cell <= cellsLen; cell++) {
							flag = _selectedCells.indexOf(cell, row) >= 0;
							if (flag) {
								this.clear();
							}
						}
					}
					break;

				case "multicolumn":
				case "multirow":
				case "multirange":
					for (i = 0, len = _selectedCells.length(); i < len; i++) {
						cellInfo = _selectedCells.item(i);

						if (rangeToClear._containsCellInfo(cellInfo)) {
							_removedCells._add(cellInfo);
						}
					}

					break;
			}

			this.endUpdate();
		}
	};

	this._selectRange = function (range, ctrlKey, shiftKey, extendMode, endPoint) {
		var selectionMode = gridView.options.selectionMode.toLowerCase(),
			rangeToSelect;

		if ((selectionMode !== "none") && range._isValid()) {
			rangeToSelect = range._clone();
			rangeToSelect._normalize();
			rangeToSelect._clip(gridView._getDataCellsRange());

			if (!rangeToSelect._isValid()) {
				return;
			}

			this.beginUpdate();

			if (!this._multipleRangesAllowed()) {
				this.clear();
			}
			else {
				if (ctrlKey || shiftKey) {
					if (shiftKey) {
						_removedCells._clear();
						_removedCells._addFrom(_addedDuringCurTransactionCells);
					}
				}
				else {
					this.clear();
				}
			}

			rangeToSelect = extendRangeBySelectionMode(rangeToSelect, selectionMode, extendMode, endPoint);
			doRange(rangeToSelect, true);

			this.endUpdate();
		}
	};

	// * internal

	// * private
	function extendRangeBySelectionMode(range, selectionMode, preferredExtendMode, endPoint) {
		var dataRange = gridView._getDataCellsRange();

		switch (selectionMode) {
			case "singlecell":
				range = (endPoint === null)
						? new $.wijmo.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
						: new $.wijmo.wijgrid.cellInfoRange(endPoint, endPoint);

				break;

			case "singlecolumn":
				range = (endPoint === null)
						? new $.wijmo.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
						: new $.wijmo.wijgrid.cellInfoRange(endPoint, endPoint);
				range._extend(1 /* extendToColumn */, dataRange);

				break;

			case "singlerow":
				range = (endPoint === null)
						? new $.wijmo.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
						: new $.wijmo.wijgrid.cellInfoRange(endPoint, endPoint);
				range._extend(2 /* extendToRow */, dataRange);
				break;

			case "singlerange":
				range._extend(preferredExtendMode, dataRange);
				break;

			case "multicolumn":
				range._extend(1 /* extendToColumn */, dataRange);
				break;

			case "multirow":
				range._extend(2 /* extendToRow */, dataRange);
				break;

			case "multirange":
				range._extend(preferredExtendMode, dataRange);
				break;
		}

		return range;
	}

	function doSelection() {
		var offsets = gridView._getDataToAbsOffset(),
			cellOffset = offsets.x,
			rowOffset = offsets.y,
			view = gridView._field("view"),
			i, len, info, cell, index;

		for (i = 0, len = _removedCells.length(); i < len; i++) {
			info = _removedCells.item(i);

			if (_addedCells.indexOf(info) < 0) {
				cell = view.getCell(info.cellIndex() + cellOffset, info.rowIndex() + rowOffset);
				if (cell) {
					$(cell)
						.removeClass("ui-state-highlight")
						.removeAttr("aria-selected");
				}

				_selectedCells._remove(info);
				_addedDuringCurTransactionCells._remove(info);
			}
			else {
				_removedCells._removeAt(i);
				i--;
				len--;
			}
		}

		for (i = 0, len = _addedCells.length(); i < len; i++) {
			info = _addedCells.item(i);

			index = _selectedCells.indexOf(info);
			if (index < 0) {
				cell = view.getCell(info.cellIndex() + cellOffset, info.rowIndex() + rowOffset);
				if (cell) {
					$(cell)
						.addClass("ui-state-highlight")
						.attr("aria-selected", "true");
				}
				_selectedCells._insertUnsafe(info, ~index);
				_addedDuringCurTransactionCells._add(info);
			}
			else {
				_addedCells._removeAt(i);
				i--;
				len--;
			}
		}
	}

	function doRange(range, add) {
		var x0 = range.topLeft().cellIndex(),
			y0 = range.topLeft().rowIndex(),
			x1 = range.bottomRight().cellIndex(),
			y1 = range.bottomRight().rowIndex(),
			cnt, row, col, cell;

		if (add) {
			cnt = _addedCells.length();
			for (row = y0; row <= y1; row++) {
				for (col = x0; col <= x1; col++) {
					cell = new $.wijmo.wijgrid.cellInfo(col, row);

					if (cnt === 0) {
						_addedCells._appendUnsafe(cell);
					}
					else {
						_addedCells._add(cell);
					}
				}
			}
		}
		else {
			cnt = _removedCells.length();
			for (row = y0; row <= y1; row++) {
				for (col = x0; col <= x1; col++) {
					cell = new $.wijmo.wijgrid.cellInfo(col, row);

					if (cnt === 0) {
						_removedCells._appendUnsafe(cell);
					}
					else {
						_removedCells._add(cell);
					}
				}
			}
		}
	}
	// * private
};

$.wijmo.wijgrid.cellInfoOrderedCollection = function (gridView) {
	/// <summary>
	/// Ordered read-only collection of a $.wijmo.wijgrid.cellInfo objects.
	/// Code example: var collection = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView);
	/// <summary>
	/// <param name="gridView" type="$.wijmo.wijgrid" mayBeNull="false">gridView</param>
	/// <returns type="$.wijmo.wijgrid.cellInfoOrderedCollection" />
	if (!gridView) {
		throw "argument is null";
	}

	var _list = [];

	// public
	this.item = function (index) {
		/// <summary>
		/// Gets an item at the specified index.
		/// Code example: var cellInfoObj = collection.item(0);
		/// </summary>
		/// <param name="index" type="Number" integer="true">The zero-based index of the item to get.</param>
		/// <returns type="$.wijmo.wijgrid.cellInfo">The $.wijmo.wijgrid.cellInfo object at the specified index.</returns>
		return _list[index];
	};

	this.length = function () {
		/// <summary>
		/// Gets the total number of the items in the collection.
		/// Code example: var len = collection.length();
		/// </summary>
		/// <returns type="Number" integet="true">The total number of the items in the collection.</returns>
		return _list.length;
	};

	// (cellInfo)
	// (cellIndex, rowIndex)
	this.indexOf = function (cellIndex, rowIndex) {
		/// <summary>
		/// Returns the zero-based index of specified collection item.
		///
		/// Usage:
		/// 1. indexOf(cellInfo) (note: search is done by value, not by reference).
		/// 2. indexOf(cellIndex, rowIndex)
		///
		/// Code example: var index = collection.indexOf(0, 0);
		/// </summary>
		///
		/// <param name="cellInfo" type="$.wijmo.wijgrid.cellInfo">A cellInfo object to return the index of.</param>
		/// <param name="cellIndex" type="Number" integer="true">A zero-based cellIndex component of the cellInfo object to return the index of.</param>
		/// <param name="rowIndex" type="Number" integer="true">A zero-based rowIndex component of the cellInfo object to return the index of.</param>
		/// <returns type="Number" integer="true">The zero-based index of the specified object, or -1 if the specified object is not a member of the collection.</returns>
		if (arguments.length === 1) {
			rowIndex = cellIndex.rowIndex();
			cellIndex = cellIndex.cellIndex();
		}

		var lo = 0,
			hi = _list.length - 1,
			med, current, cmp;

		while (lo <= hi) {
			med = lo + ((hi - lo) >> 1);
			current = _list[med];

			cmp = current.rowIndex() - rowIndex;
			if (cmp === 0) {
				cmp = current.cellIndex() - cellIndex;
			}

			if (cmp < 0) {
				lo = med + 1;
			} else {
				if (cmp > 0) {
					hi = med - 1;
				} else {
					return med;
				}
			}
		}

		return ~lo;
	};

	this.toString = function () {
		var val = "",
			i, len;

		for (i = 0, len = _list.length; i < len; i++) {
			val += _list[i].toString() + "\n";
		}

		return val;
	};

	// public *

	// internal

	this._add = function (value) {
		var idx = this.indexOf(value);
		if (idx < 0) {
			_list.splice(~idx, 0, value);
			value._setGridView(gridView);
			return true;
		}

		return false;
	};

	// addFrom - an cellInfoOrderedCollection instance
	this._addFrom = function (addFrom) {
		if (addFrom) {
			var fromLen = addFrom.length(),
				thisLen = _list.length,
				i;

			if (thisLen === 0) {
				_list.length = fromLen;

				for (i = 0; i < fromLen; i++) {
					_list[i] = addFrom.item(i);
					_list[i]._setGridView(gridView);
				}
			} else {
				for (i = 0; i < fromLen; i++) {
					this._add(addFrom.item(i));
				}
			}
		}
	};

	this._appendUnsafe = function (value) {
		_list[_list.length] = value;
		value._setGridView(gridView);
	};

	this._insertUnsafe = function (value, index) {
		_list.splice(index, 0, value);
	};

	this._clear = function () {
		_list.length = 0;
	};

	this._remove = function (value) {
		var idx = this.indexOf(value);
		if (idx >= 0) {
			_list.splice(idx, 1);
			return true;
		}

		return false;
	};

	this._removeAt = function (index) {
		_list.splice(index, 1);
	};

	this._getColumnsIndicies = function () {
		var columns = [],
			len = _list.length,
			tmpColumns, i, len2;

		if (len) {
			tmpColumns = [];
			for (i = 0; i < len; i++) {
				tmpColumns[_list[i].cellIndex()] = 1;
			}

			len = tmpColumns.length;
			len2 = 0;
			for (i = 0; i < len; i++) {
				if (tmpColumns[i]) {
					columns[len2++] = i;
				}
			}
		}

		return columns;
	};

	this._getSelectedRowsIndicies = function () {
		var rows = [],
			len = _list.length,
			tmpRows, i, len2;

		if (len) {
			tmpRows = [];
			for (i = 0; i < len; i++) {
				tmpRows[_list[i].rowIndex()] = 1;
			}

			len = tmpRows.length;
			len2 = 0;
			for (i = 0; i < len; i++) {
				if (tmpRows[i]) {
					rows[len2++] = i;
				}
			}
		}

		return rows;
	};

	this._rectangulate = function () {
		var len = _list.length,
			x0 = 0xFFFFFFFF,
			y0 = 0xFFFFFFFF,
			x1 = 0,
			y1 = 0,
			i, cellInfo;

		if (len) {
			for (i = 0; i < len; i++) {
				cellInfo = _list[i];

				x0 = Math.min(x0, cellInfo.cellIndex());
				y0 = Math.min(y0, cellInfo.rowIndex());
				x1 = Math.max(x1, cellInfo.cellIndex());
				y1 = Math.max(y1, cellInfo.rowIndex());
			}

			return new $.wijmo.wijgrid.cellInfoRange(new $.wijmo.wijgrid.cellInfo(x0, y0),
					new $.wijmo.wijgrid.cellInfo(x1, y1));
		}

		return null;
	};

	// internal *
};
$.extend($.wijmo.wijgrid, {
	selectionui: function (gridView) {
		var _gap_to_start = 10,
			_evntFormat = "{0}." + gridView.widgetName + ".selectionui",

			_addedCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView),

			_startPos,
			_startCellInfo,
			_endCellInfo,
			_prevMouseMoveRange,
			_inProgress = false,
			_additionalEventsAttached = false,
			_view = gridView._field("view"),
			_visLeavesLen = gridView._field("visibleLeaves").length;

		gridView.element.bind(_eventKey("mousedown"), _onGridMouseDown);

		this.dispose = function () {
			gridView.element.unbind(_eventKey("mousedown"), _onGridMouseDown);
			_detachAdditionalEvents();
		};

		function _onGridMouseDown(args) {
			if (!gridView._canInteract() || gridView.options.selectionMode.toLowerCase() === "none") {
				return;
			}

			var visibleBounds = _view.getVisibleAreaBounds(),
				mouse = { x: args.pageX, y: args.pageY },
				tag = ((args.target && args.target.tagName !== undefined)
					? args.target.tagName.toLowerCase()
					: undefined),
				$target = $(args.target);

			/*if ((!tag || ((tag === "td" || tag === "th") && $target.hasClass("wijgridtd")) ||
			(tag === "div" && $target.hasClass("wijgriddiv"))) &&
			(mouse.x > visibleBounds.left && mouse.x < visibleBounds.left + visibleBounds.width) &&
			(mouse.y > visibleBounds.top && mouse.y < visibleBounds.top + visibleBounds.height)) {*/

			if ((!tag || $target.is("td.wijgridtd, th.wijgridtd, div.wijmo-wijgrid-innercell")) &&
				(mouse.x > visibleBounds.left && mouse.x < visibleBounds.left + visibleBounds.width) &&
				(mouse.y > visibleBounds.top && mouse.y < visibleBounds.top + visibleBounds.height)) {

				_attachAdditionalEvents();
				_startPos = mouse;

				_startCellInfo = _coordToDataCellInfo(_startPos);
			}
		}

		function _onDocumentMouseMove(args) {
			if (!_startCellInfo || !_startCellInfo._isValid()) {
				return;
			}

			var mouse = { x: args.pageX, y: args.pageY },
				tmp, range, dataOffset, desiredCells, rowsLen, cellsLen,
				row, cell, i, len, info, removeCell, addCell;

			if (!_inProgress) {
				_inProgress = (Math.abs(_startPos.x - mouse.x) > _gap_to_start) ||
						(Math.abs(_startPos.y - mouse.y) > _gap_to_start);
			}

			if (_inProgress) {
				tmp = _coordToDataCellInfo(mouse);
				if (!tmp._isValid()) {
					return;
				}

				_endCellInfo = tmp;

				range = new $.wijmo.wijgrid.cellInfoRange(_startCellInfo, _endCellInfo);
				range._normalize();
				range._clip(gridView._getDataCellsRange());

				if (range._isValid() && !range.isEqual(_prevMouseMoveRange)) {
					dataOffset = gridView._getDataToAbsOffset();

					_prevMouseMoveRange = range;

					desiredCells = new $.wijmo.wijgrid.cellInfoOrderedCollection(gridView);
					rowsLen = range.bottomRight().rowIndex();
					cellsLen = range.bottomRight().cellIndex();

					for (row = range.topLeft().rowIndex(); row <= rowsLen; row++) {
						for (cell = range.topLeft().cellIndex(); cell <= cellsLen; cell++) {
							desiredCells._appendUnsafe(new $.wijmo.wijgrid.cellInfo(cell, row));
						}
					}

					for (i = 0, len = _addedCells.length(); i < len; i++) {
						info = _addedCells.item(i);
						if (desiredCells.indexOf(info) < 0) // remove css
						{
							if (gridView.selection().selectedCells().indexOf(info) < 0) {
								removeCell = _view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
								if (removeCell) {
									$(removeCell).removeClass("ui-state-highlight");
								}
							}

							_addedCells._removeAt(i);
							i--;
							len--;
						}
					}

					for (i = 0, len = desiredCells.length(); i < len; i++) {
						info = desiredCells.item(i);
						if (_addedCells.indexOf(info) < 0 && gridView.selection().selectedCells().indexOf(info) < 0) {
							if (_addedCells._add(info)) {
								addCell = _view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
								if (addCell) {
									$(addCell).addClass("ui-state-highlight");
								}
							}
						}
					}
				} // end if
			}
		}

		function _onDocumentMouseUp(args) {
			_detachAdditionalEvents();

			if (_inProgress) {
				_inProgress = false;

				if (_prevMouseMoveRange && _prevMouseMoveRange._isValid()) {
					gridView._changeCurrentCell(_endCellInfo);

					if (!args.shiftKey || (!gridView.selection()._multipleRangesAllowed() && gridView.options.selectionMode.toLowerCase() !== "singleRange")) {
						gridView.selection()._startNewTransaction(_startCellInfo);
					}

					gridView.selection().beginUpdate();
					gridView.selection()._selectRange(_prevMouseMoveRange, args.shiftKey, args.ctrlKey, 0 /* none */, _endCellInfo);
					gridView.selection().endUpdate();

					var view = gridView._field("view"),
						dataOffset = gridView._getDataToAbsOffset(),
						i, len, info, removeCell;

					// clear remained cells
					for (i = 0, len = _addedCells.length(); i < len; i++) {
						info = _addedCells.item(i);
						if (gridView.selection().selectedCells().indexOf(info) < 0) {
							removeCell = view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
							if (removeCell !== null) {
								$(removeCell).removeClass("ui-state-highlight");
							}
						}
					}

					_addedCells._clear();
					_startCellInfo = _endCellInfo = _prevMouseMoveRange = null;

					return false; // cancel bubbling
				}
			}
		}

		/*function _onSelectStart(e) {
		e.preventDefault();
		};*/

		function _attachAdditionalEvents() {
			if (!_additionalEventsAttached) {
				try {
					gridView.element.disableSelection();
					gridView.element.css({ "MozUserSelect": "none", "WebkitUserSelect": "none" });


					$(document)
						.bind(_eventKey("mousemove"), _onDocumentMouseMove)
						.bind(_eventKey("mouseup"), _onDocumentMouseUp);

					/*if ($.browser.msie) {
					$(document.body).bind("selectstart", _onSelectStart);
					}*/
				}
				finally {
					_additionalEventsAttached = true;
				}
			}
		}

		function _detachAdditionalEvents() {
			if (_additionalEventsAttached) {
				try {
					gridView.element.enableSelection();
					gridView.element.css({ "MozUserSelect": "", "WebkitUserSelect": "" });

					$(document)
						.unbind(_eventKey("mousemove"), _onDocumentMouseMove)
						.unbind(_eventKey("mouseup"), _onDocumentMouseUp);

					/*if ($.browser.msie) {
					$(document.body).unbind("selectstart", _onSelectStart);
					}*/
				} finally {
					_additionalEventsAttached = false;
				}
			}
		}

		function _eventKey(eventType) {
			return $.wijmo.wijgrid.stringFormat(_evntFormat, eventType);
		}

		/*var _thBoundsHash = [];
		var _trBoundsHash = [];*/
		function _coordToDataCellInfo(pnt /* {x, y} */) {
			var left = 0,
				right = _visLeavesLen - 1,
				median = 0,
				cellIdx = -1,
				bounds, allGridRowsAccessor, rowIdx, rowObj, dataOffset, result;

			// get cell index
			while (left <= right) {
				median = ((right - left) >> 1) + left;

				/*var bounds = _thBoundsHash[median];
				if (!bounds) {
				_thBoundsHash[median] = bounds = $.wijmo.wijgrid.bounds(_view.getHeaderCell(median));
				}*/
				bounds = $.wijmo.wijgrid.bounds(_view.getHeaderCell(median));

				if (pnt.x < bounds.left) { // -1 
					right = median - 1;
				}
				else
					if (pnt.x > bounds.left + bounds.width) { // 1
						left = median + 1;
					} else { // 0
						cellIdx = median;
						break;
					}
			}

			if (cellIdx === -1) {
				return $.wijmo.wijgrid.cellInfo.prototype.outsideValue;
			}

			allGridRowsAccessor = new $.wijmo.wijgrid.rowAccessor(_view, 0 /* all */, 0, 0);

			rowIdx = -1;
			left = 0;
			right = allGridRowsAccessor.length() - 1;
			median = 0;

			// get row index
			while (left <= right) {
				median = ((right - left) >> 1) + left;

				/*var bounds = _trBoundsHash[median];
				if (!bounds) {
				var rowObj = allGridRowsAccessor.item(median);
				_trBoundsHash[median] = bounds = $.wijmo.wijgrid.bounds(allGridRowsAccessor.getCell(rowObj, 0));
				}*/
				rowObj = allGridRowsAccessor.item(median);
				bounds = $.wijmo.wijgrid.bounds(allGridRowsAccessor.getCell(rowObj, 0));

				if (pnt.y < bounds.top) { // -1
					right = median - 1;
				}
				else
					if (pnt.y > bounds.top + bounds.height) { // 1
						left = median + 1;
					} else { // 0
						rowIdx = median;
						break;
					}
			} // end while { }


			if (rowIdx === -1) {
				return $.wijmo.wijgrid.cellInfo.prototype.outsideValue;
			}

			dataOffset = gridView._getDataToAbsOffset();

			result = new $.wijmo.wijgrid.cellInfo(cellIdx - dataOffset.x, rowIdx - dataOffset.y);
			result._clip(gridView._getDataCellsRange());

			return result;
		}
	}
});
$.wijmo.wijgrid.rowAccessor = function (view, scope, offsetTop, offsetBottom) {
	/// <summary>
	/// Object for convenient access to rows of a wijgrid widget.
	/// </summary>

	if (!offsetTop) {
		offsetTop = 0;
	}

	if (!offsetBottom) {
		offsetBottom = 0;
	}

	this.item = function (index) {
		/// <summary>
		/// Gets an array of the table row elements that represents a wijgrid widget row at the specified index.
		/// remark: size of returning array is always two.
		/// </summary>
		/// <param name="index" type="Number" integer="true">
		/// The zero-based index of the row to retrieve.
		/// </param>
		/// <returns type="Array" elementType="object" elementDomElement="true">
		/// The array of the table row elements at the specified index.
		/// </returns>
		var len = this.length();

		return (index < len)
				? view.getJoinedRows(index + offsetTop, scope)
				: null;
	};

	this.length = function () {
		/// <summary>
		/// Gets the total number of elements.
		/// </summary>
		var joinedTables = view.getJoinedTables(true, 0),
			len = 0,
			htmlAccessor;

		if (htmlAccessor = joinedTables[0]) {
			len = htmlAccessor.getSectionLength(scope);
		}

		if (htmlAccessor = joinedTables[1]) {
			len += htmlAccessor.getSectionLength(scope);
		}

		len -= offsetTop + offsetBottom;

		if (len < 0) {
			len = 0;
		}

		return len;
	};

	this.iterateCells = function (rowObj, callback, param) {
		/// <summary>
		/// Sequentially iterates the cells in a <paramref name="rows"/> array.
		///
		/// example:
		/// Suppose rows is an array containing the following data:
		/// [ ["a", "b"], ["c", "d", "e"] ]
		///
		/// When it is iterated it will sequentially return:
		/// "a", "b", "c", "d", "e"
		/// </summary>
		/// <param name="rowObj" type="Array" elementType="Object" elementDomElement="true">Array of rows to be iterated.</param>
		/// <param name="callback" type="Function">Function that will be called each time a new cell is reached.</param>
		/// <param name="param" type="Object" optional="true">Parameter that can be handled within the callback function.</param>
		if (rowObj && callback) {
			var globCellIdx = 0,
				i, len, domRow, j, cellLen, result;

			for (i = 0, len = rowObj.length; i < len; i++) {
				domRow = rowObj[i];

				if (domRow) {
					for (j = 0, cellLen = domRow.cells.length; j < cellLen; j++) {
						result = callback(domRow.cells[j], globCellIdx++, param);
						if (result !== true) {
							return;
						}
					}
				}
			}
		}
	};

	this.getCell = function (rowObj, globCellIndex) {
		/// <summary>
		/// Gets a cell by its global index in a row's array passed in rowObj.
		/// 
		/// example:
		/// Suppose rows is an array containing the following data:
		/// [ ["a", "b"], ["c", "d", "e"] ]
		///
		/// "a" symbol has a global index 0.
		/// "c" symbol has a global index 2.
		/// </summary>
		/// <param name="rowObj" type="Array" elementType="Object" elementDomElement="true">Array of table row elements.</param>
		/// <param name="index" type="Number" integer="true">Zero-based global index of a cell.</param>
		/// <returns type="Object" domElement="true" elementMayBeNull="true">
		/// A cell or null if a cell with provided index is not found.
		/// </returns>
		var domRow, cellLen;

		if (domRow = rowObj[0]) {
			cellLen = domRow.cells.length;
			if (globCellIndex < cellLen) {
				return domRow.cells[globCellIndex];
			}

			globCellIndex -= cellLen;

			if (domRow = rowObj[1]) {
				cellLen = domRow.cells.length;
				if (globCellIndex < cellLen) {
					return domRow.cells[globCellIndex];
				}
			}
		}

		return null;
	};

	this.cellsCount = function (rowObj) {
		/// <summary>
		/// Gets the number of cells in a array of table row elements.
		/// </summary>
		/// <param name="rowObj" type="Array" elementType="Object" elementDomElement="true">Array of table row elements.</param>
		/// <returns type="Number" integer="true">The number of cells in a array of table row elements.</returns>
		var res = 0,
			domRow;

		if (domRow = rowObj[0]) {
			res = domRow.cells.Length;

			if (domRow = rowObj[1]) {
				res += domRow.cells.Length;
			}
		}

		return res;
	};
};
$.extend($.wijmo.wijgrid, {
	cellEditorHelper: function () {
		this.currentCellEditStart = function (grid, e) {
			var result = false,
				currentCell = grid.currentCell(),
				rowObj, dataIndex, args, $innerDiv;

			if (currentCell._isValid() && !currentCell._isEdit() && (currentCell.column().dataIndex >= 0)) {
				rowObj = currentCell._row();

				if (rowObj && rowObj.length) {
					dataIndex = (rowObj[0].attributes["dataRowIndex"] !== undefined)
						? parseInt(rowObj[0].attributes["dataRowIndex"].value, 10)
						: undefined;

					if (dataIndex !== undefined) {

						args = {
							cell: currentCell,
							event: e,
							handled: false
						};

						if (result = grid._trigger("beforecelledit", null, args)) { // todo
							if (!args.handled) {
								result = defaultBeforeCellEdit(grid, args);
							}
						}

						if (result) {
							currentCell._isEdit(true);

							if (grid.options.showRowHeader) {
								$innerDiv = $(rowObj[0].cells[0]).children("div.wijmo-wijgrid-innercell");
								if ($innerDiv.length) {
									$innerDiv.empty();
									$innerDiv.append($("<div>&nbsp;</div>").addClass("ui-icon ui-icon-pencil"));
								}
							}
						}
					}
				}
			}

			return result;
		};

		this.currentCellEditEnd = function (grid, e) {
			var currentCell = grid.currentCell(),
				result = false,
				rowObj, dataIndex, escPressed, args, valueIsChanged, a, b, value;

			if (!currentCell._isValid() || !currentCell._isEdit()) {
				return;
			}

			rowObj = currentCell._row();
			if (rowObj && rowObj.length) {
				dataIndex = (rowObj[0].attributes["dataRowIndex"] !== undefined)
					? parseInt(rowObj[0].attributes["dataRowIndex"].value, 10)
					: undefined;

				if (dataIndex === undefined) {
					return result;
				}

				escPressed = (e && e.which === $.ui.keyCode.ESCAPE);

				if (!e || (!escPressed)) {
					args = {
						cell: currentCell,
						value: undefined
					};

					if (result = grid._trigger("beforecellupdate", null, args)) {
						if (args.value === undefined) {
							args.value = getCellValue(grid, currentCell); // trying to get value using default implementation.
						}

						valueIsChanged = false;
						if (args.cell.column().dataType === "datetime") {
							a = args.value ? args.value.getTime() : null;
							b = currentCell.value() ? currentCell.value().getTime() : null;
							valueIsChanged = a !== b;

						} else {
							valueIsChanged = args.value !== currentCell.value();
						}

						if (valueIsChanged) {
							// ** update datasource
							try {
								currentCell.value(args.value);
							} catch (ex) {
								result = false;
								grid._trigger("invalidcellvalue", null, { cell: currentCell, value: args.value });
							}

							if (result) {
								grid._trigger("aftercellupdate", null, { cell: currentCell });
							}
						}
					}
				} else {
					// ESC key
					result = true;
				}

				if (result) {
					args = {
						cell: currentCell,
						event: e,
						handled: false
					};

					grid._trigger("aftercelledit", null, args);

					if (!args.handled) {
						result = defaultAfterCellEdit(grid, args);
					}

					if (result) {
						currentCell._isEdit(false);
					}

					if (grid.options.showRowHeader) {
						$(rowObj[0].cells[0]).children("div.wijmo-wijgrid-innercell").html("&nbsp;"); // remove ui-icon-pencil
					}

					grid.element.focus();
					$(grid._field("view").focusableElement()).focus();
					currentCell.tableCell().focus();
				}
			}

			return result;
		};

		// private

		function defaultBeforeCellEdit(grid, args) {
			var leafOpt = args.cell.column(),
				result = false,
				value, $container, $input, len, kbEvent;

			if (leafOpt.dataIndex >= 0) {
				value = args.cell.value();
				result = true;

				try {
					$container = args.cell.container();

					if (leafOpt.dataType === "boolean") {
						/*input = document.createElement("input");
						input.type = "checkbox";
						input.className = "wijgridinput ui-wijinput ui-state-focus";

						$(input).bind("keydown", grid, checkBoxOrInputKeyDown);

						content.innerHTML = "";
						content.appendChild(input);

						input.focus();

						if ($.browser.msie) {
						setTimeout(function () {
						input.focus();
						}, 0);
						}
						input.checked = value;*/
						$input = $container.children("input");
						// setting checked value manually after input getting focused.
						// because browsers other than FF will not check correctly.
						$input.focus().one("keyup", function (e) {
							if (args.event.which === $.ui.keyCode.SPACE) {
								e.preventDefault();
								$input[0].checked = !value;
							}
						});
					} else {
						$input = $("<input />")
							.attr("type", "text")
							.addClass("wijgridinput wijmo-wijinput ui-state-focus")
							.bind("keydown", grid, checkBoxOrInputKeyDown);

						if (args.event && args.event.type === "keypress" && args.event.which) {
							$input.val(String.fromCharCode(args.event.which));
						} else {
							switch (args.cell.column().dataType) {
								case "currency":
								case "number":
									if (value !== null) {
										$input.val(value); // ignore formatting
										break;
									}
									// fall through
								default:
									$input.val(grid._toStr(args.cell.column(), value));
							}
						}

						$container
							.empty()
							.append($input);

						// move caret to the end of the text
						len = $input.val().length;
						new $.wijmo.wijgrid.domSelection($input[0]).setSelection({ start: len, end: len });

						$input.focus();

						if ($.browser.msie) {
							setTimeout(function () {
								$input.focus();
							}, 0);
						}

						// FF issue: text does not track to the new position of the caret
						if ($.browser.mozilla && document.createEvent && $input[0].dispatchEvent) {
							kbEvent = document.createEvent("KeyboardEvent");
							kbEvent.initKeyEvent("keypress", false, true, null, false, false, false, false, 0, $.ui.keyCode.SPACE);
							$input[0].dispatchEvent(kbEvent);
							kbEvent = document.createEvent("KeyboardEvent");
							kbEvent.initKeyEvent("keypress", false, true, null, false, false, false, false, $.ui.keyCode.BACKSPACE, 0);
							$input[0].dispatchEvent(kbEvent);
						}
					}
				}
				catch (ex) {
					alert(ex.message);
					result = false;
				}
			}

			return result;
		}

		function defaultAfterCellEdit(grid, args) {
			var leafOpt = args.cell.column(),
				result = false,
				$container, cellValue, dataRow, sourceDataRow, input;

			if (leafOpt.dataIndex >= 0) {
				result = true;

				try {
					$container = args.cell.container();
					cellValue = grid._toStr(leafOpt, args.cell.value());

					dataRow = grid.dataTable[args.cell.rowIndex()];
					sourceDataRow = grid.data()[dataRow[0].originalRowIndex];
					if (leafOpt.dataType === "boolean") {
						input = $container.children("input")
						if (cellValue === "true") {
							input.attr("checked", "checked");
						}
						else {
							input.removeAttr("checked");
						}
					}
					else {
						grid.cellFormatter.format($container, leafOpt, cellValue, dataRow.rowType, sourceDataRow);
					}
				}
				catch (ex) {
					alert("defaultAfterCellEdit: " + ex.message);
					result = false;
				}
			}

			return result;
		}

		function checkBoxOrInputKeyDown(args) {
			if (args.which === $.ui.keyCode.ENTER) { // stop editing when Enter key is pressed
				var grid = args.data;
				if (grid) {
					grid._endEditInternal(args);
					return false; // prevent submit behaviour.
				}
			}
		}

		function getCellValue(gridView, currentCell) {
			var $input = currentCell.container().find(":input:first"),
				result = null;

			if ($input.length) {
				result = ($input.attr("type") === "checkbox")
					? $input[0].checked
					: $input.val();

				result = gridView._parse(currentCell.column(), result);
			}

			return result;
		}

		// private *
	}
});
/*
Dependencies:
jquery.ui.mouse.js
jquery.ui.draggable.js
*/

$.extend($.wijmo.wijgrid, {
	fixedView: function (gridView) {
		var _rowsCount, // data rows count
		// rendered DOM tables
			_viewTables = {},
		// scroll bar size
			_table00,
			_table01,
			_table10,
			_table11,
		// scrolling div
			_scroller,
		// scroll bar sizes
			verScrollBarSize = 18; //this.element.find(".wijmo-wijsuperpanel-vbarcontainer")[0].offsetWidth;
		//horScrollBarSize = 18; //this.element.find(".wijmo-wijsuperpanel-hbarcontainer")[0].offsetHeight;

		// table element
		this.element = gridView.element;


		this.initialize = function () {
			_rowsCount = gridView.dataTable.length; // _dataTable.Element.Rows.Length;
			this._createLayout();
		};

		this._createLayout = function () {
			gridView.outerDiv.wrapInner("<div class=\"wijmo-wijgrid-fixedview\"><div class=\"wijmo-wijgrid-scroller\"><div class=\"wijmo-wijgrid-split-area-se wijmo-wijgrid-content-area\"></div></div></div>");
			_scroller = gridView.outerDiv.find(".wijmo-wijgrid-scroller");

			_scroller.after("<div class=\"wijmo-wijgrid-split-area wijmo-wijgrid-split-area-nw\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
			_scroller.after("<div class=\"wijmo-wijgrid-split-area wijmo-wijgrid-split-area-ne\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
			_scroller.after("<div class=\"wijmo-wijgrid-split-area wijmo-wijgrid-split-area-sw\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
		};

		this._onScrolled = function (e, data) {
			gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne")[0].scrollLeft = parseInt((gridView.outerDiv.find(".wijmo-wijsuperpanel-templateouterwrapper").css("left") + "").replace("px", ""), 10) * -1;
		};

		this._onScrolling = function (e, data) {
			if (data.dir === "h") {
				gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne")[0].scrollLeft = parseInt((gridView.outerDiv.find(".wijmo-wijsuperpanel-templateouterwrapper").css("left") + "").replace("px", ""), 10) * -1;
			} else {
				gridView.outerDiv.find(".wijmo-wijgrid-split-area-sw")[0].scrollTop = parseInt((gridView.outerDiv.find(".wijmo-wijsuperpanel-templateouterwrapper").css("top") + "").replace("px", ""), 10) * -1;
			}
		};

		this._testNeedVBar = function (outerDiv, gridEle, tableNE, mode) {
			var excludeVbarWidth, gridWidth, gridHeight, outerWidth, outerHeight;

			gridWidth = Math.max(gridEle.width(), tableNE.width());
			gridHeight = gridEle.height() + gridView.options.splitDistanceY;
			outerWidth = outerDiv.width();
			outerHeight = outerDiv.height();
			// remove auto width to make width 100%  take effect. 
			if (gridEle[0].style.width === "auto") {
				gridEle.css("width", "");
			}
			if (mode === "both" || mode === "vertical") {
				excludeVbarWidth = true;
			}
			else if (mode === "auto") {
				if (gridHeight > outerHeight) {
					excludeVbarWidth = true;
				}
				else if (gridWidth > outerWidth && gridHeight > outerHeight - verScrollBarSize) {
					excludeVbarWidth = true;
				}
			}
			return excludeVbarWidth;
		};

		this.updateSplits = function () {
			var o = gridView.options,
				self = this,
			//$mainContentTable = gridView.outerDiv.find(".wijmo-wijgrid-content-area table"),
				colTags, hasWidth, visibleLeaves, widthArray, $tableSE, mode, rowObj, fooRow,
				outerDiv, beforeWidth, diff, after, len, colIndex, $tableNE, maxWidth;
			try {
				if (o.staticRowIndex >= 0) { // interpreted as bool
					o.splitDistanceY = gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne table")[0].offsetHeight;
				} else {
					o.splitDistanceY = 0;
				}
				if (gridView._staticColumnIndex >= 0 /*o.staticColumnIndex >= 0*/) {
					o.splitDistanceX = gridView.outerDiv.find(".wijmo-wijgrid-split-area-nw table")[0].offsetWidth;
				} else {
					o.splitDistanceX = 0;
				}
			} catch (ex) { }

			this._updateSplitAreaBounds();

			// handle autosizing
			/*
			var fixedColIdx = gridView._staticColumnIndex; //gridView.options.staticColumnIndex; // YK
			var fixedRowIdx = gridView.options.staticRowIndex; // interpreted as bool
			if (fixedColIdx >= 0 && fixedColIdx < gridView._field("leaves").length - 1 || fixedRowIdx >= 0) {
			this.adjustColumnSizes(_viewTables['nw'], _viewTables['sw']);
			this.adjustColumnSizes(_viewTables['ne'], _viewTables['se']);
			}
			*/

			// clone a row to expand table in grouping mode.
			rowObj = gridView.element.find("tbody .wijmo-wijgrid-row:not(.wijmo-wijgrid-groupheaderrow):first");
			fooRow = rowObj.clone().removeAttr("datarowindex").addClass("wijmo-wijgrid-foorow").appendTo(rowObj.parent()).show().height(0).css({ "font-size": "0" });
			self.fooRowCells = fooRow.find(">td").height(0).css({ "border-top": "0", "border-bottom": "0" }).find(">div.wijmo-wijgrid-innercell").empty();

			$tableSE = $(_table11.element());
			$tableNE = $(_table01.element());
			colTags = _table11.colTags();
			// set width to top table th and bottom table td in first row.
			visibleLeaves = gridView._field("visibleLeaves");
			widthArray = [];

			mode = o.scrollMode;
			outerDiv = gridView.outerDiv;
			if (self._testNeedVBar(gridView.outerDiv, $tableSE, $tableNE, mode)) {
				_scroller.width(_scroller.width() - verScrollBarSize);
			}
			maxWidth = Math.max($tableSE.width(), $tableNE.width());
			if (maxWidth < outerDiv.innerWidth()) {
				// whether to expand grid with 100% width, if autoExpandColumnIndex is set, the addtional space will be added to the specified column.
				if (o.autoExpandColumnIndex) {
					$tableSE.css("width", "auto");
					beforeWidth = _scroller.innerWidth();
				}
				else {
					$tableSE.css("width", "100%");
					beforeWidth = $tableSE.width();
				}
			}
			// if any column has width option, we will set the width for inner cells.
			$.each(visibleLeaves, function (index, leaf) {
				if (leaf.width) {
					hasWidth = true;
					colTags[index].width = leaf.width;
				}
			});
			$.each(visibleLeaves, function (index, leaf) {
				self.setColumnWidth(index, null, widthArray);
			});
			$.each(widthArray, function (index, width) {
				self.setColumnWidth(index, width);
				if (hasWidth) {
					$(colTags).removeAttr("width");
				}
			});
			// set bottom table width to auto after setting width;
			$tableSE.css("width", "auto");
			if (!isNaN(beforeWidth) && visibleLeaves.length > 0) {
				after = $tableSE.width();
				diff = beforeWidth - after;
				if (diff !== 0) {
					len = widthArray.length - 1;
					colIndex = o.autoExpandColumnIndex || len;
					if (colIndex > len) {
						colIndex = len;
					}
					if (diff) {
						self.setColumnWidth(colIndex, widthArray[colIndex] + diff);
					}
				}
			}
			self.refreshPanel();
		};

		this.setColumnWidth = function (index, px, widthArray) {
			/// <summary>
			/// Set column width.
			/// </summary>
			/// <param name="index" type="Number">
			/// The index of the column. Start with 0.
			/// </param>
			/// <param name="px" type="Number">
			/// The width of the column.  If px value is undefined, the offset width will be used.
			/// </param>

			var th = this.getHeaderCell(index),
				$fooRow = null,
				colWidth = th.clientWidth,
				flag = false;

			if (px) {
				if (!widthArray) {
					$(th).children("div.wijmo-wijgrid-innercell").setOutWidth(px);
					this.fooRowCells.eq(index).setOutWidth(px);
				}

				this.forEachColumnCell(index, function (cell, index) {
					var $row = $(cell.parentNode);

					if ($row.parent().is("tbody") && !$row.is(".wijmo-wijgrid-groupheaderrow", ".wijmo-wijgrid-groupfooterrow")) {
						if (widthArray) {
							widthArray.push(px);
							return false;
						}
						else {
							$(cell).children("div.wijmo-wijgrid-innercell").setOutWidth(px);
						}
					}

					return true;
				});
			} else { // set column and outer width of td and th.
				this.forEachColumnCell(index, function (cell, index) {
					var $row = $(cell.parentNode);

					if ($row.parent().is("tbody") && !$row.is(".wijmo-wijgrid-groupheaderrow", ".wijmo-wijgrid-groupfooterrow")) {

						if (!flag) {
							if (!$row.is(":visible")) {
								$fooRow = $row;
								$row.show();
							}

							colWidth = Math.max(colWidth, cell.clientWidth);
							flag = true;
						}
						if (!widthArray) {
							$(cell).children("div.wijmo-wijgrid-innercell").setOutWidth(colWidth);
						}
						else {
							return false;
						}
					}

					return true;
				});
				if (widthArray) {
					widthArray.push(colWidth);
				}
				else {
					$(th).children("div.wijmo-wijgrid-innercell").setOutWidth(colWidth);
				}
				if ($fooRow) {
					$fooRow.hide();
				}
			}
		};

		this._getMappedScrollMode = function () {
			var scrollMode = gridView.options.scrollMode,
				vScrollBarVisibility = "auto",
				hScrollBarVisibility = "auto";

			switch (scrollMode) {
				case "horizontal":
					vScrollBarVisibility = "hidden";
					hScrollBarVisibility = "visible";
					break;
				case "vertical":
					vScrollBarVisibility = "visible";
					hScrollBarVisibility = "hidden";
					break;
				case "both":
					vScrollBarVisibility = "visible";
					hScrollBarVisibility = "visible";
			}
			return { vScrollBarVisibility: vScrollBarVisibility, hScrollBarVisibility: hScrollBarVisibility };
		};


		this.refreshPanel = function () {
			var panelModes = this._getMappedScrollMode(),
				areaNE;

			_scroller.width(this._getGridWidth(gridView.options.scrollMode));

			if (!_scroller.data("wijsuperpanel")) {
				_scroller.wijsuperpanel({ scrolled: this._onScrolled, vScroller: { bubbleScrollingEvent: false, scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility} });
			}
			else {
				_scroller.wijsuperpanel("paintPanel");
			}

			areaNE = gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne");
			areaNE.width(_scroller.wijsuperpanel("getContentElement").parent().width());

			// synchronize scroll left of top table with bottom table
			this._onScrolled();
		};

		this._getGridWidth = function (mode, y) {
			var tableWidth = gridView.element.outerWidth(true), outWidth = gridView.outerDiv.innerWidth();

			if (this._testNeedVBar(gridView.outerDiv, gridView.element, $(_table01.element()), mode)) {
				tableWidth += verScrollBarSize;
			}
			if (tableWidth > outWidth) {
				tableWidth = outWidth;
			}
			return tableWidth;
		};

		this._updateSplitAreaBounds = function () {
			var o = gridView.options,
				controlWidth = o.width || gridView.outerDiv.width(),
				controlHeight = o.height || gridView.outerDiv.height(),
				areaNW, areaNE, areaSW, areaSE;

			if (controlHeight <= 0) {
				controlHeight = gridView.outerDiv.find(".wijmo-wijgrid-split-area-se > table")[0].offsetHeight;
			}

			// yk: to add header height to 
			//gridView.outerDiv.height(controlHeight + o.splitDistanceY);
			//gridView.outerDiv.width(controlWidth);

			if (gridView.outerDiv[0].style.height !== "" && gridView.outerDiv[0].style.height !== "auto") {
				_scroller.height(controlHeight);
			}
			else {
				// no height is set for outer div, we need to expand the grid.
				_scroller.height(controlHeight + o.splitDistanceY);
			}

			_scroller.width(controlWidth);

			areaNW = gridView.outerDiv.find(".wijmo-wijgrid-split-area-nw");
			areaNE = gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne");
			areaSW = gridView.outerDiv.find(".wijmo-wijgrid-split-area-sw");
			areaSE = gridView.outerDiv.find(".wijmo-wijgrid-split-area-se");

			// update splits bounds:
			areaNW.height(o.splitDistanceY);
			areaNE.height(o.splitDistanceY);
			if (gridView.$topPagerDiv !== null) {
				areaNE.css("top", gridView.$topPagerDiv.outerHeight(true) + "px");
			}
			//this.element.find(".wijmo-wijgrid-split-area-sw").height(controlHeight - o.splitDistanceY - (!o.splits ? horScrollBarSize : 0)).css("top", o.splitDistanceY);
			areaSW.height(controlHeight - o.splitDistanceY).css("top", o.splitDistanceY);
			areaNW.width(o.splitDistanceX);
			areaSW.width(o.splitDistanceX);

			//areaNE.width(controlWidth - o.splitDistanceX - (!o.splits ? verScrollBarSize : 0)).css("left", o.splitDistanceX); //-17 is for scrollbars

			//this.element.find(".wijmo-wijgrid-split-area-se").height(controlHeight - o.splitDistanceY).css("top", o.splitDistanceY);
			//this.element.find(".wijmo-wijgrid-split-area-se").width(controlWidth - o.splitDistanceX).css("left", o.splitDistanceX);
			areaSE.css("marginLeft", o.splitDistanceX);
			areaSE.css("marginTop", o.splitDistanceY);
			//alert("kk?" + (controlWidth - o.splitDistanceX - (!o.splits ? verScrollBarSize : 0)));
			//ui-wijgrid-split-area-se ui-wijgrid-content-area
		};

		this.render = function (updateMode) {
			var visibleLeaves = gridView._field("visibleLeaves"),
				docFragment = document.createDocumentFragment(),
				spanTable = gridView._field("spanTable"),
				staticRowIndex = gridView._getRealStaticRowIndex(),
				staticColumnIndex = gridView._staticColumnIndex,
				tHeads = {},
				width, ri, height,
				dataRow, dataRowLen,
				leftDomRow = null, rightDomRow = null,
				thX, ci, span,
				$domCell,
				leftFilterRow = null, rightFilterRow = null,
				i, len, leaf,
				correspondTables, key, colGroup, col, table,
				data, sourceData,
				tBodies = {},
				ariaHeaders, domRowDataIndex, staticDataRowIndex, rowLen, className, styleProps, attrProps,
				cellLen, dataIndex, cellIndex, doBreak, $container, cellValue, dataValue, sourceDataRow,
				nwArea, neArea, swArea, seArea;

			_viewTables.nw = docFragment.appendChild(document.createElement("table"));
			_viewTables.ne = docFragment.appendChild(document.createElement("table"));
			_viewTables.sw = docFragment.appendChild(document.createElement("table"));
			// docFragment.appendChild(document.createElement("table"));
			$(docFragment).append(gridView.element);
			_viewTables.se = gridView.element[0];

			// create header
			if (spanTable && spanTable.length) {
				tHeads.nw = _viewTables.nw.createTHead();
				tHeads.ne = _viewTables.ne.createTHead();
				/*tHeads.sw = _viewTables.sw.createTHead(); // <-- user can fix the whole header only, not a random row.
				tHeads.sw = _viewTables.se.createTHead();*/

				width = spanTable[0].length;

				for (ri = 0, height = spanTable.length; ri < height; ri++) {
					leftDomRow = null;
					rightDomRow = null;

					//if (ri <= staticRowIndex) {
					// now header rows are always fixed by design, so we can create header cells inside the fixed areas (nw + ne) only.
					leftDomRow = tHeads.nw.insertRow(-1);
					rightDomRow = tHeads.ne.insertRow(-1);
					/*} else {
					leftDomRow = _viewTables["sw"].tHead.insertRow(-1);
					rightDomRow = _viewTables["se"].tHead.insertRow(-1);
					}*/

					leftDomRow.className = "wijmo-wijgrid-headerrow";
					rightDomRow.className = "wijmo-wijgrid-headerrow";
					leftDomRow.role = "row";
					rightDomRow.role = "row";

					thX = 0;

					for (ci = 0; ci < width; ci++) {
						span = spanTable[ri][ci];

						if (span.column && (span.column.visible || span.column.visible === undefined)) {
							span.column.thX = thX++;
							span.column.thY = ri;

							$domCell = $(document.createElement("th"));

							if (ci === 0 && gridView.options.showRowHeader) {
								$domCell.addClass("ui-state-default wijmo-wijgrid-rowheader");
								$domCell.attr({ "role": "rowheader", "scope": "row" });
							} else {
								$domCell.attr({ "role": "columnheader", "scope": "col" });
							}

							if (span.colSpan > 1) {
								$domCell.attr("colSpan", span.colSpan);
							}

							if (span.rowSpan > 1) {
								$domCell.attr("rowSpan", span.rowSpan);
							}

							$container = $("<div class=\"wijmo-wijgrid-innercell\"></div>");
							$domCell.append($container);

							if (ci <= staticColumnIndex) {
								leftDomRow.appendChild($domCell[0]);
							} else {
								rightDomRow.appendChild($domCell[0]);
							}

							gridView.cellFormatter.format($container, span.column, span.column.headerText,
								$.wijmo.wijgrid.rowType.header, null);
						} // end if
					} // for ci

					gridView._rowCreated(leftDomRow, rightDomRow, $.wijmo.wijgrid.rowType.header, null);
				} // for ri

			} // end if
			// create header end

			// create filter -- now only the whole header can be fixed by design, so the tHeads can contain only "nw" or (and) "ne" keys.
			if (gridView.options.showFilter) {
				if (tHeads.nw) { // fixed columns area
					leftFilterRow = tHeads.nw.insertRow(-1);
					leftFilterRow.className = "wijmo-wijgrid-filterrow ui-widget-content";
					leftFilterRow.role = "row";

					for (i = 0, len = visibleLeaves.length; i < len; i++) {
						leaf = visibleLeaves[i];
						$domCell = $(leftFilterRow.insertCell(-1)).attr("role", "gridcell");
						gridView.cellFormatter.format($domCell, leaf, null/*leaf.filterValue*/, $.wijmo.wijgrid.rowType.filter, null);
					}
				}

				if (tHeads.ne) { // unfixed columns area
					rightFilterRow = tHeads.ne.insertRow(-1);
					rightFilterRow.className = "wijmo-wijgrid-filterrow ui-widget-content";
					rightFilterRow.role = "row";

					for (i = 0, len = visibleLeaves.length; i < len; i++) {
						leaf = visibleLeaves[i];
						$domCell = $(rightFilterRow.insertCell(-1)).attr("role", "gridcell");
						gridView.cellFormatter.format($domCell, leaf, null/*leaf.filterValue*/, $.wijmo.wijgrid.rowType.filter, null);
					}
				}

				gridView._rowCreated(leftFilterRow, rightFilterRow, $.wijmo.wijgrid.rowType.filter, null);
			}
			// create filter end

			// colgroup

			// nw - sw
			correspondTables = { t0: _viewTables.nw, t1: _viewTables.sw };
			for (key in correspondTables) {
				if (correspondTables.hasOwnProperty(key)) {
					colGroup = document.createElement("colgroup");
					for (i = 0; i <= staticColumnIndex; i++) {
						col = document.createElement("col");

						// commented by YK: we are not using col to set width.
						//var leaf = visibleLeaves[i]; 
						//if (leaf.width) {
						//    col.width = leaf.width; // set column width
						//}

						colGroup.appendChild(col);
					}
					table = correspondTables[key];
					table.appendChild(colGroup);
				}
			}

			// ne - se
			correspondTables = { t0: _viewTables.ne, t1: _viewTables.se };
			for (key in correspondTables) {
				if (correspondTables.hasOwnProperty(key)) {
					colGroup = document.createElement("colgroup");
					for (i = staticColumnIndex + 1; i < visibleLeaves.length; i++) {
						col = document.createElement("col");

						/* commented by YK: we are not using col to set width.
						var leaf = visibleLeaves[i];
						if (leaf.width) {
						col.width = leaf.width; // set column width
						}
						*/

						colGroup.appendChild(col);
					}
					table = correspondTables[key];
					table.appendChild(colGroup);
				}
			}
			// end colgroup

			// create body
			data = gridView.dataTable;
			sourceData = gridView.data();

			tBodies = {};
			tBodies.nw = $.wijmo.wijgrid.ensureTBody(_viewTables.nw);
			tBodies.ne = $.wijmo.wijgrid.ensureTBody(_viewTables.ne);
			tBodies.sw = $.wijmo.wijgrid.ensureTBody(_viewTables.sw);
			tBodies.se = $.wijmo.wijgrid.ensureTBody(_viewTables.se);

			// build ARIA "headers" attribute for each leaf.
			ariaHeaders = $.wijmo.wijgrid.getAriaHeaders(visibleLeaves, $.wijmo.wijgrid.flatten(gridView.options.columns));

			domRowDataIndex = 0;
			staticDataRowIndex = staticRowIndex - (spanTable.length + (gridView.options.showFilter ? 1 : 0));

			// render rows
			for (ri = 0, rowLen = data.length; ri < rowLen; ri++) {
				dataRow = data[ri];

				sourceDataRow = (dataRow.rowType & $.wijmo.wijgrid.rowType.data)
					? sourceData[dataRow[0].originalRowIndex]
					: null;

				dataRowLen = dataRow.length;

				leftDomRow = null;
				rightDomRow = null;

				if (ri <= staticDataRowIndex) {
					leftDomRow = tBodies.nw.insertRow(-1);
					rightDomRow = tBodies.ne.insertRow(-1);
				} else {
					leftDomRow = tBodies.sw.insertRow(-1);
					rightDomRow = tBodies.se.insertRow(-1);
				}

				leftDomRow.role = "row";
				rightDomRow.role = "row";

				className = "wijmo-wijgrid-row ui-widget-content";
				switch (dataRow.rowType) {
					case $.wijmo.wijgrid.rowType.data:
					case $.wijmo.wijgrid.rowType.data | $.wijmo.wijgrid.rowType.dataAlt:
						className += " wijmo-wijgrid-datarow";

						leftDomRow.setAttribute("dataRowIndex", domRowDataIndex);
						rightDomRow.setAttribute("dataRowIndex", domRowDataIndex);

						if (dataRow.rowType & $.wijmo.wijgrid.rowType.dataAlt) {
							className += " wijmo-wijgrid-alternatingrow";
						}

						domRowDataIndex++;

						break;

					case $.wijmo.wijgrid.rowType.groupHeader:
						className += " wijmo-wijgrid-groupheaderrow";
						break;

					case $.wijmo.wijgrid.rowType.groupFooter:
						className += " wijmo-wijgrid-groupfooterrow";
						break;
				}

				if (className) {
					leftDomRow.className = className;
					rightDomRow.className = className;
				}

				// copy style properties
				styleProps = dataRow.__style;
				for (key in styleProps) {
					if (styleProps.hasOwnProperty(key)) {
						leftDomRow.style[key] = styleProps[key];
						rightDomRow.style[key] = styleProps[key];
					}
				}

				// copy attributes
				attrProps = dataRow.__attr;
				for (key in attrProps) {
					if (attrProps.hasOwnProperty(key)) {
						leftDomRow[key] = attrProps[key];
						rightDomRow[key] = attrProps[key];
					}
				}

				// render cells
				for (ci = 0, cellLen = visibleLeaves.length; ci < cellLen; ci++) {
					leaf = visibleLeaves[ci];
					dataIndex = leaf.dataIndex;

					cellIndex = 0;
					doBreak = false;

					switch (dataRow.rowType) {
						case $.wijmo.wijgrid.rowType.data:
						case $.wijmo.wijgrid.rowType.data | $.wijmo.wijgrid.rowType.dataAlt:
							cellIndex = dataIndex; // use [leaf -> data] mapping

							if (cellIndex >= 0 && (!dataRow[cellIndex] || (dataRow[cellIndex].visible === false))) {
								continue;  // spanned cell ?
							}
							break;

						case $.wijmo.wijgrid.rowType.groupHeader:
						case $.wijmo.wijgrid.rowType.groupFooter:
							cellIndex = ci; // just iterate through all dataRow cells.

							if (cellIndex >= dataRowLen) {
								doBreak = true;  // don't extend group headers\ footers with additional cells
							}
					}

					if (doBreak) {
						break;
					}

					$domCell = $(document.createElement("td"));

					if (ci === 0 && gridView.options.showRowHeader) {
						$domCell.addClass("wijmo-wijgrid-rowheader");
						$domCell.attr({ "role": "rowheader", "scope": "row" });
					} else {
						$domCell.attr("role", "gridcell");
					}

					$domCell.addClass("wijgridtd");

					$container = $("<div class=\"wijmo-wijgrid-innercell\"></div>");

					$domCell.append($container);

					if (cellIndex >= 0) {
						if (dataRow[cellIndex].rowSpan > 1) {
							$domCell.attr("rowSpan", dataRow[cellIndex].rowSpan);
						}

						if (dataRow[cellIndex].colSpan > 1) {
							$domCell.attr("colSpan", dataRow[cellIndex].colSpan);
						}

						if (dataRow[cellIndex].paddingLeft) {
							$container.css("padding-left", dataRow[cellIndex].paddingLeft);
						}
					}

					if (ci <= staticColumnIndex) {
						leftDomRow.appendChild($domCell[0]);
					} else {
						rightDomRow.appendChild($domCell[0]);
					}

					if ((dataRow.rowType & $.wijmo.wijgrid.rowType.data) && leaf.dataParser) {
						$domCell.attr("headers", ariaHeaders[ci/*cellIndex*/]);
						if (leaf.readOnly) {
							$domCell.attr("aria-readonly", "true");
						}

						cellValue = null;
						//sourceDataRow = sourceData[dataRow[0].originalRowIndex];

						if (cellIndex >= 0) { // cellIndex is equal to leaf.dataIndex here
							$domCell.addClass("wijdata-type-" + (leaf.dataType || "string"));

							dataValue = dataRow[cellIndex].value;
							cellValue = gridView._toStr(leaf, dataValue);

						} else { // unbound column
						}

						gridView.cellFormatter.format($container, leaf, cellValue, dataRow.rowType, sourceDataRow);
					} else {
						if (cellIndex >= 0) {
							$container.html(dataRow[cellIndex].html); // use original html
						}
					}
				} // for ci

				if (ri <= staticDataRowIndex) {
					if (!leftDomRow.cells.length) {
						tBodies.nw.removeChild(leftDomRow);
						leftDomRow = null;
					}

					if (!rightDomRow.cells.length) {
						tBodies.ne.removeChild(rightDomRow);
						rightDomRow = null;
					}

					if (leftDomRow || rightDomRow) {
						gridView._rowCreated(leftDomRow, rightDomRow, dataRow.rowType, sourceDataRow);
					}
				} else {
					if (!leftDomRow.cells.length) {
						tBodies.sw.removeChild(leftDomRow);
						leftDomRow = null;
					}

					if (!rightDomRow.cells.length) {
						tBodies.se.removeChild(rightDomRow);
						rightDomRow = null;
					}

					if (leftDomRow || rightDomRow) {
						gridView._rowCreated(leftDomRow, rightDomRow, dataRow.rowType, sourceDataRow);
					}
				}
			} // for ri

			nwArea = gridView.outerDiv.find(".wijmo-wijgrid-split-area-nw");
			neArea = gridView.outerDiv.find(".wijmo-wijgrid-split-area-ne");
			swArea = gridView.outerDiv.find(".wijmo-wijgrid-split-area-sw");
			seArea = gridView.outerDiv.find(".wijmo-wijgrid-content-area");

			nwArea[0].innerHTML = "";
			neArea[0].innerHTML = "";
			swArea[0].innerHTML = "";
			seArea[0].innerHTML = "";

			//alert("staticRowIndex=" + staticRowIndex + "\n" + _viewTables['se'].innerHTML);
			/* Note, empty() throws exception */
			$(_viewTables.nw).appendTo(nwArea);
			$(_viewTables.ne).appendTo(neArea);
			$(_viewTables.sw).appendTo(swArea);
			$(_viewTables.se).appendTo(seArea);

			postRender();
		};

		this.attachEvents = function () {
		};

		this.updateCss = function () {
		};

		// array of a htmlTableAccessor instances
		this.subTables = function () {
			//return [_dataTable];/*todo*/
			return [_table00, _table01, _table10, _table11];
		};

		this.focusableElement = function () {
			return _table11.element();
		};

		this.forEachRowCell = function (rowIndex, callback, param) {
			var joinedTables = this.getJoinedTables(false, rowIndex),
				table0 = joinedTables[0],
				table1 = joinedTables[1],
				relIdx, callbackResult;

			if (table0 !== null) {
				relIdx = joinedTables[2];
				if (relIdx < table0.element().rows.length) {
					callbackResult = table0.forEachRowCell(relIdx, callback, param);
					if (callbackResult !== true) {
						return callbackResult;
					}
				}
				if ((table1 !== null) && (relIdx < table1.element().rows.length)) {
					callbackResult = table1.forEachRowCell(relIdx, callback, param);
					if (callbackResult !== true) {
						return callbackResult;
					}
				}
			}

			return true;
		};

		this.forEachColumnCell = function (columnIndex, callback, param) {
			var joinedTables = this.getJoinedTables(true, columnIndex),
				relIdx, callbackRes;

			if (joinedTables[0] !== null) {
				relIdx = joinedTables[2];
				callbackRes = joinedTables[0].forEachColumnCell(relIdx, callback, param);
				if (callbackRes !== true) {
					return callbackRes;
				}

				if (joinedTables[1] !== null) {
					callbackRes = joinedTables[1].forEachColumnCell(relIdx, callback, param);
					if (callbackRes !== true) {
						return callbackRes;
					}
				}
			}

			return true;
		};

		this.ensureWidth = function (width, index) {
			if (arguments.length > 0) {
				this.setColumnWidth(index, width);
			}
			this.refreshPanel();
		};

		this.getCell = function (absColIdx, absRowIdx) {
			var joinedTablesRow = this.getJoinedTables(false, absRowIdx),
				joinedTablesCol, relRowIdx, relColIdx, table, cellIdx;

			if (joinedTablesRow[0] !== null) {
				joinedTablesCol = this.getJoinedTables(true, absColIdx);
				if (joinedTablesCol[0] !== null) {
					relRowIdx = joinedTablesRow[2];
					relColIdx = joinedTablesCol[2];

					table = null;
					if (joinedTablesRow[1] !== null) {
						table = (absColIdx === relColIdx) ? joinedTablesRow[0] : joinedTablesRow[1];
					}
					else {
						table = joinedTablesRow[0];
					}

					cellIdx = table.getCellIdx(relColIdx, relRowIdx);
					if (cellIdx >= 0) {
						return table.element().rows[relRowIdx].cells[cellIdx];
					}
				}
			}

			return null;
		};

		this.getColumnIndex = function (cell) {
			var owner = null,
				htmlTable = null,
				flag = false,
				colIdx;

			for (owner = cell.parentNode; owner.tagName.toLowerCase() !== "table"; owner = owner.parentNode) {
			}

			if (owner !== null) {
				if (owner === _table00.element()) {
					htmlTable = _table00;
				}
				else {
					if (owner === _table01.element()) {
						htmlTable = _table01;
						flag = true;
					}
					else {
						if (owner === _table10.element()) {
							htmlTable = _table10;
						}
						else {
							if (owner === _table11.element()) {
								htmlTable = _table11;
								flag = true;
							}
						}
					}
				}

				if (htmlTable !== null) {
					colIdx = htmlTable.getColumnIdx(cell);
					if (flag) {
						colIdx += gridView._staticColumnIndex + 1;
					}
					return colIdx;
				}
			}

			return -1;
		};

		this.getAbsoluteRowIndex = function (domRow) {
			var index = domRow.rowIndex,
				table = domRow.parentNode;

			while (table.tagName.toLowerCase() !== "table") {
				table = table.parentNode;
			}

			//return (table == _table00.element() || table == _table01.element()) ? index : index + gridView.options.staticRowIndex + 1;
			return (table === _table00.element() || table === _table01.element()) ? index : index + gridView._getRealStaticRowIndex() + 1;
		};

		this.getJoinedCols = function (columnIndex) {
			var result = [],
				joinedTables = this.getJoinedTables(true, columnIndex);

			joinedTables.splice(joinedTables.length - 1, 1);
			$.each(joinedTables, function (index, table) {
				result.push($(table.element()).find("col")[columnIndex]);
			});

			return result;
		};

		this.getJoinedRows = function (index, scope) {
			var row0 = null, row1 = null,
				table0 = null, table1 = null,
				fixedRowIdx = gridView._getRealStaticRowIndex(),
				fixedColIdx = gridView._staticColumnIndex, // commented by YK for removing unsuppored options.
				lastColIdx = gridView._field("leaves").length - 1,
				lastRowIdx = _rowsCount - 1,
				allRowsFixed = (fixedRowIdx === lastRowIdx),
				allsRowUnfixed = (fixedRowIdx < 0),
				rowsFixedSlice = !allRowsFixed && !allsRowUnfixed,
				sectionLength = 0;

			if (allRowsFixed || rowsFixedSlice) {
				if (fixedColIdx >= 0 && fixedColIdx < lastColIdx) {
					table0 = _table00;
					table1 = _table01;
				}
				else {
					table0 = (fixedColIdx < 0) ? _table01 : _table00;
				}
				sectionLength = table0.getSectionLength(scope);
				if (index < sectionLength) {
					row0 = table0.getSectionRow(index, scope);
					if (table1 !== null) {
						row1 = table1.getSectionRow(index, scope);
					}
				}
			}

			if (allsRowUnfixed || (rowsFixedSlice && (row0 === null))) {
				if (!allsRowUnfixed) {
					index -= sectionLength;
				}

				if (fixedColIdx >= 0 && fixedColIdx < lastColIdx) {
					table0 = _table10;
					table1 = _table11;
				}
				else {
					table0 = (fixedColIdx < 0) ? _table11 : _table10;
				}

				row0 = table0.getSectionRow(index, scope);

				if (table1 !== null) {
					row1 = table1.getSectionRow(index, scope);
				}
			}

			return (row0 === null && row1 === null) ? null : [row0, row1];
		};

		this.getJoinedTables = function (byColumn, index) {
			var t0 = null, t1 = null,
				idx = index,
			//var fixedRowIdx = gridView.options.staticRowIndex;
				fixedRowIdx = gridView._getRealStaticRowIndex(),
				fixedColIdx = gridView._staticColumnIndex; //gridView.options.staticColumnIndex; //YK

			if (byColumn) {
				if (index <= fixedColIdx) {
					t0 = _table00;
					t1 = _table10;
				}
				else {
					t0 = _table01;
					t1 = _table11;

					idx = idx - (fixedColIdx + 1);
				}

				if (fixedRowIdx < 0) {
					t0 = null;
				}

				if (fixedRowIdx === _rowsCount - 1) // fixed row is the last row
				{
					t1 = null;
				}
			}
			else {
				if (index <= fixedRowIdx) {
					t0 = _table00;
					t1 = _table01;
				}
				else {
					t0 = _table10;
					t1 = _table11;

					idx = idx - (fixedRowIdx + 1);
				}

				if (fixedColIdx < 0) {
					t0 = null;
				}
				if (fixedColIdx === gridView._field("leaves").length - 1) {
					t1 = null;
				}
			}

			if (t0 === null) {
				t0 = t1;
				t1 = null;
			}
			return [t0, t1, idx];
		};

		this.getHeaderCell = function (absColIdx) {
			var leaf = gridView._field("visibleLeaves")[absColIdx],
				headerRow = gridView._headerRows();

			if (headerRow) {
				return new $.wijmo.wijgrid.rowAccessor().getCell(headerRow.item(leaf.thY), leaf.thX);
			}

			return null;
		};

		this.getAbsCellInfo = function (cell) {
			return new $.wijmo.wijgrid.cellInfo(this.getColumnIndex(cell), this.getAbsoluteRowIndex(cell.parentNode));
		};

		this.getVisibleAreaBounds = function () {
			return $.wijmo.wijgrid.bounds(gridView.outerDiv.find(".wijmo-wijsuperpanel-contentwrapper:first"));
		};

		/*
		this.adjustColumnSizes = function(topTable, bottomTable) {
		if (topTable.rows.length > 0 && bottomTable.rows.length > 0) {
		var topRowCells = topTable.rows[0].cells;
		var bottomRowCells = bottomTable.rows[0].cells;
		if (topRowCells.length == bottomRowCells.length) {
		for (var i = 0; i < topRowCells.length; i++) {
		topRowCells[i].style.width = bottomRowCells[i].style.width = Math.max(topRowCells[i].offsetWidth, bottomRowCells[i].offsetWidth);
		}
		}
		}

		topTable.style.width = bottomTable.style.width = Math.max(topTable.offsetWidth, bottomTable.offsetWidth) + "px";
		//alert(topTable.style.width + "?w=" + Math.max(topTable.offsetWidth, bottomTable.offsetWidth));

		topTable.style.tableLayout = "fixed";
		bottomTable.style.tableLayout = "fixed";
		};
		*/

		this.adjustCellsSizes = function () {
			//$.wijmo.wijgrid.rowAccessor = function (view, scope, offsetTop, offsetBottom)
			var accessor = new $.wijmo.wijgrid.rowAccessor(this, 9/*all*/, 0),
				rowLen = accessor.length(),
				heights = [], // int[rowLen];
				i, j, rowObj,
				row0, len0, row0Span, row0h,
				row1, len1, row1Span, row1h,
				row;

			for (i = 0; i < rowLen; i++) {
				rowObj = this.getJoinedRows(i, 9/*all*/); // = accessor[i];

				row0 = rowObj[0];
				len0 = (row0 !== null) ? row0.cells.length : 0;
				row0Span = false;

				for (j = 0; j < len0 && !row0Span; j++) {
					row0Span = (row0.cells[j].rowSpan > 1);
				}

				row1 = rowObj[1];
				len1 = (row1 !== null) ? row1.cells.length : 0;
				row1Span = false;

				if (!row0Span) {
					for (j = 0; j < len1 && !row1Span; j++) {
						row1Span = (row1.cells[j].rowSpan > 1);
					}
				}

				row0h = (row0 !== null && len0 > 0) ? row0.offsetHeight : 0;
				row1h = (row1 !== null && len1 > 0) ? row1.offsetHeight : 0;

				heights[i] = (row0Span || row1Span) ? Math.min(row0h, row1h) : Math.max(row0h, row1h);
			}

			for (i = 0; i < rowLen; i++) {
				row = this.getJoinedRows(i, 9/*all*/); // = accessor[i];
				accessor.iterateCells(row, this.setCellContentDivHeight, heights[i]);
			}
		};

		this.setCellContentDivHeight = function (cell, param) {
			cell.style.height = param + "px";
			return true;
		};

		// private
		function postRender() {
			for (var key in _viewTables) {
				if (_viewTables.hasOwnProperty(key)) {
					$(_viewTables[key])
						.addClass("wijmo-wijgrid-table")
						.attr("role", "grid")
						.find("> tbody")
							.addClass("ui-widget-content wijmo-wijgrid-data");
				}
			}

			_table00 = new $.wijmo.wijgrid.htmlTableAccessor(_viewTables.nw);
			_table01 = new $.wijmo.wijgrid.htmlTableAccessor(_viewTables.ne);
			_table10 = new $.wijmo.wijgrid.htmlTableAccessor(_viewTables.sw);
			_table11 = new $.wijmo.wijgrid.htmlTableAccessor(_viewTables.se);

			// use separate instead of collapse to avoid a disalignment issue in chrome.
			$(_viewTables.ne)
				.attr({ "cellpadding": "0", "border": "0", "cellspacing": "0" })
				.css("border-collapse", "separate");

			$(_viewTables.se)
				.attr({ "cellpadding": "0", "border": "0", "cellspacing": "0" })
				.css("border-collapse", "separate");
		}
		// private
	}
});
$.extend($.wijmo.wijgrid, {

	resizer: function (gridView) {
		var _elements = [],
			_gap = 10,
			_step = 1,
			_evntFormat = "{0}." + gridView.widgetName + ".resizer",
			_inProgress = false,
			_hoveredField = null,

			_docCursor,

			_startLocation = null,
			_lastLocation = null,

			_proxy = null;

		this.addElement = function (c1basefield) {

			c1basefield.element
				.bind(eventKey("mousemove"), _onMouseMove)
				.bind(eventKey("mousedown"), _onMouseDown)
				.bind(eventKey("mouseout"), _onMouseOut);

			_elements.push(c1basefield);
		};

		this.dispose = function () {
			$.each(_elements, function (index, c1basefield) {
				c1basefield.element
					.unbind(eventKey("mousemove"), _onMouseMove)
					.unbind(eventKey("mousedown"), _onMouseDown)
					.unbind(eventKey("mouseout"), _onMouseOut);
			});

			detachDocEvents();
		};

		function _onMouseMove(e) {
			if (!_inProgress) {
				var hoveredField = getFieldByPos({ x: e.pageX, y: e.pageY });
				if (hoveredField && hoveredField._canSize() && gridView._canInteract()) {
					hoveredField.element.css("cursor", "e-resize");
					//hoveredField.element.find("> a").css("cursor", "e-resize");
					_hoveredField = hoveredField;
				} else {
					_onMouseOut(e);
				}
			}
		}

		function _onMouseOut(e) {
			if (!_inProgress) {
				if (_hoveredField) {
					_hoveredField.element.css("cursor", "");
					//_hoveredField.element.find("> a").css("cursor", "");
					_hoveredField = null;
				}
			}
		}

		function _onMouseDown(e) {
			_hoveredField = getFieldByPos({ x: e.pageX, y: e.pageY });
			if (_hoveredField && _hoveredField._canSize() && gridView._canInteract()) {
				try {
					_hoveredField.element.css("cursor", "");
					//_hoveredField.element.find("> a").css("cursor", "");

					_docCursor = document.body.style.cursor;
					document.body.style.cursor = "e-resize";
					_startLocation = _lastLocation = $.wijmo.wijgrid.bounds(_hoveredField.element);

					_proxy = $("<div class=\"wijmo-wijgrid-resizehandle ui-state-highlight\">&nbsp;</div>");

					_proxy.css({ "left": e.pageX, "top": _startLocation.top,
						"height": gridView._field("view").getVisibleAreaBounds().height - _hoveredField.element[0].offsetTop
					});

					$(document.body).append(_proxy);
				}
				finally {
					attachDocEvents();
					_inProgress = true;
				}
			}
		}

		function _onDocumentMouseMove(e) {
			var deltaX = _step * Math.round((e.pageX - _lastLocation.left) / _step);
			_lastLocation = { left: _lastLocation.left + deltaX, top: e.pageY };
			_proxy.css("left", _lastLocation.left);
		}

		function _onDocumentMouseUp(e) {
			try {
				document.body.style.cursor = _docCursor;

				// destroy proxy object
				_proxy.remove();

				if (_startLocation !== _lastLocation) {
					gridView._fieldResized(_hoveredField, _lastLocation.left - _startLocation.left);
				}
			}
			finally {
				_hoveredField = null;
				_proxy = null;
				detachDocEvents();
				_inProgress = false;
			}
		}

		function _onSelectStart(e) {
			e.preventDefault();
		}

		function attachDocEvents() {
			if (!_inProgress) {
				$(document)
					.bind(eventKey("mousemove"), _onDocumentMouseMove)
					.bind(eventKey("mouseup"), _onDocumentMouseUp);

				$(document.body).disableSelection();

				if ($.browser.msie) {
					$(document.body).bind("selectstart", _onSelectStart);
				}
			}
		}

		function detachDocEvents() {
			if (_inProgress) {
				$(document)
					.unbind(eventKey("mousemove"), _onDocumentMouseMove)
					.unbind(eventKey("mouseup"), _onDocumentMouseUp);

				$(document.body).enableSelection();
				if ($.browser.msie) {
					$(document.body).unbind("selectstart", _onSelectStart);
				}
			}
		}

		function getFieldByPos(mouse) {
			var i, len, c1basefield, bounds, res;

			for (i = 0, len = _elements.length; i < len; i++) {
				c1basefield = _elements[i];
				bounds = $.wijmo.wijgrid.bounds(c1basefield.element);

				res = $.ui.isOver(mouse.y, mouse.x,
					bounds.top, bounds.left + bounds.width - _gap,
					bounds.height, _gap);

				if (res) {
					return c1basefield;
				}
			}

			return null;
		}

		function eventKey(eventType) {
			return $.wijmo.wijgrid.stringFormat(_evntFormat, eventType);
		}
	}
});


$.extend($.wijmo.wijgrid, {
	cellFormatterHelper: function () {
		this.format = function ($container, column, formattedValue, rowType, dataRow) {
			var useDefault = true,
				defaultFormatter = null;

			if ($.isFunction(column.cellFormatter)) {
				useDefault = !column.cellFormatter($container, column, formattedValue, rowType, dataRow);
			}

			if (useDefault) {
				switch (column.dataType) {
					case "boolean":
						defaultFormatter = boolFormatter;
						break;

					default:
						defaultFormatter = textFormatter;
				}

				if (defaultFormatter) {
					defaultFormatter($container, column, formattedValue, rowType, dataRow);
				}
			}
		};

		// * private
		function textFormatter ($container, column, formattedValue, rowType, dataRow) {
			switch (rowType) {
				case $.wijmo.wijgrid.rowType.filter:
					defFormatFilterCell($container, column);
					break;

				default:
					if (!formattedValue) {
						formattedValue = "&nbsp;";
					}

					$container.html(formattedValue);
			}
		}

		function boolFormatter($container, column, formattedValue, rowType, dataRow) {
			var grid, allowEditing, disableStr = "disabled='disabled'", targetElement, currentCell;
			switch (rowType) {
				case $.wijmo.wijgrid.rowType.data:
				case $.wijmo.wijgrid.rowType.data | $.wijmo.wijgrid.rowType.dataAlt:
					grid = column.owner;
					allowEditing = grid.options.allowEditing && (column.readOnly !== true);

					if (allowEditing) {
						disableStr = "";
					}

					if (grid._parse(column, dataRow[column.dataKey]) === true) {
						$container.html("<input class='wijgridinput' type='checkbox' checked='checked' " + disableStr + " />");
					} else {
						$container.html("<input class='wijgridinput' type='checkbox' " + disableStr + " />");
					}

					if (allowEditing) {
						$container.children("input").bind("mousedown", function (e) {
							targetElement = $container.parent()[0];
							currentCell = grid.currentCell();
							if (currentCell.tableCell() !== targetElement) {
								grid._onClick({ target: targetElement });
							}
							if (!currentCell._isEdit()) {
								grid.beginEdit();
							}
						}).bind("keydown", function (e) {
							if (e.which === $.ui.keyCode.ENTER) {
								grid._endEditInternal(e);
								return false;
							}
						});
					}
					break;

				case $.wijmo.wijgrid.rowType.filter:
					defFormatFilterCell($container, column);
					break;
			}
		}

		function defFormatFilterCell ($container, column) {
			if ((column.dataIndex >= 0) && !column.isBand && column.showFilter) {
				$container.html("<div class=\"wijmo-wijgrid-filter ui-widget ui-state-default ui-corner-all\"><span class=\"wijmo-wijgrid-filtericon\"></span><input type=\"text\" class=\"wijmo-wijgrid-filter-input\" style=\"width:1px\" /><a class=\"wijmo-wijgrid-filter-trigger ui-corner-right ui-state-default\" href=\"#\"><span class=\"ui-icon ui-icon-triangle-1-s\"></span></a></div>");
			} else {
				$container.html("&nbsp;");
			}
		}

		// * private
	}
});
