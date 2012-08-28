/***********************************************************************************
* ViewModel class.
* This class provides various types of demographic information for a given 
* location.
* The information is exposed as a 'sources' property, and the location is
* exposed as an 'extent' property.
* @constructor
*/
function ViewModel() {

    // information sources available to views
    this.sources = {};
    this.sources.age = new InfoSource(this, "USA_Median_Age", "TOTPOP_CY,MEDAGE_CY,AGEBASE_CY,POPU5_CY,POP5_CY,POP10_CY,POP15_CY,POP20_CY,POP25_CY,POP30_CY,POP35_CY,POP40_CY,POP45_CY,POP50_CY,POP55_CY,POP60_CY,POP65_CY,POP70_CY,POP75_CY,POP80_CY,POP85_CY", "POPU5_CY,POP85_CY", "2010 Population, Age ");
    this.sources.householdIncome = new InfoSource(this, "USA_Median_Household_Income", "TOTPOP_CY,MEDHINC_CY,HINCBASECY,HINC0_CY,HINC10_CY,HINC15_CY,HINC20_CY,HINC25_CY,HINC30_CY,HINC35_CY,HINC40_CY,HINC45_CY,HINC50_CY,HINC60_CY,HINC75_CY,HINC100_CY,HINC125_CY,HINC150_CY,HINC200_CY,HINC250_CY,HINC500_CY", "HINC0_CY,HINC500_CY", "2010 Household Income ");
    this.sources.netWorth = new InfoSource(this, "USA_Median_Net_Worth", "TOTPOP_CY,MEDVAL_I,MEDHINC_I,MEDNW_CY,MEDNW_I,NWBASE_CY,NW0_CY,NW15_CY,NW35_CY,NW50_CY,NW75_CY,NW100_CY,NW150_CY,NW250_CY,NW500_CY,NW1M_CY", "NW0_CY,NW1M_CY", "2010 Households with Net Worth ");
    this.sources.homeValue = new InfoSource(this, "USA_Median_Home_Value", "TOTPOP_CY,MEDVAL_CY,MEDVAL_I,MEDHINC_I,MEDNW_I,VALBASE_CY,VALU10K_CY,VAL10K_CY,VAL15K_CY,VAL20K_CY,VAL25K_CY,VAL30K_CY,VAL35K_CY,VAL40K_CY,VAL50K_CY,VAL60K_CY,VAL70K_CY,VAL80K_CY,VAL90K_CY,VAL100K_CY,VAL125K_CY,VAL150K_CY,VAL175K_CY,VAL200K_CY,VAL250K_CY,VAL300K_CY,VAL400K_CY,VAL500K_CY,VAL750K_CY,VAL1M_CY", "VALU10K_CY,VAL1M_CY", "2010 Home Value ");
    this.sources.tapestry = new InfoSource(this, "USA_Tapestry", "DOMTAP,TAPSEGNAM");
    this.sources.daytimePopulation = new InfoSource(this, "USA_Daytime_Population", "TOTPOP_CY,DNRATIO_CY");
    this.sources.populationDensity = new InfoSource(this, "USA_Population_Density", "TOTPOP_CY,POPDENS_CY");
    this.sources.populationBySex = new InfoSource(this, "USA_Population_by_Sex", "TOTPOP_CY,PMALE_CY,PFEMALE_CY");
    this.sources.retailSpendingPotential = new InfoSource(this, "USA_Retail_Spending_Potential", "TOTPOP_CY,MEDHINC_CY,X15001_A,X15001_I");
    this.sources.unemploymentRate = new InfoSource(this, "USA_Unemployment_Rate", "TOTPOP_CY,MEDVAL_I_12,MEDHINC_I_12,MEDNW_I_12,UNEMP_CY_12,UNEMPRT_CY_12");

    // add summary information
    var list = [];
    list.push(new InfoValue("POPU5_CY POP5_CY POP10_CY POP15_CY POP20_CY POP25_CY", "under 30"));
    list.push(new InfoValue("POP30_CY POP35_CY POP40_CY POP45_CY POP50_CY POP55_CY", "30 to 59"));
    list.push(new InfoValue("POP60_CY POP65_CY POP70_CY POP75_CY POP80_CY POP85_CY", "60 and over"));
    this.sources.age.shortList = list;
    list = [];
    list.push(new InfoValue("HINC0_CY HINC10_CY HINC15_CY HINC20_CY HINC25_CY HINC30_CY HINC35_CY", "under 40k"));
    list.push(new InfoValue("HINC40_CY HINC45_CY HINC50_CY HINC60_CY HINC75_CY", "40k to 100k"));
    list.push(new InfoValue("HINC100_CY HINC125_CY HINC150_CY HINC200_CY HINC250_CY HINC500_CY", "100k and above"));
    this.sources.householdIncome.shortList = list;
    list = [];
    list.push(new InfoValue("NW0_CY NW15_CY NW35_CY", "under 50k"));
    list.push(new InfoValue("NW50_CY NW75_CY NW100_CY", "50k to 150k"));
    list.push(new InfoValue("NW150_CY NW250_CY NW500_CY NW1M_CY", "150k and above"));
    this.sources.netWorth.shortList = list;
    list = [];
    list.push(new InfoValue("VALU10K_CY VAL10K_CY VAL15K_CY VAL20K_CY VAL25K_CY VAL30K_CY VAL35K_CY VAL40K_CY VAL50K_CY VAL60K_CY VAL70K_CY VAL80K_CY VAL90K_CY VAL100K_CY VAL125K_CY", "under 150k"));
    list.push(new InfoValue("VAL150K_CY VAL175K_CY VAL200K_CY VAL250K_CY VAL300K_CY VAL400K_CY", "150k to 500k"));
    list.push(new InfoValue("VAL500K_CY VAL750K_CY VAL1M_CY", "500k and above"));
    this.sources.homeValue.shortList = list;

    // name of the location currently selected
    this.selectedLocation = ko.observable("");

    // information scale (state = 4, county = 3, tract = 2, f(extent))
    this.infoScale = ko.observable(4);

    // location to retrieve information for
    this.extent = ko.observable(null);
    var self = this;
    this.extent.subscribe(function (newExtent) {
        self.updateValues();
    });

    console.log("created ViewModel");
}
/**
* Updates the information in all InfoValues that have subscribers attached to them
* based on the location defined by a given map extent.
*/
ViewModel.prototype.updateValues = function () {

    // update info scale
    this.infoScale(4); // state level
    if (this.extent()) {
        if (this.extent().getWidth() < 6e6) {
            this.infoScale(3); // county level
        }
        if (this.extent().getWidth() < 2e5) {
            this.infoScale(2); // tract level
        }
    }

    // update all infoValues
    for (member in this.sources) {
        var source = this.sources[member];
        source.updateValues();
    }
}

