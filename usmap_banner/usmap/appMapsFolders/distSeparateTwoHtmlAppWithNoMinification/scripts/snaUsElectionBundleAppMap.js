// this is copied to /js/usmap/snaUsMap.js
/**
 * START:Utility function for debouncee
 */
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args)
        }
    };
}
/*END: Utility function for debounce*/

/**
 * START:Utility function for throttle
 */
function throttle(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};
/*END: Utility function for throttle*/

//TODO : get this below object from the native and poulate with correct domain for the api(usElectionMapAPIDomain)
window.usElectionMapConfig = {

    // usElectionMapAPIDomain: "http://10.64.161.22:8088/",
    // usElectionMapAPIUrl: "dummyData/us_election/result_coming.json",

    // usElectionMapAPIDomain: "http://10.64.161.22:8088/",
    // usElectionMapAPIUrl: "dummyData/us_election/result_out.json",

    usElectionMapAPIDomain : "http://vmtwebuselections.ext.webdev.skynewsarabia.com/",
    usElectionMapAPIUrl : "rest/map.json",

    // usElectionMapAPIDomain : "https://fshwebt.skynewsarabia.com/",
    // usElectionMapAPIUrl : "rest/map.json",


    intervalToFetchDataInSec: 30,
    colors: {

        repWinnerBgColor: "#CC0033",
        repWinnerHoverBgColor: "#FF0033",


        demWinnerBgColor: "#333399",
        demWinnerHoverBgColor: "#6666CC",


        inProgressBgColor: "#D3D3D3",
        inProgressHoverBgColor: "#EBEBEB",

        strokeColorForStateBorderRepWin: "#FFF",
        strokeColorForStateBorderDemWin: "#FFF",
        strokeColorForStateBorderInProgress: "#FFF",

        demWinnerLabelTextColor: "#FFF",
        repWinnerLabelTextColor: "#FFF",
        inProgressLabelTextColor: "rgba(0,0,0,.75)"

    }
};


/*START: These are  global varaibles in window*/
var activeState = {};
var stateSpecificStyles = {},
    stateSpecificHoverStyles = {},
    statesList = {};

var usMapPluginObj = null;

var reqAlreadyInProgress = false;
var useMapRefreshIntervalTimerId;
/*END: These are  global varaibles in window*/




function renderUsMap() {
    /*START: adjust the map height according to viewport and add the map conainer to init the map*/
    var screen_w = $(window).width() >= 960 ? 960 : $(window).width();
    // this was initially calc as .68 from the library where the aspect ratio is cal as 630h/930w
    // then on iphone SE issue happens small state legend disappears so put .8 on trial and error basis
    var aspect_ratio = 0.8;



    var div_map_content = $('<div id="map-content"></div>');
    var map_el_height = screen_w * aspect_ratio;


    if (typeof setHeightForUsMapWeb != "undefined") {
        map_el_height = setHeightForUsMapWeb(map_el_height);
        $("#map").css("min-height", "auto")
    }

    $('#map').empty()
        .css('height', map_el_height)
        .css('width', '100%');

    $(div_map_content)
        .css('height', map_el_height)
        .css('width', '100%');

    $('#map').html(div_map_content);
    /*END: adjust the map height according to viewport and add the map conainer to init the map*/

    if (!reqAlreadyInProgress) {
        reqAlreadyInProgress = true;
        $.getJSON(usElectionMapConfig.usElectionMapAPIDomain + usElectionMapConfig.usElectionMapAPIUrl, function(data) {

            if (typeof data.map != 'undefined' && data.map.length <= 0) {
                $(div_map_content).addClass('no-data').html('تابعونا يوم 8 نوفمبر <br/> مع الخريطة التفاعلية <br/> لعرض نتائج الانتخابات الأميركية <br/> لحظة بلحظة');
                $('.sharingVerticalBar').hide();
                return;
            }
            $('.legend, .sharingVerticalBar').show();

            // debugger;
            updateMapsWithData(data);


            /*START: map code initialization*/
            $('#map-content').usmap({
                click: function(event, state) {

                    $('path.selected, rect.selected').removeClass('selected');
                    $('path.' + state.name).addClass('selected');
                    $('rect.' + state.name).addClass('selected');

                    activeState = state;
                    var currentStateDataObj = statesList[activeState.name];
                    //TODO: pass this object currentStateDataObj to the native and call the function updateLegendInfo(currentStateData) with this data in another webview
                    updateLegendInfo(currentStateDataObj);
                },
                showLabels: true,
                labelRadius: 0,
                labelWidth: 35,
                labelHeight: 20,
                labelTextStyles: {
                    'font-size': screen_w >= 960 ? 11 : 9,
                    'fill': usElectionMapConfig.colors.inProgressLabelTextColor,
                    'stroke': 'none',
                    'font-family': 'Arial,Helvetica,sans-serif',
                    'font-weight': 400
                },

                stateStyles: {
                    'fill': usElectionMapConfig.colors.inProgressBgColor,
                    'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
                },

                stateHoverStyles: {
                    'fill': usElectionMapConfig.colors.inProgressHoverBgColor,
                    'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
                },

                labelBackingStyles: {
                    'fill': usElectionMapConfig.colors.inProgressBgColor,
                    'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
                },

                labelBackingHoverStyles: {
                    'fill': usElectionMapConfig.colors.inProgressHoverBgColor,
                    'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
                },



                stateSpecificStyles: stateSpecificStyles,
                stateSpecificHoverStyles: stateSpecificHoverStyles,
                stateSpecificLabelBackingStyles: stateSpecificStyles,
                stateSpecificLabelBackingHoverStyles: stateSpecificHoverStyles,
                stateHoverAnimation: 100,
            });
            /*END: map code initialization*/

            //get plugin obj used to update the state
            usMapPluginObj = $('#map-content').usmap("getPluginObject");

            updateMapsWithData(data);
            useMapRefreshIntervalTimerId = window.setInterval(timerIntervalCallback, usElectionMapConfig.intervalToFetchDataInSec * 1000);
            reqAlreadyInProgress = false;


            (typeof callbackForWeb != "undefined") && callbackForWeb();


        }).fail(function(jqXHR, textStatus, errorThrown) {
            reqAlreadyInProgress = false;
        });
    }
}





