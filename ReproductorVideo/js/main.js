
let video        = document.querySelector('video');
let wrapControls = document.querySelector('.wrap-controls');
let btnPlayPause = document.querySelector('.btn-play-pause');

let eventDisplayControls;

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

btnPlayPause.addEventListener('click', playPause);
video.addEventListener('click', playPause);

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