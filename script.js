const countrySelect = document.getElementById("countrySelect");
const fetchButton = document.getElementById("fetchButton");
const resultDiv = document.getElementById("result");

// Fetch a list of countries and populate the dropdown
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });

// Add a click event listener to the fetchButton
fetchButton.addEventListener("click", () => {
  const selectedCountry = countrySelect.value;

  if (selectedCountry) {
    fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
      .then((response) => response.json())
      .then((data) => {
        const countryData = data[0];
        const countryInfo = `
                    <h2>${selectedCountry}</h2>
                    <p>Capital: ${countryData.capital}</p>
                    <p>Currency: ${countryData.currencies[0]}</p>
                `;
        resultDiv.innerHTML = countryInfo;
      })
      .catch((error) => {
        console.error("Error fetching country information:", error);
      });
  }
});
