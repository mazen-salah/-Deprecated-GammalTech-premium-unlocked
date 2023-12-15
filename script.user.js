// ==UserScript==
// @name         GammalTech Premium
// @namespace    http://www.gammal.tech
// @version      1.0
// @description  Update local storage data on www.gammal.tech and prevent automatic redirects.
// @match        https://www.gammal.tech/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const gbid = (id) => document.getElementById(id);
    const hide = (id) => gbid(id).style.display = 'none';
    const show = (id) => gbid(id).style.display = 'block';

    function showMasterClassVideo() {
        const currentURL = window.location.href;
        if (!currentURL.includes("masterclass-intro") && currentURL.includes("masterclass/")) {
            const bvid = `62eb88a8-ba18-43cb-ac53-99b4418385c9`;
            if (bvid.length > 30) {
                gbid('lv').innerHTML = `
                    <div style="position: relative; padding-top: 56.25%;">
                        <iframe src="https://iframe.mediadelivery.net/embed/23222/${bvid}?autoplay=true"
                                loading="lazy" style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
                                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                allowfullscreen="true">
                        </iframe>
                    </div>`;
                show('lv');
            }
        }
    }

    function showMasterClass() {
        const currentURL = window.location.href;
        if (currentURL.includes("masterclass") && !currentURL.includes("masterclass-intro") && !currentURL.includes("masterclass/")) {
            hide('loading');
            show('masterclasses-collection');
            hide('loadingText');
        }
    }

    function preventAutomaticRedirects() {
        const currentURL = window.location.href;
        if ((currentURL.includes("lesson") || currentURL.includes("masterclass")) && !currentURL.includes("masterclass-intro")) {
            window.addEventListener("beforeunload", (e) => {
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

            if (userData && !userData.lessonsUnlocked) {
                userData.lessonsUnlocked = true;
                const subjects = ["Algorithms", "Entrepreneurship", "Flutter", "OOP", "Python"];
                for (const subject of subjects) {
                    userData[subject] = 999;
                }
                userData.access = ["lifetime"];
                const programmingLanguages = ["C Programming", "C++ Programming"];
                for (const language of programmingLanguages) {
                    userData[language] = 999;
                }
                const otherSubjects = ["Company Security", "Data Structures", "UI & UX Design"];
                for (const subject of otherSubjects) {
                    userData[subject] = 999;
                }
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            }

            if (userData && userData.premium === false) {
                userData.premium = true;
                userData.isEconomy = false;
                localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
            }

            if (xisPremium === "false") {
                localStorage.setItem(XIS_PREMIUM_KEY, "true");
            }

            if (isPremium === "false") {
                localStorage.setItem(IS_PREMIUM_KEY, "true");
            }

            if (claims && claims.premium === false) {
                claims.premium = true;
                localStorage.setItem(CLAIMS_KEY, JSON.stringify(claims));
            }
        } catch (error) {
            console.error("An error occurred while updating local storage:", error);
        }
    }

    const updateInterval = 100;
    preventAutomaticRedirects();
    setInterval(checkAndUpdateLocalStorage, updateInterval);
    showMasterClass();
    showMasterClassVideo();

})();