function timerIntervalCallback() {
    if (!reqAlreadyInProgress) {
        reqAlreadyInProgress = true;
        $.getJSON(usElectionMapConfig.usElectionMapAPIDomain + usElectionMapConfig.usElectionMapAPIUrl, function(data) {
            refreshMap(data);
            reqAlreadyInProgress = false;
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // debugger;
            reqAlreadyInProgress = false;
        });
    }
}

/*START: with the new data , update the state specific styles global objects 
         and if plugin is already init then update the map DOM and add the classes 
         according to the status of the state*/


function updateMapsWithData(data) {
    var currentStateStyleObj,
        currentStateHoverStyleObj,
        currentStateLabelTextStyleObj,
        currentStateTopTextStyleObj,
        currentStateTopTextCountStyleObj,
        currentStateCode,
        currentCssClassForState;


    for (var i = 0; i < data.map.length; i++) {
        currentStateData = data.map[i];
        currentStateCode = currentStateData.stateCode;
        statesList[currentStateData.stateCode] = currentStateData;
        currentStateStyleObj = {}
        currentStateHoverStyleObj = {}
        currentStateLabelTextStyleObj = {}
        currentStateTopTextStyleObj = {}
        currentStateTopTextCountStyleObj = {}

        //remove the classes so that u can update with new classes
        $('.' + currentStateData.stateCode).removeClass('rep_winner dem_winner in_progress')


        if (currentStateData.winner === 'REP') {
            //rep is winner in this state
            currentStateStyleObj = {
                'fill': usElectionMapConfig.colors.repWinnerBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderRepWin
            }
            currentStateHoverStyleObj = {
                'fill': usElectionMapConfig.colors.repWinnerHoverBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderRepWin
            }
            currentStateLabelTextStyleObj = {
                'fill': usElectionMapConfig.colors.repWinnerLabelTextColor,
            }
            currentStateTopTextStyleObj = {
                'fill': usElectionMapConfig.colors.repWinnerLabelTextColor,
            }
            currentStateTopTextCountStyleObj = {
                'fill': usElectionMapConfig.colors.repWinnerLabelTextColor,
            }
            currentCssClassForState = 'rep_winner';
        } else if (currentStateData.winner === 'DEM') {
            //dem is winner in this state

            currentStateStyleObj = {
                'fill': usElectionMapConfig.colors.demWinnerBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderDemWin
            }
            currentStateHoverStyleObj = {
                'fill': usElectionMapConfig.colors.demWinnerHoverBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderDemWin
            }
            currentStateLabelTextStyleObj = {
                'fill': usElectionMapConfig.colors.demWinnerLabelTextColor,
            }
            currentStateTopTextStyleObj = {
                'fill': usElectionMapConfig.colors.demWinnerLabelTextColor,
            }
            currentStateTopTextCountStyleObj = {
                'fill': usElectionMapConfig.colors.demWinnerLabelTextColor,
            }
            currentCssClassForState = 'dem_winner';
        } else {
            //counting is in progress or not started
            currentStateStyleObj = {
                'fill': usElectionMapConfig.colors.inProgressBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
            }
            currentStateHoverStyleObj = {
                'fill': usElectionMapConfig.colors.inProgressHoverBgColor,
                'stroke': usElectionMapConfig.colors.strokeColorForStateBorderInProgress
            }
            currentStateLabelTextStyleObj = {
                'fill': usElectionMapConfig.colors.inProgressLabelTextColor,
            }
            currentStateTopTextStyleObj = {
                'fill': usElectionMapConfig.colors.inProgressLabelTextColor,
            }
            currentStateTopTextCountStyleObj = {
                'fill': usElectionMapConfig.colors.inProgressLabelTextColor,
            }
            currentCssClassForState = 'in_progress';
        }

        stateSpecificStyles[currentStateData.stateCode] = currentStateStyleObj;
        stateSpecificHoverStyles[currentStateData.stateCode] = currentStateHoverStyleObj;


        //plugin is initialized already so apply the changes on the map
        if (usMapPluginObj) {
            $('.' + currentStateData.stateCode).addClass(currentCssClassForState);

            usMapPluginObj.options.stateSpecificStyles[currentStateData.stateCode] = currentStateStyleObj;
            usMapPluginObj.options.stateSpecificHoverStyles[currentStateData.stateCode] = currentStateHoverStyleObj;
            usMapPluginObj.options.stateSpecificLabelTextStyles[currentStateData.stateCode] = currentStateLabelTextStyleObj;
            usMapPluginObj.options.stateSpecificLabelTextStyles[currentStateData.stateCode] = currentStateTopTextStyleObj;
            usMapPluginObj.options.stateSpecificLabelTextStyles[currentStateData.stateCode] = currentStateTopTextCountStyleObj;

            /*START: hot fix on the map*/
            
            usMapPluginObj._getState(currentStateData.stateCode).shape.attr(currentStateStyleObj);
            // debugger;


            if (usMapPluginObj._getState(currentStateData.stateCode).labelBacking) {
                usMapPluginObj._getState(currentStateData.stateCode).labelBacking.attr(currentStateStyleObj);
            }
            if (usMapPluginObj._getState(currentStateData.stateCode).labelText) {
                // debugger
                usMapPluginObj._getState(currentStateData.stateCode).labelText.attr(currentStateLabelTextStyleObj);
            }
            if (usMapPluginObj.stateText[currentStateData.stateCode]) {
                usMapPluginObj.stateText[currentStateData.stateCode].attr(currentStateTopTextStyleObj);
            }

            if (usMapPluginObj.stateTextCount[currentStateData.stateCode]) {
                usMapPluginObj.stateTextCount[currentStateData.stateCode].attr(currentStateTopTextCountStyleObj);
            }

            
            /*END: hot fix on the map*/

            //update the time
            var lastUpdatedTimeText = getLastUpdatedTimeText();
            //TODO take this text and pass to native fn
            $(".sna_usem_last_updated_time").html(lastUpdatedTimeText);

        }

    }

    if (typeof activeState !== 'undefined' && typeof activeState.name !== 'undefined') {
        var currentStateDataObj = statesList[activeState.name];
        //TODO: pass this object currentStateDataObj to the native and call the function updateLegendInfo(currentStateData) with this data in another webview
        updateLegendInfo(currentStateDataObj);
    }
}
/*END: with the new data , update the state specific styles global objects 
         and if plugin is already init then update the map DOM and add the classes 
         according to the status of the state*/

