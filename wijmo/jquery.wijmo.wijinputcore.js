/*globals Globalize window jQuery wijInputResult document*/


/*
 *
 * Wijmo Library 2.1.4
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
 *
 *
 * * Wijmo Inputcore widget.
 *
 */
(function ($) {
	"use strict";
	window.wijinputcore = {
		options: {
			///	<summary>
			///		Determines the culture ID name.
			///	</summary>
			culture: '',
			///	<summary>
			///	The CSS class applied to the widget when an invalid value is entered.
			///	</summary>
			invalidClass: 'ui-state-error',
			///	<summary>
			///	Determines the text that will be displayed for blank status.
			///	</summary>
			nullText: '',
			///	<summary>
			///	Show Null Text if the value is empty and the control loses its focus.
			///	</summary>
			showNullText: false,
			///	<summary>
			///	If true, then the browser response is disabled 
			/// when the ENTER key is pressed.
			///	</summary>
			hideEnter: false,
			///	<summary>
			///	Determines whether the user can type a value.
			///	</summary>
			disableUserInput: false,
			///	<summary>
			///	Determines the alignment of buttons.
			///	Possible values are: 'left', 'right'
			///	</summary>
			buttonAlign: 'right',
			///	<summary>
			///	Determines whether trigger button is displayed.
			///	</summary>
			showTrigger: false,
			///	<summary>
			///	Determines whether spinner button is displayed.
			///	</summary>
			showSpinner: false,
			///	<summary>
			///	Array of data items for the drop-down list.
			///	</summary>
			comboItems: undefined,
			///	<summary>
			///	Determines the width of the drop-down list.
			///	</summary>
			comboWidth: undefined,
			///	<summary>
			///	Determines the height of the drop-down list.
			///	</summary>
			comboHeight: undefined,
			/// <summary>
			/// The initializing event handler. 
			/// A function called before the widget is initialized.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element")
			/// .wijinputmask({ initializing: function () { } });
			/// </summary>
			initializing: null,
			/// <summary>
			/// The initialized event handler. 
			/// A function called after the widget is initialized.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $("#element").wijinputmask({ initialized: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			initialized: null,
			/// <summary>
			/// The triggerMouseDown event handler. A function called 
			/// when the mouse is pressed down on the trigger button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $("#element").wijinputmask({ triggerMouseDown: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			triggerMouseDown: null,
			/// <summary>
			/// The triggerMouseUp event handler. A function called 
			/// when the mouse is released on the trigger button.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $("#element").wijinputmask({ triggerMouseUp: function (e) { } });
			/// </summary>
			////// <param name="e" type="Object">jQuery.Event object.</param>
			triggerMouseUp: null,
			/// <summary>
			/// The textChanged event handler. A function called 
			/// when the text of the input is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $("#element").wijinputmask({ textChanged: function (e, arg) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.text: The new text.
			///</param>
			textChanged: null,
			/// <summary>
			/// The invalidInput event handler. A function called 
			/// when invalid charactor is typed.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// $("#element").wijinputmask({ invalidInput: function (e, data) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="data" type="Object">
			/// The data that contains the related information.
			/// data.char: The newly input character.
			/// data.widget: The widget object itself.
			/// </param>
			invalidInput: null
		},

		_create: function () {
			if (this.element[0].tagName.toLowerCase() !== 'input') {
				throw "Target element is not a INPUT";
			}

			this.element.data("widgetName", this.widgetName);

			$.effects.save(this.element, ['width', 'height']);
			var width = this.element.width();
			this.element.wrap("<div class='wijmo-wijinput ui-widget ui-helper-clearfix" +
			" ui-state-default ui-corner-all'><span class='wijmo-wijinput-wrapper'>" +
			"</span></div>");
			this.element.addClass('wijmo-wijinput-input ui-corner-all')
			.attr({ 'role': 'textbox', 'aria-multiline': false });
			this.wrapper = this.element.parent();
			this.outerDiv = this.wrapper.parent();
			this.outerDiv.width(width);

			if (this.options.showTrigger) {
				this.triggerBtn =
				$("<div class='wijmo-wijinput-trigger ui-state-default'>" +
				"<span class='ui-icon ui-icon-triangle-1-s'></span></div>")
					.addClass(this.options.buttonAlign === 'left' ?
					'ui-corner-left' : 'ui-corner-right')
					.attr('role', 'button')
					.appendTo(this.outerDiv);
				this.element.attr({ 'role': 'combobox', 'aria-expanded': false });
			}

			if (this.options.showSpinner) {
				this.spinner =
				$("<div class='wijmo-wijinput-spinner wijmo-wijinput-button'></div>");
				this.spinUp = $("<div class='ui-state-default wijmo-wijinput-spinup'>" +
				"<span class='ui-icon ui-icon-triangle-1-n'></span></div>")
				.attr('role', 'button');
				this.spinDown =
				$("<div class='ui-state-default wijmo-wijinput-spindown'>" +
				"<span class='ui-icon ui-icon-triangle-1-s'></span></div>")
				.attr('role', 'button');
				if (!this.options.showTrigger) {
					this.spinUp.addClass(this.options.buttonAlign === 'left' ?
					'ui-corner-tl' : 'ui-corner-tr');
					this.spinDown.addClass(this.options.buttonAlign === 'left' ?
					'ui-corner-bl' : 'ui-corner-br');
				}
				this.spinner.append(this.spinUp)
					.append(this.spinDown)
					.appendTo(this.outerDiv);
				this.element.attr('role', 'spinner');
			}

			if (this.options.showTrigger && this.options.showSpinner) {
				this.outerDiv.addClass(this.options.buttonAlign === 'left' ?
				'ui-input-spinner-trigger-left' : 'ui-input-spinner-trigger-right');
			} else {
				if (this.options.showTrigger) {
					this.outerDiv.addClass(this.options.buttonAlign === 'left' ?
					'ui-input-trigger-left' : 'ui-input-trigger-right');
				}

				if (this.options.showSpinner) {
					this.outerDiv.addClass(this.options.buttonAlign === 'left' ?
					'ui-input-spinner-left' : 'ui-input-spinner-right');
				}
			}

			this.element.setOutWidth(this.outerDiv.width());
			this._initialize();
		},

		_createTextProvider: function () {
			return undefined;
		},

		_beginUpdate: function () {
		},

		_endUpdate: function () {
		},

		_onTriggerClicked: function () {
		},

		_initialize: function () {
			this.element.data('initializing', true);
			this._trigger('initializing');

			this.element.data('preText', this.element.val());
			this.element.data('elementValue', this.element.val());
			this.element.data('errorstate', false);
			this.element.data('breakSpinner', true);
			this.element.data('prevCursorPos', -1);
			this.element.data('simulating', false);

			this._createTextProvider();
			this._beginUpdate();

			var o = this.options, self = this, dis,
			isLeftButton = function (e) {
				return (!e.which ? e.button : e.which) === 1;
			},
			spinButtonDown = function (e) {
				if (!isLeftButton(e)) {
					return;
				}
				self._trySetFocus();
				self.element.data('breakSpinner', false);
				self._addState('active', $(this));
				self._doSpin($(e.currentTarget).hasClass('wijmo-wijinput-spinup'), true);
			},
			spinButtonUp = function (e) {
				if (!isLeftButton(e)) {
					return;
				}
				self._stopSpin();
				self._removeState('active', $(this));
			};
			if (this.triggerBtn && !o.disabledState) {
				this.triggerBtn.bind({
					'mouseover': function () {
						self._addState('hover', $(this));
					},
					'mouseout': function () {
						self._removeState('hover', $(this));
					},
					'mousedown': function (e) {
						if (!isLeftButton(e)) {
							return;
						}
						self._addState('active', $(this));
						self._trigger('triggerMouseDown');
					},
					'click': function (e) {
						self._stopEvent(e);
						self._stopSpin();
						self._removeState('active', $(this));
						self._trigger('triggerMouseUp');
						self._onTriggerClicked();
						self._trySetFocus();
					}
				});
			}



			if (this.spinUp && !o.disabledState) {
				this.spinUp.bind({
					'mouseover': function () {
						self._addState('hover', $(this));
					},
					'mouseout': function () {
						self._removeState('hover', $(this));
						self._removeState('active', $(this));
						self._stopSpin();
					},
					'mousedown': spinButtonDown,
					'mouseup': spinButtonUp
				});
			}

			if (this.spinDown && !o.disabledState) {
				this.spinDown.bind({
					'mouseover': function () {
						self._addState('hover', $(this));
					},
					'mouseout': function () {
						self._removeState('hover', $(this));
						self._removeState('active', $(this));
						self._stopSpin();
					},
					'mousedown': spinButtonDown,
					'mouseup': spinButtonUp
				});
			}

			this.element.bind({
				'focus.wijinput': $.proxy(this._onFocus, this),
				'blur.wijinput': $.proxy(this._onBlur, this),
				'mouseup.wijinput': $.proxy(this._onMouseUp, this),
				'keypress.wijinput': $.proxy(this._onKeyPress, this),
				'keydown.wijinput': $.proxy(this._onKeyDown, this),
				'keyup.wijinput': $.proxy(this._onKeyUp, this),
				'change.wijinput': $.proxy(this._onChange, this),
				'paste.wijinput': $.proxy(this._onPaste, this),
				'drop.wijinput': $.proxy(this._onDrop, this)
			});

			this.element.bind('propertychange.wijinput input.wijinput',
			$.proxy(this._onInput, this));
			this.element.data('initializing', false);

			this._resetData();
			this._endUpdate();
			this._updateText();

			if (this.options.disabledState) {
				dis = o.disabled;
				this.disable();
				o.disabled = dis;
			}

			this.element.data('initialized', true);
			this._trigger('initialized');
		},

		_init: function () {
		},

		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);

			switch (key) {
			case 'buttonAlign':
			case 'showTrigger':
			case 'showSpinner':
				this._destroy();
				this._create();
				break;

			case 'showNullText':
				this._updateText();
				break;

			case 'disabled':
				this.element.attr('disabled', value);
				this.element[value ? 'addClass' :
			'removeClass'](this.namespace + "-state-disabled");
				if (this.triggerBtn !== undefined) {
					this.triggerBtn[value ? 'addClass' :
				'removeClass'](this.namespace + "-state-disabled");
				}

				if (this.spinup !== undefined) {
					this.spinup[value ? 'addClass' :
				'removeClass'](this.namespace + "-state-disabled");
				}

				if (this.spindown !== undefined) {
					this.spindown[value ? 'addClass' :
				'removeClass'](this.namespace + "-state-disabled");
				}
				break;
			}
		},

		destroy: function () {
			$.Widget.prototype.destroy.apply(this, arguments);
			this._destroy();
		},

		_destroy: function () {
			this.wrapper = undefined;
			this.outerDiv = undefined;
			this.element.unbind('.wijinput');

			this.element.removeData('errorstate')
				.removeData('breakSpinner')
				.removeData('prevCursorPos')
				.removeData('simulating')
				.removeData('isPassword')
				.removeClass('wijmo-wijinput-input')
				.removeAttr('role')
				.removeAttr('aria-valuemin')
				.removeAttr('aria-valuemax')
				.removeAttr('aria-valuenow')
				.removeAttr('aria-expanded');

			this.element.parent().replaceWith(this.element);
			this.element.parent().replaceWith(this.element);
			$.effects.restore(this.element, ['width', 'height']);
		},

		widget: function () {
			/// <summary>Gets element this widget is associated.</summary>
			return this.outerDiv;
		},

		_getCulture: function (name) {
			return Globalize.findClosestCulture(name || this.options.culture);
		},

		_addState: function (state, el) {
			if (el.is(':not(.ui-state-disabled)')) {
				el.addClass('ui-state-' + state);
			}
		},

		_removeState: function (state, el) {
			el.removeClass('ui-state-' + state);
		},

		_isInitialized: function () {
			return !this.element.data('initializing');
		},

		_setData: function (val) {
			this.setText(val);
		},

		_resetData: function () {
		},

		_validateData: function () {
		},

		getText: function () {
			/// <summary>Gets the text displayed in the input box.</summary>
			if (!this._isInitialized()) {
				return this.element.val();
			}
			return this._textProvider.toString(true, false, false);
		},

		setText: function (value) {
			/// <summary>Sets the text displayed in the input box.</summary>
			if (!this._isInitialized()) {
				this.element.val(value);
			} else {
				this._textProvider.set(value);
				this._updateText();
			}
		},

		getPostValue: function () {
			/// <summary>Gets the text value when the container 
			/// form is posted back to server.</summary>
			if (!this._isInitialized()) {
				return this.element.val();
			}
			return this._textProvider.toString(true, false, true);
		},

		selectText: function (start, end) {
			/// <summary>Selects a range of text.</summary>
			/// <param name="start" type="Number">Start of the range.</param>
			/// <param name="end" type="Number">End of the range.</param>
			if (this.element.is(':disabled')) {
				return;
			}
			this.element.wijtextselection(start, end);
		},

		focus: function () {
			/// <summary>Set the focus to this input.</summary>
			if (this.element.is(':disabled')) {
				return;
			}
			this.element.get(0).focus();
		},

		isFocused: function () {
			/// <summary>Determines whether the input has input focus.</summary>
			return this.outerDiv.hasClass("ui-state-focus");
		},

		_raiseTextChanged: function () {
			var txt = this.element.val(), preText = this.element.data('preText');
			if (!!this.element.data('initialized') && preText !== txt) {
				this._trigger('textChanged', null, { text: txt });
				this.element.data('changed', true);
			}

			this.element.data('preText', txt);
		},

		_raiseDataChanged: function () {
		},

		_allowEdit: function () {
			return !(this.element.attr('readOnly') && this.element.is(':disabled'));
		},

		_updateText: function (keepSelection) {
			if (!this._isInitialized()) {
				return;
			}

			// default is false
			keepSelection = !!keepSelection;
			var range = this.element.wijtextselection();
			this.element.val(this._textProvider.toString());
			this.options.text = this._textProvider.toString(true, false, false);
			if (this.element.is(':disabled')) {
				return;
			}

			if (keepSelection) {
				this.selectText(range.start, range.end);
			}
			this.element.data('prevCursorPos', range.start);

			this._raiseTextChanged();
			this._raiseDataChanged();
		},

		_trySetFocus: function () {
			if (!this.isFocused()) {
				try {
					if (!this.options.disableUserInput) {
						this.element.focus();
					}
				}
				catch (e) {
				}
			}
		},

		_deleteSelText: function (backSpace) {
			if (!this._allowEdit()) {
				return;
			}
			var selRange = this.element.wijtextselection(), rh;

			backSpace = !!backSpace;
			if (backSpace) {
				if (selRange.end === selRange.start) {
					if (selRange.end >= 1) {
						selRange.end = (selRange.end - 1);
						selRange.start = (selRange.start - 1);
					} else {
						return;
					}
				} else {
					selRange.end = (selRange.end - 1);
				}
			} else {
				selRange.end = (selRange.end - 1);
			}
			if (selRange.end < selRange.start) {
				selRange.end = (selRange.start);
			}
			rh = new wijInputResult();
			this._textProvider.removeAt(selRange.start, selRange.end, rh);
			this._updateText();
			this.selectText(rh.testPosition, rh.testPosition);
		},

		_fireIvalidInputEvent: function (chr) {
			var self = this, cls;
			if (self._trigger('invalidInput', null,
			{ widget: self, char: chr }) === true) {
				return;
			}
			if (!self.element.data('errorstate')) {
				cls = self.options.invalidClass || 'ui-state-error';
				self.element.data('errorstate', true);
				
				window.setTimeout(function () {
					self.outerDiv.removeClass(cls);
					self.element.data('errorstate', false);
				}, 100);
				self.outerDiv.addClass(cls);
			}
		},

		_onInput: function (e) {
			if (!this._isSimulating() || !this.element.data('ime')) {
				return;
			}
			this._simulate();
		},

		_keyDownPreview: function (e) {
			return false; // true means handled.
		},

		_beforeSimulate: function (ime) {
			if (!this.element.data('lastSelection')) {
				this.element.data('lastSelection', this.element.wijtextselection());
				this.element.data('lastValue', this.element.val());
			}

			this.element.data('ime', ime);
			this.element.data('simulating', true);
		},

		_isSimulating: function () {
			return this.element.data('simulating');
		},

		_simulate: function (text) {
			var self = this,
				str = null, range, start, end;

			if (typeof text === "string") {
				str = text;
			} else {
				range = this.element.wijtextselection();
				start = this.element.data('lastSelection').start;
				end = range.end;

				if (end >= start) {
					str = this.element.val().substring(start, end);
				}
			}

			if (str) {
				window.setTimeout(function () {
					if (!self.element.data('lastValue')) {
						return;
					}
					self.element.val(self.element.data('lastValue'));
					var lastSel = self.element.data('lastSelection'), e, i;
					self.element.wijtextselection(lastSel);
					self.element.data('batchKeyPress', true);
					self.element.data('simulating', false);
					e = jQuery.Event('keypress');
					e.ctrlKey = e.altKey = false;
					for (i = 0; i < str.length; i++) {
						e.which = e.charCode = e.keyCode = str.charCodeAt(i);
						self._onKeyPress(e);
					}
					self.element.data('batchKeyPress', false);
					self._endSimulate();
				}, 1);
			}
		},

		_endSimulate: function () {
			this.element.removeData('ime');
			this.element.removeData('lastSelection');
			this.element.removeData('lastValue');
		},

		_onKeyDown: function (e) {
			this.element.data('prevCursorPos', -1);

			if (!this._isInitialized() ||
			(this._textProvider && !!this._textProvider.noMask)) {
				return;
			}

			var k = this._getKeyCode(e);
			if (k === 229) { // Double Bytes
				this._beforeSimulate(true);
				return;
			}
			this._endSimulate();

			if (this.options.disableUserInput) {
				this._stopEvent(e);
				return;
			}

			if (this._keyDownPreview(e)) {
				this._stopEvent(e);
				return;
			}

			switch (k) {
			case $.ui.keyCode.UP:
				this._doSpin(true, false);
				this._stopEvent(e);
				return;
			case $.ui.keyCode.DOWN:
				this._doSpin(false, false);
				this._stopEvent(e);
				return;
			}

			if (e.ctrlKey) {
				switch (k) {
				case $.ui.keyCode.INSERT:
				case 67: // 'c'
					return;
				default:
					break;
				}
			}
			if ((e.ctrlKey || e.altKey)) {
				return;
			}

			switch (k) {
			case 112: // F1-F6
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case $.ui.keyCode.TAB:
			case $.ui.keyCode.CAPSLOCK:
			case $.ui.keyCode.END:
			case $.ui.keyCode.HOME:
			case $.ui.keyCode.CTRL:
			case $.ui.keyCode.SHIFT:
				return;
			case $.ui.keyCode.BACKSPACE:
				this._deleteSelText(true);
				this._stopEvent(e);
				return;
			case $.ui.keyCode.DELETE:
				this._deleteSelText(false);
				this._stopEvent(e);
				return;
			case $.ui.keyCode.ENTER:
				if (!this.options.hideEnter) {
					return;
				}
				break;
			case $.ui.keyCode.ESCAPE:
				this._stopEvent(e);
				window.setTimeout($.proxy(this._resetData, this), 1);
				return;
			case $.ui.keyCode.PAGE_UP:
			case $.ui.keyCode.PAGE_DOWN:
			case $.ui.keyCode.ALT:
				this._stopEvent(e);
				return;
			}
		},

		_onKeyUp: function (e) {
			if (this._isSimulating() ||
			(this._textProvider && !!this._textProvider.noMask)) {
				return;
			}
			var k = this._getKeyCode(e);

			if (!this._isInitialized()) {
				return;
			}
			if (k === $.ui.keyCode.ENTER) {
				return;
			}
			if (k === $.ui.keyCode.ESCAPE) {
				return;
			}

			if (this.options.disableUserInput) {
				this._raiseTextChanged();
				this._raiseDataChanged();
				return;
			}

			this._stopEvent(e);
		},

		_getKeyCode: function (e) {
			var userAgent = window.navigator.userAgent;
			if ((userAgent.indexOf('iPod') !== -1 ||
			userAgent.indexOf('iPhone') !== -1) && e.which === 127) {
				return 8;
			}
			return e.keyCode || e.which;
		},

		_keyPressPreview: function (e) {
			return false;
		},

		_onKeyPress: function (e) {
			if (this._isSimulating() ||
			(this._textProvider && !!this._textProvider.noMask)) {
				return;
			}
			this.element.data('prevCursorPos', -1);

			if (this.options.disableUserInput) {
				return;
			}
			if (!this._allowEdit()) {
				return;
			}

			if (e.ctrlKey && e.keyCode === 119) {  //Ctrl + F8
				this._onPaste(e);
				return;
			}

			if (e.which === 0) {
				return;
			}

			var key = e.keyCode || e.which, selRange, ch, rh, opResult;
			if (key === $.ui.keyCode.BACKSPACE) {
				this._stopEvent(e);
				return;
			}

			if (e.ctrlKey || e.altKey) {
				if (key !== $.ui.keyCode.SPACE) {
					return;
				}
			}

			if (this._keyPressPreview(e)) {
				return;
			}

			if (key === $.ui.keyCode.ENTER && !this.options.hideEnter) {
				return true;
			}

			selRange = this.element.wijtextselection();
			ch = String.fromCharCode(key);
			if (selRange.start < selRange.end) {
				this._textProvider
				.removeAt(selRange.start, selRange.end - 1, new wijInputResult(), true);
			}
			rh = new wijInputResult();
			opResult = this._textProvider.insertAt(ch, selRange.start, rh);
			if (opResult) {
				this._updateText();
				this.selectText(rh.testPosition + 1, rh.testPosition + 1);
			}
			else {
				this._fireIvalidInputEvent(ch);
			}
			if (!this.element.data('batchKeyPress')) {
				this._stopEvent(e);
			}
		},

		_isNullText: function (val) {
			val = val || this.element.val();
			return this.options.showNullText && val === this.options.nullText;
		},

		_doFocus: function () {
			var selRange = this.element.wijtextselection(),	
				sta = selRange.start, s;
			this._updateText();
			s = this.element.val();
			if (s.length === sta) {
				sta = 0;
			}
			if (!$.browser.safari) {
				this.selectText(sta, sta);
			}
		},

		_afterFocused: function () {
			if (this._isNullText()) {
				this._doFocus();
			}
		},

		_onFocus: function (e) {
			if (this.options.disableUserInput) {
				return;
			}
			this._addState('focus', this.outerDiv);

			if (!this.element.data('breakSpinner')) {
				return;
			}

			if (!this._isInitialized()) {
				return;
			}
			if (!this._allowEdit()) {
				return;
			}

			if (!this.element.data('focusNotCalledFirstTime')) {
				this.element.data('focusNotCalledFirstTime', new Date().getTime());
			}
			this._afterFocused();
		},

		_onBlur: function (e) {
			if (this.options.disableUserInput) {
				return;
			}
			if (this._isComboListVisible()) {
				return;
			}

			var focused = this.isFocused(), curPos, self = this;
			this._removeState('focus', this.outerDiv);

			if (!this.element.data('breakSpinner')) {
				this.element.get(0).focus();
				curPos = this.element.data('prevCursorPos');
				if (curPos !== undefined && curPos !== -1) {
					this.selectText(curPos, curPos);
				}
				return;
			}
			if (!this._isInitialized()) {
				return;
			}
			if (!focused) {
				return;
			}

			this.element.data('value', this.element.val());
			
			window.setTimeout(function () {
				self._onChange();
				self._updateText();
				self._validateData();

				if (!self._popupVisible() && !!self.element.data('changed')) {
					self._trigger('change');
				}

				self.element.data('changed', false);
			}, 100);


		},

		_popupVisible: function () {
			return this._isComboListVisible();
		},

		_onMouseUp: function (e) {
			if (!this._isInitialized()) {
				return;
			}
			if (this.element.is(':disabled')) {
				return;
			}

			var selRange = this.element.wijtextselection();
			this.element.data('prevCursorPos', selRange.start);
		},

		_onChange: function (e) {
			if (!this.element) {
				return;
			}
			var val = this.element.val(),
				txt = this.getText();
			if (txt !== val) {
				this.setText(val);
			}
		},

		_onPaste: function (e) {
			if (this._textProvider && !!this._textProvider.noMask) {
				return;
			}
			this._beforeSimulate();
			var self = this;
			window.setTimeout(function () {
				self._simulate();
			}, 1);
		},

		_onDrop: function (e) {
			this._beforeSimulate();
			if (e.originalEvent && e.originalEvent.dataTransfer) {
				var text = e.originalEvent.dataTransfer.getData('Text');
				if (text) {
					this._simulate(text);
				}
			}
		},

		_stopEvent: function (e) {
			e.stopPropagation();
			e.preventDefault();
		},

		_calcSpinInterval: function () {
			this._repeatingCount++;
			if (this._repeatingCount > 10) {
				return 50;
			}
			else if (this._repeatingCount > 4) {
				return 100;
			}
			else if (this._repeatingCount > 2) {
				return 200;
			}
			return 400;
		},

		_doSpin: function () {
		},

		_stopSpin: function _stopSpin() {
			this.element.data('breakSpinner', true);
			this._repeatingCount = 0;
		},

		_hasComboItems: function () {
			return (!!this.options.comboItems && this.options.comboItems.length);
		},

		_isComboListVisible: function () {
			if (!this._comboDiv) {
				return false;
			}
			return this._comboDiv.wijpopup('isVisible');
		},

		_popupComboList: function () {
			if (!this._hasComboItems()) {
				return;
			}
			if (!this._allowEdit()) {
				return;
			}

			if (this._isComboListVisible()) {
				this._comboDiv.wijpopup('hide');
				return;
			}

			var self = this, content;
			if (this._comboDiv === undefined) {
				this._comboDiv = $("<div></div>")
				.appendTo(document.body)
				.width(this.element.width())
				.height(this.options.comboHeight || 180)
				.css('position', 'absolute');

				content = this._normalize(this.options.comboItems);
				this._comboDiv.wijlist({
					autoSize: true,
					maxItemsCount: 5,
					selected: function (event, ui) {
						self._setData(ui.item.value);
						self._comboDiv.wijpopup('hide');
						self._trySetFocus();
					}
				});

				this._comboDiv.wijlist('setItems', content);
				this._comboDiv.wijlist('renderList');
				this._comboDiv.wijlist("refreshSuperPanel");
			}

			this._comboDiv.wijpopup({
				autoHide: true
			});

			this.outerDiv.attr('aria-expanded', true);
			this._comboDiv.wijpopup('show', {
				of: this.outerDiv,
				offset: '0 4',
				hidden: function () {
					self.outerDiv.attr('aria-expanded', false);
				}
			});
		},

		_normalize: function (items) {
			// assume all items have the right format when the first item is complete
			if (items.length && items[0].label && items[0].value) {
				return items;
			}
			return $.map(items, function (item) {
				if (typeof item === "string") {
					return {
						label: item,
						value: item
					};
				}
				return $.extend({
					label: item.label || item.value,
					value: item.value || item.label
				}, item);
			});
		}
	};

	window.wijInputResult = function () {
		this.alphanumericCharacterExpected = -2;
		this.asciiCharacterExpected = -1;
		this.digitExpected = -3;
		this.invalidInput = -51;
		this.letterExpected = -4;
		this.nonEditPosition = -54;
		this.positionOutOfRange = -55;
		this.promptCharNotAllowed = -52;
		this.signedDigitExpected = -5;
		this.unavailableEditPosition = -53;
		this.testPosition = -1;
	};

	window.wijInputResult.prototype = {
		characterEscaped: 1,
		noEffect: 2,
		sideEffect: 3,
		success: 4,
		unknown: 0,
		hint: 0,

		clone: function () {
			var rh = new wijInputResult();
			rh.hint = this.hint;
			rh.testPosition = this.testPosition;
			return rh;
		}
	};

}(jQuery));
