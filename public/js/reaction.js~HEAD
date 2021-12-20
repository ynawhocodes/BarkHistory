var modal = document.getElementById('modal');

function onClickPlus() {
    modal.classList.add('modal-open');
}
function onClickClose() {
    modal.classList.remove('modal-open');
}
BgColor = {
    emoji01: '#ff5c5b',
    emoji02: '#68c0fe',
    emoji03: '#faff0',
    emoji04: '#00bb07',
    emoji05: '#5a76fe',
    emoji06: '#b301b7'
};

function setBgColor(id) {
    console.log('psetBgColor');
    console.log(id);
    if(id === 'emoji01') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji01;
    }
    else if(id === 'emoji02') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji02;
    }
    else if(id === 'emoji03') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji03;
    }
    else if(id === 'emoji04') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji04;
    }
    else if(id === 'emoji05') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji05;
    }
    else if(id === 'emoji06') {
        document.getElementById('comment-box__setBgColor').style.backgroundColor = BgColor.emoji06;
    }
}
function putEmoji(clickedID) {
    console.log('putEmoji');
    console.log('>>' + clickedID);
    setBgColor(clickedID);
}