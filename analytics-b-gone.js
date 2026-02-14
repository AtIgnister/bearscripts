// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2026-02-14
// @description  try to take over the world!
// @author       You
// @match        https://bearblog.dev/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bearblog.dev
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    addEventListener("load", (event) => {
        if (window.location.pathname.endsWith("/dashboard/settings/")) {
            addSettings();
        }

        if (window.location.pathname.endsWith("/dashboard/analytics/") && !analyticsEnabled()) {
            window.history.back();
        }
    });

    function addSettings() {
        const firstForm = document.querySelector("form");
        if (!firstForm) return;

        const wrapper = document.createElement("div");
        wrapper.style.marginTop = "10px";

        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "disableAnalyticsPage";
        checkbox.name = "disableAnalyticsPage";

        if(analyticsEnabled()) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        checkbox.addEventListener("change", toggleAnalytics)
        checkbox.classList.add('analyticsChecbox-k')

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" Enable Analytics Page"));

        wrapper.appendChild(label);
        firstForm.insertAdjacentElement("afterend", wrapper);
    }

    function analyticsEnabled() {
        if (localStorage.getItem('analyticsEnabled') === null) {
            localStorage.setItem('analyticsEnabled', 'true');
        }

        return localStorage.getItem('analyticsEnabled') === 'true';
    }

    function toggleAnalytics() {
        if(analyticsEnabled()) {
            localStorage.setItem('analyticsEnabled', false);
            return
        }

        localStorage.setItem('analyticsEnabled', true);
    }

})();