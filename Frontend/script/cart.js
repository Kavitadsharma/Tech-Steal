// Get the table element
const table = document.querySelector('table');

// Get the checkout button
const checkoutButton = document.querySelector('button');

// Add a click event listener to the checkout button
checkoutButton.addEventListener('click', () => {
  // Send a request to the server to process the payment
  // and redirect the user to the confirmation page
  window.location.href = '/confirmation';
});

// Add event listeners to the table to handle item quantity changes
table.addEventListener('input', (event) => {
  const target = event.target;
  if (target && target.classList.contains('quantity')) {
    // Get the row and quantity inputs
    const row = target.parentNode.parentNode;
    const quantityInput = row.querySelector('.quantity');
    const quantity = parseInt(quantityInput.value);

    // Get the price and subtotal elements
    const price = parseFloat(row.querySelector('.price').textContent);
    const subtotal = row.querySelector('.subtotal');

    // Calculate the subtotal and update the element
    const total = price * quantity;
    subtotal.textContent = `$${total.toFixed(2)}`;
  }
});

// Update the cart total whenever the quantity changes
table.addEventListener('input', () => {
  // Get all the subtotals and add them up
  const subtotals = table.querySelectorAll('.subtotal');
  let total = 0;
  subtotals.forEach((subtotal) => {
    total += parseFloat(subtotal.textContent.replace('$', ''));
  });

  // Update the total element
  const totalElement = document.querySelector('.total');
  totalElement.textContent = `$${total.toFixed(2)}`;
});
