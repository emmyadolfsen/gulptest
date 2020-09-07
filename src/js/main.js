// Kör igång när sidan laddas, toggle vid knapptryck
$(document).ready(function() {
    $("button").click(function() {
        $(".toggle").toggle();
    });


    setInterval(bubble_blink, 1000);

});

// Gör så att bubblan blinkar
function bubble_blink() {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(1000);
}