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
 * * Wijmo Inputdate widget.
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
 *	jquery.ui.wijpopup.js
 *	jquery.ui.wijcalendar.js
 *	jquery.ui.wijinputcore.js
 *
 */

(function ($) {

var wijdigits = {
	useDefault: -2,
	asIs: -1,
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8
};

$.widget("ui.wijinputdate", $.extend(true, {}, wijinputcore, {
	options: {
		///	<summary>
		///		Determines the default date value for a date input.
		///	</summary>
		date: null,
		///	<summary>
		///		The format pattern to display the date value
		///		Possible values are:
		///		"d": ShortDatePattern
		///		"D": LongDatePattern
		///     "f": Full date and time (long date and short time)
		///     "F": FullDateTimePattern
		///	    "g": General (short date and short time)
		///     "G": General (short date and long time)
		///     "m": MonthDayPattern
		///     "M": monthDayPattern
		///     "r": RFC1123Pattern
		///     "R": RFC1123Pattern
		///     "s": SortableDateTimePattern
		///     "t": shortTimePattern
		///     "T": LongTimePattern
		///     "u": UniversalSortableDateTimePattern
		///     "U": Full date and time (long date and long time) using universal time
		///     "y": YearMonthPattern
		///     "Y": yearMonthPattern
		///	</summary>
		dateFormat: 'd',
		///	<summary>
		///		Determines the value of the starting year to be used for the smart input year calculation.
		///	</summary>
		startYear: 1950,
		///	<summary>
		///		Determines the calendar element for a date input.
		///		Set to 'default' to use default calendar.
		///	</summary>
		calendar: 'default',
		///	<summary>
		///		Detemines the popup position of a calendar. See jQuery.ui.position for position options.
		///	</summary>
		popupPosition: {
			offset: '0 4'
		}
	},
	
	_createTextProvider: function(){
		this._textProvider = new wijDateTextProvider(this, this.options.dateFormat);
	},
	
	_beginUpdate: function(){
		if (this.options.date){
			this.options.date = new Date(this.options.date);
		}else{
			this.options.date = new Date();
		}
			
		this.element.data('preDate', new Date(this.options.date.getTime()));
		this._resetTimeStamp();
		if (this.options.showTrigger && !this._hasComboItems()){
			this._initCalendar();
		}
		this.element.addClass('ui-wijinput-date');
	},
	
	_endUpdate: function(){
		var self = this;
		this.element.click(function(){
			self.highLightCursor();
		});
		
		this.element.mousewheel(function(e, delta){
			self._doSpin(delta > 0, false);
		});
	},
	
	_onTriggerClicked: function(){
		if (this._hasComboItems()){
			this._popupComboList();
		}else{
			this._popupOrHideCalendar();
		}
	},

	_setOption: function (key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		wijinputcore._setOption.apply(this, arguments);

		switch (key) {
			case 'date':
				if (typeof value === "string" || typeof value === "number"){
					this.options.date = new Date(value);
				}
				this._updateText(false);
				this.highLightField();
				break;
				
			case 'dateFormat':
			case 'culture':				
				this._textProvider._setFormat(this.options.dateFormat);
				this._updateText(false);
				break;
				
			case 'activeField':
				value = Math.min(value, this._textProvider.getFieldCount() - 1);
				value = Math.max(value, 0);
				this.options.activeField = value;
				this.highLightField();
				this._resetTimeStamp();
			break;
		}
	},
	
	_resetTimeStamp: function(){
		this.element.data('cursorPos', 0);
		this.element.data('timeStamp', new Date('1900/1/1'));
	},
	
	highLightField: function(index){
		if (index === undefined) { index = this.options.activeField; }
		var range = this._textProvider.getFieldRange(index);
		if (range){
			this.element.wijtextselection(range);
		}
	},
	
	highLightCursor: function(pos){
		if (pos === undefined){
			pos = Math.max(0, this.element.wijtextselection().start);
		}

		var index = this._textProvider.getCursorField(pos);
		if (index < 0) { return; }
		this._setOption('activeField', index);
	},
	
	toNextField: function(){
		this._setOption('activeField', this.options.activeField + 1);
	},
	
	toPrevField: function(){
		this._setOption('activeField', this.options.activeField - 1);
	},
	
	toFirstField: function(){
		this._setOption('activeField', 0);
	},
	
	toLastField: function(){
		this._setOption('activeField', this._textProvider.getFieldCount());
	},
	
	clearField: function(index){
		if (index === undefined) { index = this.options.activeField; }
		var range = this._textProvider.getFieldRange(index);
		if (range){
			var rh = new wijInputResult();
			this._textProvider.removeAt(range.start, range.end, rh);
			this._updateText(false);
			var self = this;
			window.setTimeout(function(){
				self.highLightField();
			}, 1);
		}
	},
	
	_doSpin: function (up, repeating) {
		up = !!up;
		repeating = !!repeating;
		
		if (!this._allowEdit()) { return; }
		if (repeating && this.element.data('breakSpinner')) { return; }
		
		if (this._textProvider[up ? 'incEnumPart' : 'decEnumPart']()){
			this._updateText(false);
			this.highLightField();
		}

		if (repeating && !this.element.data('breakSpinner')) {
			window.setTimeout($.proxy(function () { this._doSpin(up, true) }, this),  this._calcSpinInterval());
		}
	},
	
	_afterFocused: function () {
		if ($.browser.msie){
			this.highLightCursor();
			this._resetTimeStamp();
		}else{
			var self = this;
			window.setTimeout(function(){
				self.highLightCursor();
				self._resetTimeStamp();
			}, 0);
		}
	},
	
	_keyDownPreview: function(e){
		switch(e.which){
			case $.ui.keyCode.LEFT:
				this.toPrevField();
				return true;
			break;
			
			case $.ui.keyCode.RIGHT:
				this.toNextField();
				return true;
			break;
			
			case $.ui.keyCode.TAB:
			case $.ui.keyCode.SPACE:
			case 188: 	// ,
			case 190:  	// .
			case 110: 	// . on pad
			case 191:	// /
				if (e.shiftKey){
					if (this.options.activeField > 0){
						this.toPrevField();
						return true;
					}
				}else{
					if (this.options.activeField < this._textProvider.getFieldCount() - 1){
						this.toNextField();
						return true;
					}
				}
			break;
			
			case $.ui.keyCode.HOME:
				if (e.ctrlKey){
					this._setOption('date', new Date());
				}else{
					this.toFirstField();
				}
				return true;
			break;
			
			case $.ui.keyCode.END:
				if (e.ctrlKey){
					this._setOption('date', new Date('1970/1/1'));
				}else{
					this.toLastField();
				}
				return true;
			break;
			
			case $.ui.keyCode.DELETE:
				this.clearField();
				return;
			break;
		}
		
		return false;
	},
	
	_autoMoveToNextField: function(pos){
		if (!this.options.autoNextField) { return; }
		
		if (this._textProvider.needToMove(this.options.activeField, pos)){
			this.toNextField();
		}
	},
	
	_keyPressPreview: function(e){
		var range = this._textProvider.getFieldRange(this.options.activeField);
		if (range){
			var ch = String.fromCharCode(e.which);
			var fieldSep = this._textProvider.isFieldSep(ch, this.options.activeField);
			if (fieldSep){
				this.toNextField();
				return true;
			}
			
			var cursor = this.element.data('cursorPos');
			var now = new Date(), lastTime = this.element.data('timeStamp');
			this.element.data('timeStamp', now);
			var newAction = (now.getTime() - lastTime.getTime()) > this.options.keyDelay;
			if (newAction){
				cursor = 0;
			}
			
			var pos = range.start + cursor;
			this.element.data('cursorPos', ++cursor);
			
			var ret = this._textProvider.addToField(ch, this.options.activeField, pos, !newAction);
			if (ret) {
				this._updateText(false);
				this._autoMoveToNextField(cursor);
				this.highLightField();
			}else{
				this._fireIvalidInputEvent();
			}
			
			return true;
		}
		
		return false;
	},
	
	_raiseDataChanged: function(){
		var d = this.options.date;
		var prevDt = this.element.data('preDate');
		this.element.data('preDate', new Date(d.getTime()));
		if (prevDt.getTime() !== d.getTime()) {
			this._syncCalendar();
			this._trigger('datechanged');
		}
	},
	
	isDateNull: function () {
		/// <summary>Determines whether the date is a null value.</summary>
		try {
			return (this._textProvider).isDateNull();
		}
		catch (e) {
			return true;
		}
	},

	_isMinDate: function (date) {
		return date.getFullYear() === 1 && date.getMonth() === 0 && date.getDate() === 1;
	},
	
	_initCalendar: function () {
		var c = this.options.calendar;
		if (c === undefined || c === null)	{ return; }
		if (typeof(c) === 'boolean' || c === 'default'){
			c = $("<div/>");
			c.appendTo(document.body);
		}

		var calendar = $(c);
		if (calendar.length != 1) { return; }

		this.element.data('calendar', calendar);
		calendar.wijcalendar({ popupMode: true });
		this._syncCalendar();

		var self = this;
		calendar.bind('wijcalendarselecteddateschanged', function () {
			var selDate = $(this).wijcalendar("getSelectedDate");
			$(this).wijcalendar("close");
			if (!!selDate) { self.option('date', selDate); }
			self._trySetFocus();
		});
	},

	_syncCalendar: function () {
		var calendar = this.element.data('calendar');
		if (!calendar) { return; }

		var d = this.options.date;
		if (this._isMinDate(d)) { d = new Date(); }

		calendar.wijcalendar('option', 'displayDate', d);
		calendar.wijcalendar('unSelectAll');
		calendar.wijcalendar('selectDate', d);
		calendar.wijcalendar('refresh');
	},

	_popupOrHideCalendar: function () {
		if (!this._allowEdit()) { return; }

		var calendar = this.element.data('calendar');
		if (!calendar) { return; }

		if (calendar.wijcalendar('isPopupShowing')) {
			calendar.wijcalendar('hide');
			return;
		}

		this._syncCalendar();
		calendar.wijcalendar('popup', $.extend({}, this.options.popupPosition, {of: this.outerDiv}));
	}
}));


//============================

var wijDateTextProvider = function (w, f) {
	this.inputWidget = w;
	this.descriptors = new Array(0);
	this.desPostions = new Array(0);
	this.fields = new Array(0);
	this._setFormat(f);
}

wijDateTextProvider.prototype = {
	descriptors: undefined,
	desPostions: undefined,
	maskPartsCount: 0,
	pattern: 'M/d/yyyy',
	
	initialize: function() {},
	
	getFieldCount: function(){
		return this.fields.length;
	},
	
	getFieldRange: function(index){
		var desc = this.fields[index];
		return {start: desc.startIndex, end: desc.startIndex + desc.getText().length};
	},
	
	getCursorField: function(pos){
		pos = Math.min(pos, this.desPostions.length - 1);
		pos = Math.max(pos, 0);
		var desc = this.desPostions[pos].desc;
		if (desc.type === -1){ 
			var i = $.inArray(desc, this.descriptors);
			if (i > 0 && this.descriptors[i - 1].type != -1){
				desc = this.descriptors[i - 1];
			}else{
				return -1; // liternal
			}
		}
		return $.inArray(desc, this.fields);
	},
	
	needToMove: function(index, pos){
		var desc = this.fields[index];
		return pos === desc.maxLen;
	},
	
	_getCulture: function(){
		return this.inputWidget._getCulture();
	},

	_setFormat: function (f) {
		this.descriptors = [];
		var curPattern = '';
		var prevCh = '';
		var isBegin = false;
		var liternalNext = false;
		this.pattern = this._parseFormatToPattern(f);
		for (var i = 0; i < this.pattern.length; i++) {
			var ch = this.pattern.charAt(i);
			if (liternalNext) {
				this.descriptors.push(this.createDescriptor(-1, ch));
				curPattern = '';
				liternalNext = false;
				continue;
			}
			if (ch === '\\') {
				liternalNext = true;
				if (curPattern.length > 0) {
					if (!this.handlePattern(curPattern)) {
						this.descriptors.push(this.createDescriptor(-1, prevCh));
					}
					curPattern = '';
				}
				continue;
			}
			if (ch === '\'') {
				if (isBegin){
					isBegin = false;
					curPattern = '';
				}else{
					isBegin = true;
					if (curPattern.length > 0) {
						if (!this.handlePattern(curPattern)) {
							this.descriptors.push(this.createDescriptor(-1, prevCh));
						}
						curPattern = '';
					}

				}
				continue;
			}
			if (isBegin) {
				this.descriptors.push(this.createDescriptor(-1, ch));
				curPattern = '';
				continue;
			}
			if (!i) {
				prevCh = ch;
			}
			if (prevCh !== ch && curPattern.length > 0) {
				if (!this.handlePattern(curPattern)) {
					this.descriptors.push(this.createDescriptor(-1, prevCh));
				}
				curPattern = '';
			}
			curPattern += ch;
			prevCh = ch;
		}
		if (curPattern.length > 0) {
			if (!this.handlePattern(curPattern)) {
				this.descriptors.push(this.createDescriptor(-1, prevCh));
			}
		}
		
		this.fields = $.grep(this.descriptors, function(d){
			return d.type !== -1;
		});
	},
	
	_parseFormatToPattern: function(f){
		var cf = this.inputWidget._getCulture().calendars.standard;
		var pattern = cf.patterns.d;
		if (f.length <= 1)
		{
			switch (f)
			{
				case "":
				case "d": // ShortDatePattern
					pattern = cf.patterns.d;
					break;
				case "D": // LongDatePattern
					pattern = cf.patterns.D;
					break;
				case "f": // Full date and time (long date and short time)
					pattern = cf.patterns.D + " " + cf.patterns.t;
					break;
				case "F": // FullDateTimePattern
					pattern = dtFormat.fullDateTimePattern;
					break;
				case "g": // General (short date and short time)
					pattern = cf.patterns.d + " " + cf.patterns.t;
					break;
				case "G": // General (short date and long time)
					pattern = cf.patterns.d + " " + cf.patterns.T;
					break;
				case "m": // MonthDayPattern
					pattern = cf.patterns.M;
					break;
				case "M": // monthDayPattern
					pattern = cf.patterns.M;
					break;
				// case "r": // RFC1123Pattern
					// pattern = dtFormat.RFC1123Pattern;
					// break;
				// case "R": // RFC1123Pattern
					// pattern = dtFormat.RFC1123Pattern;
					// break;
				case "s": // SortableDateTimePattern
					pattern = cf.patterns.S;
					break;
				case "t": // shortTimePattern
					pattern = cf.patterns.t;
					break;
				case "T": // LongTimePattern
					pattern = cf.patterns.T;
					break;
				case "u": // UniversalSortableDateTimePattern
					pattern = cf.patterns.S;
					break;
				case "U": // Full date and time (long date and long time) using universal time
					pattern = cf.patterns.D + " " + cf.patterns.T;
					break;
				case "y": // YearMonthPattern
					pattern = cf.patterns.Y;
					break;
				case "Y": // yearMonthPattern
					pattern = cf.patterns.Y;
					break;
			}
		}
		return pattern;
	},

	getDate: function () {
		return (!!this.inputWidget) ? this.inputWidget.options.date : undefined;
	},

	setDate: function (value) {
		if (this.inputWidget) {
			this.inputWidget.option('date', value);
		}
	},

	_internalSetDate: function (date) {
		if (this.inputWidget) {
			this.inputWidget.options.date = date;
		}
	},

	daysInMonth: function (m, y) {
		m = m - 1;
		var d = new Date(y, ++m, 1, -1).getDate();
		return d;
	},

	setYear: function (val, allowChangeOtherParts, resultObj) {
		try {
			if (resultObj && resultObj.isfullreset) {
				resultObj.offset = 1;
				val = '1970';
			}
			if (val instanceof String) {
				if (!this.isDigitString(val)) {
					return false;
				}
			}
			val = val * 1;
			if (val < 0) {
				if (resultObj && resultObj['isreset']) {
					val = 1;
				}else{
					return false;
				}
			}
			var currentDate = this.getDate();
			var testDate = new Date(currentDate.getTime());
			testDate.setFullYear(val);
			if (this._isValidDate(testDate)) {
				var mmm = this.daysInMonth(this.getMonth(), this.getYear());
				if (mmm === currentDate.getDate()) {
					testDate = new Date(currentDate.getTime());
					testDate.setDate(1);
					testDate.setFullYear(val);
					mmm = this.daysInMonth((testDate.getMonth() + 1), testDate.getFullYear());
					testDate.setDate(mmm);
					if (this._isValidDate(testDate)) {
						this._internalSetDate(testDate);
						return true;
					}else{
						return false;
					}
				}
				currentDate.setFullYear(val);
				this._internalSetDate(currentDate);
				return true;
			}
			else {
				if (resultObj && resultObj['isreset']) {
					currentDate.setFullYear(1);
					this._internalSetDate(currentDate);
					return true;
				}
				return false;
			}
		}
		catch (e) {
			return false;
		}
	},

	getYear: function () {
		try {
			var year = this.getDate().getFullYear();
			year = '' + year + '';
			while (year.length < 4) {
				year = '0' + year;
			}
			return '' + year + '';
		}
		catch (e) {
			alert('getYear() failed');
		}
		return '';
	},

	setMonth: function (val, allowChangeOtherParts, resultObj) {
		try {
			if (resultObj && resultObj.isfullreset) {
				val = '1';
			}
			val = val * 1;
			var currentDate = this.getDate();
			if (typeof (allowChangeOtherParts) !== 'undefined' && !allowChangeOtherParts) {
				if (val > 12 || val < 1) {
					if (resultObj && resultObj['isreset']) {
						val = 1;
					}else{
						return false;
					}
				}
			}
			var mmm = this.daysInMonth(this.getMonth(), this.getYear()), testDate;
			if (mmm === this.getDate().getDate()) {
				testDate = new Date(currentDate.getTime());
				testDate.setDate(1);
				testDate.setMonth(val - 1);
				mmm = this.daysInMonth((testDate.getMonth() + 1), testDate.getFullYear());
				testDate.setDate(mmm);
				if (this._isValidDate(testDate)) {
					this._internalSetDate(testDate);
					return true;
				}else{
					return false;
				}
			}
			else {
				testDate = new Date(currentDate.getTime());
				testDate.setMonth(val - 1);
				if (this._isValidDate(testDate)) {
					this._internalSetDate(testDate);
					return true;
				}else{
					return false;
				}
			}
		}
		catch (e) {
			return false;
		}
	},

	getMonth: function () {
		return (this.getDate().getMonth() + 1);
	},

	setDayOfMonth: function (val, allowChangeOtherParts, resultObj) {
		try {
			if (resultObj && resultObj.isfullreset) {
				return this.setDayOfMonth(1, allowChangeOtherParts);
			}
			var currentDate = this.getDate();
			val = val * 1;
			if (typeof (allowChangeOtherParts) !== 'undefined' && !allowChangeOtherParts) {
				var mmm = this.daysInMonth(this.getMonth(), this.getYear());
				if (val > mmm || val < 1) {
					if (resultObj && resultObj['isreset']) {
						return this.setDayOfMonth(1, allowChangeOtherParts, resultObj);
					}
					return false;
				}
			}
			var testDate = new Date(currentDate.getTime());
			testDate.setDate(val);
			if (this._isValidDate(testDate)) {
				this._internalSetDate(testDate);
				return true;
			}else{
				return false;
			}
		}
		catch (e) {
			return false;
		}
	},

	getDayOfMonth: function () {
		return this.getDate().getDate();
	},

	setHours: function (val, allowChangeOtherParts) {
		try {
			val = val * 1;
			if (typeof (allowChangeOtherParts) !== 'undefined' && !allowChangeOtherParts) {
				if (val > 24) {
					return false;
				}
			}
			var testDate = new Date(this.getDate().getTime());
			testDate.setHours(val);
			if (this._isValidDate(testDate)) {
				this._internalSetDate(testDate);
				return true;
			}else{
				return false;
			}
		}
		catch (e) {
			return false;
		}
	},

	getHours: function () {
		return this.getDate().getHours();
	},

	setMinutes: function (val, allowChangeOtherParts) {
		try {
			val = val * 1;
			if (typeof (allowChangeOtherParts) !== 'undefined' && !allowChangeOtherParts) {
				if (val > 60) {
					return false;
				}
			}
			var testDate = new Date(this.getDate().getTime());
			testDate.setMinutes(val);
			if (this._isValidDate(testDate)) {
				this._internalSetDate(testDate);
				return true;
			}else{
				return false;
			}
		}
		catch (e) {
			return false;
		}
	},

	getMinutes: function () {
		return this.getDate().getMinutes();
	},

	setSeconds: function (val, allowChangeOtherParts) {
		try {
			val = val * 1;
			if (typeof (allowChangeOtherParts) !== 'undefined' && !allowChangeOtherParts) {
				if (val > 60) {
					return false;
				}
			}
			var testDate = new Date(this.getDate().getTime());
			testDate.setSeconds(val);
			if (this._isValidDate(testDate)) {
				this._internalSetDate(testDate);
				return true;
			}else{
				return false;
			}
		}
		catch (e) {
			return false;
		}
	},

	getSeconds: function () {
		return this.getDate().getSeconds();
	},

	setDayOfWeek: function (val) {
		try {
			val = val * 1;
			var aDif = val - this.getDayOfWeek() * 1;
			return this.setDayOfMonth(this.getDayOfMonth() * 1 + aDif * 1, true);
		}
		catch (e) {
			return false;
		}
	},

	getDayOfWeek: function () {
		return (this.getDate().getDay() + 1);
	},

	handlePattern: function (p) {
		var reg = new RegExp('y{3,4}');
		var suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(10));
			return true;
		}
		reg = new RegExp('y{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(2));
			return true;
		}
		reg = new RegExp('y{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(1));
			return true;
		}
		reg = new RegExp('d{4,4}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(101));
			return true;
		}
		reg = new RegExp('d{3,3}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(100));
			return true;
		}
		reg = new RegExp('d{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(30));
			return true;
		}
		reg = new RegExp('d{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(31));
			return true;
		}
		reg = new RegExp('M{4,4}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(27));
			return true;
		}
		reg = new RegExp('M{3,3}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(26));
			return true;
		}
		reg = new RegExp('M{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(20));
			return true;
		}
		reg = new RegExp('M{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(25));
			return true;
		}
		reg = new RegExp('h{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(46));
			return true;
		}
		reg = new RegExp('h{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(45));
			return true;
		}
		reg = new RegExp('H{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(48));
			return true;
		}
		reg = new RegExp('H{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(47));
			return true;
		}
		reg = new RegExp('m{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(50));
			return true;
		}
		reg = new RegExp('m{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(51));
			return true;
		}
		reg = new RegExp('s{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(60));
			return true;
		}
		reg = new RegExp('s{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(61));
			return true;
		}
		reg = new RegExp('t{2,2}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(251));
			return true;
		}
		reg = new RegExp('t{1,1}');
		suc = reg.test(p);
		if (suc) {
			this.descriptors.push(this.createDescriptor(250));
			return true;
		}
		return false;
	},

	createDescriptor: function (t, liternal) {
		var desc = null;
		var id = this.maskPartsCount++;
		switch (t) {
			case -1:
				desc = new _dateDescriptor(this, id);
				desc.liternal = liternal;
				break;
			case 20:
				desc = new _dateDescriptor20(this, id);
				break;
			case 25:
				desc = new _dateDescriptor25(this, id);
				break;
			case 26:
				desc = new _dateDescriptor26(this, id);
				break;
			case 27:
				desc = new _dateDescriptor27(this, id);
				break;
			case 30:
				desc = new _dateDescriptor30(this, id);
				break;
			case 31:
				desc = new _dateDescriptor31(this, id);
				break;
			case 100:
				desc = new _dateDescriptor100(this, id);
				break;
			case 101:
				desc = new _dateDescriptor101(this, id);
				break;
			case 10:
				desc = new _dateDescriptor10(this, id);
				break;
			case 1:
				desc = new _dateDescriptor1(this, id);
				break;
			case 2:
				desc = new _dateDescriptor2(this, id);
				break;
			case 45:
				desc = new _dateDescriptor45(this, id);
				break;
			case 46:
				desc = new _dateDescriptor46(this, id);
				break;
			case 47:
				desc = new _dateDescriptor47(this, id);
				break;
			case 48:
				desc = new _dateDescriptor48(this, id);
				break;
			case 250:
				desc = new _dateDescriptor250(this, id);
				break;
			case 251:
				desc = new _dateDescriptor251(this, id);
				break;
			case 50:
				desc = new _dateDescriptor50(this, id);
				break;
			case 51:
				desc = new _dateDescriptor51(this, id);
				break;
			case 60:
				desc = new _dateDescriptor60(this, id);
				break;
			case 61:
				desc = new _dateDescriptor61(this, id);
				break;
			default:
				break;
		}
		return desc;
	},

	isDateNull: function () {
		var currentDate = this.getDate();
		if (!currentDate || (!currentDate.getSeconds() && !currentDate.getMinutes() && !currentDate.getHours() && currentDate.getDate() === 1 && !currentDate.getMonth() && currentDate.getFullYear() <= 1)) {
			return true;
		}
		return false;
	},

	toString: function (ignorePasswordChar, includePrompt, includeLiterals, startPosition, length) {
		if (!includePrompt && this.inputWidget.options.showNullText) {
			if (this.isDateNull()) {
				return this.inputWidget.options.nullText;
			}
		}
		var s = '', l = 0;
		this.desPostions = new Array(0);
		for (var i = 0; i < this.descriptors.length; i++) {
			this.descriptors[i].startIndex = s.length;
			var txt = '' || this.descriptors[i].getText();
			s += txt;
			for (var j = 0; j < txt.length; j++) {
				var dp = {};
				dp.desc = this.descriptors[i];
				dp.pos = j;
				dp.text = txt;
				dp.length = txt.length;
				this.desPostions.push(dp);
				l++;
				if (this.desPostions.length !== l) {
					throw 'Fatal Error !!!!!!!!!!!!!!!';
				}
			}
		}
		return s;
	},

	set: function (input, rh) {
		if (this.pattern === 'dddd' || this.pattern === 'ddd') {
			return false;
		}
		if (typeof input == 'object'){
			this._internalSetDate(new Date(input));
			return true;
		}
		
		var dt = this.getDateFromFormat(input, this.pattern);
		if (!dt) {
			dt = this._parseDate(input, this.pattern);
		}
		if (!!dt) {
			this._internalSetDate(new Date(dt));
			return true;
		}
		return false;
	},

	haveEnumParts: function () {
		return false;
	},

	removeLiterals: function (s) {
		s = '' + s + '';
		s = s.replace(new RegExp('\\s', 'g'), '');
		s = s.replace(new RegExp('[+]', 'g'), '');
		s = s.replace(new RegExp('[.]', 'g'), '');
		s = s.replace(new RegExp('[:]', 'g'), '');
		s = s.replace(new RegExp('[-]', 'g'), '');
		s = s.replace(new RegExp('[()=]', 'g'), '');
		return s;
	},

	getFirstDelimiterPos: function (aText, bText) {
		var i = 0;
		var j = 0;
		while (i < bText.length && j < aText.length) {
			var ch1 = bText.charAt(i);
			var ch2 = aText.charAt(j);
			if (ch1 === ch2) {
				j++;
			}
			else {
				return j - 1;
			}
			i++;
		}
		return aText.length - 1;
	},

	findAlikeArrayItemIndex: function (arr, txt) {
		var index = -1;
		var pos = 99999;
		for (var i = 0; i < arr.length; i++) {
			var k = arr[i].toLowerCase().indexOf(txt.toLowerCase());
			if (k !== -1 && k < pos) {
				pos = k;
				index = i;
			}
		}
		return index;
	},

	_isValidDate: function (dt) {
		if (dt === undefined) { return false; }
		if (isNaN(dt)) { return false; }
		if (dt.getFullYear() < 1 || dt.getFullYear() > 9999) { return false; }
		return true;
	},
	
	isFieldSep: function(input, activeField){
		var nextField = activeField++;
		if (nextField < this.descriptors.length){
			var desc = this.descriptors[nextField];
			if (desc.type != -1) { return false; }
			return (input === desc.text);
		}
		
		return false;
	},
	
	getPositionType: function(pos){
		var desPos = this.desPostions[pos];
		return desPos.desc.type;
	},
	
	addToField: function(input, activeField, pos, append){
		var desc = this.fields[activeField];
		if (desc.type == 10){
			return this.insertAt(input, pos);
		}
		
		var txt = append ? desc.getText() + input : input;
		var resultObj = { val: input, pos: 0, offset: 0, isreset: false };
		return desc.setText(txt, ((input.length === 1) ? false : true), resultObj);
	},

	insertAt: function (input, position, rh) {
		if (!rh) { rh = new wijInputResult(); }

		rh.testPosition = -1;
		var desPos;
		if (input.length === 1) {
			desPos = this.desPostions[position];
			if (desPos && desPos.desc.type === -1) {
				if (desPos.text === input) {
					rh.testPosition = position;
					rh.hint = rh.characterEscaped;
					return true;
				}
			}
		}
		
		var oldTxt = input, pos = position;
		input = this.removeLiterals(input);
		var txt = input;
		var tryToExpandAtRight = false, tryToExpandAtLeft = false;
		if (pos > 0 && txt.length === 1) {
			pos--;
			position = pos;
			desPos = this.desPostions[pos];
			tryToExpandAtRight = true;
			if (desPos && (desPos.desc.type === -1 || desPos.desc.getText().length !== 1)) {
				position++;
				pos++;
				tryToExpandAtRight = false;
			}
		}
		var result = false, curInsertTxt, resultObj;
		while (txt.length > 0 && pos < this.desPostions.length) {
			desPos = this.desPostions[pos];
			if (desPos.desc.type === -1) {
				pos = pos + desPos.length;
				continue;
			}
			if (desPos.desc.needAdjustInsertPos()) {
				curInsertTxt = txt.substr(0, (desPos.length - desPos.pos));
				curInsertTxt = desPos.text.slice(0, desPos.pos) + curInsertTxt + desPos.text.slice(desPos.pos + curInsertTxt.length, desPos.length);
				if (tryToExpandAtRight) {
					curInsertTxt = desPos.text + curInsertTxt;
				}
				if (tryToExpandAtLeft) {
					curInsertTxt = curInsertTxt + desPos.text;
				}
				var prevTextLength = desPos.desc.getText().length;
				var alternativeInsertText = '';
				try {
					if (input.length === 1) {
						if (!desPos.pos) {
							alternativeInsertText = input;
						}else if (desPos.pos > 0) {
							alternativeInsertText = curInsertTxt.substring(0, desPos.pos + 1);
						}
					}
				}
				catch (e) {
				}
				if (prevTextLength === 1 && curInsertTxt.length > 1 && input.length === 1) {
					if (desPos.desc.type === 31 || desPos.desc.type === 25) {
						this._disableSmartInputMode = true;
					}
				}
				resultObj = { val: input, pos: desPos.pos, offset: 0, isreset: false };
				result = desPos.desc.setText(curInsertTxt, ((input.length === 1) ? false : true), resultObj);
				this._disableSmartInputMode = false;
				if (!result && typeof (alternativeInsertText) !== 'undefined' && alternativeInsertText.length > 0 && (desPos.desc.type === 26 || desPos.desc.type === 27 || desPos.desc.type === 100 || desPos.desc.type === 101 || desPos.desc.type === 250 || desPos.desc.type === 251)) {
					result = desPos.desc.setText(alternativeInsertText, ((input.length === 1) ? false : true), resultObj);
				}
				if (result) {
					rh.hint = rh.success;
					rh.testPosition = pos + resultObj.offset;
					if (input.length === 1) {
						var aNewTextLength = desPos.desc.getText().length;
						var posAdjustValue = desPos.pos;
						if (desPos.pos > (aNewTextLength - 1)) {
							posAdjustValue = aNewTextLength;
						}
						var aDiff = aNewTextLength - prevTextLength;
						if (aDiff > 0 && desPos.pos === prevTextLength - 1) {
							posAdjustValue = aNewTextLength - 1;
						}
						var s = this.toString();
						rh.testPosition = desPos.desc.startIndex + posAdjustValue + resultObj.offset;
					}
					txt = txt.slice(desPos.length - desPos.pos, txt.length);
				}
				else {
					rh.hint = rh.invalidInput;
					if (rh.testPosition !== -1) {
						rh.testPosition = position;
					}
					if (desPos.desc.type !== -1 && input.length === 1) {
						return false;
					}
				}
				pos = pos + desPos.length;
			}else{
				var delimOrEndPos = this.getFirstDelimiterPos(txt, oldTxt);
				if (delimOrEndPos < 0) {
					delimOrEndPos = 0;
				}
				curInsertTxt = txt.substring(0, delimOrEndPos + 1);
				resultObj = { val: input, pos: desPos.pos, offset: 0, isreset: false };
				result = desPos.desc.setText(curInsertTxt, ((input.length === 1) ? false : true), resultObj);
				if (result) {
					rh.hint = rh.success;
					rh.testPosition = pos + resultObj.offset;
					txt = txt.slice(delimOrEndPos + 1, txt.length);
				}else{
					rh.hint = rh.invalidInput;
					if (rh.testPosition !== -1) {
						rh.testPosition = position;
					}
				}
				if (delimOrEndPos < 0) {
					delimOrEndPos = 0;
				}
				var aDelta = delimOrEndPos + 1;
				pos = pos + aDelta;
			}
		}
		return result;
	},

	removeAt: function (start, end, rh) {
		try {
			var desPos = this.desPostions[start];
			if (desPos.desc.needAdjustInsertPos()) {
				var curInsertTxt = '0';
				var pos = start;
				desPos.text = desPos.desc.getText();
				curInsertTxt = desPos.text.slice(0, desPos.pos) + curInsertTxt + desPos.text.slice(desPos.pos + curInsertTxt.length, desPos.length);
				var resultObj = { val: curInsertTxt, pos: desPos.pos, offset: 0, isreset: true, isfullreset: false };
				if ((end - start + 1) >= desPos.length) {
					resultObj.isfullreset = true;
					start = start + desPos.length;
					pos = start;
				}
				var result = desPos.desc.setText(curInsertTxt, false, resultObj);
				if (result) {
					rh.hint = rh.success;
					rh.testPosition = pos;
				}else {
					rh.hint = rh.invalidInput;
					if (rh.testPosition === -1) {
						rh.testPosition = start;
					}
				}
			}
			if (start < end) {
				this.removeAt(start + 1, end, rh);
			}
			return true;
		}
		catch (e) {
			return false;
		}
	},

	incEnumPart: function () {
		var desc = this.fields[this.inputWidget.options.activeField];
		if (desc){
			desc.inc();
		}
		return true;
	},

	decEnumPart: function (pos) {
		var desc = this.fields[this.inputWidget.options.activeField];
		if (desc){
			desc.dec();
		}
		return true;
	},

	setValue: function (val) {
		this.setDate(new Date(val instanceof Date ? val.getTime() : val));
		return true;
	},

	getValue: function () {
		return this.getDate();
	},

	_disableSmartInputMode: false,

	_isSmartInputMode: function () {
		if (this._disableSmartInputMode) { return false; }
		if (this.inputWidget) { return this.inputWidget.options.smartInputMode; }
		return true;
	},

	_getInt: function (str, i, minlength, maxlength) {
		for (var x = maxlength; x >= minlength; x--) {
			var token = str.substring(i, i + x);
			if (token.length < minlength) {
				return null;
			}
			if ($.wij.charValidator.isDigit(token)) {
				return token;
			}
		}
		return null;
	},

	getDateFromFormat: function (val, format) {
		var cf = this._getCulture().calendars.standard;
	
		var monthNames = $.merge($.merge([], cf.months.names), cf.months.namesAbbr);
		var dayNames = $.merge($.merge([], cf.days.names), cf.days.namesShort);
		val = val + '';
		format = format + '';
		var i_val = 0, i_format = 0, c = '', token = '', x = 0, y = 0;
		var now = new Date(), year = now.getFullYear(), month = now.getMonth() + 1;
		var date = 1, hh = 0, mm = 0, ss = 0, ampm = '';
		var comment = false, escape = false;
		while (i_format < format.length) {
			c = format.charAt(i_format);
			token = '';
			while ((format.charAt(i_format) === c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
				if (escape) {
					break;
				}
			}
			if (escape) {
				i_val += token.length;
				escape = false;
			}else if (token === '\\') {
				escape = true;
			}else if (token === '\'') {
				comment = !comment;
			}else if (comment) {
				i_val += token.length;
			}else if (token === 'yyyy' || token === 'yy' || token === 'y') {
				if (token === 'yyyy') {
					x = 4;
					y = 4;
				}
				if (token === 'yy') {
					x = 2;
					y = 2;
				}
				if (token === 'y') {
					x = 2;
					y = 4;
				}
				year = this._getInt(val, i_val, x, y);
				if (!year) {
					return 0;
				}
				i_val += (year).length;
				if ((year).length === 2) {
					if (year > 70) {
						year = 1900 + (year - 0);
					}else {
						year = 2000 + (year - 0);
					}
				}
			}
			else if (token === 'MMMM' || token === 'MMM' || token === 'NNN') {
				month = 0;
				for (var i = 0; i < monthNames.length; i++) {
					var month_name = monthNames[i];
					if (val.substring(i_val, i_val + month_name.length).toLowerCase() === month_name.toLowerCase()) {
						if ((token === 'MMM' || token === 'MMMM') || (token === 'NNN' && i > 11)) {
							month = i + 1;
							if (month > 12) {
								month = month - 12;
							}
							i_val += month_name.length;
							break;
						}
					}
				}
				if ((month < 1) || (month > 12)) {
					return 0;
				}
			}
			else if (token === 'dddd' || token === 'ddd' || token === 'EE' || token === 'E') {
				for (var i = 0; i < dayNames.length; i++) {
					var day_name = dayNames[i];
					if (val.substring(i_val, i_val + day_name.length).toLowerCase() === day_name.toLowerCase()) {
						i_val += day_name.length;
						break;
					}
				}
			}
			else if (token === 'MM' || token === 'M') {
				month = this._getInt(val, i_val, token.length, 2);
				if (!month || (month < 1) || (month > 12)) {
					return 0;
				}
				i_val += (month).length;
			}
			else if (token === 'dd' || token === 'd') {
				date = this._getInt(val, i_val, token.length, 2);
				if (!date || (date < 1) || (date > 31)) {
					return 0;
				}
				i_val += (date).length;
			}
			else if (token === 'hh' || token === 'h') {
				hh = this._getInt(val, i_val, token.length, 2);
				if (!hh || (hh < 1) || (hh > 12)) {
					return 0;
				}
				i_val += (hh).length;
			}
			else if (token === 'HH' || token === 'H') {
				hh = this._getInt(val, i_val, token.length, 2);
				if (!hh || (hh < 0) || (hh > 23)) {
					return 0;
				}
				i_val += (hh).length;
			}
			else if (token === 'KK' || token === 'K') {
				hh = this._getInt(val, i_val, token.length, 2);
				if (!hh || (hh < 0) || (hh > 11)) {
					return 0;
				}
				i_val += (hh).length;
			}
			else if (token === 'kk' || token === 'k') {
				hh = this._getInt(val, i_val, token.length, 2);
				if (!hh || (hh < 1) || (hh > 24)) {
					return 0;
				}
				i_val += (hh).length;
				hh = hh - 1;
			}
			else if (token === 'mm' || token === 'm') {
				mm = this._getInt(val, i_val, token.length, 2);
				if (!mm || (mm < 0) || (mm > 59)) {
					return 0;
				}
				i_val += (mm).length;
			}
			else if (token === 'ss' || token === 's') {
				ss = this._getInt(val, i_val, token.length, 2);
				if (!ss || (ss < 0) || (ss > 59)) {
					return 0;
				}
				i_val += (ss).length;
			}
			else if (token === 'tt' || token === 't' || token === 'a') {
				if (val.substring(i_val, i_val + 2).toLowerCase() === 'am') {
					ampm = 'AM';
					i_val += 2;
				}
				else if (val.substring(i_val, i_val + 2).toLowerCase() === 'pm') {
					ampm = 'PM';
					i_val += 2;
				}
				else if (val.substring(i_val, i_val + 1).toLowerCase() === 'a') {
					ampm = 'AM';
					i_val += 1;
				}
				else if (val.substring(i_val, i_val + 1).toLowerCase() === 'p') {
					ampm = 'PM';
					i_val += 1;
				}
				else if (val.substring(i_val, i_val + cf.AM[0].length).toLowerCase() === cf.AM[0].toLowerCase()) {
					ampm = 'AM';
					i_val += cf.AM[0].length;
				}
				else if (val.substring(i_val, i_val + cf.PM[0].length).toLowerCase() === cf.PM[0].toLowerCase()) {
					ampm = 'PM';
					i_val += cf.AM[0].length;
				}
				else if (val.substring(i_val, i_val + 1).toLowerCase() === ' ') {
					i_val += 1;
				}
			}
			else {
				var chch = val.substring(i_val, i_val + token.length);
				if (chch !== token) {
					return 0;
				}else {
					i_val += token.length;
				}
			}
		}
		if (i_val !== val.length) {
			return 0;
		}
		if (month === 2) {
			if (((!year % 4) && (year % 100)) || (!year % 400)) {
				if (date > 29) {
					return 0;
				}
			}
			else {
				if (date > 28) {
					return 0;
				}
			}
		}
		if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
			if (date > 30) {
				return 0;
			}
		}
		if (hh < 12 && ampm === 'PM') {
			hh = hh - 0 + 12;
		}
		else if (hh > 11 && ampm === 'AM') {
			hh = hh - 12;
		}
		var newdate = new Date(year, month - 1, date, hh, mm, ss);
		newdate.setFullYear(year);
		return newdate.getTime();
	},

	_parseDate: function (val, pattern) {
		if (pattern) {
			if (pattern.indexOf('MMM') === -1 && pattern.indexOf('MMMM') === -1) {
				pattern = pattern.replace('MM', 'M');
			}
			pattern = pattern.replace('dd', 'd');
			pattern = pattern.replace('tt', 'a');
		}
		var preferEuro = false;
		window.generalFormats = [(!pattern) ? 'y/M/d' : pattern, 'y-M-d', 'MMM d, y', 'MMM d,y', 'y-MMM-d', 'd-MMM-y', 'MMM d'];
		window.monthFirst = ['M/d/y', 'M-d-y', 'M.d.y', 'MMM-d', 'M/d', 'M-d'];
		window.dateFirst = ['d/M/y', 'd-M-y', 'd.M.y', 'd-MMM', 'd/M', 'd-M'];
		var checkList = ['generalFormats', (preferEuro) ? 'dateFirst' : 'monthFirst', (preferEuro) ? 'monthFirst' : 'dateFirst'];
		var d;
		for (var i = 0; i < checkList.length; i++) {
			var l = (window)[checkList[i]];
			for (var j = 0; j < l.length; j++) {
				d = this.getDateFromFormat(val, l[j]);
				if (d) {
					return d;
				}
			}
		}
		return 0;
	},

	paddingZero: function (val, aCount) {
		var s = '' + val + '';
		while (s.length < aCount) {
			s = '0' + s;
		}
		return s;
	},

	_formatDate: function (d, f, ci) {
		if (!(d.valueOf())) {
			return '&nbsp;';
		}

		var self = this;
		var sRes = f.replace(new RegExp('yyyy|MMMM|MMM|MM|M|mm|m|dddd|ddd|dd|d|hh|h|HH|H|ss|s|tt|t|a/p', 'gi'), function(match){
			var h;
			switch (match) {
				case 'yyyy':
					return d.getFullYear();
				case 'MMMM':
					return ci.dateTimeFormat.monthNames[d.getMonth()];
				case 'MMM':
					return ci.dateTimeFormat.abbreviatedMonthNames[d.getMonth()];
				case 'MM':
					return self.paddingZero((d.getMonth() + 1), 2);
				case 'M':
					return self.paddingZero((d.getMonth() + 1), 1);
				case 'mm':
					return self.paddingZero(d.getMinutes(), 2);
				case 'm':
					return self.paddingZero(d.getMinutes(), 1);
				case 'dddd':
					return ci.dateTimeFormat.dayNames[d.getDay()];
				case 'ddd':
					return ci.dateTimeFormat.abbreviatedDayNames[d.getDay()];
				case 'dd':
					return self.paddingZero(d.getDate(), 2);
				case 'd':
					return self.paddingZero(d.getDate(), 1);
				case 'hh':
					h = d.getHours() % 12;
					return self.paddingZero(((h) ? h : 12), 2);
				case 'h':
					h = d.getHours() % 12;
					return self.paddingZero(((h) ? h : 12), 1);
				case 'HH':
					return self.paddingZero(d.getHours(), 2);
				case 'H':
					return self.paddingZero(d.getHours(), 1);
				case 'ss':
					return self.paddingZero(d.getSeconds(), 2);
				case 's':
					return self.paddingZero(d.getSeconds(), 1);
				case 'tt':
					return (d.getHours() < 12) ? cf.AM[0] : cf.PM[0];
				case 't':
					return (d.getHours() < 12) ? ((cf.AM[0].length > 0) ? cf.AM[0].charAt(0) : '') : ((cf.PM[0].length > 0) ? cf.PM[0].charAt(0) : '');
				case 'a/p':
					return (d.getHours() < 12) ? 'a' : 'p';
			}
			return 'N';
		});
		return sRes;
	}
}


