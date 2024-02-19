function setBgGreen(val){
    const btnId = document.getElementById(val);
    btnId.classList.add('bg-[#1DD100]');
}

function calculateSit(val){
    // Add selected sit count 
    const selectedSit = document.getElementById('selected-sit-count');
    let selectedSitCount = parseInt(selectedSit.innerText);
    selectedSitCount = selectedSitCount + 1;
    selectedSit.innerText = selectedSitCount;

    // Remove total sit available

    const availableSit = document.getElementById('available-sit');
    let availableSitVal = parseInt(availableSit.innerText);
    let sitVal = availableSitVal - 1;
    availableSit.innerText = sitVal;

    function setBgNormal(val){
        const btnId = document.getElementById(val);
        btnId.classList.remove('bg-[#1DD100]');
    }
    if(selectedSitCount > 4){
        alert('Maximum 4 sits are allowed to purchace.');
        if(selectedSitCount >=5)
        {
            setBgNormal(val);
            selectedSit.innerText = selectedSitCount-1;
            availableSit.innerText = sitVal + 1;
        }
    }    
}

