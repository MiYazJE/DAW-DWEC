
let video         = document.querySelector('video');
let wrapControls  = document.querySelector('.wrap-controls');
let btnPlayPause  = document.querySelector('.btn-play-pause');
let btnForward    = document.querySelector('.btn-forward');
let btnBackward   = document.querySelector('.btn-backward');
let btnRefresh    = document.querySelector('.btn-refresh');
let btnMute       = document.querySelector('.btn-mute');
let btnVolumeUp   = document.querySelector('.btn-volume-up');
let btnVolumeDown = document.querySelector('.btn-volume-down');
let textTime      = document.querySelector('.time');
let currentBar    = document.querySelector('.current');
let maxWidthBar   = document.querySelector('.wrap-current').offsetWidth;

document.querySelectorAll('.video-recomendado').forEach(videoClick => {
    videoClick.addEventListener('click', () => {
        video.src = videoClick.src;
        btnPlayPause.setAttribute('state', 'play');
        playPause();
    })
})

document.querySelector('.btn-fullscreen').addEventListener('click', () => video.requestFullscreen());

let eventDisplayControls;
let muted = false;
let lastVolume;

// Mostrar los controles cuando se pase el raton por encima del video
video.addEventListener('mouseover', () => {
    wrapControls.style.transform = 'translateY(0%)';
    clearTimeout(eventDisplayControls);
})

// Esconder los controles pasados 8 segundos
video.addEventListener('mouseleave', () => {
    eventDisplayControls = setTimeout(() => {
        wrapControls.style.transform = 'translateY(100%)';
    }, 8000)
})

// Evento doble click, entrar en fullscreen
video.addEventListener('dblclick', () => video.requestFullscreen());

// EVENTOS CONTROLES
btnPlayPause.addEventListener('click', playPause);
video.addEventListener('click', playPause);
btnForward.addEventListener('click', forwardVideo);
btnBackward.addEventListener('click', backwardVideo);
btnRefresh.addEventListener('click', refreshVideo)
btnMute.addEventListener('click', muteVideo);
btnVolumeUp.addEventListener('click', () => {
    if (video.volume <= 0.9) video.volume += 0.1;
});
btnVolumeDown.addEventListener('click', () => {
    if (video.volume >= 0.1) video.volume -= 0.1;
});

function playPause() {
    
    let child = btnPlayPause.firstElementChild;

    if (btnPlayPause.getAttribute('state') == 'play') {
        child.classList.replace('fa-play-circle', 'fa-pause-circle');
        btnPlayPause.setAttribute('state', 'pause');
        video.play();
    }
    else {
        child.classList.replace('fa-pause-circle', 'fa-play-circle');
        btnPlayPause.setAttribute('state', 'play');
        video.pause();
    }

    let far = document.querySelector('.far'); 
    far.classList.add('animation');
    far.addEventListener('animationend', () => far.classList.remove('animation'));
}

function forwardVideo() {
    video.currentTime += 10;
    video.play();
}

function backwardVideo() {
    video.currentTime -= 10;
    video.play();
}

function refreshVideo() {
    video.currentTime = 0;
    video.play();
}

function muteVideo() {
    if (muted) {
        video.volume = lastVolume;
    }
    else {
        lastVolume = video.volume;
        video.volume = 0;
    }
    muted = !muted;
}

video.ontimeupdate = () => {
    textTime.innerHTML = getParseCurrentTime(video.currentTime) + '/' + getParseCurrentTime(video.duration);
    // console.log("(" + maxWidthBar + " * " + video.currentTime + ") / " + video.duration);
    let newWidth = parseInt(parseInt(maxWidthBar * video.currentTime) / video.duration);
    currentBar.style.width = `${newWidth}px`;
}

const getParseCurrentTime = (time) => {
    
    time = parseInt(time);

    let secs, mins;
    mins = parseInt((time / 60));
    secs = parseInt(time % 60);
    
    secs = String(secs);
    while (secs.length < 2) secs = '0' + secs;

    mins = String(mins);
    while (mins.lenght < 2) mins = '0' + secs;

    return mins + ':' + secs;
}