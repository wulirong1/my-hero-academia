// 從 Firebase 官網引入必要的模組
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- 請在此處貼上你在 Firebase Console 取得的設定資訊 ---
const firebaseConfig = {
  apiKey: "AIzaSyDidZ7Houl0AffdLEwJN2elIK2pclEApBE",
  authDomain: "my-hero-academia-84e17.firebaseapp.com",
  projectId: "my-hero-academia-84e17",
  storageBucket: "my-hero-academia-84e17.firebasestorage.app",
  messagingSenderId: "327016549876",
  appId: "1:327016549876:web:6e2ec2e2756b8d31787da1"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "comments");

// 綁定 HTML 元素
const submitBtn = document.getElementById('submitBtn');
const userNameInput = document.getElementById('userName');
const commentContentInput = document.getElementById('commentContent');
const commentList = document.getElementById('commentList');

// 功能 A：發布留言到 Firestore
const postComment = async () => {
    const name = userNameInput.value.trim();
    const content = commentContentInput.value.trim();

    if (name === "" || content === "") {
        alert("請填寫名稱與內容喔！");
        return;
    }

    try {
        await addDoc(colRef, {
            name: name,
            content: content,
            createdAt: serverTimestamp()
        });
        userNameInput.value = "";
        commentContentInput.value = "";
    } catch (error) {
        console.error("發布失敗：", error);
    }
};

// 功能 B：監聽資料庫並渲染畫面
const listenToComments = () => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    
    onSnapshot(q, (snapshot) => {
        commentList.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            // 處理時間戳記 (防止資料剛傳上去時 createdAt 還沒產生)
            const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : "處理中...";
            
            // 建立留言卡片 HTML
            const card = `
                <div class="p-3 mb-3" style="background-color: #EBC053; border: 3px solid #000; border-radius: 8px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0"><strong>${data.name}</strong></h5>
                        <small>${dateStr}</small>
                    </div>
                    <hr style="border: 1px solid #000;">
                    <p class="mb-0">${data.content}</p>
                </div>
            `;
            commentList.innerHTML += card;
        });
    });
};

// 執行
submitBtn.addEventListener('click', postComment);
listenToComments();