const askButton = document.getElementById("ask-button");
const aiSelect = document.getElementById("ai-select");
const questionInput = document.getElementById("question");
const outputDiv = document.getElementById("output-div");
let encodedText = "";

askButton.addEventListener("click", function () {
  askQuestion();
});

questionInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    askQuestion();
  }
});

function askQuestion() {
  const selectedAI = aiSelect.value;
  const question = questionInput.value;

  // Implement logic to communicate with the selected AI and retrieve the answer
  let answer = "";
  switch (selectedAI) {
    case "Encode":
      answer = shiftEncoding(question);
      encodedText = answer;
      break;
    case "Decode":
      answer = shiftDecoding(encodedText);
      break;
    default:
      break;
  }

  if (selectedAI === "Encode") {
    outputDiv.innerHTML = `<p>Encoded text:</p><p>${encodedText}</p>`;
  } else {
    outputDiv.innerHTML = `<p>Decoded text:</p><p>${answer}</p>`;
  }
}

function shiftEncoding(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      // Check if the character is a letter
      charCode += 2; // Increment the ASCII code of the character by 2
      if ((charCode > 90 && charCode < 97) || charCode > 122) {
        // Handle the edge case of letters wrapping around
        charCode -= 26;
      }
    }
    output += String.fromCharCode(charCode);
  }
  return output;
}

function shiftDecoding(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      // Check if the character is a letter
      charCode -= 2; // Decrement the ASCII code of the character by 2
      if ((charCode > 90 && charCode < 97) || charCode < 65) {
        // Handle the edge case of letters wrapping around
        charCode += 26;
      }
    }
    output += String.fromCharCode(charCode);
  }
  return output;
}

// Get the copy button and output div
const copyButton = document.getElementById("copy-button");

// Add a click event listener to the copy button
copyButton.addEventListener("click", function () {
  // Create a temporary input element to copy the text
  const tempInput = document.createElement("input");

  // Set the value of the temporary input element to the encoded/decoded text only
  const outputText = outputDiv.innerText;
  if (outputText.startsWith("Encoded text: ")) {
    tempInput.value = outputText.replace("Encoded text: ", "");
  } else if (outputText.startsWith("Decoded text: ")) {
    tempInput.value = outputText.replace("Decoded text: ", "");
  } else {
    tempInput.value = outputText;
  }

  // Add the temporary input

  document.body.appendChild(tempInput);

  // Copy the text to the clipboard
  tempInput.select();
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);
});

function allowedinthispage() {
  // Retrieve the stored username from cookies
  var cookies = document.cookie.split(";");
  var username = null;
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf("username=") == 0) {
      username = decodeURIComponent(cookie.substring("username=".length));
      break;
    }
  }

  // Retrieve the stored password from local storage
  var password = localStorage.getItem("password");

  // Check if the stored credentials match any of the users in the JSON file
  fetch("users.json")
    .then((response) => response.json())
    .then((users) => {
      var user = users.find(
        (user) => user.username == username && user.password == password
      );
      if (user != null) {
      } else {
        alert("You should not be here");
        window.location.href = "index.html"; // Redirect to login page
      }
    })
    .catch((error) => alert("Error loading users: " + error));
}

function loggedin() {
  // Check if the "username" cookie and "password" item exist
  if (
    document.cookie.indexOf("username") >= 0 &&
    localStorage.getItem("password") !== null
  ) {
        // Show the "logout" button and hide the "login" button
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("encode").style.display = "block";
        document.getElementById("about").style.display = "block";
        document.getElementById("embed3kho").style.display = "block";
      } else {
        // Show the "login" button and hide the "logout" button
        document.getElementById("login-btn").style.display = "block";
        document.getElementById("logout-btn").style.display = "none";
        document.getElementById("encode").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("embed3kho").style.display = "none";
      }

  // Add click event listener to the "login" button
  document.getElementById("login-btn").addEventListener("click", function () {
    // Redirect to the login page
    window.location.href = "login.html";
  });
}
function logout() {
  // Clear the "username" cookie
  document.cookie =
    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear the "developer credential" cookie
  document.cookie =
    "developer credential=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Remove the "password" item from the localStorage
  localStorage.removeItem("password");

  // Redirect to the home page
  window.location.href = "index.html";
}

// Add click event listener to the "logout" button
document.getElementById("logout-btn").addEventListener("click", logout);
