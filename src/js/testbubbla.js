// Kör när sidan laddas, sätt intervall för att loopa koden.
$(document).ready(function() {
    setInterval(testbubbla, 1)

});


// En bubbla som rör sig nerifrån och upp
function testbubbla() {
    $("#testbubbla").css("visibility", "visible").animate({
        height: '900px',
        opacity: '0.8'
    }, 2900).fadeOut("1").animate({
        height: '0',
        opacity: '0'
    }).fadeIn("1");
}