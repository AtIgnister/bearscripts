const footnotes = document.querySelectorAll(".footnote-ref")
footnotes.forEach(note => {
    note.addEventListener("click",footnoteClick, false)
});

function footnoteClick(event) {
    const noteLink = event.target;
    const note = document.querySelector(noteLink.href.substring(noteLink.href.lastIndexOf('/') + 1));
    const noteText = note.innerText;
    alert(noteText);

    event.preventDefault();
}