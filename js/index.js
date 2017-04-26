$(function () {

    /**
     * 第一页
     *****************************************************************/

    // 导入模块
    require('app/main');

    // 全局导航
    var num = 0, timer = null;
    $('.nav button').on('click', function (e) {
        num = $(this).index();
        $('section').eq(num).show().siblings('section').hide();
    });
    //鼠标滚动
    $(window).mousewheel(function (e, d) {
        // 节流
        clearTimeout(timer);
        timer = setTimeout(wheel, 200);
        function wheel() {
            num -= d;
            var gps = $('.nav button')
            if (num > gps.length - 1 || num < 0) {
                num = 0;
            }
            gps.eq(num).addClass('nav__item--current').siblings().removeClass('nav__item--current');
            $("section").eq(num).show().siblings("section").hide();
            setTimeout(function () {
                $("section").eq(num).removeClass('show').siblings("section").addClass('show');
            }, 10)
        }
    });

    // Call plugin
    $('.mySlideshow').edslider({
        width: '80%',
        height: 350
    });

    // Hide btn
    $('.mySlideshow').on('mouseover', function () {
        $('.navigator').css({opacity: '1', zIndex: 99999});
    });

    // 1秒之后轮播图出现
    setTimeout(function () {
        $('.center-slider').css({display: 'block'});
    }, 1000);

    /**
     * 第二页
     *****************************************************************/
    $('.job-head li').mouseenter(function () {
        $(this).addClass('current').siblings().removeClass('current');
        var i = $(this).index();
        $('.content-list').eq(i).addClass('show').siblings().removeClass('show');
    });

    /**
     * 第三页
     *****************************************************************/

    /**
     * 点击切换登录三角
     ****************************************************************/
    $('.login').on('mouseover', function () {
        $('.login-list').show(function () {
            $('.login img').css({transform: 'rotate(180deg)'});
        });
    });
    $('.login-list').on('mouseleave', function () {
        $(this).hide(function () {
            $('.login img').css({transform: 'rotate(0deg)'});
        });
    });

    /**
     * 导航音乐
     ****************************************************************/
    $('.oUl li').each(function (index) {
        var key = $(this).index();
        var audio = $('audio')[index];
        $(this).on('mouseover', function () {
            $('.oUl li span').eq(key).stop().animate({top: 0});
            $('.oUl li i').eq(key).toggleClass('fill').siblings().removeClass('fill');
            audio.pause();
            audio.play();

        });
        $(this).on('mouseout', function () {
            $('.oUl li span').eq(key).stop().animate({top: 35});
            $('.oUl li i').removeClass('fill');
        });
    });
    /**
     * 点击切换小红心
     * @type {boolean}
     ****************************************************************/

    var isClick = false;  // 记录点击
    $('.control').each(function (index) {
        $(this).on('click', function () {
            var url = isClick ? 'images/heart-change.png' : 'images/heart.png';
            $('.control img').eq(index).attr('src', url);
            isClick = !isClick;
        });
    });

    /**
     * 切换歌单
     * @type {*}
     ****************************************************************/

    var ulIndex = $('#banner ul').index();
    $('.content-middle li').each(function () {
        var rotateIndex = $(this).index();
        $(this).on('mouseover', function () {
            ulIndex = rotateIndex;
            $('#banner ul').eq(ulIndex).stop().show(500).siblings().stop().hide(500);
        });
    });

    /**
     * 鼠标按下移动盒子 --> 模态框
     ****************************************************************/

    // 定位盒子的距离
    $('.panel').mousedown(function (event) {
        var event = event || window.event;
        // 求出移动的距离
        var startX = event.pageX - $('#move').position().left;
        var startY = event.pageY - $('#move').position().top;

        $(document).mousemove(function (event) {
            // 限制在可视区域内运动
            var l = event.pageX - startX;
            var t = event.pageY - startY;
            var r = $(document).width() - $('#move').width();
            var b = $(document).height() - $('#move').height();
            // 检测边缘碰撞

            if (l <= 0) {
                $('#move').css({left: 0 + 'px'});
            }
            else if (l > r) {
                $('#move').css({left: r + 'px'});
            }
            else {
                $('#move').css({left: l + 'px'});
            }

            if (t < 0) {
                $('#move').css({top: 0 + 'px'});
            }
            else if (t > b) {
                $('#move').css({top: b + 'px'});
            }
            else {
                $('#move').css({top: t + 'px'});
            }
            /*
             // 给盒子赋值
             $('#move').css({left: event.pageX - startX, top: event.pageY - startY});
             */
            return false;

        });
        // 鼠标弹起移除事件
        $(document).mouseup(function () {
            $(document).unbind();
        });
    });
    // 点击手机登录显示模态框 蒙版出现
    $('.mobile').on('click', function () {
        $('.mask').show();
        $('#move').show();
    });
    // 显示或者隐藏模态框
    $('.email').on('click', function () {
        $('.mask').show();
        $('#move').show();
        $('.login-title').html("网易邮箱登录<i class='close'></i>");
        $('#user-pwd input').attr('placeholder', "请输入邮箱");
    });
    // 点击小X 取消蒙版 隐藏模态框
    $('.close').on('mousedown', function () {
        $('#move').hide();
        $('.mask').hide();
    });
});