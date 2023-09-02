
async function searchByName() {
    const searchName = document.getElementById("searchName").value;
  //   const response = await fetch(`/search/name/${searchName}`);
  const response = await fetch(`http://localhost:8000/search/name/${searchName}`);
  
    const data = await response.json();
    displayResults(data);
  }
  
  async function searchByEmail() {
    const searchEmail = document.getElementById("searchEmail").value;
    const response = await fetch(`http://localhost:8000/search/email/${searchEmail}`);
    const data = await response.json();
    displayResults(data);
  }
  
  function displayResults(data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
  
    if (data.length === 0) {
      resultsContainer.textContent = "No results found.";
      return;
    }
  
    data.forEach((entry) => {
      const entryDiv = document.createElement("div");
      entryDiv.innerHTML = `
          <p>Name: ${entry.name} ${entry.surname}</p>
          <p>Email: ${entry.email}</p>
          <p>Mobile No: ${entry.phone}</p>
          <p>Address: ${entry.address}</p>
          <p>Description: ${entry.desc}</p>
        `;
      resultsContainer.appendChild(entryDiv);
      
    });
  }