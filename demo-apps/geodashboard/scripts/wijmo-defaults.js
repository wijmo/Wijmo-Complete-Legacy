/***********************************************************************************
* Wijmo widget defaults
* This utility changes the defaults for wijmo widgets for use in this application. 
* This reduces the number of options that have to be specified in the markup and 
* keeps the View cleaner.
* It also makes it easy to change defaults for the whole application at once.
*/
//Wait for page (including widgets) to load
$(document).ready(function () {

    // set defaults for the radial gauge control
    var options = $.wijmo.wijradialgauge.prototype.options;

    // override only the settings we want to change for this app
    options.cap.radius = 7;
    options.cap.style = { fill: '#fff', stroke: 'none' };
    options.pointer.style = { fill: '#fff', stroke: 'none' };
    options.face.style = { fill: 'none', stroke: 'none' };
    options.startAngle = 0;
    options.sweepAngle = 90;
    options.min = 0;
    options.max = 300000;
    options.tickMajor.interval = 100000;
    options.tickMajor.style = { fill: 'none', stroke: 'none' };
    options.tickMinor.interval = 50000;
    options.tickMinor.style = { fill: 'none', stroke: 'none' };
    options.labels.format = function (val) { return Globalize.format(val / 1000, 'n0') + 'k' };
    options.labels.style = { fill: '#fff', 'font-weight': 900, 'font-size': '12px', 'font-family': '"Segoe UI" ,Segoe,Tahoma,Geneva,sans-serif;' };
    options.origin = { x: 0.8, y: 0.8 };
    options.height = 140;
    options.width = 230;
    options.radius = 125;
    options.animation = { enabled: false };

    // apply default options to the radial gauge
    $.extend($.wijmo.wijradialgauge.prototype.options, options);

    // set defaults for the bar chart control
    options = $.wijmo.wijbarchart.prototype.options;

    // override only the settings we want to change for this app
    options.seriesStyles = [{ fill: '#15ced0', stroke: 'none'}];
    options.chartLabelStyle = { fill: '#fff', 'font-weight': 900, 'font-size': '12px', 'font-family': '"Segoe UI" ,Segoe,Tahoma,Geneva,sans-serif;' };
    options.legend.visible = false;
    options.showChartLabels = false;
    options.axis.x.textVisible = false;
    options.axis.x.annoFormatString = 'n0';
    options.axis.y.labels.style = { fill: '#fff', 'font-weight': 900, 'font-size': '12px', 'font-family': '"Segoe UI" ,Segoe,Tahoma,Geneva,sans-serif;' };
    options.height = 306;
    options.horizontal = false
    options.hint.content = function () {
        return this.x + '\n ' + Globalize.format(this.y, 'n0') + ' Homes';
    };

    // apply default options to the bar chart
    $.extend($.wijmo.wijbarchart.prototype.options, options);
	

	setTimeout( function() {
		$('.data-table').each(function(){
			$(this).find('tr:odd').addClass('odd');
		});
	}, 1000 );	

	
});