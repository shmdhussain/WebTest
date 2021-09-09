function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// var launchEvent = "webOSLaunch";
var launchEvent = "load";
var dataUrl = "/rest/info.json";
window.addEventListener(
  launchEvent,
  function (inData) {
    // setTimeout(() => {
    // window.screen.show();
    ga("send", "event", "app_start", "app_start");
    initPage(dataUrl);
    console.log("dom content load event");
    // }, 7000);
  },
  true
);

window.player;
function liveStreamClicked() {
  console.log("clicked the player in ls");
  $(".page_content").addClass("hide");
  $(".video_full").removeClass("visibility_hidden");

  window.player.play();
  removeEventForRemotePlayBtnWhenNoPlayerOpened();
  addEventsOnPlayerOpen();
  window.addEventListener("popstate", fullscreenPopStateCallbackfn);
  history.pushState({ fullScreen: true, in: true }, "fullscreen");
}
function fullscreenPopStateCallbackfn(event) {
  console.log("this is pop state");
  console.log(event);
  console.log("go out from full screen");

  if (window.player.getState() === "playing" || window.player.getState() === "buffering") {
    window.player.pause();
  }
  $(".page_content").removeClass("hide");
  $(".video_full").addClass("visibility_hidden");

  document.removeEventListener("keydown", keyHandleOnPlayer);
  window.removeEventListener("popstate", fullscreenPopStateCallbackfn);
  addEventForRemotePlayBtnWhenNoPlayerOpened();
  SpatialNavigation.focus("main_content");
}

function addEventsOnPlayerOpen() {
  document.addEventListener("keydown", keyHandleOnPlayer);
}

var totalTimeSinceLastClickedArrowBtns = 0;
var timerIdClickedArrowBtns;
function keyHandleOnPlayer(inEvent) {
  if (inEvent.keyCode === 37 || inEvent.keyCode === 38 || inEvent.keyCode === 39 || inEvent.keyCode === 40) {
  }
  if (inEvent.keyCode === 415) {
    window.player.play();
  } else if (inEvent.keyCode === 19) {
    window.player.pause();
  } else if (inEvent.keyCode === 27) {
    window.history.go(-1);
  } else if (inEvent.keyCode === 10009) {
    window.history.go(-1);
  } else if (inEvent.keyCode === 413) {
    window.history.go(-1);
  } else if (inEvent.keyCode === 10252) {
    if (window.player.getState() === "playing") {
      window.player.pause();
    } else if (window.player.getState() === "paused") {
      window.player.play();
    }
  } else if (
    inEvent.keyCode === 13 &&
    (!$("#video_full_player").hasClass("jw-flag-user-inactive") || window.player.getState() === "paused")
  ) {
    if (window.player.getState() === "playing") {
      window.player.pause();
    } else if (window.player.getState() === "paused") {
      window.player.play();
    }
  } else if (
    inEvent.keyCode === 37 ||
    inEvent.keyCode === 38 ||
    inEvent.keyCode === 39 ||
    inEvent.keyCode === 40 ||
    inEvent.keyCode === 13
  ) {
    var event = new Event("mousemove"); // (*)
    $("#video_full_player")[0].dispatchEvent(event);
    timerIdClickedArrowBtns = setTimeout(arrowClickExtendTimer, 1500);
  }
}

