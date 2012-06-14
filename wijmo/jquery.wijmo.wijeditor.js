/*globals jQuery, alert, document, window, setTimeout, $, Components, netscape */
/*
 * Wijmo Library 2.1.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
 * licensing@wijmo.com
 * http://wijmo.com/license
*
* Depends:
*  jquery.ui.core.js
*  jquery.ui.mouse.js
*  jquery.ui.widget.js
*  jquery.ui.tabs.js
*  jquery.ui.position.js
*  jquery.ui.draggable.js

*  jquery.wijmo.wijutil.js
*  jquery.wijmo.wijsplitter.js
*  jquery.wijmo.wijdialog.js
*  jquery.wijmo.wijmenu.js
*  jquery.wijmo.wijtabs.js
*  jquery.wijmo.wijribbon.js
*  
* HTML Markup:
*  <div id="elementId">
*  </div>
*/

(function ($) {
	"use strict";

	var wijAlert = alert,
		wijWindow = window,
		wijDoc = document,
		wijParseInt = parseInt,

		oriWidth, oriHeight,
		$oriParent, $ribbon, $modes,

		uniqueIds = [],
	//fullScreen = false,
		isFontSizeCustomized = null,
		wordwrap = true,
		tblBorderShowing = true,
		undoSteps = 0,
		undoBuffers = [],
		rangeSelection = null,
		inspectElement = null,
		id_prefix = "wijeditor-",
		setButtonDisabled = "setButtonDisabled",
		setButtonsDisabled = "setButtonsDisabled",
		setButtonChecked = "setButtonChecked",
		setButtonsChecked = "setButtonsChecked",

		cmd_form = "form",
		cmd_imagebutton = "imagebutton",
		cmd_textarea = "textarea",
		cmd_button = "button",
		cmd_textbox = "textbox",
		cmd_listbox = "list",
		cmd_password = "passwordfield",
		cmd_dropdownlist = "dropdownlist",
		cmd_hiddenfield = "hiddenfield",
		cmd_radio = "radio",
		cmd_checkbox = "checkbox",
		cmd_insertcolumn = "insertcol",
		cmd_insertrow = "insertrow",
		cmd_insertcell = "insertcell",
		cmd_splitcell = "splitcell",
		cmd_mergecell = "mergecell",
		cmd_removecolumn = "deletecol",
		cmd_removerow = "deleterow",
		cmd_removecell = "deletecell",
		cmd_alignleft = "justifyleft",
		cmd_aligncenter = "justifycenter",
		cmd_alignright = "justifyright",
		cmd_alignfull = "justifyfull",
		cmd_borders = "borders",
		cmd_numberedlist = "insertorderedlist",
		cmd_bulletedlist = "insertunorderedlist",
		cmd_outdent = "outdent",
		cmd_indent = "indent",
		cmd_backcolor = "backcolor",
		cmd_fontcolor = "fontcolor",
		cmd_bold = "bold",
		cmd_italic = "italic",
		cmd_strike = "strikethrough",
		cmd_underline = "underline",
		cmd_subscript = "subscript",
		cmd_superscript = "superscript",
		cmd_template = "template",
		cmd_removeformat = "removeformat",
		cmd_insertbreak = "insertbreak",
		cmd_insertparagraph = "insertparagraph",
		cmd_insertprintbreak = "insertprintpagebreak",
		cmd_inserthr = "inserthorizontalrule",
		cmd_table = "tablebutton",
		cmd_inserttable = "inserttable",
		cmd_edittable = "edittable",
		cmd_designview = "wysiwyg",
		cmd_splitview = "split",
		cmd_sourceview = "code",
		cmd_wordwrap = "wordwrap",
		cmd_fullscreen = "fullscreen",
		cmd_undo = "undo",
		cmd_redo = "redo",
		cmd_preview = "preview",
		cmd_cleanup = "cleanup",
		cmd_cut = "cut",
		cmd_copy = "copy",
		cmd_paste = "paste",
		cmd_selectall = "selectall",
		cmd_media = "media",
		cmd_specialchar = "specialchar",
		cmd_date = "datetime",
		cmd_find = "find",
		cmd_inspect = "inspect",
		cmd_save = "save",
		cmd_spelling = "spelling",
		cmd_imagebrowser = "imagebrowser",
		cmd_link = "link",
		cmd_verysmall = "xx-small",
		cmd_smaller = "x-small",
		cmd_small = "small",
		cmd_medium = "medium",
		cmd_large = "large",
		cmd_larger = "x-large",
		cmd_verylarge = "xx-large",
		cmd_fontname = "fontname",
		cmd_fontsize = "fontsize",
		cmd_blockquote = "blockquote",
		cmd_insertcode = "insertcode",

		css_ribbon = "wijmo-wijribbon",
		css_ribbon_bigbutton = css_ribbon + "-bigbutton",
		css_ribbon_dropdownbutton = css_ribbon + "-dropdownbutton",
		css_ribbon_splitbutton = css_ribbon + "-splitbutton",

		css_ribbon_list = css_ribbon + "-list",
		css_ribbon_save = css_ribbon + "-save",
		css_ribbon_save16 = css_ribbon + "-save16",
		css_ribbon_undo = css_ribbon + "-undo",
		css_ribbon_redo = css_ribbon + "-redo",
		css_ribbon_preview = css_ribbon + "-preview",
		css_ribbon_cleanup = css_ribbon + "-cleanup",
		css_ribbon_cut = css_ribbon + "-cut",
		css_ribbon_copy = css_ribbon + "-copy",
		css_ribbon_paste = css_ribbon + "-paste",
		css_ribbon_selectall = css_ribbon + "-selectall",
		css_ribbon_bgcolor = css_ribbon + "-bgcolor",
		css_ribbon_color = css_ribbon + "-color",
		css_ribbon_bold = css_ribbon + "-bold",
		css_ribbon_italic = css_ribbon + "-italic",
		css_ribbon_underline = css_ribbon + "-underline",
		css_ribbon_strike = css_ribbon + "-strike",
		css_ribbon_sub = css_ribbon + "-sub",
		css_ribbon_sup = css_ribbon + "-sup",
		css_ribbon_template = css_ribbon + "-template",
		css_ribbon_removeformat = css_ribbon + "-removeformat",
		css_ribbon_justifyleft = css_ribbon + "-justifyleft",
		css_ribbon_justifycenter = css_ribbon + "-justifycenter",
		css_ribbon_justifyright = css_ribbon + "-justifyright",
		css_ribbon_justifyfull = css_ribbon + "-justifyfull",
		css_ribbon_borders = css_ribbon + "-borders",
		css_ribbon_orderlist = css_ribbon + "-orderlist",
		css_ribbon_unorderlist = css_ribbon + "-unorderlist",
		css_ribbon_outdent = css_ribbon + "-outdent",
		css_ribbon_indent = css_ribbon + "-indent",
		css_ribbon_inspect = css_ribbon + "-inspect",
		css_ribbon_find = css_ribbon + "-find",
		css_ribbon_table = css_ribbon + "-table",
		css_ribbon_inserttable = css_ribbon + "-inserttable",
		css_ribbon_edittable = css_ribbon + "-edittable",
		css_ribbon_insertcol = css_ribbon + "-insertcol",
		css_ribbon_insertrow = css_ribbon + "-insertrow",
		css_ribbon_insertcell = css_ribbon + "-insertcell",
		css_ribbon_splitcell = css_ribbon + "-splitcell",
		css_ribbon_mergecell = css_ribbon + "-mergecell",
		css_ribbon_deletecol = css_ribbon + "-deletecol",
		css_ribbon_deleterow = css_ribbon + "-deleterow",
		css_ribbon_deletecell = css_ribbon + "-deletecell",
		css_ribbon_insertbreak = css_ribbon + "-insertbreak",
		css_ribbon_insertparagraph = css_ribbon + "-insertparagraph",
		css_ribbon_insertprintpagebreak = css_ribbon + "-insertprintpagebreak",
		css_ribbon_inserthr = css_ribbon + "-inserthr",
		css_ribbon_form = css_ribbon + "-form",
		css_ribbon_textarea = css_ribbon + "-textarea",
		css_ribbon_textbox = css_ribbon + "-textbox",
		css_ribbon_password = css_ribbon + "-password",
		css_ribbon_hiddenfield = css_ribbon + "-hiddenfield",
		css_ribbon_imagebutton = css_ribbon + "-imagebutton",
		css_ribbon_button = css_ribbon + "-button",
		css_ribbon_listbox = css_ribbon + "-listbox",
		css_ribbon_dropdownlist = css_ribbon + "-dropdownlist",
		css_ribbon_radio = css_ribbon + "-radio",
		css_ribbon_checkbox = css_ribbon + "-checkbox",
		css_ribbon_link = css_ribbon + "-link",
		css_ribbon_link16 = css_ribbon + "-link16",
		css_ribbon_imagebrowser = css_ribbon + "-imagebrowser",
		css_ribbon_media = css_ribbon + "-media",
		css_ribbon_specialchar = css_ribbon + "-specialchar",
		css_ribbon_datetime = css_ribbon + "-datetime",

		css_ribbon_blockquote = css_ribbon + "-blockquote",
		css_ribbon_insertcode = css_ribbon + "-insertcode",

		css_ribbon_modes = css_ribbon + "-modes",
		css_ribbon_designview = css_ribbon + "-designview",
		css_ribbon_sourceview = css_ribbon + "-sourceview",
		css_ribbon_splitview = css_ribbon + "-splitview",
		css_ribbon_wordwrap = css_ribbon + "-wordwrap",
		css_ribbon_fullscreen = css_ribbon + "-fullscreen",

		css_editor = "wijmo-wijeditor",
		css_editor_container = css_editor + "-container",
		css_editor_header = css_editor + "-header",
		css_editor_content = css_editor + "-content",
		css_editor_footer = css_editor + "-footer",
		css_editor_pathselector = css_editor + "-pathselector",
		css_editor_fullscreen = css_editor + "-fullscreen",

		css_dlg = css_editor + "-dialog",
		css_dlg_hr = css_dlg + "-hr",
		css_dlg_buttons = css_dlg + "-buttons",
		css_dlg_button = css_dlg + "-button",
		css_dlg_text = css_dlg + "-text",

		css_imgdlg = css_editor + "-imagedlg",
		css_imgdlg_content = css_imgdlg + "-content",
		css_imgdlg_fields = css_imgdlg + "-fields",
		css_imgdlg_field = css_imgdlg + "-imagefield",
		css_imgdlg_list = css_imgdlg + "-imagelist",
		css_imgdlg_preview = css_imgdlg + "-preview",
		css_imgdlg_url = css_imgdlg + "-imagesrc",
		css_imgdlg_alt = css_imgdlg + "-imagealt",
		css_imgdlg_width = css_imgdlg + "-imagewidth",
		css_imgdlg_height = css_imgdlg + "-imageheight",
		css_imgdlg_css = css_imgdlg + "-css",
		css_imgdlg_hideimglist = css_imgdlg + "-hideimagelist",

		css_tpldlg = css_editor + "-templatedlg",
		css_tpl_labels = css_tpldlg + "-toplabels",
		css_tpl_tllabel = css_tpldlg + "-topleftlabel",
		css_tpl_trlabel = css_tpldlg + "-toprightlabel",
		css_tpl_content = css_tpldlg + "-content",
		css_tpl_list = css_tpldlg + "-templatelist",
		css_tpl_preview = css_tpldlg + "-preview",
		css_tpl_tplinfo = css_tpldlg + "-templateinfo",
		css_tpl_nameinfo = css_tpldlg + "-nameinfo",
		css_tpl_desinfo = css_tpldlg + "-descriptioninfo",
		css_tpl_fields = css_tpldlg + "-fields",
		css_tpl_namefield = css_tpldlg + "-name",
		css_tpl_desfield = css_tpldlg + "-description",
		css_tpl_buttons = css_tpldlg + "-buttons",
		css_tpl_delete = css_tpldlg + "-delete",
		css_tpl_save = css_tpldlg + "-save",

		css_linkdlg = css_editor + "-linkdlg",
		css_linkdlg_address = css_linkdlg + "-address",
		css_linkdlg_linktype = css_linkdlg + "-linktype",
		css_linkdlg_anchor = css_linkdlg + "-anchor",
		css_linkdlg_text = css_linkdlg + "-text",
		css_linkdlg_target = css_linkdlg + "-target",
		css_linkdlg_css = css_linkdlg + "-css",

		css_codedlg = css_editor + "-codedlg",
		css_codedlg_source = css_codedlg + "-source",
		css_codedlg_sourcelabel = css_codedlg + "-sourcelabel",

		css_taginsdlg = css_editor + "-taginsdlg",
		css_taginsdlg_caption = css_taginsdlg + "-caption",
		css_taginsdlg_taglabel = css_taginsdlg + "-taglabel",
		css_taginsdlg_tagtext = css_taginsdlg + "-tagtext",
		css_taginsdlg_filterempty = css_taginsdlg + "-filterempty",
		css_taginsdlg_attribs = css_taginsdlg + "-attribs",
		css_taginsdlg_attriblist = css_taginsdlg + "-attriblist",
		css_taginsdlg_innerhtml = css_taginsdlg + "-innerhtml",
		css_taginsdlg_css = css_taginsdlg + "-css",

		css_colordlg = css_editor + "-colordlg",
		css_colordlg_picker = css_colordlg + "-picker",
		css_colordlg_color = css_colordlg + "-color",

		css_tabledlg = css_editor + "-tabledlg",
		css_tabledlg_rows = css_tabledlg + "-rows",
		css_tabledlg_columns = css_tabledlg + "-columns",
		css_tabledlg_width = css_tabledlg + "-width",
		css_tabledlg_height = css_tabledlg + "-height",
		css_tabledlg_border = css_tabledlg + "-border",
		css_tabledlg_cellpadding = css_tabledlg + "-cellpadding",
		css_tabledlg_cellspacing = css_tabledlg + "-cellspacing",
		css_tabledlg_csstext = css_tabledlg + "-csstext",
		css_tabledlg_bgcolor = css_tabledlg + "-bgcolor",

		css_previewdlg = css_editor + "-previewdlg",
		css_previewdlg_caption = css_previewdlg + "-caption",
		css_previewdlg_navigator = css_previewdlg + "-navigator",
		css_previewdlg_prev = css_previewdlg + "-prev",
		css_previewdlg_next = css_previewdlg + "-next",
		css_previewdlg_printall = css_previewdlg + "-printall",
		css_previewdlg_printone = css_previewdlg + "-printone",
		css_previewdlg_ok = css_previewdlg + "-ok",
		css_previewdlg_printdocument = css_previewdlg + "-printdocument",
		css_previewdlg_previewiframe = css_previewdlg + "-previewiframe",

		css_cleanupdlg = css_editor + "-cleanupdlg",
		css_cleanupdlg_caption = css_cleanupdlg + "-caption",
		css_cleanupdlg_document = css_cleanupdlg + "-document",
		css_cleanupdlg_actions = css_cleanupdlg + "-actions",

		css_finddlg = css_editor + "-finddlg",
		css_finddlg_find = css_finddlg + "-find",
		css_finddlg_replace = css_finddlg + "-replace",

		css_mediadlg = css_editor + "-mediadlg",
		css_mediadlg_type = css_mediadlg + "-type",
		css_mediadlg_url = css_mediadlg + "-src",
		css_mediadlg_width = css_mediadlg + "-width",
		css_mediadlg_height = css_mediadlg + "-height",

		css_specialchardlg = css_editor + "-specialchardlg",
		css_specialchardlg_chars = css_specialchardlg + "-chars",
		css_specialchardlg_preview = css_specialchardlg + "-preview",
		css_specialchardlg_content = css_specialchardlg + "-content",
		css_specialchardlg_list = css_specialchardlg + "-list",
		css_specialchardlg_label = css_specialchardlg + "_label",
		css_specialchardlg_punctuation = css_specialchardlg + "-punctuation",
		css_specialchardlg_symbols = css_specialchardlg + "-symbols",
		css_specialchardlg_diacritics = css_specialchardlg + "-diacritics",

		css_formatspan = "wijmo-formatspan",

		selector_dlg_ok = "." + css_dlg_buttons + " input:first",
		selector_dlg_cancel = "." + css_dlg_buttons + " input:last",
		
		selector_input_ok = "." + css_dlg_buttons + " input[value='OK']",
		selector_input_cancel = "." + css_dlg_buttons + " input[value='Cancel']",

		imageTypeButton = ["Bold", "Italic", "UnderLine",
							"StrikeThrough", "SubScript", "SuperScript",
							"JustifyLeft", "JustifyCenter", "JustifyRight",
							"JustifyFull", "Border", "NumberedList",
							"BulletedList", "Outdent", "Indent"],

		defaultSimpleModeCommands = ["Bold", "Italic", "Link", "BlockQuote",
									"StrikeThrough", "InsertDate", "InsertImage",
									"NumberedList", "BulletedList", "InsertCode"],

		defaultBBCodeModeCommands = ["Bold", "Italic", "StrikeThrough",
									"UnderLine", "ForeColor", "FontSize",
									"Link", "InsertImage", "NumberedList",
									"BulletedList", "BlockQuote"],

	buttonInfoAsCommand = {
		Form: { name: "form", tip: 'Form', css: css_ribbon_form },
		Image: { name: "imagebutton", tip: 'Image Button', css: css_ribbon_imagebutton },
		TextArea: { name: "textarea", tip: 'TextArea', css: css_ribbon_textarea },
		Button: { name: "button", tip: 'Button', css: css_ribbon_button },
		TextBox: { name: "textbox", tip: 'TextBox', css: css_ribbon_textbox },
		List: { name: "list", tip: 'ListBox', css: css_ribbon_listbox },
		PasswordField: { name: "passwordfield", tip: 'Password Field',
			css: css_ribbon_password
		},
		DropDownList: { name: "dropdownlist", tip: 'DropDownList',
			css: css_ribbon_dropdownlist
		},
		HiddenField: { name: "hiddenfield", tip: 'Hidden Field',
			css: css_ribbon_hiddenfield
		},
		Radio: { name: "radio", tip: 'RadioButton', css: css_ribbon_radio },
		CheckBox: { name: "checkbox", tip: 'CheckBox',
			css: css_ribbon_checkbox
		},
		InsertColumn: { name: "insertcol", tip: 'Insert Column',
			css: css_ribbon_insertcol
		},
		InsertRow: { name: "insertrow", tip: 'Insert Row',
			css: css_ribbon_insertrow
		},
		InsertCell: { name: "insertcell", tip: 'Insert Cell',
			css: css_ribbon_insertcell
		},
		SplitCell: { name: "splitcell", tip: 'Split Cell',
			css: css_ribbon_splitcell
		},
		MergeCell: { name: "mergecell", tip: 'Merge Cell',
			css: css_ribbon_mergecell
		},
		DeleteColumn: { name: "deletecol", tip: 'Delete Column',
			css: css_ribbon_deletecol
		},
		DeleteRow: { name: "deleterow", tip: 'Delete Row',
			css: css_ribbon_deleterow
		},
		DeleteCell: { name: "deletecell", tip: 'Delete Cell',
			css: css_ribbon_deletecell
		},
		JustifyLeft: { name: "justifyleft", tip: 'Justify Left',
			css: css_ribbon_justifyleft, grpname: 'alignment'
		},
		JustifyCenter: { name: "justifycenter", tip: 'Justify Center',
			css: css_ribbon_justifycenter, grpname: 'alignment'
		},
		JustifyRight: { name: "justifyright", tip: 'Justify Right',
			css: css_ribbon_justifyright, grpname: 'alignment'
		},
		JustifyFull: { name: "justifyfull", tip: 'Justify Full',
			css: css_ribbon_justifyfull, grpname: 'alignment'
		},
		Border: { name: "borders", tip: 'Border', css: css_ribbon_borders },
		NumberedList: { name: "insertorderedlist", tip: 'Numbered List',
			css: css_ribbon_orderlist, grpname: 'list'
		},
		BulletedList: { name: "insertunorderedlist", tip: 'Bulleted List',
			css: css_ribbon_unorderlist, grpname: 'list'
		},
		Outdent: { name: "outdent", tip: 'Outdent',
			css: css_ribbon_outdent, grpname: 'block'
		},
		Indent: { name: "indent", tip: 'Indent',
			css: css_ribbon_indent, grpname: 'block'
		},
		BackColor: { name: "backcolor", tip: 'Background Color',
			css: css_ribbon_bgcolor
		},
		ForeColor: { name: "fontcolor", tip: 'Font Color',
			css: css_ribbon_color
		},
		Bold: { name: "bold", tip: 'Bold',
			css: css_ribbon_bold
		},
		Italic: { name: "italic", tip: 'Italic', css: css_ribbon_italic },
		StrikeThrough: { name: "strikethrough", tip: 'Strikethrough',
			css: css_ribbon_strike
		},
		UnderLine: { name: "underline", tip: 'Underline',
			css: css_ribbon_underline
		},
		SubScript: { name: "subscript", tip: 'Subscript',
			css: css_ribbon_sub
		},
		SuperScript: { name: "superscript", tip: 'Superscript',
			css: css_ribbon_sup
		},
		Template: { name: "template", tip: 'Template',
			css: css_ribbon_template
		},
		RemoveFormat: { name: "removeformat", tip: 'RemoveFormat',
			css: css_ribbon_removeformat
		},
		InsertBreak: { name: "insertbreak", tip: 'Insert Break',
			css: css_ribbon_insertbreak
		},
		InsertParagraph: { name: "insertparagraph", tip: 'Insert Paragraph',
			css: css_ribbon_insertparagraph
		},
		InsertPrint: { name: "insertprintpagebreak", tip: 'Insert Print Page Break',
			css: css_ribbon_insertprintpagebreak
		},
		InsertHR: { name: "inserthorizontalrule", tip: 'Insert Horizontal Line',
			css: css_ribbon_inserthr
		},
		Table: { name: "tablebutton", tip: 'Table',
			css: css_ribbon_table
		},
		InsertTable: { name: "inserttable", tip: 'Insert Table',
			css: css_ribbon_inserttable
		},
		EditTable: { name: "edittable", tip: 'Edit Table',
			css: css_ribbon_edittable
		},
		Wysiwyg: { name: "wysiwyg", tip: 'Design View',
			css: css_ribbon_designview, grpname: 'modes'
		},
		Split: { name: "split", tip: 'Split View',
			css: css_ribbon_splitview, grpname: 'modes'
		},
		Code: { name: "code", tip: 'Source View',
			css: css_ribbon_sourceview, grpname: 'modes'
		},
		Wordwrap: { name: "wordwrap", tip: 'Wordwrap',
			css: css_ribbon_wordwrap
		},
		FullScreen: { name: "fullscreen", tip: 'Fullscreen',
			css: css_ribbon_fullscreen
		},
		Undo: { name: "undo", tip: 'Undo', css: css_ribbon_undo },
		Redo: { name: "redo", tip: 'Redo', css: css_ribbon_redo },
		Preview: { name: "preview", tip: 'Preview', css: css_ribbon_preview },
		Cleanup: { name: "cleanup", tip: 'Clean up', css: css_ribbon_cleanup },
		Cut: { name: "cut", tip: 'Cut', css: css_ribbon_cut },
		Copy: { name: "copy", tip: 'Copy', css: css_ribbon_copy },
		Paste: { name: "paste", tip: 'Paste', css: css_ribbon_paste },
		SelectAll: { name: "selectall", tip: 'Select All',
			css: css_ribbon_selectall
		},
		Media: { name: "media", tip: 'Media', css: css_ribbon_media },
		InsertSpecialChar: { name: "specialchar", tip: 'Insert Special Character',
			css: css_ribbon_specialchar
		},
		InsertDate: { name: "datetime", tip: 'Insert Date Time',
			css: css_ribbon_datetime
		},
		Find: { name: "find", tip: 'Find And Replace',
			css: css_ribbon_find, text: 'Find'
		},
		Inspect: { name: "inspect", tip: 'Tag Inspect',
			css: css_ribbon_inspect, text: 'Inspect'
		},
		Save: { name: "save", tip: 'Form', css: css_ribbon_save, text: 'Save' },
		Spelling: { name: "spelling", tip: 'Form', css: '' },
		InsertImage: { name: "imagebrowser", tip: 'Image Browser',
			css: css_ribbon_imagebrowser
		},
		Link: { name: "link", tip: 'Link', css: css_ribbon_link, text: 'Link' },
		//xx-small: {tip: 'Form', css: css_ribbon_form},
		//x-small: {tip: 'Form', css: css_ribbon_form},
		//small: { tip: 'Form', css: css_ribbon_form },
		//medium: { tip: 'Form', css: css_ribbon_form },
		//large: { tip: 'Form', css: css_ribbon_form },
		//x-large: {tip: 'Form', css: css_ribbon_form},
		//xx-large: {tip: 'Form', css: css_ribbon_form},
		FontName: { name: "fontname", tip: 'Font Name',
			css: css_ribbon_dropdownbutton
		},
		FontSize: { name: "fontsize", tip: 'Font Size',
			css: css_ribbon_dropdownbutton
		},
		BlockQuote: { name: "blockquote", tip: 'Block Quote',
			css: css_ribbon_blockquote
		},
		InsertCode: { name: "insertcode", tip: 'Insert Code',
			css: css_ribbon_insertcode
		}
	},

	StringBuilder = function () {
		var self = this,
			strs = [];

		self.append = function (str) {
			strs.push(str);
		};

		self.toString = function () {
			return strs.join("");
		};

		self.dispose = function () {
			strs = null;
		};
	},

	TextElement = function (text) {
		this.text = text;

		this.render = function () {
			return this.text;
		};
	},

	HtmlElement = function (tagName, innerText, attributes) {
		var self = this,
			halfTags = { br: true, img: true, hr: true, input: true };

		self.tagName = tagName || "div";
		self.attributes = attributes || {};
		self.innerText = innerText || "";
		self.children = [];

		if ($.isPlainObject(innerText)) {
			self.innerText = "";
			self.attributes = innerText;
		}

		self._isShortTag = false;

		if (halfTags[self.tagName] === true) {
			self._isShortTag = true;
		}

		self.render = function () {
			var sb = new StringBuilder(),
			html = "";

			sb.append(self._renderBeginTag(self.tagName, self.attributes));
			if (self.innerText !== "") {
				sb.append(self.innerText);
			}

			if (self.children.length > 0) {
				$.each(self.children, function (index, ele) {
					sb.append(ele.render());
				});
			}

			sb.append(self._renderEndTag(self.tagName));
			html = sb.toString();
			sb.dispose();

			return html;
		};

		self.add = function (ele) {
			this.children.push(ele);
		};

		self._renderBeginTag = function (tagName, attributes) {
			var sb = new StringBuilder(),
				strRet = "";
			sb.append("<");
			sb.append(tagName);
			$.each(attributes, function (key, value) {
				sb.append(" ");
				sb.append(key);
				sb.append("=");
				sb.append("\"");
				sb.append(value.toString());
				sb.append("\"");
			});

			if (this._isShortTag) {
				sb.append(" ");
			} else {
				sb.append(">");
			}

			strRet = sb.toString();
			sb.dispose();

			return strRet;
		};

		self._renderEndTag = function (tagName) {
			var sb = new StringBuilder(),
				strRet = "";

			if (this._isShortTag) {
				sb.append("/>");
			} else {
				sb.append("</");
				sb.append(tagName);
				sb.append(">");
			}
			strRet = sb.toString();
			sb.dispose();
			return strRet;
		};
	};

	$.widget("wijmo.wijeditor", {
		options: {
			/// <summary>
			/// Use this option to specify container which will be used 
			/// as the parent control for FullScreenMode instead 
			/// of client's area on the web page.
			/// Default: ''.
			/// Type: String.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      fullScreenContainerSelector: "container"
			///  });
			/// </summary>
			fullScreenContainerSelector: "",
			/// <summary>
			/// Use this option to set the edit mode.
			/// It has three options: wysiwyg/code/split.
			/// Default: 'wysiwyg'.
			/// Type: String.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      editorMode: "code"
			///  });
			/// </summary>
			editorMode: "wysiwyg",
			/// <summary>
			/// Use Set this option to true if you want to 
			/// switch the editor to FullScreen Mode. 
			/// All client area of the page will be covered by WebEditor. 
			/// Default: false.
			/// Type: Boolean.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      fullScreenMode: true
			///  });
			/// </summary>
			fullScreenMode: false,
			/// <summary>
			/// Use this option to indicate whether to show the path selector.
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      showPathSelector: false
			///  });
			/// </summary>
			showPathSelector: true,
			/// <summary>
			/// Use this option to specify which toolbar(ribbon/simple/bbcode)
			/// should be rendered.
			/// Default: "ribbon".
			/// Type: String.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      mode: "simple"
			///  });
			/// </summary>
			mode: "ribbon",
			/// <summary>
			/// Occurs when the command button is clicked.
			/// Default: null.
			/// Type: Function.
			/// Code example:
			/// Supply a function as an option.
			/// $("#wijeditor").wijeditor({commandButtonClick: function(e, data) { } });
			/// Bind to the event by type: wijeditorcommandButtonClick
			/// $("#wijeditor")
			///.bind("wijeditorcommandButtonClick", function(e, data) {} );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			/// </param>
			/// <param name="data" type="Object">
			/// An object that contains all command infos of the clicked command button.
			/// data.commandName: the command name of the button.
			/// data.name: the parent name of the button which means 
			///     if the drop down item is clicked, 
			///     then the name specifies the command name of the drop down button.
			///     Says that VeryLarge font size is clicked, 
			///     then commandName = "verylarge", name = "fontsize".
			/// </param>
			commandButtonClick: null,
			/// <summary>
			/// Use this option to custom simple toolbar.
			/// Default: null.
			/// Type: Array.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///		 mode: "simple",
			///      simpleModeCommands: ["Bold","Undo"]
			///  });
			/// Note: The buildin simple commands support the following commands:
			/// "Form","Image","TextArea","Button","TextBox","List","DropDownList",
			/// "HiddenField","Radio","CheckBox","JustifyLeft,"JustifyCenter",
			/// "JustifyRight","JustifyFull","Border","NumberedList","BulletedList",
			/// "Outdent","Indent","BackColor","ForeColor","Bold","Italic","UnderLine",
			/// "SubScript","SuperScript","Template","RemoveFormat","InsertBreak",
			/// "InsertParagraph","InsertPrint","InsertHR","Undo","Redo","Preview","Cleanup",
			/// "Cut","Copy","Paste","SelectAll","Media","InsertSpecialChar","InsertDate","Find",
			/// "Inspect","Spelling","InsertImage","Link","FontName","FontSize","BlockQuote","InsertCode"
			/// The default simple mode commands are:
			/// ["Bold", "Italic", "Link", "BlockQuote",
			/// "StrikeThrough", "InsertDate", "InsertImage",
			/// "NumberedList", "BulletedList", "InsertCode"]
			/// </summary>
			simpleModeCommands: null,
			/// <summary>
			/// Use this option to indicate whether to show the footer.
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      showFooter: false
			///  });
			/// </summary>
			showFooter: true,
			/// <summary>
			/// Determine if the custom context menu should be shown.
			/// (The context menu is invalid in Chrome & Safari)
			/// Default: true.
			/// Type: Boolean.
			/// Code example:
			///  $("#wijeditor").wijeditor({
			///      customContextMenu: false
			///  });
			/// </summary>
			customContextMenu: true
		},

		_create: function () {
			var self = this;

			//update for fixing bug 18157 at 2011/11/5 by wh
			if (self.element.is("input")) {
				return;
			}
			//end for 18157

			self._editorify();
			self._initElements();

			wijWindow.setTimeout(function () {
				if (self.options.disabled) {
					self._handleDisabledOption(true, self.editor);
				}
			}, 40);
			
			//add for fixing issue 20372 by wh at 2012/3/9
			self._continueSavingInputTextForUndo = false;
			//enf for 20372
		},

		_createBigButton: function (tip, css, name, text) {
			var self = this,
				button = self._createElement("button", {
					title: tip,
					name: name,
					"class": css_ribbon_bigbutton
				});

			button.add(self._createDiv(css));
			button.add(self._createSpan("", text));

			return button;
		},

		_createTextButton: function (tip, name, text) {
			return this._createElement("button", text, {
				title: tip,
				name: name
			});
		},

		_createButton: function (tip, css, name, text) {
			var self = this,
				button;

			if (!text) {
				return self._createElement("button", {
					title: tip,
					name: name,
					"class": css
				});
			}

			button = self._createElement("button", {
				title: tip,
				name: name
			});
			button.add(self._createSpan(css));
			button.add(self._createSpan("", text));

			return button;
		},

		_createTextRadioButton: function (tip, idPre, name, grpName, text) {
			var self = this,
				buttons = [];

			buttons.push(self._createElement("input", {
				id: idPre + name,
				type: "radio",
				name: grpName
			}));
			buttons.push(self._createElement("label", text, {
				"for": idPre + name,
				title: tip,
				name: name
			}));

			return buttons;
		},

		_createImageRadioButton: function (tip, idPre, css, name, grpName) {
			var self = this,
				buttons = [];

			buttons.push(self._createElement("input", {
				id: idPre + name,
				type: "radio",
				name: grpName
			}));
			buttons.push(self._createElement("label", {
				"for": idPre + name,
				title: tip,
				name: name,
				"class": css
			}));

			return buttons;
		},

		_createImageCheckButton: function (tip, idPre, css, name) {
			var self = this,
				buttons = [];

			buttons.push(self._createElement("input", {
				id: idPre + name,
				type: "checkbox"
			}));
			buttons.push(self._createElement("label", {
				"for": idPre + name,
				title: tip,
				name: name,
				"class": css
			}));

			return buttons;
		},

		_createRibbonList: function () {
			return this._createSpan(css_ribbon_list);
		},

		_createDropdownButton: function (tip, name, text, items, idPrefix) {
			var self = this,
				divBtn = self._createElement("div", {
					title: tip,
					"class": css_ribbon_dropdownbutton
				}),
				ulDrpList = self._createElement("ul");

			divBtn.add(self._createTextButton(tip, name, text));
			divBtn.add(ulDrpList);

			$.each(items, function (idx, item) {
				var liDrpBtn = self._createElement("li"),
					btns = self._createTextRadioButton(item.tip,
							idPrefix, item.name, name, item.text);

				$.each(btns, function (i, btn) {
					liDrpBtn.add(btn);
				});

				ulDrpList.add(liDrpBtn);
			});

			return divBtn;
		},

		_createSplitButton: function (tip, css, name, text, items) {
			var self = this,
				divBtn = self._createElement("div", {
					title: tip,
					"class": css_ribbon_splitbutton
				}),
				ulDrpList = self._createElement("ul");

			divBtn.add(self._createBigButton(tip, css, name, text));
			divBtn.add(self._createElement("button", {
				"class": css_ribbon_bigbutton
			}));
			divBtn.add(ulDrpList);

			$.each(items, function (idx, item) {
				var liDrpBtn = self._createElement("li");

				liDrpBtn.add(self._createButton(item.tip,
						item.css, item.name, item.text));

				ulDrpList.add(liDrpBtn);
			});

			return divBtn;
		},

		//get special button
		_createButtonByCommand: function (cmd) {
			var self = this, button,
			buttoninfo = buttonInfoAsCommand[cmd],
			cmdName;

			if (!buttoninfo) {
				return;
			}

			cmdName = buttoninfo.name;
			switch (cmdName) {
			case cmd_blockquote:
			case cmd_form:
			case cmd_imagebutton:
			case cmd_textarea:
			case cmd_button:
			case cmd_textbox:
			case cmd_listbox:
			case cmd_password:
			case cmd_dropdownlist:
			case cmd_hiddenfield:
			case cmd_radio:
			case cmd_checkbox:
			case cmd_insertcolumn:
			case cmd_insertrow:
			case cmd_insertcell:
			case cmd_splitcell:
			case cmd_mergecell:
			case cmd_removecolumn:
			case cmd_removerow:
			case cmd_removecell:
			case cmd_removeformat:
			case cmd_insertbreak:
			case cmd_insertparagraph:
			case cmd_insertprintbreak:
			case cmd_fullscreen:
			case cmd_undo:
			case cmd_redo:
			case cmd_cut:
			case cmd_copy:
			case cmd_paste:
			case cmd_date:
			case cmd_wordwrap:
			case cmd_backcolor:
			case cmd_fontcolor:
			case cmd_preview:
			case cmd_cleanup:
			case cmd_media:
			case cmd_specialchar:
			case cmd_template:
			case cmd_imagebrowser:
			case cmd_insertcode:
			case cmd_inserthr:
			case cmd_selectall:
				button = self._createButton(buttoninfo.tip,
				buttoninfo.css, cmdName);
				break;
			case cmd_find:
			case cmd_inspect:
				button = self._createButton(buttoninfo.tip,
				buttoninfo.css, cmdName, buttoninfo.text);
				break;
			case cmd_borders:
			case cmd_subscript:
			case cmd_superscript:
			case cmd_bold:
			case cmd_italic:
			case cmd_underline:
			case cmd_strike:
				button = self._createImageCheckButton(buttoninfo.tip, id_prefix,
				buttoninfo.css, cmdName);
				break;
			case cmd_designview:
			case cmd_splitview:
			case cmd_sourceview:
			case cmd_alignleft:
			case cmd_aligncenter:
			case cmd_alignright:
			case cmd_alignfull:
			case cmd_outdent:
			case cmd_indent:
			case cmd_numberedlist:
			case cmd_bulletedlist:
				button = self._createImageRadioButton(buttoninfo.tip, id_prefix,
				buttoninfo.css, cmdName, buttoninfo.grpname);
				break;
			case cmd_table:
				button = self._createSplitButton("Table", css_ribbon_table,
				cmd_table, "Table", [{
					tip: "Insert Table",
					css: css_ribbon_inserttable,
					name: cmd_inserttable,
					text: "Insert"
				}, {
					tip: "Edit Table",
					css: css_ribbon_edittable,
					name: cmd_edittable,
					text: "Edit"
				}]);
				break;

			case cmd_save:
				if (self.options.mode === "ribbon") {
					button = self._createBigButton(buttoninfo.tip,
					buttoninfo.css, cmdName, buttoninfo.text);
				} else {
					button = self._createButton(buttoninfo.tip,
					css_ribbon_save16, cmdName);
				}
				break;
			case cmd_link:
				if (self.options.mode === "ribbon") {
					button = self._createBigButton(buttoninfo.tip,
					buttoninfo.css, cmdName, buttoninfo.text);
				} else {
					button = self._createButton(buttoninfo.tip,
					css_ribbon_link16, cmdName);
				}
				break;
			case cmd_fontname:
				button = self._createDropdownButton("Font Name",
				cmd_fontname, "Font Name", [{
					tip: "Arial",
					name: "fn1",
					text: "Arial"
				}, {
					tip: "Courier New",
					name: "fn2",
					text: "Courier New"
				}, {
					tip: "Garamond",
					name: "fn3",
					text: "Garamond"
				}, {
					tip: "Tahoma",
					name: "fn4",
					text: "Tahoma"
				}, {
					tip: "Times New Roman",
					name: "fn5",
					text: "Times New Roman"
				}, {
					tip: "Verdana",
					name: "fn6",
					text: "Verdana"
				}, {
					tip: "Wingdings",
					name: "fn7",
					text: "Wingdings"
				}], id_prefix);
				break;
			case cmd_fontsize:
				button = self._createDropdownButton("Font Size",
				cmd_fontsize, "Font Size", [{
					tip: "VerySmall",
					name: "xx-small",
					text: "VerySmall"
				}, {
					tip: "Smaller",
					name: "x-small",
					text: "Smaller"
				}, {
					tip: "Small",
					name: "small",
					text: "Small"
				}, {
					tip: "Medium",
					name: "medium",
					text: "Medium"
				}, {
					tip: "Large",
					name: "large",
					text: "Large"
				}, {
					tip: "Larger",
					name: "x-large",
					text: "Larger"
				}, {
					tip: "VeryLarge",
					name: "xx-large",
					text: "VeryLarge"
				}], id_prefix);
				break;
			case cmd_spelling:
				break;
			}

			return button;
		},

		//end of special button

		_createActionGroup: function () {
			var self = this,
				rbActionGrp = self._createElement("li"),
				rbList = self._createRibbonList();

			//save button
			rbActionGrp.add(self._createButtonByCommand("Save"));

			//undo/redo list
			rbActionGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Undo"));
			rbList.add(self._createButtonByCommand("Redo"));

			//preview/clean up list
			rbList = self._createRibbonList();
			rbActionGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Preview"));
			rbList.add(self._createButtonByCommand("Cleanup"));

			//cut/copy/paste list
			rbList = self._createRibbonList();
			rbActionGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Cut"));
			rbList.add(self._createButtonByCommand("Copy"));
			rbList.add(self._createButtonByCommand("Paste"));
			rbList.add(self._createButtonByCommand("SelectAll"));

			//action name
			rbActionGrp.add(self._createElement("div", "Actions"));

			return rbActionGrp;
		},

		_createFontGroup: function () {
			var self = this,
				rbFontGrp = self._createElement("li"),
				rbList = self._createRibbonList();

			//font name.
			rbFontGrp.add(self._createButtonByCommand("FontName"));

			//font size.
			rbFontGrp.add(self._createButtonByCommand("FontSize"));

			//bgcolor/fontcolor list
			rbFontGrp.add(rbList);
			rbList.add(self._createButtonByCommand("BackColor"));
			rbList.add(self._createButtonByCommand("ForeColor"));

			//bold/italic/underline/strike/sub/sup list
			rbList = self._createRibbonList();
			rbFontGrp.add(rbList);

			$.each(self._createButtonByCommand("Bold"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("Italic"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("UnderLine"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("StrikeThrough"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("SubScript"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("SuperScript"), function (idx, btn) {
				rbList.add(btn);
			});

			//template list
			rbList = self._createRibbonList();
			rbFontGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Template"));

			//remove format list
			rbList = self._createRibbonList();
			rbFontGrp.add(rbList);
			rbList.add(self._createButtonByCommand("RemoveFormat"));

			//action name
			rbFontGrp.add(self._createElement("div", "Font"));

			return rbFontGrp;
		},

		_createParaGroup: function () {
			var self = this,
				rbParaGrp = self._createElement("li"),
				rbList = self._createRibbonList();

			//justifyleft/justifycenter/justifyright/justifyfull list
			rbParaGrp.add(rbList);
			$.each(self._createButtonByCommand("JustifyLeft"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("JustifyCenter"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("JustifyRight"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("JustifyFull"), function (idx, btn) {
				rbList.add(btn);
			});

			//borders list
			rbList = self._createRibbonList();
			rbParaGrp.add(rbList);

			$.each(self._createButtonByCommand("Border"), function (idx, btn) {
				rbList.add(btn);
			});

			//numberedlist/bulletedlist list
			rbList = self._createRibbonList();
			rbParaGrp.add(rbList);

			$.each(self._createButtonByCommand("NumberedList"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("BulletedList"), function (idx, btn) {
				rbList.add(btn);
			});

			//outdent/indent list
			rbList = self._createRibbonList();
			rbParaGrp.add(rbList);

			$.each(self._createButtonByCommand("Outdent"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("Indent"), function (idx, btn) {
				rbList.add(btn);
			});

			//action name
			rbParaGrp.add(self._createElement("div", "Paragraph"));

			return rbParaGrp;
		},

		_createReviewGroup: function () {
			var self = this,
				rbReviewGrp = self._createElement("li");

			//inspect/find
			rbReviewGrp.add(self._createButtonByCommand("Inspect"));
			rbReviewGrp.add(self._createButtonByCommand("Find"));

			//action name
			rbReviewGrp.add(self._createElement("div", "Review"));

			return rbReviewGrp;
		},

		_createTablesGroup: function () {
			var self = this,
				rbTablesGrp = self._createElement("li"),
				rbList = self._createRibbonList();

			//table button
			rbTablesGrp.add(self._createButtonByCommand("Table"));

			//insertcol/insertrow/insertcell list
			rbTablesGrp.add(rbList);
			rbList.add(self._createButtonByCommand("InsertColumn"));
			rbList.add(self._createButtonByCommand("InsertRow"));
			rbList.add(self._createButtonByCommand("InsertCell"));

			//splitcell/mergecell/insertcell list
			rbList = self._createRibbonList();
			rbTablesGrp.add(rbList);
			rbList.add(self._createButtonByCommand("SplitCell"));
			rbList.add(self._createButtonByCommand("MergeCell"));

			//deletecol/deleterow/deletecell list
			rbList = self._createRibbonList();
			rbTablesGrp.add(rbList);
			rbList.add(self._createButtonByCommand("DeleteColumn"));
			rbList.add(self._createButtonByCommand("DeleteRow"));
			rbList.add(self._createButtonByCommand("DeleteCell"));

			//action name
			rbTablesGrp.add(self._createElement("div", "Tables"));

			return rbTablesGrp;
		},

		_createBreaksGroup: function () {
			var self = this,
				rbBreaksGrp = self._createElement("li");

			//insertbreak/insertparagraph/insertprintpagebreak/inserthr
			rbBreaksGrp.add(self._createButtonByCommand("InsertBreak"));
			rbBreaksGrp.add(self._createButtonByCommand("InsertParagraph"));
			rbBreaksGrp.add(self._createButtonByCommand("InsertPrint"));
			rbBreaksGrp.add(self._createButtonByCommand("InsertHR"));

			//action name
			rbBreaksGrp.add(self._createElement("div", "Breaks"));

			return rbBreaksGrp;
		},

		_createFormsGroup: function () {
			var self = this,
				rbFormsGrp = self._createElement("li"),
				rbList = self._createRibbonList();

			//form list
			rbFormsGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Form"));

			//textarea/textbox/password/hidden field list
			rbList = self._createRibbonList();
			rbFormsGrp.add(rbList);
			rbList.add(self._createButtonByCommand("TextArea"));
			rbList.add(self._createButtonByCommand("TextBox"));
			rbList.add(self._createButtonByCommand("PasswordField"));
			rbList.add(self._createButtonByCommand("HiddenField"));

			//image button/button list
			rbList = self._createRibbonList();
			rbFormsGrp.add(rbList);
			rbList.add(self._createButtonByCommand("Image"));
			rbList.add(self._createButtonByCommand("Button"));

			//listbox/dropdownlist/radio/checkbox list
			rbList = self._createRibbonList();
			rbFormsGrp.add(rbList);
			rbList.add(self._createButtonByCommand("List"));
			rbList.add(self._createButtonByCommand("DropDownList"));
			rbList.add(self._createButtonByCommand("Radio"));
			rbList.add(self._createButtonByCommand("CheckBox"));

			//action name
			rbFormsGrp.add(self._createElement("div", "Forms"));

			return rbFormsGrp;
		},

		_createSpecialGroup: function () {
			var self = this,
				rbSpecialGrp = self._createElement("li");

			//link button
			rbSpecialGrp.add(self._createButtonByCommand("Link"));

			//imagebrowser/media/specialchar/datetime list
			rbSpecialGrp.add(self._createButtonByCommand("InsertImage"));
			rbSpecialGrp.add(self._createButtonByCommand("Media"));
			rbSpecialGrp.add(self._createButtonByCommand("InsertSpecialChar"));
			rbSpecialGrp.add(self._createButtonByCommand("InsertDate"));

			//action name
			rbSpecialGrp.add(self._createElement("div", "Special"));

			return rbSpecialGrp;
		},

		_getDefaultRibbonMarkup: function () {
			var self = this,
				rb = self._createElement("div"),
				rbTabs = self._createElement("ul"),
				rbFmtTab = self._createElement("li"),
				rbIstTab = self._createElement("li"),
				rbFmtPnl = self._createElement("div", { id: id_prefix + "format" }),
				rbIstPnl = self._createElement("div", { id: id_prefix + "insert" }),
				rbFmtGrps = self._createElement("ul"),
				rbIstGrps = self._createElement("ul");

			//ribbon tab.
			rb.add(rbTabs);
			rb.add(rbFmtPnl);
			rb.add(rbIstPnl);

			rbTabs.add(rbFmtTab);
			rbTabs.add(rbIstTab);
			rbFmtTab.add(self._createElement("a", "Format", {
				href: "#" + id_prefix + "format"
			}));
			rbIstTab.add(self._createElement("a", "Insert", {
				href: "#" + id_prefix + "insert"
			}));

			//format groups
			rbFmtPnl.add(rbFmtGrps);
			//action group.
			rbFmtGrps.add(self._createActionGroup());
			//font group.
			rbFmtGrps.add(self._createFontGroup());
			//para group.
			rbFmtGrps.add(self._createParaGroup());
			//review group.
			rbFmtGrps.add(self._createReviewGroup());

			//insert groups
			rbIstPnl.add(rbIstGrps);
			//tables group.
			rbIstGrps.add(self._createTablesGroup());
			//breaks group.
			rbIstGrps.add(self._createBreaksGroup());
			//forms group.
			rbIstGrps.add(self._createFormsGroup());
			//special group.
			rbIstGrps.add(self._createSpecialGroup());

			return rb.render();
		},

		_getRibbonModesMarkup: function () {
			var self = this,
				rb = self._createDiv(css_ribbon_modes),
				rbList = self._createRibbonList();

			rb.add(rbList);

			$.each(self._createButtonByCommand("Wysiwyg"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("Code"), function (idx, btn) {
				rbList.add(btn);
			});

			$.each(self._createButtonByCommand("Split"), function (idx, btn) {
				rbList.add(btn);
			});

			rb.add(self._createButtonByCommand("Wordwrap"));
			rb.add(self._createButtonByCommand("FullScreen"));

			return rb.render();
		},

		_getSimpleToolBar: function (simpleModeCommands) {
			var self = this, button,
				rb = self._createDiv("");

			$.each(simpleModeCommands, function (idx, cmd) {
				button = self._createButtonByCommand(cmd);
				if (button) {
					if ($.inArray(cmd, imageTypeButton) !== -1) {
						$.each(button, function (idx, btn) {
							rb.add(btn);
						});
					} else {
						rb.add(button);
					}
				}
			});

			return rb.render();
		},

		_editorify: function () {
			var self = this,
				element = self.element,
				width = element.width(),
				height = element.height(),
				o = self.options,
				mode = o.mode,
				container, content,
				filterCustomSimpleModeCommands,
				ribbons,
				footer, $content, text;
			
			self._oriStyle = element.attr("style");
			self._oriContent = element.html();

			if (element.is("textarea")) {
				if (mode === "ribbon") {
					$ribbon = $(self._getDefaultRibbonMarkup());
				} else if (mode === "bbcode") {
					$ribbon = $(self._getSimpleToolBar(defaultBBCodeModeCommands));
				}
				else {
					if (o.simpleModeCommands && o.simpleModeCommands.length !== 0) {
						//Note: filter table command
						filterCustomSimpleModeCommands =
						$.grep(o.simpleModeCommands, function (n, i) {
							return n !== "Table";
						});
						$ribbon = 
						$(self._getSimpleToolBar(filterCustomSimpleModeCommands));
					} else {
						$ribbon = 
						$(self._getSimpleToolBar(defaultSimpleModeCommands));
					}
				}
				self.sourceView = element;
				self.editor = element.wrap("<div></div>").parent();
				self.editor.width(width).height(height);
			} else {
				self.editor = element;
				$ribbon = element.children(":eq(0)");
				$content = element.children(":eq(1)");

				if ($content.is("textarea")) {
					self.sourceView = $content;
				} else {
					text = $content.html();
					$content.remove();
					self.sourceView = $("<textarea></textarea>").val(text);
				}
			}

			container = $("<div class='" + css_editor_container + "'></div>");
			self.dialog = $("<div class ='" + css_editor + "'></div>");
			self.subDialog = $("<div class ='" + css_editor + "'></div>");
			self.editor.addClass(css_editor)
			.append(container)
			.append(self.dialog)
			.append(self.subDialog);

			//fixed bug for customContextMenu
			self._createMenuMarkUp(self, o);

			//head
			//ribbon
			$ribbon.wrap("<a href='#'></a>").parent()
			.appendTo("<div class='" + css_editor_header +
					" ui-widget-header ui-helper-clearfix ui-corner-top'></div>")
			.parent().appendTo(container);

			//content
			content = $("<div class='" + css_editor_content + "'></div>")
				.appendTo(container);

			self.designView = $("<iframe frameborder='0'></iframe>");

			self.designView.wrap("<div></div>")
				.parent().appendTo(content);
			self.sourceView.wrap("<div></div>")
				.parent().appendTo(content);

			ribbons = [$ribbon];
			$modes = $(self._getRibbonModesMarkup());
			//footer
			if (o.showFooter) {
				footer = $("<div class='" + css_editor_footer + " " +
				"ui-widget ui-widget-content ui-state-default'></div>");
				container.append(footer);
				footer.append("<div class='" + css_editor_pathselector + "'></div>");

				$modes.appendTo(footer);
				ribbons.push($modes);
			}

			$.each(ribbons, function (idx, ribbon) {
				ribbon.wijribbon({
					click: function (e, data) {
						self._ribbonCommand(data.commandName, data.name);
						self._trigger('commandButtonClick', e, data);
					}
				});
			});
		},

		//fixed bug for customContextMenu
		_createMenuMarkUp: function (self, o) {
			if (o.customContextMenu && !$.browser.webkit) {
				self.contextMenu = $("<ul>" +
				"<li _c1buttoncmd='cut'><a>Cut</a></li>" +
				"<li _c1buttoncmd='copy'><a>Copy</a></li>" +
				"<li _c1buttoncmd='paste'><a>Paste</a></li></ul>");

				$("<a href='#'></a>").append(self.contextMenu).appendTo(self.editor);
			}
		},

		_handleDisabledOption: function (disabled, ele) {
			var self = this;

			if (disabled) {
				if (!self.disabledDiv) {
					self.disabledDiv = self._createDisabledDiv(ele);
				}
				self.disabledDiv.appendTo("body");
			}
			else {
				if (self.disabledDiv) {
					self.disabledDiv.remove();
					self.disabledDiv = null;
				}
			}
		},

		_createDisabledDiv: function (outerEle) {
			var self = this,
			//Change your outerelement here
				ele = outerEle ? outerEle : self.element,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
						.addClass("ui-state-disabled")
						.css({
				"z-index": "99999",
				position: "absolute",
				"background-color": "lightgray",
				width: disabledWidth,
				height: disabledHeight,
				left: eleOffset.left,
				top: eleOffset.top
			});
		},

		_initElements: function () {
			var self = this,
			o = self.options,
				contentHeight = self.element.height() -
					self._getHeader().outerHeight(true) -
					self._getFooter().outerHeight(true),
				buttonStates = {};

			self._getContent().height(contentHeight)
			.wijsplitter({
				showExpander: false,
				orientation: "horizontal",
				panel1: {
					scrollBars: "none",
					collapsed: false
				},
				panel2: {
					scrollBars: "none",
					collapsed: true
				}
			});

			self._addHandlerToDesignView();
			//for adding default font style to editor by wh at 2012/1/18 
			self._addDefaultFontStyleToDesignView();
			//end for adding
			self._createWijMenu();
			//update for bbcode hiding the path by wh at 2011/9/26
			//if (!o.showPathSelector) {
			if (!o.showPathSelector || self.options.mode === "bbcode") {
				//end for hiding path
				self._getPathSelector().hide();
			}
			self._ribbonCommand(o.editorMode);

			//update for supporting fullscreenmode by wuhao at 2011/8/2
			if (o.fullScreenMode) {
				//fullScreen = self.options.fullScreenMode;
				self._setFullScreen(o.fullScreenMode);
			}
			//end for fullscreenmode

			buttonStates[cmd_redo] = true;
			buttonStates[cmd_undo] = true;
			$ribbon.wijribbon(setButtonsDisabled, buttonStates);
		},

		_setOption: function (key, value) {
			var self = this,
			o = self.options,
			oldMode = o.mode,
			ribbonParent = $ribbon.parent(),
			oldCustomContextMenu = o.customContextMenu;

			$.Widget.prototype._setOption.apply(self, arguments);

			if (key === "fullScreenMode") {
				o.fullScreenMode = value;
				self._setFullScreen(value);
			} else if (key === "showPathSelector") {
				o.showPathSelector = value;
				if (value) {
					self._getPathSelector().show();
				} else {
					self._getPathSelector().hide();
				}
			} else if (key === "editorMode") {
				o.editorMode = value;
				self._ribbonCommand(value);
			} else if (key === "fullScreenContainerSelector") {
				o.fullScreenContainerSelector = value;
				if (self.options.fullScreenMode) {
					self._setFullScreen(true);
				}
			} else if (key === "disabled") {
				self._handleDisabledOption(value, self.editor);
			} else if (key === "showFooter") {
				if (value){
					if (!($("." + css_editor_footer).is(":visible"))) {
						$("." + css_editor_footer).show();
					}
				} else {
					if (($("." + css_editor_footer).is(":visible"))) {
						$("." + css_editor_footer).hide();
					}
				}
			} else if (key === "commandButtonClick") {
				o.commandButtonClick = value;
			} else if (key === "customContextMenu") {
				//fixed bug for customContextMenu
				if (oldCustomContextMenu === value) {
					return;
				}
				if (value) {
					if (!self.contextMenu) {
						self._createMenuMarkUp(self, o);
					}
					self._createWijMenu();
				}
				else {
					self.contextMenu.wijmenu("destroy")
					.remove();
					self.contextMenu = undefined;
				}
				} else if (key === "mode" && value !== oldMode) {
					$ribbon.wijribbon("destroy");
					$ribbon.remove();
					if (value === "ribbon") {
						$ribbon = $(self._getDefaultRibbonMarkup());
					} else if (value === "bbcode") {
						$ribbon = $(self._getSimpleToolBar(defaultBBCodeModeCommands));
					}
					else {
						$ribbon = 
							$(self._getSimpleToolBar(defaultSimpleModeCommands));
						}
					
					ribbonParent.append($ribbon);
					$ribbon.wijribbon({
						click: function (e, data) {
							self._ribbonCommand(data.commandName, data.name);
							self._trigger('commandButtonClick', e, data);
						}
					});
				}
		},

		_getHeader: function () {
			return $("." + css_editor_header, this.editor);
		},

		_getContent: function () {
			return $("." + css_editor_content, this.editor);
		},

		_getFooter: function () {
			return $("." + css_editor_footer, this.editor);
		},

		_getPathSelector: function () {
			return $("." + css_editor_pathselector, this.editor);
		},

		_getModes: function () {
			return $("." + css_ribbon_modes, this.editor);
		},

		_getDesignView: function () {
			return this.designView;
		},

		_getDesignViewWindow: function () {
			var $designView = this.designView;

			if ($designView && $designView.length > 0) {
				return $designView[0].contentWindow;
			}

			return null;
		},

		_getDesignViewDocument: function () {
			var win = this._getDesignViewWindow();

			if (win) {
				return win.document;
			}

			return null;
		},

		_getDesignViewText: function () {
			var doc = this._getDesignViewDocument();

			if (doc && doc.body && doc.body.innerHTML) {
				return doc.body.innerHTML;
			}

			return "";
		},

		_setDesignViewText: function (text) {
			var self = this,
				doc = this._getDesignViewDocument();

			if (this.options.mode === "bbcode") {
				//Note: maybe need to trim the text.
				text = self._convertBBCodeToHtml(text);
			}
			if (doc && doc.body) {
				doc.body.innerHTML = text;
			}
		},

		_getDialog: function () {
			return this.dialog;
		},

		_getSubDialog: function () {
			return this.subDialog;
		},

		_initContentDocument: function () {
			var self = this,
				text = self.sourceView.val(),
				doc = self._getDesignViewDocument();

			if (self.options.mode === "bbcode") {
				//Note: trim leading/trailing whitespace
				//because when get the innerhtml from body, there 
				//are some whitespace on leading/trailing
				text = self._convertBBCodeToHtml($.trim(text));
			}
			doc.open();
			doc.write("<html style=\"width:100%;height:100%;" +
			(self.options.enabled ? "cursor:text;" : "") +
			"\"><head><title></title><style id=\"__wijStyle\" " +
			" type=\"text/css\" >table,td,tr{border: 1px #acacac dashed;}" +
			"</style></head><body>" + text + "</body></html>");
			doc.close();
			undoBuffers = [];
			undoBuffers.push(text);
			undoSteps = 0;
		},

		_addHandlerToDesignView: function () {
			var self = this,
				win = self._getDesignViewWindow(),
				doc = win.document;

			self._initContentDocument();

			if ($.browser.mozilla) {
				setTimeout(self._setDesignModeForFF, 1000, self);
			} else {
				self._setContentEditable(doc, true);
			}

			self.sourceView.bind('blur.' + self.widgetName, function (e) {
				self._onSourceViewBlur();
			});
			
			//add for any change happens, the text would be saved by wh at 2011/12/07
			self.sourceView.bind('keyup.' + self.widgetName, function (e) {
				self._onSourceViewBlur();
			});
			//end for change happens

			//note: in safari and chrome, the source view is show null
			//update by wh at 2011/9/19
			//if ($.browser.msie) {
			if (!$.browser.mozilla) {
				//end by wh
				$(win).blur(function (e) {
					self._onDesignViewBlur();
				});
			} else {
				$(doc).bind('blur.' + self.widgetName, function (e) {
					self._onDesignViewBlur();
				});
			}


			$(doc).bind('mouseup.' + self.widgetName, function (e) {
				self._onDesignViewMouseUp(e);
			})
			.bind('keydown.' + self.widgetName, function (e) {
				self._onDesignViewKeyDown(e);
			})
			.bind('keyup.' + self.widgetName, function (e) {
				self._onDesignViewKeyUp(e);
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			});
		},
		
		_addDefaultFontStyleToDesignView: function () {
			var self = this,
			o = self.options,
			doc = self._getDesignViewDocument(),
			defaultFontName = o.defaultFontName,
			defaultFontSize = o.defaultFontSize,
			defaultFontStyleString = "<style type=\"text/css\"> body {";
			
			if ((defaultFontName === "" || defaultFontName === null) &&
					(defaultFontSize === "" || defaultFontSize === null)) {
				return;
			}
			
			if (defaultFontName !== "" && defaultFontName !== null) {
				defaultFontStyleString += "font-family: " + defaultFontName + ";";
			}
			
			if (o.defaultFontSize !== "" && o.defaultFontSize !== null) {
				defaultFontStyleString += " font-size: " + defaultFontSize + ";";
			}
			
			defaultFontStyleString += "}</style>";
			
			//update for fix issue 19693 by wh at 2012/2/3
			//$(defaultFontStyleString).appendTo(doc.head);
			window.setTimeout(function () {
				$(defaultFontStyleString).appendTo($("head", doc));
			}, 200);
			//end for issue 19693
			
			//init the button state
			self._setFontStyleButtonState(defaultFontName, cmd_fontname);
			self._setFontStyleButtonState(defaultFontSize, cmd_fontsize);
		},

		_setFontStyleButtonState: function (defaultValue, cmd) {
			var defaultKey = "";
			if (!defaultValue || defaultValue === null) {
				return;
			}
			$.each($ribbon.wijribbon("getDropdownList", cmd),
					function (key, value) {
						if (value.toUpperCase() === defaultValue.toUpperCase()) {
							defaultKey = key;
							return false;
						}
					});
			$ribbon.wijribbon(setButtonChecked, defaultKey, true, cmd);
		},
		
		_setDesignModeForFF: function (self) {
			self._getDesignViewDocument().designMode = "on";
		},

		destroy: function () {
			///	<summary>
			///		Destroy Editor widget and reset the DOM element.
			/// Code Example: $("#wijeditor").wijeditor("destroy");
			///	</summary>
			var self = this;

			self.element.html(self._oriContent);
			self.element.removeAttr("tabindex");

			if (self._oriStyle === undefined) {
				self.element.removeAttr("style");
			} else {
				self.element.attr("style", self._oriStyle);
			}

			//self.editor.replaceWith(self.element);
			self.element.insertBefore(self.editor);
			self.element.unbind('.' + self.widgetName);
			self.editor.remove();
			$.Widget.prototype.destroy.call(self);
		},

		showEditorDialog: function (dialogCmd) {
			switch (dialogCmd) {
			case cmd_inserttable:
			case cmd_template:
			case cmd_imagebrowser:
			case cmd_inspect:
			case cmd_find:
			case cmd_specialchar:
			case cmd_media:
			case cmd_cleanup:
			case cmd_link:
			case cmd_backcolor:
			case cmd_fontcolor:
			case cmd_insertcode:
				this._ribbonCommand(dialogCmd);
				break;
			default:
				wijAlert("Cannot find the dialog with command name '" + 
				dialogCmd + "'!");
				break;
			}
		},

		executeEditorAction: function (command, parentCmd) {
			this._ribbonCommand(command, parentCmd);
		},

		_isFontSizeCustomized: function () {
			if (isFontSizeCustomized !== null) {
				return isFontSizeCustomized;
			}

			var fontSizes = $ribbon.wijribbon("getDropdownList", cmd_fontsize),
				fss = [cmd_verysmall, cmd_smaller, cmd_small,
						cmd_medium, cmd_large, cmd_larger, cmd_verylarge];

			isFontSizeCustomized = false;

			$.each(fontSizes, function (key, value) {
				if ($.inArray(key, fss) === -1) {
					isFontSizeCustomized = true;
					return false;
				}
			});

			return isFontSizeCustomized;
		},

		_fontSizeCommand: function (cmd) {
			var self = this,
				doc = self._getDesignViewDocument(),
				arg = 4,
				fontSize = "font-size",
				$spans = [];

			switch (cmd) {
			case cmd_verysmall:
				arg = 1;
				break;
			case cmd_smaller:
				arg = 2;
				break;
			case cmd_small:
				arg = 3;
				break;
			case cmd_medium:
				arg = 4;
				break;
			case cmd_large:
				arg = 5;
				break;
			case cmd_larger:
				arg = 6;
				break;
			case cmd_verylarge:
				arg = 7;
				break;
			}

			//Add comments by RyanWu@20110915.
			//For implementing the font-size 
			//support px/pt etc other than only small/x-small/x-large/large...
			//doc.execCommand("FontSize", false, arg);
			if (!self._isFontSizeCustomized()) {
				doc.execCommand("FontSize", false, arg);
			} else if ($.browser.msie) {
				self._formatFontSpan(doc, fontSize, cmd);
			} else {
				//Here we set fontsize to 4(temp value) because we just use 
				//execCommand to separate the html correctly 
				//and we will set the correct fontsize value to the replaced span.
				doc.execCommand("FontSize", false, arg);

				$.each($("font[size]", doc), function (idx, fs) {
					$spans.push(self._replaceFontWithSpan($(fs), "size", fontSize, cmd));
				});

				self._setSelection($spans);
			}
			//end by RyanwWu@20110915.

			if (self.options.mode === "bbcode" && !($.browser.msie)) {
				self._convertFontStyleToStandTag();
			}

			self._addtoUndoBuffer();
		},

		_fontNameCommand: function (cmd) {
			var self = this,
				doc = self._getDesignViewDocument(),
				fontNames = $ribbon.wijribbon("getDropdownList", cmd_fontname),
				fontName;

			$.each(fontNames, function (key, value) {
				if (cmd === key) {
					fontName = value;
					return false;
				}
			});

			//Add comments by RyanWu@20110915.
			//For implementing the font-size 
			//support px/pt etc other than only small/smaller/larger/large...
			//doc.execCommand("FontName", false, fontName);
			doc.execCommand("FontName", false, fontName);

			if (self._isFontSizeCustomized() && $.browser.msie) {
				self._formatFontSpan(doc, "font-family", fontName);
			}
			//end by RyanwWu@20110915.

			self._addtoUndoBuffer();
		},

		//Add comments by RyanWu@20110922.
		//For implementing the font-size 
		//support px/pt etc other than only small/smaller/larger/large...
		_formatFontSpan: function (doc, cssName, cssValue) {
			var self = this,
				tempValue = cssValue,
				styleAttrName = "fontFamily",
				$spans = [];

			if (cssName !== "font-family") {
				tempValue = "c1-temp";
				styleAttrName = "fontSize";
			}

			doc.execCommand("FontName", false, tempValue);

			$.each($("font[face='" + tempValue + "']", doc), function (i, fn) {
				var $span = self._replaceFontWithSpan($(fn), "face", cssName, cssValue),
					$children, idx;

				$spans.push($span);

				//1. remove all font-family style of the child spans.
				//<span style="font-family:B">blah<span style="font-family:A">
				//</span></span>, 
				//need remove the span whose font-family is A
				$children = $("span." + css_formatspan, $span);

				for (idx = $children.length - 1; idx >= 0; idx--) {
					self._removeSpecifiedStyleSpan($($children[idx]),
					styleAttrName, cssName);
				}

				//2. remove duplicated spans. 
				//<span style="font-family:A">
				//<span style="font-family:B">blah</span></span>
				$.each($span, function (idx, span) {
					$.each($(span).parents("span." + css_formatspan),
					function (i, parent) {
						var $parent = $(parent);

						if ($parent.children().length > 1) {
							return false;
						}

						if ($parent.text() === $(span).text()) {
							self._removeSpecifiedStyleSpan($parent, 
							styleAttrName, cssName);
						}
					});
				});
			});

			self._setSelection($spans);
		},

		_setSelection: function ($nodes, start, length) {
			var win = this._getDesignViewWindow(),
				doc = win.document,
				range, startNode, endNode, selection,
				len = 0;

			try {
				if ($.browser.msie) {
					//				range.moveStart("character", -text.length);
					//				range.moveEnd("character", -text.length);
					//				range.collapse(true);
					//				range.moveStart("character", start);
					//				range.moveEnd("character", length);
					//range.moveStart("textedit", -1);
					//				range.moveStart("textedit", -1);
					//				range.collapse(true);
					//				range.moveStart("character", start);
					//				range.moveEnd("character", length);
					range = doc.selection.createRange();

					if ($nodes) {
						$.each($nodes, function (idx, $node) {
							len += $node.text().length;
						});

						range.moveToElementText($nodes[0][0]);
						range.collapse(true);
						range.moveEnd("character", len);
					} else {
						range.moveStart("textedit", -1);
						range.collapse(true);
						range.moveStart("character", start);
						range.moveEnd("character", length);
					}

					range.select();
				} else {
					selection = win.getSelection();
					range = doc.createRange();
					startNode = $nodes[0][0];
					endNode = $nodes[$nodes.length - 1][0];
					range.setStart(startNode, 0);
					range.setEnd(endNode, endNode.childNodes.length);

					selection.removeAllRanges();
					selection.addRange(range);
				}
			} catch (e) { }
		},

		_replaceFontWithSpan: function ($fn, attrName, cssName, cssValue) {
			$fn.wrap("<span class = '" + css_formatspan +
				"' style='" + cssName + ":" + cssValue + "'></span>");
			var $span = $fn.parent();

			$fn.removeAttr(attrName);

			if (/<font\s*>/ig.test($span.html())) {
				//$fn.replaceWith($fn.html());
				$span.html($fn.html());
				$fn.remove();
			}

			return $span;
		},

		_removeSpecifiedStyleSpan: function ($span, styleAttrName, cssAttrName) {
			var style, shouldRemove = true;

			if ($span[0].style[styleAttrName] !== "") {
				$span.css(cssAttrName, "");
			}
			style = $span.attr("style");

			if (style) {
				$.each(style.split(';'), function (i, attr) {
					var styleAttr = $.trim(attr).toLowerCase();
					if (styleAttr !== "" && styleAttr.indexOf(cssAttrName) !== -1) {
						shouldRemove = false;
						return false;
					}
				});
			}

			if (shouldRemove) {
				$span.replaceWith($span.html());
			}
		},

		_removeFormat: function () {
			var self = this,
				doc = self._getDesignViewDocument(),
				buttonStates = {};

			doc.execCommand(cmd_removeformat, false, null);

			if (self._isFontSizeCustomized() && $.browser.msie) {
				self._removeFormatForIE(doc);
			}

			self._addtoUndoBuffer();
			buttonStates[cmd_bold] = false;
			buttonStates[cmd_italic] = false;
			buttonStates[cmd_strike] = false;
			buttonStates[cmd_underline] = false;
			buttonStates[cmd_subscript] = false;
			buttonStates[cmd_superscript] = false;
			buttonStates[cmd_numberedlist] = false;
			buttonStates[cmd_bulletedlist] = false;
			buttonStates[cmd_alignleft] = false;
			buttonStates[cmd_aligncenter] = false;
			buttonStates[cmd_alignright] = false;
			buttonStates[cmd_alignfull] = false;

			$ribbon.wijribbon(setButtonsChecked, buttonStates);
		},

		_removeFormatForIE: function (doc) {
			var range = doc.selection.createRange(),
				htmlText = range.htmlText,
				text = range.text,
				start = 0,
				$parent = $(range.parentElement()),
				$body = $(doc.body),
				preHtml = "",
				sufHtml = "",
				specialStr = "__c1temp",
				specialCss = "c1-temp",
				tempSpan = "<span class='" + specialCss + "'>" + specialStr + "</span>",
				$tempSpan, $tempSibling, $spans, $span, idx, items;

			//1. <span style="font-size:20pt">A[B</span>C]D
			//2. <span style="font-size:20pt">A[B</span>CD<span style="font-size:30pt">EF]G</span>
			//3. <span style="font-size:20pt">A[BC]D</span>
			//4. <span style="font-family:arial"><span style="font-size:20pt">A[B</span>CD<span style="font-size:30pt">EF]G</span></span>
			$parent.addClass("c1-app-parent");
			range.pasteHTML(tempSpan);

			start = $body.text().indexOf(specialStr);
			$tempSpan = $("span." + specialCss, doc);
			$tempSibling = $tempSpan;

			$tempSpan.parentsUntil("body").each(function (index) {
				if ($(this).is(".c1-app-parent")) {
					return false;
				}

				$tempSibling = $(this);
			});
			$tempSpan.html(htmlText);

			$spans = $("span." + css_formatspan, $tempSpan);

			for (idx = $spans.length - 1; idx >= 0; idx--) {
				$span = $($spans[idx]);

				$span.replaceWith($span.html());
			}

			if (!$tempSibling.is("." + specialCss)) {
				$tempSibling.after($tempSpan);
			}

			$.each($tempSibling.parents("span." + css_formatspan), function (index, p) {
				preHtml += "</span>";
				sufHtml = "<span class='" + css_formatspan + 
				"' style = '" + $(p).attr("style") + "'>" + sufHtml;
			});

			htmlText = $tempSpan.html();
			$tempSpan.replaceWith(specialStr);
			items = $body.html().split(specialStr);

			$body.html(items[0] + preHtml + htmlText + sufHtml + items[1]);

			$spans = $("span." + css_formatspan, doc);

			for (idx = $spans.length - 1; idx >= 0; idx--) {
				$span = $($spans[idx]);

				if ($span.text() === "") {
					$span.replaceWith($span.html());
				}
			}

			$(".c1-app-parent", doc).removeClass("c1-app-parent");

			this._setSelection(null, start, text.length);
		},
		//end by RyanwWu@20110922.

		_toggleFullScreen: function () {
			var self = this,
			o = self.options;

			o.fullScreenMode = !o.fullScreenMode;

			self._setFullScreen(o.fullScreenMode);
		},

		_setFullScreen: function (fullScreenMode) {

			var self = this,
				borderWidth = 1,
				header = self._getHeader(),
				footer = self._getFooter(),
				content = self._getContent(),
				cSelector = self.options.fullScreenContainerSelector,
				$container = $(cSelector), oriHtml = self._getDesignViewText(),
				width, height, contentHeight;

			if (fullScreenMode) {

				if ($container.length === 0) {
					$container = $(wijWindow);
					cSelector = "body";

					//note:add the block for preventing the scrollbar appear
					self._oriDocOverFlow = $(document.documentElement).css("overflow");
					$(document.documentElement).css({
						overflow: "hidden"
					});
					//end for block
					
					//note: if the content exclude the editor, the window still 
					//has the scroll, need to do some adjustment.
					if (!$.browser.mozilla) {
						window.scrollTo(0, 0);
					}
					$(wijWindow).bind("resize.wijeditor", function () {
						self._fullscreenOnWindowResize();
					});
				}

				width = $container.width();
				height = $container.height() - 2 * borderWidth;
				oriWidth = self.editor.width();
				oriHeight = self.editor.height();

				if (!$oriParent) {
					$oriParent = self.editor.parent();
				}

				if (!self._replacedDiv) {
					self._replacedDiv = $("<div />");
				}

				self.editor.after(self._replacedDiv);

				$(cSelector).append(self.editor);

				//Note: think of body and fullScreenContainerSelector
				//update by wuhao 2011/8/6
				//				self.editor.css({
				//					width: width,
				//					height: height,
				//					position: "absolute",
				//					left: 0,
				//					top: 0
				//				});				
				self.editor.css({
					width: width,
					height: height,
					position: ""
				})
				.addClass(css_editor_fullscreen);
				//end by wuhao
				
				self.sourceView.css({
					width: width,
					height: height
				});
				
				$ribbon.wijribbon("updateRibbonSize");
			} else {
				//if ($oriParent) {
				//	$oriParent.append(self.editor);
				//}
				self._replacedDiv.after(self.editor)
				.remove();
				self.editor.css({
					width: oriWidth,
					height: oriHeight,
					position: "static"
				})
				.removeClass(css_editor_fullscreen);

				self.sourceView.css({
					width: oriWidth,
					height: oriHeight
				});
				
				if (!self.options.fullScreenContainerSelector) {
					$(document.documentElement).css({
						overflow: self._oriDocOverFlow
					});
				}
				$(wijWindow).unbind("resize.wijeditor");
				$ribbon.wijribbon("updateRibbonSize");
			}

			contentHeight = self.editor.height() -
				header.outerHeight(true) - footer.outerHeight(true);

			content.height(contentHeight)
					.wijsplitter("refresh");

			self._addHandlerToDesignView();
			//for adding default font style to editor by wh at 2012/1/18 
			self._addDefaultFontStyleToDesignView();
			//end for adding
			//update: contextmenu don't show when fullscreen mode
			//update by wh at 2011/10/10			
			self._createWijMenu();
			//end for contextmenu
			
			//update for fixing bug 20695 
			if ($.browser.msie) {
				window.setTimeout(function() {
						self._setDesignViewText(oriHtml);
						//for case 20731 fixing at 2012/4/23
						if (wijParseInt($.browser.version) >= 9) {
							self.sourceView.val(oriHtml);
						}
						},
						40);
			}
		},

		//fixed bug for customContextMenu
		_createWijMenu: function () {
			var self = this, doc = self._getDesignViewDocument();
			if (self.contextMenu) {
				self.contextMenu.wijmenu({
					orientation: 'vertical',
					trigger: self.designView,
					triggerEvent: 'rtclick',
					showing: function (e, sublist) {
						//update for fixing issue 20382 by wh at 2012/3/12
						if ($.browser.msie) {
							rangeSelection = doc.selection.createRange();
				        }
						//end for 20382 issue.
						sublist.show();
						var offset = self.designView.offset(),
						contentWindowScrollLeft = $($(self.designView)[0].contentWindow)
												.scrollLeft(),
						contentWindowScrollTop = $($(self.designView)[0].contentWindow)
							.scrollTop(),
						menuOffsetLeft = offset.left + 2 - contentWindowScrollLeft,
						menuOffsetTop = offset.top - contentWindowScrollTop;
						sublist.position({ my: 'left top',
							at: 'right top',
							of: e,
							offset: (menuOffsetLeft) + " " + (menuOffsetTop),
							collision: 'none none'
						});
						sublist.hide();
					},
					animation: { animated: "fade" },
					select: function (e, item) {
						//update for fixing 20488 by wh at 2012/3/14
						self._setIESelection();
						//end for 20488 issue.
						self._contextMenuItemClick(e, item);
					}
				});
			}
		},
		
		_fullscreenOnWindowResize: function () {
			var self = this,
				header = self._getHeader(),
				footer = self._getFooter(),
				content = self._getContent(),
				contentHeight, 
				fWidth = $(window).width(), 
				fHeight = $(window).height();

			self.editor.css({
				width: fWidth,
				height: fHeight
			});
			
			contentHeight = self.editor.height() -
			header.height() - footer.height();

			content.height(contentHeight)
				.wijsplitter("refresh");
			
			//TODO
			//$ribbon.wijribbon("updateRibbonSize");
		},

		//update for fixing issue 18777 by wuhao at 2011/12/15
		_saveText: function () {
		},
		//end for fixing issue
		
		_doSpellCheck: function () {
		},

		_ribbonCommand: function (cmd, parentCmd) {
			var self = this,
				doc = self._getDesignViewDocument(),
				content = self._getContent(),
				elementName, selectedHtml, range;

			if (parentCmd === cmd_fontname) {
				self._fontNameCommand(cmd);
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
				return;
			}

			if (parentCmd === cmd_fontsize) {
				self._fontSizeCommand(cmd);
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
				return;
			}

			self._setIEFocus();

			switch (cmd) {
			case cmd_blockquote:
				if ($.browser.msie) {
					// we first change the block into <ADDRESS> tags, 
					// using the FormatBlock functionality of the execCommand
					doc.execCommand("FormatBlock", false, "<ADDRESS>");
					range = doc.selection.createRange();
					range = $(range.parentElement()).closest("address");
					if (range.length) {
						// then sneakily we use regex's to replace 
						// <ADDRESS> tags with <BLOCKQUOTE> tags
						range.replaceWith("<blockquote>" + 
						range.html() + "</blockquote>");
						// then we tidy any extra <BLOCKQUOTES> 
						//that have been unhelpfully added.
						doc.body.innerHTML = doc.body.innerHTML
						.replace(/<BLOCKQUOTE>\s*?<BLOCKQUOTE>/gi, "<BLOCKQUOTE>");
						doc.body.innerHTML = doc.body.innerHTML
						.replace(/<\/BLOCKQUOTE>\s*?<\/BLOCKQUOTE>/gi, "<\/BLOCKQUOTE>");
						doc.body.innerHTML = doc.body.innerHTML
						.replace(/<BLOCKQUOTE>\s*?<\/BLOCKQUOTE>/gi, "");
					}
				} else {
					doc.execCommand("FormatBlock", false, "<BLOCKQUOTE>");
				}
				break;
			case cmd_form:
				elementName = self._generateUniqueName('form');
				self.insertHTML('<form id="' + elementName +
		'" name="' + elementName + '" method="post">' +
		elementName + '</form>');
				break;
			case cmd_imagebutton:
				elementName = self._generateUniqueName('image');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName + '" type="image"' +
		' value="' + elementName + '"/>');
				break;
			case cmd_textarea:
				elementName = self._generateUniqueName('textarea');
				self.insertHTML('<textarea id="' + elementName +
		'" name="' + elementName +
		'" rows="4" cols="48"></textarea>');
				break;
			case cmd_button:
				elementName = self._generateUniqueName('button');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName + '" type="button"' +
		' value="' + elementName + '"/>');
				break;
			case cmd_textbox:
				elementName = self._generateUniqueName('textbox');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName + '" type="text"' +
		' value="' + elementName + '"/>');
				break;
			case cmd_listbox:
				elementName = self._generateUniqueName('list');
				self.insertHTML('<select id="' + elementName +
		'" name="' + elementName +
		'" style="width: 120px" size="8"></select>');
				break;
			case cmd_password:
				elementName = self._generateUniqueName('password');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName +
		'" type="password" value="' + elementName + '"/>');
				break;
			case cmd_dropdownlist:
				elementName = self._generateUniqueName('dropdown');
				self.insertHTML('<select id="' + elementName +
		'" name="' + elementName + '"></select>');
				break;
			case cmd_hiddenfield:
				elementName = self._generateUniqueName('hidden');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName +
		'" type="hidden" value="' + elementName + '" />');
				break;
			case cmd_radio:
				elementName = self._generateUniqueName('radiobox');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName + '" type="radio"' +
		' value="' + elementName + '">' +
		'<label for="' + elementName + '">' +
		elementName + '</label></input>');
				break;
			case cmd_checkbox:
				elementName = self._generateUniqueName('checkbox');
				self.insertHTML('<input id="' + elementName +
		'" name="' + elementName + '" type="checkbox"' +
		' value="' + elementName + '">' +
		'<label for="' + elementName + '">' +
		elementName + '</label></input>');
				break;
			case cmd_insertcolumn:
			case cmd_insertrow:
			case cmd_insertcell:
			case cmd_splitcell:
			case cmd_mergecell:
			case cmd_removecolumn:
			case cmd_removerow:
			case cmd_removecell:
				self._tableAction(cmd);
				break;
			case cmd_borders:
				self._toggleTableBorders();
				break;
			case cmd_subscript:
				try {
					if (doc.queryCommandState(cmd_superscript)) {
						doc.execCommand(cmd_superscript, false, null);
						$ribbon.wijribbon(setButtonChecked, cmd_superscript, false);
					}
				} catch (e) {
				}
				doc.execCommand(cmd_subscript, false, null);
				self._addtoUndoBuffer();
				break;
			case cmd_superscript:
				try {
					if (doc.queryCommandState(cmd_subscript)) {
						doc.execCommand(cmd_subscript, false, null);
						$ribbon.wijribbon(setButtonChecked, cmd_subscript, false);
					}
				} catch (e1) {
				}
				doc.execCommand(cmd_superscript, false, null);
				self._addtoUndoBuffer();
				break;
			case cmd_removeformat:
				//doc.execCommand(cmd_removeformat, false, null);
				self._removeFormat();
				break;
			case cmd_insertbreak:
				self.insertHTML("<br/>");
				break;
			case cmd_insertparagraph:
				selectedHtml = self._getSelectedContent();

				if (!selectedHtml || selectedHtml === "") {
					selectedHtml = "&nbsp;";
				}

				self.insertHTML('<p>' + selectedHtml + '</p>');
				break;
			case cmd_insertprintbreak:
				self.insertHTML('<div title="Print Page Break" ' +
			'style="font-size:1px;page-break-before:always;' +
			'vertical-align:middle;height:1px;' +
			'background-color:#c0c0c0">&nbsp;</div>');
				break;
			case cmd_fullscreen:
				self._toggleFullScreen();
				break;
			case cmd_undo:
				self._undoAction();
				break;
			case cmd_redo:
				self._redoAction();
				break;
			case cmd_cut:
				self._execCut();
				break;
			case cmd_copy:
				self._execCopy();
				break;
			case cmd_paste:
				self._execPaste();
				break;
			case cmd_date:
				self.insertDateAndTime();
				break;
			case cmd_designview:
				$modes.wijribbon(setButtonDisabled, cmd_wordwrap, true)
			.wijribbon(setButtonChecked, cmd_designview, true);

				$ribbon.wijribbon("option", "disabled", false);

				//TODO:maybe need to add the code block
				//update for bbcode
				//if (self.options.mode === "bbcode") {
				//self._onSourceViewBlur();
				//}
				//end for update

				content.wijsplitter("option", "panel2", {
					collapsed: true
				});
				break;
			case cmd_splitview:
				$modes.wijribbon(setButtonDisabled, cmd_wordwrap, true)
			.wijribbon(setButtonChecked, cmd_splitview, true);

				$ribbon.wijribbon("option", "disabled", false);

				content.wijsplitter("option", {
					panel1: { collapsed: false },
					panel2: { collapsed: false }
				});
				break;
			case cmd_sourceview:
				$modes.wijribbon(setButtonDisabled, cmd_wordwrap, false)
			.wijribbon(setButtonChecked, cmd_sourceview, true);

				$ribbon.wijribbon("option", "disabled", true);

				//TODO:maybe need to add the code block
				//update for bbcode
				//if (self.options.mode === "bbcode") {
				//self._onDesignViewBlur();
				//}
				//end for update

				content.wijsplitter("option", "panel1", {
					collapsed: true
				});
				break;
			case cmd_wordwrap:
				if (content.wijsplitter("option", "panel1").collapsed) {
					self._toggleWordWrap();
				}
				break;
			case cmd_backcolor:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Set BackColor",
			self._getDialogRes_BackColor(),
			self.initBackColorDialog);
				break;
			case cmd_fontcolor:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Set ForeColor",
			self._getDialogRes_ForeColor(),
			self.initForeColorDialog);
				break;
			case cmd_inserttable:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Insert Table",
			self._getDialogRes_Table(false),
			self.initInsertTableDialog);
				break;
			case cmd_edittable:
				if (self._getEditableTable()) {
					self._createDialog("Edit Table",
				self._getDialogRes_Table(true),
				self.initEditTableDialog);
				}
				break;
			case cmd_preview:
				self._createDialog("Preview",
			self._getDialogRes_Preview(),
			self.initPreviewDialog);
				break;
			case cmd_cleanup:
				self._createDialog("Clean up source HTML document",
			self._getDialogRes_CleanUp(),
			self.initCleanUpDialog);
				break;
			case cmd_media:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Insert media",
			self._getDialogRes_Media(),
			self.initMediaDialog);
				break;
			case cmd_specialchar:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue
				self._createDialog("Insert special character",
			self._getDialogRes_SpecialCharacter(),
			self.initSpecialCharacterDialog);
				break;
			case cmd_find:
				self._createDialog("Find and replace",
			self._getDialogRes_FindAndReplace(),
			self.initFindDialog);
				break;
			case cmd_inspect:
				inspectElement = self._getSelectedElement();

				self._createDialog("Tag Inspector",
			self._getDialogRes_TagInspector(),
			self.initTagInspectorDialog);
				break;
			case cmd_template:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Apply Template",
			self._getDialogRes_Template(),
			self.initTemplateDialog);
				break;
			case cmd_imagebrowser:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Image Browser",
			self._getDialogRes_ImageBrowser(),
			self.initImageBrowserDialog);
				break;
			case cmd_link:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue

				self._createDialog("Insert hyperLink",
			self._getDialogRes_Link(),
			self.initHyperLinkDialog);
				break;
			case cmd_insertcode:
				//update for fixing issue 20382 by wh at 2012/3/9
				/*
				if ($.browser.msie) {
					rangeSelection = doc.selection.createRange();
				}*/
				self._saveSelectionForIE();
				//end for 20382 issue
				self._createDialog("Insert Code",
				self._getDialogRes_Code(),
				self.initInsertCodeDialog);
				break;
			case cmd_alignleft:
			case cmd_aligncenter:
			case cmd_alignright:
			case cmd_alignfull:
			case cmd_outdent:
			case cmd_indent:
			case cmd_bold:
			case cmd_italic:
			case cmd_underline:
			case cmd_numberedlist:
			case cmd_bulletedlist:
			case cmd_strike:
			case cmd_inserthr:
			case cmd_selectall:
				doc.execCommand(cmd, false, null);
				if (self.options.mode === "bbcode" && !($.browser.msie)) {
					//convert style="font-weight: bold; 
					//font-style: italic; text-decoration: underline;"
					//same as ie
					self._convertStyleToStandTag();
				}
				self._addtoUndoBuffer();
				break;
			case cmd_save:
				//update for fixing issue 18777 by wuhao at 2011/12/15
				self._saveText();
				//end for fixing issue
				break;
			case cmd_spelling:
				self._doSpellCheck();
				break;
			}
			//add for any change happens, the text would be saved by wh at 2011/12/07
			self._onDesignViewBlur();
			//end for change happens
		},
		
		_saveSelectionForIE: function () {
			var cWin = this._getDesignViewWindow(), selection;
			if ($.browser.msie) {
				selection = cWin.document.selection;
				rangeSelection = selection.createRange();
			}
		},

		//added by Ryanwu@20110512.
		_createDialog: function (title, content, callback) {
			var self = this,
				$dlg = self.dialog;

			$dlg.html("").undelegate(self.widgetName).undelegate("." + self.widgetName)
				.append(content);
			//add for fixing issue 20444 by wh at 2012/3/13
			if (self.subDialog) {
				self.subDialog.html("").undelegate(self.widgetName)
				.undelegate("." + self.widgetName);
			}
			//end for 20444 issue 
			if (!$dlg.data("wijdialog")) {
				$dlg.wijdialog({
					width: "auto",
					height: "auto",
					modal: true,
					title: title,
					position: "center",
					resizable: false,
					captionButtons: {
						pin: { visible: false },
						refresh: { visible: false },
						toggle: { visible: false },
						minimize: { visible: false },
						maximize: { visible: false }
					}
				});
			} else {
				$dlg.wijdialog("reset");
				$dlg.wijdialog("option", {
					width: "auto",
					height: "auto",
					title: title
				});
			}

			self._adjustDialogLayoutForIE7();

			if (callback) {
				callback.call(self);
			}

			$dlg.wijdialog("open");
		},

		_adjustDialogLayoutForIE7: function () {
			var $dlg = this.dialog;

			if ($.browser.msie && /^7\.[0-9]+/.test($.browser.version)) {
				$dlg.wijdialog('option', 'width',
					$dlg.parent().width());
			}
		},

		_contextMenuItemClick: function (e, item, sender) {
			var self = this,
				cmd = item.item.attr("_c1buttoncmd");

			switch (cmd) {
			case cmd_cut:
				self._execCut();
				break;
			case cmd_copy:
				self._execCopy();
				break;
			case cmd_paste:
				self.focus();
				self._execPaste();
				break;
			}
		},

		_execCut: function () {
			var self = this,
			doc = self._getDesignViewDocument();
			
			if ($.browser.safari) {
				wijAlert("This function is not supported in current browser. " +
					"Plesse use (Ctrl + X).");
			} else if ($.browser.msie) {
				//add the block for fixing bug 18146 at 2011/11/3 by wh				
				doc.execCommand("Cut", false, null);
				self._addtoUndoBuffer();
				//end for 18146 
			}			
			else {
				self._execCopy();
				self._deleteSelectionContent();
				self._addtoUndoBuffer();
			}
		},

		_execCopy: function () {
			var self = this,
			doc = self._getDesignViewDocument();

			if ($.browser.safari) {
				wijAlert("This function is not supported in current browser. " +
					"Plesse use (Ctrl + C).");
			} else if ($.browser.msie) {
				//add the block for fixing bug 18146 at 2011/11/3 by wh
				doc.execCommand("Copy", false, null);
				self._addtoUndoBuffer();
				//end for 18146 
			}  else {
				self._copyToClipboard(self._getSelectedContent());
			}
		},

		_execPaste: function () {
			var self = this, copiedText,
			doc = self._getDesignViewDocument();

			if ($.browser.safari) {
				wijAlert("This function is not supported in current browser. " +
					"Plesse use (Ctrl + V).");
			} else if ($.browser.msie) {
				//add the block for fixing bug 18146 at 2011/11/3 by wh
				doc.execCommand("Paste", false, null);
				self._addtoUndoBuffer();
				//end for 18146 
			} else {
				try {
					copiedText = self._copyFromClipboard();

					if (copiedText && copiedText !== '') {
						self.insertHTML(copiedText);
					}
				} catch (e1) {
				}
			}
		},

		_getFontSizeCollection: function () {
			return { '10px': cmd_verysmall,
				'13px': cmd_smaller,
				'16px': cmd_small,
				'18px': cmd_medium,
				'24px': cmd_large,
				'32px': cmd_larger,
				'48px': cmd_verylarge,
				1: cmd_verysmall,
				2: cmd_smaller,
				3: cmd_small,
				4: cmd_medium,
				5: cmd_large,
				6: cmd_larger,
				7: cmd_verylarge
			};
		},

		_updateButtonStates: function (e) {
			var self = this,
				doc = self._getDesignViewDocument(),
				rawValue, cmd,
				buttonStates = {},
				stateButtons = [cmd_bold, cmd_italic, cmd_strike,
					cmd_underline, cmd_subscript, cmd_superscript,
					cmd_numberedlist, cmd_bulletedlist, cmd_alignleft,
					cmd_aligncenter, cmd_alignright, cmd_alignfull],
				$fontSizeSpans,
				target = e.target,
				$target = $(target);

			$.each(stateButtons, function (idx, btnKey) {
				buttonStates[btnKey] = doc.queryCommandState(btnKey);
			});

			$ribbon.wijribbon(setButtonsChecked, buttonStates);

			rawValue = self._queryCommandValue(cmd_fontname) || "";

			$.each($ribbon.wijribbon("getDropdownList", cmd_fontname),
			function (key, value) {
				if (value.toUpperCase() === rawValue.toUpperCase()) {
					cmd = key;
					return false;
				}
			});

			$ribbon.wijribbon(setButtonChecked, cmd, true, cmd_fontname);

			//Add comments by RyanWu@20110923.
			//For implementing the font size customization.
			if (self._isFontSizeCustomized()) {
				if ($target.is("span")) {
					cmd = target.style.fontSize;
				} else {
					cmd = "";
				}

				if (cmd === "") {
					$fontSizeSpans = $target.parents("span." + css_formatspan);

					$.each($fontSizeSpans, function (idx, fontSizeSpan) {
						cmd = fontSizeSpan.style.fontSize;

						if (cmd && cmd !== "") {
							return false;
						}
					});
				}

				if (cmd === "") {
					cmd = $target.css("font-size");
				}
			} else {
				rawValue = self._queryCommandValue(cmd_fontsize) || "";

				if (rawValue === "") {
					rawValue = $target.css("font-size");
				}

				$.each(self._getFontSizeCollection(),
					function (key, value) {
						if (key.toString() === rawValue.toString()) {
							cmd = value;
							return false;
						}
					});
			}
			//end by RyanWu@20110923.

			$ribbon.wijribbon(setButtonChecked, cmd, true, cmd_fontsize);
		},

		_queryCommandValue: function (commandName) {
			var doc = this._getDesignViewDocument();

			try {
				if (!doc.queryCommandEnabled(commandName)) {
					return null;
				}
			} catch (e1) {
				return null;
			}

			try {
				return doc.queryCommandValue(commandName);
			} catch (e2) {
			}

			return null;
		},

		_escActionAssociated: function () {
			var self = this,
				win = self._getDesignViewWindow();

			if (win.document.selection !== undefined) {
				win.document.selection.empty();
			}

			if (win.getSelection !== undefined) {
				win.getSelection().removeAllRanges();
			}

			self._hideAllDropdownsMenus();
		},

		_hideAllDropdownsMenus: function () {
			var self = this;
			if (self.contextMenu) {
				self.contextMenu.wijmenu("hideAllMenus");
			}

			$ribbon.wijribbon("hideDropdown", cmd_fontname)
			.wijribbon("hideDropdown", cmd_fontsize)
			.wijribbon("hideDropdown", cmd_table);
		},

		_onDesignViewKeyDown: function (e) {
			var self = this, ch;

			self._setSaveBtnEnabled();

			try {
				if (e.ctrlKey) {
					ch = String.fromCharCode(e.keyCode).toLowerCase();
					//				switch (ch) {
					//					case 'x':
					//					case 'v':
					//						self._addtoUndoBuffer();
					//						break;
					//				}
				} else {
					switch (e.keyCode) {
					case 27:
						self._escActionAssociated();
						break;
					case 13:
					case 46:
						self._addtoUndoBuffer();
						//update for fixing issue 20372 by wh at 2012/3/9
						self._continueSavingInputTextForUndo = false;
						//end for 20372 issue
						break;
					default:
						//update for fixing issue 20372 by wh at 2012/3/9
						self._continueSavingInputTextForUndo = true;
						//end for 20372 issue
						break;
					}
				}
			} catch (e1) {
			}
		},

		_onDesignViewKeyUp: function (e) {
			var self = this, ch;

			if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 ||
				e.keyCode === 40 || e.keyCode === 33 || e.keyCode === 34 ||
				e.keyCode === 35 || e.keyCode === 36) {
				self._updateButtonStates(e);
			}

			if (e.ctrlKey) {
				ch = String.fromCharCode(e.keyCode).toLowerCase();

				switch (ch) {
				case 'y':
					self._redoAction();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'z':
					self._undoAction();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 'x':
				case 'v':
					self._addtoUndoBuffer();
					//update for fixing issue 20372 by wh at 2012/3/9
					self._continueSavingInputTextForUndo = false;
					//end for 20372 issue
					break;
				}
			}
		},

		_onDesignViewMouseUp: function (e) {
			var self = this, $link;

			if (e.button === 2) {
				return;
			}

			self._updateButtonStates(e);
			self._refreshPathSelector();
			//Note: recover the code by wuhao at 2011/9/14, when dropdown is open
			//click the design view, the dropdown don't close
			self._hideAllDropdownsMenus();
			$(document).mouseup();

			if ($.browser.msie) {
				$link = $(e.target).closest("a");

				if (e.ctrlKey && $link.length > 0) {
					try {
						$link.focus();
						wijWindow.open($link[0].href, '_blank');
					} catch (e1) {
					}
				}
			}
		},

		_onDesignViewBlur: function () {
			var self = this, o = self.options, sourceView;

			sourceView = self._getDesignViewText();
			//update for fixing issue 20372 by wh at 2012/3/9
			self._onTextChange();
			//end for 20372 issue
			if (o.mode === "bbcode") {
				//Note: trim leading/trailing whitespace
				//because when get the innerhtml from body, there 
				//are some whitespace on leading/trailing
				sourceView = self._convertHtmlToBBCode($.trim(sourceView));
			}
			self.sourceView.val(sourceView);
		},
		
		_onTextChange: function () {
			var self = this;
			if (self._continueSavingInputTextForUndo) {
				self._addtoUndoBuffer();
				self._continueSavingInputTextForUndo = false;
			}
		},

		_onSourceViewBlur: function () {
			var self = this, designViewText;

			designViewText = self.sourceView.val();

			self._setDesignViewText(designViewText);
		},

		//bbcode implement		
		_convertBBCodeToHtml: function (data) {
			// Convert < and > to their HTML entities.
			data = data.replace(/</g, '&lt;');
			data = data.replace(/>/g, '&gt;');
			//note: can't asure  there is no problem.
			//data = data.replace(/ /g, '&nbsp;');

			// Convert line breaks to <br>.
			data = data.replace(/(?:\r\n|\n|\r)/g, '<br>');

			//[email]
			data = data.replace(/\[EMAIL\]([\s\S]*?)\[\/EMAIL\]/gim,
					'<a href="mailto:$1">$1</a>');
			data = data.replace(/\[EMAIL\=([^\]]+)]([\s\S]*?)\[\/EMAIL\]/gim,
					'<a href="mailto:$1">$2</a>');

			// [url]
			data = data.replace(/\[URL\]([\s\S]*?)\[\/URL\]/gim,
					'<a href="$1">$1</a>');
			data = data.replace(/\[URL\=([^\]]+)]([\s\S]*?)\[\/URL\]/gim,
					'<a href="$1">$2</a>');

			// [b]
			data = data.replace(/\[B\]/gim, '<b>');
			data = data.replace(/\[\/B\]/gim, '</b>');

			// [i]
			data = data.replace(/\[I\]/gim, '<i>');
			data = data.replace(/\[\/I\]/gim, '</i>');

			// [s]
			data = data.replace(/\[S\]/gim, '<strike>');
			data = data.replace(/\[\/S\]/gim, '</strike>');

			// [u]
			data = data.replace(/\[U\]/gim, '<u>');
			data = data.replace(/\[\/U\]/gim, '</u>');

			// [IMG]  [^<>]*
			data = data.replace(/\[IMG height=(.*?) width=(.*?)](.+?)\[\/IMG\]/gim,
				'<img height="$1" width = "$2" src="$3"/>');

			//[BLOCK]
			data = data.replace(/\[BLOCK\]/gim, '<blockquote>');
			data = data.replace(/\[\/BLOCK\]/gim, '</blockquote>');

			// Ordered List [OL]
			data = data.replace(/\[LIST\=1\]\[\*\]([\s\S]*?)\[\/LIST\]/gim,
				'<ol><li>$1</li></ol>');

			// Unordered List [UL]
			data = data.replace(/\[LIST\]\[\*\]([\s\S]*?)\[\/LIST\]/gim,
				'<ul><li>$1</li></ul>');

			//LI
			data = data.replace(/\[\*\]/gim,
				'</li><li>');

			// [SIZE]
			//			data = data.replace(/\[size=([^\]]*?)\]/gi, 
			//					"<span style=\"font-size: $1;\">");
			//			data = data.replace(/\[\/size\]/gim, '</span>');
			data = data.replace(/\[size=([^\]]*?)\]/gi,
				"<font size=\"$1\">");
			data = data.replace(/\[\/size\]/gim, '</font>');

			// [COLOR]
			data = data.replace(/\[color=([^\]]*?)\]/gi,
				"<font color=\"$1\">");
			data = data.replace(/\[\/color\]/gim, '</font>');

			return data;
		},

		_replaceComplexHtml: function (data) {
			var imgs,
				fonts,
				replaceHtml,
				i,
				root = $("<div/>").html(data);

			//img
			imgs = $("img", root);
			$.each(imgs, function () {
				replaceHtml = '[IMG height=' + $(this).height() +
								' width=' + $(this).width() +
								']' +
							    $(this).attr("src").toString() + '[/IMG]';
				$(this).replaceWith(replaceHtml);
			});

			//font
			fonts = $("font", root);

			for (i = fonts.length - 1; i >= 0; i--) {
				if ($(fonts[i]).attr("color") && $($(fonts[i])).attr("size")) {
					replaceHtml = '[Color=' + $($(fonts[i])).attr("color") + ']' + 
					'[Size=' + $($(fonts[i])).attr("size") + ']' + 
					$($(fonts[i])).html() + '[/Size][/Color]';
				} else if ($($(fonts[i])).attr("color") && !$($(fonts[i])).attr("size")) {
					replaceHtml = '[Color=' + $($(fonts[i])).attr("color") + '] ' + 
					$($(fonts[i])).html() + '[/Color]';
				} else if ($($(fonts[i])).attr("size") && !$($(fonts[i])).attr("color")) {
					replaceHtml = '[Size=' + $($(fonts[i])).attr("size") + ']' + 
					$($(fonts[i])).html() + '[/Size]';
				}
				$($(fonts[i])).replaceWith(replaceHtml);
			}

			return root.html();
		},

		_convertHtmlToBBCode: function (data) {
			var self = this;

			if (data === "") {
				return;
			}
			data = self._replaceComplexHtml(data);

			// Convert <br> to line breaks.
			data = data.replace(/<br(?=[ \/>]).*?>/gim,
					'\r\n');

			// [URL]
			data = data.replace(/<a .*?href=(["'])(.+?)\1.*?>(.+?)<\/a>/gi,
				'[URL=$2]$3[/URL]');
			// [Email]
			data = data.replace(/<a .*?href=(["'])mailto:(.+?)\1.*?>(.+?)<\/a>/gi,
				'[EMAIL=$2]$3[/EMAIL]');

			// [B]
			data = data.replace(/<(?:b|strong)>/gim, '[B]');
			data = data.replace(/<\/(?:b|strong)>/gim, '[/B]');

			// [I]
			data = data.replace(/<(?:i|em)>/gim, '[I]');
			data = data.replace(/<\/(?:i|em)>/gim, '[/I]');

			// [strike]
			data = data.replace(/<(?:strike|s)>/gim, '[S]');
			data = data.replace(/<\/(?:strike|s)>/gim, '[/S]');

			// [U]
			data = data.replace(/<u>/gim, '[U]');
			data = data.replace(/<\/u>/gim, '[/U]');

			// [IMG]
			//data = data.replace(/<img\s{1}.*?src\s{0,1}=\s{0,1}["'](.+?)["'].*/gim, 
			//		'[IMG="$1"][/IMG]');
			//data = data.replace(/<img\s{1}([^>]*)src\s{0,1}=\s{0,1}["'](.+?)["']([^>]*)>/gim, 
			//	'[IMG $1$3]$2[/IMG]');

			// [BLOCK]
			data = data.replace(/<blockquote.*?\>/gim, '[BLOCK]');
			data = data.replace(/\s{0,}<\/blockquote>/gim, '[/BLOCK]');

			// Ordered List [OL]
			data = data.replace(/(?:\r\n|\r|\n){0,1}<(?:ol)>[\s]*/gim, '[LIST=1]');
			data = data.replace(/<\/(?:ol)>/gim, '[/LIST]');

			// Unordered List [UL]
			//\r\n<ul> must convert to ul 
			data = data.replace(/(?:\r\n|\r|\n){0,1}\<(?:ul)>[\s]*/gim, '[LIST]');
			data = data.replace(/<\/(?:ul)>/gim, '[/LIST]');

			// [LI]
			data = data
			.replace(/\s{0,}<li\s{0,1}.*?>([\s\S]*?)\n{0,}\s{0,}<\/li>/gim, '[*]$1');

			//space convert
			data = data.replace(/&nbsp;/gi, " ");

			// Remove remaining tags.
			data = data.replace(/(<[^>]+>)/gm, '');

			return data;
		},

		_convertFontStyleToStandTag: function () {
			var self = this,
			doc = self._getDesignViewDocument(),
			$designviewBody = $(doc.body),
			currentNode, bbcodeMark,
			colorTag = $("[style*='color: ']", $designviewBody);

			if (colorTag.length !== 0) {
				currentNode = colorTag;
				bbcodeMark = "<font color='" + 
				self._getWebColorFromRgb(colorTag.css("color")) + 
					"'></font>";
			}

			if (currentNode) {
				$.each(currentNode, function (i) {
					//there is no attribute in span, 
					//like <span style="color:#123">xxx</b>
					//must replace span with new tag
					//like <b>XXX</b>
					if ($(this).is("span")) {
						$(this).replaceWith(
								$(bbcodeMark).html($(this).html()));
					} else if ($(this).is("font") && $(this).attr("size")) {
						//note: there are other attribute in span
						//like <span style="font-size:15px, color=#123">XXX</b>
						// so insert new tag in span content
						//like <span style="font-size:15px><b>XXX</b></span>
						//maybe there is no need here
						//$(this).css("color", undefined)
						$(this).removeAttr("style")
							.html($(bbcodeMark).html($(this).html()));
					}
				});
			}
		},

		_convertStyleToStandTag: function () {
			var self = this,
			doc = self._getDesignViewDocument(),
			$designviewBody = $(doc.body),
			currentNode, bbcodeMark, currentAttr,
			boldTag = $("[style*='font-weight: bold;']", $designviewBody),
			italicTag = $("[style*='font-style: italic;']", $designviewBody),
			strikeTag = $("[style*='text-decoration: line-through;']", $designviewBody),
			underlineTag = $("[style*='text-decoration: underline;']", $designviewBody);

			if (boldTag.length !== 0) {
				currentNode = boldTag;
				bbcodeMark = "<b></b>";
				currentAttr = "font-weight";
			} else if (italicTag.length !== 0) {
				currentNode = italicTag;
				bbcodeMark = "<i></i>";
				currentAttr = "font-style";
			} else if (strikeTag.length !== 0) {
				currentNode = strikeTag;
				bbcodeMark = "<strike></strikes>";
				currentAttr = "text-decoration";
			} else if (underlineTag.length !== 0) {
				currentNode = underlineTag;
				bbcodeMark = "<u></u>";
				currentAttr = "text-decoration";
			}

			if (currentNode) {
				$.each(currentNode, function (i) {
					//there is no attribute in span, 
					//like <span style="color:#123">xxx</b>
					//must replace span with new tag
					//like <b>XXX</b>
					if ($(this).is("span") && this.style.fontSize === "") {
						$(this).replaceWith(
								$(bbcodeMark).html($(this).html()));
					} else {
						//note: there are other attribute in span
						//like <span style="font-size:15px, color=#123">XXX</b>
						// so insert new tag in span content
						//like <span style="font-size:15px><b>XXX</b></span>
						//maybe there is no need here
						//$(this).css(currentAttr, null)
						$(this).removeAttr("style")
							.html($(bbcodeMark).html($(this).html()));
					}
				});
			}
		},

		_getWebColorFromRgb: function (rgbColor) {
			var self = this, rgbColorItems;

			if (rgbColor.indexOf('rgb(') === 0) {
				rgbColorItems = rgbColor.substring(4, rgbColor.length - 1).split(',');
				rgbColor = self._convertToWebColor(wijParseInt(rgbColorItems[0]),
					wijParseInt(rgbColorItems[1]), wijParseInt(rgbColorItems[2]));
			}
			return rgbColor;

		},
		//end bbcode 

		//common for dialogs.
		_updateList: function (list, $select) {
			var name;

			$("option", $select).remove();

			for (name in list) {
				if (list[name]) {
					$select.append("<option>" + name + "</option>");
				}
			}
		},

		_triggerEvent: function (evName, arg) {
			var self = this,
		ev = self.options[evName];

			if (ev && typeof (ev) === "function") {
				return ev.call(self, arg);
			}

			return ev;
		},

		_closeDialog: function () {
			this.dialog.wijdialog("close");
		},
		//end of common dialogs.

		//begin to handle the template dialog.
		_onTemplateList: function (arg) {
			return this._triggerEvent("templateList", arg);
		},

		updateTemplateList: function (templateList, select) {
			var self = this,
		$select = select || $("select", self.dialog);

			self._updateList(templateList, $select);
			self._templateList = templateList;
		},

		initTemplateDialog: function () {
			var self = this,
		$dlg = self.dialog,
		tplList = $("select", $dlg),
		templateList = self._onTemplateList();

			$dlg.delegate("select", "change." + self.widgetName, function () {
				self.templateListOnChanged();
			})
			.delegate("." + css_tpl_delete, "click." + self.widgetName, function () {
				self.deleteTemplate();
			})
			.delegate("." + css_tpl_save, "click." + self.widgetName, function () {
				self.saveTemplate();
			})
			.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.applyTemplate();
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});

			if (!templateList) {
				templateList = self._templateList;

				if (!templateList) {
					return;
				}
			}

			self.updateTemplateList(templateList, tplList);
		},

		templateListOnChanged: function () {
			var self = this,
				$dlg = self.dialog,
				selectedTpl = $("select", $dlg).val(),
				preview = $('iframe', $dlg),
				templateList = self._templateList,
				template;

			if (!templateList) {
				return;
			}

			template = templateList[selectedTpl];

			if (template.src) {
				preview.attr("src", template.src +
			'?d=' + new Date().getMilliseconds().toString());
			}

			if (template.text && preview.length > 0) {
				preview[0].contentWindow.document.write(template.text);
			}

			if (selectedTpl) {
				$("." + css_tpl_nameinfo, $dlg).html(selectedTpl);
				$("." + css_tpl_namefield, $dlg).val(selectedTpl);
			}

			if (template.desc) {
				$("." + css_tpl_desinfo, $dlg).html(template.desc);
				$("." + css_tpl_desfield, $dlg).val(template.desc);
			}
		},
		
		_onSaveTemplate: function (arg) {
			this._triggerEvent("saveTemplate", arg);
		},

		saveTemplate: function () {
			var self = this,
				$dlg = self.dialog,
				name = $("." + css_tpl_namefield, $dlg).val(),
				desc = $("." + css_tpl_desfield, $dlg).val(),
				templateList = self._templateList,
				text = this._getDesignViewText();

			if ($.trim(name) === '') {
				wijAlert("Please input a template name!");
				return;
			}

			if (!templateList) {
				self._templateList = [];
				templateList = self._templateList;
			}

			if (!templateList[name]) {
				$("select", $dlg).append("<option>" + name + "</option>");
			}

			templateList[name] = { desc: desc, text: text };
			self._onSaveTemplate({ name: name, desc: desc, text: text });
		},

		_onDeleteTemplate: function (arg) {
			this._triggerEvent("deleteTemplate", arg);
		},

		deleteTemplate: function () {
			var self = this,
		$dlg = self.dialog,
		tplList = $("select", $dlg),
		selectedTpl = tplList.val(),
		templateList = self._templateList;

			if ($.trim(selectedTpl) === '') {
				wijAlert("Please select a template file.");
				return;
			}

			$("option:selected", tplList).remove();
			$('iframe', $dlg).attr("src", "about:blank");
			$("." + css_tpl_nameinfo, $dlg).empty();
			$("." + css_tpl_namefield, $dlg).val("");
			$("." + css_tpl_desinfo, $dlg).empty();
			$("." + css_tpl_desfield, $dlg).val("");

			delete templateList[selectedTpl];
			self._onDeleteTemplate(selectedTpl);
		},

		applyTemplate: function () {
			var self = this,
			$dlg = self.dialog,
			tplList = $("select", $dlg),
			selectedTpl = tplList.val(),
			preview = $('iframe', $dlg)[0],
			name = $("." + css_tpl_namefield, $dlg).val(),
			html = preview.contentWindow.document.body.innerHTML;

			if ($.trim(name) === '' || $.trim(selectedTpl) === '') {
				wijAlert("Please select a valid template file.");
				return;
			}

			self._setDesignViewText(html);
			self._addtoUndoBuffer();
			self._setSaveBtnEnabled();

			self._closeDialog();
		},

		//begin to handle the image dialog.
		_onImageList: function () {
			var self = this,
		imageList = self.options.imageList;

			if (imageList && typeof (imageList) === "function") {
				return imageList.call(self);
			}

			return imageList;
		},

		updateImageList: function (imgList, select) {
			var self = this,
		$dlg = self.dialog,
		$select = select || $("select", $dlg),
		$imgfields = $("." + css_imgdlg_field, $dlg);

			self._updateList(imgList, $select);
			self._imgList = imgList;

			if (!imgList) {
				$imgfields.addClass(css_imgdlg_hideimglist);
				return;
			}

			$imgfields.removeClass(css_imgdlg_hideimglist);
		},

		initImageBrowserDialog: function () {
			var self = this,
		$dlg = self.dialog,
		imgList = self._onImageList();

			$("img", $dlg).hide();

			$dlg.delegate("select", "change." + self.widgetName, function () {
				self.imageListOnChanged(this);
			})
		.delegate("." + css_imgdlg_url + " input", "change." + self.widgetName,
		function () {
				self.imageUrlChanged(this);
			})
		.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitInsertImageDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
		.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});

			if (!imgList) {
				imgList = self._imgList;

				if (!imgList) {
					$("." + css_imgdlg_field, $dlg).addClass(css_imgdlg_hideimglist);
					return;
				}
			}

			self.updateImageList(imgList, $("select", $dlg));
		},

		imageUrlChanged: function (element) {
			$('img', this.dialog).attr("src", $(element).val()).show();
		},

		imageListOnChanged: function () {
			var self = this,
		$dlg = self.dialog,
		selectedImg = $('select', $dlg).val(),
		imgList = self._imgList,
		img;

			if (!imgList) {
				return;
			}

			img = imgList[selectedImg];

			$('img', $dlg).attr("src", img).show();
			$("." + css_imgdlg_url + " input", $dlg).attr("value", img);
			wijWindow.setTimeout(function () {
				$("." + css_imgdlg_width + " input", $dlg).val($('img', $dlg).width());
				$("." + css_imgdlg_height + " input", $dlg).val($('img', $dlg).height());
			}, 200);
		},

		submitInsertImageDialog: function () {
			var self = this, imageHtml,
		$dlg = self.dialog,
		imgUrl = $("." + css_imgdlg_url + " input", $dlg).val(),
		alt = $("." + css_imgdlg_alt + " input", $dlg).val(),
		width = $("." + css_imgdlg_width + " input", $dlg).val(),
		height = $("." + css_imgdlg_height + " input", $dlg).val(),
		css = $("." + css_imgdlg_css + " input", $dlg).val();

			if ($.trim(imgUrl) === "") {
				wijAlert("Please select a image.");
				return;
			}

			if (!self._isNumeric(width)) {
				wijAlert("Please input a number for 'Image width' textbox.");
				return;
			}

			if (!self._isNumeric(height)) {
				wijAlert("Please input a number for 'Image height' textbox.");
				return;
			}

			self.focus();
			imageHtml = '<img src="' + imgUrl + '" alt="' + alt + '" width="' +
			width + '" height="' + height;
			if (self.options.mode !== "bbcode") {
				imageHtml += '" style="' + css;
			}
			imageHtml += '"/>';
			self.insertHTML(imageHtml);
			self._closeDialog();
		},

		//begin to handle the link dialog.
		initHyperLinkDialog: function () {
			var self = this,
			$dlg = self.dialog,
			address = self.getLinkHrefField(),
			$address = $("." + css_linkdlg_address + " input", $dlg);

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitHyperLinkDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			})
			.delegate("." + css_linkdlg_anchor, "change." + self.widgetName, function () {
				self.anchorListOnChanged(this);
			})
			.delegate("." + css_linkdlg_linktype + ">div", "click." + self.widgetName,
			function () {
				self.radioListOnChanged();
			});

			try {
				$address.val(address);
				$("." + css_linkdlg_text + " input", $dlg).val(self._getLinkInnerHTML());
				$("." + css_linkdlg_css + " input", $dlg).val(self._getLinkCssField());
				$("." + css_linkdlg_target + " select", $dlg).val(self._getLinkTarget());
			} catch (e) { }

			$("#radAnchor", $dlg).attr("checked", "checked");
			if (address.length > 6) {
				if (address.substring(0, 4) === 'http') {
					$("#radUrl", $dlg).attr("checked", "checked");
				} else if (address.substring(0, 6) === 'mailto') {
					$("#radMail", $dlg).attr("checked", "checked");
				} else {
					if (address.substring(0, 1) === '#') {
	    				$("#radAnchor", $dlg).attr("checked", "checked");
	                }else {
	    				$("#radFile", $dlg).attr("checked", "checked");
	    			}
				}
			}

		},

		_getLinkInnerHTML: function () {
			var self = this,
		inspElem;

			self.focus();
			inspElem = self._getInspectElement();

			if (inspElem && inspElem.tagName === 'A') {
				return inspElem.innerHTML || '';
			}

			return self.getSelectionHTMLContent() || '';
		},

		getLinkHrefField: function () {
			var self = this,
		inspElem;

			self.focus();
			inspElem = self._getInspectElement();
			
			try {
				if (inspElem && inspElem.tagName === 'A') {
					return self.fixAbsoluteUrlsIfNeeded(inspElem.href || '');
				}
			} catch (error) {
				
			}
			return '';
		},

		_getLinkTarget: function () {
			var self = this,
		inspElem;

			self.focus();
			inspElem = self._getInspectElement();

			if (inspElem && inspElem.tagName === 'A') {
				return inspElem.target || '';
			}

			return '';
		},

		_getLinkCssField: function () {
			var self = this,
		inspElem;

			self.focus();
			inspElem = self._getInspectElement();

			if (inspElem && inspElem.tagName === 'A') {
				return inspElem.style.cssText || '';
			}

			return '';
		},

		submitHyperLinkDialog: function () {
			var self = this,
		$dlg = self.dialog,
		$radMail = $("#radMail", $dlg),
		$address = $("." + css_linkdlg_address + " input", $dlg),
		$text = $("." + css_linkdlg_text + " input", $dlg),
		$css = $("." + css_linkdlg_css + " input", $dlg),
		$target = $("." + css_linkdlg_target + " select", $dlg),
		address = $address.val(),
		text = $text.val(),
		target = $target.val(),
		css = $css.val();

			if (address === '') {
				wijAlert('Please input address!');
				return;
			}

			if (text === '') {
				wijAlert('Please input display text!');
				return;
			}

			if ($radMail.attr("checked") &&
		!self._isEmail(address)) {
				wijAlert('Please input correct email!');
				return;
			}

			self._editLink(text, address, css, target);
			self._closeDialog();
		},

		_editLink: function (text, href, css, target) {
			var self = this,
		inspElem, html = '';

			self.focus();
			inspElem = self._getInspectElement();

			if (inspElem && inspElem.tagName === 'A') {
				inspElem.innerHTML = text;
				inspElem.href = href;
				inspElem.target = target;

				if (css !== inspElem.style.cssText) {
					inspElem.style.cssText = css;
				}

				self._addtoUndoBuffer();
				self._setSaveBtnEnabled();

				return;
			}

			html = '<a href="' + href + '" target="' + target + '"';

			if (css !== '') {
				html += ' style="' + css + '"';
			}

			html += '>' + text + '</a>';

			self._setIESelection();
			self.insertHTML(html);
		},

		anchorListOnChanged: function (list) {
			var self = this,
		$dlg = self.dialog,
		val = $(list).val();

			if (val !== '') {
				$("." + css_linkdlg_address + " input", $dlg).val(val);
				$("#radAnchor", $dlg).attr("checked", "checked");
			}
		},

		radioListOnChanged: function () {
			var self = this,
		$dlg = self.dialog,
		$anchor = $("." + css_linkdlg_anchor, $dlg),
		$address = $("." + css_linkdlg_address + " input", $dlg);

			$address.val("");

			if ($("#radUrl", $dlg).is(":checked")) {
				$anchor.hide();
			} else if ($("#radAnchor", $dlg).is(":checked")) {
				$anchor.show();
			} else if ($("#radMail", $dlg).is(":checked")) {
				$anchor.hide();
				$address.val('mailto:');
			} else if ($("#radFile", $dlg).is(":checked")) {
				$anchor.hide();
			}
		},
		//end of link dialog.

		//beging to handle the insert code dialog
		_getDialogRes_Code: function () {
			var self = this,
			dialog = self._createDiv(css_linkdlg);

			dialog.add(self._createElement("div", "Enter source code", {
				"class": css_codedlg_sourcelabel
			}));
			dialog.add(self._createElement("textarea", "", {
				"class": css_codedlg_source
			}));

			dialog.add(self._createSeparator());
			dialog.add(self._createOKCancelButtons());

			return dialog.render();
		},

		initInsertCodeDialog: function () {
			var self = this,
			$dlg = self.dialog;
			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitCodeDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});
		},

		submitCodeDialog: function () {
			var self = this,
			$dlg = self.dialog,
			$source = $("." + css_codedlg_source, $dlg),
			html = $source.val();

			if (html === '') {
				return;
			}
			html = html.replace(/</g, '&lt;');
			html = html.replace(/>/g, '&gt;');
			html = '<pre>' + html + '</pre>';
			self._setIESelection();
			self.insertHTML(html);
			self._closeDialog();
		},
		//end of insert code dialog

		//begin to handle the tagInspector dialog.
		initTagInspectorDialog: function () {
			var self = this,
			$dlg = self.dialog,
			$innerHTML = $("." + css_taginsdlg_innerhtml);

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitTagInspectorDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			})
			.delegate("#displayNoEmpty", "click." + self.widgetName, function () {
				self.tagInspectorDialogSwitchAttList(this);
			});

			self._laySelectedElementAttributes(
			$("." + css_taginsdlg_attriblist, $dlg),
			$("." + css_taginsdlg_tagtext, $dlg));

			$("." + css_taginsdlg_css + " input", $dlg)
			.val(self._getSelectedElementStyle());

			if (self._selectedElementCanHaveChildren()) {
				$innerHTML.show();
				$("textarea", $innerHTML).val(self._getSelectedElementInnerHTML());
			} else {
				$innerHTML.hide();
			}
		},

		submitTagInspectorDialog: function () {
			var self = this,
		$dlg = self.dialog,
		el = self._getInspectElement(),
		$attriblist = $("." + css_taginsdlg_attriblist, $dlg),
		cssText = $("." + css_taginsdlg_css + " input").val(),
		innerHTML = $("." + css_taginsdlg_innerhtml + " textarea").val();

			try {
				$.each($("input:checkbox", $attriblist), function (idx, chk) {
					var attrName, attrValue,
				$chk = $(chk);

					if ($chk.is(":checked")) {
						attrName = $chk.siblings("span").text();
						attrName = attrName.substring(0, attrName.length - 1);
						attrValue = $chk.siblings("input:text").val();
						$(el).attr(attrName, attrValue);
					}
				});

				if ($.trim(cssText) !== '') {
					el.style.cssText = cssText;
				}

				if (self._selectedElementCanHaveChildren()) {
					$(el).html(innerHTML);
				}
			} catch (error) {
			}

			self._closeDialog();
			self._addtoUndoBuffer();
			self._setSaveBtnEnabled();
		},

		tagInspectorDialogSwitchAttList: function (element) {
			var $attriblis = $("." + css_taginsdlg_attriblist, this.dialog),
			showAll = !element.checked;

			$.each($("input:text", $attriblis), function (idx, text) {
				if ($(text).val() === "") {
					$(text).parent("li")[showAll ? "show" : "hide"]();
				}
			});
		},

		_laySelectedElementAttributes: function ($attriblist, $tag) {
			var self = this,
		el = self._getInspectElement(),
		dic, tag, attrs,
		html = "";

			if (!el) {
				return;
			}

			$tag.html(el.tagName);

			dic = self._getDictionaryDeclare();
			tag = el.tagName.toLowerCase();
			attrs = dic[tag];

			switch (tag) {
			case 'ul':
			case 'u':
			case 'textarea':
			case 'tbody':
			case 'tr':
			case 'th':
			case 'td':
			case 'table':
			case 'select':
			case 'strong':
			case 'span':
			case 'p':
			case 'option':
			case 'ol':
			case 'li':
			case 'label':
			case 'input':
			case 'img':
			case 'i':
			case 'hr':
			case 'form':
			case 'font':
			case 'em':
			case 'div':
			case 'code':
			case 'button':
			case 'body':
			case 'b':
			case 'a':
				html += "<ul class='ui-helper-reset'>";

				$.each(attrs, function (idx, attr) {
					var val = el.getAttribute(attr) || "";

					html += "<li><span class='" + css_dlg_text + "'>";
					html += attr + ":</span>";
					html += "<input type='text' value='" + val + "'/>";
					html += "<input type='checkbox' id='save" + idx + "'/>";
					html += "<label for='save" + idx + "'>Save</label></li>";
				});
				break;
			}

			$attriblist.html(html);
		},

		_getSelectedElementStyle: function () {
			var inspElem = this._getInspectElement();

			if (inspElem && inspElem.style) {
				return inspElem.style.cssText || '';
			} else {
				return '';
			}
		},

		_getSelectedElementInnerHTML: function () {
			var inspElem = this._getInspectElement();

			if (inspElem) {
				return inspElem.innerHTML;
			} else {
				return '';
			}
		},

		_selectedElementCanHaveChildren: function () {
			return !$(this._getInspectElement()).is("input,hr,br,img");
		},
		//end of tag inspector dialog.

		//begin to handle the color dialog.
		initBackColorDialog: function () {
			this._initColorDialog("BackColor");
		},

		initForeColorDialog: function () {
			this._initColorDialog("ForeColor");
		},

		_initColorDialog: function (colorCommand) {
			var self = this,
				$dlg = self.dialog,
				doc = self._getDesignViewDocument(),
				color = doc.queryCommandValue(colorCommand),
				iColor, items, sColor;

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitColorDialog(colorCommand);
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});

			if (color) {
				sColor = color.toString();

				if ($.browser.msie) {
					iColor = wijParseInt(sColor);

					sColor = 'rgb(' + (iColor & 255) + ', ' +
						((iColor & 65280) >> 8) + ', ' +
						((iColor & 16711680) >> 16) + ')';
				}

				if (sColor.indexOf('rgb(') === 0) {
					items = sColor.substring(4, sColor.length - 1).split(',');
					sColor = self._convertToWebColor(wijParseInt(items[0]),
						wijParseInt(items[1]), wijParseInt(items[2]));
				} else if (sColor.indexOf('rgba(') === 0) {
					items = sColor.substring(5, sColor.length - 1).split(',');
					sColor = self._convertToWebColor(wijParseInt(items[0]),
						wijParseInt(items[1]), wijParseInt(items[2]));
				}

				$("." + css_colordlg_color + " input", $dlg).attr("value", sColor);
			}

			$("." + css_colordlg_picker, $dlg)
			.wijeditorcolorcanvas("." + css_colordlg_color + " input", sColor);
		},

		submitColorDialog: function (colorCommand) {
			var self = this,
				$color = $("." + css_colordlg_color + " input", self.dialog);

			self.setColor(colorCommand, $color.val());
			self._closeDialog();
		},

		setColor: function (cmdID, color) {
			var self = this,
				doc = self._getDesignViewDocument(),
				win = self._getDesignViewWindow(), selection;

			self._setIESelection();

			if ($.browser.mozilla && cmdID === 'BackColor') {
				selection = win.getSelection();
				self.insertHTML('<span style="background-color:' +
					color + ';">' + selection + '</span>');
			} else {
				doc.execCommand(cmdID, false, color);
				if (self.options.mode === "bbcode" && !($.browser.msie)) {
					self._convertFontStyleToStandTag();
				}
			}

			self._addtoUndoBuffer();
			self._setSaveBtnEnabled();
		},
		//end of color dialog.

		//begin to handle the table dialog.
		////begin to handle the insert table dialog.
		initInsertTableDialog: function () {
			var self = this,
			$dlg = self.dialog;

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitInsertTableDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			//update for fixing issue 20275 issue by wh at 2012/3/12
			//note: jquery upgrade the first and last have some problems
			//.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
			.delegate(selector_input_cancel, "click." + self.widgetName, function () {
		    //end for 20275 issue
				self._closeDialog();
			})
			.delegate("." + css_tabledlg_bgcolor + " input:button",
			"click." + self.widgetName, function () {
				self.showTableColorDialog(this);
			});
		},

		submitInsertTableDialog: function () {
			var self = this,
				attribs = self._getValuesFromTableDialog();

			if (!attribs) {
				return;
			}

			self._insertTable(attribs);
			self._closeDialog();
		},

		_insertTable: function (attribs) {
			var self = this,
			html = '', i, j;

			if (!attribs) {
				return false;
			}

			self._setIEFocus();

			html += '<table width="' + attribs.width +
			'" height="' + attribs.height +
			'" cellspacing="' + attribs.cspacing +
			'" cellpadding="' + attribs.cpadding +
			'" border="' + attribs.border +
			'" bgcolor="' + attribs.bgcolor +
			'" style="' + attribs.css + '">';

			for (i = 0; i < attribs.rows; i++) {
				html += '<tr>';
				for (j = 0; j < attribs.cols; j++) {
					html += '<td>Cell ' + (i + 1) +
			'-' + (j + 1) + '</td>';
				}
				html += '</tr>';
			}
			html += '</table>';

			if ($.browser.mozilla ||
			 ($.browser.msie && wijParseInt($.browser.version) >= 9)) {
				html += '<br />';
			}

			self.insertHTML(html);
		},
		////end of the insert table dialog.

		////begin to handle the edit table dialog.
		initEditTableDialog: function () {
			var self = this,
			$dlg = self.dialog,
			el = self._getInspectElement(),
			rows, columns;

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitEditTableDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			//update for fixing 20275 issue by wh at 2012/3/12
			//.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
			.delegate(selector_input_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			})
			//end for 20275 issue
			.delegate("." + css_tabledlg_bgcolor + " input:button",
			"click." + self.widgetName, function () {
				self.showTableColorDialog(this);
			});

			if (!el) {
				return;
			}

			try {
				rows = el.rows;

				if (rows.length > 0) {
					columns = rows[0].cells.length;
				} else {
					columns = 0;
				}

				rows = rows.length;
			} catch (e) {
			}

			$("." + css_tabledlg_rows + " input", $dlg).val(rows);
			$("." + css_tabledlg_columns + " input", $dlg).val(columns);
			$("." + css_tabledlg_width + " input", $dlg)
			.val(el.getAttribute("width"));
			$("." + css_tabledlg_height + " input", $dlg)
			.val(el.getAttribute("height"));
			$("." + css_tabledlg_border + " input", $dlg)
			.val(el.getAttribute("border"));
			$("." + css_tabledlg_cellpadding + " input", $dlg)
			.val(el.getAttribute("cellPadding"));
			$("." + css_tabledlg_cellspacing + " input", $dlg)
			.val(el.getAttribute("cellSpacing"));
			$("." + css_tabledlg_bgcolor + " input", $dlg)
			.val(el.getAttribute("bgcolor") || "#ffffff");
			$("." + css_tabledlg_csstext + " input", $dlg)
			.val(el.style.cssText);
		},

		submitEditTableDialog: function () {
			var self = this,
		el = self._getInspectElement(),
		$el = $(el),
		attribs = self._getValuesFromTableDialog(),
		rows = attribs && wijParseInt(attribs.rows),
		cols = attribs && wijParseInt(attribs.cols),
		newRow, newCell;

			if (!attribs) {
				return;
			}

			if (el) {
				$el.attr("width", attribs.width);
				$el.attr("height", attribs.height);
				$el.attr("bgcolor", attribs.bgcolor);
				$el.attr("border", attribs.border);
				$el.attr("cellSpacing", attribs.cspacing);
				$el.attr("cellPadding", attribs.cpadding);

				el.style.cssText = attribs.css;

				if (!rows || isNaN(rows)) {
					return;
				}

				if (!cols || isNaN(cols)) {
					return;
				}

				while (el.rows.length > rows) {
					el.deleteRow(0);
				}

				while (el.rows.length < rows) {
					newRow = el.insertRow(0);
					while (newRow.cells.length < cols) {
						newCell = newRow.insertCell(0);
						newCell.innerHTML = '&nbsp;';
					}
				}

				$.each(el.rows, function (idx, row) {
					while (row.cells.length > cols) {
						row.deleteCell(0);
					}

					while (row.cells.length < cols) {
						newCell = row.insertCell(0);
						newCell.innerHTML = '&nbsp;';
					}
				});
			}

			self._closeDialog();
		},
		////end of the edit table dialog.

		_getValuesFromTableDialog: function () {
			var self = this,
			$dlg = self.dialog,
			rows = $("." + css_tabledlg_rows + " input", $dlg).val(),
			cols = $("." + css_tabledlg_columns + " input", $dlg).val(),
			width = $("." + css_tabledlg_width + " input", $dlg).val(),
			height = $("." + css_tabledlg_height + " input", $dlg).val(),
			border = $("." + css_tabledlg_border + " input", $dlg).val(),
			cpadding = $("." + css_tabledlg_cellpadding + " input", $dlg).val(),
			cspacing = $("." + css_tabledlg_cellspacing + " input", $dlg).val(),
			css = $("." + css_tabledlg_csstext + " input", $dlg).val(),
			bgcolor = $("." + css_tabledlg_bgcolor + " input", $dlg).val();

			if (!self._isNumeric(rows)) {
				wijAlert("Please input a number for 'Rows' textbox.");
				return false;
			}

			if (!self._isNumeric(cols)) {
				wijAlert("Please input a number for 'Columns' textbox.");
				return false;
			}

			if (!self._isNumeric(width)) {
				wijAlert("Please input a number for 'Table Width ' textbox.");
				return false;
			}

			if (!self._isNumeric(height)) {
				wijAlert("Please input a number for 'Table Height' textbox.");
				return false;
			}

			if (!self._isNumeric(border)) {
				wijAlert("Please input a number for 'Border thickness' textbox.");
				return false;
			}

			if (!self._isNumeric(cpadding)) {
				wijAlert("Please input a number for 'Cell Padding' textbox.");
				return false;
			}

			if (!self._isNumeric(cspacing)) {
				wijAlert("Please input a number for 'Cell Spacing' textbox.");
				return false;
			}

			return {
				rows: rows,
				cols: cols,
				width: wijParseInt(width),
				height: wijParseInt(height),
				border: border, 
				cpadding: cpadding,
				cspacing: cspacing, 
				css: css,
				bgcolor: bgcolor
			};
		},

		showTableColorDialog: function (el) {
			var self = this,
			$subDlg = self.subDialog,
			bgcolor = $(el).prev().val(),
			content = self._getDialogRes_Color();

			$subDlg.empty().append(content)
			.wijdialog({
				width: "auto",
				height: "auto",
				modal: true,
				title: "Set Background Color",
				position: "center",
				resizable: false,
				captionButtons: {
					pin: { visible: false },
					refresh: { visible: false },
					toggle: { visible: false },
					minimize: { visible: false },
					maximize: { visible: false }
				}
			});

			//update for fixing issue 20275 by wh at 2012/3/12
			//$subDlg.delegate(selector_dlg_ok,, "click." + self.widgetName, function () {
			$subDlg.delegate(selector_input_ok, "click." + self.widgetName, function () {
				self.submitTableColorDialog();
			})
			//.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
			.delegate(selector_input_cancel, "click." + self.widgetName, function () {
				self.closeSubDialog();
			});
			//end for 20275 issue

			if (bgcolor !== "") {
				$("." + css_colordlg_color + " input", $subDlg).val(bgcolor);
			}

			$("." + css_colordlg_picker, $subDlg)
			.wijeditorcolorcanvas("." + css_colordlg_color + " input", bgcolor);

			$subDlg.wijdialog("open");
		},

		submitTableColorDialog: function () {
			var self = this,
		$subDlg = self.subDialog,
		$dlg = self.dialog,
		color = $("." + css_colordlg_color + " input", $subDlg).val();

			$("." + css_tabledlg_bgcolor + " input:text", $dlg).val(color);
			self.closeSubDialog();
		},

		closeSubDialog: function () {
			this.subDialog.wijdialog("close");
		},

		_getEditableTable: function () {
			var self = this, table,
		editableTable, $editableTable;

			editableTable = self._getSelectedElement();

			if (!editableTable) {
				wijAlert('Please select a table!');
				return false;
			}

			$editableTable = $(editableTable);

			if ($editableTable.is("td,tr,tbody")) {
				editableTable = $editableTable.parents("table:first")[0];
			} else {
				table = $editableTable.find("table:only-child");
				if ($.browser.msie && table.length) {
					editableTable = table[0];
				}
				else {
					wijAlert('Please select a table!');
					return false;
				}
			}

			inspectElement = editableTable;
			return true;
		},
		//end of table dialog.

		//begin to handle the preview dialog.
		initPreviewDialog: function () {
			var self = this,
			$dlg = self.dialog;

			self._setPreviewContent(0);

			$dlg.delegate("#rad640_480", "click." + self.widgetName, function () {
				self._setPreviewDialogSize(640, 480);
			}).delegate("#rad800_600", "click." + self.widgetName, function () {
				self._setPreviewDialogSize(800, 600);
			}).delegate("#rad1024_768", "click." + self.widgetName, function () {
				self._setPreviewDialogSize(1024, 768);
			}).delegate("#chkSplit", "click." + self.widgetName, function () {
				self._splitPreviewPages(this.checked);
			}).delegate("." + css_previewdlg_printall, "click." + self.widgetName,
			function () {
				self._printPreviewPage(true);
			}).delegate("." + css_previewdlg_printone, "click." + self.widgetName,
			function () {
				self._printPreviewPage(false);
			}).delegate("." + css_previewdlg_ok, "click." + self.widgetName,
			function () {
				self._closeDialog();
			}).delegate("." + css_previewdlg_prev, "click." + self.widgetName,
			function () {
				self._navigatePreviewPage(false);
			}).delegate("." + css_previewdlg_next, "click." + self.widgetName,
			function () {
				self._navigatePreviewPage(true);
			});
		},

		_setPreviewContent: function (pageIndex) {
			var self = this,
		$dlg = self.dialog,
		$iframe = $("iframe", $dlg),
		$pager = $("." + css_previewdlg_navigator + " span", $dlg),
		doc = $iframe[0].contentWindow.document;

			doc.open();

			if (pageIndex === -1) {
				doc.write(self._getPreviewAllPageContent());
				$pager.html('1 / 1');
			} else {
				doc.write(self._getPreviewPageContent(pageIndex));
				$pager.html((pageIndex + 1) + ' / ' + self._getPreviewPageCount());
			}

			doc.close();
		},

		_setPreviewDialogSize: function (width, height) {
			var self = this,
		$dlg = self.dialog,
		$iframe = $("iframe", $dlg),
		offsetW = $dlg.wijdialog("option", "width"),
		offsetH = $dlg.wijdialog("option", "height");

			if (offsetW === "auto") {
				offsetW = $dlg.parent(".wijmo-wijdialog").width() - $iframe.width();
			} else {
				offsetW = offsetW - $iframe.width();
			}

			if (offsetH === "auto") {
				offsetH = $dlg.parent(".wijmo-wijdialog").height() - $iframe.height();
			} else {
				offsetH = offsetH - $iframe.height();
			}

			$iframe.css("width", width).css("height", height);
			$dlg.wijdialog("option", {
				width: width + offsetW,
				height: height + offsetH
			});
		},

		_getPreviewPageCount: function () {
			return this._getPreviewPages().length;
		},

		_getPreviewPageContent: function (pageIndex) {
			var contents = this._getPreviewPages();

			if (contents.length > pageIndex) {
				return contents[pageIndex];
			}

			return null;
		},

		_getPreviewAllPageContent: function () {
			return this._getDesignViewText();
		},

		_getPreviewPages: function () {
			var contents = this._getPreviewAllPageContent(),
		regexp = new RegExp('<(DIV|div)[^>]*(page-break-before|' +
		'PAGE-BREAK-BEFORE)[ ]*:[ ]*always[^>]*>(.*?)<\\/(DIV|div)>', 'g'),
		tempContents = contents.replace(regexp, '!-~U^n#i@q,P|.a=g~e+br!');

			return tempContents.split('!-~U^n#i@q,P|.a=g~e+br!');
		},

		_curPageIdx: 0,

		_splitPreviewPages: function (isSplit) {
			var self = this,
		$dlg = self.dialog,
		$pdoc = $("." + css_previewdlg_printdocument, $dlg),
		$pnav = $("." + css_previewdlg_navigator, $dlg);

			if (isSplit) {
				self._setPreviewContent(0);
				$pnav.show();
				$pdoc.hide();
			} else {
				self._setPreviewContent(-1);
				$pnav.hide();
				$pdoc.show();
			}

			self._curPageIdx = 0;
		},

		_navigatePreviewPage: function (isNext) {
			var self = this,
		$chkSplit = $("#chkSplit", self.dialog),
		curIdx = self._curPageIdx,
		pageCount = self._getPreviewPageCount();

			if ($chkSplit.is(":checked")) {
				if (isNext) {
					curIdx++;
					if (curIdx < pageCount) {
						self._setPreviewContent(curIdx);
					} else {
						curIdx = pageCount - 1;
					}
				} else {
					curIdx--;
					if (curIdx >= 0) {
						self._setPreviewContent(curIdx);
					} else {
						curIdx = 0;
					}
				}

				self._curPageIdx = curIdx;
			}
		},

		_printPreviewPage: function (isAll) {
			var self = this,
		$dlg = self.dialog,
		$chkSplit = $("#chkSplit", $dlg),
		win = $("iframe", $dlg)[0].contentWindow;

			if (isAll) {
				$chkSplit.removeAttr("checked");
				self._setPreviewContent(-1);
			}

			win.focus();
			win.print();
		},
		//end of preview dialog.

		//begin to handle the cleanup dialog.
		initCleanUpDialog: function () {
			var self = this,
			$dlg = self.dialog;

			$("textarea", $dlg).val(self.sourceView.val());

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitCleanUpDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});
		},

		submitCleanUpDialog: function () {
			var self = this,
		$dlg = self.dialog,
		$sourceView = self.sourceView,
		source = $sourceView.val(),
		reg;

			if ($("#replaceSpans", $dlg).is(":checked")) {
				reg = new RegExp('<\\/?SPAN[^>]*>', 'g');
				source = source.replace(reg, '');
			}

			if ($("#replaceClass", $dlg).is(":checked")) {
				reg = new RegExp('<(\\w[^>]*) class=([^ |>]*)([^>]*)', 'g');
				source = source.replace(reg, '<$1$3');
			}

			if ($("#replaceStyle", $dlg).is(":checked")) {
				reg = new RegExp('<(\\w[^>]*) style=\"([^\"]*)\"([^>]*)', 'g');
				source = source.replace(reg, '<$1$3');
				reg = new RegExp('<(\\w[^>]*) lang=([^ |>]*)([^>]*)', 'g');
				source = source.replace(reg, '<$1$3');
				reg = new RegExp('<\\\\?\\?xml[^>]*>', 'g');
				source = source.replace(reg, '');
				reg = new RegExp('<\\/?\\w+:[^>]*>', 'g');
				source = source.replace(reg, '');
			}

			if ($("#replaceNbsp", $dlg).is(":checked")) {
				reg = new RegExp('&nbsp;', 'g');
				source = source.replace(reg, ' ');
			}

			if ($("#transformPtoDiv", $dlg).is(":checked")) {
				reg = new RegExp('(<P)([^>]*>.*?)(<\\/P>)', 'g');
				source = source.replace(reg, '<div$2</div>');
			}

			$sourceView.val(source);
			self._setDesignViewText(source);
			self._addtoUndoBuffer();
			self._closeDialog();
		},
		//end of cleanup dialog.

		//begin to handle the find/replace dialog.
		initFindDialog: function () {
			var self = this,
			$dlg = self.dialog;

			//update for fixing issue 20316 by wh at 2012/3/14
			if (self.tRange) {
				self.tRange = null;
			}
			//end for 20316 issue.
			
			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitFindAction();
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self.submitReplaceAction();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			});
		},

		submitFindAction: function () {
			var self = this,
		text = $("textarea:first", self.dialog).val();

			if ($.trim(text) === '') {
				return;
			}

			self._findAndReplaceString(text);
		},

		submitReplaceAction: function () {
			var self = this,
		$dlg = self.dialog,
		fText = $("textarea:first", $dlg).val(),
		rText = $("textarea:last", $dlg).val();

			if ($.trim(fText) === '') {
				return;
			}

			if ($.trim(rText) === '') {
				wijAlert('please input replace string');
				return;
			}

			self._findAndReplaceString(fText, rText);
		},

		tRange: null,
		txtFoundInIE: false,
		txtFoundInNoneIE: false,

		_findAndReplaceString: function (fText, rText) {
			var self = this,
		contentWindow = self._getDesignViewWindow(),
		strFound = 0,
		strReplaced = false,
		needReplace = rText && rText !== fText;

			if (!rText) {
				rText = fText;
			}

			if ($.browser.msie) {
				if (self.tRange) {
					if (self.txtFoundInIE && needReplace) {
						self.tRange.pasteHTML(rText);
						self.tRange = null;
						strReplaced = true;
						self.txtFoundInIE = false;
					} else {
						self.tRange.collapse(false);
						strFound = self.tRange.findText(fText);
						if (strFound) {
							self.tRange.select();
						}
					}
				}
				if (!strReplaced && (!self.tRange || !strFound)) {
					self.tRange = contentWindow.document.body.createTextRange();
					strFound = self.tRange.findText(fText);
					if (strFound) {
						self.tRange.select();
						if (needReplace) {
							self.tRange.pasteHTML(rText);
							self.tRange = null;
							strReplaced = true;
						}
					}
				}
			} else {
				if (self.txtFoundInNoneIE && needReplace) {
					self._replaceSelectionForNoneIE(rText);
					strReplaced = true;
					self.txtFoundInNoneIE = false;
				} else {
					strFound = contentWindow.find(fText);
					if (!strFound) {
						strFound = contentWindow.find(fText, 0, 1);
						while (contentWindow.find(fText, 0, 1)) {
							continue;
						}
					}
				}
				self.txtFoundInNoneIE = self.txtFoundInNoneIE || strFound;
				if (self.txtFoundInNoneIE && needReplace) {
					self._replaceSelectionForNoneIE(rText);
					strReplaced = true;
					self.txtFoundInNoneIE = false;
				}
			}

			if (!strFound && !strReplaced) {
				wijAlert('"' + fText + '" String Not Found');
				self.tRange = null;
				self.txtFoundInNoneIE = false;
				self.txtFoundInIE = false;
			} else {
				self.txtFoundInIE = true;
			}
		},

		_replaceSelectionForNoneIE: function (html) {
			var doc = this._getDesignViewDocument(),
		randomStr = 'insert_html_' + Math.round(Math.random() * 100000000),
		regex = new RegExp('<[^<]*' + randomStr + '[^>]*>');

			doc.execCommand('insertimage', false, randomStr);
			doc.body.innerHTML = doc.body.innerHTML.replace(regex, html);
		},
		//end of find/replace dialog.

		//begin to handle the media dialog.
		initMediaDialog: function () {
			var self = this,
			$dlg = self.dialog;

			$dlg.delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self.submitMediaDialog();
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			})
			.delegate(selector_dlg_cancel, "click." + self.widgetName, function () {
				self._closeDialog();
			});
		},

		submitMediaDialog: function () {
			var self = this,
		$dlg = self.dialog,
		type = $("select", $dlg).val(),
		url = $("." + css_mediadlg_url + " input", $dlg).val(),
		width = $("." + css_mediadlg_width + " input", $dlg).val(),
		height = $("." + css_mediadlg_height + " input", $dlg).val();

			if (url === '') {
				wijAlert('URL is empty!');
				return;
			}

			if (!self._isUrl(url)) {
				wijAlert('please input correct URL!');
				return;
			}

			if (!self._isNumeric(width)) {
				wijAlert('please input width of the media!');
				return;
			}

			if (!self._isNumeric(height)) {
				wijAlert('please input height of the media!');
				return;
			}

			self._insertMedia(type, url, width, height);
			self._closeDialog();
		},

		_insertMedia: function (type, url, width, height) {
			var self = this, html = '';

			self._setIESelection();

			switch (type) {
			case 'video':
				html += '<embed src="' + url + '" width="' + width + '" ' +
					'height="' + height + '" ' +
					'type=audio/x-pn-realaudio-plugin console="Clip1" ' +
					'controls="IMAGEWINDOW,ControlPanel,StatusBar" ' +
					'autostart="true"></embed>';
				break;
			case 'flash':
				html += '<object classid="' +
						'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ' +
						'codebase="http://download.macromedia.com/pub/' +
						'shockwave/cabs/flash/swflash.cab#version=6,0,29,0" ' +
						'width="' + width + '" height="' + height + '">';
				html += '<param name="movie" value="' + url + '">';
				html += '<param name="quality" value="high">';
				html += '<embed src="' + url + '" quality="high" ' +
						'pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
						'type="application/x-shockwave-flash" ' +
						'width="' + width + '" height="' + height + '"></embed>';
				html += '</object>';
				break;
			case 'applet':
				html += '<applet code="' + url + '" width="' + width + '" ' +
						'height="' + height + '"></applet>';
				break;
			case 'other':
				html += '<embed src="' + url + '" width="' + width + '" ' +
						'height="' + height + '"></embed>';
				break;
			}

			self.insertHTML(html);
		},
		//end of media dialog.

		//begin to handle the special char dialog.
		initSpecialCharacterDialog: function () {
			var self = this,
		$dlg = self.dialog,
		$preview = $("." + css_specialchardlg_content + " span", $dlg);

			$dlg.delegate("label", "click." + self.widgetName, function () {
				self.submitSpecialCharacterDialog(this);
				//add for any change happens, the text would be saved by wh at 2011/12/07
				self._onDesignViewBlur();
				//end for change happens
			}).delegate(selector_dlg_ok, "click." + self.widgetName, function () {
				self._closeDialog();
			}).delegate("label", "mouseover." + self.widgetName, function () {
				$preview.html($(this).html());
			}).delegate("label", "mouseout." + self.widgetName, function () {
				$preview.empty();
			});
		},

		submitSpecialCharacterDialog: function (element) {
			var self = this;

			self._setIESelection();
			self.insertHTML($(element).html());
			self._closeDialog();
		},
		//end of special dialog.

		//	selectElement: function (pElement) {
		//		var designView = this._getDesignView().get(0);
		//		//
		//		this._C1WEB__SelectElement(designView.contentWindow, pElement);
		//		this.refreshPathSelector();
		//	},

		//begin to handle the ribbon commands.
		_setSaveBtnEnabled: function () {
			$ribbon.wijribbon(setButtonDisabled, cmd_save, false);
		},

		//undo/redo action.
		_undoAction: function () {
			var body = this._getDesignViewDocument().body,
		buttonStates = {};

			undoSteps--;
			if (undoSteps <= 0) {
				undoSteps = 0;
			}

			body.innerHTML = undoBuffers[undoSteps];

			if (!undoSteps) {
				buttonStates[cmd_undo] = true;
				buttonStates[cmd_redo] = false;
				$ribbon.wijribbon(setButtonsDisabled, buttonStates);
			} else {
				$ribbon.wijribbon(setButtonDisabled, cmd_redo, false);
			}
		},

		_redoAction: function () {
			var body = this._getDesignViewDocument().body,
		len = undoBuffers.length,
		buttonStates = {};

			undoSteps++;
			if (undoSteps >= len - 1) {
				undoSteps = len - 1;
			}

			body.innerHTML = undoBuffers[undoSteps];

			if (undoSteps === len - 1) {
				buttonStates[cmd_undo] = false;
				buttonStates[cmd_redo] = true;
				$ribbon.wijribbon(setButtonsDisabled, buttonStates);
			} else {
				$ribbon.wijribbon(setButtonDisabled, cmd_undo, false);
			}
		},

		_addtoUndoBuffer: function () {
			var len = undoBuffers.length - 1 - undoSteps,
		idx;

			for (idx = 0; idx < len; idx++) {
				undoBuffers.pop();
			}
			undoSteps++;
			undoBuffers.push(this._getDesignViewText());
			$ribbon.wijribbon(setButtonDisabled, cmd_undo, false);
		},
		//end of undo/redo action.

		//delete action for cut.
		_deleteSelectionContent: function () {
			var cWin = this._getDesignViewWindow(),
		selection, i, range,
		rangeCount = "rangeCount";

			if ($.browser.msie) {
				selection = cWin.document.selection;
				if (selection.type.toLowerCase() !== 'none') {
					selection.clear();
				}
			} else {
				selection = cWin.getSelection();
				for (i = 0; i < selection[rangeCount]; i++) {
					range = selection.getRangeAt(i);
					range.deleteContents();
				}
			}
		},
		//end of delete action for cut.

		//path selector action.
		_refreshPathSelector: function () {
			var self = this,
		inspEl = self._getParentElement(self._getDesignViewWindow()),
		$pathSelector = self._getPathSelector(),
		$parents = $(inspEl).parents(),
		len = $parents.length,
		css = "wijmo-wijeditor-label ui-state-default ui-corner-all",
		idx;

			if (!inspEl) {
				return;
			}

			$pathSelector.empty();

			for (idx = len - 1; idx >= 0; idx--) {
				$pathSelector.append("<label class='" + css + "'>&lt;" +
			$parents[idx].tagName.toLowerCase() + "&gt;</label>");
			}

			$pathSelector.append("<label class='" + css +
			" wijmo-wijeditor-selectlabel ui-state-highlight ui-corner-all'>&lt;" +
			inspEl.tagName.toLowerCase() + "&gt;</label>");
		},
		//end of path selector action.

		//table borders action.
		_toggleTableBorders: function () {
			var doc = this._getDesignViewDocument(),
		$bStyle = $('#__wijStyle', doc);

			tblBorderShowing = !tblBorderShowing;

			if ($.browser.safari) {
				if (tblBorderShowing) {
					$bStyle.html('table,td,tr{border: 1px #acacac dashed;}');
				} else {
					$bStyle.empty();
				}
			} else {
				$bStyle.attr("disabled", !tblBorderShowing);
			}
		},
		//end of table borders action.

		//table action.
		_tableAction: function (type) {
			var self = this,
		inspEl = self._getParentElement(self._getDesignViewWindow()),
		$td = $(inspEl).closest("td"),
		$tr, $table, td, tr, table, rowIdx, cellIdx, cellCount, rowCount,
		newRow, idx = 0;

			self._setSaveBtnEnabled();
			if ($td.length === 0 && type !== cmd_mergecell) {
				return false;
			} else if (type !== cmd_mergecell) {
				$tr = $td.parent();
				$table = $tr.closest("table");
				td = $td[0];
				tr = $tr[0];
				table = $table[0];
				rowIdx = tr.rowIndex;
				cellIdx = td.cellIndex;
			}
			try {
				switch (type) {
				case cmd_insertrow:
					cellCount = tr.cells.length;
					newRow = table.insertRow(rowIdx);

					for (idx = 0; idx < cellCount; idx++) {
						self._insertCell(newRow, idx);
					}
					break;
				case cmd_removerow:
					table.deleteRow(rowIdx);
					break;
				case cmd_insertcolumn:
					rowCount = table.rows.length;

					for (idx = 0; idx < rowCount; idx++) {
						self._insertCell(table.rows[idx], cellIdx);
					}
					break;
				case cmd_removecolumn:
					self._removeColumn(table, cellIdx);
					break;
				case cmd_insertcell:
					self._insertCell(tr, cellIdx + 1);
					break;
				case cmd_removecell:
					cellCount = tr.cells.length;

					if (cellCount === 1) {
						table.deleteRow(rowIdx);
					} else {
						tr.deleteCell(cellIdx);
					}
					break;
				case cmd_splitcell:
					self._splitCell(table, tr, rowIdx, cellIdx);
					break;
				case cmd_mergecell:
					self._mergeCell(self._getSelectedCells(inspEl));
					break;
				}
				//
				this._addtoUndoBuffer();
			} catch (e) {
				wijAlert(e.message);
				return false;
			}
			return true;
		},

		_removeColumn: function (table, curCellIndex) {
			var rowCount = table.rows.length,
		idx = 0,
		tr, cells, cellCount, cellIdx, colSpan;

			while (idx < rowCount) {
				tr = table.rows[idx];
				cells = tr.cells;
				cellCount = cells.length;
				cellIdx = (curCellIndex > cellCount - 1) ?
			cellCount - 1 : curCellIndex;
				colSpan = cells[cellIdx].colSpan;

				if (colSpan > 1 && cellCount > 1) {
					if (cellIdx + 1 < cellCount) {
						(cells[cellIdx + 1]).colSpan += colSpan - 1;
					} else {
						(cells[cellIdx - 1]).colSpan += colSpan + 1;
					}
				}

				if (cellCount === 1) {
					table.deleteRow(idx);
					rowCount = table.rows.length;
				} else {
					tr.deleteCell(cellIdx);
					idx++;
				}
			}
		},

		_splitCell: function (table, tr, rowIndex, cellIndex) {
			var rowCount = table.rows.length,
		idx = 0,
		colSpan = 0,
		tempRow, tempColSpan,
		i, maxCellIdx, tempRowCount;

			while (idx <= cellIndex) {
				if (tr.cells[idx].colSpan > 1) {
					colSpan += tr.cells[idx].colSpan - 1;
				}
				idx++;
			}

			this._insertCell(tr, cellIndex + 1);

			for (i = 0; i < rowCount; i++) {
				tempRow = table.rows[i];
				if (i !== rowIndex) {
					maxCellIdx = cellIndex;
					idx = 0;
					tempColSpan = 0;
					while (idx <= maxCellIdx) {
						if (tempRow.cells[idx].colSpan > 1) {
							tempColSpan += tempRow.cells[idx].colSpan - 1;
							maxCellIdx -= tempColSpan;
						}
						idx++;
					}
					tempRowCount = cellIndex + colSpan - tempColSpan;
					if (tempRowCount < 0) {
						tempRowCount = 0;
					}
					tempRow.cells[tempRowCount].colSpan++;
				}
			}
		},

		_mergeCell: function (cells) {
			var len = cells.length,
		tr, sIdx, eIdx, idx;

			if (len < 2 ||
		cells[0].parentNode !== cells[len - 1].parentNode) {
				return false;
			}

			tr = cells[0].parentNode;
			sIdx = cells[0].cellIndex;
			eIdx = sIdx + len;

			for (idx = sIdx + 1; idx < eIdx; idx++) {
				tr.cells[sIdx].innerHTML += tr.cells[sIdx + 1].innerHTML;
				tr.cells[sIdx].colSpan++;
				tr.deleteCell(sIdx + 1);
			}
		},

		_getSelectedCells: function (inspEl) {
			var win = this._getDesignViewWindow(),
		doc = win.document,
		cells = [],
		range, parent, selection,
		idx, rangeCount,
		sContainer, nodeName, offset;

			if ($.browser.msie) {
				range = doc.selection.createRange();
				parent = $(inspEl).closest("tr")[0];
				if (parent) {
					$.each(parent.cells, function (idx, cell) {
						var cellRange = doc.selection.createRange(),
					cep = "compareEndPoints";

						cellRange.moveToElementText(cell);

						if (range.inRange(cellRange) ||
					(range[cep]('StartToStart', cellRange) >= 0 &&
					range[cep]('StartToEnd', cellRange) <= 0) ||
					(range[cep]('EndToStart', cellRange) >= 0 &&
					range[cep]('EndToEnd', cellRange) <= 0)) {
							cells.push(cell);
						}
					});
				}
			} else if ($.browser.mozilla) {
				selection = win.getSelection();
				rangeCount = selection.rangeCount;

				for (idx = 0; idx < rangeCount; idx++) {
					range = selection.getRangeAt(idx);
					sContainer = range.startContainer;
					nodeName = sContainer.nodeName.toLowerCase();

					if (nodeName === 'td' || nodeName === 'th') {
						cells.push(sContainer);
					} else if (nodeName === 'tr') {
						offset = range.startOffset;
						cells.push(sContainer.cells[offset]);
					}
				}
			} else {
				selection = win.getSelection();
				parent = $(inspEl).closest("tr")[0];

				if (parent) {
					rangeCount = parent.cells.length;

					for (idx = 0; idx < rangeCount; idx++) {
						cells.push(parent.cells[idx]);
					}
				}
			}

			return cells;
		},
		//end of table action.

		//insert date time.
		insertDateAndTime: function () {
			this.insertHTML(new Date().toDateString() + ' ' + new Date().toTimeString());
		},
		//end of insert date time.

		//wordwrap action.
		_toggleWordWrap: function () {
			var self = this,
		$sourceView = self.sourceView,
		wrap = "wrap", value;

			wordwrap = !wordwrap;
			value = wordwrap ? 'soft' : 'off';

			$sourceView.attr(wrap, value);
			$sourceView[0].focus();

			if ($.browser.mozilla) {
				$sourceView.hide();

				wijWindow.setTimeout(function () {
					$sourceView.show();
				}, 40);
			}
		},
		//end of wordwrap action.

		//insert html text to the document.
		insertHTML: function (htmlText) {
			var self = this,
		doc = self._getDesignViewDocument(),
		range;

			try {
				if ($.browser.msie) {
					range = doc.selection.createRange();
					range.pasteHTML(htmlText);
					range.collapse(false);
					range.select();
				} else {
					doc.execCommand('insertHTML', false, htmlText);
				}
			} catch (e) {
			}

			self._addtoUndoBuffer();
			self._setSaveBtnEnabled();
		},
		//end of insert html text to the document.

		//get selected content.
		_getSelectedContent: function () {
			var win = this._getDesignViewWindow(),
		doc = win.document,
		selectedContent = "",
		cloneContents = "cloneContents",
		range, contents, helperDiv;

			if (!doc.selection) {
				range = win.getSelection().getRangeAt(0);

				if (range) {
					if (range[cloneContents]) {
						contents = range[cloneContents]();
						helperDiv = document.createElement('div');
						helperDiv.appendChild(contents);
						selectedContent = helperDiv.innerHTML;
						helperDiv = null;
					}
				}
			} else {
				range = doc.selection.createRange();
				return range.htmlText;
			}

			return selectedContent || "";
		},
		//end of get selected content.

		//focus related methods in ie.
		_setIESelection: function () {
			if ($.browser.msie && rangeSelection) {
				rangeSelection.select();
			}
		},

		_setIEFocus: function () {
			var doc = this._getDesignViewDocument();

			if ($.browser.msie) {
				try {
					doc.body.focus();
				} catch (ee) {
				}
			}
		},

		focus: function () {
			var win = this._getDesignViewWindow(),
		doc = win.document;

			if ($.browser.msie) {
				if (!rangeSelection) {
					doc.body.focus();
				} else {
					rangeSelection.select();
				}
			} else {
				win.focus();
			}
		},
		//end of focus related methods in ie.

		//gets inspect element.
		_getInspectElement: function () {
			return inspectElement || this._getSelectedElement();
		},

		_getSelectedElement: function () {
			return this._getParentElement(this._getDesignViewWindow());
		},
		//end of gets inspect element.

		_createElement: function (tagName, innerText, attribs) {
			return new HtmlElement(tagName, innerText, attribs);
		},

		_createDiv: function (className) {
			return this._createElement("div", { "class": className });
		},

		_createSpan: function (className, text) {
			var self = this;

			if (!text) {
				return self._createElement("span", { "class": className });
			}

			if (className.length === 0) {
				return self._createElement("span", text);
			}

			return this._createElement("span", text, { "class": className });
		},

		_createTextBox: function (className, text) {
			var attrs = { "class": className, "type": "text" };

			if (text) {
				attrs.value = text;
			}

			return this._createElement("input", attrs);
		},

		_createLabel: function (text, labelfor) {
			if (labelfor) {
				return new HtmlElement("label", text, { "for": labelfor });
			}
			return new HtmlElement("label", text);
		},

		_createRadio: function (id, name, value) {
			var attrs = { name: name, id: id, value: value, type: "radio" };
			return this._createElement("input", attrs);
		},

		_createCheckbox: function (id) {
			var attrs = { "type": "checkbox", id: id };
			return this._createElement("input", "", attrs);
		},

		_createSelect: function (classname, options) {
			var self = this,
		attrs = { "class": classname },
		select = self._createElement("select", attrs);

			if (classname === "") {
				select = self._createElement("select");
			}
			$.each(options, function (i, o) {
				if ($.isPlainObject(o) && o.selected) {
					select.add(self._createElement("option", o.text, {
						selected: "selected"
					}));
				} else {
					select.add(self._createElement("option", o));
				}
			});
			return select;
		},


		_createInputButton: function (className, text) {
			var attrs = { "class": className, "type": "button" };

			if (text) {
				attrs.value = text;
			}

			return this._createElement("input", attrs);
		},

		_createTextField: function (label, className, text, defaultValue) {
			var self = this,
		ele = self._createDiv(className),
		attrs = { type: "text" };

			if (defaultValue) {
				attrs.value = defaultValue;
			}

			ele.add(self._createSpan(css_dlg_text, label));
			ele.add(self._createElement("input", attrs));

			if (text) {
				ele.add(new TextElement(text));
			}

			return ele;
		},

		_createSeparator: function () {
			var self = this,
		hrdiv = self._createDiv(css_dlg_hr);

			hrdiv.add(self._createElement("hr"));

			return hrdiv;
		},

		_createOKCancelButtons: function () {
			var self = this,
		buttons = self._createDiv(css_dlg_buttons);

			buttons.add(self._createElement("input", {
				type: "button",
				"class": css_dlg_button,
				value: "OK"
			}));
			buttons.add(self._createElement("input", {
				type: "button",
				"class": css_dlg_button,
				value: "Cancel"
			}));

			return buttons;
		},

		_getDialogRes_Template: function () {
			var self = this,
			dialog = self._createDiv(css_tpldlg),
			topLabels = self._createDiv(css_tpl_labels),
			content = self._createDiv(css_tpl_content),
			tpllist = self._createDiv(css_tpl_list),
			preview = self._createDiv(css_tpl_preview),
			tplinfo = self._createDiv(css_tpl_tplinfo),
			namefield = self._createElement("div", "Name :"),
			desfield = self._createElement("div", "Description :"),
			fields = self._createDiv(css_tpl_fields),
			tplButtons = self._createDiv(css_tpl_buttons);

			topLabels.add(self._createElement("div", "Select Template:", {
				"class": css_tpl_tllabel
			}));
			topLabels.add(self._createElement("div", "Template Preview:", {
				"class": css_tpl_trlabel
			}));
			dialog.add(topLabels);

			tpllist.add(self._createElement("select", { size: 8 }));
			preview.add(self._createElement("iframe", { frameborder: 0 }));
			content.add(tpllist);
			content.add(preview);
			dialog.add(content);

			namefield.add(self._createSpan(css_tpl_nameinfo));
			desfield.add(self._createSpan(css_tpl_desinfo));
			tplinfo.add(namefield);
			tplinfo.add(desfield);
			dialog.add(tplinfo);

			fields.add(self._createSpan(css_dlg_text, "Name :"));
			fields.add(self._createTextBox(css_tpl_namefield));
			fields.add(self._createSpan(css_dlg_text, "Description :"));
			fields.add(self._createTextBox(css_tpl_desfield));
			dialog.add(fields);

			tplButtons.add(self._createInputButton(css_dlg_button + " " +
		css_tpl_delete, "Delete selected"));
			tplButtons.add(self._createInputButton(css_dlg_button + " " +
		css_tpl_save, "Save current page as template"));
			dialog.add(tplButtons);

			dialog.add(self._createSeparator());
			dialog.add(self._createOKCancelButtons());

			return dialog.render();
		},

		_getDialogRes_ImageBrowser: function () {
			var self = this,
			dialog = self._createDiv(css_imgdlg),
			content = self._createDiv(css_imgdlg_content),
			fields = self._createDiv(css_imgdlg_fields),
			imgField = self._createDiv(css_imgdlg_field),
			imglist = self._createDiv(css_imgdlg_list),
			imgpreview = self._createDiv(css_imgdlg_preview);

			fields.add(self._createTextField("Image src:", css_imgdlg_url));
			fields.add(self._createTextField("Image alt text:", css_imgdlg_alt));
			fields.add(self._createTextField("Image width:", css_imgdlg_width, "px"));
			fields.add(self._createTextField("Image height:", css_imgdlg_height, "px"));
			fields.add(self._createTextField("Css text:", css_imgdlg_css));
			content.add(fields);

			imgField.add(imglist);
			imglist.add(self._createElement("select", { size: 8 }));
			imgField.add(imgpreview);
			imgpreview.add(self._createElement("img", { src: "", alt: "" }));
			content.add(imgField);

			content.add(self._createSeparator());
			content.add(self._createOKCancelButtons());

			dialog.add(content);

			return dialog.render();
		},

		_getDialogRes_Link: function () {
			var self = this,
			dialog = self._createDiv(css_linkdlg),
			address = self._createTextField("Address :", css_linkdlg_address),
			linktype = self._createDiv(css_linkdlg_linktype),
			linktypecontainer = self._createElement("div"),
			radioArr = [{ id: "radUrl", value: "url" },
				{ id: "radAnchor", value: "anchor", checked: true },
				{ id: "radMail", value: "email"}],
			linkTypeOptions = [],
			text = self._createTextField("Text to display :", css_linkdlg_text),
			target = self._createDiv(css_linkdlg_target),
			targetSpan = self._createSpan(css_dlg_text, "Target :"),
			targetOption = [{ text: "_blank", selected: true },
				"_parent", "_self", "_top"],
			targetSelect = self._createSelect(css_linkdlg_target, targetOption),
			css = self._createTextField("Css :", css_linkdlg_css),
			idx;

			dialog.add(address);
			dialog.add(linktype);
			linktype.add(linktypecontainer);

			$.each(radioArr, function (idx, radio) {
				linktypecontainer.add(self._createRadio(radio.id, "radioList",
				radio.value));
				linktypecontainer.add(self._createLabel(radio.value, radio.id));
			});

			for (idx = 1; idx < 8; idx++) {
				linkTypeOptions.push("#anchor" + idx.toString());
			}
			linktype.add(self._createSelect(css_linkdlg_anchor, linkTypeOptions));

			dialog.add(self._createSeparator());
			dialog.add(text);
			dialog.add(target);

			target.add(targetSpan);
			target.add(targetSelect);

			dialog.add(css);
			dialog.add(self._createSeparator());
			dialog.add(self._createOKCancelButtons());

			return dialog.render();
		},

		_getDialogRes_TagInspector: function () {
			var self = this,
			taginsdlg = self._createDiv(css_taginsdlg),
			caption = self._createDiv(css_taginsdlg_caption),
			filterempty = self._createDiv(css_taginsdlg_filterempty),
			attribs = self._createDiv(css_taginsdlg_attribs),
			innerhtml = self._createDiv(css_taginsdlg_innerhtml);

			taginsdlg.add(caption);

			caption.add(self._createSpan(css_taginsdlg_taglabel, "Selected tag:"));
			caption.add(self._createSpan(css_taginsdlg_tagtext, ""));

			taginsdlg.add(filterempty);
			filterempty.add(self._createCheckbox("displayNoEmpty"));
			filterempty.add(self._createLabel("Display not empty attributes only",
			"displayNoEmpty"));

			taginsdlg.add(attribs);
			attribs.add(self._createSpan(css_dlg_text, "Attributes:"));
			attribs.add(self._createDiv(css_taginsdlg_attriblist));

			taginsdlg.add(innerhtml);
			innerhtml.add(self._createSpan(css_dlg_text, "Inner HTML:"));
			innerhtml.add(self._createElement("textarea"));

			taginsdlg.add(self._createTextField("Css Text:", css_taginsdlg_css));
			taginsdlg.add(self._createSeparator());
			taginsdlg.add(self._createOKCancelButtons());

			return taginsdlg.render();
		},

		_getDialogRes_Color: function () {
			return this._getDialogRes_CommonColor("#FFFFFF");
		},

		_getDialogRes_ForeColor: function () {
			return this._getDialogRes_CommonColor("#000000");
		},

		_getDialogRes_BackColor: function () {
			return this._getDialogRes_CommonColor("#FFFFFF");
		},

		_getDialogRes_CommonColor: function (initColor) {
			var self = this,
			colordlg = self._createDiv(css_colordlg),
			color = self._createDiv(css_colordlg_color);

			colordlg.add(self._createDiv(css_colordlg_picker));
			colordlg.add(color);
			color.add(self._createSpan(css_dlg_text, "Selected Color:"));
			color.add(self._createElement("input", { type: "text", value: initColor }));

			colordlg.add(self._createSeparator());
			colordlg.add(self._createOKCancelButtons());

			return colordlg.render();
		},

		_getDialogRes_Table: function () {
			var self = this,
			tbldlg = self._createDiv(css_tabledlg),
			bgcolor = self._createDiv(css_tabledlg_bgcolor);

			tbldlg.add(self._createTextField("Rows :", css_tabledlg_rows, "", 3));
			tbldlg.add(self._createTextField("Columns :", css_tabledlg_columns, "", 3));
			tbldlg.add(self._createTextField("Table Width :", css_tabledlg_width,
			"&nbsp;pixels", 200));
			tbldlg.add(self._createTextField("Table Height :", css_tabledlg_height,
			"&nbsp;pixels", 200));
			tbldlg.add(self._createTextField("Border thickness :", css_tabledlg_border));
			tbldlg.add(self._createTextField("Cell Padding :", css_tabledlg_cellpadding));
			tbldlg.add(self._createTextField("Cell Spacing :", css_tabledlg_cellspacing));
			tbldlg.add(self._createTextField("Css Text :", css_tabledlg_csstext));
			tbldlg.add(bgcolor);

			bgcolor.add(self._createSpan(css_dlg_text, "Background Color :"));
			bgcolor.add(self._createElement("input", { type: "text" }));
			bgcolor.add(self._createElement("input", { type: "button", value: "..." }));

			tbldlg.add(self._createSeparator());
			tbldlg.add(self._createOKCancelButtons());

			return tbldlg.render();
		},

		_getDialogRes_Preview: function () {
			var self = this,
			previewdlg = self._createDiv(css_previewdlg),
			caption = self._createDiv(css_previewdlg_caption),
			buttons = self._createDiv(css_dlg_buttons),
			navigate = self._createDiv(css_previewdlg_navigator),
			previewFrame = self._createDiv(css_previewdlg_previewiframe);

			previewdlg.add(caption);
			caption.add(self._createSpan(css_dlg_text, "Preview Size:"));
			caption.add(self._createElement("input", {
				id: "rad640_480",
				name: "preview",
				type: "radio",
				checked: "checked"
			}));
			caption.add(self._createLabel("640x480", "rad640_480"));
			caption.add(self._createElement("input", {
				id: "rad800_600",
				name: "preview",
				type: "radio"
			}));
			caption.add(self._createLabel("800x600", "rad800_600"));
			caption.add(self._createElement("input", {
				id: "rad1024_768",
				name: "preview",
				type: "radio"
			}));
			caption.add(self._createLabel("1024x768", "rad1024_768"));
			caption.add(self._createElement("input", {
				id: "chkSplit",
				type: "checkbox",
				checked: "checked"
			}));
			caption.add(self._createLabel("Split pages", "chkSplit"));
			previewdlg.add(self._createSeparator());
			previewdlg.add(buttons);

			buttons.add(self._createInputButton(css_dlg_button +
			" " + css_previewdlg_printall, "Print All"));
			buttons.add(self._createInputButton(css_dlg_button +
			" " + css_previewdlg_printone, "Print Page"));
			buttons.add(self._createInputButton(css_dlg_button +
			" " + css_previewdlg_ok, "OK"));

			previewdlg.add(self._createSeparator());
			previewdlg.add(navigate);
			navigate.add(self._createElement("a", "Prev page", {
				"class": css_previewdlg_prev,
				href: "#"
			}));
			navigate.add(self._createElement("span", "1 / 1"));
			navigate.add(self._createElement("a", "Next page", {
				"class": css_previewdlg_next,
				href: "#"
			}));

			previewdlg.add(self._createDiv(css_previewdlg_printdocument));
			previewdlg.add(previewFrame);
			previewFrame.add(self._createElement("iframe", { src: "about:blank" }));

			return previewdlg.render();
		},

		_getDialogRes_CleanUp: function () {
			var self = this,
			cleanupdlg = self._createDiv(css_cleanupdlg),
			caption = self._createDiv(css_cleanupdlg_caption),
			doc = self._createDiv(css_cleanupdlg_document),
			actions = self._createDiv(css_cleanupdlg_actions),
			actionsArr = [{ id: "replaceSpans", label: "Strip SPAN tag" },
				{ id: "replaceClass", label: "Strip CLASS tag" },
				{ id: "replaceStyle", label: "Strip STYLE attribute" },
				{ id: "replaceNbsp", label: "Replace &amp;nbsp; symbol" },
				{ id: "transformPtoDiv", label: "Transform Paragraph to DIV"}];

			cleanupdlg.add(caption);
			caption.add(self._createSpan(css_dlg_text, "Document source :"));

			cleanupdlg.add(doc);
			doc.add(self._createElement("textarea", { readonly: "readonly" }));

			cleanupdlg.add(actions);
			$.each(actionsArr, function (i, act) {
				actions.add(self._createCheckbox(act.id));
				actions.add(self._createLabel(act.label, act.id));
			});

			cleanupdlg.add(self._createSeparator());
			cleanupdlg.add(self._createOKCancelButtons());

			return cleanupdlg.render();
		},

		_getDialogRes_FindAndReplace: function () {
			var self = this,
			finddlg = self._createDiv(css_finddlg),
			find = self._createDiv(css_finddlg_find),
			replace = self._createDiv(css_finddlg_replace),
			buttons = self._createDiv(css_dlg_buttons);

			finddlg.add(find);
			find.add(self._createSpan(css_dlg_text, "Find:"));
			find.add(self._createElement("textarea", "text"));

			finddlg.add(replace);
			replace.add(self._createSpan(css_dlg_text, "Replace:"));
			replace.add(self._createElement("textarea"));

			finddlg.add(self._createSeparator());
			finddlg.add(buttons);
			buttons.add(self._createInputButton(css_dlg_button, "Find"));
			buttons.add(self._createInputButton(css_dlg_button, "Replace"));

			return finddlg.render();
		},

		_getDialogRes_Media: function () {
			var self = this,
			meddlg = self._createDiv(css_mediadlg),
			type = self._createDiv(css_mediadlg_type);

			meddlg.add(type);
			type.add(self._createSpan(css_dlg_text, "Media Type :"));
			type.add(self._createSelect("", ["flash", "video", "applet", "other"]));

			meddlg.add(self._createTextField("Media Url :", css_mediadlg_url));
			meddlg.add(self._createTextField("Width :", css_mediadlg_width, "px", 200));
			meddlg.add(self._createTextField("Height :", css_mediadlg_height, "px", 200));
			meddlg.add(self._createSeparator());
			meddlg.add(self._createOKCancelButtons());

			return meddlg.render();
		},

		_getDialogRes_SpecialCharacter: function () {
			var self = this,
			chardlg = self._createDiv(css_specialchardlg),
			chars = self._createDiv(css_specialchardlg_chars),
			preview = self._createDiv(css_specialchardlg_preview),
			content = self._createDiv(css_specialchardlg_content),
			list = self._createDiv(css_specialchardlg_list),
			punctuationLabel = self._createDiv(css_specialchardlg_label, "Punctuation"),
			punctuation = self._createDiv(css_specialchardlg_punctuation),
			punctuationArr = ["&#8211;", "&#8212;", "&iexcl;", "&iquest;",
							"&quot;", "&laquo;", "&raquo;", "&nbsp;"],
			symbolsLabel = self._createDiv(css_specialchardlg_label, "Symbols"),
			symbols = self._createDiv(css_specialchardlg_symbols),
			symbolsArr = ["&amp;", "&cent;", "&copy;", "&divide;", "&gt;", "&lt;",
							"&micro;", "&#8226;", "&para;", "&plusmn;",
							"&#8364;", "&pound;", "&reg;", "&sect;", "&yen;"],
			diacriticsLabel = self._createDiv(css_specialchardlg_label, "Diacritics"),
			diacritics = self._createDiv(css_specialchardlg_diacritics),
			diacriticsArr = ["&aacute;", "&Aacute;", "&agrave;", "&Agrave;",
							"&acirc;", "&Acirc;", "&aring;", "&Aring;",
							"&atilde;", "&Atilde;", "&auml;", "&Auml;",
							"&aelig;", "&AElig;", "&ccedil;", "&Ccedil;",
							"&eacute;", "&Eacute;", "&egrave;", "&Egrave;",
							"&ecirc;", "&Ecirc;", "&euml;", "&Euml;",
							"&iacute;", "&Iacute;", "&igrave;", "&Igrave;",
							"&icirc;", "&Icirc;", "&iuml;", "&Iuml;",
							"&ntilde;", "&Ntilde;", "&oacute;", "&Oacute;",
							"&ograve;", "&Ograve;", "&ocirc;", "&Ocirc;",
							"&oslash;", "&Oslash;", "&otilde;", "&Otilde;",
							"&ouml;", "&Ouml;", "&uacute;", "&Uacute;",
							"&ugrave;", "&Ugrave;", "&ucirc;", "&Ucirc;",
							"&uuml;", "&Uuml;", "&szlig;", "&yuml;",
							"&#8216;", "&#8217;"],
			buttons = self._createDiv(css_dlg_buttons);

			chardlg.add(chars);

			chars.add(preview);
			preview.add(content);
			content.add(new HtmlElement("span"));

			chars.add(list);
			list.add(punctuationLabel);
			punctuationLabel.add(punctuation);

			$.each(punctuationArr, function (i, n) {
				punctuation.add(self._createLabel(n));
			});

			list.add(symbolsLabel);
			symbolsLabel.add(symbols);
			$.each(symbolsArr, function (i, n) {
				symbols.add(self._createLabel(n));
			});

			list.add(diacriticsLabel);
			diacriticsLabel.add(diacritics);
			$.each(diacriticsArr, function (i, n) {
				diacritics.add(self._createLabel(n));
			});

			chardlg.add(self._createSeparator());

			buttons.add(self._createInputButton(css_dlg_button, "Cancel"));
			chardlg.add(buttons);

			return chardlg.render();
		},

		_copyFromClipboard: function () {
			var clip, trans,
			str = {},
			strLength = {};

			if (wijWindow.clipboardData) {
				return wijWindow.clipboardData.getData('Text');
			} else if ($.browser.mozilla) {
				try {
					if (netscape.security.PrivilegeManager.enablePrivilege) {
						netscape.security.PrivilegeManager
					.enablePrivilege("UniversalXPConnect");
					}
				} catch (ex) {
				}

				clip = Components.classes["@mozilla.org/widget/clipboard;1"]
				.getService(Components.interfaces.nsIClipboard);

				if (!clip) {
					return false;
				}

				trans = Components.classes["@mozilla.org/widget/transferable;1"]
				.createInstance(Components.interfaces.nsITransferable);
				if (!trans) {
					return false;
				}

				trans.addDataFlavor("text/unicode");
				clip.getData(trans, clip.kGlobalClipboard);
				trans.getTransferData("text/unicode", str, strLength);

				if (str) {
					str = str.value.QueryInterface(
						Components.interfaces.nsISupportsString);
				}

				if (str) {
					return str.data.substring(0, strLength.value / 2);
				}

				return "";
			}
		},

		_copyToClipboard: function (copyText) {
			var clip, trans, clipid,
			str = {},
			len = {};

			if (wijWindow.clipboardData && copyText) {
				wijWindow.clipboardData.setData("Text", copyText);
			} else if ($.browser.mozilla) {
				try {
					if (netscape.security.PrivilegeManager.enablePrivilege) {
						netscape.security.PrivilegeManager
					.enablePrivilege('UniversalXPConnect');
					}

					clip = Components.classes['@mozilla.org/widget/clipboard;1']
					.createInstance(Components.interfaces.nsIClipboard);

					if (!clip) {
						return;
					}

					trans = Components.classes['@mozilla.org/widget/transferable;1']
					.createInstance(Components.interfaces.nsITransferable);

					if (!trans) {
						return;
					}

					trans.addDataFlavor('text/unicode');

					str = {}; // new Object();
					len = {}; // new Object();

					str = Components.classes["@mozilla.org/supports-string;1"]
					.createInstance(Components.interfaces.nsISupportsString);

					str.data = copyText;

					trans.setTransferData("text/unicode", str, copyText.length * 2);
					clipid = Components.interfaces.nsIClipboard;

					if (!clip) {
						return false;
					}

					clip.setData(trans, null, clipid.kGlobalClipboard);
				} catch (e) {
					str = "Copy text to Clipboard \n";
					str += "If you are using firefox please do the following :\n ";
					str += "1. Write in your url box : 'about:config'\n";
					str += "2. Change signed.applets.codebase_principal_support = true\n";
					wijAlert(str);
				}
			}
		},

		fixAbsoluteUrlsIfNeeded: function (html) {
			var self = this,
			sBaseDocUrl = wijDoc.URL,
			sBaseUrl = wijDoc.URL,
			sRootBaseUrl = wijDoc.URL,
			baseUrlFound = false,
			len = sBaseUrl.length,
			ret = html,
			ch, ch2, s1, r, s2, s3, i, pos;

			for (i = len - 1; i > 0; i--) {
				ch = sBaseUrl.charAt(i);
				ch2 = sBaseUrl.charAt(i - 1);

				if (ch === '/' || ch === '\\') {
					if (ch === ch2) {
						break;
					}

					sRootBaseUrl = sBaseUrl.substring(0, i) + ch;

					if (!baseUrlFound) {
						sBaseUrl = sRootBaseUrl;
						baseUrlFound = true;
					}
				}
			}

			s1 = self._prepareLiteralRegexText(sBaseDocUrl + '?');
			r = new RegExp(s1, 'g');
			ret = ret.replace(r, '?');

			s2 = self._prepareLiteralRegexText(sBaseUrl);
			r = new RegExp(s2, 'g');
			ret = ret.replace(r, '');

			s3 = self._prepareLiteralRegexText(sRootBaseUrl);
			r = new RegExp(s3, 'g');
			ret = ret.replace(r, '/');

			pos = ret.indexOf('#');

			if (pos > -1) {
				ret = ret.substr(pos);
			}

			return ret;
		},

		_insertCell: function (row, idx) {
			var newCell = row.insertCell(idx);

			newCell.innerHTML = '&nbsp;';

			return newCell;
		},

		_getDictionaryDeclare: function () {
			var attrs = {};

			attrs.a = ['accesskey', 'charset', 'class', 'coords', 'dir',
					'href', 'hreflang', 'id', 'lang', 'name', 'rel',
					'rev', 'shape', 'tabindex', 'target', 'title'];

			attrs.b = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.body = ['alink', 'background', 'bgColor', 'bgproperties',
					'bottommargin', 'class', 'dir', 'id', 'lang',
					'leftmargin', 'link', 'marginheight', 'marginwidth',
					'rightmargin', 'text', 'title', 'topmargin', 'vlink'];

			attrs.button = ['accesskey', 'class', 'dir', 'disabled', 'id',
					'lang', 'name', 'tabindex', 'title', 'type', 'value'];

			attrs.code = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.div = ['align', 'class', 'dir', 'id', 'lang', 'title'];

			attrs.em = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.font = ['class', 'color', 'dir', 'face', 'id',
					'lang', 'pointsize', 'size', 'title'];

			attrs.form = ['action', 'class', 'dir', 'enctype', 'id', 'lang',
					'method', 'name', 'runat', 'target', 'title'];

			attrs.hr = ['align', 'class', 'color', 'id', 'noshade',
					'size', 'title', 'width'];

			attrs.i = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.img = ['align', 'alt', 'border', 'class', 'controls',
					'dir', 'dynsrc', 'height', 'hspace', 'id', 'ismap',
					'lang', 'longdesc', 'loop', 'lowsrc', 'name', 'src',
					'start', 'title', 'usemap', 'vspace', 'width'];

			attrs.input = ['accept', 'accesskey', 'align', 'alt', 'border',
					'checked', 'class', 'dir', 'disabled', 'height',
					'hspace', 'id', 'lang', 'maxlength', 'name',
					'readonly', 'size', 'src', 'tabindex', 'title',
					'type', 'usemap', 'value', 'vspace', 'width'];

			attrs.label = ['accesskey', 'class', 'dir', 'for', 'id',
					'lang', 'title'];

			attrs.li = ['class', 'dir', 'id', 'lang', 'title', 'type', 'value'];

			attrs.ol = ['class', 'compact', 'dir', 'id', 'lang',
					'start', 'title', 'type'];

			attrs.option = ['class', 'dir', 'disabled', 'id', 'label',
					'lang', 'selected', 'title', 'value'];

			attrs.p = ['align', 'class', 'dir', 'id', 'lang', 'title'];

			attrs.span = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.strong = ['class', 'dir', 'id', 'lang', 'title'];

			attrs.select = ['accesskey', 'class', 'dir', 'disabled', 'id', 'lang',
						'multiple', 'name', 'size', 'tabindex', 'title'];

			attrs.table = ['align', 'background', 'bgColor', 'border',
						'bordercolor', 'bordercolordark', 'bordercolorlight',
						'cellpadding', 'cellspacing', 'class', 'cols',
						'datapagesize', 'dir', 'frame', 'height', 'hspace',
						'id', 'lang', 'rules', 'summary', 'title', 'vspace', 'width'];

			attrs.td = ['abbr', 'align', 'axis', 'background', 'bgColor',
					'bordercolor', 'bordercolordark', 'bordercolorlight',
					'class', 'colspan', 'dir', 'headers', 'height', 'id',
					'lang', 'nowrap', 'rowspan', 'scope', 'title', 'valign', 'width'];

			attrs.th = ['abbr', 'align', 'axis', 'background', 'bgColor', 'bordercolor',
					'bordercolordark', 'bordercolorlight', 'class', 'colspan',
					'dir', 'headers', 'height', 'id', 'lang', 'nowrap', 'rowspan',
					'scope', 'title', 'valign', 'width'];

			attrs.tr = ['align', 'bgColor', 'bordercolor', 'bordercolordark',
					'bordercolorlight', 'class', 'dir', 'height', 'id',
					'lang', 'nowrap', 'title', 'valign'];

			attrs.tbody = ['align', 'bgColor', 'class', 'dir', 'id', 'lang',
					'title', 'valign'];

			attrs.textarea = ['accesskey', 'class', 'cols', 'dir', 'disabled',
					'id', 'label', 'lang', 'name', 'readonly', 'rows',
					'tabindex', 'title', 'wrap'];

			attrs.u = ['class', 'id', 'xml:lang'];

			attrs.ul = ['class', 'compact', 'dir', 'id', 'lang', 'title', 'type'];

			return attrs;
		},

		_getParentElement: function (contentWin) {
			var self = this,
			range = self._getRange(contentWin),
			selection, startContainer, endContainer, startOffset, endOffset;

			if (!range) {
				return null;
			}

			if (range.commonAncestorContainer) {
				selection = contentWin.getSelection();
				startContainer = range.startContainer || selection.baseNode;
				endContainer = range.endContainer || selection.extentNode;
				startOffset = range.startOffset;

				if (startOffset === null) {
					startOffset = selection.baseOffset;
				}

				endOffset = range.endOffset;

				if (endOffset === null) {
					endOffset = selection.extentOffset;
				}

				if (startContainer === endContainer && (endOffset - startOffset) === 1) {
					return selection.anchorNode.childNodes[selection.anchorOffset];
				}

				if (!range.commonAncestorContainer.tagName) {
					if (contentWin.document === range.commonAncestorContainer &&
					selection.baseNode) {
						return selection.baseNode.parentNode;
					}

					return range.commonAncestorContainer.parentNode;
				}

				return range.commonAncestorContainer;
			}

			if (range.length) {
				return range.item(0);
			}

			if (range.parentElement) {
				return range.parentElement();
			}

			return null;
		},

		_getRange: function (contentWin) {
			var selection, range;

			if (contentWin.document.selection && !wijWindow.opera) {
				return contentWin.document.selection.createRange();
			}

			if (contentWin.getSelection) {
				selection = contentWin.getSelection();
				if (!selection || selection.rangeCount < 1) {
					return null;
				}

				if (selection.getRangeAt) {
					range = selection.getRangeAt(0);
				} else {
					range = contentWin.document.createRange();
				}

				return range;
			}
		},

		_generateUniqueName: function (prefix) {
			var idx = uniqueIds[prefix];

			if (!idx) {
				idx = 0;
			}

			uniqueIds[prefix] = ++idx;

			return prefix + idx;
		},

		_setContentEditable: function (doc, isEditable) {
			var designMode = "designMode",
			contentEditable = "contentEditable";

			try {
				if (doc.body[contentEditable]) {
					doc.body[contentEditable] = isEditable.toString();
				}

				if (doc[designMode]) {
					if (!isEditable && doc[designMode] !== 'off') {
						doc[designMode] = 'off';
					} else if (isEditable && doc[designMode] !== 'on') {
					    doc[designMode] = 'on';
					}
				}

				if (isEditable && !$.browser.msie) {
					doc.execCommand('useCSS', false, true);
				}
			} catch (e) { }
		},

		_formatString: function (str, len) {
			var strLen = str.length, i;

			for (i = 0; i < len - strLen; i++) {
				str = '0' + str;
			}

			return str;
		},

		_convertToWebColor: function (r, g, b) {
			var self = this, hr, hg, hb, result;

			if (isNaN(r) || 255 - r < 0) {
				r = 0;
			}

			if (isNaN(g) || 255 - g < 0) {
				g = 0;
			}

			if (isNaN(b) || 255 - b < 0) {
				b = 0;
			}

			hr = self._formatString(wijParseInt(r).toString(16), 2);
			hg = self._formatString(wijParseInt(g).toString(16), 2);
			hb = self._formatString(wijParseInt(b).toString(16), 2);
			result = '#' + hr + hg + hb;

			return result;
		},

		_prepareLiteralRegexText: function (s1) {
			var ret = s1;

			ret = ret.replace('\\', '\\\\');
			ret = ret.replace('.', '\\.');
			ret = ret.replace('?', '\\?');

			return ret;
		},

		_isNumeric: function (str) {
			return new RegExp('^\\d+$').test(str);
		},

		_isEmail: function (str) {
			return new RegExp('mailto:(\\S)+[@]{1}(\\S)+[.]{1}(\\w)+').test(str);
		},

		_isUrl: function (str) {
			return new RegExp('[a-zA-z]+://[^s]+').test(str);
		},
		
		//public method
		refresh: function () {
			///<summary>
			///Adjust the editor layout.
			/// Code Example:$("#wijeditor").wijeditor("refresh");
			///</summary>
			var self = this,
			element = self.element,
			header = self._getHeader(),
			footer = self._getFooter(),
			width = element.width(),
			height = element.height(),
			content = self._getContent(),
			contentHeight;		
			
			self.editor.width(width).height(height);
			
			$ribbon.wijribbon("updateRibbonSize");
			contentHeight = self.editor.height() -
			header.outerHeight(true) - footer.outerHeight(true);
			
			content.height(contentHeight)
			.wijsplitter("refresh");
		},
		
		getText: function () {
			///<summary>
			/// Get text of editor.
			/// Code Example:$("#wijeditor").wijeditor("getText");
			///</summary>
			var self = this;
			
			return self._getDesignViewText();
		},
		
		setText: function (text) {
			///<summary>
			/// Set the text of editor.
			/// Code Example:$("#wijeditor").wijeditor("setText", "text");
			///</summary>
			var self = this;
			
			if (text) {
				self._setDesignViewText(text);
			}
		}
		//end of public method
	});
} (jQuery));


