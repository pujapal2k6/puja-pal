# CloudMart E-Commerce (AWS EC2 & S3)

A responsive, lightweight e-commerce web application built with Node.js and Express, designed for deployment on **AWS EC2** with image/asset hosting via **Amazon S3**.

---

## 📁 Project Structure
```
ecommerce-aws-app/
├── public/
│   ├── index.html     # Responsive storefront UI & Cart modal
│   ├── style.css      # Modern stylesheet
│   └── app.js         # Interactive product rendering & checkout logic
├── server.js          # Express server with REST APIs & static file hosting
├── package.json       # Project dependencies & scripts
├── .gitignore
└── README.md
```

---

## 🚀 How to Run Locally

1. Open a terminal in this directory:
   ```bash
   cd ecommerce-aws-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Visit `http://localhost:80` (or `http://localhost:3000` if you set `PORT=3000`).

---

## ☁️ AWS Deployment Guide: Getting Your Live Webpage Link

Follow the complete step-by-step guide provided in the deployment walkthrough to set up **Amazon S3** and **Amazon EC2** to obtain your public live URL (e.g. `http://<ec2-public-ip>/`).

