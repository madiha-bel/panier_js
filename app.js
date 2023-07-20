document.addEventListener("DOMContentLoaded", function () {
    const productRows = document.querySelectorAll("tbody tr");
    const totalSpan = document.querySelector("#total");
  
    // Function to calculate the subtotal for a row
    function calculateSubtotal(row) {
      const quantity = parseInt(row.querySelector(".qty").value);
      const price = parseFloat(row.querySelector(".price").value);
      return quantity * price;
    }
  
    // Function to update the amount for a product row
    function updateAmount(row) {
      const subtotal = calculateSubtotal(row).toFixed(2);
      row.querySelector(".amount").textContent = subtotal;
    }
  
    // Function to calculate the total amount for all product rows
    function calculateTotal() {
      let total = 0;
      productRows.forEach((row) => {
        total += parseFloat(row.querySelector(".amount").textContent);
      });
      return total.toFixed(2);
    }
  
    // Attach event listeners to the plus and minus buttons for each product row
    productRows.forEach((row) => {
      const plusButton = row.querySelector(".cart-qty-plus");
      const moinsButton = row.querySelector(".cart-qty-moins");
      const quantityInput = row.querySelector(".qty");
  
      plusButton.addEventListener("click", function () {
        let quantity = parseInt(quantityInput.value);
        quantity += 1;
        quantityInput.value = quantity;
        updateAmount(row);
        totalSpan.textContent = calculateTotal();
      });
  
      moinsButton.addEventListener("click", function () {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
          quantity -= 1;
          quantityInput.value = quantity;
          updateAmount(row);
          totalSpan.textContent = calculateTotal();
        }
      });
  
      quantityInput.addEventListener("input", function () {
        let quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity < 0) {
          quantity = 0;
          quantityInput.value = quantity;
        }
        updateAmount(row);
        totalSpan.textContent = calculateTotal();
      });
    });
  });
  