function refreshMap(data) {
    //update the maps with the data
    updateMapsWithData(data)
}


/*START: get the last update time text*/
function getLastUpdatedTimeText() {
    var month = [];

    month[0] = "JAN";
    month[1] = "FEB";
    month[2] = "MAR";
    month[3] = "APR";
    month[4] = "MAY";
    month[5] = "JUN";
    month[6] = "JUL";
    month[7] = "AUG";
    month[8] = "SEP";
    month[9] = "OCT";
    month[10] = "NOV";
    month[11] = "DEC";


    var currentTimeObj = new Date();
    var lastUpdatedTimeText;
    // آخر تحديث: OCT, 3, 2020, 20:10

    currentMonth = month[currentTimeObj.getMonth()];
    currentDate = currentTimeObj.getDate();
    currentYear = currentTimeObj.getFullYear();

    currentHours = currentTimeObj.getHours().toString();
    currentMinutes = currentTimeObj.getMinutes().toString();

    if (currentHours < 10) {
        currentHours = "0" + currentHours;
    }
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }


    lastUpdatedTimeText = "آخر تحديث: ";
    lastUpdatedTimeText += currentMonth + ", " + currentDate + ", " + currentYear + ", ";
    lastUpdatedTimeText += currentHours + ":" + currentMinutes;

    return lastUpdatedTimeText;
}
/*END: get the last update time text*/



$(document).ready(function() {
    renderUsMap();
});