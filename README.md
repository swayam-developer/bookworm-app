<img width="1536" height="1024" alt="ChatGPT Image Feb 1, 2026, 04_33_17 PM" src="https://github.com/user-attachments/assets/111f3e87-8f3a-43da-bfc5-83d8633e9611" />

---

# 📚 Bookworm – Social Book Recommendation App (Backend)

 A social book recommendation application where users can share books, rate them, upload images, and explore recommendations from others.
The backend is built with **Node.js and Express**, providing secure, scalable REST APIs consumed by the React Native frontend.

---

## ✨ Features

* User authentication (Register / Login)
* JWT-based authorization
* CRUD operations for book recommendations
* User-specific book feeds
* Secure image handling via Cloudinary
* Pagination support for scalable feeds
* Proper error handling and validation

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (JSON Web Tokens)**
* **Cloudinary** (Image storage & optimization)
* **CORS & Compression**
* **RESTful APIs**

---

## 📂 API Modules

* **Auth**

  * User registration
  * User login
  * Token validation
* **Books**

  * Create recommendation
  * Get all recommendations (paginated)
  * Get user-specific recommendations
  * Delete recommendation

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/swayam-developer/bookworm-app.git
cd bookworm-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Start the server**

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 🔐 Security & Best Practices

* Password hashing before storage
* Token-based authentication for protected routes
* CORS configuration for allowed origins
* Request size limits and compression
* Centralized error handling

---

## 🚀 Performance Considerations

* Pagination for large datasets
* Optimized database queries using Mongoose
* Response compression to reduce payload size
* Clean API structure for scalability

---

## 📌 Project Status

The backend is stable and continuously evolving with a focus on:

* Performance improvements
* Better API structure
* Enhanced security

---

## 👨‍💻 Author

**Swayam Sathawane**
Full Stack / Backend Developer

---


