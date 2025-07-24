//WALID MOUHAB 07/24/25

function getInputValue() {
  const value = parseFloat(document.getElementById("num").value);
  return isNaN(value) ? null : value;
}

// For loop → Addition
function Addition_(num) {
  let result = "Addition:\n";
  for (let i = 1; i <= 10; i++) {
    result += `${i} + ${num} = ${i + num}\n`;
  }
  document.getElementById("addition").textContent = result;
}

// While loop → Subtraction
function Subtraction_(num) {
  let result = "Subtraction:\n";
  let i = 1;
  while (i <= 10) {
    result += `${i} - ${num} = ${i - num}\n`;
    i++;
  }
  document.getElementById("subtraction").textContent = result;
}

// Do-while loop → Multiplication
function Multiplication_(num) {
  let result = "Multiplication:\n";
  let i = 1;
  do {
    result += `${i} * ${num} = ${i * num}\n`;
    i++;
  } while (i <= 10);
  document.getElementById("multiplication").textContent = result;
}

// For loop → Division
function Division_(num) {
  let result = "Division:\n";
  for (let i = 1; i <= 10; i++) {
    result += `${i} / ${num} = ${(i / num).toFixed(2)}\n`;
  }
  document.getElementById("division").textContent = result;
}

// Master function
function runAllCalculations() {
  const num = getInputValue();
  if (num === null) {
    alert("Please enter a valid number.");
    return;
  }

  Addition_(num);
  Subtraction_(num);
  Multiplication_(num);
  Division_(num);
}

// Event listener
document
  .getElementById("calculateBtn")
  .addEventListener("click", runAllCalculations);
