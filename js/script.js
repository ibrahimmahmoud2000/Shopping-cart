const welcomeScreenElement = document.getElementById("welcome-screen");
const mainContentElement = document.getElementById("main-content");
const signUpFormElement = document.getElementById("sign-up-form");
const userNameInputElement = document.getElementById("userName");
const emailInputElement = document.getElementById("email");
const passwordInputElement = document.getElementById("password");
const welcomeMessageElement = document.getElementById("welcome-message");
const cartCountElement = document.getElementById("cart-count"); 
const spinnerElement = document.getElementById("loading-spinner"); 
const logOutButton = document.getElementById("log-out-btn");

async function displayProducts() {
  const productContainer = document.getElementById("cards");

  spinnerElement?.classList.remove("d-none");

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products.");

    const products = await response.json();

    if (productContainer) productContainer.innerHTML = ""; 

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-md-4", "mb-4");
      productDiv.innerHTML = `
        <div class="card p-4 d-flex align-items-center h-100">
          <div class="img" style="width: 150px; height: 150px; overflow: hidden;">
            <img src="${product.image}" class="card-img-top h-100" alt="${product.title}" style="object-fit: contain;">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${
              product.description.length > 100
                ? product.description.substring(0, 97) + "..."
                : product.description
            }</p>
            <p class="card-price fw-bold">Price: $${product.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart-btn">Add to cart</button>
          </div>
        </div>
      `;
      productContainer.appendChild(productDiv);

      const addToCartButton = productDiv.querySelector(".add-to-cart-btn");
      if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
          if (product) addToCart(product);
        });
      }
    });

    spinnerElement?.classList.add("d-none");

  } catch (error) {
    console.error(error);
    spinnerElement?.classList.add("d-none"); 

    setTimeout(retryFetchProducts, 2000);
  }

}async function retryFetchProducts() {
  displayProducts();
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!Array.isArray(cart)) {
    cart = [];
  }

  const isProductInCart = cart.some((item) => item.id === product.id);
  if (isProductInCart) {
    if (Swal) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: `"${product.title}" is already in your cart!`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
    return;
  }

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));


  if (cartCountElement) cartCountElement.textContent = cart.length;

  if (Swal) {
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `"${product.title}" has been added to your cart!`,
      timer: 2000,
      showConfirmButton: false,
    });
  }
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items-container");
  const totalPriceElement = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cartContainer || !totalPriceElement) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "Total: $0.00";
    return;
  }

  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="card mb-3 p-3 w-100">
        <div class="row">
          <div class="col-md-4">
            <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">Price: $${product.price.toFixed(2)}</p>
              <button class="btn btn-danger remove-from-cart-btn" data-index="${index}">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);

    totalPrice += product.price;
  });

  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (!isNaN(index)) removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }
}


document.addEventListener("DOMContentLoaded", function () {
  if (welcomeScreenElement && mainContentElement) {
    setTimeout(() => {
      welcomeScreenElement.classList.add("d-none");
      mainContentElement.classList.remove("d-none");
    }, 3000);
  }

  
  if (signUpFormElement) {
    signUpFormElement.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const userName = userNameInputElement?.value.trim();
      const email = emailInputElement?.value.trim();
      const password = passwordInputElement?.value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (Swal) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address.",
          });
        }
        return;
      }
  
      if (password.length < 6) {
        if (Swal) {
          Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password must be at least 6 characters long.",
          });
        }
        return;
      }
  
      if (!userName || !email || !password) {
        if (Swal) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "All fields are required!",
          });
        }
        return;
      }
  
      localStorage.setItem("user", JSON.stringify({ userName, email }));
      if (Swal) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Welcome, ${userName}! You have successfully signed up.`,
        });
      }
  
      signUpFormElement.reset();
  
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    });
  }
  

  displayProducts();

  if (logOutButton) {
    logOutButton.addEventListener("click", function () {
      if (Swal) {
        Swal.fire({
          title: "Logout",
          text: "Are you sure you want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            window.location.href = "../index.html"; 
          }
        });
      }
    });
  }

  displayCart();
});

