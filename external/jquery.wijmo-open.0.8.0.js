/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Common utility.
 *
 * Depends:
 *  jquery.ui.core.js
 *
 */
/*Replace inner content by iframe and load content using given url*/
(function ($) {
    $.fn.extend({
        wijContent: function (url) {
            return this.each(function () {
                this.innerHTML = '<iframe frameborder="0" style="width: 100%; height: 100%;" src="' + url + '">"';
            });
        }
    });

    var naNTest = function (num){
        return isNaN(num) ? 0 : num;
    };

    $.fn.leftBorderWidth = function () {
        var blw = parseFloat($(this).css("borderLeftWidth"));
        var pl = parseFloat($(this).css("padding-left"));
        var ml = 0;
        if ($(this).css("margin-left") != "auto") {
            ml = parseFloat($(this).css("margin-left"));
        }
        
        return naNTest(blw) + naNTest(pl) + naNTest(ml);
    };

    $.fn.rightBorderWidth = function () {
        var brw = parseFloat($(this).css("borderRightWidth"));
        var pr = parseFloat($(this).css("padding-right"));
        var mr = 0;
        if ($(this).css("margin-right") != "auto") {
            mr = parseFloat($(this).css("margin-right"));
        }
        return naNTest(brw) + naNTest(pr) + naNTest(mr);
    };

    $.fn.topBorderWidth = function () {
        var blw = parseFloat($(this).css("borderTopWidth"));
        var pl = parseFloat($(this).css("padding-top"));
        var ml = 0;
        if ($(this).css("margin-top") != "auto") {
            ml = parseFloat($(this).css("margin-top"));
        }
        return naNTest(blw) + naNTest(pl) + naNTest(ml);
    };

    $.fn.bottomBorderWidth = function () {
        var brw = parseFloat($(this).css("borderBottomWidth"));
        var pr = parseFloat($(this).css("padding-bottom"));
        var mr = 0;
        if ($(this).css("margin-bottom") != "auto") {
            mr = parseFloat($(this).css("margin-bottom"));
        }
        return naNTest(brw) + naNTest(pr) + naNTest(mr);
    };

    $.fn.borderSize = function () {
        var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
        var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
        var b = { width: bw, height: bh };
        return b;
    };

    $.fn.setOutWidth = function (width) {
        var bw = $(this).leftBorderWidth() + $(this).rightBorderWidth();
        $(this).width(width - bw);
        return this;
    };

    $.fn.setOutHeight = function (height) {
        var bh = $(this).topBorderWidth() + $(this).bottomBorderWidth();
        $(this).height(height - bh);
        return this;
    };
	
	$.fn.getWidget = function () {
		var widgetName = this.data("widgetName");

		if (widgetName && widgetName != "") {
			return this.data(widgetName);
		}

		return null;
	};
	
	var wijCharValidator = function(){};
	$.extend(wijCharValidator.prototype, {
		_UTFPunctuationsString: ' ! \" # % & \' ( ) * , - . / : ; ? @ [ \\ ] { } \u00a1 \u00ab \u00ad \u00b7 \u00bb \u00bf \u037e \u0387 \u055a \u055b \u055c \u055d \u055e \u055f \u0589 \u058a \u05be \u05c0 \u05c3 \u05f3 \u05f4 \u060c \u061b \u061f \u066a \u066b \u066c \u066d \u06d4 \u0700 \u0701 \u0702 \u0703 \u0704 \u0705 \u0706 \u0707 \u0708 \u0709 \u070a \u070b \u070c \u070d \u0964 \u0965 \u0970 \u0df4 \u0e4f \u0e5a \u0e5b \u0f04 \u0f05 \u0f06 \u0f07 \u0f08 \u0f09 \u0f0a \u0f0b \u0f0c \u0f0d \u0f0e \u0f0f \u0f10 \u0f11 \u0f12 \u0f3a \u0f3b \u0f3c \u0f3d \u0f85 \u104a \u104b \u104c \u104d \u104e \u104f \u10fb \u1361 \u1362 \u1363 \u1364 \u1365 \u1366 \u1367 \u1368 \u166d \u166e \u169b \u169c \u16eb \u16ec \u16ed \u17d4 \u17d5 \u17d6 \u17d7 \u17d8 \u17d9 \u17da \u17dc \u1800 \u1801 \u1802 \u1803 \u1804 \u1805 \u1806 \u1807 \u1808 \u1809 \u180a \u2010 \u2011 \u2012 \u2013 \u2014 \u2015 \u2016 \u2017 \u2018 \u2019 \u201a \u201b \u201c \u201d \u201e \u201f \u2020 \u2021 \u2022 \u2023 \u2024 \u2025 \u2026 \u2027 \u2030 \u2031 \u2032 \u2033 \u2034 \u2035 \u2036 \u2037 \u2038 \u2039 \u203a \u203b \u203c \u203d \u203e \u2041 \u2042 \u2043 \u2045 \u2046 \u2048 \u2049 \u204a \u204b \u204c \u204d \u207d \u207e \u208d \u208e \u2329 \u232a \u3001 \u3002 \u3003 \u3008 \u3009 \u300a \u300b \u300c \u300d \u300e \u300f \u3010 \u3011 \u3014 \u3015 \u3016 \u3017 \u3018 \u3019 \u301a \u301b \u301c \u301d \u301e \u301f \u3030 \ufd3e \ufd3f \ufe30 \ufe31 \ufe32 \ufe35 \ufe36 \ufe37 \ufe38 \ufe39 \ufe3a \ufe3b \ufe3c \ufe3d \ufe3e \ufe3f \ufe40 \ufe41 \ufe42 \ufe43 \ufe44 \ufe49 \ufe4a \ufe4b \ufe4c \ufe50 \ufe51 \ufe52 \ufe54 \ufe55 \ufe56 \ufe57 \ufe58 \ufe59 \ufe5a \ufe5b \ufe5c \ufe5d \ufe5e \ufe5f \ufe60 \ufe61 \ufe63 \ufe68 \ufe6a \ufe6b \uff01 \uff02 \uff03 \uff05 \uff06 \uff07 \uff08 \uff09 \uff0a \uff0c \uff0d \uff0e \uff0f \uff1a \uff1b \uff1f \uff20 \uff3b \uff3c \uff3d \uff5b \uff5d \uff61 \uff62 \uff63 \uff64\';this.UTFWhitespacesString_=\'\t \u000b \u000c \u001f   \u00a0 \u1680 \u2000 \u2001 \u2002 \u2003 \u2004 \u2005 \u2006 \u2007 \u2008 \u2009 \u200a \u200b \u2028 \u202f \u3000',

		isDigit: function (c) {
			return (c >= '0' && c <= '9');
		},

		isLetter: function (c) {
			return !!((c + '').match(new RegExp('[A-Za-z\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u021f\u0222-\u0233\u0250-\u02ad\u02b0-\u02b8\u02bb-\u02c1\u02d0\u02d1\u02e0-\u02e4\u02ee\u037a\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d7\u03da-\u03f3\u0400-\u0481\u048c-\u04c4\u04c7\u04c8\u04cb\u04cc\u04d0-\u04f5\u04f8\u04f9\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0640-\u064a\u0671-\u06d3\u06d5\u06e5\u06e6\u06fa-\u06fc\u0710\u0712-\u072c\u0780-\u07a5\u0905-\u0939\u093d\u0950\u0958-\u0961\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b36-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60\u0d61\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc\u0edd\u0f00\u0f40-\u0f47\u0f49-\u0f6a\u0f88-\u0f8b\u1000-\u1021\u1023-\u1027\u1029\u102a\u1050-\u1055\u10a0-\u10c5\u10d0-\u10f6\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1206\u1208-\u1246\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1286\u1288\u128a-\u128d\u1290-\u12ae\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12ce\u12d0-\u12d6\u12d8-\u12ee\u12f0-\u130e\u1310\u1312-\u1315\u1318-\u131e\u1320-\u1346\u1348-\u135a\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1780-\u17b3\u1820-\u1877\u1880-\u18a8\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u207f\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2131\u2133-\u2139\u3005\u3006\u3031-\u3035\u3041-\u3094\u309d\u309e\u30a1-\u30fa\u30fc-\u30fe\u3105-\u312c\u3131-\u318e\u31a0-\u31b7\u3400-\u4db5\u4e00-\u9fa5\ua000-\ua48c\uac00-\ud7a3\uf900-\ufa2d\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe72\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')));
		},

		isLetterOrDigit: function (c) {
			return this.isLetter(c) || this.isDigit(c);
		},

		isSymbol: function (c) {
			var re = new RegExp('[$+<->^`|~\u00a2-\u00a9\u00ac\u00ae-\u00b1\u00b4\u00b6\u00b8\u00d7\u00f7\u02b9\u02ba\u02c2-\u02cf\u02d2-\u02df\u02e5-\u02ed\u0374\u0375\u0384\u0385\u0482\u06e9\u06fd\u06fe\u09f2\u09f3\u09fa\u0b70\u0e3f\u0f01-\u0f03\u0f13-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fcf\u17db\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u2044\u207a-\u207c\u208a-\u208c\u20a0-\u20af\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u2132\u213a\u2190-\u21f3\u2200-\u22f1\u2300-\u2328\u232b-\u237b\u237d-\u239a\u2400-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u2595\u25a0-\u25f7\u2600-\u2613\u2619-\u2671\u2701-\u2704\u2706-\u2709\u270c-\u2727\u2729-\u274b\u274d\u274f-\u2752\u2756\u2758-\u275e\u2761-\u2767\u2794\u2798-\u27af\u27b1-\u27be\u2800-\u28ff\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u309b\u309c\u3190\u3191\u3196-\u319f\u3200-\u321c\u322a-\u3243\u3260-\u327b\u327f\u328a-\u32b0\u32c0-\u32cb\u32d0-\u32fe\u3300-\u3376\u337b-\u33dd\u33e0-\u33fe\ua490-\ua4a1\ua4a4-\ua4b3\ua4b5-\ua4c0\ua4c2-\ua4c4\ua4c6\ufb29\ufe62\ufe64-\ufe66\ufe69\uff04\uff0b\uff1c-\uff1e\uff3e\uff40\uff5c\uff5e\uffe0-\uffe6\uffe8-\uffee\ufffc\ufffd]');
			return re.test(c + '');
		},

		isPunctuation: function (c) {
			return this._UTFPunctuationsString.indexOf(c) >= 0;
		},

		isPrintableChar: function (c) {
			if ((!this.isLetterOrDigit(c) && !this.isPunctuation(c)) && !this.isSymbol(c)) {
				return (c === ' ');
			}
			return true;
		},
		
		isAscii: function (c) {
			return (c >= '!') && (c <= '~');
		},

		isAsciiLetter: function (c) {
			return ((c >= 'A') && (c <= 'Z')) || ((c >= 'a') && (c <= 'z'));
		},

		isUpper: function (c) {
			return c.toUpperCase() === c;
		},

		isLower: function (c) {
			return c.toLowerCase() === c;
		},

		isAlphanumeric: function (c) {
			return !this.isLetter(c) ? this.isDigit(c) : true; 
		},

		isAciiAlphanumeric: function (c) {
			if (((c < '0') || (c > '9')) && ((c < 'A') || (c > 'Z'))) {
				if (c >= 'a') {
					return (c <= 'z');
				}
				return false;
			}
			return true;
		},
		
		setChar: function (input, ch, pos) {
			if (pos >= input.length || pos < 0) {
				return input;
			}
			return '' || input.substr(0, pos) + ch + input.substr(pos + 1);
		}
	});
	
	if (!$.wij){
		$.extend({wij: {
			charValidator: new wijCharValidator()
		}});
	};	
	
})(jQuery);

__wijReadOptionEvents = function (eventsArr, widgetInstance) {
    // handle option events
    for (var k = 0; k < eventsArr.length; k++) {
        if (widgetInstance.options[eventsArr[k]] != null)
            widgetInstance.element.bind(eventsArr[k], widgetInstance.options[eventsArr[k]]);
    }
    //handle option event names separated by space, like: "afterexpand aftercollapse"
    for (k in widgetInstance.options) {
        if (k.indexOf(" ") != -1) {
            // possible multiple events separated by space:
            var arr = k.split(" ");
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].length > 0)
                    widgetInstance.element.bind(arr[j], widgetInstance.options[k]);
            }
        }
    }
};



/*
*
* Wijmo Library 0.8.0
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
*
* Wijmo Tooltip widget.
* 
* Depends:
*   jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*
*/
(function ($) {
	$.widget("ui.wijtooltip", {
		options: {
			/// <summary>
			///A value that sets the tooltip's content.
			///Remarks:The value can be a string,html code,or a function.If it's a function,then the content will be the function's return value.
			///Type:String or Function.
			///Default:"".
			///Code example:$(".selector").wijtooltip("option","content","my content").
			///</summary>
			content: '',
			/// <summary>
			///Specifies a value that sets the tooltip's title
			///Type:String or Function.
			///Default:"".
			///Code example:$(".selector").wijtooltip("option","title","my title");
			///Remark:The value can be a string,HTML,or a function.If it is a function,then the content will be the function's return value.
			///</summary>
			title: "",
			/// <summary>
			/// A value that determines how to close the tooltip.Behaviors include auto or sticky.
			///Type:String.
			///Default:"auto".
			///Code example:$(".selector").wijtooltip("option","closeBehavior","auto").
			///</summary>
			closeBehavior: 'auto',
			/// <summary>
			///If true,then the tooltip moves with the mouse.
			///Type:Boolean.
			///Default:false.
			///Code example:$(".selector").wijtooltip("option","mouseTrailing",false).
			///</summary>
			mouseTrailing: false,
			/// <summary>
			///Sets the show tooltip's event
			///Remarks:The value should be 'hover','click','focus','rightClick','custom'.
			///Type:String
			///Default:"hover".
			///Code example:$(".selector").wijtooltip("option","triggers","hover").
			///</summary>
			triggers: 'hover',
			/// <summary>
			///Sets the tooltip's position mode .For example here is the jQuery ui position's position:{my:'top left',at:'right buttom',offset:null}. 
			///Type:Object.
			///Default:{
			///	my: 'left bottom',
			///	at: 'right top',
			///	offset: null
			///}
			///Code expamle:$(".selector").wijtooltip("option","position",{my: 'left bottom',at: 'right top',offset: '0 0'}).
			///</summary>
			position: {
				my: 'left bottom',
				at: 'right top',
				offset: null
			},
			/// <summary>
			///Determines whether to show the callout element.
			///Type:Boolean.
			///Default:true.
			///Code example:$(".selector").wijtooltip("option","showCallOut",true).
			///</summary>
			showCallOut: true,
			/// <summary>
			///Determines the animation effect that will be shown.
			///Remarks:This should be an object value.Possible values include:'animated','duration',and 'easing'.This property works with jQuery animation.
			///Type:Object.
			///Default:{animated: 'fade',duration:500}.
			///Code example:$(".selector").wijtooltip("option","showAnimation",{animated:fade,duration:500}).
			///</summary>
			showAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			////Determines the animation effect that will be hidden.
			///Remarks:This should be an object value,like the showAnimation property.If 'animated' set to false. then hide the tooltip without animation.
			///Type:Object.
			///Default:{animated: 'fade',duration:500}.
			///Code example:$(".selector").wijtooltip("option","hideAnimation",{animated:'fade',duration:500}).
			///</summary>
			hideAnimation: { animated: 'fade', duration: 500 },
			/// <summary>
			///Determines the length of the delay before the tooltip appears.
			///Type:Number
			///Default:0.
			///Code example:$(".selector").wijtooltip("option","showDelay",200).
			///</summary>
			showDelay: 150,
			/// <summary>
			///Determines the length of the delay before the tooltip disappears.
			///Type:Number.
			///Default:0.
			///Code example:$(".selector").wijtooltip("option","hideDelay",200).
			///</summary>
			hideDelay: 150,
			/// <summary>
			///Sets the callout's offset changing animation.
			///Remarks:The value is an object,like the following:{duration:100,easing:'swing'}.
			///Type:Object.
			///Default:{}.
			///Code example:$(".selector").wijtooltip("option","calloutAnimation",{duration:200}).
			///</summary>
			calloutAnimation: {},
			/// <summary>
			///Determines the callout's class style.If true,then the callout triangle will be filled.
			///Type:Boolean.
			///Default:true.
			///Code example:$(".selector").wijtooltip("option","calloutFilled",true).
			///</summary>
			calloutFilled: true,

			modal: false

		},
		_setOption: function (key, value) {
			if ($.isPlainObject(value)) {
				value = $.extend(this.options[key], value);
			}
			//console.log(value);
			if (key === "position") {
				this.element.data("oldPos", this.options[key]);
			}
			$.Widget.prototype._setOption.apply(this, arguments);
			if ($.isFunction(this["_set_" + key])) {
				this["_set_" + key](value);
			}
		},
		_setPositionOffset: function (flag) {
			var domElement = this.element.data("domElements");
			domElement.callout.stop(true, true);
			var calloutAnimation = $.extend({ duration: 1000 }, this.options.calloutAnimation);
			//var tooltip = this.element.data("tooltip");
			var arrowClass = this.element.data("arrowClass").replace(/ui-wijtooltip-arrow-/, "");
			var horition = false;
			var arr = ["tr", "tc", "tl", "bl", "bc", "br"];
			$.each(arr, function (i, n) {
				if (arrowClass === n) {
					horition = true;
				}
			});
			var value = "";
			var offset = this.options.position.offset;
			if (offset) {
				var array = offset.split(" ");
				if (array.length === 2) {
					if (horition) {
						value = array[0];
					}
					else {
						value = array[1];
					}
				}
			}
			if (value !== "") {
				if (flag) {
					if (horition) {
						domElement.callout.css("left", value + "px");
					}
					else {
						domElement.callout.css("top", value + "px");
					}
				}
				else {
					if (horition) {
						domElement.callout.animate({ left: value }, calloutAnimation.duration, calloutAnimation.easing);
					}
					else {
						domElement.callout.animate({ top: value }, calloutAnimation.duration, calloutAnimation.easing);
					}
				}

			}
		},
		_set_calloutSide: function () {
			if (this.options.showCallOut) {
				this._addCallOut();
			}
		},

		_set_triggers: function () {
			//this._unbindTargetElements();+
			this.element.unbind(".tooltip");
			this._attachEventToElement();
		},

		_set_position: function (value) {
			if (this.options.showCallOut) {
				var oldpos = this.element.data("oldPos");
				if (oldpos.my !== value.my || oldpos.at !== value.at) {
					this._setCalloutCss();
					this._setposition();
				}
				this._setPositionOffset();
			}

		},
		_set_calloutFilled: function () {
			this._setcalloutFilled();
		},
		_set_showCallOut: function (value) {
			this.element.removeClass("ui-wijtooltip-arrow-tr ui-wijtooltip-arrow-tc ui-wijtooltip-arrow-tl ui-wijtooltip-arrow-br ui-wijtooltip-arrow-bc ui-wijtooltip-arrow-bl " +
			"ui-wijtooltip-arrow-rb ui-wijtooltip-arrow-rc ui-wijtooltip-arrow-rt ui-wijtooltip-arrow-lb ui-wijtooltip-arrow-lc ui-wijtooltip-arrow-lt");
			var domElement = this.element.data("domElements");
			if (value) {
				this._setCalloutCss();
				if (domElement) {
					domElement.callout.show();
				}
			}
			else {
				if (domElement) {
					domElement.callout.hide();
				}
			}
		},
		_set_closeBehavior: function () {
			this._setCloseBtnCss();
		},
		_set_mouseTrailing: function () {
			this.element.unbind(".tooltip");
			this._attachEventToElement();
		},

		destroy: function () {
			/// <summary>Removes the wijtooltip functionality completely.This returns the element back to its pre-init state.</summary>
			this.element.unbind(".tooltip");

			$.Widget.prototype.destroy.apply(this);
			this.element.data("tooltip").remove();
			this.element.attr("title", this.element.data("title"));
			this.element.removeData("tooltip").removeData("arrowClass").removeData("domElements").removeData("fixedArrowClass").removeData("offset").removeData("oldPos").removeData("showDelay").removeData("title");
		},

		widget: function () {
			return this.element.data("tooltip");
		},

		_create: function () {
			this._setStructure();
			this.element.data("oldPos", this.options.position);
			this.options.position.of = this.element;
			//this._setLayout();

			this._attachEventToElement();
			this._initializeDomElements();
			var domElement = this.element.data("domElements");
			var tooltip = this.element.data("tooltip");
			tooltip.hide();
			this._setCalloutCss();
			if (this.options.showCallOut) {
				domElement.callout.show();
			}
			else {
				domElement.callout.hide();
			}

			if ($.fn.bgiframe && $.browser.msie && $.browser.version === "6.0") {
				tooltip.bgiframe();
			}
			this.element.data("offset", this.options.position.offset);
		},
		_setStructure: function () {
			var tooltip = $("<div>");
			tooltip.addClass("ui-wijtooltip");
			var container = $("<div class='ui-wijtooltip-container'>");
			var callout = $("<div class='ui-widget-content ui-wijtooltip-pointer '><div class='ui-wijtooltip-pointer-inner'></div></div>");
			var title = $("<div>");
			var closebtn = $("<a href='#'></a>");
			var closespan = $("<span>");
			closebtn.addClass("ui-wijtooltip-close ui-state-default ui-corner-all");
			closespan.addClass("ui-icon ui-icon-close");
			closebtn.append(closespan);
			this.element.data("domElements", {
				container: container,
				callout: callout,
				closebtn: closebtn,
				title: title
			});
			//jga            title.append(closebtn);
			title.addClass("ui-wijtooltip-title ui-widget-header ui-corner-all");
			tooltip.append(title);
			tooltip.append(closebtn);
			tooltip.append(container);
			tooltip.append(callout);
			tooltip.addClass("ui-widget ui-widget-content ui-corner-all");
			//container.addClass("ui-widget-content");
			tooltip.css("position", "absolute");
			tooltip.appendTo("body");
			this.element.data("tooltip", tooltip);
			this._setcalloutFilled();
			this._setCloseBtnCss();
		},

		_setcalloutFilled: function () {
			var domelement = this.element.data("domElements");
			$(">:first", domelement.callout).removeClass("ui-wijtooltip-pointer-inner-fill");
			if (this.options.calloutFilled) {
				$(">:first", domelement.callout).addClass("ui-wijtooltip-pointer-inner-fill");
			}
		},
		_setCloseBtnCss: function () {
			var domElement = this.element.data("domElements");

			if (this.options.closeBehavior === "sticky") {
				domElement.closebtn.show();
			}
			else {
				domElement.closebtn.hide();
			}
		},

		_setCalloutCss: function () {
			if (!this.options.showCallOut) {
				this.options.position.offset = this.element.data("offset");
				return;
			}
			var o = this.options;
			var my = o.position.my;
			var arr = my.split(" ");
			var cssname = '';
			if (arr.length == 2) {
				cssname += arr[0].substr(0, 1);
				cssname += arr[1].substr(0, 1);
			}
			var arrat = o.position.at.split(" ");
			if (arr[0] == arrat[0]) {
				if ((arr[1] == 'top' && arrat[1] == 'bottom') || (arr[1] == 'bottom' && arrat[1] == 'top')) {
					cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
				}
			}
			else if (arrat[0] == 'center') {
				cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
			}
			if (cssname.substr(0, 1) == 'c') {
				cssname = cssname.substr(1, 1) + cssname.substr(0, 1);
			}
			if (this.element.data('arrowClass')) {
				var oldcss = this.element.data('arrowClass');
				oldcss = oldcss.substr(oldcss.length - 2, 1);
			}

			cssname = 'ui-wijtooltip-arrow-' + cssname;
			var tooltip = this.element.data("tooltip");
			tooltip.removeClass("ui-wijtooltip-arrow-tr ui-wijtooltip-arrow-tc ui-wijtooltip-arrow-tl ui-wijtooltip-arrow-br ui-wijtooltip-arrow-bc ui-wijtooltip-arrow-bl " +
			"ui-wijtooltip-arrow-rb ui-wijtooltip-arrow-rc ui-wijtooltip-arrow-rt ui-wijtooltip-arrow-lb ui-wijtooltip-arrow-lc ui-wijtooltip-arrow-lt");
			tooltip.addClass(cssname);
			this.element.data("arrowClass", cssname);

		},
		_initializeDomElements: function () {
			var tooltip = this.element.data("tooltip");
			tooltip.bind("mouseout", $.proxy(this._onMouseOutTooltipElement, this));
			tooltip.bind("mouseover", $.proxy(this._onMouseOverTooltipElement, this));
			this.element.data("domElements").closebtn.bind("click", $.proxy(this._onClickCloseBtn, this));
		},
		_attachEventToElement: function () {
			if (this.element.data("title") == null) {
				this.element.data("title", this.element.attr("title"));
				this.element.attr("title", "");
			}
			var self = this;
			this.element.unbind('.tooltip');
			if (this.options.mouseTrailing) {
				this.element.bind("mousemove.tooltip", function () {
					self._setposition();
					self.show();
				});
			}

			switch (this.options.triggers) {
				case "hover":
					this.element.bind("mouseover.tooltip", function () {
						self.show();
					}).bind("mouseout.tooltip", function () {
						if (self.options.closeBehavior === "sticky" || self.options.modal || self.options.closeBehavior === "none") {
							return;
						}
						self.hide();
					});
					break;
				case "click":
					this.element.bind("click.tooltip", function () {
						self.show();
					});
					break;
				case "focus":
					this.element.bind("focus.tooltip", function () {
						self.show();
					}).bind("blur.tooltip", function () {
						if (self.options.closeBehavior === "sticky") {
							return;
						}
						self.hide();
					});
					break;
				case "rightClick":
					this.element.bind("contextmenu.tooltip", function (e) {
						self.show();
						e.preventDefault();
					});
					break;
				case "custom":
					break;
			}
		},
		///judgy if the point is in element
		_isPointInsideRectWithOutBorder: function (point, _element) {
			var obj = $(_element);
			var bnd = {
				X: obj.offset().left,
				Y: obj.offset().top,
				Width: obj.outerWidth(true),
				Height: obj.outerHeight(true)
			}
			if (point.X <= bnd.X || point.X >= (bnd.X + bnd.Width)) {
				return false;
			}
			if (point.Y <= bnd.Y || point.Y >= (bnd.Y + bnd.Height)) {
				return false;
			}
			return true;
		},
		// end tooltip mouse events
		_onMouseOutTooltipElement: function (e) {
			if (this.options.closeBehavior === "sticky" || this.options.closeBehavior === "none") {
				return;
			}
			if (!this._isPointInsideRectWithOutBorder({
				X: e.pageX,
				Y: e.pageY
			}, this.element.data("tooltip"))) {
				this.hide();
			}
		},
		_onMouseOverTooltipElement: function (e) {
			if (this.options.closeBehavior === "auto" && !this.options.mouseTrailing) {
				if (!this.element.data("currentElement") || this._isPointInsideRectWithOutBorder({
					X: e.pageX,
					Y: e.pageY
				}, this.element.data("currentElement"))) {
					this.hide();
				}
			}
		},
		_onClickCloseBtn: function () {
			this.hide();
		},
		//begin tooltip mouse events

		//end tooltip mouse events
		_setposition: function () {
			var tooltip = this.element.data("tooltip");
			var isHidden = tooltip.is(":hidden")
			if (isHidden) {
				tooltip.show();
			}
			var option = $.extend(this.options.position, {});
			tooltip.css({ left: 0, top: 0 });
			//if (!this.element.data("fixed")) {
			if (this.options.showCallOut) {
				var arrowClass = this.element.data("arrowClass");
				var str = arrowClass.substr(arrowClass.length - 2, 1);
				var offset = [];
				//----change the position offset to set the callout.
				//offset[0] = parseInt(offset[0]);
				//offset[1] = parseInt(offset[1]);
				offset[0] = offset[1] = 0;
				//console.log(arrowClass);
				var offsetstr = "";
				switch (str) {
					case "l":
						offset[0] += 14;
						break;
					case "r":
						offset[0] -= 14;
						break;
					case "t":
						offset[1] += 14;
						break;
					case "b":
						offset[1] -= 14;
						break;
				}
				offsetstr = offset.join(" ");
				//}
			}
			tooltip.position({ my: option.my, at: option.at, of: option.of, offset: offsetstr, collision: 'none none' });
			var position = tooltip.offset();
			tooltip.css({ left: 0, top: 0 });
			this.element.data("fixedArrowClass", false);
			tooltip.position({ my: option.my, at: option.at, of: option.of, offset: offsetstr, collision: option.collision });
			if (this.options.showCallOut) {
				this._calloutflip(position);
				this._set_unfilledCallout();
			}
			if (isHidden && !(this.options.relativeTo === "mouse" && this.options.mouseTrailing)) {
				tooltip.hide();
			}
		},

		_set_unfilledCallout: function (calloutCss) {
			var tooltip = this.element.data("tooltip");
			if (!calloutCss) {
				calloutCss = this.element.data("arrowClass");
				if (this.element.data("fixedArrowClass")) {
					calloutCss = this.element.data("fixedArrowClass");
				}
			}
			var domObject = this.element.data("domElements");
			var innerCallout = domObject.callout.children();
			innerCallout.css({
				"border-left-color": "",
				"border-left-color": "",
				"border-bottom-color": "",
				"border-right-color": ""
			});
			if (!this.options.calloutFilled) {
				switch (calloutCss) {
					case "lt":
					case "lc":
					case "lb":
						innerCallout.css("border-right-color", tooltip.css("background-color"));
						break;
					case "tl":
					case "tc":
					case "tr":
						innerCallout.css("border-bottom-color", tooltip.css("background-color"));
						break;
					case "rt":
					case "rc":
					case "rb":
						innerCallout.css("border-left-color", tooltip.css("background-color"));
						break;
					case "bl":
					case "bc":
					case "br":
						innerCallout.css("border-top-color", tooltip.css("background-color"));
						break;
				}
			}
		},

		_calloutflip: function (position) {
			var tooltip = this.element.data("tooltip");
			var changeset = { left: false, top: false };
			var win = $(window);
			var over;
			if (this.options.position.at[0] != 'center') {
				if (position.left < 0) {
					changeset.left = true;
				}
				over = position.left + tooltip.width() - win.width() - win.scrollLeft();
				if (over > 0) {
					changeset.left = true;
				}
			}
			if (this.options.position[1] != 'center') {
				over = position.top + tooltip.height() - win.height() - win.scrollTop();
				if (position.top < 0) {
					changeset.top = true;
				}
				if (over > 0) {
					changeset.top = true;
				}
			}
			var cssname = this.element.data("arrowClass");
			cssname = cssname.substr(cssname.length - 2, 2);
			if (changeset.left) {
				if (cssname.indexOf('l') > -1) {
					cssname = cssname.replace(/l/, 'r');
				}
				else if (cssname.indexOf('r') > -1) {
					cssname = cssname.replace(/r/, 'l');
				}
			}
			if (changeset.top) {
				if (cssname.indexOf('t') > -1) {
					cssname = cssname.replace(/t/, 'b');
				}
				else if (cssname.indexOf('b') > -1) {
					cssname = cssname.replace(/b/, 't');
				}
			}
			if (changeset.left || changeset.top) {
				tooltip.removeClass("ui-wijtooltip-arrow-tr ui-wijtooltip-arrow-tc ui-wijtooltip-arrow-tl ui-wijtooltip-arrow-br ui-wijtooltip-arrow-bc ui-wijtooltip-arrow-bl " +
			"ui-wijtooltip-arrow-rb ui-wijtooltip-arrow-rc ui-wijtooltip-arrow-rt ui-wijtooltip-arrow-lb ui-wijtooltip-arrow-lc ui-wijtooltip-arrow-lt");
				tooltip.addClass("ui-wijtooltip-arrow-" + cssname);
			}
			this.element.data("fixedArrowClass", cssname);
		},
		_showTooltip: function () {
			var o = this.options;
			var ea = {
				ui: this,
				cancel: false
			};
			this._trigger("showing", ea);
			if (ea.cancel) {
				return;
			}
			this._showModal();

			var tooltip = this.element.data("tooltip");
			tooltip.css("z-index", this._getMaxZIndex());
			if (o.showAnimation.animated && !this.options.mouseTrailing) {
				var aimateOptions = {
					show: true,
					context: tooltip,
					complete: $.proxy(function () {
						this._trigger("shown");

					}, this)
				}
				var animations = $.ui.wijtooltip.animations, duration = o.showAnimation.duration, easing = o.showAnimation.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'fade';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](o.showAnimation, aimateOptions);
			}
			else {
				tooltip.show();
				this._trigger("shown");
			}
			this._setPositionOffset(true);
			//this._setCalloutOffset();
		},
		_hideTooltip: function () {
			var o = this.options;
			var ea = new $.Event('hidding.tooltip');
			ea.data = {
				ui: this,
				cancel: false
			};
			this._trigger("hidding");
			if (ea.data.cancel) {
				return;
			}
			this._hideModal();
			var tooltip = this.element.data("tooltip");
			if (o.hideAnimation.animated) {
				var aimateOptions = {
					show: false,
					context: tooltip,
					complete: $.proxy(function () {
						this._trigger("hidden");
					}, this)
				}
				var animations = $.ui.wijtooltip.animations, duration = o.hideAnimation.duration, easing = o.hideAnimation.animated;
				if (easing && !animations[easing] && !$.easing[easing]) {
					easing = 'fade';
				}
				if (!animations[easing]) {
					animations[easing] = function (options) {
						this.slide(options, {
							easing: easing,
							duration: duration || 700
						});
					};
				}
				animations[easing](o.hideAnimation, aimateOptions);
			}
			else {
				tooltip.hide();
				this._trigger("hidden");
			}
		},
		_setText: function () {
			var domElement = this.element.data("domElements");
			var currentElement = this.element;
			var content = this.options.content;
			var self = this;
			if ($.isFunction(content)) {
				var strret = content.call(self.element, function (data) {
					if (data) {
						domElement.container.html(data);
					}
				})
				if (strret) {
					domElement.container.html(strret);
				}
			}
			else {
				if (content != "") {
					domElement.container.html(content);
				}
				else {

					domElement.container.html(currentElement ? currentElement.data("title") : '');
				}
			}

			domElement.title.show();
			var title = this.options.title;
			var titlevalue = "";
			if ($.isFunction(title)) {
				var strtitle = title.call(this.element, function (data) {
					if (data) {
						titlevalue = data;
					}
				});
				if (strtitle) {
					titlevalue = strtitle;
				}
			}
			else {
				if (title !== "") {
					titlevalue = title;
				}
			}
			if (titlevalue !== "") {
				domElement.title.show();
				domElement.title.html(titlevalue);
			}
			else {
				domElement.title.hide();
			}
		},

		_getMaxZIndex: function () {
			var zindex = 0;
			$("*").each(function () {
				var index = $(this).css("z-index");
				if (!isNaN(index)) {
					index = parseInt(index);
					if (index > zindex) {
						zindex = index;
					}
				}

			})
			return zindex + 1;
		},

		_getDocHeight: function () {
			var scrollHeight,
			offsetHeight;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
				offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

				if (scrollHeight < offsetHeight) {
					return $(window).height() + 'px';
				} else {
					return scrollHeight + 'px';
				}
				// handle "good" browsers
			} else {
				return $(document).height() + 'px';
			}
		},

		_getDocWidth: function () {
			var scrollWidth,
			offsetWidth;
			// handle IE 6
			if ($.browser.msie && $.browser.version < 7) {
				scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
				offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

				if (scrollWidth < offsetWidth) {
					return $(window).width() + 'px';
				} else {
					return scrollWidth + 'px';
				}
			} else {
				return $(document).width() + 'px';
			}
		},

		_showModal: function () {
			if (this.options.modal) {
				var modalDiv = $("<div>");
				modalDiv.addClass("ui-widget-overlay").css("z-index", this._getMaxZIndex()).width(this._getDocWidth()).height(this._getDocHeight());
				modalDiv.appendTo("body");
				this.element.data("modalDiv", modalDiv);
			}
		},

		_hideModal: function () {
			if (this.element.data("modalDiv")) {
				this.element.data("modalDiv").remove();
			}
		},

		//begin public methods
		show: function () {
			/// <summary>Shows the tooltip</summary>
			var tooltip = this.element.data("tooltip");
			tooltip.stop(true, true);
			this._setText();
			//this._setheight();

			if (this.element.data("arrowClass")) {
				tooltip.removeClass(this.element.data("arrowClass"));
			}
			this._setCalloutCss();
			//tooltip.hide();
			this._setposition();
			clearTimeout(this.element.data("showDelay"));
			//this.element.show();
			this.element.data("showDelay", setTimeout($.proxy(this._showTooltip, this), this.options.showDelay));
			//this._showTooltip();
			//var self = this;
			//var calloutInner = self.element.data("domElements").callout.children().first();

		},
		showAt: function (point) {
			/// <summary>show the tooltip at a point position</summary>
			/// <param name="point" type="Object">It's a point.the value should like{x:0,y:0}</param>
			var tooltip = this.element.data("tooltip");
			tooltip.stop(true, true);
			this._setText();
			//this._setheight();
			tooltip.offset({ left: 0, top: 0 });
			tooltip.show();
			var offsetx = 0;
			var offsety = 0;
			var calloutcss = this.element.data("arrowClass");
			var domelement = this.element.data("domElements");
			offsetx = domelement.callout.position().left;
			offsety = domelement.callout.position().top;
			var borderTop = domelement.callout.css("border-top-width").replace(/px/g, '') * 1;
			var borderLeft = domelement.callout.css("border-left-width").replace(/px/g, '') * 1;
			var borderRight = domelement.callout.css("border-right-width").replace(/px/g, '') * 1;
			var borderBottom = domelement.callout.css("border-bottom-width").replace(/px/g, '') * 1;
			var borderh = borderLeft == 0 ? borderRight : borderLeft;
			var borderv = borderTop == 0 ? borderBottom : borderTop;

			var offset = {};
			var width = tooltip.width();
			var height = tooltip.height();
			var collision = (this.options.position.collision || "flip").split(" ");
			if (collision.length == 1) {
				collision[1] = collision[0];
			}
			switch (calloutcss) {
				case "ui-wijtooltip-arrow-rt":
					offset.left = point.x - width - borderh;
					offset.top = point.y - offsety;
					break;
				case "ui-wijtooltip-arrow-rc":
					offset.left = point.x - width - borderh;
					offset.top = point.y - height / 2;
					break;
				case "ui-wijtooltip-arrow-rb":
					offset.left = point.x - width - borderh;
					offset.top = point.y - offsety - borderv;
					break;
				case "ui-wijtooltip-arrow-lt":
					offset.left = point.x + borderh;
					offset.top = point.y - offsety;
					break;
				case "ui-wijtooltip-arrow-lc":
					offset.left = point.x - offsetx;
					offset.top = point.y - height / 2;
					break;
				case "ui-wijtooltip-arrow-lb":
					offset.left = point.x - offsetx;
					offset.top = point.y - offsety - borderv;
					break;
				case "ui-wijtooltip-arrow-tl":
					offset.left = point.x - offsetx;
					offset.top = point.y - offsety;
					break;
				case "ui-wijtooltip-arrow-tc":
					offset.left = point.x - width / 2;
					offset.top = point.y - offsety;
					break;
				case "ui-wijtooltip-arrow-tr":
					offset.left = point.x - offsetx - borderh;
					offset.top = point.y - offsety;
					break;
				case "ui-wijtooltip-arrow-bl":
					offset.left = point.x - offsetx;
					offset.top = point.y - height - borderv;
					break;
				case "ui-wijtooltip-arrow-bc":
					offset.left = point.x - width / 2;
					offset.top = point.y - height - borderv;
					break;
				case "ui-wijtooltip-arrow-br":
					offset.left = point.x - offsetx - borderh;
					offset.top = point.y - height - borderv;
					break;
			}
			//console.log(offset);
			var newCss = this._showAtflip(calloutcss, offset);
			///let the position out of the target element.
			var arr = [];
			arr[0] = newCss.substr(0, 1);
			arr[1] = newCss.substr(1, 1);
			$.each(arr, function (i, n) {
				switch (n) {
					case "l":
						offset.left += 1;
						break;
					case "r":
						offset.left -= 1;
						break;
					case "t":
						offset.top += 1;
						break;
					case "b":
						offset.top -= 1;
						break;
				}
			});
			//console.log(offset);
			this._set_unfilledCallout(newCss);
			tooltip.offset(offset);
			tooltip.hide();
			this.element.data("showDelay", setTimeout($.proxy(this._showTooltip, this), this.options.showDelay));

		},

		_showAtflip: function (calloutcss, offset) {
			var collision = (this.options.position.collision || "flip").split(" ");
			if (collision[0] != "flip" && collision[1] != "flip") {
				return;
			}
			var cssname = calloutcss.substr(calloutcss.length - 2, 2);
			var tooltip = this.element.data("tooltip");
			var width = tooltip.width();
			var height = tooltip.height();
			var domelement = this.element.data("domElements");
			var borderTop = domelement.callout.css("border-top-width").replace(/px/g, '') * 1;
			var borderLeft = domelement.callout.css("border-left-width").replace(/px/g, '') * 1;
			var borderRight = domelement.callout.css("border-right-width").replace(/px/g, '') * 1;
			var borderBottom = domelement.callout.css("border-bottom-width").replace(/px/g, '') * 1;
			var win = $(window);
			if (collision[1] == "flip") {
				if (cssname.indexOf('t') > -1) {
					if (offset.top + height > win.height()) {
						offset.top -= (height + borderBottom * 2);
						cssname = cssname.replace(/t/, 'b');
					}
				}
				if (cssname.indexOf('b') > -1) {
					if (offset.top < 0) {
						offset.top += (height + borderTop * 2);
						cssname = cssname.replace(/b/, 't');
					}
				}
			}
			if (collision[0] == "flip") {
				if (cssname.indexOf('l') > -1) {
					if (offset.left + width > win.width()) {
						offset.left -= (width + borderRight * 2);
						cssname = cssname.replace(/l/, 'r');
					}
				}
				if (cssname.indexOf('r') > -1) {
					if (offset.left - borderRight < 0) {
						offset.left += (width + borderLeft * 2);
						cssname = cssname.replace(/r/, 'l');
					}
				}
			}
			tooltip.removeClass("ui-wijtooltip-arrow-tr ui-wijtooltip-arrow-tc ui-wijtooltip-arrow-tl ui-wijtooltip-arrow-br ui-wijtooltip-arrow-bc ui-wijtooltip-arrow-bl " +
			"ui-wijtooltip-arrow-rb ui-wijtooltip-arrow-rc ui-wijtooltip-arrow-rt ui-wijtooltip-arrow-lb ui-wijtooltip-arrow-lc ui-wijtooltip-arrow-lt");
			tooltip.addClass("ui-wijtooltip-arrow-" + cssname);
			return cssname;
		},

		hide: function () {
			/// <summary>Hides the tooltip</summary>
			clearTimeout(this.element.data("hideDelay"));
			this.element.data("hideDelay", setTimeout($.proxy(this._hideTooltip, this), this.options.hideDelay));
			//this._hideTooltip();
		}

		//end public methods

	});

	$.extend($.ui.wijtooltip, {
		animations: {
			fade: function (options, additions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, additions)
				options.context.stop(true, true).animate(options.show ? { opacity: 'show'} : { opacity: 'hide' }, options);
			}
		}
	});
})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Slider widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.mouse.js
 *  jquery.ui.widget.js
 *  jquery.ui.slider.js
 *  jquery.ui.wijutil.js
 *  
 */
(function ($) {

    $.widget("ui.wijslider", $.ui.slider, {
        options: {
            /// <summary>
            /// A value determines whether the fill may be dragged between the buttons. 
            /// Default: true.
            /// Type: Boolean.
            /// </summary>
            dragFill: true
        },

        _setOption: function (key, value) {
            ///	<summary>
            ///		Sets Slider options.
            ///	</summary>
            this.options[key] = value;
            return this;
        },

        _create: function () {
            ///	<summary>
            ///		Creates Slider DOM elements and binds interactive events.
            ///	</summary>
            $.ui.slider.prototype._create.apply(this, arguments);
            //
            this.element.data("originalStyle", this.element.attr("style"));
            this.element.data("originalContent", this.element.html());
            var ctrlWidth = this.element.width();
            var ctrlHeight = this.element.height();

            var container = $('<div></div>');
            if (this.options.orientation == "horizontal") {
                container.addClass("ui-wijslider-horizontal");
            }
            else {
                container.addClass("ui-wijslider-vertical");
            }
            container.width(ctrlWidth);
            container.height(ctrlHeight);
            var decreBtn = $('<a class="ui-wijslider-decbutton"><span></span></a>');
            var increBtn = $('<a class="ui-wijslider-incbutton"><span></span></a>');
            this.element.wrap(container);
            this.element.before(decreBtn);
            this.element.after(increBtn);
            this._attachClass();

            var decreBtnWidth = this._getDecreBtn().outerWidth();
            var decreBtnHeight = this._getDecreBtn().outerHeight();
            var increBtnWidth = this._getIncreBtn().outerWidth();
            var increBtnHeight = this._getIncreBtn().outerHeight();
            var thumb = this.element.find(".ui-slider-handle");
            var thumbWidth = thumb.outerWidth();
            var thumbHeight = thumb.outerHeight();
            this.element.removeAttr("style");

            if (this.options.orientation == "horizontal") {
                var dbtop = ctrlHeight / 2 - decreBtnHeight / 2;
                this._getDecreBtn().css("top", dbtop).css("left", 0);
                var ibtop = ctrlHeight / 2 - increBtnHeight / 2;
                this._getIncreBtn().css("top", ibtop).css("right", 0);
                //
                this.element.css("left", decreBtnWidth + thumbWidth / 2 - 1).css("top", ctrlHeight / 2 - this.element.outerHeight() / 2).width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
//                this.element.css("top", ctrlHeight / 2 - this.element.outerHeight() / 2);
//                this.element.width(ctrlWidth - decreBtnWidth - increBtnWidth - thumbWidth - 2);
            }
            else {
                var dbleft = ctrlWidth / 2 - decreBtnWidth / 2;
                this._getDecreBtn().css("left", dbleft).css("top", 0);
                var ibleft = ctrlWidth / 2 - increBtnWidth / 2;
                this._getIncreBtn().css("left", ibleft).css("bottom", 0);
                //
                this.element.css("left", ctrlWidth / 2 - this.element.outerWidth() / 2).css("top", decreBtnHeight + thumbHeight / 2 + 1).height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
//                this.element.css("top", decreBtnHeight + thumbHeight / 2 + 1);
//                this.element.height(ctrlHeight - decreBtnHeight - increBtnHeight - thumbHeight - 2);
            }

            this._bindEvents();
        },

        destroy: function () {
            ///	<summary>
            ///		Destroy Slider widget and reset the DOM element.
            ///	</summary>
            var self = this;
            var decreBtn = this._getDecreBtn();
            var increBtn = this._getIncreBtn();
            decreBtn.unbind('.' + self.widgetName);
            increBtn.unbind('.' + self.widgetName);
            $.ui.slider.prototype.destroy.apply(this, arguments);
            this.element.parent().removeAttr("class");
            this.element.parent().html("");
        },

        _getDecreBtn: function () {
            var decreBtn = this.element.parent().find(".ui-wijslider-decbutton");
            return decreBtn;
        },

        _getIncreBtn: function () {
            var increBtn = this.element.parent().find(".ui-wijslider-incbutton");
            return increBtn;
        },

        _attachClass: function () {
            this._getDecreBtn().addClass("ui-corner-all ui-state-default");
            this._getIncreBtn().addClass("ui-corner-all ui-state-default");

            if (this.options.orientation == "horizontal") {
                this.element.parent().addClass("ui-wijslider-horizontal");
                this._getDecreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-w");
                this._getIncreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-e");
            }
            else {
                this.element.parent().addClass("ui-wijslider-vertical");
                this._getDecreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-n");
                this._getIncreBtn().find("> span").addClass("ui-icon ui-icon-triangle-1-s");
            }
        },

        _bindEvents: function () {
            var self = this;
            var decreBtn = this._getDecreBtn();
            var increBtn = this._getIncreBtn();
            //
            decreBtn.bind('click.' + self.widgetName, self, self._decreBtnClick);
            increBtn.bind('click.' + self.widgetName, self, self._increBtnClick);
            //
            decreBtn.bind('mouseover.' + self.widgetName, self, self._decreBtnMouseOver);
            decreBtn.bind('mouseout.' + self.widgetName, self, self._decreBtnMouseOut);
            decreBtn.bind('mousedown.' + self.widgetName, self, self._decreBtnMouseDown);
            decreBtn.bind('mouseup.' + self.widgetName, self, self._decreBtnMouseUp);

            increBtn.bind('mouseover.' + self.widgetName, self, self._increBtnMouseOver);
            increBtn.bind('mouseout.' + self.widgetName, self, self._increBtnMouseOut);
            increBtn.bind('mousedown.' + self.widgetName, self, self._increBtnMouseDown);
            increBtn.bind('mouseup.' + self.widgetName, self, self._increBtnMouseUp);
            ///dail 2010-10-29 fixed the Issue No. 3 and No. 4 on github. In the Chrome when dbclick the button then. 
            this.element.parent().disableSelection();	
        },

        _decreBtnMouseOver: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseover', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.addClass("ui-state-hover");
        },

        _increBtnMouseOver: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseover', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.addClass("ui-state-hover");
        },

        _decreBtnMouseOut: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseout', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.removeClass("ui-state-hover ui-state-active");
        },

        _increBtnMouseOut: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseout', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.removeClass("ui-state-hover ui-state-active");
        },

        _decreBtnMouseDown: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmousedown', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.addClass("ui-state-active");
        },

        _increBtnMouseDown: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmousedown', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.addClass("ui-state-active");
        },

        _decreBtnMouseUp: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            self._trigger('buttonmouseup', e, data);
            //
            var decreBtn = self._getDecreBtn();
            decreBtn.removeClass("ui-state-active");
        },

        _increBtnMouseUp: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };
            self._trigger('buttonmouseup', e, data);
            //
            var increBtn = self._getIncreBtn();
            increBtn.removeClass("ui-state-active");
        },


        _decreBtnClick: function (e) {
            var self = e.data;
            var data = { buttonType: "decreButton" };
            //
            if (self.options.orientation == "horizontal") {
                self._decre();
            }
            else {
                self._incre();
            }
            //
            self._trigger('buttonclick', e, data);
        },

        _increBtnClick: function (e) {
            var self = e.data;
            var data = { buttonType: "increButton" };            
            //
            if (self.options.orientation == "horizontal") {
                self._incre();
            }
            else {
                self._decre();
            }
            //
            self._trigger('buttonclick', e, data);
        },

        _decre: function () {
            var curVal = this.value();
            //
            if (this.options.range == false && this.options.values == null) {
                curVal = this.value();
                if (curVal <= this.options.min) {
                    this.value(this.options.min);
                }
                else {
                    this.value(curVal - this.options.step);
                }
            }
            else {
                curVal = this.values(0);
                if (curVal <= this.options.min) {
                    this.values(0, this.options.min);
                }
                else {
                    this.values(0, curVal - this.options.step);
                }
            }
        },

        _incre: function () {
            var curVal = this.value();
            //
            if (this.options.range == false && this.options.values == null) {
                curVal = this.value();
                if (curVal >= this.options.max) {
                    this.value(this.options.max);
                }
                else {
                    this.value(curVal + this.options.step);
                }
            }
            else {
                curVal = this.values(1);
                if (curVal >= this.options.max) {
                    this.values(1, this.options.max);
                }
                else {
                    this.values(1, curVal + this.options.step);
                }
            }
        },

        _mouseInit: function () {
            if (this.options.dragFill) {
                var self = this;
                this._preventClickEvent = false;
                this.element.bind('click', function (event) {
                    if (self._dragFillStart > 0) {
                        self._dragFillStart = 0;
                    }
                    else {
                        $.ui.slider.prototype._mouseCapture.apply(self, arguments);
                    }
                });
            }
            $.ui.mouse.prototype._mouseInit.apply(this, arguments);
        },

        _mouseCapture: function (event) {
            if (this.options.dragFill) {
                if (event.target.className == "ui-slider-range ui-widget-header") {
                    this.elementSize = {
                        width: this.element.outerWidth(),
                        height: this.element.outerHeight()
                    };
                    this.elementOffset = this.element.offset();
                    return true;
                }
                else {
                    return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
                }
            }
            else {
                return $.ui.slider.prototype._mouseCapture.apply(this, arguments);
            }
        },

        _dragFillTarget: false,
        _dragFillStart: 0,
        _rangeValue: 0,
        _oldValue1: 0,
        _oldValue2: 0,
        _oldX: 0,
        _oldY: 0,

        _mouseStart: function (event) {
            if (this.options.dragFill) {
                if (event.target != null) {
                    if (event.target.className == "ui-slider-range ui-widget-header") {
                        this._dragFillTarget = true;
                        this._rangeValue = this.values(1) - this.values(0);
                        this._oldValue1 = this.values(0);
                        this._oldValue2 = this.values(1);
                        this._oldX = event.pageX;
                        this._oldY = event.pageY;
                        
                        return true;
                    }
                }
                this._dragFillTarget = false;
            }
            return true;
        },

        _mouseDrag: function (event) {
            if (this.options.dragFill) {
                var distance = event.pageX - this._oldX;
                //var position = { x: event.pageX, y: event.pageY };
                //var movValue = this._normValueFromMouse(position);
                var eleLength = this.element.outerWidth();
                if (this.options.orientation === "vertical") {
                    eleLength = this.element.outerHeight();
                    distance = -(event.pageY - this._oldY);
                }
                var movValue = (this.options.max - this.options.min) / eleLength * distance;
                //document.title = distanceX + "|" + movValue;

                if (this._dragFillTarget) {
                    if (this.options.orientation === "vertical") {
                        $(document.documentElement).css("cursor", "s-resize");
                    }
                    else {
                        $(document.documentElement).css("cursor", "w-resize");
                    }
                    if (this._dragFillStart > 0) {
                        var v = this._rangeValue;
                        /* if (normValue + v >= this.options.max) {
                        this.values(0, this.options.max - v);
                        this.values(1, this.options.max);
                        }
                        else {
                        }*/
                        this.values(0, this._oldValue1 + movValue);
                        this.values(1, this._oldValue1 + movValue + v);
                        var v0 = this.values(0);
                        var v1 = this.values(1);
                        if (v0 + v > this.options.max) {
                            this.values(0, this.options.max - v);
                        }
                        if (v1 - v < this.options.min) {
                            this.values(1, this.options.min + v);
                        }
                    }
                    this._dragFillStart++;
                    return false;
                }
                else {
                    return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
                }
            }
            else {
                return $.ui.slider.prototype._mouseDrag.apply(this, arguments);
            }
        },

        _mouseStop: function (event) {
            var returnVal = $.ui.slider.prototype._mouseStop.apply(this, arguments);
            if (this.options.dragFill) {
                $(document.documentElement).css("cursor", "default");
                window.setTimeout(function () { this._dragFillTarget = false; this._dragFillStart = 0; }, 500);
            }
            return returnVal;
        }
    });

})(jQuery);


 /*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Splitter widget.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.resizable.js
 *  jquery.ui.mouse.js
 *	jquery.ui.wijutil.js
 *
 */
(function ($) {
    $.widget("ui.wijsplitter", {
        options: {
            /// <summary>
            /// A value determines whether the expander of Splitter is allowed to be shown.
            /// Default: true.
            /// Type: Boolean.
            /// </summary>
            showExpander: true,
            ///	<summary>
            ///	A value indicates the location of the splitter, in pixels, from the left or top edge of the splitter.
            /// Default: 100.
            /// Type: Number.
            ///	</summary>
            splitterDistance: 100,
            ///	<summary>
            ///	A value indicating the horizontal or vertical orientation of the splitter panels.
            /// Default: 'vertical'.
            /// Type: String.
            ///	</summary>
            orientation: 'vertical',
            ///	<summary>
            ///	A value that indicates whether or not the control is full of document. 
            /// Default: false.
            /// Type: Boolean.
            ///	</summary>
            fullSplit: false,
            ///	<summary>
            ///	A value defines the animation while the bar of splitter is beeing dragged.
            /// Default: {}.
            /// Type: Dictionary.
            ///	</summary>
            resizeSettings: {
                ///	<summary>
                ///	Define how long (in milliseconds) the animation of the sliding will run.
                /// Default: 100.
                /// Type: Number.
                ///	</summary>
                animationDuration: 100,
                ///	<summary>
                ///	The easing that is applied to the animation.
                /// Default: 'swing'.
                /// Type: String.
                ///	</summary>
                easing: "swing",
                ///	<summary>
                ///	A value that determines whether an outline of the element is sized.
                /// Default: false.
                /// Type: Boolean.
                ///	</summary>
                ghost: false,
                ///	<summary>
                ///	A value that determines the movement span of incremental resizing. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                increment: 1
            },
            ///	<summary>
            ///	Defines the information for top or left panel of splitter.
            /// Default: {}.
            /// Type: Dictionary.
            ///	</summary>
            panel1: {
                ///	<summary>
                ///	Gets or sets the minimum distance in pixels when resizing the splitter. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                minSize: 1,
                ///	<summary>
                ///	A value determining whether splitter panel is collapsed or expanded. 
                /// Default: false.
                /// Type: Boolean.
                ///	</summary>
                collapsed: false,
                ///	<summary>
                ///	Gets or sets the type of scroll bars to display for splitter panel.
                /// Default: 'auto'.
                /// Type: String.
                ///	</summary>
                scrollBars: "auto"
            },
            ///	<summary>
            ///	Defines the information for bottom or right panel of splitter.
            /// Default: {}.
            /// Type: Dictionary.
            ///	</summary>
            panel2: {
                ///	<summary>
                ///	Gets or sets the minimum distance in pixels when resizing the splitter. 
                /// Default: 1.
                /// Type: Number.
                ///	</summary>
                minSize: 1,
                ///	<summary>
                ///	Gets or sets a value determining whether splitter panel is collapsed or expanded. 
                /// Default: false.
                /// Type: Boolean.
                ///	</summary>
                collapsed: false,
                ///	<summary>
                ///	Gets or sets the type of scroll bars to display for splitter panel.
                /// Default: 'auto'.
                /// Type: String.
                ///	</summary>
                scrollBars: "auto"
            }
        },

        getOptionsCopy: function () {
            /// <summary>
            /// Gets Splitter options.
            /// </summary>
            return this.options;
        },

        setOption: function (key, value) {
            ///	<summary>
            ///		Sets Splitter options.
            ///	</summary>

            this.options[key] = value;
            return this;
        },

        _create: function () {
            ///	<summary>
            ///		Creates Splitter DOM elements and binds interactive events.
            ///	</summary>

            this._setStructure();
            this._attachClass();
            this._checkFullSplitMode();
            this._initElements();
            this.refresh();
            //
            $(this.element).trigger("load");
            //
            this._bindEvents();
            this._initResizer();
        },

        destroy: function () {
            ///	<summary>
            ///		Destroy Splitter widget and reset the DOM element.
            ///	</summary>

            var self = this;

            if (self._getPanel1() != null) {
                if (self._getPanel1().is(":ui-wijresizable")) {
                    self._getPanel1().wijresizable('destroy');
                }
            }

            var expander = this._getExpander();
            expander.unbind('.' + self.widgetName);
            $(window).unbind('.' + self.widgetName);

            //
            var originalContent = this.element.data("originalContent");
            this.element.html(originalContent);
            var originalStyle = this.element.data("originalStyle");
            this.element.removeAttr("class");

            if (originalStyle == undefined) {
                this.element.removeAttr("style");
            }
            else {
                this.element.attr("style", originalStyle);
            }
        },

        _setStructure: function () {
            var template1;
            var template2;
            var elems = this.element.find("> div").get();
            if (elems.length == 1) {
                template1 = elems[0];
            }
            else if (elems.length >= 2) {
                template1 = elems[0];
                template2 = elems[1];
            }

            this.element.data("originalStyle", this.element.attr("style"));
            this.element.data("originalContent", this.element.html());

            var container = $("<div class=\"ui-splitter-wrapper\"></div>");
            this.element.append(container);

            var panel1 = $("<div></div>");
            container.append(panel1);
            if (template1 != null) {
                panel1.append(template1);
            }
            else {
                var content1 = $("<div></div>");
                panel1.append(content1);
            }

            var bar = $("<div><div><span></span></div></div>")
            container.append(bar);

            var panel2 = $("<div></div>");
            container.append(panel2);
            if (template2 != null) {
                panel2.append(template2);
            }
            else {
                var content2 = $("<div></div>");
                panel2.append(content2);
            }
        },

        _attachClass: function () {
            if (this.options.orientation == "vertical") {
                this.element.addClass("ui-wijsplitter-vertical");
                this._getPanel1().addClass("ui-wijsplitter-v-panel1");

                this._getPanel1Content().addClass("ui-wijsplitter-v-panel1-content ui-widget-content");
                this._getBar().addClass("ui-wijsplitter-v-bar ui-widget-header");
                this._getExpander().addClass("ui-wijsplitter-v-expander ui-state-default ui-corner-tl ui-corner-bl");
                this._getExpander().find("> span").addClass("ui-icon ui-icon-arrowthickstop-1-w");
                this._getPanel2().addClass("ui-wijsplitter-v-panel2");

                this._getPanel2Content().addClass("ui-wijsplitter-v-panel2-content ui-widget-content");
            }
            else {
                this.element.addClass("ui-wijsplitter-horizontal");
                this._getPanel1().addClass("ui-wijsplitter-h-panel1");

                this._getPanel1Content().addClass("ui-wijsplitter-h-panel1-content ui-widget-content");
                this._getBar().addClass("ui-wijsplitter-h-bar ui-widget-header");
                this._getExpander().addClass("ui-wijsplitter-h-expander ui-state-default ui-corner-tl ui-corner-tr");
                this._getExpander().find("> span").addClass("ui-icon ui-icon-arrowthickstop-1-n");
                this._getPanel2().addClass("ui-wijsplitter-h-panel2");

                this._getPanel2Content().addClass("ui-wijsplitter-h-panel2-content ui-widget-content");
            }
        },

        _getPanel1: function () {
            var panel1 = this.element.find("> div > div:eq(0)");
            return panel1;
        },

        _getPanel1Content: function () {
            var panel1content = this._getPanel1().find("> div:eq(0)");
            return panel1content;
        },

        _getBar: function () {
            var bar = this.element.find("> div > div:eq(1)");
            return bar;
        },

        _getExpander: function () {
            var expander = this._getBar().find("> div");
            return expander;
        },

        _getPanel2: function () {
            var panel2 = this.element.find("> div > div:eq(2)");
            return panel2;
        },

        _getPanel2Content: function () {
            var panel2content = this._getPanel2().find("> div:eq(0)");
            return panel2content;
        },

        _getContainer: function () {
            var container = this.element.find("> div");
            return container;
        },

        _initElements: function () {
            ///	<summary>
            ///	Invalidates the entire surface of the control and causes the control to be redrawn.
            ///	</summary>

            //this.element.css("overflow", "hidden");
            this._getContainer().height(this.element.height());

            this._setPanelsScrollMode();
            var distance = this.options.splitterDistance;
            var eleW = this.element.width();
            var eleH = this.element.height();

            if (this.options.orientation == "vertical") {

                var barW = this._getBar().outerWidth();

                if (distance > eleW - barW) {
                    distance = eleW - barW;
                }

                var expanderH = this._getExpander().height();
                this._getContainer().width(eleW * 2);

                if (this.options.panel2.collapsed && this.options.panel1.collapsed == false) {
                    distance = eleW - barW;
                }

                this._getPanel1().height(eleH);
                this._getPanel1().width(distance);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    var bw1 = this._getPanel1Content().borderSize().width;
                    var bh1 = this._getPanel1Content().borderSize().height;
                    this._getPanel1Content().css("float", "none").css("height", eleH - bh1).css("width", distance - bw1).css("float", "left");
//                    this._getPanel1Content().css("height", eleH - bh1);
//                    this._getPanel1Content().css("width", distance - bw1);
//                    this._getPanel1Content().css("float", "left");
                }
                else {

                    this._getPanel1Content().setOutHeight(eleH);
                    this._getPanel1Content().setOutWidth(distance);
                }
                if (this.options.panel1.collapsed) {
                    this.element.addClass("ui-wijsplitter-v-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("ui-wijsplitter-v-expanded");
                    this._getPanel1().css("display", "");
                }
                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    var bh2 = this._getBar().borderSize().height;
                    this._getBar().css("float", "none").height(eleH - bh2).css("float", "left");
//                    this._getBar().height(eleH - bh2);
//                    this._getBar().css("float", "left");
                }
                else {
                    this._getBar().setOutHeight(eleH);
                }

                this._getPanel2().height(eleH);
                this._getPanel2().width(eleW - distance - barW);

                if (window.navigator.userAgent.indexOf('Safari') > -1) {

                    var bw3 = this._getPanel2Content().borderSize().width;
                    this._getPanel2Content().css("float", "none").height(eleH - bw3).width(eleW - distance - barW - bw3).css("float", "left");
//                    this._getPanel2Content().height(eleH - bw3);
//                    this._getPanel2Content().width(eleW - distance - barW - bw3);
//                    this._getPanel2Content().css("float", "left");
                }
                else {

                    this._getPanel2Content().setOutHeight(eleH);
                    this._getPanel2Content().setOutWidth(eleW - distance - barW);
                }

                this._getExpander().css("cursor", "pointer");
                this._getExpander().css("top", eleH / 2 - expanderH / 2);

            }
            else {
                var barH = this._getBar().outerHeight();

                if (distance > eleH - barH) {
                    distance = eleH - barH;
                }

                var expanderW = this._getExpander().width();

                if (this.options.panel2.collapsed && this.options.panel1.collapsed == false) {

                    distance = eleH - barH;
                }
                this._getPanel1().width(eleW).height(distance);
//                this._getPanel1().height(distance);

                this._getPanel1Content().setOutWidth(eleW);
                this._getPanel1Content().setOutHeight(distance);

                if (this.options.panel1.collapsed) {
                    this.element.addClass("ui-wijsplitter-h-collapsed");
                    this._getPanel1().css("display", "none");
                    distance = 0;
                }
                else {
                    this.element.addClass("ui-wijsplitter-h-expanded");
                    this._getPanel1().css("display", "");
                }

                this._getBar().setOutWidth(eleW);
                this._getPanel2().width(eleW).height(eleH - distance - barH);
//                this._getPanel2().height(eleH - distance - barH);

                this._getPanel2Content().setOutWidth(eleW);
                this._getPanel2Content().setOutHeight(eleH - distance - barH);

                this._getExpander().css("cursor", "pointer");
                this._getExpander().css("left", eleW / 2 - expanderW / 2);
            }

            if (this.options.showExpander) {
                this._getExpander().css("display", "");
            }
            else {
                this._getExpander().css("display", "none");
            }
        },

        _bindEvents: function () {
            ///	<summary>
            ///	Binds interactive DOM events for Splitter.
            ///	</summary>

            var self = this;
            var bar = this._getBar();
            var expander = this._getExpander();
            expander.bind('mouseup.' + self.widgetName, self, self._expanderMouseUp);
            expander.bind('mouseover.' + self.widgetName, self, self._expanderMouseOver);
            expander.bind('mousedown.' + self.widgetName, self, self._expanderMouseDown);
            expander.bind('mouseout.' + self.widgetName, self, self._expanderMouseOut);
            bar.bind('mouseover.' + self.widgetName, self, self._barMouseOver);
            bar.bind('mouseout.' + self.widgetName, self, self._barMouseOut);
            $(window).bind('resize.' + self.widgetName, self, self._documentResize);
        },

        _barMouseOver: function (e) {

            $(e.currentTarget).addClass("ui-state-hover");
        },

        _barMouseOut: function (e) {
            $(e.currentTarget).removeClass("ui-state-hover");
        },

        _documentResize: function (e) {
            var self = e.data;
            self.refresh();
        },

        _expanderMouseOver: function (e) {

            $(e.currentTarget).addClass("ui-state-hover");
        },

        _expanderMouseDown: function (e) {

            $(e.currentTarget).addClass("ui-state-active");
        },

        _expanderMouseOut: function (e) {
            $(e.currentTarget).removeClass("ui-state-hover ui-state-active");
        },

        _expanderMouseUp: function (e) {

            $(e.currentTarget).removeClass("ui-state-active");

            var self = e.data;
            if (self.options.panel1.collapsed == false && self.options.panel2.collapsed) {
                self.options.panel2.collapsed = false;
                self._initElements();
                return;
            }

            if (self.options.panel1.collapsed) {
                var newEv1 = $.Event("expand");
                $(self.element).trigger(newEv1);
                if (newEv1.isImmediatePropagationStopped()) {
                    return;
                }
            }
            else {
                var newEv2 = $.Event("collapse");
                $(self.element).trigger(newEv2);
                if (newEv2.isImmediatePropagationStopped()) {
                    return;
                }
            }

            self.options.panel1.collapsed = !self.options.panel1.collapsed;
            self._initElements();

            if (self.options.orientation == "vertical") {
                self.element.removeClass("ui-wijsplitter-v-expanded ui-wijsplitter-v-collapsed");
                self._getExpander().removeClass("ui-corner-tl ui-corner-bl ui-corner-tr ui-corner-br");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-w ui-icon-arrowthickstop-1-e");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("ui-wijsplitter-v-collapsed");
                    self._getExpander().addClass("ui-corner-tr ui-corner-br");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-e");
                }
                else {
                    self.element.addClass("ui-wijsplitter-v-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-bl");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-w");
                }
            }
            else {
                self.element.removeClass("ui-wijsplitter-h-expanded ui-wijsplitter-h-collapsed");
                self._getExpander().removeClass("ui-corner-tl ui-corner-tr ui-corner-bl ui-corner-br");
                self._getExpander().find("span").removeClass("ui-icon-arrowthickstop-1-n ui-icon-arrowthickstop-1-s");
                if (self.options.panel1.collapsed) {
                    self.element.addClass("ui-wijsplitter-h-collapsed");
                    self._getExpander().addClass("ui-corner-bl ui-corner-br");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-s");
                }
                else {
                    self.element.addClass("ui-wijsplitter-h-expanded");
                    self._getExpander().addClass("ui-corner-tl ui-corner-tr");
                    self._getExpander().find("span").addClass("ui-icon-arrowthickstop-1-n");
                }
            }

            if (self.options.panel1.collapsed) {
                $(self.element).trigger("collapsed");
            }
            else {
                $(self.element).trigger("expanded");
            }
        },

        _initResizer: function () {

            var eleW = this.element.width();
            var eleH = this.element.height();
            //var barSize = this.options.bar.width;
            var self = this;
            if (this.options.orientation == "vertical") {
                //var barW = barSize;
                var barW = this._getBar().outerWidth();
                //
                var maxW = eleW - barW - this.options.panel2.minSize;
                var minW = this.options.panel1.minSize;
                if (minW < 2) {
                    minW = 2;
                }
                self._getPanel1().wijresizable({ wijanimate: true, minWidth: minW, maxWidth: maxW, handles: 'e', helper: 'ui-wijsplitter-v-resize-hepler', animateDuration: self.options.resizeSettings.animationDuration, animateEasing: self.options.resizeSettings.easing, stop: function (e) { self._resizeStop(e, self); } });
                self._getPanel1().bind("animating", function (e) { self._animating(e, self); });
                self._getPanel1().bind("animated", function (e) { self._animated(e, self); });
            }
            else {
                //var barH = barSize;
                var barH = this._getBar().outerHeight();
                //
                var maxH = eleH - barH - this.options.panel2.minSize;
                var minH = this.options.panel1.minSize;
                if (minH < 2) {
                    minH = 2;
                }
                self._getPanel1().wijresizable({ wijanimate: true, minHeight: minH, maxHeight: maxH, handles: 's', helper: 'ui-wijsplitter-h-resize-hepler', animateDuration: self.options.resizeSettings.animationDuration, animateEasing: self.options.resizeSettings.easing, stop: function (e) { self._resizeStop(e, self); } });
                self._getPanel1().bind("animating", function (e) { self._animating(e, self); });
                self._getPanel1().bind("animated", function (e) { self._animated(e, self); });
            }
        },

        _animated: function (e, self) {

            self._adjustLayout(self);
            $(self.element).trigger("sized");
        },

        _animating: function (e, self) {

            self._adjustLayout(self);
            $(self.element).trigger("sizing");
        },

        _adjustLayout: function (self) {

            if (self.options.orientation == "vertical") {
                self.options.splitterDistance = self._getPanel1().width();
                self._initElements();
            }
            else {
                self.options.splitterDistance = self._getPanel1().height();
                self._initElements();
            }
        },

        _resizeStop: function (e, self) {
            self._adjustLayout(self);
        },

        _checkFullSplitMode: function () {
            if (this.element.css("width") == "100%" && this.element.css("height") == "100%") {
                this.options.fullSplit = true;
            }
        },

        _setPanelsScrollMode: function () {

            var panel1content = this._getPanel1Content();
            var panel2content = this._getPanel2Content();

            if (this.options.panel1.scrollBars == "auto") {
                panel1content.css("overflow", "auto");
            }
            else if (this.options.panel1.scrollBars == "both") {
                panel1content.css("overflow", "scroll");
            }
            else if (this.options.panel1.scrollBars == "none") {
                panel1content.css("overflow", "hidden");
            }
            else if (this.options.panel1.scrollBars == "horizontal") {
                panel1content.css("overflow-x", "scroll").css("overflow-y", "hidden");
//                panel1content.css("overflow-y", "hidden");
            }
            else if (this.options.panel1.scrollBars == "vertical") {
                panel1content.css("overflow-x", "hidden").css("overflow-y", "scroll");
//                panel1content.css("overflow-y", "scroll");
            }

            if (this.options.panel2.scrollBars == "auto") {
                panel2content.css("overflow", "auto");
            }
            else if (this.options.panel2.scrollBars == "both") {
                panel2content.css("overflow", "scroll");
            }
            else if (this.options.panel2.scrollBars == "none") {
                panel2content.css("overflow", "hidden");
            }
            else if (this.options.panel2.scrollBars == "horizontal") {
                panel2content.css("overflow-x", "scroll").css("overflow-y", "hidden");
//                panel2content.css("overflow-y", "hidden");
            }
            else if (this.options.panel2.scrollBars == "vertical") {
                panel2content.css("overflow-x", "hidden").css("overflow-y", "scroll");
//                panel2content.css("overflow-y", "scroll");
            }

        },

        _setFullSplitMode: function () {
            this.element.css("width", "100%").css("height", "100%");
//            this.element.css("height", "100%");
        },

        invalidate: function () {
            /// <summary>
            /// Invalidates the entire surface of the control and causes the control to be redrawn.
            /// </summary>
            this._initElements();
        },

        refresh: function () {
            ///	<summary>
            ///	refresh layout for Splitter.
            ///	</summary>
            if (this.options.fullSplit) {
                this._setFullSplitMode();
                this._initElements();
            }
        }
        //end of Splitter implementations.
    })


})(jQuery);

(function ($) {

    $.widget("ui.wijresizable", $.ui.resizable, {

        options: {
            wijanimate: false
        }

    });

    $.ui.plugin.add("wijresizable", "wijanimate", {

        stop: function (event, ui) {

            var self = $(this).data("wijresizable"), o = self.options;
            self.element.css("width", self.originalSize.width);
            self.element.css("height", self.originalSize.height);

            var pr = self._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
                					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : self.sizeDiff.height,
                						soffsetw = ista ? 0 : self.sizeDiff.width;

            var style = { width: (self.size.width - soffsetw), height: (self.size.height - soffseth) },
                					left = (parseInt(self.element.css('left'), 10) + (self.position.left - self.originalPosition.left)) || null,
                						top = (parseInt(self.element.css('top'), 10) + (self.position.top - self.originalPosition.top)) || null;

            self.element.animate(
                			$.extend(style, top && left ? { top: top, left: left} : {}), {
                			    duration: o.animateDuration,
                			    easing: o.animateEasing,
                			    step: function () {

                			        var data = {
                			            width: parseInt(self.element.css('width'), 10),
                			            height: parseInt(self.element.css('height'), 10),
                			            top: parseInt(self.element.css('top'), 10),
                			            left: parseInt(self.element.css('left'), 10)
                			        };

                			        if (pr && pr.length)
                                    { 
                                    $(pr[0]).css({ width: data.width, height: data.height });
                                    }

                			        // propagating resize, and updating values for each animation step
                			        self._updateCache(data);
                			        self._propagate("resize", event);
                			        self.element.trigger("animating");
                			    },
                			    complete: function () {
                			        self.element.trigger("animated");
                			    }
                			}
                		);
        }

    });


})(jQuery);



/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Progressbar widget.
 * 
 * Depends:
 * 	Jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *   jquery.effects.*.js (optional for effects setting)
 *
 */
(function ($) {
	$.widget("ui.wijprogressbar", {
		options: {
			/// <summary>
			///The label's alignment on the progress bar. The value should be "none","leftOrTop","center","rightOrBottom", or "running".
			///Default:"center".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelAlign','center').
			///</summary>
			labelAlign: "center",
			/// <summary>
			///The value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','value',60).
			///</summary>
			value: 0,
			/// <summary>
			///The max value of the progress bar,the type should be numeric.
			///Default:100.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','maxValue',100).
			///</summary>
			maxValue: 100,
			/// <summary>
			///The minimum value of the progress bar,the type should be numeric.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option','minValue',0).
			///</summary>
			minValue: 0,
			/// <summary>
			///The fill direction of the progress bar.the value should be "fromLeftOrTop" or "fromRightOrBottom".
			///Default:"fromLeftOrTop".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','fillDirection','fromLeftOrTop').
			///</summary>
			fillDirection: "east",
			/// <summary>
			///The progressbar's orientation.the value should be 'horizontal' or 'vertical'.
			///Default:"horizontal".
			///Type:String.
			///Code sample:$('selector').wijprogressbar('option','orientation','horizontal').
			///</summary>
			///orientation: "horizontal",
			/// <summary>
			///Sets the format of the label text.The available formats are as follows:
			///{0} or {ProgressValue} express the current progress Value.
			///{1} or {PercentProgress} express the current percent of the progress bar.
			///{2} or {RemainingProgress} express the remaining progress of the progress bar.
			///{3} or {PercentageRemaining} express the remaining percent of the progress bar.
			///{4} or {Min} express the min Vlaue of the progress bar.
			///{5} or {Max} express the max Value of the progress bar.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','labelFormatString','{0}%').
			///</summary>

			labelFormatString: "{1}%",
			/// <summary>
			///Set the format of the ToolTip of the progress bar,the expression of the format like the labelFormatString.
			///Default:"{1}%".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','toolTipFormatString','{1}%').
			///</summary>
			toolTipFormatString: "{1}%",
			/// <summary>
			///The increment of the progress bar's indicator.
			///Default:1.
			///Type:Number.
			///</summary>
			///Code sample:$('.selector').wijprogressbar('option','indicatorIncrement',10).
			indicatorIncrement: 1,
			/// <summary>
			///The Image's url of the indicator.
			///Default:"".
			///Type:String.
			///Code sample:$('.selector').wijprogressbar('option','indicatorImage','images/abc.png').
			///</summary>
			indicatorImage: "",
			/// <summary>
			///The delay of the progressbar's animation.
			///Default:0.
			///Type:Number.
			///Code sample:$('.selector').wijprogressbar('option',
			///</summary>
			animationDelay: 0,
			/// <summary>
			///The options parameter of the jQuery's animation.
			///Default:"{animated:'progress',duration:500}".
			///Type:Options.
			///Code sample:$('.selector').wijprogressbar('option','animationOptions',{animated:'progress',duration:600}).
			///</summary>
			animationOptions: { animated: 'progress', duration: 500 }
		},

		_setOption: function (key, value) {
			var val;
			switch (key) {
				case "value":
					val = parseInt(value);
					this.options[key] = val;
					this._progressValue(val);
					break;
				case "maxValue":
				case "minValue":
					val = parseInt(value);
					this.options[key] = val;
					this._progressValue();
					break;
				case "labelFormatString":
				case "toolTipFormatString":
					this.options[key] = value;
					this._performAnimating();
					//$.Widget.prototype._setOption.apply(this, arguments);
					break;
				case "orientation":
				case "fillDirection":
				case "labelAlign":
				case "indicatorImage":
					this.options[key] = value;
					this._initElements();
					this._progressValue();
					//$.Widget.prototype._setOption.apply(this, arguments);
					break;
				case "indicatorIncrement":
					value = (value == 0 ? 1 : value);
					this.options[key] = value;
					this._initElements();
					this._progressValue();
					break;
				default: break;
			}
			$.Widget.prototype._setOption.apply(this, arguments);
		},

		_create: function () {

			this.element.addClass("ui-wijprogressbar ui-progressbar ui-widget ui-widget-content ui-corner-all");
			var progress = $("<div>");
			progress.addClass("ui-progressbar-value ui-widget-header");

			var backlabel = $("<span>").addClass("ui-progressbar-backlabel ui-corner-left");
			var frontlabel = $("<span>").addClass("ui-progressbar-frontlabel ui-corner-left");
			var domobject = { progress: progress, backlabel: backlabel, frontlabel: frontlabel };
			this.element.data("domobject", domobject);
			this.element.append(backlabel).append(progress);
			progress.append(frontlabel);
			//this._setStructure();
			//this._attachClass();
			this._initElements();
			this._progressValue();
		},

		_value: function () {
			var val = this.options.value;
			var maxVal = this.options.maxValue;
			var minVal = this.options.minValue;
			if (typeof val !== "number" || typeof maxVal !== "number" || typeof minVal !== "number") {
				val = 0;
			}

			if (val < minVal) {
				return minVal;
			}
			if (val > maxVal) {
				return maxVal;
			}
			return val;
		},

		value: function (newValue) {
			/// <summary>
			///Gets or Sets the value of the progressbar.
			///</summary>
			/// <param name="newValue" type="Number" optional="true">The value of the progressbar</param>
			/// <returns type="Number" />
			if (newValue === undefined) {
				return this._value();
			}
			else {
				if (typeof (newValue) !== "number") {
					newValue = parseInt(newValue);
				}
				this._setOption("value", newValue);
				return this;
			}
		},

		startTask: function () {
			/// <summary>Stark the progress</summary>
			if ($(":animated", this.element).length == 0) {
				this._progressValue();
			}
		},
		stopTask: function () {
			/// <summary>Stop the progress</summary>
			this.element.data("domobject").progress.stop();
		},
		_initElements: function () {
			this.element.removeClass("ui-wijprogressbar-h ui-wijprogressbar-v")
			.addClass((this.options.fillDirection === "west" || this.options.fillDirection === "east") ? "ui-wijprogressbar-h" : "ui-wijprogressbar-v");
			var domobject = this.element.data("domobject");
			var height = this.element.height();
			//var width = this.element.width();
			this.element.css("line-height", this.element.height() + "px");
			domobject.progress.removeClass("ui-corner-left ui-corner-top ui-corner-right ui-corner-bottom");
			if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
				domobject.progress.height(height);
				domobject.progress.css("line-height", height + "px");
				domobject.backlabel.height(height);
				domobject.frontlabel.height(height);
				domobject.progress.css("margin", "0");
				this._setLabelsTextAlign("left");
				if (this.options.fillDirection === "east") {
					domobject.progress.addClass("ui-corner-left");
					this._setProgressAtLeftSide();
					switch (this.options.labelAlign) {
						case "west":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							this._setLabelsAtLeftSide();
							this._setLabelsTextAlign("left");
							break;
						case "east":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtLeftSide();
							domobject.frontlabel.css("right", "auto");
							this._setLabelsTextAlign("right");
							break;
						case "center":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtLeftSide();
							this._setLabelsTextAlign("center");
							break;
						case "north":
							this.element.css("line-height", "normal");
							domobject.progress.css("line-height", "normal");
							this._showLabels(true);
							//this.element.data("backlabelArea").css("height", this.element.data("backcloth").outerHeight());
							this._setLabelsHeightByBackcloth(true);
							this._setLabelsTextAlign("center");
							this._setLabelsAtTopSide();
							break;
						case "south":
							domobject.progress.css("line-height", "normal");
							this.element.css("line-height", "normal");
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);
							this._setLabelsAtBottomSide();

							//this._setLabelsHeightByBackcloth();
							//this._setLabelsAtBottomSide();
							this._setLabelsTextAlign("center");
							break;
						case "running":
							this._showLabels(true);
							this._setLabelsAutoWidth();
							this._setLabelsTextAlign("left");
							break;
					}
				}
				else {
					domobject.progress.addClass("ui-corner-right");
					this._setProgressAtRightSide();
					switch (this.options.labelAlign) {
						case "west":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							domobject.frontlabel.css("left", -domobject.progress.width());
							this._setLabelsAtRightSide();
							this._setLabelsTextAlign("left");
							break;
						case "east":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtRightSide();
							this._setLabelsTextAlign("right");
							break;
						case "center":
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtRightSide();
							this._setLabelsTextAlign("center");
							break;
						case "north":
							this.element.css("line-height", "normal");
							domobject.progress.css("line-height", "normal");
							this._showLabels(true);
							//this.element.data("backlabelArea").css("height", this.element.data("backcloth").outerHeight());
							this._setLabelsHeightByBackcloth(true);
							this._setLabelsTextAlign("center");
							this._setLabelsAtTopSide();
							break;
						case "south":
							domobject.progress.css("line-height", "normal");
							this.element.css("line-height", "normal");
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);
							this._setLabelsAtBottomSide();

							//this._setLabelsHeightByBackcloth();
							//this._setLabelsAtBottomSide();
							this._setLabelsTextAlign("center");
							break;
						case "running":
							this._showLabels(true);
							this._setLabelsAutoWidth();
							this._setLabelsTextAlign("left");
							break;
					}
				}
			}
			else {
				domobject.progress.width(this.element.width());
				domobject.progress.css("margin", "0");
				this._setLabelsWidthByBackcloth();
				this._setLabelsHeightByBackcloth();
				this._setLabelsLineHeightByBackcloth(false);
				this._setLabelsTextAlign("center");
				if (this.options.fillDirection === "south") {
					domobject.progress.addClass("ui-corner-top");
					this._setProgressAtTopSide();
					switch (this.options.labelAlign) {
						case "west":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();

							this._setLabelsAtTopSide();
							this._setLabelsTextAlign("left");
							break;
						case "east":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtTopSide();
							this._setLabelsTextAlign("right");
							break;
						case "center":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtTopSide();
							this._setLabelsTextAlign("center");
							break;
						case "north":
							this.element.css("line-height", "normal");
							domobject.progress.css("line-height", "normal");
							this._showLabels(true);
							//this.element.data("backlabelArea").css("height", this.element.data("backcloth").outerHeight());
							this._setLabelsHeightByBackcloth(true);
							this._setLabelsTextAlign("center");
							this._setLabelsAtTopSide();
							break;
						case "south":
							//domobject.progress.css("line-height", "normal");
							//this.element.css("line-height", "normal");
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);

							this._setLabelsAtBottomSide();
							domobject.frontlabel.css("top", this.element.height() - domobject.frontlabel.height());
							this._setLabelsTextAlign("center");
							break;
						case "running":
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);
							this._setLabelsWidthByBackcloth();
							this._setLabelsTextAlign("center");
							break;
					}
				}
				else {
					domobject.progress.addClass("ui-corner-bottom");
					this._setProgressAtBottomSide()
					switch (this.options.labelAlign) {
						case "west":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();

							this._setLabelsAtBottomSide();
							this._setLabelsTextAlign("left");
							break;
						case "east":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtBottomSide();
							this._setLabelsTextAlign("right");
							break;
						case "center":
							this._setLabelsLineHeightByBackcloth(true);
							this._showLabels(true);
							this._setLabelsWidthByBackcloth();
							//this.element.data("backlabelArea").css("width", this.element.data("backcloth").outerWidth() + 'px');
							this._setLabelsAtBottomSide();
							this._setLabelsTextAlign("center");
							break;
						case "north":
							this.element.css("line-height", "normal");
							domobject.progress.css("line-height", "normal");
							this._showLabels(true);
							//this.element.data("backlabelArea").css("height", this.element.data("backcloth").outerHeight());
							this._setLabelsHeightByBackcloth(true);
							this._setLabelsTextAlign("center");
							this._setLabelsAtBottomSide();
							break;
						case "south":
							//domobject.progress.css("line-height", "normal");
							//this.element.css("line-height", "normal");
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);

							this._setLabelsAtBottomSide();
							//domobject.frontlabel.css("top", this.element.height() - domobject.frontlabel.height());
							this._setLabelsTextAlign("center");
							break;
						case "running":
							this._showLabels(true);
							this._setLabelsHeightByBackcloth(false);
							this._setLabelsWidthByBackcloth();
							this._setLabelsTextAlign("center");
							break;
					}
				}
			}
			if (this.options.indicatorImage !== "") {
				//domobject.progress.css("background", "none");
				domobject.progress.css("background", "transparent url(" + this.options.indicatorImage + ") repeat fixed");
			}
		},

		_performAnimating: function (obj) {
			var domobject = this.element.data("domobject");
			var elewidth = this.element.width();
			var eleheight = this.element.height();
			if (obj === undefined) {
				if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
					obj = domobject.progress.width()
				}
				else {
					obj = domobject.progress.height()
				}

			}
			var ea = new $.Event('progressChanging');
			ea.data = {
				oldValue: this.element.data("oldValue"),
				newValue: obj,
				cancel: false
			};
			this._trigger("progressChanging", ea);
			if (ea.data.cancel) {
				return;
			}
			var len;
			this.element.data("oldValue", obj);
			if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
				len = Math.floor(obj / this.options.indicatorIncrement);
				obj = len * this.options.indicatorIncrement;
				domobject.progress.width(obj);
				if (this.options.fillDirection === "east") {
					if (this.options.labelAlign === "running") {
						this._setLabelsAutoSide();
						try {
							domobject.backlabel.css("left", (obj - domobject.backlabel.outerWidth() + (domobject.backlabel.outerWidth() * (elewidth - domobject.progress.outerWidth()) / elewidth) + "px"));
							domobject.frontlabel.css("right", (-(domobject.frontlabel.outerWidth() * (elewidth - domobject.progress.outerWidth()) / elewidth) + "px"));
						}
						catch (ex) {
							domobject.backlabel.css("right", "0px");
							domobject.frontlabel.css("right", "0px");
						}

					}
				}
				else {
					if (this.options.labelAlign === "running") {
						this._setLabelsAutoSide();
						try {
							domobject.backlabel.css("right", ((obj - domobject.backlabel.outerWidth() + domobject.backlabel.outerWidth() * (elewidth - domobject.progress.outerWidth()) / elewidth) + "px"));
							domobject.frontlabel.css("left", ("-" + domobject.frontlabel.outerWidth() * (elewidth - domobject.progress.outerWidth()) / elewidth + "px"));
						}
						catch (ex) {
							domobject.backlabel.css("left", "0px");
							domobject.frontlabel.css("left", "0px");
						}
					}
				}

			}
			else {
				domobject.progress.width(elewidth);
				len = Math.floor(obj / this.options.indicatorIncrement);
				obj = len * this.options.indicatorIncrement;
				domobject.progress.height(obj);
				if (this.options.fillDirection === "south") {
					if (this.options.labelAlign === "running") {
						//this.element.data("backlabelArea").height(domobject.progress.outerHeight());
						this._setLabelsAutoSide();
						try {
							domobject.backlabel.css("top", ((obj - domobject.backlabel.outerHeight() + domobject.backlabel.outerHeight() * (eleheight - domobject.progress.outerHeight()) / eleheight) + "px"));
							domobject.frontlabel.css("bottom", ("-" + domobject.frontlabel.outerHeight() * (eleheight - domobject.progress.outerHeight()) / eleheight + "px"));
						}
						catch (ex) {
							domobject.backlabel.css("bottom", "0px");
							domobject.frontlabel.css("bottom", "0px");
						}
					}
				}
				else {
					if (this.options.labelAlign === "running") {
						//this.element.data("backlabelArea").height(domobject.progress.outerHeight());
						this._setLabelsAutoSide();
						try {
							domobject.backlabel.css("bottom", ((obj - domobject.backlabel.outerHeight() + domobject.backlabel.outerHeight() * (eleheight - domobject.progress.outerHeight()) / eleheight) + "px"));
							domobject.frontlabel.css("top", ("-" + domobject.frontlabel.outerHeight() * (eleheight - domobject.progress.outerHeight()) / eleheight + "px"));
						}
						catch (ex) {
							domobject.backlabel.css("top", "0px");
							domobject.frontlabel.css("top", "0px");
						}
					}
				}

			}




			var o = this.options;
			var txt = this._getFormatString(o.labelFormatString, obj);
			this._setLabelsText(txt);
			var _tooTip = this._getFormatString(o.toolTipFormatString, obj);
			this.element.attr("title", _tooTip);
		},
		_oldValue: 0,
		_progressValue: function (val) {
			var domobject = this.element.data("domobject");
			var value = this.value();
			if (val !== undefined) {
				if (val > this.options.maxValue) {
					val = this.options.maxValue;
				}
				if (val < this.options.minValue) {
					val = this.options.minValue;
				}
				value = val;
			}
			value = value - this.options.minValue;
			var pix = value / this._getAPixelValue();
			if (this._getCurrentProgressValue() === value) {
				return;
			}
			var that = this;
			that.element.data("oldValue", that._getCurrentProgressValue());
			window.setTimeout($.proxy(function () {
				var ea = $.Event('beforeProgressChanging');
				ea.data = {
					oldValue: this.element.data("oldValue"),
					newValue: pix,
					cancel: false
				};
				this._trigger("beforeProgressChanging", ea);
				if (ea.data.cancel) {
					return;
				}
				if (!this.options.animationOptions.animated) {
					var eb = $.Event('progressChanging');
					eb.data = {
						oldValue: this.element.data("oldValue"),
						newValue: pix,
						cancel: false
					};
					this._trigger("progressChanging", eb)
					if (eb.data.cancel) {
						return;
					}
					var ec = $.Event('progressChanged');
					ec.data = {
						oldValue: this.element.data("oldValue"),
						newValue: pix,
						cancel: false
					};
					domobject.progress.css("width", pix);
					if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
						//this.element.data("progressIndicator").css("width", pix);
					}
					else {
						domobject.progress.css("height", pix);
					}
					this._performAnimating();
					this._trigger("progressChanged", ec);
				}
				else {
					var o = this.options.animationOptions;
					var animateOptions = {
						content: domobject.progress,
						complete: $.proxy(function () {
							var ec = $.Event('progressChanged');
							ec.data = {
								oldValue: this.element.data("oldValue"),
								newValue: pix,
								cancel: false
							};
							this._trigger("progressChanged", ec);
						}, this),
						step: $.proxy(function (ovalue) {
							this._performAnimating(ovalue);
						}, this),
						processValue: pix,
						fillDirection: o.fillDirection
					}
					var animations = $.ui.wijprogressbar.animations;
					var duration = o.duration;
					var easing = o.animated;
					if (easing && !animations[easing]) {
						easing = "progress";
					}
					if (!animations[easing]) {
						animations[easing] = function (options) {
							this.progress(options, {
								easing: easing,
								duration: duration || 1000
							});
						}
					}
					animations[easing](animateOptions, this.options.animationOptions);
				}
			}, this), this.options.animationDelay);
		},
		_setLabelsWidthByBackcloth: function () {
			var domobject = this.element.data("domobject");
			domobject.backlabel.css("width", this.element.width() + 'px');
			domobject.frontlabel.css("width", this.element.width() + 'px')
		},
		_setLabelsHeightByBackcloth: function (istrue) {
			var domobject = this.element.data("domobject");
			if (istrue) {
				domobject.backlabel.css("height", this.element.height() + 'px');
				domobject.frontlabel.css("height", this.element.height() + 'px');
			}
			else {
				domobject.backlabel.css("height", "auto");
				domobject.frontlabel.css("height", "auto");
			}
		},
		_setLabelsLineHeightByBackcloth: function (isture) {
			var domobject = this.element.data("domobject");
			if (isture) {
				domobject.backlabel.css("line-height", this.element.height() + 'px');
				domobject.frontlabel.css("line-height", this.element.height() + 'px');
			}
			else {
				domobject.backlabel.css("line-height", "normal");
				domobject.frontlabel.css("line-height", "normal");
			}
		},
		_setLabelsText: function (text) {
			var domobject = this.element.data("domobject");
			if (this.options.fillDirection === "north" || this.options.fillDirection === "south") {
				if (this.options.labelAlign === "rightOrBottom") {
					domobject.backlabel.html('<span style=\'position:absolute;bottom:0px;text-align:center;width:' + this.element.width() + 'px;\'>' + text + '</span>');
					domobject.frontlabel.html('<span style=\'position:absolute;bottom:0px;text-align:center;width:' + this.element.width() + 'px;\'>' + text + '</span>');
				}
				else {
					domobject.backlabel.html(text);
					domobject.frontlabel.html(text);
				}
			}
			else {
				domobject.backlabel.html(text);
				domobject.frontlabel.html(text);
			}

		},

		_setLabelsTextAlign: function (val) {
			var domobject = this.element.data("domobject");
			domobject.backlabel.css("text-align", val);
			domobject.frontlabel.css("text-align", val);
		},
		_setLabelsAtLeftSide: function () {
			var css = {
				left: "0px",
				right: "auto"
			};
			var domobject = this.element.data("domobject");
			domobject.backlabel.css(css);
			domobject.frontlabel.css(css);
		},
		_setLabelsAtRightSide: function () {
			var css = {
				left: "auto",
				right: "0px"
			};
			var domobject = this.element.data("domobject");
			domobject.backlabel.css(css);
			domobject.frontlabel.css(css);
		},
		_setLabelsAtTopSide: function () {
			var css = {
				top: "0px",
				bottom: "auto"
			};
			var domobject = this.element.data("domobject");
			domobject.backlabel.css(css);
			domobject.frontlabel.css(css);
		},
		_setLabelsAtBottomSide: function () {
			var css = {
				top: "auto",
				bottom: "0px"
			};
			var domobject = this.element.data("domobject");
			domobject.backlabel.css(css);
			domobject.frontlabel.css(css);
		},
		_setLabelsAutoSide: function () {
			var css = {
				left: "auto",
				right: "auto",
				top: "auto",
				bottom: "auto"
			};
			var domobject = this.element.data("domobject");
			domobject.backlabel.css(css);
			domobject.frontlabel.css(css);
		},
		_setProgressAtLeftSide: function () {
			var css = {
				left: "0px",
				right: "auto"
			};
			var domobject = this.element.data("domobject");
			domobject.progress.css(css);
		},
		_setProgressAtRightSide: function () {
			var css = {
				left: "auto",
				right: "0px"
			};
			var domobject = this.element.data("domobject");
			domobject.progress.css(css);
		},
		_setProgressAtTopSide: function () {
			var css = {
				top: "0px",
				bottom: "auto"
			};
			var domobject = this.element.data("domobject");
			domobject.progress.css(css);
		},
		_setProgressAtBottomSide: function () {
			var css = {
				top: "auto",
				bottom: "0px"
			};
			var domobject = this.element.data("domobject");
			domobject.progress.css(css);
		},
		_showLabels: function (isShow) {
			var domobject = this.element.data("domobject");
			if (isShow) {
				domobject.backlabel.show();
				domobject.frontlabel.show();
			}
			else {
				domobject.backlabel.hide();
				domobject.frontlabel.hide();
			}
		},
		_setLabelsAutoWidth: function () {
			var domobject = this.element.data("domobject");
			domobject.backlabel.css("width", "auto");
			domobject.frontlabel.css("width", "auto");
		},
		_setLabelsAutoHeight: function () {
			var domobject = this.element.data("domobject");
			domobject.backlabel.css("height", "auto");
			domobject.frontlabel.css("height", "auto");
		},
		_getFormatString: function (format, val) {
			var processValue = this._getCurrentProgressValue(val);
			//processValue=this._progress.outerWidth()/this.
			var maxValue = this.options.maxValue;
			var minValue = this.options.minValue;
			var remainingProcess = maxValue + minValue - processValue;
			//alert(processValue);
			var percentProgress = Math.round((processValue - minValue) * 100 / (maxValue - minValue))
			var percentageRemaining = 100 - percentProgress;
			if (remainingProcess < minValue) {
				remainingProcess = minValue;
			}
			if (percentProgress > 100) {
				percentProgress = 100;
			}
			if (remainingProcess < 0) {
				remainingProcess = 0;
			}
			var r = /\{0\}/g;
			format = format.replace(r, processValue.toString());
			r = /\{ProgressValue\}/g;
			format = format.replace(r, processValue.toString());
			r = /\{1\}/g;
			format = format.replace(r, percentProgress.toString());
			r = /\{PercentProgress\}/g;
			format = format.replace(r, percentProgress.toString());
			r = /\{2\}/g;
			format = format.replace(r, remainingProcess.toString());
			r = /\{RemainingProgress\}/g;
			format = format.replace(r, remainingProcess.toString());
			r = /\{3\}/g;
			format = format.replace(r, percentageRemaining.toString());
			r = /\{PercentageRemaining\}/g;
			format = format.replace(r, percentageRemaining.toString());
			r = /\{4\}/g;
			format = format.replace(r, minValue);
			r = /\{Min\}/g;
			format = format.replace(r, minValue);
			r = /\{5\}/g;
			format = format.replace(r, maxValue);
			r = /\{Max\}/g;
			format = format.replace(r, maxValue);
			return format;
		},

		_getScrollableLength: function () {
			if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
				return this.element.width();
			}
			else {
				return this.element.height();
			}
		},

		_getAPixelValue: function () {
			var realDistancePixel = this._getScrollableLength();
			var totalValue = this.options.maxValue - this.options.minValue;
			return totalValue / realDistancePixel;
		},
		_getCurValuePixel: function () {
			var value = this.value();
			var apixelValue = this._getAPixelValue();
			return (value - this.options.minValue) / apixelValue;
		},
		_getCurrentProgressValue: function (val) {
			var domobject = this.element.data("domobject");
			var newval;
			if (val == undefined) {
				if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {
					newval = domobject.progress.innerWidth();
				}
				else {
					newval = domobject.progress.innerHeight();
				}
			}
			else {
				newval = val;
			}
			var curValue;
			if (this.options.fillDirection === "east" || this.options.fillDirection === "west") {

				curValue = this._getAPixelValue() * newval;
				return this.options.minValue + Math.round(curValue);
			}
			else {
				curValue = this._getAPixelValue() * newval;
				return this.options.minValue + Math.round(curValue);
			}
		},
		destroy: function () {
			this.element.empty();
			this.element.removeClass("ui-wijprogressbar ui-widget ui-widget-content ui-corner-all ui-wijprogressbar-h")
            .removeAttr("title")
            .removeData("domobject");
			$.Widget.prototype.destroy.apply(this, arguments);
		}

	});

	$.extend($.ui.wijprogressbar, {
		animations: {
			progress: function (options, additions) {
				options = $.extend({
					easing: "swing",
					duration: 1000
				}, options, additions);
				if (options.orientation === "horizontal") {
					options.content.stop(true, true).animate({
						widthvalue: options.processValue
					}, options);
				}
				else {
					options.content.stop(true, true).animate({
						heightvalue: options.processValue
					}, options);
				}
			}
		}
	});
})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Dialog widget.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.dialog.js
 *	jquery.ui.wijutil.js
 *
 */
(function ($) {

	var uiStateHover = "ui-state-hover", zonCSS = "ui-wijdialog-defaultdockingzone";

	$.widget("ui.wijdialog", $.ui.dialog, {
		options: {
			/// <summary>
			/// An object determines the caption buttons to show on wijdialog title bar. 
			/// Type: Object.
			/// Default: {}
			/// </summary>
			/// <remarks>
			/// The default value for this option is: 
			/// {
			///	pin: {visible: true, click: self.pin, iconClassOn: "ui-icon-pin-w", iconClassOff:"ui-icon-pin-s"},
			///	refresh: {visible: true, click: self.refresh, iconClassOn: "ui-icon-refresh"},
			///	toggle: {visible: true, click: self.toggle, iconClassOn: "ui-icon-carat-1-n", iconClassOff:"ui-icon-carat-1-s"},
			///	minimize: {visible: true, click: self.minimize, iconClassOn: "ui-icon-minus"},
			///	maximize: {visible: true, click: self.maximize, iconClassOn: "ui-icon-extlink"},
			///	close: {visible: true, click: self.close, iconClassOn: "ui-icon-close"}
			/// };
			/// Each button is represented by an object in this object. 
			/// property name: The name of the button.
			/// visible: A value specifies whether this button is visible.
			/// click: The event handler to handle the click event of this button.
			/// iconClassOn: Icon for normal state.
			/// iconClassOff: Icon after clicking.
			/// </remarks>
			captionButtons: {},
			/// <summary>
			/// A value determines the settings of the animation effect to be used when the wijdialog is collapsed.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			collapsingAnimation: null,
			/// <summary>
			/// A value determines the settings of the animation effect to be used when the wijdialog is expanded.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			expandingAnimation: null,
			/// <summary>
			/// A URL string specifies the URL for the iframe element inside wijdialog.
			/// Type: String.
			/// Default: "".
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// A string specifies the ID of the DOM element to dock to when wijdialog is minimized.
			/// Type: String.
			/// Default: "".
			///	</summary>
			minimizeZoneElementId: ""
		},

		_create: function () {
			var self = this;
			$.ui.dialog.prototype._create.apply(self, arguments);
			self.uiDialog.addClass("ui-wijdialog");
			self._initWijWindow();
			self._bindWindowResize();
		},

		_initWijWindow: function () {
			var self = this;
			self._createCaptionButtons();
			self._checkUrl();
			self.uiDialogButtonPane = $(".ui-dialog-buttonpane", self.uiDialog);
		},

		_checkUrl: function () {
			var self = this;
			var o = self.options;
			var url = o.contentUrl;
			if (typeof url === "string" && url.length > 0) {
				self.element.addClass("ui-wijdialog-hasframe");

				var innerFrame = $('<iframe style="width:100%;height:99%;" frameborder="0"></iframe>');
				innerFrame.attr("src", url);
				self.element.append(innerFrame);
				self.innerFrame = innerFrame;
			}
			self.contentWrapper = self.element;
		},

		_createCaptionButtons: function () {
			var captionButtons = [];
			var self = this;
			var o = self.options;
			var buttons = {
				pin: { visible: true, click: self.pin, iconClassOn: "ui-icon-pin-w", iconClassOff: "ui-icon-pin-s" },
				refresh: { visible: true, click: self.refresh, iconClassOn: "ui-icon-refresh" },
				toggle: { visible: true, click: self.toggle, iconClassOn: "ui-icon-carat-1-n", iconClassOff: "ui-icon-carat-1-s" },
				minimize: { visible: true, click: self.minimize, iconClassOn: "ui-icon-minus" },
				maximize: { visible: true, click: self.maximize, iconClassOn: "ui-icon-extlink" },
				close: { visible: true, click: self.close, iconClassOn: "ui-icon-close" }
			};
			var oCaptionButtons = o.captionButtons;
			var uiDialogTitlebar = self.uiDialogTitlebar;
			$.extend(buttons, oCaptionButtons);
			uiDialogTitlebar.children(".ui-dialog-titlebar-close, .ui-wijdialog-captionbutton").remove();
			// recreate buttons
			$.each(buttons, function (name, value) {
				captionButtons.push({ button: name, info: value });
			});
			self._trigger("buttoncreating", null, captionButtons);
			for (var i = captionButtons.length - 1; i >= 0; i--) {
				self._createCaptionButton(captionButtons[i], uiDialogTitlebar);
			};
		},

		_createCaptionButton: function (buttonHash, uiDialogTitlebar, notAppendToHeader) {
			var self = this;

			var buttonCSS = "ui-wijdialog-titlebar-" + buttonHash.button;
			var button = uiDialogTitlebar.children("." + buttonCSS);
			var info = buttonHash.info;
			if (info.visible) {
				if (button.size() === 0) {
					var buttonIcon = $("<span></span>")
					.addClass(
						"ui-icon " +
						info.iconClassOn
					)
					.text(buttonHash.button);
					var buttonObject = $('<a href="#"></a>')
					.append(buttonIcon)
					.addClass(buttonCSS + " ui-corner-all ui-wijdialog-captionbutton")
					.attr("role", "button")
					.hover(
						function () {
							buttonObject.addClass(uiStateHover);
						},
						function () {
							buttonObject.removeClass(uiStateHover);
						}
					)
					.click(function (event) {
						if (buttonIcon.hasClass(info.iconClassOff)) {
							buttonIcon.removeClass(info.iconClassOff);
						}
						else {
							buttonIcon.addClass(info.iconClassOff);
						}
						if ($.isFunction(info.click)) {
							info.click.apply(self, arguments);
						}
						event.preventDefault();
						return false;
					});
					if (notAppendToHeader) {
						return buttonObject;
					}
					else {
						buttonObject.appendTo(uiDialogTitlebar);
					}
				}
				self[buttonHash.button + "Button"] = buttonObject;
			}
			else {
				button.remove();
			}
		},

		pin: function () {
			///	<summary>
			///		Pins the wijwindow instance so that it could not be moved.
			///	</summary>

			var uiDialog = this.uiDialog;
			var drag = uiDialog.draggable("option", "disabled");
			uiDialog.draggable({ disabled: !drag });
			// remove ui-state-disabled because we are not disabling dialog.
			if (!drag) {
				uiDialog.removeClass("ui-state-disabled");
			}
		},

		refresh: function () {
			///	<summary>
			///		Refreshes the iframe content in C1Window.
			///	</summary>

			var fr = this.innerFrame;
			if (fr != undefined) {
				fr.attr("src", fr.attr("src"));
			}
		},

		toggle: function () {
			var self = this;

			// TODO : toggle animation and event invoking.
			if (self.collapsed == undefined || !self.collapsed) {
				self.collapsed = true;
				self._collapseDialogContent(true);
			}
			else {
				self.collapsed = false;
				self._expandDialogContent(true);
			}
		},

		_expandDialogContent: function (fireEvent) {
			var self = this;
			var o = self.options;
			self.uiDialog.height("auto");
			var animationSetting = o.expandingAnimation;
			if (fireEvent && animationSetting != null) {
				self.contentWrapper.show(animationSetting.effect, animationSetting.options, animationSetting.speed, function (e) {
					self.uiDialog.css("height", self._toggleHeight);
					if ($.isFunction(animationSetting.callback)) {
						animationSetting.callback(e);
					}
					self._enableDisableResizer(false);
				});
			}
			else {
				self.contentWrapper.show();
				self._enableDisableResizer(false);
				self.uiDialog.css("height", self.toggleHeight);
			}
		},

		_collapseDialogContent: function (fireEvent) {
			var self = this;
			var o = self.options;
			self._enableDisableResizer(true);
			self._toggleHeight = self.uiDialog[0].style.height;
			self.uiDialog.height("auto");
			var animationSetting = o.collapsingAnimation;
			if (fireEvent && animationSetting != null) {
				self.contentWrapper.hide(animationSetting.effect, animationSetting.options, animationSetting.speed);
			}
			else {
				self.contentWrapper.hide();
			}
		},

		_enableDisableResizer: function (disabled) {
			var dlg = this.uiDialog;
			dlg.resizable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		_enableDisableDragger: function (disabled) {
			var dlg = this.uiDialog;
			dlg.draggable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		minimize: function () {
			///	<summary>
			///		Minimizes wijWindow.
			///	</summary>

			var self = this;
			var dlg = self.uiDialog;
			// only minimize from normal,maximized state
			if (!self.minimized) {
				self.minimized = true;
				var o = self.options;
				var miniZone = null;
				if (self.maximized) {
					self.maximized = false;
					self.restoreButton.remove(); //fixed bug can't minimize window when it's maximized
					$(window).unbind(".onWinResize");
				}
				else { // minimize from normal state
					self._saveNormalState();
				}
				// disable resizer
				self._enableDisableResizer(true);
				//hide content

				var $from = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.contentWrapper.hide();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.hide();
				}
				// remove size restriction
				dlg.height("auto");
				dlg.width("auto");
				self._doButtonAction(self.minimizeButton, "hide");
				self._restoreButton(true, self.minimizeButton, "After");
				self._doButtonAction(self.pinButton, "hide");
				self._doButtonAction(self.refreshButton, "hide");
				self._doButtonAction(self.toggleButton, "hide");
				self._doButtonAction(self.maximizeButton, "show");
				if (o.minimizeZoneElementId.length > 0) {
					miniZone = $("#" + o.minimizeZoneElementId);
				}
				if (miniZone != null && miniZone.size() > 0) {
					miniZone.append(self.uiDialog);
				}
				else {
					var defaultZone = $("." + zonCSS);
					if (defaultZone.size() == 0) {
						defaultZone = $('<div class="' + zonCSS + '"></div>');
						$(document.body).append(defaultZone);
					}
					defaultZone.append(self.uiDialog).css("z-index", dlg.css("z-index"));
				}
				self.uiDialog.css("position", "static");
				self.uiDialog.css("float", "left");

				var $to = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});
				self.uiDialog.hide();

				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 100, function () {
					$from.remove();
					$to.remove();
					self.uiDialog.show();
				});
			}
		},

		_doButtonAction: function (button, action) {
			if (button != undefined) {
				button.removeClass(uiStateHover);
				button[action]();
			}
		},

		maximize: function () {
			var self = this;

			if (!self.maximized) {
				self.maximized = true;
				// maximized from minimized state
				if (self.minimized) {
					self.restore(); //bug in IE when minimize -> maximize -> restore
				}
				else if (self.collapsed) {
					self._expandDialogContent(false);
				}
				if (self.maximizeButton != undefined) {
					self.maximizeButton.hide();
					self._restoreButton(true, self.maximizeButton, "Before");
				}
				self._saveNormalState();
				var w = $(window);
				self._onWinResize(self, w);
				if (self.collapsed) {
					self._collapseDialogContent(false);
				}
				/// TODO : bind resize event.  
				self.uiDialog.resizable({ disabled: true });
				self.uiDialog.removeClass("ui-state-disabled");
			}
		},

		_bindWindowResize: function () {
			var self = this;
			$(window).resize(function () {
				if (self.maximized) {
					var w = $(window);
					self._onWinResize(self, w);
				}
			});
		},

		_saveNormalState: function () {
			var self = this;
			var dialog = self.uiDialog;
			var ele = self.element;
			self.normalWidth = dialog.css("width");
			self.normalLeft = dialog.css("left");
			self.normalTop = dialog.css("top");
			self.normalHeight = dialog.css("height");

			self.normalInnerHeight = ele.css("height");
			self.normalInnerWidth = ele.css("width");
			self.normalInnerMinWidth = ele.css("min-width");
			self.normalInnerMinHeight = ele.css("min-height");
		},

		_onWinResize: function (self, w) {
			self.uiDialog.css("top", w.scrollTop());
			self.uiDialog.css("left", w.scrollLeft());
			self.uiDialog.setOutWidth(w.width());
			self.uiDialog.setOutHeight(w.height());
			self._resizeDialog(self);
		},

		_restoreButton: function (show, button, position) {
			var self = this;
			var buttonHash = { button: "restore", info: {
				visible: show,
				click: self.restore,
				iconClassOn: "ui-icon-newwin"
			}
			};
			var restore = self._createCaptionButton(buttonHash, self.uiDialogTitlebar, true);
			if (show) {
				restore["insert" + position](button);
				self.restoreButton = restore;
			}
		},

		restore: function () {
			///	<summary>
			///		Restores wijdialog to normal size from minimized and maximized state.
			///	</summary>

			var self = this;
			var dlg = self.uiDialog;
			// restore form minimized state.
			if (self.minimized) {
				self.minimized = false;

				var $from = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				dlg.css("position", "absolute");
				dlg.css("float", "");
				dlg.appendTo(document.body);
				self._enableDisableResizer(false);
				//self._enableDisableDragger(false);
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.show();
				}
				var $to = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.uiDialog.hide();
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 150, function () {
					self.uiDialog.show();
					$from.remove();
					$to.remove();
				});

				if (self.collapsed) {
					self._collapseDialogContent();
				}
				self._doButtonAction(self.minimizeButton, "show");
				self._doButtonAction(self.restoreButton, "remove");
				self._doButtonAction(self.pinButton, "show");
				self._doButtonAction(self.refreshButton, "show");
				self._doButtonAction(self.toggleButton, "show");
			}
			else if (self.maximized) {
				self.maximized = false;
				$(window).unbind(".onWinResize");
				if (self.collapsed) {
					self._expandDialogContent();
				}
				self._enableDisableResizer(false);
				//self._enableDisableDragger(false);
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.collapsed) {
					self._collapseDialogContent();
				}
				if (self.maximizeButton != undefined) {
					self.maximizeButton.show();
					self._restoreButton(false, self.maximizeButton, "before");
				}
			}
		},

		open: function () {
			var self = this;
			if (!self.minimized) {
				$.ui.dialog.prototype.open.apply(self, arguments);
			}
			else {
				self.uiDialog.show();
			}
		},

		_resizeDialog: function (self) {
			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
			self._size();
		},

		_restoreToNormal: function () {
			var self = this;
			var dialog = self.uiDialog;
			var ele = self.element;
			dialog.css("width", self.normalWidth);
			dialog.css("left", self.normalLeft);
			dialog.css("top", self.normalTop);
			dialog.css("height", self.normalHeight);

			ele.css("height", self.normalInnerHeight);
			ele.css("width", self.normalInnerWidth);
			ele.css("min-width", self.normalInnerMinWidth);
			ele.css("min-height", self.normalInnerMinHeight);

			self.options.width = self.normalWidth;
			self.options.height = self.normalHeight;
		}
	});

})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 ** Wijmo Accordion Widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.ui.wijutil.js
*
*/
$.widget("ui.wijaccordion", {
	// widget options
	options: {
		/// <summary>
		/// Sets the animation easing effect. Set this option to false in order to disable animation. Easing effects require UI Effects Core.
		/// Options available for the animation function include:
		///  down – If true, indicates that the index of the pane should be expanded higher than the index of the pane that must be collapsed.
		///  horizontal – If true, indicates that the accordion have a horizontal orientation (when the expandDirection is left or right).
		///  rightToLeft – If true, indicates that the content element is located before the header element (for the top and left expand direction).
		///  toShow – jQuery object that contains the content element(s) should be shown.
		///  toHide –jQuery object that contains the content element(s) should be hidden.
		/// Type: String
		/// Default: "slide"
		/// Code example:
		/// Create your own animation:
		/// jQuery.ui.wijaccordion.animations.custom1 = function (options) {
		///     this.slide(options, {
		///     easing: options.down ? "easeOutBounce" : "swing",
		///     duration: options.down ? 1000 : 200
		///   });
		/// }
		///  $("#accordion3").wijaccordion({
		///      expandDirection: "right",
		///      animated: "custom1"
		///  });
		/// </summary>
		animated: 'slide',

		/// <summary>
		/// The animation duration in milliseconds. By default animation duration value depends on an animation effect specified by the animation option.
		/// Type: Number
		/// Default: null
		/// Code example:
		///  $("#accordion3").wijaccordion({
		///      duration: 1000
		///  });
		/// </summary>
		duration: null,

		/// <summary>
		/// Determines the event that triggers the accordion.
		/// Type: String
		/// Default: "click"       
		/// Code example:
		///  $("#accordion3").wijaccordion({
		///      event: "mouseover"
		///  });
		/// </summary>
		event: "click",
		/// <summary>
		/// Determines whether the widget behavior is disabled.
		/// Type: Boolean
		/// Default: false
		/// Code example:
		///   $(".selector").wijaccordion({ disabled: true });
		/// </summary>
		disabled: false,
		/// <summary>
		/// Determines the direction in which the content area of the control expands. Available values include: top, right, bottom, and left. 
		/// Type: String
		/// Default: "bottom"
		/// Code example: 
		///    $("#element").wijaccordion({ expandDirection: "right" });
		/// </summary>
		expandDirection: "bottom",
		/// <summary>
		/// Selector for the header element. By using this option you can put header/content elements inside LI tags or into any other more complex html markup.
		/// Type: String
		/// Default: "> li > :first-child,> :not(li):even"
		/// Code example: $("#element").wijaccordion({ header: "h3" });
		/// </summary>
		header: "> li > :first-child,> :not(li):even",
		/// <summary>
		/// Determines whether clicking the header will close the currently opened pane (leaving all the accordion's panes closed).
		/// Type: Boolean
		/// Default: true
		/// Code example:
		///    $("#element").wijaccordion({ requireOpenedPane: false });
		/// </summary>
		requireOpenedPane: true,
		/// <summary>
		/// Gets or sets the index of the currently expanded accordion pane.
		/// Type: Number
		/// Default: 0
		/// Code example:
		///   $("#element").wijaccordion({ selectedIndex: 5 });
		/// </summary>
		selectedIndex: 0
	},

	/*
	Available Events:
	/// <summary>
	/// Occurs before an active accordion pane change. Event is cancelable.
	/// Code example:
	/// $("#accordionEvents").wijaccordion({
	///         beforeselectedindexchanged: function (e, newIndex, prevIndex) {
	///                // uncomment following in order to prevent the selected index change:
	///                 e.stopImmediatePropagation();
	/// });
	/// </summary>
	/// <param name="ev" type="Object">jQuery event object.</param>
	/// <param name="newIndex" type="Object">Index of a pane that will be expanded.</param>
	/// <param name="prevIndex" type="Object">Index of a pane that will be collapsed.</param>
	beforeselectedindexchanged(ev, newIndex, prevIndex)

	/// <summary>
	/// Occurs when an active accordion pane changed.
	/// Code example:
	/// $("#accordionEvents").bind( "selectedindexchanged",
	///         function (e, index) {
	///                 alert("Pane with index " + index + " expanded.");
	///   }
	/// );
	/// </summary>
	/// <param name="ev" type="Object">jQuery event object.</param>
	/// <param name="index" type="Object">Index of the activated pane.</param>
	selectedindexchanged(ev, index)

	*/

	// handle option changes:
	_setOption: function (key, value) {
		var o = this.options;
		if (o[key] != value) {
			switch (key) {
				case "selectedIndex":
					this.activate(value);
					break;
				case "disabled":
					if (value) {
						this.element.addClass("ui-state-disabled");
					} else {
						this.element.removeClass("ui-state-disabled");
					}
					break;
				case "event":
					this._unbindLiveEvents();
					this.options.event = value;
					this._bindLiveEvents();
					break;
				case "header":
					this._handleHeaderChange(value, o.header);
					break;
				case "animated":
					break;
				case "expandDirection":
					this._handleExpandDirectionChange(value, true, o.expandDirection);
					break;
				default:
					break;
			}
		}
		$.Widget.prototype._setOption.apply(this, arguments);
	},

	_handleHeaderChange: function (newHeaderSelector, prevHeaderSelector) {
		var prevHeaders = this.element.find(prevHeaderSelector);
		prevHeaders.removeClass("ui-accordion-header ui-helper-reset ui-state-active " + this._triangleIconOpened).siblings(".ui-accordion-content").removeClass("ui-accordion-content ui-helper-reset ui-widget-content ui-accordion-content-active");
		this._initHeaders(newHeaderSelector);
	},
	_initHeaders: function (selector) {
		var o = this.options;
		selector = selector == null ? o.header : selector;
		this.headers = this.element.find(selector);
		this.headers.each(jQuery.proxy(this._initHeader, this));
	},
	_initHeader: function (index, elem) {
		var o = this.options;
		var rightToLeft = this.element.data("rightToLeft");
		var header = $(elem);
		var content = $(rightToLeft ? header.prev()[0] : header.next()[0]);
		if (rightToLeft) {
			content.remove();
			content.appendBefore(header);
		}
		header.addClass("ui-accordion-header ui-helper-reset");
		if (header.find("> a").length == 0) {
			header.wrapInner('<a href="#"></a>');
		}
		if (header.find("> .ui-icon").length == 0) {
			$('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
		}
		if (index == o.selectedIndex) {
			header.addClass("ui-state-active").addClass(this._headerCornerOpened).find("> .ui-icon").addClass(this._triangleIconOpened);
			content.addClass("ui-accordion-content-active").addClass(this._contentCornerOpened);
		} else {
			header.addClass("ui-state-default ui-corner-all").find("> .ui-icon").addClass(this._triangleIconClosed);
			content.hide();
		}
		content.addClass("ui-accordion-content ui-helper-reset ui-widget-content");

	},
	// widget creation:    
	_create: function () {
		this.element.addClass("ui-wijaccordion ui-accordion ui-widget ui-helper-reset ui-accordion-icons");
		var o = this.options;
		if (o.disabled) {
			this.element.addClass("ui-state-disabled");
		}
		this._handleExpandDirectionChange(o.expandDirection, false);
		this._initHeaders();
	},
	// widget initializtion:
	_init: function () {
		__wijReadOptionEvents(["beforeselectedindexchanged", "selectedindexchanged"], this);
		//$(".ui-accordion-header", this.element).bind(this.options.event, jQuery.proxy(this._onHeaderClick, this));
		// better use live.
		this._bindLiveEvents();
	},

	destroy: function () {
		this._unbindLiveEvents();
		this.element
			.removeClass("ui-wijaccordion ui-accordion ui-widget ui-helper-reset ui-accordion-icons")
			.removeAttr("role");
		//.removeData('wijaccordion');
		$.Widget.prototype.destroy.apply(this, arguments);

	},

	/*****************************
	Widget specific implementation
	******************************/

	/// <summary>
	/// Activates the accordion content pane by its index.
	/// </summary>
	/// <param name="index" type="Number">Index of the accordion pane to be activated.</param>
	activate: function (index) {
		var nextHeader;
		var headers = this.element.children(".ui-accordion-header");
		if (typeof index == "number") {
			nextHeader = $(headers[index]);
		} else if (typeof index == "string") {
			index = parseInt(index);
			nextHeader = $(headers[index]);
		} else {
			nextHeader = $(index);
			index = headers.index(index);
		}
		var o = this.options;

		var prevHeader = this.element.find(".ui-accordion-header.ui-state-active");

		if (nextHeader.hasClass("ui-state-active")) {
			if (o.requireOpenedPane) {
				return false;
			}
			prevHeader = nextHeader;
			nextHeader = $(null);
		}
		else if (!o.requireOpenedPane) {
			prevHeader = $(null);
		}
		var rightToLeft = this.element.data("rightToLeft");


		var newIndex = nextHeader.index(".ui-accordion-header");
		var prevIndex = prevHeader.index(".ui-accordion-header");


		var nextContent = rightToLeft ? nextHeader.prev(".ui-accordion-content") : nextHeader.next(".ui-accordion-content");
		var prevContent = rightToLeft ? prevHeader.prev(".ui-accordion-content") : prevHeader.next(".ui-accordion-content");
		if (prevHeader.length == 0 && nextHeader.length == 0) {
			return false;
		}
		var ev = jQuery.Event("beforeselectedindexchanged");
		this.element.trigger(ev, [newIndex, prevIndex]);
		if (ev.isImmediatePropagationStopped()) {
			return false;
		}

		prevHeader.removeClass("ui-state-active").removeClass(this._headerCornerOpened).addClass("ui-state-default ui-corner-all").find("> .ui-icon").removeClass(this._triangleIconOpened).addClass(this._triangleIconClosed);
		nextHeader.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active").addClass(this._headerCornerOpened).find("> .ui-icon").removeClass(this._triangleIconClosed).addClass(this._triangleIconOpened);

		if (o.animated) {
			var animOptions = {
				toShow: nextContent,
				toHide: prevContent,
				complete: jQuery.proxy(function () {
					prevContent.removeClass("ui-accordion-content-active");
					nextContent.addClass("ui-accordion-content-active");
					prevContent.css('display', '');
					nextContent.css('display', '');
					var newEv = jQuery.Event("selectedindexchanged");
					this.element.trigger(newEv, newIndex);
				}, this),
				horizontal: this.element.hasClass("ui-helper-horizontal"),
				rightToLeft: this.element.data("rightToLeft"),
				down: (newIndex > prevIndex),
				autoHeight: o.autoHeight || o.fillSpace
			};


			var proxied = o.animated;
			var proxiedDuration = o.duration;
			if ($.isFunction(proxied)) {
				o.animated = proxied(animOptions);
			}
			if ($.isFunction(proxiedDuration)) {
				o.duration = proxiedDuration(animOptions);
			}

			var animations = $.ui.wijaccordion.animations,
				duration = o.duration,
				easing = o.animated;

			if (easing && !animations[easing] && !$.easing[easing]) {
				easing = 'slide';
			}

			if (!animations[easing]) {
				animations[easing] = function (options) {
					this.slide(options, {
						easing: easing,
						duration: duration || 700
					});
				};
			}
			animations[easing](animOptions);
		} else {
			if (prevHeader.length > 0) {
				prevContent.hide().removeClass("ui-accordion-content-active"); //.removeClass(this._contentCornerOpened);
			}
			if (nextHeader.length > 0) {
				nextContent.show().addClass("ui-accordion-content-active").addClass(this._contentCornerOpened);
			}
			var newEv = jQuery.Event("selectedindexchanged");
			this.element.trigger(newEv, newIndex);
		}
		this.options.selectedIndex = newIndex;
	},

	/** Private methods */
	_bindLiveEvents: function () {
		//$('.ui-accordion-header', this.element[0]).live(value, jQuery.proxy(this._onHeaderClick, this));
		this.element.find('.ui-accordion-header')
			.live(this.options.event + ".wijaccordion", jQuery.proxy(this._onHeaderClick, this))
			.live("mouseenter.wijaccordion", function () { $(this).addClass('ui-state-hover'); })
			.live("mouseleave.wijaccordion", function () { $(this).removeClass('ui-state-hover'); })
			.live("focus.wijaccordion", function () { $(this).addClass('ui-state-focus'); })
			.live("blur.wijaccordion", function () { $(this).removeClass('ui-state-focus'); });
	},
	_unbindLiveEvents: function () {
		this.element.find('.ui-accordion-header').die("wijaccordion"); //".wijaccordion" //
	},
	_onHeaderClick: function (e) {
		this.activate(e.currentTarget);
		return false; /* return false in order to prevent page scrolling to the top because of anchor with empty url hash "#" */
	},
	_handleExpandDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
		var rightToLeft;
		var openedHeaders;
		var openedContents;
		var openedTriangles;
		var closedTriangles;
		if (allowDOMChange) {
			openedHeaders = this.element.find(".ui-accordion-header." + this._headerCornerOpened);
			openedHeaders.removeClass(this._headerCornerOpened);
			openedContents = this.element.find(".ui-accordion-content." + this._contentCornerOpened);
			openedContents.removeClass(this._contentCornerOpened);
			openedTriangles = this.element.find("." + this._triangleIconOpened);
			closedTriangles = this.element.find("." + this._triangleIconClosed);
			openedTriangles.removeClass(this._triangleIconOpened);
			closedTriangles.removeClass(this._triangleIconClosed);
		}
		if (prevDirection != null) {
			this.element.removeClass("ui-accordion-" + prevDirection);
		}
		switch (newDirection) {
			case "top":
				this._headerCornerOpened = "ui-corner-bottom";
				this._contentCornerOpened = "ui-corner-top";
				this._triangleIconOpened = "ui-icon-triangle-1-n";
				this._triangleIconClosed = "ui-icon-triangle-1-e";
				rightToLeft = true;
				this.element.removeClass("ui-helper-horizontal");
				this.element.addClass("ui-accordion-top");
				break;
			case "right":
				this._headerCornerOpened = "ui-corner-left";
				this._contentCornerOpened = "ui-corner-right";
				this._triangleIconOpened = "ui-icon-triangle-1-e";
				this._triangleIconClosed = "ui-icon-triangle-1-s";
				rightToLeft = false;
				this.element.addClass("ui-helper-horizontal");
				this.element.addClass("ui-accordion-right");
				break;
			case "left":
				this._headerCornerOpened = "ui-corner-right";
				this._contentCornerOpened = "ui-corner-left";
				this._triangleIconOpened = "ui-icon-triangle-1-w";
				this._triangleIconClosed = "ui-icon-triangle-1-s";
				rightToLeft = true;
				this.element.addClass("ui-helper-horizontal");
				this.element.addClass("ui-accordion-left");
				break;
			default: //bottom
				this._headerCornerOpened = "ui-corner-top";
				this._contentCornerOpened = "ui-corner-bottom";
				this._triangleIconOpened = "ui-icon-triangle-1-s";
				this._triangleIconClosed = "ui-icon-triangle-1-e";
				rightToLeft = false;
				this.element.removeClass("ui-helper-horizontal");
				this.element.addClass("ui-accordion-bottom");
				break;
		}
		var prevIsRightToLeft = this.element.data("rightToLeft");
		this.element.data("rightToLeft", rightToLeft);

		if (allowDOMChange) {
			openedTriangles.addClass(this._triangleIconOpened);
			closedTriangles.addClass(this._triangleIconClosed);
			openedHeaders.addClass(this._headerCornerOpened);
			openedContents.addClass(this._contentCornerOpened);
		}

		if (allowDOMChange && rightToLeft != prevIsRightToLeft) {
			this.element.children(".ui-accordion-header").each(function () {
				var header = $(this);
				var content;
				if (rightToLeft) {
					content = header.next(".ui-accordion-content");
					header.remove();
					header.insertAfter(content);
				} else {
					content = header.prev(".ui-accordion-content")
					header.remove();
					header.insertBefore(content);
				}
			});
		}

	}
});


$.extend($.ui.wijaccordion, {
	animations: {
		slide: function (options, additions) {
			options = $.extend({
				easing: "swing",
				duration: 300
			}, options, additions);            
			if (!options.toHide.size()) {
				options.toShow.stop(true, true).animate(options.horizontal ? { width: "show"} : { height: "show" }, options);
				return;
			}
			if (!options.toShow.size()) {
				options.toHide.stop(true, true).animate(options.horizontal ? { width: "hide"} : { height: "hide" }, options);
				return;
			}
			var overflow = options.toShow.css('overflow'),
				percentDone = 0,
				showProps = {},
				hideProps = {},
				fxAttrs = options.horizontal ? ["width", "paddingLeft", "paddingRight"] : ["height", "paddingTop", "paddingBottom"],
				originalWidth;
			// fix width/height before calculating height/width of hidden element
			var s = options.toShow;
			if (options.horizontal) {
				originalWidth = s[0].style.height;
				s.height(parseInt(s.parent().height(), 10) - parseInt(s.css("paddingTop"), 10) - parseInt(s.css("paddingBottom"), 10) - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0));
			} else {
				originalWidth = s[0].style.width;
				s.width(parseInt(s.parent().width(), 10) - parseInt(s.css("paddingLeft"), 10) - parseInt(s.css("paddingRight"), 10) - (parseInt(s.css("borderLeftWidth"), 10) || 0) - (parseInt(s.css("borderRightWidth"), 10) || 0));
			}

			$.each(fxAttrs, function (i, prop) {
				hideProps[prop] = 'hide';

				var parts = ('' + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
				showProps[prop] = {
					value: parts[1],
					unit: parts[2] || 'px'
				};
			});
			options.toShow.css(options.horizontal ? { width: 0, overflow: 'hidden'} : { height: 0, overflow: 'hidden' }).stop(true, true).show();
			options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").stop(true, true).animate(hideProps, {
				step: function (now, settings) {
					if (settings.prop == options.horizontal ? 'width' : 'height') {
						percentDone = (settings.end - settings.start === 0) ? 0 :
							(settings.now - settings.start) / (settings.end - settings.start);
					}

					options.toShow[0].style[settings.prop] =
						(percentDone * showProps[settings.prop].value) + showProps[settings.prop].unit;
				},
				duration: options.duration,
				easing: options.easing,
				complete: function () {
					if (!options.autoHeight) {
						options.toShow.css(options.horizontal ? "width" : "height", "");
					}
					options.toShow.css(options.horizontal ? "height" : "width", originalWidth);
					options.toShow.css({ overflow: overflow });
					options.complete();
				}
			});
		},
		bounceslide: function (options) {
			this.slide(options, {
				easing: options.down ? "easeOutBounce" : "swing",
				duration: options.down ? 1000 : 200
			});
		}
	}
}); 

$.widget("ui.wijaccordionpane", {

});

/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Popup widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.wijpopup.js
 *  
 */

(function ($) {

	$.fn.extend({
		getBounds: function () {
			return $.extend({}, $(this).offset(), { width: $(this).outerWidth(true), height: $(this).outerHeight(true) });
		},
	
		setBounds: function (bounds) {
			$(this).css({'left': bounds.left, 'top': bounds.top})
				.width(bounds.width)
				.height(bounds.height);
			return this;
		},
		
		getMaxZIndex: function () {
			var max = (($(this).css('z-index') == 'auto') ? 0 : $(this).css('z-index')) * 1;
			$(this).siblings().each(function (i, e) {
				max = Math.max(max, (($(e).css('z-index') == 'auto') ? 0 : $(e).css('z-index')) * 1);
			});
			return max;
		}
	});


    $.widget("ui.wijpopup", {
        options: {
            ///	<summary>
            ///     Determines if the element's parent element is the outermost element. 
			///		If true, the element's parent element will be changed to the body or outermost form element.
            ///	</summary>
            ensureOutermost: false,
            ///	<summary>
            ///     Specifies the effect to be used when the popup is shown.
			///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
            ///	</summary>
            showEffect: 'show',
            ///	<summary>
            ///     Specified the object/hash including specific options for the show effect.
            ///	</summary>
            showOptions: {},
            ///	<summary>
            ///     Defines how long (in milliseconds) the animation duration for showing the popup will last.
            ///	</summary>
            showDuration: 300,
            ///	<summary>
            ///     Specifies the effect to be used when the popup is hidden.
			///		Possible values: 'blind', 'clip', 'drop', 'fade', 'fold', 'slide', 'pulsate'.
            ///	</summary>
            hideEffect: 'hide',
            ///	<summary>
            ///     Specified the object/hash including specific options for the hide effect.
            ///	</summary>
            hideOptions: {},
            ///	<summary>
            ///     Defines how long (in milliseconds) the animation duration for hiding the popup will last.
            ///	</summary>
            hideDuration: 100,
            ///	<summary>
            ///     Determines whether to automatically hide the popup when clicking outside the element.
            ///	</summary>
            autoHide: false,
            ///	<summary>
            ///     Options for positioning the element, please see jquery.ui.position for possible options.
            ///	</summary>
			position:{
				at: 'left bottom',
				my: 'left top'
			}
        },

        _create: function () {
        },

        _init: function () {
            if (!!this.options.ensureOutermost) {
                var root = $('form');
                if (root.length === 0) root = $(document.body);
                this.element.appendTo(root);
            }

            this.element.data('visible.wijpopup', false);
            this.element.css('position', "absolute");
			this.element.position({
				of: $(document.body)
			});
            this.element.hide();
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);

            switch (key) {
                case "autoHide":
                    var visible = this.isVisible();
                    this.hide();
                    if (visible) this.show();
                    break;
            }
        },

        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
            if (this.isVisible()) this.hide();
			
			if ($.browser.msie && ($.browser.version < 7)) {
			    jFrame = this.element.data('backframe.wijpopup');
                if (!jFrame) jFrame.remove();
			}
			
			var self = this;
			this.element.unbind('.wijpopup');
			$.each( [ "visible", "backframe", "animating", "width" ], function( i, prefix ) {
				self.element.removeData( prefix + ".wijpopup" );
			});
        },

        isVisible: function () {
			/// <summary>Determines whether the element is visible.</summary>
            return (!!this.element.data('visible.wijpopup') && this.element.is(':visible'));
        },
		
		isAnimating: function(){
		    return !!this.element.data("animating.wijpopup");
		},

        show: function (position) {
			/// <summary>Popups the element.  Position is an optional argument, it is the options object used in jquery.ui.position.</summary>
            this._setPosition(position);
            if (this.isVisible()) return;
			
			var data = {cancel: false};
			this._trigger('showing', data);
            if (data.cancel) return;

            if (this.options.autoHide) {
                $(document.body).bind('mouseup.wijpopup', $.proxy(this._onDocMouseUp, this));
            }

            var effect = this.options.showEffect || "show";
            var duration = this.options.showDuration || 300;
            var ops = this.options.showOptions || {};

            this.element.data("animating.wijpopup", true);

            if ($.effects && $.effects[effect])
                this.element.show(effect, ops, duration, $.proxy(this._showCompleted, this));
            else
                this.element[effect]((effect === 'show' ? null : duration), $.proxy(this._showCompleted, this));

            if (!effect || !duration || effect === 'show' || duration <= 0)
                this._showCompleted();
        },

        _showCompleted: function () {
			this.element.removeData("animating.wijpopup");
			this.element.data('visible.wijpopup', true);
			this._trigger('shown');
        },

        showAt: function (x, y) {
			/// <summary>Popups the element at specified absolute position related to document.</summary>
            this.show({
				my: 'left top',
				at: 'left top',
				of: document.body,
				offset: '' + x + ' ' + y
			});
        },

        hide: function () {
			/// <summary>Hides the element.</summary>
            if (!this.isVisible()) return;
			
			var data = {cancel: false};
			this._trigger('hidding', data);
            if (data.cancel) return;

			$(document.body).unbind('mouseup.wijpopup');
            var effect = this.options.hideEffect || "hide";
            var duration = this.options.hideDuration || 300;
            var ops = this.options.hideOptions || {};

            this.element.data("animating.wijpopup", true);
            if ($.effects && $.effects[effect])
                this.element.hide(effect, ops, duration, $.proxy(this._hideCompleted, this));
            else
                this.element[effect]((effect === 'hide' ? null : duration), $.proxy(this._hideCompleted, this));

            if (!effect || !duration || effect === 'hide' || duration <= 0)
                this._hideCompleted();
        },

        _hideCompleted: function () {
            if (this.element.data('width.wijpopup') !== undefined) {
                this.element.width(this.element.data('width.wijpopup'));
                this.element.removeData('width.wijpopup');
            }

            this.element.unbind('move.wijpopup');
            this.element.removeData("animating.wijpopup");
			
			if ($.browser.msie && ($.browser.version < 7)) {
			    var jFrame = this.element.data('backframe.wijpopup');
                if (jFrame) { jFrame.hide(); }
			}
            
			this._trigger('hidden');
        },

        _onDocMouseUp: function (e) {
            var srcElement = e.target ? e.target : e.srcElement;
            if (this.isVisible() && !!this.options.autoHide) {
                if (srcElement != this.element.get(0) && $(srcElement).parents().index(this.element) < 0) this.hide();
            }
        },

        _onMove: function (e) {
            var jFrame = this.element.data('backframe.wijpopup');
            if (jFrame) {
                this.element.before(jFrame);
                jFrame.css({'top': this.element.css('top'),
					'left': this.element.css('left')
				});
            }
        },

        _addBackgroundIFrame: function () {
            if ($.browser.msie && ($.browser.version < 7)) {
                var jFrame = this.element.data('backframe.wijpopup');
                if (!jFrame) {
                    jFrame = jQuery('<iframe/>')
						.css({'position': 'absolute', 
							'display': 'none',
							'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
						}).attr({'src': 'javascript:\'<html></html>\';',
							'scrolling': 'no',
							'frameborder': '0',
							'tabIndex ': -1
						});
                    
                    this.element.before(jFrame);
                    this.element.data('backframe.wijpopup', jFrame);
                    this.element.bind('move.wijpopup', $.proxy(this._onMove, this));
                }
                jFrame.setBounds(this.element.getBounds());
				document.title = this.element.css('display');
                jFrame.css({'display': 'block',
					'left': this.element.css('left'),
					'top': this.element.css('top'),
					'z-index': this.element.css('z-index') - 1
				});
            }
        },

        _setZIndex: function (index) {
            this.element.css('z-index', index);
            var jFrame = this.element.data('backframe.wijpopup');
            if (jFrame) {
                jFrame.css('z-index', (this.element.css('z-index')) - 1);
            }
        },
		
        _setPosition: function (position) {
			var visible = this.element.is(':visible');
			this.element.show();
			this.element.position($.extend({}, this.options.position, position ? position : {}));
			if (!visible) this.element.hide();

            this._addBackgroundIFrame();
            var zIndex = 1000;
            if (this.options.position.of) {
                zIndex = Math.max(zIndex, $(this.options.position.of).getMaxZIndex());
            }

            this._setZIndex(zIndex + 10);
			this._trigger('posChanged');
        }
    });
   
})(jQuery);/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo SuperPanel widget.
 * 
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.resizable.js
 *	jquery.ui.draggable.js
 *	jquery.effects.core.js
 *	jquery.mousewheel.js
 *
 */
(function($){
	var uiSuperPanelClasses = "ui-wijsuperpanel " + "ui-widget " + "ui-widget-content",
		rounderClass = "ui-corner-all",
		uiStateDisabled = "ui-state-disabled",
		uiStateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		uiStateDefault = "ui-state-default",
		scrollerHandle = "ui-wijsuperpanel-handle",
		hbarContainerCSS = "ui-wijsuperpanel-hbarcontainer",
		vbarContainerCSS = "ui-wijsuperpanel-vbarcontainer",
		innerElementHtml = 
				"<div class='ui-wijsuperpanel-statecontainer'>" +
				"<div class='ui-wijsuperpanel-contentwrapper'>" +
				"<div class='ui-wijsuperpanel-templateouterwrapper'></div>" +
				"</div>" +
				"</div>",
		hbarHtml = "<div class='ui-wijsuperpanel-hbarcontainer ui-widget-header'>" +
				"<div class='ui-wijsuperpanel-handle ui-state-default ui-corner-all'><span class='ui-icon ui-icon-grip-solid-vertical'></span></div>" +
				"<div class='ui-wijsuperpanel-hbar-buttonleft ui-state-default ui-corner-bl'><span class='ui-icon ui-icon-triangle-1-w'></span></div>" +
				"<div class='ui-wijsuperpanel-hbar-buttonright ui-state-default ui-corner-br'><span class='ui-icon ui-icon-triangle-1-e'></span></div>" +
				"</div>",
		vbarHtml = "<div class='ui-wijsuperpanel-vbarcontainer ui-widget-header'>" + 
				"<div class='ui-wijsuperpanel-handle ui-state-default ui-corner-all'><span class='ui-icon ui-icon-grip-solid-horizontal'></span></div>" +
				"<div class='ui-wijsuperpanel-vbar-buttontop ui-state-default ui-corner-tr'><span class='ui-icon ui-icon-triangle-1-n'></span></div>" +
				"<div class='ui-wijsuperpanel-vbar-buttonbottom ui-state-default ui-corner-br'><span class='ui-icon ui-icon-triangle-1-s'></span></div>" +
				"</div>",
		hButtons = "<div class='ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonleft'><span class='ui-icon ui-icon-carat-1-w'></span></div>" + 
				"<div class='ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonright'><span class='ui-icon ui-icon-carat-1-e'></span></div>",
		vButtons = "<div class='ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttontop'><span class='ui-icon ui-icon-carat-1-n'></span></div>" +
				"<div class='ui-state-default ui-wijsuperpanel-button ui-wijsuperpanel-buttonbottom'><span class='ui-icon ui-icon-carat-1-s'></span></div>";

	$.widget("ui.wijsuperpanel", {
		options: {
			/// <summary>
			/// A value determines whether wijsuperpanel can be resized.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			allowResize: false,
			/// <summary>
			/// A value determines whether wijsuperpanel to automatically refresh when content size or wijsuperpanel size are changed.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			autoRefresh: false,
			/// <summary>
			/// The animation properties of wijsuperpanel scrolling.
			/// Type: Object.
			/// </summary>
			/// <remarks>
			/// Set this options to null to disable animation.
			/// </remarks>
			animationOptions: {
				/// <summary>
				/// A value determines whether to queue animation operations.
				/// Default: false.
				/// Type: Boolean.
				/// </summary>
				queue: false,
				/// <summary>
				/// A value sets the animation duration of the scrolling animation.
				/// Default: 250.
				/// Type: Number.
				/// </summary>
				duration: 250,
				/// <summary>
				/// A value sets the animation easing of the scrolling animation.
				/// Default: undefined.
				/// Type: string.
				/// </summary>
				easing: undefined
			},
			
			/// <summary>
			/// A function gets called when thumb buttons of scrollbars dragging stops.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			dragstop: null,
			/// <summary>
			/// A function gets called after panel is painted.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			painted: null,
			/// <summary>
			/// This option contains horizontal scroller settings.
			/// </summary>
			hScroller: {
				/// <summary>
				/// A value determines the position of the horizontal scroll bar. 
				/// Default: "bottom".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "bottom" and "top".
				/// "bottom" - The horizontal scroll bar is placed at the bottom of the content area.
				/// "top" - The horizontal scroll bar is placed at the top of the content area.
				/// </remarks>
				scrollBarPosition: "bottom",
				/// <summary>
				/// A value determines the visibility of the horizontal scroll bar.
				/// Default: "auto".
				/// Type: String
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll when needed.
				/// "visible" - Scroll bar will always be visible. It"s disabled when not needed.
				/// "hidden" - Scroll bar will be hidden.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// A value determines the scroll mode of horizontal scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "scrollbar", "buttons", "buttonshover" and "edge".
				/// "scrollbar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are clicked.
				/// "buttonshover" - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, scrollMode: "scrollbar,scrollbuttons" will enable both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollbar",
				/// <summary>
				/// A value determines the horizontal scrolling position of wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// A value sets the maximum value of horizontal scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// A value sets the minimum value of horizontal scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// A value sets the large change value of horizontal scroller.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the tracks of scroll bars or presses left or right arrow keys on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll the width of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// A value sets the small change value of horizontal scroller.
				/// Default: null. 
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the arrows of scroll bars, clicks or hovers scroll buttons, presses left or right arrow keys on keyboard, and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of the width of content.
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// A value sets the minimum length, in pixel, of the horizontal scroll bar thumb button.
				/// Default: 6.
				/// Type: Number.
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// An object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// An object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				decreaseButtonPosition: null,
				/// <summary>
				/// A value sets the width of horizontal hovering edge which will trigger the horizontal scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The number specifies the value to add to smallchange or largechange when scrolling the first step(scrolling from scrollMin).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0

			},
			/// <summary>
			/// A value determins whether wijsuperpanel provides keyboard scrolling support.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			keyboardSupport: false,
			/// <summary>
			/// A value determines the time interval to call the scrolling function when doing continuous scrolling.
			/// Default: 100.
			/// Type: Number.
			/// </summary>
			keyDownInterval: 100,
			/// <summary>
			/// A value determines whether wijsuperpanel has mouse wheel support.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			/// <remarks>
			/// Mouse wheel plugin is needed to support this feature.
			/// </remarks>
			mouseWheelSupport: true,
			/// <summary>
			/// A value determines whether to fire the mouse wheel event when wijsuperpanel is scrolled to the end.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			bubbleScrollingEvent: true,
			/// <summary>
			/// Resized event handler. A function gets called when resized event is fired.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			resized: null,
			/// <summary>
			/// An option determines the behavior of resizable widget. See JQuery UI resizable options document.
			/// Type: Object.
			/// </summary>
			resizableOptions: {
				handles: "all",
				helper: "ui-widget-content ui-wijsuperpanel-helper"
			},
			/// <summary>
			/// Scrolling event handler. A function called before scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.oldValue: The scrollValue before scrolling occurs.
			/// data.newValue: The scrollValue after scrolling occurs.
			/// data.dir: The direction of the scrolling action. Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// </param>
			scrolling: null,
			/// <summary>
			/// Scrolled event handler.  A function called after scrolling occurs.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="EventObj">
			/// EventObj relates to this event.
			/// </param>
			/// <param name="data" type="Object">
			/// The data with this event.
			/// data.dir: The direction of the scrolling action. Possible values: "v"(vertical) and "h"(horizontal).
			/// data.beforePosition: The position of content before scrolling occurs.
			/// data.afterPosition: The position of content after scrolling occurs.
			/// </param>
			scrolled: null,
			/// <summary>
			/// A value determines whether to show the rounded corner of wijsuperpanel.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			showRounder: true,
			/// <summary>
			/// This option contains vertical scroller settings.
			/// </summary>
			vScroller: {
				/// <summary>
				/// A value determines the position of vertical scroll bar. 
				/// Default: "right".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "left", "right".
				/// "left" - The vertical scroll bar is placed at the left side of the content area.
				/// "right" - The vertical scroll bar is placed at the right side of the content area.
				/// </remarks>
				scrollBarPosition: "right",
				/// <summary>
				/// A value determines the visibility of the vertical scroll bar.
				/// Default.: "auto". 
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are "auto", "visible" and "hidden".
				/// "auto" - Shows the scroll bar when needed.
				/// "visible" - Scroll bar will always be visible. It"s disabled when not needed.
				/// "hidden" - Scroll bar will be shown.
				/// </remarks>
				scrollBarVisibility: "auto",
				/// <summary>
				/// A value determines the scroll mode of vertical scrolling. 
				/// Default: "scrollbar".
				/// Type: String.
				/// </summary>
				/// <remarks>
				/// Possible options are: "scrollbar", "buttons", "buttonshover" and "edge".
				/// "scrollbar" - Scroll bars are used for scrolling.
				/// "buttons" - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are clicked.
				/// "buttonshover" - Scroll buttons are used for scrolling. Scrolling occurs only when scroll buttons are hovered.
				/// "edge" - Scrolling occurs when the mouse is moving to the edge of the content area.
				/// Scroll modes can be combined with each other. 
				/// For example, vScrollMode: "scrollbar,scrollbuttons" will enable both a scrollbar and scroll buttons.
				/// </remarks>
				scrollMode: "scrollbar",
				/// <summary>
				/// A value determines the vertical scrolling position of wijsuperpanel.
				/// Default: null.
				/// Type: Number.
				/// </summary>
				scrollValue: null,
				/// <summary>
				/// A value sets the maximum value of vertical scroller.
				/// Default: 100.
				/// Type: Number.
				/// </summary>
				scrollMax: 100,
				/// <summary>
				/// A value sets the minimum value of vertical scroller.
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				scrollMin: 0,
				/// <summary>
				/// A value sets the large change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a large change when a user clicks on the tracks of scroll bars or presses left or right arrow keys on the keyboard with the shift key down.
				/// When scrollLargeChange is null, wijsuperpanel will scroll the height of content.
				/// </remarks>
				scrollLargeChange: null,
				/// <summary>
				/// A value sets the small change value of vertical scroller. 
				/// Default: null.
				/// Type: Number.
				/// </summary>
				/// <remarks>
				/// wijsuperpanel will scroll a small change when a user clicks on the arrows of scroll bars, clicks or hovers scroll buttons, presses left or right arrow keys on keyboard, and hovers on the edge of wijsuperpanel.
				/// When scrollSmallChange is null, wijsuperpanel will scroll half of the height of content.	
				/// </remarks>
				scrollSmallChange: null,
				/// <summary>
				/// A value sets the minimum length, in pixel, of the vertical scroll bar thumb button.
				/// Default: 6.
				/// Type: Number
				/// </summary>
				scrollMinDragLength: 6,
				/// <summary>
				/// An object determines the increase button position. 
				/// Default: null.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				increaseButtonPosition: null,
				/// <summary>
				/// An object determines the decrease button position.
				/// Default: 0.
				/// Type: Object.
				/// </summary>
				/// <remarks>
				/// Please look at the options for jquery.ui.position.js for more info.
				/// </remarks>
				decreaseButtonPosition: null,
				/// <summary>
				/// A value sets the width of horizontal hovering edge which will trigger the vertical scrolling.
				/// Default: 20.
				/// Type: Number.
				/// </summary>
				hoverEdgeSpan: 20,
				/// <summary>
				/// The value to add to small change or largechange when scrolling the first step(scrolling from value 0).
				/// Default: 0.
				/// Type: Number.
				/// </summary>
				firstStepChangeFix: 0
			}
		},
		
		_setOption: function(key, value){
			
			var self = this;
			var o = self.options;
			var f = self._fields();
			var hd = f.hbarDrag;
			var vd = f.vbarDrag;
			var r = f.resizer;

			// override existing 
			if (key == "animationOptions") {
				value = $.extend(o.animationOptions, value);
			}
			else if (key == "hScroller") {
				if (value.scrollLargeChange != undefined && value.scrollLargeChange != null) {
					self._autoHLarge = false;
				}
				value = $.extend(o.hScroller, value);
			}
			else if (key == "vScroller") {
				if (value.scrollLargeChange != undefined && value.scrollLargeChange != null) {
					self._autoVLarge = false;
				}
				value = $.extend(o.vScroller, value);
			}
			else if (key == "resizableOptions") {
				value = $.extend(self.resizableOptions, value);
			}
			$.Widget.prototype._setOption.apply(self, arguments);
			switch (key) {
				case "allowResize":
					self._initResizer();
					break;
				case "disabled":
					if (value) {
						if (hd != undefined) {
							hd.draggable("disable");
						}
						if (vd != undefined){
							vd.draggable("disable");
						}
						if (r!=undefined){
							r.resizable("disable");
						}
					}
					else{
						if (hd != undefined) {
							hd.draggable("enable");
						}
						if (vd != undefined){
							vd.draggable("enable");
						}
						if (r!=undefined){
							r.resizable("enable");
						}
					}
					break;
				case "mouseWheelSupport":
				case "keyboardSupport":
					self._bindElementEvents(self, f, self.element, o);
					break;
			}
			return self;
		},
		
		_create: function(){
			var self = this;
			var o = self.options;
			o.vScroller.dir = "v";
			o.hScroller.dir = "h";
			self.paintPanel();
			self._initResizer();
			if (self.options.disabled){
				self.disable();
			}
			self._detectAutoRefresh();
		},
		
		_detectAutoRefresh: function (){
			// register with auto fresh.
			var self = this;

			var panels = $.ui.wijsuperpanel.panels;
			if (panels == undefined){
				panels = [];
				$.ui.wijsuperpanel.panels = panels;
			}
			panels.push(self);
			// start timer to monitor content.
			if (self.options.autoRefresh){
				if (!$.ui.wijsuperpanel.setAutoRefreshInterval){
					$.ui.wijsuperpanel.setAutoRefreshInterval = self._setAutoRefreshInterval;
					$.ui.wijsuperpanel.setAutoRefreshInterval();
				}
			}
		},
		
		_setAutoRefreshInterval: function (){
			var interval = $.ui.wijsuperpanel.autoRereshInterval;
			var panels = $.ui.wijsuperpanel.panels;
			var intervalID = window.setInterval(function (){
				window.clearInterval(intervalID);
				var count = panels.length;
				var toContinue = false;
				for (var i=0; i<count; i++){
					var panel = panels[i];
					var mainElement = panel.element[0];
					var autoRefresh = panel.options.autoRefresh;
					if (autoRefresh){
						toContinue = true;
					}
					var ele = panel.getContentElement();
					var mark = panel._paintedMark;
					if (panel.options.autoRefresh && ele.is(":visible") &&
					(mark == undefined || 
					mark.width!= ele[0].offsetWidth || mark.height!= ele[0].offsetHeight ||
					mark.mainWidth!=mainElement.offsetWidth || mark.mainHeight!=mainElement.offsetHeight)){
						panel.paintPanel();
					}
				}
				if (toContinue){
					window.setTimeout($.ui.wijsuperpanel.setAutoRefreshInterval, 0);
				}
			}, interval == undefined ? 500 : interval);
		},
		
		destroy: function(){
			/// <summary>
			/// Destroys wijsuperpanel widget and reset the DOM element.
			/// </summary>
			
			var self = this;
			var f = self._fields();
			var ele = self.element;
			// remove this widget from panels array.
			$.ui.wijsuperpanel.panels = $.grep($.ui.wijsuperpanel.panels, function(value) {
				return value != self;
			});
			if (!f.initialized){
				return;
			}
			if (self._radiusKey){
				self.element.css(self._radiusKey,"");
			}
			if (f.intervalID != undefined) {
				window.clearInterval(f.intervalID);
				f.intervalID = undefined;
			}
			// destory widgets
			if (f.resizer != null) {
				f.resizer.resizable("destroy");
			}
			if (f.hbarContainer!= undefined){
				f.hbarDrag.remove();
				f.hbarContainer.unbind("." + self.widgetName);
			}
			if (f.vbarContainer != undefined) {
				f.vbarDrag.remove();
				f.vbarContainer.unbind("." + self.widgetName);
			}
			ele.unbind("." + self.widgetName);
			f.contentWrapper.unbind("." + self.widgetName);
			var buttons = f.stateContainer.find(">.ui-wijsuperpanel-button");
			buttons.unbind("." + self.widgetName)
			var templateWrapper = f.templateWrapper;
			templateWrapper.contents().each(function(index, e){
				ele.append(e);
			});
			f.stateContainer.remove();
			if (f.tabindex) {
				ele.removeAttr("tabindex");
			}
			ele.removeClass(uiSuperPanelClasses + " " + rounderClass);
			$.Widget.prototype.destroy.apply(self, arguments);
		},
		
		_fields: function(){
			var self = this;
			var ele = self.element;
			var key = self.widgetName + "-fields";
			var d = self._fieldsStore;
			if (d == undefined) {
				d = {};
				ele.data(key, d);
				self._fieldsStore = d;
			}
			return d;
		},
		
		_hasMode: function (scroller, mode){
			var modes = scroller.scrollMode.split(",");
			return $.inArray(mode,modes) > -1;
		},
		
		_bindElementEvents: function(self, f, ele, o){
			// mouse move only edge mode is used.
			var hEdge = self._hasMode(o.hScroller, "edge");
			var vEdge = self._hasMode(o.vScroller, "edge");
			var wn = self.widgetName;
			
			if (hEdge || vEdge){
				if (self._mousemoveBind == undefined){
					self._mousemoveBind = true;
					ele.bind("mousemove." + wn, self, self._contentMouseMove);
				}
			}
			else{
				ele.unbind("mousemove",self._contentMouseMove);
				self._mousemoveBind = undefined;
			}
			if (o.mouseWheelSupport){
				if (self._mouseWheelBind == undefined){
					self._mouseWheelBind = true;
					ele.bind("mousewheel." +wn, self, self._panelMouseWheel);
				}
			}
			else{
				self.element.unbind("mousewheel", self._panelMouseWheel);
				self._mouseWheelBind = undefined;
			}
			if (o.keyboardSupport){
				if (self._keyboardBind == undefined){
					self._keyboardBind = true;
					ele.bind("keydown." + wn, self, self._panelKeyDown);
				}
			}
			else{
				ele.unbind("keydown", self._panelKeyDown);
				self._keyboardBind = undefined;
			}
		},

		_dragStop: function(e, self, dir){
			// Handles mouse drag stop event of thumb button.
			
			var data = {
				dragHandle: dir
			};
			self._trigger("dragstop", e, data);
		},
		
		_contentMouseMove: function(e){
			// Handles mouse move event of content area.
			// Edge hover scrolling is handled in this method.
			
			var self = e.data;
			var o = self.options;
			if (o.disabled) {
				return;
			}
			var hScroller = o.hScroller;
			var vScroller = o.vScroller;
			var contentWrapper = $(e.currentTarget);
			var f = self._fields();
			var hMode = self._hasMode(hScroller, "edge");
			var vMode = self._hasMode(vScroller, "edge");
			self._clearInterval();
			var mousePagePosition = {
				X: e.pageX,
				Y: e.pageY
			};
			var off = contentWrapper.offset();
			var left = off.left;
			var top = off.top;
			left = mousePagePosition.X - left;
			top = mousePagePosition.Y - top;
			var hEdge = hScroller.hoverEdgeSpan;
			var vEdge = vScroller.hoverEdgeSpan;
			var innerHeight = contentWrapper.innerHeight();
			var innerWidth = contentWrapper.innerWidth();
			var dir = "";
			if (hMode) {
				if (left < hEdge) {
					dir = "left";
				}
				if (left > (innerWidth - hEdge)) {
					dir = "right";
				}
			}
			if (vMode) {
				if (top < vEdge) {
					dir = "top";
				}
				if (top > (innerHeight - vEdge)) {
					dir = "bottom";
				}
			}
			self._setScrollingInterval(f,dir,self, false);
		},
		
		_setScrollingInterval: function (f, dir, self, large){
			var o = self.options;
			if (dir.length>0){
				f.internalFuncID = window.setInterval(function(){
					self._doScrolling(dir, self, large);
				}, o.keyDownInterval);
			}
		},
		
		_scrollButtonMouseOver: function(e){
			// Scroll buttons mouse over event handler.
			
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.bind("mouseout." + self.widgetName, self, self._buttonMouseOut)
				.bind("mousedown." + self.widgetName, self, self._buttonMouseDown)
				.bind("mouseup." + self.widgetName, self, self._buttonMouseUp)
				.addClass(uiStateHover);
				self._buttonScroll(button, self, "buttonshover");
			}
		},
		
		_buttonScroll: function(button, self, mode){
			// Do button scroll.

			var dir = "";
			var o = self.options;
			var f = self._fields();
			var hMode = self._hasMode(o.hScroller, mode);
			var vMode = self._hasMode(o.vScroller, mode);
			
			if (button.hasClass("ui-wijsuperpanel-buttonleft") && hMode) {
				dir = "left";
			}
			else if (button.hasClass("ui-wijsuperpanel-buttonright") && hMode) {
				dir = "right";
			}
			else if (button.hasClass("ui-wijsuperpanel-buttontop") && vMode) {
				dir = "top";
			}
			else if (button.hasClass("ui-wijsuperpanel-buttonbottom") && vMode) {
				dir = "bottom";
			}
			if (dir.length > 0) {
				self._clearInterval();
				self._doScrolling(dir, self, true);
				self._setScrollingInterval(f,dir,self,true);
			}
		},
		
		_buttonMouseDown: function(e){
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var button = $(e.currentTarget);
			if (!button.hasClass(uiStateDisabled)) {
				button.addClass(uiStateActive);
				self._buttonScroll(button, self, "buttons");
			}
		},
		
		_buttonMouseUp: function(e){
			var self = e.data;
			var button = $(e.currentTarget);
			button.removeClass("ui-state-active");
			self._clearInterval();
		},
		
		_buttonMouseOut: function(e){
			var self = e.data;
			var button = $(e.currentTarget);
			button.unbind("mouseout", self._buttonMouseOut)
			.unbind("mousedown", self._buttonMouseDown)
			.unbind("mouseup", self._buttonMouseUp)
			.removeClass(uiStateHover)
			.removeClass(uiStateActive);
			self._clearInterval();
		},
		
		_panelKeyDown: function(e){
			// Key down handler.
			
			var self = e.data;
			var o = self.options;
			if (!o.keyboardSupport || o.disabled) {
				return;
			}
			var shift = e.shiftKey;
			var keycode = e.keyCode;
			if (keycode == $.ui.keyCode.LEFT) {
				self._doScrolling("left", self, shift);
			}
			else if (keycode == $.ui.keyCode.RIGHT) {
				self._doScrolling("right", self, shift);
			}
			else if (keycode == $.ui.keyCode.UP) {
				self._doScrolling("top", self, shift);
			}
			else if (keycode == $.ui.keyCode.DOWN) {
				self._doScrolling("bottom", self, shift);
			}
			e.stopPropagation();
			e.preventDefault();
		},
		
		_draggingInternal: function (self, scroller, originalElement){
			var dir = scroller.dir;
			var h = dir === "h";
			var key = h?"left": "top";
			
			var left = parseFloat(originalElement[0].style[key].replace("px", "")) - self._getScrollContainerPadding(key);
			var track = self._getTrackLen(dir) - originalElement[h?"outerWidth":"outerHeight"]();
			var proportion = left / track;
			var topValue = (scroller.scrollMax - scroller.scrollLargeChange + 1);
			var v = proportion * topValue;
			if (v < scroller.scrollMin) {
				v = scroller.scrollMin;
			}
			if (v > topValue) {
				v = topValue;
			}
			var data = {
				oldValue: scroller.scrollValue,
				newValue: v,
				dir: dir
			};
			if (!self._scrolling(true, self, data)) {
				// event is canceled in scrolling.
				return;
			}
			scroller.scrollValue = v;
			self._setDragAndContentPosition(true, false, dir, "dragging");
		},
		
		_dragging: function(e, self){
			var o = self.options;
			var originalElement = $(e.target);
			var p = originalElement.parent();
			if (p.hasClass(hbarContainerCSS)) {
				self._draggingInternal(self, o.hScroller, originalElement);
			}
			else{
				self._draggingInternal(self, o.vScroller, originalElement);
			} 
		},
		
		_panelMouseWheel: function(e, delta){
			
			
			var self = e.data;
			var o = self.options;
			if (!o.mouseWheelSupport || o.disabled) {
				return;
			}
			//var f = self._fields();
			//var scrollerWrapper = f.stateContainer;
			//var hbarContainer = f.hbarContainer;
			var originalElement = $(e.srcElement || e.originalTarget);
			var dir = "";
			var onHbar = originalElement.closest("."+hbarContainerCSS, self.element).size()>0;
			var hScroller = o.hScroller;
			var vScroller = o.vScroller;
			if (delta > 0) {
				dir =  onHbar ? "left" : "top";
			}
			else {
				dir =  onHbar ? "right" : "bottom";
			}

			if (dir.length > 0) {
				self._doScrolling(dir, self);
			}
			var scrollEnd = false;
			if (dir == "left") {
				scrollEnd = !self.hNeedScrollBar || Math.abs(hScroller.scrollValue - hScroller.scrollMin) < 0.001;
			}
			if (dir == "right") {
				scrollEnd = !self.hNeedScrollBar ||Math.abs(hScroller.scrollValue - (hScroller.scrollMax - self._getHScrollBarLargeChange() + 1)) < 0.001;
			}
			if (dir == "top") {
				scrollEnd = !self.vNeedScrollBar || Math.abs(vScroller.scrollValue - vScroller.scrollMin) < 0.001;
			}
			if (dir == "bottom") {
				scrollEnd = !self.vNeedScrollBar ||Math.abs(vScroller.scrollValue - (vScroller.scrollMax - self._getVScrollBarLargeChange() + 1)) < 0.001;
			}
			if (!scrollEnd || !o.bubbleScrollingEvent || dir == "left" || dir == "right") {
				e.stopPropagation();
				e.preventDefault();
			}
		},
		
		_documentMouseUp: function(e){
			var self = e.data.self;
			var ele = e.data.ele;
			ele.removeClass(uiStateActive);
			self._clearInterval();
			$(document).unbind("mouseup", self._documentMouseUp);
		},
		
		_scrollerMouseOver: function(e){
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var originalElement = $(e.srcElement || e.originalTarget);
			var ele = null;
			var addhover = false;
			
			if (originalElement.hasClass(uiStateDefault)) {
				ele = originalElement;
				addhover = true;
			}
			else if (originalElement.parent().hasClass(uiStateDefault)) {
				ele = originalElement.parent();
				addhover = true;
			}
			else if (originalElement.hasClass(vbarContainerCSS) || originalElement.hasClass(hbarContainerCSS)) {
				ele = originalElement;
			}
			
			if (ele != null) {
				if (addhover) {
					ele.addClass(uiStateHover);
				}
				ele.bind("mouseout." + self.widgetName, self, self._elementMouseOut);
				ele.bind("mousedown." + self.widgetName, self, self._elementMouseDown);
				ele.bind("mouseup." + self.widgetName, self, self._elementMouseUp);
			}
		},
		
		_elementMouseUp: function(e){
			var ele = $(e.currentTarget);
			//var self = e.data;
			ele.removeClass("ui-state-active");
		},
		
		_elementMouseDown: function(e){
			var ele = $(e.currentTarget);
			var self = e.data;
			if (self.options.disabled) {
				return;
			}
			var scrollDirection = "";
			var large = false;
			var active = false;
			if (ele.hasClass("ui-wijsuperpanel-vbar-buttontop")) {
				scrollDirection = "top";
				active = true;
			}
			else if (ele.hasClass("ui-wijsuperpanel-vbar-buttonbottom")) {
				scrollDirection = "bottom";
				active = true;
			}
			else if (ele.hasClass("ui-wijsuperpanel-hbar-buttonleft")) {
				scrollDirection = "left";
				active = true;
			}
			else if (ele.hasClass("ui-wijsuperpanel-hbar-buttonright")) {
				scrollDirection = "right";
				active = true;
			}
			else if (ele.hasClass(scrollerHandle)) {
				ele.addClass("ui-state-active");
				return;
			}
			else if (ele.hasClass(hbarContainerCSS)) {
				var hbarDrag = ele.find("." + scrollerHandle);
				var pos = hbarDrag.offset();
				if (e.pageX < pos.left) {
					scrollDirection = "left";
				}
				else {
					scrollDirection = "right";
				}
				large = true;
			}
			else if (ele.hasClass(vbarContainerCSS)) {
				var vbarDrag = ele.find("."+scrollerHandle);
				var pos2 = vbarDrag.offset();
				if (e.pageY < pos2.top) {
					scrollDirection = "top";
				}
				else {
					scrollDirection = "bottom";
				}
				large = true;
			}
			self._clearInterval();
			self._doScrolling(scrollDirection, self, large);
			var f = self._fields();
			self._setScrollingInterval(f, scrollDirection, self, large);
			if (active) {
				ele.addClass("ui-state-active");
			}
			$(document).bind("mouseup." + self.widgetName, {
				self: self,
				ele: ele
			}, self._documentMouseUp);
		},
		
		doScrolling: function (dir, large){
			/// <summary>
			/// Do scrolling.
			/// </summary>
			/// <param name="dir" type="string">
			///   Scrolling direction. Options are: "left", "right", "top" and "bottom".
			/// </param>
			/// <param name="large" type="Boolean">
			/// Whether to scroll a large change.
			/// </param>

			this._doScrolling(dir, this, large);
		},
		
		_setScrollerValue: function (dir,scroller, smallChange, largeChange, isAdd, isLarge,self){
			//var o = self.options;
			var vMin = scroller.scrollMin;
			var change = isLarge ? largeChange : smallChange;
			var value = scroller.scrollValue;
			if (value == null){
				value = vMin;
			}
			var t = 0;
			if (isAdd){
				var vTopValue = scroller.scrollMax - largeChange + 1;
				if (Math.abs(value - vTopValue) < 0.001) {
					self._clearInterval();
					return false;
				}
				var firstStepChangeFix = scroller.firstStepChangeFix;
				t = value + change;
				if (!isLarge && Math.abs(value - vMin) < 0.0001 && !isNaN(firstStepChangeFix)) {
					t += firstStepChangeFix;
				}
				if (t > vTopValue) {
					t = vTopValue;
				}
			}
			else{
				if (Math.abs(value - vMin) < 0.001) {
					self._clearInterval();
					return false;
				}
				t = value - change;
				if (t < 0) {
					t = vMin;
				}
			}
			var data = {
				oldValue: scroller.scrollValue,
				newValue: t,
				direction: dir,
				dir: scroller.dir
			};
			if (!self._scrolling(true, self, data)){
				return false
			}
			scroller.scrollValue = t;
			return true;
		},
		
		_doScrolling: function(dir, self, large){
			// Does wijsuperpanel scrolling.
			// <param name="dir" type="String">
			// Scroll direction. 
			// Options are: "left", "right", "top" and "bottom".
			// </param>
			// <param name="self" type="jQuery">
			// Pointer to the wijsuperpanel widget instance.
			// </param>
			// <param name="large" type="Boolean">
			// Whether to scroll a large change.
			// </param>
			
			var o = self.options;
			var vScroller = o.vScroller;
			var hScroller = o.hScroller;
			var vSmall = self._getVScrollBarSmallChange();
			var vLarge = self._getVScrollBarLargeChange();
			var hLarge = self._getHScrollBarLargeChange();
			var hSmall = self._getHScrollBarSmallChange();

			if (dir == "top" || dir == "bottom") {
				if (!self._setScrollerValue(dir, vScroller, vSmall, vLarge, dir == "bottom", large,self)){
					return;
				}
				dir = "v";
			}
			else if (dir == "left" || dir == "right") {
				if (!self._setScrollerValue(dir, hScroller, hSmall, hLarge, dir == "right", large,self)){
					return;
				}
				dir = "h";
			}
			self._setDragAndContentPosition(true, true, dir);
		},
		
		_disableButtonIfNeeded: function(self){
			// Disables scrolling buttons.
			
			var f = self._fields();
			if (f.intervalID>0){
				window.clearInterval(f.intervalID);
			}
			var o = self.options;
			var buttonLeft = f.buttonLeft;
			var buttonRight = f.buttonRight;
			var buttonTop = f.buttonTop;
			var buttonBottom = f.buttonBottom;
			
			if (buttonLeft != undefined){
				var hLargeChange = self._getHScrollBarLargeChange();
				
				var hMax = o.hScroller.scrollMax - hLargeChange + 1;
				var hValue = o.hScroller.scrollValue;
				var hScrollMin = o.hScroller.scrollMin;
				
				if (hValue == undefined) {
					hValue = hScrollMin;
				}
				if (Math.abs(hValue - hScrollMin) < 0.001 || !f.hScrolling) {
					buttonLeft.addClass(uiStateDisabled);
				}
				else {
					buttonLeft.removeClass(uiStateDisabled);
				}
				if (Math.abs(hValue - hMax) < 0.001 || !f.hScrolling) {
					buttonRight.addClass(uiStateDisabled);
				}
				else {
					buttonRight.removeClass(uiStateDisabled);
				}
			}
			if (buttonTop!=undefined){
				var vLargeChange = self._getVScrollBarLargeChange();
				var vMax = o.vScroller.scrollMax - vLargeChange + 1;
				var vValue = o.vScroller.scrollValue;
				var vScrollMin = o.vScroller.scrollMin;
				if (vValue == undefined) {
					vValue = vScrollMin;
				}
				if (Math.abs(vValue - vScrollMin) < 0.001 || !f.vScrolling) {
					buttonTop.addClass(uiStateDisabled);
				}
				else {
					buttonTop.removeClass(uiStateDisabled);
				}
				if (Math.abs(vValue - vMax) < 0.001 || !f.vScrolling) {
					buttonBottom.addClass(uiStateDisabled);
				}
				else {
					buttonBottom.removeClass(uiStateDisabled);
				}
			}
		},
		
		_clearInterval: function(){
			var f = this._fields();
			var intervalID = f.internalFuncID;
			if (intervalID > 0) {
				window.clearInterval(intervalID);
				f.internalFuncID = -1;
			}
		},
		
		_elementMouseOut: function(event){
			var ele = $(event.currentTarget);
			var self = event.data;
			
			ele.unbind("mouseout", self._elementMouseOut);
			ele.unbind("mousedown", self._elementMouseDown);
			ele.unbind("mouseup", self._elementMouseUp);
			
			ele.removeClass(uiStateHover);
		},
		
		scrollChildIntoView: function(child1){
			/// <summary>
			/// Scroll children DOM element to view. 
			/// </summary>
			/// <param name="child" type="DOMElement/JQueryObj">
			/// The child to scroll to.
			/// </param>

			var child = $(child1);
			
			if (child.size() == 0) {
				return;
			}
			var f = this._fields();
			var cWrapper = f.contentWrapper;
			var tempWrapper = f.templateWrapper;
			var left, top;
			var childOffset = child.offset();
			var templateOffset = tempWrapper.offset();
			
			childOffset.leftWidth = childOffset.left + child.outerWidth();
			childOffset.topHeight = childOffset.top + child.outerHeight();
			var cWrapperOffset = cWrapper.offset();
			cWrapperOffset.leftWidth = cWrapperOffset.left + cWrapper.outerWidth();
			cWrapperOffset.topHeight = cWrapperOffset.top + cWrapper.outerHeight();
			
			if (childOffset.left < cWrapperOffset.left) {
				left = childOffset.left - templateOffset.left;
			}
			else 
				if (childOffset.leftWidth > cWrapperOffset.leftWidth) {
					left = childOffset.leftWidth - templateOffset.left - cWrapper.innerWidth();
				}
			if (childOffset.top < cWrapperOffset.top) {
				top = childOffset.top - templateOffset.top;
			}
			else 
				if (childOffset.topHeight > cWrapperOffset.topHeight) {
					top = childOffset.topHeight - templateOffset.top - cWrapper.innerHeight();
				}
			if (left != undefined) {
				this.hScrollTo(left);
			}
			if (top != undefined) {
				this.vScrollTo(top);
			}
		},
		
		hScrollTo: function(x){
			/// <summary>
			/// Scroll to horizontal position.
			/// </summary>
			/// <param name="x" type="Number">
			/// The position to scroll to.
			/// </param>
			var o = this.options;
			//var f = this._fields();
			o.hScroller.scrollValue = this.scrollPxToValue(x, "h");
			this._setDragAndContentPosition(false, true, "h", "nonestop");
		},
		
		vScrollTo: function(y){
			/// <summary>
			/// Scroll to vertical position.
			/// </summary>
			/// <param name="y" type="Number">
			/// The position to scroll to.
			/// </param>

			var o = this.options;
			o.vScroller.scrollValue = this.scrollPxToValue(y, "v");
			this._setDragAndContentPosition(false, true, "v", "nonestop");
		},
		
		scrollPxToValue: function(px, dir){
			/// <summary>
			/// Convert pixel to scroll value.
			/// For example, wijsuperpanel scrolled 50px which is value 1 after conversion.
			/// </summary>
			/// <param name="px" type="Number">
			/// Length of scrolling.
			/// </param>
			/// <param name="dir" type="String">
			/// Scrolling direction. Options are: "h" and "v".
			/// </param>
			
			var o = this.options;
			var m = (dir == "h" ? "outerWidth" : "outerHeight");
			var m1 = (dir == "h" ? "contentWidth" : "contentHeight");
			var scroller = (dir == "h" ? "hScroller" : "vScroller");
			var f = this._fields();
			var cWrapper = f.contentWrapper;
			//var tempWrapper = f.templateWrapper;
			var size = f[m1];
			var contentHeight = cWrapper[m]();
			
			var vMin = o[scroller].scrollMin;
			var vMax = o[scroller].scrollMax;
			var vRange = vMax - vMin;
			var vLargeChange = (dir == "h" ? this._getHScrollBarLargeChange() : this._getVScrollBarLargeChange());
			var maxv = vRange - vLargeChange + 1;
			var ret = maxv * (px / (size - contentHeight))
			if (ret < vMin) {
				ret = vMin;
			}
			if (ret > maxv) {
				ret = maxv;
			}
			return ret;
		},
		
		scrollTo: function(x, y){
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <param name="x" type="Number">
			/// Horizontal position to scroll to.	
			/// </param>
			/// <param name="y" type="Number">
			/// Vertical position to scroll to.
			/// </param>
			
			this.hScrollTo(x);
			this.vScrollTo(y);
		},
		
		paintPanel: function(){
			/// <summary>
			/// Refreshes wijsuperpanel. 
			/// Needs to be called after content being changed.
			/// </summary>
			/// <returns type="Boolean">
			/// Returns true if painting is successful, else returns false. 
			/// </returns>
			var self = this;
			var ele = self.element;
			if (ele.is(":visible")) {
				var focused = document.activeElement;
				var o = self.options;
				var f = self._fields();
				if (!f.initialized){
					self._initialize(f,ele,self);
				}
				self._resetLargeChange(self,f,o);
				self._bindElementEvents(self,f, ele, o);
				var templateWrapper = f.templateWrapper;
				templateWrapper.css({ "float":"left",left:"0px",top:"0px",width:"auto",height:"auto"});
				f.contentWidth = templateWrapper.width();
				f.contentHeight = templateWrapper.height();
				templateWrapper.css("float","");
				self._setRounder(self, ele);
				self._setInnerElementsSize(f, ele);
				self._testScroll(self, f, o);
				self._initScrollBars(self, f, o);
				self._initScrollButtons(self, f, o);
				self._trigger("painted");
				
				self._paintedMark = {date: new Date(), mainWidth:ele[0].offsetWidth, mainHeight:ele[0].offsetHeight, width: f.contentWidth,height: f.contentWidth};
				if (focused!=undefined){
					$(focused).focus();
				}
				return true;
			}
			return false;
		},
		
		_resetLargeChange: function (self,f,o){
			if (self._autoVLarge) {
				o.vScroller.scrollLargeChange = null;
			}
			if (self._autoHLarge) {
				o.hScroller.scrollLargeChange = null;
			}
			f.vTrackLen = undefined;
			f.hTrackLen = undefined;
			if (f.vbarContainer){
				f.vbarContainer.remove();
				f.vbarContainer = undefined;
			}
			if (f.hbarContainer){
				f.hbarContainer.remove();
				f.hbarContainer = undefined;
			}
		},
		
		_initialize: function(f,ele,self){
			f.initialized = true;
			// ensure width and height
			ele.addClass(uiSuperPanelClasses);
			f.oldHeight = ele.css("height");
				var old = ele.css("overflow");
				ele.css("overflow","");
				// set height to element
				ele.height(ele.height());
				ele.css("overflow",old);
			
			self._createAdditionalDom(self,f,ele);
		},
		
		getContentElement: function(){
			/// <summary>
			/// Gets the content element of wijsuperpanel.
			/// </summary>
			/// <returns type="JQueryObj" />

			return this._fields().templateWrapper;
		},
		
		_setButtonPosition: function (self,o, scroller, dir, target,f,state){
			var h = dir == "h";
			var mouseoverkey = "mouseover." + self.widgetName;
			var decKey = h?"buttonLeft":"buttonTop";
			var incKey = h?"buttonRight":"buttonBottom";
			var decButton = f[decKey];
			var incButton = f[incKey];
			if (self._hasMode(scroller, "buttons") || self._hasMode(scroller, "buttonshover")) {
				
				var html = h ? hButtons: vButtons;
				if (decButton == undefined){
					var buttons = $(html).appendTo(state);
					buttons.bind(mouseoverkey, self, self._scrollButtonMouseOver);
					f[decKey] = decButton = state.children(h? ".ui-wijsuperpanel-buttonleft":".ui-wijsuperpanel-buttontop");
					f[incKey] = incButton = state.children(h?".ui-wijsuperpanel-buttonright":".ui-wijsuperpanel-buttonbottom");
				}
				var defaultPosition = {
					my: h? "left" : "top",
					of: target,
					at: h? "left" : "top"
				};
				$.extend(defaultPosition, scroller.decreaseButtonPosition);
				decButton.position(defaultPosition);
				defaultPosition = {
					my: h? "right" : "bottom",
					of: target,
					at: h? "right" : "bottom"
				};
				$.extend(defaultPosition, scroller.increaseButtonPosition);
				incButton.position(defaultPosition);
			}
			else if (decButton != undefined){
				decButton.remove();
				incButton.remove();
				f[decKey] = f[incKey] = undefined;
			}
		},
		
		_initScrollButtons: function(self, f, o){
			var a = f.contentWrapper;
			var state = f.stateContainer;
			self._setButtonPosition(self, o, o.hScroller, "h", a,f,state);
			self._setButtonPosition(self, o, o.vScroller, "v", a,f,state);
		},
		
		_getVScrollBarSmallChange: function(){
			var o = this.options;
			if (o.vScroller.scrollSmallChange == null) {
				var va = this._getVScrollBarLargeChange();
				o.vScroller.scrollSmallChange = va / 2;
			}
			return o.vScroller.scrollSmallChange;
		},
		
		_getVScrollBarLargeChange: function(){
			return this._getLargeChange("v");
		},
		
		_getLargeChange: function (dir){
			var self = this;
			var o = self.options;
			var f = self._fields();
			var v = dir == "v";
			var scroller = v ? o.vScroller: o.hScroller;
			var clientKey = v? "clientHeight":"clientWidth";
			var offsetKey = v? "contentHeight":"contentWidth";
			var autoKey = v? "_autoVLarge":"_autoHLarge";
			
			if (scroller.scrollLargeChange != null) {
				return scroller.scrollLargeChange;
			}
			
			// calculate large change if empty
			var hMax = scroller.scrollMax;
			var hMin = scroller.scrollMin;
			var hRange = hMax - hMin;
			
			var content = f.contentWrapper;
			var contentWidth = content[0][clientKey];
			var wrapperWidth = f[offsetKey];
			
			var percent = contentWidth / (wrapperWidth - contentWidth);
			var large = ((hRange+1)*percent) / (1+ percent);
			if (isNaN(large)){
				large = 0;
			}
			scroller.scrollLargeChange = large;
			
			self[autoKey] = true;
			return scroller.scrollLargeChange;
		},
		
		_getHScrollBarSmallChange: function(){
			var o = this.options;
			if (o.hScroller.scrollSmallChange == null) {
				var va = this._getHScrollBarLargeChange();
				o.hScroller.scrollSmallChange = va / 2;
			}
			return o.hScroller.scrollSmallChange;
		},
		
		_getHScrollBarLargeChange: function(){
			return this._getLargeChange("h");
		},
		
		_initScrollBars: function(self,f,o){
			// Set scroll bar initial position.
			var hScroller = o.hScroller; 
			var hMax = hScroller.scrollMax;
			var hMin = hScroller.scrollMin;
			var hRange = hMax - hMin;
			
			var vScroller = o.vScroller; 
			var vMax = vScroller.scrollMax;
			var vMin = vScroller.scrollMin;
			var vRange = vMax - vMin;
			
			var hbarDrag = f.hbarDrag;
			var vbarDrag = f.vbarDrag;
			if (self.hNeedScrollBar && hbarDrag.is(":visible")) {
				var hLargeChange = self._getHScrollBarLargeChange();
				var track = self._getTrackLen("h");
				var dragLen = self._getDragLength(hRange, hLargeChange, track, o.hScroller.scrollMinDragLength);
				hbarDrag.width(dragLen);
				var difference = hbarDrag.outerWidth() - hbarDrag.width();
				hbarDrag.width( dragLen - difference );
				var icon  = hbarDrag.children("span");
				icon.css("margin-left",(hbarDrag.width() - icon[0].offsetWidth) /2);
				if (track <= hbarDrag.outerWidth()) {
					hbarDrag.hide();
				}
				else {
					hbarDrag.show();
				}
			}
			if (self.vNeedScrollBar && vbarDrag.is(":visible")) {
				var vLargeChange = self._getVScrollBarLargeChange();
				var track1 = self._getTrackLen("v");
				var dragLen1 = self._getDragLength(vRange, vLargeChange, track1, o.vScroller.scrollMinDragLength);
				vbarDrag.height(dragLen1);
				var difference1 = vbarDrag.outerHeight() - vbarDrag.height();
				vbarDrag.height( dragLen1 - difference1 );
				var icon1  = vbarDrag.children("span");
				icon1.css("margin-top",(vbarDrag.height() - icon1[0].offsetHeight) /2);
				if (track1 <= vbarDrag.outerHeight()){
					vbarDrag.hide();
				}
				else {
					vbarDrag.show();
				}
			}
			self._setDragAndContentPosition(false, false, "both");
		},
		
		_getTrackLen: function(dir){
			// Get the length of the track.
			// <param name="dir" type="String">
			// Options are: "v" and "h".
			// "v" - Vertical scroll track.
			// "h" - Horizontal scroll track.
			// </param>
			
			var self = this;
			var f = self._fields();
			//var o = self.options;
			var key = dir + "TrackLen";
			if (f[key]!=undefined){
				return f[key]; 
			}
			
			var hbarContainer = f.hbarContainer;
			var vbarContainer = f.vbarContainer;
			var track = 0;
			var padding = 0;
			if (dir == "h") {
				padding = self._getScrollContainerPadding("h");
				track = hbarContainer.innerWidth();
			}
			if (dir == "v") {
				padding = self._getScrollContainerPadding("v");
				track = vbarContainer.innerHeight();
			}
			f[key] = (track - padding)
			return f[key];
		},
		
		_getScrollContainerPadding: function(paddingType){
			// Get the padding of the scroll bar container.
			var self = this;
			var f = self._fields();
			var padding = 0;
			if (paddingType == "h") {
				padding = self._getScrollContainerPadding("left") + self._getScrollContainerPadding("right");
			}
			else if (paddingType == "v") {
				padding = self._getScrollContainerPadding("top") + self._getScrollContainerPadding("bottom");
			}
			else {
				var container;
				if (paddingType == "left" || paddingType=="right"){
					container = f.hbarContainer;
				}
				else{
					container = f.vbarContainer;
				}
				var key = paddingType + "Padding";
				if (f[key] != undefined){
					padding = f[key];
					return padding;
				}
				padding = parseFloat(container.css("padding-"+ paddingType ).replace("px", ""));
				f[key] = padding;
			}
			return padding;
		},
		
		_contentDragAnimate: function (dir,animated,hbarContainer,hbarDrag, stop,fireScrollEvent, dragging){
			var self = this;
			var o = self.options;
			var v = dir == "v";
			var scroller = v? o.vScroller: o.hScroller;
			var tempKey = v? "outerHeight" : "outerWidth";
			var wrapKey = v? "innerHeight" : "innerWidth";
			var contentKey = v? "contentHeight" : "contentWidth";
			var paddingKey = v?"top": "left";
			var hMin = scroller.scrollMin;
			var hMax = scroller.scrollMax;
			var hRange = hMax - hMin;
			var hValue = scroller.scrollValue==undefined? hMin : (scroller.scrollValue - hMin);
			var hLargeChange = self._getLargeChange(dir);
			var max = hRange - hLargeChange + 1;
			var f = self._fields();
			var cWrapper = f.contentWrapper;
			var tempWrapper = f.templateWrapper;

			if (hValue > max) {
				hValue = max;
			}
			var contentLeft = (f[contentKey] - cWrapper[wrapKey]()) * (hValue / max);
			if (Math.abs(contentLeft) < 0.001) {
				contentLeft = 0;
			}
			contentLeft = Math.round(contentLeft);
			var dragleft = -1;
			if (hbarContainer!= undefined){
				if (animated && hbarDrag.is(":animated") && stop != "nonestop") {
					hbarDrag.stop(true, false);
				}
				var track = self._getTrackLen(dir);
				var drag = hbarDrag[tempKey]();
				var r = track - drag;
				var padding = self._getScrollContainerPadding(paddingKey);
				dragleft = (hValue / max) * r + padding;
			}
			if (animated && o.animationOptions !=null) {
				if (dragleft>=0 && dragging !== "dragging"){
					var dragAnimationOptions = $.extend({}, o.animationOptions);
					// not trigger scrolled when stop
					dragAnimationOptions.complete = undefined;
					var properties = v ? { top: dragleft}  : { left: dragleft};
					hbarDrag.animate(properties, dragAnimationOptions);
				}
				var contentAnimationOptions = $.extend({}, o.animationOptions);
				var userComplete = o.animationOptions.complete;
				contentAnimationOptions.complete = function(){
					self._scrollEnd(fireScrollEvent, self, dir);
					if ($.isFunction(userComplete)) {
						userComplete(arguments);
					}
                    
				};
				if (animated && tempWrapper.is(":animated") && stop != "nonestop") {
					tempWrapper.stop(true, false);
				}
				var properties1 = v ? { top: -contentLeft}  : { left: -contentLeft};
				tempWrapper.animate(properties1, contentAnimationOptions);
			}
			else {
				var key = v ? "top" : "left";
				if (dragleft >=0 && dragging !== "dragging") {
					
					hbarDrag[0].style[key] = dragleft + "px";
				}
				tempWrapper[0].style[key] = -contentLeft + "px";
				self._scrollEnd(fireScrollEvent, self, dir);
			}
		},
		
		_setDragAndContentPosition: function(fireScrollEvent, animated, dir, stop, dragging){
			var self = this;
			var f = self._fields();
			var hbarContainer = f.hbarContainer;
			var hbarDrag = f.hbarDrag;
			var vbarContainer = f.vbarContainer;
			var vbarDrag = f.vbarDrag;
			if ((dir == "both" || dir == "h") && f.hScrolling) {
				self._contentDragAnimate("h",animated,hbarContainer,hbarDrag,stop,fireScrollEvent,dragging);
			}
			if ((dir == "both" || dir == "v") && f.vScrolling) {
				self._contentDragAnimate("v",animated,vbarContainer,vbarDrag,stop,fireScrollEvent,dragging);
			}
			if (f.intervalID>0){
				window.clearInterval(f.intervalID);
			}
			f.intervalID = window.setInterval(function(){
				self._disableButtonIfNeeded(self);
			}, 500);
		},
		
		_scrolling: function(fireEvent, self, d){
			var r = true;
			
			if (fireEvent) {
				d.beforePosition  = self.getContentElement().position();
				self._beforePosition = d.beforePosition;
				r = self._trigger("scrolling", null, d);
			}
			return r;
		},
		
		_scrollEnd: function(fireEvent, self, dir){
			if (fireEvent) {
				// use settimeout to return to caller immediately.
				window.setTimeout(function (){
					var content = self.getContentElement();
					if (!content.is(":visible")){
						return;
					}
					var after = self.getContentElement().position();
					var d = {
						dir: dir,
						beforePosition: self._beforePosition,
						afterPosition: after
					}
					self._trigger("scrolled", null, d);
				},0);
			}
		},
		
		_getDragLength: function(range, largeChange, track, min){
			var divide = range / largeChange;
			var dragLength = track / divide;
			var minidrag = min;
			if (dragLength < minidrag || (dragLength + 2) >= track) {
				dragLength = minidrag;
			}
			return Math.round(dragLength);
		},
		
		_needScrollbar: function (scroller, needscroll){
			var scrollbarMode = this._hasMode(scroller, "scrollbar");
			var barVisibility = scroller.scrollBarVisibility;
			var needScrollBar = scrollbarMode && (barVisibility == "visible" || (barVisibility == "auto" && needscroll));
			return needScrollBar;
		},
		
		_bindBarEvent: function (barContainer, barDrag, dir){
			var self = this;
			barContainer.bind("mouseover." + self.widgetName, self, self._scrollerMouseOver);
			barDrag.draggable({
				axis: dir == "h" ? "x": "y",
				drag: function(e){
					self._dragging(e, self);
				},
				containment: "parent",
				stop: function(e){
					self._dragStop(e, self, dir);
					$(e.target).removeClass("ui-state-active");
				}
			});
		},
		
		_createBarIfNeeded: function (hNeedScrollBar, scrollerWrapper, dir,html, content ){
			if (hNeedScrollBar) {
				var self = this;
				var f = self._fields();
				var strBarContainer = dir + "barContainer";
				var strBarDrag = dir + "barDrag";
				var hbar = dir == "h";
				var contentLength = content[0][hbar? "clientHeight":"clientWidth"];
				var c = f[strBarContainer] = $(html);
				scrollerWrapper.append(c);
				var targetBarLen = c[0][hbar?"offsetHeight":"offsetWidth"];
				var d = f[strBarDrag] = c.find("."+scrollerHandle);
				self._bindBarEvent(c, d, dir);
				
				content[hbar?"height":"width"](contentLength - targetBarLen);
			}
		},
		
		_setScrollbarPosition: function (wrapper, self, content, 
					targetBarContainer, referBarContainer,
					targetNeedScrollBar, referNeedScrollBar, 
					targetScrollBarPosition, referScrollBarPosition,  dir, scrollingNeed){
			var hbar = dir == "h";
			if (targetNeedScrollBar) {
				var targetBarLen = targetBarContainer[0][hbar?"offsetHeight":"offsetWidth"];
				var targetPadding = self._getScrollContainerPadding(dir);
				var targetBarPosition = hbar ? "top" :"left";
				var barPosition1 = hbar ? {top: "0px",bottom: "auto",left: "auto",right: "auto"} : {left: "0px",right: "auto",top: "auto",bottom: "auto"};
				var contentPosition1 = hbar ? {top: targetBarLen + "px"} : {left: targetBarLen + "px"};
				
				var barPosition2 = hbar ? {top: "auto",right: "auto",left: "auto",bottom: "0px"} : {left: "auto",right: "0px",top: "auto",bottom: "auto"};
				var contentPosition2 = hbar ? {top: ""} : {left: ""};
				//var contentLength = content[0][hbar? "clientHeight":"clientWidth"];
				var contentLength2 = content[0][hbar? "clientWidth":"clientHeight"];
				if (targetScrollBarPosition == targetBarPosition) {
					targetBarContainer.css(barPosition1);
					content.css(contentPosition1);
					if (hbar){
						targetBarContainer.children(".ui-wijsuperpanel-hbar-buttonleft").removeClass("ui-corner-bl").addClass("ui-corner-tl");
						targetBarContainer.children(".ui-wijsuperpanel-hbar-buttonright").removeClass("ui-corner-br").addClass("ui-corner-tr");
						targetBarContainer.removeClass("ui-corner-bottom").addClass("ui-corner-top");
					}
					else{
						targetBarContainer.children(".ui-wijsuperpanel-vbar-buttontop").removeClass("ui-corner-tr").addClass("ui-corner-tl");
						targetBarContainer.children(".ui-wijsuperpanel-vbar-buttonbottom").removeClass("ui-corner-br").addClass("ui-corner-bl");
						targetBarContainer.removeClass("ui-corner-right").addClass("ui-corner-left");
					}
				}
				else {
					targetBarContainer.css(barPosition2);
					content.css(contentPosition2);
					if (hbar){
						targetBarContainer.children(".ui-wijsuperpanel-hbar-buttonleft").removeClass("ui-corner-tl").addClass("ui-corner-bl");
						targetBarContainer.children(".ui-wijsuperpanel-hbar-buttonright").removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-top").addClass("ui-corner-bottom");
					}
					else{
						targetBarContainer.children(".ui-wijsuperpanel-vbar-buttontop").removeClass("ui-corner-tl").addClass("ui-corner-tr");
						targetBarContainer.children(".ui-wijsuperpanel-vbar-buttonbottom").removeClass("ui-corner-bl").addClass("ui-corner-br");
						targetBarContainer.removeClass("ui-corner-left").addClass("ui-corner-right");
					}
				}
				//content[hbar?"height":"width"](contentLength - targetBarLen);
				var referBarWidth = 0;
				if (referNeedScrollBar) {
					referBarWidth = referBarContainer[0][hbar?"offsetWidth":"offsetHeight"];
					if (referScrollBarPosition == "left"){
						targetBarContainer.css("right","0px");
					}
					else if (referScrollBarPosition == "right"){
						targetBarContainer.css("left","0px");
					}
					else if (referScrollBarPosition == "top"){
						targetBarContainer.css("bottom","0px");
					}
					else if (referScrollBarPosition == "bottom"){
						targetBarContainer.css("top","0px");
					}
				}
				if (!hbar/*vbar*/ && referNeedScrollBar) {
					referBarWidth = 0;
				}
				
				targetBarContainer[hbar?"width":"height"](contentLength2 - targetPadding);
				self._enableDisableScrollBar(dir, targetBarContainer, !scrollingNeed);
			}
			else {
				wrapper.css(hbar?"left":"top", "");
			}
		},
		
		_testScroll: function(self,f, o){
			var wrapper = f.templateWrapper;
			var content = f.contentWrapper;
			var scrollerWrapper = f.stateContainer;
			var contentWidth = content.innerWidth();
			var contentHeight = content.innerHeight();
			var wrapperWidth = f.contentWidth;
			var wrapperHeight = f.contentHeight;
			f.hScrolling = wrapperWidth > contentWidth;
			f.vScrolling = wrapperHeight > contentHeight;
			
			var hNeedScrollBar = self.hNeedScrollBar = self._needScrollbar(o.hScroller,f.hScrolling);
			self._createBarIfNeeded(self.hNeedScrollBar,scrollerWrapper, "h" , hbarHtml, content);
			// having h scroll bar, but no vscroll bar, we need to test vscrolling again.
			if (hNeedScrollBar && !f.vScrolling){
				f.vScrolling = wrapper[0].offsetHeight > (contentHeight - f.hbarContainer[0].offsetHeight);
			}
			
			var vNeedScrollBar = self.vNeedScrollBar = self._needScrollbar(o.vScroller,f.vScrolling);
			self._createBarIfNeeded(self.vNeedScrollBar,scrollerWrapper, "v", vbarHtml, content);

			if (vNeedScrollBar&& !f.hScrolling) {
				f.hScrolling = wrapper[0].offsetWidth > (contentWidth - f.vbarContainer[0].offsetWidth);
				if (f.hScrolling){
					hNeedScrollBar =self.hNeedScrollBar = self._needScrollbar(o.hScroller,f.hScrolling);
					self._createBarIfNeeded(self.hNeedScrollBar,scrollerWrapper, "h" , hbarHtml, content);
				}
			}

			var hbarContainer = f.hbarContainer;
			var vbarContainer = f.vbarContainer;
			var hbarPosition = o.hScroller.scrollBarPosition;
			var vbarPosition = o.vScroller.scrollBarPosition;

			self._setScrollbarPosition(wrapper, self, content, hbarContainer, 
			vbarContainer, hNeedScrollBar, vNeedScrollBar,hbarPosition, 
			vbarPosition, "h", f.hScrolling);
			self._setScrollbarPosition(wrapper, self, content, vbarContainer, 
			hbarContainer, vNeedScrollBar, hNeedScrollBar,vbarPosition, 
			hbarPosition, "v", f.vScrolling);
		},
		
		_enableDisableScrollBar: function(bar, barContainer, disable){
			// Disables scroll bar.
			// <param name="bar" type="String">
			// Scrollbar to disable. 
			// Options are: "h" and "v"
			// </param>
			// <param name="barContainer" type="jQuery">
			// The scroll bar container jQuery object.
			// </param>
			// <param name="disable" type="Boolean">
			// Whether to disable scroll bar.
			// </param>

			if (bar === "v") {
				barContainer[disable ? "addClass" : "removeClass"]("ui-wijsuperpanel-vbarcontainer-disabled");
				barContainer.find("."+uiStateDefault)[disable ? "addClass" : "removeClass"](uiStateDisabled);
			}
			else if (bar === "h") {
				barContainer[disable ? "addClass" : "removeClass"]("ui-wijsuperpanel-hbarcontainer-disabled");
				barContainer.find("."+uiStateDefault)[disable ? "addClass" : "removeClass"](uiStateDisabled);
			}
			barContainer.children("."+scrollerHandle)[disable ? "hide" : "show"]();
		},
		
		_initResizer: function(){
			// Initialize reseizer of wijsuperpanel.
			
			var self = this;
			var o = self.options;
			var f = self._fields();
			var resizer = f.resizer;
			
			if (resizer == null && o.allowResize) {
				var resizableOptions = o.resizableOptions;
				var oldstop = resizableOptions.stop;
				resizableOptions.stop = function(e){
					self._resizeStop(e, self);
					if ($.isFunction(oldstop)) {
						oldstop(e)
					}
				}
				f.resizer = resizer = self.element.resizable(resizableOptions);
			}
			if (!o.allowResize && f.resizer != null) {
				resizer.resizable("destroy");
				f.resizer = null;
			}
		},
		
		_resizeStop: function(e, self){
			// give the chance to autoRefresh polling to repaint.
			if (!this.options.autoRefresh){
				self.paintPanel();
			}
			self._trigger("resized");
		},
		
		_createAdditionalDom: function(self, f, ele){

			// make sure the key pressing event work in FireFox.
			if (!ele.attr("tabindex")) {
				ele.attr("tabindex", "-1");
				f.tabindex = true;
			}
			var stateContainer = f.stateContainer = $(innerElementHtml);
			// move child element to content wrapper div of wijsuperpanel.
			f.contentWrapper = stateContainer.children();
			var templateW = f.templateWrapper = f.contentWrapper.children();
			ele.contents().each(function(index, el){
				var jel = $(el);
				if (jel.hasClass("ui-wijsuperpanel-header")){
					f.header = jel;
					return;
				}
				if (jel.hasClass("ui-wijsuperpanel-footer")){
					f.footer = jel;
					return;
				}
				templateW[0].appendChild(el);
			});
			
			// apeend header to first element.
			if (f.header != undefined){
				ele.prepend(f.header);
			}
			ele[0].appendChild(stateContainer[0]);
			// apeend footer to first element.
			if (f.footer != undefined){
				f.footer.insertAfter(stateContainer);
			}
		},
		
		_setRounder: function(self, ele){
			if (this.options.showRounder) {
				ele.addClass(rounderClass);
				if (self._rounderAdded){
					return;
				}
				if ($.browser.msie) {
					return;
				}
				var key1 = key = ""; 
				
				if ($.browser.webkit){
					key = "WebkitBorderTopLeftRadius";
					key1 = "WebkitBorderRadius";
				}
				else if ($.browser.mozilla){
					key = "MozBorderRadiusBottomleft";
					key1 = "MozBorderRadius";
				}
				else{
					key = "border-top-left-radius";
					key1 = "border-radius";
				}
				var value = ele.css(key)
				var border = parseInt(value);
				// adding 1 extra to out-most radius.
				
				ele.css(key1,border +1);
				self._rounderAdded = true;
				self._radiusKey = key1;
			}
			else {
				ele.removeClass(rounderClass);
			}
		},
		
		_setInnerElementsSize: function(f, ele){
			var state = f.stateContainer;
			var content = f.contentWrapper;
			var height = 0;
			if (f.header!=undefined){
				height += f.header.outerHeight();
			}
			if (f.footer!=undefined){
				height += f.footer.outerHeight();
			}
			
			var style = state[0].style;
			var clientHeight = ele[0].clientHeight - height;
			var clientWidth = ele[0].clientWidth;
			// hide element before setting width and height to improve javascript performance in FF3.
			style.display = "none";
			style.height = clientHeight + "px";
			style.width = clientWidth + "px";
			var style2 = content[0].style;
			style2.height = clientHeight + "px";
			style2.width = clientWidth + "px";
			style.display = "";
		}
	});
})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo TextBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
	$.widget("ui.wijtextboxdecorator", {
		options: {
	},
	_create: function () {
		var self = this;
		if (!(self.element.attr("tagName").toLowerCase() === "input" || self.element.attr("tagName").toLowerCase() === "textarea")) {
			return;
		}
		if (!(self.element.attr("type").toLowerCase() === "text" || self.element.attr("type").toLowerCase() === "password")) {
			if (self.element.attr("tagName").toLowerCase() === "input") {
				return;
			}
		}
		var e = self.element;
		self.element.addClass("ui-wijtextbox ui-widget ui-state-default ui-corner-all");
		self.element.bind("mouseover." + self.widgetName, function () {
			e.addClass("ui-state-hover");
		}).bind("mouseout." + self.widgetName, function () {
			e.removeClass("ui-state-hover");
		}).bind("mousedown." + self.widgetName, function () {
			e.addClass("ui-state-active");
		}).bind("mouseup." + self.widgetName, function () {
			e.removeClass("ui-state-active");
		}).bind("focus." + self.widgetName, function () {
			e.addClass("ui-state-focus");
		}).bind("blur." + self.widgetName, function () {
			e.removeClass("ui-state-focus");
		});
	},
	destroy: function () {
		var self = this;
		self.element.removeClass("ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active").unbind("." + self.widgetName);
		$.Widget.prototype.destroy.apply(self);
	}
})



})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Dropdown widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
	$.widget("ui.wijdropdowndecorator", {
		options: {
			width: 300,
			height: 250
		},
		hoverClass: "ui-state-hover",
		activeClass: "ui-state-active",
		focusClass: "ui-state-focus",

		_create: function () {
			if (this.element.attr("tagName").toLowerCase() !== "select" && this.element.attr("size") < 2) {//make sure it's not a listbox.
				return;
			}
			this._activeItem = null;
			this._applySelect(this.element);
		},
		_applySelect: function (n) {
			var self = this;
			//var divWidth = $(n).width();
			var height = $(n).outerHeight();
			$(n).wrap("<div></div>");
			$(n).wrap("<div></div>");
			var dropdownbox = $(n).parent();
			dropdownbox.addClass("ui-helper-hidden");
			var container = dropdownbox.parent();
			container.addClass("ui-wijdropdowndecorator ui-widget ui-widget-content ui-state-default ui-corner-all ui-helper-clearfix");


			var label = $("<label class=\"ui-dropdown-label ui-corner-all\"></label>");
			label.attr("id", self.element.attr("id") + "_select");
			label.attr("name", $(n).attr("name"));
			var inputWrap = $("<div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\"></div>");
			var span = $("<span class=\"ui-icon ui-icon-triangle-1-s\"></span>");
			inputWrap.append(span);

			self._value = $(n).val();

			self.$anthorWarp = $("<a href=\"#\"></a>");
			self.$anthorWarp.append(label);

			//$(n).hide();
			self.div = $("<div>");
			container.append(self.$anthorWarp);
			container.append(inputWrap);
			container.append(self.div);
			self.div.addClass("ui-dropdown");
			self.div.width(container.width());
			label.data("dropdown", self.div);
			var maxIndex = self._getMaxZIndex();

			self.$dropdownList = $("<ul></ul>")
            .addClass("ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset")
            .appendTo(self.div);

			self.element.children().each(function () {//this.element
				var $chilren = $(this);
				if ($chilren.is("option")) {
					var $item = $(this);
					self.$dropdownList.append(buildItem($item));
				}
				else if ($chilren.is("optgroup")) {
					var $list = $("<li class=\"ui-dropdown-optgroup\"></li>");
					var $text = $("<span class=\"ui-optgroup-header ui-priority-primary\">" + $chilren.attr("label") + "</span>");
					var $items = $("<ul class=\"ui-helper-reset ui-dropdown-items\"></ul>");
					$list.append($text).append($items);

					$chilren.children("option").each(function () {
						var $item = $(this);
						$items.append(buildItem($item));
					});
					self.$dropdownList.append($list);
				}

				function buildItem($item) {
					var val = $item.val();
					var text = $item.text();
					var $li = $("<li class=\"ui-dropdown-item ui-corner-all\"><span>" + text + "</span></li>")
					//                    .mouseenter(function (event) {
					//                        self._activate($(this));
					//                    })
                    .mousemove(function (event) {//mousemove replace mouseenter to resolve the hovered <li> changed issue when scrolling the ddl
                    	var current = $(event.target).closest(".ui-dropdown-item");
                    	if (current != this.last) {
                    		self._activate($(this));
                    	}
                    	this.last = $(event.target).closest(".ui-dropdown-item");
                    });
					$li.data("value", val);
					return $li;
				}
			});

			label.bind("click." + self.widgetName, function () {
				if (!self.div.is(":visible")) {
					self.div.show();
					self._initActiveItem();
				}
				else {
					self.div.hide();
				}
			}).bind("mouseover." + self.widgetName, function () {
				label.addClass(self.hoverClass);
				inputWrap.addClass(self.hoverClass);
			}).bind("mouseout." + self.widgetName, function () {
				label.removeClass(self.hoverClass);
				inputWrap.removeClass(self.hoverClass);
			}).bind("mousedown." + self.widgetName, function () {
				label.addClass(self.activeClass);
				inputWrap.addClass(self.activeClass);
			}).bind("mouseup." + self.widgetName, function () {
				label.removeClass(self.activeClass);
				inputWrap.removeClass(self.activeClass);
			});

			inputWrap.bind("click." + self.widgetName, function () {
				if (!self.div.is(":visible")) {
					self.div.show();
					self._initActiveItem();
				}
				else {
					self.div.hide();
				}
				self.$anthorWarp.focus();
			}).bind("mouseover." + self.widgetName, function () {
				label.addClass(self.hoverClass);
				inputWrap.addClass(self.hoverClass);
			}).bind("mouseout." + self.widgetName, function () {
				label.removeClass(self.hoverClass);
				inputWrap.removeClass(self.hoverClass);
			}).bind("mousedown." + self.widgetName, function () {
				label.addClass(self.activeClass);
				inputWrap.addClass(self.activeClass);
			}).bind("mouseup." + self.widgetName, function () {
				label.removeClass(self.activeClass);
				inputWrap.removeClass(self.activeClass);
			});

			$(document.body).bind("click." + self.widgetName, function (e) {
				var offset = self.div.offset();
				//console.log($.contains(self.div, $(e.target)));
				if (e.target === label.get(0) || e.target == inputWrap.get(0) || e.target == inputWrap.children().get(0)) {
					return;
				}
				if (e.pageX < offset.left || e.pageX > offset.left + self.div.width()) {
					self.div.hide();
				}
				if (e.pageY < offset.top || e.pageY > offset.top + self.div.height()) {
					self.div.hide();
				}
			});



			self.div.bind("click." + self.widgetName, function (event) {
				var el = $(event.target);
				if (el.closest("li.ui-dropdown-item", $(this)).length > 0) {
					self._setValue();
					$(this).hide();
				}
			});

			height = Math.min(self.options.height, self.$dropdownList.outerHeight());
			self.div.css("z-index", maxIndex).css({
				height: height,
				width: self.options.width
			});
			self.superpanel = self.div.wijsuperpanel().data("wijsuperpanel");
			self.$dropdownList.setOutWidth(self.$dropdownList.parent().parent().innerWidth());
			self.div.hide();

			self.$anthorWarp.bind("keydown." + self.widgetName, function (e) {//Remove Keyboard Event to div
				var keyCode = $.ui.keyCode;
				switch (e.which) {
					case keyCode.UP:
					case keyCode.LEFT:
						self.previous();
						self._setValue();
						e.preventDefault();
						break;
					case keyCode.DOWN:
					case keyCode.RIGHT:
						self.next();
						self._setValue();
						e.preventDefault();
						break;
					case keyCode.PAGE_DOWN:
						self.nextPage(true);
						self._setValue();
						e.preventDefault();
						break;
					case keyCode.PAGE_UP:
						self.previousPage(true);
						self._setValue();
						e.preventDefault();
						break;
					case keyCode.ENTER:
					case keyCode.NUMPAD_ENTER:
						self._setValue();
						self.div.hide();
						break;
				}
			}).bind("focus." + self.widgetName, function () {
				label.addClass(self.focusClass);
				inputWrap.addClass(self.focusClass);
			}).bind("blur." + self.widgetName, function () {
				label.removeClass(self.focusClass);
				inputWrap.removeClass(self.focusClass);
			});
		},

		_init: function () {
			var self = this;
			self._initActiveItem();
			if (self._activeItem) {
				self.$anthorWarp.children("label").text(self._activeItem.text());
			}
		},

		_setValue: function () {
			var self = this;
			if (self._activeItem) {
				self.$anthorWarp.children("label").text(self._activeItem.text());
				self._value = self._activeItem.data("value");

				if (self.superpanel.vNeedScrollBar) {
					var div = self.div;
					var top = self._activeItem.offset().top,
				    height = self._activeItem.outerHeight();
					if (div.offset().top > top) {
						div.wijsuperpanel("scrollTo", 0, top - self.$dropdownList.offset().top);
					}
					else if (div.offset().top < top + height - div.innerHeight()) {
						div.wijsuperpanel("scrollTo", 0, top + height - div.height() - self.$dropdownList.offset().top);
					}
				}
				self.element.val(self._value);
			}
		},

		_initActiveItem: function () {
			var self = this;
			if (self._value) {
				self.$dropdownList.find("li.ui-dropdown-item").each(function () {
					if ($(this).data("value") == self._value) {
						self._activate($(this));
					}
				});
			}
		},

		_activate: function (item) {
			var self = this;
			self._deactivate();
			self._activeItem = item;
			self._activeItem.addClass(self.hoverClass);
		},

		_deactivate: function () {
			var self = this;
			if (self._activeItem) {
				self._activeItem.removeClass(self.hoverClass);
			}
		},

		next: function () {
			this._move("next", "first");
		},

		previous: function () {
			this._move("prev", "last");
		},

		_move: function (direction, edge) {
			var self = this;
			if (!self._activeItem) {
				self._activate(self.$dropdownList.find(".ui-dropdown-item:" + edge));
				return;
			}

			var $nextLi = self._activeItem[direction]().eq(0), next;
			if ($nextLi.length) {
				next = self._getNextItem($nextLi, direction, edge);
			}
			else if (self._activeItem.closest(".ui-dropdown-optgroup").length) {
				next = self._getNextItem(self._activeItem.closest(".ui-dropdown-optgroup")[direction](), direction, edge);
			}

			if (next && next.length) {
				self._activate(next);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item:" + edge));
			}
		},

		_getNextItem: function (next, direction, edge) {
			if (next.length) {
				if (next.is(".ui-dropdown-optgroup")) {
					if (!!next.find(">ul>li.ui-dropdown-item").length) {
						return next.find(">ul>li.ui-dropdown-item:" + edge).eq(0);
					}
					else {
						this._getNextItem(next[direction]().eq(0));
					}
				}
				else {
					return next;
				}
			}
		},

		_isFirst: function () { },

		_isLast: function () { },

		nextPage: function () {
			var self = this;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self.activate(self.element.children(":first"));
					return;
				}
				var base = self._activeItem.offset().top,
				height = self.options.height,
				result = self.$dropdownList.find(".ui-dropdown-item").filter(function () {
					var close = $(self).offset().top - base - height + $(self).height();
					return close < 10 && close > -10;
				});
				if (!result.length) {
					result = self.$dropdownList.find(".ui-dropdown-item:last");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item" + (!self._activeItem || self._isLast() ? ":first" : ":last")));
			}
		},

		previousPage: function () {
			var self = this;
			if (self.superpanel.vNeedScrollBar) {
				if (!self._activeItem || self._isLast()) {
					self._activate(self.element.children(":last"));
					return;
				}
				var base = self._activeItem.offset().top,
				height = self.options.height,
                result = self.$dropdownList.find(".ui-dropdown-item").filter(function () {
                	var close = $(self).offset().top - base + height - $(self).height();
                	return close < 10 && close > -10;
                });

				if (!result.length) {
					result = self.$dropdownList.find(".ui-dropdown-item:first");
				}
				self._activate(result);
			} else {
				self._activate(self.$dropdownList.find(".ui-dropdown-item" + (!self._activeItem || self._isFirst() ? ":last" : ":first")));
			}
		},

		_getMaxZIndex: function () {
			var self = this;
			var index = 100;
			if (self.element.data("maxZIndex")) {
				return self.element.data("maxZIndex");
			}
			$("*", document).each(function (i, n) {
				if (parseInt($(n).css("z-index")) > index) {
					index = parseInt($(n).css("z-index"));
				}
			})
			self.element.data("maxZIndex", index);
			return index;
		},
		
		destroy: function () {
			this.element.closest(".ui-wijdropdowndecorator").find(">div.ui-dropdown-trigger,>div.ui-dropdown,>label.ui-dropdown-label").remove();
			this.element.unwrap().unwrap().removeData("maxZIndex");
			$.Widget.prototype.destroy.apply(this);
		}
	})
})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo CheckBoxDecorator widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 *
 */
(function ($) {
	var checkboxId = 0;
	$.widget("ui.wijcheckboxdecorator", {
		_csspre: "ui-checkbox",
		_init: function () {
			var that = this;
			if (that.element.is(":checkbox")) {
				if (!that.element.attr("id")) {
					that.element.attr("id", that._csspre + checkboxId);
					checkboxId += 1;
				}
				var checkboxElement;
				if (that.element.parent().is("label")) {
					checkboxElement = that.element.parent().wrap("<div class='" + that._csspre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._csspre + " ui-widget");
					var label = that.element.parent();
					label.attr("for", that.element.attr("id"));
					checkboxElement.find("." + that._csspre + "-inputwrapper").append(that.element);
					checkboxElement.append(label);
				}
				else {
					checkboxElement = that.element.wrap("<div class='" + that._csspre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._csspre + " ui-widget");
				}
				var targetLabel = $("label[for='" + that.element.attr("id") + "']");
				if (targetLabel.length > 0) {
					checkboxElement.append(targetLabel);
					targetLabel.attr("labelsign", "C1");
				}
				var boxElement = $("<div class='" + that._csspre + "-box ui-widget ui-state-default ui-corner-all'><span class='" + that._csspre + "-icon'></span></div>");
				var iconElement = boxElement.children("." + that._csspre + "-icon");
				checkboxElement.append(boxElement);
				that.element.data("iconElement", iconElement);
				that.element.data("boxElement", boxElement);
				if (that.element.is(":disabled")) {
					that._setOption("disabled", true);
				}
				boxElement.removeClass(that._csspre + "-relative");
				if (targetLabel.length === 0 || targetLabel.html() === "") {
					boxElement.addClass(that._csspre + "-relative");
				}
				that.element.bind("click.checkbox", function () {
					that.refresh();
				}).bind("focus.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover").addClass("ui-state-default");
				});
				checkboxElement.click(function () {
					if (targetLabel.length === 0 || targetLabel.html() === "") {
						that.element.attr("checked", !that.element.attr("checked"));
						that.refresh();
					}

				});
				that.refresh();
				checkboxElement.bind("mouseover.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus").addClass("ui-state-default");
				});
			}
		},

		refresh: function () {
			var self = this;
			self.element.data("iconElement").toggleClass("ui-icon ui-icon-check", self.element.is(":checked"));
			self.element.data("boxElement").toggleClass("ui-state-active", self.element.is(":checked"));
		},

		destroy: function () {
			var self = this;
			var boxelement = self.element.parent().parent();
			boxelement.children("div." + self._csspre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
})(jQuery);
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo RadioButtonDecorator widget.
 * 
 * Depends:
 *   jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *
 */
(function ($) {
	var radiobuttonId = 0;
	$.widget("ui.wijradiobuttondecorator", {
		_radiobuttonPre: "ui-wijradiobutton",
		_create: function () {
			var that = this;
			if (this.element.is(":radio")) {
				if (!that.element.attr("id")) {
					that.element.attr("id", "ui-radio-" + radiobuttonId);
					radiobuttonId += 1;
				}
				var radiobuttonElement;
				if (that.element.parent().is("label")) {
					radiobuttonElement = that.element.parent().wrap("<div class='" + that._radiobuttonPre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._radiobuttonPre + " ui-widget");
					var label = that.element.parent();
					label.attr("for", that.element.attr("id"));
					radiobuttonElement.find("." + that._radiobuttonPre + "-inputwrapper").append(that.element);
					radiobuttonElement.append(label);

				}
				else {
					radiobuttonElement = that.element.wrap("<div class='" + that._radiobuttonPre + "-inputwrapper'></div>").parent().wrap("<div></div>").parent().addClass(that._radiobuttonPre + " ui-widget");
				}
				var targetLabel = $("label[for='" + that.element.attr("id") + "']");
				if (targetLabel.length > 0) {
					radiobuttonElement.append(targetLabel);
					targetLabel.attr("labelsign", "wij");
					//targetLabel.attr("tabindex", 0);
				}
				var boxElement = $("<div class='" + that._radiobuttonPre + "-box ui-widget ui-state-default ui-corner-all'><span class='" + that._radiobuttonPre + "-icon'></span></div>");
				var iconElement = boxElement.children("." + that._radiobuttonPre + "-icon");
				radiobuttonElement.append(boxElement);
				iconElement.addClass("ui-icon ui-icon-radio-off");
				that.element.data("iconElement", iconElement);
				that.element.data("boxElement", boxElement);
				if (that.element.is(":disabled")) {
					that._setOption("disabled", true);
				}

				boxElement.removeClass(that._radiobuttonPre + "-relative");
				if (targetLabel.length == 0 || targetLabel.html() === "") {
					boxElement.addClass(that._radiobuttonPre + "-relative");
				}
				that._refresh();
				//			boxElement.css("margin-top","9px");

				that.element.bind("click.checkbox", function () {
					that._refresh();
				}).bind("focus.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-focus");
				}).bind("blur.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-focus").not(".ui-state-hover").addClass("ui-state-default");
				});

				radiobuttonElement.click(function () {
					if (targetLabel.length == 0 || targetLabel.html() === "") {
						that.element.attr("checked", true);
						that._refresh();
					}

				})

				radiobuttonElement.bind("mouseover.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-default").addClass("ui-state-hover");
				}).bind("mouseout.checkbox", function () {
					if (that.options.disabled) {
						return;
					}
					boxElement.removeClass("ui-state-hover").not(".ui-state-focus").addClass("ui-state-default");
				});

			}
		},

		_refresh: function () {
			var name = this.element.attr("name");
			var self = this;
			$("[name=" + name + "]").each(function (i, n) {
				$(n).parents(".ui-wijradiobutton").find("." + self._radiobuttonPre + "-box").children().removeClass("ui-icon-radio-on ui-icon-radio-off").addClass("ui-icon-radio-on");
				$(n).parents(".ui-wijradiobutton").find("." + self._radiobuttonPre + "-box").removeClass("ui-state-active").addClass("ui-state-default");
			})
			if (self.element.is(":checked")) {
				self.element.data("iconElement").removeClass("ui-icon-radio-on").addClass("ui-icon-radio-off");
				self.element.data("boxElement").removeClass("ui-state-default").addClass("ui-state-active");
			}
		},
		destroy: function () {
			var self = this;
			var boxelement = self.element.parent().parent();
			boxelement.children("div." + self._radiobuttonPre + "-box").remove();
			self.element.unwrap();
			self.element.unwrap();
			$.Widget.prototype.destroy.apply(self);
		}
	});
})(jQuery);
/*globals jQuery*/
/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo List widget.
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.wijsuperpanel.js
 *  
 */
"use strict";
(function ($) {
	var listCSS = "ui-widget ui-widget-content ui-corner-all ui-wijlist",
		listItemCSS = "ui-wijlist-item",
		listItemCSSAlternate = listItemCSS + "-alternate",
		listItemCSSSelected = listItemCSS + "-selected",
		listItemCSSFirst = listItemCSS + "-first",
		listItemCSSLast = listItemCSS + "-last",
		stateHover = "ui-state-hover",
		uiStateActive = "ui-state-active",
		activeItem = "ui-active-wijlistitem",
		selectedActive = listItemCSSSelected + " " + uiStateActive,
		itemKey = "item.wijlist";
	$.widget("ui.wijlist", {
		options: {
			/// <summary>
			/// Select event handler of wijlist. A function will be called when any item in the list is selected.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// Event Object of the event.
			///	</param>
			/// <param name="data" type="Object">
			/// By data.item to obtain the item selected. 
			/// By data.item.element to obtain the li DOM element selected.
			///	</param>
			selected: null,
			/// <summary>
			/// A value indicates the selection mode of wijlist.
			/// Default: "single".
			/// Type: String.
			/// </summary>
			/// <remarks>
			/// Options are "single" and "multiple". This option should not be set again after initialization.
			/// </remarks>
			selectionMode: "single",
			/// <summary>
			/// A value determines whether to auto-size wijlist.
			/// Default: false.
			/// Type: String.
			/// </summary>
			autoSize: false,
			/// <summary>
			/// A value specifies the max items count to display if autoSize is set to true.
			/// Default: 5.
			/// Type: Number.
			/// </summary>
			maxItemsCount: 5,
			/// <summary>
			/// A value determines whether to add ui-state-hover class to list item when mouse enters.
			/// Default: true.
			/// Type: Boolean.
			/// </summary>
			addHoverItemClass: true,
			/// <summary>
			/// A hash value sets to supepanel options when superpanel is created.
			/// Default: null.
			/// Type: Object.
			/// </summary>
			superPanelOptions: null,
			/// <summary>
			/// A value indicates whether wijlist is disabled.
			/// Default: false.
			/// Type: Boolean.
			/// </summary>
			disabled: false,
			/// <summary>
			/// A function called before an item is focused.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item to be activated.
			///	</param>
			/// <returns>
			/// returns false to cancel item focusing.
			/// </returns>
			focusing: null,
			/// <summary>
			/// A function called after an item is focused.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item to be activated.
			///	</param>
			focus: null,
			/// <summary>
			/// A function called when an item loses focus.
			/// Type: Function.
			/// Default: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object passed in to activate method.
			///	</param>
			/// <param name="item" type="Object">
			/// The list item.
			///	</param>
			blur: null,
			/// <summary>
			/// A function called before an item is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="item" type="Object">
			/// item to be rendered.
			/// item.element: LI element with this item.
			/// item.list: wijlist instance.
			/// item.label: label of item.
			/// item.value: value of item.
			/// item.text: could be set in handler to override rendered label of item.
			///	</param>
			itemrendering: null,
			/// <summary>
			/// A function called after a item is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="item" type="Object">
			/// item rendered.
			///	</param>
			itemrendered: null,
			/// <summary>
			/// A function called after list is rendered.
			/// Default: Function.
			/// Type: null.
			/// </summary>
			/// <param name="event" type="EventObject">
			/// event object with this event.
			///	</param>
			/// <param name="list" type="Object">
			/// list rendered.
			///	</param>
			listrendered: null,
			/// <summary>
			/// A value determines whether to keep item highlight when mouse is leaving list. 
			/// Default: Boolean.
			/// Type: false.
			/// </summary>
			keepHightlightOnMouseLeave: false
		},

		_create: function () {
			var self = this, ele = this.element;
			ele.addClass(listCSS).attr({
				role: "listbox",
				"aria-activedescendant": activeItem
			}).bind("click." + self.widgetName, self, self._onListClick);
			self.ul = $("<ul class='ui-wijlist-ul'></ul>").appendTo(ele);
			if (self.options.disabled) {
				self.disable();
			}
		},

		setItems: function (items) {
			/// <summary>
			/// Sets Items to be rendered by the wijlist.
			/// </summary>
			/// <param name="items" type="Array">
			/// Items array to be rendered.  The array contains object like {label: "label", value: "value"}.
			///	</param>
			this.items = items;
		},

		getList: function () {
			/// <summary>
			/// Gets the JQuery object reference of the ul element of wijlist.
			/// </summary>
			/// <returns type="JQueryObj">
			/// ul JQuery reference.
			/// </returns>

			return this.ul;
		},

		_onListClick: function (e) {
			if (!$(e.target).closest(".ui-wijlist-item").length) {
				return;
			}
			var self = e.data;
			self.select(e);
		},

		destroy: function () {
			/// <summary>
			/// Destroys wijlist.
			/// </summary>

			var self = this, ele = this.element;
			if (self.superPanel !== undefined) {
				self.superPanel.destroy();
			}

			ele.removeClass(listCSS).removeAttr("role").removeAttr("aria-activedescendant").unbind("." + self.widgetName);
			self.ul.remove();
			$.Widget.prototype.destroy.apply(self, arguments);
		},

		activate: function (event, item, scrollTo) {
			///	<summary>
			///		Activates a wijlist item.
			///	</summary>
			/// <param name="event" type="EventObject">
			/// Event will raise activation.
			/// </param>
			/// <param name="item" type="wijlistItem">
			/// wijlistItem to activate.
			///	</param>
			/// <param name="scrollTo" type="Boolean">
			/// Whether to scroll activated item to view.
			///	</param>

			var self = this, active;
			self.deactivate();
			if (item === null || item === undefined) {
				return;
			}
			if (self._trigger("focusing", event, item) === false) {
				return;
			}
			active = self.active = item.element;
			if (self.options.addHoverItemClass) {
				active.addClass(stateHover);
			}
			self.active.attr("id", activeItem);
			if (scrollTo && self.superPanel !== undefined) {
				self.superPanel.scrollChildIntoView(active);
			}
			self._trigger("focus", event, item);
		},

		deactivate: function () {
			/// <summary>
			/// Deactivates activated items.
			/// </summary>

			var self = this, a = this.active;
			if (!a) {
				return;
			}
			self._trigger("blur", null, a);
			a.removeClass(stateHover).removeAttr("id");
			self.active = undefined;
		},

		next: function (event) {
			/// <summary>
			/// Moves focus to the next item. 
			/// </summary>

			this.move("next", "." + listItemCSS + ":first", event);
		},

		nextPage: function () {
			/// <summary>
			/// Turns to the next page of the list.
			/// </summary>

			this.superPanel.doScrolling("bottom", true);
		},

		previous: function (event) {
			/// <summary>
			/// Moves focus to the previous item. 
			/// </summary>

			this.move("prev", "." + listItemCSS + ":last", event);
		},

		previousPage: function () {
			/// <summary>
			/// Turns to the previous page of the wijlist.
			/// </summary>

			this.superPanel.doScrolling("top", true);
		},

		first: function () {
			/// <summary>
			/// Tests that the focus is at the first item.
			/// </summary>

			return this.active && !this.active.prev().length;
		},

		last: function () {
			/// <summary>
			/// Tests that the focus is at the last item.
			/// </summary>

			return this.active && !this.active.next().length;
		},

		move: function (direction, edge, event) {
			/// <summary>
			/// Move focus between items.
			/// </summary>

			var self = this, item, next;
			if (!self.active) {
				item = self.ul.children(edge).data(itemKey);
				self.activate(event, item, true);
				return;
			}
			next = self.active[direction + "All"]("." + listItemCSS).eq(0);
			if (next.length) {
				self.activate(event, next.data(itemKey), true);
			}
			else {
				self.activate(event, self.element.children(edge).data(itemKey), true);
			}
		},

		select: function (event, data) {
			/// <summary>
			/// Selects active list item.
			/// </summary>
			///

			var self = this, ele = this.active, item = ele.data(itemKey), singleMode, previous;
			if (ele === undefined) {
				return;
			}
			singleMode = self.options.selectionMode === "single";
			if (singleMode) {
				previous = self.selectedItem;
				ele.addClass(selectedActive);
				item.selected = true;
				if (previous !== undefined && item !== previous) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				self._trigger("selected", event, {
					item: item,
					previousItem: previous,
					data: data
				});
			}
			else {
				item.selected = !item.selected;
				if (item.selected) {
					ele.addClass(selectedActive);
				}
				else {
					ele.removeClass(selectedActive);
				}
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				self._trigger("selected", event, {
					item: item,
					selectedItems: self.selectedItems
				});
			}
		},

		selectItems: function (indices, triggerSelected) {
			/// <summary>
			/// Selects multiple items in the list.
			/// </summary>
			/// <param name="indices" type="Array/Number">
			/// Indices of items to select.
			/// </param>

			var self = this, singleMode = this.options.selectionMode === "single", item, previous, len = this.items.length;
			if (singleMode) {
				if (indices >= 0 && indices < len) {
					item = self.items[indices];
					item.selected = true;
					item.element.addClass(selectedActive);
				}
				else {
					return;
				}
				previous = self.selectedItem;
				if (previous !== undefined && previous !== null) {
					previous.selected = false;
					previous.element.removeClass(selectedActive);
				}
				self.selectedItem = item;
				if (triggerSelected) {
					self._trigger("selected", null, {
						item: item,
						previousItem: previous
						//,
						//data: data
					});
				}
			}
			else {
				$.each(indices, function (index, value) {
					if (value >= 0 && value < len) {
						var i = self.items[value];
						i.selected = true;
						i.element.addClass(selectedActive);
					}
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
				if (triggerSelected) {
					self._trigger("selected", null, {
						selectedItems: self.selectedItems
					});
				}
			}
		},

		unselectItems: function (indices) {
			/// <summary>
			/// Unselects items by items’ indices.
			/// </summary>
			/// <param name="indices" type="Array">
			/// Indices of items to unselect.
			/// </param>

			var self = this, mode = this.options.selectionMode, len = this.items.length, selectedItem;
			if (mode === "single") {
				selectedItem = self.selectedItem;
				if (selectedItem !== undefined) {
					selectedItem.selected = false;
					selectedItem.element.removeClass(selectedActive);
					self.selectedItem = undefined;
				}
			}
			else {
				$.each(indices, function (index, value) {
					if (value >= 0 && value < len) {
						var i = self.items[value];
						i.selected = false;
						i.element.removeClass(selectedActive);
					}
				});
				self.selectedItems = $.grep(self.items, function (a) {
					return a.selected;
				});
			}
		},

		renderList: function () {
			/// <summary>
			/// Render items of wijlist.
			/// </summary>
			var self = this, ul = this.ul, o = this.options, items, count, singleMode, i, item;
			ul.empty();
			self.selectedItem = undefined;
			self.selectedItems = [];
			// returns if no items to render.
			items = self.items;
			if (items === undefined) {
				return;
			}
			count = items.length;
			if (items === undefined || items === null && count === 0) {
				return;
			}
			singleMode = o.selectionMode === "single";
			for (i = 0; i < count; i++) {
				item = items[i];
				self._renderItem(ul, item, i, singleMode);
			}
			items[0].element.addClass(listItemCSSFirst);
			items[count - 1].element.addClass(listItemCSSLast);
			self._trigger("listrendered", null, self);
		},


		_renderItem: function (ul, item, index, singleMode) {
			var self = this, li = $("<li class='ui-wijlist-item ui-corner-all'></li>"), label, url;
			item.element = li;
			item.list = self;
			if (self._trigger("itemrendering", null, item) === false) {
				return;
			}
			label = item.label;
			// if text is set, text will override label value.
			if (item.text !== undefined) {
				label = item.text;
			}
			// binds list item event
			li.mouseenter(function (event) {
				self.activate(event, item, false);
			}).mouseleave(function () {
				if (!self.options.keepHightlightOnMouseLeave) {
					self.deactivate();
				}
			}).data(itemKey, item).append(label).appendTo(ul);
			// render image
			url = item.imageUrl;
			if (url !== undefined && url.length > 0) {
				li.prepend("<img src='" + item.imageUrl + "'>");
			}
			// add selected items
			if (item.selected === true) {
				li.addClass(selectedActive);
				if (singleMode && self.selectedItem === undefined) {
					self.selectedItem = item;
				}
				else {
					self.selectedItems.push(item);
				}
			}
			if (index % 2 === 1) {
				li.addClass(listItemCSSAlternate);
			}
			self._trigger("itemrendered", null, item);
		},

		refreshSuperPanel: function () {
			/// <summary>
			/// Reset the layout of superpanel to reflect the change in content.
			/// </summary>

			var self = this, ele = this.element, o = this.options, ul = this.ul, singleItem = ul.children(".ui-wijlist-item:first"),
			adjustHeight = null, h, percent, small, vScroller, large, spOptions, pt;
			if (!ele.is(":visible")) {
				return false;
			}
			if (o.autoSize) {
				adjustHeight = singleItem.outerHeight(true) * o.maxItemsCount;
			}

			if (adjustHeight !== null) {
				ele.height(Math.min(adjustHeight, ul.outerHeight()));
			}
			h = ele.innerHeight();
			percent = h / (ul.outerHeight() - h);
			large = (101 * percent) / (1 + percent);
			small = (singleItem.outerHeight() / (ul.outerHeight() - h)) * (101 - large);
			if (self.superPanel === undefined) {
				spOptions = {
					allowResize: false,
					keyboardSupport: false,
					bubbleScrollingEvent: true,
					hScroller: {
						scrollBarVisibility: "hidden"
					},
					vScroller: {
						scrollSmallChange: small,
						scrollLargeChange: large
					}
				};

				$.extend(spOptions, o.superPanelOptions);
				self.superPanel = ele.wijsuperpanel(spOptions).data("wijsuperpanel");
			}
			else {
				vScroller = self.superPanel.options.vScroller;
				vScroller.scrollLargeChange = large;
				vScroller.scrollSmallChange = small;
				self.superPanel.paintPanel();
			}
			pt = ul.css("padding-top");
			if (pt.length > 0) {
				vScroller = self.superPanel.options.vScroller;
				vScroller.firstStepChangeFix = self.superPanel.scrollPxToValue(parseFloat(pt), "v");
			}
			else {
				vScroller.firstStepChangeFix = 0;
			}
			ul.setOutWidth(ul.parent().parent().innerWidth());
		}
	});
} (jQuery));/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 ** Wijmo Calendar widget.
*
* Depends:
*	jquery-1.4.2.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.wijpopup.js
*	jquery.effects.core.js	
*	jquery.effects.blind.js
* 	jquery.effects.slide.js
* 	jquery.effects.scale.js
*	jquery.glob.js
*
*/



(function ($) {

var wijDayType = {
	general: 0, 
	weekEnd: 1, 
	otherMonth: 2, 
	outOfRange: 4, 
	today: 8, 
	custom: 16, 
	disabled: 32, 
	selected: 64, 
	gap: 128
};

$.widget("ui.wijcalendar", {
	options: {
		///	<summary>
		///		The culture id
		///	</summary>
		culture: '',
		///	<summary>
		///		Gets or sets the number of calendar months to display in the widget. 
		///	</summary>
		monthCols:1,
		///	<summary>
		///		Gets or sets the number of calendar months to display in the widget. 
		///	</summary>
		monthRows:1,
		///	<summary>
		///		Gets or sets the format for the title text. 
		///	</summary>
		titleFormat: "MMMM yyyy",
		///	<summary>
		///		Determines the display date for the first month view.
		///	</summary>
		showTitle: true,
		///	<summary>
		///		Gets or sets the display date for the first month view.  
		///	</summary>
		displayDate: undefined,
		///	<summary>
		///		Gets or sets the number of day rows. 
		///	</summary>
		dayRows: 6,
		///	<summary>
		///		Gets or sets the number of day columns. 
		///	</summary>
		dayCols: 7,
		///	<summary>
		///		Gets or sets the format for the week day. 
		///	</summary>
		weekDayFormat: "short",
		///	<summary>
		///		A Boolean property that determines whether to display week days.
		///	</summary>
		showWeekDays: true,
		///	<summary>
		///		Determines whether to display week numbers. 
		///	</summary>
		showWeekNumbers: false,
		///	<summary>
		///		Defines different rules for determining the first week of the year. 
		///		Possible values are: "firstDay", "firstFullWeek" or "firstFourDayWeek"
		///	</summary>
		calendarWeekRule: "firstDay",
		///	<summary>
		///		Determines the minimum date to display.
		///	</summary>
		minDate: new Date(1900, 0, 1),
		///	<summary>
		///		Determines the maximum date to display. 
		///	</summary>
		maxDate: new Date(2099, 11, 31),
		///	<summary>
		///		Determines whether to display the days of the next and/or previous month.
		///	</summary>
		showOtherMonthDays: true,
		///	<summary>
		///		Determines whether to add zeroes to days with only one digit (for example, "1" would become "01" if this property were set to "true").
		///	</summary>
		showDayPadding: false,
		///	<summary>
		///		Gets or sets the date selection mode on the calendar control that specifies whether the user can select a single day, a week, or an entire month. 
		///	</summary>
		selectionMode: {day:true, days:true},
		///	<summary>
		///		Determines whether you can change the view to month/year/decade after clicking on the calendar title.
		///	</summary>
		allowPreview: false,
		///	<summary>
		///		Determines whether users can change the view to month/year/decade while clicking on the calendar title.
		///	</summary>
		allowQuickPick: true,
		///	<summary>
		///		Gets or sets the format for the ToolTip. 
		///	</summary>
		toolTipFormat: "dddd, MMMM dd, yyyy",
		///	<summary>
		///		Gets or sets the text for the 'previous' button's ToolTip. 
		///	</summary>
		prevTooltip: "Previous",
		///	<summary>
		///		Gets or sets the text for the 'next' button's ToolTip. 
		///	</summary>
		nextTooltip: "Next",
		///	<summary>
		///		Gets or sets the  "quick previous" button's ToolTip.
		///	</summary>
		quickPrevTooltip: "Quick Previous",
		///	<summary>
		///		Gets or sets the "quick next" button's ToolTip.
		///	</summary>
		quickNextTooltip: "Quick Next",
		///	<summary>
		///		Gets or sets the "previous preview" button's ToolTip. 
		///	</summary>
		prevPreviewTooltip: "",
		///	<summary>
		///		Gets or sets the "next preview" button's ToolTip. 
		///	</summary>
		nextPreviewTooltip: "",
		///	<summary>
		///		Determines the display type of navigation buttons.
		///		Possible values are: "default", "quick" or "none"
		///	</summary>
		navButtons: 'default',
		///	<summary>
		///		Detemines the inc/dec steps when clicking the quick navigation button.
		///	</summary>
		quickNavStep: 12,
		///	<summary>
		///		Determines the month slide direction.
		///		Possible values are: horizontal or vertical
		///	</summary>
		direction: 'horizontal',
		///	<summary>
		///		Gets or sets the animation duration in milliseconds. 
		///	</summary>
		duration: 250,
		///	<summary>
		///		Determines the animations easing effect.
		///	</summary>
		easing: 'easeInQuad',
		///	<summary>
		///		A Boolean property that determines whether the c1calendarwijcalendar widget is a pop-up calendar.
		///	</summary>
		popupMode: false,
		///	<summary>
		///		A Boolean property that determines whether to autohide the calendar in pop-up mode when clicking outside of the calendar.
		///	</summary>
		autoHide: true
	},
	
	_create: function () {
		this.element.addClass("ui-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
		this._previewWrapper(this.options.allowPreview);
		this.element.data('preview.wijcalendar', false);
	},

	_init: function () {
		if (this.options.popupMode){
			var po = {autoHide: !!this.options.autoHide}
			if (this.options.beforePopup) { po.showing = this.options.beforePopup; }
			if (this.options.afterPopup) { po.shown = this.options.afterPopup; }
			if (this.options.beforeClose) { po.hidding = this.options.beforeClose; }
			
			var self = this;
			po.hidden = function(data){
				self.element.removeData("lastdate.wijcalendar");
				if (self.options.afterClose) { self.options.afterClose.call(data); }
			};
			
			this.element.wijpopup(po);
		}
		
		this._getSelectedDates();
		this._getDisabledDates();
		this._resetWidth();
		this.refresh();
		this.element.width(this.element.width()+2);
	},
	
	destroy: function () {
		$.Widget.prototype.destroy.apply(this, arguments);
		this.close();
		this.element.html("");
		this.element.removeClass("ui-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-datepicker-multi");
		
		var self = this;
		$.each( [ "preview", "disableddates", "selecteddates", "dragging", "lastdate", "animating" ], function( i, prefix ) {
				self.element.removeData( prefix + ".wijcalendar" );
			});
		
		this._previewWrapper(false);
	},

	_setOption: function (key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		
		switch(key){
			case "showWeekDays":
			case "showWeekNumbers":
			case "showTitle":
			case "showOtherMonthDays":
			case "selectionMode":
				this.unSelectAll();
				this._resetWidth();
				this.refresh();
			break;
			
			case "culture":
				this.refresh();
			break
			
			case "allowPreview":
				this._previewWrapper(value);
				this.refresh();
			break;

			case "monthCols":
				this._resetWidth();
				this.refresh();
			break;
			
			case "autoHide":
				this.element.wijpopup({autoHide: this.options.autoHide});
			break;
			
			case "selectedDates":
				this._getSelectedDates().setDates(value);
				this.refresh();
			break;
			
			case "disabledDates":
				this._getDisabledDates().setDates(value);
				this.refresh();
			break;
		}
	},
	
	_previewWrapper: function(add){
		if (add){
			if (!this.element.parent().hasClass('ui-wijcalendar-preview-wrapper')){
				this.element.wrap("<div class='ui-wijcalendar-preview-wrapper ui-helper-clearfix'></div>");
			}
		}else{
			if (this.element.parent().hasClass('ui-wijcalendar-preview-wrapper')){
				this.element.unwrap();
			}
		}
	},
	
	_isRTL: function(){
		return !!this._getCulture().isRTL;
	},
	
	refresh: function () {
		/// <summary>Refresh the calendar.</summary>
		this.element.html(this._getCalendarHtml());
		this.element[(this._isRTL() ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
		this._bindEvents();
	},
	
	refreshDate: function (date) {
		/// <summary>Refresh a single date.</summary>
		if (!this._monthViews) { return; }
		if (date < this._groupStartDate || date > this._groupEndDate) { return; }
		$.each(this._monthViews, function(){
			this._refreshDate(date);
		});
	},
	
	getDisplayDate: function () {
		/// <summary>Gets the valid display date.</summary>
		var d = this.options.displayDate ? this.options.displayDate : new Date();
		if (wijDateOps.isSameDate(d, new Date(1900, 0, 1))) { d = new Date(); }
		
		return d;
	},

	getSelectedDate: function(){
		/// <summary>Gets the current selected date.</summary>
		var dates = this.options.selectedDates;
		return (!dates || dates.length == 0) ? null : dates[0];
	},

	selectDate: function (date) {
		/// <summary>
		///  Select a date by code.
		/// </summary>
		/// <param name="date" type="Date">The date to be selected.</param>
		date = new Date(date);
		if (this._getDisabledDates().contains(date)) { return; }
		if (date < this.options.minDate || date > this.options.maxDate)	{ return; }
		
		this._getSelectedDates().add(date);
		this.refreshDate(date);
	},
	
	unSelectDate: function (date) {
		/// <summary>
		///  Unselect a date by code.
		/// </summary>
		/// <param name="date" type="Date">The date to be removed from the selectedDates collection.</param>
		date = new Date(date);
		if (this._getDisabledDates().contains(date)) { return; }
		if (date < this.options.minDate || date > this.options.maxDate)	{ return; }
		
		this._getSelectedDates().remove(date);
		this.refreshDate(date);
	},

	unSelectAll: function () {
		/// <summary>Unselect all by code.</summary>
		var dates = this.options.selectedDates;
		if (dates && dates.length > 0) {
			this._getSelectedDates().clear();
			for (var i = 0; i < dates.length; i++) {
				this.refreshDate(dates[i]);
			}
		}
	},
	
	_slideToDate: function (date) {
		if (wijDateOps.isSameMonth(this.getDisplayDate(), date)) { return; }
	
		var visible = this.element.is(":visible");
		if (this.options.duration <= 0 || !visible) {
			this.refresh();
		}
		else {
			var data = {};
			this._trigger('beforeSlide', null, data);
			if (data.cancel) { return; }
		
			if (this._isSingleMonth()){
				this._playSlideAnimation(date);
			}else{
				this._playMmSlideAnimation(date);
			}
		}
	},
	
	isPopupShowing: function () {
		/// <summary>Determines whether the calendar is in popup state.</summary>
		return !!this.options.popupMode ? this.element.wijpopup('isVisible') : false;
	},

	popup: function(position){
		/// <summary>Pops up the calendar at specifies position.</summary>
		/// <param name="position" type="Object">The position object accepts by the jQuery Position plugin.</param>
		this.refresh();
		this.element.wijpopup('show', position);
	},
	
	popupAt: function(x, y){
		/// <summary>Pops up the calendar at the X/Y position to the document.</summary>
		/// <param name="x" type="Number">X offset.</param>
		/// <param name="y" type="Number">Y offset.</param>
		this.refresh();
		this.element.wijpopup('showAt', x, y);
	},
	
	close: function(){
		/// <summary>Close the calendar if is it in popup state.</summary>
		if (this.isPopupShowing()) {
			this.element.wijpopup('hide');
		}
	},

	_getCulture: function(name) {
		return $.findClosestCulture(name || this.options.culture);
	},
	
	_getDates: function(token){
		var name = token.toLowerCase() + ".wijcalendar";
		var dates = this.element.data(name);
		if (dates === undefined){
			dates = new wijDateCollection(this, token);
			this.element.data(name, dates);
		}
		return dates;
	},
	
	_getDisabledDates: function(){
		return this._getDates('disabledDates');
	},
	
	_getSelectedDates: function(){
		return this._getDates('selectedDates');
	},
	
	onDayMouseDown: function (e) {
		e.preventDefault(); 
		e.stopPropagation();
		
		var o = this.options, self = this;
		if (e.which != 1) { return; }
		var date = this._getCellDate(e.currentTarget);
		if (date === undefined) { return; }
		if (!o.selectionMode.day) { return; }
		
		var data = {date: date}
		this._trigger("beforeSelect", null, data);
		if (data.cancel) { return; }
		
		if (!o.selectionMode.days || (!e.metaKey && !e.shiftKey)) { this.unSelectAll(); }
		
		if (!!o.selectionMode.days && e.shiftKey && this.element.data("lastdate.wijcalendar")) {
			this._selectRange(this.element.data("lastdate.wijcalendar"), date);
		}
		else {
			this.element.data("lastdate.wijcalendar", date);
			this.selectDate(date);
		}
		
		this._trigger('afterSelect', null, data);
		this._trigger('selectedDatesChanged', null, {dates: [date]});
	
		if (!!o.selectionMode.days){
			this.element.data('dragging.wijcalendar', true);
			$(document.body).bind("mouseup." + this.widgetName, function(){
				$(document.body).unbind("mouseup." + self.widgetName);
				self.element.data('dragging.wijcalendar', false);
			});
		}
	},
	
	onDayClicked: function (e) {
		var date = this._getCellDate(e.currentTarget);
		if (date === undefined) { return false; }
		if (!this.options.selectionMode.day) { return false; }
	
		if (this.isPopupShowing()) {
			this.close();
		}else{
			if ($(e.currentTarget).hasClass('ui-datepicker-other-month')){
				this._slideToDate(date);
			}
		}
		
		return false;
	},
	
	onDayMouseEnter: function (e) {
		e.currentTarget.state = 'hover';
		this._refreshDayCell(e.currentTarget);
		
		if (!!this.element.data('dragging.wijcalendar')){
			var date = this._getCellDate(e.currentTarget);
			if (date === undefined) { return; }
			
			this.unSelectAll();
			this._selectRange(this.element.data("lastdate.wijcalendar"), date, true);
		}
	},
	
	onDayMouseLeave: function (e) {
		e.currentTarget.state = 'normal';
		this._refreshDayCell(e.currentTarget);
	},
	
	_selectRange: function(start, end, bymouse){
		if (start !== undefined && start !== new Date(1900, 1, 1)) {
			var minDate = start;
			var maxDate = end;
			if (start > end) {
				maxDate = start;
				minDate = end;
			}
			while (true) {
				if (minDate > maxDate) {
					break;
				}
				this.selectDate(minDate);
				minDate = wijDateOps.addDays(minDate, 1);
			}
			if (!bymouse) {
				this.element.removeData("lastdate.wijcalendar");
			}
		}
		else {
			this.selectDate(start);
		}
	},
	
	_getCellDate:function(c){
		var d = $(c).attr('date');
		return (d === undefined) ? d : new Date(d);
	},
	
	_getParentTable: function (c) {
		var parents = $(c).parents('table');
		return (parents.length == 0) ? undefined : parents.get(0);
	},

	_initMonthSelector: function (ms) {
		if ($(ms).data('cells') !== undefined)	{ return; }
		
		var tokens = ms.id.split('_');
		if (tokens[tokens.length - 1] !== 'ms') {
			throw Error.create('not a monthview');
		}
		var monthID = (tokens.slice(0, tokens.length - 1)).join('_');
		var monthTable = this._getParentTable(ms);
		var cells = [];
		if (monthTable) {
			if (monthTable.id !== monthID) {
				throw Error.create('not a monthview');
			}
			for (var i = 0; i < monthTable.rows.length; i++) {
				var row = monthTable.rows[i];
				for (var j = 0; j < row.cells.length; j++) {
					var td = row.cells[j];
					if (td) {
						var dt = $(td).attr('daytype');
						if (dt === undefined) { continue; }
						if ($(td).find('a').hasClass('ui-priority-secondary')) { continue; }
						if (this._isSelectable(parseInt(dt))) {
							cells[cells.length] = td;
						}
					}
				}
			}
		}
		
		$(ms).data('cells', cells);
	},
	
	onMonthSelectorClicked: function (e) {
		this._initMonthSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');
		
		this.element.removeData("lastdate.wijcalendar");
		this.unSelectAll();
		var selDates = [];
		for (var i = 0; i < cells.length; i++) {
			var c = cells[i];
			var d = $(c).attr('date');
			if (d === undefined) { continue; }
			var date = new Date(d);
			this.selectDate(date);
			selDates[selDates.length] = date;
		}
		
		this._trigger('selectedDatesChanged', null, {dates: selDates});
		if (this.isPopupShowing()) {
			this.close();
		}
		
		return false;
	},
	
	onMonthSelectorMouseEnter: function (e) {
		this._initMonthSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');

		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i]
			this.onDayMouseEnter(e);
		}
	},
	
	onMonthSelectorMouseLeave: function (e) {
		this._initMonthSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');
		
		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i]
			this.onDayMouseLeave(e);
		}
	},
	
	_initWeekDaySelector: function (wd) {
		if ($(wd).data('cells') !== undefined)	{ return; }
		
		var tokens = wd.id.split('_');
		if (tokens[tokens.length - 2] !== 'cs') {
			throw Error.create('not a column');
		}
		var colIndex = parseInt(tokens[tokens.length - 1]);
		var monthID = (tokens.slice(0, tokens.length - 2)).join('_');
		var monthTable = this._getParentTable(wd);
		var cells = [];
		if (monthTable) {
			if (monthTable.id !== monthID) {
				throw Error.create('not a column');
			}
			var i = 0;
			if (!this._isSingleMonth())	{ i++; }
			if (this.options.showWeekDays) { i++; }
			for (; i < monthTable.rows.length; i++) {
				var tr = monthTable.rows[i];
				if (colIndex < tr.cells.length) {
					var td = tr.cells[colIndex];
					if (td) {
						var dt = $(td).attr('daytype');
						if (dt === undefined) { continue; }
						if ($(td).find('a').hasClass('ui-priority-secondary')) { continue; }
						if (this._isSelectable(parseInt(dt))) {
							cells[cells.length] = td;
						}
					}
				}
			}
		}
		
		$(wd).data('cells', cells);
	},
	
	onWeekDayClicked: function (e) {
		this._initWeekDaySelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');
		
		this.unSelectAll();
		var selDates = [];
		for (var i = 0; i < cells.length; i++) {
			var c = $(cells[i]);
			var d = c.attr('date');
			if (d === undefined) { continue; }
			var date = new Date(d);
			this.selectDate(date);
			selDates[selDates.length] = date;
		}
		
		this._trigger('selectedDatesChanged', null, {dates: selDates});
		if (this.isPopupShowing()) {
			this.close();
		}
		
		return false;
	},
	
	onWeekDayMouseEnter: function (e) {
		this._initWeekDaySelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');

		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i]
			this.onDayMouseEnter(e);
		}
	},
	
	onWeekDayMouseLeave: function (e) {
		this._initWeekDaySelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');

		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i]
			this.onDayMouseLeave(e);
		}
	},
	
	_initWeekNumberSelector: function (wn) {
		if ($(wn).data('cells') !== undefined) { return; }

		var tokens = wn.id.split('_');
		if (tokens[tokens.length - 2] !== 'rs') {
			throw Error.create('not a row');
		}
		var rowIndex = parseInt(tokens[tokens.length - 1]);
		var monthID = (tokens.slice(0, tokens.length - 2)).join('_');
		var monthTable = this._getParentTable(wn);
		var cells = [];
		if (monthTable) {
			if (monthTable.id !== monthID) {
				throw Error.create('not a row');
			}
			var tr = monthTable.rows[rowIndex];
			if (tr) {
				var i = 0;
				if (this.options.showWeekNumbers) { i++; }
				for (; i < tr.cells.length; i++) {
					var td = tr.cells[i];
					if (td) {
						var dt = $(td).attr('daytype');
						if (dt === undefined) { continue; }
						if ($(td).find('a').hasClass('ui-priority-secondary')) { continue; }
						if (this._isSelectable(parseInt(dt))) {
							cells[cells.length] = td;
						}
					}
				}
			}
		}
		
		$(wn).data('cells', cells);
	},
	
	onWeekNumberClicked: function (e) {
		this._initWeekNumberSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');
		this.unSelectAll();
		var selDates = [];
		for (var i = 0; i < cells.length; i++) {
			var c = $(cells[i]);
			var d = c.attr('date');
			if (d === undefined) { continue; }
			var date = new Date(d);
			this.selectDate(date);
			selDates[selDates.length] = date;
		}
		
		this._trigger('selectedDatesChanged', null, {dates: selDates});
		if (this.isPopupShowing()) {
			this.close();
		}
		
		return false;
	},
	
	onWeekNumberMouseEnter: function (e) {
		this._initWeekNumberSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');
		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i];
			this.onDayMouseEnter(e);
		}
	},
	
	onWeekNumberMouseLeave: function (e) {
		this._initWeekNumberSelector(e.currentTarget);
		var cells = $(e.currentTarget).data('cells');			
		for (var i = 0; i < cells.length; i++) {
			e.currentTarget = cells[i];
			this.onDayMouseLeave(e);
		}
	},
	
	_isAnimating: function () {
		return !!this.element.data('animating.wijcalendar');
	},
	
	onPreviewMouseEnter: function (e) {
		if (!!this.element.data('previewContainer')) { return; }
		if (this._isAnimating()) { return; }
	
		var btn = $(e.currentTarget);
		var btnId = btn.attr('id');
		if (btnId === undefined) { return; }
	
		var mainDate = this.getDisplayDate();
		var months = this.options.monthCols * this.options.monthRows;
		if (btnId === "prevPreview") { months = -months; }
		
		this.options.displayDate = wijDateOps.addMonths(mainDate, months);
		this.element.data('preview.wijcalendar', true);
		
		var previewContainer = $('<div/>');
		previewContainer.appendTo(document.body);
		previewContainer.hide();
		previewContainer.addClass('ui-wijcalendar ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all');
		previewContainer.html(this._getCalendarHtml());

		this.options.displayDate = mainDate;
		this.element.data('preview.wijcalendar', false);
		this._createMonthViews();
		
		previewContainer.wijpopup({
			showEffect: 'slide',
			showOptions:{direction: (btnId === 'prevPreview' ? 'right' : 'left')},
			hideEffect: 'slide',
			hideOptions:{direction: (btnId === 'prevPreview' ? 'right' : 'left')}
		});
		previewContainer.wijpopup('show', {
			my: (btnId === 'prevPreview' ? 'right top' : 'left top'),
			at: (btnId === 'prevPreview' ? 'left top' : 'right top'),
			of: btn
		});

		this.element.data('previewContainer', previewContainer);
	},
	
	onPreviewMouseLeave: function (e) {
		var btn = $(e.currentTarget);
		var btnId = btn.attr('id');
		if (btnId === undefined) { return; }
		
		var previewContainer = this.element.data('previewContainer');
		if (previewContainer){
			if (previewContainer.wijpopup('isAnimating')) {
				var self = this;
				window.setTimeout(function () {self.onPreviewMouseLeave(e)}, 200);
			}else{
				previewContainer.wijpopup('hide');
				this.element.removeData('previewContainer');
			}
		}
	},
	
	_resetWidth: function(){
		if (!this._myGrid){
			this.element.css('height', '');
			if (this.options.monthCols > 1){
				this.element.css('width', 17*this.options.monthCols + 'em');
				this.element.addClass('ui-datepicker-multi');
			}
			else{
				this.element.css('width', '');
				this.element.removeClass('ui-datepicker-multi');
			}
		}
	},
	
	_playMmSlideAnimation: function(toDate){
		var w = this.element.width(),
		h = this.element.height();
		this.element.height(h);
		
		var date = this.getDisplayDate();
		this.element.wrapInner("<div class='ui-wijcalendar-multi-aniwrapper'></div>");
		var curContent = this.element.find('>:first-child').width(w).height(h);

		var newContent = curContent.clone(false);
		newContent.hide();
		
		this.options.displayDate = toDate;
		this._createMonthViews();
		newContent.html(this._getMonthGroupHtml());
		newContent.appendTo(this.element);
		
		var direction = this.options.direction || 'horizontal';
		var goNext = toDate > date;
		
		var calendar = this;
		this.element.data('animating.wijcalendar', true);
		curContent.effect('slide', 
			{
				mode: 'hide',
				direction: direction == 'horizontal' ? (goNext ? 'left' : 'right') : (goNext ? 'up' : 'down'), 
				easing: this.options.easing || 'easeOutBack', 
				duration: this.options.duration || 500
			}, 
			
			function(){
				curContent.remove();
			});
			
		newContent.effect('slide', 
			{
				direction: direction == 'horizontal' ? (goNext ? 'right' : 'left') : (goNext ? 'down' : 'up'), 
				easing: this.options.easing || 'easeOutBack', 
				duration: this.options.duration || 500
			}, 
			
			function(){
				while(newContent.parent().is('.ui-wijcalendar-multi-aniwrapper')){
					newContent.parent().replaceWith(newContent);
				}
					
				newContent.replaceWith(newContent.contents());
				calendar.element.height('');
				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
				calendar._trigger('afterSlide');
			});
	},
	
	_playSlideAnimation: function(toDate){
		if (!this._isSingleMonth()) { return; }
		
		var date = this.getDisplayDate();
		var curTable = this.element.find('.ui-datepicker-calendar'), wrapper, slideContainer;
		
		if (curTable.parent().is('.ui-wijcalendar-aniwrapper')){
			wrapper = curTable.parent();
		}else{
			wrapper = $.effects.createWrapper(curTable).css({overflow:'hidden'});
			wrapper.removeClass('ui-effects-wrapper');
			wrapper.addClass('ui-wijcalendar-aniwrapper');
		}
		
		if (wrapper.parent().is('.ui-wijcalendar-aniwrapper')){
			slideContainer = wrapper.parent();
		}else{
			slideContainer = $.effects.createWrapper(wrapper).css({overflow:'hidden'});
			slideContainer.removeClass('ui-effects-wrapper');
			slideContainer.addClass('ui-wijcalendar-aniwrapper');
		}
		
		var yearStep = 1;
		if (this._myGrid){
			switch (this._myGrid.gridType) {
					case "month":
						yearStep = 1;
						break;
					case "year":
						yearStep = 10;
						break;
					case "decade":
						yearStep = 100;
						break;
				}
		}
		
		var direction = this.options.direction || 'horizontal';
		var goNext = toDate > date;
		var months = new Array();
		months[months.length] = toDate;
		var w = curTable.outerWidth(),
		h = curTable.outerHeight();
		
		if (direction == 'horizontal'){
			curTable.width(w).css('float', goNext ? 'left' : 'right');
			wrapper.width((months.length + 1) * w);
			wrapper.css('left', goNext ? 0 : -months.length * w).css('position', 'absolute');
		}else{
			wrapper.width(w);
			wrapper.css('top', goNext ? 0 : -months.length * h).css('position', 'absolute');
			wrapper.height((months.length + 1) * h);
		}
		
		var calendar = this;
		$.each(months, function(index, date){
			if (calendar._myGrid === undefined){
				var mv = new wijMonthView(calendar, date);
				if (direction == 'horizontal'){
					$(mv.getHtml(true)).width(w).css('float', goNext ? 'left' : 'right').appendTo(wrapper);
				}else{
					$(mv.getHtml(true)).appendTo(wrapper);
				}
			}else{
				if (direction == 'horizontal'){
					$(calendar._myGrid.getHtml(date, true)).width(w).height(h).css('float', goNext ? 'left' : 'right').appendTo(wrapper);
				}else{
					$(calendar._myGrid.getHtml(date, true)).height(h).appendTo(wrapper);
				}
			}
		});
		
		this.options.displayDate = toDate;
		if (this._myGrid === undefined){
			this._createMonthViews();
		}
		this._refreshTitle();
		
		this.element.data('animating.wijcalendar', true);
		wrapper.effect('slide', 
			{
				mode: 'hide',
				direction: direction == 'horizontal' ? (goNext ? 'left' : 'right') : (goNext ? 'up' : 'down'), 
				easing: this.options.easing || 'easeOutBack', 
				distance: (direction == 'horizontal' ? w : h) * months.length, 
				duration: this.options.duration || 500
			}, 
			
			function(){
				curTable = wrapper.children(':last');
				while(curTable.parent().is('.ui-wijcalendar-aniwrapper')){
					curTable.parent().replaceWith(curTable);
				}
				curTable.css({float: '', width: ''});
				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
				calendar._trigger('afterSlide');
			});
	},
	
	onTitleClicked: function () {
		if (!this.options.allowQuickPick || !this._isSingleMonth()) { return; }
		if (this._isAnimating()) { return; }
		
		if (this._myGrid === undefined) {
			this._myGrid = new wijMyGrid(this);
		}
		else {
			switch(this._myGrid.gridType){
				case "month":
					this._myGrid.gridType = "year";
					break;
					
				case "year":
					this._myGrid.gridType = "decade";
					break;
					
				case "decade":
					return;
					break;
			}
		}
		
		this._refreshTitle();
		this.element.width(this.element.width()).height(this.element.height());
		
		var curTable = this.element.find('.ui-datepicker-calendar'), wrapper, container;
		var w = curTable.outerWidth(), h = curTable.outerHeight();
		
		if (curTable.parent().is('.ui-wijcalendar-aniwrapper')){
			wrapper = curTable.parent();
		}else{
			wrapper = $.effects.createWrapper(curTable).css({overflow:'hidden'})
				.removeClass('ui-effects-wrapper')
				.addClass('ui-wijcalendar-aniwrapper');
		}
		
		if (wrapper.parent().is('.ui-wijcalendar-aniwrapper')){
			container = wrapper.parent();
		}else{
			container = $.effects.createWrapper(wrapper).css({overflow:'hidden'})
				.removeClass('ui-effects-wrapper')
				.addClass('ui-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
		}
		
		var nextTable = $(this._myGrid.getHtml(true))
			.css({position:'absolute', top:0, left:0, opacity:0})
			.appendTo(container)
			.height(h);
		
		var selIndex = this._myGrid.getSelectedIndex();
		var row = Math.floor(selIndex / 4);
		var col = selIndex - (row * 4);

		var toWidth = w / 4;
		var toHeight = h/ 3;
		
		var toBounds = {
			left: toWidth * col,
			top: toHeight * row,
			width: toWidth,
			height: toHeight
		};
		
		curTable.width("100%").height("100%");
		wrapper.css({border: 'solid 1px #cccccc'});
		
		this.element.data('animating.wijcalendar', true);
		
		var calendar = this;
		wrapper.effect('size', 
			{
				to: toBounds,
				duration: this.options.duration || 500
			},
			function(){
				wrapper.remove();
			}
		);
		
		nextTable.animate(
			{
				opacity: 1
			},
			this.options.duration || 500,
			function(){
				nextTable.css({position:'', top:'', left:'', filter: ''});
				while(nextTable.parent().is('.ui-wijcalendar-aniwrapper')){
					nextTable.parent().replaceWith(nextTable);
				}

				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);
	},
	
	onMyGridClicked: function (e) {
		if (this._myGrid === undefined) { return false; }
		if (this._isAnimating()) { return false; }
		
		var cell = $(e.currentTarget);
		var index = parseInt(cell.attr('index'));
		if (this._myGrid.gridType !== "month") {
			if (!index || index === 11)	{ return false; }
		}
		
		if (!cell.hasClass('ui-state-active')) { this._myGrid.select(index); }
		
		if (this._myGrid.gridType === "decade") {
			this._myGrid.gridType = "year";
		}
		else {
			if (this._myGrid.gridType === "year") {
				this._myGrid.gridType = "month";
			}
			else {
				this._myGrid = undefined;
			}
		}
		
		this._refreshTitle();
		
		var curTable = this.element.find('.ui-datepicker-calendar'),
		wrapper,
		container;
		
		var w = curTable.outerWidth(), h = curTable.outerHeight();
		
		if (curTable.parent().is('.ui-wijcalendar-aniwrapper')){
			container = curTable.parent();
		}else{
			container = $.effects.createWrapper(curTable).css({overflow:'hidden'})
				.removeClass('ui-effects-wrapper')
				.addClass('ui-wijcalendar-aniwrapper')
				.width(w)
				.height(h);
		}

		var bounds = $.extend({}, cell.position(), {width: cell.width(), height: cell.height()});
		var content = "";
		if (this._myGrid === undefined){
			this._createMonthViews();
			var date = this.getDisplayDate();
			var mv = this._getMonthView(date);
			content = mv.getHtml(true);
		}else{
			content = this._myGrid.getHtml(true)
		}
		
		var nextTable = $(content).height(h).appendTo(container);
		wrapper = $.effects.createWrapper(nextTable).css({overflow:'hidden'})
			.removeClass('ui-effects-wrapper')
			.addClass('ui-wijcalendar-aniwrapper')
			.css($.extend(bounds, {border: 'solid 1px #cccccc', position:'absolute'}));
			
		var calendar = this;
		this.element.data('animating.wijcalendar', true);
		wrapper.animate(
			{
				left: 0,
				top: 0,
				width:w,
				height:h
			},
			this.options.duration || 500,
			function(){
			}
		);
		
		curTable.animate(
			{
				opacity: 0
			},
			this.options.duration || 500,
			function(){
				curTable.remove();

				while(nextTable.parent().is('.ui-wijcalendar-aniwrapper')){
					nextTable.parent().replaceWith(nextTable);
				}
					
				if (calendar._myGrid === undefined){
					calendar.element.width('').height('');
				}
				
				calendar._bindEvents();
				calendar.element.data('animating.wijcalendar', false);
			}
		);
		
		return false;
	},
	
	onMyGridMouseEnter: function (e) {
		if (this._myGrid === undefined) { return; }
		
		var cell = $(e.currentTarget);
		var index = parseInt(cell.attr('index'));
		if (this._myGrid.gridType !== "month" && (index < 0 || index > 11))	{ return; }
		cell.addClass("ui-state-hover");
	},
	
	onMyGridMouseLeave: function (e) {
		if (this._myGrid === undefined) { return; }
		
		var cell = $(e.currentTarget);
		var index = parseInt(cell.attr('index'));
		if (this._myGrid.gridType !== "month" && (index < 0 || index > 11))	{ return; }
		cell.removeClass("ui-state-hover");
	},

	_bindEvents: function (){
		if (!this.element.data('preview.wijcalendar') && !this.options.disabled){
			this.element.find('div .ui-wijcalendar-navbutton').unbind().bind('mouseout', function(){
				var el = $(this);
				el.removeClass('ui-state-hover');
				if (el.hasClass('ui-datepicker-next-hover')){
					el.removeClass('ui-datepicker-next-hover');
				}else if (el.hasClass('ui-datepicker-prev-hover')) {
					el.removeClass('ui-datepicker-prev-hover');
				}
			}).bind('mouseover', function(){
				var el = $(this);
				el.addClass('ui-state-hover');
				if (el.hasClass('ui-datepicker-next')){
					el.addClass('ui-datepicker-next-hover');
				}else if (el.hasClass('ui-datepicker-prev')) {
					el.addClass('ui-datepicker-prev-hover');
				}
			}).bind('click', $.proxy(this.onNavButtonClicked, this));
			
			this.element.find(".ui-datepicker-title").unbind().bind('mouseout', function(){
				$(this).removeClass('ui-state-hover');
			}).bind('mouseover', function(){
				$(this).addClass('ui-state-hover');
			}).bind('click', $.proxy(this.onTitleClicked, this));
			
			this.element.find(".ui-wijcalendar-prevpreview-button, .ui-wijcalendar-nextpreview-button").unbind('mouseenter').unbind('mouseleave').bind({
				"mouseenter": $.proxy(this.onPreviewMouseEnter, this),
				"mouseleave": $.proxy(this.onPreviewMouseLeave, this)
				});

			if (this._myGrid === undefined){
				this.element.find(".ui-wijcalendar-day-selectable").unbind().bind({
					"click": $.proxy(this.onDayClicked, this),
					"mouseenter": $.proxy(this.onDayMouseEnter, this),
					"mouseleave": $.proxy(this.onDayMouseLeave, this),
					"mousedown": $.proxy(this.onDayMouseDown, this)
					});
				if (!!this.options.selectionMode.month){
					this.element.find(".ui-wijcalendar-monthselector").unbind().bind({
						"click": $.proxy(this.onMonthSelectorClicked, this),
						"mouseenter": $.proxy(this.onMonthSelectorMouseEnter, this),
						"mouseleave": $.proxy(this.onMonthSelectorMouseLeave, this)
						});
				}
				if(!!this.options.selectionMode.weekDay){
					this.element.find(".ui-datepicker-week-day, .ui-datepicker-week-end").unbind().bind({
						"click": $.proxy(this.onWeekDayClicked, this),
						"mouseenter": $.proxy(this.onWeekDayMouseEnter, this),
						"mouseleave": $.proxy(this.onWeekDayMouseLeave, this)
						});
				}
				if (!!this.options.selectionMode.weekNumber) {
					this.element.find(".ui-wijcalendar-week-num").unbind().bind({
						"click": $.proxy(this.onWeekNumberClicked, this),
						"mouseenter": $.proxy(this.onWeekNumberMouseEnter, this),
						"mouseleave": $.proxy(this.onWeekNumberMouseLeave, this)
						});
				}
			}else{
				this.element.find(".ui-wijcalendar-day-selectable").unbind().bind({
					"click": $.proxy(this.onMyGridClicked, this),
					"mouseenter": $.proxy(this.onMyGridMouseEnter, this),
					"mouseleave": $.proxy(this.onMyGridMouseLeave, this)
					});
			}
		}
	},

	_isSelectable: function (dayType) {
		return !(dayType & (wijDayType.outOfRange | wijDayType.disabled));
	},
	
	_getCellClassName: function (dayType, date, previewMode) {
		var cssCell = '';
		var cssText = 'ui-state-default'
		
		var allowSelDay = (!!this.options.selectionMode.day || !!this.options.selectionMode.days);
		previewMode = previewMode || false;
		if (!previewMode && !this.options.disabled && allowSelDay && this._isSelectable(dayType)) {
			cssCell += " ui-wijcalendar-day-selectable";
		}

		if ((dayType & wijDayType.weekEnd)) {
			cssCell += ' ui-datepicker-week-end';
		}
		if ((dayType & wijDayType.otherMonth)) {
			cssCell += ' ui-datepicker-other-month';
			cssText += ' ui-priority-secondary';
		}
		if ((dayType & wijDayType.outOfRange)) {
			cssCell += ' ui-wijcalendar-outofrangeday';
			cssText += ' ui-priority-secondary';
		}
		if ((dayType & wijDayType.gap)) {
			cssCell += ' ui-wijcalendar-gap';
		}else{
			if ((dayType & wijDayType.disabled)) {
				cssCell += ' ui-datepicker-unselectable';
				cssText += ' ui-state-disabled';
			}
			if ((dayType & wijDayType.today)) {
				cssCell += ' ui-datepicker-days-cell-over ui-datepicker-today'
				cssText += ' ui-state-highlight';
			}
			if ((dayType & wijDayType.selected) && 
				((dayType & (wijDayType.outOfRange | wijDayType.disabled)) === 0)) {
				cssCell += ' ui-datepicker-current-day';
				cssText += ' ui-state-active';
			}
			if ((dayType & wijDayType.gap)) {
				cssCell += ' ui-wijcalendar-gap';
			}
			if ((dayType & wijDayType.custom)) {
				cssCell += ' ui-wijcalendar-customday';
				var customDay = this.getCustomDay(date);
				if (customDay && customDay.className) {
					cssCell += ' ' + customDay.className;
				}
			}
		}
		
		return {cssCell: cssCell, cssText: cssText};
	},
	
	onNavButtonClicked: function(e){
		if (this._isAnimating()) { return false; }

		var step = 1;
		var btnId = $(e.currentTarget).attr('id');
		var date = this.getDisplayDate();
		var nextDate = date;
		if (this._myGrid === undefined) {
			step = btnId.indexOf('quick') >=0 ? this.options.quickNavStep : 1;
			step = btnId.indexOf('next') >= 0 ? step * 1 : step * -1;
			step = step * this.options.monthRows * this.options.monthCols;
			nextDate = wijDateOps.addMonths(date, step);
		}
		else {
			step = btnId.indexOf('next') >= 0 ? 1 : -1;
			switch (this._myGrid.gridType) {
				case "month":
					nextDate = wijDateOps.addYears(date, step);
					break;
				case "year":
					nextDate = wijDateOps.addYears(date, step * 10);
					break;
				case "decade":
					nextDate = wijDateOps.addYears(date, step * 100);
					break;
			}
		}
		
		this._slideToDate(nextDate);
		return false
	},
	
	_getMonthGroupHtml: function () {
		var date = this.getDisplayDate(), mv;
		if (this._isSingleMonth()){
			mv = this._getMonthView(date);
			mv.showPreview = this.options.allowPreview && !this.element.data('preview.wijcalendar') && !this.options.disabled;
			return mv.getHtml();
		}
		
		var width = 100 / this.options.monthCols + '%';
		var hw = new htmlTextWriter();
		for (var r = 0; r < this.options.monthRows; r++) {
			for (var c = 0; c < this.options.monthCols; c++) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-datepicker-group' + (c==0 ? ' ui-datepicker-group-first' : '') + (c==this.options.monthCols-1 ? ' ui-datepicker-group-last' : ''));
				hw.writeAttribute('style', 'width:' + width);
				hw.writeTagRightChar();
				mv = this._getMonthView(date);
				mv.showPreview = false;
				hw.write(mv.getHtml());
				hw.writeEndTag('div');
				date = wijDateOps.addMonths(date, 1);
			}
								
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-datepicker-row-break');
			hw.writeTagRightChar();
			hw.writeEndTag('div');
		}
		
		return hw.toString();
	},
	
	_getCalendarHtml: function () {
		this._createMonthViews();
		var hw = new htmlTextWriter();
		hw.write(this._getMonthGroupHtml());
		
		return hw.toString();
	},
	
	_getMonthID: function (date) {
		return date.getFullYear() + '_' + (date.getMonth() + 1);
	},
	
	_createMonthViews: function () {
		this._monthViews = {};
		var monthID = '';
		var date = this.getDisplayDate();
		for (var row = 0; row < this.options.monthRows; row++) {
			for (var col = 0; col < this.options.monthCols; col++) {
				monthID = this._getMonthID(date);
				this._monthViews[monthID] = new wijMonthView(this, date);
				
				if (row == 0){
					if (col == 0){					
						this._monthViews[monthID].isFirst = true;
					}
						
					if (col == this.options.monthCols - 1){
						this._monthViews[monthID].isLast = true;
					}
				}
				date = wijDateOps.addMonths(date, 1);
			}
		}
		date = this.getDisplayDate();
		monthID = this._getMonthID(date);
		var mv = this._monthViews[monthID];
		if (mv) {
			this._groupStartDate = mv.getStartDate();
		}
		var count = this.options.monthRows * this.options.monthCols;
		if (count > 1) {
			date = wijDateOps.addMonths(date, count - 1);
			monthID = this._getMonthID(date);
			mv = this._monthViews[monthID];
		}
		if (mv) {
			this._groupEndDate = mv.getEndDate();
		}
	},
	
	_getMonthView: function (date) {
		var monthID = this._getMonthID(date);
		return this._monthViews[monthID];
	},
	
	_renderTo: function (id) {
		var div = $(id);
		if (div) { div.html(this._getCalendarHtml()); }
	},
	
	_getId: function(){
		return this.element.attr("id");
	},

	_getChildElement: function (id) {
		var child = this.element.find('[id*=\'' + id + '\']');
		return child.length === 0 ? undefined : child;
	},

	_refreshDayCell: function (dayCell) {
		var d = $(dayCell);
		if (d.attr("state") === undefined)	{ d.attr("state", 'normal'); }
		if (d.attr("daytype") === undefined) { return; }
		if (d.attr("date") === undefined) { return; }
		
		var dayType = parseInt(d.attr("daytype"));
		var date = new Date(d.attr("date"));
		d.attr('className', this._getCellClassName(dayType, date).cssCell);
		var txt = d.find('a');
		if (txt.length > 0){
			txt.toggleClass("ui-state-hover", d.attr("state") === 'hover');
			txt.toggleClass("ui-state-active", ((dayType & wijDayType.selected) != 0));
		}
	},
	
	_isSingleMonth: function () {
		return this.options.monthCols * this.options.monthRows === 1;
	},

	_splitString: function (s, sep, count) {
		if (count === undefined) {
			return s.split(sep);
		}
		var ret = [];
		var arr = s.split(sep);
		for (var i = 0; i < arr.length; i++) {
			if (i >= count) {
				ret[count - 1] = ret[count - 1] + sep + arr[i];
			}
			else {
				ret.push(arr[i]);
			}
		}
		return ret;
	},
	
	_getNavButtonHtml: function (id, cls, imgClass, tooltip) {
		var hw = new htmlTextWriter();
		hw.writeBeginTag('a');
		hw.writeAttribute('id', id);
		hw.writeAttribute('class',  cls);
		hw.writeAttribute('href',  '#');
		if (tooltip) { hw.writeAttribute('title', tooltip); }
		hw.writeTagRightChar();
		hw.writeBeginTag('span');
		hw.writeAttribute('class',  imgClass);
		hw.writeTagRightChar();
		if (tooltip) { hw.write(tooltip); }
		hw.writeEndTag('span');
		hw.writeEndTag('a');
		return hw.toString();
	},
	
	_getTitleText: function (monthDate) {
		if (this._myGrid !== undefined) {
			return this._myGrid.getTitle();
		}else{
			var d = monthDate || this.getDisplayDate(),
			f = this.options.titleFormat || 'MMMM yyyy',
			data = {date: d, format: f, title: this._formatDate(f,  d)};
			this._trigger('title', null, data);
			return data.title;
		}
	},
	
	_refreshTitle: function(){
		this.element.find('.ui-datepicker-title').html(this._getTitleText());
	},
	
	_fillTitle: function(hw, date){
		hw.writeBeginTag('div');
		hw.writeAttribute('class', 'ui-datepicker-title ui-wijcalendar-title ui-state-default ui-corner-all');
		hw.writeTagRightChar();
		hw.write(this._getTitleText(date));
		hw.writeEndTag('div');
	},

	_getHeaderHtml: function (monthDate, prevButtons, nextButtons) {
		var previewMode = !!this.element.data('preview.wijcalendar');
		var buttons = previewMode ? 'none' : (this._isSingleMonth() ? this.options.navButtons : 'default');
		var isRTL = this.element.is('.ui-datepicker-rtl');
		var hw = new htmlTextWriter();
		if (buttons === 'quick'){
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-widget-header ui-wijcalendar-header ui-helper-clearfix ui-corner-all');
			hw.writeTagRightChar();
			if (!!prevButtons) { hw.write(this._getNavButtonHtml('quickprev', 'ui-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-seek-' + (isRTL ? 'next' : 'prev'), this.options.quickPrevTooltip.replace('#', this.options.quickNavStep))); }
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-datepicker-header ui-wijcalendar-header-inner');
			hw.writeTagRightChar();
			if (!!prevButtons) { hw.write(this._getNavButtonHtml('prev', 'ui-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'), this.options.prevTooltip)); }
			this._fillTitle(hw, monthDate);
			if (!!nextButtons) { hw.write(this._getNavButtonHtml('next', 'ui-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'), this.options.nextTooltip)); }
			hw.writeEndTag('div');
			if (!!nextButtons) { hw.write(this._getNavButtonHtml('quicknext', 'ui-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-seek-' + (isRTL ? 'prev' : 'next'), this.options.quickNextTooltip.replace('#', this.options.quickNavStep))); }
			hw.writeEndTag('div');
		}else{
			hw.writeBeginTag('div');
			hw.writeAttribute('class', 'ui-datepicker-header ui-widget-header ui-datepicker-header ui-helper-clearfix ui-corner-all');
			hw.writeTagRightChar();
			
			if (buttons != 'none' && !!prevButtons){
				hw.write(this._getNavButtonHtml('prev', 'ui-wijcalendar-navbutton ui-datepicker-prev ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w'), this.options.prevTooltip));
			}
			this._fillTitle(hw, monthDate);
			
			if (buttons != 'none' && !!nextButtons){
				hw.write(this._getNavButtonHtml('next', 'ui-wijcalendar-navbutton ui-datepicker-next ui-corner-all', 'ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e'), this.options.nextTooltip));
			}
			hw.writeEndTag('div');
		}
		
		return hw.toString();
	},
	
	_formatDate: function (format, date) {
		if (!wijDateOps.getTicks(date)) {
			return '&nbsp;';
		}
		
		return $.format(date, format, this._getCulture());
	}
});
	
	
if (wijMonthView === undefined){
	var wijMonthView = function(calendar, displayDate){
		this.calendar = calendar;
		
		if (displayDate === undefined || 
			wijDateOps.isSameDate(displayDate, new Date(1900, 0, 1))) { displayDate = new Date(); }
		
		this.displayDate = displayDate;
		this.id = this.calendar._getId() + '_' + this.calendar._getMonthID(displayDate);
		this.isFirst = false;
		this.isLast = false;
		this.showPreview = false;
		this.culture = this.calendar._getCulture();
		this._calcDates(this.displayDate);
	};
	
	wijMonthView.prototype = {
		_calcDates: function (date) {
			var daysInMonth = wijDateOps.getDaysInMonth(date);
			this._startDateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
			this._endDateInMonth = wijDateOps.addDays(this._startDateInMonth, daysInMonth - 1);
			this._startDate = wijDateOps.getWeekStartDate(this._startDateInMonth, this.culture.calendar.firstDay);
			this._endDate = wijDateOps.addDays(this._startDate, this.calendar.options.dayRows * this.calendar.options.dayCols - 1);
		},
		
		_isFirstMonth: function () {
			var date = this.calendar.getDisplayDate();
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},
		
		_isLastMonth: function () {
			var date = this.calendar.getDisplayDate();
			date = new Date(date.getFullYear(), date.getMonth(), 1);
			date = wijDateOps.addMonths(date, this.calendar.options.monthCols * this.calendar.options.monthRows - 1);
			return wijDateOps.isSameMonth(this._startDateInMonth, date);
		},
		
		getStartDate: function () {
			return this._startDate;
		},
		
		getEndDate: function () {
			return this._endDate;
		},
		
		_getMonthDate: function () {
			if (this._startDateInMonth === undefined) { this._calcDates(this.getDisplayDate());}
			return this._startDateInMonth;
		},
		
		_setMonthDate: function (date) {
			this._calcDates(date);
		},
		
		_getWeekDayText: function (day, format) {
			format = format || "short";
			var days = this.culture.calendar.days;
			var text = '';
			switch (format) {
				case "full":
					text = days.names[day];
					break;
				case "firstLetter":
					text = days.names[day].substring(0, 1);
					break;
				case "abbreviated":
					text = days.namesAbbr[day];
					break;
				default:
					text = days.namesShort[day];
					break;
			}
			return text;
		},
		
		_getRowCount: function () {
			var o = this.calendar.options;
			return o.showWeekDays ? o.dayRows + 1 : o.dayRows;
		},
	
		_getColCount: function () {
			var o = this.calendar.options;
			return o.showWeekNumbers ? o.dayCols + 1 : o.dayCols;
		},
		
		_getDayType: function (date) {
			var o = this.calendar.options;
			var dayType = wijDayType.general;
			var dow = date.getDay();
			var weekEnd = dow === 6 || dow === 0; // Saturday or Sunday
			var outOfRange = date < o.minDate || date > o.maxDate;
			var otherMonth = date < this._startDateInMonth || date > this._endDateInMonth;
			var isDisabled = outOfRange || this.calendar._getDisabledDates().contains(date);
			var isSelected = this.calendar._getSelectedDates().contains(date);
			var today = new Date();
			var isToday = wijDateOps.isSameDate(date, today);
			var isCustom = false;
			if (weekEnd) {
				dayType |= wijDayType.weekEnd;
			}
			if (isToday) {
				dayType |= wijDayType.today;
			}
			if (isDisabled) {
				dayType |= wijDayType.disabled;
			}
			if (otherMonth) {
				dayType |= wijDayType.otherMonth;
			}
			if (outOfRange) {
				dayType |= wijDayType.outOfRange;
			}
			if (isSelected) {
				dayType |= wijDayType.selected;
			}
			if (isCustom) {
				dayType |= wijDayType.custom;
			}
			if (otherMonth && !o.showOtherMonthDays) {
				dayType |= wijDayType.gap;
			}
			return dayType;
		},
		
		_refreshDate: function (date) {
			if (date < this._startDate || date > this._endDate)	{ return; }
			var o = this.calendar.options;
			var offset = (Math.round(Math.abs(date - this._startDate) / (24 * 60 * 60 * 1000)));
			var row = Math.floor(offset / this.calendar.options.dayCols),
			col = Math.floor(offset % this.calendar.options.dayCols);
			if (o.showWeekNumbers)	{ col++; }
			if (o.showWeekDays)	{ row++; }

			var tbl = $("#" + this.id, this.calendar.element).get(0);
			if (tbl) {
				if (row < tbl.rows.length) {
					var r = tbl.rows[row];
					if (col < r.cells.length) {
						var dayCell = r.cells[col];
						var dayType = this._getDayType(date);
						dayCell.daytype = dayType.toString();
						this.calendar._refreshDayCell(dayCell);
					}
				}
			}
		},
	
		_fillDayCell: function (hw, date, previewMode) {
			var o = this.calendar.options;
			var text = date.getDate().toString();
			if (o.showDayPadding) {
				if (text.length === 1) {
					text = '0' + text;
				}
			}
			var tooltip = this.calendar._formatDate(o.toolTipFormat || "dddd, MMMM dd, yyyy", date);
			var dayType = this._getDayType(date);
			if ((dayType & wijDayType.custom)) {
				var customDay = this._getCustomDay(date);
				if (customDay && customDay.template) {
					text = customDay.template;
				}
			}

			hw.writeBeginTag('td');
			hw.writeAttribute('daytype', (dayType).toString());
			hw.writeAttribute('title', tooltip);
			hw.writeAttribute('date', date.toDateString());
			
			var css = this.calendar._getCellClassName(dayType, date, previewMode);
			hw.writeAttribute('class', css.cssCell);
			hw.writeTagRightChar();
			
			if ((dayType & wijDayType.gap)) {
				hw.write('&#160;');
			}else if ((dayType & wijDayType.custom)) {
				hw(text);
			}else{
				hw.writeBeginTag('a');
				hw.writeAttribute('class', css.cssText);
				hw.writeAttribute('href', '#');
				hw.writeTagRightChar();
				hw.write(text);
				hw.writeEndTag('a');
			}
			
			hw.writeEndTag('td');
		},
		
		getHtml: function (tableOnly) {
			tableOnly = !!tableOnly;
			var o = this.calendar.options;
			var previewMode = !!this.calendar.element.data('preview.wijcalendar');
			var hw = new htmlTextWriter();
			if (!tableOnly && o.showTitle) {
				hw.write(this.calendar._getHeaderHtml(this._startDateInMonth, this.isFirst, this.isLast));
			}
			
			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-wijcalendar-prevpreview-button');
				hw.writeAttribute('id', 'prevPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.prevPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}
			
			hw.writeBeginTag('table');
			hw.writeAttribute('id', this.id);
			hw.writeAttribute('class', 'ui-datepicker-calendar ui-wijcalendar-table');
			hw.writeAttribute('summary', this.calendar._getTitleText(this._startDateInMonth));
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			if (o.showWeekDays) {
				hw.writeFullBeginTag('thead');
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_ms');
					hw.writeAttribute('class', 'ui-datepicker-week-col ui-wijcalendar-monthselector'  + (!!o.selectionMode.month ? ' ui-wijcalendar-selectable' : ''));
					hw.writeTagRightChar();
					
					if (!!o.selectionMode.month && !previewMode && !o.disabled){
						hw.writeBeginTag('a');
						hw.writeAttribute('class', 'ui-icon ui-icon-triangle-1-se');
						hw.writeSelfClosingTagEnd();
					}else{
						hw.write('Wk');
					}
						
					hw.writeEndTag('th');
				}
				
				var dayOfWeek = this._startDate.getDay();
				var weekStartDate = this._startDate;
				for (var i = 0; i < o.dayCols; i++) {
					var weekEnd = dayOfWeek === 6 || dayOfWeek === 0;
					var colIndex = i + ((o.showWeekNumbers) ? 1 : 0);
					var txt = this._getWeekDayText(dayOfWeek, o.weekDayFormat);
					var fullTxt = this._getWeekDayText(dayOfWeek, "full");
					hw.writeBeginTag('th');
					hw.writeAttribute('id', this.id + '_cs_' + colIndex);
					hw.writeAttribute('class', (weekEnd ? 'ui-datepicker-week-end' : 'ui-datepicker-week-day') + (!!o.selectionMode.weekDay ? ' ui-wijcalendar-selectable' : ''));
					hw.writeTagRightChar();
					
					hw.writeBeginTag('span');
					hw.writeAttribute('title', fullTxt);
					hw.writeTagRightChar();
					hw.write(txt);
					hw.writeEndTag('span');
					
					hw.writeEndTag('th');
					dayOfWeek = ((dayOfWeek + 1) % 7);
					weekStartDate = wijDateOps.addDays(weekStartDate, 1);
				}
				hw.writeEndTag('tr');
				hw.writeEndTag('thead');
			}

			hw.writeFullBeginTag('tbody');
			var date = this._startDate;
			var wnDate = this._startDateInMonth;
			for (var i = 0; i < o.dayRows; i++) {
				hw.writeBeginTag('tr');
				hw.writeTagRightChar();
				if (o.showWeekNumbers) {
					var rowIndex = i + ((o.showWeekDays) ? 1 : 0);
					if (!this.calendar._isSingleMonth()) {
						rowIndex++;
					}
					hw.writeBeginTag('td');
					hw.writeAttribute('id', this.id + '_rs_' + rowIndex);
					hw.writeAttribute('class', 'ui-datepicker-week-col ui-wijcalendar-week-num' + (!!o.selectionMode.weekNumber ? ' ui-wijcalendar-selectable' : ''));
					hw.writeTagRightChar();
					var weekNumber = wijDateOps.getWeekOfYear(wnDate, o.calendarWeekRule, this.culture.calendar.firstDay);
					hw.write(weekNumber);
					hw.writeEndTag('td');
					wnDate = wijDateOps.addDays(wnDate, o.dayCols);
				}
				for (var j = 0; j < o.dayCols; j++) {
					this._fillDayCell(hw, date, previewMode);
					date = wijDateOps.addDays(date, 1);
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('tbody');
			hw.writeEndTag('table');
			
			if (!tableOnly && !previewMode && this.showPreview) {
				hw.writeBeginTag('div');
				hw.writeAttribute('class', 'ui-wijcalendar-nextpreview-button');
				hw.writeAttribute('id', 'nextPreview');
				hw.writeTagRightChar();
				hw.writeBeginTag('a');
				hw.writeAttribute('class', 'ui-icon ui-icon-grip-dotted-vertical');
				hw.writeAttribute('href', '#');
				hw.writeAttribute('title', o.nextPreviewTooltip);
				hw.writeAttribute('onclick', 'return false;');
				hw.writeTagRightChar();
				hw.write('&#160;');
				hw.writeEndTag('a');
				hw.writeEndTag('div');
			}
			
			return hw.toString();
		}
	}
};

if (wijDateCollection === undefined){
	var wijDateCollection = function (calendar, optionName) {
		this._calendar = calendar;
		this._optionName = optionName;
		this._normalize();		
	}

	wijDateCollection.prototype = {
		_calendar: null,
		_optionName: 'selectedDates',
		
		getDates: function () {
			if (this._calendar.options[this._optionName] === undefined){
				this._calendar.options[this._optionName] = [];
			}
				
			return this._calendar.options[this._optionName];
		},
		
		setDates: function(dates){
			this._calendar.options[this._optionName] = dates;
			this._normalize();
		},
		
		getCount: function () {
			return this.getDates().length;
		},
		
		clear: function () {
			this.setDates([]);
		},
		
		add: function (date) {
			this.addRange(date, date);
		},
		
		remove: function (date) {
			this.removeRange(date, date);
		},
		
		indexOf: function (date) {
			if (!this.getCount()) { return -1; }
			return this._findRangeBound(date, true, false);
		},
		
		contains: function (date) {
			return this.indexOf(date) !== -1;
		},
		
		removeRange: function (start, end) {
			if (!this.getCount()) { return; }
			var startIndex = this._findRangeBound(start, false, true);
			var endIndex = this._findRangeBound(end, false, false);
			if (startIndex < 0 || endIndex < 0)	{ return; }
			if (startIndex > endIndex) { return; }
			var dates = this.getDates();
			if (dates[end] > end){return;}
			var startSlice = (!startIndex) ? [] : dates.slice(0, startIndex);
			var endSlice = endIndex >= (dates.length - 1) ? [] : dates.slice(endIndex+1);
			this.setDates(startSlice.concat(endSlice));
		},
		
		addRange: function (start, end) {
			this.removeRange(start, end);
			var dates = this.getDates();
			var insertIndex = this._findRangeBound(start, false, true);
			var startSlice = (!insertIndex) ? [] : dates.slice(0, insertIndex);
			var endSlice = dates.slice(insertIndex);
			var midSlice = [];
			start = wijDateOps.getDate(start);
			end = wijDateOps.getDate(end);
			for (var curDate = start; curDate <= end; curDate = wijDateOps.addDays(curDate, 1)) {
				midSlice[midSlice.length] = curDate;
			}
			this.setDates(startSlice.concat(midSlice.concat(endSlice)));
		},
		
		_findRangeBound: function (date, exact, isStart) {
			var dates = this.getDates();
			var low = 0;
			var hi = dates.length;
			var index;
			while (low < hi) {
				index = (low + hi) >> 1;
				if (wijDateOps.isSameDate(date, dates[index])) {
					return index;
				}
				if (date < dates[index]) {
					hi = index;
				}
				else {
					low = index + 1;
				}
			}
			if (exact) {
				return -1;
			}
			return (isStart) ? low : hi;
		},
		
		_normalize: function(){
			//Normalize the array
			var dates = this._calendar.options[this._optionName];
			if ($.isArray(dates)){
				var newDates = $.map(dates, function(d, i){
					return new Date(d);
				});
				
				this._calendar.options[this._optionName] = newDates.sort(function(a, b){ return a.getTime() - b.getTime();});
			}
		}
	}
};

if (wijMyGrid === undefined){
	var wijMyGrid = function (calendar) {
		this.gridType = "month";
		this.calendar = calendar;
		this.culture = calendar._getCulture();
	};
	
	wijMyGrid.prototype = {
		gridType: "month",
		selectedIndex: 0,
		calendar: null,
		culture: undefined,
		
		select: function (index) {
			var date = this.calendar.getDisplayDate();
			var year = date.getFullYear();
			var offset = index - this.selectedIndex;
			switch (this.gridType) {
				case "month":
					date.setMonth(index);
					break;
				case "year":
					date.setFullYear(year + offset);
					break;
				case "decade":
					date.setFullYear(year + (offset * 10));
					break;
			}
			
			this.calendar.options.displayDate = date;
		},
		
		getSelectedIndex: function () {
			var date = this.calendar.getDisplayDate();
			var year = date.getFullYear();
			var startYear = Math.floor(year / 10) * 10 - 1;
			var startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
				case "month":
					return date.getMonth();
				case "year":
					return year - startYear;
				case "decade":
					return Math.floor((year - startDecade) / 10);
			}
			return 0;
		},
		
		getTitle: function () {
			var date = this.calendar.getDisplayDate(),
			year = date.getFullYear(),
			startYear = Math.floor(year / 10) * 10 - 1,
			startDecade = Math.floor(year / 100) * 100 - 10;
			switch (this.gridType) {
				case "month":
					return year.toString();
				case "year":
					return (startYear + 1) + " - " + (startYear + 10);
				case "decade":
					return (startDecade + 10) + " - " + (startDecade + 109);
			}
			return '';
		},
		
		getHtml: function (date, tableOnly) {
			if (date === undefined){
				date = this.calendar.getDisplayDate();
			}else{
				if (typeof(date) === 'boolean'){
					tableOnly = date;
					date = this.calendar.getDisplayDate();
				}
			}
				
			tableOnly = !!tableOnly;
			var o = this.calendar.options;
			var hw = new htmlTextWriter();
			if (o.showTitle && !tableOnly) {
				hw.write(this.calendar._getHeaderHtml(null, true, true));
			}
		
			var rows = 3, cols = 4;
			var height = 100 / rows + '%';
			height = '30%';
			hw.writeBeginTag('table');
			hw.writeAttribute('class', 'ui-datepicker-calendar ui-wijcalendar-mygrid');
			hw.writeAttribute('onselectstart', 'return false;');
			hw.writeTagRightChar();
			var year = date.getFullYear();
			var startYear = Math.floor(year / 10) * 10 - 1;
			var startDecade = Math.floor(year / 100) * 100 - 10;
			
			var ms = this.culture.calendar.months;
			for (var i = 0; i < rows; i++) {
				hw.writeBeginTag('tr');
				hw.writeAttribute('height', height);
				hw.writeTagRightChar();
				for (var j = 0; j < cols; j++) {
					var index = i * 4 + j;
					var selected = false;
					var outofRange = false;
					var cellText = '';
					var v;
					switch (this.gridType) {
						case "month":
							if (date.getMonth() === index) {
								selected = true;
							}
							cellText = ms.namesAbbr[index];
							outofRange = date < o.minDate || date > o.maxDate;
							
							break;
						case "year":
							if (index === 0 || index === 11) { outofRange = true; }
							v = startYear + index;
							if (v < o.minDate.getFullYear() || v > o.maxDate.getFullYear()){
								outofRange = true;
							}else{
								selected = (year === v);
							}
							cellText = v.toString();
							break;
						case "decade":
							if (index === 0 || index === 11) { outofRange = true; }
							v = startDecade + index * 10;
							if (v < o.minDate.getFullYear() || v > o.maxDate.getFullYear()){
								outofRange = true;
							}else{
								selected = (year >= v && year < (v + 10));
							}
							cellText = v.toString() + '-<br/>' + (v + 9).toString();
							break;
					}
					
					if (selected) { this.selectedIndex = index; }

					var cls = 'ui-datepicker-week-day';
					if (outofRange) {
						cls = cls + ' ui-datepicker-other-month  ui-priority-secondary ui-datepicker-unselectable';
					}else{
						if (!o.disabled) {
							cls += " ui-wijcalendar-day-selectable";
						}
					}

					cls += " " + 'ui-state-default' + (outofRange ? ' ui-state-disabled' : '') + (selected ? ' ui-state-active ui-state-highlight' : '');
					
					hw.writeBeginTag('td');
					hw.writeAttribute('class', cls);
					//hw.writeAttribute('width', width);
					hw.writeAttribute('index', index.toString());
					hw.writeAttribute('other', outofRange.toString());
					hw.writeTagRightChar();
					
					hw.writeBeginTag('a');
					hw.writeAttribute('href', '#');
					hw.writeTagRightChar();
					hw.write(cellText);
					hw.writeEndTag('a');
					hw.writeEndTag('td');
				}
				hw.writeEndTag('tr');
			}
			hw.writeEndTag('table');
			return hw.toString();
		}
	};
};
	

 
if (wijDateOps === undefined) {
	var wijDateOps = {};
	
	wijDateOps.addDays = function (date, days) {
		var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
		if (days) {
			if (dt.getDate() === date.getDate()) {
				dt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				dt.setTime(dt.getTime() + (days * 24 * 3600 * 1000));
			}
		}
		return dt;
	};
	
	wijDateOps.addMonths = function (date, months) {
		return new Date(date.getFullYear(), date.getMonth() + months, 1);
	};
	
	wijDateOps.addYears = function (date, years) {
		return wijDateOps.addMonths(date, years * 12);
	};
	
	wijDateOps.getDate = function (date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	};

	wijDateOps.getTicks = function (date) {
		return date.valueOf();
	};
	
	wijDateOps.isSameDate = function (date1, date2) {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
	};
	
	wijDateOps.isSameMonth = function (date1, date2) {
		return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
	};
	
	wijDateOps.getDaysInMonth = function(date) {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};
	
	wijDateOps.getWeekStartDate = function (date, firstDayOfWeek) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate() - ((date.getDay() - firstDayOfWeek + 7) % 7));
	};
	
	wijDateOps.getDayOfYear = function (date) {
		var start = new Date(date.getFullYear(), 0, 1);
		var distance = wijDateOps.getTicks(date) - wijDateOps.getTicks(start);
		var days = distance / (24 * 60 * 60 * 1000);
		return Math.floor(days) + 1;
	};
	
	wijDateOps.getFirstDayWeekOfYear = function (date, firstDayOfWeek) {
		var days = wijDateOps.getDayOfYear(date) - 1;
		var offset = date.getDay() - (days % 7);
		offset = ((offset - firstDayOfWeek) + 14) % 7;
		var weeks = ((days + offset) / 7);
		return Math.floor(weeks) + 1;
	};

	wijDateOps.getDayOfWeek = function (date, firstDayOfWeek) {
		return ((date.getDay() - firstDayOfWeek + 7) % 7);
	};
	
	wijDateOps.getWeekOfYearFullDays = function (time, rule, firstDayOfWeek, fullDays) {
		var days = wijDateOps.getDayOfYear(time) - 1;
		var offset = (wijDateOps.getDayOfWeek(time, firstDayOfWeek)) - (days % 7);
		offset = ((firstDayOfWeek - offset) + 14) % 7;
		if ((offset) && (offset >= fullDays)) {
			offset -= 7;
		}
		offset = days - offset;
		if (offset >= 0) {
			return (Math.floor(offset / 7) + 1);
		}
		return wijDateOps.getWeekOfYearFullDays(wijDateOps.addDays(time, -(days + 1)), rule, firstDayOfWeek, fullDays);
	};
	
	wijDateOps.getWeekOfYear = function (date, rule, firstDayOfWeek) {
		switch (rule) {
			case "firstDay":
				return wijDateOps.getFirstDayWeekOfYear(date, firstDayOfWeek);
			case "firstFullWeek":
				return wijDateOps.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 7);
			case "firstFourDayWeek":
				return wijDateOps.getWeekOfYearFullDays(date, rule, firstDayOfWeek, 4);
		}
		return wijDateOps.getFirstDayWeekOfYear(date, firstDayOfWeek);
	};
	
	wijDateOps.getDateToken = function (date) {
		return date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate();
	};
};

	
if (htmlTextWriter === undefined){
	var htmlTextWriter = function () {
		this._html = [];
	};
		
	htmlTextWriter.prototype = {
		_html: null,
		writeTagLeftChar: function () { this._html[this._html.length] = '<';},
		writeTagRightChar: function () { this._html[this._html.length] = '>'; },
		write: function (text) { this._html[this._html.length] = ' ' + text + ' '; },
		writeBeginTag: function (tagName) {	this._html[this._html.length] = '<' + tagName; },
		writeEndTag: function (tagName) { this._html[this._html.length] = '</' + tagName + '>';	},
		writeFullBeginTag: function (tagName) {	this._html[this._html.length] = '<' + tagName + '>'; },
		writeSelfClosingTagEnd: function () { this._html[this._html.length] = '/>'; },
		writeAttribute: function (name, value) { 
			if (value == undefined || value === null) { return; }
			this._html[this._html.length] = ' ' + name + '=\"';
			this._html[this._html.length] = value;
			this._html[this._html.length] = '\"';
		},
		
		clean: function () { this._html = []; },
		toString: function () { return this._html.join(''); }
	};
};


})(jQuery);/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Expander widget.
 * 
 * Depends:
 *  jquery-1.4.2.js
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.wijutil.js
 *  jquery.ui.wijexpander.js
 *  Non-default animations requires UI Effects Core
 *
 */
$.widget("ui.wijexpander", {
    // widget options
    options: {
        /// <summary>
        /// Determines if the widget can expand. Set this option to false if you want to disable collapse/expand ability.
        /// Default: true
        /// Type: Boolean.
        /// Code example: $("#element").wijexpander({ allowExpand: false });
        /// </summary>
        allowExpand: true,
        /// <summary>
        /// Determines the animation easing effect; set this option to false in order to disable animation.
        /// Custom easing effects require the UI Effects Core. Additional options that are available for the animation function include:
        /// expand - value of true indicates that content element must be expanded.
        /// horizontal - value of true indicates that expander is horizontally orientated (when expandDirection is left or right).
        /// content - jQuery object that contains content element to be expanded or collapsed.
        /// Default: "slide"
        /// Type: string.
        /// Code example: 
        ///        $("#expander2").wijexpander({
        ///            animated: "custom1"
        ///        });
        ///        jQuery.ui.wijexpander.animations.custom1 = function (options) {
        ///            this.slide(options, {
        ///                easing: "easeInBounce",
        ///                duration: 900
        ///            });
        ///        }
        /// </summary>
        animated: 'slide',
        /// <summary>
        /// Determines the URL to the external content. For example, http://componentone.com/ for the ComponentOne Web site.
        /// Default: ""
        /// Type: string.
        /// Code example: $("#element").wijexpander({ contentUrl: "http://componentone.com/" });
        /// </summary>
        contentUrl: "",
        /// <summary>
        /// Determines the visibility state of the content panel. If true, the content element is visible.
        /// Default: true
        /// Type: Boolean
        /// Code example: $("#element").wijexpander({ expanded: false });
        /// </summary>
        expanded: true,
        /// <summary>
        /// Determines the content expand direction. Available values are: top, right, bottom, and left. 
        /// Default: "bottom"
        /// Type: string
        /// Code example: $("#element").wijexpander({ expandDirection: "right" });
        /// </summary>
        expandDirection: "bottom"

    },
    // handle option changes:
    _setOption: function (key, value) {
        switch (key) {
            case "contentUrl":
                if (value != "") {
                    this.element.find("> .ui-widget-content").wijContent(value);
                } else {
                    this.element.find("> .ui-widget-content").html("");
                }
                break;
            case "disabled":
                if (value) {
                    this.element.addClass("ui-state-disabled");
                } else {
                    this.element.removeClass("ui-state-disabled");
                }
                break;
            case "expandDirection":
                this._handleExpandDirectionChange(value, true, this.options.expandDirection);
                break;
            case "expanded":
                if (value) {
                    this.expand();
                } else {
                    this.collapse();
                }
                return; // option value already stored inside expand/collapse method if action is not cancelled, so we need return here.
            default:
                break;
        }
        $.Widget.prototype._setOption.apply(this, arguments);

    },
    // widget creation:    
    _create: function () {
        // do not call base c1headercontentcontrol _create method here since we don't want to place c1headercontentcontrol classes on the widget element
        this.element.addClass("ui-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
        var elems = this.element.children();
        var header, content;
        header = $(elems[0]);
        content = $(elems[1]);
        if (this.options.expandDirection == "left" || this.options.expandDirection == "top") {
            header.remove();
            header.insertAfter(content);
        }
        header.addClass("ui-expander-header ui-helper-reset");
        if (header.find("> a").length == 0) {
            header.wrapInner('<a href="#"></a>');
        }
        if (header.find("> .ui-icon").length == 0) {
            $('<span class="ui-icon"></span>').insertBefore($("> a", header)[0]);
        }
        content.addClass("ui-expander-content ui-helper-reset ui-widget-content");
    },
    // widget initializtion:
    _init: function () {
        var o = this.options;
        this._handleExpandDirectionChange(o.expandDirection, false);
        if (o.contentUrl != "") {
            $(".ui-widget-content", this.element).wijContent(this.options.contentUrl);
        }
        if (!o.expanded) {
            this.element.find("> .ui-widget-content").hide();
            this.element.find("> .ui-expander-header").addClass("ui-state-default ui-corner-all").find("> .ui-icon").addClass(this._triangleIconClosed);
        } else {
            this.element.find("> .ui-expander-header").addClass("ui-state-active").addClass(this._headerCornerOpened).find("> .ui-icon").addClass(this._triangleIconOpened);
            this.element.find("> .ui-widget-content").addClass("ui-expander-content-active").addClass(this._contentCornerOpened);
        }

        if (o.disabled) {
            this.element.addClass("ui-state-disabled");
        }

        __wijReadOptionEvents(["beforeexpand", "beforecollapse", "afterexpand", "aftercollapse"], this);
        this._bindLiveEvents();
    },

    destroy: function () {
        this._unbindLiveEvents();
        this.element
			.removeClass("ui-wijexpander ui-expander ui-widget ui-helper-reset ui-expander-icons");
        //.find("> *").removeClass("ui-expander-header ui-helper-reset ui-state-active ui-corner-top ui-widget-content");
        //.removeData('wijexpander');
        $.Widget.prototype.destroy.apply(this, arguments);

    },

    _bindLiveEvents: function () {
        $(".ui-expander-header", this.element[0]).live("click.wijexpander", jQuery.proxy(this._onHeaderClick, this))
        .live("mouseenter.wijexpander", function () { $(this).addClass('ui-state-hover'); })
        .live("mouseleave.wijexpander", function () { $(this).removeClass('ui-state-hover'); })
        .live("focus.wijexpander", function () { $(this).addClass('ui-state-focus'); })
        .live("blur.wijexpander", function () { $(this).removeClass('ui-state-focus'); });
    },
    _unbindLiveEvents: function () {
        $('.ui-expander-header', this.element[0]).die(".wijexpander");
    },

    _handleExpandDirectionChange: function (newDirection, allowDOMChange, prevDirection) {
        var rightToLeft;
        var openedHeaders;
        var openedContents;
        var openedTriangles;
        var closedTriangles;
        if (prevDirection != null && prevDirection != newDirection) {
            this.element.removeClass("ui-expander-" + prevDirection);
        }
        if (allowDOMChange) {
            openedHeaders = this.element.find(".ui-expander-header." + this._headerCornerOpened);
            openedHeaders.removeClass(this._headerCornerOpened);
            openedContents = this.element.find(".ui-widget-content." + this._contentCornerOpened);
            openedContents.removeClass(this._contentCornerOpened);
            openedTriangles = this.element.find("." + this._triangleIconOpened);
            closedTriangles = this.element.find("." + this._triangleIconClosed);
            openedTriangles.removeClass(this._triangleIconOpened);
            closedTriangles.removeClass(this._triangleIconClosed);
        }
        switch (newDirection) {
            case "top":
                this._headerCornerOpened = "ui-corner-bottom";
                this._contentCornerOpened = "ui-corner-top";
                this._triangleIconOpened = "ui-icon-triangle-1-n";
                this._triangleIconClosed = "ui-icon-triangle-1-e";
                rightToLeft = true;
                this.element.removeClass("ui-helper-horizontal");
                this.element.addClass("ui-expander-top");
                break;
            case "right":
                this._headerCornerOpened = "ui-corner-left";
                this._contentCornerOpened = "ui-corner-right";
                this._triangleIconOpened = "ui-icon-triangle-1-e";
                this._triangleIconClosed = "ui-icon-triangle-1-s";
                rightToLeft = false;
                this.element.addClass("ui-helper-horizontal");
                this.element.addClass("ui-expander-right");
                break;
            case "left":
                this._headerCornerOpened = "ui-corner-right";
                this._contentCornerOpened = "ui-corner-left";
                this._triangleIconOpened = "ui-icon-triangle-1-w";
                this._triangleIconClosed = "ui-icon-triangle-1-s";
                rightToLeft = true;
                this.element.addClass("ui-helper-horizontal");
                this.element.addClass("ui-expander-left");
                break;
            default: //case "bottom":
                this._headerCornerOpened = "ui-corner-top";
                this._contentCornerOpened = "ui-corner-bottom";
                this._triangleIconOpened = "ui-icon-triangle-1-s";
                this._triangleIconClosed = "ui-icon-triangle-1-e";
                rightToLeft = false;
                this.element.removeClass("ui-helper-horizontal");
                this.element.addClass("ui-expander-bottom");
                break;
        }
        var prevIsRightToLeft = this.element.data("rightToLeft");
        this.element.data("rightToLeft", rightToLeft);

        if (allowDOMChange) {
            openedTriangles.addClass(this._triangleIconOpened);
            closedTriangles.addClass(this._triangleIconClosed);
            openedHeaders.addClass(this._headerCornerOpened);
            openedContents.addClass(this._contentCornerOpened);
        }

        if (allowDOMChange && rightToLeft != prevIsRightToLeft) {
            this.element.children(".ui-expander-header").each(function () {
                var header = $(this);
                var content;
                if (rightToLeft) {
                    content = header.next(".ui-expander-content");
                    header.remove();
                    header.insertAfter(content);
                } else {
                    content = header.prev(".ui-expander-content")
                    header.remove();
                    header.insertBefore(content);
                }
            });
        }

    },

    /*****************************
    Widget specific implementation
    ******************************/

    /** public methods */

    /// <summary>
    /// Collapse content panel.
    /// Code Example: $("#element").wijexpander("collapse");
    ///</summary>
    collapse: function () {
        var o = this.options;
        if (!o.allowExpand) {
            return;
        }
        if (this.element.hasClass("ui-state-disabled")) {
            return false;
        }
        var newEv = jQuery.Event("beforecollapse");
        this.element.trigger(newEv);
        if (newEv.isImmediatePropagationStopped()) {
            return false;
        }
        if (o.animated) {
            var animOptions = {
                expand: false,
                content: this.element.find("> .ui-widget-content"),
                complete: jQuery.proxy(function () {
                    this.element.trigger("aftercollapse");
                    this.element.find("> .ui-widget-content").css('display', '');
                }, this),
                horizontal: this.element.hasClass("ui-helper-horizontal")
            };

            var animations = $.ui.wijexpander.animations,
				duration = o.duration,
				easing = o.animated;
            if (easing && !animations[easing] && !$.easing[easing]) {
                easing = 'slide';
            }
            if (!animations[easing]) {
                animations[easing] = function (options) {
                    this.slide(options, {
                        easing: easing,
                        duration: duration || 700
                    });
                };
            }
            animations[easing](animOptions);
        } else {
            this.element.find("> .ui-widget-content").hide();
            $(this.parentNode).trigger("aftercollapse");
        }
        this.element.find("> .ui-expander-header").removeClass("ui-state-active").removeClass(this._headerCornerOpened).addClass("ui-state-default ui-corner-all").find("> .ui-icon").removeClass(this._triangleIconOpened).addClass(this._triangleIconClosed);
        this.element.find("> .ui-widget-content").removeClass("ui-expander-content-active"); //.removeClass(this._contentCornerOpened);
        this.options.expanded = false;
        return true;
    },
    /// <summary>
    /// Expand content panel.
    /// Code Example: $("#element").wijexpander("expand");
    ///</summary>
    expand: function () {
        var o = this.options;
        if (!o.allowExpand) {
            return;
        }
        if (this.element.hasClass("ui-state-disabled")) {
            return false;
        }
        var expEvent = jQuery.Event("beforeexpand");
        this.element.trigger(expEvent);
        if (expEvent.isImmediatePropagationStopped()) {
            return false;
        }
        //this.element.addClass("ui-state-expanded");
        if (o.animated) {

            var animOptions = {
                expand: true,
                content: this.element.find("> .ui-widget-content"),
                complete: jQuery.proxy(function () {
                    this.element.trigger("afterexpand");
                    this.element.find("> .ui-widget-content").css('display', '');
                }, this),
                horizontal: this.element.hasClass("ui-helper-horizontal")
            };

            var animations = $.ui.wijexpander.animations,
				duration = o.duration,
				easing = o.animated;
            if (easing && !animations[easing] && !$.easing[easing]) {
                easing = 'slide';
            }
            if (!animations[easing]) {
                animations[easing] = function (options) {
                    this.slide(options, {
                        easing: easing,
                        duration: duration || 700
                    });
                };
            }
            animations[easing](animOptions);
        } else {
            this.element.find("> .ui-widget-content").show();
            $(this.parentNode).trigger("afterexpand");
        }
        this.element.find("> .ui-expander-header").removeClass("ui-state-default ui-corner-all").addClass("ui-state-active").addClass(this._headerCornerOpened).find("> .ui-icon").removeClass(this._triangleIconClosed).addClass(this._triangleIconOpened);
        this.element.find("> .ui-widget-content").addClass("ui-expander-content-active").addClass(this._contentCornerOpened)

        this.options.expanded = true;
        return true;

    },

    /** Private methods */
    _onHeaderClick: function () {
        this.option('expanded', !this.options.expanded);
        return false;
    }

});


$.extend($.ui.wijexpander, {
    animations: {
        slide: function (options, additions) {
            options = $.extend({
                easing: "swing",
                duration: 300
            }, options, additions);
            if (options.expand) {
                options.content.stop(true, true).animate(options.horizontal ? { width: 'show', opacity: 'show'} : { height: 'show', opacity: 'show' }, options);
            } else {
                options.content.stop(true, true).animate(options.horizontal ? { width: 'hide', opacity: 'hide'} : { height: 'hide', opacity: 'hide' }, options);
            }

        }
    }
}); /*
*
* Wijmo Library 0.8.0
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
*
* Wijmo Menu widget.
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.wijutil.js
*	jquery.ui.position.js
*	jquery.ui.effects.core.js
*	jquery.ui.wijsuperpanel.js
*
*/
(function ($) {
	$.widget("ui.wijmenu", {
		options: {
			/// <summary>
			///An jQuery selector which handle to open the menu or submenu.
			///Default:"".
			///Type:String.
			///Remark:If set to the menu item(the li element) then when it is clicked(if the triggerEvent set to 'click') show ubmenu.  If set to a element out of the menu ,click(if the triggerEvent set to 'click') it,open the menu. 
			///</summary>
			trigger: '',
			/// <summary>
			///Specifies the event to show the menu.
			///Default:"click".
			///Type:String.
			///Remark:The value can be seted to 'click','mouseenter','dbclick','rtclick'
			///</summary>
			triggerEvent: 'click',
			///<summary>
			///Location and Orientation of the menu,relative to the button/link userd to open it. Configuration for the Position Utility,Of option excluded(always configured by widget).Collision also controls collision detection automatically too.
			///Default:{}.
			///Type:Object.
			///</summary>
			position: {},
			///<summary>
			///Sets showAnimated and hideAnimated if not specified individually.
			///Default:"slide".
			///Type:String.
			///Remark:Users standard animation setting syntax from other widgets.
			///</summary>
			animated: 'slide',
			///<summary>
			///Determines the animationn used during show.
			///Default:"slide".
			///Type:String.
			///Remark:This option uses the standard animation setting syntax from other widgets.
			///</summary>
			showAnimated: 'slide',
			/// <summary>
			///Determines the animation used during hide.
			///Default:"slide".
			///Type:String.
			///Remark:Users standard animation setting syntax from other widgets.
			///</summary>
			hideAnimated: 'slide',
			///<summary>
			///Determines the speed to show/hide the menu in milliseconds. Sets showDuration and hideDuration if they are not specified.
			///Default:400.
			///Type:Number.
			///</summary>
			duration: 400,
			///<summary>
			///Determines the speed to show the menu,in milliseconds.
			///Default:400.
			///Type:Number.
			///</summary>
			showDuration: 400,
			///<summary>
			///Determines the speed to hide the menu,in milliseconds.
			///Default:400.
			///Type:Number.
			///</summary>
			hideDuration: 400,
			///<summary>
			///Defines the behavior of the submenu whether it is a popup menu or an iPod-style navigation list.
			///Default:"flyout".
			///Type:String.
			///Remark:The value should be "flyout" or "sliding".
			///</summary>
			mode: 'flyout',
			///<summary>
			///This option specifies a hash value that sets to superpanel options when a superpanel is created.
			///Default:null.
			///Type:Object.
			///</summary>
			superPanelOptions: null,
			///<summary>
			/// Defines whether items are checkable.
			///Default:false.
			///Type:Boolean.
			///</summary>
			checkable: false,
			///<summary>
			///Controls the root menus orientation. All submenus are vertical regardless of the orientation of the root menu.
			///Default:"horizontal".
			///Type:String.
			///Remark:The value should be "horizontal" or "vertical".
			///</summary>
			orientation: 'horizontal',
			///<summary>
			///Determines the i-Pod-style menu's maximum height.
			///Default:200.
			///Type:Number.
			///Remark:This option only used in i-pod style menu. when the menu's heiget largger than this value,menu show scroll bar.
			///</summary>
			maxHeight: 200,
			/// <summary>
			///Determines whether the i-Pod menu shows a back link or a breadcrumb header in the menu.
			///Default:true.
			///Type:Boolean.
			///</summary>
			backLink: true,
			///<summary>
			///Sets the text of the back link.
			///Default:"Back".
			///Type:String.
			///</summary>
			backLinkText: 'Back',
			///<summary>
			///Sets the text of the top link.
			///Default:"All".
			///Type:String.
			///</summary>
			topLinkText: 'All',
			///<summary>
			///Sets the top breadcrumb's default Text.
			///Default:"Choose an option".
			///Type:String.
			///</summary>
			crumbDefaultText: 'Choose an option'
		},
		_create: function () {
			//before crete menu items,hide the menu. to avoid show wild uls in the page before init the menu.
			this.element.hide();
			var self = this;
			var o = self.options;
			self._setAnimationOptions();

			self.refresh();

			if (!self.options.input) {
				self.options.input = self.element.attr("tabIndex", 0);
			}
			self.options.input.bind("keydown.wijmenu", function (event) {
				if (self.options.disabled) {
					return;
				}
				var activeItem = self.element.data("activeItem");
				switch (event.keyCode) {
					case $.ui.keyCode.PAGE_UP:
						self.previousPage(event);
						event.preventDefault();
						event.stopImmediatePropagation();
						break;
					case $.ui.keyCode.PAGE_DOWN:
						self.nextPage(event);
						event.preventDefault();
						event.stopImmediatePropagation();
						break;
					case $.ui.keyCode.UP:
						self.previous(event);
						event.preventDefault();
						event.stopImmediatePropagation();
						break;
					case $.ui.keyCode.DOWN:
						self.next(event);
						event.preventDefault();
						event.stopImmediatePropagation();
						break;
					case $.ui.keyCode.RIGHT:
						if (activeItem) {
							var ul = activeItem.children("ul");
							if (ul.length > 0 && ul.is(":visible")) {
								self.activate(event, ul.children(":first"));
							}
						}
						break;
					case $.ui.keyCode.LEFT:
						var thisUl = activeItem.parent();
						var parentLi = thisUl.parent();
						if (parentLi.is("li")) {
							self.activate(event, parentLi);
						}
						break;
					case $.ui.keyCode.ENTER:
						self.select();
						if (activeItem.length > 0) {
							if (o.mode === "flyout" && activeItem.has("ul").length > 0) {
								self._showFlyoutSubmenu(activeItem, activeItem.find("ul:first"));
							}
							else {
								activeItem.children(":first").trigger("click");
							}
						}
						event.preventDefault();
						event.stopImmediatePropagation();
						break;
				}
			});
		},
		_destroy: function () {
			var o = this.options;
			var self = this;
			if (o.mode === "flyout") {
				self._killFlyout();
			}
			else {
				self._killDrilldown();
			}
			self._killmenuItems();
			self._killtrigger();
			self.element.unwrap().unwrap();
			self.element.removeData("domObject").removeData("topmenu").removeData("activeItem").removeData("firstLeftValue");
		},
		destroy: function () {
			/// <summary>Removes the wijmenu functionality completely. This returns the element back to its pre-init state.</summary>
			this._destroy();
			$.Widget.prototype.destroy.apply(this);
		},
		activate: function (event, item) {
			/// <summary>Actives an menu item by deactivating the current item,scrolling the new one into view,if necessary,making it the active item,and triggering a focus event.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to active</param>
			this.deactivate(event);
			if (this.options.mode === "sliding") {
				var scrollContainer = this.element.data("domObject").scrollcontainer;
				scrollContainer.wijsuperpanel("scrollChildIntoView", item);
			}
			var active = item.eq(0)
			.children(":first")
			.addClass("ui-state-focus")
			.attr("id", "ui-active-menuitem")
			.end();
			this.element.data("activeItem", active);
			this._trigger("focus", event, { item: item });
		},
		deactivate: function (event) {
			/// <summary>Clears the current selection.This method is useful when reopening a menu which previously had an item selected.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			/// <param name="item" type="jQuery object">a menu item to deactive</param>
			var active = this.element.data("activeItem");
			if (!active) {
				return;
			}
			if (!event || event.keyCode !== $.ui.keyCode.RIGHT) {
				if (active.length > 0) {
					if (this.options.mode === "flyout" && active.has("ul").length > 0) {
						this._hideCurrentSubmenu(active);
					}
				}
			}
			//console.log(active);
			active.children(":first")
			.removeClass("ui-state-focus")
			.removeAttr("id");
			this._trigger("blur");
			this.element.data("activeItem", null);
		},

		next: function (event) {
			/// <summary>Selects the next item based on the active one. Selects the first item if none is active or if the last one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("next", ".ui-wijmenu-item:first", event);
		},

		previous: function (event) {
			/// <summary>Selects the previous item based on the active one. Selects the last item if none is active or if the first one is active.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			this._move("prev", ".ui-wijmenu-item:last", event);
		},

		first: function () {
			/// <summary>Determines whether the active item is the first menu item</summary>
			/// <returns type="Boolean" />
			var active = this.element.data("activeItem");
			return active && !active.prevAll(".ui-wijmenu-item").length;
		},

		last: function () {
			/// <summary>Determines whether the active item is the last menu item</summary>
			/// <returns type="Boolean" />
			var active = this.element.data("activeItem");
			return active && !active.nextAll(".ui-wijmenu-item").length;
		},

		nextPage: function (event) {
			/// <summary>This event is similar to the next event,but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this, activeItem = self.element.data("activeItem"), parent = activeItem.parent();
			if (self.mode == "sliding" && self._hasScroll()) {
				// TODO merge with no-scroll-else
				//var activeItem = self.element.data("activeItem");
				//var parent = activeItem.parent();
				if (!activeItem || self.last()) {
					self.activate(event, parent.children(":first"));
					return;
				}
				var base = activeItem.offset().top,
				height = this.options.maxHeight,
				result = parent.children("li").filter(function () {
					//var close = $(this).offset().top - base - height + $(this).height();
					var close = height - ($(this).offset().top - base + $(this).height());
					// TODO improve approximation
					var lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});

				// TODO try to catch this earlier when scrollTop indicates the last page anyway
				if (!result.length) {
					result = parent.children(":last");
				}
				this.activate(event, result.last());
			} else {
				this.activate(event, parent.children(!activeItem || this.last() ? ":first" : ":last"));
			}
		},
		previousPage: function (event) {
			/// <summary>This event is silimlar to the previous event,but it jumps a whole page.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var self = this, activeItem = self.element.data("activeItem"), parent = activeItem.parent();
			if (self.mode == "sliding" && this._hasScroll()) {
				// TODO merge with no-scroll-else								
				if (!activeItem || this.first()) {
					this.activate(event, parent.children(":last"));
					return;
				}
				var base = activeItem.offset().top,
				height = this.options.maxHeight,
				result = parent.children("li").filter(function () {
					var close = $(this).offset().top - base + height - $(this).height();
					// TODO improve approximation
					var lineheight = $(this).height();
					return close < lineheight && close > -lineheight;
				});

				// TODO try to catch this earlier when scrollTop indicates the last page anyway
				if (!result.length) {
					result = parent.children(":first");
				}
				this.activate(event, result.first());
			} else {
				this.activate(event, parent.children(!activeItem || this.first() ? ":last" : ":first"));
			}
		},
		select: function (event) {
			/// <summary>Selects the active item,triggering the select event for that item. This event is useful for custom keyboard handling.</summary>
			/// <param name="event" type="Event">The javascript event.</param>
			var active = this.element.data("activeItem");
			this._trigger("select", event, { item: active });
			this._setCheckable();
		},

		_setCheckable: function () {
			if (this.options.checkable) {
				var item = this.element.data("activeItem");
				item.children(":first").toggleClass("ui-state-active");
			}
		},

		///set options
		_setOption: function (key, value) {
			if (this["_set_" + key]) {
				this["_set_" + key](value);
			}
			this.options[key] = value;
		},

		_set_mode: function (value) {
			this._destroy();
			this.options["mode"] = value;
			this.refresh();
		},

		_set_orientation: function (value) {
			if (this.options.mode === "flyout") {
				var menuContainer = this.element.data("domObject").menucontainer;
				menuContainer.removeClass("ui-wijmenu-vertical ui-wijmenu-horizontal").addClass("ui-wijmenu-" + value);
				this.element.children("li:has(ul)").each(function () {
					if (value === "horizontal") {
						$(this).children(".ui-wijmenu-link").find(".ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-s");
					}
					else {
						$(this).children(".ui-wijmenu-link").find(".ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
					}
				});
			}
			else {
				menuContainer.removeClass("ui-wijmenu-vertical ui-wijmenu-horizontal").addClass("ui-wijmenu-vertical");
			}
		},

		_set_triggerEvent: function (value) {
			this._killtrigger();
			this.options["triggerEvent"] = value;
			var triggerEle = $(this.options.trigger).filter(function () {
				return $(this).closest(".ui-wijmenu").length === 0;
			})
			if (triggerEle.length > 0) {
				this._initTrigger(triggerEle);
			}
			if (this.options.mode === "flyout") {
				this._killFlyout();
				this._flyout();
			}
		},

		_set_trigger: function (value) {
			this._killtrigger();
			this.options["triggerEvent"] = value;
			var triggerEle = $(this.options.trigger).filter(function () {
				return $(this).closest(".ui-wijmenu").length === 0;
			})
			if (triggerEle.length > 0) {
				this._initTrigger(triggerEle);
			}
			if (this.options.mode === "flyout") {
				this._killFlyout();
				this._flyout();
			}
		},

		_initTrigger: function (triggerEle) {
			var o = this.options;
			var event = o.triggerEvent;
			var self = this;
			if (triggerEle.is("iframe")) {
				triggerEle = $(triggerEle.get(0).contentWindow.document);
			}
			var menuContainer = self.element.data("domObject").menucontainer;
			switch (event) {
				case "click":
					triggerEle.bind("click.wijmenu", function () {
						if (o.mode !== "popup") {
							self._displaySubmenu(triggerEle, menuContainer);
						}
					})
					break;
				case "mouseenter":
					triggerEle.bind("mouseenter.wijmenu", function () {
						self._displaySubmenu(triggerEle, menuContainer);
					})
					//.mouseleave(function (e) {						
					//self._hideSubmenu(menuContainer);
					//});
					break;
				case "dblclick":
					triggerEle.bind("dblclick.wijmenu", function () {
						self._displaySubmenu(triggerEle, menuContainer);
					})
					break;
				case "rtclick":
					triggerEle.bind("contextmenu.wijmenu", function (e) {
						self._displaySubmenu(triggerEle, menuContainer);
						e.preventDefault();
					})
					break;
			}
			$(document).bind("click.wijmenudoc", function (e) {
				if (self.element.data("shown")) {
					self.element.data("shown", false);
					return;
				}
				///fixed when click the breadcrumb choose item link to show the root menu in sliding menu.
				if ($(e.target).parent().is(".wij-menu-all-lists")) {
					return;
				}
				var obj = $(e.target).closest(".ui-wijmenu");
				if (obj.length === 0) {
					if (o.mode === "sliding") {
						var breadcrumb = $(".wij-menu-breadcrumb", menuContainer);
						self._resetDrilldownMenu(breadcrumb);
					}
					self._hideSubmenu(menuContainer);
				}
			});
		},

		_killtrigger: function () {
			var o = this.options;
			if (o.trigger != '') {
				var triggerEle = $(o.trigger);
				if (triggerEle && triggerEle.length > 0) {
					triggerEle.unbind(".wijmenu");
					$(document).unbind("click.wijmenudoc");
				}
			}
		},

		_setAnimationOptions: function () {
			var o = this.options;
			var showDuration = o.showDuration;
			var hideDuration = o.hideAnimated;
			var showAnimated = o.showAnimated;
			var hideAnimated = o.hideAnimated;
			var animated = o.animated;
			var duration = o.duration;
			if (showAnimated == null) {
				o.showAnimated = animated;
			}
			if (showDuration == null) {
				o.showDuration = duration;
			}
			if (hideAnimated == null) {
				o.hideAnimated = animated;
			}
			if (hideDuration == null) {
				o.hideDuration = duration;
			}
		},
		_move: function (direction, edge, event) {
			var active = this.element.data("activeItem");
			if (!active) {
				this.activate(event, this.element.children(edge));
				return;
			}
			var next = $(active)[direction + "All"](".ui-wijmenu-item").eq(0);
			//= this.active[direction + "All"](".ui-menu-item").eq(0);
			var parent = active.parent();
			if (next.length) {
				this.activate(event, next);
			} else {
				this.activate(event, parent.children(edge));
			}
		},
		refresh: function () {
			/// <summary>Renders all non-menu-items as menuitems,called once by _create.Call this method whenever adding or replaceing items in the menu via DOM operations,for example,via menu.append("<li><a href='#'>new item</a></li>").wijmenu("refresh")</summary>
			var self = this;
			var o = self.options;
			if (self.element.data("domObject")) {
				self._destroy();
			}
			self.element.wrap("<div><div></div></div>");
			var scrollcontainer = self.element.parent();
			var menucontainer = scrollcontainer.parent();
			scrollcontainer.addClass("scrollcontainer checkablesupport");
			menucontainer.addClass("ui-widget ui-widget-content ui-wijmenu ui-corner-all ui-helper-clearfix");
			//var containerClass = "ui-wijmenu-vertical";
			if (o.orientation === "horizontal" && o.mode === "flyout") {
				menucontainer.addClass("ui-wijmenu-horizontal");
			}
			var domObject = { scrollcontainer: scrollcontainer, menucontainer: menucontainer };
			self.element.data("domObject", domObject);
			self.element.data("topmenu", true);

			var items = $("li", self.element);
			if (!self.element.hasClass("ui-wijmenu-list ui-helper-reset")) {
				self.element.addClass("ui-wijmenu-list ui-helper-reset");
			}

			items.each(function (i, n) {
				//var isFirstLevel = $(n).parent().parent().parent().is(".ui-wijmenu");
				var hasSubmenu = $(n).children("ul").length > 0;
				var li = $(n);
				var icon, link;
				if (li.children().length === 0) {
					li.addClass("ui-wijmenu-separator ui-state-default ui-corner-all");
				}
				else {
					if (li.children("a").length > 0) {
						if (!$(n).hasClass("ui-widget ui-wijmenu-item ")) {
							$(n).addClass("ui-widget ui-wijmenu-item ui-state-default ui-corner-all");
							link = $(n).children(":first").addClass("ui-wijmenu-link ui-corner-all");
							link.wrapInner("<span>").children("span").addClass("ui-wijmenu-text");
							if (hasSubmenu) {
								icon = $("<span>").addClass("ui-icon ui-icon-triangle-1-e");
								link.append(icon);
								//$(n).removeClass("ui-wijmenu-parent").addClass("ui-wijmenu-parent");
							}
							link.bind("mouseenter.wijmenu", function () {
								$(this).addClass("ui-state-hover");
							}).bind("mouseleave.wijmenu", function () {
								$(this).removeClass("ui-state-hover");
							});
							//							.bind("mousedown.wijmenu", function () {
							//								//$(this).addClass("ui-state-active");
							//							}).bind("mouseup.wijmenu", function () {
							//								//$(this).removeClass("ui-state-active");
							//							});
						}
					}
					else if (li.children("h1,h2,h3,h4,h5").length > 0) {
						li.addClass("ui-widget-header ui-corner-all");
					}
					else {
						$(n).addClass("ui-widget ui-wijmenu-item ui-state-default ui-corner-all");
						link = $(n).children(":first").addClass("ui-wijmenu-link ui-corner-all")
												.bind("mouseenter.wijmenu", function () {
													$(this).addClass("ui-state-hover");
												}).bind("mouseleave.wijmenu", function () {
													$(this).removeClass("ui-state-hover");
												});
						if (hasSubmenu) {
							icon = $("<span>").addClass("ui-icon ui-icon-triangle-1-e");
							link.append(icon);
							//$(n).removeClass("ui-wijmenu-parent").addClass("ui-wijmenu-parent");
						}
					}

				}
			});
			this.element.show();
			$("ul", self.element).each(function () {
				$(this).addClass("ui-wijmenu-list ui-widget-content ui-corner-all ui-helper-clearfix ui-wijmenu-child ui-helper-reset");
				$(this).hide();
			});
			if (this.options.mode === "flyout") {
				this._flyout();
			}
			//			else if (this.options.mode === "popup") {
			//				this._popup();
			//			}
			else {
				this._drilldown();
			}

			if (o.trigger !== "") {
				var triggerEle = $(o.trigger).filter(function () {
					return $(this).closest(".ui-wijmenu").length === 0;
				})
				if (triggerEle.length > 0) {
					menucontainer.hide();
					self._initTrigger(triggerEle);
				}
			}
		},

		_showFlyoutSubmenu: function (li, subList) {
			var self = this;
			var curList = self.element.data("currentMenuList");
			if (curList != undefined) {
				$.each(curList, function () {
					if ($(this).get(0) != li.parent().get(0)) {
						self._hideSubmenu($(this));
					}
				});
			}
			self._displaySubmenu(li.find('.ui-wijmenu-link:eq(0)'), subList);
		},

		_getItemTriggerEvent: function (item) {
			var self = this;
			var o = self.options;
			var triggerEvent = "default";
			if (o.trigger !== "") {

				if (item.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else if (self.element.is(o.trigger)) {
					triggerEvent = o.triggerEvent;
				}
				else {
					item.parents(".ui-wijmenu-parent").each(function (i, n) {
						if ($(n).is(o.trigger)) {
							triggerEvent = o.triggerEvent;
							return false;
						}
					});
					if (triggerEvent === "default") {
						var triggerEle = $(o.trigger).filter(function () {
							return $(this).closest(".ui-wijmenu").length === 0;
						})
						if (triggerEle.length > 0) {
							triggerEvent = o.triggerEvent
						}
					}
				}
			}
			item.data("triggerEvent", triggerEvent);
			return triggerEvent;
		},

		_flyout: function () {
			var container = this.element.data("domObject").menucontainer;
			var self = this;
			if (self.options.orientation === "horizontal") {
				self.element.children("li:has(ul)").each(function () {
					$(this).children(".ui-wijmenu-link").find(".ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
				});
			}
			container.find('li:has(ul)').each(function () {
				var allSubLists = $(this).find('ul');
				var li = $(this);
				var triggerEvent = self._getItemTriggerEvent(li);

				if (triggerEvent !== "default" && self.options.triggerEvent != "mouseenter") {
					li.removeClass("ui-wijmenu-parent").addClass("ui-wijmenu-parent");
					var link = $(this).find('.ui-wijmenu-link:eq(0)');
					var subList = link.next();
					switch (self.options.triggerEvent) {
						case "click":
							link.bind("click.wijmenu", function () {
								self._showFlyoutSubmenu(li, subList);
							});
							break;
						case "dblclick":
							link.bind("dblclick.wijmenu", function (e) {
								self._showFlyoutSubmenu(li, subList);
							});
							break;
						case "rtclick":
							link.bind("contextmenu.wijmenu", function (e) {
								self._showFlyoutSubmenu(li, subList);
								e.preventDefault();
							});
							break;
					}
					$(document).bind("click.wijmenu", function (e) {
						if (container.is(":animated")) {
							//return;
						}
						var obj = $(e.target).closest(".ui-wijmenu");
						if (obj.length === 0) {
							allSubLists.each(function () {
								self._hideSubmenu($(this));
							});
						}
					});
					subList.data("notClose", true);
				}
				else {
					var showTimer, hideTimer;
					li.removeClass("ui-wijmenu-parent").addClass("ui-wijmenu-parent");
					$(this).find('.ui-wijmenu-link:eq(0)').bind("mouseenter.wijmenu",
					function () {
						clearTimeout(hideTimer);
						var subList = $(this).next();
						var link = $(this);
						showTimer = setTimeout(function () {
							self._displaySubmenu(link, subList);
						}, 300);
					}).bind("mouseleave.wijmenu",
					function () {
						clearTimeout(showTimer);
						var subList = $(this).next();
						hideTimer = setTimeout(function () {
							self._hideSubmenu(subList);
						}, 400);
					});

					$(this).find('ul .ui-wijmenu-link,ul >.ui-widget-header,ul >.ui-wijmenu-separator').bind("mouseenter.wijmenu",
					function () {
						clearTimeout(hideTimer);
					}).bind("mouseleave.wijmenu",
					function () {
						//console.log(allSubLists);
						hideTimer = setTimeout(function () {
							allSubLists.each(function () {
								self._hideSubmenu($(this));
							});
							//allSubLists.hide();
						}, 500);
					});
				}
			});


			///when click the menu item hide the submenus.
			container.find(".ui-wijmenu-link").bind("click.wijmenu", function (e) {
				if ($(this).is("a")) {
					if (!(self.options.trigger !== "" && $(this).parent().data("triggerEvent")!=="default" && self.options.triggerEvent != "mouseenter")) {
						self._hideAllMenus();
					}
					else {
						var curList = self.element.data("currentMenuList");
						if (curList != undefined) {
							var item = $(this).parent();
							//var link = $(this);
							if (item.has("ul").length == 0) {
								$.each(curList, function (i, n) {
									if (curList[curList.length - 1].get(0) == item.parent().get(0)) {
										return true;
									}
									if ($(n).get(0) != item.parent().get(0)) {
										self._hideSubmenu($(this));
									}
								});
							}
						}
					}
				}
				self.activate(e, $(this).parent());
				self.select(e);
			}).bind("focusin", function (e) {
				self.activate(e, $(this).parent());
			});
		},

		_hideAllMenus: function () {
			var self = this;
			self.element.find("ul").each(function () {
				self._hideSubmenu($(this));
			});
			if (self.options.trigger !== "") {
				var container = self.element.data("domObject").menucontainer;
				if (container.is(":animated")) {
					return;
				}
				var outerTrigger = $(self.options.trigger).filter(function () {
					return $(this).closest(".ui-wijmenu").length === 0;
				})
				if (outerTrigger.length === 0) {
					return;
				}

				self._hideSubmenu(self.element.data("domObject").menucontainer);
			}
		},

		_killFlyout: function () {
			var container = this.element.data("domObject").menucontainer;
			container.find("li").each(function () {
				$(this).removeClass("ui-wijmenu-parent").unbind(".wijmenu").children(":first").unbind(".wijmenu");
			});
			$(document).unbind("click.wijmenu");
		},

		_killmenuItems: function () {
			this.element.removeClass("ui-wijmenu-list ui-helper-reset wij-menu-content ui-helper-clearfix");
			this.element.find("li").each(function () {
				var item = $(this);
				item.removeClass("ui-widget ui-wijmenu-item ui-state-default ui-corner-all ui-wijmenu-parent ui-widget-header ui-wijmenu-separator");
				var link = item.children(".ui-wijmenu-link");
				link.removeClass("ui-wijmenu-link ui-corner-all ui-state-focus ui-state-hover ui-state-active").html(link.children(".ui-wijmenu-text").html()).unbind(".wijmenu");
				item.children("ul").removeClass("ui-wijmenu-list ui-widget-content ui-corner-all ui-helper-clearfix ui-wijmenu-child ui-helper-reset")
				.show().css({ left: "", top: "", position: "" });
			});
			//this.element.data("domObject").scrollcontainer.wijsuperpanel("destroy");
			this.element.data("domObject").menucontainer.removeClass("");
		},

		_sroll: function () {
			var scroll = this.element.data("domObject").scrollcontainer;
			scroll.height(this.options.maxHeight);
			var options = this.options.superPanelOptions || {};
			scroll.wijsuperpanel(options);
		},

		_hasScroll: function () {
			var scroll = this.element.data("domObject").scrollcontainer;
			return scroll.data("wijsuperpanel").vNeedScrollBar;
		},


		_resetDrillChildMenu: function (el) {
			el.removeClass('wij-menu-scroll').removeClass('wij-menu-current').height('auto');
		},

		_checkDrillMenuHeight: function (el, mycontainer, scrollcontainer) {
			var o = this.options;
			var self = this;
			//			if (el.height() > o.maxHeight) { //el.addClass('fg-menu-scroll')
			//			};
			//el.css({ height: o.maxHeight });
			mycontainer.height(el.height());
			scrollcontainer.wijsuperpanel("option", "hScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("option", "vScroller", { scrollValue: 0 });
			scrollcontainer.wijsuperpanel("paintPanel");
			if (self._hasScroll()) {
				var fixPadding = 5;
				if (el.prev().length > 0) {
					fixPadding = el.prev().css("padding-left").replace(/px/g, "");
				}
				el.width(scrollcontainer.find(".ui-wijsuperpanel-contentwrapper:first").width() - fixPadding);
			}
		},

		_resetDrilldownMenu: function (breadcrumb) {
			var self = this;
			var o = self.options;
			var container = this.element.data("domObject").menucontainer;
			var topList = container.find('.ui-wijmenu-list:first');
			var crumbDefaultHeader = $('<li class="wij-menu-breadcrumb-text">' + o.crumbDefaultText + '</li>');
			var mycontainer = this.element.wrap("<div>").parent();
			var scrollcontainer = this.element.data("domObject").scrollcontainer;
			$('.wij-menu-current', container).removeClass('wij-menu-current');
			topList.animate({ left: 0 }, o.showDuration, function () {
				$(this).find('ul').each(function () {
					$(this).hide();
					self._resetDrillChildMenu($(this));
				});
				topList.addClass('wij-menu-current');
			});
			$('.wij-menu-all-lists', container).find('span').remove();
			breadcrumb.empty().append(crumbDefaultHeader);
			$('.wij-menu-footer', container).empty().hide();
			self._checkDrillMenuHeight(topList, mycontainer, scrollcontainer);
		},

		_drilldown: function () {
			var self = this;
			var mycontainer = self.element.wrap("<div>").parent().css("position", "relative");
			var container = self.element.data("domObject").menucontainer;
			var scrollcontainer = self.element.data("domObject").scrollcontainer;
			var o = self.options;
			var topList = container.find('.ui-wijmenu-list:first');
			var breadcrumb = $('<ul class="wij-menu-breadcrumb ui-widget-default ui-corner-all ui-helper-clearfix"></ul>');
			var crumbDefaultHeader = $('<li class="wij-menu-breadcrumb-text">' + o.crumbDefaultText + '</li>');

			var firstCrumbText = (o.backLink) ? o.backLinkText : o.topLinkText;
			var firstCrumbClass = (o.backLink) ? 'wij-menu-prev-list' : 'wij-menu-all-lists';
			var firstCrumbLinkClass = (o.backLink) ? 'ui-state-default ui-corner-all' : '';
			var firstCrumbIcon = (o.backLink) ? '<span class="ui-icon ui-icon-triangle-1-w"></span>' : '';
			var firstCrumb = $('<li class="' + firstCrumbClass + '"><a href="#" class="' + firstCrumbLinkClass + '">' + firstCrumbIcon + firstCrumbText + '</a></li>');
			container.addClass('wij-menu-ipod wij-menu-container');
			if (o.backLink) { breadcrumb.addClass('wij-menu-footer').appendTo(container).hide(); }
			else { breadcrumb.addClass('wij-menu-header').prependTo(container); };
			if (!o.backLink) {
				breadcrumb.append(crumbDefaultHeader);
			}
			topList
			.addClass('wij-menu-content wij-menu-current ui-widget-content ui-helper-clearfix')
			.css({ width: container.width() })
			.find('ul')
			.css({
				width: container.width(),
				left: container.width()
			})
			.addClass('ui-widget-content')
			//.hide();
			mycontainer.height(self.element.height());
			self._sroll();
			if (self._hasScroll()) {
				var fixPadding = 5;
				if (topList.children(":first").children(":first").length > 0) {
					fixPadding = topList.children(":first").children(":first").css("padding-left").replace(/px/g, "");
				}
				topList.width(scrollcontainer.find(".ui-wijsuperpanel-contentwrapper:first").width() - fixPadding);
			}

			self.element.data("firstLeftValue", parseFloat(topList.css('left')));
			topList.find('.ui-wijmenu-link').each(function () {
				// if the link opens a child menu:
				if ($(this).next().is('ul')) {
					$(this)
				.click(function () { // ----- show the next menu			
					var nextList = $(this).next();
					var parentUl = $(this).parents('ul:eq(0)');
					var parentLeft = (parentUl.data("topmenu")) ? 0 : parseFloat(topList.css('left'));
					var nextLeftVal = Math.round(parentLeft - parseFloat(container.width()));
					var footer = $('.wij-menu-footer', container);

					// show next menu   		
					self._resetDrillChildMenu(parentUl);
					self._checkDrillMenuHeight(nextList, mycontainer, scrollcontainer);
					topList.stop(true, true).animate({ left: nextLeftVal }, o.showDuration);
					nextList.show().addClass('wij-menu-current').attr('aria-expanded', 'true');

					var setPrevMenu = function (backlink) {
						var b = backlink;
						var c = $('.wij-menu-current', container);
						if (c.get(0) === self.element.get(0)) {
							return;
						}
						var prevList = c.parents('ul:eq(0)');
						c.hide().attr('aria-expanded', 'false');
						self._resetDrillChildMenu(c);
						self._checkDrillMenuHeight(prevList, mycontainer, scrollcontainer);
						prevList.addClass('wij-menu-current').attr('aria-expanded', 'true');
						if (prevList.hasClass('wij-menu-content')) { b.remove(); footer.hide(); };
					};

					// initialize "back" link
					if (o.backLink) {
						if (footer.find('a').size() == 0) {
							footer.show();
							$('<a href="#"><span class="ui-icon ui-icon-triangle-1-w"></span> <span>' + o.backLinkText + '</span></a>')
								.appendTo(footer)
								.click(function () { // ----- show the previous menu
									var b = $(this);
									topList.stop(true, true);
									var prevLeftVal = parseFloat(topList.css('left')) + container.width();
									///to fix click the back button too quickly.The menu display wrong.
									if (self.element.data("firstLeftValue") < prevLeftVal) {
										return;
									}
									topList.animate({ left: prevLeftVal }, o.hideDuration, function () {
										setPrevMenu(b);
									});
									//return false;
								});
						}
					}
					// or initialize top breadcrumb
					else {
						if (breadcrumb.find('li').size() == 1) {
							breadcrumb.empty().append(firstCrumb);
							firstCrumb.find('a').click(function () {
								self._resetDrilldownMenu(breadcrumb);
								//return false;
							});
						}
						$('.wij-menu-current-crumb', container).removeClass('wij-menu-current-crumb');
						var crumbText = $(this).find('span:eq(0)').text();
						var newCrumb = $('<li class="wij-menu-current-crumb"><a href="#" class="wij-menu-crumb">' + crumbText + '</a></li>');
						newCrumb
							.appendTo(breadcrumb)
							.find('a').click(function () {
								if ($(this).parent().is('.wij-menu-current-crumb')) {
									//menu.chooseItem(this);
								}
								else {
									var newLeftVal = -($('.wij-menu-current').parents('ul').size() - 1) * 180;
									topList.animate({ left: newLeftVal }, o.showDuration, function () {
										setPrevMenu();
									});

									// make this the current crumb, delete all breadcrumbs after this one, and navigate to the relevant menu
									$(this).parent().addClass('wij-menu-current-crumb').find('span').remove();
									$(this).parent().nextAll().remove();
								};
								//return false;
							});
						newCrumb.prev().append(' <span class="ui-icon ui-icon-carat-1-e"></span>');
					};
					//return false;
				});
				}
				// if the link is a leaf node (doesn't open a child menu)
				else {
					$(this).click(function (e) {
						self.activate(e, $(this).parent());
						self.select(e);
						if (self.options.trigger) {
							var triggers = $(self.options.trigger).filter(function () {
								return $(this).closest(".ui-wijmenu").length == 0;
							})
							if (triggers.length) {
								self._hideSubmenu(container);
								self._resetDrilldownMenu(breadcrumb);
							}
						}
					});
				};
			});
		},

		_killDrilldown: function () {
			var domObject = this.element.data("domObject");
			var style = { width: "", height: "" };
			this.element.css(style).removeClass("ui-widget-content");
			domObject.scrollcontainer.css(style);
			var superpanel = $(".ui-wijsuperpanel-statecontainer", domObject.scrollcontainer);
			domObject.scrollcontainer.append(this.element);
			superpanel.remove();
			domObject.menucontainer.removeClass("wij-menu-ipod wij-menu-container");
			$('.wij-menu-current', domObject.menucontainer).removeClass('wij-menu-current');
			$(".wij-menu-breadcrumb", domObject.menucontainer).remove();
			//			if (!this.element.parent().is(".scrollcontainer")) {
			//				//this.element.unwrap();
			//			}

			this.element.find("li").each(function () {
				var obj = $(this).children(":first");
				obj.unbind("click");
			})
			$("ul", this.element).css({ left: "", width: "" });
			this.element.css("left", "");
		},

		///popup menu
		//		_popup: function () {
		//			var self = this;
		//			var o = self.options;
		//			var triggerElement = o.trigger;
		//			if (triggerElement && triggerElement !== "" && $(triggerElement).length > 0) {
		//				triggerElement = $(triggerElement);
		//				self.element.data("domObject").menucontainer.css("position", "relative");
		//				triggerElement.bind("click.wijmenu", function (e) {
		//					self._displaySubmenu(triggerElement, self.element.data("domObject").menucontainer, e);
		//				});
		//				self.element.find("a.ui-wijmenu-link").bind("click.wijmenu", function () {
		//					var value = $(this).text();
		//					triggerElement.val(value);
		//					self._hideAllMenus();
		//				});
		//			}
		//		},

		_getItemByValue: function (val) {
			var items = this.element.find("a.ui-wijmenu-link").filter(function () {
				return $(this).text() === val;
			});
			if (items.length > 0) {
				return items.eq(0).parent();
			}
			return null;
		},
		//now do not support the popup menu
		/*
		_setPopupPosition: function (e) {
		var self = this;
		var triggerElement = $(self.options.trigger);
		var val = triggerElement.val() || triggerElement.attr("value");
		if (val !== "") {
		var item = self._getItemByValue(val);
		if (item) {
		var offset = triggerElement.offset();
		var height = triggerElement.outerHeight(true);
		var position = item.position();
		var newOffset = {
		left: offset.left,
		top: offset.top - position.top
		};
		self.element.data("domObject").menucontainer.css({
		left: 0,
		top: 0
		}).offset(newOffset);
		self.activate(e, item);
		}
		else {
		self._setPosition(triggerElement, self.element.data("domObject").menucontainer, false);
		}
		}
		else {
		self._setPosition(triggerElement, self.element.data("domObject").menucontainer, false);
		}
		},
		*/
		_displaySubmenu: function (item, sublist) {
			var o = this.options;
			//now do not support the popup menu and equal-height menu.
			/*
			var parentUl = null;
			if (item.is(".ui-wijmenu-link")) {
			parentUl = item.parent().parent();
			}
			var parentHeight = 0;
			if (parentUl) {
			parentHeight = parentUl.innerHeight();
			if (parentHeight === 0) {
			parentHeight = this.element.data("domObject").menucontainer.innerHeight();
			}
			}
			var tag = false;
			if (parentHeight > 0 && parentHeight === sublist.innerHeight()) {
			tag = true;
			}
			
			sublist.show();
			if (o.mode === "popup") {
			this._setPopupPosition(e);
			}
			else {
			//this._setPosition(item, sublist, tag);

			}
			*/
			if (item.is("a.ui-wijmenu-link")) {
				item.addClass("ui-state-active");
			}
			sublist.show();
			this._setPosition(item, sublist);
			sublist.css("z-index", this._getMaxZIndex());
			sublist.hide();
			var animated = o.animated;
			if (o.showAnimated) {
				animated = o.showAnimated;
			}
			if (animated && $.ui.wijmenu.animations[animated]) {
				var option = $.extend({
					animated: 'fade',
					duration: 200
				}, { duration: o.showDuration, animated: o.showAnimated });
				var animationOptions = {
					context: sublist,
					show: true
				}
				$.ui.wijmenu.animations[animated](option, animationOptions);
			}
			else {
				sublist.show();
			}
			if (this.options.triggerEvent === "click") {
				this.element.data("shown", true);
			}
			else {
				this.element.data("shown", false);
			}

			if (!sublist.is(".ui-wijmenu")) {
				if (this.element.data("currentMenuList") === undefined) {
					this.element.data("currentMenuList", []);
				}
				var list = this.element.data("currentMenuList");
				list.push(sublist);
				this.element.data("currentMenuList", list);
			}
			//this.element.data("currentMenuList", sublist);
		},


		_getMaxZIndex: function () {
			var zindex = 0;
			$("*").each(function () {
				var index = $(this).css("z-index");
				if (!isNaN(index)) {
					index = parseInt(index);
					if (index > zindex) {
						zindex = index;
					}
				}

			})
			return zindex + 1;
		},

		_hideCurrentSubmenu: function (aItem) {
			var self = this;
			aItem.find("ul").each(function () {
				if ($(this).data("notClose")) {
					//if (this != item.parent().get(0)&&aItem.get(0)!=item.get(0)) {
					//	self._hideSubmenu($(this));
					//}
				}
				else {
					self._hideSubmenu($(this));
				}
			});
		},
		_hideSubmenu: function (sublist) {
			var o = this.options;
			var animated = o.animated;
			if (o.hideAnimated) {
				animated = o.showAnimated;
			}
			if (sublist.prev().is(".ui-wijmenu-link")) {
				sublist.prev().removeClass("ui-state-active");
			}
			//var 
			if (animated) {
				var option = $.extend({
					animated: 'fade',
					duration: 2000
				}, { animated: o.hideAnimated, duration: o.hideDuration });
				var animationOptions = {
					context: sublist,
					show: false
				}
				$.ui.wijmenu.animations[animated](option, animationOptions);
			}
			else {
				sublist.hide();
			}
			this.element.data("shown", false);
			var list = this.element.data("currentMenuList");
			if (list) {
				list = $.map(list, function (n) {
					return n && (n.get(0) == sublist.get(0)) ? null : n;
				});
				this.element.data("currentMenuList", $.makeArray(list));
			}

		},

		_setPosition: function (item, sublist) {
			sublist.css({ left: '0', top: '0', position: 'absolute' });
			var pOption = this._getPosition(item);
			var obj = { of: item };
			//now do not support the equal-height menu.
			/*
			if (tag) {
			var parentUl = item.parent().parent();
			if (!parentUl.is(".ui-wijmenu-child")) {
			parentUl = this.element.data("domObject").menucontainer;
			}
			obj = { of: parentUl };
			}
			*/
			sublist.position($.extend(obj, pOption));
		},

		_getPosition: function (item) {
			var o = this.options;
			var pOption = { my: 'left top',
				at: 'right top'
			}
			if (o.orientation === "horizontal") {
				if (item.parent().parent().parent().parent().is(".ui-wijmenu")) {
					pOption = { my: 'left top',
						at: 'left bottom'
					}
				}
			}

			if (!item.is(".ui-wijmenu-link")) {
				pOption = { my: 'left top',
					at: 'left bottom'
				}

			}
			pOption = $.extend(pOption, o.position);
			return pOption;
		}

	});

	$.extend($.ui.wijmenu, {
		animations: {
			slide: function (options, addtions) {
				options = $.extend({
					duration: 300,
					easing: "swing"
				}, options, addtions);
				if (options.show) {
					options.context.stop(true, true).animate({
						//opacity: 'show',
						//width: 'show',
						height: 'show'
					}, options);
				}
				else {
					options.context.stop(true, true).animate({
						//opacity: 'hide',
						//width: 'hide',
						height: 'hide'
					}, options);
				}
			}
		}
	});

})(jQuery);

/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Tabs widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.cookie.js
 *	jquery.glob.js
 *
 */
 (function($) {

var tabId = 0,
	listId = 0;

function getNextTabId() {
	return ++tabId;
}

function getNextListId() {
	return ++listId;
}

$.widget("ui.wijtabs", {
	options: {
		///	<summary>
		///		Determines the tabs' alignment to the content
		///	</summary>
		alignment: 'top',
		///	<summary>
		///		Determines whether the tab can be dragged to a new position
		///	</summary>
		sortable: false,
		///	<summary>
		///		Determines whether to wrap to the next line or scrolling is enabled when the tabs exceed the width
		///	</summary>
		scrollable: false,
		///	<summary>
		///		This event is triggered when a tab is added.
		///	</summary>
		add: null,
		///	<summary>
		///		Additional Ajax options to consider when loading tab content (see $.ajax).
		///	</summary>
		ajaxOptions: null,
		///	<summary>
		///		Whether or not to cache remote tabs content, e.g. load only once or with every click. 
		///		Cached content is being lazy loaded, e.g once and only once for the first click. 
		///		Note that to prevent the actual Ajax requests from being cached by the browser you need to provide an extra cache: 
		///		false flag to ajaxOptions.
		///	</summary>
		cache: false,
		///	<summary>
		///		Store the latest selected tab in a cookie. 
		///		The cookie is then used to determine the initially selected tab if the selected option is not defined. 
		///		Requires cookie plugin. The object needs to have key/value pairs of the form the cookie plugin expects as options. 
		///	</summary>
		cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
		///	<summary>
		///		Determines whether a tab can be collapsed by a user. When this is set to true, an already selected tab will be collapsed upon reselection. 
		///	</summary>
		collapsible: false,
		///	<summary>
		///		This is an animation option for hiding the tabs panel content. 
		///	</summary>
		hideOption: null, // e.g. { blind: true, fade: true, duration: 200}
		///	<summary>
		///		This is an animation option for showing the tabs panel content. 
		///	</summary>
		showOption: null, // e.g. { blind: true, fade: true, duration: 200}
		///	<summary>
		///		This event is triggered when a tab is disabled.
		///	</summary>
		disable: null,
		///	<summary>
		///		An array containing the position of the tabs (zero-based index) that should be disabled on initialization.
		///	</summary>
		disabled: [],
		///	<summary>
		///		This event is triggered when a tab is enabled.
		///	</summary>
		enable: null,
		///	<summary>
		///		The type of event to be used for selecting a tab.
		///	</summary>
		event: 'click',
		///	<summary>
		///		If the remote tab, its anchor element that is, has no title attribute to generate an id from, 
		///		an id/fragment identifier is created from this prefix and a unique id returned by $.data(el), for example "ui-tabs-54".
		///	</summary>
		idPrefix: 'ui-tabs-',
		///	<summary>
		///		This event is triggered after the content of a remote tab has been loaded.
		///	</summary>
		load: null,
		///	<summary>
		///		HTML template from which a new tab panel is created in case of adding a tab with the add method or 
		///		when creating a panel for a remote tab on the fly.
		///	</summary>
		panelTemplate: '<div></div>',
		///	<summary>
		///		This event is triggered when a tab is removed.
		///	</summary>
		remove: null,
		///	<summary>
		///		This event is triggered when clicking a tab.
		///	</summary>
		select: null,
		///	<summary>
		///		This event is triggered when a tab is shown.
		///	</summary>
		show: null,
		///	<summary>
		///		The HTML content of this string is shown in a tab title while remote content is loading. 
		///		Pass in empty string to deactivate that behavior. 
		///		An span element must be present in the A tag of the title, for the spinner content to be visible.
		///	</summary>
		spinner: '<em>Loading&#8230;</em>',
		///	<summary>
		///		HTML template from which a new tab is created and added. 
		///		The placeholders #{href} and #{label} are replaced with the url and tab label that are passed as 
		///		arguments to the add method.
		///	</summary>
		tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
	},

	_create: function() {
		this._tabify(true);
	},

	_setOption: function(key, value) {
		$.Widget.prototype._setOption.apply(this, arguments);
		
		switch(key){
			case 'selected':
				if (this.options.collapsible && value == this.options.selected) {
					return;
				}
				this.select(value);
			break;
			
			case 'alignment':
				this.destroy();
				this._tabify(true);
			break;
			
			default:
				this._tabify();
			break;
		}
	},
	
	_initScroller: function(){
		var horz = $.inArray(this._getAlignment(), ['top', 'bottom']) != -1;
		if (!horz) return;

		var width = 0;
		this.lis.each(function() {
			width += $(this).outerWidth(true);
		});
		
		if (!!this.options.scrollable && this.element.innerWidth() < width){
			if (this.scrollWrap == undefined){
				this.list.wrap("<div class='scrollWrap'></div>");
				this.scrollWrap = this.list.parent();
				$.effects.save(this.list, ['width', 'height', 'overflow']);
			}

			this.list.width(width + 2);
			this.scrollWrap.height(this.list.outerHeight(true));
			this.scrollWrap.wijsuperpanel({
					allowResize: false,
					hScroller: {
						scrollMode: 'edge'
					},
					vScroller: {
						scrollBarVisibility: 'hidden'
					}
				});
		}else{
			this._removeScroller();
		}
	},
	
	_removeScroller: function(){
		if (this.scrollWrap){
			this.scrollWrap.wijsuperpanel('destroy').replaceWith(this.scrollWrap.contents());
			this.scrollWrap = undefined;
			$.effects.restore(this.list, ['width', 'height', 'overflow']);
		}
	},

	_tabId: function(a) {
		return a.title && a.title.replace(/\s/g, '_').replace(/[^A-Za-z0-9\-_:\.]/g, '') ||
			this.options.idPrefix + getNextTabId();
	},

	_sanitizeSelector: function(hash) {
		return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
	},

	_cookie: function() {
		var cookie = this.cookie || (this.cookie = this.options.cookie.name || 'ui-tabs-' + getNextListId());
		return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
	},

	_ui: function(tab, panel) {
		return {
			tab: tab,
			panel: panel,
			index: this.anchors.index(tab)
		};
	},

	_cleanup: function() {
		// restore all former loading tabs labels
		this.lis.filter('.ui-state-processing').removeClass('ui-state-processing')
				.find('span:data(label.tabs)')
				.each(function() {
					var el = $(this);
					el.html(el.data('label.tabs')).removeData('label.tabs');
				});
	},
	
	_getAlignment : function(tabs){
		tabs = tabs === undefined ? true : tabs;
		var align = this.options.alignment || 'top';
		if (tabs) return align;
		
		switch(align){
			case 'top':
			align = 'bottom';
			break;
			
			case 'bottom':
			align = 'top';
			break;
			
			case 'left':
			align = 'right';
			break;
			
			case 'right':
			align = 'left';
			break;
		}
		
		return align;
	},
	
	_saveLayout: function(){
		var props = ['width', 'height', 'overflow'];
		$.effects.save(this.element, props);
		$.effects.save(this.list, props);
		$.effects.save(this.element.find('.ui-wijtabs-content'), props);
		this.list.width(this.list.width());
		
		$hide = this.panels.filter(':not(.ui-tabs-hide)');
		this.element.data('panel.width', $hide.width());
		this.element.data('panel.outerWidth', $hide.outerWidth(true));
	},
	
	_restoreLayout: function(){
		var props = ['width', 'height', 'overflow'];
		$.effects.restore(this.element, props);
		$.effects.restore(this.list, props);
		$.effects.restore(this.element.find('.ui-wijtabs-content'), props);
	},
	
	_hideContent: function(){
		var content=this.element.find('.ui-wijtabs-content');
		if (content.length){
			this._saveLayout();
			content.addClass('ui-tabs-hide');
			this.element.width(this.list.outerWidth(true));
		}
	},
	
	_showContent: function(){
		var content=this.element.find('.ui-wijtabs-content');
		if (content.length){
			this._restoreLayout();
			content.removeClass('ui-tabs-hide');
		}
	},
	
	_blindPanel: function(panel, mode){
		var o = this.options;
		var content = panel.parent('.ui-wijtabs-content');
		if (!content.length) return;

		this.list.width(this.list.width());		
		var props = ['position','top','left', 'width'];
		$.effects.save(panel, props); panel.show(); // Save & Show
		
		if (mode == 'show')	{
			panel.removeClass('ui-tabs-hide'); // Show
			panel.width(this.element.data('panel.width'));
		}else{
			panel.width(panel.width());
		}
		
		var blindOption = mode == 'show' ? o.showOption : o.hideOption;
		var wrapper = $.effects.createWrapper(panel).css({overflow:'hidden'}); // Create Wrapper
		if(mode == 'show'){
			wrapper.css($.extend({width: 0}, blindOption.fade ? {opacity: 0} : {})); // Shift
		}

		// Animation
		var a = $.extend({width: mode == 'show' ? this.element.data('panel.outerWidth') : 0}, blindOption.fade ? {opacity: mode == 'show' ? 1 : 0} : {});
		var self = this;
		
		var listWidth = this.list.outerWidth(true);
		// Animate
		wrapper.animate(a, {
			duration: blindOption.duration,
			step: function(){
				var ww = wrapper.outerWidth(true);
				self.element.width(listWidth + ww);
				content.width(Math.max(0, self.element.innerWidth() - listWidth - 6));
			},
			complete: function() {
				if(mode == 'hide') {
					self.lis.removeClass('ui-tabs-selected ui-state-active');
					panel.addClass('ui-tabs-hide'); // Hide
				}else{
					panel.css('width', '');
				}
				//$.effects.restore(panel, props); 
				$.effects.removeWrapper(panel); // Restore
				
				if (mode == 'show') self._restoreLayout();
				
				self._resetStyle(panel);
				panel.dequeue();
				self.element.dequeue("tabs");
			}
		});
	},
	
	// Reset certain styles left over from animation
	// and prevent IE's ClearType bug...
	_resetStyle: function ($el) {
		$el.css({ display: '' });
		if (!$.support.opacity) {
			$el[0].style.removeAttribute('filter');
		}
	},
	
	_normalizeBlindOption: function(o){
		if (o.blind === undefined) o.blind = false;
		if (o.fade === undefined) o.fade = false;
		if (o.duration === undefined) o.duration = 200;
		if (typeof o.duration == 'string'){
			try{
				o.duration = parseInt(o.duration);
			}
			catch(e){
				o.duration = 200;
			}
		}
	},

	_tabify: function(init) {

		this.list = this.element.find('ol,ul').eq(0);
		this.lis = $('li:has(a[href])', this.list);
		this.anchors = this.lis.map(function() { return $('a', this)[0]; });
		this.panels = $([]);

		var self = this, o = this.options;

		var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash
		this.anchors.each(function(i, a) {
			var href = $(a).attr('href');

			// For dynamically created HTML that contains a hash as href IE < 8 expands
			// such href to the full page url with hash and then misinterprets tab as ajax.
			// Same consideration applies for an added tab with a fragment identifier
			// since a[href=#fragment-identifier] does unexpectedly not match.
			// Thus normalize href attribute...
			var hrefBase = href.split('#')[0], baseEl;
			if (hrefBase && (hrefBase === location.toString().split('#')[0] ||
					(baseEl = $('base')[0]) && hrefBase === baseEl.href)) {
				href = a.hash;
				a.href = href;
			}

			// inline tab
			if (fragmentId.test(href)) {
				self.panels = self.panels.add(self._sanitizeSelector(href));
			}

			// remote tab
			else if (href != '#') { // prevent loading the page itself if href is just "#"
				$.data(a, 'href.tabs', href); // required for restore on destroy
				$.data(a, 'load.tabs', href.replace(/#.*$/, '')); // mutable data

				var id = self._tabId(a);
				a.href = '#' + id;
				var $panel = $('#' + id);
				if (!$panel.length) {
					$panel = $(o.panelTemplate).attr('id', id).addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
						.insertAfter(self.panels[i - 1] || self.list);
					$panel.data('destroy.tabs', true);
				}
				self.panels = self.panels.add($panel);
			}

			// invalid tab href
			else {
				o.disabled.push(i);
			}
		});

		var tabsAlign = this._getAlignment(),
		panelCorner = this._getAlignment(false);
		
		// initialization from scratch
		if (init) {

		    this.element.addClass('ui-tabs ui-wijtabs' + ' ui-tabs-' + tabsAlign + ' ui-widget ui-widget-content ui-corner-all ui-helper-clearfix');
			this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
			this.lis.addClass('ui-state-default' + ' ui-corner-' + tabsAlign);
			this.panels.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner);
	
			var content;
			// attach necessary classes for styling
			switch(tabsAlign){
				case 'bottom':
					this.list.appendTo(this.element);
				break;
				
				case 'left':
					content = $('<div/>').addClass('ui-wijtabs-content').appendTo(this.element);
					this.panels.appendTo(content);
				break;
				
				case 'right':
					content = $('<div/>').addClass('ui-wijtabs-content').insertBefore(this.list);
					this.panels.appendTo(content);
				break;
				
				case 'top':
					this.list.prependTo(this.element);
				break;
			}

			// Selected tab
			// use "selected" option or try to retrieve:
			// 1. from fragment identifier in url
			// 2. from cookie
			// 3. from selected class attribute on <li>
			if (o.selected === undefined) {
				if (location.hash) {
					this.anchors.each(function(i, a) {
						if (a.hash == location.hash) {
							o.selected = i;
							return false; // break
						}
					});
				}
				if (typeof o.selected != 'number' && o.cookie) {
					o.selected = parseInt(self._cookie(), 10);
				}
				if (typeof o.selected != 'number' && this.lis.filter('.ui-tabs-selected').length) {
					o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
				}
				o.selected = o.selected || (this.lis.length ? 0 : -1);
			}
			else if (o.selected === null) { // usage of null is deprecated, TODO remove in next release
				o.selected = -1;
			}

			// sanity check - default to first tab...
			o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected : 0;

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			// A selected tab cannot become disabled.
			o.disabled = $.unique(o.disabled.concat(
				$.map(this.lis.filter('.ui-state-disabled'),
					function(n, i) { return self.lis.index(n); } )
			)).sort();

			if ($.inArray(o.selected, o.disabled) != -1) {
				o.disabled.splice($.inArray(o.selected, o.disabled), 1);
			}

			// highlight selected tab
			this.panels.addClass('ui-tabs-hide');
			this.lis.removeClass('ui-tabs-selected ui-state-active');
			if (o.selected >= 0 && this.anchors.length) { // check for length avoids error when initializing empty list
				this.panels.eq(o.selected).removeClass('ui-tabs-hide');
				this.lis.eq(o.selected).addClass('ui-tabs-selected ui-state-active');

				// seems to be expected behavior that the show callback is fired
				self.element.queue("tabs", function() {
					self._trigger('show', null, self._ui(self.anchors[o.selected], self.panels[o.selected]));
				});
				
				this.load(o.selected);
			}

			// clean up to avoid memory leaks in certain versions of IE 6
			$(window).bind('unload', function() {
				if (self.lis)
					self.lis.add(self.anchors).unbind('.tabs');
				self.lis = self.anchors = self.panels = null;
			});

		}
		// update selected after add/remove
		else {
			o.selected = this.lis.index(this.lis.filter('.ui-tabs-selected'));
		}

		// update collapsible
		this.element[o.collapsible ? 'addClass' : 'removeClass']('ui-tabs-collapsible');

		// set or update cookie after init and add/remove respectively
		if (o.cookie) {
			this._cookie(o.selected, o.cookie);
		}

		// disable tabs
		for (var i = 0, li; (li = this.lis[i]); i++) {
			$(li)[$.inArray(i, o.disabled) != -1 &&
				!$(li).hasClass('ui-tabs-selected') ? 'addClass' : 'removeClass']('ui-state-disabled');
		}

		// reset cache if switching from cached to not cached
		if (o.cache === false) {
			this.anchors.removeData('cache.tabs');
		}

		// remove all handlers before, tabify may run on existing tabs after add or option change
		this.lis.add(this.anchors).unbind('.tabs');

		if (o.event != 'mouseover') {
			var addState = function(state, el) {
				if (el.is(':not(.ui-state-disabled)')) {
					el.addClass('ui-state-' + state);
				}
			};
			var removeState = function(state, el) {
				el.removeClass('ui-state-' + state);
			};
			this.lis.bind('mouseover.tabs', function() {
				addState('hover', $(this));
			});
			this.lis.bind('mouseout.tabs', function() {
				removeState('hover', $(this));
			});
			this.anchors.bind('focus.tabs', function() {
				addState('focus', $(this).closest('li'));
			});
			this.anchors.bind('blur.tabs', function() {
				removeState('focus', $(this).closest('li'));
			});
		}
		
		if (o.showOption === undefined || o.showOption === null) o.showOption = {};
		this._normalizeBlindOption(o.showOption);
		
		if (o.hideOption === undefined || o.hideOption === null) o.hideOption = {};
		this._normalizeBlindOption(o.hideOption);

		// Show a tab...
		var showTab = ((o.showOption.blind || o.showOption.fade) && o.showOption.duration > 0) ?
			function(clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active');
				self._showContent();
				$show.removeClass('ui-tabs-hide');
				
				if (tabsAlign == 'top' || tabsAlign == 'bottom'){
					var props = { duration: o.showOption.duration };
					if (o.showOption.blind) props.height = 'toggle';		
					if (o.showOption.fade) props.opacity = 'toggle';
					$show.hide().removeClass('ui-tabs-hide') // avoid flicker that way
					.animate(props, o.showOption.duration || 'normal', function() {
						self._resetStyle($show);
						self._trigger('show', null, self._ui(clicked, $show[0]));
					});
				}else{
					self._showContent();
					self._blindPanel($show, 'show');
				}
			} :
			function(clicked, $show) {
				$(clicked).closest('li').addClass('ui-tabs-selected ui-state-active');
				self._showContent();
				$show.removeClass('ui-tabs-hide');
				self._trigger('show', null, self._ui(clicked, $show[0]));
			};
		
		// Hide a tab, $show is optional...
		var hideTab = ((o.hideOption.blind || o.hideOption.fade) && o.hideOption.duration > 0) ?
			function(clicked, $hide) {
				if (tabsAlign == 'top' || tabsAlign == 'bottom'){
					var props = { duration: o.hideOption.duration };
					if (o.hideOption.blind) props.height = 'toggle';		
					if (o.hideOption.fade) props.opacity = 'toggle';
					$hide.animate(props, o.hideOption.duration || 'normal', function() {
						self.lis.removeClass('ui-tabs-selected ui-state-active');
						$hide.addClass('ui-tabs-hide');
						self._resetStyle($hide);
						self.element.dequeue("tabs");
					});	
				}else{
					self._saveLayout();
					self._blindPanel($hide, 'hide');
				}
			} :
			function(clicked, $hide, $show) {
				self.lis.removeClass('ui-tabs-selected ui-state-active');
				self._hideContent();
				$hide.addClass('ui-tabs-hide');
				self.element.dequeue("tabs");
			};
		
		// attach tab event handler, unbind to avoid duplicates from former tabifying...
		this.anchors.bind(o.event + '.tabs', function() {
			var el = this, 
			$li = $(this).closest('li'), 
			$hide = self.panels.filter(':not(.ui-tabs-hide)'),
			$show = $(self._sanitizeSelector(this.hash));

			// If tab is already selected and not collapsible or tab disabled or
			// or is already loading or click callback returns false stop here.
			// Check if click handler returns false last so that it is not executed
			// for a disabled or loading tab!
			if (($li.hasClass('ui-tabs-selected') && !o.collapsible) ||
				$li.hasClass('ui-state-disabled') ||
				$li.hasClass('ui-state-processing') ||
				self._trigger('select', null, self._ui(this, $show[0])) === false) {
				this.blur();
				return false;
			}

			o.selected = self.anchors.index(this);

			self.abort();

			// if tab may be closed
			if (o.collapsible) {
				if ($li.hasClass('ui-tabs-selected')) {
					o.selected = -1;

					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}

					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					}).dequeue("tabs");
					
					this.blur();
					return false;
				}
				else if (!$hide.length) {
					if (o.cookie) {
						self._cookie(o.selected, o.cookie);
					}
					
					self.element.queue("tabs", function() {
						showTab(el, $show);
					});

					self.load(self.anchors.index(this)); // TODO make passing in node possible, see also http://dev.jqueryui.com/ticket/3171
					
					this.blur();
					return false;
				}
			}

			if (o.cookie) {
				self._cookie(o.selected, o.cookie);
			}

			// show new tab
			if ($show.length) {
				if ($hide.length) {
					self.element.queue("tabs", function() {
						hideTab(el, $hide);
					});
				}
				self.element.queue("tabs", function() {
					showTab(el, $show);
				});
				
				self.load(self.anchors.index(this));
			}
			else {
				throw 'jQuery UI Tabs: Mismatching fragment identifier.';
			}

			// Prevent IE from keeping other link focussed when using the back button
			// and remove dotted border from clicked link. This is controlled via CSS
			// in modern browsers; blur() removes focus from address bar in Firefox
			// which can become a usability and annoying problem with tabs('rotate').
			if ($.browser.msie) {
				this.blur();
			}
		});
		
		this._initScroller();

		// disable click in any case
		this.anchors.bind('click.tabs', function(){return false;});

	},

	destroy: function() {
		var o = this.options;
		this.abort();
		this._removeScroller();
		this.element.unbind('.tabs')
			.removeClass([
				'ui-wijtabs', 
				'ui-tabs-top', 
				'ui-tabs-bottom', 
				'ui-tabs-left', 
				'ui-tabs-right', 
				'ui-tabs', 
				'ui-widget', 
				'ui-widget-content', 
				'ui-corner-all', 
				'ui-tabs-collapsible',
				'ui-helper-clearfix'
				].join(' '))
			.removeData('tabs');

		this.list.removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');

		this.anchors.each(function() {
			var href = $.data(this, 'href.tabs');
			if (href) {
				this.href = href;
			}
			var $this = $(this).unbind('.tabs');
			$.each(['href', 'load', 'cache'], function(i, prefix) {
				$this.removeData(prefix + '.tabs');
			});
		});

		this.lis.unbind('.tabs').add(this.panels).each(function() {
			if ($.data(this, 'destroy.tabs')) {
				$(this).remove();
			}
			else {
				$(this).removeClass([
					'ui-state-default',
					'ui-corner-top',
					'ui-corner-bottom',
					'ui-corner-left',
					'ui-corner-right',
					'ui-tabs-selected',
					'ui-state-active',
					'ui-state-hover',
					'ui-state-focus',
					'ui-state-disabled',
					'ui-tabs-panel',
					'ui-widget-content',
					'ui-tabs-hide'
				].join(' ')).css({position:'', left: '', top: ''});
			}
		});
		
		var content = $('.ui-wijtabs-content');
		if (content.length)
			content.replaceWith(content.contents());

		if (o.cookie) {
			this._cookie(null, o.cookie);
		}

		return this;
	},

	add: function(url, label, index) {
	    /// <summary>Add a new tab.</summary>
	    /// <param name="url" type="String">A URL consisting of a fragment identifier only to create an in-page tab or a full url (relative or absolute, no cross-domain support) to turn the new tab into an Ajax (remote) tab.</param>
	    /// <param name="label" type="String">The tab label.</param>
	    /// <param name="index" type="Number">Zero-based position where to insert the new tab.</param>
		if (index === undefined) {
			index = this.anchors.length; // append by default
		}

		var self = this, o = this.options,
			$li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)),
			id = !url.indexOf('#') ? url.replace('#', '') : this._tabId($('a', $li)[0]);

		var tabsAlign = this._getAlignment(),
		panelCorner = this._getAlignment(false);
		$li.addClass('ui-state-default' + ' ui-corner-' + tabsAlign).data('destroy.tabs', true);

		// try to find an existing element before creating a new one
		var $panel = $('#' + id);
		if (!$panel.length) {
			$panel = $(o.panelTemplate).attr('id', id).data('destroy.tabs', true);
		}
		$panel.addClass('ui-tabs-panel ui-widget-content ui-corner-' + panelCorner + ' ui-tabs-hide');

		if (index >= this.lis.length) {
			$li.appendTo(this.list);
			if (this.panels.length > 0)
				$panel.insertAfter(this.panels[this.panels.length - 1]);
			else
				$panel.appendTo(this.list[0].parentNode);
		}
		else {
			$li.insertBefore(this.lis[index]);
			$panel.insertBefore(this.panels[index]);
		}

		o.disabled = $.map(o.disabled,
			function(n, i) { return n >= index ? ++n : n; });

		this._tabify();

		if (this.anchors.length == 1) { // after tabify
			o.selected = 0;
			$li.addClass('ui-tabs-selected ui-state-active');
			$panel.removeClass('ui-tabs-hide');
			this.element.queue("tabs", function() {
				self._trigger('show', null, self._ui(self.anchors[0], self.panels[0]));
			});
				
			this.load(0);
		}

		// callback
		this._trigger('add', null, this._ui(this.anchors[index], this.panels[index]));
		return this;
	},

	remove: function(index) {
	    /// <summary>Remove a tab.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab to be removed.</param>
		var o = this.options, $li = this.lis.eq(index).remove(),
			$panel = this.panels.eq(index).remove();

		// If selected tab was removed focus tab to the right or
		// in case the last tab was removed the tab to the left.
		if ($li.hasClass('ui-tabs-selected') && this.anchors.length > 1) {
			this.select(index + (index + 1 < this.anchors.length ? 1 : -1));
		}

		o.disabled = $.map($.grep(o.disabled, function(n, i) { return n != index; }),
			function(n, i) { return n >= index ? --n : n; });

		this._tabify();

		// callback
		this._trigger('remove', null, this._ui($li.find('a')[0], $panel[0]));
		return this;
	},

	enable: function(index) {
	    /// <summary>Enable a disabled tab.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab to be enabled.</param>
        var o = this.options;
		if ($.inArray(index, o.disabled) == -1) {
			return;
		}

		this.lis.eq(index).removeClass('ui-state-disabled');
		o.disabled = $.grep(o.disabled, function(n, i) { return n != index; });

		// callback
		this._trigger('enable', null, this._ui(this.anchors[index], this.panels[index]));
		return this;
	},

	disable: function(index) {
	    /// <summary>Disabled a tab.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab to be disabled.</param>
        var self = this, o = this.options;
		if (index != o.selected) { // cannot disable already selected tab
			this.lis.eq(index).addClass('ui-state-disabled');

			o.disabled.push(index);
			o.disabled.sort();

			// callback
			this._trigger('disable', null, this._ui(this.anchors[index], this.panels[index]));
		}

		return this;
	},

	select: function(index) {
	    /// <summary>Select a tab, as if it were clicked.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab to be selected or the id selector of the panel the tab is associated with.</param>
        if (typeof index == 'string') {
			index = this.anchors.index(this.anchors.filter('[href$=' + index + ']'));
		}
		else if (index === null) { // usage of null is deprecated, TODO remove in next release
			index = -1;
		}
		if (index == -1 && this.options.collapsible) {
			index = this.options.selected;
		}

		this.anchors.eq(index).trigger(this.options.event + '.tabs');
		return this;
	},

	load: function(index) {
	    /// <summary>Reload the content of an Ajax tab programmatically.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab to be loaded</param>
        var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, 'load.tabs');

		this.abort();

		// not remote or from cache
		if (!url || this.element.queue("tabs").length !== 0 && $.data(a, 'cache.tabs')) {
			this.element.dequeue("tabs");
			return;
		}

		// load remote from here on
		this.lis.eq(index).addClass('ui-state-processing');

		if (o.spinner) {
			var span = $('span', a);
			span.data('label.tabs', span.html()).html(o.spinner);
		}

		this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
			url: url,
			success: function(r, s) {
				$(self._sanitizeSelector(a.hash)).html(r);

				// take care of tab labels
				self._cleanup();

				if (o.cache) {
					$.data(a, 'cache.tabs', true); // if loaded once do not load them again
				}

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					o.ajaxOptions.success(r, s);
				}
				catch (e) {}
			},
			error: function(xhr, s, e) {
				// take care of tab labels
				self._cleanup();

				// callbacks
				self._trigger('load', null, self._ui(self.anchors[index], self.panels[index]));
				try {
					// Passing index avoid a race condition when this method is
					// called after the user has selected another tab.
					// Pass the anchor that initiated this request allows
					// loadError to manipulate the tab content panel via $(a.hash)
					o.ajaxOptions.error(xhr, s, index, a);
				}
				catch (e) {}
			}
		}));

		// last, so that load event is fired before show...
		self.element.dequeue("tabs");

		return this;
	},

	abort: function() {
	    /// <summary>Terminate all running tab ajax requests and animations.</summary>	    
		this.element.queue([]);
		this.panels.stop(false, true);

		// "tabs" queue must not contain more than two elements,
		// which are the callbacks for the latest clicked tab...
		this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));

		// terminate pending requests from other tabs
		if (this.xhr) {
			this.xhr.abort();
			delete this.xhr;
		}

		// take care of tab labels
		this._cleanup();
		return this;
	},

	url: function(index, url) {
	    /// <summary>Change the url from which an Ajax (remote) tab will be loaded.</summary>
	    /// <param name="index" type="Number">The zero-based index of the tab of which its URL is to be updated.</param>
	    /// <param name="url" type="String">A URL the content of the tab is loaded from.</param>
        this.anchors.eq(index).removeData('cache.tabs').data('load.tabs', url);
		return this;
	},

	length: function() {
	    /// <summary>Retrieve the number of tabs of the first matched tab pane.</summary>
        return this.anchors.length;
	}

});

})(jQuery);
