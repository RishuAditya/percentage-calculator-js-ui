/**
 * OMNICALC PRO v3 LOGIC
 * Comented in Hinglish so you understand every part!
 */

// --- 1. Tab Navigation: Content switch karne ke liye ---
function showTab(tabId) {
  // Sab tabs aur menu-items se 'active' class hatao
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".menu-item")
    .forEach((m) => m.classList.remove("active"));

  // Naya tab aur clicked menu-item active karo
  document.getElementById("tab-" + tabId).classList.add("active");
  event.currentTarget.classList.add("active");
}

// --- 2. Theme Toggle: Dark aur Light mode switch ---
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("themeSwitcher").innerText = isDark
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
}

// --- 3. Funny Explainer Engine: Steps dikhane ke liye ---
function explain(id, steps) {
  const box = document.getElementById(id);
  if (box) {
    box.innerHTML =
      `<b>🎓 Funny Student Explains:</b><br>` +
      steps.map((s, i) => `<span>${i + 1}. ${s}</span>`).join("<br>");
  }
}

// --- 4. Standard Calculator Module ---
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

// --- 5. Market / Grocery Logic ---
function calcMarket() {
  let rate = parseFloat(document.getElementById("m-rate").value);
  let weight = parseFloat(document.getElementById("m-weight").value);
  if (isNaN(rate) || isNaN(weight)) return;

  // Logic: Pehle 1 gram ka price nikala (Rate/1000) phir use weight se multiply kiya
  let res = (rate / 1000) * weight;
  document.getElementById("market-res").innerText = `Price: ₹${res.toFixed(2)}`;

  explain("market-logic", [
    "1kg yaani 1000g ka rate ₹" + rate + " hai.",
    "To 1 gram ka hua ₹" + rate / 1000 + " (Rate ÷ 1000).",
    "Phir tune maanga " + weight + " gram, to multiply kar diya.",
    "<b>Answer:</b> ₹" + res.toFixed(2) + " dukan wale ko de do mze me!",
  ]);
}

// --- 6. Construction / Roof Logic ---
function calcBuild() {
  let l = parseFloat(document.getElementById("b-len").value);
  let w = parseFloat(document.getElementById("b-wid").value);
  let r = parseFloat(document.getElementById("b-rate").value);
  if (isNaN(l) || isNaN(w) || isNaN(r)) return;

  let area = l * w;
  let total = area * r;
  document.getElementById("build-res").innerText =
    `Total Bill: ₹${total.toLocaleString()}`;

  explain("build-logic", [
    "Pehle Area nikala: " + l + " × " + w + " = " + area + " SqFt.",
    "Ab " + area + " Square Feet ko ₹" + r + " rate se guna kiya.",
    "<b>Result:</b> ₹" + total.toLocaleString() + " ka fatka lagega bhai!",
  ]);
}

// --- 7. Age & Date Logic ---
function calcAgeOnly() {
  let dob = new Date(document.getElementById("age-dob").value);
  let now = new Date();
  if (isNaN(dob)) return;

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("age-res").innerText = `${years}y, ${months}m Old`;
  explain("age-logic", [
    "Bhai tumne dharti par " +
      years +
      " saal bita diye, kafi budhe ho gaye ho!",
  ]);
}

function calcDateGap() {
  let s = new Date(document.getElementById("date-start").value);
  let e = new Date(document.getElementById("date-end").value);
  if (isNaN(s) || isNaN(e)) return;
  let days = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
  document.getElementById("gap-res").innerText = `${days} Days Gap`;
}

// --- 8. Interest Logic ---
function calcSI() {
  let p = parseFloat(document.getElementById("si-p").value);
  let r = parseFloat(document.getElementById("si-r").value);
  let t = parseFloat(document.getElementById("si-t").value);
  let res = (p * r * t) / 100;
  document.getElementById("si-res").innerText = `Interest: ₹${res.toFixed(2)}`;
  explain("si-logic", [
    "(P × R × T) / 100 ka bachpan wala formula lagaya hai.",
  ]);
}

function calcCI() {
  let p = parseFloat(document.getElementById("ci-p").value);
  let r = parseFloat(document.getElementById("ci-r").value) / 100;
  let t = parseFloat(document.getElementById("ci-t").value);
  let amt = p * Math.pow(1 + r, t);
  document.getElementById("ci-res").innerText = `Total: ₹${amt.toFixed(2)}`;
}

// --- 9. Profit & Loss Logic ---
function calcPL() {
  let cp = parseFloat(document.getElementById("pl-cp").value);
  let sp = parseFloat(document.getElementById("pl-sp").value);
  let diff = sp - cp;
  let perc = (diff / cp) * 100;
  document.getElementById("pl-res").innerText =
    `${diff >= 0 ? "Profit" : "Loss"}: ₹${Math.abs(diff)}`;
  explain("pl-logic", [
    "Selling Price me se buying price ghata diya, simple! " +
      (diff >= 0 ? "Party do bhai!" : "Nuksaan ho gya..."),
  ]);
}

function calcTargetSP() {
  let cp = parseFloat(document.getElementById("tp-cp").value);
  let target = parseFloat(document.getElementById("tp-perc").value);
  let sp = cp + (cp * target) / 100;
  document.getElementById("tp-res").innerText = `Price: ₹${sp.toFixed(2)}`;
}

// --- 10. Percentage Suite ---
function calcPr1() {
  let x = parseFloat(document.getElementById("pr1-x").value);
  let y = parseFloat(document.getElementById("pr1-y").value);
  let res = (x / 100) * y;
  document.getElementById("pr1-res").innerText = `Result: ${res.toFixed(2)}`;
  explain("pr1-logic", ["X ÷ 100 × Y... ye to maine class 5th me sikha tha!"]);
}

function calcPr2() {
  let x = parseFloat(document.getElementById("pr2-x").value);
  let y = parseFloat(document.getElementById("pr2-y").value);
  let res = (x / y) * 100;
  document.getElementById("pr2-res").innerText = `Result: ${res.toFixed(2)}%`;
}

// --- 11. GST Logic ---
function calcGSTAdd() {
  let amt = parseFloat(document.getElementById("gst-add-amt").value);
  let rate = parseFloat(document.getElementById("gst-add-rate").value);
  let gst = (amt * rate) / 100;
  document.getElementById("gst-add-res").innerText =
    `Total: ₹${(amt + gst).toFixed(2)}`;
  explain("gst-add-logic", [
    "Tax amount nikala aur original price me jod diya. Sarkaar khush!",
  ]);
}

function calcGSTRem() {
  let total = parseFloat(document.getElementById("gst-rem-amt").value);
  let rate = parseFloat(document.getElementById("gst-rem-rate").value);
  let net = total / (1 + rate / 100);
  document.getElementById("gst-rem-res").innerText = `Base: ₹${net.toFixed(2)}`;
}

// --- Keyboard Support for Standard Calc ---
document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;
  if (/[0-9]/.test(e.key)) num(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) op(e.key);
  if (e.key === "Enter") solve();
  if (e.key === "Backspace") backspace();
});
