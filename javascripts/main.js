$(function () {
//性能测试
var s = new Date().getTime();
//测试区
// console.log($('.part2_title').offset().top);
//定义变量区
  var bSys = true;
  var num = 10;
  var count = 0;
  var timer = null;
  var timer2 = null;
  var timer3 = null;
  var bSys = true;
  var sSys = false;
  var circleTop = $('.part1_circle').offset().top;
//设置样式区
  //给part1_alert_123添加left值
  $('.part1_alert_1').css({'left' : ($(window).width()-$('.part1_alert_1').width())/2 + 'px'});
  $('.part1_alert_2').css({'left' : ($(window).width()-$('.part1_alert_2').width())/2 - 2 *  $('.part1_alert_2').width() + 'px'});
  $('.part1_alert_3').css({'left' : ($(window).width()-$('.part1_alert_3').width())/2 + 2 *  $('.part1_alert_3').width() + 'px'});
  //根据可视区高度设置侧边栏高度，并添加鼠标移入移出效果;
  $('.menu').css({'height': $(window).height()}).mouseover(function () {
    $(this).stop().animate({left: 0},500);
    $('.main').stop().animate({left:280},500);
  }).mouseout(function () {
    $(this).stop().animate({left: -280},500);
    $('.main').stop().animate({left:0},500);
  });
  //根据父级宽度设置.part1_circle的left值
  $('.part1_circle').css({left:$(window).width()-30,'z-index' :1});
//菜单栏点击区
  $('.menu_text_title').click(function () {
    var top = $(window).scrollTop();
    var n = (0 - top)/10;
    var t = top + n;
    timer2 = setInterval(function () {
      $(window).scrollTop(t);
      t+=n;
      if((t>0 && n>0) || (t<0 &&n<0)) {
        clearInterval(timer2);
      }
    },30);
    $('.menu').offset({'left' : -280});
  })
  $('.menu_text_1').click(function () {
    var top = $(window).scrollTop();
    var n = (680 - top)/10;
    var t = top + n;
    timer2 = setInterval(function () {
      $(window).scrollTop(t);
      t+=n;
      if((t>680 && n>0) || (t<680 &&n<0)) {
        clearInterval(timer2);
      }
    },30);
    $('.menu').offset({'left' : -280});
  })
  $('.menu_text_2').click(function () {
    var top = $(window).scrollTop();
    var n = (1280 - top)/10;
    var t = top + n;
    timer2 = setInterval(function () {
      $(window).scrollTop(t);
      t+=n;
      if((t>1280 && n>0) || (t<1280 &&n<0)) {
        clearInterval(timer2);
      }
    },30);
    $('.menu').offset({'left' : -280});
  })
//添加滚动条事件区
  $(window).scroll(function() {
    document.title = $(window).scrollTop();
  //侧边菜单栏随滚动条滚动
    $('.menu').css({'position' : 'fixed','top' : '0', 'left' : '-280px'},0);
  //part1_title随滚动条变淡变小
    $('.part1_title').css({'opacity' : (-$(window).scrollTop()/200)+1.5});
  //各块随滚动条滑动些许上移
    $('.part2_body').css({'top':100 - ($(window).scrollTop() * .2)});
    $('.part3_body').css({'top':250 - ($(window).scrollTop() * .2)});
  //Click块吸顶
    // $('.part1_circle').offset().top;
    // console.log($('.part1_circle').offset().top)
    // if ($(window).scrollTop() >circleTop-30) {
    //  $('.part1_circle').css({'position' : 'fixed','top':30});
    // };
    // if ($(window).scrollTop()<circleTop-30) {
    //  $('.part1_circle').css({'position' : 'absolute','top':circleTop});
    // };
  //part3延迟载入动画
    if($(window).scrollTop()>1000&&$(window).scrollTop()<1800){
      if(bSys){
        var n = 0;
        function show() {
          $('.part3_pic'+n).stop().animate({left:n * 50},1000);
          n++;
          if(n==$('.part3_main').length+1) {
            clearInterval(timer3);
            n = 0;
          };
        };
        show();
        timer3 = setInterval(show,500);
        $('.part3_main').mousemove(function () {
          $('.part3_main:gt('+($(this).index()-1)+')').each(function() {
            // alert($(this).index())
            $(this).stop().animate({
              'left':$('.part3_body').width()-($('.part3_main').length-$(this).index()+1) * 50
            })
          });
          $('.part3_main:lt('+($(this).index())+')').each(function() {
            // alert($(this).index())
            $(this).stop().animate({
              'left':$(this).index() * 50
            })
          });
        })
        bSys = !bSys;
      }
    }else{
      $('.part3_main').css({left:$('.part3_body').width()});
      bSys = !bSys;
    }
  });
//part3点击动画
  $('.part3_main').each(function() {
    $(this).css({})
  });
//.part1_title的自动播放事件
  $('.part1_title').stop().animate({'width' : 800,'opacity' : 1},2000,function () {
    $('.main_part1 > .author').css({'opacity' :1},100)
  });
//.part1_circle鼠标移入移出事件，及拖拽、自动回弹
  $('.part1_circle').mouseover(function() {
    $(this).stop().animate({left:$('.main_part1').width()-80},100,function () {
      $(this).click(function () {
        bSys = !bSys;
        if(!bSys){
          $('.part1_alert_1').stop().animate({
          'top': -10},
          500,function () {
            $('.part1_alert_2').stop().animate({
              'top':-10
            },500,function () {
              $('.part1_alert_3').stop().animate({
                'top':-10
              },500)
            })
          });
        }else{
          $('.part1_alert_3').stop().animate({
          'top': -140},
          500,function () {
            $('.part1_alert_2').stop().animate({
              'top':-120
            },500,function () {
              $('.part1_alert_1').stop().animate({
                'top':-160
              },500)
            })
          });
        }
      })
    });
    $('.part1_circle').mousedown(function (ev) {
      var oEvent = ev || event;
      var disX = oEvent.clientX - $(this).offset().left;
      var disY = oEvent.clientY - $(this).offset().top;
      $(this).mousemove(function(ev) {
        var oEvent = ev || event;
        var l = oEvent.clientX - disX;
        var t = oEvent.clientY - disY;
        $('.part1_circle').css({left:l,top:t});
      });
      $(this).mouseup(function () {
        $('.part1_circle').offset({left:$('.main_part1').width()-80});
        $(this).unbind("mousemove");
      });
    })
  }).mouseout(function () {
    $(this).stop().animate({left:$('.main_part1').width()-30},500);
    $(this).unbind('click');
    $(this).unbind('mousemove');
  });
//自动播放三角标
  setInterval(function () {
    $('.triange').remove();
    $('.main_part1').prepend('<div class="triange"></div>');
    $('.triange').css({right:20*num}).stop().animate({'opacity':1},400,function () {
      $(this).stop().animate({'opacity':0},400);
    });
    num--;
    if(num==-1) num = 10;
  },1000);
//part1中间条动画
  timer = setInterval(function () {
    var l = rnd(0,81)/100;
    var w = $('.part1_bar').width();
    if (w < 200) clearInterval(timer);
    $('.part1_bar').animate({
      width: 0,
      left: $('.part1_bar').width() * l},
      1000, function() {
      $('.part1_bar').animate({
        width: w,
        left:0
      },1000)
    });
  }, 2000);
  // alert(new Date().getTime() - s);
})
//鼠标点击出圈
  // $(document).bind('mousemove', function(ev) {
  //  var oEvent = ev||event;
  //  var disX = oEvent.clientX;
  //  var disY = oEvent.clientY;
  //  $('.circle').css({
  //    'top':$(window).scrollTop() + disY - $('.circle').outerHeight()/2,
  //    'left':disX - $('.circle').outerWidth()/2
  //  })
  // })
  // $(document).bind('click', function (ev) {
  //  var oEvent = ev||event;
  //  var disX = oEvent.clientX;
  //  var disY = oEvent.clientY;
  //  $('.circle').animate({
  //    'width':20,
  //    'height':20,
  //    'top':$(window).scrollTop() + disY - $('.circle').outerHeight()/2,
  //    'left':disX - $('.circle').outerWidth()/2
  //  },100,function () {
  //    $('.circle').animate({
  //      'width':0,
  //      'height':0,
  //    })
  //  });
  // });

