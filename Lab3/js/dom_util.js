const typeInput = document.getElementById('type_input')
const powerInput = document.getElementById('power_input')
const diodeInput = document.getElementById('diodes_input')
const producerInput = document.getElementById('producer_input')
const totalValue = document.getElementById('totalValueH')
const itemsContainer = document.getElementById('items_container')

export const EDIT_BUTTON_PREFIX = "edit-button-";
export const DELETE_BUTTON_PREFIX = "delete_button-"

const getItemId = (id) => `item-${id}`

const itemTemplate = ({id, type, power, diodes, producer}) => `

<div id="${getItemId(id)}" class="card" style="width: 18rem; margin-bottom: 10px">
    <div class="card-body">
        <h5 class="card-title">Type: ${type}</h5>
        <p class="card-text">Power: ${power}</p>
        <p class="card-text">Number of diodes: ${diodes}</p>
        <p class="card-text">Producer: ${producer}</p>
        <div class="card-button">
			<button id="${EDIT_BUTTON_PREFIX}${id}" class="edit-button btn btn-primary mt-4">Edit</button>
			<button id="${DELETE_BUTTON_PREFIX}${id}"class=" delete_button btn btn-danger mt-4">Delete</button>
		</div>
    </div>
</div>`

export const addItemToPage = ({id, type, power, diodes, producer}, onEdit, onDelete) => {
    itemsContainer.insertAdjacentHTML(
        'afterbegin', itemTemplate({id, type, power, diodes, producer})
        );

        const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
        editButton.addEventListener("click", onEdit);

        const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
        deleteButton.addEventListener("click", onDelete);
}

export const clearInputs = () => {
    typeInput.value = "";
    powerInput.value = "";
    diodeInput.value = "";
    producerInput.value = "";
}

export const showAllItems = (lamps, onEdit, onDelete) => {
    itemsContainer.innerHTML = "";
    // debugger;
    // for(const lamp of lamps) {
    //     addItemToPage(lamp, onEdit, onDelete)
    // }

    lamps.map((lamp) => addItemToPage(lamp, onEdit, onDelete));

}

export const getInputValues = () => {
    // var myTypeBox = typeInput;
    // if (myTypeBox.value !== ""){
        return{
            type: typeInput.value,
            power: powerInput.value,
            diodes: diodeInput.value,
            producer: producerInput.value,
        };
    // } else {
    //     alert("Fill in 'type'");
    // }
}

export const sortItems = ({lamps, property}) => {
    function sortPower(property){
        if(property == "power"){
            lamps.sort((a, b) => b.power - a.power);
        };
    }

    function sortDiodes(propert){
        if(property == "diodes"){
            lamps.sort((a, b) => b.diodes - a.diodes);
        };
    }

    if (property == "power"){
        sortPower(property);
    } else{
        sortDiodes(property);
    }

    itemsContainer.innerHTML = "";
    showAllItems(lamps);
}

export const countTotalValues = ({lamps, property}) => {
    totalValue.innerHTML = "";

    const totalValues = lamps.reduce((sum, current) => {
        if(property === "power"){
            return parseInt(sum, 10) + parseInt(current.power, 10)
        }
        if(property === "diodes"){
            return parseInt(sum, 10) + parseInt(current.diodes, 10)
        }
    }, 0);

    totalValue.innerHTML = totalValues;
}
