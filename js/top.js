document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');

    // 1. 監聽滾動事件，決定按鈕何時出現
    window.addEventListener('scroll', () => {
        // 當滾動超過 300 像素時顯示按鈕
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 2. 點擊按鈕回到頂部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滾動效果
        });
    });
});