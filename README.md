
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

### Day 16 Capstone Project: Samadhan - E-commerce Store

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


-----


### Day 17: Samashan - Real-time Chat Application

Yeh mere https://www.google.com/search?q=code.calmchase.com hackathon ka Day 17 ka project hai. Iska naam maine "समाधान" rakha hai. 🚀

Yeh ek simple, sundar, aur real-time chat application hai. Is project ko banane me bahut maza aaya, especially UI components ke saath.

🛠️ Tech Stack & Libraries
Is project ka UI aacha banane ke liye maine kuch naye tools try kiye hain:

Framework: React.js

Build Tool: Vite

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/ui (Isse UI banana bahut aasan aur flexible ho gaya!)

Icons: Lucide React

✨ Features
💬 Real-time Messaging (Simulated): Abhi backend nahi hai, isliye setInterval se naye messages aane ki simulation banayi hai.

👥 User Status Indicators: Kaunsa user online hai aur kaunsa offline, yeh live dikhta hai.

📱 Fully Responsive Design: Application desktop aur mobile, dono par perfectly kaam karti hai.

🎨 Clean & Modern Interface: Shadcn/ui se ek professional aur clean UI banaya hai.

🚀 Auto-Scrolling: Naye message aane par chat window automatically scroll ho jaati hai.

🤖 Mock Replies: Message bhejne ke 2 second baad ek automatic reply aata hai, taaki chat real lage.

🚀 How to Run this Project Locally
Is project ko apne system par chalane ke liye:

Clone the repository:

