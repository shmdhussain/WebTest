var widgetContSelectorClass = "article-widget-holder"
var domain = window.domain || "https://www.skynewsarabia.com";
var contentApiUrl = domain + "/rest/v2/sidebar/article.json?defaultSectionId=" + window.defaultSectionId;
var getJSON = function(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() { var status; var data; if (xhr.readyState == 4) { status = xhr.status; if (status == 200) { successHandler && successHandler(xhr.response); } else { errorHandler && errorHandler(status); } } };
    xhr.send();
};
var data;
var escapeDoubleAndSingleQuotes = function(str) { return str.replace(/\\([\s\S])|(["])/g, "$1&quot;"); };
var template = function() {
    if (data.contentItems.length < 1) { return ''; }
    var moreBtnLink = '';
    if (data.realtimeDataAvailable) { moreBtnLink = domain + '/most-popular-تفضيلات-القراء?utm_campaign=Facebook_Instant_Article_Watching_Now&utm_medium=social&utm_source=Facebook' } else { moreBtnLink = domain + '/latest-news-آخر-الأخبار?utm_campaign=Facebook_Instant_Article_Latest_News&utm_medium=social&utm_source=Facebook' }
    return '<h2 class="sna_title_1 image">\
                <a target="_blank" rel="facebook" href="' + moreBtnLink + '"  title="' + data.sidebarWidgetTitle + '">\
                    <img src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/watch_now.svg" alt="" role="presentation" />\
                    <span class="sna_title_1_text" >' + data.sidebarWidgetTitle + '</span>\
                </a>\
            </h2>\
            <div class="article-widget-body editor-choice-widget-content">\
                <ul class="other-editor-choice">' +
        data.contentItems.slice(0, 5).map(function(item) {
            var mediaIndicatorText;
            var mediaIndicatorImgIcon;
            var contentItemUrl = domain + "/" + item.type.toLowerCase() + "/" + item.id + '?utm_campaign=Facebook_Instant_Article_Watching_Now&utm_medium=social&utm_source=Facebook';
            if (item.type == 'IMAGE_GALLERY') {
                if (item.isInfographicContent) { contentItemUrl = domain + "/infographic/" + item.id + '?utm_campaign=Facebook_Instant_Article_Watching_Now&utm_medium=social&utm_source=Facebook';; }
                mediaIndicatorImgIcon = '<img class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/photo_indication.svg">';
                mediaIndicatorText = '<div class="content_list_media_indicator" >\
                                            <span class="content_list_media_indicator_text">' +
                    item.imageCount +
                    '</span>\
                                            <span class="content_list_media_indicator_svg_cont">' +
                    mediaIndicatorImgIcon +
                    '</span>\
                                        </div>';
            } else if (item.type == 'VIDEO') {
                if (item.is360Video) { mediaIndicatorImgIcon = '<img class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/video_indicator_360.svg">' } else { mediaIndicatorImgIcon = '<img class="content_list_media_indicator_svg" alt="" role="presentation" src="https://www.skynewsarabia.com/static/web-rev/assets/img/svg-icons/media_indicator/video_indication.svg">' }
                mediaIndicatorText = '<div class="content_list_media_indicator" >\
                                            <span class="content_list_media_indicator_text">' +
                    videoDuration(item.runTime) +
                    '</span>\
                                            <span class="content_list_media_indicator_svg_cont">' +
                    mediaIndicatorImgIcon +
                    '</span>\
                                        </div>'
            } else if (item.type == 'LIVE_STORY') {
                contentItemUrl = domain + "/live-story/" + item.id + '?utm_campaign=Facebook_Instant_Article_Watching_Now&utm_medium=social&utm_source=Facebook';
                mediaIndicatorText = ''
            } else { mediaIndicatorText = '' }
            var watchNowItemContent;
            watchNowItemContent = '<li class="watch_now_content_item">\
                                        <a target="_blank" rel="facebook" href="' + contentItemUrl + '" title="' + escapeDoubleAndSingleQuotes(item.headline) + '">\
                                            <div class="editor-choice-img">\
                                                <img class="img_16_9" src="' + domain + '/images/' + getActualImageUrl(item.mediaAsset.imageUrl) + '" alt="' + escapeDoubleAndSingleQuotes(item.mediaAsset.caption) + '" />' +
                mediaIndicatorText +
                '</div>\
                                            <div class="editor-choice-headline">\
                                                <div class="content_from_title on_content_top' + (item.type == 'LIVE_STORY' ? ' live_story' : '') + '" >\
                                                    <span class="content_title_encloser">' +
                item.category +
                '</span>\
                                                </div>\
                                                <h3 class="editor-choice-headline_text">' +
                item.headline +
                '</h3>\
                                            </div>\
                                        </a>\
                                    </li>';
            return watchNowItemContent;
        }).join('') +
        '</div></ul>';
};

function getActualImageUrl(url) { url = url.replace("{width}", 400).replace("{height}", 225); return url; }
var render = function() {
    var list = document.querySelector('.' + widgetContSelectorClass);
    if (!list) return;
    list.innerHTML = template();
};
var videoDuration = function(runtime) {
    if (runtime != undefined) {
        if (runtime.slice(0, 2) == "00") { return runtime.slice(3, 8); } else if (runtime.slice(0, 2) != "00") { return runtime.slice(0, 8); }
    }
}
getJSON(contentApiUrl, function(responseData) {
    data = responseData;
    window.currentTime = responseData.envelope.serverTime;
    console.log(responseData);
    render();
}, function(status) {});