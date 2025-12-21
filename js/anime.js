document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('anime-list-container');
    const overlay = document.getElementById('manga-overlay');
    const portal = document.getElementById('anime-detail-portal');

    const animeData = [
        { id: 'S1', video: 'https://www.youtube.com/embed/BGBQkvPAzSY', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112916', desc: '【第一季】《我的英雄學院》描述大部分的人類，在這個時代裡都擁有名為“個性”的力量...' },
        { id: 'S2', video: 'https://www.youtube.com/embed/9ZIgCYSn3e8', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112945', desc: '【第二季】雄英體育祭：學生們個性的激烈碰撞。' },
        { id: 'S3', video: 'https://www.youtube.com/embed/nyeNg6VjDqU', link: 'https://ani.gamer.com.tw/animeRef.php?sn=91866', desc: '【第三季】神野之戰：歐爾麥特的最後一戰。' },
        { id: 'S4', video: 'https://www.youtube.com/embed/RnOwqnIfSqI', link: 'https://ani.gamer.com.tw/animeRef.php?sn=101709', desc: '【第四季】校外實習：與死穢八齋會的生死決戰。' },
        { id: 'S5', video: 'https://www.youtube.com/embed/a0prGTj4xEY', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112643', desc: '【第五季】大部分的人類，在這個時代裡都擁有名為「個性」的力量...' },
        { id: 'S6', video: 'https://www.youtube.com/embed/kQhRqjbYjkQ', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113134', desc: '【第六季】本季以死柄木為首的超常解放陣線，為了催毀現行體制，發起殲滅英雄的戰鬥...' },
        { id: 'S7', video: 'https://www.youtube.com/embed/62jNKrHtzYA', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113528', desc: '【第七季】「架空（夢想）」成為了「現實」！笨久決定離開雄英獨自戰鬥。' },
        { id: 'S8', video: 'https://www.youtube.com/embed/wQgQij8Ry4g', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113886', desc: '【最終季】出久與其他英雄們，終於與死柄木弔與ALL FOR ONE展開最終決戰。' }
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
        if (window.closeAllManga) window.closeAllManga();

        const videoBase = item.getAttribute('data-video');
        // 自動播放 + 靜音（確保瀏覽器允許播放）
        portal.querySelector('iframe').src = `${videoBase}?autoplay=1&mute=1&rel=0`;
        
        portal.querySelector('.watch-button').href = item.getAttribute('data-link');
        portal.querySelector('.video-info').innerText = item.getAttribute('data-desc');

        item.classList.add('active');
        gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3, overwrite: true });
        gsap.set(portal, { display: 'flex' });

        // 計算點擊位置
        const rect = item.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const isOnLeftHalf = (rect.left + rect.width / 2) < windowWidth / 2;

        // 動畫邏輯：統一在螢幕中央 (50%, 50%)，但初始 X 位移方向不同
        const startX = isOnLeftHalf ? -150 : 150; // 左邊卡片從左邊滑入(-150)，右邊從右邊滑入(150)

        gsap.fromTo(portal, 
            { 
                opacity: 0, 
                scale: 0.5, 
                left: "50%", 
                top: "50%", 
                xPercent: -50, 
                yPercent: -50, 
                x: startX // 從側邊出發
            },
            { 
                opacity: 1, 
                scale: 1, 
                x: 0, // 回歸到正中央
                duration: 0.5, 
                ease: "power3.out", 
                overwrite: true 
            }
        );
    }

    container.addEventListener('click', (e) => {
        const item = e.target.closest('.anime-item');
        if (item) {
            e.stopPropagation();
            item.classList.contains('active') ? closeAllAnime() : openAnimeCard(item);
        }
    });

    overlay.addEventListener('click', closeAllAnime);
    
    portal.querySelector('.watch-button').addEventListener('click', (e) => e.stopPropagation());
    
    portal.addEventListener('click', (e) => {
        if (!e.target.closest('.watch-button') && !e.target.closest('.card-video')) {
            closeAllAnime();
        }
    });

    window.closeAllAnime = closeAllAnime;
});