// Game Constants & Variables
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.wav');
const musicSound = new Audio('music/music.mp3');

const user_details_form=document.querySelector("#user_details_form");
const set_form_user_name=document.querySelector("#form_user");
const set_form_score=document.querySelector("#form_score");

const ask_to_press_key_cnt=document.querySelector(".ask_to_press_key_cnt");
const board=document.querySelector(".board");
const score_label=document.querySelector(".score")
const image_cnt=document.querySelector(".image_container");
const btn_confirm_restart = document.querySelector("#btn_confirm_yes");
const btn_confirm_home = document.querySelector("#btn_confirm_no");
const btn_alert_ok = document.querySelector("#btn_alert");

var username=localStorage.getItem("username");
let inputDir = {x: 0, y: 0}; 
let fps=12;
let lastPaintTime = 0;

let snakeArr=[{x:14,y:16}]
let food={x:17,y:19}
let score=0
let prev_key;
let start=false;
let alert_confirm_dialog_on_screen=false;
let currently_playing=false;

//For running game loop
function main(ctime){
    window.requestAnimationFrame(main);
    if(!alert_confirm_dialog_on_screen){
        if((ctime - lastPaintTime)/1000 < 1/fps){
            return;
        }
        //console.log((ctime - lastPaintTime)/1000);
        else if(currently_playing){
            lastPaintTime = ctime;
            gameEngine();
        } 
    }  
}
//function for checking if snake got bumped into wall or into itself
function isCollide(snake){
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 38 || snake[0].x <=0 || snake[0].y >= 21 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



//function which actually executes the game
function gameEngine(){
    // Part 1: Updating the snake array & Food
    
    if(isCollide(snakeArr)){ //checking if snake got bumped into wall or into itself
        musicSound.pause();
        gameOverSound.currentTime = 0;/*making the game over sound to start again if it has played before got paused due to some reason*/
        gameOverSound.play();
        inputDir =  {x: 0, y: 0};
        image_cnt.style.background="url('img/gameOver.png')"
        image_cnt.style.backgroundSize="100% 100%";

        alert_confirm_dialog_on_screen=true;
        confirm.render("","GAME OVER", "YOUR SCORE  ",score, 'HIGHSCORE','RESTART');
        snakeArr = [{x: 13, y: 15}];

        ask_to_press_key_cnt.style.display="block";
        ask_to_press_key_cnt.innerHTML="999 gAME oVER 999";
        board.style.display="none"
        
        btn_confirm_restart.addEventListener('click', function () {
            currently_playing=false;
            alert_confirm_dialog_on_screen=false; 
            start=false; 

            confirm.continue();
            gameOverSound.pause();

            image_cnt.style.background="url('img/snake.png')"
            image_cnt.style.backgroundSize="100% 100%";
            ask_to_press_key_cnt.style.display="block";
            ask_to_press_key_cnt.innerHTML=" 111 pRESS sPACE kEY tO sTART tHE gAME tHEN uSE aRROW kEYS tO mOVE tHE sNAKE oTHER kEYS aRE nOT aLLOWED"
             + " CrEdIt RiShI MiShRa 111";
            board.style.display="none";


            musicSound.play();
            score = 0; 
            reset_score();
            score_label.innerHTML=score;
    
        });
        btn_confirm_home.addEventListener('click', function () {
            
            //var username=localStorage.getItem("username");
            username=username.toUpperCase();
            set_form_user_name.value=username;
            set_form_score.value=score;
            
            user_details_form.submit();
            //reset_name_score();
            //confirm.abort("/");
        });

        
        
    }
    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        score_label.innerHTML=score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=19;
        let c=28;
        food = {x: Math.round(a + (c-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        //we have to remove referrence problem that's why we have destructured our array
        //and created a whole new object and we have not put like this or else our snake will not move
        //due to same refernce all our block pointer of snake will point to same object
        //snakeArr[i+1]=snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    //moving the snake on key press
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;//since row of block will be y co-ordinate
        snakeElement.style.gridColumnStart=e.x;//since column of block will be x co-ordinate

        if(index === 0){//we have to display the first block that is mouth of snake
            snakeElement.classList.add('head')
        }   
        else{//tail of snake
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}



//function for resetting the value of username when gets over and user leaves
function reset_name_score(){
    var resetValue = "";
    localStorage.setItem("username", resetValue);
    localStorage.setItem("score", resetValue);
}
function reset_score(){
    var resetValue = "";
    localStorage.setItem("score", resetValue);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////Main Logic 
musicSound.play();
image_cnt.style.background="url('img/snake.png')"
image_cnt.style.backgroundSize="100% 100%";


window.addEventListener('keydown',e=>{
    if(!currently_playing){
        if(e.code === 'Space'){
            ask_to_press_key_cnt.style.display="none";
            board.style.display="grid";
            inputDir.x=1;
            inputDir.y=0;
            window.requestAnimationFrame(main);
            currently_playing=true; 
        }
    }
})
    

window.addEventListener('keydown', e =>{
    if(!start && currently_playing){
        
        if(e.key=== "ArrowUp"){
            inputDir.x = 0;
            inputDir.y = -1;
            prev_key=e.key;
            start=true;
        }
        else if(e.key=== "ArrowDown"){
            inputDir.x = 0;
            inputDir.y = 1;
            prev_key=e.key;
            start=true;
        }
        else if(e.key=== "ArrowLeft"){
            inputDir.x = -1;
            inputDir.y = 0;
            prev_key=e.key;
            start=true;
        }
        else if(e.key=== "ArrowRight"){
            inputDir.x = 1;
            inputDir.y = 0;
            prev_key=e.key;
            start=true;
        }
        
    }
    else if(!start && !currently_playing){
        alert.render("","WARNING", "PRESS SPACE KEY ONLY", 'OK');
        btn_alert_ok.addEventListener('click', function () {
            alert.remove_alert();
        });
    }
    else if(start && currently_playing){
        if(prev_key!="ArrowDown" && e.key=== "ArrowUp"){
            inputDir.x = 0;
            inputDir.y = -1;
            prev_key=e.key
        }
        else if(prev_key!="ArrowUp" && e.key=== "ArrowDown"){
            inputDir.x = 0;
            inputDir.y = 1;
            prev_key=e.key
        }
        else if(prev_key!="ArrowRight" && e.key=== "ArrowLeft"){
            inputDir.x = -1;
            inputDir.y = 0;
            prev_key=e.key
        }
        else if(prev_key!="ArrowLeft" && e.key=== "ArrowRight"){
            inputDir.x = 1;
            inputDir.y = 0;
            prev_key=e.key
        }
    } 

    

});