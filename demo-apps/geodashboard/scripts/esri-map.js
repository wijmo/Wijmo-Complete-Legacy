/***********************************************************************************
* Map utilities.
*/

// create and initialize the map
var map;
function createMap() {

    // create map with initial extent
    var initExtent = new esri.geometry.Extent({
        "xmin": -9120937, "ymin": 4724643,
        "xmax": -8695365, "ymax": 5142031,
        "spatialReference": { "wkid": 102100 }
    });
    map = new esri.Map("map", {
        isZoomSlider: false,    
        extent: initExtent,
        wrapAround180: true,
        navigationMode: "css-transforms",
        fadeOnZoom: true
    });

    // hide Zoom Slider
    dojo.connect(map, "onLoad", function () {
        map.hideZoomSlider();
    });

    // add background imagery layer
    var url = "http://services.arcgisonline.com:80/ArcGIS/rest/services/NatGeo_World_Map/MapServer";
    var layer = new esri.layers.ArcGISTiledMapServiceLayer(url);
    layer.id = "basemap";
    map.addLayer(layer);


    // when the extent changes, update ViewModel to match
    var extentChangedTimer;
    map.onExtentChange = function (extent) {
        clearTimeout(extentChangedTimer);
        extentChangedTimer = setTimeout(function () {
            if (this.vm != null) {
                this.vm.extent(map.extent);
                //console.log("updated extent, selected location is: " + vm.selectedLocation());
            }
        }, 250);
    };

    // when user resizes form, resize map to fill the containing div
    var resizeTimer;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            map.resize();
        }, 250);
    });
}

// center the map on the user's current location
function gotoCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (result) {

            // convert location to web mercator coordinates
            var sr = new esri.SpatialReference({ wkid: 102113 });
            var ptGeo = new esri.geometry.Point(result.coords.longitude, result.coords.latitude, sr);
            var pt = esri.geometry.geographicToWebMercator(ptGeo);

            // create new extent centered at current location
            var w = map.extent.getWidth();
            var h = map.extent.getHeight();
            var newExtent = new esri.geometry.Extent({
                "xmin": pt.x - w / 2, "ymin": pt.y - h / 2,
                "xmax": pt.x + w / 2, "ymax": pt.y + h / 2,
                "spatialReference": sr
            });

            // apply new extent to map
            map.setExtent(newExtent);
        });
    }
    else {
        alert("Sorry, location services are not available.");
    }
}

// show tiles for a given source
function showTiles(source) {

    // REVIEW: it would be much nicer to have a single layer and change the 
    // url property, but that doesn't seem to work...

    // create new tile layer if necessary
    var infoSource = vm.sources[source];
    if (infoSource != null) {
        var layer = map.getLayer(source);
        if (layer == null) {
            layer = new esri.layers.ArcGISTiledMapServiceLayer(infoSource.getTileUrl());
            layer.id = source;
            layer.opacity = 0.3;
            map.addLayer(layer);
        }
    }

    // set tile layer visibility
    for (member in vm.sources) {
        var layer = map.getLayer(member);
        if (layer != null) {
            layer.setVisibility(layer.id == source);
        }
    }
}

