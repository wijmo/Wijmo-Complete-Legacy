/*globals jQuery,window,document*/
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
 * * Wijmo Combobox widget.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.ui.wijlist.js
 *
 */
"use strict";
(function ($) {
	var inputCSS = "wijmo-wijcombobox-input",
		stateHover = "ui-state-hover",
		stateActive = "ui-state-active",
		stateFocus = "ui-state-focus",
		conerLeft = "ui-corner-left",
		conerRight = "ui-corner-right",
		triggerHTML = "<div class='wijmo-wijcombobox-trigger ui-state-default " +
							"ui-corner-right'>" +
							"<span class='ui-icon ui-icon-triangle-1-s'></span>" +
						"</div>",
		labelHTML = "<label class='wijmo-wijcombobox-label ui-widget-content'></label>";

	$.widget("wijmo.wijcombobox", {
		options: {
			/// <summary>
			/// A value that specifies the underlying data source provider of wijcombobox.
			/// Default: null.
			/// Type: wijdatasource/Array
			/// </summary>
			/// <remarks>
			/// This option could either be a wijdatasource object 
			/// or an Object Array containing an item such as 
			/// {label: "label text", value: "value"}.
			/// </remarks>
			data: null,
			/// <summary>
			/// A value that specifies the text in the wijcombobox label.
			/// Default: null.
			/// Type: String.
			/// </summary>
			labelText: null,
			/// <summary>
			/// A value that determines the minimum length of text 
			/// that can be entered in the wijcombobox text box to issue an AJAX request.
			/// Default: 4.
			/// Type: Number.
			/// </summary>
			minLength: 4,
			/// <summary>
			/// A value that determines the duration (in milliseconds) of the time 
			/// to delay before autocomplete begins after typing stops.
			/// Default: 300.
			/// Type: Number.
			/// </summary>
			delay: 300,
			/// <summary>
			/// A value that specifies the animation options for a drop-down list
			/// when it is visible.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			showingAnimation: null,
			/// <summary>
			/// A value specifies the animation options for the drop-down list
			/// when it is hidden.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			hidingAnimation: null,
			/// <summary>
			/// A value that determines whether to show the trigger of wijcombobox.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showTrigger: true,
			/// <summary>
			/// A value that specifies the position of the drop-down list trigger.
			/// Default: "right".
			/// Type: String.
			/// </summary>
			triggerPosition: "right",
			/// <summary>
			/// A value that specifies the height of the drop-down list.
			/// Default: 300.
			/// Type: Number.
			/// </summary>
			/// <remarks>
			/// If the total height of all items is less than the value of this option,
			/// it will use the total height of items as the height of the drop-down list.
			/// </remarks>
			dropdownHeight: 300,
			/// <summary>
			/// A value that specifies the width of the drop-down list.
			/// Default: "auto".
			/// Type: Number/String("auto").
			/// </summary>
			/// <remarks>
			/// When this option is set to "auto", the width of the drop-down
			/// list is equal to the width of wijcombobox.
			/// </remarks>
			dropdownWidth: "auto",
			/// <summary>
			/// A value that determines whether to select the item 
			/// when the item gains focus or is activated.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			selectOnItemFocus: false,
			/// <summary>
			/// A value determines whether to shorten the drop-down list items 
			/// by matching the text in the textbox after typing.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			autoFilter: true,
			/// <summary>
			/// A value that determines whether to start the auto-complete 
			/// function after typing in the text if a match exists.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			autoComplete: true,
			/// <summary>
			/// A value that determines whether to highlight the keywords in an item. 
			/// If "abc" is typed in the textbox, 
			/// all "abc" matches are highlighted in the drop-down list.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			highlightMatching: true,
			/// <summary>
			/// A value that specifies the position options of the drop-down list.
			/// The default value of the "of" options is the input of wijcombobox.
			/// Default: {}.
			/// Type: Object.
			/// </summary>
			dropDownListPosition: {},
			/// <summary>
			/// An array that specifies the column collections of wijcombobox.
			/// Example: columns: [{name: "header1", width: 150},
			///                    {name: "header2", width: 150},
			///                    {name: "header3", width: 150}]
			/// Default: [].
			/// Type: Array.
			/// </summary>
			columns: [],
			/// <summary>
			/// A value that specifies the selection mode of wijcombobox.
			/// Default: "Single".
			/// Type: String.
			/// <remarks>
			/// Possible options are: "single" and "multiple".
			/// </remars>
			/// </summary>
			selectionMode: "single",
			/// <summary>
			/// A value that specifies the separator for 
			/// the multiple selected items text in the textbox.
			/// Default: ",".
			/// Type: String.
			/// </summary>
			multipleSelectionSeparator: ",",
			/// <summary>
			/// A value that determines whether to check the input text against 
			/// the text of the selected item when the focus blurs. 
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			/// <remarks>
			/// If the text does not match any item, input text will restore 
			/// to text the selected item or empty if no item is selected.  
			/// </remarks>
			forceSelectionText: false,
			/// <summary>
			/// A function called when any item in list is selected.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj that relates to this event.
			/// </param>
			/// <param name="item" type="Object">
			/// The item selected.
			/// </param>
			select: null,
			/// <summary>
			/// A value that determines whether input is editable.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			isEditable: true,
			/// <summary>
			/// A value that specifies the index of the item to select 
			/// when using single mode.
			/// If the selectionMode is "multiple", then this option could be set 
			/// to an array of Number which contains the indices of the items to select.
			/// Default: -1.
			/// Type: Number/Array.
			/// </summary>
			/// <remarks>
			/// If no item is selected, it will return -1.
			/// </remarks>
			selectedIndex: -1,
			/// <summary>
			/// A function called when drop-donw list is opened.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			open: null,
			/// <summary>
			/// A function called when drop-donw list is closed.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			close: null,
			/// <summary>
			/// A value added to the width of the target select element 
			/// to account for the scroll bar width of superpanel.
			/// Default: 6.
			/// Type: Number.
			/// <remarks>
			/// Unit for this value is pixel.
			/// Because the width of the scroll bar may be different between browsers 
			/// if wijcombobox is initialized with the width of the HTML select element, 
			/// the text may be hidden by the scroll bar of wijcombobox. 
			/// </remarks>
			/// </summary>
			selectElementWidthFix: 6,
			/// <summary>
			/// A function called before searching the list.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj that relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// data.datasrc: The datasource of wijcombobox.
			/// data.term: The text to search.
			/// </param>
			search: null,
			/// <summary>
			/// A function called when select item is changed.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj that relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// data.oldItem: The old item.
			/// data.newItem: The new item.
			/// data.oldIndex: The old index of selected item.
			/// data.newIndex: The new index of selected item.
			/// </param>
			changed: null,
			/// <summary>
			/// The object contains the options of wijlist.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			listOptions: null
		},

		_create: function () {
			var t = this;
			// inits selected items
			t.selectedItem = null;
			t.selectedItems = [];

			// inits wijcombobox
			t._createDOMElements();
			t._bindInputEvents();
			t._initDropDownList();
			t.repaint();
			t._checkSelectIndex();
		},

		_checkSelectIndex: function () {
			var self = this, index;

			index = self.options.selectedIndex;
			if (!self._usingRemoteData() && (index >= 0 || $.isArray(index))) {
				self.search(null, "checkindex");
			}
		},

		repaint: function () {
			/// <summary>
			/// Repaints wijcombobox. Returns true if it succeeds; 
			/// otherwise, returns false.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if it succeeds; otherwise, returns false.
			/// </returns>

			var self = this;
			if (self.element.is(":visible") || 
			(self._select !== undefined && self._input.is(":visible"))) {
				self._showTrigger();
				if (self.options.disabled) {
					self.disable();
				}
				return true;
			}
			return false;
		},

		_bindInputEvents: function () {
			var self = this, input, o, code, keyCode;

			input = self._input;
			o = self.options;
			// self.element is an html input element.
			input.bind("keydown.wijcombobox", function (event) {
				if (o.disabled === true) {
					return;
				}
				code = event.keyCode;
				keyCode = $.ui.keyCode;
				switch (code) {
				case keyCode.UP:
					self._move("previous", event);
					// prevent moving cursor to beginning of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.DOWN:
					self._move("next", event);
					// prevent moving cursor to end of text field in some browsers
					event.preventDefault();
					break;
				case keyCode.ENTER:
					// when menu is open or has focus
					if (self.menu.active) {
						event.preventDefault();
						self.menu.select(event); 
					}
					break;
					//passthrough - ENTER and TAB both select the current element
				case keyCode.TAB:
					input.trigger("wijcomboblur");
					if (!self.menu.active || 
					(o.selectionMode === "multiple" && keyCode.TAB === code)) {
						return;
					}
					self.menu.select(event);
					// remove selection from input.
					var end = input.val().length;
					self._selectText(end, end, input);

					break;
				case keyCode.ESCAPE:
					self.close(event);
					break;
				case keyCode.LEFT:
				case keyCode.RIGHT:
				case keyCode.SHIFT:
				case keyCode.CONTROL:
				case keyCode.HOME:
				case keyCode.END:
				case keyCode.DELETE:
				case keyCode.PAGE_UP:
				case keyCode.PAGE_DOWN:
					// ignore metakeys (shift, ctrl, alt)
					break;
				case 18: //alt key
					input.trigger("wijcomboblur");
					break;
				default:
					// keypress is triggered before the input value is changed
					window.clearTimeout(self.searching);
					if (o.isEditable === false) {
						if (self._cacheKey === undefined) {
							self._cacheKey = "";
						}
						self._cacheKey += String.fromCharCode(code);
					}
					self.searching = window.setTimeout(function () {
						var term;
						if (o.isEditable === false) {
							term = self._cacheKey;
							self._cacheKey = undefined;
						}
						else {
							term = input.val();
						}
						self.search(term, event);
					}, o.delay);
					break;
				}
			}).bind("wijcomboblur.wijcombobox", function (event) {
				window.clearTimeout(self.searching);
				self._addInputFocus(false, stateFocus);
				// TODO try to implement this without a timeout, 
				// see clearTimeout in search()
				self.closing = window.setTimeout(function () {
					self.close(event, true);
				}, 150);

			}).bind("focus.wijcombobox", function () {
				self._addInputFocus(true, stateFocus);
			}).bind("blur.wiicombobox", function () {
				if (!self.menu.element.is(":visible")) {
					input.trigger("wijcomboblur");
				}
				self._change();
			});
		},

		_addInputFocus: function (add, css) {
			var self = this, wrap, key, arrow;

			wrap = self._input.parent();
			key = add ? "addClass" : "removeClass";
			arrow = self._triggerArrow;
			wrap[key](css);
			if (arrow !== undefined) {
				arrow[key](css);
			}
		},

		_renderColumnsHeader: function (header) {
			var ul = $("<ul class='wijmo-wijcombobox-rowheader'></ul>");
			$.each(this.options.columns, function (index, column) {
				var li = $("<li class='wijmo-wijcombobox-cell ui-widget-header'></li>");
				li.html(column.name);
				if (column.width !== undefined) {
					li.width(column.width);
				}
				li.appendTo(ul);
			});
			header.append(ul);
		},

		_hasSameValueText: function (item1, item2) {
			return item1.label === item2.label && item1.value === item2.value;
		},

		_initDropDownList: function () {
			var self = this, doc, menuElement, o, header, listOptions;

			doc = self.element[0].ownerDocument;
			menuElement = $("<div class='wijmo-wijcombobox-list'></div>");
			o = self.options;
			if (o.columns.length > 0) {
				menuElement.addClass("wijmo-wijcombobox-multicolumn");
				header = $("<div class='wijmo-wijsuperpanel-header " +
				"ui-state-default'></div>");
				self._renderColumnsHeader(header);
				menuElement.append(header);
			}

			listOptions = {
				keepHightlightOnMouseLeave: true,
				selectionMode: o.selectionMode,
				addHoverItemClass: o.columns.length === 0,
				focus: function (e, item) {
					var i = item;
					if (o.selectOnItemFocus) {
						self.menu.select(null, {
							notCloseAfterSelected: true
						});
					}
					if (o.columns.length > 0) {
						i.element.prev().addClass("wijmo-wijcombobox-active-prev");
						i.element.find(".wijmo-wijcombobox-row>.wijmo-wijcombobox-cell")
						.addClass("ui-state-hover");
					}
				},
				selected: function (event, ui) {
					window.clearTimeout(self.closing);
					var mode = o.selectionMode, item, newIndex, oldIndex, oldItem;

					item = ui.item;
					if (self._trigger("select", event, item)) {
						if (mode === "single") { // single mode selection
							// local data select
							if (!self._usingRemoteData()) {
								newIndex = $.inArray(item, self.items);
								if (newIndex !== o.selectedIndex) {
									self._input.val(item.label);
									oldItem = self.selectedItem;
									if (oldItem !== null) {
										oldItem.selected = false;
									}
									self.selectedItem = item;
									oldIndex = o.selectedIndex;
									o.selectedIndex = newIndex;
									// fire select change event 
									if (self._select !== undefined) {
										self._select[0].selectedIndex = o.selectedIndex;
										self._select.trigger("change");
									}
									self._trigger("changed", null, {
										oldItem: oldItem,
										selectedItem: self.selectedItem,
										newIndex: o.selectedIndex,
										oldIndex: oldIndex
									});
								}
							}
							else {
								// If items have the same text and value, 
								// they are considered to be same in remote mode.
								if (self.selectedItem === null || 
								!self._hasSameValueText(item, self.selectedItem)) {
									self._input.val(item.label);
									self.selectedItem = item;
									self._trigger("changed", null, {
										selectedItem: item
									});
								}
							}
						}
						else { // multiple selection mode
							if (!self._usingRemoteData()) {

								self.selectedItems = ui.selectedItems;
								self._selectedItemsToInputVal(self.selectedItems);
								self._trigger("changed", null, {
									selectedItem: item,
									selectedItems: self.selectedItems
								});
								///TODO: show helper list
							}
						}
					}
					if ((ui.data === undefined || !ui.data.notCloseAfterSelected) && 
					mode === "single") {
						self.close(event);
					}
				},
				blur: function (e, item) {
					var d = item.element;
					if (o.columns.length > 0) {
						d.find(".wijmo-wijcombobox-row>.wijmo-wijcombobox-cell")
						.removeClass("ui-state-hover");
						d.prev().removeClass("wijmo-wijcombobox-active-prev");
					}
				},
				itemrendering: function (event, data) {
					var item = data, css;
					css = "";
					if (item.isSeparator) {
						css += " wijmo-wijcombobox-separator";
					}
					if (item.selected) {
						css += " wijmo-wijcombobox-selecteditem";
					}
					if (css.length > 0) {
						item.element.addClass(css);
					}
					if (self._keypress && o.isEditable && 
					o.columns.length === 0 && o.highlightMatching && 
					$.trim(self._input.val()).length > 0) {
						item.text = item.label.replace(
						new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + 
						self._escapeRegex(self._input.val()) + 
						")(?![^<>]*>)(?![^&;]+;)", "gi"), 
						"<span class='ui-priority-primary'>$1</span>");
					}
					else {
						item.text = undefined;
					}
				},
				itemrendered: function (event, data) {
					var item = data, li, u;
					if (item.cells === undefined) {
						return;
					}
					li = item.element;
					li.empty();
					u = $("<ul class='wijmo-wijcombobox-row'></ul>");
					$.each(item.cells, function (index, cell) {
						var l = $("<li class='wijmo-wijcombobox-cell " +
						"ui-state-default'></li>");
						l.append(cell);
						l.attr("title", cell);
						u.append(l);
					});
					li.append(u);
				},
				superPanelOptions: {
					resized: function (e) {
						var m = self.menu, ele = m.element;
						o.dropdownWidth = ele.outerWidth();
						o.dropdownHeight = ele.outerHeight();
						self._positionList();
						self.menu.refreshSuperPanel();
					}
				}
			};
			listOptions = $.extend(true, listOptions, o.listOptions);
			self.menu = menuElement.appendTo("body", doc)
						.wijlist(listOptions)
						.zIndex(self._input.zIndex() + 1).css({
				top: 0,
				left: 0
			}).hide().data("wijlist");
			self._menuUL = self.menu.ul;
		},

		_selectedItemsToInputVal: function (items) {
			var s = "", self, sep;

			self = this;
			sep = self.options.multipleSelectionSeparator;
			self.selectedItems = items;

			$.each(items, function (index, item) {
				s += item.label + sep;
			});
			if (s.length > 0) {
				s = s.substr(0, s.lastIndexOf(sep));
			}
			self._input.val(s);
		},

		_createDOMElements: function () {
			var self = this, comboElement, ele, input;
			comboElement =
				$("<div role='combobox' class='wijmo-wijcombobox " +
					"ui-widget ui-helper-clearfix'>" +
					"<div class='wijmo-wijcombobox-wrapper " +
					"ui-state-default ui-corner-all'>" +
					"</div>" +
				"</div>");
			// check if element is  a select element
			ele = self.element;
			self._comboElement = comboElement;
			// create from a select element
			if (ele[0].tagName.toLowerCase() === "select") {
				self._select = ele;
				// add class to set font size to get the correct width of select.
				ele.addClass("ui-widget");
				input = self._input = $("<input role='textbox' " +
				"aria-autocomplete='list' aria-haspopup='true' />")
				.insertAfter(ele);
				self.options.data = self._convertSelectOptions();
			}
			else {
				input = self._input = ele;
			}
			comboElement.insertBefore(input);
			comboElement.children(".wijmo-wijcombobox-wrapper").append(input);
			input.attr({
				autocomplete: "off",
				role: "textbox",
				"aria-wijcombobox": "list",
				"aria-haspopup": "true"
			}).addClass(inputCSS);
			self._oldWidth = ele.css("width");
			if (self.options.isEditable === false) {
				input.attr("readonly", "readonly");
			}
			comboElement.bind("mouseenter", function () {
				self._addInputFocus(true, stateHover);
			}).bind("mouseleave", function () {
				self._addInputFocus(false, stateHover);
			});
		},

		_convertSelectOptions: function () {
			var items = [], self;

			self = this;
			$.each(self._select.attr("options"), function (idx, opt) {
				items.push({ label: opt.text, value: opt.value });
			});
			self.options.selectedIndex = self._select[0].selectedIndex;
			return items;
		},

		getComboElement: function () {
			return this._comboElement;
		},

		_showTrigger: function () {
			var self = this, o, input, inputWrapper, comboElement, 
			trigger, label, sp, padding, labelPadding, triggerPadding;

			o = self.options;
			input = self._input;
			inputWrapper = input.parent();
			comboElement = self._comboElement;
			trigger = self._triggerArrow;
			label = self._label;

			// set size
			if (self._select !== undefined) {
				input.width(self._select.width() + 
				(o.data.length > 20 ? o.selectElementWidthFix : 0));
				self._select.hide();
			}
			comboElement.width(inputWrapper[0].offsetWidth);
			//comboElement.height(inputWrapper[0].offsetHeight);

			// show label
			if (o.labelText !== null) {
				label = self._label = $(labelHTML);
				inputWrapper.append(label.html(o.labelText));
			}
			else {
				if (label !== undefined) {
					label.remove();
					self._label = undefined;
				}
			}

			if (o.showTrigger) {
				input.removeClass("ui-corner-all");
				if (trigger === undefined) {
					trigger = self._triggerArrow = $(triggerHTML);
					comboElement.append(trigger);
					trigger.bind("mouseover.triggerevent", self, function (e) {
						if (o.disabled === true) {
							return;
						}
						var ct = $(e.currentTarget);
						ct.addClass(stateHover);
					}).bind("mousedown.triggerevent", self, function (e) {
						if (o.disabled === true) {
							return;
						}
						var ct = $(e.currentTarget);
						ct.addClass(stateActive);
					}).bind("mouseup.triggerevent", self, function (e) {
						var ct = $(e.currentTarget);
						ct.removeClass(stateActive);
					}).bind("click.triggerevent", self, function () {
						if (o.disabled === true) {
							return;
						}
						self._triggerClick();
					});
				}
				if (o.triggerPosition === "right") {
					trigger.css({ left: "", right: "0px" });
					trigger.removeClass(conerLeft);
					trigger.addClass(conerRight);
				}
				else {
					trigger.css({ "right": "", "left": "0px" });
					trigger.removeClass(conerRight);
					trigger.addClass(conerLeft);
				}
				trigger.setOutHeight(comboElement.innerHeight());
				sp = trigger.find("span");
				sp.css("margin-left", (trigger.innerWidth() - sp[0].offsetWidth) / 2);
				sp.css("margin-top", (trigger.innerHeight() - sp[0].offsetHeight) / 2);
			}
			else {
				if (trigger !== undefined) {
					trigger.unbind(".triggerevent");
					trigger.remove();
					self._triggerArrow = undefined;
				}
				input.removeClass("ui-corner-left");
				input.removeClass("ui-corner-right");
				input.addClass("ui-corner-all");
			}

			// padding
			padding = labelPadding = triggerPadding = 0;
			if (label !== undefined) {
				labelPadding += label[0].offsetWidth;
			}
			if (trigger !== undefined) {
				triggerPadding = trigger[0].offsetWidth;
			}
			padding = labelPadding + triggerPadding;
			input.setOutWidth(inputWrapper.innerWidth() - padding);
			padding = padding === 0 ? "" : padding;
			if (o.triggerPosition === "right") {
				input.css("margin-left", "");
				input.css("margin-right", padding);
				if (label !== undefined) {
					label.css("left", "");
					label.css("right", triggerPadding);
				}
			}
			else {
				input.css("margin-right", "");
				input.css("margin-left", padding);

				if (label !== undefined) {
					label.css("right", "");
					label.css("left", triggerPadding);
				}
			}
		},

		_triggerClick: function (e) {
			var self = this, term = "";
			window.clearTimeout(self.closing);
			if (self.menu.element.is(":visible")) {
				self.close();
			}
			else {
				// TODO: click open should not render again.
				if (self._usingRemoteData()) {
					term = self._input.val();
				}
				self.search(term, e);
			}
		},

		destroy: function () {
			/// <summary>
			/// Destroys the wijcombobox.
			/// </summary>

			var self = this,
			ele = self.element;
			if (self.options.isEditable === false) {
				ele.removeAttr("readonly");
			}
			if (self._select !== undefined) {
				self._select.removeClass("ui-widget");
				self._select.show();
				self._input.remove();
			}
			else {
				ele.css("width", self._oldWidth);
				ele.removeClass(inputCSS);
				ele.removeAttr("autocomplete").removeAttr("role")
				.removeAttr("aria-wijcombobox").removeAttr("aria-haspopup");
				ele.insertBefore(self._comboElement);
				ele.css("padding", "");
			}
			self._comboElement.remove();
			self.menu.destroy();
			self.menu.element.remove();
			$.Widget.prototype.destroy.call(self);
		},

		_setOption: function (key, value) {
			var self = this, ele, input;
			ele = self._comboElement;
			input = self.element;
			$.Widget.prototype._setOption.apply(self, arguments);
			if (key === "disabled") {
				if (value) {
					ele.addClass("wijmo-wijcombobox-disabled ui-state-disabled");
					input.attr("disabled", "disabled");
					self.close();
				}
				else {
					ele.removeClass("wijmo-wijcombobox-disabled ui-state-disabled");
					input.removeAttr("disabled");
				}
			}
			else if (key === "isEditable") {
				if (value) {
					input.attr("readonly", "readonly");
				}
				else {
					input.removeAttr("readonly");
				}
			}
		},

		search: function (value, eventObj) {
			/// <summary>
			/// Searches the wijcombobox drop-down list for the given value. 
			/// </summary>
			/// <param name="value" type="String">
			/// Text to search in the drop-down list
			/// </param>

			var self = this, o, datasource, d;

			o = self.options;
			datasource = o.data;
			window.clearTimeout(self.closing);
			d = {
				value: value,
				e: eventObj,
				self: self
			};

			// load data when data is not loaded yet 
			// or datasource is using a proxy to obtain data.
			if (datasource !== null) {
				// check index will skip search event
				if (eventObj !== "checkindex") {
					if (self._trigger("search", eventObj, 
					{ datasrc: datasource, term: d }) === false) {
						return;
					}
				}

				if ($.isArray(datasource)) {
					self._hideShowArrow(false);
					self._onListLoaded(datasource, d);
				}
				else {
					if (self._usingRemoteData() && 
					eventObj !== undefined && value.length < o.minLength) {
						return;
					}
					self._hideShowArrow(false);
					datasource.loaded = self._onListLoaded;
					datasource.load(d);
				}
			}
		},

		_usingRemoteData: function () {
			var o = this.options.data, r = false;
			if (!$.isArray(o) && o !== null && o.proxy !== null) {
				r = true;
			}
			return r;
		},

		_hideShowArrow: function (show) {
			// hide arrow to show
			var self = this, input, arrow;

			input = self.element;
			arrow = self._triggerArrow;
			if (arrow !== undefined) {
				arrow[show ? "show" : "hide"]();
			}
			input[show ? "removeClass" : "addClass"]("wijmo-wijcombobox-loading");
		},

		_onListLoaded: function (datasource, data) {
			var self = data.self, ele, o, searchTerm, items, idx, itemsToRender;

			ele = self._input;
			o = self.options;
			searchTerm = data.value;
			items = $.isArray(datasource) ? datasource : datasource.items;
			self.items = items;
			if (data.e === "checkindex") {
				idx = o.selectedIndex;
				if (o.selectionMode === "multiple" && $.isArray(idx)) {
					$.each(idx, function (i, n) {
						var itm = items[n];
						itm.selected = true;
						self.selectedItems.push(itm);
					});
					self._selectedItemsToInputVal(self.selectedItems);
				}
				else {
					items[idx].selected = true;
					self.selectedItem = items[idx];
					ele.val(self.selectedItem.label);
				}
				self._hideShowArrow(true);
				return;
			}
			// only fileter result when using local data.
			if (!self._usingRemoteData()) {
				self._filter(items, searchTerm);
				itemsToRender = $.grep(items, function (item1) {
					return !o.autoFilter || item1.match;
				});
			}
			else {
				self._topHit = null;
				itemsToRender = items;
			}
			if (itemsToRender.length > 0) {
				// open dropdown list
				self._openlist(itemsToRender, data);
				// trigger dropdown open event.
				self._trigger("open");
				self._addInputFocus(true, stateFocus);
			}
			else {
				self.close(null, true);
			}
			self._hideShowArrow(true);
		},

		close: function (event, skipAnimation) {
			/// <summary>
			/// Closes drop-down list.
			/// </summary>
			/// <param name="event" type="EventObj">
			/// EventObj width this method, normally null.
			/// </param>
			/// <param name="skipAnimation" type="Boolean">
			/// A value indicating whehter to skip animation.
			/// </param>
			var self = this, menu, hidingAnimation;
			menu = self.menu;
			window.clearTimeout(self.closing);
			// test parent element is need, 
			// because some effect will wrap the target element.
			if (menu.element.is(":visible") && !menu.element.is(":animated") &&
				!menu.element.parent().is(":animated")) {
				self._trigger("close", event);
				menu.deactivate();
				hidingAnimation = self.options.hidingAnimation;
				if (skipAnimation !== true && hidingAnimation) {
					menu.element.hide(
					hidingAnimation.effect,
					hidingAnimation.options,
					hidingAnimation.speed,
					hidingAnimation.callback);
				}
				else {
					menu.element.hide();

				}
				self._addInputFocus(self, stateFocus);
				$(document).unbind("click", self.closeOnClick);
			}
		},

		_change: function () {
			// TODO: finish _change event.
			var self = this, o, f, m, ele, t, itm;

			o = self.options;
			f = o.forceSelectionText;
			m = o.selectionMode;
			ele = self._input;
			t = ele.val();
			itm = self.selectedItem;

			if (f) {
				if (m === "single") {
					if (itm !== null) {
						if (itm.label !== t) {
							ele.val(itm.label);
						}
					}
					else {
						ele.val("");
					}
				}
			}
			if (m === "multiple") {
				self._selectedItemsToInputVal(self.selectedItems);
			}
		},

		_openlist: function (items, data) {
			var self = data.self, eventObj = data.e, keypress, textWidth, menuElement, 
			o, oldPadding, verticalBorder = 2, dropDownHeight, h, showingAnimation;
			keypress = self._keypress = !!eventObj;
			o = self.options;
			menuElement = self.menu.element;

			menuElement.zIndex(self.element.zIndex() + 1);
			self.menu.setItems(items);
			self.menu.renderList();
			// show dropdown
			self.menu.element.show();
			if (o.dropdownWidth === "auto") {
				textWidth = self._comboElement.outerWidth();
			}
			else {
				textWidth = o.dropdownWidth;
			}
			oldPadding = menuElement.css("padding");
			menuElement.css("padding", "0px");
			menuElement.setOutWidth(textWidth);
			menuElement.css("padding", oldPadding);

			dropDownHeight = o.dropdownHeight;
			if (self._select !== undefined) {
				dropDownHeight = 20 * self._menuUL
				.children(".wijmo-wijlist-item:first").outerHeight();
			}
			h = Math.min(self._menuUL.outerHeight() + verticalBorder, dropDownHeight);
			menuElement.setOutHeight(h);
			self.menu.refreshSuperPanel();
			self._positionList();
			if (!keypress && self.selectedItem !== undefined) {
				self.menu.activate(null, self.selectedItem, true);
			}
			if (keypress && eventObj.keyCode !== $.ui.keyCode.BACKSPACE) {
				if (o.isEditable) {
					self._runAutoComplete();
				}
				else {
					self.menu.activate(null, self._topHit, true);
				}
			}
			else {
				showingAnimation = self.options.showingAnimation;
				if (o.showingAnimation !== null && 
				!(eventObj !== undefined && 
				eventObj.keyCode === $.ui.keyCode.BACKSPACE)) {
					self.menu.element.hide();
					//Add comments by RyanWu@20101105.
					//For fixing the issue that list items are transparent 
					//when choosing bounce effect. 

					//self.menu.element.show(
					//showingAnimation.effect, 
					//showingAnimation.options, 
					//showingAnimation.speed, 
					//showingAnimation.callback);
					self.menu.element.show(
					showingAnimation.effect, 
					showingAnimation.options, 
					showingAnimation.speed, 
					function () {
						if (showingAnimation.callback) {
							showingAnimation.callback.apply(this, arguments);
						}

						if ($.browser.msie) {
							menuElement.css("filter", "");
						}
					});
					//end by RyanWu@20101105.
				}
			}
			$(document).bind("click", self, self.closeOnClick);
		},

		closeOnClick: function (e) {
			var self = e.data, t = e.target;

			if (!$.contains(self._comboElement[0], t) && 
			!$.contains(self.menu.element[0], t)) {
				self.close();
			}
		},

		_positionList: function () {
			var self = this, positionOptions, defaultPosition;
			positionOptions = self.options.dropDownListPosition;
			defaultPosition = {
				my: "left top",
				at: "left bottom",
				of: self._comboElement,
				collision: "none"
			};
			defaultPosition = $.extend(defaultPosition, positionOptions);
			self.menu.element.position(defaultPosition);
		},

		_runAutoComplete: function () {
			var self = this, ele, topHit, oldText, fullText, start, end;
			ele = self._input;
			topHit = self._topHit;
			if (!self.options.autoComplete || topHit === null) {
				return;
			}
			self.menu.activate(null, topHit, true);
			oldText = ele.val();
			fullText = topHit.label;
			ele.val(fullText);
			start = oldText.length;
			end = fullText.length;
			self._selectText(start, end, ele);
		},

		_selectText: function (start, end, input) {
			var v = input.val(), inputElement = input.get(0), range;
			if (v.length > 0) {
				if (inputElement.setSelectionRange !== undefined) {
					inputElement.setSelectionRange(start, end);
				}
				else if (inputElement.createTextRange !== undefined) {
					range = inputElement.createTextRange();
					range.moveStart("character", start);
					range.moveEnd("character", end - v.length);
					range.select();
				}
			}
		},

		_onresize: function (self) {
			var ele = self.menu.element;
			self.options.dropdownWidth = ele.get(0).offsetWidth;
			self.options.dropdownHeight = ele.get(0).offsetHeight;
			//var h = Math.min(this._menuUL.outerHeight(), self.options.dropdownHeight);
		},

		_move: function (direction, event) {
			if (!this.menu.element.is(":visible")) {
				this.search("", event);
				return;
			}
			if (this.menu.first() && /^previous/.test(direction) ||
			this.menu.last() && /^next/.test(direction)) {
				this.menu.deactivate();
				return;
			}
			this.menu[direction](event);
		},

		_escapeRegex: function (value) {
			if (value === undefined) {
				return value;
			}
			return value.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1");
		},

		_filter: function (array, searchTerm) {
			var term1 = this._escapeRegex(searchTerm), matcher, topHit = null;
			/// TODO : start with or contains and case sensitive.
			matcher = new RegExp(term1, "i");
			$.each(array, function (index, item) {
				if (term1 === undefined || term1.length === 0) {
					item.match = true;
					return;
				}
				var matchResult = matcher.exec(item.label);
				if (matchResult === null) {
					item.match = false;
				}
				else {
					if (topHit === null && matchResult.index === 0) {
						topHit = item;
					}
					item.match = matchResult.index >= 0;
				}
			});
			this._topHit = topHit;
			return array;
		}
	});
} (jQuery));
