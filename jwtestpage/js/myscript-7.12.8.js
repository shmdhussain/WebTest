var setup = {
    primary: "html5",
    autostart: true,
    repeat: true,
    mute: true,
    width: '100%',
    height: '100%',
    //aspectratio: '16:9',
    stretching: 'uniform',
    androidhls: true,
    localization: {
        nextUp: ' التالي'
    },
    "hlshtml": true,

    //skin: '/static/web-rev/js/lib/jwplayer/skin/six.xml',
    ga: {
        label: "title"
    },

    // logo: {
    //     file: 'https://asset1.skynewsarabia.com/static/web-rev/img/logo.png',
    //     link: 'https://www.skynewsarabia.com',
    //     position: "top-left"
    // },
    // abouttext: "Video Available at www.skynewsarabia.com",
    // aboutlink: "http://www.blender.org"
    plugins: {
        'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js': {}
    }
}
setup.playlist = [{
    // file: "http://fshwebt.skynewsarabia.com/media/videos/2017/10/23/video-986008-1508772223140.mp4",
    file: "video/test.mp4",
}];



var player = jwplayer("testdiv").setup(setup);