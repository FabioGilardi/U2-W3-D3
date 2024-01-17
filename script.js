// REFERENCES

const row = document.getElementsByClassName("row")[1];

// FUNCTIONS
const createBookCards = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Page not found");
        } else if (response.status === 500) {
          throw new Error("500 - Internal server error");
        } else {
          throw new Error("Generic error");
        }
      }
    })

    .then((bookArray) => {
      console.log(bookArray);
      bookArray.forEach((book) => {
        // CARDS CREATION
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
        <div class="card">
              <img
                src="${book.img}"
                class="card-img-top"
                alt="book"
              />
              <div class="card-body">
                <h5 class="card-title mb-3">${book.title}</h5>
                <p class="card-text mb-2">Genre: <span>${book.category}</span></p>
                <p class="card-text">Price: <span>${book.price}</span>€</p>
                <div class="d-flex justify-content-evenly">
                  <button class="btn btn-primary" onclick="addToCart()">
                    Add
                  </button>
                  <button class="btn btn-danger" onclick="removeCard(event)">
                    Remove
                  </button>
                </div>
              </div>
        </div>
        `;
        row.appendChild(newCol);
      });
    })

    .catch((err) => {
      console.log("Generic error", err);
    });
};

const removeCard = function (event) {
  event.target.closest(".col").remove();
};

// ON-GOING

window.onload = createBookCards();
