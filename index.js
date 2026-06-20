let height = $(".petal").height()*3;
height *= 100/$(window).height();
height += "%";
$(".banner").css({"height":height});

let spotHeight = .05*$(window).height() + $(".container").height()/2 - $(".spot").height()/2;
spotHeight *= 100/$(window).height();
spotHeight += "%";
$(".spot").css({"top":spotHeight});

let buffer = $(".container").width()/2 + $(window).height()/20 - $(".band").height()/2;
buffer *= 100/$(window).height();
buffer += "%";
$(".band").css({"top":buffer});

$(".petal").hover(expand,collapse);

function collapse(){
    $(this).animate({"width":"15%"});
    $(this).children().fadeToggle();
}
function expand(){
    $(this).animate({"width":"50%"});
    $(this).children().fadeToggle();
}
