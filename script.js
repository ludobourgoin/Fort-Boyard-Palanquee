// Event Countdown
const eventDate = new Date('May 5, 2026 19:00:00').getTime();

const countdown = () => {
    const now = new Date().getTime();
    const gap = eventDate - now;

    if (gap < 0) {
        document.getElementById('countdown').innerHTML = "L'aventure a commencé !";
        return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    const countdownHtml = `
        <div class="timer-unit"><span>${d}</span><label>Jours</label></div>
        <div class="timer-separator">:</div>
        <div class="timer-unit"><span>${h.toString().padStart(2, '0')}</span><label>Heures</label></div>
        <div class="timer-separator">:</div>
        <div class="timer-unit"><span>${m.toString().padStart(2, '0')}</span><label>Min</label></div>
        <div class="timer-separator">:</div>
        <div class="timer-unit"><span>${s.toString().padStart(2, '0')}</span><label>Sec</label></div>
    `;

    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        countdownEl.innerHTML = countdownHtml;
    }
};

setInterval(countdown, 1000);
countdown();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Audio Management
const music = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');
const startOverlay = document.getElementById('startOverlay');
const startButton = document.getElementById('startButton');
let isMuted = false;

const playMusic = () => {
    music.play().then(() => {
        console.log("Audio playing");
    }).catch(error => {
        console.log("Audio play failed:", error);
    });
};

// Start Experience
if (startButton) {
    startButton.addEventListener('click', () => {
        startOverlay.classList.add('hidden');
        playMusic();
        
        // Remove the click fallback since we just played
        document.removeEventListener('click', startAudioOnInteraction);
    });
}

// Fallback: Start audio on first click on the document (if overlay missed or removed)
const startAudioOnInteraction = () => {
    if (music.paused && !isMuted) {
        playMusic();
        document.removeEventListener('click', startAudioOnInteraction);
    }
};
document.addEventListener('click', startAudioOnInteraction);

// Toggle Mute
soundToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    isMuted = !isMuted;
    
    if (isMuted) {
        music.pause();
        soundToggle.classList.add('muted');
        soundToggle.querySelector('.sound-icon').textContent = '🔇';
    } else {
        music.play();
        soundToggle.classList.remove('muted');
        soundToggle.querySelector('.sound-icon').textContent = '🔊';
    }
});