function arrowClickExtendTimer() {
  if (!$("#video_full_player").hasClass("jw-flag-user-inactive") && jwplayer().getState() !== "paused") {
    totalTimeSinceLastClickedArrowBtns += 1500;
    if (totalTimeSinceLastClickedArrowBtns >= 6000) {
      clearTimeout(timerIdClickedArrowBtns);
      totalTimeSinceLastClickedArrowBtns = 0;
      return;
    }
    var event = new Event("mousemove"); // (*)
    $("#video_full_player")[0].dispatchEvent(event);
    timerIdClickedArrowBtns = setTimeout(arrowClickExtendTimer, 1500);
  } else {
    clearTimeout(timerIdClickedArrowBtns);
    totalTimeSinceLastClickedArrowBtns = 0;
  }
}
var domain = "https://www.skynewsarabia.com";
function initPage(dataUrl) {
  var ottLiveStreamImage, ottPromotionText, liveStreamUrl;

  // liveStreamUrl = _.get(data, "live_stream.live_stream_url[0].url", null);
  //   liveStreamUrl = "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8";
  ottPromotionText = "promo text";
  ottLiveStreamImage = "https://www.skynewsarabia.com/images//v1/2019/05/07/1250200/1024/576/1-1250200.png";

  // liveStreamUrl = "https://stream.skynewsarabia.com/ott/ott.m3u8";
  liveStreamUrl = "https://stream.skynewsarabia.com/hls/sna.m3u8";
  // liveStreamUrl = "https://media.skynewsarabia.com/vod/1335345/1335345_480.mp4";
  //   debugger;

  if (!liveStreamUrl) {
    errorInFetchingData();
    return;
  }

  setupPlayer({
    livestreamUrl: liveStreamUrl,
    livestreamImage: ottLiveStreamImage,
    livestreamPromoText: ottPromotionText,
  });

  if (ottLiveStreamImage) {
    $(".ls_player_inner_cont_img").prop("src", ottLiveStreamImage);
  }
  $(".ls_player_outer_cont").data("video-url", liveStreamUrl);

  $(".ls_player_outer_cont").removeClass("visibility_hidden");

  if (ottPromotionText) {
    $(".ls_title").html(ottPromotionText);
    $(".ls_title").removeClass("visibility_hidden");
  }
}

function errorInFetchingData() {
  $("body").addClass("show_full_error");
  $(".ls_title").addClass("hide");
  $(".ls_player_outer_cont").addClass("hide");
  $(".ls_error_cont").removeClass("hide");
}

function bindEventHandlerForPage() {
  // Initialize
  SpatialNavigation.init();

  // Define navigable elements (anchors and elements with "focusable" class).
  SpatialNavigation.add("main_content", {
    selector: ".page_content .focusable",
  });

  // Make the *currently existing* navigable elements focusable.
  SpatialNavigation.makeFocusable("main_content");

  // Focus the first navigable element.
  SpatialNavigation.focus("main_content");
  // tizen.tvinputdevice.registerKeyBatch(["MediaPlay", "MediaPause"]);
  $(".ls_player_outer_cont").on("click", function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    liveStreamClicked();
  });

  addEventForRemotePlayBtnWhenNoPlayerOpened();
}

function addEventForRemotePlayBtnWhenNoPlayerOpened() {
  document.addEventListener("keydown", keysHandlerWhenPlayerIsClosed);
  $(".ls_player_outer_cont.focusable").on("sn:enter-down.enterBtnWhenPlayerIsClosed", function (event) {
    liveStreamClicked();
  });
  $(document).on("click.clickOutsideClickableArea", function (e) {
    if ($(e.target).parents(".focusable").length === 0 || !$(e.target).hasClass("focusable")) {
      console.log("clicked outside");
      SpatialNavigation.focus("main_content");
    }
  });
}

function keysHandlerWhenPlayerIsClosed(event) {
  if (event.keyCode === 10009) {
    showExitConfirmationPopup();
    event.stopImmediatePropagation();
  } else if (event.keyCode === 415) {
    liveStreamClicked();
  } else if (event.keyCode === 10252) {
    if (window.player.getState() !== "playing") {
      liveStreamClicked();
    }
  }
}
function removeEventForRemotePlayBtnWhenNoPlayerOpened() {
  $(".ls_player_outer_cont.focusable").off(".enterBtnWhenPlayerIsClosed");
  $(document).off("click.clickOutsideClickableArea");
  document.removeEventListener("keydown", keysHandlerWhenPlayerIsClosed);
}

