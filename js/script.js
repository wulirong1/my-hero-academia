document.addEventListener('DOMContentLoaded', () => {
    const mangaItems = document.querySelectorAll('.manga-item');
    const overlay = document.getElementById('manga-overlay');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    mangaItems.forEach(item => {
        const detailCard = item.querySelector('.manga-detail-card');
        const buyButton = item.querySelector('.buy-button');

        if (isTouchDevice) {
            item.addEventListener('click', function(e) {
                if (e.target === buyButton) return;
                if (this.classList.contains('active')) {
                    closeAll();
                } else {
                    closeAll();
                    openCard(this, detailCard);
                }
                e.stopPropagation();
            });
        } else {
            item.addEventListener('mouseenter', () => openCard(item, detailCard));
            item.addEventListener('mouseleave', () => closeCard(item, detailCard));
        }
    });

    // 點擊遮罩層關閉
    overlay.addEventListener('click', closeAll);

    function openCard(item, detailCard) {
        gsap.killTweensOf([detailCard, overlay]);
        item.classList.add('active');
        item.style.zIndex = "1001";

        // 顯示遮罩
        gsap.to(overlay, { autoAlpha: 1, duration: 0.3 });

        // 顯示卡片
        const isMobile = window.innerWidth <= 991;
        gsap.fromTo(detailCard, 
            { 
                display: 'flex',
                visibility: 'visible',
                opacity: 0, 
                scale: 0.8,
                xPercent: isMobile ? -50 : 0,
                yPercent: isMobile ? -50 : 0
            },
            { 
                opacity: 1, 
                scale: 1, 
                duration: 0.4, 
                ease: "back.out(1.2)",
                onComplete: () => { detailCard.style.pointerEvents = 'auto'; }
            }
        );
    }

    function closeCard(item, detailCard) {
        if (!item.classList.contains('active')) return;
        detailCard.style.pointerEvents = 'none';

        gsap.to(overlay, { autoAlpha: 0, duration: 0.3 });
        gsap.to(detailCard, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                item.classList.remove('active');
                item.style.zIndex = "1";
                gsap.set(detailCard, { visibility: 'hidden' });
            }
        });
    }

    function closeAll() {
        mangaItems.forEach(item => {
            const card = item.querySelector('.manga-detail-card');
            if (item.classList.contains('active')) {
                closeCard(item, card);
            }
        });
    }
});