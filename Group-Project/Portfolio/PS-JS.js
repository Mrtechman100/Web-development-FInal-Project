$(document).ready(function() {
    $(".main").fadeToggle(1500);
    $(".second").delay(1750).slideDown(500);
    $(".main").delay(2500).fadeToggle(1000);
    $(".second").delay(1600).fadeToggle(1000);
    $(".third").delay(5000).fadeToggle(1500);
    $(".links").delay(6700).fadeToggle(1000);
});

// window.onscroll = function() {myFunction()};
//
// var navbar = document.getElementById("nav");
//
// var sticky = navbar.offsetTop;
//
// function myFunction() {
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky")
//     } else {
//         navbar.classList.remove("sticky");
//     }
// }

$(window).scroll(function(e){
    if ($(this).scrollTop() > 750) {
        $("#nav").slideDown();
    } else {
        $("#nav").slideUp();
    }
});




var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,3000);

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].className = 'slide showing';
}

