
---

## ✅ Server (`/Server`) — Backend (Node.js + Express + MongoDB)

```markdown
# Boom 🎥 - Server (Backend)

The backend of **Boom**, a video-centric platform supporting video purchases, user profiles, gift transactions, and wallet management. Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Register / Login)
- 🧾 Manage user profiles and wallet balance
- 🎥 Purchase and retrieve video data
- 💝 Send gifts to creators
- 📜 REST API with organized routes & controllers
- 🔄 MongoDB models using Mongoose

---

## 📁 Project Structure

Server/
├── controllers/
│ ├── authController.js
│ ├── videoController.js
| ├── commentController.js
| ├── purchaseController.js
| ├── giftController.js
│ └── userController.js
├── models/
│ ├── User.js
│ ├── Video.js
| ├── Comment.js
| ├── Purchase.js
│ └── Gift.js
├── routes/
│ ├── authRoutes.js
│ ├── userRoutes.js
| ├── CommentRoutes.js
| ├── GiftRoutes.js
│ └── videoRoutes.js
├── middleware/
| ├── multerConfig.js
| ├── validators.js
│ └── authMiddleware.js
├── .env
├── server.js
└── package.json


---

## ⚙️ Setup & Development

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/boom-server.git
   cd boom-server
npm install
PORT=5000
MONGO_URI=mongodb://localhost:27017/boom
JWT_SECRET=your_jwt_secret_key
npm run dev
🛠 API Endpoints
Method	Route	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/user/profile	Get profile info
GET	/api/user/purchases	List of purchased videos
GET	/api/user/gifts	List of sent gifts
POST	/api/video/purchase	Purchase a video
POST	/api/video/gift	Gift a creator
GET	/api/video/:id	Get video details by ID

🛠 Built With
Node.js

Express.js

MongoDB

Mongoose

JWT

dotenv

cors
