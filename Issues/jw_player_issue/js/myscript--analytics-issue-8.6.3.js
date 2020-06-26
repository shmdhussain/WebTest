var sources3 = [{
        "file": "https://media.skynewsarabia.com/vod/smil:1173775.smil/1173775.m3u8",
        "height": 720,
        // "label": "720p",
        // "type": "video/mp4",
        "width": 1280
    }

];


var setup = {
    primary: 'html5',
    hlshtml: true,
    width: '100%',
    aspectratio: '16:9',
    playlist: [{
        title: 'SNA test video',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        // stereomode: 'monoscopic',
        sources: sources3,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }],
    ga: {
        label: "title"
    }
}
var player = jwplayer("testdiv").setup(setup);