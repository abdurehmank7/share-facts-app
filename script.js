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

const asideCategoryList = document.querySelector(".aside-cateogories-ul");

// remove the embedded category list items leaving all in place
const lis = asideCategoryList.querySelectorAll("li:not(:first-child)");
lis.forEach((elem) => elem.remove());
// adding categories to side

CATEGORIES.forEach((elem) => {
	const { name, color } = elem;
	const categoryListItem = document.createElement("li");
	categoryListItem.classList.add("category");

	const categoryButton = document.createElement("button");

	categoryButton.classList.add("btn", "btn-category");
	categoryButton.style = `background-color: ${color}`;
	categoryButton.textContent = `${name}`;

	categoryListItem.appendChild(categoryButton);

	asideCategoryList.appendChild(categoryListItem);
});

// adding facts to the list dynamically from initialFacts along with the
// input:categoryname, categoryObjList return color
const findColor = (categoryObjList, categoryName) => {
	for (let index = 0; index < categoryObjList.length; index++) {
		const element = categoryObjList[index];
		if (element.name === categoryName) {
			return element.color;
		}
	}
};

// this function will return a list dom element to be added to unodered list
// look at the initial html list elements for reference

const createListElement = (factObject) => {
	// destructure factObject
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

	// create parent list element
	const listElement = document.createElement("li");
	// added class
	listElement.classList.add("fact");

	const paragraph = document.createElement("p");
	// textContent is inner text that is displayed
	paragraph.textContent = text;
	// add paragraph element to parent element
	listElement.appendChild(paragraph);

	// create anchor DOM element for source, is clickable
	const anchorTag = document.createElement("a");
	anchorTag.classList.add("source");
	anchorTag.href = source;
	anchorTag.target = "_blank";
	anchorTag.textContent = "(Source)";
	paragraph.append(anchorTag);

	// create DOM element for category
	const spamElement = document.createElement("span");
	spamElement.classList.add("tag");

	const color = findColor(CATEGORIES, category);

	spamElement.style = `background-color: ${color}`;
	spamElement.textContent = category;
	listElement.appendChild(spamElement);

	// making div for buttons
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
