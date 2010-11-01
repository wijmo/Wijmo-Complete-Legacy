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
 * * Wijmo Grid Widget.
 *
 * Depends:
 * jquery-1.4.2.js
 * jquery.ui.core.js
 * jquery.ui.widget.js
 * jquery.glob.js
 * jquery.ui.wijutil.js
 * jquery.ui.wijdatasource.js
 *
 * Optional dependencies for paging feature:
 * jquery.ui.wijpager.js
 *
 * Optional dependencies for scrolling feature:
 * jquery.ui.wijsuperpanel.js
 *
 * Optional dependencies for filtering feature:
 * jquery.ui.wijinputdate.js
 * jquery.ui.wijinputmask.js
 * jquery.ui.wijinputnumber.js
 * jquery.ui.wijlist.js
 *
 */

(function($) {
    $.widget("ui.wijgrid", {
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
            /// Note: See jquery.ui.wijpager.js for more information.
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
            /// The currencychanging event handler. A function called before the currency is changed. Cancellable.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijgrid({ currencychanging: function (e, args) { } });
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
            currencychanging: null,

            /// <summary>
            /// The currencychanged event handler. A function called after the currency is changed.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijgrid({ currencychanged: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="EventObj">EventObj relates to this event.</param>
            currencychanged: null,

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

        _dataLoading: function(userData) {
            this.element.addClass("ui-wijgrid-loading");
        },

        _dataLoaded: function(userData) {
            this.element.removeClass("ui-wijgrid-loading");
            this._requiresDataBinding = false;
            this._doRefresh(userData);
        },

        // userdata: {updateMode: int, callback: function }
        _ensureControl: function(userData) {
            if (this._initialized) {
                this._ownerise(false);
                this._widgetsToOptions();
            }
            this._ownerise(true);

            if (this._requiresDataBinding) {
                if (typeof (userData) === "number") {
                    userData |= 0x2;
                } else
                    if (userData.updateMode) {
                    userData.updateMode |= 0x2;
                }
                this._dataStore.load(userData);
            } else {
                this._doRefresh(userData);
            }
        },

        _doRefresh: function(userData) {
            var updateMode = 0xFF;

            if (typeof (userData) === "number") {
                updateMode = userData;
            } else if (typeof (userData.updateMode) === "number") {
                updateMode = userData.updateMode;
            }

            if (!this._initialized) {
                try {
                    this.element.empty();

                    $.ui.wijgrid.traverse(this.options.columns, function(column) {
                        column.isBand = ((column.columns) || (column.clientType === "c1band"));
                    });

                    // set .isLeaf
                    var bandProcessor = new $.ui.wijgrid.bandProcessor()._getVisibleHeight(this.options.columns, true);

                    // prepare leaves
                    var leaves = $.ui.wijgrid.getAllLeaves(this.options.columns);

                    var fieldsCount = this._dataStore.getFieldsCount();
                    var boundedToDOM = this._dataStore.dataMode() === $.ui.wijgrid.dataMode.dom;

                    var headerRow = null;

                    if (boundedToDOM) {
                        if (this._field("thead") && this._field("thead").length) {
                            headerRow = this._field("thead")[0];
                        }
                        fieldsCount = Math.max(headerRow ? headerRow.length : 0, fieldsCount);
                    }

                    var delta = fieldsCount - leaves.length;
                    if (delta > 0) { // create autogenerated columns
                        for (var i = 0; i < delta; i++) {
                            var defOptions = $.extend(true, {}, $.ui.c1basefield.prototype.options, $.ui.c1field.prototype.options);
                            var autoGenColumn = $.extend({ dynamic: true, isLeaf: true }, defOptions);
                            this.options.columns.push(autoGenColumn);
                        }
                    }

                    this._extendColumnOptions(); // attach dataParsers, merge with defaults etc.

                    $.ui.wijgrid.setTraverseIndex(this.options.columns);

                    // * build "pure" leaves list
                    leaves = [];
                    $.ui.wijgrid.traverse(this.options.columns, $.proxy(function(column) {
                        if (column.isLeaf && !column.isBand) {
                            leaves.push(column);
                        }
                    }, this));

                    // * set dataKey *
                    var availableFieldKeys = this._dataStore.getFieldsNames();

                    var leavesWithEmptyDataKey = [];
                    for (var i = 0, len = leaves.length; i < len; i++) {
                        var leaf = leaves[i];
                        var dataKey = leaf.dataKey;

                        if ($.ui.wijgrid.validDataKey(dataKey)) {
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

                    var i = 0;
                    for (var key in availableFieldKeys) {
                        var dataKey = availableFieldKeys[key];
                        if (!isNaN(dataKey)) {
                            dataKey = parseInt(dataKey);
                        }

                        var leaf = leavesWithEmptyDataKey[i++];
                        if (leaf) {
                            leaf.dataKey = dataKey;
                        }
                    }

                    for (var i = 0, len = leaves.length; i < len; i++) {
                        var leaf = leaves[i];
                        if (leaf.headerText === undefined) {
                            var flag = false;

                            if (boundedToDOM) {
                                var thIndex = (typeof (leaf.dataKey) === "number")
                              ? leaf.dataKey
                              : i;

                                if (thIndex < headerRow.length) {
                                    leaf.headerText = headerRow[thIndex]; // copy th value
                                    flag = true;
                                }
                            }

                            if (!flag) {
                                if ($.ui.wijgrid.validDataKey(leaf.dataKey)) {
                                    leaf.headerText = "" + leaf.dataKey; // copy data key value
                                }
                            }
                        }
                    }
                }
                finally {
                    this._initialized = true;
                }
            } // end if 

            // ** build leaves, visible leaves

            var tmpColumns = [];

            if (this.options.showRowHeader) {  // append rowHeader
                tmpColumns.push($.extend({ dynamic: true, clientType: "c1basefield", dynamic: true, dataIndex: -1, travIdx: -1,
                    parentVis: true, visible: true, isLeaf: true, isBand: false, owner: this
                }, $.ui.c1basefield.prototype.options, { allowSizing: false }));
            }

            $.each(this.options.columns, function(index, item) {
                tmpColumns.push(item); // append columns
            });

            // generate span table and build leaves
            var leaves = [];
            this._field("spanTable", new $.ui.wijgrid.bandProcessor().generateSpanTable(tmpColumns, leaves));
            this._field("leaves", leaves);

            // build visible leaves list and set dataIndex
            var visLeavesIdx = 0;
            var dataIndex = 0;

            this._field("visibleLeaves", $.grep(leaves, function(leaf, index) {
                leaf.leavesIdx = index;

                if ($.ui.wijgrid.validDataKey(leaf.dataKey)) {
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

            var table = this._dataStore.getDataSlice();

            this.dataTable = [];
            for (var ri = 0, rowsLen = table.length; ri < rowsLen; ri++) {
                var dataItem = table[ri];
                var newItem = [];

                for (var i = 0, len = leaves.length; i < len; i++) {
                    var leaf = leaves[i];

                    if ($.ui.wijgrid.validDataKey(leaf.dataKey)) {
                        var dataVal = dataItem[leaf.dataKey];

                        newItem.push({
                            value: dataVal.value,
                            originalRowIndex: dataVal.originalRowIndex
                        });
                    }
                }

                /*for (var key in dataItem) {
                newItem.push(dataItem[key]);
                }*/

                newItem.rowType = "data";

                this.dataTable.push(newItem);
            }

            this._refresh(updateMode);

            if (userData && userData.callback) {
                userData.callback();
            }
        },

        _create: function() {
            this.rendered = false;

            // initialize data
            this._requiresDataBinding = true;
            this._dataStore = new $.ui.wijgrid.dataStore(this);

            if (!this.element.is("div")) {
                throw "invalid markup";
            }

            this.element.addClass("ui-widget ui-wijgrid ui-widget-content ui-corner-all");

            this.filterOperatorsCache = new $.ui.wijgrid.filterOperatorsCache();

            // process build-in filtering operators
            this._registerFilterOperator($.ui.wijgrid.embeddedFilters);

            if (this.options.disabled) {
                this.disable();
            }
        },

        _init: function() {
            __wijReadOptionEvents(["currencychanging", "currencychanged", "filteroperatorslistshowing",
                 "groupaggregate", "grouptext",
                 "pageindexchanging", "pageindexchanged", "selectionchanged", "sorting", "sorted",
                 "beforecelledit", "beforecellupdate", "aftercellupdate", "aftercelledit", "invalidcellvalue"], this);

            this.$topPagerDiv = null;
            this.$bottomPagerDiv = null;

            // processing custom filtering operators
            this.filterOperatorsCache.removeCustom();
            $.each(this.options.customFilterOperators, function(index, value) {
                value.custom = true;
            });
            this._registerFilterOperator(this.options.customFilterOperators);

            // culture
            this._field("closestCulture", $.findClosestCulture(this.options.culture));

            // read tHead section

            if (this.options.data === null && // dataSource is a domTable
                !this._field("thead")) {
                this._field("thead", new $.ui.wijgrid.htmlTableDataReader(this).readTHead());
            }

            this._initialized = false;
            this._ensureControl({ updateMode: 0xFF });
        },

        _setOption: function(key, value) {
            var presetFunc = this["_preset_" + key];
            var oldValue = this.options[key];

            if (presetFunc !== undefined) {
                value = presetFunc.apply(this, [value, oldValue]);
            }

            var optionChanged = (value !== oldValue);

            $.Widget.prototype._setOption.apply(this, arguments); // update this.options

            if (optionChanged) {
                var postsetFunc = this["_postset_" + key];
                if (postsetFunc !== undefined) {
                    postsetFunc.apply(this, [value, oldValue]);
                }
            }
        },

        destroy: function() {
            ///	<summary>
            ///	Destroy wijgrid widget and reset the DOM element.
            /// Code example: $("#element").wijgrid("destroy");
            ///	</summary>

            var tmp;
            if (tmp = this._field("selectionui")) {
                tmp.dispose();
            }

            if (tmp = this._field("resizer")) {
                tmp.dispose();
            }

            $.ui.wijgrid.iterateChildrenWidgets(this.element, function(index, widget) {
                widget.destroy();
            });

            this.element.empty();
            this.element.removeClass("ui-widget ui-wijgrid ui-widget-content ui-corner-all");

            $.Widget.prototype.destroy.apply(this, arguments);
        },

        // * public
        columns: function() {
            /// <summary>
            /// Returns a one-dimensional array of widgets bound to visible column headers.
            /// Code example: var colWidgets = $("#element").wijgrid("columns");
            /// </summary>
            /// <returns type="Array" elementType="$.ui.c1basefield">A one-dimensional array of widgets bound to visible column headers.</returns>
            return this._field("columns") || [];
        },

        currency: function(cellInfo /* cellIndex */, rowIndex /* opt */) {
            /// <summary>
            /// Gets or sets the currency of the grid.
            /// Note: Use (-1, -1) value to hide currency.
            /// Code example:
            /// -) Getter:
            ///   var currency = $("#element).wijgrid("currency");
            /// -) Setter:
            ///   $("#element).wijgrid("currency", new $.ui.wijgrid.cellInfo(0, 0));
            ///   or
            ///   $("#element).wijgrid("currency", 0, 0);
            /// </summary>
            /// <param name="cellInfo" type="$.ui.wijgrid.cellInfo">Object that represents a single cell.</param>
            /// <param name="cellIndex" type="Number" integer="true" optional="true">Zero-based index of the required cell inside the corresponding row.</param>
            /// <param name="rowIndex" type="Number" integer="true" optional="true">Zero-based index of the row that contains required cell.</param>
            /// <returns type="$.ui.wijgrid.cellInfo">Object that represents current cell of the grid</returns>
            if (arguments.length === 0) { // getter
                var currency = this._field("currency");
                if (!currency) {
                    this._field("currency", currency = $.ui.wijgrid.cellInfo.prototype.outsideValue);
                }
                return currency;
            } else { // setter

                var currency = (arguments.length === 1)
                    ? cellInfo._clone()
                    : new $.ui.wijgrid.cellInfo(cellInfo, rowIndex);

                if (!currency.isEqual($.ui.wijgrid.cellInfo.prototype.outsideValue)) {
                    if (!currency._isValid()) {
                        throw "invalid arguments";
                    }

                    currency._clip(this._getDataCellsRange());
                }

                currency._setGridView(this);

                this._changeCurrency(currency);

                return this._field("currency");
            }
        },


        data: function() {
            /// <summary>
            /// Gets a array of the underlying data.
            /// Code example: var data = $("#element").wijgrid("data");
            /// </summary>
            /// <returns type="Array"></returns>
            return this._dataStore.dataSource().items;
        },

        selection: function() {
            /// <summary>
            /// Gets an object that manages selection in the grid.
            /// Code example:
            ///   var selection = $("#element").wijgrid("selection");
            /// </summary>
            /// <returns type="$.ui.wijgrid.selection">Object that manages selection in the grid.</returns>
            var selection = this._field("selection");
            if (!selection) {
                this._field("selection", selection = new $.ui.wijgrid.selection(this));
            }
            return selection;
        },

        beginEdit: function() {
            /// <summary>
            /// Puts the current cell in editing mode.
            /// Note: works only if the allowEditing option is set to true.
            /// Code example: $("#element").wijgrid("beginEdit");
            /// </summary>
            /// <returns type="Boolean">True if the cell is successfully put in edit mode, otherwise false.</returns>
            return this._beginEditInternal(null);
        },

        endEdit: function() {
            /// <summary>
            /// Finishes editing the current cell.
            /// Code example: $("#element").wijgrid("endEdit");
            /// </summary>
            return this._endEditInternal(null);
        },

        pageCount: function() {
            /// <summary>
            /// Gets the number of pages.
            /// Code example:
            /// var pageCount = $("#element").wijgrid("pageCount");
            /// </summary>
            /// <returns type="Number" integer="true">True if the cell is successfully put in edit mode, otherwise false.</returns>
            return this._field("pageCount") || 1;
        },

        // * public

        _headerRows: function() {
            var accessor = this._field("headerRowsAccessor");
            if (!accessor) {
                var bottomOffset = this.options.showFilter ? 1 : 0;
                this._field("headerRowsAccessor", accessor = new $.ui.wijgrid.rowAccessor(this._field("view"), 1 /* thead */, 0, bottomOffset));
            }

            return accessor;
        },

        _filterRow: function() {
            if (this.options.showFilter) {
                var tHeadAccessor = new $.ui.wijgrid.rowAccessor(this._field("view"), 1 /* thead */, 0, 0);
                return tHeadAccessor.item(tHeadAccessor.length() - 1); // filter is the last row in the tHead section
            }

            return null;
        },

        _rows: function() {
            var accessor = this._field("rowsAccessor");
            if (!accessor) {
                this._field("rowsAccessor", accessor = new $.ui.wijgrid.rowAccessor(this._field("view"), 2 /* tbody */, 0, 0));
            }

            return accessor;
        },

        _selectionui: function() {
            var selectionui = this._field("selectionui");
            if (!selectionui) {
                this._field("selectionui", selectionui = new $.ui.wijgrid.selectionui(this));
            }

            return selectionui;
        },

        _registerFilterOperator: function(value) {
            if (value && $.isArray(value)) {
                for (var i = 0, len = value.length; i < len; i++) {
                    this.filterOperatorsCache.add(value[i]);
                }
            }
            else {
                for (var i = 0, len = arguments.length; i < len; i++) {
                    this.filterOperatorsCache.add(arguments[i]);
                }
            }
        },

        //

        // * propeties (pre-\ post-)
        _postset_allowSorting: function(value, oldValue) {
            //this._refresh(1 | 2);
            this._ensureControl(1 | 2);
        },

        _postset_columns: function(value, oldValue) {
            throw "read-only";
        },

        _postset_allowPaging: function(value, oldValue) {
            //this._refresh(0xFF);
            this._requiresDataBinding = true;
            this._ensureControl(0xFF);
        },

        _postset_culture: function(value, oldValue) {
            //this._field("closestCulture", $.findClosestCulture(this.options.culture));
            throw "read-only";
        },

        _postset_customFilterOperators: function(value, oldValue) {
            this.filterOperatorsCache.removeCustom();
            $.each(this.options.customFilterOperators, function(index, value) {
                value.custom = true;
            });
            this._registerFilterOperator(value);
        },

        _postset_data: function(value, oldValue) {
            throw "read-only";
        },

        _postset_disabled: function(value, oldValue) {
            // update children widgets
            $.ui.wijgrid.iterateChildrenWidgets(this.element, function(index, widget) {
                widget.option("disabled", value);
            });

            //this._refresh(0xFF);
        },

        _postset_groupIndent: function(value, oldValue) {
            //this._refresh(2);
            this._ensureControl(2);
        },

        _preset_pageIndex: function(value, oldValue) {
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

        _postset_pageIndex: function(value, oldValue) {
            if (this.options.allowPaging) {

                //this._refresh(2 | 4);
                //this._trigger("pageindexchanged", null);
                this._requiresDataBinding = true;
                this._ensureControl({
                    updateMode: 2 | 4,
                    callback: $.proxy(function() {
                        this._trigger("pageindexchanged", null);
                    }, this)
                });
            }
        },

        _preset_pageSize: function(value, oldValue) {
            if (isNaN(value)) {
                throw "out of range";
            }

            if (value <= 0) {
                value = 1;
            }

            return value;
        },

        _postset_pageSize: function(value, oldValue) {
            this.options.pageIndex = 0;

            if (this.options.allowPaging) {
                //this._refresh(2 | 4);
                this._requiresDataBinding = true;
                this._ensureControl(2 | 4);
            }
        },

        _postset_pagerSettings: function(value, oldValue) {
            //this._refresh(4);
            this._ensureControl(4);
        },

        _postset_scrollMode: function(value, oldValue) {
            if (value === "none" || oldValue === "none") { // wijsuperpanel is enabled or disabled.
                this._ensureControl(0);
            } else { // wijsuperpanel is used, updating it.
                // refresh panel.
                this._field("view").refreshPanel();
            }
        },

        _postset_selectionMode: function(value, oldValue) {
            var selection = this.selection();
            var currency = this.currency();

            selection.beginUpdate();

            selection.clear();

            if (currency && currency._isValid()) {
                selection._selectRange(new $.ui.wijgrid.cellInfoRange(currency, currency), false, false, 0 /* none */, null);
            }

            selection.endUpdate();
        },

        _postset_showFilter: function(value, oldValue) {
            //this._refresh(8);
            this._ensureControl(8);
        },

        _postset_showRowHeader: function(value, oldValue) {
            //this._refresh(1 | 2);
            this._ensureControl(1 | 2);
        },

        /*_postset_splits: function() {
        if (!this.options.splits) {
        this.element.find(".ui-wijgrid-split-area-nw")[0].scrollTop = 0;
        this.element.find(".ui-wijgrid-split-area-ne")[0].scrollTop = 0;
        }
        //this._refresh(0);
        this._ensureControl(0);
        },
        _postset_splitDistanceX: function() {
        this._updateSplitters();
        },
        _postset_splitDistanceY: function() {
        this._updateSplitters();
        },*/

        _postset_staticRowIndex: function() {
            //this._refresh(0);
            if (this.options.scrollMode !== "none") { // staticRowIndex is ignored when scrolling is turned off.
                this._ensureControl(0);
            }
        },
        /*_postset_staticColumnIndex: function() {
        //this._refresh(0);
        this._ensureControl(0);
        },*/

        // * propeties (pre-\ post-)

        // * private
        _columnWidgetsFactory: function($node, columnOpt) {
            var columnWidget;

            var clientType = columnOpt.clientType;
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

        _field: function(name, value) {
            if (arguments.length === 1) {
                return this.element.data(name);
            }

            return this.element.data(name, value);
        },

        _extendColumnOptions: function() {
            $.ui.wijgrid.traverse(this.options.columns, $.proxy(function(column) {
                column.isBand = ((column.columns) || (column.clientType === "c1band"));

                $.ui.wijgrid.shallowMerge(column, $.ui.c1basefield.prototype.options); // merge with the c1basefield default options

                if (!column.isBand) {
                    $.ui.wijgrid.shallowMerge(column, $.ui.c1field.prototype.options); // merge with the c1field default options
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
                            throw $.ui.wijgrid.stringFormat("Unsupported dataType value: \"{0}\"", column.dataType);
                    }

                    if ($.isFunction(column.dataParser)) {
                        column.dataParser = new column.dataParser();
                    }
                } else {
                    column.clientType = "c1band";
                }
            }, this));
        },

        _buildFilterInfo: function() {
            var leaves = this._field("leaves");

            var result = $.map(leaves, $.proxy(function(element, index) {
                if (!element.isBand && (element.dataIndex >= 0) && element.filterOperator) {
                    var opName = element.filterOperator.toLowerCase();
                    var operator;

                    // check operator name
                    if (opName !== "nofilter" && (operator = this.filterOperatorsCache.getByName(opName))) {

                        // check dataType
                        if ($.inArray(element.dataType || "string", operator.applicableTo) >= 0) {

                            // check arity + filterValue
                            if (operator.arity === 1 || (operator.arity > 1 && element.filterValue !== undefined)) {
                                return [{ column: element, operator: operator}];
                            }
                        }
                    }
                }

                return null;
            }, this));

            return result;

            // *** //

        },

        _buildSortInfo: function() {
            //var leaves = this._getLeavesOptions();
            var leaves = this._field("leaves");

            var result = $.map(leaves, function(element, index) {
                if ((element.visible || element.visible === undefined) && !element.isBand && (element.dataIndex >= 0)) {
                    var value = (element.sortDirection === "ascending" || element.sortDirection === "descending" || element.sortFlag)
                    //? [[index, element.sortDirection]]
                    //    ? [[element.dataIndex, element.sortDirection]]
                        ? [{ dataKey: element.dataKey, dataIndex: element.dataIndex, sortDirection: element.sortDirection}]
                        : null;
                }

                delete element.sortFlag;

                return value;
            });

            return result;
        },

        _widgetsToOptions: function() {
            var colOptionsList = $.ui.wijgrid.flatten(this.options.columns);
            $.ui.wijgrid.traverse(this.columns(), function(colWidget) {
                var congruentColOption = colOptionsList[colWidget.options.travIdx];
                $.extend(true, congruentColOption, colWidget.options);
            });
        },

        _recreateColumnWidgets: function() {
            $.each(this.columns(), function(index, item) {
                item.destroy();
            });

            var columns = [];
            //var tHead = this.$table.find("> thead");
            var headerRows = this._headerRows();

            if (/* tHead.length*/headerRows && headerRows.length()) {
                var visibleColumns = []; // visible bands and leaves

                $.ui.wijgrid.traverse(this.options.columns, function(column) {
                    if (column.parentVis) {
                        visibleColumns.push(column);
                    }
                });

                for (var i = 0, len = visibleColumns.length; i < len; i++) {
                    var column = visibleColumns[i];
                    //var th = tHead[0].rows[column.thY].cells[column.thX];
                    var headerRowObj = headerRows.item(column.thY);
                    var th = new $.ui.wijgrid.rowAccessor().getCell(headerRowObj, column.thX);

                    var columnWidget = this._columnWidgetsFactory($(th), column);
                    columns.push(columnWidget.data(columnWidget.data("widgetName"))); // store actual widget instance
                }
            }

            this._field("columns", columns);
        },

        _ownerise: function(flag) {
            if (flag) {

                var self = this;
                $.ui.wijgrid.traverse(this.options.columns, function(column) {
                    column.owner = self;

                    var tmp;
                    if ((tmp = column.groupInfo)) {
                        tmp.owner = column;

                        if (tmp.expandInfo) {
                            for (var i = 0, len = tmp.expandInfo.length; i < len; i++) {
                                tmp.expandInfo[i].owner = tmp;
                            }
                        }
                    }
                });
            } else {

                $.ui.wijgrid.traverse(this.options.columns, function(column) {
                    delete column.owner;

                    var tmp;
                    if ((tmp = column.groupInfo)) {
                        delete tmp.owner;

                        if (tmp.expandInfo) {
                            for (var i = 0, len = tmp.expandInfo.length; i < len; i++) {
                                delete tmp.expandInfo[i].owner;
                            }
                        }
                    }
                });
            }
        },

        _updateSplits: function() {
            if (this._field("view").updateSplits != null) {
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

        // updateMode:
        // 0 - nothing
        // 1 - header
        // 2 - data
        // 4 - pager
        // 8 - filter
        _refresh: function(updateMode) {
            this.updateMode = (updateMode === undefined) ? 0 : updateMode;

            //$.ui.wijgrid.timerOn("refresh");

            if (this._field("selectionui")) {
                this._field("selectionui").dispose();
                this._field("selectionui", null);
            }

            //if (this.updateMode & 1) {
            if (this._field("headerRowsAccessor")) {
                this._field("headerRowsAccessor", null);
            }
            //}

            //if (this.updateMode & 2) {
            if (this._field("rowsAccessor")) {
                this._field("rowsAccessor", null);
            }
            //}

            if (this._field("resizer")) {
                this._field("resizer").dispose();
            }


            // apply merging, grouping
            if (this.updateMode & 2) {
                // grouping
                new $.ui.wijgrid.grouper().group(this, this.dataTable, this._field("leaves"));

                // merging
                new $.ui.wijgrid.merger().merge(this.dataTable, this._field("visibleLeaves"));
            }

            // view
            var view;
            //if (!this.options.splits && (this.options.staticRowIndex >= 0 || this.options.staticColumnIndex >= 0)) {
            // only support fixing row feature in this version.
            if (this.options.scrollMode !== "none" && (this._staticColumnIndex >= 0 || this.options.staticRowIndex >= 0)) {
                this._field("view", view = new $.ui.wijgrid.fixedView(this));
            } else {
                this._field("view", view = new $.ui.wijgrid.flatView(this));
            }
            view.initialize();

            this._render();

            // (re)create widgets

            // column headers+
            //if (this.updateMode & 1) {
            this._ownerise(false);
            this._recreateColumnWidgets();
            this._ownerise(true);
            //}

            // pager
            if ((this.updateMode & (2 | 4)) && this.options.allowPaging) {
                // top pager
                if (this.$topPagerDiv) {
                    this.$topPagerDiv.wijpager(this._pagerSettings2PagerWidgetSettings());
                }

                // bottom pager
                if (this.$bottomPagerDiv) {
                    this.$bottomPagerDiv.wijpager(this._pagerSettings2PagerWidgetSettings());
                }
            }

            // (re)create widgets-

            // update css
            //this._updateCss();

            // attach events
            this._attachEvents();

            // currency
            $(view.focusableElement()).attr("tabIndex", 0); // to handle keyboard\ focus events

            if (this.currency()._isValid()) {
                this.currency(this.currency());
            } else {
                this.currency(new $.ui.wijgrid.cellInfo(0, 0));
            }

            // selection
            this._field("selection", null); // always recreate selection object
            var currency = this.currency();
            if (currency._isValid()) {
                this.selection()._startNewTransaction(currency);
                this.selection()._selectRange(new $.ui.wijgrid.cellInfoRange(currency, currency), false, false, 0 /* none */, null);
            }

            // selection ui
            this._selectionui();

            // initialize resizer
            var resizer = new $.ui.wijgrid.resizer(this);
            $.ui.wijgrid.traverse(this.columns(), function(column) {
                var o = column.options;
                if (o.visible && o.parentVis && o.isLeaf) {
                    resizer.addElement(column);
                }
            });
            this._field("resizer", resizer);

            this.rendered = true;
            this.updateMode = 0;

            if (this.options.scrollMode !== "none") {
                this._updateSplits(); /*dma*/
            }

            //window.defaultStatus = $.ui.wijgrid.timerOff("refresh");            
        },

        _render: function() {

            var view = this._field("view");
            view.render(0xFF /*this.updateMode*/);

            var content = (this.options.scrollMode !== "none")
                ? view.element.find(".ui-wijgrid-content-area")
                : this.element;

            // top pager (top div)
            if (this.updateMode & (2 | 4)) {
                if (this.$topPagerDiv) {
                    if (this.$topPagerDiv.data("wijpager")) {
                        this.$topPagerDiv.wijpager("destroy");
                    }
                    this.$topPagerDiv.empty();
                }

                if (this.$topPagerDiv) {
                    this.$topPagerDiv.remove();
                }
                this.$topPagerDiv = null;

                if (this.options.allowPaging && ((this.options.pagerSettings.position === "top") || (this.options.pagerSettings.position === "topAndBottom"))) {
                    if (!this.$topPagerDiv) {
                        content.prepend(this.$topPagerDiv = $("<div class=\"ui-wijgrid-header ui-wijsuperpanel-header ui-widget-header ui-corner-top\"></div>"));
                    }
                }
            }

            // bottom pager (bottom div)
            if (this.updateMode & (2 | 4)) {
                if (this.$bottomPagerDiv) {
                    if (this.$bottomPagerDiv.data("wijpager")) {
                        this.$bottomPagerDiv.wijpager("destroy");
                    }
                    this.$bottomPagerDiv.empty();
                }

                if (this.$bottomPagerDiv) {
                    this.$bottomPagerDiv.remove();
                }
                this.$bottomPagerDiv = null;

                if (this.options.allowPaging && ((this.options.pagerSettings.position === "bottom") || (this.options.pagerSettings.position === "topAndBottom"))) {
                    if (!this.$bottomPagerDiv) {
                        content.append(this.$bottomPagerDiv = $("<div class=\"ui-wijgrid-footer ui-wijsuperpanel-footer ui-state-default ui-corner-bottom\"></div>"));
                    }
                }
            }
        },

        /*
        _updateCss: function() {
        var view = this._field("view");

        $.each(view.subTables(), function(index, item) {
        var domTable = item.element();
        $(domTable).addClass("ui-wijgrid-table");

        if (domTable.tBodies) {
        var tBody = domTable.tBodies[0];
        if (tBody) {
        $(tBody).addClass("ui-widget-content ui-wijgrid-data");
        }
        }
        });

        view.updateCss();
        },*/

        _attachEvents: function() {
            var view = this._field("view");

            var $fe = $(view.focusableElement());
            $fe.bind("keydown." + this.widgetName, $.proxy(this._onKeyDown, this));
            $fe.bind("keypress." + this.widgetName, $.proxy(this._onKeyPress, this));

            $.each(view.subTables(), $.proxy(function(index, element) {
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
                    }
                }
            }, this));

            // attach "onGroupExpandCollapseIconClick" event
            $.each(view.getJoinedTables(true, 0), $.proxy(function(index, item) {
                if (item && typeof (item) !== "number") {
                    var domTable = item.element(); // item is a htmlTableAccessor instance

                    $(domTable)
                        .find("> tbody")
                        .find("> tr.ui-wijgrid-groupheaderrow > td .ui-wijgrid-grouptogglebtn")
                        .bind("click." + this.widgetName, $.proxy(this._onGroupBtnClick, this));
                }
            }, this));

            view.attachEvents();
        },

        _sortBy: function(columnWidget) {
            if (this.options.allowSorting) {
                columnWidget.options.sortFlag = true; // to use "none" as sort direction if needed.        
                var columns = this.columns();
                var idx = $.inArray(columnWidget, columns);

                if (idx >= 0) {
                    $.each(columns, function(index, item) {
                        if (item !== columnWidget) {
                            item.options.sortDirection = "none";
                        }
                    });

                    //this._refresh(1 | 2);
                    //columnWidget.options.sortFlag = false;

                    this._requiresDataBinding = true;
                    this._ensureControl({
                        updateMode: 1 | 2,
                        callback: $.proxy(function() {
                            columnWidget.options.sortFlag = false;
                        }, this)
                    });
                }
            }
        },

        _pagerSettings2PagerWidgetSettings: function() {
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
        _onPagerWidgetPageIndexChanging: function(sender, args) {
            //return window.confirm("onPageIndexChanging: continue ?");
            args.handled = true;
        },

        _onPagerWidgetPageIndexChanged: function(sender, args) {
            this._setOption("pageIndex", args.newPageIndex);
        },

        _onClick: function(args) {

            if (!this._canInteract() || !args.target) {
                return;
            }

            // info[0] - clicked cell
            // info[1] - ui-wijgrid-table
            var info = this._getParentSubTable(args.target, ["td", "th"], this._field("view").subTables());
            if (info) {
                var view = this._field("view");
                var clickedCell = info[0];

                var $row = $(clickedCell).closest("tr");

                if (!($row.is(".ui-wijgrid-datarow") || $row.is(".ui-wijgrid-headerrow"))) {
                    return;
                }

                if (!$row.length) {
                    return;
                }

                var clickedCellInfo = view.getAbsCellInfo(clickedCell)._dataToAbs(this._getDataToAbsOffset());
                var extendMode = 0; // none

                if (clickedCellInfo.cellIndex() < 0 || clickedCellInfo.rowIndex() < 0) { // header cell, rowheader cell or filter cell

                    if (clickedCellInfo.rowIndex() >= 0) { // rowheader cell
                        // move currency to the first cell of the clicked row
                        clickedCellInfo = new $.ui.wijgrid.cellInfo(0, clickedCellInfo.rowIndex());
                        extendMode = 2; // extend to row
                    } else { // header cell
                        // move currency to the first cell of the clicked column
                        clickedCellInfo = new $.ui.wijgrid.cellInfo(clickedCellInfo.cellIndex(), 0);
                        extendMode = 1; // extend to column
                    }
                }

                this._changeCurrency(clickedCellInfo);

                var currency = this.currency();
                var selection = this.selection();

                if (!args.shiftKey || (!selection._multipleRangesAllowed() && this.options.selectionMode.toLowerCase() !== "singlerange")) {
                    selection._startNewTransaction(currency);
                }

                selection.beginUpdate();

                if (args.shiftKey && args.ctrlKey) {
                    selection._clearRange(new $.ui.wijgrid.cellInfoRange(currency, currency), extendMode);
                } else {
                    selection._selectRange(new $.ui.wijgrid.cellInfoRange(selection._anchorCell(), currency), args.ctrlKey, args.shiftKey, extendMode, null);
                }

                selection.endUpdate();
            }
        },

        _onDblClick: function(args) {
            this._beginEditInternal(args);
        },

        _onGroupBtnClick: function(args) {
            var $row = $(args.target).closest("tr");

            var gh = new $.ui.wijgrid.groupHelper();
            var groupInfo = gh.getGroupInfo($row[0]);
            if (groupInfo) {
                var column = gh.getColumnByGroupLevel(this._field("leaves"), groupInfo.level);
                if (column) {
                    var group = column.groupInfo.expandInfo[groupInfo.index];

                    if (group.isExpanded) {
                        group.collapse(args.shiftKey);
                    } else {
                        group.expand(args.shiftKey);
                    }
                    this._field("view").ensureWidth(); /*dma*/
                }
            }
        },

        _onKeyDown: function(args) {
            if (!this._canInteract) {
                return true;
            }

            var tag = args.target.tagName.toLowerCase();
            if ((tag === "input" || tag === "option" || tag === "select" || tag === "textarea") &&
                 ($(args.target).closest("tr.ui-wijgrid-datarow").length === 0)) { // not a datarow ?
                return true;
            }

            if (this.options.allowEditing) {
                if (args.which === 113) { // F2: start editing
                    this._beginEditInternal(args);
                    return false;
                } else
                // ESC: cancel editing
                    if ((args.which === $.ui.keyCode.ESCAPE) && (this.currency()._isValid() && this.currency()._isEdit())) {
                    this._endEditInternal(args);
                    return false;
                }
            }

            if (!this.options.allowKeyboardNavigation) {
                return true;
            }

            var canChangePos = false;
            var curPos;

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

                    curPos = this._getNextCurrencyPos(this._getDataCellsRange(), this.currency(), args.keyCode, args.shiftKey);
                    canChangePos = this._canMoveToAnotherCell(args.target, args.which); // TODO: add tab navigation

                    break;
            }

            if (canChangePos) {
                var cell = this._changeCurrency(new $.ui.wijgrid.cellInfo(curPos.cellIndex, curPos.rowIndex));

                var currency = this.currency();
                var selection = this.selection();

                if (!args.shiftKey || (!selection._multipleRangesAllowed() && this.options.selectionMode.toLowerCase() !== "singlerange")) {
                    selection._startNewTransaction(currency);
                }

                selection.beginUpdate();
                selection._selectRange(new $.ui.wijgrid.cellInfoRange(selection._anchorCell(), currency), false, args.shiftKey, 0 /* none */, null);
                selection.endUpdate();

                // TODO: tab navigation

                return false; // stop bubbling
            }

            return true;
        },

        _onKeyPress: function(args) {
            if (this._canInteract() && this.options.allowEditing) {
                var charCode = args.which;
                var currency = this.currency();

                if (charCode && currency._isValid() && !currency._isEdit()) {
                    var tag = args.target.tagName.toLowerCase();

                    if (tag !== "input" && tag !== "option" && tag !== "select" && tag !== "textarea") {
                        var table = $(args.target).closest(".ui-wijgrid-table");
                        //if (table.length &&  (table[0] === this.$table[0])) {
                        if (table.length) {

                            var domSubTables = $.map(this._field("view").subTables(), function(item, index) {
                                return item.element();
                            });

                            if ($.inArray(table[0], domSubTables) >= 0) {
                                if ($.wij.charValidator.isPrintableChar(String.fromCharCode(charCode))) {
                                    //new $.ui.wijgrid.cellEditorHelper().currencyEditStart(this, args);
                                    this._beginEditInternal(args);
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
        },

        _onMouseMove: function(args) {
            if (!this._canInteract()) {
                return;
            }

            var view = this._field("view");
            var info = this._getParentSubTable(args.target, ["td", "th"], view.subTables());
            if (info) {
                var hoveredCell = info[0];
                var $hoveredRow = $(hoveredCell).closest("tr");

                if (!$hoveredRow.length || !($hoveredRow.is(".ui-wijgrid-datarow") || $hoveredRow.is(".ui-wijgrid-headerrow"))) {
                    return;
                }

                var hoveredCellInfo = view.getAbsCellInfo(hoveredCell)._dataToAbs(this._getDataToAbsOffset());

                var prevRowIndex = this._field("hoveredRow");
                if (hoveredCellInfo.rowIndex() !== prevRowIndex) {
                    var prevRowObj = this._rows().item(prevRowIndex);
                    if (prevRowObj) {
                        if (prevRowObj[0]) {
                            $(prevRowObj[0]).removeClass("ui-state-hover");
                        }

                        if (prevRowObj[1]) {
                            $(prevRowObj[1]).removeClass("ui-state-hover");
                        }
                    }
                }

                var rowIndex = hoveredCellInfo.rowIndex();
                this._field("hoveredRow", rowIndex);
                //if (rowIndex >= 1) { // yk to inclue the first row.
                if (rowIndex >= 0) {
                    var rowObj = this._rows().item(rowIndex);
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
        // * event handlers


        // * resizing
        _fieldResized: function(fieldWidget, newWidth) {
            if (newWidth <= 0) {
                newWidth = 1;
            }

            fieldWidget.option("width", newWidth);
        },
        // * resizing

        // * currency
        _changeCurrency: function(cellInfo) {
            var result = null;
            var currency = this.currency();

            var dataRange = this._getDataCellsRange();

            // if cellInfo has a valid value
            if ((dataRange._isValid() && dataRange._containsCellInfo(cellInfo)) || (cellInfo.isEqual(cellInfo.outsideValue))) {

                // other cell than current cell
                if (currency.cellIndex() !== cellInfo.cellIndex() || currency.rowIndex() !== cellInfo.rowIndex()) {
                    var args = {
                        cellIndex: cellInfo.cellIndex(),
                        rowIndex: cellInfo.rowIndex(),
                        oldCellIndex: currency.cellIndex(),
                        oldRowIndex: currency.rowIndex()
                    }

                    if (this._trigger("currencychanging", null, args)) {

                        var cellEditCompleted = false;
                        if (!this.options.allowEditing || !currency._isEdit() || (cellEditCompleted = this._endEditInternal(null))) {
                            if (dataRange._containsCellInfo(currency)) {
                                this._changeCurrencyUI(currency, false); // remove the current one
                            }

                            currency = cellInfo._clone();
                            currency._setGridView(this);

                            result = this._changeCurrencyUI(currency, true);

                            this._field("currency", currency); // set currency

                            this._trigger("currencychanged");
                        }
                    }
                } else { // the same cell
                    result = this._changeCurrencyUI(currency, true); // ensure
                }
            } else { // cellInfo is invalid
                // do nothing

                // this._changeCurrencyUI(currency, false);
                // this._field("currency", currency.outsideValue); // set currency
            }

            return result;
        },

        _changeCurrencyUI: function(cellInfo, add) {
            if (cellInfo && !cellInfo.isEqual(cellInfo.outsideValue)) {
                var view = this._field("view");
                var leaves = this._field("visibleLeaves");

                var dataOffset = this._getDataToAbsOffset();

                var x = cellInfo.cellIndex() + dataOffset.x;
                var y = cellInfo.rowIndex() + dataOffset.y;

                if (y >= 0) {
                    var rowObj = view.getJoinedRows(y, 0);
                    if (rowObj && rowObj[0] && this.options.showRowHeader) { // activate rowHeader cell
                        if (add) {
                            $(rowObj[0].cells[0]).addClass("ui-state-active ui-wijgrid-currency-rowheadercell");
                        } else {
                            $(rowObj[0].cells[0]).removeClass("ui-state-active ui-wijgrid-currency-rowheadercell");
                        }
                    }

                    if (x >= 0 && x < leaves.length) {
                        var headerCell = view.getHeaderCell(x);
                        if (headerCell) { // activate header cell
                            if (add) {
                                $(headerCell).addClass("ui-state-active ui-wijgrid-currency-headercell");
                            } else {
                                $(headerCell).removeClass("ui-state-active ui-wijgrid-currency-headercell");
                            }
                        }

                        var dataCell = view.getCell(x, y);
                        if (dataCell) { // activate data cell
                            if (add) {
                                $(dataCell).addClass("ui-state-active ui-wijgrid-currency-cell");
                            } else {
                                $(dataCell).removeClass("ui-state-active ui-wijgrid-currency-cell");
                            }
                        }
                    }

                    return view.getCell(x, y);
                } // if y >= 0
            }

            return null;
        },
        // * currency


        // * editing
        _beginEditInternal: function(e) {
            if (this._canInteract() && this.options.allowEditing) {
                var column = this.currency()._column();
                if (column && !column.readOnly) {
                    var res = new $.ui.wijgrid.cellEditorHelper().currencyEditStart(this, e);
                    if (res) {
                        this._field("view").ensureWidth(0);
                    }
                    return res;
                }

            }

            return false;
        },

        _endEditInternal: function(e) {
            if (this._canInteract() && this.options.allowEditing) {
                var res = new $.ui.wijgrid.cellEditorHelper().currencyEditEnd(this, e);
                if (res) {
                    this._field("view").ensureWidth(0);
                }
                return res;
            }

            return false;
        },
        // * editing

        // misc

        _parseDOM: function(column, value) {
            return column.dataParser.parseDOM(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
        },

        _parse: function(column, value) {
            return column.dataParser.parse(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
        },

        _toStr: function(column, value) {
            return column.dataParser.toStr(value, this._field("closestCulture"), column.dataFormatString, this.options.nullString);
        },

        _canInteract: function() {
            return !this.options.disabled;
        },

        _canMoveToAnotherCell: function(domElement, keyCode) {
            var tag = domElement.tagName.toLowerCase();

            switch (tag) {
                case "input":
                    if ($(domElement).hasClass("wijgridinput")) {

                        if (domElement.type === "text") {
                            var len = domElement.value.length;
                            var selectionRange = new $.ui.wijgrid.domSelection(domElement).getSelection();

                            var kc = $.ui.keyCode;

                            var res = ((keyCode === kc.UP || keyCode == kc.DOWN || keyCode === kc.PAGE_DOWN || keyCode == kc.PAGE_UP) ||
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

        _getDataToAbsOffset: function() {
            var x = 0;
            var y = 0;

            if (this.options.showRowHeader) {
                x++;
            }

            var headerRows = this._headerRows();
            if (headerRows) {
                y += headerRows.length();
            }

            if (this._filterRow()) {
                y++;
            }

            //y += this.$table.find("> thead > tr").length;

            return { x: x, y: y };
        },

        _getDataCellsRange: function() {
            var minCol = 0;
            var minRow = 0;

            var maxCol = this._field("visibleLeaves").length - 1; // = this._field("dataCache").<maxWidth>

            if (this.options.showRowHeader) {
                maxCol--;
            }

            var currentData = this.dataTable;
            var maxRow = currentData.length - 1;

            if (maxCol < 0 || maxRow < 0) {
                minCol = minRow = maxCol = maxRow = -1;
            }

            return new $.ui.wijgrid.cellInfoRange(new $.ui.wijgrid.cellInfo(minCol, minRow),
                new $.ui.wijgrid.cellInfo(maxCol, maxRow));
        },

        _getNextCurrencyPos: function(dataRange, cellInfo, keyCode, shiftKeyPressed) {
            var cellIndex = cellInfo.cellIndex();
            var rowIndex = cellInfo.rowIndex();

            switch (keyCode) {
                case $.ui.keyCode.PAGE_UP:
                    if (this.options.key_reverse && rowIndex === dataRange.topLeft().rowIndex()) {
                        rowIndex = dataRange.bottomRight().rowIndex();
                    } else {
                        rowIndex -= this.options.key_pageSize;

                        var tmp;
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

                        var tmp;
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
                    cellIndex = (this.options.key_reverse && cellIndex == dataRange.topLeft().cellIndex())
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

        _getParentSubTable: function(root, tagsToFind, subTables) {
            var domSubTables = $.map(subTables, function(item, index) {
                return item.element();
            });

            var subTable = null;
            var lastCoincidentEl = null;

            for (; root !== null && subTable === null; root = root.parentNode) {

                var tag = (root.tagName)
                    ? root.tagName.toLowerCase()
                    : undefined;

                if ($.inArray(tag, tagsToFind) >= 0) {
                    lastCoincidentEl = root;
                } else {
                    //if ($(root).hasClass("ui-wijgrid-table")) {
                    if ($.inArray(root, domSubTables) >= 0) {
                        subTable = root;
                    }
                }
            }

            return (lastCoincidentEl && subTable)
                ? [lastCoincidentEl, subTable]
                : null;
        },

        _getRealStaticRowIndex: function() {
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
    })
})(jQuery);/*
 Provides the base widget for columns in the wijgrid.
*/

(function ($) {
    $.widget("ui.c1basefield", {
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
            /// Code example: $("#element").wijgrid({ columns: [ { dataField: "ProductID" } ] });
            /// <summary>
            dataKey: undefined,

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
            /// Code example: $("#element").wijgrid({ columns: [ { visible: "true" } ] });
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
            this.element.addClass("ui-widget ui-c1basefield ui-state-default");
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
            this.element.wrapInner("<span class=\"ui-wijgrid-headertext\" />");
        },

        _field: function (name, value) {
            if (arguments.length === 1) {
                return this.element.data(name);
            }

            return this.element.data(name, value);
        },

        _setOption: function (key, value) {
            var presetFunc = this["_preset_" + key];
            var oldValue = this.options[key];

            if (presetFunc !== undefined) {
                value = presetFunc.apply(this, [value, oldValue]);
            }

            var optionChanged = (value !== oldValue);

            $.Widget.prototype._setOption.apply(this, arguments);

            if (optionChanged) {
                var postsetFunc = this["_postset_" + key];
                if (postsetFunc !== undefined) {
                    postsetFunc.apply(this, [value, oldValue]);
                }
            }
        },

        _preset_clientType: function (value, oldValue) {
            throw "read-only";
        },

        _postset_headerText: function (value, oldValue) {
            this._headerTextDOM(value);
        },

        _postset_visible: function (value, oldValue) {
            //this._field("owner")._refresh(0xFF);
            this._field("owner")._ensureControl(0xFF);
        },

        _postset_width: function (value, oldValue) {
            var grid = this._field("owner");
            var view = grid._field("view");

            var oldWidth = this.element.width();

            var cols = view.getJoinedCols(this.options.leavesIdx /*this.options.thX*/);
            $.each(cols, function (index, col) {
                if (col) {
                    col.width = value;
                }
            });

            view.forEachColumnCell(this.options.leavesIdx /*this.options.thX*/, function (cell, idx) {
                $(cell).setOutWidth(value);
                return true;
            });

            view.ensureWidth(value - oldWidth);
        },

        _canSize: function () {
            return this.options.allowSizing && this._field("owner").options.allowColSizing;
        }
    })
})(jQuery);

/*
provides the base widget for columns in the wijgrid.
*/

(function($) {
    $.widget("ui.c1field", $.ui.c1basefield, {
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

        _create: function() {
            //$(this.element).data("widgetName", this.widgetName);
            $.ui.c1basefield.prototype._create.apply(this, arguments);

            this.element.addClass("ui-widget ui-c1field");
        },

        destroy: function() {
            $.ui.c1basefield.prototype.destroy.apply(this, arguments);

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

        _init: function() {
            $.ui.c1basefield.prototype._init.apply(this, arguments);

            this.$filterEditor = null;

            this._refreshHeaderCell();

            var gridView = this._field("owner");

            this.filterRow = gridView._filterRow();
            if (gridView.options.showFilter && this.options.showFilter && (this.options.dataIndex >= 0)) {
                this._prepareFilterCell();
            }
        },

        _setOption: function(key, value) {
            $.ui.c1basefield.prototype._setOption.apply(this, arguments);
        },

        _postset_aggregate: function(value, oldValue) {
            //this._field("owner")._refresh(2);
            this._field("owner")._ensureControl(2);
        },

        _postset_allowSort: function(value, oldValue) {
            this.element.find("#contentCell").empty();
            this._headerTextDOM(this.options.headerText);
            this._refreshHeaderCell();
        },

        _postset_dataType: function(value, oldValue) {
            throw "read-only";
        },

        _postset_dataParser: function(value, oldValue) {
            //this._field("owner")._refresh(2);
            this._field("owner")._ensureControl(2);
        },

        _postset_dataFormatString: function(value, oldValue) {
            //this._field("owner")._refresh(2);
            this._field("owner")._ensureControl(2);
        },

        _postset_filterOperator: function(value, oldValue) {
            //this._field("owner")._refresh(2 | 8);
            this._field("owner")._requiresDataBinding = true;
            this._field("owner")._ensureControl(2 | 8);
        },

        _postset_filterValue: function(value, oldValue) {
            //this._field("owner")._refresh(2 | 8);
            this._field("owner")._requiresDataBinding = true;
            this._field("owner")._ensureControl(2 | 8);
        },

        _postset_groupInfo: function(value, oldValue) {
            // this._field("owner")._refresh(2);
            this._field("owner")._ensureControl(2);
        },

        _postset_rowMerge: function(value, oldValue) {
            //var owner = this._field("owner");
            //owner._refresh(2);
            this._field("owner")._ensureControl(2);
        },

        _postset_showFilter: function(value, oldValue) {
            //this._field("owner")._refresh(8);
            this._field("owner")._ensureControl(8);
        },

        // + sort direction +
        _preset_sortDirection: function(value, oldValue) {
            var grid = this._field("owner");
            if (!grid._trigger("sorting", null, null)) {
                value = oldValue;
            }

            return value;
        },

        _postset_sortDirection: function(value, oldValue) {
            var grid = this._field("owner");
            grid._sortBy(this);
            grid._trigger("sorted", null, null);
        },

        // overrides
        _postset_width: function(value, oldValue) {
            /*if (this.$filterEditor) {
            var foo = this.$filterEditor;

                while (true) {
            if (parseInt(foo.css("width"))) {
            foo.data("oldWidth", foo.width());
            foo.width(1);
            }

                    if (foo.is(".ui-wijinput")) {
            break;
            }

                    foo = foo.parent();
            }
            }*/

            $.ui.c1basefield.prototype._postset_width.apply(this, arguments);

            /*if (this.$filterEditor) {
            var foo = this.$filterEditor;

                while (true) {
            var oldWidth = foo.data("oldWidth");
            if (oldWidth) {
            var delta = this._getFilterEditorWidth() - oldWidth;
            foo.setOutWidth(oldWidth + delta);
            }

                    if (foo.is(".ui-wijinput")) {
            break;
            }

                    foo = foo.parent();
            }
            }*/
        },
        // overrides

        // - sort direction -

        _canSort: function() {
            var gridView = this._field("owner");
            return (gridView && gridView.options.allowSorting && this.options.allowSort && (this.options.dataIndex >= 0));
        },

        _refreshHeaderCell: function() {
            this.element
                .empty()
                .text(this.options.headerText);

            if (this._canSort()) {
                this.element.wrapInner("<a class=\"ui-wijgrid-headertext\" href=\"#\" />");
                var anchor = this.element.find("> a");
                anchor.bind("click." + this.widgetName, this, this._onHrefClick);

                switch (this.options.sortDirection) { // sorting icon
                    case "ascending":
                        anchor.append($("<span class=\"ui-icon ui-icon-triangle-1-n\">ascending</span>"));
                        //                        this.element.append($("<span class=\"ui-icon ui-icon-triangle-1-n\">ascending</span>"));
                        break;

                    case "descending":
                        anchor.append($("<span class=\"ui-icon ui-icon-triangle-1-s\">descending</span>"));
                        //                        this.element.append($("<span class=\"ui-icon ui-icon-triangle-1-s\">descending</span>"));
                        break;
                }

            } else {
                this.element.wrapInner("<span class=\"ui-wijgrid-headertext\" />");
            }
        },

        _prepareFilterCell: function() {
            var filterCellIndex = this.options.visLeavesIdx;
            if (filterCellIndex >= 0) {
                var gridView = this._field("owner");

                var filterCell = null;
                if (this.filterRow) {
                    filterCell = $(new $.ui.wijgrid.rowAccessor().getCell(this.filterRow, filterCellIndex));
                } else {
                    throw "exception";
                }

                /*
                filterCell.find("td.filterOp:first") // icon of the filter operator
                .append($("<div />")
                .attr("class", this._getFilterOpIconCss(gridView, this.options.filterOperator)));

                filterCell.find("td.filterEditor:first").append(this.$filterEditor = $("<input type=\"text\" />"));
                */
                filterCell.find(".ui-wijgrid-filtericon").attr("class", this._getFilterOpIconCss(gridView, this.options.filterOperator));
                this.$filterEditor = filterCell.find("input");

                var editorWidth = this._getFilterEditorWidth();
                this.$filterEditor.setOutWidth(editorWidth);

                var dataValue = gridView._parse(this.options, this.options.filterValue);

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
                var filterButton = filterCell.find(".ui-wijgrid-filter-trigger");
                filterButton.bind("mouseenter", function(e) {
                    var ele = $(this);
                    ele.addClass("ui-state-hover");
                }).bind("mouseleave", function(e) {
                    var ele = $(this);
                    ele.removeClass("ui-state-hover");
                    ele.removeClass("ui-state-active");
                }).bind("mouseup", this, function(e) {
                    $(this).removeClass("ui-state-active");
                }).bind("mousedown", { column: this }, this._onFilterBtnClick);
            }
        },

        _onFilterBtnClick: function(e) {
            var column = e.data.column;

            if (column.$dropDownFilterList) {
                return false;
            }

            var wijgrid = column._field("owner");
            var filterOpLC = e.data.column.options.filterOperator.toLowerCase();

            var applicableFilters = wijgrid.filterOperatorsCache.getByDataType(column.options.dataType);
            wijgrid.filterOperatorsCache.sort(applicableFilters, wijgrid.options.filterOperatorsSortMode);

            var args = $.extend(true, {}, { operators: applicableFilters });
            wijgrid._trigger("filteroperatorslistshowing", null, args);

            var items = [];
            if (args.operators) {
                for (var key in args.operators) {
                    var operator = args.operators[key];
                    items.push({ label: operator.name, value: operator.name, selected: operator.name.toLowerCase() === filterOpLC });
                }
            }

            column.$dropDownFilterList = $("<div class=\"ui-wijgrid-filterlist\"></div").appendTo(document.body).wijlist(
            {
                autoSize: true,
                maxItemsCount: 8,
                selected: function(data, arg) {
                    var filterOp = wijgrid.filterOperatorsCache.getByName(arg.item.value);

                    column._removeDropDownFilterList();

                    var doFiltering = false;
                    if (filterOp) {
                        if (filterOp.arity > 1) {
                            // check value
                            var value = wijgrid._parse(column.options, column.$filterEditor.val());
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
                        //wijgrid._refresh(2 | 4);
                        wijgrid._requiresDataBinding = true;
                        wijgrid._ensureControl(2 | 4);
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

            var eventGuid = column.$dropDownFilterList.eventGuid = new Date().getTime();
            $(document).bind("mousedown." + column.widgetName + "." + eventGuid, { column: column }, column._onDocMouseDown);
        },

        _getFilterOpIconCss: function(gridView, filterOpName) {
            var css = "filter-nofilter";

            var filterOp = gridView.filterOperatorsCache.getByName(filterOpName.toLowerCase());
            if (filterOp) {
                if (filterOp.css) {
                    css = filterOp.css;
                } else {
                    css = "filter-" + filterOp.name.toLowerCase();
                }
            }

            return "ui-wijgrid-filtericon " + css;
        },

        _onDocMouseDown: function(e) {
            var $target = $(e.target);

            //var $filterButton = $target.parents(".filterBtn:first");
            var $filterButton = $target.is(".ui-wijgrid-filter-trigger")
                ? $target
                : $target.parents(".ui-wijgrid-filter-trigger:first");

            var $filterList = $target.parents(".ui-wijgrid-filterlist:first");

            if (($filterButton.length && ($filterButton[0] === e.data.column.$dropDownFilterList.$button[0])) ||
             ($filterList.length && ($filterList[0] === e.data.column.$dropDownFilterList[0]))) {
                // do nothing
            } else {
                e.data.column._removeDropDownFilterList();
            }
        },

        _onHrefClick: function(args) {
            if (args.data.options.disabled) {
                return false;
            }

            if (args.data.options.allowSort) {
                var sortDir = args.data.options.sortDirection;
                sortDir = (sortDir == "none")
                    ? "ascending"
                    : (sortDir == "ascending") ? "descending" : "ascending";

                args.data.option("sortDirection", sortDir);
            }

            return false;
        },

        _removeDropDownFilterList: function() {
            if (this.$dropDownFilterList) {
                var eventGuid = this.$dropDownFilterList.eventGuid;

                this.$dropDownFilterList.remove();

                this.$dropDownFilterList = null;

                $(document).unbind("mousedown." + this.widgetName + "." + eventGuid, this._onDocMouseDown);
            }
        },

        _getFilterEditorWidth: function() {
            if (this.$filterEditor) {
                var $fd = this.$filterEditor.closest(".ui-wijgrid-filter");
                var value = $fd.width() - $fd.find(".ui-wijgrid-filtericon").outerWidth();
                if (!value || value < 0) {
                    value = 0;
                }

                return value;
            }
            else {
                throw "exception";
            }
        },

        _somemethod: function() {
            //            $.ui.c1basefield.prototype._somemethod.apply(this, arguments);
        }
    })
})(jQuery);


/*(function($) {
    $.widget("ui.c1boundfield", $.ui.c1field, {
        options: {
            dataField: null
        },

        _create: function() {
            //$(this.element).data("widgetName", this.widgetName);
            $.ui.c1field.prototype._create.apply(this, arguments);
        }
    })
})(jQuery);*/



(function($) {
    $.widget("ui.c1band", $.ui.c1basefield, {
        options: {
            /// <summary>
            /// Gets a array of objects representing the columns of the band.
            /// The default value is an empty array.
            /// Type: Array.
            /// </summary>
            columns: []
        },

        _create: function() {
            //$(this.element).data("widgetName", this.widgetName);
            $.ui.c1basefield.prototype._create.apply(this, arguments);
            this.element.addClass("ui-widget ui-c1band");            
        }
    })
})(jQuery);

// traversing, band processing
$.extend($.ui.wijgrid, {
    bandProcessor: function() {
        var height;
        var width;
        var table;
        var traverseList;
        var shift;
        var inc;
        var savedXPos;

        this.generateSpanTable = function(root, leaves) {
            height = width = inc = shift = 0;
            table = [];
            traverseList = [];
            savedXPos = [];

            var spanTable = this._generateSpanTable(root, leaves, true);
            return spanTable;
        },

        this._generateSpanTable = function(root, leaves, parentVisibility) {
            height = this._getVisibleHeight(root, parentVisibility);

            leaves = leaves || [];

            //var foo = function(self) {
            $.ui.wijgrid.traverse(root, function(column) {
                if (column.isLeaf) {
                    leaves.push(column);
                }
                traverseList.push(column);
                //self.traverseList.push(column);
            });
            //} (this); // make closure

            width = leaves.length;

            for (var i = 0; i < height; i++) {
                table[i] = [];
                for (var j = 0; j < width; j++) {
                    table[i][j] = { column: null, colSpan: 0, rowSpan: 0 };
                }
            }

            this._setTableValues(root, 0, 0);

            return table;
        },

        this._getVisibleHeight = function(root, parentVisibility) {
            var result = 0;

            if ($.isArray(root)) { // columns
                for (var i = 0, len = root.length; i < len; i++) {
                    var tmp = this._getVisibleHeight(root[i], parentVisibility);
                    result = Math.max(result, tmp);
                }
            } else { // column
                var colVis = (root.visible === undefined) ? true : root.visible;
                root.parentVis = colVis && parentVisibility;

                if (root.isBand) { // band
                    for (var i = 0, len = root.columns.length; i < len; i++) {
                        var tmp = this._getVisibleHeight(root.columns[i], root.parentVis);
                        result = Math.max(result, tmp);
                    }

                    if (!root.parentVis) {
                        return result;
                    }

                    root.isLeaf = (result == 0);
                    result++;
                } else { // general column
                    root.isLeaf = true;
                    if (root.parentVis) {
                        result = 1;
                    }
                }
            }

            return result;
        },

        this._getVisibleParent = function(column) {

            while (column) {
                column = traverseList[column.parentIdx];
                if (column && (column.parentVis || column.parentVis === undefined)) {
                    return column;
                }
            }

            return null;

            /*var result = null;

            for (var i = 0, len = columns.length; i < len && !result; i++) {
            var col = columns[i];

                if ((col.parentVis || col.parentVis === undefined) && col.columns) {
            result = this._getVisibleParent(col.columns, column, col);
            }

                if (!result && col === column) {
            result = parent;
            }
            }

            return result;*/
        },

        this._setTableValues = function(root, y, x) {
            if ($.isArray(root)) { //
                for (var i = 0, len = root.length; i < len; i++) {
                    this._setTableValues(root[i], y, x);
                }
            } else { // column
                if (root.travIdx === undefined) {
                    throw "undefined travIdx";
                }
                var tx = x + shift;

                if (root.parentVis) {
                    var posX = tx + inc;

                    /*if (!this.table[y]) {
                    this.table[y] = [];
                    }*/

                    table[y][posX].column = root;
                    savedXPos[root.travIdx] = posX;
                    //this.table[y][posX] = $.extend(this.table[y][posX], { column: root });
                    //this.savedXPos[root] = posX;
                }

                if (root.isBand) { // band
                    for (var i = 0, len = root.columns.length; i < len; i++) {
                        this._setTableValues(root.columns[i], y + 1, x);
                    }
                }

                if (root.parentVis) {
                    if (shift - tx === 0) { //root is column or band without visible nodes
                        table[y][savedXPos[root.travIdx]].rowSpan = height - y;
                        //this.table[y][this.savedXPos[root]].rowSpan = this.height - y;
                        //this.table[y][this.savedXPos[root]] = $.extend(this.table[y][this.savedXPos[root]], { rowSpan: this.height - y });

                        shift++;
                    } else { // band with visible nodes
                        table[y][savedXPos[root.travIdx]].colSpan = shift - tx;
                        //this.table[y][this.savedXPos[root]].colSpan = this.shift - tx;
                        //this.table[y][this.savedXPos[root]] = $.extend(this.table[y][this.savedXPos[root]], { colSpan: this.shift - tx });
                    }
                } else {
                    if (!root.isBand && height > 0) {
                        //var visibleParent = this._getVisibleParent(this.root, root, null);
                        var visibleParent = this._getVisibleParent(root);
                        var parentIsLeaf = (visibleParent)
                            ? visibleParent.isLeaf
                            : false;

                        if (parentIsLeaf) {
                            inc++;
                        }

                        if (y >= height) {
                            y = height - 1;
                        }

                        var posX = x + shift + inc;

                        table[y][posX].column = root;
                        //this.table[y, posX] = $.extend(this.table[y, posX], { column: root });

                        if (!parentIsLeaf) {
                            if (visibleParent && (savedXPos[visibleParent.travIdx] === posX)) {
                                //if (visibleParent && (this.savedXPos[visibleParent] == posX)) {
                                this._shiftTableElements(posX, y);
                            }

                            inc++;
                        }
                    }
                }
            }
        },

        this._shiftTableElements = function(x, untilY) {
            for (var i = 0; i < untilY; i++) {
                table[i][x + 1] = table[i][x];
                table[i][x] = { column: null, colSpan: 0, rowSpan: 0 };
                //this.table[i][x].column = null;
                //this.table[i][x].colSpan = 0;
                //this.table[i][x].rowSpan = 0;

                if (table[i][x + 1].column) {
                    //this.savedXPos[this.table[i][x + 1].column]++;
                    savedXPos[table[i][x + 1].column.travIdx]++;
                }
            }
        }
    },

    // returns both visible and invisible leaves.
    getAllLeaves: function(columns) {
        var leaves = [];
        this._getAllLeaves(columns, leaves);
        return leaves;
    },

    _getAllLeaves: function(columns, leaves) {
        if (columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];

                var subColumns;

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

    getColumnByTravIdx: function(columns, travIdx) {
        var result = null;
        if (columns) {
            for (var i = 0, len = columns.length; i < len && !result; i++) {
                var column = columns[i];
                var subColumns;

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

    getLeaves: function(columns) {
        var leaves = [];
        this._getLeaves(columns, leaves);
        return leaves;
    },

    _getLeaves: function(columns, leaves) {
        if (columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];

                if (column.isLeaf) {
                    leaves.push(column);
                }

                this._getLeaves(column.columns, leaves);
            }
        }
    },

    setTraverseIndex: function(columns) {
        return this._setTraverseIndex(columns, 0, -1); // -> columns length
    },

    _setTraverseIndex: function(columns, idx, parentIdx) {
        if (columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];

                var subColumns;

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

    flatten: function(columns) {
        var result = [];

        this.traverse(columns, function(column) {
            result.push(column);
        });

        return result;
    },

    traverse: function(columns, callback) {
        if (columns && ($.isFunction(callback))) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];

                callback(column);

                var subColumns = ($.isFunction(column.columns))
                    ? column.columns() // widget
                    : column.columns; // column options object

                if (subColumns) {
                    this.traverse(subColumns, callback);
                }
            }
        }
    }
});
$.extend($.ui.wijgrid, {
    htmlTableDataReader: function (gridView) {
        this.readTHead = function () {
            var $table = gridView.element.find(" > table");

            if (!$table.length) {
                throw "table not found";
            }

            var dataH = [];
            var tHead = $table[0].tHead;

            if (tHead) {
                for (var ri = 0, rowLen = 1/*tHead[0].rows.length*/; ri < rowLen; ri++) {
                    var row = tHead.rows[ri];
                    var rowData = [];

                    for (var ci = 0, cellLen = row.cells.length; ci < cellLen; ci++) {
                        rowData.push(row.cells[ci].innerHTML);
                    }

                    dataH.push(rowData);
                }
            }

            return dataH;
        },

        this.readTBody = function () {
            var $table = gridView.element.find(" > table");
            if (!$table.length) {
                throw "table not found";
            }

            // read tbody
            var dataB = [];

            var tBody = $table.find("> tbody");
            if (tBody.length) {
                for (var ri = 0, rowLen = tBody[0].rows.length; ri < rowLen; ri++) {
                    var row = tBody[0].rows[ri];
                    var rowData = [];
                    for (var ci = 0, cellLen = row.cells.length; ci < cellLen; ci++) {

                        rowData[ci] = {
                            value: row.cells[ci].innerHTML, // for sorting, merging and grouping
                            originalRowIndex: ri
                        }

                    } // for ci

                    dataB.push(rowData);
                } // for ri
            } // if tbody.length

            return dataB;
        }
    }
});

$.extend($.ui.wijgrid, {
    dataMode: {
        dom: 1,
        statical: 2,
        remoteStatical: 4,
        remoteDynamical: 8
    },

    dataStore: function(wijgrid) {
        var _dataSource = null;
        var _remoteDataLength = 0;
        var _self = this;
        var _isLoaded = false;
        var _clonedItems = null;
        var _transformedData;
        var _parsed = false;
        var _transformed = false;

        this.dataMode = function() {
            return _dataMode();
        },

        this.dataSource = function() {
            return _dataSource;
        },

        this.getFieldsCount = function() {
            if (!_isLoaded) {
                throw "data is not loaded yet";
            }

            return _dataSource.items && _dataSource.items.length
                ? _dataRowLength(_dataSource.items[0])
                : 0;
        },

        this.getFieldsNames = function() {
            if (!_isLoaded) {
                throw "data is not loaded yet";
            }

            var result = [];

            if (_dataSource.items && _dataSource.items.length) {
                for (var key in _dataSource.items[0]) {
                    var fooKey = key;
                    if (typeof (fooKey) === "string") {
                        fooKey = key.toLowerCase();
                    }

                    result[fooKey] = key;
                }
            }

            return result;
        },

        this.getTotalRowsCount = function() {
            if (!_isLoaded) {
                throw "data is not loaded yet";
            }

            if (_dataMode() === $.ui.wijgrid.dataMode.remoteDynamical) {
                return _remoteDataLength;
            }

            return _dataSource.items.length;
        },

        this.getDataSlice = function() {
            if (!_isLoaded) {
                throw "data is not loaded yet";
            }

            if (!_parsed) {
                _parsed = true; // todo try/ finally
                _parseData(); // parse _clonedItems;
            }

            if (!_transformed) {
                _transformed = true; // todo try/ finally

                if (_dataMode() !== $.ui.wijgrid.dataMode.remoteDynamical) {
                    _transformedData = _transform();
                } else {
                    _transformedData = $.extend(true, [], _clonedItems);
                }

                // update PageCount
                if (wijgrid.options.allowPaging) {
                    var pageCount = Math.ceil(_self.getTotalRowsCount() / wijgrid.options.pageSize) || 1;
                    wijgrid._field("pageCount", pageCount);
                }
                // update PageCount
            }

            return _transformedData;
        },

       this.load = function(userData) {
           if (!_dataSource) {
               _dataSource = $.proxy(_createDataSource, this)(wijgrid);
           }

           if (_dataMode() === $.ui.wijgrid.dataMode.remoteDynamical) { // always load data
               // todo: pass parameters (paging, sorting etc)
               _dataSource.load(userData);
           } else { // local 
               if (!_isLoaded) { // first time ?
                   _dataSource.load(userData);
               } else {
                   _dataLoading(_dataSource, userData);
                   _dataLoaded(_dataSource, userData);
               }
           }
       },

       this.updateValue = function(originalRowIndex, dataKey, newValue) {
           if (!_isLoaded) {
               throw "data is not loaded yet";
           }

           _dataSource.items[originalRowIndex][dataKey] = newValue;
           _clonedItems[originalRowIndex][dataKey] = newValue;
       };

        // private

        var _createDataSource = function(grid) {
            var dataSource = null;

            var gridData = grid.options.data;

            if (gridData === null) { // DOMTable
                dataSource = new wijdatasource({
                    data: grid.element.find("> table"),
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
                dataSource = new wijdatasource({
                    data: gridData.data,
                    reader: new _dataReaderWrapper(gridData.reader),
                    proxy: gridData.proxy,
                    loading: $.proxy(function(dataSource, data) {
                        if (gridData.loading) {
                            gridData.loading(dataSource, data);
                        }

                        $.proxy(_dataLoading, this)(dataSource, data);
                    }, this),
                    loaded: $.proxy(function(dataSource, data) {
                        if (gridData.loaded) {
                            gridData.loaded(dataSource, data);
                        }

                        $.proxy(_dataLoaded, this)(dataSource, data);
                    }, this)
                });
            }

            return dataSource;
        };

        var _dataLoading = function(wijDataSource, userData) {
            _parsed = false;
            _transformed = false;
            _transformedData = null;
            _clonedItems = null;
            wijgrid._dataLoading(userData);
        };

        var _dataLoaded = function(wijDataSource, userData) {
            _isLoaded = true;

            if (_self.dataMode() === $.ui.wijgrid.dataMode.remoteDynamical) { // remote
                _parsed = false;
                _transformed = true;
            } else { // local
                _parsed = false;
                _transformed = false;
            }

            // clone original items and extend them to a { value, originalRowIndex } pair
            var foo = [];
            for (var i = 0, len = wijDataSource.items.length; i < len; i++) {
                var item = wijDataSource.items[i];
                var newItem = $.isArray(item)
                    ? []
                    : {};

                for (var key in item) {
                    newItem[key] = {
                        value: item[key],
                        originalRowIndex: i
                    };
                }

                foo.push(newItem);
            }

            _clonedItems = foo;

            wijgrid._dataLoaded(userData);
        };

        var _dataMode = function() {
            if (!_dataSource.data) { // dataSource.data == domTable
                return $.ui.wijgrid.dataMode.dom;
            }

            if (_dataSource.data.proxy) {
                return _dataSource.data.proxy.dynamic === true
                    ? $.ui.wijgrid.dataMode.remoteDynamical
                    : $.ui.wijgrid.dataMode.remoteStatical;
            }

            return $.ui.wijgrid.dataMode.statical;
        };

        var _dataRowLength = function(dataRow) {
            if ($.isArray(dataRow)) {
                return dataRow.length;
            } else {
                var i = 0;

                for (var key in dataRow) {
                    i++;
                }

                return i;
            }
        };

        var _parseData = function() {
            if (_clonedItems && _clonedItems.length) {

                var dataLeaves = [];
                $.ui.wijgrid.traverse(wijgrid.options.columns, function(column) {
                    if ($.ui.wijgrid.validDataKey(column.dataKey)) {
                        dataLeaves.push(column);
                    }
                });

                var dataLen = Math.min(dataLeaves.length, _self.getFieldsCount());
                for (var ri = 0, len = _clonedItems.length; ri < len; ri++) {
                    var dataRow = _clonedItems[ri];

                    for (var di = 0; di < dataLen; di++) {
                        var value = null;
                        var dataLeaf = dataLeaves[di];

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
        };

        var _transform = function() {
            if (_clonedItems && _clonedItems.length) {
                var filterInfo = wijgrid._buildFilterInfo();

                var sortInfo = null;
                if (wijgrid.options.allowSorting) {
                    sortInfo = wijgrid._buildSortInfo();
                }

                var result = new $.ui.wijgrid.dataHelper().getDataSlice(wijgrid, $.extend(true, [], _clonedItems), filterInfo, sortInfo);
                return result;
            }

            return [];
        };

        // * data readers *
        var _dataReaderWrapper = function(dataReader) {

            this.read = function(dataSource) {
                if (dataReader && $.isFunction(dataReader.read)) {
                    dataReader.read(dataSource);
                } else {
                    dataSource.items = dataSource.data;
                }

                if (dataSource.items && $.isArray(dataSource.items)) {
                    var firstDataRowIndex = 0;

                    if (_dataMode() === $.ui.wijgrid.dataMode.remoteDynamical) {
                        firstDataRowIndex = 1;

                        if (dataSource.items.length < 1 || dataSource.items[0].length !== 1) {
                            throw "invalid data";
                        }

                        _remoteDataLength = parseInt(dataSource.items[0][0]);

                        if (isNaN(_remoteDataLength)) {
                            throw "invalid data";
                        }

                        // remove first item
                        dataSource.items.splice(0, 1);
                    }
                } else {
                    _remoteDataLength = 0;
                    dataSource.items = [];
                }
            }
        };

        var _domTableDataReader = function() {
            this.read = function(wijDataSource) {
                wijDataSource.items = [];

                if (wijDataSource && wijDataSource.data && wijDataSource.data.length) {
                    wijDataSource.items = _readTBodySection(wijDataSource.data);
                    wijDataSource.data = null;
                } else {
                    throw "invalid data source";
                }
            };

            function _readTBodySection($table) {
                var result = [];

                var $tBodies = $table.find("> tbody:first");
                if ($tBodies.length) {
                    var tBody = $tBodies[0];

                    for (var ri = 0, rowsLen = tBody.rows.length; ri < rowsLen; ri++) {
                        var row = tBody.rows[ri];
                        var rowData = [];

                        for (var ci = 0, cellsLen = row.cells.length; ci < cellsLen; ci++) {
                            rowData[ci] = row.cells[ci].innerHTML;
                        }

                        result[ri] = rowData;
                    }
                }

                return result;
            }
        }
    },

    dataHelper: function() {

        this.getDataSlice = function(gridView, dataCache, filterInfo, sortInfo) {
            // apply filtering
            dataCache = _applyFiltering(dataCache, filterInfo, gridView);

            // apply sorting
            if (gridView.options.allowSorting) {
                //_applySort(dataCache, sortInfo);
                $.proxy(_applySort, this)(dataCache, sortInfo);
            }

            //rowsCount = dataCache.length; // number of rows in the data source (before paging will be applied)

            // apply paging
            if (gridView.options.allowPaging) {
                var start = Math.min(dataCache.length - 1, gridView.options.pageIndex * gridView.options.pageSize);

                if (start < 0) {
                    start = 0;
                }

                var end = Math.min(dataCache.length, start + gridView.options.pageSize);

                var pagedData = [];
                for (var i = start, len = 0, j = 0; i < end; i++, j++) {
                    pagedData[j] = dataCache[i];
                }

                dataCache = pagedData;
            }

            return dataCache;
        };

        // filterInfo: [ {column, filterOperator} ]
        var _applyFiltering = function(data, filterInfo, gridView) {
            var dataLength;
            var filterLength;

            if (!data || (dataLength = data.length) === 0 ||
                !filterInfo || (filterLength = filterInfo.length) === 0) {

                return data;
            }

            // preformat filterValues
            var filterValues = {};
            for (var i = 0; i < filterLength; i++) {
                var fi = filterInfo[i];
                var operator = fi.operator;
                var column = fi.column;

                if (operator.arity > 1) {
                    filterValues[i] = gridView._parse(column, column.filterValue);
                }
            }

            var dataRes = [];

            for (var i = 0; i < dataLength; i++) {
                var dataRow = data[i];

                var flag = true;

                for (var j = 0; j < filterLength && flag; j++) {
                    var fi = filterInfo[j];

                    var dataVal = dataRow[fi.column.dataIndex].value;
                    flag &= fi.operator.operator(dataVal, filterValues[j]);
                }

                if (flag) {
                    dataRes.push($.extend(true, [], dataRow));
                }
            }

            return dataRes;
        }

        // sortinfo: array of { dataIndex, sortDirection } 
        var _applySort = function(data, sortInfo) {
            if (sortInfo.length) {
                var builder = [];

                builder.push("var _wijgriddatahelper = this;");
                builder.push("var _wijgridSortFunc = function(a, b)\n{\n");

                for (var i = 0, len = sortInfo.length; i < len; i++) {
                    var arg = "arg" + i;
                    var si = sortInfo[i];

                    var dataKey = (typeof (si.dataKey) === "string")
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

                var idx = sortInfo.length - 1;
                if (idx >= 0) { // sort identical values using originalRowIndex
                    var arg = "arg" + idx;
                    var si = sortInfo[idx];

                    var dataKey = (typeof (si.dataKey) === "string")
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

                for (var i = sortInfo.length - 1; i >= 0; i--) {
                    builder.push("}\n");
                    var arg = "arg" + i;
                    builder.push("return ", arg, ";\n");
                }

                builder.push("}"); // _wijgridSortFunc

                var expression = builder.join("");
                eval(expression);

                data.sort(_wijgridSortFunc);
            }
        };

        this._sortAsc = function(a, b) {
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

        this._sortDesc = function(a, b) {
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

        this._sortDigitAsc = function(a, b) {
            return a - b;
        };

        this._sortDigitDesc = function(a, b) {
            return b - a;
        }
    }
});
$.extend($.ui.wijgrid, {
    groupRange: function(expanded, range, sum, position) {
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
                this.cr = new $.ui.wijgrid.cellRange(-1, -1);
                this.sum = -1;
                this.position = "none";
                break;

            default:
                this.isExpanded = false;
                this.cr = new $.ui.wijgrid.cellRange(-1, -1);
                this.sum = -1;
                this.position = "none";
        }

        this.isSubRange = function(groupRange) {
            return ((this.cr.r1 >= groupRange.cr.r1) && (this.cr.r2 <= groupRange.cr.r2));
        },

        this.toString = function() {
            return this.cr.r1 + "-" + this.cr.r2;
        },

        this._getHeaderImageClass = function(expanded) {

            var groupInfo = this.owner;
            if (groupInfo) {
                return expanded
                    ? groupInfo.expandedImageClass || "ui-icon-minus"
                    : groupInfo.collapsedImageClass || "ui-icon-plus";
            }

            return null;
        },

        this.collapse = function() {
            var groupInfo;
            var column;
            var grid;

            if ((groupInfo = this.owner) && (column = groupInfo.owner) && (grid = column.owner)) {
                var groupHelper = new $.ui.wijgrid.groupHelper();
                var leaves = grid._field("leaves");

                if (groupHelper.isParentExpanded(leaves, this.cr, groupInfo.level)) {
                    if ((groupInfo.position !== "footer") && (groupInfo.outlineMode !== "none")) { // do not collapse groups with .position == "footer"
                        var groupedColumnsCnt = groupHelper.getGroupedColumnsCount(leaves);
                        /*var tbody = grid.$table.find("> tbody")[0];*/

                        _collapse(groupHelper, grid._rows() /*tbody*/, leaves, this, groupedColumnsCnt);
                    }
                }
            }
        },

        this.expand = function(expandChildren) {
            var groupInfo;
            var column;
            var grid;

            if ((groupInfo = this.owner) && (column = groupInfo.owner) && (grid = column.owner)) {
                var groupHelper = new $.ui.wijgrid.groupHelper();
                var leaves = grid._field("leaves");

                if (groupHelper.isParentExpanded(leaves, this.cr, groupInfo.level)) {
                    var groupedColumnsCnt = groupHelper.getGroupedColumnsCount(leaves);
                    /*var tbody = grid.$table.find("> tbody")[0];*/

                    _expand(groupHelper, grid._rows(), leaves, this, groupedColumnsCnt, expandChildren, true);
                }
            }
        };

        // private members

        var _collapse = function(groupHelper, /*tbody*/rowAccessor, leaves, groupRange, groupedColumnsCnt) {
            var groupInfo = groupRange.owner;

            var dataStart = groupRange.cr.r1;
            var dataEnd = groupRange.cr.r2;

            switch (groupInfo.position) {
                case "header":
                case "headerAndFooter":
                    dataStart++;
                    break;
            }

            // hide child rows
            for (var i = dataStart; i <= dataEnd; i++) {
                var rowObj = rowAccessor.item(i);
                if (rowObj) {
                    if (rowObj[0]) {
                        rowObj[0].style.display = "none";
                    }

                    if (rowObj[1]) {
                        rowObj[1].style.display = "none";
                    }
                }

                //tbody.rows[i].style.display = "none";
            }

            // update isExpanded property
            groupRange.isExpanded = false;
            _updateHeaderIcon(/*tbody*/rowAccessor, groupRange);

            for (var i = groupInfo.level + 1; i <= groupedColumnsCnt; i++) {
                var childRanges = groupHelper.getChildGroupRanges(leaves, groupRange.cr, groupRange.owner.level);
                for (var j = 0, len = childRanges.length; j < len; j++) {
                    var childRange = childRanges[j];
                    childRange.isExpanded = false;
                    _updateHeaderIcon(/*tbody*/rowAccessor, childRange);
                }
            }
        };

        var _expand = function(groupHelper, /*tbody*/rowAccessor, leaves, groupRange, groupedColumnsCnt,
            expandChildren, isRoot) {

            var groupInfo = groupRange.owner;

            var dataStart = groupRange.cr.r1;
            var dataEnd = groupRange.cr.r2;

            switch (groupInfo.position) {
                case "header":
                    /*tbody.rows[dataStart].style.display = "";*/
                    var rowObj = rowAccessor.item(dataStart);
                    if (rowObj) {
                        if (rowObj[0]) {
                            rowObj[0].style.display = "";
                        }

                        if (rowObj[1]) {
                            rowObj[1].style.display = "";
                        }
                    }
                    dataStart++;
                    break;
                case "footer":
                    /*tbody.rows[dataEnd].style.display = "";*/
                    var rowObj = rowAccessor.item(dataEnd);
                    if (rowObj) {
                        if (rowObj[0]) {
                            rowObj[0].style.display = "";
                        }

                        if (rowObj[1]) {
                            rowObj[1].style.display = "";
                        }
                    }
                    dataEnd--;
                    break;
                case "headerAndFooter":
                    /*tbody.rows[dataStart].style.display = "";*/
                    var rowObj = rowAccessor.item(dataStart);
                    if (rowObj) {
                        if (rowObj[0]) {
                            rowObj[0].style.display = "";
                        }

                        if (rowObj[1]) {
                            rowObj[1].style.display = "";
                        }
                    }
                    if (isRoot) {
                        /*tbody.rows[dataEnd].style.display = "";*/
                        var rowObj = rowAccessor.item(dataEnd);
                        if (rowObj) {
                            if (rowObj[0]) {
                                rowObj[0].style.display = "";
                            }

                            if (rowObj[1]) {
                                rowObj[1].style.display = "";
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
                for (var i = dataStart; i <= dataEnd; i++) {
                    /*tbody.rows[i].style.display = "";*/
                    var rowObj = rowAccessor.item(i);
                    if (rowObj) {
                        if (rowObj[0]) {
                            rowObj[0].style.display = "";
                        }

                        if (rowObj[1]) {
                            rowObj[1].style.display = "";
                        }
                    }

                }
            } else {
                var childRanges = groupHelper.getChildGroupRanges(leaves, groupRange.cr, groupRange.owner.level);

                if (expandChildren) { // throw action deeper
                    for (var i = 0, len = childRanges.length; i < len; i++) {
                        var childRange = childRanges[i];
                        _expand(groupHelper, /*tbody*/rowAccessor, leaves, childRange, groupedColumnsCnt, expandChildren, true);
                    }
                } else { // show only headers of the child groups or fully expand child groups with .position == "footer"\ .outlineMode == "none"
                    for (var i = 0, len = childRanges.length; i < len; i++) {
                        var childRange = childRanges[i];

                        var childIsRoot = (childRange.owner.position === "footer" || childRange.owner.outlineMode === "none")
                            ? true
                            : false;

                        _expand(groupHelper, /*tbody*/rowAccessor, leaves, childRange, groupedColumnsCnt, false, childIsRoot);
                    }
                }
            }
        };

        var _updateHeaderIcon = function(/*tbody*/rowAccessor, groupRange) {

            if (groupRange.owner.position !== "footer") {
                /*var imageDiv = $(tbody.rows[groupRange.cr.r1]).find("div.ui-wijgrid-grouptogglebtn:first-child");*/
                var imageDiv = null;
                var rowObj = rowAccessor.item(groupRange.cr.r1);
                if (rowObj) {
                    if (rowObj[0]) {
                        imageDiv = $(rowObj[0]).find("div.ui-wijgrid-grouptogglebtn:first-child");
                    }
                }

                if (imageDiv && imageDiv.length) {
                    imageDiv.toggleClass(groupRange._getHeaderImageClass(!groupRange.isExpanded), false);
                    imageDiv.toggleClass(groupRange._getHeaderImageClass(groupRange.isExpanded), true);
                }
            }
        }
    },

    grouper: function() {

        this.group = function(grid, data, leaves) {
            this._grid = grid;
            this._data = data;
            this._leaves = leaves;
            this._visibleLeaves = grid._field("visibleLeaves");
            this._groupRowIdx = 0;
            this._groupHelper = new $.ui.wijgrid.groupHelper();

            var level = 1;

            for (var i = 0, len = leaves.length; i < len; i++) {
                var leaf = leaves[i];
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
            delete this._visibleLeaves
        },

        this._processRowGroup = function(leaf, level) {
            for (var row = 0; row < this._data.length; row++) {
                if (this._data[row].rowType !== "data") {
                    continue;
                }

                var cellRange = this._getGroupCellRange(row, leaf, level);
                var isExpanded = true;
                var startCollapsed = (leaf.groupInfo.outlineMode === "startCollapsed");

                if (startCollapsed || this._groupHelper.isParentCollapsed(this._leaves, cellRange, level)) {
                    if ((leaf.groupInfo.groupSingleRow === false) && (cellRange.r1 == cellRange.r2)) {
                        continue;
                    }
                    isExpanded = false;
                }

                // indent
                if (level && this._grid.options.groupIndent) {
                    for (var indentRow = cellRange.r1; indentRow <= cellRange.r2; indentRow++) {
                        this._addIndent(this._data[indentRow][0], level);
                    }
                }

                // insert group header/ group footer
                switch (leaf.groupInfo.position) {
                    case "header":
                        var groupRange = this._addGroupRange(leaf.groupInfo, cellRange, isExpanded);
                        this._updateByGroupRange(groupRange, level);

                        var isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);
                        var header = this._buildGroupRow(groupRange, cellRange, true, isParentCollapsed);

                        if (!isExpanded) {
                            for (var i = cellRange.r1; i <= cellRange.r2; i++) {
                                this._data[i].display = "none";
                            }
                        }

                        this._data.splice(cellRange.r1, 0, header); // insert group header
                        if (isParentCollapsed) {
                            header.display = "none";
                        }

                        row = cellRange.r2 + 1;
                        break;

                    case "footer":
                        var groupRange = this._addGroupRange(leaf.groupInfo, cellRange, true);
                        this._updateByGroupRange(groupRange, level);

                        var footer = this._buildGroupRow(groupRange, cellRange, false, false);
                        this._data.splice(cellRange.r2 + 1, 0, footer);
                        row = cellRange.r2 + 1;

                        var isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);
                        if (isParentCollapsed) {
                            footer.display = "none";
                        }

                        break;

                    case "headerAndFooter":
                        var groupRange = this._addGroupRange(leaf.groupInfo, cellRange, isExpanded);
                        this._updateByGroupRange(groupRange, level);

                        var isParentCollapsed = this._groupHelper.isParentCollapsed(this._leaves, groupRange.cr, level);

                        var header = this._buildGroupRow(groupRange, cellRange, true, isParentCollapsed);
                        var footer = this._buildGroupRow(groupRange, cellRange, false, false);

                        if (!isExpanded) {
                            for (var i = cellRange.r1; i <= cellRange.r2; i++) {
                                this._data[i].display = "none";
                            }
                        }

                        this._data.splice(cellRange.r2 + 1, 0, footer);
                        if (isParentCollapsed || !isExpanded) {
                            footer.display = "none";
                        }

                        this._data.splice(cellRange.r1, 0, header);
                        if (isParentCollapsed) {
                            header.display = "none";
                        }

                        row = cellRange.r2 + 2;
                        break;

                    default:
                        throw $.ui.wijgrid.stringFormat("Unknown Position value: \"{0}\"", leaf.groupInfo.position);
                }

                this._groupRowIdx++;
            }
        },

        this._buildGroupRow = function(groupRange, cellRange, isHeader, isParentCollapsed) {
            var groupInfo = groupRange.owner;
            var leaf = groupInfo.owner;
            var gridView = leaf.owner;

            var row = [];

            row.id = ((isHeader) ? "GH" : "GF") + this._groupRowIdx + "-" + groupInfo.level;

            row.rowType = (isHeader)
                ? "groupHeader"
                : "groupFooter";

            var groupByText = "";
            var tmp;
            //if (cellRange.c1 > -1 && ((tmp = this._data[cellRange.r1][cellRange.c1].value) !== null)) {
            if ((leaf.dataIndex >= 0) && ((tmp = this._data[cellRange.r1][leaf.dataIndex].value) !== null)) {
                groupByText = gridView._toStr(leaf, tmp);
            }

            if (this._grid.options.showRowHeader) {
                row.push({ html: "&nbsp;" });
            }

            // create the summary cell
            var cell = { html: "" };
            if (isHeader && groupInfo.outlineMode !== "none") {
                if (groupRange.isExpanded) {
                    cell.html = "<div class=\"ui-icon " + groupRange._getHeaderImageClass(true) +
                        " ui-wijgrid-grouptogglebtn\">&nbsp;</div>";
                }
                else {
                    cell.html = "<div class=\"ui-icon " + groupRange._getHeaderImageClass(false) +
                        " ui-wijgrid-grouptogglebtn\">&nbsp;</div>";
                }
            }

            row.push(cell);

            // add group header text
            var headerOffset = 0;
            /*var leaf = (cellRange.c1 >= 0)
            ? this._leaves[cellRange.c1]
            : null;*/

            var aggregate = "";
            if (leaf.aggregate && (leaf.aggregate !== "none")) {
                //aggregate = this._getAggregate(cellRange, leaf, groupInfo.owner, isHeader, groupByText);
                aggregate = this._getAggregate(cellRange, leaf, leaf, isHeader, groupByText);

                if (leaf.parentVis) {
                    headerOffset = 1;
                }
            }

            var caption = (isHeader)
                ? groupInfo.headerText
                : groupInfo.footerText;

            // format caption

            // The text may include up to three placeholders:
            // "{0}" is replaced with the value being grouped on and
            // "{1}" is replaced with the group's column header            
            // "{2}" is replaced with the aggregate
            if (caption === "custom") {
                var args = {
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

                caption = $.ui.wijgrid.stringFormat(caption, groupByText,
                    leaf && leaf.headerText ? leaf.headerText : "",
                    aggregate.toString());
            }

            if (!caption) {
                caption = "&nbsp;";
            }

            cell.html += "<span>" + caption + "</span>";
            this._addIndent(cell, groupInfo.level - 1);

            // summary cells span until the end of the row or the first aggregate
            var span = headerOffset;
            var col = (this._grid.options.showRowHeader)
                ? 1
                : 0;

            for (; col < cellRange.c1; col++) { // c1 is an index of the leaf inside the this._leaves
                if (this._leaves[col].parentVis) {
                    span++;
                }
            }

            col = cellRange.c1 + headerOffset;
            for (; col < this._leaves.length; col++) {
                var leaf = this._leaves[col];
                if ((leaf.dynamic !== true) && leaf.aggregate && (leaf.aggregate !== "none")) {
                    break;
                }

                if (leaf.parentVis) {
                    span++;
                }
            }

            // add aggregates (or blanks) until the end of the row
            for (; col < this._leaves.length; col++) {
                var leaf = this._leaves[col];
                if (leaf.parentVis) {
                    var agg = this._getAggregate(cellRange, leaf, groupInfo.owner, isHeader, groupByText);
                    if (!agg && (agg !== 0)) {
                        agg = "&nbsp;";
                    }
                    row.push({ html: agg.toString() });
                }
            }

            cell.colSpan = span;

            return row;
        },

        this._getAggregate = function(cellRange, column, groupByColumn, isGroupHeader, groupByText) {
            var aggregate = "";

            if (!column.parentVis || !column.aggregate || (column.aggregate === "none")) {
                return aggregate;
            }

            if (column.aggregate === "custom") {
                var args = {
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
                var tally = new this._tally();

                for (var row = cellRange.r1; row <= cellRange.r2; row++) {
                    tally.add(this._data[row][column.dataIndex].value);
                }

                aggregate = tally.getValueString(column);
            }

            return aggregate;
        },

        this._getGroupCellRange = function(row, leaf, level) {
            //var range = new $.ui.wijgrid.cellRange(row, leaf.dataIndex);
            var idx = leaf.leavesIdx; // $.inArray(leaf, this._leaves);
            var range = new $.ui.wijgrid.cellRange(row, idx);

            var parentRange = this._groupHelper.getParentGroupRange(this._leaves, range, level);

            if (this._data[row].rowType === "data") {
                var str = this._data[row][leaf.dataIndex].value;

                var count = 0;
                for (range.r2 = row, count = this._data.length - 1; range.r2 < count; range.r2++) {
                    if ((this._data[range.r2 + 1].rowType !== "data") || (parentRange && (range.r2 + 1 > parentRange.r2))) {
                        break;
                    }

                    if (this._data[range.r2 + 1][leaf.dataIndex].value !== str) {
                        break;
                    }
                }
            }

            return range;
        },

        this._addGroupRange = function(groupInfo, cellRange, isExpanded) {
            var result = null;

            var idx = this._groupHelper.getChildGroupIndex(cellRange, groupInfo.expandInfo);
            if (idx >= 0 && idx < groupInfo.expandInfo.length) {
                result = groupInfo.expandInfo[idx];
            } else {
                var range = new $.ui.wijgrid.cellRange(cellRange.r1, cellRange.r1, cellRange.r2, cellRange.r2); // clone

                var expandState = (groupInfo.position === "footer")
                    ? true
                    : isExpanded && (groupInfo.outlineMode !== "startCollapsed");

                result = new $.ui.wijgrid.groupRange(expandState, range, -1, groupInfo.position);

                result.owner = groupInfo;

                groupInfo.expandInfo.push(result);
            }

            if (result) {
                var r1 = cellRange.r1;
                var r2 = cellRange.r2;

                if (groupInfo.position === "headerAndFooter") {
                    r2 += 2;
                }

                if (groupInfo.position !== "headerAndFooter") {
                    r2++;
                }

                result.cr.r2 = r2;
            }

            return result;
        },

        this._updateByGroupRange = function(groupRange, level) {
            for (var i = 0, len = this._leaves.length; i < len; i++) {
                var groupInfo = this._leaves[i].groupInfo;

                //
                // if (groupInfo) {
                //

                if (groupInfo && (groupInfo.level < level)) {

                    var len2 = (groupInfo.expandInfo)
                        ? groupInfo.expandInfo.length
                        : 0;

                    for (var j = 0; j < len2; j++) {
                        var cur = groupInfo.expandInfo[j];
                        //
                        //if (cur.cr.r1 !== groupRange.cr.r1) {
                        //
                        var delta = (groupRange.position === "headerAndFooter") ? 2 : 1;

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
        },

        this._addIndent = function(cellObj, level) {
            var indent;
            if (level > 0 && (indent = this._grid.options.groupIndent)) {
                cellObj.paddingLeft = (indent * level) + "px";
            }
        },

        this._tally = function() {
            this._sum = 0;
            this._sum2 = 0;
            this._cntNumbers = 0;
            this._cntStrings = 0;
            this._max = 0;
            this._min = 0;
            this._minString = undefined;
            this._maxString = undefined;

            this.add = function(value) {
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
            },

            this.getValueString = function(column) {
                if (this._cntNumbers) {
                    var value = this._getValue(column.aggregate);
                    var gridView = column.owner;
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
            },

            this._getValue = function(aggregate) {
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
            },

            // strings only
            this._parseValue = function(value) {
                var percent = false;
                var len = value.length;
                if ((len > 0) && (value.indexOf("%") === len - 1)) {
                    percent = true;
                    value = value.substr(0, len - 1);
                }

                var val = parseFloat(value);
                if (isNaN(val)) {
                    return NaN;
                }

                return (percent)
                        ? val / 100 // "12%" -> 0.12f
                        : val;
            }
        }
    }
});

$.extend($.ui.wijgrid, {
    groupHelper: function() {

        this.getGroupInfo = function(domRow) {

            if (domRow) {
                if (!$.ui.wijgrid._getGroupInfoRegExp) {
                    $.ui.wijgrid._getGroupInfoRegExp = new RegExp(".*G([HF]){1}(\\d+)-(\\d+)$");
                }

                var info = $.ui.wijgrid._getGroupInfoRegExp.exec(domRow.id);
                if (info) {
                    var level = parseInt(info[3]);
                    var index = parseInt(info[2]);
                    var isHeader = info[1] === "H";

                    return {
                        level: level,
                        index: index,
                        isHeader: isHeader,
                        toString: function() {
                            return (this.isHeader ? "GH" : "GF") + this.index + "-" + this.level;
                        }
                    }
                }
            }

            return null;
        },

        this.getColumnByGroupLevel = function(leaves, level) {

            for (var i = 0, len = leaves.length; i < len; i++) {
                var leaf = leaves[i];
                if (leaf.groupInfo && (leaf.groupInfo.level === level)) {
                    return leaf;
                }
            }

            return null;
        },

        this.getGroupedColumnsCount = function(leaves) {
            var result = 0;

            for (var i = 0, len = leaves.length; i < len; i++) {
                var groupInfo = leaves[i].groupInfo;
                if (groupInfo && (groupInfo.position !== "none")) {
                    result++;
                }
            }

            return result;
        }

        // cellRange cellRange
        // groupRange[] childExpandInfo
        this.getChildGroupIndex = function(cellRange, childExpandInfo) {

            var left = 0;
            var right = childExpandInfo.length - 1;

            while (left <= right) {
                var median = ((right - left) >> 1) + left;
                var cmp = childExpandInfo[median].cr.r1 - cellRange.r1;

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
        },

        // cellRange childRange
        // groupRange[] parentExpandInfo
        this.getParentGroupIndex = function(cellRange, parentExpandInfo) {

            var idx = this.getChildGroupIndex(cellRange, parentExpandInfo);
            if (idx > 0) {
                idx--;
            }

            return (idx < parentExpandInfo.length)
                ? idx
                : -1;
        },

        // level: 1-based level of the cellRange;
        this.getChildGroupRanges = function(leaves, cellRange, level) {
            var result = [];

            var childGroupedColumn = this.getColumnByGroupLevel(leaves, level + 1);
            if (childGroupedColumn) {
                var childRanges = childGroupedColumn.groupInfo.expandInfo;

                var firstChildIdx = this.getChildGroupIndex(cellRange, childRanges);
                for (var i = firstChildIdx, len = childRanges.length; i < len; i++) {
                    var childRange = childRanges[i];
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
        },

        // level: 1-based level of the cellRange; optional.
        this.getParentGroupRange = function(leaves, cellRange, level) {

            if (level === undefined) {
                level = 0xFFFF;
            }

            if (level - 2 >= 0) {
                for (var i = leaves.length - 1; i >= 0; i--) {
                    var groupInfo = leaves[i].groupInfo;
                    if (!groupInfo || !groupInfo.expandInfo || (groupInfo.level < 0) || (groupInfo.level >= level)) {
                        continue;
                    }

                    var idx = this.getParentGroupIndex(cellRange, groupInfo.expandInfo);
                    if (idx >= 0) {
                        return groupInfo.expandInfo[idx];
                    }
                }
            }

            return null;
        },

        // level: 1-based level of the cellRange.
        this.isParentCollapsed = function(leaves, cellRange, level) {

            if (level === 1) {
                return false;
            }

            for (var i = level; i > 1; i--) {
                var parentGroupRange = this.getParentGroupRange(leaves, cellRange, i);

                if (parentGroupRange && !parentGroupRange.isExpanded) {
                    return true;
                }

                cellRange = parentGroupRange.cr;
            }

            return false;
        },

        // level: 1-based level of the cellRange.
        this.isParentExpanded = function(leaves, cellRange, level) {

            if (level === 1) {
                return true;
            }

            for (var i = level; i > 1; i--) {
                var parentGroupRange = this.getParentGroupRange(leaves, cellRange, i);

                if (parentGroupRange && parentGroupRange.isExpanded) {
                    return true;
                }

                cellRange = parentGroupRange.cr;
            }

            return false;
        }
    }
});$.extend($.ui.wijgrid, {
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
        }
    },

    merger: function () {
        this.merge = function (data, visibleLeaves) {
            this.leaves = visibleLeaves;
            this.data = data;

            for (var i = 0, len = visibleLeaves.length; i < len; i++) {
                var leaf = visibleLeaves[i];

                if ((leaf.dataIndex >= 0) && !leaf.isBand && (leaf.rowMerge === "free" || leaf.rowMerge === "restricted")) {
                    this.mergeColumn(leaf);
                }
            }
            delete this.data;
            delete this.leaves;
        }

        this.mergeColumn = function (column) {
            var dataIdx = column.dataIndex;

            for (var i = 0, len = this.data.length; i < len; i++) {
                if (this.data[i].rowType !== "data") {
                    continue;
                }

                var range = this.getCellRange(i, column);

                if (range.r1 !== range.r2) {
                    var span = range.r2 - range.r1 + 1;
                    this.data[range.r1][dataIdx].rowSpan = span;

                    for (var spannedRow = range.r1 + 1; spannedRow <= range.r2; spannedRow++) {
                        //this.data[spannedRow][dataIdx] = null;
                        this.data[spannedRow][dataIdx].visible = false;
                    }
                }

                i = range.r2;
            }
        }

        this.getCellRange = function (rowIdx, column) {
            var columnIdx = column.dataIndex;
            var range = new $.ui.wijgrid.cellRange(rowIdx, columnIdx);

            var str = this.data[rowIdx][columnIdx].value;
            var dataLen = this.data.length;

            for (range.r2 = rowIdx; range.r2 < dataLen - 1; range.r2++) {
                var dataItem = this.data[range.r2 + 1];

                if ((dataItem.rowType !== "data") || (dataItem[columnIdx].value !== str)) {
                    break;
                }
            }

            var leafIdx = column.leavesIdx; // $.inArray(column, this.leaves);
            if (leafIdx > 0 && column.rowMerge === "restricted") {
                var prevLeaf = this.leaves[leafIdx - 1];
                if (prevLeaf.dataIndex >= 0) {
                    var range2 = this.getCellRange(rowIdx, prevLeaf);

                    range.r1 = Math.max(range.r1, range2.r1);
                    range.r2 = Math.min(range.r2, range2.r2);
                }
            }

            return range;
        }
    }
});


$.extend($.ui.wijgrid, {
    stringFormat: function(value, params) {
        if (!value) {
            return "";
        }

        for (var i = 1, len = arguments.length; i < len; i++) {
            value = value.replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
        }

        return value;
    },

    validDataKey: function(dataKey) {
        return (dataKey !== undefined && !(dataKey < 0));
    },

    iterateChildrenWidgets: function(item, callback) {
        if (item && callback) {
            if (item.nodeType) {
                item = $(item);
            }

            item.find(".ui-widget").each(function(domIndex, domValue) {
                $.each($(domValue).data(), function(dataKey, dataValue) {
                    if (dataValue.widgetName && dataKey !== "owner") {
                        callback(domIndex, dataValue);
                    }
                });
            });
        }
    },

    domSelection: function(input) {
        this.getSelection = function() {
            var start = 0;
            var end = 0;

            if (input.selectionStart) { // DOM3
                start = input.selectionStart;
                end = input.selectionEnd;
            } else {
                if (document.selection) { // IE
                    var textRange = document.selection.createRange().duplicate();
                    end = textRange.text.length; // selection length
                    start = Math.abs(textRange.moveStart("character", -input.value.length)); // move selection to the beginning
                    end += start;
                }
            }

            return { start: start, end: end, length: end - start };
        };

        this.setSelection = function(range) {
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

    bounds: function(element, client) {
        if (element) {
            var $dom = element.nodeType
                ? $(element)
                : element;

            var offset = $dom.offset();
            if (offset) {
                if (client) {
                    return { top: offset.top, left: offset.left, width: $dom[0].clientWidth || 0, height: $dom[0].clientHeight || 0 };
                }

                return { top: offset.top, left: offset.left, width: $dom.outerWidth(), height: $dom.outerHeight() };
            }
        }

        return null;
    },

    _getDOMText: function(domElement, controlDepth, depth) {
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

                var result = "";
                for (var i = 0; domElement.childNodes[i]; i++) {
                    result += this._getDOMText(domElement.childNodes[i], controlDepth, depth + 1);
                }
                return result;
            }
        }

        return "";
    }
});

$.extend($.ui.wijgrid, {
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

            for (name in src) {
                var value = src[name]
                var typeOf = typeof (value);

                if ((typeOf === "string" || typeOf === "boolean" || typeOf == "number") && (target[name] === undefined)) {
                    target[name] = value;
                }
            }
        }
    }
});var wijgridStringParser = {
    // DOM -> string
    parseDOM: function (value, culture, format, nullString) {
        return this.parse($.ui.wijgrid._getDOMText(value, true), culture, format, nullString);
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
        return this.parse($.ui.wijgrid._getDOMText(value, true), culture, format, nullString);
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
        return this.parse($.ui.wijgrid._getDOMText(value, true), culture, format, nullString);
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
}

var wijgridDateTimeParser = {
    // DOM -> datetime
    parseDOM: function (value, culture, format, nullString) {
        return this.parse($.ui.wijgrid._getDOMText(value, true), culture, format, nullString);
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
    parseDOM: function(value, culture, format, nullString) {
        return this.parse($.ui.wijgrid._getDOMText(value, true), culture, format, nullString);
    },

    // string\ bool -> bool
    parse: function(value, culture, format, nullString) {
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
    toStr: function(value, culture, format, nullString) {
        if (value === null) {
            return nullString;
        }

        return (value) ? "true" : "false";
    }
};$.extend($.ui.wijgrid, {
    filterOperatorsCache: function () {
        var _cache = {};

        this.add = function (operator) {
            if (operator && operator.name && operator.operator) {
                var name = operator.name.toLowerCase();
                if (!_cache[name]) {
                    _cache[name] = operator;
                }
            }
        },

        this.clear = function () {
            _cache.length = 0;
        },

        this.getByName = function (name) {
            return _cache[name.toLowerCase()];
        },

        this.getByDataType = function (dataType) {
            var result = [];

            for (var name in _cache) {
                var operator = _cache[name];

                if ($.inArray(dataType, operator.applicableTo) >= 0) {
                    result.push(operator);
                }
            }

            return result;
        },

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
                default:
                    break;
            }

            return filtersArray;
        };

        function sortAlpha(a, b) {
            var n1 = a.name.toLowerCase();
            var n2 = b.name.toLowerCase();

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
        };

        function sortAlphaEmbeddedFirst(a, b) {
            var n1 = a.name.toLowerCase();
            var n2 = b.name.toLowerCase();

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
        };

        function sortAlphaCustomFirst(a, b) {
            var n1 = a.name.toLowerCase();
            var n2 = b.name.toLowerCase();

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
        };
    }
});

$.ui.wijgrid.embeddedFilters = [
  {
      name: "NoFilter",
      arity: 1,
      applicableTo: ["string", "number", "datetime", "currency", "boolean"],
      operator: function(dataVal) {
          return true;
      }
  },
  {
      name: "Contains",
      arity: 2,
      applicableTo: ["string"],
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal, filterVal) {
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
      operator: function(dataVal) {
          return !dataVal && dataVal !== 0 && dataVal !== false;
      }
  },
  {
      name: "NotIsEmpty",
      arity: 1,
      applicableTo: ["string"],
      operator: function(dataVal) {
          return !!dataVal || dataVal === 0 || dataVal === false;
      }
  },
  {
      name: "IsNull",
      arity: 1,
      applicableTo: ["string", "number", "datetime", "currency", "boolean"],
      operator: function(dataVal) {
          return dataVal === null;
      }
  },
  {
      name: "NotIsNull",
      arity: 1,
      applicableTo: ["string", "number", "datetime", "currency", "boolean"],
      operator: function(dataVal) {
          return dataVal !== null;
      }
  }
];$.extend($.ui.wijgrid, {
    htmlTableAccessor: function (domTable) {
        var offsets = [];
        var width = 0;
        var table = domTable;

        _buildOffsets();

        function _buildOffsets() {
            var rowSpan = [];

            for (var i = 0, rowLen = table.rows.length; i < rowLen; i++) {
                var rowOffsets = [];
                offsets[i] = rowOffsets;

                var row = table.rows[i];
                for (var j = 0, jOffset = 0, celLen = row.cells.length; j < celLen; j++, jOffset++) {

                    var cell = row.cells[j];

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
                    var cs = cell.colSpan;
                    for (; cs > 1; cs--) {
                        rowOffsets[++jOffset] = { cellIdx: -1, colIdx: -1 };
                    }
                }

                var rowSpanLen = rowSpan.length
                for (; jOffset < rowSpanLen; jOffset++) {
                    rowSpan[jOffset]--;
                    rowOffsets[jOffset] = { cellIdx: -1, colIdx: -1 };
                }

                width = Math.max(width, rowSpanLen);
            }
        }

        this.element = function () {
            return domTable;
        }

        this.getCellIdx = function (colIdx, rowIdx) {
            return (colIdx < width)
                ? offsets[rowIdx][colIdx].cellIdx
                : -1;
        }

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
        }

        // scope:
        // 1 - tHead
        // 2 - tBody
        // 3 - tFoot
        // otherwise - table
        this.getSectionLength = function (scope) {
            var tableSection = table;

            switch (scope) {
                case 1:
                    tableSection = table.tHead;
                    break;

                case 2:
                    var tBodies;
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
        }

        // scope:
        // 1 - tHead
        // 2 - tBody
        // 3 - tFoot
        // otherwise - table
        this.getSectionRow = function (rowIndex, scope) {
            var tableSection = table;

            switch (scope) {
                case 1:
                    tableSection = table.tHead;
                    break;

                case 2:
                    var tBodies;
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
        }

        // iterates through the table rows using natural cells order
        this.forEachColumnCellNatural = function (columnIdx, callback, param) {
            for (var i = 0, rowLen = table.rows.length; i < rowLen; i++) {
                var row = table.rows[i];

                if (columnIdx < row.cells.length) {
                    var result = callback(row.cells[columnIdx], columnIdx, param);
                    if (result !== true) {
                        return result;
                    }
                }
            }

            return true;
        }

        // iterates through the table rows using colSpan\rowSpan offsets
        this.forEachColumnCell = function (columnIdx, callback, param) {
            for (var i = 0, rowLen = offsets.length; i < rowLen; i++) {
                var row = table.rows[i];

                var offsetCellIdx = this.getCellIdx(columnIdx, i);
                if (offsetCellIdx >= 0) {
                    var result = callback(row.cells[offsetCellIdx], i, param);
                    if (result !== true) {
                        return result;
                    }
                }
            }

            return true;
        }

        // iterates throw the cells of a table row
        this.forEachRowCell = function (rowIndex, callback, param) {
            var row = table.rows[rowIndex];

            for (var i = 0, celLen = row.cells.length; i < celLen; i++) {
                var result = callback(row.cells[i], i, param);
                if (result !== true) {
                    return result;
                }
            }

            return true;
        }

        /*dma>*/
        this.colGroupTag = function () {
            var cgs = table.getElementsByTagName("colgroup");
            return (cgs != null && cgs.length > 0) ? cgs[0] : null;
        }
        this.colTags = function () {
            var colGroup = this.colGroupTag();
            return (colGroup != null) ? colGroup.getElementsByTagName("col") : [];

        }
        /*<dma*/

    }
});$.ui.wijgrid.cellInfo = function (cellIndex, rowIndex) {
    /// <summary>
    /// Object that represents a single cell.
    /// Code example: var cell = new $.ui.wijgrid.cellInfo(0, 0);
    /// </summary>
    /// <param name="cellIndex">Zero-based index of the required cell inside the corresponding row.</param>
    /// <param name="rowIndex">Zero-based index of the row that contains required cell.</param>
    /// <returns type="$.ui.wijgrid.cellInfo">Object that represents a single cell.</returns>

    var _isEdit = false;
    var _gridView = null;

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
        /// <param name="value" type="$.ui.wijgrid.cellInfo">Object to compare</param>
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

    this.value = function () {
        /// <summary>
        /// Gets cell data.
        /// Code example: var value = cellInfoObj.value();
        /// </summary>
        /// <returns type="Object" />
        if (_gridView && this._isValid()) {
            return _gridView.dataTable[rowIndex][cellIndex].value;
        }

        return undefined;
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
        var flag = false;
        var val;

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
        return new $.ui.wijgrid.cellInfo(cellIndex, rowIndex);
    };

    this._column = function () {
        if (_gridView && this._isValid()) {
            var offset = _gridView._getDataToAbsOffset();
            return _gridView._field("visibleLeaves")[cellIndex + offset.x];
        }

        return null;
    };

    this._row = function () {
        if (_gridView && this._isValid()) {
            return _gridView._rows().item(rowIndex);
        };

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

$.ui.wijgrid.cellInfo.prototype.outsideValue = new $.ui.wijgrid.cellInfo(-1, -1);

$.ui.wijgrid.cellInfoRange = function (topLeft, bottomRight) {
    /// <summary>
    /// Specifies a range of cells determined by two cells.
    /// Code example: var range = $.ui.wijgrid.cellInfoRange(new $.ui.wijgrid.cellInfo(0, 0), new $.ui.wijgrid.cellInfo(0, 0));
    /// </summary>
    /// <param name="topLeft" type="$.ui.wijgrid.cellInfo">Object that represents the top left cell of the range.</param>
    /// <param name="bottomRight" type="$.ui.wijgrid.cellInfo">Object that represents the bottom right cell of the range.</param>
    /// <returns type="$.ui.wijgrid.cellInfoRange"></returns>

    if (!topLeft || !bottomRight) {
        throw "invalid arguments";
    }

    var _topLeft = topLeft._clone();
    var _bottomRight = bottomRight._clone();

    // public 

    this.bottomRight = function () {
        /// <summary>
        /// Gets the object that represents the bottom right cell of the range.
        /// Code example: var cellInfoObj = range.bottomRight();
        /// <summary>
        /// <returns type="$.ui.wijgrid.cellInfo" />
        return _bottomRight;
    };

    this.isEqual = function (range) {
        /// <summary>
        /// Compares the current range with a specified range and indicates whether they are identical.
        /// Code example: var isEqual = range1.isEqual(range2);
        /// <summary>
        /// <param name="range" type="$.ui.wijgrid.cellInfoRange">Range to compare.</param>
        /// <returns type="Boolean">True if the ranges are identical, otherwise false.</returns>
        return (range && _topLeft.isEqual(range.topLeft()) && _bottomRight.isEqual(range.bottomRight()));
    };

    this.topLeft = function() {
        /// <summary>
        /// Gets the object that represents the top left cell of the range.
        /// Code example: var cellInfoObj = range.topLeft();
        /// <summary>
        /// <returns type="$.ui.wijgrid.cellInfo" />
        return _topLeft;
    }; 

    this.toString = function () {
        return _topLeft.toString() + " - " + _bottomRight.toString();
    };

    // public *

    // internal
    this._isIntersect = function (range) {
        if (range) {
            var rangeH = range.bottomRight().rowIndex() - range.topLeft().rowIndex() + 1;
            var thisH = _bottomRight.rowIndex() - _topLeft.rowIndex() + 1;

            if ((range.topLeft().rowIndex() + rangeH) - _topLeft.rowIndex() < rangeH + thisH) {
                var rangeW = range.bottomRight().cellIndex() - range.topLeft().cellIndex() + 1;
                var thisW = _bottomRight.cellIndex() - _topLeft.cellIndex() + 1;

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
        return new $.ui.wijgrid.cellInfoRange(_topLeft._clone(), _bottomRight._clone());
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
        } else
            if (mode === 2) {
                _topLeft.cellIndex(borders.topLeft().cellIndex());
                _bottomRight.cellIndex(borders.bottomRight().cellIndex());
            }

        return this;
    };

    this._normalize = function () {
        var x0 = _topLeft.cellIndex();
        var y0 = _topLeft.rowIndex();

        var x1 = _bottomRight.cellIndex();
        var y1 = _bottomRight.rowIndex();

        _topLeft.cellIndex(Math.min(x0, x1));
        _topLeft.rowIndex(Math.min(y0, y1));

        _bottomRight.cellIndex(Math.max(x0, x1));
        _bottomRight.rowIndex(Math.max(y0, y1));
    };

    // internal *
};$.extend($.ui.wijgrid, {
    flatView: function(gridView) {
        var _dataTable = null;
        var _contentArea = null;

        this.element = gridView.element;

        this.initialize = function() {
            _dataTable = null;
            _contentArea = null;
            this._createLayout();
        };

        this._createLayout = function() {
            var o = gridView.options;
            /*
            // following throws js exception sometimes:
            this.element.find(".ui-wijgrid-flatview").remove();
            this.element.find(".ui-wijgrid-fixedview").remove();*/
            var elemToRemove = this.element.find(".ui-wijgrid-flatview")[0];
            if (elemToRemove != null) {
                elemToRemove.parentNode.removeChild(elemToRemove);
            }

            elemToRemove = this.element.find(".ui-wijgrid-fixedview")[0];
            if (elemToRemove != null) {
                elemToRemove.parentNode.removeChild(elemToRemove);
            }

            if (o.scrollMode !== "none") {
                this.element.wrapInner("<div class=\"ui-wijgrid-fixedview\"><div class=\"ui-wijgrid-split-area ui-wijgrid-split-area-se ui-wijgrid-content-area\"></div></div>");
            }

            //var splitSE = this.element.find(".ui-wijgrid-split-area-se");
            /*
            // no split for the moment
            splitSE.after('<div class="ui-wijgrid-split-area ui-wijgrid-split-area-nw" style="overflow:hidden;position:absolute;top:0px;left:0px;background-color:' + backgroundcolor + ';"></div>');
            var splitNW = this.element.find(".ui-wijgrid-split-area-nw");
            splitSE.after('<div class="ui-wijgrid-split-area ui-wijgrid-split-area-ne" style="overflow:hidden;overflow-y:auto;position:absolute;top:0px;left:0px;background-color:' + backgroundcolor + ';"></div>');
            var splitNE = this.element.find(".ui-wijgrid-split-area-ne");
            splitSE.after('<div class="ui-wijgrid-split-area ui-wijgrid-split-area-sw" style="overflow:hidden;overflow-x:auto;position:absolute;top:0px;left:0px;background-color:' + backgroundcolor + ';"></div>');
            var splitSW = this.element.find(".ui-wijgrid-split-area-sw");

            if ($.ui.draggable != null) {
            splitSE.before('<div class="ui-wijgrid-splitter ui-wijgrid-v-splitter" style="z-index:10;"></div>');
            splitSE.before('<div class="ui-wijgrid-splitter ui-wijgrid-h-splitter" style="z-index:10;"></div>');

            this.element.find(".ui-wijgrid-v-splitter").draggable({ axis: 'x', containment: 'parent', stack: ".ui-wijgrid-splitter", stop: jQuery.proxy(function (event, ui) {
            this.element.wijgrid("option", "splitDistanceX", this.element.find(".ui-wijgrid-v-splitter")[0].offsetLeft);
            }, this)
            });
            opacity: 0.35,
            //opacity: 0.35,
            this.element.find(".ui-wijgrid-h-splitter").draggable({ axis: 'y', containment: 'parent', stack: ".ui-wijgrid-splitter", stop: jQuery.proxy(function (event, ui) {
            this.element.wijgrid("option", "splitDistanceY", this.element.find(".ui-wijgrid-h-splitter")[0].offsetTop);
            }, this)
            });
            }


            if(o.splits) {
            //  create  all  superpanels  only  when  splits mode is enabled.
            splitNW.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            splitNE.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            splitSW.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            }
            */
            //splitSE.wijsuperpanel({ allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });

            //            splitNW.scroll(jQuery.proxy(this._onSplitContentScrollNW, this));
            //            splitNE.scroll(jQuery.proxy(this._onSplitContentScrollNE, this));
            //            splitSW.scroll(jQuery.proxy(this._onSplitContentScrollSW, this));
            //            splitSE.scroll(jQuery.proxy(this._onSplitContentScrollSE, this));
            //};

            /*
            splitNW.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            splitNE.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            splitSW.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            splitSE.wijsuperpanel({ autoRefresh: true, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });

            splitNW.scroll(jQuery.proxy(this._onSplitContentScrollNW, this));
            splitNE.scroll(jQuery.proxy(this._onSplitContentScrollNE, this));
            splitSW.scroll(jQuery.proxy(this._onSplitContentScrollSW, this));
            splitSE.scroll(jQuery.proxy(this._onSplitContentScrollSE, this));
            */
        };

        this.updateSplits = function() {

            var self = this;
            var panelModes = self._getMappedScrollMode();
            var splitSE = this.element.find(".ui-wijgrid-content-area");
            splitSE.width(this.element.width()).height(this.element.height());

            if (panelModes.hScrollBarVisibility === "visible" || panelModes.hScrollBarVisibility === "auto") {
                var cols = _dataTable.colTags();
                var tableEle = $(_dataTable.element());
                tableEle.css("tableLayout", "");

                // ensure col width.
                $.each(cols, function(index, col) {
                    if (col.width === "") {
                        var th = self.getHeaderCell(index);
                        if (th) {
                            var px = th.offsetWidth;
                            if (px) { // exception under IE
                                col.width = px;
                                th.width = px + "px";
                            }
                        }
                    }
                });
                var w = 0;
                $.each(cols, function(index, col) {
                    if (col.width) {
                        w += parseInt(col.width);
                    }
                });
                tableEle.css("width", w);
                tableEle.css("tableLayout", "fixed");
            }

            // mapping scroll mode of grid to superpanel.
            var panelModes = self._getMappedScrollMode();
            splitSE.wijsuperpanel({ vScroller: { scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility }, allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            return;

            /*
            YK for removing split options.
            var o = gridView.options;
            if (o.splits)
            this.element.addClass("ui-wijgrid-splits-enabled");
            else
            this.element.removeClass("ui-wijgrid-splits-enabled");
            var $mainContentTable = this.element.find(".ui-wijgrid-split-area-se table");
            if (!o.splits) {
            try {
            if (o.staticRowIndex >= 0) { // interpreted as bool
            o.splitDistanceY = this.element.find(".ui-wijgrid-split-area-ne table")[0].offsetHeight;
            } else {
            o.splitDistanceY = 0;
            }
            if (o.staticColumnIndex >= 0) {
            o.splitDistanceX = this.element.find(".ui-wijgrid-split-area-nw table")[0].offsetWidth;
            } else {
            o.splitDistanceX = 0;
            }
            } catch (ex) { }
            }
            this.updateSplitAreaBounds();

            if (o.splits) {
            this.element.find(".ui-wijgrid-split-area-nw .ui-wijsuperpanel-templateouterwrapper")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-ne .ui-wijsuperpanel-templateouterwrapper")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-sw .ui-wijsuperpanel-templateouterwrapper")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-nw .ui-wijsuperpanel-templateouterwrapper").prepend($mainContentTable[0].cloneNode(true));
            this.element.find(".ui-wijgrid-split-area-ne .ui-wijsuperpanel-templateouterwrapper").prepend($mainContentTable[0].cloneNode(true));
            this.element.find(".ui-wijgrid-split-area-sw .ui-wijsuperpanel-templateouterwrapper").prepend($mainContentTable[0].cloneNode(true));
            }
            if (o.splits)
            this.updateSplittersLocation();
            */

        };

        this._getMappedScrollMode = function() {
            var scrollMode = gridView.options.scrollMode;
            var vScrollBarVisibility = hScrollBarVisibility = "auto";
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

        this.refreshPanel = function() {
            var splitSE = this.element.find(".ui-wijgrid-content-area");
            var panelModes = this._getMappedScrollMode();
            splitSE.wijsuperpanel({ vScroller: { scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility} });
            splitSE.wijsuperpanel("paintPanel");
        };

        /*this.updateSplittersLocation = function() {
        var o = gridView.options;
        var $hsplitter = this.element.find(".ui-wijgrid-h-splitter");
        var $vsplitter = this.element.find(".ui-wijgrid-v-splitter");
        $hsplitter.width(this.element.width()).css("top", o.splitDistanceY - Math.round($hsplitter.height() / 2));
        $vsplitter.height(this.element.height()).css("left", o.splitDistanceX - Math.round($vsplitter.width() / 2));
        };*/


        this.updateSplitAreaBounds = function() {
            var o = gridView.options;
            var controlWidth = o.width || this.element.width();
            var controlHeight = o.height || this.element.height();

            if (controlHeight <= 0) {
                controlHeight = this.element.find(".ui-wijgrid-split-area-se .ui-wijgrid-table:first")[0].offsetHeight;
            }

            var verScrollBarSize = 17;
            var horScrollBarSize = 17;

            this.element.height(controlHeight);
            this.element.width(controlWidth);

            // update splits bounds:
            //this.element.find(".ui-wijgrid-split-area-nw").height(o.splitDistanceY);
            //this.element.find(".ui-wijgrid-split-area-ne").height(o.splitDistanceY);
            //this.element.find(".ui-wijgrid-split-area-sw").height(controlHeight - o.splitDistanceY - (!o.splits ? horScrollBarSize : 0)).css("top", o.splitDistanceY);
            this.element.find(".ui-wijgrid-split-area-se").height(controlHeight - o.splitDistanceY).css("top", o.splitDistanceY);

            //this.element.find(".ui-wijgrid-split-area-nw").width(o.splitDistanceX);
            //this.element.find(".ui-wijgrid-split-area-sw").width(o.splitDistanceX);
            //this.element.find(".ui-wijgrid-split-area-ne").width(controlWidth - o.splitDistanceX - (!o.splits ? verScrollBarSize : 0)).css("left", o.splitDistanceX); //-17 is for scrollbars
            this.element.find(".ui-wijgrid-split-area-se").width(controlWidth - o.splitDistanceX).css("left", o.splitDistanceX);
        };

        this._onSplitContentScrollNW = function(e) {
            this.element.find(".ui-wijgrid-split-area-sw")[0].scrollLeft = this.element.find(".ui-wijgrid-split-area-nw")[0].scrollLeft;
            this.element.find(".ui-wijgrid-split-area-ne")[0].scrollTop = this.element.find(".ui-wijgrid-split-area-nw")[0].scrollTop;
        };
        this._onSplitContentScrollNE = function(e) {
            this.element.find(".ui-wijgrid-split-area-se")[0].scrollLeft = this.element.find(".ui-wijgrid-split-area-ne")[0].scrollLeft;
            this.element.find(".ui-wijgrid-split-area-nw")[0].scrollTop = this.element.find(".ui-wijgrid-split-area-ne")[0].scrollTop;
        };
        this._onSplitContentScrollSW = function(e) {
            this.element.find(".ui-wijgrid-split-area-nw")[0].scrollLeft = this.element.find(".ui-wijgrid-split-area-sw")[0].scrollLeft;
            this.element.find(".ui-wijgrid-split-area-se")[0].scrollTop = this.element.find(".ui-wijgrid-split-area-sw")[0].scrollTop;
        };
        this._onSplitContentScrollSE = function(e) {
            this.element.find(".ui-wijgrid-split-area-ne")[0].scrollLeft = this.element.find(".ui-wijgrid-split-area-se")[0].scrollLeft;
            this.element.find(".ui-wijgrid-split-area-sw")[0].scrollTop = this.element.find(".ui-wijgrid-split-area-se")[0].scrollTop;
        };

        this.render = function(updateMode) {
            var docFragment = document.createDocumentFragment();

            var visibleLeaves = gridView._field("visibleLeaves");

            var table = docFragment.appendChild(document.createElement("table"));

            // create header
            var tHead = null;

            var spanTable = gridView._field("spanTable");
            if (spanTable && spanTable.length) {

                tHead = table.createTHead();

                var width = spanTable[0].length;

                for (var ri = 0, height = spanTable.length; ri < height; ri++) {
                    var domRow = tHead.insertRow(-1);

                    domRow.className = "ui-wijgrid-headerrow";
                    var thX = 0;

                    for (var ci = 0; ci < width; ci++) {
                        var span = spanTable[ri][ci];

                        if (span.column && (span.column.visible || span.column.visible === undefined)) {
                            span.column.thX = thX++;
                            span.column.thY = ri;

                            var domCell = document.createElement("th");

                            if (ci === 0 && gridView.options.showRowHeader) {
                                domCell.className = "ui-state-default ui-wijgrid-rowheader";
                            }

                            if (span.colSpan > 1) {
                                domCell.colSpan = span.colSpan;
                            }

                            if (span.rowSpan > 1) {
                                domCell.rowSpan = span.rowSpan;
                            }

                            domCell.innerHTML = (span.column.headerText)
                                ? span.column.headerText
                                : "&nbsp;";

                            domRow.appendChild(domCell);
                        } // end if
                    } // for ci
                } // for ri
            } // end if
            // create header end

            // create filter
            if (gridView.options.showFilter) {
                if (!tHead) {
                    tHead = table.createTHead();
                }

                var tmp = "";
                for (var i = 0, len = visibleLeaves.length; i < len; i++) {
                    var leaf = visibleLeaves[i];
                    if ((leaf.dataIndex >= 0) && !leaf.isBand && leaf.showFilter) {
                        //tmp += "<td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td class=\"filterOp\" /><td class=\"filterEditor\"/><td>&nbsp;</td><td class=\"filterBtn ui-state-default ui-corner-all\"><div class=\"ui-icon ui-icon-triangle-1-s\" >rollout</div></td></tr></table></td>";
                        tmp += "<td><div class=\"ui-wijgrid-filter ui-widget ui-state-default ui-corner-all\"><span class=\"ui-wijgrid-filtericon\"></span><input type=\"text\" class=\"ui-wijgrid-filter-input\" style=\"width:1px\" /><a class=\"ui-wijgrid-filter-trigger ui-corner-right ui-state-default\" href=\"#\"><span class=\"ui-icon ui-icon-triangle-1-s\"></span></a></div></td>";
                    } else {
                        tmp += "<td>&nbsp;</td>";
                    }
                }

                $(tHead).append("<tr class=\"ui-wijgrid-filterrow\">" + tmp + "</tr>");
            }
            // create filter end

            // colgroup
            var colGroup = document.createElement("colgroup");
            for (var i = 0, len = visibleLeaves.length; i < len; i++) {
                var col = document.createElement("col");

                var leaf = visibleLeaves[i];
                if (leaf.width) {
                    col.width = leaf.width; // set column width
                }

                colGroup.appendChild(col);
            }
            table.appendChild(colGroup);
            // end colgroup


            // create body
            var data = gridView.dataTable;

            var tBody = table.appendChild(document.createElement("tbody"));
            var domRowDataIndex = 0;
            //var closestCulture = this._field("closestCulture");

            for (var ri = 0, rowLen = data.length; ri < rowLen; ri++) {
                var dataRow = data[ri];
                var dataRowLen = dataRow.length;
                var domRow = tBody.insertRow(-1);

                var className = "ui-wijgrid-row ui-widget-content";

                switch (dataRow.rowType) {
                    case "data":
                        className += " ui-wijgrid-datarow";

                        domRow.setAttribute("dataRowIndex", domRowDataIndex);

                        if (domRowDataIndex % 2 !== 0) {
                            className += " ui-wijgrid-alternatingrow";
                        }

                        domRowDataIndex++;

                        break;

                    case "groupHeader":
                        className += " ui-wijgrid-groupheaderrow";
                        break;

                    case "groupFooter":
                        className += " ui-wijgrid-groupfooterrow";
                        break;
                }

                if (className) {
                    domRow.className = className;
                }

                if (dataRow.display) {
                    domRow.style.display = "none";
                }

                if (dataRow.id) {
                    domRow.id = dataRow.id;
                }

                for (var ci = 0, cellLen = visibleLeaves.length; ci < cellLen; ci++) {
                    var leaf = visibleLeaves[ci];
                    var dataIndex = leaf.dataIndex;

                    var cellIndex = 0;
                    var doBreak = false;
                    var isDataRow = false;

                    switch (dataRow.rowType) {
                        case "data":
                            isDataRow = true;
                            cellIndex = dataIndex; // use [leaf -> data] mapping

                            if (cellIndex >= 0 && (!dataRow[cellIndex] || (dataRow[cellIndex].visible === false))) {
                                continue;  // spanned cell ?
                            }
                            break;

                        case "groupHeader":
                        case "groupFooter":
                            cellIndex = ci; // just iterate through all dataRow cells.

                            if (cellIndex >= dataRowLen) {
                                doBreak = true;  // don't extend group headers\ footers with additional cells
                            }
                    }

                    if (doBreak) {
                        break;
                    }

                    var domCell = document.createElement("td");

                    var cellValue = undefined;

                    if (cellIndex >= 0) {
                        if (isDataRow && leaf.dataParser) {
                            var dataValue = dataRow[cellIndex].value;

                            domCell.className = "wijdata-type-" + (leaf.dataType || "string");

                            if (leaf.dataType === "boolean") { // create checkbox
                                cellValue = (dataValue)
                                    ? "<input type=\"checkbox\" checked=\"checked\" disabled=\"disabled\" />"
                                    : "<input type=\"checkbox\" disabled=\"disabled\" />";
                            } else {
                                // format value using dataFormatString
                                cellValue = gridView._toStr(leaf, dataValue);
                            }

                        } else {
                            cellValue = dataRow[cellIndex].html; // use original html
                        }
                    }

                    if (!cellValue) {
                        cellValue = "&nbsp;"
                    }

                    if (ci === 0 && gridView.options.showRowHeader) {
                        domCell.className += " ui-wijgrid-rowheader";
                    }

                    domCell.className += " wijgridtd";

                    domCell.innerHTML = cellValue;

                    if (cellIndex >= 0) {
                        if (dataRow[cellIndex].rowSpan > 1) {
                            domCell.rowSpan = dataRow[cellIndex].rowSpan;
                        }

                        if (dataRow[cellIndex].colSpan > 1) {
                            domCell.colSpan = dataRow[cellIndex].colSpan;
                        }

                        if (dataRow[cellIndex].paddingLeft) {
                            domCell.style.paddingLeft = dataRow[cellIndex].paddingLeft;
                        }
                    }

                    domRow.appendChild(domCell);
                }

                if (!domRow.cells.length) {
                    tBody.removeChild(domRow);
                }
            }

            // create body end

            postRender(table);
        };

        this.attachEvents = function() {
        };

        //this.updateCss = function () {
        //};

        // array of a htmlTableAccessor instances
        this.subTables = function() {
            return [_dataTable];
        };

        this.focusableElement = function() {
            return _dataTable.element();
        };

        this.forEachRowCell = function(rowIndex, callback, param) {
            return _dataTable.forEachRowCell(rowIndex, callback, param);
        };

        this.forEachColumnCell = function(colIndex, callback, param) {
            return _dataTable.forEachColumnCell(colIndex, callback, param);
        };

        this.ensureWidth = function(delta) {
            if (gridView.options.scrollMode !== "none") {
                if (gridView.options.scrollMode === "vertical") {
                    // return if horizontal bar is not active.
                    return;
                }
                var tableEle = $(_dataTable.element());
                tableEle.css({ width: "" });

                var width = 0;
                $.each(_dataTable.colTags(), function(index, col) {
                    if (col.width) {
                        width += parseInt(col.width);
                    }
                })

                if (width) {
                    tableEle.width(width);
                }

                _contentArea.wijsuperpanel("paintPanel");
            } else {
                var rootWidth = gridView.element.width();
                var tableWidth = $(_dataTable.element()).width();

                var newWidth = (tableWidth <= rootWidth)
                    ? tableWidth
                    : Math.max(rootWidth, tableWidth);

                if (!newWidth) {
                    newWidth = 0;
                }

                newWidth += delta;

                if (newWidth < 0) {
                    newWidth = 0;
                }

                gridView.element.width(newWidth);
            }
        };

        this.getCell = function(absColIdx, absRowIdx) {
            var cellIdx = _dataTable.getCellIdx(absColIdx, absRowIdx);
            if (cellIdx >= 0) {
                var rowObj = this.getJoinedRows(absRowIdx, 0);
                if (rowObj[0]) {
                    return rowObj[0].cells[cellIdx];
                }
            }

            return null;
        };

        this.getAbsoluteRowIndex = function(domRow) {
            return domRow.rowIndex;
        };

        this.getJoinedCols = function(columnIndex) {
            var $colGroup = $(_dataTable.element()).find("> colgroup");
            if ($colGroup.length) {
                if (columnIndex < $colGroup[0].childNodes.length) {
                    return [$colGroup[0].childNodes[columnIndex], null];
                }
            }

            return [null, null];
        };

        this.getJoinedRows = function(rowIndex, rowScope) {
            return [_dataTable.getSectionRow(rowIndex, rowScope), null];
        };

        this.getJoinedTables = function(byColumn, index) {
            return [_dataTable, null, index];
        };

        this.getHeaderCell = function(absColIdx) {
            var leaf = gridView._field("visibleLeaves")[absColIdx];

            //return gridView.$table.find("> thead > tr.ui-wijgrid-headerrow")[leaf.thY].cells[leaf.thX];

            /*var tHead = gridView.$table[0].tHead;
            if (tHead) {
            return tHead.rows[leaf.thY].cells[leaf.thX];
            }*/

            var headerRow = gridView._headerRows();
            if (headerRow) {
                return new $.ui.wijgrid.rowAccessor().getCell(headerRow.item(leaf.thY), leaf.thX);
            }

            return null;
        };

        this.getAbsCellInfo = function(cell) {
            return new $.ui.wijgrid.cellInfo(_dataTable.getColumnIdx(cell), cell.parentNode.rowIndex);
        };

        this.getVisibleAreaBounds = function() {
            /*var outerDivBounds = $.ui.wijgrid.bounds(_contentArea, true);
            var dataTableBounds = $.ui.wijgrid.bounds(_dataTable.element());

            return {
            top: dataTableBounds.top,
            left: dataTableBounds.left,
            width: Math.min(outerDivBounds.width, dataTableBounds.width),
            height: Math.min(outerDivBounds.height, dataTableBounds.height)
            };*/

            var dataTableBounds = $.ui.wijgrid.bounds(_dataTable.element());

            if (gridView.options.scrollMode === "none") {
                return dataTableBounds;
            } else {
                var splitSEBounds = $.ui.wijgrid.bounds(this.element.find(".ui-wijgrid-split-area-se:first")[0]);

                return {
                    top: dataTableBounds.top,
                    left: dataTableBounds.left,
                    width: Math.min(splitSEBounds.width, dataTableBounds.width),
                    height: Math.min(splitSEBounds.height, dataTableBounds.height)
                };
            }
        };

        // private
        var postRender = function(table) {
            var $table = $(table);

            $table
              .addClass("ui-wijgrid-table")
              .find("> tbody").addClass("ui-widget-content ui-wijgrid-data");

            if (gridView.options.scrollMode !== "none") {
                _contentArea = gridView.element.find(".ui-wijgrid-content-area").empty();
                $table.appendTo(_contentArea);
            } else {
                gridView.element.find(" > :not(.ui-wijpager)").remove();  // remove all children except paginators

                if (gridView.$topPagerDiv) {
                    gridView.$topPagerDiv.after($table);
                } else {
                    gridView.element.prepend($table);
                }
            }

            _dataTable = new $.ui.wijgrid.htmlTableAccessor(table);
        };
        // private
    }
});$.ui.wijgrid.selection = function(gridView) {
    /// <summary>
    /// Object that represents selection in the grid.
    /// Code example: var selection = new $.ui.wijgrid.selection(gridView);
    /// </summary>
    /// <param name="gridview" type="$.ui.wijgrid" mayBeNull="false">gridView</param>
    /// <returns type="$.ui.wijgrid.selection">Object that represents selection in the grid</returns>
    var _updates = 0;

    var _anchorCell;

    var _addedCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);
    var _removedCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);

    var _selectedCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);
    var _addedDuringCurTransactionCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);

    var _selectedColumns = null; // ?
    var _selectedRows = null; // ?

    this.selectedCells = function() {
        /// <summary>
        /// Gets a read-only collection of the selected cells.
        /// Code example: var selectedCells = selectionObj.selectedCells();
        /// </summary>
        /// <returns type="$.ui.wijgrid.cellInfoOrderedCollection"/>
        return _selectedCells;
    };

    /*this.selectedColumns = function () {
    return _selectedColumns; // TODO ?
    };

    this.selectedRows = function () {
    return _selectedRows; // TODO ?
    };*/

    this.addRange = function(cellRange /* x0 */, y0 /* opt */, x1 /* opt */, y1 /* opt */) {
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
        /// <param name="cellRange" type="$.ui.wijgrid.cellInfoRange">Cell range to select.</param>
        /// <param name="x0" type="Number" integer="true">The x-coordinate that represents the top left cell of the range.</number>
        /// <param name="y0" type="Number" integer="true">The y-coordinate that represents the top left cell of the range.</number>
        /// <param name="x1" type="Number" integer="true">The x-coordinate that represents the bottom right cell of the range.</number>
        /// <param name="y1" type="Number" integer="true">The y-coordinate that represents the bottom right cell of the range.</number>

        if (!cellRange && (arguments.length == 1)) {
            throw "invalid argument";
        }

        var range = (arguments.length === 4)
                ? new $.ui.wijgrid.cellInfoRange(new $.ui.wijgrid.cellInfo(cellRange, y0), new $.ui.wijgrid.cellInfo(x1, y1))
                : cellRange._clone();

        range._normalize();

        if (!range._isValid()) {
            throw "invalid argument";
        }

        this.beginUpdate();

        this._startNewTransaction(gridView._field("currency"));
        this._selectRange(range, false, true, 0 /* none*/, null);

        this.endUpdate();
    };

    this.clear = function() {
        /// <summary>
        /// Clears the selection.
        /// Code example: selectionObj.clear();
        /// </summary>
        this.beginUpdate();

        _removedCells._clear();
        _removedCells._addFrom(_selectedCells);

        this.endUpdate();
    };

    this.selectAll = function() {
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

    this.beginUpdate = function() {
        /// <summary>
        /// Begins the update.
        /// The changes won't have effect until endUpdate() is called.
        /// Code example: selectionObj.beginUpdate();
        /// </summary>
        _updates++;
    };

    this.endUpdate = function() {
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

                    if (_selectedColumns != null) {
                        _selectedColumns.UnderlyingDataChanged(); // notify
                    }

                    if (_selectedRows != null) {
                        _selectedRows.UnderlyingDataChanged(); // notify
                    }

                    gridView._trigger("selectionchanged", null, { addedCells: _addedCells, removedCells: _removedCells });
                }

                _addedCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);
                _removedCells._clear();
            }
        }
    };

    // * internal

    this._multipleRangesAllowed = function() {
        var mode = gridView.options.selectionMode;

        return (mode && ((mode = mode.toLowerCase()) === "multicolumn" || mode === "multirow" || mode === "multirange"));
    };

    this._anchorCell = function() {
        return _anchorCell;
    };

    this._startNewTransaction = function(dataCellInfo) {
        if (dataCellInfo) {
            _anchorCell = dataCellInfo._clone();
            _addedDuringCurTransactionCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);
        }
    };

    this._clearRange = function(range, extendMode) {
        var selectionMode = gridView.options.selectionMode.toLowerCase();

        if (range._isValid() && (selectionMode !== "none") && (_selectedCells.length() > 0)) {
            var rangeToClear = range._clone();

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
                    var rowsLen = rangeToClear.bottomRight().rowIndex();
                    var cellsLen = rangeToClear.bottomRight().cellIndex();

                    var flag = false;
                    for (var row = rangeToClear.topLeft().rowIndex(); !flag && row <= rowsLen; row++) {
                        for (var cell = rangeToClear.topLeft().cellIndex(); !flag && cell <= cellsLen; cell++) {
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
                    var len = _selectedCells.length();
                    for (var i = 0; i < len; i++) {
                        var cellInfo = _selectedCells.item(i);

                        if (rangeToClear._containsCellInfo(cellInfo)) {
                            _removedCells._add(cellInfo);
                        }
                    }

                    break;
            }

            this.endUpdate();
        }
    };

    this._selectRange = function(range, ctrlKey, shiftKey, extendMode, endPoint) {
        var selectionMode = gridView.options.selectionMode.toLowerCase();

        if ((selectionMode !== "none") && range._isValid()) {
            var rangeToSelect = range._clone();
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
                        ? new $.ui.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
                        : new $.ui.wijgrid.cellInfoRange(endPoint, endPoint);

                break;

            case "singlecolumn":
                range = (endPoint === null)
                        ? new $.ui.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
                        : new $.ui.wijgrid.cellInfoRange(endPoint, endPoint);
                range._extend(1 /* extendToColumn */, dataRange);

                break;

            case "singlerow":
                range = (endPoint === null)
                        ? new $.ui.wijgrid.cellInfoRange(range.topLeft(), range.topLeft())
                        : new $.ui.wijgrid.cellInfoRange(endPoint, endPoint);
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
    };

    function doSelection() {
        var offsets = gridView._getDataToAbsOffset();
        var cellOffset = offsets.x;
        var rowOffset = offsets.y;

        var view = gridView._field("view");

        var len = _removedCells.length();
        for (var i = 0; i < len; i++) {
            var info = _removedCells.item(i);

            if (_addedCells.indexOf(info) < 0) {
                var cell = view.getCell(info.cellIndex() + cellOffset, info.rowIndex() + rowOffset);
                if (cell) {
                    $(cell).removeClass("ui-state-highlight");
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

        len = _addedCells.length();
        for (var i = 0; i < len; i++) {
            var info = _addedCells.item(i);

            var index = _selectedCells.indexOf(info);
            if (index < 0) {
                var cell = view.getCell(info.cellIndex() + cellOffset, info.rowIndex() + rowOffset);
                if (cell) {
                    $(cell).addClass("ui-state-highlight");
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
    };

    function doRange(range, add) {
        var x0 = range.topLeft().cellIndex();
        var y0 = range.topLeft().rowIndex();
        var x1 = range.bottomRight().cellIndex();
        var y1 = range.bottomRight().rowIndex();

        if (add) {
            var cnt = _addedCells.length();
            for (var row = y0; row <= y1; row++) {
                for (var col = x0; col <= x1; col++) {
                    var cell = new $.ui.wijgrid.cellInfo(col, row);

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
            var cnt = _removedCells.length();
            for (var row = y0; row <= y1; row++) {
                for (var col = x0; col <= x1; col++) {
                    var cell = new $.ui.wijgrid.cellInfo(col, row);

                    if (cnt === 0) {
                        _removedCells._appendUnsafe(cell);
                    }
                    else {
                        _removedCells._add(cell);
                    }
                }
            }
        }
    };
    // * private
};

$.ui.wijgrid.cellInfoOrderedCollection = function(gridView) {
    /// <summary>
    /// Ordered read-only collection of a $.ui.wijgrid.cellInfo objects.
    /// Code example: var collection = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);
    /// <summary>
    /// <param name="gridView" type="$.ui.wijgrid" mayBeNull="false">gridView</param>
    /// <returns type="$.ui.wijgrid.cellInfoOrderedCollection" />
    if (!gridView) {
        throw "argument is null";
    }

    var _list = [];

    // public
    this.item = function(index) {
        /// <summary>
        /// Gets an item at the specified index.
        /// Code example: var cellInfoObj = collection.item(0);
        /// </summary>
        /// <param name="index" type="Number" integer="true">The zero-based index of the item to get.</param>
        /// <returns type="$.ui.wijgrid.cellInfo">The $.ui.wijgrid.cellInfo object at the specified index.</returns>
        return _list[index];
    };

    this.length = function() {
        /// <summary>
        /// Gets the total number of the items in the collection.
        /// Code example: var len = collection.length();
        /// </summary>
        /// <returns type="Number" integet="true">The total number of the items in the collection.</returns>
        return _list.length;
    };

    // (cellInfo)
    // (cellIndex, rowIndex)
    this.indexOf = function(cellIndex, rowIndex) {
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
        /// <param name="cellInfo" type="$.ui.wijgrid.cellInfo">A cellInfo object to return the index of.</param>
        /// <param name="cellIndex" type="Number" integer="true">A zero-based cellIndex component of the cellInfo object to return the index of.</param>
        /// <param name="rowIndex" type="Number" integer="true">A zero-based rowIndex component of the cellInfo object to return the index of.</param>
        /// <returns type="Number" integer="true">The zero-based index of the specified object, or -1 if the specified object is not a member of the collection.</returns>
        if (arguments.length === 1) {
            rowIndex = cellIndex.rowIndex();
            cellIndex = cellIndex.cellIndex();
        }

        var lo = 0;
        var hi = _list.length - 1;

        while (lo <= hi) {
            var med = lo + ((hi - lo) >> 1);

            var current = _list[med];

            var cmp = current.rowIndex() - rowIndex;
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

    this.toString = function() {
        var val = "";

        for (var i = 0, len = _list.length; i < len; i++) {
            val += _list[i].toString() + "\n";
        }

        return val;
    };

    // public *

    // internal

    this._add = function(value) {
        var idx = this.indexOf(value);
        if (idx < 0) {
            _list.splice(~idx, 0, value);
            value._setGridView(gridView);
            return true;
        }

        return false;
    };

    // addFrom - an cellInfoOrderedCollection instance
    this._addFrom = function(addFrom) {
        if (addFrom) {
            var fromLen = addFrom.length();
            var thisLen = _list.length;

            if (thisLen === 0) {
                _list.length = fromLen;

                for (var i = 0; i < fromLen; i++) {
                    _list[i] = addFrom.item(i);
                    _list[i]._setGridView(gridView);
                }
            } else {
                for (var i = 0; i < fromLen; i++) {
                    this._add(addFrom.item(i));
                }
            }
        }
    };

    this._appendUnsafe = function(value) {
        _list[_list.length] = value;
        value._setGridView(gridView);
    };

    this._insertUnsafe = function(value, index) {
        _list.splice(index, 0, value);
    };

    this._clear = function() {
        _list.length = 0;
    };

    this._remove = function(value) {
        var idx = this.indexOf(value);
        if (idx >= 0) {
            _list.splice(idx, 1);
            return true;
        }

        return false;
    };

    this._removeAt = function(index) {
        _list.splice(index, 1);
    };

    this._getColumnsIndicies = function() {
        var columns = [];
        var len = _list.length;

        if (len) {
            var tmpColumns = [];
            for (var i = 0; i < len; i++) {
                tmpColumns[_list[i].cellIndex()] = 1;
            }

            len = tmpColumns.length;
            var len2 = 0;
            for (var i = 0; i < len; i++) {
                if (tmpColumns[i]) {
                    columns[len2++] = i;
                }
            }
        }

        return columns;
    };

    this._getSelectedRowsIndicies = function() {
        var rows = [];
        var len = _list.length;

        if (len) {
            var tmpRows = [];
            for (var i = 0; i < len; i++) {
                tmpRows[_list[i].rowIndex()] = 1;
            }

            len = tmpRows.length;
            var len2 = 0;
            for (var i = 0; i < len; i++) {
                if (tmpRows[i]) {
                    rows[len2++] = i;
                }
            }
        }

        return rows;
    };

    this._rectangulate = function() {
        var len = _list.length;

        if (len) {
            var x0 = 0xFFFFFFFF;
            var y0 = 0xFFFFFFFF;

            var x1 = 0;
            var y1 = 0;

            for (var i = 0; i < len; i++) {
                var cellInfo = _list[i];

                x0 = Math.min(x0, cellInfo.cellIndex());
                y0 = Math.min(y0, cellInfo.rowIndex());
                x1 = Math.max(x1, cellInfo.cellIndex());
                y1 = Math.Max(y1, cellInfo.rowIndex());
            }

            return new $.ui.wijgrid.cellInfoRange(new $.ui.wijgrid.cellInfo(x0, y0),
                    new $.ui.wijgrid.cellInfo(x1, y1));
        }

        return null;
    };

    // internal *
};$.extend($.ui.wijgrid, {
    selectionui: function(gridView) {
        var _gap_to_start = 10;
        var _evntFormat = "{0}." + gridView.widgetName + ".selectionui";

        var _addedCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);

        var _startPos;
        var _startCellInfo;
        var _endCellInfo;
        var _prevMouseMoveRange;
        var _inProgress = false;
        var _additionalEventsAttached = false;

        var _view = gridView._field("view");
        var _visLeavesLen = gridView._field("visibleLeaves").length;
        gridView.element.bind(_eventKey("mousedown"), _onGridMouseDown);

        this.dispose = function() {
            gridView.element.unbind(_eventKey("mousedown"), _onGridMouseDown);
            _detachAdditionalEvents();
        };

        function _onGridMouseDown(args) {
            if (!gridView._canInteract() || gridView.options.selectionMode.toLowerCase() === "none") {
                return;
            }

            var visibleBounds = _view.getVisibleAreaBounds();

            var mouse = { x: args.pageX, y: args.pageY };

            var tag = (args.target && args.target.tagName !== undefined)
                ? args.target.tagName.toLowerCase()
                : undefined;

            var $target = $(args.target);

            if ((!tag || ((tag === "td" || tag === "th") && $target.hasClass("wijgridtd")) ||
                    (tag === "div" && $target.hasClass("wijgriddiv"))) &&
                    (mouse.x > visibleBounds.left && mouse.x < visibleBounds.left + visibleBounds.width) &&
                    (mouse.y > visibleBounds.top && mouse.y < visibleBounds.top + visibleBounds.height)) {

                _attachAdditionalEvents();
                _startPos = mouse;

                _startCellInfo = _coordToDataCellInfo(_startPos);
            }
        };

        function _onDocumentMouseMove(args) {
            if (!_startCellInfo || !_startCellInfo._isValid()) {
                return;
            }

            var mouse = { x: args.pageX, y: args.pageY };

            if (!_inProgress) {
                _inProgress = (Math.abs(_startPos.x - mouse.x) > _gap_to_start) ||
                        (Math.abs(_startPos.y - mouse.y) > _gap_to_start);
            }

            if (_inProgress) {
                var tmp = _coordToDataCellInfo(mouse);
                if (!tmp._isValid()) {
                    return;
                }

                _endCellInfo = tmp;

                var range = new $.ui.wijgrid.cellInfoRange(_startCellInfo, _endCellInfo);
                range._normalize();
                range._clip(gridView._getDataCellsRange());

                if (range._isValid() && !range.isEqual(_prevMouseMoveRange)) {
                    var dataOffset = gridView._getDataToAbsOffset();

                    _prevMouseMoveRange = range;

                    var desiredCells = new $.ui.wijgrid.cellInfoOrderedCollection(gridView);

                    var rowsLen = range.bottomRight().rowIndex();
                    var cellsLen = range.bottomRight().cellIndex();

                    for (var row = range.topLeft().rowIndex(); row <= rowsLen; row++) {
                        for (var cell = range.topLeft().cellIndex(); cell <= cellsLen; cell++) {
                            desiredCells._appendUnsafe(new $.ui.wijgrid.cellInfo(cell, row));
                        }
                    }

                    for (var i = 0, len = _addedCells.length(); i < len; i++) {
                        var info = _addedCells.item(i);
                        if (desiredCells.indexOf(info) < 0) // remove css
                        {
                            if (gridView.selection().selectedCells().indexOf(info) < 0) {
                                var removeCell = _view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
                                if (removeCell) {
                                    $(removeCell).removeClass("ui-state-highlight");
                                }
                            }

                            _addedCells._removeAt(i);
                            i--;
                            len--;
                        }
                    }

                    for (var i = 0, len = desiredCells.length(); i < len; i++) {
                        var info = desiredCells.item(i);
                        if (_addedCells.indexOf(info) < 0 && gridView.selection().selectedCells().indexOf(info) < 0) {
                            if (_addedCells._add(info)) {
                                var addCell = _view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
                                if (addCell) {
                                    $(addCell).addClass("ui-state-highlight");
                                }
                            }
                        }
                    }
                } // end if
            }
        };

        function _onDocumentMouseUp(args) {
            _detachAdditionalEvents();

            if (_inProgress) {
                _inProgress = false;

                if (_prevMouseMoveRange && _prevMouseMoveRange._isValid()) {
                    gridView._changeCurrency(_endCellInfo);

                    if (!args.shiftKey || (!gridView.selection()._multipleRangesAllowed() && gridView.options.selectionMode.toLowerCase() !== "singleRange")) {
                        gridView.selection()._startNewTransaction(_startCellInfo);
                    }

                    gridView.selection().beginUpdate();
                    gridView.selection()._selectRange(_prevMouseMoveRange, args.shiftKey, args.ctrlKey, 0 /* none */, _endCellInfo);
                    gridView.selection().endUpdate();

                    var view = gridView._field("view");
                    var dataOffset = gridView._getDataToAbsOffset();

                    // clear remained cells
                    for (var i = 0, len = _addedCells.length(); i < len; i++) {
                        var info = _addedCells.item(i);
                        if (gridView.selection().selectedCells().indexOf(info) < 0) {
                            var removeCell = view.getCell(info.cellIndex() + dataOffset.x, info.rowIndex() + dataOffset.y);
                            if (removeCell != null) {
                                $(removeCell).removeClass("ui-state-highlight");
                            }
                        }
                    }

                    _addedCells._clear();
                    _startCellInfo = _endCellInfo = _prevMouseMoveRange = null;

                    return false; // cancel bubbling
                }
            }
        };

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
        };

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
        };

        function _eventKey(eventType) {
            return $.ui.wijgrid.stringFormat(_evntFormat, eventType);
        };

        /*var _thBoundsHash = [];
        var _trBoundsHash = [];*/
        function _coordToDataCellInfo(pnt /* {x, y} */) {
            var left = 0;
            var right = _visLeavesLen - 1;
            var median = 0;
            var cellIdx = -1;

            // get cell index
            while (left <= right) {
                median = ((right - left) >> 1) + left;

                /*var bounds = _thBoundsHash[median];
                if (!bounds) {
                _thBoundsHash[median] = bounds = $.ui.wijgrid.bounds(_view.getHeaderCell(median));
                }*/
                var bounds = $.ui.wijgrid.bounds(_view.getHeaderCell(median));

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
                return $.ui.wijgrid.cellInfo.prototype.outsideValue;
            }

            var allGridRowsAccessor = new $.ui.wijgrid.rowAccessor(_view, 0 /* all */, 0, 0);

            var rowIdx = -1;
            var left = 0;
            var right = allGridRowsAccessor.length() - 1;
            var median = 0;

            // get row index
            while (left <= right) {
                median = ((right - left) >> 1) + left;

                /*var bounds = _trBoundsHash[median];
                if (!bounds) {
                var rowObj = allGridRowsAccessor.item(median);
                _trBoundsHash[median] = bounds = $.ui.wijgrid.bounds(allGridRowsAccessor.getCell(rowObj, 0));
                }*/
                var rowObj = allGridRowsAccessor.item(median);
                var bounds = $.ui.wijgrid.bounds(allGridRowsAccessor.getCell(rowObj, 0));

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


            if (rowIdx == -1) {
                return $.ui.wijgrid.cellInfo.prototype.outsideValue;
            }

            var dataOffset = gridView._getDataToAbsOffset();

            var result = new $.ui.wijgrid.cellInfo(cellIdx - dataOffset.x, rowIdx - dataOffset.y);
            result._clip(gridView._getDataCellsRange());

            return result;
        };
    }
});
$.ui.wijgrid.rowAccessor = function (view, scope, offsetTop, offsetBottom) {
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
        var joinedTables = view.getJoinedTables(true, 0);

        var len = 0;

        var htmlAccessor;
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
            var globCellIdx = 0;
            for (var i = 0, len = rowObj.length; i < len; i++) {
                var domRow = rowObj[i];

                if (domRow) {
                    for (var j = 0, cellLen = domRow.cells.length; j < cellLen; j++) {
                        var result = callback(domRow.cells[j], globCellIdx++, param);
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
        var domRow;
        if (domRow = rowObj[0]) {
            var cellLen = domRow.cells.length;
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
        var res = 0;
        var domRow;

        if (domRow = rowObj[0]) {
            res = domRow.cells.Length;

            if (domRow = rowObj[1]) {
                res += domRow.cells.Length;
            }
        }

        return res;
    };
}
$.extend($.ui.wijgrid, {
    cellEditorHelper: function() {
        this.currencyEditStart = function(grid, e) {
            var result = false;
            var currency = grid.currency();

            if (currency._isValid() && !currency._isEdit() && (currency._column().dataIndex >= 0)) {
                var rowObj = currency._row();

                if (rowObj && rowObj.length) {
                    var dataIndex = (rowObj[0].attributes["dataRowIndex"] !== undefined)
                        ? parseInt(rowObj[0].attributes["dataRowIndex"].value)
                        : undefined;

                    if (dataIndex !== undefined) {

                        var args = {
                            cell: currency,
                            event: e,
                            handled: false
                        }

                        if (result = grid._trigger("beforecelledit", null, args)) { // todo
                            if (!args.handled) {
                                result = defaultBeforeCellEdit(grid, args);
                            }
                        }

                        if (result) {
                            currency._isEdit(true);

                            if (grid.options.showRowHeader) {
                                $(rowObj[0].cells[0]).empty();
                                $(rowObj[0].cells[0]).append($("<div>&nbsp;</div>").addClass("ui-icon ui-icon-pencil"));
                            }
                        }
                    }
                }
            }

            return result;
        };

        this.currencyEditEnd = function(grid, e) {
            var currency = grid.currency();

            if (!currency._isValid() || !currency._isEdit()) {
                return;
            }

            var result = false;

            var rowObj = currency._row();
            if (rowObj && rowObj.length) {
                var dataIndex = (rowObj[0].attributes["dataRowIndex"] !== undefined)
                    ? parseInt(rowObj[0].attributes["dataRowIndex"].value)
                    : undefined;

                if (dataIndex === undefined) {
                    return result;
                }

                var escPressed = (e && e.which === $.ui.keyCode.ESCAPE);

                if (!e || (!escPressed)) {
                    var args = {
                        cell: currency,
                        value: undefined
                    };

                    if (result = grid._trigger("beforecellupdate", null, args)) {
                        if (args.value === undefined) {
                            args.value = getCellValue(grid, currency); // trying to get value using default implementation.
                        }

                        var valueIsChanged = false;
                        if (args.cell._column().dataType === "datetime") {
                            var a = args.value ? args.value.getTime() : null;
                            var b = currency.value() ? currency.value().getTime() : null;
                            valueIsChanged = a !== b;

                        } else {
                            valueIsChanged = args.value !== currency.value();
                        }

                        if (valueIsChanged) {
                            // update datasource

                            var column = currency._column();

                            // validate value
                            var value = grid._parse(column, args.value);
                            if ((value === null && column.valueRequired) ||
                                (column.dataType && column.dataType !== "string" && isNaN(value))) {

                                grid._trigger("invalidcellvalue", null, { cell: currency, value: args.value });
                                result = false;
                            } else {
                                var ci = currency.cellIndex();

                                var dataSliceRow = grid.dataTable[currency.rowIndex()];
                                dataSliceRow[ci].value = args.value;

                                //grid._field("rawData")[dataSliceRow[ci].originalRowIndex][ci].value = args.value;
                                grid._dataStore.updateValue(dataSliceRow[ci].originalRowIndex, column.dataKey, args.value);

                                grid._trigger("aftercellupdate", null, { cell: currency });
                            }
                        }
                    }
                } else {
                    // ESC key
                    result = true;
                }

                if (result) {
                    var args = {
                        cell: currency,
                        event: e,
                        handled: false
                    };

                    grid._trigger("aftercelledit", null, args);

                    if (!args.handled) {
                        result = defaultAfterCellEdit(grid, args);
                    }

                    if (result) {
                        currency._isEdit(false);
                    }

                    if (grid.options.showRowHeader) {
                        $(rowObj[0].cells[0]).html("&nbsp;"); // remove ui-icon-pencil
                    }

                    grid.element.focus();
                    $(grid._field("view").focusableElement()).focus();
                    currency.tableCell().focus();
                }
            }

            return result;
        };

        // private

        function defaultBeforeCellEdit(grid, args) {
            var leafOpt = args.cell._column();

            if (leafOpt.dataIndex >= 0) {
                var value = args.cell.value();

                var result = true;

                try {
                    var content = args.cell.tableCell();

                    if (leafOpt.dataType === "boolean") {
                        var checkBox = document.createElement("input");
                        checkBox.type = "checkbox";
                        checkBox.className = "wijgridinput ui-wijinput ui-state-focus";

                        $(checkBox).bind("keydown", grid, checkBoxOrInputKeyDown);

                        content.innerHTML = "";
                        content.appendChild(checkBox);

                        checkBox.focus();

                        checkBox.checked = value;
                    } else {
                        var input = document.createElement("input");
                        input.type = "text";
                        input.className = "wijgridinput ui-wijinput ui-state-focus";

                        $(input).bind("keydown", grid, checkBoxOrInputKeyDown);

                        if (args.event && args.event.type === "keypress" && args.event.which) {
                            input.value = String.fromCharCode(args.event.which);
                        } else {
                            switch (args.cell._column().dataType) {
                                case "currency":
                                case "number":
                                    if (value !== null) {
                                        input.value = value; // ignore formatting
                                        break;
                                    }
                                    // fall through
                                default:
                                    var strVal = grid._toStr(args.cell._column(), value);
                                    input.value = strVal;
                            }
                        }

                        content.innerHTML = "";
                        content.appendChild(input);

                        var len = input.value.length;
                        new $.ui.wijgrid.domSelection(input).setSelection({ start: len, end: len });

                        input.focus();

                        // FF issue: text does not track to the new position of the caret
                        if ($.browser.mozilla && document.createEvent && input.dispatchEvent) {
                            var kbEvent = document.createEvent("KeyboardEvent");
                            kbEvent.initKeyEvent("keypress", false, true, null, false, false, false, false, 0, $.ui.keyCode.SPACE);
                            input.dispatchEvent(kbEvent);
                            kbEvent = document.createEvent("KeyboardEvent");
                            kbEvent.initKeyEvent("keypress", false, true, null, false, false, false, false, $.ui.keyCode.BACKSPACE, 0);
                            input.dispatchEvent(kbEvent);
                        }

                    }
                }
                catch (ex) {
                    alert(ex.message);
                    result = false;
                }

                return result;
            }

            return false;
        };

        function defaultAfterCellEdit(grid, args) {
            var leafOpt = args.cell._column();

            if (leafOpt.dataIndex >= 0) {
                var result = true;

                try {
                    var content = args.cell.tableCell();

                    if (leafOpt.dataType === "boolean") {
                        var checkBox = document.createElement("input");
                        checkBox.type = "checkbox";

                        content.innerHTML = "";
                        content.appendChild(checkBox);

                        checkBox.checked = args.cell.value();
                        checkBox.disabled = true;
                    } else {
                        //content.innerHTML = "";
                        var value = grid._toStr(leafOpt, args.cell.value());
                        $(content).html(value);
                    }
                }
                catch (ex) {
                    alert("defaultAfterCellEdit: " + ex.message);
                    result = false;
                }

                return result;
            }

            return false;
        };

        function checkBoxOrInputKeyDown(args) {

            if (args.which === $.ui.keyCode.ENTER) { // stop editing when Enter key is pressed
                var grid = args.data;
                if (grid) {
                    grid._endEditInternal(args);
                    return false; // prevent submit behaviour.
                }
            }
        };

        function getCellValue(gridView, currency) {
            var $input = $(currency.tableCell()).find(":input:first");
            if ($input.length) {

                var value = ($input.attr("type") === "checkbox")
                    ? $input[0].checked
                    : $input.val();

                value = gridView._parse(currency._column(), value);
                return value;
            }

            return null;
        }

        // private *
    }
});
/*
Dependencies:
jquery.ui.mouse.js
jquery.ui.draggable.js
*/

$.extend($.ui.wijgrid, {
    fixedView: function (gridView) {

        // data rows count:
        var _rowsCount;

        //rendered DOM tables:
        var _viewTables = {};

        // table accessors:
        var _table00;
        var _table01;
        var _table10;
        var _table11;

        this.element = gridView.element;

        this.initialize = function () {
            _rowsCount = gridView.dataTable.length; // _dataTable.Element.Rows.Length;
            this._createLayout();
        };

        this._createLayout = function () {
            /*
            // following throws js exception sometimes:
            this.element.find(".ui-wijgrid-flatview").remove();
            this.element.find(".ui-wijgrid-fixedview").remove();*/
            var elemToRemove = this.element.find(".ui-wijgrid-flatview")[0];
            if (elemToRemove != null) {
                elemToRemove.parentNode.removeChild(elemToRemove);
            }

            elemToRemove = this.element.find(".ui-wijgrid-fixedview")[0];
            if (elemToRemove != null) {
                elemToRemove.parentNode.removeChild(elemToRemove);
            }

            this.element.wrapInner("<div class=\"ui-wijgrid-fixedview\"><div class=\"ui-wijgrid-scroller\"><div class=\"ui-wijgrid-split-area-se ui-wijgrid-content-area\"></div></div></div>");
            var scroller = this.element.find(".ui-wijgrid-scroller");
            //scroller.wijsuperpanel({ allowResize: false, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
            //var contentArea = this.element.find(".ui-wijgrid-content-area");

            scroller.after("<div class=\"ui-wijgrid-split-area ui-wijgrid-split-area-nw\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
            //var splitNW = this.element.find(".ui-wijgrid-split-area-nw");
            scroller.after("<div class=\"ui-wijgrid-split-area ui-wijgrid-split-area-ne\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
            //var splitNE = this.element.find(".ui-wijgrid-split-area-ne");
            scroller.after("<div class=\"ui-wijgrid-split-area ui-wijgrid-split-area-sw\" style=\"overflow:hidden;position:absolute;z-index:4;top:0px;left:0px;\"></div>");
            //var splitSW = this.element.find(".ui-wijgrid-split-area-sw");
        };

        this._onScrolled = function (e, data) {
            this.element.find(".ui-wijgrid-split-area-ne")[0].scrollLeft = parseInt((this.element.find(".ui-wijsuperpanel-templateouterwrapper").css("left") + "").replace("px", "")) * -1;
            //this.element.find(".ui-wijgrid-split-area-sw")[0].scrollTop = parseInt((this.element.find(".ui-wijsuperpanel-templateouterwrapper").css("top") + "").replace("px", "") * -1);
        };
        this._onScrolling = function (e, data) {
            //alert("scrolled");
            /*var data = {
            oldValue: scroller.scrollValue,
            newValue: v,
            
            dir: dir
            };*/
            //alert(data);
            if (data.dir == "h") {

                this.element.find(".ui-wijgrid-split-area-ne")[0].scrollLeft = parseInt((this.element.find(".ui-wijsuperpanel-templateouterwrapper").css("left") + "").replace("px", "")) * -1;


            } else {

                this.element.find(".ui-wijgrid-split-area-sw")[0].scrollTop = parseInt((this.element.find(".ui-wijsuperpanel-templateouterwrapper").css("top") + "").replace("px", "") * -1);

            }
            //
        };

        this.updateSplits = function () {
            var o = gridView.options;

            if (o.splits) {
                this.element.addClass("ui-wijgrid-splits-enabled");
            }
            else {
                this.element.removeClass("ui-wijgrid-splits-enabled");
            }

            var $mainContentTable = this.element.find(".ui-wijgrid-content-area table");
            if (!o.splits) {
                try {
                    if (o.staticRowIndex >= 0) { // interpreted as bool
                        o.splitDistanceY = this.element.find(".ui-wijgrid-split-area-ne table")[0].offsetHeight;
                    } else {
                        o.splitDistanceY = 0;
                    }
                    if (gridView._staticColumnIndex >= 0 /*o.staticColumnIndex >= 0*/) {
                        o.splitDistanceX = this.element.find(".ui-wijgrid-split-area-nw table")[0].offsetWidth;
                    } else {
                        o.splitDistanceX = 0;
                    }
                } catch (ex) { }
            }

            this._updateSplitAreaBounds();
            /*
            if (o.splits) {
            this.element.find(".ui-wijgrid-split-area-nw")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-ne")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-sw")[0].innerHTML = ""; //.empty()
            this.element.find(".ui-wijgrid-split-area-nw").prepend($mainContentTable[0].cloneNode(true));
            this.element.find(".ui-wijgrid-split-area-ne").prepend($mainContentTable[0].cloneNode(true));
            this.element.find(".ui-wijgrid-split-area-sw").prepend($mainContentTable[0].cloneNode(true));

            this._updateSplittersLocation();
            }
            */

            // handle autosizing
            /*
            var fixedColIdx = gridView._staticColumnIndex; //gridView.options.staticColumnIndex; // YK
            var fixedRowIdx = gridView.options.staticRowIndex; // interpreted as bool
            if (fixedColIdx >= 0 && fixedColIdx < gridView._field("leaves").length - 1 || fixedRowIdx >= 0) {
            this.adjustColumnSizes(_viewTables['nw'], _viewTables['sw']);
            this.adjustColumnSizes(_viewTables['ne'], _viewTables['se']);
            }
            */

            var self = this;
            var scroller = self.element.find(".ui-wijgrid-scroller");
            var panelModes = self._getMappedScrollMode();
            // use separate instead of collapse to avoid a disalignment issue in chrome.
            var topTable = $(_table01.element()).attr("cellpadding", "0").attr("cellspacing", "0").css("border-collapse", "separate");
            var bottomTable = $(_table11.element()).attr("cellpadding", "0").attr("cellspacing", "0").css("border-collapse", "separate");

            // set width to top table th and bottom table td in first row.
            var visibleLeaves = gridView._field("visibleLeaves");
            var topCols = _table01.colTags();
            var bottomCols = _table11.colTags();
            var tr = bottomTable.find(".ui-wijgrid-row:not(.ui-wijgrid-groupheaderrow):first");
            var bottomTds = tr.find("td");
            var hide = false;
            // group mode will hide data rows
            if (!tr.is(":visible")) {
                tr.show();
                hide = true;
            }
            var ths = [];
            $.each(visibleLeaves, function (index, leaf) {
                var th = self.getHeaderCell(index);
                ths.push(th);
            });
            // set column and outer width of td and th.
            $.each(ths, function (index, th) {
                var t = bottomTds[index];
                var colWidth = 0;
                if (t != undefined) {
                    colWidth = Math.max(th.offsetWidth, t.offsetWidth);
                    $(t).setOutWidth(colWidth);
                }
                else {
                    colWidth = th.offsetWidth;
                }
                $(th).setOutWidth(colWidth);
                topCols[index].width = bottomCols[index].width = colWidth;
            });

            if (hide) {
                tr.hide();
            }

            // have to ensure width to ensure alignment of top and bottom tables.
            self._ensureWidth();
            // we need fixed layout to align top and bottom tables.
            topTable.css("tableLayout", "fixed");
            bottomTable.css("tableLayout", "fixed");
            scroller.wijsuperpanel({ vScroller: { scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility }, allowResize: false, scrolled: jQuery.proxy(this._onScrolled, this) }); //, scrolling: jQuery.proxy(this._onScrolling, this), scrolled: jQuery.proxy(this._onScrolled, this) });
        };

        this._getMappedScrollMode = function () {
            var scrollMode = gridView.options.scrollMode;
            var vScrollBarVisibility = hScrollBarVisibility = "auto";
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
            var scroller = this.element.find(".ui-wijgrid-scroller");
            var panelModes = this._getMappedScrollMode();
            scroller.wijsuperpanel({ vScroller: { scrollBarVisibility: panelModes.vScrollBarVisibility }, hScroller: { scrollBarVisibility: panelModes.hScrollBarVisibility} });
            scroller.wijsuperpanel("paintPanel");
            this._ensureNEContainerWidth(scroller);
        };

        this._updateSplitAreaBounds = function () {
            var o = gridView.options;
            var controlWidth = o.width || this.element.width();
            var controlHeight = o.height || this.element.height();

            if (controlHeight <= 0) {
                controlHeight = this.element.find(".ui-wijgrid-split-area-se > table")[0].offsetHeight;
            }

            var verScrollBarSize = 18; //this.element.find(".ui-wijsuperpanel-vbarcontainer")[0].offsetWidth;
            var horScrollBarSize = 18; //this.element.find(".ui-wijsuperpanel-hbarcontainer")[0].offsetHeight;

            this.element.height(controlHeight);
            this.element.width(controlWidth);
            this.element.find(".ui-wijgrid-scroller").height(controlHeight);
            this.element.find(".ui-wijgrid-scroller").width(controlWidth);

            // update splits bounds:
            this.element.find(".ui-wijgrid-split-area-nw").height(o.splitDistanceY);
            this.element.find(".ui-wijgrid-split-area-ne").height(o.splitDistanceY);
            //this.element.find(".ui-wijgrid-split-area-sw").height(controlHeight - o.splitDistanceY - (!o.splits ? horScrollBarSize : 0)).css("top", o.splitDistanceY);
            this.element.find(".ui-wijgrid-split-area-sw").height(controlHeight - o.splitDistanceY).css("top", o.splitDistanceY);
            this.element.find(".ui-wijgrid-split-area-nw").width(o.splitDistanceX);
            this.element.find(".ui-wijgrid-split-area-sw").width(o.splitDistanceX);

            this.element.find(".ui-wijgrid-split-area-ne").width(controlWidth - o.splitDistanceX - (!o.splits ? verScrollBarSize : 0)).css("left", o.splitDistanceX); //-17 is for scrollbars

            //this.element.find(".ui-wijgrid-split-area-se").height(controlHeight - o.splitDistanceY).css("top", o.splitDistanceY);
            //this.element.find(".ui-wijgrid-split-area-se").width(controlWidth - o.splitDistanceX).css("left", o.splitDistanceX);
            this.element.find(".ui-wijgrid-split-area-se").css("marginLeft", o.splitDistanceX);
            this.element.find(".ui-wijgrid-split-area-se").css("marginTop", o.splitDistanceY);
            //alert("kk?" + (controlWidth - o.splitDistanceX - (!o.splits ? verScrollBarSize : 0)));
            //ui-wijgrid-split-area-se ui-wijgrid-content-area
        };

        /*this._updateSplittersLocation = function() {
        var o = gridView.options;
        var $hsplitter = this.element.find(".ui-wijgrid-h-splitter");
        var $vsplitter = this.element.find(".ui-wijgrid-v-splitter");
        $hsplitter.width(this.element.width()).css("top", o.splitDistanceY - Math.round($hsplitter.height() / 2));
        $vsplitter.height(this.element.height()).css("left", o.splitDistanceX - Math.round($vsplitter.width() / 2));
        }*/


        this.render = function (updateMode) {
            //*
            var visibleLeaves = gridView._field("visibleLeaves");
            var docFragment = document.createDocumentFragment();

            _viewTables["nw"] = docFragment.appendChild(document.createElement("table"));
            _viewTables["ne"] = docFragment.appendChild(document.createElement("table"));
            _viewTables["sw"] = docFragment.appendChild(document.createElement("table"));
            _viewTables["se"] = docFragment.appendChild(document.createElement("table"));

            var staticRowIndex = gridView._getRealStaticRowIndex();
            var staticColumnIndex = gridView._staticColumnIndex; //gridView.options.staticColumnIndex; //YK
            // create header
            var tHeads = {};

            var spanTable = gridView._field("spanTable");
            if (spanTable && spanTable.length) {

                tHeads["nw"] = _viewTables["nw"].createTHead();
                tHeads["ne"] = _viewTables["ne"].createTHead();
                /*tHeads["sw"] = _viewTables["sw"].createTHead(); // <-- user can fix the whole header only, not a random row.
                tHeads["sw"] = _viewTables["se"].createTHead();*/

                var width = spanTable[0].length;

                for (var ri = 0, height = spanTable.length; ri < height; ri++) {
                    var leftDomRow = null;
                    var rightDomRow = null;

                    //if (ri <= staticRowIndex) {
                    // now header rows are always fixed by design, so we can create header cells inside the fixed areas (nw + ne) only.
                    leftDomRow = tHeads["nw"].insertRow(-1);
                    rightDomRow = tHeads["ne"].insertRow(-1);
                    /*} else {
                    leftDomRow = _viewTables["sw"].tHead.insertRow(-1);
                    rightDomRow = _viewTables["se"].tHead.insertRow(-1);
                    }*/

                    leftDomRow.className = "ui-wijgrid-headerrow";
                    rightDomRow.className = "ui-wijgrid-headerrow";

                    var thX = 0;

                    for (var ci = 0; ci < width; ci++) {
                        var span = spanTable[ri][ci];

                        if (span.column && (span.column.visible || span.column.visible === undefined)) {
                            span.column.thX = thX++;
                            span.column.thY = ri;

                            var domCell = document.createElement("th");

                            if (ci === 0 && gridView.options.showRowHeader) {
                                domCell.className = "ui-state-default ui-wijgrid-rowheader";
                            }

                            if (span.colSpan > 1) {
                                domCell.colSpan = span.colSpan;
                            }

                            if (span.rowSpan > 1) {
                                domCell.rowSpan = span.rowSpan;
                            }

                            domCell.innerHTML = (span.column.headerText)
                                ? span.column.headerText
                                : "&nbsp;";

                            if (ci <= staticColumnIndex) {
                                leftDomRow.appendChild(domCell);
                            } else {
                                rightDomRow.appendChild(domCell);
                            }
                        } // end if
                    } // for ci
                } // for ri

            } // end if
            // create header end

            // create filter -- now only the whole header can be fixed by design, so the tHeads can contain only "nw" or (and) "ne" keys.
            if (gridView.options.showFilter) {

                if (tHeads["nw"]) { // fixed columns area
                    var tmp = "";
                    for (var i = 0, len = visibleLeaves.length; i < len && i <= staticColumnIndex; i++) {
                        var leaf = visibleLeaves[i];
                        tmp += ((leaf.dataIndex >= 0) && !leaf.isBand && leaf.showFilter)
                          //? "<td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td class=\"filterOp\" /><td class=\"filterEditor\"/><td>&nbsp;</td><td class=\"filterBtn ui-state-default ui-corner-all\"><div class=\"ui-icon ui-icon-triangle-1-s\" >rollout</div></td></tr></table></td>"
                          ? "<td><div class=\"ui-wijgrid-filter ui-widget ui-state-default ui-corner-all\"><span class=\"ui-wijgrid-filtericon\"></span><input type=\"text\" class=\"ui-wijgrid-filter-input\" style=\"width:1px\" /><a class=\"ui-wijgrid-filter-trigger ui-corner-right ui-state-default\" href=\"#\"><span class=\"ui-icon ui-icon-triangle-1-s\"></span></a></div></td>"
                          : "<td>&nbsp;</td>";
                    }

                    $(tHeads["nw"]).append("<tr class=\"ui-wijgrid-filterrow ui-widget-content\">" + tmp + "</tr>");
                }

                if (tHeads["ne"]) { // unfixed columns area
                    var tmp = "";
                    for (var i = staticColumnIndex + 1, len = visibleLeaves.length; i < len; i++) {
                        var leaf = visibleLeaves[i];
                        tmp += ((leaf.dataIndex >= 0) && !leaf.isBand && leaf.showFilter)
                          ? "<td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td class=\"filterOp\" /><td class=\"filterEditor\"/><td>&nbsp;</td><td class=\"filterBtn ui-state-default ui-corner-all\"><div class=\"ui-icon ui-icon-triangle-1-s\" >rollout</div></td></tr></table></td>"
                          : "<td>&nbsp;</td>";
                    }

                    $(tHeads["ne"]).append("<tr class=\"ui-wijgrid-filterrow ui-widget-content\">" + tmp + "</tr>");
                }
            }
            // create filter end

            // colgroup

            // nw - sw
            var correspondTables = { t0: _viewTables["nw"], t1: _viewTables["sw"] };
            for (var key in correspondTables) {
                var colGroup = document.createElement("colgroup");
                for (var i = 0; i <= staticColumnIndex; i++) {
                    var col = document.createElement("col");

                    var leaf = visibleLeaves[i];
                    if (leaf.width) {
                        col.width = leaf.width; // set column width
                    }

                    colGroup.appendChild(col);
                }
                var table = correspondTables[key];
                table.appendChild(colGroup);
            }

            // ne - se
            correspondTables = { t0: _viewTables["ne"], t1: _viewTables["se"] };
            for (var key in correspondTables) {
                var colGroup = document.createElement("colgroup");
                for (var i = staticColumnIndex + 1; i < visibleLeaves.length; i++) {
                    var col = document.createElement("col");

                    var leaf = visibleLeaves[i];
                    if (leaf.width) {
                        col.width = leaf.width; // set column width
                    }

                    colGroup.appendChild(col);
                }
                var table = correspondTables[key];
                table.appendChild(colGroup);
            }
            // end colgroup


            // create body
            var data = gridView.dataTable;

            var tBodies = {};
            tBodies["nw"] = _viewTables["nw"].appendChild(document.createElement("tbody"));
            tBodies["ne"] = _viewTables["ne"].appendChild(document.createElement("tbody"));
            tBodies["sw"] = _viewTables["sw"].appendChild(document.createElement("tbody"));
            tBodies["se"] = _viewTables["se"].appendChild(document.createElement("tbody"));

            var domRowDataIndex = 0;
            var staticDataRowIndex = staticRowIndex - (spanTable.length + (gridView.options.showFilter ? 1 : 0));

            for (var ri = 0, rowLen = data.length; ri < rowLen; ri++) {
                var dataRow = data[ri];
                var dataRowLen = dataRow.length;

                var leftDomRow = null;
                var rightDomRow = null;

                if (ri <= staticDataRowIndex) {
                    leftDomRow = tBodies["nw"].insertRow(-1);
                    rightDomRow = tBodies["ne"].insertRow(-1);
                } else {
                    leftDomRow = tBodies["sw"].insertRow(-1);
                    rightDomRow = tBodies["se"].insertRow(-1);
                }

                var className = "ui-wijgrid-row ui-widget-content";
                switch (dataRow.rowType) {
                    case "data":
                        className += " ui-wijgrid-datarow";
                        leftDomRow.setAttribute("dataRowIndex", domRowDataIndex);
                        rightDomRow.setAttribute("dataRowIndex", domRowDataIndex);

                        if (domRowDataIndex % 2 !== 0) {
                            className += " ui-wijgrid-alternatingrow";
                        }

                        domRowDataIndex++;

                        break;

                    case "groupHeader":
                        className += " ui-wijgrid-groupheaderrow";
                        break;

                    case "groupFooter":
                        className += " ui-wijgrid-groupfooterrow";
                        break;
                }

                if (className) {
                    leftDomRow.className = className;
                    rightDomRow.className = className;
                }

                if (dataRow.display) {
                    leftDomRow.style.display = "none";
                    rightDomRow.style.display = "none";
                }

                if (dataRow.id) {
                    leftDomRow.id = dataRow.id;
                    rightDomRow.id = dataRow.id;
                }

                for (var ci = 0, cellLen = visibleLeaves.length; ci < cellLen; ci++) {
                    var leaf = visibleLeaves[ci];
                    var dataIndex = leaf.dataIndex;

                    var cellIndex = 0;
                    var doBreak = false;
                    var isDataRow = false;

                    switch (dataRow.rowType) {
                        case "data":
                            isDataRow = true;
                            cellIndex = dataIndex; // use [leaf -> data] mapping

                            if (cellIndex >= 0 && (!dataRow[cellIndex] || (dataRow[cellIndex].visible === false))) {
                                continue;  // spanned cell ?
                            }
                            break;

                        case "groupHeader":
                        case "groupFooter":
                            cellIndex = ci; // just iterate through all dataRow cells.

                            if (cellIndex >= dataRowLen) {
                                doBreak = true;  // don't extend group headers\ footers with additional cells
                            }
                    }

                    if (doBreak) {
                        break;
                    }

                    var domCell = document.createElement("td");

                    var cellValue = undefined;

                    if (cellIndex >= 0) {
                        if (isDataRow && leaf.dataParser) {
                            var dataValue = dataRow[cellIndex].value;

                            domCell.className = "wijdata-type-" + (leaf.dataType || "string");

                            if (leaf.dataType === "boolean") { // create checkbox
                                cellValue = (dataValue)
                                    ? "<input type=\"checkbox\" checked=\"checked\" disabled=\"disabled\" />"
                                    : "<input type=\"checkbox\" disabled=\"disabled\" />";
                            } else {
                                // format value using dataFormatString
                                cellValue = gridView._toStr(leaf, dataValue);
                            }

                        } else {
                            cellValue = dataRow[cellIndex].html; // use original html
                        }
                    }

                    if (!cellValue) {
                        cellValue = "&nbsp;"
                    }

                    if (ci === 0 && gridView.options.showRowHeader) {
                        domCell.className += " ui-wijgrid-rowheader";
                    }

                    domCell.className += " wijgridtd";

                    domCell.innerHTML = cellValue;

                    if (cellIndex >= 0) {
                        if (dataRow[cellIndex].rowSpan > 1) {
                            domCell.rowSpan = dataRow[cellIndex].rowSpan;
                        }

                        if (dataRow[cellIndex].colSpan > 1) {
                            domCell.colSpan = dataRow[cellIndex].colSpan;
                        }

                        if (dataRow[cellIndex].paddingLeft) {
                            domCell.style.paddingLeft = dataRow[cellIndex].paddingLeft;
                        }
                    }

                    if (ci <= staticColumnIndex) {
                        leftDomRow.appendChild(domCell);
                    } else {
                        rightDomRow.appendChild(domCell);
                    }
                }

                if (ri <= staticDataRowIndex) {

                    if (!leftDomRow.cells.length) {
                        tBodies["nw"].removeChild(leftDomRow);
                    }

                    if (!rightDomRow.cells.length) {
                        tBodies["ne"].removeChild(rightDomRow);
                    }
                } else {
                    if (!leftDomRow.cells.length) {
                        tBodies["sw"].removeChild(leftDomRow);
                    }

                    if (!rightDomRow.cells.length) {
                        tBodies["se"].removeChild(rightDomRow);
                    }
                }
            }

            var nwArea = gridView.element.find(".ui-wijgrid-split-area-nw");
            var neArea = gridView.element.find(".ui-wijgrid-split-area-ne");
            var swArea = gridView.element.find(".ui-wijgrid-split-area-sw");
            var seArea = gridView.element.find(".ui-wijgrid-content-area");

            nwArea[0].innerHTML = "";
            neArea[0].innerHTML = "";
            swArea[0].innerHTML = "";
            seArea[0].innerHTML = "";

            //alert("staticRowIndex=" + staticRowIndex + "\n" + _viewTables['se'].innerHTML);
            /* Note, empty() throws exception */
            $(_viewTables["nw"]).appendTo(nwArea);
            $(_viewTables["ne"]).appendTo(neArea);
            $(_viewTables["sw"]).appendTo(swArea);
            $(_viewTables["se"]).appendTo(seArea);

            /*dma*/
            /*
            if (gridView.$topPagerDiv) {
            gridView.$topPagerDiv.after(table);
            } else {
            gridView.element.prepend(table);
            }*/
            /*dma*/

            postRender();
            //alert("2-e:" + gridView.element.html());
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
            var joinedTables = this.getJoinedTables(false, rowIndex);
            var table0 = joinedTables[0];
            var table1 = joinedTables[1];
            if (table0 != null) {
                var relIdx = joinedTables[2];
                if (relIdx < table0.element().rows.length) {
                    var callbackResult = table0.forEachRowCell(relIdx, callback, param);
                    if (callbackResult != true) {
                        return callbackResult;
                    }
                }
                if ((table1 != null) && (relIdx < table1.element().rows.length)) {
                    var callbackResult = table1.forEachRowCell(relIdx, callback, param);
                    if (callbackResult != true) {
                        return callbackResult;
                    }
                }
            }
            return true;

        };

        this.forEachColumnCell = function (columnIndex, callback, param) {
            var joinedTables = this.getJoinedTables(true, columnIndex);
            if (joinedTables[0] != null) {
                var relIdx = joinedTables[2];
                var callbackRes = joinedTables[0].forEachColumnCell(relIdx, callback, param);
                if (callbackRes != true) {
                    return callbackRes;
                }

                if (joinedTables[1] != null) {
                    callbackRes = joinedTables[1].forEachColumnCell(relIdx, callback, param);
                    if (callbackRes != true) {
                        return callbackRes;
                    }
                }
            }
            return true;
        };

        this.ensureWidth = function (delta) {
            this._ensureWidth();
            var scroller = this.element.find(".ui-wijgrid-scroller");
            scroller.wijsuperpanel("paintPanel");
            this._ensureNEContainerWidth(scroller);
        };

        this._ensureNEContainerWidth = function (scroller) {
            var neContainer = this.element.find(".ui-wijgrid-split-area-ne");
            var controlWidth = gridView.options.width || this.element.width();
            var verScrollBarSize = 18;
            this._onScrolled();
            // set neContainer width
            if (scroller.data("wijsuperpanel").vNeedScrollBar) {
                neContainer.width(controlWidth - verScrollBarSize);
            }
            else {
                neContainer.width(controlWidth);
            }
        };

        this._ensureWidth = function () {
            var topTable = $(_table01.element());
            var bottomTable = $(_table11.element());
            var width = 0;
            $.each(_table01.colTags(), function (index, col) {
                width += parseInt(col.width);
            });
            topTable.width(width);
            bottomTable.width(width);
        };

        this.getCell = function (absColIdx, absRowIdx) {
            var joinedTablesRow = this.getJoinedTables(false, absRowIdx);
            if (joinedTablesRow[0] != null) {
                var joinedTablesCol = this.getJoinedTables(true, absColIdx);
                if (joinedTablesCol[0] != null) {
                    var relRowIdx = joinedTablesRow[2];
                    var relColIdx = joinedTablesCol[2];

                    var table = null;
                    if (joinedTablesRow[1] != null) {
                        table = (absColIdx == relColIdx) ? joinedTablesRow[0] : joinedTablesRow[1];
                    }
                    else {
                        table = joinedTablesRow[0];
                    }

                    var cellIdx = table.getCellIdx(relColIdx, relRowIdx);
                    if (cellIdx >= 0) {
                        return table.element().rows[relRowIdx].cells[cellIdx];
                    }
                }
            }
            return null;
        };

        this.getColumnIndex = function (cell) {
            var owner = null;
            for (owner = cell.parentNode; owner.tagName.toLowerCase() != "table"; owner = owner.parentNode) {
            }

            if (owner != null) {
                var htmlTable = null;
                var flag = false;

                if (owner == _table00.element()) {
                    htmlTable = _table00;
                }
                else {
                    if (owner == _table01.element()) {
                        htmlTable = _table01;
                        flag = true;
                    }
                    else {
                        if (owner == _table10.element()) {
                            htmlTable = _table10;
                        }
                        else {
                            if (owner == _table11.element()) {
                                htmlTable = _table11;
                                flag = true;
                            }
                        }
                    }
                }

                if (htmlTable != null) {
                    var colIdx = htmlTable.getColumnIdx(cell);
                    if (flag) {
                        colIdx += gridView._staticColumnIndex + 1;
                    }
                    return colIdx;
                }
            }
            return -1;
        };

        this.getAbsoluteRowIndex = function (domRow) {
            var index = domRow.rowIndex;
            var table = domRow.parentNode;
            while (table.tagName.toLowerCase() != "table") {
                table = table.parentNode;
            }

            //return (table == _table00.element() || table == _table01.element()) ? index : index + gridView.options.staticRowIndex + 1;
            return (table == _table00.element() || table == _table01.element()) ? index : index + gridView._getRealStaticRowIndex() + 1;
        };

        this.getJoinedCols = function (columnIndex) {
            var result = [];
            var joinedTables = this.getJoinedTables(true, columnIndex);
            joinedTables.splice(joinedTables.length - 1, 1);
            $.each(joinedTables, function (index, table) {
                result.push($(table.element()).find("col")[columnIndex]);
            });
            return result;
        };

        this.getJoinedRows = function (index, scope) {
            var row0 = null;
            var row1 = null;
            var table0 = null;
            var table1 = null;

            //var fixedRowIdx = gridView.options.staticRowIndex;
            var fixedRowIdx = gridView._getRealStaticRowIndex();
            var fixedColIdx = gridView._staticColumnIndex; // commented by YK for removing unsuppored options.
            var lastColIdx = gridView._field("leaves").length - 1;
            var lastRowIdx = _rowsCount - 1;

            var allRowsFixed = (fixedRowIdx == lastRowIdx);
            var allsRowUnfixed = (fixedRowIdx < 0);
            var rowsFixedSlice = !allRowsFixed && !allsRowUnfixed;

            var sectionLength = 0;
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
                    if (table1 != null) {
                        row1 = table1.getSectionRow(index, scope);
                    }
                }
            }

            if (allsRowUnfixed || (rowsFixedSlice && (row0 == null))) {
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

                if (table1 != null) {
                    row1 = table1.getSectionRow(index, scope);
                }
            }

            return (row0 == null && row1 == null) ? null : [row0, row1];
        };

        this.getJoinedTables = function (byColumn, index) {
            var t0 = null;
            var t1 = null;
            var idx = index;
            //var fixedRowIdx = gridView.options.staticRowIndex;
            var fixedRowIdx = gridView._getRealStaticRowIndex();
            var fixedColIdx = gridView._staticColumnIndex; //gridView.options.staticColumnIndex; //YK

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

                if (fixedRowIdx == _rowsCount - 1) // fixed row is the last row
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
                if (fixedColIdx == gridView._field("leaves").length - 1) {
                    t1 = null;
                }
            }

            if (t0 == null) {
                t0 = t1;
                t1 = null;
            }
            return [t0, t1, idx];

        };

        this.getHeaderCell = function (absColIdx) {
            var leaf = gridView._field("visibleLeaves")[absColIdx];

            var headerRow = gridView._headerRows();
            if (headerRow) {
                return new $.ui.wijgrid.rowAccessor().getCell(headerRow.item(leaf.thY), leaf.thX);
            }

            return null;
        };

        this.getAbsCellInfo = function (cell) {
            return new $.ui.wijgrid.cellInfo(this.getColumnIndex(cell), this.getAbsoluteRowIndex(cell.parentNode));
        };

        this.getVisibleAreaBounds = function () {
            return $.ui.wijgrid.bounds(gridView.element.find(".ui-wijsuperpanel-contentwrapper:first"));
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
            //$.ui.wijgrid.rowAccessor = function (view, scope, offsetTop, offsetBottom)
            var accessor = new $.ui.wijgrid.rowAccessor(this, 9/*all*/, 0);
            var rowLen = accessor.length();

            var heights = new Array(); // int[rowLen];

            for (var i = 0; i < rowLen; i++) {
                var rowObj = this.getJoinedRows(i, 9/*all*/); // = accessor[i];

                var row0 = rowObj[0];
                var len0 = (row0 != null) ? row0.cells.length : 0;
                var row0Span = false;

                for (var j = 0; j < len0 && !row0Span; j++) {
                    row0Span = (row0.cells[j].rowSpan > 1);
                }

                var row1 = rowObj[1];
                var len1 = (row1 != null) ? row1.cells.length : 0;
                var row1Span = false;

                if (!row0Span) {
                    for (var j = 0; j < len1 && !row1Span; j++) {
                        row1Span = (row1.cells[j].rowSpan > 1);
                    }
                }

                var row0h = (row0 != null && len0 > 0) ? row0.offsetHeight : 0;
                var row1h = (row1 != null && len1 > 0) ? row1.offsetHeight : 0;

                heights[i] = (row0Span || row1Span) ? Math.min(row0h, row1h) : Math.max(row0h, row1h);
            }

            //var tmp = _mainTable.element().style.display;
            //_mainTable.element().style.display = "none"; // hide _mainTable to speed up calculations (under IE especially)

            for (var i = 0; i < rowLen; i++) {
                var row = this.getJoinedRows(i, 9/*all*/); // = accessor[i];
                //wijgridRowsAccessor.iterateCells(row, this.setCellContentDivHeight, heights[i]);
                accessor.iterateCells(row, this.setCellContentDivHeight, heights[i]);
            }
            //_mainTable.element().style.display = tmp;
        };

        this.setCellContentDivHeight = function (cell, param) {
            cell.style.height = param + "px";
            return true;
        };

        // private
        function postRender() {
            //_dataTable = new $.ui.wijgrid.htmlTableAccessor(gridView.element.find(" > table")[0])
            //_dataTable = new $.ui.wijgrid.htmlTableAccessor(gridView.element.find(" table")[0])            
            _table00 = new $.ui.wijgrid.htmlTableAccessor(_viewTables["nw"]);
            _table01 = new $.ui.wijgrid.htmlTableAccessor(_viewTables["ne"]);
            _table10 = new $.ui.wijgrid.htmlTableAccessor(_viewTables["sw"]);
            _table11 = new $.ui.wijgrid.htmlTableAccessor(_viewTables["se"]);

        };
        // private

    }
});$.extend($.ui.wijgrid, {

    resizer: function(gridView) {
        var _elements = [];
        var _gap = 10;
        var _step = 1;
        var _evntFormat = "{0}." + gridView.widgetName + ".resizer";
        var _inProgress = false;
        var _hoveredField = null;

        var _docCursor;

        var _startLocation = null;
        var _lastLocation = null;

        var _proxy = null;

        this.addElement = function(c1basefield) {

            c1basefield.element
                .bind(eventKey("mousemove"), _onMouseMove)
                .bind(eventKey("mousedown"), _onMouseDown)
                .bind(eventKey("mouseout"), _onMouseOut);

            _elements.push(c1basefield);
        };

        this.dispose = function() {
            $.each(_elements, function(index, c1basefield) {
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
        };

        function _onMouseOut(e) {
            if (!_inProgress) {
                if (_hoveredField) {
                    _hoveredField.element.css("cursor", "");
                    //_hoveredField.element.find("> a").css("cursor", "");
                    _hoveredField = null;
                }
            }
        };

        function _onMouseDown(e) {
            _hoveredField = getFieldByPos({ x: e.pageX, y: e.pageY });
            if (_hoveredField && _hoveredField._canSize() && gridView._canInteract()) {
                try {
                    _hoveredField.element.css("cursor", "");
                    //_hoveredField.element.find("> a").css("cursor", "");

                    _docCursor = document.body.style.cursor;
                    document.body.style.cursor = "e-resize";
                    _startLocation = _lastLocation = $.ui.wijgrid.bounds(_hoveredField.element);

                    _proxy = $("<div class=\"ui-wijgrid-resizehandle ui-state-highlight\">&nbsp;</div>");

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
        };

        function _onDocumentMouseMove(e) {
            var deltaX = _step * Math.round((e.pageX - _lastLocation.left) / _step);
            _lastLocation = { left: _lastLocation.left + deltaX, top: e.pageY };
            _proxy.css("left", _lastLocation.left);
        };

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
        };

        function _onSelectStart(e) {
            e.preventDefault();
        };

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
        };

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
        };

        function getFieldByPos(mouse) {
            for (var i = 0, len = _elements.length; i < len; i++) {
                var c1basefield = _elements[i];
                var bounds = $.ui.wijgrid.bounds(c1basefield.element);

                var res = $.ui.isOver(mouse.y, mouse.x,
                    bounds.top, bounds.left + bounds.width - _gap,
                    bounds.height, _gap);

                if (res) {
                    return c1basefield;
                }
            }

            return null;
        };

        function eventKey(eventType) {
            return $.ui.wijgrid.stringFormat(_evntFormat, eventType);
        };
    }
});


