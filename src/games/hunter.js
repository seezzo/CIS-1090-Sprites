//This setup function is called once
//So you can set everything up.
function setup(sprites) {
    //Make sprite zero a little person at 0,0
    sprites[0].image = "🧍‍♂️";
    sprites[0].x = 15;
    sprites[0].y = 0;

    sprites[1].image = "🤠";
    sprites[1].x = 3;
    sprites[1].y = 35;

    sprites[2].image = ")";
    sprites[2].x = 40;
    sprites[2].y = 20;
    sprites[2].color = "#8E562E";

    sprites[3].image = "➵";
    sprites[3].x = -100;
    sprites[3].y = -100;

    sprites[4].image = "🦌";
    sprites[4].x = 500;
    sprites[4].y = 300;

    facingRight = true;
    vArrow = false;
    score = 0;
}

//Compute the distance between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//Initial score is zero
let score;

const walk = 200;
let facingRight;
let vArrow;

/**
 * Game function called every frame
 * @param sprites   Array of sprite objects
 * @param t         Time since start of game
 * @param dt        Time since last frame
 * @param up        Is up pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     "
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {
    const hunter = sprites[0];
    const head = sprites[1];
    const bow = sprites[2];
    const arrow = sprites[3];
    const buck = sprites[4];

    //Move Hunter
    if (up) {
        hunter.y += walk * dt;
    } if (down) {
        hunter.y -= walk * dt;
    }
    if (right) {
        hunter.x += walk * dt;
        facingRight = true;
    }
    if (left) {
        hunter.x -= walk * dt;
        facingRight = false;
    }
    head.x = hunter.x - 12;
    head.y = hunter.y + 35 + 2 * Math.sin(3 * t);
    bow.y = hunter.y + 15;
    if (facingRight) {
        bow.flip = false;
        bow.x = hunter.x + 40;
    } else {
        bow.flip = true;
        bow.x = hunter.x - 20;
    }

    if (vArrow == 0) {
        arrow.y = hunter.y + 10;
        if (facingRight) {
            arrow.x = hunter.x + 30;
            arrow.flip = false;
        } else {
            arrow.x = hunter.x - 40;
            arrow.flip = true;
        }
    } else {
        arrow.x += dt * vArrow;
        arrow.flip = vArrow < 0;
        if (arrow.x < -100 || arrow.x > 900)
            vArrow = 0;
    }

    if (space ) {
        if (facingRight)
            arrow.x = hunter.x + 20;
        else
            arrow.x = hunter.x - 30;
        arrow.y = hunter.y + 10;
        vArrow = facingRight ? 400 : -400;
    }

    if ( buck.image == "🥩" ){
        if ( distance(hunter, buck) < 50 ){
            score++;
            buck.image = "🦌";
            buck.x = 780 * Math.random();
            buck.y = 470 * Math.random();
        }
    } else {
        if ( vArrow && distance(arrow, buck) < 20 ){
            score++;
            vArrow = 0;
            buck.image = "🥩";
        }
    }




    return score;
};

export default {
    name: "Buck Stalker",
    instructions: "<b>Shoot 🦌, eat 🥩!</b><br>Arrow keys to move.<br>Space to shoot an arrow.",
    icon: "🏹",
    background: {
        "background-color": "green"
    },
    frame,
    setup,
};