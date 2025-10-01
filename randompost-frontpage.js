// ==UserScript==
// @name         BearBlog Random Post Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a "I'm feeling lucky!" button to bearblog.dev that redirects to a random post
// @author       Kami
// @match        https://bearblog.dev/discover/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pagelimit = 4250

    function setCookie(name, value) {
        document.cookie = `${name}=${value}; path=/`;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function randPost() {
        const randPage = Math.trunc(Math.floor(Math.random() * pagelimit));
        setCookie("random_redirected", "true");
        window.location.href = `https://bearblog.dev/discover/?page=${randPage}`;
    }

    function getPost() {
        if (getCookie("random_redirected") !== "true") {
            return;
        }

        setCookie("random_redirected", "false");

        const posts = document.querySelectorAll("li a");
        if (posts.length > 0) {
            const post = posts[Math.floor(Math.random() * posts.length)];
            window.location.href = post.href;
        }
    }

    function createButton() {
        const button = document.createElement("button");
        button.textContent = "I'm feeling lucky!";
        button.style.marginTop = "20px";
        button.style.borderBlockColor = "#FFA86A";
        button.style.backgroundColor = "#222129";
        button.style.color = "#FFA86A";
        button.className = "btn";
        button.id = "btn";
        button.addEventListener("click", randPost);

        const tagsElement = document.querySelector("details");
        if (tagsElement && tagsElement.parentNode) {
            tagsElement.parentNode.insertBefore(button, tagsElement.nextSibling);
        }
    }

    window.addEventListener("load", () => {
        if (location.pathname === "/discover/") {
            createButton();
            getPost();
        }
    });
})();
