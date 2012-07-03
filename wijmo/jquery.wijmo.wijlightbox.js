/*
 *
 * Wijmo Library 2.1.4
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Lightbox widget.
 *
 * Depends:
 *	jquery-1.4.2.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 *	jquery.effects.core.js	
 *	jquery.cookie.js
 *	jquery.wijmo.wijutil.js
 */


(function ($) {
    "use strict";
    $.widget("wijmo.wijlightbox", {
        options: {
            ///	<summary>
            ///	Determines the position of text description.
            /// Default: 'overlay'
            /// Type: String
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      textPosition: 'titleOverlay'
            ///  });
            ///	</summary>
            textPosition: 'overlay',  // Possible values are 'inside', 'outside', 'overlay', 'titleOverlay' and 'none'
            ///	<summary>
            ///	Determines the maximum width of the content.
            /// Default: 600
            /// Type: Number
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      width: 800
            ///  });
            ///	</summary>
            width: 600,
            ///	<summary>
            ///	Determines the maximum height of the content.
            /// Default: 400
            /// Type: Number
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      height: 500
            ///  });
            ///	</summary>
            height: 400,
            ///	<summary>
            ///	A value determines whether to auto-size to keep the original width/height ratio of content.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      autoSize: false
            ///  });
            ///	</summary>
            autoSize: true,
            ///	<summary>
            ///	Determines the name of player to host the content.
            /// Default: ''
            /// Type: String
            /// Possible values are: 'inline', 'iframe', 'img', 'swf', 'flv', 'wmp', 'qt', 'wijvideo'
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      player: 'img'
            ///  });
            ///	</summary>
            player: '',
            ///	<summary>
            ///	The array of data items.
            /// Default: []
            /// Type: Array
            ///	</summary>
            groupItems: [],
            ///	<summary>
            ///	Determines the root url for each item.
            /// Default: ''
            /// Type: String
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      rootUrl: ''
            ///  });
            ///	</summary>
            rootUrl: '',
            ///	<summary>
            ///	Determines the visibility of the control buttons.
            /// Default: 
            /// Type: 
            /// Possible values are: 'play', 'stop' separated by '|'.
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      ctrlButtons: 'play|stop'
            ///  });
            ///	</summary>
            ctrlButtons: '',
            ///	<summary>
            ///	Determines the visibility of the dialog buttons.
            /// Default: ''
            /// Type: String
            /// Possible values are: 'close', 'fullSize' separated by '|'.
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      dialogButtons: 'close|fullSize'
            ///  });
            ///	</summary>
            dialogButtons: 'close',
            ///	<summary>
            ///	Determines the type counter style.
            /// Default: 'default'
            /// Type: String
            /// Possible values are: 'default', 'sequence'
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      counterType: 'sequence'
            ///  });
            ///	</summary>
            counterType: 'default',
            ///	<summary>
            ///	Determines the text format of counter.
            /// Default: '[i] of [n]'
            /// Type: String
            /// '[i]' and '[n]' are built-in parameters represents the current page index and the number of pages.
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      counterFormat: '[i]/[n]'
            ///  });
            ///	</summary>
            counterFormat: '[i] of [n]',
            ///	<summary>
            ///	Determines the maximum number of digit buttons in sequence counter type.
            /// Default: 10
            /// Type: Number
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      counterLimit: 5
            ///  });
            ///	</summary>
            counterLimit: 10,
            ///	<summary>
            ///	Determines whether to display the counter.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      showCounter: false
            ///  });
            ///	</summary>
            showCounter: true,
            ///	<summary>
            ///	Determines whether to display the navigation buttons.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      showNavButtons: false
            ///  });
            ///	</summary>
            showNavButtons: true,
            ///	<summary>
            ///	Determines whether to display the time bar.
            /// Default: false
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      showTimer: true
            ///  });
            ///	</summary>
            showTimer: false,
            ///	<summary>
            ///	Determines the position of control buttons.
            /// Default: 'inside'
            /// Type: String
            /// Possible values are: 'inside', 'outside'
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      controlsPosition: 'outside'
            ///  });
            ///	</summary>
            controlsPosition: 'inside',
            ///	<summary>
            ///	Determines whether to display the control buttons only when hovering the mouse to the content.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      showControlsOnHover: false
            ///  });
            ///	</summary>
            showControlsOnHover: true,
            ///	<summary>
            ///	Determines whether to pause the auto-play when clicking the content.
            /// Default: false
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      clickPause: true
            ///  });
            ///	</summary>
            clickPause: false,
            ///	<summary>
            ///	Determines whether to allow keyboard navigation.
            /// Default: false
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      keyNav: true
            ///  });
            ///	</summary>
            keyNav: false,
            ///	<summary>
            ///	Determines whether the popped up content is displayed in modal style container.
            /// Default: false
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      modal: true
            ///  });
            ///	</summary>
            modal: false,
            ///	<summary>
            ///	Determines the popup position of content window.
            /// Please see jquery.ui.position for possible options.
            ///	</summary>
            position: {
                my: 'center',
                at: 'center',
                of: window,
                collision: 'fit',
                // ensure that the titlebar is never outside the document
                using: function (pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    if (topOffset < 0) {
                        $(this).css('top', pos.top - topOffset);
                    }
                }
            },
            ///	<summary>
            ///	Determines the z-index of popup container.
            /// Default: 1000
            /// Type: Number
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      zIndex: 1000
            ///  });
            ///	</summary>
            zIndex: 1000,
            ///	<summary>
            ///	Determines whether to close the popup window when user presses the ESC key.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      closeOnEscape: false
            ///  });
            ///	</summary>
            closeOnEscape: true,
            ///	<summary>
            ///	Determines whether to close the popup window when user clicks on the out side of content.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      closeOnOuterClick: false
            ///  });
            ///	</summary>
            closeOnOuterClick: true,
            ///	<summary>
            ///	Determines whether pages are automatically displayed in order.
            /// Default: false
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      autoPlay: false
            ///  });
            ///	</summary>
            autoPlay: false,
            ///	<summary>
            ///	Determines the time span in milliseconds between panels in autoplay mode. 
            /// Default: 2000
            /// Type: Number
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      delay: 5000
            ///  });
            ///	</summary>
            delay: 2000,
            ///	<summary>
            ///	Determines whether start from the first page when reaching the end in autoplay mode.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      loop: false
            ///  });
            ///	</summary>
            loop: true,
            ///	<summary>
            ///		Store the latest active index in a cookie. 
            ///		The cookie is then used to determine the initially active index if the activeIndex option is not defined. 
            ///		Requires cookie plugin. The object needs to have key/value pairs of the form the cookie plugin expects as options. 
            ///	</summary>
            cookie: null, // e.g. { expires: 7, path: '/', domain: 'jquery.com', secure: true }
            ///	<summary>
            ///	Determines the animation style when switching between pages.
            /// Default: {
            /// 	animated: 'fade', // Possible values are 'slide', 'fade', 'none'
            /// 	duration: 400,
            /// 	easing: 'easeInQuad'
            /// }
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      transAnimation: {
            ///         animated: slide
            ///     }
            ///  });
            ///	</summary>
            transAnimation: {
                animated: 'fade',
                duration: 400,
                easing: 'easeInQuad'
            },
            ///	<summary>
            ///	Determines the slide direction.
            /// Default: 'horizontal'
            /// Type: String
            /// Possible values are: 'horizontal', 'vertical'
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      slideDirection: 'vertical'
            ///  });
            ///	</summary>
            slideDirection: 'horizontal',
            ///	<summary>
            ///	Determines the animation style when resizing. 
            /// Default: {
            /// 	animated: 'sync', // Possible values are 'wh', 'hw', 'sync', 'none'
            ///	    duration: 400
            /// }
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      resizeAnimation: { animated: 'wh'}
            ///  });
            ///	</summary>
            resizeAnimation: {
                animated: 'sync',
                duration: 400
            },
            ///	<summary>
            ///	Determines the animation style when showing out the text.
            /// Default: {
            ///	    duration: 300,
            ///	    easing: 'easeInQuad'
            /// }
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      textShowOption: { 
            ///         duration: 500,
            ///         easing: 'linear'
            ///     }
            ///  });
            ///	</summary>
            textShowOption: {
                duration: 300,
                easing: 'easeInQuad'
            },
            ///	<summary>
            ///	Determines the animation style when hidding the text.
            /// Default: {
            ///	    duration: 300,
            ///	    easing: 'easeInQuad'
            /// }
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      textHideOption: { 
            ///         duration: 500,
            ///         easing: 'linear'
            ///     }
            ///  });
            ///	</summary>
            textHideOption: {
                duration: 300,
                easing: 'easeInQuad'
            },
            ///	<summary>
            ///	Determines whether to turn on the movie controls in movie player.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      showMovieControls: false
            ///  });
            ///	</summary>
            showMovieControls: true,
            ///	<summary>
            ///	Determines whether to turn on the autoplay option in movie player.
            /// Default: true
            /// Type: Boolean
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      autoPlayMovies: false
            ///  });
            ///	</summary>
            autoPlayMovies: true,
            ///	<summary>
            ///	A hash object that contains parameters for flash object.
            /// Default: {
            ///     bgcolor: "#000000",
            ///     allowfullscreen: true
            /// }
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      flashParams: {
            ///         autostart: true,
            ///		    allowscriptaccess: 'always'
            ///     }
            ///  });
            ///	</summary>
            flashParams: {
                bgcolor: "#000000",
                allowfullscreen: true
            },
            ///	<summary>
            ///	A hash object that contains variants for flash object.
            /// Default: {}
            /// Type: Object
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      flashVars: {
            ///         backcolor: "0x000000",
            ///         frontcolor: "0xCCCCCC"
            ///     }
            ///  });
            ///	</summary>
            flashVars: {},
            ///	<summary>
            ///	Version of flash object.
            /// Default: "9.0.115"
            /// Type: String
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      flashVersion: "9.0.115"
            ///  });
            ///	</summary>
            flashVersion: "9.0.115",
            ///	<summary>
            ///	The relative path and name of the flash vedio player.
            /// Default: 'player\\player.swf'
            /// Type: String
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      flvPlayer: "player\\myplayer.swf"
            ///  });
            ///	</summary>
            flvPlayer: 'player\\player.swf',
            ///	<summary>
            ///	The relative path and name of the flash installation guide.
            /// Default: 'player\\expressInstall.swf'
            /// Type: String
            /// Code example:
            ///  $("#id").wijlightbox({
            ///      flashInstall: "player\\installFlash.swf"
            ///  });
            ///	</summary>
            ///	</summary>
            flashInstall: 'player\\expressInstall.swf',
            /// <summary>
            /// The beforeShow event handler. A function called before a page's content is shown.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#id").wijlightbox({ beforeShow: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            beforeShow: null,
            /// <summary>
            /// The show event handler. A function called after a page's content is shown.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#id").wijlightbox({ show: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            show: null,
            /// <summary>
            /// The open event handler. A function called after the popped up container is opened.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#id").wijlightbox({ open: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            open: null,
            /// <summary>
            /// The showbeforeClose event handler. A function called before the popped up container is closed.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#id").wijlightbox({ showbeforeClose: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            beforeClose: null,
            /// <summary>
            /// The close event handler. A function called after the popped up container is closed.
            /// Default: null.
            /// Type: Function.
            /// Code example: $("#id").wijlightbox({ close: function (e) { } });
            /// </summary>
            ///
            /// <param name="e" type="Object">jQuery.Event object.</param>
            close: null
        },

        _keyDownHandler: function (event) {
            var o = this.options, self = this;
            if (event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) {
                if (self._isFullSize()) {
                    self._toggleFullSize();
                } else {
                    if (o.closeOnEscape) {
                        self._close();
                    }
                }

                event.preventDefault();
                return;
            }

            if (o.keyNav) {
                if (event.keyCode) {
                    switch (event.keyCode) {
                        case $.ui.keyCode.LEFT:
                        case $.ui.keyCode.DOWN:
                            self.back();
                            event.preventDefault();
                            break;

                        case $.ui.keyCode.RIGHT:
                        case $.ui.keyCode.UP:
                            self.next();
                            event.preventDefault();
                            break;

                        case $.ui.keyCode.HOME:
                            if (o.groupItems.length > 0) {
                                self.show(0);
                            }
                            event.preventDefault();
                            break;

                        case $.ui.keyCode.END:
                            if (o.groupItems.length > 0) {
                                self.show(o.groupItems.length - 1);
                            }
                            event.preventDefault();
                            break;
                    }
                }
            }
        },

        _create: function () {
            var o = this.options, self = this;

            this._defaults = {
                transAnimation: {
                    animated: 'fade',
                    duration: 400,
                    easing: 'easeInQuad'
                },
                resizeAnimation: {
                    animated: 'sync',
                    duration: 400
                },
                textShowOption: {
                    duration: 300,
                    easing: 'easeInQuad'
                },
                textHideOption: {
                    duration: 300,
                    easing: 'easeInQuad'
                }
            };

            this._parse();

            this.container = $('<div/>').addClass('wijmo-wijlightbox ui-widget' + ' wijmo-wijlightbox-controls-' + o.controlsPosition)
				.css('z-index', o.zIndex)
				.attr({
				    'tabIndex': -1,
				    'role': 'dialog'
				}).bind('keydown.wijlightbox', $.proxy(self, '_keyDownHandler'))
				.appendTo(document.body)
				.hide();

            this.frame = $('<div></div>').addClass('wijmo-wijlightbox-frame ui-widget-content ui-corner-all ui-helper-clearfix')
				.appendTo(this.container);

            this.content = $('<div></div>').addClass('wijmo-wijlightbox-content')
				.appendTo(this.frame);

            // Active a panel
            // use "activeIndex" option or try to retrieve:
            // 1. from cookie
            // 2. from actived class attribute on panel
            if (o.activeIndex === undefined) {
                if (typeof o.activeIndex !== 'number' && o.cookie) {
                    o.activeIndex = parseInt(self._cookie(), 10);
                }
                o.activeIndex = o.activeIndex || (o.groupItems.length ? 0 : -1);
            } else if (o.activeIndex === null) { // usage of null is deprecated, TODO remove in next release
                o.activeIndex = -1;
            }

            // sanity check - default to first page...
            o.activeIndex = ((o.activeIndex >= 0 && o.groupItems[o.activeIndex]) || o.activeIndex < 0) ? o.activeIndex : 0;

			this._initClickBehavior();
            this._createTimerBar();
            this._createDialogButtons();
            this._createCtrlButtons();
            this._createText();
            this._createCounter();
            this._refreshCounter();

            if (this.toolBox) {
                this.toolBox.find('.wijmo-wijlightbox-toolbox-button').bind({
                    'mouseover': function () { self._addState('hover', $(this)); },
                    'mouseout': function () { self._removeState('hover', $(this)); },
                    'mousedown': function () { self._addState('active', $(this)); },
                    'mouseup': function () { self._removeState('active', $(this)); }
                });
            }

            if (this._groupMode()) {
                this._createNavButtons();
            }
			
			this._initHoverBehavior();
            this.container.width(this.frame.outerWidth());
        },

        destroy: function () {
            /// <summary>
            /// Destroys wijlightbox widget and reset the DOM element.
            /// </summary>

            var o = this.options, self = this;

            this._hideWaiting();
            this._hideOverlay();

            if (o.cookie) {
                this._cookie(null, o.cookie);
            }

            this.container.remove();
            $.Widget.prototype.destroy.apply(self, arguments);
            return self;
        },

        _setOption: function (key, value) {
            $.Widget.prototype._setOption.apply(this, arguments);

            switch (key) {
                case 'groupItems':
                    if (this.options.activeIndex >= value.length) {
                        this.show(value.length - 1);
                    } else {
                        if (this.options.activeIndex < 0 && value.length) {
                            this.show(0);
                        } else {
                            this.show(this.options.activeIndex);
                        }
                    }
                    break;

                case 'activeIndex':
                    this.show(value);
                    break;

                case 'textPosition':
                    this._resetText();
                    break;
					
				case 'clickPause':
					this._initClickBehavior();
					break;
					
				case 'showNavButtons':
					this._createNavButtons();
					break;
					
				case 'showControlsOnHover':
					this._initHoverBehavior();
					break;
            }
        },
		
		_initClickBehavior: function(){
			var o = this.options, self = this;

			this.content.unbind('click');
			if (o.clickPause) {
                if (this._groupMode()) {
                    this.content.click(function () {
                        self[!self.isPlaying() ? 'play' : 'stop']();
                    });
                }
            } else {
                if (this._groupMode()) {
                    this.content.click(function (e) {
						if (self.isPlaying()) { return false; };
                        var rect = $.extend({}, $(this).offset(), { width: $(this).outerWidth(true), height: $(this).outerHeight(true) });
                        if (e.pageX >= rect.left && e.pageX < (rect.left + rect.width / 2)) {
                            self.back();
                        } else {
                            self.next();
                        }
                    });
                }
            }
		},
		
		_initHoverBehavior: function() {
			var o = this.options, self = this;
			this.frame.unbind('.wijlightbox');
		
			if (o.showControlsOnHover) {
				this.frame.bind({
					'mouseenter.wijlightbox': function () {
						if (self.container.data('moving.wijlightbox')) {
							return false;
						}
						self._showAccessories(true);
					},
					'mouseleave.wijlightbox': function () {
						if (self.container.data('moving.wijlightbox')) {
							return false;
						}

						self._hideAccessories(true);
					},
					'mousemove.wijlightbox': function () {
						if (self.container.data('moving.wijlightbox') === false && self.container.data('accessvisible.wijlightbox') === false) {
							self.frame.trigger('mouseenter');
						}
					}
				});
			}
		},

        _getPlugins: function () {
            var plugins = this.container.data('plugins.wijlightbox');
            if (!plugins) {
                plugins = {};
                if (window.navigator.plugins && window.navigator.plugins.length) {
                    var names = [];
                    $.each(window.navigator.plugins, function (i, p) {
                        names.push(p.name);
                    });
                    names = names.join(",");
                    var f4m = names.indexOf("Flip4Mac") > -1;
                    plugins = {
                        fla: names.indexOf("Shockwave Flash") > -1,
                        qt: names.indexOf("QuickTime") > -1,
                        wmp: !f4m && names.indexOf("Windows Media") > -1,
                        f4m: f4m
                    };
                } else {
                    var detectPlugin = function (name) {
                        var axo;
                        try {
                            axo = new ActiveXObject(name);
                        } catch (e) { }
                        return !!axo;
                    };
                    plugins = {
                        fla: detectPlugin("ShockwaveFlash.ShockwaveFlash"),
                        qt: detectPlugin("QuickTime.QuickTime"),
                        wmp: detectPlugin("wmplayer.ocx"),
                        f4m: false
                    };
                }

                this.container.data('plugins.wijlightbox', plugins);
            }

            return plugins;
        },

        _sanitizeSelector: function (hash) {
            return hash.replace(/:/g, '\\:'); // we need this because an id may contain a ":"
        },

        _getFragmentId: function (a) {
            var fragmentId = /^#.+/; // Safari 2 reports '#' for an empty hash

            var href = $(a).attr('href') || "";
            var hrefBase = href.split('#')[0], baseEl = $('base')[0];
            if (hrefBase && (hrefBase === window.location.toString().split('#')[0] ||
				(baseEl && hrefBase === baseEl.href))) {
                href = a.hash;
                a.href = href;
            }

            // inline links
            return fragmentId.test(href) ? this._sanitizeSelector(href) : "";
        },

        _parseLink: function (a) {
            var self = this, o = this.options, $a = $(a);
            if ($a.length > 0 && $a[0].tagName.toLowerCase() === 'a') {
                var rel = $a.attr('rel'),
					opt = {},
					props = ['href', 'player', 'title', 'alt', 'height', 'width', 'gallery', 'wijvideosrc'];

                $.each(props, function (i, o) {
                    opt[o] = $a.attr(o) || '';
                });

                if (!opt.href) { return; }
                if (!opt.player) {
                    opt.player = o.player || self._getPlayerName(opt.href);
                }

                var $img = $a.find('img');
                if ($img && $img.length === 0) {
                    $img = $a;
                }

                if ($img && $img.length >= 1) {
                    $.each(['title', 'alt'], function (i, o) {
                        opt[o] = $img.attr(o) || opt[o];
                    });

                    opt.img = $img;
                }

                if (rel) {
                    var gallery = rel.match(/\[(.*?)\]/);
                    if (gallery) {
                        opt.gallery = gallery[1] || opt.gallery;
                    }

                    $.each(rel.split(";"), function (i, p) {
                        var match = p.match(/\s*([a-z_]*?)\s*=\s*(.+)\s*/);
                        if (match) {
                            opt[match[1]] = match[2];
                        }
                    });
                }

                if (opt.player === 'inline') {
                    opt.href = self._getFragmentId(a);
                }

                if (!opt.gallery) {
                    $a.bind({
                        'click': function (e) {
							e.stopPropagation();
							e.preventDefault();
							if (!o.disabled) {
								self._open($img, opt);
							}
                            return false;
                        }
                    });
                } else {
                    var index = o.groupItems.length;
                    o.groupItems[index] = opt;
                    $a.bind({
                        'click': function (e) {
							e.stopPropagation();
							e.preventDefault();
							if (!o.disabled) {
								self._open($img, index);
							}
                            return false;
                        }
                    });
                }
            }
        },

        _parse: function () {
            var self = this, o = this.options;

            this._parseLink(this.element);
            this.element.find('a[rel^="wijlightbox"], a[rel^="lightbox"]').each(function (index, element) {
                self._parseLink(this);
            });
        },

        _showAccessories: function (fade) {
            this.container.data('accessvisible.wijlightbox', true);
            this._showNavButtons(fade);
            this._showToolboxButtons(fade);
            this._showCounter(fade);
        },

        _hideAccessories: function (fade) {
            this.container.data('accessvisible.wijlightbox', false);
            this._hideNavButtons(fade);
            this._hideToolboxButtons(fade);
            this._hideCounter(fade);
        },

        _groupMode: function () {
            var self = this, o = this.options;
            return (o.groupItems && o.groupItems.length > 1);
        },

        _resetText: function () {
            this._removeText();
            this._createText();
        },

        _createText: function (updateOnly) {
            var self = this, o = this.options;
            if (o.textPosition === 'none') { return; }

            if (this.container.find('.wijmo-wijlightbox-text').length) { return; }

            var cs = o.textPosition.toLowerCase();
            var $text = $('<div></div>').addClass('wijmo-wijlightbox-text wijmo-wijlightbox-text-' + cs + ' ui-widget-content ui-helper-clearfix'),
				$title = $('<h3></h3>').addClass('wijmo-wijlightbox-title wijmo-wijlightbox-title-' + cs + ' ui-helper-clearfix').appendTo($text),
				$detail = $('<p></p>').addClass('wijmo-wijlightbox-detail wijmo-wijlightbox-detail-' + cs + ' ui-helper-clearfix').appendTo($text);

            if (o.textPosition === 'inside') {
                $text.addClass('ui-widget-content ui-helper-clearfix').width(this.frame.width())
					.appendTo(this.frame);
            } else if (o.textPosition === 'outside') {
                $text.addClass('ui-widget-content ui-corner-all ui-helper-clearfix')
					.width(this.frame.width())
					.appendTo(this.container);
            } else if (o.textPosition === 'overlay' || o.textPosition === 'titleOverlay') {
                var $mask = $('<div></div>').addClass('wijmo-wijlightbox-mask wijmo-wijlightbox-mask-' + cs + ' ui-helper-clearfix')
					.width(this.frame.width())
					.appendTo(this.frame);

                $text.width(this.frame.width())
					.appendTo(this.frame);

                if (o.textPosition === 'titleOverlay') {
                    $text.bind({
                        'mouseenter': function () {
                            $mask.stop();
                            $text.stop();

                            var totalHeight = $title.outerHeight(true) + $detail.outerHeight(true),
								animOption = $.extend({}, self._defaults.textShowOption, o.textShowOption, { queue: false });
                            $mask.animate({
                                height: totalHeight
                            }, animOption);

                            $text.animate({
                                height: totalHeight
                            }, animOption);
                        },
                        'mouseleave': function () {
                            $mask.stop();
                            $text.stop();

                            var titleHeight = $title.height(),
								animOption = $.extend({}, self._defaults.textHideOption, o.textHideOption, { queue: false });
                            $mask.animate({
                                height: titleHeight
                            }, animOption);

                            $text.animate({
                                height: titleHeight
                            }, animOption);
                        }
                    });
                }
            }

            this._refreshText(updateOnly);
        },

        _removeText: function () {
            var $text = this.container.find('.wijmo-wijlightbox-text'),
				$mask = this.container.find('.wijmo-wijlightbox-mask');

            if ($text) {
                $text.remove();
            }

            if ($mask) {
                $mask.remove();
            }
        },

        _getActiveItem: function () {
            var self = this, o = this.options;

            if (o.groupItems && o.groupItems.length && o.activeIndex >= 0 && o.activeIndex < o.groupItems.length) {
                return o.groupItems[o.activeIndex];
            }

            return null;
        },

        _refreshText: function (updateOnly) {
            var self = this, o = this.options;
            if (o.textPosition === 'none') { return; }
            var item = this.container.data('item.wijlightbox') || this._getActiveItem();
            if (!item) { return; }

            var $text = this.container.find('.wijmo-wijlightbox-text'),
				$title = this.container.find('.wijmo-wijlightbox-title'),
				$detail = this.container.find('.wijmo-wijlightbox-detail'),
				$mask = this.container.find('.wijmo-wijlightbox-mask');

            $mask.stop();
            $text.stop();

            $title.html(item.title);
            $detail.html(item.alt);

            if (o.textPosition === 'outside') {
                $text.width(this.frame.width())
            }

            var titleHeight = $title.outerHeight(true),
				detailHeight = $detail.outerHeight(true),
				toHeight = o.textPosition === 'titleOverlay' ? titleHeight : $text.height();

            var animOption = $.extend({}, self._defaults.textShowOption, o.textShowOption, { queue: false });
            if (o.textPosition === 'overlay' || o.textPosition === 'titleOverlay') {
                var toHeitht = titleHeight + (o.textPosition === 'overlay' ? detailHeight : 0);
                $text.height(0);
                $mask.height(0);
                $text.animate({
                    height: toHeitht
                }, animOption);

                $mask.animate({
                    height: toHeitht
                }, animOption);
            } else {
                if (!!updateOnly) {
                    $text.height(titleHeight + detailHeight);
                } else {
                    $text.height(0);
                    $text.animate({
                        height: titleHeight + detailHeight
                    }, animOption);
                }
            }
        },

        _addState: function (state, el) {
            if (el.is(':not(.ui-state-disabled)')) {
                el.addClass('ui-state-' + state);
            }
        },

        _removeState: function (state, el) {
            el.removeClass('ui-state-' + state);
        },

        _createNavButtons: function () {
            var self = this, o = this.options;
            if (!o.showNavButtons || !this._groupMode()) {
                this._removeNavButtons();
                return;
            }

            if (!this.backBtn) {
                this.backBtn = $("<a href='#'/>")
					.addClass('wijmo-wijlightbox-button wijmo-wijlightbox-button-prev ui-state-default' + (o.controlsPosition === 'inside' ? ' ui-corner-right' : ' ui-corner-left'))
					.append("<span class='ui-icon ui-icon-triangle-1-w'></span>")
					.hide()
					.appendTo(this.frame).bind({
					    'click': function () {
					        if (!$(this).hasClass('ui-state-disabled')) {
					            self.back();
					        }
					        return false;
					    },
					    'mouseover': function () { self._addState('hover', $(this)); },
					    'mouseout': function () { self._removeState('hover', $(this)); },
					    'mousedown': function () { self._addState('active', $(this)); },
					    'mouseup': function () { self._removeState('active', $(this)); }
					});
            }

            if (!this.nextBtn) {
                this.nextBtn = $("<a href='#'/>")
					.addClass('wijmo-wijlightbox-button wijmo-wijlightbox-button-next ui-state-default' + (o.controlsPosition === 'inside' ? ' ui-corner-left' : ' ui-corner-right'))
					.append("<span class='ui-icon ui-icon-triangle-1-e'></span>")
					.hide()
					.appendTo(this.frame).bind({
					    'click': function () {
					        if (!$(this).hasClass('ui-state-disabled')) {
					            self.next();
					        }
					        return false;
					    },
					    'mouseover': function () { self._addState('hover', $(this)); },
					    'mouseout': function () { self._removeState('hover', $(this)); },
					    'mousedown': function () { self._addState('active', $(this)); },
					    'mouseup': function () { self._removeState('active', $(this)); }
					});
            }
        },

        _removeNavButtons: function () {
            if (this.backBtn) {
                this.backBtn.remove();
                this.backBtn = undefined;
            }

            if (this.nextBtn) {
                this.nextBtn.remove();
                this.nextBtn = undefined;
            }
        },

        _refreshNavButtons: function () {
            var o = this.options;

            if (this.backBtn) {
                this.backBtn[o.activeIndex === 0 ? 'addClass' : 'removeClass']('ui-state-disabled');
            }

            if (this.nextBtn) {
                this.nextBtn[o.activeIndex >= o.groupItems.length - 1 ? 'addClass' : 'removeClass']('ui-state-disabled');
            }
        },

        _showNavButtons: function (anim) {
            if (this.isPlaying()) {
                return;
            }

            this.container.find('.wijmo-wijlightbox-button')
				.stop(true, true)
				.fadeIn(anim ? 600 : 0, function () {
				    $(this).css('opacity', '');
				});
        },

        _hideNavButtons: function (anim) {
            this.container.find('.wijmo-wijlightbox-button').stop(true, true).fadeOut(anim ? 600 : 0);
        },

        _createToolbox: function () {
            if (!this.toolBox) {
                this.toolBox = $("<div></div>")
					.addClass('wijmo-wijlightbox-toolbox')
					.appendTo(this.frame);
            }
        },

        _showToolboxButtons: function (anim) {
            this.container.find('.wijmo-wijlightbox-toolbox-button')
				.stop(true, true)
				.fadeIn(anim ? 600 : 0, function () {
				    $(this).css('opacity', '');
				});
        },

        _hideToolboxButtons: function (anim) {
            this.container.find('.wijmo-wijlightbox-toolbox-button').stop(true, true).fadeOut(anim ? 600 : 0);
        },

        _createCtrlButtons: function () {
            var self = this, o = this.options;
            if (!o.ctrlButtons || o.ctrlButtons.length === 0 || !this._groupMode()) {
                this._removeCtrlButtons();
                return;
            }

            this._createToolbox();

            var buttons = o.ctrlButtons.split('|');
            if (buttons.length === 1 && buttons[0] === o.ctrlButtons) {
                buttons = o.ctrlButtons.split(',');
            }
            $.each(buttons, function (index, name) {
                name = $.trim(name);
                if (name === 'play' && !this.playBtn) {
                    self.playBtn = $("<a href='#'/>")
						.addClass('wijmo-wijlightbox-toolbox-button wijmo-wijlightbox-toolbox-button-play ui-state-default ui-corner-all')
						.append("<span class='ui-icon ui-icon-play'></span>")
						.hide()
						.click(function () {
						    if (self.isPlaying()) {
						        self.stop();
						    } else {
						        if (o.activeIndex >= o.groupItems.length - 1) {
						            self.show(0);
						        }
						        self.play();
						    }
						    return false;
						});
                } else if (name === 'stop' && !this.stopBtn) {
                    self.stopBtn = $("<a href='#'/>")
						.addClass('wijmo-wijlightbox-toolbox-button wijmo-wijlightbox-toolbox-button-stop ui-state-default ui-state-disabled ui-corner-all')
						.append("<span class='ui-icon ui-icon-stop'></span>")
						.hide()
						.click(function () {
						    if (self.isPlaying()) {
						        self.stop();
						        self.show(0);
						    }
						    return false;
						});
                }
            });

            if (this.stopBtn) {
                this.stopBtn.appendTo(this.toolBox);
            }

            if (this.playBtn) {
                this.playBtn.appendTo(this.toolBox);
            }
        },

        _removeCtrlButtons: function () {
            if (this.playBtn) {
                this.playBtn.remove();
                this.playBtn = undefined;
            }

            if (this.stopBtn) {
                this.stopBtn.remove();
                this.stopBtn = undefined;
            }
        },

        _refreshCtrlButtons: function () {
            if (this.playBtn) {
                var icon = this.playBtn.find('.ui-icon');
                if (icon) {
                    icon.removeClass('ui-icon-play ui-icon-pause');
                    icon.addClass(this.isPlaying() ? 'ui-icon-pause' : 'ui-icon-play');
                }
            }

            if (this.stopBtn) {
                this.stopBtn[!this.isPlaying() ? 'addClass' : 'removeClass']('ui-state-disabled');
            }
        },

        _createDialogButtons: function () {
            var self = this, o = this.options;
            if (!o.dialogButtons || o.dialogButtons.length === 0) {
                this._removeDialogButtons();
                return;
            }

            this._createToolbox();

            var buttons = o.dialogButtons.split('|');
            if (buttons.length === 1 && buttons[0] === o.dialogButtons) {
                buttons = o.dialogButtons.split(',');
            }

            $.each(buttons, function (index, name) {
                name = $.trim(name);
                if (name === 'close' && !this.closeBtn) {
                    self.closeBtn = $("<a href='#'/>")
						.addClass('wijmo-wijlightbox-toolbox-button wijmo-wijlightbox-toolbox-button-close ui-state-default ui-corner-all')
						.append("<span class='ui-icon ui-icon-close'></span>")
						.hide()
						.click(function () {
						    self._close();
						    return false;
						});
                } else if (name === 'fullSize' && !this.fullBtn) {
                    self.fullBtn = $("<a href='#'/>")
						.addClass('wijmo-wijlightbox-toolbox-button wijmo-wijlightbox-toolbox-button-fullsize ui-state-default ui-corner-all')
						.append("<span class='ui-icon ui-icon-arrow-4-diag'></span>")
						.hide()
						.click(function () {
						    self._toggleFullSize();
						    return false;
						});
                }
            });

            if (this.closeBtn) {
                this.closeBtn.appendTo(this.toolBox);
            }

            if (this.fullBtn) {
                this.fullBtn.appendTo(this.toolBox);
            }

            if (!this.btnSep) {
                this.btnSep = $("<a href='#'/>")
					.addClass('wijmo-wijlightbox-toolbox-separator')
					.appendTo(this.toolBox);
            }
        },

        _removeDialogButtons: function () {
            if (this.closeBtn) {
                this.closeBtn.remove();
                this.closeBtn = undefined;
            }

            if (this.fullBtn) {
                this.fullBtn.remove();
                this.fullBtn = undefined;
            }
        },

        _refreshDialogButtons: function () {
            if (this.fullBtn) {
                var icon = this.fullBtn.find('.ui-icon');
                if (icon) {
                    icon.removeClass('ui-icon-arrow-4-diag ui-icon-newwin');
                    icon.addClass(this._isFullSize() ? 'ui-icon-newwin' : 'ui-icon-arrow-4-diag');
                }
            }
        },

        _createTimerBar: function () {
            var self = this, o = this.options;
            if (!o.showTimer || !this._groupMode()) {
                this._removeTimerBar();
                return;
            }

            this._createToolbox();

            if (!this.timerBar) {
                this.timerBar = $("<div></div>")
					.addClass('wijmo-wijlightbox-timerbar ui-widget-content ui-priority-secondary ui-corner-all')
					.appendTo(this.toolBox);

                this.timerMeter = $("<div></div>")
					.addClass('wijmo-wijlightbox-timermeter ui-progressbar-value ui-widget-content ui-corner-all')
					.appendTo(this.toolBox);
            }
        },

        _removeTimerBar: function () {
            if (this.timerMeter) {
                this.timerMeter.remove();
                this.timerMeter = undefined;
            }

            if (this.timerBar) {
                this.timerBar.remove();
                this.timerBar = undefined;
            }
        },

        _createCounter: function () {
            var self = this, o = this.options;
            if (!o.showCounter || !this._groupMode()) {
                this._removeCounter();
                return;
            }

            if (!this.counter) {
                this.counter = $("<div></div>")
					.addClass('wijmo-wijlightbox-counter ui-state-default' + (o.controlsPosition === 'inside' ? '  ui-corner-tl' : ' ui-corner-all'))
					.hide()
					.appendTo(this.frame);
            }
        },

        _removeCounter: function () {
            if (this.counter) {
                this.counter.remove();
                this.counter = undefined;
            }
        },

        _refreshCounter: function (index) {
            var self = this, o = this.options, counter = "";

            if (!this.counter || !this._groupMode()) { return; }
            this.counter.empty();

            if (o.showCounter && o.groupItems.length > 1 && this.counter) {
                if (index === undefined) { index = o.activeIndex; }

                var len = o.groupItems.length;
                if (o.counterType === "sequence") {
                    var start = 0,
						end = len,
						limit = parseInt(o.counterLimit, 10) || 0;

                    if (limit >= 2 && limit < len) {
                        var h = Math.floor(limit / 2);
                        start = Math.min(end - limit, Math.max(start, index - h));
                        end = Math.min(end, start + limit);
                    }

                    while (start !== end) {
                        $("<a></a>")
							.addClass('wijmo-wijlightbox-counter-item ui-corner-all ui-state-default' + (start === index ? ' wijmo-wijlightbox-counter-active ui-state-active' : ''))
							.text(++start)
							.appendTo(this.counter);
                    }

                    this.counter.find('a').click(function (event, data) {
                        if ($(this).hasClass('wijmo-wijlightbox-counter-active')) { return false; }

                        self.show(parseInt($(this).text(), 10) - 1);
						return false;
                    });
                } else {
                    var fmt = o.counterFormat || "[i] of [n]";
                    counter = fmt.replace('[i]', index + 1);
                    counter = counter.replace('[n]', len);

                    $("<span></span>")
						.text(counter)
						.appendTo(this.counter);
                }
            }
        },

        _showCounter: function (anim) {
            this.container.find('.wijmo-wijlightbox-counter')
				.stop(true, true)
				.fadeIn(anim ? 600 : 0, function () {
				    $(this).css('opacity', '');
				});
        },

        _hideCounter: function (anim) {
            this.container.find('.wijmo-wijlightbox-counter').stop(true, true).fadeOut(anim ? 600 : 0);
        },

        _cookie: function () {
            var cookie = this.cookie || (this.cookie = this.options.cookie.name);
            return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
        },

        _showOverlay: function () {
            if (this.container.data('overlay.wijlightbox')) { return; }
            this.container.data('overlay.wijlightbox', new $.wijmo.wijlightbox.overlay(this));
        },

        _hideOverlay: function () {
            var $overlay = this.container.data('overlay.wijlightbox');
            if (!$overlay) { return; }

            $overlay.close();
            this.container.removeData('overlay.wijlightbox');
        },

        _hasOverlay: function () {
            return this.container.hasData('overlay.wijlightbox');
        },

        _showWaiting: function () {
            if (this.container.data('waiting.wijlightbox')) { return; }
            this.container.data('waiting.wijlightbox', new $.wijmo.wijlightbox.overlay(this, true));
        },

        _hideWaiting: function () {
            var $overlay = this.container.data('waiting.wijlightbox');
            if (!$overlay) { return; }

            $overlay.close();
            this.container.removeData('waiting.wijlightbox');
        },

        _hasWaiting: function () {
            return this.container.hasData('waiting.wijlightbox');
        },

        _getUrl: function (item) {
            var o = this.options, url = (typeof item === 'string') ? item : item.href, rootUrl = o.rootUrl;
            if (rootUrl && rootUrl.length > 0) {
                if (rootUrl.indexOf('//') === -1) {
                    rootUrl = window.location.protocol + '//' + window.location.host + (rootUrl.startsWith('/') ? '' : '/') + rootUrl;
                }

                if (rootUrl.substr(rootUrl.length - 1, 1) !== '/') {
                    rootUrl += '/';
                }

                url = rootUrl + (url.substr(0, 1) === '/' ? url.substr(1) : url);
            }

            return url;
        },

        _preload: function () {
            var o = this.options, i;
            for (i = Math.max(0, o.activeIndex); i < Math.min(o.activeIndex + 5, o.groupItems.length); i++) {
                if (!o.groupItems[i].image) {
                    o.groupItems[i].image = new Image;
                    o.groupItems[i].image.src = this._getUrl(o.groupItems[i]);
                }
            }
        },

        _slideTo: function (prevPlayer, player, animation, next, complete) {
            var o = this.options, self = this;

            var curImage = prevPlayer.getElement(), wrapper, slideContainer;
            if (curImage.parent().is('.wijmo-wijlightbox-aniwrapper')) {
                wrapper = curImage.parent();
            } else {
                wrapper = $.effects.createWrapper(curImage).css({ overflow: 'hidden' });
                wrapper.removeClass('ui-effects-wrapper');
                wrapper.addClass('wijmo-wijlightbox-aniwrapper');
            }

            if (wrapper.parent().is('.wijmo-wijlightbox-aniwrapper')) {
                slideContainer = wrapper.parent();
            } else {
                slideContainer = $.effects.createWrapper(wrapper).css({ overflow: 'hidden' });
                slideContainer.removeClass('ui-effects-wrapper');
                slideContainer.addClass('wijmo-wijlightbox-aniwrapper');
            }

            var direction = o.slideDirection || 'horizontal';
            var w = curImage.outerWidth(),
				h = curImage.outerHeight();

            if (direction === 'horizontal') {
                curImage.width(w).css('float', next ? 'left' : 'right');
                wrapper.width(2 * w)
					.css({
					    left: (next ? 0 : -1 * w),
					    position: 'absolute'
					});
            } else {
                curImage.height(h);
                wrapper.width(w)
					.css({
					    top: (next ? 0 : -1 * h),
					    position: 'absolute'
					}).height(2 * h);
            }

            player.appendTo(wrapper);
            var $img = player.getElement();
            if (direction === 'horizontal') {
                $img.width(w).css('float', next ? 'left' : 'right');
            } else {
                $img.height(h);
            }

            this.container.data('animating.wijlightbox', true);
            wrapper.effect('slide',
				{
				    mode: 'hide',
				    direction: direction === 'horizontal' ? (next ? 'left' : 'right') : (next ? 'up' : 'down'),
				    easing: animation.easing,
				    distance: direction === 'horizontal' ? w : h,
				    duration: animation.duration
				},

				function () {
				    curImage = wrapper.children(':last');
				    while (curImage.parent().is('.wijmo-wijlightbox-aniwrapper')) {
				        curImage.parent().replaceWith(curImage);
				    }
				    curImage.css({ float: '', width: '', height: '' });

				    if (o.autoSize && !self._isFullSize()) {
				        self._resize(complete);
				    } else {
				        if ($.isFunction(complete)) {
				            complete.apply(self);
				        }
				        self._refreshText();
				    }
				});
        },

        _moveFrom: function (rect, animation, complete) {
            var self = this, o = this.options;

            if ($.isFunction(animation)) {
                complete = animation;
                animation = $.extend({}, self._defaults.resizeAnimation, o.resizeAnimation);
            } else {
                animation = $.extend({}, self._defaults.resizeAnimation, o.resizeAnimation, animation);
            }

            self._removeText();
            if (animation.animated === 'none' || animation.duration <= 0) {
                self._createText();
                if ($.isFunction(complete)) {
                    complete.apply(self);
                }

                this.container.data('moving.wijlightbox', false);
                return;
            }

            var toRect = $.extend({ width: self.frame.width(), height: self.frame.height() }, self.container.offset());
            self.frame.width(rect.width).height(rect.height);
            self.container.css({
                left: rect.left,
                top: rect.top,
                width: self.frame.outerWidth(),
                position: 'absolute',
                opacity: ''
            });

            self._moveTo(toRect, animation, function () {
                self.frame.width(toRect.width);
                self.container.width(self.frame.outerWidth());
                self._createText();
                self.container.data('moving.wijlightbox', false);
                if ($.isFunction(complete)) {
                    complete.apply(self);
                }
            });
        },

        _moveTo: function (rect, animation, complete) {
            var self = this, o = this.options;

            if ($.isFunction(animation)) {
                complete = animation;
                animation = $.extend({}, self._defaults.resizeAnimation, o.resizeAnimation);
            } else {
                animation = $.extend({}, self._defaults.resizeAnimation, o.resizeAnimation, animation);
            }

            var hd = animation.duration / 2,
				animated = animation.animated,
				movePos = self._isOpen(),
				pos1 = animated === 'wh' ? { left: rect.left} : { top: rect.top },
				pos2 = animated === 'wh' ? { top: rect.top} : { left: rect.left },
				size1 = animated === 'wh' ? { width: rect.width} : { height: rect.height },
				size2 = animated === 'wh' ? { height: rect.height} : { width: rect.width };

            if (animated === 'wh' || animated === 'hw') {
                if (movePos) {
                    self.container.animate(
						pos1,
						{
						    duration: hd,
						    easing: animation.easing,
						    queue: true
						}
					);
                }

                self.frame.animate(
					size1,
					{
					    duration: hd,
					    easing: animation.easing,
					    complete: function () {
					        if (movePos) {
					            self.container.animate(
									pos2,
									{
									    duration: hd,
									    easing: animation.easing,
									    queue: true
									}
								);
					        }

					        self.frame.animate(
								size2,
								{
								    duration: hd,
								    easing: animation.easing,
								    complete: function () {
								        self.container.data('moving.wijlightbox', false);
								        if ($.isFunction(complete)) {
								            complete.apply(self);
								        }
								    }
								}
							);
					    }
					}
				);

                return;
            }

            if (movePos) {
                self.container.animate(
					{
					    left: rect.left,
					    top: rect.top
					},
					{
					    duration: animation.duration,
					    easing: animation.easing,
					    queue: true
					}
				);
            }

            self.frame.animate(
				{
				    width: rect.width,
				    height: rect.height,
				    opacity: 1
				},
				{
				    duration: animation.duration,
				    easing: animation.easing,
				    complete: function () {
				        self.container.data('moving.wijlightbox', false);
				        if ($.isFunction(complete)) {
				            complete.apply(self);
				        }
				    }
				}
			);
        },

        show: function (index) {
            /// <summary>Shows the content in specified index.</summary>
            this._show(index);
            return this;
        },

        _resize: function (complete) {
            var self = this, o = this.options;
            var rect = $.extend({}, self.container.offset(), {
                width: self.frame.width(),
                height: self.frame.height()
            });

            self._size();
            if (self._isOpen()) {
                self._position();
            }

            self._moveFrom(rect, complete);
        },

        _onAfterShow: function () {
            var self = this, o = this.options;

            self._refreshNavButtons();
            self.container.data('animating.wijlightbox', false);

            if (!o.modal) {
                self._hideOverlay();
            }

            var data = {
                index: o.activeIndex,
                item: o.groupItems[o.activeIndex]
            };
            self._trigger('show', null, data);
            self._startTimer();
        },

        _show: function (item, next, complete) {
            var self = this, o = this.options;

            if (this.container.data('showing.wijlightbox')) {
                var sq = [
					function () {
					    self._show(item, next, complete);
					}
				];
                this.container.queue('showqueue', sq);
                return this;
            }

            var index = o.activeIndex;
            if (!$.isPlainObject(item)) {
                index = item;
                if (index < 0 || index >= o.groupItems.length) { return this; }
                item = o.groupItems[index];
            }

            if (item) {
                this.container.data('item.wijlightbox', item);
            }

            if (this._groupMode()) {
                this._preload();
            }

            if ($.isFunction(next)) {
                complete = next;
                next = undefined;
            }

            if (!complete) {
                complete = self._onAfterShow;
            }

            var data = {
                index: index,
                item: item
            };
            if (self._trigger('beforeShow', null, data) === false) { return this; }

            this.container.data('showing.wijlightbox', true);
            var cleanup = function () {
                if ($.isFunction(complete)) {
                    complete.apply(self);
                }

                self.container.data('showing.wijlightbox', false);
                self.container.dequeue('showqueue');
                self.container.clearQueue('showqueue');
            };

            self._refreshCounter(index);

            var prevPlayer = this.container.data('player.wijlightbox'),
				player;

            var onload = function () {

                self.container.data('playerwidth.wijlightbox', player.width);
                self.container.data('playerheight.wijlightbox', player.height);

                var animation = $.extend({}, self._defaults.transAnimation, o.transAnimation);
                if (o.activeIndex === index || animation.animated === 'none' || animation.duration <= 0 || !self._isOpen()) {
                    o.activeIndex = index;
                    if (prevPlayer) {
                        prevPlayer.remove();
                    }
                    player.appendTo(self.content);
                    cleanup();
                    return;
                }

                if (o.cookie) {
                    self._cookie(o.activeIndex, o.cookie);
                }

                if (animation.animated === 'slide') {
                    next = (next === undefined) ? (index > o.activeIndex) : next;
                    self._slideTo(prevPlayer, player, animation, next, cleanup);
                    o.activeIndex = index;
                } else {
                    o.activeIndex = index;
                    var fadeIn = function () {
                        if (player) {
                            player.appendTo(self.content, true);
                            player.fadeIn(animation.duration, cleanup);
                        }
                    };

                    if ($.browser.msie) {
                        self.frame.trigger('mouseleave');
                    }

                    var onFadeOut = function () {
                        if (prevPlayer) {
                            prevPlayer.remove();
                        }

                        if (o.autoSize && !self._isFullSize()) {
                            self._resize(fadeIn);
                        } else {
                            fadeIn();
                            self._refreshText();
                        }
                    };

                    if (prevPlayer) {
                        prevPlayer.fadeOut(animation.duration * 0.4, onFadeOut);
                    } else {
                        onFadeOut();
                    }
                }
            };

            player = this._createPlayer(item, onload);

            return this;
        },

        next: function () {
            /// <summary>Moves to the next panel.</summary>
            var o = this.options;
            if (!this._groupMode()) { return false; }

            var index = o.activeIndex + 1;
            if (o.loop) {
                index = index % o.groupItems.length;
            }

            if (index < o.groupItems.length) {
                this._show(index, true);
                return true;
            }
            return false;
        },

        back: function () {
            /// <summary>Moves to the previous panel.</summary>
            var o = this.options;
            if (!this._groupMode()) { return false; }

            var index = o.activeIndex - 1;
            if (o.loop) {
                index = index < 0 ? o.groupItems.length - 1 : index;
            }

            if (index >= 0) {
                this._show(index, false);
                return true;
            }
            return false;
        },

        isPlaying: function () {
            /// <summary>Determines whether the slide playing is on process.</summary>
            return !!this.container.data('playing.wijlightbox');
        },

        _startTimer: function () {
            if (!this.isPlaying() || !this._groupMode()) {
                return;
            }

            var o = this.options, self = this;
            if (o.showTimer === true) {
                if (!this.timerMeter) {
                    this._createTimerBar();
                }
                var width = this.timerBar.width();
                self.timerMeter.width('0');
                self.timerMeter.animate({ width: width }, o.delay, function () {
                    if (self.isPlaying() && !self.next()) {
                        self.stop();
                    }
                });
            } else {
                window.setTimeout(function () {
                    if (self.isPlaying() && !self.next()) {
                        self.stop();
                    }
                }, o.delay);
            }
        },

        play: function () {
            /// <summary>Starts displaying the images in order automatically.</summary>

            if (!this._groupMode()) { return false; }

            if (!this.container.data('playing.wijlightbox')) {
                this.container.data('playing.wijlightbox', true);
            }

            this._refreshCtrlButtons();
            this._hideNavButtons();
            this._startTimer();
        },

        stop: function () {
            /// <summary>Stops the slide playing mode.</summary>
            this.container.removeData('playing.wijlightbox');

            this._refreshCtrlButtons();
            this._removeTimerBar();
        },

        _size: function (size, calcOnly) {
            var o = this.options, self = this;

            var width = o.width,
				height = o.height,
				playerWidth = o.autoSize ? (this.container.data('playerwidth.wijlightbox') || width) : width,
				playerHeight = o.autoSize ? (this.container.data('playerheight.wijlightbox') || height) : height,
				ratio = playerHeight / playerWidth;

            if (typeof size === 'boolean') {
                calcOnly = size;
            } else if ($.isPlainObject(size) && ('width' in size) && ('height' in size)) {
                width = size.width;
                height = size.height;
            } else {
                var player = this.container.data('player.wijlightbox');
                if (o.autoSize && (player && player.name === 'img')) {
                    if (playerWidth > width) {
                        playerWidth = width;
                        playerHeight = Math.round(width * ratio);
                    }

                    if (playerHeight > height) {
                        playerHeight = height;
                        playerWidth = Math.round(height / ratio);
                    }
                }

                width = playerWidth;
                height = playerHeight;

                if (calcOnly) {
                    return { width: width, height: height };
                }
            }

            this.frame.width(width).height(height);
            this.container.width(this.frame.outerWidth(true));
        },

        _position: function () {
            var o = this.options,
				self = this,
				myAt = [],
				offset = [0, 0],
				isVisible,
				pos = o.position;

            if (pos) {
                // deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
                if (typeof pos === 'string' || (typeof pos === 'object' && '0' in pos)) {
                    myAt = pos.split ? pos.split(' ') : [pos[0], pos[1]];
                    if (myAt.length === 1) {
                        myAt[1] = myAt[0];
                    }

                    $.each(['left', 'top'], function (i, offsetPosition) {
                        if (+myAt[i] === myAt[i]) {
                            offset[i] = myAt[i];
                            myAt[i] = offsetPosition;
                        }
                    });

                    pos = {
                        my: myAt.join(" "),
                        at: myAt.join(" "),
                        offset: offset.join(" ")
                    };
                }

                pos = $.extend({}, o.position, pos);
            }
            // need to show the dialog to get the actual offset in the position plugin
            isVisible = this.container.is(':visible');
            if (!isVisible) {
                this.container.show();
            }

            this.container
            // workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
				.css({ top: 0, left: 0 })
				.position(pos);
            if (!isVisible) {
                this.container.hide();
            }
        },

        _getRelRect: function (rel) {
            var rect;
            if (rel) {
                if ($.isPlainObject(rel) && ('left' in rel) && ('top' in rel) && ('width' in rel) && ('height' in rel)) {
                    rect = $.merge({}, rel);
                } else {
                    rel = $(rel);
                }

                if (rel.jquery && rel.length) {
                    rect = $.extend({}, rel.offset(), {
                        width: rel.width(),
                        height: rel.height()
                    });
                }
            }

            return rect;
        },

        _close: function (rel) {
            var o = this.options, self = this;

            if (!this._isOpen()) { return; }
            var data = { rel: rel };
            if (false === this._trigger('beforeClose', null, data)) { return; }

            rel = data.rel;
            if (!rel && this._groupMode()) {
                rel = o.groupItems[o.activeIndex].img;
            }

            this.container.data('moving.wijlightbox', true);
            this._hideAccessories(false);
            this._hideWaiting();
            this._hideOverlay();
            this.stop();

            var complete = function () {
                self._removePlayer();
                self.container.hide();
                self._trigger('close');

                self.container.unbind('keypress.wijlightbox');
                self.container.removeData('open.wijlightbox')
					.removeData('rect.wijlightbox')
					.removeData('moving.wijlightbox')
					.removeData('fullsize.wijlightbox');

                $(document).unbind('keydown.wijlightbox').unbind('click.wijlightbox');
            };

            var rect = this._getRelRect(rel);
            if (!rect) {
                if (this.container.data('rect.wijlightbox')) {
                    rect = this.container.data('rect.wijlightbox');
                }
            }

            this._removeText();
            if (rect) {
                this._moveTo(rect, { animated: 'sync', duration: 200 }, complete);
                return;
            }

            complete.call();
            return this;
        },

        _isOpen: function () {
            return !!this.container.data('open.wijlightbox');
        },

        _open: function (rel, item) {
            if (this._isOpen()) { return; }

            var o = this.options, self = this;
            if (this.toolBox) {
                if (this._isFullSize()) {
                    this.toolBox.css({ top: '2px', right: '4px' });
                } else {
                    this.toolBox.css({ top: '', right: '' });
                }
            }

            var complete = function () {
                if (o.modal) {
                    self._showOverlay();
                }

                if (o.showControlsOnHover) {
                    this._hideAccessories(false);
                } else {
                    this._showAccessories(false);
                }
                var rect = self._getRelRect(rel);
                self.container.css('opacity', 0);
                self.container.show();
                self._size();
                self._createText(true);
                self._refreshText(true);
                self._position();
                self.container.data('open.wijlightbox', true);

                if (rel && rect) {
                    self.container.data('rect.wijlightbox', rect);
                    self._moveFrom(rect, { animated: 'sync' });
                } else {
                    var animation = $.extend({}, self._defaults.transAnimation, o.transAnimation);
                    if (animation.animated === 'fade') {
                        self.container.hide();
                        self.container.fadeIn(animation.duration, function () {
                            self._createText();
                        });
                    } else {
                        self._createText();
                    }

                    this.container.data('moving.wijlightbox', false);
                }

                $(document).bind('keydown.wijlightbox', $.proxy(self, '_keyDownHandler'))
					.bind('click.wijlightbox', function (e) {
					    var srcElement = e.target || e.srcElement;
					    if (self._isOpen() && !!o.closeOnOuterClick) {
					        if (srcElement !== self.container.get(0) && $(srcElement).parents().index(self.container) < 0) { self._close(); }
					    }
					});

                if (o.autoPlay) {
                    this.play();
                }

                self._refreshNavButtons();
                self._refreshDialogButtons();
				
				var data = {
					index: o.activeIndex,
					item: o.groupItems[o.activeIndex]
				};
				self._trigger('show', null, data);
                self._trigger('open');
            };

            this.container.data('moving.wijlightbox', true);
            this._show(item, true, complete);
            return this;
        },

        _getWinRect: function () {
            var $win = $(window);
            return $.extend({ width: $win.width(), height: $win.height() }, $win.offset() || { left: 2, top: 2 });
        },

        _resizeHandler: function () {
            var o = this.options, self = this;

            self._removeText();
            self._size(self._getWinRect());
            self._createText();
        },

        _isFullSize: function () {
            return !!this.container.data('fullsize.wijlightbox');
        },

        _toggleFullSize: function () {
            var o = this.options, self = this;

            if (!self._isOpen()) { return; }

            var $win = $(window);
            if (this._isFullSize()) {
                if (self.toolBox) {
                    self.toolBox.css({ top: '', right: '' });
                }

                this.container.data('fullsize.wijlightbox', false);
                $win.unbind('resize.wijlightbox', $.proxy(this, '_resizeHandler'));
                self._resize(function(){
					self._adjustPlayerSize(self.content.innerWidth(), self.content.innerHeight());
				});
            } else {
                this.container.data('fullsize.wijlightbox', true);
                $win.bind('resize.wijlightbox', $.proxy(this, '_resizeHandler'));

                var toRect = self._getWinRect(),
					bd = this.frame.borderSize();

                toRect.width -= bd.width;
                toRect.height -= bd.height;
                self._removeText();
                self._moveTo(toRect, { animated: 'sync' }, function () {
                    if (self.toolBox) {
                        self.toolBox.css({ top: '2px', right: '4px' });
                    }

                    self.frame.width(toRect.width);
                    self.container.width(self.frame.outerWidth());
                    self._createText();
					
					self._adjustPlayerSize(self.content.innerWidth(), self.content.innerHeight());					
                });
            }

            this._refreshDialogButtons();
        },

        _getExt: function (url) {
            var ext,
				regExt = /[0-9a-z]+$/i,
				q = url.indexOf("?");

            if (q > -1) {
                url = url.substring(0, q);
            }

            var m = url.match(regExt);
            if (m) {
                ext = m[0].toLowerCase();
            }

            return ext;
        },

        _getPlayerName: function (url) {
            if (url.indexOf("#") === 0 || (url.indexOf("#") > 0 && url.indexOf(document.location.href) === 0)) {
                return "inline";
            }

            var imgExt = ["bmp", "gif", "jpg", "jpeg", "png"],
				swfExt = ["swf"],
				flvExt = ["flv", "m4v"],
				qtExt = ["dv", "mov", "moov", "movie", "mp4", "avi", "mpg", "mpeg"],
				wmpExt = ["asf", "avi", "mpg", "mpeg", "wm", "wmv"],
				html5Video = ["mp4", "mpg", "mpeg", "ogg", "ogv"];

            var ext = this._getExt(url);
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
				if ($.inArray(ext, html5Video) >= 0) {
                    return "wijvideo";
                }
            }
            return "iframe";
        },
		
		_adjustPlayerSize: function(width, height) {
			var player = this.container.data('player.wijlightbox');
            if (player) {
				if (player['adjustSize']){
					player.adjustSize(width, height);
				}
            }
		},

        _removePlayer: function () {
            var player = this.container.data('player.wijlightbox');
            if (player) {
                player.remove();
                this.container.data('player.wijlightbox', null);
            }
        },

        _createPlayer: function (item, onload, onerror) {
            var playerName = item.player;
            if (!$.isFunction($.wijmo.wijlightbox[playerName])) {
                throw "unknown player " + playerName;
            }

            var self = this, cached = false;
            var handleLoad = function () {
                cached = true;
                this._hideWaiting();
                if ($.isFunction(onload)) {
                    window.setTimeout(function () {
                        onload.apply(self);
                    }, 1);
                }
            };

            var handlerError = function () {
                this._hideWaiting();
                if ($.isFunction(onerror)) {
                    onerror.apply(self);
                }
            };

            var player = new $.wijmo.wijlightbox[playerName](this, item, handleLoad, handlerError);
            this.container.data('player.wijlightbox', player);

            window.setTimeout(function () {
                if (cached === false) {
                    self._showWaiting();
                }
            }, 200);

            return player;
        }
    });


    $.extend($.wijmo.wijlightbox, {
        img: function (lightbox, item, onload, onerror) {
            this.name = 'img';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            var self = this,
				$img = $('<img></img>')
					.css({ width: 'auto', height: 'auto', display: 'none' })
					.appendTo(document.body)
					.bind({
					    'load': function () {
					        var img = $(this);
					        self.width = item.width ? parseInt(item.width, 10) : img.width();
					        self.height = item.height ? parseInt(item.height, 10) : img.height();
					        img.remove();

					        if (onload && $.isFunction(onload)) {
					            onload.apply(lightbox);
					        }
					    },
					    'error': function () {
					        $(this).remove();
					        if (onerror && $.isFunction(onerror)) {
					            onerror.apply(lightbox);
					        }
					    }
					}).attr('src', this.url);
        },
        swf: function (lightbox, item, onload, onerror) {
            this.name = 'swf';
            var lo = lightbox.options;
            this.id = 'flashhost';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            this.height = item.height ? parseInt(item.height, 10) : lo.height;
            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        },
        iframe: function (lightbox, item, onload, onerror) {
            this.name = 'swf';
            var lo = lightbox.options;
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            if (item.width) {
                this.width = parseInt(item.width, 10);
            }
            if (item.height) {
                this.height = parseInt(item.height, 10);
            }

            this.$iframe = $('<iframe></iframe>').addClass('wijmo-wijlightbox-iframe')
				.attr({
				    frameborder: '0',
				    marginwidth: '0',
				    marginheight: '0',
				    scrolling: 'auto',
				    allowtransparency: 'true'
				}).hide()
				.appendTo(lightbox.content)
				.bind('load', function () {
				    if (onload && $.isFunction(onload)) {
				        onload.apply(lightbox);
				    }
				})
				.attr('src', this.url);
        },
        inline: function (lightbox, item, onload, onerror) {
            this.name = 'inline';
            var lo = lightbox.options;
            this.lightbox = lightbox;
            this.item = item;

            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            if (item.height) {
                this.height = parseInt(item.height, 10);
            } else {
                var $temp = $(this.item.href).clone()
							.show()
							.append('<br clear="all" />')
							.wrap('<div class="wijmo-wijlightbox ui-widget"><div class="wijmo-wijlightbox-frame ui-widget-content ui-corner-all ui-helper-clearfix"><div class="wijmo-wijlightbox-frame ui-widget-content ui-corner-all ui-helper-clearfix"><div class="wijmo-wijlightbox-content"> </div></div></div></div>')
							.appendTo(document.body).width(this.width);
                this.height = $temp.outerHeight(true) + 10;

                $temp.unwrap();
                $temp.remove();
            }

            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        },
        flv: function (lightbox, item, onload, onerror) {
            this.name = 'flv';
            var lo = lightbox.options;
            this.id = 'flvhost';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            var jwControllerHeight = 20;
            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            this.height = item.height ? parseInt(item.height, 10) : lo.height;
            if (lo.showMovieControls) {
                this.height += jwControllerHeight;
            }

            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        },
        wmp: function (lightbox, item, onload, onerror) {
            this.name = 'wmp';
            var lo = lightbox.options;
            this.id = 'wmphost';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            var wmpControllerHeight = ($.browser.msie ? 70 : 45);
            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            this.height = item.height ? parseInt(item.height, 10) : lo.height;
            if (lo.showMovieControls) {
                this.height += wmpControllerHeight;
            }

            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        },
        qt: function (lightbox, item, onload, onerror) {
            this.name = 'qt';
            var lo = lightbox.options;
            this.id = 'qthost';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);

            var qtControllerHeight = 16;
            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            this.height = item.height ? parseInt(item.height, 10) : lo.height;
            if (lo.showMovieControls) {
                this.height += qtControllerHeight;
            }

            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        },
		wijvideo: function (lightbox, item, onload, onerror) {
            this.name = 'wijvideo';
            var lo = lightbox.options;
            this.id = 'wijvideohost';
            this.lightbox = lightbox;
            this.item = item;
            this.url = this.lightbox._getUrl(item);
			this.wijvideosrc = (!!item.wijvideosrc && item.wijvideosrc !== "") ? this.lightbox._getUrl(item.wijvideosrc) : null;
            this.width = item.width ? parseInt(item.width, 10) : lo.width;
            this.height = item.height ? parseInt(item.height, 10) : lo.height;

            if (onload && $.isFunction(onload)) {
                onload.apply(lightbox);
            }
        }
    });


    $.extend($.wijmo.wijlightbox.img.prototype, {
        appendTo: function ($content, hidden) {
            this.$element = $('<img></img>').addClass('wijmo-wijlightbox-image').attr('src', this.url);
            if (hidden) {
                this.$element.hide();
            }

            this.$element.appendTo($content);
        },
        remove: function () {
            if (this.$element) {
                this.$element.remove();
            }
        },
        fadeOut: function (duration, complete) {
            if (this.$element) {
                this.$element.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$element) {
                this.$element.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$element;
        }
    });


    $.extend($.wijmo.wijlightbox.swf.prototype, {
        appendTo: function ($content) {
            this.$container = $('<div/>').css({
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }).attr('id', this.id).appendTo($content);

            var lo = this.lightbox.options,
				express = lo.flashInstall,
				version = lo.flashVersion,
				flashvars = lo.flashVars,
				params = lo.flashParams;
            S.flash.embedSWF(this.item.href, this.id, '100%', '100%', version, express, flashvars, params);
        },
        remove: function () {
            S.flash.expressInstallCallback();
            S.flash.removeSWF(this.id);
            this.$container.remove();
        },
        fadeOut: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$container;
        }
    });


    $.extend($.wijmo.wijlightbox.iframe.prototype, {
        appendTo: function ($content, hidden) {
            if (!hidden) {
                this.$iframe.show();
            }
        },
        remove: function () {
            if (this.$iframe) {
                this.$iframe.remove();
            }
        },
        fadeOut: function (duration, complete) {
            if (this.$iframe) {
                this.$iframe.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$iframe) {
                this.$iframe.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$iframe;
        }
    });

    $.extend($.wijmo.wijlightbox.inline.prototype, {
        appendTo: function ($content, hidden) {
            this.$element = $(this.item.href).clone().appendTo($content);
            if (!hidden) {
                this.$element.show();
            }
        },
        remove: function () {
            if (this.$element) {
                this.$element.remove();
            }
        },
        fadeOut: function (duration, complete) {
            if (this.$element) {
                this.$element.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$element) {
                this.$element.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$element;
        }
    });


    $.extend($.wijmo.wijlightbox.flv.prototype, {
        appendTo: function ($content) {
            this.$container = $('<div/>').css({
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }).attr('id', this.id).appendTo($content);

            var lo = this.lightbox.options,
				width = '100%',
				height = '100%',
				swf = lo.flvPlayer,
				express = lo.flashInstall,
				version = lo.flashVersion,
				flashvars = $.extend({
				    file: this.url,
				    width: width,
				    height: height,
				    autostart: (lo.autoPlayMovies ? 'true' : 'false'),
				    controlbar: (lo.showMovieControls ? 'bottom' : "none"),
				    backcolor: "0x000000",
				    frontcolor: "0xCCCCCC",
				    lightcolor: "0x557722"
				}, lo.flashVars),
				params = $.extend({
				    autostart: (lo.autoPlayMovies ? 'true' : 'false'),
				    allowscriptaccess: 'always'
				}, lo.flashParams);

            S.flash.embedSWF(swf, this.id, width, height, version, express, flashvars, params);
        },
        remove: function () {
            S.flash.expressInstallCallback();
            S.flash.removeSWF(this.id);
            this.$container.remove();
        },
        fadeOut: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$container;
        }
    });

    $.extend($.wijmo.wijlightbox.wmp.prototype, {
        appendTo: function ($content) {
            this.$container = $('<div/>').css({
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }).appendTo($content);

            var lo = this.lightbox.options,
				movie = '<object id="' + this.id + '" name="' + this.id + '" height="' + this.height + '" width="' + this.width + '"',
				params = {
				    autostart: lo.autoPlayMovies ? 1 : 0
				},
				p;
            if ($.browser.msie) {
                movie += ' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"';
                params.url = this.url;
                params.uimode = lo.showMovieControls ? "full" : "none";
            } else {
                movie += ' type="video/x-ms-wmv"';
                movie += ' data="' + this.url + '"';
                params.showcontrols = lo.showMovieControls ? 1 : 0;
            }
            movie += ">";
            for (p in params) {
                movie += '<param name="' + p + '" value="' + params[p] + '">';
            }
            movie += "</object>";
            this.$container.html(movie);
        },
        remove: function () {
            if ($.browser.msie) {
                try {
                    window[this.id].controls.stop();
                    window[this.id].URL = "movie" + now() + ".wmv";
                    window[this.id] = function () { };
                } catch (e) { }
            }

            this.$container.remove();
        },
        fadeOut: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$container;
        }
    });

    $.extend($.wijmo.wijlightbox.qt.prototype, {
        appendTo: function ($content) {
            this.$container = $('<div/>').css({
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }).appendTo($content);

            var lo = this.lightbox.options,
				autoplay = lo.autoPlayMovies ? 'true' : 'false',
				controls = lo.showMovieControls ? 'true' : 'false';
            var movie = "<object",
				attrs = {
				    id: this.id,
				    name: this.id,
				    width: this.width,
				    height: this.height,
				    kioskmode: "true"
				},
				m,
				p;
            if ($.browser.msie) {
                attrs.classid = "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
                attrs.codebase = "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0";
            } else {
                attrs.type = "video/quicktime";
                attrs.data = this.url;
            }
            for (m in attrs) {
                movie += " " + m + '="' + attrs[m] + '"';
            }
            movie += ">";
            var params = {
                src: this.url,
                scale: "aspect",
                controller: controls,
                autoplay: autoplay
            };
            for (p in params) {
                movie += '<param name="' + p + '" value="' + params[p] + '">';
            }
            movie += "</object>";

            this.$container.html(movie);
        },
        remove: function () {
            try {
                document[this.id].Stop();
				document[this.id] = null;
            } catch (e) { }

            this.$container.remove();
        },
        fadeOut: function (duration, complete) {
			complete.call(); return;
            if (this.$container) {
                this.$container.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
			complete.call(); return;
            if (this.$container) {
                this.$container.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$container;
        }
    });

	$.extend($.wijmo.wijlightbox.wijvideo.prototype, {
        appendTo: function ($content) {
			var lo = this.lightbox.options;
            this.$container = $('<video/>').css({
                overflow: 'hidden'
            }).attr({
				width: this.width,
                height: this.height,
				autoPlay: (lo.autoPlayMovies ? 'true' : 'false'),
				controls: (lo.showMovieControls ? 'controls' : '')
			}).appendTo($content);
			
			if (!!this.url){
				$('<source/>').attr({src: this.url}).appendTo(this.$container);
			}
			
			if (!!this.wijvideosrc){
				$('<source/>').attr({src: this.wijvideosrc}).appendTo(this.$container);
			}
			
			this.$container.wijvideo({fullScreenButtonVisible: false});
        },
        remove: function () {
            this.$container.remove();
        },
        fadeOut: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeOut(duration, complete);
            }
        },
        fadeIn: function (duration, complete) {
            if (this.$container) {
                this.$container.fadeIn(duration, complete);
            }
        },
        getElement: function () {
            return this.$container;
        },
		adjustSize: function(width, height) {
			this.$container.wijvideo('setWidth', width);
			this.$container.wijvideo('setHeight', height);
		}
    });

    $.extend($.wijmo.wijlightbox, {
        overlay: function (lightbox, waiting) {
            this.mask = $('<div></div>')
				.addClass('ui-widget-overlay wijmo-wijlightbox-overlay' + (waiting ? " wijmo-wijlightbox-waitingoverlay" : ""))
				.appendTo(document.body)
				.css({
				    width: this.width(),
				    height: this.height()
				}).bind("click", function () {
					lightbox._close();
					return false;
				});

            if ($.fn.bgiframe) {
                this.mask.bgiframe();
            }

            if (waiting) {
                this.mask.css('z-index', this.zIndex);
                var $sandglass = $('<div></div>')
					.addClass('wijmo-wijlightbox-waiting')
					.css('z-index', this.zIndex + 1)
					.appendTo(this.mask);

                $sandglass.css({
                    left: (this.mask.width() - $sandglass.width()) / 2,
                    top: (this.mask.height() - $sandglass.height()) / 2
                });
            }

            // handle window resize
            $(window).bind('resize.wijlightbox-overlay', $.proxy(this, 'resize'));

            window.setTimeout(function () {
                if (this.mask) {
                    $(document).bind($.wijmo.wijlightbox.overlay.events, function (event) {
                        if ($(event.target).zIndex() < $.wijmo.wijlightbox.overlay.zIndex) {
                            return false;
                        }
                    });
                }
            }, 1);
        }
    });

    $.extend($.wijmo.wijlightbox.overlay.prototype, {
        mask: null,
        zIndex: 1000,
        events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
			function (event) { return event + '.wijlightbox-overlay'; }).join(' '),
        close: function () {
            $([document, window]).unbind('.wijlightbox-overlay');
            this.mask.remove();
            this.mask = undefined;
        },
        height: function () {
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
                    return $(window).height();
                } else {
                    return scrollHeight;
                }
                // handle "good" browsers
            } else {
                return $(document).height();
            }
        },

        width: function () {
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
                    return $(window).width();
                } else {
                    return scrollWidth;
                }
                // handle "good" browsers
            } else {
                return $(document).width();
            }
        },

        resize: function () {
            if (this.mask) {
                this.mask.css({
                    width: this.width(),
                    height: this.height()
                });
            }
        }
    });
} (jQuery));
