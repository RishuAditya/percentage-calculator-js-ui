function calculatePercentageOfTotal() {
  const value = parseFloat(document.getElementById("value1").value);
  const total = parseFloat(document.getElementById("total1").value);
  const result1 = document.getElementById("result1");

  if (isNaN(value) || isNaN(total) || total === 0) {
    result1.textContent = "Please enter valid numbers.";
    result1.style.color = "#d9534f";
    return;
  }

  const percentage = (value / total) * 100;
  result1.textContent = `${percentage.toFixed(2)}%`;
  result1.style.color = "#2e8b57";
}

function calculateValueFromPercentage() {
  const percent = parseFloat(document.getElementById("percentValue").value);
  const total = parseFloat(document.getElementById("ofValue").value);
  const result2 = document.getElementById("result2");

  if (isNaN(percent) || isNaN(total)) {
    result2.textContent = "Please enter valid numbers.";
    result2.style.color = "#d9534f";
    return;
  }

  const value = (percent / 100) * total;
  result2.textContent = `${value.toFixed(2)}`;
  result2.style.color = "#2e8b57";
}
