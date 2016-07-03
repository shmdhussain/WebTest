/**
 * Player adaptation to work with HTML5 (PC and Android)
 * and iOS.
 *
 * @author Simon Hailes
 * @version 1.0
 * @copyright Screen Systems 2016
 */

if (screenSystems === undefined) {
    /**
     * Namespace for all Screen Systems libraries.
     * @namespace
     */
    var screenSystems = {};
}

screenSystems.version = "1.0.0.12";
screenSystems.versiondate = "2016-04-08";

screenSystems.iOS = {};
screenSystems.hls = {};
screenSystems.jw = {};


//////////////////////////////////////////////////
// call function to start video and subs.
// note that AutoPlay will not work in iOS
screenSystems.Start = function( videosrc, subtitlesrc ) {

  screenSystems.isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0; 
  screenSystems.isSafari = /Safari/i.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor); 

  screenSystems.on_iOS = /iPad|iPhone|iPod/.test(navigator.platform);

  if (screenSystems.isMac && screenSystems.isSafari) 
    // Do Something for Mac Safari
	screenSystems.on_iOS = true;
  
  screenSystems.subtitleSource = subtitlesrc;
  screenSystems.videoSource = videosrc;

  screenSystems.Redraw = 'false';
  screenSystems.setupPosn();

  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "start";



  if (typeof screenSystems.forceFlash === 'undefined'){
    screenSystems.forceFlash = false;
  }

  screenSystems.Private.Init();


  // startup ONE of the player modes.
  do {
    if(screenSystems.on_iOS) {
      // is on iOS
      screenSystems.iOS.init();
      break;
    }

    if(Hls.isSupported() && !screenSystems.forceFlash ) {
      screenSystems.hls.init();
      break;
    }

    
    // browser too old; Flash?
    if (screenSystems.jw) {
      screenSystems.jw.init();
	  screenSystems.subtitle_zIndex = 40;
      break;
    }

    if (screenSystems.flowflashls) {
      screenSystems.flowflashls.init();
      break;
    }  

    break;
  } while (0);


  if (screenSystems.logger) {
    screenSystems.subtitler = new screenSystems.CSFSubtitler(screenSystems.timesource, screenSystems.renderer, screenSystems.logger);    
  } else {
    screenSystems.subtitler = new screenSystems.CSFSubtitler(screenSystems.timesource, screenSystems.renderer);    
  }

  screenSystems.subtitler.subtitleSource = subtitlesrc;

  if (screenSystems.logshorttext) screenSystems.logshorttext("CtreatedCSFSubtitler");

  document.onwebkitfullscreenchange = screenSystems.FullScreenChange;
  document.onmozfullscreenchange = screenSystems.FullScreenChange;
  document.onfullscreenchange = screenSystems.FullScreenChange;
  window.onresize = screenSystems.FullScreenChange;


  if (screenSystems.logshorttext) screenSystems.logshorttext("CtreatedCSFSubtitler");


};


