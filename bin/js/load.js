(function() {
    document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
            loading.style.display = 'none';
            document.getElementsByClassName('body')[0].style.display = 'block';
            return;
        }
    };
    var loading = document.getElementsByClassName('loading')[0],
        tempHei = document.documentElement.clientHeight;
    loading.style.height = tempHei + 'px';
    loading.style.lineHeight = tempHei + 'px';
    document.addEventListener('scroll', function() {
        var tempScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (tempScroll > 0) {
            loading.style.top = '0px';
        }
        if (tempScroll == 0) {
            loading.style.top = '76px';
        }
    }, false);
    (function() {
        window.onresize = arguments.callee;
        tempHei = document.documentElement.clientHeight;
        loading.style.height = tempHei + 'px';
        loading.style.lineHeight = tempHei + 'px';
    }())
}())