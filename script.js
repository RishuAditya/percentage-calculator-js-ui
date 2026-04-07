/**
 * OmniCalc Master Logic
 * Saare world devices ke liye optimised
 */

// Tabs change karne ka logic
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

// Light aur Dark mode switch
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeSwitcher").innerText = isDark
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
}

// Logic Explainer Steps
function explain(id, steps) {
  const box = document.getElementById(id);
  if (box)
    box.innerHTML = `<b>🎓 Funny Explainer:</b><br>` + steps.join("<br>");
}

// --- STANDARD CALCULATOR ---
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

// --- MARKET LOGIC ---
function calcMarket() {
  let rate = parseFloat(document.getElementById("m-rate").value);
  let weight = parseFloat(document.getElementById("m-weight").value);
  if (isNaN(rate) || isNaN(weight)) return;
  let res = (rate / 1000) * weight;
  document.getElementById("market-res").innerText = `Price: ₹${res.toFixed(2)}`;
  explain("market-logic", [
    "1. Bhai pehle 1 gram ka price nikala (Rate / 1000).",
    "2. Phir tere demanded weight (" + weight + "g) se multiply kiya.",
    "3. **Ans:** ₹" + res.toFixed(2) + " chipka de dukan wale ko!",
  ]);
}

// --- CONSTRUCTION LOGIC ---
function calcBuild() {
  let l = parseFloat(document.getElementById("b-len").value);
  let w = parseFloat(document.getElementById("b-wid").value);
  let r = parseFloat(document.getElementById("b-rate").value);
  if (isNaN(l) || isNaN(w) || isNaN(r)) return;
  let total = l * w * r;
  document.getElementById("build-res").innerText =
    `Bill: ₹${total.toLocaleString()}`;
  explain("build-logic", [
    "L x W karke area nikala: " + l * w + " SqFt.",
    "Area ko rate ₹" + r + " se guna kiya.",
    "Bill ban gaya boss!",
  ]);
}

// --- AGE LOGIC ---
function calcAgeOnly() {
  let dob = new Date(document.getElementById("age-dob").value);
  if (isNaN(dob)) return;
  let today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  document.getElementById("age-res").innerText = `${years}y, ${months}m Old`;
  explain("age-logic", [
    "Tum dharti par " + years + " saal se bojh ho (Just kidding!)",
  ]);
}

function calcDateGap() {
  let s = new Date(document.getElementById("date-start").value);
  let e = new Date(document.getElementById("date-end").value);
  let days = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
  document.getElementById("gap-res").innerText = `${days} Days Gap`;
}

// --- INTEREST LOGIC ---
function calcSI() {
  let p = parseFloat(document.getElementById("si-p").value);
  let r = parseFloat(document.getElementById("si-r").value);
  let t = parseFloat(document.getElementById("si-t").value);
  let res = (p * r * t) / 100;
  document.getElementById("si-res").innerText = `Interest: ₹${res.toFixed(2)}`;
}

function calcCI() {
  let p = parseFloat(document.getElementById("ci-p").value);
  let r = parseFloat(document.getElementById("ci-r").value) / 100;
  let t = parseFloat(document.getElementById("ci-t").value);
  let amt = p * Math.pow(1 + r, t);
  document.getElementById("ci-res").innerText = `Total: ₹${amt.toFixed(2)}`;
}

// --- PROFIT LOGIC ---
function calcPL() {
  let cp = parseFloat(document.getElementById("pl-cp").value);
  let sp = parseFloat(document.getElementById("pl-sp").value);
  let diff = sp - cp;
  document.getElementById("pl-res").innerText =
    (diff >= 0 ? "Profit: ₹" : "Loss: ₹") + Math.abs(diff);
}

function calcTargetSP() {
  let cp = parseFloat(document.getElementById("tp-cp").value);
  let p = parseFloat(document.getElementById("tp-perc").value);
  let sp = cp + (cp * p) / 100;
  document.getElementById("tp-res").innerText = `Target SP: ₹${sp.toFixed(2)}`;
}

// --- PERCENT LOGIC ---
function calcPr1() {
  let x = parseFloat(document.getElementById("pr1-x").value);
  let y = parseFloat(document.getElementById("pr1-y").value);
  document.getElementById("pr1-res").innerText =
    `Value: ${((x / 100) * y).toFixed(2)}`;
}

function calcPr2() {
  let x = parseFloat(document.getElementById("pr2-x").value);
  let y = parseFloat(document.getElementById("pr2-y").value);
  document.getElementById("pr2-res").innerText =
    `Ans: ${((x / y) * 100).toFixed(2)}%`;
}

// --- GST LOGIC ---
function calcGSTAdd() {
  let amt = parseFloat(document.getElementById("gst-add-amt").value);
  let rate = parseFloat(document.getElementById("gst-add-rate").value);
  let gst = (amt * rate) / 100;
  document.getElementById("gst-add-res").innerText =
    `Gross: ₹${(amt + gst).toFixed(2)}`;
}

function calcGSTRem() {
  let total = parseFloat(document.getElementById("gst-rem-amt").value);
  let rate = parseFloat(document.getElementById("gst-rem-rate").value);
  let base = total / (1 + rate / 100);
  document.getElementById("gst-rem-res").innerText =
    `Base Price: ₹${base.toFixed(2)}`;
}

// Keyboard Mapping
document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;
  if (/[0-9]/.test(e.key)) num(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) op(e.key);
  if (e.key === "Enter") solve();
  if (e.key === "Backspace") backspace();
});
