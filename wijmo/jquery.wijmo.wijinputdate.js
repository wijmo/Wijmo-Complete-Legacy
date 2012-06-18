/*
 *
 * Wijmo Library 2.1.1
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
 *	globalize.js
 *	jquery.plugin.wijtextselection.js
 *	jquery.mousewheel.js
 *	jquery.wijmo.wijpopup.js
 *	jquery.wijmo.wijcalendar.js
 *	jquery.wijmo.wijinputcore.js
 *
 */

(function ($) {
    "use strict";
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

    $.widget("wijmo.wijinputdate", $.extend(true, {}, wijinputcore, {
        options: {
            ///	<summary>
            ///		Determines the default date value for a date input.
            ///	</summary>
            date: null,
            ///	<summary>
            ///		Determines the minimal date that can be entered.
            ///	</summary>
            minDate: null,
            ///	<summary>
            ///		Determines the maximum date that can be entered.
            ///	</summary>
            maxDate: null,
            ///	<summary>
            ///		The format pattern to display the date value
            ///		wijinputdate supports two types of formats: Standard Format and Custom Format.
            ///
            ///		A standard date and time format string uses a single format specifier to 
            ///		define the text representation of a date and time value. 
            ///
            ///		Possible values for Standard Format are:
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
            ///
            ///		Any date and time format string that contains more than one character, including white space, 
            ///		is interpreted as a custom date and time format string. For example: 
            ///		"mmm-dd-yyyy", "mmmm d, yyyy", "mm/dd/yyyy", "d-mmm-yyyy", "ddd, mmmm dd, yyyy" etc.
            ///
            ///		Below are the custom date and time format specifiers:
            ///
            ///		"d": The day of the month, from 1 through 31. 
            ///		"dd": The day of the month, from 01 through 31.
            ///		"ddd": The abbreviated name of the day of the week.
            ///		"dddd": The full name of the day of the week.
            ///		"m": The minute, from 0 through 59.
            ///		"mm": The minute, from 00 through 59.
            ///		"M": The month, from 1 through 12.
            ///		"MM": The month, from 01 through 12.
            ///		"MMM": The abbreviated name of the month.
            ///		"MMMM": The full name of the month.
            ///		"y": The year, from 0 to 99.
            ///		"yy": The year, from 00 to 99
            ///		"yyy": The year, with a minimum of three digits.
            ///		"yyyy": The year as a four-digit number
            ///		"h": The hour, using a 12-hour clock from 1 to 12.
            ///		"hh": The hour, using a 12-hour clock from 01 to 12.
            ///		"H": The hour, using a 24-hour clock from 0 to 23.
            ///		"HH": The hour, using a 24-hour clock from 00 to 23.
            ///		"s": The second, from 0 through 59.
            ///		"ss": The second, from 00 through 59.
            ///		"t": The first character of the AM/PM designator.
            ///		"tt": The AM/PM designator.
            ///	</summary>
            dateFormat: 'd',
            ///	<summary>
            ///		Determines the value of the starting year to be used for the smart input year calculation.
            ///	</summary>
            startYear: 1950,
            ///	<summary>
            ///		Allows smart input behavior.
            ///	</summary>
            smartInputMode: true,
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
            ///		Determines the calendar element for a date input.
            ///		Set to 'default' to use default calendar.
            ///	</summary>
            calendar: 'default',
            ///	<summary>
            ///		Detemines the popup position of a calendar. See jQuery.ui.position for position options.
            ///	</summary>
            popupPosition: {
                offset: '0 4'
            },
            /// <summary>
            /// The dateChanged event handler. A function called when the date of the input is changed.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#element").wijinputdate({ dateChanged: function (e, arg) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            /// <param name="args" type="Object">
            /// The data with this event.
            /// args.date: The new date.
            ///</param>
            dateChanged: null
        },

        _createTextProvider: function () {
            this._textProvider = new wijDateTextProvider(this, this.options.dateFormat);
        },

        _strToDate: function (str) {
            return this._textProvider.parseDate(str);
        },

        _beginUpdate: function () {
            var o = this.options,
				strDate,
				date = null;

            if (o.minDate) {
                if (typeof o.minDate === 'string') {
                    o.minDate = this._strToDate(o.minDate);
                }
            }

            if (o.maxDate) {
                if (typeof o.maxDate === 'string') {
                    o.maxDate = this._strToDate(o.maxDate);
                }
            }

            if (!o.date) {
                if (!!this.element.data('elementValue')) {
                    strDate = this.element.data('elementValue');
                }
            } else {
                if (typeof o.date === 'string') {
                    strDate = o.date;
                } else {
                    date = o.date;
                }
            }

            if (strDate) {
                date = this._strToDate(strDate);
            }

            this._safeSetDate(date);

            this.element.data({
                defaultDate: date === null ? date : new Date(o.date.getTime()),
                preDate: date === null ? date : new Date(o.date.getTime())
            });
            this._resetTimeStamp();
            if (o.showTrigger && !this._hasComboItems()) {
                this._initCalendar();
            }
            this.element.addClass('wijmo-wijinput-date')
				.attr({
				    'aria-valuemin': new Date(1900, 1, 1),
				    'aria-valuemax': new Date(2099, 1, 1),
				    'aria-valuenow': o.date
				});
        },

        _endUpdate: function () {
            var self = this;
            this.element.click(function () {
                self._highLightCursor();
            });

            this.element.mousewheel(function (e, delta) {
                self._doSpin(delta > 0, false);
            });
        },

        _onTriggerClicked: function () {
            if (this._hasComboItems()) {
                this._popupComboList();
            } else {
                this._popupOrHideCalendar();
            }
        },

        _isValidDate: function (date, chkBounds) {
            var o = this.options;
            if (date === undefined) { return false; }
            if (isNaN(date)) { return false; }
            if (date.getFullYear() < 1 || date.getFullYear() > 9999) { return false; }

            if (chkBounds) {
                if (o.minDate) {
                    if (date < o.minDate) { return false; }
                }

                if (o.maxDate) {
                    if (date > o.maxDate) { return false; }
                }
            }

            return true;
        },
		
		_checkRange: function(date){
			var o = this.options;
			if (!!date){
				if (o.minDate && date < o.minDate) {
					date = new Date(Math.max(o.minDate, date));
				}

				if (o.maxDate && date > o.maxDate) {
					date = new Date(Math.min(o.maxDate, date));
				}
			}
			
			return date;
		},

        _safeSetDate: function (date) {
            var o = this.options, cache = date;

			date = this._checkRange(date);
			if (isNaN(date)) {
				date = cache;
			}

            o.date = date;
            return true;
        },
		
		_safeGetDate: function(){
			var o = this.options, date = o.date;
			if (!date){
				date = new Date();
			}
			
			date = this._checkRange(date);
			return date;
		},

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);
            wijinputcore._setOption.apply(this, arguments);

            switch (key) {
                case 'date':
                    if (!!value) {
                        if (typeof value === "string") {
                            value = this._strToDate(value);
                        } else if (typeof value === "object") {
                            value = new Date(value.getTime());
                        } else {
                            value = new Date(value);
                        }

                        if (isNaN(value)) {
                            value = new Date();
                        }
                    }
                    this._safeSetDate(value);
                    this._updateText();
                    this._highLightField();

                    break;

                case 'dateFormat':
                case 'culture':
                    this._textProvider._setFormat(this.options.dateFormat);
                    this._updateText();
                    break;

                case 'activeField':
                    value = Math.min(value, this._textProvider.getFieldCount() - 1);
                    value = Math.max(value, 0);
                    this.options.activeField = value;
                    this._highLightField();
                    this._resetTimeStamp();
                    break;
            }
        },

        _setData: function (val) {
            this.option('date', val);
        },

        _resetData: function () {
            var o = this.options;

            var d = this.element.data('defaultDate');
            if (d === undefined || d === null) {
                d = this.element.data('elementValue');
                if (d !== undefined && d !== null && d !== "") {
					this.setText(val);
                } else {
                    this._setData(null);
                }
            } else {
                this._setData(d);
            }
        },

        _resetTimeStamp: function () {
            this.element.data('cursorPos', 0);
            this.element.data('timeStamp', new Date('1900/1/1'));
        },

        getPostValue: function () {
            /// <summary>Gets the text value when the container form is posted back to server.</summary>
            if (!this._isInitialized()) { return this.element.val(); }
            if (this.options.showNullText && this.isDateNull()) { return ""; }

            var val = this._textProvider.toString();
            if (val === this.options.nullText) { return ""; }

            return val;
        },

        _highLightField: function (index) {
            if (index === undefined) { index = this.options.activeField; }
            if (this.isFocused()) {
                var range = this._textProvider.getFieldRange(index);
                if (range) {
                    this.element.wijtextselection(range);
                }
            }
        },

        _highLightCursor: function (pos) {
            if (this._isNullText()) {
                return;
            }

            if (pos === undefined) {
                pos = Math.max(0, this.element.wijtextselection().start);
            }

            var index = this._textProvider.getCursorField(pos);
            if (index < 0) { return; }
            this._setOption('activeField', index);
        },

        _toNextField: function () {
            this._setOption('activeField', this.options.activeField + 1);
        },

        _toPrevField: function () {
            this._setOption('activeField', this.options.activeField - 1);
        },

        _toFirstField: function () {
            this._setOption('activeField', 0);
        },

        _toLastField: function () {
            this._setOption('activeField', this._textProvider.getFieldCount());
        },

        _clearField: function (index) {
            if (index === undefined) { index = this.options.activeField; }
            var range = this._textProvider.getFieldRange(index);
            if (range) {
                var rh = new wijInputResult();
                this._textProvider.removeAt(range.start, range.end, rh);
                this._updateText();
                var self = this;
                window.setTimeout(function () {
                    self._highLightField();
                }, 1);
            }
        },

        _doSpin: function (up, repeating) {
            up = !!up;
            repeating = !!repeating;

            if (!this._allowEdit()) { return; }
            if (repeating && this.element.data('breakSpinner')) { return; }

            if (this._textProvider[up ? 'incEnumPart' : 'decEnumPart']()) {
                this._updateText();
                this._highLightField();
            }

            if (repeating && !this.element.data('breakSpinner')) {
                window.setTimeout($.proxy(function () { this._doSpin(up, true); }, this), this._calcSpinInterval());
            }
        },
		
		_onChange: function (e) {
		},

        _afterFocused: function () {
            if (this._isNullText()) {
                this._doFocus();
            }

            var self = this,
				hc = function () {
				    self._highLightCursor();
				    self._resetTimeStamp();
				};

            window.setTimeout(hc, 10);
        },

        _keyDownPreview: function (e) {
            var key = e.keyCode || e.which;
            switch (key) {
                case $.ui.keyCode.LEFT:
                    this._toPrevField();
                    return true;
                    break;

                case $.ui.keyCode.RIGHT:
                    this._toNextField();
                    return true;
                    break;

                case $.ui.keyCode.TAB:
                case $.ui.keyCode.SPACE:
                case 188: // ,
                case 190: // .
                case 110: // . on pad
                case 191: // /
                    if (e.shiftKey) {
                        if (this.options.activeField > 0) {
                            this._toPrevField();
                            return true;
                        }
                    } else {
                        if (this.options.activeField < this._textProvider.getFieldCount() - 1) {
                            this._toNextField();
                            return true;
                        }
                    }
                    break;

                case $.ui.keyCode.HOME:
                    if (e.ctrlKey) {
                        this._setOption('date', new Date());
                    } else {
                        this._toFirstField();
                    }
                    return true;
                    break;

                case $.ui.keyCode.END:
                    if (e.ctrlKey) {
                        this._setOption('date', new Date('1970/1/1'));
                    } else {
                        this._toLastField();
                    }
                    return true;
                    break;

                case $.ui.keyCode.DELETE:
                    if (this._allowEdit()) {
                        var selRange = this.element.wijtextselection();
                        if (selRange.end - selRange.start === this.element.val().length) {
                            this._setOption('date', new Date('1970/1/1'));
                        } else {
                            this._clearField();
                        }
                        return true;
                    }
                    break;
            }

            return false;
        },

        _autoMoveToNextField: function (pos, ch) {
            if (!this.options.autoNextField) { return; }

            if (this._textProvider.needToMove(this.options.activeField, pos, ch)) {
                this._toNextField();
            }
        },

        _keyPressPreview: function (e) {
            var key = e.keyCode || e.which;
			if (key === $.ui.keyCode.ENTER) {
				if (this.isDateNull()){
					this.options.date = new Date();
				}
				return false;
			}
		
            var range = this._textProvider.getFieldRange(this.options.activeField);
            if (range) {
                if (key === $.ui.keyCode.TAB) {
                    return true;
                }

                if (key === $.ui.keyCode.SPACE) {
                    this._stopEvent(e);
                    return true;
                }

                var ch = String.fromCharCode(key);
                var fieldSep = this._textProvider.isFieldSep(ch, this.options.activeField);
                if (fieldSep) {
                    this._toNextField();
                    this._stopEvent(e);
                    return true;
                }

                var cursor = this.element.data('cursorPos');
                var now = new Date(), lastTime = this.element.data('timeStamp');
                this.element.data('timeStamp', now);
                var newAction = (now.getTime() - lastTime.getTime()) > this.options.keyDelay;
                if (newAction) {
                    cursor = 0;
                }

                var pos = range.start + cursor;
                this.element.data('cursorPos', ++cursor);

                var ret = this._textProvider.addToField(ch, this.options.activeField, pos, !newAction);
                if (ret) {
                    this._updateText();
                    this._autoMoveToNextField(cursor, ch);
                    this._highLightField();
                } else {
					this._resetTimeStamp();
                    this._fireIvalidInputEvent();
                }

                this._stopEvent(e);
                return true;
            }

            return false;
        },

        _raiseDataChanged: function () {
            var d = this.options.date;
            var prevDt = this.element.data('preDate');
            this.element.data('preDate', !d ? null : new Date(d.getTime()));
			
            if ((!prevDt && d) || (prevDt && !d) || (prevDt && d && (prevDt.getTime() !== d.getTime()))) {
                this._syncCalendar();
                this.element.attr('aria-valuenow', d);
                this._trigger('dateChanged', null, { date: d });
            }
        },

        isDateNull: function () {
            /// <summary>Determines whether the date is a null value.</summary>
			return this.options.date === null || this.options.date === undefined;
        },

        _isMinDate: function (date) {
            return date.getFullYear() === 1 && date.getMonth() === 0 && date.getDate() === 1;
        },

        _initCalendar: function () {
            var c = this.options.calendar;
            if (c === undefined || c === null) { return; }
            if (typeof (c) === 'boolean' || c === 'default') {
                c = $("<div/>");
                c.appendTo(document.body);
            }

            var calendar = $(c);
            if (calendar.length != 1) { return; }

            this.element.data('calendar', calendar);
            calendar.wijcalendar({ popupMode: true, culture: this.options.culture });
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

            var o = this.options,
				d = this._safeGetDate();
            if (this._isMinDate(d)) { d = new Date(); }

            calendar.wijcalendar('option', 'displayDate', d);

            if (o.minDate) {
                calendar.wijcalendar('option', 'minDate', o.minDate);
            }

            if (o.maxDate) {
                calendar.wijcalendar('option', 'maxDate', o.maxDate);
            }

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
				this._trySetFocus();
                return;
            }

            this._syncCalendar();
            calendar.wijcalendar('popup', $.extend({}, this.options.popupPosition, { of: this.outerDiv }));
        },

        _isCalendarVisible: function () {
            if (!this._allowEdit()) { return false; }

            var calendar = this.element.data('calendar');
            if (!calendar) { return false; }

            return calendar.wijcalendar('isPopupShowing');
        },

        _popupVisible: function () {
            if (this._hasComboItems()) {
                return this._isComboListVisible();
            } else {
                return this._isCalendarVisible();
            }

            return false;
        }
    }));


    //============================

    var wijDateTextProvider = function (w, f) {
        this.inputWidget = w;
        this.descriptors = new Array(0);
        this.desPostions = new Array(0);
        this.fields = new Array(0);
        this._setFormat(f);
    };

    wijDateTextProvider.prototype = {
        descriptors: undefined,
        desPostions: undefined,
        maskPartsCount: 0,
        pattern: 'M/d/yyyy',

        initialize: function () { },

        getFieldCount: function () {
            return this.fields.length;
        },

        getFieldRange: function (index) {
            var desc = this.fields[index];
            return { start: desc.startIndex, end: desc.startIndex + desc.getText().length };
        },

        getCursorField: function (pos) {
            pos = Math.min(pos, this.desPostions.length - 1);
            pos = Math.max(pos, 0);
            var desc = this.desPostions[pos].desc;
            if (desc.type === -1) {
                var i = $.inArray(desc, this.descriptors);
                if (i > 0 && this.descriptors[i - 1].type != -1) {
                    desc = this.descriptors[i - 1];
                } else {
                    return -1; // liternal
                }
            }
            return $.inArray(desc, this.fields);
        },

        needToMove: function (index, pos, ch) {
            if (!this.inputWidget._isValidDate(this.inputWidget._safeGetDate(), true)) { return false; }

            var desc = this.fields[index];
            if (pos === desc.maxLen) { return true; }

            var val = ch * 1;
            if (isNaN(val)) { return false; }

            switch (desc.type) {
                case 20:
                case 25:
                case 45:
                case 46:
                    return val > 1;
                    break;

                case 47:
                case 48:
                    return val > 2;
                    break;

                case 30:
                case 31:
                    return val > 3;
                    break;

                case 50:
                case 51:
                case 60:
                case 61:
                    return val > 6;
                    break;
            }

            return false;
        },

        _getCulture: function () {
            return this.inputWidget._getCulture();
        },

        _isDigitString: function (s) {
            s = $.trim(s);
            if (s.length === 0) { return true; }

            var c = s.charAt(0);
            if (c === '+' || c === '-') {
                s = s.substr(1);
                s = $.trim(s);
            }
            if (s.length === 0) { return true; }
            try {
                var f = parseFloat(s);
                var t = f.toString();
                return t === s;
            }
            catch (e) {
                return false;
            }
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
                    if (isBegin) {
                        isBegin = false;
                        curPattern = '';
                    } else {
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

            this.fields = $.grep(this.descriptors, function (d) {
                return d.type !== -1;
            });
        },

        _parseFormatToPattern: function (f) {
            var cf = this.inputWidget._getCulture().calendars.standard;
            var pattern = cf.patterns.d;
            if (f.length <= 1) {
                switch (f) {
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
                    case "F": // Full date and time (long date and long time)
                        pattern = cf.patterns.D + " " + cf.patterns.T;
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
            } else {
                pattern = f;
            }

            return pattern;
        },

        getDate: function () {
            return (!!this.inputWidget) ? new Date(this.inputWidget._safeGetDate().getTime()) : undefined;
        },

        setDate: function (value) {
            if (this.inputWidget) {
                this.inputWidget._setData(value);
            }
        },

        _internalSetDate: function (date) {
            if (this.inputWidget) {
                var self = this,
					o = this.inputWidget.options,
					inputElement = this.inputWidget.element,
					typing = !!inputElement.data('typing');

                if (typing) {
                    o.date = date;

                    var chkBounds = function () {
                        var now = new Date(), lastTime = inputElement.data('timeStamp');
                        if ((now.getTime() - lastTime.getTime()) > o.keyDelay) {
                            self.inputWidget._safeSetDate(o.date);
                            self.inputWidget._updateText();
                            self.inputWidget._highLightField();
                        } else {
                            window.setTimeout(chkBounds, o.keyDelay);
                        }
                    }

                    window.setTimeout(chkBounds, o.keyDelay);
                } else {
                    this.inputWidget._safeSetDate(date);
                }
            }
        },

        daysInMonth: function (m, y) {
            m = m - 1;
            var d = new Date(y, ++m, 1, -1).getDate();
            return d;
        },

        setYear: function (val, resultObj, chkBounds) {
            try {
                if (resultObj && resultObj.isfullreset) {
                    resultObj.offset = 1;
                    val = '1970';
                }
                if (typeof val === 'string') {
                    if (!this._isDigitString(val)) {
                        return false;
                    }
                }
                val = val * 1;

                var o = this.inputWidget.options,
					minYear = 1,
					maxYear = 9999;

                if (chkBounds) {
                    if (o.minDate) {
                        minYear = Math.max(minYear, o.minDate.getFullYear());
                    }

                    if (o.maxDate) {
                        maxYear = Math.min(maxYear, o.maxDate.getFullYear());
                    }
                }

                if (resultObj && resultObj.isreset) {
                    val = minYear;
                }

                if (val < minYear) {
                    val = minYear;
                }

                if (val > maxYear) {
                    val = maxYear;
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
                        } else {
                            return false;
                        }
                    }
                    currentDate.setFullYear(val);
                    this._internalSetDate(currentDate);
                    return true;
                }
                else {
                    if (resultObj && resultObj.isreset) {
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
                        if (resultObj && resultObj.isreset) {
                            val = 1;
                        } else {
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
                    } else {
                        return false;
                    }
                }
                else {
                    testDate = new Date(currentDate.getTime());
                    testDate.setMonth(val - 1);
                    if (this._isValidDate(testDate)) {
                        this._internalSetDate(testDate);
                        return true;
                    } else {
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
                        if (resultObj && resultObj.isreset) {
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
                } else {
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
                } else {
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
                } else {
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
                } else {
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

        toString: function () {
            if (this.inputWidget.options.showNullText && !this.inputWidget.isFocused() && this.inputWidget.isDateNull()) {
                return this.inputWidget.options.nullText;
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

        parseDate: function (str) {
            var date;
            if (this.pattern === 'dddd' ||
				this.pattern === 'ddd' ||
				typeof str == 'object') {
                try {
                    date = new Date(str);
                    if (isNaN(date)) {
                        date = new Date();
                    }
                }
                catch (e) {
                    date = new Date();
                }
            } else {
                date = Globalize.parseDate(str, this.pattern, this._getCulture());
                if (!date) {
                    date = this._tryParseDate(str, this.pattern);
                }
                if (!date) {
                    date = new Date();
                }
            }
            return date;
        },

        set: function (input, rh) {
            this._internalSetDate(new Date(this.parseDate(input)));
            return true;
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
            return this.inputWidget._isValidDate(dt);
        },

        isFieldSep: function (input, activeField) {
            var nextField = activeField++;
            if (nextField < this.descriptors.length) {
                var desc = this.descriptors[nextField];
                if (desc.type != -1) { return false; }
                return (input === desc.text);
            }

            return false;
        },

        getPositionType: function (pos) {
            var desPos = this.desPostions[pos];
            return desPos.desc.type;
        },

        addToField: function (input, activeField, pos, append) {
            var desc = this.fields[activeField];
            if (desc.type == 10) {
                return this.insertAt(input, pos);
            }

            var txt = append ? desc.getText() + input : input;
            var resultObj = { val: input, pos: 0, offset: 0, isreset: false };
            this.inputWidget.element.data('typing', true);
            var ret = desc.setText(txt, ((input.length === 1) ? false : true), resultObj);
            this.inputWidget.element.data('typing', false);
            return ret;
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
                    var altInsertText = '';
                    try {
                        if (input.length === 1) {
                            if (!desPos.pos) {
                                altInsertText = input;
                            } else if (desPos.pos > 0) {
                                altInsertText = curInsertTxt.substring(0, desPos.pos + 1);
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
                    if (!result && typeof (altInsertText) !== 'undefined' && altInsertText.length > 0 && (desPos.desc.type === 26 || desPos.desc.type === 27 || desPos.desc.type === 100 || desPos.desc.type === 101 || desPos.desc.type === 250 || desPos.desc.type === 251)) {
                        result = desPos.desc.setText(altInsertText, ((input.length === 1) ? false : true), resultObj);
                    }
                    if (result) {
                        rh.hint = rh.success;
                        rh.testPosition = pos + resultObj.offset;
                        if (input.length === 1) {
                            var newTextLength = desPos.desc.getText().length;
                            var posAdjustValue = desPos.pos;
                            if (desPos.pos > (newTextLength - 1)) {
                                posAdjustValue = newTextLength;
                            }
                            var diff = newTextLength - prevTextLength;
                            if (diff > 0 && desPos.pos === prevTextLength - 1) {
                                posAdjustValue = newTextLength - 1;
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
                } else {
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
                    } else {
                        rh.hint = rh.invalidInput;
                        if (rh.testPosition !== -1) {
                            rh.testPosition = position;
                        }
                    }
                    if (delimOrEndPos < 0) {
                        delimOrEndPos = 0;
                    }
                    var delta = delimOrEndPos + 1;
                    pos = pos + delta;
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
                    } else {
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
            if (desc) {
                desc.inc();
            }
            return true;
        },

        decEnumPart: function (pos) {
            var desc = this.fields[this.inputWidget.options.activeField];
            if (desc) {
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

        _tryParseDate: function (val, pattern) {
            var ci = this._getCulture().calendars;
            pattern = pattern || ci.standard.patterns.d;
            if (pattern) {
                if (pattern.indexOf('MMM') === -1 && pattern.indexOf('MMMM') === -1) {
                    pattern = pattern.replace('MM', 'M');
                }
                pattern = pattern.replace('dd', 'd');
                pattern = pattern.replace('tt', 'a');
            }

            var pattern2 = pattern.replace('yyyy', 'yy'),
				sep = ci.standard["/"],
				patterns = [pattern, pattern2, pattern.replace(new RegExp(sep, 'g'), '-'), pattern2.replace(new RegExp(sep, 'g'), '-'), pattern.replace(new RegExp(sep, 'g'), '.'), pattern2.replace(new RegExp(sep, 'g'), '.')],
				d = Globalize.parseDate(val, patterns, this._getCulture());

            if (d) {
                return d;
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
            var sRes = f.replace(new RegExp('yyyy|MMMM|MMM|MM|M|mm|m|dddd|ddd|dd|d|hh|h|HH|H|ss|s|tt|t|a/p', 'gi'), function (match) {
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
    };


    ////////////////////////////////////////////////////////////////////////////////
    // _iDateDescriptor

    var _iDateDescriptor = function (tp, id, type, len) {
        this._txtProvider = tp;
        this.id = id;
        this.type = type;
        this.startIndex = 0;
        this.maxLen = len || 2;
    };

    _iDateDescriptor.prototype = {
        _txtProvider: null,
        id: 0,
        type: 0,
        name: null,
        startIndex: 0,
        maxLen: 2,

        getText: function () { return null; },
        setText: function (value, allowchangeotherpart, result) { return false; },
        inc: function () { },
        dec: function () { },
        needAdjustInsertPos: function () { return true; },
        reachMaxLen: function () {
            var t = this.getText();
            do {
                if (t.charAt(0) === '0') {
                    t = t.slice(1);
                } else {
                    break;
                }
            } while (t.length > 0);
            return t.length >= this.maxLen;
        }
    };

    var wijImplementInterface = function (target, interfaceType) {
        for (var name in interfaceType.prototype) {
            if (!target.prototype[name]) {
                target.prototype[name] = interfaceType.prototype[name];
            }
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor

    var _dateDescriptor = function (owner, id) {
        wijImplementInterface(_dateDescriptor, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, -1, 100]);
    };

    _dateDescriptor.prototype = {
        liternal: '',

        getText: function () {
            return this.liternal;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor20

    var _dateDescriptor20 = function (owner, id) {
        wijImplementInterface(_dateDescriptor20, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 20]);
        this.name = 'Two-digit month';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor25

    var _dateDescriptor25 = function (owner, id) {
        wijImplementInterface(_dateDescriptor25, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 25]);
        this.name = 'month';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor26

    var _dateDescriptor26 = function (owner, id) {
        wijImplementInterface(_dateDescriptor26, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 26, 100]);
        this.name = 'AbbreviatedMonthNames';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor27

    var _dateDescriptor27 = function (owner, id) {
        wijImplementInterface(_dateDescriptor27, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 27, 100]);
        this.name = 'MonthNames';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor30

    var _dateDescriptor30 = function (owner, id) {
        wijImplementInterface(_dateDescriptor30, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 30]);
        this.name = 'Two-digit day of month';
    };

    _dateDescriptor30.prototype = {

        getText: function () {
            var dom = this._txtProvider.getDayOfMonth();
            if (dom < 10) {
                dom = '0' + dom;
            }
            return '' + dom + '';
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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor31

    var _dateDescriptor31 = function (owner, id) {
        wijImplementInterface(_dateDescriptor31, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 31]);
        this.name = 'Day of month';
    };

    _dateDescriptor31.prototype = {

        getText: function () {
            var dom = this._txtProvider.getDayOfMonth();
            return '' + dom + '';
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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor100

    var _dateDescriptor100 = function (owner, id) {
        wijImplementInterface(_dateDescriptor100, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 100, 100]);
        this.name = 'AbbreviatedDayNames';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor101

    var _dateDescriptor101 = function (owner, id) {
        wijImplementInterface(_dateDescriptor101, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 101, 100]);
        this.name = 'DayNames';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor10

    var _dateDescriptor10 = function (owner, id) {
        wijImplementInterface(_dateDescriptor10, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 10, 4]);
        this.name = 'Four-digit year';
    };

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
                    var curDate = new Date(),
						thisYear = this._txtProvider.paddingZero(this._txtProvider.getYear(), 4);
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
                        this._txtProvider.setYear(s, result);
                        return true;
                    }
                }
            }
            return this._txtProvider.setYear(value, result);
        },

        inc: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, null, true);
        },

        dec: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, null, true);
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor1

    var _dateDescriptor1 = function (owner, id) {
        wijImplementInterface(_dateDescriptor1, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 1]);
        this.name = 'One-digit year';
    };

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
                var dom = this._txtProvider.getDayOfMonth();
                var h = this._txtProvider.getHours();
                var min = this._txtProvider.getMinutes();
                var s = this._txtProvider.getSeconds();
                if (m === 1 && dom === 1 && !h && !min && !s) {
                    y = '0001';
                    value = '01';
                }
            }
            if (y.length >= 2) {
                y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
            }
            return this._txtProvider.setYear(y, result);
        },

        inc: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, null, true);
        },

        dec: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, null, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor2

    var _dateDescriptor2 = function (owner, id) {
        wijImplementInterface(_dateDescriptor2, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 2]);
        this.name = 'Two-digit year';
    };

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
                var dom = this._txtProvider.getDayOfMonth();
                var h = this._txtProvider.getHours();
                var min = this._txtProvider.getMinutes();
                var s = this._txtProvider.getSeconds();
                if (m === 1 && dom === 1 && !h && !min && !s) {
                    y = '0001';
                    value = '01';
                }
            }
            if (y.length >= 2) {
                y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
            }
            var aRes = this._txtProvider.setYear(y, result);
            return aRes;
        },

        inc: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 + 1, null, true);
        },

        dec: function () {
            this._txtProvider.setYear(this._txtProvider.getYear() * 1 - 1, null, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor45

    var _dateDescriptor45 = function (owner, id) {
        wijImplementInterface(_dateDescriptor45, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 45]);
        this.name = 'h';
    };

    _dateDescriptor45.prototype = {

        getText: function () {
            var h = this._txtProvider.getHours();
            if (h > 12) {
                h = h - 12;
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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor46

    var _dateDescriptor46 = function (owner, id) {
        wijImplementInterface(_dateDescriptor46, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 46]);
        this.name = 'hh';
    };

    _dateDescriptor46.prototype = {

        getText: function () {
            var h = this._txtProvider.getHours();
            if (h > 12) {
                h = h - 12;
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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor47

    var _dateDescriptor47 = function (owner, id) {
        wijImplementInterface(_dateDescriptor47, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 47]);
        this.name = 'H';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor48

    var _dateDescriptor48 = function (owner, id) {
        wijImplementInterface(_dateDescriptor48, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 48]);
        this.name = 'HH';
    };

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
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor250

    var _dateDescriptor250 = function (owner, id) {
        wijImplementInterface(_dateDescriptor250, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 250]);
        this.name = 't';
    };

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
            var h;
            if (value.toLowerCase().indexOf('a') >= 0) {
                h = (this._txtProvider.getHours() * 1) % 12;
                this._txtProvider.setHours(h, true);
            } else if (value.toLowerCase().indexOf('p') >= 0) {
                h = (this._txtProvider.getHours() * 1) % 12 + 12;
                this._txtProvider.setHours(h, true);
            }
        },

        inc: function () {
            var h = (this._txtProvider.getHours() * 1 + 12) % 24;
            this._txtProvider.setHours(h, true);
        },

        dec: function () {
            var h = (this._txtProvider.getHours() * 1 + 12) % 24;
            this._txtProvider.setHours(h, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor251

    var _dateDescriptor251 = function (owner, id) {
        wijImplementInterface(_dateDescriptor251, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 251]);
        this.name = 'tt';
    };

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
            var h;
            if (value.toLowerCase().indexOf('a') >= 0) {
                h = (this._txtProvider.getHours() * 1) % 12;
                this._txtProvider.setHours(h, true);
            } else if (value.toLowerCase().indexOf('p') >= 0) {
                h = (this._txtProvider.getHours() * 1) % 12 + 12;
                this._txtProvider.setHours(h, true);
            }

            return true;
        },

        inc: function () {
            var h = (this._txtProvider.getHours() * 1 + 12) % 24;
            this._txtProvider.setHours(h, true);
        },

        dec: function () {
            var h = (this._txtProvider.getHours() * 1 + 12) % 24;
            this._txtProvider.setHours(h, true);
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor50

    var _dateDescriptor50 = function (owner, id) {
        wijImplementInterface(_dateDescriptor50, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 50]);
        this.name = 'mm';
    };

    _dateDescriptor50.prototype = {

        getText: function () {
            var min = this._txtProvider.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }
            return '' + min + '';
        },

        setText: function (value, allowchangeotherpart, result) {
            if (result && result.isfullreset) {
                value = '0';
            }

            return this._txtProvider.setMinutes(value, allowchangeotherpart);
        },

        inc: function () {
            this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 + 1, true);
        },

        dec: function () {
            this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 - 1, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor51

    var _dateDescriptor51 = function (owner, id) {
        wijImplementInterface(_dateDescriptor51, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 51]);
        this.name = 'm';
    };

    _dateDescriptor51.prototype = {

        getText: function () {
            var min = this._txtProvider.getMinutes();
            return '' + min + '';
        },

        setText: function (value, allowchangeotherpart, result) {
            if (result && result.isfullreset) {
                value = '0';
            }

            return this._txtProvider.setMinutes(value, allowchangeotherpart);
        },

        inc: function () {
            this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 + 12, true);
        },

        dec: function () {
            this._txtProvider.setMinutes(this._txtProvider.getMinutes() * 1 - 12, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor60

    var _dateDescriptor60 = function (owner, id) {
        wijImplementInterface(_dateDescriptor60, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 60]);
        this.name = 'ss';
    };

    _dateDescriptor60.prototype = {

        getText: function () {
            var s = this._txtProvider.getSeconds();
            if (s < 10) {
                s = '0' + s;
            }
            return '' + s + '';
        },

        setText: function (value, allowchangeotherpart, result) {
            if (result && result.isfullreset) {
                value = '0';
            }
            return this._txtProvider.setSeconds(value, allowchangeotherpart);
        },

        inc: function () {
            this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 + 12, true);
        },

        dec: function () {
            this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 - 12, true);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////
    // _dateDescriptor61

    var _dateDescriptor61 = function (owner, id) {
        wijImplementInterface(_dateDescriptor61, _iDateDescriptor);
        _iDateDescriptor.apply(this, [owner, id, 61]);
        this.name = 's';
    };

    _dateDescriptor61.prototype = {

        getText: function () {
            var s = this._txtProvider.getSeconds();
            return '' + s + '';
        },

        setText: function (value, allowchangeotherpart, result) {
            if (result && result.isfullreset) {
                value = '0';
            }
            return this._txtProvider.setSeconds(value, allowchangeotherpart);
        },

        inc: function () {
            this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 + 12, true);
        },

        dec: function () {
            this._txtProvider.setSeconds(this._txtProvider.getSeconds() * 1 - 12, true);
        }
    };

})(jQuery);
