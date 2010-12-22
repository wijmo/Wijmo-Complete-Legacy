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
 * * Wijmo Inputmask widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.effects.blind.js
 *	jquery.glob.js
 *	jquery.plugin.wijtextselection.js
 *	jquery.wijmo.wijpopup.js
 *	jquery.wijmo.wijinputcore.js
 *
 */
 (function ($) {

var wijchartype = {
	editOptional: 1,
	editRequired: 2,
	separator: 4,
	literal: 8
};

$.widget("wijmo.wijinputmask", $.extend(true, {}, wijinputcore, {
	options: {
		///	<summary>
		///		Determines the input mask to use at run time. 
		///		Mask must be a string composed of one or more of the masking elements.
		///	</summary>
		mask: "",
		///	<summary>
		///		Determines the default text to display for a masked input.		
		///	</summary>
		text: ''
	},
	
	_createTextProvider: function(){
		this._textProvider = new wijMaskedTextProvider(this, this.options.mask, false);
	},
	
	_beginUpdate: function(){
		this.element.addClass('wijmo-wijinput-mask');
		this.element.data('defaultText', this.options.text);
	},
	
	_onTriggerClicked: function(){
		this._popupComboList();
	},

	_setOption: function (key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		wijinputcore._setOption.apply(this, arguments);

		switch (key) {
			case 'mask':
			case 'culture':
				if (typeof (value) === 'undefined' || value.length <= 0) { return; }
				var text = this.getText();
				this._textProvider.mask = value;
				this._textProvider.initialMask = value;
				this._textProvider.initialize();
				this._textProvider.set(text);
				this._updateText(false);
				break;
			case 'text':
				this.setText(value);
				break;
				
			case 'promptChar':
				if (!!this._textProvider) {
					this._textProvider.updatePromptChar();
					this._updateText(false);
				}
				break;
		}
	},
	
	_resetData: function () {
		this.setText(this.element.data('defaultText'));
	},
	
	_updateText: function () {
		if (!this._isInitialized()) { return; }
		wijinputcore._updateText.apply(this, arguments);
		this.options.text = this._textProvider.toString(true, false, false);
	}
}));



var wijMaskedTextProvider = function (w, m, asciiOnly) {
	this.inputWidget = w;
	this.mask = m;
	this.asciiOnly = asciiOnly;
	this.descriptors = [];
	this.noMask = false;
	this.initialize();
};

wijMaskedTextProvider.prototype = {
	inputWidget: undefined,
	noMask: false,
	mask: '',
	testString: '',
	assignedCharCount: 0,
	requiredCharCount: 0,
	asciiOnly: false,
	
	initialize: function () {
		this.noMask = (!this.mask || this.mask.length <= 0);
		if (this.noMask) { return; }

		this.testString = '';
		this.assignedCharCount = 0;
		this.requiredCharCount = 0;
		this.descriptors = new Array(0);
		var caseType = 'none', escape = false, index = 0, charType = wijchartype.literal, text = '';
		var culture = this.inputWidget._getCulture();
		for (var i = 0; i < this.mask.length; i++) {
			var needDesc = false;
			var ch = this.mask.charAt(i);
			if (escape) {
				escape = false;
				needDesc = true;
			}
			if (!needDesc) {
				var ch3 = ch;
				if (ch3 <= 'C') {
					switch (ch3) {
						case '#':
						case '9':
						case '?':
						case 'C':
							ch = this.getPromtChar();
							charType = wijchartype.editOptional;
							needDesc = true;
							break;
						case '$':
							text = culture.numberFormat.currency.symbol;
							charType = wijchartype.separator;
							needDesc = true;
							break;
						case '%':
						case '-':
						case ';':
						case '=':
						case '@':
						case 'B':
							charType = wijchartype.literal;
							needDesc = true;
							break;
						case '&':
						case '0':
						case 'A':
							ch = this.getPromtChar();
							charType = wijchartype.editRequired;
							needDesc = true;
							break;
						case ',':
							text = culture.numberFormat[','];
							charType = wijchartype.separator;
							needDesc = true;
							break;
						case '.':
							text = culture.numberFormat['.'];
							charType = wijchartype.separator;
							needDesc = true;
							break;
						case '/':
							text = culture.calendars.standard['/'];
							charType = wijchartype.separator;
							needDesc = true;
							break;
						case ':':
							text = culture.calendars.standard[':'];
							charType = wijchartype.separator;
							needDesc = true;
							break;
						case '<':
							caseType = 'lower';
							continue;
						case '>':
							caseType = 'upper';
							continue;
					}
					if (!needDesc) {
						charType = wijchartype.literal;
						needDesc = true;
					}
				}
				if (!needDesc) {
					if (ch3 <= '\\') {
						switch (ch3) {
							case 'L':
								ch = this.getPromtChar();
								charType = wijchartype.editRequired;
								needDesc = true;
								break;
							case '\\':
								escape = true;
								charType = wijchartype.literal;
								continue;
						}
						if (!needDesc) {
							charType = wijchartype.literal;
							needDesc = true;
						}
					}
					if (!needDesc) {
						if (ch3 === 'a') {
							ch = this.getPromtChar();
							charType = wijchartype.editOptional;
							needDesc = true;
						}
						if (!needDesc) {
							if (ch3 !== '|') {
								charType = wijchartype.literal;
								needDesc = true;
							}
							if (!needDesc) {
								caseType = 'none';
								continue;
							}
						}
					}
				}
			}
			if (needDesc) {
				var cd = new wijCharDescriptor(i, charType);
				if (this.isEditDesc(cd)) {
					cd.caseConversion = caseType;
				}
				if (charType !== wijchartype.separator) {
					text = ch;
				}
				for (var j = 0; j < text.length; j++) {
					var ch2 = text.charAt(j);
					this.testString = this.testString + ch2;
					this.descriptors[this.descriptors.length] = cd;
					index++;
				}
			}
		}
		this.testString.Capacity = this.testString.length;
	},

	getAllowPromptAsInput: function () {
		return !!this.inputWidget ? this.inputWidget.options.allowPromptAsInput : false;
	},

	getPasswordChar: function () {
		return !!this.inputWidget ? this.inputWidget.options.passwordChar : '*';
	},

	isPassword: function () {
		return !!this.inputWidget ? this.inputWidget._isPassword() : false;
	},

	getResetOnPrompt: function () {
		return !!this.inputWidget ? this.inputWidget.options.resetOnPrompt : true;
	},

	getResetOnSpace: function () {
		return !!this.inputWidget ? this.inputWidget.options.resetOnSpace : true;
	},

	getSkipLiterals: function () {
		return !!this.inputWidget ? this.inputWidget.options.skipLiterals : true;
	},
	
	_trueOR: function (n1, n2) {
		return ((n1 >>> 1 | n2 >>> 1) * 2 + (n1 & 1 | n2 & 1));
	},

	setValue: function (val) {
		return false;
	},

	getValue: function () {
		return null;
	},
	
	getPromtChar: function () {
		return !!this.inputWidget ? this.inputWidget.options.promptChar : '_';
	},

	updatePromptChar: function () {
		if (this.noMask) { return; }

		for (var i = 0; i < this.descriptors.length; i++) {
			var cd = this.descriptors[i];
			if (cd.charType === wijchartype.editOptional || cd.charType === wijchartype.editRequired) {
				if (!cd.isAssigned) {
					this.testString = $.wij.charValidator.setChar(this.testString, this.getPromtChar(), i);
				}
			}
		}
	},

	resetChar: function (pos) {
		var cd = this.descriptors[pos];
		if (this.isEditPos(pos) && cd.isAssigned) {
			cd.isAssigned = false;
			this.testString = $.wij.charValidator.setChar(this.testString, this.getPromtChar(), pos);
			this.assignedCharCount--;
			if (cd.charType === wijchartype.editRequired) {
				this.requiredCharCount--;
			}
		}
	},

	getAdjustedPos: function (pos) {
		if (this.noMask) {
			if (pos >= this.testString.length) {
				pos = this.testString.length - 1;
			}
		}
		else {
			if (pos >= this.descriptors.length) {
				pos = pos - 1;
			}
		}
		
		return Math.max(0, pos);
	},

	incEnumPart: function (pos, rh, step) {
		return !this.noMask;
	},

	decEnumPart: function (pos, rh, step) {
		return !this.noMask;
	},

	findNonEditPositionInRange: function (start, end, direction) {
		return this.findPositionInRange(start, end, direction, this._trueOR(wijchartype.literal, wijchartype.separator));
	},

	findPositionInRange: function (start, end, direction, charType) {
		start = Math.max(0, start);
		end = Math.min(end, this.testString.length - 1);
		
		if (start <= end) {
			while (start <= end) {
				var pos = (direction) ? start++ : end--;
				var cd = this.descriptors[pos];
				if (((cd.charType & 4294967295) & (charType & 4294967295)) === cd.charType) {
					return pos;
				}
			}
		}
		return -1;
	},

	findAssignedEditPositionInRange: function (start, end, direction) {
		if (this.assignedCharCount === 0) { return -1; }
		return this.findEditPositionInRange(start, end, direction, wijchartype.editRequired);
	},

	findEditPositionInRange: function (start, end, direction, assignedStatus) {
		do {
			var pos = this.findPositionInRange(start, end, direction, this._trueOR(wijchartype.editRequired, wijchartype.editOptional));
			if (pos === -1) {
				break;
			}
			
			var cd = this.descriptors[pos];
			switch (assignedStatus) {
				case wijchartype.editOptional:
					if (!cd.isAssigned) {
						return pos;
					}
					break;
				case wijchartype.editRequired:
					if (cd.isAssigned) {
						return pos;
					}
					break;
				default:
					return pos;
			}
			if (direction){
				start++;
			}else{
				end--;
			}
		} while (start <= end);
		
		return -1;
	},

	findAssignedEditPositionFrom: function (pos, direction) {
		if (!this.assignedCharCount) { return -1; }
		
		var start, end;
		if (direction) {
			start = pos;
			end = this.testString.length - 1;
		}else{
			start = 0;
			end = pos;
		}
		return this.findAssignedEditPositionInRange(start, end, direction);
	},

	findEditPositionFrom: function (pos, direction) {
		var start, end;
		if (direction) {
			start = pos;
			end = this.testString.length - 1;
		}
		else {
			start = 0;
			end = pos;
		}
		return this.findEditPositionInRange(start, end, direction, 0);
	},
	
	setChar: function (input, pos, desc) {
		pos = pos < 0 ? 0 : pos;
		if (!desc) {
			desc = this.descriptors[pos];
		}
		if (this.testEscapeChar(input, pos, desc)) {
			this.resetChar(pos);
		}else{
			if ($.wij.charValidator.isLetter(input)) {
				if ($.wij.charValidator.isUpper(input)) {
					if (desc.caseConversion === 'lower') {
						input = input.toLowerCase();
					}
				}
				else if (desc.caseConversion === 'upper') {
					input = input.toUpperCase();
				}
			}
			this.testString = $.wij.charValidator.setChar(this.testString, input, pos);
			if (!desc.isAssigned) {
				desc.isAssigned = true;
				this.assignedCharCount++;
				if (desc.charType === wijchartype.editRequired) {
					this.requiredCharCount++;
				}
			}
		}
	},

	internalInsertAt: function (input, pos, rh, testOnly) {
		if (input.length === 0) {
			rh.testPosition = pos;
			rh.hint = rh.noEffect;
			return true;
		}
		if (!this._testString(input, pos, rh)) {
			return false;
		}
		var num1 = this.findEditPositionFrom(pos, true);
		var flag1 = this.findAssignedEditPositionInRange(num1, rh.testPosition, true) !== -1;
		var num2 = this.findAssignedEditPositionFrom(this.testString.length - 1, false);
		if (flag1 && (rh.testPosition === (this.testString.length - 1))) {
			rh.hint = rh.unavailableEditPosition;
			rh.testPosition = this.testString.length;
			return false;
		}
		var num3 = this.findEditPositionFrom(rh.testPosition + 1, true);
		if (flag1) {
			var hint1 = new wijInputResult();
			hint1.hint = hint1.unknown;
			var repeat = true;
			while (repeat) {
				repeat = false;
				if (num3 === -1) {
					rh.hint = rh.unavailableEditPosition;
					rh.testPosition = this.testString.length;
					return false;
				}
				var cd = this.descriptors[num1];
				if (cd.isAssigned && !this.testChar(this.testString.charAt(num1), num3, hint1)) {
					rh.hint = hint1.hint;
					rh.testPosition = num3;
					return false;
				}
				if (num1 !== num2) {
					num1 = this.findEditPositionFrom(num1 + 1, true);
					num3 = this.findEditPositionFrom(num3 + 1, true);
					repeat = true;
					continue;
				}
			}
			if (hint1.hint > rh.hint) {
				rh.hint = hint1.hint;
			}
		}
		if (!testOnly) {
			if (flag1) {
				while (num1 >= pos) {
					var descriptor2 = this.descriptors[num1];
					if (descriptor2.isAssigned) {
						this.setChar(this.testString.charAt(num1), num3);
					}
					else {
						this.resetChar(num3);
					}
					num3 = this.findEditPositionFrom(num3 - 1, false);
					num1 = this.findEditPositionFrom(num1 - 1, false);
				}
			}
			this.setString(input, pos);
		}
		return true;
	},

	insertAt: function (input, pos, rh) {
		if (rh === undefined) { rh = new wijInputResult(); }
		if (input === undefined) { throw 'InsertAt: input'; }

		if (this.noMask) {
			this.testString = this.testString.substring(0, pos) + input + this.testString.substring(pos, this.testString.length);
			rh.testPosition = pos + input.length - 1;
			return true;
		}
		if ((pos >= 0) && (pos < this.testString.length)) {
			return this.internalInsertAt(input, pos, rh, false);
		}
		rh.testPosition = pos;
		rh.hint = rh.positionOutOfRange;
		return false;
	},

	clear: function (rh) {
		if (this.noMask) {
			this.testString = '';
			rh.hint = rh.success;
			return;
		}
		if (!this.assignedCharCount) {
			rh.hint = rh.noEffect;
		}else{
			rh.hint = rh.success;
			for (var num1 = 0; num1 < this.testString.length; num1++) {
				this.resetChar(num1);
			}
		}
	},

	isLiteral: function (desc) {
		if (!desc) { return false;}
		if (desc.charType !== wijchartype.literal) {
			return (desc.charType === wijchartype.separator);
		}
		return true;
	},

	testEscapeChar: function (input, pos, desc) {
		pos = pos < 0 ? 0 : pos;
		if (!desc) {
			desc = this.descriptors[pos];
		}
		if (this.isLiteral(desc)) {
			if (this.getSkipLiterals()) {
				return (input === this.testString.charAt(pos));
			}
			return false;
		}
		if ((!this.getResetOnPrompt() || (input !== this.getPromtChar())) && (!this.getResetOnSpace() || (input !== ' '))) {
			return false;
		}
		return true;
	},

	isDigitString: function (s) {
		s = s.trim();
		if (s.length ===  0) { return true; }
		
		var c = s.charAt(0);
		if (c === '+' || c === '-') {
			s = s.substr(1);
			s = s.trim();
		}
		if (s.length ===  0) { return true; }
		try {
			var f = parseFloat(s);
			var t = f.toString();
			return t === s;
		}
		catch (e) {
			return false;
		}
	},

	testChar: function (input, pos, rh) {
		if (!$.wij.charValidator.isPrintableChar(input)) {
			rh.hint = rh.invalidInput;
			return false;
		}
		var cd = this.descriptors[pos];
		if (!cd) { return false; }

		if (this.isLiteral(cd)) {
			if (this.getSkipLiterals() && (input === this.testString.charAt(pos))) {
				rh.hint = rh.characterEscaped;
				return true;
			}
			rh.hint = rh.nonEditPosition;
			return false;
		}
		if (input === this.getPromtChar()) {
			if (this.getResetOnPrompt()) {
				if (this.isEditDesc(cd) && cd.isAssigned) {
					rh.hint = rh.sideEffect;
				}else{
					rh.hint = rh.characterEscaped;
				}
				return true;
			}
			if (!this.getAllowPromptAsInput()) {
				rh.hint = rh.promptCharNotAllowed;
				return false;
			}
		}
		if ((input === ' ') && this.getResetOnSpace()) {
			if (this.isEditDesc(cd) && cd.isAssigned) {
				rh.hint = rh.sideEffect;
			}else{
				rh.hint = rh.characterEscaped;
			}
			return true;
		}
		switch (this.mask.charAt(cd.maskPosition)) {
			case 'L':
				if (!$.wij.charValidator.isLetter(input)) {
					rh.hint = rh.letterExpected;
					return false;
				}
				if (!$.wij.charValidator.isAsciiLetter(input) && this.asciiOnly) {
					rh.hint = rh.asciiCharacterExpected;
					return false;
				}
				break;
			case 'a':
				if (!$.wij.charValidator.isAlphanumeric(input) && (input !== ' ')) {
					rh.hint = rh.alphanumericCharacterExpected;
					return false;
				}
				if (!$.wij.charValidator.isAciiAlphanumeric(input) && this.asciiOnly) {
					rh.hint = rh.asciiCharacterExpected;
					return false;
				}
				break;
			case '?':
				if (!$.wij.charValidator.isLetter(input) && (input !== ' ')) {
					rh.hint = rh.letterExpected;
					return false;
				}
				if ($.wij.charValidator.isAsciiLetter(input) || !this.asciiOnly) {
					break;
				}
				rh.hint = rh.asciiCharacterExpected;
				return false;
			case 'A':
				if (!$.wij.charValidator.isAlphanumeric(input)) {
					rh.hint = rh.alphanumericCharacterExpected;
					return false;
				}
				if ($.wij.charValidator.isAciiAlphanumeric(input) || !this.asciiOnly) {
					break;
				}
				rh.hint = rh.asciiCharacterExpected;
				return false;
			case 'C':
				if ((!$.wij.charValidator.isAscii(input) && this.asciiOnly) && (input !== ' ')) {
					rh.hint = rh.asciiCharacterExpected;
					return false;
				}
				break;
			case '9':
				if (!$.wij.charValidator.isDigit(input) && (input !== ' ')) {
					rh.hint = rh.digitExpected;
					return false;
				}
				break;
			case '#':
				if ((!$.wij.charValidator.isDigit(input) && (input !== '-')) && ((input !== '+') && (input !== ' '))) {
					rh.hint = rh.digitExpected;
					return false;
				}
				break;
			case '&':
				if (!$.wij.charValidator.isAscii(input) && this.asciiOnly) {
					rh.hint = rh.asciiCharacterExpected;
					return false;
				}
				break;
			case '0':
				if (!$.wij.charValidator.isDigit(input)) {
					rh.hint = rh.digitExpected;
					return false;
				}
				break;
		}
		if ((input === this.testString.charAt(pos)) && cd.isAssigned) {
			rh.hint = rh.noEffect;
		}else{
			rh.hint = rh.success;
		}
		return true;
	},

	_testString: function (input, pos, rh) {
		rh.hint = rh.unknown;
		rh.testPosition = pos;
		if (input.length) {
			var hint1 = new wijInputResult();
			hint1.testPosition = rh.testPosition;
			hint1.hint = rh.hint;
			for (var i = 0; i < input.length; i++) {
				var ch = input.charAt(i);
				if (rh.testPosition > this.testString.length) {
					rh.hint = rh.unavailableEditPosition;
					return false;
				}
				if (!this.testEscapeChar(ch, rh.testPosition)) {
					rh.testPosition = this.findEditPositionFrom(rh.testPosition, true);
					if (rh.testPosition === -1) {
						rh.testPosition = this.testString.length;
						rh.hint = rh.unavailableEditPosition;
						return false;
					}
				}
				if (!this.testChar(ch, rh.testPosition, hint1)) {
					rh.hint = hint1.hint;
					return false;
				}
				if (hint1.hint > rh.hint) {
					rh.hint = hint1.hint;
				}
				rh.testPosition += 1;
				
				if (rh.testPosition == this.testString.length){
					break;
				}
			}
			rh.testPosition -= 1;
		}
		return true;
	},

	set: function (input, rh) {
		if (rh === undefined) { rh = new wijInputResult(); }
		if (input === undefined) { throw 'SetFromPos: input parameter is null or undefined.'; }

		rh.hint = rh.unknown;
		rh.testPosition = 0;
		if (!input.length) {
			this.clear(rh);
			return true;
		}
		if (this.noMask) {
			this.testString = input;
			return true;
		}
		if (!this.testSetString(input, rh.testPosition, rh)) {
			return false;
		}
		var num1 = this.findAssignedEditPositionFrom(rh.testPosition + 1, true);
		if (num1 !== -1) {
			this.resetString(num1, this.testString.length - 1);
		}
		return true;
	},

	resetString: function (start, end) {
		if (this.noMask) {
			this.testString = '';
			return;
		}
		start = this.findAssignedEditPositionFrom(start, true);
		if (start !== -1) {
			end = this.findAssignedEditPositionFrom(end, false);
			while (start <= end) {
				start = this.findAssignedEditPositionFrom(start, true);
				this.resetChar(start);
				start++;
			}
		}
	},

	setString: function (input, pos) {
		for (var i = 0; i < input.length; i++) {
			var ch = input.charAt(i);
			if (!this.testEscapeChar(ch, pos)) {
				pos = this.findEditPositionFrom(pos, true);
			}
			
			if (pos < 0 || pos >= this.testString.length) { return; }
			this.setChar(ch, pos);
			pos++;
		}
	},

	testSetString: function (input, pos, rh) {
		if (input.length > this.testString.length) {
			input = input.substring(0, this.testString.length);
		}
		
		if (this._testString(input, pos, rh)) {
			this.setString(input, pos);
			return true;
		}
		return false;
	},

	toString: function (ignorePasswordChar, includePrompt, includeLiterals, start, len) {
		if (this.noMask) {
			if (!ignorePasswordChar) {
				var s = '';
				for (var i = 0; i < this.testString.length; i++) {
					s += this.getPasswordChar();
				}
				return s;
			}
			return this.testString;
		}

		ignorePasswordChar = (ignorePasswordChar === undefined) ? true : ignorePasswordChar;
		includePrompt = (includePrompt === undefined) ? true : includePrompt;
		includeLiterals = (includeLiterals === undefined) ? true : includeLiterals;
		start = (start === undefined) ? 0 : start;
		len = (len === undefined) ? this.testString.length : len;

		if (len <= 0) { return ''; }
		if (start < 0) { start = 0; }
		if (start >= this.testString.length) { return ''; }
		var num1 = this.testString.length - start;
		if (len > num1) { len = num1; }
		if ((!this.isPassword() || ignorePasswordChar) && (includePrompt && includeLiterals)) {
			var result = this.testString.substring(start, len - start);
			return result;
		}
		var builder1 = '';
		var num2 = (start + len) - 1;
		for (var num5 = start; num5 <= num2; num5++) {
			var ch = this.testString.charAt(num5);
			var cd = this.descriptors[num5];
			switch (cd.charType) {
				case wijchartype.editOptional:
				case wijchartype.editRequired:
					if (!cd.isAssigned) {
						break;
					}
					if (!this.isPassword() || ignorePasswordChar) {
						builder1 = builder1 + ch;
						continue;
					}
					builder1 = builder1 + this.getPasswordChar();
					continue;
				case (wijchartype.editRequired | wijchartype.editOptional):
					builder1 = builder1 + ch;
					continue;
				case wijchartype.separator:
				case wijchartype.literal:
					if (!includeLiterals) {
						continue;
					}
					builder1 = builder1 + ch;
					continue;
				default:
					builder1 = builder1 + ch;
					continue;
			}
			if (includePrompt) {
				builder1 = builder1 + ch;
				continue;
			}
			builder1 = builder1 + ' ';
			continue;
		}
		return builder1;
	},

	isEditDesc: function (desc) {
		if (this.noMask) { return true; }
		
		if (desc.charType !== wijchartype.editRequired) {
			return (desc.charType === wijchartype.editOptional);
		}
		return true;
	},

	isEditPos: function (pos) {
		if (this.noMask) { return true; }
		if ((pos < 0) || (pos >= this.testString.length)) { return false; }

		var cd = this.descriptors[pos];
		return this.isEditDesc(cd);
	},

	isSmartInputMode: function () {
		return !!this.inputWidget ? this.inputWidget.options.smartInputMode : false;
	},

	internalRemoveAt: function (start, end, rh, testOnly) {
		if (this.noMask) {
			try {
				this.testString = this.testString.substring(0, start) + this.testString.substring(end + 1, this.testString.length);
				rh.testPosition = start;
			}
			catch (e) {
			}
			return true;
		}
		var hint1 = new wijInputResult();
		var ch;
		var ch2;
		var num1 = this.findAssignedEditPositionFrom(this.testString.length - 1, false);
		var i = this.findEditPositionInRange(start, end, true, 0);
		rh.hint = rh.noEffect;
		if ((i === -1) || (i > num1)) {
			rh.testPosition = start;
			return true;
		}
		rh.testPosition = start;
		var flag1 = end < num1;
		if (this.findAssignedEditPositionInRange(start, end, true) !== -1) {
			rh.hint = rh.success;
		}
		if (flag1) {
			var num3 = this.findEditPositionFrom(end + 1, true);
			var num4 = num3;
			start = i;
			var repeat = true;
			while (repeat) {
				repeat = false;
				ch = this.testString.charAt(num3);
				var cd = this.descriptors[num3];
				if (((ch !== this.getPromtChar()) || cd.isAssigned) && !this.testChar(ch, i, hint1)) {
					rh.hint = hint1.hint;
					rh.testPosition = i;
					return false;
				}
				if (num3 !== num1) {
					num3 = this.findEditPositionFrom(num3 + 1, true);
					i = this.findEditPositionFrom(i + 1, true);
					repeat = true;
					continue;
				}
			}
			if (rh.sideEffect > rh.hint) {
				rh.hint = rh.sideEffect;
			}
			if (testOnly) {
				return true;
			}
			num3 = num4;
			i = start;
			var repeat2 = true;
			while (repeat2) {
				repeat2 = false;
				ch2 = this.testString.charAt(num3);
				var descriptor2 = this.descriptors[num3];
				if ((ch2 === this.getPromtChar()) && !descriptor2.isAssigned) {
					this.resetChar(i);
				}
				else {
					this.setChar(ch2, i);
					this.resetChar(num3);
				}
				if (num3 !== num1) {
					num3 = this.findEditPositionFrom(num3 + 1, true);
					i = this.findEditPositionFrom(i + 1, true);
					repeat2 = true;
					continue;
				}
			}
			start = i + 1;
		}
		if (start <= end) {
			this.resetString(start, end);
		}
		return true;
	},

	removeAt: function (start, end, rh) {
		if (typeof (end) === 'undefined') {
			end = start;
		}

		if (!rh) { rh = new wijInputResult(); }
		if (end >= this.testString.length) {
			rh.testPosition = end;
			rh.hint = rh.positionOutOfRange;
			return false;
		}
		if ((start >= 0) && (start <= end)) {
			var result = this.internalRemoveAt(start, end, rh, false);
			return result;
		}
		rh.testPosition = start;
		rh.hint = rh.positionOutOfRange;
		return false;
	}
};


////////////////////////////////////////////////////////////////////////////////
// wijCharDescriptor

var wijCharDescriptor = function (maskPos, charType) {
	this.caseConversion = 'none';
	this.maskPosition = maskPos;
	this.charType = charType;
};

wijCharDescriptor.prototype = {
	isAssigned: false,
	maskPosition: 0
};
	

})(jQuery);
