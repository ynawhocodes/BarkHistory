const { post } = require("../routes");

module.exports = {
    //현재 로그인 상태인지 확인
    isOwner:function(request, response) {
        if (request.session.is_logined) {
            return true;
        }
        else {
            return false;
        }
    },

    //로그인 상태를 UI로 표현
    statusUI:function(request, response) { 
        var authStatusUI = '<a href="/auth/signIn">로그인</a> <br> <a href="/auth/signUp">회원가입</a><br><a href="/board/post/1">연애</a>' //로그인 상태를 기본 값으로 초기화
        if(this.isOwner(request, response)) { //현재 로그인 되어있다면 닉네임 + 로그아웃 링크로 바꾸기
            authStatusUI = `${request.session.user_name} | <a href="/mypage">mypage</a> | <a href="/auth/logout">logout</a> |
            <a href ="/board/company/4">회사</a>`;
        }
        return authStatusUI;
    }
    
}