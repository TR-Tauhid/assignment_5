const header = document.getElementById("header");
const main = document.getElementById("main");
const btnSit = document.querySelectorAll(".btn-sit");
const sitDetailContainer = document.getElementById("sit-detail-container");
const selectedSitCount = document.getElementById("selected-sit-count");
const totalPriceCount = document.getElementById("total-price");
const grandPriceCount = document.getElementById("grand-total");
const availableSitCount = document.getElementById("available-sit");
const sitDetailBox = document.getElementById("sit-detail-box");
const couponInput = document.getElementById("coupon-input");
const couponBtn = document.getElementById("coupon-btn");
const couponBox = document.getElementById("coupon-box");
const discountValueBox = document.getElementById("discount-value-box");
const discountValue = document.getElementById("discount-value");
const nextBtn = document.getElementById("next-btn");
const numBox = document.getElementById("number-box");
const nameBox = document.getElementById("name-box");
const successBox = document.getElementById("success-box");
const footerBox = document.getElementById("footer-box");

let selectSitArr = [];
let discountPrice = 0;
let discount = 0;
let totalPrice = 0; // Initialize as a number for calculations

function removeBg(val) {
  document.getElementById(val).classList.remove("bg-[#1DD100]");
}

function addBtnBg(val) {
  document.getElementById(val).classList.add("bg-[#1DD100]");
}

function addSitList(val) {
  const tableRow = document.createElement("tr");
  const sitNum = document.createElement("td");
  const economy = document.createElement("td");
  const priceDetail = document.createElement("td");
  sitNum.innerText = val;
  economy.innerText = " Economy ";
  priceDetail.innerText = 550;
  tableRow.appendChild(sitNum);
  tableRow.appendChild(economy);
  tableRow.appendChild(priceDetail);
  sitDetailContainer.appendChild(tableRow);
  tableRow.classList.add("flex", "justify-between", "px-3");
}

function removeSitList(val) {
  let container = sitDetailContainer.querySelectorAll("tr");

  container.forEach(function (element) {
    if (element.innerText.includes(val)) {
      sitDetailContainer.removeChild(element);
    }
  });
}

function addSitCount() {
  selectedSitCount.innerText = parseInt(selectedSitCount.innerText) + 1;
  availableSitCount.innerText = parseInt(availableSitCount.innerText) - 1;
}

function minusSitCount() {
  selectedSitCount.innerText = parseInt(selectedSitCount.innerText) - 1;
  availableSitCount.innerText = parseInt(availableSitCount.innerText) + 1;
}

function addPrice() {
  totalPrice += 550;
  totalPriceCount.innerText = "BDT " + " " + totalPrice;
  grandPriceCount.innerText = "BDT " + " " + totalPrice;
}

function minusPrice() {
  totalPrice -= 550;
  totalPriceCount.innerText = "BDT " + " " + totalPrice;
  grandPriceCount.innerText = "BDT " + " " + totalPrice;
}

couponInput.addEventListener("keyup", function () {
  if (couponInput.value === "Couple 20") {
    couponBtn.removeAttribute("disabled", "");
    discount = 0.2;
  } else if (couponInput.value === "NEW15") {
    couponBtn.removeAttribute("disabled", "");
    discount = 0.15;
  } else {
    couponBtn.setAttribute("disabled", "");
  }
});

couponBtn.addEventListener("click", function applyCoupon() {
  discountPrice = totalPrice * (1 - discount);
  grandPriceCount.innerText = "BDT " + " " + discountPrice.toFixed(2);

  discountValue.innerText =
    "BDT " + " " + (totalPrice - discountPrice).toFixed(2);
  couponBox.classList.add("hidden");
  discountValueBox.classList.remove("hidden");
  discountValueBox.classList.add("flex");
  console.log(discountPrice);
});

function validateForm() {
  if (nameBox.value && numBox.value.length >= 10) {
    nextBtn.removeAttribute("disabled", "");
  } else {
    nextBtn.setAttribute("disabled", "");
  }
}

numBox.addEventListener("keyup", validateForm);

function nextClicked() {
  const form = document.querySelector("form");

  if (!form) return; // Ensure form exists

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = event.target;
    const name = formData.name.value;
    const number = formData.number.value;
    const email = formData.email.value;
    const journey_date = formData.journey_date.value;
    const passengerData = {
      name,
      number,
      email,
      journey_date,
      totalPrice: discountPrice || totalPrice, // Apply discount if available
      selectSitArr: selectSitArr.join(","),
    };

    fetch("http://localhost/assignment_5/main.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passengerData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Check if there's an error in the response
        if (data.error) {
          alert(data.error, "154"); // Show error message if present
        } else {
          alert(data.message); // Show success message
          if (data.downloadLink) {
            // If a download link is present
            const link = document.createElement("a");
            link.href = data.downloadLink;
            link.download = data.downloadLink; // Set the download attribute
            document.body.appendChild(link); // Append the link to the body
            link.click(); // Programmatically click the link to trigger the download
            document.body.removeChild(link); // Remove the link after triggering
          }
          // Hide relevant sections after success
          successBox.classList.remove("hidden");
          header.classList.add("hidden");
          main.classList.add("hidden");
          footerBox.classList.add("hidden");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert(
          `${err}There was an error processing your request. Please try again. 175`
        );
      });
  });
}
