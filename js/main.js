import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDidZ7Houl0AffdLEwJN2elIK2pclEApBE",
  authDomain: "my-hero-academia-84e17.firebaseapp.com",
  projectId: "my-hero-academia-84e17",
  storageBucket: "my-hero-academia-84e17.firebasestorage.app",
  messagingSenderId: "327016549876",
  appId: "1:327016549876:web:6e2ec2e2756b8d31787da1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "comments");

const submitBtn = document.getElementById('submitBtn');
const userNameInput = document.getElementById('userName');
const commentContentInput = document.getElementById('commentContent');
const commentList = document.getElementById('commentList');

// 發布討論
submitBtn.addEventListener('click', async () => {
    const name = userNameInput.value.trim();
    const content = commentContentInput.value.trim();
    if (name === "" || content === "") return alert("請填寫內容");

    try {
        await addDoc(colRef, { name, content, createdAt: serverTimestamp() });
        userNameInput.value = "";
        commentContentInput.value = "";
    } catch (e) { console.error(e); }
});

// 監聽並渲染討論列表
onSnapshot(query(colRef, orderBy("createdAt", "desc")), (snapshot) => {
    commentList.innerHTML = ""; 
    snapshot.forEach((doc) => {
        const data = doc.data();
        const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "處理中...";
        
        // 建立討論框 HTML，加入點擊跳轉事件
        const card = document.createElement('div');
        card.className = "p-3 mb-3 discussion-box";
        card.style = "background-color: #EBC053; border: 3px solid #000; border-radius: 8px; cursor: pointer;";
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0"><strong>${data.name}</strong></h5>
                <small>${dateStr}</small>
            </div>
            <hr style="border: 1px solid #000;">
            <p class="mb-0">${data.content}</p>
        `;

        // 核心跳轉邏輯
        card.addEventListener('click', () => {
            window.location.href = `detail.html?id=${doc.id}`;
        });

        commentList.appendChild(card);
    });
});


