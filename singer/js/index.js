(function ($,root) {
    'use strict';
    var charList = document.getElementsByClassName('charList')[0],
        areaList = document.getElementsByClassName('areaList')[0],
        typeList = document.getElementsByClassName('typeList')[0];
    let recordObj = {
        word : 'all',
        area : 'all',
        sex : 'all'
    };
    bindEvent();
    function bindEvent(){
        eventProxy(charList,'hotTag','word');
        eventProxy(areaList,'all','area');
        eventProxy(typeList,'all','sex');
    }
    function eventProxy(ele,className,sign){
        ele['onclick'] = function (e) {
            var target = e.target,
                arr = [...ele.children],
                type = target.dataset;
            if(target.tagName.toLocaleLowerCase() === 'a'){
                changeClass(target.parentElement.parentElement,className,arr.indexOf(target.parentElement));
                if(sign === 'word'){
                    recordObj.word = target.innerText === '热门' ? 'all' : target.innerText;
                }else if(sign === 'area'){
                    recordObj.area = type.area !== undefined ? type.area : '';
                }else if(sign === 'sex'){
                    recordObj.sex = type.sex !== undefined ? type.sex : '';
                }
                root.render(recordObj,sign);
            }
        }
    }
    function changeClass(ele,className,index){
        var len = ele.children.length,
            dom = ele.children;
        for(var i = 0; i < len; i++){
            dom[i].classList.remove(className);
        }
        dom[index].classList.add(className);
    }
}(window,window.music || (window.music = {})));