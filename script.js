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
let isMuted = false;

const playMusic = () => {
    music.play().then(() => {
        console.log("Audio playing");
    }).catch(error => {
        console.log("Audio play failed:", error);
    });
};

// Start audio on first click on the document
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

// Close Mobile Menu on Link Click
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) {
            navToggle.checked = false;
        }
    });
});

// Game Master Timer Logic
let timerInterval;
let timeLeft = 0;
let isRunning = false;

const timerDisplay = document.getElementById('countdown-timer');
const timerToggleButton = document.getElementById('timer-toggle');
const timerResetButton = document.getElementById('timer-reset');
const challengeBtns = document.querySelectorAll('.challenge-btn');

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const updateTimerDisplay = () => {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft <= 10 && timeLeft > 0) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
};

const startTimer = () => {
    if (timeLeft <= 0) return;
    isRunning = true;
    timerToggleButton.textContent = 'Pause';
    timerToggleButton.classList.remove('primary');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            timerToggleButton.textContent = 'Start';
            timerToggleButton.classList.add('primary');
            // Optionnel: Ajouter un son d'alerte ici
        }
    }, 1000);
};

const pauseTimer = () => {
    clearInterval(timerInterval);
    isRunning = false;
    timerToggleButton.textContent = 'Resume';
    timerToggleButton.classList.add('primary');
};

timerToggleButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

timerResetButton.addEventListener('click', () => {
    pauseTimer();
    const activeBtn = document.querySelector('.challenge-btn.active');
    if (activeBtn) {
        timeLeft = parseInt(activeBtn.getAttribute('data-time'));
    } else {
        timeLeft = 0;
    }
    timerToggleButton.textContent = 'Start';
    updateTimerDisplay();
});

challengeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pauseTimer();
        challengeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        timeLeft = parseInt(btn.getAttribute('data-time'));
        timerToggleButton.textContent = 'Start';
        updateTimerDisplay();
    });
});
