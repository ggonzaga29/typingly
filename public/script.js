const quoteElement = document.getElementById("quote");
const restartBtn = document.getElementById("restart");
const wordInput = document.getElementById("word-input");

let wordList, wordElements;

async function getQuote() {
	let response = await fetch(
		"http://api.quotable.io/random?minLength=100&maxLength=120"
	);
	let data = await response.json();
	return data;
}

renderQuote();
function renderQuote() {
	getQuote().then((data) => {
		wordList = data.content
			.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
			.replace(/\s{2,}/g, " ")
			.toLowerCase()
			.split(" ");

		wordElements = wordList.map((word, i) => {
			return `<span class="word-${i}">${word}</span>`;
		});

		quoteElement.innerHTML = "";
		wordElements.forEach((element) => {
			quoteElement.innerHTML += element;
			quoteElement.innerHTML += " ";
		});
		wordInput.disabled = false;
	});
}

// renderQuote();
let currentWord = 0;
let correct = 0;

restartBtn.addEventListener("click", function () {
    renderQuote();

    currentWord = 0;
    correct = 0;
});
wordInput.addEventListener("keypress", (event) => {
	if (event.code === "Space") {
		let curWordEl = document.querySelector(`.word-${currentWord}`);

		let typedWord = wordInput.value;
		if (typedWord[0] === " ") {
			typedWord = typedWord.trimStart();
		}

		if (typedWord === wordList[currentWord]) {
			curWordEl.classList.add("text-green-500");
			correct++;
			wordInput.value = "";
		} else if (typedWord !== wordList[currentWord]) {
			curWordEl.classList.add("text-red-500");
			wordInput.value = "";
		}

		wordInput.value = "";

		if (currentWord != wordList.length) {
			currentWord++;
		}

		if (currentWord === wordList.length) {
			wordInput.disabled = true;
		}
	}
});

// TODO: Highlight current word
// TODO: Calculate WPM
// TODO: Calculate Accuracy