/***********************************************************************************
* InfoSource class.
* The InfoSource belongs to a ViewModel and provides information about a specific 
* demographic for the parent ViewModel's current extent.
* @constructor
*/
function InfoSource(model, shortUrl, keys, listKeys, trimName) {

    this.viewModel = model;     // owner ViewModel
    this.shortUrl = shortUrl;   // url used to retrieve data/tiles
    this.trimName = trimName;   // remove this part from item names
    this.values = {};           // object that contains the values
    this.list = [];             // list with range values

    // get start/end list keys
    var arr = listKeys != null ? listKeys.split(',') : null;
    var startKey = arr != null ? arr[0] : null;
    var endKey = arr != null ? arr[1] : null;

    // keys used to query/store values
    keys = "NAME,ST_ABBREV," + keys;
    var arr = keys.split(',');
    var addToList = false;
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i];

        // add to values object
        var infoValue = new InfoValue(key);
        this.values[key] = infoValue;

        // add to list
        if (!addToList && key == startKey) {
            addToList = true;
        }
        if (addToList) {
            this.list.push(infoValue);
        }
        if (addToList && key == endKey) {
            addToList = false;
        }
    }

    // use service to get key descriptions
    var url = this.getSchemaUrl();
    var self = this;
    $.ajax({ url: url, dataType: "jsonp", success: function (data) {

        // got descriptions, assign them to the name property in our data items
        if (data.layers) {
            var result = data.layers[1].fields;
            for (var i = 0; i < result.length; i++) {
                var entry = result[i];
                var infoValue = self.values[entry.name];
                if (infoValue != null) {
                    var name = entry.alias;
                    if (name.indexOf(self.trimName) == 0) {
                        name = name.substring(self.trimName.length);
                    }
                    infoValue.name(name);
                }
            }
        }
        //console.log("schema loaded for " + source.name);
    }
    });

    console.log("created InfoSource: " + this.shortUrl);
}
/**
* Updates the information in this InfoValue if it has subscribers.
*/
InfoSource.prototype.updateValues = function () {

    // see if our values have any subscribers
    var subscribers = 0;
    for (var key in this.values) {
        var infoValue = this.values[key];
        subscribers += infoValue.value.getSubscriptionsCount();
    }

    // if there are subscribers, go update the values
    if (subscribers > 0) {
        //console.log("updating info for " + this.shortUrl + " (there are subscribers)");
        if (this.viewModel.extent()) {

            // build query/fields to retrieve
            var query = new esri.tasks.Query();
            query.geometry = this.viewModel.extent().getCenter();
            query.outFields = [];
            for (var key in this.values) {
                query.outFields.push(key);
            }

            // run query
            var url = this.getQueryUrl();
            var queryTask = new esri.tasks.QueryTask(url);
            var self = this;
            dojo.connect(queryTask, "onComplete", function (featureSet) { self.gotInfoValues(featureSet); });
            queryTask.execute(query);
        }
    }
}
/**
* After getting values from ESRI service, store them in this InfoSource.
*/
InfoSource.prototype.gotInfoValues = function (featureSet) {
    if (featureSet.features.length > 0) {

        // get attributes
        var atts = featureSet.features[0].attributes;

        // update selected location in parent ViewModel
        this.viewModel.selectedLocation(atts["NAME"] + ", " + atts["ST_ABBREV"]);

        // update values in our data object
        for (var key in this.values) {
            var infoValue = this.values[key];
            infoValue.value(atts[key]);
        }

        // update summary info values
        if (this.shortList != null) {
            for (var i = 0; i < this.shortList.length; i++) {
                var value = 0;
                var keys = this.shortList[i].key.split(" ");
                for (var key in keys) {
                    value += this.values[keys[key]].value();
                }
                this.shortList[i].value(value);
            }
        }

        // update Percent, PercentMax on lists
        this.updatePercent(this.list);
        this.updatePercent(this.shortList);
    }
    else {
        // no data available: clear values 
        this.viewModel.selectedLocation("Please select a location within the USA.");
        for (key in this.values) {
            var infoValue = this.values[key];
            infoValue.value(null);
        }
    }
    console.log("got InfoValues for " + this.shortUrl);
}
/**
* After getting values into the lists, update percentages.
*/
InfoSource.prototype.updatePercent = function (list) {
    if (list != null) {

        // get sum, max
        var sum = 0, max = 0;
        for (var i = 0; i < list.length; i++) {
            var val = list[i].value();
            sum += val;
            if (i == 0 || val > max) {
                max = val;
            }
        }

        // calculate percentages
        for (var i = 0; i < list.length; i++) {
            var iv = list[i];
            iv.percent(sum == 0 ? 0 : iv.value() / sum);
            iv.percentMax(max == 0 ? 0 : iv.value() / max);
        }
    }
}

