(function(){
    'use strict';
    var mvArr = [
        {
            singer : '尤长靖',
            song : '一颗星的夜',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M1020045kjFS0Llr9X.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/x0032kpq19x.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '钟汉良',
            song : '嘿，你还好吗 (《我在未来等你》电视剧人生主题曲)',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M1010029AGxM3gHIJp.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/x0032u50zc7.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '刘力扬',
            song : '动物世界',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M1010003Dify0sRD2f.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/t0032bcduz7.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : 'Lewis Capaldi',
            song : 'Someone You Loved',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M101001ADLPO2NlXRB.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/z0032g8fjrb.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '张哲瀚',
            song : '光',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M101002h5AbZ1rxFbR.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/s0032263lw8.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '러비',
            song : 'How Do I Say ',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M000004AUrFE0qz9aQ.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/a0032s2ao3w.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '贰婶',
            song : '三藏',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M000000EO8I33bnr5Y.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/g0032rmxtva.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '云の泣',
            song : '画蝶-记·天行九歌·紫女',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M000004gH0Zv1tTs6H.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/k0032watx1k.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '渕上舞',
            song : 'Love Summer！',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M000001bjV2m42hjXq.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/g0032h416yd.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '선미',
            song : '날라리 (LALALAY)',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M10100452bi80sHavr.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/v00328iobix.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '陈雪燃',
            song : '燃烧的执着 (《善始善终》电视剧主题曲)',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M101002StNsy2nwZKP.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/n0032yfzxca.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : 'Ava Max',
            song : 'Torn',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M1010037AajP23mcpd.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/f00320ubn3u.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : 'ヨルシカ',
            song : 'ノーチラス',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M101001Jz4wY3RQJkL.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/a0032k3vxl3.html#stat=y_new.index.mv.play_btn'
        },
        {
            singer : '李玟',
            song : '断了',
            img : 'https://y.gtimg.cn/music/photo_new/T015R640x360M101001ldep83iiuM3.jpg?max_age=2592000',
            url : 'https://y.qq.com/n/yqq/mv/v/y0032uvk1tt.html#stat=y_new.index.mv.play_btn'
        }
    ];
    render();
    function render(){
        let mv_list = document.getElementsByClassName('mv-list')[0];
        var html = '';
        for(var i = 0, len = mvArr.length; i < len; i++){
            html += `
                <li class="mv-list-item">
                     <div class="mv-list-item-box">
                          <a href="${mvArr[i].url}">
                               <img src="${mvArr[i].img}" width="640" height="360" alt="${mvArr[i].song}">
                               <span class="publicIcon playBg"></span>
                          </a>
                          <a class="mv-content-hover" href="javascript:void(0)">
                               <span class="mv-songName">${mvArr[i].song}</span>
                          </a>
                          <a class="mv-content-hover" href="javascript:void(0)">
                                <span class="mv-singleName">${mvArr[i].singer}</span>        
                          </a>                    
                     </div>           
                </li>           
            `;
        }
        mv_list.innerHTML = html;
    }
}());