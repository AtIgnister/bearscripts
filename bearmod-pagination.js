// ==UserScript==
// @name        Pagination
// @namespace   Violentmonkey Scripts
// @match       https://bearblog.dev/discover/*
// @grant       none
// @version     1.0
// @author      Kami
// @description 4/11/2025, 10:05:55 PM
// ==/UserScript==

addEventListener("load", (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page")) || 0;
    addPagination(currentPage);
});

function addPagination(page) {
    const container = document.querySelector("h1");

    // Add "Previous Page" link if page > 0
    if (page > 0) {
        const oldPage = page - 1;
        const prevLink = document.createElement("a");
        const url = new URL(window.location);
        url.searchParams.set("page", oldPage);
        prevLink.href = url.toString();
        prevLink.innerHTML = `&laquo; ${oldPage} `;
        container.append(prevLink);
    }

    // Add current + next 9 pages
    for (let index = page; index < page + 10; index++) {
        const pagelink = document.createElement("a");
        const url = new URL(window.location);
        url.searchParams.set("page", index);
        pagelink.href = url.toString();
        pagelink.innerHTML = `${index} `;
        container.append(pagelink);
    }
}