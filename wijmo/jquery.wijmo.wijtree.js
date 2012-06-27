/*globals jQuery,window*/
/*
*
* Wijmo Library 2.1.3
* http://wijmo.com/
*
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
* licensing@wijmo.com
* http://wijmo.com/license
*
*
** Wijmo Tree widget.
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.widget.js
*  jquery.effects.core.js
*  jquery.ui.draggable.js
*  jquery.ui.droppable.js
*  jquery.wijmo.wijtextbox.js
*
*/
(function ($) {
	"use strict";
	$.widget("wijmo.wijtree", {

		options: {
			///	<summary>
			/// Allows tree nodes to be dragged
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("option","allowDrag",true).
			///	</summary>
			allowDrag: false,
			///	<summary>
			///	Allows tree to be dropped within tree nodes.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("option","allowDrop",true).
			///	</summary>
			allowDrop: false,
			///	<summary>
			///	Allows tree nodes to be edited at run time.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("option","allowEdit",true).
			///	</summary>
			allowEdit: false,
			///	<summary>
			///	Allows tree nodes to be sorted at run time.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("option","allowSorting",false).
			///	</summary>
			allowSorting: true,
			///	<summary>
			///	Allow triState of checkBox.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("option","allowTriState",false).
			///	</summary>
			allowTriState: true,
			///	<summary>
			///	Allows sub-nodes to be checked upon parent node check.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("option","autoCheckNodes",false).
			///	</summary>
			autoCheckNodes: true,
			///	<summary>
			///	If this option is set to true, 
			/// the expanded node will be collapsed if another node is expanded.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("option","autoCollapse",false).
			///	</summary>
			autoCollapse: false,
			///	<summary>
			///	If set to true, the select, click, 
			/// and check operations are disabled too.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("option","disabled",true).
			///	</summary>
			disabled: false,
			///	<summary>
			///	If this option is set to true, the tree will be expand/Collapse 
			/// when the mouse hovers on the expand/Collapse button 
			/// Type:Boolean.
			/// Default:false.
			/// Code example:
			/// $(".selector").wijtree("option","expandCollapseHoverUsed",true).
			///	</summary>
			expandCollapseHoverUsed: false,
			///	<summary>
			///	Allows the CheckBox to be shown on tree nodes
			/// Type:Boolean.
			/// Default:true.
			/// Code example:
			/// $(".selector").wijtree("option","showCheckBoxes",false).
			///	</summary>
			showCheckBoxes: false,
			///	<summary>
			///	Allows tree nodes to be expanded or collapsed
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("option","showExpandCollapse",false).
			///	</summary>
			showExpandCollapse: true,
			///	<summary>
			///	Animation options for showing the child nodes 
			/// when the parent node is expanded.
			/// Type:Object.
			/// Default:{ effect: "blind", easing: "easeOutExpo", duration: 200 }.
			/// Code example:$(".selector").wijtree("option","expandAnimation",
			/// { effect: "blind", easing: "easeOutExpo", duration: 200 }).
			///	</summary>
			expandAnimation: { effect: "blind", easing: "easeOutExpo", duration: 200 },
			///	<summary>
			///	The duration of the time to delay before the node is expanded.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtree("option","expandDelay",100).
			///	</summary>
			expandDelay: 0,
			///	<summary>
			/// Animation options for hiding the child nodes 
			/// when the parent node is collapsed.
			/// Type:Object.
			/// Default:{ effect: "blind", easing: "easeOutExpo", duration: 200 }.
			/// Code example:$(".selector").wijtree("option","collapseAnimation",
			/// { effect: "blind", easing: "easeOutExpo", duration: 200 }).
			///	</summary>
			collapseAnimation: { effect: "blind", easing: "easeOutExpo", duration: 200 },
			///	<summary>
			///	The duration of the time to delay before the node is collapsed.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtree("option","collapseDelay",100).
			///	</summary>
			collapseDelay: 0,
			///	<summary>
			///	Customize the jquery-ui-draggable plugin of wijtree.
			/// Type:object.
			/// Default:null.
			/// Code example:$(".selector").wijtree("option","draggable",{
			///		//options for draggable plugin.
			/// }).
			///	</summary>
			draggable: null,
			///	<summary>
			///	Customize the jquery-ui-droppable plugin of wijtree.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtree("option","droppable",{
			///		//options for draggable plugin.
			/// }).
			droppable: null,
			///	<summary>
			///	Customizes the helper element to be used to display the position that
			/// the node will be inserted to. 
			/// If a function is specified, it must return a DOMElement.
			/// Type:String, Function.
			/// Default:null.
			/// Code example:$(".selector").wijtree("option","dropVisual",function(){
			///		return $("<div>");
			/// }).
			///	</summary>
			dropVisual: null,
			/// <summary>
			/// Set the child nodes object array as the datasource of wijtree.
			/// Default: []
			/// Type: Array
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree("option","nodes",
			/// [{ text:"node1", navigateUrl:"#" }]);
			/// </summary>
			nodes: [],

			/// <summary>
			/// The nodeBlur event handler. A function called when a node is blurred.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeBlur: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeBlur
			/// $("#selector").bind("wijtreenodeBlur", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeBlur: null,
			/// <summary>
			/// The nodeClick event handler. A function called when a node is clicked.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeClick: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeClick
			/// $("#selector").bind("wijtreenodeClick", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeClick: null,
			/// <summary>
			/// The nodeCheckChanged event handler. 
			/// A function called when a node is checked or unchecked.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeCheckChanged: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeCheckChanged
			/// $("#selector").bind("wijtreenodeCheckChanged", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeCheckChanged: null,
			/// <summary>
			/// The nodeCollapsed event handler.
			/// A function called when a node is collapsed.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeCollapsed: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeCollapsed
			/// $("#selector").bind("wijtreenodeCollapsed", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeCollapsed: null,
			/// <summary>
			/// The nodeExpanded event handler.
			/// A function called when a node is expanded.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeExpanded: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeExpanded
			/// $("#selector").bind("wijtreenodeExpanded", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeExpanded: null,
			/// <summary>
			/// The nodeDragging event handler.A function called
			/// when the node is moved during a drag-and-drop operation. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeDragging: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeDragging
			/// $("#selector").bind("wijtreenodeDragging", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeDragging: null,
			/// <summary>
			/// The nodeDragStarted event handler.
			/// A function called when a user starts to drag a node. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeDragStarted: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeDragStarted
			/// $("#selector").bind("wijtreenodeDragStarted", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeDragStarted: null,
			/// <summary>
			/// The nodeBeforeDropped event handler.
			/// A function called before an acceptable draggable node 
			/// is dropped over to another position. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeBeforeDropped: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeDropped
			/// $("#selector").bind("wijtreenodebeforedropped", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.			
			/// </param>
			nodeBeforeDropped: null,
			/// <summary>
			/// The nodeDropped event handler.
			/// A function called when an acceptable draggable node 
			/// is dropped over to another position. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeDropped: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeDropped
			/// $("#selector").bind("wijtreenodeDropped", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The data relates to this event.
			/// data.sourceParent: 
			/// The source parent of current draggable node before it be dragged ,
			/// a jQuery object.
			/// data.sIndex: The Index of dragged node in source parent.
			/// data.targetParent: 
			/// The target parent of current draggable node after it be dropped ,
			/// a jQuery object.
			/// data.tIndex: The Index of dragged node in target parent.
			/// data.draggable: The current draggable node.
			/// data.offset: The current absolute position of the draggable helper.
			/// data.position: The current position of the draggable helper.
			/// </param>
			nodeDropped: null,
			/// <summary>
			/// The nodeMouseOver event handler.
			/// A function called when the user mouses over the node. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeMouseOver: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeMouseOver
			/// $("#selector").bind("wijtreenodeMouseOver", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeMouseOver: null,
			/// <summary>
			/// The nodeMouseOut event handler.
			/// A function called when the user mouses out of the node. 
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeMouseOut: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeMouseOut
			/// $("#selector").bind("wijtreenodeMouseOut", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeMouseOut: null,
			/// <summary>
			/// The nodeTextChanged event handler.
			/// A function called when the text of the node changes.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeTextChanged: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeTextChanged
			/// $("#selector").bind("wijtreenodeTextChanged", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeTextChanged: null,
			/// <summary>
			/// The selectedNodeChanged event handler.
			/// A function called when the selected node changes.
			/// Default: null
			/// Type: Function
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ selectedNodeChanged: function (e, data) { } });
			/// Bind to the event by type: wijtreeselectedNodeChanged
			/// $("#selector").bind("wijtreeselectedNodeChanged", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			selectedNodeChanged: null,
			/// <summary>
			/// A function called before expanding the node, 
			/// This event can be canceled, if return false 
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeExpanding: function (e, data) { } });
			/// Bind to the event by type: wijtreenodeexpanding
			/// $("#selector").bind("wijtreenodeexpanding", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeExpanding: null,
			/// <summary>
			/// A function called before collapsing the node, 
			/// This event can be canceled, if return false
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijtree({ nodeCollapsing: function (e, data) { } });
			/// Bind to the event by type: wijtreenodecollapsing
			/// $("#selector").bind("wijtreenodecollapsing", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="Object">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// The node widget that relates to this event.
			/// </param>
			nodeCollapsing: null
		},

		/* init methods*/
		_create: function () {
			this._initState();
			this._createTree();
			this._attachEvent();
			this._attachNodeEvent();
		},

		_setOption: function (key, value) {
			var self = this, isResetHitArea = false, check;

			switch (key) {
				case "allowDrag":
					self._setAllowDrag(value);
					break;
				case "allowDrop":
					self._setAllowDrop(value);
					break;
				case "showCheckBoxes":
					self._setCheckBoxes(value);
					break;
				case "showExpandCollapse":
					if (self.options.showExpandCollapse !== value) {
						isResetHitArea = true;
					}
					break;
				case "disabled":
					if (value) {
						self.widgetDom.addClass("ui-state-disabled");
					} else {
						self.widgetDom.removeClass("ui-state-disabled");
					}
					check = self.element.find(":wijmo-wijtreecheck");
					if (check.length) {
						check.wijtreecheck("option", "disabled", value);
					}
					break;
				default:
					break;
			}
			$.Widget.prototype._setOption.apply(self, arguments); //use Widget disable

			if (key === "nodes") {
				self._createChildNodes();
			}

			if (isResetHitArea === true) {
				self._setHitArea(value);
			}
		},

		_initState: function () { //declare the properties of tree
			var self = this;
			self._selectedNodes = [];
			self._checkedNodes = [];
			self._enabled = true;
			self._insertPosition = "unKnown"; //end,after,before
			self.nodeWidgetName = "wijtreenode";
		},

		_createTree: function () {//create by dom
			var self = this, o = self.options, nodes = [],
			treeClass = "wijmo-wijtree ui-widget ui-widget-content " +
			"ui-helper-clearfix ui-corner-all";

			if (self.element.is("ul")) {
				self.$nodes = self.element;
				self.element.wrap("<div></div>");
				self.widgetDom = self.element.parent();
			}
			else if (self.element.is("div")) {
				self.widgetDom = self.element;
				self.$nodes = self.widgetDom.children("ul:eq(0)");
			}

			if (self.$nodes.length) {
				self.widgetDom.addClass(treeClass)
				.attr({
					role: "tree",
					"aria-multiselectable": true
				});
				self.$nodes.addClass("wijmo-wijtree-list ui-helper-reset");

				if (o.showExpandCollapse === false) {
					self.$nodes.addClass("wijmo-wijtree-allexpanded");
				}

				nodes = self._createChildNodes();
				self.widgetDom
				.append($("<div>").css("clear", "both"));
			}

			if (o.disabled) {
				self.disable();
			}
		},

		_createChildNodes: function () {
			var self = this, options = {}, nodes = [],
			ns = self.$nodes, data = self.options.nodes,
			lis = ns.children("li");
			if (data.length) {
				ns.empty();
				$.each(data, function (i, n) {
					var $li = self._generateMarkup(n);
					ns.append($li);
					options.nIndex = i;
					self._createNodeWidget($li, options);
					nodes.push(self._getNodeWidget($li));
				});
			}
			else {
				lis.each(function () {
					var $li = $(this), w;
					self._createNodeWidget($li, options);
					w = self._getNodeWidget($li);
					nodes.push(w);
					data.push(w.options);
				});
			}

			self._hasChildren = nodes.length > 0;
			self._setField("nodes", nodes);
			self.nodes = nodes;
		},

		_generateMarkup: function (item) {
			var li, a, u = item.navigateUrl;
			if (!$.isPlainObject(item)) {
				return;
			}
			li = $("<li></li>");

			a = $("<a>").attr("src",
			(typeof u === "string" && u) ? u : "#");
			a.appendTo(li);

			if (typeof item.text === "string" && item.text) {
				$("<span>").html(item.text).appendTo(a);
			}
			return li;
		},

		_createNodeWidget: function ($li, options) {
			var self = this, nodeWidgetName = self.nodeWidgetName;
			if ($.fn[nodeWidgetName]) {
				$li.data("owner", this);
				if (!!options && $.isPlainObject(options)) {
					$.extend(options, { treeClass: this.widgetBaseClass });
					$li[nodeWidgetName](options);
				}
				else {
					$li[nodeWidgetName]({ treeClass: this.widgetBaseClass });
				}
			}
			return $li;
		},

		//		getChildNodes: function (node) {
		//			var expand = this._trigger("expandingPotentialParentNode", null, {
		//				node : node,
		//				params : node.options.params
		//			});
		//			if (expand !== false) {
		//				node._expandNode(true);
		//			}
		//		},

		/*tree event*/
		_attachEvent: function () {
			var self = this;
			self.element.bind($.browser.msie ? "focusin." : "focus." + self.widgetName,
			$.proxy(self._onFocus, self))
			.bind("mouseover." + this.widgetName, $.proxy(self._onMouseOver, self));
			if (self.options.allowDrop) {
				self._attachDroppable();
			}
		},

		_attachDroppable: function () {
			var self = this, o = self.options, options = {
				accept: "li",
				scope: "tree"
			}, setTriState = function (node) {
				if (o.showCheckBoxes &&
				o.allowTriState &&
				!node.element.is(":" + self.widgetBaseClass) &&
				node._getField("nodes").length > 0) {
					node._getField("nodes")[0]
					._setParentCheckState();
				}
			}, droppable = o.droppable;
			$.extend(options, droppable);
			options.drop = function (event, ui) {
				var d = ui.draggable, dragNode = self._getNodeWidget(d),
					dropNode, position, oldOwner, parent, brothers, idx,
					oldPosition, newPosition = -1;
				if (self._trigger("nodeBeforeDropped", event, ui) === false ||
				!dragNode || o.disabled) {
					return;
				}
				dropNode = dragNode._dropTarget;
				position = dragNode._insertPosition;
				if (dropNode && position !== "unKnown") {
					oldOwner = d.data("owner");

					if (oldOwner) {
						oldPosition = d.index();
					}

					if (position === "end") {
						newPosition = dropNode._getField("nodes").length;
						parent = dropNode;
					}
					else if (position === "before" || position === "after") {
						parent = dropNode._getField("owner");
						brothers = parent._getField("nodes");
						idx = $.inArray(dropNode, brothers);
						if (idx !== -1) {
							newPosition = position === "before" ? idx : idx + 1;
						}
					}

					if (droppable && $.isFunction(droppable.drop)) {
						ui.oldParent = oldOwner.element;
						ui.newParent = parent.element;
						ui.oldIndex = oldPosition;
						ui.newIndex = newPosition;
						droppable.drop.call(self.element, event, ui);
					}
					else {
						if (oldOwner) {
							oldOwner.remove(d);
						}
						if (newPosition !== -1) {
							parent.add(d, newPosition);
						}
					}

					/*reset old tree*/
					$("a:eq(0)", d).blur();
					dragNode._tree._isDragging = false;
					if (dragNode.options.selected) {
						dragNode._setSelected(false);
					}
					/*set tree*/
					setTriState(oldOwner);
					setTriState(parent);

					$.extend(ui, {
						sourceParent: oldOwner ? oldOwner.element : null,
						sIndex: oldPosition,
						targetParent: parent.element,
						tIndex: newPosition,
						widget: dragNode
					});
					self._trigger("nodeDropped", event, ui);
				}
			};

			self.widgetDom.droppable(options);
		},

		_attachNodeEvent: function () {
			this.element.bind("click." + this.widgetName, $.proxy(this._onClick, this))
			.bind("mouseout." + this.widgetName, $.proxy(this._onMouseOut, this))
			.bind("keydown." + this.widgetName, $.proxy(this._onKeyDown, this));
		},

		_onClick: function (event) {
			this._callEvent(event, '_onClick');
			if ($.browser.webkit) {
				this.widgetDom.focus();
			}
		},

		_onFocus: function (event) {
			this._callEvent(event, '_onFocus');
		},

		_onKeyDown: function (event) {
			this._callEvent(event, '_onKeyDown');
		},

		_onMouseOut: function (event) {
			this._callEvent(event, '_onMouseOut');
		},

		_onMouseOver: function (event) {
			this._callEvent(event, '_onMouseOver');
		},

		_callEvent: function (event, type) {
			var el = event.target, node;
			if (el) {
				node = this._getNodeWidgetByDom(el);
				if (node === null) {
					return;
				}
				node[type](event);
			}
		},

		_nodeSelector: function () {
			return ":wijmo-wijtreenode";
		},

		/*public methods*/
		getSelectedNodes: function () {
			/// <summary>
			/// Get the selected nodes
			/// </summary>
			return this._selectedNodes;
		},

		getCheckedNodes: function () {
			/// <summary>
			/// Get the checked nodes
			/// </summary>
			var self = this, checkedNodes = [],
			nodeWidgetName = self.nodeWidgetName;
			$(self._nodeSelector(), self.element).each(function () {
				if ($(this)[nodeWidgetName]("option", "checked") &&
				$(this)[nodeWidgetName]("option", "checkState") !== "indeterminate") {
					checkedNodes.push($(this));
				}
			});
			return checkedNodes;
		},

		destroy: function () {
			/// <summary>
			/// Destroy the widget
			/// </summary>
			var self = this, $nodes = self.$nodes,
			c = "wijmo-wijtree ui-widget ui-widget-content " +
			"ui-helper-clearfix ui-corner-all";
			self.widgetDom.removeClass(c)
			.removeAttr("role")
			.removeAttr("aria-multiselectable");

			if (self.widgetDom.data("droppable")) {
				self.widgetDom.droppable("destroy");
			}

			self.widgetDom.children("div[style]:last").remove();
			$nodes.removeData("nodes")
			.removeClass("wijmo-wijtree-list ui-helper-reset");
			$nodes.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				if (nodeWidget) {
					nodeWidget.destroy();
				}
			});
			$.Widget.prototype.destroy.apply(this);
		},

		add: function (node, position) {
			/// <summary>
			/// Add a node to the element.
			/// </summary>
			/// <param name="node" type="String,Object">
			/// which node to be added
			/// 1.markup html.such as "<li><a>node</a></li>" as a node.
			/// 2.wijtreenode widget.
			/// 3.object options according to the options of wijtreenode.
			/// </param>
			/// <param name="position" type="Int">
			/// the position to insert at
			/// </param>
			var nodeWidget = null, o = {}, $node, nodes, self = this, i,
			originalLength, itemDom = "<li><a href='{0}'>{1}</a></li>", cnodes;
			if (typeof node === "string") {
				$node = $(itemDom.replace(/\{0\}/, "#")
				.replace(/\{1\}/, node));
				self._createNodeWidget($node, o);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if (node.jquery) {
				if (!node.data("widgetName")) {
					self._createNodeWidget(node, o);
				}
				nodeWidget = node.data(node.data("widgetName"));
			}
			else if (node.nodeType) {
				$node = $(node);
				self._createNodeWidget($node, o);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if ($.isPlainObject(node)) {
				$node = $(itemDom.replace(/\{0\}/, node.url ? node.url : "#")
				.replace(/\{1\}/, node.text)); //node
				self._createNodeWidget($node, node);
				nodeWidget = $node.data($node.data("widgetName"));
			}

			if (nodeWidget === null) {
				return;
			}
			nodes = self._getField("nodes");
			if (!position || position > nodes.length) {
				position = nodes.length;
			}
			cnodes = nodeWidget._getField("nodes");
			nodeWidget._tree = self;
			for (i = 0; i < cnodes.length; i++) {
				cnodes[i]._tree = self;
			}
			nodeWidget._setField("owner", this);

			originalLength = nodes.length;
			if (originalLength > 0 && originalLength !== position) {
				if (nodeWidget.element.get(0) !== nodes[position].element.get(0)) {
					nodeWidget.element.insertBefore(nodes[position].element);
				}
			}
			else {
				self.$nodes.append(nodeWidget.element);
			}
			self._changeCollection(position, nodeWidget);
			nodeWidget._initNodeClass();
			//self._refreshNodesClass();
		},

		remove: function (node) {
			/// <summary>
			/// Remove a node to the element.
			/// </summary>
			/// <param name="node" type="String,Object">
			/// which node to be removed
			/// 1.wijtreenode widget.
			/// 2.the index of which node you determined to remove.
			/// </param>
			var idx = -1, nodeWidget, nodes;
			if (node.jquery) {
				idx = node.index();
			}
			else if (typeof node === "number") {
				idx = node;
			}
			nodes = this._getField("nodes");
			if (idx < 0 || idx >= nodes.length) {
				return;
			}
			nodeWidget = nodes[idx];
			nodeWidget.element.detach();
			this._changeCollection(idx);
			//this._refreshNodesClass();
		},

		_changeCollection: function (idx, nodeWidget) {
			var nodes = this._getField("nodes"),
			ons = this.options.nodes;
			if (nodeWidget) {
				nodes.splice(idx, 0, nodeWidget);
				ons.splice(idx, 0, nodeWidget.options);
			}
			else {
				nodes.splice(idx, 1);
				ons.splice(idx, 1);
			}
		},

		getNodes: function () {
			/// <summary>
			///  Gets a array that contains the root nodes of the current tree.
			/// </summary>
			/// <returns type="array" />
			return this.nodes;
		},

		findNodeByText: function (txt) {
			/// <summary>
			/// Find node by the node text
			/// </summary>
			/// <param name="txt" type="String">
			/// the text of which node you want to find
			/// </param>
			/// <returns type="wijtreenode" />
			var nodes = $(".wijmo-wijtree-node a>span", this.$nodes).filter(function () {
				return $(this).text() === txt;
			});
			if (nodes.length) {
				return this._getNodeWidgetByDom(nodes.get(0));
			}
			return null;
		},

		_setAllowDrag: function (value) {
			var self = this, $allNodes, nodeSelector = self._nodeSelector(),
			nodeWidgetName = self.nodeWidgetName;
			if (value) {
				$allNodes = self.element.find(nodeSelector);
				$allNodes.each(function () {
					var w = $(this).data(nodeWidgetName);
					if (!$(this).data("draggable") &&
					!w.$navigateUrl.data("events").mousedown) {
						w.$navigateUrl.one("mousedown", w, w._onMouseDown);
					}
				});
			}
			else {
				$allNodes = self.element.find(nodeSelector + ":ui-draggable");
				$allNodes.draggable("destroy");
			}
		},

		_setAllowDrop: function (value) {
			if (value) {
				if (!this.widgetDom.data("droppable")) {
					this._attachDroppable();
				}
			}
			else if (this.widgetDom.droppable) {
				this.widgetDom.droppable("destroy");
			}
		},

		_setCheckBoxes: function (value) {
			var self = this;
			self.$nodes.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				if (nodeWidget !== null) {
					nodeWidget._setCheckBoxes(value);
				}
			});
		},

		_setHitArea: function (value) {
			var self = this;

			self.$nodes[value ? "addClass" : "removeClass"]("wijmo-wijtree-allexpanded");
			self.$nodes.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				if (nodeWidget !== null) {
					nodeWidget._setHitArea(value);
				}
			});
		},

		/*region methods(private)*/
		_getNodeWidget: function ($node) {
			if ($node.is(this._nodeSelector())) {
				var widget = $node.data($node.data("widgetName"));
				return widget;
			}
			return null;
		},

		_getNodeWidgetByDom: function (el) {
			var node = this._getNodeByDom(el);
			return this._getNodeWidget(node);
		},

		_getNodeByDom: function (el) {//Arg :Dom Element
			return $(el).closest(this._nodeSelector());
		},

		_refreshNodesClass: function () {
			var nodes = this._getField("nodes"), i;
			for (i = 0; i < nodes.length; i++) {
				nodes[i]._initNodeClass();
			}
		},

		_getField: function (key) {
			return this.element.data(key);
		},

		_setField: function (key, value) {
			return this.element.data(key, value);
		}
	});
} (jQuery));

