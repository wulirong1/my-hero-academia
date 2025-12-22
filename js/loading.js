window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    // 讓載入畫面淡出
    loadingScreen.style.opacity = '0';
    // 等淡出動畫結束後，徹底移除該節點，以免擋住網頁點擊
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
});