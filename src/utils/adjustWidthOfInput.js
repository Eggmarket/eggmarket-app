export function adjustWidthOfInput(element) {
  element.style.width = getWidthOfInput(element) + "px";
}

function getWidthOfInput(inputEl) {
  var tmp = document.createElement("span");
  tmp.className = "text-lg font-black";
  tmp.innerHTML = inputEl.value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  document.body.appendChild(tmp);
  var theWidth = tmp.getBoundingClientRect().width;
  document.body.removeChild(tmp);
  return theWidth;
}
