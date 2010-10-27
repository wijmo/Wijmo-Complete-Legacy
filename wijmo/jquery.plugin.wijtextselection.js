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
 ** Wijmo Text Selection plugin.
*
*/


(function ($) {
$.fn.extend({
wijtextselection: function () {
	/// <summary>jQuery plugins to get/set text selection for input element</summary>
	var start,end,t=this[0];
	var val = this.val();
	if (arguments.length === 0){
		var range, stored_range, s, e;
		if($.browser.msie){
			var selection=document.selection;
			if (t.tagName.toLowerCase() != "textarea") {
				range = selection.createRange().duplicate();
				range.moveEnd("character", val.length);
				s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
				range = selection.createRange().duplicate();
				range.moveStart("character", -val.length);
				e = range.text.length;
			} else {
				range = selection.createRange();
				stored_range = range.duplicate();
				stored_range.moveToElementText(t);
				stored_range.setEndPoint('EndToEnd', range);
				s = stored_range.text.length - range.text.length,
				e = s + range.text.length
			}
		} else {
			s=t.selectionStart;
			e=t.selectionEnd;
		}
		
		var te=val.substring(s,e);
		return {start:s,end:e,text:te,replace:function(st){
			return val.substring(0,s)+st+val.substring(e,val.length)
		}};
	}else if (arguments.length === 1){
		if (typeof arguments[0]==="object" && typeof arguments[0].start==="number" && typeof arguments[0].end==="number"){
			start=arguments[0].start;
			end=arguments[0].end;
		}else if (typeof arguments[0]==="string"){
			if((start=val.indexOf(arguments[0]))>-1){
				end=start+arguments[0].length;
			}
		}else if(Object.prototype.toString.call(arguments[0])==="[object RegExp]"){
			var re=arguments[0].exec(val);
			if(re != null) {
				start=re.index;
				end=start+re[0].length;
			}
		}
	}else if (arguments.length === 2){
		if (typeof arguments[0]==="number" && typeof arguments[1] === "number"){
			start = arguments[0];
			end = arguments[1];
		}
	}
	
	if(typeof start === "undefined"){
		start = 0;
		end = val.length;
	}
	
	if($.browser.msie){
		var selRange = t.createTextRange();
		selRange.collapse(true);
		selRange.moveStart('character', start);
		selRange.moveEnd('character', end-start);
		selRange.select();
	} else {
		t.selectionStart=start;
		t.selectionEnd=end;
	}
}
});
		
})(jQuery);
