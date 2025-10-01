const dash_location = window.location.pathname;

const locationParts = dash_location.split("/");

let quill;

if (locationParts[3] === "posts" && locationParts[4]) {

document.addEventListener("DOMContentLoaded", startEditorScript);

}

function toggleQuill() {
  const toggled = localStorage.getItem("quilljs_toggled")
  const toggleBtn = document.querySelector(".quilljs_toggle")
  if(toggled == true) {
    localStorage.setItem("quilljs_toggled", "0")
  } else {
    localStorage.setItem("quilljs_toggled", "1")
  }

  location.reload(true);
}

function editorDisabled() {
  const toggled = localStorage.getItem("quilljs_toggled")
  if(toggled === undefined || toggled == true) {
    return true;
  } else {
    return false;
  }
}


function startEditorScript() {
  const editorTopBar = document.querySelector(".sticky-controls")
  const toggleScriptBtn = document.createElement("button")
  toggleScriptBtn.classList.add("quilljs_toggle")
  toggleScriptBtn.innerHTML = "Disable Quill"
  toggleScriptBtn.type = "button"
  toggleScriptBtn.style = "margin-right: 0.5rem;"

  toggleScriptBtn.addEventListener("click", toggleQuill)

  editorTopBar.appendChild(toggleScriptBtn)

  if(editorDisabled()) {
    document.querySelector(".quilljs_toggle").innerHTML = "Enable Quill"
    return;
  }

const nativeEditor = document.querySelector("#body_content");

const form = document.querySelector("form");


if (!nativeEditor || !form) return;


// Load Quill CSS

const quillCSS = document.createElement("link");

quillCSS.rel = "stylesheet";

quillCSS.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";

document.head.appendChild(quillCSS);


// Load Quill JS

const quillScript = document.createElement("script");
const resetButton = document.createElement("button");

resetButton.innerHTML = "Reset Localstorage";
resetButton.type = "button"
resetButton.addEventListener("click", fn => {
  localStorage.clear();
  location.reload(true);
})
editorTopBar.appendChild(resetButton)

quillScript.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";

quillScript.onload = () => {

// Hide the native editor

nativeEditor.style.display = "none";


// Create Quill editor container

const editorContainer = document.createElement("div");

editorContainer.id = "editor";

editorContainer.style.height = "300px";


// Insert new editor before the hidden textarea

nativeEditor.parentNode.insertBefore(editorContainer, nativeEditor);


// Initialize Quill
const myToolbar= [
  ['bold', 'italic', 'underline', 'strike'],       
  ['blockquote', 'code-block'],

  [{ 'color': [] }, { 'background': [] }],         
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'],                                        
  ['image']
];

quill = new Quill("#editor", {
theme: "snow",
modules: {
  toolbar: {
      container: myToolbar,
      handlers: {
          image: imageHandler
      }
  }
},
});


const saved = loadFromLocalStorage(window.location.pathname)

if(saved) {

quill.root.innerHTML = saved

} else {

// Load content from the textarea into Quill

quill.root.innerHTML = nativeEditor.value;

}


quill.on('text-change', function(delta, oldDelta, source) {

saveEditor();

});

};


document.body.appendChild(quillScript);

}


function saveEditor() {

const nativeEditor = document.querySelector("#body_content");

nativeEditor.value = quill.root.innerHTML;

saveLocalStorage(window.location.pathname, quill.root.innerHTML)

}


function saveLocalStorage(path, content) {

let quill_content;

const quill_raw = localStorage.getItem("quilljs");


if (quill_raw === null) {

quill_content = initQuillStorage(); // Returns object now

} else {

quill_content = JSON.parse(quill_raw);

}


quill_content.page[path] = content;


localStorage.setItem("quilljs", JSON.stringify(quill_content));

}


function loadFromLocalStorage(path) {

const quill_raw = localStorage.getItem("quilljs");


if (!quill_raw) return null;


try {

const quill_content = JSON.parse(quill_raw);

return quill_content.page?.[path] || null;

} catch (e) {

console.error("Failed to parse localStorage for quilljs:", e);

return null;

}

}


function initQuillStorage() {

return {

page: {}

};

}

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('please copy paste the image url here.');
  if(value){
      this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}