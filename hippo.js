let xPosition = 200;
let yPosition = 200;
$("body").on("keydown",pressKey);
$("body").on("keyup",releaseKey);
let xTimer = null;
let yTimer = null;
let jTimer = null;
let rTimer = null;
let sTimer = null;
let sState = null;
let sizeLock = false;
let sizeKey = true;
let xEyeCentered = true;
let yEyeCentered = true;
let rStep = 0;

let password = "";

function checkPassword(e){
    let canary = "canary";
    if (canary.indexOf(e.key) === -1){
        console.log("hello");
        password = "";
    } else {
        char = canary[password.length];
        if (e.key === char){
            password += e.key;
        }
        if (password === "canary"){
            localStorage.passwordEntered = "canary";
        }
        console.log(password);
    }
}
function pressKey(e){
    checkPassword(e);
    if (e.key === "ArrowRight" && xTimer === null){
        xTimer = setInterval(moveRight,10);
        if (xEyeCentered){
            moveEyeRight();
        }
    } else if (e.key === "ArrowLeft" && xTimer === null){
        xTimer = setInterval(moveLeft,10);
        if (xEyeCentered){
            moveEyeLeft();
        }
    } else if (e.key === "ArrowDown" && yTimer === null){
        yTimer = setInterval(moveDown,10);
        if (yEyeCentered){
            moveEyeDown();
        }
    } else if (e.key === "ArrowUp" && yTimer === null){
        yTimer = setInterval(moveUp,10);
        if (yEyeCentered){
            moveEyeUp();
        }
    } else if (e.key === " "){
        clearInterval(jTimer);
        jTimer = setInterval(jawOpen,10);
    } else if (e.key === "a" && xEyeCentered){
        moveEyeLeft();
    } else if (e.key === "d" && xEyeCentered){
        moveEyeRight()
    } else if (e.key === "w" && yEyeCentered){
        moveEyeUp();
    } else if (e.key === "s" && yEyeCentered){
        moveEyeDown();
    } else if (e.key === "r" && rStep === 0){
        eyeCenterX();
        eyeCenterY();
        rollEyes();
        rTimer = setInterval(rollEyes,100);
    } else if (e.key === "g" && sState != "growing"){
        sState = "growing";
        clearInterval(sTimer);
        sTimer = setInterval(grow,10);
    } else if (e.key === "t" && sState != "shrinking"){
        sState = "shrinking";
        clearInterval(sTimer);
        sTimer = setInterval(shrink,10);
    } else if (e.key === "l" && sizeKey){
        clearInterval(sTimer);
        sizeKey = false;
        if (sizeLock){
            sizeLock = false;
            sTimer = setInterval(revertSize,10);
        } else {
            sizeLock = true;
        }
    } else if (e.key === "e"){
        if (!xEyeCentered){
            eyeCenterX();
        }
        if (!yEyeCentered){
            eyeCenterY();
        }
    }
}
function releaseKey(e){
    if (e.key === "ArrowRight" && xTimer != null){
        clearInterval(xTimer);
        xTimer = null;
        eyeCenterX();
    } else if (e.key === "ArrowLeft" && xTimer != null){
        clearInterval(xTimer);
        xTimer = null;
        eyeCenterX();
    } else if (e.key === "ArrowUp" && yTimer != null){
        clearInterval(yTimer);
        yTimer = null;
        eyeCenterY();
    } else if (e.key === "ArrowDown" && yTimer != null){
        clearInterval(yTimer);
        yTimer = null;
        eyeCenterY();
    } else if (e.key === " "){
        clearInterval(jTimer);
        jTimer = setInterval(jawClose,10);
    } else if (e.key === "w" || e.key === "s"){
        eyeCenterY();
    } else if (e.key === "a" || e.key === "d"){
        eyeCenterX();
    } else if ((e.key === "g" || e.key === "t") && sState != "reverting"){
        sState = "reverting";
        clearInterval(sTimer);
        if (sizeLock === false){
            sTimer = setInterval(revertSize,10);
        }
    } else if (e.key === "l"){
        sizeKey = true;
    }
}