//////////////////////////////////////////////////
//
// HLS.JS specific
//
screenSystems.hls.init = function( ) {

  screenSystems.timesource = screenSystems.hls.timesource;

  screenSystems.video = document.createElement('video');
  screenSystems.video.style.width = "100%"; 
  screenSystems.video.style.height = "auto"; 


  if (screenSystems.Private.UseBodyRender === true){
    screenSystems.renderer = screenSystems.bodyrenderer_0;
    screenSystems.player = screenSystems.video;
  } else {
    screenSystems.renderer = screenSystems.Private.renderer0;
  }

  screenSystems.video.controls = true;
  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.video.style.maxHeight = screenSystems.videodiv.style.maxHeight;
  screenSystems.video.style.minWidth = "100%"

  screenSystems.videodiv.appendChild(screenSystems.video);
  screenSystems.video.onwebkitfullscreenchange = function(){ screenSystems.Redraw = true; };

  screenSystems.Private.InitVideo( screenSystems.video, "Arabic", "ar" );

  var config = {};
  //config.debug = true;

  // keep subs offscreen until we've played the first time.
  screenSystems.PauseSubs = true;

  screenSystems.hls.hls_js = new Hls(config);
  if (screenSystems.hookVideo) {
    screenSystems.hookVideo(screenSystems.video, screenSystems.hls.hls_js);
  }

  screenSystems.hls.hls_js.loadSource(screenSystems.videoSource);
  screenSystems.hls.hls_js.attachMedia(screenSystems.video);

  screenSystems.hls.hls_js.on(Hls.Events.MEDIA_ATTACHED,function() {
        console.log("video and hls.js are now bound together !");
        screenSystems.hls.hls_js.loadSource(screenSystems.videoSource);
        screenSystems.hls.hls_js.on(Hls.Events.MANIFEST_PARSED, function(event,data) {
         console.log("manifest loaded, found " + data.levels.length + " quality level");
        });
     });

  screenSystems.video.addEventListener('canplay',function() {
    if (screenSystems.AutoPlay) 
          screenSystems.video.play();
    },false);

  screenSystems.video.addEventListener('canplaythrough',function() {
    if (screenSystems.AutoPlay) 
          screenSystems.video.play();
    },false);

  screenSystems.SetCurrentPlayerTime = screenSystems.hls.SetCurrentPlayerTime;


  // hook int metadata receive function
  screenSystems.hls.hls_js.on(Hls.Events.FRAG_PARSING_METADATA,function(event,data) {
    for (i = 0; i < data.samples.length; i++) {
      // object.pts is second from start of media player
      var advanceS = 0;
      screenSystems.process_ID3( data.samples[i].data, data.samples[i].pts );
    }
  });

  screenSystems.video.onpause = function(event) { 
// pause is ok in hls.js
  };

  screenSystems.video.onplay = function(event) { 
    if (screenSystems.PauseSubs) {
      try {
        screenSystems.video.currentTime = screenSystems.video.currentTime + 1.0;
      } 
      catch (e) {
      }
    }
    screenSystems.PauseSubs = false;
  };

  screenSystems.triggerFullscreen= screenSystems.triggerHTML5Fullscreen;

};


screenSystems.hls.timesource = function(){
  if (screenSystems.Redraw){
    screenSystems.Redraw = false;
    return -1;
  }

  if (screenSystems.PauseSubs){
    return -1;
  }

  if (screenSystems.UseProgramDate !== 'true')
  {
    var NowS = screenSystems.video.currentTime;
    return NowS;
  }

  if (isNaN(screenSystems.TimeOffsetS))
    return 0;
	
  if (screenSystems.video)
    NowS = screenSystems.TimeOffsetS + screenSystems.video.currentTime;

  var NowD = new Date(NowS*1000.0);
  NowD.setUTCHours(0);
  NowD.setUTCMinutes(0);
  NowD.setUTCSeconds(0);
  NowD.setUTCMilliseconds(0)
  NowS = NowS - (NowD/1000.0);
  return NowS;
};

//////////////////////////////////////////////////
// for hls.js, time here is ms at player posn = 0
screenSystems.hls.SetCurrentPlayerTime = function( TimeInMS ) {
  if (TimeInMS == -1) {
    screenSystems.TimeOffsetS = NaN;
  } else {

    var toffs = TimeInMS/1000.0;
    if (Math.abs(screenSystems.TimeOffsetS - toffs) > 0.1){
      if (screenSystems.logtext)
        screenSystems.logtext.textContent = "toffs changed by " + (screenSystems.TimeOffsetS - toffs) + "\n" + screenSystems.logtext.textContent;
      if (screenSystems.logger)
        screenSystems.logger(screenSystems.CSFSubtitler.logType.LOG_LOG,
             "toffs changed by " + (screenSystems.TimeOffsetS - toffs));
    }

    screenSystems.TimeOffsetS = toffs;
  }
}



//
// end hls.js specific
//
//////////////////////////////////////////////////





//////////////////////////////////////////////////
//
// iOS/Safari on MAC:
// 
screenSystems.iOS.init = function( ) {

  screenSystems.timesource = screenSystems.iOS.timesource;
  screenSystems.renderer = screenSystems.Private.renderer0;

  screenSystems.video = document.createElement('video');
  screenSystems.video.controls = true;

  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.video.style.maxHeight = screenSystems.videodiv.style.maxHeight;
  screenSystems.videodiv.appendChild(screenSystems.video);
  screenSystems.video.onwebkitfullscreenchange = function(){ screenSystems.Redraw = true; };

  screenSystems.Private.InitVideo( screenSystems.video, "Arabic", "ar" );

  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init";

  screenSystems.SetCurrentPlayerTime = screenSystems.iOS.SetCurrentPlayerTime;

  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init";

  screenSystems.video.onpause = function(event) { 
    screenSystems.PauseSubs = true;
  };

  screenSystems.video.onplay = function(event) { 
    screenSystems.PauseSubs = false;
  };

  screenSystems.triggerFullscreen= screenSystems.triggerHTML5Fullscreen;
  screenSystems.video.src = screenSystems.videoSource;

};


