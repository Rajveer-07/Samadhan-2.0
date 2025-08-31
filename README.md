
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
