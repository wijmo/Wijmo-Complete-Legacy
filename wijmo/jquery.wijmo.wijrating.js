/*globals jQuery, window*/
/*
 * 
 * Wijmo Library 2.1.3
 * http://wijmo.com/
 * 
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 * 
 * 
 * Wijmo Rating widget.
 * 
 * Depends:
 * 	jquery.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function ($) {
	"use strict";
	var widgetClass = "wijmo-wijrating",
		starContainerClass = "wijmo-wijrating-starcontainer",
		resetButtonClass = "wijmo-wijrating-reset",
		uiCornerAll = "ui-corner-all",
		uiStateDefault = "ui-state-default",
		uiStateHover = "ui-state-hover",
		resetButtonHoverClass = "wijmo-wijrating-resethover",
		starClass = "wijmo-wijrating-star",
		normalStarClass = "wijmo-wijrating-normal",
		hoverStarClass = "wijmo-wijrating-hover",
		ratedStarClass = "wijmo-wijrating-rated",
		verticalClass = "wijmo-wijrating-vertical";

	$.widget("wijmo.wijrating", {

		options: {
			/// <summary>
			/// Determines whether to disable the rating widget.
			/// Type: Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijrating("option", "disabled", true).
			/// </summary>
			disabled: false,
			/// <summary>
			/// Determines the number of stars to display.
			/// Type: Number.
			/// Default: 5.
			/// Code example: $(".selector").wijrating("option", "count", 10).
			/// </summary>
			count: 5,
			/// <summary>
			/// The sections of every star split into.
			/// Type: Number.
			/// Default: 1.
			/// Code example: $(".selector").wijrating("option", "split", 2).
			/// </summary>
			split: 1,
			/// <summary>
			/// Determines the total value of the rating widget.
			/// Type: Number.
			/// Default: 5.
			/// Code example: $(".selector").wijrating("option", "totalValue", 100).
			/// </summary>
			/// <remarks>
			/// For example, if the count is 5, split is 2 and the totalValue
			/// is 100, then the value that every step represents is 100/(5 * 2) = 10
			/// and one star represents the 10*(1 * 2) = 20;
			/// </remarks>
			totalValue: 5,
			/// <summary>
			/// Determines the rated value of the rating widget.
			/// Type: Number.
			/// Default: 0.
			/// Code example: $(".selector").wijrating("option", "value", 1).
			/// </summary>
			value: 0,
			/// <summary>
			/// The minimize value that can be rated.
			/// Type: Number.
			/// Default: null.
			/// Code example: $(".selector").wijrating("option", "min", 2).
			/// </summary>
			min: null,
			/// <summary>
			/// The maximum value that can be rated.
			/// Type: Number.
			/// Default: null.
			/// Code example: $(".selector").wijrating("option", "max", 3).
			/// </summary>
			max: null,
			/// <summary>
			/// Represents a reset button.
			/// Type: Object.
			/// Default: {disabled: false, hint: "cancel this rating!",
			///		position: "leftOrTop", customizedClass: "",
			///		custommizedHoverClass: ""}.
			/// Code example: $(".selector").wijrating("option", 
			///		"resetButton", {disabled: true}).
			/// </summary>
			/// <remarks>
			/// The reset button is used to reset the rated value to 0.
			/// If the rating widget is disabled, the reset button will be always hidden.
			/// </remarks>
			resetButton: {
				/// <summary>
				/// Determines whether to show the reset button.
				/// Type: Boolean.
				/// Default: false.
				/// </summary>
				disabled: false,
				/// <summary>
				/// The text shown when hovering over the button.
				/// Type: String.
				/// Default: "cancel this rating!".
				/// </summary>
				hint: "cancel this rating!",
				/// <summary>
				/// Position of the reset button.
				/// Type: String.
				/// Default: "leftOrTop".
				/// </summary>
				/// <remarks>
				/// Options are "leftOrTop", "rightOrBottom"
				/// </remarks>
				position: "leftOrTop",
				/// <summary>
				/// The customized class added to the reset button.
				/// Type: String.
				/// Default: "".
				/// </summary>
				customizedClass: "",
				/// <summary>
				/// The customized class added to the reset button when hover it.
				/// Type: String.
				/// Default: "".
				/// </summary>
				customizedHoverClass: ""
			},
			/// <summary>
			/// The hint information when hovering over the rating star.
			/// Type: Object.
			/// Default: {disabled: false, content: null}.
			/// Code example: $(".selector").wijrating("option", "hint",
			///		 {disabled: true}).
			/// </summary>
			hint: {
				/// <summary>
				/// Determines whether to show the hint.
				/// Type: Boolean.
				/// Default: false.
				/// </summary>
				disabled: false,
				/// <summary>
				/// Determines the values that will be shown when a star is hovered over.
				/// Type: Array.
				/// Default: null.
				/// </summary>
				/// <remarks>
				/// If the content is null and disabled is false, then the hint will 
				/// show the value of each star.
				/// </remarks>
				content: null
			},
			/// <summary>
			/// Determines the orientation of the rating widget.
			/// Type: String.
			/// Default: "horizontal".
			/// Code example: $(".selector").wijrating("option", "orientation", 
			///		"vertical").
			/// </summary>
			/// <remarks>
			/// Options are "horizontal" and "vertical"
			/// </remarks>
			orientation: "horizontal",
			/// <summary>
			/// Determines the direction of the rating widget.
			/// Type: String.
			/// Default: "normal".
			/// Code example: $(".selector").wijrating("option", "direction", "reversed").
			/// </summary>
			/// <remarks>
			/// Options are "normal" and "reversed". The "normal" represents rating 
			/// from left to right or top to bottom.
			/// </remarks>
			direction: "normal",
			/// <summary>
			/// Determines the rating mode of the rating widget.
			/// Type: String.
			/// Default: "continuous".
			/// Code example: $(".selector").wijrating("option", "ratingMode", "single").
			/// </summary>
			/// <remarks>
			/// Options are "continuous" and "single". The "single" option represents 
			/// that only one star can be rated, while "continuous" represents that 
			/// all the stars from first to the rated one will be rated.
			/// </remarks>
			ratingMode: "continuous",
			/// <summary>
			/// A value that indicates the settings for customize rating icons.
			/// Type: Object.
			/// Default: {iconsUrl: null, hoverIconsUrl: null, ratedIconsUrl: null}.
			/// Code example: $(".selector").wijrating("option", "icons", 
			/// {iconsUrl:["c.jpg", "b.jpg", "a.jpg"]}).
			/// </summary>
			icons: {
				/// <summary>
				/// A string or an array value that indicates the urls of icons.
				/// Type: String or Array.
				/// Default: null.
				/// </summary>
				/// <remarks>
				/// If the value is a string, then all the star will apply the iconsClass.
				/// If the value is an array, then each star will apply the related 
				/// iconsClass value by index.
				/// </remarks>
				iconsClass: null,
				/// <summary>
				/// A string or an array value indicates the urls of hover icons.
				/// Type: String or Array.
				/// Default: null.
				/// </summary>
				/// <remarks>
				/// If the value is a string, then all the star will apply 
				/// the iconsClass when hovered over.
				/// If the value is an array, then each star will apply the 
				/// related iconsClass value by index when hovered over.
				/// </remarks>
				hoverIconsClass: null,
				/// <summary>
				/// A string or an array value indicates the urls of rated icons.
				/// Type: string or Array.
				/// Default: null.
				/// </summary>
				/// <remarks>
				/// If the value is a string, then all the rated star will 
				/// apply the iconsClass.
				/// If the value is an array, then each rated star will apply the related 
				/// iconsClass value by index.
				/// </remarks>
				ratedIconsClass: null
			},
			/// <summary>
			/// Determines the width of the icon. All icons should have the same width.
			/// Type: Number.
			/// Default: 16.
			/// Code example: $(".selector").wijrating("option", "iconWidth", 32).
			/// </summary>
			iconWidth: 16,
			/// <summary>
			/// Determines the height of the icon. All icons should have the same height.
			/// Type: Number.
			/// Default: 16.
			/// Code example: $(".selector").wijrating("option", "iconHeight", 32).
			/// </summary>
			iconHeight: 16,
			/// <summary>
			/// A value indicates whether to show animation 
			/// and the duration for the animation.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			/// <remarks>
			/// animation.animated is used to set the effect of the animation.
			/// animation.duration is used to set the duration of the animation.
			/// animation.easing is used to set the easing of the animation.
			/// animation.delay is used to set the delay time of each star to 
			/// play the animation.
			/// </remarks>
			animation: null,
			/// <summary>
			/// Fires before the widget rating.  This event can be cancelled. 
			/// Use "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains new value and old value.  
			///	</param>
			/// Code Example:
			/// Supply a function as an option. 
			///	$(".selector").wijrating({rating: function(e, data) { } }); 
			/// Bind to the event by type: wijratingrating 
			///	$(".selector").bind("wijratingrating", function(e, data) {} );
			rating: null,
			/// <summary>
			/// Fires after the widget is rated.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains new value.  
			///	</param>
			/// Code Example:
			/// Supply a function as an option. 
			///	$(".selector").wijrating({rated: function(e, data) { } }); 
			/// Bind to the event by type: wijratingrated 
			///	$(".selector").bind("wijratingrated", function(e, data) {} );
			rated: null,
			/// <summary>
			/// Fires when the reset button is clicked.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// Code Example:
			/// Supply a function as an option. 
			///	$(".selector").wijrating({reset: function(e) { } }); 
			/// Bind to the event by type: wijratingreset 
			///	$(".selector").bind("wijratingreset", function(e) {} );
			reset: null,
			/// <summary>
			/// Fires when the widget is hovered over.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the value of the hovered object.  
			///	</param>
			/// Code Example:
			/// Supply a function as an option. 
			///	$(".selector").wijrating({hover: function(e, data) { } }); 
			/// Bind to the event by type: wijratinghover 
			///	$(".selector").bind("wijratinghover", function(e, data) {} );
			hover: null
		},

		_setOption: function (key, value) {
			var self = this,
				o = self.options,
				resetButton = $("." + resetButtonClass, self.ratingElement[0]),
				starContainer = $("." + starContainerClass, self.ratingElement[0]),
				stars = $("." + normalStarClass, self.ratingElement[0]);

			if ($.isPlainObject(o[key])) {
				switch (key) {
				case "resetButton":
					if (typeof (value.disabled) !== 'undefined') {
						if (value.disabled !== o[key].disabled) {
							if (value.disabled) {
								resetButton.hide();
								//add aria support.
								resetButton.attr("aria-hidden", true);
							} else {
								if (!o.disabled) {
									resetButton.show();
									//add aria support.
									resetButton.attr("aria-hidden", false);
								}
							}
						}
					}
					if (typeof (value.hint) !== 'undefined') {
						if (value.hint !== o[key].hint) {
							if (value.hint === null) {
								resetButton.attr("title", "");
							} else {
								resetButton.attr("title", value.hint);
							}
						}
					}
					if (value.position && value.position.length) {
						if (value.position !== o[key].position) {
							if (value.position === "rightOrBottom") {
								resetButton.parent().append(resetButton);
							} else {
								resetButton.parent().prepend(resetButton);
							}
						}
					}
					if (typeof (value.customizedClass) !== 'undefined') {
						if (value.customizedClass !== o[key].customizedClass) {
							if (o[key].customizedClass.length) {
								resetButton.removeClass(o[key].customizedClass);
							}
							if (value.customizedClass.length) {
								resetButton.addClass(value.customizedClass);
							}
						}
					}
					break;
				case "hint":
					if (typeof (value.disabled) !== 'undefined') {
						if (value.disabled !== o[key].disabled) {
							if (value.disabled) {
								stars.removeAttr("title");
							} else {
								self._resetHint(o.hint.content);
							}
						}
					}
					if (typeof (value.content) !== 'undefined') {
						if (value.content !== o[key].content) {
							if (!o[key].disabled) {
								self._resetHint(value.content);
							}
						}
					}
					break;
				case "icons":
					if (typeof (value.iconsClass) !== 'undefined') {
						if (o[key].iconsClass && o[key].iconsClass.length) {
							self._removeCustomizedIconsClass(o[key].iconsClass);
						}
						self._addCustomizedIconsClass(value.iconsClass, o.split);
					}
					if (typeof (value.hoverIconsClass) !== 'undefined') {
						if (o[key].hoverIconsClass && o[key].hoverIconsClass.length) {
							self._removeCustomizedIconsClass(o[key].hoverIconsClass);
						}
					}
					if (typeof (value.ratedIconsClass) !== 'undefined') {
						if (o[key].ratedIconsClass && o[key].ratedIconsClass.length) {
							self._removeCustomizedIconsClass(o[key].ratedIconsClass);
						}
						self._resetValue(o.value, o.ratingMode, value.ratedIconsClass);
					}
					break;
				default:
					break;
				}
				$.extend(true, o[key], value);
			} else {
				if (value === o[key]) {
					return;
				}
				switch (key) {
				case "disabled": 
					if (value) {
						self._unbindLiveEvents();
						resetButton.hide();
						//add aria support.
						resetButton.attr("aria-hidden", true);
					} else {
						self._bindLiveEvents();
						if (!o.resetButton.disabled) {
							resetButton.show();
							//add aria support.
							resetButton.attr("aria-hidden", false);
						}
					}
					break;
				case "count":
					self._createStars(o.split, value, starContainer);
					break;
				case "split":
					self._createStars(value, o.count, starContainer);
					break;
				case "totalValue":
					self._resetTotalValue(value);
					break;
				case "orientation":
					if (value === "vertical") {
						self.ratingElement.addClass(verticalClass);
					} else {
						self.ratingElement.removeClass(verticalClass);
					}
					if (o.split > 1) {
						o[key] = value;
						self._createStars(o.split, o.count, starContainer);
					}
					break;
				case "direction":
					o[key] = value;
					self._createStars(o.split, o.count, starContainer);
					break;
				case "ratingMode":
					self._resetValue(o.value, value, o.icons.ratedIconsClass);
					break;
				case "value":
					if (o.min && value < o.min) {
						return;
					}
					if (o.max && value > o.max) {
						return;
					}
					self._resetValue(value, o.ratingMode, o.icons.ratedIconsClass);
					break;
				case "iconWidth":
					o[key] = value;
					self._createStars(o.split, o.count, starContainer);
					break;
				case "iconHeight":
					o[key] = value;
					self._createStars(o.split, o.count, starContainer);
					break;
				default:
					break;
				}
				$.Widget.prototype._setOption.apply(self, arguments);
			}
		},

		_create: function () {
			var self = this,
				o = self.options,
				//cre = /({.*})/, 
				ratingElement;
				
			//var m = cre.exec(self.element.attr("class"));
			//if (m && m.length) {
			//	data = m[1]; 
			//}
			if (self.element.is("select")) {
				self._parseSelect();
				self.element.hide();
				ratingElement = $("<div></div>");
				self.element.after(ratingElement);
			} else if (self.element.is("div")) {
				if (self.element.children("input:[type='radio']").length > 0) {
					self._parseRadio();
					self.element.hide();
					ratingElement = $("<div></div>");
					self.element.after(ratingElement);
				} else {
					ratingElement = self.element;
				}
				
			} else {
				return;
			}
			self.ratingElement = ratingElement;
			self._createRating();
			if (!o.disabled) {
				self._bindLiveEvents();
			}
		},

		destroy: function () {
			///Remove the functionality completely. 
			///This will return the element back to its pre-init state. 
			var self = this;
			self._unbindLiveEvents();
			if (self.element !== self.ratingElement) {
				self.ratingElement.remove();
				self.element.show();
			} else {
				self.element.removeClass("ui-widget");
				self.element.removeClass(widgetClass);
				self.element.removeClass(verticalClass);
				self.element.empty();
			}

			$.Widget.prototype.destroy.apply(self, arguments);
		},

		_unbindLiveEvents: function () {
			$("." + normalStarClass, this.ratingElement[0]).die("wijrating")
			// for jQuery 1.7.1
			.die(".wijrating");
			$("." + resetButtonClass, this.ratingElement[0]).die("wijrating")
			// for jQuery 1.7.1
			.die(".wijrating");
		},

		_bindLiveEvents: function () {
			var self = this,
				o = self.options,
				isStar = "." + normalStarClass,
				isRestButton = "." + resetButtonClass,
				args,
				starProxyObj = {
					element: self.ratingElement,
					mouseover: function (e) {
						var tar = $(e.target),
							allStars = $(isStar, self.ratingElement[0]);
						if (tar.is(isStar)) {
							allStars.removeClass(hoverStarClass);
							tar.addClass(hoverStarClass);
							if (o.ratingMode === "continuous") {
								if (o.direction === "reversed") {
									tar.parent().nextAll().children()
										.addClass(hoverStarClass);
								} else {
									tar.parent().prevAll().children()
										.addClass(hoverStarClass);
								}
							}
							self._addCustomizedHoverIconsClass(o.icons.hoverIconsClass, 
								o.split, tar);
							args = {
								value: parseFloat(tar.html()),
								target: tar
							};
							self._trigger("hover", e, args);
						}
					},
					mouseout: function (e) {
						var tar = $(e.target),
							allStars = $(isStar, self.ratingElement[0]);
						if (tar.is(isStar)) {
							allStars.removeClass(hoverStarClass);
							self._removeCustomizedIconsClass(o.icons.hoverIconsClass);
						}
					},
					click: function (e) {
						var tar = $(e.target),
							val = parseFloat(tar.html()),
							allStars = $(isStar, self.ratingElement[0]),
							animation = $.extend({
								duration: 500,
								easing: null,
								delay: 250
							}, o.animation),
							animations = $.wijmo.wijrating.animations,
							animated = animation.animated;
						if (!tar.is(isStar)) {
							return;
						}
						if (o.max && val > o.max) {
							return;
						}
						if (o.min && val < o.min) {
							return;
						}
						args = {
							oldValue: o.value,
							newValue: val,
							target: tar
						};
						if (self._trigger("rating", e, args) === false) {
							return false;
						}
						o.value = val;
						self._resetValue(val, o.ratingMode, o.icons.ratedIconsClass);
						allStars.removeClass(hoverStarClass);
						self._removeCustomizedIconsClass(o.icons.hoverIconsClass);
						args = {
							value: val,
							target: tar
						};
						
						if (animated) {
							if (animations && animations[animated]) {
								animations[animated](o, allStars, function () {
									self._trigger("rated", e, args);
								});
							} else if ($.effects && $.effects[animated]) {
								self._playJqueryAnimation(animation, allStars, 
									function () {
										//remove filter style to fix jquery animation 
										//bug in ie8.
										if ($.browser.msie && $.browser.version < 9) {
											allStars.css("filter", "");
										}
										self._trigger("rated", e, args);
									});
							} else {
								self._trigger("rated", e, args);
							}
						} else {
							self._trigger("rated", e, args);
						}
					}
				},
				resetButtonProxy = {
					element: self.ratingElement,
					mouseover: function (e) {
						var tar = $(e.target);
						tar = tar.closest("." + resetButtonClass);
						tar.addClass(resetButtonHoverClass);
						tar.addClass(uiStateHover);
						if (o.resetButton.customizedHoverClass && 
								o.resetButton.customizedHoverClass.length) {
							tar.addClass(o.resetButton.customizedHoverClass);
						}
					},
					mouseout: function (e) {
						var tar = $(e.target);
						tar = tar.closest("." + resetButtonClass);
						tar.removeClass(resetButtonHoverClass);
						tar.removeClass(uiStateHover);
						if (o.resetButton.customizedHoverClass && 
								o.resetButton.customizedHoverClass.length) {
							tar.removeClass(o.resetButton.customizedHoverClass);
						}
					},
					click: function (e) {
						var tar = $(e.target);
						self._setOption("value", 0);
						args = {
							target: tar
						};
						self._trigger("reset", e, args);
					}
				};
			$(isStar, this.ratingElement[0])
				.live("mouseover.wijrating",
					$.proxy(starProxyObj.mouseover, starProxyObj))
				.live("mouseout.wijrating",
					$.proxy(starProxyObj.mouseout, starProxyObj))
				.live("click.wijrating",
					$.proxy(starProxyObj.click, starProxyObj));
			$(isRestButton, this.ratingElement[0])
				.live("mouseover.wijrating",
					$.proxy(resetButtonProxy.mouseover, resetButtonProxy))
				.live("mouseout.wijrating",
					$.proxy(resetButtonProxy.mouseout, resetButtonProxy))
				.live("click.wijrating",
					$.proxy(resetButtonProxy.click, resetButtonProxy));
		},
		
		_clearIntentTimer: function () {
			var self = this;
			if (self.intentTimers && self.intentTimers.length) {
				$.each(self.intentTimers, function (i, timer) {
					if (timer) {
						window.clearTimeout(timer);
						timer = null;
					}
				});
			}
			self.intentTimers = [];
		},
		
		_playJqueryAnimation: function (animation, allStars, animationComplete) {
			var self = this,
				o = self.options,
				animationOption = {
					easing: animation.easing
				},
				animated = animation.animated;
			self._clearIntentTimer();
			allStars.each(function (i, star) {
				var hideDelay = Math.floor(i / o.split) * animation.delay,
					intentHideTimer;
				intentHideTimer = window.setTimeout(function () {
					$(star).hide(animated, animationOption, 
						animation.duration, function () {
							if (i !== allStars.length - 1) {
								return;
							}
							allStars.each(function (idx, showStar) {
								var showDelay = Math.floor(idx / o.split) * 
									animation.delay,
									intentShowTimer;
								intentShowTimer = window.setTimeout(function () {
									$(showStar).show(animated, animationOption, 
										animation.duration, function () {
											if (idx === allStars.length - 1) {
												if (animationComplete && 
														$.isFunction(animationComplete)) {
													animationComplete.call(this);
												}
											}
										});
								}, showDelay);
								self.intentTimers.push(intentShowTimer);
							});
						});
				}, hideDelay);
				self.intentTimers.push(intentHideTimer);
			});
		},
		
		_addCustomizedIconsClass: function (iconsClass, split) {
			var self = this,
				stars,
				idx = 0,
				iconsIdx = 0;
			if (iconsClass && iconsClass.length) {
				stars = $("." + normalStarClass, self.ratingElement[0]);
				stars.each(function (i, star) {
					if (idx === split) {
						idx = 0;
						iconsIdx++;
					}
					if (typeof (iconsClass) === "string") {
						$(star).addClass(iconsClass);
					} else if ($.isArray(iconsClass)) {
						if (iconsIdx < iconsClass.length) {
							$(star).addClass(iconsClass[iconsIdx]);
						}
					}
					idx++;
				});
			}
		},
		_addCustomizedHoverIconsClass: function (hoverIconsClass, split, target) {
			var self = this,
				o = self.options,
				direction = o.direction,
				ratingMode = o.ratingMode,
				allStars = $("." + normalStarClass, self.ratingElement[0]),
				tarIdx = allStars.index(target),
				iconIdx = 0,
				idx;
			if (hoverIconsClass && hoverIconsClass.length) {
				if (typeof (hoverIconsClass) === "string") {
					target.addClass(hoverIconsClass);
					if (ratingMode !== "single") {
						if (direction === "reversed") {
							target.parent().nextAll().children()
								.addClass(hoverIconsClass);
						} else {
							target.parent().prevAll().children()
								.addClass(hoverIconsClass);
						}
					}
				} else if ($.isArray(hoverIconsClass)) {
					if (ratingMode === "single") {
						if (direction === "reversed") {
							idx = allStars.length - 1 - tarIdx;
						} else {
							idx = tarIdx;
						}
						iconIdx = Math.floor(idx / split);
						if (hoverIconsClass.length > iconIdx) {
							target.addClass(hoverIconsClass[iconIdx]);
						}
					} else {
						if (direction === "reversed") {
							for (idx = allStars.length - 1; idx >= tarIdx; idx--) {
								iconIdx = Math.floor((allStars.length - 1 - idx) / split);
								if (hoverIconsClass.length > iconIdx) {
									$(allStars[idx]).addClass(hoverIconsClass[iconIdx]);
								}
							}
						} else {
							for (idx = 0; idx <= tarIdx; idx++) {
								iconIdx = Math.floor(idx / split);
								if (hoverIconsClass.length > iconIdx) {
									$(allStars[idx]).addClass(hoverIconsClass[iconIdx]);
								}
							}
						}
					}
				}
			}
		},
		
		_removeCustomizedIconsClass: function (iconsClass) {
			var self = this,
				allStars = $("." + normalStarClass, self.ratingElement[0]);
			if (iconsClass && iconsClass.length) {
				if (typeof (iconsClass) === "string") {
					allStars.removeClass(iconsClass);
				} else if ($.isArray(iconsClass)) {
					$.each(iconsClass, function (idx, iconClass) {
						allStars.removeClass(iconClass);
					});
				}
			}
		},

		_resetValue: function (value, ratingMode, ratedIconsClass) {
			var self = this,
				o = self.options,
				stars = $("." + normalStarClass, self.ratingElement[0]),
				rMode = ratingMode || o.ratingMode,
				isCustomizedClass = ratedIconsClass && ratedIconsClass.length,
				customizedIconIdx = 0,
				customizedIconClass;
			stars.each(function (idx, ele) {
				var content = $(ele),
					val = parseFloat(content.html());
				content.removeClass(ratedStarClass);
				//add aria support.
				content.parent().attr("aria-checked", false);
				if (isCustomizedClass) {
					if (typeof (ratedIconsClass) === "string") {
						content.removeClass(ratedIconsClass);
						customizedIconClass = ratedIconsClass;
					} else if ($.isArray(ratedIconsClass)) {
						$.each(ratedIconsClass, function (i, cl) {
							content.removeClass(cl);
						});
						
						if (o.direction === "reversed") {
							customizedIconIdx = Math.floor((stars.length - 1 - idx) /
								o.split);
						} else {
							customizedIconIdx = Math.floor(idx / o.split);
						}
						if (ratedIconsClass.length > customizedIconIdx) {
							customizedIconClass = ratedIconsClass[customizedIconIdx];
						}
					}
				}
				
				if (val === value) {
					content.addClass(ratedStarClass);
					if (isCustomizedClass) {
						content.addClass(customizedIconClass);
					}
					//add aria support.
					content.parent().attr("aria-checked", true);
				} else if (rMode === "continuous") {
					if (val < value) {
						content.addClass(ratedStarClass);
						if (isCustomizedClass) {
							content.addClass(customizedIconClass);
						}
					}
				}
				
			});
		},
		
		_resetTotalValue: function (value) {
			var self = this,
				o = self.options,
				content = o.hint,
				stars = $("." + normalStarClass, self.ratingElement[0]),
				starsLen = stars.length,
				star,
				val,
				newVal,
				idx = 0;
			for (idx; idx < starsLen; idx++) {
				newVal = Math.round((idx + 1) * value * 100 / starsLen) / 100;
				star = $(stars[idx]);
				val = parseFloat(star.html());
				//set new value.
				if (val === o.value) {
					o.value = newVal;
				}
				star.html(newVal);
				if (content && content.length && content.length >= idx &&
						content[idx] && content[idx].length) {
					star.attr("title", content[idx]);
				} else {
					star.attr("title", newVal);
				}
			}
		},
		
		_resetHint: function (content) {
			var self = this,
				stars = $("." + normalStarClass, self.ratingElement[0]),
				star,
				val,
				idx = 0;
			for (idx; idx < stars.length; idx++) {
				star = $(stars[idx]);
				val = parseFloat(star.html());
				if (content && content.length && content.length >= idx &&
						content[idx] && content[idx].length) {
					star.attr("title", content[idx]);
				} else {
					star.attr("title", val);
				}
			}
		},

		_createRating: function () {
			var self = this,
				element = self.ratingElement,
				o = self.options,
				resetButton,
				resetIcon,
				starContainer;
			element.addClass(widgetClass + " ui-widget");
			if (o.orientation === "vertical") {
				element.addClass(verticalClass);
			}
			//add reset button.
			resetButton = $("<div></div>");
			resetButton.addClass(resetButtonClass);
			resetButton.addClass(uiCornerAll);
			resetButton.addClass(uiStateDefault);
			if (o.resetButton.customizedClass && o.resetButton.customizedClass.length) {
				resetButton.addClass(o.resetButton.customizedClass);
			}
			resetButton.appendTo(element);
			//add aria support.
			resetButton.attr("role", "button");
			resetButton.attr("aria-label", "reset");
			resetButton.attr("aria-hidden", false);
			
			if (o.resetButton.hint && o.resetButton.hint.length) {
				resetButton.attr("title", o.resetButton.hint);
			}
			if (o.resetButton.disabled || o.disabled) {
				resetButton.hide();
				//add aria support
				resetButton.attr("aria-hidden", true);
			}

			resetIcon = $("<span></span>");
			resetIcon.addClass("ui-icon ui-icon-close");
			resetButton.append(resetIcon);
			
			//add star container.
			starContainer = $("<div></div>");
			//add aria support.
			starContainer.attr("role", "radiogroup");
			starContainer.addClass(starContainerClass);
			if (o.resetButton.position === "leftOrTop") {
				starContainer.appendTo(element);
			} else {
				starContainer.prependTo(element);
			}
			// create stars.
			self._createStars(o.split, o.count, starContainer);
		},
		
		_createStars: function (split, starCount, starContainer) {
			var self = this,
				o = self.options,
				hint = o.hint,
				content,
				star,
				val,
				idx = 0,
				splitIdx = 0,
				starWidth = Math.ceil(o.iconWidth / split),
				starHeight = Math.ceil(o.iconHeight / split),
				ratedIconsClass = o.icons.ratedIconsClass,
				customizedIconIdx,
				customizedIconClass,
				isCustomizedClass = ratedIconsClass && ratedIconsClass.length;
			starContainer.empty();
			for (idx; idx < starCount * split; idx++, splitIdx++) {
				val = Math.round((idx + 1) * o.totalValue * 
					100 / starCount / split) / 100;
				if (splitIdx === split) {
					splitIdx = 0;
				}
				star = $("<div></div>");
				//add aria support.
				star.attr("role", "radio");
				star.attr("aria-checked", false);
				if (o.orientation === "vertical") {
					star.width(o.iconWidth);
					star.height(starHeight);
				} else {
					star.width(starWidth);
					star.height(o.iconHeight);
				}
				star.addClass(starClass);
				content = $("<div>" + val + "</div>");
				content.addClass(normalStarClass);
				content.width(o.iconWidth);
				content.height(o.iconHeight);
				//add aria support.
				star.attr("aria-label", val);
				if (splitIdx > 0 && o.direction === "normal") {
					if (o.orientation === "vertical") {
						content.css({
							"margin-top": "-" + splitIdx * starHeight + "px"
						});
					} else {
						content.css({
							"margin-left": "-" + splitIdx * starWidth + "px"
						});
					}
				} else if (splitIdx < split - 1 && o.direction === "reversed") {
					if (o.orientation === "vertical") {
						content.css({
							"margin-top": "-" + (split - 1 - splitIdx) * starHeight + "px"
						});
					} else {
						content.css({
							"margin-left": "-" + (split - 1 - splitIdx) * starWidth + "px"
						});
					}
				}
				if (!hint.disabled) {
					if (hint.content && hint.content.length) {
						if (idx <= hint.content.length) {
							content.attr("title", hint.content[idx]);
							//add aria support.
							star.attr("aria-label", hint.content[idx]);
						}
					} else {
						content.attr("title", val);
					}
				}
				if (isCustomizedClass) {
					if (typeof (ratedIconsClass) === "string") {
						customizedIconClass = ratedIconsClass;
					} else if ($.isArray(ratedIconsClass)) {
						if (o.direction === "reversed") {
							customizedIconIdx = Math.floor((starCount * split - 1 - idx) /
								split);
						} else {
							customizedIconIdx = Math.floor(idx / split);
						}
						if (ratedIconsClass.length > customizedIconIdx) {
							customizedIconClass = ratedIconsClass[customizedIconIdx];
						}
					}
				}
				if (val === o.value) {
					content.addClass(ratedStarClass);
					if (isCustomizedClass) {
						content.addClass(customizedIconClass);
					}
					//add aria support.
					star.attr("aria-checked", true);
				} else if (val < o.value && o.ratingMode === "continuous") {
					content.addClass(ratedStarClass);
					if (isCustomizedClass) {
						content.addClass(customizedIconClass);
					}
				}
				content.appendTo(star);
				if (o.direction === "reversed") {
					star.prependTo(starContainer);
				} else {
					star.appendTo(starContainer);
				}
			}
			//add customized class
			self._addCustomizedIconsClass(o.icons.iconsClass, split);
		},
		
		_parseRadio: function () {
			var self = this,
				o = self.options,
				hintValues = [],
				radios = $("input:[type='radio']", self.element);
			if (radios.length) {
				o.count = radios.length;
				o.totalValue = radios.length;
				radios.each(function (idx, radio) {
					var jRadio = $(radio),
						radioId = jRadio.attr("id"),
						jLabel;
					if (radioId && radioId.length > 0) {
						jLabel = $("label:[for='" + radioId + "']", self.element);
						if (jLabel.length) {
							hintValues.push(jLabel.html());
						} else {
							hintValues.push("");
						}
					} else {
						hintValues.push("");
					}
					if (jRadio.is(":checked")) {
						o.value = idx + 1;
					}
				});
				o.hint.content = hintValues;
			}
		},

		_parseSelect: function () {
			var self = this,
				o = self.options,
				hintValues = [],
				opts = $("option", self.element);
			if (opts.length) {
				o.count = opts.length;
				o.totalValue = opts.length;
				opts.each(function (idx, opt) {
					var jOpt = $(opt);
					hintValues.push(jOpt.html());
					if (jOpt.is(":selected")) {
						o.value = idx + 1;
					}
				});
				o.hint.content = hintValues;
			}
		}
	});
	
	$.extend($.wijmo.wijrating, {
		animations: {
			scroll: function (options, stars, animationComplete) {
				var o = options,
					aniCmp = animationComplete,
					duration = 250,
					delay = 500,
					starDelay = 250,
					starsArr = jQuery.makeArray(stars);  
				starsArr.reverse();
				$.each(starsArr, function (i, star) {
					var hideDelay = Math.floor(i / o.split) * starDelay,
						showAnimate = {
							width: 0
						},
						intentHideTimer,
						delayTimer;
					intentHideTimer = window.setTimeout(function () {
						$(star).animate(showAnimate, duration, function () {
							window.clearTimeout(intentHideTimer);
							if (i !== stars.length - 1) {
								return;
							}
							delayTimer = window.setTimeout(function () {
								stars.each(function (idx, showStar) {
									var showDelay = Math.floor(idx / o.split) * starDelay,
										hideAnimate = {
											width: o.iconWidth
										},
										intentShowTimer;
									intentShowTimer = window.setTimeout(function () {
										$(showStar).animate(hideAnimate, duration, 
											function () {
												window.clearTimeout(intentShowTimer);
												if (idx === stars.length - 1) {
													if (aniCmp && $.isFunction(aniCmp)) {
														aniCmp.call(this);
													}
												}
											});
									}, showDelay);
								});
								window.clearTimeout(delayTimer);
							}, delay);
						});
					}, hideDelay);
				});
				if (animationComplete && $.isFunction(animationComplete)) {
					animationComplete.call(this);
				}
			}
		}
	});
}(jQuery));
