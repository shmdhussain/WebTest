// <div id="list" aria-live="polite"></div>
var widgetContSelectorClass = "sna_ia_widget_cont"
// var widgetCont = document.createElement("div");
// widgetCont.classList.add(widgetContSelectorClass);
// document.body.appendChild(widgetCont);

var domain = "http://www.leg9.webdev.skynewsarabia.com";
var contentApi = domain + "/rest/v2/sidebar/others.json";


// Data State (get from BE API)
var data;

data = {
    "envelope": {
        "copyright": "كافة العلامات التجارية الخاصة بـ SKY وكل ما تتضمنه من حقوق الملكية الفكرية هي ملك لمجموعة Sky International AG ولا تستخدم إلا بتصريح مسبق",
        "serverTime": "2019-02-04T13:25:35Z"
    },
    "breakingNewsTitle": "الأخبار العاجلة",
    "breakingNews": [
  {
    "@id": 1,
    "id": 71223,
    "message": "للحصول على آخر الأخبار العاجلة تابعوا حساب سكاي نيوز عربية العاجل على تويتر @skynewsarabia_b",
    "time": "2019-02-04T13:23+0000",
    "autoPushed": false,
    "deleted": false,
    "breaking": true,
    "linkType": "EXTERNAL",
    "infographic": false,
    "messyConfiguration": false,
    "digestNotification": false,
    "object": 1,
    "appName": "SNA_APP,WEB_APP",
    "link": "https://www.skynewsarabia.com/topic/1222568",
    "isInfographicContent": false
  },
  {
    "@id": 2,
    "id": 71222,
    "message": "للحصول على آخر الأخبار العاجلة تابعوا حساب سكاي نيوز عربية العاجل على تويتر @skynewsarabia_b",
    "time": "2019-02-04T13:21+0000",
    "autoPushed": false,
    "deleted": false,
    "breaking": true,
    "linkType": "EXTERNAL",
    "infographic": false,
    "messyConfiguration": false,
    "digestNotification": false,
    "object": 2,
    "appName": "SNA_APP,WEB_APP",
    "link": "https://www.skynewsarabia.com/program/newsroom",
    "isInfographicContent": false
  },
  {
    "@id": 3,
    "id": 71221,
    "message": "للحصول على آخر الأخبار العاجلة تابعوا حساب سكاي نيوز عربية العاجل على تويتر @skynewsarabia_b",
    "time": "2019-02-04T12:53+0000",
    "autoPushed": false,
    "deleted": false,
    "breaking": true,
    "linkType": "INTERNAL",
    "contentId": 1222320,
    "contentType": "ARTICLE",
    "infographic": false,
    "messyConfiguration": false,
    "digestNotification": false,
    "object": 3,
    "appName": "SNA_APP,WEB_APP",
    "isInfographicContent": false
  },
  {
    "@id": 4,
    "id": 71220,
    "message": "للحصول على آخر الأخبار العاجلة تابعوا حساب سكاي نيوز عربية العاجل على تويتر @skynewsarabia_b",
    "time": "2019-02-04T12:44+0000",
    "autoPushed": false,
    "deleted": false,
    "breaking": true,
    "linkType": "INTERNAL",
    "contentId": 1222320,
    "contentType": "ARTICLE",
    "infographic": false,
    "messyConfiguration": false,
    "digestNotification": false,
    "object": 4,
    "appName": "SNA_APP,WEB_APP",
    "isInfographicContent": false
  },
  {
    "@id": 5,
    "id": 71219,
    "message": "للحصول على آخر الأخبار العاجلة تابعوا حساب سكاي نيوز عربية العاجل على تويتر @skynewsarabia_b",
    "time": "2019-02-04T12:31+0000",
    "autoPushed": false,
    "deleted": false,
    "breaking": true,
    "linkType": "EXTERNAL",
    "infographic": false,
    "messyConfiguration": false,
    "digestNotification": false,
    "object": 5,
    "appName": "SNA_APP,WEB_APP",
    "link": "https://www.skynewsarabia.com/blog/1222593",
    "isInfographicContent": false
  }
]
}
window.currentTime = data.envelope.serverTime;
//process time

function getCurrentTime() {
    if (window.currentTime) {
        return window.currentTime;
    } else {
        window.currentTime = new Date();
    }
    return window.currentTime;
}

