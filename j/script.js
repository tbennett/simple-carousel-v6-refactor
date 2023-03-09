/* Immediately Invoked Function Expression (IIFE)
 * used to encapsulate all our code within a private scope
 * thus protecting ours and other's code from collisions
 */
(function () {
    document.addEventListener("DOMContentLoaded", init);
    let myInterval;

    /* Does the needed steps to set the stage for carousel
     *to be functional. Attempt to do so in a progressivly
     * enhanced manner.
     */
    function init() {
        // setup DOM references for neccessary elements
        const back_btn = document.querySelector(".back-btn");
        const next_btn = document.querySelector(".next-btn");
        const frame = document.querySelector(".frame");
        const slides = frame.querySelectorAll("img");
        const controls = document.querySelector(".controls");
        const caption = frame.querySelector("figcaption");

        // loop through all slides. hide and position them
        slides.forEach((currentNode) => {
            currentNode.classList.add("hide", "pos-abs");
        });

        // show the first slide image
        slides[0].classList.remove("hide");

        // show the carousel controls
        controls.classList.remove("hide");

        // add the click functionality to the buttons
        next_btn.addEventListener("click", changeSlide);
        back_btn.addEventListener("click", changeSlide);

        //setup the caption display
        caption.classList.add("caption");

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
        if (e) {
            e.preventDefault();
            clearInterval(myInterval);
        }

        // setup the neccessary DOM references
        const frame = document.querySelector(".frame");
        const showing = frame.querySelector("img.current");
        const slides = frame.querySelectorAll("img");
        const caption = document.querySelector(".caption");
        let nextUp = "";

        // determine which direction we will be going
        // if slide is being changed by timer, there will
        // be no event object passed.
        if (!e || e.target.className == "next-btn") {
            nextUp = showing.nextElementSibling;
        } else {
            nextUp = showing.previousElementSibling;
        }

        // decommission the currently visible slide
        showing.classList.add("hide");
        showing.classList.remove("current");

        // when using back button wrap to last slide if on first
        if (!nextUp) {
            nextUp = slides[slides.length - 1];
        }

        // if using next button wrap to first slide if at figcaption
        if (nextUp.nodeName !== "IMG") {
            nextUp = slides[0];
        }

        // activate the previous/next slide
        nextUp.classList.remove("hide");
        nextUp.classList.add("current");

        //change the caption
        caption.innerHTML = nextUp.getAttribute("alt");
    }
})();
