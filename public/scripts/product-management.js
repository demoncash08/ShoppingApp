const deleteProductsButtonElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const prodId = buttonElement.dataset.prodid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + prodId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  // console.log(response);
  if (!response.ok) {
    alert("Something went wrong!!");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductsButtonElement of deleteProductsButtonElements) {
  deleteProductsButtonElement.addEventListener("click", deleteProduct);
}
