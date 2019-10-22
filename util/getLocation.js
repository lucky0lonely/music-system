
function getLocation(){
    var obj = {};
    if(location.search.indexOf('?') !== -1 && location.search.indexOf('&') === -1){
        var temp = location.search.slice(1).split('=');
        for(var i = 0, len = temp.length; i < len; i++){
            obj[temp[0]] = decodeURI(temp[1]);
        }
    }else if(location.search.indexOf('?') !== -1 && location.search.indexOf('&') !== -1){
    	var temp = location.search.slice(1).split('&');
    	for(var i = 0, len = temp.length; i < len; i++){
    		var strArr = temp[i].split('=');
    		obj[strArr[0]] = decodeURI(strArr[1]);
    	}
    }
    return obj;
}