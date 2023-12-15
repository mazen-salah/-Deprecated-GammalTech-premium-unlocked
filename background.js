// background.js

function preventAutomaticRedirects() {
  // Get the current URL
  const currentURL = window.location.href;
  // Check if the current URL contains the word "lesson"
  if (currentURL.includes("lesson")) {
    // Prevent the automatic redirect by canceling the beforeunload event
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = null;
    });
  }
}

// Function to periodically check and update local storage data
function checkAndUpdateLocalStorage() {
  // Constants for local storage keys
  const USER_DATA_KEY = "userData";
  const IS_PREMIUM_KEY = "isPremium";
  const CLAIMS_KEY = "claims";

  try {
    const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
    const isPremium = localStorage.getItem(IS_PREMIUM_KEY);
    const claims = JSON.parse(localStorage.getItem(CLAIMS_KEY));

    if (userData && userData.premium === false) {
      userData.premium = true;
      userData.isEconomy = true; // Optional: Set isEconomy to true
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    if (isPremium === "false") {
      localStorage.setItem("isPremium", "true");
    }

    if (claims && claims.premium === false) {
      claims.premium = true;
      localStorage.setItem("claims", JSON.stringify(claims));
    }
  } catch (error) {
    console.error("An error occurred while updating local storage:", error);
  }
}

// Configuration option for update interval (milliseconds)
const updateInterval = 100; // Adjust as needed

// Start the interval
setInterval(checkAndUpdateLocalStorage, updateInterval);
preventAutomaticRedirects();
