/*globals window jQuery */
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
 ** Wijmo Datasource widget.
*
* Depends:
*	jquery.js
*	jquery.ui.js
*
*/
(function ($) {
	"use strict";
	/// <summary>
	/// wijdatasource reads local raw data or remote raw data through proxy by using
	/// a DataReader and provide tabular object data for widgets. 
	/// </summary>
	var wijdatasource, wijarrayreader, wijhttpproxy;
	wijdatasource = function (options) {
		var self = this;
		/// <summary>
		/// The data to process using the wijdatasource class.
		/// Default: {}.
		/// Type: Object. 
		/// </summary>
		self.data = {};
		/// <summary>
		/// The reader to use with wijdatasource. The wijdatasource class will call the
		/// read method of reader to read from rawdata with an array of fields provided.
		/// The field contains a name, mapping and defaultValue properties which define
		/// the rule of the mapping.
		/// If no reader is configured with wijdatasource it will directly return the
		/// raw data.
		/// Default: null.
		/// Type: Object. 
		/// </summary>
		self.reader = null;
		/// <summary>
		/// The proxy to use with wijdatasource. The wijdatasource class will call
		/// the proxy object's request method.  
		/// In the proxy object, you can send a request to a remote server to
		/// obtain data with the ajaxs options object provided.
		/// Then you can use the wijdatasource reader to process the raw data in the call.
		/// Default: null.
		/// Type: Object. 
		/// </summary>
		self.proxy = null;
		/// <summary>
		/// The processed items from the raw data.  This can be obtained after
		/// datasource is loaded.
		/// Default: [].
		/// Type: Array. 
		/// </summary>
		self.items = [];
		/// <summary>
		/// Function called before loading process starts
		/// Default: null.
		/// Type: Function. 
		/// Code example:
		/// var datasource = new wijdatasource({loading: function(e, data) { }})
		/// </summary>
		/// <param name="datasource" type="wijdatasource">
		/// wijdatasource object that raises this event.
		/// </param>
		/// <param name="data" type="Object">
		/// data passed in by load method.
		/// </param>
		self.loading = null;
		/// <summary>
		/// Function called after loading.
		/// Default: null.
		/// Type: Function. 
		/// Code example:
		/// var datasource = new wijdatasource({loaded: function(e, data) { }})
		/// </summary>
		/// <param name="datasource" type="wijdatasource">
		/// wijdatasource object that raises this event.
		/// </param>
		/// <param name="data" type="Object">
		/// data passed in by load method.
		/// </param>
		self.loaded = null;		
		self._constructor(options);
	};
	window.wijdatasource = wijdatasource;

	$.extend(wijdatasource.prototype, {
		_constructor: function (options) {
			$.extend(this, options);
		},

		load: function (data, forceLocalReload) {
			/// <summary>
			/// Triggers data loading process of wijdatasource.
			/// </summary>
			/// <param name="data" type="Object">
			/// The data to pass to the loading and loaded event handler.
			/// </param>
			/// <param name="forceLocalReload" type="Boolean">
			/// Normally local data is only load for one time,
			/// if needs to reload the data, try to set forceLocalReload to true.
			/// </param>

			var self = this,
			p = self.proxy;
			//var d = self.data;
			// fire loading event.
			if ($.isFunction(self.loading)) {
				self.loading(self, data);
			}
			// if datasource has an proxy object, it will use the request method of
			// proxy to retrive the raw data.
			if (p) {
				// pass callback function to request method so that proxy could
				// call the function when request is finished.
				p.request(self, self.loaded, data);
			}
			else {
				// local data is loaded only once, if force loading is needed
				// forceLocalReload should be true.
				if (self.items.length === 0 || forceLocalReload) {
					// no proxy, read raw data
					this.read();
				}
				// callback function is called
				if ($.isFunction(self.loaded)) {
					self.loaded(self, data);
				}
			}
		},

		read: function () {
			/// <summary>
			/// Triggers data reading process of wijdatasource
			/// by using a DataReader if presented.
			/// </summary>

			var self = this,
			d = self.data;
			// reads using a reader object
			if (d && self.reader) {
				self.reader.read(self);
			}
			else {
				// returns raw data if no reader is configured with datasource.
				self.items = self.data;
				//removed by Jeffrey for removing unnecessary return
				//return self.data;
				//end by Jeffrey
			}
		}
	});

	/// <summary>
	/// wijdatasource ArrayReader reads from a array and processes items.
	/// </summary>
	wijarrayreader = function (fields) {
		// this.fields to store the fields info

		// Add for parse objectValue options for jUICE. D.H
		if ($.isFunction(window["wijmoASPNetParseOptions"])) {
			wijmoASPNetParseOptions(fields);
		}

		if ($.isArray(fields)) {
			this.fields = fields;
		}
	};
	window.wijarrayreader = wijarrayreader;

	$.extend(wijarrayreader.prototype, {
		read: function (datasource) {
			/// <summary>
			/// Starts reading data.
			/// </summary>
			/// <param name="datasource" type="wijdatasource">
			/// The wijdatasource using this DataReader.
			/// </param>

			// convert the raw data of wijdatasource
			if ($.isArray(datasource.data)) {
				datasource.items = this._map(datasource.data);
			}
			else {
				datasource.items = [];
			}
		},

		_map: function (data) {
			var self = this, arr = [];
			if (self.fields === undefined || self.fields.length === 0) {
				$.extend(true, arr, data);
				return arr;
			}
			else {
				$.each(data, function (index, value) {
					var i = {};
					$.each(self.fields, function (index, field) {
						// mapping property is a function,
						// the return value will be used as value.

						//handle the juice
						if (field.mapping && typeof field.mapping && window[field.mapping]) {
							field.mapping = window[field.mapping];
						}

						if ($.isFunction(field.mapping)) {
							i[field.name] = field.mapping(value);
							return true;
						}
						// use string field mapping or number index mapping.
						var mapping = field.mapping !== undefined ?
											field.mapping : field.name,
						v = value[mapping];
						if (v === undefined) {
							if (field.defaultValue !== undefined) {
								v = field.defaultValue;
							}
							else {
								v = value;
							}
						}
						i[field.name] = v;
					});
					arr.push(i);
				});
			}
			return arr;
		}
	});

	/// <summary>
	/// wijdatasource HttpProxy fetches data by using Ajax request.
	/// </summary>
	wijhttpproxy = function (options) {
		this.options = options;

		// Add for parse objectValue options for jUICE. D.H
		if ($.isFunction(window["wijmoASPNetParseOptions"])) {
			wijmoASPNetParseOptions(options);
		}
	};
	window.wijhttpproxy = wijhttpproxy;

	$.extend(wijhttpproxy.prototype, {
		request: function (datasource, callBack, userData) {
			/// <summary>
			/// Starts requesting data.
			/// </summary>
			/// <param name="datasource" type="wijdatasource">
			/// The wijdatasource using this DataReader.
			/// </param>
			/// <param name="callback" type="Function">
			/// The function to call after requesting data successfully.
			/// </param>

			var self = this,
			o = $.extend({}, this.options),
			oldSuccess = o.success;

			o.success = function (data) {
				if ($.isFunction(oldSuccess)) {
					oldSuccess(data);
				}
				self._complete(data, datasource, callBack, o, userData);
			};
			$.ajax(o);
		},

		_complete: function (data, datasource, callback, options, userData) {
			// set raw data
			datasource.data = options.key !== undefined ? data[options.key] : data;
			// read raw data using a data reader in datasource
			datasource.read();
			// fire loaded callback
			if ($.isFunction(callback)) {
				callback(datasource, userData);
			}
		}
	});
} (jQuery));
