// <div id="list" aria-live="polite"></div>
var widgetContSelectorClass = "article-widget-holder"
// var widgetCont = document.createElement("div");
// widgetCont.classList.add(widgetContSelectorClass);
// document.body.appendChild(widgetCont);

// var domain = "http://www.leg9.webdev.skynewsarabia.com";
var domain = "https://www.skynewsarabia.com";
// var domain = "http://10.64.161.22:8088";
// var contentApiUrl = domain + "/rest/v2/sidebar/article.json";
var contentApiUrl = domain + "/rest/v2/sidebar/article.json";
// var contentApiUrl = domain + "/instant_article_test/test_data/sidebar_data.json";

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








// UI Template
var template = function() {

    // If there are no  items
    if (data.breakingNews.length < 1) {
        return '';
    }

    // If there are
    return '<h2 class="sna_title_1 image">\
                <a href="javascript:window.open(\"/most-popular-تفضيلات-القراء\");void(0);"  title="'+ data.sidebarWidgetTitle + '">\
                    <img src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/watch_now.svg" alt="" role="presentation" />\
                    <span class="sna_title_1_text" >'+ data.sidebarWidgetTitle + '</span>\
                </a>\
            </h2>\
            <div class="article-widget-body editor-choice-widget-content">\
                <ul class="other-editor-choice">'

            + data.contentItems.slice(0, 5).map(function(item) {


                var mediaIndicatorText;
                var mediaIndicatorImgIcon;
                var contentItemUrl = "/" + item.type.toLowerCase() + "/" + item.id;
                if(item.type == 'IMAGE_GALLERY'){
                    if(item.isInfographicContent){
                        contentItemUrl = "/infographic/" + item.id;
                    }
                    mediaIndicatorImgIcon = '<img class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/photo_indication.svg">';
                    mediaIndicatorText = '<div class="content_list_media_indicator" >\
                                            <span class="content_list_media_indicator_text">'
                                                + item.imageCount +
                                            '</span>\
                                            <span class="content_list_media_indicator_svg_cont">'
                                                + mediaIndicatorImgIcon +    
                                            '</span>\
                                        </div>';


                }else if(item.type == 'VIDEO'){

                    if(item.is360Video){
                        mediaIndicatorImgIcon = '<img data-ng-if="editorChoiceStory.is360Video" class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/video_indicator_360.svg">'
                    }else{
                        mediaIndicatorImgIcon = '<img data-ng-if="editorChoiceStory.is360Video" class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/video_indication.svg">'
                    }
                    mediaIndicatorText = '<div class="content_list_media_indicator" >\
                                            <span class="content_list_media_indicator_text">'
                                                + videoDuration(item.runTime) +
                                            '</span>\
                                            <span class="content_list_media_indicator_svg_cont">'
                                                + mediaIndicatorImgIcon +
                                            '</span>\
                                        </div>'
                } else{
                    mediaIndicatorText = ''
                }              


                var watchNowItemContent;

                
                
                watchNowItemContent = '<li class="watch_now_content_item">\
                                        <a  onclick="window.open(\''+ contentItemUrl +'\', \'_blank\');void(0)" href="javascript:void(0)" title="'+  escapeDoubleAndSingleQuotes(item.headline) +'">\
                                            <div class="editor-choice-img">\
                                                <img class="img_16_9" src="https://www.skynewsarabia.com/images/'+ getActualImageUrl(item.mediaAsset.imageUrl) +'" alt="'+ escapeDoubleAndSingleQuotes(item.mediaAsset.caption) +'" />'
                                                + mediaIndicatorText + 
                                            '</div>\
                                            <div class="editor-choice-headline">\
                                                <div class="content_from_title on_content_top" >\
                                                    <span class="content_title_encloser" data-ng-bind="::editorChoiceStory.category">'
                                                        + item.category +
                                                    '</span>\
                                                </div>\
                                                <h3 class="editor-choice-headline_text">'
                                                    + item.headline + '33' +
                                                '</h3>\
                                            </div>\
                                        </a>\
                                    </li>';
                return watchNowItemContent;



            }).join('') + 


            '</div></ul>';

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

var openLinkOnClickOfContentItem = function() {
    var listItems = document.querySelectorAll('.watch_now_content_item');
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', function(e) {
            window.open("https://www.skynewsarabia.com/", "_blank");
        });
    }
}

var videoDuration = function(runtime) {
    if(runtime != undefined)
     {
         if(runtime.slice(0,2) == "00")
         {
             return runtime.slice(3,8);
         }
         else if(runtime.slice(0,2) != "00")
         {
             return runtime.slice(0,8);
         }
     }
}

getJSON(contentApiUrl, function(responseData) {
    data = responseData;
    window.currentTime = responseData.envelope.serverTime;
    // Render the UI after getting data from BE API
    console.log(responseData);
    render();
    openLinkOnClickOfContentItem();
}, function(status) {
});
