window.addEventListener('load', () => {

    const intro = document.getElementById("intro");
    const musicIcon = document.getElementById("musicIcon");
    const noMusicText = document.getElementById("noMusicText");
    const content = document.getElementById("content");
    const bgm = document.getElementById("bgm");
    const soundToggle = document.getElementById("soundToggle");
    const msgEl = document.getElementById('message');


    const messages = [
        "Chúc mấy chị, cô và bà nội ngày 20/10 vui vẻ 🌸",
        "20/10 - chúc phái đẹp luôn rực rỡ, luôn tự tin và được trân trọng như chính vẻ đẹp của mình 💐",
        "Gửi lời yêu thương nhất đến tất cả những người phụ nữ trong gia đình — chúc mọi người luôn được yêu và luôn mỉm cười 🌸",
        "Chúc những người phụ nữ tuyệt vời xung trong gia đình có một ngày 20/10 thật trọn vẹn, xinh đẹp và hạnh phúc 💕"
    ];
    let i = 0;
    msgEl.style.transition = "opacity 0.8s ease";
    msgEl.style.opacity = 1;

    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

        const texts = [
        "🌸 Chúc 20/10 luôn vui vẻ 🌸",
        "💐 Ngày 20/10 thật tươi đẹp 💐",
        "✨ Xinh đẹp - tự tin - rạng rỡ ✨",
        "💖 Luôn là chính mình 💖",
        "🌷 Hạnh phúc ngập tràn 🌷"
        ];
        const activePositions = [];

        function createFallingText() {
        let left;
        const safe = 8;
        const minDistance = 12;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('div');
        el.className = 'falling-text';
        el.textContent = texts[Math.floor(Math.random() * texts.length)];
        el.style.left = left + 'vw';

        document.body.appendChild(el);
        activePositions.push(left);

        const duration = 8 + Math.random() * 4;
        el.style.animationDuration = duration + 's';

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, (duration + 2) * 1000);
        }

        setInterval(createFallingText, 1200);

    let playing = false;

    async function startWebsite() {
        try {
            bgm.currentTime = 68;
            await bgm.play();
            playing = true;
            soundToggle.textContent = "🔈";
        } catch (err) {
            console.log("Tự động phát bị chặn hoặc lỗi:", err);
            playing = false;
            soundToggle.textContent = "🔇";
        }

        intro.style.opacity = "0";
        setTimeout(() => {
            intro.style.display = "none";
            content.classList.remove("hidden");
            soundToggle.classList.remove("hidden");
        }, 600);
    }

    musicIcon.addEventListener("click", startWebsite);
    noMusicText.addEventListener("click", startWebsite);

    document.body.addEventListener('click', function onceStart() {
        if (intro && intro.style.display !== "none") {
            startWebsite();
        }
        document.body.removeEventListener('click', onceStart);
    });

    soundToggle.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            if (!playing) {
                bgm.currentTime = 68;
                await bgm.play();
                soundToggle.textContent = "🔈";
                playing = true;
            } else {
                bgm.pause();
                soundToggle.textContent = "🔇";
                playing = false;
            }
        } catch (err) {
            console.log("Không thể phát", err);
        }
    });
});
