/*!
   JW Player version 8.6.3
   Copyright (c) 2018, JW Player, All Rights Reserved 
   This source code and its use and distribution is subject to the terms 
   and conditions of the applicable license agreement. 
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.6.3/notice.txt
*/
(window.webpackJsonpjwplayer=window.webpackJsonpjwplayer||[]).push([[1],{105:function(e,t,n){"use strict";function i(e){return{bitrate:e.bitrate,label:e.label,width:e.width,height:e.height}}n.d(t,"a",function(){return i})},124:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});var i=n(1);function r(e,t,n){var r=e+1e3,s=i.o;return t>0?(403===t&&(s=i.q),r+=a(t)):"http:"===(""+n).substring(0,5)&&"https:"===document.location.protocol?r+=12:0===t&&(r+=11),{code:r,key:s}}var a=function(e){return e>=400&&e<600?e:6}},125:function(e,t,n){"use strict";t.a={attachMedia:function(){this.eventsOn_()},detachMedia:function(){return this.eventsOff_(),this.video}}},126:function(e,t,n){"use strict";var i=n(7),r=n(23),a=n(79),s={container:null,volume:function(e){this.video.volume=Math.min(Math.max(0,e/100),1)},mute:function(e){this.video.muted=!!e,this.video.muted||this.video.removeAttribute("muted")},resize:function(e,t,n){var a=this.video,s=a.videoWidth,c=a.videoHeight;if(e&&t&&s&&c){var o={objectFit:"",width:"",height:""};if("uniform"===n){var u=e/t,d=s/c,l=Math.abs(u-d);l<.09&&l>.0025&&(o.objectFit="fill",n="exactfit")}if(i.Browser.ie||i.OS.iOS&&i.OS.version.major<9||i.Browser.androidNative)if("uniform"!==n){o.objectFit="contain";var h=e/t,f=s/c,v=1,g=1;"none"===n?v=g=h>f?Math.ceil(100*c/t)/100:Math.ceil(100*s/e)/100:"fill"===n?v=g=h>f?h/f:f/h:"exactfit"===n&&(h>f?(v=h/f,g=1):(v=1,g=f/h)),Object(r.e)(a,"matrix("+v.toFixed(2)+", 0, 0, "+g.toFixed(2)+", 0, 0)")}else o.top=o.left=o.margin="",Object(r.e)(a,"");Object(r.d)(a,o)}},getContainer:function(){return this.container},setContainer:function(e){this.container=e,this.video.parentNode!==e&&e.appendChild(this.video)},remove:function(){this.stop(),this.destroy();var e=this.container;e&&e===this.video.parentNode&&e.removeChild(this.video)},atEdgeOfLiveStream:function(){if(!this.isLive())return!1;return Object(a.a)(this.video.buffered)-this.video.currentTime<=2}};t.a=s},127:function(e,t,n){"use strict";var i=n(3),r=n(50),a={canplay:function(){this.trigger(i.E)},play:function(){this.stallTime=-1,this.video.paused||this.state===i.Pa||this.setState(i.Na)},loadedmetadata:function(){var e={duration:this.getDuration(),height:this.video.videoHeight,width:this.video.videoWidth,seekRange:this.getSeekRange()},t=this.drmUsed;t&&(e.drm=t),this.trigger(i.K,e)},timeupdate:function(){var e=this.video.currentTime,t=this.getCurrentTime(),n=this.getDuration();if(!isNaN(n)){this.seeking||this.video.paused||this.state!==i.Qa&&this.state!==i.Na||this.stallTime===e||(this.stallTime=-1,this.setState(i.Pa));var r={position:t,duration:n,currentTime:e,seekRange:this.getSeekRange(),metadata:{currentTime:e}};if(this.getPtsOffset){var a=this.getPtsOffset();a>=0&&(r.metadata.mpegts=a+t)}(this.state===i.Pa||this.seeking)&&this.trigger(i.R,r)}},click:function(e){this.trigger(i.n,e)},volumechange:function(){var e=this.video;this.trigger(i.U,{volume:Math.round(100*e.volume)}),this.trigger(i.L,{mute:e.muted})},seeked:function(){this.seeking&&(this.seeking=!1,this.trigger(i.Q))},playing:function(){-1===this.stallTime&&this.setState(i.Pa),this.trigger(i.Fa)},pause:function(){this.state!==i.Ka&&(this.video.ended||this.video.error||this.video.currentTime!==this.video.duration&&this.setState(i.Oa))},progress:function(){var e=this.getDuration();if(!(e<=0||e===1/0)){var t=this.video.buffered;if(t&&0!==t.length){var n=Object(r.a)(t.end(t.length-1)/e,0,1);this.trigger(i.D,{bufferPercent:100*n,position:this.getCurrentTime(),duration:e,currentTime:this.video.currentTime,seekRange:this.getSeekRange()})}}},ratechange:function(){this.trigger(i.O,{playbackRate:this.video.playbackRate})},ended:function(){this.videoHeight=0,this.streamBitrate=0,this.state!==i.Ma&&this.state!==i.Ka&&this.trigger(i.F)},loadeddata:function(){this.renderNatively&&this.setTextTracks(this.video.textTracks)}};t.a=a},128:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n(44),a=n(3),s=n(105),c=n(7),o=n(59),u=n(127),d=n(126),l=n(125),h=n(72),f=n(23),v=n(10),g=n(55),T=n(5),k=n(77),b=n(79),y=n(71),m=n(16),p=n(1),x=224e3,_=224005,w=221e3,O=window.clearTimeout,C="html5",j=function(){};function B(e,t){Object.keys(e).forEach(function(n){t.removeEventListener(n,e[n])})}function L(e,t,n){this.state=a.Ma,this.seeking=!1;var r=this,g=t.minDvrWindow,L={progress:function(){u.a.progress.call(r),fe()},timeupdate:function(){P!==E.currentTime&&(Y(E.currentTime),u.a.timeupdate.call(r)),fe(),c.Browser.ie&&$()},resize:$,ended:function(){U=-1,ve(),u.a.ended.call(r)},loadedmetadata:function(){var e=r.getDuration();X&&e===1/0&&(e=0);var t={duration:e,height:E.videoHeight,width:E.videoWidth};r.trigger(a.K,t),$()},durationchange:function(){X||u.a.progress.call(r)},loadeddata:function(){u.a.loadeddata.call(r),function(e){if(V=null,!e)return;if(e.length){for(var t=0;t<e.length;t++)if(e[t].enabled){q=t;break}-1===q&&(e[q=0].enabled=!0),V=Object(i.A)(e,function(e){var t={name:e.label||e.language,language:e.language};return t})}r.addTracksListener(e,"change",oe),V&&r.trigger("audioTracks",{currentTrack:q,tracks:V})}(E.audioTracks),function(e){A&&-1!==A&&e&&e!==1/0&&r.seek(A)}(r.getDuration()),$()},canplay:function(){R=!0,X||he(),c.Browser.ie&&9===c.Browser.version.major&&r.setTextTracks(r._textTracks),u.a.canplay.call(r)},seeking:function(){var e=null!==M?M:r.getCurrentTime(),t=P;Y(e),M=null,A=0,r.seeking=!0,r.trigger(a.P,{position:t,offset:e})},seeked:function(){u.a.seeked.call(r)},waiting:function(){r.seeking?r.setState(a.Na):r.state===a.Pa&&(r.atEdgeOfLiveStream()&&r.setPlaybackRate(1),r.stallTime=r.video.currentTime,r.setState(a.Qa))},webkitbeginfullscreen:function(e){D=!0,ue(e)},webkitendfullscreen:function(e){D=!1,ue(e)},error:function(){var e=r.video,t=e.error,n=t&&t.code||-1,i=x,s=p.o;1===n?i+=n:2===n?(s=p.l,i=w):3===n||4===n?(i+=n-1,4===n&&e.src===location.href&&(i=_)):s=p.r,ae(),r.trigger(a.G,new p.s(s,i,t))}};Object.keys(u.a).forEach(function(e){if(!L[e]){var t=u.a[e];L[e]=function(e){t.call(r,e)}}}),Object(i.j)(this,T.a,d.a,l.a,k.a,{renderNatively:function(e){return!(!c.OS.iOS&&!c.Browser.safari)||e&&c.Browser.chrome}(t.renderCaptionsNatively),eventsOn_:function(){!function(e,t){Object.keys(e).forEach(function(n){t.removeEventListener(n,e[n]),t.addEventListener(n,e[n])})}(L,E)},eventsOff_:function(){B(L,E)},detachMedia:function(){return l.a.detachMedia.call(r),ve(),this.removeTracksListener(E.textTracks,"change",this.textTrackChangeHandler),this.disableTextTrack(),E},attachMedia:function(){l.a.attachMedia.call(r),R=!1,this.seeking=!1,E.loop=!1,this.enableTextTrack(),this.renderNatively&&this.setTextTracks(this.video.textTracks),this.addTracksListener(E.textTracks,"change",this.textTrackChangeHandler)},isLive:function(){return E.duration===1/0}});var E=n,I={level:{}},N=null!==t.liveTimeout?t.liveTimeout:3e4,R=!1,A=0,M=null,P=null,H=void 0,U=-1,D=!1,F=j,V=null,q=-1,K=-1,W=!1,Q=null,X=!1,G=null,z=null,J=0;function $(){var e=I.level;if(e.width!==E.videoWidth||e.height!==E.videoHeight){if(!E.videoWidth&&!le()||-1===U)return;e.width=E.videoWidth,e.height=E.videoHeight,he(),I.reason=I.reason||"auto",I.mode="hls"===H[U].type?"auto":"manual",I.bitrate=0,e.index=U,e.label=H[U].label,r.trigger(a.T,I),I.reason=""}}function Y(e){P=Z(e)}function Z(e){var t=r.getSeekRange();if(r.isLive()&&Object(h.a)(t.end-t.start,g)){e-=t.end;var n=Math.abs(G-t.end)>1;return z&&!n||function(e){G=e.end,z=E.currentTime-G,J=Object(m.a)()}(t),z}return e}function ee(e){var t=void 0;return Array.isArray(e)&&e.length>0&&(t=e.map(function(e,t){return{label:e.label||t}})),t}function te(e){g=e.minDvrWindow,H=e.sources,U=function(e){var n=Math.max(0,U),i=t.qualityLabel;if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(n=r),i&&e[r].label===i)return r;I.reason="initial choice",I.level.width&&I.level.height||(I.level={});return n}(H)}function ne(){return E.paused&&E.played&&E.played.length&&r.isLive()&&!Object(h.a)(ce()-se(),g)&&(r.clearTracks(),E.load()),E.play()||Object(y.a)(E)}function ie(e){A=0,ve();var t=E.src,n=document.createElement("source");n.src=H[U].file,n.src!==t?(re(H[U]),t&&E.load()):0===e&&E.currentTime>0&&(A=-1,r.seek(e)),e>0&&E.currentTime!==e&&r.seek(e);var i=ee(H);i&&r.trigger(a.I,{levels:i,currentQuality:U}),H.length&&"hls"!==H[0].type&&r.sendMediaType(H)}function re(e){V=null,q=-1,I.reason||(I.reason="initial choice",I.level={}),R=!1;var t=document.createElement("source");t.src=e.file,E.src!==t.src&&(E.src=e.file)}function ae(){E&&(r.disableTextTrack(),E.removeAttribute("preload"),E.removeAttribute("src"),Object(v.g)(E),Object(f.d)(E,{objectFit:""}),U=-1,!c.Browser.msie&&"load"in E&&E.load())}function se(){var e=1/0;return["buffered","seekable"].forEach(function(t){for(var n=E[t],r=n?n.length:0;r--;){var a=Math.min(e,n.start(r));Object(i.s)(a)&&(e=a)}}),e}function ce(){var e=0;return["buffered","seekable"].forEach(function(t){for(var n=E[t],r=n?n.length:0;r--;){var a=Math.max(e,n.end(r));Object(i.s)(a)&&(e=a)}}),e}function oe(){for(var e=-1,t=0;t<E.audioTracks.length;t++)if(E.audioTracks[t].enabled){e=t;break}de(e)}function ue(e){r.trigger("fullscreenchange",{target:e.target,jwstate:D})}function de(e){E&&E.audioTracks&&V&&e>-1&&e<E.audioTracks.length&&e!==q&&(E.audioTracks[q].enabled=!1,q=e,E.audioTracks[q].enabled=!0,r.trigger("audioTrackChanged",{currentTrack:q,tracks:V}))}function le(){return 0===E.videoHeight&&!((c.OS.iOS||c.Browser.safari)&&E.readyState<2)}function he(){if("hls"===H[0].type){var e=le()?"audio":"video";r.trigger(a.S,{mediaType:e})}}function fe(){if(0!==N){var e=Object(b.a)(E.buffered);r.isLive()&&e&&Q===e?-1===K&&(K=setTimeout(function(){W=!0,function(){if(W&&r.atEdgeOfLiveStream())return r.trigger(a.G,new p.s(p.p,S)),!0}()},N)):(ve(),W=!1),Q=e}}function ve(){O(K),K=-1}this.isSDK=!!t.sdkplatform,this.video=E,this.supportsPlaybackRate=!0,r.getCurrentTime=function(){return Z(E.currentTime)},r.getDuration=function(){var e=E.duration;if(X&&e===1/0&&0===E.currentTime||isNaN(e))return 0;var t=ce();if(r.isLive()&&t){var n=t-se();Object(h.a)(n,g)&&(e=-n)}return e},r.getSeekRange=function(){var e={start:0,end:E.duration};return E.seekable.length&&(e.end=ce(),e.start=se()),e},this.stop=function(){ve(),ae(),this.clearTracks(),c.Browser.ie&&E.pause(),this.setState(a.Ma)},this.destroy=function(){F=j,B(L,E),this.removeTracksListener(E.audioTracks,"change",oe),this.removeTracksListener(E.textTracks,"change",r.textTrackChangeHandler),this.off()},this.init=function(e){te(e);var t=H[U];(X=Object(o.a)(t))&&(r.supportsPlaybackRate=!1,L.waiting=j),r.eventsOn_(),H.length&&"hls"!==H[0].type&&this.sendMediaType(H),I.reason=""},this.preload=function(e){te(e);var t=H[U],n=t.preload||"metadata";"none"!==n&&(E.setAttribute("preload",n),re(t))},this.load=function(e){te(e),ie(e.starttime),this.setupSideloadedTracks(e.tracks)},this.play=function(){return F(),ne()},this.pause=function(){ve(),F=function(){if(E.paused&&E.currentTime&&r.isLive()){var e=ce(),t=e-se(),n=!Object(h.a)(t,g),a=e-E.currentTime;if(n&&e&&(a>15||a<0)){if(M=Math.max(e-10,e-t),!Object(i.s)(M))return;Y(E.currentTime),E.currentTime=M}}},E.pause()},this.seek=function(e){var t=r.getSeekRange();if(e<0&&(e+=t.start+t.end),R||(R=!!t.end),R){A=0;try{if(r.seeking=!0,r.isLive()&&Object(h.a)(t.end-t.start,g)){var n=Math.min(12,(Object(m.a)()-J)/1e3);z=e-G,M+=n}else M=e;Y(E.currentTime),E.currentTime=e}catch(t){r.seeking=!1,A=e}}else A=e,c.Browser.firefox&&E.paused&&ne()},this.setVisibility=function(e){(e=!!e)||c.OS.android?Object(f.d)(r.container,{visibility:"visible",opacity:1}):Object(f.d)(r.container,{visibility:"",opacity:0})},this.setFullscreen=function(e){if(e=!!e){try{var t=E.webkitEnterFullscreen||E.webkitEnterFullScreen;t&&t.apply(E)}catch(e){return!1}return r.getFullScreen()}var n=E.webkitExitFullscreen||E.webkitExitFullScreen;return n&&n.apply(E),e},r.getFullScreen=function(){return D||!!E.webkitDisplayingFullscreen},this.setCurrentQuality=function(e){U!==e&&e>=0&&H&&H.length>e&&(U=e,I.reason="api",I.level={},this.trigger(a.J,{currentQuality:e,levels:ee(H)}),t.qualityLabel=H[e].label,ie(E.currentTime||0),ne())},this.setPlaybackRate=function(e){E.playbackRate=E.defaultPlaybackRate=e},this.getPlaybackRate=function(){return E.playbackRate},this.getCurrentQuality=function(){return U},this.getQualityLevels=function(){return Array.isArray(H)?H.map(function(e){return Object(s.a)(e)}):[]},this.getName=function(){return{name:C}},this.setCurrentAudioTrack=de,this.getAudioTracks=function(){return V||[]},this.getCurrentAudioTrack=function(){return q}}Object(i.j)(L.prototype,g.a),L.getName=function(){return{name:"html5"}};var E=L,S=220001,I=n(27),N=n(76),R=n(124),A=function(e,t,n){E.call(this,e,t,n);var s=this,c=s.init,o=s.load,u=s.destroy,d=s.renderNatively;function l(e){Object(N.a)([e])?s.renderNatively=!1:s.renderNatively=d}function h(e){var t=e.sources[0];if(!s.fairplay||!Object.is(s.fairplay.source,t)){var n=t.drm;n&&n.fairplay?(s.fairplay=Object(i.j)({},{certificateUrl:"",processSpcUrl:"",licenseResponseType:"arraybuffer",licenseRequestHeaders:[],licenseRequestMessage:function(e){return e},licenseRequestFilter:function(){},licenseResponseFilter:function(){},extractContentId:function(e){return e.split("skd://")[1]},extractKey:function(e){return new Uint8Array(e)}},n.fairplay),s.fairplay.source=t,s.fairplay.destroy=function(){P(s.video,"webkitneedkey",f);var e=this.session;e&&(P(e,"webkitkeymessage",v),P(e,"webkitkeyerror",m)),s.fairplay=null},M(s.video,"webkitneedkey",f)):s.fairplay&&s.fairplay.destroy()}}function f(e){var t=e.target,n=e.initData;if(t.webkitKeys||t.webkitSetMediaKeys(new window.WebKitMediaKeys("com.apple.fps.1_0")),!t.webkitKeys)throw new Error("Could not create MediaKeys");var i=s.fairplay;i.initData=n,Object(I.a)(i.certificateUrl,function(e){var r=new Uint8Array(e.response),a=i.extractContentId(H(n));"string"==typeof a&&(a=function(e){for(var t=new ArrayBuffer(2*e.length),n=new Uint16Array(t),i=0,r=e.length;i<r;i++)n[i]=e.charCodeAt(i);return n}(a));var s=function(e,t,n){var i=0,r=new ArrayBuffer(e.byteLength+4+t.byteLength+4+n.byteLength),a=new DataView(r);new Uint8Array(r,i,e.byteLength).set(e),i+=e.byteLength,a.setUint32(i,t.byteLength,!0),i+=4;var s=new Uint16Array(r,i,t.length);return s.set(t),i+=s.byteLength,a.setUint32(i,n.byteLength,!0),i+=4,new Uint8Array(r,i,n.byteLength).set(n),new Uint8Array(r,0,r.byteLength)}(n,a,r),c=t.webkitKeys.createSession("video/mp4",s);if(!c)throw new Error("Could not create key session");M(c,"webkitkeymessage",v),M(c,"webkitkeyerror",m),i.session=c},y,{responseType:"arraybuffer"})}function v(e){var t=s.fairplay,n=e.target,i=e.message,r=new XMLHttpRequest;r.responseType=t.licenseResponseType,r.addEventListener("load",T,!1),r.addEventListener("error",x,!1);var a="";a="function"==typeof t.processSpcUrl?t.processSpcUrl(H(t.initData)):t.processSpcUrl,r.open("POST",a,!0),r.body=t.licenseRequestMessage(i,n),r.headers={},[].concat(t.licenseRequestHeaders||[]).forEach(function(e){r.setRequestHeader(e.name,e.value)});var c=t.licenseRequestFilter.call(e.target,r,t);c&&"function"==typeof c.then?c.then(function(){g(r)}):g(r)}function g(e){Object.keys(e.headers).forEach(function(t){e.setRequestHeader(t,e.headers[t])}),e.send(e.body)}function T(e){var t=s.fairplay,n=e.target,i={};(n.getAllResponseHeaders()||"").trim().split(/[\r\n]+/).forEach(function(e){var t=e.split(": "),n=t.shift();i[n]=t.join(": ")});var r={data:n.response,headers:i},a=t.licenseResponseFilter.call(e.target,r,t);a&&"function"==typeof a.then?a.then(function(){k(r.data)}):k(r.data)}function k(e){var t=s.fairplay.extractKey(e);"function"==typeof t.then?t.then(b):b(t)}function b(e){var t=s.fairplay.session,n=e;"string"==typeof n&&(n=function(e){for(var t=Object(r.a)(e),n=t.length,i=new Uint8Array(new ArrayBuffer(n)),a=0;a<n;a++)i[a]=t.charCodeAt(a);return i}(n)),t.update(n)}function y(e,t,n,i){i.code+=U,i.key=p.q,s.trigger(a.G,i)}function m(e){s.trigger(a.G,new p.s(p.q,U+650,e))}function x(e){s.trigger(a.G,new p.s(p.q,D+Object(R.a)(e.currentTarget.status),e))}this.init=function(e){h(e),l(e),c.call(this,e)},this.load=function(e){h(e),l(e),o.call(this,e)},this.destroy=function(e){this.fairplay&&this.fairplay.destroy(),u.call(this,e)}};function M(e,t,n){P(e,t,n),e.addEventListener(t,n,!1)}function P(e,t,n){e&&e.removeEventListener(t,n,!1)}function H(e){var t=new Uint16Array(e.buffer);return String.fromCharCode.apply(null,t)}Object(i.j)(A.prototype,E.prototype),A.getName=E.getName;t.default=A;var U=225e3,D=226e3},62:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var i=n(2);function r(e){var t=[],n=(e=Object(i.h)(e)).split("\r\n\r\n");1===n.length&&(n=e.split("\n\n"));for(var r=0;r<n.length;r++)if("WEBVTT"!==n[r]){var s=a(n[r]);s.text&&t.push(s)}return t}function a(e){var t={},n=e.split("\r\n");1===n.length&&(n=e.split("\n"));var r=1;if(n[0].indexOf(" --\x3e ")>0&&(r=0),n.length>r+1&&n[r+1]){var a=n[r],s=a.indexOf(" --\x3e ");s>0&&(t.begin=Object(i.f)(a.substr(0,s)),t.end=Object(i.f)(a.substr(s+5)),t.text=n.slice(r+1).join("\r\n"))}return t}},67:function(e,t,n){"use strict";var i=window.VTTCue;function r(e){if("string"!=typeof e)return!1;return!!{start:!0,middle:!0,end:!0,left:!0,right:!0}[e.toLowerCase()]&&e.toLowerCase()}if(!i){(i=function(e,t,n){var i=this;i.hasBeenReset=!1;var a="",s=!1,c=e,o=t,u=n,d=null,l="",h=!0,f="auto",v="start",g="auto",T=100,k="middle";Object.defineProperty(i,"id",{enumerable:!0,get:function(){return a},set:function(e){a=""+e}}),Object.defineProperty(i,"pauseOnExit",{enumerable:!0,get:function(){return s},set:function(e){s=!!e}}),Object.defineProperty(i,"startTime",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.");c=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"endTime",{enumerable:!0,get:function(){return o},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.");o=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"text",{enumerable:!0,get:function(){return u},set:function(e){u=""+e,this.hasBeenReset=!0}}),Object.defineProperty(i,"region",{enumerable:!0,get:function(){return d},set:function(e){d=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"vertical",{enumerable:!0,get:function(){return l},set:function(e){var t=function(e){return"string"==typeof e&&!!{"":!0,lr:!0,rl:!0}[e.toLowerCase()]&&e.toLowerCase()}(e);if(!1===t)throw new SyntaxError("An invalid or illegal string was specified.");l=t,this.hasBeenReset=!0}}),Object.defineProperty(i,"snapToLines",{enumerable:!0,get:function(){return h},set:function(e){h=!!e,this.hasBeenReset=!0}}),Object.defineProperty(i,"line",{enumerable:!0,get:function(){return f},set:function(e){if("number"!=typeof e&&"auto"!==e)throw new SyntaxError("An invalid number or illegal string was specified.");f=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"lineAlign",{enumerable:!0,get:function(){return v},set:function(e){var t=r(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");v=t,this.hasBeenReset=!0}}),Object.defineProperty(i,"position",{enumerable:!0,get:function(){return g},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.");g=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"size",{enumerable:!0,get:function(){return T},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.");T=e,this.hasBeenReset=!0}}),Object.defineProperty(i,"align",{enumerable:!0,get:function(){return k},set:function(e){var t=r(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");k=t,this.hasBeenReset=!0}}),i.displayState=void 0}).prototype.getCueAsHTML=function(){return window.WebVTT.convertCueToDOMTree(window,this.text)}}t.a=i},68:function(e,t,n){"use strict";var i=n(67),r=n(8),a=n(27),s=n(4),c=n(62),o=n(2),u=n(1);function d(e){throw new u.s(null,e)}function l(e,t,i){e.xhr=Object(a.a)(e.file,function(a){!function(e,t,i,a){var l=e.responseXML?e.responseXML.firstChild:null,h=void 0,v=void 0;if(l)for("xml"===Object(s.b)(l)&&(l=l.nextSibling);l.nodeType===l.COMMENT_NODE;)l=l.nextSibling;try{if(l&&"tt"===Object(s.b)(l))h=function(e){e||d(306007);var t=[],n=e.getElementsByTagName("p"),i=30,r=e.getElementsByTagName("tt");if(r&&r[0]){var a=parseFloat(r[0].getAttribute("ttp:frameRate"));isNaN(a)||(i=a)}n||d(306005),n.length||(n=e.getElementsByTagName("tt:p")).length||(n=e.getElementsByTagName("tts:p"));for(var s=0;s<n.length;s++){for(var c=n[s],u=c.getElementsByTagName("br"),l=0;l<u.length;l++){var h=u[l];h.parentNode.replaceChild(e.createTextNode("\r\n"),h)}var f=c.innerHTML||c.textContent||c.text||"",v=Object(o.h)(f).replace(/>\s+</g,"><").replace(/(<\/?)tts?:/g,"$1").replace(/<br.*?\/>/g,"\r\n");if(v){var g=c.getAttribute("begin"),T=c.getAttribute("dur"),k=c.getAttribute("end"),b={begin:Object(o.f)(g,i),text:v};k?b.end=Object(o.f)(k,i):T&&(b.end=b.begin+Object(o.f)(T,i)),t.push(b)}}return t.length||d(306005),t}(e.responseXML),v=f(h),delete t.xhr,i(v);else{var g=e.responseText;g.indexOf("WEBVTT")>=0?n.e(16).then(function(e){return n(137).default}.bind(null,n)).catch(Object(r.c)(301131)).then(function(e){var n=new e(window);v=[],n.oncue=function(e){v.push(e)},n.onflush=function(){delete t.xhr,i(v)},n.parse(g)}).catch(function(e){delete t.xhr,a(Object(u.A)(null,u.b,e))}):(h=Object(c.a)(g),v=f(h),delete t.xhr,i(v))}}catch(e){delete t.xhr,a(Object(u.A)(null,u.b,e))}}(a,e,t,i)},function(e,t,n,r){i(Object(u.z)(r,u.b))})}function h(e){e&&e.forEach(function(e){var t=e.xhr;t&&(t.onload=null,t.onreadystatechange=null,t.onerror=null,"abort"in t&&t.abort()),delete e.xhr})}function f(e){return e.map(function(e){return new i.a(e.begin,e.end,e.text)})}n.d(t,"c",function(){return l}),n.d(t,"a",function(){return h}),n.d(t,"b",function(){return f})},69:function(e,t,n){"use strict";function i(e,t){var n=e.kind||"cc";return e.default||e.defaulttrack?"default":e._id||e.file||n+t}function r(e,t){var n=e.label||e.name||e.language;return n||(n="Unknown CC",(t+=1)>1&&(n+=" ["+t+"]")),{label:n,unknownCount:t}}n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r})},71:function(e,t,n){"use strict";function i(e){return new Promise(function(t,n){if(e.paused)return n(r("NotAllowedError",0,"play() failed."));var i=function(){e.removeEventListener("play",a),e.removeEventListener("playing",s),e.removeEventListener("pause",s),e.removeEventListener("abort",s),e.removeEventListener("error",s)},a=function(){e.addEventListener("playing",s),e.addEventListener("abort",s),e.addEventListener("error",s),e.addEventListener("pause",s)},s=function(e){if(i(),"playing"===e.type)t();else{var a='The play() request was interrupted by a "'+e.type+'" event.';"error"===e.type?n(r("NotSupportedError",9,a)):n(r("AbortError",20,a))}};e.addEventListener("play",a)})}function r(e,t,n){var i=new Error(n);return i.name=e,i.code=t,i}n.d(t,"a",function(){return i})},72:function(e,t,n){"use strict";function i(e,t){return e!==1/0&&Math.abs(e)>=Math.max(a(t),0)}function r(e,t){var n="VOD";return e===1/0?n="LIVE":e<0&&(n=i(e,a(t))?"DVR":"LIVE"),n}function a(e){return void 0===e?120:Math.max(e,0)}n.d(t,"a",function(){return i}),n.d(t,"b",function(){return r})},74:function(e,t,n){"use strict";n.d(t,"c",function(){return r}),n.d(t,"b",function(){return a}),n.d(t,"a",function(){return s});var i={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"};function r(e,t){for(var n=e.length,i=void 0,r=void 0,a=void 0,s="",c=t||0;c<n;)if(0!==(i=e[c++])&&3!==i)switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(i);break;case 12:case 13:r=e[c++],s+=String.fromCharCode((31&i)<<6|63&r);break;case 14:r=e[c++],a=e[c++],s+=String.fromCharCode((15&i)<<12|(63&r)<<6|(63&a)<<0)}return s}function a(e){var t=function(e){for(var t="0x",n=0;n<e.length;n++)e[n]<16&&(t+="0"),t+=e[n].toString(16);return parseInt(t)}(e);return 127&t|(32512&t)>>1|(8323072&t)>>2|(2130706432&t)>>3}function s(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){if(!("value"in t)&&"data"in t&&t.data instanceof ArrayBuffer){var n=new Uint8Array(t.data),s=n.length;t={value:{key:"",data:""}};for(var c=10;c<14&&c<n.length&&0!==n[c];)t.value.key+=String.fromCharCode(n[c]),c++;var o=19,u=n[o];3!==u&&0!==u||(u=n[++o],s--);var d=0;if(1!==u&&2!==u)for(var l=o+1;l<s;l++)if(0===n[l]){d=l-o;break}if(d>0){var h=r(n.subarray(o,o+=d),0);if("PRIV"===t.value.key){if("com.apple.streaming.transportStreamTimestamp"===h){var f=1&a(n.subarray(o,o+=4)),v=a(n.subarray(o,o+=4))+(f?4294967296:0);t.value.data=v}else t.value.data=r(n,o+1);t.value.info=h}else t.value.info=h,t.value.data=r(n,o+1)}else{var g=n[o];t.value.data=1===g||2===g?function(e,t){for(var n=e.length-1,i="",r=t||0;r<n;)254===e[r]&&255===e[r+1]||(i+=String.fromCharCode((e[r]<<8)+e[r+1])),r+=2;return i}(n,o+1):r(n,o+1)}}if(i.hasOwnProperty(t.value.key)&&(e[i[t.value.key]]=t.value.data),t.value.info){var T=e[t.value.key];T!==Object(T)&&(T={},e[t.value.key]=T),T[t.value.info]=t.value.data}else e[t.value.key]=t.value.data;return e},{})}},76:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return a});var i=n(8);function r(e){return window.WebGLRenderingContext&&e.some(function(e){return e.stereomode&&e.stereomode.length>0})}function a(e,t,r){var a=function(e){r.trigger("warning",e)};return n.e(13).then(function(i){var r=new(0,n(78).default)(e,t);e.addPlugin("vr",r),r.on("error",a)}.bind(null,n)).catch(Object(i.c)(301132)).catch(a)}},77:function(e,t,n){"use strict";var i=n(68),r=n(69),a=n(74),s=n(7),c=n(3),o=n(0),u={_itemTracks:null,_textTracks:null,_tracksById:null,_cuesByTrackId:null,_cachedVTTCues:null,_metaCuesByTextTime:null,_currentTextTrackIndex:-1,_unknownCount:0,_activeCuePosition:null,_initTextTracks:function(){this._textTracks=[],this._tracksById={},this._metaCuesByTextTime={},this._cuesByTrackId={},this._cachedVTTCues={},this._unknownCount=0},addTracksListener:function(e,t,n){if(!e)return;if(d(e,t,n),this.instreamMode)return;e.addEventListener?e.addEventListener(t,n):e["on"+t]=n},clearTracks:function(){Object(i.a)(this._itemTracks);var e=this._tracksById&&this._tracksById.nativemetadata;(this.renderNatively||e)&&(f(this.renderNatively,this.video.textTracks),e&&(e.oncuechange=null));this._itemTracks=null,this._textTracks=null,this._tracksById=null,this._cuesByTrackId=null,this._metaCuesByTextTime=null,this._unknownCount=0,this._currentTextTrackIndex=-1,this._activeCuePosition=null,this.renderNatively&&(this.removeTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),f(this.renderNatively,this.video.textTracks))},clearCueData:function(e){var t=this._cachedVTTCues;t&&t[e]&&(t[e]={},this._tracksById&&(this._tracksById[e].data=[]))},disableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];if(e){e.mode="disabled";var t=e._id;t&&0===t.indexOf("nativecaptions")&&(e.mode="hidden")}}},enableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];e&&(e.mode="showing")}},getSubtitlesTrack:function(){return this._currentTextTrackIndex},removeTracksListener:d,addTextTracks:l,setTextTracks:function(e){if(this._currentTextTrackIndex=-1,!e)return;this._textTracks?(this._unknownCount=0,this._textTracks=this._textTracks.filter(function(e){var t=e._id;return this.renderNatively&&t&&0===t.indexOf("nativecaptions")?(delete this._tracksById[t],!1):(e.name&&0===e.name.indexOf("Unknown")&&this._unknownCount++,!0)},this),delete this._tracksById.nativemetadata):this._initTextTracks();if(e.length)for(var t=0,n=e.length;t<n;t++){var i=e[t];if(!i._id){if("captions"===i.kind||"metadata"===i.kind){if(i._id="native"+i.kind+t,!i.label&&"captions"===i.kind){var a=Object(r.b)(i,this._unknownCount);i.name=a.label,this._unknownCount=a.unknownCount}}else i._id=Object(r.a)(i,this._textTracks.length);if(this._tracksById[i._id])continue;i.inuse=!0}if(i.inuse&&!this._tracksById[i._id])if("metadata"===i.kind)i.mode="hidden",i.oncuechange=k.bind(this),this._tracksById[i._id]=i;else if(v(i.kind)){var c=i.mode,u=void 0;if(i.mode="hidden",!i.cues.length&&i.embedded)continue;if(i.mode=c,this._cuesByTrackId[i._id]&&!this._cuesByTrackId[i._id].loaded){for(var d=this._cuesByTrackId[i._id].cues;u=d.shift();)h(this.renderNatively,i,u);i.mode=c,this._cuesByTrackId[i._id].loaded=!0}T.call(this,i)}}this.renderNatively&&(this.textTrackChangeHandler=this.textTrackChangeHandler||function(){var e=this.video.textTracks,t=Object(o.k)(e,function(e){return(e.inuse||!e._id)&&v(e.kind)});if(!this._textTracks||function(e){if(e.length>this._textTracks.length)return!0;for(var t=0;t<e.length;t++){var n=e[t];if(!n._id||!this._tracksById[n._id])return!0}return!1}.call(this,t))return void this.setTextTracks(e);for(var n=-1,i=0;i<this._textTracks.length;i++)if("showing"===this._textTracks[i].mode){n=i;break}n!==this._currentTextTrackIndex&&this.setSubtitlesTrack(n+1)}.bind(this),this.addTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),(s.Browser.edge||s.Browser.firefox||s.Browser.safari)&&(this.addTrackHandler=this.addTrackHandler||function(){this.setTextTracks(this.video.textTracks)}.bind(this),this.addTracksListener(this.video.textTracks,"addtrack",this.addTrackHandler)));this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})},setupSideloadedTracks:function(e){if(!this.renderNatively)return;var t=e===this._itemTracks;t||Object(i.a)(this._itemTracks);if(this._itemTracks=e,!e)return;t||(this.disableTextTrack(),function(){if(!this._textTracks)return;var e=this._textTracks.filter(function(e){return e.embedded||"subs"===e.groupid});this._initTextTracks(),e.forEach(function(e){this._tracksById[e._id]=e}),this._textTracks=e}.call(this),this.addTextTracks(e))},setSubtitlesTrack:function(e){if(!this.renderNatively)return void(this.setCurrentSubtitleTrack&&this.setCurrentSubtitleTrack(e-1));if(!this._textTracks)return;0===e&&this._textTracks.forEach(function(e){e.mode=e.embedded?"hidden":"disabled"});if(this._currentTextTrackIndex===e-1)return;this.disableTextTrack(),this._currentTextTrackIndex=e-1,this._textTracks[this._currentTextTrackIndex]&&(this._textTracks[this._currentTextTrackIndex].mode="showing");this.trigger("subtitlesTrackChanged",{currentTrack:this._currentTextTrackIndex+1,tracks:this._textTracks})},textTrackChangeHandler:null,addTrackHandler:null,addCuesToTrack:function(e){var t=this._tracksById[e.name];if(!t)return;t.source=e.source;for(var n=e.captions||[],r=[],a=!1,s=0;s<n.length;s++){var c=n[s],o=e.name+"_"+c.begin+"_"+c.end;this._metaCuesByTextTime[o]||(this._metaCuesByTextTime[o]=c,r.push(c),a=!0)}a&&r.sort(function(e,t){return e.begin-t.begin});var u=Object(i.b)(r);Array.prototype.push.apply(t.data,u)},addCaptionsCue:function(e){if(!e.text||!e.begin||!e.end)return;var t=e.trackid.toString(),n=this._tracksById&&this._tracksById[t];n||(n={kind:"captions",_id:t,data:[]},this.addTextTracks([n]),this.trigger("subtitlesTracks",{tracks:this._textTracks}));var r=void 0;e.useDTS&&(n.source||(n.source=e.source||"mpegts"));r=e.begin+"_"+e.text;var a=this._metaCuesByTextTime[r];if(!a){a={begin:e.begin,end:e.end,text:e.text},this._metaCuesByTextTime[r]=a;var s=Object(i.b)([a])[0];n.data.push(s)}},addVTTCue:function(e){this._tracksById||this._initTextTracks();var t=e.track?e.track:"native"+e.type,n=this._tracksById[t],i="captions"===e.type?"Unknown CC":"ID3 Metadata",r=e.cue;if(!n){var a={kind:e.type,_id:t,label:i,embedded:!0};n=g.call(this,a),this.renderNatively||"metadata"===n.kind?this.setTextTracks(this.video.textTracks):l.call(this,[n])}(function(e,t){var n=e.kind;this._cachedVTTCues[e._id]||(this._cachedVTTCues[e._id]={});var i=this._cachedVTTCues[e._id],r=void 0;switch(n){case"captions":case"subtitles":r=Math.floor(20*t.startTime);var a="_"+t.line,s=Math.floor(20*t.endTime),c=i[r+a]||i[r+1+a]||i[r-1+a];return!(c&&Math.abs(c-s)<=1)&&(i[r+a]=s,!0);case"metadata":var o=t.data?new Uint8Array(t.data).join(""):t.text;return r=t.startTime+o,i[r]?!1:(i[r]=t.endTime,!0);default:return!1}}).call(this,n,r)&&(this.renderNatively||"metadata"===n.kind?h(this.renderNatively,n,r):n.data.push(r))},addVTTCuesToTrack:function(e,t){if(!this.renderNatively)return;var n=this._tracksById[e._id];if(!n)return this._cuesByTrackId||(this._cuesByTrackId={}),void(this._cuesByTrackId[e._id]={cues:t,loaded:!1});if(this._cuesByTrackId[e._id]&&this._cuesByTrackId[e._id].loaded)return;var i=void 0;this._cuesByTrackId[e._id]={cues:t,loaded:!0};for(;i=t.shift();)h(this.renderNatively,n,i)},renderNatively:!1};function d(e,t,n){e&&(e.removeEventListener?e.removeEventListener(t,n):e["on"+t]=null)}function l(e){var t=this;e&&(this._textTracks||this._initTextTracks(),e.forEach(function(e){if(!e.kind||v(e.kind)){var n=g.call(t,e);T.call(t,n),e.file&&(e.data=[],Object(i.c)(e,function(e){t.addVTTCuesToTrack(n,e)},function(e){t.trigger(c.Ta,e)}))}}),this._textTracks&&this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks}))}function h(e,t,n){if(s.Browser.ie&&e&&window.TextTrackCue){var i=new window.TextTrackCue(n.startTime,n.endTime,n.text);t.addCue(i)}else t.addCue(n)}function f(e,t){t&&t.length&&Object(o.i)(t,function(t){if(!(s.Browser.ie&&e&&/^(native|subtitle|cc)/.test(t._id))){t.mode="disabled",t.mode="hidden";for(var n=t.cues.length;n--;)t.removeCue(t.cues[n]);t.embedded||(t.mode="disabled"),t.inuse=!1}})}function v(e){return"subtitles"===e||"captions"===e}function g(e){var t=void 0,n=Object(r.b)(e,this._unknownCount),i=n.label;if(this._unknownCount=n.unknownCount,this.renderNatively||"metadata"===e.kind){var a=this.video.textTracks;(t=Object(o.m)(a,{label:i}))||(t=this.video.addTextTrack(e.kind,i,e.language||"")),t.default=e.default,t.mode="disabled",t.inuse=!0}else(t=e).data=t.data||[];return t._id||(t._id=Object(r.a)(e,this._textTracks.length)),t}function T(e){this._textTracks.push(e),this._tracksById[e._id]=e}function k(e){var t=e.currentTarget.activeCues;if(t&&t.length){var n=t[t.length-1].startTime;if(this._activeCuePosition!==n){var i=[];if(Object(o.i)(t,function(e){e.startTime<n||(e.data||e.value?i.push(e):e.text&&this.trigger("meta",{metadataTime:n,metadata:JSON.parse(e.text)}))},this),i.length){var r=Object(a.a)(i);this.trigger("meta",{metadataTime:n,metadata:r})}this._activeCuePosition=n}}}t.a=u},79:function(e,t,n){"use strict";function i(e){return e&&e.length?e.end(e.length-1):0}n.d(t,"a",function(){return i})}}]);