function eyeCenterX(){
    $(".eyes").css({"left":"18%"});
    xEyeCentered = true;
    fStateX = 0;
}
function eyeCenterY(){
    $(".eyes").css({"top":"20%"})
    yEyeCentered = true;
    fStateY = 0;
}
function grow(){
    let width = $(".container").width() + 1;
    if (width < $(window).width() - 2 && width < $(window).height() - 2){
        $(".container").css({"width":width});
    }
}
function jawClose(){
    let y = $("#jaw").position().top - .015*$(".container").height();
    if (y >= .1*$(".container").height()){
        y *= 100/$(".container").height();
        y = y+"%";
        $("#jaw").css({"top":y});
    } else {
        clearInterval(jTimer);
        jTimer = null;
    }
}
function jawOpen(){
    let y = $("#jaw").position().top + .01*$(".container").height();
    if (y < $(".container").height() - $("#jaw").height()){
        y *= 100/$(".container").height();
        y = y+"%"
        $("#jaw").css({"top":y});
    } else {
        clearInterval(jTimer);
        jTimer = null;
    }
}
function moveDown(){
    if (yPosition + $(".container").width() + 2 < $(window).height()){
        yPosition += 1;
        $(".container").css({"top":yPosition});
    } else {
        clearInterval(yTimer);
        yTimer = true;
    }
}
function moveLeft(){
    if (xPosition - 1 > 0){
        xPosition -= 1;
        $(".container").css({"left":xPosition});
    } else {
        clearInterval(xTimer);
        xTimer = true;
    }
}
function moveRight(){
    if (xPosition + $(".container").width() + 1 < $(window).width()){
        xPosition += 1;
        $(".container").css({"left":xPosition});
    } else {
        clearInterval(xTimer);
        xTimer = true;
    }
}
function moveUp(){
    if (yPosition - 1 > 0){
        yPosition -= 1;
        $(".container").css({"top":yPosition});
    } else {
        clearInterval(yTimer);
        yTimer = true;
    }
}
function moveEyeDown(){
    yEyeCentered = false;
    let y = $(".eyes").position().top + .04*$(".container").width();
    y *= 100 / $("#head").height();
    y = y + "%";
    $(".eyes").css({"top":y});
}
function moveEyeLeft(){
    xEyeCentered = false;
    let x = $(".eyes").position().left - .04*$(".container").width();
    x *= 100 / $("#head").width();
    x = x + "%";
    $(".eyes").css({"left":x});
}
function moveEyeRight(){
    xEyeCentered = false;
    let x = $(".eyes").position().left + .04*$(".container").width();
    x *= 100 / $("#head").width();
    x = x + "%";
    $(".eyes").css({"left":x});
}
function moveEyeUp(){
    yEyeCentered = false;
    let y = $(".eyes").position().top - .04*$(".container").width();
    y *= 100 / $("#head").height();
    y = y + "%";
    $(".eyes").css({"top":y});
}
function revertSize(){
    let width = $(".container").width();
    if (width < 200){
        width += .5;
    } else if (width > 200){
        width -= .5;
    } else {
        clearInterval(sTimer);
        sState = null;
    }
    $(".container").css({"width":width});
}
function rollEyes(){
    if (rStep === 0){
        moveEyeRight();
    } else if (rStep === 1){
        moveEyeUp();
    } else if (rStep === 2){
        eyeCenterX();
    } else if (rStep === 3){
        moveEyeLeft();
    } else if (rStep === 4){
        eyeCenterY();
    } else if (rStep === 5){
        eyeCenterX();
    } else {
        rStep = -1;
        clearInterval(rTimer);
    }
    rStep ++;
}
function shrink(){
    let width = $(".container").width() - .5;
    if (width > 20){
        $(".container").css({"width":width});
    }
}
