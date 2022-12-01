import hunter from "./games/hunter.js";
import badger from "./games/hunter.js";

let games = [
    hunter,
    badger
];

//HTML Elements to update
let app = document.querySelector("#app");
let scoreSpan = document.querySelector("#score > span");
let spriteDivs = document.querySelectorAll("#app > div.sprite");

//Initialize the sprite array
let sprites = [];
let currentGame = false;


function loadGame(game) {
    sprites = [
        { image: "", x: 0, y: 0, flip: false },
        { image: "", x: 0, y: 0, flip: false },
        { image: "", x: 0, y: 0, flip: false },
        { image: "", x: 0, y: 0, flip: false },
        { image: "", x: 0, y: 0, flip: false },
        { image: "", x: 0, y: 0, flip: false }
    ];

    //Set the name in the HTML based on the game
    document.querySelector("#current > .name").innerText = game.name;
    document.querySelector("#name").innerText = game.name;
    document.querySelector("#current > .icon").innerText = game.icon;
    document.querySelector("#current > .instructions").innerHTML = game.instructions;
    currentGame = game;

    game.setup(sprites);
    for (let i in game.background) {
        app.style[i] = game.background[i];
    };
}

loadGame(hunter);

//Button state
let up, down, left, right, space;

//Watch key up and down, update button state
document.onkeyup = document.onkeydown = function (event) {
    let pressed = event.type == "keydown";
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            up = pressed;
            break;
        case 'ArrowDown':
            event.preventDefault();
            down = pressed;
            break;
        case 'ArrowLeft':
            event.preventDefault();
            left = pressed;
            break;
        case 'ArrowRight':
            event.preventDefault();
            right = pressed;
            break;
        case ' ':
            event.preventDefault();
            space = pressed;
            break;
    }
};

//Keep track of total and interframe time
let startTime = new Date().getTime();
let lastTime = startTime;

requestAnimationFrame(frame);

function frame() {
    //Update totak and interframe time
    let now = new Date().getTime();
    let dt = (now - lastTime) / 1000;
    let t = (now - startTime) / 1000;
    lastTime = now;

    //Call the game funciton
    if (currentGame) {
        let score = currentGame.frame(sprites, t, dt, up, down, left, right, space);

        //update the score
        scoreSpan.innerText = score;

        //Update the sprites
        for (let s = 0; s < sprites.length; s++) {
            let div = spriteDivs[s];
            let sprite = sprites[s];
            div.innerText = sprite.image;
            div.style.color = sprite.color;
            div.style.left = sprite.x + "px";
            div.style.bottom = sprite.y + "px";
            div.style.transform = sprite.flip ? "scale(-1, 1)" : "";
        }
    }

    requestAnimationFrame(frame);
}
