(function(){
    'use strict';
    let localSearchInput = document.getElementsByClassName('localSearchInput')[0],
        pageList = document.getElementsByClassName('pageList-item-href')[0];
    const obj = {};  //哈希数据
    let index = 1,  //分页索引，关键点
        pageCode = 0,   //总共页码
        isCheck = true;  //是否是第一次渲染分页
    init();
    //初始化
    function init() {
        getHash();
        localSearchInput.value = obj.songName;
        dataParams(obj.songName,1);
        bindEvent();
    }
    //获取哈希值
    function getHash(){
        var hash = decodeURI(location.hash.slice(1,location.hash.length));
        if(hash.indexOf('&') === -1)return;
        hash = hash.split('&');
        hash.forEach((item)=>{
            if(item.indexOf('=') === -1)return;
            var temp = item.split('=');
            obj[temp[0]] = temp[1];
        });
    }
    //数据中转站
    window.getData = function getData(data){
        createDOM(data.data.lists);
        if(isCheck){
            isCheck = false;
            page(data.data.total);
        }
    };
    //创建DOM
    function createDOM(data){
        var searchSongList = document.getElementsByClassName('searchSong-list')[0];
        var html = '';
        for(var i = 0, len = data.length; i < len; i++){
            html += `<li class="searchSong-list-item">
                          <div class="songIconWrap">
                               <a href="javascript:void(0)">${data[i].SongName}</a>
                          </div>
                          <span class="album">${data[i].AlbumName}</span>
                          <span class="singer">${data[i].SingerName}</span>
                          <span class="time">${changeTime(data[i].Duration)}</span>
                     </li>`;
        }
        searchSongList.innerHTML = html;
        document.getElementsByClassName('loadingWrap')[0].style.display = 'none';
    }
    //事件转换
    function changeTime(time){
        var m = Math.floor(time / 60),
            s = Math.floor(time % 60);
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;
        return m + ':'+s;
    }
    //绑定事件
    function bindEvent(){
        let btnSearch = document.getElementById('btnSearch'),
            homePage = document.getElementsByClassName('homePage')[0],
            prevPage = document.getElementsByClassName('prevPage')[0],
            nextPage = document.getElementsByClassName('nextPage')[0],
            endPage = document.getElementsByClassName('endPage')[0];
        localSearchInput.onkeydown = function (e) {
            if(e.keyCode === 13){
                getHash();
                location.hash = 'songName='+this.value + '&page=1';
                dataParams(this.value,1);
            }
        };
        btnSearch.onclick = function () {
            getHash();
            location.hash = 'songName='+localSearchInput.value + '&page=1';
            dataParams(localSearchInput.value,1);
        };
        homePage.onclick = function () {
            index = 1;
            tool();
            changeClass(pageList.children,index - 1,'active');
        };
        endPage.onclick = function () {
            index = pageCode;
            tool();
            changeClass(pageList.children,pageList.children.length - 1,'active');
        };
        prevPage.onclick = function () {
            index--;
            if(index <= 0)return;
            tool();
            var num = index - 1 >= 5  && index - 1 < 11 ? (pageList.children.length - 1) / 2 : (index > 11 ? index - (pageList.children.length + 1) : index - 1);
            changeClass(pageList.children,num,'active');
        };
        nextPage.onclick = function () {
            index++;
            if(index > pageCode)return;
            tool();
            var num = index - 1 >= 5  && index - 1 < 11 ? (pageList.children.length - 1) / 2 : (index > 11 ? index - (pageList.children.length + 1) : index - 1);
            changeClass(pageList.children,num,'active');
        }
    }
    //工具
    function tool(){
    	location.hash = 'songName='+localSearchInput.value + '&page='+index;
        dataParams(localSearchInput.value,index);
        reset();
    }
    //改变class类名
    function changeClass(dom,index,name) {
        for(var i = 0 , len = dom.length; i < len; i++){
            dom[i].className = '';
        }
        dom[index].className = name;
    }
    //获取数据
    function dataParams(value,num){
        var script = document.createElement('script');
        script.src = "https://songsearch.kugou.com/song_search_v2?callback=getData&keyword="+value+"&page="+num+"&pagesize=20&userid=-1&_=" + new Date().getTime();
        document.body.appendChild(script);
    }
   	//分页转换站
    function page(total){
        pageCode = Math.floor(total / 20);
        if(pageCode < 2)return;
        renderPage(pageCode);
        document.getElementsByClassName('searchSongPage')[0].style.display = 'block';
    }
    //初始渲染分页
    function renderPage(total){
        var str = '';
        for(var i = 1; i <= total; i++){
            if(i > 5){
                str += `<span class="pageList-item-more">...</span>
                        <a href="javascript:void(0)">${total}</a>`;
                break;
            }
            str += `<a class="${i === 1 ? 'active' : ''}" href=javascript:void(0)>${i}</a>`;
        }
        pageList.innerHTML = str;
        pageChild();
    }
    //分页点击事件
    function pageChild(){
        for(let i = 0; i < pageList.children.length; i++){
            if(pageList.children[i].target.tagName !== 'SPAN'){
                pageList.children[i].onclick = function () {
                   index = +this.innerText;
                   tool();
                   var num = index - 1 >= 5  && index - 1 < 11 ? (pageList.children.length - 1) / 2 : (index > 11 ? index - (pageList.children.length + 1) : index - 1);
                   changeClass(pageList.children,num,'active');
                }
            }
        }
    }
    //重置分页
    function reset(){
        if(index >= 5 && index <= pageCode - 5){
            var str = '';
            var check = true;
            for(let i = 1; i <= pageCode; i++){
                if(i < index - 2 && i != 1){
                    if(check){
                        str += '<span class="pageList-item-more">...</span>';
                        check = false;
                    }
                    continue;
                }else if(i > index + 2 && i != pageCode){
                    if(!check){
                        str += '<span class="pageList-item-more">...</span>';
                        check = true;
                    }
                    continue;
                }
                str += `<a href="index.html#songName=${i}&page=${i}">${i}</a>`;
            }
            pageList.innerHTML = str;
        }else if(index > pageCode - 5){
            var check = true;
            var str = '';
            for(let i = 1; i <= pageCode; i++){
                if(i < pageCode - 5 && i !== 1){
                    if(check) {
                        str += '<span>...</span>';
                        check = false;
                    }
                    continue;
                }
                str += `<a href="index.html#songName=${i}&page=${i}">${i}</a>`;
            }
            pageList.innerHTML = str;
        }else{
            var str = '';
            for(var i = 1; i <= pageCode; i++){
                if(i > 5){
                    str += `<span class="pageList-item-more">...</span>
                        <a href="javascript:void(0)">${pageCode}</a>`;
                    break;
                }
                str += `<a href="javascript:void(0)">${i}</a>`;
            }
            pageList.innerHTML = str;
        }
        pageChild();
    }
}());