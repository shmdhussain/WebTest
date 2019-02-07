// <div id="list" aria-live="polite"></div>
var widgetContSelectorClass = "article-widget-holder"
// var widgetCont = document.createElement("div");
// widgetCont.classList.add(widgetContSelectorClass);
// document.body.appendChild(widgetCont);

// var domain = "http://www.leg9.webdev.skynewsarabia.com";
var domain = "https://www.skynewsarabia.com";
// var contentApiUrl = domain + "/rest/v2/sidebar/article.json";
var contentApiUrl = "/rest/v2/sidebar/article.json";

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

var escapeDoubleAndSingleQuotes = function (str) {
    return str.replace(/\\([\s\S])|(["])/g,"$1&quot;"); // thanks @slevithan!
};

// Data State (get from BE API)





//process time
var getCurrentTime = function() {
    if (window.currentTime) {
        return window.currentTime;
    } else {
        window.currentTime = new Date();
    }
    return window.currentTime;
}

var processTime = function (time) {

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
                                        <div dir="rtl" lang="ar" class="breaking_news_list_item_date_content">\
                                            <i dir="rtl" lang="ar" class="content_list_item_date_icon">l</i>\
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
                    breakingNewsItemContent = '<a href="' + escapeDoubleAndSingleQuotes(item.link) + '" title="' + escapeDoubleAndSingleQuotes(item.message) + 'cds "'+
                                                'class="breaking_news_list_item_message breaking_news_list_item_link">'+
                                                    '<div class="breaking_message">'+
                                                        escapeDoubleAndSingleQuotes(item.message) +
                                                    '</div>'+
                                                    '<div class="breaking_news_list_item_message_link_wrap">'+
                                                        '<span class="breaking_news_list_item_message_link">'+
                                                            'المزيد'+
                                                        '</span>'+
                                                    '</div>'+
                                                '</a>';
                }else{
                    breakingNewsItemContent = '<div class="breaking_news_list_item_message">'+ escapeDoubleAndSingleQuotes(item.message) +'</div>';
                }




                // console.log(`<div class="breaking_news_list_item">
                //           ${dateStr}
                //           ${breakingNewsItemContent} 
                //         </div>`);    
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


getJSON(contentApiUrl, function(responseData) {
    data = responseData;
    window.currentTime = responseData.envelope.serverTime;
    // Render the UI after getting data from BE API
    console.log(responseData);
    render();
}, function(status) {
});
