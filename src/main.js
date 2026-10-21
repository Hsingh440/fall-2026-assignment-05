import './style.css'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <h2 class="logo">ShopEase</h2>

    <nav>
      <a href="#home">Home</a>
      <a href="#products">Products</a>
      <a href="#about">About</a>
    </nav>

   <div class="cart">
  <button id="cart-toggle">
    🛒 Cart (<span id="cart-count">0</span>)
  </button>
</div>
  </header>

  <section class="hero" id="home">
    <div class="hero-content">
      <h1>Discover Your Next Favorite</h1>
      <p>Explore products you'll love, all in one place.</p>
      <a href="#products" class="shop-button">Shop Now</a>
    </div>
  </section>

  <section class="products" id="products">
    <h2>Featured Products</h2>
    <p class="subtitle">Check out our latest collection.</p>

    <div class="product-grid">
      <div class="product-card">
        <div class="product-image">
  <img
    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    alt="Wireless Headphones"
  />
</div>
        <h3>Wireless Headphones</h3>
        <p class="price">$59.99</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>

      <div class="product-card">
        <div class="product-image">
  <img
    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    alt="Smart Watch"
  />
</div>
        <h3>Smart Watch</h3>
        <p class="price">$89.99</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>

      <div class="product-card">
       <div class="product-image">
  <img
    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    alt="Running Shoes"
  />
</div>
        <h3>Running Shoes</h3>
        <p class="price">$74.99</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>

      <div class="product-card">
       <div class="product-image">
  <img
    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    alt="Everyday Backpack"
  />
</div>
        <h3>Everyday Backpack</h3>
        <p class="price">$39.99</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  </section>

  <footer id="about">
    <p>© 2026 ShopEase. Your shopping experience starts here.</p>
  </footer>
`

const cart = []

const cartToggle = document.querySelector('#cart-toggle')

const cartPanel = document.createElement('div')
cartPanel.id = 'cart-panel'
cartPanel.className = 'cart-panel'
cartPanel.hidden = true

cartPanel.innerHTML = `
  <h2>Your Shopping Cart</h2>
  <div id="cart-items"></div>
 <div class="cart-total">
  Total: $<span id="cart-total">0.00</span>
</div>

<button id="checkout-button" type="button" class="checkout-button">
  Proceed to Checkout
</button>
<button id="close-cart">Continue Shopping</button>
`

document.body.appendChild(cartPanel)

function renderCart() {
  const cartItems = document.querySelector('#cart-items')

  document.querySelector('#cart-count').textContent =
    cart.reduce((total, item) => total + item.quantity, 0)

  document.querySelector('#cart-total').textContent =
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>'
    return
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
      </div>
      <button class="remove-item" data-index="${index}">
        Remove
      </button>
    </div>
  `).join('')
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.closest('.product-card')
    const name = product.querySelector('h3').textContent
    const price = Number(
      product.querySelector('.price').textContent.replace('$', '')
    )

    const existingItem = cart.find((item) => item.name === name)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.push({ name, price, quantity: 1 })
    }

    renderCart()

    button.textContent = 'Added!'

    setTimeout(() => {
      button.textContent = 'Add to Cart'
    }, 1000)
  })
})

cartToggle.addEventListener('click', () => {
  cartPanel.hidden = !cartPanel.hidden
  renderCart()
})

document.querySelector('#close-cart').addEventListener('click', () => {
  cartPanel.hidden = true
})

document.querySelector('#cart-items').addEventListener('click', (event) => {
  const button = event.target.closest('.remove-item')

  if (!button) return

  cart.splice(Number(button.dataset.index), 1)
  renderCart()
})
// Checkout form
const checkoutSection = document.createElement('section')

checkoutSection.id = 'checkout-section'
checkoutSection.hidden = true

checkoutSection.innerHTML = `
  <div class="checkout-container">
    <h2>Checkout</h2>
    <p>Enter your shipping information below.</p>

    <form id="checkout-form">
      <label for="customer-name">Full Name</label>
      <input
        type="text"
        id="customer-name"
        required
        placeholder="Your full name"
      />

      <label for="customer-email">Email Address</label>
      <input
        type="email"
        id="customer-email"
        required
        placeholder="you@example.com"
      />

      <label for="customer-address">Shipping Address</label>
      <input
        type="text"
        id="customer-address"
        required
        placeholder="Street address"
      />

      <label for="customer-city">City</label>
      <input
        type="text"
        id="customer-city"
        required
        placeholder="Your city"
      />

      <div class="checkout-total">
        Order Total: $<span id="checkout-total">0.00</span>
      </div>

      <button type="submit" class="place-order-button">
        Place Demo Order
      </button>
    </form>

    <p id="order-message" role="status"></p>

    <button id="back-to-shopping" type="button">
      Back to Shopping
    </button>
  </div>
`

document.querySelector('#app').appendChild(checkoutSection)
// Open checkout
document.querySelector('#checkout-button').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Add a product first!')
    return
  }

  document.querySelector('#checkout-total').textContent =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

  cartPanel.hidden = true
  checkoutSection.hidden = false

  checkoutSection.scrollIntoView({ behavior: 'smooth' })
})

// Return to shopping
document.querySelector('#back-to-shopping').addEventListener('click', () => {
  checkoutSection.hidden = true
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth' })
})

// Submit a demo order
document.querySelector('#checkout-form').addEventListener('submit', (event) => {
  event.preventDefault()

  if (cart.length === 0) {
    document.querySelector('#order-message').textContent =
      'Your cart is empty. Please add a product first.'
    return
  }

  const customerName = document.querySelector('#customer-name').value.trim()

  document.querySelector('#order-message').textContent =
    `Thank you, ${customerName}! Your demo order was submitted successfully.`

  cart.length = 0
  renderCart()

  document.querySelector('#checkout-form').reset()
})

renderCart()