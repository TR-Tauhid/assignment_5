
// const sitContainer1 = document.getElementById('sit-container-1');
// const sitContainer2 = document.getElementById('sit-container-2');


// const sitContainer = sitContainer1.classList + sitContainer2.classList;
// console.log((sitContainer.classList));

// const availableSit = document.getElementById('available-sit');
// const availableSitVal = parseInt(availableSit.innerText);

let sitCount = 0;

function btnClickedId(val){
    setBgGreen(val);
    calculateSit(val);
    // checkSitSelect(val);
}