screenSystems.iOS.SetCurrentPlayerTime = function( TimeInMS ) {
  if (TimeInMS == -1){
    screenSystems.TimeOffsetS = NaN;
  } else {
    var d = new Date();
    var e = new Date();
		
    var timeS = TimeInMS;
    var timeN = d.getTime();
    d.setTime( timeN );
    e.setTime( timeS );

    var toffs = timeS/1000.0 - timeN/1000.0;
    if (Math.abs(screenSystems.TimeOffsetS - toffs) > 0.1){
      if (screenSystems.logtext)
        screenSystems.logtext.textContent = "toffs changed by " + (screenSystems.TimeOffsetS - toffs) + "\n" + screenSystems.logtext.textContent;
    }

    screenSystems.TimeOffsetS = toffs;
  }
}

screenSystems.iOS.timesource = function(){
  if (screenSystems.Redraw){
    screenSystems.Redraw = false;
    return -1;
  }

  screenSystems.Private.Tick();

  if (screenSystems.PauseSubs){
    return -1;
  }


  if (screenSystems.UseProgramDate !== 'true')
  {
    var NowS = screenSystems.video.currentTime;
    return NowS;
  }

  if (isNaN(screenSystems.TimeOffsetS))
    return 0;
	
  var NowS = Date.now()/1000.0;
  NowS = NowS + screenSystems.TimeOffsetS;
  var d = new Date();
  var n = d.getFullYear();
  var NowD = new Date(NowS*1000.0);
	
  NowD.setUTCHours(0);
  NowD.setUTCMinutes(0);
  NowD.setUTCSeconds(0);
  NowD.setUTCMilliseconds(0)
		
  NowS = NowS - (NowD/1000.0);


  return NowS;
};


//
// end iOS specific
//
//////////////////////////////////////////////////






//////////////////////////////////////////////////
//
// Flash JW:
// 


screenSystems.jw.init = function( ) {

  // if JWPlayer 7
  if (jwplayer){
    var ver = jwplayer.version;
    if (ver[0] === '7') {
      if (screenSystems.jwplayerkey)
        screenSystems.jw.init7();
    }
    if (ver[0] === '6') {
      if (screenSystems.jwplayerid)
        screenSystems.jw.init6();
    }
  }
  screenSystems.subtitle_zIndex = 4000;

};


