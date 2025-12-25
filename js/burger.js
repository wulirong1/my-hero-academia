
document.addEventListener('DOMContentLoaded', function () {

    // =========================================
    // 1. 漢堡選單功能 (原本的)
    // =========================================
    const menu = document.querySelector('#mobile-menu');
    const nav = document.querySelector('.nav-links');

    if (menu) {
        menu.onclick = function () {
            menu.classList.toggle('active');
            nav.classList.toggle('show');
        };
    }

    // =========================================
    // 2. NEWS 卡片手機版翻轉功能 (新增的)
    // =========================================
    const newsLinks = document.querySelectorAll('.news-card-link');

    newsLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 偵測螢幕寬度，小於等於 992px (平板/手機) 才啟動
            if (window.innerWidth <= 992) {

                // 檢查這個卡片是否已經是「翻轉 (active)」狀態
                if (!this.classList.contains('active')) {
                    // 如果還沒翻轉：
                    e.preventDefault(); // 1. 阻止跳轉連結，先不要去新網頁

                    // (選用) 如果希望點這張卡時，把別張卡關起來，留著這行：
                    newsLinks.forEach(l => l.classList.remove('active'));

                    this.classList.add('active'); // 2. 加上 active 讓它翻轉
                }
                // 如果已經翻面了 (有 active)，就不會執行上面，直接跳轉
            }
        });
    });

    // (額外功能) 點擊畫面空白處，把卡片翻回來
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            // 如果點擊的地方「不是」卡片本身
            if (!e.target.closest('.news-card-link')) {
                newsLinks.forEach(l => l.classList.remove('active'));
            }
        }
    });

});