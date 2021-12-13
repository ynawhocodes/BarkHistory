var express = require('express');
var app = express();
app.use(express.static('public'));

module.exports = {
    HTML: function (title, description, commentList, form="") {
        return`<!DOCTYPE html>
        <html lang="en">      
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BarkHistory - Detail page</title>
    
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/develop/css/common.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/develop/css/board.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/develop/css/navigation.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/develop/css/reaction.css">
        <link rel="stylesheet" href="https://raw.githack.com/ynawhocodes/BarkHistory/develop/css/swiper.css">
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
                    <div class="update-header">
                        <span class="update-title">실시간 HOT</span>
                        <button id="button" onclick="alert('스크랩 추가')"><img src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/src/scrap.png" alt="스크랩"></button>
                    </div>
                    <h2 class="title">${title}</h2>
                    <div class="description">
                        ${description}
                    </div>
                    <div class="reaction">
                        <h4 class="reaction-title">반응 +999</h4>
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
            ${form}
            ${commentList}
            <div id="modal" class="reaction-modal">
                <button onclick="alert('이모지1을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/wtf.png"></button>
                <button onclick="alert('이모지2을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/ohno.png"></button>
                <button onclick="alert('이모지3을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/fine.png"></button>
                <button onclick="alert('이모지4을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/humm.png"></button>
                <button onclick="alert('이모지5을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/kkk.png"></button>
                <button onclick="alert('이모지6을 선택하셨습니다')"><img class="emoji" src="https://raw.githack.com/ynawhocodes/BarkHistory/401623c1f0507f09ace99d3c2f3b5a69583c9d53/emoji/what.png"></button>
                <button type="button" class="btn-close" onclick="onClickClose()">완료</button>
            </div>
        
            <!-- Swiper JS -->
            <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
            <script src="https://raw.githack.com/ynawhocodes/BarkHistory/develop/js/swiper.js"></script>
            <!-- Initialize Swiper -->
            <script src="https://raw.githack.com/ynawhocodes/BarkHistory/develop/js/reaction.js"></script>
        
        </body>
        
        </html>`
    },
    commentList: function (comments) {
        var list = ` <div class="comment-container">`;     
        var i = 0;

        while (i < comments.length) {
            list = list + `<div class="comment-box comment-box__pink">
                                <p>댓글내용: ${comments[i].comment_detail}</p>
                                <p>날짜: ${comments[i].comment_date}</p>
                                <a href="/detail/update">수정</a>
                                <a href="/detail/delete">삭제</a>
                           </div>`
            i += 1;
        }
        list += '</div>';
        return list;
    },
    reactionList: function (reactions) {
        var list = ` <div class="comment-container">`;     
        var i = 0;

        while (i < comments.length) {
            list = list + `<div class="comment-box comment-box__pink">
                                <p>댓글내용: ${comments[i].comment_detail}</p>
                                <p>날짜: ${comments[i].comment_date}</p>
                           </div>`
            i += 1;
        }
        list += '</div>';
        return list;
    }
}