screenSystems.jw.init6 = function( ) {
  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init JW6";

  screenSystems.timesource = screenSystems.jw.timesource;
  screenSystems.renderer = screenSystems.jw.renderer_0;

  if (!screenSystems.jwaspectratio)
    screenSystems.jwaspectratio = "16:9";

  var q = document.getElementById('wrapper');
  screenSystems.jw.OuterDiv = q;
  q.allowfullscreen = true;

  q = document.getElementById('videodiv');
  screenSystems.jw.OuterDiv = q;
  q.allowfullscreen = true;
  screenSystems.jw.ActualVideoDiv = document.createElement('div');


  screenSystems.jw.ActualVideoDiv.id = screenSystems.jwplayerid;
  q.appendChild( screenSystems.jw.ActualVideoDiv );

//  q.id = screenSystems.jwplayerid;

  jwplayer(screenSystems.jwplayerid).setup({
        file: screenSystems.videoSource,
        width: '100%',
        aspectratio: screenSystems.jwaspectratio,
	skin: 'jwplayer/six_nofull.xml',
	tracks: [{
	  file:"jwplayer/test.vtt",
	  label: "Arabic",
	  kind: "captions" }]
    });


  screenSystems.jw.playerapi = jwplayer(screenSystems.jwplayerid);
  screenSystems.player_screen = document.getElementById(screenSystems.jwplayerid);
  var api = jwplayer();
  screenSystems.jw.playerdiv = document.getElementById(screenSystems.jwplayerid);
  if (!screenSystems.jw.playerdiv)
    screenSystems.jw.playerdiv = document.getElementById(screenSystems.jwplayerid+"_wrapper");

  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.jw.ActualVideoDiv.style.maxHeight = screenSystems.videodiv.style.maxHeight;
  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.jw.playerdiv.style.maxHeight = screenSystems.videodiv.style.maxHeight;

  screenSystems.jw.playerapi.addButton( 'jwplayer/fullscreen.png', 'Full Screen', screenSystems.jw.triggerFullscreen, 'MyFullScreen'  ); 

  screenSystems.jw.playerapi.onMeta(function(event) { 
    if (event.type == "jwplayerMediaMeta") {
      screenSystems.jw.MetaData(event);	
    }
  });

  screenSystems.jw.playerapi.onPause(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onIdle(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onComplete(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onCaptionsChange(function(event) { 
    var tmp = event;
    if (event.track) {
      screenSystems.SubtitlesEnable = true;
    } else {
      screenSystems.SubtitlesEnable = false;
	  screenSystems.renderer( null );
    }

  });


  screenSystems.jw.playerapi.onPlay(function(event) { 
    screenSystems.PauseSubs = false;
  });

  screenSystems.jw.playerapi.onBuffer(function(event) { 
    if (event) {
      if (event.newstate) {
        if (event.newstate == 'playing') {
          screenSystems.PauseSubs = false;
        }
        if (event.newstate == 'buffering') {
          screenSystems.PauseSubs = true;
        }
        if (event.newstate == 'paused') {
          screenSystems.PauseSubs = true;
        }
      }
    }
  });

  if (screenSystems.SubtitlesEnable)
    screenSystems.jw.playerapi.setCurrentCaptions(1);

  screenSystems.SetCurrentPlayerTime = screenSystems.jw.SetCurrentPlayerTime;
  screenSystems.triggerFullscreen = screenSystems.jw.triggerFullscreen; 

  if (screenSystems.AutoPlay) {
    screenSystems.jw.playerapi.play();
  }

  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init JW6 end";
}


screenSystems.jw.init7 = function( ) {
  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init JW7";

  screenSystems.timesource = screenSystems.jw.timesource;
  screenSystems.renderer = screenSystems.jw.renderer7_0;

  if (!screenSystems.jwaspectratio)
    screenSystems.jwaspectratio = "16:9";

  var q = document.getElementById('wrapper');
  screenSystems.jw.OuterDiv = q;

  q = document.getElementById('videodiv');
  q.allowfullscreen = true;
  screenSystems.jw.ActualVideoDiv = document.createElement('div');


  screenSystems.jw.ActualVideoDiv.id = "_jwplayer";
  q.appendChild( screenSystems.jw.ActualVideoDiv );

  screenSystems.jw.playerapi = jwplayer("_jwplayer");

  screenSystems.jw.playerapi.setup({
        file: screenSystems.videoSource,
        width: '100%',
        aspectratio: screenSystems.jwaspectratio,
	tracks: [{
	  file:"jwplayer/test.vtt",
	  label: "Arabic",
	  kind: "captions" }]
    });


  screenSystems.player_screen = document.getElementById("_jwplayer");
  screenSystems.jw.playerdiv = document.getElementById("_jwplayer");

  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.jw.ActualVideoDiv.style.maxHeight = screenSystems.videodiv.style.maxHeight;
  if (screenSystems.videodiv.style.maxHeight)
    screenSystems.jw.playerdiv.style.maxHeight = screenSystems.videodiv.style.maxHeight;

  ///screenSystems.jw.playerapi.addButton( 'jwplayer/fullscreen.png', 'Full Screen', screenSystems.jw.triggerFullscreen, 'MyFullScreen'  ); 

  screenSystems.jw.playerapi.onMeta(function(event) { 
    if (event.type == "meta") {
      screenSystems.jw.MetaData(event);	
    }
  });

  screenSystems.jw.playerapi.onPause(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onIdle(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onComplete(function(event) { 
    screenSystems.PauseSubs = true;
  });

  screenSystems.jw.playerapi.onCaptionsChange(function(event) { 
    var tmp = event;
    if (event.track) {
      screenSystems.SubtitlesEnable = true;
    } else {
      screenSystems.SubtitlesEnable = false;
	  screenSystems.renderer( null );
    }

  });


  screenSystems.jw.playerapi.onPlay(function(event) { 
    screenSystems.PauseSubs = false;
  });

  screenSystems.jw.playerapi.onBuffer(function(event) { 
    if (event) {
      if (event.newstate) {
        if (event.newstate == 'playing') {
          screenSystems.PauseSubs = false;
        }
        if (event.newstate == 'buffering') {
          screenSystems.PauseSubs = true;
        }
        if (event.newstate == 'paused') {
          screenSystems.PauseSubs = true;
        }
      }
    }
  });


  // don't do these things until it is actually ready
  screenSystems.jw.playerapi.onReady(function(event) { 
    if (screenSystems.SubtitlesEnable)
      screenSystems.jw.playerapi.setCurrentCaptions(1);

    screenSystems.SetCurrentPlayerTime = screenSystems.jw.SetCurrentPlayerTime;
    screenSystems.triggerFullscreen = screenSystems.jw.triggerFullscreen; 

    if (screenSystems.AutoPlay) {
      screenSystems.jw.playerapi.play();
    }
  });

  if (screenSystems.logtext)
    screenSystems.logtext.textContent = "Init JW7 end";
}



screenSystems.jw.timesource = function(){
  if (screenSystems.Redraw){
    screenSystems.Redraw = false;
    return -1;
  }

  if (screenSystems.PauseSubs){
    return -1;
  }

  if (screenSystems.UseProgramDate !== 'true')
  {
    var NowS = screenSystems.jw.playerapi.getPosition();
    return NowS;
  }

  if (isNaN(screenSystems.TimeOffsetS))
    return 0;
	
  var NowS = Date.now()/1000.0;
  NowS = NowS + screenSystems.TimeOffsetS;
  var d = new Date();
  var n = d.getFullYear();
  var NowD = new Date(NowS*1000.0);
	
  NowD.setUTCHours(0);
  NowD.setUTCMinutes(0);
  NowD.setUTCSeconds(0);
  NowD.setUTCMilliseconds(0)
		
  NowS = NowS - (NowD/1000.0);
  return NowS;
};




screenSystems.jw.MetaData = function(event)
{
  if (event.metadata.type){
    if (event.metadata.width){
      screenSystems.jw.VideoWidth = event.metadata.width;
    }
    return;
  }

  if (event.metadata.album) {
    var TimeObject;
    try {
      var text = event.metadata.album;
      if (screenSystems.logtext)
        screenSystems.logtext.textContent = "JW meta: " + text;

      // JWPlayer may give us the language encoding as first char,
      // if so, strip it off
      if (text[0] != '{')
        text = text.slice(1);
      screenSystems.processCSFTime(text, 0);
    }
    catch (e) {
      TimeObject = "error";
    }
  } 

}


//////////////////////////////////////////////////
//
screenSystems.jw.SetCurrentPlayerTime = function( TimeInMS ) {
  if (TimeInMS == -1){
    screenSystems.TimeOffsetS = NaN;
  } else {
    var d = new Date();
    var e = new Date();
		
    var timeS = TimeInMS;
    var timeN = d.getTime();
    d.setTime( timeN );
    e.setTime( timeS );

    screenSystems.TimeOffsetS = timeS/1000.0 - timeN/1000.0;
  }
}

screenSystems.jw.onresize = function() {
  if( window.innerHeight == screen.height) {
    // browser is fullscreen
    screenSystems.jw.OuterDiv.style.width = screen.width + "px";
  } else {
    screenSystems.jw.OuterDiv.style.width = "100%";
  }


}


screenSystems.jw.triggerFullscreen = function() {
  var elem;
  if (screenSystems.jw.OuterDiv){
    elem = screenSystems.jw.OuterDiv;
  } else {
    return;
  }

    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && 
         document.fullScreenElement === null) || 
        (document.msFullscreenElement !== undefined && 
         document.msFullscreenElement === null) || 
        (document.mozFullScreen !== undefined && 
         !document.mozFullScreen) || 
        (document.webkitIsFullScreen !== undefined && 
         !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
  screenSystems.Redraw = true;
}



screenSystems.jw.renderer = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, posn) {
    var playerX, playerY,
        playerWidth, playerHeight,
        u, v,
        imageCentreOffset, imageBottomOffset,
        imageX, imageY,
        imageWidth, imageHeight;

    if (!screenSystems.UseCSF | !screenSystems.SubtitlesEnable)
      image = 0;

    screenSystems.jw.playerdiv = document.getElementById(screenSystems.jwplayerid+"_wrapper");

    if (image) {
        var IsFullScreen = false;        
        if( window.innerHeight == screen.height) {
          IsFullScreen = true;
        }

        if (IsFullScreen){
          playerX = screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].xpos;
          playerY = screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].ypos;
          playerWidth = screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].scalex;
          playerHeight = screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].scaley;
        } else {
          playerX = screenSystems.jw.playerdiv.offsetLeft + screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].xpos;
          playerY = screenSystems.jw.playerdiv.offsetTop + screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].ypos;
          playerWidth = screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].scalex;
          playerHeight = screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].scaley;
        }

