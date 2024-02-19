let totalPriceCount = 0;

function setBgGreen(val){
    const btnId = document.getElementById(val);
    btnId.classList.add('bg-[#1DD100]');
}

function calculateSit(val){
    // Add selected sit count 
    const selectedSit = document.getElementById('selected-sit-count');
    let selectedSitCount = parseInt(selectedSit.innerText);
    if(selectedSitCount <= 4){
        selectedSitCount = selectedSitCount + 1;
    }
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
        if(selectedSitCount >= 4)
        {
            setBgNormal(val);
            selectedSit.innerText = selectedSitCount - 1;
            availableSit.innerText = sitVal + 1;
        }
    }    

    // Add selected sit detail

    if(selectedSitCount <= 4)
    {
        const sitDetail = document.getElementById(val);
        let sitNum = sitDetail.innerText;
        let economy = 'Economy';
        let fare = 550;
    
        // Append list to sit detail section
    
        const sitDetailBox = document.getElementById('sit-detail-box');
    
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        const li3 = document.createElement('li');
    
        li1.innerText = sitNum;
        li2.innerText = economy;
        li3.innerText = fare;
    
        sitDetailBox.appendChild(li1);
        sitDetailBox.appendChild(li2);
        sitDetailBox.appendChild(li3);
    }

    // Calculate Price
    if(selectedSitCount <= 4){
        totalPriceCount =  selectedSitCount * 550;

        const totalPrice = document.getElementById('total-price');
        const grandTotal = document.getElementById('grand-total');

        totalPrice.innerText = 'BDT  ' + totalPriceCount;
        grandTotal.innerText = 'BDT  ' + totalPriceCount;

        
    }   
}

// Calculate Discount Price

let grandTotalPrice = 0;
const grandTotal = document.getElementById('grand-total');
const cuponBox = document.getElementById('cupon-box');
const totalPriceBox = document.getElementById('total-price-box');

function applyClicked(){
    const cuponInput = document.getElementById('cupon-input');
    cuponCode = cuponInput.value;

    if(cuponCode === 'NEW15'){
        dicsountPrice = totalPriceCount - (totalPriceCount * (15/100));
        grandTotal.innerText = dicsountPrice;
        cuponBox.classList.add('hidden');
        let diductedPrice = dicsountPrice - totalPriceCount;

        const discount = document.createElement('h1');
        const discountVal = document.createElement('h1');

        discount.innerText = 'Discounted Price: ';
        discountVal.innerText = diductedPrice;

        totalPriceBox.appendChild(discount);
        totalPriceBox.appendChild(discountVal).classList.add('text-right');
    }
    else if(cuponCode === 'Couple 20'){
        dicsountPrice = totalPriceCount - (totalPriceCount * (20/100));
        grandTotal.innerText = dicsountPrice;
        cuponBox.classList.add('hidden');
        let diductedPrice = dicsountPrice - totalPriceCount;
        const discount = document.createElement('h1');
        const discountVal = document.createElement('h1');

        discount.innerText = 'Discounted Price: ';
        discountVal.innerText = diductedPrice;
    
        totalPriceBox.appendChild(discount);
        totalPriceBox.appendChild(discountVal).classList.add('text-right');
    }
    else{
        alert('Cupon Code Invalid');
    }
}

// Next Btn Function

function nextClicked(){
    const numberBox = document.getElementById('number-box');
    const nameBox = document.getElementById('name-box');

    const number = numberBox.value;
    const name = nameBox.value;

    console.log(name);
    if(number > 1000000000 & name != null){
        const main = document.getElementById('main');
        const header = document.getElementById('header');
        const success = document.getElementById('success');

        header.classList.add('hidden');
        main.classList.add('hidden');
        success.classList.remove('hidden');
    }
    else
    {
        alert('Please provide a name and valid number')
    }
}

function continueClicked(){
    
    success.classList.add('hidden');
    header.classList.remove('hidden');
    main.classList.remove('hidden');
}