git clone [https://github.com/your-username/samadhaan-chat.git](https://github.com/your-username/samadhaan-chat.git)

Project folder me jaein:

cd samadhaan-chat

Saare packages install karein:

npm install

Project ko start karein:

npm run dev

Bas! Ab project aapke browser me http://localhost:8080 par live ho jayega.

My Learnings & Conclusion
Day 17 ka project aakhri project se bhi zyada challenging tha. Isme maine Shadcn/ui ko aache se explore kiya aur seekha ki kaise ek aacha design system banate hain. Real-time features ko simulate karna bhi ek aacha experience tha.

Hackathon ke is poore safar me, yeh project UI/UX ke mamle me mera sabse best kaam hai. I'm very happy with the final result! 😊
Hackathon ka aakhri din tha, aur mujhe lagta hai ki maine apna best diya. Thank you for this amazing course! 🙏


-------


### Day 18: TaskFlow - Kanban Board

Day 18 ka project complete! Yeh ab tak ka sabse complex aur mazedaar project tha. Maine Trello jaisa ek Kanban Task Management Board banaya hai. 🚀

Iska sabse cool feature hai tasks ko drag karke ek column se dusre me move karna. Isko banane me bahut kuch naya seekhne ko mila.

🛠️ Tech Stack & Libraries
Is project ko banane ke liye maine modern frontend technologies ka use kiya hai:

Framework: React.js

Build Tool: Vite

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/ui (Isse UI ekdum professional lag raha hai!)

Drag & Drop: React Beautiful DnD (Yeh wala part thoda tricky tha, but finally ho gaya! 😎)

✨ Features
✅ Drag & Drop: Tasks ko To Do, In Progress, aur Done columns ke beech aasani se move kar sakte hain.

➕ Add New Tasks: Ek modal se naye tasks add kar sakte hain, jisme title, description, priority, aur due date set kar sakte hain.

🎨 Priority Badges: Har task ki priority (Low, Medium, High) alag-alag color ke badge se dikhti hai.

📅 Due Dates: Har task par uski due date bhi dikhti hai.

📱 Responsive Design: Board mobile aur desktop, dono par aache se kaam karta hai.

💾 Local State: Saare tasks abhi browser ke local state mein save ho rahe hain.

🚀 How to Run this Project Locally
Is project ko apne system par chalane ke liye:

Repository ko clone karein:

git clone [https://github.com/your-username/taskflow-kanban.git](https://github.com/your-username/taskflow-kanban.git)

Project folder me jaein:

cd taskflow-kanban

Saare packages install karein:

npm install

Project ko start karein:

npm run dev

Bas! Ab project aapke browser me http://localhost:8080 par live ho jayega.

My Learnings & Conclusion
Day 18 ka project aab tak ka sabse challenging tha. react-beautiful-dnd library se drag and drop ka logic aache se samajh aa gaya. Complex state ko manage karna (array of objects) aur usko onDragEnd function me update karna ek aacha experience tha.

Shadcn/ui ke components use karke UI banana bahut hi fast aur aasan ho gaya. Overall, is project ko banake full-stack developer banne ka confidence aur badh gaya hai. I'm very happy with the final result! 😊

------

### Day 19: TaskFlow - SocialFeed - A Modern Social Media App

Day 19 ka task to ekdam next level tha! Maine ek social media feed application ka frontend banaya hai, thoda-thoda Twitter jaisa. Isme posts hain, user profiles hain, aur ek clean layout hai. 🚀

Is project me maine pehli baar itne saare components aur pages ko ek saath manage kiya hai.

🛠️ Tech Stack & Libraries
Is project ko banane ke liye maine professional tools ka use kiya hai:

Framework: React.js

Build Tool: Vite

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/ui (Yeh best cheez hai! Isse UI banana bahut hi aasan ho gaya.)

Routing: React Router DOM (Alag-alag pages banane ke liye)

Icons: Lucide React

✨ Features
📜 Infinite Scroll Feed: Home page par saare users ke posts dikhte hain (abhi dummy data se).

➕ Create New Post: User naye posts create karke feed me add kar sakta hai.

👤 User Profiles: Kisi bhi user ke naam par click karke uski profile page par ja sakte hain.

❤️ Like & Comment Actions: Har post par like aur comment karne ke buttons hain (functionality abhi UI only hai).

📱 Fully Responsive Layout: Ek proper sidebar ke saath jo mobile par bhi aache se kaam karta hai.

🚀 How to Run this Project Locally
Is project ko apne system par chalane ke liye in steps ko follow karein:

Repository ko clone karein:

git clone [https://github.com/your-username/socialfeed-app.git](https://github.com/your-username/socialfeed-app.git)

Project folder me jaein:

cd socialfeed-app

Saare packages install karein:

npm install

Project ko start karein:

npm run dev

Bas! Ab project aapke browser me http://localhost:8080 par live ho jayega.

My Learnings & Conclusion
Day 19 ka project banane me bahut kuch seekha. Pehli baar React Router DOM use karke multiple pages banaye aur unke beech navigation handle kiya. Shadcn/ui ke saath kaam karke component-based UI design ki power samajh aayi.

Yeh project ab tak ka mera sabse complete frontend application hai. Isko banane ke baad ab main kisi bhi tarah ka complex UI bana sakta hu. I am really proud of this one! 😊

------

### Day 20: Weatherly - A Minimal Weather Dashboard

Day 20 DONE! 🔥 Is baar ekdum real-world application banayi hai - ek live Weather Dashboard jiska naam maine "Weatherly" rakha hai.

Is project me pehli baar maine ek real external API (OpenWeatherMap) se data fetch kiya hai. API key ke chakkar me thoda error aaya tha, but ab sab set hai. 😎

🛠️ Tech Stack & Libraries
Is project ko banane ke liye maine professional tools ka use kiya hai:

Framework: React.js

Build Tool: Vite

Language: TypeScript

Styling: Tailwind CSS

UI Components: Shadcn/ui (Isse UI ekdum premium lagta hai!)

Icons: Lucide React

✨ Features
🌦️ Live Weather Data: Real-time me current temperature, humidity, aur wind speed dikhata hai.

📍 Geolocation Support: App khulte hi aapki current location ka weather automatically dikha deta hai.

🔍 City Search: Aap kisi bhi city ka naam daal kar wahan ka weather check kar sakte hain.

📅 5-Day Forecast: Aane waale 5 dino ka weather forecast bhi dikhata hai.

⏳ Loading & Error States: Data load hote time skeleton loaders dikhte hain, jisse user experience aacha rehta hai.

📱 Fully Responsive Design: Desktop aur mobile, dono par aache se chalta hai.

🚀 How to Run this Project Locally
IMPORTANT: Is project ko chalane ke liye aapko OpenWeatherMap se ek free API key ki zaroorat padegi.

OpenWeatherMap par signup karke apni API key lein.

Repository ko clone karein:

git clone [https://github.com/your-username/weatherly-app.git](https://github.com/your-username/weatherly-app.git)

Project folder me jaein:

cd weatherly-app

Root folder me .env.local naam ki ek file banayein aur usme apni API key aise daalein:

VITE_WEATHER_API_KEY=your_actual_api_key_here

Saare packages install karein:

npm install

Project ko start karein:

npm run dev

-------



