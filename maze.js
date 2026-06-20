const CELLS_ACROSS = 40;
const CELLS_DOWN = 18;
const COLUMNS = 2*CELLS_ACROSS + 1
const ROWS = 2*CELLS_DOWN + 1;
const COLUMN_WIDTH = (100 / COLUMNS);
const ROW_HEIGHT = (100 / ROWS);

let playerLocation = [1,0];
let closed = true;

function main(){
    initGrid();
    initMaze();
    initPlayer();
    $("body").keydown(keypress);
}

function connect(id,newId){
    let i0 = parseInt(id.substring(5,id.indexOf("x")));
    let j0 = parseInt(id.substring(id.indexOf("x")+1));
    let i1 = parseInt(newId.substring(5,newId.indexOf("x")));
    let j1 = parseInt(newId.substring(newId.indexOf("x")+1));
    
    let i = (i0 + i1)/2;
    let j = (j0 + j1)/2;
    
    let newDiv = $("<div></div>",{
        "class": "wall",
        "id": "block"+i+"x"+j,
        "width":COLUMN_WIDTH + "%",
        "height":ROW_HEIGHT + "%"
    }).appendTo(".container");
    let top = (ROW_HEIGHT * j) + "%";
    let left = (COLUMN_WIDTH * i) + "%";
    $("#"+ijid(i,j)).css({"top":top,"left":left});
}
function idji(text){
    let i = parseInt(text.substring(5,text.indexOf("x")));
    let j = parseInt(text.substring(text.indexOf("x")+1));
    return [i,j];
}
function ijid(i,j){
    return "block"+i+"x"+j;
}
function initGrid(){
    for (var i=0; i<COLUMNS; i++){
        for (var j=0; j<ROWS; j++){
            if ((i%2===0 && j%2===0) || i === 0 || (j === 0 && i!=1) || (j === ROWS-1 && i!=COLUMNS-2) || i === COLUMNS-1){
                let newDiv = $("<div></div>",{
                    "class": "wall",
                    "id": ijid(i,j),
                    "width":COLUMN_WIDTH + "%",
                    "height":ROW_HEIGHT + "%"
                }).appendTo(".container");
            }
        }
    }
    $(".wall").each(function(){
        let i = this.id.substring(5,this.id.indexOf("x"));
        let j = this.id.substring(this.id.indexOf("x")+1);
        let top = (ROW_HEIGHT * j) + "%";
        let left = (COLUMN_WIDTH * i) + "%";
        $(this).css({"top":top,"left":left});
        if (i!=0 && j!=0 && i!=COLUMNS-1 && j!=ROWS-1){
            $(this).css({"background-color":"red"});
        }
    });
}
function initMaze(){
    let stillRed = true;
    while (stillRed){
        initTrail();
        stillRed = false;
        $(".wall").each(function(){
            if (!stillRed && $(this).css("background-color") === "rgb(255, 0, 0)"){
                stillRed = true;
            }
        })
    }
}
function initPlayer(){
    let newDiv = $("<div></div>",{
        "class": "player",
        "width":COLUMN_WIDTH + "%",
        "height":ROW_HEIGHT + "%"
    }).appendTo(".container");
    $(".player").css({"left":COLUMN_WIDTH+"%","top":0});
}
function initTrail(){
    let i = 2*Math.floor(Math.random()*(CELLS_ACROSS-1)+1);
    let j = 2*Math.floor(Math.random()*(CELLS_DOWN-1)+1);
    let id = ijid(i,j);
    while ($("#"+id).css("background-color") != "rgb(255, 0, 0)"){
        i = 2*Math.floor(Math.random()*(CELLS_ACROSS-1)+1);
        j = 2*Math.floor(Math.random()*(CELLS_DOWN-1)+1);
        id = ijid(i,j);
    }
    let keepGoing = true;
    while(keepGoing){
        if ($("#"+id).css("background-color") === "rgb(255, 0, 0)"){
            $("#"+id).css({"background-color":"blue"});
            let coord = idji(id);
            let square = step(coord[0],coord[1]);
            id = ijid(square[0],square[1]);
        } else if (id === "blocknxo"){
            console.log("hello");
            i = 2*Math.floor(Math.random()*(CELLS_ACROSS-1)+1);
            j = 2*Math.floor(Math.random()*(CELLS_DOWN-1)+1);
            id = ijid(i,j);
            while ($("#"+id).css("background-color") != "rgb(0, 0, 255)"){
                i = 2*Math.floor(Math.random()*(CELLS_ACROSS-1)+1);
                j = 2*Math.floor(Math.random()*(CELLS_DOWN-1)+1);
                id = ijid(i,j);
            }
            $("#"+id).css({"background-color":"red"});
        } else {
            keepGoing = false;
        }
    }
    $(".wall").each(function(){
        if ($(this).css("background-color") === "rgb(0, 0, 255)"){
            $(this).css({"background-color":"green"});
        }
    })
}
function nextSquare(i,j){
    let options = [[i-2,j],[i+2,j],[i,j-2],[i,j+2]];
    let goodOptions = [];
    for (var n=0; n<4; n++){
        let i0 = options[n][0];
        let j0 = options[n][1];
        let id = ijid(i0,j0);
        if ($("#"+id).css("background-color") != "rgb(0, 0, 255)"){
            goodOptions.push([i0,j0]);
        }
    }
    if (goodOptions.length > 0){
        return goodOptions[Math.floor(Math.random()*goodOptions.length)];
    } else {
        return "none";
    }
}
function step(i,j){
    let stop = nextSquare(i,j);
    if (stop != "none"){
        let newId = "block"+stop[0]+"x"+stop[1];
        connect(ijid(i,j),newId);
    }
    return stop;
}

function keypress(e){
    if (!closed){
        if (e.key === "ArrowUp"){
            movePlayer(0,-1);
        } else if (e.key === "ArrowDown"){
            movePlayer(0,1);
        } else if (e.key === "ArrowLeft"){
            movePlayer(-1,0);
        } else if (e.key === "ArrowRight"){
            movePlayer(1,0);
        }
    } else if (e.key === " "){
        $(".curtain").slideToggle("slow");
        closed = false;
    }
}
function movePlayer(dx,dy){
    let x = playerLocation[0]+dx;
    let y = playerLocation[1]+dy;
    
    let target = $("#"+ijid(x,y)).width();
    if (target === undefined && y >= 0 && y < ROWS){
        playerLocation = [x,y];
        x *= COLUMN_WIDTH;
        y *= ROW_HEIGHT;
        x += "%";
        y += "%";
        $(".player").css({"left":x,"top":y});
    }
    if (playerLocation[0] === COLUMNS-2 && playerLocation[1] === ROWS - 1){
        resetMaze();
    }
}
function resetMaze(){
    closed = true;
    $(".curtain").slideToggle("slow",function(){
        $(".wall").remove();
        $(".player").remove();
        initGrid();
        initMaze();
        playerLocation = [1,0];
        initPlayer();
    });
}

main();
