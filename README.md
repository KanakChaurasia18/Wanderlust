# Project
# 🏨 **StaySphere – Modern Accommodation Booking Platform**

*A full-stack MERN project inspired by Airbnb, with secure authentication, Cloudinary-powered media uploads, and a clean MVC architecture.*

---

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cloudinary-Integrated-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Authentication-JWT%20%2F%20Passport-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Architecture-MVC-purple?style=for-the-badge" />
</p>

---

# 📚 **Table of Contents**

* [✨ Overview](#-overview)
* [🎯 Features](#-features)
* [🛠️ Tech Stack](#️-tech-stack)
* [📂 Folder Structure](#-folder-structure)
* [🧩 Architecture](#-architecture)
* [🔐 Authentication](#-authentication)
* [📸 Image Upload Flow](#-image-upload-flow)
* [🌐 REST API Endpoints](#-rest-api-endpoints)
* [🗄️ Database Schema](#️-database-schema)
* [⚙️ Installation](#️-installation)
* [🔧 Environment Variables](#-environment-variables)
* [📷 Screenshots](#-screenshots)
* [🚀 Future Enhancements](#-future-enhancements)
* [🤝 Contributing](#-contributing)
* [📜 License](#-license)

---

# ✨ **Overview**

**StaySphere** is a full-stack accommodation platform developed using the **MERN stack**, offering a seamless experience for exploring, listing, and booking stays.

Users can browse accommodations, create their own listings, upload images, write reviews, and manage hosted properties. The platform features **secure JWT authentication**, **Cloudinary-based image handling**, and **RESTful APIs** built on a clean **MVC architecture**.

This project showcases strong backend engineering, database modeling, REST design, authentication flows, and practical integration of file storage systems.

---

# 🎯 **Features**

### 👤 **User Management**

* User registration & login
* Secure JWT/Passport authentication
* Profile validation
* Flash messages for feedback

### 🏡 **Listings**

* Create, update, delete listings
* Upload multiple images
* Rich listing details page
* Listing ownership protection

### 📝 **Reviews**

* Leave reviews on listings
* Edit/delete own reviews
* Ratings displayed visually

### 🛡️ **Security**

* Hashed passwords (bcrypt)
* Protected routes
* Owner-only access
* Validation middleware

---

# 🛠️ **Tech Stack**

### **Frontend**

* EJS Templates
* Bootstrap / Custom CSS
* Client-side form validation

### **Backend**

* Node.js
* Express.js
* MongoDB & Mongoose
* MVC Design Pattern

### **Other Integrations**

* **Multer** → file upload
* **Cloudinary** → media storage
* **JWT / Passport** → auth
* **Connect-Flash** → feedback
* **Dotenv** → environment variables

---

# 📂 **Folder Structure**

```
StaySphere/
│── controllers/       # Business logic
│── init/              # DB initialization scripts
│── models/            # Mongoose schemas
│── public/            # Static files (CSS, JS, images)
│── routes/            # Express route handlers
│── utils/             # Cloudinary config, helpers
│── views/             # EJS templates
│   ├── includes/      # navbar, footer, flash messages
│   ├── layouts/       # reusable layout files
│   ├── listings/      # listing views (new, edit, show)
│   └── users/         # login, signup forms
│── app.js             # Main server file
│── cloudConfig.js     # Cloudinary setup
│── middleware.js      # Auth & validation middleware
│── .env               # Environment variables
│── package.json
```

---

# 🧩 **Architecture**

### ✔ **Model–View–Controller (MVC)**

* **Models:** MongoDB schemas defining users, listings & reviews
* **Controllers:** Contain core logic for CRUD operations
* **Views:** Render dynamic EJS templates
* **Routes:** Map HTTP requests to controllers

### ✔ **Mongoose Object-Relational Mapping**

* Listings reference users & reviews
* Reviews reference authors
* Population used for nested relations

---

# 🔐 **Authentication**

StaySphere uses **JWT / Passport strategy** for secure authentication.

### **Login Flow**

1. User submits credentials
2. Server verifies password (bcrypt)
3. JWT token generated
4. Token sent via cookie/session
5. Protected routes require the token
6. Authorization checks ensure owner access

### **Route Protection Example**

```js
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect("/login");
  next();
}
```

---

# 📸 **Image Upload Flow**

```
Frontend Form → Multer Middleware → Cloudinary Upload → MongoDB Save → Display in UI
```

### **Key Tools**

* **Multer:** Handles image input
* **Cloudinary:** Stores images & returns URLs
* **MongoDB:** Saves metadata (url + publicId)

### **Cloudinary Config**

```js
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
```

---

# 🌐 **REST API Endpoints**

### 🏡 **Listings**

| Method | Route                | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/listings`          | View all listings      |
| GET    | `/listings/new`      | Form to create listing |
| POST   | `/listings`          | Create listing         |
| GET    | `/listings/:id`      | Show listing           |
| GET    | `/listings/:id/edit` | Edit listing           |
| PUT    | `/listings/:id`      | Update listing         |
| DELETE | `/listings/:id`      | Delete listing         |

### 📝 **Reviews**

| Method | Route                   | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/listings/:id/reviews` | Add review    |
| DELETE | `/reviews/:id`          | Remove review |

### 👤 **Users**

| Method | Route     | Description       |
| ------ | --------- | ----------------- |
| GET    | `/signup` | Register page     |
| POST   | `/signup` | Create user       |
| GET    | `/login`  | Login page        |
| POST   | `/login`  | Authenticate user |
| GET    | `/logout` | Logout            |

---

# 🗄️ **Database Schema**

### 🔹 **User**

```js
{
  username: String,
  email: String,
  password: String
}
```

### 🔹 **Listing**

```js
{
  title: String,
  description: String,
  price: Number,
  location: String,
  owner: { type: ObjectId, ref: "User" },
  images: [{ url: String, publicId: String }],
  reviews: [{ type: ObjectId, ref: "Review" }]
}
```

### 🔹 **Review**

```js
{
  rating: Number,
  comment: String,
  author: { type: ObjectId, ref: "User" }
}
```

---

# ⚙️ **Installation**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/StaySphere.git
cd StaySphere
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```env
CLOUD_NAME=xxxxxx
CLOUD_KEY=xxxxxx
CLOUD_SECRET=xxxxxx
MONGO_URL=mongodb://localhost:27017/staysphere
JWT_SECRET=xxxxxx
```

### 4️⃣ Start the server

```bash
node app.js
```

---

# 🔧 **Environment Variables**

| Variable       | Purpose               |
| -------------- | --------------------- |
| `CLOUD_NAME`   | Cloudinary cloud name |
| `CLOUD_KEY`    | Cloudinary API key    |
| `CLOUD_SECRET` | Cloudinary secret     |
| `MONGO_URL`    | Database URL          |
| `JWT_SECRET`   | Token signing secret  |

---

# 📷 **Screenshots**

*Add your images in a folder named `screenshots/` and embed them here.*

Example:

```
![Home Page](screenshots/home.png)
![Listing Details](screenshots/details.png)
```

---

# 🚀 **Future Enhancements**

* Search + advanced filters
* Map integration (Mapbox / Leaflet)
* Wishlist / Favorites
* Host dashboard analytics
* Pagination on listings page
* React or Next.js frontend
* Role-based access (Admin Panel)

---

# 🤝 **Contributing**

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

---

# 📜 **License**

This project is licensed under the **MIT License**.


Just tell me!
