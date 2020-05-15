//grab values from input area
const characterAmountRange = document.getElementById('numSlider');
const characterAmountNumber = document.getElementById('numField');
const includeUppercaseElement = document.getElementById('mixCases');
const includeNumbersElement = document.getElementById('numbs');
const includeSymbolsElement = document.getElementById('symbols');
const form = document.getElementById('inputArea');
const passwordDisplay = document.getElementById('output');

//build arrays with set of chars corresponding to the checkbox condition
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
);

//recognize when slider or numField changes
characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);

//init generating the password and display it
form.addEventListener('submit', e => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
    passwordDisplay.value = password
});

//build the char arrays based on the checked conditions, throw out one char based on its ascii code for the length
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

//helper function to store ascii codes in array for building individual code-sets
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}
//synchronize the display of slider and numfield
function syncCharacterAmount(e) {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}