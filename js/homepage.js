;/* 缩放模块 */

define("app/scale", function (t, i, e) {
    var s = $("html"),
        n = $(window),
        h = {
            scale: function () {
                var t = n.height() / 1080,
                    i = Math.min(1, t),
                    e = t;
                this.$el.css("font-size", Math.max(this.minFontSize, 32 * i)),
                    s.css("font-size", Math.max(this.minFontSize, 32 * e)),
                s.hasClass("lte8") && this.$el.find("#container").height(this.$el.height())
            },
            events: function () {
                n.on("resize", _.throttle(_.bind(this.scale, this), 100))
            },
            init: function (t) {
                this.$el = $("body"), this.minFontSize = t || 12, this.scale(), this.events()
            }
        };
    e.exports = h
});

;/* 初始化组件 */

define("app/main", function (e) {
    var i = e("app/scale");
    i.init(18);

    var g = ["./images/bg-mountain-1-11661c6.png", "./images/bg-mountain-2-f8a4360.png", "./images/bg-mountain-3-54c28fd.png", "./images/bg-aurora-1-322b435.png", "./images/bg-aurora-2-9872721.png", "./images/bg-aurora-3-96add9f.png", "./images/bg-aurora-4-131b685.png", "./images/bg-aurora-5-3514cd0.png"], h = function () {
        var e = $.Deferred(), i = g.length, n = 0;
        return $.each(g, function (a, t) {
            $("<img />").on("load", function () {
                ++n, ++n >= i && e.resolve()
            }).attr("src", t)
        }), e.promise()
    };
    h().done(function () {
        $("body").addClass("scenes-ready");
    });
});

;/* 全局导航 */
(function(window) {

    'use strict';

    function init() {
        [].slice.call(document.querySelectorAll('.nav')).forEach(function(nav) {
            var navItems = [].slice.call(nav.querySelectorAll('.nav__item')),
                itemsTotal = navItems.length,
                setCurrent = function(item) {
                    // return if already current
                    if( item.classList.contains('nav__item--current') ) {
                        return false;
                    }
                    // remove current
                    var currentItem = nav.querySelector('.nav__item--current');
                    currentItem.classList.remove('nav__item--current');

                    // set current
                    item.classList.add('nav__item--current');
                };

            navItems.forEach(function(item) {
                item.addEventListener('click', function() { setCurrent(item); });
            });
        });
    }

    init();

})(window);

