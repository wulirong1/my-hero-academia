document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('manga-list-container');
    const overlay = document.getElementById('manga-overlay');

    const mangaData = Array.from({ length: 42 }, (_, i) => ({
        id: i + 1,
        img: `img/manga/manga${i + 1}.png`,
        link: `#`,
        desc: `【Vol. ${i + 1}】這是詳細內容簡介。點擊卡片任何區域或空白處即可收起。`
    }));

    if (container) {
        container.innerHTML = mangaData.map(manga => `
            <div class="col-6 col-md-3 col-lg-2 manga-item">
                <div class="manga-card-wrapper">
                    <img class="manga-pic" src="${manga.img}" alt="Vol.${manga.id}">
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
    }

    function closeAllManga() {
        document.querySelectorAll('.manga-item.active').forEach(item => {
            const card = item.querySelector('.manga-detail-card');
            item.classList.remove('active');
            gsap.to(card, {
                opacity: 0, scale: 0.8, duration: 0.2, overwrite: true,
                onComplete: () => {
                    gsap.set(card, { display: 'none' });
                    item.style.zIndex = "1";
                }
            });
        });
        gsap.to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.2, overwrite: true });
    }

    function openMangaCard(item) {
        if (window.closeAllAnime) window.closeAllAnime(); // 互斥：關閉 Anime 卡片

        const detailCard = item.querySelector('.manga-detail-card');
        item.classList.add('active');
        item.style.zIndex = "1001";
        
        gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3, overwrite: true });
        gsap.set(detailCard, { display: 'flex' });

        const isMobile = window.innerWidth < 768;
        const rect = item.getBoundingClientRect();
        const direction = (rect.left + rect.width / 2 > window.innerWidth / 2) ? -1 : 1;

        if (isMobile) {
            gsap.fromTo(detailCard, 
                { opacity: 0, scale: 0.8, xPercent: -50, yPercent: -50, left: "50%", top: "50%" },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", overwrite: true }
            );
        } else {
            gsap.fromTo(detailCard, 
                { 
                    opacity: 0, scale: 0.8, yPercent: -50,
                    left: direction === 1 ? '0%' : '100%',
                    xPercent: direction === 1 ? 0 : -100,
                    x: direction === 1 ? -20 : 20 
                },
                { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: "power2.out", overwrite: true }
            );
        }
    }

    container.addEventListener('click', (e) => {
        const item = e.target.closest('.manga-item');
        if (item && !e.target.closest('.buy-button')) {
            e.stopPropagation();
            item.classList.contains('active') ? closeAllManga() : openMangaCard(item);
        }
    });

    overlay.addEventListener('click', closeAllManga);
    window.closeAllManga = closeAllManga; // 暴露全域
});