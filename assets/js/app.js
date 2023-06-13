window.onload = function () {
  main();
};
// all colors saved here
let savedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// this is  main function
function main() {
  const pick_colorBtn = document.querySelector("#pick_color");
  const clearColors = document.querySelector("#clear");

  clearColors.addEventListener("click", clearAllColors);
  pick_colorBtn.addEventListener("click", activeEyeDropper);

  colorItemsShow();
}

// show colors items
function colorItemsShow() {
  const color_list = document.querySelector(".color_list");
  color_list.innerHTML = "";
  for (item of savedColors) {
    color_list.appendChild(colorItem(item));
  }
  isColorAvailable();
  copyColorCode();
}

// eyeDropper picked a color code
async function activeEyeDropper() {
  try {
    const eyeDropper = new EyeDropper();
    const {sRGBHex} = await eyeDropper.open();
    // save color in savedColors array with saved localStorage
    if (savedColors.includes(sRGBHex)) return;
    savedColors.push(sRGBHex);
    localStorage.setItem("picked-colors", JSON.stringify(savedColors));
    navigator.clipboard.writeText(sRGBHex);
    colorItemsShow();
  } catch (error) {
    console.log(error);
  }
}

// color item created
function colorItem(colorCode) {
  const li = document.createElement("li");
  li.style.backgroundColor = colorCode;
  li.setAttribute("title", colorCode);
  return li;
}

// check is color saved or available
function isColorAvailable() {
  const color_picker = document.querySelector(".color_picker");
  if (savedColors.length === 0) {
    return color_picker.classList.remove("active");
  }
  color_picker.classList.add("active");
}

// clear saved or available colors
function clearAllColors() {
  if (confirm("Are you sure? Do you want to delete color collections.")) {
    savedColors = [];
    localStorage.setItem("picked-colors", JSON.stringify(savedColors));
    colorItemsShow();
    isColorAvailable();
  }
}

// * Improved this function
// power by https://twitter.com/wydmanski_/status/1668293354554048516/photo/1
function copyColorCode() {
  const color_list = document.querySelector("ul.color_list");

  color_list.addEventListener("click", function (e) {
    const targetElement = e.target;

    if (targetElement.tagName === "LI") {
      console.log("clicked");
      try {
        navigator.clipboard.writeText(targetElement.title);
      } catch (error) {
        console.log(error);
      }
    }
  });
}
