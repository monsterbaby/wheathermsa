/// <reference path="./typings/globals/jquery/index.d.ts" />
/// <reference path="./typings/globals/googlemaps/index.d.ts" />
function sendWeatherRequest(val, callback) {
    $.ajax({
        url: "//api.openweathermap.org/data/2.5/weather?q=" + val + "&APPID=fb51d78ce2095cb80252d277b5f5f504&units=metric",
        type: "GET"
    })
        .done(function (data) {
        callback(data);
    })
        .fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}
function getWeather() {
    sendWeatherRequest($("#search").val(), function (data) {
        console.log(data);
        if (data['cod'] == 200) {
            var weather = data['weather'][0]['main'];
            var tempMin = data['main']['temp_min'];
            var tempMax = data['main']['temp_max'];
            var icon = data['weather'][0]['icon'];
            var result = $("#result");
            result.replaceWith("<div id=\"result\"><img style=\"width:300px\" src=http://openweathermap.org/img/w/" + icon + ".png></img><h2 class=\"cover-heading\">" + $("#search").val() + "<br/><br/>" + weather + "<br/><br/>" + tempMin + "  &#8212  " + tempMax + "&#x2103</h2><div>");
            loadMap(data['coord']['lat'], data['coord']['lon']);
        }
    });
}
function loadMap(lat, lng) {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapProp = {
        center: myLatlng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: myLatlng
    });
    marker.setMap(map);
}
