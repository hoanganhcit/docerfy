"use strict";
let isRtl = window.Helpers.isRtl(),
    isDarkStyle = window.Helpers.isDarkStyle(),
    menu,
    animate,
    isHorizontalLayout = !1;
document.getElementById("layout-menu") && (isHorizontalLayout = document.getElementById("layout-menu").classList.contains("menu-horizontal")),
    (function() {
        setTimeout(function() {
                window.Helpers.initCustomOptionCheck();
            }, 1e3),
            "undefined" != typeof Waves &&
            (Waves.init(),
                Waves.attach(".btn[class*='btn-']:not([class*='btn-outline-']):not([class*='btn-label-'])", ["waves-light"]),
                Waves.attach("[class*='btn-outline-']"),
                Waves.attach("[class*='btn-label-']"),
                Waves.attach(".pagination .page-item .page-link")),
            document.querySelectorAll("#layout-menu").forEach(function(e) {
                (menu = new Menu(e, {
                    orientation: isHorizontalLayout ? "horizontal" : "vertical",
                    closeChildren: !!isHorizontalLayout,
                    showDropdownOnHover: localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover") ?
                        "true" === localStorage.getItem("templateCustomizer-" + templateName + "--ShowDropdownOnHover") :
                        void 0 === window.templateCustomizer || window.templateCustomizer.settings.defaultShowDropdownOnHover,
                })),
                window.Helpers.scrollToActive((animate = !1)),
                    (window.Helpers.mainMenu = menu);
            }),
            document.querySelectorAll(".layout-menu-toggle").forEach((e) => {
                e.addEventListener("click", (e) => {
                    if ((e.preventDefault(), window.Helpers.toggleCollapsed(), config.enableMenuLocalStorage && !window.Helpers.isSmallScreen()))
                        try {
                            localStorage.setItem("templateCustomizer-" + templateName + "--LayoutCollapsed", String(window.Helpers.isCollapsed()));
                            var t,
                                a = document.querySelector(".template-customizer-layouts-options");
                            a && ((t = window.Helpers.isCollapsed() ? "collapsed" : "expanded"), a.querySelector(`input[value="${t}"]`).click());
                        } catch (e) {}
                });
            }),
            window.Helpers.swipeIn(".drag-target", function(e) {
                window.Helpers.setCollapsed(!1);
            }),
            window.Helpers.swipeOut("#layout-menu", function(e) {
                window.Helpers.isSmallScreen() && window.Helpers.setCollapsed(!0);
            });
        let e = document.getElementsByClassName("menu-inner"),
            t = document.getElementsByClassName("menu-inner-shadow")[0];
        0 < e.length &&
            t &&
            e[0].addEventListener("ps-scroll-y", function() {
                this.querySelector(".ps__thumb-y").offsetTop ? (t.style.display = "block") : (t.style.display = "none");
            });
        var a,
            n = document.querySelector(".dropdown-style-switcher"),
            s = localStorage.getItem("templateCustomizer-" + templateName + "--Style") || (window.templateCustomizer?.settings?.defaultStyle ?? "light"),
            n =
            (window.templateCustomizer &&
                n &&
                ([].slice.call(n.children[1].querySelectorAll(".dropdown-item")).forEach(function(e) {
                        e.addEventListener("click", function() {
                            var e = this.getAttribute("data-theme");
                            "light" === e ? window.templateCustomizer.setStyle("light") : "dark" === e ? window.templateCustomizer.setStyle("dark") : window.templateCustomizer.setStyle("system");
                        });
                    }),
                    (n = n.querySelector("i")),
                    "light" === s ?
                    (n.classList.add("ti-sun"), new bootstrap.Tooltip(n, {
                        title: "Light Mode",
                        fallbackPlacements: ["bottom"]
                    })) :
                    "dark" === s ?
                    (n.classList.add("ti-moon"), new bootstrap.Tooltip(n, {
                        title: "Dark Mode",
                        fallbackPlacements: ["bottom"]
                    })) :
                    (n.classList.add("ti-device-desktop"), new bootstrap.Tooltip(n, {
                        title: "System Mode",
                        fallbackPlacements: ["bottom"]
                    }))),
                "system" === (a = s) && (a = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
                [].slice.call(document.querySelectorAll("[data-app-" + a + "-img]")).map(function(e) {
                    var t = e.getAttribute("data-app-" + a + "-img");
                    e.src = assetsPath + "img/" + t;
                }),
                "undefined" != typeof i18next &&
                "undefined" != typeof i18NextHttpBackend &&
                i18next
                .use(i18NextHttpBackend)
                .init({
                    lng: "en",
                    debug: !1,
                    fallbackLng: "en",
                    backend: {
                        loadPath: assetsPath + "json/locales/{{lng}}.json"
                    },
                    returnObjects: !0
                })
                .then(function(e) {
                    l();
                }),
                document.getElementsByClassName("dropdown-language"));
        if (n.length) {
            var o = n[0].querySelectorAll(".dropdown-item");
            for (let e = 0; e < o.length; e++)
                o[e].addEventListener("click", function() {
                    var e,
                        t = this.getAttribute("data-language");
                    for (e of this.parentNode.children)
                        for (var a = e.parentElement.parentNode.firstChild; a;) 1 === a.nodeType && a !== a.parentElement && a.querySelector(".dropdown-item").classList.remove("active"), (a = a.nextSibling);
                    this.classList.add("active"),
                        i18next.changeLanguage(t, (e, t) => {
                            if (e) return console.log("something went wrong loading", e);
                            l();
                        });
                });
        }

        function l() {
            var e = document.querySelectorAll("[data-i18n]"),
                t = document.querySelector('.dropdown-item[data-language="' + i18next.language + '"]');
            t && t.click(),
                e.forEach(function(e) {
                    e.innerHTML = i18next.t(e.dataset.i18n);
                });
        }
        s = document.querySelector(".dropdown-notifications-all");

        function i(e) {
            "show.bs.collapse" == e.type || "show.bs.collapse" == e.type ? e.target.closest(".accordion-item").classList.add("active") : e.target.closest(".accordion-item").classList.remove("active");
        }
        const r = document.querySelectorAll(".dropdown-notifications-read");
        s &&
            s.addEventListener("click", (e) => {
                r.forEach((e) => {
                    e.closest(".dropdown-notifications-item").classList.add("marked-as-read");
                });
            }),
            r &&
            r.forEach((t) => {
                t.addEventListener("click", (e) => {
                    t.closest(".dropdown-notifications-item").classList.toggle("marked-as-read");
                });
            }),
            document.querySelectorAll(".dropdown-notifications-archive").forEach((t) => {
                t.addEventListener("click", (e) => {
                    t.closest(".dropdown-notifications-item").remove();
                });
            }),
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
                return new bootstrap.Tooltip(e);
            });
        [].slice.call(document.querySelectorAll(".accordion")).map(function(e) {
            e.addEventListener("show.bs.collapse", i), e.addEventListener("hide.bs.collapse", i);
        });
        window.Helpers.setAutoUpdate(!0), window.Helpers.initPasswordToggle(), window.Helpers.initSpeechToText(), window.Helpers.initNavbarDropdownScrollbar();
        let d = document.querySelector("[data-template^='horizontal-menu']");
        if (
            (d && (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ? window.Helpers.setNavbarFixed("fixed") : window.Helpers.setNavbarFixed("")),
                window.addEventListener(
                    "resize",
                    function(e) {
                        window.innerWidth >= window.Helpers.LAYOUT_BREAKPOINT &&
                            document.querySelector(".search-input-wrapper") &&
                            (document.querySelector(".search-input-wrapper").classList.add("search-box-dc"), (document.querySelector(".search-input").value = "")),
                            d &&
                            (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ? window.Helpers.setNavbarFixed("fixed") : window.Helpers.setNavbarFixed(""),
                                setTimeout(function() {
                                    window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT ?
                                        document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-horizontal") && menu.switchMenu("vertical") :
                                        document.getElementById("layout-menu") && document.getElementById("layout-menu").classList.contains("menu-vertical") && menu.switchMenu("horizontal");
                                }, 100));
                    },
                    !0
                ),
                !isHorizontalLayout &&
                !window.Helpers.isSmallScreen() &&
                ("undefined" != typeof TemplateCustomizer && (window.templateCustomizer.settings.defaultMenuCollapsed ? window.Helpers.setCollapsed(!0, !1) : window.Helpers.setCollapsed(!1, !1)), "undefined" != typeof config) &&
                config.enableMenuLocalStorage)
        )
            try {
                null !== localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed") && window.Helpers.setCollapsed("true" === localStorage.getItem("templateCustomizer-" + templateName + "--LayoutCollapsed"), !1);
            } catch (e) {}
    })()