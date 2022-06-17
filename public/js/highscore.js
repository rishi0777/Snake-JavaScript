//constants and variables 
const highscoreSound=new Audio("music/high_background.mp3");
const buttonSound=new Audio("music/button_press_music.mp3");
const home=document.querySelector("#home");
const player_list_table=document.querySelector("player_list");

//functions 
home.addEventListener('click',function(){
    highscoreSound.pause();
    buttonSound.play();
    setTimeout(goback,700);
    
});
function goback(){
    let url="/";
    open(url,"_self");
}

//Main Working
highscoreSound.play();