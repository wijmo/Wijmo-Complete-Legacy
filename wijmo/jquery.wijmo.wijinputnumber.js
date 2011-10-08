/*
 *
 * Wijmo Library 1.5.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
 *
 *
 * * Wijmo Inputnumber widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.effects.blind.js
 *	globalize.js
 *	jquery.plugin.wijtextselection.js
 *	jquery.wijmo.wijpopup.js
 *	jquery.wijmo.wijinputcore.js
 *
 */
 (function ($) {
	 "use strict";

	 $.widget("wijmo.wijinputnumber", $.extend(true, {}, wijinputcore, {
		 options: {
			///	<summary>
			///		Determines the type of the number input.
			///		Possible values are: 'numeric', 'percent', 'currency'.
			///	</summary>
			type: 'numeric',
			///	<summary>
			///		Determines the default numeric value.
			///	</summary>
			value: null,
			///	<summary>
			///		Determines the minimal value that can be entered for numeric/percent/currency inputs.
			///	</summary>
			minValue: -1000000000,
			///	<summary>
			///		Determines the maximum value that can be entered for numeric/percent/currency inputs.
			///	</summary>
			maxValue: 1000000000,
			///	<summary>
			///		Indicates whether the thousands group separator will be 
			///		inserted between between each digital group 
			///		(number of digits in thousands group depends on the 
			///		selected Culture).
			///	</summary>
			showGroup: false,
			///	<summary>
			///		Indicates the number of decimal places to display.
			///		Possible values are integer from -2 to 8. They are:
			///		useDefault: -2,
			///		asIs: -1,
			///		zero: 0,
			///		one: 1,
			///		two: 2,
			///		three: 3,
			///		four: 4,
			///		five: 5,
			///		six: 6,
			///		seven: 7,
			///		eight: 8
			///	</summary>
			decimalPlaces: 2,
			///	<summary>
			///		Determines how much to increase/decrease the input field.
			///	</summary>
			increment: 1,
			/// <summary>
			/// The valueChanged event handler. A function called when the value of the input is changed.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijinputnumber({ valueChanged: function (e, arg) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			/// <param name="args" type="Object">
			/// The data with this event.
			/// args.value: The new value.
			///</param>
			valueChanged: null,
			/// <summary>
			/// The valueBoundsExceeded event handler. A function called when the value of the input exceeds the valid range.
			/// Default: null.
			/// Type: Function.
			/// Code example: $("#element").wijinputnumber({ valueBoundsExceeded: function (e) { } });
			/// </summary>
			///
			/// <param name="e" type="Object">jQuery.Event object.</param>
			valueBoundsExceeded: null
		 },

		 _createTextProvider: function () {
			 this._textProvider = new wijNumberTextProvider(this, this.options.type);
		 },

		 _beginUpdate: function () {
			 var o = this.options;
			 this.element.addClass('wijmo-wijinput-numeric');
			 
			 this.element.data({
				 defaultValue: o.value,
				 preValue: o.value
			 }).attr({
				 'aria-valuemin': o.minValue,
				 'aria-valuemax': o.maxValue,
				 'aria-valuenow': o.value || 0
			 });
		 },
		 
		 _onTriggerClicked: function () {
			 this._popupComboList();
		 },

		 _setOption: function (key, value) {
			 $.Widget.prototype._setOption.apply(this, arguments);
			 wijinputcore._setOption.apply(this, arguments);

			 switch (key) {
				 case 'minValue':
					 this.element.attr('aria-valuemin', value);
					 this._updateText();
					 break;

				 case 'maxValue':
					 this.element.attr('aria-valuemax', value);
					 this._updateText();
					 break;

				 case 'value':
					 this.setValue(value);
					 this._updateText();
					 break;

				 case 'showGroup':
				 case 'decimalPlaces':
				 case 'culture':
					 this._textProvider.updateStringFormat();
					 this._updateText();
					 break;
			 }
		 },

		 _setData: function (val) {
			 this.setValue(val);
		 },

		 _resetData: function () {
			var val = this.element.data('defaultValue');
			if (val === undefined || val === null){
				val = this.element.data('elementValue');
				if (val === undefined || val === null && val === ""){
					val = 0;
				}
			}
			
			this.setValue(val);
		 },

		 _validateData: function () {
			 if (this._textProvider.checkAndRepairBounds(true, false)) {
				 this._updateText();
			 }
		 },

		 _raiseDataChanged: function () {
			 var v = this.options.value;
			 var prevValue = this.element.data('preValue');
			 this.element.data('preValue', v);
			 if (prevValue !== v) {
				 this.element.attr('aria-valuenow', v);
				 this._trigger('valueChanged', null, {value: v});
			 }
		 },

		 getValue: function () {
			 var val = this._textProvider.getValue();
			 if (val === undefined || val === null) { val = this.getText(); }
			 return val;
		 },

		 setValue: function (val, exact) {
			 try {
				 exact = !!exact;
				 if (typeof val === 'boolean') {
					 val = val ? '1' : '0';
				 }else if (typeof val === 'string') {
					 val = this._textProvider.tryParseValue(val);
				 }
				 
				 if (this._textProvider.setValue(val)) {
					 this._updateText();
				 } else {
					 if (exact) {
						 var prevVal = '';
						 prevVal = this.getText();
						 this.setText(val);
						 val = val.trim();
						 var txt = this.getText().trim();
						 if (txt !== val) {
							this.setText(prevVal);
						 }
					 } else {
						 this.setText(val);
					 }
				 }

				 return true;
			 }
			 catch (e) {
				 return false;
			 }
		 },

		 isValueNull: function () {
			 try {
				 return (this._textProvider).isValueNull();
			 }
			 catch (e) {
				 return true;
			 }
		 },

		 _updateText: function () {
			 if (!this._isInitialized()) { return; }
			 this.options.value = this._textProvider.getValue();
			 wijinputcore._updateText.apply(this, arguments);
			 if (!this._textProvider.checkAndRepairBounds(false, false)) {
				 this._trigger('valueBoundsExceeded');
			 }
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
			} else {
				selRange.start = (this.element.data('prevCursorPos'));
			}
			rh.testPosition = selRange.start;
			this._textProvider[up ? 'incEnumPart' : 'decEnumPart'](selRange.start, rh, this.options.increment);
			this._updateText();
			this.element.data('prevCursorPos', rh.testPosition);
			this.selectText(rh.testPosition, rh.testPosition);
			if (repeating && !this.element.data('breakSpinner')) {
				window.setTimeout($.proxy(function () { this._doSpin(up, true); }, this), this._calcSpinInterval());
			}
		}
	 }));


	 //==============================
	 var wijNumberTextProvider = function (owner, t) {
		 this.inputWidget = owner;
		 this._type = t;
		 this._stringFormat = new wijNumberFormat(this._type, this.inputWidget.options.decimalPlaces, this.inputWidget.options.showGroup, this._getCulture());
		 this._stringFormat._setValueFromJSFloat(this.getValue());
	 };

	 wijNumberTextProvider.prototype = {
		 _type: 'numeric',
		 _stringFormat: null,

		 _getCulture: function () {
			 return this.inputWidget._getCulture();
		 },

		 getDecimalSeparator: function () {
			 return this._getCulture().numberFormat['.'];
		 },
		 
		 tryParseValue: function(value){
			return this._stringFormat.tryParseValue(value);
		 },

		 toString: function () {
			 if (this.inputWidget.options.showNullText && !this.inputWidget.isFocused() && this.isValueNull()) {
				 return this.inputWidget.options.nullText;
			 }
			 return this._stringFormat.getFormattedValue();
		 },

		 isValueNull: function () {
			var o = this.inputWidget.options,
				nullValue = Math.max(0, o.minValue);

			return null === o.value || undefined === o.value || nullValue === o.value;
		 },

		 set: function (input, rh) {
			 this.clear();
			 this.insertAt(input, 0, rh);
			 return true;
		 },

		 clear: function () {
			 this._stringFormat.clear();
		 },

		 checkAndRepairBounds: function (chkAndRepair, chkIsLessOrEqMin) {
			 var result = true;
			 if (typeof (chkAndRepair) === 'undefined') { chkAndRepair = false; }

			 var minValue = this.inputWidget.options.minValue,
				maxValue = this.inputWidget.options.maxValue;

			 if (typeof (chkIsLessOrEqMin) !== 'undefined' && chkIsLessOrEqMin) {
				 return this._stringFormat.checkMinValue(minValue, false, true);
			 }

			 if (!this._stringFormat.checkMinValue(minValue, chkAndRepair, false)) { result = false; }
			 if (!this._stringFormat.checkMaxValue(maxValue, chkAndRepair)) { result = false; }
			 if (this.inputWidget.options.decimalPlaces >= 0) {
				 this._stringFormat.checkDigitsLimits(this.inputWidget.options.decimalPlaces);
			 }

			 return result;
		 },

		 countSubstring: function (txt, subStr) {
			 var c = 0;
			 var pos = txt.indexOf(subStr);
			 while (pos !== -1) {
				 c++;
				 pos = txt.indexOf(subStr, pos + 1);
			 }
			 return c;
		 },

		 getAdjustedPositionFromLeft: function (position) {
			 var currentText = this._stringFormat._currentText;
			 for (var i = 0; i < currentText.length; i++) {
				 var ch = currentText.charAt(i);
				 if (!$.wij.charValidator.isDigit(ch) && (ch !== ',' && ch !== '.') || ch === '0') {
					 if (this._stringFormat.isZero()) {
						 if (position < i) {
							 position++;
						 }
					 } else {
						 if (position <= i) {
							 position++;
						 }
					 }
				 } else {
					 break;
				 }
			 }
			 
			 return position;
		 },

		 getDecimalSeparatorPos: function () {
			 var currentText = this._stringFormat._currentText;
			 return currentText.indexOf(this.getDecimalSeparator());
		 },

		 insertAt: function (input, position, rh) {
			 var nf = this._getCulture().numberFormat;

			 if (input === nf['.']) { input = nf['.']; }
			 if (!rh) { rh = new wijInputResult(); }
			 if (input.length === 1) {
				 if (input === '+') {
					 this._stringFormat.setPositiveSign();
					 this.checkAndRepairBounds(true, false);
					 return true;
				 }
				 if (input === '-' || input === ')' || input === '(') {
					 this._stringFormat.invertSign();
					 this.checkAndRepairBounds(true, false);
					 rh.testPosition = position;
					if (this._stringFormat.isNegative())
						rh.testPosition = position;
					else
						rh.testPosition = position - 2;
					 return true;
				 }
				 if (!$.wij.charValidator.isDigit(input)) {
					 if (input === '.') {
						 var pos = this.getDecimalSeparatorPos();
						 if (pos >= 0) {
							 rh.testPosition = pos;
							 return true;
						 }
					 }
					 if (input !== ',' && input !== '.' && input !== ')' && input !== '+' && input !== '-' && input !== '(' && input !== this.getDecimalSeparator()) {
						 if (this._type === 'percent' && input === nf.percent.symbol) {
							 rh.testPosition = position;
							 return true;
						 } else if (this._type === 'currency' && input === nf.currency.symbol) {
							 rh.testPosition = position;
							 return true;
						 } else {
							 return false;
						 }
					 }
				 }
			 }

			 position = this.getAdjustedPositionFromLeft(position);
			 var slicePos = position;
			 var currentText = this._stringFormat._currentText;
			 if (slicePos > currentText.length) {
				 slicePos = currentText.length - 1;
			 }
			 if (input.length === 1) {
				 if (currentText.charAt(slicePos) === input) {
					 rh.testPosition = slicePos;
					 return true;
				 }
			 }
			 var beginText = currentText.substring(0, slicePos);
			 var endText = currentText.substring(slicePos, currentText.length);
			 if (this._stringFormat.isZero()) {
				 endText = endText.replace(new RegExp('[0]'), '');
			 }

			 rh.testPosition = beginText.length + input.length - 1;
			 this._stringFormat.deFormatValue(beginText + input + endText);
			 this.checkAndRepairBounds(true, false);
			 try {
				 if (input.length === 1) {
					 if (this.inputWidget.options.showGroup) {
						 var newBegText = this._stringFormat._currentText.substring(0, beginText.length);
						 if (this.countSubstring(newBegText, this._stringFormat._groupSeparator) !== this.countSubstring(beginText, this._stringFormat._groupSeparator)) {
							 rh.testPosition = rh.testPosition + 1;
						 }
					 }
					 else {
						 var leftPrevCh = beginText.charAt(beginText.length - 1);
						 var leftCh = this._stringFormat._currentText.charAt(rh.testPosition - 1);
						 if (leftCh !== leftPrevCh) {
							 rh.testPosition = rh.testPosition - 1;
						 }
					 }
				 }
			 }
			 catch (e) {
			 }
			 
			 return true;
		 },

		 removeAt: function (start, end, rh) {
			 var nf = this._getCulture().numberFormat;

			 if (!rh) { rh = new wijInputResult(); }
			 rh.testPosition = start;
			 try {
				 var curText = this._stringFormat._currentText;
				 if ((start === end) && curText.substring(start, end + 1) === this.getDecimalSeparator()) {
					 return false;
				 }
				 var curInsertText = curText.slice(0, start) + curText.slice(end + 1);
				 if (curInsertText === '') { curInsertText = '0'; }
				 this._stringFormat.deFormatValue(curInsertText);
				 if (start === end && this.inputWidget.options.showGroup) {
					 try {
						 var newBegText = this._stringFormat._currentText.substring(0, start);
						 if (this.countSubstring(newBegText, this._stringFormat._groupSeparator) !== this.countSubstring(curInsertText, this._stringFormat._groupSeparator)) {
							 rh.testPosition = rh.testPosition - 1;
							 if (curText.indexOf(nf.currency.symbol) === rh.testPosition || curText.indexOf(nf.percent.symbol) === rh.testPosition) {
								 rh.testPosition = rh.testPosition + 1;
							 }
						 }
					 }
					 catch (e1) {
					 }
				 }
				 this.checkAndRepairBounds(true, false);
				 return true;
			 }
			 catch (e2) {
			 }
			 this.checkAndRepairBounds(true, false);
			 return true;
		 },

		 incEnumPart: function (position, rh, val) {
			 if (!rh) { rh = new wijInputResult(); }
			 this._stringFormat.increment(val);
			 return this.checkAndRepairBounds(true, false);
		 },

		 decEnumPart: function (position, rh, val) {
			 if (!rh) { rh = new wijInputResult(); }
			 this._stringFormat.decrement(val);
			 return this.checkAndRepairBounds(true, false);
		 },

		 getValue: function () {
			 return this._stringFormat.getJSFloatValue();
		 },

		 setValue: function (val) {
			 try {
				 this._stringFormat._setValueFromJSFloat(val);
				 this.checkAndRepairBounds(true, false);
				 return true;
			 }
			 catch (e) {
				 return false;
			 }
		 },

		 updateStringFormat: function () {
			 var t = '0';
			 if (typeof (this._stringFormat) !== 'undefined') {
				 t = this._stringFormat._currentValueInString;
			 }
			 this._stringFormat = new wijNumberFormat(this._type, this.inputWidget.options.decimalPlaces, this.inputWidget.options.showGroup, this._getCulture());
			 this._stringFormat._currentValueInString = t;
		 }
	 };


	 //============================

	 var wijNumberFormat = function (t, dp, g, c) {
		 this.type = t;
		 this.digitsPlaces = dp;
		 this.showGroup = g;
		 this.culture = c;
	 };

	 wijNumberFormat.prototype = {
		 _currentValueInString: '0',
		 _currentText: '0',
		 _groupSeparator: ' ',
		 type: 'numeric',
		 digitsPlaces: 0,
		 showGroup: false,
		 culture: null,

 		 isNegtive: function (value) {
			 return value.indexOf('-') !== -1 || value.indexOf('(') !== -1;
		 },
		 
		 stripValue: function(value){
			 var nf = this.culture.numberFormat;
			 var isNegative = this.isNegtive(value);

			 value = value.replace('(', '');
			 value = value.replace(')', '');
			 value = value.replace('-', '');
			 value = value.replace(nf.percent.symbol, '');
			 value = value.replace(nf.currency.symbol, '');
			 var groupSep = nf[','];
			 var decimalSep = nf['.'];
			 switch (this.type) {
				 case 'percent':
					 groupSep = nf.percent[','];
					 decimalSep = nf.percent['.'];
					 break;
				 case 'currency':
					 groupSep = nf.currency[','];
					 decimalSep = nf.currency['.'];
					 break;
			 }
			 this._groupSeparator = groupSep;
			 var r = new RegExp('[' + groupSep + ']', 'g');
			 value = value.replace(r, '');
			 r = new RegExp('[' + decimalSep + ']', 'g');
			 value = value.replace(r, '.');
			 r = new RegExp('[ ]', 'g');
			 value = value.replace(r, '');
			 try {
				 var reg = new RegExp('([\\d\\.])+');
				 var arr = reg.exec(value);
				 if (arr) {
					 value = arr[0];
				 }
				 if (isNegative) {
					 value = '-' + value;
				 }
				 
				 return value;
			 }
			 catch (e) {
			 }
			 
			 return null;
		 },
		 
		 tryParseValue: function(value){
			 value = this.stripValue(value);
			 if (value === null) {return 0;}
			 
			 try{
				value = parseFloat(value);
				if (isNaN(value)) { value = 0 ;}
			 }catch(e){
				value = 0;
			 }
			 
			 return value;
		 },

		 deFormatValue: function (value) {
 			 value = this.stripValue(value);
			 if (value === null) {return;}
		 
			 this._currentValueInString = value;
			 this._currentText = this.formatValue(value);
		 },

		 formatValue: function (value) {
			 var nf = this.culture.numberFormat;
			 value = '' + value + '';
			 var dp = this.digitsPlaces, groupSep = ' ', decimalSep = '.', decimals = 2, isNegative = this.isNegtive(value);

			 var groupSizes = new Array(3);
			 groupSizes.push(3);
			 var pattern = 'n';
			 switch (this.type) {
				 case 'numeric':
					 pattern = isNegative ? nf.pattern[0] : 'n';
					 groupSep = nf[','];
					 decimalSep = nf['.'];
					 decimals = nf.decimals;
					 groupSizes = nf.groupSizes;
					 break;
				 case 'percent':
					 pattern = nf.percent.pattern[isNegative ? 0 : 1];
					 groupSep = nf.percent[','];
					 decimalSep = nf.percent['.'];
					 decimals = nf.percent.decimals;
					 groupSizes = nf.percent.groupSizes;
					 break;
				 case 'currency':
					 pattern = nf.currency.pattern[isNegative ? 0 : 1];
					 groupSep = nf.currency[','];
					 decimalSep = nf.currency['.'];
					 decimals = nf.currency.decimals;
					 groupSizes = nf.currency.groupSizes;
					 break;
			 }

			 if (dp !== -2) { decimals = dp; }
			 if (!this.showGroup) { groupSizes = [0]; }

			 value = value.replace(new RegExp('^[0]+'), '');
			 var digitsString = this.formatDigit(value, groupSep, decimalSep, decimals, groupSizes);
			 digitsString = digitsString.replace(new RegExp('^[0]+'), '');
			 if (digitsString.indexOf(decimalSep) === 0) { digitsString = '0' + digitsString; }
			 if (digitsString === '') { digitsString = '0'; }

			 this._currentValueInString = value;
			 this._currentText = this.applyFormatPattern(pattern, digitsString, nf.percent.symbol, nf.currency.symbol);
			 return this._currentText;
		 },

		 getFormattedValue: function () {
			 return this.formatValue(this._currentValueInString);
		 },

		 getJSFloatValue: function () {
			 try {
				 if (this._currentValueInString === '') {
					 return 0;
				 }
				 return parseFloat(this._currentValueInString);
			 }
			 catch (e) {
				 return Number.NaN;
			 }
		 },

		 clear: function () {
			 this._currentValueInString = '0';
			 this._currentText = '0';
		 },

		 _setValueFromJSFloat: function (v) {
			 try {
				 this._currentValueInString = '' + v + '';
				 this.formatValue(v);
				 return true;
			 }
			 catch (e) {
				 return false;
			 }
		 },

		 isZero: function (val) {
			 try {
				if (val === undefined){
					val = this._currentValueInString;
				}
			 
				 var test = val.replace('-', '');
				 test = test.replace('(', '');
				 test = test.replace(')', '');
				 if (!test.length) {
					 test = '0';
				 }
				 var dbl = parseFloat(test);
				 if (!isNaN(dbl) && !dbl) {
					 return true;
				 }
			 }
			 catch (e) {
			 }
			 return false;
		 },

		 setPositiveSign: function () {
			 this._currentValueInString = this._currentValueInString.replace('-', '');
			 this._currentValueInString = this._currentValueInString.replace('(', '');
			 this._currentValueInString = this._currentValueInString.replace(')', '');
		 },
		 
		 isNegative: function(){
			return this._currentValueInString.indexOf('-') !== -1 || this._currentValueInString.indexOf('(') !== -1;
		 },

		 invertSign: function () {
			 var isNegative = this.isNegative();
			 if (isNegative) {
				 this.setPositiveSign();
			 } else {
				 this._currentValueInString = (!this._currentValueInString.length) ? '0' : '-' + this._currentValueInString;
			 }
			 if (this.isZero()) {
				 this._currentValueInString = isNegative ? '0' : '-0';
			 }
			 this.formatValue(this._currentValueInString);
		 },

		 increment: function (val) {
			 if (val === undefined) { val = 1; }
			 try {
				 var arr = this._currentValueInString.split('.');
				 this._currentValueInString = (arr[0] * 1 + val) + '' + ((arr.length > 1) ? ('.' + arr[1]) : '');
			 }
			 catch (e) {
			 }
		 },

		 decrement: function (val) {
			 if (val === undefined) { val = 1; }
			 try {
				 var arr = this._currentValueInString.split('.');
				 this._currentValueInString = (arr[0] * 1 - val) + '' + ((arr.length > 1) ? ('.' + arr[1]) : '');
			 }
			 catch (e) {
			 }
		 },

		 checkDigitsLimits: function (aDigitsCount) {
			 try {
				 var arr = this._currentValueInString.split('.');
				 if (!arr.length || (arr.length === 1 && arr[0] === '')) {
					 return;
				 }
				 var s = '';
				 if (arr.length > 1) {
					 s = arr[1];
				 }
				 var d = '';
				 for (var i = 0; i < aDigitsCount; i++) {
					 var ch = '0';
					 if (s.length > i) {
						 ch = s.charAt(i);
					 }
					 d = d + ch;
				 }
				 if (d.length > 0) {
					 this._currentValueInString = arr[0] + '.' + d;
				 } else {
					 this._currentValueInString = arr[0];
				 }
			 }
			 catch (e) {
			 }
		 },

		 checkMinValue: function (val, chkAndRepair, chkIsLessOrEqMin) {
			 if (typeof (chkIsLessOrEqMin) === 'undefined') {
				 chkIsLessOrEqMin = false;
			 }
			 var result = true;
			 try {
				 var arr = this._currentValueInString.split('.');
				 var s1 = parseFloat((arr[0] === '' || arr[0] === '-') ? '0' : arr[0]);
				 var s2 = 0;
				 if (arr.length > 1 && parseFloat(arr[1]) > 0) {
					 s2 = parseFloat('1.' + arr[1]);
				 }
				 if (s1 < 0 || arr[0] === '-') {
					 s2 = s2 * -1;
				 }
				 val = '' + val + '';
				 arr = val.split('.');
				 var sv1 = parseFloat(arr[0]);
				 var sv2 = 0;
				 if (arr.length > 1 && parseFloat(arr[1]) > 0) {
					 sv2 = parseFloat('1.' + arr[1]);
				 }
				 if (s1 > sv1) {
					 return true;
				 }
				 if (s1 < sv1 || (chkIsLessOrEqMin && s1 === sv1 && s2 <= sv2)) {
					 result = false;
				 } else if (s1 === sv1 && s1 < 0 && s2 > sv2) {
					 result = false;
				 } else if (s1 === sv1 && s1 >= 0 && s2 < sv2) {
					 result = false;
				 }
				 if (!result && chkAndRepair) {
					 this._currentValueInString = '' + val + '';
				 }
			 }
			 catch (e) {
			 }
			 return result;
		 },

		 checkMaxValue: function (val, chkAndRepair) {
			 var result = true;
			 try {
				 var arr = this._currentValueInString.split('.');
				 var s1 = parseFloat((arr[0] === '' || arr[0] === '-') ? '0' : arr[0]);
				 var s2 = 0;
				 if (arr.length > 1 && parseFloat(arr[1]) > 0) {
					 s2 = parseFloat('1.' + arr[1]);
				 }
				 if (s1 < 0 || arr[0] === '-') {
					 s2 = s2 * -1;
				 }
				 val = '' + val + '';
				 arr = val.split('.');
				 var sv1 = parseFloat(arr[0]);
				 var sv2 = 0;
				 if (arr.length > 1 && parseFloat(arr[1]) > 0) {
					 sv2 = parseFloat('1.' + arr[1]);
				 }
				 if (s1 < sv1) {
					 return true;
				 }
				 if (s1 > sv1) {
					 result = false;
				 }
				 if (s1 === sv1 && s1 >= 0 && s2 > sv2) {
					 result = false;
				 }
				 if (s1 === sv1 && s1 < 0 && s2 < sv2) {
					 result = false;
				 }
				 if (!result && chkAndRepair) {
					 this._currentValueInString = '' + val + '';
				 }
			 }
			 catch (e) {
			 }
			 return result;
		 },

		 applyFormatPattern: function (pattern, digitString, percentSymbol, currencySymbol) {
			 var result = pattern;
			 var r = new RegExp('[n]', 'g');
			 result = result.replace(r, digitString);
			 r = new RegExp('[%]', 'g');
			 result = result.replace(r, percentSymbol);
			 r = new RegExp('[$]', 'g');
			 result = result.replace(r, currencySymbol);
			 return result;
		 },

		 formatDigit: function (value, groupSep, decimalSep, decimals, groupSizes) {
			 var absValue = '' + value + '';
			 absValue = absValue.replace('-', '');
			 absValue = absValue.replace('(', '');
			 absValue = absValue.replace(')', '');
			 var decimalPos = absValue.indexOf(decimalSep);
			 if (decimalPos === -1) { decimalPos = absValue.indexOf('.'); }
			 if (decimalPos === -1) { decimalPos = absValue.indexOf(','); }
			 if (decimalPos === -1) { decimalPos = absValue.length; }

			 var result = '', groupSizeIndex = 0, groupCount = 0, ch, i;
			 for (i = absValue.length - 1; i >= 0; i--) {
				 ch = absValue.charAt(i);
				 if (i < decimalPos) {
					 result = ch + result;
					 groupCount++;
					 if (groupCount === groupSizes[groupSizeIndex] * 1 && groupSizes[groupSizeIndex] * 1 && i) {
						 result = groupSep + result;
						 groupCount = 0;
						 if (groupSizes.length - 1 > groupSizeIndex) {
							 groupSizeIndex++;
						 }
					 }
				 }
			 }
			 if (decimals > 0) {
				 result = result + decimalSep;
				 for (i = 0; i < decimals; i++) {
					 ch = '0';
					 if (i + decimalPos + 1 < absValue.length) {
						 ch = absValue.charAt(i + decimalPos + 1);
					 }
					 result = result + ch;
				 }
			 }
			 if (decimals === -1) {
				 if (decimalPos < absValue.length - 1) {
					 result = result + decimalSep;
					 result = result + absValue.substr(decimalPos + 1);
				 }
			 }
			 return result;
		 }
	 };

 })(jQuery);
