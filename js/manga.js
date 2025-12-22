document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('manga-list-container');
    const overlay = document.getElementById('manga-overlay');

    // 1. 在這裡設定每一本的特殊資料 (網址與簡介)
    // 剩下的 4-42 本會由下方的循環自動補齊，你之後可以慢慢補上
    const mangaSpecs = {
        1: { link: "https://www.books.com.tw/products/0010664014?sloc=main", desc: "【Vol. 1】一名天生沒有力量的少年——綠谷出久從小就憧憬一位頂尖英雄，而他的夢想就是成為偉大的英雄，可是，沒有力量的他能實現自己的夢想嗎？" },
        2: { link: "https://www.books.com.tw/products/0010668676?sloc=main", desc: "【Vol. 2】「戰鬥訓練」終於開始了。我果然很緊張，但我會努力不輸給大家…咦！訓練的對手竟然是阿勝！我知道他很強，但我也跟以前不同了！為了勝利使出全力！“Plus Ultra”" },
        3: { link: "https://www.books.com.tw/products/0010677373?sloc=main", desc: "【Vol. 3】我不曉得你們是敵人聯軍還什麼啦，你說你們是要來殺歐爾麥特？然後笨久那傢伙陷入危機？一群蠢路人也太自以為是了吧！擋路的傢伙就全部由我來打倒！“Plus Ultra”！" },
        4: { link: "https://www.books.com.tw/products/0010683547?sloc=main", desc: "【Vol. 4】在障礙賽跑獲得第1名的笨久同學，在接下來的騎馬打仗遇到誇張的狀況。不過，那樣很受人矚目，而且笨久同學一定沒問題的！我也不能輸！“Plus Ultra”！" },
        5: { link: "https://www.books.com.tw/products/0010694468?sloc=main", desc: "【Vol. 5】淘汰賽第一回合的最終比賽。爆豪同學雖然是強敵，但麗日同學也充滿幹勁喔。希望雙方都能夠奮戰。大家是朋友，同時也是對手！我也必須打出一場漂亮的戰鬥，不讓哥哥那樣的英雄感到羞恥！“Plus Ultra”！" },
        6: { link: "https://www.books.com.tw/products/0010702268?sloc=main", desc: "【Vol. 6】飯田那傢伙雖然情緒很穩定，可是…。幾天後，輪到我們在職業英雄身邊進行職場體驗。我想前進的道路…這是為了改變我自己。我不會再從父親身邊逃走…！“Plus Ultra”！" },
        7: { link: "https://www.books.com.tw/products/0010710641?sloc=main", desc: "【Vol. 7】所謂英雄，就是心中時時存有強烈信念的人。不過，若是弄錯信念的方向，就會迷失前進的道路。在這次的職場體驗裡，無論要學習什麼、要思考什麼，全都看你們自己。“Plus Ultra”！" },
        8: { link: "https://www.books.com.tw/products/0010717263?sloc=main", desc: "【Vol. 8】期末考的演練考試開始了。內容是以雄英的老師們為對手的兩人一組戰鬥考試！與同組的轟同學相較之下，現在的我能辦到的事情實在…。但是，我一定會合格的！“Plus Ultra”！" },
        9: { link: "https://www.books.com.tw/products/0010721463?sloc=main", desc: "【Vol. 9】在強化「個性」的集訓當中，我們１年級生突然遭受敵人的襲擊。他們的目的究竟為何？怎麼找到這個地方的？我有種不好的預感……不過，一定不會有問題的。“Plus Ultra”！" },
        10: { link: "https://www.books.com.tw/products/0010733518?sloc=main", desc: "【Vol. 10】爆豪同學被敵人擄走了！班上同學也因為這次的襲擊而有多人受傷，雄英因此遭到社會指責。但其實大家……就連我，都已經盡我們一切所能了啊！“Plus Ultra”" },
        11: { link: "https://www.books.com.tw/products/0010739285?sloc=main", desc: "【Vol. 11】劇情進入新高潮！綠谷出久與同學們在英雄臨時執照考試中面臨嚴峻挑戰，戰鬥場面更加激烈，角色成長令人動容。爆豪與綠谷的合作讓人驚喜，敵聯合的陰謀也逐漸浮現“Plus Ultra”！" },
        12: { link: "https://www.books.com.tw/products/0010749486?sloc=main", desc: "【Vol. 12】說真的必殺技之類的東西讓我超興奮的！戰鬥服也改良得超帥氣，我要展現全新風格的我！好，我們走，未來的英雄們！目標是通過「英雄臨時證照測驗」！“Plus Ultra”！" },
        13: { link: "https://www.books.com.tw/products/0010755197?sloc=main", desc: "【Vol. 13】危險的蒙面人出現，英雄被打倒了。雖然歐爾麥特趕到了，他真的有辦法打贏那種亂七八糟「個性」的傢伙嗎？不對……我們沒有時間畏懼了！“Plus Ultra”！" },
        14: { link: "https://www.books.com.tw/products/0010759065?sloc=main", desc: "【Vol. 14】暑假結束！下半年的課程要開始了──！老師們說的「校外活動（英雄實習）」究竟是什麼呢？跟職場體驗又有什麼不同？咦？「３巨頭」？“Plus Ultra”！" },
        15: { link: "https://www.books.com.tw/products/0010769188?sloc=main", desc: "【Vol. 15】從英雄實習後，綠谷就不太對勁？美少女大危機？師徒關係面臨崩毀？地下組織暗中運作？這種漫畫裡才有的情節，不太可能發生吧？我也想要去有好多女英雄的地方喔～～“Plus Ultra”！" },
        16: { link: "https://www.books.com.tw/products/0010777802?sloc=main", desc: "【Vol. 16】綠谷、切島、麗日、蛙吹等等實習組似乎準備與職業英雄組隊參加攻堅行動。切島，你是個能為夥伴挺身而出的可靠男子漢！懷著自信挑戰敵人吧！“Plus Ultra”！" },
        17: { link: "https://www.books.com.tw/products/0010783487?sloc=main", desc: "【Vol. 17】看著妳渾身顫抖，在黑暗的小巷中被帶走，我卻無法為妳做些什麼。這件事讓我相當後悔。……我一直明白，自己其實很弱。但是，我絕對不會再讓妳難過了！壞理！“Plus Ultra”！" },
        18: { link: "https://www.books.com.tw/products/0010787717?sloc=main", desc: "【Vol. 18】藉著壞理「逆轉」的個性，綠谷終於解放了100%的力量。我相信為了某件事…為了某人而戰的人才是真正的英雄！我有一天也要成為那樣！“Plus Ultra”！" },
        19: { link: "https://www.books.com.tw/products/0010796405?sloc=main", desc: "【Vol. 19】說到最像學校的活動就是校慶！雖然最近不斷發生敵人事件，我們班也要用活動來炒熱氣氛！坦白說，我還是很擔心自己到底能不能幫上忙…“Plus Ultra”！" },
        20: { link: "https://www.books.com.tw/products/0010806736?sloc=main", desc: "【Vol. 20】一年只舉辦一次的校慶。有些人單純只是沉浸在學生們集思廣益催生的表演的同時，懷抱著黑暗面的人也存在，這也是事實。讓大家都能綻放笑容的才是真英雄！“Plus Ultra”！" },
        21: { link: "https://www.books.com.tw/products/0010815591?sloc=main", desc: "【Vol. 21】糟糕！又有「腦無」在街上大鬧！轟同學的爸爸在努力對付他，轟同學也一定很擔心吧？但是一定不會有事的！因為奮進人可是No.1英雄啊！我們也要相信他，替他加油！“Plus Ultra”！" },
        22: { link: "https://www.books.com.tw/products/0010819841?sloc=main", desc: "【Vol. 22】A班VS B班的超激烈共同戰鬥訓練！B班的「個性」確實也有所發展，還有新的必殺技，簡直超猛的！讚啦！“Plus Ultra”！" },
        23: { link: "https://www.books.com.tw/products/0010828763?sloc=main", desc: "【Vol. 23】不妙、不妙！綠谷的新招感覺超不妙！從他發出黑黑的東西後就不太對勁啦！嗚喔？其他人也都聚集過來啦！共同訓練最終戰，究竟哪一班會獲勝？“Plus Ultra”！" },
        24: { link: "https://www.books.com.tw/products/0010839850?sloc=main", desc: "【Vol. 24】等著我，義爛！我現在就去救你！（他已經死了喔）囉嗦！只有這裡……只有聯軍的大家，是我的容身之處啊！（我是真正的我唷）等著瞧吧，異能解放軍！“Plus Ultra”！" },
        25: { link: "https://www.books.com.tw/products/0010852995?sloc=main", desc: "【Vol. 25】直到剛剛都讓我頭快要裂開的劇烈頭痛消失了……啊啊……我想起來了……小時候第一次感受到的快感。對我而言，與家人的記憶根本不是悲劇。我不要這種充滿英雄的社會，也不要未來……全都毀滅吧！“Plus Ultra”！" },
        26: { link: "https://www.books.com.tw/products/0010861824?sloc=main", desc: "【Vol. 26】HAWKS跟公安秘密獲得了情資，為了提防敵人將來某一天起釁，他們打算提升學生的實力，當作戰力的保險。就讓我這個現任No.1英雄來徹徹底底地好好鍛練你們３個！“Plus Ultra”！" },
        27: { link: "https://www.books.com.tw/products/0010870862?sloc=main", desc: "【Vol. 27】英雄們的同步襲擊行動終於開始。潛入至今過了不少時間，但這一切全都是為了在這個瞬間確實鎮壓「超常解放戰線」！為了大家，我要比誰跳得更快！“Plus Ultra”！" },
        28: { link: "https://www.books.com.tw/products/0010878037?sloc=main", desc: "【Vol. 28】聲音的狀態也進入最高潮！YEAHHHHHHH！「敵人（VILLAIN）」與腦無也一樣萬頭鑽動、嗨到最高點啦！為了不讓跟我們經歷過的一樣的惡夢重演，絕對要在這裡阻止他們！“Plus Ultra”！" },
        29: { link: "https://www.books.com.tw/products/0010890189?sloc=main", desc: "【Vol. 29】因為那個大個子男人，附近一帶都變得亂七八糟了！那句「去找主人」的意思是指死柄木？……那可不行！雄英學生也會很危險！蛇腔醫院那邊出了什麼事？“Plus Ultra”！" },
        30: { link: "https://www.books.com.tw/products/0010897949?sloc=main", desc: "【Vol. 30】為什麼事情會變成這樣？大型敵人（VILLAIN）的橫行，讓災情越來越嚴重了！我得把狀況傳遞出去……告訴現在仍在戰鬥的大家！我要維繫……不斷倒下的同伴的意念！我一定要！“Plus Ultra”！" },
        31: { link: "https://www.books.com.tw/products/0010911102?sloc=main", desc: "【Vol. 31】不但讓死柄木逃走，還造成重大災情。但是…即使如此，我們英雄仍然必須懷著沒有絲毫龜裂的信念，持續戰鬥下去才行！“Plus Ultra”！" },
        32: { link: "https://www.books.com.tw/products/0010917664?sloc=main", desc: "【Vol. 32】從各地監獄逃出來的逃獄犯，似乎在城市各地大鬧。開始與頂尖英雄一起行動的出久，也越來越狼狽了呢…唔呼呼。這種那麼難生活的討厭世界，乾脆毀掉算了吧。“Plus Ultra”！" },
        33: { link: "https://www.books.com.tw/products/0010929332?sloc=main", desc: "【Vol. 33】在這撼動著人民對英雄信賴的現狀中，學生們都懷抱不安，因此我們教職員更必須全力守護他們才行！雄英是個隨時都能讓人安心回來的地方。“Plus Ultra”！" },
        34: { link: "https://www.books.com.tw/products/0010938846?sloc=main", desc: "【Vol. 34】日本發出救援要求…最重要的是，這是歐爾麥特親自的請求！我不能不去啊！一定要在這裡排除掉有可能變成世界級威脅的All For One！以自由之名，我STAR AND STRIPE一定會做到！“Plus Ultra”！" },
        35: { link: "https://www.books.com.tw/products/0010946046?sloc=main", desc: "【Vol. 35】在好聽話蔓延的超人社會中，被視而不見、厭惡排斥的我們的每一個扭曲的思想爆發後，結果就是這副產狀對吧？所以說啊，就讓我燒光這一切，一起笑吧！“Plus Ultra”！" },
        36: { link: "https://www.books.com.tw/products/0010951671?sloc=main", desc: "【Vol. 36】懷著異形的「個性」活到今天，我們是帶著對社會的不滿而來到這裡的。跟其他人比起來，或許我們既沒有力量，也沒有大義，但是這個地方…我還是要…“Plus Ultra”！" },
        37: { link: "https://www.books.com.tw/products/0010959100?sloc=main", desc: "【Vol. 37】還別放棄啊，英雄！不管被打到跪下幾次，能誅討死柄木的機會也只有線在了！別放棄啊，DYNAMITE！你等待的他……笨久一定會來的！所以我絕對不會讓你死！“Plus Ultra”！" },
        38: { link: "https://www.books.com.tw/products/0010969608?sloc=main", desc: "【Vol. 38】靠著黑霧的個性（傳送），荼毘與用了TWICE之血的渡我被身子聚集在群訝山莊，英雄發動的分斷作戰瀕臨瓦解。此時屈服於敵人，世界就有可能走向末日。綠谷少年，你還在為了某人的笑容而戰嗎？“Plus Ultra”！" },
        39: { link: "https://www.books.com.tw/products/0010983611?sloc=main", desc: "【Vol. 39】孩子想要父親好好看著自己，父親卻逃避面對他。以及被迫套在「普通」框架中，無法隨心所欲地活著的女孩子，和拚了命地想要面對她的朋友。“Plus Ultra”！" },
        40: { link: "https://www.books.com.tw/products/0010995068?sloc=main", desc: "【Vol. 40】或許我沒有未吏生的勇氣，也沒辦法像波動同學那樣的活躍。即使如此我也要相信自己，跟同伴一起戰鬥！挺身而出！歐爾麥特即使失去力量，依然抑制住AFO（人人為我）…“Plus Ultra”！" },
        41: { link: "https://www.books.com.tw/products/0011006953?sloc=main", desc: "【Vol. 41】歐爾麥特，妳看到了嗎？你託付給那少年的意志，逐漸消失的模樣。從與一開始，連綿不斷傳承下來的OFA，已經被得到我的個性的弔打得逐漸凋零。那少年是救不了弔的...“Plus Ultra”！" },
        42: { link: "https://www.books.com.tw/products/0011013057?sloc=main", desc: "【Vol. 42】那一天，得到崇拜的人認同，讓我好高興。也認識到一些無可取代的同伴，實在難以置信，本來「無個性」的我，在許多人的支持下，現在才能站在這裡。這裡就是我的……我們的英雄學院！“Plus Ultra”！" },

    };

    // 2. 建立 42 本的完整資料陣列
    const mangaData = Array.from({ length: 42 }, (_, i) => {
        const id = i + 1;
        const spec = mangaSpecs[id] || {}; // 如果上面沒填，就給空物件
        return {
            id: id,
            img: `img/manga/manga${id}.png`,
            link: spec.link || "#", // 預設網址
            desc: spec.desc || `【Vol. ${id}】這是第 ${id} 卷的精彩內容。英雄與敵人的戰鬥進入白熱化，更多個性與故事即將展開。` // 預設簡介
        };
    });

    // 3. 渲染 HTML
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

    // --- 動畫邏輯 (與 Anime 一致，滑向螢幕中央) ---

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
    if (window.closeAllAnime) window.closeAllAnime();

    const detailCard = item.querySelector('.manga-detail-card');
    item.classList.add('active');
    item.style.zIndex = "1001";

    gsap.to(overlay, { autoAlpha: 1, pointerEvents: "auto", duration: 0.3 });
    gsap.set(detailCard, { display: 'flex' });

    // --- 判斷滑動方向邏輯 ---
    const allItems = Array.from(document.querySelectorAll('.manga-item'));
    const index = allItems.indexOf(item); // 取得當前是第幾本書 (0-41)
    const winW = window.innerWidth;
    
    let isLeft = true;

    if (winW >= 992) { 
        // 電腦版 (6 欄)：0,1,2 為左，3,4,5 為右
        isLeft = (index % 6) < 3;
    } else if (winW >= 768) { 
        // 平板版 (4 欄)：0,1 為左，2,3 為右
        isLeft = (index % 4) < 2;
    } else { 
        // 手機版 (2 欄)：0 為左，1 為右
        isLeft = (index % 2) === 0;
    }

    // 根據左/右決定起始 X 位移 (左邊來的往右滑，右邊來的往左滑)
    const startX = isLeft ? -150 : 150;

    // 執行進場動畫
    gsap.fromTo(detailCard,
        {
            opacity: 0,
            scale: 0.7,
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: startX // 從側邊偏移開始
        },
        {
            opacity: 1,
            scale: 1,
            x: 0, // 回到視窗正中央
            duration: 0.5,
            ease: "power2.out",
            overwrite: true
        }
    );
}

    // 事件監聽
    container.addEventListener('click', (e) => {
        const item = e.target.closest('.manga-item');
        if (item && !e.target.closest('.buy-button')) {
            e.stopPropagation();
            item.classList.contains('active') ? closeAllManga() : openMangaCard(item);
        }
    });

    overlay.addEventListener('click', closeAllManga);
    window.closeAllManga = closeAllManga;
});