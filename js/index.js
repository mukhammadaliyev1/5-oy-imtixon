document.addEventListener("DOMContentLoaded", () => {
  let select = document.getElementById("select");

  const apiUrl =
    "https://cars-pagination.onrender.com/products/category?category=известный";

  fetchProducts(apiUrl);

  select.addEventListener("change", function () {
    let categoryUrl = "";
    if (select.value === "popularity") {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=известный";
    } else if (select.value === "unpopulary") {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=не популярен";
    } else {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=средний";
    }

    fetchProducts(categoryUrl);
  });

  function fetchProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        const productList = document.getElementById("product-list");
        const productList2 = document.getElementById("product-list2");
        productList.innerHTML = "";

        data.forEach((product) => {
          const availability = product.isExist
            ? '<p style="color: lime;">В наличии</p>'
            : '<p style="color: red;">Нет в наличии</p>';

          productList.innerHTML += `
            <div class="product-card" data-id="${product.id}">
              <div style="display: flex; gap: 50px;">
                  <p>${availability}</p>
                  <p>SALE</p>
              </div>
              <img src="${product.image}" alt="Product 1" style="width: 100%; height: 300px;"/>
              <h3>${product.name}</h3>
              <div style="display: flex; align-items: center; justify-content: space-around;">
                  <h2>${product.newPrice}₽</h2>
                  <del>${product.oldPrice}₽</del>
              </div>
              <h4>${product.star} star</h4>
            </div>
          `;

          productList2.innerHTML += `
            <div class="product-card" data-id="${product.id}">
              <div style="display: flex; gap: 50px;">
                  <p>${availability}</p>
                  <p>SALE</p>
              </div>
              <img src="${product.image}" alt="Product 1" />
              <h3>${product.name}</h3>
              <div style="display: flex; align-items: center; justify-content: space-around;">
                  <h2>${product.newPrice}₽</h2>
                  <del>${product.oldPrice}₽</del>
              </div>
              <h4>${product.star} star</h4>
            </div>
          `;
        });

        const productCards = document.querySelectorAll(".product-card");
        productCards.forEach((card) => {
          card.addEventListener("click", function () {
            const cardId = this.getAttribute("data-id");
            if (cardId) {
              window.location.assign(`../pages/details.html?id=${cardId}`);
            }
          });
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});
