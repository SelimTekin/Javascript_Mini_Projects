const toggleBtn = document.querySelector("#toggleBtn"),
body = document.querySelector("body");

function toggleFunc() {
    if(toggleBtn.classList.contains("bi-brightness-high")){
        toggleBtn.classList.remove("bi-brightness-high");
        toggleBtn.classList.add("bi-moon");
        body.style.background = "black";
        body.style.color = "white";
        body.style.transition = "2s";
    }
    else if(toggleBtn.classList.contains("bi-moon")){
        toggleBtn.classList.remove("bi-moon");
        toggleBtn.classList.add("bi-brightness-high");
        body.style.background = "white";
        body.style.color = "black";
        body.style.transition = "2s";
    }
}