(function ($) {
	$.widget("wijmo.wijtreenode", {
		options: {
			accessKey: "",
			///	<summary>
			///	Checks the node when it set to true; otherwise, it unchecks the node. 
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtreenode("checked",true).
			///	</summary>
			checked: false,
			///	<summary>
			///	Sets the collapsed icon (base on ui-icon) of the node
			/// Type:String.
			/// Default:"".
			/// Code example:
			/// $(".selector").wijtreenode("collapsedIconClass","ui-icon-file").
			///	</summary>
			collapsedIconClass: "",
			///	<summary>
			///	Sets the node to expanded (if true) or collapsed (if false).
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtreenode("expanded",true).
			///	</summary>
			expanded: false,
			///	<summary>
			///	Sets the expanded icon (base on ui-icon) of the node
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("expandedIconClass","iconClass").
			///	</summary>
			expandedIconClass: "",
			///	<summary>
			///	Sets the icon (base on ui-icon) of the node
			/// It will displayed on both expanded and collapsed node 
			/// when expandedIconClass & collapsedIconClass is empty,
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("itemIconClass","iconClass").
			///	</summary>
			itemIconClass: "",
			///	<summary>
			///	Sets the navigate url link of the node
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("navigateUrl","http://google.com).
			///	</summary>
			navigateUrl: "",
			///	<summary>
			///	Selects this node when it set to true,otherwise unselects the node
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtreenode("selected",true).
			///	</summary>
			selected: false,
			///	<summary>
			///	Sets the node's text. 
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("text","Hello World!").
			///	</summary>
			text: "",
			///	<summary>
			///	Sets the node's tooltip.
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("toolTip","Node 1 toolTip").
			///	</summary>
			toolTip: "",
			///	<summary>
			///	Determines whether this nodes has child nodes. 
			/// It's always use for custom add child nodes (like async load).
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtreenode("hasChildren",true).
			///	</summary>
			hasChildren: false,
			///	<summary>
			///	The parameter need to pass when custom load child nodes.
			/// Type:Boolean.
			/// Default:{}.
			/// Code example:$(".selector").wijtreenode("ajaxParams",{}).
			///	</summary>
			params: {},
			///	<summary>
			///	Determines the child nodes of this nodes.
			/// </summary>
			nodes:[]
		},

		/*widget Method*/
		_setOption: function (key, value) {
			var self = this, check, i;

			switch (key) {
				case "accessKey":
					if (self.$navigateUrl !== null) {
						self.$navigateUrl.attr("accesskey", value);
					}
					break;
				case "checked":
					self._checkState = value ? "checked" : "unChecked";
					self._setChecked(value);
					break;
				case "collapsedIconClass":
				case "expandedIconClass":
				case "itemIconClass":
					self.options[key] = value;
					self._initNodeImg();
					break;
				case "expanded":
					self._setExpanded(value);
					break;
				case "selected":
					self._setSelected(value);
					break;
				case "text":
					self._setText(value);
					break;
				case "toolTip":
					self._setToolTip(value);
					break;
				case "navigateUrl":
					self._setNavigateUrlHref(value);
					break;
				case "disabled":
					if (self._isClosestDisabled() && value === true) {
						return;
					}
					check = self.element.find(":wijmo-wijtreecheck");
					if (check.length) {
						check.wijtreecheck("option", "disabled", value);
					}
					break;
				default:
					break;
			}


			if (key === "nodes") {
				self.options.nodes.length = 0;
				$.each(value, function (i, n) {
					self.options.nodes.push(n);
				});
				self.options.nodes.concat();
				self._hasChildren = self._getChildren();
				self._createChildNodes(self.element);
				self._initNodeClass();
			}
			else {
				$.Widget.prototype._setOption.apply(self, arguments);
			}
		},

		_initState: function () {// declare the properity of node
			this._tree = null;
			this._dropTarget = null;
			this._checkState = "unChecked"; //Checked, UnChecked, Indeterminate
			this._value = this._text = this._navigateUrl = "";
			this._insertPosition = "unKnown"; //end,after,before
			this._hasNodes = false; //for ajax load	
		},

		_create: function () {
			var self = this, o = self.options;
			self._initState();
			self._createTreeNode();
			self._initNode();
			self.element.data("widgetName", self.widgetName);

			if(o.selected) {
				self._tree._selectedNodes.push(self);
			}

			if(o.checked) {
				self._checkState = "checked";
				if(self.$checkBox) {
					self.$checkBox.wijtreecheck("option", "checkState", "check");
				}
			}						
		},

		_createTreeNode: function () {
			var $li = this.element, ownerNodes, childOpts,
			self = this, o = self.options, nodes = [];
			this.$navigateUrl = $li.children("a");

			if (self._tree === null) {
				self._tree = self._getTree();
			}

			//apply opitons.nodes from parent.nodes[idx]
			//			if (!isNaN(o.nIndex)) {
			//				ownerOpts = self._getOwner().options,
			//				childOpts = ownerOpts.nodes[o.nIndex];
			//				if (childOpts && !childOpts.nodes) {
			//					childOpts.nodes = [];
			//				}
			//				$.extend(o, childOpts);
			//				//self.options = 
			//			}
			//			else if (!o.nodes) {
			//				o.nodes = [];
			//			}

			//			if (!isNaN(o.nIndex)) {				
			//				ownerNodes = self._getOwner().options.nodes;
			//				childOpts = ownerNodes[o.nIndex];

			//				$.extend(o, childOpts);

			//				ownerNodes[o.nIndex] = o;

			//			}

			if (!isNaN(o.nIndex)) {
				ownerOpts = self._getOwner().options,
				childOpts = ownerOpts.nodes[o.nIndex];
				if (childOpts && !childOpts.nodes) {
					childOpts.nodes = [];
				}
				$.extend(o, childOpts);
				ownerOpts.nodes[o.nIndex] = o;
			}
			else if (!o.nodes) {
				o.nodes = [];
			}

			self.$nodeBody = null;
			self.$checkBox = null;
			self.$hitArea = null;
			self.$nodes = null;

			self.$nodeImage = $("<span>");
			self.$nodeBody = $("<div>").attr({
				role: "treeitem",
				"aria-expanded": false,
				"aria-checked": false,
				"aria-selected": false
			});

			if (self._tree.options.showCheckBoxes === true) {
				self.$checkBox = $("<div>");
			}

			if (self.$navigateUrl.length === 0) {
				self.$navigateUrl = $li.children("div");
				self.$navigateUrl.addClass("wijmo-wijtree-template");
				self._isTemplate = true;
			}

			if (self.$navigateUrl.length === 0) {
				self.$navigateUrl = $("<a>");
				self.$navigateUrl.attr("href", "#");
			}

			//			if(!self.$navigateUrl.attr("accesskey") && self.options.accesskey) {
			//				self.$navigateUrl.attr("accesskey", self.options.accesskey);
			//			}

			if (!self._isTemplate) {
				self.$text = self.$navigateUrl.find("span:eq(0)");
				if (self.$text.length === 0) {
					self.$navigateUrl.wrapInner("<span></span>");
					self.$text = self.$navigateUrl.find("span:eq(0)");
				}
			}

			self._hasChildren = self._getChildren();
			self.$inner = $("<span></span>")
			.addClass("ui-helper-clearfix wijmo-wijtree-inner ui-corner-all");
			self._createChildNodes($li);

			self.$inner.append(self.$nodeImage);
			if (self.$checkBox !== null) {
				self.$inner.append(self.$checkBox);
				self.$checkBox.wijtreecheck();
			}
			self.$inner.append(self.$navigateUrl);
			self.$nodeBody.append(self.$inner);
			$li.prepend(self.$nodeBody);
		},

		_createChildNodes: function ($li) {
			var self = this, nodes = [];
			if (self._hasChildren) {
				$li.addClass("wijmo-wijtree-parent");
				self.$nodeBody
				.addClass("wijmo-wijtree-node wijmo-wijtree-header ui-state-default");
				self.$hitArea = $("<span>");
				self.$inner.prepend(self.$hitArea);
				self.$nodes = $li.find("ul:eq(0)");

				nodes = self._createChildNode();
				self.$nodes.addClass("wijmo-wijtree-list ui-helper-reset wijmo-wijtree-child");
			} else {
				$li.addClass("wijmo-wijtree-item");
				self.$nodeBody.addClass("wijmo-wijtree-node ui-state-default");
			}
			self._setField("nodes", nodes);
		},

		_createChildNode: function () {
			var self = this, o = self.options, nodes = [], opts = {};
			if (o.nodes && o.nodes.length) {
				if (self.$nodes && self.$nodes.length) {
					self.$nodes.empty();
				} else {
					self.$nodes = $("<ul>").appendTo(self.element);
				}

				$.each(o.nodes, function (i, n) {
					var $li = self._generateMarkup(n);
					self.$nodes.append($li);
					$li.data("owner", self);
					opts.nIndex = i;
					opts.treeClass = o.treeClass;
					$li.wijtreenode(opts);
					nodeWidget = self._getNodeWidget($li);
					nodeWidget._index = i;
					nodes.push(nodeWidget);
				});
			} else {
				if (!o.nodes) {
					o.nodes = [];
				}
				self.$nodes.children("li").each(function (i, n) {
					var $li = $(this), nodeWidget;
					$li.data("owner", self);

					opts.cfli = true;
					opts.nIndex = i;
					opts.treeClass = o.treeClass;
					opts.nodes = [];
					$li.wijtreenode(opts);  //the arg must be jquerify
					nodeWidget = self._getNodeWidget($li);
					nodeWidget._index = i;
					nodes.push(nodeWidget);
					//o.nodes.push(nodeWidget.options);
				});
			}
			return nodes;
		},

		_generateMarkup: function (item) {
			var li, a, u = item.navigateUrl;
			if (!$.isPlainObject(item)) {
				return;
			}
			li = $("<li></li>");

			a = $("<a>").attr("src",
			(typeof u === "string" && u) ? u : "#");
			a.appendTo(li);

			if (typeof item.text === "string" && item.text) {
				$("<span>").html(item.text).appendTo(a);
			}
			return li;
		},

		_initNode: function () {//init node(children,class, tree)
			var self = this, o = self.options;
			if (!self._initialized) {
				self._initialized = true;
				self._initNavigateUrl();
				if (!self._isTemplate && self.$text) {
					self._text = self.$text.html();
					o.text = self.$text.html();
				}
				self._hasChildren = self._getChildren();
				self._initNodesUL();
				self._initNodeClass();
				self._initNodeImg();
				self._initCheckBox();
				self.$navigateUrl.one("mousedown", self, self._onMouseDown);
			}
		},

		_initNodeClass: function () {
			var self = this, o = self.options, style,
			hitClass = "ui-icon " +
			(o.expanded ? "ui-icon-triangle-1-se" : "ui-icon-triangle-1-e");
			if (self._tree.options.showExpandCollapse) {
				if (self._hasChildren || !!o.hasChildren) {
					if (self.$hitArea !== null) {
						self.$hitArea
						.removeClass('ui-icon ui-icon-triangle-1-se ui-icon-triangle-1-e')
						.addClass(hitClass);
					}
					else {
						self.$hitArea = $("<span>")
						.addClass(hitClass).prependTo(self.$inner);
						self.element
						.removeClass("wijmo-wijtree-node ui-state-default ui-corner-all")
						.addClass("wijmo-wijtree-parent");
					}
					if (self._hasChildren) {
						//self.$nodes[o.expanded ? "show" : "hide"]();
						// the performance "display:none" is must better then show, 
						// hide, fixed bug on adding lots of child nodes.
						style = o.expanded ? "" : "none";
						self.$nodes.css({ display: style });
					}
				}
				else if (self.$hitArea) {
					self.$hitArea.remove();
					self.$hitArea = null;
					self.element
					.removeClass("wijmo-wijtree-parent")
					.addClass("wijmo-wijtree-node ui-state-default ui-corner-all");
				}
			}

			if (o.selected && self.$inner) {
				self.$inner.addClass("ui-state-active");
			}
		},

		_initCheckBox: function () {
			var self = this, o = self.options;
			if (self.$checkBox && o.checkState) {
				switch (o.checkState) {
					case "checked":
						self.$checkBox.wijtreecheck("option", "checkState", "check");
						break;
					case "indeterminate":
						self.$checkBox.wijtreecheck("option", "checkState", "triState");
						break;
					case "unChecked":
						self.$checkBox.wijtreecheck("option", "checkState", "unCheck");
						break;
					default:
						self.$checkBox.wijtreecheck("option", "checkState", "unCheck");
						break;
				}
			}
		},

		_initNodesUL: function () {
			var self = this;
			if (self._tree.options.showExpandCollapse) {
				if (self._hasChildren) {
					self.$nodes[self._expanded ? 'show' : 'hide']();
				}
			}
		},

		_initNavigateUrl: function () {
			var self = this, href = self.$navigateUrl.attr("href");
			self.$navigateUrl.bind("blur." + self.widgetName, self, self._onBlur);

			if (!this._isTemplate) {
				self._navigateUrl = !!href ? href : "";
				self._setNavigateUrlHref(href);
			}
		},

		_applyIconClass: function (el, o) {
			if (el.attr("expandediconclass")) {
				o.expandedIconClass = el.attr("expandediconclass");
				el.removeAttr("expandediconclass");
			}
			if (el.attr("collapsediconclass")) {
				o.collapsedIconClass = el.attr("collapsediconclass");
				el.removeAttr("collapsediconclass");
			}
			if (el.attr("itemiconclass")) {
				o.itemIconClass = el.attr("itemiconclass");
				el.removeAttr("itemiconclass");
			}
		},

		_initNodeImg: function () {//ui-icon instead of image
			var self = this, o = self.options, el = self.element;
			if (self.$nodeImage === null || !self.$nodeImage.length) {
				self.$nodeImage = $("<span>");
			}

			/* initial html has icon attribute for asp.net mvc*/
			self._applyIconClass(el, o);
			/* end */

			if (o.collapsedIconClass !== "" &&
				o.expandedIconClass !== "") {
				self.$nodeImage.removeClass().addClass("ui-icon")
				.addClass(o.expanded ? o.expandedIconClass : o.collapsedIconClass);
				if (!self._tree.options.showExpandCollapse) {
					self.$nodeImage.addClass(o.expandedIconClass);
				}
				self.$nodeImage.insertBefore(self.$checkBox);
			}
			else if (o.itemIconClass !== "") {
				self.$nodeImage.removeClass().addClass("ui-icon");
				self.$nodeImage.addClass(o.itemIconClass);
				self.$nodeImage.insertBefore(self.$checkBox);
			}
		},

		_setNavigateUrlHref: function (href) {
			if (this.$navigateUrl) {
				if (href === "" || typeof href === "undefined") {
					href = "#";
				}
				this.$navigateUrl.attr("href", href);
			}
		},

		_editNode: function () {//edit node
			this._tree._editMode = true;
			this.$navigateUrl.hide();
			if (!this.$editArea) {
				this.$editArea = $("<input type=\"text\">").wijtextbox();
			}
			this.$editArea.val(this.$text.html());
			this.$editArea.insertBefore(this.$navigateUrl);
			this.$editArea.bind("blur", this, this._editionComplete);
			this.$editArea.focus();
		},

		_editionComplete: function (event) {
			var self = event.data, text;
			self._tree._editMode = false;
			if (self.$editArea) {
				text = self.$editArea.val();
				self.$editArea.remove();
			}
			self.$navigateUrl.show();
			self.$editArea = null;
			self._changeText(text);
		},

		_changeText: function (text) {
			var self = this, o = self.options;
			if (self.$text !== null && text !== "") {
				self.$text.text(text);
				o.text = text;
				self._tree._trigger("nodeTextChanged", null, self);
			}
		},

		/*behavior Methods*/
		_expandCollapseItem: function () {//access
			var self = this, o = self.options;
			if (!self._tree.options.disabled && !self._isClosestDisabled()) {
				if (self._hasChildren || o.hasChildren) {
					self._setExpanded(!o.expanded);
				}
			}
		},

		_expandNode: function (expand) {
			var self = this, treeOption = self._tree.options,
			trigger = expand ? "nodeExpanding" : "nodeCollapsing";

			if (self._tree._trigger(trigger, null, {
				node: this,
				params: this.options.params
			}) === false) {
				return;
			}

			self.$nodeBody.attr("aria-expanded", expand);
			self._expanded = expand;
			self.options.expanded = expand;

			if (!treeOption.disabled && !self._isClosestDisabled()) {
				if (expand) {
					if (treeOption.expandDelay > 0) {
						if (typeof self._expandTimer !== "undefined") {
							self._expandTimer = window.clearTimeout(self._expandTimer);
						}
						self._expandTimer = window.setTimeout(function () {
							self._expandNodeVisually();
						}, treeOption.expandDelay);
					}
					else {
						self._expandNodeVisually();
					}
				}
				else {
					if (treeOption.collapseDelay > 0) {
						self._collapseTimer = window.clearTimeout(self._collapseTimer);
						self._collapseTimer = window.setTimeout(function () {
							self._collapseNodeVisually();
						}, treeOption.collapseDelay);
					}
					else {
						self._collapseNodeVisually();
					}
				}
			}

		},

		_expandNodeVisually: function () {
			var self = this, nodes, o = self.options;
			if (self._tree.options.autoCollapse) {//autoCollapse
				nodes = self.element.siblings(":" + this.widgetBaseClass);
				$.each(nodes, function (i) {
					var widget = self._getNodeWidget(nodes[i]);
					if (widget.options.expanded) {
						widget._setExpanded(false);
					}
				});
			}
			if (o.collapsedIconClass !== "" && o.expandedIconClass !== "") {
				self.$nodeImage.removeClass(o.collapsedIconClass)
				.addClass(o.expandedIconClass);
			}
			self._internalSetNodeClass(true);
			self._show();
		},

		_collapseNodeVisually: function () {
			var self = this;
			if (self.options.collapsedIconClass !== "" &&
			self.options.expandedIconClass !== "") {
				self.$nodeImage.removeClass(self.options.expandedIconClass)
				.addClass(self.options.collapsedIconClass);
			}
			self._internalSetNodeClass(false);
			self._hide();
		},

		_internalSetNodeClass: function (expanded) {
			this.$hitArea
			.removeClass('ui-icon ui-icon-triangle-1-se ui-icon-triangle-1-e')
			.addClass("ui-icon " +
			(expanded ? "ui-icon-triangle-1-se" : "ui-icon-triangle-1-e"));
		},

		_show: function () {
			this._animation(true);
		},

		_hide: function () {
			this._animation(false);
		},

		_animation: function (show) {
			var self = this, el = self.$nodes,
			animate = show ? "expandAnimation" : "collapseAnimation",
			event = show ? "nodeExpanded" : "nodeCollapsed", effect,
			animation = self._tree.options[animate];
			if (el) {
				if (animation) {
					effect = animation.animated || animation.effect;
					if ($.effects && !!effect) {
						el[show ? "show" : "hide"](effect,
								{ easing: animation.easing },
								animation.duration,
								function () {
									self._tree._trigger(event, null, self);
								});
					} else {
						el[show ? "show" : "hide"](animation.duration,
								function () {
									self._tree._trigger(event, null, self);
								});
					}
				}
				else {
					el[show ? "show" : "hide"]();
					self._tree._trigger(event, null, self);
				}
			}
		},

		_getBounds: function ($el) {//get top,left,height,width of element
			var h = $el.height(), w = $el.width(),
			t = $el.offset().top, l = $el.offset().left;
			return { h: h, w: w, t: t, l: l };
		},

		_isMouseInsideRect: function (p, b) {//whether mouse is over a element
			if (p.x < b.l || p.x >= b.l + b.w) {
				return false;
			}
			if (p.y <= b.t + 1 || p.y >= b.t + b.h) {
				/*fix 1px on the mouse out the element 
				(e.g. 31<30.98 now 31<30.98+1 maybe 
				pageY/PageX are int but left/top are float)*/
				return false;
			}
			return true;
		},

		_getNodeByMouseOn: function (p) {
			$("li").each(function () {
				var b = this._getBounds($(this));
				if ($.ui.isOver(p.y, p.x, b.t, b.l, b.h, b.w)) {
					return $(this);
				}
			});
			return null;
		},

		_drowTemplate: function (p, temp, targetEl) {
			var position = "unKnown",
			body = targetEl.is(".wijmo-wijtree-node") ?
			targetEl :
			targetEl.children(".wijmo-wijtree-node"),
			n = this._getBounds(body);
			temp.width(body.width());

			if (p.y > n.t && p.y < n.t + n.h / 2) {
				temp.offset({ left: n.l, top: n.t });
				position = "before";
			}
			else if (p.y > n.t + n.h / 2 && p.y < n.t + n.h) {
				temp.offset({ left: n.l, top: n.t + n.h });
				position = "after";
			}
			return position;
		},

		_beginDrag: function (e) {   //set draggable
			var self = this, $item = self.element, dragVisual,
			to = self._tree.options, draggable = to.draggable, options = {
				cursor: "point",
				cursorAt: { top: 15, left: -25 },
				helper: function () {
					return $("<div>" + self.$navigateUrl.html() + "</div>")
					.addClass("ui-widget-header ui-corner-all");
				},
				distance: $.browser.msie ? 1 : 10,
				handle: self.$navigateUrl,
				scope: "tree"
			}, temp = $("<div>").addClass("wijmo-wijtree-insertion ui-state-default");

			if (typeof to.dropVisual === "string") {
				dragVisual = $(to.dropVisual);
				temp = dragVisual.length ? dragVisual : temp;
			}
			else if ($.isFunction(to.dropVisual)) {
				dragVisual = $(to.dropVisual.call());
				temp = dragVisual.length ? dragVisual : temp;
			}

			temp.hide();

			$.extend(options, draggable);
			options.start = function (event, ui) {
				self._tree._isDragging = true;
				self._tree.widgetDom.prepend(temp);
				self._tree._trigger("nodeDragStarted", event, self);
				if (draggable && $.isFunction(draggable.start)) {
					draggable.start.call(self.element, event, ui);
				}
				else {
					$item.hide();
				}
			};

			options.drag = function (event, ui) {
				var t = event.srcElement || event.originalEvent.target,
				targetEl = $(t), dropNode, p = { x: event.pageX, y: event.pageY };
				if (temp) {
					temp.hide();
				}
				if (targetEl) {
					dropNode = self._getNodeWidget(targetEl);
					if (dropNode && !dropNode._tree.options.disabled) {
						if (targetEl.closest(".wijmo-wijtree-inner", self.element)
						.length) {
							self._insertPosition = "end"; //end,after,before
						}
						else {
							temp.show();
							self._insertPosition =
							self._drowTemplate(p, temp, dropNode.element);
						}
						self._dropTarget = dropNode;
					}
				}
				self._tree._trigger("nodeDragging", event, self);
				if (draggable && $.isFunction(draggable.drag)) {
					draggable.drag.call(self.element, event, ui);
				}
			};

			options.stop = function (event, ui) {
				temp.remove();
				self._dropTarget = null;
				self._insertPosition = "unKnown";
				if (draggable && $.isFunction(draggable.stop)) {
					draggable.stop.call(self.element, event, ui);
				}
				else {
					$item.show();
					self._resetDrag();
				}
			};

			$item.draggable(options).trigger(e);
			if ($.browser.mozilla) {
				self._setFocused(true);
			}
		},

		_resetDrag: function () {
			var self = this, nodes, i;
			if (!self._tree.options.allowDrag && self.element.data("draggable")) {
				self.element.draggable("destroy");
			}
			nodes = self._getField("nodes");
			for (i = 0; i < nodes.length; i++) {
				nodes[i]._resetDrag();
			}
		},

		_checkClick: function () {//check , uncheck, indeterminate
			var self = this, o = self.options;
			if (!self._tree.options.disabled && !self._isClosestDisabled()) {
				if (o.checked && self._checkState === "indeterminate") {
					self._checkState = "checked";
					self._checkItem();
				}
				else {
					self._checkState = o.checked ? "unChecked" : "checked";
					self._setChecked(!o.checked);
				}
				self._tree._trigger("nodeCheckChanged", null, self);
			}
		},

		_checkItem: function () {//access
			var self = this, autoCheck = false, tree = self._tree;
			if (tree === null || !tree.options.showCheckBoxes) {
				return;
			}
			if (tree.options.autoCheckNodes &&
			self._checkState !== "indeterminate") {
				autoCheck = true;
				self._changeCheckState(self.options.checked);
			}
			if (tree.options.allowTriState) {
				self._setParentCheckState();
			}
			self[self.options.checked ?
			"_checkNode" : "_unCheckNode"](autoCheck);
		},

		_checkNode: function (autoCheck) {
			//todo: add to tree._checkedNodes
			var self = this, o = self.options, nodes = this._getField("nodes"), i;
			if (self._checkState === "checked") {
				self.$checkBox.wijtreecheck("option", "checkState", "check");
				o.checkState = "checked";
			}
			else if (self._checkState === "indeterminate") {//todo: tristate Style
				self.$checkBox.wijtreecheck("option", "checkState", "triState");
				o.checkState = "indeterminate";
			}

			if (autoCheck) {
				for (i = 0; i < nodes.length; i++) {
					nodes[i]._checkNode(true);
				}
			}
		},

		_unCheckNode: function (autoCheck) {
			//todo: remove to tree._checkedNodes
			var nodes = this._getField("nodes"), o = this.options, i;
			this.$checkBox.wijtreecheck("option", "checkState", "unCheck");
			o.checkState = "unChecked";
			if (autoCheck) {
				for (i = 0; i < nodes.length; i++) {
					nodes[i]._unCheckNode(true);
				}
			}
		},

		_changeCheckState: function (checked) {
			var nodes = this._getField("nodes");
			$.each(nodes, function (i, node) {
				node.options.checked = checked;
				node.$nodeBody.attr("aria-checked", checked);
				node._checkState = checked ? "checked" : "unChecked";
				node._changeCheckState(checked);
			});
		},

		_setParentCheckState: function () {//set parent check state

			var owner = this._getOwner(), nodes, allChecked = true,
			hasChildrenChecked = false, triState = false, i, self = this;
			if (owner.element.is(":" + self.options.treeClass)) {
				return;
			}
			nodes = owner._getField("nodes");
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i]._checkState === "indeterminate") {
					triState = true;
				}
				if (nodes[i].options.checked) {
					hasChildrenChecked = true;
				}
				else {
					allChecked = false;
				}
				if (!allChecked && hasChildrenChecked) {
					break;
				}
			}
			if (triState) {
				owner._checkState = "indeterminate";
				owner._setChecked(true);
			}
			else {
				if (hasChildrenChecked) {
					if (allChecked) {
						owner._checkState = "checked";
						owner._checkNode(false);
					}
					else {
						owner._checkState = "indeterminate";
					}
					owner._setChecked(true);
				}
				else {
					owner._checkState = "unChecked";
					owner._setChecked(false);
					owner._unCheckNode(false);
				}
			}
			owner._setParentCheckState();
		},

		/*Events*/
		_onKeyDown: function (event) {
			var el = $(event.target), self = this;
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0) {
				self._keyAction(event);
			}
		},

		_onClick: function (event) {
			var el = $(event.target), self = this;
			if (el.closest(".wijmo-checkbox", self.element).length > 0) {
				self._checkClick(event);
				event.preventDefault();
				event.stopPropagation();
			}
			else if (self.$hitArea && self.$hitArea[0] === el[0]) {
				self._expandCollapseItem(event);
				event.preventDefault();
				event.stopPropagation();
			}
			else if (el.closest(".wijmo-wijtree-inner", self.element).length > 0) {
				self._click(event);
			}
		},

		_onMouseDown: function (event) {
			var el = $(event.target), node = event.data;
			if (!node._tree.options.disabled && node._tree.options.allowDrag) {//prepare for drag
				if (el.closest(".wijmo-wijtree-node", node.element).length > 0) {
					node._beginDrag(event);
				}
			}
		},

		_onMouseOver: function (event) {
			var el = $(event.target), self = this, rel = $(event.relatedTarget);
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0 &&
			(this._tree._overNode !== self || rel.is(':' + this.widgetBaseClass))) {
				self._mouseOver(event);
				this._tree._overNode = self;
			}
			self._mouseOverHitArea(event);
		},

		_onMouseOut: function (event) {
			var el = $(event.target), self = this,
			rel = $(event.relatedTarget), node = this._getNodeWidget(rel);
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0 &&
			(this._tree._overNode !== node || rel.is(':' + this.widgetBaseClass))) {
				self._mouseOut(event);
				if (!node) {
					this._tree._overNode = null;
				}
			}
			self._mouseOutHitArea(event);
		},

		_onFocus: function (event) {
			var el = $(event.target), self = this;
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0 &&
			!self._tree.options.disabled && !self._isClosestDisabled() &&
			!(el.hasClass("ui-icon-triangle-1-se") ||
			el.hasClass("ui-icon-triangle-1-e")) &&
			!el.closest(".wijmo-checkbox", self.element).length) {
				if (self._tree._focusNode) {
					self._tree._focusNode.$navigateUrl.blur();
				}
				self._focused = true;
				self._tree._focusNode = this;
				self.$inner.addClass("ui-state-focus");
			}
		},

		_onBlur: function (event) {
			var el = $(event.target), self = event.data;
			if (!self._tree.options.disabled && !self._isClosestDisabled()) {
				self._focused = false;
				if (el.closest(".wijmo-wijtree-inner", self.element).length > 0) {
					self.$inner.removeClass("ui-state-focus");
				}
				self._tree._trigger("nodeBlur", event, self);
			}
		},

		_click: function (event) {
			var self = this, o = self.options, tree = self._tree,
			url = self._navigateUrl;
			if (!tree.options.disabled && !self._isClosestDisabled()) {
				if (!/^[#,\s]*$/.test(url)) {
					if($.browser.msie && /^7\.[\d]*/.test($.browser.version)) {
						if(url.indexOf(window.location.href) < 0) {
							return;
						}
					}
					else {
						return;
					}
				}
				self._isClick = true;
				tree._ctrlKey = event.ctrlKey;
				if (o.selected && tree._ctrlKey) {
					self._setSelected(false);
				}
				else if (o.selected &&
				!self._tree._editMode &&
				tree.options.allowEdit &&
				!self._isTemplate) {
					self._editNode();
				}
				else {
					self._setSelected(!o.selected);
				}
				if (!self._isTemplate) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
			else {
				self._setNavigateUrlHref("");
			}
		},

		_selectNode: function (select, event) {
			var self = this, ctrlKey, idx;
			if (!self._tree.options.disabled &&
			!self._isClosestDisabled() && !self._tree._isDragging) {
				ctrlKey = self._tree._ctrlKey;
				if (ctrlKey) {
					idx = $.inArray(self, self._tree._selectedNodes);
					if (idx !== -1 && !select) {
						self._tree._selectedNodes.splice(idx, 1);
						self.$inner.removeClass("ui-state-active");
					}
				}
				else {
					$.each(self._tree._selectedNodes, function (i, n) {
						n.$inner.removeClass("ui-state-active");
						n.options.selected = false;
						n.$nodeBody.attr("aria-selected", false);
					});
					self._tree._selectedNodes = [];
				}
				if (select) {
					idx = $.inArray(self, self._tree._selectedNodes);
					if (idx === -1) {
						this._tree._selectedNodes.push(self);
					}
					self.$inner.addClass("ui-state-active");
				}
				else {
					self.$inner.removeClass("ui-state-active");
				}
				if (self._isClick) {
					self._tree._trigger("nodeClick", event, self);
				}
				self._isClick = false;
				self._tree._ctrlKey = false;
				self._tree._trigger("selectedNodeChanged", event, self);
			}
		},

		_keyAction: function (e) {
			var el = e.target, self = this;
			if (self._tree.options.disabled || self._isClosestDisabled()) {
				return;
			}
			if (el) {
				if (self._tree._editMode && e.keyCode !== $.ui.keyCode.ENTER) {
					return;
				}
				switch (e.keyCode) {
					case $.ui.keyCode.UP:
						self._moveUp();
						break;
					case $.ui.keyCode.DOWN:
						self._moveDown();
						break;
					case $.ui.keyCode.RIGHT:
						if (self._tree.options.showExpandCollapse) {
							self._moveRight();
						}
						break;
					case $.ui.keyCode.LEFT:
						if (self._tree.options.showExpandCollapse) {
							self._moveLeft();
						}
						break;
					case 83: //key s
						if (!self._tree._editMode && self._tree.options.allowSorting) {
							self.sortNodes();
						}
						break;
					case 113: //key f2
						if (self._tree.options.allowEdit) {
							self._editNode();
						}
						break;
					case 109: //key -
						if (self._tree.options.showExpandCollapse && this._expanded) {
							self._setExpanded(false);
						}
						break;
					case 107: //key +
						if (self._tree.options.showExpandCollapse && !this._expanded) {
							self._setExpanded(true);
						}
						break;
					case $.ui.keyCode.ENTER:
						if (self._tree._editMode) {
							e.data = self;
							self._editionComplete(e);
						}

						break;
					case $.ui.keyCode.SPACE: //check
						if (self._tree.options.showCheckBoxes) {
							self._checkState = self.options.checked ? "unChecked" : "checked";
							self._setChecked(!self.options.checked);
						}
						break;
				}
				self._customKeyDown(e.keyCode);
				if (!self._isTemplate && e.keyCode !== $.ui.keyCode.ENTER) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		},

		_customKeyDown: function (keyCode) { },

		_prevNode: function (node) {
			if (node.element.prev().length > 0) {
				return node.element.prev().data(this.widgetName);
			}
		},

		_nextNode: function (node) {
			if (node.element.next().length > 0) {
				return node.element.next().data(this.widgetName);
			}
		},

		_getNextExpandedNode: function (node) {
			var nextNode = node, nextNodes = node._getField("nodes"), newNode;
			if (node._expanded && nextNodes.length > 0) {
				newNode = nextNodes[nextNodes.length - 1];
				if (newNode !== null) {
					nextNode = this._getNextExpandedNode(newNode);
				}
			}
			return nextNode;
		},

		_getNextNode: function (owner) {
			var nextNode = null, self = this;
			if (owner.element.is(":" + self.options.treeClass)) {
				return null;
			}
			nextNode = self._nextNode(owner);
			if (nextNode) {
				return nextNode;
			}
			return self._getNextNode(owner._getOwner());
		},

		_moveUp: function () {
			var level = this._getCurrentLevel(), prevNode = this._prevNode(this);
			if (!prevNode) {
				if (level > 0) {
					this._getOwner()._setFocused(true);
				}
			}
			else {
				this._getNextExpandedNode(prevNode)._setFocused(true);
			}
		},

		_moveDown: function () {//sometimes blur
			var nodes = this._getField("nodes"), nextNode, owner, pNextNode;
			if (this._expanded && nodes.length > 0) {
				nodes[0]._setFocused(true);
			}
			else {
				nextNode = this._nextNode(this);
				if (nextNode) {
					nextNode._setFocused(true);
				}
				else {
					owner = this._getOwner();
					pNextNode = this._getNextNode(owner);
					if (pNextNode) {
						pNextNode._setFocused(true);
					}
				}
			}
		},

		_moveLeft: function () {
			var nextNode = this._getOwner();
			if (this._expanded) {
				this._setExpanded(false);
			}
			else if (nextNode !== null &&
			!nextNode.element.is(":" + this.options.treeClass)) {
				nextNode._setFocused(true);
			}
		},

		_moveRight: function () {
			if (this._hasChildren) {
				if (!this._expanded) {
					this._setExpanded(true);
				}
				else {
					var nextNode = this._getField("nodes")[0];
					if (nextNode !== null) {
						nextNode._setFocused(true);
					}
				}
			}
		},

		_mouseOver: function (event) {
			var self = this, tree = self._tree;
			if (!tree.options.disabled &&
			!self._isClosestDisabled() && !tree._editMode) {
				self._mouseOverNode();
				if (!tree._isDragging) {
					tree._trigger("nodeMouseOver", event, self);
				}
			}
		},

		_mouseOut: function (event) {
			var self = this, tree = self._tree;
			if (!tree.options.disabled &&
			 !self._isClosestDisabled() && !tree._editMode) {
				self._mouseOutNode();
				if (!tree._isDragging) {
					tree._trigger("nodeMouseOut", event, self);
				}
			}
		},

		_mouseOverNode: function () {
			if (this.$inner !== null && !this._isOverNode) {
				this.$inner.addClass("ui-state-hover");
				this._isOverNode = true;
			}
		},

		_mouseOutNode: function () {
			if (this.$inner !== null && this._isOverNode) {
				this.$inner.removeClass("ui-state-hover");
				this._isOverNode = false;
			}
		},

		_mouseOverHitArea: function (event) {
			var bound, p, self = this, tree = self._tree;
			if (!tree.options.disabled && !self._isClosestDisabled()) {
				if (tree.options.expandCollapseHoverUsed) {
					if (self._hasChildren && !self._isOverHitArea) {
						bound = self._getBounds(self.element);
						p = { x: event.pageX, y: event.pageY };
						if (self._isMouseInsideRect(p, bound)) {
							self._isOverHitArea = true;
							self._setExpanded(true);
						}
					}
				}
			}
		},

		_mouseOutHitArea: function (event) {
			var p = { x: event.pageX, y: event.pageY }, bound,
			self = this, tree = self._tree;
			if (!tree.options.disabled && !self._isClosestDisabled()) {
				if (tree.options.expandCollapseHoverUsed) {
					if (self._hasChildren && !!self._isOverHitArea) {
						bound = self._getBounds(self.element);
						if (!self._isMouseInsideRect(p, bound)) {
							self._isOverHitArea = false;
							self._setExpanded(false);
						}
					}
					else if (self._getOwner().element.is(":" + self.widgetBaseClass)) {
						bound = self._getBounds(self._getOwner().element);
						if (!self._isMouseInsideRect(p, bound)) {
							self._getOwner()._isOverHitArea = false;
							self._getOwner()._setExpanded(false);
						}
					}
				}
			}
		},

		/*public methods*/
		destroy: function () {
			/// <summary>
			/// Destroy the node widget
			/// </summary>
			var self = this, $nodes;
			if (self.element.data("draggable")) {
				self.element.draggable("destroy");
			}
			if (self.$hitArea) {
				self.$hitArea.remove();
			}
			if (self.$checkBox) {
				self.$checkBox.remove();
			}
			if (self.$nodeImage) {
				self.$nodeImage.remove();
			}
			self.$navigateUrl.unwrap().unwrap()
			.removeClass("ui-state-default ui-state-active")
			.unbind("mousedown")
			.unbind("blur");
			$nodes = this.element.find("ul:first").show();
			$nodes.removeClass();

			$nodes.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				nodeWidget.destroy();
			});

			self.element.removeData("nodes")
			.removeData("owner")
			.removeData("widgetName")
			.removeClass();

			$.Widget.prototype.destroy.apply(this);
		},

		add: function (node, position) {
			/// <summary>
			/// Adds a child node to the node.
			/// </summary>
			/// <param name="node" type="String,Object">
			/// which node to be added
			/// 1.markup html.such as "<li><a>node</a></li>" as a node.
			/// 2.wijtreenode widget.
			/// 3.object options according to the options of wijtreenode.
			/// </param>
			/// <param name="position" type="Int">
			/// the position to insert at
			/// </param>
			var nodeWidget = null, $node, nodes, self = this, cnodes, i,
			itemDom = "<li><a href='{0}'>{1}</a></li>", originalLength;
			if (typeof node === "string") {
				$node = $(itemDom.replace(/\{0\}/, "#")
				.replace(/\{1\}/, node));
				self._createNodeWidget($node);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if (node.jquery) {
				if (!node.data("widgetName")) {
					self._createNodeWidget(node);
				}
				nodeWidget = node.data(node.data("widgetName"));
			}
			else if (node.nodeType) {
				$node = $(node);
				self._createNodeWidget($node);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if ($.isPlainObject(node)) {
				$node = $(itemDom.replace(/\{0\}/, node.url ? node.url : "#")
				.replace(/\{1\}/, node.text)); //node
				self._createNodeWidget($node, node);
				nodeWidget = $node.data($node.data("widgetName"));
			}

			if (nodeWidget === null) {
				return;
			}
			nodes = self._getField("nodes");
			if (!position || position > nodes.length) {
				if (position !== 0) {
					position = nodes.length;
				}
			}

			cnodes = nodeWidget._getField("nodes");
			nodeWidget._tree = self._tree;
			for (i = 0; i < cnodes.length; i++) {
				cnodes[i]._tree = self._tree;
			}

			nodeWidget._setField("owner", self);
			originalLength = nodes.length;
			if (!self.$nodes) {
				self.$nodes = $("<ul></ul>")
				.addClass("wijmo-wijtree-list ui-helper-reset wijmo-wijtree-child");
				self.element.append(self.$nodes);
			}
			if (originalLength > 0 && originalLength !== position) {
				if (nodeWidget.element.get(0) !== nodes[position].element.get(0)) {
					nodeWidget.element.insertBefore(nodes[position].element);
				}
			}
			else {
				self.$nodes.append(nodeWidget.element);
			}
			self._changeCollection(position, nodeWidget);
			self._collectionChanged("add");
			nodeWidget._initNodeClass();

		},

		remove: function (node) {
			/// <summary>
			/// Removes a child node from this node.
			/// </summary>
			/// <param name="node" type="String,Object">
			/// which node to be removed
			/// 1.wijtreenode widget.
			/// 2.the index of which node you determined to remove.
			/// </param>
			var idx = -1, nodeWidget, self = this,
			nodes = this._getField("nodes");
			if (node.jquery) {
				idx = node.index();
			}
			else if (typeof node === "number") {
				idx = node;
			}
			if (idx < 0 || idx >= nodes.length) {
				return;
			}
			nodeWidget = nodes[idx];
			nodeWidget.element.detach();
			self._changeCollection(idx);
			self._collectionChanged("remove");

		},

		getNodes: function () {
			/// <summary>
			///  Gets a array that contains the root nodes of the current tree node.
			/// </summary>
			/// <returns type="array" />
			return this._getField("nodes");
		},

		_changeCollection: function (idx, nodeWidget) {
			var nodes = this._getField("nodes"),
			ons = this.options.nodes;
			if (nodeWidget) {
				nodes.splice(idx, 0, nodeWidget);
				ons.splice(idx, 0, nodeWidget.options);
			}
			else {
				nodes.splice(idx, 1);
				ons.splice(idx, 1);
			}
		},

		sortNodes: function () {
			/// <summary>
			/// Sorts the child nodes of the node.
			/// </summary>
			var nodes = this._getField("nodes");
			this._sort();
			$.each(nodes, function (i, childNode) {
				childNode._index = i;
				childNode._insertBefore(i);
			});
			this._refreshNodesClass();
		},

		check: function (value) {
			/// <summary>
			/// Checks or unchecks the node.
			/// </summary>
			/// <param name="value" type="Boolean">
			/// check or uncheck the node.
			/// </param>
			this._setOption("checked", value);
		},

		select: function (value) {
			/// <summary>
			/// Selects or unselects the node.
			/// </summary>
			/// <param name="value" type="Boolean">
			/// select or unselect the node.
			/// </param>
			this._setOption("selected", value);
		},

		getOwner: function () {
			/// <summary>
			/// Get owner which contains the node.
			/// </summary>
			var owner = this._getOwner();
			if (owner && owner.element.is("li")) {
				return owner;
			}
			return null;
		},

		expand: function () {
			/// <summary>
			/// Expands the node
			/// </summary>
			this._setOption("expanded", true);
		},

		collapse: function () {
			/// <summary>
			/// Collapses the node
			/// </summary>
			this._setOption("expanded", false);
		},

		/*region prvite Methods*/
		_insertBefore: function (i) {
			var $lis = this.element.parent().children("li");
			if (this.element.index() !== i) {
				this.element.insertBefore($lis.eq(i));
			}
		},

		_sort: function () {
			var nodes = this._getField("nodes");
			if (this._isSorted) {
				if (!this._isDecsSort) {
					nodes.sort(this._compare2NodeTextAcs);
					this._isDecsSort = true;
				}
				else {
					nodes.sort(this._compare2NodeTextDesc);
					this._isDecsSort = false;
				}
			}
			else {
				nodes.sort(this._compare2NodeTextAcs);
				this._isSorted = true;
				this._isDecsSort = true;
			}
		},

		_compare2NodeTextAcs: function (a, b) {
			if (a !== null && b !== null) {
				return a._text.localeCompare(b._text);
			}
		},

		_compare2NodeTextDesc: function (a, b) {
			if (a !== null && b !== null) {
				return -1 * a._text.localeCompare(b._text);
			}
		},

		_collectionChanged: function () {
			this._hasChildren = this._getChildren();
			this._initNodeClass();
			//this._refreshNodesClass();
		},

		_refreshNodesClass: function () {
			var nodes = this._getField("nodes"), i;
			for (i = 0; i < nodes.length; i++) {
				nodes[i]._initNodeClass();
			}
		},

		_setChecked: function (value) {
			var self = this;
			if (self.options.checked === value &&
			self._checkState !== "indeterminate") {
				return;
			}
			self.options.checked = value;
			self.$nodeBody.attr("aria-checked", value);
			this._checkItem();
		},

		_isClosestDisabled: function () {
			var self = this;
			if (self.element.closest(".wijmo-wijtree-disabled," +
			".wijmo-wijtreenode-disabled", self._tree.element).length) {
				return true;
			}
			return false;
		},

		_setExpanded: function (value) {
			var self = this, o = self.options;
			if (self._expanded === value) {
				return;
			}
			if (self._hasChildren || o.hasChildren) {
				self._expandNode(value);
			}
			//			else if () {
			//				//self._tree.getChildNodes(this);
			//			}
		},

		_setFocused: function (value) {
			if (value) {
				this.$navigateUrl.focus();
				//if ($.browser.msie || $.browser.webkit) {
				this._setFocusNode();
				//}
			}
			else {
				this.$navigateUrl.blur();
			}
		},

		_setFocusNode: function () {
			if (this._tree._focusNode && $.browser.webkit) {
				this._tree._focusNode.$navigateUrl.blur();
			}
			this._focused = true;
			this._tree._focusNode = this;
			this.$inner.addClass("ui-state-focus");
		},

		_setToolTip: function (value) {
			if (value.length) {
				this.element.attr("title", value);
			}
			else {
				this.element.removeAttr("title");
			}
		},

		_setText: function (value) {
			if (this._text !== value && value.length) {
				this._text = value;
				this._changeText(value);
			}
		},

		_setSelected: function (value) {
			var self = this, o = self.options;
			if (o.selected !== value) {
				o.selected = value;
				self.$nodeBody.attr("aria-selected", value);
				self._selectNode(value);
				self._setFocused(value);
			}
		},

		_setCheckBoxes: function (value) {
			var self = this;
			if (self.$checkBox) {
				self.$checkBox[value ? 'show' : 'hide']();
			}
			else if (value) {
				self.$checkBox = $("<div>");
				self.$checkBox.insertBefore(self.$navigateUrl);
				self.$checkBox.wijtreecheck();
			}

			if (self.$nodes) {
				self.$nodes.children("li").each(function () {
					var nodeWidget = self._getNodeWidget($(this));
					if (nodeWidget !== null) {
						nodeWidget._setCheckBoxes(value);
					}
				});
			}
		},

		_setHitArea: function (value) {
			var self = this;
			if (self._hasChildren)//todo: initnode class
			{
				if (value) {
					self._initNodeClass();
					if (self.$hitArea) {
						self.$hitArea.show();
					}
				}
				else {
					self._expanded = true;
					self.options.expanded = true;
					self.$nodeBody.attr("aria-expanded", true);
					if (self.$nodes) {
						self.$nodes.show();
					}
					self._initNodeClass();
					if (self.$hitArea) {
						self.$hitArea.hide();
					}
				}
			}
			if (self.$nodes) {
				self.$nodes.children("li").each(function () {
					var nodeWidget = self._getNodeWidget($(this));
					if (nodeWidget !== null) {
						nodeWidget._setHitArea(value);
					}
				});
			}
		},

		_getOwner: function () {
			return this._getField("owner");
		},

		_getTree: function () {
			var owner = this._getOwner();
			if (owner) {
				if (owner.element.is(":" + this.options.treeClass)) {
					return owner;
				}
				else {
					return owner._getTree();
				}
			}
			return null;
		},

		_getInitElement: function () {
			var li = $("<li>"), self = this, ul = $("<ul>"),
			nodes = self._getField("nodes");
			li.append(self.$navigateUrl.clone());
			if (nodes.length) {
				li.append(ul);
				$.each(nodes, function (i, n) {
					var c = n._getInitElement();
					ul.append(c);
				});
			}
			return li;
		},

		_getChildren: function () {
			return (this.element.find(">ul:first>li").length > 0 &&
			this.element.children("ul:first")) ||
			!!(this.options.nodes && this.options.nodes.length);
		},

		_getNodeWidget: function (el) {
			var node = this._getNodeByDom(el), widget;
			if (node.length > 0) {
				widget = node.data(node.data("widgetName"));
				return widget;
			}
			return null;
		},

		_createNodeWidget: function ($li, options) {
			if ($.fn.wijtreenode) {
				$li.data("owner", this);
				if (!!options && $.isPlainObject(options)) {
					$.extend(options, { treeClass: this.options.treeClass });
					$li.wijtreenode(options);
				}
				else {
					$li.wijtreenode({ treeClass: this.options.treeClass });
				}
			}
			return $li;
		},

		_getNodeByDom: function (el) {//Arg :Dom Element
			return $(el).closest(":" + this.widgetBaseClass);
		},

		_getCurrentLevel: function () {
			return this.element.parentsUntil(":" + this.options.treeClass).length - 1;
		},

		_getField: function (key) {
			return this.element.data(key);
		},

		_setField: function (key, value) {
			return this.element.data(key, value);
		}
	});
} (jQuery));

