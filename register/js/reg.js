(function (){
    var reg = document.getElementsByClassName('register')[0],
        username = document.getElementsByClassName('username')[0],
        password = document.getElementsByClassName('password')[0],
        phone = document.getElementsByClassName('phone')[0],
        safeCodes = document.getElementsByClassName('safeCode')[0],
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        cW = canvas.width,
        cH = canvas.height,
        safe = '';
    var strCodeArr = [1,2,3,4,5,6,7,8,9,
                    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
    bindEvent();
    function bindEvent(){
        safeCode();
        canvas.onclick = function(){
            safe = '';
            safeCode();
        };
        reg.onclick = function(e){
            regForm(e);
        }
    }
    function safeCode(){
        var tempLen = strCodeArr.length - 1,
            temp = 0,
            x = 0,
            y = 0;
        ctx.clearRect(0,0,cW,cH);
        ctx.strokeRect(0,0,cW,cH);
        for(var i = 0; i < 4; i++){
            temp = Math.floor(Math.random() * tempLen);
            safe += strCodeArr[temp];
            x = cW / 6 + 10;
            y = cH / 3 + 14;
            ctx.fillStyle = "#dedede";
            ctx.font = "24px 楷体";
            ctx.fillText(safe,x,y);
        }
        for(var i = 0; i < 9; i++){
            ctx.beginPath();
            ctx.strokeStyle = colorRandom();
            ctx.moveTo(Math.random() * cW, Math.random() * cH);
            ctx.lineTo(Math.random() * cW, Math.random() * cH);
            ctx.stroke();
        }
    }
    function colorRandom(){
        var r = Math.floor(Math.random() * 256),
            g = Math.floor(Math.random() * 256),
            b = Math.floor(Math.random() * 256);
        return 'rgb('+r+','+ g+','+ b +')';
    }
    function regForm(e) {
        var telephone = phone.value;
        var date = new Date();
        date.setTime(date.getTime() +(100 * 24 * 60 * 60 * 1000));
        if(username.length > 4 && username.length < 12){
            console.log('用户名长度不够');
            e.preventDefault();
        }
        if(password.length > 8 && password.length < 16){
            console.log('密码长度不够');
            e.preventDefault();
        }
        if(telephone.substr(0, 3) != 183 && telephone.substr(0, 3) != 189 && telephone.substr(0, 3) != 139
            && telephone.substr(0, 3) != 188 && telephone.substr(0, 3) != 157 || telephone.length != 11){
            console.log('您的手机号码不正确');
            e.preventDefault();
        }
        if(safeCodes.value.toLowerCase() === safe.toLowerCase()){
            alert('注册成功');
            document.cookie = 'user='+username.value+';expires='+date.toGMTString()+';path=/';
            document.cookie = 'pass='+password.value+';expires='+date.toGMTString()+';path=/';
            username.value = '';
            password.value = '';
            safeCodes.value = '';
            safe = '';
            telephone.value = '';
            location.href = "../login/login.html";
        }else{
            console.log('验证码不匹配');
            safe = '';
            safeCode();
            e.preventDefault();
        }
    }
}());