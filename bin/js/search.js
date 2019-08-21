
    var songList = '',
        searchBtnEle = '';
    init();
    function init(){
        songList = document.getElementsByClassName('songList')[0];
        var songBox = document.getElementsByClassName('songBox')[0],
            searchBtn = document.getElementsByClassName('searchBtn')[0];
        searchBtnEle = searchBtn;
        var temp = true;
        searchInput.onfocus = function(e){
            e = e || window.event;
            e.preventDefault();
            bindEvent();
            temp = false;
            if(this.value === '')return;
            var script = document.createElement('script');
            script.src = "https://songsearch.kugou.com/song_search_v2?callback=retrieval&keyword="+this.value+"&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1557131092693";
            document.body.appendChild(script);
        };
        searchInput.onblur = function () {
            document.onkeypress = null;
            document.onkeydown = null;
            document.onkeyup = null;
            temp = true;
        };
        document.addEventListener('click',function(e){
            e = e || window.event;
            if(temp === true && (e.target.className !== 'song' || e.target.className !== 'songHref')){
                songBox.style.display = 'none';
            }
        });
    }
    function bindEvent(){
        document.getElementsByClassName('songBox')[0].style.display = 'block';
        document.onkeypress = function(e){
            e = e || window.event;
            if((e.charCode >= 48 && e.charCode <= 57) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 65 && e.charCode <= 90)){
                var tempVal = searchInput.value;
                var script = document.createElement('script');
                script.src = "https://songsearch.kugou.com/song_search_v2?callback=retrieval&keyword="+tempVal+"&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1557131092693";
                document.body.appendChild(script);
            }
        };
        document.onkeyup = function(e){
            e = e || window.event;
            if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32){
                var tempVal = searchInput.value;
                // retrieval(tempVal);
                var script = document.createElement('script');
                script.src = "https://songsearch.kugou.com/song_search_v2?callback=retrieval&keyword="+tempVal+"&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1557131092693";
                document.body.appendChild(script);
            }else if(e.keyCode === 9 || e.keyCode === 13 || (e.keyCode >= 16 && e.keyCode <= 20) || e.keyCode === 27 || (e.keyCode >= 33 && e.keyCode <= 36) || (e.keyCode >= 44 && e.keyCode <= 46) || e.keyCode === 91 || e.keyCode === 93 || e.keyCode === (e.keyCode >= 106 && e.keyCode <= 111) || e.keyCode === 144 || e.keyCode === 145 || e.keyCode === 187 || e.keyCode === 189){
                return '';
            }else if(e.keyCode === 8){
                dropEle();
                var tempVal = searchInput.value;
                var script = document.createElement('script');
                script.src = "https://songsearch.kugou.com/song_search_v2?callback=retrieval&keyword="+tempVal+"&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1557131092693";
                document.body.appendChild(script);
                // retrieval(tempVal);
            }else{
                setTimeout(function(){
                    var tempVal = searchInput.value;
                    var script = document.createElement('script');
                    script.src = "https://songsearch.kugou.com/song_search_v2?callback=retrieval&keyword="+tempVal+"&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1557131092693";
                    document.body.appendChild(script);
                    // retrieval(tempVal);
                },500)
            }
        };
        document.onkeydown = function(e){
            e = e || window.event;
            var tempVal = searchInput.value;
            if(tempVal === '' || tempVal === null){
                return;
            }
            if(e.keyCode === 13){
                location.href = location.protocol +'//'+ location.host+'/musicSystem/bin/list/index.html#songName='+tempVal+'&page=1';
            }
        };
        searchBtnEle.onclick = function(e){
            e = e || window.event;
            var tempVal = searchInput.value;
            if(tempVal === '' || tempVal === null){
                return;
            }else{
                location.href = location.protocol + '//'+location.host+'/musicSystem/bin/list/index.html#songName='+tempVal+'&page=1';
            }
        }
    }
    function retrieval(songName){
        document.getElementsByClassName('songBox')[0].style.display = 'block';
        // if(songName === '' || songName === null){
        //     return;
        // }
        var tempArr = [];
        for(var i = 0,songArrLen = songName.data.lists.length; i < songArrLen; i++){
            if(songName.data.lists[i].SongName.indexOf(searchInput.value) !== -1 && songName.data.lists[i].SongName.indexOf(searchInput.value) >= 0) {
                tempArr.push(songName.data.lists[i].SongName);
            }
        }
        createEle(tempArr);
    }
    function createEle(arr){
        if(arr.length === 0){
            return;
        }
        var temp = '';
        for(var i = 0,arrLen = 7; i < arrLen; i++){
            var tempArr = [];
            if(arr[i] === undefined){
                break;
            }
            temp += `<li>
                        <div class="song">
                            <a class="songHref" href="/bin/list/index.html#songName=${arr[i].replace(/<[^>]+>/g," ")}&page=1">
                                <span class="songTitle">${arr[i].replace(/<[^>]+>/g," ")}</span>
                            </a>
                        </div>
                    </li>\n`;
        }
        songList.innerHTML = temp;
    }
    function dropEle(){
        var tempVal = searchInput.value;
        if(tempVal !== ''){
            return;
        }
        songList.innerHTML = '';
        document.getElementsByClassName('songBox')[0].style.display = 'none';
    }