//        if (screenSystems.jw.VideoWidth) {
//          playerWidth = screenSystems.jw.VideoWidth * screenSystems.screenposn[posn].scalex;
//          playerX = playerX + (screenSystems.jw.playerdiv.offsetWidth - screenSystems.jw.VideoWidth)/2;
//        }

        u = playerWidth / targetWidth;
        v = playerHeight / targetHeight;
        imageCentreOffset = centreOffset * u;
        imageBottomOffset = bottomOffset * v;
        imageWidth = ((width > 0) ? width : image.naturalWidth) * u;
        imageHeight = ((height > 0) ? height : image.naturalHeight) * v;
        imageX = ((playerWidth - imageWidth) / 2) + imageCentreOffset;
        imageY = playerHeight - imageHeight - imageBottomOffset;

	if (screenSystems.screenposn[posn].scaley != screenSystems.screenposn[posn].ysize){
	    // if too high, move down
	    if (imageY < 0){
		imageY = 0;
	    }
	    // if too low, move up
	    if (imageY + imageHeight > playerHeight*screenSystems.screenposn[posn].ysize){
		imageY = playerHeight*screenSystems.screenposn[posn].ysize - imageHeight;
	    }
	}

        image.width = imageWidth;
        image.height = imageHeight;
        image.style.pointerEvents = 'none';
        image.style.position = 'absolute';