function processTime(time) {

    var current = new Date(getCurrentTime()).getTime();
    var previous = new Date(time).getTime();


    var timeDifference = {};

    var msPerMinute = 60 * 1000,
        msPerHour = msPerMinute * 60,
        month = new Array(12),
        weekday = new Array(7);
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


    var elapsed = current - previous;

    if (elapsed < 0) {
        elapsed = 1000;
    }

    var s = Math.round(elapsed / 1000),
        m = Math.round(elapsed / msPerMinute),
        h = Math.round(elapsed / msPerHour),
        pMinute = new Date(previous).getMinutes();

    /*START: Treat anything which is 23.x (x>0) will now point to absolute date,
             anything less than equal to 23.0 have relative date
             So change the ms per day to 23hours before it was 24 hours*/
    /*END: Treat anything which is 23.x (x>0) will now point to absolute date,
             anything less than equal to 23.0 have relative date
             So change the ms per day to 23hours before it was 24 hours*/

    // if elapsed time is less than 10 * 60 * 1000 minutes , show the al aan text

    if(elapsed <= 600000){
        return "now";
    }  


    if (elapsed < msPerMinute) {
        if (s >= 3 && s <= 10) {
            return ' قبل ' + s + ' ثواني ';
        } else if (s == 60) {
            return ' قبل 1 دقائق ';
        } else {
            return ' قبل ' + s + ' ثانية ';
        }
    } else if (elapsed < msPerHour) {
        if (m >= 3 && m <= 10) {
            return ' قبل ' + m + ' دقائق ';
        } else if (m == 60) {
            return ' قبل 1 ساعة ';
        } else {
            return ' قبل ' + m + ' دقيقة ';
        }
    } else if (h < 24) {
        if (h >= 3 && h <= 10) {
            return ' قبل ' + h + ' ساعات ';
        } else {
            return ' قبل ' + h + ' ساعة ';
        }
    } else {
        if (pMinute < 10) {
            pMinute = '0' + pMinute;
        }
        var min_passed  = new Date(previous).getMinutes() < 10 ? '0' + new Date(previous).getMinutes() : new Date(previous).getMinutes();
        var hours_passed  = new Date(previous).getHours() < 10 ? '0' + new Date(previous).getHours() : new Date(previous).getHours();
        return weekday[new Date(previous).getDay()] + ' ' + new Date(previous).getDate() +
            ' ' + month[new Date(previous).getMonth()] + ' ' + new Date(previous).getFullYear() + ' - ' + hours_passed + ':' + min_passed + ' بتوقيت أبوظبي';
    }
}


// UI Template
var template = function() {

    // If there are no  items
    if (data.breakingNews.length < 1) {
        return '';
    }

    // If there are
    return '<h2 class="sna_title_1 breaking">\
                <span class="sna_title_1_text" >' + data.breakingNewsTitle + '</span>\
            </h2><div class="breaking_news_cont">' 

            + data.breakingNews.map(function(item) {

                item = preProcessDataItem(item);

                var dateStrNotNow = '<div class="breaking_news_list_item_date">\
                                        <div class="breaking_news_list_item_date_content">\
                                            <i class="content_list_item_date_icon">l</i>\
                                            <span>'
                                                + item.formattedTime +
                                            '</span>\
                                        </div>\
                                    </div>';

                var dateStrNow = '<div class="breaking_news_list_item_date"\
                                    <div class="breaking_news_list_item_date_content now">\
                                        <span>الآن</span>\
                                    </div>\
                                </div>';
                var dateStr;
                
                if(item.dateNow){
                    dateStr = dateStrNow;
                }else{
                    dateStr = dateStrNotNow;
                }               


                var breakingNewsItemContent;

                
                if(item.link){
                    breakingNewsItemContent = '<a href="' + item.link + '" title="' + item.message + 'cds "'+
                                                'class="breaking_news_list_item_message breaking_news_list_item_link">'+
                                                    '<div class="breaking_message" data-ng-bind="::breakingItem.message">'+
                                                    	item.message
                                                    '</div>'+
                                                    '<div class="breaking_news_list_item_message_link_wrap">'+
                                                        '<span class="breaking_news_list_item_message_link">'+
                                                            'المزيد'+
                                                        '</span>'+
                                                    '</div>'+
                                                '</a>';
                }else{
                    breakingNewsItemContent = '<div class="breaking_news_list_item_message">'+ item.message +'</div>';
                }





                return '<div class="breaking_news_list_item">'
                         + dateStr + ' '
                         + breakingNewsItemContent +
                        '</div>';



            }).join('') + 


            '</div><div class="more-content">\
                <a href="/breaking-news-الأخبار-العاجلة" class="more-link"\
                        title="المزيد " style="margin: 0;">\
                    المزيد\
                </a>\
            </div>';

};

//Function to data item pre process
preProcessDataItem = function(item) {
    var currentTime = new Date().getTime();

    var breakingItem = item;
    if (breakingItem.linkType == "INTERNAL" && breakingItem.contentType && breakingItem.contentId) {
        breakingItem.link = "/" + breakingItem.contentType.toLowerCase().replace("-", "_") + "/" + breakingItem.contentId;
        if (breakingItem.isInfographicContent) {
                breakingItem.link = breakingItem.link.replace("/image_gallery/", "/infographic/");
        }
    } else if (breakingItem.linkType == "EXTERNAL") {

    }
    var breakingDate = new Date(breakingItem.time);
    var timeDiff = currentTime - breakingDate.getTime();
    if (timeDiff < 600000) {
        breakingItem.dateNow = "الآن";
    }
    // debugger;
    breakingItem.formattedTime = processTime(breakingItem.time);
    return item;
}


// Function to render the UI into the DOM
var render = function() {
    var list = document.querySelector('.' + widgetContSelectorClass);
    if (!list) return;
    list.innerHTML = template();
};

// Render the UI after getting data from BE API
render();

