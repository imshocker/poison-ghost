let searchBtn = document.querySelector("#form-search")
let previousSearchBtns = document.querySelector("#previous-searches")
// let searchSubmitVal = document.querySelector("#search-submit").value

let previousSearches = []

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

function displayPreviousSearches() {
    let previousInputs = JSON.parse(localStorage.getItem("previousSearches"))

    previousSearchBtns.innerHTML = ""

    if (previousInputs && previousInputs.length > 0) {

        for (let i = 0; i < previousInputs.length; i++) {
            let searchQuery = previousInputs[i]
            let listItem = document.createElement("li")
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
            searchSubmit()
        })
    })
}

function fetchCity() {
    let searchSubmitVal = document.querySelector("#search-submit").value

    //request for coordinates 
    let locationRequest = `http://api.openweathermap.org/geo/1.0/direct?q=${searchSubmitVal},US&limit=1&appid=573fc79e941f0079c4284533a0b3f78a`

    fetch(locationRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // console.log(locationRequest)
            let cityLat = data[0].lat
            let cityLon = data[0].lon

            //request for current day weather
            let searchRequest1 = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=573fc79e941f0079c4284533a0b3f78a`

            //request for 5 day forecast
            let searchRequest2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=573fc79e941f0079c4284533a0b3f78a`

            fetch(searchRequest1)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);


                    return
                })


        })




}

