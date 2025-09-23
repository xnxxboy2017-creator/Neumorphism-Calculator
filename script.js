let result = document.getElementById("result");
let themeBtn = document.getElementById("toggleTheme");

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
    // 👇 Secret Function
    if (result.innerText === "13042023") {
      result.innerText = "I ❤️ U.";
      return;
    }

    // Normal calculation
    result.innerText = eval(result.innerText);
  } catch {
    result.innerText = "Error";
  }
}

// Theme toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light";
  } else {
    themeBtn.textContent = "🌙 Dark";
  }
});
