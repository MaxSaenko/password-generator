'use strict';

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

lengthEl.addEventListener('input', () => {
  const lengthCount = document.getElementById('lengthCount');
  lengthCount.innerText = lengthEl.value;
});

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied!');
});

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumber = numEl.checked;
  const hasSymbol = symbolEl.checked;

  lengthCount.innerText = length;

  resultEl.innerText = generatePass(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePass(upper, lower, number, symbol, length) {
  let generatePass = '';
  const typesCount = upper + lower + number + symbol;
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return '';
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      console.log(randomFunc);
      generatePass += randomFunc[funcName]();
    });
  }
  const finalPass = generatePass.slice(0, length);

  return finalPass;
}

// Receive random Upper Case
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Receive random Lower Case
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Receive random Number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Receive random Symbol
function getRandomSymbol() {
  const symbols = `!@#$%^&*(){}[]=<>/,.-_`;
  return symbols[Math.floor(Math.random() * symbols.length)];
}