(function ($) {//check box for wijtree
	var checkClass = "ui-icon ui-icon-check",
	triStateClass = "ui-icon ui-icon-stop";
	$.widget("wijmo.wijtreecheck", {
		options: {
			checkState: "unCheck" //"check","triState"
		},
		_create: function () {
			var self = this, o = this.options;
			if (self.element.is("div")) {
				self.element.addClass("wijmo-checkbox ui-widget")
				.attr("role", "checkbox");
				self.$icon = $("<span>");
				self.$icon.addClass("wijmo-checkbox-icon");
				if (o.checkState === "check") {
					self.$icon.addClass("ui-icon ui-icon-check");
				}
				else if (o.checkState === "triState") {
					self.$icon.addClass("ui-icon ui-icon-stop");
				}
				self.$body = $('<div></div>')
				.addClass("wijmo-checkbox-box ui-widget ui-corner-all ui-state-default")
				.css({ position: "relative" }).append(self.$icon);
				self.element.append(self.$body);
				self.element.bind("mouseover.wijtreecheck", function () {
					if (!self.options.disabled) {
						self.$body.removeClass("ui-state-default")
						.addClass("ui-state-hover");
					}
				}).bind("mouseout.wijtreecheck", function () {
					if (!self.options.disabled) {
						self.$body.removeClass("ui-state-hover")
						.not(".ui-state-focus").addClass("ui-state-default");
					}
				});
			}
		},

		_setOption: function (key, value) {
			var self = this;
			if (key === "checkState") {
				if (value === "unCheck") {
					self.$body.removeClass("ui-state-active");
					self.$icon.removeClass("ui-icon ui-icon-check " +
					"ui-icon-stop ui-state-active");
				}
				else if (value === "check") {
					self.$body.addClass("ui-state-active");
					self.$icon.removeClass(triStateClass).addClass(checkClass);
				}
				else if (value === "triState") {
					self.$body.addClass("ui-state-active");
					self.$icon.removeClass(checkClass).addClass(triStateClass);
				}
			}
			$.Widget.prototype._setOption.apply(self, arguments);
		},

		destory: function () {
			this.element.children().remove();
			this.element.removeClass("wijmo-checkbox ui-widget");
			$.Widget.prototype.destroy.apply(this);
		}
	});
} (jQuery));