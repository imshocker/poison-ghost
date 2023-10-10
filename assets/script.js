let searchBtn = document.querySelector("#form-search")
let previousSearchBtns = document.querySelector("#previous-searches")

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

        document.querySelector("#search-submit").value = ""


    }
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

