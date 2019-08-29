(function(){
    'use strict';
    let musicPlay = document.getElementById('musicPlay'),
        volumeWrap = document.getElementsByClassName('volumeWrap')[0],
        volumeBar = document.getElementsByClassName('volumeBar')[0],
        volumeBarMove = document.getElementsByClassName('volumeBarMove')[0],
        volumeBarSpot = document.getElementsByClassName('volumeBarSpot')[0],
        volumes = document.getElementsByClassName('volume')[0],
        fixedMusicWrap = document.getElementsByClassName('fixedMusicWrap')[0];

        let voluming = true,
        volumeNum = 0;

    musicPlay.volume = 0.5;
    setTimeout(()=>{
        changeMove(50);
        bindEvent();
    },1000);
    function bindEvent(){
        var temp = true;
        var disY = volumeNum,
            y = 0;
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
                musicPlay.volume = 0;
            }else{
                this.classList.add('volumeDefault');
                musicPlay.volume = changeMove(disY);
            }
            voluming = !voluming;
        };
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
}());