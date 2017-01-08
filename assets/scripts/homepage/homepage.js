/**
 * Created by lizhuo on 2017/1/6.
 **/
$(function () {
	/*$('#wrap').css({
	 'height':document.documentElement.clientHeight
	 });*/
	var banner;
	/*轮播图定时器*/
	var i = 0;
	/*轮播图计数*/
	var scroll = $(window).scrollTop();
	var oWrap = document.querySelector('#wrap');
	/*初始化滚动条距离*/
	/*点击navbar添加效果*/
	$('.weui-navbar__item').on('click', function () {
		$(this).addClass('active').siblings('.active').removeClass('active');
	});
	/*touchmove函数*/
	oWrap.addEventListener('touchstart', function (ev) {
		var touchstartY = ev.touches[0].clientY;

		function fntouchMove(ev) {
			var touchmoveY = ev.changedTouches[0].clientY;
			if (touchstartY > touchmoveY) {
				$($('.part_5')[0]).css({
					'bottom': -2.45 + 'rem',
					'-webkit-transition': '0.5s all ease'
				});
			} else {
				$($('.part_5')[0]).css({
					bottom: 0,
					'-webkit-transition': '0.5s all ease'
				});
			}
			touchstartY = touchmoveY;
		}

		function fntouchEnd() {
			$($('.part_5')[0]).css({
				bottom: 0,
				transition: '0.5s all ease'
			});
			oWrap.removeEventListener('touchmove', fntouchMove, false);
			oWrap.removeEventListener('touchend', fntouchEnd, false)
		}

		this.addEventListener('touchmove', fntouchMove, false);
		this.addEventListener('touchend', fntouchEnd, false)
	}, false);
	/*滚动触发函数*/
	window.addEventListener('scroll', function () {
		/*吸顶*/
		if ($(window).scrollTop() >= ($('#part_2')[0].offsetTop + $('#part_2')[0].clientHeight)) {
			clearInterval(banner);
			$('.part_2').css({
				top: 0,
				transition: '0.5s all ease'
			});
		} else {
			$('.part_2').css({
				top: -2.2 + 'rem',
				transition: 'none'
			});
			clearInterval(banner);
			banner_fn();
		}
		scroll = $(window).scrollTop();
	}, false);
	/*轮播图函数*/
	function banner_fn() {
		banner = setInterval(function () {
			$('#tab').css({
				left: i * -18.75 + 'rem',
				transition: '1s all ease'
			});
			$($('#point')[0].children[i]).addClass('point_2').siblings('.point_2').removeClass('point_2');
			i >= 4 ? i = 0 : i++;
		}, 3000)
	}

	banner_fn();
	/*页面初始化运行轮播图函数*/

	/*Ajax*/
	/*$.ajax({
	 type: 'GET',
	 url: 'http://bread.mypick.tv:8080/bread-live/api/v1/home/',
	 // data to be added to query string:
	 data: {

	 },
	 // type of data we are expecting in return:
	 dataType: 'json',
	 timeout: 300,
	 context: $('body'),
	 success: function(data){
	 console.log(data);
	 },
	 error: function(xhr, type){
	 alert('Ajax error!')
	 }
	 });*/

	/*模版语法区*/
	var part_3_data = {
		list: [
			{
				"id": 9,
				"user_id": 1,
				"user": {
					"id": 1,
					"nickname": "大宝",
					"image_url": "http://wx.qlogo.cn/mmopen/3BUx453Qgt0ib3ecaIicXIaiadCsmoeXHxleW3PduK0ob0n4ny4xmiaWibbCEFnyuDrvficCF4MiaI49qmZQ2q6LgRoEA/0.png"
				},
				"title": "招聘课程讲座",
				"image_urls": {
					"count": 0,
					"results": [],
					"next": "",
					"previous": ""
				},
				"course_type_id": 2,
				"recommended_index": 2,
				"open_time": "1485748800000",
				"created_time": "1483429658000",
				"updated_time": "1483429658000",
				"page_view": 0,
				"status": 1,
				"uri": "/courses/9/"
			},
			{
				"id": 1,
				"user_id": 1,
				"user": {
					"id": 1,
					"nickname": "大宝",
					"image_url": "http://wx.qlogo.cn/mmopen/3BUx453Qgt0ib3ecaIicXIaiadCsmoeXHxleW3PduK0ob0n4ny4xmiaWibbCEFnyuDrvficCF4MiaI49qmZQ2q6LgRoEA/0.png"
				},
				"title": "测试课程",
				"image_urls": {
					"count": 2,
					"results": [
						{
							"url": "http://test1.jpg"
						},
						{
							"url": "http://test2.jpg"
						}
					],
					"next": "",
					"previous": ""
				},
				"course_type_id": 1,
				"recommended_index": 1,
				"open_time": "1483440967000",
				"created_time": "1483440976000",
				"updated_time": "1483440979000",
				"page_view": 0,
				"status": 1,
				"uri": "/api/v1/courses/1/"
			}
		]
	};
	var part_2_data = {
		list: [
			{
				"id": 0,
				"name": "推荐",
				"image_url": "http://bread.mypick.tv/remommend.png"
			},
			{
				"id": 3,
				"name": "招聘",
				"image_url": "http://bread.mypick.tv/recruit.png"
			},
			{
				"id": 2,
				"name": "星座",
				"image_url": "http://bread.mypick.tv/astro.png"
			},
			{
				"id": 1,
				"name": "时尚",
				"image_url": "http://bread.mypick.tv/fashion.png"
			},
			{
				"id": 0,
				"name": "推荐",
				"image_url": "http://bread.mypick.tv/remommend.png"
			},
			{
				"id": 3,
				"name": "招聘",
				"image_url": "http://bread.mypick.tv/recruit.png"
			},
			{
				"id": 2,
				"name": "星座",
				"image_url": "http://bread.mypick.tv/astro.png"
			},
			{
				"id": 1,
				"name": "时尚",
				"image_url": "http://bread.mypick.tv/fashion.png"
			},
		]
	};
	var html_2_1 = template('part_2_data_1', part_2_data);
	var html_2_2 = template('part_2_data_2', part_2_data);
	var html_3 = template('part_3_data', part_3_data);
	document.getElementById('weui-navbar_1').innerHTML = html_2_1;
	document.getElementById('weui-navbar_2').innerHTML = html_2_2;
	document.getElementById('style_1').innerHTML = html_3;
	document.getElementById('style_2').innerHTML = html_3;
	document.getElementById('style_3').innerHTML = html_3;
	document.getElementById('style_4').innerHTML = html_3;
	document.getElementById('style_5').innerHTML = html_3;
	document.getElementById('style_6').innerHTML = html_3;
	document.getElementById('style_7').innerHTML = html_3;
	document.getElementById('style_8').innerHTML = html_3;
	/*模版语法结束*/
	/*part_2 start*/
	/*根据数据长度更改栏目栏宽度*/
	$('#weui-navbar_2').css({
		width: part_2_data.list.length * 3.55 + 'rem'
	});
	$('#weui-navbar_1').css({
		width: part_2_data.list.length * 3.55 + 'rem'
	});
	var part_2_x = 0;
	var count = 0;
	var count_1 = 0;
	var oPart_2_1 = document.querySelector('#weui-navbar_1');
	var oPart_2_2 = document.querySelector('#weui-navbar_2');
	oPart_2_2.querySelector('.weui-navbar__item').setAttribute('class', 'weui-navbar__item active');
	oPart_2_1.querySelector('.weui-navbar__item').setAttribute('class', 'weui-navbar__item active');
	/*part_2 切换标签页*/
	function onDir(ev, obj_1, obj_2) {
		let oTouch = ev.targetTouches[0];
		let downX = oTouch.pageX;
		let disX = downX - part_2_x;
		let obj_1_children = obj_1.getElementsByClassName('weui-navbar__item');
		let obj_2_children = obj_2.getElementsByClassName('weui-navbar__item');
		let bDir;

		function fnMove(ev) {

			let max_right = -Math.round(((obj_1.getElementsByClassName('weui-navbar__item').length - 5) * 3.55) * 100) / 100;
			let oTouch = ev.targetTouches[0];
			let moveX = oTouch.pageX;
			let moveY = oTouch.pageY;
			if (bDir) {
				if (bDir == 'lr') {
					part_2_x = moveX - disX;
					if (part_2_x > 0) {
						part_2_x = 0;
					} else if (part_2_x < max_right) {
						part_2_x = max_right;
					}
					obj_1.style.WebkitTransform = 'perspective(800px) translate3d(' + part_2_x + 'rem,0,0)';
					obj_2.style.WebkitTransform = 'perspective(800px) translate3d(' + part_2_x + 'rem,0,0)';
					obj_1.style.WebkitTransition = '0.5s all ease';
					obj_2.style.WebkitTransition = '0.5s all ease';
					for (let i = 0; i < obj_1_children.length; i++) {
						obj_1_children[i].setAttribute('class', 'weui-navbar__item');
						obj_2_children[i].setAttribute('class', 'weui-navbar__item');
					}
					obj_1_children[count_1].setAttribute('class', 'weui-navbar__item active');
					obj_2_children[count_1].setAttribute('class', 'weui-navbar__item active');
				}
			} else {
				if (Math.abs(moveX - downX) > 10) {
					bDir = 'lr';
				}
			}

		}

		function fnEnd() {
			document.removeEventListener('touchmove', fnMove, false);
			document.removeEventListener('touchend', fnEnd, false);
			bDir = '';
		}

		document.addEventListener('touchmove', fnMove, false);
		document.addEventListener('touchend', fnEnd, false);
		ev.preventDefault();
	}

	oPart_2_1.addEventListener('touchstart', function (ev) {
		onDir(ev, oPart_2_1, oPart_2_2)
	}, false);
	/*part_2 end*/
	/*part_3 start*/
	var oPart_3 = document.querySelector('.part_3_box');
	var part_3_x = 0;

	function onDir_1(ev, obj_1, obj_2, obj_3) {
		let oTouch = ev.targetTouches[0];
		let downX = oTouch.pageX;
		let downY = oTouch.pageY;
		let obj_1_children = obj_1.getElementsByClassName('weui-navbar__item');
		let obj_2_children = obj_2.getElementsByClassName('weui-navbar__item');

		function fnMove(ev) {
			let max_right = -Math.round(((obj_1.getElementsByClassName('weui-navbar__item').length - 5) * 3.55) * 100) / 100;
			let oTouch = ev.targetTouches[0];
			let moveX = oTouch.pageX;
			let moveY = oTouch.pageY;
			if (Math.abs(moveX - downX) > Math.abs(moveY - downY) * 50) {
				if (moveX > downX) {
					count--;
					if (count < 0) {
						count = 0;
					}else {
						part_3_x += 18.75;
						if (count<3){
							part_2_x += 3.55;
						}
					}

				} else {
					count++;
					if (count > 7) {
						count = 7
					}else {
						part_3_x += -18.75;
						if (count<4){
							part_2_x += -3.55;
						}
					}

				}
				part_2_x = Math.round(part_2_x * 100) / 100;
				obj_1.style.WebkitTransform = 'perspective(800px) translate3d(' + part_2_x + 'rem,0,0)';
				obj_2.style.WebkitTransform = 'perspective(800px) translate3d(' + part_2_x + 'rem,0,0)';
				obj_3.style.WebkitTransform = 'perspective(800px) translate3d(' + part_3_x + 'rem,0,0)';
				obj_1.style.WebkitTransition = '0.5s all ease';
				obj_2.style.WebkitTransition = '0.5s all ease';
				obj_3.style.WebkitTransition = '0.5s all ease';
				for (let i = 0; i < obj_1_children.length; i++) {
					obj_1_children[i].setAttribute('class', 'weui-navbar__item');
					obj_2_children[i].setAttribute('class', 'weui-navbar__item');
				}
				obj_1_children[count].setAttribute('class', 'weui-navbar__item active');
				obj_2_children[count].setAttribute('class', 'weui-navbar__item active');
				fnEnd();
			}
		}

		function fnEnd() {
			document.removeEventListener('touchmove', fnMove, false);
			document.removeEventListener('touchend', fnEnd, false);
		}

		document.addEventListener('touchmove', fnMove, false);
		document.addEventListener('touchend', fnEnd, false);
	}

	oPart_3.addEventListener('touchstart', function (ev) {
		if ($(window).scrollTop() >= ($('#part_2')[0].offsetTop + $('#part_2')[0].clientHeight)) {
			onDir_1(ev, oPart_2_1, oPart_2_2, oPart_3)
		}
	}, false);
	/*part_3 end*/
});