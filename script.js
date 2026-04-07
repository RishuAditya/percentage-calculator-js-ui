// Tab Switching
function showTab(id) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".menu-item")
    .forEach((m) => m.classList.remove("active"));
  document.getElementById("tab-" + id).classList.add("active");
  if (event) event.currentTarget.classList.add("active");
  // Scroll back to top on mobile when tab changes
  document.querySelector(".workspace").scrollTop = 0;
}

// Theme Change
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeBtn").innerText = isDark
    ? "🌙 Mode"
    : "☀️ Mode";
}

// 1. Standard Calculator
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
}
function backspace() {
  screen.value = screen.value.length > 1 ? screen.value.slice(0, -1) : "0";
}
function mathOp(t) {
  if (t === "sqrt") screen.value = Math.sqrt(eval(screen.value)).toFixed(4);
}
function solve() {
  try {
    screen.value = eval(screen.value.replace("×", "*").replace("÷", "/"));
  } catch {
    screen.value = "Error";
  }
}

// 2. Market logics
function calcM1() {
  let rate = parseFloat(document.getElementById("m1-rate").value);
  let uRate = parseFloat(document.getElementById("m1-unit-rate").value);
  let qty = parseFloat(document.getElementById("m1-qty").value);
  let uQty = parseFloat(document.getElementById("m1-unit-qty").value);
  let res = (rate / uRate) * (qty * uQty);
  document.getElementById("m1-res").innerText = "₹ " + res.toFixed(2);
}
function calcM2() {
  let rate = parseFloat(document.getElementById("m2-rate").value);
  let budget = parseFloat(document.getElementById("m2-budget").value);
  let res = (budget / rate) * 1000;
  document.getElementById("m2-res").innerText = res.toFixed(0) + " Grams / ml";
}

// 3. Construction
function calcB1() {
  let l = document.getElementById("b1-l").value;
  let w = document.getElementById("b1-w").value;
  let u = document.getElementById("b1-unit").value;
  let r = document.getElementById("b1-rate").value;
  document.getElementById("b1-res").innerText =
    "₹ " + (l * w * u * r).toLocaleString();
}
function calcB2() {
  let area = document.getElementById("b2-area").value;
  let tile = document.getElementById("b2-tile").value;
  document.getElementById("b2-res").innerText =
    Math.ceil(area / tile) + " Tiles approx";
}

// 4. Age
function calcAge() {
  let dob = new Date(document.getElementById("age-dob").value);
  let years = Math.floor((new Date() - dob) / (1000 * 60 * 60 * 24 * 365.25));
  document.getElementById("age-res").innerText = years + " Years Old";
}
function calcGap() {
  let s = new Date(document.getElementById("gap-s").value);
  let e = new Date(document.getElementById("gap-e").value);
  document.getElementById("gap-res").innerText =
    Math.abs(Math.floor((e - s) / (1000 * 60 * 60 * 24))) + " Days Gap";
}

// 5. Interest
function calcSI() {
  let p = document.getElementById("si-p").value,
    r = document.getElementById("si-r").value,
    t = document.getElementById("si-t").value;
  document.getElementById("si-res").innerText =
    "Interest: ₹ " + ((p * r * t) / 100).toFixed(2);
}
function calcCI() {
  let p = document.getElementById("ci-p").value,
    r = document.getElementById("ci-r").value / 100,
    t = document.getElementById("ci-t").value;
  document.getElementById("ci-res").innerText =
    "Amount: ₹ " + (p * Math.pow(1 + r, t)).toFixed(2);
}

// 6. Percentage
function calcP1() {
  let x = document.getElementById("p1-x").value,
    y = document.getElementById("p1-y").value;
  document.getElementById("p1-res").innerText = ((x / 100) * y).toFixed(2);
}
function calcP2() {
  let x = document.getElementById("p2-x").value,
    y = document.getElementById("p2-y").value;
  document.getElementById("p2-res").innerText =
    ((x / y) * 100).toFixed(2) + "%";
}

// 7. GST
function calcGA() {
  let a = parseFloat(document.getElementById("ga-amt").value),
    r = parseFloat(document.getElementById("ga-rate").value);
  document.getElementById("ga-res").innerText =
    "Total: ₹ " + (a + (a * r) / 100).toFixed(2);
}
function calcGR() {
  let a = parseFloat(document.getElementById("gr-amt").value),
    r = parseFloat(document.getElementById("gr-rate").value);
  document.getElementById("gr-res").innerText =
    "Base: ₹ " + (a / (1 + r / 100)).toFixed(2);
}

// 8. Profit
function calcPL() {
  let cp = document.getElementById("pl-cp").value,
    sp = document.getElementById("pl-sp").value;
  let d = sp - cp;
  document.getElementById("pl-res").innerText =
    (d >= 0 ? "Profit: ₹" : "Loss: ₹") + Math.abs(d);
}
function calcTP() {
  let cp = parseFloat(document.getElementById("tp-cp").value),
    p = parseFloat(document.getElementById("tp-p").value);
  document.getElementById("tp-res").innerText =
    "Sell At: ₹ " + (cp + (cp * p) / 100).toFixed(2);
}
