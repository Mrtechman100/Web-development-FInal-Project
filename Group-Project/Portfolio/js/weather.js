"use strict";

(function() {

    var current = $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
        lat: 29.423017,
        lon: -98.48527,
        units: "imperial"
    });

    var request = $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
        APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
        lat: 29.423017,
        lon: -98.48527,
        units: "imperial",
        cnt: 4
    });

    function mainFunction(x, y) {
        x.done(function (data) {
            console.log(data);
            $("#current").append("<div class='current'><p class='temp'>" + data.main.temp_max + "\xB0" + "/" + data.main.temp_min + "\xB0" + "</p>"
                + "<p>" + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'" + "</p>"
                + "<p><span class='weather'>" + data.weather[0].main + ": " + "</span>" + data.weather[0].description + "</p>"
                + "<p><span class='humidity'>" + "Humidity: " + "</span>" + data.main.humidity + "</p>"
                + "<p><span class='wind'>" + "Wind: " + "</span>" + data.wind.speed + "</p>"
                + "<p><span class='pressure'>" + "Pressure: " + "</span>" + data.main.pressure + "</p></div>");
            $("#city").text(data.name);
        });

        x.fail(function (current, status, error) {
            console.log(status);
            console.log(error);
        });

        y.done(function (response) {
            console.log(response);
            response.list.forEach(function (forecast, i) {
                if (i > 0) {
                    $("#forecast").append("<div class='forecast" + i + "'><p class='temp'>" + forecast.temp.max + "\xB0" + "/"
                        + forecast.temp.min + "\xB0" + "</p>"
                        + "<p>" + "<img src='http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png'" + "</p>"
                        + "<p><span class='weather'>" + forecast.weather[0].main + ": " + "</span>" + forecast.weather[0].description + "</p>"
                        + "<p><span class='humidity'>" + "Humidity: " + "</span>" + forecast.humidity + "</p>"
                        + "<p><span class='wind'>" + "Wind: " + "</span>" + forecast.speed + "</p>"
                        + "<p><span class='pressure'>" + "Pressure: " + "</span>" + forecast.pressure + "</p></div>");
                }
            });
        });

        y.fail(function (request, status, error) {
            console.log(status);
            console.log(error);
        });
    }

    var mapOptions = {
        zoom: 5,
        center : {
            lat: 29.426791,
            lng: -98.489602
        }
    };

    var mapCanvas = document.getElementById("map-canvas");
    var map = new google.maps.Map(mapCanvas, mapOptions);
    var geocoder = new google.maps.Geocoder();
    var address = {
        address: "San Antonio, TX"
    };

    function callback(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                draggable: true
            });

            google.maps.event.addListener(marker, 'dragend', function() {
                $("#current").empty();
                $("#forecast").empty();
                var latitude = marker.getPosition().lat();
                var longitude = marker.getPosition().lng();
                var currentLatLong = $.get("http://api.openweathermap.org/data/2.5/weather", {
                    APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
                    lat: latitude,
                    lon: longitude,
                    units: "imperial"
                });

                var requestLatLong = $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
                    APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
                    lat: latitude,
                    lon: longitude,
                    units: "imperial",
                    cnt: 4
                });
                mainFunction(currentLatLong, requestLatLong);

            });

        } else {
            alert("Geocoding was not successful - STATUS: " + status);
        }
    }

    geocoder.geocode(address, callback);

    $(".search").click(function () {
        var location = $(".searchbar");
        address = {
            address: location.val()
        };
        $("#current").empty();
        $("#forecast").empty();
        console.log(location);
        var currentSearch = $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
            q: location.val(),
            units: "imperial"
        });

        var requestSearch = $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "8f32c0149a278cdb5f995fbb3d98eba5",
            q: location.val(),
            units: "imperial",
            cnt: 4
        });

        mainFunction(currentSearch, requestSearch);
        geocoder.geocode(address, callback);
    });

    mainFunction(current, request);
})();



