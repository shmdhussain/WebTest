var sources1 = [{
        //360 video
        "file": "https://media.skynewsarabia.com/media/videos/2018/02/19/WEB-CHI-USA-360-HAWAMDA_2018-02-19_18:28:11.mp4",
        "height": 720,
        "label": "720p",
        "type": "video/mp4",
        "width": 1280
    }
];

var sources2 = [{
        "file": "https://media.skynewsarabia.com/vod/smil:1173740.smil/1173740.m3u8",
        "height": 720,
        // "label": "720p",
        // "type": "video/mp4",
        "width": 1280
    }
];

var sources3 = [{
        "file": "https://media.skynewsarabia.com/vod/smil:1173775.smil/1173775.m3u8",
        "height": 720,
        // "label": "720p",
        // "type": "video/mp4",
        "width": 1280
    }

];

var sources4 = [{
        "file": "https://media.skynewsarabia.com/vod/smil:1184015.smil/1184015.m3u8",
        "height": 720,
        // "label": "720p",
        // "type": "video/mp4",
        "width": 1280
    }

];

var sources5 = [{
        "file": "https://media.skynewsarabia.com/vod/smil:1183775.smil/1183775.m3u8",
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
    playlist: [ {
        //360 video thats why monoscopic
        title: 'SNA Video One',
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
        title: 'SNA Video Two',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        // stereomode: 'monoscopic',
        sources: sources2,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }, {
        title: 'SNA Video Three',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        // stereomode: 'monoscopic',
        sources: sources3,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }, {
        title: 'SNA Video Four',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        // stereomode: 'monoscopic',
        sources: sources4,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }, {
        title: 'SNA Video Five',
        mediaid: 'AgqYcfAT',
        image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
        link: '//content.jwplatform.com/previews/AgqYcfAT',
        // stereomode: 'monoscopic',
        sources: sources5,
        tracks: [{
            file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
            kind: 'thumbnails'
        }]
    }],
    advertising: {
        "tag": "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=vmap&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ar%3Dpreonly&cmsid=496&vid=short_onecue&correlator=",
        "client": "googima",
        "vpaidmode": "insecure",
        "rules": {
                    "startOn": 1,
                    "frequency": 5
        }
    }
}
var player = jwplayer("testdiv").setup(setup);