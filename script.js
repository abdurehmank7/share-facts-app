// IMPORTS
import { CATEGORIES, initialFacts } from "./data.js";

// DOM
const btn = document.querySelector(".btn-open");
// console.dir(btn); // gives btn as dom object with drop down
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
const asideCategoryList = document.querySelector(".aside-cateogories-ul");

// clearing
factsList.innerHTML = "";

// UTILITY FUNCTIONS
/**
 *
 * @param {Array} categoryObjList - List of Category Objects {name, color}
 * @param {String} categoryName - Name of target category to find to color of
 * @returns {String} - The corresponding color of category
 */
const findColor = (categoryObjList, categoryName) => {
	// the answer was an object inside an array
	const [filteredObject] = categoryObjList.filter((eachObject) => {
		return eachObject.name === categoryName;
	});
	return filteredObject.color;
};

/**
 * Populates Categories of in the sidebar
 */

const populateCategories = () => {
	// clear the existing categories except the first one
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
};

/**
 * Creates a DOM element that is list item which represents each fact
 * @param {Object} factObject - The factObject
 * @returns {HTMLElement} - The list item
 */

const createFactListElement = (factObject) => {
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

	// Parent list element
	const listElement = document.createElement("li");
	listElement.classList.add("fact");

	// FACT: text and source
	const paragraph = document.createElement("p");
	paragraph.textContent = text;
	listElement.appendChild(paragraph);

	const anchorTag = document.createElement("a");
	anchorTag.classList.add("source");
	anchorTag.href = source;
	anchorTag.target = "_blank";
	anchorTag.textContent = "(Source)";
	paragraph.append(anchorTag);

	// Category tag
	const spamElement = document.createElement("span");
	spamElement.classList.add("tag");

	const color = findColor(CATEGORIES, category);
	spamElement.style = `background-color: ${color}`;
	spamElement.textContent = category;
	listElement.appendChild(spamElement);

	// Vote buttons
	const divButton = document.createElement("div");
	divButton.classList.add("vote-buttons");

	divButton.innerHTML = `
		<button>👍 ${votesInteresting}</button>
		<button>🤯 ${votesMindblowing}</button>
		<button>⛔️ ${votesFalse}</button>

	`;

	listElement.appendChild(divButton);
	return listElement;
};

/**
 * - Loads facts from Supabase API and populates the facts list.
 *
 */
async function loadFacts() {
	const res = await fetch(
		"https://gkcojvcxjiqhwrctfnxi.supabase.co/rest/v1/facts",
		{
			headers: {
				apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrY29qdmN4amlxaHdyY3RmbnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDk3NjcsImV4cCI6MjA1MjU4NTc2N30.QBjcTWtjzXF4FxDyjnCVNJd7xzkjWN3qdaAlP9TCXtQ",
				authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrY29qdmN4amlxaHdyY3RmbnhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDk3NjcsImV4cCI6MjA1MjU4NTc2N30.QBjcTWtjzXF4FxDyjnCVNJd7xzkjWN3qdaAlP9TCXtQ",
			},
		}
	);

	const data = await res.json();

	data.forEach((fact) => {
		const listElement = createFactListElement(fact);
		factsList.insertAdjacentElement("beforeend", listElement);
	});
}

// EVENT HANDLERS

/**
 * Toggle visibility off the form
 */
const toggleFormVisibility = () => {
	// console.log("Button was CLICKed");
	if (form.classList.contains("hidden")) {
		form.classList.remove("hidden");
		btn.textContent = "close";
	} else if (!form.classList.contains("hidden")) {
		form.classList.add("hidden");
		btn.textContent = "share a fact";
	}
};

const init = () => {
	loadFacts();
	populateCategories();

	btn.addEventListener("click", toggleFormVisibility);
};

init();
