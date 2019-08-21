(function(){
    'use strict';
    var bannerLeftArr = [],
        bannerEle = '',
        spotEle = '',
        index = 0,
        maxLeft = 0,
        isBanner = true,
        Eletimer = null;
    readyState();
    function readyState(){
        var temp = null;
        clearInterval(temp);
        temp = setInterval(function(){
            if(document.readyState == 'complete'){
                init();
                clearInterval(temp);
                return;
            }
        },1000)
    }
    function init(){
        var bannerLi = document.getElementsByClassName('bannerLi'),
            spot = document.getElementsByClassName('spot');
        bannerEle = bannerLi;
        spotEle = spot;
        bindEvent();
        for(var i = 0,bannerLen = bannerLi.length; i < bannerLen; i++){
            bannerLeftArr.push(bannerLi[i].offsetLeft);
        }
        maxLeft = Math.max.apply(null,bannerLeftArr) - bannerEle[0].offsetWidth;
        bannermove('left');
    }
    /*事件绑定*/
    function bindEvent(){
        var bannerWrap = document.getElementsByClassName('banner')[0],
            leftArrow = document.getElementsByClassName('leftArrow_box')[0],
            rightArrow = document.getElementsByClassName('rightArrow_box')[0];
        bannerWrap.onmouseover = function(e){
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            clearInterval(Eletimer);
        };
        bannerWrap.onmouseout = function(e){
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            bannermove('left');
        };
        leftArrow.onclick = function(e){
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            if(isBanner){
                index++;
                if(index > spotEle.length - 1){
                    index = 0;
                }
                banner('left',index);
                isBanner = false;
            }
            setTimeout(function(){
                isBanner = true;
            },600);
        };
        rightArrow.onclick = function(e){
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            if(isBanner){
                index--;
                if(index < 0){
                    index =  spotEle.length - 1;
                }
                banner('right',index);
                isBanner = false;
            }
            setTimeout(function(){
                isBanner = true;
            },600);
        };
        for(var i = 0,spotLen = spotEle.length; i < spotLen; i++){
            spotEle[i].index = i;
            spotEle[i].onclick = function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                index = this.index;
                banner(null,this.index);
            }
        }
    }
    /*图片轮播*/
    function banner(direction,index){
        for(var i = 0,bannerLen = bannerEle.length; i < bannerLen; i++){
            spotEle[i].classList.remove('active');
            if(direction === 'left'){
                bannerEle[i].style.left = bannerEle[i].offsetLeft - bannerEle[0].offsetWidth + 'px';
                bannerEle[i].style.zIndex = '999';
                if(parseInt(bannerEle[i].offsetLeft) === -parseInt(bannerEle[0].offsetWidth)){
                    bannerEle[i].style.left = maxLeft + "px";
                    bannerEle[i].style.zIndex = '666';
                }
                spotEle[index].classList.add('active');
            }else if(direction === 'right'){
                bannerEle[i].style.left = bannerEle[i].offsetLeft + bannerEle[0].offsetWidth + 'px';
                bannerEle[i].style.zIndex = '999';
                if(parseInt(bannerEle[i].offsetLeft) > maxLeft){
                    bannerEle[i].style.left = '0px';
                    bannerEle[i].style.zIndex = '666';
                }
                spotEle[index].classList.add('active');
            }else{
                if(index !== undefined && typeof index === 'number' && direction === null || direction === ''){
                    if(index === 0){
                        var temp = [0,1125,2250,3375];
                        bannerEle[i].style.left = temp[i] + 'px';
                    }else if(index === 1){
                        var temp = [-1125,0,1125,2250];
                        bannerEle[i].style.left = temp[i] + 'px';
                    }else if(index === 2){
                        var temp = [2250,-1125,0,1125];
                        bannerEle[i].style.left = temp[i] + 'px';
                    }else if(index === 3){
                        var temp = [1125,2250,-1125,0];
                        bannerEle[i].style.left = temp[i] + 'px';
                    }else{
                        console.log('值不对');
                    }
                    spotEle[index].classList.add('active');
                }
                else{
                    alert('index不能为空以及不能为字符串!');
                }
            }
        }
    }
    /*定时轮播*/
    function bannermove(direction){
        clearInterval(Eletimer);
        Eletimer = setInterval(function(){
            index++;
            if(index > spotEle.length - 1){
                index = 0;
            }
            banner(direction,index);
        },6000);
    }
    var lazyload = $.noConflict();
    lazyload(function(){
        lazyload('img').lazyload({
            placeholder : 'bin/images/loading.png'
        });
    });
    window.onload = function(){
        var script = document.createElement('script');
        script.src = './bin/js/singer.js';
        document.body.appendChild(script);
    };
    console.log(navigator.onLine);
}());