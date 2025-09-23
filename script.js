let result = document.getElementById("result");

function appendValue(value) {
  if (result.innerText === "0" && value !== ".") {
    result.innerText = value;
  } else {
    result.innerText += value;
  }
}

function clearAll() {
  result.innerText = "0";
}

function deleteLast() {
  if (result.innerText.length > 1) {
    result.innerText = result.innerText.slice(0, -1);
  } else {
    result.innerText = "0";
  }
}

function calculate() {
  try {
    result.innerText = eval(result.innerText.replace("×", "*").replace("÷", "/"));
  } catch {
    result.innerText = "Error";
  }
}
