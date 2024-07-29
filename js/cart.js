function renderCartItems() {
  let carts = localStorage.getItem("carts");
  const cartItemsContainer = document.getElementById("cart-items-container");
  const totalPriceContainer = document.getElementById("total-price-container");
  const totalPriceElement = document.getElementById("total-price");

  if (carts) {
    carts = JSON.parse(carts);

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    carts.forEach((cart, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
          <img src="${cart.image}" alt="Product Image" class="product-image">
          <div class="product-details">
            <h3 class="product-name">${cart.name}</h3>
            <p class="product-brand">${cart.comments}</p>
          </div>
          <div class="product-price">${cart.newPrice}₽</div>
          <i class="delete-button fa-solid fa-trash" data-index="${index}" style="font-size: 20px;"></i>
        `;

      const deleteButton = cartItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        removeCartItem(index);
      });

      cartItemsContainer.appendChild(cartItem);
      totalPrice += parseFloat(cart.newPrice);
    });

    totalPriceElement.textContent = totalPrice + "₽";
    totalPriceContainer.style.display = "block";
  } else {
    cartItemsContainer.innerHTML = "<p>Savat bo'm bosh.</p>";
    totalPriceContainer.style.display = "none";
  }
}

function removeCartItem(index) {
  let carts = localStorage.getItem("carts");
  if (carts) {
    carts = JSON.parse(carts);
    carts.splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(carts));
    renderCartItems();
  }
}

renderCartItems();
