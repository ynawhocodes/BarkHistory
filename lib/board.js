module.exports = {
    // 카테고리 별 글 목록
    categoryList:function(filelist) {
        var list ='<table><tr>';
        var i = 0;
        while(i < filelist.length) {
            list = list + `<td><a href="/board/${filelist[i].category_id}">${filelist[i].post_title} | ${filelist[i].post_detail} |
            ${filelist[i].post_date} </a></td>`;
            i = i + 1;
        }
        list = list + '</tr></table>';
        return list;
    },


    categorySelect:function(categorys) {
        var tag = '';
        var i = 0;
        while( i < categorys.length) {
            tag += `<option value =${categorys[i].category_id}">${categorys[i].category_name}</option>`;
            i++;
        }
        return `
        <select name ="category">
            ${tag}
        </select>
        `
    }

}