
btnSit.forEach(function (element) {
    element.addEventListener('click', function (event) {
        let btnClickedId = event.target.innerText;
        
        if (selectSitArr.length + 1 > 4) {
            if (selectSitArr.includes(btnClickedId)) {
                selectSitArr = selectSitArr.filter(element => element !== btnClickedId);
                removeBg(btnClickedId);
                removeSitList(btnClickedId);
                minusSitCount();
                minusPrice();
            }
            else {
                alert('Maximum 4 seats are allowed to purchace  !!!');
            };
        }
        else {
            if (selectSitArr.includes(btnClickedId)) {
                selectSitArr = selectSitArr.filter(element => element !== btnClickedId);
                removeBg(btnClickedId);
                removeSitList(btnClickedId);    
                minusSitCount();
                minusPrice();
            }
            else {
                selectSitArr.push(btnClickedId);
                addBtnBg(btnClickedId);
                addSitList(btnClickedId);
                addSitCount();
                addPrice();
            };
        };
    });
});

