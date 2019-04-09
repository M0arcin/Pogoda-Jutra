var x = document.getElementById("city");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Nie można pobrać lokalizacji. Wprowadź miasto ręcznie.";
    }
}

function showPosition(position) {
    let e=`${position.coords.latitude},${position.coords.longitude}`;
    console.log(e);
}