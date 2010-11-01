/*
 *
 * Wijmo Library 0.8.0
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
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.position.js
*	jquery.ui.wijlist.js
*
*/
(function ($) {
	/// <summary>
	/// wijdatasource reads local raw data or remote raw data through proxy by using a DataReader and provide tabular object data for widgets. 
	/// </summary>
	var wijdatasource = function (options) {
		var self = this;
		/// <summary>
		/// The data to process using the wijdatasource class.
		/// Default: {}.
		/// Type: Object. 
		/// </summary>
		self.data = {},
		/// <summary>
		/// The reader to use with wijdatasource. The wijdatasource class will call the read method of reader to read from rawdata.  
		/// If no reader is configured with wijdatasource it will directly return the raw data.
		/// Default: null.
		/// Type: Object. 
		/// </summary>
		self.reader = null,
		/// <summary>
		/// The proxy to use with wijdatasource. The wijdatasource class will call the proxy object's request method.  
		/// In the proxy object, you can send a request to a remote server to obtain data. 
		/// Then you can use the wijdatasource reader to process the raw data in the call.
		/// Default: null.
		/// Type: Object. 
		/// </summary>
		self.proxy = null,
		/// <summary>
		/// The processed items from the raw data.  This can be obtained after datasource is loaded.
		/// Default: [].
		/// Type: Array. 
		/// </summary>
		self.items = [],
		/// <summary>
		/// Function called before loading process starts
		/// Default: null.
		/// Type: Function. 
		/// </summary>
		/// <param name="datasource" type="wijdatasource">
		/// wijdatasource object that raises this event.
		/// </param>
		/// <param name="data" type="Object">
		/// data passed in by load method.
		/// </param>
		self.loading = null,
		/// <summary>
		/// Function called after loading.
		/// Default: null.
		/// Type: Function. 
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
			/// Normally local data is only load for one time, if needs to reload the data, try to set forceLocalReload to true.
			/// </param>

			var self = this;
			var p = self.proxy;
			//var d = self.data;
			// fire loading event.
			if ($.isFunction(self.loading)) {
				self.loading(self, data);
			}
			// if datasource has an proxy object, it will use the request method of proxy to retrive the raw data.
			if (p != null) {
				// pass callback function to request method so that proxy could call the function when request is finished.
				p.request(self, self.loaded, data);
			}
			else {
				// local data is loaded only once, if force loading is needed forceLocalReload should be true.
				if (self.items.length == 0 || forceLocalReload) {
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
			/// Triggers data reading process of wijdatasource by using a DataReader if presented.
			/// </summary>

			var self = this;
			var d = self.data;
			// reads using a reader object
			if (d != null && self.reader != null) {
				self.reader.read(self);
			}
			else {
				// returns raw data if no reader is configured with datasource.
				self.items = self.data;
				return self.data;
			}
		}
	});

	/// <summary>
	/// wijdatasource ArrayReader reads from a array and processes items.
	/// </summary>
	var wijarrayreader = function (fields) {
		// this.fields to store the fields info
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
			var self = this;
			var arr = [];
			if (self.fields == undefined || self.fields.length == 0) {
				$.extend(true, arr, data);
				return arr;
			}
			else {
				$.each(data, function (index, value) {
					var i = {};
					$.each(self.fields, function (index, field) {
						// mapping property is a function, the return value will be used as value.
						if ($.isFunction(field.mapping)) {
							i[field.name] = field.mapping(value);
							return true;
						}
						// use string field mapping or number index mapping.
						var mapping = field.mapping != undefined ? field.mapping : field.name;
						var v = value[mapping];
						if (v == undefined) {
							if (field.defaultValue != undefined) {
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
	var wijhttpproxy = function (options) {
		this.options = options;
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

			var self = this;
			var o = self.options;
			var oldSuccess = o.success;

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
			datasource.data = options.key != undefined ? data[options.key] : data;
			// read raw data using a data reader in datasource
			datasource.read();
			// fire loaded callback
			if ($.isFunction(callback)) {
				callback(datasource, userData);
			}
		}
	});
} (jQuery));
