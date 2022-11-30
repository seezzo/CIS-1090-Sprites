let name = "Badger Dodger";

//The y velocity of the hero
let yVelocity = 0;

//True when the hero is dead
let dead = false;

//Initial score is zero
let score = 0;

//This setup function is called once
//So you can set everything up.
function setup(sprites) {
    //Make sprite zero a little person at 0,0
    sprites[0].image = "🧍‍♂️";
    sprites[0].x = 0;
    sprites[0].y = 0;

    //Sprites 1,2,3 are badgers
    for (let i = 1; i < 4; i++) {
        sprites[i].image = "🦡";
        sprites[i].y = 0;
        sprites[i].x = 300 * i; //Spread 300px apart
    }
}

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
function game(sprites, t, dt, up, down, left, right, space) {


    if (dead) {
        //If the hero is dead do nothing until they hit space
        if (space) {
            //reset the score, being to life, lift up in the air
            score = 0;
            dead = false;
            sprites[0].y = 150;
        }
        return score;
    }

    //Pressing right or left?
    //Move the man.
    if (right) {
        sprites[0].x += dt * 500;
        sprites[0].flip = true; //And flip his sprite if he is going right
    } else if (left) {
        sprites[0].x -= dt * 500;
        sprites[0].flip = false;
    }

    if (left || right) {
        //If we are moving left or right
        if (sprites[0].y > 0) {
            //In the air? Always a running man
            sprites[0].image = "🏃‍♂️";
        } else {
            //Otherwise swap between two poses
            sprites[0].image = (Math.round(t * 10) % 2) ? "🧍‍♂️" : "🏃‍♂️";
        }
    } else {
        //Staying still? Use still person
        sprites[0].image = "🧍‍♂️";
    }

    //If you try to run past the ends of the screen
    //it stips you
    if (sprites[0].x < 0)
        sprites[0].x = 0;
    if (sprites[0].x > 750)
        sprites[0].x = 750;

    //If up pressed, and on the ground,
    //jump, give hero a positive velocity
    if (up && sprites[0].y == 0) {
        yVelocity = 500;
    }

    //Move hero by y velocity
    sprites[0].y += yVelocity * dt;

    //Update y velocity
    if (sprites[0].y > 0) {
        //If he is in the air, decrease his
        //y velocity
        yVelocity = yVelocity - 1500 * dt;
    } else {
        //When he is at the ground, set it 0
        yVelocity = 0;
        sprites[0].y = 0;
    }


    //Move badgers
    for (let i = 1; i < 4; i++) {
        //Move each badger. Add some speed based on i
        //so they all go different speeds, and add some
        //speed based on your score
        sprites[i].x -= dt * (100 + 30 * i + 10 * score);

        //If a badter goes off the left hand side
        if (sprites[i].x < -50) {
            //Move him back off the right hand side
            sprites[i].x = 800 + Math.random() * 400;
            score++; //Increase the score
        }
        //Make them bounce up and down a little
        sprites[i].y = Math.sin(20 * t + 10 * i);
    }

    //Check each badger to see if it hits the hero
    for (let i = 1; i < 4; i++) {
        let dMan = Math.abs(sprites[i].x - sprites[0].x);
        if (dMan < 10 && sprites[0].y < 30) {
            //Too close? hero dead!
            dead = true;
            sprites[0].image = "☠️";
        }
    }

    return score;
};

export { name, game, setup };