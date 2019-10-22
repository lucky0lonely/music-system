(function(){
    'use strict';

    init();
    function init(){
        var temp = getLocation();
        queryStatus();
        bindEvent();
        queryData(temp.name);
        similarSingerRan();
        document.title = temp.name;
    }

    function bindEvent(){
        $('.attention').on('click',function(){
            this.className.indexOf('active') !== -1 ? this.classList.remove('active') : this.classList.add('active');
            setStorage('status',this.classList[1]);
        });
    };

    function setStorage(name,str){
        if(localStorage.getItem(name)){
            localStorage.setItem(name,str);
        }else{
            localStorage.setItem(name,str);
        }
    }

    function queryStatus(){
        var status = localStorage.getItem('status');
        if(status && status !== 'undefined'){
            $('.attention').addClass(status);
        }
    }

    function queryData(sign){
        if(!sign){
            console.log('输入非法');
            return;
        }
        var temp = [];
        for(var i = 0, len = singerArr.length; i < len; i++){
            if(sign === singerArr[i].name){
                temp.push(singerArr[i]);
            }
        }
        transfer(...temp);
    }

    function transfer(data){
        changeImg(data.singerImg);
        changeTitle(data.name);
        changeDesc({alias : data.alias,nationality : data.nationality, native : data.native})
        songLen(data.song.length);
        albumLen(data.album.length);
        mvLen(0);
        changeSongList(data.song);
    }

    function changeImg(src){
        $('.left_img').attr('src',src);
    }

    function changeTitle(title){
        $('.item_title').text(title);
    }

    function changeDesc(info){
        var frag = document.createDocumentFragment();
        for(var i = 0, len = Object.keys(info).length; i < len; i++){
            var p = document.createElement('p'),
                key = Object.keys(info)[i];
            if(key === 'alias'){
                p.innerText = `别名 : ${info[key]}`;
            }else if(key === 'nationality'){
                p.innerText = `国籍 : ${info[key]}`;
            }else if(key === 'native'){
                p.innerText = `出生地 : ${info[key]}`;
            }
            frag.appendChild(p);
        }
        $('.item_desc').append(frag);
    }

    function songLen(len){
        $('.single_num').text(len);
    }

    function albumLen(len){
        $('.album_num').text(len);
    }

    function mvLen(len){
        $('.mv_num').text(len);
    }

    function changeSongList(data){
        var frag = document.createDocumentFragment();
        for(var i = 0; i < 10; i++){
            var li = document.createElement('li');
            li.className = 'song_list_list_item';
            li.innerHTML = `
                <div class="item_song_box">
                    <div class="item_sign item_songName">
                        <a href="#" class="common song_href">${data[i].name}</a>
                    </div>
                    <div class="item_sign item_albumName">
                        <a href="#" class="common song_alubm">${data[i].album}</a>
                    </div>
                    <div class="item_sign item_time">
                        <span class="common time_sign">${data[i].time}</span>
                    </div>
                </div>
            `;
            frag.appendChild(li);
        }
        $('.song_list_list').append(frag);
    }

    function similarSingerRan(){
        var temp = [],
            loca = getLocation(),
            isSelected = true;
        while(isSelected){
            var index = ran();
            if(loca.name !== singerArr[index].name && temp.indexOf(index) === -1){
                temp.push(index);
            }
            if(temp.length === 6){
                isSelected = false;
            }
        }
        querySinger(temp);
    }

    function querySinger(arr){
        var temp = [];
        for(var i = 0, len = arr.length; i < len; i++){
            temp.push({
                name : singerArr[arr[i]].name,
                img : singerArr[arr[i]].singerImg
            });
        }
        renderSinger(temp);
    }

    function renderSinger(arr){
        var frag = document.createDocumentFragment();
        for(var i = 0, len = arr.length ; i < len; i++){
            var li = document.createElement('li');
            li.className = 'similar_list_item';
            li.innerHTML = `
                <div class="singer">
                    <img src="${arr[i].img}"
                        alt="">
                    <p class="sing_name">${arr[i].name}</p>
                </div>
            `;
            frag.appendChild(li);
        }
        $('.similar_list').append(frag);
    }

    function ran(){
        return Math.floor(Math.random() * singerArr.length);
    }


})();