function setupPlayer(videoConfigFromServer) {
  var setup = {
    primary: "html5",
    autostart: false,
    repeat: false,
    mute: false,
    width: "100%",
    height: "100%",
    stretching: "uniform",
    localization: {
      nextUp: " التالي",
    },
    hlshtml: true,
    skin: {
      url: "css/jw-skin-sna.css",
      name: "seven sna",
    },
    ga: {
      label: "title",
    },
    intl: {
      ar: {
        auto: "Auto",
        errors: {
          cantPlayVideo: "هذا الفيديو غير متاح في الوقت الحالي. يرجى المحاولة لاحقاً",
        },
      },
    },
    playlist: [
      {
        title: videoConfigFromServer.livestreamPromoText || "البث المباشر | سكاي نيوز عربية",
        sources: [
          {
            // file: "https://media.skynewsarabia.com/vod/smil:1335345.smil/1335345.m3u8",
            file: videoConfigFromServer.livestreamUrl,
          },
        ],
        image: "img/trans-image.png",
        section: "LIVE-STREAM",
        author: "Sky News Arabia",
        tags: "البث المباشر",
        mediaid: "UdwAPpvV",
        width: 720,
        height: 1280,
      },
    ],
  };
  // Setup the player
  window.player = jwplayer("video_full_player").setup(setup);

  window.player.on("ready", function () {
    window.player.play();
    bindEventHandlerForPage();
    window.player.on("pause", function () {
      //   gtag("event", "pause", {
      //     event_category: "LIVE_STREAM",
      //   });
      ga("send", "event", "LIVE_STREAM", "pause");
    });
    window.player.on("play", function () {
      console.log("sending play event");
      //   console.log(gtag);
      //   gtag("event", "play", {
      //     event_category: "LIVE_STREAM",
      //   });
      ga("send", "event", "LIVE_STREAM", "play");
    });
  });
}

/*START: exit confirmation popup*/

function showExitConfirmationPopup() {
  console.log("clicked the player in ls");
  // $(".page_content").addClass("hide");
  $(".popup_container").removeClass("hide");
  removeEventForRemotePlayBtnWhenNoPlayerOpened();
  addEventsOnExitConfirmPopupOpen();
  window.addEventListener("popstate", exitConfirmPopStateCallbackfn);
  history.pushState({ confirmPopupOpened: true }, "confirmPopup");
  SpatialNavigation.disable("main_content");
  if (!$(".exit_confirm_popup").hasClass("focus_init_done")) {
    $(".exit_confirm_popup").addClass("focus_init_done");
    SpatialNavigation.add("confirm_exit_popup", {
      selector: ".exit_confirm_popup .focusable",
    });
  }
  SpatialNavigation.enable("confirm_exit_popup");
  SpatialNavigation.makeFocusable("confirm_exit_popup");
  SpatialNavigation.focus("confirm_exit_popup");
  SpatialNavigation.focus(".popup_primary_btn.focusable");
}

function addEventsOnExitConfirmPopupOpen() {
  document.addEventListener("keydown", backBtnHandlerWhenExitConfirmPopupOpen);

  $(".popup_overlay").on("click.exitConfirmPopupOpen", function () {
    window.history.go(-1);
  });
  $(".exit_confirm_popup .popup_primary_btn").on("sn:enter-down.exitConfirmPopupOpen", function () {
    exitApplication();
  });
  $(".exit_confirm_popup .popup_primary_btn").on("click.exitConfirmPopupOpen", function () {
    exitApplication();
  });

  $(".exit_confirm_popup .popup_secondary_btn").on("sn:enter-down.exitConfirmPopupOpen", function () {
    window.history.go(-1);
  });
  $(".exit_confirm_popup .popup_secondary_btn").on("click.exitConfirmPopupOpen", function () {
    window.history.go(-1);
  });
}

function backBtnHandlerWhenExitConfirmPopupOpen(event) {
  if (event.keyCode === 10009) {
    window.history.go(-1);
  }
}
function exitApplication() {
  // tizen.application.getCurrentApplication().exit();
}
function removeEventsOnExitConfirmPopupOpen() {
  $(document).off(".exitConfirmPopupOpen");
  document.removeEventListener("keydown", backBtnHandlerWhenExitConfirmPopupOpen);
  $(".popup_overlay").off(".exitConfirmPopupOpen");
  $(".exit_confirm_popup .popup_secondary_btn").off(".exitConfirmPopupOpen");
  $(".exit_confirm_popup .popup_primary_btn").off(".exitConfirmPopupOpen");
}

function exitConfirmPopStateCallbackfn() {
  $(".page_content").removeClass("hide");
  $(".popup_container").addClass("hide");
  window.removeEventListener("popstate", exitConfirmPopStateCallbackfn);
  removeEventsOnExitConfirmPopupOpen();
  addEventForRemotePlayBtnWhenNoPlayerOpened();
  SpatialNavigation.disable("confirm_exit_popup");
  SpatialNavigation.enable("main_content");
  SpatialNavigation.focus("main_content");
}
/*END: exit confirmation popup*/
