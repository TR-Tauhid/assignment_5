btnSit.forEach(function (element) {
    element.addEventListener('click', function (event) {
        let btnClickedId = event.target.innerText;

        // Check if the seat is already selected
        const isSelected = selectSitArr.includes(btnClickedId);

        if (isSelected) {
            // Deselect seat
            selectSitArr = selectSitArr.filter(element => element !== btnClickedId);
            removeBg(btnClickedId);
            removeSitList(btnClickedId);
            minusSitCount();
            minusPrice();
        } else {
            // Check if maximum seat limit is reached
            if (selectSitArr.length >= 4) {
                alert('Maximum 4 seats are allowed to purchase !!!');
            } else {
                // Select seat
                selectSitArr.push(btnClickedId);
                addBtnBg(btnClickedId);
                addSitList(btnClickedId);
                addSitCount();
                addPrice();
            }
        }
    });
});
