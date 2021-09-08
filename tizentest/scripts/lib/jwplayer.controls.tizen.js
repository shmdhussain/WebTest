/*!
   JW Player version 8.21.2
   Copyright (c) 2021, JW Player, All Rights Reserved
   This source code and its use and distribution is subject to the terms
   and conditions of the applicable license agreement.
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.21.2/notice.txt
*/
(window.webpackJsonpjwplayer = window.webpackJsonpjwplayer || []).push([[3, 2], Array(69).concat([function(t, e, i) {
    "use strict";
    i.r(e);
    var n = {};
    i.r(n),
    i.d(n, "facebook", (function() {
        return jt
    }
    )),
    i.d(n, "twitter", (function() {
        return ht
    }
    )),
    i.d(n, "linkedin", (function() {
        return ft
    }
    )),
    i.d(n, "pinterest", (function() {
        return gt
    }
    )),
    i.d(n, "reddit", (function() {
        return bt
    }
    )),
    i.d(n, "tumblr", (function() {
        return mt
    }
    )),
    i.d(n, "email", (function() {
        return vt
    }
    )),
    i.d(n, "link", (function() {
        return yt
    }
    )),
    i.d(n, "embed", (function() {
        return xt
    }
    ));
    var o = i(5)
      , a = i(3)
      , s = i(9)
      , r = i(52)
      , l = i(7)
      , c = i(18)
      , p = i(75)
      , w = i(128)
      , u = i(126)
      , d = i(0)
      , j = i(11)
      , h = i(34)
      , f = i(73)
      , g = i(2)
      , b = i(53)
      , m = i(12)
      , v = i(74)
      , y = function() {
        function t(t, e, i) {
            Object(d.j)(this, s.a),
            this._model = t,
            this._api = e,
            this._playerElement = i,
            this.localization = t.get("localization"),
            this.state = "tooltip",
            this.enabled = !1,
            this.shown = !1,
            this.feedShownId = "",
            this.closeUi = null,
            this.tooltipUi = null,
            this.reset()
        }
        var e = t.prototype;
        return e.setup = function(t) {
            this.container = t.createElement("div"),
            this.container.className = "jw-nextup-container jw-reset";
            var e, i, n, o, a = Object(l.e)((void 0 === e && (e = ""),
            void 0 === i && (i = ""),
            void 0 === n && (n = ""),
            void 0 === o && (o = ""),
            '<div class="jw-nextup jw-background-color jw-reset"><div class="jw-nextup-tooltip jw-reset"><div class="jw-nextup-thumbnail jw-reset"></div><div class="jw-nextup-body jw-reset"><div class="jw-nextup-header jw-reset">' + e + '</div><div class="jw-nextup-title jw-reset-text" dir="auto">' + i + '</div><div class="jw-nextup-duration jw-reset">' + n + '</div></div></div><button type="button" class="jw-icon jw-nextup-close jw-reset" aria-label="' + o + '"></button></div>'));
            a.querySelector(".jw-nextup-close").appendChild(Object(f.a)("close")),
            this.addContent(a),
            this.closeButton = this.content.querySelector(".jw-nextup-close"),
            this.closeButton.setAttribute("aria-label", this.localization.close),
            this.tooltip = this.content.querySelector(".jw-nextup-tooltip");
            var s = this._model
              , r = s.player;
            this.enabled = !1,
            s.on("change:nextUp", this.onNextUp, this),
            r.change("duration", this.onDuration, this),
            r.change("position", this.onElapsed, this),
            r.change("streamType", this.onStreamType, this),
            r.change("state", (function(t, e) {
                "complete" === e && this.toggle(!1)
            }
            ), this),
            this.closeUi = Object(v.a)(this.closeButton, (function() {
                this.nextUpSticky = !1,
                this.toggle(!1)
            }
            ), this),
            this.tooltipUi = new h.a(this.tooltip).on("click", this.click, this)
        }
        ,
        e.loadThumbnail = function(t) {
            return this.nextUpImage = new Image,
            this.nextUpImage.onload = function() {
                this.nextUpImage.onload = null
            }
            .bind(this),
            this.nextUpImage.src = t,
            {
                backgroundImage: 'url("' + t + '")'
            }
        }
        ,
        e.click = function() {
            var t = this.feedShownId;
            this.reset(),
            this._api.next({
                feedShownId: t,
                reason: "interaction"
            })
        }
        ,
        e.toggle = function(t, e) {
            if (this.enabled && (Object(l.v)(this.container, "jw-nextup-sticky", !!this.nextUpSticky),
            this.shown !== t)) {
                this.shown = t,
                Object(l.v)(this.container, "jw-nextup-container-visible", t),
                Object(l.v)(this._playerElement, "jw-flag-nextup", t);
                var i = this._model.get("nextUp");
                t && i ? (this.feedShownId = Object(b.b)(b.a),
                this.trigger("nextShown", {
                    mode: i.mode,
                    ui: "nextup",
                    itemsShown: [i],
                    feedData: i.feedData,
                    reason: e,
                    feedShownId: this.feedShownId
                })) : this.feedShownId = ""
            }
        }
        ,
        e.setNextUpItem = function(t) {
            var e = this;
            setTimeout((function() {
                if (e.thumbnail = e.content.querySelector(".jw-nextup-thumbnail"),
                Object(l.v)(e.content, "jw-nextup-thumbnail-visible", !!t.image),
                t.image) {
                    var i = e.loadThumbnail(t.image);
                    Object(j.d)(e.thumbnail, i)
                }
                e.header = e.content.querySelector(".jw-nextup-header"),
                e.header.textContent = Object(l.e)(e.localization.nextUp).textContent,
                e.title = e.content.querySelector(".jw-nextup-title");
                var n = t.title;
                e.title.textContent = n ? Object(l.e)(n).textContent : "";
                var o = t.duration;
                o && (e.duration = e.content.querySelector(".jw-nextup-duration"),
                e.duration.textContent = "number" == typeof o ? Object(m.timeFormat)(o) : o)
            }
            ), 500)
        }
        ,
        e.onNextUp = function(t, e) {
            this.reset(),
            e || (e = {
                showNextUp: !1
            }),
            this.enabled = !(!e.title && !e.image),
            this.enabled && (e.showNextUp || (this.nextUpSticky = !1,
            this.toggle(!1)),
            this.setNextUpItem(e))
        }
        ,
        e.onDuration = function(t, e) {
            if (e) {
                var i = t.get("nextupoffset")
                  , n = -10;
                i && (n = Object(g.d)(i, e)),
                n < 0 && (n += e),
                Object(g.c)(i) && e - 5 < n && (n = e - 5),
                this.offset = n
            }
        }
        ,
        e.onElapsed = function(t, e) {
            var i = this.nextUpSticky;
            if (this.enabled && !1 !== i) {
                var n = e >= this.offset;
                n && void 0 === i ? (this.nextUpSticky = n,
                this.toggle(n, "time")) : !n && i && this.reset()
            }
        }
        ,
        e.onStreamType = function(t, e) {
            "VOD" !== e && (this.nextUpSticky = !1,
            this.toggle(!1))
        }
        ,
        e.element = function() {
            return this.container
        }
        ,
        e.addContent = function(t) {
            this.content && this.removeContent(),
            this.content = t,
            this.container.appendChild(t)
        }
        ,
        e.removeContent = function() {
            this.content && (this.container.removeChild(this.content),
            this.content = null)
        }
        ,
        e.reset = function() {
            this.nextUpSticky = void 0,
            this.toggle(!1)
        }
        ,
        e.destroy = function() {
            this.off(),
            this._model.off(null, null, this),
            this.closeUi && this.closeUi.destroy(),
            this.tooltipUi && this.tooltipUi.destroy()
        }
        ,
        t
    }()
      , x = function(t, e) {
        var i = t.featured
          , n = t.showLogo
          , o = t.type;
        return t.logo = n ? '<span class="jw-rightclick-logo jw-reset"></span>' : "",
        '<li class="jw-reset jw-rightclick-item ' + (i ? "jw-featured" : "") + '">' + k[o](t, e) + "</li>"
    }
      , k = {
        link: function(t) {
            var e = t.link
              , i = t.title;
            return '<a href="' + (e || "") + '" class="jw-rightclick-link jw-reset-text" target="_blank" rel="noreferrer" dir="auto">' + t.logo + (i || "") + "</a>"
        },
        info: function(t, e) {
            return '<button type="button" class="jw-reset-text jw-rightclick-link jw-info-overlay-item" dir="auto">' + e.videoInfo + "</button>"
        },
        share: function(t, e) {
            return '<button type="button" class="jw-reset-text jw-rightclick-link jw-share-item" dir="auto">' + e.sharing.heading + "</button>"
        },
        pip: function(t, e) {
            return '<button type="button" class="jw-reset-text jw-rightclick-link jw-pip-item" dir="auto">' + e.pipIcon + "</button>"
        },
        keyboardShortcuts: function(t, e) {
            return '<button type="button" class="jw-reset-text jw-rightclick-link jw-shortcuts-item" dir="auto">' + e.shortcuts.keyboardShortcuts + "</button>"
        }
    }
      , O = i(29)
      , C = i(13)
      , z = {
        free: 0,
        pro: 1,
        premium: 2,
        ads: 3,
        invalid: 4,
        enterprise: 6,
        trial: 7,
        platinum: 8,
        starter: 9,
        business: 10,
        developer: 11
    };
    function T(t) {
        var e = Object(l.e)(t)
          , i = e.querySelector(".jw-rightclick-logo");
        return i && i.appendChild(Object(f.a)("jwplayer-logo")),
        e
    }
    function S(t, e) {
        return (S = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var M = function(t) {
        var e, i;
        function n() {
            return t.apply(this, arguments) || this
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        S(e, i);
        var o = n.prototype;
        return o.buildArray = function() {
            var e = this.model
              , i = t.prototype.buildArray.call(this)
              , n = e.get("localization").abouttext
              , o = i.items;
            if (n) {
                for (var a, s, r = 0; r < o.length; r++)
                    if (o[r].featured) {
                        s = o[r],
                        a = r;
                        break
                    }
                if (s) {
                    s.showLogo = !1;
                    var l = {
                        title: n,
                        type: "link",
                        link: e.get("aboutlink") || s.link
                    };
                    o[a] = l
                }
            }
            return this.shareHandler && o.unshift({
                type: "share"
            }),
            i
        }
        ,
        o.enableSharing = function(t) {
            var e = this;
            this.shareHandler = function() {
                e.mouseOverContext = !1,
                e.hideMenu(),
                t()
            }
        }
        ,
        o.addHideMenuHandlers = function() {
            t.prototype.addHideMenuHandlers.call(this);
            var e = this.el.querySelector(".jw-share-item");
            e && e.addEventListener("click", this.shareHandler)
        }
        ,
        o.removeHideMenuHandlers = function() {
            if (t.prototype.removeHideMenuHandlers.call(this),
            this.el) {
                var e = this.el.querySelector(".jw-share-item");
                e && e.removeEventListener("click", this.shareHandler)
            }
        }
        ,
        n
    }(function() {
        function t(t, e) {
            this.infoOverlay = t,
            this.shortcutsTooltip = e
        }
        var e = t.prototype;
        return e.buildArray = function() {
            var t = O.a.split("+")[0]
              , e = this.model
              , i = e.get("edition")
              , n = e.get("localization").poweredBy
              , a = '<span class="jw-reset">JW Player ' + t + "</span>"
              , s = {
                items: [{
                    type: "info"
                }, {
                    title: Object(C.g)(n) ? a + " " + n : n + " " + a,
                    type: "link",
                    featured: !0,
                    showLogo: !0,
                    link: "https://jwplayer.com/learn-more?e=" + z[i]
                }]
            }
              , r = s.items;
            return this.shortcutsTooltip && r.splice(r.length - 1, 0, {
                type: "keyboardShortcuts"
            }),
            this.pipMenu = !o.OS.mobile && "disabled" !== e.get("pipIcon") && (o.Browser.chrome || o.Browser.edge || o.Browser.safari),
            this.pipMenu && r.splice(r.length - 1, 0, {
                type: "pip"
            }),
            s
        }
        ,
        e.rightClick = function(t) {
            if (this.lazySetup(),
            this.mouseOverContext)
                return !1;
            this.hideMenu(),
            this.showMenu(t),
            this.addHideMenuHandlers()
        }
        ,
        e.getOffset = function(t) {
            var e = Object(l.c)(this.wrapperElement)
              , i = t.pageX - e.left
              , n = t.pageY - e.top;
            return this.model.get("touchMode") && (n -= 100),
            {
                x: i,
                y: n
            }
        }
        ,
        e.showMenu = function(t) {
            var e = this
              , i = this.getOffset(t);
            return this.el.style.left = i.x + "px",
            this.el.style.top = i.y + "px",
            this.outCount = 0,
            Object(l.a)(this.playerContainer, "jw-flag-rightclick-open"),
            Object(l.a)(this.el, "jw-open"),
            clearTimeout(this._menuTimeout),
            this._menuTimeout = setTimeout((function() {
                return e.hideMenu()
            }
            ), 3e3),
            !1
        }
        ,
        e.hideMenu = function(t) {
            t && this.el && this.el.contains(t.target) || (Object(l.o)(this.playerContainer, "jw-flag-rightclick-open"),
            Object(l.o)(this.el, "jw-open"))
        }
        ,
        e.lazySetup = function() {
            var t, e, i, n = this, o = (t = this.buildArray(),
            e = this.model.get("localization"),
            '<div class="jw-rightclick jw-reset"><ul class="jw-rightclick-list jw-reset">' + (void 0 === (i = t.items) ? [] : i).map((function(t) {
                return x(t, e)
            }
            )).join("") + "</ul></div>");
            if (this.el) {
                if (this.html !== o) {
                    this.html = o;
                    var a = T(o);
                    Object(l.h)(this.el);
                    for (var s = a.childNodes.length; s--; )
                        this.el.appendChild(a.firstChild)
                }
            } else
                this.html = o,
                this.el = T(this.html),
                this.wrapperElement.appendChild(this.el),
                this.hideMenuHandler = function(t) {
                    return n.hideMenu(t)
                }
                ,
                this.overHandler = function() {
                    n.mouseOverContext = !0
                }
                ,
                this.outHandler = function(t) {
                    n.mouseOverContext = !1,
                    t.relatedTarget && !n.el.contains(t.relatedTarget) && ++n.outCount > 1 && n.hideMenu()
                }
                ,
                this.infoOverlayHandler = function() {
                    n.mouseOverContext = !1,
                    n.hideMenu(),
                    n.infoOverlay.open()
                }
                ,
                this.pipHandler = function() {
                    n.model.set("pip", !n.model.get("pip"))
                }
                ,
                this.shortcutsTooltipHandler = function() {
                    n.mouseOverContext = !1,
                    n.hideMenu(),
                    n.shortcutsTooltip.open()
                }
        }
        ,
        e.setup = function(t, e, i) {
            this.wrapperElement = i,
            this.model = t,
            this.mouseOverContext = !1,
            this.playerContainer = e,
            this.ui = new h.a(i).on("longPress", this.rightClick, this)
        }
        ,
        e.addHideMenuHandlers = function() {
            this.removeHideMenuHandlers(),
            this.wrapperElement.addEventListener("touchstart", this.hideMenuHandler),
            document.addEventListener("touchstart", this.hideMenuHandler),
            o.OS.mobile || (this.wrapperElement.addEventListener("click", this.hideMenuHandler),
            document.addEventListener("click", this.hideMenuHandler),
            this.el.addEventListener("mouseover", this.overHandler),
            this.el.addEventListener("mouseout", this.outHandler)),
            this.el.querySelector(".jw-info-overlay-item").addEventListener("click", this.infoOverlayHandler),
            this.pipMenu && this.el.querySelector(".jw-pip-item").addEventListener("click", this.pipHandler),
            this.shortcutsTooltip && this.el.querySelector(".jw-shortcuts-item").addEventListener("click", this.shortcutsTooltipHandler)
        }
        ,
        e.removeHideMenuHandlers = function() {
            this.wrapperElement && (this.wrapperElement.removeEventListener("click", this.hideMenuHandler),
            this.wrapperElement.removeEventListener("touchstart", this.hideMenuHandler)),
            this.el && (this.el.querySelector(".jw-info-overlay-item").removeEventListener("click", this.infoOverlayHandler),
            this.el.removeEventListener("mouseover", this.overHandler),
            this.el.removeEventListener("mouseout", this.outHandler),
            this.pipMenu && this.el.querySelector(".jw-pip-item").removeEventListener("click", this.pipHandler),
            this.shortcutsTooltip && this.el.querySelector(".jw-shortcuts-item").removeEventListener("click", this.shortcutsTooltipHandler)),
            document.removeEventListener("click", this.hideMenuHandler),
            document.removeEventListener("touchstart", this.hideMenuHandler)
        }
        ,
        e.destroy = function() {
            clearTimeout(this._menuTimeout),
            this.removeHideMenuHandlers(),
            this.el && (this.hideMenu(),
            this.hideMenuHandler = null,
            this.el = null),
            this.wrapperElement && (this.wrapperElement.oncontextmenu = null,
            this.wrapperElement = null),
            this.model && (this.model = null),
            this.ui && (this.ui.destroy(),
            this.ui = null)
        }
        ,
        t
    }())
      , B = i(91)
      , E = i(82)
      , L = i(93)
      , A = i(92)
      , _ = i(80);
    function I(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function H(t, e) {
        return (H = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function V(t, e, i, n) {
        if (t && "Auto" === t[0].label && i && i.items.length) {
            var o = i.items[0].el.querySelector(".jw-auto-label")
              , a = t[e.index] || {
                label: ""
            };
            o.textContent = n ? "" : a.label
        }
    }
    var P = function(t) {
        var e, i;
        function n(e, i, n, o) {
            var a, s, r, c;
            return (a = t.call(this, "settings", o.settings, null, o) || this).api = e,
            a.model = i,
            a.localization = o,
            a.controlbar = n,
            a.closeButton = function(t, e, i) {
                var n = Object(p.a)("jw-settings-close", e, i.close, [Object(f.a)("close")]);
                return n.show(),
                n.ui.on("keydown", (function(t) {
                    var i = t.sourceEvent
                      , n = Object(_.c)(i.key);
                    ("Enter" === n || "Right" === n || "Tab" === n && !i.shiftKey) && e(t)
                }
                ), this),
                t.appendChild(n.element()),
                n
            }(a.el.querySelector(".jw-" + a.name + "-topbar-buttons"), a.close, o),
            a.backButtonTarget = null,
            a.defaultChild = null,
            a.topbar = (s = I(a),
            r = s.closeButton,
            c = s.el.querySelector(".jw-settings-topbar"),
            new h.a(c).on("keydown", (function(t) {
                var e, i, n = t.sourceEvent, o = t.target, a = Object(l.k)(o), c = Object(l.n)(o), p = function(e) {
                    c ? e || c.focus() : s.close(t)
                };
                switch (Object(_.c)(n.key)) {
                case "Esc":
                    s.close(t);
                    break;
                case "Left":
                    p();
                    break;
                case "Right":
                    a && r.element() && o !== r.element() && a.focus();
                    break;
                case "Tab":
                    n.shiftKey && p(!0);
                    break;
                case "Up":
                case "Down":
                case "Enter":
                    e = o.getAttribute("name"),
                    !(i = s.children[e]) && e && s.backButtonTarget && (i = s.backButtonTarget.children[e]),
                    i && i.open && i.open(t)
                }
                if (n.stopPropagation(),
                /13|32|37|38|39|40/.test(n.keyCode))
                    return n.preventDefault(),
                    !1
            }
            ))),
            a.onDocumentClick = a.onDocumentClick.bind(I(a)),
            a.addEventListeners(),
            a
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        H(e, i);
        var o = n.prototype;
        return o.setupMenu = function(t, e, i, n, o, a) {
            if (!i || i.length <= 1)
                this.removeMenu(t);
            else {
                var s = this.children[t];
                s || (s = new B.a(t,e,this,this.localization)),
                s.setMenuItems(s.createItems(i, n, a), o);
                var r = s.categoryButton && s.categoryButton.element();
                this.buttonContainer.firstChild === r && (this.defaultChild = s)
            }
        }
        ,
        o.onLevels = function(t, e) {
            var i = this
              , n = {
                defaultText: this.localization.auto
            };
            this.setupMenu("quality", this.localization.hd, e, (function(t) {
                return i.api.setCurrentQuality(t)
            }
            ), t.get("currentLevel") || 0, n)
        }
        ,
        o.onCurrentLevel = function(t, e) {
            var i = this.children.quality
              , n = t.get("visualQuality");
            n && i && V(t.get("levels"), n.level, i, e),
            i.items[e].active || Object(_.d)(i, e)
        }
        ,
        o.onVisualQuality = function(t, e) {
            var i = this.children.quality;
            e && i && V(t.get("levels"), e.level, i, t.get("currentLevel"))
        }
        ,
        o.onAudioTracks = function(t, e) {
            var i = this;
            this.setupMenu("audioTracks", this.localization.audioTracks, e, (function(t) {
                return i.api.setCurrentAudioTrack(t)
            }
            ), t.get("currentAudioTrack"))
        }
        ,
        o.onAudioTrackIndex = function(t, e) {
            this.children.audioTracks && Object(_.d)(this.children.audioTracks, e)
        }
        ,
        o.onCaptionsList = function(t, e) {
            var i = this
              , n = {
                defaultText: this.localization.off
            }
              , o = t.get("captionsIndex");
            this.setupMenu("captions", this.localization.cc, e, (function(t) {
                return i.api.setCurrentCaptions(t)
            }
            ), o, n);
            var a = this.children.captions;
            if (a && !a.children.captionsSettings) {
                a.topbar = a.topbar || a.createTopbar(),
                Object(l.h)(a.topbar);
                var s = this.localization.captionsStyles
                  , r = new B.a("captionsSettings",s.subtitleSettings,a,this.localization)
                  , c = r.open;
                r.open = function(t) {
                    var e = r.visible;
                    c.call(r, t),
                    e || i.trigger("captionStylesOpened")
                }
                ;
                var p = r.destroy;
                r.destroy = function(t) {
                    a.topbar.parentNode.removeChild(a.topbar),
                    a.topbar = null,
                    a.topbarUI.destroy(),
                    p.call(r, t)
                }
                ;
                var w = new E.a(this.localization.settings,r.open);
                a.topbar.appendChild(w.el);
                var u = t.get("captions");
                !function e(n) {
                    var o = new E.a(i.localization.reset,(function() {
                        i.model.set("captions", Object(d.j)({}, A.a)),
                        e(!0)
                    }
                    ));
                    o.el.classList.add("jw-settings-reset");
                    var a = [];
                    Object(_.a)(s).forEach((function(e) {
                        !n && u && u[e.name] ? e.val = u[e.name] : e.val = e.defaultVal;
                        var o = e.values.indexOf(e.val);
                        e.currentSelection = e.options[o];
                        var s = new B.a(e.name,e.label,r,i.localization)
                          , l = new E.a(e,s.open,L.a)
                          , c = s.createItems(e.options, (function(n) {
                            var o = l.el.querySelector(".jw-settings-content-item-value");
                            !function(e, n) {
                                var o = t.get("captions")
                                  , a = e.name
                                  , s = e.values[n]
                                  , r = Object(d.j)({}, o);
                                r[a] = s,
                                i.model.set("captions", r)
                            }(e, n),
                            o.innerText = e.options[n]
                        }
                        ), null);
                        s.setMenuItems(c, e.values.indexOf(e.val) || 0),
                        a.push(l)
                    }
                    )),
                    a.push(o),
                    r.setMenuItems(a)
                }()
            }
        }
        ,
        o.onPlaylistItem = function() {
            this.removeMenu("captions"),
            this.removeMenu("audioTracks"),
            this.removeMenu("quality"),
            this.controlbar.elements.captionsButton.hide(),
            this.visible && this.close()
        }
        ,
        o.onCaptionsIndex = function(t, e) {
            var i = this.children.captions;
            i && Object(_.d)(i, e),
            this.controlbar.toggleCaptionsButtonState(!!e)
        }
        ,
        o.onPlaybackRates = function(t, e) {
            var i = this;
            !e && t && (e = t.get("playbackRates"));
            var n = this.localization
              , o = this.children;
            if (t.get("supportsPlaybackRate") && "LIVE" !== t.get("streamType") && t.get("playbackRateControls")) {
                var a = e.indexOf(t.get("playbackRate"))
                  , s = {
                    tooltipText: n.playbackRates
                };
                this.setupMenu("playbackRates", this.localization.playbackRates, e, (function(t) {
                    return i.api.setPlaybackRate(t)
                }
                ), a, s)
            } else
                o.playbackRates && this.removeMenu("playbackRates")
        }
        ,
        o.onPlaybackRate = function(t, e) {
            var i = t.get("playbackRates")
              , n = -1;
            i && (n = i.indexOf(e)),
            Object(_.d)(this.children.playbackRates, n)
        }
        ,
        o.onPlaybackRateControls = function(t) {
            this.onPlaybackRates(t)
        }
        ,
        o.onCastActive = function(t, e, i) {
            e !== i && (e ? (this.removeMenu("audioTracks"),
            this.removeMenu("quality"),
            this.removeMenu("playbackRates"),
            this.children.captions && this.children.captions.removeMenu("captionsSettings")) : (this.onAudioTracks(t, t.get("audioTracks")),
            this.onLevels(t, t.get("levels")),
            this.onPlaybackRates(t, t.get("playbackRates")),
            this.onCaptionsList(t, t.get("captionsList"))))
        }
        ,
        o.onChangeStreamType = function() {
            this.onPlaybackRates(this.model)
        }
        ,
        o.onDocumentClick = function(t) {
            /jw-(settings|video|nextup-close|sharing-link|share-item)/.test(t.target.className) || this.close()
        }
        ,
        o.addEventListeners = function() {
            var t = this.updateControlbarButtons
              , e = this.model;
            this.on("menuAppended menuRemoved", t, this),
            e.change("levels", this.onLevels, this),
            e.on("change:currentLevel", this.onCurrentLevel, this),
            e.on("change:visualQuality", this.onVisualQuality, this),
            e.change("audioTracks", this.onAudioTracks, this),
            e.on("change:currentAudioTrack", this.onAudioTrackIndex, this),
            e.change("captionsList", this.onCaptionsList, this),
            e.on("change:playlistItem", this.onPlaylistItem, this),
            e.change("captionsIndex", this.onCaptionsIndex, this),
            e.change("playbackRates", this.onPlaybackRates, this),
            e.change("playbackRate", this.onPlaybackRate, this),
            e.on("change:playbackRateControls", this.onPlaybackRateControls, this),
            e.on("change:castActive", this.onCastActive, this),
            e.on("change:streamType", this.onChangeStreamType, this)
        }
        ,
        o.open = function(t) {
            this.visible || (this.el.parentNode.classList.add("jw-settings-open"),
            this.trigger("visibility", {
                visible: !0,
                evt: t
            }),
            document.addEventListener("click", this.onDocumentClick),
            this.el.setAttribute("aria-expanded", "true"),
            this.visible = !0)
        }
        ,
        o.close = function(t) {
            this.el.parentNode.classList.remove("jw-settings-open"),
            this.trigger("visibility", {
                visible: !1,
                evt: t
            }),
            document.removeEventListener("click", this.onDocumentClick),
            this.visible = !1,
            this.openMenus.length && this.closeChildren();
            var e, i = Object(_.c)(t && t.sourceEvent && t.sourceEvent.key), n = this.controlbar.elements.settingsButton.element();
            switch (i) {
            case "Right":
                e = Object(l.k)(n);
                break;
            case "Left":
                e = Object(l.n)(n);
                break;
            case "Tab":
                if (t.shiftKey) {
                    e = Object(l.n)(n);
                    break
                }
            case "Esc":
                e = n
            }
            e && e.focus({
                preventScroll: !event
            })
        }
        ,
        o.updateControlbarButtons = function(t) {
            var e = this.children
              , i = this.controlbar
              , n = this.model
              , o = !!e.quality || !!e.playbackRates || !!e.audioTracks || Object.keys(e).length > 1;
            i.elements.settingsButton.toggle(o),
            e.captions && i.toggleCaptionsButtonState(!!n.get("captionsIndex"));
            var a = i.elements[t + "Button"];
            if (a) {
                var s = !!e[t];
                a.toggle(s)
            }
        }
        ,
        o.destroy = function() {
            _.b.call(this),
            document.removeEventListener("click", this.onDocumentClick)
        }
        ,
        n
    }(B.a)
      , q = i(86)
      , N = i(43)
      , R = i(14)
      , U = function(t, e, i, n) {
        var o = Object(l.e)('<div class="jw-reset jw-info-overlay jw-modal"><div class="jw-reset jw-info-container"><div class="jw-reset-text jw-info-title" dir="auto"></div><div class="jw-reset-text jw-info-duration" dir="auto"></div><div class="jw-reset-text jw-info-description" dir="auto"></div></div><div class="jw-reset jw-info-clientid"></div></div>')
          , s = !1
          , r = null
          , c = !1
          , w = function(t) {
            /jw-info/.test(t.target.className) || d.close()
        }
          , u = function() {
            var n, a, r, c, w, u = Object(p.a)("jw-info-close", (function() {
                d.close()
            }
            ), e.get("localization").close, [Object(f.a)("close")]);
            u.show(),
            Object(l.m)(o, u.element()),
            a = o.querySelector(".jw-info-title"),
            r = o.querySelector(".jw-info-duration"),
            c = o.querySelector(".jw-info-description"),
            w = o.querySelector(".jw-info-clientid"),
            e.change("playlistItem", (function(t, e) {
                var i = e.description
                  , n = e.title;
                Object(l.q)(c, i || ""),
                Object(l.q)(a, n || "Unknown Title")
            }
            )),
            e.change("duration", (function(t, i) {
                var n = "";
                switch (e.get("streamType")) {
                case "LIVE":
                    n = "Live";
                    break;
                case "DVR":
                    n = "DVR";
                    break;
                default:
                    i && (n = Object(m.timeFormat)(i))
                }
                r.textContent = n
            }
            ), d),
            w.textContent = (n = i.getPlugin("jwpsrv")) && "function" == typeof n.doNotTrackUser && n.doNotTrackUser() ? "" : "Client ID: " + function() {
                try {
                    return window.localStorage.jwplayerLocalId
                } catch (t) {
                    return "none"
                }
            }(),
            t.appendChild(o),
            s = !0
        };
        var d = {
            open: function() {
                s || u(),
                document.addEventListener("click", w),
                c = !0;
                var t = e.get("state");
                t === a.pb && i.pause("infoOverlayInteraction"),
                r = t,
                n(!0)
            },
            close: function() {
                document.removeEventListener("click", w),
                c = !1,
                e.get("state") === a.ob && r === a.pb && i.play("infoOverlayInteraction"),
                r = null,
                n(!1)
            },
            destroy: function() {
                this.close(),
                e.off(null, null, this)
            }
        };
        return Object.defineProperties(d, {
            visible: {
                enumerable: !0,
                get: function() {
                    return c
                }
            }
        }),
        d
    };
    var D = function(t, e, i, n) {
        var o, s = !1, r = null, c = i.get("localization").shortcuts, w = Object(l.e)(function(t, e) {
            return '<div class="jw-shortcuts-tooltip jw-modal jw-reset" title="' + e + '"><span class="jw-hidden" id="jw-shortcuts-tooltip-explanation">Press shift question mark to access a list of keyboard shortcuts</span><div class="jw-reset jw-shortcuts-container"><div class="jw-reset jw-shortcuts-header"><span class="jw-reset jw-shortcuts-title">' + e + '</span><button role="switch" aria-label="' + e + '" class="jw-reset jw-switch"><span class="jw-reset jw-switch-knob"></span><span class="jw-reset-text jw-switch-enabled">Enabled</span><span class="jw-reset-text jw-switch-disabled">Disabled</span></button></div><div class="jw-reset jw-shortcuts-tooltip-list"><div class="jw-shortcuts-tooltip-descriptions jw-reset">' + t.map((function(t) {
                return '<div class="jw-shortcuts-row jw-reset"><span class="jw-shortcuts-description jw-reset">' + t.description + '</span><span class="jw-shortcuts-key jw-reset">' + t.key + "</span></div>"
            }
            )).join("") + "</div></div></div></div>"
        }(function(t) {
            var e = t.playPause
              , i = t.volumeToggle
              , n = t.fullscreenToggle
              , o = t.seekPercent
              , a = t.increaseVolume
              , s = t.decreaseVolume
              , r = t.seekForward
              , l = t.seekBackward;
            return [{
                key: t.spacebar,
                description: e
            }, {
                key: "↑",
                description: a
            }, {
                key: "↓",
                description: s
            }, {
                key: "→",
                description: r
            }, {
                key: "←",
                description: l
            }, {
                key: "c",
                description: t.captionsToggle
            }, {
                key: "f",
                description: n
            }, {
                key: "m",
                description: i
            }, {
                key: "0-9",
                description: o
            }]
        }(c), c.keyboardShortcuts)), u = {
            reason: "settingsInteraction"
        }, d = new h.a(w.querySelector(".jw-switch")), j = function() {
            d.el.setAttribute("aria-checked", i.get("enableShortcuts")),
            Object(l.a)(w, "jw-open"),
            r = i.get("state"),
            w.querySelector(".jw-shortcuts-close").focus(),
            document.addEventListener("click", b),
            s = !0,
            e.pause(u),
            n(!0)
        }, g = function() {
            Object(l.o)(w, "jw-open"),
            document.removeEventListener("click", b),
            s = !1,
            r === a.pb && e.play(u),
            n(!1)
        }, b = function(t) {
            var e = t.target;
            /jw-shortcuts|jw-switch/.test(e.className) || g()
        }, m = function(t) {
            var e = t.currentTarget
              , n = "true" !== e.getAttribute("aria-checked");
            e.setAttribute("aria-checked", n.toString()),
            i.set("enableShortcuts", n)
        };
        return o = Object(p.a)("jw-shortcuts-close", g, i.get("localization").close, [Object(f.a)("close")]),
        Object(l.m)(w, o.element()),
        o.show(),
        t.appendChild(w),
        d.on("click", m),
        {
            el: w,
            open: j,
            close: g,
            destroy: function() {
                g(),
                d.destroy()
            },
            toggleVisibility: function() {
                s ? g() : j()
            }
        }
    };
    function F(t, e) {
        return (F = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var Z = function(t) {
        var e, i;
        function n(e, i) {
            var n;
            return (n = t.call(this) || this).element = Object(l.e)(function(t) {
                return '<div class="jw-float-icon jw-icon jw-button-color jw-reset" aria-label=' + t + ' tabindex="0"></div>'
            }(i)),
            n.element.appendChild(Object(f.a)("close")),
            n.ui = Object(v.a)(n.element, (function() {
                n.trigger(a.tb)
            }
            )),
            e.appendChild(n.element),
            n
        }
        return i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        F(e, i),
        n.prototype.destroy = function() {
            this.element && (this.ui.destroy(),
            this.element.parentNode.removeChild(this.element),
            this.element = null)
        }
        ,
        n
    }(s.a);
    function W(t, e) {
        return (W = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    i(130),
    i(132);
    var K = o.OS.mobile ? 4e3 : 2e3
      , Y = [27];
    N.a.cloneIcon = f.a,
    R.a.forEach((function(t) {
        if (t.getState() === a.lb) {
            var e = t.getContainer().querySelector(".jw-error-msg .jw-icon");
            e && !e.hasChildNodes() && e.appendChild(N.a.cloneIcon("error"))
        }
    }
    ));
    var X = function(t) {
        var e, i;
        function n(e, i) {
            var n;
            return (n = t.call(this) || this).activeTimeout = -1,
            n.inactiveTime = 0,
            n.context = e,
            n.controlbar = null,
            n.displayContainer = null,
            n.backdrop = null,
            n.enabled = !0,
            n.instreamState = null,
            n.keydownCallback = null,
            n.keyupCallback = null,
            n.blurCallback = null,
            n.mute = null,
            n.nextUpToolTip = null,
            n.playerContainer = i,
            n.wrapperElement = i.querySelector(".jw-wrapper"),
            n.rightClickMenu = null,
            n.settingsMenu = null,
            n.shortcutsTooltip = null,
            n.showing = !1,
            n.muteChangeCallback = null,
            n.unmuteCallback = null,
            n.logo = null,
            n.div = null,
            n.dimensions = {},
            n.infoOverlay = null,
            n.userInactiveTimeout = function() {
                var t = n.inactiveTime - Object(c.a)();
                n.inactiveTime && t > 16 ? n.activeTimeout = setTimeout(n.userInactiveTimeout, t) : n.playerContainer.querySelector(".jw-tab-focus") ? n.resetActiveTimeout() : n.userInactive()
            }
            ,
            n
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        W(e, i);
        var s = n.prototype;
        return s.resetActiveTimeout = function() {
            clearTimeout(this.activeTimeout),
            this.activeTimeout = -1,
            this.inactiveTime = 0
        }
        ,
        s.enable = function(t, e) {
            var i = this
              , n = this.context.createElement("div");
            n.className = "jw-controls jw-reset",
            this.div = n;
            var s = this.context.createElement("div");
            s.className = "jw-controls-backdrop jw-reset",
            this.backdrop = s,
            this.logo = this.playerContainer.querySelector(".jw-logo");
            var c = e.get("touchMode");
            if (this.focusPlayerElement = function() {
                e.get("isFloating") ? i.wrapperElement.querySelector("video").focus({
                    preventScroll: !0
                }) : i.playerContainer.focus({
                    preventScroll: !0
                })
            }
            ,
            !this.displayContainer) {
                var d = new u.a(e,t);
                d.buttons.display.on("click enter", (function() {
                    i.trigger(a.q),
                    i.userActive(1e3),
                    t.playToggle({
                        reason: "interaction"
                    }),
                    i.focusPlayerElement()
                }
                )),
                this.div.appendChild(d.element()),
                this.displayContainer = d
            }
            this.infoOverlay = new U(n,e,t,(function(t) {
                Object(l.v)(i.div, "jw-info-open", t),
                t ? i.div.querySelector(".jw-info-close").focus() : i.focusPlayerElement()
            }
            )),
            o.OS.mobile || (this.shortcutsTooltip = new D(this.wrapperElement,t,e,(function(t) {
                t || i.focusPlayerElement()
            }
            ))),
            this.rightClickMenu = new M(this.infoOverlay,this.shortcutsTooltip),
            c && Object(l.a)(this.playerContainer, "jw-flag-touch"),
            this.rightClickMenu.setup(e, this.playerContainer, this.wrapperElement);
            var j = e.get("floating");
            if (j) {
                var h = new Z(n,e.get("localization").close);
                h.on(a.tb, (function() {
                    return i.trigger("dismissFloating", {
                        doNotForward: !0
                    })
                }
                )),
                !1 !== j.dismissible && Object(l.a)(this.playerContainer, "jw-floating-dismissible")
            }
            var g = this.controlbar = new w.a(t,e,this.playerContainer.querySelector(".jw-hidden-accessibility"));
            if (g.on(a.tb, (function() {
                i.off("userInactive", i.focusPlayerElement, i),
                i.once("userInactive", i.focusPlayerElement, i),
                i.userActive()
            }
            )),
            g.on("nextShown", (function(t) {
                this.trigger("nextShown", t)
            }
            ), this),
            g.on("adjustVolume", C, this),
            e.get("nextUpDisplay") && !g.nextUpToolTip) {
                var b = new y(e,t,this.playerContainer);
                b.on("all", this.trigger, this),
                b.setup(this.context),
                g.nextUpToolTip = b,
                this.div.appendChild(b.element())
            }
            this.div.appendChild(g.element());
            var m = e.get("localization")
              , v = this.settingsMenu = new P(t,e.player,this.controlbar,m)
              , x = null;
            v.on("menuVisibility", (function(n) {
                var o = n.visible
                  , s = n.evt
                  , r = e.get("state")
                  , l = {
                    reason: "settingsInteraction"
                }
                  , c = i.controlbar.elements.settingsButton
                  , p = "keydown" === (s && s.sourceEvent || s || {}).type
                  , w = o || p ? 0 : K;
                i.userActive(w),
                Object(q.a)(e.get("containerWidth")) < 2 && (o && r === a.pb ? t.pause(l) : o || r !== a.ob || x !== a.pb || t.play(l)),
                x = r,
                !o && p && c ? c.element().focus() : s && i.focusPlayerElement()
            }
            )),
            v.on("captionStylesOpened", (function() {
                return i.trigger("captionStylesOpened")
            }
            )),
            g.on("settingsInteraction", (function(t, e, i) {
                if (e)
                    return v.defaultChild.toggle(i, !0);
                v.children[t].toggle(i)
            }
            )),
            o.OS.mobile ? this.div.appendChild(v.el) : (this.playerContainer.setAttribute("aria-describedby", "jw-shortcuts-tooltip-explanation"),
            this.div.insertBefore(v.el, g.element()));
            var k = function(e) {
                if (e.get("autostartMuted")) {
                    var n = function() {
                        return i.unmuteAutoplay(t, e)
                    }
                      , a = function(t, e) {
                        e || n()
                    };
                    o.OS.mobile && (i.mute = Object(p.a)("jw-autostart-mute jw-off", n, e.get("localization").unmute, [Object(f.a)("volume-0")]),
                    i.mute.show(),
                    i.div.appendChild(i.mute.element())),
                    g.renderVolume(!0, e.get("volume")),
                    Object(l.a)(i.playerContainer, "jw-flag-autostart"),
                    e.on("change:autostartFailed", n, i),
                    e.on("change:autostartMuted change:mute", a, i),
                    i.muteChangeCallback = a,
                    i.unmuteCallback = n
                }
            };
            function O(i) {
                var n = 0
                  , o = e.get("duration")
                  , a = e.get("position");
                if ("DVR" === e.get("streamType")) {
                    var s = e.get("dvrSeekLimit");
                    n = o,
                    o = Math.max(a, -s)
                }
                var l = Object(r.a)(a + i, n, o);
                t.seek(l, {
                    reason: "interaction"
                })
            }
            function C(i) {
                var n = Object(r.a)(e.get("volume") + i, 0, 100);
                t.setVolume(n)
            }
            e.once("change:autostartMuted", k),
            k(e);
            var z = function(n) {
                if (n.ctrlKey || n.metaKey)
                    return !0;
                var o = !i.settingsMenu || !i.settingsMenu.visible
                  , a = !0 === e.get("enableShortcuts")
                  , s = i.instreamState;
                if (a || -1 !== Y.indexOf(n.keyCode)) {
                    switch (n.keyCode) {
                    case 27:
                        if (e.get("fullscreen"))
                            t.setFullscreen(!1),
                            i.playerContainer.blur(),
                            i.userInactive();
                        else {
                            var r = t.getPlugin("related");
                            r && r.close({
                                type: "escape"
                            })
                        }
                        i.rightClickMenu.el && i.rightClickMenu.hideMenuHandler(),
                        i.infoOverlay.visible && i.infoOverlay.close(),
                        i.shortcutsTooltip && i.shortcutsTooltip.close();
                        break;
                    case 13:
                    case 32:
                        if (document.activeElement.classList.contains("jw-switch") && 13 === n.keyCode)
                            return !0;
                        t.playToggle({
                            reason: "interaction"
                        });
                        break;
                    case 37:
                        !s && o && O(-5);
                        break;
                    case 39:
                        !s && o && O(5);
                        break;
                    case 38:
                        o && C(10);
                        break;
                    case 40:
                        o && C(-10);
                        break;
                    case 67:
                        var l = t.getCaptionsList().length;
                        if (l) {
                            var c = (t.getCurrentCaptions() + 1) % l;
                            t.setCurrentCaptions(c)
                        }
                        break;
                    case 77:
                        t.setMute();
                        break;
                    case 70:
                        t.setFullscreen();
                        break;
                    case 191:
                        i.shortcutsTooltip && i.shortcutsTooltip.toggleVisibility();
                        break;
                    default:
                        if (n.keyCode >= 48 && n.keyCode <= 59) {
                            var p = (n.keyCode - 48) / 10 * e.get("duration");
                            t.seek(p, {
                                reason: "interaction"
                            })
                        }
                    }
                    return /13|32|37|38|39|40/.test(n.keyCode) ? (n.preventDefault(),
                    !1) : void 0
                }
            };
            this.playerContainer.addEventListener("keydown", z),
            this.keydownCallback = z;
            var T = function(t) {
                switch (t.keyCode) {
                case 9:
                    var e = i.playerContainer.contains(t.target) ? 0 : K;
                    i.userActive(e);
                    break;
                case 32:
                    t.preventDefault()
                }
            };
            this.playerContainer.addEventListener("keyup", T),
            this.keyupCallback = T;
            var S = function(t) {
                i.off("userInactive", i.focusPlayerElement, i);
                var e = t.relatedTarget || document.querySelector(":focus");
                e && (i.playerContainer.contains(e) || i.userInactive())
            };
            this.playerContainer.addEventListener("blur", S, !0),
            this.blurCallback = S;
            var B = function t() {
                "jw-shortcuts-tooltip-explanation" === i.playerContainer.getAttribute("aria-describedby") && i.playerContainer.removeAttribute("aria-describedby"),
                i.playerContainer.removeEventListener("blur", t, !0)
            };
            this.shortcutsTooltip && (this.playerContainer.addEventListener("blur", B, !0),
            this.onRemoveShortcutsDescription = B),
            this.userActive(),
            this.addControls(),
            this.addBackdrop(),
            e.set("controlsEnabled", !0)
        }
        ,
        s.addControls = function() {
            this.wrapperElement.appendChild(this.div)
        }
        ,
        s.disable = function(t) {
            var e = this.nextUpToolTip
              , i = this.settingsMenu
              , n = this.infoOverlay
              , o = this.controlbar
              , a = this.rightClickMenu
              , s = this.shortcutsTooltip
              , r = this.playerContainer
              , c = this.div;
            clearTimeout(this.activeTimeout),
            this.activeTimeout = -1,
            this.off(),
            t.off(null, null, this),
            t.set("controlsEnabled", !1),
            c.parentNode && (Object(l.o)(r, "jw-flag-touch"),
            c.parentNode.removeChild(c)),
            o && o.destroy(),
            a && a.destroy(),
            this.keydownCallback && r.removeEventListener("keydown", this.keydownCallback),
            this.keyupCallback && r.removeEventListener("keyup", this.keyupCallback),
            this.blurCallback && r.removeEventListener("blur", this.blurCallback),
            this.onRemoveShortcutsDescription && r.removeEventListener("blur", this.onRemoveShortcutsDescription),
            this.displayContainer && this.displayContainer.destroy(),
            e && e.destroy(),
            i && i.destroy(),
            n && n.destroy(),
            s && s.destroy(),
            this.removeBackdrop()
        }
        ,
        s.controlbarHeight = function() {
            return this.dimensions.cbHeight || (this.dimensions.cbHeight = this.controlbar.element().clientHeight),
            this.dimensions.cbHeight
        }
        ,
        s.element = function() {
            return this.div
        }
        ,
        s.resize = function() {
            this.dimensions = {}
        }
        ,
        s.unmuteAutoplay = function(t, e) {
            var i = !e.get("autostartFailed")
              , n = e.get("mute");
            i ? n = !1 : e.set("playOnViewable", !1),
            this.muteChangeCallback && (e.off("change:autostartMuted change:mute", this.muteChangeCallback),
            this.muteChangeCallback = null),
            this.unmuteCallback && (e.off("change:autostartFailed", this.unmuteCallback),
            this.unmuteCallback = null),
            e.set("autostartFailed", void 0),
            e.set("autostartMuted", void 0),
            t.setMute(n),
            this.controlbar.renderVolume(n, e.get("volume")),
            this.mute && this.mute.hide(),
            Object(l.o)(this.playerContainer, "jw-flag-autostart"),
            this.userActive()
        }
        ,
        s.mouseMove = function(t) {
            var e = this.controlbar.element().contains(t.target)
              , i = this.controlbar.nextUpToolTip && this.controlbar.nextUpToolTip.element().contains(t.target)
              , n = this.logo && this.logo.contains(t.target)
              , o = e || i || n ? 0 : K;
            this.userActive(o)
        }
        ,
        s.userActive = function(t) {
            void 0 === t && (t = K),
            t > 0 ? (this.inactiveTime = Object(c.a)() + t,
            -1 === this.activeTimeout && (this.activeTimeout = setTimeout(this.userInactiveTimeout, t))) : this.resetActiveTimeout(),
            this.showing || (Object(l.o)(this.playerContainer, "jw-flag-user-inactive"),
            this.showing = !0,
            this.trigger("userActive"))
        }
        ,
        s.userInactive = function() {
            clearTimeout(this.activeTimeout),
            this.activeTimeout = -1,
            this.settingsMenu.visible || (this.inactiveTime = 0,
            this.showing = !1,
            Object(l.a)(this.playerContainer, "jw-flag-user-inactive"),
            this.trigger("userInactive"))
        }
        ,
        s.addBackdrop = function() {
            var t = this.instreamState ? this.div : this.wrapperElement.querySelector(".jw-captions");
            this.wrapperElement.insertBefore(this.backdrop, t)
        }
        ,
        s.removeBackdrop = function() {
            var t = this.backdrop.parentNode;
            t && t.removeChild(this.backdrop)
        }
        ,
        s.setupInstream = function() {
            this.instreamState = !0,
            this.userActive(),
            this.addBackdrop(),
            this.settingsMenu && this.settingsMenu.close(),
            Object(l.o)(this.playerContainer, "jw-flag-autostart"),
            this.controlbar.elements.time.element().setAttribute("tabindex", "-1")
        }
        ,
        s.destroyInstream = function(t) {
            this.instreamState = null,
            this.addBackdrop(),
            t.get("autostartMuted") && Object(l.a)(this.playerContainer, "jw-flag-autostart"),
            this.controlbar.elements.time.element().setAttribute("tabindex", "0")
        }
        ,
        n
    }(s.a)
      , Q = i(133)
      , J = i.n(Q)
      , $ = i(134)
      , G = i.n($)
      , tt = i(135)
      , et = i.n(tt)
      , it = i(136)
      , nt = i.n(it)
      , ot = i(137)
      , at = i.n(ot)
      , st = i(138)
      , rt = i.n(st)
      , lt = i(139)
      , ct = i.n(lt)
      , pt = i(140)
      , wt = i.n(pt)
      , ut = i(141)
      , dt = i.n(ut)
      , jt = {
        label: "facebook",
        src: "http://www.facebook.com/sharer/sharer.php?u=[URL]",
        svg: J.a,
        jwsource: "fb"
    }
      , ht = {
        label: "twitter",
        src: "http://twitter.com/intent/tweet?url=[URL]",
        svg: rt.a,
        jwsource: "twi"
    }
      , ft = {
        label: "linkedin",
        src: "https://www.linkedin.com/cws/share?url=[URL]",
        svg: G.a,
        jwsource: "lkn"
    }
      , gt = {
        label: "pinterest",
        src: "http://pinterest.com/pin/create/button/?url=[URL]",
        svg: et.a,
        jwsource: "pin"
    }
      , bt = {
        label: "reddit",
        src: "http://www.reddit.com/submit?url=[URL]",
        svg: nt.a,
        jwsource: "rdt"
    }
      , mt = {
        label: "tumblr",
        src: "http://tumblr.com/widgets/share/tool?canonicalUrl=[URL]",
        svg: at.a,
        jwsource: "tbr"
    }
      , vt = {
        label: "email",
        src: "mailto:?body=[URL]",
        svg: ct.a,
        jwsource: "em"
    }
      , yt = {
        label: "link",
        svg: wt.a,
        jwsource: "cl"
    }
      , xt = {
        label: "embed",
        svg: dt.a,
        jwsource: "ceb"
    }
      , kt = i(94)
      , Ot = i.n(kt)
      , Ct = !1
      , zt = function(t, e, o, a) {
        Object(d.j)(this, s.a);
        var r, c, p = this, w = [jt, ht, vt];
        function u(t, e) {
            var i = t.indexOf("MEDIAID");
            return i > 0 && e ? t.replace("MEDIAID", e) : -1 === i ? t : void 0
        }
        function j(t) {
            o.trigger("settingsInteraction", "sharing", !1, t)
        }
        function h() {
            var i = t.getPlaylistItem()
              , n = w.filter((function(t) {
                return "link" === t.label
            }
            ))[0];
            r = function(t) {
                var i = window.location.toString();
                if (window.top !== window && (i = document.referrer),
                e.link) {
                    var n = u(e.link, t);
                    i = n || i
                }
                return i
            }(i.mediaid),
            n ? -1 === n.src.indexOf(r) && (n.src = r) : w.push(Object(d.j)({
                src: f(r, yt.jwsource)
            }, yt));
            var o = w.filter((function(t) {
                return "embed" === t.label
            }
            ));
            c = function(t) {
                var i = null;
                if (e.code) {
                    var n = u(e.code, t);
                    i = n || i
                }
                return i
            }(i.mediaid) || e.code,
            o[0] ? o[0].src = decodeURIComponent(c) : e.code && w.push(Object(d.j)({
                src: decodeURIComponent(c)
            }, xt))
        }
        function f(t, e) {
            var i = /([?&]jwsource)=?[^&]*/;
            if (i.test(t))
                return t.replace(i, "$1=" + e);
            var n = -1 === t.indexOf("?") ? "?" : "&";
            return "" + t + n + "jwsource=" + e
        }
        function g(t) {
            p.trigger("click", {
                method: t
            })
        }
        return function() {
            if (Array.isArray(e.sites)) {
                var i = [];
                Object(d.i)(e.sites, (function(t) {
                    Object(d.x)(t) && n[t] ? i.push(n[t]) : Object(d.w)(t) && i.push(t)
                }
                )),
                w = i
            }
            t.addButton(Ot.a, a, j, "share", "jw-settings-sharing");
            var s = o.el.querySelector(".jw-settings-sharing");
            s.setAttribute("aria-haspopup", "true"),
            s.setAttribute("aria-controls", "jw-settings-submenu-sharing")
        }(),
        this.getShareMethods = function() {
            return h(),
            w
        }
        ,
        this.getHeading = function() {
            return a
        }
        ,
        this.onSubmenuToggle = function(t, e) {
            void 0 === e && (e = "interaction"),
            t && !Ct && (Ct = !0,
            i(142)),
            p.trigger(t ? "open" : "close", {
                visible: t,
                method: e
            })
        }
        ,
        this.action = function(e) {
            var i = w[e].label;
            "embed" !== i && "link" !== i ? function(e) {
                var i = e.src;
                if (Object(d.t)(i))
                    i(r);
                else if (null != i) {
                    var n = encodeURIComponent(f(r, e.jwsource || "share"))
                      , o = i.replace(/\[URL\]/gi, n);
                    i === o && (o = i + n),
                    t.pause({
                        reason: "sharing"
                    }),
                    Object(l.l)(o, "_blank", {
                        rel: "noreferrer"
                    }),
                    window.focus()
                }
                g(e.label)
            }(w[e]) : g(i)
        }
        ,
        this.open = function() {
            o.trigger("sharingApi", !0)
        }
        ,
        this.close = function() {
            o.trigger("sharingApi", !1)
        }
        ,
        this
    }
      , Tt = function(t, e) {
        var i = Object(l.e)('<div class="jw-skip jw-reset" tabindex="0" role="button"><span class="jw-text jw-skiptext jw-reset"></span><span class="jw-icon jw-icon-inline jw-skip-icon jw-reset"></span></div>');
        i.querySelector(".jw-icon").appendChild(Object(f.a)("next")),
        this.el = i,
        this.skiptext = this.el.querySelector(".jw-skiptext"),
        this.skipUI = Object(v.a)(this.el, this.skipAd, this),
        this.model = t,
        this.skipMessage = t.get("skipText") || "",
        this.skipMessageCountdown = t.get("skipMessage") || "",
        this.waitTime = Object(g.d)(t.get("skipOffset")),
        t.change("duration", (function(i, n) {
            n && (this.waitTime || (this.waitTime = Object(g.d)(i.get("skipOffset"), n)),
            this.el.parentNode !== e && this.waitTime + 2 < n && (t.change("position", (function(t, e) {
                var i = this.waitTime - (e || 0);
                i > 0 ? this.updateMessage(this.skipMessageCountdown.replace(/(\b)xx(s?\b)/gi, "$1" + Math.ceil(i) + "$2")) : null !== this.waitTime && (this.updateMessage(this.skipMessage),
                this.skippable = !0,
                Object(l.a)(this.el, "jw-skippable"))
            }
            ), this),
            e.appendChild(this.el)))
        }
        ), this)
    };
    Object(d.j)(Tt.prototype, s.a, {
        updateMessage: function(t) {
            Object(l.q)(this.skiptext, t),
            this.el.setAttribute("aria-label", t)
        },
        skipAd: function() {
            this.skippable && (this.skipUI.off(),
            this.trigger(a.e))
        },
        destroy: function() {
            this.model.off(null, null, this),
            this.skipUI && this.skipUI.destroy(),
            this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    });
    var St = Tt
      , Mt = function(t, e, i) {
        this.api = t,
        this.playerElement = e,
        this.wrapperElement = i
    };
    Object(d.j)(Mt.prototype, {
        setup: function(t) {
            var e = this;
            this.element = Object(l.e)(function(t) {
                return '<div class="jw-dismiss-icon jw-icon jw-reset" aria-label=' + t + ' tabindex="0"></div>'
            }(t)),
            this.element.appendChild(Object(f.a)("close")),
            this.ui = Object(v.a)(this.element, (function() {
                e.api.remove()
            }
            ), this),
            this.wrapperElement.insertBefore(this.element, this.wrapperElement.firstChild),
            Object(l.a)(this.playerElement, "jw-flag-top")
        },
        destroy: function() {
            this.element && (this.ui.destroy(),
            this.wrapperElement.removeChild(this.element),
            this.element = null)
        }
    });
    var Bt = Mt
      , Et = function(t) {
        var e = t.label
          , i = t.src
          , n = t.options
          , o = t.displayText
          , a = t.svg
          , s = void 0 === a ? "" : a
          , r = t.icon
          , l = void 0 === r ? "" : r
          , c = l ? '<img src="' + l + '" class="jw-svg-icon"/>' : s;
        return "link" === e || "embed" === e ? '<div class="jw-reset jw-settings-content-item jw-sharing-copy"><button class="jw-reset jw-sharing-link" aria-checked="false" type="button" role="button">' + c + " " + (o || e) + '</button><textarea readonly="true" class="jw-reset jw-sharing-textarea">' + i + '</textarea><div class="jw-reset jw-tooltip jw-tooltip-sharing-' + (o || e) + '"><div class="jw-text">' + n.copyText + "</div></div></div>" : '<button class="jw-reset jw-settings-content-item jw-sharing-link" aria-checked="false" type="button" role="button">' + c + " " + (o || e) + "</button>"
    };
    function Lt(t, e) {
        return (Lt = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var At = function(t) {
        var e, i;
        function n(e, i, n) {
            var o;
            return void 0 === n && (n = Et),
            (o = t.call(this, e, i, n) || this).content = e,
            o.el && e.label ? (o.el.setAttribute("aria-label", e.label),
            o.el.setAttribute("role", "button"),
            o.el.setAttribute("tabindex", "0"),
            o) : function(t) {
                if (void 0 === t)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }(o)
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        Lt(e, i);
        var o = n.prototype;
        return o.activate = function() {
            if ("embed" === this.content.label || "link" === this.content.label) {
                var t = this.el.querySelector(".jw-sharing-textarea");
                if (t.select(),
                document.execCommand("copy")) {
                    var e = t.nextSibling;
                    Object(l.a)(e, "jw-open"),
                    setTimeout((function() {
                        Object(l.o)(e, "jw-open")
                    }
                    ), 1e3)
                } else
                    window.prompt("Copy the text below", this.content.src);
                t.blur()
            }
        }
        ,
        o.destroy = function() {
            this.ui.destroy()
        }
        ,
        n
    }(E.a);
    function _t(t, e) {
        return (_t = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var It = function(t) {
        var e, i;
        function n() {
            return t.apply(this, arguments) || this
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        _t(e, i);
        var o = n.prototype;
        return o.createCategoryButton = function() {
            return "sharing" === this.name && (this.icon = Ot.a),
            t.prototype.createCategoryButton.call(this, this.title)
        }
        ,
        o.createItems = function(e, i, n, o) {
            return "sharing" === this.name && (o = At),
            t.prototype.createItems.apply(this, [e, i, n, o])
        }
        ,
        n
    }(B.a);
    function Ht(t, e) {
        return (Ht = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var Vt = function(t) {
        var e, i;
        function n(e, i) {
            var n;
            return (n = t.call(this, e, i) || this).playerContainer = i,
            n.sharing = null,
            n.sharingApi = !1,
            n.dismissButton = null,
            n.skipButton = null,
            n
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        Ht(e, i);
        var o = n.prototype;
        return o.disable = function(e) {
            t.prototype.disable.call(this, e),
            this.dismissButton && (this.dismissButton.destroy(),
            this.dismissButton = null)
        }
        ,
        o.enable = function(e, i) {
            var n = this;
            t.prototype.enable.call(this, e, i),
            i.change("instream", (function() {
                n._destroySkipButton()
            }
            )),
            i.change("skipButton", (function(t, i) {
                n._destroySkipButton(),
                i && (n.skipButton = new St(t,n.div),
                n.skipButton.on(a.e, (function() {
                    t.set("skipButton", !1),
                    e.skipAd()
                }
                )),
                n.controlbar.adSkipButton = n.skipButton)
            }
            ));
            var o = i.get("localization")
              , s = i.get("advertising");
            s && s.outstream && s.dismissible && (this.dismissButton = new Bt(e,this.playerContainer,this.playerContainer.querySelector(".jw-top")),
            this.dismissButton.setup(o.close));
            var r = i.get("sharing");
            if (!this.sharing && r) {
                var l = this.controlbar
                  , c = this.settingsMenu
                  , p = o.sharing;
                this.sharing = new zt(e,r,l,p.heading),
                e.addPlugin("sharing", this.sharing),
                i.change("playlistItem", (function() {
                    var t = n.sharing.getShareMethods().map((function(t) {
                        var e = p[t.label];
                        return e && (t.displayText = e),
                        t
                    }
                    ));
                    c.removeMenu("sharing");
                    var e = new It("sharing",o.sharing.heading,c,o)
                      , i = e.open
                      , a = e.close
                      , s = o.sharing.copied;
                    e.open = function(t) {
                        e.visible || n._onSharingActive(!0),
                        i(t)
                    }
                    ,
                    e.close = function(t) {
                        e.visible && n._onSharingActive(!1),
                        a(t)
                    }
                    ,
                    e.setMenuItems(e.createItems(t, n.sharing.action, {
                        copyText: s
                    })),
                    e.el.classList.add("jw-sharing-menu")
                }
                )),
                this._addSharingApiEvent(l, c),
                this.rightClickMenu.enableSharing(this.sharing.open)
            }
        }
        ,
        o._destroySkipButton = function() {
            this.skipButton && (this.skipButton.destroy(),
            this.skipButton = null,
            this.controlbar.adSkipButton = null)
        }
        ,
        o._addSharingApiEvent = function(t, e) {
            var i = this;
            t.on("sharingApi", (function(t) {
                var n = e.children.sharing;
                n && (i.sharingApi = !0,
                t && !n.visible ? (e.children.sharing.open(),
                i.sharing.onSubmenuToggle(!0, "api")) : !t && n.visible && (e.close(),
                i.sharing.onSubmenuToggle(!1, "api")))
            }
            ))
        }
        ,
        o._onSharingActive = function(t) {
            this.sharingApi ? this.sharingApi = !1 : this.sharing.onSubmenuToggle(t)
        }
        ,
        n
    }(X);
    e.default = Vt
}
, , , function(t, e, i) {
    "use strict";
    i.r(e);
    var n = i(129)
      , o = i(128)
      , a = i(73)
      , s = i(127)
      , r = i(89)
      , l = i(75)
      , c = i(90)
      , p = i(7);
    function w(t, e) {
        return (w = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    function u(t) {
        var e = document.createElement("div");
        return e.className = "jw-reset " + t,
        e
    }
    var d = function(t, e) {
        e.forEach((function(e) {
            t.appendChild(e)
        }
        ))
    };
    function j(t) {
        return t.map((function(t) {
            return "element"in t ? t.element() : t
        }
        ))
    }
    function h(t) {
        t.open(),
        t.close()
    }
    function f(t) {
        return "element"in t && "none" !== t.element().style.display && t.element().classList.contains("jw-button-color")
    }
    function g(t) {
        if (t && "object" == typeof t)
            return "element"in t ? t.element() : "el"in t ? t.el : void 0
    }
    function b(t, e, i) {
        if (t)
            for (var n = i ? 1 : -1, o = e.indexOf(t) + n; o >= 0 && o < e.length; o += n) {
                var a = e[o];
                if (f(a))
                    return a
            }
    }
    var m = function(t) {
        var e, i;
        function n(e, i, n) {
            var o;
            (o = t.call(this, e, i, n) || this)._api = e,
            o._model = i,
            o.activeButton = null;
            var r = i.get("localization")
              , p = new s.a(i,e,n.querySelector(".jw-time-update"))
              , w = o.elements
              , f = o.elements = {
                alt: w.alt,
                play: w.play,
                live: w.live,
                elapsed: w.elapsed,
                countdown: w.countdown,
                time: p,
                duration: w.duration,
                settingsButton: w.settingsButton,
                back: Object(l.a)("jw-icon-back", (function() {
                    o.trigger("backClick")
                }
                ), "Back", Object(a.b)("arrow-left")),
                topContainer: u("jw-top-container"),
                bottomContainer: u("jw-bottom-container"),
                buttonContainer: u("jw-button-container")
            };
            f.play.element().removeChild(f.play.element().querySelector(".jw-tooltip-play")),
            h(Object(c.a)(f.settingsButton.element(), "settings", r.settings)),
            h(Object(c.a)(f.back.element(), "back", "Back")),
            o.topLayout = [f.back, f.settingsButton],
            o.bottomLayout = [f.play, f.alt, f.live, f.elapsed, f.time, f.countdown];
            var g = [f.topContainer, f.buttonContainer, f.bottomContainer];
            return o.el = document.createElement("div"),
            o.el.className = "jw-tizen-controlbar jw-controlbar jw-reset",
            d(f.topContainer, j(o.topLayout)),
            d(f.bottomContainer, j(o.bottomLayout)),
            d(o.el, g),
            f.play.show(),
            f.back.show(),
            o.setActiveButton(o.elements.play),
            o
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        w(e, i);
        var o = n.prototype;
        return o.handleKeydown = function(t, e, i) {
            var n, o, a = this.activeButton, s = !1, r = !1;
            if (!i && a) {
                s = this.elements.topContainer.contains(a.element()),
                r = this.elements.bottomContainer.contains(a.element());
                var l = s ? this.topLayout : this.bottomLayout;
                n = b(a, l, !0),
                o = b(a, l, !1)
            }
            switch (t.keyCode) {
            case 415:
            case 19:
            case 10252:
                this.setActiveButton(this.elements.play);
                break;
            case 37:
                if (i && a === this.adSkipButton)
                    return void this.setActiveButton(this.elements.play);
                if (o)
                    return void this.setActiveButton(o);
                break;
            case 39:
                if (i && this.adSkipButton && a === this.elements.play)
                    return void this.setActiveButton(this.adSkipButton);
                if (n)
                    return void this.setActiveButton(n);
                break;
            case 38:
                if (!e)
                    return void this.setActiveButton(this.elements.play);
                if (i)
                    return;
                if (r)
                    return void (f(this.elements.settingsButton) ? this.setActiveButton(this.elements.settingsButton) : this.setActiveButton(this.elements.back));
                break;
            case 40:
                if (!e)
                    return void this.setActiveButton(this.elements.play);
                if (i)
                    return;
                if (s)
                    return void this.setActiveButton(this.elements.play);
                break;
            case 13:
                if (i && a === this.adSkipButton) {
                    if (!this.adSkipButton.skippable)
                        return;
                    return this.adSkipButton.skipUI.trigger("click"),
                    void this.setActiveButton(this.elements.play)
                }
                e && a && a.ui.trigger("click")
            }
        }
        ,
        o.setActiveButton = function(t) {
            var e = this.activeButton;
            if (e !== t) {
                var i = g(e)
                  , n = g(t);
                i && Object(p.v)(i, "jw-active", !1),
                n && Object(p.v)(n, "jw-active", !0),
                this.activeButton = t
            }
        }
        ,
        o.onAudioMode = function() {}
        ,
        o.updateButtons = function(t, e, i) {
            if (e)
                for (var n = this.elements.buttonContainer, o = e.length - 1; o >= 0; o--) {
                    var a = e[o]
                      , s = new r.a(a.img,a.tooltip,a.callback,a.id,a.btnClass);
                    a.tooltip && Object(c.a)(s.element(), a.id, a.tooltip),
                    n.appendChild(s.element())
                }
        }
        ,
        o.toggleVisibility = function(t) {
            Object(p.v)(this.el.querySelector(".jw-bottom-container"), "jw-hidden", !t)
        }
        ,
        o.destroy = function() {
            this.activeButton = null,
            t.prototype.destroy.apply(this)
        }
        ,
        n
    }(o.a)
      , v = i(11)
      , y = i(12);
    function x(t, e, i) {
        return e === t ? 0 : parseInt(i) / (t - e) * 100
    }
    var k = function() {
        function t(t, e, i) {
            var n = this;
            this._model = t,
            this._api = e,
            this._slider = i,
            this.currentTime = 0;
            var o = document.createElement("div");
            o.className = "jw-tizen-seekbar",
            this.el = o;
            var a = this.thumbnailContainer = Object(p.e)('<div class="jw-seekbar-thumbnails"><div class="jw-seekbar-thumb jw-reset"></div><div class="jw-seekbar-thumb jw-reset"></div><div class="jw-seekbar-thumb jw-active jw-reset"></div><div class="jw-seekbar-thumb jw-reset"></div><div class="jw-seekbar-thumb jw-reset"></div></div>');
            this.el.appendChild(a),
            e.on("firstFrame", (function() {
                n._slider.thumbnails && 0 !== n._slider.thumbnails.length && n.setImageDimensions()
            }
            ), this)
        }
        var e = t.prototype;
        return e.setImageDimensions = function() {
            var t = this
              , e = new Image;
            e.onload = function() {
                e.onload = null,
                t.imageWidth = e.width,
                t.imageHeight = e.height
            }
            ,
            e.src = this._slider.chooseThumbnail(0)
        }
        ,
        e.show = function() {
            this._slider.thumbnails && 0 !== this._slider.thumbnails.length ? (Object(p.a)(this.thumbnailContainer, "jw-open"),
            this.updateThumbnails(this._model.get("position"), 10)) : (Object(p.a)(this._slider.timeTip.el, "jw-open"),
            this.updateTimeTip(this._model.get("position")))
        }
        ,
        e.update = function(t) {
            var e = this.currentTime
              , i = this._model.get("duration")
              , n = e + t;
            (n = (n = n < 0 ? 0 : n) > i ? i : n) !== e && (this._slider.thumbnails && 0 !== this._slider.thumbnails.length ? this.updateThumbnails(n, Math.abs(t)) : this.updateTimeTip(n))
        }
        ,
        e.updateTimeTip = function(t) {
            var e = this._slider.timeTip
              , i = this.getProgressPercent(t);
            Object(v.d)(e.el, {
                left: i + "%"
            }),
            e.update(Object(y.timeFormat)(Math.round(t))),
            this.updateProgressBar(t),
            this.currentTime = Math.round(t)
        }
        ,
        e.updateThumbnails = function(t, e) {
            for (var i = this.thumbnailContainer.children, n = this._model.get("duration"), o = [t - 2 * e, t - e, t, t + e, t + 2 * e], a = 0; a < o.length; a++) {
                var s = o[a]
                  , r = i[a]
                  , l = void 0;
                s >= 0 && s <= n && (l = this._slider.loadThumbnail(s));
                var c = this.getThumbnailStyles(l);
                Object(v.d)(r, c)
            }
            document.getElementsByClassName("jw-text-elapsed")[0].textContent = Object(y.timeFormat)(Math.round(t)),
            this.updateProgressBar(t),
            this.currentTime = Math.round(t)
        }
        ,
        e.hide = function() {
            var t = this._model.get("position");
            document.getElementsByClassName("jw-text-elapsed")[0].textContent = Object(y.timeFormat)(Math.round(t)),
            this.updateProgressBar(t),
            Object(p.o)(this._slider.timeTip.el, "jw-open"),
            Object(p.o)(this.thumbnailContainer, "jw-open"),
            this.resetThumbnails()
        }
        ,
        e.seek = function() {
            this._api.seek(this.currentTime, {
                reason: "interaction"
            })
        }
        ,
        e.element = function() {
            return this.el
        }
        ,
        e.destroy = function() {
            this._api.off(null, null, this)
        }
        ,
        e.resetThumbnails = function() {
            for (var t = 0; t < this.thumbnailContainer.children.length; t++)
                Object(v.d)(this.thumbnailContainer.children[t], {
                    backgroundImage: ""
                })
        }
        ,
        e.getProgressPercent = function(t) {
            var e = this._model.get("duration");
            return 100 * parseFloat((t / e).toFixed(3))
        }
        ,
        e.updateProgressBar = function(t) {
            var e = this.getProgressPercent(t)
              , i = this._slider.el.querySelector(".jw-progress");
            Object(v.d)(i, {
                width: e + "%"
            })
        }
        ,
        e.getThumbnailStyles = function(t) {
            var e = {
                margin: "5px",
                height: "215px",
                width: "375px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: ""
            };
            if (t && (e.backgroundImage = t.backgroundImage,
            t.width && t.height && this.imageWidth && this.imageHeight)) {
                var i = this.imageWidth / t.width * 100
                  , n = this.imageHeight / t.height * 100;
                e.backgroundSize = i + "% " + n + "%";
                var o = t.backgroundPosition.match(/\d+/g)
                  , a = x(this.imageWidth, t.width, o[0])
                  , s = x(this.imageHeight, t.height, o[1]);
                e.backgroundPosition = a + "% " + s + "%"
            }
            return e
        }
        ,
        t
    }()
      , O = i(126)
      , C = i(91)
      , z = i(80)
      , T = i(3)
      , S = i(34)
      , M = i(125);
    function B(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function E(t, e) {
        return (E = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var L = function(t) {
        var e, i;
        function n(e, i, n, o) {
            var a;
            return (a = t.call(this, "settings", o.settings, null, o, M.b) || this).onInteraction = a.onInteraction.bind(B(a)),
            a.onTransition = a.onTransition.bind(B(a)),
            a.ui = new S.a(a.el),
            a.api = e,
            a.model = i,
            a.controlbar = n,
            a.localization = o,
            a.visible = !1,
            a.addEventListeners(),
            a
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        E(e, i);
        var o = n.prototype;
        return o.addEventListeners = function() {
            var t = this.model;
            this.on("visibility", this.onVisibility, this),
            this.on("menuAppended", this.updateControlbarButtons),
            t.on("change:playlistItem", this.onPlaylistItem, this),
            t.change("audioTracks", this.onAudioTracks, this),
            t.on("change:currentAudioTrack", this.onAudioTrackIndex, this),
            t.change("captionsList", this.onCaptionsList, this),
            t.change("captionsIndex", this.onCaptionsIndex, this),
            this.el.addEventListener("animationend", this.onTransition)
        }
        ,
        o.setupMenu = function(t, e, i, n, o, a) {
            if (!i || i.length <= 1)
                this.removeMenu(t);
            else {
                var s = this.children[t];
                if (!s) {
                    (s = new C.a(t,e,null,this.localization,M.c)).parentMenu = this,
                    s.itemsContainer = new S.a(s.el.querySelector(".jw-settings-submenu-items"));
                    s.open = s.close = s.toggle = function() {}
                    ,
                    s.el.classList.add("jw-settings-submenu-active"),
                    this.appendMenu(s)
                }
                s.setMenuItems(s.createItems(i, n, a), o)
            }
        }
        ,
        o.onInteraction = function(t) {
            var e = function(e) {
                var i = t.target
                  , n = e ? Object(p.n)(i) : Object(p.k)(i);
                if (n)
                    n.focus({
                        preventScroll: !0
                    });
                else {
                    var o = e ? this.children.captions : this.children.audioTracks;
                    if (o && !o.el.contains(i)) {
                        var a = o.items;
                        (e ? a[a.length - 1] : a[0]).el.focus({
                            preventScroll: !0
                        })
                    }
                }
                this.trigger(T.tb)
            };
            switch (t.keyCode) {
            case 38:
                e.call(this, !0);
                break;
            case 40:
                e.call(this, !1);
                break;
            case 37:
                this.close(),
                this.controlbar && this.controlbar.elements.settingsButton.element().focus();
                break;
            case 415:
            case 10252:
                this.close(t, !0),
                this.api.play({
                    reason: "settingsInteraction"
                });
                break;
            case 10009:
                this.close(t)
            }
        }
        ,
        o.onVisibility = function(t) {
            var e = this.api
              , i = this.children
              , n = this.controlbar
              , o = this.el
              , a = o.classList;
            if (t.visible) {
                e.pause({
                    reason: "settingsInteraction"
                }),
                // document.addEventListener("keydown", this.onInteraction),
                a.remove("jw-settings-transition-close"),
                a.add("jw-settings-open"),
                a.add("jw-settings-transition-open"),
                o.setAttribute("aria-expanded", "true"),
                this.visible = !0;
                var s = Object.keys(this.children);
                i && s.length && i[s[0]].items[0].el.focus({
                    preventScroll: !0
                })
            } else
                // document.removeEventListener("keydown", this.onInteraction),
                a.remove("jw-settings-transition-open"),
                a.add("jw-settings-transition-close"),
                o.setAttribute("aria-expanded", "false"),
                this.visible = !1;
            n && n.toggleVisibility(!t.visible)
        }
        ,
        o.open = function(t) {
            this.toggle(t, !0)
        }
        ,
        o.close = function(t) {
            this.toggle(t, !1)
        }
        ,
        o.toggle = function(t, e) {
            void 0 === e && (e = !this.visible),
            e !== this.visible && (this.children.captions || this.children.audioTracks) && this.trigger("visibility", {
                visible: e,
                evt: t
            })
        }
        ,
        o.onTransition = function() {
            this.visible || this.el.classList.remove("jw-settings-transition-open", "jw-settings-open")
        }
        ,
        o.onAudioTracks = function(t, e) {
            var i = this;
            this.setupMenu("audioTracks", this.localization.audioTracks, e, (function(t) {
                return i.api.setCurrentAudioTrack(t)
            }
            ), t.get("currentAudioTrackIndex"))
        }
        ,
        o.onAudioTrackIndex = function(t, e) {
            var i = this.children.audioTracks;
            Object(z.d)(i, e),
            this.close()
        }
        ,
        o.onCaptionsList = function(t, e) {
            var i = this
              , n = {
                defaultText: this.localization.off
            }
              , o = t.get("captionsIndex");
            this.setupMenu("captions", this.localization.cc, e, (function(t) {
                return i.api.setCurrentCaptions(t)
            }
            ), o, n)
        }
        ,
        o.onCaptionsIndex = function(t, e) {
            var i = this.children.captions;
            Object(z.d)(i, e),
            this.close()
        }
        ,
        o.onPlaylistItem = function() {
            var t = this
              , e = this.children;
            this.close(),
            e && e.length && e.forEach((function(e) {
                t.removeChild(e)
            }
            ))
        }
        ,
        o.updateControlbarButtons = function() {
            var t = this.controlbar.elements.settingsButton;
            Object.keys(this.children).length ? t.show() : t.hide()
        }
        ,
        o.destroy = function() {
            z.b.call(this),
            this.el.removeEventListener("animationend", this.onTransition),
            // document.removeEventListener("keydown", this.onInteraction),
            this.controlbar && this.controlbar.toggleVisibility(!0)
        }
        ,
        n
    }(C.a)
      , A = i(69);
    function _(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function I(t, e) {
        return (I = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    i(171);
    function H(t, e, i) {
        var n = t.createElementNS("http://www.w3.org/2000/svg", "circle");
        n.setAttribute("class", i),
        n.setAttribute("cx", "50%"),
        n.setAttribute("cy", "50%"),
        n.setAttribute("r", "75");
        var o = e.element().querySelector(".jw-svg-icon-buffer");
        o && o.appendChild(n)
    }
    var V = function(t) {
        var e, i;
        function o(e, i) {
            var n;
            return (n = t.call(this, e, i) || this).context = e,
            n.playerContainer = i,
            n.api = null,
            n.model = null,
            n.div = null,
            n.backdrop = null,
            n.pauseDisplay = null,
            n.displayContainer = null,
            n.controlbar = null,
            n.seekbar = null,
            n.seekState = !1,
            n.settingsMenu = null,
            n.showing = !1,
            n.instreamState = !1,
            n.keydownCallback = null,
            n
        }
        i = t,
        (e = o).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        I(e, i);
        var a, s, r, l = o.prototype;
        return l.enable = function(e, i) {
            var o = this;
            Object(p.a)(this.playerContainer, "jw-tizen-app jw-flag-fullscreen"),
            this.api = e,
            this.model = i;
            var a = this.context.createElement("div");
            if (a.className = "jw-tizen-controls jw-tizen-reset",
            !this.pauseDisplay) {
                var s = Object(p.e)('<div class="jw-pause-display jw-reset"><div class="jw-pause-display-container jw-reset"><div class="jw-pause-title jw-reset-text"></div><div class="jw-pause-description jw-reset-text"></div></div></div>');
                new n.a(i).setup(s.querySelector(".jw-pause-display-container")),
                a.appendChild(s),
                this.pauseDisplay = s
            }
            if (!this.displayContainer) {
                var r = new O.a(i,e);
                H(this.context, r, "jw-tizen-buffer-draw"),
                H(this.context, r, "jw-tizen-buffer-erase"),
                a.appendChild(r.element()),
                this.displayContainer = r
            }
            var l = new m(e,i,this.playerContainer.querySelector(".jw-hidden-accessibility"));
            l.on("backClick", this.onBackClick, this),
            a.appendChild(l.element());
            var c = this.seekbar = new k(i,e,l.elements.time);
            a.appendChild(c.element());
            var w = i.get("localization")
              , u = new L(e,i.player,this.controlbar,w);
            u.on(T.tb, (function() {
                return o.userActive()
            }
            )),
            l.on("settingsInteraction", (function() {
                u.toggle();
                var t = o.div && o.div.querySelector(".jw-active");
                u.visible && t && Object(p.o)(t, "jw-active")
            }
            )),
            a.insertBefore(u.el, l.element()),
            e.on("playlistComplete", this.onBackClick, this),
            this.keydownCallback && (this.playerContainer.removeEventListener("keydown", this.keydownCallback),
            this.keydownCallback = null),
            this.keydownCallback = function(t) {
                return o.handleKeydown(t)
            }
            ,
            document.addEventListener("keydown", this.keydownCallback),
            t.prototype.enable.call(this, e, i);
            var d = this.controlbar;
            if (d) {
                var j = d.nextUpToolTip;
                j && (j.off("all"),
                i.get("nextUp") && j.onNextUp(i, i.get("nextUp")),
                d.nextUpToolTip = null,
                l.nextUpToolTip = j,
                a.appendChild(j.element())),
                d.destroy()
            }
            this.settingsMenu && this.settingsMenu.destroy(),
            this.settingsMenu = u,
            this.controlbar = l,
            this.div = a,
            this.addBackdrop(),
            this.addControls(),
            this.playerContainer.focus({
                preventScroll: !0
            }),
            this.userInactive(),
            i.set("controlsEnabled", !0)
        }
        ,
        l.addControls = function() {
            var e = this.wrapperElement.querySelector(".jw-controls");
            e && this.wrapperElement.removeChild(e),
            t.prototype.addControls.call(this)
        }
        ,
        l.disable = function(e) {
            this.model = null,
            this.apiEnabled && (this.api.off(null, null, this),
            this.api = null),
            this.keydownCallback && document.removeEventListener("keydown", this.keydownCallback),
            this.seekbar && this.seekbar.destroy(),
            t.prototype.disable.call(this, e)
        }
        ,
        l.userActive = function(e) {
            void 0 === e && (e = 5e3),
            t.prototype.userActive.call(this, e)
        }
        ,
        l.onBackClick = function() {
            this.api.trigger("backClick"),
            this.api.remove()
        }
        ,
        l.handleKeydown = function(t) {
            return;
            if (this.apiEnabled && this.model) {
                var e = !1
                  , i = this.settingsMenu;
                if (!i || !i.visible || 10253 === t.keyCode)
                    switch (this.controlbar && (this.controlbar.handleKeydown(t, this.showing, this.instreamState),
                    e = this.controlbar.activeButton === this.controlbar.elements.play),
                    t.keyCode) {
                    case 37:
                        if (this.instreamState)
                            return void this.userActive();
                        if (this.seekState)
                            return void this.updateSeek(-10);
                        if (!this.showing || e)
                            return void this.enterSeekMode();
                        this.userActive();
                        break;
                    case 39:
                        if (this.instreamState)
                            return void this.userActive();
                        if (this.seekState)
                            return void this.updateSeek(10);
                        if (!this.showing || e)
                            return void this.enterSeekMode();
                        this.userActive();
                        break;
                    case 38:
                        if (this.seekState)
                            return this.exitSeekMode(),
                            this.userInactive(),
                            void this.api.play();
                        this.userActive();
                        break;
                    case 40:
                        this.seekState && this.exitSeekMode(),
                        this.userActive();
                        break;
                    case 13:
                        if (t.preventDefault(),
                        this.seekState)
                            return void this.seek();
                        this.showing || (this.userActive(),
                        this.api.playToggle({
                            reason: "interaction"
                        }));
                        break;
                    case 415:
                        if (this.seekState)
                            return void this.seek();
                        this.model.get("state") !== T.pb && this.api.play();
                        break;
                    case 19:
                        if (this.seekState)
                            return void this.exitSeekMode();
                        this.model.get("state") !== T.ob && (this.userActive(),
                        this.api.pause());
                        break;
                    case 10252:
                        if (this.seekState)
                            return void this.seek();
                        this.model.get("state") !== T.ob && this.userActive(),
                        this.api.playToggle({
                            reason: "interaction"
                        });
                        break;
                    case 412:
                    case 417:
                        break;
                    case 10009:
                        if (this.seekState)
                            return this.exitSeekMode(),
                            void this.userActive();
                        this.onBackClick();
                        break;
                    case 10253:
                        this.userActive(),
                        i && i.toggle(t);
                        break;
                    case 10182:
                        this.api.remove()
                    }
            }
        }
        ,
        l.seek = function() {
            this.apiEnabled && this.seekbar && (this.seekbar.seek(),
            this.exitSeekMode(),
            this.api.play(),
            this.userInactive())
        }
        ,
        l.enterSeekMode = function() {
            this.apiEnabled && this.seekbar && (Object(p.a)(this.playerContainer, "jw-flag-seek"),
            this.seekState = !0,
            this.seekbar.show(),
            this.api.pause(),
            this.userActive())
        }
        ,
        l.exitSeekMode = function() {
            this.seekbar && (Object(p.o)(this.playerContainer, "jw-flag-seek"),
            this.seekState = !1,
            this.seekbar.hide())
        }
        ,
        l.updateSeek = function(t) {
            this.seekbar && (this.seekbar.update(t),
            this.userActive())
        }
        ,
        a = o,
        (s = [{
            key: "apiEnabled",
            get: function() {
                return !!this.api
            }
        }]) && _(a.prototype, s),
        r && _(a, r),
        o
    }(A.default);
    e.default = V
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return at
    }
    )),
    i.d(e, "b", (function() {
        return st
    }
    ));
    var n = i(99)
      , o = i.n(n)
      , a = i(100)
      , s = i.n(a)
      , r = i(101)
      , l = i.n(r)
      , c = i(102)
      , p = i.n(c)
      , w = i(103)
      , u = i.n(w)
      , d = i(104)
      , j = i.n(d)
      , h = i(105)
      , f = i.n(h)
      , g = i(106)
      , b = i.n(g)
      , m = i(107)
      , v = i.n(m)
      , y = i(108)
      , x = i.n(y)
      , k = i(109)
      , O = i.n(k)
      , C = i(110)
      , z = i.n(C)
      , T = i(111)
      , S = i.n(T)
      , M = i(112)
      , B = i.n(M)
      , E = i(113)
      , L = i.n(E)
      , A = i(114)
      , _ = i.n(A)
      , I = i(87)
      , H = i.n(I)
      , V = i(115)
      , P = i.n(V)
      , q = i(116)
      , N = i.n(q)
      , R = i(117)
      , U = i.n(R)
      , D = i(118)
      , F = i.n(D)
      , Z = i(119)
      , W = i.n(Z)
      , K = i(120)
      , Y = i.n(K)
      , X = i(121)
      , Q = i.n(X)
      , J = i(122)
      , $ = i.n(J)
      , G = i(123)
      , tt = i.n(G)
      , et = i(88)
      , it = i.n(et)
      , nt = i(77)
      , ot = null;
    function at(t) {
        var e = ct().querySelector(rt(t));
        return e ? lt(e) : null
    }
    function st(t) {
        var e = ct().querySelectorAll(t.split(",").map(rt).join(","));
        return Array.prototype.map.call(e, (function(t) {
            return lt(t)
        }
        ))
    }
    function rt(t) {
        return ".jw-svg-icon-" + t
    }
    function lt(t) {
        return t.cloneNode(!0)
    }
    function ct() {
        return ot || (ot = Object(nt.a)("<xml>" + o.a + s.a + l.a + p.a + u.a + j.a + f.a + b.a + v.a + x.a + O.a + z.a + S.a + B.a + L.a + _.a + H.a + P.a + N.a + U.a + F.a + Q.a + $.a + W.a + Y.a + tt.a + it.a + "</xml>")),
        ot
    }
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return o
    }
    ));
    var n = i(34);
    function o(t, e, i) {
        return new n.a(t).on("click enter", e, i)
    }
}
, function(t, e, i) {
    "use strict";
    var n = i(77)
      , o = i(36)
      , a = i(74);
    e.a = function(t, e, i, s) {
        var r = document.createElement("div");
        r.className = "jw-icon jw-icon-inline jw-button-color jw-reset " + t,
        r.setAttribute("role", "button"),
        r.setAttribute("tabindex", "0"),
        i && r.setAttribute("aria-label", i),
        r.style.display = "none";
        var l = Object(a.a)(r, e || o.a.noop);
        return s && Array.prototype.forEach.call(s, (function(t) {
            "string" == typeof t ? r.appendChild(Object(n.a)(t)) : r.appendChild(t)
        }
        )),
        {
            ui: l,
            element: function() {
                return r
            },
            toggle: function(t) {
                t ? this.show() : this.hide()
            },
            show: function() {
                r.style.display = ""
            },
            hide: function() {
                r.style.display = "none"
            }
        }
    }
}
, function(t, e, i) {
    "use strict";
    t.exports = function(t) {
        var e = [];
        return e.toString = function() {
            return this.map((function(e) {
                var i = function(t, e) {
                    var i = t[1] || ""
                      , n = t[3];
                    if (!n)
                        return i;
                    if (e && "function" == typeof btoa) {
                        var o = (s = n,
                        "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */")
                          , a = n.sources.map((function(t) {
                            return "/*# sourceURL=" + n.sourceRoot + t + " */"
                        }
                        ));
                        return [i].concat(a).concat([o]).join("\n")
                    }
                    var s;
                    return [i].join("\n")
                }(e, t);
                return e[2] ? "@media " + e[2] + "{" + i + "}" : i
            }
            )).join("")
        }
        ,
        e.i = function(t, i) {
            "string" == typeof t && (t = [[null, t, ""]]);
            for (var n = {}, o = 0; o < this.length; o++) {
                var a = this[o][0];
                null != a && (n[a] = !0)
            }
            for (o = 0; o < t.length; o++) {
                var s = t[o];
                null != s[0] && n[s[0]] || (i && !s[2] ? s[2] = i : i && (s[2] = "(" + s[2] + ") and (" + i + ")"),
                e.push(s))
            }
        }
        ,
        e
    }
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return a
    }
    ));
    var n, o = i(7);
    function a(t) {
        return n || (n = new DOMParser),
        Object(o.r)(Object(o.s)(n.parseFromString(t, "image/svg+xml").documentElement))
    }
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return o
    }
    ));
    var n = i(2);
    function o(t) {
        var e = []
          , i = (t = Object(n.i)(t)).split("\r\n\r\n");
        1 === i.length && (i = t.split("\n\n"));
        for (var o = 0; o < i.length; o++)
            if ("WEBVTT" !== i[o]) {
                var s = a(i[o]);
                s.text && e.push(s)
            }
        return e
    }
    function a(t) {
        var e = {}
          , i = t.split("\r\n");
        1 === i.length && (i = t.split("\n"));
        var o = 1;
        if (i[0].indexOf(" --\x3e ") > 0 && (o = 0),
        i.length > o + 1 && i[o + 1]) {
            var a = i[o]
              , s = a.indexOf(" --\x3e ");
            s > 0 && (e.begin = Object(n.g)(a.substr(0, s)),
            e.end = Object(n.g)(a.substr(s + 5)),
            e.text = i.slice(o + 1).join("\r\n"))
        }
        return e
    }
}
, , function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return c
    }
    )),
    i.d(e, "c", (function() {
        return p
    }
    )),
    i.d(e, "b", (function() {
        return d
    }
    )),
    i.d(e, "d", (function() {
        return j
    }
    ));
    var n, o, a = ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "ff00ff", "#00ffff"], s = ["Arial", "Courier", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"], r = ["100%", "75%", "50%", "25%", "0%"], l = [100, 75, 50, 25, 0], c = function(t) {
        return [{
            name: "color",
            label: t.color,
            options: n || w(t),
            values: a,
            defaultVal: "#ffffff"
        }, {
            name: "fontOpacity",
            label: t.fontOpacity,
            options: ["100%", "75%", "25%"],
            values: [100, 75, 25],
            defaultVal: 100
        }, {
            name: "userFontScale",
            label: t.userFontScale,
            options: ["200%", "175%", "150%", "125%", "100%", "75%", "50%"],
            values: [2, 1.75, 1.5, 1.25, 1, .75, .5],
            defaultVal: 1
        }, {
            name: "fontFamily",
            label: t.fontFamily,
            options: s,
            values: s,
            defaultVal: "Arial"
        }, {
            name: "edgeStyle",
            label: t.edgeStyle,
            options: o || u(t),
            values: ["none", "raised", "depressed", "uniform", "dropShadow"],
            defaultVal: "none"
        }, {
            name: "backgroundColor",
            label: t.backgroundColor,
            options: n || w(t),
            values: a,
            defaultVal: "#000000"
        }, {
            name: "backgroundOpacity",
            label: t.backgroundOpacity,
            options: r,
            values: l,
            defaultVal: 50
        }, {
            name: "windowColor",
            label: t.windowColor,
            options: n || w(t),
            values: a,
            defaultVal: "#000000"
        }, {
            name: "windowOpacity",
            label: t.windowOpacity,
            options: ["100%", "75%", "50%", "25%", "0%"],
            values: l,
            defaultVal: 0
        }]
    }, p = function(t) {
        return t && t.replace(/(Arrow|ape)/, "")
    }, w = function(t) {
        var e = t.white
          , i = t.black
          , o = t.red
          , a = t.green
          , s = t.blue
          , r = t.yellow
          , l = t.magenta
          , c = t.cyan;
        return n = [e, i, o, a, s, r, l, c]
    }, u = function(t) {
        var e = t.none
          , i = t.raised
          , n = t.depressed
          , a = t.uniform
          , s = t.dropShadow;
        return o = [e, i, n, a, s]
    };
    function d() {
        var t = this;
        Object.keys(this.children).map((function(e) {
            t.children[e].destroy()
        }
        )),
        this.model && (this.model.off(null, null, this),
        delete this.model),
        this.off()
    }
    function j(t, e) {
        t && e > -1 && (t.items.forEach((function(t) {
            t.deactivate()
        }
        )),
        t.items[e].activate())
    }
}
, , function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return r
    }
    )),
    i.d(e, "b", (function() {
        return l
    }
    ));
    var n = i(7)
      , o = i(93)
      , a = i(74);
    function s(t, e) {
        return (s = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var r = function() {
        function t(t, e, i) {
            void 0 === i && (i = o.c),
            this.el = Object(n.e)(i(t)),
            this.ui = Object(a.a)(this.el, e, this)
        }
        return t.prototype.destroy = function() {
            this.el.parentNode && this.el.parentNode.removeChild(this.el),
            this.ui.destroy()
        }
        ,
        t
    }()
      , l = function(t) {
        var e, i;
        function a(e, i, n) {
            return void 0 === n && (n = o.b),
            t.call(this, e, i, n) || this
        }
        i = t,
        (e = a).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        s(e, i);
        var r = a.prototype;
        return r.activate = function() {
            this.active || (Object(n.v)(this.el, "jw-settings-item-active", !0),
            this.el.setAttribute("aria-checked", "true"),
            this.active = !0)
        }
        ,
        r.deactivate = function() {
            this.active && (Object(n.v)(this.el, "jw-settings-item-active", !1),
            this.el.setAttribute("aria-checked", "false"),
            this.active = !1)
        }
        ,
        a
    }(r)
}
, , , , function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return o
    }
    )),
    i.d(e, "b", (function() {
        return a
    }
    ));
    var n = i(7);
    function o(t) {
        var e = -1;
        return t >= 1280 ? e = 7 : t >= 960 ? e = 6 : t >= 800 ? e = 5 : t >= 640 ? e = 4 : t >= 540 ? e = 3 : t >= 420 ? e = 2 : t >= 320 ? e = 1 : t >= 250 && (e = 0),
        e
    }
    function a(t, e) {
        var i = "jw-breakpoint-" + e;
        Object(n.p)(t, /jw-breakpoint--?\d+/, i)
    }
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-arrow-right" viewBox="0 0 240 240" focusable="false"><path d="M183.6,104.4L81.8,0L45.4,36.3l84.9,84.9l-84.9,84.9L79.3,240l101.9-101.7c9.9-6.9,12.4-20.4,5.5-30.4C185.8,106.7,184.8,105.4,183.6,104.4L183.6,104.4z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-jwplayer-logo" viewBox="0 0 992 1024" focusable="false"><path d="M144 518.4c0 6.4-6.4 6.4-6.4 0l-3.2-12.8c0 0-6.4-19.2-12.8-38.4 0-6.4-6.4-12.8-9.6-22.4-6.4-6.4-16-9.6-28.8-6.4-9.6 3.2-16 12.8-16 22.4s0 16 0 25.6c3.2 25.6 22.4 121.6 32 140.8 9.6 22.4 35.2 32 54.4 22.4 22.4-9.6 28.8-35.2 38.4-54.4 9.6-25.6 60.8-166.4 60.8-166.4 6.4-12.8 9.6-12.8 9.6 0 0 0 0 140.8-3.2 204.8 0 25.6 0 67.2 9.6 89.6 6.4 16 12.8 28.8 25.6 38.4s28.8 12.8 44.8 12.8c6.4 0 16-3.2 22.4-6.4 9.6-6.4 16-12.8 25.6-22.4 16-19.2 28.8-44.8 38.4-64 25.6-51.2 89.6-201.6 89.6-201.6 6.4-12.8 9.6-12.8 9.6 0 0 0-9.6 256-9.6 355.2 0 25.6 6.4 48 12.8 70.4 9.6 22.4 22.4 38.4 44.8 48s48 9.6 70.4-3.2c16-9.6 28.8-25.6 38.4-38.4 12.8-22.4 25.6-48 32-70.4 19.2-51.2 35.2-102.4 51.2-153.6s153.6-540.8 163.2-582.4c0-6.4 0-9.6 0-12.8 0-9.6-6.4-19.2-16-22.4-16-6.4-32 0-38.4 12.8-6.4 16-195.2 470.4-195.2 470.4-6.4 12.8-9.6 12.8-9.6 0 0 0 0-156.8 0-288 0-70.4-35.2-108.8-83.2-118.4-22.4-3.2-44.8 0-67.2 12.8s-35.2 32-48 54.4c-16 28.8-105.6 297.6-105.6 297.6-6.4 12.8-9.6 12.8-9.6 0 0 0-3.2-115.2-6.4-144-3.2-41.6-12.8-108.8-67.2-115.2-51.2-3.2-73.6 57.6-86.4 99.2-9.6 25.6-51.2 163.2-51.2 163.2v3.2z"></path></svg>'
}
, function(t, e, i) {
    "use strict";
    i.d(e, "b", (function() {
        return r
    }
    ));
    var n = i(11)
      , o = i(77)
      , a = i(74)
      , s = {};
    function r(t) {
        if (!s[t]) {
            var e = Object.keys(s);
            e.length > 10 && delete s[e[0]];
            var i = Object(o.a)(t);
            s[t] = i
        }
        return s[t].cloneNode(!0)
    }
    var l = function() {
        function t(t, e, i, o, s) {
            var l, c = document.createElement("div");
            c.className = "jw-icon jw-icon-inline jw-button-color jw-reset " + (s || ""),
            c.setAttribute("button", o),
            c.setAttribute("role", "button"),
            c.setAttribute("tabindex", "0"),
            e && c.setAttribute("aria-label", e),
            t && "<svg" === t.substring(0, 4) ? l = r(t) : ((l = document.createElement("div")).className = "jw-icon jw-button-image jw-button-color jw-reset",
            t && Object(n.d)(l, {
                backgroundImage: "url(" + t + ")"
            })),
            c.appendChild(l),
            Object(a.a)(c, i, this),
            c.addEventListener("mousedown", (function(t) {
                t.preventDefault()
            }
            )),
            this.id = o,
            this.buttonElement = c
        }
        var e = t.prototype;
        return e.element = function() {
            return this.buttonElement
        }
        ,
        e.toggle = function(t) {
            t ? this.show() : this.hide()
        }
        ,
        e.show = function() {
            this.buttonElement.style.display = ""
        }
        ,
        e.hide = function() {
            this.buttonElement.style.display = "none"
        }
        ,
        t
    }();
    e.a = l
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return o
    }
    ));
    var n = i(7);
    function o(t, e, i, o, a) {
        var s = document.createElement("div");
        s.className = "jw-reset-text jw-tooltip jw-tooltip-" + e,
        s.setAttribute("dir", "auto");
        var r = document.createElement("div");
        r.className = "jw-text",
        s.appendChild(r),
        t.appendChild(s);
        var l = {
            dirty: !!i,
            opened: !1,
            text: i,
            touchEvent: !1,
            suppress: !1,
            open: function() {
                l.touchEvent || (l.suppress ? l.suppress = !1 : (c(!0),
                o && o()))
            },
            close: function() {
                l.touchEvent || (c(!1),
                a && a())
            },
            setText: function(t) {
                t !== l.text && (l.text = t,
                l.dirty = !0),
                l.opened && c(!0)
            }
        }
          , c = function(t) {
            t && l.dirty && (Object(n.q)(r, l.text),
            l.dirty = !1),
            l.opened = t,
            Object(n.v)(s, "jw-open", t)
        };
        return t.addEventListener("mouseover", l.open),
        t.addEventListener("focus", l.open),
        t.addEventListener("blur", l.close),
        t.addEventListener("mouseout", l.close),
        t.addEventListener("touchstart", (function() {
            l.touchEvent = !0
        }
        ), {
            passive: !0
        }),
        l
    }
}
, function(t, e, i) {
    "use strict";
    var n = i(34)
      , o = i(9)
      , a = i(7)
      , s = i(75)
      , r = i(73)
      , l = i(82)
      , c = i(125)
      , p = i(80)
      , w = i(90)
      , u = function(t) {
        var e = t.name
          , i = t.title
          , n = {
            captions: "cc-off",
            audioTracks: "audio-tracks",
            quality: "quality-100",
            playbackRates: "playback-rate"
        }[e];
        if (n || t.icon) {
            var o = Object(s.a)("jw-settings-" + e + " jw-submenu-" + e, (function(e) {
                t.open(e)
            }
            ), i, [t.icon && Object(a.e)(t.icon) || Object(r.a)(n)])
              , l = o.element();
            return l.setAttribute("name", e),
            l.setAttribute("role", "menuitemradio"),
            l.setAttribute("type", "button"),
            l.setAttribute("aria-expanded", "false"),
            l.setAttribute("aria-haspopup", "true"),
            l.setAttribute("aria-controls", t.el.id),
            "ontouchstart"in window || (o.tooltip = Object(w.a)(l, e, i)),
            o.ui.directSelect = !0,
            o
        }
    }
      , d = i(13);
    function j(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function h(t, e) {
        return (h = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    i.d(e, "a", (function() {
        return f
    }
    ));
    var f = function(t) {
        var e, i;
        function o(e, i, n, o, s) {
            var r;
            return void 0 === s && (s = c.a),
            (r = t.call(this) || this).open = r.open.bind(j(r)),
            r.close = r.close.bind(j(r)),
            r.toggle = r.toggle.bind(j(r)),
            r.name = e,
            r.title = i || e,
            r.localizedPrevious = o.prev,
            r.isSubmenu = !!n,
            r.el = Object(a.e)(s(r.isSubmenu, e, r.title)),
            r.buttonContainer = r.el.querySelector(".jw-" + r.name + "-topbar-buttons"),
            r.children = {},
            r.openMenus = [],
            r.items = [],
            r.visible = !1,
            r.parentMenu = n,
            r.mainMenu = r.parentMenu ? r.parentMenu.mainMenu : j(r),
            r.categoryButton = null,
            r.closeButton = r.mainMenu.closeButton,
            r.isSubmenu && (r.parentMenu.name === r.mainMenu.name && (r.categoryButton = r.createCategoryButton()),
            r.parentMenu.parentMenu && !r.mainMenu.backButton && (r.mainMenu.backButton = r.createBackButton(r.localizedPrevious)),
            r.itemsContainer = r.createItemsContainer(),
            r.parentMenu.appendMenu(j(r))),
            r
        }
        i = t,
        (e = o).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        h(e, i);
        var w = o.prototype;
        return w.createItemsContainer = function() {
            var t = this
              , e = this.el.querySelector(".jw-settings-submenu-items")
              , i = this.mainMenu.closeButton && this.mainMenu.closeButton.element()
              , o = this.mainMenu.backButton && this.mainMenu.backButton.element()
              , s = this.categoryButton && this.categoryButton.element()
              , r = new n.a(e);
            return r.on("keydown", (function(n) {
                if (event.target.parentNode === e) {
                    var r, l = n.sourceEvent, c = n.target, w = t.topbar && t.topbar.firstChild, u = document.getElementsByClassName("jw-icon-settings")[0], d = s ? Object(a.k)(s) : i, j = s ? Object(a.n)(s) : o, h = Object(a.k)(c) || w || e.firstChild, f = Object(a.n)(c) || w || e.lastChild, g = l && Object(p.c)(l.key);
                    switch (g) {
                    case "Tab":
                        r = l.shiftKey ? j : d;
                        break;
                    case "Left":
                        r = j || t.close(n) && u;
                        break;
                    case "Up":
                        r = f;
                        break;
                    case "Right":
                        r = d;
                        break;
                    case "Down":
                        r = h;
                        break;
                    case "Esc":
                        r = u,
                        t.mainMenu.close(event)
                    }
                    r && r.focus(),
                    l.preventDefault(),
                    "Esc" !== g && l.stopPropagation()
                }
            }
            )),
            r
        }
        ,
        w.createCategoryButton = function() {
            return u(this)
        }
        ,
        w.createBackButton = function(t) {
            var e = this
              , i = Object(s.a)("jw-settings-back", (function(t) {
                var i = e.mainMenu.backButtonTarget;
                i && i.open(t)
            }
            ), t, [Object(r.a)("arrow-left")]);
            return Object(a.m)(this.mainMenu.topbar.el, i.element()),
            i
        }
        ,
        w.setBackButtonAriaLabel = function(t) {
            var e = this.mainMenu.backButton.element()
              , i = t ? this.localizedPrevious + " - " + t : this.localizedPrevious;
            e.setAttribute("aria-label", i)
        }
        ,
        w.createTopbar = function() {
            var t = Object(a.e)('<div class="jw-reset jw-submenu-topbar"></div>')
              , e = this.itemsContainer.el
              , i = this.mainMenu
              , o = this.categoryButton;
            return this.topbarUI = new n.a(t).on("keydown", (function(t) {
                var n = t.sourceEvent
                  , s = function() {
                    o ? (Object(a.n)(o.element()).focus(),
                    n.preventDefault()) : i.backButton.element().focus()
                }
                  , r = function() {
                    o ? (Object(a.k)(o.element()).focus(),
                    n.preventDefault()) : i.closeButton.element().focus()
                };
                switch (Object(p.c)(n.key)) {
                case "Up":
                    e.lastChild.focus();
                    break;
                case "Down":
                    e.firstChild.focus();
                    break;
                case "Left":
                    s();
                    break;
                case "Right":
                    r();
                    break;
                case "Tab":
                    n.shiftKey ? s() : r()
                }
            }
            )),
            Object(a.m)(this.el, t),
            t
        }
        ,
        w.createItems = function(t, e, i, n) {
            var o = this;
            void 0 === i && (i = {}),
            void 0 === n && (n = l.b);
            var s = this.name;
            return t.map((function(t, r) {
                var l, c, p;
                switch (s) {
                case "quality":
                    "Auto" === t.label && 0 === r ? (l = "" + i.defaultText,
                    p = ' <span class="jw-reset jw-auto-label"></span>') : l = t.label;
                    break;
                case "captions":
                    l = "Off" !== t.label && "off" !== t.id || 0 !== r ? t.label : i.defaultText;
                    break;
                case "playbackRates":
                    c = t,
                    l = Object(d.g)(i.tooltipText) ? "x" + t : t + "x";
                    break;
                case "audioTracks":
                    l = t.name
                }
                l || (l = t,
                "object" == typeof t && (l.options = i));
                var w = new n(l,function(t) {
                    if (!w.active) {
                        if (w.deactivate) {
                            o.items.filter((function(t) {
                                return !0 === t.active
                            }
                            )).forEach((function(t) {
                                t.deactivate()
                            }
                            ));
                            var i = o.mainMenu.backButtonTarget;
                            i ? i.open(t) : o.mainMenu.close(t)
                        }
                        w.activate && w.activate(),
                        e(c || r)
                    }
                }
                .bind(o));
                return p && w.el.appendChild(Object(a.e)(p)),
                w
            }
            ))
        }
        ,
        w.setMenuItems = function(t, e) {
            var i = this;
            t ? (this.destroyItems(),
            t.forEach((function(t) {
                i.items.push(t),
                i.itemsContainer.el.appendChild(t.el)
            }
            )),
            e > -1 && this.items[e].activate(),
            this.categoryButton && this.categoryButton.show()) : this.removeMenu()
        }
        ,
        w.appendMenu = function(t) {
            if (t) {
                var e = t.el
                  , i = t.name
                  , n = t.categoryButton;
                if (this.children[i] = t,
                n) {
                    var o = this.mainMenu.buttonContainer
                      , a = o.querySelector(".jw-settings-sharing")
                      , s = "quality" === i ? o.firstChild : a || this.closeButton.element();
                    o.insertBefore(n.element(), s)
                }
                this.mainMenu.el.appendChild(e),
                this.mainMenu.trigger("menuAppended", i)
            }
        }
        ,
        w.removeMenu = function(t) {
            if (!t)
                return this.parentMenu.removeMenu(this.name);
            var e = this.children[t];
            e && (delete this.children[t],
            e.destroy(),
            this.mainMenu.trigger("menuRemoved", t))
        }
        ,
        w.open = function(t) {
            var e, i = this.mainMenu.visible;
            if (this.items.length) {
                var n = t && t.sourceEvent
                  , o = this.topbar ? this.topbar.firstChild : this.items[0].el
                  , a = this.items[this.items.length - 1].el
                  , s = n && "keydown" === n.type
                  , r = "Up" === (s && Object(p.c)(n.key)) ? a : o;
                if (!this.visible || this.openMenus.length) {
                    var l = this.mainMenu
                      , c = this.parentMenu
                      , w = this.categoryButton;
                    if (c.openMenus.push(this.name),
                    c.openMenus.length > 1 && c.closeChildren(this.name),
                    w && w.element().setAttribute("aria-expanded", "true"),
                    c.isSubmenu) {
                        c.el.classList.remove("jw-settings-submenu-active"),
                        l.topbar.el.classList.add("jw-nested-menu-open");
                        var u = l.topbar.el.querySelector(".jw-settings-topbar-text");
                        u.setAttribute("name", this.title),
                        u.innerText = this.title;
                        var d = c.title;
                        this.setBackButtonAriaLabel(d),
                        l.backButton.show(),
                        this.mainMenu.backButtonTarget = this.parentMenu,
                        e = u
                    } else
                        l.topbar.el.classList.remove("jw-nested-menu-open"),
                        l.backButton && l.backButton.hide();
                    this.el.classList.add("jw-settings-submenu-active"),
                    i && s ? e = r : i || (l.open(t),
                    e = w.element(),
                    w && w.tooltip && !s && (w.tooltip.suppress = !0)),
                    this.openMenus.length && this.closeChildren(),
                    this.el.scrollTop = 0,
                    this.visible = !0,
                    this.el.setAttribute("aria-expanded", "true"),
                    e && setTimeout((function() {
                        e.focus()
                    }
                    ))
                } else
                    this.items.length && s && r.focus()
            }
        }
        ,
        w.close = function(t) {
            var e = this;
            this.visible && (this.visible = !1,
            this.el.setAttribute("aria-expanded", "false"),
            this.el.classList.remove("jw-settings-submenu-active"),
            this.categoryButton && this.categoryButton.element().setAttribute("aria-expanded", "false"),
            this.parentMenu.openMenus = this.parentMenu.openMenus.filter((function(t) {
                return t !== e.name
            }
            )),
            !this.mainMenu.openMenus.length && this.mainMenu.visible && this.mainMenu.close(t),
            this.openMenus.length && this.closeChildren())
        }
        ,
        w.closeChildren = function(t) {
            var e = this;
            this.openMenus.forEach((function(i) {
                if (i !== t) {
                    var n = e.children[i];
                    n && n.close()
                }
            }
            ))
        }
        ,
        w.toggle = function(t, e) {
            if (e && this.mainMenu.visible)
                return this.mainMenu.close(t);
            this.visible ? this.close(t) : this.open(t)
        }
        ,
        w.destroyItems = function() {
            this.items.forEach((function(t) {
                t.destroy()
            }
            )),
            this.items = []
        }
        ,
        w.destroy = function() {
            var t = this;
            Object.keys(this.children).map((function(e) {
                t.children[e].destroy()
            }
            )),
            this.categoryButton && (this.parentMenu.buttonContainer.removeChild(this.categoryButton.element()),
            this.categoryButton.ui.destroy()),
            this.topbarUI && this.topbarUI.destroy(),
            this.destroyItems(),
            this.itemsContainer.destroy();
            var e = this.parentMenu.openMenus
              , i = e.indexOf(this.name);
            e.length && i > -1 && this.openMenus.splice(i, 1),
            delete this.parentMenu,
            this.visible = !1,
            this.el.parentNode && this.el.parentNode.removeChild(this.el),
            this.off()
        }
        ,
        o
    }(o.a)
}
, function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return w
    }
    ));
    var n, o = i(0), a = i(5), s = i(8), r = i(9), l = i(3), c = i(11), p = i(7), w = {
        back: !0,
        backgroundOpacity: 50,
        edgeStyle: null,
        fontSize: 14,
        fontOpacity: 100,
        fontScale: .05,
        preprocessor: o.o,
        windowOpacity: 0
    }, u = function(t) {
        var e, r, u, d, j, h, f, g, b, m = this, v = t.player;
        function y() {
            Object(o.s)(e.fontSize) && (v.get("containerHeight") ? g = w.fontScale * (e.userFontScale || 1) * e.fontSize / w.fontSize : v.once("change:containerHeight", y, this))
        }
        function x() {
            var t = v.get("containerHeight");
            if (t) {
                var e;
                if (v.get("fullscreen") && a.OS.iOS)
                    e = null;
                else {
                    var i = t * g;
                    e = Math.round(10 * function(t) {
                        var e = v.get("mediaElement");
                        if (e && e.videoHeight) {
                            var i = e.videoWidth
                              , n = e.videoHeight
                              , o = i / n
                              , s = v.get("containerHeight")
                              , r = v.get("containerWidth");
                            if (v.get("fullscreen") && a.OS.mobile) {
                                var l = window.screen;
                                l.orientation && (s = l.availHeight,
                                r = l.availWidth)
                            }
                            if (r && s && i && n)
                                return (r / s > o ? s : n * r / i) * g
                        }
                        return t
                    }(i)) / 10
                }
                v.get("renderCaptionsNatively") ? function(t, e) {
                    var i = "#" + t + " .jw-video::-webkit-media-text-track-display";
                    e && (e += "px",
                    a.OS.iOS && Object(c.b)(i, {
                        fontSize: "inherit"
                    }, t, !0));
                    b.fontSize = e,
                    Object(c.b)(i, b, t, !0)
                }(v.get("id"), e) : Object(c.d)(j, {
                    fontSize: e
                })
            }
        }
        function k(t, e, i) {
            var n = Object(c.c)("#000000", i);
            "dropShadow" === t ? e.textShadow = "0 2px 1px " + n : "raised" === t ? e.textShadow = "0 0 5px " + n + ", 0 1px 5px " + n + ", 0 2px 5px " + n : "depressed" === t ? e.textShadow = "0 -2px 1px " + n : "uniform" === t && (e.textShadow = "-2px 0 1px " + n + ",2px 0 1px " + n + ",0 -2px 1px " + n + ",0 2px 1px " + n + ",-1px 1px 1px " + n + ",1px 1px 1px " + n + ",1px -1px 1px " + n + ",1px 1px 1px " + n)
        }
        (j = document.createElement("div")).className = "jw-captions jw-reset",
        this.show = function() {
            Object(p.a)(j, "jw-captions-enabled")
        }
        ,
        this.hide = function() {
            Object(p.o)(j, "jw-captions-enabled")
        }
        ,
        this.populate = function(t) {
            v.get("renderCaptionsNatively") || (u = [],
            r = t,
            t ? this.selectCues(t, d) : this.renderCues())
        }
        ,
        this.resize = function() {
            x(),
            this.renderCues(!0)
        }
        ,
        this.renderCues = function(t) {
            t = !!t,
            n && n.processCues(window, u, j, t)
        }
        ,
        this.selectCues = function(t, e) {
            if (t && t.data && e && !v.get("renderCaptionsNatively")) {
                var i = this.getAlignmentPosition(t, e);
                !1 !== i && (u = this.getCurrentCues(t.data, i),
                this.renderCues(!0))
            }
        }
        ,
        this.getCurrentCues = function(t, e) {
            return Object(o.k)(t, (function(t) {
                return e >= t.startTime && (!t.endTime || e <= t.endTime)
            }
            ))
        }
        ,
        this.getAlignmentPosition = function(t, e) {
            var i = t.source
              , n = e.metadata
              , a = e.currentTime;
            return i && n && Object(o.v)(n[i]) && (a = n[i]),
            a
        }
        ,
        this.clear = function() {
            Object(p.g)(j)
        }
        ,
        this.setup = function(t, i) {
            h = document.createElement("div"),
            f = document.createElement("span"),
            h.className = "jw-captions-window jw-reset",
            f.className = "jw-captions-text jw-reset",
            e = Object(o.j)({}, w, i),
            g = w.fontScale;
            var n = function() {
                y(e.fontSize);
                var i = e.windowColor
                  , n = e.windowOpacity
                  , o = e.edgeStyle;
                b = {};
                var s = {};
                !function(t, e) {
                    var i = e.color
                      , n = e.fontOpacity;
                    (i || n !== w.fontOpacity) && (t.color = Object(c.c)(i || "#ffffff", n));
                    if (e.back) {
                        var o = e.backgroundColor
                          , a = e.backgroundOpacity;
                        o === w.backgroundColor && a === w.backgroundOpacity || (t.backgroundColor = Object(c.c)(o, a))
                    } else
                        t.background = "transparent";
                    e.fontFamily && (t.fontFamily = e.fontFamily);
                    e.fontStyle && (t.fontStyle = e.fontStyle);
                    e.fontWeight && (t.fontWeight = e.fontWeight);
                    e.textDecoration && (t.textDecoration = e.textDecoration)
                }(s, e),
                (i || n !== w.windowOpacity) && (b.backgroundColor = Object(c.c)(i || "#000000", n)),
                k(o, s, e.fontOpacity),
                e.back || null !== o || k("uniform", s),
                Object(c.d)(h, b),
                Object(c.d)(f, s),
                function(t, e) {
                    x(),
                    function(t, e) {
                        a.Browser.safari && Object(c.b)("#" + t + " .jw-video::-webkit-media-text-track-display-backdrop", {
                            backgroundColor: e.backgroundColor
                        }, t, !0);
                        Object(c.b)("#" + t + " .jw-video::-webkit-media-text-track-display", b, t, !0),
                        Object(c.b)("#" + t + " .jw-video::cue", e, t, !0)
                    }(t, e),
                    function(t, e) {
                        Object(c.b)("#" + t + " .jw-text-track-display", b, t),
                        Object(c.b)("#" + t + " .jw-text-track-cue", e, t)
                    }(t, e)
                }(t, s)
            };
            n(),
            h.appendChild(f),
            j.appendChild(h),
            v.change("captionsTrack", (function(t, e) {
                this.populate(e)
            }
            ), this),
            v.set("captions", e),
            v.on("change:captions", (function(t, i) {
                e = i,
                n()
            }
            ))
        }
        ,
        this.element = function() {
            return j
        }
        ,
        this.destroy = function() {
            v.off(null, null, this),
            this.off()
        }
        ;
        var O = function(t) {
            d = t,
            m.selectCues(r, d)
        };
        v.on("change:playlistItem", (function() {
            d = null,
            u = []
        }
        ), this),
        v.on(l.Q, (function(t) {
            u = [],
            O(t)
        }
        ), this),
        v.on(l.S, O, this),
        v.on("subtitlesTrackData", (function() {
            this.selectCues(r, d)
        }
        ), this),
        v.on("change:captionsList", (function t(e, o) {
            var a = this;
            1 !== o.length && (e.get("renderCaptionsNatively") || n || (i.e(10).then(function(t) {
                n = i(98).default
            }
            .bind(null, i)).catch(Object(s.c)(301121)).catch((function(t) {
                a.trigger(l.ub, t)
            }
            )),
            e.off("change:captionsList", t, this)))
        }
        ), this)
    };
    Object(o.j)(u.prototype, r.a),
    e.b = u
}
, function(t, e, i) {
    "use strict";
    i.d(e, "c", (function() {
        return a
    }
    )),
    i.d(e, "a", (function() {
        return s
    }
    )),
    i.d(e, "b", (function() {
        return r
    }
    ));
    var n = i(87)
      , o = i.n(n)
      , a = function(t) {
        return '<button type="button" class="jw-reset-text jw-settings-content-item" aria-label="' + t + '" dir="auto">' + t + "</button>"
    }
      , s = function(t) {
        var e = t.label;
        return '<button type="button" class="jw-reset-text jw-settings-content-item" aria-label="' + e + '" aria-controls="jw-settings-submenu-' + t.name + '" dir="auto" aria-haspopup="true">' + e + "<div class='jw-reset jw-settings-value-wrapper'><div class=\"jw-reset-text jw-settings-content-item-value\">" + t.currentSelection + '</div><div class="jw-reset-text jw-settings-content-item-arrow">' + o.a + "</div></div></button>"
    }
      , r = function(t) {
        return '<button type="button" class="jw-reset-text jw-settings-content-item" aria-label="' + t + '" role="menuitemradio" aria-checked="false" dir="auto">' + t + "</button>"
    }
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-sharing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M175,160c-6.9,0.2-13.6,2.6-19,7l-62-39c0.8-2.6,1.2-5.3,1-8c0.2-2.7-0.2-5.4-1-8l62-39c5.4,4.4,12.1,6.8,19,7c16.3,0.3,29.7-12.6,30-28.9c0-0.4,0-0.7,0-1.1c0-16.5-13.5-30-30-30s-30,13.5-30,30c-0.2,2.7,0.2,5.4,1,8L84,97c-5.4-4.4-12.1-6.8-19-7c-16.5,0-30,13.5-30,30s13.5,30,30,30c6.9-0.2,13.6-2.6,19-7l62,39c-0.8,2.6-1.2,5.3-1,8c0,16.5,13.5,30,30,30s30-13.5,30-30S191.6,160,175,160z"></path></svg>'
}
, function(t, e, i) {
    "use strict";
    var n = i(5)
      , o = i(9)
      , a = i(34)
      , s = i(52)
      , r = i(7);
    function l(t, e) {
        return (l = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var c = function(t) {
        var e = Object(r.c)(t)
          , i = window.pageXOffset;
        return i && n.OS.android && document.body.parentElement && document.body.parentElement.getBoundingClientRect().left >= 0 && (e.left -= i,
        e.right -= i),
        e
    }
      , p = function(t) {
        var e, i;
        function n(e, i) {
            var n;
            return (n = t.call(this) || this).className = e + " jw-background-color jw-reset",
            n.orientation = i,
            n
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        l(e, i);
        var o = n.prototype;
        return o.setup = function() {
            var t, e;
            this.el = Object(r.e)((t = this.className,
            e = "jw-slider-" + this.orientation,
            void 0 === t && (t = ""),
            void 0 === e && (e = ""),
            '<div class="' + t + " " + e + ' jw-reset" aria-hidden="true"><div class="jw-slider-container jw-reset"><div class="jw-rail jw-reset"></div><div class="jw-buffer jw-reset"></div><div class="jw-progress jw-reset"></div><div class="jw-knob jw-reset"></div></div></div>')),
            this.elementRail = this.el.getElementsByClassName("jw-slider-container")[0],
            this.elementBuffer = this.el.getElementsByClassName("jw-buffer")[0],
            this.elementProgress = this.el.getElementsByClassName("jw-progress")[0],
            this.elementThumb = this.el.getElementsByClassName("jw-knob")[0],
            this.ui = new a.a(this.element(),{
                preventScrolling: !0
            }).on("dragStart", this.dragStart, this).on("drag", this.dragMove, this).on("dragEnd", this.dragEnd, this).on("click", this.tap, this)
        }
        ,
        o.dragStart = function() {
            this.trigger("dragStart"),
            this.railBounds = c(this.elementRail)
        }
        ,
        o.dragEnd = function(t) {
            this.dragMove(t),
            this.trigger("dragEnd")
        }
        ,
        o.dragMove = function(t) {
            var e, i, n = this.railBounds = this.railBounds ? this.railBounds : c(this.elementRail);
            return "pointercancel" === t.sourceEvent.type || (i = "horizontal" === this.orientation ? (e = t.pageX) < n.left ? 0 : e > n.right ? 100 : 100 * Object(s.a)((e - n.left) / n.width, 0, 1) : (e = t.pageY) >= n.bottom ? 0 : e <= n.top ? 100 : 100 * Object(s.a)((n.height - (e - n.top)) / n.height, 0, 1),
            this.render(i),
            this.update(i)),
            !1
        }
        ,
        o.tap = function(t) {
            this.railBounds = c(this.elementRail),
            this.dragMove(t)
        }
        ,
        o.limit = function(t) {
            return t
        }
        ,
        o.update = function(t) {
            this.trigger("update", {
                percentage: t
            })
        }
        ,
        o.render = function(t) {
            t = Math.max(0, Math.min(t, 100));
            var e = this.elementThumb
              , i = this.elementProgress;
            "horizontal" === this.orientation ? (e.style.left = t + "%",
            i.style.width = t + "%") : (e.style.bottom = t + "%",
            i.style.height = t + "%")
        }
        ,
        o.updateBuffer = function(t) {
            this.elementBuffer.style.width = t + "%"
        }
        ,
        o.element = function() {
            return this.el
        }
        ,
        n
    }(o.a);
    e.a = p
}
, function(t, e, i) {
    "use strict";
    var n = i(9)
      , o = i(7)
      , a = i(77);
    function s(t, e) {
        return (s = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    i.d(e, "a", (function() {
        return r
    }
    ));
    var r = function(t) {
        var e, i;
        function n(e, i, n, o) {
            var s;
            (s = t.call(this) || this).el = document.createElement("div");
            var r, l, c = "jw-icon jw-icon-tooltip " + e + " jw-button-color jw-reset";
            return n || (c += " jw-hidden"),
            i && (r = s.el,
            l = i,
            r && l && (r.setAttribute("aria-label", l),
            r.setAttribute("role", "button"),
            r.setAttribute("tabindex", "0"))),
            s.el.className = c,
            s.tooltip = document.createElement("div"),
            s.tooltip.className = "jw-overlay jw-reset",
            s.openClass = "jw-open",
            s.componentType = "tooltip",
            s.el.appendChild(s.tooltip),
            o && o.length > 0 && Array.prototype.forEach.call(o, (function(t) {
                "string" == typeof t ? s.el.appendChild(Object(a.a)(t)) : s.el.appendChild(t)
            }
            )),
            s
        }
        i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        s(e, i);
        var r = n.prototype;
        return r.addContent = function(t) {
            this.content && this.removeContent(),
            this.content = t,
            this.tooltip.appendChild(t)
        }
        ,
        r.removeContent = function() {
            this.content && (this.tooltip.removeChild(this.content),
            this.content = null)
        }
        ,
        r.hasContent = function() {
            return !!this.content
        }
        ,
        r.element = function() {
            return this.el
        }
        ,
        r.openTooltip = function(t) {
            this.isOpen || (this.trigger("open-" + this.componentType, t, {
                isOpen: !0
            }),
            this.isOpen = !0,
            Object(o.v)(this.el, this.openClass, this.isOpen))
        }
        ,
        r.closeTooltip = function(t) {
            this.isOpen && (this.trigger("close-" + this.componentType, t, {
                isOpen: !1
            }),
            this.isOpen = !1,
            Object(o.v)(this.el, this.openClass, this.isOpen))
        }
        ,
        r.toggleOpenState = function(t) {
            this.isOpen ? this.closeTooltip(t) : this.openTooltip(t)
        }
        ,
        n
    }(n.a)
}
, , , function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-buffer" viewBox="0 0 240 240" focusable="false"><path d="M120,186.667a66.667,66.667,0,0,1,0-133.333V40a80,80,0,1,0,80,80H186.667A66.846,66.846,0,0,1,120,186.667Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-replay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M120,41.9v-20c0-5-4-8-8-4l-44,28a5.865,5.865,0,0,0-3.3,7.6A5.943,5.943,0,0,0,68,56.8l43,29c5,4,9,1,9-4v-20a60,60,0,1,1-60,60H40a80,80,0,1,0,80-79.9Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-error" viewBox="0 0 36 36" style="width:100%;height:100%;" focusable="false"><path d="M34.6 20.2L10 33.2 27.6 16l7 3.7a.4.4 0 0 1 .2.5.4.4 0 0 1-.2.2zM33.3 0L21 12.2 9 6c-.2-.3-.6 0-.6.5V25L0 33.6 2.5 36 36 2.7z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-play" viewBox="0 0 240 240" focusable="false"><path d="M62.8,199.5c-1,0.8-2.4,0.6-3.3-0.4c-0.4-0.5-0.6-1.1-0.5-1.8V42.6c-0.2-1.3,0.7-2.4,1.9-2.6c0.7-0.1,1.3,0.1,1.9,0.4l154.7,77.7c2.1,1.1,2.1,2.8,0,3.8L62.8,199.5z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-pause" viewBox="0 0 240 240" focusable="false"><path d="M100,194.9c0.2,2.6-1.8,4.8-4.4,5c-0.2,0-0.4,0-0.6,0H65c-2.6,0.2-4.8-1.8-5-4.4c0-0.2,0-0.4,0-0.6V45c-0.2-2.6,1.8-4.8,4.4-5c0.2,0,0.4,0,0.6,0h30c2.6-0.2,4.8,1.8,5,4.4c0,0.2,0,0.4,0,0.6V194.9z M180,45.1c0.2-2.6-1.8-4.8-4.4-5c-0.2,0-0.4,0-0.6,0h-30c-2.6-0.2-4.8,1.8-5,4.4c0,0.2,0,0.4,0,0.6V195c-0.2,2.6,1.8,4.8,4.4,5c0.2,0,0.4,0,0.6,0h30c2.6,0.2,4.8-1.8,5-4.4c0-0.2,0-0.4,0-0.6V45.1z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-rewind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M113.2,131.078a21.589,21.589,0,0,0-17.7-10.6,21.589,21.589,0,0,0-17.7,10.6,44.769,44.769,0,0,0,0,46.3,21.589,21.589,0,0,0,17.7,10.6,21.589,21.589,0,0,0,17.7-10.6,44.769,44.769,0,0,0,0-46.3Zm-17.7,47.2c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1,14.4,11,14.4,24.1S103.4,178.278,95.5,178.278Zm-43.4,9.7v-51l-4.8,4.8-6.8-6.8,13-13a4.8,4.8,0,0,1,8.2,3.4v62.7l-9.6-.1Zm162-130.2v125.3a4.867,4.867,0,0,1-4.8,4.8H146.6v-19.3h48.2v-96.4H79.1v19.3c0,5.3-3.6,7.2-8,4.3l-41.8-27.9a6.013,6.013,0,0,1-2.7-8,5.887,5.887,0,0,1,2.7-2.7l41.8-27.9c4.4-2.9,8-1,8,4.3v19.3H209.2A4.974,4.974,0,0,1,214.1,57.778Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-next" viewBox="0 0 240 240" focusable="false"><path d="M165,60v53.3L59.2,42.8C56.9,41.3,55,42.3,55,45v150c0,2.7,1.9,3.8,4.2,2.2L165,126.6v53.3h20v-120L165,60L165,60z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-stop" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M190,185c0.2,2.6-1.8,4.8-4.4,5c-0.2,0-0.4,0-0.6,0H55c-2.6,0.2-4.8-1.8-5-4.4c0-0.2,0-0.4,0-0.6V55c-0.2-2.6,1.8-4.8,4.4-5c0.2,0,0.4,0,0.6,0h130c2.6-0.2,4.8,1.8,5,4.4c0,0.2,0,0.4,0,0.6V185z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-volume-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M116.4,42.8v154.5c0,2.8-1.7,3.6-3.8,1.7l-54.1-48.1H28.9c-2.8,0-5.2-2.3-5.2-5.2V94.2c0-2.8,2.3-5.2,5.2-5.2h29.6l54.1-48.1C114.6,39.1,116.4,39.9,116.4,42.8z M212.3,96.4l-14.6-14.6l-23.6,23.6l-23.6-23.6l-14.6,14.6l23.6,23.6l-23.6,23.6l14.6,14.6l23.6-23.6l23.6,23.6l14.6-14.6L188.7,120L212.3,96.4z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-volume-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M116.4,42.8v154.5c0,2.8-1.7,3.6-3.8,1.7l-54.1-48.1H28.9c-2.8,0-5.2-2.3-5.2-5.2V94.2c0-2.8,2.3-5.2,5.2-5.2h29.6l54.1-48.1C114.7,39.1,116.4,39.9,116.4,42.8z M178.2,120c0-22.7-18.5-41.2-41.2-41.2v20.6c11.4,0,20.6,9.2,20.6,20.6c0,11.4-9.2,20.6-20.6,20.6v20.6C159.8,161.2,178.2,142.7,178.2,120z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-volume-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M116.5,42.8v154.4c0,2.8-1.7,3.6-3.8,1.7l-54.1-48H29c-2.8,0-5.2-2.3-5.2-5.2V94.3c0-2.8,2.3-5.2,5.2-5.2h29.6l54.1-48C114.8,39.2,116.5,39.9,116.5,42.8z"></path><path d="M136.2,160v-20c11.1,0,20-8.9,20-20s-8.9-20-20-20V80c22.1,0,40,17.9,40,40S158.3,160,136.2,160z"></path><path d="M216.2,120c0-44.2-35.8-80-80-80v20c33.1,0,60,26.9,60,60s-26.9,60-60,60v20C180.4,199.9,216.1,164.1,216.2,120z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-cc-on" viewBox="0 0 240 240" focusable="false"><path d="M215,40H25c-2.7,0-5,2.2-5,5v150c0,2.7,2.2,5,5,5h190c2.7,0,5-2.2,5-5V45C220,42.2,217.8,40,215,40z M108.1,137.7c0.7-0.7,1.5-1.5,2.4-2.3l6.6,7.8c-2.2,2.4-5,4.4-8,5.8c-8,3.5-17.3,2.4-24.3-2.9c-3.9-3.6-5.9-8.7-5.5-14v-25.6c0-2.7,0.5-5.3,1.5-7.8c0.9-2.2,2.4-4.3,4.2-5.9c5.7-4.5,13.2-6.2,20.3-4.6c3.3,0.5,6.3,2,8.7,4.3c1.3,1.3,2.5,2.6,3.5,4.2l-7.1,6.9c-2.4-3.7-6.5-5.9-10.9-5.9c-2.4-0.2-4.8,0.7-6.6,2.3c-1.7,1.7-2.5,4.1-2.4,6.5v25.6C90.4,141.7,102,143.5,108.1,137.7z M152.9,137.7c0.7-0.7,1.5-1.5,2.4-2.3l6.6,7.8c-2.2,2.4-5,4.4-8,5.8c-8,3.5-17.3,2.4-24.3-2.9c-3.9-3.6-5.9-8.7-5.5-14v-25.6c0-2.7,0.5-5.3,1.5-7.8c0.9-2.2,2.4-4.3,4.2-5.9c5.7-4.5,13.2-6.2,20.3-4.6c3.3,0.5,6.3,2,8.7,4.3c1.3,1.3,2.5,2.6,3.5,4.2l-7.1,6.9c-2.4-3.7-6.5-5.9-10.9-5.9c-2.4-0.2-4.8,0.7-6.6,2.3c-1.7,1.7-2.5,4.1-2.4,6.5v25.6C135.2,141.7,146.8,143.5,152.9,137.7z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-cc-off" viewBox="0 0 240 240" focusable="false"><path d="M99.4,97.8c-2.4-0.2-4.8,0.7-6.6,2.3c-1.7,1.7-2.5,4.1-2.4,6.5v25.6c0,9.6,11.6,11.4,17.7,5.5c0.7-0.7,1.5-1.5,2.4-2.3l6.6,7.8c-2.2,2.4-5,4.4-8,5.8c-8,3.5-17.3,2.4-24.3-2.9c-3.9-3.6-5.9-8.7-5.5-14v-25.6c0-2.7,0.5-5.3,1.5-7.8c0.9-2.2,2.4-4.3,4.2-5.9c5.7-4.5,13.2-6.2,20.3-4.6c3.3,0.5,6.3,2,8.7,4.3c1.3,1.3,2.5,2.6,3.5,4.2l-7.1,6.9C107.9,100,103.8,97.8,99.4,97.8z M144.1,97.8c-2.4-0.2-4.8,0.7-6.6,2.3c-1.7,1.7-2.5,4.1-2.4,6.5v25.6c0,9.6,11.6,11.4,17.7,5.5c0.7-0.7,1.5-1.5,2.4-2.3l6.6,7.8c-2.2,2.4-5,4.4-8,5.8c-8,3.5-17.3,2.4-24.3-2.9c-3.9-3.6-5.9-8.7-5.5-14v-25.6c0-2.7,0.5-5.3,1.5-7.8c0.9-2.2,2.4-4.3,4.2-5.9c5.7-4.5,13.2-6.2,20.3-4.6c3.3,0.5,6.3,2,8.7,4.3c1.3,1.3,2.5,2.6,3.5,4.2l-7.1,6.9C152.6,100,148.5,97.8,144.1,97.8L144.1,97.8z M200,60v120H40V60H200 M215,40H25c-2.7,0-5,2.2-5,5v150c0,2.7,2.2,5,5,5h190c2.7,0,5-2.2,5-5V45C220,42.2,217.8,40,215,40z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-airplay-on" viewBox="0 0 240 240" focusable="false"><path d="M229.9,40v130c0.2,2.6-1.8,4.8-4.4,5c-0.2,0-0.4,0-0.6,0h-44l-17-20h46V55H30v100h47l-17,20h-45c-2.6,0.2-4.8-1.8-5-4.4c0-0.2,0-0.4,0-0.6V40c-0.2-2.6,1.8-4.8,4.4-5c0.2,0,0.4,0,0.6,0h209.8c2.6-0.2,4.8,1.8,5,4.4C229.9,39.7,229.9,39.9,229.9,40z M104.9,122l15-18l15,18l11,13h44V75H50v60h44L104.9,122z M179.9,205l-60-70l-60,70H179.9z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-airplay-off" viewBox="0 0 240 240" focusable="false"><path d="M210,55v100h-50l20,20h45c2.6,0.2,4.8-1.8,5-4.4c0-0.2,0-0.4,0-0.6V40c0.2-2.6-1.8-4.8-4.4-5c-0.2,0-0.4,0-0.6,0H15c-2.6-0.2-4.8,1.8-5,4.4c0,0.2,0,0.4,0,0.6v130c-0.2,2.6,1.8,4.8,4.4,5c0.2,0,0.4,0,0.6,0h45l20-20H30V55H210 M60,205l60-70l60,70H60L60,205z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-arrow-left" viewBox="0 0 240 240" focusable="false"><path d="M55.4,104.4c-1.1,1.1-2.2,2.3-3.1,3.6c-6.9,9.9-4.4,23.5,5.5,30.4L159.7,240l33.9-33.9l-84.9-84.9l84.9-84.9L157.3,0L55.4,104.4L55.4,104.4z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-playback-rate" viewBox="0 0 240 240" focusable="false"><path d="M158.83,48.83A71.17,71.17,0,1,0,230,120,71.163,71.163,0,0,0,158.83,48.83Zm45.293,77.632H152.34V74.708h12.952v38.83h38.83ZM35.878,74.708h38.83V87.66H35.878ZM10,113.538H61.755V126.49H10Zm25.878,38.83h38.83V165.32H35.878Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M204,145l-25-14c0.8-3.6,1.2-7.3,1-11c0.2-3.7-0.2-7.4-1-11l25-14c2.2-1.6,3.1-4.5,2-7l-16-26c-1.2-2.1-3.8-2.9-6-2l-25,14c-6-4.2-12.3-7.9-19-11V35c0.2-2.6-1.8-4.8-4.4-5c-0.2,0-0.4,0-0.6,0h-30c-2.6-0.2-4.8,1.8-5,4.4c0,0.2,0,0.4,0,0.6v28c-6.7,3.1-13,6.7-19,11L56,60c-2.2-0.9-4.8-0.1-6,2L35,88c-1.6,2.2-1.3,5.3,0.9,6.9c0,0,0.1,0,0.1,0.1l25,14c-0.8,3.6-1.2,7.3-1,11c-0.2,3.7,0.2,7.4,1,11l-25,14c-2.2,1.6-3.1,4.5-2,7l16,26c1.2,2.1,3.8,2.9,6,2l25-14c5.7,4.6,12.2,8.3,19,11v28c-0.2,2.6,1.8,4.8,4.4,5c0.2,0,0.4,0,0.6,0h30c2.6,0.2,4.8-1.8,5-4.4c0-0.2,0-0.4,0-0.6v-28c7-2.3,13.5-6,19-11l25,14c2.5,1.3,5.6,0.4,7-2l15-26C206.7,149.4,206,146.7,204,145z M120,149.9c-16.5,0-30-13.4-30-30s13.4-30,30-30s30,13.4,30,30c0.3,16.3-12.6,29.7-28.9,30C120.7,149.9,120.4,149.9,120,149.9z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-audio-tracks" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M35,34h160v20H35V34z M35,94h160V74H35V94z M35,134h60v-20H35V134z M160,114c-23.4-1.3-43.6,16.5-45,40v50h20c5.2,0.3,9.7-3.6,10-8.9c0-0.4,0-0.7,0-1.1v-20c0.3-5.2-3.6-9.7-8.9-10c-0.4,0-0.7,0-1.1,0h-10v-10c1.5-17.9,17.1-31.3,35-30c17.9-1.3,33.6,12.1,35,30v10H185c-5.2-0.3-9.7,3.6-10,8.9c0,0.4,0,0.7,0,1.1v20c-0.3,5.2,3.6,9.7,8.9,10c0.4,0,0.7,0,1.1,0h20v-50C203.5,130.6,183.4,112.7,160,114z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-quality-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" focusable="false"><path d="M55,200H35c-3,0-5-2-5-4c0,0,0,0,0-1v-30c0-3,2-5,4-5c0,0,0,0,1,0h20c3,0,5,2,5,4c0,0,0,0,0,1v30C60,198,58,200,55,200L55,200z M110,195v-70c0-3-2-5-4-5c0,0,0,0-1,0H85c-3,0-5,2-5,4c0,0,0,0,0,1v70c0,3,2,5,4,5c0,0,0,0,1,0h20C108,200,110,198,110,195L110,195z M160,195V85c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v110c0,3,2,5,4,5c0,0,0,0,1,0h20C158,200,160,198,160,195L160,195z M210,195V45c0-3-2-5-4-5c0,0,0,0-1,0h-20c-3,0-5,2-5,4c0,0,0,0,0,1v150c0,3,2,5,4,5c0,0,0,0,1,0h20C208,200,210,198,210,195L210,195z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-off" viewBox="0 0 240 240" focusable="false"><path d="M109.2,134.9l-8.4,50.1c-0.4,2.7-2.4,3.3-4.4,1.4L82,172l-27.9,27.9l-14.2-14.2l27.9-27.9l-14.4-14.4c-1.9-1.9-1.3-3.9,1.4-4.4l50.1-8.4c1.8-0.5,3.6,0.6,4.1,2.4C109.4,133.7,109.4,134.3,109.2,134.9L109.2,134.9z M172.1,82.1L200,54.2L185.8,40l-27.9,27.9l-14.4-14.4c-1.9-1.9-3.9-1.3-4.4,1.4l-8.4,50.1c-0.5,1.8,0.6,3.6,2.4,4.1c0.5,0.2,1.2,0.2,1.7,0l50.1-8.4c2.7-0.4,3.3-2.4,1.4-4.4L172.1,82.1z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-on" viewBox="0 0 240 240" focusable="false"><path d="M96.3,186.1c1.9,1.9,1.3,4-1.4,4.4l-50.6,8.4c-1.8,0.5-3.7-0.6-4.2-2.4c-0.2-0.6-0.2-1.2,0-1.7l8.4-50.6c0.4-2.7,2.4-3.4,4.4-1.4l14.5,14.5l28.2-28.2l14.3,14.3l-28.2,28.2L96.3,186.1z M195.8,39.1l-50.6,8.4c-2.7,0.4-3.4,2.4-1.4,4.4l14.5,14.5l-28.2,28.2l14.3,14.3l28.2-28.2l14.5,14.5c1.9,1.9,4,1.3,4.4-1.4l8.4-50.6c0.5-1.8-0.6-3.6-2.4-4.2C197,39,196.4,39,195.8,39.1L195.8,39.1z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-pip-on" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.125V9.125H22V4.155C22 3.58616 21.5389 3.125 20.97 3.125H2.03C1.46116 3.125 1 3.58613 1 4.155V17.095C1 17.6639 1.46119 18.125 2.03 18.125H12V16.125H3V5.125H20ZM14 11.875C14 11.3227 14.4477 10.875 15 10.875H22C22.5523 10.875 23 11.3227 23 11.875V17.875C23 18.4273 22.5523 18.875 22 18.875H15C14.4477 18.875 14 18.4273 14 17.875V11.875ZM6 12.375L7.79289 10.5821L5.29288 8.0821L6.7071 6.66788L9.20711 9.16789L11 7.375V12.375H6Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-pip-off" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.75V9.75H22V4.78C22 4.21116 21.5389 3.75 20.97 3.75H2.03C1.46116 3.75 1 4.21113 1 4.78V17.72C1 18.2889 1.46119 18.75 2.03 18.75H12V16.75H3V5.75H20ZM14 13.25C14 12.6977 14.4477 12.25 15 12.25H22C22.5523 12.25 23 12.6977 23 13.25V19.25C23 19.8023 22.5523 20.25 22 20.25H15C14.4477 20.25 14 19.8023 14 19.25V13.25ZM10 9.25L8.20711 11.0429L10.7071 13.5429L9.29289 14.9571L6.79289 12.4571L5 14.25V9.25H10Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-close" viewBox="0 0 240 240" focusable="false"><path d="M134.8,120l48.6-48.6c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2l-7.4-7.4c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L120,105.2L71.4,56.6c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L56.6,64c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l48.6,48.7l-48.6,48.6c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l7.4,7.4c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l48.7-48.6l48.6,48.6c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l7.4-7.4c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2L134.8,120z"></path></svg>'
}
, , function(t, e, i) {
    "use strict";
    i.d(e, "a", (function() {
        return n
    }
    )),
    i.d(e, "b", (function() {
        return o
    }
    )),
    i.d(e, "c", (function() {
        return a
    }
    ));
    var n = function(t, e) {
        return t ? '<div id="jw-settings-submenu-' + e + '" class="jw-reset jw-settings-submenu jw-settings-submenu-' + e + '" role="menu" aria-expanded="false"><div class="jw-reset jw-settings-submenu-items"></div></div>' : '<div id="jw-settings-menu" class="jw-reset jw-settings-menu" role="menu" aria-expanded="false"><div class="jw-reset jw-settings-topbar" role="menubar"><div class="jw-reset jw-settings-topbar-text" tabindex="0"></div><div class="jw-reset jw-settings-topbar-buttons"></div></div></div>'
    }
      , o = function(t, e) {
        return t ? '<div id="jw-settings-submenu-' + e + '" class="jw-reset jw-settings-submenu jw-settings-submenu-' + e + '" role="menu" aria-expanded="false"><div class="jw-reset jw-settings-submenu-items"></div></div>' : '<div id="jw-settings-menu-tizen" class="jw-reset jw-settings-menu-tizen" role="menu" aria-expanded="false"></div>'
    }
      , a = function(t, e, i) {
        return '<div id="jw-settings-submenu-' + e + '" class="jw-reset jw-settings-submenu-tizen jw-settings-submenu-' + e + '"><div class="jw-reset jw-reset-text jw-settings-topbar-text">' + i + '</div><div class="jw-reset jw-settings-submenu-items"></div></div>'
    }
}
, function(t, e, i) {
    "use strict";
    var n = function(t, e) {
        return void 0 === t && (t = ""),
        void 0 === e && (e = ""),
        '<div class="jw-display-icon-container jw-display-icon-' + t + ' jw-reset"><div class="jw-icon jw-icon-' + t + ' jw-button-color jw-reset" role="button" tabindex="0" aria-label="' + e + '"></div></div>'
    }
      , o = i(74)
      , a = function() {
        function t(t, e, i) {
            var n = i.querySelector(".jw-icon");
            this.el = i,
            this.ui = Object(o.a)(n, (function() {
                var i = t.get("position")
                  , n = t.get("duration")
                  , o = i - 10
                  , a = 0;
                "DVR" === t.get("streamType") && (a = n),
                e.seek(Math.max(o, a))
            }
            ))
        }
        return t.prototype.element = function() {
            return this.el
        }
        ,
        t
    }()
      , s = i(9)
      , r = i(7);
    function l(t, e) {
        return (l = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var c = function(t) {
        var e, i;
        function n(e, i, n) {
            var a;
            a = t.call(this) || this;
            var s = e.get("localization")
              , l = n.querySelector(".jw-icon");
            if (a.icon = l,
            a.el = n,
            a.ui = Object(o.a)(l, (function(t) {
                a.trigger(t.type)
            }
            )),
            e.on("change:state", (function(t, e) {
                var i;
                switch (e) {
                case "buffering":
                    i = s.buffer;
                    break;
                case "playing":
                    i = s.pause;
                    break;
                case "idle":
                case "paused":
                    i = s.playback;
                    break;
                case "complete":
                    i = s.replay;
                    break;
                default:
                    i = ""
                }
                "" !== i ? l.setAttribute("aria-label", i) : l.removeAttribute("aria-label")
            }
            )),
            e.get("displayPlaybackLabel")) {
                var c = a.icon.getElementsByClassName("jw-idle-icon-text")[0];
                c || (c = Object(r.e)('<div class="jw-idle-icon-text">' + s.playback + "</div>"),
                Object(r.a)(a.icon, "jw-idle-label"),
                a.icon.appendChild(c))
            }
            return a
        }
        return i = t,
        (e = n).prototype = Object.create(i.prototype),
        e.prototype.constructor = e,
        l(e, i),
        n.prototype.element = function() {
            return this.el
        }
        ,
        n
    }(s.a)
      , p = function() {
        function t(t, e, i) {
            var n = i.querySelector(".jw-icon");
            this.ui = Object(o.a)(n, (function() {
                e.next({
                    reason: "interaction"
                })
            }
            )),
            t.change("nextUp", (function(t, e) {
                i.style.visibility = e ? "" : "hidden"
            }
            )),
            this.el = i
        }
        return t.prototype.element = function() {
            return this.el
        }
        ,
        t
    }()
      , w = i(73);
    i.d(e, "a", (function() {
        return u
    }
    ));
    var u = function() {
        function t(t, e) {
            var i;
            this.el = Object(r.e)((i = t.get("localization"),
            '<div class="jw-display jw-reset"><div class="jw-display-container jw-reset"><div class="jw-display-controls jw-reset">' + n("rewind", i.rewind) + n("display", i.playback) + n("next", i.next) + "</div></div></div>"));
            var o = this.el.querySelector(".jw-display-controls")
              , s = {};
            d("rewind", Object(w.b)("rewind"), a, o, s, t, e),
            d("display", Object(w.b)("play,pause,buffer,replay"), c, o, s, t, e),
            d("next", Object(w.b)("next"), p, o, s, t, e),
            this.container = o,
            this.buttons = s
        }
        var e = t.prototype;
        return e.element = function() {
            return this.el
        }
        ,
        e.destroy = function() {
            var t = this.buttons;
            Object.keys(t).forEach((function(e) {
                t[e].ui && t[e].ui.destroy()
            }
            ))
        }
        ,
        t
    }();
    function d(t, e, i, n, o, a, s) {
        var r = n.querySelector(".jw-display-icon-" + t)
          , l = n.querySelector(".jw-icon-" + t);
        e.forEach((function(t) {
            l.appendChild(t)
        }
        )),
        o[t] = new i(a,s,r)
    }
}
, function(t, e, i) {
    "use strict";
    var n = i(0)
      , o = i(52)
      , a = i(11)
      , s = i(12)
      , r = i(7)
      , l = i(34)
      , c = i(95)
      , p = i(96)
      , w = i(27)
      , u = i(78)
      , d = function() {
        function t(t, e, i) {
            this.time = t,
            this.text = e,
            this.el = document.createElement("div");
            var n = "jw-cue jw-reset";
            i && "string" == typeof i && (n += " jw-cue-type-" + i),
            this.el.className = n
        }
        return t.prototype.align = function(t) {
            if ("%" === this.time.toString().slice(-1))
                this.pct = this.time;
            else {
                var e = this.time / t * 100;
                this.pct = e + "%"
            }
            this.el.style.left = this.pct
        }
        ,
        t
    }()
      , j = {
        loadChapters: function(t) {
            Object(w.b)(t, this.chaptersLoaded.bind(this), this.chaptersFailed, {
                plainText: !0
            })
        },
        chaptersLoaded: function(t) {
            var e = Object(u.a)(t.responseText);
            if (Array.isArray(e)) {
                var i = this._model.get("cues").concat(e);
                this._model.set("cues", i)
            }
        },
        chaptersFailed: function() {},
        addCue: function(t) {
            this.cues.push(new d(t.begin,t.text,t.cueType))
        },
        drawCues: function() {
            var t = this
              , e = this._model.get("duration");
            !e || e <= 0 || this.cues.forEach((function(i) {
                i.align(e),
                i.el.addEventListener("mouseover", (function() {
                    t.activeCue = i
                }
                )),
                i.el.addEventListener("mouseout", (function() {
                    t.activeCue = null
                }
                )),
                t.elementRail.appendChild(i.el)
            }
            ))
        },
        resetCues: function() {
            this.cues.forEach((function(t) {
                t.el.parentNode && t.el.parentNode.removeChild(t.el)
            }
            )),
            this.cues = []
        }
    };
    function h(t) {
        this.begin = t.begin,
        this.end = t.end,
        this.img = t.text
    }
    var f = {
        loadThumbnails: function(t) {
            t && (this.vttPath = t.split("?")[0].split("/").slice(0, -1).join("/"),
            this.individualImage = null,
            Object(w.b)(t, this.thumbnailsLoaded.bind(this), this.thumbnailsFailed.bind(this), {
                plainText: !0
            }))
        },
        thumbnailsLoaded: function(t) {
            var e = Object(u.a)(t.responseText);
            Array.isArray(e) && (e.forEach((function(t) {
                this.thumbnails.push(new h(t))
            }
            ), this),
            this.drawCues(),
            this.showThumbnail(0))
        },
        thumbnailsFailed: function() {},
        chooseThumbnail: function(t) {
            var e = this.thumbnails
              , i = Object(n.G)(e, {
                end: t
            }, Object(n.D)("end"));
            i >= e.length && (i = e.length - 1);
            var o = e[i].img;
            return o.indexOf("://") < 0 && (o = this.vttPath ? this.vttPath + "/" + o : o),
            o
        },
        loadThumbnail: function(t) {
            var e = this.chooseThumbnail(t)
              , i = {
                margin: "0 auto",
                backgroundPosition: "0 0"
            };
            if (e.indexOf("#xywh") > 0)
                try {
                    var o = /(.+)#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(e);
                    if (!o)
                        throw new Error("No match for expected thumbnail pattern");
                    e = o[1];
                    var a = parseInt(o[2])
                      , s = parseInt(o[3]);
                    i.backgroundPosition = -1 * a + "px " + -1 * s + "px",
                    i.width = o[4],
                    this.timeTip.setWidth(+i.width),
                    i.height = o[5]
                } catch (t) {
                    return
                }
            else if (!this.individualImage) {
                var r = this.individualImage = new Image;
                r.onload = Object(n.c)((function() {
                    r.onload = null,
                    this.timeTip.image({
                        width: r.width,
                        height: r.height
                    }),
                    this.timeTip.setWidth(r.width)
                }
                ), this),
                r.src = e
            }
            return i.backgroundImage = 'url("' + e + '")',
            i
        },
        showThumbnail: function(t) {
            this._model.get("containerWidth") <= 420 || !this.thumbnails || this.thumbnails.length < 1 || this.timeTip.image(this.loadThumbnail(t))
        },
        resetThumbnails: function() {
            this.timeTip.image({
                backgroundImage: "",
                width: 0,
                height: 0
            }),
            this.thumbnails = []
        }
    };
    function g(t, e) {
        t.prototype = Object.create(e.prototype),
        t.prototype.constructor = t,
        b(t, e)
    }
    function b(t, e) {
        return (b = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var m = function(t) {
        function e() {
            return t.apply(this, arguments) || this
        }
        g(e, t);
        var i = e.prototype;
        return i.setup = function() {
            this.text = document.createElement("span"),
            this.text.className = "jw-text jw-reset",
            this.img = document.createElement("div"),
            this.img.className = "jw-time-thumb jw-reset",
            this.containerWidth = 0,
            this.textLength = 0,
            this.dragJustReleased = !1;
            var t = document.createElement("div");
            t.className = "jw-time-tip jw-reset",
            t.appendChild(this.img),
            t.appendChild(this.text),
            this.addContent(t)
        }
        ,
        i.image = function(t) {
            Object(a.d)(this.img, t)
        }
        ,
        i.update = function(t) {
            this.text && (this.text.textContent = t)
        }
        ,
        i.getWidth = function() {
            return this.containerWidth || this.setWidth(),
            this.containerWidth
        }
        ,
        i.setWidth = function(t) {
            t ? this.containerWidth = t + 16 : this.tooltip && (this.containerWidth = Object(r.c)(this.container).width + 16)
        }
        ,
        i.resetWidth = function() {
            this.containerWidth = 0
        }
        ,
        e
    }(p.a);
    var v = function(t) {
        function e(e, i, o) {
            var a;
            return (a = t.call(this, "jw-slider-time", "horizontal") || this)._model = e,
            a._api = i,
            a.timeUpdateKeeper = o,
            a.timeTip = new m("jw-tooltip-time",null,!0),
            a.timeTip.setup(),
            a.cues = [],
            a.seekThrottled = Object(n.H)(a.performSeek, 400),
            a.mobileHoverDistance = 5,
            a.setup(),
            a
        }
        g(e, t);
        var i = e.prototype;
        return i.setup = function() {
            var e = this;
            t.prototype.setup.call(this),
            this._model.on("change:duration", this.onDuration, this).on("change:cues", this.updateCues, this).on("seeked", (function() {
                e._model.get("scrubbing") || e.updateAriaText()
            }
            )),
            this._model.change("position", this.onPosition, this).change("buffer", this.onBuffer, this).change("streamType", this.onStreamType, this),
            this._model.player.change("playlistItem", this.onPlaylistItem, this);
            var i = this.el;
            Object(r.t)(i, "tabindex", "0"),
            Object(r.t)(i, "role", "slider"),
            Object(r.t)(i, "aria-label", this._model.get("localization").slider),
            i.removeAttribute("aria-hidden"),
            this.elementRail.appendChild(this.timeTip.element()),
            this.ui = (this.ui || new l.a(i)).on("move drag", this.showTimeTooltip, this).on("dragEnd out", this.hideTimeTooltip, this).on("click", (function() {
                return i.focus()
            }
            )).on("focus", this.updateAriaText, this)
        }
        ,
        i.update = function(e) {
            this.seekTo = e,
            this.seekThrottled(),
            t.prototype.update.apply(this, [e])
        }
        ,
        i.dragStart = function() {
            this._model.set("scrubbing", !0),
            t.prototype.dragStart.call(this)
        }
        ,
        i.dragEnd = function(e) {
            t.prototype.dragEnd.apply(this, [e]),
            this._model.set("scrubbing", !1)
        }
        ,
        i.onBuffer = function(t, e) {
            this.updateBuffer(e)
        }
        ,
        i.onPosition = function(t, e) {
            this.updateTime(e, t.get("duration"))
        }
        ,
        i.onDuration = function(t, e) {
            this.updateTime(t.get("position"), e),
            Object(r.t)(this.el, "aria-valuemin", 0),
            Object(r.t)(this.el, "aria-valuemax", e),
            this.drawCues()
        }
        ,
        i.onStreamType = function(t, e) {
            this.streamType = e
        }
        ,
        i.updateTime = function(t, e) {
            var i = 0;
            if (e)
                if ("DVR" === this.streamType) {
                    var n = this._model.get("dvrSeekLimit")
                      , o = e + n;
                    i = (o - (t + n)) / o * 100
                } else
                    "VOD" !== this.streamType && this.streamType || (i = t / e * 100);
            this.render(i)
        }
        ,
        i.onPlaylistItem = function(t, e) {
            this.reset();
            var i = t.get("cues");
            !this.cues.length && i.length && this.updateCues(null, i);
            var o = e.tracks;
            Object(n.i)(o, (function(t) {
                t && t.kind && "thumbnails" === t.kind.toLowerCase() ? this.loadThumbnails(t.file) : t && t.kind && "chapters" === t.kind.toLowerCase() && this.loadChapters(t.file)
            }
            ), this)
        }
        ,
        i.performSeek = function() {
            var t, e = this.seekTo, i = this._model.get("duration");
            if (0 === i)
                this._api.play({
                    reason: "interaction"
                });
            else if ("DVR" === this.streamType) {
                var n = this._model.get("seekRange") || {
                    start: 0
                }
                  , o = this._model.get("dvrSeekLimit");
                t = n.start + (-i - o) * e / 100,
                this._api.seek(t, {
                    reason: "interaction"
                })
            } else
                t = e / 100 * i,
                this._api.seek(Math.min(t, i - .25), {
                    reason: "interaction"
                })
        }
        ,
        i.showTimeTooltip = function(t) {
            var e = this
              , i = this._model.get("duration");
            if (0 !== i) {
                var n, l = this._model.get("containerWidth"), c = Object(r.c)(this.elementRail), p = t.pageX ? t.pageX - c.left : t.x, w = (p = Object(o.a)(p, 0, c.width)) / c.width, u = i * w;
                if (i < 0)
                    u = (i += this._model.get("dvrSeekLimit")) - (u = i * w);
                if ("touch" === t.pointerType && (this.activeCue = this.cues.reduce((function(t, i) {
                    return Math.abs(p - parseInt(i.pct) / 100 * c.width) < e.mobileHoverDistance ? i : t
                }
                ), void 0)),
                this.activeCue)
                    n = this.activeCue.text;
                else {
                    n = Object(s.timeFormat)(u, !0),
                    i < 0 && u > -1 && (n = "Live")
                }
                var d = this.timeTip;
                d.update(n),
                this.textLength !== n.length && (this.textLength = n.length,
                d.resetWidth()),
                this.showThumbnail(u),
                Object(r.a)(d.el, "jw-open");
                var j = d.getWidth()
                  , h = l - c.width
                  , f = 0;
                j > h && (f = (j - h) / 2);
                var g = Math.round(4 * Math.min(c.width - f, Math.max(f, p))) / 4;
                Object(a.e)(d.el, "translateX(" + g + "px)")
            }
        }
        ,
        i.hideTimeTooltip = function() {
            Object(r.o)(this.timeTip.el, "jw-open")
        }
        ,
        i.updateCues = function(t, e) {
            var i = this;
            this.resetCues(),
            e && e.length && (e.forEach((function(t) {
                i.addCue(t)
            }
            )),
            this.drawCues())
        }
        ,
        i.updateAriaText = function() {
            var t = this._model
              , e = t.get("position")
              , i = t.get("duration")
              , n = Object(s.timeFormat)(e);
            "DVR" !== this.streamType && (n += " of " + Object(s.timeFormat)(i));
            var o = this.el;
            document.activeElement !== o && (this.timeUpdateKeeper.textContent = n),
            Object(r.t)(o, "aria-valuenow", e),
            Object(r.t)(o, "aria-valuetext", n)
        }
        ,
        i.reset = function() {
            this.resetThumbnails(),
            this.timeTip.resetWidth(),
            this.textLength = 0
        }
        ,
        e
    }(c.a);
    Object(n.j)(v.prototype, j, f);
    e.a = v
}
, function(t, e, i) {
    "use strict";
    var n = i(0)
      , o = i(5)
      , a = i(3)
      , s = i(73)
      , r = i(89)
      , l = i(127)
      , c = i(96)
      , p = i(95)
      , w = i(34)
      , u = i(7);
    function d(t) {
        if (void 0 === t)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }
    function j(t, e) {
        t.prototype = Object.create(e.prototype),
        t.prototype.constructor = t,
        h(t, e)
    }
    function h(t, e) {
        return (h = Object.setPrototypeOf || function(t, e) {
            return t.__proto__ = e,
            t
        }
        )(t, e)
    }
    var f = function(t) {
        function e(e, i, n) {
            var o, a = "jw-slider-volume";
            return "vertical" === e && (a += " jw-volume-tip"),
            (o = t.call(this, a, e) || this).setup(),
            o.element().classList.remove("jw-background-color"),
            Object(u.t)(n, "tabindex", "0"),
            Object(u.t)(n, "aria-label", i),
            Object(u.t)(n, "aria-orientation", e),
            Object(u.t)(n, "aria-valuemin", 0),
            Object(u.t)(n, "aria-valuemax", 100),
            Object(u.t)(n, "role", "slider"),
            o.uiOver = new w.a(n).on("click", (function() {}
            )),
            o
        }
        return j(e, t),
        e
    }(p.a)
      , g = function(t) {
        function e(e, i, n, o, a) {
            var s;
            (s = t.call(this, i, n, !0, o) || this)._model = e,
            s.horizontalContainer = a;
            var r = e.get("localization").volumeSlider;
            return s.horizontalSlider = new f("horizontal",r,a),
            s.verticalSlider = new f("vertical",r,s.tooltip),
            a.appendChild(s.horizontalSlider.element()),
            s.addContent(s.verticalSlider.element()),
            s.verticalSlider.on("update", (function(t) {
                this.trigger("update", t)
            }
            ), d(s)),
            s.horizontalSlider.on("update", (function(t) {
                this.trigger("update", t)
            }
            ), d(s)),
            s.horizontalSlider.uiOver.on("keydown", (function(t) {
                var e = t.sourceEvent;
                switch (e.keyCode) {
                case 37:
                    e.stopPropagation(),
                    s.trigger("adjustVolume", -10);
                    break;
                case 39:
                    e.stopPropagation(),
                    s.trigger("adjustVolume", 10)
                }
            }
            )),
            s.ui = new w.a(s.el,{
                directSelect: !0
            }).on("click", s.handleClick, d(s)).on("enter", (function() {
                return s.trigger("toggleValue")
            }
            )),
            s.addSliderHandlers(s.ui),
            s.addSliderHandlers(s.horizontalSlider.uiOver),
            s.addSliderHandlers(s.verticalSlider.uiOver),
            s._model.change("audioMode", s.updateSlider, d(s)),
            s
        }
        j(e, t);
        var i = e.prototype;
        return i.updateSlider = function(t, e) {
            var i = t.get("horizontalVolumeSlider") || e;
            Object(u.v)(this.element(), "jw-flag-horizontal-slider", !!i)
        }
        ,
        i.addSliderHandlers = function(t) {
            var e = this.openSlider
              , i = this.closeSlider;
            t.on("over", e, this).on("out", i, this).on("focus", e, this).on("blur", i, this)
        }
        ,
        i.openSlider = function(e) {
            t.prototype.openTooltip.call(this, e),
            Object(u.v)(this.horizontalContainer, this.openClass, !0)
        }
        ,
        i.closeSlider = function(e) {
            t.prototype.closeTooltip.call(this, e),
            Object(u.v)(this.horizontalContainer, this.openClass, !1),
            this.horizontalContainer.blur()
        }
        ,
        i.handleClick = function(t) {
            o.OS.mobile ? this.toggleOpenState(t) : this.trigger("toggleValue")
        }
        ,
        i.destroy = function() {
            this.horizontalSlider.uiOver.destroy(),
            this.verticalSlider.uiOver.destroy(),
            this.ui.destroy()
        }
        ,
        e
    }(c.a)
      , b = i(75)
      , m = i(90)
      , v = i(9)
      , y = i(12)
      , x = i(53)
      , k = i(74);
    function O(t, e) {
        var i = document.createElement("div");
        return i.className = "jw-icon jw-icon-inline jw-text jw-reset " + t,
        e && Object(u.t)(i, "role", e),
        i
    }
    function C(t) {
        var e = document.createElement("div");
        return e.className = "jw-reset " + t,
        e
    }
    function z(t, e) {
        if ("WebKitPlaybackTargetAvailabilityEvent"in window) {
            var i = Object(b.a)("jw-icon-airplay jw-off", t, e.airplay, Object(s.b)("airplay-off,airplay-on"));
            return Object(m.a)(i.element(), "airplay", e.airplay),
            i
        }
        if (o.Browser.chrome && window.chrome) {
            var n = document.createElement("google-cast-launcher");
            Object(u.t)(n, "tabindex", "-1"),
            n.className += " jw-reset";
            var a = Object(b.a)("jw-icon-cast", null, e.cast);
            a.ui.off();
            var r = a.element();
            return r.style.cursor = "pointer",
            r.appendChild(n),
            a.button = n,
            Object(m.a)(r, "chromecast", e.cast),
            a
        }
    }
    function T(t, e, i) {
        if (!o.OS.mobile && "disabled" !== t && (o.Browser.chrome || o.Browser.edge || o.Browser.safari)) {
            var n = Object(b.a)("jw-icon-pip jw-off", e, i.pipIcon, Object(s.b)("pip-on,pip-off"));
            return Object(m.a)(n.element(), "pip", i.pipIcon),
            n
        }
    }
    function S(t, e) {
        return t.filter((function(t) {
            return !e.some((function(e) {
                return e.id + e.btnClass === t.id + t.btnClass && t.callback === e.callback
            }
            ))
        }
        ))
    }
    i.d(e, "a", (function() {
        return B
    }
    ));
    var M = function(t, e) {
        e.forEach((function(e) {
            e.element && (e = e.element()),
            t.appendChild(e)
        }
        ))
    }
      , B = function() {
        function t(t, e, i) {
            var r = this;
            Object(n.j)(this, v.a),
            this._api = t,
            this._model = e,
            this._isMobile = o.OS.mobile,
            this._volumeAnnouncer = i.querySelector(".jw-volume-update");
            var c, p, d, j = e.get("localization"), h = new l.a(e,t,i.querySelector(".jw-time-update")), f = this.menus = [];
            this.ui = [];
            var y = ""
              , S = j.volume;
            if (this._isMobile) {
                if (!(e.get("sdkplatform") || o.OS.iOS && o.OS.version.major < 10)) {
                    var B = Object(s.b)("volume-0,volume-100");
                    d = Object(b.a)("jw-icon-volume", (function() {
                        t.setMute()
                    }
                    ), S, B)
                }
            } else {
                (p = document.createElement("div")).className = "jw-horizontal-volume-container";
                var E = (c = new g(e,"jw-icon-volume",S,Object(s.b)("volume-0,volume-50,volume-100"),p)).element();
                f.push(c),
                Object(u.t)(E, "role", "group"),
                e.change("mute", (function(t, e) {
                    var i = e ? j.unmute : j.mute;
                    Object(u.t)(E, "aria-label", i + " button")
                }
                ), this)
            }
            var L = Object(b.a)("jw-icon-next", (function() {
                t.next({
                    feedShownId: y,
                    reason: "interaction"
                })
            }
            ), j.next, Object(s.b)("next"))
              , A = Object(b.a)("jw-icon-settings jw-settings-submenu-button", (function(t) {
                r.trigger("settingsInteraction", "quality", !0, t)
            }
            ), j.settings, Object(s.b)("settings"));
            Object(u.t)(A.element(), "aria-haspopup", "true"),
            Object(u.t)(A.element(), "aria-controls", "jw-settings-menu");
            var _ = Object(b.a)("jw-icon-cc jw-settings-submenu-button", (function(t) {
                r.trigger("settingsInteraction", "captions", !1, t)
            }
            ), j.cc, Object(s.b)("cc-off,cc-on"));
            Object(u.t)(_.element(), "aria-haspopup", "true"),
            Object(u.t)(_.element(), "aria-controls", "jw-settings-submenu-captions");
            var I = Object(b.a)("jw-text-live", (function() {
                r.goToLiveEdge()
            }
            ), j.liveBroadcast);
            I.element().textContent = j.liveBroadcast;
            var H, V, P, q = this.elements = {
                alt: (H = "jw-text-alt",
                V = "status",
                P = document.createElement("span"),
                P.className = "jw-text jw-reset-text " + H,
                V && Object(u.t)(P, "role", V),
                Object(u.t)(P, "dir", "auto"),
                P),
                play: Object(b.a)("jw-icon-playback", (function() {
                    t.playToggle({
                        reason: "interaction"
                    })
                }
                ), j.play, Object(s.b)("play,pause,stop")),
                rewind: Object(b.a)("jw-icon-rewind", (function() {
                    r.rewind()
                }
                ), j.rewind, Object(s.b)("rewind")),
                live: I,
                next: L,
                elapsed: O("jw-text-elapsed", "timer"),
                countdown: O("jw-text-countdown", "timer"),
                time: h,
                duration: O("jw-text-duration", "timer"),
                mute: d,
                volumetooltip: c,
                horizontalVolumeContainer: p,
                cast: z((function() {
                    t.castToggle()
                }
                ), j),
                pip: T(e.get("pipIcon"), (function() {
                    t.setPip()
                }
                ), j),
                imaFullscreen: Object(b.a)("jw-icon-fullscreen", (function() {
                    t.setFullscreen()
                }
                ), j.fullscreen, Object(s.b)("fullscreen-off,fullscreen-on")),
                fullscreen: Object(b.a)("jw-icon-fullscreen", (function() {
                    t.setFullscreen()
                }
                ), j.fullscreen, Object(s.b)("fullscreen-off,fullscreen-on")),
                spacer: C("jw-spacer"),
                buttonContainer: C("jw-button-container"),
                settingsButton: A,
                captionsButton: _
            }, N = Object(m.a)(_.element(), "captions", j.cc), R = function(t) {
                var e = t.get("captionsList")[t.get("captionsIndex")]
                  , i = j.cc;
                e && "Off" !== e.label && (i = e.label),
                N.setText(i)
            }, U = Object(m.a)(q.play.element(), "play", j.play);
            this.setPlayText = function(t) {
                U.setText(t)
            }
            ;
            var D = q.next.element()
              , F = Object(m.a)(D, "next", j.nextUp, (function() {
                var t = e.get("nextUp");
                t && (y = Object(x.b)(x.a),
                r.trigger("nextShown", {
                    mode: t.mode,
                    ui: "nextup",
                    itemsShown: [t],
                    feedData: t.feedData,
                    reason: "hover",
                    feedShownId: y
                }))
            }
            ), (function() {
                y = ""
            }
            ));
            Object(u.t)(D, "dir", "auto"),
            Object(m.a)(q.rewind.element(), "rewind", j.rewind),
            Object(m.a)(q.settingsButton.element(), "settings", j.settings);
            var Z = [Object(m.a)(q.fullscreen.element(), "fullscreen", j.fullscreen), Object(m.a)(q.imaFullscreen.element())];
            Object(u.a)(q.imaFullscreen.element(), "jw-fullscreen-ima");
            var W = [q.play, q.rewind, q.next, q.volumetooltip, q.imaFullscreen, q.mute, q.horizontalVolumeContainer, q.alt, q.live, q.elapsed, q.countdown, q.duration, q.spacer, q.cast, q.captionsButton, q.settingsButton, q.pip, q.fullscreen].filter((function(t) {
                return t
            }
            ))
              , K = [q.time, q.buttonContainer].filter((function(t) {
                return t
            }
            ));
            this.el = document.createElement("div"),
            this.el.className = "jw-controlbar jw-reset",
            M(q.buttonContainer, W),
            M(this.el, K);
            var Y = e.get("logo");
            if (Y && "control-bar" === Y.position && this.addLogo(Y),
            q.play.show(),
            q.fullscreen.show(),
            q.mute && q.mute.show(),
            q.pip && q.pip.show(),
            e.change("volume", this.onVolume, this),
            e.change("mute", (function(t, e) {
                r.renderVolume(e, t.get("volume"))
            }
            ), this),
            e.change("state", this.onState, this),
            e.change("duration", this.onDuration, this),
            e.change("position", this.onElapsed, this),
            e.change("fullscreen", (function(t, e) {
                for (var i = [r.elements.fullscreen.element(), r.elements.imaFullscreen.element()], n = 0; n < i.length; n++) {
                    var o = i[n];
                    Object(u.v)(i[n], "jw-off", e);
                    var a = t.get("fullscreen") ? j.exitFullscreen : j.fullscreen;
                    Z[n].setText(a),
                    Object(u.t)(o, "aria-label", a)
                }
            }
            ), this),
            e.change("pip", (function(t, e) {
                r.elements.pip && Object(u.v)(r.elements.pip.element(), "jw-off", e)
            }
            ), this),
            e.change("mediaType", (function(t, e) {
                r.elements.pip && r.elements.pip.toggle("audio" !== e)
            }
            ), this),
            e.change("streamType", this.onStreamTypeChange, this),
            e.change("dvrLive", (function(t, e) {
                var i = j.liveBroadcast
                  , n = j.notLive
                  , o = r.elements.live.element()
                  , a = !1 === e;
                Object(u.v)(o, "jw-dvr-live", a),
                Object(u.t)(o, "aria-label", a ? n : i),
                o.textContent = a ? n : i
            }
            ), this),
            e.change("altText", this.setAltText, this),
            e.change("customButtons", this.updateButtons, this),
            e.on("change:captionsIndex", R, this),
            e.on("change:captionsList", R, this),
            e.change("nextUp", (function(t, e) {
                y = Object(x.b)(x.a);
                var i = j.nextUp;
                e && e.title && (i += ": " + e.title),
                F.setText(i),
                q.next.toggle(!!e)
            }
            ), this),
            e.change("audioMode", this.onAudioMode, this),
            q.cast && (e.change("castAvailable", this.onCastAvailable, this),
            e.change("castActive", this.onCastActive, this)),
            q.volumetooltip && (q.volumetooltip.on("update", (function(t) {
                var e = t.percentage;
                this._api.setVolume(e)
            }
            ), this),
            q.volumetooltip.on("toggleValue", (function() {
                this._api.setMute()
            }
            ), this),
            q.volumetooltip.on("adjustVolume", (function(t) {
                this.trigger("adjustVolume", t)
            }
            ), this)),
            q.cast && q.cast.button) {
                var X = q.cast.ui.on("click enter", (function(t) {
                    "keydown" === t.type && q.cast.button.click(),
                    this._model.set("castClicked", !0)
                }
                ), this);
                this.ui.push(X)
            }
            var Q = Object(k.a)(q.duration, (function() {
                if ("DVR" === this._model.get("streamType")) {
                    var t = this._model.get("position")
                      , e = this._model.get("dvrSeekLimit");
                    this._api.seek(Math.max(-e, t), {
                        reason: "interaction"
                    })
                }
            }
            ), this);
            this.ui.push(Q);
            var J = new w.a(this.el).on("click drag", (function() {
                this.trigger(a.tb)
            }
            ), this);
            this.ui.push(J),
            f.forEach((function(t) {
                t.on("open-tooltip", r.closeMenus, r)
            }
            ))
        }
        var e = t.prototype;
        return e.onVolume = function(t, e) {
            this.renderVolume(t.get("mute"), e)
        }
        ,
        e.renderVolume = function(t, e) {
            var i = this.elements.mute
              , n = this.elements.volumetooltip;
            if (i && (Object(u.v)(i.element(), "jw-off", t),
            Object(u.v)(i.element(), "jw-full", !t)),
            n) {
                var o = t ? 0 : e
                  , a = n.element();
                n.verticalSlider.render(o),
                n.horizontalSlider.render(o);
                var s = n.tooltip
                  , r = n.horizontalContainer;
                Object(u.v)(a, "jw-off", t),
                Object(u.v)(a, "jw-full", e >= 75 && !t),
                Object(u.t)(s, "aria-valuenow", o),
                Object(u.t)(r, "aria-valuenow", o);
                var l = "Volume " + o + "%";
                Object(u.t)(s, "aria-valuetext", l),
                Object(u.t)(r, "aria-valuetext", l),
                document.activeElement !== s && document.activeElement !== r && (this._volumeAnnouncer.textContent = l)
            }
        }
        ,
        e.onCastAvailable = function(t, e) {
            this.elements.cast.toggle(e)
        }
        ,
        e.onCastActive = function(t, e) {
            this.elements.fullscreen.toggle(!e),
            this.elements.imaFullscreen.toggle(!e),
            this.elements.pip && this.elements.pip.toggle(!e),
            this.elements.cast.button && Object(u.v)(this.elements.cast.button, "jw-off", !e)
        }
        ,
        e.onElapsed = function(t, e) {
            var i, n, o = t.get("duration");
            if ("DVR" === t.get("streamType")) {
                var a = Math.ceil(e)
                  , s = this._model.get("dvrSeekLimit");
                i = n = a >= -s ? "" : "-" + Object(y.timeFormat)(-(e + s)),
                t.set("dvrLive", a >= -s)
            } else
                i = Object(y.timeFormat)(e),
                n = Object(y.timeFormat)(o - e);
            this.elements.elapsed.textContent = i,
            this.elements.countdown.textContent = n
        }
        ,
        e.onDuration = function(t, e) {
            this.elements.duration.textContent = Object(y.timeFormat)(Math.abs(e))
        }
        ,
        e.onAudioMode = function(t, e) {
            var i = this.elements.time.element();
            e ? this.elements.buttonContainer.insertBefore(i, this.elements.elapsed) : Object(u.m)(this.el, i)
        }
        ,
        e.element = function() {
            return this.el
        }
        ,
        e.setAltText = function(t, e) {
            this.elements.alt.textContent = e
        }
        ,
        e.closeMenus = function(t) {
            this.menus.forEach((function(e) {
                t && t.target === e.el || e.closeTooltip(t)
            }
            ))
        }
        ,
        e.rewind = function() {
            var t, e = 0, i = this._model.get("currentTime");
            i ? t = i - 10 : (t = this._model.get("position") - 10,
            "DVR" === this._model.get("streamType") && (e = this._model.get("duration"))),
            this._api.seek(Math.max(t, e), {
                reason: "interaction"
            })
        }
        ,
        e.onState = function(t, e) {
            var i = t.get("localization")
              , n = i.play;
            this.setPlayText(n),
            e === a.pb && ("LIVE" !== t.get("streamType") ? (n = i.pause,
            this.setPlayText(n)) : (n = i.stop,
            this.setPlayText(n))),
            Object(u.t)(this.elements.play.element(), "aria-label", n)
        }
        ,
        e.onStreamTypeChange = function(t, e) {
            var i = "LIVE" === e
              , n = "DVR" === e;
            this.elements.rewind && this.elements.rewind.toggle(!i),
            this.elements.live.toggle(i || n),
            Object(u.t)(this.elements.live.element(), "tabindex", i ? "-1" : "0"),
            this.elements.duration.style.display = n ? "none" : "",
            this.onDuration(t, t.get("duration")),
            this.onState(t, t.get("state"))
        }
        ,
        e.addLogo = function(t) {
            var e = this.elements.buttonContainer
              , i = new r.a(t.file,this._model.get("localization").logo,(function() {
                t.link && Object(u.l)(t.link, "_blank", {
                    rel: "noreferrer"
                })
            }
            ),"logo","jw-logo-button");
            t.link || Object(u.t)(i.element(), "tabindex", "-1"),
            e.insertBefore(i.element(), e.querySelector(".jw-spacer").nextSibling)
        }
        ,
        e.goToLiveEdge = function() {
            if ("DVR" === this._model.get("streamType")) {
                var t = Math.min(this._model.get("position"), -1)
                  , e = this._model.get("dvrSeekLimit");
                this._api.seek(Math.max(-e, t), {
                    reason: "interaction"
                }),
                this._api.play({
                    reason: "interaction"
                })
            }
        }
        ,
        e.updateButtons = function(t, e, i) {
            if (e) {
                var n, o, a = this.elements.buttonContainer;
                e !== i && i ? (n = S(e, i),
                o = S(i, e),
                this.removeButtons(a, o)) : n = e;
                for (var s = n.length - 1; s >= 0; s--) {
                    var l = n[s]
                      , c = new r.a(l.img,l.tooltip,l.callback,l.id,l.btnClass);
                    l.tooltip && Object(m.a)(c.element(), l.id, l.tooltip);
                    var p = void 0;
                    "related" === c.id ? p = this.elements.settingsButton.element() : "share" === c.id ? p = a.querySelector('[button="related"]') || this.elements.settingsButton.element() : (p = this.elements.spacer.nextSibling) && "logo" === p.getAttribute("button") && (p = p.nextSibling),
                    a.insertBefore(c.element(), p)
                }
            }
        }
        ,
        e.removeButtons = function(t, e) {
            for (var i = e.length; i--; ) {
                var n = t.querySelector('[button="' + e[i].id + '"]');
                n && t.removeChild(n)
            }
        }
        ,
        e.toggleCaptionsButtonState = function(t) {
            var e = this.elements.captionsButton;
            e && Object(u.v)(e.element(), "jw-off", !t)
        }
        ,
        e.destroy = function() {
            var t = this;
            this._model.off(null, null, this),
            Object.keys(this.elements).forEach((function(e) {
                var i = t.elements[e];
                i && "function" == typeof i.destroy && t.elements[e].destroy()
            }
            )),
            this.ui.forEach((function(t) {
                t.destroy()
            }
            )),
            this.ui = []
        }
        ,
        t
    }()
}
, function(t, e, i) {
    "use strict";
    var n = i(11)
      , o = i(7)
      , a = i(5)
      , s = function() {
        function t(t) {
            this.model = t.player,
            this.truncated = t.get("__ab_truncated") && !a.Browser.ie
        }
        var e = t.prototype;
        return e.hide = function() {
            Object(n.d)(this.el, {
                display: "none"
            })
        }
        ,
        e.show = function() {
            Object(n.d)(this.el, {
                display: ""
            })
        }
        ,
        e.setup = function(t) {
            if (this.el = t,
            this.el) {
                var e = this.el.getElementsByTagName("div");
                this.title = e[0],
                this.description = e[1],
                this.truncated && this.el.classList.add("jw-ab-truncated"),
                this.model.on("change:logoWidth", this.update, this),
                this.model.change("playlistItem", this.playlistItem, this)
            }
        }
        ,
        e.update = function(t) {
            var e = {}
              , i = t.get("logo");
            if (i) {
                var o = 1 * parseInt(("" + i.margin).replace("px", ""))
                  , a = t.get("logoWidth") + (isNaN(o) ? 0 : o + 10);
                "top-left" === i.position ? e.paddingLeft = a : "top-right" === i.position && (e.paddingRight = a)
            }
            Object(n.d)(this.el, e)
        }
        ,
        e.playlistItem = function(t, e) {
            if (e)
                if (t.get("displaytitle") || t.get("displaydescription")) {
                    var i = ""
                      , n = "";
                    e.title && t.get("displaytitle") && (i = e.title),
                    e.description && t.get("displaydescription") && (n = e.description),
                    this.updateText(i, n)
                } else
                    this.hide()
        }
        ,
        e.updateText = function(t, e) {
            this.title && this.description && (Object(o.q)(this.title, t),
            Object(o.q)(this.description, e),
            this.title.firstChild || this.description.firstChild ? this.show() : this.hide())
        }
        ,
        e.element = function() {
            return this.el
        }
        ,
        t
    }();
    e.a = s
}
, function(t, e, i) {
    var n = i(131);
    "string" == typeof n && (n = [["all-players", n, ""]]),
    i(41).style(n, "all-players"),
    n.locals && (t.exports = n.locals)
}
, function(t, e, i) {
    (t.exports = i(76)(!1)).push([t.i, '.jw-overlays,.jw-controls,.jw-controls-backdrop,.jw-flag-small-player .jw-settings-menu,.jw-settings-submenu{height:100%;width:100%}.jw-settings-menu .jw-icon::after,.jw-icon-settings::after,.jw-icon-volume::after,.jw-settings-menu .jw-icon.jw-button-color::after{position:absolute;right:0}.jw-overlays,.jw-controls,.jw-controls-backdrop,.jw-settings-item-active::before{top:0;position:absolute;left:0}.jw-settings-menu .jw-icon::after,.jw-icon-settings::after,.jw-icon-volume::after,.jw-settings-menu .jw-icon.jw-button-color::after{position:absolute;bottom:0;left:0}.jw-nextup-close{position:absolute;top:0;right:0}.jw-overlays,.jw-controls,.jw-flag-small-player .jw-settings-menu{position:absolute;bottom:0;right:0}.jw-settings-menu .jw-icon::after,.jw-icon-settings::after,.jw-icon-volume::after,.jw-time-tip::after,.jw-settings-menu .jw-icon.jw-button-color::after,.jw-text-live::before,.jw-controlbar .jw-tooltip::after,.jw-settings-menu .jw-tooltip::after{content:"";display:block}.jw-svg-icon{height:24px;width:24px;fill:currentColor;pointer-events:none}.jw-icon{height:44px;width:44px;background-color:transparent;outline:none}.jw-icon.jw-tab-focus:focus{border:solid 2px #4d90fe}.jw-icon-airplay .jw-svg-icon-airplay-off{display:none}.jw-off.jw-icon-airplay .jw-svg-icon-airplay-off{display:block}.jw-icon-airplay .jw-svg-icon-airplay-on{display:block}.jw-off.jw-icon-airplay .jw-svg-icon-airplay-on{display:none}.jw-icon-cc .jw-svg-icon-cc-off{display:none}.jw-off.jw-icon-cc .jw-svg-icon-cc-off{display:block}.jw-icon-cc .jw-svg-icon-cc-on{display:block}.jw-off.jw-icon-cc .jw-svg-icon-cc-on{display:none}.jw-icon-fullscreen .jw-svg-icon-fullscreen-off{display:none}.jw-off.jw-icon-fullscreen .jw-svg-icon-fullscreen-off{display:block}.jw-icon-fullscreen .jw-svg-icon-fullscreen-on{display:block}.jw-off.jw-icon-fullscreen .jw-svg-icon-fullscreen-on{display:none}.jw-icon-pip .jw-svg-icon-pip-off{display:none}.jw-off.jw-icon-pip .jw-svg-icon-pip-off{display:block}.jw-icon-pip .jw-svg-icon-pip-on{display:block}.jw-off.jw-icon-pip .jw-svg-icon-pip-on{display:none}.jw-icon-volume .jw-svg-icon-volume-0{display:none}.jw-off.jw-icon-volume .jw-svg-icon-volume-0{display:block}.jw-icon-volume .jw-svg-icon-volume-100{display:none}.jw-full.jw-icon-volume .jw-svg-icon-volume-100{display:block}.jw-icon-volume .jw-svg-icon-volume-50{display:block}.jw-off.jw-icon-volume .jw-svg-icon-volume-50,.jw-full.jw-icon-volume .jw-svg-icon-volume-50{display:none}.jw-settings-menu .jw-icon::after,.jw-icon-settings::after,.jw-icon-volume::after{height:100%;width:24px;box-shadow:inset 0 -3px 0 -1px currentColor;margin:auto;opacity:0;transition:opacity 150ms cubic-bezier(0, .25, .25, 1)}.jw-settings-menu .jw-icon[aria-checked="true"]::after,.jw-settings-open .jw-icon-settings::after,.jw-icon-volume.jw-open::after{opacity:1}.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-cc,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-settings,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-audio-tracks,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-hd,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-settings-sharing,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-fullscreen,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player).jw-flag-cast-available .jw-icon-airplay,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player).jw-flag-cast-available .jw-icon-cast{display:none}.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-volume,.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-text-live{bottom:6px}.jwplayer.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-icon-volume::after{display:none}.jw-overlays,.jw-controls{pointer-events:none}.jw-controls-backdrop{display:block;background:linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 77%, rgba(0,0,0,0.4) 100%) 100% 100% / 100% 240px no-repeat transparent;transition:opacity 250ms cubic-bezier(0, .25, .25, 1),background-size 250ms cubic-bezier(0, .25, .25, 1);pointer-events:none}.jw-overlays{cursor:auto}.jw-controls{overflow:hidden}.jw-flag-small-player .jw-controls{text-align:center}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:normal;color:#fff;text-align:center;font-variant:normal;font-stretch:normal}.jw-controlbar,.jw-skip,.jw-display-icon-container .jw-icon,.jw-nextup-container,.jw-autostart-mute,.jw-overlays .jw-plugin{pointer-events:all}.jwplayer .jw-display-icon-container,.jw-error .jw-display-icon-container{width:auto;height:auto;box-sizing:content-box}.jw-display{display:flex;flex-direction:column;justify-content:center;height:100%;padding:57px 0;position:relative;width:100%}.jw-flag-dragging .jw-display{display:none}.jw-state-idle:not(.jw-flag-cast-available) .jw-display{padding:0}.jw-display-container{text-align:center}.jw-display-controls{display:inline-block}.jwplayer .jw-display-icon-container{float:left}.jw-display-icon-container{display:inline-block;padding:5.5px;margin:0 22px}.jw-display-icon-container .jw-icon{height:75px;width:75px;cursor:pointer;display:flex;justify-content:center;align-items:center}.jw-display-icon-container .jw-icon .jw-svg-icon{height:33px;width:33px;padding:0;position:relative}.jw-display-icon-container .jw-icon .jw-svg-icon-rewind{padding:.2em .05em}.jw-breakpoint--1 .jw-nextup-container{display:none}.jw-breakpoint-0 .jw-display-icon-next,.jw-breakpoint--1 .jw-display-icon-next,.jw-breakpoint-0 .jw-display-icon-rewind,.jw-breakpoint--1 .jw-display-icon-rewind{display:none}.jw-breakpoint-0.jw-flag-touch .jw-display .jw-icon,.jw-breakpoint--1.jw-flag-touch .jw-display .jw-icon,.jw-breakpoint-0.jw-flag-touch .jw-display .jw-svg-icon,.jw-breakpoint--1.jw-flag-touch .jw-display .jw-svg-icon{z-index:100;position:relative}.jw-breakpoint-0 .jw-display .jw-icon,.jw-breakpoint--1 .jw-display .jw-icon,.jw-breakpoint-0 .jw-display .jw-svg-icon,.jw-breakpoint--1 .jw-display .jw-svg-icon{width:44px;height:44px;line-height:44px}.jw-breakpoint-0 .jw-display .jw-icon:before,.jw-breakpoint--1 .jw-display .jw-icon:before,.jw-breakpoint-0 .jw-display .jw-svg-icon:before,.jw-breakpoint--1 .jw-display .jw-svg-icon:before{width:22px;height:22px}.jw-breakpoint-1 .jw-display .jw-icon,.jw-breakpoint-1 .jw-display .jw-svg-icon{width:44px;height:44px;line-height:44px}.jw-breakpoint-1 .jw-display .jw-icon:before,.jw-breakpoint-1 .jw-display .jw-svg-icon:before{width:22px;height:22px}.jw-breakpoint-1 .jw-display .jw-icon.jw-icon-rewind:before{width:33px;height:33px}.jw-breakpoint-2 .jw-display .jw-icon,.jw-breakpoint-3 .jw-display .jw-icon,.jw-breakpoint-2 .jw-display .jw-svg-icon,.jw-breakpoint-3 .jw-display .jw-svg-icon{width:77px;height:77px;line-height:77px}.jw-breakpoint-2 .jw-display .jw-icon:before,.jw-breakpoint-3 .jw-display .jw-icon:before,.jw-breakpoint-2 .jw-display .jw-svg-icon:before,.jw-breakpoint-3 .jw-display .jw-svg-icon:before{width:38.5px;height:38.5px}.jw-breakpoint-4 .jw-display .jw-icon,.jw-breakpoint-5 .jw-display .jw-icon,.jw-breakpoint-6 .jw-display .jw-icon,.jw-breakpoint-7 .jw-display .jw-icon,.jw-breakpoint-4 .jw-display .jw-svg-icon,.jw-breakpoint-5 .jw-display .jw-svg-icon,.jw-breakpoint-6 .jw-display .jw-svg-icon,.jw-breakpoint-7 .jw-display .jw-svg-icon{width:88px;height:88px;line-height:88px}.jw-breakpoint-4 .jw-display .jw-icon:before,.jw-breakpoint-5 .jw-display .jw-icon:before,.jw-breakpoint-6 .jw-display .jw-icon:before,.jw-breakpoint-7 .jw-display .jw-icon:before,.jw-breakpoint-4 .jw-display .jw-svg-icon:before,.jw-breakpoint-5 .jw-display .jw-svg-icon:before,.jw-breakpoint-6 .jw-display .jw-svg-icon:before,.jw-breakpoint-7 .jw-display .jw-svg-icon:before{width:44px;height:44px}.jw-controlbar{display:flex;flex-flow:row wrap;align-items:center;justify-content:center;position:absolute;left:0;bottom:0;width:100%;border:none;border-radius:0;background-size:auto;box-shadow:none;max-height:72px;transition:250ms cubic-bezier(0, .25, .25, 1);transition-property:opacity, visibility;transition-delay:0s}.jw-flag-touch.jw-breakpoint-0 .jw-controlbar .jw-icon-inline{height:40px}.jw-breakpoint-7 .jw-controlbar{max-height:140px}.jw-breakpoint-7 .jw-controlbar .jw-button-container{padding:0 48px 20px}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-tooltip{margin-bottom:-7px}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-icon-volume .jw-overlay{padding-bottom:40%}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-text{font-size:1em}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-text.jw-text-elapsed{justify-content:flex-end}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-icon-inline:not(.jw-text-live),.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-icon-volume{height:60px;width:60px}.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-icon-inline:not(.jw-text-live) .jw-svg-icon,.jw-breakpoint-7 .jw-controlbar .jw-button-container .jw-icon-volume .jw-svg-icon{height:30px;width:30px}.jw-breakpoint-7 .jw-controlbar .jw-slider-time{padding:0 60px;height:34px}.jw-breakpoint-7 .jw-controlbar .jw-slider-time .jw-slider-container{height:10px}.jw-controlbar .jw-button-image{background:no-repeat 50% 50%;background-size:contain;max-height:24px}.jw-controlbar .jw-spacer{margin:0 auto}.jw-controlbar .jw-icon.jw-button-color:hover{color:#fff}.jw-button-container{display:flex;flex-flow:row nowrap;flex:1 1 auto;align-items:center;justify-content:flex-start;width:100%;padding:0 12px}.jw-slider-horizontal{background-color:transparent}.jw-icon-inline{position:relative}.jw-icon-inline,.jw-icon-tooltip{height:44px;width:44px;align-items:center;display:flex;justify-content:center}.jw-icon-inline:not(.jw-text),.jw-icon-tooltip,.jw-slider-horizontal{cursor:pointer}.jw-text-elapsed,.jw-text-duration{justify-content:flex-start;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.jw-icon-tooltip{position:relative}.jw-knob:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-icon-display:hover,.jw-option:before:hover{color:#fff}.jw-time-tip,.jw-controlbar .jw-tooltip,.jw-settings-menu .jw-tooltip{pointer-events:none}.jw-icon-cast{display:none;margin:0;padding:0}.jw-icon-cast google-cast-launcher{background-color:transparent;border:none;padding:0;width:24px;height:24px;cursor:pointer}.jw-fullscreen-ima{display:none}.jw-icon-inline.jw-icon-volume{display:none}.jwplayer .jw-text-countdown{display:none}.jw-flag-small-player .jw-display{padding-top:0;padding-bottom:0}.jw-flag-small-player:not(.jw-flag-audio-player):not(.jw-flag-ads) .jw-controlbar .jw-button-container>.jw-icon-rewind,.jw-flag-small-player:not(.jw-flag-audio-player):not(.jw-flag-ads) .jw-controlbar .jw-button-container>.jw-icon-next,.jw-flag-small-player:not(.jw-flag-audio-player):not(.jw-flag-ads) .jw-controlbar .jw-button-container>.jw-icon-playback{display:none}.jw-flag-ads-vpaid:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar,.jw-flag-user-inactive.jw-state-playing:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar,.jw-flag-user-inactive.jw-state-buffering:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controlbar{visibility:hidden;pointer-events:none;opacity:0;transition-delay:0s, 250ms}.jw-flag-ads-vpaid:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controls-backdrop,.jw-flag-user-inactive.jw-state-playing:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controls-backdrop,.jw-flag-user-inactive.jw-state-buffering:not(.jw-flag-media-audio):not(.jw-flag-audio-player):not(.jw-flag-ads-vpaid-controls):not(.jw-flag-casting) .jw-controls-backdrop{opacity:0}.jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint-0 .jw-text-countdown{display:flex}.jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint--1 .jw-text-elapsed,.jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint-0 .jw-text-elapsed,.jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint--1 .jw-text-duration,.jwplayer:not(.jw-flag-ads):not(.jw-flag-live).jw-breakpoint-0 .jw-text-duration{display:none}.jwplayer.jw-breakpoint--1:not(.jw-flag-ads):not(.jw-flag-audio-player) .jw-text-countdown,.jwplayer.jw-breakpoint--1:not(.jw-flag-ads):not(.jw-flag-audio-player) .jw-related-btn,.jwplayer.jw-breakpoint--1:not(.jw-flag-ads):not(.jw-flag-audio-player) .jw-slider-volume{display:none}.jwplayer.jw-breakpoint--1:not(.jw-flag-ads):not(.jw-flag-audio-player) .jw-controlbar{flex-direction:column-reverse}.jwplayer.jw-breakpoint--1:not(.jw-flag-ads):not(.jw-flag-audio-player) .jw-button-container{height:30px}.jw-breakpoint--1.jw-flag-ads:not(.jw-flag-audio-player) .jw-icon-volume,.jw-breakpoint--1.jw-flag-ads:not(.jw-flag-audio-player) .jw-icon-fullscreen{display:none}.jwplayer:not(.jw-breakpoint-0) .jw-text-duration:before,.jwplayer:not(.jw-breakpoint--1) .jw-text-duration:before{content:"/";padding-right:1ch;padding-left:1ch}.jwplayer:not(.jw-flag-user-inactive) .jw-controlbar{will-change:transform}.jwplayer:not(.jw-flag-user-inactive) .jw-controlbar .jw-text{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.jw-slider-container{display:flex;align-items:center;position:relative;touch-action:none}.jw-rail,.jw-buffer,.jw-progress{position:absolute;cursor:pointer}.jw-progress{background-color:#f2f2f2}.jw-rail{background-color:rgba(255,255,255,0.3)}.jw-buffer{background-color:rgba(255,255,255,0.3)}.jw-knob{height:13px;width:13px;background-color:#fff;border-radius:50%;box-shadow:0 0 10px rgba(0,0,0,0.4);opacity:1;pointer-events:none;position:absolute;-webkit-transform:translate(-50%, -50%) scale(0);transform:translate(-50%, -50%) scale(0);transition:150ms cubic-bezier(0, .25, .25, 1);transition-property:opacity, -webkit-transform;transition-property:opacity, transform;transition-property:opacity, transform, -webkit-transform}.jw-flag-dragging .jw-slider-time .jw-knob,.jw-icon-volume:active .jw-slider-volume .jw-knob{box-shadow:0 0 26px rgba(0,0,0,0.2),0 0 10px rgba(0,0,0,0.4),0 0 0 6px rgba(255,255,255,0.2)}.jw-slider-horizontal,.jw-slider-vertical{display:flex}.jw-slider-horizontal .jw-slider-container{height:5px;width:100%}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-cue,.jw-slider-horizontal .jw-knob{top:50%}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-cue{-webkit-transform:translate(0, -50%);transform:translate(0, -50%)}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress{height:5px}.jw-slider-horizontal .jw-rail{width:100%}.jw-slider-vertical{align-items:center;flex-direction:column}.jw-slider-vertical .jw-slider-container{height:88px;width:5px}.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-knob{left:50%}.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress{height:100%;width:5px;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0);transition:-webkit-transform 150ms ease-in-out;transition:transform 150ms ease-in-out;transition:transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;bottom:0}.jw-slider-vertical .jw-knob{-webkit-transform:translate(-50%, 50%);transform:translate(-50%, 50%)}.jw-slider-time.jw-tab-focus:focus .jw-rail{outline:solid 2px #4d90fe}.jw-slider-time,.jw-horizontal-volume-container .jw-slider-volume{height:17px;width:100%;align-items:center;background:transparent none;padding:0 12px}.jw-slider-time .jw-cue{background-color:rgba(33,33,33,0.8);cursor:pointer;position:absolute;width:6px}.jw-slider-time,.jw-horizontal-volume-container{z-index:1;outline:none}.jw-slider-time .jw-rail,.jw-horizontal-volume-container .jw-rail,.jw-slider-time .jw-buffer,.jw-horizontal-volume-container .jw-buffer,.jw-slider-time .jw-progress,.jw-horizontal-volume-container .jw-progress,.jw-slider-time .jw-cue,.jw-horizontal-volume-container .jw-cue{-webkit-backface-visibility:hidden;backface-visibility:hidden;height:100%;-webkit-transform:translate(0, -50%) scale(1, .6);transform:translate(0, -50%) scale(1, .6);transition:-webkit-transform 150ms ease-in-out;transition:transform 150ms ease-in-out;transition:transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out}.jw-slider-time:hover .jw-rail,.jw-horizontal-volume-container:hover .jw-rail,.jw-slider-time:focus .jw-rail,.jw-horizontal-volume-container:focus .jw-rail,.jw-flag-dragging .jw-slider-time .jw-rail,.jw-flag-dragging .jw-horizontal-volume-container .jw-rail,.jw-flag-touch .jw-slider-time .jw-rail,.jw-flag-touch .jw-horizontal-volume-container .jw-rail,.jw-slider-time:hover .jw-buffer,.jw-horizontal-volume-container:hover .jw-buffer,.jw-slider-time:focus .jw-buffer,.jw-horizontal-volume-container:focus .jw-buffer,.jw-flag-dragging .jw-slider-time .jw-buffer,.jw-flag-dragging .jw-horizontal-volume-container .jw-buffer,.jw-flag-touch .jw-slider-time .jw-buffer,.jw-flag-touch .jw-horizontal-volume-container .jw-buffer,.jw-slider-time:hover .jw-progress,.jw-horizontal-volume-container:hover .jw-progress,.jw-slider-time:focus .jw-progress,.jw-horizontal-volume-container:focus .jw-progress,.jw-flag-dragging .jw-slider-time .jw-progress,.jw-flag-dragging .jw-horizontal-volume-container .jw-progress,.jw-flag-touch .jw-slider-time .jw-progress,.jw-flag-touch .jw-horizontal-volume-container .jw-progress,.jw-slider-time:hover .jw-cue,.jw-horizontal-volume-container:hover .jw-cue,.jw-slider-time:focus .jw-cue,.jw-horizontal-volume-container:focus .jw-cue,.jw-flag-dragging .jw-slider-time .jw-cue,.jw-flag-dragging .jw-horizontal-volume-container .jw-cue,.jw-flag-touch .jw-slider-time .jw-cue,.jw-flag-touch .jw-horizontal-volume-container .jw-cue{-webkit-transform:translate(0, -50%) scale(1, 1);transform:translate(0, -50%) scale(1, 1)}.jw-slider-time:hover .jw-knob,.jw-horizontal-volume-container:hover .jw-knob,.jw-slider-time:focus .jw-knob,.jw-horizontal-volume-container:focus .jw-knob{-webkit-transform:translate(-50%, -50%) scale(1);transform:translate(-50%, -50%) scale(1)}.jw-slider-time .jw-rail,.jw-horizontal-volume-container .jw-rail{background-color:rgba(255,255,255,0.2)}.jw-slider-time .jw-buffer,.jw-horizontal-volume-container .jw-buffer{background-color:rgba(255,255,255,0.4)}.jw-flag-touch .jw-slider-time::before,.jw-flag-touch .jw-horizontal-volume-container::before{height:44px;width:100%;content:"";position:absolute;display:block;bottom:calc(100% - 17px);left:0}.jw-breakpoint-0.jw-flag-touch .jw-slider-time::before,.jw-breakpoint-0.jw-flag-touch .jw-horizontal-volume-container::before{height:34px}.jw-slider-time.jw-tab-focus:focus .jw-rail,.jw-horizontal-volume-container.jw-tab-focus:focus .jw-rail{outline:solid 2px #4d90fe}.jw-flag-horizontal-slider .jw-overlay{display:none}.jw-flag-audio-player .jw-flag-horizontal-slider~.jw-horizontal-volume-container,.jwplayer:not(.jw-flag-small-player) .jw-flag-horizontal-slider~.jw-horizontal-volume-container{display:flex;transition:width 300ms cubic-bezier(0, .25, .25, 1);width:0}.jw-flag-audio-player .jw-flag-horizontal-slider~.jw-horizontal-volume-container.jw-open,.jwplayer:not(.jw-flag-small-player) .jw-flag-horizontal-slider~.jw-horizontal-volume-container.jw-open{width:140px}.jw-flag-audio-player .jw-flag-horizontal-slider~.jw-horizontal-volume-container.jw-open .jw-slider-volume,.jwplayer:not(.jw-flag-small-player) .jw-flag-horizontal-slider~.jw-horizontal-volume-container.jw-open .jw-slider-volume{padding-right:24px;opacity:1}.jw-flag-audio-player .jw-flag-horizontal-slider~.jw-horizontal-volume-container .jw-slider-volume,.jwplayer:not(.jw-flag-small-player) .jw-flag-horizontal-slider~.jw-horizontal-volume-container .jw-slider-volume{transition:opacity 300ms;opacity:0}.jw-flag-audio-player .jw-flag-horizontal-slider~.jw-horizontal-volume-container .jw-slider-volume .jw-knob,.jwplayer:not(.jw-flag-small-player) .jw-flag-horizontal-slider~.jw-horizontal-volume-container .jw-slider-volume .jw-knob{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.jw-flag-audio-player .jw-button-container .jw-icon,.jwplayer:not(.jw-flag-small-player) .jw-button-container .jw-icon{flex:0 0 auto}.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-slider-time{height:17px;padding:0}.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-slider-time .jw-slider-container{height:10px}.jw-breakpoint--1:not(.jw-flag-audio-player) .jw-slider-time .jw-knob{border-radius:0;border:1px solid rgba(0,0,0,0.75);height:12px;width:10px}.jw-breakpoint-0 .jw-slider-time{height:11px}.jw-horizontal-volume-container{display:none}.jw-modal{width:284px}.jw-breakpoint-7 .jw-modal,.jw-breakpoint-6 .jw-modal,.jw-breakpoint-5 .jw-modal{height:232px}.jw-breakpoint-4 .jw-modal,.jw-breakpoint-3 .jw-modal{height:192px}.jw-breakpoint-2 .jw-modal,.jw-flag-small-player .jw-modal{bottom:0;right:0;height:100%;width:100%;max-height:none;max-width:none;z-index:2}.jwplayer .jw-rightclick{display:none;position:absolute;white-space:nowrap}.jwplayer .jw-rightclick.jw-open{display:block}.jwplayer .jw-rightclick .jw-rightclick-list{border-radius:1px;list-style:none;margin:0;padding:0}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item{background-color:rgba(0,0,0,0.8);border-bottom:1px solid #444;margin:0}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item .jw-rightclick-logo{color:#fff;display:inline-flex;padding:0 10px 0 0;vertical-align:middle}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item .jw-rightclick-logo .jw-svg-icon{height:20px;width:20px}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item .jw-rightclick-link{border:none;color:#fff;display:block;font-size:11px;font-weight:400;line-height:1em;padding:15px 23px;text-align:start;text-decoration:none;width:100%}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item:last-child{border-bottom:none}.jwplayer .jw-rightclick .jw-rightclick-list .jw-rightclick-item:hover{cursor:pointer}.jwplayer .jw-rightclick .jw-rightclick-list .jw-featured{vertical-align:middle}.jwplayer .jw-rightclick .jw-rightclick-list .jw-featured .jw-rightclick-link{color:#fff}.jwplayer .jw-rightclick .jw-rightclick-list .jw-featured .jw-rightclick-link span{color:#fff;font-size:12px}.jwplayer .jw-rightclick .jw-info-overlay-item,.jwplayer .jw-rightclick .jw-pip-item,.jwplayer .jw-rightclick .jw-share-item,.jwplayer .jw-rightclick .jw-shortcuts-item{border:none;background-color:transparent;outline:none;cursor:pointer}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;pointer-events:auto;transition-delay:0s}.jw-icon-tooltip.jw-open .jw-overlay:focus{outline:none}.jw-icon-tooltip.jw-open .jw-overlay:focus.jw-tab-focus{outline:solid 2px #4d90fe}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-slider-time .jw-icon-tooltip.jw-open .jw-overlay{pointer-events:none}.jw-volume-tip{padding:13px 0 26px}.jw-time-tip,.jw-controlbar .jw-tooltip,.jw-settings-menu .jw-tooltip{height:auto;width:100%;box-shadow:0 0 10px rgba(0,0,0,0.4);color:#fff;display:block;margin:0 0 14px;pointer-events:none;position:relative;z-index:0}.jw-time-tip::after,.jw-controlbar .jw-tooltip::after,.jw-settings-menu .jw-tooltip::after{top:100%;position:absolute;left:50%;height:14px;width:14px;border-radius:1px;background-color:currentColor;-webkit-transform-origin:75% 50%;transform-origin:75% 50%;-webkit-transform:translate(-50%, -50%) rotate(45deg);transform:translate(-50%, -50%) rotate(45deg);z-index:-1}.jw-time-tip .jw-text,.jw-controlbar .jw-tooltip .jw-text,.jw-settings-menu .jw-tooltip .jw-text{background-color:#fff;border-radius:1px;color:#000;font-size:10px;height:auto;line-height:1;padding:7px 10px;display:inline-block;min-width:100%;vertical-align:middle;min-height:2.4em}.jw-controlbar .jw-overlay{position:absolute;bottom:100%;left:50%;margin:0;min-height:44px;min-width:44px;opacity:0;pointer-events:none;transition:150ms cubic-bezier(0, .25, .25, 1);transition-property:opacity, visibility;transition-delay:0s, 150ms;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0);width:100%;z-index:1}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;padding:0 .5em;font-size:.8em;margin:0}.jw-controlbar .jw-option::before{padding-right:.125em}.jw-controlbar .jw-tooltip,.jw-settings-menu .jw-tooltip{position:absolute;bottom:100%;left:50%;opacity:0;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0);transition:100ms 0s cubic-bezier(0, .25, .25, 1);transition-property:opacity, visibility, -webkit-transform;transition-property:opacity, transform, visibility;transition-property:opacity, transform, visibility, -webkit-transform;visibility:hidden;white-space:nowrap;width:auto;z-index:1}.jw-controlbar .jw-tooltip.jw-open,.jw-settings-menu .jw-tooltip.jw-open{opacity:1;-webkit-transform:translate(-50%, -10px);transform:translate(-50%, -10px);transition-duration:150ms;transition-delay:500ms,0s,500ms;visibility:visible}.jw-controlbar .jw-tooltip.jw-tooltip-fullscreen,.jw-settings-menu .jw-tooltip.jw-tooltip-fullscreen{left:auto;right:0;-webkit-transform:translate(0, 0);transform:translate(0, 0)}.jw-controlbar .jw-tooltip.jw-tooltip-fullscreen.jw-open,.jw-settings-menu .jw-tooltip.jw-tooltip-fullscreen.jw-open{-webkit-transform:translate(0, -10px);transform:translate(0, -10px)}.jw-controlbar .jw-tooltip.jw-tooltip-fullscreen::after,.jw-settings-menu .jw-tooltip.jw-tooltip-fullscreen::after{left:auto;right:9px}.jw-tooltip-time{height:auto;width:0;bottom:100%;line-height:normal;padding:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jw-tooltip-time .jw-overlay{bottom:0;min-height:0;width:auto}.jw-tooltip{bottom:57px;display:none;position:absolute}.jw-tooltip .jw-text{height:100%;white-space:nowrap;text-overflow:ellipsis;direction:unset;max-width:246px;overflow:hidden}.jw-flag-audio-player .jw-tooltip{display:none}.jw-flag-small-player .jw-time-thumb{display:none}.jwplayer .jw-shortcuts-tooltip{top:50%;position:absolute;left:50%;background:#333;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);display:none;color:#fff;pointer-events:all;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;overflow:hidden;flex-direction:column;z-index:1}.jwplayer .jw-shortcuts-tooltip.jw-open{display:flex}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-close{flex:0 0 auto;margin:5px 5px 5px auto}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container{display:flex;flex:1 1 auto;flex-flow:column;font-size:12px;margin:0 20px 20px;overflow-y:auto;padding:5px}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container::-webkit-scrollbar{background-color:transparent;width:6px}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container::-webkit-scrollbar-thumb{background-color:#fff;border:1px solid #333;border-radius:6px}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-title{font-weight:bold}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-header{align-items:center;display:flex;justify-content:space-between;margin-bottom:10px}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-tooltip-list{display:flex;max-width:340px;margin:0 10px}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-tooltip-list .jw-shortcuts-tooltip-descriptions{width:100%}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-tooltip-list .jw-shortcuts-row{display:flex;align-items:center;justify-content:space-between;margin:10px 0;width:100%}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-tooltip-list .jw-shortcuts-row .jw-shortcuts-description{margin-right:10px;max-width:70%}.jwplayer .jw-shortcuts-tooltip .jw-shortcuts-container .jw-shortcuts-tooltip-list .jw-shortcuts-row .jw-shortcuts-key{background:#fefefe;color:#333;overflow:hidden;padding:7px 10px;text-overflow:ellipsis;white-space:nowrap}.jw-skip{color:rgba(255,255,255,0.8);cursor:default;position:absolute;display:flex;right:.75em;bottom:56px;padding:.5em;border:1px solid #333;background-color:#000;align-items:center;height:2em}.jw-skip.jw-tab-focus:focus{outline:solid 2px #4d90fe}.jw-skip.jw-skippable{cursor:pointer;padding:.25em .75em}.jw-skip.jw-skippable:hover{cursor:pointer;color:#fff}.jw-skip.jw-skippable .jw-skip-icon{display:inline;height:24px;width:24px;margin:0}.jw-breakpoint-7 .jw-skip{padding:1.35em 1em;bottom:130px}.jw-breakpoint-7 .jw-skip .jw-text{font-size:1em;font-weight:normal}.jw-breakpoint-7 .jw-skip .jw-icon-inline{height:30px;width:30px}.jw-breakpoint-7 .jw-skip .jw-icon-inline .jw-svg-icon{height:30px;width:30px}.jw-skip .jw-skip-icon{display:none;margin-left:-0.75em;padding:0 .5em;pointer-events:none}.jw-skip .jw-skip-icon .jw-svg-icon-next{display:block;padding:0}.jw-skip .jw-text,.jw-skip .jw-skip-icon{vertical-align:middle;font-size:.7em}.jw-skip .jw-text{font-weight:bold}.jw-cast{background-size:cover;display:none;height:100%;position:relative;width:100%}.jw-cast-container{background:linear-gradient(180deg, rgba(25,25,25,0.75), rgba(25,25,25,0.25), rgba(25,25,25,0));left:0;padding:20px 20px 80px;position:absolute;top:0;width:100%}.jw-cast-text{color:#fff;font-size:1.6em}.jw-breakpoint--1 .jw-cast-text,.jw-breakpoint-0 .jw-cast-text{font-size:1.15em}.jw-breakpoint-1 .jw-cast-text,.jw-breakpoint-2 .jw-cast-text,.jw-breakpoint-3 .jw-cast-text{font-size:1.3em}.jw-nextup-container{position:absolute;bottom:66px;left:0;background-color:transparent;cursor:pointer;margin:0 auto;padding:12px;pointer-events:none;right:0;text-align:right;visibility:hidden;width:100%}.jw-settings-open .jw-nextup-container,.jw-info-open .jw-nextup-container{display:none}.jw-breakpoint-7 .jw-nextup-container{padding:60px}.jw-flag-small-player .jw-nextup-container{padding:0 12px 0 0}.jw-flag-small-player .jw-nextup-container .jw-nextup-title,.jw-flag-small-player .jw-nextup-container .jw-nextup-duration,.jw-flag-small-player .jw-nextup-container .jw-nextup-close{display:none}.jw-flag-small-player .jw-nextup-container .jw-nextup-tooltip{height:30px}.jw-flag-small-player .jw-nextup-container .jw-nextup-header{font-size:12px}.jw-flag-small-player .jw-nextup-container .jw-nextup-body{justify-content:center;align-items:center;padding:.75em .3em}.jw-flag-small-player .jw-nextup-container .jw-nextup-thumbnail{width:50%}.jw-flag-small-player .jw-nextup-container .jw-nextup{max-width:65px}.jw-flag-small-player .jw-nextup-container .jw-nextup.jw-nextup-thumbnail-visible{max-width:120px}.jw-nextup{background:#333;border-radius:0;box-shadow:0 0 10px rgba(0,0,0,0.5);color:rgba(255,255,255,0.8);display:inline-block;max-width:280px;overflow:hidden;opacity:0;position:relative;width:64%;pointer-events:all;-webkit-transform:translate(0, -5px);transform:translate(0, -5px);transition:150ms cubic-bezier(0, .25, .25, 1);transition-property:opacity, -webkit-transform;transition-property:opacity, transform;transition-property:opacity, transform, -webkit-transform;transition-delay:0s}.jw-nextup:hover .jw-nextup-tooltip{color:#fff}.jw-nextup.jw-nextup-thumbnail-visible{max-width:400px}.jw-nextup.jw-nextup-thumbnail-visible .jw-nextup-thumbnail{display:block}.jw-nextup-container-visible{visibility:visible}.jw-nextup-container-visible .jw-nextup{opacity:1;-webkit-transform:translate(0, 0);transform:translate(0, 0);transition-delay:0s, 0s, 150ms}.jw-nextup-tooltip{display:flex;height:80px}.jw-nextup-thumbnail{width:120px;background-position:center;background-size:cover;flex:0 0 auto;display:none}.jw-nextup-body{flex:1 1 auto;overflow:hidden;padding:.75em .875em;display:flex;flex-flow:column wrap;justify-content:space-between}.jw-nextup-header,.jw-nextup-title{font-size:14px;line-height:1.35}.jw-nextup-header{font-weight:bold}.jw-nextup-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.jw-nextup-duration{align-self:flex-end;text-align:right;font-size:12px}.jw-nextup-close{height:24px;width:24px;border:none;color:rgba(255,255,255,0.8);cursor:pointer;margin:6px;visibility:hidden}.jw-nextup-close:hover{color:#fff}.jw-nextup-sticky .jw-nextup-close{visibility:visible}.jw-autostart-mute{position:absolute;bottom:0;right:12px;height:44px;width:44px;background-color:rgba(33,33,33,0.4);padding:5px 4px 5px 6px;display:none}.jwplayer.jw-flag-autostart:not(.jw-flag-media-audio) .jw-nextup{display:none}.jw-settings-menu{position:absolute;bottom:57px;right:12px;align-items:flex-start;background-color:#333;display:none;flex-flow:column nowrap;max-width:284px;pointer-events:auto}.jw-settings-open .jw-settings-menu{display:flex}.jw-breakpoint-7 .jw-settings-menu{bottom:130px;right:60px;max-height:none;max-width:none;height:35%;width:25%}.jw-breakpoint-7 .jw-settings-menu .jw-settings-topbar:not(.jw-nested-menu-open) .jw-icon-inline{height:60px;width:60px}.jw-breakpoint-7 .jw-settings-menu .jw-settings-topbar:not(.jw-nested-menu-open) .jw-icon-inline .jw-svg-icon{height:30px;width:30px}.jw-breakpoint-7 .jw-settings-menu .jw-settings-topbar:not(.jw-nested-menu-open) .jw-icon-inline .jw-tooltip .jw-text{font-size:1em}.jw-breakpoint-7 .jw-settings-menu .jw-settings-back{min-width:60px}.jw-breakpoint-6 .jw-settings-menu,.jw-breakpoint-5 .jw-settings-menu{height:232px;width:284px;max-height:232px}.jw-breakpoint-4 .jw-settings-menu,.jw-breakpoint-3 .jw-settings-menu{height:192px;width:284px;max-height:192px}.jw-breakpoint-2 .jw-settings-menu{height:179px;width:284px;max-height:179px}.jw-flag-small-player .jw-settings-menu{max-width:none}.jw-settings-menu .jw-icon.jw-button-color::after{height:100%;width:24px;box-shadow:inset 0 -3px 0 -1px currentColor;margin:auto;opacity:0;transition:opacity 150ms cubic-bezier(0, .25, .25, 1)}.jw-settings-menu .jw-icon.jw-button-color[aria-expanded="true"]::after{opacity:1}.jw-settings-menu .jw-settings-reset{text-decoration:underline}.jw-settings-topbar{align-items:center;background-color:rgba(0,0,0,0.4);display:flex;flex:0 0 auto;padding:3px 5px 0;width:100%}.jw-settings-topbar.jw-nested-menu-open{padding:0}.jw-settings-topbar.jw-nested-menu-open .jw-icon:not(.jw-settings-close):not(.jw-settings-back){display:none}.jw-settings-topbar.jw-nested-menu-open .jw-svg-icon-close{width:20px}.jw-settings-topbar.jw-nested-menu-open .jw-svg-icon-arrow-left{height:12px}.jw-settings-topbar.jw-nested-menu-open .jw-settings-topbar-text{display:block;outline:none}.jw-settings-topbar .jw-settings-back{min-width:44px}.jw-settings-topbar .jw-settings-topbar-buttons{display:inherit;width:100%;height:100%}.jw-settings-topbar .jw-settings-topbar-text{display:none;color:#fff;font-size:13px;width:100%}.jw-settings-topbar .jw-settings-close{margin-left:auto}.jw-settings-submenu{display:none;flex:1 1 auto;overflow-y:auto;padding:8px 20px 0 5px}.jw-settings-submenu::-webkit-scrollbar{background-color:transparent;width:6px}.jw-settings-submenu::-webkit-scrollbar-thumb{background-color:#fff;border:1px solid #333;border-radius:6px}.jw-settings-submenu.jw-settings-submenu-active{display:block}.jw-settings-submenu .jw-submenu-topbar{box-shadow:0 2px 9px 0 #1d1d1d;background-color:#2f2d2d;margin:-8px -20px 0 -5px}.jw-settings-submenu .jw-submenu-topbar .jw-settings-content-item{cursor:pointer;text-align:right;padding-right:15px;text-decoration:underline}.jw-settings-submenu .jw-settings-value-wrapper{float:right;display:flex;align-items:center}.jw-settings-submenu .jw-settings-value-wrapper .jw-settings-content-item-arrow{display:flex}.jw-settings-submenu .jw-settings-value-wrapper .jw-svg-icon-arrow-right{width:8px;margin-left:5px;height:12px}.jw-breakpoint-7 .jw-settings-submenu .jw-settings-content-item{font-size:1em;padding:11px 15px 11px 30px}.jw-breakpoint-7 .jw-settings-submenu .jw-settings-content-item .jw-settings-item-active::before{justify-content:flex-end}.jw-breakpoint-7 .jw-settings-submenu .jw-settings-content-item .jw-auto-label{font-size:.85em;padding-left:10px}.jw-flag-touch .jw-settings-submenu{overflow-y:scroll;-webkit-overflow-scrolling:touch}.jw-auto-label{font-size:10px;font-weight:initial;opacity:.75;padding-left:5px}.jw-settings-content-item{position:relative;color:rgba(255,255,255,0.8);cursor:pointer;font-size:12px;line-height:1;padding:7px 0 7px 15px;width:100%;text-align:left;outline:none}.jw-settings-content-item:hover{color:#fff}.jw-settings-content-item:focus{font-weight:bold}.jw-flag-small-player .jw-settings-content-item{line-height:1.75}.jw-settings-content-item.jw-tab-focus:focus{border:solid 2px #4d90fe}.jw-settings-item-active{font-weight:bold;position:relative}.jw-settings-item-active::before{height:100%;width:1em;align-items:center;content:"\\2022";display:inline-flex;justify-content:center}.jw-breakpoint-2 .jw-settings-open .jw-display-container,.jw-flag-small-player .jw-settings-open .jw-display-container,.jw-flag-touch .jw-settings-open .jw-display-container{display:none}.jw-breakpoint-2 .jw-settings-open.jw-controls,.jw-flag-small-player .jw-settings-open.jw-controls,.jw-flag-touch .jw-settings-open.jw-controls{z-index:1}.jw-flag-small-player .jw-settings-open .jw-controlbar{display:none}.jw-settings-open .jw-icon-settings::after{opacity:1}.jw-settings-open .jw-tooltip-settings{display:none}.jw-sharing-link{cursor:pointer}.jw-shortcuts-container .jw-switch{position:relative;display:flex;align-items:center;transition:ease-out .15s;transition-property:opacity, background;border-radius:18px;width:80px;height:20px;padding:10px;background:rgba(80,80,80,0.8);cursor:pointer;font-size:inherit;vertical-align:middle;outline:none}.jw-shortcuts-container .jw-switch.jw-tab-focus{border:solid 2px #4d90fe}.jw-shortcuts-container .jw-switch .jw-switch-knob{position:absolute;left:1px;transition:ease-out .15s;box-shadow:0 0 10px rgba(0,0,0,0.4);border-radius:13px;width:15px;height:15px;background:#fefefe}.jw-shortcuts-container .jw-switch .jw-switch-disabled,.jw-shortcuts-container .jw-switch .jw-switch-enabled{position:absolute;transition:inherit;color:#fefefe}.jw-shortcuts-container .jw-switch .jw-switch-disabled{right:8px}.jw-shortcuts-container .jw-switch .jw-switch-enabled{left:8px;opacity:0}.jw-shortcuts-container .jw-switch[aria-checked="true"]{background:#475470}.jw-shortcuts-container .jw-switch[aria-checked="true"] .jw-switch-disabled{opacity:0}.jw-shortcuts-container .jw-switch[aria-checked="true"] .jw-switch-enabled{opacity:1}.jw-shortcuts-container .jw-switch[aria-checked="true"] .jw-switch-knob{left:60px}.jw-idle-icon-text{display:none;line-height:1;position:absolute;text-align:center;text-indent:.35em;top:100%;white-space:nowrap;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.jw-idle-label{border-radius:50%;color:#fff;-webkit-filter:drop-shadow(1px 1px 5px rgba(12,26,71,0.25));filter:drop-shadow(1px 1px 5px rgba(12,26,71,0.25));font:normal 16px/1 Arial,Helvetica,sans-serif;position:relative;transition:background-color 150ms cubic-bezier(0, .25, .25, 1);transition-property:background-color,-webkit-filter;transition-property:background-color,filter;transition-property:background-color,filter,-webkit-filter;-webkit-font-smoothing:antialiased}.jw-state-idle .jw-icon-display.jw-idle-label .jw-idle-icon-text{display:block}.jw-state-idle .jw-icon-display.jw-idle-label .jw-svg-icon-play{-webkit-transform:scale(.7, .7);transform:scale(.7, .7)}.jw-breakpoint-0.jw-state-idle .jw-icon-display.jw-idle-label,.jw-breakpoint--1.jw-state-idle .jw-icon-display.jw-idle-label{font-size:12px}.jw-info-overlay{top:50%;position:absolute;left:50%;background:#333;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);display:none;color:#fff;pointer-events:all;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;overflow:hidden;flex-direction:column}.jw-info-overlay .jw-info-close{flex:0 0 auto;margin:5px 5px 5px auto}.jw-info-open .jw-info-overlay{display:flex}.jw-info-container{display:flex;flex:1 1 auto;flex-flow:column;margin:0 20px 20px;overflow-y:auto;padding:5px}.jw-info-container [class*="jw-info"]:not(:first-of-type){color:rgba(255,255,255,0.8);padding-top:10px;font-size:12px}.jw-info-container .jw-info-description{margin-bottom:30px;text-align:start}.jw-info-container .jw-info-description:empty{display:none}.jw-info-container .jw-info-duration{text-align:start}.jw-info-container .jw-info-title{text-align:start;font-size:12px;font-weight:bold}.jw-info-container::-webkit-scrollbar{background-color:transparent;width:6px}.jw-info-container::-webkit-scrollbar-thumb{background-color:#fff;border:1px solid #333;border-radius:6px}.jw-info-clientid{align-self:flex-end;font-size:12px;color:rgba(255,255,255,0.8);margin:0 20px 20px 44px;text-align:right}.jw-flag-touch .jw-info-open .jw-display-container{display:none}@supports ((-webkit-filter: drop-shadow(0 0 3px #000)) or (filter: drop-shadow(0 0 3px #000))){.jwplayer.jw-ab-drop-shadow .jw-controls .jw-svg-icon,.jwplayer.jw-ab-drop-shadow .jw-controls .jw-icon.jw-text,.jwplayer.jw-ab-drop-shadow .jw-slider-container .jw-rail,.jwplayer.jw-ab-drop-shadow .jw-title{text-shadow:none;box-shadow:none;-webkit-filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3))}.jwplayer.jw-ab-drop-shadow .jw-button-color{opacity:.8;transition-property:color, opacity}.jwplayer.jw-ab-drop-shadow .jw-button-color:not(:hover){color:#fff;opacity:.8}.jwplayer.jw-ab-drop-shadow .jw-button-color:hover{opacity:1}.jwplayer.jw-ab-drop-shadow .jw-controls-backdrop{background-image:linear-gradient(to bottom, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.00787) 10.79%, hsla(0, 0%, 0%, 0.02963) 21.99%, hsla(0, 0%, 0%, 0.0625) 33.34%, hsla(0, 0%, 0%, 0.1037) 44.59%, hsla(0, 0%, 0%, 0.15046) 55.48%, hsla(0, 0%, 0%, 0.2) 65.75%, hsla(0, 0%, 0%, 0.24954) 75.14%, hsla(0, 0%, 0%, 0.2963) 83.41%, hsla(0, 0%, 0%, 0.3375) 90.28%, hsla(0, 0%, 0%, 0.37037) 95.51%, hsla(0, 0%, 0%, 0.39213) 98.83%, hsla(0, 0%, 0%, 0.4));mix-blend-mode:multiply;transition-property:opacity}.jw-state-idle.jwplayer.jw-ab-drop-shadow .jw-controls-backdrop{background-image:linear-gradient(to bottom, hsla(0, 0%, 0%, 0.2), hsla(0, 0%, 0%, 0.19606) 1.17%, hsla(0, 0%, 0%, 0.18519) 4.49%, hsla(0, 0%, 0%, 0.16875) 9.72%, hsla(0, 0%, 0%, 0.14815) 16.59%, hsla(0, 0%, 0%, 0.12477) 24.86%, hsla(0, 0%, 0%, 0.1) 34.25%, hsla(0, 0%, 0%, 0.07523) 44.52%, hsla(0, 0%, 0%, 0.05185) 55.41%, hsla(0, 0%, 0%, 0.03125) 66.66%, hsla(0, 0%, 0%, 0.01481) 78.01%, hsla(0, 0%, 0%, 0.00394) 89.21%, hsla(0, 0%, 0%, 0));background-size:100% 7rem;background-position:50% 0}.jwplayer.jw-ab-drop-shadow.jw-state-idle .jw-controls{background-color:transparent}}.jw-video-thumbnail-container{position:relative;overflow:hidden}.jw-video-thumbnail-container:not(.jw-related-shelf-item-image){height:100%;width:100%}.jw-video-thumbnail-container.jw-video-thumbnail-generated{position:absolute;top:0;left:0}.jw-video-thumbnail-container:hover,.jw-related-item-content:hover .jw-video-thumbnail-container,.jw-related-shelf-item:hover .jw-video-thumbnail-container{cursor:pointer}.jw-video-thumbnail-container:hover .jw-video-thumbnail:not(.jw-video-thumbnail-completed),.jw-related-item-content:hover .jw-video-thumbnail-container .jw-video-thumbnail:not(.jw-video-thumbnail-completed),.jw-related-shelf-item:hover .jw-video-thumbnail-container .jw-video-thumbnail:not(.jw-video-thumbnail-completed){opacity:1}.jw-video-thumbnail-container .jw-video-thumbnail{position:absolute;top:50%;left:50%;bottom:unset;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:100%;height:auto;min-width:100%;min-height:100%;opacity:0;transition:opacity .3s ease;object-fit:cover;background:#000}.jw-related-item-next-up .jw-video-thumbnail-container .jw-video-thumbnail{height:100%;width:auto}.jw-video-thumbnail-container .jw-video-thumbnail.jw-video-thumbnail-visible:not(.jw-video-thumbnail-completed){opacity:1}.jw-video-thumbnail-container .jw-video-thumbnail.jw-video-thumbnail-completed{opacity:0}.jw-video-thumbnail-container .jw-video-thumbnail~.jw-svg-icon-play{display:none}.jw-video-thumbnail-container .jw-video-thumbnail+.jw-related-shelf-item-aspect{pointer-events:none}.jw-video-thumbnail-container .jw-video-thumbnail+.jw-related-item-poster-content{pointer-events:none}.jw-preview{overflow:hidden}.jw-preview .jw-ab-zoom-thumbnail{all:inherit;-webkit-animation:jw-ab-zoom-thumbnail-animation 10s infinite;animation:jw-ab-zoom-thumbnail-animation 10s infinite}@-webkit-keyframes jw-ab-zoom-thumbnail-animation{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}50%{-webkit-transform:scale(1.25, 1.25);transform:scale(1.25, 1.25)}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}}@keyframes jw-ab-zoom-thumbnail-animation{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}50%{-webkit-transform:scale(1.25, 1.25);transform:scale(1.25, 1.25)}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}}.jw-state-idle:not(.jw-flag-cast-available) .jw-display{padding:0}.jw-state-idle .jw-controls{background:rgba(0,0,0,0.4)}.jw-state-idle.jw-flag-cast-available:not(.jw-flag-audio-player) .jw-controlbar .jw-slider-time,.jw-state-idle.jw-flag-cardboard-available .jw-controlbar .jw-slider-time,.jw-state-idle.jw-flag-cast-available:not(.jw-flag-audio-player) .jw-controlbar .jw-icon:not(.jw-icon-cardboard):not(.jw-icon-cast):not(.jw-icon-airplay),.jw-state-idle.jw-flag-cardboard-available .jw-controlbar .jw-icon:not(.jw-icon-cardboard):not(.jw-icon-cast):not(.jw-icon-airplay){display:none}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-icon:focus{border:none}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer{-webkit-animation:jw-spin 2s linear infinite;animation:jw-spin 2s linear infinite;display:block}@-webkit-keyframes jw-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes jw-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.jwplayer.jw-state-buffering .jw-icon-playback .jw-svg-icon-play{display:none}.jwplayer.jw-state-buffering .jw-icon-display .jw-svg-icon-pause{display:none}.jwplayer.jw-state-playing .jw-display .jw-icon-display .jw-svg-icon-play,.jwplayer.jw-state-playing .jw-icon-playback .jw-svg-icon-play{display:none}.jwplayer.jw-state-playing .jw-display .jw-icon-display .jw-svg-icon-pause,.jwplayer.jw-state-playing .jw-icon-playback .jw-svg-icon-pause{display:block}.jwplayer.jw-state-playing.jw-flag-user-inactive:not(.jw-flag-audio-player):not(.jw-flag-casting):not(.jw-flag-media-audio) .jw-controls-backdrop{opacity:0}.jwplayer.jw-state-playing.jw-flag-user-inactive:not(.jw-flag-audio-player):not(.jw-flag-casting):not(.jw-flag-media-audio) .jw-logo-bottom-left,.jwplayer.jw-state-playing.jw-flag-user-inactive:not(.jw-flag-audio-player):not(.jw-flag-casting):not(.jw-flag-media-audio):not(.jw-flag-autostart) .jw-logo-bottom-right{bottom:0}.jwplayer .jw-icon-playback .jw-svg-icon-stop{display:none}.jwplayer.jw-state-paused .jw-svg-icon-pause,.jwplayer.jw-state-idle .jw-svg-icon-pause,.jwplayer.jw-state-error .jw-svg-icon-pause,.jwplayer.jw-state-complete .jw-svg-icon-pause{display:none}.jwplayer.jw-state-error .jw-icon-display .jw-svg-icon-play,.jwplayer.jw-state-complete .jw-icon-display .jw-svg-icon-play,.jwplayer.jw-state-buffering .jw-icon-display .jw-svg-icon-play{display:none}.jwplayer:not(.jw-state-buffering) .jw-svg-icon-buffer{display:none}.jwplayer:not(.jw-state-complete) .jw-svg-icon-replay{display:none}.jwplayer:not(.jw-state-error) .jw-svg-icon-error{display:none}.jwplayer.jw-state-complete .jw-display .jw-icon-display .jw-svg-icon-replay{display:block}.jwplayer.jw-state-complete .jw-display .jw-text{display:none}.jwplayer.jw-state-complete .jw-controls{background:rgba(0,0,0,0.4);height:100%}.jw-state-idle .jw-icon-display .jw-svg-icon-pause,.jwplayer.jw-state-paused .jw-icon-playback .jw-svg-icon-pause,.jwplayer.jw-state-paused .jw-icon-display .jw-svg-icon-pause,.jwplayer.jw-state-complete .jw-icon-playback .jw-svg-icon-pause{display:none}.jw-state-idle .jw-display-icon-rewind,.jwplayer.jw-state-buffering .jw-display-icon-rewind,.jwplayer.jw-state-complete .jw-display-icon-rewind,body .jw-error .jw-display-icon-rewind,body .jwplayer.jw-state-error .jw-display-icon-rewind,.jw-state-idle .jw-display-icon-next,.jwplayer.jw-state-buffering .jw-display-icon-next,.jwplayer.jw-state-complete .jw-display-icon-next,body .jw-error .jw-display-icon-next,body .jwplayer.jw-state-error .jw-display-icon-next{display:none}body .jw-error .jw-icon-display,body .jwplayer.jw-state-error .jw-icon-display{cursor:default}body .jw-error .jw-icon-display .jw-svg-icon-error,body .jwplayer.jw-state-error .jw-icon-display .jw-svg-icon-error{display:block}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-preview{display:none}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title{padding-top:4px}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title-primary{width:auto;display:inline-block;padding-right:.5ch}body .jwplayer.jw-state-error.jw-flag-audio-player .jw-title-secondary{width:auto;display:inline-block;padding-left:0}body .jwplayer.jw-state-error .jw-controlbar,.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-cast-available):not(.jw-flag-cardboard-available) .jw-controlbar{display:none}body .jwplayer.jw-state-error .jw-settings-menu,.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-cast-available):not(.jw-flag-cardboard-available) .jw-settings-menu{height:100%;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}body .jwplayer.jw-state-error .jw-display,.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-cast-available):not(.jw-flag-cardboard-available) .jw-display{padding:0}body .jwplayer.jw-state-error .jw-logo-bottom-left,.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-cast-available):not(.jw-flag-cardboard-available) .jw-logo-bottom-left,body .jwplayer.jw-state-error .jw-logo-bottom-right,.jwplayer.jw-state-idle:not(.jw-flag-audio-player):not(.jw-flag-cast-available):not(.jw-flag-cardboard-available) .jw-logo-bottom-right{bottom:0}.jwplayer.jw-state-playing.jw-flag-user-inactive .jw-display{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-state-playing:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting) .jw-display,.jwplayer.jw-state-paused:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting):not(.jw-flag-play-rejected) .jw-display{display:none}.jwplayer.jw-state-paused.jw-flag-play-rejected:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting) .jw-display-icon-rewind,.jwplayer.jw-state-paused.jw-flag-play-rejected:not(.jw-flag-touch):not(.jw-flag-small-player):not(.jw-flag-casting) .jw-display-icon-next{display:none}.jwplayer.jw-state-buffering .jw-display-icon-display .jw-text,.jwplayer.jw-state-complete .jw-display .jw-text{display:none}.jwplayer.jw-flag-casting:not(.jw-flag-audio-player) .jw-cast{display:block}.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-display-icon-container{display:none}.jwplayer.jw-flag-casting .jw-icon-hd,.jwplayer.jw-flag-casting .jw-captions,.jwplayer.jw-flag-casting .jw-icon-fullscreen,.jwplayer.jw-flag-casting .jw-icon-audio-tracks{display:none}.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-icon-volume{display:none}.jwplayer.jw-flag-casting.jw-flag-airplay-casting .jw-icon-airplay{color:#fff}.jw-state-playing.jw-flag-casting:not(.jw-flag-audio-player) .jw-display,.jw-state-paused.jw-flag-casting:not(.jw-flag-audio-player) .jw-display{display:flex}.jwplayer.jw-flag-cast-available .jw-icon-cast,.jwplayer.jw-flag-cast-available .jw-icon-airplay{display:flex}.jwplayer.jw-flag-cardboard-available .jw-icon-cardboard{display:flex}.jwplayer.jw-flag-live .jw-display-icon-rewind{visibility:hidden}.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-text-countdown,.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:flex}.jwplayer.jw-flag-live .jw-controlbar .jw-overlay:after{display:none}.jwplayer.jw-flag-live .jw-nextup-container{bottom:44px}.jwplayer.jw-flag-live .jw-text-elapsed,.jwplayer.jw-flag-live .jw-text-duration{display:none}.jwplayer.jw-flag-live .jw-text-live{cursor:default}.jwplayer.jw-flag-live .jw-text-live:hover{color:rgba(255,255,255,0.8)}.jwplayer.jw-flag-live.jw-state-playing .jw-icon-playback .jw-svg-icon-stop,.jwplayer.jw-flag-live.jw-state-buffering .jw-icon-playback .jw-svg-icon-stop{display:block}.jwplayer.jw-flag-live.jw-state-playing .jw-icon-playback .jw-svg-icon-pause,.jwplayer.jw-flag-live.jw-state-buffering .jw-icon-playback .jw-svg-icon-pause{display:none}.jw-text-live{height:24px;width:auto;align-items:center;border-radius:1px;color:rgba(255,255,255,0.8);display:flex;font-size:12px;font-weight:bold;margin-right:10px;padding:0 1ch;text-rendering:geometricPrecision;text-transform:uppercase;transition:150ms cubic-bezier(0, .25, .25, 1);transition-property:box-shadow,color}.jw-text-live::before{height:8px;width:8px;background-color:currentColor;border-radius:50%;margin-right:6px;opacity:1;transition:opacity 150ms cubic-bezier(0, .25, .25, 1)}.jw-text-live.jw-dvr-live{box-shadow:inset 0 0 0 2px currentColor}.jw-text-live.jw-dvr-live::before{opacity:.5}.jw-text-live.jw-dvr-live:hover{color:#fff}.jwplayer.jw-flag-controls-hidden .jw-logo.jw-hide{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-flag-controls-hidden:not(.jw-flag-casting) .jw-logo-top-right{top:0}.jwplayer.jw-flag-controls-hidden .jw-plugin{bottom:.5em}.jwplayer.jw-flag-controls-hidden:not(.jw-flag-touch.jw-breakpoint-4):not(.jw-flag-touch.jw-breakpoint-5):not(.jw-flag-touch.jw-breakpoint-6):not(.jw-flag-touch.jw-breakpoint-7) .jw-nextup-container{-webkit-transform:translateY(66px);transform:translateY(66px)}.jwplayer.jw-flag-controls-hidden.jw-flag-touch.jw-state-playing.jw-breakpoint-7 .jw-nextup-container,.jwplayer.jw-flag-controls-hidden.jw-flag-touch.jw-state-playing.jw-breakpoint-6 .jw-nextup-container,.jwplayer.jw-flag-controls-hidden.jw-flag-touch.jw-state-playing.jw-breakpoint-5 .jw-nextup-container,.jwplayer.jw-flag-controls-hidden.jw-flag-touch.jw-state-playing.jw-breakpoint-4 .jw-nextup-container{-webkit-transform:translateY(4.25em);transform:translateY(4.25em)}.jw-flag-controls-hidden .jw-controlbar,.jw-flag-controls-hidden .jw-display{visibility:hidden;pointer-events:none;opacity:0;transition-delay:0s, 250ms}.jw-flag-controls-hidden .jw-controls-backdrop{opacity:0}.jw-flag-controls-hidden .jw-logo{visibility:visible}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-logo.jw-hide{visibility:hidden;pointer-events:none;opacity:0}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing:not(.jw-flag-casting) .jw-logo-top-right{top:0}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing .jw-plugin{bottom:.5em}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing:not(.jw-flag-touch.jw-breakpoint-4):not(.jw-flag-touch.jw-breakpoint-5):not(.jw-flag-touch.jw-breakpoint-6):not(.jw-flag-touch.jw-breakpoint-7) .jw-nextup-container{-webkit-transform:translateY(66px);transform:translateY(66px)}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-touch.jw-state-playing.jw-breakpoint-7 .jw-nextup-container,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-touch.jw-state-playing.jw-breakpoint-6 .jw-nextup-container,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-touch.jw-state-playing.jw-breakpoint-5 .jw-nextup-container,.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-touch.jw-state-playing.jw-breakpoint-4 .jw-nextup-container{-webkit-transform:translateY(4.25em);transform:translateY(4.25em)}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing:not(.jw-flag-controls-hidden) .jw-media{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing.jw-flag-casting .jw-display{display:flex}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-state-playing:not(.jw-flag-ads) .jw-autostart-mute{display:flex}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-flag-casting .jw-nextup-container{bottom:66px}.jwplayer.jw-flag-user-inactive:not(.jw-flag-media-audio).jw-flag-casting.jw-state-idle .jw-nextup-container{display:none}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-preview,.jwplayer.jw-flag-ads .jw-logo,.jwplayer.jw-flag-ads .jw-captions.jw-captions-enabled,.jwplayer.jw-flag-ads .jw-nextup-container,.jwplayer.jw-flag-ads .jw-text-duration,.jwplayer.jw-flag-ads .jw-text-elapsed{display:none}.jwplayer.jw-flag-ads video::-webkit-media-text-track-container{display:none}.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-rewind,.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-next,.jwplayer.jw-flag-ads.jw-flag-small-player .jw-display-icon-display{display:none}.jwplayer.jw-flag-ads.jw-flag-small-player.jw-state-buffering .jw-display-icon-display{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar{flex-direction:column-reverse}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time{height:auto;padding:0;pointer-events:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-slider-container{height:5px}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-rail,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-knob,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-buffer,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-cue,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-icon-settings{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-time .jw-progress{-webkit-transform:none;transform:none;top:auto}.jwplayer.jw-flag-ads .jw-controlbar .jw-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip:not(.jw-icon-volume),.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline:not(.jw-icon-playback):not(.jw-icon-fullscreen):not(.jw-icon-volume){display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-volume-tip{padding:13px 0}.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:flex}.jwplayer.jw-flag-ads .jw-fullscreen-ima{display:none}.jwplayer.jw-flag-ads.jw-flag-ads.jw-state-playing.jw-flag-touch:not(.jw-flag-ads-vpaid) .jw-controls .jw-controlbar,.jwplayer.jw-flag-ads.jw-flag-ads.jw-state-playing.jw-flag-touch:not(.jw-flag-ads-vpaid).jw-flag-autostart .jw-controls .jw-controlbar{display:flex;pointer-events:all;visibility:visible;opacity:1}.jwplayer.jw-flag-ads.jw-flag-ads.jw-state-playing.jw-flag-touch:not(.jw-flag-ads-vpaid).jw-flag-user-inactive .jw-controls-backdrop,.jwplayer.jw-flag-ads.jw-flag-ads.jw-state-playing.jw-flag-touch:not(.jw-flag-ads-vpaid).jw-flag-autostart.jw-flag-user-inactive .jw-controls-backdrop{opacity:1;background-size:100% 60px}.jwplayer.jw-flag-ads-vpaid .jw-display-container,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-display-container,.jwplayer.jw-flag-ads-vpaid .jw-skip,.jwplayer.jw-flag-touch.jw-flag-ads-vpaid .jw-skip{display:none}.jwplayer.jw-flag-ads-vpaid.jw-flag-small-player .jw-controls{background:none}.jwplayer.jw-flag-ads-vpaid.jw-flag-small-player .jw-controls::after{content:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls-backdrop,.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none !important}.jw-flag-overlay-open-related .jw-controls,.jw-flag-overlay-open-related .jw-title,.jw-flag-overlay-open-related .jw-logo{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}.jw-flag-touch.jw-breakpoint-7 .jw-captions,.jw-flag-touch.jw-breakpoint-6 .jw-captions,.jw-flag-touch.jw-breakpoint-5 .jw-captions,.jw-flag-touch.jw-breakpoint-4 .jw-captions,.jw-flag-touch.jw-breakpoint-7 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-6 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-5 .jw-nextup-container,.jw-flag-touch.jw-breakpoint-4 .jw-nextup-container{bottom:4.25em}.jw-flag-touch .jw-controlbar .jw-icon-volume{display:flex}.jw-flag-touch .jw-display,.jw-flag-touch .jw-display-container,.jw-flag-touch .jw-display-controls{pointer-events:none}.jw-flag-touch.jw-state-paused:not(.jw-breakpoint-1) .jw-display-icon-next,.jw-flag-touch.jw-state-playing:not(.jw-breakpoint-1) .jw-display-icon-next,.jw-flag-touch.jw-state-paused:not(.jw-breakpoint-1) .jw-display-icon-rewind,.jw-flag-touch.jw-state-playing:not(.jw-breakpoint-1) .jw-display-icon-rewind{display:none}.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display{display:none}.jw-flag-audio-player{background-color:#000}.jw-flag-audio-player .jw-media{visibility:hidden}.jw-flag-audio-player .jw-title{background:none}.jw-flag-audio-player:not(.jw-flag-live) .jw-spacer{display:none}.jw-flag-audio-player .jw-preview,.jw-flag-audio-player .jw-display,.jw-flag-audio-player .jw-title,.jw-flag-audio-player .jw-nextup-container{display:none}.jw-flag-audio-player .jw-controlbar{position:relative}.jw-flag-audio-player .jw-controlbar .jw-button-container{padding-right:3px;padding-left:0;justify-content:flex-start}.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip,.jw-flag-audio-player .jw-controlbar .jw-icon-inline{display:none}.jw-flag-audio-player .jw-controlbar .jw-icon-volume,.jw-flag-audio-player .jw-controlbar .jw-icon-playback,.jw-flag-audio-player .jw-controlbar .jw-icon-next,.jw-flag-audio-player .jw-controlbar .jw-icon-rewind,.jw-flag-audio-player .jw-controlbar .jw-icon-cast,.jw-flag-audio-player .jw-controlbar .jw-text-live,.jw-flag-audio-player .jw-controlbar .jw-icon-airplay,.jw-flag-audio-player .jw-controlbar .jw-logo-button,.jw-flag-audio-player .jw-controlbar .jw-text-elapsed,.jw-flag-audio-player .jw-controlbar .jw-text-duration{display:flex;flex:0 0 auto}.jw-flag-audio-player .jw-controlbar .jw-text-duration,.jw-flag-audio-player .jw-controlbar .jw-text-countdown{padding-right:10px}.jw-flag-audio-player .jw-controlbar .jw-slider-time{flex:0 1 auto;align-items:center;display:flex;order:1}.jw-flag-audio-player .jw-controlbar .jw-icon-volume{margin-right:0;transition:margin-right 150ms cubic-bezier(0, .25, .25, 1)}.jw-flag-audio-player .jw-controlbar .jw-icon-volume .jw-overlay{display:none}.jw-flag-audio-player .jw-controlbar .jw-horizontal-volume-container~.jw-slider-time{transition:opacity 300ms,width 300ms}.jw-flag-audio-player .jw-controlbar .jw-horizontal-volume-container.jw-open~.jw-slider-time{flex:1 1 auto;width:auto}.jw-flag-audio-player .jw-controlbar .jw-slider-volume~.jw-icon-volume{margin-right:140px}.jw-flag-audio-player.jw-breakpoint-1 .jw-horizontal-volume-container.jw-open~.jw-slider-time,.jw-flag-audio-player.jw-breakpoint-2 .jw-horizontal-volume-container.jw-open~.jw-slider-time{opacity:0}.jw-flag-audio-player.jw-flag-small-player .jw-text-elapsed,.jw-flag-audio-player.jw-flag-small-player .jw-text-duration{display:none}.jw-flag-audio-player.jw-flag-ads .jw-slider-time{display:none}.jw-hidden{display:none}', ""])
}
, function(t, e) {
    !function() {
        if ("undefined" != typeof window && "undefined" != typeof document && "undefined" != typeof HTMLElement) {
            var t = !1;
            try {
                var e = document.createElement("div");
                e.addEventListener("focus", (function(t) {
                    t.preventDefault(),
                    t.stopPropagation()
                }
                ), !0),
                e.focus(Object.defineProperty({}, "preventScroll", {
                    get: function() {
                        t = !0
                    }
                }))
            } catch (t) {}
            if (void 0 === HTMLElement.prototype.nativeFocus && !t) {
                HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;
                var i = function(t) {
                    for (var e = 0; e < t.length; e++)
                        t[e][0].scrollTop = t[e][1],
                        t[e][0].scrollLeft = t[e][2];
                    t = []
                };
                HTMLElement.prototype.focus = function(t) {
                    if (t && t.preventScroll) {
                        var e = function(t) {
                            for (var e = t.parentNode, i = [], n = document.scrollingElement || document.documentElement; e && e !== n; )
                                (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && i.push([e, e.scrollTop, e.scrollLeft]),
                                e = e.parentNode;
                            return e = n,
                            i.push([e, e.scrollTop, e.scrollLeft]),
                            i
                        }(this);
                        this.nativeFocus(),
                        "function" == typeof setTimeout ? setTimeout((function() {
                            i(e)
                        }
                        ), 0) : i(e)
                    } else
                        this.nativeFocus()
                }
            }
        }
    }()
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M137.8,15H22.1A7.127,7.127,0,0,0,15,22.1V137.8a7.28,7.28,0,0,0,7.1,7.2H84.5V95H67.6V75.5H84.5v-15a23.637,23.637,0,0,1,21.3-25.9,28.08,28.08,0,0,1,4.1-.1c7.2,0,13.7.6,14.9.6V52.7H114.4c-8.5,0-9.7,3.9-9.7,9.7V74.7h19.5l-2.6,19.5H104.7v50.7h33.1a7.3,7.3,0,0,0,7.2-7.2V22A7.13,7.13,0,0,0,137.8,15Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M135.237,15.006H24.739A9.427,9.427,0,0,0,15,24.107V135.256a9.553,9.553,0,0,0,9.365,9.737h110.9a9.427,9.427,0,0,0,9.737-9.1V24.081A9.461,9.461,0,0,0,135.237,15.006Zm-81.9,110.512H34.476V63.774h19.5v61.744ZM43.576,55.31A10.994,10.994,0,0,1,32.513,44.45v-.2a11.05,11.05,0,0,1,22.1,0A10.537,10.537,0,0,1,44.6,55.283l-.051,0A4.07,4.07,0,0,1,43.576,55.31Zm81.9,70.208h-19.5v-29.9c0-7.164,0-16.265-9.737-16.265s-11.7,7.8-11.7,16.265v29.9h-19.5V63.774h18.2v8.464h0a19.766,19.766,0,0,1,18.2-9.738c19.5,0,23.4,13,23.4,29.266v33.8h.637Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-pinterest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M80,15A65.127,65.127,0,0,0,15,80a66.121,66.121,0,0,0,39,59.8,62.151,62.151,0,0,1,1.3-14.9c1.3-5.2,8.5-35.1,8.5-35.1a26.386,26.386,0,0,1-2-10.4c0-9.7,5.9-16.9,12.4-16.9,5.9,0,8.5,4.5,8.5,9.7a128.456,128.456,0,0,1-5.9,22.7,9.646,9.646,0,0,0,6.6,12,8.105,8.105,0,0,0,3.8.3c12.4,0,20.8-15.6,20.8-34.4,0-14.3-9.7-24.7-27.3-24.7a30.869,30.869,0,0,0-31.8,30v1.2a19.8,19.8,0,0,0,4.5,13,2.586,2.586,0,0,1,.6,3.3c0,1.3-1.3,3.9-1.3,5.2-.6,2-2,2-3.3,2-9.1-3.9-13-13.6-13-24.7,0-18.2,15.6-40.3,46.1-40.3a38.763,38.763,0,0,1,40.9,36.7v.4c0,25.4-14.3,44.9-35.1,44.9A18.163,18.163,0,0,1,72.7,112s-3.9,14.9-4.5,17.6a46.615,46.615,0,0,1-6.5,13.7,79.828,79.828,0,0,0,18.2,1.9A65.1,65.1,0,0,0,80,15Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-reddit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M136.7,60.7a18.265,18.265,0,0,0-11.6,4.1,83.108,83.108,0,0,0-40-11.5l8.1-25.1,21.1,4.7a14.927,14.927,0,1,0,14.9-16.2,15.418,15.418,0,0,0-13.6,8.1L90.5,18.7a3.75,3.75,0,0,0-4.7,2.7h0L77,52.6A93.15,93.15,0,0,0,34.2,64.1,19.471,19.471,0,0,0,23.3,60,19.137,19.137,0,0,0,5,78.3a19.777,19.777,0,0,0,7.5,14.9v4.1a38.88,38.88,0,0,0,20.4,31.9,85.678,85.678,0,0,0,46.8,12.2,93.7,93.7,0,0,0,46.8-12.2,38.741,38.741,0,0,0,20.4-31.9V93.2A18.324,18.324,0,0,0,155,78.3,18.952,18.952,0,0,0,136.7,60.7Zm-7.5-35.3a6.459,6.459,0,0,1,6.8,6v.8a6.744,6.744,0,0,1-6.8,6.8,6.459,6.459,0,0,1-6.8-6v-.8A7.312,7.312,0,0,1,129.2,25.4ZM47.1,89.2A10.2,10.2,0,1,1,57.3,99.4,10.514,10.514,0,0,1,47.1,89.2Zm57,29.8a31.975,31.975,0,0,1-24.4,7.5h0A34.711,34.711,0,0,1,55.3,119a3.821,3.821,0,1,1,5.2-5.6l.2.2a26.476,26.476,0,0,0,19,5.4h0a28.644,28.644,0,0,0,19-5.4,4,4,0,0,1,5.4,0c2,1.3,2,3.4,0,5.4Zm-2-19.7a10.2,10.2,0,1,1,10.2-10.2,10.514,10.514,0,0,1-10.2,10.2Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-tumblr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M115.3,131.6a30.935,30.935,0,0,1-22,7.3h-.7c-28,0-34.6-20.6-34.6-32.7v-34H46.7A2.9,2.9,0,0,1,44,69.5h0V54.2a6.2,6.2,0,0,1,2.7-4,30.359,30.359,0,0,0,20-27.3,3.574,3.574,0,0,1,3-4,1.7,1.7,0,0,1,1,0H87.4a2.9,2.9,0,0,1,2.7,2.7V48.3h19.3a3.18,3.18,0,0,1,2.7,2V69.6a2.9,2.9,0,0,1-2.7,2.7H90v31.3a8.709,8.709,0,0,0,7.4,9.9,5.7,5.7,0,0,0,1.3.1,58.63,58.63,0,0,0,7.3-1.3,4.953,4.953,0,0,1,2.7-.7c.7,0,1.3.7,2,2l5.3,15.3C115.3,129.6,116,130.3,115.3,131.6Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg class="jw-svg-icon jw-svg-icon-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" focusable="false"><path d="M56.8,132.5a75.177,75.177,0,0,0,75.3-75.1V54A53.405,53.405,0,0,0,145,40.5a58.075,58.075,0,0,1-15.4,3.9,27.138,27.138,0,0,0,11.6-14.8A53.038,53.038,0,0,1,124.5,36a25.736,25.736,0,0,0-19.3-8.4A26.12,26.12,0,0,0,78.8,53.4V54a16.5,16.5,0,0,0,.7,5.8,71.966,71.966,0,0,1-54.1-27,23.9,23.9,0,0,0-3.9,13.5A26.043,26.043,0,0,0,33.1,68.2,27.018,27.018,0,0,1,20.9,65v.7A26.15,26.15,0,0,0,42.1,91.4a24.149,24.149,0,0,1-7.1.7,12.625,12.625,0,0,1-5.1-.7,25.657,25.657,0,0,0,24.5,18A53.519,53.519,0,0,1,21.6,121a19.683,19.683,0,0,1-6.4-.7,80.388,80.388,0,0,0,41.6,12.2"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-email" viewBox="0 0 160 160" focusable="false"><path d="M147.3,27.9H11.9L10,29.8v97a3.02,3.02,0,0,0,2.8,3.2H146.6a3.02,3.02,0,0,0,3.2-2.8V31C150.5,29.2,149.2,27.9,147.3,27.9ZM125.6,40.7,80.3,77.1,35,40.7Zm12.1,76.6H22.8V47.7l57.5,46,57.5-46-.1,69.6Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-link" viewBox="0 0 160 160" focusable="false"><path d="M79.4,99.6H92.5v2a33.6,33.6,0,0,1-9.8,24.2l-9.8,9.8a34.716,34.716,0,0,1-48.4,0,34.716,34.716,0,0,1,0-48.4l9.2-10.5a33.6,33.6,0,0,1,24.2-9.8h1.9V80H58.5a19.359,19.359,0,0,0-15.1,6.5l-9.8,9.8a20.976,20.976,0,0,0-.5,29.6l.5.5a20.976,20.976,0,0,0,29.6.5l.5-.5,9.8-9.8a20.905,20.905,0,0,0,6.5-15h0v-2ZM135,24.4h0a34.716,34.716,0,0,0-48.4,0L76.1,34.2a33.6,33.6,0,0,0-9.8,24.2v2H79.4v-2a19.359,19.359,0,0,1,6.5-15.1l9.8-9.8a20.976,20.976,0,0,1,29.6-.5l.5.5a20.976,20.976,0,0,1,.5,29.6l-.5.5-10.5,9.8a20.905,20.905,0,0,1-15,6.5H99V93h1.3a33.6,33.6,0,0,0,24.2-9.8l9.8-9.8A34.89,34.89,0,0,0,135,24.4ZM63,106.2l42.5-42.5-9.8-9.8L53.2,96.4Z"></path></svg>'
}
, function(t, e) {
    t.exports = '<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-embed" viewBox="0 0 160 160" focusable="false"><path d="M153.224,81.594,126.971,54.685,117.6,64.061l21.846,21.846L117.6,107.752l8.719,8.719L152.567,90.22a5.583,5.583,0,0,0,1.406-7.782,6.067,6.067,0,0,0-.75-.844ZM33.12,54.685,6.868,80.938A5.973,5.973,0,0,0,6.68,89.47l.188.188L33.12,117.128l9.376-9.376-22.5-21.846L42.5,64.061ZM53.747,134.1,94.437,21.5,106.345,25.9,65.654,138.5Z"></path></svg>'
}
, function(t, e, i) {
    var n = i(143);
    "string" == typeof n && (n = [["all-players", n, ""]]),
    i(41).style(n, "all-players"),
    n.locals && (t.exports = n.locals)
}
, function(t, e, i) {
    (t.exports = i(76)(!1)).push([t.i, '.jw-settings-content-item .jw-svg-icon{margin-right:1em;height:16px;width:16px;padding:0}.jw-settings-content-item .jw-tooltip{bottom:12px;left:50px;width:60px}.jw-settings-content-item .jw-tooltip.jw-open{transition:none}.jw-sharing-link{display:flex;align-items:center;line-height:16px;text-transform:capitalize}.jw-sharing-link:hover,.jw-sharing-link:focus{text-decoration:none}.jw-sharing-copy:after{background-color:#fff;border-radius:50px;bottom:20px;color:#000;content:"Copied";display:block;font-size:13px;font-weight:bold;opacity:0;margin-left:-25px;left:50%;position:absolute;text-align:center;-webkit-transform:translateY(10px);transform:translateY(10px);transition:all 200ms ease-in-out;visibility:hidden;width:60px}.jw-sharing-copy-textarea-copied:after{opacity:1;-webkit-transform:translateY(0);transform:translateY(0);visibility:visible}.jw-sharing-copy .jw-sharing-link{padding:0}.jw-sharing-copy .jw-sharing-link:hover,.jw-sharing-copy .jw-sharing-link:focus{color:#fff}.jw-sharing-link:focus,.jw-sharing-copy:focus{outline:none}.jw-sharing-link:active,.jw-sharing-copy:active{color:#fff;font-weight:bold}.jw-sharing-textarea{display:flex;opacity:0;height:1px;cursor:pointer}', ""])
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, i) {
    var n = i(172);
    "string" == typeof n && (n = [["all-players", n, ""]]),
    i(41).style(n, "all-players"),
    n.locals && (t.exports = n.locals)
}
, function(t, e, i) {
    (t.exports = i(76)(!1)).push([t.i, "._stretch{height:100%;width:100%}.jw-tizen-app:not(.jw-state-buffering) .jw-display{display:none}.jw-tizen-app.jw-state-buffering .jw-tizen-controlbar{display:none}.jw-tizen-app.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer{-webkit-animation:none;animation:none}.jw-tizen-app.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer path{display:none}.jw-tizen-app.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer circle{fill:transparent;stroke:#fff;stroke-width:13;stroke-dasharray:471}.jw-tizen-app.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer .jw-tizen-buffer-draw{-webkit-animation:jw-draw 1.5s ease-in-out infinite;animation:jw-draw 1.5s ease-in-out infinite}.jw-tizen-app.jw-state-buffering .jw-display-icon-display .jw-icon .jw-svg-icon-buffer .jw-tizen-buffer-erase{-webkit-animation:jw-erase 1.5s ease-in-out infinite;animation:jw-erase 1.5s ease-in-out infinite}@-webkit-keyframes jw-draw{0%{stroke-dashoffset:0}50%,100%{stroke-dashoffset:471}}@keyframes jw-draw{0%{stroke-dashoffset:0}50%,100%{stroke-dashoffset:471}}@-webkit-keyframes jw-erase{0%,50%{stroke-dashoffset:-471}100%{stroke-dashoffset:0}}@keyframes jw-erase{0%,50%{stroke-dashoffset:-471}100%{stroke-dashoffset:0}}.jw-tizen-app.jw-state-paused.jw-flag-user-inactive:not(.jw-flag-seek) .jw-pause-display{display:initial}.jw-tizen-app.jw-flag-ads .jw-skip{justify-content:center;right:10%;height:2.5em;bottom:9.72%;background-color:transparent;border-color:#fff;border-width:medium;will-change:opacity;font-size:40px}.jw-tizen-app.jw-flag-ads .jw-skip:focus,.jw-tizen-app.jw-flag-ads .jw-skip.jw-active{box-shadow:0 0 .25em .38em rgba(255,255,255,0.3)}.jw-tizen-app.jw-flag-ads .jw-skip .jw-skip-icon{display:flex;justify-content:center;height:3.6em;width:3.6em}.jw-tizen-app.jw-flag-ads .jw-skip .jw-svg-icon{height:2em;width:2em}.jw-tizen-app.jw-flag-ads .jw-tizen-controlbar .jw-top-container{display:none}.jw-tizen-app.jw-flag-ads .jw-tizen-controlbar .jw-bottom-container .jw-slider-time{display:none}.jw-tizen-app.jw-flag-ads .jw-tizen-controlbar .jw-bottom-container .jw-text-alt{font-weight:normal}.jw-tizen-app .jw-svg-icon{height:75px;width:75px;-webkit-filter:drop-shadow(0 0 15px #fff);filter:drop-shadow(0 0 15px #fff)}.jw-tizen-app .jw-icon-back .jw-svg-icon{height:60px;width:60px}.jw-tizen-app .jw-icon{height:130px;width:130px;justify-content:center}.jw-tizen-app .jw-nextup-container{padding:8% 6.25%;font-size:50px}.jw-tizen-app .jw-nextup-container .jw-nextup{max-width:40.18%;background:rgba(0,0,0,0.3);box-shadow:none}.jw-tizen-app .jw-nextup-container .jw-nextup-tooltip{height:4em}.jw-tizen-app .jw-nextup-container .jw-nextup-thumbnail{width:44.44%}.jw-tizen-app .jw-nextup-container .jw-nextup-body{padding-left:5.93%}.jw-tizen-app .jw-nextup-container .jw-nextup-header{font-size:1em}.jw-tizen-app .jw-nextup-container .jw-nextup-title{font-size:.8em;font-weight:normal}.jw-tizen-app .jw-nextup-container .jw-nextup-close{display:none}.jw-tizen-app .jw-nextup-container .jw-nextup-duration{display:none}.jw-tizen-app .jw-tizen-controls{height:100%}.jw-tizen-app .jw-tizen-controls .jw-pause-display{height:100%;width:100%;position:absolute;background:rgba(0,0,0,0.4);z-index:2;display:none}.jw-tizen-app .jw-tizen-controls .jw-pause-display .jw-pause-display-container{position:absolute;bottom:0;left:0;padding:0 6.25% 15%;width:100%;font-size:80px}.jw-tizen-app .jw-tizen-controls .jw-pause-display .jw-pause-display-container .jw-pause-title{font-size:1em;font-weight:bold;width:90%;color:rgba(255,255,255,0.9);padding-bottom:1.85%}.jw-tizen-app .jw-tizen-controls .jw-pause-display .jw-pause-display-container .jw-pause-description{font-size:.5em;width:60%;color:rgba(255,255,255,0.8);font-weight:normal}.jw-tizen-app .jw-tizen-controls{will-change:opacity}.jw-tizen-app .jw-tizen-controlbar{align-items:center;justify-content:center;padding:6% 6.25%;height:100%;max-height:initial;font-size:40px}.jw-tizen-app .jw-tizen-controlbar .jw-button-container{display:none}.jw-tizen-app .jw-tizen-controlbar .jw-top-container{display:flex;flex-flow:row wrap;position:absolute;width:100%;border:none;border-radius:0;background-size:auto;box-shadow:none;left:0;top:0;padding:inherit}.jw-tizen-app .jw-tizen-controlbar .jw-bottom-container{display:flex;flex-flow:row wrap;position:absolute;width:100%;border:none;border-radius:0;background-size:auto;box-shadow:none;left:0;bottom:0;padding:inherit;align-items:center}.jw-tizen-app .jw-tizen-controlbar .jw-bottom-container.jw-hidden{display:none}.jw-tizen-app .jw-tizen-controlbar .jw-text{font-size:1em;font-weight:bold}.jw-tizen-app .jw-tizen-controlbar .jw-text-countdown{display:flex}.jw-tizen-app .jw-tizen-controlbar .jw-slider-time{height:initial;width:initial;flex-grow:1;padding:0}.jw-tizen-app .jw-tizen-controlbar .jw-slider-time .jw-slider-container{height:.38em}.jw-tizen-app .jw-tizen-controlbar .jw-active .jw-tooltip.jw-open{margin-top:15px}.jw-tizen-app .jw-tizen-controlbar .jw-tooltip{box-shadow:none;top:100%;visibility:hidden}.jw-tizen-app .jw-tizen-controlbar .jw-tooltip .jw-text{font-size:.75em;background-color:inherit;color:rgba(255,255,255,0.9);padding-top:.25em}.jw-tizen-app .jw-tizen-controlbar .jw-tooltip::after{content:initial}.jw-tizen-app .jw-tizen-controlbar .jw-tooltip.jw-open{transition-delay:0s;visibility:visible}.jw-tizen-app .jw-tizen-controlbar .jw-text-live{font-size:1em;width:auto}.jw-tizen-app .jw-tizen-controlbar .jw-text-live:before{height:.5em;width:.5em;margin-right:.38em}.jw-tizen-app .jw-controls-backdrop{background:linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.4) 100%)}.jw-tizen-app .jw-icon.jw-button-color:focus,.jw-tizen-app .jw-icon.jw-button-color.jw-active{border-radius:50%;background-color:rgba(255,255,255,0.2);color:#fff;border:none}.jw-tizen-app .jw-icon.jw-button-color:focus .jw-tooltip,.jw-tizen-app .jw-icon.jw-button-color.jw-active .jw-tooltip{visibility:visible;opacity:1}.jw-tizen-app video::-webkit-media-text-track-container{max-height:90%}.jw-tizen-app.jwplayer:not(.jw-flag-controls-hidden):not(.jw-state-playing) video::-webkit-media-text-track-container,.jw-tizen-app.jwplayer.jw-flag-media-audio.jw-state-playing video::-webkit-media-text-track-container,.jw-tizen-app.jwplayer.jw-state-playing:not(.jw-flag-user-inactive):not(.jw-flag-controls-hidden) video::-webkit-media-text-track-container{max-height:75%}.jw-flag-seek .jw-icon-back,.jw-flag-seek .jw-icon-settings,.jw-flag-seek .jw-icon-playback{visibility:hidden}.jw-flag-seek .jw-seekbar-thumbnails.jw-open{display:flex}.jw-seekbar-thumbnails{position:absolute;display:none;justify-content:center;width:100%;left:0;bottom:0;padding-bottom:12%}.jw-seekbar-thumbnails .jw-seekbar-thumb.jw-active{border:#fff;border-style:solid;border-width:thick}.jw-tooltip-time .jw-overlay{top:0;left:0}.jw-settings-menu-tizen{display:none;flex-direction:column;height:100%;position:absolute;margin-left:auto;width:38%;bottom:0;padding-top:0;background:rgba(0,0,0,0.8);z-index:1;color:#fff}.jw-settings-menu-tizen.jw-settings-open{display:flex}.jw-settings-menu-tizen.jw-settings-transition-close{-webkit-animation:jw-transition-out .3s ease forwards;animation:jw-transition-out .3s ease forwards}.jw-settings-menu-tizen.jw-settings-transition-open{-webkit-animation:jw-transition-in .3s ease forwards;animation:jw-transition-in .3s ease forwards}.jw-settings-menu-tizen .jw-settings-submenu-tizen{display:flex;flex-direction:column;padding-left:10%;padding-top:10%;padding-right:15%}.jw-settings-menu-tizen .jw-settings-item-active::before{font-size:1.333em}.jw-settings-menu-tizen .jw-settings-topbar-text{font-weight:bold}.jw-settings-menu-tizen .jw-settings-content-item,.jw-settings-menu-tizen .jw-settings-topbar-text,.jw-settings-menu-tizen .jw-settings-submenu-items{font-size:36px}.jw-settings-menu-tizen .jw-settings-content-item{font-weight:normal;padding:.29em 1.555em;margin-top:.417em}.jw-settings-menu-tizen .jw-settings-content-item:focus{border:solid .138em #fff;color:#fff;margin:-0.138em;background:#ffffff36;border-radius:.083em;margin-top:.279em}.jw-settings-menu-tizen .jw-settings-submenu-items{padding-top:.5em;font-size:36px}@-webkit-keyframes jw-transition-in{from{right:-100%}to{right:0}}@keyframes jw-transition-in{from{right:-100%}to{right:0}}@-webkit-keyframes jw-transition-out{from{right:0}to{right:-100%}}@keyframes jw-transition-out{from{right:0}to{right:-100%}}", ""])
}
])]);
