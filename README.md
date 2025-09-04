
# Samadhan-2.0

This is Team - ThiRd eye coder

---

### 🚀 Hackathon Mini Tasks Solutions

Ye code.calmchase.com hackathon ke JavaScript, Node.js track ke mere solutions hain.

### 💻 How to Run This Code

Agar aapko ye code apne system pe chalana hai:

1.  Sabse pehle **Node.js** install hona chahiye.
2.  Repository ko clone karo ya download karo.
3.  Terminal open karke folder me jao: `cd Samadhan-2.0`
4.  Koi bhi din ka task run karne ke liye command likho:
    ```sh
    node Day1.js
    node Day2.js
    node Day3.js
    ```

---

### 📸 My Code Output

Sir, maine code run kiya tha aur ye output aaya hai mere terminal me.

#### **Day 1: Student Details Output**

![Day 1 Output](https://i.ibb.co/Rd1PcP0/Screenshot-2025-08-25-at-1-35-37-PM.png)

#### **Day 2: Highest Marks Output**

![Day 2 Output](https://i.ibb.co/mrVHStv3/Screenshot-2025-08-25-at-1-38-21-PM.png)


#### **Day 3: Marks Calculator Output**

![Day 3 Output](https://i.ibb.co/ksRq6Prr/Screenshot-2025-08-25-at-1-38-47-PM.png)

#### **Day 4 Mini Task: API returning "Hello, World!"**

![Day 4 Output](https://i.ibb.co/Mkjw028s/Screenshot-2025-08-25-at-9-46-41-PM.png)

#### **Day 5 Mini Task: API returning student list in JSON**

Day 5 bhi ho gaya! Aaj Express.js use kiya. Ye Node.js se server banane ko bahut easy bana deta hai.

Task tha students ki list JSON format me bhejne ka. Maine ek `students` array banaya aur `app.get` se ek route (`/students`) banake `res.json` se usko bhej diya.

`npm install express` karna pada tha pehle. Code chal gaya aur browser me JSON dikh raha hai. Bahut sahi feeling aa rahi hai ab. 😎

Is file ko run karne ke liye `node day5_student_api.js` type karna hai terminal me.

----

### Day 7: React Basics - Counter & Live Text Preview

Day 7 se React shuru ho gaya! 🎉

Pehli baar `useState` hook use kiya. Task me do parts the: ek counter jo button click pe badhta/ghatta hai aur ek input box jisme jo bhi type karte hain, wo live screen pe dikhta hai. React ka state management dekh ke maza aa gaya! ✨

----

### Day 8: React State - To-Do List

Day 8 me ek To-Do List banayi. Isme naye tasks add kar sakte hain aur unhe "Done" mark kar sakte hain (jo unhe delete kar deta hai).

State me array manage karna thoda tricky tha pehle, especially `filter` method use karke items remove karna, but ab clear ho gaya hai. Ye sab kuch local state me hai, matlab page refresh karne pe sab gayab ho jaata hai. 😂

----

### Day 9: Connecting Frontend & Backend - Student Directory

Day 9 was mind-blowing! 🤯

Finally, apni backend Express API ko React frontend se connect kiya. Backend server se students ki list `fetch` ki aur frontend pe table me show karwaya. CORS error aaya tha pehle, usko fix karne me thoda time laga. But frontend-backend ka connection successfully ho gaya. Full stack developer wali feeling aa rahi hai ab!

----

### Day 10: React Components & Styling - Product Cards

Day 10 me styling aur components pe focus kiya. Ek dummy product data (array of objects) liya aur usko `.map()` function se multiple Product Cards me display karwaya.

Thodi CSS bhi lagayi taaki cards aache dikhein. Ek component banake usko baar-baar use karne ka concept aache se samajh aa gaya. Components are cool! 😎

----

### Day 11: Backend CRUD - Student API

Day 11 Done! ✅

Aaj ek complete **CRUD API** banayi. CRUD ka matlab hai Create, Read, Update, Delete.
* `GET /students` - Saare students ki list deta hai.
* `POST /students` - Naya student add karta hai.
* `PUT /students/:id` - Ek specific student ko update karta hai.
* `DELETE /students/:id` - Ek specific student ko delete karta hai.

Data store karne ke liye abhi ek simple array use kiya hai. Isko test karne ke liye VS Code ka **Thunder Client** extension use kiya, kyunki POST, PUT, DELETE browser se direct nahi chalte.

Ab aage database connectivity seekhna hai shayad. Backend developer wali feeling strong ho rahi hai! 🚀

----

### Day 12: React + API - Full Stack To-Do App

Day 12 was the real deal! 🔥

Ek complete **Full Stack To-Do App** banayi. Iska backend Node/Express me hai aur frontend React me.

* **Backend:** `GET`, `POST`, `DELETE` routes banaye to-dos ko manage karne ke liye. `CORS` package use karna pada frontend-backend connection ke liye.
* **Frontend:** Pehli baar **`useEffect`** hook use kiya. Component load hote hi backend se data fetch karke screen pe dikhaya. Add aur Delete functionality bhi API calls ke through ho rahi hai.

Ab data page refresh karne par delete nahi hota! It's permanently stored in the backend (jab tak server chalu hai). Amazing experience! 🚀


-----

### Day 13: Database Basics - Full-Stack Notes App

Day 13 was a HUGE step! Finally, we are using a real database. Ab hamara data permanent hai! 🤯

* **Tech Used:** **MongoDB** (with **MongoDB Atlas** for cloud hosting) and **Mongoose** for connecting our Express app to the database.
* **Task:** Ek full-stack CRUD Notes App banaya. Backend me notes create, read aur delete kar sakte hain, aur saara data MongoDB me store ho raha hai.
* **Key Learnings:**
    * Mongoose se Schema (data ka blueprint) aur Model banana seekha.
    * Saare CRUD operations ko `async/await` use karke update kiya taaki wo database se interact kar sakein.
    * Mongoose methods jaise `Note.find()`, `newNote.save()`, aur `Note.findByIdAndDelete()` use kiye.
* **Frontend:** Frontend ka code Day 12 To-Do App jaisa hi hai, bas `fetch` calls ko `/todos` ki jagah `/notes` pe point kiya aur state ko title/content ke hisab se manage kiya.

Server band karke restart karne ke baad bhi data wahin tha... This is the real power of backend! 🔥

----

### Day 14: Authentication Basics - User Auth API

Day 14 was all about security! 🛡️ Aaj users ke liye ek secure Registration aur Login system ka backend banaya.

* **Task:** Ek backend-only API banayi jisme do main endpoints hain: `/register` aur `/login`.
* **Key Learnings:**
    * Passwords ko kabhi bhi plain text me save nahi karna chahiye! **`bcryptjs`** library use karke passwords ko **hash** karna seekha.
    * Successful login ke baad user ko ek **JWT (JSON Web Token)** generate karke dena seekha. Ye token ek "logged-in" proof ki tarah kaam karta hai.
    * `bcrypt.hash()` aur `bcrypt.compare()` ka use samajh aa gaya.
    * `jwt.sign()` se token banate hain aur usme user ki ID jaisi important info daal sakte hain.

Abhi sirf backend hai, isko frontend se connect karna next step hoga shayad. This was one of the most important topics so far!

-----


### Day 15: React + Auth - Complete Full-Stack App

Day 15 - The Grand Finale! Sab kuch connect ho gaya! 🚀

* **Task:** Day 14 ke Auth backend ko React frontend se connect karke ek complete **Full-Stack Authentication** system banaya.
* **Key Learnings:**
    * React me Login/Register forms banaye aur `fetch` se backend API ko call kiya.
    * Login ke baad backend se mile **JWT token** ko **`localStorage`** me save karna seekha. Ye part sabse important tha.
    * **Protected Routes** banana seekha using `react-router-dom`. Ek custom `ProtectedRoute` component banaya jo check karta hai ki user logged in hai ya nahi. Ab `/dashboard` jaisa page sirf logged-in users hi dekh sakte hain.
* **Final Thoughts:** This was the toughest but most rewarding task. Ek complete MERN stack flow (MongoDB, Express, React, Node.js) ab samajh aa gaya hai. Hackathon complete! ✅

Thank you `code.calmchase.com` for this amazing learning experience!


-----

###Day 16 Capstone Project: Samadhan - E-commerce Store

Yeh mere https://www.google.com/search?q=code.calmchase.com hackathon ka final project hai! 🚀

Maine ek complete e-commerce store ka frontend banaya hai. Isme products dekhne se lekar, cart me add karne, aur fake payment karne tak ka poora flow hai. Yeh project ab tak ki meri saari learnings ka combination hai.

🛠️ Tech Stack & Libraries
Is project ko banane ke liye maine modern frontend technologies ka use kiya hai:

Framework: React.js

Build Tool: Vite (Bahut fast hai! ⚡)

Language: TypeScript (Type safety ke liye, isme thoda time laga but maza aaya)

Styling: Tailwind CSS (Modern UI banane ke liye)

Icons: Lucide React (Sundar icons ke liye)

✨ Features
Is application me maine yeh saare features banaye hain:

Product Catalog: Saare products ek sundar grid me dikhte hain.

Search & Filter: Products ko naam se search kar sakte hain aur category se filter bhi kar sakte hain.

Shopping Cart: Ek functional side-cart jisme items add, remove, aur unki quantity update kar sakte hain.

Simulated Checkout: Ek checkout modal jisme Card/UPI payment ka option hai (simulation only).

Payment Success Modal: Successful payment ke baad ek confirmation pop-up aata hai.

Fully Responsive: Website mobile, tablet, aur desktop, teeno par aache se chalti hai.

🚀 How to Run this Project Locally
Is project ko apne laptop par chalane ke liye in steps ko follow karein:

Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

Project folder me jaein:

cd project-folder-name

Saare packages install karein:

npm install

Project ko start karein:

npm run dev

Bas! Ab project aapke browser me http://localhost:5173 (ya kisi aur port) par live ho jayega.

My Learnings & Conclusion
Yeh project banake sach me bahut kuch seekhne ko mila. Components, props, useState, useEffect, aur custom hooks (useCart.ts banane me sabse zyada maza aaya) jaise concepts ab bilkul clear ho gaye hain. TypeScript aur Tailwind CSS ne project ko ek professional feel diya.

Hackathon ka aakhri din tha, aur mujhe lagta hai ki maine apna best diya. Thank you for this amazing course! 🙏


-------

