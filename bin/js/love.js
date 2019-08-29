(function(){
    'use strict';
    let love = document.getElementsByClassName('love')[0],
        fixed_musicInfo_songName = document.getElementsByClassName('fixed-musicInfo-songName')[0],
        musicPlay = document.getElementById('musicPlay');

    musicPlay.addEventListener('canplay',()=>{
        var name = fixed_musicInfo_songName.innerText;
        let loving = getData(name);
        changeClass(loving);
    });
    love.onclick = changeLove;
    function changeLove(){
        if(musicPlay.src === "")return;
        var name = fixed_musicInfo_songName.innerText;
        let loving = getData(name);
        if(loving === undefined){
            loving = false;
        }
        loving = !loving;
        changeClass(loving);
        getLove(name,loving);
    }
    function changeClass(loving){
        love.classList.remove(love.classList[2]);
        if(loving){
            love.classList.add('likeIcon');
        }else{
            love.classList.add('default');
        }
    }
    function getData(name){
        var love = localStorage.getItem('love');
        if(love){
            var arr = JSON.parse(love);
            for(var i = 0; i < arr.length; i++){
                if(arr[i].name === name){
                    return arr[i].loving;
                }
            }
        }else{
            return false;
        }
    }
    function getLove(name,loving){
        var love = localStorage.getItem('love');
        if(love === null){
            localStorage.setItem('love','[]');
            localStorage.setItem('love',JSON.stringify(record(name,loving)));
        }else{
            localStorage.setItem('love',JSON.stringify(record(name,loving)));
        }
    }
    function record(name,love){
        var temp = JSON.parse(localStorage.getItem('love'));
        if(temp.length <= 0){
            temp.push({name,loving : love});
            return temp;
        }
        for(var i = 0; i < temp.length; i++){
            if(typeof temp[i] === 'object' && temp[i].name === name){
                temp[i].loving = love;
            }else{
                temp.push({name,loving : love});
            }
        }
        return temp;
    }

}());