////////////////////////////////////////////////////////////////////////////////
// _iDateDescriptor

var _iDateDescriptor = function (tp, id, type, len) {
	this._txtProvider = tp;
	this.id = id;
	this.type = type;
	this.startIndex = 0;
	this.maxLen = len || 2;
}
_iDateDescriptor.prototype = {
	_txtProvider: null,
	id: 0,
	type: 0,
	name: null,
	startIndex: 0,
	maxLen: 2,

	getText: function () {return null;},
	setText: function (value, allowchangeotherpart, result) {return false;},
	inc: function () {},
	dec: function () {},
	needAdjustInsertPos: function () {return true;},
	reachMaxLen: function(){ 
		var t = this.getText();
		do{
			if (t.charAt(0) === '0'){
				t = t.slice(1);
			}else{
				break;
			}
		}while(t.length > 0)
		return t.length >= this.maxLen;
	}
}

var wijImplementInterface = function (target, interfaceType) {
	for (var methodName in interfaceType.prototype) {
		var method = interfaceType.prototype[methodName];
		if (!target.prototype[methodName]) {
			target.prototype[methodName] = method;
		}
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor

var _dateDescriptor = function (owner, id) {
	wijImplementInterface(_dateDescriptor, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, -1, 100]);
}
_dateDescriptor.prototype = {
	liternal: '',

	getText: function () {
		return this.liternal;
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor20

var _dateDescriptor20 = function (owner, id) {
	wijImplementInterface(_dateDescriptor20, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 20]);
	this.name = 'Two-digit month';
}
_dateDescriptor20.prototype = {
	getText: function () {
		var m = '' + this._txtProvider.getMonth() + '';
		return m.length === 1 ? ('0' + m) : m;
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setMonth(value, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor25

var _dateDescriptor25 = function (owner, id) {
	wijImplementInterface(_dateDescriptor25, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 25]);
	this.name = 'month';
}
_dateDescriptor25.prototype = {

	getText: function () {
		var m = '' + this._txtProvider.getMonth() + '';
		return m;
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setMonth(value, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor26

var _dateDescriptor26 = function (owner, id) {
	wijImplementInterface(_dateDescriptor26, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 26, 100]);
	this.name = 'AbbreviatedMonthNames';
}
_dateDescriptor26.prototype = {

	getText: function () {
		var m = this._txtProvider.getMonth(), culture = this._txtProvider._getCulture();
		return culture.calendars.standard.months.namesAbbr[m - 1];
	},

	setText: function (value, allowchangeotherpart, result) {
		var m = -1;
		m = this._txtProvider.findAlikeArrayItemIndex(cf.months.namesAbbr, value);
		if (m === -1) {
			return false;
		}
		return this._txtProvider.setMonth(m + 1, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor27

var _dateDescriptor27 = function (owner, id) {
	wijImplementInterface(_dateDescriptor27, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 27, 100]);
	this.name = 'MonthNames';
}
_dateDescriptor27.prototype = {

	getText: function () {
		var m = this._txtProvider.getMonth(), culture = this._txtProvider._getCulture();
		return culture.calendars.standard.months.names[m - 1];
	},

	setText: function (value, allowchangeotherpart, result) {
		var m = -1;
		if (result && result.isfullreset) {
			m = 1;
		}
		else {
			var culture = this._txtProvider._getCulture();
			m = this._txtProvider.findAlikeArrayItemIndex(culture.calendars.standard.months.names, value);
			if (m === -1) {
				return false;
			}
		}
		return this._txtProvider.setMonth(m + 1, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setMonth(this._txtProvider.getMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor30

var _dateDescriptor30 = function (owner, id) {
	wijImplementInterface(_dateDescriptor30, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 30]);
	this.name = 'Two-digit day of month';
}
_dateDescriptor30.prototype = {

	getText: function () {
		var aDayOfMonth = this._txtProvider.getDayOfMonth();
		if (aDayOfMonth < 10) {
			aDayOfMonth = '0' + aDayOfMonth;
		}
		return '' + aDayOfMonth + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setDayOfMonth(value, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor31

var _dateDescriptor31 = function (owner, id) {
	wijImplementInterface(_dateDescriptor31, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 31]);
	this.name = 'Day of month';
}
_dateDescriptor31.prototype = {

	getText: function () {
		var aDayOfMonth = this._txtProvider.getDayOfMonth();
		return '' + aDayOfMonth + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setDayOfMonth(value, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor100

var _dateDescriptor100 = function (owner, id) {
	wijImplementInterface(_dateDescriptor100, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 100, 100]);
	this.name = 'AbbreviatedDayNames';
}
_dateDescriptor100.prototype = {

	getText: function () {
		var dw = this._txtProvider.getDayOfWeek(), culture = this._txtProvider._getCulture();
		return culture.calendars.standard.days.namesShort[dw - 1];
	},

	setText: function (value, allowchangeotherpart, result) {
		var dw = -1, culture = this._txtProvider._getCulture();
		dw = this._txtProvider.findAlikeArrayItemIndex(culture.calendars.standard.days.namesShort, value);
		if (dw === -1) {
			return false;
		}
		return this._txtProvider.setDayOfWeek(dw + 1);
	},

	inc: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 - 1, true);
	},

	needAdjustInsertPos: function () {
		return false;
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor101

var _dateDescriptor101 = function (owner, id) {
	wijImplementInterface(_dateDescriptor101, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 101, 100]);
	this.name = 'DayNames';
}
_dateDescriptor101.prototype = {

	getText: function () {
		var dw = this._txtProvider.getDayOfWeek(), culture = this._txtProvider._getCulture();
		return culture.calendars.standard.days.names[dw - 1];
	},

	setText: function (value, allowchangeotherpart, result) {
		var dw = -1, culture = this._txtProvider._getCulture();
		dw = this._txtProvider.findAlikeArrayItemIndex(culture.calendars.standard.days.names, value);
		if (dw === -1) {
			return false;
		}
		return this._txtProvider.setDayOfWeek(dw + 1);
	},

	inc: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setDayOfMonth(this._txtProvider.getDayOfMonth() * 1 - 1, true);
	},

	needAdjustInsertPos: function () {
		return false;
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor10

var _dateDescriptor10 = function (owner, id) {
	wijImplementInterface(_dateDescriptor10, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 10, 4]);
	this.name = 'Four-digit year';
}

_dateDescriptor10.prototype = {
	getText: function () {
		return this._txtProvider.getYear();
	},

	setText: function (value, allowchangeotherpart, result) {
		if (this._txtProvider._isSmartInputMode() && result) {
			var startYear = 1900 + 100;
			if (this._txtProvider.inputWidget.options.startYear) {
				startYear = this._txtProvider.inputWidget.options.startYear;
			}
			var endYear = startYear + 100 - 1;
			startYear = this._txtProvider.paddingZero(startYear, 4);
			endYear = this._txtProvider.paddingZero(endYear, 4);
			if (result.pos === 0 || result.pos === 1) {
				var curDate = new Date();
				//var curYear = this._txtProvider.paddingZero(curDate.getFullYear(), 4);
				var thisYear = this._txtProvider.paddingZero(this._txtProvider.getYear(), 4);
				if (thisYear.charAt(0) === '0' && thisYear.charAt(1) === '0' && result.pos <= 1) {
					var inputNum = result.val * 1;
					var century = '00';
					if (inputNum >= 5) {
						century = startYear.slice(0, 2);
					}
					else {
						century = endYear.slice(0, 2);
					}
					var addYear = result.val + thisYear.slice(3, 4);
					var s = century + addYear;
					result.offset = 2 - result.pos;
					this._txtProvider.setYear(s, allowchangeotherpart, result);
					return true;
				}
			}
		}
		return this._txtProvider.setYear(value, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor1

var _dateDescriptor1 = function (owner, id) {
	wijImplementInterface(_dateDescriptor1, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 1]);
	this.name = 'One-digit year';
}
_dateDescriptor1.prototype = {

	getText: function () {
		var y = this._txtProvider.getYear();
		y = '' + y + '';
		if (y.length === 4) {
			y = y.charAt(2) + y.charAt(3);
		}
		if (y.charAt(0) === '0') {
			y = y.charAt(1);
		}
		return y;
	},

	setText: function (value, allowchangeotherpart, result) {
		value = value + '';
		while (value.length < 2) {
			value = '0' + value;
		}
		var y = this._txtProvider.getYear();
		y = '' + y + '';
		if (value === '00') {
			var m = this._txtProvider.getMonth();
			var aDayOfMonth = this._txtProvider.getDayOfMonth();
			var h = this._txtProvider.getHours();
			var min = this._txtProvider.getMinutes();
			var s = this._txtProvider.getSeconds();
			if (m === 1 && aDayOfMonth === 1 && !h && !min && !s) {
				y = '0001';
				value = '01';
			}
		}
		if (y.length >= 2) {
			y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
		}
		return this._txtProvider.setYear(y, allowchangeotherpart, result);
	},

	inc: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor2

var _dateDescriptor2 = function (owner, id) {
	wijImplementInterface(_dateDescriptor2, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 2]);
	this.name = 'Two-digit year';
}
_dateDescriptor2.prototype = {

	getText: function () {
		var y = this._txtProvider.getYear();
		y = '' + y + '';
		if (y.length === 4) {
			y = y.charAt(2) + y.charAt(3);
		}
		return y;
	},

	setText: function (value, allowchangeotherpart, result) {
		value = value + '';
		while (value.length < 2) {
			value = '0' + value;
		}
		var y = this._txtProvider.getYear();
		y = '' + y + '';
		if (value === '00') {
			var m = this._txtProvider.getMonth();
			var aDayOfMonth = this._txtProvider.getDayOfMonth();
			var h = this._txtProvider.getHours();
			var min = this._txtProvider.getMinutes();
			var s = this._txtProvider.getSeconds();
			if (m === 1 && aDayOfMonth === 1 && !h && !min && !s) {
				y = '0001';
				value = '01';
			}
		}
		if (y.length >= 2) {
			y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
		}
		var aRes = this._txtProvider.setYear(y, allowchangeotherpart, result);
		return aRes;
	},

	inc: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor45

var _dateDescriptor45 = function (owner, id) {
	wijImplementInterface(_dateDescriptor45, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 45]);
	this.name = 'h';
}
_dateDescriptor45.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours();
		if (h > 12) {
			h = h - 12;
		}
		if (!h) {
			h = 12;
		}
		return '' + h + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		var h = this._txtProvider.getHours();
		if (h > 12) {
			value = ((value * 1) + 12);
		}
		return this._txtProvider.setHours(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor46

var _dateDescriptor46 = function (owner, id) {
	wijImplementInterface(_dateDescriptor46, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 46]);
	this.name = 'hh';
}
_dateDescriptor46.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours();
		if (h > 12) {
			h = h - 12;
		}
		if (!h) {
			h = 12;
		}
		if (h < 10) {
			h = '0' + h;
		}
		return '' + h + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		var h = this._txtProvider.getHours();
		if (h > 12) {
			value = ((value * 1) + 12);
		}
		return this._txtProvider.setHours(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor47

var _dateDescriptor47 = function (owner, id) {
	wijImplementInterface(_dateDescriptor47, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 47]);
	this.name = 'H';
}
_dateDescriptor47.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours();
		return '' + h + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setHours(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor48

var _dateDescriptor48 = function (owner, id) {
	wijImplementInterface(_dateDescriptor48, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 48]);
	this.name = 'HH';
}
_dateDescriptor48.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours();
		if (h < 10) {
			h = '0' + h;
		}
		return '' + h + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setHours(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor250

var _dateDescriptor250 = function (owner, id) {
	wijImplementInterface(_dateDescriptor250, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 250]);
	this.name = 't';
}
_dateDescriptor250.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours(), ds = '', culture = this._txtProvider._getCulture();
		if (h < 12) {
			ds = culture.calendars.standard.AM[0];
		}
		else {
			ds = culture.calendars.standard.PM[0];
		}
		if (ds.length <= 0) {
			ds = ' ';
		}
		return ds.charAt(0);
	},

	setText: function (value, allowchangeotherpart, result) {
		return true;
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 12, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 12, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor251

var _dateDescriptor251 = function (owner, id) {
	wijImplementInterface(_dateDescriptor251, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 251]);
	this.name = 'tt';
}
_dateDescriptor251.prototype = {

	getText: function () {
		var h = this._txtProvider.getHours(), ds = '', culture = this._txtProvider._getCulture();
		if (h < 12) {
			ds = culture.calendars.standard.AM[0];
		}
		else {
			ds = culture.calendars.standard.PM[0];
		}
		if (ds.length <= 0) {
			ds = ' ';
		}
		return ds;
	},

	setText: function (value, allowchangeotherpart, result) {
		return true;
	},

	inc: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 + 12, true);
	},

	dec: function () {
		this._txtProvider.setHours(this._txtProvider.getHours() * 1 - 12, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor50

var _dateDescriptor50 = function (owner, id) {
	wijImplementInterface(_dateDescriptor50, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 50]);
	this.name = 'mm';
}
_dateDescriptor50.prototype = {

	getText: function () {
		var min = this._txtProvider.getMinutes();
		if (min < 10) {
			min = '0' + min;
		}
		return '' + min + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setMinutes(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 + 1, true);
	},

	dec: function () {
		this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 - 1, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor51

var _dateDescriptor51 = function (owner, id) {
	wijImplementInterface(_dateDescriptor51, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 51]);
	this.name = 'm';
}
_dateDescriptor51.prototype = {

	getText: function () {
		var min = this._txtProvider.getMinutes();
		return '' + min + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setMinutes(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 + 12, true);
	},

	dec: function () {
		this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 - 12, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor60

var _dateDescriptor60 = function (owner, id) {
	wijImplementInterface(_dateDescriptor60, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 60]);
	this.name = 'ss';
}
_dateDescriptor60.prototype = {

	getText: function () {
		var s = this._txtProvider.getSeconds();
		if (s < 10) {
			s = '0' + s;
		}
		return '' + s + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setSeconds(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 + 12, true);
	},

	dec: function () {
		this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 - 12, true);
	}
}


////////////////////////////////////////////////////////////////////////////////
// _dateDescriptor61

var _dateDescriptor61 = function (owner, id) {
	wijImplementInterface(_dateDescriptor61, _iDateDescriptor);
	_iDateDescriptor.apply(this, [owner, id, 61]);
	this.name = 's';
}
_dateDescriptor61.prototype = {

	getText: function () {
		var s = this._txtProvider.getSeconds();
		return '' + s + '';
	},

	setText: function (value, allowchangeotherpart, result) {
		return this._txtProvider.setSeconds(value, allowchangeotherpart);
	},

	inc: function () {
		this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 + 12, true);
	},

	dec: function () {
		this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 - 12, true);
	}
}

})(jQuery);