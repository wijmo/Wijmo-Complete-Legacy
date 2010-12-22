/*globals jQuery,window*/
"use strict";
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
	$.widget("wijmo.wijtree", {

		options: {
			///	<summary>
			/// Allows tree nodes to be dragged
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("allowDrag",true).
			///	</summary>
			allowDrag: false,
			///	<summary>
			///	Allows tree to be dropped within tree nodes.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("allowDrop",true).
			///	</summary>
			allowDrop: false,
			///	<summary>
			///	Allows tree nodes to be edited at run time.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("allowEdit",true).
			///	</summary>
			allowEdit: false,
			///	<summary>
			///	Allows tree nodes to be sorted at run time.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("allowSorting",false).
			///	</summary>
			allowSorting: true,
			///	<summary>
			///	Allow triState of checkBox.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("allowTriState",false).
			///	</summary>
			allowTriState: true,
			///	<summary>
			///	Allows sub-nodes to be checked upon parent node check.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("autoCheckNodes",false).
			///	</summary>
			autoCheckNodes: true,
			///	<summary>
			///	If this option is set to true, 
			/// the expanded node will be collapsed if another node is expanded.
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("autoCollapse",false).
			///	</summary>
			autoCollapse: false,
			///	<summary>
			///	If set to true, the select, click, 
			/// and check operations are disabled too.
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("disabled",true).
			///	</summary>
			disabled: false,
			///	<summary>
			///	If this option is set to true, the tree will be expand/Collapse 
			/// when the mouse hovers on the expand/Collapse button 
			/// Type:Boolean.
			/// Default:false.
			/// Code example:$(".selector").wijtree("expandCollapseHoverUsed",true).
			///	</summary>
			expandCollapseHoverUsed: false,
			///	<summary>
			///	Allows the CheckBox to be shown on tree nodes
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("showCheckBoxes",false).
			///	</summary>
			showCheckBoxes: false,
			///	<summary>
			///	Allows tree nodes to be expanded or collapsed
			/// Type:Boolean.
			/// Default:true.
			/// Code example:$(".selector").wijtree("showExpandCollapse",false).
			///	</summary>
			showExpandCollapse: true,
			///	<summary>
			///	Animation options for showing the child nodes 
			/// when the parent node is expanded.
			/// Type:Object.
			/// Default:{ effect: "blind", easing: "easeOutExpo", duration: 200 }.
			/// Code example:$(".selector").wijtree("expandAnimation",
			/// { effect: "blind", easing: "easeOutExpo", duration: 200 }).
			///	</summary>
			expandAnimation: { effect: "blind", easing: "easeOutExpo", duration: 200 },
			///	<summary>
			///	The duration of the time to delay before the node is expanded.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtree("expandDelay",100).
			///	</summary>
			expandDelay: 0,
			///	<summary>
			/// Animation options for hiding the child nodes 
			/// when the parent node is collapsed.
			/// Type:Object.
			/// Default:{ effect: "blind", easing: "easeOutExpo", duration: 200 }.
			/// Code example:$(".selector").wijtree("collapseAnimation",
			/// { effect: "blind", easing: "easeOutExpo", duration: 200 }).
			///	</summary>
			collapseAnimation: { effect: "blind", easing: "easeOutExpo", duration: 200 },
			///	<summary>
			///	The duration of the time to delay before the node is collapsed.
			/// Type:Number.
			/// Default:0.
			/// Code example:$(".selector").wijtree("collapseDelay",100).
			///	</summary>
			collapseDelay: 0
		},

		/* init methods*/
		_create: function () {
			this._initState();
			this._createTree();
			this._attachEvent();
			this._attachNodeEvent();
		},

		_init: function () { },

		_setOption: function (key, value) {
			var self = this, isResetHitArea = false;

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
			default:
				break;
			}
			$.Widget.prototype._setOption.apply(self, arguments); //use Widget disable
			if (isResetHitArea === true) {
				self._setHitArea(value);
			}
		},

		_initState: function () { //declare the properties of tree
			this._selectedNodes = [];
			this._checkedNodes = [];
			this._enabled = true;
			this._insertPosition = "unKnown"; //end,after,before
		},

		_createTree: function () {//create by dom
			var self = this, options = self.options, nodes = [],
			treeClass = "wijmo-wijtree ui-widget ui-widget-content " +
			"ui-helper-clearfix ui-corner-all";

			if (self.element.is("ul")) {
				self.element.wrap("<div></div>");
				self.widgetDom = self.element.parent();
				self.widgetDom.addClass(treeClass)
				.attr({
					role: "tree",
					"aria-multiselectable": true
				});
				self.element.addClass("wijmo-wijtree-list ui-helper-reset");
				self.element.children("li").each(function () {
					var $li = $(this);
					self._createNodeWidget($li, options);
					nodes.push(self._getNodeWidget($(this)));
				});
				self._hasChildren = nodes.length > 0;
				self._setField("nodes", nodes);
				self.nodes = nodes;
				self.widgetDom.append($("<div>").css("clear", "both"));
			}
		},

		_createNodeWidget: function ($li, options) {
			if ($.fn.wijtreenode) {
				$li.data("owner", this);
				$li.wijtreenode(options);
			}
			return $li;
		},

		/*tree event*/
		_attachEvent: function () {
			var self = this;
			self.element.bind($.browser.mozilla ? "focus." : "focusin." + self.widgetName,
			$.proxy(self._onFocus, self))
			.bind("mouseover." + this.widgetName, $.proxy(self._onMouseOver, self));
			if (self.options.allowDrop) {
				self._attachDroppable();
			}
		},

		_attachDroppable: function () {
			var self = this;
			self.widgetDom.droppable({
				drop: function (event, ui) {
					var d = ui.draggable, dragNode = self._getNodeWidget(d),
					dropNode, position, oldOwner, parent, brothers, idx, nodes, i;
					if (dragNode) {
						dropNode = dragNode._dropTarget;
						if (dropNode) {
							position = dragNode._insertPosition;
							if (dropNode && position !== "unKnown") {
								oldOwner = d.data("owner");
								if (oldOwner) {
									oldOwner.remove(d);
								}
								if (!oldOwner.element.is(":wijmo-wijtree") &&
								oldOwner._getField("nodes").length > 0) {
									if (self.options.showCheckBoxes &&
									self.options.allowTriState) {
										oldOwner._getField("nodes")[0]
										._setParentCheckState();
									}
								}
								if (position === "end") {
									d.show();
									dropNode.add(d);
								}
								else if (position === "before" || position === "after") {
									parent = dropNode._getField("owner");
									brothers = parent._getField("nodes");
									idx = $.inArray(dropNode, brothers);
									if (idx !== -1) {
										d.show();
										if (position === "before") {
											parent.add(d, idx);
										}
										else if (position === "after") {
											parent.add(d, idx + 1);
										}
									}
								}

								/*reset the tree of node*/
								/*reset old tree*/
								dragNode._tree._isDragging = false;
								if (dragNode._selected) {
									dragNode._setSelected(false);
								}
								/*set new tree*/
								dragNode._tree = self;
								nodes = dragNode._getField("nodes");
								for (i = 0; i < nodes.length; i++) {
									nodes[i]._tree = self;
								}
								self._trigger("nodeDroped", event, ui);
							}
						}
						else {
							d.draggable("option", "revert", true);
						}
					}
				},
				accept: "li",
				scope: "tree"
			});
		},

		_attachNodeEvent: function () {
			this.element.bind("click." + this.widgetName, $.proxy(this._onClick, this))
			.bind("mouseout." + this.widgetName, $.proxy(this._onMouseOut, this))
			.bind("keydown." + this.widgetName, $.proxy(this._onKeyDown, this));
		},

		_onClick: function (event) {
			this._callEvent(event, '_onClick');
			if ($.browser.webkit)
			{
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
			return this._checkedNodes;
		},

		destroy: function () {
			/// <summary>
			/// Destroy the widget
			/// </summary>
			var self = this, $nodes = self.element,
			c = "wijmo-wijtree ui-widget ui-widget-content " +
			"ui-helper-clearfix ui-corner-all";
			self.widgetDom.removeClass(c);

			if (self.widgetDom.data("droppable")) {
				self.widgetDom.droppable("destroy");
			}
			$nodes.removeData("nodes").removeClass("wijmo-wijtree-list ui-helper-reset");
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
			var nodeWidget = null, o = this.options, $node, nodes,
			originalLength, itemDom = "<li><a>{0}</a></li>";
			if (typeof node === "string") {
				$node = $(itemDom.replace(/\{0\}/, node));
				this._createNodeWidget($node, o);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if (node.jquery) {
				if (!node.data("widgetName")) {
					this._createNodeWidget(node, o);
				}
				nodeWidget = node.data(node.data("widgetName"));
			}
			else if (node.nodeType) {
				$node = $(node);
				this._createNodeWidget($node, o);
				nodeWidget = $node.data($node.data("widgetName"));
			}

			if (nodeWidget === null) {
				return;
			}
			nodes = this._getField("nodes");
			if (!position && position > nodes.length) {
				position = nodes.length;
			}

			nodeWidget._setField("owner", this);
			originalLength = nodes.length;
			nodes.splice(position, 0, nodeWidget);

			if (originalLength > 0 && originalLength !== position) {
				if (nodeWidget.element.get(0) !== nodes[position + 1].element.get(0)) {
					nodeWidget.element.insertBefore(nodes[position + 1].element);
				}
			}
			else {
				this.element.append(nodeWidget.element);
			}
			this._refreshNodesClass();
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
			if (idx < 0 && idx >= nodes.length) {
				return;
			}
			nodeWidget = nodes[idx];
			nodeWidget.element.detach();
			nodes.splice(idx, 1);
			this._refreshNodesClass();
		},


		findNodeByText: function (txt) {
			/// <summary>
			/// Find node by the node text
			/// </summary>
			/// <param name="txt" type="String">
			/// the text of which node you want to find
			/// </param>
			/// <returns type="wijtreenode" />
			var nodes = $(".wijmo-wijtree-node a>span", this.element).filter(function () {
				return $(this).text() === txt;
			});
			if (nodes.length) {
				return this._getNodeWidgetByDom(nodes.get(0));
			}
			return null;
		},

		_setAllowDrag: function (value) {
			var $allNodes;
			if (value) {
				$allNodes = this.element.find(":wijmo-wijtreenode");
				$allNodes.each(function () {
					var w = $(this).data("wijtreenode");
					if (!$(this).data("draggable") &&
					!w.$navigateUrl.data("events").mousedown) {
						w.$navigateUrl.one("mousedown", w, w._onMouseDown);
					}
				});
			}
			else {
				$allNodes = this.element.find(":wijmo-wijtreenode:ui-draggable");
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
			self.element.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				if (nodeWidget !== null) {
					nodeWidget._setCheckBoxes(value);
				}
			});
		},

		_setHitArea: function (value) {
			var self = this;
			self.element.children("li").each(function () {
				var nodeWidget = self._getNodeWidget($(this));
				if (nodeWidget !== null) {
					nodeWidget._setHitArea(value);
				}
			});
		},

		/*region methods(private)*/
		_getNodeWidget: function ($node) {
			if ($node.is(":wijmo-wijtreenode")) {
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
			return $(el).closest(":wijmo-wijtreenode");
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
			///	Sets the nodeÃ¢â‚¬â„¢s text. 
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("text","Hello World!").
			///	</summary>
			text: "",
			///	<summary>
			///	Sets the nodeÃ¢â‚¬â„¢s tooltip.
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector").wijtreenode("toolTip","Node 1 toolTip").
			///	</summary>
			toolTip: ""
		},

		/*widget Method*/
		_setOption: function (key, value) {
			var self = this;

			switch (key) {
			case "accessKey":
				if (this.$navigateUrl !== null) {
					this.$navigateUrl.attr("accesskey", value);
				}
				break;
			case "checked":
				this._checkState = value ? "checked" : "unChecked";
				self._setChecked(value);
				break;
			case "collapsedIconClass":
			case "expandedIconClass":
			case "itemIconClass":
				this.options[key] = value;
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
				this._setToolTip(value);
				break;
			case "navigateUrl":
				this._setNavigateUrlHref(value);
				break;
			default:
				break;
			}
			$.Widget.prototype._setOption.apply(self, arguments);
		},

		_initState: function () {// declare the properity of node
			this._tree = null;
			this._dropTarget = null;
			this._checkState = "unChecked"; //Checked,UnChecked,Indeterminate
			this._value = this._text = this._navigateUrl = "";
			this._insertPosition = "unKnown"; //end,after,before
			this._hasPotentialNodes = false; //for ajax load
		},

		_create: function () {
			this._initState();
			this._createTreeNode();
			this._initNode();
			this.element.data("widgetName", "wijtreenode");
		},

		_createTreeNode: function () {
			var $li = this.element, self = this, nodes = [];
			this.$navigateUrl = $li.children("a");

			if (this._tree === null) {
				this._tree = this._getTree();
			}
			this.$nodeBody = null;
			this.$checkBox = null;
			this.$nodeImage = $("<span>");
			this.$hitArea = null;
			this.$nodes = null;
			this.$nodeBody = $("<div>")
			.attr({
				role: "treeitem",
				"aria-expanded": false,
				"aria-checked": false,
				"aria-selected": false
			});
			if (this._tree.options.showCheckBoxes === true) {
				this.$checkBox = $("<div>");
			}

			if (this.$navigateUrl.length === 0) {
				this.$navigateUrl = $("<a>");
				this.$navigateUrl.attr("href", "#");
			}
			this.$text = this.$navigateUrl.find("span:eq(0)");
			if (this.$text.length === 0) {
				this.$navigateUrl.wrapInner("<span></span>");
				this.$text = this.$navigateUrl.find("span:eq(0)");
			}

			this._hasChildren = this._getChildren();
			this.$inner = $("<span></span>")
			.addClass("ui-helper-clearfix wijmo-wijtree-inner ui-corner-all");
			if (this._hasChildren) {
				$li.addClass("wijmo-wijtree-parent");
				this.$nodeBody
				.addClass("wijmo-wijtree-node wijmo-wijtree-header ui-state-default");
				this.$hitArea = $("<span>");
				this.$inner.append(this.$navigateUrl);
				if (this.$checkBox !== null) {
					this.$inner.prepend(this.$checkBox);
					this.$checkBox.wijtreecheck();
				}
				this.$inner.prepend(this.$nodeImage)
				.prepend(this.$hitArea);
				this.$nodes = $li.find("ul:eq(0)")
				.addClass("wijmo-wijtree-list ui-helper-reset wijmo-wijtree-child");
				this.$nodes.children().filter("li").each(function (i) {
					var $li = $(this), nodeWidget;
					$li.data("owner", self);
					$li.wijtreenode(self.options);  //the arg must be jquerify
					nodeWidget = self._getNodeWidget($li);
					nodeWidget._index = i;
					nodes.push(nodeWidget);
				});
			}
			else {
				$li.addClass("wijmo-wijtree-item");
				this.$nodeBody.addClass("wijmo-wijtree-node ui-state-default");
				this.$inner.append(this.$navigateUrl);
				if (this.$checkBox !== null) {
					this.$inner.prepend(this.$checkBox);
					this.$checkBox.wijtreecheck();
				}
				this.$inner.prepend(this.$nodeImage);
			}

			this.$nodeBody.append(this.$inner);
			this._setField("nodes", nodes);
			$li.prepend(this.$nodeBody);
		},

		_initNodeClass: function () {
			var self = this, o = self.options,
			hitClass = "ui-icon " +
			(o.expanded ? "ui-icon-triangle-1-se" : "ui-icon-triangle-1-e");
			if (self._tree.options.showExpandCollapse) {
				if (self._hasChildren) {
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
				}
				else if (self.$hitArea) {
					self.$hitArea.remove();
					self.$hitArea = null;
					self.element
					.removeClass("wijmo-wijtree-parent")
					.addClass("wijmo-wijtree-node ui-state-default ui-corner-all");
				}
			}

		},

		_initNode: function () {//init node(children,class, tree)
			if (!this._initialized) {
				this._initialized = true;
				this._initNodeImg();
				this._initNavigateUrl();
				this._text = this.$text.html();
				this._hasChildren = this._getChildren();
				this._initNodesUL();
				this._initNodeClass();
				this.$navigateUrl.one("mousedown", this, this._onMouseDown);
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
			self._navigateUrl = !!href ? href : "";
			self._setNavigateUrlHref(href);
		},

		_initNodeImg: function () {//ui-icon instead of image
			var self = this, o = this.options;
			if (this.$nodeImage === null || !this.$nodeImage.length) {
				this.$nodeImage = $("<span>");
			}
			if (self.options.collapsedIconClass !== "" &&
			self.options.expandedIconClass !== "") {
				this.$nodeImage.removeClass().addClass("ui-icon")
				.addClass(self._expanded ? o.expandedIconClass : o.collapsedIconClass);
				if (!self._tree.options.showExpandCollapse) {
					this.$nodeImage.addClass(self.options.expandedIconClass);
				}
				this.$nodeImage.insertBefore(this.$checkBox);
			}
			else if (self.options.itemIconClass !== "") {
				this.$nodeImage.removeClass().addClass("ui-icon");
				this.$nodeImage.addClass(self.options.itemIconClass);
				this.$nodeImage.insertBefore(this.$checkBox);
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
				this.$editArea = $("<input>").wijtextbox();
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
			if (this.$text !== null && text !== "") {
				this.$text.text(text);
				this._tree._trigger("nodeTextChanged", this);
			}
		},

		/*behavior Methods*/
		_expandCollapseItem: function () {//access
			if (!this._tree.options.disabled) {
				if (this._hasChildren) {
					this._setExpanded(!this._expanded);
				}
			}
		},

		_expandNode: function (expand) {
			if (!this._tree.options.disabled) {
				if (expand) {
					if (this.options.expandDelay > 0) {
						if (typeof this._expandTimer !== "undefined") {
							this._expandTimer = window.clearTimeout(this._expandTimer);
						}
						this._expandTimer = window.setTimeout(this._expandNodeVisually,
						this.options.expandDelay);
					}
					else {
						this._expandNodeVisually();
					}
				}
				else {
					if (this.options.collapseDelay > 0) {
						this._collapseTimer = window.clearTimeout(this._collapseTimer);
						this._collapseTimer = window.setTimeout(
						this._collapseNodeVisually,
						this.options.collapseDelay);
					}
					else {
						this._collapseNodeVisually();
					}
				}
			}

		},

		_expandNodeVisually: function () {
			var self = this, nodes;
			if (self._tree.options.autoCollapse) {//autoCollapse
				nodes = self.element.siblings(":wijmo-wijtreenode");
				$.each(nodes, function (i) {
					var widget = self._getNodeWidget(nodes[i]);
					if (widget._expanded) {
						widget._setExpanded(false);
					}
				});
			}
			if (self.options.collapsedIconClass !== "" &&
			self.options.expandedIconClass !== "") {
				self.$nodeImage.removeClass(self.options.collapsedIconClass)
				.addClass(self.options.expandedIconClass);
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
			animation = show ? "expandAnimation" : "collapseAnimation",
			event = show ? "nodeExpanded" : "nodeCollapsed";
			if (el) {
				if ($.effects && !!self._tree.options[animation].duration) {//v 1.8.2
					el[show ? "show" : "hide"](self._tree.options[animation].effect, {},
							self._tree.options[animation].duration,
							function () {
								self._tree._trigger(event, null, self);
							});
				} else {
					el[show ? "show" : "hide"](self._tree.options[animation].duration,
							function () {
								self._tree._trigger(event, null, self);
							});
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
			var self = this, $item = self.element, temp;
			temp = this._insertionTemplate = $("<div>")
			.addClass("wijmo-wijtree-insertion ui-state-default").hide();

			$item.draggable({
				cursor: "point",
				cursorAt: { top: 15, left: -25 },
				helper: function () {
					return $("<div>" + self.$text.html() + "</div>")
					.addClass("ui-widget-header ui-corner-all");
				},
				start: function (event) {
					self._tree._isDragging = true;
					self._tree._trigger("nodeDragStarted", event, self);
					self._tree.widgetDom.prepend(self._insertionTemplate);
					$item.hide();
				},
				distance: $.browser.msie ? 1 : 10,
				//this curse a draggable error in IE 7.0/6.0
				handle: self.$navigateUrl,
				scope: "tree",
				drag: function (event) {
					var t = event.srcElement || event.originalEvent.target,
					targetEl = $(t), dropNode, p = { x: event.pageX, y: event.pageY };
					if (temp) {
						temp.hide();
					}
					if (targetEl) {
						dropNode = self._getNodeWidget(targetEl);
						if (dropNode) {
							if (targetEl.closest(".wijmo-wijtree-inner", self.element)
							.length) {
								self._dropTarget = dropNode;
								self._insertPosition = "end"; //end,after,before
							}
							else {
								temp.show();
								self._insertPosition =
								self._drowTemplate(p, temp, dropNode.element);
								self._dropTarget = dropNode;
							}
						}
					}
					self._tree._trigger("nodeDragging", event, self);
				},
				stop: function () {
					$item.show();
					temp.remove();
					self._dropTarget = null;
					self._insertPosition = "unKnown";
					self._resetDrag();
				}
			}).trigger(e);
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
			if (!this._tree.options.disabled) {
				if (this._checked && this._checkState === "indeterminate") {
					this._checkState = "checked";
					this._checkItem();
				}
				else {
					this._checkState = this._checked ? "unChecked" : "checked";
					this._setChecked(!this._checked);
				}
			}
		},

		_checkItem: function () {//access
			var self = this, autoCheck = false;
			if (this._tree === null || !this._tree.options.showCheckBoxes) {
				return;
			}
			if (this._tree.options.autoCheckNodes &&
			self._checkState !== "indeterminate") {
				autoCheck = true;
				this._changeCheckState(this._checked);
			}
			if (this._tree.options.allowTriState) {
				this._setParentCheckState();
			}
			this[this._checked ? "_checkNode" : "_unCheckNode"](autoCheck);
			this._tree._trigger("nodeCheckChanged", null, this);
		},

		_checkNode: function (autoCheck) {
			//todo: add to tree._checkedNodes
			//            var idx = $.inArray(this, this._tree._checkedNodes);
			//            if (idx == -1) {
			//                tree._checkedNodes.push(this);
			//            }
			var nodes = this._getField("nodes"), i;
			if (this._checkState === "checked") {
				this.$checkBox.wijtreecheck("option", "checkState", "check");
			}
			else if (this._checkState === "indeterminate") {//todo: tristate Style
				this.$checkBox.wijtreecheck("option", "checkState", "triState");
			}

			if (autoCheck) {
				for (i = 0; i < nodes.length; i++) {
					nodes[i]._checkNode(true);
				}
			}
		},

		_unCheckNode: function (autoCheck) {
			//todo: remove to tree._checkedNodes
			//            var idx = $.inArray(this, this._tree._checkedNodes);
			//            if (idx != -1) {
			//                this._tree._checkedNodes.splice(idx, 1);
			//            }
			this.$checkBox.wijtreecheck("option", "checkState", "unCheck");

			var nodes = this._getField("nodes"), i;
			if (autoCheck) {
				for (i = 0; i < nodes.length; i++) {
					nodes[i]._unCheckNode(true);
				}
			}
		},

		_changeCheckState: function (checked) {
			var nodes = this._getField("nodes");
			$.each(nodes, function (i, node) {
				node._checked = checked;
				node.options.checked = checked;
				node.$nodeBody.attr("aria-checked", checked);
				node._checkState = checked ? "checked" : "unChecked";
				node._changeCheckState(checked);
			});
		},

		_setParentCheckState: function () {//set parent check state

			var owner = this._getOwner(), nodes, allChecked = true,
			hasChildrenChecked = false, triState = false, i;
			if (owner.element.is(":wijmo-wijtree")) {
				return;
			}
			nodes = owner._getField("nodes");
			for (i = 0; i < nodes.length; i++) {
				if (nodes[i]._checkState === "indeterminate") {
					triState = true;
				}
				if (nodes[i]._checked) {
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
			else if (el.hasClass("ui-icon-triangle-1-se") ||
			el.hasClass("ui-icon-triangle-1-e")) {
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
			if (node._tree.options.allowDrag) {//prepare for drag
				if (el.closest(".wijmo-wijtree-node", node.element).length > 0) {
					node._beginDrag(event);
				}
			}
		},

		_onMouseOver: function (event) {
			var el = $(event.target), self = this, rel = $(event.relatedTarget);
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0 &&
			(this._tree._overNode !== self || rel.is(':wijmo-wijtreenode'))) {
				self._mouseOver(event);
				this._tree._overNode = self;
			}
			self._mouseOverHitArea(event);
		},

		_onMouseOut: function (event) {
			var el = $(event.target), self = this,
			rel = $(event.relatedTarget), node = this._getNodeWidget(rel);
			if (el.closest(".wijmo-wijtree-inner", self.element).length > 0 &&
			(this._tree._overNode !== node || rel.is(':wijmo-wijtreenode'))) {
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
			!this._tree.options.disabled &&
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
			if (!self._tree.options.disabled) {
				self._focused = false;
				if (el.closest(".wijmo-wijtree-inner", self.element).length > 0) {
					self.$inner.removeClass("ui-state-focus");
				}
				self._tree._trigger("nodeBlur", event, self);
			}
		},

		_click: function (event) {
			if (!this._tree.options.disabled) {
				if (!/^[#,\s]*$/.test(this._navigateUrl)) {
					return;
				}
				this._isClick = true;
				this._tree._ctrlKey = event.ctrlKey;
				if (this._selected && this._tree._ctrlKey) {
					this._setSelected(false);
				}
				else if (this._selected && this._tree.options.allowEdit) {
					this._editNode();
				}
				else {
					this._setSelected(!this._selected);
				}
				event.preventDefault();
				event.stopPropagation();
			}
			else {
				this._setNavigateUrlHref("");
			}
		},

		_selectNode: function (select, event) {
			if (!this._tree.options.disabled && !this._tree._isDragging) {
				var ctrlKey = this._tree._ctrlKey, idx;
				if (ctrlKey) {
					idx = $.inArray(this, this._tree._selectedNodes);
					if (idx !== -1 && !select) {
						this._tree._selectedNodes.splice(idx, 1);
						this.$inner.removeClass("ui-state-active");
					}
				}
				else {
					$.each(this._tree._selectedNodes, function (i, n) {
						n.$inner.removeClass("ui-state-active");
						n.options.selected = false;
						n._selected = false;
						n.$nodeBody.attr("aria-selected", false);
					});
					this._tree._selectedNodes = [];
				}
				if (select) {
					idx = $.inArray(this, this._tree._selectedNodes);
					if (idx === -1) {
						this._tree._selectedNodes.push(this);
					}
					this.$inner.addClass("ui-state-active");
				}
				else {
					this.$inner.removeClass("ui-state-active");
				}
				if (this._isClick) {
					this._tree._trigger("nodeClick", event, this);
				}
				this._tree._ctrlKey = false;
				this._tree._trigger("selectedNodeChanged", event, this);
			}
		},

		_keyAction: function (e) {
			if (this._tree.options.disabled) {
				return;
			}
			var el = e.target;
			if (el) {
				if (this._tree._editMode && e.keyCode !== $.ui.keyCode.ENTER) {
					return;
				}
				switch (e.keyCode) {
				case $.ui.keyCode.UP:
					this._moveUp();
					break;
				case $.ui.keyCode.DOWN:
					this._moveDown();
					break;
				case $.ui.keyCode.RIGHT:
					if (this._tree.options.showExpandCollapse) {
						this._moveRight();
					}
					break;
				case $.ui.keyCode.LEFT:
					if (this._tree.options.showExpandCollapse) {
						this._moveLeft();
					}
					break;
				case 83: //key s
					if (!this._tree._editMode && this._tree.options.allowSorting) {
						this.sortNodes();
					}
					break;
				case 113: //key f2
					if (this._tree.options.allowEdit) {
						this._editNode();
					}
					break;
				case 109: //key -
					if (this._tree.options.showExpandCollapse && this._expanded) {
						this._setExpanded(false);
					}
					break;
				case 107: //key +
					if (this._tree.options.showExpandCollapse && !this._expanded) {
						this._setExpanded(true);
					}
					break;
				case $.ui.keyCode.ENTER:
					if (this._tree._editMode) {
						e.data = this;
						this._editionComplete(e);
					}
					break;
				case $.ui.keyCode.SPACE: //check
					if (this._tree.options.showCheckBoxes) {
						this._checkState = this._checked ? "unChecked" : "checked";
						this._setChecked(!this._checked);
					}
					break;
				}
				e.preventDefault();
				e.stopPropagation();
			}
		},

		_prevNode: function (node) {
			if (node.element.prev().length > 0) {
				return node.element.prev().data("wijtreenode");
			}
		},

		_nextNode: function (node) {
			if (node.element.next().length > 0) {
				return node.element.next().data("wijtreenode");
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
			var nextNode = null;
			if (owner.element.is(":wijmo-wijtree")) {
				return null;
			}
			nextNode = this._nextNode(owner);
			if (nextNode) {
				return nextNode;
			}
			return this._getNextNode(owner._getOwner());
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
			!nextNode.element.is(":wijmo-wijtree")) {
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
			if (!this._tree.options.disabled && !this._tree._editMode) {
				this._mouseOverNode();
				if (!this._tree._isDragging) {
					this._tree._trigger("nodeMouseOver", event, this);
				}
			}
		},

		_mouseOut: function (event) {
			if (!this._tree.options.disabled && !this._tree._editMode) {
				this._mouseOutNode();
				if (!this._tree._isDragging) {
					this._tree._trigger("nodeMouseOut", event, this);
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
			var bound, p;
			if (!this._tree.options.disabled) {
				if (this._tree.options.expandCollapseHoverUsed) {
					if (this._hasChildren && !this._isOverHitArea) {
						bound = this._getBounds(this.element);
						p = { x: event.pageX, y: event.pageY };
						if (this._isMouseInsideRect(p, bound)) {
							this._isOverHitArea = true;
							this._setExpanded(true);
						}
					}
				}
			}
		},

		_mouseOutHitArea: function (event) {
			var p = { x: event.pageX, y: event.pageY }, bound;
			if (!this._tree.options.disabled) {
				if (this._tree.options.expandCollapseHoverUsed) {
					if (this._hasChildren && !!this._isOverHitArea) {
						bound = this._getBounds(this.element);
						if (!this._isMouseInsideRect(p, bound)) {
							this._isOverHitArea = false;
							this._setExpanded(false);
						}
					}
					else if (this._getOwner().element.is(":wijmo-wijtreenode")) {
						bound = this._getBounds(this._getOwner().element);
						if (!this._isMouseInsideRect(p, bound)) {
							this._getOwner()._isOverHitArea = false;
							this._getOwner()._setExpanded(false);
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
			/// Adds a node to the element.
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
			var nodeWidget = null, $node, nodes,
			itemDom = "<li><a>{0}</a></li>", originalLength;
			if (typeof node === "string") {
				$node = $(itemDom.replace(/\{0\}/, node));
				this._createNodeWidget($node);
				nodeWidget = $node.data($node.data("widgetName"));
			}
			else if (node.jquery) {
				if (!node.data("widgetName")) {
					this._createNodeWidget(node);
				}
				nodeWidget = node.data(node.data("widgetName"));
			}
			else if (node.nodeType) {
				$node = $(node);
				this._createNodeWidget($node);
				nodeWidget = $node.data($node.data("widgetName"));
			}

			if (nodeWidget === null) {
				return;
			}
			nodes = this._getField("nodes");
			if (!position || position > nodes.length) {
				if (position !== 0) {
					position = nodes.length;
				}
			}

			nodeWidget._setField("owner", this);
			originalLength = nodes.length;
			if (!this.$nodes) {
				this.$nodes = $("<ul></ul>")
				.addClass("wijmo-wijtree-list ui-helper-reset wijmo-wijtree-child");
				this.element.append(this.$nodes);
			}
			if (originalLength > 0 && originalLength !== position) {
				if (nodeWidget.element.get(0) !== nodes[position].element.get(0)) {
					nodeWidget.element.insertBefore(nodes[position].element);
				}
			}
			else {
				this.$nodes.append(nodeWidget.element);
			}
			nodes.splice(position, 0, nodeWidget);
			this._collectionChanged("add");

		},

		remove: function (node) {
			/// <summary>
			/// Removes a node of this element.
			/// </summary>
			/// <param name="node" type="String,Object">
			/// which node to be removed
			/// 1.wijtreenode widget.
			/// 2.the index of which node you determined to remove.
			/// </param>
			var idx = -1, nodeWidget, nodes = this._getField("nodes");
			if (node.jquery) {
				idx = node.index();
			}
			else if (typeof node === "number") {
				idx = node;
			}
			if (idx < 0 && idx >= nodes.length) {
				return;
			}
			nodeWidget = nodes[idx];
			nodeWidget.element.detach();
			nodes.splice(idx, 1);
			this._collectionChanged("remove");

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
			this._refreshNodesClass();
		},

		_refreshNodesClass: function () {
			var nodes = this._getField("nodes"), i;
			for (i = 0; i < nodes.length; i++) {
				nodes[i]._initNodeClass();
			}
		},

		_setChecked: function (value) {
			var self = this;
			if (self._checked === value &&
			self._checkState !== "indeterminate") {
				return;
			}
			self._checked = value;
			self.options.checked = value;
			self.$nodeBody.attr("aria-checked", value);
			this._checkItem();
		},

		_setExpanded: function (value) {
			var self = this;
			if (self._expanded === value) {
				return;
			}
			if (self._hasChildren) {
				self._expanded = value;
				self.options.expanded = value;
				self.$nodeBody.attr("aria-expanded", value);
				self._expandNode(value);
			}
		},

		_setFocused: function (value) {
			if (value) {
				this.$navigateUrl.focus();
				if ($.browser.msie || $.browser.webkit)
				{
					this._setFocusNode();
				}
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
			if (this.options.selected !== value) {
				this._selected = value;
				this.options.selected = value;
				this.$nodeBody.attr("aria-selected", value);
				this._selectNode(value);
				this._setFocused(value);
			}
		},

		_setCheckBoxes: function (value) {
			var self = this;
			if (self.$checkBox) {
				self.$checkBox[value ? 'show' : 'hide']();
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
				if (owner.element.is(":wijmo-wijtree")) {
					return owner;
				}
				else {
					return owner._getTree();
				}
			}
			return null;
		},

		_getChildren: function () {
			return this.element.find(">ul:first>li").length > 0 &&
			this.element.children("ul:first");
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
				$li.wijtreenode(options);
			}
			return $li;
		},

		_getNodeByDom: function (el) {//Arg :Dom Element
			return $(el).closest(":wijmo-wijtreenode");
		},

		_getCurrentLevel: function () {
			return this.element.parentsUntil(":wijmo-wijtree").length - 1;
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
	var checkClass = "ui-icon ui-icon-check", triStateClass = "ui-icon ui-icon-stop";
	$.widget("wijmo.wijtreecheck", {
		options: {
			checkState: "unCheck" //"check","triState"
		},
		_create: function () {
			var self = this, o = this.options;
			if (self.element.is("div")) {
				self.element.addClass("wijmo-checkbox ui-widget");
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
					self.$icon.removeClass("ui-icon ui-icon-check ui-icon-stop");
				}
				else if (value === "check") {
					self.$icon.removeClass(triStateClass).addClass(checkClass);
				}
				else if (value === "triState") {
					self.$icon.removeClass(checkClass).addClass(triStateClass);
				}
			}
		},

		destory: function () {
			this.element.children().remove();
			this.element.removeClass("wijmo-checkbox ui-widget");
			$.Widget.prototype.destroy.apply(this);
		}
	});
} (jQuery));
