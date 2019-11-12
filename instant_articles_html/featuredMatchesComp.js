var widgetContSelectorClass = "sidebar_featured_match_comp";

// var domain = "http://10.64.161.22:8081";
var domain = window.domain || "https://www.snawebdevtest.com";
var contentApiUrl = domain + "/rest/v2/sidebar/article.json";
var imageDomain = "https://www.skynewsarabia.com";


var getJSON = function(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                successHandler && successHandler(xhr.response);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

var data;

var escapeDoubleAndSingleQuotes = function(str) {
    return str.replace(/\\([\s\S])|(["])/g, "$1&quot;"); // thanks @slevithan!
};



// UI Template
var template = function() {

    // If there are no  matches
    // if (!data.matches && data.matches.length < 1) {//to be uncommented

        /*START: To be removed*/
        data.matches = [
                          {
                            "matchId": 3064737,
                            "teamAId": 1684,
                            "teamBId": 1710,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "ماريتيمو",
                            "teamBName": "بورتيمونينسي",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "استاد باريروس",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "ماريتيمو-ضد-بورتيمونينسي",
                            "teamAUrlFriendlySuffix": "ماريتيمو",
                            "teamBUrlFriendlySuffix": "بورتيمونينسي",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          },
                          {
                            "matchId": 3064742,
                            "teamAId": 1689,
                            "teamBId": 1682,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "فيتوريا غيمارايش",
                            "teamBName": "سبورتينغ براغا",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "ملعب د. أفونسو أنريكي",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "فيتوريا-غيمارايش-ضد-سبورتينغ-براغا",
                            "teamAUrlFriendlySuffix": "فيتوريا-غيمارايش",
                            "teamBUrlFriendlySuffix": "سبورتينغ-براغا",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          },
                          {
                            "matchId": 3064740,
                            "teamAId": 1680,
                            "teamBId": 1692,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "نادي سبورتينغ البرتغالي",
                            "teamBName": "بيليننسيش",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "استاد خوسيه ألفالادي",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "نادي-سبورتينغ-البرتغالي-ضد-بيليننسيش",
                            "teamAUrlFriendlySuffix": "نادي-سبورتينغ-البرتغالي",
                            "teamBUrlFriendlySuffix": "بيليننسيش",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          },
                          {
                            "matchId": 3064741,
                            "teamAId": 1706,
                            "teamBId": 1679,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "سانتا كلارا",
                            "teamBName": "بنفيكا",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "Estádio de São Miguel",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "سانتا-كلارا-ضد-بنفيكا",
                            "teamAUrlFriendlySuffix": "سانتا-كلارا",
                            "teamBUrlFriendlySuffix": "بنفيكا",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          },
                          {
                            "matchId": 3064736,
                            "teamAId": 1685,
                            "teamBId": 1678,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "بوافيشتا",
                            "teamBName": "بورتو",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "استاد دو بيسا سيكولو 21",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "بوافيشتا-ضد-بورتو",
                            "teamAUrlFriendlySuffix": "بوافيشتا",
                            "teamBUrlFriendlySuffix": "بورتو",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          },
                          {
                            "matchId": 3064734,
                            "teamAId": 2752,
                            "teamBId": 1687,
                            "winner": "yet unknown",
                            "status": "Fixture",
                            "date": "2019-11-10T16:00:00Z",
                            "teamAName": "فاماليكاو",
                            "teamBName": "موريرنسي",
                            "teamAScore": 0,
                            "teamBScore": 0,
                            "venue": "Estádio Municipal 22 de Junho",
                            "competition": "الدوري البرتغالي الممتاز",
                            "dateOnly": 1573329600000,
                            "urlFriendlySuffix": "فاماليكاو-ضد-موريرنسي",
                            "teamAUrlFriendlySuffix": "فاماليكاو",
                            "teamBUrlFriendlySuffix": "موريرنسي",
                            "competitionUrlFriendlySuffix": "الدوري-البرتغالي-الممتاز",
                            "itLeagueMatch": false
                          }
                        ];

        data.matches = [
          {
            "matchId": 2936420,
            "teamAId": 24304,
            "teamBId": 14856,
            "winner": "team_A",
            "status": "Playing",
            "date": "2019-02-20T10:00:00Z",
            "teamAName": "كولومبو",
            "teamBName": "ترانسبورت يونايتد ",
            "teamAScore": 7,
            "teamBScore": 1,
            "venue": "Race Course International Stadium",
            "competition": "كأس الاتحاد الآسيوي",
            "dateOnly": 1550606400000,
            "urlFriendlySuffix": "كولومبو-ضد-ترانسبورت-يونايتد",
            "teamAUrlFriendlySuffix": "كولومبو",
            "teamBUrlFriendlySuffix": "ترانسبورت-يونايتد",
            "competitionUrlFriendlySuffix": "كأس-الاتحاد-الآسيوي",
            "itLeagueMatch": false
          },
          {
            "matchId": 2938934,
            "teamAId": 3627,
            "teamBId": 3552,
            "winner": "team_B",
            "status": "Played",
            "date": "2019-02-25T15:15:00Z",
            "teamAName": "الكويت",
            "teamBName": "الاتحاد",
            "teamAScore": 0,
            "teamBScore": 0,
            "venue": "ملعب نادي الكويت",
            "competition": "كأس الاتحاد الآسيوي",
            "dateOnly": 1551038400000,
            "urlFriendlySuffix": "الكويت-ضد-الاتحاد",
            "teamAUrlFriendlySuffix": "الكويت",
            "teamBUrlFriendlySuffix": "الاتحاد",
            "competitionUrlFriendlySuffix": "كأس-الاتحاد-الآسيوي",
            "itLeagueMatch": false
          },
          {
            "matchId": 3008265,
            "teamAId": 1941,
            "teamBId": 2211,
            "winner": "team_A",
            "status": "Suspended",
            "date": "2019-07-14T16:00:00Z",
            "teamAName": "السنغال",
            "teamBName": "تونس",
            "teamAScore": 1,
            "teamBScore": 0,
            "venue": "استاد 30 يونيو الدفاع الجوي",
            "competition": "كأس أمم أفريقيا",
            "dateOnly": 1563048000000,
            "urlFriendlySuffix": "السنغال-ضد-تونس",
            "teamAUrlFriendlySuffix": "السنغال",
            "teamBUrlFriendlySuffix": "تونس",
            "competitionUrlFriendlySuffix": "كأس-أمم-أفريقيا",
            "itLeagueMatch": false
          },
          {
            "matchId": 3008266,
            "teamAId": 78,
            "teamBId": 1567,
            "winner": "team_A",
            "status": "Cancelled",
            "date": "2019-07-14T19:00:00Z",
            "teamAName": "الجزائر",
            "teamBName": "نيجيريا",
            "teamAScore": 2,
            "teamBScore": 1,
            "venue": "ستاد القاهرة الدولي",
            "competition": "كأس أمم أفريقيا",
            "dateOnly": 1563048000000,
            "urlFriendlySuffix": "الجزائر-ضد-نيجيريا",
            "teamAUrlFriendlySuffix": "الجزائر",
            "teamBUrlFriendlySuffix": "نيجيريا",
            "competitionUrlFriendlySuffix": "كأس-أمم-أفريقيا",
            "itLeagueMatch": false
          },
          {
            "matchId": 3008264,
            "teamAId": 2211,
            "teamBId": 1567,
            "winner": "team_B",
            "status": "Postponed",
            "date": "2019-07-17T19:00:00Z",
            "teamAName": "تونس",
            "teamBName": "نيجيريا",
            "teamAScore": 0,
            "teamBScore": 1,
            "venue": "استاد السلام (استاد الإنتاج الحربي بالقاهرة)",
            "competition": "كأس أمم أفريقيا",
            "dateOnly": 1563307200000,
            "urlFriendlySuffix": "تونس-ضد-نيجيريا",
            "teamAUrlFriendlySuffix": "تونس",
            "teamBUrlFriendlySuffix": "نيجيريا",
            "competitionUrlFriendlySuffix": "كأس-أمم-أفريقيا",
            "itLeagueMatch": false
          },
          {
            "matchId": 2942467,
            "teamAId": 3574,
            "teamBId": 6021,
            "winner": "yet unknown",
            "status": "Fixture",
            "date": "2019-10-01T16:00:00Z",
            "teamAName": "العهد",
            "teamBName": "الجزيرة",
            "teamAScore": 0,
            "teamBScore": 0,
            "venue": "ملعب كميل شمعون المدينة الرياضية",
            "competition": "كأس الاتحاد الآسيوي",
            "dateOnly": 1569873600000,
            "urlFriendlySuffix": "العهد-ضد-الجزيرة",
            "teamAUrlFriendlySuffix": "العهد",
            "teamBUrlFriendlySuffix": "الجزيرة",
            "competitionUrlFriendlySuffix": "كأس-الاتحاد-الآسيوي",
            "itLeagueMatch": false
          }
        ];
        /*END: To be removed*/

        // return '';//to be uncommented
    // }//to be uncommented

    var moreBtnLink = domain + '/sport/football/matches';

    var matchesList = data.matches;

    data.featuredMatchesTitle = "أهم المباريات";//to be removed

    var component = {
        title: data.featuredMatchesTitle,
        sportsContent: {
            matches: matchesList
        }
    };

    /*START: Local Day*/
    var month = [],
        weekday = [];

    month[0] = "يناير";
    month[1] = "فبراير";
    month[2] = "مارس";
    month[3] = "أبريل";
    month[4] = "مايو";
    month[5] = "يونيو";
    month[6] = "يوليو";
    month[7] = "أغسطس";
    month[8] = "سبتمبر";
    month[9] = "أكتوبر";
    month[10] = "نوفمبر";
    month[11] = "ديسمبر";

    weekday[0] = "الأحد";
    weekday[1] = "الإثنين";
    weekday[2] = "الثلاثاء";
    weekday[3] = "الأربعاء";
    weekday[4] = "الخميس";
    weekday[5] = "الجمعة";
    weekday[6] = "السبت";
    /*END: Local Day*/


    var matches = component.sportsContent.matches;
    var matchGroupObj = {};

    var todayDateObj = new Date();
    var todayDayGroupStr = todayDateObj.getDate() + "_" + (todayDateObj.getMonth() + 1) + "_" + todayDateObj.getFullYear();

    var tomorrowDateObj = new Date();
    tomorrowDateObj.setDate(todayDateObj.getDate() + 1);
    var tomorrowDayGroupStr = tomorrowDateObj.getDate() + "_" + (tomorrowDateObj.getMonth() + 1) + "_" + tomorrowDateObj.getFullYear();

    var yesterdayDateObj = new Date();
    yesterdayDateObj.setDate(todayDateObj.getDate() - 1);
    var yestedayDayGroupStr = yesterdayDateObj.getDate() + "_" + (yesterdayDateObj.getMonth() + 1) + "_" + yesterdayDateObj.getFullYear();





    var matchGroups = [];


    var maxMatchToBeShown = matches.length > 6 ? 6 : matches.length;


    for (var i = 0; i < maxMatchToBeShown; i++) {
        var matchDayGroupStr;
        var matchTimeUTC;
        var currMatch = matches[i];
        var matchDateObjLocal = new Date(currMatch.date);
        var currMatchHours, currMatchMinutes;
        var matchGroupDisplayMonth = month[matchDateObjLocal.getMonth()];
        var matchGroupDisplayWeekDay = weekday[matchDateObjLocal.getDay()];

        matchDayGroupStr = matchDateObjLocal.getDate() + "_" + (matchDateObjLocal.getMonth() + 1) + "_" + matchDateObjLocal.getFullYear();

        if (matchDayGroupStr == todayDayGroupStr) {
            matchDayGroupStr = "اليوم";
        } else if (matchDayGroupStr == tomorrowDayGroupStr) {
            matchDayGroupStr = "الغد";
        } else if (matchDayGroupStr == yestedayDayGroupStr) {
            matchDayGroupStr = "الأمس";
        }

        if (!matchGroupObj[matchDayGroupStr]) {

            matchGroupObj[matchDayGroupStr] = {};
            matchGroupObj[matchDayGroupStr].matchGroupName = matchDayGroupStr;
            matchGroupObj[matchDayGroupStr].matches = [];

        }
        currMatch.matchGroup = matchDayGroupStr;


        if (matchDayGroupStr == 'اليوم' || matchDayGroupStr == 'الغد' || matchDayGroupStr == 'الأمس') {
            currMatch.matchGroupDisplayName = matchDayGroupStr;
        } else {
            currMatch.matchGroupDisplayName = matchGroupDisplayWeekDay + " " + matchDateObjLocal.getDate() + " " + matchGroupDisplayMonth;
        }

        if (matchDateObjLocal.getTime() > todayDateObj.getTime() && (matchDateObjLocal.getTime() - todayDateObj.getTime()) < 1800000) {
            currMatch.matchTime = "تبدأ قريباً"
        } else {
            currMatchHours = matchDateObjLocal.getHours().toString();
            currMatchMinutes = matchDateObjLocal.getMinutes().toString();
            if (currMatchHours < 10) {
                currMatchHours = "0" + currMatchHours;
            }
            if (currMatchMinutes < 10) {
                currMatchMinutes = "0" + currMatchMinutes;
            }
            currMatch.matchTime = currMatchHours + ":" + currMatchMinutes;
        }
        matchGroupObj[matchDayGroupStr].matches.push(currMatch);
    }


    for (var prop in matchGroupObj) {
        matchGroups.push(matchGroupObj[prop].matches);
    }

    console.log(matchGroups);
    // debugger;

    var groupHtml;




    function fillMatchFromMatchGroupItem(matchGroupItem) {

        var matchesHtml = " ";


        matchGroupItem.forEach(function(match) {

             var matchStatusCentreHtml = "";

             var matchStatus = match.status;

            switch (matchStatus) {

                case 'Playing':
                    matchStatusCentreHtml += '<div class="comp_21_match_item_center live">\
                                                <div class="comp_21_match_item_center_score">\
                                                    <span><span>' + match.teamAScore + '</span></span>&nbsp;-&nbsp;<span><span>' + match.teamBScore + '</span></span>\
                                                </div>\
                                              </div>\
                                             ';
                    break;

                case 'Played':
                    matchStatusCentreHtml += '<div class="comp_21_match_item_center score"><div class="comp_21_match_item_center_score">';
                    if((match.teamAScore == match.teamBScore) && (match.winner == 'team_A')){
                        matchStatusCentreHtml += '<span><span>*</span><span>' + match.teamAScore + '</span></span>&nbsp;-&nbsp;<span><span>' + match.teamBScore + '</span></span></div></div>';
                    } else if((match.teamAScore == match.teamBScore) && (match.winner == 'team_B')){
                        matchStatusCentreHtml += '<span><span>' + match.teamAScore + '</span></span>&nbsp;-&nbsp;<span><span>' + match.teamBScore + '</span><span>*</span></span></div></div>';
                    }else{
                        matchStatusCentreHtml += '<span><span>' + match.teamAScore + '</span></span>&nbsp;-&nbsp;<span><span>' + match.teamBScore + '</span></span></div></div>';
                    }

                    break;

                case 'Fixture':
                    matchStatusCentreHtml += '<div class="comp_21_match_item_center fixture">\
                                                <div class="comp_21_match_item_center_fixture">' + match.matchTime + '</div>\
                                              </div>\
                                             ';
                    break;
                    
                case 'Postponed':
                    matchStatusCentreHtml += '<div class="spl_status comp_21_match_item_center">\
                                                <div class="comp_21_match_item_center_spl_status">تأجلت</div>\
                                              </div>\
                                             ';
                    break;

                case 'Cancelled':
                    matchStatusCentreHtml += '<div class="spl_status comp_21_match_item_center">\
                                                                    <div class="comp_21_match_item_center_spl_status">ألغيت</div>\
                                                                  </div>\
                                                                 ';
                    break;
                    
                case 'Suspended':
                    matchStatusCentreHtml += '<div class="spl_status comp_21_match_item_center">\
                                                                    <div class="comp_21_match_item_center_spl_status">توقفت</div>\
                                                                  </div>\
                                                                 ';
                    break;
            };



             matchesHtml += '<a \
                               href="/match/' + match.matchId + '-' + match.urlFriendlySuffix + ' " \
                               title="' + match.urlFriendlySuffix + '" \
                               class="comp_21_match_item">\
                                <div class="comp_21_match_item_team_1 comp_21_match_item_team">\
                                    <div class="comp_21_match_item_team_logo_cont">\
                                        <img class="comp_21_match_item_team_logo sna_default_img" src="' + imageDomain + '/web/images/team/default.png" alt="" role="presentation" />\
                                        <img class="comp_21_match_item_team_logo invisible" onload="this.style.visibility = \'visible\'" src="' + imageDomain + '/web/images/team/' + match.teamAId + '.png" alt="' + match.teamAName + '}}">\
                                    </div>\
                                    <div class="comp_21_match_item_team_name" data-ng-bind="">' + match.teamAName + '</div>\
                                </div>' + 

                                matchStatusCentreHtml 

                                + ' \
                                <div class="comp_21_match_item_team_2 comp_21_match_item_team">\
                                    <div class="comp_21_match_item_team_name" >' + match.teamBName + '</div>\
                                    <div class="comp_21_match_item_team_logo_cont">\
                                        <img class="comp_21_match_item_team_logo sna_default_img" src="' + imageDomain + '/web/images/team/default.png" alt="" role="presentation" />\
                                        <img class="comp_21_match_item_team_logo invisible" onload="this.style.visibility = \'visible\'" src="' + imageDomain + '/web/images/team/' + match.teamBId + '.png" alt="' + match.teamBName + '}}">\
                                    </div>\
                                </div>\
                            </a>';   
        });


        return matchesHtml;
    }


    var htmlForComp = '<h2 class="comp_21_group_header sna_title_1">\
                <a href="' + domain + '/sport/football/matches?utm_campaign=Facebook_Instant_Article_Featured_Match&utm_medium=social&utm_source=Facebook"  title="' + data.featuredMatchesTitle + '">\
                    <span class="sna_title_1_text" >' + data.featuredMatchesTitle + '</span>\
                </a>\
            </h2>\
            <div class="comp_21_content">\
            ';

    matchGroups.forEach(function(matchGroupItem) {

        htmlForComp +=  '<div  class="comp_21_match_group_by_date">\
                                <div class="comp_21_match_date" data-ng-bind="matchGroup[0].matchGroupDisplayName">\
                                    ' + matchGroupItem[0].matchGroupDisplayName + '\
                                </div>\
                            </div>\
                        ';

        htmlForComp += fillMatchFromMatchGroupItem(matchGroupItem);


    });

    htmlForComp += '</div>\
                    <div class="more-content">\
                        <a class="more-link" style="margin: 0;" href="/sport/football/matches" title="المزيد" >المزيد</a>\
                    </div>';



    return htmlForComp;
};



//get image url from image url formatted text
function getActualImageUrl(url) {
    url = url.replace("{width}", 400).replace("{height}", 225);
    return url;
}


// Function to render the UI into the DOM
var render = function() {
    var list = document.querySelector('.' + widgetContSelectorClass);
    if (!list) return;
    list.innerHTML = template();
};



//get data from BE
getJSON(contentApiUrl, function(responseData) {
    data = responseData;
    window.currentTime = responseData.envelope.serverTime;
    // Render the UI after getting data from BE API
    console.log("respose");
    console.log(responseData);
    render();
}, function(status) {});