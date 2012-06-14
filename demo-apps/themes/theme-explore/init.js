jQuery(document).ready(function () {

    $(".widgets li .widget-inner").hover(function () {
        $(this).addClass('widget-inner-big');
    },
    function () {
        $(this).removeClass('widget-inner-big');
    });

    $('.premium-themes a, .jqueryui-themes a').click(function () {
        $("link[title='rocket-jqueryui']").attr("href", $(this).attr("href"));
        $('.theme-name').text($(this).attr('rel'));
        $('.theme-link').attr("href", $(this).attr("href")).text($(this).attr("href"));
        return false;
    });

    $('.jqueryui-themes a').wijtooltip();

    $('#wijcalendar').wijcalendar();

    $('#wijaccordion').wijaccordion({ header: 'h3', selectedIndex: 1 });

    $("#ipodmenu").wijmenu({
        orientation: "vertical",
        mode: "sliding"
    });


    $('.premium-themes a, .jqueryui-themes a').each(function () {
        var opt_label = $(this).attr('rel');
        var event = "_gaq.push(['_trackEvent','Themes','Change Theme','" + opt_label + "']);";
        $(this).attr('onClick', event);
    });

    $("#wijgrid").wijgrid({
        allowSorting: true,
        allowPaging: true,
        pageSize: 5,
        data: [
                    [27, 'Canada', 'Adams, Craig', 'RW', 'R', 32, 2009, 'Seria, Brunei'],
                    [43, 'Canada', 'Boucher, Philippe', 'D', 'R', 36, 2008, 'Saint-Apollinaire, Quebec'],
                    [24, 'Canada', 'Cooke, Matt', 'LW', 'L', 30, 2008, 'Belleville, Ontario'],
                    [87, 'Canada', 'Crosby, Sidney (C)', 'C', 'L', 21, 2005, 'Cole Harbour, Nova Scotia'],
                    [1, 'United States', 'Curry, John', 'G', 'L', 25, 2007, 'Shorewood, Minnesota'],
                    [9, 'Canada', 'Dupuis, Pascal', 'W', 'L', 30, 2008, 'Laval, Quebec'],
                    [7, 'United States', 'Eaton, Mark', 'D', 'L', 32, 2006, 'Wilmington, Delaware'],
                    [26, 'Ukraine', 'Fedotenko, Ruslan', 'LW', 'L', 30, 2008, 'Kiev, U.S.S.R.'],
                    [29, 'Canada', 'Fleury, Marc-Andre', 'G', 'L', 24, 2003, 'Sorel, Quebec'],
                    [32, 'Canada', 'Garon, Mathieu', 'G', 'R', 31, 2009, 'Chandler, Quebec'],
                    [2, 'United States', 'Gill, Hal', 'D', 'L', 34, 2008, 'Concord, Massachusetts'],
                    [28, 'Canada', 'Godard, Eric', 'RW', 'R', 29, 2008, 'Vernon, British Columbia'],
                    [3, 'United States', 'Goligoski, Alex', 'D', 'L', 23, 2004, 'Grand Rapids, Minnesota'],
                    [55, 'Russia', 'Gonchar, Sergei (A)', 'D', 'L', 35, 2005, 'Chelyabinsk, U.S.S.R.'],
                    [13, 'United States', 'Guerin, Bill', 'RW', 'R', 38, 2009, 'Worcester, Massachusetts'],
                    [42, 'Canada', 'Jeffrey, Dustin', 'C', 'L', 21, 2007, 'Sarnia, Ontario'],
                    [48, 'Canada', 'Kennedy, Tyler', 'C', 'R', 22, 2004, 'Sault Ste.Marie, Ontario'],
                    [14, 'Canada', 'Kunitz, Chris', 'LW', 'L', 29, 2009, 'Regina, Saskatchewan'],
                    [58, 'Canada', 'Letang, Kristopher', 'D', 'R', 22, 2005, 'Montreal, Quebec'],
                    [65, 'United States', 'Lovejoy, Ben', 'D', 'R', 25, 2008, 'Canaan, New Hampshire'],
                    [71, 'Russia', 'Malkin, Evgeni (A)', 'C', 'L', 22, 2004, 'Magnitogorsk, U.S.S.R.'],
                    [14, 'Canada', 'Minard, Chris', 'C', 'L', 27, 2007, 'Owen Sound, Ontario'],
                    [44, 'United States', 'Orpik, Brooks', 'D', 'L', 28, 2001, 'San Francisco, California'],
                    [81, 'Slovakia', 'Satan, Miroslav', 'RW', 'L', 34, 2008, 'Jacovce, Czechoslovakia'],
                    [4, 'United States', 'Scuderi, Rob', 'D', 'L', 30, 1998, 'Syosset, New York'],
                    [11, 'Canada', 'Staal, Jordan', 'C', 'L', 20, 2006, 'Thunder Bay, Ontario'],
                    [17, 'Czech Republic', 'Sykora, Petr', 'RW', 'L', 32, 2007, 'Plzen�, Czechoslovakia'],
                    [22, 'United States', 'Taffe, Jeff', 'LW', 'L', 28, 2007, 'Hastings, Minnesota'],
                    [25, 'Canada', 'Talbot, Maxime', 'C', 'L', 25, 2002, 'LeMoyne, Quebec'],
                    [15, 'Canada', 'Zigomanis, Michael', 'C', 'R', 28, 2008, 'Toronto, Ontario']
                ],
        columns: [
                    { headerText: "Number" }, { headerText: "Nationality" }, { headerText: "Player" }, { headerText: "Position" },
                    { headerText: "Handedness" }, { headerText: "Age" }, { headerText: "Acquired" }, { headerText: "Birthplace" }
                ]
    });


    $("#wijtabs").wijtabs();
    $("#wijtree").wijtree({ autoCollapse: false });

    $("#wijtree li:first").wijtreenode({ expanded: true });
    $("li.folder").wijtreenode("option", "collapsedIconClass", "ui-icon-folder-collapsed")
                .wijtreenode("option", "expandedIconClass", "ui-icon-folder-open");
    $("li.file").wijtreenode("option", "itemIconClass", "ui-icon-document");

    var testArray = [{
        label: 'c++',
        value: 'c++'
    }, {
        label: 'java',
        value: 'java'
    }, {
        label: 'php',
        value: 'php'
    }, {
        label: 'coldfusion',
        value: 'coldfusion'
    }, {
        label: 'javascript',
        value: 'javascript'
    }, {
        label: 'asp',
        value: 'asp'
    }, {
        label: 'ruby',
        value: 'ruby'
    }, {
        label: 'python',
        value: 'python'
    }, {
        label: 'c',
        value: 'c'
    }, {
        label: 'scala',
        value: 'scala'
    }, {
        label: 'groovy',
        value: 'groovy'
    }, {
        label: 'haskell',
        value: 'haskell'
    }, {
        label: 'perl',
        value: 'perl'
    }];
    var list = $("#list");
    var input = $('#testinput');
    list.wijlist({
        selected: function (event, ui) {
            var selectedItem = ui.item;
            var str = selectedItem.label;
            input.val(str);

        }
    });


    list.wijlist('setItems', testArray);
    list.wijlist('renderList');
    list.wijlist('refreshSuperPanel');
    input.bind("keydown.wijcombobox", function (event) {
        var keyCode = $.ui.keyCode;
        switch (event.keyCode) {
            case keyCode.UP:
                list.wijlist('previous', event);
                // prevent moving cursor to beginning of text field in some browsers
                event.preventDefault();
                break;
            case keyCode.DOWN:
                if (!list.is(':visible')) {
                    list.show();
                    return;
                }
                list.wijlist('next', event);
                // prevent moving cursor to end of text field in some browsers
                event.preventDefault();
                break;
            case keyCode.ENTER:
                event.preventDefault();
                list.wijlist('select', event);
                break;
            case keyCode.PAGE_UP:
                list.wijlist('previousPage');
                break;
            case keyCode.PAGE_DOWN:
                list.wijlist('nextPage');
                break;
            default:
                break;
        }
    });

    $(":input[type='text'],:input[type='password'],textarea").wijtextbox();
    $("#select1").wijdropdown();
    $(":input[type='radio']").wijradio();
    $(":input[type='checkbox']").wijcheckbox();
    $("#wijmo-button").button();
    $("#wijmo-button").click(function () { return false; });

});