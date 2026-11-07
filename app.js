let products = [];
let cart = [];

// Fetch products from Express backend
async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    // Fallback default list if server is offline
    renderProducts([]);
  }
}

function renderProducts(items) {
  const grid = document.getElementById('product-grid');
  if (!items || items.length === 0) {
    grid.innerHTML = '<p>No products found.</p>';
    return;
  }

  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy">
      <div class="product-details">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">★ ${p.rating} / 5.0</div>
        <div class="product-bottom">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.innerText.toLowerCase() === category.toLowerCase());
  });

  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    renderProducts(filtered);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`Added "${product.name}" to cart!`);
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const countSpan = document.getElementById('cart-count');
  const totalSpan = document.getElementById('cart-total');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  countSpan.innerText = totalCount;
  totalSpan.innerText = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="color:#64748b;text-align:center;margin-top:2rem;">Your cart is empty.</p>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
      </div>
      <button onclick="removeFromCart(${item.id})" style="border:none;background:none;color:#ef4444;cursor:pointer;font-size:1.1rem;">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('open');
}

async function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart })
    });
    const data = await res.json();
    if (data.success) {
      cart = [];
      updateCartUI();
      toggleCart();
      alert(`🎉 ${data.message}\nOrder Number: ${data.orderId}\nTotal Billed: $${data.total}`);
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Failed to connect to checkout service.');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Initial load
document.addEventListener('DOMContentLoaded', fetchProducts);

