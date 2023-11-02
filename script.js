document.getElementById("logout-btn").addEventListener("click", logout);
function resetIframe() {
  var elem = document.getElementById("embedded-site");
  elem.src = elem.src;
}
function toggleFullScreen() {
  var elem = document.getElementById("embedded-site");
  if (!document.fullscreenElement) {
    elem.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
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
  about();
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
    document.getElementById("Games").style.display = "none";
    document.getElementById("Lunanom").style.display = "none";
    document.getElementById("bookmarklets").style.display = "block";
    document.getElementById("about").style.display = "block";
    var dev = document.cookie;
    if ((dev = "developer credentials")) {
      document.getElementById("Games").style.display = "block";
      document.getElementById("Lunanom").style.display = "block";
      
    }
  } else {
    // Show the "login" button and hide the "logout" button
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("encode").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("Lunanom").style.display = "none";
    document.getElementById("embed3kho").style.display = "none";
    document.getElementById("Games").style.display = "none";
    document.getElementById("bookmarklets").style.display = "none";
    document.getElementById("about").style.display = "none";
  }

  // Add click event listener to the "login" button
  document.getElementById("login-btn").addEventListener("click", function () {
    // Redirect to the login page
    window.location.href = "login.html";
  });
}
function submitForm() {
  const linkInput = document.getElementById("link-input");
  const outputDiv = document.getElementById("output-div");
  const link =
    "http://webcache.googleusercontent.com/search?q=cache:" + linkInput.value;
  outputDiv.innerText = link;
  copyTextToClipboard(link);
  window.location.href = link;
}
function copyTextToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}
function verify() {
  // Retrieve the values of the username and password input fields
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Load the users from the JSON file
  fetch("users.json")
    .then((response) => response.json())
    .then((users) => {
      // Check if the entered username and password match any of the users
      var user = users.find(
        (user) => user.username == username && user.password == password
      );
      if (user != null) {
        // Store the entered credentials in both cookies and local storage
        document.cookie =
          "username=" +
          encodeURIComponent(username) +
          "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        localStorage.setItem("password", password);
        // Add "dev" cookie if credentials are the dev credentials
        if (username == "185656" && password == "tisd03162009") {
          document.cookie = "developer credential";

          window.location.href = "index.html";
        }

        window.location.href = "index.html";
      } else {
        // Add "dev" cookie if credentials are the dev credentials
        if (username == "185656" && password == "tisd03162009") {
          document.cookie = "developer credential";

          window.location.href = "index.html";
        } else {
          alert("Credentials are incorrect.");
        }
      }
    })
    .catch((error) => alert("Error loading users: " + error));
}
function loadCredentials() {
  // Retrieve the stored username from cookies
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf("username=") == 0) {
      var username = decodeURIComponent(cookie.substring("username=".length));
      document.getElementById("username").value = username;
      break;
    }
  }

  // Retrieve the stored password from local storage
  var password = localStorage.getItem("password");
  if (password != null) {
    document.getElementById("password").value = password;
  }
}
function about() {
  var password = localStorage.getItem("password");
  if (password == null){
  var url = window.location.href;
  var win = window.open();
  var iframe = win.document.createElement("iframe");
  iframe.style =
    "position:fixed;width:100vw;height:100vh;top:0px;left:0px;right:0px;bottom:0px;z-index:2147483647;background-color:#333333;border:none;";
  if (url.includes("https://") || url.includes("http://")) {
    iframe.src = url;
  } else {
    iframe.src = "https://" + url;
  }
  win.document.body.appendChild(iframe);
  window.location.href = "https://launchpad.classlink.com/tomballisd";
}}
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
