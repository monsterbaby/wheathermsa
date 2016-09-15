// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.responseType = 'json'
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest(val) {
  // This is a sample server that supports CORS.
  var url =  "http://api.openweathermap.org/data/2.5/weather?q=" + val + "&APPID=c75ba61d327484950007270bf70973a8&units=metric";
  console.log(url);
  //var url = "//127.0.0.1:5000/api/v1.0/schools/" + val;
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      var weather = data['weather'][0]['main'];
      var tempMin =  data['main']['temp_min'];
      var tempMax =  data['main']['temp_max'];
      var icon = data['weather'][0]['icon'];
      var result = $("#result");
      result.replaceWith("<div id=\"result\"><img style=\"width:300px\" src=http://openweathermap.org/img/w/" + icon + ".png></img><h2 class=\"cover-heading\">" + val + "<br/><br/>" + weather + "<br/><br/>" + tempMin + "  &#8212  " + tempMax + "&#x2103</h2><div>");
      //result.innerHTML("<img src=http://openweathermap.org/img/w/" + icon + "/>");
    }

  };

  xhr.onerror = function() {
    console.log('Woops, there was an error making the request.');
  };
  xhr.send();
}


function getWeather() {
    var location = $("#cityName").val();
    makeCorsRequest(location);
}