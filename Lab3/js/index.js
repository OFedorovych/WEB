import {
    addItemToPage,
    clearInputs,
    showAllItems,
    getInputValues,
    sortItems,
    countTotalValues
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const findInput = document.getElementById("find_input");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const sortProperty = document.getElementById("property_sorting");
const DECS_button = document.getElementById("DESC_button");
const totalValues = document.getElementById("property_total_value");

let lamps = [];

const addItem = ({type, power, diodes, producer}) => {
    const generatedId = uuid.v1();

    const newItem = {id:generatedId, type, power, diodes, producer};
    lamps.push(newItem);
    addItemToPage(newItem);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const {type, power, diodes, producer} = getInputValues();
    clearInputs();
    addItem({type, power, diodes, producer});
} )

findButton.addEventListener('click', () => {
    const foundLamps = lamps.filter(lamp => lamp.type.search(findInput.value) !== -1);
    showAllItems(foundLamps);
})

cancelFindButton.addEventListener('click', () => {
    showAllItems(lamps);
    findInput.value = "";
})

sortProperty.addEventListener('change', () => {
    sortItems({lamps, property: sortProperty.value});
})

DECS_button.addEventListener('click', () => {
    lamps = lamps.reverse();
    showAllItems(lamps);
})

totalValues.addEventListener('change', () => {
    countTotalValues({lamps, property: totalValues.value})
})