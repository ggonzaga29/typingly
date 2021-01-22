const quoteElement = document.getElementById("quote");
const restartBtn = document.getElementById("restart");
const wordInput = document.getElementById("word-input");

let wordList, wordElements;
let allWordsStr = "";
let allLettersTyped = "";
let testOngoing = false;

const colors = {
    background: ""
}

let currentSource = "randomEnglish";

const sources = new Map();
sources.set(
	"quotable",
	"http://api.quotable.io/random?minLength=100&maxLength=120"
);
sources.set("randomEnglish", "texts/json");

async function getQuote() {
	const link = sources.get("quotable");

	let response = await fetch(link);
	let data = await response.json();
	return data;
}

// await function getData() {
//     const link = sources.get(currentSource);

// 	let response = await fetch(link);
// 	let data = await response.json();
// 	return data;
// }

// hello world

// test function
async function getEnglishWords() {
	let response = await fetch("texts/english.json");
	let data = await response.json();
	return data;
}

function renderEnglish() {
	getEnglishWords().then((data) => {
		let wordArr = data.text;

		let total = 1;
		let maxWords = 50;
		let finalWordArr = [];

		for (let i = 0; i < wordArr.length; i++) {
			if (total <= maxWords) {
				const rand = Math.trunc(Math.random() * wordArr.length);

				finalWordArr.push(wordArr[rand]);
			}

			total++;
		}

		renderToHTML(finalWordArr);
	});
}

function init() {
	renderText(currentSource);
	clearInterval(timer);

    timer = null;

	currentWord = 0;
	correct = 0;
	allWordsStr = "";
    allLettersTyped = "";
    curTime = 0;
    console.clear();
}

function renderQuote() {
	wordInput.disabled = true;

	getQuote().then((data) => {
		const words = data.content;

		renderToHTML(words);
	});
}

renderText(currentSource);
function renderText(link) {
	switch (link) {
		case "quotable":
			renderQuote();
			break;

		case "randomEnglish":
			renderEnglish();
			break;
		default:
			break;
	}
}

function renderToHTML(arr) {
	if (typeof arr === "string") {
		wordList = arr
			.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
			.replace(/\s{2,}/g, " ")
			.toLowerCase()
			.split(" ");
	} else {
		wordList = arr;
	}

	wordElements = wordList.map((word, i) => {
		return `<span class="word-${i} transition duration-75 ease-in-out">${word}</span>`;
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
}

// renderQuote();
let currentWord = 0;
let correct = 0;
let curWord;

let timer;
let curTime;

restartBtn.addEventListener("click", init);

wordInput.addEventListener("keypress", (event) => {
	!testOngoing ? (testOngoing = true) : (testOngoing = false);

	// Timer
	if (!timer) {
		let start = Date.now();
		timer = setInterval(function () {
			const delta = Date.now() - start; // milliseconds elapsed since start
			curTime = Math.floor(delta / 1000); // in seconds
			console.log(curTime);
		}, 1000); // update about every second
	}

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
		curWordEl.classList.remove("text-next");

		if (nextWordEl) {
			nextWordEl.classList.add("text-next");
		}

		let typedWord = wordInput.value;
		// Trimmed spaces at the start of the word due to space
		if (typedWord[0] === " ") {
			typedWord = typedWord.trimStart();
		}

		if (typedWord === wordList[currentWord]) {
            // Highlight correct words
			curWordEl.classList.add("text-correct");
			correct++;
			wordInput.value = "";
		} else if (typedWord !== wordList[currentWord]) {
            // Highlight wrong words
			curWordEl.classList.add("text-wrong");
			wordInput.value = "";
		}

		wordInput.value = "";

		if (currentWord !== wordList.length) {
			currentWord++;
		}

		if (currentWord === wordList.length) {
			wordInput.disabled = true;
			console.log(allWordsStr, allLettersTyped);
			clearInterval(timer);
			calcWpm(wordList.length, curTime);
		}
	}
});

function calcWpm(textLength, time) {
	const wpm = (textLength / time) * 60;
	console.log(wpm);
}

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
///// TODO: Calculate WPM
// TODO: Calculate Accuracy
// TODO: Highlight wrong words in input
// TODO: Calculate accuracy using levenshtein distance
