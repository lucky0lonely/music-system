(function(){
	'use strict';
	var fixedMusicWrap = document.getElementsByClassName('fixedMusicWrap')[0],
        fixed_showImg = document.getElementsByClassName('fixed-showImg')[0],
        fixed_musicInfo_songName = document.getElementsByClassName('fixed-musicInfo-songName')[0],
        fixed_musicInfo_singerName = document.getElementsByClassName('fixed-musicInfo-singerName')[0],
        prevBtn = document.getElementsByClassName('prevBtn')[0],
        controlPlay = document.getElementsByClassName('controlPlay')[0],
        nextBtn = document.getElementsByClassName('nextBtn')[0],
        prevSongName = document.getElementsByClassName('prevSongName')[0],
        nextSongName = document.getElementsByClassName('nextSongName')[0],
        currentTime = document.getElementsByClassName('currentTime')[0],
        durationTime = document.getElementsByClassName('durationTime')[0],
        love = document.getElementsByClassName('love')[0],
        listIcon = document.getElementsByClassName('listIcon')[0],
        progressBar = document.getElementsByClassName('progressBar')[0],
        progressBarMove = document.getElementsByClassName('progressBarMove')[0],
        progressBarSpot = document.getElementsByClassName('progressBarSpot')[0],
        musicPlay = document.getElementById('musicPlay'),
        volumeWrap = document.getElementsByClassName('volumeWrap')[0],
        volumeBar = document.getElementsByClassName('volumeBar')[0],
        volumeBarMove = document.getElementsByClassName('volumeBarMove')[0],
        volumeBarSpot = document.getElementsByClassName('volumeBarSpot')[0],
        volumes = document.getElementsByClassName('volume')[0],
        playMusic = document.getElementsByClassName('playMusic'),
        fixedMusicList = document.getElementsByClassName('fixedMusicList')[0],
        listMusicIcon = document.getElementsByClassName('listMusicIcon')[0],
        musicList = document.getElementsByClassName('musicList')[0];

	var playing = true,
        index = 0,
        loving = true,
        listing = true,
        voluming = true,
        moving = true,
        volumeNum = 0,
        musicArr = [];
	init();
    musicPlay.volume = 0.5;
	function init(){
        setTimeout(()=>{
            changeMove(50);
            bindEvent();
        },1000);
    }
	function bindEvent(){
	    var temp = true;
	    var tempLeftTime = null;
        document.onmousemove = function(e){
            e = e || window.event;
            var temp = document.documentElement.clientHeight;
            if(e.clientY > temp - 50){
                fixedMusicWrap.style.bottom = '0px';
            }else{
                if(moving){
                    fixedMusicWrap.style.bottom = -(fixedMusicWrap.offsetHeight) + 'px';
                }
            }
        };
        fixedMusicWrap.onmouseover = function(e){
          moving = false;
        };
        fixedMusicWrap.onmouseleave = function(e){
            moving = true;
            if(!moving){
                fixedMusicWrap.style.bottom = -(fixedMusicWrap.offsetHeight) + 'px';
            }
        };
        controlPlay.onclick = function(e){
			changePlay('play');
		};
        prevBtn.onclick = function(e){
        	index--;
        	if(index < 0){
        	    index = musicArr.length - 1;
            }
            autoMusic(index);
            changePlay();
        };
        nextBtn.onclick = function(e){
            index++;
        	if(index > musicArr.length - 1){
        	    index = 0;
            }
            autoMusic(index);
            changePlay();
        };
        musicPlay.addEventListener('ended',function(){
            index++;
            if(index > musicArr.length - 1){
                index = 0;
            }
            autoMusic(index);
        },false);
        musicPlay.addEventListener('waiting',function(){
            console.log('waiting');
        },false);
        musicPlay.addEventListener('error',function(){
            console.log('error');
        },false);
        musicPlay.addEventListener('canplay',function(){
            console.log('canplay');
            if(!playing){

            }
        },false);
        love.onclick = function(){
            love.classList.remove(love.classList[2]);
            if(loving){
                love.classList.add('likeIcon');
            }else{
                love.classList.add('default');
            }
            loving = !loving;
        };
        listIcon.onclick = function () {
            if(listing){
                fixedMusicList.style.left = '0px';
            }else{
                fixedMusicList.style.left = '-157px';
                clearTimeout(tempLeftTime);
            }
            listing = !listing;
            tempLeftTime = setTimeout(function(){
                fixedMusicList.style.left = '-157px';
                clearTimeout(tempLeftTime);
            },5000)
        };
        volumeWrap.onmouseover = function(e){
            e = e || window.event;
            fixedMusicWrap.style.bottom = '0px';
            volumeBar.style.opacity = '1';
        };
        volumeWrap.onmouseleave = function(e){
            e = e || window.event;
            if(temp){
                volumeBar.style.opacity = '0';
            }
        };
        volumes.onclick = function(){
            this.classList.remove(this.classList[2]);
            if(voluming){
                this.classList.add('noVolume');
            }else{
                this.classList.add('volumeDefault');
            }
            voluming = !voluming;
        };
        var disY = volumeNum,
            y = 0;
        volumeBarSpot.onmousedown = function (e) {
            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var curY = e.clientY - this.offsetWidth;
            temp = false;
            volumeBarSpot.onmousemove = function(e){
                e = e || window.event;
                var lastY = e.clientY - volumeBarSpot.offsetWidth;
                y = (curY - lastY) + disY;
                changeMove(y);
            };
            document.onmouseup = function(e){
                e = e || window.event;
                disY = y;
                temp = true;
                volumeBarSpot.onmousemove = null;
                document.onmouseup = null;
            }
        };
        volumeBar.onmousedown = function(e){
            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var curY = (fixedMusicWrap.offsetTop + volumeWrap.offsetTop) - e.clientY;
            disY = curY;
            changeMove(curY);
        };
        var disX = 0,
            x = 0;
        progressBarSpot.onmousedown = function(e){
            e = e || window.event;
            e.stopPropagation();
            if(musicPlay.src == '')return;
            var curX = e.clientX - progressBar.offsetLeft;
            progressBarSpot.onmousemove = function(e){
                e = e || window.event;
                var lastX = e.clientX - progressBar.offsetLeft;
                x = (lastX - curX) + disX;
                changeBar(x);
            };
            document.onmouseup = function(e){
                e = e || window.event;
                disX = x;
                progressBarSpot.onmousemove = null;
                document.onmouseup = null;
            }
        };
        progressBar.onmousedown = function(e){
            e = e || window.event;
            if(musicPlay.src == '')return;
            var curX = e.clientX - (this.offsetLeft + fixedMusicWrap.offsetLeft);
            changeBar(curX);
            disX = curX;
        };
        fixedMusicList.onmouseover = function(e){
            e = e || window.event;
            this.style.left = '0px';
            listing = false;
            clearTimeout(tempLeftTime);
        };
        fixedMusicList.onmouseleave = function(e){
            e = e || window.event;
            this.style.left = '-157px';
            listing = true;
        };
        indexOfMusic();
	}
	function indexOfMusic(){
	    var tempNum = 0;
	    for(var i = 0, len = playMusic.length; i < len; i++){
            playMusic[i].index = i;
            playMusic[i].onclick = function(e){
                var tempIndex = this.index;
                var temp = e.path[3].children[1].children[0].innerText;
                var singer = e.path[3].children[1].children[1].innerText;
                for(var i = 0,songLen = songArr.length; i < songLen; i++){
                    if(songArr[i].songUrl.indexOf(temp) != -1){
                        if(tempNum == this.index){
                            tempNum = this.index;
                        }else{
                            musicArr.push({url : songArr[i].songUrl,name : songArr[i].name,author : songArr[i].author,img : songArr[i].songImg});
                            listMusic(musicArr);
                        }
                    }
                }
                tempNum = tempIndex;
            }
        }
    }
    function listMusic(arr){
	    if(arr.length == 0)return;
	    var temp = '';
	    for(var i = 0,len = arr.length; i < len; i++){
	        temp += `<li>
                        <a class="listSongName" href="javascript:void(0)" title="${arr[i].name}">${arr[i].name}</a>
                        <a class="listSinger" href="javascript:void(0)" title="${arr[i].author}">${arr[i].author}</a>
                    </li>`;
        }
        musicList.innerHTML = temp;
        listClick();
        musicPlaying();
    }
    function listClick(){
        var listSongName = document.getElementsByClassName('listSongName'),
            listSinger = document.getElementsByClassName('listSinger');
        for(var i = 0, len = listSongName.length; i < len; i++){
            listSongName[i].index = i;
            listSinger[i].index = i;
            listSongName[i].onclick = function(){
                musicSrc(this.index);
                index = this.index;
                musicPlaying();
            };
            listSinger[i].onclick = function(){
                musicSrc(this.index);
                index = this.index;
                musicPlaying();
            }
        }
    }
    function autoMusic(num){
        if(musicArr[num] == null){
            controlPlay.classList.remove(controlPlay.classList[2]);
            controlPlay.classList.add('playBtn');
            musicPlay.pause();
            playing = false;
            return;
        }
        fixed_showImg.src = musicArr[num].img;
        fixed_musicInfo_songName.innerText = musicArr[num].name;
        fixed_musicInfo_singerName.innerText = musicArr[num].author;
        musicSrc(num);
        musicPlay.play();
        musicPlaying();
    }
	function changeBar(num){
        if(num >= progressBar.offsetWidth - progressBarSpot.offsetWidth){
            num = progressBar.offsetWidth - progressBarSpot.offsetWidth;
        }
        if(num <= 0){
            num = 0;
        }
        musicPlay.currentTime = Math.floor((num * musicPlay.duration) / (progressBar.offsetWidth - progressBarSpot.offsetWidth));
        progressBarSpot.style.left = num + 'px';
        progressBarMove.style.width = num + progressBarSpot.offsetWidth + 'px';
    }
    function changeMove(num){
        if(num >= volumeBar.offsetHeight - volumeBarSpot.offsetHeight){
            num = volumeBar.offsetHeight - volumeBarSpot.offsetHeight;
        }
        if(num <= 0){
            num = 0;
        }
        musicPlay.volume = (num + volumeBarSpot.offsetHeight) / 100;
        volumeBarSpot.style.bottom = num + 'px';
        volumeBarMove.style.height = num + volumeBarSpot.offsetHeight + '%';
        volumeNum = num;
    }
    function changePlay(target){
        if(musicPlay.src == '')return;
        var temp = controlPlay.classList[2];
        if(temp !== 'pauseBtn'){
            controlPlay.classList.remove(temp);
            playing = false;
            controlPlay.classList.add('pauseBtn');
            musicPlay.play();
            musicPlay.volume = 0.4;
            return;
        }
        if(target === 'play'){
            controlPlay.classList.remove(temp);
            controlPlay.classList.add('playBtn');
            spotMove();
            musicPlay.pause();
            playing = !playing;
        }
    }
    function musicSrc(num){
        musicPlay.src = musicArr[num].url;
        changePlay();
    }
    function musicPlaying(){
        if(musicPlay.src == ''){
            musicSrc(index);
        }
        musicArr.length - 1 >= 1 ? (index >= 1 ? (index == musicArr.length - 1 ? (prevSongName.innerText = musicArr[index - 1].name,nextSongName.innerText = musicArr[(musicArr.length - 1) - index].name) : (prevSongName.innerText = musicArr[index - 1].name,nextSongName.innerText = musicArr[index + 1].name)) : (prevSongName.innerText='',nextSongName.innerText = musicArr[index + 1].name)) : '';
        fixed_musicInfo_songName.innerText = musicArr[index].name;
        fixed_musicInfo_singerName.innerText = musicArr[index].author;
        spotMove();
    }
    function spotMove(){
        musicPlay.addEventListener('timeupdate',function(){
            var temp = musicPlay.currentTime / musicPlay.duration * progressBar.offsetWidth;
            var tempNum = (temp - progressBarSpot.offsetWidth) < -3 ? -3 : temp - progressBarSpot.offsetWidth;
            progressBarSpot.style.left = tempNum + 'px';
            progressBarMove.style.width = temp + 'px';
            currentTime.innerText = changeTime(musicPlay.currentTime);
        },false);
        musicPlay.addEventListener('canplay',function () {
            durationTime.innerText = changeTime(musicPlay.duration);
        });
    }
    function changeTime(time){
        var minute = Math.floor(time / 60),
            second = Math.floor(time % 60);
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
}());