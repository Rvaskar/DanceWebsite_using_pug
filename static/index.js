document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("infoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let name1 = document.querySelector("input[name='name']").value
    let surname1 = document.querySelector("input[name='surname']").value

    const formData = {
      name: name1.toLowerCase(),
      surname: surname1.toLowerCase(),
      phone: document.querySelector("input[name='phone']").value,
      email: document.querySelector("input[name='email']").value,
      address: document.querySelector("input[name='address']").value,
      desc: document.querySelector("input[name='desc']").value,
    };

    const response = await fetch("http://localhost:8000/add", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    //   body: JSON.stringify(formData),
    body: new URLSearchParams(formData)
    });
    if (response.ok) {
      alert("Information added successfully!");
      document.getElementById("infoForm").reset();
    } else {
      alert("Error adding information.");
    }
  });
});




// document.addEventListener("DOMContentLoaded", () => {
//     const infoForm = document.getElementById("infoForm");

//     if (infoForm) {
//       infoForm.addEventListener("submit", async (e) => {
//         e.preventDefault();

//         const formData = getFormData();

//         const response = await fetch('http://localhost:8000/add', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });

//         if (response.ok) {
//           alert("Information added successfully!");
//         } else {
//           alert("Error adding information.");
//         }
//       });
//     }
//   });

//   function getFormData() {
//     return {
//         name: document.querySelector("input[name='name']").value,
//         phone: document.querySelector("input[name='phone']").value,
//         email: document.querySelector("input[name='email']").value,
//         address: document.querySelector("input[name='address']").value,
//         desc: document.querySelector("input[name='desc']").value,
//     };

//   }
