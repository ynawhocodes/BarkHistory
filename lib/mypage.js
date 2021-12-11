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
    }
}