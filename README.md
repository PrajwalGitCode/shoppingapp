markdown
# MERN Stack E-Commerce Application

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

- **User Authentication** (Register/Login with JWT)
- **Product Management** (CRUD operations)
- **Shopping Cart** (Add/Remove items)
- **Checkout System** (Order processing)
- **Responsive Design** (Dark mode UI)

## 📁 Project Structure
ecommerce-app/
├── backend/ # Node.js/Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── server.js
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md

text

## 🛠 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ecommerce-app
2. Backend Setup
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Environment Configuration
# Create a .env file in backend directory with:
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
PORT=5000

# Start the backend server
npm run dev
Backend will run on http://localhost:5000

3. Frontend Setup
bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Environment Configuration
# Create a .env file in frontend directory with:
REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend development server
npm start
Frontend will run on http://localhost:3000

📋 API Endpoints
Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

Products
GET /api/products - Get all products

GET /api/products/my - Get user's products

POST /api/products - Create product

PUT /api/products/:id - Update product

DELETE /api/products/:id - Delete product

Cart
GET /api/cart - Get user's cart

POST /api/cart - Add to cart

DELETE /api/cart/:id - Remove from cart

DELETE /api/cart - Clear cart

Orders
POST /api/orders/checkout - Create order

🗄 Database Models
User - name, email, password

Product - name, price, description, image, owner

CartItem - product, quantity, user

Order - user, items, total, orderId, date

🚀 Deployment
Backend Deployment (Heroku/Railway)
bash
# Set environment variables in your hosting platform
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
Frontend Deployment (Netlify/Vercel)
bash
# Build the project
npm run build

# Set environment variable
REACT_APP_API_URL=your_deployed_backend_url
🐛 Troubleshooting
Common Issues:
Connection Refused

Ensure MongoDB is running

Check backend server is started

CORS Errors

Verify backend CORS configuration

Check API URL in frontend .env

JWT Errors

Verify JWT_SECRET is set in environment

Module Not Found

Delete node_modules and reinstall dependencies

Clear npm cache: npm cache clean --force

📝 Available Scripts
Backend
bash
npm run dev      # Development with nodemon
npm start        # Production start
npm test         # Run tests
Frontend
bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License.

👥 Authors
Your Name - Your GitHub

🙏 Acknowledgments
React.js team

Express.js team

MongoDB team

Lucide React for icons

Tailwind CSS for styling
