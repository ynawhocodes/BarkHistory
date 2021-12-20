var mySwiper = new Swiper('.swiper-container', {

          observer : true,	// 추가
          observeParents : true,
          direction : 'horizontal',
         //한번에 보여지는 페이지 숫자
         slidesPerView : 1,
         //페이지와 페이지 사이의 간격
         spaceBetween : 30,
         //드레그 기능 true 사용가능 false 사용불가
         debugger : false,
         //마우스 휠기능 true 사용가능 false 사용불가
         mousewheel : true,
         //반복 기능 true 사용가능 false 사용불가
         loop : true,
         //선택된 슬라이드를 중심으로 true 사용가능 false 사용불가 djqt
         centeredSlides : true,
         //페이징
         pagination : {
             //페이지 기능
             el : ".swiper-pagination",
             //클릭 가능여부
             type : "bullets"
         },
         //방향표
         navigation : {
             //다음페이지 설정
             nextEl : ".swiper-button-next",
             //이전페이지 설정
             prevEl : ".swiper-button-prev",
         },

  });


  var swiper = new Swiper(".mySwiper-reaction", {
      slidesPerView: 6,
      spaceBetween: 25,
      loop: true,
  });
