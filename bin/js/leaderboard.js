(function(){
    var fashion = [
        {
            song : '笑场',
            singer : '薛之谦'
        },
        {
            song : '关不上的窗',
            singer : '周传雄'
        },
        {
            song : '来自天堂的魔鬼',
            singer : 'G.E.M. 邓紫棋'
        },
        {
            song : '小欢喜',
            singer : '刘瑞琦'
        },
        {
            song : 'Fall',
            singer : '易烊千玺'
        },
        {
            song : '嚣张',
            singer : 'en'
        },
        {
            song : 'I Warned Myself',
            singer : 'Charlie Puth'
        },
        {
            song : '念旧',
            singer : '阿悠悠'
        },
        {
            song : '小半',
            singer : '陈粒'
        }
    ];
    var EA = [
        {
            song : 'I Forgot That You Existed',
            singer : 'Taylar Swift'
        },
        {
            song : 'Cruel Summer',
            singer : 'Taylor Swift'
        },
        {
            song : 'The Man',
            singer : 'Taylor Swift'
        },
        {
            song : 'Lover',
            singer : 'Taylor Swift'
        },
        {
            song : 'I Think He Knows',
            singer : 'Taylor Swift'
        },
        {
            song : 'You Need To Calm Down (Clean Bandit Remix)',
            singer : 'Taylor Swift / Clean Bandit'
        },
        {
            song : 'London Boy',
            singer : 'Taylor Swift'
        },
        {
            song : "It's Nice To Have A Friend",
            singer : 'Taylor Swift'
        },
        {
            song : 'Afterglow',
            singer : 'Taylor Swift'
        }
    ];
    var newSong = [
        {
            song : '第一次告白',
            singer : 'TFBOYS'
        },
        {
            song : '这么久没见',
            singer : '薛之谦'
        },
        {
            song : '易碎的吻',
            singer : '王源'
        },
        {
            song : '告白前一秒',
            singer : '永彬Ryan.B'
        },
        {
            song : '十八',
            singer : '陈雪凝'
        },
        {
            song : '对的时间点',
            singer : '林俊杰'
        },
        {
            song : '巅峰之上',
            singer : '毛不易'
        },
        {
            song : '如虹',
            singer : '陈雪凝 / UNINE夏瀚宇'
        },
        {
            song : '柔',
            singer : '王源'
        }
    ];

    leaderBorad(fashion,'popularWrap','popular','popularWrap-list');
    leaderBorad(EA,'foreignSong','foreignSong','foreignSong-list');
    leaderBorad(newSong,'newSong','newSong','newSong-list');
    function leaderBorad(data,className,childName,el){
        let dom = document.getElementsByClassName(el)[0];
        var html = '';
        for(var i = 0, len = data.length; i < len; i++){
            html += `
                <li class="${className}-list-item">
                    <div class="${className}-list-item-box">
                         <span class="num">${i+1}、</span>
                              <a href="javascript:void(0)">
                                   <span class="${childName}-songName">${data[i].song}</span>
                              </a>
                              <a class="${childName}-single-item" href="javascript:void(0)">
                                   <span class="${childName}-singleName">${data[i].singer}</span>
                              </a>
                    </div>
                </li>
            `;
        }
        dom.innerHTML = html;
    }
}());