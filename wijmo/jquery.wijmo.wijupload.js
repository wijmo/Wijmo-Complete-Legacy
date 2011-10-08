/*globals jQuery, window, XMLHttpRequest*/

/*
 * 
 * Wijmo Library 1.5.0
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
		wijuploadFrm;

	wijuploadXhr = function (uploaderId, fileRow, action) {

		var uploader,
			inputFile = $("input", fileRow),
			xhr = new XMLHttpRequest(),

			_getFileName = function (fileName) {
				if (fileName.indexOf("\\") > -1) {
					fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
				}
				return fileName;
			},

			_upload = function (xhr, iptFile) {
				var name = _getFileName(iptFile.val());

				xhr.open("POST", action, true);
				xhr.setRequestHeader("Wijmo-RequestType", "XMLHttpRequest");
				xhr.setRequestHeader("Cache-Control", "no-cache");
				xhr.setRequestHeader("Wijmo-FileName", name);
				xhr.setRequestHeader("Content-Type", "application/octet-stream");
				xhr.send(iptFile.get(0).files[0]);
			},

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
			Uploader;

		Uploader = function () {
			var self = this;
			self.fileRow = fileRow;
			self.xhr = xhr;
			self.inputFile = inputFile;
			self.upload = function () {
				_upload(xhr, inputFile);
			};
			self.cancel = function () {
				_cancel(xhr);
				if ($.isFunction(self.onCancel)) {
					self.onCancel();
				}
			};
			self.destroy = function () {
				_destroy(xhr);
			};
			self.updateAction = function (act) {
				action = act;
			};
			self.onCancel = null;
			self.onComplete = null;
			self.onProgress = null;


			xhr.upload.onprogress = function (e) {
				if (e.lengthComputable) {
					var obj;
					if ($.isFunction(self.onProgress)) {
						obj = {
							supportProgress: true,
							loaded: e.loaded,
							total: e.total,
							fileName: _getFileName(inputFile.val())
						};
						self.onProgress(obj);
					}
				}
			};


			xhr.onreadystatechange = function (e) {
				if (xhr.readyState === 4) {
					var response = xhr.responseText,
						obj;
					if ($.isFunction(self.onComplete)) {
						obj = {
							e: e,
							response: response,
							supportProgress: true
						};
						self.onComplete(obj);
					}
				}
			};
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
					if (isFirstLoad) {
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
			/// Code example:$(".selector","action", "upload.php").
			/// </summary>
			action: "",
			/// <summary>
			/// The value indicates whether to submit file as soon as it's selected.
			/// Type:String.
			/// Default:"".
			/// Code example:$(".selector","autoSubmit", true).
			/// </summary>
			autoSubmit: false,
			/// <summary>
			/// Occurs when user selects a file.  This event can be cancelled.
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the input file.  
			///	</param>
			change: null,
			/// <summary>
			/// Occurs before the file is uploaded.  This event can be cancelled. 
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the input file.  
			///	</param>
			upload: null,
			/// <summary>
			/// Occurs when click the uploadAll button.  This event can be cancelled. 
			/// "return false;" to cancel the event.
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			totalUpload: null,
			/// <summary>
			/// Occurs when file uploading. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the file info,loadedSize and totalSize  
			///	</param>
			progress: null,
			/// <summary>
			/// Occurs when click the uploadAll button adn file uploading. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the loadedSize and totalSize  
			///	</param>
			totalProgress: null,
			/// <summary>
			/// Occurs when file upload is complete. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			/// <param name="data" type="Object">
			/// An object that contains the file info.  
			///	</param>
			complete: null,
			/// <summary>
			/// Occurs when click the uploadAll button and file upload is complete. 
			/// Default: null.
			/// Type: Function.
			/// </summary>
			/// <param name="e" type="eventObj">
			/// jQuery.Event object.
			///	</param>
			totalComplete: null
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
			self.element.addClass(uploadClass);

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
				self._handleDisabledOption(value, self.element);
			}
			//end for disabled option
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
			self.element.removeClass(uploadClass);
			self.element.undelegate(self.widgetName);
			self.input.remove();
			self.addBtn.remove();
			self.filesList.remove();
			self.commandRow.remove();

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
			var self = this,
				filesList = $("<ul>").addClass(uploadFilesListClass)
					.appendTo(self.element),
				commandRow = $("<div>").addClass(uploadCommandRowClass)
					.appendTo(self.element);
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
			self.element.prepend(addBtn);
		},

		_createFileInput: function () {
			var self = this,
				addBtn = self.addBtn,
				addBtnOffset = addBtn.offset(),
				id = "wijUpload_" + self.id + "_input" + self.filesLen,
				fileInput = $("<input>").attr("type", "file").prependTo(self.element);
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

		_createFileRow: function (uploadFile) {
			var self = this,
				fileRow = $("<li>"),
				fileName = uploadFile.val(),
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
			file = $("<span>" + self._getFileName(fileName) + "</span>")
				.addClass(uploadFileClass)
				.addClass(uiHighlight)
				.addClass(uiCornerClass);
			fileRow.append(file);
			fileRow.append(buttonContainer);
			progress = $("<span />").addClass(uploadProgressClass);
			buttonContainer.append(progress);
			buttonContainer.append(uploadBtn).append(cancelBtn);
			fileRow.appendTo(self.filesList);

			fileRows = $(isUploadFileRow, self.element);
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
				var t = this,
					uploader = self.uploaders[t.inputFile.attr("id")];
				self._trigger("cancel", null, t.inputFile);
				self.totalUploadFiles--;
				if (self.totalUploadFiles === 0 && self.uploadAll) {
					self._trigger("totalComplete");
				}
			}
			if (self._wijUpload()) {
				uploader.onProgress = function (obj) {
					var progressSpan = $("." + uploadProgressClass, this.fileRow);
					if (obj.supportProgress) {
						progressSpan.html(Math.round(1000 * obj.loaded /
							obj.total) / 10 + "%");
						self._trigger("progress", null, {
							sender: obj.fileName,
							loaded: obj.loaded,
							total: obj.total
						});
						self._progressTotal(obj.fileName, obj.loaded);
					} else {
						progressSpan.addClass(uploadLoadingClass);
					}
				};
				uploader.onComplete = function (obj) {
					var t = this,
						uploader = self.uploaders[t.inputFile.attr("id")],
						fileName = self._getFileName(t.inputFile.val()),
						fileSize = self._getFileSize(t.inputFile[0]),
						progressSpan = $("." + uploadProgressClass, t.fileRow);
					self._trigger("complete", obj.e, t.inputFile);
					progressSpan.removeClass(uploadLoadingClass);
					progressSpan.html("100%");
					self._removeFileRow(t.fileRow, uploader);
					self._progressTotal(fileName, fileSize);
					self.totalUploadFiles--;
					if (self.totalUploadFiles === 0 && self.uploadAll) {
						self._trigger("totalComplete", obj.e);
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
					total += self._getFileSize(uploader.inputFile[0]);
				})
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

		_wijcancel: function (fileInput) {

		},

		_upload: function (fileRow) {
		},

		_bindEvents: function () {
			var self = this,
				progressAll = self.progressAll;
			self.element.delegate(isUploadCancel, "click." + self.widgetName,
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
						progressAll.totalSize -= self._getFileSize(fileInput[0]);
						if (progressAll.loadedSize[fileInput.val()]) {
							delete progressAll.loadedSize[fileInput.val()];
						}
					}
					self._removeFileRow(fileRow, uploader);
				});
			self.element.delegate(isUploadUpload, "click." + self.widgetName,
				function (e) {
					var uploadBtn = $(this),
						fileRow = uploadBtn.parents(isUploadFileRow),
						fileInput = $("input", fileRow[0]),
						uploader = self.uploaders[fileInput.attr("id")];
					if (self._trigger("upload", e, fileInput) === false) {
						return false;
					}
					self.totalUploadFiles++;
					self._upload(fileRow);
					if (uploader && self._wijUpload()) {
						uploader.upload();
					}
				});
			self.element.delegate("." + uploadUploadAllClass, "click." + self.widgetName,
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
						$(isUploadUpload, self.filesList[0]).each(function (idx, uploadBtn) {
							$(uploadBtn).click();
						});
					}
				});
			self.element.delegate("." + uploadCancelAllClass, "click." + self.widgetName,
				function (e) {
					self._resetProgressAll();
					$(isUploadCancel, self.filesList[0]).each(function (idx, cancelBtn) {
						$(cancelBtn).click();
					});
				});
		},

		_wijuploadAll: function (uploadBtns) {
		},
		
		_wijFileRowRemoved: function (fileRow) {
		},

		_removeFileRow: function (fileRow, uploader) {
			var self = this,
				inputFileId,
				files;
			if (uploader) {
				inputFileId = uploader.inputFile.attr("id");
			}
			fileRow.fadeOut(1500, function () {
				fileRow.remove();
				self._wijFileRowRemoved(fileRow);
				if (self.uploaders[inputFileId]) {
					delete self.uploaders[inputFileId];
				}
				files = $(isUploadFileRow, self.element);
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

		_getFileName: function (fileName) {
			if (fileName.indexOf("\\") > -1) {
				fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
			}
			return fileName;
		},

		_getFileSize: function (file) {
			if (file.files && file.files.length > 0) {
				var obj = file.files[0];
				if (obj.size) {
					return obj.size;
				}
			}
			return 0;
		}
	});
} (jQuery));
