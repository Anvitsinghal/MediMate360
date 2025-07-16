# 💊 MediMate360

**MediMate360** is a full-stack intelligent healthcare assistant that helps users manage prescriptions, set medicine reminders, explore government health schemes, and access detailed medicine info – all in one platform.

> 🧠 Built with MERN Stack (MongoDB, Express, React, Node.js) and integrated OCR to extract medicine data from uploaded prescriptions.

---

## 🔗 Live Demo

[Visit Site](https://medimate360-frontend.onrender.com)

---

## 📌 Features

- ✅ **User Authentication** (JWT + role-based: user/admin)
- 📷 **Upload Prescriptions** with OCR to detect medicines
- 💊 **Medicine Info**: Dosage, usage, alternatives, side effects & buy links
- ⏰ **Medicine Reminders** with email/notification support
- 📜 **Government Health Schemes** matched by user profile
- 🔍 **Search & Filter Medicines / Schemes**
- 🛠️ **Admin Panel** to manage medicines & schemes
- ☁️ **Cloudinary Integration** for profile and prescription uploads
- 🔄 **State Management** using Redux Toolkit + Persist

---

## 🧪 Tech Stack

| Frontend          | Backend              | Others                     |
|-------------------|----------------------|----------------------------|
| React.js          | Node.js + Express.js | MongoDB Atlas              |
| Tailwind CSS      | Mongoose             | Redux Toolkit + Persist    |
| React Router DOM  | JWT Auth             | Cloudinary API             |
| Axios             | Multer + OCR (Tesseract.js) | Email/Notification Scheduler |

---

## 🚀 Getting Started (Locally)

### 1. Clone the repo

```bash
git clone https://github.com/Anvitsinghal/medimate360.git
cd medimate360
```
### 2. Setup backend

```bash
cd backend
npm install
```
### 3. Create a .env file in ./backed
```bash
PORT=8000
MONGOURI=your_mongo_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloudname
API_KEY=your_cloudinary_apikey
API_SECRET=your_cloudinary_secret
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```
### 4. Start the backend

```bash
npm run dev
```
### 5. Setup Fronend
```bash

cd frontend
npm install
npm run dev
```
---
## Folder Structure(Backend)
```bash
/backend
│
├── server.js                  
├── .env                      
├── package.json
│
├── config/                   
│   ├── db.js                  
│   ├── isAuth.js           
│  
│
├── controllers/             
│   ├── authController.js
│   ├── uploadController.js     
│   ├── medicineController.js   
│   ├── relevanceController.js  
│   ├── reminderController.js   
│   └── schemeController.js     
│
├── routes                  
│   ├──authRoutes.js
│   ├──uploadRoutes.js
│   ├──medicineRoutes.js
│   ├──relevanceRoutes.js
│   ├──reminderRoutes.js
│   └──schemeRoutes.js
│
├── models
│   ├── User.js
│   ├── Medicine.js            
│   ├── Prescription.js        
│   ├── Reminder.js
│   └── Scheme.js             
│
├── middleware             
│   ├──isAdmin.js  
│   
│
├──  utils                   
│   ├── cloudinary.js
│   ├── datauri.js
│   ├── multer.js        
│   ├── ocr.js       
│   ├── reminderCron.js     
│   └── sendEmail.js         

```
## Folder Structure(Frontend)
```bash
\---src
    |   App.css
    |   App.jsx
    |   index.css
    |   main.jsx
    |   Medicines.jsx
    |   
    +---assets
    |       react.svg
    |       
    +---components
    |   |   Admin.css
    |   |   Admin.jsx
    |   |   EditProfile.jsx
    |   |   Home.jsx
    |   |   LeftSidebar.jsx
    |   |   Login.jsx
    |   |   MainLayout.jsx
    |   |   NotFound.jsx
    |   |   Profile.jsx
    |   |   ProtectedRoutes.jsx
    |   |   Register.jsx
    |   |   RelevanceChecker.jsx
    |   |   Reminders.jsx
    |   |   SchemeDetail.jsx
    |   |   Schemes.jsx
    |   |   Updatescheme.jsx
    |   |   UploadPrescription.jsx
    |   |   
    |   \---ui
    |           avatar.jsx
    |           
    +---Hooks
    |       medicinehook.jsx
    |       
    +---lib
    |       utils.js
    |       
    \---Redux
            authSlice.js
            medicineSlice.js
            prescriptionSlice.js
            reminderSlice.js
            schemeSlice.js
            store.js
            userSlice.js
```
---
## 🖼️ Screenshots

<img width="1916" height="907" alt="Screenshot 2025-07-16 153925" src="https://github.com/user-attachments/assets/c8fc9aec-fa20-4d3e-bcc0-5bc89469e221" />
<img width="1901" height="907" alt="Screenshot 2025-07-16 154014" src="https://github.com/user-attachments/assets/97a28ce3-072b-4a3f-9300-04ecc47c9477" />
<img width="1900" height="906" alt="Screenshot 2025-07-16 154055" src="https://github.com/user-attachments/assets/36d55bf8-f0e4-42d8-ab1a-4cb3bbbe33b8" />
<img width="1914" height="907" alt="Screenshot 2025-07-16 154128" src="https://github.com/user-attachments/assets/90dc1473-ed85-409f-b73b-c4d4a7aace56" />
<img width="1903" height="909" alt="Screenshot 2025-07-16 154146" src="https://github.com/user-attachments/assets/f5fea50b-63f7-41df-9ee9-c7bb5b7bf8d9" />
<img width="1884" height="909" alt="Screenshot 2025-07-16 154235" src="https://github.com/user-attachments/assets/7be688c2-bb76-4873-bd9c-ce1ba5657ee6" />
<img width="1868" height="904" alt="Screenshot 2025-07-16 154253" src="https://github.com/user-attachments/assets/b99ce75a-e83f-4e70-bd45-dc5148c8e299" />
<img width="1879" height="904" alt="Screenshot 2025-07-16 154320" src="https://github.com/user-attachments/assets/9a9f8f02-5daa-408e-a2f2-71326803ad4d" />

---
