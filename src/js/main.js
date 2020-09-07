$(document).ready(function() {
    $("button").click(function() {
        $(".toggle").toggle();
    });



    setInterval(bubble_blink, 1000);

});

function bubble_blink() {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(1000);
}