/**
 * Initialisation script for the Players.
 *
 * @author Simon Hailes
 * @version 1.0
 * @copyright Screen Systems 2015
 */

window.onload = function () {


      // control variables

      var VideoSrc = 'http://stream.skynewsarabia.com/live/snahls.m3u8';

      // set to your Image subtitle .csf source
      var CSFSrc = 'http://stream.skynewsarabia.com/subtitles/subtitles.csf';

      // if using JWPlayer6, put your ID here, e.g. playerNdrregKgdkldgd, else commment out
      screenSystems.jwplayerid = 'playerVufatcvEHEhV';

      // if using JWPlayer7, put key here, else commment out
      screenSystems.jwplayerkey = "wdkjWWr4ySkY3+6zBHuLhVo8CgjEJHgQqulSFQ==";

      // true or false to control subtitles overall.  They are already controlled by the 
      // 'captions' button in the player
      screenSystems.SubtitlesEnable = true;

      // true or false to control showing of image based subtitles
      // image based subtitles work in all (modern) players/devices, and in flash.
      screenSystems.UseCSF = true;

      // true or false to control autoplay (except in apply devices).
      screenSystems.AutoPlay = true;

      // set to true to force flash based player to be used. may cause a problem for Android.
      screenSystems.forceFlash = false;
      screenSystems.UseRand = false;
      // comment out for console logs from CSF
      screenSystems.logger = function (type, message) {};

      try {
        hasFlash = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
      } catch(exception) {
        hasFlash = ('undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash']);
      }

      if (!hasFlash)
        screenSystems.forceFlash = false;

      // set to 16:9 for 16:9 video.. only used by JW
      screenSystems.jwaspectratio = '16:9';

      // div to put video inside of.
      screenSystems.videodiv = document.getElementById('videodiv');

      // the body element
      screenSystems.body = document.getElementById('body');

      // load the video.....
      screenSystems.Start( VideoSrc, CSFSrc );

      screenSystems.FullScreenVideoDiv = false;

            var videoElem = document.querySelectorAll("#videodiv video");

            /*START: Custom Control For Video*/
            var controlIsShown = false;
            var inFullScreen = false;
            var audioMuted = false;
            var isPaused = false;
            var isIOS =  /iPad|iPhone|iPod/gi.test(navigator.userAgent) && !window.MSStream ;
            var customCtrl = false;
        	var ua = navigator.userAgent.toLowerCase();
        	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

			var isdesktop = (!isIOS & !isAndroid );
      
            if (videoElem.length > 0 
				//&& !isIOS 
				&& customCtrl){

              videoElem = videoElem[0];
              turnOffControls();
              

              if(isdesktop) {
                  var controlBarHtml = 
					'<div id="controlForLiveStream">'+ 
						'<span class="playCtrl pause"></span> '+
						'<span class="liveText">Live broadcast</span>'+
						'<span class="fullScreenCtrl"></span>'+
						'<span class="volumeCtrl noMute"></span>'+
						'<span class="subtitleCtrl off"></span>'+
					'<div>'; 
                  var playIcon = '<div id="playIconBigLiveCont"> <div id="playIconBigLive"> </div> </div>'; 
                  $("#videodiv").append(controlBarHtml);
                  $("#videodiv").append(playIcon);
                  $("#videodiv").hover(
                  function() {
                    if(!controlIsShown){
                      $("#controlForLiveStream").show();
                      controlIsShown = !controlIsShown;
                    }

                  }, function() {
                    if(controlIsShown){
                      $("#controlForLiveStream").hide();
                      controlIsShown = !controlIsShown;
                    }
                  }
                );
                  $(videoElem).click(function(event) {
                    if(videoElem.paused){
                      $("#playIconBigLiveCont").hide();
                      videoElem.muted = false;
                      videoElem.play();
                    }else{
                       videoElem.pause();
                       $("#playIconBigLiveCont").show();
                       videoElem.muted = true;
                    }
                    $(".playCtrl").toggleClass("play pause");
                    isPaused = !isPaused;
                });  

              } else{
                var controlBarHtml = 
					'<div id="controlForLiveStream">'+
						'<span class="playCtrl play"></span>'+ 
						'<span class="liveText">Live broadcast</span>'+
						'<span class="fullScreenCtrl"></span>'+
						'<span class="volumeCtrl noMute"></span>'+ 
						'<span class="subtitleCtrl off"></span>'+
					'<div> '; 
                var playIcon = '<div id="playIconBigLiveCont"> <div id="playIconBigLive"> </div> </div>'; 
                $("#videodiv").append(controlBarHtml);
                $("#videodiv").append(playIcon); 

                setTimeout(function(){
                    videoElem.muted = true;//special cond to disable autoplay false for mobile
                    videoElem.pause(); //special cond to disable autoplay false for mobile
                    $("#playIconBigLiveCont").show();//special cond to disable autoplay false for mobile
                }, 2000);
                
                
                var mobileTabletCtrlVisible = false;
                var timerVideoCtrlForMobileTablet;
                $(videoElem).click(function(event) {
                    clearTimeout(timerVideoCtrlForMobileTablet);
                    $("#controlForLiveStream").show();
                    timerVideoCtrlForMobileTablet = setTimeout(function(){
                      $("#controlForLiveStream").hide();
                    }, 4000);
                }); 
               

              }

              $("#playIconBigLiveCont").click(function(event) {
                    if(videoElem.paused){
                      $("#playIconBigLiveCont").hide();
                      if(audioMuted){
                        videoElem.muted = true;
                      }else{
                        videoElem.muted = false;
                      }
                      videoElem.play();
                    }
                    $(".playCtrl").toggleClass("play pause");
                    isPaused = !isPaused;
              });  

              $( videoElem).on( "play playing", function() {
                console.log( "capture vd vd vd");
                if(isPaused){
                  videoElem.pause();
                  $(".playCtrl").removeClass('pause');
                  $(".playCtrl").addClass('play');
                  $("#playIconBigLiveCont").show();
                  console.log( "vd vd vd paused");
                }else{
                  $(".playCtrl").removeClass("play");
                  $(".playCtrl").addClass("pause");
                  $("#playIconBigLiveCont").hide();
                  if(audioMuted){
                    videoElem.muted = true;
                  }else{
                    videoElem.muted = false;
                  }
                  console.log( "vd vd vd playing");
                }
                
              });

              $('.playCtrl').click(function(event) {
                  if(videoElem.paused){
                    $("#playIconBigLiveCont").hide();
                    videoElem.muted = false;
                    videoElem.play();
                  }else{
                     $("#playIconBigLiveCont").show();
                     videoElem.muted = true;
                     videoElem.pause();
                  }
                  $(this).toggleClass("play pause");
                  isPaused = !isPaused;
                  
              });

              $('.volumeCtrl').click(function(event) {

                  if(audioMuted){
                    audioMuted = false;
                    $(this).removeClass("mute");
                    $(this).addClass("noMute");
                    if(!isPaused){
                      videoElem.muted = false;
                    }
                  }else{
                    audioMuted = true;
                    $(this).removeClass("noMute");
                    $(this).addClass("mute");
                    if(!isPaused){
                      videoElem.muted = true;
                    }
                  }
                  
              });

              $('.subtitleCtrl').click(function(event) {
                  screenSystems.SubtitlesEnable = !screenSystems.SubtitlesEnable;
				  if (!screenSystems.SubtitlesEnable) {
					screenSystems.renderer( null );
					}

                  $(this).toggleClass("on off");
              });

              $('.fullScreenCtrl').click(function(event) {
                  if (screenSystems.triggerFullscreen && !inFullScreen){
                    screenSystems.triggerFullscreen();
                  }
                  if (screenSystems.leaveHTML5Fullscreen && inFullScreen){
                    screenSystems.leaveHTML5Fullscreen();
                  }

                  inFullScreen = !inFullScreen;
              });
               
            }


            function turnOffControls() {
              if (videoElem.hasAttribute("controls")) {
                 videoElem.removeAttribute("controls")   
              } 
            }
            /*END: Custom Control For Video*/








      ontext = function(text){
          var t = document.getElementById('textoutput');
          t.textContent = text;
        }
      

      ///////////////////////
      // functions called by buttons on the webpage...
      //
      toggleUseCSF = function(){
          screenSystems.UseCSF = !screenSystems.UseCSF; 
          UseCSF.textContent = screenSystems.UseCSF? 'Turn Off Images':'Turn On Images';
          screenSystems.Redraw = true;
          if (screenSystems.UseCSF)
            screenSystems.SubtitlesEnable = screenSystems.UseCSF;
        }

      UseCSF.textContent = screenSystems.UseCSF? 'Turn Off Images':'Turn On Images';

      FullScreen = function(){
          if (screenSystems.triggerFullscreen){
            screenSystems.triggerFullscreen();
          }
        }

};

