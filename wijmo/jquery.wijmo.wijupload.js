/*globals jQuery, window, XMLHttpRequest*/

/*
* 
* Wijmo Library 2.1.2
* http://wijmo.com/
* 
* Copyright(c) ComponentOne, LLC.  All rights reserved.
* 
* Dual licensed under the Wijmo Commercial or GNU GPL Version 3 licenses.
* licensing@wijmo.com
* http://www.wijmo.com/license
* 
* 
* Wijmo Upload widget.
* 
* Depends:
*     jquery.ui.core.js
*     jquery.ui.widget.js
*/

(function ($) {
	"use strict";
	var uploadClass = "wijmo-wijupload",
		uploadFileRowClass = "wijmo-wijupload-fileRow",
		isUploadFileRow = "." + uploadFileRowClass,
		uploadFilesListClass = "wijmo-wijupload-filesList",
		uploadCommandRowClass = "wijmo-wijupload-commandRow",
		uploadUploadAllClass = "wijmo-wijupload-uploadAll",
		uploadCancelAllClass = "wijmo-wijupload-cancelAll",
		uploadButtonContainer = "wijmo-wijupload-buttonContainer",
		uploadUploadClass = "wijmo-wijupload-upload",
		isUploadUpload = "." + uploadUploadClass,
		uploadCancelClass = "wijmo-wijupload-cancel",
		isUploadCancel = "." + uploadCancelClass,
		uploadFileClass = "wijmo-wijupload-file",
		uploadProgressClass = "wijmo-wijupload-progress",
		uploadLoadingClass = "wijmo-wijupload-loading",
		uiContentClass = "ui-widget-content",
		uiCornerClass = "ui-corner-all",
		uiHighlight = "ui-state-highlight",
		wijuploadXhr,
		wijuploadFrm,

        _getFileName = function (fileName) { // Trim path on IE.
        	if (fileName.indexOf("\\") > -1) {
        		fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
        	}
        	return fileName;
        },

        _getFileNameByInput = function (fileInput) {
        	var files = fileInput.files, name = "";

        	if (files) {
        		$.each(files, function (i, n) {
        			name += _getFileName(n.name) + "; ";
        		});
        		if (name.length) {
        			name = name.substring(0, name.lastIndexOf(";"));
        		}
        	}
        	else {
        		name = _getFileName(fileInput.value);
        	}

        	return name;
        },

        _getFileSize = function (file) {
        	var files = file.files, size = 0;
        	if (files && files.length > 0) {
        		$.each(files, function (i, n) {
        			if (n.size) {
        				size += n.size;
        			}
        		});
        	}
        	return size;
        };

	wijuploadXhr = function (uploaderId, fileRow, action) {

		var uploader,
			inputFile = $("input", fileRow),

			_cancel = function (xhr) {
				if (xhr) {
					xhr.abort();
					xhr = null;
				}
			},

			_destroy = function (xhr) {
				if (xhr) {
					xhr = null;
				}
			},
			Uploader = function () {
				var self = this,
				files = inputFile.get(0).files,
				xhrs = [],
				idx = 0,
				uploadedSize = 0,
				createXHR = function (name, action) {
					var xhttpr = new XMLHttpRequest();

					xhttpr.open("POST", action, true);
					xhttpr.setRequestHeader("Wijmo-RequestType", "XMLHttpRequest");
					xhttpr.setRequestHeader("Cache-Control", "no-cache");
					xhttpr.setRequestHeader("Wijmo-FileName", name);
					xhttpr.setRequestHeader("Content-Type", "application/octet-stream");

					xhttpr.upload.onprogress = function (e) {
						if (e.lengthComputable) {
							var obj;
							if ($.isFunction(self.onProgress)) {
								obj = {
									supportProgress: true,
									loaded: uploadedSize + e.loaded,
									total: _getFileSize(inputFile[0]),
									fileName: _getFileName(self.currentFile.name),
									fileNameList: _getFileNameByInput(inputFile[0])
									.split("; ")
								};
								self.onProgress(obj);
							}
						}
					};


					xhttpr.onreadystatechange = function (e) {
						if (this.readyState === 4) {
							var response = this.responseText, obj;
							uploadedSize += files[idx].size;
							idx++;
							if (files.length > idx) {
								_doAjax(files[idx]);
							}
							else if ($.isFunction(self.onComplete)) {
								obj = {
									e: e,
									response: response,
									supportProgress: true
								};
								self.onComplete(obj);
							}
						}
					};
					xhrs.push(xhttpr);
					return xhttpr;
				},
				_doAjax = function (file) {
					var name = _getFileName(file.name),
					xhr = createXHR(name, action);
					self.currentFile = file;
					xhr.send(file);
				};
				self.fileRow = fileRow;
				self.inputFile = inputFile;
				self.upload = function () {
					_doAjax(files[idx]);
				};
				self.cancel = function () {
					$.each(xhrs, function (i, xhr) {
						_cancel(xhr);
					});
					if ($.isFunction(self.onCancel)) {
						self.onCancel();
					}
				};
				self.destroy = function () {
					$.each(xhrs, function (i, xhr) {
						_destroy(xhr);
					});
				};
				self.updateAction = function (act) {
					action = act;
				};
				self.onCancel = null;
				self.onComplete = null;
				self.onProgress = null;
			};
		uploader = new Uploader();
		return uploader;
	};

	wijuploadFrm = function (uploaderId, fileRow, action) {
		var uploader,
			inputFile = $("input", fileRow),
			inputFileId = inputFile.attr("id"),
			formId = "wijUploadForm_" + uploaderId,
			form = $("#" + formId),
			iframeId = "wijUploadIfm_" + inputFileId,
			isFirstLoad = true,
			iframe = $("<iframe id=\"" + iframeId + "\" name=\"" + iframeId + "\">"),
		//	ifm = $("<iframe src=\"javascript:false;\" id=\"" + 
		// id + "\" name=\"" + id + "\">");
		//"javascript".concat(":false;")
		//src="javascript:false;" removes ie6 prompt on https

			_upload = function (ifm, iptFile) {
				form.empty();
				form.attr("target", ifm.attr("name"));
				if (iptFile) {
					iptFile.parent().append(iptFile.clone());
					form.append(iptFile);
				}
				form.submit();
			},

			_cancel = function (ifm) {
				// to cancel request set src to something else
				// we use src="javascript:false;" because it doesn't
				// trigger ie6 prompt on https
				ifm.attr("src", "javascript".concat(":false;"));
			},

			_destroy = function (ifm, removeForm) {
				if (removeForm && form) {
					form.remove();
					form = null;
				}
				if (ifm) {
					ifm.remove();
					ifm = null;
				}
			},
			Uploader;

		if (form.length === 0) {
			form = $("<form method=\"post\" enctype=\"multipart/form-data\"></form>");
			form
				.attr("action", action)
				.attr("id", formId)
				.attr("name", formId)
				.appendTo("body");
		}
		iframe.css("position", "absolute")
			.css("top", "-1000px")
			.css("left", "-1000px");
		iframe.appendTo("body");

		Uploader = function () {
			var self = this;
			self.fileRow = fileRow;
			self.iframe = iframe;
			self.inputFile = inputFile;
			self.upload = function () {
				var obj;
				_upload(iframe, inputFile);
				if ($.isFunction(self.onProgress)) {
					obj = {
						supportProgress: false,
						loaded: 1,
						total: 1
					};
					self.onProgress(obj);
				}
			};
			self.doPost = function () {
				_upload(iframe);
			};
			self.cancel = function () {
				_cancel(iframe);
				if ($.isFunction(self.onCancel)) {
					self.onCancel();
				}
			};
			self.updateAction = function (act) {
				action = act;
				form.attr("action", act);
			};
			self.destroy = function (removeForm) {
				_destroy(iframe, removeForm);
			};
			self.onCancel = null;
			self.onComplete = null;
			self.onProgress = null;

			iframe.bind("load", function (e) {
				if (!$.browser.safari) {
					if (isFirstLoad && !self.autoSubmit) {
						isFirstLoad = false;
						return;
					}
				}
				if (iframe.attr("src") === "javascript".concat(":false;")) {
					return;
				}
				var target = e.target,
					response,
					doc,
					obj;
				try {
					doc = target.contentDocument ?
						target.contentDocument : window.frames[0].document;
					//if (doc.readyState && doc.readyState !== "complete") {
					//	return;
					//}
					if (doc.XMLDocument) {
						response = doc.XMLDocument;
					} else if (doc.body) {
						response = doc.body.innerHTML;
					} else {
						response = doc;
					}
					if ($.isFunction(self.onComplete)) {
						obj = {
							e: e,
							response: response,
							supportProgress: false
						};
						self.onComplete(obj);
					}
				} catch (ex) {
					response = "";
				} finally {
					//iframe.unbind("load");
				}
			});
		};
		uploader = new Uploader();
		return uploader;
	};

	$.widget("wijmo.wijupload", {

		options: {
			/// <summary>
			/// The server side handler which handle the post request.
			/// Type:String.
			/// Default:"".
			/// Code example: $(".selector").wijupload({action: "upload.php"}).
			/// </summary>
			action: "",
			/// <summary>
			/// The value indicates whether to submit file as soon as it's selected.
			/// Type:Boolean.
			/// Default: false.
			/// Code example: $(".selector").wijupload({autoSubmit: true}).
			/// </summary>
			autoSubmit: false,
			/// <summary>
			/// Fires when user selects a file.  This event can be cancelled.
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ change: function (e, data) { } });
			/// Bind to the event by type: wijuploadchange
			/// $("#selector").bind("wijuploadchange", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the input file.  
			///	</param>
			change: null,
			/// <summary>
			/// Fires before the file is uploaded.  This event can be cancelled. 
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ upload: function (e, data) { } });
			/// Bind to the event by type: wijuploadupload
			/// $("#selector").bind("wijuploadupload", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the input file.  
			///	</param>
			upload: null,
			/// <summary>
			/// Fires when click the uploadAll button.  This event can be cancelled. 
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ totalUpload: function (e, data) { } });
			/// Bind to the event by type: wijuploadtotalupload
			/// $("#selector").bind("wijuploadtotalupload", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			totalUpload: null,
			/// <summary>
			/// Fires when file uploading. 
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ progress: function (e, data) { } });
			/// Bind to the event by type: wijuploadprogress
			/// $("#selector").bind("wijuploadprogress", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the file info,loadedSize and totalSize  
			///	</param>
			progress: null,
			/// <summary>
			/// Fires when click the uploadAll button adn file uploading. 
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ totalProgress: function (e, data) { } });
			/// Bind to the event by type: wijuploadtotalprogress
			/// $("#selector").bind("wijuploadtotalprogress", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the loadedSize and totalSize  
			///	</param>
			totalProgress: null,
			/// <summary>
			/// Fires when file upload is complete. 
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ complete: function (e, data) { } });
			/// Bind to the event by type: wijuploadcomplete
			/// $("#selector").bind("wijuploadcomplete", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the file info.  
			///	</param>
			complete: null,
			/// <summary>
			/// Fires when click the uploadAll button and file upload is complete. 
			/// Default: null.
			/// Type: Function.
			/// Code example: 
			/// Supply a function as an option.
			/// $(".selector").wijupload({ totalComplete: function (e, data) { } });
			/// Bind to the event by type: wijuploadtotalcomplete
			/// $("#selector").bind("wijuploadtotalcomplete", function(e, data) { } );
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			totalComplete: null,
			/// <summary>
			/// Specifies the maxmized files number that can be uploaded. 
			/// Default: 0.
			/// Type: Number.
			/// Code Example: 
			///		$(".selector").wijupload("maximunFiles", 5)
			/// </summary>
			maximumFiles: 0,
			/// <summary>
			/// Determines whether support multiple selection. 
			/// Default: false.
			/// Type: Boolean.
			/// Code Example: 
			///		$(".selector").wijupload("multiple", true)
			/// </summary>
			multiple: false,
			/// <summary>
			/// Specifies the accept attribute of upload. 
			/// Default: "".
			/// Type: String.
			/// Code Example: 
			///		$(".selector").wijupload("accept", "image/*")
			/// </summary>
			accept: ""
		},

		_create: function () {
			var self = this,
				o = self.options,
				id = new Date().getTime(),
				useXhr = self.supportXhr();

			self.filesLen = 0;
			self.totalUploadFiles = 0;
			self.useXhr = useXhr;
			self.id = id;

			self._createContainers();
			self._createUploadButton();
			self._createFileInput();
			self._bindEvents();

			//Add for support disabled option at 2011/7/8
			if (o.disabled) {
				self.disable();
			}
			//end for disabled option
		},

		_setOption: function (key, value) {
			var self = this;

			$.Widget.prototype._setOption.apply(this, arguments);

			//Add for support disabled option at 2011/7/8
			if (key === "disabled") {
				self._handleDisabledOption(value, self.upload);
			}
			//end for disabled option
			else if (key === "accept") {
				if (self.input) {
					self.input.attr("accept", value);
				}
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
				ele = outerEle ? outerEle : self.upload,
				eleOffset = ele.offset(),
				disabledWidth = ele.outerWidth(),
				disabledHeight = ele.outerHeight();

			return $("<div></div>")
			.addClass("ui-disabled")
			.css({
				"z-index": "99999",
				position: "absolute",
				width: disabledWidth,
				height: disabledHeight,
				left: eleOffset.left,
				top: eleOffset.top
			});
		},

		destroy: function () {
			var self = this;
			self.upload.removeClass(uploadClass);
			self.upload.undelegate(self.widgetName)
            .undelegate("." + self.widgetName);
			self.input.remove();
			self.addBtn.remove();
			self.filesList.remove();
			self.commandRow.remove();

			if (self.isCreateByInput === true) {
				self.element.css({
					display: ""
				}).unwrap();
			}

			if (self.uploaders) {
				$.each(self.uploaders, function (idx, uploader) {
					if (uploader.destroy) {
						uploader.destroy(true);
					}
					uploader = null;
				});
				self.uploaders = null;
			}

			//Add for support disabled option at 2011/7/8
			if (self.disabledDiv) {
				self.disabledDiv.remove();
				self.disabledDiv = null;
			}
			//end for disabled option
		},

		widget: function () {
			return this.upload;
		},

		supportXhr: function () {
			var useXhr = false;
			if (typeof (new XMLHttpRequest().upload) === "undefined") {
				useXhr = false;
			} else {
				useXhr = true;
			}
			return useXhr;
		},

		_createContainers: function () {
			var self = this, filesList, commandRow, el = self.element;

			if (el.is(":input") &&
				el.attr("type") === "file") {
				self.isCreateByInput = true;
				self.maxDisplay = (el.attr("multiple") || self.options.multiple) ? 0 : 1;

				self.upload = el.css({
					display: "none"
				}).wrap("<div>")
				.parent();
			}
			else if (self.element.is("div")) {
				self.upload = el;
			}
			else {
				throw 'The initial markup must be "DIV", "INPUT[type=file]"';
			}

			self.upload.addClass(uploadClass);

			filesList = $("<ul>").addClass(uploadFilesListClass).appendTo(self.upload);
			commandRow = $("<div>").addClass(uploadCommandRowClass).appendTo(self.upload);
			self.filesList = filesList;
			commandRow.hide();
			self.commandRow = commandRow;
			self._createCommandRow(commandRow);
		},

		_createCommandRow: function (commandRow) {
			var uploadAllBtn = $("<a>").attr("href", "#")
				.text("uploadAll")
				.addClass(uploadUploadAllClass)
				.button({
					icons: {
						primary: "ui-icon-circle-arrow-n"
					},
					label: "Upload All"
				}),
				cancelAllBtn = $("<a>").attr("href", "#")
				.text("cancelAll")
				.addClass(uploadCancelAllClass)
				.button({
					icons: {
						primary: "ui-icon-cancel"
					},
					label: "Cancel All"
				});
			commandRow.append(uploadAllBtn).append(cancelAllBtn);
		},

		_createUploadButton: function () {
			var self = this,
				addBtn = $("<a>").attr("href", "#").button({
					label: "Upload files"
				});
			addBtn.mousemove(function (e) {
				if (self.input) {
					var pageX = e.pageX,
						pageY = e.pageY;
					self.input.offset({
						left: pageX + 10 - self.input.width(),
						top: pageY + 10 - self.input.height()
					});
				}
			});
			self.addBtn = addBtn;
			self.upload.prepend(addBtn);
		},

		_createFileInput: function () {
			var self = this,
				addBtn = self.addBtn,
				addBtnOffset = addBtn.offset(),
                accept = self.element.attr("accept") || self.options.accept,
				id = "wijUpload_" + self.id + "_input" + self.filesLen,
				fileInput = $("<input>").attr("type", "file").prependTo(self.upload),
                maxFiles = self.options.maximumFiles || self.maxDisplay;

			if (maxFiles !== 1 && self.maxDisplay === 0) {
				fileInput.attr("multiple", "multiple");
			}

			if (accept) {
				fileInput.attr("accept", accept);
			}

			self.filesLen++;
			fileInput.attr("id", id)
				.attr("name", id)
				.css("position", "absolute")
				.offset({
					left: addBtnOffset.left + addBtn.width() - fileInput.width(),
					top: addBtnOffset.top
				})
				.css("z-index", "9999")
				.css("opacity", 0)
				.height(addBtn.height())
				.css("cursor", "pointer");

			self.input = fileInput;
			fileInput.bind("change", function (e) {
				var fileRow,
					uploadBtn;
				if (self._trigger("change", e, $(this)) === false) {
					return false;
				}
				self._createFileInput();
				fileRow = self._createFileRow($(this));
				self._setAddBtnState();
				if (self.options.autoSubmit) {
					uploadBtn = $(isUploadUpload, fileRow);
					if (uploadBtn) {
						uploadBtn.click();
					}
				}
				fileInput.unbind("change");
			});
			self.uploadAll = false;
		},

		_setAddBtnState: function () {
			var self = this,
				maxFiles = self.options.maximumFiles || self.maxDisplay,
				addBtn = self.addBtn,
				files;
			if (!maxFiles) {
				return;
			}
			if (!addBtn) {
				return;
			}
			if (!self.maskDiv) {
				self.maskDiv = $("<div></div>")
					.css("position", "absolute")
				//.css("background-color", "red")
					.css("z-index", "9999")
					.width(addBtn.outerWidth())
					.height(addBtn.outerHeight())
					.offset(addBtn.offset())
					.appendTo(self.upload);
			}
			files = $("li", self.filesList);
			if (files.length >= maxFiles) {
				addBtn.button({ disabled: true });
				self.maskDiv.show();
				if (self.input) {
					self.input.css("left", "-1000px");

				}
			} else {
				addBtn.button({ disabled: false });
				self.maskDiv.hide();
			}
		},

		_createFileRow: function (uploadFile) {
			var self = this,
				fileRow = $("<li>"),
			//fileName = uploadFile.val(),
				file,
				progress,
				fileRows,
				buttonContainer = $("<span>").addClass(uploadButtonContainer),
				uploadBtn = $("<a>").attr("href", "#")
				.text("upload")
				.addClass(uploadUploadClass)
				.button({
					text: false,
					icons: {
						primary: "ui-icon-circle-arrow-n"
					},
					label: "upload"
				}),
				cancelBtn = $("<a>").attr("href", "#")
				.text("cancel")
				.addClass(uploadCancelClass)
				.button({
					text: false,
					icons: {
						primary: "ui-icon-cancel"
					},
					label: "cancel"
				});
			fileRow.addClass(uploadFileRowClass)
				.addClass(uiContentClass)
				.addClass(uiCornerClass);
			fileRow.append(uploadFile);
			uploadFile.hide();
			file = $("<span>" + _getFileNameByInput(uploadFile[0]) + "</span>")
				.addClass(uploadFileClass)
				.addClass(uiHighlight)
				.addClass(uiCornerClass);
			fileRow.append(file);
			fileRow.append(buttonContainer);
			progress = $("<span />").addClass(uploadProgressClass);
			buttonContainer.append(progress);
			buttonContainer.append(uploadBtn).append(cancelBtn);
			fileRow.appendTo(self.filesList);

			fileRows = $(isUploadFileRow, self.upload);
			if (fileRows.length) {
				self.commandRow.show();
				self._createUploader(fileRow);
				self._resetProgressAll();
			}
			return fileRow;
		},

		_createUploader: function (fileRow) {
			var self = this,
				inputFile = $("input", fileRow),
				action = self.options.action,
				uploader;
			if (self.useXhr) {
				uploader = wijuploadXhr(self.id, fileRow, action);
			} else {
				uploader = wijuploadFrm(self.id, fileRow, action);
			}
			uploader.onCancel = function () {
				var t = this;
				self._trigger("cancel", null, t.inputFile);
				self.totalUploadFiles--;
				if (self.totalUploadFiles === 0 && self.uploadAll) {
					self._trigger("totalComplete");
				}
			};
			if (self._wijUpload()) {
				uploader.onProgress = function (obj) {
					var progressSpan = $("." + uploadProgressClass, this.fileRow),
                    data = {
                    	sender: obj.fileName,
                    	loaded: obj.loaded,
                    	total: obj.total
                    },
                    id = this.inputFile.attr("id");
					if (obj.supportProgress) {
						progressSpan.html(Math.round(1000 * obj.loaded /
							obj.total) / 10 + "%");
						if (obj.fileNameList) {
							data.fileNameList = obj.fileNameList;
						}
						self._trigger("progress", null, data);
						self._progressTotal(id, obj.loaded);
					} else {
						progressSpan.addClass(uploadLoadingClass);
					}
				};
				uploader.onComplete = function (obj) {
					var t = this, id = t.inputFile.attr("id"),
						uploader = self.uploaders[id],
					//fileName = _getFileName(t.inputFile.val()),
						fileSize = _getFileSize(t.inputFile[0]),
						progressSpan = $("." + uploadProgressClass, t.fileRow);

					//xhr = obj.e.currentTarget;
					//					if (xhr.status != 200) {
					//						throw xhr;
					//					}
					self._trigger("complete", obj.e, t.inputFile);
					progressSpan.removeClass(uploadLoadingClass);
					progressSpan.html("100%");
					self._removeFileRow(t.fileRow, uploader, true);
					self._progressTotal(id, fileSize);
					self.totalUploadFiles--;
					if (self.totalUploadFiles === 0 && self.uploadAll) {
						self._trigger("totalComplete", obj.e, obj);
					}
				};
			}
			if (typeof (self.uploaders) === "undefined") {
				self.uploaders = {};
			}
			self.uploaders[inputFile.attr("id")] = uploader;
		},

		_progressTotal: function (fileName, loadedSize) {
			var self = this,
				progressAll = self.progressAll,
				loaded,
				total;
			if (!self.uploadAll) {
				return;
			}
			if (progressAll && progressAll.loadedSize) {
				progressAll.loadedSize[fileName] = loadedSize;
				loaded = self._getLoadedSize(progressAll.loadedSize);
				total = progressAll.totalSize;
			}
			self._trigger("totalProgress", null, {
				loaded: loaded,
				total: total
			});
		},

		_getLoadedSize: function (loadedSize) {
			var loaded = 0;
			$.each(loadedSize, function (key, value) {
				loaded += value;
			});
			return loaded;
		},

		_getTotalSize: function () {
			var self = this,
				total = 0;
			if (self.uploaders) {
				$.each(self.uploaders, function (key, uploader) {
					total += _getFileSize(uploader.inputFile[0]);
				});
			}
			return total;
		},

		_resetProgressAll: function () {
			this.progressAll = {
				totalSize: 0,
				loadedSize: {}
			};
		},

		_wijUpload: function () {
			//return this.widgetName === "wijupload";
			return true;
		},

		_wijcancel: function (fileInput) { },

		_upload: function (fileRow) { },

		_bindEvents: function () {
			var self = this,
				progressAll = self.progressAll;
			self.upload.delegate(isUploadCancel, "click." + self.widgetName,
				function (e) {
					var cancelBtn = $(this),
						fileRow = cancelBtn.parents(isUploadFileRow),
						fileInput = $("input", fileRow[0]),
						uploader = self.uploaders[fileInput.attr("id")];

					/*
					if (!self._wijUpload()) {
					self._wijcancel(fileInput);
					if (uploader) {
					uploader.cancel();
					}
					}
					*/
					self._wijcancel(fileInput);
					if (self._wijUpload() && uploader) {
						uploader.cancel();
					}

					if (progressAll) {
						progressAll.totalSize -= _getFileSize(fileInput[0]);
						if (progressAll.loadedSize[fileInput.val()]) {
							delete progressAll.loadedSize[fileInput.val()];
						}
					}
					self._removeFileRow(fileRow, uploader, false);
				});
			self.upload.delegate(isUploadUpload, "click." + self.widgetName,
				function (e) {
					var uploadBtn = $(this),
						fileRow = uploadBtn.parents(isUploadFileRow),
						fileInput = $("input", fileRow[0]),
						uploader = self.uploaders[fileInput.attr("id")];
					if (self._trigger("upload", e, fileInput) === false) {
						return false;
					}
					if (self.options.autoSubmit) {
						//when autoSubmit set to "true", will trigger "totalUpload" immediately.
						self.uploadAll = true;
						uploader.autoSubmit = true;
						if (self._trigger("totalUpload", e, null) === false) {
							return false;
						}
					}
					self.totalUploadFiles++;
					self._upload(fileRow);
					if (uploader && self._wijUpload()) {
						uploader.upload();
					}
				});
			self.upload.delegate("." + uploadUploadAllClass, "click." + self.widgetName,
				function (e) {
					self.uploadAll = true;
					if (!self.progressAll) {
						self._resetProgressAll();
					}
					if (self._trigger("totalUpload", e, null) === false) {
						return false;
					}
					self.progressAll.totalSize = self._getTotalSize();
					self._wijuploadAll($(isUploadUpload, self.filesList[0]));
					if (self._wijUpload()) {
						$(isUploadUpload, self.filesList[0])
						.each(function (idx, uploadBtn) {
							$(uploadBtn).click();
						});
					}
				});
			self.upload.delegate("." + uploadCancelAllClass, "click." + self.widgetName,
				function (e) {
					self._resetProgressAll();
					$(isUploadCancel, self.filesList[0]).each(function (idx, cancelBtn) {
						$(cancelBtn).click();
					});
				});
		},

		_wijuploadAll: function (uploadBtns) { },

		_wijFileRowRemoved: function (fileRow, fileInput, isComplete) {
			this._setAddBtnState();
		},

		_removeFileRow: function (fileRow, uploader, isComplete) {
			var self = this,
				inputFileId,
				files;
			if (uploader) {
				inputFileId = uploader.inputFile.attr("id");
			}
			fileRow.fadeOut(1500, function () {
				fileRow.remove();
				self._wijFileRowRemoved(fileRow, uploader.inputFile, isComplete);
				if (self.uploaders[inputFileId]) {
					delete self.uploaders[inputFileId];
				}
				files = $(isUploadFileRow, self.upload);
				if (files.length) {
					self.commandRow.show();
					if (uploader && uploader.destroy) {
						uploader.destroy();
					}
				} else {
					self.commandRow.hide();
					self._resetProgressAll();
					if (uploader && uploader.destroy) {
						uploader.destroy(true);
					}
				}
			});
		},

		// Used by C1Upload.
		_getFileName: function (fileName) {
			return _getFileName(fileName);
		},

		_getFileNameByInput: function (fileInput) {

			return _getFileNameByInput(fileInput);
		},

		_getFileSize: function (fileInput) {
			return _getFileSize(fileInput);
		}

	});
} (jQuery));
