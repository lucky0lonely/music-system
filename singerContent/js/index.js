(function(){
    'use strict';

    init();
    function init(){
        queryStatus();
        bindEvent();
    }


    function bindEvent(){
        $('.attention').on('click',function(){
            this.className.indexOf('active') !== -1 ? this.classList.remove('active') : this.classList.add('active');
            setStorage('status',this.classList[1]);
        });
    };

    function setStorage(name,str){
        if(localStorage.getItem(name)){
            localStorage.setItem(name,str);
        }else{
            localStorage.setItem(name,str);
        }
    }

    function queryStatus(){
        var status = localStorage.getItem('status');
        if(status && status !== 'undefined'){
            $('.attention').addClass(status);
        }
    }




})();