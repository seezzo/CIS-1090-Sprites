import {name, game, setup} from "./game.js";

//Set the name in the HTML based on the game
document.querySelector("#name").innerText = name;

//Initialize the sprite array
let sprites = [
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false },
    { image: "?", x: 0, y: 0, flip: false }
];

//Button state
let up, down, left, right, space;

//Watch key up and down, update button state
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

//HTML Elements to update
let scoreSpan = document.querySelector("#score > span");
let spriteDivs = document.querySelectorAll("#app > div.sprite");

//Keep track of total and interframe time
let startTime = new Date().getTime();
let lastTime = startTime;


setup(sprites);
requestAnimationFrame(frame);

function frame() {
    //Update totak and interframe time
    let now = new Date().getTime();
    let dt = (now - lastTime) / 1000;
    let t = (now - startTime) / 1000;
    lastTime = now;

    //Call the game funciton
    let score = game(sprites, t, dt, up, down, left, right, space);

    //update the score
    scoreSpan.innerText = score;

    //Update the sprites
    for (let s = 0; s < sprites.length; s++) {
        let div = spriteDivs[s];
        let sprite = sprites[s];
        div.innerText = sprite.image;
        div.style.left = sprite.x + "px";
        div.style.bottom = sprite.y + "px";
        div.style.transform = sprite.flip ? "scale(-1, 1)" : "";
    }

    requestAnimationFrame(frame);
}
