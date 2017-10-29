// var setup = {
//     primary: "html5",
//     autostart: true,
//     repeat: true,
//     mute: true,
//     width: '100%',
//     height: '100%',
//     //aspectratio: '16:9',
//     stretching: 'uniform',
//     androidhls: true,
//     localization: {
//         nextUp: ' التالي'
//     },
//     "hlshtml": true,
//     stereomode: 'monoscopic',
//     //skin: '/static/web-rev/js/lib/jwplayer/skin/six.xml',
//     ga: {
//         label: "title"
//     },

//     plugins: {
//         'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js': {}
//     }
// }
// setup.playlist = [{
//     // file: "http://fshwebt.skynewsarabia.com/media/videos/2017/10/23/video-986008-1508772223140.mp4",
//     file: "video/test.mp4",
// }];



var sources1 = [{
        "file": "video/test.mp4",
        "height": 720,
        "label": "720p",
        "type": "video/mp4",
        "width": 1280
    }

];
var sources2 = [{
        "file": "http://fshwebt.skynewsarabia.com/media/videos/2017/10/24/video-991002-1508856746872.mp4",
        "height": 720,
        "label": "720p",
        "type": "video/mp4",
        "width": 1280
    }

];
var setup = {
    primary: 'html5',
    hlshtml: true,
    width: '100%',
    aspectratio: '16:9',
    playlist: [{
        title: 'Caminandes VR',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        stereomode: 'monoscopic',
        sources: sources1,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    },{
        title: 'Caminandes VR',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        stereomode: 'monoscopic',
        sources: sources2,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }]
}
var player = jwplayer("testdiv").setup(setup);