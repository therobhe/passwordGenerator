const numField = document.getElementById("numField");
const numSlider = document.getElementById("numSlider");

numField.addEventListener("input", syncInput);
numSlider.addEventListener("input", syncInput);

function syncInput(event) {
    const value = event.target.value;
    numSlider.value = value;
    numField.value = value;
}