//        image.style.left = playerX + imageX + 'px';
//        image.style.top = playerY + imageY + 'px';
        image.style.left = imageX + 'px';
        image.style.top = imageY + 'px';
	image.class = 'subtitleimage';
	image.style.zIndex = screenSystems.subtitle_zIndex;

        screenSystems.jw.playerdiv.appendChild(image);
        screenSystems.screenposn[posn].onairImages.push(image);
    }
    else {
        screenSystems.screenposn[posn].onairImages.forEach(function (image) {
            screenSystems.jw.playerdiv.removeChild(image);
        });
        
        screenSystems.screenposn[posn].onairImages.length = 0;
    }
}

screenSystems.jw.renderer_0 = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight) {

    screenSystems.jw.renderer(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, 0);
}


screenSystems.jw.renderer7 = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, posn) {
    var playerX, playerY,
        playerWidth, playerHeight,
        u, v,
        imageCentreOffset, imageBottomOffset,
        imageX, imageY,
        imageWidth, imageHeight;

    if (!screenSystems.UseCSF | !screenSystems.SubtitlesEnable)
      image = 0;

    //screenSystems.jw.playerdiv = document.getElementById(screenSystems.jwplayerid+"_wrapper");
    screenSystems.jw.playerdiv = document.getElementById("_jwplayer");

    if (image) {
        var IsFullScreen = false;        
        if( window.innerHeight == screen.height) {
          IsFullScreen = true;
        }

        if (IsFullScreen){
          playerX = screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].xpos;
          playerY = screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].ypos;
          playerWidth = screenSystems.jw.playerapi.getWidth() * screenSystems.screenposn[posn].scalex;
          playerHeight = screenSystems.jw.playerapi.getHeight() * screenSystems.screenposn[posn].scaley;
        } else {
          playerX = screenSystems.jw.playerdiv.offsetLeft + screenSystems.jw.playerdiv.offsetWidth * screenSystems.screenposn[posn].xpos;
          playerY = screenSystems.jw.playerdiv.offsetTop + screenSystems.jw.playerdiv.offsetHeight * screenSystems.screenposn[posn].ypos;
          playerWidth = screenSystems.jw.playerapi.getWidth() * screenSystems.screenposn[posn].scalex;
          playerHeight = screenSystems.jw.playerapi.getHeight() * screenSystems.screenposn[posn].scaley;
        }

