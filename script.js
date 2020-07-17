$(document).ready(function () {


    $("#searchBtn").on("click", function () {
        var cityName = $("#search-input").val()
        $("#search-input").val("")
        searchWeather(cityName)
        getForecast(cityName)
    })

    $(".history").on("click", "li", function(){
        searchWeather($(this).text())
        getForecast($(this).text())
    })


    function searchWeather(cityName) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=6454741b2fed3e7979ce1a33ab8e13e0&units=imperial",

            success: function (response) {
                console.log(response)
                if(history.indexOf(cityName) === -1){
                    history.push(cityName)
                    localStorage.setItem("history", JSON.stringify(history))
                    makeList(cityName)
                }

                $("#title").text(response.name)
                var newDate = new Date(response.dt * 1000)
                $("#date").text(newDate)
                $("#temp").text("Temperature: " + response.main.temp)
                $("#humidity").text("Humidity: " + response.main.humidity)
                $("#windSpeed").text("Wind Speed: " + response.main.humidity)
                $("#uvIndex").text("UV Index: " + response.main.uvi)

            }
        })
    }

    function getForecast(cityName) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6454741b2fed3e7979ce1a33ab8e13e0&units=imperial",
            success: function (response) {
                console.log(response)
                var date = $("<p>").text(response.list.length)
                $("#future-weather").empty()
                for (var i = 0; i < response.list.length; i++){
                    if (response.list[i].dt_txt.indexOf("15:00:00") !== -1){
                        var column = $("<div>").addClass("col-md-2")
                        var card = $("<div>").addClass("card bg-dark")
                        var cardBody = $("<div>").addClass("card-body")
                        var date = $("<h5>").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                        var icon = $("<img>").attr('src', "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png")
                        var temp = $("<p>").text(response.list[i].main.temp)
                        var humidity = $("<p>").text(response.list[i].main.humidity)
                        column.append(card.append(cardBody.append(date, icon, temp, humidity)))
                        $("#future-weather").append(column)
                    }
                }
            

            }
        })
    }

    var history = JSON.parse(window.localStorage.getItem("history")) || []

    if(history.length > 0) {
        searchWeather(history[history.length-1])
    }

    function makeList(text) {
        var li =$("<li>").addClass("list-group-item list-group-item-action").text(text)
        $(".history").append(li)
    }

    for (var i = 0; i < history.length; i++){
        makeList(history[i])
    }
})