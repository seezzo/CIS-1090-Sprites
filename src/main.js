import {name, game, setup} from "./game.js";

document.querySelector("#name").innerText = name;

let sprites = [
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false }
];

let up, down, left, right, space;

document.onkeyup = document.onkeydown = function (event) {
    let pressed = event.type == "keydown";
    switch (event.key) {
        case 'ArrowUp':
            up = pressed;
            break;
        case 'ArrowDown':
            down = pressed;
            break;
        case 'ArrowLeft':
            left = pressed;
            break;
        case 'ArrowRight':
            right = pressed;
            break;
        case ' ':
            space = pressed;
            break;
    }
};

let scoreSpan = document.querySelector("#score > span");
let spriteDivs = document.querySelectorAll("#app > div.sprite");
let startTime = new Date().getTime();
let lastTime = new Date().getTime();
function frame() {
    //How much time has passed since we started?
    let now = new Date().getTime();
    let dt = (now - lastTime) / 1000;
    let t = (now - startTime) / 1000;
    lastTime = now;

    for (let s = 0; s < sprites.length; s++) {
        let div = spriteDivs[s];
        let sprite = sprites[s];
        div.innerText = sprite.image;
        div.style.left = sprite.x + "px";
        div.style.bottom = sprite.y + "px";
        div.style.transform = sprite.flip ? "scale(-1, 1)" : "";
    }
    let score = game(sprites, t, dt, up, down, left, right, space);
    scoreSpan.innerText = score;
    requestAnimationFrame(frame);
}

setup(sprites);

requestAnimationFrame(frame);