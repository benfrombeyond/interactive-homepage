let timer;
let onTarget = false;
let face = document.getElementById("game_piece");
let safe = false;
let runTimer = setInterval(runAway,500);

document.body.addEventListener("mousedown",changeCursor);
document.body.addEventListener("mouseup",changeBack);
face.addEventListener("mouseover",target);
face.addEventListener("mouseleave",target);

function changeBack(){
    document.body.style.cursor = "url('https://codehs.com/uploads/589831035851d18d9b4a012f442d39e5'),auto";
    if (!safe){
        if (onTarget){
            face.style.backgroundImage = "url('https://codehs.com/uploads/de5fcb98516369c7f9a7ac4d8cbec9ba')";
        } else {
            face.style.backgroundImage = "url('https://codehs.com/uploads/20d54272f48c4d4f34c3b32cc2b5c2ce')";
        }
    }
}
function changeCursor(){
    if (onTarget && !safe){
        document.body.style.cursor = "url('https://codehs.com/uploads/30b78a08088b0556ce972c380c577f09'),auto";
        scorePoint();
    } else {
        document.body.style.cursor = "url('https://codehs.com/uploads/1868b8fcfbfe07274c6197bda0c65297'),auto";
        losePoint();
    }
}
function knockout(){
    safe = true;
    face.style.backgroundImage = "url('https://codehs.com/uploads/c4889f61e1d9d1cacb3dcc111c414cb3')";
    timer = setInterval(wakeUp,1500);
}
function losePoint(){
    let scoreBoard = document.getElementById("score");
    let score = scoreBoard.innerHTML;
    score --;
    if (score >= 0){
        scoreBoard.innerHTML = score;
    }
}
function runAway(){
    clearInterval(runTimer);
    
    let x = Math.floor(30+50*Math.random()) + "%";
    let y = Math.floor(30+50*Math.random()) + "%";
    
    $("#game_piece").animate({"left":x,"top":y});
    
    runTimer = setInterval(runAway,Math.floor(1000*Math.random()));
}
function scorePoint(){
    let scoreBoard = document.getElementById("score");
    let score = parseInt(scoreBoard.innerHTML);
    score += 10;
    scoreBoard.innerHTML = score;
    knockout();
}
function target(){
    if (onTarget){
        onTarget = false;
        if (!safe){
            face.style.backgroundImage = "url('https://codehs.com/uploads/20d54272f48c4d4f34c3b32cc2b5c2ce')";
        }
    } else{
        onTarget = true;
        if (!safe){
            face.style.backgroundImage = "url('https://codehs.com/uploads/de5fcb98516369c7f9a7ac4d8cbec9ba')";
        }
    }
}
function wakeUp(){
    safe = false;
    clearInterval(timer);
    changeBack();
}
