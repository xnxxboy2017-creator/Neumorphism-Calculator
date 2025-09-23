// script.js (updated)
let result = document.getElementById("result");
let themeBtn = document.getElementById("toggleTheme");

function isOperator(ch) {
  return /[+\-*/]/.test(ch);
}

function appendValue(value) {
  const cur = result.innerText;
  const lastChar = cur[cur.length - 1];

  // If starting from 0 and user types a number (or dot), replace the 0
  if (cur === "0" && value !== "." && !isOperator(value) && value !== "%") {
    result.innerText = value;
    return;
  }

  // Operators: avoid consecutive operators (replace last operator)
  if (isOperator(value)) {
    // allow starting negative number
    if (cur === "0" && value === "-") {
      result.innerText = "-";
      return;
    }
    if (isOperator(lastChar)) {
      // replace last operator with new one
      result.innerText = cur.slice(0, -1) + value;
      return;
    }
    result.innerText += value;
    return;
  }

  // Decimal: only one decimal in the current number segment
  if (value === ".") {
    const lastNumber = cur.split(/[+\-*/]/).pop();
    if (lastNumber.includes(".")) return; // ignore extra dots
    result.innerText += ".";
    return;
  }

  // Percent just appends; handled in calculate()
  result.innerText += value;
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
    let expr = result.innerText.trim();

    // 1) Remove trailing operators or dots (so "3-" becomes "3")
    expr = expr.replace(/[+\-*/.]+$/, "");

    // if everything removed, show 0
    if (expr === "") {
      result.innerText = "0";
      return;
    }

    // 2) Convert "number%" to "(number/100)" (handles things like 50%*2)
    expr = expr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    // 3) Secret Easter egg
    if (expr === "13042023") {
      result.innerText = "I ❤️ U";
      return;
    }

    // 4) Evaluate safely (still using eval for simplicity)
    const value = eval(expr);

    // 5) Check for invalid results
    if (!isFinite(value) || Number.isNaN(value)) {
      result.innerText = "Error";
      return;
    }

    // 6) Format to avoid long floating precision artifacts
    result.innerText = (Math.round(value * 1e12) / 1e12).toString();
  } catch (e) {
    result.innerText = "Error";
  }
}

// Theme toggle (keep as before)
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light";
  } else {
    themeBtn.textContent = "🌙 Dark";
  }
});
