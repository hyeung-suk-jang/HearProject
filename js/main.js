var isWeb;
var isTabl;
var isMobile;
var labSwiper;
var swiperDes = true;

$(function(){
	if(isMobile){
		swiperDes = true;
	}
	// 메인랩_스크롤 바
	labSwiper = new Swiper('.mainCon1 .swiper-container', {
		slidesPerView: 'auto', 
		freeMode: true,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable : true,
			snapOnRelease: false,
			dragsize:10,
		},
		observer:true,
		observeParents:true, 
	});

	// 리사이즈
	$(window).resize(function(){
		if(jQuery(window).width() > 1006){ // isWeb
			isWeb = true;
			isTabl = false;
			isMobile = false;
		}else if(741 < jQuery(window).width() && jQuery(window).width() <= 1006){ // isTabl
			isWeb = false;
			isTabl = true;
			isMobile = false;
		}else if(741 >= jQuery(window).width()){ // isMobile
			isWeb = false;
			isTabl = false;
			isMobile = true;
		}

		if($(".mainCon1").size() > 0){
			$(".mainCon1 .swiper-container").css("width", $(window).width());
			$(".mainCon1 .swiper-container").css("padding-left", $(".mainCon1 .inner").offset().left);
			$(".mainCon1 .swiper-container").css("padding-right", $(".mainCon1 .inner").offset().left);
			$(".mainCon1 .swiper-scrollbar").css("left", $(".mainCon1 .inner").offset().left);
		}


		

		if(isWeb){
			$(".mainV").height($(window).width()*0.37);
			
			// 패널랭킹 탭 - 2019-08-27 추가 
            $(".visArea .rankTabD a").each(function(index){
                $(this).on("click", function(){
                    if(!$(this).hasClass("on")){
                        $(".visArea .rankTabD a").removeClass("on");
                        $(this).addClass("on");
                        $(".visArea .rankTabCon .rankTab").removeClass("on");
                        $(".visArea .rankTabCon .rankTab").eq(index).addClass("on");
                    }
                });
            });
            /* // 2019-08-27 추가 */

			// 랩 최대길이에 맞추기
			var maxH = 0;
			var longH;
			var labelMaxH = 0;
			var labelLongH;

			// 랩 썸네일
			$('.mainCon1 .tabCon .imgArea').css('height','');

			$(".mainCon1 .tabCon").eq(0).find(".txtArea").each(function(q){
				longH = $(".mainCon1 .tabCon").eq(0).find(".txtArea").eq(q).outerHeight() + 1;
				if(maxH < longH) maxH = longH;	
								
				labelLongH = $(".mainCon1 .tabCon").eq(0).find(".txtArea").eq(q).find(".labelDiv").height() + 1;			
				if(labelMaxH < labelLongH) labelMaxH = labelLongH;	
				
			});
			$(".mainCon1 .tabCon").eq(0).find(".txtArea").outerHeight(maxH);
			$(".mainCon1 .tabCon").eq(0).find(".txtArea").find(".labelDiv").height(labelMaxH);
			
			if(!swiperDes){
				for(var i=0; i< $(".mainCon1 .tabCon.swiper-container").length; i++){
					labSwiper[i].allowTouchMove = true;
					labSwiper[i].slideTo(0, 0, false);
				}
				swiperDes = true;
			}
		}else{
			$(".mainV").height($(window).width()*1.1);
			if(swiperDes){
				$(".mainV").height($(window).width()*1.1);
				for(var i=0; i< $(".mainCon1 .tabCon.swiper-container").length; i++){
					labSwiper[i].slideTo(0, 0, false);
					labSwiper[i].allowTouchMove = false;
				}
				swiperDes = false;
			}

            
			// 랩 썸네일
			if(isMobile){
				$('.mainCon1 .tabCon .imgArea').height($('.mainCon1 .tabCon .imgArea').width() * 0.91);
			}
		}
	
		$(window).load(function(){
			$(".mainV .swiper-slide").css("width",$(window).width());		//mainV 스와이퍼 가로넓이 잡는것

			
		});
	}).resize();
	
	
	

	// mainV
	if($(".mainV").size() > 0 && $(".mainV .swiper-slide").size() > 1){
		var mainSwiper = new Swiper('.mainV.swiper-container', {
			loop: true,
			autoplay:{
				delay:5000,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			observer:true,
			observeParents:true
		});
		
		// mainV_playBtn
		$(".mainV .swiper-pagination").append("<a href='javascript:' class='playBtn'></a>");
		$(".mainV .playBtn").click(function(){
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
				mainSwiper.autoplay.stop();
			}else {
				$(this).removeClass("on");
				mainSwiper.autoplay.start();
			}
		});
	}else{
		$(".mainV .swiper-button-next").hide();
		$(".mainV .swiper-button-prev").hide();
	}

	if($(".loginDiv").size() != 0){
		$(".loginDiv .rankDiv .rankList").mCustomScrollbar({
			scrollInertia:50,
			advanced:{
                updateOnContentResize: true,
				autoScrollOnFocus:false
            }
		});

		// mainV_로그인 후 탭
		$(".loginDiv .tabBtn a").each(function(i){
			$(this).click(function(){
				$(".loginDiv .tabBtn a").removeClass("on");
				$(this).addClass("on");
				$(".loginDiv .tabCon").hide();
				$(".loginDiv .tabCon").eq(i).fadeIn(500);
			});
		});
	}
	
	// 메인랩_스크롤 탭
	$(".mainCon1 .tabBtn a").each(function(i){
		$(this).click(function(){
//			if(i == 0){
//				$(".mainCon1 .moreDiv").hide();				
//			}else{
//				$(".mainCon1 .moreDiv").show();
//			}
			$(".mainCon1 .tabBtn a").removeClass("on");
			$(this).addClass("on");			
			$(".mainCon1 .tabCon").hide();
			$(".mainCon1 .tabCon").eq(i).fadeIn(500);			

			// 랩 최대길이에 맞추기
			if(isWeb){
				var maxH = 0;
				var longH;
				var labelMaxH = 0;
				var labelLongH;
				
				$(".mainCon1 .tabCon").eq(i).find(".txtArea").each(function(q){
					longH = $(".mainCon1 .tabCon").eq(i).find(".txtArea").eq(q).outerHeight() + 1;
					if(maxH < longH) maxH = longH;	
					
					labelLongH = $(".mainCon1 .tabCon").eq(i).find(".txtArea").eq(q).find(".labelDiv").height() + 1;					
					if(labelMaxH < labelLongH) labelMaxH = labelLongH;	
					
				});
				$(".mainCon1 .tabCon").eq(i).find(".txtArea").outerHeight(maxH);
				$(".mainCon1 .tabCon").eq(i).find(".txtArea").find(".labelDiv").height(labelMaxH);
			}else{
				$(".mainCon1 .tabCon").eq(i).find(".txtArea").outerHeight("auto");
				$(".mainCon1 .tabCon").eq(i).find(".txtArea").find(".labelDiv").height("auto");
			}

		});
	});

	// 칼럼_롤링배너
	if($(".mainCon2 .swiper-slide").size() > 1){
		var bannerSwiper = new Swiper('.mainCon2 .swiper-container', {
			loop: true,
			autoplay:{
				delay:5000,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}else{
		$(".mainCon2 .swiper-button-next").hide();
		$(".mainCon2 .swiper-button-prev").hide();
	}
	

	// 메인 팝업
	var mLayerN = 0;
	$(".layerPop.main .bottomDiv .rollBtn a").each(function(q){
		$(this).click(function(){
			if(mLayerN != q){
				$(".layerPop.main .rollDiv .roll").eq(mLayerN).fadeOut(300);
				$(".layerPop.main .bottomDiv .rollBtn a").eq(mLayerN).removeClass("on");
				mLayerN = q;
				$(".layerPop.main .rollDiv .roll").eq(mLayerN).fadeIn(300);
				$(".layerPop.main .bottomDiv .rollBtn a").eq(mLayerN).addClass("on");
			}
		});
	});
});