//        if (screenSystems.jw.VideoWidth) {
//          playerWidth = screenSystems.jw.VideoWidth * screenSystems.screenposn[posn].scalex;
//          playerX = playerX + (screenSystems.jw.playerdiv.offsetWidth - screenSystems.jw.VideoWidth)/2;
//        }

        u = playerWidth / targetWidth;
        v = playerHeight / targetHeight;
        imageCentreOffset = centreOffset * u;
        imageBottomOffset = bottomOffset * v;
        imageWidth = ((width > 0) ? width : image.naturalWidth) * u;
        imageHeight = ((height > 0) ? height : image.naturalHeight) * v;
        imageX = ((playerWidth - imageWidth) / 2) + imageCentreOffset;
        imageY = playerHeight - imageHeight - imageBottomOffset;

	if (screenSystems.screenposn[posn].scaley != screenSystems.screenposn[posn].ysize){
	    // if too high, move down
	    if (imageY < 0){
		imageY = 0;
	    }
	    // if too low, move up
	    if (imageY + imageHeight > playerHeight*screenSystems.screenposn[posn].ysize){
		imageY = playerHeight*screenSystems.screenposn[posn].ysize - imageHeight;
	    }
	}

        image.width = imageWidth;
        image.height = imageHeight;
        image.style.pointerEvents = 'none';
        image.style.position = 'absolute';
        image.style.left = playerX + imageX + 'px';
        image.style.top = playerY + imageY + 'px';
	image.class = 'subtitleimage';
	image.style.zIndex = screenSystems.subtitle_zIndex;

        screenSystems.jw.playerdiv.appendChild(image);
        screenSystems.screenposn[posn].onairImages.push(image);
    }
    else {
        screenSystems.screenposn[posn].onairImages.forEach(function (image) {
            screenSystems.jw.playerdiv.removeChild(image);
        });
        
        screenSystems.screenposn[posn].onairImages.length = 0;
    }
}

screenSystems.jw.renderer7_0 = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight) {

    screenSystems.jw.renderer7(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, 0);
}
//
// end JW specific
//
//////////////////////////////////////////////




screenSystems.setupPosn = function() {

    screenSystems.screenposn = [];
    // scalex = how much to scale reference picture width
    // scaley = how much to scale reference picture height
    // xpos = posn in terms of picture width
    // ypos = posn in terms of picture height
    // ysize = height of render area in terms of picture height - if ysize != scaley, 
    // then make sure image is visibile in the view window (bottom of title will always show)

    // full frame
    var posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 1, onairImages: [] };
    screenSystems.screenposn[0] = posn;

    // quarters
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0, ysize: 0.5, onairImages: [] };
    screenSystems.screenposn[1] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0, ysize: 0.5, onairImages: [] };
    screenSystems.screenposn[2] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.5, ysize: 0.5, onairImages: [] };
    screenSystems.screenposn[3] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.5, ysize: 0.5, onairImages: [] };
    screenSystems.screenposn[4] = posn;

    // 4 vertically
    posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[5] = posn;
    posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0.25, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[6] = posn;
    posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0.5, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[7] = posn;
    posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0.75, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[8] = posn;

    // 4 down each side (left)
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[9] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.25, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[10] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.5, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[11] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.75, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[12] = posn;

    // 4 down each side (right)
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[13] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.25, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[14] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.5, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[15] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.75, ysize: 0.25, onairImages: [] };
    screenSystems.screenposn[16] = posn;


    // 8 down each side (left)
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[17] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.125, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[18] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.25, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[19] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.375, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[20] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.5, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[21] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.625, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[22] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.75, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[23] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0, ypos: 0.875, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[24] = posn;

    // 8 down each side (right)
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[25] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.125, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[26] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.25, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[27] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.375, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[28] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.5, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[29] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.625, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[30] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.75, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[31] = posn;
    posn = { scalex: 0.5, scaley: 0.5, xpos: 0.5, ypos: 0.875, ysize: 0.125, onairImages: [] };
    screenSystems.screenposn[32] = posn;




    // full frame
    var posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 1, onairImages: [] };
    screenSystems.screenposn[33] = posn;
    // full frame
    var posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 1, onairImages: [] };
    screenSystems.screenposn[34] = posn;
    // full frame
    var posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 1, onairImages: [] };
    screenSystems.screenposn[35] = posn;
    // full frame
    var posn = { scalex: 1, scaley: 1, xpos: 0, ypos: 0, ysize: 1, onairImages: [] };
    screenSystems.screenposn[36] = posn;

};



