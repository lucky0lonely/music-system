(function (){
    'use strict';
    var songNameEle = '',
        singleNameEle = '',
        music_albumEle = '',
        music_imgEle = '';
    var songArr = [{
            name : '你,好不好?',
            title : '你,好不好?',
            author : '周兴哲',
            album : '《你，好不好?》',
            songImg : 'bin/images/xin.jpg'
        },{
            name : '搁浅',
            title : '搁浅',
            author : '周杰伦',
            album : '《七里香》',
            songImg : 'bin/images/jie.jpg'
        },{
            name : '慢慢喜欢你',
            title : '慢慢喜欢你',
            author : '莫文蔚',
            album : '《我们在中场相遇》',
            songImg : 'bin/images/wen.jpg'
        },{
            name : '年少有为',
            title : '年少有为',
            author : '李荣浩',
            album : '《耳朵》',
            songImg : 'bin/images/rong.jpg'
        },{
            name : '绿色',
            title : '绿色',
            author : '陈雪凝',
            album : '《绿色》',
            songImg : 'bin/images/xue.jpg'
        },{
            name : '刚刚好',
            title : '刚刚好',
            author : '薛之谦',
            album : '《初学者》',
            songImg : 'bin/images/zhi.jpg'
        },{
            name : '我好像在哪见过你',
            title : '我好像在哪见过你',
            author : '薛之谦',
            album : '《初学者》',
            songImg : 'bin/images/zhi.jpg'
        },{
            name : '方圆几里',
            title : '方圆几里',
            author : '薛之谦',
            album : '《意外》',
            songImg : 'bin/images/zhi.jpg'
        },{
            name : '其实',
            title : '其实',
            author : '薛之谦',
            album : '《意外》',
            songImg : 'bin/images/zhi.jpg'
        },{
            name : '下雨了',
            title : '下雨了',
            author : '薛之谦',
            album : '《绅士》',
            songImg : 'bin/images/zhi.jpg'
        },{
            name : '光年之外',
            title : '光年之外',
            author : '邓紫棋',
            album : '《光年之外》',
            songImg : 'bin/images/zi.jpg'
        },{
            name : '喜欢你',
            title : '喜欢你',
            author : '邓紫棋',
            album : '《喜欢你》',
            songImg : 'bin/images/zi.jpg'
        },{
            name : '可惜没如果',
            title : '可惜没如果',
            author : '林俊杰',
            album : '《新地球》',
            songImg : 'bin/images/jun.jpg'
        },{
            name : '修炼爱情',
            title : '修炼爱情',
            author : '林俊杰',
            album : '《因你而在》',
            songImg : 'bin/images/jun.jpg'
        },{
            name : '她说',
            title : '她说',
            author : '林俊杰',
            album : '《她说 概念自选辑》',
            songImg : 'bin/images/jun.jpg'
        },{
            name : 'Alone',
            title : 'Alone',
            author : 'Alan Walker',
            album : '《Alone》',
            songImg : 'bin/images/alan.png'
        },{
            name : '等你下课(with 杨瑞代)',
            title : '等你下课(with 杨瑞代)',
            author : '周杰伦',
            album : '《等你下课》',
            songImg : 'bin/images/jie.jpg'
        },{
            name : '彩虹',
            title : '彩虹',
            author : '周杰伦',
            album : '《我很忙》',
            songImg : 'bin/images/jie.jpg'
        },{
            name : '那个男孩',
            title : '那个男孩',
            author : '汪苏泷',
            album : '',
            songImg : 'bin/images/su.jpg'
        }
    ];
    init();
    function init(){
        songNameEle = document.getElementsByClassName('songName');
        singleNameEle = document.getElementsByClassName('singleName');
        music_albumEle = document.getElementsByClassName('music-album');
        music_imgEle = document.getElementsByClassName('songImg');
        renderData();
    }
    function renderData(){
        for(var i = 0,songArrLen = songArr.length; i < songArrLen; i++){
            songNameEle[i].innerText = songArr[i].name;
            songNameEle[i].title = songArr[i].name;
            singleNameEle[i].innerText = songArr[i].author;
            singleNameEle[i].title = songArr[i].author;
            music_albumEle[i].innerHTML = "专辑 &nbsp;&nbsp; "+songArr[i].album;
            music_albumEle[i].title = songArr[i].album;
            music_imgEle[i].src = songArr[i].songImg;
        }
    }
}());