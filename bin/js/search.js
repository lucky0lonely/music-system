(function () {
    'use strict';
    let searchInput = document.getElementById('searchInput'),
        searchBtn = document.getElementsByClassName('searchBtn')[0],
        songList = document.getElementsByClassName('songList')[0];
    var value = '';
    bindEvent();
    function bindEvent() {
        searchInput.onkeyup = function () {
            if(this.value === '' || this.value === null)return;
            value = this.value;
            debounce(dataParams,500);
        };
        searchInput.onfocus = function () {
          songList.parentElement.style.display = 'block';
        };
        searchInput.onblur = function () {
            setTimeout(()=>{
                songList.parentElement.style.display = 'none';
            },500);
        };
        searchBtn.onclick = function () {
            if(searchInput.value === '' || searchInput.value === null)return;
            location.href = location.protocol + '//' + location.host + '/musicSystem/bin/list/index.html#songName=' + searchInput.value + '&page=1';
        }
    }
    var timer = null;
    function debounce(fn,delay){
        clearTimeout(timer);
        timer = setTimeout(fn,delay);
    }
    function dataParams(){
        var script = document.createElement('script');
        script.src = "https://songsearch.kugou.com/song_search_v2?callback=getDataSearch&keyword="+value+"&page=1&pagesize=7&userid=-1&_=" + new Date().getTime();
        document.body.appendChild(script);
    }
    function createDOM(data,length){
        if(length === 0)return;
        var html = '';
        for(var i = 0; i < length; i++){
            html += `<li>
                        <div class="song">
                            <a class="songHref" href="./bin/list/index.html#songName=${data[i].SongName}&page=1">
								<span class="songTitle">${data[i].SongName}</span>
							</a>
                        </div>
                     </li>`;
        }
        songList.innerHTML = html;
        songList.parentElement.style.display = 'block';
    }
    window.getDataSearch = function getDataSearch(data){
        createDOM(data.data.lists,data.data.lists.length);
    }
}());