(function ($) {
"use strict";

	var wijDoc = document,
	wijParseInt = parseInt,

	css_editor = "wijmo-wijeditor",
	css_editor_colorcanvas = css_editor + "-colorcanvas",
	css_editor_color = css_editor + "-color",
	css_editor_wheel = css_editor + "-wheel",
	css_editor_overlay = css_editor + "-overlay",
	css_editor_marker = css_editor + "-marker";

	$.fn.wijeditorcolorcanvas = function (callback, initColor) {
		$.wijeditorcolorcanvas(this, callback, initColor);
		return this;
	};

	$.wijeditorcolorcanvas = function (containerj, callback, initColor) {
		var container = $(containerj).get(0);
		return container.wijeditorcolorcanvas ||
		(container.wijeditorcolorcanvas =
		new $._wijeditorcolorcanvas(container, callback, initColor));
	};

	$._wijeditorcolorcanvas = function (container, callback, initColor) {
		// Store editorcolorcanvas object
		var fb = this,
		markup = "", e, alphaImageLoader;

		alphaImageLoader = "progid:DXImageTransform.Microsoft.AlphaImageLoader" +
							"(enabled=true, sizingMethod=crop, ";
						
		markup += "<div class='" + css_editor_colorcanvas + "'>";
		markup += "<div class='" + css_editor_color + "'></div>";
		markup += "<div class='" + css_editor_wheel + "'></div>";
		markup += "<div class='" + css_editor_overlay + "'></div>";
		markup += "<div class='h-marker " + css_editor_marker + "'></div>";
		markup += "<div class='sl-marker " + css_editor_marker + "'></div></div>";

		$(container).html(markup);

		e = $("." + css_editor_colorcanvas, container);
		fb.wheel = $("." + css_editor_wheel, container).get(0);

		// Dimensions
		fb.radius = 84;
		fb.square = 100;
		fb.width = 194;

		// Fix background PNGs in IE6
		if ($.browser.msie && $.browser.version < 7) {
			$('*', e).each(function () {
				var imgEl = this,
					bgImg = imgEl.currentStyle.backgroundImage;

				if (bgImg !== 'none') {
					bgImg = bgImg.substring(5, bgImg.length - 2);

					$(imgEl).css({
						'backgroundImage': 'none',
						'filter': alphaImageLoader + "src='" + bgImg + "')"
					});
				}
			});
		}

		/**
		* Link to the given element(s) or callback.
		*/
		fb.linkTo = function (callback) {
			// Unbind previous nodes
			if (typeof fb.callback === 'object') {
				$(fb.callback).unbind('keyup', fb.updateValue);
			}

			// Reset color
			fb.color = null;

			// Bind callback or elements
			if (typeof callback === 'function') {
				fb.callback = callback;
			} else if (typeof callback === 'object' || typeof callback === 'string') {
				fb.callback = $(callback);
				fb.callback.bind('keyup', fb.updateValue);
				if (fb.callback.get(0).value) {
					fb.setColor(fb.callback.get(0).value);
				}
			}
			return this;
		};

		fb.updateValue = function (event) {
			var self = this;
			if (self.value && self.value !== fb.color) {
				fb.setColor(self.value);
			}
		};

		/**
		* Change color with HTML syntax #123456
		*/
		fb.setColor = function (color) {
			var unpack = fb.unpack(color);
			if (fb.color !== color && unpack) {
				fb.color = color;
				fb.rgb = unpack;
				fb.hsl = fb.RGBToHSL(fb.rgb);
				fb.updateDisplay();
			}
			return this;
		};

		/**
		* Change color with HSL triplet [0..1, 0..1, 0..1]
		*/
		fb.setHSL = function (hsl) {
			fb.hsl = hsl;
			fb.rgb = fb.HSLToRGB(hsl);
			fb.color = fb.pack(fb.rgb);
			fb.updateDisplay();
			return this;
		};

		/**
		* Retrieve the coordinates of the given event relative to the center
		* of the widget.
		*/
		fb.widgetCoords = function (event) {
			var x, y, el, reference, pos;
			el = event.target || event.srcElement;
			reference = fb.wheel;

			// Use absolute coordinates
			pos = fb.absolutePosition(reference);
			x = (event.pageX || 0 * (event.clientX + $('html').get(0).scrollLeft)) - 
			pos.x;
			y = (event.pageY || 0 * (event.clientY + $('html').get(0).scrollTop)) - 
			pos.y;

			// Subtract distance to middle
			return { x: x - fb.width / 2, y: y - fb.width / 2 };
		};

		/**
		* Mousedown handler
		*/
		fb.mousedown = function (event) {
			// Capture mouse
			if (!wijDoc.dragging) {
				$(wijDoc).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
				wijDoc.dragging = true;
			}

			// Check which area is being dragged
			var pos = fb.widgetCoords(event);
			//document.title = pos.x + "|" + pos.y;
			fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

			// Process
			fb.mousemove(event);
			return false;
		};

		/**
		* Mousemove handler
		*/
		fb.mousemove = function (event) {
			// Get coordinates relative to color picker center
			var pos = fb.widgetCoords(event), hue, sat, lum;

			// Set new HSL parameters
			if (fb.circleDrag) {
				hue = Math.atan2(pos.x, -pos.y) / 6.28;
				if (hue < 0) {
					hue += 1;
				}
				fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
			} else {
				sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + 0.5));
				lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + 0.5));
				fb.setHSL([fb.hsl[0], sat, lum]);
			}
			return false;
		};

		/**
		* Mouseup handler
		*/
		fb.mouseup = function () {
			// Uncapture mouse
			$(wijDoc).unbind('mousemove', fb.mousemove)
			.unbind('mouseup', fb.mouseup);

			wijDoc.dragging = false;
		};

		/**
		* Update the markers and styles
		*/
		fb.updateDisplay = function () {
			// Markers
			var angle = fb.hsl[0] * 6.28, inputEl;
			$('.h-marker', e).css({
				left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
				top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
			});

			$('.sl-marker', e).css({
				left: Math.round(fb.square * (0.5 - fb.hsl[1]) + fb.width / 2) + 'px',
				top: Math.round(fb.square * (0.5 - fb.hsl[2]) + fb.width / 2) + 'px'
			});

			// Saturation/Luminance gradient
			$("." + css_editor_color, e).css('backgroundColor',
				fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

			// Linked elements or callback
			if (typeof fb.callback === 'object') {
				// Set background/foreground color
				$(fb.callback).css({
					backgroundColor: fb.color,
					color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
				});

				// Change linked value
				$(fb.callback).each(function () {
					inputEl = this;
					if (inputEl.value && inputEl.value !== fb.color) {
						inputEl.value = fb.color;
					}
				});
			} else if (typeof fb.callback === 'function') {
				fb.callback.call(fb, fb.color);
			}
		};

		/**
		* Get absolute position of element
		*/
		fb.absolutePosition = function (el) {
			var r = { x: el.offsetLeft, y: el.offsetTop }, tmp;
			// Resolve relative to offsetParent
			if (el.offsetParent) {
				tmp = fb.absolutePosition(el.offsetParent);
				r.x += tmp.x;
				r.y += tmp.y;
			}
			return r;
		};

		/* Various color utility functions */
		fb.pack = function (rgb) {
			var r = Math.round(rgb[0] * 255), g, b;
			g = Math.round(rgb[1] * 255);
			b = Math.round(rgb[2] * 255);
			return '#' + (r < 16 ? '0' : '') + r.toString(16) +
			   (g < 16 ? '0' : '') + g.toString(16) +
			   (b < 16 ? '0' : '') + b.toString(16);
		};

		fb.unpack = function (color) {
			if (color.length === 7) {
				return [wijParseInt('0x' + color.substring(1, 3)) / 255,
					wijParseInt('0x' + color.substring(3, 5)) / 255,
					wijParseInt('0x' + color.substring(5, 7)) / 255];
			} else if (color.length === 4) {
				return [wijParseInt('0x' + color.substring(1, 2)) / 15,
					wijParseInt('0x' + color.substring(2, 3)) / 15,
					wijParseInt('0x' + color.substring(3, 4)) / 15];
			}
		};

		fb.HSLToRGB = function (hsl) {
			var m1, m2, h, s, l, self = this; //r, g, b, 
			h = hsl[0];
			s = hsl[1];
			l = hsl[2];
			m2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
			m1 = l * 2 - m2;
			return [self.hueToRGB(m1, m2, h + 0.33333),
			self.hueToRGB(m1, m2, h),
			self.hueToRGB(m1, m2, h - 0.33333)];
		};

		fb.hueToRGB = function (m1, m2, h) {
			h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
			if (h * 6 < 1) {
				return m1 + (m2 - m1) * h * 6;
			}
			if (h * 2 < 1) {
				return m2;
			}
			if (h * 3 < 2) {
				return m1 + (m2 - m1) * (0.66666 - h) * 6;
			}
			return m1;
		};

		fb.RGBToHSL = function (rgb) {
			var min, max, delta, h, s, l, r, g, b;
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
			min = Math.min(r, Math.min(g, b));
			max = Math.max(r, Math.max(g, b));
			delta = max - min;
			l = (min + max) / 2;
			s = 0;
			if (l > 0 && l < 1) {
				s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
			}
			h = 0;
			if (delta > 0) {
				if (max === r && max !== g) {
					h += (g - b) / delta;
				}
				if (max === g && max !== b) {
					h += (2 + (b - r) / delta);
				}
				if (max === b && max !== r) {
					h += (4 + (r - g) / delta);
				}
				h /= 6;
			}
			return [h, s, l];
		};

		// Install mousedown handler (the others are set on the document on-demand)
		$('*', e).mousedown(fb.mousedown);

		// Init color
		fb.setColor(initColor || '#000000');

		// Set linked elements/callback
		if (callback) {
			fb.linkTo(callback);
		}
	};
}(jQuery));