//////////////////////////////////////////////////
// avd is ms early
screenSystems.processCSFTime = function(text, adv)
{
  try {
    var TimeObject = JSON.parse(text);
    if (TimeObject.CSFTime){
      var time_ms = Date.parse(TimeObject.CSFTime);
      time_ms = time_ms - adv*1000.0;
      screenSystems.SetCurrentPlayerTime( time_ms );
    } 
  }
  catch (e) {
//    timeit.textContent = timeit.textContent + " Time:" + "Parse Error on:" + TALBText;
  }
}


screenSystems.bodyrenderer = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, posn) {
    var playerX, playerY,
        playerWidth, playerHeight,
        u, v,
        imageCentreOffset, imageBottomOffset,
        imageX, imageY,
        imageWidth, imageHeight;

  if (!screenSystems.UseCSF || !screenSystems.SubtitlesEnable)
    image = 0;

    if (image) {
        playerX = screenSystems.player.offsetLeft + screenSystems.player.offsetWidth * screenSystems.screenposn[posn].xpos;
        playerY = screenSystems.player.offsetTop + screenSystems.player.offsetHeight * screenSystems.screenposn[posn].ypos;
        playerWidth = screenSystems.player.offsetWidth * screenSystems.screenposn[posn].scalex;
        playerHeight = screenSystems.player.offsetHeight * screenSystems.screenposn[posn].scaley;

        u = playerWidth / targetWidth;
        v = playerHeight / targetHeight;
        imageCentreOffset = centreOffset * u;
        imageBottomOffset = bottomOffset * v;
        imageWidth = ((width > 0) ? width : image.naturalWidth) * u;
        imageHeight = ((height > 0) ? height : image.naturalHeight) * v;
        imageX = ((playerWidth - imageWidth) / 2) + imageCentreOffset;
        imageY = playerHeight - imageHeight - imageBottomOffset;

	if (screenSystems.screenposn[posn].scaley != screenSystems.screenposn[posn].ysize){
	    // if too high, move down
	    if (imageY < 0){
		imageY = 0;
	    }
	    // if too low, move up
	    if (imageY + imageHeight > playerHeight*screenSystems.screenposn[posn].ysize){
		imageY = playerHeight*screenSystems.screenposn[posn].ysize - imageHeight;
	    }
	}

        image.width = imageWidth;
        image.height = imageHeight;
        image.style.pointerEvents = 'none';
        image.style.position = 'absolute';
        image.style.left = imageX + 'px';
        image.style.top = imageY + 'px';
        image.style.left = playerX + imageX + 'px';
        image.style.top = playerY + imageY + 'px';
	image.class = 'subtitleimage';
	image.style.zIndex = screenSystems.subtitle_zIndex;

		//screenSystems.player.appendChild(image);
		screenSystems.videodiv.appendChild(image);
        //screenSystems.body.appendChild(image);
        screenSystems.screenposn[posn].onairImages.push(image);
    }
    else {
        screenSystems.screenposn[posn].onairImages.forEach(function (image) {
			try {
			//screenSystems.player.removeChild(image);
			screenSystems.videodiv.removeChild(image);
            //screenSystems.body.removeChild(image);
			}
			catch (e){
			}
        });
        
        screenSystems.screenposn[posn].onairImages.length = 0;
    }
}

screenSystems.bodyrenderer_0 = function(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight) {

    screenSystems.bodyrenderer(image, width, height, centreOffset, bottomOffset,
                  targetWidth, targetHeight, 0);
}



screenSystems.triggerHTML5Fullscreen = function() {
  // if we would be using the 'bodyrenderer', then 
  // fullscreen the videodiv.
  if (screenSystems.FullScreenVideoDiv || (screenSystems.Private.UseBodyRender === true)) {
    screenSystems.HTML5Fullscreen( screenSystems.videodiv );
  } else {
    // else we will be rendering on the video element, 
    // so we may fullscreen that
    screenSystems.HTML5Fullscreen( screenSystems.video );
  }
};

screenSystems.leaveHTML5Fullscreen = function() {
	if (document.webkitLeaveFullscreen) {
		document.webkitLeaveFullscreen();
	} else 
	if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else 
	if (document.mozCancelFullscreen) {
		document.mozCancelFullscreen();
	} else 
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}  
}


screenSystems.HTML5Fullscreen = function( element ) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.webkitEnterFullscreen()){
    element.webkitEnterFullscreen();
  }
}

