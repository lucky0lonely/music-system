(function(){
    'use strict';
    let bannerList = document.getElementsByClassName('bannerList')[0],
        spotList = document.getElementsByClassName('spotList')[0];
    let index = 0,
        timer = null;
    bindEvent();
    auto();
    function bindEvent(){
        let leftArrow = document.getElementsByClassName('leftArrow_box')[0],
            rightArrow = document.getElementsByClassName('rightArrow_box')[0];

        leftArrow.onclick = function () {
            index--;
            if(index < 0){
                index = spotList.children.length - 1;
            }
            lantern(index);
            auto();
        };
        rightArrow.onclick = function () {
            index++;
            if(index > spotList.children.length - 1){
                index = 0;
            }
            lantern(index);
            auto();
        };
        spotList.onclick = function (e) {
            if(e.target.tagName === 'A'){
                index = [...this.children].indexOf(e.target.parentElement);
                lantern(index);
                auto();
            }
        }
    }
    function lantern(index){
        bannerList.style.left = -(index * bannerList.children[0].offsetWidth) + 'px';
        changeClass(index);
    }
    function changeClass(index) {
        for(var i = 0, len = spotList.children.length; i < len; i++){
            spotList.children[i].firstElementChild.className = 'spot';
        }
        spotList.children[index].firstElementChild.classList.add('active');
    }
    function auto(){
        clearInterval(timer);
        timer = setInterval(()=>{
            index++;
            if(index > bannerList.children.length - 1){
                index = 0;
            }
            lantern(index);
        },5000);
    }
}());