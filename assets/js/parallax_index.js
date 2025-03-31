const background = document.getElementById("background");
var parallax_content_height;
var parallax_footer_height;
var parallax_banner_height;

function parallax() {
    /* console.log(parallax_content_height); */
    background.style.top = ((window.scrollY - parallax_banner_height) / (parallax_content_height - window.innerHeight + parallax_footer_height) * (background.offsetHeight - window.innerHeight) * -1) + "px";
}

window.addEventListener("scroll", parallax);
parallax();