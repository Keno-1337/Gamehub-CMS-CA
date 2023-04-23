document.addEventListener('DOMContentLoaded', () => {
    const consumerKey = 'ck_3c56961554027f586e08c9efbfa97ee2270a1b9b';
    const consumerSecret = 'cs_add38b3452f593ffd8730c50fd2e334a7b23bcf9';
    const apiUrl = 'https://gamehub.local/wp-json/wc/v3';
    const productId = getProductIdFromUrl();
    const productDetails = document.getElementById('product-details');
  
    // product details fetch
    fetch(`${apiUrl}/products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    })
      .then((response) => response.json())
      .then((product) => {
        // product details data
  
        // render product details
        const productHtml = `
          <div class="BrowseItems">
          <img src="${product.images[0].src}" alt="${product.name} boxart">
          <h1>${product.name}</h1>
          <p class="Price">${product.price}</p>
          <p>${product.description}</p>
          <a href="checkout_success.html">
            <p class="purchasebtn">Purchase</p>
          </a>
          </div>`;
        productDetails.innerHTML = productHtml;
      })
      .catch((error) => {
        console.error(error);
      });
    // function extract product ID 
    function getProductIdFromUrl() {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get('productId');
    }
  });
  