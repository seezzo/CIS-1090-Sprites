//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 

//You might have some constants that you use
const speed = 300;  //In pixels per second

//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once when the game starts
function setup(sprites) {
    score = 0;      //set score to zero
    alive = true;   //Set player to alive

    //Sprite "Images" are just characters,
    //But you can use emojis!
    // https://emojis.wiki/

    sprites[0].image = "🚒"; //A fire engine
    sprites[0].x = 100;
    sprites[0].y = 100;

    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "🏠"; //A fire engine
    sprites[1].x = 300;
    sprites[1].y = 100;
    sprites[2].image = "🔥"; //A fire engine
    sprites[2].x = 300;
    sprites[2].y = 120;

}

/**
 * This function is called every frame
 * @param sprites   Array of sprite objects
 * @param t         Seconds since start of game
 * @param dt        Seconds since last frame (A very small number)
 * @param up        Is up arrow pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     Is spacebar pressed?
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {
    //Keep references to the sprites in some variables with
    //better names:
    const truck = sprites[0]; //Easier to remember
    const house = sprites[1]; //Easier to remember
    const fire = sprites[2]; //Easier to remember

    //Move the fire engine
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        truck.y += speed * dt;
    } 
    if (down) {
        truck.y -= speed * dt;
    }
    if (right) {
        truck.x += speed * dt;
        //You can flipH a spright so it is facing
        //the other direction
        truck.flipH = true;
    }
    if (left) {
        truck.x -= speed * dt;
        truck.flipH = false;
    }

    //If the truck is close to the house
    if ( distance(truck, house) < 10 ){
        fire.image = ""; //Make the fire go away
    }

    //A very simple repeating animation
    sprites[2].y += Math.sin(t)/10;

    return score;
};

export default {
    name: "Homework",
    instructions: "Write your instructions here",
    icon: "📝", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};