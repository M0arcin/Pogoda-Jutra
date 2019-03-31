function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function whatTime() {
    var today = new Date();
    var h = today.getHours(); //h = hour
    var m = today.getMinutes(); //m = minute
    var s = today.getSeconds(); // s = second
    m = addZero(m);
    s = addZero(s);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    repeat = setTimeout(function () {
        whatTime()
    }, 1000);
}
whatTime();