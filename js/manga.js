document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('manga-list-container');
    const overlay = document.getElementById('manga-overlay');

    // 1. 渲染資料
    const mangaData = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        img: `img/manga/manga${i + 1}.png`,
        link: `#`,
        desc: `【Vol. ${i + 1}】這是詳細內容簡介。點擊空白處或遮罩即可關閉。`
    }));

    container.innerHTML = mangaData.map(manga => `
        <div class="col-6 col-md-3 col-lg-2 manga-item">
            <div class="manga-card-wrapper">
                <img class="manga-pic" src="${manga.img}">
                <div class="manga-detail-card">
                    <div class="card-left"><img src="${manga.img}"></div>
                    <div class="card-right">
                        <div class="info-box">${manga.desc}</div>
                        <a href="${manga.link}" target="_blank" class="buy-button">點擊購買</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // 2. 開啟動畫
    function openCard(item) {
        const detailCard = item.querySelector('.manga-detail-card');
        if (item.classList.contains('active')) return;

        closeAll();
        item.classList.add('active');
        item.style.zIndex = "1001";
        
        gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3 });

        const isMobile = window.innerWidth < 768;
        const rect = item.getBoundingClientRect();
        // 判斷是在螢幕左側還是右側
        const direction = (rect.left + rect.width / 2 > window.innerWidth / 2) ? -1 : 1;

        gsap.set(detailCard, { display: 'flex' });

        if (isMobile) {
            // 手機版：固定置中
            gsap.fromTo(detailCard, 
                { opacity: 0, scale: 0.8, xPercent: -50, yPercent: -50, left: "50%", top: "50%", x: 0 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", pointerEvents: "auto" }
            );
        } else {
            // 桌機/平板：對齊邏輯
            gsap.fromTo(detailCard, 
                { 
                    opacity: 0, scale: 0.8, yPercent: -50,
                    // 重要：如果是右邊卡片(-1)，起始定位在右緣(left:100%)並往回推自身寬度(xPercent:-100)
                    left: direction === 1 ? '0%' : '100%',
                    xPercent: direction === 1 ? 0 : -100,
                    x: direction === 1 ? -20 : 20 
                },
                { 
                    opacity: 1, 
                    scale: 1, 
                    x: 0, // 動畫結束時回到 0，達成對齊邊緣
                    duration: 0.4, 
                    ease: "power2.out", 
                    pointerEvents: "auto" 
                }
            );
        }
    }

    // 3. 關閉函數
    function closeCard(item) {
        const detailCard = item.querySelector('.manga-detail-card');
        if (!item.classList.contains('active')) return;

        item.classList.remove('active');
        gsap.to(detailCard, {
            opacity: 0, scale: 0.8, duration: 0.2, 
            onComplete: () => {
                gsap.set(detailCard, { display: 'none' });
                item.style.zIndex = "1";
            }
        });
        
        if (document.querySelectorAll('.manga-item.active').length === 0) {
            gsap.to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.2 });
        }
    }

    function closeAll() {
        document.querySelectorAll('.manga-item.active').forEach(item => closeCard(item));
        gsap.to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.2 });
    }

    // 4. 事件綁定
    container.addEventListener('mouseover', (e) => {
        if (window.innerWidth >= 992) {
            const item = e.target.closest('.manga-item');
            if (item) openCard(item);
        }
    });

    container.addEventListener('mouseout', (e) => {
        if (window.innerWidth >= 992) {
            const item = e.target.closest('.manga-item');
            const related = e.relatedTarget;
            if (item && (!related || !item.contains(related))) closeCard(item);
        }
    });

    container.addEventListener('click', (e) => {
        const item = e.target.closest('.manga-item');
        if (!item || e.target.closest('.buy-button')) return;
        e.stopPropagation();
        item.classList.contains('active') ? closeCard(item) : openCard(item);
    });

    // 點擊遮罩或任何空白處收起
    overlay.addEventListener('click', closeAll);
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.manga-detail-card') && !e.target.closest('.manga-item')) {
            closeAll();
        }
    });
});