// format used to build service urls
InfoSource.prototype.URL_FORMAT =
    "http://services.arcgisonline.com:80/ArcGIS/rest/services/Demographics/SHORT_URL/MapServer";

// build url for getting the tiles for this infoSource
InfoSource.prototype.getTileUrl = function () {
    return this.URL_FORMAT.replace("SHORT_URL", this.shortUrl);
}

// build url for querying data for the current scale
InfoSource.prototype.getQueryUrl = function () {
    return this.getTileUrl() + "/" + this.viewModel.infoScale();
}

// build url for querying data for the data schema
InfoSource.prototype.getSchemaUrl = function () {
    return this.getTileUrl() + "/layers?f=json";
}

/***********************************************************************************
* Initializes a new instance of a InfoValue.
* InfoValue objects have a key, a name, and a value.
* @constructor
*/
function InfoValue(key, name) {
    var self = this;
    self.key = key;
    self.name = ko.observable(name || "");
    self.value = ko.observable(0);
    self.percent = ko.observable(0);
    self.percentMax = ko.observable(0);
}

/**************************************************************************************
* Gets a textual description for an "index" value. Index values represent a comparison
* where the value "100" represents the national average, "50" represents half, and "200"
* represents twice the national average.
*/
function getIndexDescription(index) {
    var desc =
        index < 50 ? "Substantially lower" :
        index < 80 ? "Lower" :
        index < 100 ? "Slightly lower" :
        index < 120 ? "Slightly higher" :
        index < 200 ? "Higher" :
        "Substantially higher";
    return desc + " than the national average.";
}

/**************************************************************************************
* Gets the position of an index slider as a percentage (0 to 1).
*/
function getSliderPosition(index) {
    index = Math.log(index / 100);
    if (index > +1.5) index = +1.5;
    if (index < -1.5) index = -1.5;
    return (index + 1.5) / 3;
}

/**************************************************************************************
* Extracts values from a list and builds a 'seriesList' that can be used as a
* data source for a wijmo chart control.
*/
function formatChartSeriesList(list) {
    var seriesList = [];
    var xData = [];
    var yData = [];

    for (var i = 0; i < list.length; i++) {
        xData.push(list[i].name());
        yData.push(list[i].value());           
    }

    seriesList.push({
        label: "Homes",
        data: { x: xData, y: yData }
    });

    return seriesList;
}