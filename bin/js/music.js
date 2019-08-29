let playMusic = document.getElementsByClassName('playMusic');
indexOfMusic();
function indexOfMusic(){
    var tempNum = -1;
    for(var i = 0, len = playMusic.length; i < len; i++){
        playMusic[i].index = i;
        playMusic[i].onclick = function(e){
            var tempIndex = this.index;
            var temp = e.path[3].children[1].children[0].innerText;
            // var singer = e.path[3].children[1].children[1].innerText;
            for(var i = 0,songLen = songArr.length; i < songLen; i++){
                if(songArr[i].name.indexOf(temp) != -1 && songArr[i].name === temp){
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
