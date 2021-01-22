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

function init() {
	renderQuote();

	currentWord = 0;
	correct = 0;
}

renderQuote();
function renderQuote() {
    wordInput.disabled = true;

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

restartBtn.addEventListener("click", init);

wordInput.addEventListener("keypress", (event) => {
	console.log(event);

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

// Restart test on tab keypress
document.addEventListener("keypress", (event) => {
	console.log(event);
});

document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && (event.key === "Z" || event.key === "z")) {
		init();
	}
});

// TODO: Highlight current word
// TODO: Calculate WPM
// TODO: Calculate Accuracy
// TODO: Highlight wrong words in input
