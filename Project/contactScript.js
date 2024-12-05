

function validateForm() {
    const form = document.forms["form"];
    const name = form["name"].value.trim();
    const email = form["email"].value.trim();
    const message = form["message"].value.trim();

    // Validate Name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }
    if (name.length < 3) {
        alert("Name must be at least 3 characters long.");
        return false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        alert("Email must be filled out.");
        return false;
    }
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Message
    if (message === "") {
        alert("Message cannot be empty.");
        return false;
    }
    if (message.length > 500) {
        alert("Message cannot exceed 500 characters.");
        return false;
    }

    return true;
}

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.style.display = "block";
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});