const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample product catalog
// Optional: replace image URLs with your AWS S3 bucket object URLs
// e.g., https://<your-s3-bucket-name>.s3.amazonaws.com/laptop.jpg
const products = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 99.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    id: 2,
    name: "Smart Fitness Watch v2",
    price: 149.50,
    category: "Wearables",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
  },
  {
    id: 3,
    name: "Minimalist Mechanical Keyboard",
    price: 79.99,
    category: "Accessories",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 219.00,
    category: "Furniture",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1580481077195-c3a8a30ef7ac?w=500&q=80"
  },
  {
    id: 5,
    name: "Ultra-Fast USB-C Power Bank 20000mAh",
    price: 39.99,
    category: "Electronics",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1609592426868-b7c458ce3e77?w=500&q=80"
  },
  {
    id: 6,
    name: "Water-Resistant Commuter Backpack",
    price: 59.95,
    category: "Bags",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
  }
];

// API: Get products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API: Checkout demo
app.post('/api/checkout', (req, res) => {
  const { cart, customer } = req.body;
  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  res.json({
    success: true,
    orderId,
    total: total.toFixed(2),
    message: 'Order placed successfully!'
  });
});

// Health check endpoint for AWS EC2 / ELB
app.get('/health', (req, res) => {
  res.status(200).send('OK - EC2 Server Healthy');
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`E-commerce store running on port ${PORT}`);
});

