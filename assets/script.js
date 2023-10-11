let searchBtn = document.querySelector("#form-search")
let previousSearchBtns = document.querySelector("#previous-searches")
// let searchSubmitVal = document.querySelector("#search-submit").value
let currentDayCityEl = document.getElementById("current-city")
let currentDayTempEl = document.getElementById("temp")
let currentDayWindEl = document.getElementById("wind")
let currentDayHumidEl = document.getElementById("humidity")

let day1TempEl = document.getElementById("day-1-temp")
let day1WindEl = document.getElementById("day-1-wind")
let day1HumidEl = document.getElementById("day-1-humidity")
let date1El = document.getElementById("date-1")

let day2TempEl = document.getElementById("day-2-temp")
let day2WindEl = document.getElementById("day-2-wind")
let day2HumidEl = document.getElementById("day-2-humidity")
let date2El = document.getElementById("date-2")

let day3TempEl = document.getElementById("day-3-temp")
let day3WindEl = document.getElementById("day-3-wind")
let day3HumidEl = document.getElementById("day-3-humidity")
let date3El = document.getElementById("date-3")

let day4TempEl = document.getElementById("day-4-temp")
let day4WindEl = document.getElementById("day-4-wind")
let day4HumidEl = document.getElementById("day-4-humidity")
let date4El = document.getElementById("date-4")

let day5TempEl = document.getElementById("day-5-temp")
let day5WindEl = document.getElementById("day-5-wind")
let day5HumidEl = document.getElementById("day-5-humidity")
let date5El = document.getElementById("date-5")


let previousSearches = []

// User input is entered/stored
function searchSubmit(event) {
    event.preventDefault()
    let searchSubmitVal = document.querySelector("#search-submit").value

    if (searchSubmitVal.trim() !== "") {
        previousSearches.unshift(searchSubmitVal)

        if (previousSearches.length > 8) {
            previousSearches.pop()
        }

        localStorage.setItem("previousSearches", JSON.stringify(previousSearches))

        displayPreviousSearches()


    }
    fetchCity()
}

searchBtn.addEventListener("click", searchSubmit)

// Shows the previous searches below the search bar
function displayPreviousSearches() {
    let previousInputs = JSON.parse(localStorage.getItem("previousSearches"))

    previousSearchBtns.innerHTML = ""

    if (previousInputs && previousInputs.length > 0) {

        for (let i = 0; i < previousInputs.length; i++) {
            let searchQuery = previousInputs[i]
            let button = document.createElement("button")
            button.textContent = searchQuery
            button.classList.add("btn", "btn-outline-secondary", "bg-primary", "text-light", "my-2")
            previousSearchBtns.appendChild(button)
        }
    } else {
        previousSearchBtns.style.display = "none"
    }
}

displayPreviousSearches()


function attachClickEventToButtons() {
    let buttons = previousSearchBtns.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Retrieve the search query from the button's text content
            let searchQuery = button.textContent

            // Set the search input field's value to the selected query
            document.querySelector("#search-submit").value = searchQuery

            // Call the searchSubmit function to trigger the search
            searchSubmit(searchQuery)
        })
    })
}

function fetchCity() {
    let searchSubmitVal = document.querySelector("#search-submit").value

    // Request for coordinates 
    let locationRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${searchSubmitVal},US&limit=1&appid=573fc79e941f0079c4284533a0b3f78a`

    fetch(locationRequest)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)

            let cityLat = data[0].lat
            let cityLon = data[0].lon

            // Request for current day weather
            let searchRequest1 = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=573fc79e941f0079c4284533a0b3f78a`

            // Request for 5 day forecast
            let searchRequest2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=573fc79e941f0079c4284533a0b3f78a`

            fetch(searchRequest1)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)

                    //list from data : main.humidity, main.temp, wind.speed
                    // return
                    // let currentDayIcon = data.weather[0].icon
                    let currentCity = data.name
                    let currentDayTemp = data.main.temp
                    let currentDayHumid = data.main.humidity
                    let currentDayWind = data.wind.speed

                    currentDayCityEl.textContent = currentCity /*+ " " + currentDayIcon*/
                    currentDayTempEl.textContent = "Temp: " + currentDayTemp + " °F\n"
                    currentDayHumidEl.textContent = "Humidity: " + currentDayHumid + " %"
                    currentDayWindEl.textContent = "Wind: " + currentDayWind + " MPH"
                })

            fetch(searchRequest2)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)

                    //list from data: 5.main.humidity, 5.main.temp, 5.wind.speed
                    //                13.main.humidity, 13.main.temp, 13.wind.speed 
                    //                21.main.humidity, 21.main.temp, 21.wind.speed
                    //                29.main.humidity, 29.main.temp, 29.wind.speed
                    //                37.main.humidity, 37.main.temp, 37.wind.speed
                    // return
                    let day1Temp = data.list[5].main.temp
                    let day1Wind = data.list[5].wind.speed
                    let day1Humid = data.list[5].main.humidity
                    let day1Date = data.list[5].dt_txt
                    let day2Temp = data.list[13].main.temp
                    let day2Wind = data.list[13].wind.speed
                    let day2Humid = data.list[13].main.humidity
                    let day2Date = data.list[13].dt_txt
                    let day3Temp = data.list[21].main.temp
                    let day3Wind = data.list[21].wind.speed
                    let day3Humid = data.list[21].main.humidity
                    let day3Date = data.list[21].dt_txt
                    let day4Temp = data.list[29].main.temp
                    let day4Wind = data.list[29].wind.speed
                    let day4Humid = data.list[29].main.humidity
                    let day4Date = data.list[29].dt_txt
                    let day5Temp = data.list[37].main.temp
                    let day5Wind = data.list[37].wind.speed
                    let day5Humid = data.list[37].main.humidity
                    let day5Date = data.list[37].dt_txt

                    day1TempEl.textContent = "Temp: " + day1Temp + " °F\n"
                    day1WindEl.textContent = "Wind: " + day1Wind + " MPH"
                    day1HumidEl.textContent = "Humidity: " + day1Humid + " %"
                    date1El.textContent = day1Date
                    day2TempEl.textContent = "Temp: " + day2Temp + " °F\n"
                    day2WindEl.textContent = "Wind: " + day2Wind + " MPH"
                    day2HumidEl.textContent = "Humidity: " + day2Humid + " %"
                    date2El.textContent = day2Date
                    day3TempEl.textContent = "Temp: " + day3Temp + " °F\n"
                    day3WindEl.textContent = "Wind: " + day3Wind + " MPH"
                    day3HumidEl.textContent = "Humidity: " + day3Humid + " %"
                    date3El.textContent = day3Date
                    day4TempEl.textContent = "Temp: " + day4Temp + " °F\n"
                    day4WindEl.textContent = "Wind: " + day4Wind + " MPH"
                    day4HumidEl.textContent = "Humidity: " + day4Humid + " %"
                    date4El.textContent = day4Date
                    day5TempEl.textContent = "Temp: " + day5Temp + " °F\n"
                    day5WindEl.textContent = "Wind: " + day5Wind + " MPH"
                    day5HumidEl.textContent = "Humidity: " + day5Humid + " %"
                    date5El.textContent = day5Date
                
                })


        })




}

