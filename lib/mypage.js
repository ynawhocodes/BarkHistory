module.exports = {
    //글 목록
    list:function(filelist) {
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length) {
            //합칠 때 경로 수정 필요!!
            list = list + `<li><a href="/post/${filelist[i].post_id}">${filelist[i].post_title} | ${filelist[i].post_date} 
            | ${filelist[i].post_detail} | ${filelist[i].post_emotion_number} </a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        return list;
    },

    //스크랩 글 목록
    scrapList:function(filelist) {
        var list = '';
        var i = 0;
        while(i < filelist.length) {
            //합칠 때 경로 수정 필요!!
            list = list + `<li><a href="/post/${filelist[i].post_id}">${filelist[i].post_title} | ${filelist[i].post_date} 
            | ${filelist[i].post_detail} | ${filelist[i].post_emotion_number} </a></li>`;
            i = i + 1;
        }
        return list;
    },
    
    //지우개 글 목록
    eraserList:function(filelist) {
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length) {
            list = list + `<li><a href="/mypage/eraser/detail/${filelist[i].eraser_id}">${filelist[i].eraser_title} | ${filelist[i].eraser_date} 
            | ${filelist[i].eraser_detail} </a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        return list;
    }
}