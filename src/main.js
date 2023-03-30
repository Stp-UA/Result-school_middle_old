import './clear.css';
import './main.css';
import './slider.css';
import './decoration.css';


let play = false;                               // воспроизводится ли сейчас музыка

// let audio = new Audio();
// audio.src = './assets/sounds/summer.mp3';

let btns = document.querySelector('.buttons');
let bg = document.querySelector('#bg');
btns.onclick = function (event) {
    let targ = event.target;
    let choice;
    if (targ.id) {
        choice = `${targ.id}`;                  // если кликнули на картинке
    } else {
        choice = `${targ.parentElement.id}`;    // если кликнули на иконке внутри картинки
    }
    bg.className = choice;
};
