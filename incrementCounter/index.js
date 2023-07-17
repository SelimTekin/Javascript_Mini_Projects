let numberElements = document.querySelectorAll(".number");

numberElements.forEach(num => {
    let numberInt = parseInt(num.innerHTML);
    let numberCount = 0;
    setInterval( () => {
        // if(numberCount < numberInt) numberCount++;
        numberCount < numberInt ? numberCount++ : numberCount = numberInt
        num.innerHTML = numberCount;
    }, 50);
});