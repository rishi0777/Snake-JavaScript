///////////////////////////////////////////////////////////////////////////////////////////constants and variables
const start_btn=document.querySelector('#btn1');
const high_btn=document.querySelector('#btn2');
const about_btn=document.querySelector('#btn3');
const proceed_btn=document.querySelector('#proceed');
const btn_alert_ok = document.querySelector("#btn_alert");

const not_available_on_phone=document.querySelector('.not_available_on_phone');
const main=document.querySelector('.main');

const btn_container=document.querySelector('.container');
const name_container=document.querySelector('.name_container');
var username_field=document.querySelector('#username');
 
const bg_music=new Audio("../music/main_background.mp3")
const btn_press_music=new Audio("../music/button_press_music.mp3")

//////////////////////////////////////////////////////////////////////////////////////////////functions of button

//function for checking through which device user is opening this webpage
function check_device(){
    let details=navigator.userAgent
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
      
    if (isMobileDevice) {
        not_available_on_phone.style.display="flex";
    } else {
        main.style.display="flex";
    }
}

//sending value of name to game page
function nameSender(username)
{
    localStorage.setItem("username", username);
    let url="/snake_mania"
    name_container.style.display="none";
    open(url,'_self');
}

//function for taking the input as name
function show_name(){
    btn_container.style.display="none";
    name_container.style.display="flex";
    username_field.focus(); 
    username_field.select();
}

//function when user clicks on start button
function start(){
    username=document.querySelector('#username').value;
    if(username==="WRITE HERE" || username==="" || username.length<3){
        bg_music.play();
        alert.render("","ERROR","USERNAME MUST BE OF 3 CHARACTERS","OK");
        btn_alert_ok.addEventListener('click',alert.remove_alert);
    }
    else{
        nameSender(username);
    }
    
}
//function for highscore
function high(){
    let url="/high_score"
    open(url,'_self');
}

//function for aboout
function about(){
    let url="https://www.rishimishra.me/";
    open(url, '_self');
}

//////////////////////////////////////////////////////////////////////////////////////main working of the code
bg_music.play();
check_device();

start_btn.addEventListener("click",function(){
    bg_music.pause();
    btn_press_music.play();
    setTimeout(show_name,700);
    bg_music.play();
});
proceed_btn.addEventListener("click",function(){
    bg_music.pause();
    btn_press_music.play();
    setTimeout(start,700);
});

high_btn.addEventListener('click',function(){
    bg_music.pause();
    btn_press_music.play();
    setTimeout(high,700);
});
about_btn.addEventListener('click',function(){
    bg_music.pause();
    btn_press_music.play();
    setTimeout(about,700);
});