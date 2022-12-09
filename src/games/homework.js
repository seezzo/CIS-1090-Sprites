//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 

//You might have some constants that you use
const speed = 450;  //In pixels per second

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

    sprites[0].image = "🐄"; //A cow
    sprites[0].x = 300;
    sprites[0].y = 75;

    sprites[1].image = "🍫";
    sprites[1].x = Math.random () * 75;
    sprites[1].y = 500;

    sprites[2].image = "🌽";
    sprites[2].x = Math.random () * 75;
    sprites[2].y = 500;

    sprites[3].image = "🥕";
    sprites[3].x = Math.random () * 75;
    sprites[3].y = 500;

    sprites[4].image = "🍎";
    sprites[4].x = Math.random () * 75;
    sprites[4].y = 500;

}

let speed2 = 0; 
const gravity = 450;

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
    const cow = sprites[0]; //Easier to remember
    const chocolate = sprites[1]; //Easier to remember
    const corn = sprites[2]; //Easier to remember
    const carrot = sprites [3];
    const apple = sprites [4];

    //Move the cow
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        cow.y += speed * dt;
    } 
    if (down) {
        cow.y -= speed * dt;
    }
    if (right) {
        cow.x += speed * dt;
        //You can flipH a spright so it is facing
        //the other direction
        cow.flipH = true;
    }
    if (left) {
        cow.x -= speed * dt;
        cow.flipH = false;
    }


    //A very simple repeating animation
    sprites[2].y += Math.sin(t)/10;

    if (sprites[0].x < 0)
        sprites[0].x = 0;
    if (sprites[0].x > 750)
        sprites[0].x = 750;
    if (sprites [0].y < 750)
        sprites[0].y = 0;


    // acceleration and movement
    
    //Code to make the chocolate fall
    chocolate.y = chocolate.y - dt * speed;

    if (chocolate.y <= 0){
        chocolate.y = 450;
        speed2 = 25;
        chocolate.x = Math.random () * 750;
    }

    //Code to make the carrot fall 
    carrot.y = carrot.y - dt * speed;

    if (carrot.y <= 0){
        carrot.y = 450;
        speed2 = 100;
        carrot.x = Math.random () * 750;
    }

    //Code to make corn fall
    corn.y = corn.y - dt * speed;

    if (corn.y <= 0){
        corn.y = 450;
        speed2 = 200;
        corn.x = Math.random () * 750;
    }

      //Code to make apple fall
      apple.y = apple.y - dt * speed;

      if (apple.y <= 0){
          apple.y = 450;
          speed2 = 100;
          apple.x = Math.random () * 750;
      }

    return score;

};

export default {
    name: "Cow Feeder",
    instructions: "Write your instructions here",
    icon: "🐄", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "skyblue",
        "border-bottom": "75px solid green"
    },
    frame,
    setup,
};