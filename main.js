//---------------------------Import from Data File-------------------------//

import charactersArr from "./Data/data";

//---------------------------DOM Elements-------------------------//
// create the variable for the DOM elements
const characterContainer = document.querySelector(".character-container");
const searchInput = document.querySelector("#search");
const checkboxes = document.querySelectorAll(".nav__checkbox");

//---------------------------Global Variables-------------------------//
// create a global variable for the array.
const checkedArray = [];

//---------------------------Functions-------------------------//
// This the function for creating the card based on the Array
// when creating an card using an array, you need to fo through the element in the array and create a new array.
// This is the map function.

const createCards = (array) => {
  const characterHTML = array
    .map((character) => {
      return `
    <div class="character-card">
      <h1 class="character-card__name">${character.firstName} ${character.lastName}</h1>
      <img class="character-card__image" src=${character.imageUrl} alt="Image of ${character.firstName}">
      <h3 class="character-card__family">House: ${character.family}</h3>
      <h2 class="character-card__title">Family: ${character.title}</h2>
    </div>
    `;
    })
    .join("");

  // The join() is an array method returns an array as a string.

  return characterHTML;
};

// this is a variable for a search input
const getSearchInput = (event) => {
  return event.target.value;
  // event.target -> this returns the DOM element where you can retrieve any property that has a value.
};

const filterBySearch = (event) => {
  // this variable for the search term based on the variable of the search term
  const searchTerm = getSearchInput(event);

  // create a array for the filer Arr
  const filteredArray = charactersArr.filter((character) => {
    return (
      // return the search variable and the array converts a string to lowercase letters.
      character.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  // display on the website
  characterContainer.innerHTML = createCards(filteredArray);
};

// variable for adding the checkbox and check if it meet the check box
const addToCheckboxArray = (event) => {
  if (!checkedArray.includes(event.target.id)) {
    checkedArray.push(event.target.id);
  } else if (checkedArray.includes(event.target.id)) {
    const index = checkedArray.indexOf(event.target.id);
    checkedArray.splice(index, 1);
  }
};

// variable to filter by the check box
const filterByCheckbox = (event) => {
  addToCheckboxArray(event);
  const filteredArrayByCheckbox = getFilteredArray(charactersArr, checkedArray);
  if (checkedArray.length < 1) {
    characterContainer.innerHTML = createCards(charactersArr);
  } else {
    characterContainer.innerHTML = createCards(filteredArrayByCheckbox);
  }
};

// variable for getting the filter array
const getFilteredArray = (array, checkArray) => {
  const filteredArrayByCheckbox = array.filter((character) => {
    return (
      character.family.toLowerCase().includes(checkArray[0]) ||
      character.family.toLowerCase().includes(checkArray[1]) ||
      character.family.toLowerCase().includes(checkArray[2]) ||
      character.family.toLowerCase().includes(checkArray[3])
    );
  });
  return filteredArrayByCheckbox;
};
//---------------------------Creation of Elements-------------------------//

// variable for the function of creating the card from the array.
const characterCards = createCards(charactersArr);

//---------------------------Change Inital Inner HTML----------------------//
// created the inner HTML for the creating card
characterContainer.innerHTML = characterCards;

//---------------------------Listeners-------------------------------------//
// add an event listener for the check box

searchInput.addEventListener("input", filterBySearch);
checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterByCheckbox)
);
