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
    displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return;
  }
  if (totalCid === changeDue) {
    result.status = "CLOSED";
  }
  for (let idx = 0; idx < reversedCid.length; idx++) {
    if (changeDue > 0 && changeDue >= denominations[i]) {
      count = 0;

      while (changeDue >= denominations[i]) {
        reversedCid[i][1] -= denominations[i];
        changeDue = changeDue - denominations;
        changeDue = parseFloat(changeDue).toFixed(2);
        count++;
      }
      if (count > 0) {
        result.change.push([reversedCid[i][0], count * denominations[i]]);
      }
    }
    if (changeDue > 0) {
      return (displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>");
    }
  }
};

const checkResults = () => {
  if (!cash.value) {
    return alert("Enter amount");
  }
  checkCashRegister();
};
