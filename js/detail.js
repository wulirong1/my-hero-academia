import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!postId) {
    alert("找不到討論！");
    window.location.href = "pla.html"; // 改回你的主頁檔名
}

// 1. 取得主討論內容
const postRef = doc(db, "comments", postId);
getDoc(postRef).then((docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('originalPostArea').innerHTML = `
            <h5><strong>${data.name}</strong> <small class="text-muted">${data.createdAt?.toDate().toLocaleDateString() || ''}</small></h5>
            <p class="mt-3">${data.content}</p>
        `;
    }
});

// 2. 監聽子留言
const replyColRef = collection(db, "comments", postId, "replies");
onSnapshot(query(replyColRef, orderBy("createdAt", "asc")), (snapshot) => {
    const replyList = document.getElementById('replyList');
    replyList.innerHTML = "";
    snapshot.forEach((doc) => {
        const data = doc.data();
        replyList.innerHTML += `
            <div class="mb-2 py-2 border-bottom border-secondary">
                <strong>${data.name}：</strong><span>${data.content}</span>
            </div>
        `;
    });
});

// 3. 送出新留言
document.getElementById('submitReply').addEventListener('click', async () => {
    const name = document.getElementById('replyName').value.trim();
    const content = document.getElementById('replyContent').value.trim();
    if (!name || !content) return;

    await addDoc(replyColRef, { name, content, createdAt: serverTimestamp() });
    document.getElementById('replyContent').value = "";
});

// 在 detail.js 的 getDoc 渲染部分修改
getDoc(postRef).then((docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('originalPostArea').innerHTML = `
            <h5><strong>${data.name}</strong> <small class="text-muted">${data.createdAt?.toDate().toLocaleDateString() || ''}</small></h5>
            <p class="mt-3" style="white-space: pre-wrap; word-wrap: break-word;">${data.content}</p>
        `;
    }
});

