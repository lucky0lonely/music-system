
function getLocation(){
    var obj = {};
    if(location.search.indexOf('?') !== -1 && location.search.indexOf('&') === -1){
        var temp = location.search.slice(1).split('=');
        for(var i = 0, len = temp.length; i < len; i++){
            obj[temp[0]] = temp[1];
        }
    }
    return obj;
}