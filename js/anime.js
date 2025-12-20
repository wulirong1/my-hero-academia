document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('anime-list-container');
    const overlay = document.getElementById('manga-overlay');
    const portal = document.getElementById('anime-detail-portal');

    const animeData = [
        { id: 'S1', video: 'https://www.youtube.com/embed/D5fYOnwYtjU', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112916', desc: '【第一季】英雄起點：綠谷出久與歐爾麥特的邂逅。' },
        { id: 'S2', video: 'https://www.youtube.com/embed/hS_W_f2As_k', link: 'https://ani.gamer.com.tw/animeRef.php?sn=7825', desc: '【第二季】雄英體育祭：學生們個性的激烈碰撞。' },
        { id: 'S3', video: 'https://www.youtube.com/embed/2_X79Xp_N6Q', link: 'https://ani.gamer.com.tw/animeRef.php?sn=10005', desc: '【第三季】神野之戰：歐爾麥特的最後一戰。' },
        { id: 'S4', video: 'https://www.youtube.com/embed/Yp9H-Hsh0pE', link: 'https://ani.gamer.com.tw/animeRef.php?sn=13745', desc: '【第四季】校外實習：與死穢八齋會的生死決戰。' },
        { id: 'S5', video: 'https://www.youtube.com/embed/8I9L_l35YkY', link: 'https://ani.gamer.com.tw/animeRef.php?sn=22154', desc: '【第五季】聯合訓練：A班與B班的競爭。' },
        { id: 'S6', video: 'https://www.youtube.com/embed/G62m9U89B38', link: 'https://ani.gamer.com.tw/animeRef.php?sn=31154', desc: '【第六季】全面戰爭：英雄與反派的規模衝突。' },
        { id: 'S7', video: 'https://www.youtube.com/embed/fD_0pCenR4Y', link: 'https://ani.gamer.com.tw/animeRef.php?sn=38133', desc: '【第七季】決戰開始：世界命運的轉折點。' },
        { id: 'S8', video: 'https://www.youtube.com/embed/zV8A56X_9wU', link: 'https://ani.gamer.com.tw/', desc: '【最終季】你是下一個：英雄故事的終章。' }
    ];

    if (container) {
        container.innerHTML = animeData.map(item => `
            <div class="col anime-item" data-video="${item.video}" data-link="${item.link}" data-desc="${item.desc}">
                <div class="anime-card-wrapper">
                    <img class="anime-pic" src="img/seasons/${item.id}.png" alt="${item.id}">
                </div>
            </div>
        `).join('');
    }

    function closeAllAnime() {
        const iframe = portal.querySelector('iframe');
        iframe.src = ""; 
        document.querySelectorAll('.anime-item.active').forEach(item => item.classList.remove('active'));

        gsap.to(portal, {
            opacity: 0, scale: 0.8, duration: 0.2, overwrite: true,
            onComplete: () => gsap.set(portal, { display: 'none' })
        });
        gsap.to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.2, overwrite: true });
    }

    function openAnimeCard(item) {
        if (window.closeAllManga) window.closeAllManga(); // 互斥關閉

        portal.querySelector('iframe').src = item.getAttribute('data-video');
        portal.querySelector('.watch-button').href = item.getAttribute('data-link');
        portal.querySelector('.video-info').innerText = item.getAttribute('data-desc');

        item.classList.add('active');
        gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3, overwrite: true });
        gsap.set(portal, { display: 'flex' });

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            gsap.fromTo(portal, 
                { opacity: 0, scale: 0.8, xPercent: -50, yPercent: -50, left: "50%", top: "50%", x: 0 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", overwrite: true }
            );
        } else {
            const rect = item.getBoundingClientRect(); 
            const cardWidth = 400; 
            // 判斷圖片中心點在視窗左側(1)或右側(-1)
            const direction = (rect.left + rect.width / 2 > window.innerWidth / 2) ? -1 : 1;

            // 計算目標位置：左側切齊左緣，右側切齊右緣
            let targetLeft = (direction === 1) ? rect.left : rect.right - cardWidth;

            // 邊界安全檢查，防止卡片超出螢幕
            if (targetLeft < 10) targetLeft = 10;
            if (targetLeft + cardWidth > window.innerWidth - 10) targetLeft = window.innerWidth - cardWidth - 10;

            gsap.fromTo(portal, 
                { opacity: 0, scale: 0.8, left: targetLeft, top: '50%', yPercent: -50, x: direction * -40 },
                { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: "power2.out", overwrite: true }
            );
        }
    }

    container.addEventListener('click', (e) => {
        const item = e.target.closest('.anime-item');
        if (item) {
            e.stopPropagation();
            item.classList.contains('active') ? closeAllAnime() : openAnimeCard(item);
        }
    });

    overlay.addEventListener('click', closeAllAnime);
    
    // 點擊卡片內部（非按鈕與影片）也收回
    portal.addEventListener('click', (e) => {
        if (!e.target.closest('.watch-button') && !e.target.closest('.card-video')) {
            closeAllAnime();
        }
    });

    window.closeAllAnime = closeAllAnime;
});