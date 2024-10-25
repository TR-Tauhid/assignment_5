const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = event.target;
  const name = formData.name.value;
  const number = formData.number.value;
  const email = formData.email.value;
  const passengerData = {
    name,
    number,
    email,
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
      console.log(data);
      alert(data.message);
      if (data.downloadLink) {
        // Create a download link for the JSON file
        const link = document.createElement("a");
        link.href = data.downloadLink;
        link.download = data.downloadLink; // Set the file name
        link.click(); // Programmatically click the link to trigger download
      }
    })
    .catch((err) => console.log(err));
});
