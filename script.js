let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
const displayChangeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-drawer-display");

const checkRegister = () => {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    cash.value = "";
    return;
  }
  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    return;
  }

  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse();
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: "OPEN", change: [] };
  let totalCid = parseFloat(
    cid
      .map((total) => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  );

  if (totalCid < changeDue) {
    displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS1</p>";
    return;
  }
  if (totalCid === changeDue) {
    result.status = "CLOSED";
  }
  console.log(reversedCid.length);
  for (let idx = 0; idx < reversedCid.length; idx++) {
    console.log(1);

    if (changeDue >= denominations[idx] && changeDue > 0) {
      let count = 0;
      let cashValue = reversedCid[idx][1];
      while (cashValue > 0 && changeDue >= denominations[idx]) {
        cashValue -= denominations[idx];
        changeDue = parseFloat((changeDue - denominations[idx]).toFixed(2));
        count++;
        console.log(changeDue);
      }
      if (count > 0) {
        result.change.push([reversedCid[idx][0], count * denominations[idx]]);
      }
    }
    console.log(changeDue);
  }
  if (changeDue > 0) {
    return (displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS2</p>");
  }
  formatOutput(result.status, result.change);
};

const formatOutput = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    (cash) => (displayChangeDue.innerHTML += `<p>${cash[0]}: $${cash[1]}</p>`)
  );
  return;
};
const checkResults = () => {
  if (!cash.value) {
    return alert("Enter amount");
  }
  checkRegister();
};

cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkResults();
  }
});

purchaseBtn.addEventListener("click", checkResults);
