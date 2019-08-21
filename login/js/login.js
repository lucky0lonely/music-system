(function(){
	'use strict';
	var user = document.getElementById('user'),
		pass = document.getElementById('password'),
		submit = document.getElementById('login'),
		safe = document.getElementsByClassName('safe')[0],
		safeCode = document.getElementsByClassName('safeCode')[0];
	var users = 'admin',
		password = 'admin';
	var safeStrCode = '';
    var strCodeArr = [1,2,3,4,5,6,7,8,9,
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
    init();
    function init(){
        safeStrCode = createCode();
	}
    function createCode(){
    	var temp = '';
    	for(var i = 0; i < 4; i++){
    		temp += strCodeArr[randomNum()];
		}
        safeCode.innerText = temp;
		return temp;
	}
	function randomNum(){
    	return Math.floor(Math.random() * (strCodeArr.length - 1));
	}
	function getCookie(){
		var temp = document.cookie.split(';'),
			tempArr = [],
			user = '',
			obj = {};
		for(var i = 0,len = temp.length; i < len; i++){
			tempArr.push(temp[i].trim().split('='));
			obj[tempArr[i][0]] = tempArr[i][1];
		}
		user = obj.user === user.value ? user.value : '';
		return user;
	}
    safeCode.onclick = function(){
        safeStrCode = createCode();
	};
	submit.onclick = function(e){
		e = e || window.event;
		var tempUserValue = user.value,
			tempPassValue = pass.value;
        if(safeStrCode.toLowerCase() != safe.value.toLowerCase()){
            console.log();
            alert('验证码不符,请重新输入!');
            safe.value = '';
            safeStrCode = '';
            safeStrCode = createCode();
            e.preventDefault();
        }
		if(tempPassValue.length != 0 && tempUserValue.length != 0){
			if(tempUserValue === users && tempPassValue === password){
				window.location.href = './../demo.html';
				user.value = '';
				pass.value = '';
                safe.value = '';
                safeStrCode = '';
				e.preventDefault();
			}else{
				pass.value = '';
				console.log('您输入的用户名或者密码不对!');
                safeStrCode = createCode();
				e.preventDefault();
			}
		}else{
			alert('用户名与密码不能为空!');
            safeStrCode = createCode();
			e.preventDefault();
		}
	}
}());