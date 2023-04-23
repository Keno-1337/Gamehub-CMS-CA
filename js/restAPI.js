document.addEventListener('DOMContentLoaded', () => {
  const consumerKey = 'ck_3c56961554027f586e08c9efbfa97ee2270a1b9b';
  const consumerSecret = 'cs_add38b3452f593ffd8730c50fd2e334a7b23bcf9';
  const apiUrl = 'https://gamehub.local/wp-json/wc/v3';
  const productList = document.getElementById('product-list');

  // Fetch products
  fetch(`${apiUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      // Handle products data
      let productHtml = '';
      products.forEach((product) => {
        productHtml += `
        <div class="BrowseItems">
          <img src="${product.images[0].src}" alt="${product.name} boxart">
          <h1>${product.name}</h1>
          <p class="Price">${product.price}</p>
          <p>${product.short_description}</p>
          <a href="checkout_success.html">
            <p class="purchasebtn">Purchase</p>
          </a>
          <p class="detailsbtn" data-product-id="${product.id}">Details</p>
        </div>`;
      });
      productList.innerHTML = productHtml;

      // add event listener to details buttons
      const detailsButtons = document.querySelectorAll('.detailsbtn');
      detailsButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          const productId = event.target.dataset.productId;
          showDetails(productId);
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // spesific product details
  function showDetails(productId) {
    // Fetch product details from woocommerce
    fetch(`${apiUrl}/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    })
      .then((response) => response.json())
      .then((product) => {
        //Handle product details data
        // Redirect to product details page
        window.location.href = `product_details.html?productId=${product.id}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // featured products from WooCommerce
fetch(`${apiUrl}/products?featured=true`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
  },
})
.then((response) => response.json())
.then((products) => {
  // handle featured products data
  let featuredProductHtml = '';
  products.forEach((product) => {
    featuredProductHtml += `
      <div class="BrowseItems">
        <img src="${product.images[0].src}" alt="${product.name} boxart">
        <h1>${product.name}</h1>
        <p class="Price">${product.price}</p>
        <p>${product.short_description}</p>
        <a href="checkout_success.html">
          <p class="purchasebtn">Purchase</p>
        </a>
        <p class="detailsbtn" data-product-id="${product.id}">Details</p>
      </div>`;
  });
  document.getElementById('featuredProductList').innerHTML = featuredProductHtml;

  //event listener to details buttons
  const detailsButtons = document.querySelectorAll('.detailsbtn');
  detailsButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.productId;
      showDetails(productId);
    });
  });
})
.catch((error) => {
  console.error(error);
});
});