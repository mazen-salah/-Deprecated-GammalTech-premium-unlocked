// ==UserScript==
// @name         GammalTech Premium
// @namespace    http://www.gammal.tech
// @version      1.0
// @description  Periodically update local storage data on www.gammal.tech if values are false and prevent automatic redirects
// @match        https://www.gammal.tech/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function preventAutomaticRedirects() {
    const currentURL = window.location.href;
    if (currentURL.includes("lesson")) {
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = null;
      });
    }
  }

  function checkAndUpdateLocalStorage() {
    const USER_DATA_KEY = "userData";
    const XIS_PREMIUM_KEY = "xisPremium";
    const IS_PREMIUM_KEY = "isPremium";
    const CLAIMS_KEY = "claims";

    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
      const xisPremium = localStorage.getItem(XIS_PREMIUM_KEY);
      const isPremium = localStorage.getItem(IS_PREMIUM_KEY);
      const claims = JSON.parse(localStorage.getItem(CLAIMS_KEY));

      if (userData && userData.Algorithms !== 999) {
        userData.Algorithms = 999;
        userData.Flutter = 999;
        userData.Dart = 999;
        userData.Python = 999;
        userData.OOP = 999;       
        userData['HTML'] = 999;
        userData['CSS'] = 999;
        userData['C Programming'] = 999;
        userData['C++ Programming'] = 999;
        userData['Data Structures'] = 999;
        userData['Entrepreneurship'] = 999;
        userData['UI & UX Design'] = 999;
        userData['masterclass'] = 999;


        localStorage.setItem("userData", JSON.stringify(userData));
      }

      if (userData && userData.premium === false) {
        userData.premium = true;
        userData.isEconomy = false;
        localStorage.setItem("userData", JSON.stringify(userData));
      }

      if (xisPremium === "false") {
        localStorage.setItem("xisPremium", "true");
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

  const updateInterval = 100;
  setInterval(checkAndUpdateLocalStorage, updateInterval);
  preventAutomaticRedirects();
})();
