const quoteText = document.querySelector(".quote"),
  authorName = document.querySelector(".author .name"),
  quoteBtn = document.querySelector("button"),
  soundBtn = document.querySelector(".sound"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter");

// random quote function
function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";

  // fetching random quotes / data from the API and parsing it into Javascript object (JSON)
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.innerText = "New Quote";
      quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener(
  "click",
  (window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
    // the SpeechSynthesisUtterance is a web speech api that represents a speech request
    var utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    utterance.voice = voices[2];
    utterance.lang = voices[2].lang;
    // speak method of speechSynthesis speaks the utterance
    window.speechSynthesis.speak(utterance);
  })
);

copyBtn.addEventListener("click", () => {
  // copying the quote text on copyBtn click
  // writeText() property writes the specified text string to the system clipboard
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  let twitterUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  // opening a new twitter tab with passing quote in the url
  window.open(twitterUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
