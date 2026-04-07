// Tab switching
function showTab(tabId) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".menu-item")
    .forEach((m) => m.classList.remove("active"));
  document.getElementById("tab-" + tabId).classList.add("active");
  if (event) event.currentTarget.classList.add("active");
}

// Theme
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeSwitcher").innerText = isDark
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
}

// Explainer
function explain(id, steps) {
  const box = document.getElementById(id);
  if (box) box.innerHTML = `<b>🎓 Funny Explains:</b><br>` + steps.join("<br>");
}

// Standard Calc
let screen = document.getElementById("main-screen");
function num(n) {
  if (screen.value === "0") screen.value = n;
  else screen.value += n;
}
function op(o) {
  screen.value += o;
}
function clearAll() {
  screen.value = "0";
  document.getElementById("calc-history").innerText = "";
}
function backspace() {
  screen.value = screen.value.length > 1 ? screen.value.slice(0, -1) : "0";
}
function mathOp(type) {
  if (type === "sqrt") screen.value = Math.sqrt(eval(screen.value)).toFixed(4);
}
function solve() {
  try {
    document.getElementById("calc-history").innerText = screen.value;
    screen.value = eval(screen.value.replace("×", "*").replace("÷", "/"));
  } catch {
    screen.value = "Error";
  }
}

// Grocery
function calcMarket() {
  let rate = parseFloat(document.getElementById("m-rate").value);
  let weight = parseFloat(document.getElementById("m-weight").value);
  let res = (rate / 1000) * weight;
  document.getElementById("market-res").innerText = `Price: ₹${res.toFixed(2)}`;
  explain("market-logic", [
    "Pahle 1 gram ka price nikala (Rate ÷ 1000).",
    "Phir tere " + weight + "g se guna kar diya.",
    "Ans: ₹" + res.toFixed(2),
  ]);
}

// Construction
function calcBuild() {
  let l = parseFloat(document.getElementById("b-len").value);
  let w = parseFloat(document.getElementById("b-wid").value);
  let r = parseFloat(document.getElementById("b-rate").value);
  let total = l * w * r;
  document.getElementById("build-res").innerText =
    `Total: ₹${total.toLocaleString()}`;
  explain("build-logic", ["Area nikala (L x W) aur rate se guna kar diya!"]);
}

// Age
function calcAgeOnly() {
  let dob = new Date(document.getElementById("age-dob").value);
  if (isNaN(dob)) return;
  let years = new Date().getFullYear() - dob.getFullYear();
  document.getElementById("age-res").innerText = `${years} Years Old`;
}

// Basic Interest, Profit, GST logic... (Slightly shortened for full compatibility)
function calcPr1() {
  let x = parseFloat(document.getElementById("pr1-x").value);
  let y = parseFloat(document.getElementById("pr1-y").value);
  document.getElementById("pr1-res").innerText =
    `Ans: ${((x / 100) * y).toFixed(2)}`;
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;
  if (/[0-9]/.test(e.key)) num(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) op(e.key);
  if (e.key === "Enter") solve();
  if (e.key === "Backspace") backspace();
});
