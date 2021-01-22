const quoteElement = document.getElementById("quote");
const restartBtn = document.getElementById("restart");
const wordInput = document.getElementById("word-input");

let wordList, wordElements;
let allWordsStr = "";
let allLettersTyped = "";

const sources = new Map();
sources.set("quotable", "http://api.quotable.io/random?minLength=100&maxLength=120");
sources.set("randomEnglish", "texts/json");

async function getQuote() {
	let response = await fetch(
		"http://api.quotable.io/random?minLength=100&maxLength=120"
	);
	let data = await response.json();
	return data;
}

// hello world

// test function
async function getEnglishWords() {
    let response = await fetch("texts/english.json");
    let data = await response.json();
    return data;
}

renderEnglish();
function renderEnglish() {
    getEnglishWords().then(data => {
        let wordArr = data.text;

        for (let i = 0; i < wordArr.length; i++) {
            console.log();
        }

    })
}


function init() {
	renderQuote();

	currentWord = 0;
	correct = 0;
	allWordsStr = "";
	allLettersTyped = "";
}

renderQuote();
function renderQuote() {
	wordInput.disabled = true;

	getQuote().then((data) => {
        const words = data.content;

		wordList = data.content
			.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
			.replace(/\s{2,}/g, " ")
			.toLowerCase()
			.split(" ");

		wordElements = wordList.map((word, i) => {
			return `<span class="word-${i}">${word}</span>`;
		});

		wordList.forEach((word) => {
			allWordsStr += word;
		});

		quoteElement.innerHTML = "";
		wordElements.forEach((element) => {
			quoteElement.innerHTML += element;
			quoteElement.innerHTML += " ";
		});
		wordInput.disabled = false;
        document.querySelector(`.word-0`).classList.add("text-blue-500");
        curWord = wordList[currentWord];
	});
}


function renderText(wordArr) {
    
}


// renderQuote();
let currentWord = 0;
let correct = 0;
let curWord;

restartBtn.addEventListener("click", init);

wordInput.addEventListener("keypress", (event) => {
	if (event.code !== "Space") {
		allLettersTyped += event.key;
    }
    
    curWord = wordList[currentWord];

	const curWordEl = document.querySelector(`.word-${currentWord}`);
	let nextWordEl;
	nextWordEl = document.querySelector(`.word-${currentWord + 1}`);

	if (currentWord !== wordList.length) {
	}

	if (event.code === "Space") {
		curWordEl.classList.remove("text-blue-500");

		if (nextWordEl) {
			nextWordEl.classList.add("text-blue-500");
		}

		let typedWord = wordInput.value;
		// Trimmed spaces at the start of the word due to space
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

		if (currentWord !== wordList.length) {
			currentWord++;
		}

		if (currentWord === wordList.length) {
			wordInput.disabled = true;
			console.log("test done");
			console.log(allWordsStr, allLettersTyped);
		}
	}
});

// Highlight current word
// function hightlightWord() {
// 	console.log(`.word-${currentWord}`);
// 	let el = document.querySelector(`.word-${currentWord}`);
// 	el.classList.add("text-blue-500");
// 	currentWord++;
// }

// Restart test on tab keypress

document.addEventListener("keydown", function (event) {
	if (event.ctrlKey && (event.key === "Z" || event.key === "z")) {
		init();
	}
});

///// TODO: Highlight current word
// TODO: Calculate WPM
// TODO: Calculate Accuracy
// TODO: Highlight wrong words in input
// TODO: Calculate accuracy using levenshtein distance
