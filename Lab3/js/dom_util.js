const typeInput = document.getElementById('type_input')
const powerInput = document.getElementById('power_input')
const diodeInput = document.getElementById('diodes_input')
const producerInput = document.getElementById('producer_input')

const totalValue = document.getElementById('totalValueH')
const itemsContainer = document.getElementById('items_container')

const getItemId = (id) => `item-${id}`
const itemTemplate = ({id, type, power, diodes, producer}) => `

<div id="${getItemId(id)}" class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Type: ${type}</h5>
        <p class="card-text">Power: ${power}</p>
        <p class="card-text">Number of diodes: ${diodes}</p>
        <p class="card-text">Producer: ${producer}</p>
    </div>
</div>`

export const addItemToPage = ({id, type, power, diodes, producer}) => {
    itemsContainer.insertAdjacentHTML('afterbegin', itemTemplate({id, type, power, diodes, producer}));
}

export const clearInputs = () => {
    typeInput.value = "";
    powerInput.value = "";
    diodeInput.value = "";
    producerInput.value = "";
}

export const showAllItems = (items) => {
    itemsContainer.innerHTML = "";
    for(const item of items) {
        addItemToPage(item)
    }
}

export const getInputValues = () => {
    var myTextBoxElem = typeInput;
    if (myTextBoxElem.value !== ""){
        return{
            type: typeInput.value,
            power: powerInput.value,
            diodes: diodeInput.value,
            producer: producerInput.value,
        };
    } else {
        alert("Fill in 'type'");
    }
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
