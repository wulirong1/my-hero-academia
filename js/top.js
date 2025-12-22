document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');

    // 1. 監聽滾動事件
    window.addEventListener('scroll', function() {
        // 當滾動超過 300px 時顯示按鈕
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = "1";
            backToTopBtn.style.visibility = "visible";
        } else {
            backToTopBtn.style.opacity = "0";
            backToTopBtn.style.visibility = "hidden";
        }
    });

    // 2. 點擊按鈕回到頂部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});