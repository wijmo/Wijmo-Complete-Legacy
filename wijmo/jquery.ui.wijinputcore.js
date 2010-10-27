/*
 *
 * Wijmo Library 0.7.0
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

window.wijinputcore = {
	options: {
		///	<summary>
		///		Determines the active field index.
		///	</summary>
		activeField: 0,
		///	<summary>
		///		Determines the time span, in milliseconds, between two input intentions.
		///	</summary>
		keyDelay: 800,
		///	<summary>
		///		Determines whether to automatically moves to the next field.
		///	</summary>
		autoNextField: true,
		///	<summary>
		///		The culture id.
		///	</summary>
		culture: '',
		///	<summary>
		///		The CSS class applied to the widget when invalid value is input.
		///	</summary>
		invalidClass: 'ui-state-error',
		///	<summary>
		///		Determines the character used to represent the absence of user input.
		///	</summary>
		promptChar: '_',
		///	<summary>
		///		Determines how an input character that matches the prompt character should be handled.
		///	</summary>
		resetOnPrompt: true,
		///	<summary>
		///		Determines how a space input character should be handled.
		///	</summary>
		resetOnSpace: true,
		///	<summary>
		///		Indicates whether promptChar can be entered as valid data by the user.
		///	</summary>
		allowPromptAsInput: false,
		///	<summary>
		///		Indicates whether the prompt characters in the input mask are hidden when the input loses focus.
		///	</summary>
		hidePromptOnLeave: false,
		///	<summary>
		///		Indicates whether the user is allowed to re-enter literal values.
		///	</summary>
		skipLiterals: true,
		///	<summary>
		///		Determines the character to be substituted for the actual input characters.
		///	</summary>
		passwordChar: '',
		///	<summary>
		///		Determines the text that will be displayed for blank status.
		///	</summary>
		nullText: 'Enter here',
		///	<summary>
		///		Show Null Text if the value is empty and the control loses its focus.
		///	</summary>
		showNullText: false,
		///	<summary>
		///		Allows smart input behavior.
		///	</summary>
		smartInputMode: true,
		///	<summary>
		///		If true, then the browser response is disabled when the ENTER key is pressed.
		///	</summary>
		hideEnter: false,
		///	<summary>
		///		Determines whether the user can type a value.
		///	</summary>
		disableUserInput: false,
		///	<summary>
		///		Determines how much to increase/decrease the input field.
		///	</summary>
		increment: 1,
		///	<summary>
		///		Determines the alignment of buttons.
		///		Possible values are: 'left', 'right'
		///	</summary>
		buttonAlign: 'right',
		///	<summary>
		///		Determines whether trigger button is displayed.
		///	</summary>
		showTrigger: false,
		///	<summary>
		///		Determines whether spinner button is displayed.
		///	</summary>
		showSpinner: false,
		///	<summary>
		///		Array of data items for the drop-down list.
		///	</summary>
		comboItems: undefined,
		///	<summary>
		///		Determines the width of the drop-down list.
		///	</summary>
		comboWidth: undefined,
		///	<summary>
		///		Determines the height of the drop-down list.
		///	</summary>
		comboHeight: undefined
	},
	
	_create: function () {
		if (this.element.attr('tagName').toLowerCase() !== 'input') {
			throw "Target element is not a INPUT";
		}
		
		$.effects.save(this.element, ['width', 'height']);
		var width = this.element.width();
		this.element.wrap("<div class='ui-wijinput ui-widget ui-helper-clearfix ui-state-default ui-corner-all'><span class='ui-wijinput-wrapper'></span></div>");
		this.element.addClass('ui-wijinput-input ui-corner-all');
		this.wrapper = this.element.parent();
		this.outerDiv = this.wrapper.parent();
		this.outerDiv.width(width);
		
		if (this.options.showTrigger) {
			this.triggerBtn = $("<div class='ui-wijinput-trigger ui-state-default'><span class='ui-icon ui-icon-triangle-1-s'></span></div>");
			this.triggerBtn.addClass(this.options.buttonAlign === 'left' ? 'ui-corner-left' : 'ui-corner-right');
			this.triggerBtn.appendTo(this.outerDiv);
		}
		
		if (this.options.showSpinner) {
			this.spinner = $("<div class='ui-wijinput-spinner ui-wijinput-button'></div>");
			this.spinUp = $("<div class='ui-state-default ui-wijinput-spinup'><span class='ui-icon ui-icon-triangle-1-n'></span></div>");
			this.spinDown = $("<div class='ui-state-default ui-wijinput-spindown'><span class='ui-icon ui-icon-triangle-1-s'></span></div>");
			if (!this.options.showTrigger){
				this.spinUp.addClass(this.options.buttonAlign === 'left' ? 'ui-corner-tl' : 'ui-corner-tr');
				this.spinDown.addClass(this.options.buttonAlign === 'left' ? 'ui-corner-bl' : 'ui-corner-br');
			}
			this.spinner.append(this.spinUp).append(this.spinDown);
			this.spinner.appendTo(this.outerDiv);
		}
		
		if (this.options.showTrigger && this.options.showSpinner){
			this.outerDiv.addClass(this.options.buttonAlign === 'left' ? 'ui-input-spinner-trigger-left' : 'ui-input-spinner-trigger-right');
		}else{
			if (this.options.showTrigger){
				this.outerDiv.addClass(this.options.buttonAlign === 'left' ? 'ui-input-trigger-left' : 'ui-input-trigger-right');
			}
				
			if (this.options.showSpinner){
				this.outerDiv.addClass(this.options.buttonAlign === 'left' ? 'ui-input-spinner-left' : 'ui-input-spinner-right');
			}
		}
		
		this.element.setOutWidth(this.outerDiv.width());
		this._initialize();
	},
	
	_createTextProvider: function(){
		return undefined;
	},
	
	_beginUpdate: function(){
	},
	
	_endUpdate: function(){
	},
	
	_onTriggerClicked: function(){
	},
	
	_initialize: function(){
		this.element.data('initializing', true);
		this._trigger('initializing');
		
		this._createTextProvider();
		this._beginUpdate();
	   
		this.element.data('errorstate', false);
		this.element.data('breakSpinner', true);
		this.element.data('prevCursorPos', -1);
		this.element.data('doubleBytes', false);
		this.element.data('isPassword', (this.options.passwordChar.length > 0) && (this.element.attr('type') !== 'password'));
		
		if (this.options.showNullText) { this.option('hidePromptOnLeave', true); }

		var isLeftButton = function (e) { return (!e.which ? e.button : e.which) === 1; };
		var self = this;
		if (this.triggerBtn) {this.triggerBtn.bind({
			'mouseover': function () { self._addState('hover', $(this)); },
			'mouseout': function () { self._removeState('hover', $(this)); },
			'mousedown': function (e) {
				if (!isLeftButton(e)) { return; }
				self._addState('active', $(this));
				self._trigger('tiggermousedown');
			},
			'mouseup': function (e) {
				if (!isLeftButton(e)) { return; }
				self._stopEvent(e);
				self._stopSpin();
				self._removeState('active', $(this));
				self._trigger('triggermouseup');
				self._onTriggerClicked();
				self._trySetFocus();
			}
		}); }

		var spinButtonDown = function (e) {
			if (!isLeftButton(e)) { return; }
			self._trySetFocus();
			self.element.data('breakSpinner', false);
			self._addState('active', $(this));
			self._doSpin($(e.currentTarget).hasClass('ui-wijinput-spinup'), true);
		}

		var spinButtonUp = function (e) {
			if (!isLeftButton(e)) { return; }
			self._stopSpin();
			self._removeState('active', $(this));
		}

		if (this.spinUp) { this.spinUp.bind({
			'mouseover': function () { self._addState('hover', $(this)) },
			'mouseout': function () { self._removeState('hover', $(this)) },
			'mousedown': spinButtonDown,
			'mouseup': spinButtonUp
		}); }

		if (this.spinDown) { this.spinDown.bind({
			'mouseover': function () { self._addState('hover', $(this)) },
			'mouseout': function () { self._removeState('hover', $(this)) },
			'mousedown': spinButtonDown,
			'mouseup': spinButtonUp
		}); }

		this.element.bind({
			'focus.wijinput': $.proxy(this._onFocus, this),
			'blur.wijinput': $.proxy(this._onBlur, this),
			'mouseup.wijinput': $.proxy(this._onMouseUp, this),
			'keypress.wijinput': $.proxy(this._onKeyPress, this),
			'keydown.wijinput': $.proxy(this._onKeyDown, this),
			'keyup.wijinput': $.proxy(this._onKeyUp, this),
			'change.wijinput': $.proxy(this._onChange, this),
			'paste.wijinput': $.proxy(this._onPast, this),
			'drop.wijinput': $.proxy(this._onDrop, this)
		});

		this.element.bind('propertychange.wijinput input.wijinput', $.proxy(this._onInput, this));
		this.element.data('preText', this.element.val());
		this.element.data('initializing', false);
		
		this._resetData();
		this._endUpdate();
		this._updateText(false);
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
				
			case 'resetOnPrompt':
			case 'hidePromptOnLeave':
				this._updateText(false);
				break;

			case 'passwordChar':
				this.element.data('isPassword', ((value + '').length > 0));
				this._updateText(false);
				break;

			case 'showNullText':
				if (value) {
					this.option('hidePromptOnLeave', true);
				}
				this._updateText(false);
				break;

			case 'disabled':
				this.element.attr('disabled', value);
				this.element[value ? addClass : removeClass](this.namespace + "-state-disabled");
				if (this.triggerBtn !== undefined){
					this.triggerBtn[value ? addClass : removeClass](this.namespace + "-state-disabled");
				}

				if (this.spinup !== undefined){
					this.spinup[value ? addClass : removeClass](this.namespace + "-state-disabled");
				}

				if (this.spindown !== undefined){
					this.spindown[value ? addClass : removeClass](this.namespace + "-state-disabled");
				}
				break;
		}
	},

	destroy: function () {
		$.Widget.prototype.destroy.apply(this, arguments);
		this._destroy();
	},
	
	_destroy: function(){
		this.wrapper = undefined;
		this.outerDiv = undefined;
		this.element.unbind('.wijinput');

		this.element.removeData('errorstate');
		this.element.removeData('breakSpinner');
		this.element.removeData('prevCursorPos');
		this.element.removeData('doubleBytes');
		this.element.removeData('isPassword');
		this.element.removeClass('ui-wijinput-input');
		this.element.parent().replaceWith(this.element);
		this.element.parent().replaceWith(this.element);
		$.effects.restore(this.element, ['width', 'height']);
	},
	
	widget: function() {
		return this.outerDiv;
	},
	
	_getCulture: function(name) {
		return $.findClosestCulture(name || this.options.culture);
	},

	_isPassword: function(){
		return !!this.element.data('isPassword');
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
	
	_setData: function(val){
		this.setText(val);
	},

	_resetData: function () {
	},
	
	_validateData: function(){
	},

	getText: function () {
		/// <summary>Gets the text displayed in the input box.</summary>
		if (!this._isInitialized()) { return this.element.val(); }
		return this._textProvider.toString(true, false, false);
	},

	setText: function (value) {
		/// <summary>Sets the text displayed in the input box.</summary>
		if (!this._isInitialized()) {
			this.element.val(value);
		}else{
			this._textProvider.set(value);
			this._updateText(false);
		}
	},
	
	selectText: function (start, end) {
		/// <summary>Selects a range of text.</summary>
		/// <param name="start" type="Number">Start of the range.</param>
		/// <param name="end" type="Number">End of the range.</param>
		if (this.element.is(':disabled')) { return; }
		this.element.wijtextselection(start, end);
	},
	
	focus: function () {
		/// <summary>Set the focus to this input.</summary>
		if (this.element.is(':disabled')) { return; }
		this.element.get(0).focus();
	},

	_raiseTextChanged: function () {
		var txt = this.element.val();
		if (this.element.data('preText') !== txt) {
			this._trigger('textchanged');
			this.element.data('preText', txt);
		}
	},
	
	_raiseDataChanged: function(){
	},

	_allowEdit: function () {
		return !(this.element.attr('readOnly') && this.element.is(':disabled'))
	},
  
	_updateText: function (restoreSelection) {
		if (!this._isInitialized()) { return; }
		
		// default is false
		restoreSelection = !!restoreSelection;
		if (!restoreSelection) {
			this.element.val(this._textProvider.toString(!this._isPassword(), (!!this.options.hidePromptOnLeave) ? this._isFocused() : true, true));
		}
		else {
			var range = this.element.wijtextselection();
			this.element.val(this._textProvider.toString(!this._isPassword(), (!!this.options.hidePromptOnLeave) ? this._isFocused() : true, true));
			if (this.element.is(':disabled')) { return; }

			this.selectText(range.start, range.end);
			this.element.data('prevCursorPos', range.start);
		}

		this._raiseTextChanged();
		this._raiseDataChanged();
	},

	_trySetFocus: function () {
		if (!this._isFocused()) {
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
		if (!this._allowEdit()) { return; }
		var selRange = this.element.wijtextselection();
		
		backSpace = !!backSpace;
		if (backSpace) {
			if (selRange.end === selRange.start) {
				if (selRange.end >= 1) {
					selRange.end = (selRange.end - 1);
					selRange.start = (selRange.start - 1);
				}else{
					return;
				}
			}else{
				selRange.end = (selRange.end - 1);
			}
		}else{
			selRange.end = (selRange.end - 1);
		}
		if (selRange.end < selRange.start) {
			selRange.end = (selRange.start);
		}
		var rh = new wijInputResult();
		this._textProvider.removeAt(selRange.start, selRange.end, rh);
		this._updateText(false);
		this.selectText(rh.testPosition, rh.testPosition);
	},

	_getTextWithPrompts: function () {
		return !this._isInitialized() ? this.element.val() : this._textProvider.toString(true, true, false);
	},

	_getTextWithLiterals: function () {
		return !this._isInitialized() ? this.element.val() : this._textProvider.toString(true, false, true);
	},

	_getTextWithPromptAndLiterals: function () {
		return !this._isInitialized() ? this.element.val() : this._textProvider.toString(true, true, true);
	},

	_fireIvalidInputEvent: function () {
		this._trigger('invalidinput');
		if (!this.element.data('errorstate')) {
			var cls = this.options.invalidClass || 'ui-state-error';
			this.element.data('errorstate', true);
			var self = this;
			window.setTimeout(function () {
				self.outerDiv.removeClass(cls);
				self.element.data('errorstate', false);
			}, 100);
			this.outerDiv.addClass(cls);
		}
	},

	_onInput: function (e) {
		if (!this.element.data('doubleBytes') || !this.element.data('lastSelection')) {
			return;
		}
		var range = this.element.wijtextselection();
		var start = this.element.data('lastSelection').start;
		var end = range.end;

		this.element.data('doubleBytes', false);
		if (end >= start) {
			var txt = this.element.val();
			var str = txt.substring(start, end);
			var self = this;
			window.setTimeout(function () {
				if (!self.element.data('lastValue')) { return; }

				self.element.val(self.element.data('lastValue'));
				var lastSel = self.element.data('lastSelection');
				self.element.wijtextselection(lastSel);
				self.element.removeData('lastSelection');
				self.element.data('batchKeyPress', true);
				for (var i = 0; i < str.length; i++) {
					e.which = e.charCode = e.keyCode = str.charCodeAt(i);
					this._onKeyPress(e);
				}
				self.element.data('batchKeyPress', false);
			}, 1);
		}
	},
	
	_keyDownPreview: function(e){
		return false; // true means handled.
	},

	_onKeyDown: function (e) {
		this.element.data('prevCursorPos', -1);

		if (!this._isInitialized()) { return; }

		var k = this._getKeyCode(e);
		if (k === 229) { // Double Bytes
			if (!this.element.data('lastSelection')) {
				this.element.data('lastSelection', this.element.wijtextselection());
				this.element.data('lastValue', this.element.val());
			}

			this.element.data('doubleBytes', true);
			return;
		}
		this.element.data('doubleBytes', false);

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
		if ((e.ctrlKey || e.altKey)) { return; }
		
		switch (k) {
			case 112: // F1-F6
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
				return;
			case $.ui.keyCode.TAB:
			case $.ui.keyCode.CAPSLOCK:
			case $.ui.keyCode.END:
			case $.ui.keyCode.HOME:
			case $.ui.keyCode.CTRL:
				break;
			case $.ui.keyCode.BACKSPACE:
				this._deleteSelText(true);
				this._stopEvent(e);
				return;
			case $.ui.keyCode.DELETE:
				this._deleteSelText(false);
				this._stopEvent(e);
				return;
			case $.ui.keyCode.ENTER:
				if (!this.options.hideEnter) { return; }
				break;
			case $.ui.keyCode.ESCAPE:
				this._stopEvent(e);
				window.setTimeout($.proxy(this, this._resetData), 1);
				return;
			case $.ui.keyCode.PAGE_UP:
			case $.ui.keyCode.PAGE_DOWN:
			case $.ui.keyCode.ALT:
				this._stopEvent(e);
				return;
			case $.ui.keyCode.SHIFT:
				return;
		}
	},

	_onKeyUp: function (e) {
		if (this.element.data('doubleBytes')) { return; }
		var k = this._getKeyCode(e);

		if (!this._isInitialized()) { return; }
		if (k === $.ui.keyCode.ENTER) { return; }
		if (k === $.ui.keyCode.ESCAPE) { return; }

		if (this.options.disableUserInput) {
			this._raiseTextChanged();
			this._raiseDataChanged();
			return;
		}
		this._stopEvent(e);
	},
	
   _getKeyCode: function (e) {
		var userAgent = window.navigator.userAgent;
		if (userAgent.indexOf('iPod') !== -1 || userAgent.indexOf('iPhone') !== -1) {
			switch (e.which) {
				case 127:
					return 8;
				default:
					break;
			}
		}
		return e.which;
	},
	
	_keyPressPreview: function(e){
		return false;
	},

	_onKeyPress: function (e) {
		if (this.element.data('doubleBytes')) { return; }
		this.element.data('prevCursorPos', -1);
		
		if (this.options.disableUserInput) { return; }
		if (!this._allowEdit()) { return; }
		
		if (e.ctrlKey && e.keyCode == 119) {  //Ctrl + F8
			this._onPast(e);
			return;
		}

		if (e.ctrlKey || e.altKey) {
			if (e.which !== $.ui.keyCode.SPACE) {
				return;
			}
		}
		
		if (e.which == 0) { return; }
		if (this._keyPressPreview(e)){
			this._stopEvent(e);
			return;
		}
		
		var selRange = this.element.wijtextselection();
		var ch = String.fromCharCode(e.which);
		if (selRange.start < selRange.end) {
			this._textProvider.removeAt(selRange.start, selRange.end - 1, new wijInputResult());
		}
		var rh = new wijInputResult();
		var opResult = this._textProvider.insertAt(ch, selRange.start, rh);
		if (opResult) {
			this._updateText(false);
			this.selectText(rh.testPosition + 1, rh.testPosition + 1);
		}
		else {
			this._fireIvalidInputEvent();
		}
		if (!this.element.data('batchKeyPress')) {
			this._stopEvent(e);
		}
	},
	
	_afterFocused: function(){
		if (!!this.options.hidePromptOnLeave) {
			var selRange = this.element.wijtextselection();
			var sta = selRange.start;
			this._updateText(false);
			var s = this.element.val();
			if (s.length === sta) { sta = 0; }
			if (!$.browser.safari) {
				this.selectText(sta, sta);
			}
		}
	},

	_onFocus: function (e) {
		if (this.options.disableUserInput) { return; }
		this._addState('focus', this.outerDiv);

		if (!this.element.data('breakSpinner')) {
			return;
		}

		if (!this._isInitialized()) { return; }
		if (!this._allowEdit()) { return; }

		if (!this.element.data('focusNotCalledFirstTime')) { this.element.data('focusNotCalledFirstTime', new Date().getTime()); }
		this._afterFocused();
	},

	_onBlur: function (e) {
		if (this.options.disableUserInput) { return; }
		if (this._isComboListVisible()) { return; }
		
		this._removeState('focus', this.outerDiv);

		if (!this.element.data('breakSpinner')) {
			this.element.get(0).focus();
			var curPos = this.element.data('prevCursorPos');
			if (curPos !== undefined && curPos !== -1) {
				this.selectText(curPos, curPos);
			}
			return;
		}
		if (!this._isInitialized()) { return; }
		if (!this._isFocused()) { return; }

		this.element.data('value', this.element.val());
		var self = this;
		window.setTimeout(function () {
			self._onChange();
			self._updateText(false);
			self._validateData();
		}, 100);
	},
	
	_isFocused: function(){
		return this.outerDiv.hasClass("ui-state-focus");
	},

	_onMouseUp: function (e) {
		if (!this._isInitialized()) { return; }
		if (this.element.is(':disabled')) { return; }

		var selRange = this.element.wijtextselection();
		this.element.data('prevCursorPos', selRange.start);
	},

	_onChange: function (e) {
		if (!this.element) { return; }

		var val = this.element.val();
		var txt = this.getText();
		if (txt !== val) {
			txt = this._getTextWithPrompts();
			if (txt !== val) {
				txt = this._getTextWithPromptAndLiterals();
				if (txt !== val) {
					this.setText(val);
				}
			}
		}
	},

	_onPast: function (e) {
		window.setTimeout($.proxy(this._onChange, this), 1);
	},

	_onDrop: function (e) {
		window.setTimeout($.proxy(this._onChange, this), 1);
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

	_doSpin: function (up, repeating) {
		up = !!up;
		repeating = !!repeating;
	
		if (!this._allowEdit()) { return; }
		if (repeating && this.element.data('breakSpinner')) { return; }
		var selRange = this.element.wijtextselection();
		var rh = new wijInputResult();
		if (this.element.data('focusNotCalledFirstTime') !== -9 && (new Date().getTime() - this.element.data('focusNotCalledFirstTime')) < 600) {
			this.element.data('focusNotCalledFirstTime', -9);
			this.element.data('prevCursorPos', 0);
		}
		if (this.element.data('prevCursorPos') === -1) {
			this.element.data('prevCursorPos', selRange.start);
		}else{
			selRange.start = (this.element.data('prevCursorPos'));
		}
		rh.testPosition = selRange.start;
		this._textProvider[up ? 'incEnumPart' : 'decEnumPart'](selRange.start, rh, this.options.increment);
		this._updateText(false);
		this.element.data('prevCursorPos', rh.testPosition);
		this.selectText(rh.testPosition, rh.testPosition);
		if (repeating && !this.element.data('breakSpinner')) {
			window.setTimeout($.proxy(function () { this._doSpin(up, true) }, this),  this._calcSpinInterval());
		}
	},

	_stopSpin: function _stopSpin() {
		this.element.data('breakSpinner', true);
		this._repeatingCount = 0;
	},
	
	_hasComboItems: function(){
		return (!!this.options.comboItems && this.options.comboItems.length);
	},
	
	_isComboListVisible: function(){
		if (!this._comboDiv) { return false; }
		return this._comboDiv.wijpopup('isVisible');
	},
	
	_popupComboList: function () {
		if (!this._hasComboItems()) { return; }
		if (!this._allowEdit()) { return; }
		
		if (this._isComboListVisible()){
			this._comboDiv.wijpopup('hide');
			return;
		}
		
		if (this._comboDiv === undefined){
			this._comboDiv = $("<div></div>");
			this._comboDiv.appendTo(document.body);
			this._comboDiv.width(this.element.width())
			this._comboDiv.height(this.options.comboHeight || 180)
			this._comboDiv.css('position', 'absolute');
			
			var content = this._normalize(this.options.comboItems);
			var self = this;
			this._comboDiv.wijlist({
				autoSize: true, 
				maxItemsCount:5, 
				selected: function( event, ui ) {
					self._setData(ui.item.value );
					self._comboDiv.wijpopup('hide');
					self._trySetFocus();
				}});	
			
			this._comboDiv.wijlist('setItems', content);
			this._comboDiv.wijlist('renderList');
			this._comboDiv.wijlist("refreshSuperPanel");
		}
		
		this._comboDiv.wijpopup({
			autoHide: true
		});
		this._comboDiv.wijpopup('show', {
			of: this.outerDiv,
			offset: '0 4'
		});
	},
	
	_normalize: function( items ) {
		// assume all items have the right format when the first item is complete
		if ( items.length && items[0].label && items[0].value ) {
			return items;
		}
		return $.map( items, function(item) {
			if ( typeof item === "string" ) {
				return {
					label: item,
					value: item
				};
			}
			return $.extend({
				label: item.label || item.value,
				value: item.value || item.label
			}, item );
		});
	}
};

wijInputResult = function () {
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

wijInputResult.prototype = {
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

})(jQuery);