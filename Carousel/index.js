const carousel = document.querySelector(".carousel"),
firstImg = document.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i")

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev / next icon according to carousel scroll left value

    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width. scrollWidth returns the entire width including what is not viewable (scrollWidth, görüntülenemeyenler de dahil olmak üzere tüm genişliği döndürür)

    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value clientWidth = width of content - padding

        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;

        // if(icon.id == "left"){
        //     carousel.scrollLeft -= firstImgWidth;
        // }
        // else{
        //     carousel.scrollLeft += firstImgWidth;
        // }

        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {

    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;

    // getting difference value that needs to add or reduce from carousel left to take middle img center (orta img merkezini almak için sol carousel'den eklenmesi veya azaltılması gereken fark değeri elde ediliyor)
    let valDifference = firstImgWidth - positionDiff;

    // if user is scrolling to the right
    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;

}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX; // for touchable devices
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {

    // scrolling images / carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault(); // preventing it's default behavior. Now, image won't be dragged.

    isDragging = true;

    carousel.classList.add("dragging");

    // pageX returns the horizontal coordinate of mouse pointer
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

    // scrollLeft set or return the number of pixel an element's content is scrolled horizontally
    carousel.scrollLeft = prevScrollLeft - positionDiff;

    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    // isDragging will only true if user start dragging. Otherwise it is false & autoSlide function won't call
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart); // it'll only true if the mouse btn is clicked
carousel.addEventListener("touchstart", dragStart); // for mobile

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging); // for mobile

carousel.addEventListener("mouseup", dragStop); // isDragStart is will be false when mouse btn is not clicked
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop); // for mobile