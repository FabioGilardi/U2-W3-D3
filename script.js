// REFERENCES

const row = document.getElementsByClassName("row")[1];
const cart = document.getElementById("cart");

// VARIABLES

let cartArray = [];

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
        <div class="card shadow">
              <img
                src="${book.img}"
                class="card-img-top"
                alt="book"
              />
              <div class="card-body">
                <h5 class="card-title mb-3">${book.title}</h5>
                <p class="card-text mb-2">Genre: <span>${book.category}</span></p>
                <p class="card-text">Price: <span class="price">${book.price}</span>€</p>
                <div class="d-flex justify-content-evenly">
                  <button class="btn btn-primary" onclick="addToCart(event)">
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

const addToCart = function (event) {
  // FIND THE RIGHT CARD AND RESPECTIVE TITLE AND PRICE
  const cardTargeted = event.target.closest(".card-body");
  //   console.log(cardTargeted);
  const cardTitle =
    cardTargeted.getElementsByClassName("card-title")[0].innerHTML;
  //   console.log(cardTitle);
  const cardPrice = cardTargeted.getElementsByClassName("price")[0].innerHTML;
  //   console.log(cardPrice);
  const cardInfo = { title: cardTitle, price: cardPrice };
  //   console.log(cardInfo);

  //   ADD THE INFORMATION TO LOCAL STORAGE
  cartArray.push(cardInfo);
  localStorage.setItem("cart", JSON.stringify(cartArray));

  //   CART LI CREATION
  const newLi = document.createElement("li");
  newLi.classList.add("d-flex");
  newLi.classList.add("align-items-center");
  newLi.classList.add("justify-content-between");
  newLi.classList.add("mt-2");
  newLi.innerHTML = `<span class="me-5">${cardTitle}</span
  ><span
    >${cardPrice}€<button
      class="btn btn-black btn-sm ms-2 border border-black"
    >
      <i class="bi bi-trash-fill" onclick="removeFromCart(event)"></i></button
  ></span>`;
  cart.appendChild(newLi);
};

const cartOnLoad = function () {
  const cartElement = JSON.parse(localStorage.getItem("cart"));

  cartElement.forEach((element) => {
    const newLi = document.createElement("li");
    newLi.classList.add("d-flex");
    newLi.classList.add("mt-2");
    newLi.classList.add("align-items-center");
    newLi.classList.add("justify-content-between");
    newLi.innerHTML = `<span class="me-5">${element.title}</span
    ><span
      >${element.price}€<button
        class="btn btn-black btn-sm ms-2 border border-black"
      >
        <i class="bi bi-trash-fill" onclick="removeFromCart(event)"></i></button
    ></span>`;
    cart.appendChild(newLi);
  });
  cartArray = [...cartElement];
  console.log(cartArray);
};

const removeFromCart = function (event) {
  const cartElementTargeted = event.target.closest("li");
  titleToRemove = cartElementTargeted.getElementsByTagName("span")[0].innerHTML;
  console.log(titleToRemove);
  const titleToRemoveIndex = cartArray.findIndex((element) => {
    return element.title === titleToRemove;
  });
  console.log(titleToRemoveIndex);
  cartArray.splice(titleToRemoveIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cartArray));
  cartElementTargeted.remove();
};

// ON-GOING

window.onload = createBookCards();

window.onload = cartOnLoad();
