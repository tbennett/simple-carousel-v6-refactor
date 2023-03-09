// get the whole thing started
document.addEventListener("DOMContentLoaded", init);

// create the global (to this module) variable
// to allow access to our autoplay timer
let myInterval;

/*
 * Initialize the document for the carousel
 * to be functional. Attempt to do so in a progressivly
 * enhanced manner.
 */
function init() {
    // setup DOM references for neccessary elements
    const back_btn = document.querySelector(".back-btn");
    const next_btn = document.querySelector(".next-btn");
    const frame = document.querySelector(".frame");
    const allSlides = frame.querySelectorAll("img");
    const albums = frame.querySelectorAll("section");
    const currentAlbum = albums[0];
    const currentSlides = currentAlbum.querySelectorAll("img");
   
    const controls = document.querySelector(".controls");
    const caption = frame.querySelector("figcaption");
    const nav = document.querySelector('.albums-nav');
    const links = nav.querySelectorAll("A");

    links.forEach((link) => {
        link.addEventListener("click", changeAlbum);
    });

    // loop through all albums. hide and position them
    albums.forEach((album) => {
        album.classList.add("hide", "pos-abs");
    });

    // show the first album
    albums[0].classList.remove("hide");
    albums[0].classList.add("current");


    // loop through all slides. hide and position them
    allSlides.forEach((currentNode) => {
        currentNode.classList.add("hide", "pos-abs");
    });

    // show the first slide image
    currentSlides[0].classList.remove("hide");
    currentSlides[0].classList.add("current");

    // show the carousel controls
    controls.classList.remove("hide");

    // add the click functionality to the buttons
    next_btn.addEventListener("click", changeSlide);
    back_btn.addEventListener("click", changeSlide);

    // setup the caption display
    caption.classList.add('caption');
    caption.classList.remove('hide')

    frame.style.overflow = 'hidden';
    nav.classList.remove('hide');
    frame.classList.remove('frame-sans-js');


    // create the timer to sutoplay slides
    myInterval = setInterval(changeSlide, 5000);
}

/*
 * hides the current slide and then shows the next slide.
 * handles all of the conditions to make that work,
 * including determining what direction we are viewing the
 * slides.
 * ARGS: e - the event object passed by addEventListener.
 */
function changeSlide(e) {
    // deactivate link's normal functionality
    // and stop autoplay, only if there is a click event object.
    if (e) {
        e.preventDefault();
        clearInterval(myInterval);
    }

    // setup the neccessary DOM references
    const frame = document.querySelector(".frame");
    const album = frame.querySelector("section.current");
    const slides = album.querySelectorAll("img");
    const showing = album.querySelector(".current");
    const caption = frame.querySelector(".caption");
    let nextUp;

    // determine which direction we will be going
    // if slide is being changed by timer, there will
    // be no event object passed.
    if (!e || e.target.className == "next-btn") {
        nextUp = showing.nextElementSibling;
    } else if (e.target.className == "back-btn") {
        nextUp = showing.previousElementSibling;
    }

    // decommission the currently visible slide
    showing.classList.add("hide");
    showing.classList.remove("current");

    // if using next button, wrap to first slide if at figcaption
    if (!nextUp) {
        nextUp = slides[0];
    }

    // when using back button, wrap to last slide if on first
    if (nextUp.nodeName == "H3") {
        nextUp = slides[slides.length - 1];
    }

    // activate the previous/next slide
    nextUp.classList.remove("hide");
    nextUp.classList.add("current");

    //change the caption
    caption.innerHTML = nextUp.getAttribute("alt");
}

function changeAlbum(e) {
    if (e) {
        e.preventDefault();
        clearInterval(myInterval);
    }

    const nextAlbumName = `${e.target.innerText}`.toLowerCase();
    const nextAlbum = document.getElementById(nextAlbumName);
    const nextSlides = nextAlbum.querySelectorAll('IMG');
    const nextSlide = nextSlides[0];
    const frame = document.querySelector('.frame');
    const caption = frame.querySelector('figcaption');

    const currentAlbum = document.querySelector('section.current');
    const currentSlide = currentAlbum.querySelector('.current');

    currentAlbum.classList.add("hide");
    currentAlbum.classList.remove("current");
    currentSlide.classList.remove("current");
    
    nextAlbum.classList.remove("hide");
    nextAlbum.classList.add("current");
    nextSlide.classList.remove("hide");
    nextSlide.classList.add("current");

    caption.innerHTML = nextSlide.alt;

}
