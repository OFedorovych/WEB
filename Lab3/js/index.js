import {
    clearInputs,
    showAllItems,
    getInputValues,
    sortItems,
    countTotalValues,
    EDIT_BUTTON_PREFIX,
	DELETE_BUTTON_PREFIX
} from "./dom_util.js";

import {
    getAllLamps,  
    postLamp,
    editLamp,
    deleteLamp
} from "./api.js";

const submitButton = document.getElementById("submit_button");
const findInput = document.getElementById("find_input");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const sortProperty = document.getElementById("property_sorting");
const DECS_button = document.getElementById("DESC_button");
const totalValues = document.getElementById("property_total_value");

const typeInput = document.getElementById("type_input");
const powerInput = document.getElementById("power_input");
const diodesInput = document.getElementById("diodes_input");
const producerInput = document.getElementById("producer_input");

let lamps = [];

const onEdit = async (e) => {
	const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
	const { type, power, diodes, producer } = getInputValues();

	clearInputs();

	editLamp(itemId, { type, power, diodes, producer }).then(refetchAllLamps);
};

const onDelete = (element) => {
	const id = element.target.id.replace(DELETE_BUTTON_PREFIX, "");
	deleteLamp(id).then(refetchAllLamps);
};

const refetchAllLamps = async () => {
	const allLamps = await getAllLamps();

	lamps = allLamps;
	showAllItems(lamps, onEdit, onDelete);
}

// const addItem = ({type, power, diodes, producer}) => {
//     const generatedId = uuid.v1();

//     const newItem = {id:generatedId, type, power, diodes, producer};
//     lamps.push(newItem);
//     addItemToPage(newItem);
// }

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    let invalidSymbols = ["`", "?", "!", ";", "#", "@", "%", "~", "&", "$", "№", "<", ">", "/", "\\", "*", "₴"];
	if (typeInput.value == 0) {
		alert("Введіть тип лампи!")
	}
	else if (powerInput.value == 0) {
		alert("Введіть потужність лампи!")
	}
	else if (diodesInput.value == "") {
		alert("Введіть кількість діодів!")
	}
    else if (producerInput.value == "") {
		alert("Введіть виробника лампи!")
	}
	else if (invalidSymbols.some(symbol => typeInput.value.includes(symbol))) {
		alert("Сторонні символи у назві лампи!")
	}
	else if (isNaN(powerInput.value)) {
		alert("Потужність лампи повинна бути числом");
	}
	else if (isNaN(diodesInput.value)) {
		alert("Кількість діодів повинна бути числом");
	}
    else if (invalidSymbols.some(symbol => producerInput.value.includes(symbol))) {
		alert("Сторонні символи у назві виробника!")
	}
	else { 
        const {type, power, diodes, producer} = getInputValues();
        clearInputs();
        postLamp({type, power, diodes, producer}).then(refetchAllLamps);}
} )

findButton.addEventListener('click', () => {
    const foundLamps = lamps.filter(lamp => lamp.type.search(findInput.value) !== -1);
    showAllItems(foundLamps, onEdit, onDelete);
})

cancelFindButton.addEventListener('click', () => {
    showAllItems(lamps, onEdit, onDelete);
    findInput.value = "";
})

sortProperty.addEventListener('change', () => {
    sortItems({lamps, property: sortProperty.value});
})

DECS_button.addEventListener('click', () => {
    lamps = lamps.reverse();
    showAllItems(lamps, onEdit, onDelete);
})

totalValues.addEventListener('change', () => {
    countTotalValues({lamps, property: totalValues.value})
})


refetchAllLamps();