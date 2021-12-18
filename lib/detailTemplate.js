var express = require('express');
var app = express();
app.use(express.static('public'));

module.exports = {
    HTML: function (postControl, commentList, commentForm = "", commentsCount = 0) {
        return `<!DOCTYPE html>
        <html lang="en">      
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BarkHistory - Detail page</title>
    
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/47af083e64c2516999ff77e89885c4371455fbc3/css/common.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/47af083e64c2516999ff77e89885c4371455fbc3/css/board.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/47af083e64c2516999ff77e89885c4371455fbc3/css/navigation.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/47af083e64c2516999ff77e89885c4371455fbc3/css/reaction.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/47af083e64c2516999ff77e89885c4371455fbc3/css/swiper.css">
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    </head>
        <body class="wrap">
            <div class="navigation">
                <div class="tab">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide tab04"><a href="#">캠퍼스</a></div>
                            <div class="swiper-slide tab01"><a href="#">연애</a></div>
                            <div class="swiper-slide tab02"><a href="#">회사</a></div>
                            <div class="swiper-slide tab03"><a href="#">알바</a></div>
                            <div class="swiper-slide tab05"><a href="#">일상</a></div>
                            <div class="swiper-slide tab06"><a href="#">10대</a></div>
                            <div class="swiper-slide tab07"><a href="#">기타</a></div>
                        </div>
                    </div>
                </div>
                <div class="option">
                    <button type="button" onclick="alert('검색버튼 클릭')"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/search.png" alt="검색"></button>
                    <button type="button" onclick="alert('설정 클릭')"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/setting.png" alt="설정"></button>
                </div>
            </div>
            <div class="container">
                <div class="container-inner">
                    ${postControl}
                    <div class="reaction">
                        <h4 class="reaction-title">반응 +${commentsCount}</h4>
                        <div class="reaction-swiper">
                            <div class="swiper mySwiper-reaction">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/wtf.png">
                                    </div>
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/ohno.png">
                                    </div>
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/fine.png">
                                    </div>
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/humm.png">
                                    </div>
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/kkk.png">
                                    </div>
                                    <div class="swiper-slide swiper-slide-action">
                                        <img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/what.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="plus-icon" onclick="onClickPlus()" location.href=/detail/create"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/plus.png"></button>
                    </div>
                </div>
        
            </div>
            <div class="comment-container">
            ${commentForm}
            ${commentList}
            </div>
            <div id="modal" class="reaction-modal">
                <form action="/comment_create_process" method="post">
                    <input type="image" name="emoji_01" onclick="alert('이모지1을 선택하셨습니다')" class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/wtf.png">
                    <input type="image" name="emoji_02" onclick="alert('이모지2을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/ohno.png">
                    <input type="img" name="emoji_03" onclick="alert('이모지3을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/fine.png">
                    <input type="img" name="emoji_04" onclick="alert('이모지4을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/humm.png">
                    <input type="img" name="emoji_05" onclick="alert('이모지5을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/kkk.png">
                    <input type="img" name="emoji_05" onclick="alert('이모지6을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/what.png">
                    <input type="submit" class="btn-close" onclick="onClickClose()">완료</input>
                </form>
            </div>
        
            <!-- Swiper JS -->
            <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
            <script src="https://raw.githack.com/ynawhocodes/BarkHistory/3c2ca139b5faca6a1e09ee1e2063d6b3cd17f87e/js/swiper.js"></script>
            <!-- Initialize Swiper -->
            <script src="https://raw.githack.com/ynawhocodes/BarkHistory/3c2ca139b5faca6a1e09ee1e2063d6b3cd17f87e/js/reaction.js"></script>
        
        </body>
        
        </html>`
    },
    commentList: function (comments) {
        var list = ``;
        var i = 0;

        while (i < comments.length) {
            list = list + `<div class="comment-box comment-box__pink">
                                <div class="comment-box-top">
                                    <div class="comment-box-top__info">
                                        <span>익명</span>
                                        <span>${comments[i].comment_date}</span>
                                    </div>
                                    <div class="comment-box-top__stuff">
                                        <a href="/campus/${comments[0].post_id}/comment_update">수정</a>
                                        <form action ="comment_delete_process" method="post" onsubmit="return confirm('정말로 삭제하시겠습니까?');">
                                            <input type="hidden" name="comment_id" value="${comments[0].comment_id}">
                                            <input type="submit" value="삭제">
                                        </form>
                                    </div>
                                </div>
                                <p>${comments[i].comment_detail}</p>
                           </div>
                           `
            i += 1;
        }
        return list;
    },
    postControl: function (isHOT, postId, post) {
        if (isHOT) {
            HOTtitle = `<span class="update-title">실시간 HOT</span>`
        }
        else {
            HOTtitle = ``;
        }
        console.log(post);
        return `<div class="update-header">
            ${HOTtitle}         
            <span class="update-header__stuff">
                <a href="/campus/${postId}/post_update">수정</a>
                <form action ="post_delete_process" method="post" onsubmit="return confirm('정말로 삭제하시겠습니까?');">
                <input type="hidden" name="post_id" value="${postId}">
                <input type="submit" value="삭제">
                </form>
                <span>스크랩 수: 0</span>
            </span>
            <button id="button" onclick="alert('스크랩 추가')"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/scrap.png" alt="스크랩"></button>
            </div>
            <div class="update-writer">글쓴이</div>
                <h2 class="title">${post[0].post_title}</h2>
                <div class="description">
                    ${post[0].post_detail}
            </div>`
    },
    postFormControl: function (isHOT, post) {
        if (isHOT) {
            HOTtitle = `<span class="update-title">실시간 HOT</span>`
        }
        else {
            HOTtitle = ``;
        }
         return `
         <form action="post_update_process" method="post">
             <div class="update-header">
                ${HOTtitle}    
                 <span class="update-header__stuff">
                     <input type="submit" value="수정 완료">
                     <span>스크랩 수: 0</span>
                 </span>
                 <button id="button" onclick="alert('스크랩 추가')"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/scrap.png" alt="스크랩"></button>
             </div>
             <input type="hidden" name="post_id" value="${post[0].post_id}">
             <h2 class="title">
                 <input type="text" name="post_title" value="${post[0].post_title}">
             </h2>
             <div class="description">
                 <input type="text" name="post_detail" value="${post[0].post_detail}">
             </div>
         </form>`
     }
}