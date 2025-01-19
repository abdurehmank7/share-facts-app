import { CATEGORIES, initialFacts } from "./data.js";

console.log(CATEGORIES);
console.log(initialFacts);

// console.log("Hello World!")

const btn = document.querySelector(".btn-open");
console.dir(btn); // gives btn as dom object with drop down

const form = document.querySelector(".fact-form");

const factsList = document.querySelector(".facts-list");
// creating out embedded html list
factsList.innerHTML = "";

// adding facts to the list dynamically from initialFacts along with the

//

// input:categoryname, categoryObjList return color
const findColor = (categoryObjList, categoryName) => {
	for (let index = 0; index < categoryObjList.length; index++) {
		const element = categoryObjList[index];
		if (element.name === categoryName) {
			return element.color;
		}
	}
};

//

const createListElement = (factObject) => {
	const {
		id,
		text,
		source,
		category,
		votesInteresting,
		votesMindblowing,
		votesFalse,
		createdIn,
	} = factObject;

	const listElement = document.createElement("li");
	listElement.classList.add("fact");

	const paragraph = document.createElement("p");
	paragraph.textContent = text;
	listElement.appendChild(paragraph);

	const anchorTag = document.createElement("a");
	anchorTag.classList.add("source");
	anchorTag.href = source;
	anchorTag.target = "_blank";
	anchorTag.textContent = "(Source)";
	paragraph.append(anchorTag);

	const spamElement = document.createElement("span");
	spamElement.classList.add("tag");

	const color = findColor(CATEGORIES, category);

	spamElement.style = `background-color: ${color}`;
	spamElement.textContent = category;
	listElement.appendChild(spamElement);

	const divButton = document.createElement("div");
	divButton.classList.add("vote-buttons");
	const likeButton = document.createElement("button");
	likeButton.textContent = `👍 ${votesInteresting}`;
	const minBlownButton = document.createElement("button");
	minBlownButton.textContent = `🤯 ${votesMindblowing}`;
	const dislikeButton = document.createElement("button");
	dislikeButton.textContent = `⛔️ ${votesFalse}`;

	divButton.appendChild(likeButton);
	divButton.appendChild(minBlownButton);
	divButton.appendChild(dislikeButton);

	listElement.appendChild(divButton);
	return listElement;
};

initialFacts.forEach((elem) => {
	const listElement = createListElement(elem);
	factsList.insertAdjacentElement("beforeend", listElement);
});

// Toggle form visibility
btn.addEventListener("click", () => {
	console.log("Button was CLICKed");
	if (form.classList.contains("hidden")) {
		form.classList.remove("hidden");
		btn.textContent = "close";
	} else if (!form.classList.contains("hidden")) {
		form.classList.add("hidden");
		btn.textContent = "share a fact";
	}
});
