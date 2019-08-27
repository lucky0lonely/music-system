(function ($,root) {
    let infoList = document.getElementsByClassName('infoList')[0];
    init();
    function init() {
        var htmlStr = '';
        for(var i = 0, len = singerArr.length; i < len; i++){
            htmlStr += `<li class="infoList-item">
                            <div class="infoList-box">
                                <a href="http://localhost:63342/musicSystem/singerContent/index.html?name=${singerArr[i].name}">
                                    <img src="${singerArr[i].singerImg}" alt="">
                                </a>
                                <p>${singerArr[i].name}</p>
                            </div>
                        </li>`;
        }
        infoList.innerHTML = htmlStr;
    }
    function render(word,sign) {
        if(sign === 'area')sign = 'nation';
        getContent(Object.assign({},word),sign);
    }
    function getContent(word,sign) {
        var tempArr = [];
        var checked = false;
        if(word.area === '')checked = true;
        if(word.area ==='all')word.area = '';
        if( word.sex === 'all')word.sex = '';
        if( word.word === 'all')word.word = '';
        console.log(word);
        for(var i = 0 , len = singerArr.length; i < len; i++){
            if(singerArr[i].word.indexOf(word.word) >= 0 && singerArr[i].nation.indexOf(word.area) >= 0 && singerArr[i].sex.indexOf(word.sex) >= 0){
                if(word.sex === '' && word.area === ''){
                    tempArr.push(singerArr[i]);
                }else if(singerArr[i].sex === word.sex){
                    if(!checked){
                        tempArr.push(singerArr[i]);
                    }else{
                        if(singerArr[i].nation === word.area){
                            tempArr.push(singerArr[i])
                        }
                    } 
                }
            }
        }
        renderContent(tempArr);
    }
    function renderContent(arr){
        var htmlStr = '';
        for(var i = 0, len = arr.length; i < len; i++){
            htmlStr += `<li class="infoList-item">
                            <div class="infoList-box">
                                <a href="http://localhost:63342/musicSystem/singerContent/index.html?name=${arr[i].name}">
                                  <img src="${arr[i].singerImg}" alt="">
                                </a>
                                <p>${arr[i].name}</p>
                            </div>
                        </li>`;
        }
        infoList.innerHTML = htmlStr;
    }
    root.render = render;
})(window,window.music || (window.music = {}));