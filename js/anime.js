document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('anime-list-container');
    const overlay = document.getElementById('manga-overlay');
    const portal = document.getElementById('anime-detail-portal');

    const animeData = [
        { id: 'S1', video: 'https://www.youtube.com/embed/BGBQkvPAzSY&list=PLHE90_oMOW0V3nH0jwKArez_SpcKhWYAY&index=1', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112916', desc: '【第一季】《我的英雄學院》描述大部分的人類，在這個時代裡都擁有名為“個性”的力量，但有力量之人卻不一定都屬於正義的一方。只要邪惡出現的地方，必定會有英雄挺身而出拯救眾人。 　　一名天生沒有力量的少年——綠谷出久從小就憧憬一位頂尖英雄，而他的夢想就是成為偉大的英雄，可是，沒有力量的他能實現自己的夢想嗎？雖然困難重重，少年卻依舊不放棄，朝著自己的目標勇往前進！ ' },
        { id: 'S2', video: 'https://www.youtube.com/embed/9ZIgCYSn3e8&t=1s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112945', desc: '【第二季】雄英體育祭：學生們個性的激烈碰撞。' },
        { id: 'S3', video: 'https://www.youtube.com/embed/nyeNg6VjDqU&t=1s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=91866', desc: '【第三季】神野之戰：歐爾麥特的最後一戰。' },
        { id: 'S4', video: 'https://www.youtube.com/embed/-H7AuZ3kARc&t=2s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=101709', desc: '【第四季】校外實習：與死穢八齋會的生死決戰。' },
        { id: 'S5', video: 'https://www.youtube.com/embed/5AkQ0GxQTQM&t=4s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=112643', desc: '【第五季】大部分的人類，在這個時代裡都擁有名為「個性」的力量，但有力量之人卻不一定都屬於正義的一方。只要邪惡出現的地方，必定會有英雄挺身而出拯救眾人。一名天生沒有力量的少年 —— 綠谷出久從小就憧憬一位頂尖英雄，而他的夢想就是成為偉大的英雄，可是，沒有力量的他能實現自己的夢想嗎？雖然困難重重，少年卻依舊不放棄，朝著自己的目標勇往前進！' },
        { id: 'S6', video: 'https://www.youtube.com/embed/kQhRqjbYjkQ&t=2s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113134', desc: '【第六季】本季以死柄木為首的超常解放陣線，為了催毀現行體制，發起殲滅英雄的戰鬥......。英雄VS.敵人、守護VS.破壞，懷抱著各自的信念與理想，傾盡最大戰力的全面戰爭，即將引爆——' },
        { id: 'S7', video: 'https://www.youtube.com/embed/62jNKrHtzYA&t=2s', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113528', desc: '【第七季】「架空（夢想）」成為了「現實」！　 時值笨久他們就讀雄英的第二年春天。英雄們對死柄木等一夥敵人發起掃蕩作戰，戰鬥之激烈，可謂是「全面戰爭」。這場雙方都付出極大代價的全面戰爭看似告一段落，但社會對於英雄的信賴卻產生動搖，漸行荒廢。身為ALL FOR ONE（人人為我）之目標的ONE FOR ALL繼承者的使命感，以及那不想讓周遭人士置於險境之中的想法，笨久決定離開雄英獨自戰鬥。' },
        { id: 'S8', video: 'https://www.youtube.com/embed/wQgQij8Ry4g', link: 'https://ani.gamer.com.tw/animeRef.php?sn=113886', desc: '【最終季】一樣時值笨久他們就讀雄英的第二年春天。 出久與其他英雄們，終於與由死柄木弔與ALL FOR ONE（人人為我）所率領的敵人展開最終決戰，日本各地都爆發了激烈戰鬥。轟焦凍、奮進人以及火葬（轟燈矢）之間的轟家宿命對決；御茶子與渡我的正面衝突也終於分出勝負。而終於將ONE FOR ALL完全解放的出久，對上了本應被奪取身體、如今卻反被吸收意識而徹底覺醒的死柄木。同時，透過年齡逆轉奪回全盛之力的ALL FOR ONE本體，與雖是「無個性」卻身披強化裝甲的「裝甲歐爾麥特」，也迎來了最終對決。究竟，出久那「成為最棒英雄之前的故事」是否能夠完成？又或者將在此全面崩壞…！？ ' }
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
        iframe.src = ""; // 清空以停止播放
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
        // 【修改】移除 mute=1，僅保留 autoplay=1
        portal.querySelector('iframe').src = `${videoBase}?autoplay=1&rel=0`;
        
        portal.querySelector('.watch-button').href = item.getAttribute('data-link');
        portal.querySelector('.video-info').innerText = item.getAttribute('data-desc');

        item.classList.add('active');
        gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3, overwrite: true });
        gsap.set(portal, { display: 'flex' });

        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            gsap.fromTo(portal, 
                { opacity: 0, scale: 0.8, xPercent: -50, yPercent: -50, left: "50%", top: "50%" },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", overwrite: true }
            );
        } else {
            const rect = item.getBoundingClientRect(); 
            const cardWidth = 550; 
            const direction = (rect.left + rect.width / 2 > window.innerWidth / 2) ? -1 : 1;
            let targetLeft = (direction === 1) ? rect.left : rect.right - cardWidth;

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
    portal.addEventListener('click', (e) => {
        if (!e.target.closest('.watch-button') && !e.target.closest('.card-video')) {
            closeAllAnime();
        }
    });

    window.closeAllAnime = closeAllAnime;
});