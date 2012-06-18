/*globals jQuery,window,S,document */
/*
*
* Wijmo Library 2.1.1
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the MIT or GPL Version 2 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
*
* * Wijmo Gallery widget.
* 
* Depends:
*   jquery-1.5.1.js
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.position.js
*
*/
(function ($) {
	"use strict";
	var clearfixCss = "ui-helper-clearfix",
	contentCss = "ui-widget-content",
	cornerCss = "ui-corner-all",
	disableCss = "ui-state-disabled",
	hoverCss = "ui-state-hover",
	defaultCss = "ui-state-default",
	cssPrefix = "wijmo-wijgallery-",
	btnCssPrefix = cssPrefix + "button-",
	//thumbsCss = cssPrefix + "thumbs",
	btnCss = cssPrefix + "button",
	eBtnCss = "ui-icon-triangle-1-e",
	wBtnCss = "ui-icon-triangle-1-w",
	playBtnCss = "ui-icon-play",
	pauseBtnCss = "ui-icon-pause",
	pointerCss = "ui-widget-content ui-state-default wijmo-wijgallery-thumbs-pointer-{0}",
	flashCss = "wijmo-wijgallery-flashwrapper",

	frameHtml = "<div class=\"wijmo-wijgallery-frame  " +
	"ui-widget-content " + clearfixCss + "\">" +
	"<div class=\"wijmo-wijgallery-content\"></div></div>",

	thumbsHtml = "<div class=\"wijmo-wijgallery-thumbs\"></div>",

	btnHtml = "<a class=\"ui-state-default\">" +
	"<span class=\"ui-icon\"></span></a>",

	navHtml = "<div class=\"wijmo-wijgallery-frame-{0}\">" +
	"<a href=\"#\" class=\"wijmo-wijgallery-frame-link\"></a></div>",

	captionHtml = "<div class=\"ui-widget-content " + clearfixCss + "\"></div>",

	carouselItem = "li.wijmo-wijcarousel-item";

	$.widget("wijmo.wijgallery", {
		options: {
			/// <summary>
			/// Allows pictures to be played automatically.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { auto: true } );
			/// </summary>
			autoPlay: false,
			/// <summary>
			/// If it is set to true the thumbnails will auto 
			/// scrolled after you select the image.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { scrollWithSelection: true } );
			/// </summary>
			scrollWithSelection: false,
			/// <summary>
			/// Determines the time span between pictures in autoplay mode. 
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { interval: 3000 } );
			/// </summary>
			showTimer: true,
			/// <summary>
			/// Determines the time span between 2 pictures showing in autoplay mode. 
			/// Default: 5000.
			/// Type: Number.
			/// Code example: $("#element").wijgallery( { interval: 3000 } );
			/// </summary>
			interval: 5000,
			/// <summary>
			/// Determines whether the caption of items should be shown.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { showCaption: true } );
			/// </summary>
			showCaption: true,
			/// <summary>
			/// An object collection that contains the data of the gallery.
			/// Default: [].
			/// Type: Array.
			/// Code example: 
			/// $("#element").wijgallery( { data: [{
			///		url: "../thumb/image1.jpg",
			///		thumbUrl: "../images/image1.jpg",
			///		title: "<span>Word Caption 1</span>"
			/// },{
			///		imageUrl: "../thumb/image2.jpg",
			///		linkUrl: "../images/image2.jpg",
			///		title: "<span>Word Caption 2</span>"
			/// }] } );
			/// </summary>	
			data: [],
			/// <summary>
			/// Determines whether the custom control should be shown.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { showControls: true } );
			/// </summary>
			showControls: false,
			/// <summary>
			/// Determines the innerHTML of the custom control.
			/// Default: "".
			/// Type: String.
			/// Code example: $("#element").wijgallery( { control: "<div>Blah</div>" } );
			/// </summary>
			control: "",
			/// <summary>
			/// A value that indicates the position settings for the custom control.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $("#element").wijgallery( { 
			///		pagerType: {
			///			my: 'left bottom', 
			///			at: 'right top', 
			///			offset: '0 0'} 
			/// });
			/// </summary>
			controlPosition: {},
			/// <summary>
			/// Determines the orientation of the caption. 
			/// Possible values are: "vertical" & "horizontal"
			/// Default: "horizontal".
			/// Type: String.
			/// Code example: $("#element").wijgallery( { 
			///		captionOrientation: "vertical" 
			///	} );
			/// </summary>
			// captionOrientation: "horizontal",
			/// <summary>
			/// Determines if the counter should be shown.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { 
			///		showCounter: false 
			///	} );
			/// </summary>
			showCounter: true,
			///	<summary>
			///	Determines the text format of counter.
			/// Default: '[i] of [n]'
			/// Type: String
			/// '[i]' and '[n]' are built-in parameters represents 
			/// the current page index and the number of pages.
			/// Code example:
			///  $("#id").wijgallery({
			///      counter: '[i]/[n]'
			///  });
			///	</summary>
			counter: "[i] of [n]",
			/// <summary>
			/// Determines if the pager should be shown.
			/// Default: false.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { 
			///		showPager: false 
			///	} );
			/// </summary>
			showPager: false,
			/// <summary>
			/// Determines the position of the pager.
			/// Default: {}.
			/// Type: Object.
			/// Code example: $("#element").wijgallery( { 
			///		pagingPosition: { my:{ },at:{ } } ;
			///	} );
			/// </summary>
			pagingPosition: {},
			///<summary>
			/// Determines if the thumbnails should be shown.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { 
			///		thumbnails: false 
			///	} );
			///</summary>
			/// thumbnails: true,
			/// <summary>
			/// Determines the orientation of the thumbnails. 
			/// Possible values are: "vertical" & "horizontal"
			/// Default: "horizontal".
			/// Type: String.
			/// Code example: $("#element").wijgallery( { 
			///		thumbnailOrientation: "vertical" 
			///	} );
			/// </summary>
			thumbnailOrientation: "horizontal",
			/// <summary>
			/// Determines the direction of the thumbnails. 
			/// Possible values are: "before" & "after"
			/// Default: "after".
			/// Type: String.
			/// Code example: $("#element").wijgallery( { 
			///		thumbnailOrientation: "before" 
			///	} );
			/// </summary>
			thumbnailDirection: "after", //
			/// <summary>
			/// A value determines the settings of the animation effect to 
			/// be used when the wijgallery is scrolling.
			/// Type: Object.
			/// Code example: $("#element").wijgallery( { 
			///		transitions: {
			///			animated: "slide",
			///			duration: 1000
			///		}
			///	} );
			/// </summary>
			transitions: {
				animated: "slide",
				duration: 1000,
				easing: null
			},
			/// <summary>
			/// Determines whether the controls should be shown after created
			/// or hover on the dom element.
			/// Default: true.
			/// Type: Boolean.
			/// Code example: $("#element").wijgallery( { showControlsOnHover: true } );
			/// </summary>
			showControlsOnHover: true,
			/// <summary>
			/// Determines how many thumbnails should be displayed.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#element").wijgallery( { thumbsDisplay: 6 } );
			/// </summary>
			thumbsDisplay: 5,
			/// <summary>
			/// Determines how many thumbnails should be displayed.
			/// Default: 5.
			/// Type: Number.
			/// Code example: $("#element").wijgallery( { thumbsDisplay: 6 } );
			/// </summary>
			thumbsLength: 100,
			/// <summary>
			/// The beforeTransition event handler.
			/// A function called before transition to another image.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $("#element").wijgallery( { beforeTransition: function () {} } );
			/// Bind to the event by type: wijgallerybeforetransition.
			/// $("#element").bind("wijgallerybeforetransition", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// Include informations that relates to this event.
			/// data.index : the index of the current image.
			///	data.to : the index of the image that will scrolled to.
			/// </param>
			beforeTransition: null,
			/// <summary>
			/// The afterTransition event handler.
			/// A function called after transition played over.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $("#element").wijgallery( { afterTransition: function () {} } );
			/// Bind to the event by type: wijgalleryaftertransition
			/// $("#element").bind("wijgalleryaftertransition", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// Include informations that relates to this event.
			/// data.index : the index of the current image.
			///	data.to : the index of the image that will scrolled to.
			/// </param>
			afterTransition: null,
			/// <summary>
			/// The loadCallback event handler.
			/// A function called after created the dom element.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $("#element").wijgallery( { loadCallback: function () {} } );
			/// Bind to the event by type: wijgalleryloadcallback
			/// $("#element").bind("wijgalleryloadcallback", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			loadCallback: null,
			///	<summary>
			///	Determines whether to turn on the movie controls in movie player.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///  $("#id").wijgallery({
			///      showMovieControls: false
			///  });
			///	</summary>
			showMovieControls: false,
			///	<summary>
			///	Determines whether to turn on the autoplay option in movie player.
			/// Default: true
			/// Type: Boolean
			/// Code example:
			///  $("#id").wijgallery({
			///      autoPlayMovies: false
			///  });
			///	</summary>
			autoPlayMovies: true,
			///	<summary>
			///	A hash object that contains parameters for flash object.
			/// Type: Object
			/// Code example:
			///  $("#id").wijgallery({
			///      flashParams: { allowfullscreen: false }
			///  });
			///	</summary>
			flashParams: {
				bgcolor: "#000000",
				allowfullscreen: true,
				wmode: "transparent"
			},
			///	<summary>
			///	A hash object that contains variants for flash object.
			/// Code Example: 
			/// $("#id").wijgallery({  flashVars: { width:300,  height:400 } });
			///	</summary>
			flashVars: {},
			///	<summary>
			///	Version of flash object.
			/// Default: "9.0.115"
			/// Type: String
			/// Code Example: 
			/// $("#id").wijgallery({  flashVersion: "8.0" })
			///	</summary>
			flashVersion: "9.0.115",
			///	<summary>
			///	The relative path and name of the flash vedio player.
			/// Default: 'player\\player.swf'
			/// Type: String
			/// Code Example: 
			/// $("#id").wijgallery({  flvPlayer: "player\\player2.swf " });
			///	</summary>
			flvPlayer: 'player\\player.swf',
			///	<summary>
			///	The relative path and name of the flash installation guide.
			/// Default: 'player\\expressInstall.swf'
			/// Type: String
			/// Code Example: 
			/// $("#id").wijgallery({  flashInstall: " player\expressInstall2.swf " });
			///	</summary>
			flashInstall: 'player\\expressInstall.swf',
			///	<summary>
			///	Determines the display mode of the gallery.
			/// Possible values: "img", "iframe", "swf", "flv"
			/// Default: 'img'
			/// Type: String
			/// Code example:
			///  $("#id").wijgallery({  mode: "swf" });
			///	</summary>
			mode: "img"
		},

		_setOption: function (key, value) {
			var self = this, o = self.options, el, create, old, text;
			if (key === "framePosition" ||
				key === "thumbnailPosition" ||
				key === "transitions" ||
				key === "pagingPosition") {
				$.extend(true, o[key], value);
			}
			else {
				old = o[key];
				$.Widget.prototype._setOption.apply(self, arguments);
				switch (key) {
					case "disabled":
						self._handleDisabledOption(value, self.element);
						break;
					case "thumbnailOrientation":
						self.thumbs[self.thumbWidgetName]({
							orientation: value
						});
						break;
					case "thumbsDisplay":
						self.thumbs[self.thumbWidgetName]({
							display: value
						});
						break;
					case "autoPlay":
						self[value ? "play" : "pause"]();
						break;
					case "showCounter":
					case "showTimer":
					case "showControls":
						el = key.replace(/show/i, "").toLowerCase();
						create = key.replace(/show/i, "_create");
						if (value !== old) {
							if (value === true) {
								if (!self[el]) {
									self[create]();
								}
								else if (self[el].jquery) {
									self[el].show();
								}
							}
							else {
								self[el].hide();
							}
						}
						break;
					case "showCaption":
						if (value) {
							self._createCaption(self.size);
							text = self._loadCaption(self.images[self.currentIdx]);
							text.show();
						} else {
							self.element
							.find(".wijmo-wijgallery-caption,.wijmo-wijgallery-text")
							.remove();
						}
						break;
					case "showPager":
					case "thumbsLength":
					case "thumbnailDirection":
					case "showControlsOnHover":
					case "mode":
					case "data":
						self._destroy();
						self._create();
						break;
					default:
						break;
				}
			}
		},

		thumbWidgetName: "wijcarousel",

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (self.pager && !self.pager.is(":hidden")) {
				self.disabledEles = self.disabledEles.add(self.pager);
			}
			if (disabled) {
				if (!self.disabledDiv.length) {
					self._createDisabledDiv();
				}
				self.disabledDiv.appendTo("body");
			}
			else if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = $();
			}
		},

		_createDisabledDiv: function () {
			var self = this;

			self.disabledEles.each(function () {
				var ele = $(this),
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight(),
				div = $("<div></div>")
				.addClass("ui-state-disabled")
				.css({
					"z-index": "99999",
					position: "absolute",
					width: disabledWidth,
					height: disabledHeight,
					left: eleOffset.left,
					top: eleOffset.top
				});
				if ($.browser.msie) {
					div.css("background-color", "white");
					if ($.browser.version === "9.0") {
						div.css("opacity", "0.1");
					}
				}
				self.disabledDiv = self.disabledDiv.add(div);
			});
		},

		_initLi: function (li) {
			var a = li.children("a:eq(0)"), img = li.find("img:eq(0)"),
			caption = li.find("span:eq(0)"), imgData = {
				title: img.attr("alt"),
				caption: null
			};

			if (a.length && a.attr("href")) {
				imgData.url = a.attr("href");
				if (!imgData.title) {
					imgData.title = a.attr("title");
				}
			}
			else if (img.length) {
				imgData.url = img.attr("src");
			}

			if (caption.length) {
				imgData.caption = caption;
			}
			else if (img.attr("title")) {
				imgData.caption = $("<span>").html(img.attr("title"));
			}
			imgData.thumbUrl = img.attr("src");
			return imgData;
		},

		_initStatus: function () {
			var self = this, lis;
			self.images = [];
			self.ul = self.element.children("ul");
			lis = self.ul.children("li");
			self.count = lis.length;
			lis.each(function (i) {
				var imgData = self._initLi($(this));
				self.images.push(imgData);
			});
		},

		_createMarkupFromData: function () {
			var self = this, o = self.options, items = o.data,
            el = self.element, ul = el.children("ul:eq(0)");
			self.images = items;

			if (ul.length) {
				ul.empty();
			}
			else {
				ul = $("<ul>").appendTo(el);
			}
			self.ul = ul;
			$.each(items, function (idx, item) {
				var link = $("<a>"), li = $("<li>"), img = $("<img>");
				if (item.url) {
					link.attr("href", item.url);
				}
				if (item.thumbUrl) {
					img.attr("src", item.thumbUrl);
				}
				if (item.title) {
					img.attr("alt");
				}
				link.append(img).appendTo(li);
				li.appendTo(ul);
			});
			self.count = items.length;
		},

		_create: function () {
			var self = this, o = self.options;
			self.container = self.element;
			self.container.addClass("wijmo-wijgallery ui-widget");
			self.currentThumbIdx = 0;
			self.currentIdx = -1;
			self.disabledEles = self.element;
			self.disabledDiv = $();

			if (o.showPager) {//remove this.
				o.pagingPosition = true;
				o.thumbnails = false;
			}
			else {
				o.thumbnails = true;
			}
			if (o.data && o.data.length) {
				self._createMarkupFromData();
			}
			else {
				self._initStatus();
			}
			if (o.loadCallback && $.isFunction(o.loadCallback)) {
				self._trigger("loadCallback", null, self);
			}

			self._createDom();
			if (o.autoPlay) {
				self.play();
			}

			if (o.showControlsOnHover) {
				self.frame.find(".wijmo-wijpager," +
				".wijmo-wijgallery-button-next,.wijmo-wijgallery-counter," +
				".wijmo-wijgallery-button-previous").hide();

				if (!self.isPlaying && self.timer) {
					self.timer.hide();
				}
			}
			if (o.disabled) {
				self.disable();
			}
		},

		_createDom: function () {
			var self = this, o = self.options;

			if (o.thumbnails) {
				self._createThumbnails();
			}
			else {
				self.ul.hide();
			}

			self._createFrame();

			if (o.control) {
				self._createControls();
			}

			if (o.showCounter) {
				self._createCounter();
			}

			if (o.showTimer) {
				self._createTimer();
			}

			if (o.showPager) {
				self._createPager();
			}
		},

		_getFrameSize: function () {
			var self = this,
			or = self.options.thumbnailOrientation === "horizontal",
			height = self.element.height() - (or ? (self.thumbs ?
			self.thumbs.outerHeight(true) : 0) : 0),
			width = self.element.width() - (or ? 0 : (self.thumbs ?
			self.thumbs.outerWidth(true) : 0));
			return {
				w: (width < 2 || !width) ? 750 : width,
				h: (height < 2 || !height) ? 300 : height
			};
		},

		_createFrame: function () {
			var self = this, o = self.options, w, h,
			//currentImg = self.images[self.currentIdx],
			size = self._getFrameSize(), d = o.thumbnailDirection === "after";

			self.frame = $(frameHtml)[d ? "prependTo" : "appendTo"](self.container)
            .setOutWidth(size.w - 1)//fixed 1px in all browser
			//.setOutWidth($.browser.msie ? size.w - 1 : size.w)//fixed 1px in ie
			.setOutHeight(size.h).wrap("<div class=\"wijmo-wijgallery-framewrapper\">");
			self.size = size;
			w = self.frame.width();
			h = self.frame.height();
			self.frameWrapper = self.frame.parent();

			if (o.thumbnailOrientation === "vertical") {
				self.frameWrapper.addClass("wijmo-wijgallery-framewrapper-vertical");
			}

			if (o.showControlsOnHover) {
				self.frame.bind("mouseenter." + self.widgetName, function () {
					self._showControls("controls");
				}).bind("mouseleave." + self.widgetName, function () {
					self._hideControls("controls");
				});
			}
			self.content = self.frame.children("div.wijmo-wijgallery-content");

			if (o.mode === "img") {
				self._createFrameMask();
			}
			self._createPrevNextBtn();
			self._createCaption(size);
			self._createLoading();

			self.last =
			$("<div class=\"ui-widget-overlay wijmo-wijgallery-last\"></div>")
			.appendTo(self.content).width(w).height(h)
			.css({ "line-height": size.h + "px" });

			self.current =
			$("<div class=\"ui-widget-overlay wijmo-wijgallery-current\"></div>")
			.appendTo(self.content).width(w).height(h)
			.css({ "line-height": size.h + "px" });

			self._show(0);
		},

		_createControls: function () {
			var self = this, o = self.options, position = {
				collision: "none",
				of: self.container,
				my: "center bottom",
				at: "center bottom"
			};
			if (o.control) {
				self.controls = $(o.control)
				.css({ position: "absolute" })
				.appendTo(self.container);
				$.extend(position, o.controlPosition);
				self.controls.position(position);
			}
		},

		_createLoading: function () {
			var self = this;
			self.loading = $("<div></div>")
				.addClass("wijmo-wijgallery-loading")
				.appendTo(self.content);

			self.loading.css({
				left: (self.content.width() - self.loading.width()) / 2,
				top: (self.content.height() - self.loading.height()) / 2
			});

			self.loading.hide();
		},

		_createFrameMask: function () {
			var self = this, o = self.options;

			$.each(["previous", "next"], function (i, n) {
				var nav = $(navHtml.replace(/\{0\}/, n))
				.appendTo(self.frame),
				link = nav.children("a");

				if (o.showControlsOnHover) {
					nav.bind("mouseenter." + self.widgetName, function () {
						self._showControls(n);
					}).bind("mouseleave." + self.widgetName, function () {
						self._hideControls(n);
					});
				}
				link.bind("click." + self.widgetName, function (event) {
					self[n]();
					event.preventDefault();
				});
			});

		},

		_createCounter: function () {
			var self = this, o = self.options;

			if (!o.showCounter) {
				if (self.counter) {
					self.counter.remove();
					self.counter = undefined;
				}
				return;
			}

			if (!self.counter) {
				self.counter = $("<div></div>")
				.addClass("wijmo-wijgallery-counter " +
				"ui-state-default ui-corner-tl")
				.appendTo(self.frame);
			}
			self._refreshCounter();
		},

		_refreshCounter: function () {
			var self = this, o = self.options, counter;
			if (!self.counter) {
				return;
			}
			self.counter.empty();

			if (o.counter) {
				counter = o.counter.replace(/\[i\]/, self.currentIdx + 1);
				counter = counter.replace(/\[n\]/, self.count);

				$("<span></span>")
				.text(counter)
				.appendTo(self.counter);
			}

		},

		_createPrevNextBtn: function () {
			var self = this;

			$.each(["next", "previous"], function (i, n) {
				var css = n === "next" ? eBtnCss : wBtnCss, panel;
				panel = self.frame.find(".wijmo-wijgallery-frame-" + n);
				if (!panel.length || self.options.mode !== "img") {
					panel = self.frame;
				}
				self[n + "Btn"] = $(self._createBtn(btnCssPrefix + n, css))
				.bind("click." + self.widgetName, $.proxy(self[n], self))
				.appendTo(panel);
				self._applyBtnStyle(n);
			});
		},

		_applyBtnStyle: function (dir) {
			var self = this,
			isNext = dir === "next", btn = self[dir + "Btn"],
			at = isNext ? "right center" : "left center", my = at,
			css = "ui-corner-" + (isNext ? "left" : "right"),
			condition = dir === "next" ?
			(self.currentIdx >= self.count) : (self.currentIdx <= 0),
			nextPosition = {
				collision: "none",
				of: self.frame,
				my: my,
				at: at
			};
			btn.addClass(css).position(nextPosition);

			if (condition) {
				btn.removeClass(hoverCss).addClass(disableCss);
			}
			else if (btn.hasClass(disableCss)) {
				btn.removeClass(disableCss);
			}
		},

		_createCaption: function (size) {
			var self = this, o = self.options;
			if (o.showCaption) {

				self.overlay =
					$(captionHtml).addClass("wijmo-wijgallery-caption")
					.width(size.w)
					.appendTo(self.content);

				self.caption =
					$(captionHtml).addClass("wijmo-wijgallery-text")
					.width(size.w)
					.appendTo(self.content);
			}
		},

		_loadCaption: function (image) {
			var self = this, content = image.caption, height,
			caption = $("<span></span>"),
            text = self.element.find(".wijmo-wijgallery-text," +
			".wijmo-wijgallery-caption");

			if (content) {
				text.show();
				if (content.jquery) {
					content.show();
				}
				caption.html(content);
				self.caption.empty().append(caption);
				height = caption.outerHeight(true);
				text.height(height);
				//ie get wrong height at first time. the 2nd is right.
				if ($.browser.msie) {
					text.height(caption.css("display", "block").outerHeight(true));
				}
			}
			text.hide();
			return text;
		},

		_showCaption: function (img) {
			var self = this;

			if (img && img.caption) {
				if (self.caption.length) {
					self.caption.fadeIn(500);
				}
				if (self.overlay.length) {
					self.overlay.show()
					.animate({ opacity: 0.5 }, 500);
				}
			}
		},

		_createTooltip: function (dir) {
			var self = this, d = dir || "bottom";
			self.pointer = $("<div>")
			.addClass(pointerCss.replace(/\{0\}/, d));
			self.pointer.appendTo(self.thumbsWrapper).hide();
		},

		_createThumbnails: function () {
			var self = this, o = self.options, d = o.thumbnailDirection === "after",
			thumbClass = "wijmo-wijgallery-thumbs-{0}",
			or = o.thumbnailOrientation === "horizontal",
			postFix = d ? (or ? "bottom" : "right") : (or ? "top" : "left");

			self.thumbPosition = postFix;
			self.thumbs = $(thumbsHtml).appendTo(self.container)
			.addClass(contentCss)
			.addClass(or ? "wijmo-wijcarousel-horizontal-multi" :
			"wijmo-wijcarousel-vertical-multi");

			if (or) {
				self.thumbs.css({ height: o.thumbsLength + "px" })
				.setOutWidth(self.element.width());
			}
			else {
				self.thumbs.css({ width: o.thumbsLength + "px" })
				.setOutHeight(self.element.height());
			}

			self.ul.appendTo(self.thumbs);

			self.ul.children("li").each(function (i) {
				var link = $(this).children("a"), data = self.images[i],
				href = data.thumbUrl;
				if (!link.length) {
					link = $(this).wrapInner("<a>").children("a");
					link.attr("href", href);
				}
			});

			if ($[self.namespace][self.thumbWidgetName]) {

				self.thumbs.addClass(thumbClass
				.replace(/\{0\}/, postFix)).find("li")
				.addClass(defaultCss).hover(function () {
					$(this).addClass(hoverCss);
				}, function () {
					$(this).removeClass(hoverCss);
				});

				self.thumbsWrapper = self.thumbs[self.thumbWidgetName]({
					display: o.thumbsDisplay,
					step: o.thumbsDisplay - 1,
					itemPadding: "0 10px",
					showCaption: false,
					orientation: o.thumbnailOrientation,
					loop: false,
					itemClick: function (event, ui) {
						var idx = ui.index;
						self.show(idx);
						event.preventDefault();
					},
					afterScroll: function (event, ui) {
						self.currentThumbIdx = ui.firstIndex;
						if (self.activeLi &&
						self.activeLi.is("li") &&
						self.activeLi.index() >= ui.firstIndex &&
						self.activeLi.index() <= ui.lastIndex) {
							self._highlightThumb(self.activeLi);
						}
						self.isScrolling = false;
					},
					beforeScroll: function (event, ui) {
						self.isScrolling = true;
						if (o.mode === "swf" || o.mode === "flv") {
							self.pointer.hide();
						}
						else {
							self.pointer.fadeOut(100);
						}
					}
				}).wrap("<div class=\"wijmo-wijgallery-thumbswrapper\">").parent();

				if (!or) {
					self.thumbsWrapper
					.addClass("wijmo-wijgallery-thumbswrapper-vertical");
				}
				self._createTooltip(postFix);
			}
		},

		_calculatePosition: function (offset, w, h, lw, lh, b) {
			var self = this;
			if (self.thumbPosition === "bottom") {
				offset.left = offset.left + (lw - w) / 2 + b;
				offset.top = offset.top - h;
			}
			else if (self.thumbPosition === "top") {
				offset.left = offset.left + (lw - w) / 2 + b;
				offset.top = offset.top + lh + 2 * b;
			}
			else if (self.thumbPosition === "left") {
				offset.left = offset.left + lw + 2 * b;
				offset.top = offset.top + (lh - h) / 2 + b;
			}
			else if (self.thumbPosition === "right") {
				offset.left = offset.left - w;
				offset.top = offset.top + (lh - h) / 2 + b;
			}
		},

		_highlightThumb: function (li) {
			var self = this, w, h, lw, lh, offset, b;
			if (li && li.length) {
				li.siblings("li.wijmo-wijgallery-selected")
				.removeClass("wijmo-wijgallery-selected ui-state-active");
				li.addClass("wijmo-wijgallery-selected ui-state-active");

				w = self.pointer.outerWidth(true);
				h = self.pointer.outerHeight(true);
				lw = li.width();
				lh = li.height();
				offset = li.offset();

				//b = li.outerWidth(true)- li.outerWidth();
				// get border of li.
				b = 5;
				self._calculatePosition(offset, w, h, lw, lh, b);

				self.pointer.fadeIn(100);
				self.pointer.offset(offset);
			}
		},

		_getSelector: function (content, includeTimer) {
			var selector, btnPrefix = ".wijmo-wijgallery-button-",
			controls = ".wijmo-wijpager,.wijmo-wijgallery-counter";

			if (includeTimer) {
				controls += ",.wijmo-wijgallery-timerbar";
			}

			if (content === "next" || content === "previous") {
				selector = btnPrefix + content;
			}
			else if (content === "controls") {
				selector = controls;
			}
			else {
				selector = controls + "," +
				btnPrefix + "next," +
				btnPrefix + "previous";
			}
			return selector;
		},

		_showControls: function (content) {
			var self = this, selector;
			selector = self._getSelector(content, !self.isPlaying && self.timer);
			self.frame.find(selector).stop(true, true)
			.fadeIn(400, function () {
				$(this).css('opacity', '');
			});
		},

		_hideControls: function (content) {
			var self = this, selector;
			selector = self._getSelector(content, !self.isPlaying && self.timer);
			this.frame.find(selector).stop(true, true)
			.fadeOut(600);
		},

		_createPager: function () {
			var self = this, o = self.options, pager, display = o.thumbsDisplay,
			pageCount = 1, pageIndex = self.currentIdx, currentIdx = self.currentIdx,
			position = {
				collision: "none",
				of: self.container,
				my: "right top",
				at: "right bottom"
			};
			if (o.thumbnails) {
				pager = $("<div></div>").appendTo(self.thumbs);

				if (display !== 0) {
					pageCount = Math.ceil(self.count / display);
					pageIndex = Math.ceil(self.currentIdx / display);
				}

				self.pager = pager.wijpager({
					pageCount: pageCount,
					pageIndex: pageIndex,
					pageButtonCount: pageCount,
					mode: "numeric",
					pageIndexChanged: function (event, ui) {
						var idx = ui.newPageIndex;
						if (currentIdx < idx * display ||
						currentIdx >= (idx + 1) * display) {
							self.thumbs[self.thumbWidgetName]("scrollTo",
							(idx * display));
						}
						event.preventDefault();
					}
				}).css({
					position: "absolute"
				});

			}
			else {
				pager = $("<div></div>").appendTo(self.container);
				self.pager = pager.wijpager({
					pageCount: self.count,
					pageIndex: self.currentIdx,
					pageButtonCount: self.count,
					mode: "numeric",
					pageIndexChanged: function (event, ui) {
						var idx = ui.newPageIndex;
						self._show(idx);
					}
				}).css({
					position: "absolute"
				});

				$.extend(position, o.pagingPosition);
				self.pager.addClass("wijmo-wijgallery-pager").position(position);
			}
		},

		_createBtn: function (btnClass, itemClass) {
			var btn = $(btnHtml);
			btn.addClass(btnClass)
			.attr("role", "button")
			.bind("mouseover" + this.widgetName, function () {
				if ($(this).hasClass(disableCss)) {
					return;
				}
				$(this).addClass(hoverCss);
			})
			.bind("mouseout" + this.widgetName, function () {
				if ($(this).hasClass(disableCss)) {
					return;
				}
				$(this).removeClass(hoverCss);
			});
			btn.children("span:eq(0)").addClass(itemClass);
			return btn;
		},

		_createTimer: function () {
			var self = this;
			self._createPausePlay();

			self.progressBar = $("<div></div>")
			.addClass("wijmo-wijgallery-timerbar-inner " + cornerCss)
			.css({ width: "0%" })
			.attr("role", "progressbar");

			self.timer = $("<div></div>")
            .addClass("wijmo-wijgallery-timerbar " + cornerCss)
			.appendTo(self.frame)
            .append(self.progressBar)
            .append(self.playPauseBtn);
		},

		_createPausePlay: function () {
			var self = this, o = self.options;
			self.playPauseBtn = $(self._createBtn(btnCss,
			o.autoPlay ? pauseBtnCss : playBtnCss))
			.bind("click." + self.widgetName, function () {
				if (!$(this).hasClass(disableCss)) {
					var icon = $(this).children("span:eq(0)");
					self[icon.hasClass(playBtnCss) ? "play" : "pause"]();
				}
			});
		},

		_show: function (index) {
			var self = this, img = self.images[index],
			iframeContent, lastContent,
			newImg, size = self._getFrameSize(), o = self.options, m = o.mode;
			if (self.currentIdx === index) {
				return;
			}

			if (img && $.isPlainObject(img)) {
				self.loading.delay(500).fadeIn(100);
				newImg = self.last.children("img,div." + flashCss);
				if (newImg.length) {
					newImg.remove();
				}

				if (m === "swf" || m === "flv") {
					self.last.hide();
					self.current.empty();
					self._wrapFlash(self.current, m, img.url);
					self.picture = self.current.children("div." + flashCss);
					self._setCurrentStates(index);
					//self.picture.fadeIn(100);
					self.loading.stop().hide();
					self._thumbsScroll(index);
				}
				else if (m === "img") {
					if (self.picture && self.picture.length) {
						self.last.append(self.picture.unbind("load"));
					}
					self.current.hide();
					self.last.show();
					self.picture = $("<img>").attr({
						src: img.url,
						alt: img.title
					}).appendTo(self.current)
					.data("itemIndex", index);

					if (self.picture[0].complete && $.browser.msie) {
						self._imageLoaded(self, size);
					}
					else {
						self.picture.bind("load", function () {
							self._imageLoaded(self, size);
						});
					}
				}
				else if (m === "iframe") {
					if (self.current.is(":hidden")) {
						iframeContent = self.current;
						lastContent = self.last;
					}
					else {
						iframeContent = self.last;
						lastContent = self.current;
					}

					self.picture = $('<iframe></iframe>')
					.addClass('wijmo-wijgallery-iframe')
					.attr({
						frameborder: '0',
						marginwidth: '0',
						marginheight: '0',
						scrolling: 'auto',
						allowtransparency: 'true',
						src: img.url
					}).hide()
					.appendTo(iframeContent)
					.data("itemIndex", index)
					.bind('load', function () {
						var pic = $(this), index = pic.data("itemIndex");
						self.loading.stop().hide();
						if (self.pointer) {
							self.pointer.fadeOut(100);
						}
						self._setCurrentStates(index);
						if (index !== undefined) {
							//self._loadCaption(image);
							pic.show();
							lastContent.fadeOut(function () {
								lastContent.empty();
							});
							iframeContent.fadeIn();
						}
					});
				}
			}
		},

		_imageLoaded: function (self, size) {
			var pic = self.picture.attr("role", "img"),
				index = pic.data("itemIndex"),
				w = pic[0].naturalWidth || pic.width(),
				h = pic[0].naturalHeight || pic.height(),
				image = self.images[index];
			self.loading.stop().hide();
			if (self.pointer) {
				self.pointer.fadeOut(100);
			}
			if (w > size.w || h > size.h) {
				if (w / h > size.w / size.h) {
					pic.css({ width: "100%" });
				}
				else {
					pic.css({ height: "100%" });
				}
			}
			else if (w < size.w && h < size.h) {
				pic.addClass("ui-state-default wijmo-wijgallery-small-image");
			}

			if (index !== undefined) {
				if (self.options.showCaption && self.caption) {
					self._loadCaption(image);
				}
				self._animate(index);
			}
		},

		_animate: function (index) {
			var self = this, o = self.options, animate = o.transitions,
			hori = o.thumbnailOrientation === "horizontal",
			width, height, wrapper, half, data, forward,
			effect = animate.animated, duration = animate.duration;

			//if (!self.last.find("img").attr("src") && 
			//!self.last.find("div."+flashCss)) {
			if (!self.last.children().length) {
				self._setCurrentStates(index);
				self.last.hide();
				self.current.show();
				return;
			}

			data = {
				index: self.currentIdx,
				to: index,
				toImg: self.images[index]
			};
			if (!self._trigger("beforeTransition", null, data)) {
				return;
			}

			if (effect) {
				if (effect === "slide") {
					width = self.size.w;
					height = self.size.h;
					self.current.show();
					forward = self.currentIdx > index ? true : false;

					wrapper = $.effects.createWrapper(self.last).css({
						overflow: 'hidden',
						width: hori ? width * 2 : width,
						height: hori ? height : height * 2,
						left: hori ? (forward ? -width : 0) : 0,
						top: hori ? 0 : (forward ? -height : 0)
					});

					wrapper[forward ? "prepend" : "append"](self.current);

					wrapper.animate({
						left: hori ? (forward ? 0 : -width) : 0,
						top: hori ? 0 : (forward ? 0 : -height)
					}, duration, function () {
						if (self.last.parent().is(".ui-effects-wrapper")) {
							self.last.unwrap();
						}
						self.last.hide();
						self._setCurrentStates(index);
					});
				}
				else if (effect === "explode" || effect === "scale" ||
				effect === "blind" || effect === "fold") {
					self.current.css({ position: "absolute" });
					self.current.stop(true, true).show(effect, duration, function () {
						self.last.hide();
						self._setCurrentStates(index);
					});
				}
				else if (effect === "size") {
					self.last.hide();
					self.current.stop(true, true).show(effect, duration, function () {
						self.last.hide();
						self._setCurrentStates(index);
					});
				}
				else {
					half = duration / 2;
					self.last.hide(effect, half, function () {
						self.last.hide();
						self.current.stop(true, true).show(effect, half, function () {
							self._setCurrentStates(index);
						});
					});
				}
			}
			else {
				self.last.hide();
				self.current.show();
				self._setCurrentStates(index);
			}

			self._thumbsScroll(index);
		},

		_thumbsScroll: function (index) {
			var scrollIdx, self = this, o = self.options;
			if (self.thumbs && self.thumbs[self.thumbWidgetName]) {
				if (o.scrollWithSelection) {
					scrollIdx = index - Math.ceil(o.thumbsDisplay / 2) + 1;
					self.thumbs[self.thumbWidgetName]("scrollTo", scrollIdx);
				}
				else {
					if (index > (o.thumbsDisplay + self.currentThumbIdx - 1)) {
						self.thumbs[self.thumbWidgetName]("scrollTo",
						index - o.thumbsDisplay + 1);
					}
					else if (index < self.currentThumbIdx) {
						self.thumbs[self.thumbWidgetName]("scrollTo", index);
					}
				}
			}
		},

		_setCurrentStates: function (index) {
			var self = this, o = self.options, shouldPlay, data, last;

			last = self.currentIdx;
			self.currentIdx = index;
			shouldPlay = (index + 1) < self.count;

			if (self.isPlaying && shouldPlay) {
				self.timeout = null;
				self.isPlaying = false;
				self.play();
			}
			else if (self.progressBar) {
				self.pause();
			}
			// add disable to play btn.
			if ((index + 1) >= self.count) {
				self.nextBtn.add(self.playPauseBtn)
				.removeClass(hoverCss).addClass(disableCss);
			}
			else {
				self.nextBtn.add(self.playPauseBtn)
				.removeClass(disableCss);
			}

			if (index <= 0) {
				self.previousBtn.removeClass(hoverCss).addClass(disableCss);
			}
			else {
				self.previousBtn.removeClass(disableCss);
			}

			if (o.showCaption) {
				self._showCaption(self.images[index]);
			}

			if (self.thumbs && self.thumbs[self.thumbWidgetName]) {
				self.activeLi = self.thumbs.find(carouselItem).eq(index);
				if (!self.isScrolling) {
					self._highlightThumb(self.activeLi);
				}
			}
			else if (self.pager) {
				if (self.pager.is(":wijmo-wijpager")) {
					self.pager.wijpager("option", "pageIndex", index);
				}
			}

			self._refreshCounter();
			self._clearCss();
			data = {
				last: last,
				index: self.currentIdx,
				toImg: self.images[self.currentIdx]
			};

			self._trigger("afterTransition", null, data);
		},

		_clearCss: function () {
			this.current.css({ position: "", visibility: "" });
		},

		_resetState: function () {
			var self = this;
			self._stopAnimation();
			if (self.isPlaying && self.progressBar) {
				self.progressBar.stop();
				self.progressBar.css({ width: "0%" });
			}
		},

		_stopAnimation: function () {
			var self = this, wrapper;
			wrapper = self.content.find(".ui-effects-wrapper");
			if (wrapper.length) {
				wrapper.stop(true, true);
			}
			self.current.stop(true, true);
			self.last.stop(true, true);
		},

		widget: function () {
			return this.element;
		},

		count: function () {
			return this.count;
		},

		_destroy: function () {
			var self = this;
			self.frame.unwrap().remove();
			if (self.options.thumbnails) {
				if ($[self.namespace][self.thumbWidgetName]) {
					self.thumbs[self.thumbWidgetName]("destroy");
					self.element.find("li").unbind()
					.removeClass("ui-state-active")
					.filter(".wijmo-wijgallery-selected")
					.removeClass("wijmo-wijgallery-selected");
					self.thumbs.children("ul").unwrap().unwrap();
				}
			}
			else {
				if (self.pager && self.pager.length) {
					self.pager.remove();
				}
				self.element.find("ul").css({ display: "" });
			}
			if (self.pointer) {
				self.pointer.remove();
			}
			self.element
			.removeClass("wijmo-wijgallery ui-widget " +
			"ui-widget-content ui-corner-all");

			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
		},

		destroy: function () {
			this._destroy();
			$.Widget.prototype.destroy.apply(this);
		},

		show: function (index) {
			/// <summary>
			/// Show the picture at specified index .
			/// </summary>
			var self = this;
			self._resetState();
			self._show(index);
		},

		next: function () {
			/// <summary>
			/// Show the next picture.
			/// </summary>
			var self = this, idx;
			self._resetState();
			idx = self.currentIdx + 1;
			if (idx < self.count) {
				self._show(idx);
			}
		},

		previous: function () {
			/// <summary>
			/// Show the previous picture.
			/// </summary>
			var self = this, idx;
			self._resetState();
			idx = self.currentIdx - 1;
			if (idx >= 0) {
				self._show(idx);
			}
		},

		play: function () {
			/// <summary>
			/// Start displaying the images in order automatically.
			/// </summary>
			var self = this, o = self.options;
			if (self.isPlaying) {
				return;
			}

			if (o.interval === 0) {
				return self.pause();
			}

			if (o.showTimer && self.progressBar) {
				self.progressBar.css({
					width: "0%"
				});
				self.playPauseBtn.children("span:eq(0)")
                .removeClass(playBtnCss)
                .addClass(pauseBtnCss);
				self.progressBar.animate({ width: "100%" },
				o.interval,
				function () {
					self._show(self.currentIdx + 1);
				});
			}
			else {
				if (self.timeout) {
					return;
				}
				self.timeout = window.setTimeout(function () {
					self.next();
				},
                o.interval);
			}
			self.isPlaying = true;
		},

		pause: function () {
			/// <summary>
			/// Stop displaying the images in order automatically.
			/// </summary>
			var self = this, o = self.options;
			if (o.showTimer && self.progressBar) {
				self.progressBar.stop();
				self.progressBar.css({
					width: "0%"
				});
				self.playPauseBtn.children("span:eq(0)")
                .removeClass(pauseBtnCss)
                .addClass(playBtnCss);
			}
			else {
				if (self.timeout === null) {
					return;
				}
				window.clearTimeout(self.timeout);
				self.timeout = null;
			}
			self.isPlaying = false;
		},

		add: function (ui, index) {
			/// <summary>
			/// Adds a custom item with specified index.
			/// The first parameter is the new item to add,
			/// it should be a jQuery Element or HTML string. 
			/// The second parameter is the index of item to add , 
			/// If  no index specified the item will be added at the last of item collection.
			/// </summary>
			var self = this, item, idx, data;
			if (typeof ui === "string") {
				item = $(ui);
				data = self._initLi(item);
			}
			else if (ui.jquery) {
				item = ui;
				data = self._initLi(item);
			}
			else if ($.isPlainObject(ui)) {
				data = ui;
			}
			else {
				return;
			}
			//image
			if (!index || index > self.count) {
				idx = self.count;
			}
			else if (index < 0) {
				idx = 0;
			}
			else {
				idx = index;
			}

			self.images.splice(idx, 0, data);
			self.count++;
			if (self.thumbs && self.thumbs[self.thumbWidgetName]) {
				self.thumbs[self.thumbWidgetName]("add", item, index);
			}
		},

		remove: function (index) {
			/// <summary>
			/// Removes the item at specified index. 
			/// The parameter is the index of item to add , 
			/// If  no index specified the last item will be removed.
			/// </summary>
			var self = this, idx;
			if (!index || index > self.count) {
				idx = self.count;
			}
			else if (index < 0) {
				idx = 0;
			}
			else {
				idx = index;
			}

			self.images.splice(idx, 1);
			self.count--;
			if (self.thumbs && self.thumbs[self.thumbWidgetName]) {
				self.thumbs[self.thumbWidgetName]("remove", index);
			}
		},

		_getExt: function (url) {
			var ext, m,
				regExt = /[0-9a-z]+$/i,
				q = url.indexOf("?");

			if (q > -1) {
				url = url.substring(0, q);
			}

			m = url.match(regExt);
			if (m) {
				ext = m[0].toLowerCase();
			}

			return ext;
		},

		_getPlayerName: function (url) {
			if (url.indexOf("#") === 0 || (url.indexOf("#") > 0 &&
			url.indexOf(document.location.href) === 0)) {
				return "inline";
			}

			var imgExt = ["bmp", "gif", "jpg", "jpeg", "png"],
				swfExt = ["swf"],
				flvExt = ["flv", "m4v"],
				qtExt = ["dv", "mov", "moov", "movie", "mp4", "avi", "mpg", "mpeg"],
				wmpExt = ["asf", "avi", "mpg", "mpeg", "wm", "wmv"],
				ext = this._getExt(url);
			if (ext) {
				if ($.inArray(ext, imgExt) >= 0) {
					return "img";
				}
				if ($.inArray(ext, swfExt) >= 0) {
					return "swf";
				}
				if ($.inArray(ext, flvExt) >= 0) {
					return "flv";
				}
				if ($.inArray(ext, wmpExt) >= 0) {
					return "wmp";
				}
				if ($.inArray(ext, qtExt) >= 0) {
					return "qt";
				}
			}
			return "unknown";
		},

		_wrapFlash: function (container, type, url) {
			var self = this, lo = self.options,
			swf = url, wrapper,
			width = '100%',
			height = '100%',
			express = lo.flashInstall,
			version = lo.flashVersion,
			flashvars = lo.flashVars,
			params = lo.flashParams,
			id = self._newId();

			if (type === "flv") {
				swf = lo.flvPlayer;
				flashvars = $.extend({
					file: url,
					width: width,
					height: height,
					autostart: (lo.autoPlayMovies ? 'true' : 'false'),
					controlbar: (lo.showMovieControls ? 'bottom' : "none"),
					backcolor: "0x000000",
					frontcolor: "0xCCCCCC",
					lightcolor: "0x557722"
				}, lo.flashVars);
				params = $.extend({
					autostart: (lo.autoPlayMovies ? 'true' : 'false'),
					allowscriptaccess: 'always'
				}, lo.flashParams);
			}

			wrapper = $('<div/>').addClass(flashCss).appendTo(container);
			$('<div/>').css({
				width: '100%',
				height: '100%',
				overflow: 'hidden'
			}).attr('id', id).appendTo(wrapper);

			S.flash.embedSWF(swf, id, width, height, version, express, flashvars, params);
		},
		//fixed bug for addRule because the id is strict for addRule IE .
		//		_newId: function () {
		//			var S4 = function () {
		//				return (((1 + Math.random()) * 0x10000) | 0)
		//				.toString(16).substring(1);
		//			};
		//			return (S4() + S4() + "-" + S4() + "-" + S4() +
		//			"-" + S4() + "-" + S4() + S4() + S4());
		//		}

		_newId: function () {
			var chars = "a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z",
			charArray = [], id = "", i;
			charArray = chars.split("|");
			for (i = 0; i < 16; i++) {
				id += charArray[Math.round(Math.random() * 25)];
			}
			return id;
		}
	});
} (jQuery));